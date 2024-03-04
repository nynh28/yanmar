import React, { Component, Suspense, useCallback, useMemo, useState } from "react";
import { connect } from 'react-redux'
import { BoxContrainer, Button } from "../../components_new";
import { EditOutlined, GlobalOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Row, Col, Checkbox, Select, Button as ButtonAntd, Table, AutoComplete, Input, Tag, Modal as ModalAntd, Divider, DatePicker } from "antd";
import FormInput from "../../Components/FormControls/Basic/FormInput";
import moment from 'moment'
import { useEffect } from "react";
import { Search } from '@material-ui/icons';
import TractorApi from "../../Services/TractorApi";
import Alert from '../../Components/Alert'
import { ENDPOINT_BASE_URL_YNM_VNTEAM, MEDIA_SRC_ROOT, YM_BASE_URL, adminRoleId } from "../../Config/app-config";
import axios from "axios";
import AutocompleteSearch from "../../components_new/Async/AutocompleteSearch";

const { Option } = Select;

const _debounce = function (ms, fn) {
    var timer;
    return function () {
        clearTimeout(timer);
        var args = Array.prototype.slice.call(arguments);
        args.unshift(this);
        timer = setTimeout(fn.bind.apply(fn, args), ms);
    };
};

const defaultFilter = {
    status: 0,
    model_code: '',
    vin_no: '',
    dealer_name: '',
    customer_name: '',
    maintenance_type_id: 0,
    dealer_id: 0
}
const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const api = TractorApi.create();
const MachineTractor = (props) => {
    const {dataLogin} = props


    const [tableData, setTableData] = useState([])
    const [tableHeight, setTableHeight] = useState(0);
    const [isModalOpen, setOpenModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState({})
    const [isLoading, setLoading] = useState(false)
    const [alertSetting, setAlertSetting] = useState({ show: false, type: 0, icon: null })
    const [idDetail, setidDetail] = useState('')
    const [dataDetail, setdataDetail] = useState({})
    const [dataLocation, setdataLocation] = useState(['admin_level1_name', 'admin_level2_name', 'admin_level3_name'])

    const [critical, setCritical] = useState({
        page: 1,
        limit: 10,
        user_id: dataLogin.user_id,
        ...defaultFilter
    })
    const [filter, setFilter] = useState(defaultFilter)
    const [listModel, setListModel] = useState([])
    const [listDealer, setListDealer] = useState([])
    const [listHistory, setListHistory] = useState([])

    const [listCustomer, setListCustomer] = useState([])
    useEffect(() => {

        async function getSeller() {
            try {
              var response = await fetch(
                `${YM_BASE_URL}fleet/setting/Dealer?limit=1000000`,
                // `${ENDPOINT_BASE_URL}ServiceContract/Yanmar/DropdownGroup?name=Seller`,
                {
                  method: "GET",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "x-api-key": dataLogin.redis_key,
                    "Accept-Language": 'th',
                  },
                }
              );

              var data = await response.json();
              // if (data.result.dealer_list == undefined) {
              //   setTest([]);
              // } else setTest(data.result.dealer_list);

              let list = data.result.dealer_list.map((e) => ({
                value: e.dealer_id,
                label: e.dealer_name,
              }));
              setListDealer(list)
            //   setSellerList(list);
            } catch (error) {
                console.log(error)
            //   setSellerList([]);
            }
        };

        async function getCustomer() {
            try {
              var response = await fetch(
                `${YM_BASE_URL}fleet/setting/Customer?limit=1000000`,
                // `${ENDPOINT_BASE_URL}ServiceContract/Yanmar/DropdownGroup?name=Seller`,
                {
                  method: "GET",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "x-api-key": dataLogin.redis_key,
                    "Accept-Language": 'th',
                  },
                }
              );

              var data = await response.json();
              // if (data.result.dealer_list == undefined) {
              //   setTest([]);
              // } else setTest(data.result.dealer_list);

              let list = (data?.result?.customer_list || []).map((e) => ({
                value: e.customer_id,
                label: e.customer_name,
              }));
              setListCustomer(list)
            //   setSellerList(list);
            } catch (error) {
                console.log(error)
            //   setSellerList([]);
            }
        };


        async function fetchModel() {
            var resp = await api.getListSetting('page=1&limit=1000');
            var data = resp.data;
            if (data?.code == 200) {
                setListModel(data.result || [])
            }
        }

        getCustomer()
        getSeller()
        fetchModel()
    }, [])

    const exportData = async () => {
        setLoading(true)
        let params = [];
        if(critical.user_id){
            critical.dealer_name = ''
        }
        Object.keys(critical).forEach(keys => {
            if(critical[keys] != '' && keys !='page' && keys != 'limit')
                params.push(`${keys}=${critical[keys]}`)
        })
        // alert(1)
        if(dataLogin.role_id==18){
          params.push(`dealer_id=${dataLogin.user_id}`)
        }
        // params.push('role_id'=dataLogin.role_id)
        // params+=`&user_id=${dataLogin.user_id}&role_id=${dataLogin.role_id}`
        try {
            axios.get(`${ENDPOINT_BASE_URL_YNM_VNTEAM}fleet/machine/tractor/export?${params.join('&')}`, {
                responseType: 'blob',
                'Content-type': 'application/json'
            })
                .then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,"}));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute(
                        "download",
                        `${'Machine Export Data_'+moment().format('YYYYMMDD')}.xlsx`
                    );
                    document.body.appendChild(link);
                    link.click();

                    // Clean up and remove the link
                    link.parentNode.removeChild(link);
                    setLoading(false)
                }).catch(e => {
                    setLoading(false)
                }).finally(_ => {
                    setLoading(false)
                })
        } catch (e) {
            setLoading(false)

        }
    }
    const exportDataHistory = async (vin) => {
        setLoading(true)
        let params = [];
        if(critical.user_id){
            critical.dealer_name = ''
        }
        Object.keys(critical).forEach(keys => {
            if(critical[keys] != '' && keys !='page' && keys != 'limit')
                params.push(`${keys}=${critical[keys]}`)
        })
        // alert(1)
        if(dataLogin.role_id==18){
          params.push(`dealer_id=${dataLogin.user_id}`)
        }
        // params.push('role_id'=dataLogin.role_id)
        // params+=`&user_id=${dataLogin.user_id}&role_id=${dataLogin.role_id}`
        try {
            axios.get(`${ENDPOINT_BASE_URL_YNM_VNTEAM}fleet/machine/export-maintenance-history?vin_no=${vin}`, {
                responseType: 'blob',
                'Content-type': 'application/json'
            })
                .then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,"}));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute(
                        "download",
                        `${vin}${'_Maintenance History Export Data_'+moment().format('YYYYMMDD')}.xlsx`
                    );
                    document.body.appendChild(link);
                    link.click();

                    // Clean up and remove the link
                    link.parentNode.removeChild(link);
                    setLoading(false)
                }).catch(e => {
                    setLoading(false)
                }).finally(_ => {
                    setLoading(false)
                })
        } catch (e) {
            setLoading(false)

        }
    }

    async function fetchVINList(username) {

        return await fetch(
            `${YM_BASE_URL}fleet/setting/Vehicle?vin_no=${username}&limit=20`,
            // `${ENDPOINT_BASE_URL}ServiceContract/Yanmar/DropdownGroup?name=Seller`,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "x-api-key": dataLogin.redis_key,
                "Accept-Language": 'th',
              },
            }
          ).then((response) => response.json())
          .then((body) => {
            if(body?.code == 200){
                // return []
                return (body?.result?.vehicle_list || []).map(dealer => ({
                    label: dealer.vin_no,
                    value: dealer.vin_no,
                }))
            }
            return []
          }
          )
      }


    const elementRefBar = useCallback(node => {
        if (!node) return;
        const resizeObserver = new ResizeObserver(_debounce(300, function (muts) {
            // console.log(node.offsetWidth);
            const height = node.offsetHeight
            // console.log(height)
            setTableHeight(height - 100)
        }));
        resizeObserver.observe(node);
    }, []);

    const handleInput = e => {
        const { name, value } = e.target; // <-- moved outside asynchronous context
        setFilter(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const triggerFilter = () => {
        setCritical(prevState => ({
            ...prevState,
            page: 1,
            ...filter
        }))
    }

    const fetchData = async () => {
        setLoading(true)
        let params = [];
        if(critical.user_id){
            critical.dealer_name = ''
        }
        Object.keys(critical).forEach(keys => {
            if(critical[keys])
                params.push(`${keys}=${critical[keys]}`)
        })
        try {
            var resp = await api.getListDataMachine(params.join('&'));
            var data = resp.data;
            if (data?.code == 200) {
                setTableData(data)
                setLoading(false)
            } else {
                setLoading(false)
                setAlertSetting({
                    show: true,
                    type: 2,
                    ErrorSubcode: 'Something wrong, please try again later.'
                })
            }

        } catch (e) {
            setLoading(false)

        }
    }

    const fetchDataDetail = async (item) => {
        setLoading(true)
        try {
            if (item && item.id) {
                var resp = await api.getDetailMachine(item.id);
                var data = resp.data;
                if (data?.code == 200) {
                    setdataDetail(data.result)
                    setLoading(false)
                } else {
                    setLoading(false)
                    setAlertSetting({
                        show: true,
                        type: 2,
                        ErrorSubcode: 'Something wrong, please try again later.'
                    })
                }
            }
        } catch (e) {
            setLoading(false)
        }
    }

    const fetchMaintenanceHistory = async (item) => {
        setLoading(true)
        try {
            if (item && item.vin_no) {
                var resp = await api.getMaintenaceHistory(item.vin_no);
                var data = resp.data;
                if (data?.code == 200) {
                    setListHistory(data.result || [])
                    // setdataDetail(data.result)
                    setLoading(false)
                } else {
                    setLoading(false)
                    setAlertSetting({
                        show: true,
                        type: 2,
                        ErrorSubcode: 'Something wrong, please try again later.'
                    })
                }
            }
        } catch (e) {
            setLoading(false)
        }
    }

    useEffect(_ => {
        fetchData()
    }, [critical])


    const handleOpenModal = (item) => {
        setSelectedRow({})
        setListHistory([])
        fetchDataDetail(item)
        fetchMaintenanceHistory(item)
        setOpenModal(true)
    }

    const handleSelectRow = (e) => {
        console.log(e)
    }

    const handleTableChange = (pagination, filters, sorter) => {

        setCritical(prevState => ({
            ...prevState,
            page: prevState.limit != pagination.pageSize ? 1 : pagination.current,
            limit: pagination.pageSize
        }))
    };

    const getStatusMachine = (status) => {
        switch(status){
            case 0:
                return  <span className="flex w-fit font-semibold items-center gap-[12px] font-pop pl-[8px] py-2 pr-[12px] text-[#489FEA] bg-[#4190F740] text-[12px] rounded-[15px]">
                            <i className="fa fa-circle text-[9px] text-[#4AA3E7]" aria-hidden="true"></i>
                            Normal
                        </span>
            case 1:
                return  <span className="flex w-fit font-semibold items-center gap-[12px] font-pop pl-[8px] py-2 pr-[12px] text-[#F4B73F] bg-[#F4B73F40] text-[12px] rounded-[15px]">
                            <i className="fa fa-circle text-[9px] text-[#F4B73F]" aria-hidden="true"></i>
                            Waiting
                        </span>
                // return <span className="bg-[#4190F740] text-[#4190F7] text-[14px] px-[8px] py-[4px] rounded-[5px] overflow-hidden font-pop">Waiting</span>
            case 2:
                return  <span className="flex w-fit font-semibold items-center gap-[12px] font-pop pl-[8px] py-2 pr-[12px] text-[#E56234] bg-[#E5623440] text-[12px] rounded-[15px]">
                            <i className="fa fa-circle text-[9px] text-[#E45D33]" aria-hidden="true"></i>
                            OverDue
                        </span>
        }
    }

    const getDiffTime = (time) => {
        if(time){

          var duration = moment.duration(moment().diff(time));
          var hours = duration.asHours();
          var minutes = duration.asMinutes();
          if(hours > 1){
            return `${Math.trunc(hours)} hours ago`
          }else {
            return `${Math.trunc(minutes)} minutes ago`
          }
        }
    }

    const  handleDownload = (url1, filename) => {
        axios.get(url1, {
          responseType: 'blob',
          'Content-type': 'application/json'
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
              "download",
              `${filename}.pdf`
          );
          document.body.appendChild(link);
          link.click();

          // Clean up and remove the link
          link.parentNode.removeChild(link);
        })
      }

    const columns = useMemo(() => {

        return  [

          {
              title: 'Status',
              className: 'text-[14px] ',
              dataIndex: 'maintenance_status',
              key: 'maintenance_status',
              width: '120px',
              render: value => getStatusMachine(value)
          },
          {
              title: 'VIN',
              className: 'text-[14px] whitespace-nowrap',
              dataIndex: 'vin_no',
              key: 'vin_no',
          },
          {
              title: 'Model',
              className: 'text-[14px] ',
              dataIndex: 'model_code',
              key: 'model_code',
          },
          {
              title: 'Dealer',
              className: 'text-[14px] ',
              dataIndex: 'dealer_name',
              key: 'dealer_name',
          },
          {
              title: 'Working Hour',
              className: 'text-[14px] ',
              dataIndex: 'engine_hour',
              key: 'engine_hour',
          },
          {
              title: 'Location',
              className: 'text-[14px] ',
              dataIndex: 'location',
              key: 'location',
              render: value =>  value && dataLocation.map((item, index) => <span key={index} className="separated-command text-popup-update">{value && value[item+'_en']}</span>)
                
          },
          {
              title: 'Inform time',
              className: 'text-[14px] ',
              dataIndex: 'maintenance_inform_time',
              key: 'maintenance_inform_time',
              width: 170,
              render: value => value ? moment(value).format('DD/MM/YYYY HH:mm:ss') : '',
          },
          {
              title: 'Recorded time',
              className: 'text-[14px] ',
              dataIndex: 'maintenance_record_time',
              key: 'maintenance_record_time',
              render: value => value ? moment(value).format('DD/MM/YYYY HH:mm:ss') : '',
              width: 170,
          },
          {
              title: 'Customer',
              className: 'text-[14px] ',
              dataIndex: 'customer_name',
              key: 'customer_name',
          },
          {
              title: 'Customer Phone',
              className: 'text-[14px] ',
              dataIndex: 'customer_phone',
              key: 'customer_phone',
          },
          {
              title: 'Maintenance Type',
              className: 'text-[14px] ',
              
              dataIndex: 'maintenance_type_id',
              key: 'maintenance_type_id',
              render: value => {
                  switch(value){
                      case 1: return 'First maintenance'
                      case 2: return 'Routine'
                      default : return '-'
                  }
              }
          },
          {
              title: '',
              className: 'text-[14px] text-right',
            //   dataIndex: 'id',
            //   key: 'id',
              fixed: 'right',
              width: 60,
              render: (value, record) => {
                return <button onClick={() => handleOpenModal(record)} className="rounded-full w-[28px] h-[28px] text-center bg-[#F4F9FF]">
                    <EditOutlined />
                </button>
            }
          },
        ];
    }, [])

    const columnsHistory = useMemo(() => {

        return  [

          {
              title: 'Status',
              className: 'text-[14px] whitespace-nowrap',
              dataIndex: 'status',
              key: 'status',
              width: '120px',
              render: value => getStatusMachine(value)
          },
          {
              title: 'Inform Time',
              className: 'text-[14px] whitespace-nowrap',
              dataIndex: 'inform_time',
              key: 'inform_time',
              width: 200
          },

          {
              title: 'Maintenance Type',
              className: 'text-[14px] whitespace-nowrap',
              width: 240,
              dataIndex: 'maintenance_type',
              key: 'maintenance_type',
              // render: value => {
              //     switch(value){
              //         case 1: return 'First maintenance'
              //         case 2: return 'Routine'
              //     }
              // }
          },
          {
            title: 'Working Hours',
            className: 'text-[14px] whitespace-nowrap',
            dataIndex: 'working_hour',
            key: 'working_hour',
            width: 150,
        },
        //   {
        //       title: '',
        //       className: 'text-[14px] text-right',
        //     //   dataIndex: 'id',
        //     //   key: 'id',
        //       fixed: 'right',
        //       width: 60,
        //       render: (value, record) => {
        //         return <button onClick={() => handleOpenModal(record)} className="rounded-full w-[28px] h-[28px] text-center bg-[#F4F9FF]">
        //             <EditOutlined />
        //         </button>
        //     }
        //   },
        ];
    }, [])

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
          // Column configuration not to be checked
          name: record.name,
        }),
    };

    return (
        <Suspense fallback={null}>
            <BoxContrainer
                title="Machine"
                className="font-pop min-h-[600px] h-[calc(100vh_-_115px)] flex flex-col overflow-hidden"
                boxContentClass="flex-1 flex flex-col min-h-[400px] box-content-custom"
                toolbarRight={
                    <Col>
                        <ButtonAntd
                            onClick={() => exportData()}
                            icon={<i className="icon-excel-01" style={{ paddingRight: 5 }} />}
                            style={{ marginLeft: 10 }}
                        />

                    </Col>
                }
            >
                <div className="gap-[10px] font-pop text-[#000] flex h-[100%]" ref={elementRefBar}>
                    <div className="w-[300px] flex justify-between flex-col pr-3">
                        <div>
                            <div className="mb-3">
                                <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000]">
                                    Status
                                </label>

                                <Select
                                    className="w-full text-[13px] font-pop select-custom normal-size"
                                    // showSearch
                                    allowClear
                                    placeholder="Select Status"
                                    optionFilterProp="children"
                                    onChange={e => {
                                        setFilter(prevState => ({
                                            ...prevState,
                                            status: e || -1
                                        }))
                                    }}
                                >
                                    <Option value={0} name='maintenance_type'>
                                        <span className="flex items-center gap-3 font-pop text-[13px]">
                                            <i className="fa fa-circle text-[9px] text-[#4AA3E7]" aria-hidden="true"></i>
                                            Normal
                                        </span>
                                    </Option>
                                    <Option value={1} name='maintenance_type'>
                                        <span className="flex items-center gap-3 font-pop text-[13px]">
                                            <i className="fa fa-circle text-[9px] text-[#F4B73F]" aria-hidden="true"></i>
                                            Waiting
                                        </span>
                                    </Option>
                                    <Option value={2} name='maintenance_type'>
                                        <span className="flex items-center gap-3 font-pop text-[13px]">
                                            <i className="fa fa-circle text-[9px] text-[#E45D33]" aria-hidden="true"></i>
                                            Overdue
                                        </span>
                                    </Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000]">
                                    VIN
                                </label>

                                <AutocompleteSearch
                                    // value={filter.vin_no}
                                    placeholder="Type VIN"
                                    className="text-[13px] font-pop select-custom normal-size"
                                    fetchOptions={fetchVINList}
                                    onChange={(newValue) => {
                                        setFilter(prevState => ({
                                            ...prevState,
                                            vin_no: newValue?.value || ''
                                        }))

                                    }}
                                    style={{
                                      width: '100%',
                                    }}
                                />

                            </div>
                            <div className="mb-3">
                                <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000]">
                                    Model
                                </label>
                                {
                                        (listModel && listModel.length > 0 ) ? (
                                            <Select
                                                className="w-full text-[13px] font-pop select-custom normal-size"
                                                // showSearch
                                                allowClear
                                                showSearch

                                                placeholder="Select Model"
                                                optionFilterProp="children"
                                                onChange={e => {
                                                    setFilter(prevState => ({
                                                        ...prevState,
                                                        model_code: e || ''
                                                    }))
                                                }}
                                                filterOption={filterOption}
                                                options={listModel.map(i => Object.assign({value: i.model_code, label:i.model_code}))}
                                            />


                                        ) : (
                                            <Input placeholder="Type Model" onChange={handleInput} name="model_code" />
                                            )
                                    }
                            </div>
                            <div className="mb-3">
                                <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000]">
                                    Maintenance type
                                </label>

                                <Select
                                    className="w-full text-[13px] font-pop select-custom normal-size"
                                    // showSearch
                                    allowClear
                                    placeholder="Select Maintenance Type"
                                    optionFilterProp="children"
                                    onChange={e => {
                                        setFilter(prevState => ({
                                            ...prevState,
                                            maintenance_type_id: e || 0
                                        }))
                                    }}
                                >
                                    <Option value={1} name='maintenance_type'>
                                        <span className="flex items-center gap-3 font-pop text-[13px]">
                                            {/* <i className="fa fa-circle text-[9px] text-[#1890ff]" aria-hidden="true"></i> */}
                                            First Maintenance
                                        </span>
                                    </Option>
                                    <Option value={2} name='maintenance_type'>
                                        <span className="flex items-center gap-3 font-pop text-[13px]">
                                            Routine
                                        </span>
                                    </Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000]">
                                    Customer
                                </label>
                                {
                                    (listCustomer && listCustomer.length > 0 ) ? (
                                        <Select
                                            className="w-full text-[13px] font-pop select-custom normal-size"
                                            showSearch
                                            allowClear
                                            placeholder="Select Customer"
                                            optionFilterProp="children"
                                            onChange={e => {
                                                setFilter(prevState => ({
                                                    ...prevState,
                                                    customer_id: e || 0
                                                }))
                                            }}
                                            filterOption={filterOption}
                                            options={listCustomer}
                                        />

                                    ) : (
                                        <Input placeholder="Customer" onChange={handleInput} name="customer_name" />
                                    )
                                }

                                {/* <Select
                                    className="w-full text-[13px] font-pop "

                                    optionFilterProp="children"
                                    onChange={(value, id) => {

                                        console.log("currentValue", value);
                                    }}
                                    placeholder="Select Status"

                                >
                                    <Option value={1}>
                                        <span className="flex items-center gap-3 font-pop text-[13px]">
                                            Customer 1
                                        </span>
                                    </Option>
                                    <Option value={2}>
                                        <span className="flex items-center gap-3 font-pop text-[13px]">
                                            Customer 2
                                        </span>
                                    </Option>
                                </Select> */}
                            </div>
                            {dataLogin?.role_id == adminRoleId && (
                                <div className="mb-3">
                                    <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000]">
                                        Dealer
                                    </label>
                                    {
                                        (listDealer && listDealer.length > 0 ) ? (
                                            <Select
                                                className="w-full text-[13px] font-pop select-custom normal-size"
                                                showSearch
                                                allowClear
                                                placeholder="Select Dealer"
                                                optionFilterProp="children"
                                                onChange={e => {
                                                    setFilter(prevState => ({
                                                        ...prevState,
                                                        dealer_id: e || 0
                                                    }))
                                                }}
                                                filterOption={filterOption}
                                                options={listDealer}
                                            />

                                        ) : (
                                            <Input placeholder="Dealer " onChange={handleInput} name="dealer_name" />
                                        )
                                    }


                                </div>
                            )}
                        </div>
                        <button onClick={triggerFilter} className="button text-white bg-[#CB353E] text-[14px] p-2 rounded-[11px] w-full border-0">Search</button>
                    </div>
                    <div className="w-[calc(100%_-_300px)] flex flex-col flex-1">

                        <div className="flex-1" >
                            <Table pagination={{
                                // pageSize:10,
                                total: tableData?.total ? tableData.total : 0,
                                showSizeChanger: true,
                                size: 'default',
                                showLessItems: true
                            }}
                                rowKey="id"
                                loading={isLoading}
                                onChange={handleTableChange}
                                scroll={{ x: 1800, y: tableHeight }}
                                className="ant-table-custom"
                                size="small"
                                dataSource={tableData?.result || []} columns={columns} />
                        </div>
                    </div>
                </div>


            </BoxContrainer>
            <ModalAntd className="hide-header hide-footer modal-custom overflow-hidden" width={selectedRow?.id ? 1700 : 1300} height={660}

             open={isModalOpen} onCancel={() => {setOpenModal(false); setListHistory([]); setSelectedRow({})}} maskClosable>
                <div className="modal-content-custom h-full gap-[10px] overflow-hidden max-w-full">
                    <div className="left-panel max-w-[300px] min-w-[200px] w-1/4 px-[15px] py-[10px]">
                        <p className="title-panel">Vehicle Information</p>
                        <div className="content-panel">
                            <div className="maintain-state">
                                {dataDetail?.status && getStatusMachine(dataDetail?.status)}
                            </div>
                            <div className="pl-3 mt-[20px]">
                                <div className="mb-2">
                                    <label>VIN</label>
                                    <p>{dataDetail?.vin_no}</p>
                                </div>
                                <div className="mb-2">
                                    <label>Model</label>
                                    <p>{dataDetail?.model_code}</p>
                                </div>
                                <div className="mb-2">
                                    <label>Customer</label>
                                    <p>{dataDetail?.customer_name}</p>
                                </div>
                                <div className="mb-2">
                                    <label>Dealer</label>
                                    <p>{dataDetail?.dealer_name}</p>
                                </div>
                                <div className="mb-2">
                                    <label>Working Hour</label>
                                    <p>{dataDetail?.working_hours}</p>
                                </div>
                                <div className="mb-2">
                                <label className="label-popup-update">Location </label>
                                    <span className="ml-3 badge text-[9px] text-[#35B862] bg-[#D6F1DF]">{getDiffTime(dataDetail?.gpsdate)}</span>
                                    <p >

                                        {
                                            dataDetail && dataLocation.map((item, index) => <span key={index} className="separated-command text-popup-update">{dataDetail?.location && dataDetail?.location[item+'_en']}</span>)
                                        }
                                    </p>
                                </div>
                                <div className="mb-2">
                                    <label>Attachments</label>
                                    <p>_</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span className="w-[1px] bg-[#F3F6FB]"></span>
                    <div className="right-panel flex-1 px-[15px] py-[10px]">
                        <p className="title-panel">Maintenance History</p>
                        <div className="content-panel overflow-hidden">
                            <div className="flex gap-[10px] justify-end mr-0">
                                <Button
                                    onClick={() => {exportDataHistory(dataDetail?.vin_no)}}
                                    size="default"
                                    className="bg-transparent hover:border-[#0a931e] m-0 border-[#d9d9d9]"
                                    icon={
                                    <img
                                        className="ic-export-excel"
                                        src="icons/icon-excel.png"
                                        style={{ width: 17, margin: "auto" }}
                                    />
                                    }
                                    text=""
                                />

                                <div className="w-[300px]">
                                    <DatePicker placeholder="Request Date" format={'DD/MM/YYYY'} style={{ width: '100%' }}  locale={'th'} />

                                </div>
                            </div>
                            <div className="mt-2 overflow-hidden max-w-[100%]">
                                <Table pagination={{
                                    pageSize:10,
                                    total:listHistory.length,
                                    showSizeChanger: false,
                                    size: 'default',
                                    showLessItems: true
                                }}
                                rowSelection={{
                                    columnWidth: 0,
                                    type: 'radio',
                                    selectedRowKeys:[selectedRow?.id],
                                  }}

                                onRow={(record, rowIndex) => {
                                    return {
                                      onClick: event => {
                                        console.log(event)
                                        if(selectedRow?.id == record.id){
                                            setSelectedRow({})
                                        }else{
                                            setSelectedRow(record)
                                        }
                                        // console.log(record, rowIndex)
                                      }, // click row
                                    };
                                  }}
                                scroll={{ x:800,y: tableHeight }}
                                className="ant-table-custom hide-selection"
                                size="small"
                                dataSource={listHistory} columns={columnsHistory} />
                            </div>
                        </div>

                    </div>
                    {selectedRow?.id &&
                        <>
                            <span className="w-[1px] bg-[#F3F6FB]"></span>
                            <div className="end-panel max-w-[300px] w-[300px] min-w-[200px] px-[15px] py-[10px]">
                            <p className="title-panel">Maintenance Details</p>
                            <div className="content-panel">
                                <div className="pl-3">
                                    <div className="mb-2">
                                        <label>Status</label>
                                        <span className="flex items-center gap-[8px] font-pop text-popup-update">
                                        {selectedRow.status === 1 ? <><i className="fa fa-circle text-[9px] text-[#0169B6]" aria-hidden="true"></i>
                                            Ontime</>
                                            :
                                            <>
                                                <><i className="fa fa-circle text-[9px] text-[#F4B73F]" aria-hidden="true"></i>
                                                    Late</>
                                            </>
                                        }
                                    </span>
                                    </div>
                                    <div className="mb-2">
                                        <label>Inform Time</label>
                                        <p>{moment(selectedRow?.inform_time).format('DD/MM/YYYY HH:mm:ss')}</p>
                                    </div>
                                    <div className="mb-2">
                                        <label>Maintenance Type</label>
                                        <p>{selectedRow.maintenance_type}</p>
                                    </div>
                                </div>
                            </div>
                            <p className="title-panel mt-[40px]">Attachments</p>
                            <div className="content-panel">
                                <div className="pl-3 ">
                                    <div className="mb-2">
                                        <label>Record Working Hour </label>
                                        <p>{selectedRow.working_hour}</p>
                                    </div>
                                    <div className="mb-2">
                                        <label>Record Time</label>
                                        <p>{moment(selectedRow?.record_time).format('DD/MM/YYYY HH:mm:ss')}</p>
                                    </div>
                                    <div className="mb-2">
                                        <label>Attachments</label>
                                        <div className="flex items-center justify-between">
                                        {(selectedRow && selectedRow.original_file_name) ? (
                                                            <>
                                                                <p>{`${selectedRow.original_file_name}${selectedRow.original_extension}`}</p>
                                                                <button className="hover:bg-[#CB353E]  hover:border-[#CB353E] border-[#4AA3E7] hover:text-white btn font-medium font-pop px-3 rounded-[10px] text-[10px] py-[4px] text-[#333]" onClick={() => {
                                                                    let a = MEDIA_SRC_ROOT+`${selectedRow.keep_file_path}${selectedRow.keep_file_name}`
                                                                    // console.log(MEDIA_SRC_ROOT+`${selectedRow.keep_file_path}${selectedRow.keep_file_name}`)
                                                                    handleDownload(a, selectedRow.original_file_name)
                                                                }}>
                                                                    <i className="fa fa-file-download mr-2 text-[9px]"></i>
                                                                    Download
                                                                </button>
                                                            </>
                                                        ) : (<></>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    }
                </div>

            </ModalAntd>

            <Alert
                setting={alertSetting}
                onConfirm={() => {
                    setAlertSetting({show: false})
                  }}
                  onCancel={() => {
                    setAlertSetting({show: false})
                  }}
                />

        </Suspense>
    )
}

const mapStateToProps = (state) => ({
    header: state.signin.header,
    language: state.versatile.language,
    dataLogin: state.signin.dataLogin,
});

const mapDispatchToProps = (dispatch) => ({
    // setIdSelectCustomer: (id, action) => dispatch(CustomerActions.setIdSelectCustomer(id, action)),
});

export default (connect(mapStateToProps, mapDispatchToProps)(MachineTractor))

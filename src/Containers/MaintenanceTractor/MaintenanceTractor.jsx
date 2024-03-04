import React, { Component, Suspense, useCallback, useMemo, useState } from "react";
import { connect, useSelector } from 'react-redux'
import { BoxContrainer, Button } from "../../components_new";
import { ConsoleSqlOutlined, EditOutlined, GlobalOutlined, InfoCircleOutlined, UploadOutlined } from "@ant-design/icons";
import {  Row, Col, Checkbox, Select, Button as ButtonAntd, Table, AutoComplete, Input, Tag, Modal as ModalAntd, Divider, DatePicker, Space, Form, Typography, Upload, Result } from "antd";
import FormInput from "../../Components/FormControls/Basic/FormInput";
import Alert from '../../Components/Alert'
import moment from 'moment'
import { useEffect } from "react";
import { Search } from '@material-ui/icons';
import TractorApi from "../../Services/TractorApi";
import dayjs from 'dayjs';
import { values } from "lodash";
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
}
const api = TractorApi.create();

const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const maxSizeUploadFile = 1.5 * 1024 * 1024 //1.5mb

const MaintenanceTractor = (props) => {

    const {dataLogin} = useSelector(state => state.signin)
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const [tableHeight, setTableHeight] = useState(0);
    const [isModalOpen, setOpenModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState({})
    const [isLoading, setLoading] = useState(false)
    const [tableData, setTableData] = useState([])
    const [alertSetting, setAlertSetting] = useState({ show: false, type: 0, icon: null })
    const [isModalSuccessOpen, setOpenModalSuccess] = useState(false)
    const [idDetail, setidDetail] = useState('')
    const [dataDetail, setdataDetail] = useState('')
    const [dataLocation, setdataLocation] = useState(['admin_level1_name', 'admin_level2_name', 'admin_level3_name'])
    const [inputFile, setInputFile] = useState(0);
    const [clickError, setClickError] = useState(true)
    const [idFile, setIFile] = useState('')
    const [critical, setCritical] = useState({
        page: 1,
        limit: 10,
        user_id: dataLogin.user_id,
        ...defaultFilter
    })

    const [listDealer, setListDealer] = useState([])
    const [listCustomer, setListCustomer] = useState([])
    const [listModel, setListModel] = useState([])

    const onCloseDetail = () => {
        setOpenModal(false)
        setdataDetail({})
    }

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

              let list = data.result.customer_list.map((e) => ({
                value: e.customer_name,
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
            if (data && data?.code == 200) {
                setListModel(data.result)
            }
        }


        // fetchDealer()
        fetchModel()
        getCustomer()
        getSeller()
    }, [])

    const getDiffTime = (time) => {
        if(time){

          var duration = moment.duration(moment().diff(time));
          var hours = duration.asHours();
          var minutes = duration.asMinutes();
          if(hours> 24){
            return `${Math.trunc(hours%24)} days ago`
          }else if(hours > 1){
            return `${Math.trunc(hours)} hours ago`
          }else if(minutes > 1) {
            return `${Math.trunc(minutes)} minutes ago`
          }
        }
    }

   
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
        if(dataLogin.role_id==18){
          params.push(`dealer_id=${dataLogin.user_id}`)
        }
        
        try {
            axios.get(`${ENDPOINT_BASE_URL_YNM_VNTEAM}fleet/maintenance/tractor/export?${params.join('&')}`, {
                responseType: 'blob',
                'Content-type': 'application/json'
            })
                .then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,"}));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute(
                        "download",
                        `${'Maintenance Export Data_'+moment().format('YYYYMMDD')}.xlsx`
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

    const [filter, setFilter] = useState(defaultFilter);

    const fetchData = async () => {
        setLoading(true)
        let params = [];
        if(critical.user_id){
            critical.dealer_name = ''
        }
        Object.keys(critical).forEach(keys => {
            if(critical[keys] != '' )
                params.push(`${keys}=${critical[keys]}`)
        })
        // alert(1)
        // if(dataLogin.role_id==18){
        //   params.push(`dealer_id=${dataLogin.user_id}`)
        // }
        // params.push('role_id'=dataLogin.role_id)
        // params+=`&user_id=${dataLogin.user_id}&role_id=${dataLogin.role_id}`
        try {
            var resp = await api.getListDataMaintenance(params.join('&'));
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
    useEffect(_ => {
        fetchData()
    }, [critical])


    const elementRefBar = useCallback(node => {
        if (!node) return;
        const resizeObserver = new ResizeObserver(_debounce(300, function (muts) {
            const height = node.offsetHeight
            // console.log(height)
            setTableHeight(height - 100)
            console.log(height - 100)
        }));
        resizeObserver.observe(node);
    }, []);


    const fetchDataDetail = async (id) => {
        setLoading(true)
        try {
            if (id) {
                var resp = await api.getDetailMaintenance(id);
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

    const valueLocation = () => {
        let location = []
        for (var i = 1; i < 4; i++) {
            let value = 'admin_level' + i + '_name' + '_en'
            location.push(value)
        }
        setdataLocation(location)

    }

    const handleOpenModal = (value) => {
        setidDetail(value)
        fetchDataDetail(value)
        setOpenModal(true)
        valueLocation()
    }
    const triggerFilter = () => {
        setCritical(prevState => ({
            ...prevState,
            page: 1,
            ...filter
        }))
    }

    const handleInput = e => {
        const { name, value } = e.target; // <-- moved outside asynchronous context
        setFilter(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const handleTableChange = (pagination, filters, sorter) => {

        setCritical(prevState => ({
            ...prevState,
            page: prevState.limit != pagination.pageSize ? 1 : pagination.current,
            limit: pagination.pageSize
        }))
    };


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
            `${filename}`
        );
        document.body.appendChild(link);
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      })
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

    const columns = useMemo(() => {
        return [
            {
                title: 'Status',
                className: 'text-[14px] whitespace-nowrap',
                dataIndex: 'status',
                key: 'status',
                width: '120px',
                render: value => {
                    switch (value) {
                        case 1:
                            return <span className="flex w-fit font-semibold items-center gap-[12px] font-pop pl-[8px] py-2 pr-[12px] text-[#489FEA] bg-[#4190F740] text-[12px] rounded-[15px]">
                                <i className="fa fa-circle text-[9px] text-[#4AA3E7]" aria-hidden="true"></i>
                                On Time
                            </span>
                        case 2:
                            return <span className="flex w-fit font-semibold items-center gap-[12px] font-pop pl-[8px] py-2 pr-[12px] text-[#F4B73F] bg-[#F4B73F40] text-[12px] rounded-[15px]">
                                <i className="fa fa-circle text-[9px] text-[#F4B73F]" aria-hidden="true"></i>
                                Late
                            </span>
                    }
                }
            },
            {
                title: 'VIN',
                className: 'text-[14px] whitespace-nowrap',
                dataIndex: 'vin_no',
                key: 'vin_no',
            },
            {
                title: 'Model',
                className: 'text-[14px] whitespace-nowrap',
                dataIndex: 'model_code',
                key: 'model_code',


            },
            {
                title: 'Inform time',
                className: 'text-[14px] whitespace-nowrap',
                dataIndex: 'inform_time',
                key: 'inform_time',
                render: (value) => {
                    return value ? moment(value).format('DD/MM/YYYY HH:mm:ss') : ''
                },
                width: 160,

            },
            {
                title: 'Recorded time',
                className: 'text-[14px] whitespace-nowrap',
                dataIndex: 'record_time',
                key: 'record_time',
                width: 160,
                render: (value) => {
                    return value ? moment(value).format('DD/MM/YYYY HH:mm:ss') : ''
                },
            },
            {
                title: 'Customer',
                className: 'text-[14px] whitespace-nowrap',
                dataIndex: 'customer_name',
                key: 'customer_name',
            },
            {
                title: 'Maintenance Type',
                className: 'text-[14px] whitespace-nowrap',
                width: 240,
                dataIndex: 'maintenance_type',
                key: 'maintenance_type',
                // render: value => {
                //     switch (value) {
                //         case 1: return 'Predictive maintenance'
                //         case 2: return 'Condition-based maintenance'
                //         case 3: return 'Breakdown maintenance'
                //     }
                // }
            },

            {
                title: '',
                className: 'text-[14px] text-right',
                dataIndex: 'id',
                key: 'id',
                width: 50,
                fixed: 'right',
                render: (value) => {
                    return <button onClick={() => handleOpenModal(value)} className="rounded-full w-[28px] h-[28px] text-center bg-[#F4F9FF]">
                        <EditOutlined />
                    </button>
                }
            },
        ];
    }, [])


    const onUploadFile = async (e) => {
        const file = e.target.files[0];
        if (file.size >= maxSizeUploadFile) {
            setAlertSetting({
                show: true,
                type: 2,
                ErrorSubcode: 'File size exceeds limit. Please select a smaller file and try again.'
            })
            setInputFile(prs => prs + 1);
            setClickError(true)
            return
        }
        // console.log(file, 'kt size');
        const fd = new FormData();
        fd.append("file", file);

        const options = {
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percent = Math.floor((loaded * 100) / total);
                if (percent < 100) {
                    setUploadPercentage(percent);
                }
            },
        };

        try {
            setLoading(true)
            const response = await api.upLoadFileTractorMaintenance(fd, options)
            if (response.status == 200) {
                setUploadPercentage(100);
                setTimeout(() => {
                    setIFile(response.data.attach_id)
                    setUploadPercentage(0)
                    setClickError(false)
                    setLoading(false)
                    // handleClose();
                    // refetch();
                }, 1000);
                // setInputFile(null);
            }
        } catch (error) {
            setUploadPercentage(0)
            setLoading(false)
        }
        // }
        // else{
        //     setClickError(true)
        //     setInputFile(prs => prs + 1);

        // }
        //   console.log('kt isModalOpen', e.target.value);
    };

    const onSubmit = async () => {
        const data = { attach_id: idFile, id: idDetail, working_hours: dataDetail.working_hours }
        try {
            setLoading(true)
            const response = await api.updateMaintenanceEdit(idDetail, data)
            if (response.status == 200) {
                setLoading(false)
                setOpenModal(false)
                setOpenModalSuccess(true)
                setInputFile(prs => prs + 1);
                fetchData()
            } else {
                setAlertSetting({ show: true, type: 2, content: 'Something wrong, please contact web administrator or try again later' })
            }
        } catch (error) {
            setLoading(false)
        }
    };

    const dateFormatList = ['DD/MM/YYYY'];

    return (
        <Suspense fallback={null}>
            <BoxContrainer
                title="Maintenance"
                className="font-pop min-h-[600px] h-[calc(100vh_-_115px)] flex flex-col overflow-hidden"
                boxContentClass="flex-1 flex flex-col min-h-[400px] box-content-custom"
                toolbarRight={
                    <Col>
                        <ButtonAntd
                            onClick={() => {
                                exportData()
                            }}
                            icon={<i className="icon-excel-01" style={{ paddingRight: 5 }} />}
                            style={{ marginLeft: 10 }}
                        />

                    </Col>
                }
            >
                <div className="gap-[10px] font-pop text-[#000] flex h-[100%]" ref={elementRefBar}>
                    <div className="w-[300px] flex justify-between flex-col pr-1 gap-[15px]">
                        <div className="overflow-auto pr-2" >
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
                                            status: e || 0
                                        }))
                                    }}
                                >
                                    <Option value={1} name='status'>
                                        <span className="flex items-center gap-3 font-pop text-[13px]">
                                            <i className="fa fa-circle text-[9px] text-[#1890ff]" aria-hidden="true"></i>
                                            OnTime
                                        </span>
                                    </Option>
                                    <Option value={2} name='status'>
                                        <span className="flex items-center gap-3 font-pop text-[13px]">
                                            <i className="fa fa-circle text-[9px] text-[#F4B73F]" aria-hidden="true"></i>
                                            Late
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
                                {/* <Input placeholder="Type VIN " onChange={handleInput} name="vin_no" /> */}
                                {/* <AutoComplete
                                    style={{ width: "100%" }}
                                    // onChange={handleInput}
                                    placeholder={("dealer")}
                                    allowClear={false}
                                >

                                </AutoComplete> */}
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
                                {/* <Input placeholder="Maintenance type " onChange={handleInput} name="maintenance_type" /> */}
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
                                                    customer_name: e || ''
                                                }))
                                            }}
                                            filterOption={filterOption}
                                            options={listCustomer}
                                        />

                                    ) : (
                                        <Input placeholder="Customer" onChange={handleInput} name="customer_name" />
                                    )
                                }

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
                            <div className="mb-3">
                                <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000]">
                                    Inform Time
                                </label>
                                <div>
                                    <Space direction="vertical" style={{ width: "100% " }}>
                                        <DatePicker format={dateFormatList} style={{ width: "100% " }} onChange={(e) => {
                                            setFilter(prevState => ({
                                                ...prevState,
                                                inform_time: e ? e.unix() : ""
                                            }))
                                        }} />
                                    </Space>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000]">
                                    Recorded time
                                </label>
                                <div>
                                    <Space direction="vertical" style={{ width: "100% " }}>
                                        <DatePicker format={dateFormatList} style={{ width: "100% " }} onChange={(e) => {
                                            setFilter(prevState => ({
                                                ...prevState,
                                                record_time: e ? e.unix() : ""
                                            }))
                                        }} />
                                    </Space>
                                </div>
                            </div>
                        </div>
                        <button onClick={triggerFilter} className="button mr-2 text-white bg-[#CB353E] text-[14px] p-2 rounded-[11px] w-full border-0">Search</button>
                    </div>
                    <div className="w-[calc(100%_-_300px)] flex flex-col flex-1">
                        {/* <div className="text-right">
                            <button className="bg-[#CB353E] w-fit btn font-medium font-pop px-4 rounded-[10px] text-[14px] py-[6px] text-white" onClick={() => handleOpenModal(null)}>
                                <i className="fa fa-plus mr-2 text-[9px]"></i>
                                Add User
                            </button>

                        </div> */}
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
                                scroll={{ x: 1200, y: tableHeight }}
                                className="ant-table-custom"
                                size="small"
                                dataSource={tableData.result} columns={columns} />
                        </div>
                    </div>
                </div>


            </BoxContrainer>


            <ModalAntd className="hide-header hide-footer modal-custom overflow-hidden" width={650} height={660}

                open={isModalOpen} onCancel={() => onCloseDetail()} maskClosable>
                <div className="modal-content-custom gap-[10px] overflow-hidden max-w-full">
                    <div className="left-panel max-w-[304px] min-w-[200px] w-[42%] px-[15px] py-[10px]">
                        <p className="title-panel">Vehicle Information</p>
                        <div className="content-panel">
                            <div className="pl-3 mt-[20px]">
                                <div className="mb-2">
                                    <label className="label-popup-update">VIN</label>
                                    <p className="text-popup-update">{dataDetail.vin_no}&nbsp;</p>
                                </div>
                                <div className="mb-2">
                                    <label className="label-popup-update">Model</label>
                                    <p className="text-popup-update">{dataDetail.model_code}&nbsp;</p>
                                </div>
                                <div className="mb-2">
                                    <label className="label-popup-update">Customer</label>
                                    <p className="text-popup-update">{dataDetail.customer_name}&nbsp;</p>
                                </div>
                                <div className="mb-2">
                                    <label className="label-popup-update">Dealer</label>
                                    <p className="text-popup-update">{dataDetail.dealer_name}&nbsp;</p>
                                </div>
                                <div className="mb-2">
                                    <label className="label-popup-update">Working Hour</label>
                                    <p className="text-popup-update">{dataDetail.working_hours}&nbsp;</p>
                                </div>
                                <div className="mb-2">
                                    <label className="label-popup-update">Location </label>
                                    <span className="ml-3 badge text-[9px] text-[#35B862] bg-[#D6F1DF]">{getDiffTime(dataDetail?.gpsdate)}</span>
                                    <p>

                                        {
                                            dataDetail && dataLocation.map((item, index) => <span key={index} className="separated-command text-popup-update">{dataDetail?.location && dataDetail?.location[item]}</span>)
                                        }
                                    </p>
                                    {/* <p>Lardprao, Lardprao, Bangkok</p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <span className="w-[2px] bg-[#F3F6FB]"></span>
                    <div className="end-panel max-w-[332px] w-[58%] min-w-[200px] pl-[15px] py-[10px]">
                        <p className="title-panel">Maintenance Details</p>
                        <div className="content-panel">
                            <div className="pl-3">
                                <div className="mb-2">
                                    <label className="label-popup-update">Status</label>
                                    <span className="flex items-center gap-[8px] font-pop text-popup-update">
                                        {dataDetail.status === 1 ? <><i className="fa fa-circle text-[9px] text-[#0169B6]" aria-hidden="true"></i>
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
                                    <label className="label-popup-update">Inform Time</label>
                                    <p className="text-popup-update">{dataDetail?.inform_time ? moment(dataDetail.inform_time).format('DD/MM/YYYY HH:mm:ss') : "-"}&nbsp;</p>
                                </div>
                                <div className="mb-2">
                                    <label className="label-popup-update">Maintenance Type</label>
                                    <p className="text-popup-update">{dataDetail.maintenance_type}</p>
                                </div>
                            </div>
                        </div>
                        <p className="title-panel mt-5">Dealer Record</p>
                        <div className="content-panel">
                            <div className="pl-3 ">
                                <div className="mb-2">
                                    <label className="text-[#000000] text-[15px] font-normal">Record Time</label>
                                    {
                                        dataLogin?.role_id == adminRoleId ? (
                                            <p className="text-popup-update">{moment(dataDetail.record_time).format('DD/MM/YYYY HH:mm:ss')}</p>
                                        ) : (
                                            <Typography >
                                                <pre className="text-[15px] text-[#3D3D3D] font-mediumm font-['Poppins']  my-1 bg-[#DEE2EA] px-4 boder-text-input" >{dataDetail.record_time ? moment(dataDetail.record_time).format('DD/MM/YYYY HH:mm:ss') : '-'}</pre>
                                            </Typography>
                                        )
                                    }

                                </div>

                                <div className="mb-2 mt-3">
                                    <label className="text-[#000000] text-[15px] font-normal"> Working Hour <span className="text-[#A2A2A2] text-[11px] font-normal">(Decimal 2 digit)</span></label>
                                    {
                                        dataLogin?.role_id == adminRoleId ? (
                                            <p className="text-popup-update">{dataDetail.working_hours}</p>
                                        ) : (
                                            <input type="text" className="custom-inputfile-new w-full text-[15px] font-medium px-4 boder-text-input" defaultValue={dataDetail.working_hours} onChange={e => {
                                                let target = e.target

                                                setdataDetail(prevState => ({
                                                    ...prevState,
                                                    working_hours: target.value
                                                }))
                                            }} />
                                        )
                                    }

                                </div>
                                <div className="mb-2 mt-3">
                                    {
                                        dataLogin?.role_id == adminRoleId ? (
                                            <>
                                                <label>Attachments</label>
                                                    <div className="flex items-center justify-between">
                                                        {(dataDetail && dataDetail.attach_id && dataDetail.original_file_name) ? (
                                                            <>
                                                                <p>{`${dataDetail.original_file_name}${dataDetail.original_extension}`}</p>
                                                                <button className="hover:bg-[#CB353E]  hover:border-[#CB353E] border-[#4AA3E7] hover:text-white btn font-medium font-pop px-3 rounded-[10px] text-[10px] py-[4px] text-[#333]" onClick={() => {
                                                                    let a = MEDIA_SRC_ROOT+`${dataDetail.keep_file_path}${dataDetail.keep_file_name}`
                                                                    // console.log(MEDIA_SRC_ROOT+`${dataDetail.keep_file_path}${dataDetail.keep_file_name}`)
                                                                    handleDownload(a, dataDetail?.original_file_name+dataDetail?.original_extension)
                                                                }}>
                                                                    <i className="fa fa-file-download mr-2 text-[9px]"></i>
                                                                    Download
                                                                </button>
                                                            </>
                                                        ) : (<>-</>)}

                                                    </div>
                                            </>
                                        ) : (
                                            <>
                                                <label className="text-[#000000] text-[15px] font-normal">Attachments <span className= 'text-[#A2A2A2] text-[11px] font-normal'>(PDF, Maximum size 1.5 MB)</span> </label>
                                                    <div className="flex custom-inputfile-new justify-center boder-text-input">
                                                        <input
                                                            className="outline-none focus:border-0 custom-inputfile text-[14px] font-normal font-['Poppins'] px-4"
                                                            type="file"
                                                            name="file"
                                                            accept=".pdf"
                                                            id="file"
                                                            placeholder="vvzcvcz"
                                                            onChange={(e) => onUploadFile(e)}
                                                            key={inputFile}
                                                        />
                                                        <label className="cursor-pointer px-[14px] py-[1px] rounded-[4px] bg-[#DEE2EA] text-[#000000] text-[11px] font-normal" htmlFor="file">Brower</label>
                                                    </div>
                                                    <div className={(((uploadPercentage > 0 && uploadPercentage < 100)? "bg-slate-400" : "bg-transparent")) +" h-[5px] w-100  "}>
                                                        <span className={`w-[${uploadPercentage}] h-[5px] w-100 d-block bg-lime-500`}></span>
                                                    </div>
                                            </>
                                        )
                                    }

                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                <div className="h-[2px] bg-[#F3F6FB] w-[90%]">  </div>

                <div className="modal-content-custom gap-[10px] overflow-hidden max-w-full">
                    <div className="left-panel max-w-[304px] min-w-[200px] w-[42%] "></div>
                    <span className="w-[2px]]"></span>
                    <div className="end-panel max-w-[332px] w-[58%] min-w-[200px] pl-[15px] py-[10px]"  >
                        <div className="flex items-center justify-between pl-3 mb-1">
                            <button className=" border-[#CB353E] hover:bg-[#CB353E] hover:text-white text-[#CB353E] btn font-medium font-pop px-4 rounded-[9px] text-[15px] py-[6px] w-[49%]" onClick={() => onCloseDetail()}>
                                Cancel
                            </button>
                            <button className="bg-[#CB353E] hover:bg-white hover:border-[#CB353E] hover:text-[#CB353E] btn font-medium font-pop px-4 rounded-[9px] text-[15px] py-[6px] text-white w-[49%]" onClick={onSubmit} disabled={clickError == true ? true : false}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>

            </ModalAntd>

            <ModalAntd className="hide-header hide-footer modal-custom modal-result overflow-hidden" width={521} height={660}
                open={isModalSuccessOpen} onCancel={() => { setOpenModalSuccess(false) }} maskClosable>
                <div className="modal-content-custom gap-[10px] overflow-hidden max-w-full flex-1">
                    <div className="px-[20px] py-[18px] flex-1">
                        <p className="title-panel">&nbsp;</p>
                        <div className="content-panel">
                            <Result
                                status="success"
                                title={"Update successfully!"}
                                // subTitle="Lorem Ipsum is simply dummy text of the printing and typesetting."
                                extra={[
                                    <button className="button text-white h-[45px] bg-[#CB353E] text-[14px] p-2 rounded-[11px] w-full border-0" onClick={() => {
                                        setOpenModalSuccess(false);
                                    }}>Continue</button>
                                ]}
                            />

                        </div>
                    </div>
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

export default (connect(mapStateToProps, mapDispatchToProps)(MaintenanceTractor))

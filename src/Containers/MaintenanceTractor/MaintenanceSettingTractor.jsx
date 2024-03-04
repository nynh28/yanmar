import React, { Component, Suspense, useCallback, useMemo, useState } from "react";
import { connect } from 'react-redux'
import { BoxContrainer, Button } from "../../components_new";
import { GlobalOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Alert,Row, Col, Checkbox, Select, Button as ButtonAntd, Table, AutoComplete, Input, Tag, Modal as ModalAntd, Divider, DatePicker, Switch } from "antd";
import FormInput from "../../Components/FormControls/Basic/FormInput";
import moment from 'moment'
import { useEffect } from "react";
import { Search } from '@material-ui/icons';
import TractorApi from "../../Services/TractorApi";
import { debounce } from "lodash";
import Highlighter from 'react-highlight-words'
import MaintenanceSettingTractorForm from "./MaintenanceSettingTractorForm";

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
const dataSource = [...Array(59)].map((i, index) => {
    let d = {
        index: index+1,
        key: Math.random(),
        name: Math.random().toString(36).slice(2, 9).toUpperCase(),
        status: Math.floor(Math.random() * 3) + 1,
        maintenanceType: Math.floor(Math.random() * 3) + 1,
        vin: Math.random().toString(36).slice(2, 15).toUpperCase(),
        model: Math.random().toString(36).slice(2, 9).toUpperCase(),
        informDate: moment().subtract(1,'m').format('DD/MM/YYYY HH:mm:ss'),
        recordDate: moment().format('DD/MM/YYYY HH:mm:ss')
    }
    return d
})

const api = TractorApi.create()
const defaultFilter = {
    username: '',
    display_name: '',
    email: '',
    mobile: '',
    role_id: 0
}
const MaintenanceSettingTractor = (props) => {

    const [isLoading, setLoading] = useState(false)
    const [tableHeight, setTableHeight] = useState(0);
    const [isModalOpen, setOpenModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState({})
    const [tableData, setTableData] = useState({ result: [], total: 0 })
    const [ data, setData ] = useState({ result: [], total: 0 })
    const [searchValue, setSearchValue] = useState('')
    const [critical, setCritical] = useState({
        page: 1,
        limit: 1000,

    })
    const [filter, setFilter] = useState(defaultFilter)
    // useEffect(_ => {
    //     console.log(selectedRow)
    // }, [selectedRow])

    const elementRefBar = useCallback(node => {
        if (!node) return;
        const resizeObserver = new ResizeObserver(_debounce(300, function (muts) {
            // console.log(node.offsetWidth);
            const height = node.offsetHeight
            // console.log(height)
            setTableHeight(height - 100 - 40)
            // console.log(height - 100)
        }));
        resizeObserver.observe(node);
    }, []);

    useEffect(_ => {
        fetchData()
    }, [])

    const handleOpenModal = (id) => {
        console.log('open modal', id)
        setOpenModal(true)
    }

    const handleSelectRow = (e) => {
        console.log(e)
    }


    const fetchData = async () => {
        setLoading(true)
        let params = [];
        Object.keys(critical).forEach(keys => {
            params.push(`${keys}=${critical[keys]}`)
        })
        // console.log(params.join('&'))
        try {
            var resp = await api.getListSetting(params.join('&'));
            var data = resp.data;
            if (data?.code == 200) {
                setData(data)
                setTableData(data)
                setLoading(false)
            }else{
              console.log('error', data)
              setLoading(false)
              // setAlertSetting({
              //     show: true,
              //     type:2,
              //     ErrorSubcode: 'Something wrong, please try again later.'
              // })
            }

        } catch (e) {
            console.log(e)
            setLoading(false)

        }
    }
    const debouncedSearch = useCallback(
        debounce(nextValue => {
                // console.log(nextValue)
                setSearchValue(nextValue)
        }, 300),
        [], // will be created only once initially
    );

    const handleSearch = event => {
        event.persist();
        const { value: nextValue } = event.target;
        // Even though handleSearch is created on each render and executed
        // it references the same debouncedSearch that was created initially
        debouncedSearch(nextValue);
    };

    const columns =  [
            {
                title: 'Model',
                className: 'text-[14px] border-l-0',
                dataIndex: 'model_code',
                key: 'model_code',
                width: '',
                // filteredValues: 'F',
                filteredValue: [searchValue],
                onFilter: (value, record) =>{
                    // console.log(record, value)
                    return record.model_code.toString().toLowerCase().includes(value.toLowerCase())
                //     // return
                //     // record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
                },
                render: text =>
                    searchValue ? (
                        <Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[searchValue]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ''}
                        />
                    ) : (
                        text
                    ),
            },
            {
                title: 'Maintenance',
                className: 'text-[14px] ',
                dataIndex: 'status_maintenance',
                key: 'status_maintenance',
                width: '120px',
                render: value => {
                    // console.log(value)
                    switch(value){
                        case true:
                            return  <span className="flex w-fit font-semibold items-center gap-[12px] font-pop pl-[8px] py-2 pr-[12px] text-[#5AC363] bg-[#5AC36352] text-[12px] rounded-[15px]">
                                        <i className="fa fa-circle text-[9px] text-[#5AC363]" aria-hidden="true"></i>
                                        ON
                                    </span>
                        case false:
                            return  <span className="flex w-fit font-semibold items-center gap-[12px] font-pop pl-[8px] py-2 pr-[12px] text-[#E56234] bg-[#E76F3540] text-[12px] rounded-[15px]">
                                        <i className="fa fa-circle text-[9px] text-[#E56234]" aria-hidden="true"></i>
                                        OFF
                                    </span>
                            // return <span className="bg-[#4190F740] text-[#4190F7] text-[14px] px-[8px] py-[4px] rounded-[5px] overflow-hidden font-pop">Waiting</span>

                    }
                }
            },

            {
                title: 'First Maintenance',
                className: 'text-[14px] ',
                dataIndex: 'first_maintenance_time',
                key: 'first_maintenance_time',
                render: value => `First ${value} hours`
            },
            {
                title: 'First Maintenance (inform)',
                className: 'text-[14px] ',
                dataIndex: 'notification_inform',
                key: 'notification_inform',
                width: 250,
            },
            {
                title: 'Routine',
                className: 'text-[14px] ',
                dataIndex: 'routine_type',
                key: 'routine_type',
                width: 150,
            },
            {
                title: 'Routine (Inform)',
                className: 'text-[14px] ',
                dataIndex: 'routine_notification_inform',
                key: 'routine_notification_inform',
            },

        ];



    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
                title="Maintenance Setting"
                className="font-pop min-h-[600px] h-[calc(100vh_-_115px)] flex flex-col overflow-hidden"
                boxContentClass="flex-1 flex flex-col min-h-[400px] box-content-custom"
                toolbarRight={
                    <Col>
                        <ButtonAntd
                            icon={<i className="icon-excel-01" style={{ paddingRight: 5 }} />}
                            style={{ marginLeft: 10 }}
                        />

                    </Col>
                }
            >
                <div className="gap-[15px] font-pop text-[#000] flex h-[100%]" ref={elementRefBar}>

                    <div className="w-3/4 flex flex-col">
                        <div className="text-right w-[300px] ml-auto mb-[5px]">
                            <Input placeholder="Search Model" onChange={handleSearch} allowClear prefix={<Search className='text-[#666]'/>} />
                        </div>
                        <div className="flex-1" >

                            <Table pagination={{
                                defaultPageSize:10,
                                // total:tableData.result.length,
                                showSizeChanger: true,
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
                                    if(selectedRow?.id == record.id){
                                        setSelectedRow({})
                                    }else{
                                        setSelectedRow(record)
                                    }
                                    // console.log(record, rowIndex)
                                  }, // click row
                                };
                              }}
                                loading={isLoading}
                                rowKey="id"
                                scroll={{ x: 1200, y: tableHeight }}
                                className="ant-table-custom hide-selection"
                                size="small"
                                dataSource={tableData.result} columns={columns}/>
                        </div>
                    </div>
                    <div className="w-1/4">
                        <MaintenanceSettingTractorForm refetch={fetchData} api={api} rowData={selectedRow}/>
                    </div>
                </div>


            </BoxContrainer>



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

export default (connect(mapStateToProps, mapDispatchToProps)(MaintenanceSettingTractor))

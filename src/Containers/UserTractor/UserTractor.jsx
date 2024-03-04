import React, { Component, Suspense, useCallback, useMemo, useState } from "react";
import { connect, useDispatch, useSelector } from 'react-redux'
import { BoxContrainer, Button, FormLoading, LoadingLayout } from "../../components_new";
import { GlobalOutlined, InfoCircleOutlined } from "@ant-design/icons";
import {  Row, Col, Checkbox, Select, Button as ButtonAntd, Table, AutoComplete, Input, Tag, Modal as ModalAntd, Divider, DatePicker, Result, Tooltip, Switch } from "antd";
import FormInput from "../../Components/FormControls/Basic/FormInput";
import moment from 'moment'
import { useEffect } from "react";
import { Search } from '@material-ui/icons';
import TractorUserActions, { TractorUserTypes } from "../../Redux/TractorUserRedux";
import useSelection from "antd/lib/table/hooks/useSelection";
import TractorApi from "../../Services/TractorApi";
import Alert from '../../Components/Alert'
import UserTractorForm from "./UserTractorForm";
import { Controller, useForm } from "react-hook-form";
import { YM_BASE_URL, adminRoleId, listRole } from "../../Config/app-config";
import AutocompleteSearch from '../../components_new/Async/AutocompleteSearch'

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
    username: '',
    display_name: '',
    email: '',
    mobile: '',
    role_id: 0
}

const api = TractorApi.create();
const UserTractor = (props) => {

    const dispatch = useDispatch();
    const {dataLogin} = useSelector(state => state.signin)
    const {versatile} = useSelector(state => state.versatile)
    // const { listUsers : {result: tableData, total },  } = useSelector(state => state.tractorUser)
    const [tableHeight, setTableHeight] = useState(0);
    const [isModalOpen, setOpenModal] = useState(false)
    const [isModalSuccessOpen, setOpenModalSuccess] = useState(false)
    const [modalConfirmDelete, setModalConfirmDelete] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [listDealer, setListDealer] = useState([])
    const [deleteResult, setDeleteResult] = useState()
    // const [listRole, setListRole] = useState([])
    const [selectedRow, setSelectedRow] = useState({action: 'add-new'})
    const [alertSetting, setAlertSetting] = useState({show: false, type:0, icon:null})
    const [critical, setCritical] = useState({
        page: 1,
        limit: 10,
        username: '',
        display_name: '',
        email: '',
        mobile: '',
        role_id: 0
    })
    const [filter, setFilter] = useState(defaultFilter)

    const getSeller = async (value) => {
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
          // console.log(data.result.dealer_list);
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

    useEffect(_ => {
        if(isModalSuccessOpen){
            triggerFilter()
        }
    }, [isModalSuccessOpen])


    useEffect(_ => {
        getSeller()
    }, [])

    useEffect(_ => {
        fetchData()

    }, [critical])

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
            [name]: value.replace('#', '')
        }))
    };

    const [tableData, setTableData] = useState({ result: [], total: 0 })

    const handleTableChange = (pagination, filters, sorter) => {

        setCritical(prevState => ({
            ...prevState,
            page: prevState.limit != pagination.pageSize ? 1 : pagination.current,
            limit: pagination.pageSize
        }))
    };

    const onUpdateUserStatus = async (user_id, status) => {

        try{
            setLoading(true)
            var res = await api.updateUserStatus({user_id, status: status ? 'A' : 'D'})
            var data = res.data
            if(data?.code == 200){
            setLoading(false)
                setDeleteResult({status: 'success'})
                setModalConfirmDelete(false)
                setTimeout(_ => {
                  setOpenModalSuccess(true)
                }, 100)
                // setListRole(data.result)
            }
        }catch(e){
            setLoading(false)
            setAlertSetting({
                show: true,
                type: 2,
                ErrorSubcode: "Something wrong! Please try again later or contact administrator."
            })
        }
    }

    const handleBlockUser = async (item) => {
        try{
            setLoading(true)
            var res = await api.blockUser({id: item.id})
            var data = res.data
            if(data?.code == 200){
                setLoading(false)
                triggerFilter()
                setAlertSetting({
                    show: true,
                    type: 1,
                    content: `Block user "${item.username}" successfully. \nThis user is now unable to login to system!`
                })
                // setListRole(data.result)
            }else{
                setLoading(false)
                setAlertSetting({
                    show: true,
                    type: 2,
                    ErrorSubcode: "Something wrong! Please try again later or contact administrator."
                })
            }
        }catch(e){
            setLoading(false)
            setAlertSetting({
                show: true,
                type: 2,
                ErrorSubcode: "Something wrong! Please try again later or contact administrator."
            })
        }
    }
    const handleUnBlockUser = async (item) => {

        try{
            setLoading(true)
            var res = await api.unBlockUser({id: item.id})
            var data = res.data
            if(data?.code == 200){
                setLoading(false)
                triggerFilter()
                setAlertSetting({
                    show: true,
                    type: 1,
                    content: `Un-Block user "${item.username}" successfully.!`
                })
                // setListRole(data.result)
            }else{
                setLoading(false)
                setAlertSetting({
                    show: true,
                    type: 2,
                    ErrorSubcode: "Something wrong! Please try again later or contact administrator."
                })
            }
        }catch(e){
            setLoading(false)
            setAlertSetting({
                show: true,
            type: 2,
                ErrorSubcode: "Something wrong! Please try again later or contact administrator."
            })
        }
    }

    async function fetchUserList(username) {
        console.log('fetching user', username);
        return fetch('https://randomuser.me/api/?results=5')
          .then((response) => response.json())
          .then((body) =>
            body.results.map((user) => ({
              label: `${user.name.first} ${user.name.last}`,
              value: user.login.username,
            })),
          );
      }


    const handleDeleteUser = async () => {
        if(dataLogin.user_id == selectedRow.id){
          setModalConfirmDelete(false)

          setAlertSetting({
              show: true,
              type: 2,
              ErrorSubcode: "You can't delete your account."
          })
          return
        }else if(selectedRow.role_id == adminRoleId){
            setModalConfirmDelete(false)

            setAlertSetting({
                show: true,
                type: 2,
                ErrorSubcode: "You can't delete YSP Admin account."
            })
            return
        }
        try{
            var res = await api.deleteUser(selectedRow.id)
            var data = res.data
            if(data?.code == 200){
                setDeleteResult({status: 'success'})
                setModalConfirmDelete(false)
                setTimeout(_ => {
                  setOpenModalSuccess(true)
                }, 100)
                // setListRole(data.result)
            }
        }catch(e){

        }
    };

    const fetchRole = async () => {
        setLoading(true)
        try{
            var res = await api.getListUserRole()
            var data = res.data
            if(data?.code == 200){
                // console.log(data)
                // setListRole([{id: 0, name: 'All'}, ...data.result])
            }
        }catch(e){

        }
    }



    const fetchData = async () => {
        if(isLoading) return
        setLoading(true)
        let params = [];
        Object.keys(critical).forEach(keys => {
            if(critical[keys])
                params.push(`${keys}=${critical[keys]}`)
        })
        // console.log(params.join('&'))
        try {
            var resp = await api.getListUser(params.join('&'));
            console.log(resp)
            var data = resp.data;
            if (data?.code == 200) {
                setTableData(data)
                setLoading(false)

            }else{
              console.log('error', data)
              setLoading(false)
              setAlertSetting({
                  show: true,
                  type:2,
                  ErrorSubcode: 'Something wrong, please try again later.'
              })
            }


        } catch (e) {
            console.log(e)
            setLoading(false)

        }

    }

    const elementRefBar = useCallback(node => {
        if (!node) return;
        const resizeObserver = new ResizeObserver(_debounce(300, function (muts) {
            // console.log(node.offsetWidth);
            const height = node.offsetHeight
            // console.log(height)
            setTableHeight(height - 100 - 40)
        }));
        resizeObserver.observe(node);
    }, []);

    const handleOpenModal = (id) => {
        setSelectedRow({action: 'add-new'})
        setOpenModal(true)
    }


    const columns = useMemo(() => {
        return [
            // {
            //     title: 'Status',
            //     className: 'text-[14px] ',
            //     dataIndex: 'status',
            //     key: 'status',
            //     width: '120px',
            //     render: value => {
            //         switch(value){
            //             case 1:
            //                 return  <span className="flex w-fit font-semibold items-center gap-[12px] font-pop pl-[8px] py-2 pr-[12px] text-[#489FEA] bg-[#4190F740] text-[12px] rounded-[15px]">
            //                             <i className="fa fa-circle text-[9px] text-[#4AA3E7]" aria-hidden="true"></i>
            //                             Normal
            //                         </span>
            //             case 2:
            //                 return  <span className="flex w-fit font-semibold items-center gap-[12px] font-pop pl-[8px] py-2 pr-[12px] text-[#F4B73F] bg-[#F4B73F40] text-[12px] rounded-[15px]">
            //                             <i className="fa fa-circle text-[9px] text-[#F4B73F]" aria-hidden="true"></i>
            //                             Waiting
            //                         </span>
            //                 // return <span className="bg-[#4190F740] text-[#4190F7] text-[14px] px-[8px] py-[4px] rounded-[5px] overflow-hidden font-pop">Waiting</span>
            //             case 3:
            //                 return  <span className="flex w-fit font-semibold items-center gap-[12px] font-pop pl-[8px] py-2 pr-[12px] text-[#E56234] bg-[#E5623440] text-[12px] rounded-[15px]">
            //                             <i className="fa fa-circle text-[9px] text-[#E45D33]" aria-hidden="true"></i>
            //                             OverDue
            //                         </span>
            //         }
            //     }
            // },
            {
                title: 'Username',
                className: 'text-[14px] border-l-0',
                dataIndex: 'username',
                key: 'username',
                width: 180,
            },
            {
                title: 'Display name',
                className: 'text-[14px] ',
                dataIndex: 'display_name',
                key: 'display_name',
            },
            {
                title: 'Role',
                className: 'text-[14px] ',
                dataIndex: 'role_name',
                key: 'role_name',
                width: 180,
            },
            // {
            //     title: 'Role',
            //     className: 'text-[14px] ',
            //     dataIndex: 'roles',
            //     key: 'roles',
            //     render: value => {
            //         return value ? value.map(i => i.name).toString() : ''
            //     }
            // },
            {
                title: 'Phone',
                className: 'text-[14px] ',
                dataIndex: 'mobile',
                key: 'mobile',
                width: 150,
            },
            {
                title: 'Email',
                className: 'text-[14px]',
                dataIndex: 'email',
                key: 'email',
            },
            // {
            //     title: 'Status',
            //     className: 'text-[14px]',
            //     dataIndex: 'active_status',
            //     width: 120,
            //     key: 'active_status',
            //     render: value => {
            //         return <Switch onChange={e => {
            //             onUpdateUserStatus()
            //         }} checkedChildren="Active" unCheckedChildren="Deactive" checked={value == 'A' ? true : false} />
            //         // switch(value){
            //         //     case 'A':
            //         //         return  <span className="flex w-fit font-semibold items-center gap-[12px] font-pop pl-[8px] py-2 pr-[12px] text-[#489FEA] bg-[#4190F740] text-[12px] rounded-[15px]">
            //         //                     <i className="fa fa-circle text-[9px] text-[#4AA3E7]" aria-hidden="true"></i>
            //         //                     Active
            //         //                 </span>
            //         //     case 'D':
            //         //         return  <span className="flex w-fit font-semibold items-center gap-[12px] font-pop pl-[8px] py-2 pr-[12px] text-[#F4B73F] bg-[#F4B73F40] text-[12px] rounded-[15px]">
            //         //                     <i className="fa fa-circle text-[9px] text-[#F4B73F]" aria-hidden="true"></i>
            //         //                     De-Active
            //         //                 </span>
            //         //         // return <span className="bg-[#4190F740] text-[#4190F7] text-[14px] px-[8px] py-[4px] rounded-[5px] overflow-hidden font-pop">Waiting</span>
            //         //     case 'P':
            //         //         return  <span className="flex w-fit font-semibold items-center gap-[12px] font-pop pl-[8px] py-2 pr-[12px] text-[#E56234] bg-[#E5623440] text-[12px] rounded-[15px]">
            //         //                     <i className="fa fa-circle text-[9px] text-[#E45D33]" aria-hidden="true"></i>
            //         //                     Pending
            //         //                 </span>
            //         // }
            //     }
            // },
           ...(dataLogin.role_id == adminRoleId ? [{
                title: '',
                className: 'text-[14px] text-right border-l-0',
                dataIndex: 'action',
                fixed: 'right',
                key: 'action',
                width: 120,
                render: (_, record) => {
                    // console.log(_, record)
                    return (
                        <>
                            {/* <Tooltip title="Reset Password">
                                <button className="rounded-full mr-2 w-[28px] h-[28px] text-center bg-[#F4F9FF]" onClick={() => {
                                    setSelectedRow({...record, action:'reset-password'})
                                    setOpenModal(true)
                                }}>
                                <i className="fa fa-refresh text-[#4F5050] text-[12px]"></i>
                                </button>
                            </Tooltip> */}
                            {
                                !record.is_blocked ? (
                                    <Tooltip title="Block User">
                                        <button className="rounded-full mr-2 w-[28px] h-[28px] text-center bg-[#F4F9FF]" onClick={() => {
                                            handleBlockUser(record)
                                        }}>
                                            <i className="fa fa-lock text-[#4F5050] text-[12px]"></i>
                                        </button>
                                    </Tooltip>
                                ) : (
                                    <Tooltip title="Un-Block User">
                                        <button className="rounded-full mr-2 w-[28px] h-[28px] text-center bg-[#F4F9FF]" onClick={() => {
                                            handleUnBlockUser(record)
                                        }}>
                                            <i className="fa fa-unlock text-[#4F5050] text-[12px]"></i>
                                        </button>
                                    </Tooltip>
                                )
                            }
                            <Tooltip title="Change Dealer">
                                <button className="rounded-full mr-2 w-[28px] h-[28px] text-center bg-[#F4F9FF]" onClick={() => {
                                    setSelectedRow({...record, action:'change-dealer'})
                                    setOpenModal(true)
                                }}>
                                    <i className="fa fa-pencil-alt text-[#4F5050] text-[12px]"></i>
                                </button>
                            </Tooltip>
                            <Tooltip title="Delete User">
                                <button className="rounded-full w-[28px] h-[28px] text-center bg-[#F4F9FF]" onClick={() => {
                                    setSelectedRow({...record, action:'delete-user'})
                                    setModalConfirmDelete(true)
                                }}>
                                    <i className="fa fa-trash-alt text-[#4F5050] text-[12px]"></i>
                                </button>
                            </Tooltip>
                        </>
                    )
                }
            }] : []
            )

        ];
    }, [])


    return (
        <Suspense fallback={null}>
            <BoxContrainer
                title="User Management"
                className="font-pop min-h-[600px] h-[calc(100vh_-_115px)] flex flex-col overflow-hidden"
                boxContentClass="flex-1 flex flex-col min-h-[400px] box-content-custom"
                // toolbarRight={
                //     <Col>
                //         <ButtonAntd
                //             icon={<i className="icon-excel-01" style={{ paddingRight: 5 }} />}
                //             style={{ marginLeft: 10 }}
                //         />

                //     </Col>
                // }
            >
                {isLoading && <LoadingLayout/>}

                <div className="gap-[10px] font-pop text-[#000] flex h-[100%]" ref={elementRefBar}>
                    <div className="w-[300px]  flex justify-between flex-col pr-3">
                        <div>
                            <div className="mb-3">
                                <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000]">
                                    Username
                                </label>

                                <Input allowClear placeholder="Type Username" name="username" onChange={handleInput} />
                            </div>
                            <div className="mb-3">
                                <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000]">
                                    Display name
                                </label>

                                <Input allowClear placeholder="Type Display name" name="display_name" onChange={handleInput}/>
                            </div>
                            <div className="mb-3">
                                <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000]">
                                    Role
                                </label>
                                <div>
                                    <Select
                                        placeholder="Type to select Role"
                                        className="text-[14px] font-medium select-custom normal-size"
                                        style={{width: '100%'}}
                                        showSearch
                                        allowClear
                                        name="role_id"
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                        options={listRole.map(i => {
                                            return { value: i.id, label: i.name }
                                        })}
                                        onChange={e => {
                                            setFilter(prevState => ({
                                                ...prevState,
                                                role_id: e
                                            }))
                                        }}
                                    />
                                </div>
                                {/* <AutoComplete
                                    style={{ width: "100%" }}
                                    // onSearch={(value) => {
                                    //     if (value.length >= 3) this.getSeller(value);
                                    // }}
                                    placeholder={"Select Role"}
                                    allowClear={true}
                                    name="role_id"
                                    // disabled={sellerId === "" ? true : false}
                                    onSelect={(value, option) => {
                                        setFilter(prevState => ({
                                            ...prevState,
                                            role_id: option.key
                                        }))
                                        // this.setState({ name: option.key });
                                    }}
                                    onClear={() => {
                                        setFilter(prevState => ({
                                            ...prevState,
                                            role_id: 0
                                        }))
                                    }}
                                >
                                    {listRole.map((item) => (
                                        <Option disabled={item.active_status != 'A'} key={item.id} value={item.name}></Option>
                                    ))}
                                </AutoComplete> */}
                            </div>
                            <div className="mb-3">
                                <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000]">
                                    Phone
                                </label>

                                <Input placeholder="Type Phone" name="mobile" onChange={handleInput} />
                            </div>
                            <div className="mb-3">
                                <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000]">
                                    Email
                                </label>

                                <Input placeholder="Type Email" name="email" onChange={handleInput} />
                            </div>
                            <div className="mb-3">
                                <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000]">
                                    Dealer name
                                </label>
                                {/* <AutocompleteSearch
                                    value={filter.display_name}
                                    placeholder="Select users"
                                    fetchOptions={fetchUserList}
                                    onChange={(newValue) => {
                                        console.log(newValue)
                                        handleInput({
                                            target: {
                                                name: 'display_name',
                                                value: newValue?.value
                                            }
                                        })
                                    }}
                                    style={{
                                    width: '100%',
                                    }}
                                /> */}
                                {/* <Select
                                    placeholder="Type to select Role"
                                    className="text-[14px] font-medium select-custom normal-size"
                                    style={{width: '100%'}}
                                    showSearch
                                    allowClear
                                    name="dealer_name"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                    options={listDealer.map(i => {
                                        return { value: i.id, label: i.name }
                                    })}
                                    onChange={e => {
                                        setFilter(prevState => ({
                                            ...prevState,
                                            dealer_name: e
                                        }))
                                    }}
                                /> */}
                                <Input allowClear placeholder="Type Dealer name" name="dealer_name" onChange={handleInput}/>
                            </div>
                        </div>
                        <div>
                            {/* <button onClick={() => {
                                setFilter(defaultFilter);
                                triggerFilter()
                            }} className="button text-white bg-[#CB353E] text-[14px] p-2 mb-3 rounded-[11px] w-full border-0">Reset</button> */}
                            <button disabled={isLoading} onClick={triggerFilter} className="disabled:opacity-50 button text-white bg-[#CB353E] text-[14px] p-2 rounded-[11px] w-full border-0">
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="w-[calc(100%_-_300px)] flex flex-col">
                        <div className="text-right mb-[6px]">
                            <button className="bg-[#CB353E] w-fit btn font-medium font-pop px-4 rounded-[10px] text-[14px] py-[6px] text-white" onClick={() => handleOpenModal(null)}>
                                <i className="fa fa-plus mr-2 text-[9px]"></i>
                                Add User
                            </button>

                        </div>
                        <div className="flex-1" >
                            <Table pagination={{
                                pageSize: critical.limit,
                                current: critical.page,
                                total: tableData.total,
                                showSizeChanger: true,
                                size: 'default',
                                showLessItems: true,
                                // onChangePage:onChangePage,
                                // onChangePageSize:onChangePageSize
                            }}
                                onChange={handleTableChange}
                                loading={isLoading}
                                rowKey="id"
                                scroll={{ x: 1200, y: tableHeight }}
                                className="ant-table-custom"
                                size="small"
                                dataSource={tableData.result} columns={columns} />
                        </div>
                    </div>
                </div>
            </BoxContrainer>

            <UserTractorForm api={api} showModal={isModalOpen} setOpenModal={setOpenModal} rowData={selectedRow} showSuccess={setOpenModalSuccess} listDealer={listDealer}/>

            <ModalAntd className="hide-header hide-footer modal-custom modal-result overflow-hidden" width={521} height={660}
                open={isModalSuccessOpen} onCancel={() => {setOpenModalSuccess(false); triggerFilter();}} maskClosable>
                <div className="modal-content-custom gap-[10px] overflow-hidden max-w-full flex-1">
                    <div className="px-[20px] py-[18px] flex-1">
                        <p className="title-panel">&nbsp;</p>
                        <div className="content-panel">
                            <Result
                                status="success"
                                title={deleteResult && deleteResult.status == 'success' ? 'Delete User successfully' : "Save data successfully!"}
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
            <ModalAntd className="hide-header hide-footer modal-custom modal-result overflow-hidden" width={521} height={660}
                open={modalConfirmDelete} onCancel={() => {
                  setModalConfirmDelete(false)
                  setDeleteResult(null)
                }}
                 maskClosable>
                <div className="modal-content-custom gap-[10px] overflow-hidden max-w-full flex-1">
                    <div className="px-[20px] py-[18px] flex-1 ">
                        <p className="title-panel">&nbsp;</p>
                        <div className="content-panel">
                            <Result
                                icon={
                                    <div className="rounded-full w-[80px] h-[80px] m-auto text-center bg-[#F4AAAA59]">
                                        <i className="fa fa-trash-alt text-[50px] text-[#F86C6B] leading-[1.6] m-auto" aria-hidden="true"></i>
                                    </div>
                                }
                                subTitle="Are you sure to delete this user?."
                                extra={[
                                    <button onClick={() => setModalConfirmDelete(false)} key="cancel" className="ant-btn text-[#CB353E] bg-[#fff] h-[40px] font-medium text-[14px] p-2 rounded-[11px] w-[40%] border-[#CB353E]">Cancel</button>,
                                    <button key="save" className="ant-btn text-white bg-[#CB353E] h-[40px] font-medium text-[14px] p-2 rounded-[11px] w-[40%] border-[#CB353E]" onClick={() => {
                                        handleDeleteUser()
                                    }}>Save</button>
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

export default (UserTractor)

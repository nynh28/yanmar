import { CopyOutlined, ReloadOutlined, SettingOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Form, Input, InputNumber, Modal, Select, Switch, Tooltip, } from 'antd';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert } from '../../Components';
import * as moment from 'moment'

const { Option } = Select;


const defaultValue = {
    status_notification: false,
    status_routine: false,
    status_maintenance: false,
    maintenance_type: '',
    first_maintenance_time: 50,
    maintenance_type_id: 0,
    model_code: '',
    notification_inform: 0,
    routine_type: 0,
    routine_notification_inform: 0,
}

const MaintenanceSettingTractorForm = ({ showModal, setOpenModal, listRole, rowData, action, api, refetch }) => {


    const [formValue, setFormValue] = useState(defaultValue)
    const [alertSetting, setAlertSetting] = useState({ show: false, type: 2, icon: null,  })
    const [form] = Form.useForm();
    const [isLoadingReset, setLoadingReset] = useState(false)
    const [isLoadingForm, setLoadingForm] = useState(false)

    useEffect(_ => {
        if (rowData.id) {
            setFormValue(rowData)
            form.setFieldsValue(rowData)
            // fetchDetail(rowData.id)
        } else {
            form.resetFields()
            setFormValue(defaultValue)
            form.setFieldsValue(defaultValue)
        }
    }, [rowData])

    const fetchDetail = async (id) => {
        let res = await api.getUserDetail(id)
        let data = res.data
        if (data?.code == 200) {
            console.log(data)
            setFormValue(data.result)
            form.setFieldsValue(data.result)
            // setListRole(data.result)
        }
    }

    const handleCloseForm = () => {
        form.resetFields()
        form.setFieldsValue(defaultValue)
        setFormValue(defaultValue)
        setLoadingForm(false)
        // setOpenModal(false)
    }

    const updateForm = async (dt) => {
        const formData = { ...rowData, ...dt }
        console.log(formData)
        setLoadingForm(true)
        try {
            let res = await api.updateMaintenanceSetting(formData)
            let data = res.data
            console.log(data)
            if (data?.code == 200) {
                setAlertSetting({ show: true, type: 1, content: 'Update data successfully!' })
                refetch(true)
                handleCloseForm()
            } else {
                setAlertSetting({ show: true, type: 2, content: 'Update failed', ErrorSubcode: 'Something wrong, please contact web administrator or try again later' })
                setLoadingForm(false)
            }
        } catch (e) {
            console.log(e)
            setAlertSetting({ show: true, type: 2, content: 'Update failed', ErrorSubcode: 'Something wrong, please contact web administrator or try again later' })
            setLoadingForm(false)
        }
    }


    const [requiredMark, setRequiredMarkType] = useState('optional');
    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };

    const onCheck = async () => {
        try {
            const values = await form.validateFields();
            // console.log('Success:', values);
        } catch (errorInfo) {
            // console.log('Failed:', errorInfo);
        }
    };


    const onSubmit = (data) => {
        console.log(data)
        if (rowData.id) {
            updateForm(data)
        }
    }



    // const handleResetPassword = async () => {
    //     let res = await api.resetPassword({id: rowData.id, password: '123456'})
    //     let data = res.data
    //     if(data?.code == 200){
    //         console.log(data)
    //         // setFormValue(data.result)
    //         // form.setFieldsValue(data.result)
    //         // setListRole(data.result)
    //     }
    // }



    return (
        <>
            <Form
                form={form}
                layout="vertical"
                initialValues={formValue}
                disabled={!rowData.id}
                onValuesChange={onRequiredTypeChange}
                requiredMark={requiredMark}
                onFinish={onSubmit}
                className='flex justify-between flex-col h-full overflow-hidden gap-[30px]'
            >

                <div className='overflow-auto'>
                    <div className="mb-[20px]">
                        <p className="title-panel mb-2">Model</p>
                        <div className="flex gap-[15px]">
                            <div>
                                <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000]">
                                    Notification
                                </label>
                                <div>
                                    <Form.Item
                                    valuePropName="checked"
                                            className='mb-0'
                                            name="status_notification"
                                        >
                                    <Switch className="custom-switch" />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="flex-1">

                                <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000]">
                                    Model
                                </label>
                                <Form.Item
                                            className='mb-0'
                                            name="model_code"
                                        >
                                            <Input disabled/>
                                        {/* <Select
                                                className="w-full text-[13px] font-pop "
                                                disabled={rowData.action != 'add-new'}
                                                showSearch
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                options={listRole.map(i => {
                                                    return { value: i.id, label: i.name }
                                                })}
                                            />
                                        <Select
                                            className="w-full text-[13px] font-pop "
                                            // showSearch
                                            optionFilterProp="children"

                                            placeholder="Select Status"
                                            options={[{ value: 1, label: 'Hino' }, { value: 2, label: 'Yanmar-Excavator' }, { value: 3, label: 'Yanmar-Tractor' }]}
                                        // onSearch={(input) => {
                                        // this.setState({
                                        //     startSearch: input !== "" ? true : false,
                                        // });
                                        // }}
                                        >

                                        </Select> */}
                                        </Form.Item>
                            </div>
                        </div>
                    </div>
                    <div className="mb-[20px]">
                        <p className="title-panel mb-2">Maintenance</p>
                        <div className="mb-3 flex gap-[15px]">
                            <div>
                                <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000]">
                                    First Maintenance
                                </label>
                                <div>
                                <Form.Item
                                            className='mb-0'
                                            name="status_maintenance"
                                            valuePropName="checked"
                                        >
                                    <Switch  className="custom-switch" />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="flex-1">

                                <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000]">
                                First Maintenance Type
                                </label>
                                    {/* <Form.Item
                                            className='mb-0'
                                            name="first_maintenance_time"
                                        > */}
                                            <Input disabled value={`First ${formValue.first_maintenance_time} hours`}/>
                                        {/* </Form.Item> */}
                            </div>
                        </div>

                        <div className="">
                            <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000]">
                                Notification  <span className="text-[#99A0A4]">(Max 20 Hours)</span>
                            </label>

                            <Form.Item
                                defaultValue={0}
                                            className='mb-0'
                                            name="notification_inform"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Field must not null'
                                                },

                                            ]}
                                        >
                            <InputNumber defaultValue={0} min={0} max={20} style={{width: '100%'}} />
                            </Form.Item>
                        </div>

                    </div>
                    <div>
                        <p className="title-panel mb-2">Routine</p>
                        <div className="mb-3 flex gap-[15px]">
                            <div>
                                <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000]">
                                    Routine
                                </label>
                                <div>

                                <Form.Item
                                            className='mb-0'
                                            name="status_routine"
                                            valuePropName="checked"
                                        >
                                    <Switch  className="custom-switch" />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="flex-1">

                                <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000]">
                                    Routine Type <span className="text-[#99A0A4]">(Min. Every 150 Hours)</span>
                                </label>
                                <Form.Item
                                    defaultValue={0}
                                            className='mb-0'
                                            name="routine_type"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Field must not null'
                                                },

                                            ]}
                                        >
                            <InputNumber min={150} max={1000} defaultValue={0} style={{width: '100%'}}/>
                            </Form.Item>

                            </div>
                        </div>

                        <div className="">
                            <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000]">
                                Routine Notification Inform  <span className="text-[#99A0A4]">(Max 50 Hours)</span>
                            </label>
                             <Form.Item
                             defaultValue={0}
                                            className='mb-0'
                                            name="routine_notification_inform"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Field must not null'
                                                },

                                            ]}
                                        >
                                <InputNumber min={0} max={50}  defaultValue={0} style={{width: '100%'}} />
                            </Form.Item>
                        </div>

                    </div>
                </div>
                <button disabled={isLoadingForm || !rowData.id} className="disabled:opacity-50 button text-white bg-[#CB353E] text-[14px] p-2 rounded-[11px] w-full border-0">Save</button>



            </Form>


            <Alert
                setting={alertSetting}
                onConfirm={() => {
                    setAlertSetting({ show: false })
                }}
                onCancel={() => {
                    setAlertSetting({ show: false })
                }}
            />
        </>
    )
}

export default MaintenanceSettingTractorForm

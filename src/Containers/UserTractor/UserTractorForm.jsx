import { CopyOutlined, ReloadOutlined, SettingOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Form, Input, InputNumber, Modal, Select, Tooltip, } from 'antd';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert } from '../../Components';
import * as moment from 'moment'
import { listRole } from '../../Config/app-config';
import { useSelector } from 'react-redux';

const { Option } = Select;

const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const defaultValue = {
    platform_id: 3,
    language_id: 1,
    password: '',
    confirm_password: '',
    role_id: 35,
    dealer_id: [],
    email: '',
    display_name: ''
}



const UserTractorForm = ({ showModal, setOpenModal, rowData, action, api, showSuccess, listDealer }) => {

    const dataLogin = useSelector(state => state.signin.dataLogin);

    const [formValue, setFormValue] = useState(defaultValue)
    const [alertSetting, setAlertSetting] = useState({ show: false, type: 0, icon: null })
    const [isLoadingReset, setLoadingReset] = useState(false)
    const [isLoadingForm, setLoadingForm] = useState(false)
    const [isLoadingDetail, setLoadingDetail] = useState(false)

    // const selectProps = {
    //     mode: 'multiple',
    //     style: {
    //       width: '100%',
    //     },
    //     value,
    //     options,
    //     onChange: (newValue) => {
    //       setValue(newValue);
    //     },
    //     placeholder: 'Select Item...',
    //     maxTagCount: 'responsive',
    // };

    const [form] = Form.useForm();
    const formRoleId = Form.useWatch('role_id', form);

    useEffect(_ => {
        setFormValue(defaultValue)
        form.setFieldsValue(defaultValue)
        form.resetFields()
    }, [showModal])

    useEffect(_ => {
        if (rowData.id) {
            fetchDetail(rowData.id)
        }
    }, [rowData])

    useEffect(_ => {
        if(formRoleId && !rowData && !rowData.id){
            if (formRoleId == 18){
              form.setFieldValue('dealer_id', null)
            }else{
              form.setFieldValue('dealer_id', [])
            }
        }
    }, [formRoleId])

    const fetchDetail = async (id) => {
        setLoadingDetail(true)
        let res = await api.getUserDetail(id)
        let data = res.data
        if (data?.code == 200) {
            // console.log(data)
            let value = {...data.result, dealer_id: data.result.dealer_id ? data.result.dealer_id : []}
            setFormValue(value  )
            form.setFieldsValue(value   )
            setLoadingDetail(false)
            // setListRole(data.result)
        }
    }

    const createNew = async (dt) => {
        setLoadingForm(true)
        try{
            // console.log(dt)
          let res = await api.createNewUser(dt)
          let data = res.data
          if (data?.code == 200) {
              showSuccess(true)
              handleCloseForm()
          }else{
              setAlertSetting({ show: true, type: 2, content: 'Something wrong, please contact web administrator or try again later' })
              setLoadingForm(false)
          }
        }catch(e){
            setAlertSetting({ show: true, type: 2, content: 'Something wrong, please contact web administrator or try again later' })
              setLoadingForm(false)
        }
    }

    const handleCloseForm = async () => {
        await form.resetFields()
        await setFormValue(defaultValue)
        await form.setFieldsValue(defaultValue)
        setLoadingForm(false)
        setOpenModal(false)
    }

    const updateForm = async (dt) => {
        const formData = {platform_id: dt.platform_id, id: rowData.id, default_language_id: dt.language_id, email: dt.email, mobile: dt.mobile, dealer_id: dt.dealer_id, role_id: dt.role_id, updated_by: dataLogin.user_id}
        setLoadingForm(true)
        try{
          let res = await api.changePlatform(formData)
          let data = res.data
          // console.log(data)
          if (data?.code == 200) {
              showSuccess(true)
              handleCloseForm()
          }else{
              setAlertSetting({ show: true, type: 2, content: 'Something wrong, please contact web administrator or try again later' })
              setLoadingForm(false)
          }
        }catch(e){
            setAlertSetting({ show: true, type: 2, content: 'Something wrong, please contact web administrator or try again later' })
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
        if(data.role_id == 34){
            data.dealer_id = null
            // data.platform_id = 0
        }
        if (!rowData.id) {
            let user_level_id = 22
            if (data.role_id == 18){
                user_level_id = 32
            }else if(data.role_id == 39){
                user_level_id = 21
            }
            createNew({...data, platform_id: 3, created_by: dataLogin?.user_id.toString(),user_level_id})
        } else {
            updateForm({...data, updated_by: dataLogin?.user_id.toString()})
        }
    }

    const handleResetPassword = async () => {
        setLoadingReset(true)
        try {

            let res = await api.resetPassword({ id: rowData.id })
            let data = res.data
            if (data?.code == 200) {
                // console.log(data)
                setAlertSetting({ show: true, type: 1, content: 'Update password successfully!' })
                setLoadingReset(false)
                // setFormValue(data.result)
                // form.setFieldsValue(data.result)
                // setListRole(data.result)
            } else {
                setAlertSetting({ show: true, type: 2, content: 'Something wrong, please contact web administrator or try again later' })

                setLoadingReset(false)
            }
        } catch (e) {
            setAlertSetting({ show: true, type: 2, content: 'Something wrong, please contact web administrator or try again later' })

            setLoadingReset(false)

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

    const renderPasswordField = () => {
        switch (rowData.action) {
            case "reset-password":
                return (
                    <Input.Group compact>
                        <Input
                            style={{ width: 'calc(100% - 34px)' }}
                            defaultValue="********"
                            disabled
                            readOnly
                            value={"********"}
                        />
                        <Tooltip title="Reset Password">
                            <Button danger disabled={isLoadingForm || isLoadingDetail} loading={isLoadingReset} onClick={() => handleResetPassword()} icon={<ReloadOutlined className='font-medium align-[1px]'/>} />
                        </Tooltip >
                    </Input.Group>
                );
            case "change-dealer":
                return (
                    <Input.Group compact>
                        <Input
                            style={{ width: 'calc(100% - 34px)' }}
                            defaultValue="********"
                            disabled
                            readOnly
                            value={"********"}
                        />
                        <Tooltip title="Reset Password">
                            <Button danger disabled={isLoadingForm || isLoadingDetail} loading={isLoadingReset || isLoadingForm || isLoadingDetail} onClick={() => handleResetPassword()} icon={<ReloadOutlined className='font-medium align-[1px]'/>} />
                        </Tooltip >
                    </Input.Group>
                )
            default:
                return (
                    <Input.Password autoComplete='new-password' />
                )
        }
        return (
            <Input.Password autoComplete='new-password' />
        )
    }

    return (
        <>
            <Modal className="hide-header hide-close hide-footer modal-custom overflow-hidden" width={800} height={660}
                title="Create User"
                open={showModal}  maskClosable>
                <div className="modal-content-custom gap-[10px] overflow-hidden max-w-full flex-1">
                    <div className="px-[20px] py-[18px] flex-1">
                        <p className="title-panel">{rowData.id ? 'Edit ': 'Create '} User</p>
                        <div className="content-panel">
                            <Form
                                form={form}
                                layout="vertical"
                                initialValues={formValue}
                                onValuesChange={onRequiredTypeChange}
                                requiredMark={requiredMark}
                                onFinish={onSubmit}

                            >

                                <div className="grid grid-cols-2 gap-y-2 gap-x-[20px]">
                                    <div className="mb-3">
                                        <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000] required-label">
                                            What is User Role?
                                        </label>

                                        <Form.Item
                                            name="role_id"
                                            className='mb-0'

                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Field must not null'
                                                },
                                            ]}
                                        >
                                            <Select
                                                disabled={rowData.action != 'add-new'}
                                                showSearch
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                  }
                                                options={listRole.filter(i => i.show.includes(rowData.action)).map(i => {
                                                    return { value: i.id, label: i.name }
                                                })}
                                            />
                                        </Form.Item>
                                        {/* <AutoComplete
                                                style={{ width: "100%" }}
                                                // onSearch={(value) => {
                                                //     if (value.length >= 3) this.getSeller(value);
                                                // }}
                                                placeholder={("dealer")}
                                                allowClear={false}
                                                showSearch
                                                // disabled={sellerId === "" ? true : false}
                                                onSelect={(value, option) => {
                                                    // this.setState({ name: option.key });
                                                }}
                                                onClear={() => {
                                                    // this.setState({ name: "" });
                                                }}
                                                // options={listRole.map(i => {
                                                //     return {value: i.id, label: i.name}
                                                // })}
                                                labelInValue
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }

                                            >
                                                {listRole.map((item) => (
                                                    <Option key={item.id} title={item.name} value={item.id}>{item.name}</Option>
                                                ))}
                                            </AutoComplete> */}
                                    </div>
                                    <div className="mb-3">
                                        <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000] required-label">
                                            Display name
                                        </label>
                                        <Form.Item className='mb-0' name="display_name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Field must not null'
                                                },
                                            ]}>


                                            <Input disabled={rowData.action != 'add-new'} />
                                        </Form.Item>
                                    </div>
                                    <div className="mb-3">
                                        <label className={(formRoleId == 18 ? 'required-label' : '' )+" control-label mb-1 font-normal font-pop text-[14px] text-[#000] "}>
                                            Manage
                                        </label>

                                        {/* <Form.Item
                                            className='mb-0'
                                            name="platform_id"

                                            rules={[
                                                {
                                                    required: formRoleId == 18 ? true : false,
                                                    message: 'Field must not null'
                                                },
                                            ]}
                                        >
                                            <Select disabled={formRoleId != 18}

                                                options={[{ value: 2, label: 'Yanmar-Excavator' }, { value: 3, label: 'Yanmar-Tractor' }]}
                                            />
                                        </Form.Item> */}
                                        <Form.Item
                                            className='mb-0'
                                            name="dealer_id"
                                            defaultValue={[]}
                                            rules={[
                                                {
                                                    required: formRoleId == 18 ? true : false,
                                                    message: 'Field must not null'
                                                },
                                            ]}
                                        >
                                            <Select disabled={formRoleId == 34}
                                                filterOption={filterOption}
                                                showSearch
                                                mode={formRoleId == 18 ? ''  : 'multiple'}
                                                maxTagCount= 'responsive'
                                                options={listDealer || []}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="mb-3">
                                        <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000] required-label">
                                            Default Language
                                        </label>

                                        <Form.Item
                                            className='mb-0'
                                            name="language_id"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: ''
                                                },
                                            ]}
                                        >
                                            <Select
                                                options={[{ value: 1, label: 'English' }, { value: 2, label: 'Thailand' }]}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="mb-3">
                                        <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000] required-label">
                                            Username
                                        </label>

                                        <Form.Item name="username" className='mb-0'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Field must not null'
                                                },
                                            ]}>

                                            <Input disabled={rowData.action != 'add-new'} />
                                        </Form.Item>
                                    </div>
                                    <div className="mb-3">
                                        <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000] required-label">
                                            Email
                                        </label>

                                        <Form.Item name="email" className='mb-0'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Field must not null'
                                                },
                                                { type: 'email', message: 'Email not valid' }
                                            ]}>

                                            <Input />
                                        </Form.Item>
                                    </div>
                                    <div className="mb-3">
                                        <div className='flex justify-between align-center'>

                                        <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000] required-label">
                                            Password
                                        </label>
                                        {
                                            (formValue.user_id && formValue.updated_password_time && formValue.updated_password_time !== formValue.created_date_time) && (
                                              <span className='text-danger text-[12px] font-normal'>Last reset {moment(formValue.updated_password_time*1000).format('DD/MM/YYYY HH:mm:ss')}</span>
                                            )
                                        }
                                        </div>

                                        <Form.Item name="password" className='mb-0'
                                            rules={[
                                                {
                                                    required: rowData.id ? false : true,
                                                    message: 'Field must not null'
                                                },
                                                {
                                                    min: 6,
                                                    message: 'Password must greater than 6 charactor'
                                                }
                                            ]}>
                                            {renderPasswordField()}
                                        </Form.Item>
                                    </div>
                                    <div className="mb-3">
                                        <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000]">
                                            Phone number
                                        </label>

                                        <Form.Item name="mobile" className='mb-0'
                                            rules={[{
                                                // required: true,
                                                message: "Input only number 0-9, 10 digit",
                                                pattern: new RegExp(/^[0-9\-\+]{10}$/)
                                            }]}
                                        >

                                            <Input />
                                        </Form.Item>
                                    </div>
                                    <div className="mb-3">
                                        {rowData.action == 'add-new' && <>

                                            <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000] required-label">
                                                Confirm Password
                                            </label>
                                            <Form.Item name="confirm_password" className='mb-0'
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Field must not null'
                                                    },
                                                    {
                                                        validator: async (_, confirm_pass) => {
                                                            var password =
                                                                form.getFieldValue("password");
                                                            if (password !== null && confirm_pass !== null)
                                                                if (confirm_pass != password) {
                                                                    return Promise.reject(
                                                                        "Confirm Password not match."
                                                                    );
                                                                }
                                                        },
                                                    },
                                                ]}>

                                                <Input.Password />
                                            </Form.Item>
                                        </>}
                                    </div>
                                    <div className="flex flex-col mb-3">
                                        <label className="control-label mb-1 font-normal font-pop text-[14px] text-[#000] ">
                                            &nbsp;
                                        </label>
                                        <div className="flex justify-between gap-4">
                                            <button type='button' className="ant-btn text-[#CB353E] bg-[#fff] font-medium text-[14px] p-2 rounded-[11px] w-full border-[#CB353E]" onClick={() => handleCloseForm()}>Cancel</button>
                                            <button disabled={isLoadingForm || isLoadingDetail} onClick={onCheck} className="disabled:opacity-50 ant-btn text-white bg-[#CB353E] font-medium text-[14px] p-2 rounded-[11px] w-full border-[#CB353E]">Save</button>
                                        </div>
                                    </div>

                                </div>
                            </Form>
                        </div>
                    </div>
                </div>

            </Modal>
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

export default UserTractorForm

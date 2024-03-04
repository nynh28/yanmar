import React, { Component, useState, Suspense, useEffect, memo, useCallback, useRef } from 'react'
import PannelBox from '../../Components/PannelBox'
import { t, v, v_em } from '../../Components/Translation'
import { Row, Col, Button } from 'reactstrap'
import { Select, Switch } from 'antd';
import axios from 'axios';
import { get, isEmpty, set } from 'lodash'
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next'
import { ENDPOINT_BASE_URL } from '../../Config/app-config';
import FormRadio from '../../Components/FormControls/FormRadio'
// import FormSelectGroup from '../../Components/FormControls/Basic/FormSelectGroup'
import Alert from '../../Components/Alert'
import SaveButton from '../../Components/SaveButton'
import CancelButton from '../../Components/CancelButton'
import FormTextArea from '../../Components/FormControls/FormTextArea'
import AsyncSelect from "react-select/async";
import moment from 'moment';
import GeneralActions from '../../Redux/GeneralRedux'
import { data } from 'jquery';

const { Option, OptGroup } = Select;



function useDidUpdate(callback, deps) {
    const hasMount = useRef(false)


    useEffect(() => {
        if (hasMount.current) {
            callback()
        } else {
            hasMount.current = true
        }
    }, deps)

}




const FormInput = (arg) => {
    const { t } = useTranslation()

    return (
        <div className="form-group field field-" style={{ padding: '0 10px', flex: arg.flex || 1 }}>
            {arg.hideLabel ? "" : <label className="control-label" style={{ fontWeight: 500 }}>
                {t(arg.label)}
                {
                    arg.required && [
                        <span className="text-danger">*</span>
                    ]
                }{arg.label && " :"}
            </label>
            }
            <input
                type={arg.type}
                className="form-control"
                value={arg.value}
                required={arg.required}
                placeholder={t(arg.placeholder)}
                disabled={arg.disabled}
                maxLength={arg.maxLength}
                minLength={arg.minLength}
                onKeyDown={arg.onKeyDown}
                pattern={arg.pattern}
                style={{ fontSize: 16 }}
                onChange={arg.onChange}

            />
        </div>
    )
}

const FormSelectSearch = (arg) => {
    const { t } = useTranslation()
    return (
        <div className="form-group field field-" style={{ padding: '0 10px', flex: arg.flex || 1 }} ref={arg.ref}>
            <label className="control-label" style={{ fontWeight: 500 }}>
                {t(arg.label)}
                {
                    arg.required && [
                        <span className="text-danger">*</span>
                    ]
                } :

        </label>

            <Select
                allowClear={get(arg, 'allowClear', true)}
                id={arg.id}
                mode={arg.mode}
                showSearch
                style={{ width: '100%' }}
                placeholder={t(arg.placeholder)}
                // defaultValue={arg.value}
                value={arg.value}
                disabled={arg.disabled}
                onChange={arg.onChange}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            // labelInValue={arg.labelInValue}
            >

                {
                    !isEmpty(arg.list) &&
                    arg.list !== null && arg.list.map((item) => {
                        return <Option key={item.key}>{t(item.value)}</Option>
                    })
                }
            </Select>
        </div>
    )
}

const FormSelectGroup = (arg) => {
    const { t } = useTranslation()
    return (
        <div className="form-group field field-string" style={{ padding: '0 10px', flex: arg.flex || 1 }}>
            <label className="control-label" style={{ fontWeight: 500 }}>
                {t(arg.label)}
                {
                    arg.required && [
                        <span className="text-danger">*</span>
                    ]
                } :

        </label>
            <Select
                allowClear={true}
                mode={arg.mode}
                showSearch
                style={{ width: '100%' }}
                placeholder={t(arg.placeholder)}
                value={arg.value}
                disabled={arg.disabled}
                onChange={arg.onChange}
            >
                {
                    arg.list.map((group) => {
                        return (
                            <OptGroup label={t(group.groupName)}>
                                {
                                    group.items.map((item) => {
                                        return <Option value={item.key}>{t(item.value)}</Option>
                                    })
                                }
                            </OptGroup>
                        )
                    })
                }
            </Select>
        </div>
    )
}

const Fleets = () => {
    const dataLogin = useSelector(state => state.signin.dataLogin);
    const processing = useSelector(state => state.general.processing);
    const dispatch = useDispatch();
    const {
        setFleet
    } = GeneralActions

    const headers = {
        'Authorization': get(dataLogin, 'userTokenInfo.idToken', ''),
        'X-API-Key': get(dataLogin, 'redisKey', ''),
        'Accept-Language': get(dataLogin, 'language', ''),

    }
    const userId = get(dataLogin, 'userId', '')

    const [data, setData] = useState({
        cust_id: '',
        fleet_id: '',
        fleet_name: '',
        user_id: userId,
        action: true
    })
    const [listCustomer, setListCustomer] = useState([])
    const [listFleet, setListFleet] = useState([])
    const [alert, setAlert] = useState({
        show: false,
        type: 3,
        content: "",
        ErrorSubcode: 0,
        name: null
    })


    useEffect(() => {
        loadCustomer()
    }, [])

    useEffect(() => {

        getFleetMulti(data.cust_id)

    }, [processing])

    const setAlertSetting = (isShow, type, content = "", ErrorSubcode) => {

        setAlert({
            show: isShow,
            type: type,
            content: content,
            ErrorSubcode: ErrorSubcode
        })

    }

    const loadCustomer = async () => {

        let obj = { userId }

        var response = await fetch(ENDPOINT_BASE_URL + "fleet/get_manage_customer", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        });

        var data = await response.json();
        let list = data.map(e => ({ key: e.id, value: e.customer_name }))


        setListCustomer(list)


    }

    const getFleetMulti = async (value) => {

        let arrCus = []
        let obj = {}

        Array.isArray(value) ? arrCus = value : arrCus.push(value)


        obj = {
            userId,
            customer_id: arrCus
        }


        var response = await fetch(ENDPOINT_BASE_URL + "fleet/get_fleet_by_manage", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        });

        var data = await response.json();

        try {

            let list = data.result.map(ele => ({
                groupName: get(ele, 'customer_name', ''),
                items: ele.fleet_list.map(item => ({ key: '' + item.fleet_id, value: item.fleet_name }))
            }))

            setListFleet(list)

        } catch (error) { }

    }


    const changeHandler = (name, value) => {

        if (name === 'fleet_id') {

            try {
                let fleet_name = listFleet.map(key => key.items.find(ele => ele.key === value).value)
                setData({ ...data, [name]: value, fleet_name: data.action ? '' : get(fleet_name, '[0]', '') })
            } catch (error) { }


        } else setData({ ...data, [name]: value })

    }

    const submitConfirm = () => {

        console.log(isEmpty(data.cust_id))

        if (isEmpty(data.cust_id)) setAlertSetting(true, 4, "general_8")
        else if (isEmpty(data.fleet_id)) setAlertSetting(true, 4, "general_9")
        else if (isEmpty(data.fleet_name)) setAlertSetting(true, 4, "general_9")
        else delFleet()



    }

    const delFleet = () => {
        let data_del = {
            "user_id": userId,
            "fleet_id": parseInt(data.fleet_id)
        }
        axios
            .delete(ENDPOINT_BASE_URL + 'fleet/setting/fleet_name', {
                headers: headers,
                data: JSON.stringify(data_del),
            })
            .then(function (response) {

                if (response.status === 204) {
                    setAlertSetting(true, 1, 'success')
                    getFleetMulti(data.cust_id)
                    setData({ ...data, fleet_name: '', fleet_id: '' })
                }
            })
            .catch(function (error) {
                if (error.response) {
                    // 409

                    if (get(error, 'response.status', '') === 409) setAlertSetting(true, 2, 'general_10')
                    else setAlertSetting(true, 2, get(error, 'response.data.Error.Message', ''))

                    // console.log(error.response.data.Error.Message);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                } else if (error.request) {
                    // console.log(error.request);
                } else {
                    // console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }

    const clkButton = (text) => {

        setAlert({
            show: true,
            type: 3,
            content: text,
            name: text
        })

    }
    const changeStatus = e => {
        getFleetMulti(data.cust_id)
        setData({ ...data, action: e, fleet_name: '', fleet_id: '' })
    }

    dispatch(setFleet(data))

    return (

        <Suspense fallback={null}>
            <Alert
                setting={alert}
                onConfirm={() => {
                    if (alert.type === 3) {
                        alert.show = false
                        submitConfirm(alert.name)
                    } else if (alert.type === 1) {
                        setAlert({ show: false })
                    } else {
                        setAlert({ show: false })
                    }



                }}
                onCancel={() => setAlert({ show: false })}
            />
            <div style={{ marginLeft: 9, marginBottom: 20 }}>
                <Switch
                    style={{ width: 120 }}
                    checkedChildren={t('add')}
                    unCheckedChildren={t('edit')}
                    checked={data.action}
                    onClick={e => changeStatus(e)}
                />
            </div>


            <Row>

                <Col xs="12" lg="3">
                    <FormSelectSearch
                        mode={"single"}
                        required={true}
                        schema={true}
                        value={data.cust_id}
                        label={"control_room_22"}
                        list={listCustomer}
                        fieldForm={"cust_id"}
                        placeholder={"control_room_22"}
                        flex={1}
                        onChange={(selected) => {
                            changeHandler('cust_id', selected)
                            getFleetMulti(selected)
                        }}
                    />
                </Col>
                {
                    !data.action &&

                    <Col xs="12" lg="3">
                        <FormSelectGroup
                            mode={"single"}
                            required={true}
                            schema={{ "required": ["fleet_id"] }}
                            value={data.fleet_id}
                            label={"export_3"}
                            list={listFleet}
                            fieldForm={"fleet_id"}
                            placeholder={"export_3"}
                            flex={1}
                            onChange={(selected) => changeHandler('fleet_id', selected)
                            }
                        />
                    </Col>
                }






                <Col xs="12" lg="3">
                    <FormInput
                        required={true}
                        placeholder={'other_reports_25'}
                        label={'other_reports_25'}
                        value={data.fleet_name}
                        onChange={e => setData({ ...data, fleet_name: e.target.value })}
                    />
                </Col>
                <Col xs="12" lg="3">
                    <div style={{ marginTop: 24 }}>
                        {/* <Button color="success" style={{ width: 120 }} >{t('geofence_2')}</Button>{' '} */}
                        {/* <Button color="info" style={{ width: 120 }}>{t('edit')}</Button>{' '} */}
                        {
                            !data.action &&
                            <Button color="danger" style={{ width: 120 }} onClick={() => clkButton('dalete')}>{t('delete')}</Button>
                        }

                    </div>
                </Col>
            </Row>
        </Suspense>
    )

}

export default Fleets
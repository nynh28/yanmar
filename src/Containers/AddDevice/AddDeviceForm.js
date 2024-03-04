
import React, { Component, useState, Suspense, useEffect, memo, useCallback, useRef } from 'react'
import PannelBox from '../../Components/PannelBox'
import { t, v, v_em } from '../../Components/Translation'
import { Row, Col, Button } from 'reactstrap'
import { Select } from 'antd';
import axios from 'axios';
import { get, isEmpty, set } from 'lodash'
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next'
import { ENDPOINT_BASE_URL } from '../../Config/app-config';
import FormRadio from '../../Components/FormControls/FormRadio'
import Alert from '../../Components/Alert'
import SaveButton from '../../Components/SaveButton'
import CancelButton from '../../Components/CancelButton'
import FormTextArea from '../../Components/FormControls/FormTextArea'

const { Option } = Select;


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


const AddDevice = () => {
    const dataLogin = useSelector(state => state.signin.dataLogin);
    const formActionDevice = useSelector(state => state.vehicle.formActionDevice);
    const headers = {
        'Authorization': get(dataLogin, 'userTokenInfo.idToken', ''),
        'X-API-Key': get(dataLogin, 'redisKey', ''),
        'Accept-Language': get(dataLogin, 'language', ''),

    }
    const canEdit = formActionDevice.action === 'Edit'
    const ID = formActionDevice.personalId
    const userId = get(dataLogin, 'userId', '')

    const [list, setList] = useState({
        status: [],
        device: []
    })
    const [data, setData] = useState({
        "id": ID,
        "device_id": "",
        "mid": "",
        "model_id": "",
        "subscriber_number": "",
        "sale_order_number": "",
        "is_mdvr": false,
        "camera": "",
        "remark": "",
        "status": "",
        "user_id": userId,

    })
    const [alert, setAlert] = useState({
        show: false,
        type: 3,
        content: "",
        ErrorSubcode: 0
    })

    const setAlertSetting = (isShow, type, content = "", ErrorSubcode) => {

        setAlert({
            show: isShow,
            type: type,
            content: content,
            ErrorSubcode: ErrorSubcode
        })

    }



    useEffect(() => {
        fetchDropdown()
        console.log(formActionDevice)

        canEdit && fetchEdit()
    }, [])

    const fetchEdit = () => {
        setAlertSetting(true, 6)

        let one = ENDPOINT_BASE_URL + "fleet/setting/device/list/" + ID + "?user_id=1"
        const requestOne = axios.get(one, {
            headers: headers
        });

        axios.all([requestOne]).then(axios.spread((...responses) => {
            const device_update = responses[0].data.data[0]
            console.log(device_update)
            setData({
                ...data,
                "device_id": get(device_update, 'device_id', ''),
                "mid": get(device_update, 'mid', ''),
                "model_id": "" + get(device_update, 'model_id', ''),
                "subscriber_number": get(device_update, 'subscriber_number', ''),
                "sale_order_number": get(device_update, 'sale_order_number', ''),
                "is_mdvr": get(device_update, 'is_mdvr', false),
                "camera": get(device_update, 'camera', 0),
                "status": "" + get(device_update, 'status', 0),
                "remark": get(device_update, 'remark', 0),

            })

            setAlertSetting(false, 6)

        })).catch(errors => {
            console.log(errors);
        })

    }
    const fetchDropdown = () => {

        let one = ENDPOINT_BASE_URL + "fleet/setting/dropdown?user_id=1&options=DEVICE-MODEL"
        let two = ENDPOINT_BASE_URL + "fleet/setting/dropdown?user_id=1&options=DEVICE-STATUS"
        const requestOne = axios.get(one, {
            headers: headers
        });
        const requestTwo = axios.get(two, {
            headers: headers
        });

        axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
            const device = responses[0].data.result
            const status = responses[1].data.result


            let status_list = status.map(e => ({ key: e.id, value: e.name }))
            let device_list = device.map(e => ({ key: e.id, value: e.name }))


            setList({ ...list, device: device_list, status: status_list })

        })).catch(errors => {
            console.log(errors);
        })
    }

    const changeHandler = (name, value) => setData({ ...data, [name]: value })


    const saveItem = () => {

        setAlertSetting(true, 6)


        if (isEmpty(data.device_id)) {

            setAlertSetting(true, 4, "devices_08")


        } else if (isEmpty(data.model_id)) {
            setAlertSetting(true, 4, "devices_09")

        } else if (isEmpty(data.status) && canEdit) {
            setAlertSetting(true, 4, "Status xxxxxxxx")

        } else {


            canEdit ? updateData() : createData()
        }




    }


    const createData = () => {

        let data_create = {
            "device_id": data.device_id,
            "mid": parseInt(data.mid),
            "model_id": parseInt(data.model_id),
            "subscriber_number": data.subscriber_number,
            "sale_order_number": data.sale_order_number,
            "is_mdvr": data.is_mdvr,
            "camera": parseInt(data.camera),
            "remark": data.remark,
            "user_id": userId
        }






        fetch(
            ENDPOINT_BASE_URL + 'fleet/setting/device', {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data_create)
        })

            .then(res => res.json())
            .then(response => {


                if (response == null) {
                    setAlertSetting(true, 1, 'success')

                } else {

                    setAlertSetting(true, 2, get(response, 'Error.Message', ''))
                }
            })
            .catch(error => {

                console.log('error ', error)
                setAlertSetting(false, 6)
            })
    }

    const updateData = () => {

        let data_update = {
            "device_id": data.device_id,
            "mid": parseInt(data.mid),
            "model_id": parseInt(data.model_id),
            "subscriber_number": data.subscriber_number,
            "sale_order_number": data.sale_order_number,
            "is_mdvr": data.is_mdvr,
            "camera": parseInt(data.camera),
            "remark": data.remark,
            "user_id": userId,
            "id": ID,
            "status": parseInt(data.status)

        }

        axios
            .put(ENDPOINT_BASE_URL + 'fleet/setting/device', JSON.stringify(data_update), { headers })

            .then(function (response) {

                if (response.status === 204) setAlertSetting(true, 1, 'success')

                // console.log(response);
            })
            .catch(function (error) {
                if (error.response) {

                    setAlertSetting(true, 2, error.response.data.Error.Message)
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

    return (

        <Suspense fallback={null}>
            <PannelBox title={t("devices_01")}>
                <Alert
                    setting={alert}
                    onConfirm={() => {
                        console.log(alert)
                        if (alert.type === 1) {
                            window.location.replace("#/Devices")
                            // setAlert({ show: false })
                        } else {
                            setAlert({ show: false })
                        }



                    }}
                    onCancel={() => setAlert({ show: false })}
                />

                <Row>
                    <Col xs="12" lg="6">
                        <FormInput
                            required={true}
                            placeholder={'devices_02'}
                            label={'devices_02'}
                            value={data.device_id}
                            onChange={e => changeHandler('device_id', e.target.value)}
                        />
                        <FormSelectSearch
                            mode={"single"}
                            required={true}
                            schema={true}
                            value={data.model_id}
                            label={"devices_04"}
                            list={list.device}
                            fieldForm={"custId"}
                            placeholder={"devices_04"}
                            flex={1}
                            onChange={(selected) => changeHandler('model_id', selected)}
                        />
                        <FormInput
                            placeholder={'devices_06'}
                            label={'devices_06'}
                            value={data.sale_order_number}
                            onChange={e => changeHandler('sale_order_number', e.target.value)}
                        />



                        <FormTextArea
                            schema={{ "required": [""] }}
                            fieldForm={"remark"}
                            placeholder={'driver_122'}
                            label={'driver_122'}
                            value={data.remark}
                            onChange={e => changeHandler('remark', e.target.value)}

                        />
                        {
                            canEdit &&

                            <FormSelectSearch
                                mode={"single"}
                                required={true}
                                schema={true}
                                value={data.status}
                                label={"subscription_4"}
                                list={list.status}
                                fieldForm={"status"}
                                placeholder={"subscription_4"}
                                flex={1}
                                onChange={(selected) => changeHandler('status', selected)}
                            />
                        }

                    </Col>
                    <Col xs="12" lg="6">
                        <FormInput

                            placeholder={'devices_03'}
                            label={'devices_03'}
                            value={data.mid}
                            onChange={e => changeHandler('mid', e.target.value)}
                        />
                        <FormInput
                            placeholder={'devices_05'}
                            label={'devices_05'}
                            value={data.subscriber_number}
                            onChange={e => changeHandler('subscriber_number', e.target.value)}
                        />

                        <FormInput

                            placeholder={'devices_07'}
                            label={'devices_07'}
                            type={'number'}
                            value={data.camera}
                            onChange={e => changeHandler('camera', e.target.value)}
                        />
                        <FormRadio
                            schema={{ "required": ["is_mdvr"] }}
                            fieldForm={"is_mdvr"}
                            mLabel
                            value={data.is_mdvr}
                            label={"vehicle_13"}
                            flex={1}
                            onClick={(isIndividual, fieldForm) => {
                                setData({ ...data, is_mdvr: isIndividual })
                            }}
                        />



                    </Col>


                </Row>

                <div className="hr-line-dashed" />
                <div className="row" style={{ textAlign: "right", marginRight: 3 }}>
                    <CancelButton
                        onClick={() => window.location.replace("#/Devices")}
                    />
                    <SaveButton
                        name={t("save")}
                        onClick={() => saveItem()}
                    />
                </div>
            </PannelBox>
        </Suspense>
    )

}

export default AddDevice
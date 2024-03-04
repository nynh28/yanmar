import React, { Component, useState, Suspense, useEffect, memo, useCallback, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Row, Col, Container } from 'reactstrap'
import axios from 'axios';
import { get, isEmpty, stubTrue } from 'lodash'
import { useDispatch, useSelector } from "react-redux";
import { Modal, Checkbox, Tabs, Button, Form, Input, Select, InputNumber, Space } from 'antd';
import { ConsoleSqlOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import SaveButton from '../../../../Components/SaveButton'
import CancelButton from '../../../../Components/CancelButton'
import { ENDPOINT_BASE_URL } from '../../../../Config/app-config';
import { CodeSandboxCircleFilled } from '@ant-design/icons';
import Alert from '../../../../Components/Alert'
import DataGrid, { Column, Editing, Paging, Lookup, RequiredRule } from 'devextreme-react/data-grid';
import SweetAlert from 'react-bootstrap-sweetalert'
import data from '../../data';

const { Option } = Select;


const FormInput = (arg) => {
    const { t } = useTranslation()

    return (
        <div className="form-group field field-" style={{ padding: '0 10px', flex: arg.flex || 1 }}>
            {arg.hideLabel ? "" : <label className="control-label" style={{ fontWeight: 500 }}>
                {t(arg.label)}
                {
                    arg.required && [
                        <span className="text-danger"> *</span>
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
                        <span className="text-danger"> *</span>
                    ]
                } :

        </label>

            <Select
                allowClear={false}
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



const Form_mdvr = (props) => {
    const { t } = useTranslation()

    const dataLogin = useSelector(state => state.signin.dataLogin);
    const headers = {
        'Authorization': get(dataLogin, 'userTokenInfo.idToken', ''),
        'X-API-Key': get(dataLogin, 'redisKey', ''),
        'Accept-Language': get(dataLogin, 'language', ''),
    }
    const infoVehicle = useSelector(state => state.vehicle.infoVehicle);
    const vid = get(infoVehicle, 'id', '')
    const userId = get(dataLogin, 'userId', '')
    const [data, setData] = useState({
        terminal_number: "",
        server_id: 1,
        camera_unit: 2,
        main_stream: true,
        sub_stream: true,
        audio: true,
    })
    const [list, setList] = useState({
        server_id: [],
        channel: [],
    })
    const dropdown = [
        {
            "key": 1,
            "value": true,
        },
        {
            "key": 2,
            "value": false,
        }
    ]
    const [inputFields, setInputFields] = useState([
        {
            channel_id: '',
            label_name: '',
        }

    ]);


    const [inputValue, setValue] = useState('');
    const [terminal_number, setTerminal_number] = useState([]);
    let dataTemperature = []


    useEffect(() => {

        fetchData()

    }, [])

    const fetchData = () => {
        props.setAlert(1)

        let one = ENDPOINT_BASE_URL + 'fleet/setting/mdvr/server?user_id=' + userId
        let two = ENDPOINT_BASE_URL + 'fleet/setting/options?user_id=' + userId + '&vid=' + vid

        const requestOne = axios.get(one, {
            headers: headers
        });
        const requestTwo = axios.get(two, {
            headers: headers
        });


        axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
            const server = responses[0]
            const setting = responses[1]
            const dataSetting = get(setting, 'data.result')

            let data3 = dataSetting.find(item => item.id === 3)  //mdvr
            let dropdown_server = server.data.map(item => ({ "key": item.id, "value": item.name }))


            console.log(get(data3, 'options.channel', []))

            setList({
                ...list,
                server_id: dropdown_server,
                channel: get(data3, 'options.channel', [])
            })
            setInputFields(get(data3, 'options.channel', []))


            !isEmpty(data3) && setData({
                ...data,
                terminal_number: '' + get(data3, 'options.id', ''),
                server_id: '' + get(data3, 'options.server_id', ''),
                camera_unit: get(data3, 'options.camera_unit', ''),
                main_stream: get(data3, 'options.main_stream', true),
                sub_stream: get(data3, 'options.sub_stream', true),
                audio: get(data3, 'options.audio', true),
            })
            loadOptions(get(data3, 'options.terminal_number', ''))

            props.setAlert(2)
        })).catch(errors => {
            console.log(errors);
        })

    }


    const onChange = (name, value) => {
        setData({ ...data, [name]: value })
    }

    const onChangeDropdown = (name, value) => {
        setData({ ...data, [name]: value === '1' ? true : false })
    }


    const loadOptions = (inputValue) => {

        setValue(inputValue)


        setTimeout(() => {


            let one = ENDPOINT_BASE_URL + 'fleet/setting/mdvr/device?user_id=' + userId + '&terminal_number=' + inputValue

            const requestOne = axios.get(one, {
                headers: headers
            });


            axios.all([requestOne]).then(axios.spread((...responses) => {
                const device = responses[0]

                let jsondata = device.data.map(item => ({ key: item.id, value: item.terminal_number }))

                setTerminal_number(jsondata)


            })).catch(errors => {
                console.log(errors);
            })

        }, 1000)








    };

    const handleSubmit = e => {
        props.setAlert(1)

        e.preventDefault();

        let arr = inputFields

        if (arr.length > data.camera_unit) {

            let count = arr.length - data.camera_unit
            arr.splice(arr.length - count, count)


        } else if (arr.length < data.camera_unit) {

            let count = data.camera_unit - arr.length

            for (let i = 1; i <= count; i++) {

                let number = !isEmpty(arr) ? Math.max.apply(Math, arr.map(o => o.channel_id)) + 1 : arr.length + 1
                arr.push({ 'channel_id': number, label_name: 'Channel' + number })


            }

        }

        let dataJson = {
            "user_id": userId,
            "vehicle_id": vid,
            "mdvr_device_id": parseInt(data.terminal_number),
            "server_id": parseInt(data.server_id),
            "camera_unit": data.camera_unit,
            "main_stream": data.main_stream,
            "sub_stream": data.sub_stream,
            "audio": data.audio,
            "channel": arr
        }

        // console.log('l : ', dataJson)

        axios
            .post(ENDPOINT_BASE_URL + 'fleet/setting/options/mdvr', dataJson, { headers })

            .then(function (response) {

                if (response.status === 201) props.setAlert(3)

                fetchData()
            })
            .catch(function (error) {
                if (error.response) {

                    props.setAlert(4)
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

    const handleAddFields = () => {
        const values = [...inputFields];
        values.push({ seq: '', param_map_id: '' });
        setInputFields(values);
    };

    const handleRemoveFields = index => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    };

    const handleInputChange = (index, event) => {

        const values = [...inputFields];
        if (event.target.name === "channel_id") {
            values[index].channel_id = event.target.value;

        } else if (event.target.name === "label_name") {
            values[index].label_name = event.target.value;
        }

        setInputFields(values);
    };





    return (
        <Suspense fallback={null}>

            <Row>
                <Col xs="12" lg="6">
                    <FormInput
                        required={false}
                        value={inputValue}
                        label={"search"}
                        placeholder={"vehicle_17"}
                        onChange={(e) => loadOptions(e.target.value)}
                    />
                </Col>
                <Col xs="12" lg="6">
                    <FormSelectSearch
                        mode={"single"}
                        required={true}
                        schema={true}
                        value={data.terminal_number}
                        label={"vehicle_17"}
                        list={terminal_number}
                        fieldForm={""}
                        placeholder={""}
                        flex={1}
                        onChange={(selected) => onChange('terminal_number', selected)}
                    />
                </Col>

            </Row>

            <Row >
                <Col xs="12" lg="6">

                    <FormSelectSearch
                        mode={"single"}
                        required={true}
                        schema={true}
                        value={data.main_stream ? "1" : "2"}
                        label={"vehicle_18"}
                        list={dropdown}
                        fieldForm={"main_stream"}
                        placeholder={"vehicle_18"}
                        flex={1}
                        onChange={(selected) => onChangeDropdown('main_stream', selected)}
                    />
                    <FormSelectSearch
                        mode={"single"}
                        required={true}
                        schema={true}
                        value={data.sub_stream ? "1" : "2"}
                        label={"vehicle_19"}
                        list={dropdown}
                        fieldForm={"sub_stream"}
                        placeholder={"vehicle_19"}
                        flex={1}
                        onChange={(selected) => onChangeDropdown('sub_stream', selected)}
                    />
                    <FormSelectSearch
                        mode={"single"}
                        required={true}
                        schema={true}
                        value={data.audio ? "1" : "2"}
                        label={"vehicle_20"}
                        list={dropdown}
                        fieldForm={"audio"}
                        placeholder={"vehicle_20"}
                        flex={1}
                        onChange={(selected) => onChangeDropdown('audio', selected)}
                    />

                </Col>
                <Col xs="12" lg="6">

                    <FormInput
                        required={true}
                        type={'number'}
                        value={data.camera_unit}
                        label={"vehicle_21"}
                        placeholder={"vehicle_21"}
                        onChange={(e) => onChange('camera_unit', e.target.value)}
                    />

                    <FormSelectSearch
                        mode={"single"}
                        required={true}
                        schema={true}
                        value={data.server_id}
                        label={"vehicle_22"}
                        list={list.server_id}
                        fieldForm={"server_id"}
                        placeholder={"vehicle_22"}
                        flex={1}
                        onChange={(selected) => onChange('server_id', selected)}
                    />


                </Col>
            </Row>

            <hr />
            <div style={{ width: '60%', marginTop: 10, marginLeft: 250 }}>


                <form onSubmit={handleSubmit} style={{ marginLeft: 50 }}>
                    <Row>
                        {inputFields.map((inputField, index) => (
                            <Fragment key={`${inputField}~${index}`}>
                                <Col md="4">
                                    <div className="form-group">
                                        <label htmlFor="channel_id">{t('vehicle_23')}<span className="text-danger">*</span> :</label>
                                        <input
                                            required
                                            type="text"
                                            className="form-control"
                                            id="channel_id"
                                            name="channel_id"
                                            value={inputField.channel_id}
                                            onChange={event => handleInputChange(index, event)}
                                        />
                                    </div>

                                </Col>
                                <Col md="4">
                                    <div className="form-group">
                                        <label htmlFor="label_name">{t('vehicle_24')}<span className="text-danger">*</span> :</label>
                                        <input
                                            required
                                            type="text"
                                            className="form-control"
                                            id="label_name"
                                            name="label_name"
                                            value={inputField.label_name}
                                            onChange={event => handleInputChange(index, event)}
                                        />
                                    </div>

                                </Col>

                                <Col md="4">
                                    <div className="form-group" style={{ marginTop: 25 }}>
                                        <Button
                                            className="btn btn-link"
                                            type="button"
                                            onClick={() => handleRemoveFields(index)}
                                        >
                                            -
                                      </Button>
                                        <Button
                                            className="btn btn-link"
                                            type="button"
                                            onClick={() => handleAddFields()}
                                        >
                                            +
                               </Button>
                                    </div>

                                </Col>
                            </Fragment>
                        ))}
                    </Row>

                    <div style={{ textAlign: 'center', flexDirection: 'row' }}>
                        <button
                            className="btn btn-primary mr-2"
                            type="submit"
                            onSubmit={handleSubmit}
                            style={{ width: 170, height: 40 }}
                        > Save
                  </button>


                    </div>


                </form>


            </div>


        </Suspense>
    );

}

export default memo(Form_mdvr);

import React, { Component, useState, Suspense, useEffect, memo, useCallback, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Row, Col } from 'reactstrap'
import axios from 'axios';
import { get, isEmpty, stubTrue } from 'lodash'
import { useDispatch, useSelector } from "react-redux";
import { Modal, Checkbox, Tabs, Button, Form, Input, Select, InputNumber, Space, Switch } from 'antd';
import { ConsoleSqlOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import SaveButton from '../../../../Components/SaveButton'
import CancelButton from '../../../../Components/CancelButton'
import { ENDPOINT_BASE_URL } from '../../../../Config/app-config';
import { CodeSandboxCircleFilled } from '@ant-design/icons';
import Alert from '../../../../Components/Alert'
import DataGrid, { Column, Editing, Paging, Lookup, RequiredRule } from 'devextreme-react/data-grid';
import SweetAlert from 'react-bootstrap-sweetalert'


const Form_door = (props) => {
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


    const [list, setList] = useState({
        dropdown: []
    })
    const [inputFields, setInputFields] = useState([
        {
            seq: '',
            param_map_id: '1',
            label_name: '',
            is_invert: true,
            checked: true,
        }

    ]);
    const [alert, setAlert] = useState({
        show: false,
        type: 3,
        content: "",
        ErrorSubcode: 0
    })


    useEffect(() => {

        fetchData()
    }, [])

    const fetchData = () => {


        props.setAlert(1)


        let one = ENDPOINT_BASE_URL + 'fleet/setting/parameter/device?user_id=' + userId + '&vehicle_id=' + vid
        let two = ENDPOINT_BASE_URL + 'fleet/setting/options?user_id=' + userId + '&vid=' + vid


        const requestOne = axios.get(one, {
            headers: headers
        });
        const requestTwo = axios.get(two, {
            headers: headers
        });




        axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
            const dataone = responses[0]
            const datatwo = responses[1]
            const dataSetting = get(datatwo, 'data.result')

            let door = dataSetting.find(item => item.id === 2)  //door

            setList({
                ...list,
                dropdown: get(dataone, 'data', ''),

            })

            !isEmpty(get(door, 'options.list', [])) && setInputFields(get(door, 'options.list', []))



            props.setAlert(2)
        })).catch(errors => {
            console.log(errors);
        })

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
        if (event.target.name === "seq") {
            values[index].seq = event.target.value;

        } else if (event.target.name === "param_map_id") {
            values[index].param_map_id = parseInt(event.target.value);
            values[index].is_invert = true
            values[index].checked = true

        } else if (event.target.name === "label_name") {
            values[index].label_name = event.target.value;

        } else if (event.target.name === "is_invert") {

            event.target.value === 'true' ?
                values[index].is_invert = true : values[index].is_invert = false

        } else if (event.target.name === "checked") {

            event.target.value === 'true' ?
                values[index].checked = true : values[index].checked = false
        }

        setInputFields(values);
    };

    const handleSubmit = e => {
        props.setAlert(1)

        e.preventDefault();

        let data = {
            user_id: userId,
            vehicle_id: vid,
            data: inputFields
        }


        axios
            .post(ENDPOINT_BASE_URL + 'fleet/setting/options/door', data, { headers })

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




    };



    // console.log(list)
    return (

        <Suspense fallback={null}>


            <form onSubmit={handleSubmit} style={{ marginLeft: 50 }}>
                <Row>
                    {inputFields.map((inputField, index) => (
                        <Fragment key={`${inputField}~${index}`}>

                            <Col md="1">

                                <div className="form-group">
                                    <label htmlFor="seq">{t('No.')}<span className="text-danger">*</span> :</label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="seq"
                                        name="seq"
                                        value={inputField.seq}
                                        onChange={event => handleInputChange(index, event)}
                                    />
                                </div>
                            </Col>
                            <Col md="3">
                                <div className="form-group">
                                    <label htmlFor="param_map_id">{t('vehicle_26')}<span className="text-danger">*</span> :</label>
                                    <select
                                        required
                                        className="form-control"
                                        id="param_map_id"
                                        name="param_map_id"
                                        value={inputField.param_map_id}
                                        onChange={event => handleInputChange(index, event)}
                                    >
                                        {list.dropdown.map(e => <option value={e.id}>{e.param_name}</option>)}
                                    </select>

                                </div>
                            </Col>
                            <Col md="2">

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
                            <Col md="2">
                                <div className="form-group">
                                    <label htmlFor="is_invert">{t('vehicle_32')} :</label>
                                    <select
                                        required
                                        className="form-control"
                                        id="is_invert"
                                        name="is_invert"
                                        value={inputField.is_invert}
                                        onChange={event => handleInputChange(index, event)}
                                    >
                                        <option value="true">true</option>
                                        <option value="false">false</option>

                                    </select>

                                </div>

                            </Col>
                            <Col md="2">
                                <div className="form-group">
                                    <label htmlFor="checked">{t('my_vehicles_77')} :</label>
                                    <select
                                        required
                                        className="form-control"
                                        id="checked"
                                        name="checked"
                                        value={inputField.checked}
                                        onChange={event => handleInputChange(index, event)}
                                    >
                                        <option value="true">true</option>
                                        <option value="false">false</option>

                                    </select>

                                </div>

                            </Col>
                            <Col md="2">
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
        </Suspense>

    );

}

export default memo(Form_door);

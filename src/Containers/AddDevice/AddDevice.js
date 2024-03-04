
import React, { Component, useState, Suspense, useEffect, memo, useCallback, useRef } from 'react'
import PannelBox from '../../Components/PannelBox'
import { t, v, v_em } from '../../Components/Translation'
import { Row, Col, Button } from 'reactstrap'
import { Select } from 'antd';
import axios from 'axios';
import { get, isEmpty } from 'lodash'
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next'
import { ENDPOINT_BASE_URL } from '../../Config/app-config';
import Table from '../../Components/DataGridView/Table'
import VehicleActions from '../../Redux/VehicleRedux'
import Alert from '../../Components/Alert'
const { Option } = Select;


const AddDevice = () => {
    const dataLogin = useSelector(state => state.signin.dataLogin);
    const headers = {
        'Authorization': get(dataLogin, 'userTokenInfo.idToken', ''),
        'X-API-Key': get(dataLogin, 'redisKey', ''),
        'Accept-Language': get(dataLogin, 'language', ''),

    }

    const userId = get(dataLogin, 'userId', '')



    const lstUserLavel = [1, 2, 11, 12, 31, 32]
    const checkUser = lstUserLavel.includes(get(dataLogin, 'userLevelId', ''))
    const dispatch = useDispatch();
    const {
        setDevice
    } = VehicleActions
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
        dispatch(setDevice(null, null))

    }, [])
    const editItem = e => {

        dispatch(setDevice(get(e, 'id', ''), 'Edit'))
        onClickAdd()
    }
    const delItem = e => {
        setAlertSetting(true, 6)
        let data_del = {
            "id": e,
            "user_id": userId
        }

        axios
            .delete(ENDPOINT_BASE_URL + 'fleet/setting/device', {
                headers: headers,
                data: JSON.stringify(data_del),
            })
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

    const onClickAdd = () => window.location.replace("#/Devices/AddDeviceForm")




    return (

        <Suspense fallback={null}>
            <Alert
                setting={alert}
                onConfirm={() => {

                    if (alert.status) {


                        window.location.replace("#/Devices")
                    }

                    setAlert({ show: false })

                }}
                onCancel={() => setAlert({ show: false })}
            />
            <PannelBox title={t("side_menu_87")}>
                <div style={{ textAlign: "right", marginTop: 5, marginBottom: 0, marginRight: 0 }}>
                    <Button className="btn btn-primary btn-sm" onClick={() => onClickAdd()}><i className="fa fa-plus"></i>{' '}Add</Button>
                </div>
                <Table
                    mode={"api"}
                    serversideSource={ENDPOINT_BASE_URL + 'fleet/setting/device/list?user_id=' + userId}
                    author={get(dataLogin, 'userTokenInfo.idToken', '')}
                    xAPIKey={get(dataLogin, 'redisKey', '')}
                    user_id={get(dataLogin, 'userId', '')}
                    table_id={4}
                    showSetting={false}
                    editing={{
                        enabled: true,
                        allowUpdating: false,
                        allowDeleting: false
                    }}
                    searchPanel={true}
                    selectItemVisible={false}
                    ExportEnable={false}
                    groupCellTemplate={false}
                    autoExpandAll={false}
                    key={"id"}
                    // columnCount="id"
                    customButton={[
                        {
                            hint: "Edit",
                            icon: "edit",
                            visible: checkUser,
                            onClick: (e) => editItem(e.row.data)
                        },
                        {
                            hint: "Delete",
                            icon: "trash",
                            visible: checkUser,
                            onClick: (e) => delItem(e.row.key)
                        }
                    ]}

                    column={[
                        {
                            column_name: 'device_id',
                            column_caption: "devices_02",
                        },
                        {
                            column_name: 'mid',
                            column_caption: "devices_03",
                        },
                        {
                            column_name: 'model_name',
                            column_caption: "devices_04",
                        },
                        {
                            column_name: 'subscriber_number',
                            column_caption: "devices_05",
                        },
                        {
                            column_name: 'sale_order_number',
                            column_caption: "devices_06",
                        },
                        {
                            column_name: 'is_mdvr',
                            column_caption: "vehicle_13",
                        },
                        // {
                        //     column_name: 'server_name',
                        //     column_caption: "server_name",
                        // },
                        {
                            column_name: 'camera',
                            column_caption: "vehicle_21",
                        },
                        {
                            column_name: 'vehicle_name',
                            column_caption: "Vehicle_Name_TB",
                        },
                        {
                            column_name: 'vin_no',
                            column_caption: "control_room_04",
                        },
                        {
                            column_name: 'status_name',
                            column_caption: "subscription_4",
                        },

                    ]}

                >
                </Table>


            </PannelBox>
        </Suspense>
    )

}

export default AddDevice
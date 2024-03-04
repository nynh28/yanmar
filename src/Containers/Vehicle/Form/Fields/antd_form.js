import React, { Component, useState, Suspense, useEffect, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Row, Col } from 'reactstrap'
import axios from 'axios';
import { get, isEmpty, stubTrue } from 'lodash'
import { useDispatch, useSelector } from "react-redux";
import { Modal, Checkbox, Tabs, Button, Form, Input, Select, InputNumber, Space } from 'antd';
import { ConsoleSqlOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { t, v, v_em } from '../../../../Components/Translation'
import SaveButton from '../../../../Components/SaveButton'
import CancelButton from '../../../../Components/CancelButton'
import { ENDPOINT_BASE_URL } from '../../../../Config/app-config';
import { CodeSandboxCircleFilled } from '@ant-design/icons';
import Alert from '../../../../Components/Alert'
import DataGrid, { Column, Editing, Paging, Lookup, RequiredRule } from 'devextreme-react/data-grid';
import SweetAlert from 'react-bootstrap-sweetalert'


const antd_form = () => {


    const dataLogin = useSelector(state => state.signin.dataLogin);
    const headers = {
        'Authorization': get(dataLogin, 'userTokenInfo.idToken', ''),
        'X-API-Key': get(dataLogin, 'redisKey', ''),
        'Accept-Language': get(dataLogin, 'language', ''),
    }
    const infoVehicle = useSelector(state => state.vehicle.infoVehicle);
    const vid = get(infoVehicle, 'id', '')
    const userId = get(dataLogin, 'userId', '')



    useEffect(() => {


    }, [])





    return (
        <Suspense fallback={null}>

        </Suspense>
    );

}

export default memo(antd_form);

import React, { Component, useState, Suspense, useEffect, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Row, Col, Container } from 'reactstrap'
import axios from 'axios';
import { get, isEmpty, stubTrue } from 'lodash'
import { useDispatch, useSelector } from "react-redux";
import { Modal, Checkbox, Tabs, Button, Form, Input, Select, InputNumber, Space } from 'antd';
import { ConsoleSqlOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// import { t, v, v_em } from '../../../../Components/Translation'
import SaveButton from '../../../../Components/SaveButton'
import CancelButton from '../../../../Components/CancelButton'
import { ENDPOINT_BASE_URL } from '../../../../Config/app-config';
import { CodeSandboxCircleFilled } from '@ant-design/icons';
import Alert from '../../../../Components/Alert'
import DataGrid, { Column, Editing, Paging, Lookup, RequiredRule } from 'devextreme-react/data-grid';

import Form_mdvr from './Form_mdvr'
import Form_door from './Form_door'
import Form_temp from './Form_temp'

const { TabPane } = Tabs;
const FormSetVehicle = () => {
  const [form] = Form.useForm();
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
  const [option, setOption] = useState({
    door: false,
    mdvr: false,
    mixer: false,
    snapshot: false,
    temperature: false,
    defaultActivekey: '',
  })
  const [dataOption, setDataOption] = useState([])
  const [list, setList] = useState({
    temperature: '',
    mdvr: '',
  })
  const [dropdown, setDropdown] = useState({
    temperature: ''
  })
  const [alert, setAlert] = useState({
    show: false,
    type: 3,
    content: "",
    ErrorSubcode: 0
  })


  let dataTemperature = list.temperature



  useEffect(() => {

    fetchData()

  }, [])

  const setAlertSetting = (isShow, type, content = "", ErrorSubcode) => {

    setAlert({
      show: isShow,
      type: type,
      content: content,
      ErrorSubcode: ErrorSubcode
    })

  }



  const fetchOption = (id, value) => {


    let data = {
      user_id: userId,
      vehicle_id: vid,
      data: [
        {
          option_id: id,
          checked: value
        },
      ]
    }

    fetch(
      ENDPOINT_BASE_URL + 'fleet/setting/options',
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
      }
    )
      .then(res => res.json())
      .then(response => {

        setAlertSetting(true, 1, 'success')

      })
      .catch(error => console.log(error));


  }

  const fetchData = () => {

    let one = ENDPOINT_BASE_URL + 'fleet/setting/options?user_id=' + userId + '&vid=' + vid
    let two = ENDPOINT_BASE_URL + 'fleet/setting/parameter/device?user_id=' + userId + '&vehicle_id=' + vid

    const requestOne = axios.get(one, {
      headers: headers
    });
    const requestTwo = axios.get(two, {
      headers: headers
    });

    axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
      const setting = responses[0]
      const device = responses[1]
      const data = get(setting, 'data.result')

      // console.log(device.data)
      // console.log('data', data)
      // setDataOption(data.map(({id,checked,name})=>{return{id,checked,name}}))
      setDataOption(JSON.parse(JSON.stringify(data)))

      let data1 = data.find(item => item.id === 1)  //temperature
      let data2 = data.find(item => item.id === 2)  //door
      let data3 = data.find(item => item.id === 3)  //mdvr
      let data4 = data.find(item => item.id === 4)  //mixer
      let data5 = data.find(item => item.id === 5)  //snapshot
      // let keyActive = data.find(item => item.checked == true).id // find key is true for default Tabs


      setDropdown({ temperature: get(device, 'data', '') })

      setOption({
        temperature: get(data1, 'checked'),
        door: get(data2, 'checked'),
        mdvr: get(data3, 'checked'),
        mixer: get(data4, 'checked'),
        snapshot: get(data5, 'checked'),
        defaultActivekey: ''
      })
      setList({
        temperature: get(data1, 'options.list', {}),
        // mdvr: data3
      })
      dataTemperature = get(data1, 'options.list', {})

    })).catch(errors => {
      console.log(errors);
    })

  }


  const checkAlert = number => {

    // console.log(number)

    if (number === 1) {

      setAlertSetting(true, 6)

    } else if (number === 2) {

      setAlertSetting(false, 6)

    } else if (number === 3) {

      setAlertSetting(true, 1, 'success')

    } else if (number === 4) {

      setAlertSetting(true, 2, 'error')
    }



  }




  const callback = key => setOption({ ...option, defaultActivekey: key })

  let _temp = dataOption.find(item => item.id === 1),
    _door = dataOption.find(item => item.id === 2),
    _mdvr = dataOption.find(item => item.id === 3)

  return (
    <Suspense fallback={null}>

      <Alert
        setting={alert}
        onConfirm={() => {
          console.log(alert)
          if (alert.type === 1) {

            setAlert({ show: false })
          } else {
            setAlert({ show: false })
          }



        }}
        onCancel={() => setAlert({ show: false })}
      />

      <div style={{ width: 'auto' }}>

        <Row style={{ marginLeft: 50 }}>
          {/* {console.log('option', option, dataOption)} */}
          {dataOption.map((itm) => {
            return (
              <Col xs={6} >
                <Checkbox
                  checked={itm.checked}
                  onChange={() => {
                    let _dataOption = JSON.parse(JSON.stringify(dataOption)), newChk = !itm.checked
                    let idx = _dataOption.findIndex((dt) => dt.id === itm.id)
                    // console.log('idx', idx, _dataOption[idx])
                    _dataOption[idx].checked = newChk
                    setDataOption(_dataOption)
                  }}
                  onClick={() => fetchOption(itm.id, !itm.checked)}
                >{itm.name}</Checkbox>
              </Col>
            )
          })}
          {/* <Col xs={6} >
            <Checkbox checked={option.door} onChange={() => setOption({ ...option, door: !option.door })} onClick={() => fetchOption(2, !option.door)} >{t('vehicle_12')}</Checkbox>
          </Col>
          <Col xs={6}>
            <Checkbox checked={option.mdvr} onChange={() => setOption({ ...option, mdvr: !option.mdvr })} onClick={() => fetchOption(3, !option.mdvr)}>{t('vehicle_13')}</Checkbox>
          </Col>
          <Col xs={6}>
            <Checkbox checked={option.mixer} onChange={() => setOption({ ...option, mixer: !option.mixer })} onClick={() => fetchOption(4, !option.mixer)}>{t('vehicle_14')}</Checkbox>
          </Col>
          <Col xs={6}>
            <Checkbox checked={option.snapshot} onChange={() => setOption({ ...option, snapshot: !option.snapshot })} onClick={() => fetchOption(5, !option.snapshot)}>{t('vehicle_15')}</Checkbox>
          </Col>
          <Col xs={6}>
            <Checkbox checked={option.temperature} onChange={() => setOption({ ...option, temperature: !option.temperature })} onClick={() => fetchOption(1, !option.temperature)}>{t('vehicle_16')}</Checkbox>
          </Col> */}
        </Row>

        <Row>
          <Col>

            <Tabs activeKey={option.defaultActivekey} onChange={callback} type="card" style={{ marginTop: 50 }}>
              <TabPane tab={t('vehicle_12')} key="2" disabled={!get(_door, 'checked', false)}>
                <Form_door setAlert={e => checkAlert(e)} />

              </TabPane>

              <TabPane tab={t('vehicle_13')} key="3" disabled={!get(_mdvr, 'checked', false)}>
                <Row>

                  <Col md={10}>
                    <Form_mdvr setAlert={e => checkAlert(e)} />
                  </Col>
                </Row>

              </TabPane>
              {/* <TabPane tab={t('vehicle_15')} key="5" disabled={!option.snapshot}>

                            </TabPane> */}
              <TabPane tab={t('vehicle_16')} key="1" disabled={!get(_temp, 'checked', false)}>
                {/* <TabPane tab={t('vehicle_16')} key="1" disabled={!option.temperature}> */}

                <Form_temp setAlert={e => checkAlert(e)} />

              </TabPane>
            </Tabs>
            {/* </Col> */}



          </Col>
        </Row>






      </div>
    </Suspense >
  );

}

export default memo(FormSetVehicle);

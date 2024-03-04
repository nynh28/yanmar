import React, { Component, Suspense, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import EvidenceActions from '../../Redux/EvidenceRedux'
import { Row, Col } from 'reactstrap'
import PannelBox from '../../Components/PannelBox'
import { t } from "../../Components/Translation";
import FormSelect from '../../Components/FormControls/Basic/FormSelect'
import FormDateTimePicker from '../../Components/FormControls/FormDateTimePicker';
import DataTable from './DataTable';
import './assets/styles.css'
import moment from 'moment';
import { isEmpty } from 'lodash'
import { ENDPOINT_BASE_URL, ENDPOINT_BASE } from '../../Config/app-config';
import { useTranslation } from 'react-i18next'
import {
  Input,
  Select
} from "antd";
const { Option } = Select;

//#region 
const Dropdown = (arg) => {
  return (<FormSelect
    mode={"multiple"}
    value={arg.selected.length == 0 ? [] : arg.selected}
    label={arg.label}
    list={arg.data}
    flex={1}
    onChange={(selected) => {
      var lastItem = selected[selected.length - 1];
      let select = selected

      if ([0, -1].includes(lastItem)) {
        select = lastItem
      }
      else {
        let idx = select.findIndex((id) => id === 0 || id === -1)

        if (idx > -1) {
          const index = select.indexOf(select[idx]);
          if (index > -1) {
            select.splice(index, 1);
          }
        }
      }
      if (!isEmpty(selected)) arg.onChange(select)
    }}
  />)
}

const LISTNAME = [
  { key: 'history_1', value: 'history_1' },
  { key: 'history_2', value: 'history_2' },
  { key: 'history_3', value: 'history_3' },
]

const DropdownGroup = (arg) => {
  const { t } = useTranslation()
  return <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
    <label className="control-label" style={{ fontWeight: 500 }}>
      {t(arg.label)} :
    </label>

    <Input.Group compact>
      <Select
        key="select-key"
        style={{ width: "40%" }}
        value={arg.searchBy}
        onChange={(selected) => {
          arg.onChangeSearch(selected)
        }}
      >
        {
          LISTNAME.map((item) => {
            return <Option key={item.key} value={item.value}>{t(item.value)}</Option>
          })
        }
      </Select>

      <Select
        allowClear={true}
        mode={"multiple"}
        showSearch
        style={{ width: "60%" }}
        value={arg.selected}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        onChange={(selected) => {
          var lastItem = selected[selected.length - 1];
          let select = selected

          if ([0].includes(lastItem)) {
            select = lastItem
          }
          else {
            let idx = select.findIndex((id) => id === 0)

            if (idx > -1) {
              const index = select.indexOf(select[idx]);
              if (index > -1) {
                select.splice(index, 1);
              }
            }
          }
          if (!isEmpty(selected)) arg.onChangeDevice(select)
        }}
      >
        {
          arg.deviceList.map((item) => {
            return <Option
              key={item.key}
              value={item.value}>{arg.searchBy === "history_1" ? t(item.license_plate_no) : arg.searchBy === "history_2" ? t(item.vehicle_name) : t(item.vin_no)}</Option>
          })
        }
      </Select>
    </Input.Group>
  </div>

}
//#endregion

let isFirstLoad = false
const EvidenceMDVR = (props) => {
  let { dataLogin, language, header } = props
  // const [startDate, setStartDate] = useState(moment().startOf('month').format("DD/MM/YYYY 00:00:00"))
  const [startDate, setStartDate] = useState(moment().format("DD/MM/YYYY 00:00"))
  const [stopDate, setStopDate] = useState(moment().format("DD/MM/YYYY 23:59"))
  const [alarmList, setAlarmList] = useState([])
  const [alarmSelected, setAlarmSelected] = useState([])
  const [alarmAll, setAlarmAll] = useState([])
  const [deviceSelected, setDeviceSelected] = useState([])
  const [deviceList, setDeviceList] = useState([])
  const [deviceAll, setDeviceAll] = useState([])
  const [searchBy, setSearchBy] = useState("history_1")

  useEffect(() => {
    props.setValue("isLoadingEvidence", false)
    getOptionAlarm()
    getDeviceLits()
  }, [])

  useEffect(() => {
    getOptionAlarm()
    getEvidenceData()
  }, [language])

  const getEvidenceData = async () => {
    props.setValue("isLoadingEvidence", true)
    console.log(">> getEvidenceData <<")

    try {
      // var response = await fetch("http://10.8.0.6:5000/gateway/mdvr/evidence/info", {
      var response = await fetch(ENDPOINT_BASE + "gateway/mdvr/evidence/info", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'AccessToken': header.idToken,
          'Accept-Language': language
        },
        body: JSON.stringify({
          "device_id": deviceSelected == 0 ? deviceAll : deviceSelected,
          "starttime": startDate,
          "endtime": stopDate,
          // "starttime": "2022-02-04 00:00:00",
          // "endtime": "2022-02-04 23:00:00",
          "alarmtype": alarmSelected == 0 ? alarmAll : alarmSelected,
          "keyword_type": -1,
          "keyword": "",
          "page": 1,
          "per_page": 10
        })
      });

      // -1:None          /
      //  0:Driver        X
      //  1:Licenseplate  //
      //  2:Evidence      /

      var data = await response.json();

      if (data.message === "ok") {
        console.log(">> getEvidenceData  : ", data.result)
        props.setValue("evidenceData", data.result)
      }
      else {
        props.setValue("evidenceData", [])
      }
      props.setValue("isLoadingEvidence", false)
    } catch {
      props.setValue("isLoadingEvidence", false)
    }
  }

  const getOptionAlarm = async () => {
    try {
      // var response = await fetch(`http://10.8.0.6:5000/gateway/mdvr/dropdown?user_id=${dataLogin.userId}&options=ALARM`, {
      var response = await fetch(`${ENDPOINT_BASE}gateway/mdvr/dropdown?user_id=${dataLogin.userId}&options=ALARM`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'AccessToken': header.idToken,
          'Accept-Language': language
        }
      });

      var data = await response.json();
      console.log(">> getOptionAlarm  : ", data)
      if (data.message === "ok") {
        let newData = [], selectAll = []
        data.result.forEach(item => {
          newData.push({
            key: item.alarm_type,
            value: item.alarm_type,
            text: item.alarm_desc
          })
          selectAll.push(item.alarm_type)
        })

        newData.unshift(
          {
            key: 0,
            value: 0,
            text: "my_vehicles_92",
          }
        )
        setAlarmSelected(newData[0].key)
        setAlarmList(newData)
        setAlarmAll(selectAll)
      }
      else {
        setAlarmList([])
        setAlarmAll([])
      }
    } catch {

    }
  }

  const getDeviceLits = async () => {
    props.setValue("isLoadingEvidence", true)
    try {
      var response = await fetch(ENDPOINT_BASE_URL + `fleet/mdvr/device?user_id=${dataLogin.userId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });

      var data = await response.json();
      if (data.message === "ok") {
        let newData = [], selectAll = []
        data.result.forEach(item => {
          newData.push({
            key: item.terid,
            value: item.terid,
            license_plate_no: item.license_plate_no,
            vin_no: item.vin_no,
            terid: item.terid,
            vehicle_name: item.vehicle_name,
          })
          selectAll.push(item.terid)
        })

        newData.unshift(
          {
            key: 0,
            value: 0,
            license_plate_no: "my_vehicles_92",
            vin_no: "my_vehicles_92",
            terid: "my_vehicles_92",
            vehicle_name: "my_vehicles_92",
          }
        )

        setDeviceSelected(newData[0].key)
        setDeviceList(newData)
        setDeviceAll(selectAll)
      }
      else {
        setDeviceList([])
        setDeviceAll([])
      }
      props.setValue("isLoadingEvidence", false)
    } catch {
      props.setValue("isLoadingEvidence", false)
    }
  }

  const onApplyEvent = (dataObject) => {
    console.log(">> onApplyEvent")
    let startDate = dataObject.startDate.format('YYYY-MM-DD HH:mm:ss')
    let stopDate = dataObject.endDate.format('YYYY-MM-DD HH:mm:ss')

    if (!isFirstLoad) {
      isFirstLoad = true
      stopDate = dataObject.startDate.format('YYYY-MM-DD 23:59:59')
    }
    console.log("> startDate  : ", startDate)
    console.log("> stopDate  : ", stopDate)

    setStartDate(startDate)
    setStopDate(stopDate)
  }

  return (
    <Suspense fallback={null}>
      <PannelBox
        title={t("ค้นหาหลักฐาน")}
        showFooter={true}
        footerchildren={
          <div style={{ textAlign: 'Right' }}>
            <button onClick={() => {
              getEvidenceData()
            }} className="btn" style={{ marginRight: 10, backgroundColor: '#1AB394', color: 'white' }}>{t("search")} </button>
          </div>
        }
      >
        <Row>
          <Col lg={4} lg={4} sm={12}>
            <DropdownGroup
              label={searchBy}
              deviceList={deviceList}
              selected={deviceSelected}
              searchBy={searchBy}
              onChangeSearch={(select) => {
                setSearchBy(select)
              }}
              onChangeDevice={(select) => {
                setDeviceSelected(select)
              }}
            />
          </Col>

          <Col lg={4} lg={4} sm={12}>
            <Dropdown
              data={alarmList}
              selected={alarmSelected}
              label={"ประเกทหลักฐาน"}
              onChange={(selected) => {
                console.log("onChange : ", selected)
                setAlarmSelected(selected)
              }}
            />
          </Col>

          <Col lg={4} lg={4} sm={12}>
            <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
              <label className="control-label" style={{ fontWeight: 500 }}>
                {t('date_Range')} :
              </label>
              <FormDateTimePicker
                select_change={onApplyEvent.bind(this)}
                startDate={startDate}
                endDate={stopDate}
                maxDate={moment().endOf("day")}
                language={language}
                timePicker={true}
                disabledDateLimit={true}
              >
              </FormDateTimePicker>
            </div>
          </Col>
        </Row>
      </PannelBox>

      <PannelBox
        style={{ marginTop: -20 }}
        title={t("รายการหลักฐาน")}
        showFooter={false}
      >
        <DataTable onLinkTo={() => props.history.push("/MDVR-Evidence/Monitor")} />
      </PannelBox>
    </Suspense>
  )
}


const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  language: state.versatile.language
});

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(EvidenceActions.setValue(name, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(EvidenceMDVR)

import React, { useEffect, useState, Suspense } from "react";
import { BoxContrainer, Button } from '../../components_new'
import './style.css'
import { Card, Row , Col, DatePicker} from 'antd'
import Timeline from "./Timeline";
import moment from "moment";
import { get, isEmpty } from 'lodash'
import FormSelectSearch from "../../Components/FormControls/FormSelectSearch";
import { t } from '../../Components/Translation'
import FormDatepickerNew from '../../Components/FormControls/FormDatepickerNew';
import { ENDPOINT_BASE_URL_YNM2 } from '../../Config/app-config'
import { connect } from 'react-redux'
import { ExportPDF } from "./Export/ExportPDF";
import Chart, {
  ArgumentAxis,
  Label,
  Legend,
  Series,
} from "devextreme-react/chart";

const { RangePicker } = DatePicker;
const DateRangePicker = (arg) => {
  return (<div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
    <label className="control-label" style={{ fontWeight: 500 }}>
      {t('date_Range')} :
    </label>
    <FormDatepickerNew
      timePicker={false}
      select_change={arg.select_change}
      language={arg.language}
      startDate={arg.startDate}
      endDate={arg.endDate}
      maxDate={arg.eDate}>
    </FormDatepickerNew>
  </div>
  )
}

const TODAYSTART = moment().add(-1, 'days').set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
const TODAYEND = moment().set({ hour: 23, minute: 59, second: 59, millisecond: 59 })


const WorkingReport = (props) => {

  const [showMap, setShowMap] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState()
  const [startdate , setStartDate] = useState(TODAYSTART.format('YYYY-MM-DD HH:mm:ss'))
  const [enddate , setEndDate] = useState(TODAYEND.format('YYYY-MM-DD HH:mm:ss'))
  const [chassis , setChasiss]= useState()
  const [vin ,setVin]=useState()

  useEffect(()=>{
    Getv()
  },[])

  const appendRecords = (item) => {
    return <tr key={item.date} className="tb-record">
      <td>{moment(item.date, 'YYYY-MM-DD').format('DD/MM/YYYY')}</td>
      <td>{item.total_working_in_hour}</td>
    </tr>
  }

 async function GetData() {
  let body = {
    "dtstart": moment(startdate).format("YYYY-MM-DD HH:mm:ss"),
    "dtstop": moment(enddate).format("YYYY-MM-DD HH:mm:ss"),
  }
  try{
  const response = await fetch(ENDPOINT_BASE_URL_YNM2 + "fleet/report/working/"+vin, {
     method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      var data = await response.json()
      if(Object.keys(data.result.working_data).length !== 0){
      setDataSource(data.result)
        console.log("yes")
      }
      else{
        console.log("no")
        setDataSource([])
      }

    }
    catch(err){
      console.log(err)
    }
 }

 async function Getv() {
  try{
  const response = await fetch(ENDPOINT_BASE_URL_YNM2 + "fleet/Yanmar/getVehicleByDealer", {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: props.dataLogin.userId,
           dealer_id: "all"
        })
      });
      var data = await response.json();
      let { by_chassis_no_and_engine_no } = data.result[0]
      let chassisNo = []
        by_chassis_no_and_engine_no.forEach(item => {
        chassisNo.push({ key: item.vid, value: item.chassis_no })
 })
 if(data?.code === 200){
  setChasiss(chassisNo)
}
  }
  catch(err){
    Getv()
  }


 }

  function onApplyEvent(dataObject) {
  //   console.log(dataObject)
  //   console.log( dataObject.startDate.format('YYYY-MM-DD'))

  // return
    setStartDate(dataObject.startDate.format('YYYY-MM-DD'))
    setEndDate(dataObject.endDate.format('YYYY-MM-DD'))

    let prm_start_date = dataObject.startDate.format('YYYY-MM-DD HH:mm:ss')
    let prm_stop_date = dataObject.endDate.format('YYYY-MM-DD HH:mm:ss')

    if (prm_start_date !== prm_start_date || prm_stop_date !== prm_stop_date) {
      this.setState({
        prm_start_date,
        prm_stop_date,
        fileNameDate: dataObject.startDate.format('DD-MM-YYYY HH_mm') + ' to ' + dataObject.endDate.format('DD-MM-YYYY HH_mm')
      })
    }
  }


  return (
    console.log(dataSource),
    <Suspense fallback={null}>
      <BoxContrainer
      title={"รายงานการทำงานของรถขุด"}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button isSearchButton={true} onClick={() => GetData()} />
      </div>}
      >

        <Row>
          <Col lg={12} md={12} sm={12}>
    <FormSelectSearch
     schema={{ "required": "" }}
              mode={"single"}
              label={"VIN"}
              flex={1}
              list={chassis}
              value={vin}
              onChange={(value,e) =>
                {console.log("selected",value,e)
              setVin(value)
              }

              }
              />
          </Col>

          <Col lg={12} md={12} sm={12}>

             <DateRangePicker
              select_change={onApplyEvent.bind(this)}
              language={props.language}
              // maxDate={state.eDate}
              startDate={moment(startdate).format('DD/MM/YYYY')}
              endDate={moment(enddate).format('DD/MM/YYYY')}
            />
          </Col>
        </Row>
      </BoxContrainer>
      <BoxContrainer>
        <div className="container" style={{display: 'flex' , paddingBottom: "1rem" , flexDirection: 'row'}}>
          <div style={{ width: 700}}>
          <Col style={{ marginLeft: '15rem',paddingRight: '20rem'}} >
            <Row><span>{t("Model_Code")} : {get(dataSource, 'vehicle_data.model_code', [])}</span></Row>
            <Row><span>{t("VIN")} : {get(dataSource, 'vehicle_data.vin_no', [])}</span></Row>
            <Row><span>{t("dealer")} : {get(dataSource, 'vehicle_data.dealer_name', [])}</span></Row>
            <Row><span>{t("other_reports_144")} : {get(dataSource, 'vehicle_data.engine_hour', [])}</span></Row>
            <Row><span>ตำแน่งปัจจุบัน : {get(dataSource, 'vehicle_data.location', [])}</span></Row>
            <Row><span>{t("history_118")} : {get(dataSource, 'vehicle_data.working_hour_start', [])}</span></Row>
            <Row><span>ระยะเวลาการทำงาน : {get(dataSource, 'vehicle_data.working_hour', [])}</span></Row>
          </Col>
          </div>
          <div>
          <Col style={{width: 'auto'}} >
            <Row><span>{t("partner_name")} : {get(dataSource, 'vehicle_data.customer_name', [])}</span></Row>
            <Row><span>{t("ph_mobile")} : {get(dataSource, 'vehicle_data.phone', [])}</span></Row>
            <Row><span>{t("realtime_158")} : {get(dataSource, 'vehicle_data.delivery_date', [])}</span></Row>
            <Row><span>{t("realtime_157")} : {get(dataSource, 'vehicle_data.leased_no', [])}</span></Row>
            <Row><span>อัพเดตล่าสุด : {get(dataSource, 'vehicle_data.gps_date', [])}</span></Row>
            <Row><span>{t("history_119")} : {get(dataSource, 'vehicle_data.working_hour_stop', [])}</span></Row>
          </Col>
</div>
        </div>
         <div style={{ textAlign: 'right' }}>
          <Button isSecondaryButton={true} text={"Export"} onClick={()=> {ExportPDF(dataSource)}} />
      </div>
        <div >
          <div className="container-timeline" style={{ zoom: 0.8}} >
            <table className="tb-timeline">
              <tr>
                <th style={{ width: 80 }}>วันที่</th>
                <th style={{ width: 80 }}>ชั่วโมงการทำงาน</th>
              </tr>
              {
                get(dataSource, 'working_data') && dataSource.working_data.map((item) => appendRecords(item))
              }
              <tr className="tr-blank">
                <td></td>
                <td></td>
              </tr>
            </table>
            <div style={{ overflow: "scroll", display: "flex", flexDirection: "row", width: 'calc(100vw - 20px)' }}>
              <div style={{
                width: 'calc(100vw - 20px)',
                flexShrink: 0
              }}>
                <Timeline dataSource={get(dataSource,'working_data',[])}
                // dataSource={get(dataSource, 'working_data', [])}
                />
              </div>
            </div>
          </div>
        </div>
      </BoxContrainer>
    </Suspense>
  )
}
const mapStateToProps = (state) => ({
   dataLogin: state.signin.dataLogin,
})
const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps,mapDispatchToProps)(WorkingReport)



let mockData = {
  "vehicle_data": {
    "vid": 36446,
    "vehicle_name": "",
    "vin_no": "YMRVIO55HNBJBH688",
    "model_code": "VIO55-CC",
    "chassis_no": "YMRVIO55HNBJBH688",
    "engine_no": "99146",
    "dealer_name": "YANMAR SURAT THANI",
    "customer_name": "Amornkul Civil Co.,Ltd.",
    "phone": "0983989914",
    "leased_no": "0000",
    "delivery_date": "2022-04-20",
    "engine_hour": 2185.8,
    "location": "Wichit Mueang Phuket Phuket",
    "gps_date": "2023-03-23 15:41:30",
    "working_hour_start": 1623.2,
    "working_hour_stop": 1814.1,
    "working_hour": 190.9
  },
  "working_data": [
    {
      "date": "2023-01-01",
      "total_working_in_hour": 8.2,
      "working": [
        {
          "start": "2023-01-01 08:00:04",
          "stop": "2023-01-01 12:25:38"
        },
        {
          "start": "2023-01-01 13:04:47",
          "stop": "2023-01-01 17:01:01"
        }
      ]
    },
    {
      "date": "2023-01-02",
      "total_working_in_hour": 0.0,
      "working": [
        {
          "start": "2023-01-02 20:08:55",
          "stop": "2023-01-02 20:12:08"
        }
      ]
    },
    {
      "date": "2023-01-03",
      "total_working_in_hour": 8.2,
      "working": [
        {
          "start": "2023-01-03 08:00:04",
          "stop": "2023-01-03 12:25:38"
        },
        {
          "start": "2023-01-03 13:04:47",
          "stop": "2023-01-03 17:01:01"
        }
      ]
    },
    {
      "date": "2023-01-04",
      "total_working_in_hour": 8.0,
      "working": [
        {
          "start": "2023-01-04 08:06:00",
          "stop": "2023-01-04 12:06:45"
        },
        {
          "start": "2023-01-04 12:50:30",
          "stop": "2023-01-04 16:53:17"
        }
      ]
    },
    {
      "date": "2023-01-05",
      "total_working_in_hour": 6.6,
      "working": [
        {
          "start": "2023-01-05 08:12:57",
          "stop": "2023-01-05 09:02:28"
        },
        {
          "start": "2023-01-05 09:21:40",
          "stop": "2023-01-05 12:21:55"
        },
        {
          "start": "2023-01-05 13:02:33",
          "stop": "2023-01-05 15:57:53"
        }
      ]
    },
    {
      "date": "2023-01-06",
      "total_working_in_hour": 0.4,
      "working": [
        {
          "start": "2023-01-06 08:22:52",
          "stop": "2023-01-06 08:30:39"
        },
        {
          "start": "2023-01-06 17:27:04",
          "stop": "2023-01-06 17:37:23"
        },
        {
          "start": "2023-01-06 18:09:15",
          "stop": "2023-01-06 18:24:16"
        }
      ]
    },
    {
      "date": "2023-01-07",
      "total_working_in_hour": 7.6,
      "working": [
        {
          "start": "2023-01-07 08:00:50",
          "stop": "2023-01-07 12:09:32"
        },
        {
          "start": "2023-01-07 12:41:51",
          "stop": "2023-01-07 16:17:08"
        }
      ]
    },
    {
      "date": "2023-01-08",
      "total_working_in_hour": 7.5,
      "working": [
        {
          "start": "2023-01-08 08:05:26",
          "stop": "2023-01-08 08:10:29"
        },
        {
          "start": "2023-01-08 08:17:01",
          "stop": "2023-01-08 10:52:32"
        },
        {
          "start": "2023-01-08 10:57:26",
          "stop": "2023-01-08 11:54:21"
        },
        {
          "start": "2023-01-08 13:08:00",
          "stop": "2023-01-08 17:02:58"
        },
        {
          "start": "2023-01-08 17:14:16",
          "stop": "2023-01-08 17:18:22"
        }
      ]
    },
    {
      "date": "2023-01-09",
      "total_working_in_hour": 8.4,
      "working": [
        {
          "start": "2023-01-09 08:08:02",
          "stop": "2023-01-09 12:10:12"
        },
        {
          "start": "2023-01-09 12:39:27",
          "stop": "2023-01-09 17:01:21"
        }
      ]
    },
    {
      "date": "2023-01-10",
      "total_working_in_hour": 7.8,
      "working": [
        {
          "start": "2023-01-10 08:10:57",
          "stop": "2023-01-10 11:45:56"
        },
        {
          "start": "2023-01-10 12:42:10",
          "stop": "2023-01-10 16:58:57"
        }
      ]
    },
    {
      "date": "2023-01-11",
      "total_working_in_hour": 7.9,
      "working": [
        {
          "start": "2023-01-11 08:16:33",
          "stop": "2023-01-11 11:58:03"
        },
        {
          "start": "2023-01-11 13:08:11",
          "stop": "2023-01-11 15:31:42"
        },
        {
          "start": "2023-01-11 15:31:46",
          "stop": "2023-01-11 17:20:54"
        }
      ]
    },
    {
      "date": "2023-01-12",
      "total_working_in_hour": 8.8,
      "working": [
        {
          "start": "2023-01-12 08:13:39",
          "stop": "2023-01-12 17:04:34"
        }
      ]
    },
    {
      "date": "2023-01-13",
      "total_working_in_hour": 8.0,
      "working": [
        {
          "start": "2023-01-13 08:05:32",
          "stop": "2023-01-13 16:04:14"
        }
      ]
    },
    {
      "date": "2023-01-14",
      "total_working_in_hour": 7.5,
      "working": [
        {
          "start": "2023-01-14 07:42:02",
          "stop": "2023-01-14 07:51:34"
        },
        {
          "start": "2023-01-14 08:44:32",
          "stop": "2023-01-14 09:12:16"
        },
        {
          "start": "2023-01-14 09:12:19",
          "stop": "2023-01-14 09:12:31"
        },
        {
          "start": "2023-01-14 09:12:39",
          "stop": "2023-01-14 12:24:53"
        },
        {
          "start": "2023-01-14 13:04:57",
          "stop": "2023-01-14 16:59:24"
        }
      ]
    },
    {
      "date": "2023-01-15",
      "total_working_in_hour": 8.2,
      "working": [
        {
          "start": "2023-01-15 08:10:50",
          "stop": "2023-01-15 12:04:40"
        },
        {
          "start": "2023-01-15 12:49:42",
          "stop": "2023-01-15 17:14:12"
        },
        {
          "start": "2023-01-15 19:06:53",
          "stop": "2023-01-15 19:10:16"
        }
      ]
    },
    {
      "date": "2023-01-16",
      "total_working_in_hour": 6.4,
      "working": [
        {
          "start": "2023-01-16 06:55:54",
          "stop": "2023-01-16 06:55:54"
        },
        {
          "start": "2023-01-16 06:55:55",
          "stop": "2023-01-16 06:58:34"
        },
        {
          "start": "2023-01-16 09:29:03",
          "stop": "2023-01-16 11:57:34"
        },
        {
          "start": "2023-01-16 12:38:57",
          "stop": "2023-01-16 16:42:48"
        }
      ]
    },
    {
      "date": "2023-01-17",
      "total_working_in_hour": 7.7,
      "working": [
        {
          "start": "2023-01-17 08:49:03",
          "stop": "2023-01-17 12:11:04"
        },
        {
          "start": "2023-01-17 12:38:35",
          "stop": "2023-01-17 17:02:55"
        }
      ]
    },
    {
      "date": "2023-01-18",
      "total_working_in_hour": 8.6,
      "working": [
        {
          "start": "2023-01-18 08:12:56",
          "stop": "2023-01-18 12:06:33"
        },
        {
          "start": "2023-01-18 12:52:34",
          "stop": "2023-01-18 17:42:15"
        },
        {
          "start": "2023-01-18 17:44:30",
          "stop": "2023-01-18 17:45:33"
        }
      ]
    },
    {
      "date": "2023-01-19",
      "total_working_in_hour": 8.0,
      "working": [
        {
          "start": "2023-01-19 07:56:07",
          "stop": "2023-01-19 12:06:07"
        },
        {
          "start": "2023-01-19 13:08:03",
          "stop": "2023-01-19 16:58:40"
        }
      ]
    },
    {
      "date": "2023-01-20",
      "total_working_in_hour": 7.5,
      "working": [
        {
          "start": "2023-01-20 08:48:03",
          "stop": "2023-01-20 12:06:17"
        },
        {
          "start": "2023-01-20 13:00:55",
          "stop": "2023-01-20 17:05:44"
        },
        {
          "start": "2023-01-20 18:13:26",
          "stop": "2023-01-20 18:26:50"
        }
      ]
    },
    {
      "date": "2023-01-21",
      "total_working_in_hour": 7.5,
      "working": [
        {
          "start": "2023-01-21 08:48:03",
          "stop": "2023-01-21 12:06:17"
        },
        {
          "start": "2023-01-21 13:00:55",
          "stop": "2023-01-21 17:05:44"
        },
        {
          "start": "2023-01-21 18:13:26",
          "stop": "2023-01-21 18:26:50"
        }
      ]
    },
    {
      "date": "2023-01-22",
      "total_working_in_hour": 8.0,
      "working": [
        {
          "start": "2023-01-22 07:56:07",
          "stop": "2023-01-22 12:06:07"
        },
        {
          "start": "2023-01-22 13:08:03",
          "stop": "2023-01-22 16:58:40"
        }
      ]
    },
    {
      "date": "2023-01-23",
      "total_working_in_hour": 7.5,
      "working": [
        {
          "start": "2023-01-23 08:18:51",
          "stop": "2023-01-23 12:13:22"
        },
        {
          "start": "2023-01-23 13:12:47",
          "stop": "2023-01-23 16:54:44"
        }
      ]
    },
    {
      "date": "2023-01-24",
      "total_working_in_hour": 7.9,
      "working": [
        {
          "start": "2023-01-24 08:22:33",
          "stop": "2023-01-24 11:49:18"
        },
        {
          "start": "2023-01-24 13:00:34",
          "stop": "2023-01-24 17:34:41"
        }
      ]
    },
    {
      "date": "2023-01-25",
      "total_working_in_hour": 0.0,
      "working": [
        {
          "start": "2023-01-25 08:10:32",
          "stop": "2023-01-25 08:12:18"
        }
      ]
    },
    {
      "date": "2023-01-26",
      "total_working_in_hour": 7.4,
      "working": [
        {
          "start": "2023-01-26 07:30:03",
          "stop": "2023-01-26 07:36:57"
        },
        {
          "start": "2023-01-26 08:03:10",
          "stop": "2023-01-26 08:05:30"
        },
        {
          "start": "2023-01-26 08:47:07",
          "stop": "2023-01-26 12:09:30"
        },
        {
          "start": "2023-01-26 12:59:33",
          "stop": "2023-01-26 17:00:01"
        }
      ]
    },
    {
      "date": "2023-01-27",
      "total_working_in_hour": 7.3,
      "working": [
        {
          "start": "2023-01-27 08:55:02",
          "stop": "2023-01-27 12:28:17"
        },
        {
          "start": "2023-01-27 13:05:57",
          "stop": "2023-01-27 16:54:21"
        }
      ]
    },
    {
      "date": "2023-01-28",
      "total_working_in_hour": 8.0,
      "working": [
        {
          "start": "2023-01-28 07:49:27",
          "stop": "2023-01-28 07:50:41"
        },
        {
          "start": "2023-01-28 08:31:43",
          "stop": "2023-01-28 12:29:15"
        },
        {
          "start": "2023-01-28 13:02:34",
          "stop": "2023-01-28 16:58:40"
        },
        {
          "start": "2023-01-28 17:27:28",
          "stop": "2023-01-28 17:33:05"
        }
      ]
    },
    {
      "date": "2023-01-29",
      "total_working_in_hour": 8.0,
      "working": [
        {
          "start": "2023-01-29 07:49:27",
          "stop": "2023-01-29 07:50:41"
        },
        {
          "start": "2023-01-29 08:31:43",
          "stop": "2023-01-29 12:29:15"
        },
        {
          "start": "2023-01-29 13:02:34",
          "stop": "2023-01-29 16:58:40"
        },
        {
          "start": "2023-01-29 17:27:28",
          "stop": "2023-01-29 17:33:05"
        }
      ]
    },
    {
      "date": "2023-01-30",
      "total_working_in_hour": 8.6,
      "working": [
        {
          "start": "2023-01-30 07:43:20",
          "stop": "2023-01-30 07:45:51"
        },
        {
          "start": "2023-01-30 08:01:24",
          "stop": "2023-01-30 08:06:09"
        },
        {
          "start": "2023-01-30 08:06:22",
          "stop": "2023-01-30 12:02:59"
        },
        {
          "start": "2023-01-30 12:52:50",
          "stop": "2023-01-30 17:26:40"
        },
        {
          "start": "2023-01-30 18:00:12",
          "stop": "2023-01-30 18:08:11"
        }
      ]
    },
    {
      "date": "2023-01-31",
      "total_working_in_hour": 7.8,
      "working": [
        {
          "start": "2023-01-31 08:12:19",
          "stop": "2023-01-31 16:07:57"
        }
      ]
    }
  ]
}

const populationData = [
  {
    arg: 1960,
    val: 3032019978,
  },
  {
    arg: 1970,
    val: 3683676306,
  },
  {
    arg: 1980,
    val: 4434021975,
  },
  {
    arg: 1990,
    val: 5281340078,
  },
  {
    arg: 2000,
    val: 6115108363,
  },
  {
    arg: 2010,
    val: 6922947261,
  },
  {
    arg: 2020,
    val: 7795000000,
  },
];

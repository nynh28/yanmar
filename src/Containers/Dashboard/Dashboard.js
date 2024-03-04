import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Progress } from "reactstrap";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './table.css';
import Spidereco from './Graph/ecospider/spider1'
import Dngraph1 from './Graph/daynightgraph1/dngraph1'
import Safety from './Graph/Safetyspider/spider1'
import "./table.css";
import { LoadScriptNext } from '@react-google-maps/api'
import Map from './Map';
// import Map from './MapOld';
import moment from 'moment'
import Alert from '../../Components/Alert'
import FormDatepickerNew from '../../Components/FormControls/FormDatepickerNew';
import FormSelect from '../../Components/FormControls/Basic/FormSelect'
import { ENDPOINT_BASE_URL, ENDPOINT_SETTING_REPORT_BASE_URL } from '../../Config/app-config';
import { t } from '../../Components/Translation';
import images from './icons/Images'
import { Checkbox, Button as ButtonAntd, Select, Row as RowAntd, Col as ColAntd, Input as InputAntd } from 'antd';
// import FormSelectSearch from '../../Components/FormControls/FormSelectSearch'
import { Border } from 'devextreme-react/polar-chart';
import { useTranslation } from 'react-i18next'

const { get, isEqual, values, isEmpty } = require('lodash')
const { Option } = Select;


export const FormSelectSearch = (arg) => {
  const { t } = useTranslation()
  return (
    <Select
      // allowClear={}
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
        arg.list !== null && arg.list.map((item) => {
          return <Option key={item.key}>{t(item.value)}</Option>
        })
      }
    </Select>

  )
}





export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const nameList = {
  customerDD: "other_reports_7",
  date_Range: "date_Range"

}


let utilizationDayData = []
class dashboardreport extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listCustomer: '',
      customerDD: '',
      tooltipIdle: {
        en: 'Counting when 5 minute onward',
        th: 'นับตั้งแต่ 5 นาทีขึ้นไป',
        ja: 'Counting when 5 minute onward',
      },
      tooltipOverSpeed: {
        en: 'Safety speed at 60 km/h.',
        th: 'ความเร็วปลอดภัยที่ 60 km/h',
        ja: 'Safety speed at 60 km/h.',
      },
      dngraph: null,
      dataSource: [],
      startdatefocus: false,
      enddatefocus: false,
      selectedDevice: null,
      selectedposition: [],
      selectData: false,
      reporttype: 1,
      eventmark: false,
      eventmarks: [],
      infoOpen: false,
      centerDefualt: {
        lat: 13.786377,
        lng: 100.608755
      },
      start_date: '',
      end_date: '',
      zoomDefault: 5,
      truckActive: null,
      arrImg: [],
      arrImgActive: [],
      pathHistory: [],
      clusterEnabled: true,
      objectEnabled: true,
      fitObjectEnabled: false,
      GeofencesEnabled: false,
      markerMap: null,
      infoEnabled: true,
      onDragingStatus: false,
      mapLoad: null,
      infoWindowEnabled: false,
      customer_data: [],
      utilization: [],
      utilizationday: [],
      isLoadingutilization: true,//  โหลดตอนเริ่มหน้า   isLoadingutilization  isLoadingBehavior
      isLoadingBehavior: true, // 
      isLoadingevent: true,
      isReloading: false,
      serieclick: "",
      displayList: {},
      checkVehicles: {},
      event: [],
      fuel_con: 0,
      fuel_used: 0,
      mileage: 0,
      // idle_fuel_used: 0,
      idle_time: 0,
      idle_max: 0,
      idle_fuel_used: '0',
      overspeed_count: 0,
      overspd_max: 0,
      oversped_time: '0',
      dlt_overspeed: 0,
      get_customer_behavior_eco: [],
      get_customer_behavior_safety: [],
      date: "",
      start_date: "",
      end_date: "",
      minute: " min",
      sDate: "",
      eDate: "",
      dateshow: "",
      target: null,
      oilPrice: 0,
      dataOverlayPanel: {
        dlt_4hour: 0,
        dlt_8hour: 0,
        dlt_overspeed: 0,
        dlt_unknown: 0,
        dlt_unplug: 0,
        dlt_wrongtype: 0,

        harsh_start: 0,
        harsh_acc: 0,
        sharp_turn: 0,
        harsh_brake: 0,
        over_60: 0,
        over_80: 0,
        over_100: 0,
        over_120: 0,
      },
      alertSetting: {
        show: true,
        type: 5
      },
      alertSetting3: {
        show: false,
        type: 3,
        content: "",
        ErrorSubcode: 0
      },
      isFirstLoadSummary: false,
      isDayStartOfMonth: false,
      summaryData: {
        chart: {
          eco: [],
          safety: []
        },
        data: []
      }
    }
    this.customer_data()
    this.customer_mode = false
    this.selectDealer = []
    this.selectCustomer = []
    this.prevloadOption = {}
    this.datagrid = React.createRef()
    this.spec_code = React.createRef();
    this.vehicle_name = React.createRef();
    this.start_date = React.createRef()
    this.end_date = React.createRef()
    this.startdateCalendar = React.createRef();
    this.enddateCalendar = React.createRef();
    this.Datepicker = React.createRef();
    this.selectedCallback = this.selectedCallback.bind(this);
    this.setDataSelectByDate = this.setDataSelectByDate.bind(this);
    this.setDataAllDate = this.setDataAllDate.bind(this);
    this.setDataSelected = this.setDataSelected.bind(this);
    this.vehicle_length = 0;
  }

  componentWillMount() {
    const userLevellist = [32]
    const checkUserLevel = userLevellist.includes(this.props.dataLogin.userLevelId)

    if (checkUserLevel) {


      this.setState({

        isLoadingutilization: false,
        isLoadingBehavior: false,
      })

    }


  }

  componentDidMount() {
    const userLevellist = [32]
    const checkUserLevel = userLevellist.includes(this.props.dataLogin.userLevelId)


    this.get_oil_price();

    if (!checkUserLevel) this.loadVehicle();


  }

  componentDidUpdate(prevProps, nextState) {
    if (!isEqual(prevProps.focusPosition, this.props.focusPosition)) {
      let zoom = this.props.zoom ? this.props.zoom : this.map.zoom
      this.setDefualtMap(this.props.focusPosition.lat, this.props.focusPosition.lng, zoom)
      this.props.setZoomMap(undefined)

      if (!this.state.fitObjectEnabled) this.setState({ fitObjectEnabled: true })
    }
    else if (this.props.activeMap && this.map) {
      let lat = this.map.center.lat()
      let lng = this.map.center.lng()
      if (!isEqual({ lat, lng }, this.props.focusPosition)) {
        let zoom = this.props.zoom ? this.props.zoom : this.map.zoom
        this.setDefualtMap(this.props.focusPosition.lat, this.props.focusPosition.lng, zoom)
        this.props.setZoomMap(undefined)
      }
    }

    if (prevProps.activeMap !== this.props.activeMap) {
      this.setState({ fitObjectEnabled: this.props.activeMap })
    }
  }







  async customer_data() {
    if (moment().format('DD/MM/YYYY') == moment().startOf('month').format('DD/MM/YYYY')) {
      var date = moment().subtract(1, 'month').format("YYYY-MM-DD") + " - " + moment().subtract(1, 'day').format('YYYY-MM-DD')
      var sDate = moment().subtract(1, 'month').format("DD/MM/YYYY")
      var eDate = moment().subtract(1, 'day').format('DD/MM/YYYY')
    }
    else {
      var date = moment().startOf('month').format("YYYY-MM-DD") + " - " + moment().subtract(1, 'day').format('YYYY-MM-DD')
      var eDate = moment().subtract(1, 'day').format('DD/MM/YYYY')
    }

    var userId = this.props.dataLogin.userId
    var object = {
      userId: userId
    }
    var api = ENDPOINT_BASE_URL + "fleet/get_manage_customer"
    var response = await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)
    });
    var responseJson = await response.json();

    const dataDD = await responseJson.map(e => ({ key: e.id, value: e.company_name }))


    const userLevellist = [32]
    // customerDD //
    // console.log("dataDD", dataDD[0].key)

    this.setState({
      customerDD: "" + dataDD[0].key,
      listCustomer: dataDD,
      customer_data: responseJson,
      serieclick: date,
      sDate: sDate,
      eDate: eDate,
      start_date: sDate,
      end_date: eDate,
      isFirstLoadSummary: userLevellist.includes(this.props.dataLogin.userLevelId) ? false : true
    }, () => {
      if (moment().format('DD/MM/YYYY') == moment().startOf('month').format('DD/MM/YYYY')) {
        // ถ้าวันนี้เป็นวันแรกของเดือน ให้ดึงข้อมูลทั้งหมดของเดือนที่แล้ว
        this.setInitailDate()

      }
      else {
        this.getSummaryData()
      }
    })
  }


  setAlertSetting(isShow, type, content = "", ErrorSubcode) {
    let { alertSetting3 } = this.state
    alertSetting3.show = isShow
    alertSetting3.type = type
    alertSetting3.content = content
    alertSetting3.ErrorSubcode = ErrorSubcode
    this.setState({ alertSetting3 })
  }

  setInitailDate() {
    let selected_date = "", startDate = "", endDate = ""

    if (moment().format("DD/MM/YYYY") == moment().startOf('month').format("DD/MM/YYYY")) {
      selected_date = moment().subtract(1, 'month').format("DD/MM/YYYY") + " - " + moment().subtract(1, 'day').format('DD/MM/YYYY')
      startDate = moment().subtract(1, 'month').format("DD/MM/YYYY")
      endDate = moment().subtract(1, 'day').format('DD/MM/YYYY')
    }
    else {
      selected_date = moment().startOf('month').format("DD/MM/YYYY") + " - " + moment().subtract(1, 'days').format("DD/MM/YYYY")
      startDate = moment().startOf('month').format("DD/MM/YYYY")
      endDate = moment().subtract(1, 'days').format("DD/MM/YYYY")
    }

    this.setState({
      isDayStartOfMonth: true,
      date: startDate + " to " + endDate,
      start_date: startDate,
      end_date: endDate,
      serieclick: moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD') + " - " + moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      // target: null,
      selectData: false,
    }, () => {
      this.getSummaryData()
    })
  }

  selectedCallback(argument, index, point) {
    if (argument == 'unselect')
      this.setDataAllDate()
    else
      this.setDataSelectByDate(argument, point)
  }

  //#region New Functions By C.THODSAPON
  async getSummaryData() {



    let { isFirstLoadSummary, start_date, end_date, isDayStartOfMonth, customerDD } = this.state
    let accessToken = this.props.dataLogin.userTokenInfo.accessToken
    let redisKey = this.props.dataLogin.redisKey
    let cust_id = 0
    const userLevellist = [32]
    const checkUserLevel = userLevellist.includes(this.props.dataLogin.userLevelId)
    // if (customerDD === '') this.setAlertSetting(true, 4, "other_reports_7")


    if (checkUserLevel) {

      // cust_id = isEmpty(customerDD) ? 0 : customerDD
      cust_id = customerDD

    } else {

      this.state.customer_data.forEach((element) => {
        cust_id = element.int_cust_id
      })


    }




    let url = ""
    if (isFirstLoadSummary && !isDayStartOfMonth) {
      // url = "fleet/dashboard/summary?cust_id=" + cust_id + "&userId=" + this.props.dataLogin.userId
      let _start_date = ""
      let _stop_date = ""
      if (moment().format('DD/MM/YYYY') == moment().startOf('month').format('DD/MM/YYYY')) {
        _start_date = moment().subtract(1, 'month').format("YYYY-MM-DD")
        _stop_date = moment().subtract(1, 'day').format('YYYY-MM-DD')
      }
      else {
        _start_date = moment().startOf('month').format("YYYY-MM-DD")
        _stop_date = moment().subtract(1, 'day').format("YYYY-MM-DD")
      }
      url = "fleet/dashboard/summary?cust_id=" + cust_id + "&start_date=" + _start_date + "&stop_date=" + _stop_date + "&userId=" + this.props.dataLogin.userId
    }
    else {
      let _start_date = moment(start_date, 'DD/MM/YYYY').format('YYYY-MM-DD')
      let _stop_date = moment(end_date, 'DD/MM/YYYY').format('YYYY-MM-DD')
      url = "fleet/dashboard/summary?cust_id=" + cust_id + "&start_date=" + _start_date + "&stop_date=" + _stop_date + "&userId=" + this.props.dataLogin.userId
    }

    let response = await fetch(ENDPOINT_BASE_URL + url, {
      method: 'GET',
      headers: {
        'Authorization': accessToken,
        'X-API-Key': redisKey
      }
    });
    let responseJson = await response.json();
    if (responseJson.code == 200) {
      // Set data spider charts
      // console.log('responseJson', responseJson)
      let _summaryData = JSON.parse(JSON.stringify(this.state.summaryData));
      _summaryData.chart.eco = get(responseJson, "chart.eco", [])
      _summaryData.chart.safety = get(responseJson, "chart.safety", [])
      _summaryData.data = get(responseJson, "result", []) ? get(responseJson, "result", []) : []

      this.setState({
        utilization: responseJson,
        summaryData: _summaryData,
        get_customer_behavior_eco: get(responseJson, "chart.eco", []),
        get_customer_behavior_safety: get(responseJson, "chart.safety", []),
        isLoadingBehavior: false
      }, () => {
        this.setSummaryOfDays()
      })
    }
    else {
      this.setState({
        isLoadingBehavior: false
      })
    }
  }

  setDataSelectByDate(argument, point) {
    let _summaryData = this.state.summaryData.data
    let data = _summaryData.find(x => x.datetime === argument);
    utilizationDayData = data

    //#region set summary data
    var idle_time_cal = (data.idle_time / 60).toFixed(2)
    var idle_max = (data.idle_max / 60).toFixed(2)
    var oversped_time = data.oversped_time + '/'
    if (data.oversped_time > 60) {
      oversped_time = (data.oversped_time / 60).toFixed(2)
      var oversped_time_h = oversped_time.split('.')[0]
      var oversped_time_m = oversped_time.split('.')[1]
      if (oversped_time_m != "00") {
        oversped_time_m = (60 * (oversped_time_m / 100)).toFixed(0)
      }
      oversped_time = oversped_time_h + "/" + oversped_time_m + "/"
    }
    var idle_max_h = idle_max.split('.')[0]
    var idle_max_m = idle_max.split('.')[1]
    var idle_time_cal_h = idle_time_cal.split('.')[0]
    var idle_time_cal_m = idle_time_cal.split('.')[1]
    if (idle_time_cal_m != "00" || idle_max_m) {
      idle_time_cal_m = (60 * (idle_time_cal_m / 100)).toFixed(0)
      idle_max_m = (60 * (idle_max_m / 100)).toFixed(0)
    }
    var idle_time_cal_h_m = numberWithCommas(idle_time_cal_h) + " h " + idle_time_cal_m + " min"
    var idle_max_h_m = idle_max_h + " h " + idle_max_m + " min"
    var fuel_con = 0
    if (data.mileage == 0 || data.fuel_used == 0) {
      fuel_con = 0
    }
    else {
      fuel_con = (data.mileage / data.fuel_used).toFixed(2)
    }
    var dlt_4hour = 0
    var dlt_8hour = 0
    var dlt_overspeed = 0
    var dlt_unknown = 0
    var dlt_unplug = 0
    var dlt_wrongtype = 0
    var harsh_start = 0
    var harsh_acc = 0
    var sharp_turn = 0
    var harsh_brake = 0
    var over_60 = 0
    var over_80 = 0
    var over_100 = 0
    var over_120 = 0

    dlt_4hour = data.dlt_4hour
    dlt_8hour = data.dlt_8hour
    dlt_overspeed = data.dlt_overspeed
    dlt_unknown = data.dlt_unknown
    dlt_unplug = data.dlt_unplug
    dlt_wrongtype = data.dlt_wrongtype
    harsh_start = data.harsh_start
    harsh_acc = data.harsh_acc
    sharp_turn = data.sharp_turn
    harsh_brake = data.harsh_brake
    over_60 = data.over_60
    over_80 = data.over_80
    over_100 = data.over_100
    over_120 = data.over_120

    var dataOverlayPanel = {
      dlt_4hour: dlt_4hour,
      dlt_8hour: dlt_8hour,
      dlt_overspeed: dlt_overspeed,
      dlt_unknown: dlt_unknown,
      dlt_unplug: dlt_unplug,
      dlt_wrongtype: dlt_wrongtype,
      harsh_start: harsh_start,
      harsh_acc: harsh_acc,
      sharp_turn: sharp_turn,
      harsh_brake: harsh_brake,
      over_60: over_60,
      over_80: over_80,
      over_100: over_100,
      over_120: over_120,
    }
    //#endregion

    this.setState({
      serieclick: argument + " - " + argument,
      isReloading: true,
      target: point,
      selectData: true,
      date: argument.split('-')[2] + '/' + argument.split('-')[1] + '/' + argument.split('-')[0],
      fuel_used: numberWithCommas((data.fuel_used).toFixed(1)),
      mileage: numberWithCommas(data.mileage),
      idle_time: idle_time_cal_h_m,
      idle_time_h: numberWithCommas(idle_time_cal_h),
      idle_time_m: numberWithCommas(idle_time_cal_m),
      idle_max: idle_max_h_m,
      idle_fuel_used: numberWithCommas((data.idle_fuel_used / 1000).toFixed(1)),
      overspeed_count: data.oversped_count,
      overspd_max: data.overspd_max,
      oversped_time: oversped_time,
      isLoadingutilization: false,
      fuel_con: fuel_con,
      dataOverlayPanel: dataOverlayPanel,
      get_customer_behavior_eco: get(data, "eco", []),
      get_customer_behavior_safety: get(data, "safety", [])
    })
    setTimeout(this.setDataSelected, 50);
  }

  setDataSelected() {
    this.setState({
      utilizationday: utilizationDayData
    })
  }

  setDataAllDate() {
    let { start_date, end_date, summaryData } = this.state
    var start_date_d = start_date.split('/')[0]
    var start_date_m = start_date.split('/')[1]
    var start_date_y = start_date.split('/')[2]
    var start_date_dmy = start_date_y + '-' + start_date_m + '-' + start_date_d
    var end_date_d = end_date.split('/')[0]
    var end_date_m = end_date.split('/')[1]
    var end_date_y = end_date.split('/')[2]
    var end_date_dmy = end_date_y + '-' + end_date_m + '-' + end_date_d

    this.setState({
      serieclick: start_date_dmy + " - " + end_date_dmy,
      target: null,
      selectData: false,
      date: start_date + " " + t('summary_74') + " " + end_date,
      get_customer_behavior_eco: get(summaryData, "chart.eco", []),
      get_customer_behavior_safety: get(summaryData, "chart.safety", [])
    })

    this.setSummaryOfDays()
  }

  async setSummaryOfDays() {
    let { summaryData, isFirstLoadSummary } = this.state
    let dt = this.state.summaryData.data

    var start_date = !isFirstLoadSummary ? this.state.start_date : ""
    var end_date = !isFirstLoadSummary ? this.state.end_date : ""
    var end_date_d = end_date.split('/')[0]
    var end_date_m = end_date.split('/')[1]
    var end_date_y = end_date.split('/')[2]
    var end_date_dmy = end_date_y + '-' + end_date_m + '-' + end_date_d

    var idle_time_cal = 0
    var idle_max = 0
    var oversped_time = 0
    var mileage = 0
    var fuel_used = 0
    var idle_fuel_used = 0
    var oversped_count = 0
    var overspd_max = 0

    var dlt_4hour = 0
    var dlt_8hour = 0
    var dlt_overspeed = 0
    var dlt_unknown = 0
    var dlt_unplug = 0
    var dlt_wrongtype = 0

    var harsh_start = 0
    var harsh_acc = 0
    var sharp_turn = 0
    var harsh_brake = 0
    var over_60 = 0
    var over_80 = 0
    var over_100 = 0
    var over_120 = 0

    if (isFirstLoadSummary && dt.length > 0) {
      start_date = dt[0].datetime
      end_date = dt[(dt.length - 1)].datetime
    }

    for (let index in dt) {
      idle_time_cal = idle_time_cal + parseFloat(dt[index].idle_time)
      idle_max = idle_max + parseFloat(dt[index].idle_max)
      oversped_time = oversped_time + parseFloat(dt[index].oversped_time)
      mileage = mileage + parseFloat(dt[index].mileage)
      fuel_used = fuel_used + parseFloat(dt[index].fuel_used)
      idle_fuel_used = idle_fuel_used + parseFloat(dt[index].idle_fuel_used)
      dlt_4hour += dt[index].dlt_4hour
      dlt_8hour += dt[index].dlt_8hour
      dlt_overspeed += dt[index].dlt_overspeed
      dlt_unknown += dt[index].dlt_unknown
      dlt_unplug += dt[index].dlt_unplug
      dlt_wrongtype += dt[index].dlt_wrongtype
      harsh_start += dt[index].harsh_start
      harsh_acc += dt[index].harsh_acc
      sharp_turn += dt[index].sharp_turn
      harsh_brake += dt[index].harsh_brake
      over_60 += dt[index].over_60
      over_80 += dt[index].over_80
      over_100 += dt[index].over_100
      over_120 += dt[index].over_120
      if (dt[index].overspd_max > overspd_max) overspd_max = dt[index].overspd_max
    }
    // console.log("idle_time_cal >>> ", idle_time_cal)
    // console.log("==== ", this.sec2time(idle_time_cal))
    // console.log(">>>> ", idle_time_cal * 60)

    // console.log("oversped_time >>> ", oversped_time)
    // console.log("==== ", this.sec2time(oversped_time))
    // console.log(">>>> ", oversped_time * 60)

    // console.log("sec2time idle_time_cal >>> ", this.sec2time(idle_time_cal))
    // console.log("sec2time  oversped_time >>> ", this.sec2time(oversped_time))

    idle_time_cal = (idle_time_cal / 60).toFixed(2)
    idle_max = ((idle_max / dt.length) / 60).toFixed(2)
    oversped_time = oversped_time
    mileage = mileage
    fuel_used = fuel_used
    idle_fuel_used = idle_fuel_used

    // console.log("idle_time_cal 2: ", idle_time_cal)


    if (dt.length > 0) {
      oversped_count = (dt[0].overspeed_vehicle_group).toFixed(0)
    }

    if (oversped_time > 60) {
      oversped_time = (oversped_time / 60).toFixed(2)

      // console.log("oversped_time 2: ", oversped_time)

      var oversped_time_h = oversped_time.split('.')[0]
      var oversped_time_m = oversped_time.split('.')[1]
      if (oversped_time_m != "00") {
        oversped_time_m = (60 * (oversped_time_m / 100)).toFixed(0)
      }
      oversped_time = oversped_time_h + "/" + oversped_time_m + "/"
    }
    else {
      oversped_time = oversped_time.toFixed(0) + '/'
    }

    // console.log("oversped_time 2: ", oversped_time)

    var idle_max_h = idle_max.split('.')[0]
    var idle_max_m = idle_max.split('.')[1]
    var idle_time_cal_h = idle_time_cal.split('.')[0]
    var idle_time_cal_m = idle_time_cal.split('.')[1]

    if (idle_time_cal_m != "00" || idle_max_m) {
      idle_time_cal_m = (60 * (idle_time_cal_m / 100)).toFixed(0)
      idle_max_m = (60 * (idle_max_m / 100)).toFixed(0)
    }

    var idle_time_cal_h_m = numberWithCommas(idle_time_cal_h) + " h " + idle_time_cal_m + " min"
    var idle_max_h_m = idle_max_h + " h " + idle_max_m + " min"
    var fuel_con = 0

    if (mileage == 0 || fuel_used == 0) {
      fuel_con = 0
    }
    else {
      fuel_con = (mileage / fuel_used).toFixed(2)
    }

    var end_date_y = end_date.split('/')[2]
    var end_date_m = end_date.split('/')[1]
    var end_date_d = end_date.split('/')[0]
    var end_date_dmy = end_date_d + '/' + end_date_m + '/' + end_date_y

    var dataOverlayPanel = {
      dlt_4hour: dlt_4hour,
      dlt_8hour: dlt_8hour,
      dlt_overspeed: dlt_overspeed,
      dlt_unknown: dlt_unknown,
      dlt_unplug: dlt_unplug,
      dlt_wrongtype: dlt_wrongtype,
      harsh_start: harsh_start,
      harsh_acc: harsh_acc,
      sharp_turn: sharp_turn,
      harsh_brake: harsh_brake,
      over_60: over_60,
      over_80: over_80,
      over_100: over_100,
      over_120: over_120,
    }

    this.setState({
      fuel_used: numberWithCommas((fuel_used).toFixed(1)),
      mileage: numberWithCommas(mileage.toFixed(1)),
      idle_time_h: numberWithCommas(idle_time_cal_h),
      idle_time_m: numberWithCommas(idle_time_cal_m),
      idle_time: idle_time_cal_h_m,
      idle_max: idle_max_h_m,
      idle_fuel_used: numberWithCommas((idle_fuel_used / 1000).toFixed(1)),
      overspeed_count: oversped_count,
      overspd_max: overspd_max,
      oversped_time: oversped_time,
      isLoadingutilization: false,
      fuel_con: fuel_con,
      dataOverlayPanel: dataOverlayPanel,
      start_date: start_date,
      end_date: moment().endOf('month').format("DD/MM/YYYY") == end_date_dmy ? moment().subtract(1, 'days').format("DD/MM/YYYY") : end_date_dmy
    })
    utilizationDayData = []
    setTimeout(this.setDataSelected, 50);
  }


  sec2time(timeInSeconds) {
    var pad = function (num, size) { return ('000' + num).slice(size * -1); },
      time = parseFloat(timeInSeconds).toFixed(3),
      hours = Math.floor(time / 60 / 60),
      minutes = Math.floor(time / 60) % 60,
      seconds = Math.floor(time - minutes * 60),
      milliseconds = time.slice(-3);

    return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2) + ',' + pad(milliseconds, 3);
  }

  // sec2time(seconds) {
  //   // let f = Math.floor
  //   // g = (n) => ('00' + n).slice(-2);
  //   // return f(s / 3600) + ':' + g(f(s / 60) % 60) + ':' + g(s % 60)

  //   return new Date(seconds * 1000).toISOString().substr(11, 8)
  // }

  //#endregion

  async loadVehicle() {
    const userLevellist = [32]
    const checkUserLevel = userLevellist.includes(this.props.dataLogin.userLevelId)
    var userId = this.props.dataLogin.userId
    var api = ENDPOINT_BASE_URL + "fleet/getallvehicle"
    var object = {
      userId: userId
    }
    var response = await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)

    });
    var responseJson = await response.json();
    this.vehicle_length = responseJson.length

    this.setState({
      vehicle: responseJson.vehicle
    })


  }

  async get_oil_price() {
    var userId = this.props.dataLogin.userId
    var object = {
      userId: userId
    }
    var api = ENDPOINT_BASE_URL + 'fleet/master/oilcurrent'
    var response = await fetch(api, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    var responseJson = await response.json();
    this.setState({
      oilPrice: responseJson['Diesel B10'].price
    })
  }

  onApplyEvent = (dataObject) => {

    const userLevellist = [32]
    const checkUserLevel = userLevellist.includes(this.props.dataLogin.userLevelId)
    let { isFirstLoadSummary, isDayStartOfMonth, customerDD } = this.state


    var start_date_d = dataObject.startDate.format('YYYY-MM-DD').split('-')[2]
    var start_date_m = dataObject.startDate.format('YYYY-MM-DD').split('-')[1]
    var start_date_y = dataObject.startDate.format('YYYY-MM-DD').split('-')[0]
    var start_date_dmy = start_date_d + '/' + start_date_m + '/' + start_date_y
    var end_date_d = dataObject.endDate.format('YYYY-MM-DD').split('-')[2]
    var end_date_m = dataObject.endDate.format('YYYY-MM-DD').split('-')[1]
    var end_date_y = dataObject.endDate.format('YYYY-MM-DD').split('-')[0]
    var end_date_dmy = end_date_d + '/' + end_date_m + '/' + end_date_y

    this.setState({
      date: start_date_dmy + " to " + end_date_dmy,
      start_date: start_date_dmy,
      end_date: end_date_dmy,
      serieclick: moment(dataObject.startDate).format('YYYY-MM-DD') + " - " + moment(dataObject.endDate).format('YYYY-MM-DD'),
      target: null,
      selectData: false,
    }, () => {
      // if (!isFirstLoadSummary || isDayStartOfMonth) {
      //   this.getSummaryData()
      //   isDayStartOfMonth && this.setState({ isDayStartOfMonth: false })
      // }
      if (!isFirstLoadSummary) {

        this.getSummaryData()

      }
      else
        this.setState({ isFirstLoadSummary: false })
    })
  }

  render() {
    let { alertSetting, isLoadingBehavior, isLoadingutilization, customerDD, listCustomer, alertSetting3, vehicle } = this.state
    const userLevellist = [32]
    const checkUserLevel = userLevellist.includes(this.props.dataLogin.userLevelId)

    console.log("checkUserLevel : ", checkUserLevel)


    if (isLoadingBehavior || isLoadingutilization) {
      return (
        <Alert
          setting={alertSetting}
          onConfirm={() => { }}
          onCancel={() => {
            alertSetting.show = false
            this.setState({ alertSetting })
          }}
        />
      )
    }
    else {
      return (
        <Suspense fallback={null}>
          <Alert
            setting={alertSetting3}
            onConfirm={() => {
              if (alertSetting3.type === 4) {
                alertSetting3.show = false
              }
              else if (alertSetting3.type === 3) {
                alertSetting3.show = false
                this.submitComfirm()
              }
              else {
                alertSetting3.show = false
                // alertSetting3.type = 2
                // alertSetting3.content = action + " User Failed"
              }
              this.setState({ alertSetting3 })
            }}
            onCancel={() => {
              alertSetting3.show = false
              this.setState({ alertSetting3 })
            }}
          />

          <div>

            <Row className='layout-padding-three'>
              <div className="col-md-12" >
                <div className="ibox float-e-margins" style={{ marginBottom: 6 }}>
                  <div className="ibox-title" >
                    {
                      checkUserLevel ?

                        <Row style={{ margin: '-10px 0px -13px 0px' }} >
                          <div className="pull-left" >
                            <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'flex-start', marginTop: 8 }}>
                              <label style={{ fontWeight: "bold", fontSize: 18 }}>{t('summary_71')} {" "} {this.state.selectData == false && this.state.start_date} {this.state.selectData == false && t('summary_74')} {this.state.selectData == false ? " " + this.state.end_date : this.state.date} </label>
                            </div>
                          </div>

                          <div className="pull-right">
                            <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-between', marginTop: 8 }}>
                              <div className="form-group field field-string" style={{ padding: '0 3px' }}>
                                <label style={{ fontWeight: "bold", fontSize: 18 }}> {t('Select_Company')}</label>
                              </div>

                              <div className="form-group field field-string" style={{ padding: '0 3px' }}>
                                <FormSelectSearch
                                  mode={"single"}
                                  schema={{ "required": ["customerDD"] }}
                                  value={customerDD}
                                  label={"other_reports_7"}
                                  list={listCustomer || []}
                                  fieldForm={"customerDD"}
                                  placeholder={"other_reports_7"}
                                  flex={1}
                                  onChange={(selected) => {

                                    this.setState({
                                      customerDD: selected,

                                    })
                                  }}
                                />
                              </div>

                              <div className="form-group field field-string" style={{ padding: '0 3px' }}>
                                <label style={{ fontWeight: "bold", fontSize: 18 }}> {t('summary_72')}</label>
                              </div>

                              <div className="form-group field field-string" style={{ padding: '0 3px' }}>
                                <FormDatepickerNew
                                  style={{}}
                                  select_change={(dataObject) => this.onApplyEvent(dataObject)}
                                  language={this.props.language}
                                  maxDate={this.state.eDate}>
                                </FormDatepickerNew>
                              </div>

                              <div className="form-group field field-string" style={{ padding: '0 3px' }}>
                                <ButtonAntd
                                  icon={<i class="fa fa-refresh" aria-hidden="true" style={{ paddingRight: 5 }}></i>}
                                  // style={{ marginLeft: 10 }}
                                  onClick={() => this.getSummaryData()}>{t('control_room_17')}</ButtonAntd>
                              </div>

                            </div>
                          </div>
                        </Row>

                        :
                        <Row>
                          <Col lg={5}>
                            <label style={{ fontWeight: "bold", fontSize: 18 }}>{t('summary_71')} {" "} {this.state.selectData == false && this.state.start_date} {this.state.selectData == false && t('summary_74')} {this.state.selectData == false ? " " + this.state.end_date : this.state.date} </label>
                          </Col>
                          <Col lg={3} style={{ textAlign: "right" }}>
                            <label style={{ fontWeight: "bold", fontSize: 18, }}> {t('summary_72')}</label>
                          </Col>
                          <Col lg={4}>
                            <FormDatepickerNew
                              select_change={(dataObject) => this.onApplyEvent(dataObject)}
                              language={this.props.language}
                              maxDate={this.state.eDate}>
                            </FormDatepickerNew>
                          </Col>
                        </Row>
                    }

                  </div>
                </div>
              </div>
            </Row>

            {/* <Row> */}
            <Row className='layout-padding-three'>
              {/* Vehicle Utilization */}
              {/* <div className="col-md-5" style={{ paddingRight: 0, marginBottom: -5, marginTop: -15 }}> */}
              <div className="col-md-5" >
                <div className="ibox float-e-margins" style={{ marginBottom: 6 }}>
                  <div className="ibox-title" >
                    <Row style={{ paddingRight: 0, paddingLeft: 5 }}>
                      <Col lg={12}>
                        <div style={{ fontWeight: "bold" }}>
                          <i className="fa fa-location-arrow" aria-hidden="true" style={{ marginRight: 10 }}></i>
                          <label style={{ fontWeight: "bold", fontSize: 18 }}> {t("summary_1")} {' (' + this.props.menuUser.vehicleCount + ' '} {t("summary_41")}{') '}</label>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="ibox-content" style={{ height: 370 }}>
                    <Row >
                      <div className="col-md-12 "  >
                        <Dngraph1 onLoadChart={(e) => this.state.dngraph == null && this.setState({ dngraph: e })} ref={this.state.dngraph} target={this.state.target} chartHeight={350} chartWeight={300} data={this.state.utilization} selectData={this.state.selectData} selectedCallback={this.selectedCallback}></Dngraph1>
                      </div>
                    </Row>
                  </div>
                </div>
              </div>

              <div className="col-md-7" >
                {/* <div className="col-md-7" style={{ paddingLeft: 5, marginBottom: -5, marginTop: -15 }}> */}
                <Row className='layout-padding-three'>
                  {/* Safety Driving Summary */}
                  <Col md={6} >
                    {/* <Col md={6} style={{ paddingRight: 5 }}> */}
                    <div className="ibox float-e-margins" style={{ marginBottom: 6 }}>
                      <div className="ibox-title">
                        <div style={{ fontWeight: "bold", textAlign: 'center', }}>
                          {/* <i className="fas fa-user-plus" aria-hidden="true" style={{ marginRight: 10 }}></i> */}
                          <img alt="image" src={images.seatBelt} style={{ width: 15, height: 17, margin: '0px 10px 5px 0px' }} />
                          <label style={{ fontWeight: "bold", fontSize: 18 }}>{t("summary_12")}</label>
                        </div>
                      </div>
                      <div className="ibox-content">
                        <Safety chartHeight={334} chartWeight={470} data={this.state.get_customer_behavior_safety}></Safety>
                      </div>
                    </div>
                  </Col>
                  {/* ECO Driving Summary */}
                  <Col md={6}>
                    {/* <Col md={6} style={{ paddingLeft: 0 }}> */}
                    <div className="ibox float-e-margins" style={{ marginBottom: 6 }}>
                      <div className="ibox-title">
                        <div style={{ fontWeight: "bold", textAlign: 'center', }}>
                          <i className="fab fa-envira" aria-hidden="true" style={{ marginRight: 10 }}></i>
                          <label style={{ fontWeight: "bold", fontSize: 18 }}>{t("summary_21")}</label>

                        </div>
                      </div>
                      <div className="ibox-content">
                        <Spidereco chartHeight={334} chartWeight={470} data={this.state.get_customer_behavior_eco}></Spidereco>
                      </div>
                    </div>
                  </Col>
                </Row>

              </div>
            </Row>

            <Row className='layout-padding-three'>
              <Col lg={4} md={12} >
                {/* Fuel Consumption */}
                <div className="ibox float-e-margins" style={{ marginBottom: 6 }}>
                  <div className="ibox-title" >

                    <Row >
                      <Col md={12} style={{ fontWeight: "bold", fontSize: 18 }} >
                        <i className="fas fa-gas-pump" aria-hidden="true" style={{ marginRight: 10 }}></i>
                        <font>{t("summary_30")}</font>
                      </Col>
                      <Col md={12} align="right" style={{ fontWeight: "bold", fontSize: 18 }} >
                        {this.state.fuel_con}
                        <font> {t("summary_31")}</font>
                      </Col>
                    </Row>
                  </div>
                  <div className="ibox-content "  >
                    <Row>
                      <Col md={7} style={{ fontSize: 16 }}>
                        <font>{t("summary_32")} </font>
                      </Col>
                      <Col md={5} align="right" style={{ fontSize: 16 }}>
                        {this.state.mileage}
                        <font> {t("summary_33")}</font>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={7} style={{ fontSize: 16 }}>
                        <font>{t("summary_34")}</font>
                      </Col>
                      <Col md={5} align="right" style={{ fontSize: 16 }}>
                        {this.state.fuel_used}
                        <font> {t("summary_35")}</font>
                      </Col>
                    </Row>

                  </div>
                </div>
              </Col>

              <Col lg={4} md={12}>
                {/* Idling Time */}
                <div className="ibox float-e-margins" style={{ marginBottom: 6 }}>
                  <div className="ibox-title" title={this.state.tooltipIdle[this.props.language + '']}>
                    {/* <Row title="นับตั้งแต่ 5 นาที ขึ้นไป"> */}
                    <Row>
                      <Col md={12} style={{ fontWeight: "bold", fontSize: 18 }} >
                        <i className="fas fa-ban" aria-hidden="true" style={{ marginRight: 10 }}></i>
                        <font>{t("summary_36")}</font>
                      </Col>
                      <Col md={12} align="right" style={{ fontWeight: "bold", fontSize: 18 }} >
                        {this.state.idle_time_h}
                        <font> {t("summary_37")}</font>
                        {" " + get(this.state, "idle_time_m", 0)}
                        <font> {t("summary_38")}</font>
                      </Col>
                    </Row>
                  </div>
                  <div className="ibox-content">
                    <Row>
                      <Col md={7} style={{ fontSize: 16 }}>
                        <font>{t("summary_78")}</font>
                      </Col>
                      <Col md={5} align="right" style={{ fontSize: 16 }}>
                        {/* {this.state.idle_max} */}
                        {this.state.idle_fuel_used}
                        <font> {t("summary_35")}</font>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={7} style={{ fontSize: 16 }}>
                        <font>{t("summary_76")}</font>
                      </Col>
                      <Col md={5} align="right" style={{ fontSize: 16 }}>
                        {numberWithCommas((Number(this.state.idle_fuel_used.replace(",", "")) * this.state.oilPrice).toFixed(0))}
                        <font> {t("summary_77")}</font>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>

              <Col lg={4} md={12}>
                {/* Over Speed */}
                <div className="ibox float-e-margins" style={{ marginBottom: 6 }}>
                  <div className="ibox-title" title={this.state.tooltipOverSpeed[this.props.language + '']}>
                    <Row>
                      <Col md={12} style={{ fontWeight: "bold", fontSize: 18 }} >
                        <i className="fas fa-tachometer-alt" aria-hidden="true" style={{ marginRight: 10 }}></i>
                        <font>{t("summary_40")}</font>
                      </Col>
                      <Col md={12} align="right" style={{ fontWeight: "bold", fontSize: 18 }} >
                        {this.state.overspeed_count}<font> {t("summary_41")}</font>
                      </Col>
                    </Row>
                  </div>
                  <div className="ibox-content">

                    <Row>
                      <Col md={7} style={{ fontSize: 16 }}>
                        <font>{t("summary_42")} </font>
                      </Col>
                      <Col md={5} align="right" style={{ fontSize: 16 }}>
                        {this.state.oversped_time.split('/').length > 2 && this.state.oversped_time.split('/')[0] + " "}
                        {this.state.oversped_time.split('/').length > 2 && t("summary_37")}
                        {this.state.oversped_time.split('/').length > 2 && " " + this.state.oversped_time.split('/')[1] + " "}
                        {this.state.oversped_time.split('/').length > 2 && t("summary_38")}
                        {this.state.oversped_time.split('/').length < 3 && this.state.oversped_time.split('/')[0] + " "}
                        {this.state.oversped_time.split('/').length < 3 && t("summary_38")}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={7} style={{ fontSize: 16 }}>
                        <font>{t("summary_43")}</font>
                      </Col>
                      <Col md={5} align="right" style={{ fontSize: 16 }}>
                        {this.state.overspd_max + " "}<font>{t("summary_44")}</font>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className='layout-padding-three'>
              <div className="col-md-12" >
                <div className="ibox float-e-margins" style={{ marginBottom: 6 }}>
                  <div className="ibox-title" >
                    <Row>
                      <Col lg={8}>
                        <label style={{ fontWeight: "bold", fontSize: 18 }}> {t('summary_73')}</label>
                      </Col>
                      <Col lg={4}></Col>
                    </Row>
                  </div>
                </div>
              </div>
            </Row>

            <Row>
              <Col lg={12} style={{ paddingLeft: 15, marginBottom: -5 }}>
                <div style={{ position: 'relative', width: '100%', height: "calc(98vh)", }}>
                  <Map dashboardHidden={true} event={this.state.event} customer_data={this.state.customer_data} utilizationday={this.state.utilizationday} dataOverlayPanel={this.state.dataOverlayPanel} date={this.state.serieclick} start_date={this.start_date} end_date={this.state.end_date} />
                </div>
              </Col>
            </Row>
          </div>
        </Suspense>);
    }
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.versatile.language,
    menuUser: state.signin.menuUser,
    dataLogin: state.signin.dataLogin,
  }
}

export default (connect(mapStateToProps)(dashboardreport))
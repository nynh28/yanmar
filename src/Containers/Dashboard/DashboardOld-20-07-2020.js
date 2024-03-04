import React from "react";
import { connect } from 'react-redux'
import { Animation, Chart, Series, Legend, ValueAxis, Title, Pane, Grid, Tooltip, Crosshair, ConstantLine, Label, VisualRange, Size, Point, ScrollBar, ZoomAndPan, Height, } from 'devextreme-react/chart';
import { Row, Col, Progress } from "reactstrap";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './table.css';
import Spidereco from './Graph/ecospider/spider1'
import Dngraph1 from './Graph/daynightgraph1/dngraph1'
import Safety from './Graph/Safetyspider/spider1'
import { Center } from "devextreme-react/map";
import "./table.css";
import { GoogleMap, LoadScriptNext, StreetViewService, StreetViewPanorama } from '@react-google-maps/api'
import Map from './Map';
import Tail from '../Realtime/Objects/Tail'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment'
import Alert from '../../Components/Alert'
import FormDatePicker_DB from '../../Components/FormControls/FormDatepickerDB';
import FormDatepickerNew from '../../Components/FormControls/FormDatepickerNew';
import { ENDPOINT_BASE_URL, ENDPOINT_SETTING_REPORT_BASE_URL, ENDPOINT_FLASK_BASE_URL, ENDPOINT_INSTALL_BASE_URL, ENDPOINT_SETTING_BASE_URL } from '../../Config/app-config';
import { t } from '../../Components/Translation';
import InfoWindows from './Objects/InfoWindows'
import { useTranslation } from 'react-i18next'
import images from './icons/Images'
// import $ from "jquery";
const { get, isEqual } = require('lodash')

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}
function handleErrors(response) {
  if (!response.ok)
    throw Error(response.statusText);
  return response;
}

class dashboardreport extends React.Component {
  constructor(props) {
    super(props)
    this.t = t
    this.state = {
      tooltipIdle: {
        en: 'Counting when 5 minute onward',
        th: 'นับตั้งแต่ 5 นาทีขึ้นไป',
        ja: 'Counting when 5 minute onward',
      },
      tooltipOverSpeed: {
        // en: 'Department of Land Transport Regulation Criteria.',
        // th: 'ความเร็วตามกรมขนส่ง',
        // ja: 'Department of Land Transport Regulation Criteria.',
        en: 'Safty speed at 60 km/h.',
        th: 'แก้เป็น ความเร็วปลอดภัยที่ 60 km/h',
        ja: 'Safty speed at 60 km/h.',
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
      isLoadingutilization: true,
      isLoadingBehavior: true,
      isLoadingevent: true,
      isReloading: false,
      serieclick: "",
      displayList: {},
      checkVehicles: {},
      event: [],
      fuel_con: 0,
      fuel_used: 0,
      mileage: 0,
      idle_fuel_used: 0,
      idle_time: 0,
      idle_max: 0,
      idle_fuel_used: 0,
      overspeed_count: 0,
      overspd_max: 0,
      oversped_time: 0,
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
      }


    }
    this.customer_data()
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
    this.handleDateStartChange = this.handleDateStartChange.bind(this);

  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  tabs_enable(tabs, condition) {
    switch (tabs) {
      case 'device_performance_histroy':
        this.setState({
          device_performance_histroy: (condition == true) ? false : true
        }, () => {
          // console.log(this.state.device_performance_histroy);
        });
        break;
      case 'dlt_standard':
        this.setState({
          dlt_standard: (condition == true) ? false : true
        });
        break;
      case 'dlt_standard_criteria':
        this.setState({
          dlt_standard_criteria: (condition == true) ? false : true
        });
        break;
    }
  }




  selectedCallback(argument, index, point) {

    if (argument == 'unselect') {
      var start_date_d = this.state.start_date.split('/')[0]
      var start_date_m = this.state.start_date.split('/')[1]
      var start_date_y = this.state.start_date.split('/')[2]
      var start_date_dmy = start_date_y + '-' + start_date_m + '-' + start_date_d
      var end_date_d = this.state.end_date.split('/')[0]
      var end_date_m = this.state.end_date.split('/')[1]
      var end_date_y = this.state.end_date.split('/')[2]
      var end_date_dmy = end_date_y + '-' + end_date_m + '-' + end_date_d
      // this.state.target.select()
      this.setState({
        dateshow1: "",
        // serieclick: "",
        serieclick: start_date_dmy + " - " + end_date_dmy,
        target: null,
        selectData: false,
        date: this.state.start_date + " " + t('summary_74') + " " + this.state.end_date
      })
      this.loadUtilizationRange()
      this.get_customer_behavior_range()
    }
    else {
      this.setState({
        // serieclick: argument,
        serieclick: argument + " - " + argument,
        isReloading: true,
        target: point,
        selectData: true,
        date: argument.split('-')[2] + '/' + argument.split('-')[1] + '/' + argument.split('-')[0]
        // date: '(' + e.split('-')[2] + '/' + e.split('-')[1] + '/' + e.split('-')[0] + ')'
      }, () => {
        // this.loadevent()
        this.loadUtilizationday()
        this.get_customer_behavior()
        this.condate()
      })
    }
  }

  async get_oil_price() {

    var userId = this.props.dataLogin.userId
    var object = {
      userId: userId
    }
    // var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/get_manage_customer"
    var api = ENDPOINT_BASE_URL + 'fleet/master/oilcurrent'
    var response = await fetch(api, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(object)
    });
    var responseJson = await response.json();
    console.log(responseJson)
    this.setState({
      oilPrice: responseJson['Diesel B10'].price
    })
  }

  // async get_oil_price() {
  //   let api = ENDPOINT_BASE_URL + 'master/oilcurrent?key=Diesel'
  //   console.log(this.props.dataLogin)
  //   // let object = {
  //   //   key: 'Diesel'
  //   // }
  //   var response = await fetch(api, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       'authorization': this.props.dataLogin.userTokenInfo.accessToken,
  //       'x-api-key': this.props.dataLogin.redisKey
  //       // 'Autro'
  //     },
  //     // body: JSON.stringify(object)
  //   });
  //   if (response.status == 200) {
  //     var responseJson = await response.json();
  //     console.log(responseJson)
  //   } else {
  //     // console.log('api Error')
  //   }
  // }

  condate() {
    var dateshow = this.state.serieclick
    var date_y = dateshow.split('-')[0]
    var date_m = dateshow.split('-')[1]
    var date_d = dateshow.split('-')[2]
    var date_dmy = '(' + date_d + '/' + date_m + ')'
    this.setState({
      dateshow1: date_dmy
    })
  }

  async get_customer_behavior() {
    var userId = this.props.dataLogin.userId
    var cust_id = 0
    this.state.customer_data.forEach((element) => {
      cust_id = element.int_cust_id
    })
    // console.log(this.state)
    // console.log(this.state.serieclick)

    var object = {
      userId: userId,
      customer_id: cust_id,
      date: this.state.serieclick.split(' - ')[0]

    }
    var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/get_customer_behavior"
    var response = await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)
    });
    if (response.status == 200) {
      var responseJson = await response.json();
      this.setState({
        get_customer_behavior_eco: responseJson.eco,
        get_customer_behavior_safety: responseJson.safety
      }, () => {
        // console.log("get_customer_behavior", this.state.start_date)
        // console.log("get_customer_behavior", this.state.end_date)
        // this.state.target.select()
      })
    }
    else {
      // console.log('api Error')
    }
  }

  async get_customer_behavior_range() {
    var userId = this.props.dataLogin.userId
    var cust_id = 0
    this.state.customer_data.forEach((element) => {
      cust_id = element.int_cust_id
    })
    // console.log(this.state.start_date)
    var start_date_d = this.state.start_date.split('/')[0]
    var start_date_m = this.state.start_date.split('/')[1]
    var start_date_y = this.state.start_date.split('/')[2]
    var start_date_dmy = start_date_y + '/' + start_date_m + '/' + start_date_d
    var end_date_d = this.state.end_date.split('/')[0]
    var end_date_m = this.state.end_date.split('/')[1]
    var end_date_y = this.state.end_date.split('/')[2]
    var end_date_dmy = end_date_y + '/' + end_date_m + '/' + end_date_d

    var object = {
      userId: userId,
      customer_id: cust_id,
      startDate: start_date_dmy,
      endDate: end_date_dmy
    }
    var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/get_customer_behavior_by_date"
    var response = await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)
    });
    if (response.status == 200) {
      var responseJson = await response.json();
      // console.log(this.state.start_date)
      // console.log(this.state.end_date)
      if (this.state.start_date.split('/').length > 1) {
        var start_date_d = this.state.start_date.split('/')[0]
        var start_date_m = this.state.start_date.split('/')[1]
        var start_date_y = this.state.start_date.split('/')[2]
        var start_date_dmy = start_date_d + '/' + start_date_m + '/' + start_date_y
        var end_date_d = this.state.end_date.split('/')[0]
        var end_date_m = this.state.end_date.split('/')[1]
        var end_date_y = this.state.end_date.split('/')[2]
        var end_date_dmy = end_date_d + '/' + end_date_m + '/' + end_date_y
      }
      else if (this.state.start_date.split('-').length > 1) {
        var start_date_d = this.state.start_date.split('-')[0]
        var start_date_m = this.state.start_date.split('-')[1]
        var start_date_y = this.state.start_date.split('-')[2]
        var start_date_dmy = start_date_d + '/' + start_date_m + '/' + start_date_y
        var end_date_d = this.state.end_date.split('-')[0]
        var end_date_m = this.state.end_date.split('-')[1]
        var end_date_y = this.state.end_date.split('-')[2]
        var end_date_dmy = end_date_d + '/' + end_date_m + '/' + end_date_y
      }

      this.setState({
        get_customer_behavior_eco: responseJson.eco,
        get_customer_behavior_safety: responseJson.safety,
        start_date: start_date_dmy,
        isLoadingBehavior: false,
        end_date: moment().endOf('month').format("DD/MM/YYYY") == end_date_dmy ? moment().subtract(1, 'days').format("DD/MM/YYYY") : end_date_dmy
        // end_date: end_date_dmy
      }, () => {
        // console.log("get_customer_behavior_range",this.state.start_date)
        // console.log("get_customer_behavior_range",this.state.end_date)
        // console.log(moment().endOf('month').format("DD/MM/YYYY"))
        // console.log(moment().endOf('month').format("DD/MM/YYYY") == end_date_dmy ? moment().subtract(1, 'days').format("DD/MM/YYYY") : end_date_dmy)

        // moment().subtract(1, 'days').format("DD/MM/YYYY") == end_date_dmy
        //   ? moment().subtract(1, 'days').format("DD/MM/YYYY")
        //     :
        // moment().endOf('month') == end_date_dmy ? moment().subtract(1, 'days').format("DD/MM/YYYY") : end_date_dmy
      })
    }
    else {
      // console.log('api Error')
    }
  }

  // async get_vehicle() {
  //   // console.log("get_oil")
  //   var api =  ENDPOINT_SETTING_REPORT_BASE_URL + 'Vehicles/GridView'
  //   var response = await fetch(api, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       'Authorization': this.props.dataLogin.userTokenInfo.accessToken,
  //       'X-API-Key': this.props.dataLogin.,
  //     },
  //   });
  //   if (response.status == 200) {
  //     var responseJson = await response.json();
  //     console.log(responseJson.data.length)
  //   }
  // }

  // async get_oil_price() {
  //   console.log("get_oil")
  //   var xhttp = new XMLHttpRequest();
  //   xhttp.onreadystatechange = function() {
  //     if (this.readyState == 4 && this.status == 200) {
  //     // myFunction(this);
  //     }
  //   };
  //   xhttp.open("GET", "https://www.pttor.com/OilPrice.asmx?op=GetOilPrice", true);
  //   xhttp.send();
  //   // var api = 'http://www.pttplc.com/webservice/pttinfo.asmx?WSDL'
  //   // var response = await fetch(api, {
  //   //   method: 'GET',
  //   //   headers: {
  //   //     Accept: 'application/json',
  //   //     'Content-Type': 'application/json',
  //   //   },
  //   // });
  //   if (response.status == 200) {
  //     var responseJson = await response.json();
  //     console.log(responseJson)
  //   }
  // }

  async get_customer_behavior_DateRange() {
    var userId = this.props.dataLogin.userId
    var cust_id = 0
    this.state.customer_data.forEach((element) => {
      cust_id = element.int_cust_id
    })
    // console.log(this.state.start_date)
    var start_date_d = this.state.start_date.split('/')[0]
    var start_date_m = this.state.start_date.split('/')[1]
    var start_date_y = this.state.start_date.split('/')[2]
    var start_date_dmy = start_date_y + '/' + start_date_m + '/' + start_date_d
    var end_date_d = this.state.end_date.split('/')[0]
    var end_date_m = this.state.end_date.split('/')[1]
    var end_date_y = this.state.end_date.split('/')[2]
    var end_date_dmy = end_date_y + '/' + end_date_m + '/' + end_date_d

    var object = {
      userId: userId,
      customer_id: cust_id,
      startDate: start_date_dmy,
      endDate: end_date_dmy
    }
    var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/get_customer_behavior_by_date"
    var response = await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)
    });
    if (response.status == 200) {
      var responseJson = await response.json();
      // console.log(this.state.start_date)
      // console.log(this.state.end_date)
      if (this.state.start_date.split('/').length > 1) {
        var start_date_d = this.state.start_date.split('/')[0]
        var start_date_m = this.state.start_date.split('/')[1]
        var start_date_y = this.state.start_date.split('/')[2]
        var start_date_dmy = start_date_d + '/' + start_date_m + '/' + start_date_y
        var end_date_d = this.state.end_date.split('/')[0]
        var end_date_m = this.state.end_date.split('/')[1]
        var end_date_y = this.state.end_date.split('/')[2]
        var end_date_dmy = end_date_d + '/' + end_date_m + '/' + end_date_y
      }
      else if (this.state.start_date.split('-').length > 1) {
        var start_date_d = this.state.start_date.split('-')[0]
        var start_date_m = this.state.start_date.split('-')[1]
        var start_date_y = this.state.start_date.split('-')[2]
        var start_date_dmy = start_date_d + '/' + start_date_m + '/' + start_date_y
        var end_date_d = this.state.end_date.split('-')[0]
        var end_date_m = this.state.end_date.split('-')[1]
        var end_date_y = this.state.end_date.split('-')[2]
        var end_date_dmy = end_date_d + '/' + end_date_m + '/' + end_date_y
      }
      this.setState({
        get_customer_behavior_eco: responseJson.eco,
        get_customer_behavior_safety: responseJson.safety,
        start_date: start_date_dmy,
        end_date: moment().endOf('month').format("DD/MM/YYYY") == end_date_dmy ? moment().subtract(1, 'days').format("DD/MM/YYYY") : end_date_dmy,
        isLoadingBehavior: false
        // end_date: end_date_dmy
      }, () => {
        // console.log("get_customer_behavior_DateRange",this.state.start_date)
        // console.log("get_customer_behavior_DateRange",this.state.end_date)
      })
    }
    else {
      // console.log('api Error')
    }
  }

  async customer_data() {
    // console.log(moment().format('DD/MM/YYYY'))
    // console.log( moment().startOf('month').format('DD/MM/YYYY'))
    // console.log(moment().format('DD/MM/YYYY') == moment().startOf('month').format('DD/MM/YYYY'))
    if (moment().format('DD/MM/YYYY') == moment().startOf('month').format('DD/MM/YYYY')) {
      var date = moment().subtract(1, 'month').format("YYYY-MM-DD") + " - " + moment().subtract(1, 'day').format('YYYY-MM-DD')
      // var date = moment().format("YYYY-MM-DD")
      // var date = moment().subtract(1, 'month').format("YYYY-MM-DD") + " - " + moment().subtract(1, 'day').format('YYYY-MM-DD')
      var sDate = moment().subtract(1, 'month').format("DD/MM/YYYY")
      var eDate = moment().subtract(1, 'day').format('DD/MM/YYYY')
      // moment().subtract(1,'month').format("YYYY-MM-DD") + " - " + moment().subtract(1,'day').format('YYYY/MM/DD')
    }
    else {
      // var date = moment().format("YYYY-MM-DD")
      var date = moment().startOf('month').format("YYYY-MM-DD") + " - " + moment().subtract(1, 'day').format('YYYY-MM-DD')
      // var sDate = moment().startOf('month').format("DD/MM/YYYY")
      var eDate = moment().subtract(1, 'day').format('DD/MM/YYYY')
      //   var fdate = new Date();
      //   var ydate = new Date();
      //   var stamp_date = ydate.setDate(ydate.getDate() - 31)
      //   var s_date = new Date(stamp_date);
      //   var y_s = s_date.getFullYear();
      //   var y_m = s_date.getMonth() + 1;
      //   var y_d = s_date.getDate();
      //   var y = fdate.getFullYear();
      //   var m = fdate.getMonth() + 1;
      //   var d = fdate.getDate();
      //   m = m
      //   y_m = y_m
      //   if (String(m).length < 2 || String(y_m).length < 2) {
      //     m = '0' + m
      //     y_m = '0' + y_m
      //   }
      //   d = d
      //   y_d = d
      //   if (String(d).length < 2 || String(y_d).length < 2) {
      //     d = '0' + d
      //     y_d = '0' + y_d
      //   }
      //   var date = y + '-' + m + '-' + d
      //   var sDate = y_d + '/' + y_m + '/' + y_s
      //   var eDate = d + '/' + m + '/' + y
      //   var dateshow = d + '/' + m + '/' + y
      // }
    }

    var userId = this.props.dataLogin.userId
    var object = {
      userId: userId
    }
    var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/get_manage_customer"
    var response = await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)
    });
    var responseJson = await response.json();
    this.setState({
      customer_data: responseJson,
      serieclick: date,
      // dateshow1: dateshow,
      sDate: sDate,
      eDate: eDate,
      start_date: sDate,
      end_date: eDate,
    }, () => {
      // console.log("customer_data",this.state.sDate)
      // console.log("customer_data",this.state.eDate)
      // this.loadevent()
      if (moment().format('DD/MM/YYYY') == moment().startOf('month').format('DD/MM/YYYY')) {
        this.loadUtilizationDateRange()
      }
      else {
        this.loadUtilization()
      }
    })
  }

  async loadUtilization() {
    var accessToken = this.props.dataLogin.userTokenInfo.accessToken
    var redisKey = this.props.dataLogin.redisKey
    var cust_id = 0
    this.state.customer_data.forEach((element) => {
      cust_id = element.int_cust_id
    })
    var api = ENDPOINT_BASE_URL + "fleet/dashboard/summary?cust_id=" + cust_id
    var response = await fetch(api, {
      method: 'GET',
      headers: {
        // Accept: 'application/json',
        // 'Content-Type': 'application/json',
        'Authorization': accessToken,
        'X-API-Key': redisKey
      }

    });
    var responseJson = await response.json();
    if (responseJson.code == 200) {
      // console.log(responseJson)
      this.setState({
        utilization: responseJson
      }, () => {
        // console.log(this.state.utilization.result[30].datetime)
        var n = this.state.utilization.result.length
        var idle_time_cal = 0
        var idle_max = 0
        var oversped_time = 0
        var mileage = 0
        var fuel_used = 0
        var idle_fuel_used = 0
        var oversped_count = 0
        var overspd_max = 0
        var start_date = ""
        var end_date = ""

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

        for (var i = 0; i < n; i++) {
          idle_time_cal = idle_time_cal + parseFloat(this.state.utilization.result[i].idle_time)
          idle_max = idle_max + parseFloat(this.state.utilization.result[i].idle_max)
          oversped_time = oversped_time + parseFloat(this.state.utilization.result[i].oversped_time)
          mileage = mileage + parseFloat(this.state.utilization.result[i].mileage)
          fuel_used = fuel_used + parseFloat(this.state.utilization.result[i].fuel_used)
          idle_fuel_used = idle_fuel_used + parseFloat(this.state.utilization.result[i].idle_fuel_used)
          // oversped_count = oversped_count + parseFloat(this.state.utilization.result[i].oversped_count)
          start_date = this.state.utilization.result[0].datetime
          end_date = this.state.utilization.result[30].datetime

          dlt_4hour += this.state.utilization.result[i].dlt_4hour
          dlt_8hour += this.state.utilization.result[i].dlt_8hour
          dlt_overspeed += this.state.utilization.result[i].dlt_overspeed
          dlt_unknown += this.state.utilization.result[i].dlt_unknown
          dlt_unplug += this.state.utilization.result[i].dlt_unplug
          dlt_wrongtype += this.state.utilization.result[i].dlt_wrongtype
          harsh_start += this.state.utilization.result[i].harsh_start
          harsh_acc += this.state.utilization.result[i].harsh_acc
          sharp_turn += this.state.utilization.result[i].sharp_turn
          harsh_brake += this.state.utilization.result[i].harsh_brake
          over_60 += this.state.utilization.result[i].over_60
          over_80 += this.state.utilization.result[i].over_80
          over_100 += this.state.utilization.result[i].over_100
          over_120 += this.state.utilization.result[i].over_120

          if (this.state.utilization.result[i].overspd_max > overspd_max) {
            overspd_max = this.state.utilization.result[i].overspd_max
          }

        }
        // dlt_overspeed = this.state.utilization.result[0].overspeed_vehicle_group
        // console.log(start_date)
        idle_time_cal = (idle_time_cal / 60).toFixed(2)
        idle_max = ((idle_max / n) / 60).toFixed(2)
        oversped_time = oversped_time
        // oversped_count = this.state.utilization.result[0].overspeed_vehicle_group.toFixed(0)
        oversped_count = (oversped_count).toFixed(0)
        mileage = mileage
        fuel_used = fuel_used
        idle_fuel_used = idle_fuel_used
        if (oversped_time > 60) {
          oversped_time = (oversped_time / 60).toFixed(2)
          var oversped_time_h = oversped_time.split('.')[0]
          var oversped_time_m = oversped_time.split('.')[1]
          if (oversped_time_m != "00") {
            oversped_time_m = (60 * (oversped_time_m / 100)).toFixed(0)
          }
          // oversped_time = oversped_time_h + " h " + oversped_time_m + " min"
          oversped_time = oversped_time_h + "/" + oversped_time_m + "/"
        }
        else {
          // oversped_time = oversped_time.toFixed(0) + " min"
          oversped_time = oversped_time.toFixed(0) + '/'
        }
        var idle_max_h = idle_max.split('.')[0]
        var idle_max_m = idle_max.split('.')[1]
        var idle_time_cal_h = idle_time_cal.split('.')[0]
        var idle_time_cal_m = idle_time_cal.split('.')[1]
        if (idle_time_cal_m != "00" || idle_max_m) {
          idle_time_cal_m = (60 * (idle_time_cal_m / 100)).toFixed(0)
          idle_max_m = (60 * (idle_max_m / 100)).toFixed(0)
        }
        var idle_time_cal_h_m = this.numberWithCommas(idle_time_cal_h) + " h " + idle_time_cal_m + " min"
        var idle_max_h_m = idle_max_h + " h " + idle_max_m + " min"
        var fuel_con = 0
        if (mileage == 0 || fuel_used == 0) {
          fuel_con = 0
        }
        else {
          fuel_con = (mileage / fuel_used).toFixed(2)
        }
        // console.log(this.state.end_date)
        var start_date_y = start_date.split('-')[0]
        var start_date_m = start_date.split('-')[1]
        var start_date_d = start_date.split('-')[2]
        var start_date_dmy = start_date_d + '/' + start_date_m + '/' + start_date_y
        var end_date_y = end_date.split('-')[0]
        var end_date_m = end_date.split('-')[1]
        var end_date_d = end_date.split('-')[2]
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
          // fuel_con: this.state.utilization.result[30].fuel_cons,
          fuel_used: this.numberWithCommas((fuel_used).toFixed(1)),
          mileage: this.numberWithCommas(mileage.toFixed(1)),
          idle_fuel_used: idle_fuel_used,
          idle_time_h: this.numberWithCommas(idle_time_cal_h),
          idle_time_m: this.numberWithCommas(idle_time_cal_m),
          idle_time: idle_time_cal_h_m,
          idle_max: idle_max_h_m,
          idle_fuel_used: this.numberWithCommas((idle_fuel_used / 1000).toFixed(1)),
          overspeed_count: oversped_count,
          overspd_max: overspd_max,
          oversped_time: oversped_time,
          isLoadingutilization: false,
          fuel_con: fuel_con,
          start_date: start_date_dmy,
          dataOverlayPanel: dataOverlayPanel,
          // date: start_date_dmy + " to " + end_date_dmy,
          // end_date: moment().endOf('month').format("DD/MM/YYYY") == end_date_dmy ?
          // moment().subtract(1, 'days').format("DD/MM/YYYY") :
          // end_date_dmy
          // end_date: end_date_dmy

        }, () => {
          // console.log("loadUtilization",this.state.start_date)
          // console.log("loadUtilization",this.state.end_date)
          // console.log(this.state.dataOverlayPanel)
          // this.get_customer_behavior()
          this.get_customer_behavior_range()
        })
      })

    }
    else {
      // console.log('api Error')
    }



  }
  async loadUtilizationDateRange() {
    var accessToken = this.props.dataLogin.userTokenInfo.accessToken
    var redisKey = this.props.dataLogin.redisKey
    var start_date = this.state.start_date
    var end_date = this.state.end_date
    var cust_id = 0
    // console.log(start_date)
    // console.log(end_date)
    this.state.customer_data.forEach((element) => {
      cust_id = element.int_cust_id
    })
    if (moment().format('DD/MM/YYYY') == moment().startOf('month').format('DD/MM/YYYY')) {
      var start_date_y = start_date.split('/')[2]
      var start_date_m = start_date.split('/')[1]
      var start_date_d = start_date.split('/')[0]
      var start_date_dmy = start_date_y + '-' + start_date_m + '-' + start_date_d
      var end_date_y = end_date.split('/')[2]
      var end_date_m = end_date.split('/')[1]
      var end_date_d = end_date.split('/')[0]
      var end_date_dmy = end_date_y + '-' + end_date_m + '-' + end_date_d
      var api = ENDPOINT_BASE_URL + "fleet/dashboard/summary?cust_id=" + cust_id + "&start_date=" + start_date_dmy + "&stop_date=" + end_date_dmy
    }
    else {
      var start_date_y = start_date.split('/')[2]
      var start_date_m = start_date.split('/')[1]
      var start_date_d = start_date.split('/')[0]
      var start_date_dmy = start_date_y + '-' + start_date_m + '-' + start_date_d
      var end_date_y = end_date.split('/')[2]
      var end_date_m = end_date.split('/')[1]
      var end_date_d = end_date.split('/')[0]
      var end_date_dmy = end_date_y + '-' + end_date_m + '-' + end_date_d
      var api = ENDPOINT_BASE_URL + "fleet/dashboard/summary?cust_id=" + cust_id + "&start_date=" + start_date_dmy + "&stop_date=" + end_date_dmy
    }
    var response = await fetch(api, {
      method: 'GET',
      headers: {
        // Accept: 'application/json',
        // 'Content-Type': 'application/json',
        'Authorization': accessToken,
        'X-API-Key': redisKey
      }

    });
    var responseJson = await response.json();
    if (responseJson.code == 200) {
      // console.log(responseJson)
      this.setState({
        overspd_max: 0,
        utilization: responseJson
      }, () => {
        var n = this.state.utilization.result.length
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

        for (var i = 0; i < n; i++) {
          idle_time_cal = idle_time_cal + parseFloat(this.state.utilization.result[i].idle_time)
          idle_max = idle_max + parseFloat(this.state.utilization.result[i].idle_max)
          oversped_time = oversped_time + parseFloat(this.state.utilization.result[i].oversped_time)
          mileage = mileage + parseFloat(this.state.utilization.result[i].mileage)
          fuel_used = fuel_used + parseFloat(this.state.utilization.result[i].fuel_used)
          idle_fuel_used = idle_fuel_used + parseFloat(this.state.utilization.result[i].idle_fuel_used)
          oversped_count = oversped_count + parseFloat(this.state.utilization.result[i].oversped_count)

          dlt_4hour += this.state.utilization.result[i].dlt_4hour
          dlt_8hour += this.state.utilization.result[i].dlt_8hour
          dlt_overspeed += this.state.utilization.result[i].dlt_overspeed
          // dlt_overspeed += this.state.utilization.result[i].overspd
          dlt_unknown += this.state.utilization.result[i].dlt_unknown
          dlt_unplug += this.state.utilization.result[i].dlt_unplug
          dlt_wrongtype += this.state.utilization.result[i].dlt_wrongtype
          harsh_start += this.state.utilization.result[i].harsh_start
          harsh_acc += this.state.utilization.result[i].harsh_acc
          sharp_turn += this.state.utilization.result[i].sharp_turn
          harsh_brake += this.state.utilization.result[i].harsh_brake
          over_60 += this.state.utilization.result[i].over_60
          over_80 += this.state.utilization.result[i].over_80
          over_100 += this.state.utilization.result[i].over_100
          over_120 += this.state.utilization.result[i].over_120

          if (this.state.utilization.result[i].overspd_max > overspd_max) {
            overspd_max = this.state.utilization.result[i].overspd_max
          }

        }
        idle_time_cal = (idle_time_cal / 60).toFixed(2)
        idle_max = ((idle_max / n) / 60).toFixed(2)
        oversped_time = oversped_time
        oversped_count = (oversped_count).toFixed(0)
        mileage = mileage
        fuel_used = fuel_used
        idle_fuel_used = idle_fuel_used
        // console.log('------- Date --------')
        // console.log(start_date)
        if ((start_date == moment(start_date, 'DD/MM/YYYY').startOf('month').format('DD/MM/YYYY') && end_date == moment(end_date, 'DD/MM/YYYY').endOf('month').format('DD/MM/YYYY'))
          || (start_date == moment().startOf('month').format('DD/MM/YYYY') && end_date == moment().subtract(1, 'day').format('DD/MM/YYYY'))) {
          console.log('------- over speed --------')
          console.log(this.state.utilization.result[0].overspeed_vehicle_group)
          oversped_count = this.state.utilization.result[0].overspeed_vehicle_group
        }
        if (oversped_time > 60) {
          oversped_time = (oversped_time / 60).toFixed(2)
          var oversped_time_h = oversped_time.split('.')[0]
          var oversped_time_m = oversped_time.split('.')[1]
          if (oversped_time_m != "00") {
            oversped_time_m = (60 * (oversped_time_m / 100)).toFixed(0)
          }
          // oversped_time = oversped_time_h + " h " + oversped_time_m + " min"
          oversped_time = oversped_time_h + "/" + oversped_time_m + "/"
        }
        else {
          // oversped_time = oversped_time.toFixed(0) + " min"
          oversped_time = oversped_time.toFixed(0) + '/'

        }
        var idle_max_h = idle_max.split('.')[0]
        var idle_max_m = idle_max.split('.')[1]
        var idle_time_cal_h = idle_time_cal.split('.')[0]
        var idle_time_cal_m = idle_time_cal.split('.')[1]
        if (idle_time_cal_m != "00" || idle_max_m) {
          idle_time_cal_m = (60 * (idle_time_cal_m / 100)).toFixed(0)
          idle_max_m = (60 * (idle_max_m / 100)).toFixed(0)
        }
        var idle_time_cal_h_m = this.numberWithCommas(idle_time_cal_h) + " h " + idle_time_cal_m + " min"
        var idle_max_h_m = idle_max_h + " h " + idle_max_m + " min"
        var fuel_con = 0
        if (mileage == 0 || fuel_used == 0) {
          fuel_con = 0
        }
        else {
          fuel_con = (mileage / fuel_used).toFixed(2)
        }

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
          // fuel_con: this.state.utilization.result[30].fuel_cons,
          fuel_used: this.numberWithCommas((fuel_used).toFixed(1)),
          mileage: this.numberWithCommas(mileage.toFixed(1)),
          idle_fuel_used: idle_fuel_used,
          idle_time: idle_time_cal_h_m,
          idle_time_h: this.numberWithCommas(idle_time_cal_h),
          idle_time_m: this.numberWithCommas(idle_time_cal_m),
          idle_time: idle_time_cal_h_m,
          idle_max: idle_max_h_m,
          idle_fuel_used: this.numberWithCommas((idle_fuel_used / 1000).toFixed(1)),
          overspeed_count: oversped_count,
          overspd_max: overspd_max,
          oversped_time: oversped_time,
          isLoadingutilization: false,
          fuel_con: fuel_con,
          dataOverlayPanel: dataOverlayPanel,
        }, () => {
          // console.log(dataOverlayPanel)
          // console.log(this.state.dataOverlayPanel)
        })
      })

    }
    else {
      // console.log('api Error')
    }
    // console.log(this.state.utilization)

    this.get_customer_behavior_DateRange()
  }


  async loadUtilizationRange() {
    var accessToken = this.props.dataLogin.userTokenInfo.accessToken
    var redisKey = this.props.dataLogin.redisKey
    var start_date = this.state.start_date
    // console.log(this.state.start_date)
    var start_date_d = start_date.split('/')[0]
    var start_date_m = start_date.split('/')[1]
    var start_date_y = start_date.split('/')[2]
    var start_date_dmy = start_date_y + '-' + start_date_m + '-' + start_date_d
    var end_date = this.state.end_date
    var end_date_d = end_date.split('/')[0]
    var end_date_m = end_date.split('/')[1]
    var end_date_y = end_date.split('/')[2]
    var end_date_dmy = end_date_y + '-' + end_date_m + '-' + end_date_d
    var cust_id = 0

    // console.log(start_date)
    // console.log(end_date)
    this.state.customer_data.forEach((element) => {
      cust_id = element.int_cust_id
    })
    var api = ENDPOINT_BASE_URL + "fleet/dashboard/summary?cust_id=" + cust_id + "&start_date=" + start_date_dmy + "&stop_date=" + end_date_dmy
    var response = await fetch(api, {
      method: 'GET',
      headers: {
        // Accept: 'application/json',
        // 'Content-Type': 'application/json',
        'Authorization': accessToken,
        'X-API-Key': redisKey
      }

    });
    var responseJson = await response.json();
    if (responseJson.code == 200) {

      this.setState({
        overspd_max: 0,
        utilization: responseJson
      }, () => {
        var n = this.state.utilization.result.length
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

        for (var i = 0; i < n; i++) {
          idle_time_cal = idle_time_cal + parseFloat(this.state.utilization.result[i].idle_time)
          idle_max = idle_max + parseFloat(this.state.utilization.result[i].idle_max)
          oversped_time = oversped_time + parseFloat(this.state.utilization.result[i].oversped_time)
          mileage = mileage + parseFloat(this.state.utilization.result[i].mileage)
          fuel_used = fuel_used + parseFloat(this.state.utilization.result[i].fuel_used)
          idle_fuel_used = idle_fuel_used + parseFloat(this.state.utilization.result[i].idle_fuel_used)
          oversped_count = oversped_count + parseFloat(this.state.utilization.result[i].oversped_count)
          dlt_4hour += this.state.utilization.result[i].dlt_4hour
          dlt_8hour += this.state.utilization.result[i].dlt_8hour
          // dlt_overspeed += this.state.utilization.result[i].overspd
          dlt_overspeed += this.state.utilization.result[i].dlt_overspeed
          dlt_unknown += this.state.utilization.result[i].dlt_unknown
          dlt_unplug += this.state.utilization.result[i].dlt_unplug
          dlt_wrongtype += this.state.utilization.result[i].dlt_wrongtype
          harsh_start += this.state.utilization.result[i].harsh_start
          harsh_acc += this.state.utilization.result[i].harsh_acc
          sharp_turn += this.state.utilization.result[i].sharp_turn
          harsh_brake += this.state.utilization.result[i].harsh_brake
          over_60 += this.state.utilization.result[i].over_60
          over_80 += this.state.utilization.result[i].over_80
          over_100 += this.state.utilization.result[i].over_100
          over_120 += this.state.utilization.result[i].over_120
          if (this.state.utilization.result[i].overspd_max > overspd_max) {
            overspd_max = this.state.utilization.result[i].overspd_max
          }

        }
        // dlt_overspeed = this.state.utilization.result[i].overspeed_vehicle_group
        idle_time_cal = (idle_time_cal / 60).toFixed(2)
        idle_max = ((idle_max / n) / 60).toFixed(2)
        oversped_time = oversped_time
        oversped_count = (oversped_count).toFixed(0)
        mileage = mileage
        fuel_used = fuel_used
        idle_fuel_used = idle_fuel_used
        if ((start_date == moment(start_date, 'DD/MM/YYYY').startOf('month').format('DD/MM/YYYY') && end_date == moment(end_date, 'DD/MM/YYYY').endOf('month').format('DD/MM/YYYY'))
          || (start_date == moment().startOf('month').format('DD/MM/YYYY') && end_date == moment().subtract(1, 'day').format('DD/MM/YYYY'))) {
          console.log('------- over speed --------')
          console.log(this.state.utilization.result[0].overspeed_vehicle_group)
          oversped_count = this.state.utilization.result[0].overspeed_vehicle_group
        }
        if (oversped_time > 60) {
          oversped_time = (oversped_time / 60).toFixed(2)
          var oversped_time_h = oversped_time.split('.')[0]
          var oversped_time_m = oversped_time.split('.')[1]
          if (oversped_time_m != "00") {
            oversped_time_m = (60 * (oversped_time_m / 100)).toFixed(0)
          }
          // oversped_time = oversped_time_h + " h " + oversped_time_m + " min"
          oversped_time = oversped_time_h + "/" + oversped_time_m + "/"
        }
        else {
          // oversped_time = oversped_time.toFixed(0) + " min"
          oversped_time = oversped_time.toFixed(0) + '/'
        }
        var idle_max_h = idle_max.split('.')[0]
        var idle_max_m = idle_max.split('.')[1]
        var idle_time_cal_h = idle_time_cal.split('.')[0]
        var idle_time_cal_m = idle_time_cal.split('.')[1]
        if (idle_time_cal_m != "00" || idle_max_m) {
          idle_time_cal_m = (60 * (idle_time_cal_m / 100)).toFixed(0)
          idle_max_m = (60 * (idle_max_m / 100)).toFixed(0)
        }
        var idle_time_cal_h_m = this.numberWithCommas(idle_time_cal_h) + " h " + idle_time_cal_m + " min"
        var idle_max_h_m = idle_max_h + " h " + idle_max_m + " min"
        var fuel_con = 0
        if (mileage == 0 || fuel_used == 0) {
          fuel_con = 0
        }
        else {
          fuel_con = (mileage / fuel_used).toFixed(2)
        }
        // console.log(this.state.end_date)
        var start_date_y = start_date.split('/')[0]
        var start_date_m = start_date.split('/')[1]
        var start_date_d = start_date.split('/')[2]
        var start_date_dmy = start_date_d + '/' + start_date_m + '/' + start_date_y
        var end_date_y = end_date.split('/')[2]
        var end_date_m = end_date.split('/')[1]
        var end_date_d = end_date.split('/')[0]
        var end_date_dmy = end_date_d + '/' + end_date_m + '/' + end_date_y
        // console.log(end_date_dmy)

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
          // fuel_con: this.state.utilization.result[30].fuel_cons,
          fuel_used: this.numberWithCommas((fuel_used).toFixed(1)),
          mileage: this.numberWithCommas(mileage.toFixed(1)),
          idle_fuel_used: idle_fuel_used,
          idle_time: idle_time_cal_h_m,
          idle_max: idle_max_h_m,
          idle_time_h: this.numberWithCommas(idle_time_cal_h),
          idle_time_m: this.numberWithCommas(idle_time_cal_m),
          idle_time: idle_time_cal_h_m,
          idle_fuel_used: this.numberWithCommas((idle_fuel_used / 1000).toFixed(1)),
          overspeed_count: oversped_count,
          overspd_max: overspd_max,
          oversped_time: oversped_time,
          isLoadingutilization: false,
          fuel_con: fuel_con,
          dataOverlayPanel: dataOverlayPanel,
          start_date: start_date,
          end_date: moment().endOf('month').format("DD/MM/YYYY") == end_date_dmy ? moment().subtract(1, 'days').format("DD/MM/YYYY") : end_date_dmy
          // end_date: end_date_dmy
        }, () => {
          // console.log(dataOverlayPanel)
          // console.log(this.state.dataOverlayPanel)
          // console.log("loadUtilizationRange",this.state.start_date)
          // console.log("loadUtilizationRange",this.state.end_date)
        })
      })

    }
    else {
      // console.log('api Error')
    }
    // console.log(this.state.utilization)
    // this.get_customer_behavior_range()
  }

  async loadUtilizationday() {
    var accessToken = this.props.dataLogin.userTokenInfo.accessToken
    var redisKey = this.props.dataLogin.redisKey
    var date = this.state.serieclick.split(' - ')[0]
    var cust_id = 0
    this.state.customer_data.forEach((element) => {
      cust_id = element.int_cust_id
    })
    var api = ENDPOINT_BASE_URL + "fleet/dashboard/summary/" + date + "?cust_id=" + cust_id
    var response = await fetch(api, {
      method: 'GET',
      headers: {
        // Accept: 'application/json',
        // 'Content-Type': 'application/json',
        'Authorization': accessToken,
        'X-API-Key': redisKey
      }

    });
    var responseJson = await response.json();
    if (responseJson.code == 200) {
      // responseJson.result.harsh_acc.sum = this.state.utilizationday.result[0].harsh_acc
      // responseJson.result.harsh_brake.sum = this.state.utilizationday.result[0].harsh_brake
      // responseJson.result.harsh_start.sum = this.state.utilizationday.result[0].harsh_start
      // responseJson.result.sharp_turn.sum = this.state.utilizationday.result[0].sharp_turn
      // responseJson.result.over_60.sum = this.state.utilizationday.result[0].over_60
      // responseJson.result.over_80.sum = this.state.utilizationday.result[0].over_80
      // responseJson.result.over_100.sum = this.state.utilizationday.result[0].over_100
      // responseJson.result.over_120.sum = this.state.utilizationday.result[0].over_120
      this.setState({
        utilizationday: responseJson.result[0]
      }, () => {
        var idle_time_cal = (this.state.utilizationday.idle_time / 60).toFixed(2)
        var idle_max = (this.state.utilizationday.idle_max / 60).toFixed(2)
        // var oversped_time = this.state.utilizationday.result[0].oversped_time + ' min'
        var oversped_time = this.state.utilizationday.oversped_time + '/'
        if (this.state.utilizationday.oversped_time > 60) {
          oversped_time = (this.state.utilizationday.oversped_time / 60).toFixed(2)
          var oversped_time_h = oversped_time.split('.')[0]
          var oversped_time_m = oversped_time.split('.')[1]
          if (oversped_time_m != "00") {
            oversped_time_m = (60 * (oversped_time_m / 100)).toFixed(0)
          }
          // oversped_time = oversped_time_h + " h " + oversped_time_m + " min"
          oversped_time = oversped_time_h + "/" + oversped_time_m + "/"
        }
        // console.log(oversped_time)
        var idle_max_h = idle_max.split('.')[0]
        var idle_max_m = idle_max.split('.')[1]
        var idle_time_cal_h = idle_time_cal.split('.')[0]
        var idle_time_cal_m = idle_time_cal.split('.')[1]
        if (idle_time_cal_m != "00" || idle_max_m) {
          idle_time_cal_m = (60 * (idle_time_cal_m / 100)).toFixed(0)
          idle_max_m = (60 * (idle_max_m / 100)).toFixed(0)
        }
        var idle_time_cal_h_m = this.numberWithCommas(idle_time_cal_h) + " h " + idle_time_cal_m + " min"
        var idle_max_h_m = idle_max_h + " h " + idle_max_m + " min"
        var fuel_con = 0
        if (this.state.utilizationday.mileage == 0 || this.state.utilizationday.fuel_used == 0) {
          fuel_con = 0
        }
        else {
          fuel_con = (this.state.utilizationday.mileage / this.state.utilizationday.fuel_used).toFixed(2)
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

        dlt_4hour = this.state.utilizationday.dlt_4hour
        dlt_8hour = this.state.utilizationday.dlt_8hour
        // dlt_overspeed = this.state.utilizationday.dlt_overspeed
        dlt_overspeed = this.state.utilizationday.overspd
        dlt_unknown = this.state.utilizationday.dlt_unknown
        dlt_unplug = this.state.utilizationday.dlt_unplug
        dlt_wrongtype = this.state.utilizationday.dlt_wrongtype
        harsh_start = this.state.utilizationday.harsh_start
        harsh_acc = this.state.utilizationday.harsh_acc
        sharp_turn = this.state.utilizationday.sharp_turn
        harsh_brake = this.state.utilizationday.harsh_brake
        over_60 = this.state.utilizationday.over_60
        over_80 = this.state.utilizationday.over_80
        over_100 = this.state.utilizationday.over_100
        over_120 = this.state.utilizationday.over_120

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
          // fuel_con: this.state.utilizationday.result[0].fuel_cons,
          fuel_used: this.numberWithCommas((this.state.utilizationday.fuel_used).toFixed(1)),
          mileage: this.numberWithCommas(this.state.utilizationday.mileage),
          idle_fuel_used: this.state.utilizationday.idle_fuel_used,
          idle_time: idle_time_cal_h_m,
          idle_time_h: this.numberWithCommas(idle_time_cal_h),
          idle_time_m: this.numberWithCommas(idle_time_cal_m),
          idle_max: idle_max_h_m,
          idle_fuel_used: this.numberWithCommas((this.state.utilizationday.idle_fuel_used / 1000).toFixed(1)),
          overspeed_count: this.state.utilizationday.oversped_count,
          overspd_max: this.state.utilizationday.overspd_max,
          oversped_time: oversped_time,
          isLoadingutilization: false,
          fuel_con: fuel_con,
          dataOverlayPanel: dataOverlayPanel,
        }, () => {
          this.get_customer_behavior()
        })
      })
    }
    else {
      // console.log('api Error')
    }

    // console.log(this.state.utilizationday)
  }

  async loadvehicle() {
    var userId = this.props.dataLogin.userId
    var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/getallvehicle"
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
    // console.log(responseJson);
    this.setState({
      vehicle: responseJson.vehicle
    })
    // if (responseJson.fleet.length > 0) {
    //   this.setState({
    //     vehicle: responseJson.vehicle,
    //     fleet: responseJson.fleet
    //   })
    // } else {
    //   this.setState({
    //     vehicle: responseJson.vehicle,
    //   })
    // }

  }

  // loadTrigger(){
  //     this.datagrid.current.instance.refresh();
  // }
  // componentDidMount(){
  //     this.readyonload = 1;
  //     this.datagrid.current.instance.refresh();
  // }
  componentDidMount() {
    this.get_oil_price();
    this.loadvehicle();

  }

  componentDidUpdate(prevProps, nextState) {
    if (!isEqual(prevProps.focusPosition, this.props.focusPosition)) {

      // console.log(prevProps.focusPosition, this.props.focusPosition)
      let zoom = this.props.zoom ? this.props.zoom : this.map.zoom
      this.setDefualtMap(this.props.focusPosition.lat, this.props.focusPosition.lng, zoom)
      this.props.setZoomMap(undefined)
      // this.props.setActiveMap(true)

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
  handleDateStartChange(event, picker) {
    let dateStart = moment(picker.startDate)

    let sta = {
      dateStart
    }

    // console.log(dateStart.isBefore(this.state.dateEnd))
    if (!(dateStart.isBefore(this.state.dateEnd))) sta.dateEnd = dateStart
    this.setState(sta);
    // console.log("START", dateStart)
    // console.log("START", dateStart._i)
  }


  async loadevent() {
    var accessToken = this.props.dataLogin.userTokenInfo.accessToken
    var redisKey = this.props.dataLogin.redisKey
    var date = this.state.serieclick
    var cust_id = 0
    this.state.customer_data.forEach((element) => {
      cust_id = element.int_cust_id
    })
    // var api = ENDPOINT_BASE_URL + "fleet/dashboard/summary/event/" + date + "?cust_id=" + cust_id
    var api = ENDPOINT_BASE_URL + "fleet/dashboard/summary/event/" + date + "/" + cust_id + "/0"
    var response = await fetch(api, {
      method: 'GET',
      headers: {
        // Accept: 'application/json',
        // 'Content-Type': 'application/json',
        'Authorization': accessToken,
        'X-API-Key': redisKey
      }

    });
    var responseJson = await response.json();
    // console.log(responseJson)
    if (responseJson.code == 200) {
      this.setState({
        event: responseJson.result

      }, () => {
        this.setState({
          dlt_overspeed: this.state.event.dlt_overspeed.sum,
          isLoadingevent: false,
          isReloading: false
        }, () => {
          // console.log(this.state.dataOverlayPanel)
        })
      })
    }
    else {
      // console.log('api Error')
    }

  }

  onApplyEvent(dataObject) {
    // console.log(dataObject)
    var start_date_d = dataObject.startDate.format('YYYY-MM-DD').split('-')[2]
    var start_date_m = dataObject.startDate.format('YYYY-MM-DD').split('-')[1]
    var start_date_y = dataObject.startDate.format('YYYY-MM-DD').split('-')[0]
    var start_date_dmy = start_date_d + '/' + start_date_m + '/' + start_date_y
    var end_date_d = dataObject.endDate.format('YYYY-MM-DD').split('-')[2]
    var end_date_m = dataObject.endDate.format('YYYY-MM-DD').split('-')[1]
    var end_date_y = dataObject.endDate.format('YYYY-MM-DD').split('-')[0]
    var end_date_dmy = end_date_d + '/' + end_date_m + '/' + end_date_y
    // dataObject.startDate.format('YYYY-MM-DD')
    this.setState({
      date: start_date_dmy + " to " + end_date_dmy,
      start_date: start_date_dmy,
      end_date: end_date_dmy,
      serieclick: moment(dataObject.startDate).format('YYYY-MM-DD') + " - " + moment(dataObject.endDate).format('YYYY-MM-DD'),
      target: null,
      selectData: false,
    }, () => {
      // console.log(this.state.start_date)
      // console.log(this.state.end_date)
      this.loadUtilizationDateRange()
      // this.loadUtilizationRange()
    })
  }



  render() {

    let { fitObjectEnabled, GeofencesEnabled, objectEnabled, clusterEnabled, infoWindowEnabled, arrImg, arrImgActive, alertSetting } = this.state
    var config = {
      language: 'TH',
      showDropdowns: true,
      format: "MM/DD/YYYY" // รองรับแต่ format นี้ เท่านั้น !!!!!!!!
    };
    // console.log(this.state.dataOverlayPanel)
    // console.log(this.state)
    // console.log(this.state.tooltipIdle[this.props.language])

    // console.log("isLoadingBehavior > ", this.state.isLoadingBehavior)
    // console.log("isLoadingutilization > ", this.state.isLoadingutilization)

    if (this.state.isLoadingBehavior || this.state.isLoadingutilization == true) {
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

      // console.log(this.state.event)
      return (
        <div>

          <Row>
            <div className="col-md-12" style={{ marginBottom: -5 }}>
              <div className="ibox float-e-margins">
                <div className="ibox-title" >
                  <Row>
                    <Col lg={5}>
                      <label style={{ fontWeight: "bold", fontSize: 18 }}>{t('summary_71')} {" "} {this.state.selectData == false && this.state.start_date} {this.state.selectData == false && t('summary_74')} {this.state.selectData == false ? " " + this.state.end_date : this.state.date} </label>
                      {/* <Row style={{ paddingRight: 5, paddingLeft: 5 }}>
                      </Row> */}
                    </Col>
                    <Col lg={3} style={{ textAlign: "right" }}>
                      <label style={{ fontWeight: "bold", fontSize: 18, }}> {t('summary_72')}</label>
                    </Col>
                    <Col lg={4}>

                      {/* <Row style={{ paddingRight: 5, paddingLeft: 5 }}> */}
                      {/* <div className="ibox float-e-margins"> */}
                      {/* <FormDatePicker_DB
                        select_change={this.onApplyEvent.bind(this)}
                        language={this.props.language}
                        maxDate={this.state.eDate}>
                      </FormDatePicker_DB> */}
                      <FormDatepickerNew
                        select_change={this.onApplyEvent.bind(this)}
                        language={this.props.language}
                        maxDate={this.state.eDate}>
                      </FormDatepickerNew>

                      {/* </div> */}
                      {/* </Row> */}
                    </Col>
                  </Row>
                </div>
              </div>
            </div>

          </Row>

          <Row>
            {/* Vehicle Utilization */}
            <div className="col-md-5" style={{ paddingRight: 0, marginBottom: -5, marginTop: -15 }}>
              <div className="ibox float-e-margins">

                <div className="ibox-title" >

                  <Row style={{ paddingRight: 0, paddingLeft: 5 }}>
                    <Col lg={12}>
                      <div style={{ fontWeight: "bold" }}>
                        <i className="fa fa-location-arrow" aria-hidden="true" style={{ marginRight: 10 }}></i>
                        <label style={{ fontWeight: "bold", fontSize: 18 }}> {t("summary_1")} {' (' + this.props.menuUser.vehicleCount + ' '} {t("summary_41")}{') '}</label>
                      </div>
                    </Col>
                    {/* <Col md={6}>
                      <FormDatePicker_DB
                        select_change={this.onApplyEvent.bind(this)}

                        maxDate={this.state.eDate}>

                      </FormDatePicker_DB>

                    </Col> */}

                  </Row>
                </div>

                <div className="ibox-content" style={{ height: 370 }}>
                  <Row style={{ marginTop: 20 }}>
                    <div className="col-md-12 "  >
                      <Dngraph1 onLoadChart={(e) => this.state.dngraph == null && this.setState({ dngraph: e })} ref={this.state.dngraph} target={this.state.target} chartHeight={350} chartWeight={300} data={this.state.utilization} selectData={this.state.selectData} selectedCallback={this.selectedCallback}></Dngraph1>
                    </div>
                  </Row>
                </div>



              </div>
            </div>


            <div className="col-md-7" style={{ paddingLeft: 5, marginBottom: -5, marginTop: -15 }}>
              <Row>
                {/* Safety Driving Summary */}
                <Col md={6} style={{ paddingRight: 5 }}>
                  <div className="ibox-title">
                    <div style={{ fontWeight: "bold", textAlign: 'center', }}>
                      {/* <i class="fas fa-user-plus" aria-hidden="true" style={{ marginRight: 10 }}></i> */}
                      <img alt="image" src={images.seatBelt} style={{ width: 15, height: 17, margin: '0px 10px 5px 0px' }} />
                      <label style={{ fontWeight: "bold", fontSize: 18 }}>{t("summary_12")}</label>
                    </div>
                  </div>
                  <div className="ibox-content">
                    <Safety chartHeight={334} chartWeight={470} data={this.state.get_customer_behavior_safety}></Safety>
                  </div>
                </Col>
                {/* ECO Driving Summary */}
                <Col md={6} style={{ paddingLeft: 0 }}>
                  <div className="ibox-title">
                    <div style={{ fontWeight: "bold", textAlign: 'center', }}>
                      <i class="fab fa-envira" aria-hidden="true" style={{ marginRight: 10 }}></i>
                      <label style={{ fontWeight: "bold", fontSize: 18 }}>{t("summary_21")}</label>

                    </div>
                  </div>
                  <div className="ibox-content">
                    <Spidereco chartHeight={334} chartWeight={470} data={this.state.get_customer_behavior_eco}></Spidereco>
                  </div>
                </Col>
              </Row>

            </div>
          </Row>

          <Row >
            <Col lg={4} md={12} style={{ paddingRight: 0, marginBottom: -5, marginTop: -15 }}>
              {/* Fuel Consumption */}
              <div className="ibox float-e-margins">
                <div className="ibox-title" >

                  <Row>
                    <Col md={12} style={{ fontWeight: "bold", fontSize: 18 }} >
                      {/* <Col md={6} > */}
                      <i class="fas fa-gas-pump" aria-hidden="true" style={{ marginRight: 10 }}></i>
                      <font>{t("summary_30")}</font>
                      {/* </Col> */}
                    </Col>
                    <Col md={12} align="right" style={{ fontWeight: "bold", fontSize: 18 }} >
                      {/* <font style={{ color: 'white', fontSize: 10, backgroundColor: '#55c1d9', paddingTop: 2, paddingLeft: 2, paddingRight: 2, paddingBottom: 2, borderRadius: 5 }}>1 Oct 2019</font> */}
                      {/* <br/> */}
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

            <Col lg={4} md={12} style={{ paddingLeft: 5, paddingRight: 5, marginBottom: -5, marginTop: -15 }}>
              {/* Idling Time */}
              <div className="ibox float-e-margins">
                <div className="ibox-title" title={this.state.tooltipIdle[this.props.language + '']}>
                  {/* <Row title="นับตั้งแต่ 5 นาที ขึ้นไป"> */}
                  <Row>
                    <Col md={12} style={{ fontWeight: "bold", fontSize: 18 }} >
                      {/* <Col md={6} > */}
                      <i class="fas fa-ban" aria-hidden="true" style={{ marginRight: 10 }}></i>
                      <font>{t("summary_36")}</font>
                      {/* </Col> */}
                    </Col>
                    <Col md={12} align="right" style={{ fontWeight: "bold", fontSize: 18 }} >
                      {/* <font style={{ color: 'white', fontSize: 10, backgroundColor: '#55c1d9', paddingTop: 2, paddingLeft: 2, paddingRight: 2, paddingBottom: 2, borderRadius: 5 }}>1 Oct 2019</font> */}
                      {/* <br/> */}
                      {/* <Col md={6} style={{ fontWeight: "bold", fontSize: 18 }} >
                      <i class="fas fa-ban" aria-hidden="true" style={{ marginRight: 10 }}></i>

                      <font>{t("summary_36")}</font>
                    </Col>
                    <Col md={6} align="right" style={{ fontWeight: "bold", fontSize: 18 }} > */}

                      {this.state.idle_time_h}
                      <font> {t("summary_37")}</font>
                      {" " + this.state.idle_time_m}
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
                      {/* <font>{t("summary_39")}</font> */}
                      <font>{t("summary_76")}</font>
                    </Col>
                    <Col md={5} align="right" style={{ fontSize: 16 }}>
                      {/* {this.state.idle_fuel_used} */}
                      {this.numberWithCommas((Number(this.state.idle_fuel_used.replace(",", "")) * this.state.oilPrice).toFixed(0))}
                      <font> {t("summary_77")}</font>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>

            <Col lg={4} md={12} style={{ paddingLeft: 0, marginBottom: -5, marginTop: -15 }}>
              {/* Over Speed */}
              <div className="ibox float-e-margins">
                <div className="ibox-title" title={this.state.tooltipOverSpeed[this.props.language + '']}>
                  <Row>
                    <Col md={12} style={{ fontWeight: "bold", fontSize: 18 }} >
                      {/* <Col md={6} > */}
                      <i class="fas fa-tachometer-alt" aria-hidden="true" style={{ marginRight: 10 }}></i>
                      <font>{t("summary_40")}</font>
                      {/* </Col> */}
                    </Col>
                    <Col md={12} align="right" style={{ fontWeight: "bold", fontSize: 18 }} >
                      {/* <font style={{ color: 'white', fontSize: 10, backgroundColor: '#55c1d9', paddingTop: 2, paddingLeft: 2, paddingRight: 2, paddingBottom: 2, borderRadius: 5 }}>1 Oct 2019</font> */}
                      {/* <br/> */}
                      {/* <Col md={7} style={{ fontWeight: "bold", fontSize: 18 }} >
                      <i class="fas fa-tachometer-alt" aria-hidden="true" style={{ marginRight: 10 }}></i>
                      <font>{t("summary_40")}</font>
                    </Col>
                    <Col md={5} align="right" style={{ fontWeight: "bold", fontSize: 18 }} > */}
                      {this.state.overspeed_count}<font> {t("summary_41")}</font>
                    </Col>
                  </Row>
                </div>
                <div className="ibox-content">

                  <Row>
                    <Col md={8} style={{ fontSize: 16 }}>
                      <font>{t("summary_42")} </font>
                    </Col>
                    <Col md={4} align="right" style={{ fontSize: 16 }}>
                      {this.state.oversped_time.split('/').length > 2 && this.state.oversped_time.split('/')[0] + " "}
                      {this.state.oversped_time.split('/').length > 2 && t("summary_37")}
                      {this.state.oversped_time.split('/').length > 2 && " " + this.state.oversped_time.split('/')[1] + " "}
                      {this.state.oversped_time.split('/').length > 2 && t("summary_38")}
                      {/* {console.log(this.state.oversped_time.split('/').length)} */}

                      {this.state.oversped_time.split('/').length < 3 && this.state.oversped_time.split('/')[0] + " "}
                      {this.state.oversped_time.split('/').length < 3 && t("summary_38")}
                      {/* {this.state.oversped_time.split('/')[0]}
                      <font> {t("summary_37")}</font>
                      {" " + this.state.oversped_time.split('/')[1]}
                      <font> {t("summary_38")}</font> */}
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

          <Row>
            <div className="col-md-12" style={{ marginBottom: -5, marginTop: -15 }}>
              <div className="ibox float-e-margins">
                <div className="ibox-title" >
                  <Row>
                    <Col lg={8}>
                      <label style={{ fontWeight: "bold", fontSize: 18 }}> {t('summary_73')}</label>
                      {/* <Row style={{ paddingRight: 5, paddingLeft: 5 }}>
                      </Row> */}
                    </Col>
                    {/* <Col lg={4} style={{ textAlign: "right" }}>
                      <label style={{ fontWeight: "bold", fontSize: 18, }}> Select Date Range ></label>
                    </Col> */}
                    <Col lg={4}>

                      {/* <Row style={{ paddingRight: 5, paddingLeft: 5 }}> */}
                      {/* <div className="ibox float-e-margins"> */}
                      {/* <FormDatePicker_DB
                        select_change={this.onApplyEvent.bind(this)}
                        maxDate={this.state.eDate}>
                      </FormDatePicker_DB> */}
                      {/* </div> */}
                      {/* </Row> */}
                    </Col>
                  </Row>
                </div>
              </div>
            </div>

          </Row>

          <Row>
            <Col lg={12} style={{ paddingLeft: 5, marginBottom: -5, marginTop: - 15 }}>
              <div style={{ position: 'relative', width: '100%', height: "calc(98vh)", }}>

                <LoadScriptNext id="script-loader" googleMapsApiKey={"AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&libraries=geometry"}>
                  <Map dashboardHidden={true} event={this.state.event} customer_data={this.state.customer_data} utilizationday={this.state.utilizationday} dataOverlayPanel={this.state.dataOverlayPanel} date={this.state.serieclick} start_date={this.start_date} end_date={this.state.end_date} />
                </LoadScriptNext>

              </div>
            </Col>
          </Row>
        </div>
      );
    }
  }

}

const mapStateToProps = (state) => {
  return {
    // request_signin: state.auth.request_signin,
    language: state.versatile.language,
    menuUser: state.signin.menuUser,
    dataLogin: state.signin.dataLogin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // signin: (email, password) => dispatch(AuthActions.signin(email, password)),

  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(dashboardreport))

import React, { Suspense } from 'react'
import Swal from 'sweetalert2'
// import $ from "jquery";
import { SelectBox } from 'devextreme-react';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './table.css';
import { CommonAxisSettingsLabel } from "devextreme-react/chart";
import DatepickerCustom from './datepicker-custom';
import Radarchart from './Radarchart';
import ReportApplicationusage from './ReportApplicationusage';
import ReportDealerhistory from './ReportDealerhistory';
import ReportInput8 from './ReportInput8';
import Reportinventoryvehiclelastengineon from './Reportinventoryvehiclelastengineon';
import Reportinventoryvehiclemovementhistory from './Reportinventoryvehiclemovementhistory';
import Reportmydriver from './Reportmydriver';
import Reportmydriversummary from './Reportmydriversummary';
import Reportmydrivertripdetail from './Reportmydrivertripdetail';
import Reportmyvehicle from './Reportmyvehicle';
import Reportmyvehiclesummary from './Reportmyvehiclesummary-Waittt';
import Reportmyvehicletrip from './Reportmyvehicletrip';
import Reportpromotion from './Reportpromotion';
import Reportpromotionhistory from './Reportpromotionhistory';
import ReportUtilization from './ReportUtilization';
import Reportvehicleallocationstockaging from './Reportvehicleallocationstockaging';
import Reportvehiclehasenteredandleft from './Reportvehiclehasenteredandleft';
import ReportVehiclelastengine from './ReportVehiclelastengine';
import Reportvehiclepartlifetime from './Reportvehiclepartlifetime';
import Reportvehicleutilization from './Reportvehicleutilization';
import RPMhistogram from './RPMhistogram';
import ScatterGraph from './ScatterGraph';
import Speedhistogram from './Speedhistogram';
import Messagesdelivery from './Messagesdelivery';
import Throttlehistogram from './Throttlehistogram';
import UserAuthentication from './UserAuthentication';
import DrivingSummary from './DrivingSummary';
import DriveSummary from './DriveSummary';
import OverSpeedLimitSummary from './OverSpeedLimitSummary';
import ExcessiveIdleSummary from './ExcessiveIdleSummary';
import ExcessiveParkingSummary from './ExcessiveParkingSummary';
import OverspeedReport from './OverspeedReport';
import Table from '../../Components/DataGridView/Table.js'
import TimePicker from 'react-bootstrap-time-picker';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment'

import SpeedLimitExceeded from './reportDepartment/SpeedLimitExceeded';
import Exceeded4hourOngoingDriving from './reportDepartment/Exceeded4hourOngoingDriving';
import Exceeded8hourOngoingDriving from './reportDepartment/Exceeded8hourOngoingDriving';
import Exceeded5hourOngoingDriving from './reportDepartment/Exceeded5hourOngoingDriving';
import Exceeded10hourOngoingDriving from './reportDepartment/Exceeded10hourOngoingDriving';


import DriverUnidentified from './reportDepartment/DriverUnidentified';
import MisuseofDrivingLicenseType from './reportDepartment/MisuseofDrivingLicenseType';
import IncidenceofGPSUnitRemoved from './reportDepartment/IncidenceofGPSUnitRemoved';
import SummaryBehavior from './Activity/SummaryBehavior';
import SummaryBehaviorByDriver from './Activity/SummaryBehaviorByDriver';

import ReportParkingPavement from './Activity/ReportParkingPavement';
import ReportAlarmOver3Time from './Activity/ReportAlarmOver3Time';

import RedZoneReport from './VehicleUsage/RedZoneReport';
import TripSummary from "./VehicleUsage/TripSummary";
import StationTripSummary from "./VehicleUsage/StationTripSummary";
import ReportSummaryWaypoint from "./VehicleUsage/ReportSummaryWaypoint";
import ReportSummaryForbiddenPoint from "./VehicleUsage/ReportSummaryForbiddenPoint";
import OverSpeedLimitOnelink from "./Activity/OverSpeedLimitOnelink";
// import Fuel from "./CostAnalysis/Fuel";
import Fuel from "./CostAnalysis/Fuell";
import PieChart from "./CostAnalysis/PieChart";
import Thermometer from "./CostAnalysis/Thermometer";
import { Row, Col, ButtonGroup, Button } from 'reactstrap';
import DrivingSummaryOL from '../Report/VehicleUsage/DrivingSummaryOL'
import { ENDPOINT_BASE_URL, ENDPOINT_SETTING_REPORT_BASE_URL } from '../../Config/app-config';
import OverSpeedOL from '../Report/Activity/OverSpeedOL'
import ExceedIePK from '../Report/Activity/ExceedIePK'

import { connect } from 'react-redux'
import { t } from '../../Components/Translation'


// import Thermometer from "../EcoTree/thermometer/Thermometer";
import { forEach, prop } from "ramda";

import FormSelect from '../../Components/FormControls/Basic/FormSelect'
import FormSelectGroup from '../../Components/FormControls/Basic/FormSelectGroup'
import TripSummaryOL from './VehicleUsage/TripSummaryOL';
import ExceedIeOL from './Activity/ExceedIeOL';
import FormDatePicker_dev from '../../Components/FormControls/FormDatepickerNew';

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}
function handleErrors(response) {
  if (!response.ok)
    throw Error(response.statusText);
  return response;
}

class LayoutReport extends React.Component {
  constructor(props) {
    super(props)
    this.selectedRow = []
    this.selectedDealer = React.createRef();
    this.selectedFleet = React.createRef();
    this.selectBox = React.createRef()
    this.selectedReport = React.createRef();
    this.DateForm = React.createRef();
    this.TimeForm = React.createRef();
    this.DateTo = React.createRef();
    this.TimeTo = React.createRef();
    this.Speed = React.createRef();
    this.Idling = React.createRef();
    this.Engine = React.createRef();
    this.Usage = React.createRef();
    this.selectedDay = React.createRef();
    this.selectedMonth = React.createRef();
    this.selectedYear = React.createRef();
    this.handleDateStartChange = this.handleDateStartChange.bind(this);
    this.handleTimeStartChange = this.handleTimeStartChange.bind(this);
    this.handleDateEndChange = this.handleDateEndChange.bind(this);
    this.handleTimeEndChange = this.handleTimeEndChange.bind(this);

    this.select_report_filter = this.select_report_filter.bind(this)
    this.fetchVehicleType = this.fetchVehicleType.bind(this)
    this.tableInitial = this.tableInitial.bind(this)
    this.selectedCallback = this.selectedCallback.bind(this)
    const nowDate = new Date((new Date()).setHours(0, 0, 0, 0))
    this.onDealerChanged = this.onDealerChanged.bind(this);
    this.onCustomerChanged = this.onCustomerChanged.bind(this);

    // this.sizes = ["Please select the page",
    //   "001-DrivingSummary",
    //   "002-DriveSummary",
    //   "003-OverSpeedLimitSummary",
    //   "004-ExcessiveIdleSummary",
    //   "005-ExcessiveParkingSummary",
    //   "006-OverspeedReport",
    //   "007-SpeedLimitExceeded",
    //   "008-Exceeded4hourOngoingDriving",
    //   "009-Exceeded8hourOngoingDriving",
    //   "026-Exceeded5hourOngoingDriving",
    //   "027-Exceeded10hourOngoingDriving",
    //   "010-DriverUnidentified",
    //   "011-MisuseofDrivingLicenseType",
    //   "012-IncidenceofGPSUnitRemoved",
    //   "013-SummaryBehavior",
    //   "014-SummaryBehaviorByDriver",

    //   "016-ReportParkingPavement",
    //   "017-ReportAlarmOver3Time",

    //   "018-RedZoneReport",
    //   "019-TripSummary",
    //   "020-TripSummary",
    //   "021-ReportSummaryWaypoint",
    //   "022-ReportSummaryForbiddenPoint",
    //   "023-Fuel",
    //   "024-PieChart",




    //   "025-Thermometer",


    //   "002-UserAuthentication",
    //   "003-Radarchart",
    //   "004-ReportApplicationusage",
    //   "005-RPMhistogram",
    //   "006-ScatterGraph",
    //   "007-Speedhistogram",
    //   "008-ReportDealerhistory",
    //   "009-ReportInput8",
    //   "010-Reportinventoryvehiclelastengineon",
    //   "011-Reportinventoryvehiclemovementhistory",
    //   "012-Reportmydriver",
    //   "013-Reportmydriversummary",
    //   "014-Reportmydrivertripdetail",
    //   "015-Reportmyvehicle",
    //   "016-Reportmyvehiclesummary",
    //   "017-Reportmyvehicletrip",
    //   "018-Reportpromotion",
    //   "019-Reportpromotionhistory",
    //   "020-ReportUtilization",
    //   "021-Reportvehicleallocationstockaging",
    //   "022-Reportvehiclehasenteredandleft",
    //   "023-ReportVehiclelastengine",
    //   "024-Reportvehiclepartlifetime",
    //   "025-Reportvehicleutilization",
    //   "026-Throttlehistogram"
    // ]
    this.state = {
      isLoadingcust: true,
      isLoadingvehicle: true,
      reportname: '',
      timeStart: 0,
      timeEnd: 85500,
      dateStart: nowDate,
      dateEnd: nowDate,
      strDataTime: { start: nowDate, end: (nowDate.getTime() + 85500000) },
      update: 0,
      Speed: 2,
      Idling: 2,
      Engine: 2,
      Usage: 2,
      // value: this.sizes[0],
      vehicle_type: [],
      dealer: [],
      fleet: [],
      vehicle: [],
      customer: [],
      selected_vehicle_type: 0,
      selected_dealer: 0,
      selected_fleet: 'please select fleet',
      selected_report: 0,
      show_report: 0,
      selected_vehicle: [],
      add: false,
      setting: false,
      check: false,
      vehicle_type_seleted: 'Please select type',
      selected_dealer: 'Please select dealer',
      selected_customer: 'Please select customer',
      vehicle_type_seletedReport: 'Please Select Report Type',
      vehicle_type_seletedFleet: 'Please select fleet',
      data: [],
      startDate: "",
      endDate: "",
      ReportView: "",
      customer_data: [],
      column: [{
        column_name: 'vin_no',
        column_caption: "other_reports_18"
      }, {
        column_name: 'vehicle_name',
        column_caption: "other_reports_19"
      }, {
        column_name: 'model_code',
        column_caption: "other_reports_21"
      }, {
        column_name: 'fleet_id',
        column_caption: "other_reports_22"
      },],

    };
    this.customer_data()
    this.loadvehicle()
    this.selectedFormdate = ""
    this.selectedFormtime = ""
    this.selectedTodate = ""
    this.selectedTotime = ""
    this.EditSpeed = this.EditSpeed.bind(this)
    this.EditIdling = this.EditIdling.bind(this)
    this.EditEngine = this.EditEngine.bind(this)
    this.EditUsage = this.EditUsage.bind(this)
    this.onVehicleTypeChanged = this.onVehicleTypeChanged.bind(this);
    this.onDealerChanged = this.onDealerChanged.bind(this);
    this.onFleetChanged = this.onFleetChanged.bind(this);
    this.onReportChanged = this.onReportChanged.bind(this);
    this.getContainer = this.getContainer.bind(this)
    this.changeContainer = this.changeContainer.bind(this)
    this.Formdate = this.Formdate.bind(this)
    this.Formtime = this.Formtime.bind(this)
    this.Todate = this.Todate.bind(this)
    this.Totime = this.Totime.bind(this)
    this.gomain = this.gomain.bind(this)
    this.goadd = this.goadd.bind(this)
    this.ReportCallBack = this.ReportCallBack.bind(this)
    // this.setShowReport = this.setShowReport.bind(this)

    if (this.props.dataLogin.userLevelId > 40) {
      this.customer_mode = true
      this.load_manage_customer()

    } else {
      this.dealer_mode = true
      this.load_manage_dealer()
    }

  }


  async customer_data() {
    var userId = this.props.dataLogin.userId
    var object = {
      userId: userId
    }
    // var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/get_manage_customer"
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
    this.setState({
      customer_data: responseJson,
      isLoadingcust: false
    })
  }

  async loaddealer() {
    // var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/getDealer"
    var api = ENDPOINT_BASE_URL + "fleet/getDealer"
    var response = await fetch(api, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }

    });
    var responseJson = await response.json();
    this.setState({
      dealer: responseJson
    }, () => {

    })
  }
  async fetchVehicleType() {
    // var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/getVehicleType"
    var api = ENDPOINT_BASE_URL + "fleet/getVehicleType"
    var response = await fetch(api, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }

    });
    var responseJson = await response.json();
    //console.log(responseJson);
    this.setState({
      vehicle_type: responseJson
    }
    )
  }
  handleDateStartChange(event, picker) {
    let dateStart = moment(picker.startDate)

    let sta = {
      dateStart
    }

    // //console.log(dateStart.isBefore(this.state.dateEnd))
    if (!(dateStart.isBefore(this.state.dateEnd))) sta.dateEnd = dateStart
    this.setState(sta);
    // //console.log("START", dateStart)
    // //console.log("START", dateStart._i)
  }

  handleTimeStartChange(timeStart) {
    this.setState({ timeStart });
  }

  handleDateEndChange(event, picker) {
    let dateEnd = moment(picker.startDate)
    this.setState({ dateEnd });
    // //console.log("END", dateEnd)
    // //console.log("END", dateEnd._i)
  }

  handleTimeEndChange(timeEnd) {
    //console.log(timeEnd)
    this.setState({ timeEnd });
  }

  selectedCallback(e) {
    //console.log(e)
    this.selectedRow = e.selectedRowsData;
  }
  tableInitial(datagridinstance) {
    this.datagridinstance = datagridinstance
  }
  onVehicleTypeChanged(e) {
    //console.log(e.target.value);
    this.setState({
      selected_vehicle_type: e.target.value,
    }, () => {
      ////console.log(e.target.value);
      this.loadvehicle()
    });
  }
  onDealerChanged(e) {
    this.setState({
      selected_dealer: e,
      customer: [],
      selected_customer: 'Please select customer name'
    }, () => {
      this.loadcustomer()
      this.loaddriver()
    });
  }
  onCustomerChanged(e) {
    this.setState({
      selected_customer: e,
    }, () => {
      this.loaddriver()
    });
  }
  onFleetChanged(e) {
    this.setState({
      selected_fleet: e.target.value,
    }, () => {
      this.loadvehicle()
    });
  }
  onReportChanged(e) {

    this.setState({
      selected_report: e.target.value
    })
    //console.log(e)
  }
  changeContainer() {
    this.setState({
      update: this.state.update + 1
    });
  }
  EditSpeed(e) {
    this.setState({
      Speed: e.target.value
    })
  }
  EditIdling(e) {
    this.setState({
      Idling: e.target.value
    })
  }
  EditEngine(e) {
    this.setState({
      Engine: e.target.value
    })
  }
  EditUsage(e) {
    this.setState({
      Usage: e.target.value
    })
  }



  goadd() {
    if (this.selectedRow.length == 0) {
      Swal.fire('Failed', 'Please select Vehicle ', 'error')
      return
    }
    if (this.state.vehicle_type_seletedReport == 'Please Select Report Type') {
      Swal.fire('Failed', 'Please select Report Type', 'error')
      return
    }
    var id = []
    this.selectedRow.forEach((element) => {
      id.push(element.int_vehicle_id)
      this.setState({
        data: id,
        add: true,
        ReportView: ""
      })
    })

  }
  gomain() {
    if (this.state.ReportView == "") {
      this.setState({
        add: false
      })
    }
    if (this.state.ReportView == "Detail") {
      this.setState({
        add: true,
        ReportView: ""
      })
    }
  }

  ReportCallBack(e) {
    //console.log(e)
    if (e == 'Detail') {
      this.setState({
        ReportView: 'Detail'
      })
    }
  }










  getContainer(source) {
    //console.log(source)
    //console.log(this.selectedFormdate)
    //console.log(this.selectedFormtime)
    //console.log(this.selectedTodate)
    //console.log(this.selectedTotime)


    var params = {
      selectedTotime: this.selectedTotime,
      selectedTodate: this.selectedTodate,
      selectedFormdate: this.selectedFormdate,
      selectedFormtime: this.selectedFormtime,
      selectedVehicle: this.selectedRow,
    }
    switch (source) {

      // case "003-Radarchart":
      //   return (<div><Radarchart></Radarchart></div>);
      // case "004-ReportApplicationusage":
      //   return (<div><ReportApplicationusage></ReportApplicationusage></div>);
      // case "008-ReportDealerhistory":
      //   return (<div><ReportDealerhistory></ReportDealerhistory></div>);
      // case "009-ReportInput8":
      //   return (<div><ReportInput8></ReportInput8></div>);
      // case "010-Reportinventoryvehiclelastengineon":
      //   return (<div><Reportinventoryvehiclelastengineon></Reportinventoryvehiclelastengineon></div>);
      // case "011-Reportinventoryvehiclemovementhistory":
      //   return (<div><Reportinventoryvehiclemovementhistory></Reportinventoryvehiclemovementhistory></div>);
      // case "012-Reportmydriver":
      //   return (<div><Reportmydriver></Reportmydriver></div>);
      // case "013-Reportmydriversummary":
      //   return (<div><Reportmydriversummary></Reportmydriversummary></div>);
      // case "014-Reportmydrivertripdetail":
      //   return (<div><Reportmydrivertripdetail></Reportmydrivertripdetail></div>);
      // case "015-Reportmyvehicle":
      //   return (<div><Reportmyvehicle></Reportmyvehicle></div>);
      // case "016-Reportmyvehiclesummary":
      //   return (<div><Reportmyvehiclesummary></Reportmyvehiclesummary></div>);
      // case "017-Reportmyvehicletrip":
      //   return (<div><Reportmyvehicletrip></Reportmyvehicletrip></div>);
      // case "018-Reportpromotion":
      //   return (<div><Reportpromotion></Reportpromotion></div>);
      // case "019-Reportpromotionhistory":
      //   return (<div><Reportpromotionhistory></Reportpromotionhistory></div>);
      // case "020-ReportUtilization":
      //   return (<div><ReportUtilization></ReportUtilization></div>);
      // case "021-Reportvehicleallocationstockaging":
      //   return (<div><Reportvehicleallocationstockaging></Reportvehicleallocationstockaging></div>);
      // case "022-Reportvehiclehasenteredandleft":
      //   return (<div><Reportvehiclehasenteredandleft></Reportvehiclehasenteredandleft></div>);
      // case "023-ReportVehiclelastengine":
      //   return (<div><ReportVehiclelastengine></ReportVehiclelastengine></div>);
      // case "024-Reportvehiclepartlifetime":
      //   return (<div><Reportvehiclepartlifetime></Reportvehiclepartlifetime></div>);
      // case "025-Reportvehicleutilization":
      //   return (<div><Reportvehicleutilization></Reportvehicleutilization></div>);
      // case "026-Throttlehistogram":
      //   return (<div><Throttlehistogram></Throttlehistogram></div>);


      case "101 - Driving Summary":
        return (<div><DrivingSummaryOL params={params} data={this.state.data} customer_data={this.state.customer_data} startDate={this.state.startDate} endDate={this.state.endDate} ReportCallBack={this.ReportCallBack}></DrivingSummaryOL></div>);
      case "002 - DriveSummary":
        return (<div><DriveSummary params={params}></DriveSummary></div>);
      case "001-DrivingSummary":
        return (<div><DrivingSummary></DrivingSummary></div>);
      case "002-UserAuthentication":
        return (<div><UserAuthentication></UserAuthentication></div>);
      case "201 - Over Speed Limit":
        return (<div><OverSpeedOL params={params} data={this.state.data} customer_data={this.state.customer_data} startDate={this.state.startDate} endDate={this.state.endDate} ReportCallBack={this.ReportCallBack}></OverSpeedOL></div>);
      case "202 - Excessive Idle":
        return (<div><ExceedIeOL params={params} data={this.state.data} customer_data={this.state.customer_data} startDate={this.state.startDate} endDate={this.state.endDate} ReportCallBack={this.ReportCallBack}></ExceedIeOL></div>);
      case "203 - Excessive Parking":
        return (<div><ExceedIePK params={params} data={this.state.data} customer_data={this.state.customer_data} startDate={this.state.startDate} endDate={this.state.endDate} ReportCallBack={this.ReportCallBack}></ExceedIePK></div>);
      case "006 - OverspeedReport":
        return (<div><OverspeedReport Speed Limit params={params}></OverspeedReport></div>);

      case "301 - DLT Driving Over Speed Summary":
        return (<div><SpeedLimitExceeded params={params} data={this.state.data} customer_data={this.state.customer_data} startDate={this.state.startDate} endDate={this.state.endDate} ReportCallBack={this.ReportCallBack}></SpeedLimitExceeded></div>);
      case "302 - DLT Driving Over 4 H Summary":
        return (<div><Exceeded4hourOngoingDriving params={params} data={this.state.data} customer_data={this.state.customer_data} startDate={this.state.startDate} endDate={this.state.endDate} ReportCallBack={this.ReportCallBack}></Exceeded4hourOngoingDriving></div>);
      case "303 - DLT Driving Over 8 H Summary":
        return (<div><Exceeded8hourOngoingDriving params={params} data={this.state.data} customer_data={this.state.customer_data} startDate={this.state.startDate} endDate={this.state.endDate} ReportCallBack={this.ReportCallBack}></Exceeded8hourOngoingDriving></div>);
      case "027 - Exceeded10hourOngoingDriving":
        return (<div><Exceeded10hourOngoingDriving params={params} data={this.state.data} customer_data={this.state.customer_data}></Exceeded10hourOngoingDriving></div>);
      case "304 - DLT Not Swipe Driver Licens Summary":
        return (<div><DriverUnidentified params={params} data={this.state.data} customer_data={this.state.customer_data} startDate={this.state.startDate} endDate={this.state.endDate} ReportCallBack={this.ReportCallBack}></DriverUnidentified></div>);
      case "305 - DLT Unmached Driving License Type Summary":
        return (<div><MisuseofDrivingLicenseType params={params} data={this.state.data} customer_data={this.state.customer_data} startDate={this.state.startDate} endDate={this.state.endDate} ReportCallBack={this.ReportCallBack}> </MisuseofDrivingLicenseType></div>);
      case "306 - DLT GPS Unplugged Detail":
        return (<div><IncidenceofGPSUnitRemoved params={params} data={this.state.data} customer_data={this.state.customer_data} startDate={this.state.startDate} endDate={this.state.endDate} ReportCallBack={this.ReportCallBack}> </IncidenceofGPSUnitRemoved></div>);
      case "013 - SummaryBehavior":
        return (<div><SummaryBehavior params={params}></SummaryBehavior></div>);
      case "014 - SummaryBehaviorByDriver":
        return (<div><SummaryBehaviorByDriver params={params}></SummaryBehaviorByDriver></div>);

      case "016 - ReportParkingPavement":
        return (<div><ReportParkingPavement params={params}></ReportParkingPavement></div>);
      case "017 - ReportAlarmOver3Time":
        return (<div><ReportAlarmOver3Time params={params}></ReportAlarmOver3Time></div>);

      case "018 - RedZoneReport":
        return (<div><RedZoneReport params={params}></RedZoneReport></div>);
      case "019 - TripSummary":
        return (<div><TripSummaryOL params={params}></TripSummaryOL></div>);
      case "020 - StationTripSummary":
        return (<div><StationTripSummary params={params}></StationTripSummary></div>);
      case "021 - ReportSummaryWaypoint":
        return (<div><ReportSummaryWaypoint params={params}></ReportSummaryWaypoint></div>);
      case "022 - ReportSummaryForbiddenPoint":
        return (<div><ReportSummaryForbiddenPoint params={params}></ReportSummaryForbiddenPoint></div>);

      case "024 - PieChart":
        return (<div><PieChart params={params}></PieChart></div>);
      case "023 - Fuel":
        return (<div><Fuel params={params}></Fuel></div>);
      case "003-Radarchart":
        return (<div><Radarchart></Radarchart></div>);
      case "004-ReportApplicationusage":
        return (<div><ReportApplicationusage></ReportApplicationusage></div>);
      case "005-RPMhistogram":
        return (<div><RPMhistogram></RPMhistogram></div>);
      case "006-ScatterGraph":
        return (<div><ScatterGraph></ScatterGraph></div>);
      case "007-Speedhistogram":
        return (<div><Speedhistogram></Speedhistogram></div>);
      case "008-ReportDealerhistory":
        return (<div><ReportDealerhistory></ReportDealerhistory></div>);
      case "009-ReportInput8":
        return (<div><ReportInput8></ReportInput8></div>);
      case "010-Reportinventoryvehiclelastengineon":
        return (<div><Reportinventoryvehiclelastengineon></Reportinventoryvehiclelastengineon></div>);
      case "011-Reportinventoryvehiclemovementhistory":
        return (<div><Reportinventoryvehiclemovementhistory></Reportinventoryvehiclemovementhistory></div>);
      case "012-Reportmydriver":
        return (<div><Reportmydriver></Reportmydriver></div>);
      case "013-Reportmydriversummary":
        return (<div><Reportmydriversummary></Reportmydriversummary></div>);
      case "014-Reportmydrivertripdetail":
        return (<div><Reportmydrivertripdetail></Reportmydrivertripdetail></div>);
      case "015-Reportmyvehicle":
        return (<div><Reportmyvehicle></Reportmyvehicle></div>);
      case "016-Reportmyvehiclesummary":
        return (<div><Reportmyvehiclesummary></Reportmyvehiclesummary></div>);
      case "017-Reportmyvehicletrip":
        return (<div><Reportmyvehicletrip></Reportmyvehicletrip></div>);
      case "018-Reportpromotion":
        return (<div><Reportpromotion></Reportpromotion></div>);
      case "019-Reportpromotionhistory":
        return (<div><Reportpromotionhistory></Reportpromotionhistory></div>);
      case "020-ReportUtilization":
        return (<div><ReportUtilization></ReportUtilization></div>);
      case "021-Reportvehicleallocationstockaging":
        return (<div><Reportvehicleallocationstockaging></Reportvehicleallocationstockaging></div>);
      case "022-Reportvehiclehasenteredandleft":
        return (<div><Reportvehiclehasenteredandleft></Reportvehiclehasenteredandleft></div>);
      case "023-ReportVehiclelastengine":
        return (<div><ReportVehiclelastengine></ReportVehiclelastengine></div>);
      case "024-Reportvehiclepartlifetime":
        return (<div><Reportvehiclepartlifetime></Reportvehiclepartlifetime></div>);
      case "025-Reportvehicleutilization":
        return (<div><Reportvehicleutilization></Reportvehicleutilization></div>);
      case "026-Throttlehistogram":
        return (<div><Throttlehistogram></Throttlehistogram></div>);
      case "005-RPMhistogram":
        return (<div><RPMhistogram></RPMhistogram></div>);

      case "028-ExceedIeOL":
        return (<div><ExceedIeOL></ExceedIeOL></div>);









      default:
        return (<div></div>)
    }

  }
  // samplefunction() {
  //   //console.log(this.sampledate.current.value);
  // }
  Formdate() {
    this.selectedFormdate = this.DateForm.current.value
  }
  Formtime() {
    this.selectedFormtime = this.TimeForm.current.value
  }
  Todate() {
    this.selectedTodate = this.DateTo.current.value
  }
  Totime() {
    this.selectedTotime = this.TimeTo.current.value
  }

  async load_manage_dealer() {
    var userId = this.props.dataLogin.userId
    // var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/get_dealer_by_manage"
    var api = ENDPOINT_BASE_URL + "fleet/get_dealer_by_manage"
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
    this.setState({
      dealer: responseJson
    }, () => {

    })
  }

  async loadcustomer() {
    var userId = this.props.dataLogin.userId
    var object = {
      userId: userId,
      dealer_id: this.state.selected_dealer
    }
    //console.log(object);
    // var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/get_customer"
    var api = ENDPOINT_BASE_URL + "fleet/get_customer"
    var response = await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)
    });
    var responseJson = await response.json();
    //console.log(responseJson);
    this.setState({
      customer: responseJson
    }, () => {

    })
  }
  async load_manage_customer() {
    var userId = this.props.dataLogin.userId
    // var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/get_customer_by_manage"
    var api = ENDPOINT_BASE_URL + "fleet/get_customer_by_manage"
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
    this.setState({
      customer: responseJson
    }, () => {

    })
  }

  async fetch_customer_without_dealer() {
    var userId = this.props.dataLogin.userId
    var object = {
      userId: userId,
    }
    //console.log(object);
    var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/get_customer"
    var response = await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)
    });
    var responseJson = await response.json();
    //console.log(responseJson);
    this.setState({
      customer: responseJson
    }, () => {

    })
  }

  // setShowReport() {
  //   //console.log(this.state.selected_report)
  //   //console.log(this.selectedRow);
  //   window.open('https://google.com?vid=' + JSON.stringify(this.selectedRow) + '&key=' + this.state.selected_report)
  // }


  componentDidMount() {
    //console.log(this.dealer_mode, this.customer_mode);
    if (this.dealer_mode == true) {
      //console.log('initial dealer fetch');
      this.fetch_dealer()
    } else {
      //console.log('initial customer fetch');
      this.fetch_customer_without_dealer()
    }
    this.fetchVehicleType()
  }

  async loadvehicle() {
    var userId = this.props.dataLogin.userId
    var object = {
      userId: userId,
    }
    // var dealer_id = this.state.selected_dealer;
    // var vehicle_type = this.state.selected_vehicle_type;
    // var fleet_id = this.state.selected_fleet;
    // var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/getallvehicle"
    var api = ENDPOINT_BASE_URL + "fleet/getallvehicle"
    // var object = {
    //   type_id: vehicle_type,
    //   fleet_id: fleet_id,
    //   dealer_id: dealer_id
    // }
    var response = await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)

    });
    var responseJson = await response.json();
    //console.log(responseJson);
    this.setState({
      vehicle: responseJson.vehicle,
      isLoadingvehicle: false
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

  select_report_filter(key) {
    this.state.new_report.forEach((element, i) => {
      element.items.forEach((subelement, i) => {
        //console.log(key == subelement.key);
        if (key == subelement.key) {
          //console.log('wow')
          return (<span>{subelement.value}</span>)
        }
      })
    })
  }

  onApplyEvent(dataObject) {
    this.setState({
      startDate: dataObject.startDate.format('YYYY/MM/DD'),
      endDate: dataObject.endDate.format('YYYY/MM/DD')
    }, () => {
      //console.log(dataObject.startDate)
      //console.log(dataObject.endDate)
      //console.log(this.state.startDate)
      //console.log(this.state.endDate)
    })
  }

  render() {
    //console.log("this.state.vehicle : ", this.state.vehicle)
    //console.log("this.state.vehicle : ", JSON.stringify(this.state.vehicle))
    if (this.state.isLoadingcust && this.state.isLoadingvehicle == true) {
      return (
        <div></div>
      )
    }
    if (this.state.add == true) {
      return (
        <div>
          <div className="row">
            <div className="col-lg-12">
              <div className="ibox ">
                <div className="ibox-title" style={{ padding: '15px 20px 10px 15px' }}>
                  <div className="row">
                    <div className="col-lg-8">
                      <h3 style={{ marginTop: 5, fontSize: 18 }}>Report / {this.state.vehicle_type_seletedReport}  </h3>
                    </div>
                    <div className="col-lg-4" style={{ textAlign: 'right' }}>
                      <button onClick={this.gomain.bind(this)} className="btn" style={{ backgroundColor: 'gray', color: 'white', marginBottom: 5, marginLeft: 10 }}><i className="fa fa-chevron-circle-left" aria-hidden="true" ></i> Back</button>
                    </div>
                  </div>
                </div>
                <div className="ibox-content" style={{ padding: '15px 20px 5px 20px' }}>

                  <div className="form-group row">
                    <div className="col-lg-12">

                      {this.getContainer(this.state.vehicle_type_seletedReport)}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      )
    }
    return (
      <Suspense fallback={null}>
        <div>
          <div className="row">
            <div className="col-lg-12">
              <div className="ibox ">
                <div className="ibox-title" style={{ padding: '15px 20px 10px 15px' }}>
                  <div className="row">
                    <div className="col-lg-6">
                      <h3 style={{ marginTop: 5, fontSize: 18 }}>{t("other_reports_2")}</h3>
                    </div>
                    {/* <div className="col-lg-8" style={{ textAlign: 'right' }}>
                    <a style={{ margin: 0, backgroundColor: '#1ab394', color: 'white', marginLeft: 10 }} className="btn btn-default" ><i className="fa fa-filter" style={{ marginRight: 10 }}></i>Config Data</a>
                  </div> */}

                    {/* <div className="col-lg-8" style={{ textAlign: 'right' }}>
                    <a onClick={this.goadd.bind(this)}><button style={{ margin: 0, backgroundColor: '#1ab394', color: 'white' }} className="btn btn-default"  ><i className="fas fa-leaf" style={{ marginRight: 10 }}  ></i> Create report </button> </a>
                  </div> */}

                  </div>
                </div>
                <div className="ibox-content" style={{ padding: '15px 20px 5px 20px' }}>

                  <div className="form-group row">
                    <div className="col-lg-6">
                      {/* <label style={{ marginRight: 5 }} className="col-lg-6 col-form-label">ReportType</label>
                    <select ref={this.selectedReport} className="form-control" value={this.state.selected_report} onChange={this.onReportChanged}>
                      <option value={0}>All ReportType</option>
                      {this.state.new_report.map((element, i) => {
                        return (
                          <optgroup key={i} label={element.groupName}>
                            {element.items.map((option, j) => {
                              return (
                                <option key={j} value={option.key} >{option.value}</option>
                              )
                            })}
                          </optgroup>
                        )
                      })}
                    </select> */}
                      <FormSelectGroup
                        mode={"single"}  //mode : (single/multiple)
                        value={this.state.vehicle_type_seletedReport}  //single = "key" , multiple = [key]
                        label={"other_reports_3"}
                        list={[
                          {
                            groupName: 'VehicleUsage',
                            items: [
                              {
                                key: "101 - Driving Summary",
                                value: '  101 - Driving Summary',
                              },
                              // {
                              //   key: '018 - RedZoneReport',
                              //   value: '  2 - Hazard Zone Report',
                              // },
                              // {
                              //   key: '019 - TripSummary',
                              //   value: ' 3 - Trip Summary',
                              // }, {
                              //   key: '020 - StationTripSummary',
                              //   value: '4 - Station Trip Summary',
                              // },
                              // {
                              //   key: '002 - DriveSummary',
                              //   value: '5 - Drive Summary',
                              // },
                            ]
                          },
                          {
                            groupName: 'Activity',
                            items: [
                              {
                                key: "201 - Over Speed Limit",
                                value: '201 - Over Speed Limit'
                              },
                              {
                                key: "202 - Excessive Idle",
                                value: '202 - Excessive Idle'
                              },
                              {
                                key: "203 - Excessive Parking",
                                value: '203 - Excessive Parking'
                              },
                              // {
                              //   key: '013 - SummaryBehavior',
                              //   value: '9 - Summary Behavior'
                              // },
                              // {
                              //   key: '014 - SummaryBehaviorByDriver',
                              //   value: '10 -  Summary Behavior By Driver'
                              // },
                            ],
                          },
                          // {
                          //   groupName: 'Cost Analusis',
                          //   items: [
                          //     {
                          //       key: '023 - Fuel',
                          //       value: '11 - Fuel'
                          //     },
                          //     {
                          //       key: '030 - NGVChart',
                          //       value: '12 - NGV Chart'
                          //     },
                          //     {
                          //       key: '031 - Speed',
                          //       value: '13 - Speed'
                          //     },
                          //     {
                          //       key: '024 - PieChart',
                          //       value: '14 - Pie Chart'
                          //     },
                          //   ],
                          // },
                          {
                            groupName: 'Reports the Department of Transport',
                            items: [{
                              key: "301 - DLT Driving Over Speed Summary",
                              value: "301 - DLT Driving Over Speed Summary"
                            }, {
                              key: '302 - DLT Driving Over 4 H Summary',
                              value: '302 - DLT Driving Over 4 H Summary'
                            }, {
                              key: '303 - DLT Driving Over 8 H Summary',
                              value: '303 - DLT Driving Over 8 H Summary'
                            },

                            {
                              key: '304 - DLT Not Swipe Driver Licens Summary',
                              value: '304 - DLT Not Swipe Driver Licens Summary'
                            },
                            {
                              key: '305 - DLT Unmached Driving License Type Summary',
                              value: '305 - DLT Unmached Driving License Type Summary'
                            },
                            {
                              key: '306 - DLT GPS Unplugged Detail',
                              value: '306 - DLT GPS Unplugged Detail'
                            },
                            ],
                            // }, {
                            //   groupName: 'HIno',
                            //   items: [{
                            //     key: '003-Radarchart',
                            //     value: '003-Radarchart'
                            //   }, {
                            //     key: '004-ReportApplicationusage',
                            //     value: '004-ReportApplicationusage'
                            //   }, {
                            //     key: '005-RPMhistogram',
                            //     value: '005-RPMhistogram'
                            //   }, {
                            //     key: '006-ScatterGraph',
                            //     value: '006-ScatterGraph'
                            //   }, {
                            //     key: '007-Speedhistogram',
                            //     value: '007-Speedhistogram'
                            //   }, {
                            //     key: '008-ReportDealerhistory',
                            //     value: '008-ReportDealerhistory'
                            //   }, {
                            //     key: '009-ReportInput8',
                            //     value: '009-ReportInput8'
                            //   }, {
                            //     key: '010-Reportinventoryvehiclelastengineon',
                            //     value: '010-Reportinventoryvehiclelastengineon'
                            //   }, {
                            //     key: '011-Reportinventoryvehiclemovementhistory',
                            //     value: '011-Reportinventoryvehiclemovementhistory'
                            //   }, {
                            //     key: '012-Reportmydriver',
                            //     value: '012-Reportmydriver'
                            //   }, {
                            //     key: '013-Reportmydriversummary',
                            //     value: '013-Reportmydriversummary'
                            //   }, {
                            //     key: '014-Reportmydrivertripdetail',
                            //     value: '014-Reportmydrivertripdetail'
                            //   }, {
                            //     key: '015-Reportmyvehicle',
                            //     value: '015-Reportmyvehicle'
                            //   }, {
                            //     key: '016-Reportmyvehiclesummary',
                            //     value: '016-Reportmyvehiclesummary'
                            //   },
                            //   {
                            //     key: '017-Reportmyvehicletrip',
                            //     value: '017-Reportmyvehicletrip'
                            //   },
                            //   {
                            //     key: '018-Reportpromotion',
                            //     value: '018-Reportpromotion'
                            //   },
                            //   {
                            //     key: '019-Reportpromotionhistory',
                            //     value: '019-Reportpromotionhistory'
                            //   },
                            //   {
                            //     key: '020-ReportUtilization',
                            //     value: '020-ReportUtilization'
                            //   },
                            //   {
                            //     key: '021-Reportvehicleallocationstockaging',
                            //     value: '021-Reportvehicleallocationstockaging'
                            //   }, {
                            //     key: '022-Reportvehiclehasenteredandleft',
                            //     value: '022-Reportvehiclehasenteredandleft'
                            //   }, {
                            //     key: '023-ReportVehiclelastengine',
                            //     value: '023-ReportVehiclelastengine'
                            //   }, {
                            //     key: '024-Reportvehiclepartlifetime',
                            //     value: '024-Reportvehiclepartlifetime'
                            //   }, {
                            //     key: '025-Reportvehicleutilization',
                            //     value: '025-Reportvehicleutilization'
                            //   }, {
                            //     key: '026-Throttlehistogram',
                            //     value: '026-Throttlehistogram'
                            //   },
                            //   ],
                          }]
                        }
                        placeholder={"ReportType"}
                        flex={1}
                        onChange={(selected) => {
                          //console.log(selected)
                          this.setState({
                            vehicle_type_seletedReport: selected
                          })
                        }}
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <FormSelect mode={"single"}   //mode : (single/multiple)
                          value={this.state.selected_fleet}  //single = "key" , multiple = [key]
                          label={"Fleet"}
                          list={this.state.fleet.map((element, i) => {
                            //console.log(element)
                            return { key: i, value: element.id, text: element.fleet_name }
                          })}
                          placeholder={"Fleet"}
                          flex={1}
                          onChange={(selected) => {
                            //console.log(selected)
                            this.setState({
                              selected_fleet: selected
                            })
                            this.onFleetChanged(selected)
                          }}>
                        </FormSelect>
                      </div>

                    </div>
                    {/* <div className="col-lg-6">
                      <FormSelect mode={"single"}   //mode : (single/multiple)
                        value={t("other_reports_6")}  //single = "key" , multiple = [key]
                        label={"other_reports_5"}
                        list={this.state.vehicle_type.map((element, i) => {
                          //console.log(element)
                          return { key: i, value: element.id, text: element.vehicle_type_name }
                        })}
                        placeholder={"ph_owner_partner_type"}
                        flex={1}
                        onChange={(selected) => {
                          //console.log(selected)
                          this.setState({
                            vehicle_type_seleted: selected
                          })
                        }}>
                      </FormSelect>
                    </div> */}
                  </div>
                  {this.dealer_mode == true && (
                    <div className="form-group row">

                      {/* <label className="col-lg-1 col-form-label" >Dealer :</label>
                    <div className="col-lg-4">
                      <select ref={this.selectedDealer} className="form-control" onChange={this.onDealerChanged} value={this.state.selected_dealer} >
                        <option value={0}>Select Dealer</option>
                        {this.state.dealer.map((element, i) => {
                          return (<option key={i} value={element.int_dealer_id}>{element.dealer_name}</option>)
                        })}
                      </select>
                    </div> */}
                      <div className="col-lg-6">
                        <FormSelect mode={"single"}   //mode : (single/multiple)
                          value={this.state.selected_dealer}  //single = "key" , multiple = [key]
                          label={"Dealer Name"}
                          list={this.state.dealer.map((element, i) => {
                            //console.log(element)
                            return { key: i, value: element.partner_id, text: ((element.prefix == null) ? '' : element.prefix) + ' ' + ((element.firstname == null) ? '' : element.firstname) + ' ' + ((element.lastname == null) ? '' : element.lastname) + ' ' + ((element.suffix == null) ? '' : element.suffix) }
                          })}
                          placeholder={"Dealer Name"}
                          flex={1}
                          onChange={(selected) => {
                            //console.log(selected)
                            this.setState({
                              selected_dealer: selected
                            })
                            this.onDealerChanged(selected)
                          }}>
                        </FormSelect>
                      </div>
                      {/* <label className="col-lg-1 col-form-label" >Customer :</label>
                    <div className="col-lg-4">
                      <select ref={this.selectedCustomer} className="form-control" value={this.state.selected_customer} onChange={this.onCustomerChanged}>
                        <option value={0}>Select Customer</option>
                        {this.state.customer.map((element, i) => {
                          return (<option key={i} value={element.int_cust_id}>{element.customer_name}</option>)
                        })}
                      </select>
                    </div> */}
                      <div className="col-lg-6">
                        <FormSelect mode={"single"}   //mode : (single/multiple)
                          value={t("other_reports_8")}  //single = "key" , multiple = [key]
                          label={"other_reports_7"}
                          list={this.state.customer.map((element, i) => {
                            //console.log(element)
                            return { key: i, value: element.int_cust_id, text: element.customer_name }
                          })}
                          placeholder={"Customer Name"}
                          flex={1}
                          onChange={(selected) => {
                            //console.log(selected)
                            this.setState({
                              selected_customer: selected
                            })
                            this.onCustomerChanged(selected)
                          }}>
                        </FormSelect>
                      </div>
                    </div>


                  )}
                  {this.customer_mode == true && (
                    <div className="form-group row">
                      <div className="col-lg-6">
                        <FormSelect mode={"single"}   //mode : (single/multiple)
                          value={t("other_reports_8")}  //single = "key" , multiple = [key]
                          label={"other_reports_7"}
                          list={this.state.customer.map((element, i) => {
                            //console.log(element)
                            return { key: i, value: element.int_cust_id, text: element.customer_name }
                          })}
                          placeholder={"Customer name"}
                          flex={1}
                          onChange={(selected) => {
                            //console.log(selected)
                            this.setState({
                              selected_customer: selected
                            })
                          }}>
                        </FormSelect>
                      </div>
                    </div>
                  )}

                  {/* <div className="form-group row">
                    <div className="col-lg-6" >
                      <label className="col-lg-6 col-form-label" >{t("date_Range")}</label>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-6"  >
                      <FormDatePicker_dev
                        select_change={this.onApplyEvent.bind(this)}  >
                      </FormDatePicker_dev>
                    </div>
                  </div> */}
                  <Row>
                    <Col lg={6}>
                      <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
                        <label className="control-label" style={{ fontWeight: 500 }}>
                          {t('date_Range')}
                        </label>
                        <FormDatePicker_dev
                          select_change={this.onApplyEvent.bind(this)}  >
                        </FormDatePicker_dev>
                      </div>
                    </Col>
                  </Row>

                  {/* <div className="row">
                  <label className="col-lg-1 col-form-label"></label>
                  <label className="col-lg-1 col-form-label">Display :</label>
                  <div className="col-sm-5 col-form-label">
                    <label className="radio-inline" ><input style={{ marginRight: 5 }} type="checkbox" name="optradio" />Box number</label>
                    <label className="radio-inline" style={{ marginLeft: 50 }}><input style={{ marginRight: 5 }} type="checkbox" name="optradio" />Car number</label>
                    <label className="radio-inline" style={{ marginLeft: 50 }}><input style={{ marginRight: 5 }} type="checkbox" name="optradio" />Lisenseplate</label>
                  </div>
                </div> */}
                  {/* <div className="row">
                    <div className="col-lg-12">
                      <label className="col-lg-1 col-form-label">Display  </label>
                    </div>
                    <div className="col-sm-5 form-group form-inline" style={{ margin: 10 }}>
                      <ButtonGroup  >
                        <Button className={'button-radio-checkbox btn-sm '} >Box number</Button>
                        <Button className={'button-radio-checkbox btn-sm '} >Car number</Button>
                        <Button className={'button-radio-checkbox btn-sm '} >Lisenseplate</Button>
                      </ButtonGroup>
                    </div>

                  </div> */}
                  <div className="ibox ">
                    <div className="row">
                      <div className="col-lg-2"></div>
                      <div className="col-lg-10" style={{ textAlign: 'Right' }}>
                        <a onClick={this.goadd.bind(this)}><button className="btn" style={{ marginRight: 10, backgroundColor: '#1AB394', color: 'white' }}><i className="far fa-file-alt" aria-hidden="true"  ></i> {t("other_reports_17")} </button> </a>
                      </div>
                    </div>
                  </div>


                </div>
                <div style={{ marginTop: 5 }} className="panel">
                  <div className="panel-body">
                    <Table
                      dataSource={this.state.vehicle}
                      mode={"offline"}
                      //serversideSource={'https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders'}
                      tableId={0}
                      user_id={0}
                      selectedCallback={this.selectedCallback}
                      initialCallback={this.tableInitial}
                      column={this.state.column}
                    >

                    </Table>

                  </div>
                </div>


              </div>
            </div>
          </div>

        </div >
      </Suspense>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    // request_signin: state.auth.request_signin,
    dataLogin: state.signin.dataLogin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // signin: (email, password) => dispatch(AuthActions.signin(email, password)),
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(LayoutReport))

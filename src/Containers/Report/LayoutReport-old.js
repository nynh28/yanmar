import React from "react";

// import $ from "jquery";

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './table.css';

import DrivingSummary from './DrivingSummary';
import DriveSummary from './DriveSummary';
import OverSpeedLimitSummary from './OverSpeedLimitSummary';
import ExcessiveIdleSummary from './ExcessiveIdleSummary';
import ExcessiveParkingSummary from './ExcessiveParkingSummary';
import OverspeedReport from './OverspeedReport';
import Table from '../../Components/DataGridView/Table.js'

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
import OverspeedLimitArea from './Activity/OverspeedLimitArea';
import ReportParkingPavement from './Activity/ReportParkingPavement';
import ReportAlarmOver3Time from './Activity/ReportAlarmOver3Time';

import RedZoneReport from './VehicleUsage/RedZoneReport';
import TripSummary from "./VehicleUsage/TripSummary";
import StationTripSummary from "./VehicleUsage/StationTripSummary";
import ReportSummaryWaypoint from "./VehicleUsage/ReportSummaryWaypoint";
import ReportSummaryForbiddenPoint from "./VehicleUsage/ReportSummaryForbiddenPoint";
// import Fuel from "./CostAnalysis/Fuel";
import Fuel from "./CostAnalysis/Fuel";
import PieChart from "./CostAnalysis/PieChart";
import Thermometer from "./CostAnalysis/Thermometer";
import { connect } from 'react-redux'



// import Thermometer from "../EcoTree/thermometer/Thermometer";
import { forEach } from "ramda";

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

    this.select_report_filter = this.select_report_filter.bind(this)
    this.fetchVehicleType = this.fetchVehicleType.bind(this)
    this.tableInitial = this.tableInitial.bind(this)
    this.selectedCallback = this.selectedCallback.bind(this)
    this.sizes = ["Please select the page",
      "001-DrivingSummary",
      "002-DriveSummary",
      "003-OverSpeedLimitSummary",
      "004-ExcessiveIdleSummary",
      "005-ExcessiveParkingSummary",
      "006-OverspeedReport",
      "007-SpeedLimitExceeded",
      "008-Exceeded4hourOngoingDriving",
      "009-Exceeded8hourOngoingDriving",
      "026-Exceeded5hourOngoingDriving",
      "027-Exceeded10hourOngoingDriving",
      "010-DriverUnidentified",
      "011-MisuseofDrivingLicenseType",
      "012-IncidenceofGPSUnitRemoved",
      "013-SummaryBehavior",
      "014-SummaryBehaviorByDriver",
      "015-OverspeedLimitArea",
      "016-ReportParkingPavement",
      "017-ReportAlarmOver3Time",

      "018-RedZoneReport",
      "019-TripSummary",
      "020-TripSummary",
      "021-ReportSummaryWaypoint",
      "022-ReportSummaryForbiddenPoint",
      // "023-Fuel",
      "024-PieChart",




      // "025-Thermometer",


      // "002-UserAuthentication",
      // "003-Radarchart",
      // "004-ReportApplicationusage",
      // "005-RPMhistogram",
      // "006-ScatterGraph",
      // "007-Speedhistogram",
      // "008-ReportDealerhistory",
      // "009-ReportInput8",
      // "010-Reportinventoryvehiclelastengineon",
      // "011-Reportinventoryvehiclemovementhistory",
      // "012-Reportmydriver",
      // "013-Reportmydriversummary",
      // "014-Reportmydrivertripdetail",
      // "015-Reportmyvehicle",
      // "016-Reportmyvehiclesummary",
      // "017-Reportmyvehicletrip",
      // "018-Reportpromotion",
      // "019-Reportpromotionhistory",
      // "020-ReportUtilization",
      // "021-Reportvehicleallocationstockaging",
      // "022-Reportvehiclehasenteredandleft",
      // "023-ReportVehiclelastengine",
      // "024-Reportvehiclepartlifetime",
      // "025-Reportvehicleutilization",
      // "026-Throttlehistogram"
    ]
    this.state = {
      reportname: '',
      update: 0,
      Speed: 2,
      Idling: 2,
      Engine: 2,
      Usage: 2,
      value: this.sizes[0],
      vehicle_type: [],
      dealer: [],
      fleet: [],
      vehicle: [],
      selected_vehicle_type: 0,
      selected_dealer: 0,
      selected_fleet: 0,
      selected_report: 0,
      show_report: 0,
      selected_vehicle: [],
      add: false,
      setting: false,
      check: false,
      new_report: [{
        groupName: 'VehicleUsage',
        items: [{
          key: '001 - DrivingSummary',
          value: '  DrivingSummary',
        },
        {
          key: '018 - RedZoneReport',
          value: '  RedZoneReport',
        },
        {
          key: '019 - TripSummary',
          value: 'TripSummary',
        }, {
          key: '020 - StationTripSummary',
          value: 'StationTripSummary',
        }, {
          key: '021 - ReportSummaryWaypoint',
          value: 'ReportSummaryWaypoint',
        }, {
          key: '022 - ReportSummaryForbiddenPoint ',
          value: 'ReportSummaryForbiddenPoint',
        },
        {
          key: '002 - DriveSummary',
          value: 'DriveSummary',
        },


        ],

      }, {
        groupName: 'Activity',
        items: [{
          key: '006 - OverspeedReport ',
          value: 'OverspeedReport'
        }, {
          key: '004 - ExcessiveIdleSummary',
          value: 'ExcessiveIdleSummary'
        }, {
          key: '005 - ExcessiveParkingSummary',
          value: 'ExcessiveParkingSummary'
        }, {
          key: '013 - SummaryBehavior',
          value: 'SummaryBehavior'
        }, {
          key: '014 - SummaryBehaviorByDriver',
          value: 'SummaryBehaviorByDriver'
        }, {
          key: '015 - OverspeedLimitArea',
          value: 'OverspeedLimitArea'
        }, {
          key: '016 - ReportParkingPavement',
          value: 'ReportParkingPavement'
        }, {
          key: '017 - ReportAlarmOver3Time',
          value: 'ReportAlarmOver3Time'
        },
        ],
      }, {
        groupName: 'Cost Analusis',
        items: [
          {
            key: '023 - Fuel',
            value: 'Fuel'
          },
          {
            key: '024 - PieChart',
            value: 'PieChart'
          },
          {
            key: '025 - Thermometer',
            value: 'Thermometer'
          },

        ],
      }, {
        groupName: 'Reports the Department of Transport',
        items: [{
          key: '007 - SpeedLimitExceeded',
          value: 'SpeedLimitExceeded'
        }, {
          key: '008 - Exceeded4hourOngoingDriving',
          value: 'Exceeded4hourOngoingDriving'
        }, {
          key: '009 - Exceeded8hourOngoingDriving',
          value: 'Exceeded8hourOngoingDriving'
        },
        {
          key: '027 - Exceeded10hourOngoingDriving',
          value: 'Exceeded10hourOngoingDriving'
        },
        {
          key: '010 - DriverUnidentified',
          value: 'DriverUnidentified'
        }, {
          key: '011 - MisuseofDrivingLicenseType',
          value: 'MisuseofDrivingLicenseType'
        }, {
          key: '012 - IncidenceofGPSUnitRemoved',
          value: 'IncidenceofGPSUnitRemoved'
        },

        ],
      }],



      report: [{
        key: '001',
        value: '  DrivingSummary',
        type: 'VehicleUsage'
      }, {
        key: '018',
        value: 'RedZoneReport',
        type: 'VehicleUsage'
      }, {
        key: '019 - TripSummary',
        value: 'TripSummary',
      }, {
        key: '020 - StationTripSummary',
        value: 'StationTripSummary',
      }, {
        key: '021 - ReportSummaryWaypoint',
        value: 'ReportSummaryWaypoint',
      }, {
        key: '022 - ReportSummaryForbiddenPoint',
        value: 'ReportSummaryForbiddenPoint',
      },

      {
        key: '002 - DriveSummary',
        value: 'DriveSummary',
      },
      {
        key: '003 - OverSpeedLimitSummary',
        value: 'OverSpeedLimitSummary',
        type: 'Activity'
      },
      {
        key: '006',
        value: 'OverspeedReport'
      }, {
        key: '004',
        value: 'ExcessiveIdleSummary'
      }, {
        key: '005',
        value: 'ExcessiveParkingSummary'
      }, {
        key: '013',
        value: 'SummaryBehavior'
      }, {
        key: '014',
        value: 'SummaryBehaviorByDriver'
      }, {
        key: '015',
        value: 'OverspeedLimitArea'
      }, {
        key: '016',
        value: 'ReportParkingPavement'
      }, {
        key: '017',
        value: 'ReportAlarmOver3Time'
      },
      {
        key: '024',
        value: 'PieChart',
        type: 'Cost Analusis'
      },
      {
        key: '007',
        value: 'SpeedLimitExceeded',
        type: 'Reports the Department of Transport'
      }, {
        key: '008',
        value: 'Exceeded4hourOngoingDriving'
      }, {
        key: '026',
        value: 'Exceeded5hourOngoingDriving'
      },
      {
        key: '009',
        value: 'Exceeded8hourOngoingDriving'
      }, {
        key: '027',
        value: 'Exceeded10hourOngoingDriving'
      },
      {
        key: '010',
        value: 'DriverUnidentified'
      }, {
        key: '011',
        value: 'MisuseofDrivingLicenseType'
      }, {
        key: '012',
        value: 'IncidenceofGPSUnitRemoved'
      },

      ]
    };
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
    // this.setShowReport = this.setShowReport.bind(this)


  }

  async fetchDealer() {
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
    })
  }

  selectedCallback(e) {
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
    //console.log(e.target.value);
    this.setState({
      selected_dealer: e.target.value,
      fleet: [],
      selected_fleet: 0
    }, () => {

      this.loadvehicle()
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



  goadd(e) {
    //console.log(e)
    this.setState({
      add: true,
    })
  }
  gomain() {
    this.setState({
      add: false,
    })
  }










  getContainer() {
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
    switch (this.state.selected_report) {

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
      // case "005-RPMhistogram":
      //   return (<div><RPMhistogram></RPMhistogram></div>);
      // case "006-ScatterGraph":
      //   return (<div><ScatterGraph></ScatterGraph></div>);
      // case "007-Speedhistogram":
      //   return (<div><Speedhistogram></Speedhistogram></div>);
      // case "001-DrivingSummary":
      //   return (<div><DrivingSummary></DrivingSummary></div>);
      // case "002-UserAuthentication":
      //   return (<div><UserAuthentication></UserAuthentication></div>);
      case "001 - DrivingSummary":
        return (<div><DrivingSummary params={params}></DrivingSummary></div>);
      case "002 - DriveSummary":
        return (<div><DriveSummary params={params}></DriveSummary></div>);

      case "003 - OverSpeedLimitSummary":
        return (<div><OverSpeedLimitSummary params={params}></OverSpeedLimitSummary></div>);
      case "004 - ExcessiveIdleSummary":
        return (<div><ExcessiveIdleSummary params={params}></ExcessiveIdleSummary></div>);
      case "005 - ExcessiveParkingSummary":
        return (<div><ExcessiveParkingSummary params={params}></ExcessiveParkingSummary></div>);
      case "006 - OverspeedReport":
        return (<div><OverspeedReport params={params}></OverspeedReport></div>);

      case "007 - SpeedLimitExceeded":
        return (<div><SpeedLimitExceeded params={params}></SpeedLimitExceeded></div>);
      case "008 - Exceeded4hourOngoingDriving":
        return (<div><Exceeded4hourOngoingDriving params={params}></Exceeded4hourOngoingDriving></div>);
      case "009 - Exceeded8hourOngoingDriving":
        return (<div><Exceeded8hourOngoingDriving params={params}></Exceeded8hourOngoingDriving></div>);
      case "027 - Exceeded10hourOngoingDriving":
        return (<div><Exceeded10hourOngoingDriving params={params}></Exceeded10hourOngoingDriving></div>);
      case "010 - DriverUnidentified":
        return (<div><DriverUnidentified params={params}></DriverUnidentified></div>);
      case "011 - MisuseofDrivingLicenseType":
        return (<div><MisuseofDrivingLicenseType params={params}></MisuseofDrivingLicenseType></div>);
      case "012 - IncidenceofGPSUnitRemoved":
        return (<div><IncidenceofGPSUnitRemoved params={params}></IncidenceofGPSUnitRemoved></div>);
      case "013 - SummaryBehavior":
        return (<div><SummaryBehavior params={params}></SummaryBehavior></div>);
      case "014 - SummaryBehaviorByDriver":
        return (<div><SummaryBehaviorByDriver params={params}></SummaryBehaviorByDriver></div>);
      case "015 - OverspeedLimitArea":
        return (<div><OverspeedLimitArea params={params}></OverspeedLimitArea></div>);
      case "016 - ReportParkingPavement":
        return (<div><ReportParkingPavement params={params}></ReportParkingPavement></div>);
      case "017 - ReportAlarmOver3Time":
        return (<div><ReportAlarmOver3Time params={params}></ReportAlarmOver3Time></div>);

      case "018 - RedZoneReport":
        return (<div><RedZoneReport params={params}></RedZoneReport></div>);
      case "019 - TripSummary":
        return (<div><TripSummary params={params}></TripSummary></div>);
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



  // setShowReport() {
  //   //console.log(this.state.selected_report)
  //   //console.log(this.selectedRow);
  //   window.open('https://google.com?vid=' + JSON.stringify(this.selectedRow) + '&key=' + this.state.selected_report)
  // }


  componentDidMount() {
    this.fetchDealer();
    this.loadvehicle();
    this.fetchVehicleType()

  }

  async loadvehicle() {
    var userId = this.props.dataLogin.userId
    var object = {
      userId: userId
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
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)

    });
    var responseJson = await response.json();
    //console.log(responseJson);
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

  render() {
    if (this.state.add == true) {
      return (
        <div className="ibox ">
          <div className="ibox-title" style={{ padding: '15px 20px 10px 15px' }}>
            <div className="row">
              <div className="col-lg-4">
                <h5 style={{ marginTop: 5 }}>Report / {this.state.selected_report}  </h5>
              </div>
              <div className="col-lg-8" style={{ textAlign: 'right' }}>
                <button onClick={this.gomain.bind(this)} className="btn" style={{ backgroundColor: 'gray', color: 'white', marginBottom: 5, marginLeft: 10 }}><i className="fa fa-chevron-circle-left" aria-hidden="true" ></i> Back</button>
              </div>

            </div>
            <div className="row">

              <div className="col-lg-12">
                {this.getContainer()}
              </div>

            </div>
          </div>

        </div>
      )
    }
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <div className="ibox ">
              <div className="ibox-title" style={{ padding: '15px 20px 10px 15px' }}>
                <div className="row">
                  <div className="col-lg-4">
                    <h5 style={{ marginTop: 5 }}>Report / Config Data</h5>
                  </div>
                  <div className="col-lg-8" style={{ textAlign: 'right' }}>
                    <a style={{ margin: 0, backgroundColor: '#1ab394', color: 'white', marginLeft: 10 }} className="btn btn-default" ><i className="fa fa-filter" style={{ marginRight: 10 }}></i>Config Data</a>
                  </div>
                </div>
              </div>
              <div className="ibox-content" style={{ padding: '15px 20px 5px 20px' }}>
                <div className="form-group row">
                  <div className="col-lg-1"></div>
                  <label className="col-lg-1 col-form-label">From :</label>
                  <div className="col-lg-2">
                    <input ref={this.DateForm} onChange={this.Formdate} className="form-control" type="date"></input>
                  </div>
                  <div className="col-lg-2">
                    <input ref={this.TimeForm} onChange={this.Formtime} className="form-control" type="time"></input>
                  </div>

                  <label className="col-lg-1 col-form-label">To :</label>
                  <div className="col-lg-2">
                    <input ref={this.DateTo} onChange={this.Todate} className="form-control" type="date" ></input>
                  </div>
                  <div className="col-lg-2">
                    <input ref={this.TimeTo} onChange={this.Totime} className="form-control" type="time"></input>
                  </div>

                  <div className="col-lg-1"></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-1"></div>
                  <label className="col-lg-1 col-form-label" >Dealer :</label>
                  <div className="col-lg-4">
                    <select ref={this.selectedDealer} className="form-control" onChange={this.onDealerChanged} value={this.state.selected_dealer} >
                      <option value={0}>ทั้งหมด</option>
                      {this.state.dealer.map((element, i) => {
                        return (<option key={i} value={element.id}>{element.dealer_name}</option>)
                      })}
                    </select>
                  </div>
                  <label className="col-lg-1 col-form-label" >Fleet :</label>
                  <div className="col-lg-4">
                    <select ref={this.selectedFleet} className="form-control" value={this.state.selected_fleet} onChange={this.onFleetChanged}>
                      <option value={0}>ทั้งหมด</option>
                      {this.state.fleet.map((element, i) => {
                        return (<option key={i} value={element.fleet_id}>{element.fleet_name}</option>)
                      })}
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-1"></div>
                  <label className="col-lg-1 col-form-label" >Type :</label>
                  <div className="col-lg-4">
                    <select ref={this.selectBox} className="form-control" onChange={this.onVehicleTypeChanged} value={this.state.selected_vehicle_type} >
                      <option value={0}>ทั้งหมด</option>
                      {this.state.vehicle_type.map((element, i) => {
                        return (<option key={i} value={element.id}>{element.vehicle_type_name}</option>)
                      })}
                    </select>
                  </div>
                  <label className="col-lg-1 col-form-label" >ReportType :</label>
                  <div className="col-lg-4">
                    <select ref={this.selectedReport} className="form-control" value={this.state.selected_report} onChange={this.onReportChanged}>
                      <option value={0}>ทั้งหมด</option>
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
                    </select>
                  </div>
                </div>
                <div className="row">
                  <label className="col-lg-1 col-form-label"></label>
                  <label className="col-lg-1 col-form-label">Display :</label>
                  <div className="col-sm-5 col-form-label">
                    <label className="radio-inline" ><input style={{ marginRight: 5 }} type="checkbox" name="optradio" />Box number</label>
                    <label className="radio-inline" style={{ marginLeft: 50 }}><input style={{ marginRight: 5 }} type="checkbox" name="optradio" />Car number</label>
                    <label className="radio-inline" style={{ marginLeft: 50 }}><input style={{ marginRight: 5 }} type="checkbox" name="optradio" />Lisenseplate</label>
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
                    >
                    </Table>

                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-12">
                    <div className="ibox">
                      <div className="ibox-content" style={{ padding: '20px 5px 5px 5px', backgroundColor: '#DFF0D8' }}>
                        <div className="form-group row">
                          <div className="col-lg-5">
                          </div>
                          <label className="col-lg-3 col-form-label" style={{ textAlign: 'right', fontWeight: 500 }}>Speed limit period over	 </label>
                          <div className="col-lg-2">
                            <input ref={this.Speed} onChange={this.EditSpeed} value={this.state.Speed} className="form-control" ></input>
                          </div>
                          <label className="col-lg-1 col-form-label" style={{ fontWeight: 500 }}>Minutes </label>
                          <div className="col-lg-1">

                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-lg-5">
                          </div>
                          <label className="col-lg-3 col-form-label" style={{ textAlign: 'right', fontWeight: 500 }}>Idling longer than </label>
                          <div className="col-lg-2">
                            <input ref={this.Idling} onChange={this.EditIdling} value={this.state.Idling} className="form-control" ></input>
                          </div>
                          <label className="col-lg-1 col-form-label" style={{ fontWeight: 500 }}>Minutes </label>
                          <div className="col-lg-1">
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-lg-5">
                          </div>
                          <label className="col-lg-3 col-form-label" style={{ textAlign: 'right', fontWeight: 500 }}>Engine stop longer than </label>
                          <div className="col-lg-2">
                            <input ref={this.Engine} onChange={this.EditEngine} value={this.state.Engine} className="form-control" ></input>
                          </div>
                          <label className="col-lg-1 col-form-label" style={{ fontWeight: 500 }}>Minutes </label>
                          <div className="col-lg-1">
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-lg-5">
                          </div>
                          <label className="col-lg-3 col-form-label" style={{ textAlign: 'right', fontWeight: 500 }}>Usage report every	 </label>
                          <div className="col-lg-2">
                            <input ref={this.Usage} onChange={this.EditUsage} value={this.state.Usage} className="form-control" ></input>
                          </div>
                          <label className="col-lg-1 col-form-label" style={{ fontWeight: 500 }}>Minutes </label>
                          <div className="col-lg-1">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12" style={{ textAlign: 'right' }}>
                        <a onClick={this.goadd.bind(this)}><button style={{ backgroundColor: '#1ab394', color: 'white' }} className="btn btn-primary"  ><i className="fas fa-leaf"   ></i> Create report </button> </a>
                      </div>
                    </div>
                    {/* <div className="row">
                      <div className="col-lg-12">
                        {this.getContainer()}
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div >
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

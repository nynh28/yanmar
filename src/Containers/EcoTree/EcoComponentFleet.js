import React, { Component } from 'react';
import "./ecofleet.css";
import $ from 'jquery';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Spidersafetyfleet from './Graphcomponentfleet/Spidersafety/Spidersafety'
import Spiderecofleet from './Graphcomponentfleet/Spidereco/Spidereco'
import Daynightgraph from './Graphcomponentfleet/daynightgraph/daynightgraph'
import Mileageunitgraph from './Graphcomponentfleet/Mileageunitgraph/Mileageunitgraph'
import Hourunit from './Graphcomponentfleet/Hourunitgraph/Hourunitgraph'
import Top10geo from './Graphcomponentfleet/Top10geo/top10geo'
import Operationchartdriver from './Graphcomponentfleet/Operationchart/Operationchartdriver';
import Operationchartvehicle from './Graphcomponentfleet/Operationchart/Operationchartvehicle';
import Drivergrade from './Graphcomponentfleet/Drivergradegraph/Drivergradegraph';
import moment from 'moment'
import queryString from 'query-string';
import { t } from '../../Components/Translation'
import { connect } from 'react-redux'
import { ENDPOINT_BASE_URL } from '../../Config/app-config';


class EcoComponentfleet extends Component {
  constructor(props) {
    super(props);
    this.CreatePDFfromHTML = this.CreatePDFfromHTML.bind(this);
    this.data = {
      1: {
        Driver_name: 'Mr.Poonpetch Luancharoen',
        Vehicle_number: 'RD1-1234,RD2-4567,AB4-3267',
        vehicle_mileages: '12,212',
        fuel_cost_summary: '67,346',
        Average_Mileages_All_Vehicle: '15,023',
        Your_Fuel_Amount_Use: '1,349',
        Average_Fuel_Usage_All_Vehicle: '1,802',
        Vehicle_Idling_Time: '23:00:20',
        Average_Vehicle_Idling_Time: '34:20:21',
        Vehicle_Fuel_Consumption: '5.05',
        Average_Vehicle_Fuel_Consumption: '5.65',
        Fuel_price: '26.46',
        Average_cost_per_km: '5.14',
        cost_per_km: '5.35',
        Dlt_v1: '21',
        Dlt_v2: '34',
        Dlt_v3: '12',
        Dlt_v4: '5',
        Dlt_v5: '9',
        Hc_v1: '4',
        Hc_v2: '2',
        Hc_v3: '1',
        Hc_v4: '1',
        Safety_Score_diving_value1: '5',
        Safety_Score_speed_value_avg: '5',
        Safety_Score_speed_value1: '4',
        Safety_Score_speed_value2: '4',
        Safety_Score_speed_value3: '3',
        Safety_Score_speed_value4: '4',
        Safety_Score_speed_value5: '5',
        Safety_Score_Hash_Start_avg: '4',
        Safety_Score_Hash_Start_value1: '4',
        Safety_Score_Hash_Start_value2: '4',
        Safety_Score_Hash_Start_value3: '4',
        Safety_Score_Hash_Start_value4: '4',
        Safety_Score_Hash_Start_value5: '4',
        Safety_Score_Hash_Start_value6: '4',
        Safety_Score_Hash_Break_value: '3',
        Safety_Score_Seat_Belt_value: '3',
        Safety_Score_Hash_Turn_value: '1',
        eco_Score_Idling_value: '3',
        eco_Score_Exhaust_value: '3',
        eco_Score_RPMhigh_value: '3',
        eco_Score_RPMlow_value: '3',
        eco_Score_ShiftUp_value: '3',
        eco_Score_ShiftDown_value: '4'

      }

    };
    this.state = {
      loading: true,
      fetchFleet: [],
      ranking: [],
      data: []
    }



  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  async loadFleet(fleet_id, startdate, enddate) {

    // var response = await fetch(ENDPOINT_SETTING_REPORT_BASE_URL + "fleet_ecotree", {
    var response = await fetch(ENDPOINT_BASE_URL + "fleet/fleet_ecotree", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Accept": "text/html",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: parseInt(this.props.dataLogin.userId),
        fleet_id: parseInt(fleet_id),
        start_date: startdate,
        end_date: enddate
      }) // body data type must match "Content-Type" header
    });
    var responseJson = await response.json();
    this.setState({
      data: responseJson.result,
      loading: false
    }, () => {

    })


  }



  componentDidMount() {
    let params = queryString.parse(this.props.location.search)
    if (typeof params.fleet !== "undefined") {
      this.fleet = params.fleet
      this.startdate = params.startdate
      this.enddate = params.enddate
      this.loadFleet(this.fleet, this.startdate, this.enddate);
      // this.loadvehicle()
    }

  }

  // async loadvehicle() {
  //   var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/get_fleet_vehicle"
  //   var response = await fetch(api, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       fleet_id: this.fleet,
  //       startdate: this.startdate,
  //       enddate: this.enddate
  //     })
  //   });
  //   var responseJson = await response.json();
  //   this.setState({
  //     vehicle: responseJson
  //   })
  // }



  async CreatePDFfromHTML() {
    var HTML_Width = 210;
    var HTML_Height = 297;
    var top_left_margin = 0;
    var PDF_Width = HTML_Width;
    var PDF_Height = HTML_Height;
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;
    var pdf = jsPDF('p', 'mm', 'a4', true);
    for (var i = 0; i < $(".print").length; i++) {
      await html2canvas($(".print")[i], {
        scale: window.devicePixelRatio,
        allowTaint: true,
        taintTest: false
      }).then(function (canvas) {
        var imgData = canvas.toDataURL("image/png", 1.0);
        pdf.addImage(imgData, 'PNG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
        if (i != $(".print").length - 1) {
          pdf.addPage();
        }

        // pdf.addImage(imgData, 'PNG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
      });
    }

    pdf.save("SummaryReport - Fleet View.pdf");
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
      customer_data: responseJson
    }, () => {
      this.loadevent()
      this.loadUtilization()
    })
  }

  async loadUtilization() {
    var cust_id = 0
    this.state.customer_data.forEach((element) => {
      cust_id = element.int_cust_id
    })

    var api = ENDPOINT_BASE_URL + "fleet/dashboard/summary?cust_id=" + cust_id
    var response = await fetch(api, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }

    });
    var responseJson = await response.json();

    if (responseJson.code == 200) {
      this.setState({
        utilization: responseJson
      }, () => {
        var idle_time_cal = (this.state.utilization.result[30].idle_time / 60).toFixed(2)
        var idle_max = (this.state.utilization.result[30].idle_max / 60).toFixed(2)
        var oversped_time = this.state.utilization.result[30].oversped_time + ' m'
        if (this.state.utilization.result[30].oversped_time > 60) {
          oversped_time = (this.state.utilization.result[30].oversped_time / 60).toFixed(2)
          var oversped_time_h = oversped_time.split('.')[0]
          var oversped_time_m = oversped_time.split('.')[1]
          if (oversped_time_m != "00") {
            oversped_time_m = (60 * (oversped_time_m / 100)).toFixed(0)
          }
          oversped_time = oversped_time_h + " h " + oversped_time_m + " m"
        }


        var idle_max_h = idle_max.split('.')[0]
        var idle_max_m = idle_max.split('.')[1]
        var idle_time_cal_h = idle_time_cal.split('.')[0]
        var idle_time_cal_m = idle_time_cal.split('.')[1]
        if (idle_time_cal_m != "00" || idle_max_m) {
          idle_time_cal_m = (60 * (idle_time_cal_m / 100)).toFixed(0)
          idle_max_m = (60 * (idle_max_m / 100)).toFixed(0)
        }
        var idle_time_cal_h_m = idle_time_cal_h + " h " + idle_time_cal_m + " m"
        var idle_max_h_m = idle_max_h + " h " + idle_max_m + " m"
        this.setState({
          // fuel_con: this.state.utilization.result[30].fuel_cons,
          fuel_used: this.numberWithCommas((this.state.utilization.result[30].fuel_used / 1000).toFixed(1)),
          mileage: this.numberWithCommas(this.state.utilization.result[30].mileage),
          idle_fuel_used: this.state.utilization.result[30].idle_fuel_used,
          idle_time: idle_time_cal_h_m,
          idle_max: idle_max_h_m,
          idle_fuel_used: this.numberWithCommas((this.state.utilization.result[30].idle_fuel_used / 1000).toFixed(1)),
          overspeed_count: this.state.utilization.result[30].oversped_count,
          overspd_max: this.state.utilization.result[30].overspd_max,
          oversped_time: oversped_time,
          isLoadingutilization: false,
          fuel_con: ((this.state.utilization.result[30].mileage) / (this.state.utilization.result[30].fuel_used / 1000)).toFixed(2)
        })
      })
    }
    else {
      //console.log('api Error')
    }

  }

  async loadUtilizationday() {
    var date = this.state.serieclick
    var cust_id = 0
    this.state.customer_data.forEach((element) => {
      cust_id = element.int_cust_id
    })

    var api = ENDPOINT_BASE_URL + "fleet/dashboard/summary/" + date + "?cust_id=" + cust_id
    var response = await fetch(api, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }

    });
    var responseJson = await response.json();
    if (responseJson.code == 200) {
      this.setState({
        utilizationday: responseJson
      }, () => {
        var idle_time_cal = (this.state.utilizationday.result[0].idle_time / 60).toFixed(2)
        var idle_max = (this.state.utilizationday.result[0].idle_max / 60).toFixed(2)
        var oversped_time = this.state.utilizationday.result[0].oversped_time + ' m'
        if (this.state.utilizationday.result[0].oversped_time > 60) {
          oversped_time = (this.state.utilizationday.result[0].oversped_time / 60).toFixed(2)
          var oversped_time_h = oversped_time.split('.')[0]
          var oversped_time_m = oversped_time.split('.')[1]
          if (oversped_time_m != "00") {
            oversped_time_m = (60 * (oversped_time_m / 100)).toFixed(0)
          }
          oversped_time = oversped_time_h + " h " + oversped_time_m + " m"
        }
        var idle_max_h = idle_max.split('.')[0]
        var idle_max_m = idle_max.split('.')[1]
        var idle_time_cal_h = idle_time_cal.split('.')[0]
        var idle_time_cal_m = idle_time_cal.split('.')[1]
        if (idle_time_cal_m != "00" || idle_max_m) {
          idle_time_cal_m = (60 * (idle_time_cal_m / 100)).toFixed(0)
          idle_max_m = (60 * (idle_max_m / 100)).toFixed(0)
        }
        var idle_time_cal_h_m = idle_time_cal_h + " h " + idle_time_cal_m + " m"
        var idle_max_h_m = idle_max_h + " h " + idle_max_m + " m"
        this.setState({
          // fuel_con: this.state.utilizationday.result[0].fuel_cons,
          fuel_used: this.numberWithCommas((this.state.utilizationday.result[0].fuel_used / 1000).toFixed(1)),
          mileage: this.numberWithCommas(this.state.utilizationday.result[0].mileage),
          idle_fuel_used: this.state.utilizationday.result[0].idle_fuel_used,
          idle_time: idle_time_cal_h_m,
          idle_max: idle_max_h_m,
          idle_fuel_used: this.numberWithCommas((this.state.utilizationday.result[0].idle_fuel_used / 1000).toFixed(1)),
          overspeed_count: this.state.utilizationday.result[0].oversped_count,
          overspd_max: this.state.utilizationday.result[0].overspd_max,
          oversped_time: oversped_time,
          isLoadingutilization: false,
          fuel_con: this.numberWithCommas(((this.state.utilizationday.result[0].mileage) / (this.state.utilizationday.result[0].fuel_used / 1000)).toFixed(2))
        })
      })
    }
    else {
      //console.log('api Error')
    }


  }

  render() {
    console.log(">> RENDER REPORT FLEET")
    if (this.state.loading == true) {
      return (
        <div className="ibox-content">
          <div className="row">
            <div className="col-12">
              <div style={{ textAlign: 'center' }}>Loading.... Please wait</div>
            </div>
          </div>
        </div>
      )
    }
    if (this.state.loading == false && this.state.error == true) {
      return (
        <div className="ibox-content">
          <div className="row">
            <div className="col-12">
              <div style={{ textAlign: 'center' }}>{this.state.errorMsg}</div>
            </div>
          </div>
        </div>

      )
    }
    var myVehicles = t("ecotree_152")
    var total = t("ecotree_152")
    var units = t("ecotree_152")
    var Textcolor_dlt_over4 = 'black'
    var Textcolor_dlt_over8 = 'black'
    var Textcolor_dlt_overspeed = 'black'
    var Textcolor_dlt_not_swipe_card = 'black'
    var Textcolor_dlt_unplug = 'black'
    //-----------------------------------
    var Textcolor_harsh_acceleration = 'black'
    var Textcolor_sharp_turn = 'black'
    var Textcolor_harsh_start = 'black'
    var Textcolor_harsh_break = 'black'
    var Textcolor_speed_over_60 = 'black'
    var Textcolor_speed_over_80 = 'black'
    var Textcolor_speed_over_100 = 'black'
    var Textcolor_speed_over_120 = 'black'
    if (this.state.data.fleet_trip_information.dlt.over4 != 0 || this.state.data.fleet_trip_information.dlt.over4 != "0") {
      Textcolor_dlt_over4 = 'red'
    }
    if (this.state.data.fleet_trip_information.dlt.over8 != 0 || this.state.data.fleet_trip_information.dlt.over8 != "0") {
      Textcolor_dlt_over8 = 'red'
    }
    if (this.state.data.fleet_trip_information.dlt.overspeed != 0 || this.state.data.fleet_trip_information.dlt.overspeed != "0") {
      Textcolor_dlt_overspeed = 'red'
    }
    if (this.state.data.fleet_trip_information.dlt.notswipe != 0 || this.state.data.fleet_trip_information.dlt.notswipe != "0") {
      Textcolor_dlt_not_swipe_card = 'red'
    }
    if (this.state.data.fleet_trip_information.dlt.unplug != 0 || this.state.data.fleet_trip_information.dlt.unplug != "0") {
      Textcolor_dlt_unplug = 'red'
    }
    //-----------------------------------
    if (this.state.data.fleet_trip_information.other_behavior.harsh_brake != 0 || this.state.data.fleet_trip_information.other_behavior.harsh_brake != "0") {
      Textcolor_harsh_break = 'red'
    }
    if (this.state.data.fleet_trip_information.other_behavior.sharp_turn != 0 || this.state.data.fleet_trip_information.other_behavior.sharp_turn != "0") {
      Textcolor_sharp_turn = 'red'
    }
    if (this.state.data.fleet_trip_information.other_behavior.harsh_acceleration != 0 || this.state.data.fleet_trip_information.other_behavior.harsh_acceleration != "0") {
      Textcolor_harsh_acceleration = 'red'
    }
    if (this.state.data.fleet_trip_information.other_behavior.harsh_start != 0 || this.state.data.fleet_trip_information.other_behavior.harsh_start != "0") {
      Textcolor_harsh_start = 'red'
    }
    if (this.state.data.fleet_trip_information.overspeed.over60 != 0 || this.state.data.fleet_trip_information.overspeed.over60 != "0") {
      Textcolor_speed_over_60 = 'red'
    }
    if (this.state.data.fleet_trip_information.overspeed.over80 != 0 || this.state.data.fleet_trip_information.overspeed.over80 != "0") {
      Textcolor_speed_over_80 = 'red'
    }
    if (this.state.data.fleet_trip_information.overspeed.over100 != 0 || this.state.data.fleet_trip_information.overspeed.over100 != "0") {
      Textcolor_speed_over_100 = 'red'
    }
    if (this.state.data.fleet_trip_information.overspeed.over120 != 0 || this.state.data.fleet_trip_information.overspeed.over120 != "0") {
      Textcolor_speed_over_120 = 'red'
    }


    return (

      <div className="Test2">
        <center><button className="btn-primary" onClick={this.CreatePDFfromHTML}>{t('ecotree_74')}</button></center><br></br>
        <div>
          <div className="a4-portrait-with-startfleet print">
            <div className="pdf-headline"><h5 >{t('ecotree_107')}</h5></div>
            <div className="pdf-headline-1"><h6 style={{ fontWeight: 500 }}>{t('ecotree_109')} {this.state.data.fleet_information.fleet_name}</h6></div>
            <div className="pdf-headline-2"><h6 style={{ fontWeight: 500 }}>{t('ecotree_111')} {moment.unix(this.startdate).format('DD/MM/YYYY')} - {moment.unix(this.enddate).format('DD/MM/YYYY')}</h6></div>
            <div className="pdf-headline-3"><h6 style={{ fontWeight: 500 }}>{t('ecotree_108')} {this.state.data.fleet_information.company_name}</h6></div>
            <div className="pdf-headline-4"><h6 style={{ fontWeight: 500 }}>{t('ecotree_110')} {this.state.data.fleet_trip_information.vehicle} {t('ecotree_138')}</h6></div>


            <div className="fleet-title-1"><h5>{t('ecotree_112')}</h5></div>



            <div className="fleet-title-19"><h5>{t('ecotree_121')}</h5></div>
            <div className="fleet-title-24"><h5>{t('ecotree_122')}</h5></div>
            <div className="fleet-title-20"><h5>{t('ecotree_123')}</h5></div>
            <div className="fleet-title-21"><h5>{t('ecotree_120')}</h5></div>
            <div className="fleet-title-23"><h5>{t('ecotree_113')}</h5></div>
            <div className="fleet-title-32">{t('ecotree_136')}</div>
            <div className="fleet-title-33">{t('ecotree_137')}</div>

            <div className="Operationchartvehicle"><Operationchartvehicle chartwidth={380} chartHeight={260} vehicle_count={this.state.data.fleet_trip_information.vehicle} driving_time={this.state.data.dashboard_summary.summary.vehicle[0]} idling_time={this.state.data.dashboard_summary.summary.vehicle[1]} parking_time={this.state.data.dashboard_summary.summary.vehicle[2]} overspeed_time={this.state.data.dashboard_summary.summary.vehicle[3]} myvehicle={t("ecotree_152")}></Operationchartvehicle></div>
            <div className="Operationchartdriver"><Operationchartdriver chartwidth={380} chartHeight={260} driver_count={this.state.data.fleet_trip_information.driver} dlt_unknown={this.state.data.dashboard_summary.summary.driver[1]} dlt_wrongtype={this.state.data.dashboard_summary.summary.driver[2]}></Operationchartdriver></div>


            <div className="Daynightgraph"><Daynightgraph data={this.state.data.fleet_trip_information.day_night} chartwidth={300} chartHeight={50}></Daynightgraph></div>
            <div className="Hourunitgraph"><Hourunit data={this.state.data.fleet_trip_information.driving_time} chartwidth={320} chartHeight={190}></Hourunit></div>
            <div className="Mileageunitgraph"><Mileageunitgraph data={this.state.data.fleet_trip_information.driving_distant} chartwidth={350} chartHeight={190}></Mileageunitgraph></div>
            <div className="Top10geo"><Top10geo chartwidth={370} chartHeight={450}></Top10geo></div>




            <div className="table-fleet">

              <div className="divTable greyGridTable3">
                <div className="divTableHeading">
                  <div className="divTableRow">
                    <div className="divTableHead"></div>
                    <div className="divTableHead"></div>
                    <div className="divTableHead">{t('ecotree_114')}</div>
                    <div className="divTableHead"><p>{t('ecotree_115')}</p></div>
                    <div className="divTableHead"><p>{t('ecotree_116')}</p></div>
                  </div>
                </div>
                <div className="divTableBody">
                  <div className="divTableRow">
                    <div className="divTableCell"><img style={{ margin: 5 }} src="assets/img/6.png" height="20" width="20"></img></div>
                    <div className="divTableCell">{t('ecotree_117')}</div>
                    <div className="divTableCell">{(isNaN(this.state.data.fleet_trip_information.summary_mileage)) ? 0 : this.numberWithCommas(Number(this.state.data.fleet_trip_information.summary_mileage).toFixed(0))}</div>
                    <div className="divTableCell">{(isNaN(this.state.data.fleet_trip_information.summary_mileage / this.state.data.fleet_trip_information.vehicle)) ? 0 : this.numberWithCommas((parseInt(this.state.data.fleet_trip_information.summary_mileage) / parseInt(this.state.data.fleet_trip_information.vehicle)).toFixed(0))}</div>
                    <div className="divTableCell">{(isNaN(this.state.data.company_trip_information.summary_mileage / this.state.data.company_trip_information.vehicle)) ? 0 : this.numberWithCommas((parseInt(this.state.data.company_trip_information.summary_mileage) / parseInt(this.state.data.company_trip_information.vehicle)).toFixed(0))}</div>
                  </div>
                  <div className="divTableRow">
                    <div className="divTableCell"><img style={{ margin: 5 }} src="assets/img/f3.png" height="20" width="20"></img></div>
                    <div className="divTableCell">{t('ecotree_118')}</div>
                    <div className="divTableCell">{(isNaN(this.state.data.fleet_trip_information.fuel_usage)) ? 0 : this.numberWithCommas(Number(this.state.data.fleet_trip_information.fuel_usage).toFixed(0))}</div>
                    <div className="divTableCell">{(isNaN(this.state.data.fleet_trip_information.fuel_usage / this.state.data.fleet_trip_information.vehicle)) ? 0 : this.numberWithCommas((parseInt(this.state.data.fleet_trip_information.fuel_usage) / parseInt(this.state.data.fleet_trip_information.vehicle)).toFixed(0))}</div>
                    <div className="divTableCell ">{(isNaN(this.state.data.company_trip_information.fuel_usage / this.state.data.company_trip_information.vehicle)) ? 0 : this.numberWithCommas((parseInt(this.state.data.company_trip_information.fuel_usage) / parseInt(this.state.data.company_trip_information.vehicle)).toFixed(0))}</div>
                  </div>
                  <div className="divTableRow">
                    <div className="divTableCell"><img style={{ margin: 5 }} src="assets/img/f2.png" height="20" width="20"></img></div>
                    <div className="divTableCell">{t('ecotree_119')}</div>
                    <div className="divTableCell"></div>
                    <div className="divTableCell ">{this.numberWithCommas(Number(this.state.data.fleet_trip_information.fuel_consumption).toFixed(2))}</div>
                    <div className="divTableCell ">{this.numberWithCommas(Number(this.state.data.company_trip_information.fuel_consumption).toFixed(2))}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pdf-2-container">

            </div>
          </div>


          <div className="a4-portrait-with-confleet print" style={{ marginTop: 20, marginBottom: 20 }}>
            <div className="pdf3-headline"><h3>{t('ecotree_112')}</h3></div>
            <div className="fleet-title-2"><h5>{t('ecotree_125')}</h5></div>
            <div className="fleet-title-p2"><h5>{t('ecotree_124')}</h5></div>
            <div className="tabletoprank">
              <div className="divTable greyGridTable2">
                <div className="divTableHeading">
                  <div className="divTableRow">
                    <div className="divTableHead"> {t('ecotree_126')} </div>
                    <div className="divTableHead"> {t('ecotree_129')} </div>
                    <div className="divTableHead"> {t('ecotree_130')} </div>
                    <div className="divTableHead"> {t('ecotree_131')} </div>
                  </div>
                </div>
                <div className="divTableBody">
                  {this.state.data.fleet_trip_information.top_driving_distants.map((element, i) => {
                    if (i < 10) {
                      return (<div className="divTableRow">
                        <div className="divTableCell scorecell">{i + 1}</div>
                        <div className="divTableCell fix-vehicle-cell">{element.license_plate_no}</div>
                        <div className="divTableCell">{this.numberWithCommas(element.mileage.toFixed(0))}</div>
                        <div className="divTableCell">{element.trips}</div>
                      </div>)
                    }

                  })}


                </div>
              </div>
            </div>
            <div className="tabletoprankdriver">
              <div className="divTable greyGridTable2">
                <div className="divTableHeading">
                  <div className="divTableRow">
                    <div className="divTableHead"> {t('ecotree_126')} </div>
                    <div className="divTableHead"> {t('ecotree_127')} </div>
                    <div className="divTableHead"> {t('ecotree_128')} </div>
                  </div>
                </div>
                <div className="divTableBody">
                  {this.state.data.fleet_trip_information.top_driving_score.map((element, i) => {

                    if (i < 10) {
                      return (<div className="divTableRow">
                        <div className="divTableCell scorecell">{i + 1}</div>
                        <div className="divTableCell fix-driver-cell" style={{ textAlign: 'left' }}>{element.driver_name}</div>
                        <div className="divTableCell">{element.total_score.toFixed(2)}</div>
                        {/* <div className="divTableCell">{element.behavior._score.toFixed(2)}</div> */}
                      </div>)
                    }

                  })}


                </div>
              </div>
            </div>
            <div className="spiderfleet"><Spidersafetyfleet data={this.state.data.fleet_trip_information.global_summary.safety} chartwidth={260} chartHeight={250}></Spidersafetyfleet></div>
            <div className="spider1fleet"><Spiderecofleet data={this.state.data.fleet_trip_information.global_summary.eco} chartwidth={280} chartHeight={280}></Spiderecofleet></div>
            <div className="spiderfleet-headline1"><p style={{ fontSize: 10, fontWeight: 600 }}>{t('ecotree_132')}</p></div>
            <div className="spiderfleet-headline2"><p style={{ fontSize: 10, fontWeight: 600 }}>{t('ecotree_133')}</p></div>
            <div className="spiderfleet-headline3"><p style={{ fontSize: 10, fontWeight: 600 }}>{t('ecotree_132')}</p></div>
            <div className="spiderfleet-headline4"><p style={{ fontSize: 10, fontWeight: 600 }}>{t('ecotree_133')}</p></div>
            <div className="fleet-title-22"><h5>{t('ecotree_134')}</h5></div>
            <div className="fleet-title-34"><h5>{t('ecotree_151')}</h5></div>
            <div className="fleet-title-35"><h5>{t('ecotree_52')}</h5></div>
            <div className="fleet-title-36"><h5>{t('ecotree_49')}</h5></div>
            <div className="Drivergrade"><Drivergrade data={this.state.data.fleet_trip_information.global_grade_summary} chartwidth={290} chartHeight={220}></Drivergrade></div>
            <div className="DLT-title2"><h5>{t("DLT_report")}</h5></div>
            <div className="DLTtablefleet">
              <div class="divTable DLTreportfleet">
                <div class="divTableHeading">
                  <div class="divTableRow">
                    <div class="divTableHead">{t("ecotree_76")}</div>
                    <div class="divTableHead">{t("ecotree_77")}</div>
                    <div class="divTableHead">{t("ecotree_78")}</div>
                    <div class="divTableHead">{t("ecotree_79")}</div>
                    <div class="divTableHead">{t("ecotree_80")}</div>
                    <div class="divTableHead">{t("ecotree_81")}</div>
                  </div>
                </div>
                <div class="divTableBody">
                  <div class="divTableRow">
                    <div class="divTableCell" style={{ color: Textcolor_dlt_over4 }}>{this.numberWithCommas(this.state.data.fleet_trip_information.dlt.over4)}</div>
                    <div class="divTableCell" style={{ color: Textcolor_dlt_over8 }}>{this.numberWithCommas(this.state.data.fleet_trip_information.dlt.over8)}</div>
                    <div class="divTableCell" style={{ color: Textcolor_dlt_overspeed }}>{this.numberWithCommas(this.state.data.fleet_trip_information.dlt.overspeed)}</div>
                    <div class="divTableCell" style={{ color: Textcolor_dlt_not_swipe_card }}>{this.numberWithCommas(this.state.data.fleet_trip_information.dlt.notswipe)}</div>
                    <div class="divTableCell" style={{ color: Textcolor_dlt_unplug }}>{this.numberWithCommas(this.state.data.fleet_trip_information.dlt.unplug)}</div>
                    <div class="divTableCell" style={{ color: Textcolor_dlt_unplug }}>{this.numberWithCommas(this.state.data.fleet_trip_information.dlt.unplug)}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="HC-title2"><h5>{t("ecotree_135")}</h5></div>
            <div className="HSCfleet">
              <table className="table-eco" style={{ fontSize: 14, borderColor: 'white' }}>
                <tr style={{ backgroundColor: "#4c74be", color: 'white' }}>
                  <th colspan="1" rowSpan="2" style={{ border: '2px solid white' }}>{t('ecotree_82')}</th>
                  <th colspan="1" rowSpan="2" style={{ border: '2px solid white' }}>{t('ecotree_83')}</th>
                  <th colspan="1" rowSpan="2" style={{ border: '2px solid white' }}>{t('ecotree_84')}</th>
                  <th colspan="1" rowSpan="2" style={{ border: '2px solid white' }}>{t('ecotree_85')}</th>
                  <th colspan="4" rowSpan="1" style={{ height: 30, border: '2px solid white' }}>{t('ecotree_86')}</th>
                </tr>
                <tr style={{ backgroundColor: "#d1d4ea", color: 'black' }}>
                  <th style={{ border: '2px solid white' }}>60 {t('ecotree_87')}</th>
                  <th style={{ border: '2px solid white' }}>80 {t('ecotree_87')}</th>
                  <th style={{ border: '2px solid white' }}>100 {t('ecotree_87')}</th>
                  <th style={{ border: '2px solid white' }}>120 {t('ecotree_87')}</th>
                </tr>
                <tr style={{ backgroundColor: "#e9ecf3", fontWeight: 'bold', fontSize: 16, color: 'black' }}>
                  <td style={{ border: '2px solid white', color: Textcolor_harsh_start }}>{this.numberWithCommas(this.state.data.fleet_trip_information.other_behavior.harsh_start)}</td>
                  <td style={{ border: '2px solid white', color: Textcolor_harsh_acceleration }}>{this.numberWithCommas(this.state.data.fleet_trip_information.other_behavior.harsh_acceleration)}</td>
                  <td style={{ border: '2px solid white', color: Textcolor_sharp_turn }}>{this.numberWithCommas(this.state.data.fleet_trip_information.other_behavior.sharp_turn)}</td>
                  <td style={{ border: '2px solid white', color: Textcolor_harsh_break }}>{this.numberWithCommas(this.state.data.fleet_trip_information.other_behavior.harsh_brake)}</td>
                  <td style={{ border: '2px solid white', color: Textcolor_speed_over_60 }}>{this.numberWithCommas(this.state.data.fleet_trip_information.overspeed.over60)}</td>
                  <td style={{ border: '2px solid white', color: Textcolor_speed_over_80 }}>{this.numberWithCommas(this.state.data.fleet_trip_information.overspeed.over80)}</td>
                  <td style={{ border: '2px solid white', color: Textcolor_speed_over_100 }}>{this.numberWithCommas(this.state.data.fleet_trip_information.overspeed.over100)}</td>
                  <td style={{ border: '2px solid white', color: Textcolor_speed_over_120 }}>{this.numberWithCommas(this.state.data.fleet_trip_information.overspeed.over120)}</td>
                </tr>
              </table>

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
export default (connect(mapStateToProps, mapDispatchToProps)(EcoComponentfleet));

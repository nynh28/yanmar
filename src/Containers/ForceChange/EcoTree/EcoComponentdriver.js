import React, { Component } from 'react';
import "./eco.css";
import { Row, Col, Progress } from "reactstrap";
import $ from 'jquery';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Mileagesandfuel from './Graphcomponentdriver/Mileagesandfuelgraph/Mileagesandfuelgraph'
import Spidersafety from './Graphcomponentdriver/Spidersafety/Spidersafety'
import Spidereco from './Graphcomponentdriver/Spidereco/Spidereco'
import Fuelcon6m from './Graphcomponentdriver/Fuelcon6m/Fuelcon6m'
import Daynightgraph from './Graphcomponentdriver/daynightgraph/daynightgraph'
import { Margin } from 'devextreme-react/chart';
import queryString from 'query-string';
import image from './icons/images';
import { t } from '../../Components/Translation'
import { connect } from 'react-redux'
import Alert from '../../Components/Alert'
import { ENDPOINT_BASE_URL } from '../../../Config/app-config';

class EcoComponentdriver extends Component {
  constructor(props) {
    super(props);

    this.CreatePDFfromHTML = this.CreatePDFfromHTML.bind(this);
    this.data = {
      1: {
        Driver_name: 'N/A',
        Vehicle_number: '',
        vehicle_mileages: '',
        fuel_cost_summary: '',
        Average_Mileages_All_Vehicle: '',
        Your_Fuel_Amount_Use: '',
        Average_Fuel_Usage_All_Vehicle: '',
        Vehicle_Idling_Time: '',
        Average_Vehicle_Idling_Time: '',
        Vehicle_Fuel_Consumption: '',
        Average_Vehicle_Fuel_Consumption: '',
        Fuel_price: '',
        Average_cost_per_km: '',
        cost_per_km: '',
        Dlt_v1: '',
        Dlt_v2: '',
        Dlt_v3: '',
        Dlt_v4: '',
        Dlt_v5: '',
        Hc_v1: '',
        Hc_v2: '',
        Hc_v3: '',
        Hc_v4: '',
        Safety_Score_diving_value1: '4',
        Safety_Score_speed_value_avg: '4',
        Safety_Score_speed_value1: '4',
        Safety_Score_speed_value2: '4',
        Safety_Score_speed_value3: '3',
        Safety_Score_speed_value4: '4',
        Safety_Score_speed_value5: '4',
        Safety_Score_Hash_Start_avg: '4',
        Safety_Score_Hash_Start_value1: '4',
        Safety_Score_Hash_Start_value2: '4',
        Safety_Score_Hash_Start_value3: '4',
        Safety_Score_Hash_Start_value4: '4',
        Safety_Score_Hash_Start_value5: '4',
        Safety_Score_Hash_Start_value6: '4',
        Safety_Score_Hash_brake_value: '3',
        Safety_Score_Seat_Belt_value: '3',
        Safety_Score_Hash_Turn_value: '1',
        eco_Score_Idling_value: '3',
        eco_Score_Exhaust_value: '3',
        eco_Score_RPMhigh_value: '3',
        eco_Score_RPMlow_value: '3',
        eco_Score_ShiftUp_value: '3',
        eco_Score_ShiftDown_value: '4'

      }
    }
    this.state = {
      loading: true,
      dataSource: [],
      customer_data: [],
      utilization: [],
      utilizationday: [],
      isLoadingutilization: true,
      isLoadingevent: true,
      alertSetting: {
        show: true,
        type: 5
      }
    }
    let params = queryString.parse(this.props.location.search)
    if (typeof params.driver !== "undefined") {
      this.driver = JSON.parse(params.driver)
    }
    this.loadDriver(this.driver);
    this.customer_data()
    this.selectedCallback = this.selectedCallback.bind(this);
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  selectedCallback(e, t) {

    this.setState({
      serieclick: e,
      isReloading: true
    }, () => {
      this.loadevent()
      this.loadUtilizationday()
    })
  }

  async loadDriver(driver) {
    var fetchDriver = []
    for (var i = 0; i < driver.length; i++) {
      var object = {
        driver_id: driver[i]
      }
      var response = await fetch('https://hino-dev-api.natapol.work/dodeepapi/getdriverbyid', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Accept": "text/html",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(object) // body data type must match "Content-Type" header
      });
      var responseJson = await response.json();
      fetchDriver.push(responseJson)
    }

    this.driver = fetchDriver;
    this.setState({
      loading: false
    })
  }

  async CreatePDFfromHTML() {
    var HTML_Width = 210;
    var HTML_Height = 297;
    var top_left_margin = 0;
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

    pdf.save("SummaryReport - Driver View.pdf");
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
    // ////console.log(cust_id)
    var api = ENDPOINT_BASE_URL + "fleet/dashboard/summary?cust_id=" + cust_id
    var response = await fetch(api, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }

    });
    var responseJson = await response.json();
    // //console.log(responseJson);
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
          fuel_con: ((this.state.utilization.result[30].mileage) / (this.state.utilization.result[30].fuel_used / 1000)).toFixed(2),
          loading: false
        })
      })
    }
    else {
      //console.log('api Error')
    }
    // //console.log('wwwwwwwwwwwwwwwwwww poonpetch test')
    // //console.log(this.state.utilization)
  }



  async loadevent() {
    var date = this.state.serieclick
    var cust_id = 0
    this.state.customer_data.forEach((element) => {
      cust_id = element.int_cust_id
    })
    // //console.log(cust_id)
    var api = ENDPOINT_BASE_URL + "fleet/dashboard/summary/event/" + date + "?cust_id=" + cust_id
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
        event: responseJson.result
      }, () => {
        // //console.log('xxx')
        this.setState({
          dlt_overspeed: this.state.event.dlt_overspeed.sum,
          isLoadingevent: false,
          isReloading: false
        })
      })
    }
    else {
      //console.log('api Error')
    }

    // //console.log(this.state.event)
  }

  render() {
    let { fitObjectEnabled, GeofencesEnabled, objectEnabled, clusterEnabled, infoWindowEnabled, arrImg, arrImgActive, alertSetting } = this.state
    if (this.state.isLoadingutilization == true) {
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

      if (this.state.loading == true) {
        return (<div></div>)
      }

      for (var i = 0; i < this.data.length; i++) {
        // //console.log(this.data.length)
      }

      for (var i = 0; i < this.data.length; i++) {
        // //console.log(this.data.length)
      }
      // ////console.log(this.driver);
      return (
        <div className="Test2">
          <center><button className="btn-primary" onClick={this.CreatePDFfromHTML}>Export PDF</button></center><br></br>
          {this.driver.map((element) => {
            return (

              <Row>
                <Col lg={12}>
                  <div className="a4-portrait-with-startdriver print">
                    <div className="pdf-headline"><h5>{t("Driving_Summary")}</h5></div>
                    <div className="pdf-headline-1"><h6 style={{ fontWeight: 500 }}>{t("Driver_Name")}: {element.prefix_name} {element.firstname} {element.lastname}</h6></div>
                    <div className="pdf-headline-2"><h6 style={{ fontWeight: 500 }}>{t("Period")} : Jan 1 2020 - Jan 31 2020</h6></div>
                    <div className="pdf-headline-3"><h6 style={{ fontWeight: 500 }}>{t("Company_Name")} : N/A</h6></div>
                    <div className="pdf-headline-4"><h6 style={{ fontWeight: 500 }}>{t("Vehicle_Plate_Number")} : N/A</h6></div>
                    <div className="pdf-headline-5"><h6 style={{ fontWeight: 500 }} s>{t("Total")} : N/A</h6></div>
                    <div className="H-detail-1"><h4>{t("Driving_Details")}</h4></div>
                    <div className="H-detail-2"><h4>{t("Fuel_&_Cost_Details")}</h4></div>

                    <div className="dngraph1"><Mileagesandfuel chartwidth={730} chartHeight={300} data={this.state.utilization}  ></Mileagesandfuel></div>
                    <div className="fuelcon-1"><h5>{t("Fuel_Consumption_L6")}</h5></div>
                    <div className="fuelcon-2"><Fuelcon6m chartwidth={350} chartHeight={150}></Fuelcon6m></div>
                    <div className="runingtimecharts-1"><h5>{t("Runing_Time_s")}</h5></div>
                    <div className="runingtimecharts-2"><Daynightgraph chartwidth={270} chartHeight={60}></Daynightgraph></div>
                    <div className="vehicle-title-1"><h5>{t("Fuel_Cost")}</h5></div>
                    <div className="vehicle-title-2"><h5>{t("Fuel_Cost_perkm")}</h5></div>
                    <div className="vehicle-title-3"><h5>{this.data[1].fuel_cost_summary}N/A</h5></div>
                    <div className="vehicle-title-4"><h5>{this.data[1].cost_per_km}N/A</h5></div>
                    <div className="vehicle-title-5"><h5>{t("thb")}</h5></div>
                    <div className="vehicle-title-6"><h5>{t("thb/km")}</h5></div>
                    <div className="vehicle-title-7"><h5>{t("Mileages")}</h5></div>
                    <div className="vehicle-title-8"><h5>{t("Company_Average")}</h5></div>
                    <div className="vehicle-title-9"><h5>{element.driven}</h5></div>
                    <div className="vehicle-title-10"><h5>{this.data[1].Average_Mileages_All_Vehicle}N/A</h5></div>
                    <div className="vehicle-title-11"><h5>{t("km.")}</h5></div>
                    <div className="vehicle-title-12"><h5>{t("km.")}</h5></div>
                    <div className="vehicle-title-13"><h5>{t("Driving_Time")}</h5></div>
                    <div className="vehicle-title-14"><h5>{t("Engine_Hour")}</h5></div>
                    <div className="vehicle-title-15"><h5>N/A</h5></div>
                    <div className="vehicle-title-16"><h5>N/A</h5></div>
                    <div className="vehicle-title-17"><h5>{t("h.")}</h5></div>
                    <div className="vehicle-title-18"><h5>{t("h.")}</h5></div>
                    <div className="vehicle-title-19"><h5>{t("Idling_Time")}</h5></div>
                    <div className="vehicle-title-20"><h5>{t("Company_Average")}</h5></div>
                    <div className="vehicle-title-21"><h5>{element.idling}</h5></div>
                    <div className="vehicle-title-22"><h5>{this.data[1].Average_Vehicle_Idling_Time}N/A</h5></div>
                    <div className="vehicle-title-23"><h5>{t("h.")}</h5></div>
                    <div className="vehicle-title-24"><h5>{t("h.")}</h5></div>
                    <div className="vehicle-title-25"><h5>{t("Fuel_Usage")}</h5></div>
                    <div className="vehicle-title-26"><h5>{element.fuel_usage}</h5></div>
                    <div className="vehicle-title-27"><h5>{t("L.")}</h5></div>
                    <div className="vehicle-title-28"><h5>{t("Company_Average")}</h5></div>
                    <div className="vehicle-title-29"><h5>N/A</h5></div>
                    <div className="vehicle-title-30"><h5>{t("L.")}</h5></div>
                    <div className="vehicle-title-31"><h5>{t("Fuel_Price")}</h5></div>
                    <div className="vehicle-title-32"><h5>{this.data[1].Fuel_price}N/A</h5></div>
                    <div className="vehicle-title-33"><h5>{t("thb/L.")}</h5></div>
                    <div className="vehicle-title-34"><h5>{t("Company_Average")}</h5></div>
                    <div className="vehicle-title-35"><h5>{this.data[1].Average_cost_per_km}N/A</h5></div>
                    <div className="vehicle-title-36"><h5>{t("thb/km")}</h5></div>
                    <div className="vehicle-title-37"><h5>{t("Driving_with_N_Gear")}</h5></div>
                    <div className="vehicle-title-38"><h5>N/A</h5></div>
                    <div className="vehicle-title-39"><h5>N/A</h5></div>
                    <div className="vehicle-title-40"><h5>{t("km.")}</h5></div>
                    <div className="vehicle-title-41"><h5>{t("h.")}</h5></div>
                    <div className="vehicle-title-42"><h5>{t("Times_of_Refueling")}</h5></div>
                    <div className="vehicle-title-43"><h5>N/A</h5></div>
                    <div className="vehicle-title-44"><h5>{t("Time")}</h5></div>
                    <div className="vehicle-title-45"><h5>{t("Fuel_Consumption")}</h5></div>
                    <div className="vehicle-title-46"><h5>{element.fuel_consumption}</h5></div>
                    <div className="vehicle-title-47"><h5>{t("km/L.")}</h5></div>
                    <div className="vehicle-title-48"><h5>{t("Company_Average")}</h5></div>
                    <div className="vehicle-title-49"><h5>N/A</h5></div>
                    <div className="vehicle-title-50"><h5>{t("km/L.")}</h5></div>
                    <div className="DLT-title"><h5>{t("DLT_report")}</h5></div>
                    <div className="DLT">
                      <div class="divTable DLTreport">
                        <div class="divTableHeading">
                          <div class="divTableRow">
                            <div class="divTableHead">{t("Over4")}</div>
                            <div class="divTableHead">{t("Over8")}</div>
                            <div class="divTableHead">{t("Over_Speed")}</div>
                            <div class="divTableHead">{t("Not_Swipe_Card")}</div>
                            <div class="divTableHead">{t("Unplug")}</div>
                          </div>
                        </div>
                        <div class="divTableBody">
                          <div class="divTableRow">
                            <div class="divTableCell">{element.dlt_over4}</div>
                            <div class="divTableCell">{element.dlt_over8}</div>
                            <div class="divTableCell">{element.dlt_overspeed}</div>
                            <div class="divTableCell">N/A</div>
                            <div class="divTableCell">N/A</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="HC-title"><h5>{t("Hino_Criteria")}</h5></div>
                    <div className="HSC">
                      <div class="divTable HSCreport">
                        <div class="divTableHeading">
                          <div class="divTableRow">
                            <div class="divTableHead">{t("Over_Speed60")}</div>
                            <div class="divTableHead">{t("Over_Speed80")}</div>
                            <div class="divTableHead">{t("Over_Speed100")}</div>
                            <div class="divTableHead">{t("Over_Speed120")}</div>
                          </div>
                        </div>
                        <div class="divTableBody">
                          <div class="divTableRow">
                            <div class="divTableCell">N/A</div>
                            <div class="divTableCell">N/A</div>
                            <div class="divTableCell">N/A</div>
                            <div class="divTableCell">N/A</div>

                          </div>
                        </div>
                      </div>
                    </div>





                    <div className="pdf-2-container">
                      <p>Your vehicle was operated 20% more than average of all vehicles in this company.<br></br><span className="sharp">WARNING </span>Your fuel consumption higher than standard Please check the engine.</p>
                    </div>
                  </div>
                  <div className="a4-portrait-with-condriver print">
                    <div className="pdf3-headline"><h3>Driving Behavior</h3></div>
                    <div className="spider"><Spidersafety chartwidth={260} chartHeight={260}></Spidersafety></div>
                    <div className="spider1"><Spidereco chartwidth={275} chartHeight={275}></Spidereco></div>
                    <div className="table-spider">
                      <div className="divTable greyGridTable">
                        <div className="divTableHeading">
                          <div className="divTableRow">
                            <div className="divTableHead">Safety Driving</div>
                            <div className="divTableHead">Criteria</div>
                            <div className="divTableHead scorecellbr">Full Score = 5</div>
                            <div className="divTableHead">Eco Driving</div>
                            <div className="divTableHead">
                              <p style={{ marginBottom: 0 }}> Criteria</p>
                            </div>
                            <div className="divTableHead">Full Score = 5</div>
                          </div>
                        </div>
                        <div className="divTableBody">
                          <div className="divTableRow">
                            <div className="divTableCell hcell"><img src={image.speed} height="24" width="24"></img><br></br> Exceeding Speed</div>
                            <div className="divTableCell">Over Speed Time (%) > 60 km./h.</div>
                            <div className="divTableCell scorecellbr">4</div>
                            <div className="divTableCell hcell"><img src={image.Idling} height="24" width="24"></img><br></br>Long Idling</div>
                            <div className="divTableCell"> % of Engine on Without Speed </div>
                            <div className="divTableCell scorecell">3</div>
                          </div>
                          <div className="divTableRow">
                            <div className="divTableCell hcell"><img src={image.RPM} height="24" width="24"></img><br></br>Exceeding RPM</div>
                            <div className="divTableCell">Over Green Zone RPM</div>
                            <div className="divTableCell scorecellbr">4</div>
                            <div className="divTableCell hcell"><img src={image.Exhaust} height="24" width="24"></img><br></br> Exhaust Brake/Retarder</div>
                            <div className="divTableCell"><p style={{ marginBottom: 0 }}>When RPM> 900</p></div>
                            <div className="divTableCell scorecell">3</div>
                          </div>
                          <div className="divTableRow">
                            <div className="divTableCell hcell"><img src={image.Hashstart} height="24" width="24"></img><br></br>Harsh Start</div>
                            <div className="divTableCell">Acceleration Pedal > 70%</div>
                            <div className="divTableCell scorecellbr">3</div>
                            <div className="divTableCell hcell"><img src={image.RPMhight} height="24" width="24"></img><br></br>RPM High Speed</div>
                            <div className="divTableCell"><p style={{ marginBottom: 0 }}>Speed > 61 km/h</p></div>
                            <div className="divTableCell scorecell">3</div>
                          </div>
                          <div className="divTableRow">
                            <div className="divTableCell hcell"><img src={image.Hashstart} height="24" width="24"></img><br></br>Harsh Acceleration</div>
                            <div className="divTableCell">Decreate Speed > 13 km./h in 1 sec</div>
                            <div className="divTableCell scorecellbr">4</div>
                            <div className="divTableCell hcell"><img src={image.RPMlow} height="24" width="24"></img><br></br>RPM Low Speed</div>
                            <div className="divTableCell"> <p style={{ marginBottom: 0 }}>Speed 1 - 60 km/h</p></div>
                            <div className="divTableCell scorecell">3</div>
                          </div>
                          <div className="divTableRow">
                            <div className="divTableCell hcell"><img src={image.Hashbrake} height="24" width="24"></img><br></br>Harsh Brake</div>
                            <div className="divTableCell">Decreate Speed > 13 km./h in 1 sec</div>
                            <div className="divTableCell scorecellbr">3</div>
                            <div className="divTableCell hcell"><img src={image.shitup} height="24" width="24"></img><br></br>Shift Up & <br></br>Exceeding RPM</div>
                            <div className="divTableCell"><p style={{ marginBottom: 0 }}>Average Shift + Up/RPM</p></div>
                            <div className="divTableCell scorecell">4</div>
                          </div>
                          <div className="divTableRow">
                            <div className="divTableCell hcell"><img src={image.shaptrun} height="24" width="24"></img><br></br>Sharp Turn</div>
                            <div className="divTableCell">% of Sharp Turn</div>
                            <div className="divTableCell scorecellbr">1</div>
                            <div className="divTableCell hcell"><img src={image.shitup} height="24" width="24"></img><br></br>Shift Down & Exceeding RPM</div>
                            <div className="divTableCell"><p style={{ marginBottom: 0 }}>Average Shift + Down/RPM</p></div>
                            <div className="divTableCell scorecell">3</div>
                          </div>
                          <div class="divTableRow">
                            <div class="divTableCell" style={{ fontWeight: 'bold' }}>Score</div>
                            <div class="divTableCell" style={{ fontWeight: 'bold' }}>Safety Summary</div>
                            <div class="divTableCell footerscorecell">19/30</div>
                            <div class="divTableCell" style={{ fontWeight: 'bold' }}>Score</div>
                            <div class="divTableCell" style={{ fontWeight: 'bold' }}>Eco Summary</div>
                            <div class="divTableCell" style={{ fontWeight: 'bold' }}>19/30</div>
                          </div>
                        </div>

                        <div class="divTableFoot tableFootStyle">
                          <div class="divTableRow" style={{ textAlign: 'center' }}>
                            <div class="divTableCell" ></div>
                            <div class="divTableCell" style={{ fontSize: 13 }}>Your Safety Score is 63/100 (C)</div>
                            <div class="divTableCell" ></div>
                            <div class="divTableCell" ></div>
                            <div class="divTableCell" style={{ fontSize: 13 }}>Your Eco Score is 63/100 (C)</div>
                            <div class="divTableCell" ></div>
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="comment-safety">
                      <p>Your Driving Behavior Score is 63/100 (Grade C)<br></br>You​ should​ reduce​ harsh​ brake and​ always​ fasten your​ seat​belt for​ safety.​<br></br>Do​ not​ make​ <span className="sharp">sharp​ turn</span> for​ your​ own safety!</p>
                    </div>
                  </div>
                </Col>
              </Row>



            );
          })
          }



        </div >




      );
    }
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
export default (connect(mapStateToProps, mapDispatchToProps)(EcoComponentdriver));

import React, { Component } from 'react';
import "./ecofleet.css";
import $ from 'jquery';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Operationchart from './Graphcomponentfleet/Operationchart/Operationchart'
import Spidersafetyfleet from './Graphcomponentfleet/Spidersafety/Spidersafety'
import Spiderecofleet from './Graphcomponentfleet/Spidereco/Spidereco'
import Daynightgraph from './Graphcomponentfleet/daynightgraph/daynightgraph'
import Mileageunitgraph from './Graphcomponentfleet/Mileageunitgraph/Mileageunitgraph'
import Hourunit from './Graphcomponentfleet/Hourunitgraph/Hourunitgraph'
import Operationchartbar from './Graphcomponentfleet/Operationchartbar/Operationchartbar';
import Drivergrade from './Graphcomponentfleet/Drivergradegraph/Drivergradegraph';
import image from './icons/images';
import Table from './Table.js'
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
      ranking: []
    }
    let params = queryString.parse(this.props.location.search)
    if (typeof params.Fleet !== "undefined") {
      this.Fleet = JSON.parse(params.Fleet)
    }
    this.loadFleet(this.Fleet);


  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  async loadFleet() {
    var response = await fetch('https://hino-dev-api.natapol.work/dodeepapi/getTripByFleet', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Accept": "text/html",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ fleet_id: 43 }) // body data type must match "Content-Type" header
    });
    var responseJson = await response.json();
    this.driver = responseJson
    // //console.log(this.driver)
    var result = Object.keys(this.driver.vehicle_trip).map((key) => {
      return [Number(key), this.driver.vehicle_trip[key]];
    });
    var ranking = result.sort(function (a, b) {
      return a[1].trips < b[1].trips ? 1 : -1;
    });
    // //console.log(ranking);
    this.setState({
      loading: false,
      ranking: ranking
    })
  }



  componentDidMount() {
    this.loadFleet()
    this.loadvehicle()
  }

  async loadvehicle() {
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
      body: JSON.stringify()

    });
    var responseJson = await response.json();
    // //console.log(responseJson);
    this.setState({
      vehicle: responseJson.vehicle
    })
  }



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
    // //console.log(cust_id)
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
          fuel_con: ((this.state.utilization.result[30].mileage) / (this.state.utilization.result[30].fuel_used / 1000)).toFixed(2)
        })
      })
    }
    else {
      //console.log('api Error')
    }
    // //console.log(this.state.utilization)
  }

  async loadUtilizationday() {
    var date = this.state.serieclick
    var cust_id = 0
    this.state.customer_data.forEach((element) => {
      cust_id = element.int_cust_id
    })
    // //console.log(cust_id)
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

    // //console.log(this.state.utilizationday)
  }

  render() {
    if (this.state.loading == true) {
      return (
        <div></div>
      )
    }
    var over4 = 0;
    var over8 = 0;
    var overspeed = 0;
    var notswipe = 0;
    var unplug = 0;
    this.state.ranking.forEach((element, i) => {
      over4 += element[1]['dlt']['over4']
      over8 += element[1]['dlt']['over8']
      overspeed += element[1]['dlt']['overspeed']
      notswipe += element[1]['dlt']['notswipe']
      unplug += element[1]['dlt']['unplug']
    })
    return (
      <div className="Test2">
        <center><button className="btn-primary" onClick={this.CreatePDFfromHTML}>Export PDF</button></center><br></br>
        <div>
          <div className="a4-portrait-with-startfleet print">
            <div className="pdf-headline"><h5 >Ecotree Fleet Summary</h5></div>
            <div className="pdf-headline-1"><h6 style={{ fontWeight: 500 }}>Fleet Name : A</h6></div>
            <div className="pdf-headline-2"><h6 style={{ fontWeight: 500 }}>Period : Mar 1 2020 - Mar 22 2020</h6></div>
            <div className="pdf-headline-3"><h6 style={{ fontWeight: 500 }}>Company Name : Hino Thailand</h6></div>
            <div className="pdf-headline-4"><h6 style={{ fontWeight: 500 }}>Total Vehicles In Fleet : {this.state.ranking.length} units</h6></div>


            <div className="fleet-title-1"><h5>Driving Summary</h5></div>

            <div className="fleet-title-2"><h5>Top 10 Runner/Trip</h5></div>

            <div className="fleet-title-19"><h5>Mileages By Units</h5></div>
            <div className="fleet-title-20"><h5>Runing hour by units</h5></div>
            <div className="fleet-title-21"><h5>Truck Utilization</h5></div>
            <div className="fleet-title-22"><h5>Daytime - Nighttime Operation</h5></div>
            <div className="fleet-title-23"><h5>Driver Grade</h5></div>
            <div className="fleet-title-24">Your fleet</div>
            <div className="fleet-title-25">Fleet Average Runing Time In Company</div>
            <div className="fleet-title-26">Fleet Average Runing Time In Thailand</div>
            <div className="tabletoprank">
              <div className="divTable greyGridTable2">
                <div className="divTableHeading">
                  <div className="divTableRow">
                    <div className="divTableHead"> Rank </div>
                    <div className="divTableHead"> Truck </div>
                    <div className="divTableHead"> Mileages(km) </div>
                    <div className="divTableHead"> Trip (Times) </div>
                  </div>
                </div>
                <div className="divTableBody">
                  {this.state.ranking.map((element, i) => {
                    return (<div className="divTableRow">
                      <div className="divTableCell scorecell">#{i + 1}</div>
                      <div className="divTableCell">{element[0]}</div>
                      <div className="divTableCell">{element[1].mileage.toFixed(2)}</div>
                      <div className="divTableCell">{element[1].trips.toFixed(2)}</div>
                    </div>)
                  })}


                </div>
              </div>
            </div>
            <div className="Daynightgraph"><Daynightgraph chartwidth={300} chartHeight={50}></Daynightgraph></div>

            <div className="Hourunitgraph"><Hourunit chartwidth={320} chartHeight={160}></Hourunit></div>
            <div className="Mileageunitgraph"><Mileageunitgraph chartwidth={350} chartHeight={160}></Mileageunitgraph></div>

            <div className="Operationchartbar"><Operationchartbar chartwidth={370} chartHeight={230}></Operationchartbar></div>
            <div className="Drivergrade"><Drivergrade chartwidth={300} chartHeight={50}></Drivergrade></div>

            <div className="DLT-title"><h5>{t("DLT_report")}</h5></div>
            <div className="DLTtablefleet">
              <div class="divTable DLTreportfleet">
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
                    <div class="divTableCell">{over4}</div>
                    <div class="divTableCell">{over8}</div>
                    <div class="divTableCell">{overspeed}</div>
                    <div class="divTableCell">{notswipe}</div>
                    <div class="divTableCell">{unplug}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="HC-title"><h5>{t("Hino_Criteria")}</h5></div>
            <div className="HSCfleet">
              <div class="divTable HSCreport2">
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
            <div className="table-fleet">

              <div className="divTable greyGridTable3">
                <div className="divTableHeading">
                  <div className="divTableRow">
                    <div className="divTableHead"></div>
                    <div className="divTableHead"></div>
                    <div className="divTableHead">Total In Fleet</div>
                    <div className="divTableHead"><p>Average<br></br>Per Vehicle</p></div>
                    <div className="divTableHead"><p>Average<br></br>In Company</p></div>
                  </div>
                </div>
                <div className="divTableBody">
                  <div className="divTableRow">
                    <div className="divTableCell"><img style={{ margin: 5 }} src="assets/img/6.png" height="20" width="20"></img></div>
                    <div className="divTableCell">Mileages (km)</div>
                    <div className="divTableCell">{this.driver.sum_mileage.toFixed(2)} </div>
                    <div className="divTableCell">{this.driver.vehicle_averge.toFixed(2)}</div>
                    <div className="divTableCell">{this.driver.company_averge.toFixed(2)}</div>
                  </div>
                  <div className="divTableRow">
                    <div className="divTableCell"><img style={{ margin: 5 }} src="assets/img/f3.png" height="20" width="20"></img></div>
                    <div className="divTableCell">Fuel Usage (L.)</div>
                    <div className="divTableCell">83,424</div>
                    <div className="divTableCell">1,733</div>
                    <div className="divTableCell ">2,134</div>
                  </div>
                  <div className="divTableRow">
                    <div className="divTableCell"><img style={{ margin: 5 }} src="assets/img/f2.png" height="20" width="20"></img></div>
                    <div className="divTableCell">Fuel Consumption (km/L)</div>
                    <div className="divTableCell"></div>
                    <div className="divTableCell ">5.51</div>
                    <div className="divTableCell ">5.54</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="spiderfleet"><Spidersafetyfleet chartwidth={260} chartHeight={260}></Spidersafetyfleet></div>
            <div className="spider1fleet"><Spiderecofleet chartwidth={270} chartHeight={270}></Spiderecofleet></div>

            <div className="pdf-2-container">

            </div>
          </div>


          <div className="a4-portrait-with-confleet print">
            <div className="pdf3-headline"><h3>Driving Summary</h3></div>
            <div className="fleetsumtable">

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

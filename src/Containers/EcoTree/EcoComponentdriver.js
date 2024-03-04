import React, { Component } from 'react';
import "./eco.css";
import { Row, Col } from "reactstrap";
import $ from 'jquery';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Mileagesandfuel from './Graphcomponentdriver/Mileagesandfuelgraph/Mileagesandfuelgraph'
import Spidersafety from './Graphcomponentdriver/Spidersafety/Spidersafety'
import Spidereco from './Graphcomponentdriver/Spidereco/Spidereco'
import Fuelcon6m from './Graphcomponentdriver/Fuelcon6m/Fuelcon6m'
import Daynightgraph from './Graphcomponentdriver/daynightgraph/daynightgraph'
import queryString from 'query-string';
import image from './icons/images';
import { t } from '../../Components/Translation'
import { connect } from 'react-redux'
import Alert from '../../Components/Alert'
import { ENDPOINT_BASE_URL, ENDPOINT_SETTING_REPORT_BASE_URL } from '../../Config/app-config';
import moment from 'moment'
import { get } from 'lodash'
class EcoComponentdriver extends Component {
  constructor(props) {
    super(props);

    this.CreatePDFfromHTML = this.CreatePDFfromHTML.bind(this);
    this.state = {
      loading: true,
      dataSource: [],
      customer_data: [],
      utilization: [],
      utilizationday: [],
      isLoadingutilization: true,
      // isLoadingevent: true,
      oilPrice: 0,
      alertSetting: {
        show: true,
        type: 5
      }
    }
    let params = queryString.parse(this.props.location.search)
    if (typeof params.driver !== "undefined") {
      this.driver = JSON.parse(params.driver)
      this.customer = params.customer
      this.startDate = params.startdate
      this.endDate = params.enddate
      this.driverId = JSON.parse(params.driver)
    }
    // this.loadDriver(this.driver);
    this.getinfoDriver(this.driver);
    // this.customer_data()
    // this.selectedCallback = this.selectedCallback.bind(this);
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    // console.log(responseJson)
    this.setState({
      oilPrice: responseJson['Diesel'].price
    })
  }

  async getinfoDriver(driver) {
    // console.log('driver', driver)
    // console.log('this.startDate', this.startDate, moment(this.startDate, 'X').format('YYYY-MM-DD'))
    let lstInfo = []
    let utilization = []

    for (let i in driver) {
      let object = {
        driver_id: driver[i],
        // customer: this.customer,
        start_date: moment(this.startDate, 'X').format('YYYY-MM-DD'),
        stop_date: moment(this.endDate, 'X').format('YYYY-MM-DD')
        // start_date: this.startDate,
        // end_date: this.endDate
      }
      let response = await fetch(ENDPOINT_BASE_URL + 'fleet/ecotree', {
        // var response = await fetch(ENDPOINT_BASE_URL + 'fleet/getdriverbyid', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          // "Accept": "text/html",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(object) // body data type must match "Content-Type" header
      });

      let responseJson = await response.json();
      // console.log('responseJson', responseJson)
      if (responseJson.code === 200) {
        // console.log('responseJson.result', responseJson.result)
        lstInfo.push(responseJson.result)

        utilization.push({
          result: get(responseJson, 'result.summary_trip')
        })
      }

      // console.log('responseJson', responseJson.result)
      // lstInfo.push(responseJson)


    }

    this.driver = lstInfo;
    this.setState({
      utilization,
      loading: false,
      isLoadingutilization: false
    })

    // this.driver = fetchDriver;
    // this.setState({
    //   loading: false
    // })
  }

  async loadDriver(driver) {
    var fetchDriver = []

    for (var i = 0; i < driver.length; i++) {
      var object = {
        driver_id: driver[i],
        customer: this.customer,
        start_date: this.startDate,
        end_date: this.endDate
      }
      var response = await fetch(ENDPOINT_SETTING_REPORT_BASE_URL + 'dodeepapi/getdriverbyid', {
        // var response = await fetch(ENDPOINT_BASE_URL + 'fleet/getdriverbyid', {
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
      // this.loadevent()
      this.loadUtilization()
    })
  }

  async loadUtilization() {
    var cust_id = 0
    this.state.customer_data.forEach((element) => {
      cust_id = element.int_cust_id
    })

    var api = ENDPOINT_BASE_URL + "fleet/report/driver/driving"
    var startDate = moment.unix(this.startDate).format('YYYY-MM-DD')
    var endDate = moment.unix(this.endDate).add(1, 'day').format('YYYY-MM-DD')
    var startDateTime = moment.unix(this.startDate).format('YYYY-MM-DD') + " 00:00:00"
    var endDateTime = moment.unix(this.startDate).format('YYYY-MM-DD') + " 23:59:59"
    var utilization = {
      result: []
    }
    // var start_d = moment.unix(this.startdate).format('DD')
    // var start_m = moment.unix(this.startdate).format('MM')
    // var start_y = moment.unix(this.startdate).format('YYYY')
    // var end_d = moment.unix(this.endDate).format('DD')
    // var end_m = moment.unix(this.endDate).format('MM')
    // var end_y = moment.unix(this.endDate).format('YYYY')
    // var start = moment([start_y, start_m, start_d])
    // var end = moment([end_y, end_m, end_d])
    // let diff = end.diff(start, 'days') + 1
    for (var i = 0; i < this.driverId.length; i++) {
      while (startDate != endDate) {
        var object = {
          "did_list": [this.driverId[i]],
          "dtstart": moment(startDate).format('YYYY-MM-DD') + " 00:00:00",
          "dtstop": moment(startDate).format('YYYY-MM-DD') + " 23:59:59",
          "cust_id": cust_id
        }

        // var api = ENDPOINT_BASE_URL + "fleet/dashboard/summary?cust_id=" + cust_id
        var response = await fetch(api, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.props.dataLogin.userTokenInfo.idToken,
            'X-API-Key': this.props.dataLogin.redisKey
            // mode: 'no-cors'
          },
          body: JSON.stringify(object)

        });
        var responseJson = await response.json();

        if (responseJson.code == 200) {
          if (responseJson.result.length == 0) {
            responseJson.result.push({
              count: 0,
              datetime: startDate,
              department: "",
              display_name: "SINPATTANADIT TANAWAT",
              employee_code: "",
              fuel_cons: 0,
              fuel_used: 0,
              id: 82,
              personal_id: "5411400109288",
              position: "",
              speed_avg: 0,
              speed_max: 0,
              speed_min: 0,
              total_distance: 0,
              total_time: 0,
            })
            utilization.result.push(responseJson.result[0])
          }
          else {
            if (responseJson.result[0].fuel_used == 0) {
              responseJson.result[0].total_distance = 0
            }
            // else{
            //   responseJson.result[0]. total_distance = startDate
            // }
            responseJson.result[0].datetime = startDate
            utilization.result.push(responseJson.result[0])
          }


          // this.setState({
          //   utilization: responseJson
          // },
          //  () => {

          // }
          // )
        }
        else {
          //console.log('api Error')
        }

        startDate = moment(startDate).add(1, 'day').format('YYYY-MM-DD')
      }
      this.state.utilization.push(utilization)
      utilization = {
        result: []
      }

      startDate = moment.unix(this.startDate).format('YYYY-MM-DD')
      endDate = moment.unix(this.endDate).add(1, 'day').format('YYYY-MM-DD')
    }

    this.setState({}, () => {

      this.setState({ loading: false, isLoadingutilization: false, })
    })

    // //console.log(this.state.utilization)
    // var idle_time_cal = (this.state.utilization.result[30].idle_time / 60).toFixed(2)
    // //console.log(idle_time_cal)
    // var idle_max = (this.state.utilization.result[30].idle_max / 60).toFixed(2)
    // var oversped_time = this.state.utilization.result[30].oversped_time + ' m'
    // if (this.state.utilization.result[30].oversped_time > 60) {
    //   oversped_time = (this.state.utilization.result[30].oversped_time / 60).toFixed(2)
    //   var oversped_time_h = oversped_time.split('.')[0]
    //   var oversped_time_m = oversped_time.split('.')[1]
    //   if (oversped_time_m != "00") {
    //     oversped_time_m = (60 * (oversped_time_m / 100)).toFixed(0)
    //   }
    //   oversped_time = oversped_time_h + " h " + oversped_time_m + " m"
    // }


    // var idle_max_h = idle_max.split('.')[0]
    // var idle_max_m = idle_max.split('.')[1]
    // var idle_time_cal_h = idle_time_cal.split('.')[0]
    // var idle_time_cal_m = idle_time_cal.split('.')[1]
    // if (idle_time_cal_m != "00" || idle_max_m) {
    //   idle_time_cal_m = (60 * (idle_time_cal_m / 100)).toFixed(0)
    //   idle_max_m = (60 * (idle_max_m / 100)).toFixed(0)
    // }
    // var idle_time_cal_h_m = idle_time_cal_h + " h " + idle_time_cal_m + " m"
    // var idle_max_h_m = idle_max_h + " h " + idle_max_m + " m"
    // this.setState({
    //   // fuel_con: this.state.utilization.result[30].fuel_cons,
    //   fuel_used: this.numberWithCommas((this.state.utilization.result[30].fuel_used / 1000).toFixed(1)),
    //   mileage: this.numberWithCommas(this.state.utilization.result[30].mileage),
    //   idle_fuel_used: this.state.utilization.result[30].idle_fuel_used,
    //   idle_time: idle_time_cal_h_m,
    //   idle_max: idle_max_h_m,
    //   idle_fuel_used: this.numberWithCommas((this.state.utilization.result[30].idle_fuel_used / 1000).toFixed(1)),
    //   overspeed_count: this.state.utilization.result[30].oversped_count,
    //   overspd_max: this.state.utilization.result[30].overspd_max,
    //   oversped_time: oversped_time,
    //   isLoadingutilization: false,
    //   fuel_con: ((this.state.utilization.result[30].mileage) / (this.state.utilization.result[30].fuel_used / 1000)).toFixed(2),
    //   loading: false
    // })

    // //console.log(this.state.utilization)
  }



  // async loadevent() {
  //   var date = this.state.serieclick
  //   var cust_id = 0
  //   this.state.customer_data.forEach((element) => {
  //     cust_id = element.int_cust_id
  //   })

  //   var api = ENDPOINT_BASE_URL + "fleet/dashboard/summary/event/" + date + "?cust_id=" + cust_id
  //   var response = await fetch(api, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     }

  //   });
  //   var responseJson = await response.json();
  //   if (responseJson.code == 200) {
  //     this.setState({
  //       event: responseJson.result
  //     }, () => {

  //       this.setState({
  //         dlt_overspeed: this.state.event.dlt_overspeed.sum,
  //         isLoadingevent: false,
  //         isReloading: false
  //       })
  //     })
  //   }
  //   else {
  //     //console.log('api Error')
  //   }

  //   // //console.log(this.state.event)
  // }

  componentDidMount() {
    // this.get_oil_price()
    let params = queryString.parse(this.props.location.search)
    this.startdate = params.startdate
    this.enddate = params.enddate
  }

  render() {
    let { language } = this.props
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

      // if (this.state.loading == true) {
      //   return (<div></div>)
      // }

      return (
        <div className="Test2">
          <center><button className="btn-primary" onClick={this.CreatePDFfromHTML}>Export PDF</button></center><br></br>
          {this.driver.map((element, i) => {

            var result_message = {
              th: "",
              en: "",
              ja: ""
            }
            // console.log(typeof element.behavior_summary)
            if (typeof element.behavior_summary != "undefined") {
              var safety_point = element.behavior_summary.safety[0].point + element.behavior_summary.safety[1].point + element.behavior_summary.safety[2].point + element.behavior_summary.safety[3].point + element.behavior_summary.safety[4].point + element.behavior_summary.safety[5].point
              var eco_point = element.behavior_summary.eco[0].point + element.behavior_summary.eco[1].point + element.behavior_summary.eco[2].point + element.behavior_summary.eco[3].point + element.behavior_summary.eco[4].point + element.behavior_summary.eco[5].point

              //-----------------------------------
              var conitnue_message = false
              var Textcolor_dlt_over4 = 'black'
              var Textcolor_dlt_over8 = 'black'
              var Textcolor_dlt_overspeed = 'black'
              var Textcolor_dlt_not_swipe_card = 'black'
              var Textcolor_dlt_unplug = 'black'
              //-----------------------------------
              var Textcolor_harsh_acceleration = 'black'
              var Textcolor_harsh_start = 'black'
              var Textcolor_sharp_turn = 'black'
              var Textcolor_harsh_break = 'black'
              var Textcolor_speed_over_60 = 'black'
              var Textcolor_speed_over_80 = 'black'
              var Textcolor_speed_over_100 = 'black'
              var Textcolor_speed_over_120 = 'black'
              if (element.dlt_over4 != 0 || element.dlt_over4 != "0") {
                Textcolor_dlt_over4 = 'red'
              }
              if (element.dlt_over8 != 0 || element.dlt_over8 != "0") {
                Textcolor_dlt_over8 = 'red'
              }
              if (element.dlt_overspeed != 0 || element.dlt_overspeed != "0") {
                Textcolor_dlt_overspeed = 'red'
              }
              if (element.dlt_not_swipe_card != 0 || element.dlt_not_swipe_card != "0") {
                Textcolor_dlt_not_swipe_card = 'red'
              }
              if (element.dlt_unplug != 0 || element.dlt_unplug != "0") {
                Textcolor_dlt_unplug = 'red'
              }
              //-----------------------------------
              if (element.sharp_turn != 0 || element.sharp_turn != "0") {
                Textcolor_sharp_turn = 'red'
              }
              if (element.harsh_break != 0 || element.harsh_break != "0") {
                Textcolor_harsh_break = 'red'
              }
              if (element.harsh_acceleration != 0 || element.harsh_acceleration != "0") {
                Textcolor_harsh_acceleration = 'red'
              }
              if (element.harsh_start != 0 || element.harsh_start != "0") {
                Textcolor_harsh_start = 'red'
              }
              if (element.speed_over_60 != 0 || element.speed_over_60 != "0") {
                Textcolor_speed_over_60 = 'red'
              }
              if (element.speed_over_80 != 0 || element.speed_over_80 != "0") {
                Textcolor_speed_over_80 = 'red'
              }
              if (element.speed_over_100 != 0 || element.speed_over_100 != "0") {
                Textcolor_speed_over_100 = 'red'
              }
              if (element.speed_over_120 != 0 || element.speed_over_120 != "0") {
                Textcolor_speed_over_120 = 'red'
              }
              //-----------------------------------
              result_message.en += " For Safety  Driving. ";
              result_message.th += " ด้านความปลอดภัย ";
              result_message.ja += " For Safety  Driving. ";

              if (safety_point > 27) {
                result_message.en += " Your Safety driving. Skill is very well ";
                result_message.th += " คุณขับปลอดภัยดีมาก ";
                result_message.ja += " Your Safety driving. Skill is very well ";
              } else if (safety_point > 18 && safety_point < 28) {
                result_message.en += " You are safety driver. Make it better. ";
                result_message.th += " คุณขับค่อนข้างปลอดภัย ";
                result_message.ja += " You are safety driver. Make it better. ";
              } else {
                result_message.en += " You are not safety driver. Please improve skill. ";
                result_message.th += " คุณขับอันตราย จะต้องปรับปรุงดังนี้ ";
                result_message.ja += " You are not safety driver. Please improve skill. ";
              }
              if (element.behavior_summary.safety[0].point < 3) {
                result_message.en += " Maintain your speed under 60 km/h ";
                result_message.th += " อย่าขับเร็วเกิน 60 กม/ชม. ";
                result_message.ja += " Maintain your speed under 60 km/h ";
                conitnue_message = true
              }
              if (element.behavior_summary.safety[1].point < 3) {
                if (conitnue_message == true) {
                  result_message.en += " , "
                  // result_message.th += " , "
                  result_message.ja += " , "
                }
                result_message.en += " Maintain your RPM around 1,100 RPM ";
                result_message.th += " พยายามใช้รอบประมาณ 1,100 รอบต่อนาที "
                result_message.ja += " Maintain your RPM around 1,100 RPM "
                conitnue_message = true
              }
              if (element.behavior_summary.safety[2].point < 3) {
                if (conitnue_message == true) {
                  result_message.en += " , "
                  // result_message.th += " , "
                  result_message.ja += " , "
                }
                result_message.en += " Gently start acceleration ";
                result_message.th += " อย่าออกตัวกระชาก ";
                result_message.ja += " Gently start acceleration ";
                conitnue_message = true
              }
              if (element.behavior_summary.safety[3].point < 3) {
                if (conitnue_message == true) {
                  result_message.en += " , "
                  // result_message.th += " , "
                  result_message.ja += " , "
                }
                result_message.en += " Gently overtaking ";
                result_message.th += " อย่าออกตัวกระชาก ";
                result_message.ja += " Gently overtaking ";
                conitnue_message = true
              }
              if (element.behavior_summary.safety[4].point < 3) {
                if (conitnue_message == true) {
                  result_message.en += " , "
                  // result_message.th += " , "
                  result_message.ja += " , "
                }
                result_message.en += " More distant from the front vehicle ";
                result_message.th += " เพิ่มการเว้นระยะจากคันหน้า ";
                result_message.ja += " More distant from the front vehicle ";
                conitnue_message = true
              }
              if (element.behavior_summary.safety[5].point < 3) {
                if (conitnue_message == true) {
                  result_message.en += " , "
                  // result_message.th += " , "
                  result_message.ja += " , "
                }
                result_message.en += " Reduce speed before turn ";
                result_message.th += " ลดความเร็วก่อนเลี้ยว ";
                result_message.ja += " Reduce speed before turn ";
                conitnue_message = true
              }

              result_message.en += "\n For ECO Driving. ";
              result_message.th += "\n ด้านความประหยัด ";
              result_message.ja += "\n For ECO Driving. ";

              if (eco_point > 27) {
                result_message.en += "   Your ECO driving skill is very well. ";
                result_message.th += "   คุณขับประหยัดดีมาก ";
                result_message.ja += "   Your ECO driving skill is very well. ";
              } else if (eco_point > 18 && eco_point < 28) {
                result_message.en += "   You are ECO driver. Make it better. ";
                result_message.th += "   คุณขับค่อนข้างประหยัด ";
                result_message.ja += "   You are ECO driver. Make it better. ";
              } else {
                result_message.en += "   You are not ECO driver. Please improve skill";
                result_message.th += "   คุณขับไม่ประหยัด จะต้องปรับปรุงดังนี้ ";
                result_message.ja += "   You are not ECO driver. Please improve skill";
              }

              if (element.behavior_summary.eco[0].point < 3) {
                result_message.en += " Do not long idling  ";
                result_message.th += " อย่าจอดติดเครื่องนาน  ";
                result_message.ja += " Do not long idling  ";
              }
              if (
                element.behavior_summary.eco[1].point < 3 ||
                element.behavior_summary.eco[2].point < 3 ||
                element.behavior_summary.eco[3].point < 3 ||
                element.behavior_summary.eco[4].point < 3 ||
                element.behavior_summary.eco[5].point < 3
              ) {
                if (conitnue_message == true) {
                  result_message.en += " , "
                  // result_message.th += " , "
                  result_message.ja += " , "
                }
                result_message.en += " Maintain your RPM under 1,100 RPM ";
                result_message.th += " พยายามใช้รอบประมาณ 1,100 รอบต่อนาที ";
                result_message.ja += " Maintain your RPM under 1,100 RPM ";
              }
            }
            return (
              <Row style={{ overflowX: 'hidden', overflowY: 'hidden' }}>
                <Col lg={12}>
                  <div style={{ marginTop: 10 }} />

                  <div className="a4-portrait-with-startdriver print">
                    <div className="pdf-headline"><h5>{t("ecotree_1")}</h5></div>
                    <div className="pdf-headline-1"><h6 style={{ fontWeight: 500 }}>{t("ecotree_5")}: {element.prefix_name} {element.firstname} {element.lastname}</h6></div>
                    <div className="pdf-headline-2"><h6 style={{ fontWeight: 500 }}>{t("ecotree_6")} : {moment.unix(this.startdate).format('DD/MM/YYYY')} - {moment.unix(this.enddate).format('DD/MM/YYYY')}</h6></div>
                    <div className="pdf-headline-3"><h6 style={{ fontWeight: 500 }}>{t("ecotree_7")} : {element.company_name}</h6></div>
                    <div className="pdf-headline-5"><h6 style={{ fontWeight: 500 }} s>{t("ecotree_8")} : {element.trip_amount} {t("ecotree_100")}</h6></div>
                    <div className="H-detail-1"><h4>{t("ecotree_9")}</h4></div>
                    <div className="H-detail-2"><h4>{t("ecotree_10")}</h4></div>

                    <div className="dngraph1"><Mileagesandfuel chartwidth={730} chartHeight={300} data={this.state.utilization[i]}  ></Mileagesandfuel></div>
                    <div className="fuelcon-1"><h5>{t("ecotree_48")}</h5></div>
                    <div className="fuelcon-2"><Fuelcon6m data={element.fuel_consumption_latest} chartwidth={350} chartHeight={150}></Fuelcon6m></div>
                    <div className="runingtimecharts-1"><h5>{t("ecotree_4")}</h5></div>
                    <div className="runingtimecharts-2"><Daynightgraph chartwidth={280} chartHeight={125} data={element.day_night}></Daynightgraph></div>
                    <div className="vehicle-title-1"><h5>{t("ecotree_13")}</h5></div>
                    <div className="vehicle-title-2"><h5>{t("ecotree_14")}</h5></div>

                    <div className="vehicle-title-3"><h5>{this.numberWithCommas((get(element, 'Diesel.price') * element.fuel_usage).toFixed(0))}</h5></div>
                    <div className="vehicle-title-4"><h5>{element.driven === 0 ? 0 : this.numberWithCommas(((get(element, 'Diesel.price') * element.fuel_usage) / element.driven).toFixed(2))}</h5></div>
                    {/* <div className="vehicle-title-3"><h5>{this.numberWithCommas((this.state.oilPrice * Number(element.fuel_usage.replace(",", ""))).toFixed(0))}</h5></div>
                    <div className="vehicle-title-4"><h5>{this.numberWithCommas(((this.state.oilPrice * Number(element.fuel_usage.replace(",", ""))) / Number(element.driven.replace(",", ""))).toFixed(2))}</h5></div> */}
                    <div className="vehicle-title-5"><h5>{t("ecotree_15")}</h5></div>
                    <div className="vehicle-title-6"><h5>{t("ecotree_16")}</h5></div>
                    <div className="vehicle-title-7"><h5>{t("ecotree_17")}</h5></div>
                    <div className="vehicle-title-8"><h5>{t("ecotree_18")}</h5></div>
                    <div className="vehicle-title-9"><h5>{this.numberWithCommas(Number(element.driven).toFixed(0))}</h5></div>
                    <div className="vehicle-title-10"><h5>{this.numberWithCommas((element.avg.mileage_avg).toFixed(0))}</h5></div>
                    <div className="vehicle-title-11"><h5>{t("ecotree_19")}</h5></div>
                    <div className="vehicle-title-12"><h5>{t("ecotree_19")}</h5></div>
                    <div className="vehicle-title-13"><h5>{t("ecotree_20")}</h5></div>
                    <div className="vehicle-title-14"><h5>{t("ecotree_21")}</h5></div>
                    <div className="vehicle-title-15"><h5>{this.numberWithCommas((element.total_time / 60).toFixed(0))}</h5></div>
                    <div className="vehicle-title-16"><h5>{this.numberWithCommas((element.avg.total_time_avg / 60).toFixed(0))}</h5></div>
                    <div className="vehicle-title-17"><h5>{t("ecotree_22")}</h5></div>
                    <div className="vehicle-title-18"><h5>{t("ecotree_22")}</h5></div>
                    <div className="vehicle-title-19"><h5>{t("ecotree_23")}</h5></div>
                    <div className="vehicle-title-20"><h5>{t("ecotree_18")}</h5></div>
                    <div className="vehicle-title-21"><h5>{this.numberWithCommas(Number(element.idling / 60).toFixed(0))}</h5></div>
                    <div className="vehicle-title-22"><h5>{this.numberWithCommas(Number(element.avg.idling_avg / 60).toFixed(0))}</h5></div>
                    <div className="vehicle-title-23"><h5>{t("ecotree_22")}</h5></div>
                    <div className="vehicle-title-24"><h5>{t("ecotree_22")}</h5></div>
                    <div className="vehicle-title-25"><h5>{t("ecotree_24")}</h5></div>
                    <div className="vehicle-title-26"><h5>{element.fuel_usage}</h5></div>
                    <div className="vehicle-title-27"><h5>{t("ecotree_25")}</h5></div>
                    <div className="vehicle-title-28"><h5>{t("ecotree_18")}</h5></div>
                    <div className="vehicle-title-29"><h5>{this.numberWithCommas(Number(element.avg.fuel_usage_avg).toFixed(0))}</h5></div>
                    <div className="vehicle-title-30"><h5>{t("ecotree_25")}</h5></div>
                    <a href="https://www.pttor.com/oilprice-capital.aspx" target="_blank"><div className="vehicle-title-31" ><h5>{t("ecotree_26")}</h5></div></a>
                    <div className="vehicle-title-32"><h5>{get(element, 'Diesel.price')}</h5></div>
                    {/* <div className="vehicle-title-32"><h5>{this.state.oilPrice}</h5></div> */}
                    <div className="vehicle-title-33"><h5>{t("ecotree_27")}</h5></div>
                    <div className="vehicle-title-34"><h5>{t("ecotree_18")}</h5></div>
                    <div className="vehicle-title-35"><h5>{this.numberWithCommas((get(element, 'Diesel.price') / element.avg.fuel_consumption_avg).toFixed(2))}</h5></div>
                    <div className="vehicle-title-36"><h5>{t("ecotree_16")}</h5></div>
                    {/* <div className="vehicle-title-37"><h5>{t("ecotree_28")}</h5></div>
                    <div className="vehicle-title-38"><h5>N/A</h5></div>
                    <div className="vehicle-title-39"><h5>N/A</h5></div>
                    <div className="vehicle-title-40"><h5>{t("ecotree_19")}</h5></div>
                    <div className="vehicle-title-41"><h5>{t("ecotree_22")}</h5></div> */}
                    <div className="vehicle-title-42"><h5>{t("ecotree_29")}</h5></div>
                    <div className="vehicle-title-43"><h5>N/A</h5></div>
                    <div className="vehicle-title-44"><h5>{t("ecotree_30")}</h5></div>
                    <div className="vehicle-title-45"><h5>{t("ecotree_11")}</h5></div>
                    <div className="vehicle-title-46"><h5>{element.fuel_consumption}</h5></div>
                    <div className="vehicle-title-47"><h5>{t("ecotree_31")}</h5></div>
                    <div className="vehicle-title-48"><h5>{t("ecotree_18")}</h5></div>
                    <div className="vehicle-title-49"><h5>{this.numberWithCommas(Number(element.avg.fuel_consumption_avg).toFixed(2))}</h5></div>
                    <div className="vehicle-title-50"><h5>{t("ecotree_31")}</h5></div>
                    <div className="vehicle-title-51"><p style={{ fontSize: 10, fontWeight: 600 }}>{t("ecotree_32")}</p></div>
                    <div className="vehicle-title-52"><p style={{ fontSize: 10, fontWeight: 600 }}>{t("ecotree_33")}</p></div>
                    <div className="vehicle-title-53"><p style={{ fontSize: 10, fontWeight: 600 }}>{t("ecotree_34")}</p></div>
                    <div className="runingtime-N-legend"><p style={{ fontSize: 8, fontWeight: 600 }}>{t("ecotree_35")} :</p></div>
                    <div className="runingtime-D-legend"><p style={{ fontSize: 8, fontWeight: 600 }}>{t("ecotree_36")} :</p></div>
                    <div className="runingtime-N"><p style={{ fontSize: 8, fontWeight: 600 }}>{t("ecotree_37")}</p></div>
                    <div className="runingtime-D"><p style={{ fontSize: 8, fontWeight: 600 }}>{t("ecotree_38")}</p></div>

                    <div className="DLT-title"><h5>{t("ecotree_75")}</h5></div>
                    <div className="DLT">
                      <div class="divTable DLTreport">
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
                            <div class="divTableCell" style={{ color: Textcolor_dlt_over4 }}>{element.dlt_over4}</div>
                            <div class="divTableCell" style={{ color: Textcolor_dlt_over8 }}>{element.dlt_over8}</div>
                            <div class="divTableCell" style={{ color: Textcolor_dlt_overspeed }}>{element.dlt_overspeed}</div>
                            <div class="divTableCell" style={{ color: Textcolor_dlt_not_swipe_card }}>{element.dlt_not_swipe_card}</div>
                            <div class="divTableCell" style={{ color: Textcolor_dlt_unplug }}>{element.dlt_unplug}</div>
                            <div class="divTableCell" style={{ color: Textcolor_dlt_unplug }}>{element.dlt_unplug}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="HC-title"><h5>{t("ecotree_3")}</h5></div>
                    <div className="HSC">
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
                          <td style={{ border: '2px solid white', color: Textcolor_harsh_start }}>{element.harsh_start}</td>
                          <td style={{ border: '2px solid white', color: Textcolor_harsh_acceleration }}>{element.harsh_acceleration}</td>
                          <td style={{ border: '2px solid white', color: Textcolor_sharp_turn }}>{element.sharp_turn}</td>
                          <td style={{ border: '2px solid white', color: Textcolor_harsh_break }}>{element.harsh_break}</td>
                          <td style={{ border: '2px solid white', color: Textcolor_speed_over_60 }}>{element.speed_over_60}</td>
                          <td style={{ border: '2px solid white', color: Textcolor_speed_over_80 }}>{element.speed_over_80}</td>
                          <td style={{ border: '2px solid white', color: Textcolor_speed_over_100 }}>{element.speed_over_100}</td>
                          <td style={{ border: '2px solid white', color: Textcolor_speed_over_120 }}>{element.speed_over_120}</td>
                        </tr>
                      </table>
                    </div>
                  </div>

                  <div style={{ marginTop: 10 }} />

                  <div className="a4-portrait-with-condriver print">
                    <div className="pdf3-headline"><h3>{t("ecotree_69")}</h3></div>
                    <div className="pdf4-headline"><p style={{ fontSize: 10, fontWeight: 600 }}>{t("ecotree_69")}</p></div>
                    <div className="pdf5-headline"><p style={{ fontSize: 10, fontWeight: 600 }}>{t("ecotree_70")}</p></div>
                    <div className="pdf6-headline"><p style={{ fontSize: 10, fontWeight: 600 }}>{t("ecotree_69")}</p></div>
                    <div className="pdf7-headline"><p style={{ fontSize: 10, fontWeight: 600 }}>{t("ecotree_70")}</p></div>
                    <div className="pdf8-headline" style={{ fontSize: 12, fontWeight: 600 }}><h5>{t("ecotree_52")}</h5></div>
                    <div className="pdf9-headline" style={{ fontSize: 12, fontWeight: 600 }}><h5>{t("ecotree_49")}</h5></div>
                    <div className="spider"><Spidersafety chartwidth={260} chartHeight={238} data={((typeof element.behavior_summary.safety == "undefined") ? {} : element.behavior_summary.safety)}></Spidersafety></div>
                    <div className="spider1"><Spidereco chartwidth={275} chartHeight={275} data={element.behavior_summary.eco}></Spidereco></div>
                    <div className="table-spider">
                      <div className={"divTable greyGridTable" + (language === 'ja' ? " lang-ja" : "")}>
                        <div className="divTableHeading">
                          <div className="divTableRow">
                            <div className="divTableHead">{t("ecotree_49")}</div>
                            <div className="divTableHead">{t("ecotree_50")}</div>
                            <div className="divTableHead scorecellbr">{t("ecotree_51")}</div>
                            <div className="divTableHead">{t("ecotree_52")}</div>
                            <div className="divTableHead">
                              <p style={{ marginBottom: 0 }}> {t("ecotree_50")}</p>
                            </div>
                            <div className="divTableHead">{t("ecotree_51")}</div>
                          </div>
                        </div>
                        <div className="divTableBody table-eco">
                          <div className="divTableRow">
                            <div className="divTableCell hcell"><img src={image.speed} height="24" width="24"></img><br></br> {t("ecotree_88")}</div>
                            {/* row 1 */}
                            <div className="divTableCell left-align-cell">
                              <ul>
                                <li>{t("ecotree_53")}</li>
                                <li>{t("ecotree_53_1")}</li>
                              </ul>
                              {/* {t("ecotree_53")}<br />{t("ecotree_53_1")} */}
                            </div>
                            <div className="divTableCell scorecellbr">{element.behavior_summary.safety[0].raw.toFixed(0)}/{10}</div>
                            {/* <div className="divTableCell scorecellbr">{element.behavior_summary.safety[0].raw.toFixed(0)}/{element.behavior_summary.safety[0].max.toFixed(0)}</div> */}
                            <div className="divTableCell hcell"><img src={image.Idling} height="24" width="24"></img><br></br>{t("ecotree_89")}</div>
                            <div className="divTableCell left-align-cell">
                              <ul>
                                <li>{t("ecotree_58")}<br />{t("ecotree_58_1")}</li>
                                {/* <li>{t("ecotree_58_1")}</li> */}
                              </ul>
                              {/* {t("ecotree_58")}<br></br>{t("ecotree_58_1")} */}
                            </div>
                            <div className="divTableCell scorecell">{element.behavior_summary.eco[0].raw.toFixed(0)}/{element.behavior_summary.eco[0].max.toFixed(0)}</div>
                          </div>
                          {/* row 2 */}
                          <div className="divTableRow">
                            <div className="divTableCell hcell"><img src={image.RPM} height="24" width="24"></img><br></br>{t("ecotree_90")}</div>
                            <div className="divTableCell left-align-cell">
                              <ul>
                                <li>{t("ecotree_54")}</li>
                                <li>{t("ecotree_54_1")}</li>
                                <li>{t("ecotree_54_2")}</li>
                              </ul>
                              {/* {t("ecotree_54")}<br />{t("ecotree_54_1")}<br></br>{t("ecotree_54_2")} */}
                            </div>
                            <div className="divTableCell scorecellbr">{element.behavior_summary.safety[1].raw.toFixed(0)}/{15}</div>
                            {/* <div className="divTableCell scorecellbr">{element.behavior_summary.safety[1].raw.toFixed(0)}/{element.behavior_summary.safety[1].max.toFixed(0)}</div> */}
                            <div className="divTableCell hcell"><img src={image.Exhaust} height="24" width="24"></img><br></br> {t("ecotree_91")}<br></br> {t("ecotree_91_1")}</div>
                            <div className="divTableCell left-align-cell">
                              <ul>
                                <li>{t("ecotree_59")}<br />{t("ecotree_59_1")}</li>
                                {/* <li>{t("ecotree_59_1")}</li> */}
                              </ul>
                              {/* {t("ecotree_59")}<br></br>{t("ecotree_59_1")} */}
                            </div>
                            <div className="divTableCell scorecell">{element.behavior_summary.eco[1].raw.toFixed(0)}/{element.behavior_summary.eco[1].max.toFixed(0)}</div>
                          </div>
                          {/* row 3 */}
                          <div className="divTableRow">
                            <div className="divTableCell hcell"><img src={image.Hashstart} height="24" width="27"></img><br></br>{t("ecotree_92")}</div>
                            <div className="divTableCell left-align-cell">
                              <ul>
                                <li>{t("ecotree_55")}</li>
                                <li>{t("ecotree_55_1")}</li>
                              </ul>
                              {/* {t("ecotree_55")}<br />{t("ecotree_55_1")} */}
                            </div>
                            <div className="divTableCell scorecellbr">{element.behavior_summary.safety[2].raw.toFixed(0)}/{element.behavior_summary.safety[2].max.toFixed(0)}</div>
                            <div className="divTableCell hcell"><img src={image.RPMhight} height="24" width="24"></img><br></br>{t("ecotree_93")}</div>
                            <div className="divTableCell left-align-cell">
                              <ul>
                                <li>{t("ecotree_60")}<br />{t("ecotree_60_1")}</li>
                                {/* <li>{t("ecotree_60_1")}</li> */}
                              </ul>
                              {/* {t("ecotree_60")}<br></br>{t("ecotree_60_1")} */}
                            </div>
                            <div className="divTableCell scorecell">{element.behavior_summary.eco[2].raw.toFixed(0)}/{element.behavior_summary.eco[2].max.toFixed(0)}</div>
                          </div>
                          {/* row 4 */}
                          <div className="divTableRow">
                            <div className="divTableCell hcell"><img src={image.Hashacceleration} height="24" width="27"></img><br></br>{t("ecotree_94")}</div>
                            <div className="divTableCell left-align-cell">
                              <ul>
                                <li>{t("ecotree_56")}</li>
                                <li>{t("ecotree_56_1")}</li>
                                <li>{t("ecotree_56_2")}</li>
                                <li>{t("ecotree_56_3")}</li>
                              </ul>
                              {/* {t("ecotree_56")}<br />{t("ecotree_56_1")}<br></br>{t("ecotree_56_2")}<br></br>{t("ecotree_56_3")} */}
                            </div>
                            <div className="divTableCell scorecellbr">{element.behavior_summary.safety[3].raw.toFixed(0)}/{20}</div>
                            {/* <div className="divTableCell scorecellbr">{element.behavior_summary.safety[3].raw.toFixed(0)}/{element.behavior_summary.safety[3].max.toFixed(0)}</div> */}
                            <div className="divTableCell hcell"><img src={image.RPMlow} height="24" width="24"></img><br></br>{t("ecotree_95")}</div>
                            <div className="divTableCell left-align-cell">
                              <ul>
                                <li>{t("ecotree_61")}<br />{t("ecotree_61_1")}</li>
                                {/* <li>{t("ecotree_61_1")}</li> */}
                              </ul>
                              {/* <p >{t("ecotree_61")}<br></br>{t("ecotree_61_1")}</p> */}
                            </div>
                            <div className="divTableCell scorecell">{element.behavior_summary.eco[3].raw.toFixed(0)}/{element.behavior_summary.eco[3].max.toFixed(0)}</div>
                          </div>
                          {/* row 5 */}
                          <div className="divTableRow">
                            <div className="divTableCell hcell"><img src={image.Hashbrake} height="24" width="24"></img><br></br>{t("ecotree_96")}</div>
                            <div className="divTableCell left-align-cell">
                              <ul>
                                <li>{t("ecotree_101")}</li>
                                <li>{t("ecotree_101_1")}</li>
                              </ul>
                              {/* {t("ecotree_101")}<br />{t("ecotree_101_1")} */}
                            </div>
                            <div className="divTableCell scorecellbr">{element.behavior_summary.safety[4].raw.toFixed(0)}/{element.behavior_summary.safety[4].max.toFixed(0)}</div>
                            <div className="divTableCell hcell"><img src={image.shitup} height="24" width="24"></img><br></br>{t("ecotree_97")}<br></br>{t("ecotree_97_1")}</div>
                            <div className="divTableCell left-align-cell">
                              <ul>
                                <li>{t("ecotree_62")}</li>
                              </ul>
                              {/* <p >{t("ecotree_62")}</p> */}
                            </div>
                            <div className="divTableCell scorecell">{element.behavior_summary.eco[4].raw.toFixed(0)}/{element.behavior_summary.eco[4].max.toFixed(0)}</div>
                          </div>
                          {/* row 6 */}
                          <div className="divTableRow">
                            <div className="divTableCell hcell"><img src={image.shaptrun} height="24" width="24"></img><br></br>{t("ecotree_98")}</div>
                            <div className="divTableCell left-align-cell">
                              <ul>
                                <li>{t("ecotree_57")}</li>
                              </ul>
                              {/* {t("ecotree_57")} */}
                            </div>
                            <div className="divTableCell scorecellbr">{element.behavior_summary.safety[5].raw.toFixed(0)}/{element.behavior_summary.safety[5].max.toFixed(0)}</div>
                            <div className="divTableCell hcell"><img src={image.shitdown} height="24" width="24"></img><br></br>{t("ecotree_99")}<br></br>{t("ecotree_99_1")}</div>
                            <div className="divTableCell left-align-cell">
                              <ul>
                                <li>{t("ecotree_63")}</li>
                              </ul>
                              {/* {t("ecotree_63")} */}
                            </div>
                            <div className="divTableCell scorecell">{element.behavior_summary.eco[5].raw.toFixed(0)}/{element.behavior_summary.eco[5].max.toFixed(0)}</div>
                          </div>

                          <div class="divTableRow">
                            <div class="divTableCell" style={{ fontWeight: 'bold' }}>{t("ecotree_72")}</div>
                            <div class="divTableCell" style={{ fontWeight: 'bold' }}>{t("ecotree_64")}</div>
                            <div class="divTableCell footerscorecell">{(parseInt(element.behavior_summary.safety[0].raw.toFixed(0)) + parseInt(element.behavior_summary.safety[1].raw.toFixed(0)) + parseInt(element.behavior_summary.safety[2].raw.toFixed(0)) + parseInt(element.behavior_summary.safety[3].raw.toFixed(0)) + parseInt(element.behavior_summary.safety[4].raw.toFixed(0)) + parseInt(element.behavior_summary.safety[5].raw.toFixed(0)))}/70</div>
                            <div class="divTableCell" style={{ fontWeight: 'bold' }}>{t("ecotree_72")}</div>
                            <div class="divTableCell" style={{ fontWeight: 'bold' }}>{t("ecotree_65")}</div>
                            <div class="divTableCell" style={{ fontWeight: 'bold' }}>{(parseInt(element.behavior_summary.eco[0].raw.toFixed(0)) + parseInt(element.behavior_summary.eco[1].raw.toFixed(0)) + parseInt(element.behavior_summary.eco[2].raw.toFixed(0)) + parseInt(element.behavior_summary.eco[3].raw.toFixed(0)) + parseInt(element.behavior_summary.eco[4].raw.toFixed(0)) + parseInt(element.behavior_summary.eco[5].raw.toFixed(0)))}/30</div>
                          </div>
                        </div>

                        <div class="divTableFoot tableFootStyle">
                          <div class="divTableRow" style={{ textAlign: 'center' }}>
                            <div class="divTableCell" ></div>
                            <div class="divTableCell" style={{ fontSize: 13 }}></div>
                            <div class="divTableCell" ></div>
                            <div class="divTableCell" ></div>
                            <div class="divTableCell" style={{ fontSize: 13 }}></div>
                            <div class="divTableCell" ></div>
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="comment-safety">
                      {result_message[language]}
                      {/* <p>Your Driving Behavior Score is {(parseInt(element.behavior_summary.safety[0].raw.toFixed(0)) + parseInt(element.behavior_summary.safety[1].raw.toFixed(0)) + parseInt(element.behavior_summary.safety[2].raw.toFixed(0)) + parseInt(element.behavior_summary.safety[3].raw.toFixed(0)) + parseInt(element.behavior_summary.safety[4].raw.toFixed(0)) + parseInt(element.behavior_summary.safety[5].raw.toFixed(0))) + (parseInt(element.behavior_summary.eco[0].raw.toFixed(0)) + parseInt(element.behavior_summary.eco[1].raw.toFixed(0)) + parseInt(element.behavior_summary.eco[2].raw.toFixed(0)) + parseInt(element.behavior_summary.eco[3].raw.toFixed(0)) + parseInt(element.behavior_summary.eco[4].raw.toFixed(0)) + parseInt(element.behavior_summary.eco[5].raw.toFixed(0)))}/100 <br></br>You​ should​ reduce​ harsh​ brake and​ always​ fasten your​ seat​belt for​ safety.​<br></br>Do​ not​ make​ <span className="sharp">sharp​ turn</span> for​ your​ own safety!</p> */}
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
    language: state.versatile.language,
    dataLogin: state.signin.dataLogin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // signin: (email, password) => dispatch(AuthActions.signin(email, password)),

  }
}
export default (connect(mapStateToProps, mapDispatchToProps)(EcoComponentdriver));

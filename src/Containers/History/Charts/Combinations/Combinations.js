import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux'
import HistoryActions from '../../../../Redux/HistoryRedux'
import { momentDate } from '../../../../Functions/DateMoment'
import images from '../../../../Themes/Images'
import Chart, {
  CommonSeriesSettings,
  Series,
  Pane,
  ValueAxis,
  Legend,
  Label,
  Grid,
  ZoomAndPan,
  Crosshair,
  HorizontalLine,
  ScrollBar,
  CommonAxisSettings,
  Border,
  ArgumentAxis,
  Point,
  ConstantLine,
  Animation,
  Size
} from 'devextreme-react/chart';
import markerTemplate from './MarkerTemplate.js';
import { t } from '../../../../Components/Translation'
import $ from 'jquery'

// Tools
import PointValue from '../../Footer/PointValue'
import ToolsPlayTour from '../../Footer/ToolsPlayTour'

const { get } = require('lodash')

/// const store = new CustomStore({
//   load: () => [],
//   key: 'date'
// });

let pointHover = ""
class Combinations extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataTour: [],
      plotData: [],
      speedLimit: 0,
      temp_limit: 0,
      chartColors: {},
      dataSource: null,
      renderChart: true,
      loadFirst: true,
    }
    this.chart = React.createRef();
    this.chartDone = null
    this.onSeriesClick = this.onSeriesClick.bind(this);
    this.pointHover = this.pointHover.bind(this);
    this.customizeItems = this.customizeItems.bind(this);
    // this.storeChartRef = (ref) => { this.chartRef = ref; };

    // this.monthWeather = new DataSource({
    //   store: new CustomStore({
    //     load: () => {
    //       let data = [
    //         {
    //           "speed_limit": 80,
    //           "course": 42.6,
    //           "rpm": 500,
    //           "fuel": 22.1,
    //           "gpsdate": "2020-06-10 00:42:21",
    //           "admin_level1_name": "สระบุรี",
    //           "admin_level2_name": "มวกเหล็ก",
    //           "admin_level3_name": "มิตรภาพ",
    //           "driver_cards_name": "",
    //           "lat": 14.637566,
    //           "lng": 101.129295,
    //           "time": "2020-06-09 17:42:21",
    //           "canbus_fuel_cons": 0,
    //           "canbus_foot_brake": 0,
    //           "canbus_exhaust_brake": 0,
    //           "canbus_dtc_engine": 0,
    //           "canbus_clutch_switch": 0,
    //           "canbus_cooltemp": 63,
    //           "canbus_acc_pedal": 0,
    //           "speed": -10,
    //           "speedChart": 0,
    //           "parking": -10,
    //           "idling": -1,
    //           "overspeed": -10,
    //           "acc": "t",
    //           "stat_parking": -10,
    //           "stat_idling": 0,
    //           "stat_driving": -10,
    //           "stat_overspeed": -10
    //         }]
    //       return data
    //     },
    //     loadMode: 'raw'
    //   })
    // });

    /// hubConnection
    //   .start()
    //   .then(() => {
    //     hubConnection.on('updateStockPrice', (data) => {
    //       store.push([{ type: 'insert', key: data.date, data: data }]);


    //     });
    //     this.setState({ dataSource: store });
    //   });
  }
  componentWillMount() {

    // store.push([{
    //   type: 'insert',
    //   key: '2020-05-28T12:21:46.9143292-07:00',
    //   data: {
    //     date: "2020-05-28T12:21:46.9143292-07:00",
    //     price: 153.91,
    //     volume: 453
    //   }
    // }]);

    // this.setState({ dataSource: store });

    let { plotData } = this.state
    let { dataAllPoint, chartColors } = this.props

    if (plotData.length === 0) {
      let plotData = []
      let speed_limit = 0
      let temp_limit = 0
      // console.log("> dataAllPoint : ", dataAllPoint)
      let i = 0

      for (let idx in dataAllPoint) {
        speed_limit = dataAllPoint[idx].speed_limit
        temp_limit = dataAllPoint[idx].temp_limit
        // let startDate = momentDate(dataAllPoint[idx].gpsdate)

        let next = (dataAllPoint.length - 1) === i ? i : i + 1;
        let acc = dataAllPoint[idx].acc
        let speed = dataAllPoint[idx].speed
        let dataNext = dataAllPoint[next]

        let stat_parking = 0
        let stat_idling = -10
        let stat_driving = -10
        let stat_overspeed = -10
        if (acc === 'f') {
        } else if (acc === 't' && speed === 0) {
          stat_parking = -10
          stat_idling = 0
        } else if (acc === 't') {
          stat_parking = -10
          stat_driving = 0
        }

        let tempRandom = Math.floor(Math.random() * 50) - 20

        // console.log("dataAllPoint[idx].course, : ", dataAllPoint[idx].temperatures)

        let temperatures = dataAllPoint[idx].temperatures

        let pointData = {
          speed_limit: speed_limit,
          course: dataAllPoint[idx].course,
          rpm: dataAllPoint[idx].rpm,
          fuel: dataAllPoint[idx].fuel,
          gpsdate: momentDate(dataAllPoint[idx].gpsdate, "YYYY-MM-DD HH:mm:ss"),
          admin_level1_name: dataAllPoint[idx].admin_level1_name,
          admin_level2_name: dataAllPoint[idx].admin_level2_name,
          admin_level3_name: dataAllPoint[idx].admin_level3_name,
          driver_cards_name: dataAllPoint[idx].driver_cards_name,
          lat: dataAllPoint[idx].lat,
          lng: dataAllPoint[idx].lng,
          time: dataAllPoint[idx].time,
          canbus_fuel_cons: dataAllPoint[idx].canbus_fuel_cons,
          canbus_foot_brake: dataAllPoint[idx].canbus_foot_brake,
          canbus_exhaust_brake: dataAllPoint[idx].canbus_exhaust_brake,
          canbus_dtc_engine: dataAllPoint[idx].canbus_dtc_engine,
          canbus_clutch_switch: dataAllPoint[idx].canbus_clutch_switch,
          canbus_cooltemp: dataAllPoint[idx].canbus_cooltemp,
          canbus_acc_pedal: dataAllPoint[idx].canbus_acc_pedal,
          speed: speed,
          speedChart: speed,
          parking: 0,
          idling: 0,
          overspeed: 0,
          acc: dataAllPoint[idx].acc,
          stat_parking: stat_parking,
          stat_idling: stat_idling,
          stat_driving: stat_driving,
          stat_overspeed: stat_overspeed,
          tempRandom: tempRandom,
          temp_limit,

          // tempTop: tempRandom >= 0 ? tempRandom : 0,
          // tempButtom: tempRandom <= 0 ? tempRandom : 0,
          temperatures: temperatures,
          tempTop: temperatures >= 0 ? temperatures : 0,
          tempButtom: temperatures <= 0 ? temperatures : 0
        }

        if (acc === 'f') {
          pointData.speed = -10
          pointData.parking = -1
          pointData.idling = -10
          pointData.overspeed = -10
          plotData.push(pointData)
          if (dataNext.acc === 't') {
            plotData.push({
              speed_limit: speed_limit,
              course: dataNext.course,
              rpm: dataNext.rpm,
              fuel: dataNext.fuel,
              gpsdate: momentDate(dataNext.gpsdate, "YYYY-MM-DD HH:mm:ss"),
              admin_level1_name: dataNext.admin_level1_name,
              admin_level2_name: dataNext.admin_level2_name,
              admin_level3_name: dataNext.admin_level3_name,
              driver_cards_name: dataNext.driver_cards_name,
              lat: dataNext.lat,
              lng: dataNext.lng,
              time: dataNext.time,
              canbus_fuel_cons: dataNext.canbus_fuel_cons,
              canbus_foot_brake: dataNext.canbus_foot_brake,
              canbus_exhaust_brake: dataNext.canbus_exhaust_brake,
              canbus_dtc_engine: dataNext.canbus_dtc_engine,
              canbus_clutch_switch: dataNext.canbus_clutch_switch,
              canbus_cooltemp: dataNext.canbus_cooltemp,
              canbus_acc_pedal: dataNext.canbus_acc_pedal,
              speed: -10,
              parking: -1,
              idling: -10,
              overspeed: -10,
              acc: dataNext.acc,
              stat_parking: 0,
              stat_idling: -10,
              stat_driving: -10,
              stat_overspeed: -10,
            })
          }
        } else if (acc === 't' && speed == 0) {
          pointData.stat_idling = 0
          pointData.speed = -10
          pointData.parking = -10
          pointData.idling = -1
          pointData.overspeed = -10
          plotData.push(pointData)
        } else if (acc === 't') {
          pointData.stat_driving = 0
          pointData.speed = dataAllPoint[idx].speed
          pointData.parking = -10
          pointData.idling = -10
          pointData.overspeed = -10
          plotData.push(pointData)
        }
        i++
        // console.log(startDate, acc, speed, pointData.speed, pointData.parking, pointData.idling, pointData.overspeed)
        // if (parseInt(dataAllPoint[idx].canbus_foot_brake) === "on") {
        //   pointData['canbus_foot_brake'] = dataAllPoint[idx].canbus_foot_brake
        // }
      }
      let length = plotData.length
      let index = 0
      let fuel_prev = 0
      let round = 0
      for (let ix in plotData) {
        if (index > 4) {
          if (plotData[ix].acc === 'f') {
            plotData[index].fuel = fuel_prev
            round = 0
          } else if (plotData[ix - 1].acc === 'f') {
            plotData[index].fuel = fuel_prev
            round++
          } else if (plotData[ix].acc === 't') {
            if (round > 0 && round <= 4) {
              plotData[index].fuel = fuel_prev
              round++
            } else {

              if (index > 4 && length >= 10 && index < (length - 5) && plotData[ix].acc === 't') {
                plotData[index].fuel = this.getAverage(index, plotData)
              }

              round = 0
            }
          }
        }
        fuel_prev = plotData[index].fuel
        index++
      }
      this.setState({ plotData, speed_limit, temp_limit, chartColors })
    }
  }

  componentDidMount() {
    setTimeout(() => { this.setState({ loadFirst: false }) }, 1500)
  }



  componentDidUpdate(prevProps, nextState) {
    // let { dataAllPoint, markTourInfo, chartColors, renderChart } = this.props
    let { renderChart } = this.props
    // let { dataTour } = this.state
    // let dataTour = []
    if (prevProps.renderChart !== renderChart) {
      if (renderChart) this.setState({ dataTour: [] })
    }

    // if (prevProps.markTourInfo.isMarkPlay != false
    //   && markTourInfo.isMarkPlay != false
    //   && prevProps.markTourInfo !== markTourInfo) {

    //   if (markTourInfo.isMarkPlay) {
    //     let pointData = {
    //       speed: dataAllPoint[markTourInfo.index].speed,
    //       gpsdate: momentDate(dataAllPoint[markTourInfo.index].gpsdate),
    //       rpm: dataAllPoint[markTourInfo.index].rpm,
    //       fuel: dataAllPoint[markTourInfo.index].fuel,
    //       admin_level1_name: dataAllPoint[markTourInfo.index].admin_level1_name,
    //       admin_level2_name: dataAllPoint[markTourInfo.index].admin_level2_name,
    //       admin_level3_name: dataAllPoint[markTourInfo.index].admin_level3_name,
    //       driver_cards_name: dataAllPoint[markTourInfo.index].driver_cards_name,
    //       lat: dataAllPoint[markTourInfo.index].lat,
    //       lng: dataAllPoint[markTourInfo.index].lng,
    //       time: dataAllPoint[markTourInfo.index].time,
    //       canbus_fuel_cons: dataAllPoint[markTourInfo.index].canbus_fuel_cons,
    //       canbus_foot_brake: dataAllPoint[markTourInfo.index].canbus_foot_brake,
    //       canbus_exhaust_brake: dataAllPoint[markTourInfo.index].canbus_exhaust_brake,
    //       canbus_dtc_engine: dataAllPoint[markTourInfo.index].canbus_dtc_engine,
    //       canbus_clutch_switch: dataAllPoint[markTourInfo.index].canbus_clutch_switch,
    //       canbus_cooltemp: dataAllPoint[markTourInfo.index].canbus_cooltemp,
    //       canbus_acc_pedal: dataAllPoint[markTourInfo.index].canbus_acc_pedal
    //     }
    //     dataTour.push(pointData)
    //     this.setState(prevState => prevState)
    //   }
    //   else {
    //     this.setState({ dataTour: [] })
    //   }
    // }

  }

  getAverage(index, plotData) {
    let fuel = 0
    let ix = 0
    ix = index - 5
    let round = 0
    for (let i = 0; i < 10; i++) {
      let data = plotData[ix]
      if (data.acc === 't') {
        fuel += data.fuel
        round++
      } else {
        break;
      }
      ix++
    }
    if (round === 0) {
      round = 1
    }
    return (fuel / round)
  }

  onSeriesClick(e) {
    this.props.setMarkerInteractiveChart(pointHover)
    this.props.setShowBoxSearch(false)
  }

  pointHover(e) {
    let speed = e.target.data.speed < 0 ? 0 : e.target.data.speed
    let rpm = e.target.data.rpm
    let fuel = parseInt(e.target.data.fuel)
    let canbus_cooltemp = e.target.data.canbus_cooltemp
    let canbus_acc_pedal = e.target.data.canbus_acc_pedal
    let temp = e.target.data.temperatures
    let date = e.target.data.time

    e.target.data.speed = speed
    pointHover = e.target.data

    this.props.setPointValue({ speed, rpm, fuel, canbus_cooltemp, canbus_acc_pedal, temp, date })
  }

  customizeTextVS(e) {
    return "";
  }

  customizeText() {
    return "ON";
  }

  customizeTextSensor(e) {
    if (e.value === 5) return "BK";
    if (e.value === 4) return "EB";
    if (e.value === 3) return "EL";
    if (e.value === 2) return "CL";
  }

  customizeItems(e) {
    let lgBrake = "Brake"
    let lgExhaust = "Exhaust Brake"
    let lgDTC = "E/G Check Lamp"
    let lgClutch = "Clutch"
    let lgDriving = "Driving"
    let lgParking = "Ign. OFF"
    let lgIdling = "Idling"
    let lineOverSpeed = "Line Over Speed"

    if (this.props.language === "th") {
      lgBrake = "เบรค"
      lgExhaust = "เบรคไอเสีย"
      lgDTC = "ไฟสถานะเครื่องยนต์"
      lgClutch = "คลัชต์"
      lgDriving = "ขับขี่"
      lgParking = "ดับเครื่อง"
      lgIdling = "จอดไม่ดับเครื่อง"
      lineOverSpeed = "เส้นความเร็วเกิน"
    }

    let customize = []
    for (let index in e) {
      let series = e[index]
      let inCase = true
      switch (series.text) {
        case "Brake":
          series.text = "BK = " + lgBrake
          break;
        case "Exhaust":
          series.text = "EB = " + lgExhaust
          break;
        case "DTC":
          series.text = "EL = " + lgDTC
          break;
        case "Clutch":
          series.text = "CL = " + lgClutch
          break;
        case "ds_driving":
          series.text = lgDriving
          break;
        case "ds_parking":
          series.text = lgParking
          break;
        case "ds_idling":
          series.text = lgIdling
          break;
        case "Pedal xxx":
          series.text = lineOverSpeed
          break;
        default:
          inCase = false
          break;
      }
      if (inCase) customize.push(series)
    }
    return customize
  }

  setInfo(label, color, isCircle = true, text = "") {
    return [
      <i className={isCircle ? "fa fa-circle" : "fa fa-square"} style={{ color, fontSize: 10 }} />,
      <span span style={{ marginLeft: 5, fontSize: 12, paddingRight: 20 }}> {text} {t(label)}</span >
    ]
  }

  setPlay(index, visible) {
    try {
      let points = this.chartDone.target.series[0]._points
      if (index < points.length) {
        $(".dxc-crosshair-cursor").attr("visibility", "visible")
        $(".dxc-crosshair-cursor circle").attr("cx", "869")
        $(".dxc-crosshair-cursor circle").attr("r", "7.5")
        $(".dxc-crosshair-cursor g").attr("transform", "translate(" + (points[index].x - 83) + ", 0)")
        $(".dxc-crosshair-cursor g path").attr("d", "M 83 30 L 83 772")
        $(".dxc-crosshair-cursor g path").attr("stroke-width", "2")
        $(".dxc-crosshair-cursor g path").attr("stroke", "#000")
        $(".dxc-crosshair-cursor circle").remove();
      }
    } catch {
      // console.log("ssss")
    }


    // else {
    //   $(".dxc-crosshair-cursor").attr("visibility", "hidden")
    // }
  }

  render() {
    let { dataTour, plotData, speed_limit, temp_limit, chartColors, loadFirst } = this.state
    let { showChartList, language } = this.props
    let data = []

    this.props.onLoad(this.chart)
    dataTour.length > 0 ? data = dataTour : data = plotData

    let speedVisible = false
    let rpmVisible = false
    let sensorsVisible = false
    let fuelVisible = false
    let coolantVisible = false
    let pedalVisible = false
    let tempVisible = false
    let heightAllChart = 0
    // let heightAllChart = 850

    for (let index in showChartList) {
      switch (showChartList[index]) {
        case 1:
          speedVisible = true
          heightAllChart += 170
          // heightAllChart += 150
          break;
        case 2:
          rpmVisible = true
          heightAllChart += 140
          // heightAllChart += 100
          break;
        case 3:
          sensorsVisible = true
          heightAllChart += 180
          // heightAllChart += 140
          break;
        case 4:
          fuelVisible = true
          heightAllChart += 120
          // heightAllChart += 80
          break;
        case 5:
          coolantVisible = true
          heightAllChart += 120
          // heightAllChart += 80
          break;
        case 6:
          pedalVisible = true
          heightAllChart += 120
          // heightAllChart += 80
          break;
        case 7:
          tempVisible = true
          heightAllChart = (this.props.dataLogin.userId == 117 || this.props.dataLogin.userId == 2656 || this.props.dataLogin.userId == 2657) ? (heightAllChart + 130) : (heightAllChart + 30)
          // heightAllChart += 80
          break;
      }
    }

    let speedName = "Driving Status \n with km/h"
    let rpmName = "RPM"
    let sensorName = "Sensors \n and Switches"
    let fuelName = "Fuel \n Tank (%)"
    let coolantName = "Coolant \n Temperature (°C)"
    let pedalName = "Acceleration \n Pedal (%)"
    let tempName = "Temp. \n Sensor (°C)"

    if (language === "th") {
      speedName = "สถานะการขับขี่\nและความเร็ว"
      rpmName = "รอบ/นาที"
      sensorName = "สัญญาณ\nอุปกรณ์"
      fuelName = "ระดับ\nน้ำมัน(%)"
      coolantName = "อุณหภูมิ\nหม้อน้ำ(°C)"
      pedalName = "% การเหยียบ\nคันเร่ง"
      tempName = "เซ็นเซอร์อุณหภูมิ\nห้องเย็น (°C)"
    } else if (language === "ja") {
      speedName = "走行状態 (km/h)"
      rpmName = "RPM"
      sensorName = "センサー＆スイッチ"
      fuelName = "燃料タンク残量 (%)"
      coolantName = "冷却水温度 (°C)"
      pedalName = "アクセル開度 (%)"
      tempName = "Temp. \n Sensor (°C)"
    }


    // console.log("data : ", data)/

    // let newForTest = []
    // for (let index in data) {
    //   newForTest.push({
    //     lat: data[index].lat,
    //     lng: data[index].lng,
    //     course: data[index].course
    //   })
    // }

    // console.log('data', JSON.stringify(newForTest))

    return (
      <Suspense fallback={null}>
        {
          [
            <div className="bar-tools" style={{ padding: '5px 0px 0px 0px' }}>
              <ToolsPlayTour
                chartName={"Combinations"}
                onPlaying={(index, visible) => this.setPlay(index, visible)}
              />
              <div className="bar-tools-right" style={{ marginRight: 0, marginTop: 0 }}>
                <PointValue
                  chart={this.chartDone}
                  resetChart={() => {
                    this.chart.current.instance.refresh()
                    this.props.setPointValue({ speed: '', rpm: '', fuel: '', canbus_cooltemp: '', date: '' })
                    this.props.setRenderChart(true)
                  }} />
              </div>
            </div>,
            <div className="combinations-chart">
              <div>
                {/* <button onClick={() => this.setCursor()}>Play</button> */}
                <div style={{ textAlign: 'center' }}>
                  {this.setInfo("history_20", get(chartColors, "driving"), false)}
                  {this.setInfo("history_21", get(chartColors, "idling"), false)}
                  {this.setInfo("history_22", get(chartColors, "parking"), false)}
                  {this.setInfo("history_27", "red", false)}
                  {this.setInfo("history_23", get(chartColors, "brake"), true, "BK = ")}
                  {this.setInfo("history_24", get(chartColors, "exhaust"), true, "EB = ")}
                  {this.setInfo("history_25", get(chartColors, "dtc"), true, "EL = ")}
                  {this.setInfo("history_26", get(chartColors, "clutch"), true, "CL = ")}
                </div>

                {/* {false && <Chart */}
                {loadFirst ?

                  <div id={'chart-history'}>
                    <br /><br />
                    <center>
                      <div><img src={images.loading} style={{ width: 50, height: 50 }} /></div>
                      <div>{t("loading")}</div>
                    </center>
                  </div>

                  : [
                    <div style={{
                      textAlign: 'center',
                      position: 'absolute',
                      color: '#000',
                      width: '100%',
                      padding: 20,
                      opacity: 0.1,
                      fontSize: 30,
                      marginTop: 20
                    }}>
                      <span style={{ userSelect: 'none' }}>{t('history_28')}</span>
                    </div>,
                    <Chart
                      // ref={this.chart}
                      ref={this.chart}
                      onDone={(e) => { this.chartDone = e }}
                      dataSource={data}
                      id={'chart-history'}
                      defaultPane="bottomPane"
                      onSeriesClick={this.onSeriesClick}
                      onPointHoverChanged={this.pointHover}
                      // centerRender={CenterTemplate}
                      style={{ height: heightAllChart }}
                    >
                      <Size
                        height={heightAllChart}
                      // width={600}
                      />
                      <Animation
                        enabled={false}
                      />
                      <CommonAxisSettings>
                        <Grid visible={true} />
                      </CommonAxisSettings>

                      <CommonSeriesSettings
                        argumentField={'gpsdate'}
                      >
                        <Border visible={false} />
                        <Point hoverMode="allArgumentPoints" />
                      </CommonSeriesSettings>

                      <ArgumentAxis
                        minVisualRangeLength={{ minutes: 10 }}
                        defaultVisualRange={this.props.dateVisualRange}
                        position={"top"}
                        argumentType={'datetime'}
                        label={{
                          format: "HH:mm"
                          // format: "yyyy-MM-dd \n HH:mm",
                          // format: "MMM yyyy",
                        }}
                      />

                      {/* Vehicle Status */}
                      {/* {
            vehicleStatusVisible &&
            <Pane
              name="vehicleStatusPane"
              height={60}
            />
          } */}

                      {/* <Series
                        type={'spline'}
                        pane="vehicleStatusPane"
                        valueField={'stat_parking'}
                        name={"ds_parking"}
                        color={get(chartColors, "parking")}
                        width={10}
                      >
                        <Point
                          visible={false}
                          size={1}
                        >
                        </Point>
                      </Series> */}
                      {/*
          <Series
            pane="vehicleStatusPane"
            type="scatter"
            name=""
            color={get(chartColors, "parking")}
            valueField="stat_parking"
          >
            <Point
              symbol="square"
              size={10}
            />
          </Series> */}
                      {/*
                      <Series
                        pane="vehicleStatusPane"
                        type="scatter"
                        name="ds_idling"
                        color={get(chartColors, "idling")}
                        valueField="stat_idling"
                      >
                        <Point
                          symbol="square"
                          size={10}
                        />
                      </Series>

                      <Series
                        pane="vehicleStatusPane"
                        type="scatter"
                        name="ds_driving"
                        color={get(chartColors, "driving")}
                        valueField="stat_driving"
                      >
                        <Point
                          symbol="square"
                          size={10}
                        />
                      </Series>
                      <ValueAxis
                        pane="vehicleStatusPane"
                        title={{
                          text: "Driving \n Status",
                          margin: 20
                        }}
                        min={0}
                        max={0}
                      >
                        <Grid visible={true} />
                        <Label customizeText={this.customizeTextVS} />
                      </ValueAxis> */}



                      {/* <Series
            pane="vehicleStatusPane"
            type="scatter"
            name=""
            color={get(chartColors, "overspeed")}
            valueField="stat_overspeed"
          >
            <Point
              symbol="square"
              size={10}
            />
          </Series> */}



                      {/* Speed */}
                      {
                        speedVisible && <Pane name="speedPane" height={150} />
                      }

                      <Series
                        type={'spline'}
                        pane="speedPane"
                        // valueField={'speedChart'}
                        valueField={'speed'}
                        // name={'Speed'}
                        name="ds_driving"
                        color={get(chartColors, "driving")}
                        width={6}
                      >
                        <Point visible={true} size={1}></Point>
                      </Series>

                      <Series
                        type={'spline'}
                        pane="speedPane"
                        valueField={'idling'}
                        // name={''}
                        name={'ds_idling'}
                        color={get(chartColors, "idling")}
                        width={6}
                      >
                        <Point visible={true} size={1}></Point>
                      </Series>

                      <Series
                        type={'spline'}
                        pane="speedPane"
                        valueField={'parking'}
                        // name={''}
                        name={'ds_parking'}
                        color={get(chartColors, "parking")}
                        width={6}
                      >
                        <Point visible={true} size={1}></Point>
                      </Series>

                      <ValueAxis
                        pane="speedPane"
                        min={0}
                        max={140}
                        title={{
                          text: speedName
                        }}
                      >
                        <Grid visible={true} />
                        {/* <Title text="Speed" /> */}
                        <ConstantLine
                          value={speed_limit}
                          width={2}
                          // color="#5856d6"
                          color="red"
                          dashStyle="Dash"
                        >
                          <Label visible={false} />
                        </ConstantLine>
                      </ValueAxis>

                      {/* RPM */}
                      {rpmVisible && <Pane name="rpmPane" height={100} />}

                      <Series
                        type={'spline'}
                        pane="rpmPane"
                        valueField={'rpm'}
                        name={'RPM'}
                        color={get(chartColors, "rpm")}
                        border={{
                          color: "#595959",
                          width: 1,
                          visible: true
                        }}
                      >
                        <Point
                          visible={true}
                          size={1}>
                        </Point>
                      </Series>

                      <ValueAxis
                        pane="rpmPane"
                        min={0}
                        max={2900}
                        title={{
                          text: rpmName,
                          margin: 10
                        }}
                      >
                        <Grid visible={true} />
                      </ValueAxis>

                      {/* Acceleration Pedal */}
                      {pedalVisible && <Pane name="accPedalPane" height={80} />}

                      <Series
                        type={'spline'}
                        pane="accPedalPane"
                        valueField={'canbus_acc_pedal'}
                        name={'Pedal xxx'}
                        color={get(chartColors, "pedal")}
                        border={{
                          color: "#595959",
                          width: 1,
                          visible: true
                        }}
                      >
                        <Point
                          visible={true}
                          size={1}>
                        </Point>
                      </Series>

                      <ValueAxis
                        pane="accPedalPane"
                        min={0}
                        max={90}
                        title={{
                          text: pedalName,
                          margin: 5
                        }}
                      >
                        <Grid visible={true} />
                      </ValueAxis>

                      {/* Sensors and switch */}
                      {
                        sensorsVisible &&
                        <Pane
                          name='sensor'
                          height={150}
                        />
                      }

                      <Series
                        pane="sensor"
                        type="scatter"
                        name="Brake"
                        color={get(chartColors, "brake")}
                        valueField="canbus_foot_brake"
                      >
                        <Point
                          symbol="circle"
                          size={6}
                        />
                      </Series>

                      <Series
                        pane="sensor"
                        type="scatter"
                        name="Exhaust"
                        color={get(chartColors, "exhaust")}
                        valueField="canbus_exhaust_brake"
                      >
                        <Point
                          symbol="circle"
                          size={6}
                        />
                      </Series>

                      <Series
                        pane="sensor"
                        type="scatter"
                        name="DTC"
                        color={get(chartColors, "dtc")}
                        valueField="canbus_dtc_engine"
                      >
                        <Point
                          symbol="circle"
                          size={6}
                        />
                      </Series>

                      <Series
                        pane="sensor"
                        type="scatter"
                        name="Clutch"
                        color={get(chartColors, "clutch")}
                        valueField="canbus_clutch_switch"
                      >
                        <Point
                          symbol="circle"
                          size={6}
                        />
                      </Series>

                      <ValueAxis
                        pane="sensor"
                        title={{
                          text: sensorName,
                          margin: 15
                        }}
                        min={2}
                        max={5}
                      >
                        <Grid visible={true} />
                        <Label customizeText={this.customizeTextSensor} />
                      </ValueAxis>

                      {/* Coolrance temperature */}
                      {coolantVisible && <Pane name="cooltempPane" height={80} />}

                      <Series
                        type={'spline'}
                        pane="cooltempPane"
                        valueField={'canbus_cooltemp'}
                        name={'Fuel Tank Level'}
                        color={get(chartColors, "temperature")}
                        border={{
                          color: "#595959",
                          width: 1,
                          visible: true
                        }}
                      >
                        <Point
                          visible={true}
                          size={1}>
                        </Point>
                      </Series>

                      <ValueAxis
                        pane="cooltempPane"
                        title={{
                          text: coolantName,
                          margin: 5
                        }}
                      >
                        <Grid visible={true} />
                      </ValueAxis>

                      {/* Fuel Tank (%) */}
                      {fuelVisible && <Pane name="fuelPane" height={80} />}

                      <Series
                        type={'spline'}
                        pane="fuelPane"
                        valueField={'fuel'}
                        name={'Fuel Tank Level'}
                        color={get(chartColors, "fuel")}
                        border={{
                          color: "#595959",
                          width: 1,
                          visible: true
                        }}
                      >
                        <Point
                          visible={true}
                          size={1}>
                        </Point>
                      </Series>

                      <ValueAxis
                        pane="fuelPane"
                        min={0}
                        max={90}
                        title={{
                          text: fuelName,
                          margin: 15
                        }}
                      >
                        <Grid visible={true} />
                      </ValueAxis>

                      {/* end Series */}

                      {/* Temp Sensor C */}
                      {(this.props.dataLogin.userId === 117 || this.props.dataLogin.userId === 2656 || this.props.dataLogin.userId === 2657) && tempVisible && <Pane name="tempPane" height={80} />}

                      <Series
                        type={'steparea'}
                        pane="tempPane"
                        valueField="tempTop"
                        name="Temp Sensor"
                        color={get(chartColors, "temp_hot")}
                        barWidth={200}
                      >
                        <Point
                          visible={true}
                          size={0.5}>
                        </Point>
                      </Series>

                      <Series
                        type={'steparea'}
                        pane="tempPane"
                        valueField="tempButtom"
                        name="Temp Sensor"
                        color={get(chartColors, "temp_cool")}
                        barWidth={200}
                      >
                        <Point
                          visible={true}
                          size={0.5}>
                        </Point>
                      </Series>

                      <ValueAxis
                        pane="tempPane"
                        min={-20}
                        max={40}
                        title={{
                          text: tempName,
                          margin: 15
                        }}
                      >
                        <Grid visible={true} />
                        <ConstantLine
                          value={temp_limit}
                          width={2}
                          color={get(chartColors, "temp_limit")}
                          dashStyle="Dash"
                        >
                          <Label visible={false} />
                        </ConstantLine>
                      </ValueAxis>

                      {/* end Series */}


                      <Crosshair
                        horizontalLine={false}
                        enabled={true}
                        width={2}
                        color='#000'
                      >
                        <HorizontalLine visible={false} />
                      </Crosshair>

                      <ZoomAndPan argumentAxis={'both'} dragToZoom={true} allowMouseWheel={false} />
                      <ScrollBar visible={false} />

                      <Legend
                        visible={false}
                        itemTextPosition="right"
                        verticalAlignment="top"
                        horizontalAlignment="center"
                        customizeItems={this.customizeItems}
                        markerRender={markerTemplate}
                      />
                    </Chart>
                  ]}
              </div>
            </div >
          ]
        }
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  language: state.versatile.language,
  dataAllPoint: state.history.dataAllPoint,
  // markTourInfo: state.history.markTourInfo,
  dataHistory: state.history.dataHistory,
  chartColors: state.history.chartColors,
  dateVisualRange: state.history.dateVisualRange,
  showChartList: state.history.showChartList,
  renderChart: state.history.renderChart
});
const mapDispatchToProps = (dispatch) => ({
  setPointValue: (pointValue) => dispatch(HistoryActions.setPointValue(pointValue)),
  setMapState: (positionMarker, infoMarker, infoType) => dispatch(HistoryActions.setMapState(positionMarker, infoMarker, infoType)),
  setShowBoxSearch: (isShow) => dispatch(HistoryActions.setShowBoxSearch(isShow)),
  setMarkerInteractiveChart: (data) => dispatch(HistoryActions.setMarkerInteractiveChart(data)),
  setPointValue: (pointValue) => dispatch(HistoryActions.setPointValue(pointValue)),
  setRenderChart: (isRender) => dispatch(HistoryActions.setRenderChart(isRender))
});

export default connect(mapStateToProps, mapDispatchToProps)(Combinations)

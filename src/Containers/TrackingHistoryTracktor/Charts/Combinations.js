import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux'
import HistoryActions from '../../../Redux/HistoryRedux'
import { momentDate } from '../../../Functions/DateMoment'
import images from '../../../Themes/Images'
import Chart, {
  CommonSeriesSettings,
  Series,
  Pane,
  ValueAxis,
  Legend,
  Label,
  Title,
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
  Font,
  SeriesTemplate,
  Animation,
  Size,
  Export,
  Margin

} from 'devextreme-react/chart';
import markerTemplate from './MarkerTemplate.js';
import { t } from '../../../Components/Translation'
import $ from 'jquery'

const { get } = require('lodash')

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


  customizeTextSensor(e) {
    if (e.value == 5) return "BK";
    if (e.value == 4) return "EB";
    if (e.value == 3) return "EL";
    if (e.value == 2) return "CL";
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

    if (this.props.language == "th") {
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


  render() {
    let { speed_limit, temp_limit, chartColors } = this.state
    let { language, chartVisibled } = this.props
    let data = []

    // this.props.onLoad(this.chart)
    // dataTour.length > 0 ? data = dataTour : data = plotData

    let speedVisible = false
    let rpmVisible = false
    let sensorsVisible = false
    let fuelVisible = false
    let coolantVisible = false
    let pedalVisible = false
    let tempVisible = false
    let heightAllChart = 0


    for (let index in chartVisibled) {
      switch (chartVisibled[index]) {
        case 1:
          speedVisible = true
          heightAllChart += 170
          break;
        case 2:
          rpmVisible = true
          heightAllChart += 140
          break;
        case 3:
          sensorsVisible = true
          heightAllChart += 180
          break;
        case 4:
          fuelVisible = true
          heightAllChart += 120
          break;
        case 5:
          coolantVisible = true
          heightAllChart += 120
          break;
        case 6:
          pedalVisible = true
          heightAllChart += 120
          break;
        case 7:
          tempVisible = true
          heightAllChart = (this.props.dataLogin.userId == 117 || this.props.dataLogin.userId == 2656 || this.props.dataLogin.userId == 2657) ? (heightAllChart + 130) : (heightAllChart + 30)
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

    if (language == "th") {
      speedName = "สถานะการขับขี่\nและความเร็ว"
      rpmName = "รอบ/นาที"
      sensorName = "สัญญาณ\nอุปกรณ์"
      fuelName = "ระดับ\nน้ำมัน(%)"
      coolantName = "อุณหภูมิ\nหม้อน้ำ(°C)"
      pedalName = "% การเหยียบ\nคันเร่ง"
      tempName = "เซ็นเซอร์อุณหภูมิ\nห้องเย็น (°C)"
    } else if (language == "ja") {
      speedName = "走行状態 (km/h)"
      rpmName = "RPM"
      sensorName = "センサー＆スイッチ"
      fuelName = "燃料タンク残量 (%)"
      coolantName = "冷却水温度 (°C)"
      pedalName = "アクセル開度 (%)"
      tempName = "Temp. \n Sensor (°C)"
    }


    return (
      <Suspense fallback={null}>
        <Chart
          ref={this.chart}
          onDone={(e) => { this.chartDone = e }}
          dataSource={data}
          id={'chart-history'}
          defaultPane="bottomPane"
          onSeriesClick={this.onSeriesClick}
          onPointHoverChanged={this.pointHover}
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
          {(this.props.dataLogin.userId == 117 || this.props.dataLogin.userId == 2656 || this.props.dataLogin.userId == 2657) && tempVisible && <Pane name="tempPane" height={80} />}

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
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  language: state.versatile.language,
  chartVisibled: state.trackingHistory.chartVisibled
});
const mapDispatchToProps = (dispatch) => ({
  setPointValue: (pointValue) => dispatch(HistoryActions.setPointValue(pointValue))
});

export default connect(mapStateToProps, mapDispatchToProps)(Combinations)
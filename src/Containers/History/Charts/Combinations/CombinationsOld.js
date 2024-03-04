import React, { Component } from 'react';
import { connect } from 'react-redux'
import HistoryActions from '../../../../Redux/HistoryRedux'
import { momentDate } from '../../../../Functions/DateMoment'
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
  Font

} from 'devextreme-react/chart';
const { get } = require('lodash')


let pointHover = ""

class Combinations extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataTour: [],
      plotData: [],
      speedLimit: 0,
      chartColors: {}
    }
    this.chart = React.createRef();
    this.onSeriesClick = this.onSeriesClick.bind(this);
    this.pointHover = this.pointHover.bind(this);
  }


  componentWillMount() {
    let { plotData } = this.state
    let { dataAllPoint, chartColors } = this.props

    if (plotData.length === 0) {
      let plotData = []
      let speed_limit = 0
      for (let idx in dataAllPoint) {
        speed_limit = dataAllPoint[idx].speed_limit
        let pointData = {
          speed: dataAllPoint[idx].speed,
          rpm: dataAllPoint[idx].rpm,
          fuel: dataAllPoint[idx].fuel,
          gpsdate: momentDate(dataAllPoint[idx].gpsdate),
          admin_level1_name: dataAllPoint[idx].admin_level1_name,
          admin_level2_name: dataAllPoint[idx].admin_level2_name,
          admin_level3_name: dataAllPoint[idx].admin_level3_name,
          driver_cards_name: dataAllPoint[idx].driver_cards_name,
          lat: dataAllPoint[idx].lat,
          lng: dataAllPoint[idx].lng,
          time: dataAllPoint[idx].time,
          canbus_fuel_cons: dataAllPoint[idx].canbus_fuel_cons
        }

        if (parseInt(dataAllPoint[idx].canbus_foot_brake) === 1) {
          pointData['canbus_foot_brake'] = dataAllPoint[idx].canbus_foot_brake
        }

        plotData.push(pointData)
      }
      this.setState({ plotData, speed_limit, chartColors })
    }
  }


  componentDidUpdate(prevProps, nextState) {
    let { dataAllPoint, markTourInfo, chartColors } = this.props
    let { dataTour } = this.state

    if (prevProps.markTourInfo.isMarkPlay != false
      && markTourInfo.isMarkPlay != false
      && prevProps.markTourInfo !== markTourInfo) {

      if (markTourInfo.isMarkPlay) {
        let pointData = {
          speed: dataAllPoint[markTourInfo.index].speed,
          gpsdate: momentDate(dataAllPoint[markTourInfo.index].gpsdate),
          rpm: dataAllPoint[markTourInfo.index].rpm,
          fuel: dataAllPoint[markTourInfo.index].fuel,
          admin_level1_name: dataAllPoint[markTourInfo.index].admin_level1_name,
          admin_level2_name: dataAllPoint[markTourInfo.index].admin_level2_name,
          admin_level3_name: dataAllPoint[markTourInfo.index].admin_level3_name,
          driver_cards_name: dataAllPoint[markTourInfo.index].driver_cards_name,
          lat: dataAllPoint[markTourInfo.index].lat,
          lng: dataAllPoint[markTourInfo.index].lng,
          time: dataAllPoint[markTourInfo.index].time,
          canbus_fuel_cons: dataAllPoint[markTourInfo.index].canbus_fuel_cons
        }

        if (parseInt(dataAllPoint[markTourInfo.index].canbus_foot_brake) === 1) {
          pointData['canbus_foot_brake'] = dataAllPoint[markTourInfo.index].canbus_foot_brake
        }
        dataTour.push(pointData)

        this.setState(prevState => prevState)
      }
      else {
        this.setState({ dataTour: [] })
      }
    }
  }

  onSeriesClick(e) {
    this.props.setInfoMarker(null, pointHover)
    this.props.setMapState(null, pointHover, 2)
    this.props.setShowBoxSearch(false)
  }

  pointHover(e) {
    let speed = e.target.data.speed
    let rpm = e.target.data.rpm
    let fuel = e.target.data.fuel
    let date = e.target.data.time

    pointHover = e.target.data
    this.props.setPointValue({ speed, rpm, fuel, date })
  }

  render() {
    let { dataTour, plotData, speed_limit, chartColors } = this.state
    let data = []

    this.props.onLoad(this.chart)
    dataTour.length > 0 ? data = dataTour : data = plotData

    return (
      <div>
        <Chart
          ref={this.chart}
          dataSource={data}
          id={'chart-history'}
          defaultPane="bottomPane"
          onSeriesClick={this.onSeriesClick}
          onPointHoverChanged={this.pointHover}
        >
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
            position={"top"}
            argumentType={'datetime'}
            label={{
              format: "HH:mm"
            }}
          >
          </ArgumentAxis>

          <Pane name="speedPane" />
          <Pane name="rpmPane" />
          <Pane name="fuelPane" />

          <Series
            type={'spline'}
            pane="speedPane"
            valueField={'speed'}
            name={'Speed'}
            color={get(chartColors, "speed", "#595959")}
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


          <Series
            pane="speedPane"
            axis="canbus_foot_brake"
            color={"red"}
            type="scatter"
            valueField="canbus_foot_brake"
            name="canbus_foot_brake"
          >     <Point
            visible={true}
            size={4}>
            </Point>
          </Series>

          <ValueAxis
            name="canbus_foot_brake"
            position="right"
            color={get(chartColors, "brake", "red")}
            max={1}
            min={1}
          >
            <Title text="Brake"  >
              {/* <Font color={"red"} /> */}
            </Title>
            <Label>
              <Font color={"white"} />
            </Label>
          </ValueAxis>


          <Series
            type={'spline'}
            pane="rpmPane"
            valueField={'rpm'}
            name={'RPM'}
            color={get(chartColors, "rpm", "#595959")}
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

          <Series
            type={'spline'}
            pane="fuelPane"
            valueField={'fuel'}
            name={'Fuel Tank Level'}
            color={get(chartColors, "fuel", "#595959")}
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
            pane="speedPane"
            min={0}
            max={130}
          >
            <Grid visible={true} />
            <Title text="Speed" />
            <ConstantLine
              value={speed_limit}
              width={1}
              color="red"
              dashStyle="solid"
            >
              <Label visible={false} />
            </ConstantLine>
          </ValueAxis>

          <ValueAxis
            pane="rpmPane"
            min={0}
            max={2900}
          >
            <Grid visible={true} />
            <Title text="RPM" />
          </ValueAxis>

          <ValueAxis
            pane="fuelPane"
            min={0}
            max={90}>
            <Grid visible={true} />
            <Title text="Fuel Tank Level" />
          </ValueAxis>

          <Crosshair
            horizontalLine={false}
            enabled={true}
            width={1}
            color='red'
          >
            <HorizontalLine visible={false} />
          </Crosshair>

          <ZoomAndPan argumentAxis={'both'} dragToZoom={true} allowMouseWheel={false} />
          <ScrollBar visible={false} width={3} />

          <Legend visible={false} />
        </Chart>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dataAllPoint: state.history.dataAllPoint,
  markTourInfo: state.history.markTourInfo,
  dataHistory: state.history.dataHistory,
  chartColors: state.history.chartColors

});
const mapDispatchToProps = (dispatch) => ({
  setPointValue: (pointValue) => dispatch(HistoryActions.setPointValue(pointValue)),
  setMapState: (positionMarker, infoMarker, infoType) => dispatch(HistoryActions.setMapState(positionMarker, infoMarker, infoType)),
  setShowBoxSearch: (isShow) => dispatch(HistoryActions.setShowBoxSearch(isShow))
});

export default connect(mapStateToProps, mapDispatchToProps)(Combinations)

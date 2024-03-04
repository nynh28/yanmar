import React, { Component } from 'react';
import { connect } from 'react-redux'
import HistoryActions from '../../../Redux/HistoryRedux'
import { momentDate } from '../../../Functions/DateMoment'

import {
  Chart, Series, Legend, ValueAxis, Tooltip, Label,
  Border, ZoomAndPan, ArgumentAxis, CommonSeriesSettings, ScrollBar,
  Grid, CommonAxisSettings, Crosshair, HorizontalLine, AggregationInterval
} from 'devextreme-react/chart';

import { get } from 'lodash'

class Speed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hoverdata: {
        value: '',
        datetime: ''
      },
      locations: [],
      dataTour: [],
      plotData: [],
      minChartDate: ''
    }
    this.customizeTooltip = this.customizeTooltip.bind(this);
  }

  componentDidUpdate(prevProps, nextState) {
    let { dataAllPoint, markTourInfo } = this.props
    let { dataTour } = this.state

    if (prevProps.markTourInfo.isMarkPlay != false
      && markTourInfo.isMarkPlay != false
      && prevProps.markTourInfo !== markTourInfo) {

      if (markTourInfo.isMarkPlay) {
        dataTour.push({
          speed: dataAllPoint[markTourInfo.index].speed,
          gpsdate: momentDate(dataAllPoint[markTourInfo.index].gpsdate)
        })

        this.setState(prevState => prevState)
      }
      else {
        this.setState({ dataTour: [] })
      }
    }
  }

  customizeTooltip(arg) {
    let gpsdate = momentDate(arg.argument)
    this.props.setPointValue({ value: arg.valueText, unit: 'kph', date: gpsdate })
  }

  componentWillMount() {
    let { plotData } = this.state
    let { dataAllPoint } = this.props

    if (plotData.length === 0) {
      let plotData = []
      for (let idx in dataAllPoint) {
        plotData.push(
          {
            speed: dataAllPoint[idx].speed,
            gpsdate: momentDate(dataAllPoint[idx].gpsdate)
          })
      }
      this.setState({ plotData })
    }
  }


  render() {

    let { dataTour, minChartDate } = this.state
    let { markTourInfo, dataAllPoint } = this.props
    let data = []

    dataTour.length > 0 ? data = dataTour : data = this.state.plotData

    return (
      <div style={{ marginTop: -20 }}>

        <Chart
          // dataSource={this.state.plotData}
          dataSource={data}
          id={'chart'}
          size={{
            height: this.props.chartHeight,
            width: this.props.chartwidth
          }}
        >
          <CommonAxisSettings>
            <Grid visible={true} />
          </CommonAxisSettings>

          <Crosshair enabled={true}
            visibility={'visible'}
          >
            <Label visible={true} />
            <HorizontalLine visible={false} />
          </Crosshair>

          <Series
            valueField={'speed'}
            name={'Silver Medals'}
            color={'#b7bbbb'} />

          <CommonSeriesSettings
            argumentField={'gpsdate'}
            type={'area'}>
            <Border visible={false} />
          </CommonSeriesSettings>

          <ValueAxis
            autoBreaksEnabled={true}
            max={150}
          >
            <Grid visible={true} />
            <Label customizeText={this.customizeText} />
          </ValueAxis>

          <ArgumentAxis
            argumentType={'datetime'}
            // defaultVisualRange={{ length: 'hour' }}
            // defaultVisualRange={{ length: 'years' }}
            label={{
              format: "HH:mm"
              // format: "shortTime"
              // format: "yyyy-MM-dd HH:mm:ss"
            }}
          >
            {/* <AggregationInterval hours={2} /> */}
          </ArgumentAxis>

          <ZoomAndPan argumentAxis={'both'} />
          <ScrollBar visible={false} />
          <Legend
            visible={false} />

          <Tooltip
            enabled={true}
            // format="millions"
            // type="fixedPoint"
            customizeTooltip={this.customizeTooltip}


          />

        </Chart>

      </div >
    );
  }

  customizeText() {
    return `${this.valueText} kph`;
  }

  customizePoint(arg) {
    if (arg.seriesName === 'Volume') {
      var point = this.chartRef.instance.getAllSeries()[0].getPointsByArg(arg.argument)[0].data;
      if (point && point.close >= point.open) {
        return { color: '#1db2f5' };
      }
    }
  }
}

const mapStateToProps = (state) => ({
  dataAllPoint: state.history.dataAllPoint,
  markTourInfo: state.history.markTourInfo,

});
const mapDispatchToProps = (dispatch) => ({
  setPointValue: (pointValue) => dispatch(HistoryActions.setPointValue(pointValue))

});

export default connect(mapStateToProps, mapDispatchToProps)(Speed)

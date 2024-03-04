import React, { Component } from 'react';
import { connect } from 'react-redux'
import HistoryActions from '../../../Redux/HistoryRedux'

import {
  Chart, Series, Legend, ValueAxis, Tooltip, Label,
  Border, ZoomAndPan, ArgumentAxis, CommonSeriesSettings, ScrollBar,
  VisualRange, Grid, CommonAxisSettings, Crosshair, HorizontalLine,
} from 'devextreme-react/chart';

import { momentDate } from '../../../Functions/DateMoment'

class RPM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSourceTest: [],
      hoverdata: {
        value: '',
        datetime: ''
      },
      locations: [],
      plotData: [],
      dataTour: [],
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
          rpm: dataAllPoint[markTourInfo.index].rpm,
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
    this.props.setPointValue({ value: arg.valueText, unit: 'rpm.', date: gpsdate })
  }


  componentWillMount() {
    let { plotData } = this.state
    let { dataAllPoint } = this.props

    if (plotData.length === 0) {
      let plotData = []
      for (let idx in dataAllPoint) {
        plotData.push(
          {
            rpm: dataAllPoint[idx].rpm,
            gpsdate: momentDate(dataAllPoint[idx].gpsdate)
          })
      }
      this.setState({ plotData })
    }
  }

  render() {
    let { dataTour } = this.state
    let data = []

    dataTour.length > 0 ? data = dataTour : data = this.state.plotData

    return (
      <div style={{ marginTop: -20 }}>
        <Chart
          // dataSource={dataAllPoint}
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
            valueField={'rpm'}
            name={'Silver Medals'}
            color={'#c0c0c0'} />

          <CommonSeriesSettings
            argumentField={'gpsdate'}
            type={'area'}>
            <Border visible={false} />
          </CommonSeriesSettings>

          <ValueAxis
            autoBreaksEnabled={true}
            max={2000}
          >
            <Grid visible={true} />
            <Label customizeText={this.customizeText} />
          </ValueAxis>
          <ArgumentAxis
            argumentType="datetime"
            // minVisualRangeLength={{ minutes: 10 }}
            // defaultVisualRange={{ length: 'hour' }}
            label={{
              format: "HH:mm"
            }}
          >

          </ArgumentAxis>
          <ZoomAndPan argumentAxis={'both'} />
          <ScrollBar visible={false} />
          <Legend
            visible={false} />

          <Tooltip
            enabled={true}
            customizeTooltip={this.customizeTooltip} />

        </Chart>
      </div >
    );
  }

  customizeText() {
    return `${this.valueText} rpm.`;
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

export default connect(mapStateToProps, mapDispatchToProps)(RPM)

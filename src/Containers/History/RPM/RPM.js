import React from 'react';

import {
  Chart, Series, Legend, Label, ScrollBar, ZoomAndPan, ArgumentAxis, CommonSeriesSettings, Border
} from 'devextreme-react/chart';

import { dataSource } from './data.js';

class RPMchart extends React.Component {

  render() {
    return (
      <div>
        <Chart
          dataSource={dataSource}
          id={'chart'}
          size={{
            height: this.props.chartHeight,
            width: this.props.chartwidth
          }}>
          <Series valueField={'silver'} name={'Silver Medals'} color={'#c0c0c0'} />
          <CommonSeriesSettings
            argumentField={'year'}
            type={'area'}>
            <Border visible={false} />
          </CommonSeriesSettings>
          <ArgumentAxis>
            <Label format={'decimal'} />
          </ArgumentAxis>
          <ZoomAndPan argumentAxis={'both'} dragToZoom={true} />
          <ScrollBar visible={true} />
          <Legend
            visible={false} />
        </Chart>
      </div>
    );

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

export default RPMchart;

import React from 'react';
import {
  Chart, Series, Legend, ValueAxis, ConstantLine, Label, ScrollBar, ZoomAndPan, ArgumentAxis, CommonSeriesSettings, Border
} from 'devextreme-react/chart';

import { dataSource } from './data.js';

class IDLEchart extends React.Component {

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
            type={'steparea'}>
            <Border visible={false} />
          </CommonSeriesSettings>
          <ValueAxis>
            <ConstantLine
              width={2}
              value={60}
              color={'#ff6161'}
              dashStyle={'dash'}
            >
              <Label visible={false}></Label>
            </ConstantLine>
          </ValueAxis>
          <ArgumentAxis>
            <Label format={'fixedPoint'} />
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

export default IDLEchart;

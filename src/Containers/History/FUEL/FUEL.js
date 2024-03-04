import React from 'react';

import {
  Chart, Series, Legend, Label, Point, ScrollBar, ZoomAndPan, ArgumentAxis, CommonSeriesSettings, Border
} from 'devextreme-react/chart';

import { dataSource } from './data.js';

class FUELchart extends React.Component {

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
          <Series valueField={'silver'} name={'Silver Medals'} color={'#c0c0c0'}><Point size={0}></Point></Series>
          <CommonSeriesSettings
            argumentField={'year'}
            type={'stepline'}>
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
}

export default FUELchart;

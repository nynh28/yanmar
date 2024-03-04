import React from 'react';

import Chart, {
  CommonSeriesSettings,
  ValueAxis,
  Label,
  Legend,
  Series,
  Tooltip,
  ConstantLine
} from 'devextreme-react/chart';

import { dataSource } from './data.js';
import { ArgumentAxis } from 'devextreme-react/polar-chart';

class Dngraph extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Chart

        dataSource={dataSource}
        id={'chart'}

        barGroupWidth={18}
        size={{
          height: this.props.chartHeight,
          width: this.props.chartwidth
        }}
      >
        <CommonSeriesSettings
          type={'stackedbar'}
          argumentField={'age'}
        />
        <Series
          valueField={'overspeed'}
          name={'Overspeed'}
          color={'#6f42c1  '}
        />
        <Series
          valueField={'parking'}
          name={'Parking'}
          color={'#f86c6b'}
        />
        <Series
          valueField={'idling'}
          name={'Idling'}
          color={'#ffc107'}
        />
        <Series
          valueField={'driving'}
          name={'Driving'}
          color={'#4dbd74'}
        />
        <Tooltip
          enabled={true}
          customizeTooltip={this.customizeTooltip}
        />
        <ValueAxis visible={false}>
          <Label visible={false} />

        </ValueAxis>
        <Legend visible={false}></Legend>
        <ArgumentAxis type={'discrete'} visible={false}>
          <Label visible={false}></Label>
        </ArgumentAxis>
      </Chart>
    );
  }

  customizeTooltip(e) {
    return { text: Math.abs(e.valueText) };
  }

  customizeLabel(e) {
    return `${Math.abs(e.value)}%`;
  }
}

export default Dngraph;

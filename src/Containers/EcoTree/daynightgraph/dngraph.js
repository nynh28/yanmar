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
  constructor(props){
    super(props);
  }
  render() {
    return (
      <Chart
       
        dataSource={dataSource}
        id={'chart'}
        
        barGroupWidth={18}
        size={{
          height:this.props.chartHeight,
          width:this.props.chartwidth
        }}
      >
        <CommonSeriesSettings
          type={'stackedbar'}
          argumentField={'age'}
        />
        <Series
          valueField={'male'}
          name={'Male'}
          color={'#3F7FBF'}
          barWidth={15}
        />
        <Series
          valueField={'female'}
          name={'Female'}
          color={'#22BAD5  '}
          barWidth={15}
        />
        <Tooltip
          enabled={true}
          customizeTooltip={this.customizeTooltip}
        />
        <ValueAxis>
          <Label customizeText={this.customizeLabel} />
          <ConstantLine
            width={2}
            value={50}
            color={'#FF0000'}
            dashStyle={'dash'}
          >
                <Label visible={false}></Label>
          </ConstantLine>
          <ConstantLine
            width={2}
            value={60}
            color={'#02D75B '}
            dashStyle={'dash'}
          >
                <Label visible={false}></Label>
          </ConstantLine>
          <ConstantLine
            width={2}
            value={-50}
            color={'#FF0000'}
            dashStyle={'dash'}
          >
            <Label visible={false}></Label>
          </ConstantLine>
          <ConstantLine
            width={2}
            value={-60}
            color={'#02D75B'}
            dashStyle={'dash'}
          >
                <Label visible={false}></Label>
          </ConstantLine>
        </ValueAxis>
        <Legend visible={false}></Legend>
        <ArgumentAxis type={'discrete'}></ArgumentAxis>
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

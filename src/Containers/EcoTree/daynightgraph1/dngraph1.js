import React from 'react';

import Chart, {
  CommonSeriesSettings,
  ValueAxis,
  Label,
  Legend,
  Series,
  Tooltip,
  ConstantLine,
  Grid
} from 'devextreme-react/chart';

import { dataSource } from './data1.js';
import { ArgumentAxis } from 'devextreme-react/polar-chart';

class Dngraph1 extends React.Component {
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
          name={'Day Time'}
          color={'#22BAD5  '}
          barWidth={7}
        />
        <Series
          valueField={'female'}
          name={'Night Time'}
          color={'#3F7FBF'}
          barWidth={7}
        />
        <Tooltip
          enabled={true}
          customizeTooltip={this.customizeTooltip}
        />
         <ValueAxis>
          <Label customizeText={this.customizeLabel} />
          <Grid visible={true}></Grid>
          <ConstantLine
            width={2}
            value={5}
            color={'#28B463'}
            dashStyle={'dash'}
          >
                <Label visible={false}></Label>
          </ConstantLine>
          <ConstantLine
            width={2}
            value={-0.8}
            color={'#28B463'}
            dashStyle={'dash'}
          >
                <Label visible={false}></Label>
          </ConstantLine>
        </ValueAxis>
      
        <Legend></Legend>
        <ArgumentAxis type={'discrete'}></ArgumentAxis>
      </Chart>
    );
  }

  customizeTooltip(e) {
    return { text: Math.abs(e.valueText) };
  }

  customizeLabel(e) {
    return `${Math.abs(e.value)} Hour`;
  }
}

export default Dngraph1;

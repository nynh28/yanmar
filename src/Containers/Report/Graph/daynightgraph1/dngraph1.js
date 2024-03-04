import React from 'react';

import Chart, {
  CommonSeriesSettings,
  ValueAxis,
  Label,
  Legend,
  Series,
  Tooltip,
  ConstantLine,
  Grid,
  Margin
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
          valueField={'ignition'}
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
         <ValueAxis
          max={20}>
          <Label customizeText={this.customizeLabel} />
          <Grid visible={true}></Grid>
          <ConstantLine
            width={1}
            value={5}
            color={'#1216ff'}
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
      
        <Legend
        itemTextPosition={'bottom'}
        verticalAlignment={'bottom'}
        orientation={'horizontal'}
        position={'Outside'}
        >
          <Margin></Margin>
        </Legend>
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

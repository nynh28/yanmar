import React from 'react';
import {
  PolarChart,
  CommonSeriesSettings,
  Series,
  Export,
  Tooltip,
  Legend,
  Font,
  Label,
  Point,
  CommonAxisSettings,
  ArgumentAxis
} from 'devextreme-react/polar-chart';
import { fruitSources, productionData } from './data.js';
import { ValueAxis } from 'devextreme-react/chart';

class Spidersafetyfleet extends React.Component {
  constructor(props) {
    super(props);


  }
  render() {
    return (
      <PolarChart
        id={'chart'}
        dataSource={productionData}
        useSpiderWeb={true}
        palette={'The Trees'}

        size={{
          height: this.props.chartHeight,
          width: this.props.chartwidth
        }}
      >


        <ArgumentAxis
        >
          <Label  indentFromAxis={'10'}><Font size={'10'} weight={'500'}></Font></Label>
        </ArgumentAxis>
        <ValueAxis
         maxValueMargin={0.01}
          max={5} >
          <Label><Font size={'10'}></Font></Label>
        </ValueAxis>

        <CommonSeriesSettings type={'area'} />

        <Series
          type="area"
          key='point'
          valueField='point'
          name='point'
          color="#00c6ff" >

          <Point
            visible={true}
            size='3' />
        </Series>
        <Series
          type="line"
          dashStyle={'dash'}
          width={2}
          key='avg'
          valueField='avg'
          name='avg'
          color="#f85a5a" >

          <Point
            visible={true}
            size='3' />
        </Series>
        <Tooltip enabled={true} />
        <Legend visible={false} position="outside"
          horizontalAlignment="right"
          verticalAlignment="center"></Legend>

      </PolarChart>
    );
  }
}

export default Spidersafetyfleet;

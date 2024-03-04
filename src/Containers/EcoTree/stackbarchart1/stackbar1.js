import React from 'react';

import { Chart, Series, CommonSeriesSettings, ArgumentAxis, Label, ConstantLine } from 'devextreme-react/chart';
import service from './data1.js';
import { ValueAxis } from 'devextreme-react/polar-chart';

const dataSource = service.dataSource();

class Stackchart1 extends React.Component {

  constructor(props) {
    super(props);

  }
  render() {
    return (
      <Chart
        id={'chart'}
        dataSource={dataSource}
        rotated={true}
        size={{
          height: this.props.chartHeight,
          width: this.props.chartwidth
        }}
      >

        <CommonSeriesSettings argumentField={'country'} type={'fullstackedbar'} />

        <Series valueField={'hydro'} name={'Running time'} color={'#22c933'}>
          <Label visible={true} format={'percent'} position={"inside"} backgroundColor={'none'}>
          </Label>
        </Series>
        <Series valueField={'oil'} name={'Idling'} color={'#F1C40F'}>
          <Label visible={true} format={'percent'} position={"inside"} backgroundColor={'none'}>
          </Label>
        </Series>
        <Series valueField={'gas'} name={'Non operating time'} color={'#D4D4D4'}>
          <Label visible={true} format={'percent'} position={"inside"} backgroundColor={'none'}>
          </Label>
        </Series>
        <ValueAxis
        >

          <Label customizeText={this.customizeText} />
          <ConstantLine
            width={2}
            value={0.4}
            color={'#28B463'}
            dashStyle={'dash'}
          >
            <Label text={'Average'} />
          </ConstantLine>

        </ValueAxis>
        <ArgumentAxis label={{ visible: false }}>

        </ArgumentAxis>



      </Chart>
    );
  }
}

export default Stackchart1;

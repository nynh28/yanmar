import React from 'react';

import { Chart, Series, CommonSeriesSettings, ArgumentAxis, Label } from 'devextreme-react/chart';
import service from './data.js';

const dataSource = service.dataSource();

class Stackchart extends React.Component {

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
        <Series valueField={'hydro'} name={'Utilized'} color={'#28B463'}>
          <Label visible={true} format={'percent'} position={"inside"}>
          </Label>
        </Series>
        <Series valueField={'oil'} name={'Idling'} color={'#F1C40F'}>
          <Label visible={true} format={'percent'} position={"inside"}>
          </Label>
        </Series>
        <Series valueField={'gas'} name={'Non Effective'} color={'#D4D4D4'}>
          <Label visible={true} format={'percent'} position={"inside"}>
          </Label>
        </Series>
        <ArgumentAxis label={{ visible: false }}></ArgumentAxis>



      </Chart>
    );
  }
}

export default Stackchart;

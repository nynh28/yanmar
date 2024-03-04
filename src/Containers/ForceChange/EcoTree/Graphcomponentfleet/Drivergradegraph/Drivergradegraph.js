import React from 'react';

import { Chart, Series, CommonSeriesSettings, Label, Font, Format, Legend, ValueAxis, VisualRange, ConstantLine, ArgumentAxis, CommonAxisSettings } from 'devextreme-react/chart';
import { populationByRegions } from './data1.js'

class Drivergrade extends React.Component {
  customizePoint(point) {
    // console.log(point);
    if (point.argument == "Parking") {
      return { color: '#f86c6b' }
    }
    if (point.argument == "Driving") {
      return { color: '#4dbd74' }
    }
    if (point.argument == "Idling") {
      return { color: '#ffc107' }
    }
    if (point.argument == "Overspeed") {
      return { color: '#6f42c1' }
    }
    if (point.argument == "Inactived") {
      return { color: '#c8ced3' }
    }
    else {
      return {}
    }
  }
  render() {
    return (
      <Chart id={'chart'}

        dataSource={populationByRegions}
        onPointClick={this.onPointClick}
        rotated={true}
        size={{
          height: this.props.chartHeight,
          width: this.props.chartwidth
        }}

      >
        <CommonSeriesSettings
          argumentField={'country'}
          type={'fullstackedbar'}
          name={'AVG'}
        >

        </CommonSeriesSettings>

        <Series
          valueField={'Driving'}
          color={'#4dbd74'}
          name={'AVG'}

        >
          <Label visible={true} position={"inside"} customizeText={this.customizeText} backgroundColor={'undefined'} >
            <Font color={'white'} size={10} weight={600}></Font>
          </Label>
        </Series>

        <Series
          valueField={'Parking'}
          color={'#fff000'}
          name={'AVG'}

        >
          <Label visible={true} position={"inside"} customizeText={this.customizeText} backgroundColor={'undefined'} >
            <Font color={'white'} size={10} weight={600}></Font>
          </Label>
        </Series>
        <Series
          valueField={'Ignition'}
          color={'#ffa801'}
          name={'AVG'}

        >
          <Label visible={true} position={"inside"} customizeText={this.customizeText} backgroundColor={'undefined'}>
            <Font color={'white'} size={10} weight={600}></Font>
          </Label>
        </Series>
        <Series
          valueField={'Overspeed'}
          color={'#f86c6b'}
          name={'AVG'}

        >
          <Label visible={true} position={"inside"} customizeText={this.customizeText} backgroundColor={'undefined'} >
            <Font color={'white'} size={10} weight={600}></Font>
          </Label>
        </Series>
        <Legend visible={false} verticalAlignment={'right'} horizontalAlignment={'center'}></Legend>
        <ArgumentAxis>
          <Label
            visible={false}
          />
        </ArgumentAxis>
      </Chart>
    );
  }
  customizeText(e) {
    return `${e.valueText} P.`;
  }
  customizeLabel(e) {
    return `${e.valueText}%`;
  }
  customizeTooltip(arg) {
    return {
      text: `${arg.valueText}%`
    };
  }
}

export default Drivergrade;

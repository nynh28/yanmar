import React from 'react';

import { Chart, Series, CommonSeriesSettings, Label, Font, Legend, ValueAxis, ConstantLine, ArgumentAxis } from 'devextreme-react/chart';
import { populationByRegions } from './data1.js'


class Operationchartbar extends React.Component {
  customizePoint(point) {
    // //console.log(point);
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
        ignoreEmptyPoints={true}
      >
        <CommonSeriesSettings
          argumentField={'country'}
          type={'fullstackedbar'}
          name={'AVG'}
          barPadding={0.2}
          lowValueField={'low'}
        >

        </CommonSeriesSettings>

        {/* avg company sc */}

        <Series
          valueField={'Drivingac'}
          color={'#a9c0b1'}
          name={'AVG'}
          barWidth={20}
        >

          <Label visible={true} position={"inside"} customizeText={this.customizeText} backgroundColor={'undefined'} >
            <Font color={'white'} size={10} weight={600}></Font>
          </Label>
        </Series>

        <Series
          valueField={'Parkingac'}
          color={'#f5b2b2'}
          name={'AVG'}
          barWidth={20}
        >
          <Label visible={true} position={"inside"} customizeText={this.customizeText} backgroundColor={'undefined'} >
            <Font color={'white'} size={10} weight={600}></Font>
          </Label>
        </Series>
        <Series
          valueField={'Ignitionac'}
          color={'#9a86bf'}
          name={'AVG'}
          barWidth={20}
        >
          <Label visible={true} position={"inside"} customizeText={this.customizeText} backgroundColor={'undefined'}>
            <Font color={'white'} size={10} weight={600}></Font>
          </Label>
        </Series>
        <Series
          valueField={'Overspeedac'}
          color={'#fbe8ae'}
          name={'AVG'}
          barWidth={20}
        >
          <Label visible={true} position={"inside"} customizeText={this.customizeText} backgroundColor={'undefined'} >
            <Font color={'white'} size={10} weight={600}></Font>
          </Label>
        </Series>
        <Series
          valueField={'Inactivedac'}
          color={'#c8ced3'}
          name={'AVG'}
          barWidth={20}
        >
          <Label visible={true} position={"inside"} customizeText={this.customizeText} backgroundColor={'undefined'} >
            <Font color={'white'} size={10} weight={600}></Font>
          </Label>
        </Series>

        {/* avg company thai */}

        <Series
          valueField={'Drivingat'}
          color={'#a9c0b1'}
          name={'AVG'}
          barWidth={20}
        >

          <Label visible={true} position={"inside"} customizeText={this.customizeText} backgroundColor={'undefined'} >
            <Font color={'white'} size={10} weight={600}></Font>
          </Label>
        </Series>

        <Series
          valueField={'Parkingat'}
          color={'#f5b2b2'}
          name={'AVG'}
          barWidth={20}
        >
          <Label visible={true} position={"inside"} customizeText={this.customizeText} backgroundColor={'undefined'} >
            <Font color={'white'} size={10} weight={600}></Font>
          </Label>
        </Series>
        <Series
          valueField={'Ignitionat'}
          color={'#9a86bf'}
          name={'AVG'}
          barWidth={20}
        >
          <Label visible={true} position={"inside"} customizeText={this.customizeText} backgroundColor={'undefined'}>
            <Font color={'white'} size={10} weight={600}></Font>
          </Label>
        </Series>
        <Series
          valueField={'Overspeedat'}
          color={'#fbe8ae'}
          name={'AVG'}
          barWidth={20}
        >
          <Label visible={true} position={"inside"} customizeText={this.customizeText} backgroundColor={'undefined'} >
            <Font color={'white'} size={10} weight={600}></Font>
          </Label>
        </Series>
        <Series
          valueField={'Inactivedat'}
          color={'#c8ced3'}
          name={'AVG'}
          barWidth={20}
        >
          <Label visible={true} position={"inside"} customizeText={this.customizeText} backgroundColor={'undefined'} >
            <Font color={'white'} size={10} weight={600}></Font>
          </Label>
        </Series>


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
          color={'#f86c6b'}
          name={'AVG'}

        >
          <Label visible={true} position={"inside"} customizeText={this.customizeText} backgroundColor={'undefined'} >
            <Font color={'white'} size={10} weight={600}></Font>
          </Label>
        </Series>
        <Series
          valueField={'Ignition'}
          color={'#ffc107'}
          name={'AVG'}

        >
          <Label visible={true} position={"inside"} customizeText={this.customizeText} backgroundColor={'undefined'}>
            <Font color={'white'} size={10} weight={600}></Font>
          </Label>
        </Series>
        <Series
          valueField={'Overspeed'}
          color={'#6f42c1'}
          name={'AVG'}

        >
          <Label visible={true} position={"inside"} customizeText={this.customizeText} backgroundColor={'undefined'} >
            <Font color={'white'} size={10} weight={600}></Font>
          </Label>
        </Series>
        <Series
          valueField={'Inactived'}
          color={'#c8ced3'}
          name={'AVG'}

        >
          <Label visible={true} position={"inside"} customizeText={this.customizeText} backgroundColor={'undefined'} >
            <Font color={'white'} size={10} weight={600}></Font>
          </Label>
        </Series>


        <ValueAxis
        >


          <ConstantLine
            width={1}
            value={53}
            color={'red'}
            dashStyle={'dash'}
          >
            <Label text={'Avg Com'} >
              <Font color={'white'} size={'10'} weight={'500'}></Font>
            </Label>
          </ConstantLine>
          <ConstantLine
            width={1}
            value={67}
            color={'#d4d4d4'}
            dashStyle={'dash'}
          >
            <Label text={'Avg Thai'} >
              <Font color={'white'} size={'10'} weight={'500'}></Font>
            </Label>
          </ConstantLine>
        </ValueAxis>
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
    return `${e.valueText}`;
  }
  customizeLabel(e) {
    return `${e.valueText}`;
  }
  customizeTooltip(arg) {
    return {
      text: `${arg.valueText}`
    };
  }
}

export default Operationchartbar;

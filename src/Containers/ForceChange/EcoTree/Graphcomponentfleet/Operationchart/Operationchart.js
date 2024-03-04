import React from 'react';

import PieChart, {
  Legend,
  Series,
  Tooltip,
  Format,
  Label,
  Connector,
  SmallValuesGrouping,
  Export
} from 'devextreme-react/pie-chart';
import CenterTemplate from './CenterTemplate.js';
import { populationByRegions } from './data1.js';

class Operationchart extends React.Component {
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
      <PieChart
        id="pie"
        type="doughnut"
        palette="Soft Pastel"
        dataSource={populationByRegions}
        resolveLabelOverlapping="shift"
        sizeGroup="piesGroup"
        innerRadius={0.65}
        centerRender={CenterTemplate}
        size={{
          height: this.props.chartHeight,
          width: this.props.chartwidth
        }
        }
        customizePoint={this.customizePoint.bind(this)}
      >
        <Series argumentField="region">

          <Label
            visible={true}
            position={"inside"}
            format="fixedPoint"
            customizeText={this.customizeLabel}
            backgroundColor="none"
          >


          </Label>
        </Series>
        <Series argumentField="region">

          <Label
            visible={true}
            position={"inside"}
            format="fixedPoint"
            customizeText={this.customizeLabel}
            backgroundColor="none"
          >


          </Label>
        </Series>


        <Legend visible={false}
          margin={50}
          horizontalAlignment="right"
          verticalAlignment="center"
        />
        <Tooltip enabled={true} customizeTooltip={this.customizeTooltip}>
        </Tooltip>
      </PieChart >
    );
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

export default Operationchart;

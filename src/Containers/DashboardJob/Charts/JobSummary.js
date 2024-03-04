import React from 'react';

import PieChart, {
  Legend, Series, Tooltip, Label, Connector
} from 'devextreme-react/pie-chart';
import CenterTemplate from './CenterTemplate.js';

export const populationByRegions = [{
  name: 'On Time Jobs',
  val: 16
}, {
  name: 'Late Jobs',
  val: 25
}, {
  name: 'Not Started Jobs',
  val: 14
}, {
  name: 'Expected late Jobs',
  val: 3
}, {
  name: 'Cancle Jobs',
  val: 25
}
];


class JobSummary extends React.Component {
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
        <Series argumentField="name">
          <Label visible={true} customizeText={this.formatLabel} format="fixedPoint">
            <Connector visible={true} width={0.5} />
          </Label>
        </Series>
        <Legend visible={false} />
        <Tooltip enabled={true} customizeTooltip={this.customizeTooltip}>
        </Tooltip>
      </PieChart >
    );
  }

  formatLabel(arg) {
    return `${arg.argumentText} : ${arg.valueText}%`;
  }

  customizeTooltip(arg) {
    return {
      text: `${arg.valueText}%`
    };
  }
  customizePoint(point) {
    let color = {}
    switch (point.argument) {
      case "On Time Jobs":
        color = { color: '#57DF4E' }
        break;
      case "Late Jobs":
        color = { color: '#FFCC00' }
        break;
      case "Not Started Jobs":
        color = { color: '#ADADB2' }
        break;
      case "Expected late Jobs":
        color = { color: '#FF3B30' }
        break;
      case "Cancle Jobs":
        color = { color: '#5856D6' }
        break;
      default:
        break;
    }
    return color
  }
}

export default JobSummary;

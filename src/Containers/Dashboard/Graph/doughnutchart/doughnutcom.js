import React from 'react';

import PieChart, {
  Legend,
  Series,
  Tooltip,
  Format,
  Label,
  Connector,
  Export
} from 'devextreme-react/pie-chart';

import { populationByRegions } from './data.js';

class doughnut extends React.Component {
  constructor(props) {
    super(props);
  }
  customizePoint(point) {
    if (point.argument == "Driving") {
      return { color: '#4dbd74' }
    }
    if (point.argument == "Parking") {
      return { color: '#f86c6b' }
    }
    if (point.argument == "Ignition") {
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
        innerRadius="0.9"
        dataSource={populationByRegions}
        size={{
          height: this.props.chartHeight,
          width: this.props.chartwidth
        }}
        customizePoint={this.customizePoint.bind(this)}
      >
        <Series argumentField="region">
          <Label visible={true} format="percent" >
            <Connector visible={false} />
          </Label>

        </Series>

        <Legend
          margin={50}
          horizontalAlignment="right"
          verticalAlignment="center"
        />

      </PieChart>
    );
  }

  customizeTooltip(arg) {
    return {
      text: `${arg.valueText} - ${(arg.percent * 100).toFixed(2)}%`
    };
  }
}

export default doughnut;

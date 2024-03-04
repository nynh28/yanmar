import React from 'react';

import PieChart, {
  Legend,
  Series,
  Tooltip,
  Format,
  Label,
  Font,
  Connector,
  SmallValuesGrouping,
  Border,
  customizePoint,
  Export
} from 'devextreme-react/pie-chart';
import CenterTemplate from './CenterTemplate.js';
import { populationByRegions } from './data.js';
import { Margin, PointBorder } from 'devextreme-react/chart';

class Operationchartvehicle extends React.Component {
  customizePoint(point) {
    // //console.log(point);
    if (point.argument == "Parking") {
      return { color: '#ff3b30' }
    }
    if (point.argument == "Driving") {
      return { color: '#57df4e' }
    }
    if (point.argument == "Idling") {
      return { color: '#ffcc00' }
    }
    if (point.argument == "Offline") {
      return { color: '#adadb2' }
    }
    if (point.argument == "Over Speed") {
      return { color: '#6600ff' }
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
        dataSource={populationByRegions}
        resolveLabelOverlapping="shift"
        sizeGroup="piesGroup"
        innerRadius={0.9}
        centerRender={CenterTemplate}
        startAngle={90}
        size={{
          height: this.props.chartHeight,
          width: this.props.chartwidth
        }
        }
        customizePoint={this.customizePoint.bind(this)}
      >
        <Series argumentField="region"
        >
          <Label
            visible={true}
            position={"outside"}
            format="fixedPoint"
            customizeText={this.customizeLabel}
            backgroundColor='none'
            border={{ visible: true, color: 'black' }}

          >


            <Font
              size={16} weight={500} family={'Prompt'} >

            </Font>

          </Label>
        </Series>
        <Legend visible={true}
          horizontalAlignment="center"
          verticalAlignment="bottom"
        >
          <Margin bottom={100} ></Margin>
          <Font size={16} family={'Prompt'}  ></Font>
        </Legend>
        <Tooltip enabled={true} customizeTooltip={this.customizeTooltip}>
        </Tooltip>
      </PieChart >
    );
  }
  customizeLabel(e) {
    return `${e.valueText} Units ` + "<br>" + "(" + (e.percent * 100).toFixed(0) + "%" + ")";
  }

  customizeTooltip(arg) {
    // //console.log(arg)
    return {
      text: `${arg.valueText} Units` + "<br>" + (arg.percent * 100).toFixed(0) + "%"
    };
  }
}

export default Operationchartvehicle;

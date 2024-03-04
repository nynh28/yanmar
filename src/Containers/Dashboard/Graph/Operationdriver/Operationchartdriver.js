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
  Export,
  Border

} from 'devextreme-react/pie-chart';
import CenterTemplate from './CenterTemplate.js';
import { populationByRegions } from './data.js';
import { Margin } from 'devextreme-react/chart';


class Operationchartdriver extends React.Component {
  customizePoint(point) {
    // //console.log(point);
    if (point.argument == "Working") {
      return { color: '#57df4e' }
    }
    if (point.argument == "Not Working") {
      return { color: '#ff3b30' }
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
            position={"outside"}
            format="fixedPoint"
            customizeText={this.customizeLabel}
            backgroundColor='none'
            border={{ visible: true, color: 'black' }}
          >
            <Connector visible={true}></Connector>
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
          <Font size={16} family={'Prompt'} ></Font>
        </Legend>

        <Tooltip enabled={true} customizeTooltip={this.customizeTooltip} >
        </Tooltip>
      </PieChart >
    );
  }
  customizeLabel(e) {
    // //console.log(e)
    return ` ${e.valueText} Drivers ` + "<br>" + "(" + (e.percent * 100).toFixed(0) + "%" + ")";
  }
  customizeTooltip(arg) {
    // //console.log(arg)
    return {
      // text: `${arg.valueText} Units` + "<br>Value : " + arg.valueText,
      text: `${arg.valueText} Drivers` + "<br>" + (arg.percent * 100).toFixed(0) + "%"
    };
  }
}

export default Operationchartdriver;

import React from 'react';

import { Chart, Series, CommonSeriesSettings, Label, Format, Legend, ValueAxis, VisualRange, ConstantLine, ArgumentAxis } from 'devextreme-react/chart';
import { grossProductData } from './data';

class Daynightgraph extends React.Component {
  constructor(props) {
    super(props);
    // //console.log(props);
    this.state = {
      data: [{
        state: 'KM',
        day: this.props.data.day,
        night: this.props.data.night
      }]
    };
  }

  render() {
    return (
      <Chart id={'chart'}
        dataSource={this.state.data}
        onPointClick={this.onPointClick}
        rotated={true}
        size={{
          height: this.props.chartHeight,
          width: this.props.chartwidth
        }}

      >
        <CommonSeriesSettings
          argumentField={'state'}
          type={'fullstackedbar'}
          hoverMode={'allArgumentPoints'}
          selectionMode={'allArgumentPoints'}

        >
        </CommonSeriesSettings>
        <Series
          valueField={'day'}
          color={'#133660'}
          name={'AVG'}
          barWidth={50}
        >
          <Label visible={true} position={"inside"} customizeText={this.customizeText} ></Label>
        </Series>
        <ValueAxis
          maxValueMargin={0.01}
        >

        </ValueAxis>
        <ArgumentAxis label={{ visible: false }} ></ArgumentAxis>
        <Series
          valueField={'night'}
          color={'#1db2f5'}
          name={'AVG'}
          barWidth={50}
        >
          <Label visible={true} position={"inside"} customizeText={this.customizeText} > </Label>
        </Series>


        <Legend verticalAlignment={'right'} horizontalAlignment={'center'}></Legend>

      </Chart>
    );
  }

  onPointClick(e) {
    e.target.select();
  }
  customizeLabel(e) {
    return `${Math.abs(e.value)} Km./Liter`;
  }

  customizeText(pointInfo) {
    return `${(pointInfo.value.toFixed(0))} %`;
  }
}

export default Daynightgraph;

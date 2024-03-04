import React from 'react';

import { Chart, Series, CommonSeriesSettings, Label, Format, Legend, ValueAxis, VisualRange, ConstantLine, ArgumentAxis } from 'devextreme-react/chart';
import { grossProductData } from './data.js';

class Daynightgraph extends React.Component {
  constructor(props) {
    super(props);


  }
  render() {
    return (
      <Chart id={'chart'}

        dataSource={grossProductData}
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
          valueField={'year1997'}
          color={'#133660'}
          name={'AVG'}

        >
          <Label visible={true} position={"inside"} customizeText={this.customizeText} ></Label>
        </Series>
        <ArgumentAxis label={{ visible: false }} ></ArgumentAxis>
        <Series
          valueField={'year1998'}
          color={'#1db2f5'}
          name={'AVG'}

        >
          <Label visible={true} position={"inside"} customizeText={this.customizeText} > </Label>
        </Series>


        <Legend visible={false} verticalAlignment={'right'} horizontalAlignment={'center'}></Legend>

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
    return `${pointInfo.value} %`;
  }
}

export default Daynightgraph;

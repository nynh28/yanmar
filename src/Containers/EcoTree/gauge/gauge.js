import React from 'react';
import { BarGauge, Label } from 'devextreme-react/bar-gauge';


const values = [97, 90];
const palette = ['#1db2f5', '#97c95c', '#0000ff'];
const format = {
  type: 'fixedPoint',
  precision: 1
};

class Gauge1 extends React.Component {
  constructor(props) {
    super(props);


  }

  render() {
    return (
      <BarGauge
        id={'gauge'}
        startValue={0}
        endValue={140}
        defaultValues={values}
        palette={palette}
        geometry={{ startAngle: 180, endAngle: 0 }}
        size={{
          height: this.props.chartHeight,
          width: this.props.chartwidth
        }}
      >
        <Label indent={5} format={format} customizeText={this.customizeText} visible={false} />

      </BarGauge>
    );
  }

  customizeText({ valueText }) {
    return `${valueText} Km/Hr`;
  }
}

export default Gauge1;

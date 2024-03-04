import React from 'react';
import { BarGauge, Label } from 'devextreme-react/bar-gauge';
import { Series } from 'devextreme-react/chart';

const values = [2200, 2123];
const palette = ['#1db2f5', '#97c95c', '#0000ff'];

class Gauge extends React.Component {
  constructor(props) {
    super(props);


  }

  render() {
    return (
      <BarGauge
        id={'gauge'}
        startValue={0}
        endValue={3000}
        defaultValues={values}
        palette={palette}
        geometry={{ startAngle: 180, endAngle: 0 }}
        size={{
          height: this.props.chartHeight,
          width: this.props.chartwidth
        }}
      >

        <Series>
        </Series>
        <Series></Series>
        <Label indent={5} format={'decimal'} customizeText={this.customizeText} visible={false} />

      </BarGauge>
    );
  }

  customizeText({ valueText }) {
    return `${valueText} RPM`;
  }
}

export default Gauge;

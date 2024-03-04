import React from 'react';

import { Chart, Series, Legend, SeriesTemplate, ArgumentAxis, ValueAxis, CommonSeriesSettings, Margin } from 'devextreme-react/chart';
import { dataSource, grossProductData } from './data.js';
import { Label } from 'devextreme-react/data-grid';

class Barcom4 extends React.Component {
  constructor(props) {
    super(props);
  }

  customizePoint(point) {
    if (point.value == 0) {
      return { visible: false }
    } else {
      return {}
    }
  }
  render() {
    return (
      <Chart id={'chart'}
        customizePoint={this.customizePoint.bind(this)}
        dataSource={grossProductData} rotated={true} size={{
          height: this.props.chartHeight,
          width: this.props.chartwidth

        }}>
        <CommonSeriesSettings
          type={'bar'}
          argumentField={'state'}
          ignoreEmptyPoints={true}
        />
        <ValueAxis
          visible={false}>
          <Label visible={false}>
          </Label>
        </ValueAxis>
        <Series
          valueField="unplug"
          argumentField="state"
          name="Unplug"
          type="bar"
          color="#ffc107" />
        <Series
          valueField="over8"
          argumentField="state"
          name="Over 8 Hr."
          type="bar"
          color="#20c997" />
        <Series
          valueField="over4"
          argumentField="state"
          name="Over 4 Hr."
          type="bar"
          color="#20a8d8" />
        <Series
          valueField="over"
          argumentField="state"
          name="Over Speed"
          type="bar"
          color="#6f42c1" />
        <Series
          valueField="notcard"
          argumentField="state"
          name="Not Swipe Card"
          type="bar"
          color="#f86c6b" />
        <Legend
          visible={true}
          verticalAlignment={'bottom'}
          position={'Outside'}
          paddingTopBottom={'10'}
          horizontalAlignment={'center'}
        >
          {/* <Margin right={50}></Margin> */}
        </Legend>

      </Chart>
    );
  }
}

export default Barcom4;

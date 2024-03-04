import React from 'react';

import { Chart, Series, CommonSeriesSettings, Label, Format, Legend, ValueAxis, VisualRange, ConstantLine, ArgumentAxis, Font } from 'devextreme-react/chart';
import { grossProductData } from './data';
import { ConstantLineStyleLabel } from 'devextreme-react/polar-chart';

class Hourunit extends React.Component {
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
        }
        }

      >
        <CommonSeriesSettings
          argumentField={'Mileage'}
          type={'bar'}
        >
        </CommonSeriesSettings>

        <Series
          valueField={'Units'}
          color={'#4dbd74'}
          name={'AVG'}
        >
          <Label
            customizeText={this.customizeText}
            visible={true}
            backgroundColor={'undefined'}
          >
            <Font color={'black'} size={12} weight={600}></Font>
          </Label>
        </Series>

        <ArgumentAxis>
          <Label
            visible={true}
          >
            <Font size={11}></Font>
          </Label>
        </ArgumentAxis>




        <Legend visible={false} verticalAlignment={'bottom'} horizontalAlignment={'center'}></Legend>

      </Chart>
    );
  }
  customizeText(pointInfo) {
    return `${pointInfo.value} units`;
  }
  onPointClick(e) {
    e.target.select();
  }
}

export default Hourunit;

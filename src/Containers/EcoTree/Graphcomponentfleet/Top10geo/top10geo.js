import React from 'react';

import { Chart, Series, CommonSeriesSettings, Label, Legend, ArgumentAxis, Font } from 'devextreme-react/chart';
import { grossProductData } from './data';

class top10geo extends React.Component {
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
          type={'stackedBar'}
        >
        </CommonSeriesSettings>

        <Series
          valueField={'Units'}
          name={'AVG'}
          color={'#43a1f6'}
        >
          {/* <Label
            customizeText={this.customizeText}
            visible={true}
            backgroundColor={'undefined'}
          >
            <Font color={'black'} size={12} weight={600}></Font>
          </Label> */}
        </Series>
        <Series
          valueField={'Units2'}
          name={'AVG'}
          color={'#81d452'}
        >
          {/* <Label
            customizeText={this.customizeText}
            visible={true}
            backgroundColor={'undefined'}
          >
            <Font color={'black'} size={12} weight={600}></Font>
          </Label> */}
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

export default top10geo;

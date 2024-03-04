import React from 'react';
import { Chart, Series, CommonSeriesSettings, Label, Legend, ArgumentAxis, Font } from 'devextreme-react/chart';

class Hourunit extends React.Component {
  constructor(props) {
    super(props);
    // //console.log(props);
    this.state = {
      data: [{
        Mileage: '0-120',
        Units: this.props.data.time_0_120
      }, {
        Mileage: '121-240',
        Units: this.props.data.time_121_240
      }, {
        Mileage: '241-360',
        Units: this.props.data.time_241_360
      }, {
        Mileage: '361-480',
        Units: this.props.data.time_361_480
      },
      {
        Mileage: '481-600',
        Units: this.props.data.time_481_600
      }
      ]
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

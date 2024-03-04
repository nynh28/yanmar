import React from 'react';
import { Chart, Series, CommonSeriesSettings, Label, Legend, ArgumentAxis, Font } from 'devextreme-react/chart';

class Mileageunit extends React.Component {
  constructor(props) {
    super(props);
    // //console.log(props);
    this.state = {
      data: [{
        Mileage: '0-2500',
        Units: this.props.data.dis_0_2500
      }, {
        Mileage: '2500-5000',
        Units: this.props.data.dis_2501_5000
      }, {
        Mileage: '5001-7500',
        Units: this.props.data.dis_5001_7500
      }, {
        Mileage: '7501-10,000',
        Units: this.props.data.dis_7501_10000
      },
      {
        Mileage: '10,001-12,500',
        Units: this.props.data.dis_10001_12500
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

export default Mileageunit;

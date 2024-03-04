import React from 'react';

import Chart, {
  CommonSeriesSettings,
  ValueAxis,
  Label,
  Legend,
  Series,
  Tooltip,
  ConstantLine,
  Grid,
  Font,
  Image,
  Pane,
  Crosshair, HorizontalLine, CommonAxisSettings, Point
} from 'devextreme-react/chart';

import { populationData, continentSources } from './data1.js';
import { ArgumentAxis } from 'devextreme-react/polar-chart';

const crosshairFormat = {
  type: 'fixedPoint',
  precision: 2
};
class Mileagesandfuelgraph extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      MAverage: 6142,
      FAverage: 1190000,
      data: this.props.data.result
    };
    this.customizeLabel = this.customizeLabel.bind(this);


  }


  render() {
    return (
      <Chart

        dataSource={this.state.data}
        id={'chart'}
        size={{
          height: this.props.chartHeight,
          width: this.props.chartwidth
        }}
        customizePoint={this.customizePoint}
        customizeLabel={this.customizeLabel}

      >
        <Pane name="top" />
        <Pane name="bottom" />
        <CommonSeriesSettings
          type={'bar'}
          argumentField={'datetime'}

        />
        {/* <CommonAxisSettings>
          <Grid visible={true} />
        </CommonAxisSettings> */}
        {/* {
          continentSources.map(function (item) {
            return (
              <Series
                key={item.value}
                valueField={item.value}
                name={item.name} >
                <Label
                  visible={true}
                  rotationAngle={270}
                  verticalOffset={18}
                  alignment={'center'}
                  horizontalOffset={0}
                  backgroundColor={'undefined'}

                >
                  <Font color={'black'} size={12}></Font>
                </Label>

              </Series>);
          })
        } */}

        <Series
          pane="top"
          type="line"
          valueField="mileage"
          name="mileages"
          color="#008fd8"
          barWidth={5}
        >
          <Point
            visible={true}
            size='6' />
          <Label
            visible={true}
            rotationAngle={270}
            verticalOffset={18}
            alignment={'center'}
            horizontalOffset={0}
            backgroundColor={'undefined'}

          >
            <Font color={'black'} size={12}></Font>
          </Label>

        </Series>

        <Series
          pane="bottom"
          axis="fuel"
          type="line"
          valueField="fuel_used"
          name="fuel"
          color="#133660"

        >
          <Point
            visible={true}
            size='6' />
          <Label
            visible={true}
            rotationAngle={270}
            verticalOffset={18}
            alignment={'center'}
            horizontalOffset={0}
            backgroundColor={'undefined'}

          >
            <Font color={'black'} size={12}></Font>
          </Label>

        </Series>
        <Tooltip
          enabled={true}
          customizeTooltip={this.customizeTooltip}
        />

        <ValueAxis
          name="mileages"
          position="left"

        >
          <Label customizeText={this.customizeLabel2} />
          <Grid visible={true} />
          <ConstantLine
            width={0.5}
            value={this.state.MAverage}
            color={'red'}
            dashStyle={'dash'}
          >
            <Label text={'Fleet Average'} horizontalAlignment="right" position={'outside'}>
              <Font color={'red'} size={'10'} weight={'500'}></Font>
            </Label>
          </ConstantLine>
        </ValueAxis>


        <ValueAxis
          name="fuel"
          position="left"

        >

          <Label customizeText={this.customizeLabel3} />
          <Grid visible={true} />
          <ConstantLine
            width={0.5}
            value={this.state.FAverage}
            color={'red'}
            dashStyle={'dash'}

          >
            <Label text={'Over Average'} horizontalAlignment="right" position={'outside'}></Label>
            <Label text={'Fleet Average'} horizontalAlignment="right" position={'outside'}>
              <Font color={'red'} size={'10'} weight={'500'}></Font>
            </Label>
          </ConstantLine>
        </ValueAxis>
        <Legend visible={false}
          verticalAlignment="bottom"
          horizontalAlignment="center"></Legend>
        <Crosshair enabled={true}>
          <HorizontalLine visible={false} />
          <Label visible={true} format={crosshairFormat} />
        </Crosshair>

        <ArgumentAxis>
          <Label
            customizeText={this.customizeText2}
            overlappingBehavior={'none'}
          >
            <Font size={'9'} family={'Prompt'} weight={500}></Font>
          </Label>

        </ArgumentAxis>
      </Chart>
    );
  }


  customizeText2(e) {
    var date = e.value.split('-')[2]
    for (var i = 0; i <= date.length; i++) {
      if (date[0] == 0) {
        var date = date.slice(1, 2);
      }
      else {
        var date
      }
    }
    return `${date}`;
  }


  customizeTooltip(e) {
    // console.log(e)
    var fuel = e.point.data.fuel_used.toFixed(2) / 1000;
    var data = e.point.data.mileage.toFixed(2) / fuel;
    var fuelcon = data.toFixed(2)
    // console.log(fuelcon)
    // return { text: Math.abs(e.valueText) };
    return {
      text: "Mileages : " + e.point.data.mileage + "<br>Fuel : " + fuel + "<br>Fuel Consumtion : " + fuelcon
    };
  }

  customizeLabel3(e) {
    return `${Math.abs(e.value)}`;
  }


  customizeLabel2(e) {
    return `${Math.abs(e.value)}`;
  }

  // customizePoint(arg) {

  //   if (arg.value > this.state.highAverage) {
  //     return { color: '#ff7c7c', hoverStyle: { color: '#ff7c7c' } };
  //   } else if (arg.value < this.state.lowAverage) {
  //     return { color: '#8c8cff', hoverStyle: { color: '#8c8cff' } };
  //   }
  // }

  customizeLabel(arg) {
    // console.log(arg)
    if (arg.seriesName == "mileages" && arg.value > this.state.MAverage) {
      return {
        visible: true,
        font: {
          color: '#00b0f0',

        },
        customizeText: function (e) {
          return `${e.valueText}`;
        }
      };
    }
    if (arg.seriesName == "fuel" && arg.value > this.state.FAverage) {
      return {
        visible: true,
        font: {
          color: '#00b0f0',

        },
        customizeText: function (e) {
          return `${e.valueText}`;
        }
      };
    } else return {
      visible: true,
      font: {
        color: 'green',

      },
      customizeText: function (e) {
        return `${e.valueText}`;
      }
    };

  }



  customizeText(pointInfo) {
    // console.log(pointInfo)
    return `${pointInfo.value}`;
  }

}

export default Mileagesandfuelgraph;

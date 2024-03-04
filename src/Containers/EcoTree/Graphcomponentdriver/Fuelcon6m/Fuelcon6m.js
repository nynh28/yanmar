import React from 'react';
import {
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  Export,
  Legend,
  Margin,
  Title,
  Subtitle,
  Grid,
  Label,
  ValueAxis,
  Point
} from 'devextreme-react/chart';


class Fuelcon6m extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'line',
      data: [this.props.data[0], this.props.data[1], this.props.data[2], this.props.data[3], this.props.data[4], this.props.data[5]]
    };
    // //console.log(this.state.data)
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (

      <React.Fragment>
        <Chart
          palette="Violet"
          dataSource={this.state.data}
          size={{
            height: this.props.chartHeight,
            width: this.props.chartwidth
          }}
        >


          <CommonSeriesSettings
            argumentField="month"
            type={this.state.type}
          />
          <Series valueField={'fuel'}  >
            <Point
              visible={true}
              size='5' />
            <Label
              visible={true}
              customizeText={this.customizeText}

            />
          </Series>

          <Margin bottom={20} />
          <ValueAxis
            maxValueMargin={0.01}
          // max={7}
          >
            <Label customizeText={this.customizeLabel} />
          </ValueAxis>
          <ArgumentAxis
            valueMarginsEnabled={false}
            discreteAxisDivisionMode="crossLabels"
          >

            <Grid visible={true} />
          </ArgumentAxis>
          <Legend
            verticalAlignment="bottom"
            horizontalAlignment="center"
            itemTextPosition="bottom"
          />
          <Export enabled={true} />
          <Title text="Energy Consumption in 2004">
            <Subtitle text="(Millions of Tons, Oil Equivalent)" />
          </Title>
        </Chart>
      </React.Fragment>
    );
  }

  handleChange(e) {
    this.setState({ type: e.value });
  }
  customizeLabel(e) {
    return `${Math.abs(e.value.toFixed(2))}`;
  }
  customizeText(pointInfo) {
    return `${(pointInfo.value.toFixed(2))}`;
  }

}

export default Fuelcon6m;

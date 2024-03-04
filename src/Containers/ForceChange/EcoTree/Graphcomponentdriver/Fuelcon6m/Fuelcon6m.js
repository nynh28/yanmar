import React from 'react';
import SelectBox from 'devextreme-react/select-box';
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
  Tooltip,
  Grid,
  Label,
  ValueAxis,
  Point
} from 'devextreme-react/chart';
import service from './data.js';

const countriesInfo = service.getCountriesInfo();
const energySources = service.getEnergySources();
const types = ['line', 'stackedline', 'fullstackedline'];

class Fuelcon6m extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'line'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <React.Fragment>
        <Chart
          palette="Violet"
          dataSource={countriesInfo}
          size={{
            height: this.props.chartHeight,
            width: this.props.chartwidth
          }}
        >


          <CommonSeriesSettings
            argumentField="country"
            type={this.state.type}
          />
          {
            energySources.map((item) => {
              return <Series key={item.value} valueField={item.value} name={item.name} >
                <Point
                  visible={true}
                  size='5' />
                <Label
                  visible={true}
                  customizeText={this.customizeText}

                />
              </Series>;
            })
          }
          <Margin bottom={20} />
          <ValueAxis
            maxValueMargin={0.01}
            max={7}
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
    return `${Math.abs(e.value)}`;
  }
  customizeText(pointInfo) {
    return `${pointInfo.value}`;
  }

}

export default Fuelcon6m;

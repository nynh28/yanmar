import React from 'react';
import {
  Chart,
  Series,
  Legend,
  ValueAxis,
  VisualRange,
  Label,
  ConstantLine,
  ArgumentAxis
} from 'devextreme-react/chart';
import { temperaturesData } from './data1.js';

class Custombar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lowAverage: 65
    };
    this.customizeLabel = this.customizeLabel.bind(this);
    this.customizePoint = this.customizePoint.bind(this);
  }

  render() {
    return (
      <Chart
        id={'chart'}
        dataSource={temperaturesData}
        customizePoint={this.customizePoint}
        customizeLabel={this.customizeLabel}
        size={{
          height: this.props.chartHeight,
          width: this.props.chartwidth
        }}

      >
        <Series
          argumentField={'day'}
          valueField={'value'}
          type={'bar'}
          color={'#F1C40F'}


        />
        <ValueAxis
          maxValueMargin={0.01}
        >
          <VisualRange />
          <Label customizeText={this.customizeText} />
          <ConstantLine
            width={1}
            value={this.state.lowAverage}
            color={'#28B463'}
            dashStyle={'dash'}
            paddingTopBottom={10}
          >
            <Label text={'Max speed'} />
          </ConstantLine>

        </ValueAxis>
        <Legend visible={false} />
        <ArgumentAxis type={'discrete'}></ArgumentAxis>
      </Chart>
    );
  }

  customizePoint(arg) {

    if (arg.value > this.state.highAverage) {
      return { color: '#ff7c7c', hoverStyle: { color: '#ff7c7c' } };
    } else if (arg.value < this.state.lowAverage) {
      return { color: '#28B463', hoverStyle: { color: '#8c8cff' } };
    }
  }

  customizeLabel(arg) {
    if (arg.value > this.state.highAverage) {
      return {
        visible: true,
        backgroundColor: '#ff7c7c',
        customizeText: function (e) {
          return `${e.valueText}`;
        }
      };
    }
  }

  customizeText(arg) {
    return `${arg.valueText} Lite`;
  }
}

export default Custombar;

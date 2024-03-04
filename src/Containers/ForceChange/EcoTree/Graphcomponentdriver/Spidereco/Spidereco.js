import React from 'react';
import {
  PolarChart,
  CommonSeriesSettings,
  Series,
  Export,
  Tooltip,
  Legend,
  Point,
  ArgumentAxis,
  CommonAxisSettings,
  AdaptiveLayout
} from 'devextreme-react/polar-chart';
import { fruitSources, productionData } from './data1.js';
import { ValueAxis, Font } from 'devextreme-react/chart';
import { Label } from 'devextreme-react/data-grid';

class Spidereco extends React.Component {
  constructor(props) {
    super(props);
    this.customizeText = this.customizeText.bind(this);

  }

  render() {
    return (
      <PolarChart
        id={'chart'}
        dataSource={productionData}
        useSpiderWeb={true}
        palette={'The Trees'}
        size={{
          height: this.props.chartHeight,
          width: this.props.chartwidth,

        }}
        customizeText={this.customizeText}
      >
        <ArgumentAxis>
          <Label customizeText={this.customizeText} indentFromAxis={'10'}><Font size={'10'} weight={'500'}></Font></Label>
        </ArgumentAxis>
        <ValueAxis
          maxValueMargin={0.01}
          max={5} >
          <Label><Font size={'10'}></Font></Label>
        </ValueAxis>
        <CommonSeriesSettings type={'area'}>
        </CommonSeriesSettings>

        <Series
          type="area"
          key='point'
          valueField='point'
          name='point'
          color="green" >

          <Point
            visible={true}
            size='3' />
        </Series>
        <Series
          type="line"
          dashStyle={'dash'}
          width={2}
          key='avg'
          valueField='avg'
          name='avg'
          color="#f85a5a" >

          <Point
            visible={true}
            size='3' />
        </Series>
        <Tooltip enabled={true} />
        <Legend visible={false}
          position="outside"
          horizontalAlignment="center"
          verticalAlignment="bottom">

        </Legend>

      </PolarChart>
    );
  }
  customizeText(data) {
    if (data.value == " Exhaust Brake/Retarder") {
      return `Exhaust Brake/\nRetarder`;
    }
    if (data.value == "RPM High Speed") {
      return `RPM High\nSpeed`;
    }
    if (data.value == "Shift+Up RPM") {
      return `Shift+Up\nRPM`;
    }
    if (data.value == "Shift+Down RPM") {
      return `Shift+Down\nRPM`;
    }
    else
      return `${data.value}`;
  }
}

export default Spidereco;

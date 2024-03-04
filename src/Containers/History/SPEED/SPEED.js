import React from 'react';
import { Animation, Chart, Series, Legend, ValueAxis, Title, Pane, Grid, Tooltip, Crosshair, ConstantLine, Label, VisualRange, Size, Point, ScrollBar, ZoomAndPan, Aggregation, ArgumentAxis, LoadingIndicator, TooltipTemplate, CommonSeriesSettings, Border } from 'devextreme-react/chart';
import { dataSource } from './data.js';



class SPEEDchart extends React.Component {

  constructor(props) {
    super(props);

  }



  render() {

    return (

      <div>
        <Chart
          dataSource={dataSource}
          id={'chart'}
          size={{
            height: this.props.chartHeight,
            width: this.props.chartwidth
          }}>
          <Series
            // argumentField="speed"
            //  valueField={'kph'}
            valueField={'speed'}
            name={'Silver Medals'}
            color={'#c0c0c0'} />
          <CommonSeriesSettings
            argumentField={'time'}
            type={'steparea'}>
            <Border visible={false} />
          </CommonSeriesSettings>
          <ValueAxis>
            {/* <ConstantLine
              width={2}
              value={60}
              color={'#ff6161'}
              dashStyle={'dash'}
            >
              <Label visible={false}></Label>
            </ConstantLine> */}
            <Grid visible={false} />
            <Label customizeText={this.customizeText} />
          </ValueAxis>
          <ArgumentAxis>
            <Label format={'decimal'} />
          </ArgumentAxis>
          <ZoomAndPan argumentAxis={'both'} dragToZoom={true} />
          <ScrollBar visible={true} />
          <Legend
            visible={false} />
        </Chart>
      </div>
    );
  }

  customizeText() {
    return `${this.valueText}kph`;
  }

  customizePoint(arg) {
    if (arg.seriesName === 'Volume') {
      var point = this.chartRef.instance.getAllSeries()[0].getPointsByArg(arg.argument)[0].data;
      if (point && point.close >= point.open) {
        return { color: '#1db2f5' };
      }
    }
  }
}

export default SPEEDchart;

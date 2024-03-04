import React from 'react';
import {
  PolarChart, CommonSeriesSettings, Series, Tooltip, Legend,
  Font, Label, Point, CommonAxisSettings, ArgumentAxis
} from 'devextreme-react/polar-chart';
import { ValueAxis } from 'devextreme-react/chart';

export default class Spider extends React.Component {
  render() {
    let { data, chartWidth, chartHeight } = this.props

    return (
      <PolarChart
        id={'chart'}
        dataSource={data.scors}
        useSpiderWeb={true}
        palette={'The Trees'}
        keepLabels={false}
        size={{
          height: chartHeight,
          width: chartWidth
        }}
      >
        <CommonAxisSettings>
          <Label indentFromAxis={'10'} ><Font size={'14'} weight={'800'}></Font></Label>
        </CommonAxisSettings>
        <ArgumentAxis>
          <Label><Font size={'10'} weight={'500'}></Font></Label>
        </ArgumentAxis>
        <ValueAxis
          maxValueMargin={0.01}
          max={10} >
          <Label><Font size={'1'}></Font></Label>
        </ValueAxis>

        <CommonSeriesSettings type={'area'} />

        <Series
          type="area"
          key='score'
          valueField='score'
          name='Score'
          color={data.seriesColor} >
          <Point
            visible={true}
            size='3' />
        </Series>
        <Tooltip enabled={true} />
        <Legend visible={true}
          position="outside"
          horizontalAlignment="right"
          verticalAlignment="center">
        </Legend>
      </PolarChart>
    );
  }
}
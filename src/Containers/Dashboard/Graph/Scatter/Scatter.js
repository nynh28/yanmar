import React from 'react';

import {
  Chart,
  Series,
  Legend,
  ValueAxis,
  Point,
  Border,
  CommonPaneSettings,
  Tooltip,
  ArgumentAxis,
  Grid,
  Label,
  Export,
  Crosshair,
  Font
} from 'devextreme-react/chart';
import { dataSource } from './data.js';

export default function App() {
  return (
    <Chart
      id="chart"
      title=""
      dataSource={dataSource}
      customizePoint={customizePoint}
    >
      <ArgumentAxis>
        <Label rotationAngle={20} overlappingBehavior="rotate" />
        <Grid visible={true} />
      </ArgumentAxis>
      <CommonPaneSettings>
        <Border visible={true} />
      </CommonPaneSettings>
      <Series
        argumentField="name"
        valueField="mass"
        type="scatter"
      >
        <Point size={20} />
      </Series>
      <Tooltip enabled={true} />
      <ValueAxis type="logarithmic" title="Engine Revolution(rpm)" />
      <Crosshair
      enabled={true}
      color="#949494"
      width={3}
      dashStyle="dot"
    >
      <Label
        visible={true}
        backgroundColor="#949494"
      >
        <Font
          color="#fff"
          size={12}
        />
      </Label>
    </Crosshair>
      <Legend visible={false} />
      <Export enabled={true} />
    </Chart>
  );
}

function customizePoint({ data }) {
  let color, hoverStyle;
  switch (data.type) {
    case 'Star':
      color = 'red';
      hoverStyle = { border: { color: 'red' } };
      break;
    case 'Satellite':
      color = 'gray';
      hoverStyle = { border: { color: 'gray' } };
  }
  return { color, hoverStyle };
}

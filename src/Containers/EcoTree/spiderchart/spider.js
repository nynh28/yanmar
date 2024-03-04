import React from 'react';
import {
  PolarChart,
  CommonSeriesSettings,
  Series,
  Tooltip,
  Legend,
  Font,
  Label
} from 'devextreme-react/polar-chart';
import { fruitSources, productionData } from './data.js';
import { ValueAxis } from 'devextreme-react/chart';

class Spider extends React.Component {
  constructor(props) {
    super(props);


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
          width: this.props.chartwidth
        }}
      >

        <ValueAxis type={'discrete'}>
          <Label><Font size={'2'}></Font></Label>
        </ValueAxis>
        <CommonSeriesSettings type={'area'} />
        {
          fruitSources.map(function (item) {
            return <Series key={item.value} valueField={item.value} name={item.name} />;
          })
        }
        <Tooltip enabled={true} />
        <Legend visible={false}></Legend>

      </PolarChart>
    );
  }
}

export default Spider;

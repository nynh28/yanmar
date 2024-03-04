import React from 'react';
import {
  PolarChart,
  CommonSeriesSettings,
  Series,
  Export,
  Tooltip,
  Legend
} from 'devextreme-react/polar-chart';
import { fruitSources, productionData } from './data1.js';
import { ValueAxis, Font , Size , ArgumentAxis } from 'devextreme-react/chart';
import { Label } from 'devextreme-react/data-grid';

class Safety extends React.Component {
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
            height:this.props.chartHeight,
            width:this.props.chartwidth
          }}
        
      >
        <Size
              height={this.props.chartHeight}
              width={this.props.chartwidth}
          />
        <ArgumentAxis>
          <Label><Font size={'10'}></Font></Label>
        </ArgumentAxis>
        <ValueAxis type={'discrete'}>
          <Label><Font size={'2'}></Font></Label>
        </ValueAxis>
        <CommonSeriesSettings type={'area'} />
        {
          fruitSources.map(function(item) {
            return <Series key={item.value} valueField={item.value} name={item.name} />;
          })
        }
        <Tooltip enabled={true} />
        <Legend visible={false}></Legend>
       
      </PolarChart>
    );
  }
}

export default Safety;

import React from 'react';

import { Chart, Series, Legend, ArgumentAxis, ValueAxis } from 'devextreme-react/chart';
import {dataSource} from '../dataspeedhistrogram'
import { Label } from 'devextreme-react/data-grid';
import { fromPairs } from 'ramda';

class Barcom5 extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <Chart id={'chart'} dataSource={dataSource} rotated={true}>
        <Series
          valueField={'oranges'}
          argumentField={'day'}
          name={'My oranges'}
          type={'bar'}
          color={'#ff4e2a'} />
        <Legend visible={false}></Legend>
          
      </Chart>
    );
  }
}

export default Barcom5;

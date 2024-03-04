import React from 'react';

import { Chart, Series, Legend } from 'devextreme-react/chart';
import { dataSource } from './data.js';

class Barcom3 extends React.Component {

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

export default Barcom3;

import React from 'react';

import { Chart, Series } from 'devextreme-react/chart';
import { dataSource } from './data.js';

class Driverbar2 extends React.Component {

  render() {
    return (
      <Chart id={'chart'} dataSource={dataSource}
          rotated={true}>
        <Series
          valueField={'oranges'}
          argumentField={'day'}
          name={'%'}
          type={'bar'}
          color={'#ffaa66'} />
      </Chart>
    );
  }
}

export default Driverbar2;

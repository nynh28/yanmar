import React from 'react';
import SelectBox from 'devextreme-react/select-box';
import {
  Chart,
  Series,
  ArgumentAxis,
  Legend,
  Label
} from 'devextreme-react/chart';
import { overlappingModes, population } from './data.js';

class Driverline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMode: overlappingModes[0]
    };
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div id={'chart-demo'}>
        <Chart
          id={'chart'}
          dataSource={population}
          title={'Distance Graph'}
        >
          <Series argumentField={'country'} />
          <ArgumentAxis>
            <Label
              wordWrap={'none'}
              overlappingBehavior={this.state.currentMode}
            />
          </ArgumentAxis>
          <Legend visible={false} />
        </Chart>

      </div>
    );
  }

  handleChange(e) {
    this.setState({ currentMode: e.value });
  }
}

export default Driverline;

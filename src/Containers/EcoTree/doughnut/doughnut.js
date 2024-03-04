import React from 'react';
import PieChart, {
  Legend,
  Series,
  Label,
  Connector
} from 'devextreme-react/pie-chart';
import { populationByRegions } from './data.js';

class Doughnut extends React.Component {
  constructor(props) {
    super(props);


  }
  render() {
    return (
      <PieChart
        id={'pie'}
        type={'doughnut'}
        palette={'Soft Pastel'}
        dataSource={populationByRegions}
        size={{
          height: this.props.chartHeight,
          width: this.props.chartwidth
        }}
      >
        <Series argumentField={'region'}>
          <Label visible={true} format={'percent'} position={"inside"}>
            <Connector visible={true} />
          </Label>
        </Series>

        <Legend
          visible={false}
        />


      </PieChart>
    );
  }


}

export default Doughnut;

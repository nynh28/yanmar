import React from 'react';

import PieChart, {
  Series,
  Label
} from 'devextreme-react/pie-chart';

import { areas } from './data1.js';

class Piechart1 extends React.Component {
  constructor(props) {
    super(props);

    this.pointClickHandler = this.pointClickHandler.bind(this);
    this.legendClickHandler = this.legendClickHandler.bind(this);
  }

  render() {
    return (
      <PieChart
        id={'pie'}
        dataSource={areas}
        palette={'Bright'}

        onPointClick={this.pointClickHandler}
        onLegendClick={this.legendClickHandler}
        size={{
          height: this.props.chartHeight,
          width: this.props.chartwidth
        }}
      >
        <Series
          argumentField={'country'}
          valueField={'area'}
        >
          <Label visible={true} position={"inside"}>

          </Label>
        </Series>



      </PieChart>
    );
  }

  pointClickHandler(e) {
    this.toggleVisibility(e.target);
  }

  legendClickHandler(e) {
    let arg = e.target;
    let item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];

    this.toggleVisibility(item);
  }

  toggleVisibility(item) {
    item.isVisible() ? item.hide() : item.show();
  }
}

export default Piechart1;

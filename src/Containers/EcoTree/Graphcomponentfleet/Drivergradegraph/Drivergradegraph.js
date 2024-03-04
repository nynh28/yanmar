import React from 'react';
import PieChart, {
  Series,
  Label,
  Font
} from 'devextreme-react/pie-chart';
import { Legend } from 'devextreme-react/polar-chart';

class Drivergrade extends React.Component {
  constructor(props) {
    super(props);
    // //console.log(props);
    this.state = {
      data: [{
        country: 'Grade A<br></br>(81-100)',
        area: this.props.data[0].total
      }, {
        country: 'Grade B<br></br>(61-80)',
        area: this.props.data[1].total
      }, {
        country: 'Grade C<br></br>(41-60)',
        area: this.props.data[2].total
      }, {
        country: 'Grade D<br></br>(0-40)',
        area: this.props.data[3].total
      },
      ]
    };


  }
  customizePoint(point) {
    // //console.log(point);
    if (point.argument == 'Grade A<br></br>(81-100)') {
      return { color: '#57df4e' }
    }
    if (point.argument == 'Grade B<br></br>(61-80)') {
      return { color: '#c3eb34' }
    }
    if (point.argument == 'Grade C<br></br>(41-60)') {
      return { color: '#ffcc00' }
    }
    if (point.argument == 'Grade D<br></br>(0-40)') {
      return { color: '#ff3b30' }
    }
    else {
      return {}
    }
  }
  render() {

    return (
      <PieChart
        id={'pie'}
        dataSource={this.state.data}
        palette={'Carmine'}
        startAngle={90}
        onPointClick={this.pointClickHandler}
        onLegendClick={this.legendClickHandler}
        size={{
          height: this.props.chartHeight,
          width: this.props.chartwidth
        }}
        customizePoint={this.customizePoint.bind(this)}
      >
        <Series
          argumentField={'country'}
          valueField={'area'}
        >
          <Label customizeText={this.customizeText} visible={true} position={"inside"} backgroundColor="null">
            <Font
              size={12} weight={500} family={'Prompt'} >

            </Font>
          </Label>

        </Series>
        <Legend visible={true}
          horizontalAlignment="center"
          verticalAlignment="bottom">

          <Font
            size={8} weight={500} family={'Prompt'} >

          </Font>

        </Legend>

      </PieChart>
    );
  }

  customizeText(pointInfo) {
    // //console.log(pointInfo)
    if (pointInfo.value > 0) {
      return `${pointInfo.value}`;
    }

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

export default Drivergrade;

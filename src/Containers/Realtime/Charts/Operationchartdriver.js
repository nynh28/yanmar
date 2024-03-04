import React from 'react';
import { connect } from 'react-redux'
import PieChart, {
  Legend,
  Series,
  Tooltip,
  Format,
  Label,
  Font,
  Connector,
  SmallValuesGrouping,
  Export,
  Border

} from 'devextreme-react/pie-chart';
import CenterTemplate from './CenterTemplateDriver.js';
import { populationByRegions2 } from './data.js';
import { Margin } from 'devextreme-react/chart';
import markerTemplate from './MarkerTemplate.js';
import { isEqual } from 'lodash';

class Operationchartdriver extends React.Component {
  constructor(props) {
    super(props)
    this.calculate = this.calculate.bind(this);
    this.customizeTooltip = this.customizeTooltip.bind(this)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.calculate()
  }
  // UNSAFE_componentWillReceiveProps() {
  //   this.calculate()
  // }

  componentDidUpdate(prevProps, prevState) {
    // if (prevProps.drivers !== this.props.drivers) {
    //   this.calculate()
    // }

  }

  shouldComponentUpdate(nextProps, nextState) {


    if (nextProps.drivers !== this.props.drivers) {
      this.calculate()
      return false

    }
    // if (nextState.data !== this.state.data) {
    //   return false
    // }

    return true
  }


  calculate() {

    let { data } = this.state
    let { drivers, menuUser } = this.props
    var working = 0
    var offline = 0
    var wrongtype = 0

    for (let i in drivers) {
      if (drivers[i].driver_cards.status_swipe_card == 1) {
        working = working + 1
      }
      if (drivers[i].driver_cards.status_swipe_card == 2) {
        wrongtype = wrongtype + 1
      }
    }

    offline = menuUser.driverCount - (working + wrongtype)


    //  offline = all - working

    let working_lb = "Swiped <br>Card"
    let not_working_lb = "Not Swipe <br>Card"
    let wrong_license_type_lb = "Wrong <br>License Type"

    if (this.props.language == "th") {
      working_lb = "รูดบัตรแล้ว"
      not_working_lb = "ไม่ได้รูดบัตร"
      wrong_license_type_lb = "ใบขับขี่ <br>ผิดประเภท"
    }

    let newData = [{
      region: working_lb,
      val: working,
      language: this.props.language
    },
    {
      region: wrong_license_type_lb,
      val: wrongtype,
      language: this.props.language
    },
    {
      region: not_working_lb,
      val: offline,
      language: this.props.language
    }]

    if (!isEqual(data, newData)) {
      this.setState({ data: newData })
    } else {

    }

  }
  customizePoint(point) {
    // //console.log(point);
    if (point.argument == "Swiped <br>Card" || point.argument == "รูดบัตรแล้ว") {
      return { color: '#57df4e' }
    }
    if (point.argument == "Not Swipe <br>Card" || point.argument == "ไม่ได้รูดบัตร") {
      return { color: '#adadb2' }
    }
    if (point.argument == "Wrong <br>License Type" || point.argument == "ใบขับขี่ <br>ผิดประเภท") {
      return { color: '#ff3b30' }
    }
    else {
      return {}
    }
  }

  render() {
    // //console.log('render')
    return (
      <div>
        {this.state.data.length > 0 && (
          <PieChart
            id="pie"
            type="doughnut"
            dataSource={this.state.data}
            animation={false}
            resolveLabelOverlapping="shift"
            sizeGroup="piesGroup"
            innerRadius={0.9}
            centerRender={CenterTemplate}
            startAngle={90}
            size={{
              height: this.props.chartHeight,
              width: this.props.chartwidth
            }
            }
            customizePoint={this.customizePoint.bind(this)}
          >
            <Series argumentField="region">

              <Label
                // radialOffset={-15}
                visible={true}
                position={"inside"}
                format="fixedPoint"
                customizeText={this.customizeLabel}
                backgroundColor='none'
              >

                <Font
                  size={14} weight={900} family={'Prompt'} >

                </Font>
              </Label>

            </Series>

            <Legend visible={true}
              horizontalAlignment="center"
              verticalAlignment="bottom"
            // customizeItems={this.customizeItems}
            // markerRender={markerTemplate}
            >

              <Margin left={45}></Margin>
              <Font size={10} family={'Prompt'} ></Font>

            </Legend>

            <Tooltip enabled={true} customizeTooltip={this.customizeTooltip} >
            </Tooltip>
          </PieChart >
        )}

      </div>
    );
  }

  customizeLabel(e) {
    // //console.log(e)
    if (e.valueText == "0") {
      return
    }
    return ` ${e.valueText}`;
  }
  customizeItems(arg) {
    // //console.log(arg)
  }
  customizeTooltip(arg) {
    var tooltip
    switch (this.props.language) {
      case 'th':
        tooltip = `${arg.valueText} คนขับ` + "<br>" + (arg.percent * 100).toFixed(0) + "%"
        break;
      case 'en':
        tooltip = `${arg.valueText} Drivers` + "<br>" + (arg.percent * 100).toFixed(0) + "%"
        break;
      case 'jp':
        tooltip = `${arg.valueText} Drivers` + "<br>" + (arg.percent * 100).toFixed(0) + "%"
        break;
    }
    return {
      text: tooltip
    };
    // //console.log(arg)
    // return {
    //   // text: `${arg.valueText} Units` + "<br>Value : " + arg.valueText,
    //   text: `${arg.valueText} Drivers` + "<br>" + (arg.percent * 100).toFixed(0) + "%"
    // };
  }
}

const mapStateToProps = (state) => ({
  language: state.versatile.language,
  menuUser: state.signin.menuUser,
})
export default connect(mapStateToProps)(Operationchartdriver)

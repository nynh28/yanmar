import React from 'react';
import { connect } from 'react-redux'
import PieChart, {
  Legend,
  Series,
  Tooltip,
  Label,
  Font
} from 'devextreme-react/pie-chart';
import CenterTemplate from './CenterTemplateDriver.js';
import { isEqual } from 'lodash';

class Operationchartdriver extends React.Component {
  constructor(props) {
    super(props)
    this.calculate = this.calculate.bind(this);
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

    let newData = [
      //   {
      //   region: working_lb,
      //   val: this.props.dlt_unknown.percent.toFixed(2),
      //   language: this.props.language,
      //   driver_count: this.props.driver_count
      // },
      {
        region: wrong_license_type_lb,
        val: (typeof this.props.dlt_wrongtype.percent != "undefined") ? this.props.dlt_wrongtype.percent.toFixed(2) : 0,
        language: this.props.language,
        driver_count: this.props.driver_count
      },
      {
        region: not_working_lb,
        val: this.props.dlt_unknown.percent.toFixed(2),
        language: this.props.language,
        driver_count: this.props.driver_count
      }
    ]

    if (!isEqual(data, newData)) {
      this.setState({ data: newData }, () => {
        // //console.log(this.state.data)
      })
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
                  size={8} weight={900} family={'Prompt'} >

                </Font>
              </Label>

            </Series>

            <Legend visible={true}
              horizontalAlignment="center"
              verticalAlignment="bottom"
            // customizeItems={this.customizeItems}
            // markerRender={markerTemplate}
            >

              {/* <Margin left={45}></Margin> */}
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
    // //console.log(arg)
    return {
      // text: `${arg.valueText} Units` + "<br>Value : " + arg.valueText,
      // text: `${arg.valueText} Drivers` + "<br>" + (arg.percent * 100).toFixed(0) + "%"
      text: (arg.percent * 100).toFixed(0) + "%"
    };
  }
}

const mapStateToProps = (state) => ({
  language: state.versatile.language,
  menuUser: state.signin.menuUser,
})
export default connect(mapStateToProps)(Operationchartdriver)

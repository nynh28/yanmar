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
import RealtimeNewActions from '../../../Redux/RealtimeNewRedux'
import { get, isEqual } from 'lodash';

class Operationchartdriver extends React.Component {
  constructor(props) {
    super(props)
    this.calculate = this.calculate.bind(this);
    this.customizeTooltip = this.customizeTooltip.bind(this)
    this.state = {
      data: []
    }
    this.lstWorking = []
    this.lstWrongtype = []
    this.lstOffline = 0
  }

  componentDidMount() {
    let { drivers } = this.props
    this.calculate(drivers)
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { drivers } = this.props

    if (nextProps.drivers !== drivers) {
      this.calculate(nextProps.drivers)
      return false
    }

    return true
  }

  calculate(drivers) {
    let { data } = this.state
    let { menuUser } = this.props
    this.lstWorking = []
    this.lstWrongtype = []
    this.lstOffline = 0

    for (let i in drivers) {
      if (get(drivers[i], 'driver_cards.status_swipe_card') == 1) {
        this.lstWorking.push(get(drivers[i], 'info.vid'))
      }
      if (get(drivers[i], 'driver_cards.status_swipe_card') == 2) {
        this.lstWrongtype.push(get(drivers[i], 'info.vid'))
      }
    }

    this.lstOffline = menuUser.driverCount - (this.lstWorking.length + this.lstWrongtype.length)
    let working_lb = "Swiped Card"
    let not_working_lb = "Not Swipe Card"
    let wrong_license_type_lb = "Wrong License Type"

    if (this.props.language == "th") {
      working_lb = "รูดบัตรแล้ว"
      not_working_lb = "ไม่ได้รูดบัตร"
      wrong_license_type_lb = "ใบขับขี่ผิดประเภท"
    }

    let newData = [{
      id: "lstWorking",
      region: working_lb,
      val: this.lstWorking.length,
      language: this.props.language
    },
    {
      id: "lstWrongtype",
      region: wrong_license_type_lb,
      val: this.lstWrongtype.length,
      language: this.props.language
    },
    {
      id: "lstOffline",
      region: not_working_lb,
      val: this.lstOffline,
      language: this.props.language
    }]

    if (!isEqual(data, newData)) {
      this.setState({ data: newData })
    }
  }

  customizePoint(point) {
    if (point.argument == "Swiped Card" || point.argument == "รูดบัตรแล้ว") {
      return { color: '#57df4e' }
    }
    if (point.argument == "Not Swipe Card" || point.argument == "ไม่ได้รูดบัตร") {
      return { color: '#adadb2' }
    }
    if (point.argument == "Wrong License Type" || point.argument == "ใบขับขี่ผิดประเภท") {
      return { color: '#ff3b30' }
    }
    else {
      return {}
    }
  }

  pointClickHandler(arg) {
    let lstClk = this[get(arg, 'target.data.id')]
    // console.log('pointClickHandler', lstClk)
    if (Array.isArray(lstClk)) {
      this.props.setDisplayVehicle(lstClk)
      this.props.setStateReduxRealtime({ activeTabOverlay: "1" })
      window.scroll({ top: 5555, behavior: 'smooth' })
    }
  }

  render() {
    // //console.log('render')
    let { stateMapControl } = this.props
    if (!stateMapControl.dashboardEnabled) return ''

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
            }}
            onPointClick={this.pointClickHandler.bind(this)}
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
  // dataUpdate: state.realtimeNew.dataUpdate,
  drivers: state.realtimeNew.initialVehiclesData,
  stateMapControl: state.realtimeNew.stateMapControl,
})

const mapDispatchToProps = (dispatch) => ({
  setDisplayVehicle: (listVehicles) => dispatch(RealtimeNewActions.setDisplayVehicle(listVehicles)),
  setStateReduxRealtime: (objStateRudux) => dispatch(RealtimeNewActions.setStateReduxRealtime(objStateRudux))
});

export default connect(mapStateToProps, mapDispatchToProps)(Operationchartdriver)

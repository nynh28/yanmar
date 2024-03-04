import React from 'react';
import { connect } from 'react-redux'
import PieChart, {
  Legend,
  Series,
  Tooltip,
  Label,
  Font
} from 'devextreme-react/pie-chart';
import CenterTemplate from './CenterTemplateVehicle.js';
import RealtimeNewActions from '../../../Redux/RealtimeNewRedux'
import { getStatusVehicle } from '../../../Functions/StatusColor'
import { get, isEqual } from 'lodash';

const areas = [{
  country: 'Russia',
  area: 12
}, {
  country: 'Canada',
  area: 7
}, {
  country: 'USA',
  area: 7
}, {
  country: 'China',
  area: 7
}, {
  country: 'Brazil',
  area: 6
}, {
  country: 'Australia',
  area: 5
}, {
  country: 'India',
  area: 2
}, {
  country: 'Others',
  area: 55
}];

class Operationchartvehicle extends React.Component {
  constructor(props) {
    super(props)
    this.calculate = this.calculate.bind(this);
    this.state = {
      data: []
    }
    this.qqqq = 0
    this.lstDriving = []
    this.lstParking = []
    this.lstIdling = []
    this.lstOverspeed = []
    this.lstOffline = []
    this.customizeTooltip = this.customizeTooltip.bind(this)
  }

  componentDidMount() {
    let { vehicles } = this.props
    this.calculate(vehicles)

  }

  shouldComponentUpdate(nextProps, nextState) {
    let { dataUpdate, vehicles, stateMapControl } = this.props

    if (nextProps.vehicles !== vehicles) {
      this.calculate(nextProps.vehicles)
      return false
    }
    // if (nextProps.stateMapControl !== stateMapControl) {
    //   let nw = nextProps.stateMapControl, ld = stateMapControl
    //   if (nw.dashboardEnabled !== ld.dashboardEnabled) {
    //     this.render()
    //   }
    //   return false
    // }
    return true
  }

  calculate(vehicles) {
    let { data } = this.state
    this.lstDriving = []
    this.lstParking = []
    this.lstIdling = []
    this.lstOverspeed = []
    this.lstOffline = []

    for (let i in vehicles) {
      // let status = statusCar(vehicles[i])
      let status = getStatusVehicle(get(vehicles[i], 'gps.image.status')).name
      if (status === 'realtime_4') this.lstOffline.push(vehicles[i].info.vid)
      else if (status === 'realtime_5') this.lstOverspeed.push(vehicles[i].info.vid)
      else if (status === 'realtime_3') this.lstIdling.push(vehicles[i].info.vid)
      else if (status === 'realtime_1') this.lstDriving.push(vehicles[i].info.vid)
      else if (status === 'realtime_2') this.lstParking.push(vehicles[i].info.vid)
    }

    let driving_lb = "Driving"
    let parking_lb = "Ign.OFF"
    let idling_lb = "Idling"
    let offine_lb = "Offline"
    let overspeed_lb = "Over Speed"

    if (this.props.language == "th") {
      driving_lb = "วิ่ง"
      parking_lb = "จอด"
      idling_lb = "จอดไม่ดับเครื่อง"
      offine_lb = "ไม่ส่งข้อมูล"
      overspeed_lb = "ความเร็วเกิดกำหนด"
    }

    let newData = [
      {
        id: 'lstDriving',
        region: driving_lb,
        val: this.lstDriving.length,
        language: this.props.language
      },
      {
        id: 'lstParking',
        region: parking_lb,
        val: this.lstParking.length,
        language: this.props.language
      },
      {
        id: 'lstIdling',
        region: idling_lb,
        val: this.lstIdling.length,
        language: this.props.language
      },
      {
        id: 'lstOverspeed',
        region: overspeed_lb,
        val: this.lstOverspeed.length,
        language: this.props.language
      },
      {
        id: 'lstOffline',
        region: offine_lb,
        val: this.lstOffline.length,
        language: this.props.language
      }
    ]

    if (!isEqual(data, newData)) {
      this.setState({ data: newData })
    } else {

    }
    // this.setState({ data: newData })
  }

  customizePoint(point) {
    // //console.log(point);
    if (point.argument == "Ign.OFF" || point.argument == "จอด") {
      return { color: '#ff3b30' }
    }
    if (point.argument == "Driving" || point.argument == "วิ่ง") {
      return { color: '#57df4e' }
    }
    if (point.argument == "Idling" || point.argument == "จอดไม่ดับเครื่อง") {
      return { color: '#ffcc00' }
    }
    if (point.argument == "Offline" || point.argument == "ไม่ส่งข้อมูล") {
      return { color: '#adadb2' }
    }
    if (point.argument == "Over Speed" || point.argument == "ความเร็วเกิดกำหนด") {
      return { color: '#6600ff' }
    }
    else {
      return { color: '#6600ff' }
    }
  }

  calculateCandle(e) {
    alert("")
    const prices = e.data.map(d => d.price);

    //console.log('prices', prices)

    // if (prices.length) {
    //   return {
    //     date: e.intervalStart,
    //     open: prices[0],
    //     high: Math.max.apply(null, prices),
    //     low: Math.min.apply(null, prices),
    //     close: prices[prices.length - 1]
    //   };
    // }
  }

  toggleVisibility(item) {
    item.isVisible() ? item.hide() : item.show();
  }

  pointClickHandler(arg) {
    let lstClk = this[get(arg, 'target.data.id')]
    // console.log('pointClickHandler', lstClk)
    if (Array.isArray(lstClk)) {
      this.props.setDisplayVehicle(lstClk)
      this.props.setStateReduxRealtime({ activeTabOverlay: "0" })
      window.scroll({ top: 5555, behavior: 'smooth' })
    }

  }

  render() {
    let { stateMapControl } = this.props
    // console.log('dashboardEnabled', stateMapControl.dashboardEnabled)
    if (!stateMapControl.dashboardEnabled) return ''

    // //console.log('render', this.props.chartWeight, this.props.chartHeight)
    return (
      <PieChart
        id="pie"
        dataSource={this.state.data}
        type="doughnut"
        sizeGroup="piesGroup"
        animation={false}
        centerRender={CenterTemplate}
        innerRadius={0.9}
        startAngle={90}
        resolveLabelOverlapping="shift"
        size={{
          height: this.props.chartHeight,
          width: this.props.chartwidth
        }}
        onPointClick={this.pointClickHandler.bind(this)}
        customizePoint={this.customizePoint.bind(this)}
      >
        <Series
          argumentField="region"
        // valueField="area"
        >
          <Label
            position={"inside"}
            visible={true}
            // format="fixedPoint"
            customizeText={this.customizeLabel}
            backgroundColor='none'
          >
            {/* <Connector visible={true} width={1} /> */}
            <Font
              size={14} weight={900} family={'Prompt'} >
            </Font>

          </Label>

          {/* <Label visible={true}
            format="fixedPoint"
            customizeText={this.customizeLabel}
            backgroundColor="none">
            <Connector visible={true}></Connector>
          </Label> */}
        </Series>

        <Legend visible={true}
          horizontalAlignment="center"
          verticalAlignment="bottom"
        >
          {/* <Margin left={45}></Margin> */}
          <Font size={10} family={'Prompt'} ></Font>

        </Legend>
        {/* <Legend horizontalAlignment="center" verticalAlignment="bottom" /> */}
        <Tooltip enabled={true} customizeTooltip={this.customizeTooltip} />

        {/* <Size width={500} /> */}
      </PieChart>
    );
  }

  customizeLabel(e) {
    // //console.log(e)
    if (e.valueText == "0") {
      return
    }
    return ` ${e.valueText}`;
  }

  customizeTooltip(arg) {
    var tooltip
    switch (this.props.language) {
      case 'th':
        tooltip = `${arg.valueText} คัน` + "<br>" + (arg.percent * 100).toFixed(0) + "%"
        break;
      case 'en':
        tooltip = `${arg.valueText} Units` + "<br>" + (arg.percent * 100).toFixed(0) + "%"
        break;
      case 'jp':
        tooltip = `${arg.valueText} Units` + "<br>" + (arg.percent * 100).toFixed(0) + "%"
        break;
    }
    return {
      text: tooltip
    };
  }
}

const mapStateToProps = (state) => ({
  language: state.versatile.language,
  // vehicles: state.realtime.vehicles
  // dataUpdate: state.realtimeNew.dataUpdate,
  vehicles: state.realtimeNew.initialVehiclesData,
  stateMapControl: state.realtimeNew.stateMapControl,
})

const mapDispatchToProps = (dispatch) => ({
  setDisplayVehicle: (listVehicles) => dispatch(RealtimeNewActions.setDisplayVehicle(listVehicles)),
  setStateReduxRealtime: (objStateRudux) => dispatch(RealtimeNewActions.setStateReduxRealtime(objStateRudux))
});

export default connect(mapStateToProps, mapDispatchToProps)(Operationchartvehicle)

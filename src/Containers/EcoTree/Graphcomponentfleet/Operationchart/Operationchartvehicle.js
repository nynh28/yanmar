import React from 'react';
import { connect } from 'react-redux'
import PieChart, {
  Legend,
  Aggregation,
  Series,
  Tooltip,
  Label,
  Font
} from 'devextreme-react/pie-chart';
import CenterTemplate from './CenterTemplateVehicle.js';
import { Margin } from 'devextreme-react/chart';
import { statusCar } from '../../StatusVehicle';
import { isEqual } from 'lodash';

class Operationchartvehicle extends React.Component {
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
    // if (prevProps.vehicles !== this.props.vehicles) {
    //   this.calculate()
    // }

  }

  shouldComponentUpdate(nextProps, nextState) {
    // if(nextProps.vehicles){
    //   this.calculate(vehicles)
    //   if (!isEqual(data, newData)) {
    //     //console.log('newDatanewDatanewData')
    //     this.setState({ data: newData })
    //   }
    // }
    // //console.log('this.props.vehicles', this.props.vehicles)
    if (nextProps.vehicles !== this.props.vehicles) {
      this.calculate()
      return false

    }
    // if (nextState.data !== this.state.data) {
    //   return false
    // }

    return true
  }


  calculate() {
    let { vehicles } = this.props
    let { data } = this.state
    var driving = 0
    var parking = 0
    var idling = 0
    var overspeed = 0
    var offline = 0
    for (let i in vehicles) {
      let status = statusCar(vehicles[i])
      if (status === 'Offine') offline = offline + 1
      if (status === 'Overspeed') overspeed = overspeed + 1
      if (status === 'Idling') idling = idling + 1
      if (status === 'Driving') driving = driving + 1
      if (status === 'Parking') parking = parking + 1

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
        region: driving_lb,
        val: (typeof this.props.driving_time != "undefined") ? this.props.driving_time.percent.toFixed(2) : 0,
        language: this.props.language,
        vehicle_count: this.props.vehicle_count
      }, {
        region: parking_lb,
        val: (typeof this.props.parking_time.percent != "undefined") ? this.props.parking_time.percent.toFixed(2) : 0,
        language: this.props.language,
        vehicle_count: this.props.vehicle_count
      },
      {
        region: idling_lb,
        val: this.props.idling_time.percent.toFixed(2),
        language: this.props.language,
        vehicle_count: this.props.vehicle_count
      },
      {
        region: overspeed_lb,
        val: this.props.overspeed_time.percent.toFixed(2),
        language: this.props.language,
        vehicle_count: this.props.vehicle_count
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

  render() {
    // //console.log('render', this.props.chartWeight, this.props.chartHeight)
    return (
      <div>
        {this.state.data.length > 0 && (
          <PieChart
            id="pie"
            type="doughnut"
            animation={false}
            dataSource={this.state.data}
            resolveLabelOverlapping="shift"
            sizeGroup="piesGroup"
            innerRadius={0.9}
            centerRender={CenterTemplate}
            startAngle={90}
            size={{
              height: this.props.chartHeight,
              width: this.props.chartWeight
            }}
            // adaptiveLayout={{
            //   height: 250,
            //   width: 250
            // }}
            customizePoint={this.customizePoint.bind(this)}
          >
            <Margin bottom={11}></Margin>
            <Series
              argumentField="region"
            >

              <Aggregation
                enabled={true}
                method="custom"
                calculate={this.calculateCandle} />
              <Label
                // radialOffset={-15}
                visible={true}
                position={"inside"}
                format="fixedPoint"
                customizeText={this.customizeLabel}
                backgroundColor='none'
              >

                <Font
                  size={8} weight={900} family={'Prompt'}  >

                </Font>
              </Label>

            </Series>
            <Legend visible={true}
              horizontalAlignment="center"
              verticalAlignment="bottom"
            // markerRender={markerTemplate}
            // markerRender={markerTemplate}
            >

              {/* <Margin left={30} ></Margin> */}
              <Font size={10} family={'Prompt'}  ></Font>
            </Legend>

            <Tooltip enabled={true} customizeTooltip={this.customizeTooltip}>
            </Tooltip>
          </PieChart >
        )
        }

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

  customizeTooltip(arg) {
    // //console.log(arg)
    return {
      // text: `${arg.valueText} Units` + "<br>" + (arg.percent * 100).toFixed(0) + "%"
      text: (arg.percent * 100).toFixed(0) + "%"
    };
  }
}

const mapStateToProps = (state) => ({
  language: state.versatile.language,
  // vehicles: state.realtime.vehicles
})
export default connect(mapStateToProps)(Operationchartvehicle)

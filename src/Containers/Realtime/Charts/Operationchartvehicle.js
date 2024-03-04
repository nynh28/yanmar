import React from 'react';
import { connect } from 'react-redux'
import PieChart, {
  Legend,
  Aggregation,
  Series,
  Tooltip,
  Format,
  Label,
  Font,
  Connector,
  SmallValuesGrouping,
  Border,
  customizePoint,
  Export,
  Size
} from 'devextreme-react/pie-chart';
import CenterTemplate from './CenterTemplateVehicle.js';
import { populationByRegions1 } from './data.js';
import { Margin, PointBorder } from 'devextreme-react/chart';
import markerTemplate from './MarkerTemplate.js';
import { statusCar, statusColor } from '../StatusVehicle.js';
import { t } from '../../../Components/Translation'
import { isEqual } from 'lodash';

class Operationchartvehicle extends React.Component {
  constructor(props) {
    super(props)
    this.calculate = this.calculate.bind(this);
    this.state = {
      data: []
    }
    this.customizeTooltip = this.customizeTooltip.bind(this)
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
      if (status === 'Offline') offline = offline + 1
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
        val: driving,
        language: this.props.language
      }, {
        region: parking_lb,
        val: parking,
        language: this.props.language
      },
      {
        region: offine_lb,
        val: offline,
        language: this.props.language
      },
      {
        region: idling_lb,
        val: idling,
        language: this.props.language
      },
      {
        region: overspeed_lb,
        val: overspeed,
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

              {/* <Aggregation
                enabled={true}
                method="custom"
                calculate={this.calculateCandle}
              /> */}
              <Label
                // radialOffset={-15}
                visible={true}
                position={"inside"}
                format="fixedPoint"
                customizeText={this.customizeLabel}
                backgroundColor='none'
              >

                <Font
                  size={14} weight={900} family={'Prompt'}  >

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
})
export default connect(mapStateToProps)(Operationchartvehicle)

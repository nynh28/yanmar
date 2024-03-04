import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import PlaybackActions from '../../Redux/PlaybackRedux'
import PannelBox from '../../Components/PannelBox'
import { Row, Col } from 'reactstrap'
import './styles/layout.css'
import Footer from './Panels/Footer'
import PanelBox from './Panels/PanelBox'
import Monitor from './Monitor/Monitor'
import moment from 'moment';
import { ENDPOINT_BASE_URL } from '../../Config/app-config';


class Playback extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this.loadDeviceMDVR()
  }

  // componentWillUnmount() {
  //   this.props.setValue("isPlaying", false)
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   let { isPlaying } = this.props

  //   if (nextProps.isPlaying !== isPlaying) {
  //     return false
  //   }

  //   return true
  // }

  async loadDeviceMDVR() {
    this.props.setValue("isLoadingInfo", true)
    var response = await fetch(ENDPOINT_BASE_URL + "fleet/mdvr/device?user_id=" + this.props.dataLogin.userId, {
      // var response = await fetch("https://3tirkucu7j.execute-api.ap-southeast-1.amazonaws.com/prod/prod/fleet/dropdown?user_id=4864&options=MDVR&cust_id=0&fleet_id=0", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    var data = await response.json();

    console.log("loadDeviceMDVR : ", data)

    if (data.message === "ok") {

      let _data = []

      for (let idx in data.result) {
        let dt = data.result[idx]
        dt.name = (dt.vehicle_name !== "" ? dt.vehicle_name : dt.license_plate_no !== "" ? dt.license_plate_no : dt.vin_no) + ""
        _data.push(dt)
      }

      this.props.setValue("listVehicles", _data)
    }
    else {
      this.props.setValue("listVehicles", [])
    }
    this.props.setValue("isLoadingInfo", false)
  }

  setSubRangeData(lst) {
    let newLst = []
    lst.forEach((item) => {
      let { chn, starttime, endtime } = item
      let start = moment(starttime, 'YYYY-MM-DD HH:mm:ss'), end = moment(endtime, 'YYYY-MM-DD HH:mm:ss')
      if (end.diff(start, 'minutes', true) === 0) {
        newLst.push({ chn, starttime, endtime })
      } else {
        let min = end.diff(start, 'minutes')
        // console.log('min', min, end.diff(start, 'minutes', true))
        for (let i = 0; i < min; i++) {
          let obj = { chn, starttime: start.format('YYYY-MM-DD HH:mm:ss') }
          start.add(1, 'm');
          obj.endtime = start.format('YYYY-MM-DD HH:mm:ss')
          newLst.push(obj)
        }
        if (end.diff(start, 'minutes') !== end.diff(start, 'minutes', true))
          newLst.push({ chn, starttime: start.format('YYYY-MM-DD HH:mm:ss'), endtime })
      }
    });
    return newLst
  }

  render() {
    return (
      <Suspense fallback={null}>
        {/* <Row> */}
        <Row style={{ margin: "-8px -8px 0px" }}>
          <Col className="col-left" lg={9} md={9}>
            {/* <Col className="col-left" lg={9} md={9} sm={9}> */}
            <Row className="row-monitor">
              <Col>
                <Monitor />
              </Col>
            </Row>

            <Row className="row-chart">
              <Col>
                <Footer />
              </Col>
            </Row>

          </Col>
          <Col className="col-right" lg={3} md={3}>
            {/* <Col className="col-right" lg={3} md={3} sm={3}> */}
            <PanelBox />
          </Col>
        </Row>

      </Suspense>)
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  isPlaying: state.playback.isPlaying,
});

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(PlaybackActions.setValue(name, value)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Playback)

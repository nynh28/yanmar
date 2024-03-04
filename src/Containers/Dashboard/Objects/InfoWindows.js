import React, { Component } from 'react';
import { connect } from 'react-redux'
import HistoryActions from '../../../Redux/HistoryRedux'
import { InfoWindow } from '@react-google-maps/api'
import Images from '../icons/Images'
import { momentDate, calculateToDuration } from '../../../Functions/DateMoment'
import {
  Link

} from "reactstrap";

import { get } from 'lodash'

const tdStyle1 = {
  border: 'none',
  width: '120px',
  verticalAlign: 'top'
}

const tdStyle2 = {
  border: 'none',
  width: '180px',
  verticalAlign: 'top'
}

class InfoWindows extends Component {
  constructor(props) {
    super(props)
    this.state = {
      positionMarker: null,
      infoMarker: null,
      dataSource: [],
      startdatefocus: false,
      enddatefocus: false,
      selectedDevice: null,
      selectedposition: [],
      reporttype: 1,
      eventmark: false,
      eventmarks: [],
      deviceHistory: [],
      displayOverlayPanel: true,
      serieclick: "",
      displayList: {},
      checkVehicles: {},
      dlt_4hour: 0,
      dlt_8hour: 0,
      dlt_overspeed: 0,
      dlt_unknown: 0,
      dlt_unplug: 0,
      alertSetting: {
        show: true,
        type: 5
      }

    }
    // console.log(this.props)
  }

  componentDidUpdate(prevProps, nextState) {

    if (prevProps.positionMarker !== this.props.positionMarker) {
      if (prevProps.positionMarker !== null) {
        this.setState({ positionMarker: null })
      } else {

        this.setState({ positionMarker: this.props.positionMarker })
      }
    }
    if (nextState.positionMarker !== this.state.positionMarker && this.props.positionMarker !== null) {
      this.setState({ positionMarker: this.props.positionMarker })
    }

  }



  // createLink(lat, lng) {

  //   let linkTo = 'http://maps.google.com/?q=&amp;cbll=14.66326,100.88674&amp;cbp=12,20.09,,0,5&amp;layer=c&amp;hl=en'

  //   return <a href='{linkTo}' target="_blank">Preview &gt;&gt;</a>

  // }
  //

  setInfoWindowEvent(infoMarker) {
    // console.log("setInfoWindowEvent : ", infoMarker)
    let address = get(infoMarker, '[21]', '-') + ' ' +
      get(infoMarker, '[20]', '-') + ' ' +
      get(infoMarker, '[19]', '-')
    let driver = get(infoMarker, '[52]', '-')
    let lat = get(infoMarker, '[2]', '-')
    let lng = get(infoMarker, '[3]', '-')
    let altitude = get(infoMarker, 'gps.altitude', 0) //
    let speed = get(infoMarker, '[4]', 0) == "" ? 0 : get(infoMarker, '[4]', 0)
    let time = momentDate(get(infoMarker, '[0]', '-'))
    let duration = calculateToDuration(get(infoMarker, 'gps.duration', 0)) //
    let fuelCons = get(infoMarker, '[40]', 0)
    let link = 'http://maps.google.com/maps?q=&layer=c&cbll=' + lat + ',' + lng + '&cbp=,' + get(infoMarker, 'gps.course', 0) + ',,,0'
    let images = Images.noImage

    return (
      <table className="table-info-window">
        <tbody>
          <tr>
            <td style={tdStyle1}>
              <small>Address:</small>
            </td>
            <td style={tdStyle2}>
              <small>{address}</small>
            </td>
          </tr>

          <tr>
            <td style={tdStyle1}>
              <small>Geofence name:</small>
            </td>
            <td style={tdStyle2}>
              <small>{"-"}</small>
            </td>
          </tr>

          <tr>
            <td style={tdStyle1}>
              <small>Street view:</small>
            </td>
            <td style={tdStyle2}>
              <small id='test'>
                <a href={link} target="_blank">Preview &gt;&gt;</a>
                {/* <a href='http://maps.google.com/?q=&amp;cbll=14.66326,100.88674&amp;cbp=12,20.09,,0,5&amp;layer=c&amp;hl=en' target="_blank">Preview &gt;&gt;</a> */}
              </small>
            </td>
          </tr>

          <tr>
            <td style={tdStyle1}>
              <small>Driver:</small>
            </td>
            <td style={tdStyle2}>
              <small>{driver}</small>
            </td>
          </tr>

          <tr>
            <td style={tdStyle1}>
              <small>Latitude:</small>
            </td>
            <td style={tdStyle2}>
              <small>{lat}°</small>
            </td>
          </tr>

          <tr>
            <td style={tdStyle1}>
              <small>Longitude:</small>
            </td>
            <td style={tdStyle2}>
              <small>{lng}°</small>
            </td>
          </tr>

          {/* <tr>
            <td style={tdStyle1}>
              <small>Altitude:</small>
            </td>
            <td style={tdStyle2}>
              <small>{altitude} ft</small>
            </td>
          </tr> */}

          <tr>
            <td style={tdStyle1}>
              <small>Speed:</small>
            </td>
            <td style={tdStyle2}>
              <small>{speed} km/h</small>
            </td>
          </tr>

          <tr>
            <td style={tdStyle1}>
              <small>Time:</small>
            </td>
            <td style={tdStyle2}>
              <small>{time}</small>
            </td>
          </tr>

          <tr>
            <td style={tdStyle1}>
              <small>Duration:</small>
            </td>
            <td style={tdStyle2}>
              <small>{duration}</small>
            </td>
          </tr>

          <tr>
            <td style={tdStyle1}>
              <small>Fuel cons:</small>
            </td>
            <td style={tdStyle2}>
              <small>{fuelCons} km/L</small>
            </td>
          </tr>

          <tr>
            <td style={tdStyle1}>
              <small>Images:</small>
            </td>
            <td style={tdStyle2}>
              <img src={images} style={{ minHeight: 60, maxHeight: 60 }} />
            </td>
          </tr>
        </tbody>
      </table>
    )

  }




  setInfoWindowEventChart(infoMarker) {
    console.log("setInfoWindowEventChart : dddddddddddddddddddddddddddddddddddddddddddddddddddddddd", infoMarker)
    let address = get(infoMarker, 'admin_level3_name', '-') + ' ' +
      get(infoMarker, 'admin_level2_name', '-') + ' ' +
      get(infoMarker, 'admin_level1_name', '-')
    let driver = get(infoMarker, 'driver_cards_name', '-')
    let lat = get(infoMarker, 'lat', '-')
    let lng = get(infoMarker, 'lng', '-')
    let altitude = get(infoMarker, 'gps.altitude', 0) //
    let speed = get(infoMarker, 'speed', 0)
    let time = momentDate(get(infoMarker, 'time', '-'))
    let duration = calculateToDuration(get(infoMarker, 'gps.duration', 0)) //
    let fuelCons = get(infoMarker, 'canbus_fuel_cons', 0)
    let link = 'http://maps.google.com/maps?q=&layer=c&cbll=' + lat + ',' + lng + '&cbp=,' + get(infoMarker, 'gps.course', 0) + ',,,0'
    let images = Images.noImage

    return (
      <table className="table-info-window">
        <tbody>
          <tr>
            <td style={tdStyle1}>
              <small>Address:</small>
            </td>
            <td style={tdStyle2}>
              <small>{address}</small>
            </td>
          </tr>

          <tr>
            <td style={tdStyle1}>
              <small>Geofence name:</small>
            </td>
            <td style={tdStyle2}>
              <small>{"-"}</small>
            </td>
          </tr>

          <tr>
            <td style={tdStyle1}>
              <small>Street view:</small>
            </td>
            <td style={tdStyle2}>
              <small id='test'>
                <a href={link} target="_blank">Preview &gt;&gt;</a>
                {/* <a href='http://maps.google.com/?q=&amp;cbll=14.66326,100.88674&amp;cbp=12,20.09,,0,5&amp;layer=c&amp;hl=en' target="_blank">Preview &gt;&gt;</a> */}
              </small>
            </td>
          </tr>

          <tr>
            <td style={tdStyle1}>
              <small>Driver:</small>
            </td>
            <td style={tdStyle2}>
              <small>{driver}</small>
            </td>
          </tr>

          <tr>
            <td style={tdStyle1}>
              <small>Latitude:</small>
            </td>
            <td style={tdStyle2}>
              <small>{lat}°</small>
            </td>
          </tr>

          <tr>
            <td style={tdStyle1}>
              <small>Longitude:</small>
            </td>
            <td style={tdStyle2}>
              <small>{lng}°</small>
            </td>
          </tr>

          {/* <tr>
            <td style={tdStyle1}>
              <small>Altitude:</small>
            </td>
            <td style={tdStyle2}>
              <small>{altitude} ft</small>
            </td>
          </tr> */}

          <tr>
            <td style={tdStyle1}>
              <small>Speed:</small>
            </td>
            <td style={tdStyle2}>
              <small>{speed} km/h</small>
            </td>
          </tr>

          <tr>
            <td style={tdStyle1}>
              <small>Time:</small>
            </td>
            <td style={tdStyle2}>
              <small>{time}</small>
            </td>
          </tr>

          <tr>
            <td style={tdStyle1}>
              <small>Duration:</small>
            </td>
            <td style={tdStyle2}>
              <small>{duration}</small>
            </td>
          </tr>

          <tr>
            <td style={tdStyle1}>
              <small>Fuel cons:</small>
            </td>
            <td style={tdStyle2}>
              <small>{fuelCons} km/L</small>
            </td>
          </tr>

          <tr>
            <td style={tdStyle1}>
              <small>Images:</small>
            </td>
            <td style={tdStyle2}>
              <img src={images} style={{ minHeight: 60, maxHeight: 60 }} />
            </td>
          </tr>
        </tbody>
      </table>
    )

  }

  render() {
    let { positionMarker } = this.state
    let { infoMarker, infoType, mapState } = this.props
    let position
    let anchor

    if (positionMarker !== null) {
      if (positionMarker.lat !== undefined) position = positionMarker
      else anchor = positionMarker
    }
    // console.log("RENDER INFO WINDOW")

    // console.log("ffffffffffffffffff")
    // console.log(infoMarker)
    // console.log("position")
    // console.log(this.props.positionMarker)
    return (

      infoType === 1 ? positionMarker !== null && infoMarker !== null &&
        <InfoWindow
          anchor={anchor}
          onCloseClick={() => this.props.setInfoMarker(null, null)}
          position={position}
        >
          <table className="table-info-window">
            <tbody>
              <tr>
                <td style={tdStyle1}>
                  <small>Address:</small>
                </td>
                <td style={tdStyle2}>
                  <small>x</small>
                </td>
              </tr>

              <tr>
                <td style={tdStyle1}>
                  <small>Geofence name:</small>
                </td>
                <td style={tdStyle2}>
                  <small>{"-"}</small>
                </td>
              </tr>

              <tr>
                <td style={tdStyle1}>
                  <small>Street view:</small>
                </td>
                <td style={tdStyle2}>
                  <small id='test'>

                    {/* <a href='http://maps.google.com/?q=&amp;cbll=14.66326,100.88674&amp;cbp=12,20.09,,0,5&amp;layer=c&amp;hl=en' target="_blank">Preview &gt;&gt;</a> */}
                  </small>
                </td>
              </tr>

              <tr>
                <td style={tdStyle1}>
                  <small>Driver:</small>
                </td>
                <td style={tdStyle2}>
                  <small>x</small>
                </td>
              </tr>

              <tr>
                <td style={tdStyle1}>
                  <small>Latitude:</small>
                </td>
                <td style={tdStyle2}>
                  <small>x</small>
                </td>
              </tr>

              <tr>
                <td style={tdStyle1}>
                  <small>Longitude:</small>
                </td>
                <td style={tdStyle2}>
                  <small>x</small>
                </td>
              </tr>

              {/* <tr>
            <td style={tdStyle1}>
              <small>Altitude:</small>
            </td>
            <td style={tdStyle2}>
              <small>{altitude} ft</small>
            </td>
          </tr> */}

              <tr>
                <td style={tdStyle1}>
                  <small>Speed:</small>
                </td>
                <td style={tdStyle2}>
                  <small>x km/h</small>
                </td>
              </tr>

              <tr>
                <td style={tdStyle1}>
                  <small>Time:</small>
                </td>
                <td style={tdStyle2}>
                  <small>x</small>
                </td>
              </tr>

              <tr>
                <td style={tdStyle1}>
                  <small>Duration:</small>
                </td>
                <td style={tdStyle2}>
                  <small>x</small>
                </td>
              </tr>

              <tr>
                <td style={tdStyle1}>
                  <small>Fuel cons:</small>
                </td>
                <td style={tdStyle2}>
                  <small>x km/L</small>
                </td>
              </tr>

              <tr>
                <td style={tdStyle1}>
                  <small>Images:</small>
                </td>
                <td style={tdStyle2}>

                </td>
              </tr>
            </tbody>
          </table>


        </InfoWindow>
        :
        <InfoWindow

          // anchor={anchor}
          onCloseClick={() => this.props.setInfoMarker(null, null)}
          position={{ lat: this.props.positionMarker.lat, lng: this.props.positionMarker.lng }}
        >
          {this.setInfoWindowEventChart(infoMarker)}
        </InfoWindow>

    )
  }
}

const mapStateToProps = (state) => ({
  // mapState: state.history.mapState
  // infoOpen: state.history.infoOpen
});
const mapDispatchToProps = (dispatch) => ({
  // setInfoOpen: (infoOpen) => dispatch(HistoryActions.setInfoOpen(infoOpen))
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoWindows)

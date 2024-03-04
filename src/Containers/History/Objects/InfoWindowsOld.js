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
  width: '100px',
  verticalAlign: 'top'
}

const tdStyle2 = {
  border: 'none',
  width: '160px',
  verticalAlign: 'top'
}

class InfoWindows extends Component {
  constructor(props) {
    super(props)
    this.state = {
      positionMarker: null

    }
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
    let address = get(infoMarker, '[21]', '-') + ' ' +
      get(infoMarker, '[20]', '-') + ' ' +
      get(infoMarker, '[19]', '-')
    let driver = get(infoMarker, '[52]', '-')
    let lat = get(infoMarker, '[2]', '-')
    let lng = get(infoMarker, '[3]', '-')
    let altitude = get(infoMarker, 'gps.altitude', 0) //
    let speed = get(infoMarker, '[4]', 0)
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

          <tr>
            <td style={tdStyle1}>
              <small>Altitude:</small>
            </td>
            <td style={tdStyle2}>
              <small>{altitude} ft</small>
            </td>
          </tr>

          <tr>
            <td style={tdStyle1}>
              <small>Speed:</small>
            </td>
            <td style={tdStyle2}>
              <small>{speed} kph</small>
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
              <small>{fuelCons}%</small>
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

  setInfoWindowTrip(infoMarker) {
    // console.log(JSON.stringify(infoMarker))

    let topSpeed = get(infoMarker, '[22]', 0)
    let driver = get(infoMarker, 'driver', '-')
    let came = momentDate(get(infoMarker, '[0]', ''))
    let left = momentDate(get(infoMarker, '[1]', ''))
    let routeLength = (get(infoMarker, '[25]', 0) / 1000).toFixed(2)
    let duration = calculateToDuration(get(infoMarker, '[26]', 0))
    let fuelCons = get(infoMarker, 'fuelCons', '-') //
    let images = Images.noImage

    return (
      <table className="table-info-window">
        <tbody>
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
              <small>Came:</small>
            </td>
            <td style={tdStyle2}>
              <small>{came}</small>
            </td>
          </tr>

          <tr>
            <td style={tdStyle1}>
              <small>Left:</small>
            </td>
            <td style={tdStyle2}>
              <small>{left}</small>
            </td>
          </tr>

          <tr>
            <td style={tdStyle1}>
              <small>Top speed:</small>
            </td>
            <td style={tdStyle2}>
              <small>{topSpeed} kph</small>
            </td>
          </tr>

          <tr>
            <td style={tdStyle1}>
              <small>Route length:</small>
            </td>
            <td style={tdStyle2}>
              <small>{routeLength} km</small>
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
              <small>{fuelCons}</small>
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
    let { infoMarker } = this.props
    let position
    let anchor

    if (positionMarker !== null) {
      if (positionMarker.lat !== undefined) position = positionMarker
      else anchor = positionMarker
    }

    console.log(anchor)
    console.log('infoMarker', infoMarker)


    return (positionMarker !== null && infoMarker !== null &&
      <InfoWindow
        anchor={anchor}
        onCloseClick={() => this.props.setInfoMarker(null, null)}
        position={position}
      >
        {infoMarker.length > 27 ? this.setInfoWindowEvent(infoMarker) :
          this.setInfoWindowTrip(infoMarker)
        }

      </InfoWindow>
    )
  }
}

const mapStateToProps = (state) => ({
  // infoMarker: state.history.infoMarker,
  // infoOpen: state.history.infoOpen
});
const mapDispatchToProps = (dispatch) => ({
  // setInfoOpen: (infoOpen) => dispatch(HistoryActions.setInfoOpen(infoOpen))
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoWindows)

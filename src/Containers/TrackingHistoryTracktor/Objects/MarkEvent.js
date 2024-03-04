import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux'
import $ from 'jquery'
import { getEventIconMap } from '../Functions'
import { get } from 'lodash'
import moment from 'moment';
import { calculateToDuration } from '../../../Functions/DateMoment'
import { renderToString } from 'react-dom/server'
import { withRouter } from 'react-router'
const mySuspense = (<Suspense />).type;

const keyEN = ["Geofence Type", "Geofence Name", "Geofence Description", "Subdistrict", "District", "Province", "Hazard", "Share", "Geometry Type"]
const keyTH = ["ชนิดจีโอเฟนซ์", "ชื่อจีโอเฟนซ์", "รายละเอียดจีโอเฟนซ์", "ตำบล/แขวง", "อำเภอ", "จังหวัด", "เขตอันตราย", "ใช้ร่วมกับผู้อื่น", "รูปแบบพื้นที่"]
const keyJA = ["ジオフェンスタイプ", "ジオフェンス名", "ジオフェンスの説明", "区、町", "市、行政区", "県", "危険地帯", "シェア", "形状"]

class MarkEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.markers = []
    this.createPoint = this.createPoint.bind(this);
    this.activeInfoWindow = null

  }

  shouldComponentUpdate(nextProps, nextState) {
    let { eventVisibled } = this.props

    // if (nextProps.eventVisibled !== eventVisibled) {

    // }

    if (nextProps.eventVisibled !== eventVisibled) {
      if (nextProps.eventVisibled) {
        for (let index in this.markers)
          this.markers[index].setVisible(true)
        // this.markers[index].setVisible(this.checkLocationInBound(this.markers[index].position.lat(), this.markers[index].position.lng(), index))
      }
      else {
        for (let index in this.markers) this.markers[index].setVisible(false)
      }
      return false
    }

    return false
  }

  componentDidMount() {
    let { dataTrips, indexTripSelected } = this.props
    let event = [2000, 3, 5, 7, 9, 14, 21, 1001, 1002, 1010, 1011]

    for (let index in indexTripSelected) {
      let dt = dataTrips[indexTripSelected[index]]
      if (event.includes(dt[2])) this.createPoint(dt[2], dt[15], dt[16], dt)
    }
  }

  componentWillUnmount() {
    this.clearMarker()
  }

  createPoint(eventId, lat, lng) {
    const MarkerScale = (url, scale = 40) => {
      if (url) {
        return new window.google.maps.MarkerImage(
          url,
          new window.google.maps.Size(scale, scale), // size
          new window.google.maps.Point(0, 0), // origin
          new window.google.maps.Point(scale / 2, scale / 2),// anchor
          new window.google.maps.Size(scale, scale),// scaledSize
        );
      } else {
        return null
      }
    }

    const marker = new window.google.maps.Marker({
      position: { lat, lng },
      map: this.props.map,
      // icon: {
      //   url: getEventIconMap(eventId),
      //   anchor: { x: 10, y: 10 }
      // },
      icon: MarkerScale(getEventIconMap(eventId)),
      zIndex: 100
    });

    // const infowindow = new window.google.maps.InfoWindow({
    //   content: this.contentString(data),
    // });
    // this.addListenerMarker(marker, infowindow, eventId)

    this.addListenerMarkerNew(marker, { lat, lng })
    this.markers.push(marker)
    // console.log(" this.markers : ", this.markers)
  }

  addListenerMarkerNew(marker, position) {
    // geofenceForm?customer
    // window.open('/#/reportTable/Reportecotree?customer=' + this.state.selected_customer + '&driver=' + JSON.stringify(id) + "&startdate=" + start_date_timestamp + "&enddate=" + end_date_timestamp, '_blank')
    marker.addListener("rightclick", (() => {
      let base_64 = btoa(JSON.stringify(position))
      window.open('/#/geofenceForm?' + base_64, '_blank')
      // window.open('/#/geofenceForm?position=' + JSON.stringify(position), '_blank')
      // this.props.history.push({
      //   pathname: '/geofenceForm',
      //   state: { position }
      // })
    }).bind(this));
  }

  addListenerMarker(marker, infowindow, id) {
    marker.addListener("click", () => {
      if (this.activeInfoWindow) { this.activeInfoWindow.close(); }
      infowindow.open(this.props.map, marker);
      this.activeInfoWindow = infowindow;
    });
  }


  rTT(reactSymbol) {
    try {
      if (reactSymbol.type === mySuspense) reactSymbol = reactSymbol.props.children
      let str = renderToString(reactSymbol)
      str = str.replace('<div data-reactroot="">', '').replace(/<\/div>/g, '')
        .replace('<span data-reactroot="">', '').replace(/<\/span>/g, '').replace(/<!-- -->/g, '')
      return str
    } catch (error) {
      return ""
    }
  }

  // rSpeed() {
  //   [2, 3].includes(data[2]) ?
  //   return ('<tr>' +
  //     '        <td style="' + tdStyle1 + '">' +
  //     '           <small id="lb_realtime_97">' + "Speed:" + '</small>' +
  //     '        </td>' +
  //     '        <td style="' + tdStyle2 + '">' +
  //     '          <small id="lb_speed">' + data[5]   '</small>' +
  //       '        </td>' +
  //       '      </tr>')
  // }

  contentString(data) {
    const tdStyle1 = "border: none; width: 180px;vertical-align: top"
    const tdStyle2 = "border: none; width: 150px;vertical-align: top"
    let dt = []
    this.props.language == "en" ? dt = keyEN : this.props.language == "th" ? dt = keyTH : dt = keyJA

    return '<div>' +
      '<table className="table-info-window">' +
      '  <tbody>' +
      '    <tr>' +
      '       <td style="' + tdStyle1 + '">' +
      '           <small id="lb_realtime_93">' + "Address:" + '</small>' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '          <small id="lb_location">' + data[3] + '</small>' +
      '        </td>' +
      '      </tr>' +

      '      <tr>' +
      '        <td style="' + tdStyle1 + '">' +
      '           <small id="lb_realtime_94">' + "Driver:" + '</small > ' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '          <small id="lb_driverName">' + data[4] + '</small>' +
      '        </td>' +
      '      </tr>' +

      '      <tr>' +
      '        <td style="' + tdStyle1 + '">' +
      '           <small id="lb_realtime_95">' + "Latitude:" + '</small>' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '          <small id="lb_lat">' + data[15] + '</small>' +
      '        </td>' +
      '      </tr>' +

      '      <tr>' +
      '        <td style="' + tdStyle1 + '">' +
      '           <small id="lb_realtime_96">' + "Longitude:" + '</small>' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '          <small id="lb_lng">' + data[16] + '</small>' +
      '        </td>' +
      '      </tr>' +


      '       <tr>' +
      '        <td style="' + tdStyle1 + '">' +
      '           <small id="lb_realtime_97">' + "Speed:" + '</small>' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '          <small id="lb_speed">' + data[5] + '</small>' +
      '        </td>' +
      '      </tr>' +


      // [1, 5, 6, 7, 9, 14, 21, 1001, 1002].includes(data[2]) ? '<tr>' +
      // '        <td style="' + tdStyle1 + '">' +
      // '           <small id="lb_realtime_97">' + "Speed:" + '</small>' +
      // '        </td>' +
      // '        <td style="' + tdStyle2 + '">' +
      // '          <small id="lb_speed">' + data[5] + '</small>' +
      // '        </td>' +
      // '      </tr>' : ''


      '      <tr>' +
      '        <td style="' + tdStyle1 + '">' +
      '           <small id="lb_realtime_98">' + "Time:" + '</small>' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '          <small id="lb_province">' + moment(data[0], 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss') + '</small>' +
      '        </td>' +
      '      </tr>' +

      '      <tr>' +
      '        <td style="' + tdStyle1 + '">' +
      '           <small id="lb_realtime_99">' + "Duration:" + '</small>' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '          <small id="lb_hazard">' + this.rTT(calculateToDuration(get(data, '[8]', 0))) + '</small>' +
      '        </td>' +
      '      </tr>' +

      '      <tr>' +
      '        <td style="' + tdStyle1 + '">' +
      '           <small id="lb_realtime_100">' + "Fuel cons:" + '</small>' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '          <small id="lb_share">' + data[11] + '</small>' +
      '        </td>' +
      '      </tr>' +
      '    </tbody>' +
      '  </table>' +
      '</div>'
  }

  clearMarker() {
    for (let index in this.markers) this.markers[index].setMap(null)
    this.markers.length = 0
  }

  render() {
    // console.log(">> RENDER MARKEVENT <<")
    return ""
  }
}

const mapStateToProps = (state) => ({
  language: state.versatile.language,
  dataTrips: state.trackingHistory.dataTrips,
  indexTripSelected: state.trackingHistory.indexTripSelected,
  eventVisibled: state.trackingHistory.eventVisibled,
});

const mapDispatchToProps = (dispatch) => ({
  // setInfoWindowIndex: (id) => dispatch(SummaryActions.setInfoWindowIndex(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MarkEvent))

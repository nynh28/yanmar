import { isEmpty } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux'

class Tail extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.tails = []
    this.tailActive = []
    this.markers = []
    this.activeInfoWindow = null
  }

  componentWillMount() {
    this.clearTail()
  }

  componentDidMount() {
    let { mapDetail } = this.props
    console.log("mapDetail : ", mapDetail)
    if (!isEmpty(mapDetail)) {
      let relatedGpsLong = mapDetail.related_gps_long.split(";")
      let relatedGpsShort = mapDetail.related_gps_short.split(";")
      let related_alarm = mapDetail.related_alarm
      let gpsLong = [], gpsShort = []

      relatedGpsLong.forEach(item => {
        if (item !== "") {
          gpsLong.push({
            lat: parseFloat(item.split(",")[0]),
            lng: parseFloat(item.split(",")[1])
          })
        }
      })

      relatedGpsShort.forEach(item => {
        if (item !== "") {
          gpsShort.push({
            lat: parseFloat(item.split(",")[0]),
            lng: parseFloat(item.split(",")[1])
          })
        }
      })
      this.createTail(gpsLong, '#0000ff')
      this.createTail(gpsShort, 'red', true)
      this.createPoint(related_alarm)
    }
  }

  createPoint(data) {
    data.forEach(point => {
      const marker = new window.google.maps.Marker({
        position: { lat: point.lat, lng: point.lng },
        map: this.props.map,
        zIndex: point.isCurrent === 1 ? 1 : 0,
        icon: point.isCurrent === 1 ? require('./Icons/red-dot.png') : require('./Icons/blue-dot.png')
      });

      this.markers.push(marker)
      const infowindow = new window.google.maps.InfoWindow({
        content: `<span>${point.alarmType_name}</span>`,
      })

      this.addListenerMarker(marker, infowindow)
    })
  }

  addListenerMarker(marker, infowindow) {
    marker.addListener("mouseover", () => {
      infowindow.open(this.props.map, marker);
      this.activeInfoWindow = infowindow;
    });
    marker.addListener("mouseout", () => {
      if (this.activeInfoWindow) {
        this.activeInfoWindow.close();
      }
      this.activeInfoWindow = infowindow;
    });
  }

  createTail(path, strokeColor, isActive = false) {
    const polyLine = new window.google.maps.Polyline({
      path: path,
      geodesic: true,
      strokeColor,
      strokeOpacity: 0.8,
      strokeWeight: 4,
      fillOpacity: 0.35,
      draggable: false,
      visible: true,
      radius: 30000,
      zIndex: isActive ? 1001 : 1000
    });

    if (isActive) {
      this.tailActive.push(polyLine);
      polyLine.setMap(this.props.map);
    }
    else {
      this.tails.push(polyLine);
      polyLine.setMap(this.props.map);
      this.fitBounds(path)
    }
  }

  clearTail() {
    for (let index in this.tails) this.Points[index].setMap(null)
    for (let index in this.tailActive) this.tails[index].setMap(null)
    for (let index in this.markers) this.markers[index].setMap(null)
    this.tails.length = 0
    this.tailActive.length = 0
    this.markers.length = 0
  }

  fitBounds(tails) {
    if (this.props.map) {
      let bounds = new window.google.maps.LatLngBounds();
      for (let index in tails) {
        bounds.extend({ lat: tails[index].lat, lng: tails[index].lng })
      }
      this.props.map.fitBounds(bounds)
    }
  }

  render() {
    return ""
  }
}

const mapStateToProps = (state) => ({
  mapDetail: state.evidence.mapDetail
});

export default connect(mapStateToProps)(Tail)
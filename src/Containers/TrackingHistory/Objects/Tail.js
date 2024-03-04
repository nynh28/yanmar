import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux'
import $ from 'jquery'
// import { getData, getData2 } from './data'

// const data = getData()
// const data = getData2()

class Tail extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.tails = []
    this.tailActive = []
    this.Points = []
  }

  // componentWillMount() {
  //   let { dataMapPoint } = this.props
  //   if (dataMapPoint.length > 0) {

  //   }
  //   else {

  //   }
  // }

  componentDidMount() {
    let { dataMapPoint } = this.props
    if (dataMapPoint.length > 0) {

    }
    else {

    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { dataMapPoint, tailActive } = this.props

    if (nextProps.dataMapPoint !== dataMapPoint) {
      this.clearPoint()
      let lines = [], lineActive = []
      let data = nextProps.dataMapPoint

      for (let index in data) {
        lines.push({ lat: data[index].lat, lng: data[index].lng })
      }
      this.createTail(lines, "#0000ff", false)
      this.fitBounds(lines)

      if (data.length > 0) {
        this.createPoint(data[0], require('../icons/ic_start_m.png'))
        this.createPoint(data[(data.length - 1)], require('../icons/ic_stop_m.png'))
      }
      return false
    }

    if (nextProps.tailActive !== tailActive) {
      this.clearTailActive()
      this.createTail(nextProps.tailActive, "#66ff33", true)
    }

    return true
  }


  createTail(path, strokeColor, isActive) {
    try {
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
      }
    } catch (error) {

    }
  }

  createPoint(data, icon) {
    try {
      const marker = new window.google.maps.Marker({
        position: { lat: data.lat, lng: data.lng },
        map: this.props.map,
        icon: {
          url: icon,
          // anchor: { x: 5, y: 5 }
        }
      });
      this.addListenerMarkerNew(marker, { lat: data.lat, lng: data.lng })
      this.Points.push(marker)
    } catch (error) {

    }
  }

  addListenerMarkerNew(marker, position) {
    marker.addListener("rightclick", (() => {
      let base_64 = btoa(JSON.stringify(position))
      window.open('/#/geofenceForm?' + base_64, '_blank')
    }).bind(this));
  }

  clearPoint() {
    for (let index in this.Points) this.Points[index].setMap(null)
    for (let index in this.tails) this.tails[index].setMap(null)
    this.Points.length = 0
    this.tails.length = 0
  }

  clearTailActive() {
    for (let index in this.tailActive) this.tailActive[index].setMap(null)
    this.tailActive.length = 0
  }

  // fitBounds(tails) {
  //   if (this.props.map) {
  //     const bounds = new window.google.maps.LatLngBounds();
  //     tails.map(item => {
  //       bounds.extend(item);
  //     });

  //     if (this.props.map.fitBounds) {
  //       this.props.map.fitBounds(bounds);
  //       let northWest = new window.google.maps.LatLng(bounds.getSouthWest().lat(), bounds.getNorthEast().lng());
  //       this.props.map.panTo(northWest);
  //       this.props.map.panBy(100, 10);
  //     }
  //   }
  // }

  fitBounds(tails) {
    try {
      if (this.props.map) {
        let bounds = new window.google.maps.LatLngBounds();
        for (let index in tails) {
          bounds.extend({ lat: tails[index].lat, lng: tails[index].lng })
        }
        this.props.map.fitBounds(bounds)
      }
    } catch (error) {

    }
  }

  render() {
    // console.log(">> RENDER TAIL <<")
    return ""
  }
}

const mapStateToProps = (state) => ({
  dataMapPoint: state.trackingHistory.dataMapPoint,
  indexTripSelected: state.trackingHistory.indexTripSelected,
  tailActive: state.trackingHistory.tailActive,
});

const mapDispatchToProps = (dispatch) => ({
  // setInfoWindowIndex: (id) => dispatch(SummaryActions.setInfoWindowIndex(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tail)

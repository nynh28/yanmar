import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux'
import TrackingHistoryActions from '../../../Redux/TrackingHistoryRedux'
import $ from 'jquery'

let playTourActive = null
let indexTour = 0
class MarkTour extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.markers = []
    this.createPoint = this.createPoint.bind(this);
  }

  componentWillUnmount() {
    indexTour = 0
    clearInterval(playTourActive)
    this.clearMarker()
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { playing, timeTour, dataAllPoint, indexPlaying } = this.props

    if (nextProps.playing !== playing) {
      if (nextProps.playing) {
        setTimeout(() => {
          if (dataAllPoint.length == indexTour) indexTour = 0
          playTourActive = setInterval(this.createPoint, timeTour)
        }, 1000)
      }
      else {
        clearInterval(playTourActive)
      }

      return false
    }

    if (nextProps.indexPlaying !== indexPlaying) {
      if (playing) {
        indexTour = nextProps.indexPlaying
      }
      else {
        indexTour = nextProps.indexPlaying
        this.createPoint()
      }

      return false
    }

    if (nextProps.timeTour !== timeTour) {
      clearInterval(playTourActive)
      if (playing) {
        playTourActive = setInterval(this.createPoint, nextProps.timeTour)
      }
      else {
        indexTour = 0
      }
      return false
    }

    return true
  }

  createPoint() {
    let data = this.props.dataAllPoint
    if (data.length > 0) {
      if (indexTour == data.length) {
        clearInterval(playTourActive)
        this.props.setPlay()
        // indexTour = 0
        return
      }

      let point = data[indexTour]
      let course = parseInt(point.course)

      if (this.markers.length == 0) {
        const marker = new window.google.maps.Marker({
          position: { lat: point.lat, lng: point.lng },
          map: this.props.map,
          icon: {
            url: require('../icons/arrow/arrow_green/arrow_tour-d' + (course % 2 == 0 ? course : (course + 1)) + '.png'),
            anchor: { x: 12.5, y: 12.5 }
          },
          zIndex: 100
        });
        this.markers.push(marker)
        this.markers[0].map.panTo({ lat: point.lat, lng: point.lng })
      }
      else {
        let latLast = this.markers[0].position.lat(), lngLast = this.markers[0].position.lat()
        if (latLast != point.lat && lngLast !== point.lng) {
          this.markers[0].map.panTo({ lat: point.lat, lng: point.lng })
          this.markers[0].setPosition({ lat: point.lat, lng: point.lng })
          this.markers[0].setIcon({
            url: require('../icons/arrow/arrow_green/arrow_tour-d' + (course % 2 == 0 ? course : (course + 1)) + '.png'),
            anchor: { x: 12.5, y: 12.5 }
          })
        }
      }
      this.props.setValue("indexPlaying", indexTour)

      indexTour++
    }
  }

  clearMarker() {
    for (let index in this.markers) this.markers[index].setMap(null)
    this.markers.length = 0
  }

  render() {
    return ""
  }
}

const mapStateToProps = (state) => ({
  dataAllPoint: state.trackingHistory.dataAllPoint,
  playing: state.trackingHistory.playing,
  timeTour: state.trackingHistory.timeTour,
  indexPlaying: state.trackingHistory.indexPlaying,
});

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(TrackingHistoryActions.setValue(name, value)),
  setPlay: () => dispatch(TrackingHistoryActions.setPlay())
});

export default connect(mapStateToProps, mapDispatchToProps)(MarkTour)
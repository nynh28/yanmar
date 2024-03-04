import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux'
import TrackingHistoryActions from '../../../Redux/TrackingHistoryRedux'
import moment from 'moment'
import { withRouter } from 'react-router'
import $ from 'jquery'


class Point extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.Points = []
    this.infowindow = []
    this.PointImage = []
  }

  componentWillMount() {
    let { dataMapPoint } = this.props
    if (dataMapPoint.length > 0) {

    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { eventPercent, objectVisibled, dataMapPoint, imageVisibled, indexImage } = this.props

    if (nextProps.dataMapPoint !== dataMapPoint) {
      this.clearPoint()
      let data = nextProps.dataMapPoint

      for (let index in data) {
        this.createPoint(data[index], index)
      }
    }

    if (nextProps.eventPercent !== eventPercent) {
      return false
    }

    if (nextProps.objectVisibled !== objectVisibled) {
      if (nextProps.objectVisibled) {
        for (let index in this.Points)
          this.Points[index].setVisible(this.checkLocationInBound(this.Points[index].position.lat(), this.Points[index].position.lng(), index))
      }
      else {
        for (let index in this.Points) this.Points[index].setVisible(false)
      }
      return false
    }

    if (nextProps.imageVisibled !== imageVisibled) {
      this.closeWindow(nextProps.imageVisibled)
      return false
    }

    if (nextProps.indexImage !== indexImage) {
      // console.log("indexImage change : ", nextProps.indexImage)
      this.clearPointImage()
      this.createPointImage(nextProps.indexImage)
      return false
    }

    return true
  }

  clearPointImage() {
    for (let index in this.PointImage) this.PointImage[index].setMap(null)
    this.PointImage.length = 0
  }


  createPointImage(data, index) {

    let { map } = this.props
    let course = parseInt(data.course)
    const marker = new window.google.maps.Marker({
      position: { lat: data.lat, lng: data.lng },
      map: map,
      icon: {
        url: require('../icons/arrow/arrow_red/arrow_red-d' + (course % 2 == 0 ? course : (course + 1)) + '.png'),
        anchor: { x: 5, y: 5 }
      },
      visible: true
    });


    const infowindow = new window.google.maps.InfoWindow({
      content: this.contentString(data),
    });

    this.addListenerMarker(marker, infowindow)

    if (this.props.map) {
      this.props.map.panTo({ lat: data.lat, lng: data.lng })
    }


    this.PointImage.push(marker)
  }

  checkLocationInBound(lat, lng, index) {
    if (this.props.map) {
      const bd = this.props.map.getBounds();
      let latlng = new window.google.maps.LatLng(lat, lng);
      try {
        if (bd.contains(latlng) && (index % this.props.eventPercent === 0))
          // point.setVisible(true)
          return true
        else
          // point.setVisible(false)
          return false
      } catch (error) {
        // console.log("checkLocationInBound : ", latlng)
      }
    }
  }

  createPoint(data, index) {
    let { objectVisibled, map, onLoad, eventPercent } = this.props
    // console.log(eventPercent, 'eventPercent', (objectVisibled && (index % eventPercent === 0)))
    // console.log('eventPercent', objectVisibled && (index % eventPercent === 0) ? this.checkLocationInBound(data.lat, data.lng) : false)
    let course = parseInt(data.course)
    let visible = (objectVisibled && (index % eventPercent === 0)) ? this.checkLocationInBound(data.lat, data.lng) : false
    const marker = new window.google.maps.Marker({
      position: { lat: data.lat, lng: data.lng },
      map: map,
      icon: {
        url: require('../icons/arrow/arrow_red/arrow_red-d' + (course % 2 == 0 ? course : (course + 1)) + '.png'),
        anchor: { x: 5, y: 5 }
      },
      // visible: false
      visible: visible
    });

    this.addListenerMarkerNew(marker, { lat: data.lat, lng: data.lng })
    // if (!(objectVisibled && (index % eventPercent === 0))) console.log(index, 'marker', marker)

    // if (data.image.length > 0) {
    //   const infowindow = new window.google.maps.InfoWindow({
    //     content: this.contentString(data),
    //   });
    //   this.addListenerMarker(marker, infowindow, data.image)
    // }

    this.Points.push(marker)
    onLoad(this.Points)
  }

  addListenerMarkerNew(marker, position) {
    marker.addListener("rightclick", (() => {
      let base_64 = btoa(JSON.stringify(position))
      window.open('/#/geofenceForm?' + base_64, '_blank')
      // this.props.history.push({
      //   pathname: '/geofenceForm',
      //   state: {
      //     position,
      //     createGeof: true
      //   }
      // })
    }).bind(this));
  }

  clearPoint() {
    for (let index in this.Points) this.Points[index].setMap(null)
    this.Points.length = 0
  }



  addListenerMarker(marker, infowindow) {
    marker.addListener("click", () => {

      if (this.activeInfoWindow) {
        this.activeInfoWindow.close();
        this.clearPointImage()
      }

      infowindow.open(this.props.map, marker);
      this.activeInfoWindow = infowindow;
    });

    this.infowindow.push(infowindow)

    infowindow.open(this.props.map, marker);
  }

  closeWindow(imageVisibled) {
    // console.log("imageVisibled : ", imageVisibled)
    for (let index in this.infowindow) {
      if (imageVisibled) {
        console.log("OPEN")
        this.infowindow[index].open(this.props.map, this.Points[index])
      }
      else {
        console.log("CLOSE")
        this.infowindow[index].close();
      }

    }
  }

  contentString(data) {

    return '<div style="text-align: center;">' +
      '<div class="row" style="margin: 0px 0px 0px 0px;">' +
      '<div class="col-md-2" style="margin-left: -6px;">' +
      // '<a className="btn btn-option btn-sm"  onclick="' + fnTest("55") + '">' +
      '<a className="btn btn-option btn-sm" >' +
      // '<i class="fa fa-chevron-left" title="previous"></i>' +
      '</a>' +
      '</div>' +

      '<div class="col-md-8">' +
      '<span style="font-size: 14px;"><b>channel : </b>' + data.channel + '</span><br/>' +
      '</div>' +

      '<div class="col-md-2">' +
      '<a className="btn btn-option btn-sm">' +
      // '<i class="fa fa-chevron-right" title="next"></i>' +
      '</a>' +
      '</div>' +

      '</div>' +
      '<img src="' + data.url + '" width="180" height="180"  style="cursor: pointer">' +
      '<div class="row" style="margin: 0px 0px 0px 0px;">' +
      '<span style="font-size: 14px;">' + moment(data.take_photo_time, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss') + '</span>' +
      '</div>' +
      '</div>'
  }

  render() {
    return ""
  }
}

const mapStateToProps = (state) => ({
  dataMapPoint: state.trackingHistory.dataMapPoint,
  eventPercent: state.trackingHistory.eventPercent,
  objectVisibled: state.trackingHistory.objectVisibled,
  indexTripSelected: state.trackingHistory.indexTripSelected,
  imageVisibled: state.trackingHistory.imageVisibled,
  indexImage: state.trackingHistory.indexImage,
});

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(TrackingHistoryActions.setValue(name, value)),

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Point))

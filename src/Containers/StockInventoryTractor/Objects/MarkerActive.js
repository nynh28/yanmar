import React, { Component } from 'react';
import { connect } from 'react-redux'
// import RealtimeActions from '../../../Redux/RealtimeRedux'
import { isEmpty } from 'react-redux-firebase'
import { statusName, statusCarOld } from './StatusVehicle'
import { Marker, InfoWindow, InfoBox } from '@react-google-maps/api'

const { get, isEqual } = require('lodash')


// var numDeltas = 100;
// var delay = 10; //milliseconds
// var i = 0;
// var deltaLat;
// var deltaLng;

class MarkerActive extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arrImgActive: [],
      arrImgActiveRed: [],
      arrImgActiveYellow: [],
      arrImgActiveGreen: [],
      iconActive: [],
      activeColor: "",
      position: {}
    }
  }


  componentDidUpdate(prevProps, nextState) {
    let { information } = this.props




    if (!isEmpty(information)) {
      if (prevProps.information !== information) {
        // if (!isEqual(prevProps.information, information)) {
        let { info } = information
        let truckActive = null
        if (info) {
          truckActive = info.vin_no
        }
        // this.setState({ truckActive, pathHistory: [], activeColor: this.props.activeColor })
        this.fitBounds(information)
        this.setState({ truckActive, pathHistory: [] })
      }

    }


    // if (!isEqual(this.state.position, { lat: information.gps.lat, lng: information.gps.lng })) {
    //   this.setState({ position: { lat: information.gps.lat, lng: information.gps.lng } })
    // }
  }
  fitBounds = (info) => {
    // console.log('fitBounds')
    if (!isEmpty(info)) {
      let bounds = new window.google.maps.LatLngBounds();
      bounds.extend({ lat: get(info, 'gps.lat'), lng: get(info, 'gps.lng') })
      this.props.map.fitBounds(bounds)
    }
  }


  //  transition(result){
  //     i = 0;
  //     deltaLat = (result[0] - position[0])/numDeltas;
  //     deltaLng = (result[1] - position[1])/numDeltas;
  //     this.moveMarker();
  // }

  //  moveMarker(){
  //     position[0] += deltaLat;
  //     position[1] += deltaLng;
  //     var latlng = new google.maps.LatLng(position[0], position[1]);
  //     marker.setTitle("Latitude:"+position[0]+" | Longitude:"+position[1]);
  //     marker.setPosition(latlng);
  //     if(i!=numDeltas){
  //         i++;
  //         setTimeout(moveMarker, delay);
  //     }
  // }

  //  animatedMove(marker, t, current, moveto) {
  //   var lat = current.lat();
  //   var lng = current.lng();

  //   var deltalat = (moveto.lat() - current.lat()) / 100;
  //   var deltalng = (moveto.lng() - current.lng()) / 100;

  //   var delay = 10 * t;
  //   for (var i = 0; i < 100; i++) {
  //     (function(ind) {
  //       setTimeout(
  //         function() {
  //           var lat = marker.position.lat();
  //           var lng = marker.position.lng();
  //           lat += deltalat;
  //           lng += deltalng;
  //           latlng = new google.maps.LatLng(lat, lng);
  //           marker.setPosition(latlng);
  //         }, delay * ind
  //       );
  //     })(i)
  //   }
  // }





  render() {
    let { arrImgActive, arrImgActiveRed, arrImgActiveYellow, arrImgActiveGreen, position } = this.state
    let { enabled, information, infoWindowEnabled, activeStatus, activeClassType, map, iconActive, size, yAxis } = this.props
    // console.log('_______ MarkerActive _______')

    // let obj = iconActive.find(x => x.classType === parseInt(activeClassType) && x.status === activeStatus);
    // let icon = get(obj, 'icon', "")

    let status = statusCarOld(information)

    let obj = iconActive.find(x => x.classType === parseInt(get(information, 'info.class_type', 0)) && x.status === status);
    // let obj = this.state.iconActive.find(x => x.classType === parseInt(get(information, 'info.class_type', 0)) && x.status === status);
    // if (obj === undefined) {
    //   console.log("iconActive object: ", this.props.iconActive)
    //   console.log("ไม่พบไอคอนประเภทรถ > classType : " + parseInt(get(information, 'info.class_type', 0)) + " , status : " + status)
    // }

    let icon = get(obj, 'icon', "")

    // let zoomS = zoom || map.getZoom()

    // // console.log('map.zoom', map.getZoom(), zoom)
    // // console.log(zoomS)

    // let size = zoomS < 10 ? 50 : zoomS < 18 ? 100 : 150
    // let y = zoomS < 10 ? -50 : zoomS < 18 ? -75 : -100

    // console.log("information :", information)



    let _licenseplate = get(information, 'info.licenseplate')
    // if (_licenseplate == "") _licenseplate = get(information, 'info.vehicle_name')
    if (_licenseplate == "") _licenseplate = get(information, 'info.vin_no')

    return (!isEmpty(information) && <Marker
      // key={i}
      icon={icon ? {
        url: `data:image/svg+xml;charset=utf-8,
            ${encodeURIComponent(icon
          .replace('{{width}}', size)
          .replace('{{height}}', size)
          .replace('{{transform}}', `rotate(${information.gps.course})`))}`,
        anchor: { x: size / 2, y: size / 2 },
        labelOrigin: { x: 50, y: 30 }
      } : ''}
      position={{ lat: information.gps.lat, lng: information.gps.lng }}
      title={information.info.licenseplate}
    >
      {/* <InfoBox
        // onLoad={onLoad}
        options={{
          pixelOffset: new window.google.maps.Size(-37.5, yAxis),
          closeBoxURL: "",
          disableAutoPan: false,
          pane: "floatPane",
        }}
        position={{ lat: information.gps.lat, lng: information.gps.lng }}
      >
        <div style={{ padding: 5 }}>

          <span style={{ backgroundColor: 'white', opacity: 0.75, padding: 5 }}><b>{_licenseplate.replace("-", "‑")}</b></span>
        </div>
      </InfoBox> */}

    </Marker>)

  }
}


const mapStateToProps = (state) => ({
  iconActive: state.realtime.iconActive,
  information: state.controlroomdealer.information,
});
const mapDispatchToProps = (dispatch) => ({
  // setActiveMap: (activeMap, activeStatus, activeClassType) => dispatch(RealtimeActions.setActiveMap(activeMap, activeStatus, activeClassType)),
  // setFocusPosition: (lat, lng) => dispatch(RealtimeActions.setFocusPosition(lat, lng))
});


export default connect(mapStateToProps, mapDispatchToProps)(MarkerActive)

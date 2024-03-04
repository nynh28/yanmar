import React, { Component } from 'react';
import { connect } from 'react-redux'
import RealtimeActions from '../../../Redux/RealtimeRedux'
import { isEmpty } from 'react-redux-firebase'
import { statusName, statusCar } from '../StatusVehicle'
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
      iconActive: [],
      activeColor: "",
      position: {}
    }
  }

  componentWillMount() {
    let { iconByClassTypeActive, iconByClassTypeInactived, information, iconActive, iconInactived } = this.props
    // this.setState({
    //   iconActive: iconByClassTypeActive,
    //   position: { lat: information.gps.lat, lng: information.gps.lng }
    // })

    let obj = { lat: information.gps.lat, lng: information.gps.lng }

    if (iconActive.length === 0 || iconInactived.length === 0) {
      obj.iconActive = iconByClassTypeActive
      this.props.setDefaultIconMarker(iconByClassTypeActive, iconByClassTypeInactived)
    }
    else {
      obj.iconActive = iconActive
    }
    this.setState(obj)
  }
  componentDidUpdate(prevProps, nextState) {
    let { information } = this.props
    if (!isEqual(prevProps.information, this.props.information)) {
      let { info } = this.props.information
      let truckActive = null
      if (info) {
        truckActive = info.vin_no
      }
      // this.setState({ truckActive, pathHistory: [], activeColor: this.props.activeColor })
      this.setState({ truckActive, pathHistory: [] })
    }
    if (!isEqual(this.state.position, { lat: information.gps.lat, lng: information.gps.lng })) {
      this.setState({ position: { lat: information.gps.lat, lng: information.gps.lng } })
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
    let { information, zoom, zoomLevel } = this.props

    let status = statusCar(information)

    let obj = this.state.iconActive.find(x => x.classType === parseInt(get(information, 'info.class_type', 0)) && x.status === status);
    let icon = get(obj, 'icon', "")

    let size = zoom < 10 ? 50 : zoom < 18 ? 100 : 150
    let y = zoom < 10 ? -50 : zoom < 18 ? -75 : -100

    console.log(">> RENDER MARKER ACTIVE <<")

    return (<Marker
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
      <InfoBox
        // onLoad={onLoad}
        options={{
          pixelOffset: new window.google.maps.Size(-37.5, y),
          closeBoxURL: "",
          disableAutoPan: false,
          pane: "floatPane",
        }}
        position={{ lat: information.gps.lat, lng: information.gps.lng }}
      >
        <div style={{ backgroundColor: 'white', opacity: 0.75, padding: 5, fontWeight: 'bold' }}>
          {/* {console.log('InfoBox', information.info.licenseplate)} */}
          {information.info.licenseplate.replace("-", "‑")}
        </div>
      </InfoBox>

    </Marker>)

  }
}


const mapStateToProps = (state) => ({
  iconActive: state.realtime.iconActive,
  iconInactived: state.realtime.iconInactived,
  information: state.realtime.information,
  activeMap: state.realtime.activeMap,
  activeStatus: state.realtime.activeStatus,
  activeClassType: state.realtime.activeClassType,
  zoomLevel: state.realtime.zoomLevel,
  iconSize: state.realtime.iconSize,
  sizeY: state.realtime.sizeY,
});
const mapDispatchToProps = (dispatch) => ({
  setActiveMap: (activeMap, activeStatus, activeClassType) => dispatch(RealtimeActions.setActiveMap(activeMap, activeStatus, activeClassType)),
  getInformation: (vid) => dispatch(RealtimeActions.getInformation(vid)),
  setFocusPosition: (lat, lng) => dispatch(RealtimeActions.setFocusPosition(lat, lng)),
  setDefaultIconMarker: (iconActive, iconInactived) => dispatch(RealtimeActions.setDefaultIconMarker(iconActive, iconInactived)),
});


export default connect(mapStateToProps, mapDispatchToProps)(MarkerActive)

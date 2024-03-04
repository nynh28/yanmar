import React, { Component } from 'react';
import { connect } from 'react-redux'
import RealtimeActions from '../../../Redux/RealtimeRedux'
import { statusName, statusCar } from '../StatusVehicle'
import { Marker, MarkerClusterer, InfoBox } from '@react-google-maps/api'
import Images from '../icons/Images'
import MapMarker from './MapMarker';
import moment from 'moment';


const { get, isEqual } = require('lodash')

const options = { closeBoxURL: '', enableEventPropagation: true }

class MarkerCluster extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgRotate: null,
      arrImg: [],
      arrImgActive: [],
      iconInactived: []
    }
  }

  componentDidUpdate(prevProps, nextState) {

    if (prevProps.checkFromDashboard !== this.props.checkFromDashboard) {
      // if (this.Clusterer) {
      //   console.log('Clusterer', this.Clusterer)
      //   let bounds = new window.google.maps.LatLngBounds();
      //   let { markers } = this.Clusterer
      //   for (let i in markers) {
      //     if (markers[i].getVisible()) {
      //       // console.log('markers', markers[i].getPosition())
      //       bounds.extend(markers[i].getPosition());
      //     }
      //   }
      //   this.props.map.fitBounds(bounds);
      //   // this.Clusterer.repaint();
      // }
    }

    if ((prevProps.displayTruck !== this.props.displayTruck || prevProps.enabled !== this.props.enabled) && this.Clusterer) {
      this.Clusterer.repaint();
      if (prevProps.checkFromDashboard !== this.props.checkFromDashboard) {
        let bounds = new window.google.maps.LatLngBounds();
        let { markers } = this.Clusterer
        for (let i in markers) {
          if (markers[i].getVisible()) {
            // console.log('markers', markers[i].getPosition())
            bounds.extend(markers[i].getPosition());
          }
        }
        // console.log('markers', markers)
        this.props.map.fitBounds(bounds);
      }
      // this.Clusterer.repaint();
    }
    // console.log('MarkerCluster:prevProps:', prevProps, moment().format('HH:mm:ss'))

    if (!isEqual(prevProps.information, this.props.information)) {
      let { info } = this.props.information
      let truckActive = null
      if (info) {
        truckActive = info.vid
      }
      this.setState({ truckActive })
    }

    if (prevProps.vehicles !== this.props.vehicles && prevProps.vehicles.length > 0 && this.props.information.gps !== undefined) {
      // if (!isEqual(prevProps.vehicles, this.props.vehicles) && this.props.information.gps !== undefined) {
      let { vehicles, information, activeMap } = this.props
      // let { pathHistory } = this.state

      let dataActive = vehicles.find((item) => item.info.vid === information.info.vid)
      let preVehicles = prevProps.vehicles.find((item) => item.info.vid === information.info.vid)
      if (preVehicles && dataActive && preVehicles.gps.gpsdate !== dataActive.gps.gpsdate) {
        let { lat, lng } = dataActive.gps
        this.props.getInformation(dataActive.info.vid)
      }

    }

  }

  onClickMarker(vid, info) {
    let activeStatus = statusCar(info)
    // console.log('activeStatus', activeStatus)
    // this.props.getInformation(vid, this.props.zoom)
    this.props.getInformation(vid, this.props.zoom, false)
    // this.props.setActiveMap(false, activeStatus, get(info, 'info.class_type', 0))
  }

  render() {
    let { arrImg, arrImgActive, truckActive, iconInactived } = this.state
    let { vehicles, enabled, displayTruck, infoWindowEnabled, size, yAxis } = this.props

    // console.log(' --------------MarkerCluster------------- ')

    // let size = map.getZoom() < 10 ? 50 : map.getZoom() < 18 ? 100 : 150
    // let y = map.getZoom() < 10 ? -50 : map.getZoom() < 18 ? -75 : -100

    let min = enabled ? 5 : vehicles.length + 1

    return (displayTruck && <MarkerClusterer
      ignoreHidden={true}
      minimumClusterSize={min}
      onLoad={Clusterer => {
        this.Clusterer = Clusterer
      }}

      // options={{ imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m" }}
      styles={[{ "url": Images.cluster, height: 53, width: 52, textColor: 'white', textSize: 16 }]}
    >
      {
        (clusterer) => vehicles.map((location, i) => {


          // let status = get(location, 'gps.acc', '') === 't' ? get(location, 'gps.speed', 0) <= 2 ? 'Idling' : 'Driving' : 'Parking'
          let status = statusCar(location)

          let obj = this.props.iconInactived.find(x => x.classType === parseInt(get(location, 'info.class_type', 0)) && x.status === status);

          // console.log("obj : ", obj)
          // if (obj === undefined) {
          //   console.log("iconInactived object: ", this.props.iconInactived)
          //   console.log("ไม่พบไอคอนประเภทรถ > classType : " + parseInt(get(location, 'info.class_type', 0)) + " , status : " + status)
          // }

          // let obj = iconInactived.find(x => x.classType === parseInt(get(location, 'info.class_type', 0)) && x.status === status);
          let icon = get(obj, 'icon', "")

          // console.log(!displayTruck.includes(location.info.vid), location.info.vid === truckActive)
          // console.log((!displayTruck.includes(location.info.vid) || location.info.vid === truckActive))

          return [
            <MapMarker
              key={i}
              icon={icon ? {
                url: `data:image/svg+xml;charset=utf-8,
                          ${encodeURIComponent(icon
                  .replace('{{width}}', size)
                  .replace('{{height}}', size)
                  .replace('{{transform}}', `rotate(${location.gps.course})`))}`,
                anchor: { x: size / 2, y: size / 2 },
                // labelOrigin: { x: size / 2, y: 10 },
              } : ''}
              yAxis={yAxis}
              // visible={(displayTruck.includes(location.info.vid) && location.info.vid !== truckActive)}
              clusterer={clusterer}
              markerData={location}
              infoWindowEnabled={infoWindowEnabled}
              visible={(displayTruck.includes(location.info.vid) && location.info.vid !== truckActive)}
              zoomOnClick={false}
              // position={{ lat: location.gps.lat, lng: location.gps.lng }}


              onClick={() => {
                this.onClickMarker(location.info.vid, location)
              }}
            // title={location.info.licenseplate}

            />
          ]
        })
      }
    </MarkerClusterer>
    )

  }
}


const mapStateToProps = (state) => ({
  iconInactived: state.realtime.iconInactived,
  vehicles: state.realtime.vehicles,
  displayTruck: state.realtime.displayTruck,
  information: state.realtime.information,
  activeMap: state.realtime.activeMap,
  checkFromDashboard: state.realtime.checkFromDashboard
});
const mapDispatchToProps = (dispatch) => ({
  setActiveMap: (activeMap, activeStatus, activeClassType) => dispatch(RealtimeActions.setActiveMap(activeMap, activeStatus, activeClassType)),
  getInformation: (vid, zoom, activeMap) => dispatch(RealtimeActions.getInformation(vid, zoom, activeMap)),
  setFocusPosition: (lat, lng) => dispatch(RealtimeActions.setFocusPosition(lat, lng)),
  setDefaultIconMarker: (iconActive, iconInactived) => dispatch(RealtimeActions.setDefaultIconMarker(iconActive, iconInactived))
});


export default connect(mapStateToProps, mapDispatchToProps)(MarkerCluster)

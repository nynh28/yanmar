import React, { Component } from 'react';
import { connect } from 'react-redux'
import RealtimeActions from '../../../Redux/RealtimeRedux'
import { statusName, statusCar } from '../StatusVehicle'
import { Marker, MarkerClusterer, InfoBox } from '@react-google-maps/api'
import Images from '../icons/Images'
import MapMarker from './MapMarker';
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


  componentWillUnmount() {
    this.props.setStateMapControl("clusterEnabled", this.props.showCluster)
  }

  componentWillMount() {
    // let obj = {
    //   arrImg: this.props.icon,
    //   arrImgActive: this.props.iconActive,
    //   iconInactived: this.props.iconByClassTypeInactived
    // }
    // let vid = get(this.props.information, 'info.vid', null)
    // if (vid) obj.truckActive = vid

    // this.setState(obj)

    let { iconByClassTypeActive, iconByClassTypeInactived, iconActive, iconInactived } = this.props
    let obj = {}
    if (iconActive.length === 0 || iconInactived.length === 0) {
      obj.iconInactived = iconByClassTypeInactived
      this.props.setDefaultIconMarker(iconByClassTypeActive, iconByClassTypeInactived)
    }
    else {
      obj.iconInactived = iconInactived
    }

    let vid = get(this.props.information, 'info.vid', null)
    if (vid) obj.truckActive = vid
    this.setState(obj)
  }

  componentDidUpdate(prevProps, nextState) {
    if (prevProps.focusPosition !== this.props.focusPosition) {
      //#region : set setDefualtMap
      //  this.setDefualtMap(this.props.focusPosition.lat, this.props.focusPosition.lng, 17)
      // this.props.setActiveMap(true)
      //#endregion
    }

    if (prevProps.displayTruck !== this.props.displayTruck || prevProps.showCluster !== this.props.showCluster) {
      if (this.Clusterer) this.Clusterer.repaint();
    }

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
        if (activeMap) {
          this.props.setFocusPosition(lat, lng)
        }
      }

    }

  }

  onClickMarker(vid, info) {
    let activeStatus = statusCar(info)
    console.log('activeStatus', activeStatus)
    // this.props.getInformation(vid, this.props.zoom)
    this.props.getInformation(vid, this.props.zoom, {
      activeMap: false,
      activeStatus,
      activeClassType: get(info, 'info.class_type', 0)
    })
    // this.props.setActiveMap(false, activeStatus, get(info, 'info.class_type', 0))
  }




  render() {
    let { truckActive, iconInactived } = this.state
    let { vehicles, displayTruck, infoWindowEnabled, zoom, showCluster, zoomLevel } = this.props

    console.log(">> RENDER MARKER CLUSTER <<")

    // set Marker Clusterer
    let markerClusterer = []

    if (displayTruck) {
      if (vehicles.length > 0) {
        for (let index in displayTruck) {
          let found = vehicles.filter(x => x.info.vid === displayTruck[index] && x.info.vid !== truckActive)
          if (found !== undefined) markerClusterer.push(...found)
        }
      }
    }

    let size = zoomLevel < 10 ? 50 : zoomLevel < 18 ? 100 : 150
    let y = zoomLevel < 10 ? -50 : zoomLevel < 18 ? -75 : -100
    let min = showCluster ? 2 : vehicles.length + 1

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

          let obj = this.state.iconInactived.find(x => x.classType === parseInt(get(location, 'info.class_type', 0)) && x.status === status);
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
              y={y}
              // visible={(displayTruck.includes(location.info.vid) && location.info.vid !== truckActive)}
              clusterer={clusterer}
              markerData={location}
              infoWindowEnabled={infoWindowEnabled}
              visible={(displayTruck.includes(location.info.vid) && location.info.vid !== truckActive)}

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
  iconActive: state.realtime.iconActive,
  iconInactived: state.realtime.iconInactived,
  vehicles: state.realtime.vehicles,
  displayTruck: state.realtime.displayTruck,
  information: state.realtime.information,
  activeMap: state.realtime.activeMap,
  showCluster: state.realtime.showCluster,
  clusterEnabled: state.realtime.clusterEnabled,
  zoomLevel: state.realtime.zoomLevel,
  iconSize: state.realtime.iconSize,
  sizeY: state.realtime.sizeY,
  // infoWindowEnabled: state.realtime.infoWindowEnabled,
});
const mapDispatchToProps = (dispatch) => ({
  setActiveMap: (activeMap, activeStatus, activeClassType) => dispatch(RealtimeActions.setActiveMap(activeMap, activeStatus, activeClassType)),
  getInformation: (vid, zoom, objActiveMap) => dispatch(RealtimeActions.getInformation(vid, zoom, objActiveMap)),
  setFocusPosition: (lat, lng) => dispatch(RealtimeActions.setFocusPosition(lat, lng)),
  setDefaultIconMarker: (iconActive, iconInactived) => dispatch(RealtimeActions.setDefaultIconMarker(iconActive, iconInactived)),
  setStateMapControl: (name, value) => dispatch(RealtimeActions.setStateMapControl(name, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MarkerCluster)

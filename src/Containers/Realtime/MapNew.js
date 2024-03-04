import React, { Component } from 'react';
import { connect } from 'react-redux'
import RealtimeActions from '../../Redux/RealtimeRedux'
import Amplify, { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';

import { Row } from 'reactstrap'
import Images from './icons/Images'

import { GoogleMap, LoadScript } from '@react-google-maps/api'

import MapControlsCustom from '../../Components/GoogleMap/MapControlsCustom'
import MapControl from '../../Components/GoogleMap/MapControl'
import OverlayPanel from './OverlayPanel';
import FooterInfo from './FooterInfo'
import MarkerCluster from './Objects/MarkerCluster'
import MarkerActive from './Objects/MarkerActive'
import Geofences from './Objects/Geofences'
import Tail from './Objects/Tail'
import VehicleInfoStatus from './VehicleInfoStatus'

import { isEmpty } from 'react-redux-firebase'
// require('@react-google-maps/api/src/utils/isbrowser')

const { get, isEqual } = require('lodash')


var panPath = [];   // An array of points the current panning action will use
var panQueue = [];  // An array of subsequent panTo actions to take
var STEPS = 50;     // The number of steps that each panTo action will undergo

class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedDevice: null,
      selectedposition: [],
      reporttype: 1,
      eventmark: false,
      eventmarks: [],
      infoOpen: false,
      centerDefualt: {
        lat: 13.786377,
        lng: 100.608755
      },
      zoomDefault: 5,
      truckActive: null,
      arrImg: [],
      arrImgActive: [],
      pathHistory: [],
      fitObjectEnabled: false,
      geofencesEnabled: [],
      markerMap: null,
      onDragingStatus: false,
      mapLoad: null,
      infoWindowEnabled: false,
      iconByClassTypeActive: [],
      iconByClassTypeInactived: [],
    }
    this.map = null
  }

  componentWillMount() {
    let { activeMap, zoom, stateMapControl, focusPosition } = this.props

    if (activeMap) {
      this.setState({ fitObjectEnabled: activeMap, zoomDefault: zoom ? zoom : this.state.zoomDefault })
    } else if (!isEmpty(focusPosition)) {

      let centerDefualt = JSON.parse(JSON.stringify(focusPosition));
      this.setState({ zoomDefault: zoom ? zoom : this.state.zoomDefault, centerDefualt })
    }
    if (stateMapControl.geofencesEnabled) this.props.getGeofenceByTypes(stateMapControl.geofencesEnabled)

    // #Get Initial Data
    this.props.getInitialTruckData()
    this.props.getInitialDriverData()

    // if (this.props.iconActive.length === 0 || this.props.iconInactived.length === 0) this.setIconObjectType()
  }

  //#region  Set default icon marker
  setIconObjectType() {
    //#region  ICON ACTIVE
    this.setIconSvg(Images.Green_Actived_1, 1, "Driving", true)
    this.setIconSvg(Images.Grey_Actived_1, 1, "Offline", true)
    this.setIconSvg(Images.Red_Actived_1, 1, "Parking", true)
    this.setIconSvg(Images.Yellow_Actived_1, 1, "Idling", true)
    this.setIconSvg(Images.Purple_Actived_1, 1, "Overspeed", true)
    this.setIconSvg(Images.Grey_Actived_1, 1, "Offine", true)

    this.setIconSvg(Images.Green_Actived_2, 2, "Driving", true)
    this.setIconSvg(Images.Grey_Actived_2, 2, "Offline", true)
    this.setIconSvg(Images.Red_Actived_2, 2, "Parking", true)
    this.setIconSvg(Images.Yellow_Actived_2, 2, "Idling", true)
    this.setIconSvg(Images.Purple_Actived_2, 2, "Overspeed", true)
    this.setIconSvg(Images.Grey_Actived_2, 2, "Offine", true)

    this.setIconSvg(Images.Green_Actived_3, 3, "Driving", true)
    this.setIconSvg(Images.Grey_Actived_3, 3, "Offline", true)
    this.setIconSvg(Images.Red_Actived_3, 3, "Parking", true)
    this.setIconSvg(Images.Yellow_Actived_3, 3, "Idling", true)
    this.setIconSvg(Images.Purple_Actived_3, 3, "Overspeed", true)
    this.setIconSvg(Images.Grey_Actived_3, 3, "Offine", true)

    this.setIconSvg(Images.Green_Actived_4, 4, "Driving", true)
    this.setIconSvg(Images.Grey_Actived_4, 4, "Offline", true)
    this.setIconSvg(Images.Red_Actived_4, 4, "Parking", true)
    this.setIconSvg(Images.Yellow_Actived_4, 4, "Idling", true)
    this.setIconSvg(Images.Purple_Actived_4, 4, "Overspeed", true)
    this.setIconSvg(Images.Grey_Actived_4, 4, "Offine", true)

    this.setIconSvg(Images.Green_Actived_5, 5, "Driving", true)
    this.setIconSvg(Images.Grey_Actived_5, 5, "Offline", true)
    this.setIconSvg(Images.Red_Actived_5, 5, "Parking", true)
    this.setIconSvg(Images.Yellow_Actived_5, 5, "Idling", true)
    this.setIconSvg(Images.Purple_Actived_5, 5, "Overspeed", true)
    this.setIconSvg(Images.Grey_Actived_5, 5, "Offine", true)

    this.setIconSvg(Images.Green_Actived_6, 6, "Driving", true)
    this.setIconSvg(Images.Grey_Actived_6, 6, "Offline", true)
    this.setIconSvg(Images.Red_Actived_6, 6, "Parking", true)
    this.setIconSvg(Images.Yellow_Actived_6, 6, "Idling", true)
    this.setIconSvg(Images.Purple_Actived_6, 6, "Overspeed", true)
    this.setIconSvg(Images.Grey_Actived_6, 6, "Offine", true)

    this.setIconSvg(Images.Green_Actived_0, 0, "Driving", true)
    this.setIconSvg(Images.Grey_Actived_0, 0, "Offline", true)
    this.setIconSvg(Images.Red_Actived_0, 0, "Parking", true)
    this.setIconSvg(Images.Yellow_Actived_0, 0, "Idling", true)
    this.setIconSvg(Images.Purple_Actived_0, 0, "Overspeed", true)
    this.setIconSvg(Images.Grey_Actived_0, 0, "Offine", true)

    //#endregion

    //#region  ICON ACTIVE
    this.setIconSvg(Images.Green_1, 1, "Driving", false)
    this.setIconSvg(Images.Grey_1, 1, "Offline", false)
    this.setIconSvg(Images.Red_1, 1, "Parking", false)
    this.setIconSvg(Images.Yellow_1, 1, "Idling", false)
    this.setIconSvg(Images.Purple_1, 1, "Overspeed", false)
    this.setIconSvg(Images.Grey_1, 1, "Offine", false)

    this.setIconSvg(Images.Green_2, 2, "Driving", false)
    this.setIconSvg(Images.Grey_2, 2, "Offline", false)
    this.setIconSvg(Images.Red_2, 2, "Parking", false)
    this.setIconSvg(Images.Yellow_2, 2, "Idling", false)
    this.setIconSvg(Images.Purple_2, 2, "Overspeed", false)
    this.setIconSvg(Images.Grey_2, 2, "Offine", false)

    this.setIconSvg(Images.Green_3, 3, "Driving", false)
    this.setIconSvg(Images.Grey_3, 3, "Offline", false)
    this.setIconSvg(Images.Red_3, 3, "Parking", false)
    this.setIconSvg(Images.Yellow_3, 3, "Idling", false)
    this.setIconSvg(Images.Purple_3, 3, "Overspeed", false)
    this.setIconSvg(Images.Grey_3, 3, "Offine", false)

    this.setIconSvg(Images.Green_4, 4, "Driving", false)
    this.setIconSvg(Images.Grey_4, 4, "Offline", false)
    this.setIconSvg(Images.Red_4, 4, "Parking", false)
    this.setIconSvg(Images.Yellow_4, 4, "Idling", false)
    this.setIconSvg(Images.Purple_4, 4, "Overspeed", false)
    this.setIconSvg(Images.Grey_4, 4, "Offine", false)

    this.setIconSvg(Images.Green_5, 5, "Driving", false)
    this.setIconSvg(Images.Grey_5, 5, "Offline", false)
    this.setIconSvg(Images.Red_5, 5, "Parking", false)
    this.setIconSvg(Images.Yellow_5, 5, "Idling", false)
    this.setIconSvg(Images.Purple_5, 5, "Overspeed", false)
    this.setIconSvg(Images.Grey_5, 5, "Offine", false)

    this.setIconSvg(Images.Green_6, 6, "Driving", false)
    this.setIconSvg(Images.Grey_6, 6, "Offline", false)
    this.setIconSvg(Images.Red_6, 6, "Parking", false)
    this.setIconSvg(Images.Yellow_6, 6, "Idling", false)
    this.setIconSvg(Images.Purple_6, 6, "Overspeed", false)
    this.setIconSvg(Images.Grey_6, 6, "Offine", false)

    this.setIconSvg(Images.Green_0, 0, "Driving", false)
    this.setIconSvg(Images.Grey_0, 0, "Offline", false)
    this.setIconSvg(Images.Red_0, 0, "Parking", false)
    this.setIconSvg(Images.Yellow_0, 0, "Idling", false)
    this.setIconSvg(Images.Purple_0, 0, "Overspeed", false)
    this.setIconSvg(Images.Grey_0, 0, "Offine", false)
    //#endregion

  }

  setIconSvg(iconByClassType, classType, status, isActive) {
    let { iconByClassTypeActive, iconByClassTypeInactived } = this.state
    fetch(iconByClassType)
      .then(response => response.text())
      .then(text => {
        let svg_ = text;
        svg_ = svg_
          .replace(/^<\?(.+)\?>$/gm, '') // unsupported unnecessary line
          // You can replace anything you want, but first of all check your svg code
          .replace(/width.+\Wheight\S+/,
            'width="{{width}}" height="{{height}}" transform="{{transform}}"')

        // Load Map

        if (isActive)
          iconByClassTypeActive.push({ "classType": classType, "status": status, "icon": svg_ })
        else
          iconByClassTypeInactived.push({ "classType": classType, "status": status, "icon": svg_ })
      })
  }
  //#endregion

  componentDidMount() {

    // return
    // #Subscribe to the MQTT topic
    // let topicConnect = Amplify.PubSub._pluggables[0]._topicObservers.get(this.props.topicRealtime)
    // if (topicConnect === undefined || topicConnect.size === 0) {
    //   // #Subscribe UpdateGPS
    //   Amplify.PubSub.subscribe(this.props.topicRealtime).subscribe({
    //     // next : we successfully received a message and inside data is that messagea,
    //     next: data => this.props.gpsUpdate(data.value),
    //     // error : something went wrong when trying to subscribe to the topic
    //     error: error => console.error(error),
    //     // close : stop subscribing to this topic
    //     close: () => console.log('Done'),
    //   });
    // }


    //#region region FIX BUG: google api is already presented

    // console.log("___________ TEST MAP LOADING  google api is already react________")
    // const cleaningUp = true
    // const isBrowser = typeof document !== "undefined"
    // const isAlreadyLoaded = window.google && window.google.maps && document.querySelector('body.first-hit-completed') // AJAX page loading system is adding this class the first time the app is loaded

    // console.log("isBrowser : ", isBrowser)
    // console.log("isAlreadyLoaded : ", isAlreadyLoaded)

    // if (!isAlreadyLoaded && isBrowser) {
    //   console.log(">> !isAlreadyLoaded && isBrowser <<")
    //   // @ts-ignore
    //   if (window.google && !cleaningUp) {
    //     console.error("google api is already presented")
    //     return
    //   }
    //   // this.isCleaningUp().then(this.injectScript)
    // }
    // if (isAlreadyLoaded) {
    //   console.error("isAlreadyLoaded : ", isAlreadyLoaded)
    //   this.setState({ loaded: true })
    // }
    // console.log("_______________________________________")
    // #endregion
  }

  componentWillUnmount() {
    let subGPSTopic = Amplify.PubSub._pluggables[0]._topicObservers.get(this.props.topicRealtime)
    if (subGPSTopic !== undefined) {
      if (subGPSTopic.size > 0) {
        subGPSTopic.values().next().value._subscription.unsubscribe();
      }
    }
    // let { clusterEnabled, objectEnabled, geofencesEnabled,
    //   infoWindowEnabled, dashboardEnabled, mapType } = this.state

    // let stateMapControl = {
    //   clusterEnabled,
    //   objectEnabled,
    //   geofencesEnabled,
    //   infoWindowEnabled,
    //   mapType
    // }


    // if (dashboardEnabled !== undefined) stateMapControl.dashboardEnabled = dashboardEnabled
    // else stateMapControl.dashboardEnabled = this.props.stateMapControl.dashboardEnabled

    // this.props.setStateReduxRealtime('stateMapControl', stateMapControl)
    this.props.setZoomMap(this.map.zoom)

    if (!this.props.activeMap) {
      let lat = this.map.center.lat()
      let lng = this.map.center.lng()
      this.props.setFocusPosition(lat, lng)
    }

  }

  componentDidUpdate(prevProps, nextState) {
    let { activeMap, focusPosition, zoom } = this.props
    if (activeMap && this.map && !isEmpty(focusPosition)) {
      let lat = Number(this.map.center.lat().toFixed(6))
      let lng = Number(this.map.center.lng().toFixed(6))
      if (!isEqual({ lat, lng }, focusPosition)) {
        console.log('------------------- focusPosition -------------------')
        console.log({ lat, lng })
        console.log({ lat: focusPosition.lat, lng: focusPosition.lng })
        console.log('-----------------------------------------------------')
        // let zoomM = zoom ? zoom : this.map.zoom
        // this.setDefualtMap(focusPosition.lat, focusPosition.lng, zoomM)
        this.panningComponent(focusPosition.lat, focusPosition.lng, zoom)
        this.props.setZoomMap(undefined)
      }
    }

    if (prevProps.activeMap !== this.props.activeMap) {
      this.setState({ fitObjectEnabled: this.props.activeMap })
    }
    // if (prevProps.zoom !== this.props.zoom && this.props.zoom) {
    //   this.map.setZoom(this.props.zoom)
    // }
  }

  panningComponent(lat, lng, zoom) {
    console.log('panTo', { lat, lng })
    if (lat !== undefined && lng !== undefined) this.map.panTo({ lat, lng })
    // if (zoom !== undefined) this.map.setZoom(zoom)
    if (zoom !== undefined) this.smoothZoom(this.map, zoom, this.map.getZoom())

  }

  smoothZoom(map, level, cnt) {
    //alert('Count: ' + cnt + 'and Max: ' + level);
    // let map = this.map
    // console.log('zoom:', cnt, level)

    // If mode is zoom in
    if (this.map) {
      let lat = Number(this.map.center.lat().toFixed(6))
      let lng = Number(this.map.center.lng().toFixed(6))
      // console.log('_____________________________________________________')
      // console.log({ lat, lng })
      // console.log({ lat: this.props.focusPosition.lat, lng: this.props.focusPosition.lng })
      // console.log('_____________________________________________________')
    }

    if (cnt > level) {
      cnt -= 1
      setTimeout(() => {
        map.setZoom(cnt)
        this.smoothZoom(map, level, cnt);
      }, 80);

    } else if (cnt < level) {
      cnt += 1
      setTimeout(() => {
        map.setZoom(cnt)
        this.smoothZoom(map, level, cnt);
      }, 80);
    } else {
      // console.log('zoom:', cnt, level)
      return;
    }
  }

  //#region  MAP CONTROL

  onFitObjectChange(value) {
    if (value) {
      let { information } = this.props
      if (!isEmpty(information)) {
        this.setState({ fitObjectEnabled: value })
        // this.setDefualtMap(this.props.focusPosition.lat, this.props.focusPosition.lng, this.map.zoom)
        this.panningComponent(this.props.focusPosition.lat, this.props.focusPosition.lng, this.map.zoom)
        this.props.setActiveMap(true)
      }
    }
    else {
      this.unFocusMarker()
    }
  }
  unFocusMarker = () => {
    if (this.map !== null) {
      this.props.setActiveMap(false)
    }
  }
  //#endregion

  onZoomChangedLevel() {
    // Set icon size
    // let { zoomLevel, iconSize, sizeY } = this.props
    // let _zoomLevelCurrent = zoomLevel
    // let _iconSize = iconSize
    // let _sizeY = sizeY

    // let zoomChange = get(this.map, 'zoom', this.state.zoomDefault)

    // let size = zoomChange < 10 ? 50 : zoomChange < 18 ? 100 : 150
    // let y = zoomChange < 10 ? -50 : zoomChange < 18 ? -75 : -100

    // if (size !== _iconSize || y !== _sizeY) {
    //   this.setZoomChange(zoomChange)
    //   this.setIconSize(size)
    //   this.setY(y)
    // }
  }

  render() {
    let { iconByClassTypeActive, iconByClassTypeInactived, fitObjectEnabled } = this.state
    let {
      information, dashboardHidden, stateMapControl, setStateMapControl,
      clusterEnabled, objectEnabled, mapType, infoWindowEnabled, dashboardEnabled, vehicleInfoStatusEnabled,
      setShowDashboard, setShowVehicleInfoStatusRealtime, setShowCluster, setZoomChange
    } = this.props
    console.log(">> RENDER LOAD MAP REALTIME <<")
    // console.log("clusterEnabled : ", clusterEnabled)
    // console.log("objectEnabled : ", objectEnabled)
    // console.log("mapType : ", mapType)
    // console.log("infoWindowEnabled : ", infoWindowEnabled)
    // console.log("dashboardEnabled : ", dashboardEnabled)
    // console.log("vehicleInfoStatusEnabled : ", vehicleInfoStatusEnabled)
    console.log("________________________________________")

    return (
      <GoogleMap
        onLoad={map => {
          this.map = map
          this.setState({ mapLoad: map })
        }}
        zoom={this.state.zoomDefault}
        center={this.state.centerDefualt}
        disableDefaultUI={true}
        onDrag={() => { this.unFocusMarker() }}
        mapContainerClassName={"map"}
        id='realtime-map'
        options={{
          zoomControl: true,
          zoomControlOptions: {
            position: 5,
          },
          mapTypeControl: false,
          streetViewControl: true,
          // streetViewControl: false,
          streetViewControlOptions: {
            position: 5,
          },
          rotateControl: false,
          fullscreenControl: false
        }}
        mapContainerStyle={{
          width: '100%',
          height: "calc(93.6vh)",
        }}
        onZoomChanged={() => this.onZoomChangedLevel()}
      >
        {
          this.state.mapLoad !== null &&
          <MapControlsCustom
            position={1}
            map={this.map}
            width="auto"
            clusterEnabled={clusterEnabled}
            objectEnabled={objectEnabled}
            fitObjectEnabled={fitObjectEnabled}
            dashboardEnabled={dashboardEnabled}
            infoWindowEnabled={infoWindowEnabled}
            infoEnabled={vehicleInfoStatusEnabled}
            mapType={mapType}
            geofencesEnabled={stateMapControl.geofencesEnabled}
            dashboardHidden={dashboardHidden || false}
            objectHidden={true}

            onGeofencesChange={value => {
              this.setState({ geofencesEnabled: value })
              this.props.getGeofenceByTypes(value)
            }}

            // onObjectChange={value => this.setState({ objectEnabled: value })}
            onClusterChange={value => setShowCluster(value)}
            onObjectChange={value => setStateMapControl("objectEnabled", value)}
            onMapTypeChange={value => setStateMapControl("mapType", value)}
            onInfoWindowChange={value => setStateMapControl("infoWindowEnabled", value)}
            onDashboardChange={value => setShowDashboard(value)}

            onFitObjectChange={value => this.onFitObjectChange(value)} showVehicleInfoStatus
            onInfoChange={value => setShowVehicleInfoStatusRealtime(value)}
          />
        }


        {
          this.state.mapLoad !== null &&
          <MapControl position={5} map={this.map} id={'Info'} width="auto" >
            <VehicleInfoStatus />
          </MapControl>
        }

        {
          this.state.mapLoad !== null &&
          <MapControl position={7} map={this.map} id={'overlay-panel'}>
            <OverlayPanel />
          </MapControl>
        }

        {
          this.state.mapLoad !== null && !isEmpty(information) &&
          <MapControl position={9} map={this.map} id={'footer-info'}>
            <FooterInfo />
          </MapControl>
        }

        {
          this.state.mapLoad !== null && <MarkerCluster
            iconByClassTypeActive={iconByClassTypeActive}
            iconByClassTypeInactived={iconByClassTypeInactived}
            zoom={get(this.map, 'zoom')} />
        }

        {
          this.state.mapLoad !== null && !isEmpty(information) && <MarkerActive
            iconByClassTypeActive={iconByClassTypeActive}
            iconByClassTypeInactived={iconByClassTypeInactived}
            zoom={get(this.map, 'zoom')} />
        }

        {
          this.state.mapLoad !== null && <Geofences />
        }

        {
          this.state.mapLoad !== null && <Tail />
        }

        {
          document.getElementById("footer-info") !== null &&
          (document.getElementById("footer-info").style.zIndex = 1000000)
        }

      </GoogleMap>
    )
  }
}

const mapStateToProps = (state) => ({
  topicRealtime: state.signin.topicRealtime,
  iconActive: state.realtime.iconActive,
  iconInactived: state.realtime.iconInactived,
  events: state.realtime.events,
  focusPosition: state.realtime.focusPosition,
  information: state.realtime.information,
  activeMap: state.realtime.activeMap,
  zoom: state.realtime.zoom,
  stateMapControl: state.realtime.stateMapControl,
  clusterEnabled: state.realtime.clusterEnabled,
  objectEnabled: state.realtime.objectEnabled,
  mapType: state.realtime.mapType,
  infoWindowEnabled: state.realtime.infoWindowEnabled,
  dashboardEnabled: state.realtime.dashboardEnabled,
  vehicleInfoStatusEnabled: state.realtime.vehicleInfoStatusEnabled,
});

const mapDispatchToProps = (dispatch) => ({
  getInitialTruckData: () => dispatch(RealtimeActions.getInitialTruckData()),
  gpsUpdate: (update) => dispatch(RealtimeActions.gpsUpdate(update)),
  setInformation: (information) => dispatch(RealtimeActions.setInformation(information)),
  setActiveMap: (activeMap) => dispatch(RealtimeActions.setActiveMap(activeMap)),
  setZoomMap: (zoom) => dispatch(RealtimeActions.setZoomMap(zoom)),
  getInitialDriverData: () => dispatch(RealtimeActions.getInitialDriverData()),
  getGeofenceByTypes: (GeofenceTypeIds) => dispatch(RealtimeActions.getGeofenceByTypes(GeofenceTypeIds)),
  setStateReduxRealtime: (name, value) => dispatch(RealtimeActions.setStateReduxRealtime(name, value)),
  setFocusPosition: (lat, lng) => dispatch(RealtimeActions.setFocusPosition(lat, lng)),
  setShowVehicleInfoStatusRealtime: (isShow) => dispatch(RealtimeActions.setShowVehicleInfoStatusRealtime(isShow)),
  setShowDashboard: (isShow) => dispatch(RealtimeActions.setShowDashboard(isShow)),
  setShowCluster: (isShow) => dispatch(RealtimeActions.setShowCluster(isShow)),
  setStateMapControl: (name, value) => dispatch(RealtimeActions.setStateMapControl(name, value)),
  setZoomChange: (zoomLevel) => dispatch(RealtimeActions.setZoomChange(zoomLevel)),
  setIconSize: (size) => dispatch(RealtimeActions.setIconSize(size)),
  setY: (size) => dispatch(RealtimeActions.setY(size)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map)

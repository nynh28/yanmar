import React, { Component } from 'react';
import { connect } from 'react-redux'
import RealtimeActions from '../../Redux/RealtimeRedux'

import { Row } from 'reactstrap'
import Images from './icons/Images'

import { GoogleMap, LoadScript } from '@react-google-maps/api'

import MapControlsCustom from '../../Components/GoogleMap/MapControlsCustom'
import MapControl from '../../Components/GoogleMap/MapControl'
import OverlayPanel from './OverlayPanel';
import FooterInfo from './FooterInfo'

import MarkerCluster from './Objects/MarkerCluster'
import MarkerActive from './Objects/MarkerActive'
// import MarkerCluster from './Objects/MarkerClusterNew'
// import MarkerActive from './Objects/MarkerActiveNew'

import Geofences from './Objects/Geofences'
import Tail from './Objects/Tail'

import { isEmpty } from 'react-redux-firebase'
import moment from 'moment';
import { t } from '../../Components/Translation'
import { getGeoServerUrl } from '../../Config/app-config'
// require('@react-google-maps/api/src/utils/isbrowser')

const { get, isEqual } = require('lodash')


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
      clusterEnabled: true,
      objectEnabled: true,
      fitObjectEnabled: false,
      geofencesEnabled: [],
      infoWindowEnabled: false,
      measureEnabled: false,
      dashboardEnabled: undefined,
      mapType: "roadmap",

      markerMap: null,
      infoEnabled: true,
      onDragingStatus: false,
      mapLoad: null,
      infoWindowEnabled: false,
      iconByClassTypeActive: [],
      iconByClassTypeInactived: [],
      size: 50,
      yAxis: -50
    }
    this.map = null
  }

  handleToggleOpen() {

    this.setState({
      infoOpen: true
    });
  }

  handleToggleClose() {
    this.setState({
      infoOpen: false
    });
  }


  eventMarker(event) {

  }


  componentWillMount() {

    // this.setState({ objectEnabled: true })

    let { activeMap, zoom, stateMapControl, focusPosition } = this.props

    let s = {

      centerDefualt: JSON.parse(JSON.stringify(focusPosition))
    }
    if (zoom) {
      s.zoomDefault = zoom
      if (zoom < 15) {
        s.size = 50
        s.yAxis = -50
      } else if (15 <= zoom && zoom < 18) {
        s.size = 100
        s.yAxis = -75
      } else if (18 <= zoom) {
        s.size = 150
        s.yAxis = -100
      }
    }
    if (activeMap) s.fitObjectEnabled = activeMap

    // console.log('stateMapControl', stateMapControl)
    // if (!isEmpty(stateMapControl)) this.setState(stateMapControl)
    if (stateMapControl && stateMapControl.geofencesEnabled) this.props.getGeofenceByTypes(stateMapControl.geofencesEnabled)
    if (stateMapControl.clusterEnabled !== undefined) s.clusterEnabled = stateMapControl.clusterEnabled


    if (!isEmpty(focusPosition)) this.setState(s)
    // Clear Data in Footer Information. When render page again
    // this.props.setInformation({})

    // #Get Initial Data
    // this.props.getInitialTruckData()
    // this.props.getInitialDriverData()
  }

  componentWillUnmount() {

    let { clusterEnabled, objectEnabled,
      fitObjectEnabled, geofencesEnabled,
      infoWindowEnabled, measureEnabled, dashboardEnabled, mapType } = this.state
    // this.props.setStateReduxRealtime('hideFooter', false)
    let stateMapControl = {
      clusterEnabled,
      objectEnabled,
      geofencesEnabled,
      infoWindowEnabled,
      mapType
      // fitObjectEnabled,
    }


    // if (dashboardEnabled !== undefined) stateMapControl.dashboardEnabled = dashboardEnabled
    // else stateMapControl.dashboardEnabled = this.props.stateMapControl.dashboardEnabled

    this.props.setStateReduxRealtime('stateMapControl', stateMapControl)
    if (this.map) this.props.setZoomMap(this.map.getZoom())

    if (this.map && !this.props.activeMap) {
      let lat = this.map.center.lat()
      let lng = this.map.center.lng()
      this.props.setFocusPosition(lat, lng)
    }

  }

  shouldComponentUpdate(nextProps, nextState) {
    let { activeMap, focusPosition, zoom } = this.props
    if (nextProps.activeMap !== activeMap) {
      if (nextProps.activeMap && !isEmpty(focusPosition)) {
        this.panningComponent(focusPosition.lat, focusPosition.lng, zoom)
      }
      this.setState({ fitObjectEnabled: nextProps.activeMap })
      return false
    }
    return true
  }

  componentDidUpdate(prevProps, nextState) {

    let { activeMap, focusPosition, zoom } = this.props

    if (!isEqual(prevProps.focusPosition, this.props.focusPosition) && activeMap && this.map && !isEmpty(focusPosition)) {
      let lat = Number(this.map.center.lat().toFixed(6))
      let lng = Number(this.map.center.lng().toFixed(6))
      if (!isEqual({ lat, lng }, focusPosition)) {
        // console.log({ lat, lng })
        // console.log({ lat: focusPosition.lat, lng: focusPosition.lng })
        // console.log('-----------------------------------------------------')
        this.panningComponent(focusPosition.lat, focusPosition.lng, zoom)
      }
    }


    // if (prevProps.activeMap !== this.props.activeMap) {
    //   if (activeMap && !isEmpty(focusPosition)) {
    //     this.panningComponent(focusPosition.lat, focusPosition.lng, zoom)
    //   }
    //   this.setState({ fitObjectEnabled: this.props.activeMap })
    // }
    // if (prevProps.zoom !== this.props.zoom && this.props.zoom) {
    //   this.map.setZoom(this.props.zoom)
    // }
  }

  panningComponent(lat, lng, zoom) {
    // if (lat !== undefined && lng !== undefined) this.map.setCenter({ lat, lng })
    if (lat !== undefined && lng !== undefined) {
      // console.log(' ------ panTo in panningComponent ------ ')
      this.map.panTo({ lat, lng })
    }
    // if (zoom !== undefined) this.map.setZoom(zoom)


    // if (zoom !== undefined) this.smoothZoom(this.map, zoom, this.map.getZoom()) 
    if (zoom !== undefined) this.map.setZoom(zoom)  // 22/12/2020 ใช้แบบนี้ไปก่อน


  }

  smoothZoom(map, level, cnt) {
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
      this.props.setZoomMap(undefined)
      return;
    }

  }


  //#region  MAP CONTROL

  onFitObjectChange(value) {
    if (value) {
      if (this.props.focusPosition.lat) {
        this.setState({ fitObjectEnabled: value })
        // this.setDefualtMap(this.props.focusPosition.lat, this.props.focusPosition.lng, this.map.zoom)
        // this.panningComponent(this.props.focusPosition.lat, this.props.focusPosition.lng, this.map.zoom)
        // this.props.setFocusPosition(this.props.focusPosition.lat, this.props.focusPosition.lng)
        this.props.setActiveMap(true)
      }
    }
    else {
      this.unFocusMarker()
    }
  }
  unFocusMarker = () => {
    if (this.map !== null && this.props.activeMap) {
      this.props.setActiveMap(false)
    }
  }
  //#endregion

  // setDefualtMap(lat, lng, zoom) {
  //   this.map.setCenter({ lat, lng })
  //   this.map.setZoom(zoom)
  // }

  setInfo(label, color, icon) {
    return <div className="form-group field field-string" style={{ padding: '2px 5px', marginBottom: 0, fontSize: 12 }}>
      {icon ? <i className="demo-icon icon-credit-card" style={{ color, margin: 0 }}></i> : <i className="fa fa-circle" style={{ color }} />}
      <span style={{ marginLeft: icon ? 2 : 7 }}>{t(label)}</span>
    </div>
  }


  calSizeFormZoom(zoom) {
    let { size } = this.state
    // console.log(zoom, size, this.state.yAxis)
    if (zoom < 15 && size !== 50) {
      // console.log('1')
      this.setState({ size: 50, yAxis: -50 })
    } else if (15 <= zoom && zoom < 18 && size !== 100) {
      // console.log('2')
      this.setState({ size: 100, yAxis: -75 })
    } else if (18 <= zoom && size !== 150) {
      // console.log('3')
      this.setState({ size: 150, yAxis: -100 })
    }
  }

  setCenterAction(e) {
    let { zoomDefault } = this.state
    let { activeMap } = this.props
    // console.log('1.activeMap', activeMap)
    if (this.map) {
      if (zoomDefault) this.calSizeFormZoom(this.map.getZoom())
      // console.log('2.activeMap', activeMap)
      if (activeMap) {
        let lat = this.props.focusPosition.lat
        let lng = this.props.focusPosition.lng
        this.map.panTo({ lat, lng })
      }
    }
  }

  render() {
    let { iconByClassTypeActive, iconByClassTypeInactived, fitObjectEnabled, geofencesEnabled,
      objectEnabled, clusterEnabled, infoWindowEnabled, measureEnabled, dashboardEnabled,
      arrImg, arrImgActive, centerDefualt, zoomDefault, size, yAxis } = this.state
    let { information, dashboardHidden, stateMapControl, activeMap } = this.props

    // console.log('0.activeMap', activeMap)
    return (
      //  <Row>
      //   <LoadScript id="script-loader" googleMapsApiKey={"AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&libraries=geometry"}>
      <GoogleMap
        onLoad={map => {
          this.map = map
          this.setState({ mapLoad: map })
          const google = window.google
          var overlayImageMaps =
            [
              {
                getTileUrl: function (coord, zoom) {
                  return getGeoServerUrl("v_hino_dealer") + '&zoom=' + zoom + '&x=' + coord.x + '&y=' + coord.y + '&format=image/png';
                },
                tileSize: new google.maps.Size(256, 256),
                opacity: 0.7,
                isPng: true
              }
            ];
          var overlayMap = new google.maps.ImageMapType(overlayImageMaps[0]);
          map.overlayMapTypes.setAt(0, overlayMap)
        }}
        zoom={zoomDefault}
        center={centerDefualt}
        disableDefaultUI={true}
        onDrag={() => { this.unFocusMarker() }}
        onZoomChanged={(e) => { this.setCenterAction(e) }}
        // onBoundsChanged={() => console.log('onBoundsChanged')}
        onCenterChanged={() => {
          if (this.map) {
            let lat = this.map.center.lat()
            let lng = this.map.center.lng()
            // console.log('onCenterChanged', lat, lng)
            if ((lat + '').length <= 9) {
              // console.log(' ____ TEST:: UPDATE CHECK PROBLEM CENTER MAP IN MAP ____ ')
              // console.log(lat, lng)
              // console.log('             ______________________________              ')
              // console.log(this.props.focusPosition.lat, this.props.focusPosition.lng)
              // console.log(' _______________________________________________________ ')
            }
          }

        }}
        mapContainerClassName={"map"}
        id='realtime-map'
        options={{
          gestureHandling: 'greedy',
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
          // height: "calc(104.5vh)",


          height: "calc(93.6vh)",


          // height: "calc(100vh - 110px)",
        }}
      >
        {
          this.state.mapLoad !== null &&
          <MapControlsCustom
            position={1}
            map={this.map}
            width="auto"
            clusterEnabled={stateMapControl.clusterEnabled}
            objectEnabled={stateMapControl.objectEnabled}
            fitObjectEnabled={fitObjectEnabled}
            geofencesEnabled={stateMapControl.geofencesEnabled}
            measureEnabled={stateMapControl.measureEnabled}
            dashboardEnabled={stateMapControl.dashboardEnabled}
            infoWindowEnabled={stateMapControl.infoWindowEnabled}
            infoEnabled={stateMapControl.infoEnabled}
            mapType={stateMapControl.mapType}
            dashboardHidden={dashboardHidden || false}
            objectHidden={true}
            onClusterChange={value => this.setState({ clusterEnabled: value })}
            onObjectChange={value => this.setState({ objectEnabled: value })}
            onGeofencesChange={value => {
              this.setState({ geofencesEnabled: value })
              this.props.getGeofenceByTypes(value)
            }}
            onInfoWindowChange={value => this.setState({ infoWindowEnabled: value })}
            onImeasureChange={value => this.setState({ measureEnabled: value })}
            onDashboardChange={value => {
              // this.props.setShowDashboard(value)
              this.setState({ dashboardEnabled: value })
            }}
            onFitObjectChange={value => this.onFitObjectChange(value)}
            onMapTypeChange={value => this.setState({ mapType: value })}
            onDashcboard={value => this.props.onShowDashboard && this.props.onShowDashboard(value)}
            onInfoChange={value => { this.setState({ infoEnabled: value }) }
            }
          />
        }

        {
          this.state.mapLoad !== null && this.state.infoEnabled &&
          <MapControl position={1} map={this.map} id={'Info'} width="auto" >
            <div className='table-tan' style={{
              backgroundColor: '#FFF',
              width: 'auto',
              marginTop: 10,
              boxShadow: 'rgba(0, 0, 0, 0.3) 0px 2px 6px',
              borderRadius: 4,
              marginLeft: -26,
              padding: 10
            }}>
              <table>
                <thead>
                  <tr>
                    <td>{this.setInfo("realtime_1", 'rgb(93, 230, 72)')}</td>
                    <td>{this.setInfo("realtime_2", '#ff3b30')}</td>
                    <td>{this.setInfo("realtime_3", 'rgb(255, 230, 0)')}</td>
                    {/* <td>{this.setInfo("realtime_102", '#545A2C')}</td> */}
                    {/* <td>{this.setInfo("realtime_63", '#f86c8b', true)}</td> */}
                  </tr>
                  <tr>
                    <td>{this.setInfo("realtime_4", '#ADADB2')}</td>
                    <td>{this.setInfo("realtime_5", '#5856d6')}</td>
                    <td>{this.setInfo("realtime_6", '#0272b7')}</td>
                    {/* <td>{this.setInfo("realtime_104", '#733635')}</td> */}
                  </tr>
                  <tr>
                    <td>{this.setInfo("realtime_62", 'rgb(93, 230, 72)', true)}</td>
                    <td>{this.setInfo("realtime_63", '#f86c8b', true)}</td>
                    <td>{this.setInfo("realtime_64", '#cacaca', true)}</td>
                  </tr>
                  <tr>
                    <td>{this.setInfo("realtime_106", '#4F8F00')}</td>
                    <td>{this.setInfo("realtime_107", '#733635')}</td>
                  </tr>
                </thead>
              </table>
            </div>
          </MapControl>
        }

        {
          this.state.mapLoad !== null &&
          <MapControl position={7} map={this.map} id={'overlay-panel'}>
            <OverlayPanel />
          </MapControl>
        }

        {
          this.state.mapLoad !== null &&
          <MapControl position={9} map={this.map} id={'footer-info'}>
            <FooterInfo />
          </MapControl>
        }

        {
          this.state.mapLoad !== null && objectEnabled && <MarkerCluster
            enabled={clusterEnabled}
            // icon={arrImg}
            // iconActive={arrImgActive}
            map={this.map}
            iconByClassTypeActive={iconByClassTypeActive}
            iconByClassTypeInactived={iconByClassTypeInactived}
            infoWindowEnabled={infoWindowEnabled}
            size={size}
            yAxis={yAxis} />
          // zoom={get(this.map, 'getZoom()')} />
        }

        {
          this.state.mapLoad !== null && objectEnabled && <MarkerActive
            size={size}
            yAxis={yAxis}
            enabled={clusterEnabled}
            // iconActive={arrImgActive}
            iconByClassTypeActive={iconByClassTypeActive}
            iconByClassTypeInactived={iconByClassTypeInactived}
            infoWindowEnabled={infoWindowEnabled}
          // zoom={get(this.map, 'getZoom()')}
          />
        }

        {
          this.state.mapLoad !== null && <Geofences />
        }

        {
          this.state.mapLoad !== null &&
          objectEnabled && <Tail />
        }

        {/* {
              this.map !== null &&
              <InfoWindows positionMarker={this.state.positionMarker} infoMarker={this.state.infoMarker} setInfoMarker={(positionMarker, infoMarker) => this.setState({ positionMarker, infoMarker })} />
            } */}

        {/* {
          document.getElementById("footer-info") !== null &&
          (document.getElementById("footer-info").style.zIndex = 1000000)
        } */}

      </GoogleMap>
      //  </LoadScript>
      // </Row >
    )
  }
}

const mapStateToProps = (state) => ({
  focusPosition: state.realtime.focusPosition,
  hideFooter: state.realtime.hideFooter,
  activeMap: state.realtime.activeMap,
  zoom: state.realtime.zoom,
  stateMapControl: state.realtime.stateMapControl,
  // displayTruck: state.realtime.displayTruck,
  // topicRealtime: state.signin.topicRealtime,
});

const mapDispatchToProps = (dispatch) => ({
  getInitialTruckData: () => dispatch(RealtimeActions.getInitialTruckData()),
  gpsUpdate: (update) => dispatch(RealtimeActions.gpsUpdate(update)),
  setInformation: (information) => dispatch(RealtimeActions.setInformation(information)),
  setHideFooter: () => dispatch(RealtimeActions.setHideFooter()),
  setActiveMap: (activeMap) => dispatch(RealtimeActions.setActiveMap(activeMap)),
  setZoomMap: (zoom) => dispatch(RealtimeActions.setZoomMap(zoom)),
  getInitialDriverData: () => dispatch(RealtimeActions.getInitialDriverData()),
  getGeofenceByTypes: (GeofenceTypeIds) => dispatch(RealtimeActions.getGeofenceByTypes(GeofenceTypeIds)),
  setStateReduxRealtime: (name, value) => dispatch(RealtimeActions.setStateReduxRealtime(name, value)),
  setFocusPosition: (lat, lng) => dispatch(RealtimeActions.setFocusPosition(lat, lng)),
  setShowDashboard: (isShow) => dispatch(RealtimeActions.setShowDashboard(isShow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map)

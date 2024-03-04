import React, { Component } from 'react';
import { connect } from 'react-redux'
import HistoryActions from '../../Redux/HistoryRedux'
import RealtimeActions from '../../Redux/RealtimeRedux'

import { Row } from 'reactstrap'
import './Styles/stylesfooter.css'
import './Styles/stylesPrint.css'

import { GoogleMap, LoadScript } from '@react-google-maps/api'

import MapControlsCustom from '../../Components/GoogleMap/MapControlsCustom'
import MapControl from '../../Components/GoogleMap/MapControl'


import OverlayPanel from './OverlayPanel';
import FooterInfo from './Footer/FooterInfo'
import Tail from './Objects/Tail'
import Markers from './Objects/Markers'
import InfoWindows from './Objects/InfoWindows'
import VehicleInfoStatus from './VehicleInfoStatus'
import Geofences from './Objects/Geofences'

// import OverlayPanel from './OverlayPanelNew';
// import FooterInfo from './FooterNew/FooterInfo'
// import Tail from './Objects/TailNew'
// import Markers from './Objects/MarkersNew'

import MarkTour from './Objects/MarkTour'
import MarkInteractiveChart from './Objects/MarkInteractiveChart'
import MapPrint from './Template/MapPrint'
import Alert from '../../Components/Alert'
import { getGeoServerUrl } from '../../Config/app-config'
import { get } from 'lodash'


class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alertSetting: {
        show: false,
        type: 5,
        content: "",
        ErrorSubcode: 0
      },
      imgRotate: null,
      tabsVehicle_Usage: true,
      tabsRPM: false,
      tabsSpeed: false,
      tabsAVG_Speed: false,
      tabsIdliling: false,
      tabsBreak: false,
      tabsFuel_Usages: false,
      selectedDevice: null,
      selectedposition: [],
      reporttype: 1,
      eventmark: false,
      eventmarks: [],
      centerDefault: { lat: 13.786377, lng: 100.608755 },
      zoomDefault: 5,
      pathHistory: [
        { lat: 13.785311, lng: 100.610665 },
        { lat: 13.785678, lng: 100.610062 },
        { lat: 13.785917, lng: 100.609586 },
        { lat: 13.785525, lng: 100.608790 },
        { lat: 13.784998, lng: 100.608613 },
        { lat: 13.784362, lng: 100.608456 },
        { lat: 13.780832, lng: 100.607882 },
        { lat: 13.779700, lng: 100.607682 },
        { lat: 13.779581, lng: 100.608088 },
        { lat: 13.779890, lng: 100.608765 }
      ],
      selectedPlace: null,
      markerMap: [],
      positionMarker: null,
      infoType: 1,
      mapLoad: null,
      mapLoadPrint: null,
      vid: null,
      showMarkerTest: false,
      // tails: [],
      markers: [],
      imgData: null,
      printMap: false,
      infoMarker: null,
      objectEnabled: false,
      displayOverlayPanel: true
    }
    this.map = null
  }



  componentWillUnmount() {
    // this.props.setDataAllPoint()
  }


  componentDidUpdate(prevProps, nextState) {
    if (prevProps.focusLocation !== this.props.focusLocation) {
      this.setDefualtMap(this.props.focusLocation.lat, this.props.focusLocation.lng, 17)
    }
    if (nextState.printMap !== this.state.printMap) {
      this.setAlertSetting(this.state.printMap, 5)
    }
  }

  setDefualtMap(lat, lng, zoom) {
    this.map.setCenter({ lat, lng })
    this.map.setZoom(zoom)
  }

  setAlertSetting(isShow, type, content = "", ErrorSubcode) {
    let { alertSetting } = this.state
    alertSetting.show = isShow
    alertSetting.type = type
    alertSetting.content = content
    alertSetting.ErrorSubcode = ErrorSubcode
    this.setState({ alertSetting })
  }


  render() {
    let { centerCookie, zoomCookie } = this.props
    let { centerDefault, printMap, objectEnabled, alertSetting, displayOverlayPanel } = this.state
    // console.log(">> RENDER MAP <<")

    return (
      <Row>
        <Alert
          setting={alertSetting}
          onConfirm={() => {
            if (alertSetting.type === 4) {
              alertSetting.show = false
            }
            else {
              alertSetting.show = false
            }
            this.setState({ alertSetting })
          }}
          onCancel={() => {
            alertSetting.show = false
            this.setState({ alertSetting })
          }}
        />
        <GoogleMap
          onLoad={map => {
            if (centerCookie) {
              map.setCenter(centerCookie)
              map.setZoom(zoomCookie)
            }
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
          mapContainerClassName={'map-containerTest'}
          zoom={this.state.zoomDefault}
          disableDefaultUI={true}
          center={centerDefault}
          options={{
            gestureHandling: 'greedy',
            zoomControl: true,
            zoomControlOptions: {
              position: 5,
            },
            mapTypeControl: false,
            streetViewControl: true,
            streetViewControlOptions: {
              position: 5,
            },
            rotateControl: false,
            fullscreenControl: false

          }}
          id='maphistory'
          mapContainerStyle={{
            width: '100%',
            // height: "calc(135vh - 61px)",
            height: "calc(150vh - 61px)",
          }}
        >
          {
            this.state.mapLoad !== null &&
            <MapControlsCustom
              position={1}
              width="auto"
              map={this.map}
              clusterHidden={true}
              fitObjectHidden={true}
              licensePlateHidden={true}
              // geofencesrHidden={true}
              infoWindowEnabled={this.props.showVehicleInfoStatus}
              objectEnabled={objectEnabled}
              btnObjectActive={false}
              onObjectChange={value => {
                this.props.setShowObject(value)
                this.props.setMapState(null, null, 1)
              }}
              onGeofencesChange={value => {
                this.props.getGeofenceByTypes(value)
              }}
              onInfoChange={value => this.props.setShowVehicleInfoStatus(value)}
            />
          }

          {
            this.state.mapLoad !== null &&
            <MapControl position={1} map={this.map} id={'Info'} width="auto">
              <VehicleInfoStatus />
            </MapControl>
          }

          {
            this.map !== null &&
            <MapControl position={7} map={this.map} id={'overlay-panel'}>
              <OverlayPanel
                imgData={this.state.imgData}
                printMap={printMap}
                setPrint={(printMap) => { this.setState({ printMap }) }}
              ></OverlayPanel>
            </MapControl>
          }

          {
            this.state.mapLoad !== null && <Tail map={this.state.mapLoad} />
          }

          {
            this.map !== null &&
            <Markers
              zoom={this.map.zoom}
              isPrint={false}
            />
          }

          {
            this.map !== null &&
            <InfoWindows
              positionMarker={this.state.positionMarker}
              infoMarker={this.state.infoMarker}
              infoType={this.state.infoType}
            />
          }

          {
            this.state.mapLoad !== undefined &&
            <MarkTour action={'play/pause/stop'} speed={1} map={this.map} />
          }

          {
            this.state.mapLoad !== undefined &&
            <MarkInteractiveChart map={this.map} />
          }

          {
            this.state.mapLoad !== null &&
            <MapControl position={9} map={this.map} id={'footer-info-history'}>
              <FooterInfo
                setInfoMarker={(positionMarker, infoMarker) => {
                  this.map.panTo({ lat: infoMarker.lat, lng: infoMarker.lng })
                  this.map.setZoom(15)
                }} />
            </MapControl>
          }


          {
            this.state.mapLoad !== null && <Geofences />
          }

        </GoogleMap>

        <div style={{ overflow: 'hidden', height: 0 }}>
          <MapPrint printMap={printMap} />
        </div>
      </Row >
    )
  }
}

const mapStateToProps = (state) => ({
  focusLocation: state.history.focusLocation,
  dataHistory: state.history.dataHistory,
  showVehicleInfoStatus: state.history.showVehicleInfoStatus,
  zoomCookie: state.history.zoomCookie,
  centerCookie: state.history.centerCookie
});
const mapDispatchToProps = (dispatch) => ({
  setDataAllPoint: () => dispatch(HistoryActions.setDataAllPoint()),
  setShowVehicleInfoStatus: (isShow) => dispatch(HistoryActions.setShowVehicleInfoStatus(isShow)),
  setShowObject: (isShow) => dispatch(HistoryActions.setShowObject(isShow)),
  setMapState: (positionMarker, infoMarker, infoType) => dispatch(HistoryActions.setMapState(positionMarker, infoMarker, infoType)),
  getGeofenceByTypes: (GeofenceTypeIds) => dispatch(RealtimeActions.getGeofenceByTypes(GeofenceTypeIds))
});


export default connect(mapStateToProps, mapDispatchToProps)(Map)

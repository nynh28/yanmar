import React, { Component } from 'react';
import { connect } from 'react-redux'
import RealtimeActions from '../../Redux/RealtimeRedux'
import Amplify, { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';

import { Row, Input } from 'reactstrap'
import '../Realtime/Map.css';
// import Images from '../Realtime/icons/Images'

<<<<<<< HEAD
import { GoogleMap, LoadScript, Autocomplete, StandaloneSearchBox, LoadScriptNext } from '@react-google-maps/api'
=======
import { GoogleMap, LoadScriptNext, Autocomplete, StandaloneSearchBox } from '@react-google-maps/api'
>>>>>>> develop
import MapControlsCustom from '../../Components/GoogleMap/MapControlsCustom'
import MapControl from '../../Components/GoogleMap/MapControl'
// import OverlayPanel from '../Realtime/OverlayPanel';
// import FooterInfo from '../Realtime/FooterInfo'
import MarkerCluster from '../Realtime/Objects/MarkerCluster'
import Geofences from '../Realtime/Objects/Geofences'
import Tail from '../Realtime/Objects/Tail'
import SearchPanel from './SearchPanel'

import { isEmpty } from 'react-redux-firebase'

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
      GeofencesEnabled: false,
      markerMap: null,
      infoEnabled: true,
      onDragingStatus: false

    }
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

    this.setState({ objectEnabled: true })

    // Clear Data in Footer Information. When render page again
    this.props.setInformation({})

    // #Get Initial Data
    this.props.getInitialTruckData()

    // Get SVG
    // let { arrImg, arrImgActive } = this.state
    // let icon = [
    //   Images.carIcon1,
    //   Images.carIcon2,
    //   Images.carIcon3,
    //   Images.carIcon4,
    //   Images.carIcon5,
    //   Images.carIcon6
    // ]
    // for (let i in icon) {
    //   fetch(icon[i])
    //     .then(response => response.text())
    //     .then(text => {
    //       let svg_ = text;
    //       svg_ = svg_
    //         .replace(/^<\?(.+)\?>$/gm, '') // unsupported unnecessary line
    //         // You can replace anything you want, but first of all check your svg code
    //         .replace(/width.+\Wheight\S+/,
    //           'width="{{width}}" height="{{height}}" transform="{{transform}}"')

    //       // Load Map
    //       arrImg.push(svg_)
    //     })
    // }
    // let iconActive = [
    //   Images.activedCarIcon1,
    //   Images.activedCarIcon2,
    //   Images.activedCarIcon3,
    //   Images.activedCarIcon4,
    //   Images.activedCarIcon5,
    //   Images.activedCarIcon6
    // ]
    // for (let i in iconActive) {
    //   fetch(iconActive[i])
    //     .then(response => response.text())
    //     .then(text => {
    //       let svg_ = text;
    //       svg_ = svg_
    //         .replace(/^<\?(.+)\?>$/gm, '') // unsupported unnecessary line
    //         // You can replace anything you want, but first of all check your svg code
    //         .replace(/width.+\Wheight\S+/,
    //           'width="{{width}}" height="{{height}}" transform="{{transform}}"')

    //       // Load Map
    //       arrImgActive.push(svg_)
    //     })
    // }
  }

  componentDidUpdate(prevProps, nextState) {
    if (prevProps.focusPosition !== this.props.focusPosition) {
      this.setDefualtMap(this.props.focusPosition.lat, this.props.focusPosition.lng, 17)
      this.props.setActiveMap(true)

      if (!this.state.fitObjectEnabled) this.setState({ fitObjectEnabled: true })


    }
    if (prevProps.activeMap !== this.props.activeMap) {
      this.setState({ fitObjectEnabled: this.props.activeMap })
    }
  }

  componentDidMount() {

    // // #Subscribe to the MQTT topic
    // let topicConnect = Amplify.PubSub._pluggables[0]._topicObservers.get(this.props.topicRealtime)
    // if (topicConnect === undefined) {
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
  }


  unFocusMarker = () => {
    if (this.map !== undefined) {
      this.props.setActiveMap(false)
    }
  }

  //#region  MAP CONTROL

  onFitObjectChange(value) {
    if (value) {
      let { information } = this.props
      if (!isEmpty(information)) {
        this.setDefualtMap(this.props.focusPosition.lat, this.props.focusPosition.lng, this.map.zoom)
        this.props.setActiveMap(true)
      }
    }
    else {
      this.unFocusMarker()
    }
  }

  //#endregion

  setDefualtMap(lat, lng, zoom) {
    this.map.setCenter({ lat, lng })
    this.map.setZoom(zoom)
  }

  render() {
    let { fitObjectEnabled, GeofencesEnabled, objectEnabled, clusterEnabled, arrImg, arrImgActive } = this.state
    let { hideFooter, places } = this.props

    return (
      <Row>
        <LoadScriptNext id="script-loader" places={() => console.log(places)} googleMapsApiKey={"AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&libraries=geometry"}>
          <GoogleMap
            onLoad={map => { this.map = map }}
            zoom={this.state.zoomDefault}
            center={this.state.centerDefualt}
            disableDefaultUI={true}
            onDrag={() => { this.unFocusMarker() }}
            onZoomChanged={() => this.unFocusMarker()}
            mapContainerClassName={"map"}
            id='realtime-map'
            options={{
              zoomControl: false,
              mapTypeControl: false,
              streetViewControl: false,
              rotateControl: false,
              fullscreenControl: false
            }}

            mapContainerStyle={{
              width: '100%',
              height: window.innerHeight - 241,
            }}
          >

            {
              this.map !== undefined &&
              <MapControlsCustom
                position={1}
                map={this.map}
                fitObjectEnabled={fitObjectEnabled}
                onClusterChange={value => this.setState({ clusterEnabled: value })}
                onObjectChange={value => this.setState({ objectEnabled: value })}
                onGeofencesChange={value => this.setState({ GeofencesEnabled: value })}
                onFitObjectChange={value => {
                  this.setState({ fitObjectEnabled: value })
                  this.onFitObjectChange(value)
                }}
              />
            }

            {/* {
              this.map !== undefined &&
              <MapControl position={7} map={this.map} id={'overlay-panel'}>
                <OverlayPanel />
              </MapControl>
            }

            {
              this.map !== undefined &&
              <MapControl position={9} map={this.map} id={'footer-info'}>
                <FooterInfo />
              </MapControl>
            } */}

            {
              // this.props.route === true ?
              this.map !== undefined &&
              <MapControl position={8} map={this.map} id={'search-panel'}>
                <div className="" style={{
                  position: 'absolute',
                  zIndex: '1',
                  height: '450px',

                  top: '15px',
                  right: '0px',
                  flexDirection: 'row', display: 'flex'

                }}>

                  <div style={{ padding: 5 }}>
                    Origin
                      <StandaloneSearchBox>
                      <Input type="text" placeholder="start point" style={{
                        boxSizing: `border-box`,
                        border: `1px solid transparent`,
                        width: `240px`,
                        height: `32px`,
                        padding: `0 12px`,
                        borderRadius: `3px`,
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                        fontSize: `14px`,
                        outline: `none`,
                        textOverflow: `ellipses`,
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                      }} />
                    </StandaloneSearchBox>
                    {/* <OriginBox/> */}
                    {/* <Input placeholder="start point" onKeyUp={(e) => this.search(e.target.value)} className="search-message-box" style={{ marginBottom: 0 }} /> */}
                  </div>
                  {/* <div style={{ padding: 5 }}>
                      Destination
                      <StandaloneSearchBox>
                        <Input type="text" placeholder="destination" className="search-message-box" style={{ marginBottom: 0 }} />
                      </StandaloneSearchBox>
                  </div> */}


                </div>

              </MapControl>
              // : <div></div>
            }

            {
              objectEnabled && <MarkerCluster enabled={clusterEnabled} icon={arrImg} iconActive={arrImgActive} />
            }

            {
              this.map !== undefined && <Geofences enabled={GeofencesEnabled} />
            }

            {
              this.map !== undefined &&
              this.state.objectEnabled && <Tail />
            }

            {
              document.getElementById("footer-info") !== null &&
              (hideFooter === true ?
                document.getElementById("footer-info").style.zIndex = 1000000 :
                document.getElementById("footer-info").style.zIndex = 999999
              )
            }

          </GoogleMap>
        </LoadScriptNext>
      </Row >
    )
  }
}

const mapStateToProps = (state) => ({
  events: state.realtime.events,
  focusPosition: state.realtime.focusPosition,
  information: state.realtime.information,
  hideFooter: state.realtime.hideFooter,
  activeMap: state.realtime.activeMap,
  topicRealtime: state.signin.topicRealtime,
});
const mapDispatchToProps = (dispatch) => ({
  getInitialTruckData: () => dispatch(RealtimeActions.getInitialTruckData()),
  gpsUpdate: (update) => dispatch(RealtimeActions.gpsUpdate(update)),
  setInformation: (information) => dispatch(RealtimeActions.setInformation(information)),
  setHideFooter: () => dispatch(RealtimeActions.setHideFooter()),
  setActiveMap: (activeMap) => dispatch(RealtimeActions.setActiveMap(activeMap))
});


export default connect(mapStateToProps, mapDispatchToProps)(Map)

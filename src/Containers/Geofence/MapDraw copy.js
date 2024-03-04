import React, { Component } from "react";
import { connect } from 'react-redux'
import ReactDOM from "react-dom";
import { compose, withProps } from "recompose";
import RealtimeActions from '../../Redux/RealtimeRedux'
import MapControlsCustom from '../../Components/GoogleMap/MapControlsCustom'
import MapControl from '../../Components/GoogleMap/MapControl'
import Geofences from './Geofences'
import GeofencesMap from './GeofencesMap'
import Polygons from './Components/Geofences/Polygons'
import Lines from './Components/Geofences/Line'
import Points from './Components/Geofences/Point'
import GeofenceActions from "../../Redux/GeofenceRedux"
import InfoGeof from './Components/Geofences/InfoGeof';
import { isEmpty } from 'react-redux-firebase'
// DrawingManager
import { LoadScriptNext, GoogleMap, DrawingManager, Data, Polygon, Polyline, Circle, Marker, StandaloneSearchBox } from "@react-google-maps/api";

const onLoad = data => {
  // console.log('data: ', data)
}

class MapDraw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIcon: true,
      form: null,
      type: null,
      previosOverlay: null,
      mapLoad: null,
      activeMap: false,
      map: null,
      search: null,
      place: false,
      location: { lat: 0, lng: 0 },
      visible: true,
      markerMap: [],
      positionMarker: null,
      infoType: 1,
      infoMarker: null,
      anchor: null,
      // infoWindowEnabled: false,
      // measureEnabled: false,
      // clusterEnabled: true,
      mapType: 'roadmap',
      objectEnabled: true,
      // fitObjectEnabled: false,
      geofencesEnabled: [],
      polygon: [{
        lat: 0,
        lng: 0
      }],
      polyline: [{
        lat: 0,
        lng: 0
      }],
      iconUrl: null,
      iconPoint: {
        lat: 0,
        lng: 0
      },
      circle: [{
        center: null,
        radius: null,
      }],
      center: [{
        lat: 0,
        lng: 0
      }],
      radius: null,
      polygonDraw: null,
      polylineDraw: null,
      circleDraw: null,
      centerDefualt: {
        lat: 13.786377,
        lng: 100.608755
      },
      centerSelected: {
        lat: 13.786377,
        lng: 100.608755
      },
      path: null,
      zoomDefualt: 6,
      zoomSelected: 6,
      selectData: [],
    }
    this.handleOverlayComplete = this.handleOverlayComplete.bind(this)
    this.onPlacesChanged = this.onPlacesChanged.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectData !== nextProps.selectData && nextProps.selectData.length !== 0) {
      this.setState({
        showIcon: nextProps.showIcon,
        form: nextProps.form,
        zoomSelected: nextProps.zoomSelected,
        centerSelected: nextProps.centerSelected,
        polygon: nextProps.polygon,
        polyline: nextProps.polyline,
        mode: nextProps.mode,
        type: nextProps.type,
        geofencesEnabled: [],
        iconUrl: nextProps.iconUrl,
        iconPoint: nextProps.iconPoint,
        circle: nextProps.circle,
        center: nextProps.center,
        radius: nextProps.radius,
        mode: nextProps.mode,
        type: nextProps.type,
        zoomDefualt: nextProps.zoomDefualt,
        centerDefualt: nextProps.centerDefualt,
      })
    }
    else {
      this.setState({
        showIcon: nextProps.showIcon,
        form: nextProps.form,
        zoomSelected: nextProps.zoomSelected,
        centerSelected: nextProps.centerSelected,
        polygon: nextProps.polygon,
        polyline: nextProps.polyline,
        mode: nextProps.mode,
        type: nextProps.type,
        iconUrl: nextProps.iconUrl,
        iconPoint: nextProps.iconPoint,
        circle: nextProps.circle,
        center: nextProps.center,
        radius: nextProps.radius,
        mode: nextProps.mode,
        type: nextProps.type,
        zoomDefualt: nextProps.zoomDefualt,
        centerDefualt: nextProps.centerDefualt,
      })

    }
  }

  componentWillUnmount() {
    let { objectEnabled, mapType } = this.state
    let stateMapControl = {
      objectEnabled,
      mapType
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.geofencesEnabled.length !== 0 && this.state.geofencesEnabled !== prevState.geofencesEnabled) {
      this.props.resetSelectRow()
    }
  }

  onLoadSearchBox = ref => this.setState({ search: ref });

  keyPress(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  }

  markerLoadHandler(anchor, id) {
    this.setState({ anchor })
  };

  markerClickHandler = (key) => {
    // index
    let idx = this.state.markerMap.findIndex(x => x.place === 'place' + key);

    // console.log(key, idx)
    if (idx >= 0) {
      let { marker, data } = this.state.markerMap[idx]
      // console.log(data)
      // this.setState({ infoMarker, infoOpen: true })
      this.props.setInfoMarker(marker, data)
      this.setState({
        positionMarker: marker, infoMarker: data, infoType: 1
      })
      // this.props.setInfoMarker(infoMarker)

    }
  };

  onPlacesChanged = () => {
    let { search } = this.state
    // console.log(search.getPlaces())
    if (search.getPlaces().length == 1) {
      this.setState({
        place: true,
        zoomDefualt: 12,
        centerDefualt: {
          lat: search.getPlaces()[0].geometry.location.lat(),
          lng: search.getPlaces()[0].geometry.location.lng(),
        },
        location: {
          lat: search.getPlaces()[0].geometry.location.lat(),
          lng: search.getPlaces()[0].geometry.location.lng(),
        },
        // iconLocation: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png"
      })
    }
    else {
      this.setState({
        place: false,
        zoomDefualt: 8,
        centerDefualt: {
          lat: 13.786377,
          lng: 100.608755
        },
        // iconLocation: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png"
      })
    }


  };

  handleOverlayComplete(e) {
    if (this.state.previosOverlay) {
      this.state.previosOverlay.setMap(null);
    }
    // console.log('HandleOverlayComplete')
    // console.log(e.overlay)
    this.setState({ visible: false, previosOverlay: e.overlay })

    // console.log(this.props)
    const onChange = this.props.onChange
    if (e.type == 'polygon') {
      window.google.maps.event.addListener(e.overlay, "mouseup", function (event) {
        // console.log("mouseup overlay : ",e.overlay.getPath().getArray());
        // onChange(e.type,e.overlay)
        // console.log()
        this.props.onChange(e.overlay)
      });
    }
    else if (e.type == 'polyline') {
      window.google.maps.event.addListener(e.overlay, "mouseup", function (event) {
        // console.log("mouseup overlay : ",e.overlay.getPath().getArray() );
        onChange(e.type, e.overlay)
      });
    }
    else if (e.type == 'circle') {
      var tmp = e.overlay
      window.google.maps.event.addListener(e.overlay, "radius_changed", function (event) {
        // console.log("mouseup radius : ",e.overlay );
        onChange(e.type, e.overlay)
      });
      window.google.maps.event.addListener(e.overlay, "center_changed", function (event) {
        // console.log("mouseup center : ",e.overlay );
        onChange(e.type, e.overlay)
      });
    }
    this.state.previosOverlay.setMap(null)
  }

  render() {

    let { position } = this.props

    let { fitObjectEnabled, geofencesEnabled,
      objectEnabled, clusterEnabled, infoWindowEnabled, measureEnabled, } = this.state

    // console.log(ControlPosition.TOP)
    // console.log(this.props)
    // console.log(this.state)
    // console.log(this.state.geofencesEnabled.length == 0)
    let mapContainerStyle = { width: '98%', height: "calc(100vh - 150px)" }
    if (this.props.form) delete mapContainerStyle.width

    return (
      // <LoadScript googleMapsApiKey="AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&v=3.exp&libraries=geometry,drawing,places">
      <LoadScriptNext id="script-loader" language={this.props.language} region="thailand" googleMapsApiKey="AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&v=3.exp&libraries=geometry,drawing,places">
        {/* <ScriptLoaded> */}
        <GoogleMap
          onLoad={map => {
            // this.map = map

            if (position) {
              // if (!createGeof) createPoint(position, require('./icons/ic_stop_m.png'))
              map.panTo(position);
              map.setZoom(17)
            }
            // console.log('goef', get(this, 'props.history.location.state'))
            this.setState({ map: map })
          }}
          zoom={!this.state.form ? this.state.zoomSelected : this.state.zoomDefualt}
          center={!this.state.form ? this.state.centerSelected : this.state.centerDefualt}
          disableDefaultUI={true}
          id='geofence-map'
          options={{
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

          mapContainerStyle={mapContainerStyle}
        >

          {
            this.state.map !== null &&
            <MapControlsCustom
              position={1}
              map={this.state.map}
              width="auto"
              clusterHidden={true}
              fitObjectHidden={true}
              licensePlateHidden={true}
              geofencesrHidden={false}
              objectHidden={true}
              dashboardHidden={true}
              infoHidden={true}
              measureHidden={true}
              geofencesEnabled={this.props.geofencesEnabled}
              mapType={this.props.mapType}
              onObjectChange={value => this.setState({ objectEnabled: value })}
              onGeofencesChange={value => this.props.getGeofenceByTypesGeof(value)}
              onMapTypeChange={value => this.props.setStateReduxGeofence({ mapType: value })}

            />
          }

          {this.state.map !== null &&
            <MapControl position={7} map={this.state.map} id={'search-mp-geofence'} width="auto" >
              <StandaloneSearchBox
                onLoad={(search) => this.setState({ search: search })}
                onPlacesChanged={
                  this.onPlacesChanged
                }
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder={this.props.language == 'en' ? "Search Place" : this.props.language == 'th' ? "ค้นหาสถานที่" : this.props.language == 'ja' && "Search Place"}
                  style={{
                    margin: 10,
                    width: `240px`,
                  }}
                  onKeyDown={this.keyPress}

                />
              </StandaloneSearchBox>

            </MapControl>
          }
          <Polygon
            onLoad={(polygon) => this.setState({ polygonDraw: polygon })}
            paths={this.state.polygon}
            options={{
              clickable: true,
              draggable: true,
              editable: true,
              visible: this.state.type == 'polygon',
              zIndex: 1
            }}
            onMouseUp={(e) => this.props.onChange('polygon', this.state.polygonDraw)}
          />
          <Polyline
            onLoad={(polyline) => this.setState({ polylineDraw: polyline })}
            path={this.state.polyline}
            options={{
              clickable: true,
              draggable: true,
              editable: true,
              visible: this.state.type == 'polyline',
              zIndex: 1
            }}
            onMouseUp={(e) => this.props.onChange('polyline', this.state.polylineDraw)}
          />
          {/* {
              this.state.mapLoad !== null &&  */}
          <Circle
            onLoad={(circle) => this.setState({ circleDraw: circle })}
            // center={{ lat: 8.738875, lng: 99.332495 }}
            center={this.state.center[0]}

            onCenterChanged={(e) => this.state.type == 'circle' && this.state.circleDraw !== null && this.props.onChange('circle', this.state.circleDraw, 'center')}
            onRadiusChanged={(e) => this.state.type == 'circle' && this.state.circleDraw !== null && this.props.onChange('circle', this.state.circleDraw, 'radius')}
            options={{
              radius: this.state.radius,
              clickable: true,
              draggable: true,
              editable: true,
              visible: this.state.type == 'circle',
              zIndex: 1
            }}
          // onMouseUp={(e)=> console.log(this.state.circleDraw.getRadius(),this.state.circleDraw.getCenter())}
          />
          <div>
            <Marker
              visible={this.state.showIcon}
              position={this.state.iconPoint}
              // position={this.state.type == 'circle' ? this.state.center : this.state.type == 'polygon' ? this.state.polygon[this.state.polygon.length]}
              icon={{
                url: this.state.iconUrl,
                // anchor: new window.google.maps.Point(5, 58),
              }}
            />
            <Marker
              visible={this.state.place}
              position={this.state.location}
              // position={this.state.type == 'circle' ? this.state.center : this.state.type == 'polygon' ? this.state.polygon[this.state.polygon.length]}
              icon={{
                url: this.state.iconLocation,
                // anchor: new window.google.maps.Point(5, 58),
              }}
            />
          </div>
          {
            this.state.map !== null && this.props.form == true &&
            <DrawingManager
              onLoad={onLoad('drawing')}
              position={window.google.maps.ControlPosition.TOP_CENTER}
              // drawingMode={}
              drawingModes={[
                window.google.maps.drawing.OverlayType.CIRCLE,
                window.google.maps.drawing.OverlayType.POLYGON,
                window.google.maps.drawing.OverlayType.POLYLINE,
                // window.google.maps.drawing.OverlayType.RECTANGLE,
              ]}

              options={{
                drawingControlOptions: {
                  position: window.google.maps.ControlPosition.TOP_CENTER,
                  drawingModes: [
                    window.google.maps.drawing.OverlayType.CIRCLE,
                    window.google.maps.drawing.OverlayType.POLYGON,
                    window.google.maps.drawing.OverlayType.POLYLINE,
                  ]
                },
                circleOptions: {
                  // fillColor: '#ffff00',
                  // fillOpacity: 1,
                  // strokeWeight: 5,
                  clickable: true,
                  editable: true,
                  zIndex: 1
                },
                polygonOptions: {
                  // fillColor: '#ffff00',
                  // fillOpacity: 1,
                  // strokeWeight: 5,
                  clickable: true,
                  editable: true,
                  zIndex: 1
                },
                polylineOptions: {
                  clickable: true,
                  editable: true,
                  zIndex: 1
                },

              }}
              onCircleComplete={(value) => this.props.getPathsPoint(value, 'add')}
              // onCircleComplete={(value) => console.log(value)}
              onPolygonComplete={(value) => this.props.getPathsPolygon(value)}
              onPolylineComplete={(value) => this.props.getPathsPolyline(value)}
              onOverlayComplete={(value) => this.handleOverlayComplete(value)}

            >
            </DrawingManager>
          }
          {
            this.state.map !== null && this.props.selectData.length > 0 ?
              <Geofences geofenceByTypes={this.props.selectData} />
              :
              <GeofencesMap />
          }


        </GoogleMap>
      </LoadScriptNext>
    )
  }
}

const mapStateToProps = (state) => ({
  language: state.versatile.language,
  selectData: state.geofence.selectData,
  zoomSelected: state.geofence.zoomSelected,
  centerSelected: state.geofence.centerSelected,
  // stateMapControl: state.realtime.stateMapControl,
  geofencesEnabled: state.geofence.geofencesEnabled,
  mapType: state.geofence.mapType,
})

const mapDispatchToProps = (dispatch) => ({
  resetSelectRow: () => dispatch(GeofenceActions.resetSelectRow()),
  // getGeofenceDetail: (geofenceId) => dispatch(RealtimeActions.getGeofenceDetail(geofenceId)),
  getGeofenceByTypesGeof: (GeofenceTypeIds) => dispatch(GeofenceActions.getGeofenceByTypesGeof(GeofenceTypeIds)),
  setStateReduxGeofence: (objState) => dispatch(GeofenceActions.setStateReduxGeofence(objState)),

})


export default connect(mapStateToProps, mapDispatchToProps)(MapDraw);

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { t } from '../../Components/Translation';
import { Input } from 'reactstrap'
import { get } from 'lodash'
import { GoogleMap, LoadScriptNext } from '@react-google-maps/api'
import OverlayPanel from './OverlayPanel'
import FooterInfo from './FooterInfo'
import { ENDPOINT_BASE_URL } from '../../Config/app-config';
import ControlRoomDealerActions from '../../Redux/ControlRoomDealerRedux'
import RealtimeActions from '../../Redux/RealtimeRedux'
import Geofences from './Objects/Geofences'
import MapControlsCustom from '../../Components/GoogleMap/MapControlsCustom'
import MapControl from '../../Components/GoogleMap/MapControl'
import MarkerCluster from './Objects/MarkerCluster'
import MarkerActive from './Objects/MarkerActive'
import { useTranslation } from 'react-i18next'

const STYLETOTALVEHICLE = {
  padding: 10,
  boxShadow: '0 2px 6px rgba(0,0,0,.3)',
  backgroundColor: 'white',
  borderRadius: '4px 0px 0px 4px',
  left: '50%',
  right: 0,
  top: '10px',
  position: 'absolute',
  width: 150
}


const InputSearch = (arg) => {
  const { t } = useTranslation()
  return <Input
    className="search-message-box-realtime"
    placeholder={t('search')}
    style={{ marginBottom: 0 }}
    onKeyUp={(e) => arg.onKeyUp(e)}
  />
}


class Map extends Component {
  constructor(props) {
    super(props)

    this.state = {
      centerDefualt: {
        lat: 13.786377,
        lng: 100.608755
      },
      isShow: false,
      zoomDefault: 5,
      alertSetting: {
        show: false,
        type: 2,
        content: "",
        validateCode: false
      },
      btnClusterActive: true,
      btnMeasureActive: false,
      fullscreen: false,
      showMapTypeBox: false,
      dashboardEnabled: false,
      clusterEnabled: true,
      // initialVehiclesData: [],
      size: 50,
      yAxis: -50,
      geofencesEnabled: [],
      geofenceByTypes: []
    }
    this.map = null
    // this.hideOverlayPanel = false
    // this.startDate
    // this.stopDate

    // this.hideOverlayPanel = false
    // this.startDate
    // this.stopDate
  }




  componentWillMount() {
    // this.searchData()




    // let { dashboardEnabled} =this.state
    // if (!_dashboardHidden && dashboardEnabled === false) this.toggleDashboard()
  }


  componentDidUpdate(prevProps) {
    let { searchData, select, vid, initialVehiclesData, zoom } = this.props
    // if (prevProps.searchData !== searchData) {

    //   this.searchData(searchData)
    //   this.map.setZoom(5)
    //   this.map.setCenter({ lat: 13.786377, lng: 100.608755 })
    // }
    if (prevProps.select !== select) {
      // this.searchData(searchData)

      this.map.setZoom(5)
      this.map.setCenter({ lat: 13.786377, lng: 100.608755 })
    }
    if (prevProps.vid !== vid) this.mapVid(vid)

    if (prevProps.initialVehiclesData !== initialVehiclesData && prevProps.select === select) {

      // console.log("xxxxx :", initialVehiclesData.length)

      // let ele = document.getElementById('total-vehicle')
      // if (ele) ele.textContent = numberWithComma(initialVehiclesData.length)

      this.map.setZoom(zoom)
      // this.map.setCenter({ lat: 13.786377, lng: 100.608755 })
    }
  }


  componentDidMount() {
    window.addEventListener('fullscreenchange', this.onFullscreen)
  }



  // getPointsTest(latlng) {


  //     const google = window.google

  //     let dataLatLng = []
  //     if (this.heatmap) this.heatmap.setMap(null)
  //     let bounds = new google.maps.LatLngBounds();
  //     for (let i in latlng) {
  //         let { lat, lng } = latlng[i]
  //         if (!(lat === 0 && lng === 0)) {
  //             dataLatLng.push(new google.maps.LatLng(lat, lng))
  //             bounds.extend(latlng[i])
  //         }

  //     }
  //     if (dataLatLng.length > 0) {
  //         this.heatmap = new google.maps.visualization.HeatmapLayer({
  //             data: dataLatLng
  //         });
  //         this.heatmap.setMap(this.map)
  //         this.map.fitBounds(bounds);
  //     } else {
  //         this.map.setZoom(5)
  //         this.map.setCenter({ lat: 13.786377, lng: 100.608755 })
  //     }


  // }


  mapVid = (vid) => {

    const e = this.props
    // console.log("vid :", vid)
    const data = e.initialVehiclesData.find(e => e.vehicle_id === vid)
    // console.log('data :', data)
    this.map.setCenter({ lat: get(data, 'lat'), lng: get(data, 'lng') })
    this.map.setZoom(19)

  }

  setAlertSetting(isShow, type, content = "", ErrorSubcode) {
    let { alertSetting } = this.state
    alertSetting.show = isShow
    alertSetting.type = type
    alertSetting.content = content
    alertSetting.ErrorSubcode = ErrorSubcode
    this.setState({ alertSetting })
  }


  onFullscreen = () => {
    const isFullScreen = document.fullscreenElement
    if (isFullScreen) this.setState({ fullscreen: true })
    else this.setState({ fullscreen: false })
  }


  toggleMapType(mapType) {
    if (mapType === undefined) {
      this.setState(state => ({ showMapTypeBox: !state.showMapTypeBox }))
    }
    else {
      // #mapType
      //     - roadmap  : displays the default road map view. This is the default map type.
      //     - satellite : displays Google Earth satellite images.
      //     - hybrid :  displays a mixture of normal and satellite views.
      //     - terrain : displays a physical map based on terrain information.
      this.props.map.setMapTypeId(mapType);
      this.setState(state => ({ showMapTypeBox: false, mapType }))
      this.props.onMapTypeChange && this.props.onMapTypeChange(mapType)
    }
  }

  toggleDashboard() {
    this.props.onDashboardChange(this.state.dashboardEnabled)
    this.setState(state => ({ dashboardEnabled: !state.dashboardEnabled, dashboardActive: !state.dashboardActive }))
    this.props.onDashcboard && this.props.onDashcboard(this.state.dashboardEnabled)
  }





  async getGeofenceByTypes(value) {
    let { header } = this.props
    let param = ""
    for (let index in value) {
      if (param !== "") param += "&GeofenceTypeIds=" + value[index]
      else param += "GeofenceTypeIds=" + value[index]
    }

    var response = await fetch(ENDPOINT_BASE_URL + 'Geofence/Geofence/ListByTypes?' + param, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': header.idToken,
        'X-API-Key': header.redisKey
      },
      // body: JSON.stringify({ userId: this.props.dataLogin.userId })
    });
    let data = response.ok ? await response.json() : []

    this.setState({ geofenceByTypes: data.geofenceByTypes })
  }


  calSizeFormZoom(zoom) {


    let { size } = this.state
    //
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

  setCenterAction = (e) => {
    let { zoomDefault } = this.state


    if (this.map) {

      if (zoomDefault) this.calSizeFormZoom(this.map.getZoom())
      this.props.setZoom(this.map.getZoom())
    }

  }




  render() {
    let { centerDefualt, isShow, size, yAxis, zoomDefault, geofenceByTypes } = this.state
    let { searchData, vid, geofencesEnabled, initialVehiclesData, zoom } = this.props


    const boxShadowStyle = 'rgba(0, 0, 0, 0.3) 0px 2px 6px'
    const boxWidth = '40px'
    const boxHeight = '40px'
    const dropdownBoxStyle = { display: 'flex', flexDirection: 'row', alignItems: 'center', color: '#353c42' }


    return (

      <LoadScriptNext id="script-loader" googleMapsApiKey={"AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&libraries=geometry"} >

        <GoogleMap
          onLoad={map => {
            this.map = map
            this.setState({ mapLoad: map })
          }}
          mapContainerStyle={{
            width: '100%',
            height: "calc(93.6vh)",
            marginTop: -10
          }}
          center={centerDefualt}
          zoom={6}
          onZoomChanged={(e) => { this.setCenterAction(e) }}
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
        >
          <>
            {this.map !== null && <>
              <MapControlsCustom
                isDashboardIcon={false}
                position={1}
                map={this.map}
                licensePlateHidden={true}
                // geofencesrHidden={true}
                fitObjectHidden={true}
                objectHidden={true}
                dashboardHidden={false}
                geofencesEnabled={geofencesEnabled}
                onClusterChange={value => this.setState({ clusterEnabled: value })}
                onObjectChange={value => console.log("onObjectChange", value)}
                onImeasureChange={value => console.log("onImeasureChange", value)}
                onDashboardChange={value => this.props.onDashboardChange(value)}
                onGeofencesChange={value => {
                  // this.setState({ geofencesEnabled: value })
                  this.getGeofenceByTypes(value)
                }}
                infoHidden={true}
              />

              <MapControl position={7} map={this.map} id={'overlay-panel'}>
                {/* =================  component =================== */}
                <OverlayPanel />
                {/* =================  component =================== */}
              </MapControl>

              <MapControl position={2} map={this.map} id={'vehicle-count'} width={'auto'}>
                {/* =================  component =================== */}
                <div className='total-vehicle'>
                  <center>  <span>{initialVehiclesData ? initialVehiclesData.length : 0}</span>{' '}{t('control_room_20')}</center>
                </div>
                {/* =================  component =================== */}
              </MapControl>

              <MapControl position={9} map={this.map} id={'footer-info'}>
                <FooterInfo />
              </MapControl>

              <Geofences geofenceByTypes={geofenceByTypes} />


              <MarkerCluster
                map={this.map}
                // initialVehiclesData={initialVehiclesData}
                clusterEnabled={this.state.clusterEnabled}
                size={size}
                yAxis={yAxis}
              />
              <MarkerActive
                map={this.map}
                size={size}
                yAxis={yAxis}
              />
            </>}

          </>




        </GoogleMap>
      </LoadScriptNext >




    )
  }
}

const mapStateToProps = (state) => ({
  header: state.signin.header,
  dataLogin: state.signin.dataLogin,
  statusSubmit: state.subscription.statusSubmit,
  searchData: state.controlroomdealer.searchData,
  select: state.controlroomdealer.select,
  vid: state.controlroomdealer.vid,
  zoom: state.controlroomdealer.zoom,
  initialVehiclesData: state.controlroomdealer.initialVehiclesData,
  language: state.versatile.language
});

const mapDispatchToProps = (dispatch) => ({
  setList: (initialVehiclesData) => dispatch(ControlRoomDealerActions.setList(initialVehiclesData)),
  setZoom: (zoom) => dispatch(ControlRoomDealerActions.setZoom(zoom)),
  getGeofenceByTypes: (GeofenceTypeIds) => dispatch(RealtimeActions.getGeofenceByTypes(GeofenceTypeIds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map)

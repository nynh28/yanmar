import React, { Component } from 'react';
import { connect } from 'react-redux'
import RealtimeActions from '../../Redux/RealtimeRedux'
import SummaryActions from '../../Redux/SummaryRedux'
import { ENDPOINT_BASE_URL, getGeoServerUrl, setBusinessPOI, GOOGEL_MAP_API_KEY } from '../../Config/app-config';
import moment from 'moment'
import Images from './icons/Images'
import { LoadScriptNext, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'
import MapControlsCustom from '../../Components/GoogleMap/MapControlsCustom'
import MapControl from '../../Components/GoogleMap/MapControl'
import OverlayPanel from './OverlayPanel';
import { t } from '../../Components/Translation';
import Geofences from './Objects/Geofences'
import MarkerCluster from './Objects/MarkerCluster'
import MarkerClusterNew from './Objects/MarkerClusterNew'
import { data } from 'jquery';

const { get, isEqual, isEmpty } = require('lodash')
const tdStyle1 = {
  border: 'none',
  width: '120px',
  verticalAlign: 'top'
}

const tdStyle2 = {
  border: 'none',
  width: '180px',
  verticalAlign: 'top'
}

class Map extends Component {
  constructor(props) {
    super(props)
    this.stateMarker = this.stateMarker.bind(this)
    this.state = {
      centerDefualt: {
        lat: 13.786377,
        lng: 100.608755
      },
      zoomDefault: 5,
      clusterEnabled: true,
      objectEnabled: true,
      fitObjectEnabled: false,
      geofencesEnabled: [],
      measureEnabled: false,
      mapType: "roadmap",
      mapLoad: null,
      event: [],
      // indexMarker: 0,
      MarkerView: "",
      eventData: []
    }
    this.map = null
    this.count = 0
    this.intervalEventLoading = ""
  }

  componentDidUpdate(prevProps) {
    let { utilizationday, language } = this.props
    // if (prevProps.language !== language) {
    //   this.setState({ resetMap: true, mapLoad: null })
    //   setTimeout(() => this.setState({ resetMap: false }), 50)
    // }
    if (prevProps.language !== language) {
      if (this.state.mapLoad) {
        let lat = this.state.mapLoad.getCenter().lat()
        let lng = this.state.mapLoad.getCenter().lng()
        let obj = { resetMap: true, mapLoad: null }
        obj.centerDefualt = { lat, lng }
        obj.zoomDefault = this.state.mapLoad.getZoom()
        this.setState(obj)
        setTimeout(() => this.setState({ resetMap: false }), 50)
      }
    }

    if (prevProps.utilizationday !== utilizationday) {
      if (this.isEventDataRedux) {
        this.isEventDataRedux = false
      } else {
        this.setState({ MarkerView: "", eventData: [] })
      }
    }

  }


  componentWillMount() {
    let { eventData, selectData, stateMapControl, zoomAndCenter } = this.props
    this.props.setIsLoadingEvent(false)
    let obj = {}
    if (eventData) {
      this.isEventDataRedux = true
      obj.eventData = JSON.parse(JSON.stringify(eventData))
      obj.MarkerView = selectData
    }
    if (stateMapControl.clusterEnabled !== undefined) obj.clusterEnabled = stateMapControl.clusterEnabled
    if (zoomAndCenter) {
      obj.zoomDefault = zoomAndCenter.zoom
      obj.centerDefualt = zoomAndCenter.center
    }
    if (!isEmpty(obj)) this.setState(obj)
  }

  shouldComponentUpdate(nextProps, nextState, language) {
    let { eventData, selectData, eventDataSummary } = this.props
    // if (nextProps.eventData !== eventData) return false
    return true
  }

  componentWillUnmount() {
    let { clusterEnabled } = this.state
    let stateMapControl = {
      clusterEnabled,
      mapType: this.mapType
    }

    let obj = { stateMapControl }
    if (this.map) {
      obj.zoomAndCenter = { zoom: this.map.getZoom(), center: { lat: this.map.center.lat(), lng: this.map.center.lng() } }
    }
    this.props.setPercentLoading(0)
    this.props.setStateReduxSummary(obj)
    this.props.setIsLoadingEvent(false)
    this.count = 0
    clearInterval(this.intervalEventLoading)
  }

  // # 1001 => ขับต่อเนื่องเกิน 4
  // # 1002 => ขับต่อเนื่องเกิน 8
  // # 1003 => ความเร็วเกิน
  // # 1004 => ไม่รูดใบขับขี่
  // # 1005 => จีพีเอสไม่เชื่อมต่อ
  // # 1006 => ใบขับขี่ผิดประเภท

  // # 1007 => ออกตัวกระทันหัน
  // # 1008 => เร่งกระทันหัน
  // # 1009 => เลี้ยวกระทันหัน
  // # 1010 => เบรคกระทันหัน
  // # 1011 => ความเร็วเกิน 60
  // # 1012 => ความเร็วเกิน 80
  // # 1013 => ความเร็วเกิน 100
  // # 1014 => ความเร็วเกิน 120

  // # 1015 => ไฟเครื่องยนต์เตือน
  // # 1016 => เลยระยะซ่อมบำรุง
  // # 1017 => ถึงระยะซ่อมบำรุง (ภายใน 1000 กม.)
  // # 1018 => แรงดันไฟแบตเตอร์รี่ต่ำ
  // # 1019 => ถูกลดกำลังเครื่องยนต์
  // # 1020 => แรงดันลมยางต่ำ

  //#region change for new solution 20/12/2020

  async loadevent(event_id) {

    let { summaryData, date, dataLogin, keepArgument } = this.props

    let user_id = dataLogin.userId
    let last_gpsdate = summaryData.last_gpsdate
    let start_date = date.split(' - ')[0]
    let end_date = date.split(' - ')[1]
    if (keepArgument) {
      start_date = keepArgument
      end_date = keepArgument
    }
    let cust_id = []
    let fleet_id = this.props.fleet_id

    if (this.props.isDealer) {
      // cust_id = this.props.cust_id
      cust_id.push(this.props.cust_id)
    }
    else {
      this.props.customer_data.forEach((element) => {
        cust_id.push(element.int_cust_id)
        // cust_id = element.int_cust_id
      })
    }

    let isFirstLoad = true, response = "", isLastKey = false, LastEvaluatedKey = "", lent_array_custid = ""
    do {
      response = await this.getEventData(isLastKey, LastEvaluatedKey, lent_array_custid, user_id, cust_id, start_date, end_date, event_id, last_gpsdate, fleet_id)

      if (response.result) {
        await this.setEventData(response.result, isFirstLoad)

        if (response.result.LastEvaluatedKey.unix || response.result.lent_array_custid >= 0) {
          // if (response.result.LastEvaluatedKey.unix) {
          LastEvaluatedKey = response.result.LastEvaluatedKey
          lent_array_custid = response.result.lent_array_custid
          isLastKey = true
        }
        else {
          this.props.setIsLoadingEvent(false)
          isLastKey = false
          this.count = 0
          clearInterval(this.intervalEventLoading)
        }
      }
      else {
        // ?????????????????????
      }
      isFirstLoad = false

    } while (isLastKey);
  }

  async getEventData(isLastKey, LastEvaluatedKey, lent_array_custid, user_id, cust_id, start_date, stop_date, event_id, last_gpsdate, fleet_id) {
    let body = {
      user_id,
      cust_id,
      start_date,
      stop_date,
      event_id,
      last_gpsdate
    }

    if (isLastKey) body.LastEvaluatedKey = LastEvaluatedKey
    if (isLastKey) body.lent_array_custid = lent_array_custid
    if (fleet_id != 0) body.fleet_id = parseInt(fleet_id)

    var response = await fetch(ENDPOINT_BASE_URL + "fleet/dashboard/events", {
      // var response = await fetch("http://192.168.6.70:5000/prod/fleet/dashboard/events", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    var data = await response.json();

    if (data?.code == 200)
      return data
    else
      return {}
  }

  async stateMarker(e, count) {
    this.count = count
    this.props.setInfoWindowIndex(null)
    this.props.setPercentLoading(0)
    this.props.setStateReduxSummary({ eventData: [] })
    this.props.setEventData([])

    let defaultData = {
      MarkerView: "",
      // indexMarker: 0,
      // zoomDefault: 5,
      zoomDefault: this.map.getZoom(),
      centerDefualt: {
        lat: this.map.getCenter().lat(),
        lng: this.map.getCenter().lng()
        // lat: 13.786377,
        // lng: 100.608755
      },
    }

    if (this.state.MarkerView == e || count == 0) {
      delete defaultData.zoomDefault;
      this.setState({ ...defaultData })
      this.count = 0
      return
    }

    this.props.setIsLoadingEvent(true)
    // this.intervalEventLoading = setInterval(() => {
    //   this.count++
    //   if (this.count <= 29) {
    //     this.props.setPercentLoading(((this.count / 29) * 100).toFixed(0))
    //   }
    // }, 1000)

    switch (e) {
      case "Driving Over 4h":
        this.loadevent(1001)
        defaultData.MarkerView = "Driving Over 4h"
        break;

      case "Driving Over 8h":
        this.loadevent(1002)
        defaultData.MarkerView = "Driving Over 8h"
        break;

      case "Driving Over Speed":
        this.loadevent(1003)
        defaultData.MarkerView = "Driving Over Speed"
        break;

      case "Not Swipe card":
        this.loadevent(1004)
        defaultData.MarkerView = "Not Swipe card"
        break;

      case "GPS Unpluged":
        this.loadevent(1005)
        defaultData.MarkerView = "GPS Unpluged"
        break;

      case "Wrongtype":
        this.loadevent(1006)
        defaultData.MarkerView = "Wrongtype"
        break;

      case "Harsh Start":
        this.loadevent(1007)
        defaultData.MarkerView = "Harsh Start"
        break;

      case "Harsh Acceleration":
        this.loadevent(1008)
        defaultData.MarkerView = "Harsh Acceleration"
        break;

      case "Sharp Turn":
        this.loadevent(1009)
        defaultData.MarkerView = "Sharp Turn"
        break;

      case "Harsh Brake":
        this.loadevent(1010)
        defaultData.MarkerView = "Harsh Brake"
        break;

      case "Over Speed 60":
        this.loadevent(1011)
        defaultData.MarkerView = "Over Speed 60"
        break;

      case "Over Speed 80":
        this.loadevent(1012)
        defaultData.MarkerView = "Over Speed 80"
        break;

      case "Over Speed 100":
        this.loadevent(1013)
        defaultData.MarkerView = "Over Speed 100"
        break;

      case "Over Speed 120":
        this.loadevent(1014)
        defaultData.MarkerView = "Over Speed 120"
        break;

      case "E/G Check Lamp":
        this.loadevent(1015)
        defaultData.MarkerView = "E/G Check Lamp"
        break;

      case "Over Maintenance Period":
        this.loadevent(1016)
        defaultData.MarkerView = "Over Maintenance Period"
        break;

      case "Maintenance Soon":
        this.loadevent(1017)
        defaultData.MarkerView = "Maintenance Soon"
        break;

      case "Battery Voltage Low":
        this.loadevent(1018)
        defaultData.MarkerView = "Battery Voltage Low"
        break;

      case "Derate Condition":
        this.loadevent(1019)
        defaultData.MarkerView = "Derate Condition"
        break;

      case "Tire Pressure Low":
        this.loadevent(1020)
        defaultData.MarkerView = "Tire Pressure Low"
        break;
    }
    this.setState({ ...defaultData })
  }

  setEventData(data, isFirstLoad) {
    let eventData = [], totalSuccess = 0
    // if (!isFirstLoad) eventData = JSON.parse(JSON.stringify(this.state.eventData))
    if (!isFirstLoad) eventData = JSON.parse(JSON.stringify(this.props.eventDataSummary))

    switch (this.state.MarkerView) {
      case "Driving Over 4h":
        if (data.dlt_4hour) {
          eventData.push(...data.dlt_4hour.list)
          totalSuccess = data.dlt_4hour.sum
        }
        break;
      case "Driving Over 8h":
        if (data.dlt_8hour) {
          eventData.push(...data.dlt_8hour.list)
          totalSuccess = data.dlt_8hour.sum
        }
        break;
      case "Driving Over Speed":
        if (data.dlt_overspeed) {
          eventData.push(...data.dlt_overspeed.list)
          totalSuccess = data.dlt_overspeed.sum
        }
        break;
      case "Not Swipe card":
        if (data.dlt_unknown) {
          eventData.push(...data.dlt_unknown.list)
          totalSuccess = data.dlt_unknown.sum
        }
        break;
      case "GPS Unpluged":
        if (data.dlt_unplug) {
          eventData.push(...data.dlt_unplug.list)
          totalSuccess = data.dlt_unplug.sum
        }
        break;
      case "Wrongtype":
        if (data.dlt_wrongtype) {
          eventData.push(...data.dlt_wrongtype.list)
          totalSuccess = data.dlt_wrongtype.sum
        }
        break;
      case "Harsh Start":
        if (data.harsh_start) {
          eventData.push(...data.harsh_start.list)
          totalSuccess = data.harsh_start.sum
        }
        break;
      case "Harsh Acceleration":
        if (data.harsh_acc) {
          eventData.push(...data.harsh_acc.list)
          totalSuccess = data.harsh_acc.sum
        }
        break;
      case "Sharp Turn":
        if (data.sharp_turn) {
          eventData.push(...data.sharp_turn.list)
          totalSuccess = data.sharp_turn.sum
        }
        break;
      case "Harsh Brake":
        if (data.harsh_brake) {
          eventData.push(...data.harsh_brake.list)
          totalSuccess = data.harsh_brake.sum
        }
        break;
      case "Over Speed 60":
        if (data.over_60) {
          eventData.push(...data.over_60.list)
          totalSuccess = data.over_60.sum
        }
        break;
      case "Over Speed 80":
        if (data.over_80) {
          eventData.push(...data.over_80.list)
          totalSuccess = data.over_80.sum
        }
        break;
      case "Over Speed 100":
        if (data.over_100) {
          eventData.push(...data.over_100.list)
          totalSuccess = data.over_100.sum
        }
        break;
      case "Over Speed 120":
        if (data.over_120) {
          eventData.push(...data.over_120.list)
          totalSuccess = data.over_120.sum
        }
        break;
      case "E/G Check Lamp":
        if (data.data) {
          eventData.push(...data.data.list)
          totalSuccess = data.data.sum
        }
        break;
      case "Over Maintenance Period":
        if (data.data) {
          eventData.push(...data.data.list)
          totalSuccess = data.data.sum
        }
        break;
      case "Maintenance Soon":
        if (data.data) {
          eventData.push(...data.data.list)
          totalSuccess = data.data.sum
        }
        break;
      case "Battery Voltage Low":
        if (data.data) {
          eventData.push(...data.data.list)
          totalSuccess = data.data.sum
        }
        break;
      case "Derate Condition":
        if (data.data) {
          eventData.push(...data.data.list)
          totalSuccess = data.data.sum
        }
        break;
      case "Tire Pressure Low":
        if (data.data) {
          eventData.push(...data.data.list)
          totalSuccess = data.data.sum
        }
        break;
    }
    // this.setState({ eventData })
    this.props.setPercentLoading(((totalSuccess / this.count) * 100).toFixed(0))
    this.props.setStateReduxSummary({ eventData: eventData })
    this.props.setEventData(eventData)
  }
  //#endregion

  render() {
    const { component: Component, ...rest } = this.props
    let { MarkerView, clusterEnabled, resetMap } = this.state
    let { stateMapControl } = this.props
    let keyApi = this.props.language === 'en' ? "&libraries=geometry&language=en&region=EN"
      : this.props.language === 'ja' ? "&libraries=geometry&language=ja&region=JA"
        : "&libraries=geometry&language=th&region=TH"

    if (resetMap) {
      return ""
    } else {
      return (
        <LoadScriptNext id="script-loader" googleMapsApiKey={GOOGEL_MAP_API_KEY + "&libraries=geometry&language=en&region=" + this.props.language}>
          <GoogleMap
            onLoad={map => {
              this.map = map
              this.setState({ mapLoad: map })
              setBusinessPOI(map)
            }}
            zoom={this.state.zoomDefault}
            center={this.state.centerDefualt}
            disableDefaultUI={true}
            mapContainerClassName={"map"}
            id='summary-map'
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

            mapContainerStyle={{
              width: '100%',
              height: "calc(93.6vh)"
            }}
          >
            {
              this.state.mapLoad !== null && <>
                <Geofences />

                <MapControlsCustom
                  position={1}
                  map={this.map}
                  width="auto"
                  fitObjectHidden={true}
                  objectHidden={true}
                  infoHidden={true}
                  licensePlateHidden={true}
                  clusterEnabled={stateMapControl.clusterEnabled}
                  geofencesEnabled={stateMapControl.geofencesEnabled}
                  measureEnabled={stateMapControl.measureEnabled}
                  mapType={stateMapControl.mapType}
                  onClusterChange={value => {
                    this.setState({ clusterEnabled: value })
                  }}
                  onGeofencesChange={value => {
                    this.setState({ geofencesEnabled: value })
                    this.props.getGeofenceByTypesSum(value)
                  }}
                  onMapTypeChange={value => { this.mapType = value }}
                />

                <MapControl position={7} map={this.map} id={'overlay-panel'}>
                  <OverlayPanel
                    event={this.props.event}
                    // utilizationday={this.props.utilizationday}
                    dataOverlayPanel={this.props.dataOverlayPanel}
                    stateMarker={this.stateMarker}
                    date={this.props.date} />
                </MapControl>

                {/* {
                MarkerView && <MarkerCluster
                  enabled={clusterEnabled}
                  map={this.map}
                  eventName={MarkerView}
                />
              } */}
                {
                  <MarkerClusterNew
                    enabled={clusterEnabled}
                    map={this.map}
                    eventName={MarkerView}
                  />
                }
              </>
            }
          </GoogleMap>
        </LoadScriptNext>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  language: state.versatile.language,
  dataLogin: state.signin.dataLogin,
  stateMapControl: state.summary.stateMapControl,
  stateMarker: state.summary.stateMarker,
  eventData: state.summary.eventData,
  selectData: state.summary.selectData,
  zoomAndCenter: state.summary.zoomAndCenter,
  summaryData: state.summary.summaryData,
  eventDataSummary: state.summary.eventDataSummary,
  keepArgument: state.summary.keepArgument,
});

const mapDispatchToProps = (dispatch) => ({
  getGeofenceByTypesSum: (GeofenceTypeIds) => dispatch(SummaryActions.getGeofenceByTypesSum(GeofenceTypeIds)),
  setStateReduxRealtime: (name, value) => dispatch(RealtimeActions.setStateReduxRealtime(name, value)),
  setStateReduxSummary: (objState) => dispatch(SummaryActions.setStateReduxSummary(objState)),
  setIsLoadingEvent: (data) => dispatch(SummaryActions.setIsLoadingEvent(data)),
  setPercentLoading: (data) => dispatch(SummaryActions.setPercentLoading(data)),
  setEventData: (data) => dispatch(SummaryActions.setEventData(data)),
  setInfoWindowIndex: (id) => dispatch(SummaryActions.setInfoWindowIndex(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Map)

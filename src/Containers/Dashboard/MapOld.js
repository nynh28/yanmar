import React, { Component } from 'react';
import { connect } from 'react-redux'
import RealtimeActions from '../../Redux/RealtimeRedux'
import { ENDPOINT_BASE_URL, getGeoServerUrl } from '../../Config/app-config';
import moment from 'moment'
import Images from './icons/Images'
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'
import MapControlsCustom from '../../Components/GoogleMap/MapControlsCustom'
import MapControl from '../../Components/GoogleMap/MapControl'
import OverlayPanel from './OverlayPanel';
import { t } from '../../Components/Translation';
import Geofences from './Objects/Geofences'

const { get, isEqual } = require('lodash')
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

var panPath = [];   // An array of points the current panning action will use
var panQueue = [];  // An array of subsequent panTo actions to take
var STEPS = 50;     // The number of steps that each panTo action will undergo

class Map extends Component {
  constructor(props) {
    super(props)
    //console.log(props)
    this.stateMarker = this.stateMarker.bind(this)
    this.latlng = this.latlng.bind(this)
    this.onToggleOpen = this.onToggleOpen.bind(this)
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
      isLoadingevent: false,
      markerMap: null,
      infoEnabled: false,
      onDragingStatus: false,
      mapLoad: null,
      infoWindowEnabled: false,
      iconByClassTypeActive: [],
      iconByClassTypeInactived: [],
      lat_dlt_4hour: [],
      lng_dlt_4hour: [],
      lat_dlt_8hour: [],
      lng_dlt_8hour: [],
      lat_dlt_overspeed: [],
      lng_dlt_overspeed: [],
      lat_dlt_unknown: [],
      lng_dlt_unknown: [],
      lat_dlt_unplug: [],
      lng_dlt_unplug: [],
      lat_dlt_wrongtype: [],
      lng_dlt_wrongtype: [],
      lat_overspeed: [],
      lng_overspeed: [],

      lat_harsh_start: [],
      lng_harsh_start: [],
      lat_harsh_brake: [],
      lng_harsh_brake: [],
      lat_harsh_acc: [],
      lng_harsh_acc: [],
      lat_sharp_turn: [],
      lng_sharp_turn: [],
      lat_over_60: [],
      lng_over_60: [],
      lat_over_80: [],
      lng_over_80: [],
      lat_over_100: [],
      lng_over_100: [],
      lat_over_120: [],
      lng_over_120: [],

      percentLoading: 0,
      // event: this.props.event,
      event: [],
      marker_isOpen: {},
      indexMarker: 0,
      MarkerView: "",
      eventData: []
    }
    this.map = null
  }

  componentWillUnmount() {
    let { information } = this.props
    let { clusterEnabled, objectEnabled,
      fitObjectEnabled, geofencesEnabled,
      infoWindowEnabled, measureEnabled, dashboardEnabled, mapType } = this.state
    let stateMapControl = {
      clusterEnabled,
      objectEnabled,
      geofencesEnabled,
      infoWindowEnabled,
      mapType
    }

    if (dashboardEnabled !== undefined) stateMapControl.dashboardEnabled = dashboardEnabled
    else stateMapControl.dashboardEnabled = this.props.stateMapControl.dashboardEnabled

    this.props.setStateReduxRealtime('stateMapControl', stateMapControl)
    this.props.setZoomMap(this.map.zoom)

    if (!this.props.activeMap) {
      let lat = this.map.center.lat()
      let lng = this.map.center.lng()
      this.props.setFocusPosition(lat, lng)
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


  panningComponent(lat, lng, zoom) {
    if (lat !== undefined && lng !== undefined) this.map.panTo({ lat, lng })
    if (zoom !== undefined) this.map.setZoom(zoom)

  }

  setDefualtMap(lat, lng, zoom) {
    this.map.setCenter({ lat, lng })
    this.map.setZoom(zoom)
  }

  setInfo(label, color) {
    return <div className="form-group field field-string" style={{ padding: '5px 5px 5px 10px', marginBottom: 0 }}>
      <i className="fa fa-circle" style={{ color }} />
      <span style={{ marginLeft: 10 }}>{label}</span>
    </div>
  }

  onToggleOpen(indexMarker) {
    var object = this.state.marker_isOpen;
    object[this.state.indexMarker] = false
    this.setState({
      marker_isOpen: object,
      indexMarker: 0
    }, () => {
      var object = this.state.marker_isOpen;
      object[indexMarker] = true
      this.setState({
        marker_isOpen: object,
        indexMarker: indexMarker
      })
    })

  }

  async loadevent(id, sub_id) {
    var accessToken = this.props.dataLogin.userTokenInfo.accessToken
    var redisKey = this.props.dataLogin.redisKey
    // var date = this.state.serieclick
    var date = this.props.date
    var cust_id = 0
    this.props.customer_data.forEach((element) => {
      cust_id = element.int_cust_id
    })

    var overspeed = []
    var dlt_overspeed = []
    var dlt_unknown = []
    var dlt_unplug = []
    var dlt_wrongtype = []
    var dlt_4hour = []
    var dlt_8hour = []
    var harsh_start = []
    var harsh_acc = []
    var harsh_brake = []
    var sharp_turn = []
    var over_60 = []
    var over_80 = []
    var over_100 = []
    var over_120 = []
    if (date.split(' - ')[0] != date.split(' - ')[1]) {
      let start_date = date.split(' - ')[0]
      let end_date = moment(date.split(' - ')[1]).add(1, 'day').format('YYYY-MM-DD')
      let start_diff = moment([start_date.split('-')[0], start_date.split('-')[1], start_date.split('-')[2]]);
      let end_diff = moment([end_date.split('-')[0], end_date.split('-')[1], end_date.split('-')[2]]);
      let diff = end_diff.diff(start_diff, 'days')
      let n = 0
      this.setState({ event: [] })
      while (start_date != end_date) {
        // var api = ENDPOINT_BASE_URL + "fleet/dashboard/summary/event/" + start_date + "/" + cust_id + "/" + id

        var api = ENDPOINT_BASE_URL + "fleet/dashboard/summary/event/" + start_date + "/" + cust_id + "/" + id + "/" + sub_id
        //**** var api = ENDPOINT_BASE_URL + "fleet/dashboard/summary/event/" + date.split(' - ')[0] + "/" + cust_id + "/" + id + "/" + sub_id

        var response = await fetch(api, {
          method: 'GET',
          headers: {
            'Authorization': accessToken,
            'X-API-Key': redisKey
          }

        });
        var responseJson = await response.json();
        if (responseJson.code == 200) {
          n++
          start_date = moment(start_date).add(1, 'day').format('YYYY-MM-DD')

          let dt = responseJson.result
          overspeed = overspeed.concat(dt.overspeed ? dt.overspeed.list : [])
          dlt_overspeed = dlt_overspeed.concat(dt.dlt_overspeed ? dt.dlt_overspeed.list : [])
          dlt_unknown = dlt_unknown.concat(dt.dlt_unknown ? dt.dlt_unknown.list : [])
          dlt_unplug = dlt_unplug.concat(dt.dlt_unplug ? dt.dlt_unplug.list : [])
          dlt_wrongtype = dlt_wrongtype.concat(dt.dlt_wrongtype ? dt.dlt_wrongtype.list : [])
          dlt_4hour = dlt_4hour.concat(dt.dlt_4hour ? dt.dlt_4hour.list : [])
          dlt_8hour = dlt_8hour.concat(dt.dlt_8hour ? dt.dlt_8hour.list : [])
          harsh_start = harsh_start.concat(dt.harsh_start ? dt.harsh_start.list : [])
          harsh_acc = harsh_acc.concat(dt.harsh_acc ? dt.harsh_acc.list : [])
          harsh_brake = harsh_brake.concat(dt.harsh_brake ? dt.harsh_brake.list : [])
          sharp_turn = sharp_turn.concat(dt.sharp_turn ? dt.sharp_turn.list : [])
          over_60 = over_60.concat(dt.over_60 ? dt.over_60.list : [])
          over_80 = over_80.concat(dt.over_80 ? dt.over_80.list : [])
          over_100 = over_100.concat(dt.over_100 ? dt.over_100.list : [])
          over_120 = over_120.concat(dt.over_120 ? dt.over_120.list : [])

          var event = {
            overspeed: {
              list: overspeed
            },
            dlt_overspeed: {
              list: dlt_overspeed
            },
            dlt_4hour: {
              list: dlt_4hour
            },
            dlt_8hour: {
              list: dlt_8hour
            },
            dlt_unknown: {
              list: dlt_unknown
            },
            dlt_wrongtype: {
              list: dlt_wrongtype
            },
            dlt_unplug: {
              list: dlt_unplug
            },
            harsh_start: {
              list: harsh_start
            },
            harsh_acc: {
              list: harsh_acc
            },
            harsh_brake: {
              list: harsh_brake
            },
            sharp_turn: {
              list: sharp_turn
            },
            over_60: {
              list: over_60
            },
            over_80: {
              list: over_80
            },
            over_100: {
              list: over_100
            },
            over_120: {
              list: over_120
            }
          }
          this.setState({
            event: event,
            percentLoading: ((n / diff) * 100).toFixed(0)
          }, () => {
            this.latlng(this.state)
          })
        }
        else {
          this.setState({
            event: event,
            percentLoading: ((n / diff) * 100).toFixed(0)
          }, () => {
            this.latlng(this.state)
          })
          //console.log('api Error')
        }
      }

      this.setState({
        isLoadingevent: false,
        percentLoading: 0
      }, () => {
        //console.log(this.state.event)
      })
    }
    else {
      var api = ENDPOINT_BASE_URL + "fleet/dashboard/summary/event/" + date.split(' - ')[0] + "/" + cust_id + "/" + id + "/" + sub_id
      let start_date = date.split(' - ')[0]
      let end_date = moment(date.split(' - ')[1]).add(1, 'day').format('YYYY-MM-DD')
      let start_diff = moment([start_date.split('-')[0], start_date.split('-')[1], start_date.split('-')[2]]);
      let end_diff = moment([end_date.split('-')[0], end_date.split('-')[1], end_date.split('-')[2]]);
      let diff = end_diff.diff(start_diff, 'days')
      let n = 0
      var response = await fetch(api, {
        method: 'GET',
        headers: {
          // Accept: 'application/json',
          // 'Content-Type': 'application/json',
          'Authorization': accessToken,
          'X-API-Key': redisKey
        }

      });
      var responseJson = await response.json();
      if (responseJson.code == 200) {
        n++
        this.setState({
          event: responseJson.result,
          percentLoading: ((n / diff) * 100).toFixed(0)
        }, () => {
          this.latlng(this.state)
          setTimeout(() =>
            this.setState({
              // dlt_overspeed: this.state.event.dlt_overspeed.sum,
              isLoadingevent: false,
              percentLoading: 0,
              // isReloading: false
            }, () => {
              //console.log(this.state.dataOverlayPanel)
            })
            , 500)
        })
      }
      else {
        this.loadevent(id)
        //console.log('api Error')
      }
    }
  }




  latlng(nextProps) {
    var lat_overspeed = []
    var lng_overspeed = []
    var lat_dlt_overspeed = []
    var lng_dlt_overspeed = []
    var lat_dlt_unknown = []
    var lng_dlt_unknown = []
    var lat_dlt_unplug = []
    var lng_dlt_unplug = []
    var lat_dlt_wrongtype = []
    var lng_dlt_wrongtype = []
    var lat_dlt_4hour = []
    var lng_dlt_4hour = []
    var lat_dlt_8hour = []
    var lng_dlt_8hour = []
    var lat_harsh_start = []
    var lng_harsh_start = []
    var lat_harsh_acc = []
    var lng_harsh_acc = []
    var lat_harsh_brake = []
    var lng_harsh_brake = []
    var lat_sharp_turn = []
    var lng_sharp_turn = []
    var lat_over_60 = []
    var lng_over_60 = []
    var lat_over_80 = []
    var lng_over_80 = []
    var lat_over_100 = []
    var lng_over_100 = []
    var lat_over_120 = []
    var lng_over_120 = []

    if (nextProps.event.dlt_4hour && nextProps.event.dlt_4hour.list.length > 0) {
      for (var n = 0; n < nextProps.event.dlt_4hour.list.length; n++) {
        var lat_lng = nextProps.event.dlt_4hour.list[n].latlng
        if (lat_lng != "") {
          lat_dlt_4hour.push(lat_lng.split(',')[0])
          lng_dlt_4hour.push(lat_lng.split(' ')[1])
        }
      }
    }
    if (nextProps.event.dlt_8hour && nextProps.event.dlt_8hour.list.length > 0) {
      for (var n = 0; n < nextProps.event.dlt_8hour.list.length; n++) {
        var lat_lng = nextProps.event.dlt_8hour.list[n].latlng
        if (lat_lng != "") {
          lat_dlt_8hour.push(lat_lng.split(',')[0])
          lng_dlt_8hour.push(lat_lng.split(' ')[1])
        }
      }
    }
    if (nextProps.event.dlt_overspeed && nextProps.event.dlt_overspeed.list.length > 0) {
      for (var n = 0; n < nextProps.event.dlt_overspeed.list.length; n++) {
        var lat_lng = nextProps.event.dlt_overspeed.list[n].latlng
        if (lat_lng != "") {
          lat_dlt_overspeed.push(lat_lng.split(',')[0])
          lng_dlt_overspeed.push(lat_lng.split(' ')[1])
        }
      }
    }
    if (nextProps.event.dlt_unknown && nextProps.event.dlt_unknown.list.length > 0) {
      for (var n = 0; n < nextProps.event.dlt_unknown.list.length; n++) {
        var lat_lng = nextProps.event.dlt_unknown.list[n].latlng
        if (lat_lng != "") {
          lat_dlt_unknown.push(lat_lng.split(',')[0])
          lng_dlt_unknown.push(lat_lng.split(' ')[1])
        }
      }
    }
    if (nextProps.event.dlt_unplug && nextProps.event.dlt_unplug.list.length > 0) {
      for (var n = 0; n < nextProps.event.dlt_unplug.list.length; n++) {
        var lat_lng = nextProps.event.dlt_unplug.list[n].latlng
        if (lat_lng != "") {
          lat_dlt_unplug.push(lat_lng.split(',')[0])
          lng_dlt_unplug.push(lat_lng.split(' ')[1])
        }
      }
    }
    if (nextProps.event.dlt_wrongtype && nextProps.event.dlt_wrongtype.list.length > 0) {
      for (var n = 0; n < nextProps.event.dlt_wrongtype.list.length; n++) {
        var lat_lng = nextProps.event.dlt_wrongtype.list[n].latlng
        if (lat_lng != "") {
          lat_dlt_wrongtype.push(lat_lng.split(',')[0])
          lng_dlt_wrongtype.push(lat_lng.split(' ')[1])
        }
      }

    }
    if (nextProps.event.overspeed && nextProps.event.overspeed.list.length > 0) {
      for (var n = 0; n < nextProps.event.overspeed.list.length; n++) {
        var lat_lng = nextProps.event.overspeed.list[n].latlng
        if (lat_lng != "") {
          lat_overspeed.push(lat_lng.split(',')[0])
          lng_overspeed.push(lat_lng.split(' ')[1])
        }
      }
    }

    if (nextProps.event.harsh_start && nextProps.event.harsh_start.list.length > 0) {
      for (var n = 0; n < nextProps.event.harsh_start.list.length; n++) {
        var lat_lng = nextProps.event.harsh_start.list[n].latlng
        if (lat_lng != "") {
          lat_harsh_start.push(lat_lng.split(',')[0])
          lng_harsh_start.push(lat_lng.split(' ')[1])
        }
      }
    }
    if (nextProps.event.harsh_acc && nextProps.event.harsh_acc.list.length > 0) {
      for (var n = 0; n < nextProps.event.harsh_acc.list.length; n++) {
        var lat_lng = nextProps.event.harsh_acc.list[n].latlng
        if (lat_lng != "") {
          lat_harsh_acc.push(lat_lng.split(',')[0])
          lng_harsh_acc.push(lat_lng.split(' ')[1])
        }
      }
    }
    if (nextProps.event.harsh_brake && nextProps.event.harsh_brake.list.length > 0) {
      for (var n = 0; n < nextProps.event.harsh_brake.list.length; n++) {
        var lat_lng = nextProps.event.harsh_brake.list[n].latlng
        if (lat_lng != "") {
          lat_harsh_brake.push(lat_lng.split(',')[0])
          lng_harsh_brake.push(lat_lng.split(' ')[1])
        }
      }
    }
    if (nextProps.event.sharp_turn && nextProps.event.sharp_turn.list.length > 0) {
      for (var n = 0; n < nextProps.event.sharp_turn.list.length; n++) {
        var lat_lng = nextProps.event.sharp_turn.list[n].latlng
        if (lat_lng != "") {
          lat_sharp_turn.push(lat_lng.split(',')[0])
          lng_sharp_turn.push(lat_lng.split(' ')[1])
        }
      }
    }
    if (nextProps.event.over_60 && nextProps.event.over_60.list.length > 0) {
      for (var n = 0; n < nextProps.event.over_60.list.length; n++) {
        var lat_lng = nextProps.event.over_60.list[n].latlng
        if (lat_lng != "") {
          lat_over_60.push(lat_lng.split(',')[0])
          lng_over_60.push(lat_lng.split(' ')[1])
        }
      }
    }
    if (nextProps.event.over_80 && nextProps.event.over_80.list.length > 0) {
      for (var n = 0; n < nextProps.event.over_80.list.length; n++) {
        var lat_lng = nextProps.event.over_80.list[n].latlng
        if (lat_lng != "") {
          lat_over_80.push(lat_lng.split(',')[0])
          lng_over_80.push(lat_lng.split(' ')[1])
        }
      }
    }
    if (nextProps.event.over_100 && nextProps.event.over_100.list.length > 0) {
      for (var n = 0; n < nextProps.event.over_100.list.length; n++) {
        var lat_lng = nextProps.event.over_100.list[n].latlng
        if (lat_lng != "") {
          lat_over_80.push(lat_lng.split(',')[0])
          lng_over_80.push(lat_lng.split(' ')[1])
        }
      }
    }
    if (nextProps.event.over_120 && nextProps.event.over_120.list.length > 0) {
      for (var n = 0; n < nextProps.event.over_120.list.length; n++) {
        var lat_lng = nextProps.event.over_120.list[n].latlng
        if (lat_lng != "") {
          lat_over_80.push(lat_lng.split(',')[0])
          lng_over_80.push(lat_lng.split(' ')[1])
        }
      }
    }

    this.setState({
      lat_dlt_4hour: lat_dlt_4hour,
      lng_dlt_4hour: lng_dlt_4hour,
      lat_dlt_8hour: lat_dlt_8hour,
      lng_dlt_8hour: lng_dlt_8hour,
      lat_dlt_overspeed: lat_dlt_overspeed,
      lng_dlt_overspeed: lng_dlt_overspeed,
      lat_dlt_unknown: lat_dlt_unknown,
      lng_dlt_unknown: lng_dlt_unknown,
      lat_dlt_unplug: lat_dlt_unplug,
      lng_dlt_unplug: lng_dlt_unplug,
      lat_dlt_wrongtype: lat_dlt_wrongtype,
      lng_dlt_wrongtype: lng_dlt_wrongtype,
      lat_overspeed: lat_overspeed,
      lng_overspeed: lng_overspeed,
      lat_harsh_start: lat_harsh_start,
      lng_harsh_start: lng_harsh_start,
      lat_harsh_brake: lat_harsh_brake,
      lng_harsh_brake: lng_harsh_brake,
      lat_harsh_acc: lat_harsh_acc,
      lng_harsh_acc: lng_harsh_acc,
      lat_sharp_turn: lat_sharp_turn,
      lng_sharp_turn: lng_sharp_turn,
      lat_over_60: lat_over_60,
      lng_over_60: lng_over_60,
      lat_over_80: lat_over_80,
      lng_over_80: lng_over_80,
      lat_over_100: lat_over_100,
      lng_over_100: lng_over_100,
      lat_over_120: lat_over_120,
      lng_over_120: lng_over_120,
    })
  }


  stateMarker(e, n) {
    if (e == "Driving Over 4h") {
      if (this.state.MarkerView == "Driving Over 4h" || n == 0) {
        this.setState({
          MarkerView: "",
          marker_isOpen: {},
          indexMarker: 0,
          centerDefualt: {
            lat: 13.786377,
            lng: 100.608755
          },
        })
      }
      else {
        this.loadevent(0, 2)
        this.setState({
          MarkerView: "Driving Over 4h",
          marker_isOpen: {},
          indexMarker: 0,
          isLoadingevent: true,
          centerDefualt: {
            lat: 13.786377,
            lng: 100.608755
          },
        })
      }

    }
    if (e == "Driving Over 8h") {
      if (this.state.MarkerView == "Driving Over 8h" || n == 0) {
        this.setState({
          MarkerView: "",
          marker_isOpen: {},
          indexMarker: 0,
          centerDefualt: {
            lat: 13.786377,
            lng: 100.608755
          },
        })
      }
      else {
        this.loadevent(0, 3)
        this.setState({
          MarkerView: "Driving Over 8h",
          marker_isOpen: {},
          indexMarker: 0,
          isLoadingevent: true,
          centerDefualt: {
            lat: 13.786377,
            lng: 100.608755
          },
        })
      }

    }
    if (e == "Driving Over Speed") {
      if (this.state.MarkerView == "Driving Over Speed" || n == 0) {
        this.setState({
          MarkerView: "",
          marker_isOpen: {},
          indexMarker: 0,
          centerDefualt: {
            lat: 13.786377,
            lng: 100.608755
          },
        })
      }
      else {
        this.loadevent(0, 1)
        this.setState({
          MarkerView: "Driving Over Speed",
          marker_isOpen: {},
          indexMarker: 0,
          isLoadingevent: true,
          centerDefualt: {
            lat: 13.786377,
            lng: 100.608755
          },
        })
      }
    }
    if (e == "Not Swipe card") {
      if (this.state.MarkerView == "Not Swipe card" || n == 0) {
        this.setState({
          MarkerView: "",
          marker_isOpen: {},
          indexMarker: 0,
          centerDefualt: {
            lat: 13.786377,
            lng: 100.608755
          },
        })
      }
      else {
        this.loadevent(0, 4)
        this.setState({
          MarkerView: "Not Swipe card",
          marker_isOpen: {},
          indexMarker: 0,
          isLoadingevent: true,
          centerDefualt: {
            lat: 13.786377,
            lng: 100.608755
          },
        })
      }

    }
    if (e == "GPS Unpluged") {
      if (this.state.MarkerView == "GPS Unpluged" || n == 0) {
        this.setState({
          MarkerView: "",
          marker_isOpen: {},
          indexMarker: 0,
          centerDefualt: {
            lat: 13.786377,
            lng: 100.608755
          },
        })
      }
      else {
        this.loadevent(0, 6)
        this.setState({
          MarkerView: "GPS Unpluged",
          marker_isOpen: {},
          indexMarker: 0,
          isLoadingevent: true,
          centerDefualt: {
            lat: 13.786377,
            lng: 100.608755
          },
        })
      }

    }
    if (e == "Wrongtype") {
      if (this.state.MarkerView == "Wrongtype" || n == 0) {
        this.setState({
          MarkerView: "",
          marker_isOpen: {},
          indexMarker: 0,
          centerDefualt: {
            lat: 13.786377,
            lng: 100.608755
          },
        })
      }
      else {
        this.loadevent(0, 5)
        this.setState({
          MarkerView: "Wrongtype",
          marker_isOpen: {},
          indexMarker: 0,
          isLoadingevent: true,
          centerDefualt: {
            lat: 13.786377,
            lng: 100.608755
          },
        })
      }
    }
    if (e == "Harsh Start") {
      if (this.state.MarkerView == "Harsh Start" || n == 0) {
        this.setState({
          MarkerView: "",
          marker_isOpen: {},
          indexMarker: 0,
          centerDefualt: {
            lat: 13.786377,
            lng: 100.608755
          },
        })
      }
      else {
        this.loadevent(1, 0)
        this.setState({
          MarkerView: "Harsh Start",
          marker_isOpen: {},
          indexMarker: 0,
          isLoadingevent: true,
          centerDefualt: {
            lat: 13.786377,
            lng: 100.608755
          },
        })
      }
    }
    if (e == "Harsh Acceleration") {
      if (this.state.MarkerView == "Harsh Acceleration" || n == 0) {
        this.setState({
          MarkerView: "",
          marker_isOpen: {},
          indexMarker: 0,
          centerDefualt: {
            lat: 13.786377,
            lng: 100.608755
          },
        })
      }
      else {
        this.loadevent(1, 1)
        this.setState({
          MarkerView: "Harsh Acceleration",
          marker_isOpen: {},
          indexMarker: 0,
          isLoadingevent: true,
          centerDefualt: {
            lat: 13.786377,
            lng: 100.608755
          },
        })
      }
    }
    if (e == "Sharp Turn") {
      if (this.state.MarkerView == "Sharp Turn" || n == 0) {
        this.setState({
          MarkerView: "",
          marker_isOpen: {},
          indexMarker: 0,
          centerDefualt: {
            lat: 13.786377,
            lng: 100.608755
          },
        })
      }
      else {
        this.loadevent(1, 3)
        this.setState({
          MarkerView: "Sharp Turn",
          marker_isOpen: {},
          indexMarker: 0,
          isLoadingevent: true,
          centerDefualt: {
            lat: 13.786377,
            lng: 100.608755
          },
        })
      }
    }
    if (e == "Harsh Brake") {
      if (this.state.MarkerView == "Harsh Brake" || n == 0) {
        this.setState({
          MarkerView: "",
          marker_isOpen: {},
          indexMarker: 0,
          centerDefualt: {
            lat: 13.786377,
            lng: 100.608755
          },
        })
      }
      else {
        this.loadevent(1, 2)
        this.setState({
          MarkerView: "Harsh Brake",
          marker_isOpen: {},
          indexMarker: 0,
          isLoadingevent: true,
          centerDefualt: {
            lat: 13.786377,
            lng: 100.608755
          },
        })
      }
    }
    if (e == "Over Speed 60") {
      if (this.state.MarkerView == "Over Speed 60" || n == 0) {
        this.setState({
          MarkerView: "",
          marker_isOpen: {},
          indexMarker: 0,
          centerDefualt: {
            lat: 13.786377,
            lng: 100.608755
          },
        })
      }
      else {
        this.loadevent(2, 0)
        this.setState({
          MarkerView: "Over Speed 60",
          marker_isOpen: {},
          indexMarker: 0,
          isLoadingevent: true,
          centerDefualt: {
            lat: 13.786377,
            lng: 100.608755
          },
        })
      }
    }
    if (e == "Over Speed 80") {
      if (this.state.MarkerView == "Over Speed 80" || n == 0) {
        this.setState({
          MarkerView: "",
          marker_isOpen: {},
          indexMarker: 0,
          centerDefualt: {
            lat: 13.786377,
            lng: 100.608755
          },
        })
      }
      else {
        this.loadevent(2, 1)
        this.setState({
          MarkerView: "Over Speed 80",
          marker_isOpen: {},
          indexMarker: 0,
          isLoadingevent: true,
          centerDefualt: {
            lat: 13.786377,
            lng: 100.608755
          },
        })
      }
    }
    if (e == "Over Speed 100") {
      if (this.state.MarkerView == "Over Speed 100" || n == 0) {
        this.setState({
          MarkerView: "",
          marker_isOpen: {},
          indexMarker: 0,
          centerDefualt: {
            lat: 13.786377,
            lng: 100.608755
          },
        })
      }
      else {
        this.loadevent(2, 2)
        this.setState({
          MarkerView: "Over Speed 100",
          marker_isOpen: {},
          indexMarker: 0,
          isLoadingevent: true,
          centerDefualt: {
            lat: 13.786377,
            lng: 100.608755
          },
        })
      }
    }
    if (e == "Over Speed 120") {
      if (this.state.MarkerView == "Over Speed 120" || n == 0) {
        this.setState({
          MarkerView: "",
          marker_isOpen: {},
          indexMarker: 0,
          centerDefualt: {
            lat: 13.786377,
            lng: 100.608755
          },
        })
      }
      else {
        this.loadevent(2, 3)
        this.setState({
          MarkerView: "Over Speed 120",
          marker_isOpen: {},
          indexMarker: 0,
          isLoadingevent: true,
          centerDefualt: {
            lat: 13.786377,
            lng: 100.608755
          },
        })
      }
    }
  }

  render() {
    const { component: Component, ...rest } = this.props
    let { iconByClassTypeActive, iconByClassTypeInactived, fitObjectEnabled, geofencesEnabled,
      objectEnabled, clusterEnabled, infoWindowEnabled, measureEnabled, dashboardEnabled,
      arrImg, arrImgActive } = this.state
    let { information, dashboardHidden, stateMapControl } = this.props
    // //console.log("RENDER LOAD MAP")
    if (this.map) {
      let lat = this.map.center.lat()
      let lng = this.map.center.lng()
      // this.props.setFocusPosition(lat, lng)
      // //console.log('lat, lng', lat, lng)
    }
    //console.log(this.state)

    return (
      //  <Row>
      //   <LoadScript id="script-loader" googleMapsApiKey={"AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&libraries=geometry"}>
      <GoogleMap
        onLoad={map => {
          this.map = map
          this.setState({ mapLoad: map })
          // const google = window.google
          // var overlayImageMaps =
          //   [
          //     {
          //       getTileUrl: function (coord, zoom) {
          //         return getGeoServerUrl("v_hino_dealer") + '&zoom=' + zoom + '&x=' + coord.x + '&y=' + coord.y + '&format=image/png';
          //       },
          //       tileSize: new google.maps.Size(256, 256),
          //       opacity: 0.7,
          //       isPng: true
          //     }
          //   ];
          // var overlayMap = new google.maps.ImageMapType(overlayImageMaps[0]);
          // map.overlayMapTypes.setAt(0, overlayMap)
        }}
        zoom={this.state.zoomDefault}
        center={this.state.centerDefualt}
        disableDefaultUI={true}
        // onDrag={() => { this.unFocusMarker() }}
        // onZoomChanged={() => {
        //   if (get(this.map, 'zoom')) {
        //     //console.log('onZoomChanged', get(this.map, 'zoom'))
        //     // this.map.setZoom(get(this.map, 'zoom'))
        //   }
        // }}
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
          this.state.mapLoad !== null && <Geofences />
        }

        {
          this.state.mapLoad !== null &&
          <MapControlsCustom
            position={1}
            map={this.map}
            width="auto"
            clusterHidden={true}
            fitObjectHidden={true}
            infoHidden={true}
            licensePlateHidden={true}
            clusterEnabled={stateMapControl.clusterEnabled}
            objectEnabled={stateMapControl.objectEnabled}
            fitObjectEnabled={fitObjectEnabled}
            geofencesEnabled={stateMapControl.geofencesEnabled}
            measureEnabled={stateMapControl.measureEnabled}
            dashboardEnabled={stateMapControl.dashboardEnabled}
            infoWindowEnabled={stateMapControl.infoWindowEnabled}
            infoWindowEnabled={stateMapControl.infoWindowEnabled}
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
            onDashboardChange={value => this.setState({ dashboardEnabled: value })}
            onFitObjectChange={value => this.onFitObjectChange(value)}
            onMapTypeChange={value => this.setState({ mapType: value })}
            onDashcboard={value => this.props.onShowDashboard && this.props.onShowDashboard(value)}
            onInfoChange={value => { this.setState({ infoEnabled: value }) }
            }
          />
        }
        {
          //console.log(this.state.percentLoading)
        }
        {
          this.state.mapLoad !== null &&
          // this.props.children
          <MapControl position={7} map={this.map} id={'overlay-panel'}>
            <OverlayPanel event={this.props.event} utilizationday={this.props.utilizationday} alertLatLng={this.state.alertLatLng} isLoadingevent={this.state.isLoadingevent} percentLoading={this.state.percentLoading} dataOverlayPanel={this.props.dataOverlayPanel} stateMarker={this.stateMarker} date={this.props.date} />
          </MapControl>

        }
        {
          this.state.mapLoad !== null && this.state.MarkerView == "Driving Over 4h" && this.state.lat_dlt_4hour.map((element, i) => {
            return (
              <Marker
                position={{ lat: parseFloat(element), lng: parseFloat(this.state.lng_dlt_4hour[i]) }}
                clickable={true}
                zIndex={1000}
                icon={{
                  url: Images.markerOverSpeed,
                  scaledSize: new window.google.maps.Size(25, 25)
                }}
                onClick={() => { this.onToggleOpen(i) }}
              >
                {typeof this.state.marker_isOpen[i] != 'undefined' && this.state.marker_isOpen[i] == true &&
                  <InfoWindow
                    position={{ lat: parseFloat(element), lng: parseFloat(this.state.lng_dlt_4hour[i]) }}
                    onCloseClick={() => {
                      var object = this.state.marker_isOpen;
                      object[this.state.indexMarker] = false
                      this.setState({
                        marker_isOpen: object,
                        indexMarker: 0
                      })
                    }}
                  >
                    <table className="table-info-window">
                      <tbody>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("event")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>DLT Not Swipe card</small> */}
                            <small>{t("summary_47")}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("license_plate")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.dlt_4hour.list[this.state.indexMarker].vehicle_id}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_79")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.dlt_4hour.list[this.state.indexMarker].dtstart}</small> */}
                            <small>{moment(this.state.event.dlt_4hour.list[this.state.indexMarker].dtstart).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_80")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.dlt_4hour.list[this.state.indexMarker].dtstop}</small> */}
                            <small>{moment(this.state.event.dlt_4hour.list[this.state.indexMarker].dtstop).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_81")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lat_dlt_4hour[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_82")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lng_dlt_4hour[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("realtime_11")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{(this.state.event.dlt_4hour.list[this.state.indexMarker].speed_avg).toFixed(0)} {t("summary_44")}</small>
                          </td>
                        </tr>
                        {/* <tr>
                          <td style={tdStyle1}>
                            <small>Duration:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.dlt_4hour.list[this.state.indexMarker].total_distance}</small>
                          </td>
                        </tr> */}
                      </tbody>
                    </table>


                  </InfoWindow>

                }

              </Marker>
            )
          })
        }
        {
          this.state.mapLoad !== null && this.state.MarkerView == "Driving Over 8h" && this.state.lat_dlt_8hour.map((element, i) => {
            return (
              <Marker
                position={{ lat: parseFloat(element), lng: parseFloat(this.state.lng_dlt_8hour[i]) }}
                icon={{
                  url: Images.markerOverSpeed,
                  scaledSize: new window.google.maps.Size(25, 25)
                }}
              >
                {typeof this.state.marker_isOpen[i] != 'undefined' && this.state.marker_isOpen[i] == true &&
                  <InfoWindow
                    position={{ lat: parseFloat(element), lng: parseFloat(this.state.lat_dlt_8hour[i]) }}
                    onCloseClick={() => {
                      var object = this.state.marker_isOpen;
                      object[this.state.indexMarker] = false
                      this.setState({
                        marker_isOpen: object,
                        indexMarker: 0
                      })
                    }}
                  >
                    <table className="table-info-window">
                      <tbody>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("event")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>DLT Not Swipe card</small> */}
                            <small>{t("summary_48")}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("license_plate")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.dlt_8hour.list[this.state.indexMarker].vehicle_id}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_79")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.dlt_8hour.list[this.state.indexMarker].dtstart}</small> */}
                            <small>{moment(this.state.event.dlt_8hour.list[this.state.indexMarker].dtstart).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_80")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.dlt_8hour.list[this.state.indexMarker].dtstop}</small> */}
                            <small>{moment(this.state.event.dlt_8hour.list[this.state.indexMarker].dtstop).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_81")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lat_dlt_8hour[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_82")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lng_dlt_8hour[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("realtime_11")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{(this.state.event.dlt_8hour.list[this.state.indexMarker].speed_avg).toFixed(0)} {t("summary_44")}</small>
                          </td>
                        </tr>
                        {/* <tr>
                          <td style={tdStyle1}>
                            <small>Duration:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.dlt_8hour.list[this.state.indexMarker].total_distance}</small>
                          </td>
                        </tr> */}
                      </tbody>
                    </table>


                  </InfoWindow>

                }
              </Marker>
            )
          })

        }
        {
          this.state.mapLoad !== null && this.state.MarkerView == "Driving Over Speed" && this.state.event.dlt_overspeed !== undefined && this.state.lat_dlt_overspeed.map((element, i) => {
            // //console.log(this.state.event.dlt_overspeed.list[i])
            // //console.log(this.state.indexMarker)
            // //console.log(i)
            return (
              <Marker
                clickable={true}
                zIndex={1000}
                position={{ lat: parseFloat(element), lng: parseFloat(this.state.lng_dlt_overspeed[i]) }}
                icon={{
                  url: Images.markerOverSpeed,
                  scaledSize: new window.google.maps.Size(25, 25)
                }}
                onClick={() => { this.onToggleOpen(i) }}
              >
                {typeof this.state.marker_isOpen[i] != 'undefined' && this.state.marker_isOpen[i] == true &&
                  <InfoWindow
                    position={{ lat: parseFloat(element), lng: parseFloat(this.state.lng_dlt_overspeed[i]) }}
                    onCloseClick={() => {
                      var object = this.state.marker_isOpen;
                      object[this.state.indexMarker] = false
                      this.setState({
                        marker_isOpen: object,
                        indexMarker: 0
                      }, () => {
                        //console.log(this.state.marker_isOpen)
                      })
                    }}
                  >
                    <table className="table-info-window">
                      <tbody>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("event")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>DLT Overspeed</small> */}
                            <small>{t("summary_49")}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("license_plate")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.dlt_overspeed.list[this.state.indexMarker].vehicle_id}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_79")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.dlt_overspeed.list[this.state.indexMarker].dtstart}</small> */}
                            <small>{moment(this.state.event.dlt_overspeed.list[this.state.indexMarker].dtstart).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_80")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.dlt_overspeed.list[this.state.indexMarker].dtstop}</small> */}
                            <small>{moment(this.state.event.dlt_overspeed.list[this.state.indexMarker].dtstop).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_81")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lat_dlt_overspeed[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_82")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lng_dlt_overspeed[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("realtime_11")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{(this.state.event.dlt_overspeed.list[this.state.indexMarker].speed_avg).toFixed(0)} {t("summary_44")}</small>
                          </td>
                        </tr>
                        {/* <tr>
                          <td style={tdStyle1}>
                            <small>Duration:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.dlt_overspeed.list[this.state.indexMarker].total_distance}</small>
                          </td>
                        </tr> */}
                      </tbody>
                    </table>


                  </InfoWindow>

                }


              </Marker>
            )
          })

        }
        {
          this.state.mapLoad !== null && this.state.MarkerView == "Not Swipe card" && this.state.event.dlt_unknown !== undefined && this.state.lat_dlt_unknown.map((element, i) => {
            // //console.log(this.state.event.dlt_unknown.list[i])
            return (
              <Marker
                position={{ lat: parseFloat(element), lng: parseFloat(this.state.lng_dlt_unknown[i]) }}
                clickable={true}
                zIndex={1000}
                icon={{
                  url: Images.markerOverSpeed,
                  scaledSize: new window.google.maps.Size(25, 25)
                }}
                onClick={() => { this.onToggleOpen(i) }}
              >
                {typeof this.state.marker_isOpen[i] != 'undefined' && this.state.marker_isOpen[i] == true &&
                  <InfoWindow
                    position={{ lat: parseFloat(element), lng: parseFloat(this.state.lng_dlt_unknown[i]) }}
                    onCloseClick={() => {
                      var object = this.state.marker_isOpen;
                      object[this.state.indexMarker] = false
                      this.setState({
                        marker_isOpen: object,
                        indexMarker: 0
                      })
                    }}
                  >
                    <table className="table-info-window">
                      <tbody>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("event")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>DLT Not Swipe card</small> */}
                            <small>{t("summary_50")}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("license_plate")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.dlt_unknown.list[this.state.indexMarker].vehicle_id}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_79")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.dlt_unknown.list[this.state.indexMarker].dtstart}</small> */}
                            <small>{moment(this.state.event.dlt_unknown.list[this.state.indexMarker].dtstart).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_80")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.dlt_unknown.list[this.state.indexMarker].dtstop}</small> */}
                            <small>{moment(this.state.event.dlt_unknown.list[this.state.indexMarker].dtstop).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_81")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lat_dlt_unknown[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_82")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lng_dlt_unknown[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("realtime_11")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{(this.state.event.dlt_unknown.list[this.state.indexMarker].speed_avg).toFixed(0)} {t("summary_44")}</small>
                          </td>
                        </tr>
                        {/* <tr>
                          <td style={tdStyle1}>
                            <small>Duration:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.dlt_unknown.list[this.state.indexMarker].total_distance}</small>
                          </td>
                        </tr> */}
                      </tbody>
                    </table>


                  </InfoWindow>

                }


              </Marker>
            )
          })

        }
        {
          this.state.mapLoad !== null && this.state.MarkerView == "GPS Unpluged" && this.state.lat_dlt_unplug.map((element, i) => {
            return (
              <Marker
                position={{ lat: parseFloat(element), lng: parseFloat(this.state.lng_dlt_unplug[i]) }}
                clickable={true}
                zIndex={1000}
                onClick={() => { this.onToggleOpen(i) }}
                icon={{
                  url: Images.markerOverSpeed,
                  scaledSize: new window.google.maps.Size(25, 25)
                }}
              >
                {typeof this.state.marker_isOpen[i] != 'undefined' && this.state.marker_isOpen[i] == true &&
                  <InfoWindow
                    position={{ lat: parseFloat(element), lng: parseFloat(this.state.lng_dlt_unplug[i]) }}
                    onCloseClick={() => {
                      var object = this.state.marker_isOpen;
                      object[this.state.indexMarker] = false
                      this.setState({
                        marker_isOpen: object,
                        indexMarker: 0
                      })
                    }}
                  >
                    <table className="table-info-window">
                      <tbody>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("event")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>DLT Not Swipe card</small> */}
                            <small>{t("summary_51")}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("license_plate")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.dlt_unplug.list[this.state.indexMarker].vehicle_id}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_79")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.dlt_unplug.list[this.state.indexMarker].dtstart}</small> */}
                            <small>{moment(this.state.event.dlt_unplug.list[this.state.indexMarker].dtstart).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_80")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.dlt_unplug.list[this.state.indexMarker].dtstop}</small> */}
                            <small>{moment(this.state.event.dlt_unplug.list[this.state.indexMarker].dtstop).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_81")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lat_dlt_unplug[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_82")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lng_dlt_unplug[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("realtime_11")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{(this.state.event.dlt_unplug.list[this.state.indexMarker].speed_avg).toFixed(0)} {t("summary_44")}</small>
                          </td>
                        </tr>
                        {/* <tr>
                          <td style={tdStyle1}>
                            <small>Duration:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.dlt_unplug.list[this.state.indexMarker].total_distance}</small>
                          </td>
                        </tr> */}
                      </tbody>
                    </table>


                  </InfoWindow>

                }
              </Marker>
            )
          })

        }
        {
          this.state.mapLoad !== null && this.state.MarkerView == "Wrongtype" && this.state.lat_dlt_wrongtype.map((element, i) => {
            return (
              <Marker
                position={{
                  lat: parseFloat(element), lng: parseFloat(this.state.lng_dlt_wrongtype[i])
                }}
                clickable={true}
                zIndex={1000}
                icon={{
                  url: Images.markerOverSpeed,
                  scaledSize: new window.google.maps.Size(25, 25)
                }}
                onClick={() => { this.onToggleOpen(i) }}
              >
                {typeof this.state.marker_isOpen[i] != 'undefined' && this.state.marker_isOpen[i] == true &&
                  <InfoWindow
                    position={{ lat: parseFloat(element), lng: parseFloat(this.state.lng_dlt_wrongtype[i]) }}
                    onCloseClick={() => {
                      var object = this.state.marker_isOpen;
                      object[this.state.indexMarker] = false
                      this.setState({
                        marker_isOpen: object,
                        indexMarker: 0
                      })
                    }}
                  >
                    <table className="table-info-window">
                      <tbody>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("event")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>DLT Not Swipe card</small> */}
                            <small>{t("summary_52")}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("license_plate")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.dlt_wrongtype.list[this.state.indexMarker].vehicle_id}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_79")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.dlt_wrongtype.list[this.state.indexMarker].dtstart}</small> */}
                            <small>{moment(this.state.event.dlt_wrongtype.list[this.state.indexMarker].dtstart).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_80")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.dlt_wrongtype.list[this.state.indexMarker].dtstop}</small> */}
                            <small>{moment(this.state.event.dlt_wrongtype.list[this.state.indexMarker].dtstop).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_81")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lat_dlt_wrongtype[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_82")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lng_dlt_wrongtype[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("realtime_11")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{(this.state.event.dlt_wrongtype.list[this.state.indexMarker].speed_avg).toFixed(0)} {t("summary_44")}</small>
                          </td>
                        </tr>
                        {/* <tr>
                          <td style={tdStyle1}>
                            <small>Duration:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.dlt_wrongtype.list[this.state.indexMarker].total_distance}</small>
                          </td>
                        </tr> */}
                      </tbody>
                    </table>


                  </InfoWindow>

                }
              </Marker>

            )
          })

        }

        {
          this.state.mapLoad !== null && this.state.MarkerView == "Harsh Start" && this.state.lat_harsh_start.map((element, i) => {
            return (
              <Marker
                position={{
                  lat: parseFloat(element), lng: parseFloat(this.state.lng_harsh_start[i])
                }}
                clickable={true}
                zIndex={1000}
                icon={{
                  url: Images.markerOverSpeed,
                  scaledSize: new window.google.maps.Size(25, 25)
                }}
                onClick={() => { this.onToggleOpen(i) }}
              >
                {typeof this.state.marker_isOpen[i] != 'undefined' && this.state.marker_isOpen[i] == true &&
                  <InfoWindow
                    position={{ lat: parseFloat(element), lng: parseFloat(this.state.lng_harsh_start[i]) }}
                    onCloseClick={() => {
                      var object = this.state.marker_isOpen;
                      object[this.state.indexMarker] = false
                      this.setState({
                        marker_isOpen: object,
                        indexMarker: 0
                      })
                    }}
                  >
                    <table className="table-info-window">
                      <tbody>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("event")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>DLT Not Swipe card</small> */}
                            <small>{t("summary_54")}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("license_plate")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.harsh_start.list[this.state.indexMarker].vehicle_id}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_79")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.harsh_start.list[this.state.indexMarker].dtstart}</small> */}
                            <small>{moment(this.state.event.harsh_start.list[this.state.indexMarker].dtstart).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_80")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.harsh_start.list[this.state.indexMarker].dtstop}</small> */}
                            <small>{moment(this.state.event.harsh_start.list[this.state.indexMarker].dtstop).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_81")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lat_harsh_start[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_82")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lng_harsh_start[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        {
                          /*<tr>
                          <td style={tdStyle1}>
                            <small>{t("realtime_11")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{(this.state.event.harsh_start.list[this.state.indexMarker].speed_avg).toFixed(0)} {t("summary_44")}</small>
                          </td>
                        </tr>
                        {/* <tr>
                          <td style={tdStyle1}>
                            <small>Duration:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.dlt_wrongtype.list[this.state.indexMarker].total_distance}</small>
                          </td>
                        </tr> */}
                      </tbody>
                    </table>


                  </InfoWindow>

                }
              </Marker>

            )
          })
        }

        {
          this.state.mapLoad !== null && this.state.MarkerView == "Harsh Acceleration" && this.state.lat_harsh_acc.map((element, i) => {
            return (
              <Marker
                position={{
                  lat: parseFloat(element), lng: parseFloat(this.state.lng_harsh_acc[i])
                }}
                clickable={true}
                zIndex={1000}
                icon={{
                  url: Images.markerOverSpeed,
                  scaledSize: new window.google.maps.Size(25, 25)
                }}
                onClick={() => { this.onToggleOpen(i) }}
              >
                {typeof this.state.marker_isOpen[i] != 'undefined' && this.state.marker_isOpen[i] == true &&
                  <InfoWindow
                    position={{ lat: parseFloat(element), lng: parseFloat(this.state.lng_harsh_acc[i]) }}
                    onCloseClick={() => {
                      var object = this.state.marker_isOpen;
                      object[this.state.indexMarker] = false
                      this.setState({
                        marker_isOpen: object,
                        indexMarker: 0
                      })
                    }}
                  >
                    <table className="table-info-window">
                      <tbody>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("event")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>DLT Not Swipe card</small> */}
                            <small>{t("summary_55")}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("license_plate")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.harsh_acc.list[this.state.indexMarker].vehicle_id}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_79")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.harsh_acc.list[this.state.indexMarker].dtstart}</small> */}
                            <small>{moment(this.state.event.harsh_acc.list[this.state.indexMarker].dtstart).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_80")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.harsh_acc.list[this.state.indexMarker].dtstop}</small> */}
                            <small>{moment(this.state.event.harsh_acc.list[this.state.indexMarker].dtstop).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_81")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lat_harsh_acc[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_82")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lng_harsh_acc[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        {
                          /*<tr>
                          <td style={tdStyle1}>
                            <small>{t("realtime_11")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{(this.state.event.harsh_acc.list[this.state.indexMarker].speed_avg).toFixed(0)} {t("summary_44")}</small>
                          </td>
                        </tr>
                        {/* <tr>
                          <td style={tdStyle1}>
                            <small>Duration:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.dlt_wrongtype.list[this.state.indexMarker].total_distance}</small>
                          </td>
                        </tr> */}
                      </tbody>
                    </table>


                  </InfoWindow>

                }
              </Marker>

            )
          })

        }

        {
          this.state.mapLoad !== null && this.state.MarkerView == "Harsh Brake" && this.state.lat_harsh_brake.map((element, i) => {
            return (
              <Marker
                key={0}
                position={{
                  lat: parseFloat(element), lng: parseFloat(this.state.lng_harsh_brake[i])
                }}
                clickable={true}
                zIndex={1000}
                icon={{
                  url: Images.markerOverSpeed,
                  scaledSize: new window.google.maps.Size(25, 25)
                }}
                onClick={() => { this.onToggleOpen(i) }}
              >
                {typeof this.state.marker_isOpen[i] != 'undefined' && this.state.marker_isOpen[i] == true &&
                  <InfoWindow
                    position={{ lat: parseFloat(element), lng: parseFloat(this.state.lng_harsh_brake[i]) }}
                    onCloseClick={() => {
                      var object = this.state.marker_isOpen;
                      object[this.state.indexMarker] = false
                      this.setState({
                        marker_isOpen: object,
                        indexMarker: 0
                      })
                    }}
                  >
                    <table className="table-info-window">
                      <tbody>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("event")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>DLT Not Swipe card</small> */}
                            <small>{t("summary_57")}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("license_plate")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.harsh_brake.list[this.state.indexMarker].vehicle_id}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_79")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.harsh_brake.list[this.state.indexMarker].dtstart}</small> */}
                            <small>{moment(this.state.event.harsh_brake.list[this.state.indexMarker].dtstart).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_80")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.harsh_brake.list[this.state.indexMarker].dtstop}</small> */}
                            <small>{moment(this.state.event.harsh_brake.list[this.state.indexMarker].dtstop).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_81")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lat_harsh_brake[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_82")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lng_harsh_brake[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        {/*<tr>
                          <td style={tdStyle1}>
                            <small>{t("realtime_11")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{Number(this.state.event.harsh_brake.list[this.state.indexMarker].speed_avg).toFixed(0)} {t("summary_44")}</small>
                          </td>
                        </tr>
                        {/* <tr>
                          <td style={tdStyle1}>
                            <small>Duration:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.dlt_wrongtype.list[this.state.indexMarker].total_distance}</small>
                          </td>
                        </tr> */}
                      </tbody>
                    </table>


                  </InfoWindow>

                }
              </Marker>

            )
          })

        }

        {
          this.state.mapLoad !== null && this.state.MarkerView == "Harsh Start" && this.state.lat_harsh_start.map((element, i) => {
            return (
              <Marker
                position={{
                  lat: parseFloat(element), lng: parseFloat(this.state.lng_harsh_start[i])
                }}
                clickable={true}
                zIndex={1000}
                icon={{
                  url: Images.markerOverSpeed,
                  scaledSize: new window.google.maps.Size(25, 25)
                }}
                onClick={() => { this.onToggleOpen(i) }}
              >
                {typeof this.state.marker_isOpen[i] != 'undefined' && this.state.marker_isOpen[i] == true &&
                  <InfoWindow
                    position={{ lat: parseFloat(element), lng: parseFloat(this.state.lng_harsh_start[i]) }}
                    onCloseClick={() => {
                      var object = this.state.marker_isOpen;
                      object[this.state.indexMarker] = false
                      this.setState({
                        marker_isOpen: object,
                        indexMarker: 0
                      })
                    }}
                  >
                    <table className="table-info-window">
                      <tbody>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("event")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>DLT Not Swipe card</small> */}
                            <small>{t("summary_54")}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("license_plate")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.harsh_start.list[this.state.indexMarker].vehicle_id}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_79")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.harsh_start.list[this.state.indexMarker].dtstart}</small> */}
                            <small>{moment(this.state.event.harsh_start.list[this.state.indexMarker].dtstart).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_80")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.harsh_start.list[this.state.indexMarker].dtstop}</small> */}
                            <small>{moment(this.state.event.harsh_start.list[this.state.indexMarker].dtstop).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_81")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lat_harsh_start[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_82")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lng_harsh_start[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        {
                          /*<tr>
                          <td style={tdStyle1}>
                            <small>{t("realtime_11")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{(this.state.event.harsh_start.list[this.state.indexMarker].speed_avg).toFixed(0)} {t("summary_44")}</small>
                          </td>
                        </tr>
                        {/* <tr>
                          <td style={tdStyle1}>
                            <small>Duration:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.dlt_wrongtype.list[this.state.indexMarker].total_distance}</small>
                          </td>
                        </tr> */}
                      </tbody>
                    </table>


                  </InfoWindow>

                }
              </Marker>

            )
          })

        }

        {
          this.state.mapLoad !== null && this.state.MarkerView == "Sharp Turn" && this.state.lat_sharp_turn.map((element, i) => {
            return (
              <Marker
                position={{
                  lat: parseFloat(element), lng: parseFloat(this.state.lng_sharp_turn[i])
                }}
                clickable={true}
                zIndex={1000}
                icon={{
                  url: Images.markerOverSpeed,
                  scaledSize: new window.google.maps.Size(25, 25)
                }}
                onClick={() => { this.onToggleOpen(i) }}
              >
                {typeof this.state.marker_isOpen[i] != 'undefined' && this.state.marker_isOpen[i] == true &&
                  <InfoWindow
                    position={{ lat: parseFloat(element), lng: parseFloat(this.state.lng_sharp_turn[i]) }}
                    onCloseClick={() => {
                      var object = this.state.marker_isOpen;
                      object[this.state.indexMarker] = false
                      this.setState({
                        marker_isOpen: object,
                        indexMarker: 0
                      })
                    }}
                  >
                    <table className="table-info-window">
                      <tbody>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("event")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>DLT Not Swipe card</small> */}
                            <small>{t("summary_56")}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("license_plate")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.sharp_turn.list[this.state.indexMarker].vehicle_id}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_79")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.sharp_turn.list[this.state.indexMarker].dtstart}</small> */}
                            <small>{moment(this.state.event.sharp_turn.list[this.state.indexMarker].dtstart).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_80")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.sharp_turn.list[this.state.indexMarker].dtstop}</small> */}
                            <small>{moment(this.state.event.sharp_turn.list[this.state.indexMarker].dtstop).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_81")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lat_sharp_turn[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_82")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lng_sharp_turn[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        {
                          /*<tr>
                          <td style={tdStyle1}>
                            <small>{t("realtime_11")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{(this.state.event.sharp_turn.list[this.state.indexMarker].speed_avg).toFixed(0)} {t("summary_44")}</small>
                          </td>
                        </tr>
                        {/* <tr>
                          <td style={tdStyle1}>
                            <small>Duration:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.dlt_wrongtype.list[this.state.indexMarker].total_distance}</small>
                          </td>
                        </tr> */}
                      </tbody>
                    </table>


                  </InfoWindow>

                }
              </Marker>

            )
          })

        }

        {
          this.state.mapLoad !== null && this.state.MarkerView == "Over Speed 60" && this.state.lat_over_60.map((element, i) => {
            //console.log(element)
            return (
              <Marker
                position={{
                  lat: parseFloat(element), lng: parseFloat(this.state.lng_over_60[i])
                }}
                clickable={true}
                zIndex={1000}
                icon={{
                  url: Images.markerOverSpeed,
                  scaledSize: new window.google.maps.Size(25, 25)
                }}
                onClick={() => { this.onToggleOpen(i) }}
              >
                {typeof this.state.marker_isOpen[i] != 'undefined' && this.state.marker_isOpen[i] == true &&
                  <InfoWindow
                    position={{ lat: parseFloat(element), lng: parseFloat(this.state.lng_over_60[i]) }}
                    onCloseClick={() => {
                      var object = this.state.marker_isOpen;
                      object[this.state.indexMarker] = false
                      this.setState({
                        marker_isOpen: object,
                        indexMarker: 0
                      })
                    }}
                  >
                    <table className="table-info-window">
                      <tbody>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("event")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>DLT Not Swipe card</small> */}
                            <small>{t("summary_58")}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("license_plate")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.over_60.list[this.state.indexMarker].vehicle_id}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_79")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.over_60.list[this.state.indexMarker].dtstart}</small> */}
                            <small>{moment(this.state.event.over_60.list[this.state.indexMarker].dtstart).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_80")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.over_60.list[this.state.indexMarker].dtstop}</small> */}
                            <small>{moment(this.state.event.over_60.list[this.state.indexMarker].dtstop).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_81")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lat_over_60[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_82")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lng_over_60[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        {
                          /*<tr>
                          <td style={tdStyle1}>
                            <small>{t("realtime_11")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{(this.state.event.over_60.list[this.state.indexMarker].speed_avg).toFixed(0)} {t("summary_44")}</small>
                          </td>
                        </tr>
                        {/* <tr>
                          <td style={tdStyle1}>
                            <small>Duration:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.dlt_wrongtype.list[this.state.indexMarker].total_distance}</small>
                          </td>
                        </tr> */}
                      </tbody>
                    </table>


                  </InfoWindow>

                }
              </Marker>

            )
          })

        }

        {
          this.state.mapLoad !== null && this.state.MarkerView == "Over Speed 80" && this.state.lat_over_80.map((element, i) => {
            return (
              <Marker
                position={{
                  lat: parseFloat(element), lng: parseFloat(this.state.lng_over_80[i])
                }}
                clickable={true}
                zIndex={1000}
                icon={{
                  url: Images.markerOverSpeed,
                  scaledSize: new window.google.maps.Size(25, 25)
                }}
                onClick={() => { this.onToggleOpen(i) }}
              >
                {typeof this.state.marker_isOpen[i] != 'undefined' && this.state.marker_isOpen[i] == true &&
                  <InfoWindow
                    position={{ lat: parseFloat(element), lng: parseFloat(this.state.lng_over_80[i]) }}
                    onCloseClick={() => {
                      var object = this.state.marker_isOpen;
                      object[this.state.indexMarker] = false
                      this.setState({
                        marker_isOpen: object,
                        indexMarker: 0
                      })
                    }}
                  >
                    <table className="table-info-window">
                      <tbody>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("event")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>DLT Not Swipe card</small> */}
                            <small>{t("summary_59")}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("license_plate")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.over_80.list[this.state.indexMarker].vehicle_id}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_79")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.over_80.list[this.state.indexMarker].dtstart}</small> */}
                            <small>{moment(this.state.event.over_80.list[this.state.indexMarker].dtstart).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_80")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.over_80.list[this.state.indexMarker].dtstop}</small> */}
                            <small>{moment(this.state.event.over_80.list[this.state.indexMarker].dtstop).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_81")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lat_over_80[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_82")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lng_over_80[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        {
                          /*<tr>
                          <td style={tdStyle1}>
                            <small>{t("realtime_11")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{(this.state.event.over_80.list[this.state.indexMarker].speed_avg).toFixed(0)} {t("summary_44")}</small>
                          </td>
                        </tr>
                        {/* <tr>
                          <td style={tdStyle1}>
                            <small>Duration:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.dlt_wrongtype.list[this.state.indexMarker].total_distance}</small>
                          </td>
                        </tr> */}
                      </tbody>
                    </table>


                  </InfoWindow>

                }
              </Marker>

            )
          })

        }

        {
          this.state.mapLoad !== null && this.state.MarkerView == "Over Speed 100" && this.state.lat_over_100.map((element, i) => {
            return (
              <Marker
                position={{
                  lat: parseFloat(element), lng: parseFloat(this.state.lng_over_100[i])
                }}
                clickable={true}
                zIndex={1000}
                icon={{
                  url: Images.markerOverSpeed,
                  scaledSize: new window.google.maps.Size(25, 25)
                }}
                onClick={() => { this.onToggleOpen(i) }}
              >
                {typeof this.state.marker_isOpen[i] != 'undefined' && this.state.marker_isOpen[i] == true &&
                  <InfoWindow
                    position={{ lat: parseFloat(element), lng: parseFloat(this.state.lng_over_100[i]) }}
                    onCloseClick={() => {
                      var object = this.state.marker_isOpen;
                      object[this.state.indexMarker] = false
                      this.setState({
                        marker_isOpen: object,
                        indexMarker: 0
                      })
                    }}
                  >
                    <table className="table-info-window">
                      <tbody>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("event")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>DLT Not Swipe card</small> */}
                            <small>{t("summary_60")}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("license_plate")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.over_100.list[this.state.indexMarker].vehicle_id}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_79")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.over_100.list[this.state.indexMarker].dtstart}</small> */}
                            <small>{moment(this.state.event.over_100.list[this.state.indexMarker].dtstart).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_80")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.over_100.list[this.state.indexMarker].dtstop}</small> */}
                            <small>{moment(this.state.event.over_100.list[this.state.indexMarker].dtstop).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_81")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lat_over_100[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_82")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lng_over_100[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        {
                          /*<tr>
                          <td style={tdStyle1}>
                            <small>{t("realtime_11")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{(this.state.event.over_100.list[this.state.indexMarker].speed_avg).toFixed(0)} {t("summary_44")}</small>
                          </td>
                        </tr>
                        {/* <tr>
                          <td style={tdStyle1}>
                            <small>Duration:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.dlt_wrongtype.list[this.state.indexMarker].total_distance}</small>
                          </td>
                        </tr> */}
                      </tbody>
                    </table>


                  </InfoWindow>

                }
              </Marker>

            )
          })
        }

        {
          this.state.mapLoad !== null && this.state.MarkerView == "Over Speed 120" && this.state.lat_over_120.map((element, i) => {
            return (
              <Marker
                position={{
                  lat: parseFloat(element), lng: parseFloat(this.state.lng_over_120[i])
                }}
                clickable={true}
                zIndex={1000}
                icon={{
                  url: Images.markerOverSpeed,
                  scaledSize: new window.google.maps.Size(25, 25)
                }}
                onClick={() => { this.onToggleOpen(i) }}
              >
                {typeof this.state.marker_isOpen[i] != 'undefined' && this.state.marker_isOpen[i] == true &&
                  <InfoWindow
                    position={{ lat: parseFloat(element), lng: parseFloat(this.state.lng_over_120[i]) }}
                    onCloseClick={() => {
                      var object = this.state.marker_isOpen;
                      object[this.state.indexMarker] = false
                      this.setState({
                        marker_isOpen: object,
                        indexMarker: 0
                      })
                    }}
                  >
                    <table className="table-info-window">
                      <tbody>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("event")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>DLT Not Swipe card</small> */}
                            <small>{t("summary_61")}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("license_plate")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.over_120.list[this.state.indexMarker].vehicle_id}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_79")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.over_120.list[this.state.indexMarker].dtstart}</small> */}
                            <small>{moment(this.state.event.over_120.list[this.state.indexMarker].dtstart).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_80")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            {/* <small>{this.state.event.over_120.list[this.state.indexMarker].dtstop}</small> */}
                            <small>{moment(this.state.event.over_120.list[this.state.indexMarker].dtstop).format('DD/MM/YYYY HH:mm:ss')}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_81")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lat_over_120[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdStyle1}>
                            <small>{t("summary_82")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.lng_over_120[this.state.indexMarker]}</small>
                          </td>
                        </tr>
                        {
                          /*<tr>
                          <td style={tdStyle1}>
                            <small>{t("realtime_11")}:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{(this.state.event.over_120.list[this.state.indexMarker].speed_avg).toFixed(0)} {t("summary_44")}</small>
                          </td>
                        </tr>
                        {/* <tr>
                          <td style={tdStyle1}>
                            <small>Duration:</small>
                          </td>
                          <td style={tdStyle2}>
                            <small>{this.state.event.dlt_wrongtype.list[this.state.indexMarker].total_distance}</small>
                          </td>
                        </tr> */}
                      </tbody>
                    </table>


                  </InfoWindow>

                }
              </Marker>

            )
          })

        }

        {/* {
          this.state.mapLoad !== null && this.state.lat_overspeed.map((element, i) => {
            return (
              <Marker position={{ lat: parseFloat(element), lng: parseFloat(this.state.lng_overspeed[i]) }}>

              </Marker>
            )
          })

        } */}


      </GoogleMap>
      //  </LoadScript>
      // </Row >
    )
  }
}

const mapStateToProps = (state) => ({
  language: state.versatile.language,
  dataLogin: state.signin.dataLogin,
  events: state.realtime.events,
  focusPosition: state.realtime.focusPosition,
  information: state.realtime.information,
  hideFooter: state.realtime.hideFooter,
  activeMap: state.realtime.activeMap,
  zoom: state.realtime.zoom,
  stateMapControl: state.realtime.stateMapControl,
  activeVid: state.realtime.activeVid,
});

const mapDispatchToProps = (dispatch) => ({
  // getInitialTruckData: () => dispatch(RealtimeActions.getInitialTruckData()),
  // gpsUpdate: (update) => dispatch(RealtimeActions.gpsUpdate(update)),
  // getInformation: (vid) => dispatch(RealtimeActions.getInformation(vid)),
  // setInformation: (information) => dispatch(RealtimeActions.setInformation(information)),
  // setHideFooter: () => dispatch(RealtimeActions.setHideFooter()),
  // setActiveMap: (activeMap) => dispatch(RealtimeActions.setActiveMap(activeMap)),
  setZoomMap: (zoom) => dispatch(RealtimeActions.setZoomMap(zoom)),
  // getInitialDriverData: () => dispatch(RealtimeActions.getInitialDriverData()),
  getGeofenceByTypes: (GeofenceTypeIds) => dispatch(RealtimeActions.getGeofenceByTypes(GeofenceTypeIds)),
  setStateReduxRealtime: (name, value) => dispatch(RealtimeActions.setStateReduxRealtime(name, value)),
  setFocusPosition: (lat, lng) => dispatch(RealtimeActions.setFocusPosition(lat, lng)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map)

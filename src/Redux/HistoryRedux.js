import { createReducer, createActions } from 'reduxsauce'
import Immutable, { from } from 'seamless-immutable'
import { moment } from 'moment'
import { momentDate } from '../Functions/DateMoment'
const { get } = require('lodash')

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getHistory: ['vid', 'startDate', 'endDate'],
  setHistory: ['dataHistory'],
  setHideFooterHis: [],
  setFocusLocation: ['lat', 'lng'],
  setTailActive: ['tailActive', 'eventId'],
  getListMember: ['user_id', 'cust_id'],
  getListMemberSuccess: ['listMember'],
  setImgMap: ['imgMap', 'buttonPrint'],
  setClear: ['dataHistory'],
  setPointValue: ['pointValue'],
  setMarkTour: ['markTourInfo'],
  setDefaultMarkTour: [],
  setChartCurrent: ['chartName'],
  setStateReduxHistory: ['name', 'value'],
  setDefaultReduxHistory: [],
  getHistoryTrip: ['vid', 'startDate', 'endDate'],
  setHistoryTrip: ['data'],
  getHistoryGps: ['imei', 'speedLimit', 'startDate', 'endDate', 'tripIndex'],
  setHistoryGps: ['data', 'tripIndex'],
  setDataAllPoint: [],
  setMapState: ['positionMarker', 'infoMarker', 'infoType'],
  setShowVehicleInfoStatus: ['isShow'],
  setShowObject: ['isShow'],
  setShowBoxSearch: ['isShow'],
  setShowChart: ['chartIdList'],
  setMarkerInteractiveChart: ['data'],
  setRenderChart: ['isRender'],
  setCompanyList: ['companyList'],
  setCookiesValue: ['name', 'value']
})

export const HistoryTypes = Types

export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  hideFooterHis: false,
  dataHistory: null,
  focusLocation: { lat: '', lng: '' },
  tailActive: [],
  playTourAction: '',
  speed: 1,
  listMember: [],
  imgMap: null,
  buttonPrint: false,
  loading: false,
  markTourInfo: {
    index: 0,
    location: { lat: 0, lng: 0 },
    course: 0,
    isMarkPlay: false
  },
  pointValue: { speed: '', rpm: '', fuel: '', canbus_cooltemp: '', canbus_acc_pedal: '', temp: '', date: '' },
  chartCurrent: '',
  eventId: null,
  searchHistoryStatus: false,
  dataTrip: {},
  dataAllPointTemp: [],
  dataAllPoint: [],
  mapState: {
    positionMarker: null,
    infoMarker: null,
    infoType: 1
  },
  positionMarker: {},
  chartColors: {},
  showVehicleInfoStatus: true,
  showObject: false,
  showBoxSearch: true,
  dateVisualRange: [],
  showChartList: [1, 2, 3, 4, 5, 6, 7],
  showChartListTemp: [1, 2, 3, 4, 5, 6, 7],
  MarkerInteractiveData: {},
  renderChart: false,
  companyList: [],
  // customerSelect: [],
  // showNameSelect: [],
  // vehicleSelect: [],
  rangeStartDate: [],
  rangeEndDate: [],
  rangeDate: [],
  fileNameDate: ""
})

/* ------------- Reducers ------------- */
export const setCookiesValue = (state, { name, value }) => { return state.merge({ [name]: value }) }


export const setDataAllPoint = (state, { }) => {
  return state.merge({ dataAllPoint: [], dataAllPointTemp: [], MarkerInteractiveData: {} })
}

export const setFocusLocation = (state, { lat, lng }) => {
  let focusLocation = { lat, lng }
  return state.merge({ focusLocation })
}

export const setTailActive = (state, { tailActive, eventId }) => {
  return state.merge({ tailActive, eventId })
}

export const setHideFooterHis = (state, { }) => {
  return state.merge({ hideFooterHis: !state.hideFooterHis })
}

export const getHistory = (state, { vid, startDate, endDate }) => {
  return state.merge({
    loading: true,
    searchHistoryStatus: false,
    tailActive: [],
    eventId: null,
    dataHistory: {},
    buttonPrint: true,
    dataAllPoint: [],
    dateVisualRange: [momentDate(startDate, "YYYY-MM-DD HH:mm:ss"), momentDate(endDate, "YYYY-MM-DD HH:mm:ss")],
    MarkerInteractiveData: {}
  })
}

export const setHistory = (state, { dataHistory }) => {
  // set data All point
  let dataAllPoint = []
  if (dataHistory !== null) {
    // console.log("REDUX dataHistory : ", dataHistory)
    let temp_limit = get(dataHistory, "info.temp_limit", 0)
    for (let index in dataHistory.trips) {
      let speed_limit = dataHistory.trips[index][20]
      for (let locateIndex in dataHistory.trips[index][29]) {
        let location = dataHistory.trips[index][29][locateIndex]
        dataAllPoint.push({
          gpsdate: location[0],
          acc: location[8],
          location: { 'lat': location[2] || 0, 'lng': location[3] || 0 },
          course: location[10],
          speed: location[4] || 0,
          rpm: location[38] || 0,
          fuel: location[42],
          coolant: location[39],
          admin_level1_name: location[19],
          admin_level2_name: location[20],
          admin_level3_name: location[21],
          driver_cards_name: location[52],
          lat: location[2],
          lng: location[3],
          time: location[0],
          canbus_fuel_cons: location[40],
          canbus_foot_brake: parseInt(location[45]) == 1 ? 5 : 0,
          canbus_exhaust_brake: parseInt(location[46]) == 1 ? 4 : 0,
          canbus_dtc_engine: parseInt(location[49]) == 1 ? 3 : 0,
          canbus_clutch_switch: parseInt(location[48]) == 1 ? 2 : 0,
          canbus_cooltemp: location[39],
          canbus_acc_pedal: location[43],
          temperatures: location[67],
          speed_limit,
          temp_limit
        })
      }
    }
  }

  return state.merge({
    dataHistory,
    loading: false,
    searchHistoryStatus: true,
    buttonPrint: true,
    dataAllPoint,
    hideFooterHis: false,
    chartColors: get(dataHistory, "info.chart_colors", {})
  })
}

export const getListMember = (state, { }) => {
  return state.merge({})
}
export const getListMemberSuccess = (state, { listMember }) => {
  return state.merge({ listMember })
}

export const setImgMap = (state, { imgMap, buttonPrint }) => {

  return state.merge({ imgMap, buttonPrint })
}

export const setClear = (state, { dataHistory }) => {

  return state.merge({ dataHistory: null })
}

//#region Play Tour Commponent

export const setPointValue = (state, { pointValue }) => {
  return state.merge({ pointValue })
}

export const setMarkTour = (state, { markTourInfo }) => {
  let pointValue = {
    speed: markTourInfo.speed,
    rpm: markTourInfo.rpm,
    fuel: markTourInfo.fuel,
    canbus_cooltemp: markTourInfo.canbus_cooltemp,
    canbus_acc_pedal: markTourInfo.canbus_acc_pedal,
    date: markTourInfo.gpsdate,
    temp: markTourInfo.gpsdate
  }

  let markTour = {
    index: markTourInfo.index,
    location: markTourInfo.location,
    course: markTourInfo.course,
    isMarkPlay: true,
  }


  return state.merge({ markTourInfo: markTour, pointValue, renderChart: false })
}


export const setDefaultMarkTour = (state, { }) => {

  let markDefault = {
    index: 0,
    location: { lat: 0, lng: 0 },
    course: 0,
    isMarkPlay: false
  }
  return state.merge({ markTourInfo: markDefault })
}


export const setChartCurrent = (state, { chartName }) => {
  return state.merge({ chartCurrent: chartName })
}

export const setStateReduxHistory = (state, { name, value }) => {

  return state.merge({ [name]: value })
}
export const setDefaultReduxHistory = (state) => {

  return INITIAL_STATE
}


//#region HISTORY TRIP NEW 02-05-2020
export const getHistoryTrip = (state) => {
  // return state.merge({ loading: true, tailActive: [], eventId: null, dataHistory: null, buttonPrint: true })
  return state.merge({ loading: true, dataTrip: {}, buttonPrint: true, dataAllPoint: [], dataAllPointTemp: [] })
}

export const setHistoryTrip = (state, { data }) => {
  return state.merge({ buttonPrint: true, dataTrip: data })
}

export const getHistoryGps = (state) => {
  // return state.merge({ loading: true, tailActive: [], eventId: null, dataHistory: null, buttonPrint: true })
  // return state.merge({ loading: true })
  return state.merge({ loading: true })
}

export const setHistoryGps = (state, { data, tripIndex }) => {
  let _dataAllPointTemp = JSON.parse(JSON.stringify(state.dataAllPointTemp))
  let _dataAllPoint = JSON.parse(JSON.stringify(state.dataAllPoint))

  let dataOfTrip = []
  for (let index in data) {
    let info = data[index]
    dataOfTrip.push({
      gpsdate: info[0],
      location: { 'lat': info[2] || 0, 'lng': info[3] || 0 },
      course: info[10],
      speed: info[4] || 0,
      rpm: info[38] || 0,
      fuel: info[42],
      coolant: info[39]
    })
  }

  _dataAllPointTemp.push([
    {
      "tripIndex": tripIndex,
      "data": [...dataOfTrip]
    }
  ])

  let loading = true
  if (state.dataTrip.trips.length === _dataAllPointTemp.length) {
    // console.log("GET DATA ALL TRIP COMPLETE")

    let tripIndexData = []
    _dataAllPointTemp.map((trip, index) => {
      tripIndexData.push(
        {
          "tripIndex": trip[0].tripIndex,
          "dataIndex": index
        }
      )
    })
    // console.log("tripIndexData : ", tripIndexData)
    tripIndexData.sort(function (a, b) { return a.tripIndex - b.tripIndex })

    // console.log("_dataAllPointTemp : ", _dataAllPointTemp)
    tripIndexData.map((trip, index) => {
      _dataAllPoint.push(_dataAllPointTemp[trip.dataIndex][0].data)
    })
    loading = false
  }

  return state.merge({ loading, buttonPrint: true, dataAllPoint: _dataAllPoint, dataAllPointTemp: _dataAllPointTemp })
}
//#endregion



//#endregion
export const setMapState = (state, { positionMarker, infoMarker, infoType }) => {
  let _mapState = JSON.parse(JSON.stringify(state.mapState))
  // _mapState.positionMarker = positionMarker
  _mapState.infoMarker = infoMarker
  _mapState.infoType = infoType

  return state.merge({ mapState: _mapState })
}

export const setShowVehicleInfoStatus = (state, { isShow }) => {
  return state.merge({ showVehicleInfoStatus: isShow })
}
export const setShowObject = (state, { isShow }) => {
  return state.merge({ showObject: isShow })
}
export const setShowBoxSearch = (state, { isShow }) => {
  return state.merge({ showBoxSearch: isShow })
}
export const setShowChart = (state, { chartIdList }) => {
  return state.merge({ showChartList: chartIdList, showChartListTemp: chartIdList })
}
export const setMarkerInteractiveChart = (state, { data }) => {
  return state.merge({ MarkerInteractiveData: data })
}
export const setRenderChart = (state, { isRender }) => {
  return state.merge({ renderChart: isRender })
}
export const setCompanyList = (state, { companyList }) => {
  return state.merge({ companyList })
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_HIDE_FOOTER_HIS]: setHideFooterHis,
  [Types.SET_TAIL_ACTIVE]: setTailActive,
  [Types.GET_HISTORY]: getHistory,
  [Types.SET_HISTORY]: setHistory,
  [Types.SET_FOCUS_LOCATION]: setFocusLocation,
  [Types.GET_LIST_MEMBER]: getListMember,
  [Types.GET_LIST_MEMBER_SUCCESS]: getListMemberSuccess,
  [Types.SET_IMG_MAP]: setImgMap,
  [Types.SET_CLEAR]: setClear,
  [Types.SET_POINT_VALUE]: setPointValue,
  [Types.SET_MARK_TOUR]: setMarkTour,
  [Types.SET_DEFAULT_MARK_TOUR]: setDefaultMarkTour,
  [Types.SET_CHART_CURRENT]: setChartCurrent,
  [Types.SET_STATE_REDUX_HISTORY]: setStateReduxHistory,
  [Types.SET_DEFAULT_REDUX_HISTORY]: setDefaultReduxHistory,
  [Types.GET_HISTORY_TRIP]: getHistoryTrip,
  [Types.SET_HISTORY_TRIP]: setHistoryTrip,
  [Types.GET_HISTORY_GPS]: getHistoryGps,
  [Types.SET_HISTORY_GPS]: setHistoryGps,
  [Types.SET_DATA_ALL_POINT]: setDataAllPoint,
  [Types.SET_MAP_STATE]: setMapState,
  [Types.SET_SHOW_VEHICLE_INFO_STATUS]: setShowVehicleInfoStatus,
  [Types.SET_SHOW_OBJECT]: setShowObject,
  [Types.SET_SHOW_BOX_SEARCH]: setShowBoxSearch,
  [Types.SET_SHOW_CHART]: setShowChart,
  [Types.SET_MARKER_INTERACTIVE_CHART]: setMarkerInteractiveChart,
  [Types.SET_RENDER_CHART]: setRenderChart,
  [Types.SET_COMPANY_LIST]: setCompanyList,
  [Types.SET_COOKIES_VALUE]: setCookiesValue,
})

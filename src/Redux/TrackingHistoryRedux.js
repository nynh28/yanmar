import FormFeedback from 'reactstrap/lib/FormFeedback'
import { createReducer, createActions } from 'reduxsauce'
import Immutable, { from } from 'seamless-immutable'
import { getData, getData2 } from '../Containers/TrackingHistory/Objects/data'
import moment from 'moment';
import { mappingField } from '../Containers/TrackingHistory/Functions'

const { get } = require('lodash')
const data1 = getData()
const data2 = getData2()
const todayStart = moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
const todayEnd = moment().set({ hour: 23, minute: 59, second: 59, millisecond: 59 })
/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  setHistoryData: ['data'],
  getHistoryData: ['data'],
  setZoom: ['zoomLevel'],
  setEventPercent: ['percent'],
  setAfterZoomChart: ['value'],
  setValue: ['name', 'value'],
  setPlay: [],
  setStateTracking: ['object'],
  setDefaultReduxTrackingHistory: []
})

export const TrackingHistoryTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({

  //#region COMMON
  eventName: {
    en: {
      "1": "Driving",
      "2000": "Ign. OFF",
      "3": "Idling",
      "5": "Over Speed",
      "7": "Harsh Start",
      "9": "Harsh Acceleration",
      "14": "Harsh Brake",
      "21": "Harsh Turn",
      "1001": "Fence In",
      "1002": "Fence Out",
      "1010": "Slash Card In",
      "1011": "Slash Card Out",
      "20000": "SOS",
      "20001": "Engine Oil"
    },
    th: {
      "1": "ขับขี่",
      "2000": "ดับเครื่อง",
      "3": "จอดไม่ดับเครื่อง",
      "5": "ความเร็วเกิน",
      "7": "ออกตัวกะทันหัน",
      "9": "เร่งความเร็วกะทันหัน",
      "14": "เบรกกะทันหัน",
      "21": "เลี้ยวรุนแรง",
      "1001": "เข้าพื้นที่",
      "1002": "ออกนอกพื้นที่",
      "1010": "รูดบัตรขับรถ",
      "1011": "รูดบัตรเลิกขับ",
      "20000": "SOS",
      "20001": "Engine Oil"
    },
    ja: {
      "1": "走行中",
      "2000": "Ign. OFF",
      "3": "アイドリング",
      "5": "速度超過",
      "7": "急発進",
      "9": "急加速",
      "14": "急ブレーキ",
      "21": "急旋回",
      "1001": "エリアに入る",
      "1002": "外側のエリア",
      "1010": "スラッシュカード",
      "1011": "カードを切り落とす",
      "20000": "SOS",
      "20001": "Engine Oil"
    }
  },
  event_id_list: [7, 9, 14, 21, 1001, 1002, 1010, 1011, 2000, 20001],
  subRootTrip: [3, 5, 7, 9, 14, 21, 1001, 1002, 1010, 1011, 2000, 20001],
  listImageSelected: [],
  indexImage: -1,
  listImages: [],
  indexOpen: [],

  //#endregion

  //#region DATA TRIP && DETAIL
  isLoadingTrips: false,
  dataTrips: [],
  dataAllPoint: [],
  dataMapPoint: [],
  detailTrip: [],
  indexTripSelected: [],
  speed_limit: 0,
  temp_limit: 0,
  isRenderChart: false,
  tailActive: [],
  rpm_zone: [],
  option_temperature: [],
  //#endregion

  //#region MAP CONTROL
  zoomLevel: 5,
  eventPercent: 184,
  eventVisibled: true,
  objectVisibled: true,
  legendVisibled: true,
  imageVisibled: true,
  geofenesVisibled: [],
  mapType: "roadmap",
  geofences: [],
  //#endregion

  //#region

  //#region PLAY TOUR
  playing: false,
  indexPlaying: 0,
  //#endregion

  //#region  MARKER INTRACTIVE CHART
  MarkerInteractiveData: {},
  defaultVisualRange: [],
  isRefreshChart: false,
  afterZoomChart: [],
  //#endregion

  //#region Filter
  vehicle_name: "เลขตัวรถ",
  vin_no: "",
  dateStart: todayStart.format('DD/MM/YYYY HH:mm'),
  dateEnd: todayEnd.format('DD/MM/YYYY HH:mm'),
  defaultSelectKey: [],
  isWarning: false,
  listMembers: [],
  listMembersAll: [],
  dealerData: [],
  modelList: [],
  chassisNoList: [],
  chassisNo: [],
  engineNoList: [],
  selectDealer: "",
  currentValue: "",
  customerList: [],
  customerId: 0,
  showName: 'เลขตัวรถ',
  vehicleNameDisplay: '',
  fleetList: [],
  fleetId: "",
  //#endregion

  //#region FOR DEATAIL TRIP
  tripRange: {},
  //#endregion

  //#region POPOVER SETTING
  chartVisibled: [1, 2, 6, 5, 9, 8],
  speedVisibled: 1,
  timeTour: 1200,
  //#endregion

  //#region GEOFENCE
  geofenceByTypes: [],
  geofenceDetail: null,
  cssChart: "small-chart"
  //#region
})

/* ------------- Reducers ------------- */
export const setHistoryData = (state, { data }) => {
  // console.log("data: ", data)
  let dataMap = [], listImages = [], indexOpen = [], openKey = 0

  for (let index in data) {
    // console.log(data[index][7])
    let image = [], take_photo_time = "", lat = "", lng = "", course = ""

    lat = data[index][2]
    lng = data[index][3]
    course = data[index][7]

    for (let idx in data[index][31]) {
      let dt = data[index][31][idx]
      take_photo_time = dt[2]
      image.push({
        channel: dt[0],
        url: dt[1],
        take_photo_time: dt[2],
        lat,
        lng,
        course
      })
    }

    if (image.length > 0) {
      indexOpen.push(openKey)
      listImages.push({
        take_photo_time,
        channelList: image
      })
      openKey++
    }

    dataMap.push({
      lat: data[index][2],
      lng: data[index][3],
      course: data[index][7],
      image
    })
  }
  const removeDuplicatesFromArray = (arr) => [...new Set(
    arr.map(el => JSON.stringify(el))
  )].map(e => JSON.parse(e));

  let dataNotDuplicate = removeDuplicatesFromArray(dataMap)
  let speed_limit = 0, temp_limit = 0
  if (state.dataTrips.length > 0) {
    speed_limit = state.dataTrips[0][7]
    temp_limit = state.dataTrips[0][18]
  }

  return state.merge({
    indexPlaying: 0,
    isRefreshChart: false,
    defaultVisualRange: [moment(state.dateStart, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'), moment(state.dateEnd, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')],
    eventPercent: 184,
    playing: false,
    detailTrip: data,
    dataAllPoint: mappingField(data, speed_limit, temp_limit),
    dataMapPoint: [...removeDuplicatesFromArray(dataNotDuplicate)],
    listImages,
    indexOpen
  })
}

export const getHistoryData = (state, { data }) => {
  // console.log("getHistoryData Redux : ")
  const removeDuplicatesFromArray = (arr) => [...new Set(
    arr.map(el => JSON.stringify(el))
  )].map(e => JSON.parse(e));

  let dataAllPoint = data == 1 ? data1 : data2
  let dataMapPoint = data == 1 ? data1 : data2

  return state.merge({
    eventPercent: 184,
    playing: false,
    dataAllPoint: [...dataAllPoint],
    dataMapPoint: [...removeDuplicatesFromArray(dataMapPoint)]
  })
}
export const setAfterZoomChart = (state, { value }) => {
  let _afterZoomChart = JSON.parse(JSON.stringify(state.afterZoomChart))
  _afterZoomChart.push(value)

  let _value = [...new Set(_afterZoomChart)];


  return state.merge({ afterZoomChart: _value })
}

export const setZoom = (state, { zoomLevel }) => { return state.merge({ zoomLevel }) }
export const setEventPercent = (state, { percent }) => { return state.merge({ eventPercent: percent }) }
export const setValue = (state, { name, value }) => {
  return state.merge({
    [name]: value
  })
}
export const setPlay = (state, { }) => { return state.merge({ playing: !state.playing }) }
export const setDefaultReduxTrackingHistory = () => { return INITIAL_STATE }

export const setStateTracking = (state, { object }) => {
  return state.merge(object)
}
/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_HISTORY_DATA]: setHistoryData,
  [Types.GET_HISTORY_DATA]: getHistoryData,
  [Types.SET_VALUE]: setValue,
  [Types.SET_ZOOM]: setZoom,
  [Types.SET_EVENT_PERCENT]: setEventPercent,
  [Types.SET_PLAY]: setPlay,
  [Types.SET_DEFAULT_REDUX_TRACKING_HISTORY]: setDefaultReduxTrackingHistory,
  [Types.SET_AFTER_ZOOM_CHART]: setAfterZoomChart,
  [Types.SET_STATE_TRACKING]: setStateTracking
})

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import moment from 'moment';
/* ------------- Types and Action Creators ------------- */
const todayStart = moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
const todayEnd = moment().set({ hour: 23, minute: 59, second: 59, millisecond: 59 })

const { Types, Creators } = createActions({
  getDataUser: ['id', 'groupType'],
  getEventData: [],
  getEventDataSuccess: ['events'],
  getMessageCount: [],
  getMessageCountSuccess: ['messageCount'],
  getDetailMessage: ['id'],
  getDetailMessageSuccess: ['detailEvent'],
  setDetailEvent: [],
  setToastEvent: ['toastEvent'],

  // >> NEW <<
  resetTempData: [],
  setMessageList: ['messageList'],
  setMessageInfo: ['data'],
  setUnreadTotal: ['total'],
  setReadMessage: ['isRead'],
  setMessageData: ['data', 'searchData', 'languageLocation'],
  setDefaultFilter: [],
  setStateMapControlNoti: ['name', 'value'],
  setDefaultReduxNotification: [],
  setNotificationVisibled: ['visible'],
  setStateNotification: ['object'],
  setValue: ['name', 'value'],

})

export const NotificationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  events: null,
  messageCount: 0,
  detailEvent: null,
  toastEvent: null,
  messageList: [],
  messageInfo: {},
  unreadTotal: 0,
  isReadMessage: false,
  messageData: [],
  events: [],
  searchData: {},
  mapType: "roadmap",
  geofencesEnabled: [],
  languageLocation: "",
  notificationVisibled: true,
  dealerData: [],
  modelList: [],
  chassisNoList: [],
  engineNoList: [],
  showName: 'รุ่นรถ',
  selectDealer: "",
  currentValue: "",
  byModelCode: [],
  dateRangeFilter: {
    dateStart: todayStart.format('DD/MM/YYYY HH:mm'),
    dateEnd: todayEnd.format('DD/MM/YYYY HH:mm')
  },
  isLoadingVehicles: true,
  eventSelected: [],
})

/* ------------- Reducers ------------- */
export const setValue = (state, { name, value }) => { return state.merge({ [name]: value }) }

export const resetTempData = (state) => {
  return state.merge({ messageList: [], messageInfo: [], messageData: [], searchData: {}, unreadTotal: 0, languageLocation: "" })
}
export const setDefaultFilter = (state) => {
  return state.merge({ searchData: {}, messageData: [] })
}

export const setStateMapControlNoti = (state, { name, value }) => {
  return state.merge({ [name]: value })
}

export const getDataUser = (state, { id, groupType }) => {
  return state.merge({})
}

export const getEventData = (state) => {
  return state.merge({})
}

export const getEventDataSuccess = (state, { events }) => {
  return state.merge({ events })
}

export const getMessageCount = (state, { }) => {
  return state.merge({})
}
export const getMessageCountSuccess = (state, { messageCount }) => {
  return state.merge({ messageCount: state.messageCount + messageCount })
}

export const getDetailMessage = (state, { }) => {
  return state.merge({})
}
export const getDetailMessageSuccess = (state, { detailEvent }) => {
  return state.merge({ detailEvent })
}

export const setDetailEvent = (state, { }) => {
  return state.merge({ detailEvent: null })
}

export const setToastEvent = (state, { toastEvent }) => {
  // console.log('toastEvent', toastEvent)

  return state.merge({ toastEvent: toastEvent })
}

export const setMessageList = (state, { messageList }) => {
  return state.merge({ messageList })
}

export const setMessageInfo = (state, { data }) => {
  return state.merge({ messageInfo: data })
}

export const setUnreadTotal = (state, { total }) => {
  return state.merge({ unreadTotal: total })
}

export const setReadMessage = (state, { isRead }) => {
  return state.merge({ isReadMessage: isRead })
}

export const setMessageData = (state, { data, searchData, languageLocation }) => {
  return state.merge({ messageData: data, searchData, languageLocation })
}
export const setNotificationVisibled = (state, { visible }) => {
  return state.merge({ notificationVisibled: visible })
}

export const setDefaultReduxNotification = (state) => {
  return INITIAL_STATE
}
export const setStateNotification = (state, { object }) => {
  console.log(object)
  return state.merge(object)
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET_TEMP_DATA]: resetTempData,
  [Types.GET_DATA_USER]: getDataUser,
  [Types.GET_EVENT_DATA]: getEventData,
  [Types.GET_EVENT_DATA_SUCCESS]: getEventDataSuccess,
  [Types.GET_MESSAGE_COUNT]: getMessageCount,
  [Types.GET_MESSAGE_COUNT_SUCCESS]: getMessageCountSuccess,
  [Types.GET_DETAIL_MESSAGE]: getDetailMessage,
  [Types.GET_DETAIL_MESSAGE_SUCCESS]: getDetailMessageSuccess,
  [Types.SET_DETAIL_EVENT]: setDetailEvent,
  [Types.SET_TOAST_EVENT]: setToastEvent,
  [Types.SET_MESSAGE_LIST]: setMessageList,
  [Types.SET_MESSAGE_INFO]: setMessageInfo,
  [Types.SET_UNREAD_TOTAL]: setUnreadTotal,
  [Types.SET_READ_MESSAGE]: setReadMessage,
  [Types.SET_MESSAGE_DATA]: setMessageData,
  [Types.SET_DEFAULT_FILTER]: setDefaultFilter,
  [Types.SET_STATE_MAP_CONTROL_NOTI]: setStateMapControlNoti,
  [Types.SET_NOTIFICATION_VISIBLED]: setNotificationVisibled,
  [Types.SET_DEFAULT_REDUX_NOTIFICATION]: setDefaultReduxNotification,
  [Types.SET_STATE_NOTIFICATION]: setStateNotification,
  [Types.SET_VALUE]: setValue,
})

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getGeofenceByTypesSum: ['GeofenceTypeIds'],
  setGeofenceByTypesSum: ['geofenceByTypes'],
  getGeofenceDetailSum: ['geofenceId'],
  setGeofenceDetailSum: ['geofenceDetail'],
  setStateReduxSummary: ['objState'],
  setDefaultReduxSummary: [],
  setIsLoadingEvent: ['data'],
  setPercentLoading: ['data'],
  setEventData: ['data'],
  setInfoWindowIndex: ['id'],
  setLoadingSummary: ['isLoadingSummary'],
})

export const SummaryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  stateMapControl: {},
  geofenceDetail: {},
  isLoadingevent: false,
  percentLoading: 0,
  eventData: [],
  eventDataSummary: [],
  infoWindowIndex: null,
  isLoadingSummary: false
})

/* ------------- Reducers ------------- */
export const getGeofenceByTypesSum = (state, { }) => {
  return state.merge({})
}

export const setGeofenceByTypesSum = (state, { geofenceByTypes }) => {
  return state.merge({ geofenceByTypes })
}

export const getGeofenceDetailSum = (state, { }) => {
  return state.merge({})
}
export const setGeofenceDetailSum = (state, { geofenceDetail }) => {
  return state.merge({ geofenceDetail })
}

export const setStateReduxSummary = (state, { objState }) => {
  return state.merge(objState)
}

export const setIsLoadingEvent = (state, { data }) => {
  return state.merge({ isLoadingevent: data })
}

export const setPercentLoading = (state, { data }) => {
  return state.merge({ percentLoading: data })
}

export const setEventData = (state, { data }) => {
  return state.merge({ eventDataSummary: data })
}

export const setInfoWindowIndex = (state, { id }) => {
  return state.merge({ infoWindowIndex: id })
}

export const setDefaultReduxSummary = (state, { }) => {
  return INITIAL_STATE
}

export const setLoadingSummary = (state, { isLoadingSummary }) => {
  return state.merge({ isLoadingSummary })
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_GEOFENCE_BY_TYPES_SUM]: getGeofenceByTypesSum,
  [Types.SET_GEOFENCE_BY_TYPES_SUM]: setGeofenceByTypesSum,
  [Types.GET_GEOFENCE_DETAIL_SUM]: getGeofenceDetailSum,
  [Types.SET_GEOFENCE_DETAIL_SUM]: setGeofenceDetailSum,
  [Types.SET_STATE_REDUX_SUMMARY]: setStateReduxSummary,
  [Types.SET_DEFAULT_REDUX_SUMMARY]: setDefaultReduxSummary,
  [Types.SET_IS_LOADING_EVENT]: setIsLoadingEvent,
  [Types.SET_PERCENT_LOADING]: setPercentLoading,
  [Types.SET_EVENT_DATA]: setEventData,
  [Types.SET_INFO_WINDOW_INDEX]: setInfoWindowIndex,
  [Types.SET_LOADING_SUMMARY]: setLoadingSummary,
})

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setDefaultReduxGeofenceReport: [],
  setValue: ['name', 'value'],
  setDateRang: ['dateStart', 'dateEnd'],
})

export const GeofenceReportTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  reportSelect: "0",
  customerLists: [],
  customerSelect: [],
  fleetLists: [],
  fleetSelect: [],
  dateStart: "",
  dateEnd: "",
  duration: 72,
  mileage: 2000,
  geofenceReportTemp: [],
  isLoading: false,
  gridInfo: {
    columnConfig: [],
    reportName: "",
    dateStart: "",
    dateEnd: "",
  }
})

/* ------------- Reducers ------------- */
export const setValue = (state, { name, value }) => { return state.merge({ [name]: value }) }

export const setDateRang = (state, { dateStart, dateEnd }) => {
  return state.merge({ dateStart, dateEnd })
}

export const setDefaultReduxGeofenceReport = (state, { }) => {
  return INITIAL_STATE
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_DEFAULT_REDUX_GEOFENCE_REPORT]: setDefaultReduxGeofenceReport,
  [Types.SET_VALUE]: setValue,
  [Types.SET_DATE_RANG]: setDateRang,

})
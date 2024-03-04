import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setDefaultReduxMaintenanceHistory: [],
  setStateMaintenanceHistory: ['object'],
  setValue: ['name', 'value'],
  setHistoryData: ['data', 'searchData', 'languageLocation']
})

export const MaintenanceHistoryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isLoadingMaintenance: false,
  dataMaintanance: [],

  //#region Filter
  listVehicles: [],
  vehicle_name: "history_1",
  endDate: "",
  vin_no: "",
  vin_no_search: "",
  xlsx_vehicle_name: "",
  xlsx_license_plate_no: "",
  vin_no_search: "",
  listMembers: [],
  listMembersAll: [],
  dealerData: [],
  modelList: [],
  chassisNoList: [],
  engineNoList: [],
  historyShowName: 'รุ่นรถ',
  currentValue: "",
  byModelCode: [],
  historyData: []
  //#endregion
})


/* ------------- Reducers ------------- */
export const setDefaultReduxMaintenanceHistory = () => { return INITIAL_STATE }
export const setValue = (state, { name, value }) => { return state.merge({ [name]: value }) }
export const setStateMaintenanceHistory = (state, { object }) => {
  console.log(object)
  return state.merge(object)
}
export const setHistoryData = (state, { data, searchData, languageLocation }) => {
  return state.merge({ historyData: data, searchData, languageLocation })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_DEFAULT_REDUX_MAINTENANCE_HISTORY]: setDefaultReduxMaintenanceHistory,
  [Types.SET_VALUE]: setValue,
  [Types.SET_STATE_MAINTENANCE_HISTORY]: setStateMaintenanceHistory,
  [Types.SET_HISTORY_DATA]: setHistoryData,
})

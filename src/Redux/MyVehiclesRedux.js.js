import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import moment from 'moment';

/* ------------- Types and Action Creators ------------- */
const todayStart = moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
const todayEnd = moment().set({ hour: 23, minute: 59, second: 59, millisecond: 59 })

const { Types, Creators } = createActions({
  setIsLoadingVehicles: ['isLoading'],
  setDealerData: ['data'],
  setCustomerOfMyVehicles: ['data'],
  setFleetData: ['data'],
  setVehicleData: ['data', 'object', 'headerData'],
  setDateRange: ['startDate', 'stopDate'],
  updateSearchDataMyVehicles: ['array'],
  setDefaultReduxMyVehicles: [],
  setValue: ['name', 'value'],
  setStateMyVehicle: ['object'],
})

export const MyVehiclesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isLoadingVehicles: true,
  dealerData: [],
  modelList: [],
  chassisNoList: [],
  engineNoList: [],
  vehicleData: [],
  showName: "รุ่นรถ",
  selectDealer: "",
  currentValue: "",
  dateRangeFilter: {
    dateStart: todayStart.format('DD/MM/YYYY HH:mm'),
    dateEnd: todayEnd.format('DD/MM/YYYY HH:mm')
  }
})


/* ------------- Reducers ------------- */
export const setValue = (state, { name, value }) => { return state.merge({ [name]: value }) }

export const setIsLoadingVehicles = (state, { isLoading }) => {
  return state.merge({ isLoadingVehicles: isLoading })
}

export const setDealerData = (state, { data }) => {
  return state.merge({ dealerData: data })
}

export const setCustomerOfMyVehicles = (state, { data }) => {
  return state.merge({ customerData: data })
}

export const setFleetData = (state, { data }) => {
  // console.log('setFleetData ==> data', data)
  return state.merge({ fleetData: data })
}

export const setVehicleData = (state, { data, object, headerData }) => {
  // console.log('object', object)
  return state.merge({ vehicleData: data, isLoadingVehicles: false, searchData: object, headerData })
}

export const setDateRange = (state, { startDate, stopDate }) => {
  let dateRange = { startDate, stopDate }
  return state.merge({ dateRange })
}

export const updateSearchDataMyVehicles = (state, { array }) => {
  // console.log("state.searchData : ", state.searchData)
  if (state.searchData) {
    let searchData = JSON.parse(JSON.stringify(state.searchData))
    for (let i in array) {
      searchData[array[i].name] = array[i].value
    }
    return state.merge({ searchData })
  } else {
    return state.merge({})
  }
}

export const setStateMyVehicle = (state, { object }) => {
  return state.merge(object)
}

export const setDefaultReduxMyVehicles = (state, { }) => {
  return INITIAL_STATE
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_VALUE]: setValue,
  [Types.SET_IS_LOADING_VEHICLES]: setIsLoadingVehicles,
  [Types.SET_DEALER_DATA]: setDealerData,
  [Types.SET_CUSTOMER_OF_MY_VEHICLES]: setCustomerOfMyVehicles,
  [Types.SET_FLEET_DATA]: setFleetData,
  [Types.SET_VEHICLE_DATA]: setVehicleData,
  [Types.SET_DATE_RANGE]: setDateRange,
  [Types.UPDATE_SEARCH_DATA_MY_VEHICLES]: updateSearchDataMyVehicles,
  [Types.SET_DEFAULT_REDUX_MY_VEHICLES]: setDefaultReduxMyVehicles,
  [Types.SET_STATE_MY_VEHICLE]: setStateMyVehicle,
})

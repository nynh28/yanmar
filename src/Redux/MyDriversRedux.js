import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setIsLoadingDrivers: ['isLoading'],
  setDealerData: ['data'],
  setCustomerOfMyDrivers: ['data'],
  setDriverData: ['data', 'object', 'headerData'],
  updateSearchDataMyDrivers: ['array'],
  setStateReduxMyDrivers: ['object'],
  setDefaultReduxMyDrivers: [],
  setValue: ['name', 'value']
})

export const MyDriversTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isLoadingDrivers: true,
  dealerData: [],
  customerData: [],
  driverData: [],
  searchData: null,
  ShowPopCompet: { id: null, show: false },
})


/* ------------- Reducers ------------- */
export const setIsLoadingDrivers = (state, { isLoading }) => {
  return state.merge({ isLoadingDrivers: isLoading })
}

export const setDealerData = (state, { data }) => {
  return state.merge({ dealerData: data })
}

export const setCustomerOfMyDrivers = (state, { data }) => {
  return state.merge({ customerData: data })
}

export const setDriverData = (state, { data, object, headerData }) => {
  return state.merge({ driverData: data, isLoadingDrivers: false, searchData: object, headerData })
}

export const updateSearchDataMyDrivers = (state, { array }) => {
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

export const setStateReduxMyDrivers = (state, { object }) => {
  return state.merge(object)
}

export const setDefaultReduxMyDrivers = (state, { }) => {
  return INITIAL_STATE
}

export const setValue = (state, { name, value }) => { return state.merge({ [name]: value }) }

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_IS_LOADING_DRIVERS]: setIsLoadingDrivers,
  [Types.SET_DEALER_DATA]: setDealerData,
  [Types.SET_CUSTOMER_OF_MY_DRIVERS]: setCustomerOfMyDrivers,
  [Types.SET_DRIVER_DATA]: setDriverData,
  [Types.UPDATE_SEARCH_DATA_MY_DRIVERS]: updateSearchDataMyDrivers,
  [Types.SET_STATE_REDUX_MY_DRIVERS]: setStateReduxMyDrivers,
  [Types.SET_DEFAULT_REDUX_MY_DRIVERS]: setDefaultReduxMyDrivers,
  [Types.SET_VALUE]: setValue
})

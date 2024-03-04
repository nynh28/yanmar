import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getDriver: ['id'],
  setDriver: ['data'],
  submitStatus: ['status', 'ErrorSubcode'],

  getExistingDriver: ['customerId', 'personalId'],
  createDriver: ['data'],
  getDriverProfile: ['personalId'],
  updateDriver: ['id', 'data'],
  deleteDriver: ['id'],
  deleteDriverProfile: ['personalId'],
  getDrivingDetail: ['personalId'],

  setDriverExisting: ['driverExisting'],
  setDriverProfile: ['driverProfile'],
  setDriverIdSelect: ['id', 'action'],
  setSubmitLoading: ['loading'],
  setDrivingDetail: ['data'],
  setSubmitSuccess: ['status'],

  getMyVehicles: ['id'],
})

export const DriverTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  loadingCheck: false,
  driverData: {},
  driverExisting: {},
  driverProfile: {},
  drivingDetail: {},
  formAction: {
    id: "",
    action: ""
  },
  statusSubmit: {
    status: true,
    ErrorSubcode: 0
  },
  submitSuccess: false
})


/* ------------- Reducers ------------- */
export const getExistingDriver = (state, { }) => { return state.merge({ loadingCheck: true }) }
export const createDriver = (state, { }) => { return state.merge({ loading: true, submitSuccess: false }) }
export const getDriverProfile = (state, { }) => { return state.merge({}) }
export const updateDriver = (state, { }) => { return state.merge({ loading: true }) }
export const deleteDriver = (state, { }) => { return state.merge({}) }
export const deleteDriverProfile = (state, { }) => { return state.merge({}) }
export const getDrivingDetail = (state, { }) => { return state.merge({}) }

// Set Initial State
export const getDriver = (state, { }) => {
  return state.merge({ loading: true })
}

export const setDriver = (state, { data }) => {
  return state.merge({ driverData: data })
}

export const setDriverExisting = (state, { driverExisting }) => {
  return state.merge({ driverExisting, loadingCheck: false })
}

export const setDriverProfile = (state, { driverProfile }) => {
  return state.merge({ driverProfile })
}

export const setDriverIdSelect = (state, { id, action }) => {
  // console.log("setDriverIdSelect : ", id)
  // console.log("setDriverIdSelect : ", action)

  return state.merge({ formAction: { id, action } })
}

export const setSubmitLoading = (state, { loading }) => {
  return state.merge({ loading })
}

export const setDrivingDetail = (state, { data }) => {
  return state.merge({ drivingDetail: data })
}

export const setSubmitSuccess = (state, { status }) => {
  return state.merge({ submitSuccess: status })
}

export const submitStatus = (state, { status, ErrorSubcode }) => {
  let statusSubmit = {
    status,
    ErrorSubcode
  }

  return state.merge({ loading: false, statusSubmit })
}


export const getMyVehicles = (state, { }) => {
  return state.merge({})
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SUBMIT_STATUS]: submitStatus,
  [Types.GET_DRIVER]: getDriver,
  [Types.SET_DRIVER]: setDriver,

  [Types.GET_EXISTING_DRIVER]: getExistingDriver,
  [Types.CREATE_DRIVER]: createDriver,
  [Types.GET_DRIVER_PROFILE]: getDriverProfile,
  [Types.UPDATE_DRIVER]: updateDriver,
  [Types.DELETE_DRIVER]: deleteDriver,
  [Types.DELETE_DRIVER_PROFILE]: deleteDriverProfile,
  [Types.GET_DRIVING_DETAIL]: getDrivingDetail,

  [Types.SET_DRIVER_EXISTING]: setDriverExisting,
  [Types.SET_DRIVER_PROFILE]: setDriverProfile,
  [Types.SET_DRIVER_ID_SELECT]: setDriverIdSelect,
  [Types.SET_SUBMIT_LOADING]: setSubmitLoading,
  [Types.SET_DRIVING_DETAIL]: setDrivingDetail,
  [Types.SET_SUBMIT_SUCCESS]: setSubmitSuccess,

  [Types.GET_MY_VEHICLES]: getMyVehicles
})
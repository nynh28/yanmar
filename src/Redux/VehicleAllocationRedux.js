import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // getAllocableVehicles: ['ownerId'],
  // setAllocableVehicles: ['data'],
  getOwnerPartner: ['userId'],
  getOwnerPartnerSuccess: ['data'],
  getOwnerPartnerFailure: ['error'],

  getNewOwnerPartner: ['userId', 'partnerId'],
  getNewOwnerPartnerSuccess: ['data'],
  getNewOwnerPartnerFailure: ['error'],

  getListVehicles: ['userId', 'partnerId'],
  getListVehiclesSuccess: ['data'],
  getListVehiclesFailure: ['error'],

  setAllocated: ['vehicles'],
  updateNewPartner: ['userId', 'ownerId', 'newOwnerId', 'vehicles'],
  updateNewPartnerSuccess: ['data'],
  updateNewPartnerFailure: ['error']
})

export const VehicleAllocationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  vehicleData: [],
  vehicleFetching: false,
  vehicleFetchingError: null,

  selectedOwner: null,
  ownerList: [],
  ownerFetching: false,
  ownerFetchingError: null,

  selectedNewOwner: null,
  newOwnerList: [],
  newOwnerFetching: false,
  newOwnerFetchingError: null,

  allocatedVehicles: [],
  allocatedUpdating: false,
  allocatedUpdatingError: null,

  statusSubmit: {
    status: true,
    ErrorSubcode: 0
  },
})

/* ------------- Reducers ------------- */
// export const getAllocableVehicles = (state, { }) => { return state.merge({}) }
// export const setAllocableVehicles = (state, { data }) => { return state.merge({ VehicleTableData: data }) }

// getOwnerPartner: ['userId'],
export const getOwnerPartner = (state, { userId }) => {
  return state.merge({ ownerFetching: true, ownerFetchingError: null })
}

// getOwnerPartnerSuccess: ['data'],
export const getOwnerPartnerSuccess = (state, { data }) => {
  return state.merge({ ownerFetching: false, ownerList: data })
}

// getOwnerPartnerFailure: ['error'],
export const getOwnerPartnerFailure = (state, { error }) => {
  return state.merge({ ownerFetching: false, ownerList: [], ownerFetchingError: error })
}

// getNewOwnerPartner: ['userId', 'partnerId'],
export const getNewOwnerPartner = (state, { userId, partnerId }) => {
  return state.merge({ newOwnerFetching: true, newOwnerFetchingError: null })
}

// getNewOwnerPartnerSuccess: ['data'],
export const getNewOwnerPartnerSuccess = (state, { data }) => {
  return state.merge({ newOwnerFetching: false, newOwnerList: data })
}

// getNewOwnerPartnerFailure: ['error'],
export const getNewOwnerPartnerFailure = (state, { error }) => {
  return state.merge({ newOwnerFetching: false, newOwnerList: [], newOwnerFetchingError: error })
}

// getListVehicles: ['userId', 'partnerId'],
export const getListVehicles = (state, { userId, partnerId }) => {
  return state.merge({ vehicleFetching: true, vehicleFetchingError: null })
}

// getListVehicleSuccess: ['data'],
export const getListVehiclesSuccess = (state, { data }) => {
  return state.merge({ vehicleFetching: false, vehicleData: data || [] })
}

// getListVehicleFailure: ['error'],
export const getListVehiclesFailure = (state, { error }) => {
  return state.merge({ vehicleFetching: false, vehicleFetchingError: error, vehicleData: [] })
}

// addAllocated: ['vehicleId'],
export const setAllocated = (state, { vehicles }) => {
  // let alv = JSON.parse(JSON.stringify(state.allocatedVehicles))
  // alv.push({ vehicle_id: vehicleId })
  return state.merge({ allocatedVehicles: vehicles })
}

// updateNewPartner: ['userId', 'ownerId', 'newOwnerId', 'vehicles'],
export const updateNewPartner = (state, { userId, ownerId, newOwnerId, vehicles }) => {
  return state.merge({ allocatedUpdating: true, allocatedUpdatingError: null })
}

// updateNewPartnerSuccess: ['data'],
export const updateNewPartnerSuccess = (state, { data }) => {
  return state.merge({ allocatedUpdating: false, allocatedVehicles: [] })
}

// updateNewPartnerFailure: ['error']
export const updateNewPartnerFailure = (state, { error }) => {
  return state.merge({
    allocatedUpdating: false,
    allocatedUpdatingError: error, allocatedVehicles: []
  })
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  // [Types.GET_ALLOCABLE_VEHICLES]: getAllocableVehicles,
  // [Types.SET_ALLOCABLE_VEHICLES]: setAllocableVehicles
  [Types.GET_OWNER_PARTNER]: getOwnerPartner,
  [Types.GET_OWNER_PARTNER_SUCCESS]: getOwnerPartnerSuccess,
  [Types.GET_OWNER_PARTNER_FAILURE]: getOwnerPartnerFailure,

  [Types.GET_NEW_OWNER_PARTNER]: getNewOwnerPartner,
  [Types.GET_NEW_OWNER_PARTNER_SUCCESS]: getNewOwnerPartnerSuccess,
  [Types.GET_NEW_OWNER_PARTNER_FAILURE]: getNewOwnerPartnerFailure,

  [Types.GET_LIST_VEHICLES]: getListVehicles,
  [Types.GET_LIST_VEHICLES_SUCCESS]: getListVehiclesSuccess,
  [Types.GET_LIST_VEHICLES_FAILURE]: getListVehiclesFailure,

  [Types.SET_ALLOCATED]: setAllocated,
  [Types.UPDATE_NEW_PARTNER]: updateNewPartner,
  [Types.UPDATE_NEW_PARTNER_SUCCESS]: updateNewPartnerSuccess,
  [Types.UPDATE_NEW_PARTNER_FAILURE]: updateNewPartnerFailure
})

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({

  getInfoGeneral: [],
  getInfoGeneralSuccess: ['infoGeneral'],

  updateFleet: ['data'],
  createFleet: ['data'],
  delFleet: ['data'],
  updateInfoGeneral: ['infoUpdate'],
  updateInfoGeneralSuccess: [],
  updateInfoGeneralFail: ['errorSubcode'],

  updateInfoGroup: ['action', 'objOrId', 'groupId'],
  updateInfoDealer: ['action', 'objOrId'],
  updateInfoCustomer: ['action', 'objOrId'],
  resetUpdateInfo: [],

  getHistoryGeneral: ['partnerId'],
  getHistoryGeneralSuccess: ['infoHistory'],

  setFleet: ['infoFleet']


})

export const GeneralTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  infoGeneral: null,
  processing: false,
  loading: false,
  errorSubcode: null,
  infoGroups: [],
  infoDealers: [],
  infoCustomers: [],
  loadingHistory: false,
  infoHistory: [],
  infoFleet: null,
})

/* ------------- Reducers ------------- */

export const getInfoGeneral = (state) => {
  return state.merge({ loading: true })
}
export const getInfoGeneralSuccess = (state, { infoGeneral }) => {
  return state.merge({ loading: false, infoGeneral })
}
export const updateInfoGeneral = (state) => {
  return state.merge({ processing: true, errorSubcode: null })
}
export const updateFleet = (state, { }) => {
  return state.merge({})
}
export const createFleet = (state, { }) => {
  return state.merge({})
}
export const delFleet = (state, { }) => {
  return state.merge({})
}
export const updateInfoGeneralSuccess = (state, { }) => {
  return state.merge({ processing: false })
}
export const updateInfoGeneralFail = (state, { errorSubcode }) => {
  return state.merge({ processing: false, errorSubcode })
}

export const updateInfoGroup = (state, { action, objOrId, groupId }) => {
  let infoGroups = JSON.parse(JSON.stringify(state.infoGroups))
  if (action === 'DELETE') {
    let settings = infoGroups.find(e => e.group_id === groupId).settings
    if (settings) {
      let index_setting = settings.findIndex(e => e.setting_id === objOrId)
      if (index_setting !== -1) settings.splice(index_setting, 1);
      if (settings.length === 0) {
        let index = infoGroups.findIndex(e => e.group_id === groupId)
        if (index !== -1) infoGroups.splice(index, 1);
      }
    }
  } else {
    let group = infoGroups.find(e => e.group_id === groupId)
    if (group) {
      let setting = group.settings.find(e => e.setting_id === objOrId.setting_id)
      if (setting) {
        setting.setting_value = objOrId.setting_value
      } else {
        group.settings.push({
          setting_id: objOrId.setting_id,
          setting_value: objOrId.setting_value
        })
      }
    } else {
      infoGroups.push({
        group_id: groupId,
        settings: [{
          setting_id: objOrId.setting_id,
          setting_value: objOrId.setting_value
        }]
      })
    }
  }

  // console.log('updateInfoGroup', infoGroups)
  return state.merge({ infoGroups })
  // return state.merge({})
}

export const updateInfoDealer = (state, { action, objOrId }) => {
  let infoDealers = JSON.parse(JSON.stringify(state.infoDealers))
  if (action === 'DELETE') {
    let index = infoDealers.findIndex(e => e.partner_id === objOrId)
    if (index !== -1) infoDealers.splice(index, 1);

  } else {
    let dealer = infoDealers.find(e => e.partner_id === objOrId.partner_id)
    if (dealer) {
      dealer.default_gmt = objOrId.default_gmt
      dealer.start_time_of_day = objOrId.start_time_of_day
    } else {
      infoDealers.push(objOrId)
    }
  }
  return state.merge({ infoDealers })
}

export const updateInfoCustomer = (state, { action, objOrId }) => {
  let infoCustomers = JSON.parse(JSON.stringify(state.infoCustomers))
  if (action === 'DELETE') {
    let index = infoCustomers.findIndex(e => e.partner_id === objOrId)
    if (index !== -1) infoCustomers.splice(index, 1);

  } else {
    let customer = infoCustomers.find(e => e.partner_id === objOrId.partner_id)
    if (customer) {
      customer.default_gmt = objOrId.default_gmt
      customer.start_time_of_day = objOrId.start_time_of_day
      customer.fuel_coefficient = objOrId.fuel_coefficient
    } else {
      infoCustomers.push(objOrId)
    }
  }
  return state.merge({ infoCustomers })
}

export const resetUpdateInfo = (state, { }) => {
  return state.merge({
    infoGroups: [],
    infoDealers: [],
    infoCustomers: []
  })
}

export const getHistoryGeneral = (state, { }) => {
  return state.merge({ loadingHistory: true })
}
export const getHistoryGeneralSuccess = (state, { infoHistory }) => {
  return state.merge({ loadingHistory: false, infoHistory })
}

export const setFleet = (state, { infoFleet }) => {
  return state.merge({ infoFleet })
}





/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {

  [Types.GET_INFO_GENERAL]: getInfoGeneral,
  [Types.GET_INFO_GENERAL_SUCCESS]: getInfoGeneralSuccess,
  [Types.UPDATE_INFO_GENERAL]: updateInfoGeneral,
  [Types.UPDATE_INFO_GENERAL_SUCCESS]: updateInfoGeneralSuccess,
  [Types.UPDATE_INFO_GENERAL_FAIL]: updateInfoGeneralFail,

  [Types.UPDATE_INFO_GROUP]: updateInfoGroup,
  [Types.UPDATE_INFO_DEALER]: updateInfoDealer,
  [Types.UPDATE_INFO_CUSTOMER]: updateInfoCustomer,
  [Types.RESET_UPDATE_INFO]: resetUpdateInfo,

  [Types.GET_HISTORY_GENERAL]: getHistoryGeneral,
  [Types.GET_HISTORY_GENERAL_SUCCESS]: getHistoryGeneralSuccess,

  [Types.SET_FLEET]: setFleet,
  [Types.UPDATE_FLEET]: updateFleet,
  [Types.CREATE_FLEET]: createFleet,
  [Types.DEL_FLEET]: delFleet,


})

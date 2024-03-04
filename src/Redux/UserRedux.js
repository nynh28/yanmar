import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setIdSelect: ['id', 'action'],
  createUser: ['data'],
  updateUser: ['id', 'data'],
  deleteUser: ['id'],
  submitStatus: ['status', 'ErrorSubcode'],
  submitStatusResetAndUnlocked: ['status', 'ErrorSubcode'],

  resetAndUnlock: ['name', 'id'],
  getUserSearch: ['name', 'arr', 'id'],
  getUserSearchSuccess: ['name', 'data'],

  getUserCreateAndUpdate: ['name', 'id', 'query'],
  getUserCreateAndUpdateOpt: ['name', 'id', 'query'],
  getUserCreateAndUpdateSuccess: ['name', 'data'],

  searchGridView: ['data', 'activeTab'],
  searchGridViewSuccess: ['lstUserData'],
  getUserManage: ['id'],
  setUserManage: ['data'],

  getDropdownTable: ['name', 'id'],
  getDropdownTableSuccess: ['name', 'data'],

  getPermissionSummary: ['id'],
  setPermissionSummary: ['permissionSummary'],
  setStateRedux: ['name', 'value'],
  deleteUserSuccess: [],

  getAgreementUser: ['id', 'agreementId'],
  getAgreementUserSuccess: ['infoAgreement'],

  getPasswordPolicy: [],
  getPasswordPolicySuccess: ['passwordPolicy'],

  getDealerToSendEmail: ['id'],
  getDealerToSendEmailSuccess: ['data'],
  getFileUserForm: ['id'],
  getFileUserFormSuccess: [],
  sendEmailUserForm: ['id', 'dealerId'],
  sendEmailUserFormSuccess: ['isSuccess']
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  id: null,
  action: "",
  lstUserData: [],
  loadingSearch: false,
  loading: false,
  userData: {},

  lstOwnerPartnerType: [],
  lstOwnerUserLevel: [],

  lstOwnerPartnerByType: [],

  // Use
  lstSchPartnerType: [],
  lstSchUserLevel: [],
  lstSchPartnerByType: [],
  lstSchRole: [],
  lstSchFunction: [],
  lstSchAction: [],

  // lstFunctions: [],
  lstOptGroupAction: [],
  lstOptActionByRoles: [],
  lstOptOwnerUserLevel: [],
  // lstSchPartnerType: [],

  lstOwnerGroup: [],


  lstLanguage: [],



  lstOptUserLevelByType: [],

  lstTableRole: [],
  lstTableDealer: [],
  lstTableCustomer: [],
  lstTableFleet: [],
  lstTableVehicle: [],
  statusSubmit: {
    status: true,
    ErrorSubcode: 0
  },
  submitStatusResetAndUnlocked: {
    status: true,
    ErrorSubcode: 0
  },
  permissionSummary: [],
  DealerList: [],
  deletes: false,
  passwordPolicy: null,
  statusLoadFile: false,
  statusSendEmail: false,
  sentEmailSuccess: false
})

/* ------------- Reducers ------------- */

export const setIdSelect = (state, { id, action }) => {
  return state.merge({ id, action })
}

export const resetAndUnlock = (state, { }) => {
  return state.merge({})
}
export const getUserSearch = (state, { }) => {
  return state.merge({})
}
export const getUserSearchSuccess = (state, { name, data }) => {
  return state.merge({ ['lstSch' + name]: data })
}

export const getUserCreateAndUpdate = (state, { }) => {
  return state.merge({})
}
export const getUserCreateAndUpdateOpt = (state, { }) => {
  return state.merge({})
}
export const getUserCreateAndUpdateSuccess = (state, { name, data }) => {
  return state.merge({ ['lst' + name]: data })
}

export const searchGridView = (state, { }) => {
  return state.merge({ loadingSearch: true })
}
export const searchGridViewSuccess = (state, { lstUserData }) => {
  return state.merge({ loadingSearch: false, lstUserData })
}

export const getUserManage = (state, { }) => { return state.merge({}) }


// Set Initial State
export const setUserManage = (state, { data }) => { return state.merge({ userData: data, loading: false }) }

export const getDropdownTable = (state, { }) => { return state.merge({}) }
export const getDropdownTableSuccess = (state, { name, data }) => {
  // console.log('lstTable' + name, data)
  return state.merge({ ['lstTable' + name]: data })
}


export const createUser = (state, { }) => {
  return state.merge({ loading: true })
}

export const updateUser = (state, { }) => {
  return state.merge({ loading: true })
}
export const deleteUser = (state, { }) => {
  return state.merge({})
}
export const deleteUserSuccess = (state, { }) => {
  return state.merge({ deletes: !state.deletes })
}

export const submitStatus = (state, { status, ErrorSubcode }) => {
  let statusSubmit = {
    status,
    ErrorSubcode
  }

  return state.merge({ loading: false, statusSubmit })
}

export const submitStatusResetAndUnlocked = (state, { status, ErrorSubcode }) => {

  let submitStatusResetAndUnlocked = {
    status,
    ErrorSubcode
  }
  // console.log("submitStatusResetAndUnlocked", submitStatusResetAndUnlocked)
  return state.merge({ submitStatusResetAndUnlocked })
}

export const getPermissionSummary = (state, { }) => { return state.merge({}) }

export const setPermissionSummary = (state, { permissionSummary }) => {
  // console.log("permissionSummary", permissionSummary)
  return state.merge({ permissionSummary })
}

export const setStateRedux = (state, { name, value }) => {
  return state.merge({ [name]: value })
}

export const getAgreementUser = (state) => {
  return state.merge({})
}
export const getAgreementUserSuccess = (state, { infoAgreement }) => {
  return state.merge({ infoAgreement })
}


export const getPasswordPolicy = (state, { }) => {
  return state.merge({})
}
export const getPasswordPolicySuccess = (state, { passwordPolicy }) => {
  return state.merge({ passwordPolicy })
}

export const getDealerToSendEmail = (state, { }) => {
  return state.merge({ statusLoadFile: true })
}
export const getDealerToSendEmailSuccess = (state, { data }) => {
  return state.merge({ DealerList: data })
}
export const getFileUserForm = (state, { }) => {
  return state.merge({ statusLoadFile: true })
}
export const getFileUserFormSuccess = (state, { }) => {
  return state.merge({ statusLoadFile: false })
}

export const sendEmailUserForm = (state, { }) => {
  return state.merge({ statusSendEmail: true })
}
export const sendEmailUserFormSuccess = (state, { isSuccess }) => {
  return state.merge({ statusSendEmail: false, sentEmailSuccess: isSuccess })
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_ID_SELECT]: setIdSelect,

  [Types.RESET_AND_UNLOCK]: resetAndUnlock,
  [Types.GET_USER_SEARCH]: getUserSearch,
  [Types.GET_USER_SEARCH_SUCCESS]: getUserSearchSuccess,

  [Types.GET_USER_CREATE_AND_UPDATE]: getUserCreateAndUpdate,
  [Types.GET_USER_CREATE_AND_UPDATE_OPT]: getUserCreateAndUpdateOpt,
  [Types.GET_USER_CREATE_AND_UPDATE_SUCCESS]: getUserCreateAndUpdateSuccess,

  [Types.SEARCH_GRID_VIEW]: searchGridView,
  [Types.SEARCH_GRID_VIEW_SUCCESS]: searchGridViewSuccess,
  [Types.GET_USER_MANAGE]: getUserManage,
  [Types.SET_USER_MANAGE]: setUserManage,

  [Types.GET_DROPDOWN_TABLE]: getDropdownTable,
  [Types.GET_DROPDOWN_TABLE_SUCCESS]: getDropdownTableSuccess,

  [Types.CREATE_USER]: createUser,
  [Types.UPDATE_USER]: updateUser,
  [Types.DELETE_USER]: deleteUser,
  [Types.SUBMIT_STATUS]: submitStatus,
  [Types.SUBMIT_STATUS_RESET_AND_UNLOCKED]: submitStatusResetAndUnlocked,

  [Types.GET_PERMISSION_SUMMARY]: getPermissionSummary,
  [Types.SET_PERMISSION_SUMMARY]: setPermissionSummary,

  [Types.SET_STATE_REDUX]: setStateRedux,
  [Types.DELETE_USER_SUCCESS]: deleteUserSuccess,

  [Types.GET_AGREEMENT_USER]: getAgreementUser,
  [Types.GET_AGREEMENT_USER_SUCCESS]: getAgreementUserSuccess,

  [Types.GET_PASSWORD_POLICY]: getPasswordPolicy,
  [Types.GET_PASSWORD_POLICY_SUCCESS]: getPasswordPolicySuccess,

  [Types.GET_DEALER_TO_SEND_EMAIL]: getDealerToSendEmail,
  [Types.GET_DEALER_TO_SEND_EMAIL_SUCCESS]: getDealerToSendEmailSuccess,

  [Types.GET_FILE_USER_FORM]: getFileUserForm,
  [Types.GET_FILE_USER_FORM_SUCCESS]: getFileUserFormSuccess,

  [Types.SEND_EMAIL_USER_FORM]: sendEmailUserForm,
  [Types.SEND_EMAIL_USER_FORM_SUCCESS]: sendEmailUserFormSuccess,
})

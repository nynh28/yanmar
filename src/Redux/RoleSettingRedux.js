import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'


/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({

  listPermission: ['roleUser'],
  setListPermission: ['listPers'],
  listGroupPermission: ['roleUser', 'id'],
  setListGroupPermission: ['listGroupPers'],
  updatePermissionForGroup: ['roleUser', 'data', 'id'],
  createGroup: ['roleUser', 'suffixRoleName', 'id'],
  setRoleDataFromTable: ['data', 'actions'],
})

export const RoleSettingTypes = Types

export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  listPers: []
  , listGroupPers: {},
  roleDataRow: null,
  actions: null,
})

/* ------------- Reducers ------------- */

export const listPermission = (state) => {
  return state.merge({ loading: false })
  //  return state.merge({ fetching: true, messageError: null })
}

export const setListPermission = (state, { listPers }) => {



  return state.merge({ listPers })
}


export const listGroupPermission = (state) => {
  // return state.merge({ loading: false })
  return state.merge({})

  //  return state.merge({ fetching: true, messageError: null })
}

export const setListGroupPermission = (state, { listGroupPers }) => {

  return state.merge({ listGroupPers })
}

export const updatePermissionForGroup = (state) => {
  return state.merge({})
}


export const createGroup = (state) => {
  return state.merge({})
}

export const setRoleDataFromTable = (state, { data, actions }) => {
  return state.merge({ roleDataRow: data, actions })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_PERMISSION]: listPermission,
  [Types.SET_LIST_PERMISSION]: setListPermission,
  [Types.LIST_GROUP_PERMISSION]: listGroupPermission,
  [Types.SET_LIST_GROUP_PERMISSION]: setListGroupPermission,
  [Types.UPDATE_PERMISSION_FOR_GROUP]: updatePermissionForGroup,
  [Types.CREATE_GROUP]: createGroup,

  [Types.SET_ROLE_DATA_FROM_TABLE]: setRoleDataFromTable,
})

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({

  getServiceRequest: null,
  getServiceSuccess: ['serviceDetail'],
  getServiceFailure: ['serviceDetail'],

  updateServiceStatusRequest: ['id', 'serviceStatus'],
  updateServiceStatusSuccess: ['patchInstalling'],
  updateServiceStatusFailure: null,

  idSelected: ['typeForm', 'idSelected', 'infoInstallingData'],

  updateIntegrationServiceRequest: ['id', 'user_id', 'action_status'],
  updateIntegrationServiceSuccess: ['patchInstalling'],
  updateIntegrationServiceFailure: null,
})

export const InstallingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  installDetail: null,
  updateInstall: null,
  listInstall: [],
  saveSuccess: null,
  saveItem: null,
  serviceDetail: null,
  serviceId: null,
  patchInstalling: null,
  idSelected: null,
  loading: false,
  infoInstallingData: null,
  typeForm: null,
})

/* ------------- Selectors ------------- */

/* ------------- Reducers ------------- */

export const service_request = state =>
  state.merge({ fetching: true, serviceDetail: null })

export const service_success = (state, action) => {
  const { serviceDetail } = action
  return state.merge({ fetching: false, error: null, serviceDetail })
}

export const service_failure = (state, action) => {
  const { serviceDetail } = action
  return state.merge({ fetching: false, error: true, serviceDetail })
}

export const update_service_status_request = (state, { id, serviceStatus }) =>
  state.merge({ fetching: true, patchInstalling: null, id, serviceStatus })

export const update_service_status_success = (state, action) => {
  const { patchInstalling } = action
  return state.merge({ fetching: false, error: null, patchInstalling })
}

export const update_service_status_failure = (state, action) => {
  const { patchInstalling } = action
  return state.merge({ fetching: false, error: true, patchInstalling })
}

export const idSelected = (state, { typeForm, idSelected, infoInstallingData = null }) => {
  if (typeForm === "edit") {
    return state.merge({ typeForm, idSelected, infoInstallingData: infoInstallingData, loading: false })
  }
  else {
    return state.merge({ typeForm, idSelected, loading: false })
  }
}

export const update_integration_service_request = (state, { id, user_id, action }) =>
  state.merge({ fetching: true, patchInstalling: null, id, user_id, action })

export const update_integration_service_success = (state, action) => {
  const { patchInstalling } = action
  return state.merge({ fetching: false, error: null, patchInstalling })
}

export const update_integration_service_failure = (state, action) => {
  const { patchInstalling } = action
  return state.merge({ fetching: false, error: true, patchInstalling })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {

  [Types.GET_SERVICE_REQUEST]: service_request,
  [Types.GET_SERVICE_SUCCESS]: service_success,
  [Types.GET_SERVICE_FAILURE]: service_failure,

  [Types.UPDATE_SERVICE_STATUS_REQUEST]: update_service_status_request,
  [Types.UPDATE_SERVICE_STATUS_SUCCESS]: update_service_status_success,
  [Types.UPDATE_SERVICE_STATUS_FAILURE]: update_service_status_failure,

  [Types.ID_SELECTED]: idSelected,

  [Types.UPDATE_INTEGRATION_SERVICE_REQUEST]: update_integration_service_request,
  [Types.UPDATE_INTEGRATION_SERVICE_SUCCESS]: update_integration_service_success,
  [Types.UPDATE_INTEGRATION_SERVICE_FAILURE]: update_integration_service_failure,

})

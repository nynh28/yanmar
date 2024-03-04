import { call, put, select } from 'redux-saga/effects'
import InstallActions from '../Redux/InstallingRedux'

export function* getService(api, action) {
  console.log("`============= `come on saga =============")
  const response = yield call(api.getService)

  console.log(response.data)
  console.log('========    RESPONSE GET SERVICE   ========= ')
  // success?
  if (response.ok) {
    yield put(InstallActions.getServiceSuccess(response.data))
  } else {
    yield put(InstallActions.getServiceFailure(response.data))
  }
}

export function* updateServiceStatus(api, { id, serviceStatus }) {
  console.log("`============= `come on saga =============")
  const data = {
    id,
    body: { serviceStatus }
  }
  const response = yield call(api.updateStatus, data)
  console.log(id, serviceStatus)
  console.log(response)
  console.log('========    RESPONSE UPDATE SERVICE   ========= ')
  // success?
  if (response.ok) {
    yield put(InstallActions.getServiceSuccess(response.data))
  } else {
    yield put(InstallActions.getServiceFailure(response.data))
  }
}

export function* updateIntegrationService(api, { id, user_id, action_status }) {
  console.log("`============= `come on saga =============")
  const data = {
    id,
    body: { user_id, action_status }
  }
  const response = yield call(api.updateIntegrationService, data)
  console.log(response)
  console.log('========    RESPONSE INTEGRATION UPDATE SERVICE   ========= ')
  // success?
  if (response.ok) {
    yield put(InstallActions.getServiceSuccess(response.data))
  } else {
    yield put(InstallActions.getServiceFailure(response.data))
  }
}

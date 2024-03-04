import { call, put, select } from 'redux-saga/effects'
import SummaryActions from '../Redux/SummaryRedux'
import { get } from 'lodash'

const auth = state => state.signin
const versatile = state => state.versatile
const general = state => state.general

function setHeader(ver, authen) {
  let language = get(ver, 'language')
  let header = {
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': language,
  }
  return header
}

// Get Geofence By Types
export function* getGeofenceByTypesSum(api, { GeofenceTypeIds }) {
  if (GeofenceTypeIds.length === 0) return yield put(SummaryActions.setGeofenceByTypesSum([]))

  const signin = yield select(auth)
  let header = {
    Authorization: signin.header.idToken,
    'X-API-Key': signin.header.redisKey
  }
  yield call(api.setHeader, header)

  let param = ""
  for (let index in GeofenceTypeIds) {
    if (param !== "") param += "&GeofenceTypeIds=" + GeofenceTypeIds[index]
    else param += "GeofenceTypeIds=" + GeofenceTypeIds[index]
  }

  const response = yield call(api.getGeofenceByTypes, param)

  if (response.ok) {
    yield put(SummaryActions.setGeofenceByTypesSum(response.data.geofenceByTypes))
  }
  else {
    return yield put(SummaryActions.setGeofenceByTypesSum([]))
  }
}

// Get Geofence Detail
export function* getGeofenceDetailSum(api, { geofenceId }) {
  // console.log("getGeofenceDetail : ", geofenceId)
  const signin = yield select(auth)
  const ver = yield select(versatile)

  let header = {
    Authorization: signin.header.idToken,
    'X-API-Key': signin.header.redisKey,
    // lang: 'en'
  }
  yield call(api.setHeader, header)
  let param = {
    geofenceId,
    lang: ver.language
  }

  const response = yield call(api.getGeofenceDetail, param)

  // console.log('response', response)

  if (response.ok) {
    yield put(SummaryActions.setGeofenceDetailSum(response.data))
  } else {
    return yield put(SummaryActions.setGeofenceDetailSum([]))
  }
}

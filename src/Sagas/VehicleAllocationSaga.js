import { call, put, select } from 'redux-saga/effects'
import VehicleAllocationActions from '../Redux/VehicleAllocationRedux'


const auth = state => state.signin
const versatile = state => state.versatile

export function* getOwnerPartner(api, { userId }) {

  const response = yield call(api.getOwnerPartner, userId)
  // console.log('VAL', response)

  if (response.ok) {
    yield put(VehicleAllocationActions.getOwnerPartnerSuccess(response.data))
  } else {
    yield put(VehicleAllocationActions.getOwnerPartnerFailure(response.data))
  }
}

export function* getListVehicles(api, { userId, partnerId }) {

  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language
  }
  yield call(api.setHeader, header)

  // const response = yield call(api.getListVehicles, 18331, 183)
  const response = yield call(api.getListVehicles, userId, partnerId)
  console.log(response)
  if (response.ok) {
    yield put(VehicleAllocationActions.getListVehiclesSuccess(response.data))
  } else {
    yield put(VehicleAllocationActions.getListVehiclesFailure(response.data))
  }
}

export function* getNewOwnerPartner(api, { userId, partnerId }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language
  }
  yield call(api.setHeader, header)
  const response = yield call(api.getNewOwnerPartner, userId, partnerId)
  if (response.ok) {
    yield put(VehicleAllocationActions.getNewOwnerPartnerSuccess(response.data))
  } else {
    yield put(VehicleAllocationActions.getNewOwnerPartnerFailure(response.data))
  }
}

export function* updateNewPartner(api, { userId, ownerId, newOwnerId, vehicles }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language
  }
  yield call(api.setHeader, header)
  const response = yield call(api.updateNewPartner, userId, ownerId, newOwnerId, vehicles)
  console.log(response)
  if (response.ok) {
    yield put(VehicleAllocationActions.updateNewPartnerSuccess(response.data))
  } else {
    yield put(VehicleAllocationActions.updateNewPartnerFailure(response.data))
  }
}

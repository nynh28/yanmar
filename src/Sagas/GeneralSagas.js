import { call, put, select } from 'redux-saga/effects'
import GeneralActions from '../Redux/GeneralRedux'
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

// Reset Password And Unlock
export function* getInfoGeneral(api, { }) {
  // Set header Authorize
  const ver = yield select(versatile)
  const authen = yield select(auth)
  yield call(api.setHeader, setHeader(ver, authen))

  let data = { user_id: get(authen, 'dataLogin.userId') }
  const response = yield call(api.getInfoGeneral, data)
  if (response.ok) {
    yield put(GeneralActions.getInfoGeneralSuccess(response.data))
  }
}

export function* updateFleet(api, { data }) {
  // Set header Authorize
  const ver = yield select(versatile)
  const authen = yield select(auth)


  yield call(api.setHeader, setHeader(ver, authen))


  const response = yield call(api.updateFleet, data)
  if (response.ok) {
    yield put(GeneralActions.updateInfoGeneralSuccess())
  }
  else {
    yield put(GeneralActions.updateInfoGeneralFail('errorSubcode'))
  }
  // yield put(GeneralActions.updateInfoGeneralFail('errorSubcode'))
}

export function* createFleet(api, { data }) {
  // Set header Authorize
  const ver = yield select(versatile)
  const authen = yield select(auth)


  yield call(api.setHeader, setHeader(ver, authen))


  const response = yield call(api.createFleet, data)
  if (response.ok) {
    yield put(GeneralActions.updateInfoGeneralSuccess())
  }
  else {
    yield put(GeneralActions.updateInfoGeneralFail('errorSubcode'))
  }
  // yield put(GeneralActions.updateInfoGeneralFail('errorSubcode'))
}

export function* delFleet(api, { data }) {
  // Set header Authorize
  const ver = yield select(versatile)
  const authen = yield select(auth)


  yield call(api.setHeader, setHeader(ver, authen))


  const response = yield call(api.delFleet, data)
  if (response.ok) {
    yield put(GeneralActions.updateInfoGeneralSuccess())
  }
  else {
    yield put(GeneralActions.updateInfoGeneralFail('errorSubcode'))
  }
  // yield put(GeneralActions.updateInfoGeneralFail('errorSubcode'))
}




export function* updateInfoGeneral(api, { infoUpdate }) {
  // Set header Authorize
  const ver = yield select(versatile)
  const authen = yield select(auth)
  const gen = yield select(general)

  yield call(api.setHeader, setHeader(ver, authen))

  infoUpdate.groups = gen.infoGroups
  infoUpdate.dealers = gen.infoDealers
  infoUpdate.customers = gen.infoCustomers

  let data = {
    user_id: get(authen, 'dataLogin.userId'),
    payload: infoUpdate
  }
  // console.log('data', data)
  // const response = { ok: false }
  const response = yield call(api.updateInfoGeneral, data)
  if (response.ok) {
    yield put(GeneralActions.updateInfoGeneralSuccess())
  }
  else {
    yield put(GeneralActions.updateInfoGeneralFail('errorSubcode'))
  }
  // yield put(GeneralActions.updateInfoGeneralFail('errorSubcode'))
}

export function* getHistoryGeneral(api, { partnerId }) {
  // Set header Authorize
  const ver = yield select(versatile)
  const authen = yield select(auth)


  yield call(api.setHeader, setHeader(ver, authen))

  let data = {
    user_id: get(authen, 'dataLogin.userId'),
    partner_id: partnerId
  }

  const response = yield call(api.getHistoryGeneral, data)
  if (response.ok) {
    yield put(GeneralActions.getHistoryGeneralSuccess(response.data))
  }
  else {
    yield put(GeneralActions.getHistoryGeneralSuccess([]))
  }
  // yield put(GeneralActions.updateInfoGeneralFail('errorSubcode'))
}

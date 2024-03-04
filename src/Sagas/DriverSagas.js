import { call, put, select } from 'redux-saga/effects'
import DriverActions from '../Redux/DriverRedux'
import RealtimeActions from '../Redux/RealtimeRedux'
import SigninActions from '../Redux/SigninRedux'
import { logErrorMessage } from '../Functions/logErrorMessage'
import { get } from 'lodash'

const auth = state => state.signin

//#region DRIVEER API

//  GET DRIVER
export function* getDriver(api, { id }) {
  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)
  const response = yield call(api.getDriver, id)
  // console.log("getDriver response : ", response)

  if (response.ok) {
    yield put(DriverActions.setDriver(response.data))
  }
  else {
    yield put(DriverActions.setDriver({}))
    //  yield put(DriverActions.submitStatus(false, get(response.data, "Error.ErrorSubcode", "")))
    logErrorMessage(get(response.data, 'Error.Message', ""))
  }
}


//  Check Driver Existing with Customer or Existing on System
export function* getExistingDriver(api, { customerId, personalId }) {
  // Set header Authorize
  const authen = yield select(auth)

  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)

  let param = {
    customerId,
    personalId
  };

  const response = yield call(api.getExistingDriver, param)

  if (response.ok) {
    yield put(DriverActions.setDriverExisting(response.data))
  }
  else {
    yield put(DriverActions.setDriverExisting({}))
  }
}

//  Create a new Driver of Driver
export function* createDriver(api, { data }) {

  // Set header Authorize
  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)

  const response = yield call(api.createDriver, data)
  // console.log(response)

  if (response.ok) {
    yield put(DriverActions.submitStatus(true, ""))
  }
  else {
    if (response.status === 400) {
      let errorCode = get(response.data, 'Error.message', "")
      logErrorMessage(get(response.data, 'Error.message', ""))
      if (errorCode === "") { errorCode = get(response.data, 'Error.ErrorSubcode', "") }
      yield put(DriverActions.submitStatus(false, errorCode))
    }
    else {
      yield put(DriverActions.submitStatus(false, get(response.data, "Error.ErrorSubcode", "")))
      logErrorMessage(get(response.data, 'Error.Message', ""))
    }
  }
}

//  Update Driver Profile
export function* updateDriver(api, { id, data }) {
  // Set header Authorize
  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)

  let object = {
    id,
    data
  }

  const response = yield call(api.updateDriver, object)
  // console.log(response)

  if (response.ok) {
    yield put(DriverActions.submitStatus(true, ""))
  }
  else {
    if (response.status === 400) {
      let errorCode = get(response.data, 'Error.message', "")
      logErrorMessage(get(response.data, 'Error.message', ""))
      if (errorCode === "") { errorCode = get(response.data, 'Error.ErrorSubcode', "") }
      yield put(DriverActions.submitStatus(false, errorCode))
    }
    else {
      yield put(DriverActions.submitStatus(false, get(response.data, "Error.ErrorSubcode", "")))
      logErrorMessage(get(response.data, 'Error.Message', ""))
    }
  }
}

//  Get Driver Profile
export function* getDriverProfile(api, { personalId }) {

  // Set header Authorize
  // yield call(api.setHeader, authen.header)

  // const response = yield call(api.getDriverProfile, personalId)
  // console.log(response)

  // if (response.ok) {
  //   yield put(DriverActions.setDriverProfile(response.data))
  // }
  // else {
  //   yield put(DriverActions.setSubmitLoading(false))
  // }


}



//  Inactive Driver Profile
export function* deleteDriverProfile(api, { personalId }) {
  // console.log("SAGA : deleteDriverProfile", personalId)
  // Set header Authorize
  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)

  const response = yield call(api.deleteDriverProfile, personalId)
  // console.log(response)
  if (response.ok) {
    // yield put(DriverActions.getContact(partnerId))
  }
}

//  Delete Driver
export function* deleteDriver(api, { id }) {
  // console.log("SAGA : deleteDriver", id)
  // Set header Authorize
  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)

  const response = yield call(api.deleteDriver, id)
  // console.log(response)
  if (response.ok) {
    // yield put(DriverActions.getContact(partnerId))
  }
}


export function* getInitialDriverData(api, { }) {

  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)

  const response = yield call(api.getInitialDriverData)
  // console.log(response)
  if (response.ok) {
    yield put(RealtimeActions.setInitialDriverData(response.data.data))
  } else if (response.status === 401) {
    // yield put(SigninActions.signoutSuccess())
  }
  else {
    // yield put(DriverActions.loginFail('*username or password is incorrect'))
  }
}

export function* getDrivingDetail(api, { personalId }) {
  // Set header Authorize
  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)

  const response = yield call(api.getDrivingDetail, personalId)
  if (response.ok) {
    yield put(DriverActions.setDrivingDetail(response.data))
  }
  else {
    yield put(DriverActions.setDrivingDetail([]))
  }
}

//#endregion


export function* getMyVehicles(api, { id }) {
  console.log("SAGA getMyVehicles : ", id)
  const authen = yield select(auth)
  // let header = {
  //   // 'Authorization': authen.header.idToken,
  //   // 'X-API-Key': authen.header.redisKey,
  //   // 'Accept-Language': 'en',
  //   'user_id': id
  // }
  // yield call(api.setHeader, header)
  const response = yield call(api.getMyVehicles, {
    user_id: id,
    start_date: "2020-07-01",
    stop_date: "2020-07-01",
    cust_id: 114,
    dealer_id: 0,
    fleet_id: 0,
  })

  console.log("response : ", response)
  // console.log("getDriver response : ", response)

}
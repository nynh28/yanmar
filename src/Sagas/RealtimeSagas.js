import { call, put, select } from 'redux-saga/effects'
import RealtimeActions from '../Redux/RealtimeRedux'
import ControlRoomActions from '../Redux/ControlRoomRedux'
import { get } from 'lodash'
import SidenavHeader from 'rsuite/lib/Sidenav/SidenavHeader'
const signinRedux = state => state.signin
const VersatileRedux = state => state.versatile
// const auth = state => state.signin

// Get Initial Truck Data
export function* getInitialTruckData(api, { }) {

  // const signin = yield select(signinRedux)
  // let header = {
  //   Authorization: signin.header.idToken,
  //   'X-API-Key': signin.header.redisKey
  // }
  // yield call(api.setHeader, header)

  // // console.log(signin.dataLogin.userId)

  // let InitialData = []

  // const response = yield call(api.getInitialTruckData, { user_id: signin.dataLogin.userId })
  // // console.log("response >> ", response)
  // if (response.ok) {
  //   // InitialData = [...response.data.vehicles]

  //   // let { LastEvaluatedKey, NextTableName } = response.data
  //   // while (NextTableName !== "") {
  //   //   data.LastEvaluatedKey = [LastEvaluatedKey]
  //   //   data.NextTableName = NextTableName
  //   //   console.log('data', data)
  //   //   let resp = yield call(api.getDataUnitLastEvaluatedKey, data)
  //   //   console.log('resp', resp)
  //   //   if (resp.ok) {
  //   //     yield put(GPSUnitActions.getDataUnitAppend(resp.data.result))
  //   //     LastEvaluatedKey = resp.data.LastEvaluatedKey
  //   //     NextTableName = resp.data.NextTableName
  //   //   }

  //   // }
  //   yield put(RealtimeActions.setInitialTruckData(response.data.vehicles))
  // }
  // else {
  //   yield put(RealtimeActions.setInitialTruckData([]))
  // }

  const signin = yield select(signinRedux)
  let header = {
    Authorization: signin.header.idToken,
    'X-API-Key': signin.header.redisKey
  }
  yield call(api.setHeader, header)
  let vehicles = [], LastEvaluatedKey
  const response = yield call(api.getInitialTruckData, { user_id: signin.dataLogin.userId, page: 0, per_page: 200 })
  if (response.ok) {
    vehicles.push(...response.data.vehicles)
    LastEvaluatedKey = response.data.LastEvaluatedKey
    while (LastEvaluatedKey) {
      let resp = yield call(api.getInitialTruckData, { user_id: signin.dataLogin.userId, page: LastEvaluatedKey.page, per_page: 200 })
      if (resp.ok) {
        vehicles.push(...resp.data.vehicles)
        LastEvaluatedKey = resp.data.LastEvaluatedKey
      } else {
        break
      }

    }
    yield put(RealtimeActions.setInitialTruckData(vehicles))
  }
  else {
    yield put(RealtimeActions.setInitialTruckData([]))
  }

}

// Get Initial Events Data
export function* getInitialEventData(api, { }) {

  const response = yield call(api.getInitialEventData)

  if (response.ok) {
    yield put(RealtimeActions.setInitialEventData(response.data.events))
  }
  else {
    // yield put(CustomerActions.loginFail('*username or password is incorrect'))
  }

}


// Get Information
export function* getInformation(api, { vid, zoom, activeMap }) {


  // yield put(RealtimeActions.setInformation(Information))
  const signin = yield select(signinRedux)
  let header = {
    Authorization: signin.header.idToken,
    'X-API-Key': signin.header.redisKey
  }
  yield call(api.setHeader, header)

  // console.log(vid, zoom)

  const response = yield call(api.getInformation, vid)
  // console.log("*** getInformation gpsdate *** : ", response.data.gps.gpsdate + " > speed : ", response.data.gps.speed)
  if (response.ok) {
    yield put(RealtimeActions.setInformation(response.data, zoom, activeMap))

    // yield put(RealtimeActions.setFocusPosition(response.data.gps.lat, response.data.gps.lng))
    // yield put(RealtimeActions.setActiveMap(true))
  }
  else {
    // yield put(CustomerActions.loginFail('*username or password is incorrect'))
  }
}

// Get Events For Truck
export function* getEventDataForTruck(api, { vinNo }) {

  const response = yield call(api.getEventDataForTruck, vinNo)
  if (response.ok) {
    yield put(RealtimeActions.setEventDataForTruck(response.data.events))
  }
  else {
    // yield put(CustomerActions.loginFail('*username or password is incorrect'))
  }
}

// Get Geofence By Types
export function* getGeofenceByTypes(api, { GeofenceTypeIds }) {
  if (GeofenceTypeIds.length === 0) return yield put(RealtimeActions.setGeofenceByTypes([]))

  // const authen = yield select(auth)

  // yield call(api.setHeader, authen.header)
  const signin = yield select(signinRedux)
  let header = {
    Authorization: signin.header.idToken,
    'X-API-Key': signin.header.redisKey
  }
  yield call(api.setHeader, header)

  // const authen = yield select(auth)
  // yield call(api.setHeader, authen.header)

  let param = ""
  for (let index in GeofenceTypeIds) {
    if (param !== "") param += "&GeofenceTypeIds=" + GeofenceTypeIds[index]
    else param += "GeofenceTypeIds=" + GeofenceTypeIds[index]
  }

  const response = yield call(api.getGeofenceByTypes, param)

  // console.log("SAGA getGeofenceByTypes", response)

  if (response.ok) {
    yield put(RealtimeActions.setGeofenceByTypes(response.data.geofenceByTypes))
  }
  else {
    return yield put(RealtimeActions.setGeofenceByTypes([]))
  }
}

// Get Geofence Detail
export function* getGeofenceDetail(api, { geofenceId }) {
  // console.log("getGeofenceDetail : ", geofenceId)
  const signin = yield select(signinRedux)
  const versatile = yield select(VersatileRedux)

  let header = {
    Authorization: signin.header.idToken,
    'X-API-Key': signin.header.redisKey,
    // lang: 'en'
  }
  yield call(api.setHeader, header)
  // if (GeofenceTypeIds.length === 0) return yield put(RealtimeActions.setGeofenceByTypes([]))

  // const authen = yield select(auth)
  // yield call(api.setHeader, authen.header)
  let param = {
    geofenceId,
    lang: versatile.language
  }

  const response = yield call(api.getGeofenceDetail, param)
  // console.log("SAGA getGeofenceDetail", response)

  if (response.ok) {
    yield put(RealtimeActions.setGeofenceDetail(response.data))
  }
  else {
    return yield put(RealtimeActions.setGeofenceDetail([]))
  }
}

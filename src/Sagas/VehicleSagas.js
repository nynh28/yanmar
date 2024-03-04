/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
****************** *******************************************/

import { call, put, select } from 'redux-saga/effects'
import VehicleActions from '../Redux/VehicleRedux'
import { restElement } from '@babel/types'
// import { AuthSelectors } from '../Redux/AuthRedux'
// import { AccessToken, LoginManager } from 'react-native-fbsdk';
// import firebase from 'react-native-firebase';
// const auth = state => state.auth
// const firebase = state => state.firebase
// const auth = state => state.auth   // go to firebase to signup and get access token

const signinRedux = state => state.signin

//Update profile screen 
export function* getProfile(api, { }) {
  const signin = yield select(signinRedux)

  let header = {
    idToken: signin.dataLogin.userTokenInfo.idToken,
    redisKey: signin.dataLogin.redisKey
  }

  yield call(api.setHeader, header)

  const response = yield call(api.getProfile)

  if (response.ok) {
    yield put(VehicleActions.setProfile(response.data))
  }
  else {
    // console.log("getProfile_Fill", response)
  }

}
export function* getDrop11(api, { }) {
  const signin = yield select(signinRedux)

  let header = {
    idToken: signin.dataLogin.userTokenInfo.idToken,
    redisKey: signin.dataLogin.redisKey
  }

  yield call(api.setHeader, header)
  const response = yield call(api.getDrop11)

  if (response.ok) {
    yield put(VehicleActions.setDrop11(response.data))
  }
  else {

  }
}

export function* addProfile(api, { data }) {
  const signin = yield select(signinRedux)

  let header = {
    idToken: signin.dataLogin.userTokenInfo.idToken,
    redisKey: signin.dataLogin.redisKey
  }

  yield call(api.setHeader, header)

  const response = yield call(api.addProfile, data)
  // console.log("addProfile", response)

  if (response.ok) {

    yield put(VehicleActions.setAddProfile(response.data))
    yield put(VehicleActions.submitStatusVehicle(true, "SUCCESS"))
    // console.log("addProfile_OK", response.ok)
  } else {
    yield put(VehicleActions.submitStatusVehicle(false, response.data.Error.ErrorSubcode))
    // console.log("getProfile_Fill", response.data.Error.ErrorSubcode)
  }

}

export function* listVehicle(api, { }) {
  const response = yield call(api.listVehicle)
  // success?
  if (response.ok === true) {
    yield put(VehicleActions.setListVehicleSuccess(response.data.data))
    yield put(VehicleActions.setListVehicleFail(null))
  } else {
    // yield put(ListVehicleActions.setListVehicleFail(response.data.message))
    yield put(VehicleActions.setListVehicleFail(response.problem))
    // yield put(VehicleActions.setListVehicleSuccess(null))
  }
}

export function* addVehicle(api, { data }) {
  const response = yield call(api.addVehicle, data)
  // console.log("response", response)
  if (response.ok == true) {
    yield put(VehicleActions.submitStatusVehicle(true, "SUCCESS"))
    yield put(VehicleActions.setAddVehicleSuccess(response.data))
  } else {


    yield put(VehicleActions.submitStatusVehicle(false, response.data.Error.ErrorSubcode))


  }
}
//tan for vehicle dropdown
export function* vehicleTypeByLaw(api, { data }) {
  // console.log(data)
  for (let i in data) {
    const response = yield call(api.vehicleTypeByLaw, data[i])
    // console.log(data[i], response.data)
    if (response.ok == true) {
      yield put(VehicleActions.setVehicleTypeSuccess(response.data, data[i]))
    }

  }
  // const response = yield call(api.vehicleTypeByLaw, data)
  // console.log("SER", data)
  // if (response.ok == true) {
  //   yield put(VehicleActions.setVehicleTypeSuccess(response.data, data))
  // }
}

export function* editVehicle(api, { id, data }) {
  const edit = {
    id: id,
    body: data
  }

  const response = yield call(api.editVehicle, edit)
  // console.log("editVehicle", response)

  if (response.ok) {
    yield put(VehicleActions.submitStatusVehicle(true, "SUCCESS"))
    yield put(VehicleActions.setEditVehicleSuccess1(response.data))
  }
  else {

    // console.log(response.data)

    yield put(VehicleActions.submitStatusVehicle(false, response.data.Error.ErrorSubcode))

  }

}


export function* checkVinno(api, { VehicleBrandId, VinNo }) {
  const signin = yield select(signinRedux)
  const check = {
    VehicleBrandId: VehicleBrandId,
    VinNo: VinNo
  }

  let header = {
    idToken: signin.dataLogin.userTokenInfo.idToken,
    redisKey: signin.dataLogin.redisKey
  }

  yield call(api.setHeader, header)

  const response = yield call(api.checkVinno, check)
  // console.log("checkVinno", response)
  if (response.ok) {
    yield put(VehicleActions.setVinSuccess1(response.data))
    // console.log("TRUE", response.data.canCreate)
  }
  else {
    yield put(VehicleActions.setVinSuccess1(response.data))
    yield put(VehicleActions.submitStatusVehicle(false, response.data.Error.ErrorSubcode))
  }

}

// Get All Vehicle By ID
export function* getInfoVehicle(api, { id }) {
  const signin = yield select(signinRedux)
  let header = {
    idToken: signin.dataLogin.userTokenInfo.idToken,
    redisKey: signin.dataLogin.redisKey
  }
  yield call(api.setHeader, header)

  const response = yield call(api.getInfoVehicle, id)
  // console.log("getInfoVehicleSaGA", response.data)

  if (response.ok) {
    yield put(VehicleActions.setInfoVehicle(response.data))
  }
  else {
    //   yield put(CustomerActions.loginFail('*username or password is incorrect'))
  }
}


export function* getInfoVehicleExtension(api, { id }) {
  const signin = yield select(signinRedux)
  let header = {
    idToken: signin.dataLogin.userTokenInfo.idToken,
    redisKey: signin.dataLogin.redisKey
  }
  yield call(api.setHeader, header)

  const response = yield call(api.getInfoVehicleExtension, id)
  // console.log("getInfoVehicleExtensionSaGA", response)

  if (response.ok) {
    yield put(VehicleActions.setInfoVehicleExtension(response.data))
    // console.log("SUCCESS", response)
  } else {
    yield put(VehicleActions.setInfoVehicleExtension(response.data.Error.ErrorSubcode))
    // console.log("ERORR", response.data.Error.ErrorSubcode)
  }
}

// Delete Vehicle
export function* deleteVehicle(api, { id }) {
  // console.log(id)
  const signin = yield select(signinRedux)
  let header = {
    idToken: signin.dataLogin.userTokenInfo.idToken,
    redisKey: signin.dataLogin.redisKey
  }
  yield call(api.setHeader, header)

  const response = yield call(api.deleteVehicle, id)
  console.log(response)

  if (response.ok) {
    yield put(VehicleActions.submitStatusVehicle(true, "customer_130"))
    yield put(VehicleActions.setdeleteVehicleSuccess())
    console.log("deleteVehicle")
  } else {
    yield put(VehicleActions.submitStatusVehicle(true, "customer_131"))
  }
}

// Update Vehicle
export function* updateVehicle(api, { vehicle }) {
  //  /api/hino/vehicles/profile
  const response = yield call(api.updateVehicle, vehicle)
  if (response.ok) {
    yield put(VehicleActions.setData(null))
    yield put(VehicleActions.setListVehicle())
  } else {
    ///yield put(DriverActions.createAndUpdateDriverFail())
  }
}
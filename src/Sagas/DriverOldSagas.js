import { call, put } from 'redux-saga/effects'
import DriverActions from '../Redux/DriverRedux'

export function* searchDrivers(api, { id }) {
  const response = yield call(api.searchDrivers, id)
  if (response.ok) {
    yield put(DriverActions.searchDriversSuccess(response.data))
  } else {
    // yield put(DriverActions.searchDrivers())
  }
}

export function* getDriversByID(api, { id }) {
  // console.log(user, pass)
  const response = yield call(api.getDriversByID, id)
  // console.log(response)
  if (response.ok) {

    yield put(DriverActions.getDriversByIDSuccess(response.data))

  } else {
    // yield put(LoginActions.loginFail(response.problem))
  }

}

export function* deleteDriversByID(api, { bID, id }) {
  // console.log(user, pass)
  const data = {
    id: bID ? bID : 2,
    driverId: id
  }
  const response = yield call(api.deleteDriversByID, data)
  if (response.ok) {
    yield put(DriverActions.searchDrivers(bID ? bID : 2))
  } else {
    // yield put(LoginActions.loginFail(response.problem))
  }

}

export function* createDriverOld(api, { id, data }) {

  const addData = {
    'id': id ? id : 2,
    'createDriverRequest': JSON.stringify(data)
  }
  const response = yield call(api.createDriver, addData)
  if (response.ok) {
    yield put(DriverActions.setData(null))
    yield put(DriverActions.searchDrivers(id ? id : 2))
  } else {
    yield put(DriverActions.createAndUpdateDriverFail())

  }
}

export function* updateDrivers(api, { id, driver }) {

  const response = yield call(api.updateDrivers, driver)

  if (response.ok) {
    yield put(DriverActions.setData(null))
    yield put(DriverActions.searchDrivers(id))
  } else {
    yield put(DriverActions.createAndUpdateDriverFail())
  }


}

export function* getDictionary(api) {
  let lang = 'en'
  const response = yield call(api.getDictionary, lang)
  if (response.ok) {
    yield put(DriverActions.getDictionarySuccess(response.data.dropdownDictionary))
  } else {
    //   yield put(DriverActions.getDictionary())
    // yield put(LoginActions.loginFail(response.problem))
  }

}

export function* searchLocationList(api, { name, id }) {
  const response = yield call(api.searchLocationList, name)
  if (response.ok) {
    var list = []
    let level = 1
    if (id === 'subdistrict') {
      level = 3

    } else if (id === 'district') {
      level = 2
    }
    list = response.data.filter(function (data) {
      return data.level === level
    })
    yield put(DriverActions.searchLocationListSuccess(list))
  } else {
    yield put(DriverActions.searchLocationListSuccess([]))
  }
}

export function* getLocation(api, { code }) {
  // else if (id === 'district') {
  //   level = 2
  // }
  // console.log(data)
  const response = yield call(api.getLocation, code)
  if (response.ok) {
    yield put(DriverActions.getLocationSuccess(response.data))
  } else {
    yield put(DriverActions.getLocationSuccess(null))
    // yield put(LoginActions.loginFail(response.problem))
  }
}

export function* getDriverDetailRequest(api, { id }) {
  const response = yield call(api.getDriverDetail, id)
  if (response.ok) {
    yield put(DriverActions.getDriverDetailSuc(response.data))
  } else {
    yield put(DriverActions.getDriverDetailFail())
  }
}




//#region DRIVEER API

//  Check Driver Existing with Customer or Existing on System
export function* getExistingDriver(api, { personalId }) {

}

//  Create a new Driver of Customer
export function* createDriver(api, { personalId }) {

}

//  Get Driver Profile
export function* getDriverProfile(api, { personalId }) {

}

//  Update Driver Profile
export function* updateDriveer(api, { personalId }) {

}

//  Inactive Driver Profile
export function* deleteDriver(api, { personalId }) {

}




  //#endregion
import { call, put, select } from 'redux-saga/effects'
import VersatileActions from '../Redux/VersatileRedux'
import { get } from 'lodash'
// import { AuthSelectors } from '../Redux/AuthRedux'
// import { AccessToken, LoginManager } from 'react-native-fbsdk';
// import firebase from 'react-native-firebase';
// const auth = state => state.auth
// const firebase = state => state.firebase
// const auth = state => state.auth   // go to firebase to signup and get access token
const auth = state => state.signin

export function* getLanguageRequest(api, { data }) {
  const data1 = {
    Language: data
  }
  const response = yield call(api.getLanguage, data1)
  if (response.ok) {
    yield put(VersatileActions.getLanguageSuc(response.data))
  } else {
    yield put(VersatileActions.getLanguageFail(response.data && response.data.message ? response.data.message : (response.problem ? response.problem : '')))
  }
}

// Get Dictionary for a language
export function* getDataDictionary(api, { language }) {
  const data = { Language: language }
  const response = yield call(api.getDataDictionary, data)
  if (response.ok) {
    yield put(VersatileActions.setDataDictionary(response.data))
  }
  else {
    yield put(VersatileActions.failDictionary())
    //   yield put(VersatileActions.getLanguageFail(response.data && response.data.message ? response.data.message : (response.problem ? response.problem : '')))
    // }
  }
}

// Search Government Location
export function* searchLocation(api, { name, level }) {
  /*
  level => 1 = Province
           2 = District
           3 = Subdistrict
  */
  const response = yield call(api.searchLocation, name)

  if (response.ok) {
    var list = []

    // Filter by Level
    list = response.data.filter(function (data) {
      return data.level === level
    })

    yield put(VersatileActions.searchLocationListSuccess(list))

  } else {
    yield put(VersatileActions.searchLocationListSuccess([]))
  }
}

// Get Ancestor Government Location
export function* getLocation(api, { code }) {

  const response = yield call(api.getLocation, code)

  if (response.ok) {
    yield put(VersatileActions.getLocationSuccess(response.data))
  } else {
    yield put(VersatileActions.getLocationSuccess(null))
    // yield put(LoginActions.loginFail(response.problem))
  }
}

// Get Image URL 
export function* getImageUrl(api, { attachCode }) {
  const authen = yield select(auth)
  // console.log("getImageUrl : ", getImageUrl)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }

  yield call(api.setHeader, header)
  const response = yield call(api.getImageUrl, attachCode)
  if (response.ok) {
    yield put(VersatileActions.setImageUrl(response.data))
  } else {
    yield put(VersatileActions.setImageUrl(""))
  }
}
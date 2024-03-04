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
*************************************************************/

import { call, put, select } from 'redux-saga/effects'
import UserSettingActions from '../Redux/UserSettingRedux'
import React from "react";
// import { AuthSelectors } from '../Redux/AuthRedux'
// import { AccessToken, LoginManager } from 'react-native-fbsdk';
// import firebase from 'react-native-firebase';
// const auth = state => state.auth
// const firebase = state => state.firebase
// const auth = state => state.auth   // go to firebase to signup and get access token


export function* getProfileLanguage(api, ) {

  // get current data from Store
  // const currentData = yield select(AuthSelectors.getData)
  // make the call to the api


  const response = yield call(api.getProfileLanguage)
  // success?
  if (response.ok === true) {
    yield put(UserSettingActions.addRoleGroupSuccess(response.data))
  } else {
    yield put(UserSettingActions.addRoleGroupFail(response.problem))
  }
}

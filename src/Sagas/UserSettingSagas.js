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
import UserSetting from '../Containers/UserSetting/UserSetting';
// import { AuthSelectors } from '../Redux/AuthRedux'
// import { AccessToken, LoginManager } from 'react-native-fbsdk';
// import firebase from 'react-native-firebase';
// const auth = state => state.auth
// const firebase = state => state.firebase
// const auth = state => state.auth   // go to firebase to signup and get access token

export function* getRoleGroup(api, { getData }) {

  if (getData.type == 'hino') {
    const response = yield call(api.getRoleGroupHino)
    // success?
    if (response.ok == true) {
      yield put(UserSettingActions.getRoleGroupSuccess(response.data))
    } else {
      yield put(UserSettingActions.getRoleGroupFail(response.problem))
    }
  }
  else {
    const data = getData
    // get current data from Store
    // const currentData = yield select(AuthSelectors.getData)
    // make the call to the api


    const response = yield call(api.getRoleGroup, data)
    // success?
    if (response.ok == true) {
      yield put(UserSettingActions.getRoleGroupSuccess(response.data))
    } else {
      yield put(UserSettingActions.getRoleGroupFail(response.problem))
    }
  }

}

export function* addRoleGroup(api, { businessPartnerId, role, groupType }) {
  const data = {
    id: businessPartnerId,
    groupRequest: role,
  }

  // get current data from Store
  // const currentData = yield select(AuthSelectors.getData)
  // make the call to the api


  const response = yield call(api.addRoleGroup, data)
  // success?
  if (response.ok === true) {
    yield put(UserSettingActions.addRoleGroupSuccess(response.data))
  } else {
    yield put(UserSettingActions.addRoleGroupFail(response.problem))
  }
}

export function* addUserRoleGroup(api, { username, roleName, groupType }) {
  const data = {
    username: username,
    suffixRoleName: roleName
  }
  // get current data from Store
  // const currentData = yield select(AuthSelectors.getData)
  // make the call to the api


  const response = yield call(api.addUserRoleGroup, data)
  // success?
  if (response.ok === true) {
    yield put(UserSettingActions.addUserRoleGroupSuccess())
    yield put(UserSettingActions.getUserGroup({ roleName, groupType }))
  } else {
    yield put(UserSettingActions.addUserRoleGroupFail(response.problem))
    yield put(UserSettingActions.getUserGroup({ roleName, groupType }))
  }
}

export function* removeUserRoleGroup(api, { username, roleName, groupType }) {
  const data = {
    username: username,
    suffixRoleName: roleName
  }
  // get current data from Store
  // const currentData = yield select(AuthSelectors.getData)
  // make the call to the api



  const response = yield call(api.removeUserRoleGroup, data)
  if (response.ok === true) {
    yield put(UserSettingActions.removeUserRoleGroupSuccess())
    yield put(UserSettingActions.getUserGroup({ roleName, groupType }))
  } else {
    yield put(UserSettingActions.removeUserRoleGroupFaill(response.problem))
    yield put(UserSettingActions.getUserGroup({ roleName, groupType }))
  }
}

export function* getUser(api, { getData }) {
  if (getData.type == 'hino') {


    const response = yield call(api.getUserHino)
    // success?
    if (response.ok == true) {
      yield put(UserSettingActions.getUserSuccess(response.data))
    } else {
      yield put(UserSettingActions.getUserFail(response.problem))
    }
  }
  else {
    const data = getData


    const response = yield call(api.getUser, data)
    // success?
    if (response.ok == true) {
      yield put(UserSettingActions.getUserSuccess(response.data))
    } else {
      yield put(UserSettingActions.getUserFail(response.problem))
    }
  }
}

export function* getUserGroup(api, { getData }) {

  if (getData.groupType == 'hino') {
    var data = {
      request: '?SuffixRoleName=' + getData.roleName,
      type: getData.groupType
    }
  }
  else {
    var data = {
      request: '?id=' + getData.id + '&suffixRoleName=' + getData.roleName,
      type: getData.groupType
    }
  }

  const response = yield call(api.getUserGroup, data)
  // success?
  if (response.ok == true) {
    yield put(UserSettingActions.getUserGroupSuccess(response.data))
  } else {
    yield put(UserSettingActions.getUserGroupFail(response.problem))
  }
}

// export function* addUserGroup(api, {getData}) {
//   const data = getData
//   console.log(getData)
//   console.log('========================== Loading Vehicle =============================')
//
//   const response = yield call(api.getUserGroup, data)
//   console.log(response)
//   console.log(response.data)
//   console.log(response.ok)
//   console.log('================== Vehicle Response ============================')
//   // success?
//   if (response.ok == true) {
//     yield put(UserSettingActions.getUserSuccess(response.data))
//   } else {
//     yield put(UserSettingActions.getUserFail(response.problem))
//   }
// }


export function* addUser(api, { getData }) {
  // console.log("Get Role User Setting Sagas")
  // console.log(customerId)
  const data = {
    type: getData.type,
    request: getData.userRequest
  }

  // get current data from Store
  // const currentData = yield select(AuthSelectors.getData)
  // make the call to the api



  const response = yield call(api.addUser, data)
  // success?
  if (response.ok == true) {
    yield put(UserSettingActions.addUserSuccess(response.data))
  } else {
    yield put(UserSettingActions.addUserFail(response.problem))
  }
}





import { call, put } from 'redux-saga/effects'
import RoleSettingActions from '../Redux/RoleSettingRedux'


// Create a new Group
export function* createGroup(api, { roleUser, suffixRoleName, id }) {

  const body = {
    suffixRoleName: suffixRoleName
  }

  const data = {
    id: id
    , suffixRoleName: body
  }


  let response

  if (roleUser == "Hino")
    response = yield call(api.createGroupHino, body)
  else if (roleUser == "Dealer")
    response = yield call(api.createGroupDealer, data)
  else if (roleUser == "Customer")
    response = yield call(api.createGroupCustomer, body)

  if (response.ok) {
    yield put(RoleSettingActions.listPermission(roleUser))
    yield put(RoleSettingActions.listGroupPermission(roleUser, id))
  }
  else {

  }
}

// Get All Policies
export function* listPermission(api, { roleUser }) {

  let response

  if (roleUser == "Hino")
    response = yield call(api.listPoliciesHino, null)
  else if (roleUser == "Dealer")
    response = yield call(api.listPoliciesDealer, null)
  else if (roleUser == "Customer")
    response = yield call(api.listPoliciesCustomer, null)


  if (response.ok) {
    yield put(RoleSettingActions.setListPermission(response.data, ''))
  }
  else {
    //  yield put(RoleSettingActions.loginFail('*username or password is incorrect'))
  }

}


// Get All Group
export function* listGroupPermission(api, { roleUser, id }) {


  let response

  if (roleUser == "Hino")
    response = yield call(api.listGroupPermissionHino, null)
  else if (roleUser == "Dealer")
    response = yield call(api.listGroupPermissionDealer, id)
  else if (roleUser == "Customer")
    response = yield call(api.listGroupPermissionCustomer, id)


  if (response.ok) {
    yield put(RoleSettingActions.setListGroupPermission(response.data, ''))
  }
  else {
    //  yield put(RoleSettingActions.loginFail('*username or password is incorrect'))
  }

}

// Update Permissions for a group
export function* updatePermissionForGroup(api, { roleUser, data, id }) {


  const dataWithID = {
    id: id
    , data: data
  }

  const body = data

  let response

  if (roleUser == "Hino")
    response = yield call(api.updatePermissionForGroupHino, dataWithID)
  else if (roleUser == "Dealer")
    response = yield call(api.updatePermissionForGroupDealer, dataWithID)
  else if (roleUser == "Customer")
    response = yield call(api.updatePermissionForGroupCustomer, dataWithID)


  if (response.ok) {
    yield put(RoleSettingActions.listPermission(roleUser))
    yield put(RoleSettingActions.listGroupPermission(roleUser, id))
  }
  else { }


}


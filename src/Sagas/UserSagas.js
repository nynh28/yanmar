import { call, put, select } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
import { get } from 'lodash'
import { logErrorMessage } from '../Functions/logErrorMessage'

const auth = state => state.signin

function setHeader(authen) {
  // console.log(get(authen, 'dataLogin.userLevelId'))
  let userLevelId = get(authen, 'dataLogin.userLevelId')
  let xApiKey = (userLevelId === 1) ? 'AKIAXRLQKYO37QTLBUPJ'
    : (userLevelId === 21 || userLevelId === 22) ? 'AKIAXRLQKYO37QTLBUPJHINO'
      : (userLevelId === 31 || userLevelId === 32) ? 'AKIAXRLQKYO37QTLBUPJDEALER'
        : (userLevelId === 41 || userLevelId === 42) ? 'AKIAXRLQKYO37QTLBUPJCUSTOMER'
          : (userLevelId === 43) ? 'AKIAXRLQKYO37QTLBUPJFLEET' : ''

  let header = {
    'X-API-Key': xApiKey,
  }
  return header
}

// Get User Search
export function* getUserSearch(api, { name, arr, id }) {
  // Set header Authorize
  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)

  let url = 'Owner' + name
  if (id) url = id + '/' + url
  if (arr && arr.length > 0) {
    if (name === 'Action') url += ('?functions=' + arr.join('&functions='))
    else url += ('?partnerTypes=' + arr.join('&partnerTypes='))
  }

  const response = yield call(api.getUserSearch, url)

  if (response.ok) {
    yield put(UserActions.getUserSearchSuccess(name, response.data))
  }
  else {
    // yield put(UserActions.setUserManage({}))
  }
}

// Reset Password And Unlock
export function* resetAndUnlock(api, { name, id }) {
  // Set header Authorize
  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)

  let url = id + '/' + name
  const response = yield call(api.resetAndUnlock, url)

  if (response.ok) {
    yield put(UserActions.submitStatusResetAndUnlocked(true, ""))
  }
  else {
    if (response.status === 400) {
      let errorCode = get(response.data, 'error.message', "")
      if (errorCode === "") { errorCode = get(response.data, 'Error.ErrorSubcode', "") }
      yield put(UserActions.submitStatusResetAndUnlocked(false, errorCode))
    }
    else
      yield put(UserActions.submitStatusResetAndUnlocked(false, response.data.Error.ErrorSubcode))
  }
}

export function* getUserCreateAndUpdate(api, { name, id, query }) {
  // Set header Authorize
  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)

  let url = name
  if (id) url = id + '/' + name
  if (query) {
    let lst = []
    for (let i in query) {
      let d
      if (Array.isArray(query[i])) d = (i + '=' + query[i].join('&' + i + '='))
      else d = (i + '=' + query[i])
      lst.push(d)
    }
    url += '?' + lst.join('&')
  }
  const response = yield call(api.getUserCreateAndUpdate, url)
  if (response.ok) {
    yield put(UserActions.getUserCreateAndUpdateSuccess(name, response.data))
  }

}
export function* getUserCreateAndUpdateOpt(api, { name, id, query }) {
  // Set header Authorize
  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)

  let url = name
  if (id) url = name + '/' + id
  if (query) {
    let lst = []
    for (let i in query) {
      let d
      if (Array.isArray(query[i])) d = (i + '=' + query[i].join('&' + i + '='))
      else d = (i + '=' + query[i])
      lst.push(d)
    }
    url += '?' + lst.join('&')
  }
  const response = yield call(api.getUserSearch, url)
  if (response.ok) {
    yield put(UserActions.getUserCreateAndUpdateSuccess(name, response.data))
  }
}

//  Search GridView
export function* searchGridView(api, { data, activeTab }) {
  // Set header Authorize
  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)

  const response = yield call(api.searchGridView, {})
  // yield put(UserActions.searchGridViewSuccess(response.data))
}

//  Get Agreement
export function* getAgreementUser(api, data) {
  // Set header Authorize
  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)

  const response = yield call(api.getAgreementUser, data)

  if (response.ok) {
    yield put(UserActions.getAgreementUserSuccess(response.data))
  }
}
//  Get Password Policy
export function* getPasswordPolicy(api, { }) {
  // Set header Authorize
  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)

  const response = yield call(api.getPasswordPolicy)

  if (response.ok) {
    yield put(UserActions.getPasswordPolicySuccess(response.data))
  }
  else {
    // yield put(UserActions.setUserManage({}))
  }
  // yield put(UserActions.searchGridViewSuccess([]))
}

//  Get User Manage
export function* getUserManage(api, { id }) {
  // Set header Authorize
  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)

  const response = yield call(api.getUser, id)
  if (response.ok) {
    yield put(UserActions.setUserManage(response.data))
  }
  else {
    // yield put(UserActions.setUserManage({}))
  }
}

//  Create User
export function* createUser(api, { data }) {

  const response = yield call(api.createUser, data)
  if (response.ok) {
    yield put(UserActions.submitStatus(true, ""))
  }
  else {
    if (response.status === 400) {
      let errorCode = get(response.data, 'error.message', "")
      logErrorMessage(get(response.data, 'error.message', ""))
      if (errorCode === "") { errorCode = get(response.data, 'Error.ErrorSubcode', "") }
      yield put(UserActions.submitStatus(false, errorCode))
    }
    else {
      yield put(UserActions.submitStatus(false, response.data.Error.ErrorSubcode))
      logErrorMessage(get(response.data, 'error.message', ""))
    }
  }
}

//  Update User
export function* updateUser(api, { id, data }) {
  let object = {
    id,
    data
  }

  const response = yield call(api.updateUser, object)
  if (response.ok) {
    yield put(UserActions.submitStatus(true, ""))
  }
  else {
    if (response.status === 400) {
      let errorCode = get(response.data, 'error.message', "")
      if (errorCode === "") { errorCode = get(response.data, 'Error.ErrorSubcode', "") }
      yield put(UserActions.submitStatus(false, errorCode))
    }
    else
      yield put(UserActions.submitStatus(false, response.data.Error.ErrorSubcode))
  }
}

//  Delete User
export function* deleteUser(api, { id }) {
  // Set header Authorize
  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)

  const response = yield call(api.deleteUser, id)
  if (response.ok) {
    yield put(UserActions.deleteUserSuccess())
  }
}


// Get User Option
export function* getDropdownTable(api, { name, id }) {
  // const lstname = ['OwnerPartnersByType', 'UserLevelByType']
  // Set header Authorize
  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)

  let url = ''
  if (name === 'Fleet') url += ('Option/FleetOfCustomer/' + id) //Option/FleetOfCustomer/185
  else if (name === 'Vehicle') url += ('Option/VehicleOfFleet/' + id)
  else if (name === "Role") {
    url += ('Avaiable' + name)
    if (id !== undefined) url += ('?PartnerId=' + id)
  }
  else {
    url += ('Avaiable' + name)
    if (id !== undefined) url += ('/' + id)
  }

  const response = yield call(api.getDropdownTable, url)
  if (response.ok) {
    yield put(UserActions.getDropdownTableSuccess(name, response.data))
  }
  else {
    // yield put(UserActions.setUserManage({}))
  }
}

// Get Permisstion Summary
export function* getPermissionSummary(api, { id }) {

  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)

  const response = yield call(api.getPermisstionSummary, id)

  if (response.ok) {
    yield put(UserActions.setPermissionSummary(response.data))
  }
  else {
    // yield put(UserActions.setUserManage({}))
  }
}


//#region Print & Send Email Form

export function* getDealerToSendEmail(api, { id }) {
  // Set header Authorize
  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)
  const response = yield call(api.getDealerToSendEmail, id)

  if (response.ok) {
    yield put(UserActions.getDealerToSendEmailSuccess(response.data))
  }
  else {
    yield put(UserActions.getDealerToSendEmailSuccess([]))
  }
}

export function* getFileUserForm(api, { id }) {
  // Set header Authorize
  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)
  const response = yield call(api.getFileUserForm, id)

  if (response.ok) {
    yield put(UserActions.getFileUserFormSuccess())
    const linkSource = `data:application/pdf;base64,${response.data}`;
    const downloadLink = document.createElement("a");
    const fileName = "Information.pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();

  }
  else {
    yield put(UserActions.getFileUserFormSuccess())
  }
}

export function* sendEmailUserForm(api, { id, dealerId }) {
  // Set header Authorize
  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }

  let data = {
    id,
    dealerId,
    param: dealerId.length == 0 ? "" : "?dealerId=" + dealerId
  }

  yield call(api.setHeader, header)
  const response = yield call(api.sendEmailUserForm, data)
  if (response.status == 204) {
    yield put(UserActions.sendEmailUserFormSuccess(true))
  }
  else {
    yield put(UserActions.sendEmailUserFormSuccess(false))
  }
}
//#endregion
import { call, put, select } from 'redux-saga/effects'
import PasswordActions from '../Redux/PasswordRedux'
import SigninActions from '../Redux/SigninRedux'
import VersatileActions from '../Redux/VersatileRedux'
import { get } from 'lodash'


const auth = state => state.signin

export function* forgotPassword(api, { targetDelivery }) {

  let body = {
    targetDelivery
  }
  const response = yield call(api.forgotPassword, body)
  // success?
  if (response.ok) {
    yield put(PasswordActions.forgotPasswordSuccess(response.data))
  } else {
    yield put(PasswordActions.forgotPasswordFail(get(response, 'data.Error.ErrorSubcode', '')))

  }

}

export function* confirmForgot(api, { userName, confirmationCode, password }) {

  let body = {
    userName,
    confirmationCode,
    password
  }

  const response = yield call(api.confirmForgot, body)
  // success?
  if (response.ok) {
    yield put(PasswordActions.confirmForgotSuccess())
  } else {
    yield put(PasswordActions.confirmForgotFail(get(response, 'data.Error.ErrorSubcode', '')))
  }

}

export function* changePassword(api, { previousPassword, proposedPassword }) {
  // yield call(api.setHeader, setHeader(authen))
  const authen = yield select(auth)
  let header = {
    // Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey,
  }
  yield call(api.setHeader, header)

  let body = {
    accessToken: get(authen, 'dataLogin.userTokenInfo.accessToken', ''),
    previousPassword,
    proposedPassword
  }

  const response = yield call(api.changePassword, body, header)

  // success?
  if (response.ok) {
    yield put(PasswordActions.changePasswordSuccess())
    yield put(SigninActions.signout())
  } else {
    yield put(PasswordActions.changePasswordFail(get(response, 'data.Error.ErrorSubcode', '')))
  }
}
export function* respondChallenge(api, { newPassword }) {

  // get(authen.dataForce)
  const authen = yield select(auth)

  let body = {
    ...authen.dataForce,
    "userName": authen.username,
    "newPassword": newPassword,
    "applicationId": 1
  }

  const response = yield call(api.respondChallenge, body)
  // success?
  if (response.ok) {
    yield put(SigninActions.addRemember({ value: authen.username }))
    yield put(SigninActions.signinSuccess(response.data))
    yield put(VersatileActions.setLanguage(response.data.language || 'en'))
    yield put(SigninActions.checkAgreement())
  } else {
    yield put(PasswordActions.respondChallengeFail(get(response, 'data.Error.ErrorSubcode', '')))
  }
}

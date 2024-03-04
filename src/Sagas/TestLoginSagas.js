import { call, put, select } from 'redux-saga/effects'
import TestActions from '../Redux/TestRedux'

export function* signin2(api, { user, pass }) {

  const response = yield call(api.signin, user, pass)
  // success?
  if (response.ok) {
    yield put(TestActions.signinSuccess(response.data.errorMessage))
  } else {
    yield put(TestActions.signinFailure(response.data.errorMessage))
  }
}

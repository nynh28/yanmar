import { call, put, select } from "redux-saga/effects";
import AlertSettingActions from "../Redux/AlertSettingRedux";

const signinRedux = state => state.signin;

export function* getDropdownAlertSetting(api, { id }) {
  const signin = yield select(signinRedux);
  yield call(api.setHeader, signin.header);
  const responseUserLevelOwner = yield call(api.getDropdown, 'UserLevelOwner')
  const responseOwnerPartner = yield call(api.getDropdown, 'PartnerOwner')
  const responseAlertType = yield call(api.getDropdownAlertType)
  const responseDealer = yield call(api.getDropdownDealer, id)
  const responseCustomer = yield call(api.getDropdownCustomer, id)
  const responseDropdownUserHMST = yield call(api.getDropdownUserHMST)

  // if (responseUserLevelOwner.ok && responseOwnerPartner.ok && responseAlertType.ok && responseCustomer.ok && responseDealer.ok) {
  //   yield put(AlertSettingActions.getDropdownSuccess(responseUserLevelOwner.data, responseOwnerPartner.data, responseAlertType.data, responseDealer.data, responseCustomer.data));
  if (responseUserLevelOwner.ok && responseOwnerPartner.ok && responseAlertType.ok && responseDropdownUserHMST.ok) {
    yield put(AlertSettingActions.getDropdownSuccess(responseUserLevelOwner.data, responseOwnerPartner.data, responseAlertType.data, responseDealer.data, responseCustomer.data, responseDropdownUserHMST.data));
  } else {
    // getDropdownAlertSetting(api, {id})
    yield put(AlertSettingActions.getDropdownFail());
  }
}
export function* getCriteria(api, { id }) {
  const signin = yield select(signinRedux);
  yield call(api.setHeader, signin.header);
  // const responseUserLevelOwner = yield call(api.getDropdown, 'UserLevelOwner')
  // const responseOwnerPartner = yield call(api.getDropdown, 'PartnerOwner')
  const responseCriteria = yield call(api.getCriteria, id)
  if (responseCriteria.ok) {
    yield put(AlertSettingActions.getCriteriaSuccess(responseCriteria.data));
  } else {
    // getCriteria(api, {id})
    yield put(AlertSettingActions.getCriteriaFail());
  }
}

export function* getDropdownUserHMST(api,) {
  const signin = yield select(signinRedux);
  yield call(api.setHeader, signin.header);
  const responseUserHMST = yield call(api.getDropdownUserHMST)

  if (responseUserHMST.ok) {
    yield put(AlertSettingActions.getDropdownUserHMSTSuccess(responseUserHMST.data));
  } else {
    // getDropdownUserHMST(api, )
    yield put(AlertSettingActions.getDropdownUserHMSTFail());
  }
}

export function* getDropdownUserDealer(api, { id }) {
  const signin = yield select(signinRedux);
  yield call(api.setHeader, signin.header);
  const responseUserDealer = yield call(api.getDropdownUserDealer, id)

  if (responseUserDealer.ok) {
    yield put(AlertSettingActions.getDropdownUserDealerSuccess(responseUserDealer.data));
  } else {
    // getDropdownUserDealer(api, {id})
    yield put(AlertSettingActions.getDropdownUserDealerFail());
  }
}

export function* getDropdownUserCustomer(api, { id }) {
  const signin = yield select(signinRedux);
  yield call(api.setHeader, signin.header);
  const responseUserCustomer = yield call(api.getDropdownUserCustomer, id)

  if (responseUserCustomer.ok) {
    yield put(AlertSettingActions.getDropdownUserCustomerSuccess(responseUserCustomer.data));
  } else {
    // getDropdownUserCustomer(api, {id})
    yield put(AlertSettingActions.getDropdownUserCustomerFail());
  }
}

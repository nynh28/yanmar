import { call, put, select } from 'redux-saga/effects'
import DealerActions from '../Redux/DealerRedux'

const dealerRedux = state => state.dealer
const auth = state => state.signin

// -------------------- get Infomation Dealer By ID --------------------
export function* getInfoDealer(api, { id }) {

  const authen = yield select(auth)
  yield call(api.setHeader, authen.header)

  const response = yield call(api.getInfoDealer, id)
  // console.log(response)
  if (response.ok) {
    //   yield put(DealerActions.getInfoDealerSuccess(response.data))
    // } else {
    //   yield put(DealerActions.getInfoDealerFail(response.problem))
  }
}

// -------------------- create Dealer --------------------
export function* createDealer(api, { newInfo }) {

  // const response = yield call(api.createDealer, newInfo)
  // console.log(response)
  // if (response.ok) {
  //   yield put(DealerActions.createDealerSuc())
  // } else {
  //   yield put(DealerActions.createDealerFail(response.data ? response.data.message : response.problem))
  // }
}

// -------------------- delete Dealer --------------------
export function* deleteDealer(api, { id }) {

  // const response = yield call(api.deleteDealer, id)
  // console.log(response)
  // if (response.ok) {
  //   yield put(DealerActions.getDealerList())
  // } else {
  // yield put(DealerActions.deleteDealerFail(response.data.message))
  // }
}

// -------------------- update Dealer Infomation --------------------
export function* updateDealer(api, { id, updateInfo }) {
  // const response = yield call(api.updateDealer, patch)
  // console.log(response)
  // if (response.ok) {
  //   yield put(DealerActions.updateDealerListSuc())
  // } else {
  //   yield put(DealerActions.updateDealerListFail('Dealer Infomation'))
  // }
}


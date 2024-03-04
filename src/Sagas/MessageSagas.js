import { call, put } from 'redux-saga/effects'
import MessageActions from '../Redux/MessageRedux'


export function* getDataUser(api, { id, groupType }) {

  let response = []
  if (groupType === 'Hino') {
    const responseHino = yield call(api.getDataUserHino)
    if (responseHino.ok) {
      response.push({ name: groupType, data: responseHino.data })
    }
  } else if (groupType === 'Dealer') {
    const responseDealer = yield call(api.getDataUserDealer, id)
    if (responseDealer.ok) {
      response.push({ name: groupType, data: responseDealer.data })
    }
  } else if (groupType === 'Customer') {
    const responseCustomer = yield call(api.getDataUserCustomer, id)
    if (responseCustomer.ok) {
      response.push({ name: groupType, data: responseCustomer.data })
    }
  }

  yield put(MessageActions.getDataUserSuccess(response))


}


// export function* login(api, data) {

//   const response = yield call(api.login, data)
//   console.log(response)
//   if (response.ok) {
//     yield put(SigninActions.getCredential(response.data))
//     // yield put(SigninActions.loginSuccess(response.data))
//   } else if(response.data !== null){
//     yield put(SigninActions.signinFail(response.data.message))
//   }
//   else {
//     yield put(SigninActions.signinFail(response.problem))
//   }

// }

// export function* refresh(api, { refreshToken }) {
//   console.log(' -------- 8.1 -------- ')
//   yield call(api.setHeaderRefresh, refreshToken)
//   const response = yield call(api.refresh)
//   console.log(response)
//   if (response.ok) {
//     yield put(SigninActions.getCredential(response.data))
//     // yield put(SigninActions.loginSuccess(response.data))
//   } else if(response.data !== null){
//     yield put(SigninActions.signinFail(response.data.message))
//   }
//   else {
//     yield put(SigninActions.signinFail(response.problem))
//   }
// }

// export function* getCredential(api, { data }) {
//   // console.log(data.idToken)

//   yield call(api.setIDToken, data.idToken)
//   const response = yield call(api.getCredential)
//   console.log(response)
//   if (response.ok) {
//     yield put(SigninActions.signinSuccess(response.data))
//     // yield put(SigninActions.getHinoRole(response.data))
//   } else if (response.data !== null) {
//     yield put(SigninActions.signinFail(response.data.message))
//   }
//   else {
//     yield put(SigninActions.signinFail(response.problem))
//   }

// }



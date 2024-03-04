import { call, put, select } from 'redux-saga/effects'
import HistoryActions from '../Redux/HistoryRedux'

const { get, isEqual } = require('lodash')
const signinRedux = state => state.user
const auth = state => state.signin

export function* getHistory(api, { vid, startDate, endDate }) {
  let data = {
    start_date: startDate,
    end_date: endDate,
    vid
  }

  // let data = {
  //   start_date: 1588611600,
  //   end_date: 1588697100,
  //   vid: 198495
  // }

  // let data = {
  //   start_date: 1588957200,
  //   end_date: 1589042700,
  //   vid: 198296
  // }



  // let data = {
  //   start_date: 1585760400,
  //   end_date: 1585933140,
  //   vid: 198297
  // }
  // start_date=1585760400&end_date=1585933140&vid=198297  ==> TIME OUT


  const response = yield call(api.getHistory, data)
  // console.log("response : ", response)

  if (response.ok) {
    if (typeof get(response, 'data.trips[0]') === 'string') {
      yield put(HistoryActions.setHistory(null))
    } else {
      yield put(HistoryActions.setHistory(response.data))
      // yield put(HistoryActions.setHistory(null))
    }
  }
  else {
    yield put(HistoryActions.setHistory(null))
  }
}



export function* getListMember(api, { user_id, cust_id }) {
  // const signin = yield select(signinRedux)
  // let header = {
  //   //   Authorization: signin.header.idToken,
  //   'X-API-Key': 'ipBV5jDMiA2WXuAVg5uSjahxNcLFIBKP6P6TpuJE'
  // }

  // yield call(api.setHeader, header)


  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)


  let param = cust_id !== null ? "&cust_id=" + cust_id : ""

  // console.log('================= DATA GET LIST CUSTOMER ==================')
  // const response = yield call(api.getListMember, '?user_id=' + user_id + "&cust_id=" + cust_id)
  const response = yield call(api.getListMember, '?user_id=' + user_id + param)

  // console.log('================= RESPONSE GET LIST CUSTOMER ==================')

  if (response.ok) {
    yield put(HistoryActions.getListMemberSuccess(response.data))
  }
  // else {
  //     yield put(CustomerActions.loginFail('*username or password is incorrect'))
  // }

}



//#region HISTORY TRIP NEW 02-05-2020

export function* getHistoryTrip(api, { vid, startDate, endDate }) {

  // let data = {
  //   start_date: startDate,
  //   end_date: endDate,
  //   vid
  // }
  let data = {
    start_date: 1588438800,
    end_date: 1588524300,
    vid: 198511
  }

  const response = yield call(api.getHistoryTrip, data)
  if (response.ok) {

    yield put(HistoryActions.setHistoryTrip(get(response, 'data'), {}))



    for (let index in get(response, 'data.trips', [])) {
      let imei = response.data.trips[index].imei
      let speed_limit = response.data.trips[index].speed_limit
      let start_date = response.data.trips[index].dtstart
      let end_date = response.data.trips[index].dtstop
      yield put(HistoryActions.getHistoryGps(imei, speed_limit, start_date, end_date, index))
    }

  }
  else {
    yield put(HistoryActions.setHistoryTrip({}))
  }

}
export function* getHistoryGps(api, { imei, speedLimit, startDate, endDate, tripIndex }) {

  let data = {
    imei,
    speed_limit: speedLimit,
    start_date: startDate,
    end_date: endDate
  }
  // let data = {

  //   start_date: 1586304000,
  //   end_date: 1586390399,
  //   vid: 202536
  // }

  const response = yield call(api.getHistoryGps, data)

  if (response.ok) {
    yield put(HistoryActions.setHistoryGps(response.data, tripIndex))
  }
  else {
    yield put(HistoryActions.setHistoryGps([], tripIndex))
  }
}

//#endregion


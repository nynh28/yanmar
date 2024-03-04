import { call, put, select } from 'redux-saga/effects'
import GPSUnitActions from '../Redux/GPSUnitRedux'

const { get, isEqual, isEmpty } = require('lodash')
const signinRedux = state => state.signin
// Get Information
export function* getDataUnit(api, { imei, startDate, endDate, orderBy }) {

  let data = {
    "start_date": startDate,
    "end_date": endDate,
    imei,
    "order_by": orderBy
  }
  //  data = {
  //   "start_date": 1580342400,
  //   "end_date": 1580587200,
  //   "imei": "T011581940005",
  //   "order_by": "Ascending"
  // }
  // data = {
  //   "start_date": 1606521600,
  //   "end_date": 1606694400,
  //   "imei": "T015820100038",
  //   "order_by": "Ascending"
  // }

  const signin = yield select(signinRedux)
  let header = {
    Authorization: signin.header.idToken,
    'X-API-Key': 'ipBV5jDMiA2WXuAVg5uSjahxNcLFIBKP6P6TpuJE'
  }
  yield call(api.setHeader, header)
  const response = yield call(api.getDataUnit, data)

  if (response.ok) {
    yield put(GPSUnitActions.getDataUnitSuccess(response.data.result))
    let { LastEvaluatedKey, NextTableName } = response.data
    while (NextTableName !== "") {
      data.LastEvaluatedKey = [LastEvaluatedKey]
      data.NextTableName = NextTableName
      // console.log('data', data)
      let resp = yield call(api.getDataUnitLastEvaluatedKey, data)
      // console.log('resp', resp)
      if (resp.ok) {
        yield put(GPSUnitActions.getDataUnitAppend(resp.data.result))
        LastEvaluatedKey = resp.data.LastEvaluatedKey
        NextTableName = resp.data.NextTableName
      } else {
        NextTableName = ""
      }
    }
  }
  else {
    yield put(GPSUnitActions.getDataUnitFail(response.problem))
  }
}

import { call, put } from 'redux-saga/effects'
import DashboardActions from '../Redux/DashboardRedux'
export function* callRealtimeApi(api, { }) {
  const response = yield call(api.vehicleData)
  if (response.ok) {
    yield put(DashboardActions.calculateRealtime(response.data))
  } else {
    // yield put(DriverActions.searchDrivers())
  }
}
export function* callDltApi(api, { }) {
  const response = yield call(api.vehicleData)
  if (response.ok) {
    yield put(DashboardActions.calculateDlt(response.data))
  } else {
    // yield put(DriverActions.searchDrivers())
  }
}
export function* callPerDayApi(api, { }) {
  const response = yield call(api.vehicleData2)
  if (response.ok) {
    yield put(DashboardActions.calculatePerDay(response.data))
  } else {
    // yield put(DriverActions.searchDrivers())
  }
}

import { call, put } from 'redux-saga/effects'
import ReportActions from '../Redux/ReportRedux'
export function* callReportApi(api, { }) {
  const response = yield call(api.vehicleData)
  if (response.ok) {
    yield put(ReportActions.calculateReport(response.data))
  } else {
    // yield put(DriverActions.searchDrivers())
  }
}


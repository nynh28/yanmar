import { call, put, select } from "redux-saga/effects";
import DrivingReportActions from "../Redux/DrivingReportRedux";

const auth = (state) => state.signin;
const versatile = (state) => state.versatile;

export function* getDailyReports(api, { obj }) {
  const ver = yield select(versatile);
  const authen = yield select(auth);

  let header = {
    // "X-API-Key": authen.header.redisKey,
    Authorization: authen.header.idToken,
    "Accept-Language": ver.language,
  };
  yield call(api.setHeader, header);

  const response = yield call(api.getDailyReports, obj);
  console.log("PARAM :> ", obj);
  console.log("GET DAILY REPORT RESONSE :> ", response);

  if (response.ok) {
    yield put(
      DrivingReportActions.getDailyReportsSuccess(response.data.result)
    );
  } else {
    yield put(DrivingReportActions.getDailyReportsFailure());
  }
}

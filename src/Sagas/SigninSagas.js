import { call, put, select } from "redux-saga/effects";
import SigninActions from "../Redux/SigninRedux";
import NotificationActions from "../Redux/NotificationRedux";
import MaintenanceActions from "../Redux/MaintenanceRedux";
import MyVehiclesActions from "../Redux/MyVehiclesRedux";
import MyDriversActions from "../Redux/MyDriversRedux";
import VersatileActions from "../Redux/VersatileRedux";
import RealtimeActions from "../Redux/RealtimeRedux";
import RealtimeNewActions from "../Redux/RealtimeNewRedux";
import OtherReportActions from "../Redux/OtherReportRedux";
import CommonActions from "../Redux/CommonRedux";
import SummaryActions from "../Redux/SummaryRedux";
import HistoryActions from "../Redux/HistoryRedux";
import GeofenceActions from "../Redux/GeofenceRedux";
import AnalysisReportActions from "../Redux/AnalysisReportRedux";
import HmstDashboardActions from "../Redux/HMSTdashboardRedux";
import TrackingHistoryActions from "../Redux/TrackingHistoryRedux";
import PlaybackActions from "../Redux/PlaybackRedux";
import InsuranceActions from "../Redux/InsuranceRedux";
import MaintenanceHistoryActions from "../Redux/MaintenanceHistoryRedux";
import DrivingCompetitionActions from "../Redux/DrivingCompetitionRedux";
import GeofenceReportActions from "../Redux/GeofenceReportRedux";

import { get } from "lodash";

const signinRedux = (state) => state.signin;
const versatileRedux = (state) => state.versatile;

export function* signin(api, { username, password, remember }) {
  let data = {
    username,
    password,
  };

  data.applicationId = 1;
  const response = yield call(api.signin, data);

  if (response.status === 200) {
    const responseConfig = yield call(api.getConfig, response.data.userId);
    if (responseConfig.status === 200)
      yield put(SigninActions.setConfig(responseConfig.data.result));

    if (remember) yield put(SigninActions.addRemember({ value: username }));
    yield put(SigninActions.signinSuccess(response.data));
    yield put(VersatileActions.setLanguage(response.data.language || "en"));
    yield put(SigninActions.checkAgreement());
    yield put(RealtimeActions.setDefaultReduxRealtime());
    yield put(OtherReportActions.setDefaultReduxOtherReport());
  } else if (response.status === 302) {
    yield put(SigninActions.forceChangePassword(response.data, data.username));
    yield put(SigninActions.getPasswordPolicyAuth());
  } else if (response.status === 401) {
    yield put(
      SigninActions.signinFail(get(response, "data.Error.ErrorSubcode", ""))
    );
  } else {
    yield put(SigninActions.signinFail(response.problem));
  }
}

export function* signinTractor(
  api,
  { username, password, remember, platformId }
) {
  let data = {
    username,
    password,
  };

  data.platform_id = 3;
  const response = yield call(api.signinTractor, data);

  const responseConfig = yield call(api.getConfig, response.data.user_id);
  if (responseConfig.status === 200) {
    yield put(SigninActions.setConfig(responseConfig.data.result));
  }
  if (response.status === 200) {
    const responseConfig = yield call(api.getConfig, response.data.user_id);
    if (responseConfig.status === 200) {
      yield put(SigninActions.setConfig(responseConfig.data.result));
    }

    if (remember) yield put(SigninActions.addRemember({ value: username }));
    yield put(SigninActions.signinTractorSuccess(response.data));
    // yield put(SigninActions.signinSuccess(response.data));
    yield put(VersatileActions.setLanguage(response.data.language || "en"));
    yield put(SigninActions.checkAgreementSuccess(true));
    yield put(RealtimeActions.setDefaultReduxRealtime());
    yield put(OtherReportActions.setDefaultReduxOtherReport());
    yield put(
      SigninActions.getProfileAndMenuSuccess(
        response.user_menu,
        response.user_profile
      )
    );
  } else if (response.status === 302) {
    yield put(SigninActions.forceChangePassword(response.data, data.username));
    yield put(SigninActions.getPasswordPolicyAuth());
  } else if (response.status === 401) {
    yield put(
      SigninActions.signinFail(get(response, "data.Error.ErrorSubcode", ""))
    );
  } else {
    yield put(SigninActions.signinFail(response.problem));
  }
}

export function* checkAgreement(api, {}) {
  // yield put(SigninActions.checkAgreementSuccess(true));
  const signin = yield select(signinRedux);
  let header = {
    Authorization: signin.header.idToken,
    "X-API-Key": signin.header.redisKey,
  };
  yield call(api.setHeader, header);

  const response = yield call(api.checkAgreement, 1);
  if (response.ok) {
    yield put(SigninActions.checkAgreementSuccess(response.data));
  } else if (response.status === 401) {
    yield put(SigninActions.signoutSuccess());
  } else {
    // yield put(SigninActions.signinFail(responseCheckAgreement.problem))
  }
}

export function* getAgreement(api, {}) {
  const versatile = yield select(versatileRedux);
  const signin = yield select(signinRedux);
  let header = {
    Authorization: signin.header.idToken,
    "X-API-Key": signin.header.redisKey,
    "Accept-Language": versatile.language,
  };
  yield call(api.setHeader, header);

  const response = yield call(api.getAgreement, 1);
  if (response.ok) {
    yield put(SigninActions.getAgreementSuccess(response.data));
  } else if (response.status === 401) {
    yield put(SigninActions.signoutSuccess());
  } else {
    yield put(SigninActions.getAgreementSuccess(false));
  }
}

export function* putAgreement(api, { agree }) {
  const signin = yield select(signinRedux);
  let header = {
    Authorization: signin.header.idToken,
    "X-API-Key": signin.header.redisKey,
  };
  yield call(api.setHeader, header);

  let data = {
    AgreementTypeId: 1,
    IsAgreement: agree,
  };
  const response = yield call(api.putAgreement, data);
  if (response.ok) {
    yield put(SigninActions.checkAgreement());
  } else {
    yield put(SigninActions.signoutSuccess());
  }
}

export function* getProfileAndMenu(api, {}) {
  const signin = yield select(signinRedux);
  let header = {
    Authorization: signin.header.idToken,
    "X-API-Key": signin.header.redisKey,
  };
  yield call(api.setHeader, header);
  const responseProfile = yield call(api.getProfile);
  const responseMenu = yield call(api.getMenu);
  // const responseAction = yield call(api.getAction)
  // if (responseProfile.ok && responseMenu.ok && responseAction.ok) {
  if (responseMenu.ok && responseProfile.ok) {
    yield put(
      SigninActions.getProfileAndMenuSuccess(
        responseMenu.data,
        responseProfile.data
      )
    );
  } else if (responseMenu.status === 401) {
  }
}

export function* signout(api, {}) {
  const signin = yield select(signinRedux);
  let header = {
    Authorization: signin.header.idToken,
    "X-API-Key": signin.header.redisKey,
  };
  yield call(api.setHeader, header);
  let data = {
    redisKey: signin.dataLogin.redisKey,
    logoutScope: 0,
  };
  const response = yield call(api.signout, data);
  if (response.ok || response.status === 401) {
    yield put(SigninActions.signoutSuccess());
    // yield put(RealtimeNewActions.setDefaultReduxRealtimeNew())
    // yield put(NotificationActions.setDefaultReduxNotification())
    // yield put(MyVehiclesActions.setDefaultReduxMyVehicles())
    // yield put(MyDriversActions.setDefaultReduxMyDrivers())
    // yield put(OtherReportActions.setDefaultReduxOtherReport())
    // yield put(CommonActions.setDefaultReduxCommon())
    // yield put(SummaryActions.setDefaultReduxSummary())
    // yield put(GeofenceActions.setDefaultReduxGeofence())
    // yield put(AnalysisReportActions.setDefaultReduxAnalysisReport())
    // yield put(HistoryActions.setDefaultReduxHistory())
    // yield put(HmstDashboardActions.setDefaultReduxHmst())
    // yield put(MaintenanceActions.setDefaultReduxMaintenance())
    // yield put(TrackingHistoryActions.setDefaultReduxTrackingHistory())
    // yield put(PlaybackActions.setDefaultReduxPlayback())
    // yield put(InsuranceActions.setDefaultReduxInsurance())
    // yield put(MaintenanceHistoryActions.setDefaultReduxMaintenanceHistory())
    // yield put(DrivingCompetitionActions.setDefaultReduxDrivingCompetition())
    // yield put(GeofenceReportActions.setDefaultReduxGeofenceReport())
  } else {
  }
}
export function* signoutTractor(api, {}) {
  const signin = yield select(signinRedux);
  let header = {
    Authorization: signin.header.idToken,
    "X-API-Key": signin.header.redisKey,
  };
  yield call(api.setHeader, header);
  let data = {
    redis_key: signin.dataLogin.redis_key,
    logoutScope: 0,
    user_id: signin.dataLogin.user_id,
  };
  const response = yield call(api.signoutTractor, data);
  if (response.ok || response.status === 401) {
    yield put(SigninActions.signoutSuccess());
  } else {
  }
}

export function* refresh(api, {}) {
  const signin = yield select(signinRedux);
  let header = {
    "X-API-Key": signin.header.redisKey,
  };
  yield call(api.setHeader, header);
  let data = {
    refreshToken: signin.dataLogin.userTokenInfo.refreshToken,
  };
  const response = yield call(api.refresh, data);
  if (response.ok) {
    yield put(SigninActions.refreshSuccess(response.data));
  } else if (response.status === 401) {
    yield put(SigninActions.signoutSuccess());
  }
}
export function* refreshTractor(api, {}) {
  const signin = yield select(signinRedux);
  let header = {
    "X-API-Key": signin.header.redisKey,
  };
  yield call(api.setHeader, header);
  let data = {
    refresh_token: signin.dataLogin.user_token_info.refresh_token,
  };
  const response = yield call(api.refreshTractor, data);
  if (response.ok) {
    yield put(SigninActions.refreshTractorSuccess(response.data));
  } else if (response.status === 401) {
    yield put(SigninActions.signoutSuccess());
  }
}
// getPasswordPolicyAuth
export function* getPasswordPolicyAuth(api, {}) {
  const response = yield call(api.getPasswordPolicyAuth);

  if (response.ok) {
    yield put(SigninActions.getPasswordPolicyAuthSuccess(response.data));
  } else {
    // yield put(UserActions.setUserManage({}))
  }
  // yield put(UserActions.searchGridViewSuccess([]))
}

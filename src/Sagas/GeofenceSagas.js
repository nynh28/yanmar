import { call, put, select } from "redux-saga/effects";
import GeofenceActions from "../Redux/GeofenceRedux";

const signinRedux = state => state.signin;
const versatileRedux = state => state.versatile;

const headersLanguage = (authen, language) => {
  return {
    'Authorization': authen.idToken,
    'X-API-Key': authen.redisKey,
    'Accept-Language': language,
  }
}

const headers = (authen) => {
  return {
    'Authorization': authen.idToken,
    'X-API-Key': authen.redisKey,
  }
}

export function* getDropdownGeofence(api, { id }) {
  //   console.log()
  // const signin = yield select(signinRedux);
  // yield call(api.setHeader, signin.header);
  const signin = yield select(signinRedux);
  const versatile = yield select(versatileRedux);
  yield call(api.setHeader, headersLanguage(signin.header, versatile.language));
  // const responseGeofenceType = yield call(api.getDropdownGeofenceType, )
  const responsePartnerName = yield call(api.getDropdownPartnerNameByUserLevel, id);
  const responseGeomType = yield call(api.getDropdownGeomType)
  // console.log(responsePartnerName);
  // console.log(responseGeomType);
  if (responsePartnerName.ok && responseGeomType.ok) {
    yield put(GeofenceActions.getDropdownSuccess(responsePartnerName.data, responseGeomType.data));
  } else {
    // yield put(GeofenceActions.submitStatus(false, responseGeofenceType.data.Error.ErrorSubcode));
    yield put(GeofenceActions.getDropdownFail(responsePartnerName, responseGeomType));
  }
}

export function* getDropdownPartnerName(api, { id }) {
  //   console.log()
  // const signin = yield select(signinRedux);
  // yield call(api.setHeader, signin.header);
  const signin = yield select(signinRedux);
  const versatile = yield select(versatileRedux);
  yield call(api.setHeader, headersLanguage(signin.header, versatile.language));
  // const responseGeofenceType = yield call(api.getDropdownGeofenceType, )
  const responsePartnerName = yield call(api.getDropdownPartnerName);
  const responseGeomType = yield call(api.getDropdownGeomType)
  // console.log(responsePartnerName);
  if (responsePartnerName.ok && responseGeomType.ok) {
    yield put(GeofenceActions.getDropdownPartnerNameSuccess(responsePartnerName.data, responseGeomType.data));
  } else {
    // yield put(GeofenceActions.submitStatus(false, responseGeofenceType.data.Error.ErrorSubcode));
    yield put(GeofenceActions.getDropdownPartnerNameFail(responsePartnerName, responsePartnerName));
  }
}

export function* getDropdownGeofenceType(api, { id }) {
  const signin = yield select(signinRedux);
  const versatile = yield select(versatileRedux);
  yield call(api.setHeader, headers(signin.header));

  const response = yield call(api.getDropdownGeofenceType, id)
  // console.log(response)
  if (response.ok) {
    yield put(GeofenceActions.getDropdownGeofenceTypeSuccess(response.data));
  }
  else {
    yield put(GeofenceActions.getDropdownGeofenceTypeFail(response.data));
  }
}

export function* getPresentIcon(api, { id }) {
  //   console.log()
  // const signin = yield select(signinRedux);
  // yield call(api.setHeader, signin.header);
  const signin = yield select(signinRedux);
  const versatile = yield select(versatileRedux);
  yield call(api.setHeader, headers(signin.header));
  const response = yield call(api.getPresentIcon,)
  // console.log(response);
  if (response.ok) {
    yield put(GeofenceActions.getPresentIconSuccess(response.data));
  } else {
    yield put(GeofenceActions.getPresentIconFail(response.data));
    // yield put(GeofenceActions.submitStatus(false, responseGeofenceType.data.Error.ErrorSubcode));
    // yield put(GeofenceActions.getDropdownFail(responseGeofenceType, responseGeomType));
  }
}

export function* getSourceType(api, id) {
  //   console.log()
  // const signin = yield select(signinRedux);
  // yield call(api.setHeader, signin.header);
  const signin = yield select(signinRedux);
  const versatile = yield select(versatileRedux);
  yield call(api.setHeader, headers(signin.header, versatile.language));
  const responseSourceType = yield call(api.getDropdownSourceType);
  // const responsePartnerType = yield call(api.getDropdownPartnerType);
  // console.log(id)
  const responsePartnerName = yield call(api.getDropdownPartnerNameByUserLevel, id.id);
  const responseIconSource = yield call(api.getRadioIconSource);
  // console.log(responseSourceType);
  // console.log(responsePartnerName);
  if (responseSourceType.ok && responsePartnerName.ok && responseIconSource.ok) {
    yield put(GeofenceActions.getSourceTypeSuccess(responseSourceType.data, responsePartnerName.data, responseIconSource.data));
  } else {
    yield put(GeofenceActions.getSourceTypeFail(responseSourceType.data, responsePartnerName.data, responseIconSource.data));
    // yield put(GeofenceActions.submitStatus(false, responseSourceType.data.Error.ErrorSubcode));
    // yield put(GeofenceActions.getSourceTypeFail(response));
  }
}

export function* getIconByGeofenceType(api, { id }) {
  // const signin = yield select(signinRedux)
  // yield call(api.setHeader, signin.header)
  const signin = yield select(signinRedux);
  const versatile = yield select(versatileRedux);
  yield call(api.setHeader, headers(signin.header));
  // console.log(id)
  const response = yield call(api.getGeofenceType, id);
  // console.log(response.data)

  if (response.ok) {
    yield put(GeofenceActions.getIconByGeofenceTypeSuccess(response.data.attachInfo))
  }
  else {
    yield put(GeofenceActions.getIconByGeofenceTypeFail());
  }

}

export function* getGeofence(api, { id }) {
  //   console.log()
  // const signin = yield select(signinRedux)
  // yield call(api.setHeader, signin.header)
  const signin = yield select(signinRedux);
  const versatile = yield select(versatileRedux);
  yield call(api.setHeader, headers(signin.header));

  // console.log(id)
  const responseData = yield call(api.getGeofence, id);
  // const responseProfile = yield call(api.getUserProfile,);
  // console.log(responseData);
  // console.log(responseProfile);
  if (responseData.ok) {
    yield put(GeofenceActions.getGeofenceSuccess(responseData.data));
    const responseDropdown = yield call(api.getDropdownGeofenceType, responseData.data.partnerNav.key)
    // console.log(responseDropdown)
    if (responseDropdown.ok) {
      yield put(GeofenceActions.getDropdownGeofenceTypeSuccess(responseDropdown.data));
    } else {
      yield put(GeofenceActions.getDropdownGeofenceTypeFail(responseDropdown));
    }
  } else {
    yield put(GeofenceActions.getGeofenceFail(responseData.data));
    // yield put(GeofenceActions.getGeofenceFail(response));
  }
}

export function* addGeofence(api, { geofence }) {
  //   console.log()
  const signin = yield select(signinRedux);
  const versatile = yield select(versatileRedux);
  yield call(api.setHeader, headers(signin.header));

  const response = yield call(api.addGeofence, geofence);
  // console.log(response);
  if (response.ok) {
    // yield put(GeofenceActions.submitStatus(true, ""))
    yield put(GeofenceActions.addGeofenceSuccess(response.data));
  } else {
    console.log(response)
    console.log(response.status)
    // yield put(GeofenceActions.submitStatus(false, response.status));
    // if(response.status == 400){
    //   yield put(GeofenceActions.submitStatus(false, response.data));
    // }
    // else{
    //   yield put(GeofenceActions.submitStatus(false, response.data));
    // }
    // yield put(GeofenceActions.submitStatus(false, response.data.Error.ErrorSubcode));
    yield put(GeofenceActions.addGeofenceFail(response.status));
  }
}

export function* editGeofence(api, { geofence }) {
  //   console.log()
  const signin = yield select(signinRedux);
  const versatile = yield select(versatileRedux);
  yield call(api.setHeader, headers(signin.header));
  const response = yield call(api.editGeofence, geofence);
  // console.log(response);
  if (response.ok) {
    // yield put(GeofenceActions.submitStatus(true, ""))
    yield put(GeofenceActions.editGeofenceSuccess());
  } else {
    // yield put(GeofenceActions.editGeofenceFail(response));
    yield put(GeofenceActions.editGeofenceFail(response.data.Error.ErrorSubcode));
    // yield put(GeofenceActions.submitStatus(false, response.data.Error.ErrorSubcode));
  }
}

export function* deleteGeofence(api, { geofence }) {
  //   console.log()
  // const signin = yield select(signinRedux);
  // yield call(api.setHeader, signin.header);
  const signin = yield select(signinRedux);
  const versatile = yield select(versatileRedux);
  yield call(api.setHeader, headers(signin.header));

  const response = yield call(api.deleteGeofence, geofence);
  // console.log(response);
  if (response.ok) {
    yield put(GeofenceActions.deleteGeofenceSuccess(response.data));
  } else {
    yield put(GeofenceActions.deleteGeofenceFail(response));
  }
}

export function* getGeofenceType(api, { id }) {
  //   console.log()
  const signin = yield select(signinRedux);
  const versatile = yield select(versatileRedux);
  yield call(api.setHeader, headers(signin.header));
  const response = yield call(api.getGeofenceType, id);
  // const responseProfile = yield call(api.getGeofenceType,);
  // console.log(response);
  // console.log(responseProfile);
  if (response.ok) {
    yield put(GeofenceActions.getGeofenceTypeSuccess(response.data));
  } else {
    yield put(GeofenceActions.getGeofenceTypeFail());
  }
}

export function* addGeofenceType(api, { geofenceType }) {
  //   console.log()
  // var data = JSON.stringify(geofenceType[0])
  const signin = yield select(signinRedux);
  const versatile = yield select(versatileRedux);
  yield call(api.setHeader, headers(signin.header));
  // const signin = yield select(signinRedux);
  // yield call(api.setHeader, signin.header);
  const response = yield call(api.addGeofenceType, geofenceType);
  // console.log(geofenceType);
  // console.log(response);
  if (response.ok) {
    // yield put(GeofenceActions.submitStatus(true, ""))
    yield put(GeofenceActions.addGeofenceTypeSuccess());
  } else {
    // yield put(GeofenceActions.submitStatus(false, response.data.Error.ErrorSubcode));
    yield put(GeofenceActions.addGeofenceTypeFail(response.data.Error.ErrorSubcode));
  }
}

export function* editGeofenceType(api, { geofenceType }) {
  //   console.log()
  const signin = yield select(signinRedux);
  const versatile = yield select(versatileRedux);
  yield call(api.setHeader, headers(signin.header));
  const response = yield call(api.editGeofenceType, geofenceType);
  // console.log(response);
  if (response.ok) {
    // yield put(GeofenceActions.submitStatus(true, ""))
    yield put(GeofenceActions.editGeofenceTypeSuccess());
  } else {
    // yield put(GeofenceActions.submitStatus(false, response.data.Error.ErrorSubcode));
    yield put(GeofenceActions.editGeofenceTypeFail(response.data.Error.ErrorSubcode));
  }
}

export function* deleteGeofenceType(api, { geofenceType }) {
  //   console.log()
  const signin = yield select(signinRedux);
  const versatile = yield select(versatileRedux);
  yield call(api.setHeader, headers(signin.header));
  const response = yield call(api.deleteGeofenceType, geofenceType);

  // yield call(api.setHeader, signin.header)
  // console.log(response);
  if (response.ok) {
    yield put(GeofenceActions.deleteGeofenceTypeSuccess(response.data));
  } else {
    yield put(GeofenceActions.deleteGeofenceTypeFail(response));
  }
}

// export function* cloneGeofenceSharing(api, { geofenceSharing }) {
//   //   console.log()
//   const signin = yield select(signinRedux);
//   yield call(api.setHeader, signin.header);
//   const response = yield call(api.cloneGeofenceSharing, geofenceSharing);

//   // yield call(api.setHeader, signin.header)
//   console.log(response);
//   if (response.ok) {
//     yield put(GeofenceActions.cloneGeofenceSharingSuccess(response.data));
//   } else {
//     yield put(GeofenceActions.cloneGeofenceSharingFail(response));
//   }
// }

export function* cloneGeofenceSharing(api, { geofenceSharing }) {
  const signin = yield select(signinRedux);
  yield call(api.setHeader, signin.header);
  const response = yield call(api.cloneGeofenceSharing, geofenceSharing);

  // yield call(api.setHeader, signin.header)
  // console.log(response);
  if (response.ok) {
    yield put(GeofenceActions.cloneGeofenceSharingSuccess());
    yield put(GeofenceActions.submitStatus(true, ""))
  } else {
    yield put(GeofenceActions.cloneGeofenceSharingFail());
    yield put(GeofenceActions.submitStatus(false, response.data.Error.ErrorSubcode));
  }
}

export function* editGeofenceSharing(api, { id, geofenceSharing }) {
  //   console.log()
  let data = [
    geofenceSharing,
    {
      id: id
    }
  ]
  const signin = yield select(signinRedux);
  yield call(api.setHeader, signin.header);
  const response = yield call(api.editGeofenceSharing, data);

  // yield call(api.setHeader, signin.header)
  // console.log(response);
  if (response.ok) {
    // yield put(GeofenceActions.editGeofenceSharingSuccess());
    yield put(GeofenceActions.submitStatus(true, ""))
  } else {
    // yield put(GeofenceActions.editGeofenceSharingFail());
    yield put(GeofenceActions.submitStatus(false, response.data.Error.ErrorSubcode));
  }
}


// Get Geofence By Types
export function* getGeofenceByTypesGeof(api, { GeofenceTypeIds }) {
  if (GeofenceTypeIds.length === 0) return yield put(GeofenceActions.setGeofenceByTypesGeof([]))

  const signin = yield select(signinRedux)
  let header = {
    Authorization: signin.header.idToken,
    'X-API-Key': signin.header.redisKey
  }
  yield call(api.setHeader, header)

  let param = ""
  for (let index in GeofenceTypeIds) {
    if (param !== "") param += "&GeofenceTypeIds=" + GeofenceTypeIds[index]
    else param += "GeofenceTypeIds=" + GeofenceTypeIds[index]
  }

  const response = yield call(api.getGeofenceByTypes, param)

  if (response.ok) {
    yield put(GeofenceActions.setGeofenceByTypesGeof(response.data.geofenceByTypes))
  }
  else {
    return yield put(GeofenceActions.setGeofenceByTypesGeof([]))
  }
}

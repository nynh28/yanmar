import { call, put, select } from 'redux-saga/effects'
import DropdownActions from '../Redux/DropdownRedux'
const auth = state => state.signin

export function* getDataDropdown(api, { optionGroup, key }) {
  if (key === 0) return yield put(DropdownActions.setDataDropdown([], optionGroup))

  let param = optionGroup
  if (key !== undefined) param += "&Key=" + key

  const authen = yield select(auth)
  yield call(api.setHeader, authen.header)

  let response = ""
  if (optionGroup === "Seller"
    || optionGroup === "VehicleAllocationOwner"
    || optionGroup === "PartnerOwner"
    || optionGroup === "SourceType"
    || optionGroup === "GeofenceType"
    || optionGroup === "Geofence"
    || optionGroup === "UserLevelOwner"
    || optionGroup === "Customer"
    || optionGroup === "PartnerOwnerByLevel"
  )  // Get Dropdown with permission of Current use
    response = yield call(api.getDataDropdownWithPermission, param)
  else
    response = yield call(api.getDataDropdown, param)

  if (response.ok) {
    yield put(DropdownActions.setDataDropdown(response.data, optionGroup))
  }
  else {
    yield put(DropdownActions.setDataDropdown([], optionGroup))
  }
}


export function* getDataDropdownVehicle(api, { optionGroup, key }) {
  if (key === 0) return yield put(DropdownActions.setDataDropdown([], optionGroup))

  let param = optionGroup
  if (key !== undefined) param += "&Key=" + key

  const authen = yield select(auth)
  yield call(api.setHeader, authen.header)

  let response = ""
  if (optionGroup === "Seller"
    || optionGroup === "VehicleAllocationOwner"
    || optionGroup === "PartnerOwner"
    || optionGroup === "SourceType"
    || optionGroup === "GeofenceType"
    || optionGroup === "Geofence"
    || optionGroup === "UserLevelOwner"
    || optionGroup === "Customer"
    || optionGroup === "PartnerOwnerByLevel"
  )  // Get Dropdown with permission of Current use
    response = yield call(api.getDataDropdownWithPermission, param)
  else
    response = yield call(api.getDataDropdownVehicle, param)

  if (response.ok) {
    yield put(DropdownActions.setDataDropdown(response.data, optionGroup))
  }
  else {
    yield put(DropdownActions.setDataDropdown([], optionGroup))
  }
}

export function* getDataDropdownLocation(api, { optionGroup, key, stateName }) {
  if (key === 0) return yield put(DropdownActions.setDataDropdownLocation([], stateName))

  let param = optionGroup
  if (key !== "") param += "&Key=" + key

  const authen = yield select(auth)
  yield call(api.setHeader, authen.header)
  let response = yield call(api.getDataDropdown, param)
  // console.log(stateName, key, response)
  if (response.ok) {
    yield put(DropdownActions.setDataDropdownLocation(response.data, stateName))
  }
  else {
    yield put(DropdownActions.setDataDropdownLocation([], stateName))
  }
}

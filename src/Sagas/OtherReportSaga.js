import { call, put, select } from 'redux-saga/effects'
import OtherReportActions from '../Redux/OtherReportRedux'
const auth = state => state.signin
const VersatileRedux = state => state.versatile

const lgMenu = {
  // "101": "other_reports_109",
  // "201": "other_reports_110",
  // "202": "other_reports_111",
  // "203": "other_reports_112",
  // "301": "other_reports_113",
  // "302": "other_reports_114",
  // "303": "other_reports_115",
  // "304": "other_reports_116",
  // "305": "other_reports_117",
  // "306": "other_reports_118",
  "401": "other_reports_119",
  "402": "other_reports_122",
  // "403": "other_reports_138"
}

export function* getVehicles(api, { user_id, cust_id = [], fleet_id = [] }) {
  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)

  let param = '?user_id=' + user_id
  if (cust_id.length != 0) param += "&cust_id=" + cust_id
  if (fleet_id.length != 0) param += "&fleet_id=" + fleet_id

  const response = yield call(api.getVehicles, param)
  if (response.ok) {
    yield put(OtherReportActions.setVehicles(response.data))
  }
  else {
    yield put(OtherReportActions.setVehicles([]))
  }
}

export function* getVehiclesMulti(api, { data }) {


  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)


  const response = yield call(api.getVehiclesMulti, data)
  if (response.ok) {
    yield put(OtherReportActions.setVehiclesOfOtherReport(response.data))
  }
  else {
    yield put(OtherReportActions.setVehiclesOfOtherReport([]))
  }
}

export function* getReportMenu(api, { user_id }) {
  const authen = yield select(auth)
  const versatile = yield select(VersatileRedux)

  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': versatile.language
  }
  yield call(api.setHeader, header)

  const response = yield call(api.getReportMenu, user_id)
  if (response.ok) {
    // let listsMenu = response.data.result TEST
    let listsMenu = [
      {
        "groupName": "menu.report.category.vehicle.usage",
        "items": [
          {
            "key": "101",
            "value": "101 - Driving Summary"
          }
        ]
      },
      {
        "groupName": "menu.report.category.activity",
        "items": [
          {
            "key": "201",
            "value": "201 - Over Speed Limit"
          },
          {
            "key": "202",
            "value": "202 - Excessive Idle"
          },
          {
            "key": "203",
            "value": "203 - Excessive Parking"
          }
        ]
      },
      {
        "groupName": "menu.report.category.dlt",
        "items": [
          {
            "key": "301",
            "value": "301 - DLT Driving Over Speed"
          },
          {
            "key": "302",
            "value": "302 - DLT Driving Contineous 4h"
          },
          {
            "key": "303",
            "value": "303 - DLT Driving Over 8h per Day"
          },
          {
            "key": "304",
            "value": "304 - DLT Not Swipe Driving Licnese Card"
          },
          {
            "key": "305",
            "value": "305 - DLT Wrong License Type"
          },
          {
            "key": "306",
            "value": "306 - DLT GPS Unplugged"
          }
        ]
      },
      {
        "items": [
          {
            "key": "401",
            "value": "401 - Geofence"
          },
          {
            "key": "402",
            "value": "402 - Insurance Report"
          },
          // {
          //   "key": "403",
          //   "value": "403 - Geo Fence เข้าศูนย์เกิน 3 วัน(72 ชม)"
          // }
        ]
      }
    ]

    let result = listsMenu.map((obj) => {
      obj.items = obj.items.map((item) => {
        item.value = lgMenu[item.key]
        return item
      })
      return obj
    })
    yield put(OtherReportActions.setReportMenu(result))
  }
  else {
    yield put(OtherReportActions.setReportMenu([]))
  }
}

export function* getFleet(api, { user_id }) {
  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)
  const response = yield call(api.getFleet, user_id)
  if (response.ok) {
    yield put(OtherReportActions.setFleet(response.data.result))
  }
  else {
    yield put(OtherReportActions.setFleet([]))
  }
}

export function* getCustomer(api, { user_id }) {
  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)
  const response = yield call(api.getCustomer, { userId: user_id })
  if (response.ok) {
    let data = response.data.map((item) => { return { key: item.int_cust_id, value: item.customer_name } })
    yield put(OtherReportActions.setCustomerOtherReport(data))
  }
  else {
    yield put(OtherReportActions.setCustomerOtherReport([]))
  }
}

export function* getDrivingMaster(api, { body }) {
  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)

  const response = yield call(api.getDrivingMaster, body)

  if (response.ok) {
    yield put(OtherReportActions.getDrivingMaster(response.data.result))
  }
  else {
    yield put(OtherReportActions.setDrivingMaster([]))
  }
}

export function* getDriving(api, { body }) {
  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)

  const response = yield call(api.getDriving, body)
  if (response.ok) {
    yield put(OtherReportActions.getDriving(response.data.result))
  }
  else {
    yield put(OtherReportActions.setDriving([]))
  }
}

export function* getInstall(api, { data }) {
  const authen = yield select(auth)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey
  }
  yield call(api.setHeader, header)

  const response = yield call(api.getInstall, data)
  if (response.ok) {
    yield put(OtherReportActions.setInstall(response.data))
  }
  else {
    yield put(OtherReportActions.setInstall([]))
  }
}

//#region Load Master Data
export function* getMasterData(api, { body, url }) {
  const authen = yield select(auth)
  const versatile = yield select(VersatileRedux)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': versatile.language
  }
  yield call(api.setHeader, header)

  let object = {
    url,
    body
  }

  const response = yield call(api.getMasterData, object)

  if (response.ok) {
    yield put(OtherReportActions.setMasterData(response.data.result))
  }
  else {
    yield put(OtherReportActions.setMasterData([]))
  }
}
//#endregion


//#region Load Summary Data
export function* getSummaryData(api, { body, url }) {
  const authen = yield select(auth)
  const versatile = yield select(VersatileRedux)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': versatile.language
  }
  yield call(api.setHeader, header)

  let object = {
    url,
    body
  }

  const response = yield call(api.getSummaryData, object)

  if (response.ok) {
    yield put(OtherReportActions.setSummaryData(response.data.result))
  }
  else {
    // yield put(OtherReportActions.setSummaryData([]))
    yield put(OtherReportActions.getSummaryData(body, url))
  }
}
//#endregion


//#region Load Detail Data
export function* getDetailData(api, { body, url }) {
  const authen = yield select(auth)
  const versatile = yield select(VersatileRedux)
  let header = {
    Authorization: authen.header.idToken,
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': versatile.language
  }

  yield call(api.setHeader, header)

  let object = {
    url,
    body
  }

  const response = yield call(api.getDetailData, object)
  if (response.ok) {
    yield put(OtherReportActions.setDetailData(response.data.result))
  }
  else {
    yield put(OtherReportActions.setDetailData([]))
  }
}
//#endregion

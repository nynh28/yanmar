import { call, put, select } from 'redux-saga/effects'
import SubscriptionActions from '../Redux/SubscriptionRedux'
import { restElement } from '@babel/types'



const auth = state => state.signin
const versatile = state => state.versatile





export function* DltVehicleType(api, { }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }

  yield call(api.setHeader, header)

  const response = yield call(api.DltVehicleType)
  // console.log("DltVehicleType", response)

  if (response.ok) {

    yield put(SubscriptionActions.setDltVehicleType(response.data))
    //   yield put(SubscriptionActions.submitStatus(true, ""))
    // console.log("ropdown_OK", response.data)
  }
  else {
    if (response.data.Error.ErrorSubcode === "") {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.Message, true))
    } else {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.ErrorSubcode, true))
    }
    // console.log("ropdown_Fill", response)
  }

}
export function* DltBodyType(api, { id }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }

  yield call(api.setHeader, header)

  const response = yield call(api.DltBodyType, id)
  // console.log("DltBodyType", response)

  if (response.ok) {

    yield put(SubscriptionActions.setDltBodyType(response.data))
    //   yield put(SubscriptionActions.submitStatus(true, ""))
    // console.log("ropdown_OK", response.data)
  }
  else {
    if (response.data.Error.ErrorSubcode === "") {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.Message, true))
    } else {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.ErrorSubcode, true))
    }
    // console.log("ropdown_Fill", response)
  }

}
export function* CargolinkType(api, { }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }

  yield call(api.setHeader, header)

  const response = yield call(api.CargolinkType)
  // console.log("CargolinkType", response)

  if (response.ok) {

    yield put(SubscriptionActions.setCargolinkType(response.data))
    //   yield put(SubscriptionActions.submitStatus(true, ""))
    // console.log("ropdown_OK", response.data)
  } else {
    if (response.data.Error.ErrorSubcode == "") {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.Message, true))
    } else {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.ErrorSubcode, true))
    }
    // console.log("ropdown_Fill", response)
  }

}
export function* DocumentType(api, { }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }

  yield call(api.setHeader, header)

  const response = yield call(api.DocumentType)
  // console.log("DocumentType", response)

  if (response.ok) {

    yield put(SubscriptionActions.setDocumentType(response.data))
    //   yield put(SubscriptionActions.submitStatus(true, ""))
    // console.log("ropdown_OK", response.data)
  }
  else {
    if (response.data.Error.ErrorSubcode == "") {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.Message, true))
    } else {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.ErrorSubcode, true))
    }
    // console.log("ropdown_Fill", response)
  }

}


export function* TableSub(api, { }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }

  yield call(api.setHeader, header)

  const response = yield call(api.TableSub)
  // console.log("DocumentType", response)

  if (response.ok) {

    // console.log("TableSub", response.data)
    yield put(SubscriptionActions.setTableSub(response.data.data))
    //   yield put(SubscriptionActions.submitStatus(true, ""))
    // console.log("ropdown_OK", response.data)
  }
  else {
    // if (response.data.Error.ErrorSubcode == "") {
    //   yield put(SubscriptionActions.submitStatus(false, response.data.Error.Message, true))
    // } else {
    //   yield put(SubscriptionActions.submitStatus(false, response.data.Error.ErrorSubcode, true))
    // }
    // console.log("ropdown_Fill", response)
  }

}



export function* Package(api, { }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }

  yield call(api.setHeader, header)

  const response = yield call(api.Package)
  // console.log("Package", response)

  if (response.ok) {

    yield put(SubscriptionActions.setPackage(response.data))
    //   yield put(SubscriptionActions.submitStatus(true, ""))
    // console.log("ropdown_OK", response.data)
  }
  else {
    if (response.data.Error.ErrorSubcode == "") {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.Message, true))
    } else {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.ErrorSubcode, true))
    }
    // console.log("ropdown_Fill", response)
  }

}
export function* PackageID(api, { id }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }

  yield call(api.setHeader, header)

  const response = yield call(api.PackageID, id)
  // console.log("PackageID", response)

  if (response.ok) {

    yield put(SubscriptionActions.setPackageID(response.data))
    //   yield put(SubscriptionActions.submitStatus(true, ""))
    // console.log("ropdown_OK", response.data)
  }
  else {
    if (response.data.Error.ErrorSubcode == "") {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.Message, true))
    } else {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.ErrorSubcode, true))
    }
    // console.log("ropdown_Fill", response)
  }

}
export function* CustomerBY(api, { id }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }

  yield call(api.setHeader, header)

  const response = yield call(api.CustomerBY, id)
  // console.log("CustomerBY", response)

  if (response.ok) {

    yield put(SubscriptionActions.setCustomerBY(response.data))
    //   yield put(SubscriptionActions.submitStatus(true, ""))
    // console.log("ropdown_OK", response.data)
  }
  else {
    if (response.data.Error.ErrorSubcode == "") {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.Message, true))
    } else {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.ErrorSubcode, true))
    }
    // console.log("ropdown_Fill", response)
  }

}
export function* getCustomer(api, { id }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }

  yield call(api.setHeader, header)

  const response = yield call(api.getCustomer, id)
  // console.log("getCustomer", response)

  if (response.ok) {

    yield put(SubscriptionActions.setgetCustomer(response.data))
    //   yield put(SubscriptionActions.submitStatus(true, ""))
    // console.log("ropdown_OK", response.data)
  }
  else {
    if (response.data.Error.ErrorSubcode == "") {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.Message, true))
    } else {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.ErrorSubcode, true))
    }
    // console.log("ropdown_Fill", response)
  }

}


export function* getPay(api, { id }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }

  yield call(api.setHeader, header)

  const response = yield call(api.getPay, id)
  // console.log("getPay", response)

  if (response.ok) {

    yield put(SubscriptionActions.setgetPay(response.data))
    //   yield put(SubscriptionActions.submitStatus(true, ""))
    // console.log("ropdown_OK", response.data)
  }
  else {
    if (response.data.Error.ErrorSubcode == "") {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.Message, true))
    } else {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.ErrorSubcode, true))
    }
    // console.log("ropdown_Fill", response)
  }

}
export function* MyDealers(api, { }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }

  yield call(api.setHeader, header)

  const response = yield call(api.MyDealers)


  if (response.ok) {

    yield put(SubscriptionActions.setMyDealers(response.data))
    //   yield put(SubscriptionActions.submitStatus(true, ""))
    // console.log("ropdown_OK", response.data)
  }
  else {
    if (response.data.Error.ErrorSubcode == "") {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.Message, true))
    } else {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.ErrorSubcode, true))
    }
    // console.log("ropdown_Fill", response)
  }

}


export function* postProfile(api, { data }) {

  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }


  yield call(api.setHeader, header)

  const response = yield call(api.postProfile, data)
  console.log("postProfile", response.data)

  if (response.ok) {

    yield put(SubscriptionActions.setgetProfileSub(response.data))
    yield put(SubscriptionActions.submitStatus(true, ""))
    // console.log("ropdown_OK", response.data)
  } else {

    if (response.data.Error.ErrorSubcode == "") {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.Message, true))
    } else {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.ErrorSubcode, true))
    }


  }
}

export function* getProfileSub(api, { id }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }

  yield call(api.setHeader, header)

  const response = yield call(api.getProfileSub, id)
  // console.log("getProfileSub", response.data)

  if (response.ok) {

    yield put(SubscriptionActions.setgetProfileSub(response.data))
    //   yield put(SubscriptionActions.submitStatus(true, ""))
    // console.log("ropdown_OK", response.data)
  }
  else {
    if (response.data.Error.ErrorSubcode == "") {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.Message))
    } else {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.ErrorSubcode))
    }
    // console.log("ropdown_Fill", response)
  }

}
export function* delSubscriber(api, { id, subscriberID }) {


  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }

  yield call(api.setHeader, header)

  const response = yield call(api.delSubscriber, id, subscriberID)
  // console.log("delSubscriber", response.data)

  if (response.ok) {

    yield put(SubscriptionActions.setdelSubscriber(response.data))
    yield put(SubscriptionActions.submitStatus(true, "", true))
    // console.log("ropdown_OK", response.data)
  }
  else {
    if (response.data.Error.ErrorSubcode !== "") {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.Message, true))
    } else {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.ErrorSubcode, true))
    }
    yield put(SubscriptionActions.submitStatus(false, "", true))
  }

}

export function* showSubscriber(api, { SubscriptionID, subscriberID }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }

  yield call(api.setHeader, header)

  const response = yield call(api.showSubscriber, SubscriptionID, subscriberID)
  // console.log("SubscriptionID, subscriberID", response.data)

  if (response.ok) {

    yield put(SubscriptionActions.setshowSubscriber(response.data))
    //   yield put(SubscriptionActions.submitStatus(true, ""))
    // console.log("ropdown_OK", response.data)
  }
  else {
    if (response.data.Error.ErrorSubcode == "") {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.Message))
    } else {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.ErrorSubcode))
    }
    // console.log("ropdown_Fill", response)
  }

}



export function* VerifyCust(api, { id }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }

  yield call(api.setHeader, header)

  const response = yield call(api.VerifyCust, id)
  console.log("VerifyCust", response)

  if (response.ok) {

    yield put(SubscriptionActions.setVerifyCust(response))
    yield put(SubscriptionActions.submitStatus(true, "success", true))
    // console.log("ropdown_OK", response.data)
  }
  else {
    if (response.data.Error.ErrorSubcode == "") {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.Message, true))
    } else {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.ErrorSubcode, true))
    }
    // console.log("ropdown_Fill", response)
  }

}

export function* VerifyPaymentCust(api, { id }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }

  yield call(api.setHeader, header)

  const response = yield call(api.VerifyPaymentCust, id)
  console.log("VerifyPaymentCust", response)

  if (response.ok) {

    yield put(SubscriptionActions.setVerifyPaymentCust(response))
    yield put(SubscriptionActions.submitStatus(true, "success", true))
    // console.log("ropdown_OK", response.data)
  }
  else {
    if (response.data.Error.ErrorSubcode == "") {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.Message, true))
    } else {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.ErrorSubcode, true))
    }
    // console.log("ropdown_Fill", response)
  }

}


export function* putSubscriber(api, { SubscriptionID, subscriberID, data }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }

  yield call(api.setHeader, header)

  const response = yield call(api.putSubscriber, SubscriptionID, subscriberID, data)
  console.log("putSubscriber", response)

  if (response.ok) {

    yield put(SubscriptionActions.setputSubscriber(response))
    yield put(SubscriptionActions.submitStatus(true, "", true))
    // console.log("ropdown_OK", response.data)
  }
  else {
    if (response.data.Error.ErrorSubcode === "") {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.Message, true))
    } else {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.ErrorSubcode, true))
    }
    // console.log("ropdown_Fill", response)
  }

}

export function* VerifySub(api, { id, subscriberId, isAgree, dateStart }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }

  yield call(api.setHeader, header)



  const response = yield call(api.VerifySub, id, subscriberId, isAgree, dateStart)
  console.log("VerifySub", response)

  if (response.ok) {

    yield put(SubscriptionActions.setVerifySub(response))
    yield put(SubscriptionActions.submitStatus(true, "", true))
    // console.log("ropdown_OK", response.data)
  }
  else {
    if (response.data.Error.ErrorSubcode === "") {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.Message, true))
    } else if (response.data.Error.Message === "") {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.ErrorSubcode, true))
    } else {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error, true))
    }
    // console.log("ropdown_Fill", response)
  }

}



export function* Map(api, { id }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }

  yield call(api.setHeader, header)

  const response = yield call(api.Map, id)
  console.log("Map", response.data)

  if (response.ok) {

    yield put(SubscriptionActions.setMap(response.data))
    yield put(SubscriptionActions.submitStatus(true, "success", true))
    // console.log("ropdown_OK", response.data)
  }
  else {
    if (response.data.Error.ErrorSubcode === "") {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.Message, true))
    } else {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.ErrorSubcode, true))
    }
    // console.log("ropdown_Fill", response)
  }

}


export function* Create(api, { id, code }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }

  yield call(api.setHeader, header)

  const response = yield call(api.Create, id, code)
  console.log("Create", response.data)

  if (response.ok) {

    yield put(SubscriptionActions.setCreate(response.data))
    yield put(SubscriptionActions.submitStatus(true, "success", true))
    // console.log("ropdown_OK", response.data)
  }
  else {
    if (response.data.Error.ErrorSubcode === "") {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.Message, true))
    } else {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.ErrorSubcode, true))
    }
    // console.log("ropdown_Fill", response)
  }

}
/////////////////////
export function* Signatures(api, { id }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }

  yield call(api.setHeader, header)

  const response = yield call(api.Signatures, id)
  // console.log("Signatures", response.data)

  if (response.ok) {

    yield put(SubscriptionActions.setSignatures(response.data))
    // yield put(SubscriptionActions.submitStatus(true, "success"))
    // console.log("ropdown_OK", response.data)
  }
  else {
    if (response.data.Error.ErrorSubcode === "") {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.Message, true))
    } else {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.ErrorSubcode, true))
    }

    // yield put(SubscriptionActions.submitStatus(false, response.data.Error.Message))
    // console.log("ropdown_Fill", response)
  }

}
export function* ResendDlt(api, { id, subscriberId }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }

  yield call(api.setHeader, header)

  const response = yield call(api.ResendDlt, id, subscriberId)
  // console.log("Signatures", response.data)

  if (response.ok) {

    yield put(SubscriptionActions.setResendDlt(response.data))
    // yield put(SubscriptionActions.submitStatus(true, "success"))
    // console.log("ropdown_OK", response.data)
  }
  else {
    if (response.data.Error.ErrorSubcode === "") {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.Message, true))
    } else {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.ErrorSubcode, true))
    }
    // console.log("ropdown_Fill", response)
  }

}

export function* ActiveGps(api, { id, subscriberId }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }

  yield call(api.setHeader, header)

  const response = yield call(api.ActiveGps, id, subscriberId)
  // console.log("Signatures", response.data)

  if (response.ok) {

    yield put(SubscriptionActions.setActiveGps(response.data))
    // yield put(SubscriptionActions.submitStatus(true, "success"))
    // console.log("ropdown_OK", response.data)
  }
  else {
    if (response.data.Error.ErrorSubcode === "") {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.Message, true))
    } else {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.ErrorSubcode, true))
    }
    // console.log("ropdown_Fill", response)
  }

}




export function* getSubscriber(api, { arrID }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }

  yield call(api.setHeader, header)

  let response = []
  for (let i in arrID) {


    let res = yield call(api.getSubscriber, arrID[i])
    // console.log("getSubscriber", response)
    if (res.ok) {
      response.push(res.data)
    } else {
      if (response.data.Error.ErrorSubcode === "") {
        yield put(SubscriptionActions.submitStatus(false, response.data.Error.Message, true))
      } else {
        yield put(SubscriptionActions.submitStatus(false, response.data.Error.ErrorSubcode, true))
      }
    }

  }

  yield put(SubscriptionActions.setgetSubscriber(response))

  // const response = yield call(api.getSubscriber, arrID)
  // console.log("getSubscriber", response.data)

  // if (response.ok) {

  //     yield put(SubscriptionActions.setgetSubscriber(response.data))
  //     // yield put(SubscriptionActions.submitStatus(true, "success"))
  //     // console.log("ropdown_OK", response.data)
  // }
  // else {
  //     if (response.data.Error.ErrorSubcode == "") {
  //         yield put(SubscriptionActions.submitStatus(false, response.data.Error.Message))
  //     } else {
  //         yield put(SubscriptionActions.submitStatus(false, response.data.Error.ErrorSubcode))
  //     }
  //     // console.log("ropdown_Fill", response)
  // }

}







export function* ItemCerticate(api, { id, subscriberId, dealerSignature }) {

  // const signin = yield select(signinRedux)
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'Authorization': authen.header.idToken,
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }
  yield call(api.setHeader, header)

  const response = yield call(api.ItemCerticate, id, subscriberId, dealerSignature)
  // console.log(response)
  if (response.ok) {
    const linkSource = `data:application/pdf;base64,${response.data}`;
    const downloadLink = document.createElement("a");
    const fileName = "หนังสือรับรองการติดตั้ง.pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
    console.log(response)
    yield put(SubscriptionActions.setItemCerticate(response.data))
  } else {

    if (response.data.Error.ErrorSubcode === "") {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.Message, true))
    } else {
      yield put(SubscriptionActions.submitStatus(false, response.data.Error.ErrorSubcode, true))
    }


  }

}










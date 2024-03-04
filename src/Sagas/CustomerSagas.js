import { call, put, select } from 'redux-saga/effects'
import CustomerActions from '../Redux/CustomerRedux'
import { get } from 'lodash'
import { logErrorMessage } from '../Functions/logErrorMessage'

// const dealerRedux = state => state.dealer
const auth = state => state.signin
const versatile = state => state.versatile

// -------------------- get Infomation Customer By ID --------------------
export function* getInfoCustomer(api, { id }) {


  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }
  yield call(api.setHeader, header)

  const response = yield call(api.getInfoCustomer, id)
  // console.log(response)

  if (response.ok) {

    yield put(CustomerActions.getInfoCustomerSuc(response.data))
    // } else {
    yield put(CustomerActions.getInfoCustomerSuc(response.problem))
  } else {


  }


}

// -------------------- create Customer --------------------
export function* createCustomer(api, { newInfo }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }
  yield call(api.setHeader, header)

  // console.log('newInfo', JSON.stringify(newInfo))

  const response = yield call(api.createCustomer, newInfo)
  console.log(response)
  if (response.ok) {
    yield put(CustomerActions.submitStatusCustomer(true, ''))
  } else {
    // yield put(CustomerActions.createCustomerFail(response.data ? response.data.message : response.problem))
    // logErrorMessage(get(response.data, 'error.message', ""))
    if (response.status === 400) {
      let errorCode = get(response.data, 'error.message', "")
      logErrorMessage(get(response.data, 'error.message', ""))
      if (errorCode === "") { errorCode = get(response.data, 'Error.ErrorSubcode', "") }
      yield put(CustomerActions.submitStatusCustomer(false, errorCode))
    }
    else {
      yield put(CustomerActions.submitStatusCustomer(false, response.data.Error.ErrorSubcode))
      logErrorMessage(get(response.data, 'error.message', ""))
    }
  }
}

// -------------------- delete Customer --------------------
export function* deleteCustomer(api, { id }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }
  yield call(api.setHeader, header)

  const response = yield call(api.deleteCustomer, id)
  // console.log(response)
  if (response.ok) {
    yield put(CustomerActions.submitStatusCustomer(true, ''))
    yield put(CustomerActions.submitStatus(true, "SUCCESS"))
  } else {
    if (response.status === 400) {
      let errorCode = get(response.data, 'error.message', "")
      logErrorMessage(get(response.data, 'error.message', ""))
      if (errorCode === "") { errorCode = get(response.data, 'Error.ErrorSubcode', "") }
      yield put(CustomerActions.submitStatusCustomer(false, errorCode))
    }
    else {
      yield put(CustomerActions.submitStatusCustomer(false, response.data.Error.ErrorSubcode))
      logErrorMessage(get(response.data, 'error.message', ""))
    }
  }
}

// -------------------- update Customer Infomation --------------------
export function* updateCustomer(api, { id, updateInfo }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }
  yield call(api.setHeader, header)

  let data = { id, updateInfo }

  const response = yield call(api.updateCustomer, data)
  // console.log(response)
  if (response.ok) {
    yield put(CustomerActions.submitStatusCustomer(true, ''))
  } else {
    // yield put(CustomerActions.createCustomerFail(response.data ? response.data.message : response.problem))
    // logErrorMessage(get(response.data, 'error.message', ""))
    if (response.status === 400) {
      let errorCode = get(response.data, 'error.message', "")
      logErrorMessage(get(response.data, 'error.message', ""))
      if (errorCode === "") { errorCode = get(response.data, 'Error.ErrorSubcode', "") }
      yield put(CustomerActions.submitStatusCustomer(false, errorCode))
    }
    else {
      yield put(CustomerActions.submitStatusCustomer(false, response.data.Error.ErrorSubcode))
      logErrorMessage(get(response.data, 'error.message', ""))
    }
  }
}

// -------------------- update Customer Infomation --------------------
export function* checkCustomerStatus(api, { data }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }
  yield call(api.setHeader, header)

  const response = yield call(api.checkCustomerStatus, data)
  console.log('checkCustomerStatus', response)

  if (response.ok) {
    yield put(CustomerActions.checkCustomerStatusSuc(response.data))
  } else {
    // yield put(CustomerActions.getInfoCustomerFail(response.problem))
  }
}

// -------------------- get Option Form Custome --------------------
export function* getOptionFormCustomer(api, { data }) {
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }

  yield call(api.setHeader, header)

  const response = yield call(api.getOptionFormCustomer, data)
  // console.log(response)
  if (response.ok) {
    yield put(CustomerActions.getOptionFormCustomerSuc(data.name, response.data))
  } else {
    // yield put(CustomerActions.getOptionFormCustomerFail('Customer Infomation'))
  }
}

// -------------------- get Option Form Custome --------------------

export function* subscriptionPrint(api, { id }) {

  // console.log('subscriptionPrint', id)
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language,
  }

  yield call(api.setHeader, header)

  const response = yield call(api.subscriptionPrint, id)
  // console.log(response)
  if (response.ok) {
    const linkSource = `data:application/pdf;base64,${response.data}`;
    const downloadLink = document.createElement("a");
    const fileName = "เอกสารสัญญาการขอใช้บริการระบบ HINO CONNECT.pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();

  }
  yield put(CustomerActions.setLoadingCustomer())
}


export function* CertificatePrint(api, { id }) {

  // console.log('subscriptionPrint', id)
  const ver = yield select(versatile)
  const authen = yield select(auth)
  let header = {
    // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
    'X-API-Key': authen.header.redisKey,
    'Accept-Language': ver.language
  }

  yield call(api.setHeader, header)

  const response = yield call(api.CertificatePrint, id)
  // console.log(response)
  if (response.ok) {
    const linkSource = `data:application/pdf;base64,${response.data}`;
    const downloadLink = document.createElement("a");
    const fileName = "Certificate (DLT).pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();

  }
  yield put(CustomerActions.setLoadingCustomer())
}



import { call, put, select } from 'redux-saga/effects'
import ControlRoomActions from '../Redux/ControlRoomRedux'
import { get } from 'lodash'
import { logErrorMessage } from '../Functions/logErrorMessage'

// const dealerRedux = state => state.dealer
const auth = state => state.signin
const versatile = state => state.versatile

// -------------------- get Infomation Customer By ID --------------------
// export function* getInfoCustomer(api, { id }) {


//     const ver = yield select(versatile)
//     const authen = yield select(auth)
//     let header = {
//         // 'X-API-Key': 'AKIAXRLQKYO37QTLBUPJHINO',
//         'X-API-Key': authen.header.redisKey,
//         'Accept-Language': ver.language,
//     }
//     yield call(api.setHeader, header)

//     const response = yield call(api.getInfoCustomer, id)
//     // console.log(response)

//     if (response.ok) {

//         yield put(CustomerActions.getInfoCustomerSuc(response.data))
//         // } else {
//         yield put(CustomerActions.getInfoCustomerSuc(response.problem))
//     } else {


//     }


// }

// -------------------- create Customer --------------------


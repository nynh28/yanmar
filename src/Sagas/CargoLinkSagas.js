import { call, put, select } from 'redux-saga/effects'
import CargoLinkActions from '../Redux/CargoLinkRedux'

const cargoLinkRedux = state => state.cargolink;
export function* login(api, { data }) {
    console.log(api.login)
    const response = yield call(api.login, data)

    if (response.ok) {
        yield put(CargoLinkActions.setLoginSuccess(response.headers.authorization))
        yield put(CargoLinkActions.setLoginFail(null))
    }
    else {
        yield put(CargoLinkActions.setLoginFail(response.problem))
        yield put(CargoLinkActions.setLoginSuccess(null))
    }
}

export function* getOrders(api, { data }) {
    const cargoLink = yield select(cargoLinkRedux)
    let headers = {
        Authorization: "Bearer " + cargoLink.authorization,
    }
    yield call(api.setHeader, headers);
    const response = yield call(api.getOrders, data)

    if (response.ok) {
        yield put(CargoLinkActions.getOrdersSuccess(response.data))
        yield put(CargoLinkActions.getOrdersFail(null))
    }
    else {
        yield put(CargoLinkActions.getOrdersFail(response.problem))
        yield put(CargoLinkActions.getOrdersSuccess(null))
    }
}
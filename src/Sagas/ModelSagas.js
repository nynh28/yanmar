import { call, put, select } from 'redux-saga/effects'
import ModelActions from '../Redux/ModelRedux'
// const auth = state => state.signin
// const drivingsettings = state => state.drivingsettings

export function* getCategoryTypeRequest(api) {
    // console.log(id)
    // console.log('==================== Data   ===============================')
    const response = yield call(api.getCategoryType)
    console.log(response)
    console.log('===================== Response getCategoryType  ==========================')

    if (response.ok) {
        yield put(ModelActions.getCategoryTypeSuc(response.data))
    } else {
        yield put(ModelActions.getCategoryTypeFail())
    }

}

export function* getClassTypeRequest(api) {
    // console.log(id)
    // console.log('==================== Data   ===============================')
    const response = yield call(api.getClassType)
    console.log(response)
    console.log('===================== Response  getClassType ==========================')

    if (response.ok) {
        yield put(ModelActions.getClassTypeSuc(response.data))
    } else {
        yield put(ModelActions.getClassTypeFail())
    }

}

export function* getEngineSeriesRequest(api) {
    
    const response = yield call(api.getEngineSeries)
    console.log(response)
    console.log('===================== Response getEngineSeries  ==========================')

    if (response.ok) {
        yield put(ModelActions.getEngineSeriesSuc(response.data))
    } else {
        yield put(ModelActions.getEngineSeriesFail())
    }

}
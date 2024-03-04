import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getCategoryType: null,
    getCategoryTypeSuc: ['data'],
    getCategoryTypeFail: null,

    getClassType: null,
    getClassTypeSuc: ['data'],
    getClassTypeFail: null,

    getEngineSeries: null,
    getEngineSeriesSuc: ['data'],
    getEngineSeriesFail: null,

    // sssss: null,
    // Suc: ['data'],
    // Fail: null,




})

export const ModelTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    data_getCategoryType: null,
    request_getCategoryType: null,

    data_getClassType: null,
    request_getClassType: null,

    data_getEngineSeries: null,
    request_getEngineSeries: null,

})

/* ------------- Reducers ------------- */


export const getCategoryType = (state) => {
    return state.merge({ request_getCategoryType: true })
}

export const getCategoryTypeSuc = (state, { data }) => {
    return state.merge({ request_getCategoryType: false, data_getCategoryType: data })
}

export const getCategoryTypeFail = (state) => {
    return state.merge({ request_getCategoryType: false })
}

export const getClassType = (state) => {
    return state.merge({ request_getClassType: true })
}

export const getClassTypeSuc = (state, { data }) => {
    return state.merge({ request_getClassType: false, data_getClassType: data })
}

export const getClassTypeFail = (state) => {
    return state.merge({ request_getClassType: false })
}

export const getEngineSeries = (state) => {
    return state.merge({ request_getEngineSeries: true })
}

export const getEngineSeriesSuc = (state, { data }) => {
    return state.merge({ request_getEngineSeries: false, data_getEngineSeries: data })
}

export const getEngineSeriesFail = (state) => {
    return state.merge({ request_getEngineSeries: false })
}

// export const start = (state) => {
//     return state.merge({ request_: true })
// }

// export const Suc = (state, { data }) => {
//     return state.merge({ request_: false, data_: data })
// }

// export const Fail = (state) => {
//     return state.merge({ request_: false })
// }

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
 

      [Types.GET_CATEGORY_TYPE]: getCategoryType,
      [Types.GET_CATEGORY_TYPE_SUC]: getCategoryTypeSuc,
      [Types.GET_CATEGORY_TYPE_FAIL]: getCategoryTypeFail,

      [Types.GET_CLASS_TYPE]: getClassType,
      [Types.GET_CLASS_TYPE_SUC]: getClassTypeSuc,
      [Types.GET_CLASS_TYPE_FAIL]: getClassTypeFail,

      [Types.GET_ENGINE_SERIES]: getEngineSeries,
      [Types.GET_ENGINE_SERIES_SUC]: getEngineSeriesSuc,
      [Types.GET_ENGINE_SERIES_FAIL]: getEngineSeriesFail,

    //   [Types._]: ssttaarrtt,
    //   [Types._SUC]: Suc,
    //   [Types._FAIL]: Fail,

    //   [Types._]: ssttaarrtt,
    //   [Types._SUC]: Suc,
    //   [Types._FAIL]: Fail,

    //   [Types._]: ssttaarrtt,
    //   [Types._SUC]: Suc,
    //   [Types._FAIL]: Fail,
})

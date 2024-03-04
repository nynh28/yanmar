import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    setLogin: ['data'],
    setLoginSuccess: ['authorization'],
    setLoginFail: ['error'],
    getOrders: ['data'],
    getOrdersSuccess: ['resBody'],
    getOrdersFail: ['error'],
})

export const CargoLinkTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    error: null,
    fetching: false,
    orders: null,
    //   resBody: [''],
    login: 'login',
    authorization: null,
})

/* ------------- Reducers ------------- */

export const setLogin = (state, { data }) => {
    return state.merge({ fetching: true })
}

export const setLoginSuccess = (state, { authorization }) => {
    return state.merge({ fetching: false, authorization })
}

export const setLoginFail = (state, { error }) => {
    return state.merge({ fetching: false, error })
}

export const getOrders = (state, { data }) => {
    return state.merge({ fetching: true })
}

export const getOrdersSuccess = (state, { resBody }) => {
    // console.log(`resBody : ${resBody}`)
    return state.merge({ fetching: false, orders: resBody.content })
}

export const getOrdersFail = (state, { error }) => {
    return state.merge({ fetching: false, error })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ORDERS]: getOrders,
    [Types.GET_ORDERS_FAIL]: getOrdersFail,
    [Types.GET_ORDERS_SUCCESS]: getOrdersSuccess,
    [Types.SET_LOGIN]: setLogin,
    [Types.SET_LOGIN_FAIL]: setLoginFail,
    [Types.SET_LOGIN_SUCCESS]: setLoginSuccess,
})
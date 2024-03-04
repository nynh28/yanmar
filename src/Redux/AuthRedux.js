import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    //   signup: ['email', 'password'],
    //   signupSuccess: ['data'],
    //   signupFailure: ['error'],

    //   step2Signup: ['email', 'userid'],
    //   step2SignupSuccess: ['data'],
    //   step2SignupFailure: ['error']

    // setStyleSidebar: null,
    signin: ['email', 'password'],
    signinSuc: ['data'],
    signinFail: null,
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    //   signingUp: false,
    //   signupErrorMessage: null,

    //   step2SigningUp: false,
    //   step2SignupErrorMessage: null
    request_signin: null,
    data_signin: null,
})

/* ------------- Reducers ------------- */

export const signin = (state) => state.merge({ request_signin: true })
export const signinSuc = (state, {data}) => state.merge({ request_signin: false, data_signin: data })
export const signinFail = state => state.merge({ request_signin: false })

// export const signup = (state) => state.merge({ signingUp: true, signupErrorMessage: null })

// export const signupSuccess = (state, params) => {
//   let { data } = params
//   return state.merge({ signingUp: false, signupErrorMessage: null })
// }

// export const signupFailure = (state, params) => {
//   let { error } = params
//   return state.merge({ signupErrorMessage: error, signingUp: false })
// }


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SIGNIN]: signin,
    [Types.SIGNIN_SUC]: signinSuc,
    [Types.SIGNIN_FAIL]: signinFail,
    //   [Types.SIGNUP]: signup,
    //   [Types.SIGNUP_SUCCESS]: signupSuccess,
    //   [Types.SIGNUP_FAILURE]: signupFailure,
})
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  forgotPassword: ['targetDelivery'],
  forgotPasswordSuccess: ['infoForgotPassword'],
  forgotPasswordFail: ['errorSubcodeForget'],

  confirmForgot: ['userName', 'confirmationCode', 'password'],
  confirmForgotSuccess: [],
  confirmForgotFail: ['errorSubcodeConfirm'],


  changePassword: ['previousPassword', 'proposedPassword'],
  changePasswordSuccess: [],
  changePasswordFail: ['errorSubcodeChange'],

  respondChallenge: ['newPassword'],
  respondChallengeSuccess: [],
  respondChallengeFail: ['errorSubcodeRespond'],

  setCoolDown: [],
  setStateRedux: ['name', 'value']

  // sssss: null,
  // Suc: ['data'],
  // Fail: null,




})

export const PasswordTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  infoForgotPassword: null,
  stateForget: false,
  stateChange: false,
  loadingForget: false,
  loadingConfirm: false,
  loadingChange: false,
  errorSubcodeForget: null,
  errorSubcodeConfirm: null,
  errorSubcodeChange: null,
  errorSubcodeRespond: null,
  timeStart: null,
  countCoolDown: 0,
})

/* ------------- Reducers ------------- */

export const forgotPassword = (state) => {
  return state.merge({ stateForget: false, errorSubcode: null, loadingForget: true, errorSubcodeForget: null })
}
export const forgotPasswordSuccess = (state, { infoForgotPassword }) => {
  return state.merge({ infoForgotPassword, loadingForget: false, countCoolDown: 30 })
}
export const forgotPasswordFail = (state, { errorSubcodeForget }) => {
  return state.merge({ errorSubcodeForget, loadingForget: false, countCoolDown: 30 })
}

export const confirmForgot = (state) => {
  return state.merge({ errorSubcode: null, loadingConfirm: true, errorSubcodeConfirm: null })
}
export const confirmForgotSuccess = (state, { }) => {
  return state.merge({ stateForget: true, loadingConfirm: false })
}
export const confirmForgotFail = (state, { errorSubcodeConfirm }) => {
  return state.merge({ errorSubcodeConfirm, loadingConfirm: false })
}

export const changePassword = (state) => {
  return state.merge({ stateChange: false, loadingChange: true })
}
export const changePasswordSuccess = (state) => {
  return state.merge({ stateChange: true, loadingChange: false })
}
export const changePasswordFail = (state, { errorSubcodeChange }) => {
  return state.merge({ errorSubcodeChange, loadingChange: false })
}

export const respondChallenge = (state) => {
  return state.merge({ loadingRespond: true })
}
export const respondChallengeSuccess = (state) => {
  return state.merge({ loadingRespond: false })
}
export const respondChallengeFail = (state, { errorSubcodeRespond }) => {
  return state.merge({ errorSubcodeRespond, loadingRespond: false })
}

export const setCoolDown = (state, { }) => {
  return state.merge({ countCoolDown: state.countCoolDown - 1 })
}

export const setStateRedux = (state, { name, value }) => {
  return state.merge({ [name]: value })
}



/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {

  [Types.FORGOT_PASSWORD]: forgotPassword,
  [Types.FORGOT_PASSWORD_SUCCESS]: forgotPasswordSuccess,
  [Types.FORGOT_PASSWORD_FAIL]: forgotPasswordFail,

  [Types.CONFIRM_FORGOT]: confirmForgot,
  [Types.CONFIRM_FORGOT_SUCCESS]: confirmForgotSuccess,
  [Types.CONFIRM_FORGOT_FAIL]: confirmForgotFail,

  [Types.CHANGE_PASSWORD]: changePassword,
  [Types.CHANGE_PASSWORD_SUCCESS]: changePasswordSuccess,
  [Types.CHANGE_PASSWORD_FAIL]: changePasswordFail,

  [Types.RESPOND_CHALLENGE]: respondChallenge,
  [Types.RESPOND_CHALLENGE_SUCCESS]: respondChallengeSuccess,
  [Types.RESPOND_CHALLENGE_FAIL]: respondChallengeFail,

  [Types.SET_COOL_DOWN]: setCoolDown,
  [Types.SET_STATE_REDUX]: setStateRedux,

})

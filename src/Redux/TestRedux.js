import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({

  actionOne: ['param1', 'param2'],

  signin: ['user', 'pass'],
  signinSuccess: ['data'],
  signinFailure: ['error']

})

export const TestTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  a: 10,
  b: 20,

  data: null,
  errer: null,
})

/* ------------- Reducers ------------- */

export const action1 = (state, { param1, param2 }) => {
  return state.merge({ a: param1, b: param2 })
}

export const signinSuccess = (state, { data }) => {
  return state.merge({ data })
}

export const signinFailure = (state, { error }) => {
  return state.merge({ error })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACTION_ONE]: action1,
  [Types.SIGNIN_SUCCESS]: signinSuccess,
  [Types.SIGNIN_FAILURE]: signinFailure
})

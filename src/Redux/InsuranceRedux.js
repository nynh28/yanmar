import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  setDefaultReduxInsurance: [],
  setValue: ['name', 'value'],
})

export const InsuranceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isLoadingInsurance: false
})

/* ------------- Reducers ------------- */
export const setValue = (state, { name, value }) => { return state.merge({ [name]: value }) }

export const setDefaultReduxInsurance = (state, { }) => {
  return INITIAL_STATE
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_VALUE]: setValue,
  [Types.SET_DEFAULT_REDUX_INSURANCE]: setDefaultReduxInsurance
})
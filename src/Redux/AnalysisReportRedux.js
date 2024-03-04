import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setStateReduxAnalysisReport: ['objState'],
  setDefaultReduxAnalysisReport: []
})

export const AnalysisReportTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  lstDealer: [],
  lstCustomer: [],
  lstFleet: [],
  selectedDealer: null,
  selectedCustomer: null,
  selectedFleet: null,
  startDate: null,
  endDate: null,
  lstDriverTable: null,
  selectedRowsData: null

})

/* ------------- Reducers ------------- */

export const setStateReduxAnalysisReport = (state, { objState }) => {
  return state.merge(objState)
}

export const setDefaultReduxAnalysisReport = (state, { }) => {
  return INITIAL_STATE
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {

  [Types.SET_STATE_REDUX_ANALYSIS_REPORT]: setStateReduxAnalysisReport,
  [Types.SET_DEFAULT_REDUX_ANALYSIS_REPORT]: setDefaultReduxAnalysisReport,
})

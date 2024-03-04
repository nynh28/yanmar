import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  calculateReport: ['data'],
  callReportApi: []
})

export const ReportTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  ReportData: []
})

/* ------------- Reducers ------------- */
export const callReportApi = (state) => {
  return state.merge({})
}

export const calculateReport = (state, { data }) => {
  return state.merge({ ReportData: data })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CALCULATE_REPORT]: calculateReport,
  [Types.CALL_REPORT_API]: callReportApi,

});
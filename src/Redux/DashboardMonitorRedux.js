import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'


const { Types, Creators } = createActions({
  setDataTable: ['dataTable', 'isStation'],
})

export const DashboardTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  dataTable: [],
  isStation: true
})

/* ------------- Reducers ------------- */
export const setDataTable = (state, { dataTable, isStation }) => {
  return state.merge({ dataTable, isStation })
}



export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_DATA_TABLE]: setDataTable,
  // [Types.CALCULATE_PERDAY]: calculatePerDay,
  // [Types.CALL_PERDAY_API]: callPerDayApi
});

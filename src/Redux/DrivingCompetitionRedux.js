import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setDefaultReduxDrivingCompetition: [],
  setValue: ['name', 'value'],
})

export const MaintenanceHistoryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isLoadingCompetition: false,
  dataDrivingCompet: [],
  classTypeLists: [],

  //#region Filter
  classTypeSelected: [],
  //#endregion
})


/* ------------- Reducers ------------- */
export const setDefaultReduxDrivingCompetition = () => { return INITIAL_STATE }
export const setValue = (state, { name, value }) => { return state.merge({ [name]: value }) }

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_DEFAULT_REDUX_DRIVING_COMPETITION]: setDefaultReduxDrivingCompetition,
  [Types.SET_VALUE]: setValue,
})

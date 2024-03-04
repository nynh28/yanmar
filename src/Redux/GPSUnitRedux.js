import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { stat } from 'fs'


/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getDataUnit: ['imei', 'startDate', 'endDate', 'orderBy'],
  getDataUnitSuccess: ['dataSource'],
  getDataUnitAppend: ['dataSource'],
  getDataUnitFail: ['messageError']

})

export const GPSUnitTypes = Types

export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  dataSource: [],
  loading: false,
  messageError: null

})

/* ------------- Reducers ------------- */


export const getDataUnit = (state, { }) => {
  return state.merge({ loading: true, messageError: null })
}

export const getDataUnitSuccess = (state, { dataSource }) => {

  return state.merge({ dataSource, loading: false })
}

export const getDataUnitAppend = (state, { dataSource }) => {

  return state.merge({ dataSource: [...state.dataSource, ...dataSource] })
}

export const getDataUnitFail = (state, { messageError }) => {

  return state.merge({ loading: false, messageError })
}



/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_DATA_UNIT]: getDataUnit,
  [Types.GET_DATA_UNIT_SUCCESS]: getDataUnitSuccess,
  [Types.GET_DATA_UNIT_APPEND]: getDataUnitAppend,
  [Types.GET_DATA_UNIT_FAIL]: getDataUnitFail,
})

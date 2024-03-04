import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  setDefaultReduxEvidence: [],
  setValue: ['name', 'value'],
})

export const EvidenceTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  isLoadingEvidence: false,
  evidenceData: [],
  videoPath: "",
  mapDetail: {},
  gaugeCurrentValue: {
    speed: 0,
    rpm: 0
  },
  evidenceName: "",
  evidenceDownload: {
    device_id: "",
    evidence_id: ""
  }
})

/* ------------- Reducers ------------- */
export const setValue = (state, { name, value }) => { return state.merge({ [name]: value }) }

export const setDefaultReduxEvidence = (state, { }) => {
  return INITIAL_STATE
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_DEFAULT_REDUX_EVIDENCE]: setDefaultReduxEvidence,
  [Types.SET_VALUE]: setValue,
})

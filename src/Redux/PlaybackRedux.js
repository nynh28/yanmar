import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Cookies from 'js-cookie';


/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setValue: ['name', 'value'],
  setMuted: [],
  setPlaying: [],
  resetListVideo: [],
  setDefaultReduxPlayback: [],
})

export const PlaybackTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  dataChart: [],
  listVehicles: [],
  listVideo: [{}, {}, {}, {}],
  listVideoTemp: [{}, {}, {}, {}],
  isLoadingInfo: false,
  isWarning: false,
  defaultVisualRange: ['2021-04-01 00:00:00', '2021-04-01 23:59:59'], // Default
  skipTimeChart: "",
  isMuted: false,
  isPlaying: false,
  channelChecked: [],
  videoTime: "",
  minTimeStart: "",
  maxTimeEnd: "",
  channelRange: []
})

/* ------------- Reducers ------------- */
export const setDefaultReduxPlayback = () => { return INITIAL_STATE }
export const setValue = (state, { name, value }) => { return state.merge({ [name]: value }) }
export const setMuted = (state) => { return state.merge({ isMuted: !state.isMuted }) }
export const setPlaying = (state) => { return state.merge({ isPlaying: !state.isPlaying }) }
export const resetListVideo = (state) => {
  return state.merge({
    dataChart: [],
    listVideo: [{}, {}, {}, {}],
    listVideoTemp: [{}, {}, {}, {}]
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_DEFAULT_REDUX_PLAYBACK]: setDefaultReduxPlayback,
  [Types.SET_VALUE]: setValue,
  [Types.SET_MUTED]: setMuted,
  [Types.SET_PLAYING]: setPlaying,
  [Types.RESET_LIST_VIDEO]: resetListVideo,
})

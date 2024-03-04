import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setDefaultReduxBanner: [],
  setStatesBanner: ['obj'],
})

export const BannerTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isCreate: {
    id: "",
    create: true
  },
  isModalManageVisible: false,
  isModalSettingVisible: false,
  isReloadBannerDisplay: false,
  isShowBanner: true
})


/* ------------- Reducers ------------- */
export const setDefaultReduxBanner = () => { return INITIAL_STATE }

export const setStatesBanner = (state, { obj }) => { return state.merge(obj) }

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_DEFAULT_REDUX_BANNER]: setDefaultReduxBanner,
  [Types.SET_STATES_BANNER]: setStatesBanner,
})

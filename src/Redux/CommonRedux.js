import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  setCookiesTableConfig: ["tableName", "config1", "setting"],
  setDefaultReduxCommon: [],
  setValue: ["name", "value"],
});

export const CommonTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  TbCookies: {},
  columnChooserVisible: false,
  visibleColumnList: [],
  TbSettings: {},
});

/* ------------- Reducers ------------- */
export const setCookiesTableConfig = (
  state,
  { tableName, config1, setting }
) => {
  // return state.merge({ [optionGroup + "Data"]: dropdownData })
  let TbCookies = JSON.parse(JSON.stringify(state.TbCookies));
  let TbSettings = JSON.parse(JSON.stringify(state.TbSettings));
  TbCookies[tableName] = config1;
  if (setting) TbSettings[tableName] = setting;

  return state.merge({ TbCookies, TbSettings });
};

export const setValue = (state, { name, value }) => {
  return state.merge({ [name]: value });
};

export const setDefaultReduxCommon = (state, {}) => {
  return INITIAL_STATE;
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_COOKIES_TABLE_CONFIG]: setCookiesTableConfig,
  [Types.SET_DEFAULT_REDUX_COMMON]: setDefaultReduxCommon,
  [Types.SET_VALUE]: setValue,
});

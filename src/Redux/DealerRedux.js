import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setIdSelectDealer: ["id", "action"],

  getInfoDealer: ["id"],
  getInfoDealerSuccess: ["infoDealer"],

  createDealer: ["newInfo"],
  createDealerSuccess: [],

  deleteDealer: ["id"],
  deleteDealerSuccess: [],

  updateDealer: ["id", "updateInfo"],
  updateDealerSuccess: [],

  setDealerid: ["id"],
});

export const DealerTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  id: null,
  action: null,
  infoDealer: null,
  statusSubmit: {
    status: true,
    ErrorSubcode: 0,
  },
  // loading: false
});

/* ------------- Reducers ------------- */

export const setIdSelectDealer = (state, { id, action }) => {
  return state.merge({ id, action });
};

export const setDealerid = (state, { id }) => {
  return state.merge({ id });
};

// --------------------- Get Info Dealer ---------------------
export const getInfoDealer = (state) => {
  return state.merge({});
};
export const getInfoDealerSuccess = (state, { infoDealer }) => {
  return state.merge({ infoDealer });
};

// --------------------- Create Dealer ---------------------
export const createDealer = (state) => {
  return state.merge({ loading: true });
};
export const createDealerSuccess = (state) => {
  return state.merge({ loading: false });
};

// --------------------- Delete Dealer ---------------------
export const deleteDealer = (state) => {
  return state.merge({ loading: true });
};
export const deleteDealerSuccess = (state) => {
  return state.merge({ loading: false });
};

// --------------------- Update Dealer ---------------------
export const updateDealer = (state) => {
  return state.merge({ loading: true });
};
export const updateDealerSuccess = (state) => {
  return state.merge({ loading: false });
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_ID_SELECT_DEALER]: setIdSelectDealer,
  // --------------------------------------------------
  [Types.GET_INFO_DEALER]: getInfoDealer,
  [Types.GET_INFO_DEALER_SUCCESS]: getInfoDealerSuccess,
  // --------------------------------------------------
  [Types.CREATE_DEALER]: createDealer,
  [Types.CREATE_DEALER_SUCCESS]: createDealerSuccess,
  // --------------------------------------------------
  [Types.DELETE_DEALER]: deleteDealer,
  [Types.DELETE_DEALER_SUCCESS]: deleteDealerSuccess,
  // --------------------------------------------------
  [Types.UPDATE_DEALER]: updateDealer,
  [Types.UPDATE_DEALER_SUCCESS]: updateDealerSuccess,
  [Types.SET_DEALERID]: setDealerid,
});

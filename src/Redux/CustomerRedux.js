import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setIdSelectCustomer: ["id", "action"],
  // --------------------------------------------------
  getInfoCustomer: ["id"],
  getInfoCustomerSuc: ["infoCustomer"],
  // --------------------------------------------------
  createCustomer: ["newInfo"],
  createCustomerSuc: [],
  // --------------------------------------------------
  deleteCustomer: ["id"],
  deleteCustomerSuc: [],
  // --------------------------------------------------
  updateCustomer: ["id", "updateInfo"],
  updateCustomerSuc: [],
  // --------------------------------------------------
  checkCustomerStatus: ["data"],
  checkCustomerStatusSuc: ["infoCustomer"],
  // --------------------------------------------------
  getOptionFormCustomer: ["data"],
  getOptionFormCustomerSuc: ["name", "data"],
  // --------------------------------------------------
  subscriptionPrint: ["id"],
  CertificatePrint: ["id"],
  // --------------------------------------------------
  submitStatusCustomer: ["status", "ErrorSubcode"],
  // --------------------------------------------------
  setLoadingCustomer: [],
  // --------------------------------------------------
  setStateCustomer: ["name", "value"],
  // --------------------------------------------------
  setCus: ["employeeCardList"],
});

export const DataEditTypes = Types;
export const CustomerTypes = Types;

export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  id: null,
  action: null,
  infoCustomer: null,
  employeeCardList: [],
  statusSubmit: {
    status: true,
    ErrorSubcode: 0,
  },
  intCustId: null,
  canCreate: null,
  loading: false,
});

/* ------------- Reducers ------------- */

export const setCus = (state, { employeeCardList }) => {
  return state.merge({ employeeCardList });
};

export const setIdSelectCustomer = (state, { id, action }) => {
  return state.merge({ id, action });
};

// --------------------- Get Info Customer ---------------------
export const getInfoCustomer = (state) => {
  return state.merge({});
};

export const getInfoCustomerSuc = (state, { infoCustomer }) => {
  return state.merge({ infoCustomer, intCustId: infoCustomer.intCustId });
};

// --------------------- Create Customer ---------------------
export const createCustomer = (state) => {
  return state.merge({});
};

export const createCustomerSuc = (state) => {
  return state.merge({});
};

// --------------------- Delete Customer ---------------------
export const deleteCustomer = (state) => {
  return state.merge({});
};
export const deleteCustomerSuc = (state) => {
  return state.merge({});
};

// --------------------- Update Customer ---------------------
export const updateCustomer = (state) => {
  return state.merge({});
};
export const updateCustomerSuc = (state) => {
  return state.merge({});
};

// --------------------- Check Customer Status ---------------------
export const checkCustomerStatus = (state) => {
  return state.merge({ canCreate: null, intCustId: null });
};
export const checkCustomerStatusSuc = (state, { infoCustomer }) => {
  let obj = {
    canCreate: infoCustomer.canCreate,
    intCustId: infoCustomer.intCustId,
  };
  if (infoCustomer.canCreate) obj.infoCustomer = infoCustomer;
  return state.merge(obj);
};

// --------------------- Check Customer Status ---------------------
export const getOptionFormCustomer = (state) => {
  return state.merge({});
};
export const getOptionFormCustomerSuc = (state, { name, data }) => {
  return state.merge({ ["opt_" + name]: data });
};

// --------------------- Subscription Print ---------------------
export const subscriptionPrint = (state) => {
  return state.merge({ loading: true });
};
// --------------------- Certificate Print ---------------------
export const CertificatePrint = (state) => {
  return state.merge({ loading: true });
};

// --------------------- Submit Status Customer ---------------------
export const submitStatusCustomer = (state, { status, ErrorSubcode }) => {
  let statusSubmit = {
    status,
    ErrorSubcode,
  };
  return state.merge({ statusSubmit });
};

// --------------------- Submit Status Customer ---------------------
export const setLoadingCustomer = (state) => {
  return state.merge({ loading: false });
};

// --------------------- Submit Status Customer ---------------------
export const setStateCustomer = (state, { name, value }) => {
  return state.merge({ [name]: value });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_ID_SELECT_CUSTOMER]: setIdSelectCustomer,
  // --------------------------------------------------
  [Types.GET_INFO_CUSTOMER]: getInfoCustomer,
  [Types.GET_INFO_CUSTOMER_SUC]: getInfoCustomerSuc,
  // --------------------------------------------------
  [Types.CREATE_CUSTOMER]: createCustomer,
  [Types.CREATE_CUSTOMER_SUC]: createCustomerSuc,
  // --------------------------------------------------
  [Types.DELETE_CUSTOMER]: deleteCustomer,
  [Types.DELETE_CUSTOMER_SUC]: deleteCustomerSuc,
  // --------------------------------------------------
  [Types.UPDATE_CUSTOMER]: updateCustomer,
  [Types.UPDATE_CUSTOMER_SUC]: updateCustomerSuc,
  // --------------------------------------------------
  [Types.CHECK_CUSTOMER_STATUS]: checkCustomerStatus,
  [Types.CHECK_CUSTOMER_STATUS_SUC]: checkCustomerStatusSuc,
  // --------------------------------------------------
  [Types.GET_OPTION_FORM_CUSTOMER]: getOptionFormCustomer,
  [Types.GET_OPTION_FORM_CUSTOMER_SUC]: getOptionFormCustomerSuc,
  // --------------------------------------------------
  [Types.SUBSCRIPTION_PRINT]: subscriptionPrint,
  // --------------------------------------------------
  [Types.CERTIFICATE_PRINT]: CertificatePrint,
  // --------------------------------------------------
  [Types.SUBMIT_STATUS_CUSTOMER]: submitStatusCustomer,
  // --------------------------------------------------
  [Types.SET_LOADING_CUSTOMER]: setLoadingCustomer,
  // --------------------------------------------------
  [Types.SET_STATE_CUSTOMER]: setStateCustomer,
  // --------------------------------------------------
  [Types.SET_CUS]: setCus,
});

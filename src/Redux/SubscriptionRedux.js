import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  setIdSelectSubscription: ["id", "action"],
  setDefaultVehicleRegister: ["data"],
  setVehicleRegister: ["data"],
  submitStatus: ["status", "ErrorSubcode", "key"],
  setPersonalIdSelect: ["data", "action"],
  TableSub: [],
  setTableSub: ["infoTableSub"],
  //dropdown
  DltVehicleType: [],
  setDltVehicleType: ["info_DltVehicleType"],
  DltBodyType: ["id"],
  setDltBodyType: ["infoDltBodyType"],
  CargolinkType: [],
  setCargolinkType: ["infoCargolinkType"],
  DocumentType: [],
  setDocumentType: ["infoDocumentType"],
  Package: [],
  setPackage: ["infoPackage"],
  PackageID: ["id"],
  setPackageID: ["infoPackageID"],
  CustomerBY: ["id"],
  setCustomerBY: ["infoCustomerBY"],
  getCustomer: ["id"],
  setgetCustomer: ["infogetCustomer"],
  getPay: ["id"],
  setgetPay: ["infogetPay"],
  MyDealers: [],
  setMyDealers: ["infoMyDealers"],
  Signatures: ["id"],
  setSignatures: ["infoSignatures"],

  //profile
  getProfileSub: ["id"],
  setgetProfileSub: ["infogetProfileSub"],
  postProfile: ["data"],
  setpostProfile: ["infopostProfile"],
  showSubscriber: ["SubscriptionID", "subscriberID"],
  setshowSubscriber: ["infoshowSubscriber"],
  putSubscriber: ["SubscriptionID", "subscriberID", "data"],
  setputSubscriber: ["putSubscriber"],
  delSubscriber: ["id", "subscriberID"],
  setdelSubscriber: ["infodelSubscriber"],

  //Verify
  VerifyCust: ["id"],
  setVerifyCust: ["infoVerifyCust"],
  VerifyPaymentCust: ["id"],
  setVerifyPaymentCust: ["infoVerifyPaymentCust"],
  VerifySub: ["id", "subscriberId", "isAgree", "dateStart"],
  setVerifySub: ["infoVerifySub"],
  ItemCerticate: ["id", "subscriberId", "dealerSignature"],
  setItemCerticate: ["infoItemCerticate"],
  ResendDlt: ["id", "subscriberId"],
  setResendDlt: ["infoResendDlt"],
  ActiveGps: ["id", "subscriberId"],
  setActiveGps: ["infoActiveGps"],
  setDealerId: ["id"],

  //
  Map: ["id"],
  setMap: ["infoMap"],
  Create: ["id", "code"],
  setCreate: ["infoCreate"],
  getSubscriber: ["arrID"],
  setgetSubscriber: ["infogetSubscriber"],

  // data when add new subscription
  setDataitem: ["Dataitem"],
  setSubscriptPermission: ["data"],
  setContractId: ["contractid"],
  setVehicleData: ["data"],
});

export const SubscriptionTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  id: null,
  contractid: null,
  action: null,
  vehicleRegister: [],
  defaultVehicleRegister: { isIndividual: false, contractNo: "" },

  //table
  infoTableSub: [],

  //dropdown
  info_DltVehicleType: [],
  infoDltBodyType: [],
  infoCargolinkType: [],
  infoDocumentType: [],
  infoPackage: [],
  infoPackageID: [],
  infoCustomerBY: [],
  infogetCustomer: [],
  infoMyDealers: [],
  infoSignatures: [],

  //profile
  infogetProfileSub: [],
  infopostProfile: [],
  infoshowSubscriber: [],
  infoputSubscriber: [],
  infodelSubscriber: [],
  //Verify
  infoVerifyCust: [],
  infoVerifyPaymentCust: [],
  infoVerifySub: [],
  infoItemCerticate: [],
  infoResendDlt: [],
  infoActiveGps: [],

  //
  infoMap: [],
  infoCreate: [],
  infogetSubscriber: [],

  formAction: {
    data: null,
    action: null,
  },
  statusSubmit: {
    submitSuccess: false,
    status: true,
    ErrorSubcode: "",
    key: true,
  },
  subscriptPermission: {
    canView: false,
    canAdd: false,
    canEdit: false,
    canDelete: false,
  },

  // data when add new subscription
  Dataitem: null,
  vehicleData: {},
});

/* ------------- Reducers ------------- */
//Update Profile Screen
export const setIdSelectSubscription = (state, { id, action }) => {
  return state.merge({ id, action });
};
export const setVehicleRegister = (state, { data }) => {
  return state.merge({ vehicleRegister: data });
};
export const setVehicleData = (state, { data }) => {
  return state.merge({ vehicleData: data });
};
export const setDefaultVehicleRegister = (state, { data }) => {
  return state.merge({ defaultVehicleRegister: data });
};

export const submitStatus = (state, { status, ErrorSubcode, key }) => {
  let statusSubmit = {
    submitSuccess: true,
    status,
    ErrorSubcode,
    key,
  };
  return state.merge({ loading: false, statusSubmit });
};

export const TableSub = (state, {}) => {
  return state.merge({});
};

export const setTableSub = (state, { infoTableSub }) => {
  return state.merge({ infoTableSub });
};

export const DltVehicleType = (state, {}) => {
  return state.merge({});
};
export const setDltVehicleType = (state, { info_DltVehicleType }) => {
  return state.merge({ info_DltVehicleType });
};

export const DltBodyType = (state, { id }) => {
  return state.merge({ id });
};
export const setDltBodyType = (state, { infoDltBodyType }) => {
  return state.merge({ infoDltBodyType });
};

export const CargolinkType = (state, {}) => {
  return state.merge({});
};
export const setCargolinkType = (state, { infoCargolinkType }) => {
  return state.merge({ infoCargolinkType });
};
export const DocumentType = (state, {}) => {
  return state.merge({});
};
export const setDocumentType = (state, { infoDocumentType }) => {
  return state.merge({ infoDocumentType });
};

export const Package = (state, {}) => {
  return state.merge({});
};
export const setPackage = (state, { infoPackage }) => {
  return state.merge({ infoPackage });
};

export const PackageID = (state, {}) => {
  return state.merge({});
};
export const setPackageID = (state, { infoPackageID }) => {
  return state.merge({ infoPackageID });
};

export const CustomerBY = (state, { id }) => {
  return state.merge({ id });
};
export const setCustomerBY = (state, { infoCustomerBY }) => {
  return state.merge({ infoCustomerBY });
};

export const getCustomer = (state, { id }) => {
  return state.merge({ id });
};
export const setgetCustomer = (state, { infogetCustomer }) => {
  return state.merge({ infogetCustomer });
};

export const getPay = (state, { id }) => {
  return state.merge({ id });
};
export const setgetPay = (state, { infogetPay }) => {
  return state.merge({ infogetPay });
};

export const MyDealers = (state, { id }) => {
  return state.merge({ id });
};
export const setMyDealers = (state, { infoMyDealers }) => {
  return state.merge({ infoMyDealers });
};
export const Signatures = (state, {}) => {
  return state.merge({});
};
export const setSignatures = (state, { infoSignatures }) => {
  return state.merge({ infoSignatures });
};

export const setPersonalIdSelect = (state, { data, action }) => {
  return state.merge({ formAction: { data, action } });
};

//profile
export const getProfileSub = (state, { id }) => {
  return state.merge({ id });
};
export const setgetProfileSub = (state, { infogetProfileSub }) => {
  return state.merge({ infogetProfileSub });
};
export const postProfile = (state, { data }) => {
  return state.merge({ data });
};
export const setpostProfile = (state, { infopostProfile }) => {
  return state.merge({ infopostProfile });
};
export const showSubscriber = (state, { SubscriptionID, subscriberID }) => {
  return state.merge({ SubscriptionID, subscriberID });
};
export const setshowSubscriber = (state, { infoshowSubscriber }) => {
  return state.merge({ infoshowSubscriber });
};

export const putSubscriber = (state, {}) => {
  return state.merge({});
};
export const setputSubscriber = (state, { infoputSubscriber }) => {
  return state.merge({ infoputSubscriber });
};
export const delSubscriber = (state, { id, subscriberID }) => {
  return state.merge({});
};
export const setdelSubscriber = (state, { infodelSubscriber }) => {
  return state.merge({ infodelSubscriber });
};
export const setDealerId = (state, { id }) => {
  return state.merge({ id });
};
export const setContractId = (state, { contractid }) => {
  return state.merge({ contractid });
};

//Vertify
export const VerifyCust = (state, { id }) => {
  return state.merge({ id });
};
export const setVerifyCust = (state, { infoVerifyCust }) => {
  return state.merge({ infoVerifyCust });
};
export const VerifyPaymentCust = (state, { id }) => {
  return state.merge({ id });
};
export const setVerifyPaymentCust = (state, { infoVerifyPaymentCust }) => {
  return state.merge({ infoVerifyPaymentCust });
};

export const VerifySub = (state, {}) => {
  return state.merge({});
};
export const setVerifySub = (state, { infoVerifySub }) => {
  return state.merge({ infoVerifySub });
};
export const ItemCerticate = (state, {}) => {
  return state.merge({});
};

export const setItemCerticate = (state, { infoItemCerticate }) => {
  return state.merge({ infoItemCerticate });
};
export const ResendDlt = (state, {}) => {
  return state.merge({});
};
export const setResendDlt = (state, { infoResendDlt }) => {
  return state.merge({ infoResendDlt });
};
export const ActiveGps = (state, {}) => {
  return state.merge({});
};
export const setActiveGps = (state, { infoActiveGps }) => {
  return state.merge({ infoActiveGps });
};

//

export const Map = (state, { id }) => {
  return state.merge({ id });
};
export const setMap = (state, { infoMap }) => {
  return state.merge({ infoMap });
};
export const Create = (state, { id, code }) => {
  return state.merge({ id, code });
};
export const setCreate = (state, { infoCreate }) => {
  return state.merge({ infoCreate });
};

export const getSubscriber = (state, {}) => {
  return state.merge({});
};
export const setgetSubscriber = (state, { infogetSubscriber }) => {
  // console.log('infogetSubscriber', infogetSubscriber)
  return state.merge({ infogetSubscriber });
};

export const setDataitem = (state, { Dataitem }) => {
  return state.merge({ Dataitem });
};

export const setSubscriptPermission = (state, { data }) => {
  return state.merge({ subscriptPermission: data });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SUBMIT_STATUS]: submitStatus,
  [Types.TABLE_SUB]: TableSub,
  [Types.SET_TABLE_SUB]: setTableSub,
  //Dropdown
  [Types.DLT_VEHICLE_TYPE]: DltVehicleType,
  [Types.SET_DLT_VEHICLE_TYPE]: setDltVehicleType,
  [Types.DLT_BODY_TYPE]: DltBodyType,
  [Types.SET_DLT_BODY_TYPE]: setDltBodyType,
  [Types.CARGOLINK_TYPE]: CargolinkType,
  [Types.SET_CARGOLINK_TYPE]: setCargolinkType,
  [Types.DOCUMENT_TYPE]: DocumentType,
  [Types.SET_DOCUMENT_TYPE]: setDocumentType,
  [Types.PACKAGE]: Package,
  [Types.SET_PACKAGE]: setPackage,
  [Types.PACKAGE_I_D]: PackageID,
  [Types.SET_PACKAGE_I_D]: setPackageID,
  [Types.CUSTOMER_B_Y]: CustomerBY,
  [Types.SET_CUSTOMER_B_Y]: setCustomerBY,
  [Types.GET_CUSTOMER]: getCustomer,
  [Types.SETGET_CUSTOMER]: setgetCustomer,
  [Types.GET_PAY]: getPay,
  [Types.SETGET_PAY]: setgetPay,
  [Types.MY_DEALERS]: MyDealers,
  [Types.SET_MY_DEALERS]: setMyDealers,
  [Types.SIGNATURES]: Signatures,
  [Types.SET_SIGNATURES]: setSignatures,
  [Types.SET_DEALER_ID]: setDealerId,
  [Types.SET_CONTRACT_ID]: setContractId,
  //
  [Types.SET_PERSONAL_ID_SELECT]: setPersonalIdSelect,
  //profile
  [Types.GET_PROFILE_SUB]: getProfileSub,
  [Types.SETGET_PROFILE_SUB]: setgetProfileSub,
  [Types.POST_PROFILE]: postProfile,
  [Types.SETPOST_PROFILE]: setpostProfile,
  [Types.SHOW_SUBSCRIBER]: showSubscriber,
  [Types.SETSHOW_SUBSCRIBER]: setshowSubscriber,
  [Types.PUT_SUBSCRIBER]: putSubscriber,
  [Types.SETPUT_SUBSCRIBER]: setputSubscriber,
  [Types.DEL_SUBSCRIBER]: delSubscriber,
  [Types.SETDEL_SUBSCRIBER]: setdelSubscriber,

  //infogetProfileSub
  [Types.VERIFY_CUST]: VerifyCust,
  [Types.SET_VERIFY_CUST]: setVerifyCust,
  [Types.VERIFY_PAYMENT_CUST]: VerifyPaymentCust,
  [Types.SET_VERIFY_PAYMENT_CUST]: setVerifyPaymentCust,
  [Types.ITEM_CERTICATE]: ItemCerticate,
  [Types.SET_ITEM_CERTICATE]: setItemCerticate,
  //
  [Types.MAP]: Map,
  [Types.SET_MAP]: setMap,
  [Types.CREATE]: Create,
  [Types.SET_CREATE]: setCreate,
  [Types.GET_SUBSCRIBER]: getSubscriber,
  [Types.SETGET_SUBSCRIBER]: setgetSubscriber,
  [Types.VERIFY_SUB]: VerifySub,
  [Types.SET_VERIFY_SUB]: setVerifySub,
  [Types.RESEND_DLT]: ResendDlt,
  [Types.SET_RESEND_DLT]: setResendDlt,
  [Types.ACTIVE_GPS]: ActiveGps,
  [Types.SET_ACTIVE_GPS]: setActiveGps,
  //
  [Types.SET_DATAITEM]: setDataitem,
  [Types.SET_ID_SELECT_SUBSCRIPTION]: setIdSelectSubscription,
  [Types.SET_VEHICLE_REGISTER]: setVehicleRegister,
  [Types.SET_DEFAULT_VEHICLE_REGISTER]: setDefaultVehicleRegister,
  [Types.SET_SUBSCRIPT_PERMISSION]: setSubscriptPermission,
});

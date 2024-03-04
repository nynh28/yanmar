import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
import Cookies from "js-cookie";
// import { getIconByGeofenceType } from '../Sagas/GeofenceSagas';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // login: ['username', 'password'],
  setData: ["typeForm"],
  selectId: ["typeForm", "idSelected"],
  submitStatus: ["status", "ErrorSubcode", "show"],
  createRefGeofenceType: ["ref"],
  cleanData: [],

  selectRow: ["selectData", "zoomSelected", "centerSelected"],
  resetSelectRow: [],

  getIconByGeofenceType: ["id"],
  getIconByGeofenceTypeSuccess: ["attachInfo"],
  getIconByGeofenceTypeFail: [],

  getDropdownGeofence: ["id"],
  getDropdownSuccess: ["partnerNameList", "geomTypeNavList"],
  getDropdownFail: ["error"],

  getDropdownPartnerName: [],
  getDropdownPartnerNameSuccess: ["partnerNameList", "geomTypeNavList"],
  getDropdownPartnerNameFail: ["error"],

  getDropdownGeofenceType: ["id"],
  getDropdownGeofenceTypeSuccess: ["geofenceTypeList"],
  getDropdownGeofenceTypeFail: ["error"],

  getPresentIcon: [],
  getPresentIconSuccess: ["iconPresent"],
  getPresentIconFail: [],

  getSourceType: ["id"],
  getSourceTypeSuccess: ["sourceType", "partnerNameList", "iconSourceRadio"],
  getSourceTypeFail: ["error"],

  getGeofence: ["id"],
  getGeofenceSuccess: ["geofence"],
  getGeofenceFail: ["error"],

  addGeofence: ["geofence"],
  addGeofenceSuccess: [],
  addGeofenceFail: ["error"],

  editGeofence: ["geofence"],
  editGeofenceSuccess: [],
  editGeofenceFail: ["error"],

  deleteGeofence: ["geofence"],
  deleteGeofenceSuccess: [],
  deleteGeofenceFail: ["error"],

  getGeofenceType: ["id"],
  getGeofenceTypeSuccess: ["geofenceType", "profileUser"],
  getGeofenceTypeFail: ["error"],

  addGeofenceType: ["geofenceType"],
  addGeofenceTypeSuccess: [],
  addGeofenceTypeFail: ["error"],

  editGeofenceType: ["geofenceType"],
  editGeofenceTypeSuccess: [],
  editGeofenceTypeFail: ["error"],

  deleteGeofenceType: ["geofenceType"],
  deleteGeofenceTypeSuccess: [],
  deleteGeofenceTypeFail: ["error"],

  editGeofenceSharing: ["id", "geofenceSharing"],
  editGeofenceSharingSuccess: [],
  editGeofenceSharingFail: ["error"],

  cloneGeofenceSharing: ["geofenceSharing"],
  cloneGeofenceSharingSuccess: [],
  cloneGeofenceSharingFail: ["error"],

  getGeofenceByTypesGeof: ["GeofenceTypeIds"],
  setGeofenceByTypesGeof: ["geofenceByTypes"],

  setStateReduxGeofence: ["objState"],
  setDefaultReduxGeofence: [],
});

export const GeofenceTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  infoGeofenceData: null,
  typeForm: null,
  idSelected: null,
  geofence: null,

  geofenceTypeList: [],
  geomTypeNavList: [],
  sourceType: [],
  partnerNameList: [],
  iconSourceRadio: [],
  iconPresent: [{ attachCode: "", attachUrl: "", name: "" }],
  attachInfoByGeofenceType: {
    attachCode: "",
    fileName: "",
    fileUrl: "",
  },

  geofenceType: {},
  isGeofenceType: false,
  isGeofence: false,
  geofenceSharing: null,
  action: null,

  loading: false,
  success: null,
  error: null,

  statusSubmit: {
    show: false,
    status: false,
    ErrorSubcode: 0,
  },

  zoomSelected: 6,
  centerSelected: {
    lat: 13.786377,
    lng: 100.608755,
  },
  selectData: [],
  selectCoordinate: [{ lat: 0, lng: 0 }],
  selectIconPoint: { lat: 0, lng: 0 },
  selectIconUrl: null,
  select: false,
  refGeofenceType: null,

  geofenceByTypes: [],
  geofencesEnabled: [],
});

/* ------------- Reducers ------------- */

export const submitStatus = (state, { status, ErrorSubcode, show }) => {
  let statusSubmit = {
    show,
    status,
    ErrorSubcode,
  };
  console.log("submit");
  console.log(statusSubmit);
  return state.merge({ loading: false, statusSubmit });
};

export const createRefGeofenceType = (state, { refGeofenceType }) => {
  // let statusSubmit = {
  //   status,
  //   ErrorSubcode
  // }
  console.log("createRef");
  console.log(refGeofenceType);
  return state.merge({ loading: false, refGeofenceType });
};

export const cleanData = (state, {}) => {
  return state.merge({ geofence: null });
};

export const setData = (state, { typeForm }) => {
  if (typeForm === "Add")
    return state.merge({ typeForm, infoGeofenceData: null, loading: false });
  else
    return state.merge({
      typeForm,
      loading: false,
      isGeofenceType: false,
      isGeofence: false,
      geofenceType: {},
      geofence: null,
    });
};

export const selectId = (state, { typeForm, idSelected }) => {
  if (typeForm === "Edit") {
    console.log("edit");
    return state.merge({
      typeForm,
      idSelected,
      infoGeofenceData: null,
      loading: false,
    });
    // return state.merge({ geofenceType: {id: edit.id, partnerId: edit.partnerId, partnerNameList: edit.partnerNameList, partnerTypeName: edit.partnerTypeName, geofenceTypeName: edit.geofenceTypeName, geofenceDescription: edit.geofenceDescription, isHazard: edit.isHazard, activeStatus: edit.activeStatus, sourceTypeName: edit.sourceTypeName}, typeForm, idSelected, infoGeofenceData: null, loading: false })
  } else {
    // console.log(edit)
    return state.merge({ typeForm, idSelected, loading: false });
  }
};

export const selectRow = (
  state,
  { selectData, zoomSelected, centerSelected }
) => {
  return state.merge({
    selectData: selectData == 0 ? [] : selectData,
    zoomSelected,
    centerSelected,
  });
};

export const resetSelectRow = (state) => {
  console.log("resetSelectRow");
  return state.merge({ selectData: [] });
};

export const getIconByGeofenceType = (state, {}) => {
  // console.log("getIconByGeofenceType")
  return state.merge({ loading: true });
};

export const getIconByGeofenceTypeSuccess = (state, { attachInfo }) => {
  // console.log("getIconByGeofenceTypeSuccess")
  // console.log(attachInfo)
  return state.merge({ loading: false, attachInfoByGeofenceType: attachInfo });
};

export const getIconByGeofenceTypeFail = (state, {}) => {
  // console.log("getIconByGeofenceTypeFail")
  return state.merge({
    loading: false,
    attachInfoByGeofenceType: {
      attachCode: "",
      fileName: "",
      fileUrl: "",
    },
  });
};

export const getPresentIcon = (state, {}) => {
  // console.log("getPresentIcon")
  return state.merge({ loading: true });
};

export const getPresentIconSuccess = (state, { iconPresent }) => {
  // console.log("getPresentIconSuccess")
  // console.log(iconPresent)
  return state.merge({ loading: false, iconPresent });
};

export const getPresentIconFail = (state, {}) => {
  // console.log("getPresentIconFail")
  return state.merge({ loading: false });
};

export const getDropdownGeofence = (state) => {
  // console.log('getDropdown')
  return state.merge({ loading: true });
};

export const getDropdownSuccess = (
  state,
  { partnerNameList, geomTypeNavList }
) => {
  // console.log('getDropdownSuccess')
  // console.log(partnerNameList)
  // console.log(geomTypeNavList)
  return state.merge({ loading: false, geomTypeNavList, partnerNameList });
};

export const getDropdownFail = (state) => {
  // console.log('getDropdownFail')
  return state.merge({ loading: false });
};

export const getDropdownPartnerName = (state) => {
  // console.log('getDropdown')
  return state.merge({ loading: true });
};

export const getDropdownPartnerNameSuccess = (
  state,
  { partnerNameList, geomTypeNavList }
) => {
  // console.log('getDropdownSuccess')
  // console.log(geomTypeNavList)
  // console.log(partnerNameList)
  return state.merge({ loading: false, partnerNameList, geomTypeNavList });
};

export const getDropdownPartnerNameFail = (state) => {
  // console.log('getDropdownFail')
  return state.merge({ loading: false });
};

export const getDropdownGeofenceType = (state) => {
  // console.log('getDropdownGeofenceType')
  return state.merge({ loading: true });
};

export const getDropdownGeofenceTypeSuccess = (state, { geofenceTypeList }) => {
  // console.log('getDropdownGeofenceTypeSuccess')
  return state.merge({ loading: false, geofenceTypeList });
};

export const getDropdownGeofenceTypeFail = (state) => {
  // console.log('getDropdownGeofenceTypeFail')
  return state.merge({ loading: false });
};

export const getSourceType = (state, { id }) => {
  // console.log('getSourceType')
  // console.log(id)
  return state.merge({ loading: true });
};

export const getSourceTypeSuccess = (
  state,
  { sourceType, partnerNameList, iconSourceRadio }
) => {
  // console.log('getSourceTypeSuccess')
  // console.log(iconSourceRadio)
  return state.merge({
    loading: false,
    sourceType,
    partnerNameList,
    iconSourceRadio,
  });
};

export const getSourceTypeFail = (state) => {
  // console.log('getSourceTypeFail')
  return state.merge({ loading: false });
};

export const getGeofence = (state, { id }) => {
  console.log("getGeofence");
  console.log(id);
  return state.merge({ loading: true });
};

export const getGeofenceSuccess = (state, { geofence }) => {
  console.log("getGeofenceSuccess");
  // console.log(geofence)
  // console.log(state.isGeofence)
  return state.merge({ loading: false, geofence: geofence, isGeofence: true });
};

export const getGeofenceFail = (state, { error }) => {
  // console.log('getGeofenceFail')
  return state.merge({ loading: false, error });
};

export const addGeofence = (state, { geofence }) => {
  console.log("addGeofence");
  // console.log(geofence)
  return state.merge({ loading: true });
};

export const addGeofenceSuccess = (state) => {
  console.log("addGeofenceSuccess");
  let statusSubmit = {
    show: true,
    status: true,
    ErrorSubCode: "",
  };
  return state.merge({ loading: false, typeForm: null, statusSubmit });
};

export const addGeofenceFail = (state, { error }) => {
  // console.log('addGeofenceFail')
  let statusSubmit = {
    show: true,
    status: false,
    ErrorSubCode: error,
  };
  return state.merge({ loading: false, error, statusSubmit });
};

export const editGeofence = (state, { geofence }) => {
  // console.log('editGeofence')
  // console.log(geofence)
  return state.merge({ loading: true });
};

export const editGeofenceSuccess = (state) => {
  console.log("editGeofenceSuccess");
  let statusSubmit = {
    show: true,
    status: true,
    ErrorSubCode: "",
  };
  return state.merge({
    loading: false,
    typeForm: null,
    idSelected: null,
    statusSubmit,
  });
};

export const editGeofenceFail = (state, { error }) => {
  // console.log('editgetGeofenceFail')
  let statusSubmit = {
    show: true,
    status: false,
    ErrorSubCode: error,
  };
  return state.merge({ loading: false, statusSubmit });
};

export const deleteGeofence = (state, { data }) => {
  // console.log('deleteGeofence')
  // console.log(data)
  return state.merge({ loading: true });
};

export const deleteGeofenceSuccess = (state) => {
  // console.log('deleteGeofenceSuccess')
  return state.merge({ loading: false });
};

export const deleteGeofenceFail = (state, { error }) => {
  // console.log('deleteGeofenceFail')
  return state.merge({ loading: false, error });
};

export const getGeofenceType = (state, { id }) => {
  // console.log('getGeofenceType')
  // console.log(id)
  return state.merge({ loading: true, typeForm: "Edit", idSelected: id });
};

export const getGeofenceTypeSuccess = (
  state,
  { geofenceType, profileUser }
) => {
  // console.log('getGeofenceTypeSuccess')
  // console.log(geofenceType)
  // let data = geofenceType.map((i) => { return {value: i.id, name: i.geofenceName} })
  // console.log(data)
  return state.merge({
    loading: false,
    geofenceType: geofenceType,
    isGeofenceType: true,
    profileUser,
  });
};

export const getGeofenceTypeFail = (state, { error }) => {
  // console.log('getGeofenceTypeFail')
  return state.merge({ loading: false, error });
};

export const addGeofenceType = (state, { geofenceType }) => {
  // console.log('addGeofenceType')
  return state.merge({ loading: true });
};

export const addGeofenceTypeSuccess = (state) => {
  // console.log('getGeofenceTypeSuccess')
  let statusSubmit = {
    show: true,
    status: true,
    ErrorSubCode: "",
  };
  return state.merge({ loading: false, typeForm: null, statusSubmit });
};

export const addGeofenceTypeFail = (state, { error }) => {
  // console.log('getGeofenceTypeFail')
  let statusSubmit = {
    show: true,
    status: false,
    ErrorSubCode: error,
  };
  return state.merge({ loading: false, statusSubmit });
};

export const editGeofenceType = (state, { geofenceType }) => {
  // console.log('editGeofenceType')
  // console.log(geofenceType)
  return state.merge({ loading: true });
};

export const editGeofenceTypeSuccess = (state) => {
  // console.log('editGeofenceTypeSuccess')
  let statusSubmit = {
    show: true,
    status: true,
    ErrorSubCode: "",
  };
  return state.merge({
    loading: false,
    typeForm: null,
    idSelected: null,
    statusSubmit,
  });
};

export const editGeofenceTypeFail = (state, { error }) => {
  // console.log('editgetGeofenceTypeFail')
  let statusSubmit = {
    show: true,
    status: false,
    ErrorSubCode: error,
  };
  return state.merge({ loading: false, error, statusSubmit });
};

export const deleteGeofenceType = (state, { geofenceType }) => {
  // console.log('deleteGeofenceType')
  // console.log(geofenceType)
  return state.merge({ loading: true });
};

export const deleteGeofenceTypeSuccess = (state) => {
  // console.log('deleteGeofenceTypeSuccess')
  return state.merge({ loading: false });
};

export const deleteGeofenceTypeFail = (state, { error }) => {
  // console.log('deleteGeofenceTypeFail')
  return state.merge({ loading: false, error });
};

export const editGeofenceSharing = (state, { id, geofenceSharing }) => {
  // console.log('editGeofenceSharing')
  // console.log(editGeofenceSharing)
  return state.merge({ loading: true, action: "Edit" });
};

export const editGeofenceSharingSuccess = (state) => {
  // console.log('editGeofenceSharingSuccess')
  let statusSubmit = {
    show: true,
    status: true,
    ErrorSubCode: "",
  };
  return state.merge({ loading: false, statusSubmit });
};

export const editGeofenceSharingFail = (state, errorCode) => {
  // console.log('editGeofenceSharingFail')
  let statusSubmit = {
    show: true,
    status: false,
    ErrorSubCode: errorCode,
  };
  // console.log(statusSubmit)
  return state.merge({ loading: false, statusSubmit });
};

export const cloneGeofenceSharing = (state, { geofenceSharing }) => {
  // console.log('cloneGeofenceSharing')
  return state.merge({ loading: true, action: "Clone" });
};

export const cloneGeofenceSharingSuccess = (state) => {
  // console.log('cloneGeofenceSharingSuccess')
  return state.merge({ loading: false });
};

export const cloneGeofenceSharingFail = (state) => {
  // console.log('cloneGeofenceSharingFail')
  return state.merge({ loading: false });
};

export const getGeofenceByTypesGeof = (state, { GeofenceTypeIds }) => {
  return state.merge({ geofencesEnabled: GeofenceTypeIds });
};
export const setGeofenceByTypesGeof = (state, { geofenceByTypes }) => {
  return state.merge({ geofenceByTypes });
};

export const setStateReduxGeofence = (state, { objState }) => {
  // console.log('cloneGeofenceSharingFail')
  return state.merge(objState);
};
export const setDefaultReduxGeofence = (state, {}) => {
  return INITIAL_STATE;
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_DATA]: setData,
  [Types.SELECT_ID]: selectId,
  [Types.SELECT_ROW]: selectRow,
  [Types.RESET_SELECT_ROW]: resetSelectRow,
  [Types.SUBMIT_STATUS]: submitStatus,
  [Types.CREATE_REF_GEOFENCE_TYPE]: createRefGeofenceType,
  [Types.CLEAN_DATA]: cleanData,
  // [Types.createRef]: createRef,

  [Types.GET_ICON_BY_GEOFENCE_TYPE]: getIconByGeofenceType,
  [Types.GET_ICON_BY_GEOFENCE_TYPE_SUCCESS]: getIconByGeofenceTypeSuccess,
  [Types.GET_ICON_BY_GEOFENCE_TYPE_FAIL]: getIconByGeofenceTypeFail,

  [Types.GET_DROPDOWN_GEOFENCE]: getDropdownGeofence,
  [Types.GET_DROPDOWN_SUCCESS]: getDropdownSuccess,
  [Types.GET_DROPDOWN_FAIL]: getDropdownFail,

  [Types.GET_DROPDOWN_PARTNER_NAME]: getDropdownPartnerName,
  [Types.GET_DROPDOWN_PARTNER_NAME_SUCCESS]: getDropdownPartnerNameSuccess,
  [Types.GET_DROPDOWN_PARTNER_NAME_FAIL]: getDropdownPartnerNameFail,

  [Types.GET_DROPDOWN_GEOFENCE_TYPE]: getDropdownGeofenceType,
  [Types.GET_DROPDOWN_GEOFENCE_TYPE_SUCCESS]: getDropdownGeofenceTypeSuccess,
  [Types.GET_DROPDOWN_GEOFENCE_TYPE_FAIL]: getDropdownGeofenceTypeFail,

  [Types.GET_PRESENT_ICON]: getPresentIcon,
  [Types.GET_PRESENT_ICON_SUCCESS]: getPresentIconSuccess,
  [Types.GET_PRESENT_ICON_FAIL]: getPresentIconFail,

  [Types.GET_SOURCE_TYPE]: getSourceType,
  [Types.GET_SOURCE_TYPE_SUCCESS]: getSourceTypeSuccess,
  [Types.GET_SOURCE_TYPE_FAIL]: getSourceTypeFail,

  [Types.GET_GEOFENCE]: getGeofence,
  [Types.GET_GEOFENCE_SUCCESS]: getGeofenceSuccess,
  [Types.GET_GEOFENCE_FAIL]: getGeofenceFail,

  [Types.ADD_GEOFENCE]: addGeofence,
  [Types.ADD_GEOFENCE_SUCCESS]: addGeofenceSuccess,
  [Types.ADD_GEOFENCE_FAIL]: addGeofenceFail,

  [Types.EDIT_GEOFENCE]: editGeofence,
  [Types.EDIT_GEOFENCE_SUCCESS]: editGeofenceSuccess,
  [Types.EDIT_GEOFENCE_FAIL]: editGeofenceFail,

  [Types.DELETE_GEOFENCE]: deleteGeofence,
  [Types.DELETE_GEOFENCE_SUCCESS]: deleteGeofenceSuccess,
  [Types.DELETE_GEOFENCE_FAIL]: deleteGeofenceFail,

  [Types.GET_GEOFENCE_TYPE]: getGeofenceType,
  [Types.GET_GEOFENCE_TYPE_SUCCESS]: getGeofenceTypeSuccess,
  [Types.GET_GEOFENCE_TYPE_FAIL]: getGeofenceTypeFail,

  [Types.ADD_GEOFENCE_TYPE]: addGeofenceType,
  [Types.ADD_GEOFENCE_TYPE_SUCCESS]: addGeofenceTypeSuccess,
  [Types.ADD_GEOFENCE_TYPE_FAIL]: addGeofenceTypeFail,

  [Types.EDIT_GEOFENCE_TYPE]: editGeofenceType,
  [Types.EDIT_GEOFENCE_TYPE_SUCCESS]: editGeofenceTypeSuccess,
  [Types.EDIT_GEOFENCE_TYPE_FAIL]: editGeofenceTypeFail,

  [Types.DELETE_GEOFENCE_TYPE]: deleteGeofenceType,
  [Types.DELETE_GEOFENCE_TYPE_SUCCESS]: deleteGeofenceTypeSuccess,
  [Types.DELETE_GEOFENCE_TYPE_FAIL]: deleteGeofenceTypeFail,

  [Types.EDIT_GEOFENCE_SHARING]: editGeofenceSharing,
  [Types.EDIT_GEOFENCE_SHARING_SUCCESS]: editGeofenceSharingSuccess,
  [Types.EDIT_GEOFENCE_SHARING_FAIL]: editGeofenceSharingFail,

  [Types.CLONE_GEOFENCE_SHARING]: cloneGeofenceSharing,
  [Types.CLONE_GEOFENCE_SHARING_SUCCESS]: cloneGeofenceSharingSuccess,
  [Types.CLONE_GEOFENCE_SHARING_FAIL]: cloneGeofenceSharingFail,

  [Types.GET_GEOFENCE_BY_TYPES_GEOF]: getGeofenceByTypesGeof,
  [Types.SET_GEOFENCE_BY_TYPES_GEOF]: setGeofenceByTypesGeof,

  [Types.SET_STATE_REDUX_GEOFENCE]: setStateReduxGeofence,
  [Types.SET_DEFAULT_REDUX_GEOFENCE]: setDefaultReduxGeofence,
});

import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
import { get } from "lodash";
import { isEmpty } from "react-redux-firebase";
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setSelect: ["select"],
  setData: ["searchData"],
  setListvehicle: ["listvehicle"],
  setList: ["initialVehiclesDataSI", "auto"],
  setVid: ["vid"],
  setStatesContorlRoomDealerRedux: ["obj"],
  setInformation: ["informationCR"],
  setZoom: ["zoom"],
  setRefresh: ["isRefresh"],
  setHideFooter: [],
  setStateStock: ["object"],
  setValue: ["name", "value"],

  // --------------------------------------------------
});

export const ControlRoomTypes = Types;

export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  select: 1,
  vid: "",
  hideFooter: false,
  searchData: {
    vin_no: "",
    category_type_code: "",
    class_type_code: "",
    area_code: "",
    ordering_model_code: "",
    dealer_code: "",
    install_aging_max_day: "",
    install_aging_min_day: "",
    geofence_aging_max_day: "",
    geofence_aging_min_day: "",
  },
  listvehicle: [],
  initialVehiclesDataSI: [],
  displayVehicle: [],
  statusSubmit: {
    status: true,
    ErrorSubcode: 0,
  },
  lstHeat: {},
  informationCR: [],

  orderingModelList: null,
  customerList: null,
  installAgingList: null,
  dealerList: null,
  classTypeList: null,
  categoryTypeList: null,
  areaList: null,
  geofenceAgingList: null,
  zoom: 5,
  isRefresh: false,
  auto: false,
  geofenceByTypes: [],
  geofenceDetail: {},
  dealerData: [],
  selectDealer: "",
  currentValue: "",
  modelCode: [],
  currentModel: "",
  chassisNoList: [],
  currentVehicle: "",
  information: {},
});

/* ------------- Reducers ------------- */

export const setValue = (state, { name, value }) => {
  return state.merge({ [name]: value });
};

export const setInformation = (state, { informationCR }) => {
  return state.merge({ informationCR });
};
export const setZoom = (state, { zoom }) => {
  return state.merge({ zoom });
};
export const setRefresh = (state, { isRefresh }) => {
  return state.merge({ isRefresh });
};
export const setHideFooter = (state, {}) => {
  return state.merge({ hideFooter: !state.hideFooter });
};

export const setListvehicle = (state, { listvehicle }) => {
  return state.merge({ listvehicle });
};

export const setStatesContorlRoomDealerRedux = (state, { obj }) => {
  return state.merge(obj);
};
export const setList = (state, { initialVehiclesDataSI, auto }) => {
  let displayVehicle = initialVehiclesDataSI?.map((item) => get(item, "vid"));
  console.log(
    "displayVehicle :",
    displayVehicle,
    "initialVehiclesDataSI : ",
    initialVehiclesDataSI
  );
  return state.merge({ initialVehiclesDataSI, auto });
};
export const setData = (state, { searchData }) => {
  return state.merge({ searchData });
};
export const setSelect = (state, { select }) => {
  return state.merge({ select });
};
export const setVid = (state, { vid }) => {
  return state.merge({ vid });
};
export const setStateStock = (state, { object }) => {
  console.log(object);
  return state.merge(object);
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_LISTVEHICLE]: setListvehicle,
  [Types.SET_LIST]: setList,
  [Types.SET_DATA]: setData,
  [Types.SET_SELECT]: setSelect,
  [Types.SET_VID]: setVid,
  [Types.SET_STATES_CONTORL_ROOM_DEALER_REDUX]: setStatesContorlRoomDealerRedux,
  [Types.SET_INFORMATION]: setInformation,
  [Types.SET_ZOOM]: setZoom,
  [Types.SET_REFRESH]: setRefresh,
  [Types.SET_HIDE_FOOTER]: setHideFooter,
  [Types.SET_STATE_STOCK]: setStateStock,
  [Types.SET_VALUE]: setValue,
  // -----------     ---------------------------------------
});

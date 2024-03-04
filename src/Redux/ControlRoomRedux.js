import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
import { get } from "lodash";
import moment from "moment";
import { isEmpty } from "react-redux-firebase";
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setSelect: ["select"],
  setSearchData: ["searchData"],
  setInitialVehiclesData: ["initialVehiclesData", "auto"],
  setStatesContorlRoomRedux: ["obj"],
  setInformation: ["information"],
  setZoom: ["zoom"],
  setRefresh: ["isRefresh"],
  setHideFooter: [],
  setClusterEnabled: ["clusterEnabled"],
  setHeatData: ["data"],
  // --------------------------------------------------
});

export const ControlRoomTypes = Types;

export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
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
    install_aging: "",
    geofence_aging: "",
  },
  initialVehiclesData: null,
  displayVehicle: null,
  statusSubmit: {
    status: true,
    ErrorSubcode: 0,
  },
  lstHeat: {},
  information: null,
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
  geofenceByTypes: [],
  select: "hmst_stock",
  clusterEnabled: true,
  autoRefresh: true,
  auto: false,
  geofenceDetail: {},
});

/* ------------- Reducers ------------- */

export const setInformation = (state, { information }) => {
  return state.merge({ information });
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

export const setStatesContorlRoomRedux = (state, { obj }) => {
  return state.merge(obj);
};
export const setInitialVehiclesData = (
  state,
  { initialVehiclesData, auto }
) => {
  let displayVehicle = initialVehiclesData.map((item) =>
    get(item, "vehicle_id")
  );
  return state.merge({
    initialVehiclesData,
    displayVehicle,
    timeUpdate: moment().format("DD/MM/YYYY HH:mm:ss"),
    auto,
  });
};
export const setSearchData = (state, { searchData }) => {
  return state.merge({ searchData });
};
export const setSelect = (state, { select }) => {
  return state.merge({ select });
};
export const setClusterEnabled = (state, { clusterEnabled }) => {
  return state.merge({ clusterEnabled });
};
export const setHeatData = (state, { data }) => {
  let lstHeat = JSON.parse(JSON.stringify(state.lstHeat));
  if (!isEmpty(data)) {
    if (!isEmpty(lstHeat)) lstHeat.list.push(...data.list);
    else lstHeat = data;
  } else {
    lstHeat = data;
  }

  return state.merge({ lstHeat });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_INITIAL_VEHICLES_DATA]: setInitialVehiclesData,
  [Types.SET_SEARCH_DATA]: setSearchData,
  [Types.SET_SELECT]: setSelect,
  [Types.SET_STATES_CONTORL_ROOM_REDUX]: setStatesContorlRoomRedux,
  [Types.SET_INFORMATION]: setInformation,
  [Types.SET_ZOOM]: setZoom,
  [Types.SET_REFRESH]: setRefresh,
  [Types.SET_HIDE_FOOTER]: setHideFooter,
  [Types.SET_CLUSTER_ENABLED]: setClusterEnabled,
  [Types.SET_HEAT_DATA]: setHeatData,
  // -----------     ---------------------------------------
});

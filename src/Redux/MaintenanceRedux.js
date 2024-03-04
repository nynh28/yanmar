import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
import moment from "moment";
/* ------------- Types and Action Creators ------------- */
const todayStart = moment().set({
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0,
});
const todayEnd = moment().set({
  hour: 23,
  minute: 59,
  second: 59,
  millisecond: 59,
});

const { Types, Creators } = createActions({
  getDataUser: ["id", "groupType"],
  getEventData: [],
  getEventDataSuccess: ["events"],
  getMessageCount: [],
  getMessageCountSuccess: ["messageCount"],
  getDetailMessage: ["id"],
  getDetailMessageSuccess: ["detailEvent"],
  setDetailEvent: [],
  setToastEvent: ["toastEvent"],
  setValue: ["name", "value"],

  // >> NEW <<
  resetTempData: [],
  setMessageList: ["messageList"],
  setMessageInfoMtn: ["data"],
  setUnreadTotal: ["total"],
  setReadMessage: ["isRead"],
  setMessageData: ["data", "searchData", "languageLocation"],
  setDefaultFilter: [],
  setStateMapControlNoti: ["name", "value"],
  setStateMaintenance: ["object"],
  setDefaultReduxMaintenance: [],

  setSelectAll: ["isSelectAll"],
});

export const MaintenanceTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  //#region MAP
  mapType: "roadmap",
  geofencesEnabled: [],
  geofenceByTypes: [],
  geofenceDetail: null,
  markerInfo: {},
  defaultCenter: { lat: 13.786377, lng: 100.608755 },
  defaultZoom: 5,
  //#endregion

  //#region MODAL
  showFormPopup: false,
  showFormHourPopup: false,
  showAppointmentPop: false,
  dataViewRemark: "",
  dataViewAppointment: "",
  dataViewHour: "",
  //#endregion

  //#region EVENT INFO
  events: null,
  messageCount: 0,
  detailEvent: null,
  toastEvent: null,
  messageList: [],
  messageInfo: {},
  unreadTotal: 0,
  isReadMessage: false,
  messageData: [],
  events: [],

  searchData: {},
  allCustomer: [],
  languageLocation: "",
  selectAll: true,
  customerSelected: [],
  dealerSelected: [],
  eventSelected: [],
  dealerData: [],
  modelList: [],
  chassisNoList: [],
  engineNoList: [],
  showName: "รุ่นรถ",
  selectDealer: "",
  currentValue: "",
  byModelCode: [],
  dateRangeFilter: {
    dateStart: todayStart.format("DD/MM/YYYY HH:mm"),
    dateEnd: todayEnd.format("DD/MM/YYYY HH:mm"),
  },
  isLoadingVehicles: true,

  //#endregion
});

/* ------------- Reducers ------------- */
export const setValue = (state, { name, value }) => {
  return state.merge({ [name]: value });
};

export const setSelectAll = (state, { isSelectAll }) => {
  return state.merge({ selectAll: isSelectAll });
};

export const resetTempData = (state) => {
  return state.merge({
    messageList: [],
    messageInfo: [],
    messageData: [],
    searchData: {},
    unreadTotal: 0,
    languageLocation: "",
  });
};
export const setDefaultFilter = (state) => {
  return state.merge({ searchData: {}, messageData: [] });
};

export const setStateMapControlNoti = (state, { name, value }) => {
  return state.merge({ [name]: value });
};
export const setStateMaintenance = (state, { object }) => {
  return state.merge(object);
};
export const getDataUser = (state, { id, groupType }) => {
  return state.merge({});
};

export const getEventData = (state) => {
  return state.merge({});
};

export const getEventDataSuccess = (state, { events }) => {
  return state.merge({ events });
};

export const getMessageCount = (state, {}) => {
  return state.merge({});
};
export const getMessageCountSuccess = (state, { messageCount }) => {
  return state.merge({ messageCount: state.messageCount + messageCount });
};

export const getDetailMessage = (state, {}) => {
  return state.merge({});
};
export const getDetailMessageSuccess = (state, { detailEvent }) => {
  return state.merge({ detailEvent });
};

export const setDetailEvent = (state, {}) => {
  return state.merge({ detailEvent: null });
};

export const setToastEvent = (state, { toastEvent }) => {
  // console.log('toastEvent', toastEvent)

  return state.merge({ toastEvent: toastEvent });
};

export const setMessageList = (state, { messageList }) => {
  return state.merge({ messageList });
};

export const setMessageInfoMtn = (state, { data }) => {
  // console.log("setMessageInfoMtn : ", data)
  let _data = {
    vid: data.messageType == "topic" ? data.vehicle_info.vid : data.vid,
    messageType: data.messageType,
    acc: data.acc,
    gpsdate: data.gpsdate,
    event_id: data.event_id,
    driver_name: data.driver_name || "",
    lat: data.lat,
    lng: data.lng,
    speed: data.speed,
    speed_limit: data.speed_limit,
    course: data.course,
    location: data.location,
    licenseplate:
      data.messageType == "topic"
        ? data.vehicle_info.licenseplate
        : data.licenseplate,
    class_type: data.class_type,
    status: data.status || 1,
    vin_no: data.vin_no,
    working_hour: data.current_engine_hour,
  };

  return state.merge({ messageInfo: _data });
};

export const setUnreadTotal = (state, { total }) => {
  return state.merge({ unreadTotal: total });
};

export const setReadMessage = (state, { isRead }) => {
  return state.merge({ isReadMessage: isRead });
};

export const setMessageData = (
  state,
  { data, searchData, languageLocation }
) => {
  return state.merge({ messageData: data, searchData, languageLocation });
};

export const setDefaultReduxMaintenance = () => {
  return INITIAL_STATE;
};
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET_TEMP_DATA]: resetTempData,
  [Types.GET_DATA_USER]: getDataUser,
  [Types.GET_EVENT_DATA]: getEventData,
  [Types.GET_EVENT_DATA_SUCCESS]: getEventDataSuccess,
  [Types.GET_MESSAGE_COUNT]: getMessageCount,
  [Types.GET_MESSAGE_COUNT_SUCCESS]: getMessageCountSuccess,
  [Types.GET_DETAIL_MESSAGE]: getDetailMessage,
  [Types.GET_DETAIL_MESSAGE_SUCCESS]: getDetailMessageSuccess,
  [Types.SET_DETAIL_EVENT]: setDetailEvent,
  [Types.SET_TOAST_EVENT]: setToastEvent,
  [Types.SET_MESSAGE_LIST]: setMessageList,
  [Types.SET_MESSAGE_INFO_MTN]: setMessageInfoMtn,
  [Types.SET_UNREAD_TOTAL]: setUnreadTotal,
  [Types.SET_READ_MESSAGE]: setReadMessage,
  [Types.SET_MESSAGE_DATA]: setMessageData,
  [Types.SET_DEFAULT_FILTER]: setDefaultFilter,
  [Types.SET_STATE_MAP_CONTROL_NOTI]: setStateMapControlNoti,
  [Types.SET_STATE_MAINTENANCE]: setStateMaintenance,
  [Types.SET_DEFAULT_REDUX_MAINTENANCE]: setDefaultReduxMaintenance,
  [Types.SET_SELECT_ALL]: setSelectAll,
  [Types.SET_VALUE]: setValue,
});

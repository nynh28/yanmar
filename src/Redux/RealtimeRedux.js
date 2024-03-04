import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
import { stat } from "fs";
import { isEmpty } from "react-redux-firebase";

import { get } from "lodash";
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getInitialTruckData: [],
  setInitialTruckData: ["InitialData"],
  getInitialEventData: [],
  setInitialEventData: ["InitialData"],
  getEventDataForTruck: ["vinNo"],
  setEventDataForTruck: ["InitialData"],
  gpsUpdate: ["update"],

  getInformation: ["vid", "zoom", "activeMap"],
  setInformation: ["information", "zoom", "activeMap"],

  setFocusPosition: ["lat", "lng"],
  setDisplayTruck: ["displayTruck", "dashboard"],

  setHideFooter: [],
  setHideOverlayPanel: [],

  setActiveMap: ["activeMap"],
  setZoomMap: ["zoom"],

  getInitialDriverData: [],
  setInitialDriverData: ["drivers"],

  getGeofenceByTypes: ["GeofenceTypeIds"],
  setGeofenceByTypes: ["data"],

  getGeofenceDetail: ["geofenceId"],
  setGeofenceDetail: ["data"],

  setStateReduxRealtime: ["name", "value"],
  setDefaultReduxRealtime: [],

  setDefaultIconMarker: ["iconActive", "iconInactived"],

  setShowVehicleInfoStatusRealtime: ["isShow"],
  setShowDashboard: ["isShow"],
  setShowCluster: ["isShow"],
  setStateMapControl: ["name", "status"],
  setZoomChange: ["zoomLevel"],
  setIconSize: ["size"],
  setY: ["size"],

  setOperationChartVehicle: ["data"],
  setOperationChartDriver: ["data"],

  setOperationChartDriver: ["data"],

  setIndexMarkers: ["data"],
});

export const RealtimeTypes = Types;

export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  focusPosition: {},
  vehicles: [],
  events: [],
  event_update: {},
  activeTabDashboard: "0",
  information: {},
  displayTruck: null,
  displayfleet: null,
  displaydriver: null,
  hideFooter: false,
  hideOverlayPanel: false,
  eventsForTruck: [],
  activeMap: false,
  activeStatus: "",
  activeClassType: 0,
  zoom: undefined,
  activeVid: null,

  drivers: [],
  geofenceByTypes: [],
  geofenceDetail: null,
  vehiclesLoading: false,
  driverLoading: false,
  stateMapControl: {},
  iconActive: [],
  iconInactived: [],
  showVehicleInfoStatusRealtime: false,
  showDashboard: true,
  showCluster: true,

  clusterEnabled: true,
  objectEnabled: true,
  mapType: "roadmap",
  infoWindowEnabled: false,
  dashboardEnabled: true,
  vehicleInfoStatusEnabled: false,
  zoomLevel: 5,
  iconSize: 0,
  sizeY: 0,
  fitObjectEnabled: false,
  DataOperationchartvehicle: [],
  DataOperationchartdriver: [],
  checkFromDashboard: false,

  indexMarkers: [],
});

/* ------------- Reducers ------------- */

export const getInitialTruckData = (state) => {
  return state.merge({ vehiclesLoading: true });
};

export const setInitialTruckData = (state, { InitialData }) => {
  // console.log("setInitialTruckData  : ", InitialData)
  const vehicles = [];
  for (let item in InitialData) {
    // Set Vehicle Initial Data
    vehicles.push(InitialData[item]);
  }

  return state.merge({ vehicles, vehiclesLoading: false });
};

export const getInitialEventData = (state) => {
  return state.merge({});
};

export const setInitialEventData = (state, { InitialData }) => {
  const events = [];
  for (let item in InitialData) {
    events.push(InitialData[item]);
  }

  return state.merge({ events });
};

export const getEventDataForTruck = (state) => {
  return state.merge({});
};

export const setEventDataForTruck = (state, { InitialData }) => {
  const eventsForTruck = [];
  for (let item in InitialData) {
    eventsForTruck.push(InitialData[item]);
  }

  return state.merge({ eventsForTruck });
};

export const gpsUpdate = (state, { update }) => {
  let vehiclesLast = JSON.parse(JSON.stringify(state.vehicles));
  let informationLast = JSON.parse(JSON.stringify(state.information));

  // console.log("update : ", update)
  let testImei = [];
  for (let item in update.gps) {
    // Find Index Marker
    let index = state.vehicles.findIndex(
      (x) => x.gps.imei === update.gps[item].imei
    );

    // console.log(">> index : " + index)
    if (index >= 0) {
      // if (update.gps[item].mid === 9900374) {
      //   console.log("update.gps[item].gpsdate > ", update.gps[item].gpsdate)
      // }
      // testImei.push(update.gps[item].imei)
      // Update GPS
      vehiclesLast[index].gps.gpsdate = update.gps[item].gpsdate;
      vehiclesLast[index].gps.lat = update.gps[item].lat;
      vehiclesLast[index].gps.lng = update.gps[item].lng;
      vehiclesLast[index].gps.speed = update.gps[item].speed;
      vehiclesLast[index].gps.acc = update.gps[item].acc;
      vehiclesLast[index].gps.gps_stat = update.gps[item].gps_stat;
      vehiclesLast[index].gps.course = update.gps[item].course;
      vehiclesLast[index].gps.sattellite = update.gps[item].sattellite;
      vehiclesLast[index].gps.gsm = update.gps[item].gsm;
      vehiclesLast[index].driver_cards.status_swipe_card = get(
        update.gps[item],
        "driver_cards.status_swipe_card",
        vehiclesLast[index].driver_cards.status_swipe_card
      );
      vehiclesLast[index].driver_cards.name = get(
        update.gps[item],
        "driver_cards.name",
        ""
      );
      vehiclesLast[index].driver_cards.card_id = get(
        update.gps[item],
        "driver_cards.card_id",
        ""
      );

      vehiclesLast[index].alarm.OverRPM = update.gps[item].OverRPM;
      vehiclesLast[index].alarm.SuddenAccelerator =
        update.gps[item].SuddenAccelerator;
      vehiclesLast[index].alarm.SuddenBrake = update.gps[item].SuddenBrake;
      vehiclesLast[index].alarm.SuddenStart = update.gps[item].SuddenStart;
      vehiclesLast[index].alarm.SuddenTurn = update.gps[item].SuddenTurn;

      vehiclesLast[index].sensor.canbus.dtc_engine =
        update.gps[item].canbus_dtc_engine;
      vehiclesLast[index].sensor.device_batt_level =
        update.gps[item].device_batt_level;
      // Update Icons
      // vehiclesLast[index].icons.icon_map = update.gps[item].icons.icon_map
      vehiclesLast[index].gps.io_color = update.gps[item].icons.color;

      // SuddenStart: "0",
      // SuddenAccelerator: "0",
      // SuddenBrake: "0",
      // SuddenTurn: "0",
      // OverRPM: "0",

      // canbus_dtc_engine: "0",
      // device_batt_level: 4
    }

    // if (!isEmpty(informationLast)) {
    //   if (get(informationLast, 'gps.imei', null) == update.gps[item].imei) {
    //     // console.log(">>>>>> UPDATE RealTime <<<<<<")
    //   }
    // }

    // console.log("*******************************")
  }
  // console.log(' ____ TEST:: UPDATE CHECK PROBLEM CENTER MAP IN REALTIMEREDUX ____ ')
  // return state.merge({ vehicles: vehiclesLast, information: informationLast })
  return state.merge({ vehicles: vehiclesLast });
};

export const getInformation = (state, {}) => {
  return state.merge({});
};

export const setInformation = (state, { information, zoom, activeMap }) => {
  let vehiclesLast = JSON.parse(JSON.stringify(state.vehicles));
  let index = state.vehicles.findIndex(
    (x) => x.gps.imei === information.gps.imei
  );

  if (index >= 0) {
    vehiclesLast[index].gps.gpsdate = information.gps.gpsdate;
    vehiclesLast[index].gps.speed = information.gps.speed;
    vehiclesLast[index].info.vehicle_name = information.info.vehicle_name;
  }

  let objState = {
    information: information,
  };

  if (zoom) {
    objState.zoom = zoom;
    objState.hideFooter = false;
  }
  // console.log('activeMap', activeMap)
  if (activeMap === true) {
    objState.activeMap = activeMap;
    objState.focusPosition = {
      lat: get(information, "gps.lat"),
      lng: get(information, "gps.lng"),
    };
  }
  return state.merge({ ...objState, vehicles: vehiclesLast });
};

export const setFocusPosition = (state, { lat, lng }) => {
  let focusPosition = { lat, lng };
  // console.log('setFocusPosition', { lat, lng })
  // console.log('focusPosition', focusPosition)
  return state.merge({ focusPosition });
};

export const setDisplayTruck = (state, { displayTruck, dashboard }) => {
  let obj = {
    displayTruck,
  };
  if (dashboard) obj.checkFromDashboard = !state.checkFromDashboard;

  return state.merge(obj);
};

export const setHideFooter = (state, {}) => {
  return state.merge({ hideFooter: !state.hideFooter });
};
export const setHideOverlayPanel = (state, {}) => {
  return state.merge({ hideOverlayPanel: !state.hideOverlayPanel });
};
export const setActiveMap = (state, { activeMap }) => {
  let obj = {
    activeMap,
  };
  if (activeMap === true && !isEmpty(state.information)) {
    let lat = get(state.information, "gps.lat");
    let lng = get(state.information, "gps.lng");
    obj.focusPosition = { lat, lng };
  }
  return state.merge(obj);
};
export const setZoomMap = (state, { zoom }) => {
  return state.merge({ zoom });
};

export const getInitialDriverData = (state) => {
  return state.merge({ driverLoading: true });
};

export const setInitialDriverData = (state, { drivers }) => {
  return state.merge({ drivers, driverLoading: false });
};

export const getGeofenceByTypes = (state) => {
  return state.merge({});
};

export const setGeofenceByTypes = (state, { data }) => {
  return state.merge({ geofenceByTypes: data });
};

export const getGeofenceDetail = (state) => {
  return state.merge({ geofenceDetail: null });
};

export const setGeofenceDetail = (state, { data }) => {
  return state.merge({ geofenceDetail: data });
};

export const setStateReduxRealtime = (state, { name, value }) => {
  // console.log("stateMapControl : ", name)
  // console.log("stateMapControl : ", value)

  return state.merge({ [name]: value });
};

export const setDefaultReduxRealtime = (state, { name, value }) => {
  console.log("INITIAL_STATE", INITIAL_STATE);
  // JSON.stringify(INITIAL_STATE)
  let defaultState = JSON.parse(JSON.stringify(INITIAL_STATE));
  delete defaultState.iconActive;
  delete defaultState.iconInactived;
  return state.merge({ ...defaultState });
};

export const setDefaultIconMarker = (state, { iconActive, iconInactived }) => {
  return state.merge({ iconActive, iconInactived });
};

export const setShowVehicleInfoStatusRealtime = (state, { isShow }) => {
  return state.merge({ showVehicleInfoStatusRealtime: isShow });
};

export const setShowDashboard = (state, { isShow }) => {
  return state.merge({ showDashboard: isShow });
};

export const setShowCluster = (state, { isShow }) => {
  return state.merge({ showCluster: isShow });
};

export const setStateMapControl = (state, { name, status }) => {
  return state.merge({ [name]: status });
};

export const setZoomChange = (state, { zoomLevel }) => {
  return state.merge({ zoomLevel });
};

export const setIconSize = (state, { size }) => {
  return state.merge({ iconSize: size });
};

export const setY = (state, { size }) => {
  return state.merge({ sizeY: size });
};

export const setOperationChartVehicle = (state, { data }) => {
  return state.merge({ DataOperationchartvehicle: data });
};
export const setOperationChartDriver = (state, { data }) => {
  return state.merge({ DataOperationchartdriver: data });
};

export const setIndexMarkers = (state, { data }) => {
  let _indexMarkers = JSON.parse(JSON.stringify(state.indexMarkers));
  _indexMarkers.push(data);
  return state.merge({ indexMarkers: _indexMarkers });
};
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_INITIAL_TRUCK_DATA]: getInitialTruckData,
  [Types.SET_INITIAL_TRUCK_DATA]: setInitialTruckData,
  [Types.GET_INITIAL_EVENT_DATA]: getInitialEventData,
  [Types.SET_INITIAL_EVENT_DATA]: setInitialEventData,
  [Types.GPS_UPDATE]: gpsUpdate,
  [Types.GET_INFORMATION]: getInformation,
  [Types.SET_INFORMATION]: setInformation,
  [Types.SET_FOCUS_POSITION]: setFocusPosition,
  [Types.SET_DISPLAY_TRUCK]: setDisplayTruck,
  [Types.SET_HIDE_FOOTER]: setHideFooter,
  [Types.SET_HIDE_OVERLAY_PANEL]: setHideOverlayPanel,
  [Types.SET_ACTIVE_MAP]: setActiveMap,
  [Types.GET_EVENT_DATA_FOR_TRUCK]: getEventDataForTruck,
  [Types.SET_EVENT_DATA_FOR_TRUCK]: setEventDataForTruck,
  [Types.SET_ZOOM_MAP]: setZoomMap,
  [Types.GET_INITIAL_DRIVER_DATA]: getInitialDriverData,
  [Types.SET_INITIAL_DRIVER_DATA]: setInitialDriverData,
  [Types.GET_GEOFENCE_BY_TYPES]: getGeofenceByTypes,
  [Types.SET_GEOFENCE_BY_TYPES]: setGeofenceByTypes,
  [Types.GET_GEOFENCE_DETAIL]: getGeofenceDetail,
  [Types.SET_GEOFENCE_DETAIL]: setGeofenceDetail,
  [Types.SET_STATE_REDUX_REALTIME]: setStateReduxRealtime,
  [Types.SET_DEFAULT_REDUX_REALTIME]: setDefaultReduxRealtime,
  [Types.SET_DEFAULT_ICON_MARKER]: setDefaultIconMarker,
  [Types.SET_SHOW_VEHICLE_INFO_STATUS_REALTIME]:
    setShowVehicleInfoStatusRealtime,
  [Types.SET_SHOW_DASHBOARD]: setShowDashboard,
  [Types.SET_SHOW_CLUSTER]: setShowCluster,
  [Types.SET_STATE_MAP_CONTROL]: setStateMapControl,
  [Types.SET_ZOOM_CHANGE]: setZoomChange,
  [Types.SET_ICON_SIZE]: setIconSize,
  [Types.SET_Y]: setY,
  [Types.SET_OPERATION_CHART_VEHICLE]: setOperationChartVehicle,
  [Types.SET_OPERATION_CHART_DRIVER]: setOperationChartDriver,
});

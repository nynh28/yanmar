import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
import moment from "moment-timezone";
import { get, isEmpty, isEqual } from "lodash";
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getInitialVehicles: [],
  setInitialVehicles: ["InitialData"],

  getInformationMarker: ["vid", "callFrom"],
  getInformationMarkerSucc: ["information", "callFrom"],

  setFilterMapTractor: ['filter'],

  setActiveTab: ["activeTab"],
  setTempMapControl: ["stateMapControl"],
  setHideFooter: [],

  setStateReduxRealtime: ["objStateRudux"],

  setDefaultReduxRealtimeNew: [],
  setFocus: ["isFocus"],
  setDefaultZoom: ["zoomLevel"],
  setTailMarker: ["data"],
  setDisplayVehicle: ["listVehicles", "isFilter"],
  setFitBounds: ["isFitBounds"],
  setZoomPan: ["isZoomPan"],
  setDefaultCenter: ["lat", "lng"],

  getGeofenceByType: ["GeofenceTypeIds"],
  setGeofenceByType: ["data"],

  getGeofenceDetail: ["geofenceId"],
  setGeofenceDetail: ["data"],

  setTimeLast: ["time"],
  setListVideo: ["info", "index"],
  setValue: ["name", "value"],
  setIsShowModalVideo: ["bln"],
});

export const RealtimeNewTypes = Types;
export default Creators;
/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  initialVehiclesData: [],
  information: {},
  filterMapTractor: {},
  filterMapTractorStr: '',
  vehiclesLoading: true,
  hideOverlayPanel: false,
  hideFooter: false,
  displayVehicle: null, //list vid
  activeTabDashboard: "0",
  activeTabOverlay: "0",
  lastTime: null,
  stateMapControl: {
    legendEnabled: true,
    clusterEnabled: true,
    objectEnabled: false,
    fitObjectEnabled: false,
    mapType: "roadmap",
    geofencesEnabled: [],
    dashboardEnabled: false,
    licensePlateEnabled: false,
    nameGeofEnabled: false,
  },
  hideFooter: false,
  geofenceByTypes: [],
  defaultZoom: 5,
  isFitBounds: false,
  isZoomPan: false,
  isFocus: false,
  tailMarker: [],
  defaultCenter: { lat: 13.786377, lng: 100.608755 },
  timeLast: "",
  listVideo: null,
  // listVideo: [],
  // listVideo: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  listSteaming: [],
  isShowModalVideo: false,
  isFirstLoadDashboard: false,
  isLoadInfo: false,
  isFilterInteractiveDashboard: false,
  isFocusPanTo: {
    visible: false,
    location: { lat: 0, lng: 0 },
  },
  dashboardSummary: {
    dash_count_bar: {
      status: {
        0: {
          vid_list: [],
          count: 0,
        },
        1: {
          vid_list: [],
          count: 0,
        },
        2: {
          vid_list: [],
          count: 0,
        },
        3: {
          vid_list: [],
          count: 0,
        },
        4: {
          vid_list: [],
          count: 0,
        },
        5: {
          vid_list: [],
          count: 0,
        },
      },
    },
    dash_behaviour_bar: {
      status: {
        0: {
          vid_list: [],
          count: 0,
        },
        1: {
          vid_list: [],
          count: 0,
        },
        2: {
          vid_list: [],
          count: 0,
        },
        3: {
          vid_list: [],
          count: 0,
        },
        4: {
          vid_list: [],
          count: 0,
        },
        5: {
          vid_list: [],
          count: 0,
        },
        6: {
          vid_list: [],
          count: 0,
        },
        7: {
          vid_list: [],
          count: 0,
        },
        8: {
          vid_list: [],
          count: 0,
        },
      },
    },
    maintenance_status: {
      status: {
        0: {
          vid_list: [],
          count: 0,
        },
        1: {
          vid_list: [],
          count: 0,
        },
        2: {
          vid_list: [],
          count: 0,
        },
        3: {
          vid_list: [],
          count: 0,
        },
      },
    },
  },
});

/* ------------- Reducers ------------- */
export const getInitialVehicles = (state) => {
  return state.merge({ vehiclesLoading: true });
};
export const setInitialVehicles = (state, { InitialData }) => {
  let initialVehiclesData = JSON.parse(JSON.stringify(InitialData));
  return state.merge({
    vehiclesLoading: false,
    initialVehiclesData,
    lastTime: moment().format("DD/MM/YYYY HH:mm:ss"),
  });
};

// ----------- Set Display Vehicle -----------
// export const setDisplayVehicleFirst = (state, { value, lastList }) => {
//   let displayVehicleFirst = JSON.parse(JSON.stringify(state.displayVehicleFirst))
//   displayVehicleFirst.push(...value)
//   if (lastList) {
//     return state.merge({ displayVehicleFirst: [], displayVehicle: displayVehicleFirst })
//   } else {
//     return state.merge({ displayVehicleFirst })
//   }
// }
// ----------- Get Information -----------
export const setFilterMapTractor = (state, {filter}) => {
  // return state.merge({ information: {}, listVideo: null, isShowModalVideo: false })
    let a = ''
        Object.keys(filter).forEach(key => {
            if(filter[key] && filter[key] !=''){
              a+=`&${key}=${filter[key]}`
            }
        })
  return state.merge({filterMapTractor: filter, filterMapTractorStr: a});
  // return state.merge({ listVideo: null, isShowModalVideo: false })
};
export const getInformationMarker = (state) => {
  // return state.merge({ information: {}, listVideo: null, isShowModalVideo: false })
  return state.merge({});
  // return state.merge({ listVideo: null, isShowModalVideo: false })
};
export const getInformationMarkerSucc = (state, { information, callFrom }) => {
  let objSetState = { information };
  if (get(state, "information.info.vid") !== get(information, "info.vid")) {
    let mdvr = get(information, "['option.mdvr']");
    if (mdvr) {
      if (get(mdvr, "channel", []).length > 0)
        objSetState.listVideo = [
          get(mdvr, "channel", [])[0],
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
        ];
      else objSetState.listVideo = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
    } else {
      objSetState.listVideo = null;
    }
  }

  let lat = get(information, "gps.lat"),
    lng = get(information, "gps.lng");
  objSetState.defaultCenter = { lat, lng };
  let tailMarker = [...state.tailMarker];
  if (callFrom === "Marker") {
    // objSetState.isFocus = false
    if (get(state, "information.info.vid") !== get(information, "info.vid"))
      tailMarker = [];
    if (
      isEmpty(tailMarker) ||
      !isEqual(tailMarker[tailMarker.length - 1], { lat, lng })
    )
      tailMarker.push({ lat, lng });
    objSetState.tailMarker = tailMarker;
    objSetState.isShowModalVideo = false;
  } else if (callFrom === "Mqtt") {
    if (
      isEmpty(tailMarker) ||
      !isEqual(tailMarker[tailMarker.length - 1], { lat, lng })
    ) {
      tailMarker.push({ lat, lng });
      objSetState.tailMarker = tailMarker;
    }
  } else {
    if (get(state, "information.info.vid") !== get(information, "info.vid"))
      tailMarker = [];
    if (
      isEmpty(tailMarker) ||
      !isEqual(tailMarker[tailMarker.length - 1], { lat, lng })
    )
      tailMarker.push({ lat, lng });
    let stateMapControl = JSON.parse(JSON.stringify(state.stateMapControl));
    stateMapControl.fitObjectEnabled = true;
    let infoList = {
      isZoomPan: false,
      hideFooter: false,
      stateMapControl,
      tailMarker,
      isShowModalVideo: false,
    };
    objSetState = { ...objSetState, ...infoList };
  }
  objSetState.isLoadInfo = false
  // setTimeout(() => {
  return state.merge(objSetState);
  // }, 1000);
};

// ----------- Set Active Tab -----------
export const setActiveTab = (state, { activeTab }) => {
  return state.merge({ activeTab });
};
export const setTempMapControl = (state, { stateMapControl }) => {
  return state.merge({ stateMapControl });
};
export const setHideFooter = (state, { }) => {
  return state.merge({ hideFooter: !state.hideFooter });
};
// --------------------------------------------
export const setStateReduxRealtime = (state, { objStateRudux }) => {
  if (typeof objStateRudux === "object") return state.merge(objStateRudux);
  else return state;
};
export const setDefaultReduxRealtimeNew = () => {
  return INITIAL_STATE;
};
export const setFocus = (state, { isFocus }) => {
  return state.merge({ isFocus });
};
export const setDefaultZoom = (state, { zoomLevel }) => {
  return state.merge({ defaultZoom: zoomLevel });
};
export const setTailMarker = (state, { data }) => {
  return state.merge({ tailMarker: data });
};
export const setDisplayVehicle = (
  state,
  { listVehicles, isFilter = false }
) => {
  return state.merge({
    displayVehicle: listVehicles,
    isFitBounds: true,
    isFilterInteractiveDashboard: isFilter,
  });
};
export const setFitBounds = (state, { isFitBounds }) => {
  return state.merge({ isFitBounds });
};
export const setZoomPan = (state, { isZoomPan }) => {
  return state.merge({ isZoomPan });
};
export const setDefaultCenter = (state, { lat, lng }) => {
  return state.merge({ defaultCenter: { lat, lng } });
};

export const getGeofenceByType = (state) => {
  return state.merge({});
};
export const setGeofenceByType = (state, { data }) => {
  return state.merge({ geofenceByTypes: data });
};

export const getGeofenceDetail = (state) => {
  return state.merge({ geofenceDetail: null });
};
export const setGeofenceDetail = (state, { data }) => {
  return state.merge({ geofenceDetail: data });
};

export const setTimeLast = (state, { time }) => {
  return state.merge({ timeLast: time });
};

export const setListVideo = (state, { info, index }) => {
  // console.log(">> setListVideo <<")
  // console.log("info : ", info)
  // console.log("index : ", index)
  // console.log("state.isShowModalVideo : ", state.isShowModalVideo)

  // if (index === undefined) return state.merge({})
  // let _listVideo = JSON.parse(JSON.stringify(state.listVideo))

  // console.log("_listVideo : ", _listVideo)
  // if (index > -1) {
  //   _listVideo[index] = {}
  // }
  // else {
  //   let ind = _listVideo.findIndex((item) => isEmpty(item))
  //   _listVideo[ind] = info
  // }

  let _listVideo = JSON.parse(JSON.stringify(state.listVideo));
  if (state.isShowModalVideo) {
    // _listVideo.push(info)
    let idx = _listVideo.findIndex((item) => item.channel === info.channel);
    if (idx > -1) {
      _listVideo[idx] = {};
    } else {
      let index = _listVideo.findIndex((item) => isEmpty(item));
      _listVideo[index] = info;
    }
  } else {
    if (get(_listVideo, "[0].channel") === info.channel) _listVideo[0] = {};
    else _listVideo[0] = info;
  }

  // let channelCount = _listVideo.length
  // while (channelCount < 9) {
  //   _listVideo.push({})
  //   channelCount++
  // }

  // console.log("_listVideo : ", _listVideo)
  // console.log("_____________________________")
  return state.merge({ listVideo: _listVideo });
};

export const setValue = (state, { name, value }) => {
  return state.merge({ [name]: value });
};
export const setIsShowModalVideo = (state, { bln }) => {
  let obj = { isShowModalVideo: bln };
  let _listVideo = JSON.parse(JSON.stringify(state.listVideo));
  if (bln === false) {
    let idx = _listVideo.findIndex((item) => !isEmpty(item));
    if (idx > -1) {
      obj.listVideo = [_listVideo[idx], {}, {}, {}, {}, {}, {}, {}, {}];
    } else {
      obj.listVideo = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
    }
  }

  return state.merge(obj);
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_FILTER_MAP_TRACTOR]: setFilterMapTractor,

  //
  [Types.GET_INITIAL_VEHICLES]: getInitialVehicles,
  [Types.SET_INITIAL_VEHICLES]: setInitialVehicles,

  [Types.GET_INFORMATION_MARKER]: getInformationMarker,
  [Types.GET_INFORMATION_MARKER_SUCC]: getInformationMarkerSucc,

  [Types.SET_ACTIVE_TAB]: setActiveTab,
  [Types.SET_TEMP_MAP_CONTROL]: setTempMapControl,
  [Types.SET_HIDE_FOOTER]: setHideFooter,

  [Types.SET_STATE_REDUX_REALTIME]: setStateReduxRealtime,

  [Types.SET_DEFAULT_REDUX_REALTIME_NEW]: setDefaultReduxRealtimeNew,
  [Types.SET_FOCUS]: setFocus,
  [Types.SET_DEFAULT_ZOOM]: setDefaultZoom,
  [Types.SET_TAIL_MARKER]: setTailMarker,
  [Types.SET_DISPLAY_VEHICLE]: setDisplayVehicle,
  [Types.SET_FIT_BOUNDS]: setFitBounds,
  [Types.SET_ZOOM_PAN]: setZoomPan,
  [Types.SET_DEFAULT_CENTER]: setDefaultCenter,

  [Types.GET_GEOFENCE_BY_TYPE]: getGeofenceByType,
  [Types.SET_GEOFENCE_BY_TYPE]: setGeofenceByType,

  [Types.GET_GEOFENCE_DETAIL]: getGeofenceDetail,
  [Types.SET_GEOFENCE_DETAIL]: setGeofenceDetail,

  [Types.SET_TIME_LAST]: setTimeLast,
  [Types.SET_LIST_VIDEO]: setListVideo,
  [Types.SET_VALUE]: setValue,
  [Types.SET_IS_SHOW_MODAL_VIDEO]: setIsShowModalVideo,
});

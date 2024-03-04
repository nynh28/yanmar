import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
import { CostExplorer } from "aws-sdk/clients/all";
import { stat } from "fs";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  //   signup: ['email', 'password'],
  //   signupSuccess: ['data'],
  //   signupFailure: ['error'],

  //   step2Signup: ['email', 'userid'],
  //   step2SignupSuccess: ['data'],
  //   step2SignupFailure: ['error']

  setStyleSidebar: null,
  setLastIndexMenu: ["data"],
  setBackground: ["color"],

  setSidebar: ["data"],
  checkSetSidebar: ["data"],

  setBreadcrumbPath: ["data"],
  resetBreadcrumb: null,

  setLanguage: ["data"],

  getLanguage: ["data"],
  getLanguageSuc: ["data"],
  getLanguageFail: ["data"],

  setSidebarWidth: ["data"],
  statusSidebar: ["status"],
  setSidebarWidth: ["data"],

  getDataDictionary: ["language"],
  setDataDictionary: ["data"],
  failDictionary: null,

  searchLocation: ["name", "level"],
  searchLocationListSuccess: ["locationList"],

  clearSidebarCache: null,
  getLocation: ["code"],
  getLocationSuccess: ["location"],

  getImageUrl: ["attachCode"],
  setImageUrl: ["imageUrl"],

  setIsOpenDetail: [],
});

export const VersatileTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  //   signingUp: false,
  //   signupErrorMessage: null,

  //   step2SigningUp: false,
  //   step2SignupErrorMessage: null
  sidebarStyle: "pace-done",

  lastIndexMenu: 0,

  checkSetSidebar: null,
  sidebarArray: [
    {
      id: 1,
      name: "Realtime/Dashboard",
      icon: "fa fa-th-large",
      liActive: "active",
      ulCollapse: null,
      linkTo: "dashboard",
      subMenu: null,
    },
    {
      id: 2,
      name: "Myjob",
      icon: "fa fa-car",
      liActive: null,
      ulCollapse: "nav nav-second-level collapse",
      linkTo: "testscreen",
      subMenu: [
        {
          parentId: 2,
          name: "Job",
          icon: "fa fa-user",
          liActive: null,
          display: "none",
          linkTo: "testscreen",
        },
        {
          parentId: 2,
          name: "History Trip",
          icon: "fa fa-user-circle",
          liActive: null,
          display: "none",
          linkTo: "testscreen2",
        },
      ],
    },
    {
      id: 3,
      name: "Report",
      icon: "fa fa-cogs",
      liActive: null,
      ulCollapse: null,
      linkTo: "#",
      subMenu: null,
    },
    {
      id: 4,
      name: "My Driver",
      icon: "fa fa-cogs",
      liActive: null,
      ulCollapse: null,
      linkTo: "driver",
      subMenu: null,
    },
    {
      id: 6,
      name: "My Vehicle",
      icon: "fa fa-history",
      liActive: null,
      ulCollapse: "nav nav-second-level collapse",
      linkTo: "testscreen3",
      subMenu: [
        {
          parentId: 5,
          name: "Vehicle",
          icon: "fa fa-car",
          liActive: null,
          display: "none",
          linkTo: "vehicle",
        },
        {
          parentId: 5,
          name: "Message",
          icon: "fa fa-user-circle",
          liActive: null,
          display: "none",
          linkTo: "fleet",
        },
        {
          parentId: 5,
          name: "Maintenance",
          icon: "fa fa-cogs",
          liActive: null,
          display: "none",
          linkTo: "driver",
        },
        {
          parentId: 5,
          name: "CCTV",
          icon: "fa fa-car",
          liActive: null,
          display: "none",
          linkTo: "vehicle",
        },
      ],
    },
    {
      id: 7,
      name: "My Way",
      icon: "fa fa-history",
      liActive: null,
      ulCollapse: "nav nav-second-level collapse",
      linkTo: "testscreen3",
      subMenu: [
        {
          parentId: 7,
          name: "Route",
          icon: "fa fa-car",
          liActive: null,
          display: "none",
          linkTo: "customer",
        },
        {
          parentId: 7,
          name: "Geofence",
          icon: "fa fa-user-circle",
          liActive: null,
          display: "none",
          linkTo: "fleet",
        },
        {
          parentId: 7,
          name: "Geofence Group",
          icon: "fa fa-cogs",
          liActive: null,
          display: "none",
          linkTo: "driver",
        },
      ],
    },
    {
      id: 8,
      name: "My Family",
      icon: "fa fa-history",
      liActive: null,
      ulCollapse: "nav nav-second-level collapse",
      linkTo: "testscreen3",
      subMenu: [
        {
          parentId: 7,
          name: "Dealer",
          icon: "fa fa-car",
          liActive: null,
          display: "none",
          linkTo: "dealer",
        },
        {
          parentId: 7,
          name: "Customer",
          icon: "fa fa-user-circle",
          liActive: null,
          display: "none",
          linkTo: "customer",
        },
        {
          parentId: 7,
          name: "Fleet",
          icon: "fa fa-cogs",
          liActive: null,
          display: "none",
          linkTo: "fleet",
        },
        {
          parentId: 7,
          name: "Promotion",
          icon: "fa fa-cogs",
          liActive: null,
          display: "none",
          linkTo: "promotion",
        },
      ],
    },
    {
      id: 9,
      name: "My Setting",
      icon: "fa fa-cogs",
      liActive: null,
      ulCollapse: "nav nav-second-level collapse",
      linkTo: "testscreen3",
      subMenu: [
        {
          parentId: 9,
          name: "Main Setting",
          icon: "fa fa-car",
          liActive: null,
          display: "none",
          linkTo: "customer",
        },
        {
          parentId: 9,
          name: "User & Role Setting",
          icon: "fa fa-user-circle",
          liActive: null,
          display: "none",
          linkTo: "fleet",
        },
        {
          parentId: 9,
          name: "Alert",
          icon: "fa fa-cogs",
          liActive: null,
          display: "none",
          linkTo: "driver",
        },
        {
          parentId: 9,
          name: "Icon",
          icon: "fa fa-cogs",
          liActive: null,
          display: "none",
          linkTo: "driver",
        },
      ],
    },
  ],

  color: null,

  language: "th",
  request_getLanguage: null,
  data_getLanguage: null,
  fail_getLanguage: null,

  breadcrumb: null,

  sidebar_width: null,
  status_sidebar: "show",
  DataDictionary: {},
  request_DataDictionary: null,
  locationList: [],
  location: null,

  isOpenDetail: false,
});

/* ------------- Reducers ------------- */

export const statusSidebar = (state, { status }) =>
  state.merge({ status_sidebar: status });

export const clearSidebarCache = (state) =>
  state.merge({
    sidebarArray: null,
    sidebar_width: null,
    checkSetSidebar: null,
    status_sidebar: "show",
  });
export const setSidebarWidth = (state, { data }) => {
  return state.merge({ sidebar_width: data });
};

export const getLanguage = (state) =>
  state.merge({ request_getLanguage: true });
export const getLanguageSuc = (state, { data }) =>
  state.merge({
    request_getLanguage: false,
    fail_getLanguage: null,
    data_getLanguage: data,
  });
export const getLanguageFail = (state, { data }) =>
  state.merge({ request_getLanguage: false, fail_getLanguage: data });

export const setLanguage = (state, { data }) => {
  // console.log("setLanguage", data)
  return state.merge({ language: data });
};

export const getDataDictionary = (state, { language }) => {
  return state.merge({ request_DataDictionary: true });
};
export const setDataDictionary = (state, { data }) => {
  return state.merge({ DataDictionary: data, request_DataDictionary: false });
};
export const failDictionary = (state) =>
  state.merge({ request_DataDictionary: false });

export const resetBreadcrumb = (state) => state.merge({ breadcrumb: null });

export const setBreadcrumbPath = (state, { data }) => {
  let tmp = JSON.parse(JSON.stringify(data));
  return state.merge({ breadcrumb: tmp });
};

export const checkSetSidebar = (state, { data }) => {
  return state.merge({ checkSetSidebar: data });
};

export const setSidebar = (state, { data }) => {
  return state.merge({ sidebarArray: data, checkSetSidebar: 0 });
};

export const setBackground = (state, { color }) => {
  return { color: color };
};

export const setLastIndexMenu = (state, { data }) =>
  state.merge({ lastIndexMenu: data });

export const setStyleSidebar = (state) => {
  let tmp = state.sidebarStyle;
  if (tmp == "pace-done") {
    tmp = "pace-done mini-navbar";
  } else if (tmp == "pace-done mini-navbar") {
    tmp = "pace-done";
  }
  return state.merge({ sidebarStyle: tmp });
};

export const searchLocation = (state) => {
  return state.merge({});
};
export const searchLocationListSuccess = (state, { locationList }) => {
  return state.merge({ locationList });
};

export const getLocation = (state) => {
  return state.merge({});
};
export const getLocationSuccess = (state, { location }) => {
  return state.merge({ location });
};

// export const signup = (state) => state.merge({ signingUp: true, signupErrorMessage: null })

// export const signupSuccess = (state, params) => {
//   let { data } = params
//   return state.merge({ signingUp: false, signupErrorMessage: null })
// }

// export const signupFailure = (state, params) => {
//   let { error } = params
//   return state.merge({ signupErrorMessage: error, signingUp: false })
// }

export const getImageUrl = (state, {}) => {
  return state.merge({});
};
export const setImageUrl = (state, { imageUrl }) => {
  return state.merge({ imageUrl });
};

export const setIsOpenDetail = (state, {}) => {
  return state.merge({ isOpenDetail: !state.isOpenDetail });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_STYLE_SIDEBAR]: setStyleSidebar,
  [Types.SET_LAST_INDEX_MENU]: setLastIndexMenu,
  [Types.SET_BACKGROUND]: setBackground,

  [Types.SET_SIDEBAR]: setSidebar,
  [Types.CHECK_SET_SIDEBAR]: checkSetSidebar,
  [Types.SET_BREADCRUMB_PATH]: setBreadcrumbPath,
  [Types.RESET_BREADCRUMB]: resetBreadcrumb,

  [Types.SET_LANGUAGE]: setLanguage,

  [Types.GET_LANGUAGE]: getLanguage,
  [Types.GET_LANGUAGE_SUC]: getLanguageSuc,
  [Types.GET_LANGUAGE_FAIL]: getLanguageFail,

  [Types.SET_SIDEBAR_WIDTH]: setSidebarWidth,
  [Types.STATUS_SIDEBAR]: statusSidebar,

  [Types.GET_DATA_DICTIONARY]: getDataDictionary,
  [Types.SET_DATA_DICTIONARY]: setDataDictionary,
  [Types.FAIL_DICTIONARY]: failDictionary,
  //   [Types.SIGNUP_FAILURE]: signupFailure,
  //   [Types.SIGNUP_FAILURE]: signupFailure,

  [Types.CLEAR_SIDEBAR_CACHE]: clearSidebarCache,
  [Types.SEARCH_LOCATION]: searchLocation,
  [Types.SEARCH_LOCATION_LIST_SUCCESS]: searchLocationListSuccess,
  [Types.GET_LOCATION]: getLocation,
  [Types.GET_LOCATION_SUCCESS]: getLocationSuccess,

  [Types.GET_IMAGE_URL]: getImageUrl,
  [Types.SET_IMAGE_URL]: setImageUrl,

  [Types.SET_IS_OPEN_DETAIL]: setIsOpenDetail,
});

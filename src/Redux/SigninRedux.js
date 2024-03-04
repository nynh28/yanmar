import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
import Cookies from "js-cookie";
import {
  ENDPOINT__BASE_TOPIC_EVENT,
  ENDPOINT__BASE_TOPIC_REALTIME,
} from "../Config/app-config";
import dxTabPanel from "devextreme/ui/tab_panel";
import { data } from "jquery";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  signin: ["username", "password", "remember"],
  signinTractor: ["username", "password", "remember"],
  signinSuccess: ["dataLogin", "platformId"],
  signinTractorSuccess: ["dataLogin", "platformId"],
  signout: [],
  signoutTractor: [],
  signoutSuccess: [],
  signoutTractorSuccess: [],
  checkAgreement: [],
  checkAgreementSuccess: ["isAgreement"],
  getAgreement: [],
  getAgreementSuccess: ["textAgreement"],
  putAgreement: ["agree"],
  getProfileAndMenu: [],
  getProfileAndMenuSuccess: ["menuUser", "profileUser"],
  refresh: [],
  refreshTractor: [],
  refreshSuccess: ["data"],
  refreshTractorSuccess: ["data"],

  signinFail: ["data"],
  setLoading: [],
  setTabs: ["tabsRealtime"],
  forceChangePassword: ["dataForce", "username"],
  setStateRedux: ["name", "value"],
  addRemember: ["username"],

  getPasswordPolicyAuth: [],
  getPasswordPolicyAuthSuccess: ["passwordPolicyAuth"],
  setCustomerByUserId: ["data"],
  setConfig: ["data"],
  setConfigTracktor: ["data"],
});

export const SigninTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  messageError: null,
  stateSignin: false,

  tabsRealtime: "tabsTruck",

  topicEvent: null,
  topicRealtime: null,

  dataLogin: {},
  profileUser: {
    userId: 0,
    userLevelId: 0,
    displayName: "",
    avatarUrl: "",
    mobile: "",
    email: "",
    lineId: "",
    expiredDate: "",
    lastChangePassword: "",
    defaultLanguageId: 0,
    language: "",
    redis_key: "",
    userTokenInfo: {
      accessToken: "",
      expiresIn: 0,
      id_token: "",
      refreshToken: "",
      tokenType: "",
    },
    userActions: [
      {
        actionId: 0,
        actionName: "",
        actionLevelMax: 0,
      },
    ],
  },
  menuUser: {},
  actionUser: null,
  isAgreement: false,
  textAgreement: null,
  header: {},
  dataForce: null,
  username: "",
  lstRemember: [],
  passwordPolicyAuth: null,
  custIdByUser: [],
  configtest: {},
  configTracktor: {
    chart_colors: {
      parking: "#ff3b30",
      driving: "#5CE648",
      idling: "#FFE600",
      overspeed: "#6F25E5",
      offline: "#55c1d9",
      speed: "#5CE648",
      brake: "#FF5733",
      rpm: "#0000FF",
      fuel: "#F1C40F",
      dtc: "#FF0000",
      clutch: "#008080",
      exhaust: "#800000",
      temperature: "#00FFFF",
      pedal: "#005eb8",
      temp_limit: "#6F25E5",
      temp_hot: "#EB5757",
      temp_cool: "#2D9CDB",
      speed_limit: "#ff0000",
      rpm_zone: {
        red_zone: "#ff5252",
        green_zone: "#78ff52",
      },
      main_battery: "#e10000",
      backup_battery: "#ff7c3e",
      option_temperature: [
        "#ff0000",
        "#0218fe",
        "#eb04ff",
        "#fc7a00",
        "#00ecff",
      ],
    },
  },
});
/* ------------- Reducers ------------- */

export const signin = (state) => {
  return state.merge({ messageError: null, loading: true });
  // return state.merge({ loading:true })
};
export const signinTractor = (state) => {
  return state.merge({ messageError: null, loading: true });
  // return state.merge({ loading:true })
};
export const checkAgreement = (state, {}) => {
  return state.merge({});
};
export const getAgreement = (state, {}) => {
  return state.merge({ loading: false });
};
export const putAgreement = (state, {}) => {
  return state.merge({ loading: true });
};
export const getProfileAndMenu = (state, {}) => {
  return state.merge({});
};
export const signout = (state) => {
  return state.merge({});
};
export const signoutTractor = (state) => {
  return state.merge({});
};
export const refresh = (state) => {
  return state.merge({});
};
export const refreshTractor = (state) => {
  return state.merge({});
};

export const signinTractorSuccess = (state, { dataLogin }) => {
  return state.merge({
    dataLogin,
    stateSignin: true,
    tabsRealtime: "tabsTruck",
    topicEvent: ENDPOINT__BASE_TOPIC_EVENT + dataLogin.user_id,
    topicRealtime: ENDPOINT__BASE_TOPIC_REALTIME + dataLogin.user_id,
    header: {
      idToken: dataLogin.user_token_info.id_token,
      redisKey: dataLogin.redis_key,
    },
    menuUser: dataLogin.user_menu,
    profileUser: dataLogin.user_profile,
  });
};

export const signinSuccess = (state, { dataLogin }) => {
  return state.merge({
    dataLogin,
    stateSignin: true,
    tabsRealtime: "tabsTruck",
    topicEvent: ENDPOINT__BASE_TOPIC_EVENT + dataLogin.userId,
    topicRealtime: ENDPOINT__BASE_TOPIC_REALTIME + dataLogin.userId,
    header: {
      idToken: dataLogin.userTokenInfo.idToken,
      redisKey: dataLogin.redisKey,
    },
  });
};
export const setCustomerByUserId = (state, { data }) => {
  return state.merge({ custIdByUser: data });
};

export const checkAgreementSuccess = (state, { isAgreement }) => {
  return state.merge({ isAgreement });
};
export const getAgreementSuccess = (state, { textAgreement }) => {
  return state.merge({ textAgreement });
};
export const getProfileAndMenuSuccess = (state, { menuUser, profileUser }) => {
  return state.merge({
    menuUser,
    profileUser,
    loading: false,
  });
};
export const signoutSuccess = (state) => {
  return state.merge({});
};

export const signoutTractorSuccess = (state) => {
  return state.merge({});
};

export const refreshSuccess = (state, { data }) => {
  let dataLogin = JSON.parse(JSON.stringify(state.dataLogin));
  let header = JSON.parse(JSON.stringify(state.header));
  dataLogin.userTokenInfo.accessToken = data.accessToken;
  dataLogin.userTokenInfo.idToken = data.idToken;
  header.idToken = data.idToken;
  return state.merge({ dataLogin, header });
};
export const refreshTractorSuccess = (state, { data }) => {
  let dataLogin = JSON.parse(JSON.stringify(state.dataLogin));
  let header = JSON.parse(JSON.stringify(state.header));
  dataLogin.user_token_info.access_token = data.access_token;
  dataLogin.user_token_info.id_token = data.id_token;
  header.id_token = data.id_token;
  return state.merge({ dataLogin, header });
};

export const signinFail = (state, { data }) => {
  return state.merge({ loading: false, messageError: data });
};

export const setLoading = (state, {}) =>
  state.merge({ loading: false, messageError: null });
export const setTabs = (state, { tabsRealtime }) =>
  state.merge({ tabsRealtime });

export const forceChangePassword = (state, { dataForce, username }) => {
  return state.merge({ dataForce, username });
};

export const setStateRedux = (state, { name, value }) => {
  return state.merge({ [name]: value });
};

export const addRemember = (state, { username }) => {
  let newL = JSON.stringify(state.lstRemember);
  let lstRemember = JSON.parse(newL);
  // lstRemember = []

  if (!lstRemember) lstRemember = [];

  if (lstRemember.find((item) => item.value === username.value) === undefined)
    lstRemember.push(username);
  return state.merge({ lstRemember });
};

export const getPasswordPolicyAuth = (state, {}) => {
  return state.merge({});
};
export const getPasswordPolicyAuthSuccess = (state, { passwordPolicyAuth }) => {
  return state.merge({ passwordPolicyAuth });
};

export const setConfig = (state, { data }) => {
  // return state.merge({ config:data });
  return state.merge({
    config: data,
  });
};

export const setConfigTracktor = (state, { data }) => {
  return;
  console.log(data);
  return state.merge({
    configTracktor: {
      chart_colors: {
        parking: "#ff3b30",
        driving: "#5CE648",
        idling: "#FFE600",
        overspeed: "#6F25E5",
        offline: "#55c1d9",
        speed: "#5CE648",
        brake: "#FF5733",
        rpm: "#0000FF",
        fuel: "#F1C40F",
        dtc: "#FF0000",
        clutch: "#008080",
        exhaust: "#800000",
        temperature: "#00FFFF",
        pedal: "#005eb8",
        temp_limit: "#6F25E5",
        temp_hot: "#EB5757",
        temp_cool: "#2D9CDB",
        speed_limit: "#ff0000",
        rpm_zone: {
          red_zone: "#ff5252",
          green_zone: "#78ff52",
        },
        main_battery: "#e10000",
        backup_battery: "#ff7c3e",
        option_temperature: [
          "#ff0000",
          "#0218fe",
          "#eb04ff",
          "#fc7a00",
          "#00ecff",
        ],
      },
    },
  });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGNIN]: signin,
  [Types.SIGNIN_TRACTOR]: signinTractor,
  [Types.SIGNOUT]: signout,
  [Types.SIGNOUT_TRACTOR]: signoutTractor,
  [Types.CHECK_AGREEMENT]: checkAgreement,
  [Types.GET_AGREEMENT]: getAgreement,
  [Types.PUT_AGREEMENT]: putAgreement,
  [Types.GET_PROFILE_AND_MENU]: getProfileAndMenu,
  [Types.REFRESH]: refresh,
  [Types.REFRESH_TRACTOR]: refreshTractor,

  [Types.SIGNIN_SUCCESS]: signinSuccess,
  [Types.SIGNIN_TRACTOR_SUCCESS]: signinTractorSuccess,
  [Types.CHECK_AGREEMENT_SUCCESS]: checkAgreementSuccess,
  [Types.GET_AGREEMENT_SUCCESS]: getAgreementSuccess,
  [Types.GET_PROFILE_AND_MENU_SUCCESS]: getProfileAndMenuSuccess,
  [Types.SIGNOUT_SUCCESS]: signoutSuccess,
  [Types.SIGNOUT_TRACTOR_SUCCESS]: signoutTractorSuccess,
  [Types.REFRESH_SUCCESS]: refreshSuccess,
  [Types.REFRESH_TRACTOR_SUCCESS]: refreshTractorSuccess,

  [Types.SIGNIN_FAIL]: signinFail,

  [Types.SET_LOADING]: setLoading,
  [Types.SET_TABS]: setTabs,
  [Types.FORCE_CHANGE_PASSWORD]: forceChangePassword,
  [Types.SET_STATE_REDUX]: setStateRedux,
  [Types.ADD_REMEMBER]: addRemember,

  [Types.GET_PASSWORD_POLICY_AUTH]: getPasswordPolicyAuth,
  [Types.GET_PASSWORD_POLICY_AUTH_SUCCESS]: getPasswordPolicyAuthSuccess,
  [Types.SET_CUSTOMER_BY_USER_ID]: setCustomerByUserId,
  [Types.SET_CONFIG]: setConfig,
  [Types.SET_CONFIG_TRACKTOR]: setConfigTracktor,
});

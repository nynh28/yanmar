import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
import DataGrid, { Column } from "devextreme-react/data-grid";
import React from "react";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getRoleGroup: ["getData"],
  getRoleGroupFail: ["error"],
  getRoleGroupSuccess: ["role"],

  addRoleGroup: ["businessPartnerId", "role", "groupType"],
  addRoleGroupFail: ["error"],
  addRoleGroupSuccess: [],

  addUserRoleGroup: ["username", "roleName", "groupType"],
  addUserRoleGroupFail: ["error"],
  addUserRoleGroupSuccess: [],

  removeUserRoleGroup: ["username", "roleName", "groupType"],
  removeUserRoleGroupFail: ["error"],
  removeUserRoleGroupSuccess: [],

  getUser: ["getData"],
  getUserFail: ["error"],
  getUserSuccess: ["user"],

  getUserGroup: ["getData"],
  getUserGroupFail: ["error"],
  getUserGroupSuccess: ["userGroup"],

  addUser: ["getData"],
  addUserFail: ["error"],
  addUserSuccess: [],

  setInformationData: ["data"],
  setParam: ["value"],

  setSearch: ["value"],

  // getMatchUserGroup: ['getUser', 'getUserGroup']
});

export const UserSettingTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  loadRole: false,
  loadUser: false,
  loadUserGroup: false,
  title: null,
  success: null,
  error: null,
  status: null,
  count: 0,
  role: [{ roleName: "" }],
  user: {
    user: [
      {
        username: null,
        fullName: null,
        aliasName: null,
        email: null,
      },
    ],
  },
  userGroup: {
    userGroup: [{ username: "" }],
  },
  matchUser: [
    {
      username: null,
    },
  ],
  data_setInformationData: null,
  params: "",

  userData: [],
});

/* ------------- Reducers ------------- */

export const setInformationData = (state, { data }) => {
  let tmp = JSON.parse(JSON.stringify(data));
  return state.merge({ data_setInformationData: tmp });
};

export const getRoleGroup = (state, { getData }) => {
  return state.merge({ loading: true, loadRole: true });
};

export const getRoleGroupSuccess = (state, { role }) => {
  return state.merge({ loading: false, loadRole: false, count: +1, role });
};

export const getRoleGroupFail = (state, { error }) => {
  return state.merge({ loading: false, loadRole: false, error });
};

export const addRoleGroup = (state, { businessPartnerId, role, groupType }) => {
  return state.merge({ loading: true });
};

export const addRoleGroupSuccess = (state) => {
  return state.merge({ loading: false });
};

export const addRoleGroupFail = (state, { error }) => {
  return state.merge({ loading: false, error });
};

export const addUserRoleGroup = (state, { username, roleName, groupType }) => {
  return state.merge({ loading: true });
};

export const addUserRoleGroupSuccess = (state) => {
  return state.merge({ loading: false });
};

export const addUserRoleGroupFail = (state, { error }) => {
  return state.merge({ loading: false, error });
};

export const removeUserRoleGroup = (
  state,
  { username, roleName, groupType }
) => {
  return state.merge({ loading: true });
};

export const removeUserRoleGroupSuccess = (state) => {
  return state.merge({ loading: false });
};

export const removeUserRoleGroupFail = (state, { error }) => {
  return state.merge({ loading: false, error });
};

export const getUser = (state, { getData }) => {
  return state.merge({ loading: true, loadUser: true });
};

export const getUserSuccess = (state, user) => {
  return state.merge({ loading: false, loadUser: false, user });
};

export const getUserFail = (state, { error }) => {
  return state.merge({ loading: false, loadUser: false, error });
};

export const getUserGroup = (state, { getData }) => {
  return state.merge({ loading: true, loadUserGroup: true });
};

export const getUserGroupSuccess = (state, { userGroup }) => {
  return state.merge({
    loading: false,
    loadUserGroup: false,
    success: "userGroup",
    userGroup: { userGroup: userGroup },
  });
};

export const getUserGroupFail = (state, { error }) => {
  return state.merge({ loading: false, loadUserGroup: false, error });
};

export const addUser = (state, { getData }) => {
  return state.merge({ loading: true });
};

export const addUserSuccess = (state) => {
  return state.merge({ loading: false });
};

export const addUserFail = (state, { error }) => {
  return state.merge({ loading: false, error });
};
export const setParam = (state, { value }) => {
  return state.merge({ params: value });
};

export const setSearch = (state, { value }) => {
  state.merge({ userData: value });
};
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_ROLE_GROUP]: getRoleGroup,
  [Types.GET_ROLE_GROUP_FAIL]: getRoleGroupFail,
  [Types.GET_ROLE_GROUP_SUCCESS]: getRoleGroupSuccess,

  [Types.ADD_ROLE_GROUP]: addRoleGroup,
  [Types.ADD_ROLE_GROUP_FAIL]: addRoleGroupFail,
  [Types.ADD_ROLE_GROUP_SUCCESS]: addRoleGroupSuccess,

  [Types.ADD_USER_ROLE_GROUP]: addUserRoleGroup,
  [Types.ADD_USER_ROLE_GROUP_FAIL]: addUserRoleGroupFail,
  [Types.ADD_USER_ROLE_GROUP_SUCCESS]: addUserRoleGroupSuccess,

  [Types.REMOVE_USER_ROLE_GROUP]: removeUserRoleGroup,
  [Types.REMOVE_USER_ROLE_GROUP_FAIL]: removeUserRoleGroupFail,
  [Types.REMOVE_USER_ROLE_GROUP_SUCCESS]: removeUserRoleGroupSuccess,

  [Types.GET_USER]: getUser,
  [Types.GET_USER_FAIL]: getUserFail,
  [Types.GET_USER_SUCCESS]: getUserSuccess,

  [Types.GET_USER_GROUP]: getUserGroup,
  [Types.GET_USER_GROUP_FAIL]: getUserGroupFail,
  [Types.GET_USER_GROUP_SUCCESS]: getUserGroupSuccess,

  [Types.ADD_USER]: addUser,
  [Types.ADD_USER_FAIL]: addUserFail,
  [Types.ADD_USER_SUCCESS]: addUserSuccess,

  [Types.SET_INFORMATION_DATA]: setInformationData,
  [Types.SET_PARAM]: setParam,
  [Types.SET_SEARCH]: setSearch,
});

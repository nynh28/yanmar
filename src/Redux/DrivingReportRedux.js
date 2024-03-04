import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getCustDrivings: ["data"],

  getDailyReports: ["obj"],
  getDailyReportsSuccess: ["data"],
  getDailyReportsFailure: null,

  setDailyReports: null,
});

export const DrivingReportTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  custDriving: null,
  dailyData: [],
  startDateTime: "",
  endDateTime: ""
});

/* ------------- Reducers ------------- */

export const getCustDrivings = (state, { data }) => {
  return state.merge({ custDriving: data });
};

export const getDailyReportsSuccess = (state, { data }) => {
  let dailyData = JSON.parse(JSON.stringify(state.dailyData));
  dailyData.push(data);
  return state.merge({ dailyData });
};

export const getDailyReportsFailure = (state) => {
  return state.merge({ dailyData: [] });
};

export const setDailyReports = (state) => {
  return state.merge({ dailyData: [] });
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_CUST_DRIVINGS]: getCustDrivings,

  [Types.GET_DAILY_REPORTS_SUCCESS]: getDailyReportsSuccess,
  [Types.GET_DAILY_REPORTS_FAILURE]: getDailyReportsFailure,

  [Types.SET_DAILY_REPORTS]: setDailyReports,
});

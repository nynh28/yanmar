import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getVehiclesMulti: ["data"],
  getVehicles: ["user_id", "cust_id", "fleet_id"],
  setVehicles: ["data"],
  setVehiclesOfOtherReport: ["data"],
  getReportMenu: ["user_id"],
  setReportMenu: ["data"],
  getFleet: ["user_id"],
  setFleet: ["data"],
  setFleetListMulti: ["FleetListMulti"],
  getCustomerOtherReport: ["user_id"],
  setCustomerOtherReport: ["data"],
  setReportSelected: ["reportId"],
  setCustomerSelected: ["customerId"],
  setVehicleSelected: ["vehicles"],
  setFleetSelected: ["fleetId"],
  setFleetMulti: ["fleetMulti"],
  setDateRang: ["dateStart", "dateEnd"],
  setOverTime: ["integer"],
  getDrivingMaster: ["body"],
  setDrivingMaster: ["data"],
  getDriving: ["body"],
  setDriving: ["data"],

  getInstall: ["data"],
  setInstall: ["infoInstall"],

  getMasterData: ["body", "url"],
  setMasterData: ["data"],
  setMasterDataTemp: ["data"],
  getSummaryData: ["body", "url"],
  setSummaryData: ["data"],
  getDetailData: ["body", "url"],
  setDetailData: ["data"],
  setDetailSelected: ["vid", "headerDetail", "group"],
  setPercent: ["percent"],
  setDataSummary: ["data"],

  setStateReduxOtherReport: ["objState"],
  setDefaultReduxOtherReport: [],

  setValueOtherReport: ["name", "value"],
  setStateOtherReport: ["object"],
});

export const OtherReportTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  vehicles: [],
  vehiclesData: [],
  reportSelected: "101",
  reportName: "101 - รายงานการใช้งานรถขุด",
  vehicleSelected: [],
  customerSelected: "",
  fleetSelected: "",
  dateStart: "",
  dateEnd: "",
  overtime: 0,
  // reportMenu: [],
  reportMenu: [
    {
      key: "101",
      value: "101 - รายงานการใช้งานรถขุด",
    },
    {
      key: "102",
      value: "102 - รายงานการเข้า/ออกพื้นที่จีโอเฟนซ์",
    },
  ],
  fleets: [],
  customers: [],
  // reportNameList: [],
  reportNameList: [
    {
      key: "101",
      value: "101 - รายงานการใช้งานรถขุด",
    },
    {
      key: "102",
      value: "102 - รายงานการเข้า/ออกพื้นที่จีโอเฟนซ์",
    },
  ],
  infoInstall: [],

  //#region Set Report Data
  masterData: [],
  summaryData: [],
  detailData: [],
  DataSummary: [],
  DataSummaryTemp: [],

  masterDataTemp: null,
  detailSelected: "",
  loadDetailStatus: false,

  //#region Percent loading
  totalData: 0,
  success: 1,
  percent: 0,
  headerDetail: {},
  group: false,
  fleetMulti: [],
  FleetListMulti: [],
  isLoadingReport: false,
  reportDealerData: [],
  dealerData: [],
  selectDealer: [],
  currentValue: "",
  modelList: [],
  chassisNoList: [],
  engineNoList: [],
  byModelCode: [],
  showName: "รุ่นรถ",
  //#endregion
});

/* ------------- Reducers ------------- */
export const setValueOtherReport = (state, { name, value }) => {
  return state.merge({ [name]: value });
};

export const getInstall = (state, {}) => {
  return state.merge({});
};
export const setInstall = (state, { infoInstall }) => {
  return state.merge({ infoInstall });
};

export const getVehiclesMulti = (state, {}) => {
  return state.merge({ isLoadingReport: true });
};
export const getVehicles = (state, {}) => {
  return state.merge({});
};
export const setVehicles = (state, { data }) => {
  return state.merge({ vehicles: data });
};
export const setVehiclesOfOtherReport = (state, { data }) => {
  return state.merge({ vehiclesData: data, isLoadingReport: false });
};
export const setReportSelected = (state, { reportId }) => {
  console.log("setReportSelected:  ", reportId);
  console.log("reportNameList:  ", state.reportNameList);
  let reportName = "";
  let obj = state.reportNameList.find(
    (x) => parseInt(x.key) == parseInt(reportId)
  );
  if (obj !== undefined) reportName = obj.value;

  return state.merge({ reportSelected: reportId, reportName });
};
export const setCustomerSelected = (state, { customerId }) => {
  return state.merge({ customerSelected: customerId });
};
export const setVehicleSelected = (state, { vehicles }) => {
  return state.merge({ vehicleSelected: vehicles });
};
export const setFleetSelected = (state, { fleetId }) => {
  return state.merge({ fleetSelected: fleetId });
};
export const setFleetMulti = (state, { fleetMulti }) => {
  return state.merge({ fleetMulti });
};
export const setFleetListMulti = (state, { FleetListMulti }) => {
  return state.merge({ FleetListMulti });
};

export const setDateRang = (state, { dateStart, dateEnd }) => {
  return state.merge({ dateStart, dateEnd });
};

export const getReportMenu = (state, {}) => {
  return state.merge({});
};
export const setReportMenu = (state, { data }) => {
  let reportNameList = [];
  for (let index in data) {
    reportNameList.push(...data[index].items);
  }
  return state.merge({ reportMenu: data, reportNameList });
};

export const getFleet = (state, {}) => {
  return state.merge({});
};
export const setFleet = (state, { data }) => {
  return state.merge({ fleets: data });
};
export const getCustomerOtherReport = (state, {}) => {
  return state.merge({});
};
export const setCustomerOtherReport = (state, { data }) => {
  return state.merge({ customers: data });
};

// export const getDrivingMaster = (state, { }) => { return state.merge({}) }
// export const setDrivingMaster = (state, { data }) => { return state.merge({ drivingMasterData: data }) }

// export const getDriving = (state, { }) => { return state.merge({}) }
// export const setDriving = (state, { data }) => { return state.merge({ drivingData: data }) }

export const getMasterData = (state, {}) => {
  return state.merge({
    percent: 0,
    totalData: 0,
    success: 1,
    DataSummary: [],
    DataSummaryTemp: [],
  });
};
export const setMasterData = (state, { data }) => {
  return state.merge({
    masterData: data,
    totalData: data.length,
    DataSummary: data,
  });
};
export const setMasterDataTemp = (state, { data }) => {
  return state.merge({ masterDataTemp: data, DataSummaryTemp: [] });
};
export const setDataSummary = (state, { data }) => {
  return state.merge({ DataSummary: data, DataSummaryTemp: data });
};

export const getSummaryData = (state, {}) => {
  return state.merge({});
};
export const setSummaryData = (state, { data }) => {
  let _DataSummary = JSON.parse(JSON.stringify(state.DataSummaryTemp));
  _DataSummary.push(...data);

  let total = parseInt(state.totalData);
  let success = parseInt(state.success);
  let percent = parseInt((success / total) * 100);

  return state.merge({
    summaryData: data,
    success: success + 1,
    percent: percent,
    DataSummaryTemp: _DataSummary,
    // masterData: _DataSummary
  });
};

export const getDetailData = (state, {}) => {
  return state.merge({ loadDetailStatus: true });
};
export const setDetailData = (state, { data }) => {
  return state.merge({ detailData: data, loadDetailStatus: false });
};

export const setDetailSelected = (state, { vid, headerDetail, group }) => {
  return state.merge({ detailSelected: vid, headerDetail, group });
};
export const setPercent = (state, { percent }) => {
  return state.merge({ percent: percent });
};
export const setOverTime = (state, { integer }) => {
  return state.merge({ overtime: integer });
};
//#endregion

export const setStateReduxOtherReport = (state, { objState }) => {
  return state.merge(objState);
};

export const setDefaultReduxOtherReport = (state, {}) => {
  console.log(INITIAL_STATE, "2");
  return INITIAL_STATE;
};

export const setStateOtherReport = (state, { object }) => {
  console.log(object);
  return state.merge(object);
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_INSTALL]: getInstall,
  [Types.SET_INSTALL]: setInstall,

  [Types.GET_VEHICLES_MULTI]: getVehiclesMulti,
  [Types.GET_VEHICLES]: getVehicles,
  [Types.SET_VEHICLES]: setVehicles,
  [Types.SET_VEHICLES_OF_OTHER_REPORT]: setVehiclesOfOtherReport,
  [Types.SET_REPORT_SELECTED]: setReportSelected,
  [Types.SET_CUSTOMER_SELECTED]: setCustomerSelected,
  [Types.SET_VEHICLE_SELECTED]: setVehicleSelected,
  [Types.SET_FLEET_SELECTED]: setFleetSelected,
  [Types.SET_FLEET_MULTI]: setFleetMulti,
  [Types.SET_DATE_RANG]: setDateRang,
  [Types.GET_REPORT_MENU]: getReportMenu,
  [Types.SET_REPORT_MENU]: setReportMenu,
  [Types.GET_FLEET]: getFleet,
  [Types.SET_FLEET]: setFleet,
  [Types.SET_FLEET_LIST_MULTI]: setFleetListMulti,
  [Types.GET_CUSTOMER_OTHER_REPORT]: getCustomerOtherReport,
  [Types.SET_CUSTOMER_OTHER_REPORT]: setCustomerOtherReport,

  // [Types.GET_DRIVING_MASTER]: getDrivingMaster,
  // [Types.SET_DRIVING_MASTER]: setDrivingMaster,
  // [Types.GET_DRIVING]: getDriving,
  // [Types.SET_DRIVING]: setDriving,

  [Types.GET_MASTER_DATA]: getMasterData,
  [Types.SET_MASTER_DATA]: setMasterData,
  [Types.SET_MASTER_DATA_TEMP]: setMasterDataTemp,
  [Types.SET_DATA_SUMMARY]: setDataSummary,

  [Types.GET_SUMMARY_DATA]: getSummaryData,
  [Types.SET_SUMMARY_DATA]: setSummaryData,

  [Types.GET_DETAIL_DATA]: getDetailData,
  [Types.SET_DETAIL_DATA]: setDetailData,

  [Types.SET_DETAIL_SELECTED]: setDetailSelected,
  [Types.SET_PERCENT]: setPercent,
  [Types.SET_OVER_TIME]: setOverTime,

  [Types.SET_STATE_REDUX_OTHER_REPORT]: setStateReduxOtherReport,
  [Types.SET_DEFAULT_REDUX_OTHER_REPORT]: setDefaultReduxOtherReport,
  [Types.SET_VALUE_OTHER_REPORT]: setValueOtherReport,
  [Types.SET_STATE_OTHER_REPORT]: setStateOtherReport,
});

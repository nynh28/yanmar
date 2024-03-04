import apisauce from "apisauce";
import { param } from "jquery";
import {
  ENDPOINT_BASE_URL,
  ENDPOINT_BASE_URL_YNM2,
  ENDPOINT_BASE_URL_YNM4,
} from "../Config/app-config";

const create = (baseURL = ENDPOINT_BASE_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      Accept: "application/json",
      // 'Accept': 'text/plain',
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 600000,
  });
  const api2 = apisauce.create({
    baseURL: ENDPOINT_BASE_URL_YNM2,
    headers: {
      Accept: "application/json",
      // 'Accept': 'text/plain',
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 600000,
  });
  const api3 = apisauce.create({
    baseURL: ENDPOINT_BASE_URL_YNM4,
    headers: {
      Accept: "application/json",
      // 'Accept': 'text/plain',
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 600000,
  });
  const setHeader = (header) => {
    // api.setHeaders({
    //   Authorization: header.idToken,
    //   'X-API-Key': header.redisKey
    // })

    api.setHeaders(header);
  };

  // const getVehicles = (user_id) => api.get('fleet/ListMember?user_id=' + user_id)
  const getVehicles = (param) => api2.get("fleet/Yanmar/ListMember" + param);
  const getVehiclesMulti = (data) => api3.post("fleet/Yanmar/ListMember", data);

  const getReportMenu = (user_id) =>
    api2.get("fleet/menu/report?user_id=" + user_id);
  const getFleet = (user_id) =>
    api2.get("fleet/dropdown?user_id=" + user_id + "&options=FLEET");
  const getCustomer = (data) => api2.post("fleet/get_customer_by_manage", data);
  const getDrivingMaster = (data) =>
    api2.get("fleet/report/master/driving", data);
  const getDriving = (data) => api2.get("fleet/report/driving", data);

  const getInstall = (data) => api2.post("fleet/report/installation", data);

  const getMasterData = (object) => api2.post(object.url, object.body);
  const getSummaryData = (object) => api2.post(object.url, object.body);
  const getDetailData = (object) => api3.post(object.url, object.body);

  return {
    setHeader,
    getVehicles,
    getReportMenu,
    getFleet,
    getCustomer,
    getDrivingMaster,
    getDriving,
    getMasterData,
    getSummaryData,
    getDetailData,
    getInstall,
    getVehiclesMulti,
  };
};

// let's return back our create method as the default.
export default {
  create,
};

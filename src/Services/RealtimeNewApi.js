import apisauce from "apisauce";
import { ENDPOINT_BASE_URL, ENDPOINT_REALTIME_V2 } from "../Config/app-config";

const create = (baseURL = ENDPOINT_BASE_URL) => {
  //#region  FOR REALTIME
  const api = apisauce.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "X-Amz-Security-Token": "Onelink-Admin-Support",
      // 'Accept': 'text/plain',
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 60000,
  });

  const apiT = apisauce.create({
    baseURL: ENDPOINT_REALTIME_V2,
    headers: {
      Accept: "application/json",
      "X-Amz-Security-Token": "Onelink-Admin-Support",
      // 'Accept': 'text/plain',
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 60000,
  });

  const apiT2 = apisauce.create({
    baseURL: "http://192.168.7.105:5000/prod/",
    headers: {
      Accept: "application/json",
      "X-Amz-Security-Token": "Onelink-Admin-Support",
      // 'Accept': 'text/plain',
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 60000,
  });

  // const setHeader = (header) => { api.setHeaders(header) }

  const setHeader = (header) => {
    api.setHeaders(header);
  };

  // Get Initial Truck Data
  // const getInitialVehiclesData = (userId) => api.get('fleet/Realtime', userId)
  const getInitialVehiclesData = (userId) =>
    apiT.get("fleet/TestUnicornRealtime", userId);

  // Get Initial Events Data latest/eventall/37490
  const getInitialEventData = () => api.get("eventall/37490");

  // Get Information
  // const getInformationMarker = (vid) => api.get('fleet/Infomation?vid=' + vid)
  // const getInformationMarker = (vid) => api.get('https://engineer.onelink-iot.com:4002/prod/fleet/TestUnicornInfomation?vid=' + vid)
  // https://engineer.onelink-iot.com:4002/prod/fleet/GunicornInfomation?vid=8433

  const getInformationMarker = (vid) =>
    apiT.get("fleet/V2/Infomation?vid=" + vid);
  // const getInformationMarker = (data) => apiT2.get('fleet/Infomation?user_id=' + data.user_id + "&vid=" + data.vid)

  // const getInformationMarker = (vid) => apiT2.get('fleet/TestUnicornInfomation?vid=' + vid)
  // https://engineer.onelink-iot.com:4002/prod/fleet/TestUnicornInfomation?vid=8433

  // const getInformationMarker = (vin_no) => api.get('hino/accounts/permissions', vin_no)
  // https://hino-api.onelink-iot.com/prod/fleet/V2/Infomation?vid=8601
  // Get Events for Truck
  const getEventDataForTruck = (vid) => api.get("event/" + vid);

  // Get Geofence By Types
  const getGeofenceByType = (GeofenceTypeIds) =>
    api.get("Geofence/Geofence/ListByTypes?" + GeofenceTypeIds);

  // Get Geofence Detail
  const getGeofenceDetail = (param) =>
    api.get("Geofence/Geofence/" + param.geofenceId + "?lang=" + param.lang);

  return {
    setHeader,
    getInitialVehiclesData,
    getInitialEventData,
    getInformationMarker,
    getEventDataForTruck,
    getGeofenceByType,
    getGeofenceDetail,
  };
};

// let's return back our create method as the default.
export default {
  create,
};

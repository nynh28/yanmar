import apisauce from 'apisauce'
import { ENDPOINT_BASE_URL } from '../Config/app-config';

const create = (baseURL = ENDPOINT_BASE_URL) => {

  //#region  FOR REALTIME
  const api = apisauce.create({
    baseURL,
    headers: {
      'Accept': 'application/json',
      'X-Amz-Security-Token': 'Onelink-Admin-Support'
      // 'Accept': 'text/plain',
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 60000
  })

  // const setHeader = (header) => { api.setHeaders(header) }

  const setHeader = (header) => {
    api.setHeaders(header)

  }
  //#endregion

  //#region  FOR  GEOFENCE
  // const apiGeofence = apisauce.create({
  //   baseURL: 'https://api-center.onelink-iot.com/v1.0.1',
  //   headers: {
  //     'Accept': 'application/json',
  //     'X-Amz-Security-Token': 'Onelink-Admin-Support'
  //   },
  //   // 10 second timeout...
  //   timeout: 10000
  // })

  // const setHeaderGeofence = (header) => {
  //   apiGeofence.setHeaders({
  //     'X-API-Key': header.redisKey
  //   })
  // }
  //#endregion

  // Get Initial Truck Data
  const getInitialTruckData = (userId) => api.get('fleet/Realtime', userId)

  // Get Initial Events Data latest/eventall/37490
  const getInitialEventData = () => api.get('eventall/37490')

  // Get Information
  const getInformation = (vid) => api.get('fleet/Infomation?vid=' + vid)
  // const getInformation = (vin_no) => api.get('hino/accounts/permissions', vin_no)

  // Get Events for Truck
  const getEventDataForTruck = (vid) => api.get('event/' + vid)

  // Get Geofence By Types
  const getGeofenceByTypes = (GeofenceTypeIds) => api.get('Geofence/Geofence/ListByTypes?' + GeofenceTypeIds)

  // Get Geofence Detail
  const getGeofenceDetail = (param) => api.get('Geofence/Geofence/' + param.geofenceId + "?lang=" + param.lang)

  return {
    setHeader,
    //  setHeaderGeofence,
    getInitialTruckData,
    getInitialEventData,
    getInformation,
    getEventDataForTruck,
    getGeofenceByTypes,
    getGeofenceDetail
  }
}

// let's return back our create method as the default.
export default {
  create
}

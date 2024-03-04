import apisauce from 'apisauce'
import { ENDPOINT_BASE_URL } from '../Config/app-config';

const create = (baseURL = ENDPOINT_BASE_URL) => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Accept': 'application/json',
      // 'X-Amz-Security-Token': 'Onelink-Admin-Support'
      // 'Accept': 'text/plain',
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 60000
  })

  const apitest = apisauce.create({
    baseURL: "https://engineer.onelink-iot.com:4002/prod/",
    headers: {
      'Accept': 'application/json',
      "Accept-Encoding": "gzip"
      // 'X-Amz-Security-Token': 'Onelink-Admin-Support'
    },
    // 10 second timeout...
    timeout: 60000
  })//'https://api-center.onelink-iot.com/stage/fleet'



  const setHeader = (header) => { api.setHeaders(header) }

  // const getListMember = (user_id) => api.get('fleet/ListMember?user_id=' + user_id)
  const getListMember = (param) => api.get('fleet/ListMember' + param)

  // Get History Data
  // const getHistory = (data) => api.get('Vehicle/HistoryByTrip', data)
  // const getHistory = (data) => api.get('fleet/HistoryByTrip', data)
  const getHistory = (data) => apitest.get('fleet/GunicornHistoryByTrip', data)


  const getHistoryEvaluatedKey = (data) => api.get('Vehicle/HistoryByTripFirstEvaluatedKey', data)


  //#region HISTORY TRIP NEW 02-05-2020
  const getHistoryTrip = (data) => apitest.get('fleet/history/trip?', data)
  const getHistoryGps = (data) => apitest.get('fleet/history/gps/' + data.imei + "?speed_limit=" + data.speed_limit + "&start_date=" + data.start_date + "&end_date=" + data.end_date)
  //#endregion



  return {
    setHeader,
    getListMember,
    getHistory,
    getHistoryEvaluatedKey,
    getHistoryTrip,
    getHistoryGps
  }
}


// let's return back our create method as the default.
export default {
  create
}

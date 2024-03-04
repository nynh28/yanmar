import apisauce from 'apisauce'
import { ENDPOINT_BASE_URL } from '../Config/app-config';

const create = (baseURL = ENDPOINT_BASE_URL) => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Accept': 'application/json',
      'X-Amz-Security-Token': 'Onelink-Admin-Support'
      // 'Accept': 'text/plain',
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 120000
  })

  const setHeader = (header) => { api.setHeaders(header) }

  // Get History Data
  // const getDataUnit = (data) => api.get('eventall/37490')
  const getDataUnit = (data) => api.post('fleet/check/HistoryCallFirstKey', data)
  const getDataUnitLastEvaluatedKey = (data) => api.post('fleet/check/HistoryCallLastEvaluatedKey', data)




  return {
    setHeader,
    getDataUnit,
    getDataUnitLastEvaluatedKey
  }
}


// let's return back our create method as the default.
export default {
  create
}

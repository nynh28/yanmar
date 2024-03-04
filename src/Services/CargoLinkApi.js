import apisauce from 'apisauce'
import { ENDPOINT_BASE_URL_CARGOLINK } from '../Config/app-config';
let b = 'https://staging.cargolink.co.th/api/'
let baseCargolink = 'https://cargolink.co.th/api/'
const create = (baseURL = ENDPOINT_BASE_URL_CARGOLINK) => {

  const api = apisauce.create({
    baseURL,
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    timeout: 10000
  })

  const setHeader = (header) => {
    api.setHeaders(header)
  }

  const login = (data) => api.post('mobile/v1/auth/login', data)
  const getOrders = (data) => api.post('v1/carriers/getOrders', data)

  return {
    login,
    getOrders,
    setHeader,
  }
}

// let's return back our create method as the default.
export default {
  create
}

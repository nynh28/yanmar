import apisauce from 'apisauce'
import { ENDPOINT_BASE_URL } from '../Config/app-config';

const create = (baseURL = ENDPOINT_BASE_URL) => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Accept': 'application/json'
      // 'Accept': 'text/plain',
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 10000
  })

  // Get All Dealer
  const vehicleData = () => api.get('')





  return {
    vehicleData
  }
}


// let's return back our create method as the default.
export default {
  create
}

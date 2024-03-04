import apisauce from 'apisauce'
import { ENDPOINT_BASE_URL } from '../Config/app-config';

const create = (baseURL = ENDPOINT_BASE_URL) => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Accept': 'application/json',
      // 'Accept': 'text/plain',
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 60000
  })

  const setHeader = (header) => {
    api.setHeaders({
      Authorization: header.idToken,
      'X-API-Key': header.redisKey,
    })
  }
  const getDataDropdown = (optionGroup) => api.get('/util/options?optionGroup=' + optionGroup)
  const getDataDropdownVehicle = (optionGroup) => api.get('/Vehicles/Options?OptionGroup=' + optionGroup)
  const getDataDropdownWithPermission = (optionGroup) => api.get('/util/options/me?optionGroup=' + optionGroup)

  return {
    setHeader,
    getDataDropdown,
    getDataDropdownWithPermission,
    getDataDropdownVehicle
  }
}

// let's return back our create method as the default.
export default {
  create
}
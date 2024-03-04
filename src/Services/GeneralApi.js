import apisauce from 'apisauce'
import { ENDPOINT_BASE_URL } from '../Config/app-config';

const create = (baseURL = ENDPOINT_BASE_URL) => {
  const api = apisauce.create({
    // baseURL,
    baseURL,
    headers: {
      // 'Accept': 'application/json'
      'Accept': 'text/plain'
    },
    timeout: 30000
  })

  const setHeader = (header) => api.setHeaders(header)

  //  Get PasswordPolicy
  const getInfoGeneral = (data) => api.get('fleet/setting/', data)

  //  Get PasswordPolicy
  const updateInfoGeneral = (data) => api.put('fleet/setting/update?user_id=' + data.user_id, data.payload)//{id}/AdminResetPassword

  //  Get PasswordPolicy
  const getHistoryGeneral = (data) => api.get('fleet/setting/log/fuelcoefficient', data)//{id}/AdminResetPassword

  const updateFleet = (data) => api.put('fleet/setting/fleet_name', data)
  const createFleet = data => api.post('fleet/setting/fleet_name', data)
  const delFleet = data => api.delete('fleet/setting/fleet_name', data)

  //#endregion

  return {
    setHeader,
    getInfoGeneral,
    updateInfoGeneral,
    getHistoryGeneral,
    updateFleet,
    createFleet,
    delFleet
  }
}

// let's return back our create method as the default.
export default {
  create
}

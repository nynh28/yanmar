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
    timeout: 10000
  })
  //https://api-center.onelink-iot.com/v1.0.1/grid-view/allocable-vehicles?ownerId=101
  // const getAllocableVehicles = (data) => api.get('/grid-view/allocable-vehicles/' + data.OwnerField + '?' + data.options)

  const setHeader = (header) => { api.setHeaders(header) }

  const getListVehicles = (userId, partnerId) => api.get('/fleet/vehicle/vehicle_allocation/list_vehicle', {
    user_id: userId,
    partner_id: partnerId
  })

  const getOwnerPartner = (userId) => api.get('/fleet/vehicle/vehicle_allocation/owner_partner', {
    user_id: userId
  })

  const getNewOwnerPartner = (userId, partnerId) => api.get('/fleet/vehicle/vehicle_allocation/new_owner_partner', {
    user_id: userId,
    partner_id: partnerId
  })

  const updateNewPartner = (userId, ownerId, newOwnerId, vehicles) => api.put(`/fleet/vehicle/vehicle_allocation/update?user_id=${userId}`, {
    vehicles: [{
      "owner_partner_id": ownerId,
      "new_partner_id": newOwnerId,
      "vehicles": vehicles
    }]
  })

  return {
    setHeader,
    // getAllocableVehicles,
    getOwnerPartner,
    getListVehicles,
    getNewOwnerPartner,
    updateNewPartner
  }
}


// let's return back our create method as the default.
export default {
  create
}

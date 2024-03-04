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

  // Set Header
  const setHeader = (header) => { api.setHeaders(header) }

  // Get Dealer By ID
  const getInfoDealer = (id) => api.get('hino/dealers/profile?id=' + id)

  // Create a new Dealer
  const createDealer = (data) => api.post('hino/dealers/profile', data)

  // Delete Dealer By Id
  const deleteDealer = (id) => api.delete('hino/dealers/profile?id=' + id)

  // Update Dealer
  const updateDealer = (data) => api.patch('hino/dealers/profile?id=' + data.id, data.patchRequest)


  // ----------------------------------------------------------------------------------------------------


  return {
    setHeader,
    getInfoDealer,
    createDealer,
    deleteDealer,
    updateDealer,

  }
}


// let's return back our create method as the default.
export default {
  create
}

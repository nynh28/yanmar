import apisauce from 'apisauce'
import { ENDPOINT_BASE_URL } from '../Config/app-config';

const create = (baseURL = ENDPOINT_BASE_URL) => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Accept': 'application/json',
      'Accept': 'text/plain',
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 10000
  })


  // search Driver
  // const searchDrivers = () => api.get('/api/drivers/search')
  // const searchDrivers = (id) => api.get('/api/customers/drivers/search?id=' + id)
  const searchDrivers = (id) => api.get('/api/customers/drivers/grid-view?id=' + id) // old 20 Jan 2020
  // const searchDrivers = (id) => {
  //   return api.get('/api/customers/drivers/grid-view?id=' + id, null, {
  //     headers: {
  //       // 'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Accept': 'text/plain',
  //       // "Authentication": id,
  //     }
  //   })
  // }    // new 20 Jan 2020

  const getDriversByID = (id) => api.get('/api/drivers/profile/me?id=' + id)
  const getLicenseByID = (id) => api.get('/api/drivers/license-cards?driverId=' + id)


  // const deleteDriversByID = (id) => api.delete('/api/customers/drivers/profile?id=' + id)
  const deleteDriversByID = (data) => api.delete('/api/customers/drivers/detach', data)

  // const createDriver = (addData) => api.post('/api/customers/drivers/profile?id=' + addData.id, addData.createDriverRequest)

  const updateDrivers = (data) => api.patch('/api/drivers/profile/me?id=' + data.id, data.array)
  const updateDriversLicense = (data) => api.patch('/api/drivers/license-cards/' + data.id, data.array)

  const getDictionary = (lang) => api.get('/api/master/system/dictionary?Language=' + lang)


  const searchLocationList = (name) => api.get('/api/locations/search?q=' + name)
  const getLocation = (code) => api.get('/api/locations/' + code + '/ancestor')

  const getDriverDetail = (id) => api.get('/api/customers/drivers/detail?=' + id)

  return {
    searchDrivers,
    getDriversByID,
    getLicenseByID,
    deleteDriversByID,
    updateDrivers,
    updateDriversLicense,
    getDictionary,
    searchLocationList,
    getLocation,
    getDriverDetail,
    createDriver,
  }
}


// let's return back our create method as the default.
export default {
  create
}

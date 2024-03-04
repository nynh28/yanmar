import apisauce from 'apisauce'
import { ENDPOINT_BASE_URL } from '../Config/app-config';

const create = (baseURL = ENDPOINT_BASE_URL) => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Accept': 'application/json'
    },
    timeout: 60000
  })

  const setHeader = (header) => {
    api.setHeaders(header)
  }

  // const setHeader = (header) => {
  //   api.setHeader(header)
  // }

  //#region https://api-center.onelink-iot.com/v1.0.1  >> Authorization(apiKey)

  //  Get Driver
  const getDriver = (id) => api.get('/DriverManage/Drivers/' + id)

  //  Check Driver Existing with Customer or Existing on System
  const getExistingDriver = (param) => api.get('/DriverManage/Drivers/CheckStatus?customerId=' + param.customerId + "&personalId=" + param.personalId)

  //  Create a new Driver of Customer
  const createDriver = (data) => api.post('/DriverManage/Drivers', data)

  //  Update Driver Profile
  const updateDriver = (object) => api.put('/DriverManage/Drivers/' + object.id, object.data)

  //  Get Driver Profile
  const getDriverProfile = (personalId) => api.get('/driver-manage/profiles/' + personalId)

  //  Inactive Driver Profile
  const deleteDriverProfile = (personalId) => api.delete('/driver-manage/profiles/' + personalId)

  //  Delete Driver
  const deleteDriver = (id) => api.delete('/DriverManage/Drivers/' + id)

  // Get Initial Driver Data
  const getInitialDriverData = () => api.get('/grid-view/drivers')

  // Get Driving Detail
  const getDrivingDetail = (personalId) => api.get('/driver-manage/profiles/' + personalId + '/driving-detail')

  //#endregion


  const getMyVehicles = (data) => api.post('fleet/myvehicle', data)

  return {
    setHeader,
    getDriver,
    getExistingDriver,
    createDriver,
    getDriverProfile,
    updateDriver,
    deleteDriverProfile,
    deleteDriver,
    getInitialDriverData,
    getDrivingDetail,
    getMyVehicles
  }
}

// let's return back our create method as the default.
export default {
  create
}

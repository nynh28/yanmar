import apisauce from 'apisauce'
import { ENDPOINT_BASE_URL } from '../Config/app-config';

const create = (baseURL = ENDPOINT_BASE_URL) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Accept': 'application/json',
      'X-Amz-Security-Token': 'Onelink-Admin-Support'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // 60 second timeout...
    timeout: 60000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  // const listVehicle = (data) => api.get('vehicles/seach', data)
  // const addVehicle = (data) => api.post('vehicles/profile', data)
  // const editVehicle = (data) => {api.patch('vehicles/'+data.id, data.edit)

  // Search Vehicles
  // const listVehicle = () => api.get('hino/vehicles/seach')

  //https://api-center.onelink-iot.com/v1.0.0/api/hino/vehicles/grid-view

  //for
  const vehicleTypeByLaw = (data) => api.get('util/options?optionGroup=' + data)

  const setHeader = (header) => {
    api.setHeaders({
      Authorization: header.idToken,
      'X-API-Key': header.redisKey,
    })
  }

  //Update profile screen 

  const getProfile = () => api.get('UserManage/User/Me')
  const addProfile = (data) => api.put('UserManage/User/Me', data)




  const SearchVinno = (id) => api.get('Vehicles/VinStatus?VehicleBrandId=' + id + ' &VinNo=' + id)

  const listVehicle = () => api.get('hino/vehicles/grid-view')



  // Get VehicleInfo By Id
  const getInfoVehicle = (id) => api.get('Vehicles/Profiles/' + id)
  const getInfoVehicleExtension = (id) => api.get('Vehicles/Profiles/' + id + '/Extension')


  // Delete Vehicle
  const deleteVehicle = (id) => api.delete('Vehicles/Profiles/' + id)

  // Update Patch method
  const editVehicle = (data) => api.put('Vehicles/Profiles/' + data.id, data.body)

  // Create a new Vehicles
  const addVehicle = (data) => api.post('Vehicles/Profiles', data)


  //check vinno
  const checkVinno = (data) => api.get('Vehicles/VinStatus?VehicleBrandId=' + data.VehicleBrandId + ' &VinNo=' + data.VinNo)
  // const checkVinno = (data) => api.get('Vehicles/Creatable?VehicleBrandId=' + data.VehicleBrandId + '&VinNo=' + data.VinNo)


  // Update Patch Vehicle
  const updateVehicle = (data) => api.patch('hino/vehicles/profile?id=' + data.id, data.array)



  const getDrop11 = () => api.get('Subscription/Fundamental/Package')
  // Get Events
  //const getInitialTruckData = () => api.get('realtime/37490')
  // https://wpuk2uewfk.execute-api.ap-southeast-1.amazonaws.com/latest/event/198294

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getProfile,
    vehicleTypeByLaw,
    SearchVinno,
    listVehicle,
    addVehicle,
    editVehicle,
    getInfoVehicle,
    deleteVehicle,
    updateVehicle,
    setHeader,
    checkVinno,
    getInfoVehicleExtension,
    addProfile,
    getDrop11
  }
}

// let's return back our create method as the default.
export default {
  create
}

import apisauce from 'apisauce'
import { ENDPOINT_BASE_URL } from '../Config/app-config';
var url = 'http://3.130.59.229:9000/api/'
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
      'X-Amz-Security-Token': 'Onelink-Admin-Support',
      'Accept-Language': ''
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // 10 second timeout...
    timeout: 30000
  })

  const apiAlert = apisauce.create({
    // base URL is read from the "constructor"
    baseURL:'http://3.130.59.229:9000/api/',
    // here are some default headers
    headers: {
      'Accept': 'application/json',
    //   'X-Amz-Security-Token': 'Onelink-Admin-Support',
    //   'Accept-Language': ''
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // 10 second timeout...
    timeout: 30000
  })


  const setHeader = (header) => {
    api.setHeaders({
      'Authorization': header.idToken,
      'X-API-Key': header.redisKey,
    })
  }

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


  const getDropdown = (data) => api.get('util/options?OptionGroup='+data)
  const getDropdownAlertType = () => apiAlert.get('alert-type')
  const getDropdownDealer = (id) => apiAlert.get('partner/dealer/'+id)
  const getDropdownCustomer = (id) => apiAlert.get('partner/customer/'+id)
  const getDropdownUserHMST = () => apiAlert.get('/user-info/hmst')
  const getDropdownUserDealer = (id) => apiAlert.get('/user-info/dealer/'+id)
  const getDropdownUserCustomer = (id) => apiAlert.get('/user-info/customer/'+id)
  // const getDropdownFleet = () => apiAlert.get('alert-type')
  // const getDropdownDriver = () => apiAlert.get('alert-type')
  const getCriteria = (id) => apiAlert.get('alert-type/'+id)
//   const getDropdownGeofenceType = (data) => api.get('util/options?OptionGroup=GeofenceTypeByPartner&Key=' + data)
//   const getDropdownPartnerName = () => api.get('util/options?OptionGroup=PartnerOwner')
  
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
    setHeader,
    getDropdown,
    getDropdownAlertType,
    getDropdownDealer,
    getDropdownCustomer,
    getDropdownUserHMST,
    getDropdownUserDealer,
    getDropdownUserCustomer,
    getCriteria,
    
  }
}

// let's return back our create method as the default.
export default {
  create
}

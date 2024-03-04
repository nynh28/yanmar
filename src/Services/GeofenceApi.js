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
      'X-Amz-Security-Token': 'Onelink-Admin-Support',
      'Accept-Language': ''
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // 10 second timeout...
    timeout: 30000
  })

  const setHeader = (header) => {
    api.setHeaders(header)
    // api.setHeaders({

    //   'Authorization': header.idToken,
    //   'X-API-Key': header.redisKey,
    //   'Accept-Language': '',
    // })
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


  const getDropdownSourceType = () => api.get('util/options?OptionGroup=SourceType')
  const getPresentIcon = () => api.get('Geofence/LoadPreset')
  // const getUserProfile = () => api.get('users/get-profile')
  // const getDropdownPartnerOwnerByLevel = (data) => api.get('util/options?OptionGroup=PartnerOwnerByLevel&Key='+data)
  // const getIconByGeofenceType = () => api.get('')
  // const getDropdownGeofenceType = () => api.get('util/options?OptionGroup=GeofenceType')
  const getDropdownGeofenceType = (data) => api.get('Geofence/Geofence/ListGeofenceType?partnerId=' + data)
  const getDropdownPartnerNameByUserLevel = (data) => api.get('util/options?OptionGroup=PartnerOwnerByLevel&Key='+data)
  const getDropdownPartnerName = (data) => api.get('util/options?OptionGroup=PartnerOwner')

  const getDropdownGeomType = () => api.get('util/options?OptionGroup=GeometryType')
  const getRadioIconSource = () => api.get('Geofence/Options/IconSource')
  const getGeofence = (data) => api.get('Geofence/Geofence/' + data)
  const addGeofence = (data) => api.post('Geofence/Geofence', data)
  const editGeofence = (data) => api.put('Geofence/Geofence/' + data[1].id, data[0])
  const deleteGeofence = (data) => api.delete('/Geofence/Geofence/' + data)
  const getGeofenceType = (data) => api.get('Geofence/GeofenceType/' + data)
  const addGeofenceType = (data) => api.post('Geofence/GeofenceType', data)
  const editGeofenceType = (data) => api.put('Geofence/GeofenceType/' + data[1].id, data[0])
  const deleteGeofenceType = (data) => api.delete('Geofence/GeofenceType/' + data)
  const editGeofenceSharing = (data) => api.put('/Geofence/ShareManagement/Geofence?partnerId='+ data[1].id, data[0])
  const cloneGeofenceSharing = (data) => api.post('/Geofence/ShareManagement/Geofence/Clone', data)
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
    // getDropdownPartnerOwnerByLevel,
    getDropdownGeofenceType,
    getDropdownPartnerNameByUserLevel,
    getDropdownPartnerName,
    getDropdownGeomType,
    getDropdownSourceType,
    getRadioIconSource,
    getGeofence,
    addGeofence,
    editGeofence,
    deleteGeofence,
    getGeofenceType,
    addGeofenceType,
    editGeofenceType,
    deleteGeofenceType,
    editGeofenceSharing,
    cloneGeofenceSharing,
    getPresentIcon,
  }
}

// let's return back our create method as the default.
export default {
  create
}

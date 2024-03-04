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
    // 10 second timeout...
    timeout: 10000
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
  const addRoleGroup = (data) => api.post(data.type + '/accounts/roles', data.request)
  const getRoleGroup = (data) => api.get(data.type + '/accounts/roles' + data.id)
  const getRoleGroupHino = () => api.get('hino/accounts/roles')

  const addUser = (data) => api.post(data.type + '/accounts/roles/add-user', data.request)
  const getUser = (data) => api.get(data.type + '/accounts/users/list' + data.id)
  const getUserHino = () => api.get('hino/accounts/users/list')

  const getUserGroup = (data) => api.get(data.type + '/accounts/roles/users' + data.request)

  const addUserGroup = (data) => api.get(data.type + '/accounts/roles/users?SuffixRoleName=' + data.roleName)

  const addUserRoleGroup = (data) => api.put('hino/accounts/roles/add-user', data)
  const removeUserRoleGroup = (data) => api.put('hino/accounts/roles/remove-user', data)
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
    getRoleGroup,
    addRoleGroup,
    addUserRoleGroup,
    removeUserRoleGroup,
    getUser,
    addUser,
    getUserHino,
    getRoleGroupHino,
    getUserGroup,
    addUserGroup
  }
}

// let's return back our create method as the default.
export default {
  create
}

import apisauce from 'apisauce'
import { ENDPOINT_BASE_URL } from '../Config/app-config';

const create = (baseURL = ENDPOINT_BASE_URL) => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Accept': 'application/json'
      , 'X-Amz-Security-Token': 'Onelink-Admin-Support'
      // 'Accept': 'text/plain',
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 10000
  })


  //#region  Hino Account Management

  // Create a new Hino Group
  const createGroupHino = (data) => api.post('hino/accounts/roles', data)

  // Get All Hino Policies
  const listPoliciesHino = () => api.get('hino/accounts/permissions')

  // Get All Group Permissions
  const listGroupPermissionHino = () => api.get('hino/accounts/roles-permissions')

  // Update Permissions for a Hino group
  // const updatePermissionForGroupHino = (data) => api.put('hino/accounts/roles-permissions', data.data)
  const updatePermissionForGroupHino = (data) => api.put('hino/accounts/roles-permissions', data.data)

  //#endregion

  //#region  Dealer Account Management

  // Create a new Dealer Group
  const createGroupDealer = (data) => api.post('dealers/accounts/roles?id=' + data.id, data.suffixRoleName)

  // Get All Dealer Policies
  const listPoliciesDealer = () => api.get('dealers/accounts/permissions')

  // Get All Dealer Group Permissions
  const listGroupPermissionDealer = (id) => api.get('dealers/accounts/roles-permissions?id=' + id)

  // Update Permissions for a Dealer group
  const updatePermissionForGroupDealer = (data) => api.put('dealers/accounts/roles-permissions?id=' + data.id, data.data)

  //#endregion

  //#region  Customer Account Management

  // Create a new Customer Group
  const createGroupCustomer = (data) => api.post('customers/accounts/roles', data)

  // Get All Customer Policies
  const listPoliciesCustomer = () => api.get('customers/accounts/permissions')

  // Get All Customer Group Permissions
  const listGroupPermissionsCustomer = (id) => api.get('customers/accounts/roles-permissions?id=' + id)


  // Update Permissions for a Customer group
  const updatePermissionForGroupCustomer = (data) => api.put('customers/accounts/roles-permissions?id=' + data.id, data.data)

  //#endregion


  return {
    createGroupHino,
    listPoliciesHino,
    listGroupPermissionHino,
    updatePermissionForGroupHino,
    createGroupDealer,
    listPoliciesDealer,
    listGroupPermissionDealer,
    updatePermissionForGroupDealer,
    createGroupCustomer,
    listPoliciesCustomer,
    listGroupPermissionsCustomer,
    updatePermissionForGroupCustomer,
  }
}


// let's return back our create method as the default.
export default {
  create
}

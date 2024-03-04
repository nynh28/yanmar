import apisauce from 'apisauce'
import { ENDPOINT_BASE_URL } from '../Config/app-config';

const create = (baseURL = ENDPOINT_BASE_URL) => {

  const api = apisauce.create({
    baseURL,
    headers: {
      // 'Accept': 'application/json'
      'Accept': 'text/plain'
    },
    timeout: 60000
  })

  const setHeader = (header) => {
    api.setHeaders(header)
  }

  //#region https://api-center.onelink-iot.com/v1.0.1  >> Authorization(apiKey)

  //  Get PasswordPolicy
  const getPasswordPolicy = () => api.get('UserManage/User/PasswordPolicy')

  //  Get PasswordPolicy
  const resetAndUnlock = (url) => api.put('UserManage/User/' + url)//{id}/AdminResetPassword

  //  Get User Option
  const getUserSearch = (url) => api.get('UserManage/User/Option/' + url)
  const getUserCreateAndUpdate = (url) => api.get('UserManage/User/' + url)
  // const getUserCreateAndUpdateOpt = (data) => api.get('UserManage/User/Option/' + data.url, data.query)

  //  Search Grid View
  const searchGridView = (data) => api.get('/UserManage/User/GridView', data)
  const searchGridViewByRole = (data) => api.get('/UserManage/User/GridViewByRole', data)

  //  Get User Data
  const getUser = (id) => api.get('UserManage/User/' + id)

  //  Create User
  const createUser = (data) => api.post('UserManage/User', data)

  //  Update User
  const updateUser = (object) => api.put('UserManage/User/' + object.id, object.data)

  //  Delete User
  const deleteUser = (id) => api.delete('UserManage/User/' + id)

  //  Get Dropdown Table
  const getDropdownTable = (url) => api.get('UserManage/User/' + url)
  //  Get Dropdown Table

  const getAgreementUser = (data) => api.get('/UserManage/User/' + data.id + '/Agreement/' + data.agreementId)

  // Permission Summary
  const getPermissionSummary = (id) => api.get('UserManage/User/' + id + '/Function')

  //  Get file user form
  const getDealerToSendEmail = (id) => api.get('UserManage/User/' + id + '/DealerToSendEmail')

  //  Get file user form
  const getFileUserForm = (id) => api.get('UserManage/User/' + id + '/PrintWellcomeUser')

  //  Send email user form
  const sendEmailUserForm = (data) => api.post('UserManage/User/' + data.id + '/SendWellcomeUser' + data.param)

  //#endregion

  return {
    setHeader,
    getPasswordPolicy,
    resetAndUnlock,
    getUserSearch,
    getUserCreateAndUpdate,
    // getUserCreateAndUpdateOpt,
    searchGridView,
    searchGridViewByRole,
    getPermissionSummary,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getDropdownTable,
    getAgreementUser,
    getFileUserForm,
    sendEmailUserForm,
    getDealerToSendEmail
  }
}

// let's return back our create method as the default.
export default {
  create
}

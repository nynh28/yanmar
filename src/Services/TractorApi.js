import apisauce from 'apisauce'
import { ENDPOINT_BASE_URL_YNM_VNTEAM } from '../Config/app-config';

const create = (baseURL = ENDPOINT_BASE_URL_YNM_VNTEAM) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Accept': 'application/json'
      // 'Accept': 'text/plain',
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 10000
  })

  // User Management
  const getListUser = (params) => api.get('fleet/user/list?'+params)
  const getListUserRole = (params) => api.get('fleet/user/role?'+params)
  const updateUserStatus = (params) => api.post('fleet/user/change-user-status', params)
  const getUserDetail = (id) => api.get('fleet/user/detail?user_id='+id)
  const blockUser = (id) => api.post('fleet/user/block', id)
  const unBlockUser = (id) => api.post('fleet/user/un-block', id)
  const deleteUser = (id) => api.delete('fleet/user/delete?id='+id)
  const createNewUser = (data) => api.post('fleet/user/create', data)
  const resetPassword = (data) => api.put('fleet/user/reset-password', data)
  const changePlatform = (data) => api.put('fleet/user/update', data)
  // const changePlatform = (data) => api.put('fleet/user/change-platform', data)


  //Maintenance
  const getListSetting = (params) => api.get('fleet/vehicle-maintenance-setting/list?'+params)
  const updateMaintenanceSetting = (data) => api.put('fleet/vehicle-maintenance-setting/update', data)
  const exportListDataMaintenance= (params, options) => api.get('fleet/maintenance/tractor/export?'+params, options)
  const getListDataMaintenance= (params) => api.get('fleet/maintenance/tractor/list?'+params)
  const getDetailMaintenance =(id) => api.get('fleet/maintenance/tractor/detail?id='+ id)
  const upLoadFileTractorMaintenance =(data, options) => api.post('fleet/maintenance/tractor/upload', data, options)
  const updateMaintenanceEdit =(id,data) =>api.put('fleet/maintenance/tractor/update?id='+id, data)

  //Dashboard
  const dataMachineDashBoard = (params) => api.get('fleet/dashbroad/count-status-maintenance?'+ params)
  const dataMachine = () => api.get('fleet/dashbroad/count-status-machine')

  //Machine
  const getListDataMachine= (params) => api.get('fleet/machine/tractor/list?'+params)
  const getDetailMachine =(id) => api.get('fleet/machine/tractor/detail?id='+ id)
  const getMaintenaceHistory =(vin_no) => api.get('fleet/machine/tractor/maintenance-history?vin_no='+ vin_no)


  return {
    updateMaintenanceEdit,
    upLoadFileTractorMaintenance,
    getDetailMaintenance,
    dataMachine,
    dataMachineDashBoard,
    getListUser,
    getListUserRole,
    getUserDetail,
    createNewUser,
    resetPassword,
    deleteUser,
    changePlatform,
    getListSetting,
    updateMaintenanceSetting,
    getListDataMaintenance,
    getListDataMachine,
    getDetailMachine,
    getMaintenaceHistory,
    updateUserStatus,
    blockUser,
    unBlockUser,
    exportListDataMaintenance
  }
}


// let's return back our create method as the default.
export default {
  create
}

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Cookies from 'js-cookie';


/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // login: ['username', 'password'],
  setData: ['typeForm'],
  idSelected: ['typeForm','idSelected'],

  getDropdownAlertSetting: ['id'],
  getDropdownSuccess: ['userLevel','partnerName','alertType', 'dealer', 'customer','userHMST'],
  getDropdownFail: ['error'],

  getDropdownUserDealer: ['id'],
  getDropdownUserDealerSuccess: ['userDealer'],
  getDropdownUserDealerFail: ['error'],

  getCriteria: ['id'],
  getCriteriaSuccess: ['alert_setting_criteria'],
  getCriteriaFail: ['error'],

})

export const AlertSettingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
//   infoGeofenceData: null,
  typeForm: null,
  idSelected: null,
  loading: false,
  success: null,
  error: null,
  alert_criteria_setting: [],
  userLevel: [],
  partnerName: [],
  alertType: [],
  dealer: [],
  customer: [],
  user: [],
  vehicle: [],
  fleet: [],
  vehicleStatus: [],
  userHMST: [],
  userDealer: [],
  userCustomer: [],
  userFleet: [],
  userDriver: [],

})

/* ------------- Reducers ------------- */

// export const setData = (state, { typeForm }) => {
//   if (typeForm === "add")
//     return state.merge({ typeForm, infoGeofenceData: null, loading: false })
//   else
//     return state.merge({ typeForm, loading: false, isGeofenceType: false, isGeofence: false, geofenceType: {}, geofence: {} })

// }

// export const idSelected = (state, {typeForm, idSelected }) => {
//   if (typeForm === "edit"){
//     // console.log(edit)
//     return state.merge({ typeForm, idSelected, infoGeofenceData: null, loading: false })
//     // return state.merge({ geofenceType: {id: edit.id, partnerId: edit.partnerId, partnerName: edit.partnerName, partnerTypeName: edit.partnerTypeName, geofenceTypeName: edit.geofenceTypeName, geofenceDescription: edit.geofenceDescription, isHazard: edit.isHazard, activeStatus: edit.activeStatus, sourceTypeName: edit.sourceTypeName}, typeForm, idSelected, infoGeofenceData: null, loading: false })
//   }
//   else{
//     // console.log(edit)
//     return state.merge({ typeForm, idSelected, loading: false })
//   }
// }

export const getDropdownAlertSetting = (state, {id}) => {
  console.log('getDropdown')
  console.log(id)
  return state.merge({ loading: true, })
}

// export const getDropdownSuccess = (state, { userLevel, partnerName, alertType, dealer, customer }) => {
//   console.log('getDropdownSuccess')
//   return state.merge({ loading: false, userLevel, partnerName, alertType, dealer, customer })
// }

export const getDropdownSuccess = (state, { userLevel, partnerName, alertType, dealer, customer, userHMST }) => {
  console.log('getDropdownSuccess')
  return state.merge({ loading: false, userLevel, partnerName, alertType, dealer, customer, userHMST })
}

export const getDropdownFail = (state, ) => {
  console.log('getDropdownFail')
  return state.merge({ loading: false, })
}

export const getCriteria = (state, {id}) => {
    console.log('getCriteria')
    return state.merge({ loading: true, })
  }
  
  export const getCriteriaSuccess = (state, {alert_setting_criteria}) => {
    console.log('getCriteriaSuccess')
    console.log(alert_setting_criteria)
    return state.merge({ loading: false, alert_setting_criteria})
  }
  
  export const getCriteriaFail = (state, ) => {
    console.log('getDropdownFail')
    return state.merge({ loading: false, })
  }

  export const getDropdownUserHMST = (state, ) => {
    console.log('getDropdownUserHMST')
    // console.log(id)
    return state.merge({ loading: true, })
  }
  
  export const getDropdownUserHMSTSuccess = (state, { userHMST }) => {
    console.log('getDropdownUserHMSTSuccess')
    return state.merge({ loading: false, userHMST })
  }
  
  export const getDropdownUserHMSTFail = (state, ) => {
    console.log('getDropdownUserHMSTFail')
    return state.merge({ loading: false, })
  }

  export const getDropdownUserDealer = (state, {id}) => {
    console.log('getDropdownUserDealer')
    console.log(id)
    return state.merge({ loading: true, })
  }
  
  export const getDropdownUserDealerSuccess = (state, { userDealer }) => {
    console.log('getDropdownUserDealerSuccess')
    return state.merge({ loading: false, userDealer })
  }
  
  export const getDropdownUserDealerFail = (state, ) => {
    console.log('getDropdownUserDealerFail')
    return state.merge({ loading: false, })
  }

  export const getDropdownUserCustomer = (state, {id}) => {
    console.log('getDropdownUserCustomer')
    console.log(id)
    return state.merge({ loading: true, })
  }
  
  export const getDropdownUserCustomerSuccess = (state, { userCustomer }) => {
    console.log('getDropdownUserCustomerSuccess')
    return state.merge({ loading: false, userCustomer })
  }
  
  export const getDropdownUserCustomerFail = (state, ) => {
    console.log('getDropdownUserCustomerFail')
    return state.merge({ loading: false, })
  }


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {

//   [Types.SET_DATA]: setData,

//   [Types.ID_SELECTED]: idSelected,

  [Types.GET_DROPDOWN_ALERT_SETTING]: getDropdownAlertSetting,
  [Types.GET_DROPDOWN_SUCCESS]: getDropdownSuccess,
  [Types.GET_DROPDOWN_FAIL]: getDropdownFail,

  [Types.GET_DROPDOWN_USER_DEALER]: getDropdownUserDealer,
  [Types.GET_DROPDOWN_USER_DEALER_SUCCESS]: getDropdownUserDealerSuccess,
  [Types.GET_DROPDOWN_USER_DEALER_FAIL]: getDropdownUserDealerFail,

  [Types.GET_CRITERIA]: getCriteria,
  [Types.GET_CRITERIA_SUCCESS]: getCriteriaSuccess,
  [Types.GET_CRITERIA_FAIL]: getCriteriaFail,
})

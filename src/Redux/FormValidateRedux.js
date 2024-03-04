import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setErrorList: ['isValid'],
  setFormData: ['oldFieldData', 'fieldData'],
  // setDataDropdown: ['dropdownData', 'optionGroup'],
  // getFleetData: ['optionGroup'],
  // getDriverData: ['optionGroup'],
  // getVendorOfCustomerData: ['optionGroup'],
  // getVendorData: ['optionGroup'],
  // getCustomerData: ['optionGroup'],
  // getVehicleProvinceData: ['optionGroup'],
  // getVehicleTypeData: ['optionGroup'],
  // getVehicleTypeByLawData: ['optionGroup'],
  // getVehicleBodyTypeData: ['optionGroup'],
  // getVehicleBodyTypeByLawData: ['optionGroup'],
  // getVehicleModelData: ['optionGroup'],
  // getVehicleFuelTypeData: ['optionGroup'],
  // getVehicleStatusData: ['optionGroup'],
  // getVehicleBrandData: ['optionGroup']
})

export const FormValidateTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isValid: false,
  data: {},
  dropdownData: [],

  FleetData: [],
  DriverData: [],
  VendorOfCustomerData: [],
  VendorData: [],
  CustomerData: [],
  VehicleProvinceData: [],
  VehicleTypeData: [],
  VehicleTypeByLawData: [],
  VehicleBodyTypeData: [],
  VehicleBodyTypeByLawData: [],
  VehicleModelData: [],
  VehicleFuelTypeData: [],
  VehicleStatusData: [],
  VehicleBrandData: []
})

/* ------------- Reducers ------------- */

export const setErrorList = (state, { isValid }) => {
  return state.merge({ isValid })
}

export const setFormData = (state, { oldFieldData, fieldData }) => {
  return state.merge({ data: { ...oldFieldData, ...fieldData } })
}


//#region  Get Dropdown By group
export const getFleetData = (state) => {
  return state.merge({})
}

export const getDriverData = (state) => {
  return state.merge({})
}

export const getVendorOfCustomerData = (state) => {
  return state.merge({})
}

export const getVendorData = (state) => {
  return state.merge({})
}


export const getCustomerData = (state) => {
  return state.merge({})
}

export const getVehicleProvinceData = (state) => {
  return state.merge({})
}

export const getVehicleTypeData = (state) => {
  return state.merge({})
}

export const getVehicleTypeByLawData = (state) => {
  return state.merge({})
}

export const getVehicleBodyTypeData = (state) => {
  return state.merge({})
}

export const getVehicleBodyTypeByLawData = (state) => {
  return state.merge({})
}

export const getVehicleModelData = (state) => {
  return state.merge({})
}

export const getVehicleFuelTypeData = (state) => {
  return state.merge({})
}

export const getVehicleStatusData = (state) => {
  return state.merge({})
}

export const getVehicleBrandData = (state) => {
  return state.merge({})
}



//#endregion

// export const setDataDropdown = (state, { dropdownData, optionGroup }) => {
//   switch (optionGroup) {
//     case "Fleet":
//       return state.merge({ FleetData: dropdownData })
//     case "Driver":
//       return state.merge({ DriverData: dropdownData })
//     case "VendorOfCustomer":
//       return state.merge({ VendorOfCustomerData: dropdownData })
//     case "Vendor":
//       return state.merge({ VendorData: dropdownData })
//     case "Customer":
//       return state.merge({ CustomerData: dropdownData })
//     case "VehicleProvince":
//       return state.merge({ VehicleProvinceData: dropdownData })
//     case "VehicleType":
//       return state.merge({ VehicleTypeData: dropdownData })
//     case "VehicleTypeByLaw":
//       return state.merge({ VehicleTypeByLawData: dropdownData })
//     case "VehicleBodyType":
//       return state.merge({ VehicleBodyTypeData: dropdownData })
//     case "VehicleBodyTypeByLaw":
//       return state.merge({ VehicleBodyTypeByLawData: dropdownData })
//     case "VehicleModel":
//       return state.merge({ VehicleModelData: dropdownData })
//     case "VehicleFuelType":
//       return state.merge({ VehicleFuelTypeData: dropdownData })
//     case "VehicleStatus":
//       return state.merge({ VehicleStatusData: dropdownData })
//     case "VehicleBrand":
//       return state.merge({ VehicleBrandData: dropdownData })
//   }

// }

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_ERROR_LIST]: setErrorList,
  [Types.SET_FORM_DATA]: setFormData,
  // [Types.SET_DATA_DROPDOWN]: setDataDropdown,
  // [Types.GET_FLEET_DATA]: getFleetData,
  // [Types.GET_DRIVER_DATA]: getDriverData,
  // [Types.GET_VENDOR_OF_CUSTOMER_DATA]: getVendorOfCustomerData,
  // [Types.GET_VENDOR_DATA]: getVendorData,
  // [Types.GET_CUSTOMER_DATA]: getCustomerData,
  // [Types.GET_VEHICLE_PROVINCE_DATA]: getVehicleProvinceData,
  // [Types.GET_VEHICLE_TYPE_DATA]: getVehicleTypeData,
  // [Types.GET_VEHICLE_TYPE_BY_LAW_DATA]: getVehicleTypeByLawData,
  // [Types.GET_VEHICLE_BODY_TYPE_DATA]: getVehicleBodyTypeData,
  // [Types.GET_VEHICLE_BODY_TYPE_BY_LAW_DATA]: getVehicleBodyTypeByLawData,
  // [Types.GET_VEHICLE_MODEL_DATA]: getVehicleModelData,
  // [Types.GET_VEHICLE_FUEL_TYPE_DATA]: getVehicleFuelTypeData,
  // [Types.GET_VEHICLE_STATUS_DATA]: getVehicleStatusData,
  // [Types.GET_VEHICLE_BRAND_DATA]: getVehicleBrandData


})

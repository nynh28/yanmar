import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getDataDropdown: ['optionGroup', 'key', 'acceptLanguage'],
  getDataDropdownVehicle: ['optionGroup', 'key', 'acceptLanguage'],
  getDataDropdownLocation: ['optionGroup', 'key', 'stateName'],

  setDataDropdown: ['dropdownData', 'optionGroup', 'acceptLanguage'],
  setDataDropdownLocation: ['dropdownData', 'stateName'],
})

export const DropdownTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  //#region COMMON STATE
  SellerData: [],
  DriverData: [],
  VendorOfCustomerData: [],
  VendorData: [],
  CustomerData: [],
  VehicleProvinceData: [],
  VehicleTypeData: [],
  CargoLinkVehicleTypeData: [],
  VehicleTypeByLawData: [],
  VehicleBodyTypeData: [],
  VehicleBodyTypeByLawData: [],
  VehicleModelData: [],
  VehicleFuelTypeData: [],
  VehicleStatusData: [],
  VehicleBrandData: [],
  CardTypeData: [],
  LocationCountryData: [],
  FleetData: [],
  LocationProvinceData: [],
  LocationDistrictData: [],
  LocationSubdistrictData: [],
  VehicleAllocationOwnerData: [],
  VehicleAllocationPartnerData: [],
  GeofenceTypeData: [],
  UserLevelOwnerData: [],
  PartnerOwnerByLevelData: [],
  PartnerOwnerData: [],
  SourceTypeData: [],
  GeofenceData: [],
  GeofenceTypeByPartnerData: [],
  GeometryTypeData: [],
  //#endregion

  //#region กรณี 1 หน้า ใช้ Location Dropdown มากกว่า 1 Dropdown 
  LocationCountryOfficialData: [],
  LocationProvinceOfficialData: [],
  LocationDistrictOfficialData: [],
  LocationSubdistrictOfficialData: [],

  LocationCountryCurrentData: [],
  LocationProvinceCurrentData: [],
  LocationDistrictCurrentData: [],
  LocationSubdistrictCurrentData: [],

  LocationCountryBillingData: [],
  LocationProvinceBillingData: [],
  LocationDistrictBillingData: [],
  LocationSubdistrictBillingData: [],

  LocationCountryMailingData: [],
  LocationProvinceMailingData: [],
  LocationDistrictMailingData: [],
  LocationSubdistrictMailingData: [],
  //#endregion
})

/* ------------- Reducers ------------- */
export const getDataDropdown = (state, { }) => { return state.merge({}) }
export const getDataDropdownVehicle = (state, { }) => { return state.merge({}) }

export const setDataDropdown = (state, { dropdownData, optionGroup }) => { return state.merge({ [optionGroup + "Data"]: dropdownData }) }

//#region กรณี 1 หน้า ใช้ Location Dropdown มากกว่า 1 Dropdown 
export const getDataDropdownLocation = (state, { }) => { return state.merge({}) }

export const setDataDropdownLocation = (state, { dropdownData, stateName }) => { return state.merge({ [stateName]: dropdownData }) }
//#endregion

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_DATA_DROPDOWN]: getDataDropdown,
  [Types.GET_DATA_DROPDOWN_VEHICLE]: getDataDropdownVehicle,
  [Types.GET_DATA_DROPDOWN_LOCATION]: getDataDropdownLocation,

  [Types.SET_DATA_DROPDOWN]: setDataDropdown,
  [Types.SET_DATA_DROPDOWN_LOCATION]: setDataDropdownLocation,
})
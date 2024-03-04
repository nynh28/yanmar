import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
import DataGrid, { Column } from "devextreme-react/data-grid";
import React from "react";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  deleteVehicle: ["id"],
  setdeleteVehicleSuccess: ["infoDelVehicle"],
  updateVehicle: ["vehicle"],
  submitStatus: ["status", "ErrorSubcode", "key"],
  setListVehicle: [],
  setListVehicleSuccess: ["vehicle"],
  setListVehicleFail: ["error"],
  getDrop11: [""],

  setAddVehicle: [
    "vinNo",
    "vehicleName",
    "vehicleBrand",
    "vehicleModel",
    "vehicleSpecCode",
    "chassisNo",
    "speedLimit",
    "licensePlateNo",
    "licensePlace",
    "licenseDate",
    "customerId",
  ],
  setAddVehicleSuccess: [],

  setVehicleTypeSuccess: ["data", "name"],
  setAddVehicleSuccess1: ["success"],
  setAddVehicleSuccess2: [],
  setAddVehicleFail: ["error"],

  setEditVehicleStart: ["editStart"],
  // setEditVehicleEnd:['vinNo', 'vehicleName', 'vehicleBrand', 'vehicleModel', 'vehicleSpecCode', 'chassisNo', 'speedLimit', 'licensePlateNo', 'licensePlace', 'licenseDate', 'customerId'],
  editVehicle: ["id", "data"],
  checkVinno: ["VehicleBrandId", "VinNo"],
  setEditVehicleSuccess1: ["success"],
  setVinSuccess1: ["infoVinno"],
  getProfile: [""],
  addProfile: ["data"],
  setProfile: ["infoProfile"],
  setAddProfile: ["infoAddProfile"],
  setEditVehicleSuccess2: [],
  setEditVehicleFail: ["error"],

  setVehicleSuccess: [],
  setVehicleStatus: ["status"],

  idSelected: ["id"],

  addVehicle: ["data"],
  getInfoVehicle: ["id"],
  getInfoVehicleExtension: ["id"],
  setInfoVehicle: ["infoVehicle"],
  setInfoVehicleExtension: ["infoVehicleExtension"],
  setDataCsv: ["csvData"],
  vehicleTypeByLaw: ["data"],
  setPersonalIdSelect: ["personalId", "action"],
  setDevice: ["personalId", "action"],
  setDDvehicleBrand: ["DDVehicleBrand"],
  submitStatusVehicle: ["status", "ErrorSubcode"],

  setIdSelectVehicle: ["id", "action"],
});

export const VehicleTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  idSelected: null,
  id: null,
  action: null,
  typeForm: null,
  infoVehicle: null,
  infoProfile: null,
  infoVinno: null,
  infoVehicleExtension: null,
  infoVehicleData: null,
  csvData: null,
  infoAddProfile: null,
  loading: false,
  infoDelVehicle: null,
  vehicle: [
    {
      vehicleId: null,
      vinNo: null,
      status: null,
      dealerName: null,
      customerName: null,
      licensePlate: null,
      chassisNo: null,
      imei: null,
    },
  ],
  title: null,
  success: null,
  error: null,
  status: null,
  editStart: null,
  dropdownCustomer: null,
  dropdownVendor: null,
  dropdownVehicleProvince: null,
  dropdownVehicleType: null,
  dropdownVehicleTypeByLaw: null,
  dropdownVehicleBodyType: null,
  dropdownVehicleBodyTypeByLaw: null,
  dropdownVehicleModel: null,
  dropdownVehicleFuelType: null,
  dropdownVehicleStatus: null,
  dropdownVehicleBrand: null,
  DDVehicleBrand: null,
  formAction: {
    personalId: null,
    action: null,
  },
  formActionDevice: {
    personalId: null,
    action: null,
  },
  statusSubmit: {
    submitSuccess: false,
    status: true,
    ErrorSubcode: "",
  },
});

/* ------------- Reducers ------------- */

export const submitStatusVehicle = (state, { status, ErrorSubcode }) => {
  let statusSubmit = {
    status,
    ErrorSubcode,
  };
  return state.merge({ statusSubmit });
};

export const setDDvehicleBrand = (state, { DDVehicleBrand }) => {
  return state.merge({ DDVehicleBrand });
};

export const setIdSelectVehicle = (state, { id, action }) => {
  return state.merge({ id, action });
};

//Update Profile Screen
export const getProfile = (state) => {
  return state.merge({});
};

export const getDrop11 = (state) => {
  return state.merge({});
};

export const addProfile = (state) => {
  return state.merge({});
};

export const setProfile = (state, { infoProfile }) => {
  return state.merge({ infoProfile });
};

export const setAddProfile = (state, { infoAddProfile }) => {
  return state.merge({ infoAddProfile });
};

export const setDevice = (state, { personalId, action }) => {
  return state.merge({ formActionDevice: { personalId, action } });
};

export const setPersonalIdSelect = (state, { personalId, action }) => {
  return state.merge({ formAction: { personalId, action } });
};

export const updateVehicle = (state) => {
  return state.merge({});
};

export const idSelected = (state, { id }) => {
  return state.merge({ idSelected: id });
};

export const submitStatus = (state, { status, ErrorSubcode, key }) => {
  let statusSubmit = {
    submitSuccess: true,
    status,
    ErrorSubcode,
    key,
  };
  return state.merge({ loading: false, statusSubmit });
};

export const deleteVehicle = (state) => {
  return state.merge({ loading: true });
  //  return state.merge({ fetching: true, messageError: null })
};
export const setdeleteVehicleSuccess = (state, { infoDelVehicle }) => {
  return state.merge({ loading: false, infoDelVehicle });
  //  return state.merge({ fetching: true, messageError: null })
};

export const addVehicle = (state) => {
  return state.merge({});
};

export const getInfoVehicle = (state) => {
  return state.merge({});
};

export const editVehicle = (state, { id }) => {
  return state.merge({ id });
};
export const checkVinno = (state, { VehicleBrandId, VinNo }) => {
  return state.merge({ VehicleBrandId, VinNo });
};

export const setInfoVehicle = (state, { infoVehicle }) => {
  return state.merge({ infoVehicle });
};
export const getInfoVehicleExtension = (state) => {
  return state.merge({});
};

export const setInfoVehicleExtension = (state, { infoVehicleExtension }) => {
  return state.merge({ infoVehicleExtension });
};
///

export const setAddVehicleSuccess1 = (state) => {
  return state.merge({
    loading: false,
    error: null,
    success: "addSuccess",
    status: null,
  });
  // return this.props.history.push('/vehicle')
};

export const setListVehicle = (state) => {
  return state.merge({ typeForm: null, loading: true });
};

export const setListVehicleSuccess = (state, { vehicle }) => {
  return state.merge({ loading: false, vehicle });
};

export const setListVehicleFail = (state, { error }) => {
  return state.merge({ loading: false, error });
};

export const setAddVehicle = (
  state,
  {
    vinNo,
    vehicleName,
    vehicleBrand,
    vehicleModel,
    vehicleSpecCode,
    chassisNo,
    speedLimit,
    licensePlateNo,
    licensePlace,
    licenseDate,
    customerId,
  }
) => {
  return state.merge({ loading: true });
};

export const setAddVehicleSuccess = (state) => {
  return state.merge({ typeForm: null });
};
export const setSuccess = (state) => {
  return state.merge({ typeForm: null });
};

export const setVehicleTypeSuccess = (state, { data, name }) => {
  if (name === "Vendor") return state.merge({ dropdownVendor: data });
  if (name === "Customer") return state.merge({ dropdownCustomer: data });
  if (name === "VehicleProvince")
    return state.merge({ dropdownVehicleProvince: data });
  if (name === "VehicleType") return state.merge({ dropdownVehicleType: data });
  if (name === "VehicleTypeByLaw")
    return state.merge({ dropdownVehicleTypeByLaw: data });
  if (name === "VehicleBodyType")
    return state.merge({ dropdownVehicleBodyType: data });
  if (name === "VehicleBodyTypeByLaw")
    return state.merge({ dropdownVehicleBodyTypeByLaw: data });
  if (name === "VehicleModel")
    return state.merge({ dropdownVehicleModel: data });
  if (name === "VehicleFuelType")
    return state.merge({ dropdownVehicleFuelType: data });
  if (name === "VehicleStatus")
    return state.merge({ dropdownVehicleStatus: data });
  if (name === "VehicleBrand")
    return state.merge({ dropdownVehicleBrand: data });

  // infoVinno
};

export const setAddVehicleSuccess2 = (state) => {
  return this.props.history.push("/vehicle");
};

export const setAddVehicleFail = (state, { error }) => {
  return state.merge({ loading: false, error });
};

// export const setEditVehicleStart = (state,{ vinNo, vehicleName, vehicleBrand, vehicleModel, vehicleSpecCode, chassisNo, speedLimit, licensePlateNo, licensePlace, licenseDate, customerId }) => {
//     return state.merge({ })
// }

// export const setEditVehicleStart = (state, { editStart }) => {
//   return state.merge({ editStart })
// }

// export const setEditVehicleEnd = (state,{ id , vinNo, vehicleName, vehicleBrand, vehicleModel, vehicleSpecCode, chassisNo, speedLimit, licensePlateNo, licensePlace, licenseDate, customerId }) => {
//     return state.merge({ loading: true })
// }

export const setEditVehicleSuccess1 = (state) => {
  return state.merge({
    loading: false,
    error: null,
    success: "editSuccess",
    status: null,
  });
  // return this.props.history.push('/vehicle')
};

export const setVinSuccess1 = (state, { infoVinno }) => {
  return state.merge({
    infoVinno,
    loading: false,
    error: null,
    success: "Success",
    status: null,
  });
  // return this.props.history.push('/vehicle')
};

// ex edit from
// export const setPersonalIdSelect = (state, { personalId, action }) => {
//   return state.merge({ formAction: { personalId, action } })
// }

export const setEditVehicleSuccess2 = (state) => {
  return this.props.history.push("/vehicle");
};

export const setEditVehicleFail = (state, { error }) => {
  return state.merge({ loading: false, error });
};

export const setVehicleStatus = (state, { status }) => {
  return state.merge({ status });
};

export const setVehicleSuccess = (state) => {
  return state.merge({ success: null, status: null });
};
//#endregion

export const setDataCsv = (state, { csvData }) => {
  return state.merge({ csvData });
};

export const vehicleTypeByLaw = (state, { data }) => {
  return state.merge({});
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SUBMIT_STATUS_VEHICLE]: submitStatusVehicle,

  [Types.SET_PERSONAL_ID_SELECT]: setPersonalIdSelect,
  [Types.SET_DEVICE]: setDevice,
  [Types.ID_SELECTED]: idSelected,
  [Types.GET_INFO_VEHICLE]: getInfoVehicle,
  [Types.GET_DROP11]: getDrop11,
  [Types.SET_INFO_VEHICLE]: setInfoVehicle,
  [Types.GET_INFO_VEHICLE_EXTENSION]: getInfoVehicleExtension,
  [Types.SET_INFO_VEHICLE_EXTENSION]: setInfoVehicleExtension,
  [Types.DELETE_VEHICLE]: deleteVehicle,
  [Types.SETDELETE_VEHICLE_SUCCESS]: setdeleteVehicleSuccess,
  [Types.UPDATE_VEHICLE]: updateVehicle,

  [Types.SET_LIST_VEHICLE]: setListVehicle,
  [Types.SET_LIST_VEHICLE_FAIL]: setListVehicleFail,
  [Types.SET_LIST_VEHICLE_SUCCESS]: setListVehicleSuccess,

  [Types.SET_ADD_VEHICLE]: setAddVehicle,
  [Types.SET_ADD_VEHICLE_FAIL]: setAddVehicleFail,
  [Types.SET_ADD_VEHICLE_SUCCESS]: setAddVehicleSuccess,
  [Types.SET_ADD_VEHICLE_SUCCESS1]: setAddVehicleSuccess1,
  [Types.SET_ADD_VEHICLE_SUCCESS2]: setAddVehicleSuccess2,

  // [Types.SET_EDIT_VEHICLE_START]: setEditVehicleStart,
  [Types.EDIT_VEHICLE]: editVehicle,
  [Types.CHECK_VINNO]: checkVinno,
  [Types.SET_EDIT_VEHICLE_FAIL]: setEditVehicleFail,
  [Types.SET_EDIT_VEHICLE_SUCCESS1]: setEditVehicleSuccess1,
  [Types.SET_VIN_SUCCESS1]: setVinSuccess1,

  [Types.SET_EDIT_VEHICLE_SUCCESS2]: setEditVehicleSuccess2,

  [Types.SET_VEHICLE_SUCCESS]: setVehicleSuccess,
  [Types.SET_VEHICLE_STATUS]: setVehicleStatus,

  [Types.ADD_VEHICLE]: addVehicle,
  [Types.SET_DATA_CSV]: setDataCsv,
  [Types.VEHICLE_TYPE_BY_LAW]: vehicleTypeByLaw,
  [Types.SET_VEHICLE_TYPE_SUCCESS]: setVehicleTypeSuccess,
  [Types.SUBMIT_STATUS]: submitStatus,

  [Types.SET_ID_SELECT_VEHICLE]: setIdSelectVehicle,

  //screen update profile
  [Types.GET_PROFILE]: getProfile,
  [Types.ADD_PROFILE]: addProfile,
  [Types.SET_PROFILE]: setProfile,
  [Types.SET_ADD_PROFILE]: setAddProfile,
  [Types.SET_D_DVEHICLE_BRAND]: setDDvehicleBrand,
});

import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setValues: ["name", "value"],
  setGeofTypes: ["geofenceByTypes"],
  setMapControlGeofences: ["id", "value"],
  setStatesGeofencesRedux: ["obj"],
  setFormData: ["filedName", "value", "isSubObject"],
  setFormDataEdit: ["data"],
  clearDataForm: [],
});

export const GeofencesTypes = Types;

export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  //#region Common
  isFormSetting: false,
  geofenceByTypes: [],
  stateMapControl: {},
  isLoadingGeofence: {
    visible: false,
    type: 5,
  },
  isReloadPresetIcon: false,
  //#endregion

  //#region GeofenceList Page
  dataSource: [],
  geofenceDisplay: [],
  //#endregion

  //#region GeofenceForm Page
  geofenceId: "",
  coordinates: [],
  isDrawing: false,
  shapeDetail: null,
  shapeDefault: null,
  colorShape: "#000000",
  presetIconList: [],
  geomType: "1",
  editGeofenceId: "",
  geofenceTypeList: [],
  geomTypeList: [],
  iconMarker: null,
  fileUplaod: null,
  previewFileUpload: "",
  iconPreview: {
    isUrl: false,
    url: "",
    base64Data: "",
    filedName: "",
    isCustomUnion: { shape: false, icon: false },
  },
  iconGeofenceType: 1, // 1 : upload, 2 : preset, 3 : custom
  coordinatesText: "",
  coordinatesRef: "",
  dataForm: {
    user_id: "",
    geofence_name: "",
    geofence_description: "",
    geofence_type: "",
    geom_type: "",
    radius: 10,
    coordinate: [],
    icon_attach_id: 0,
    is_share: false,
    is_preset: false,
    is_hazard: false, // Geofence Tpye = 2, 7
    active_status: "A", // A = Active , I = Inactive
    alert_status: false,
    alert: {
      in_geofence: false,
      out_geofence: false,
      overtime_stay_visible: false,
      overtime_stay: "",
      range_alert_time_visible: false,
      start_alert: "00:00",
      end_alert: "00:00",
      start_odo_visible: false,
      start_odo: 2000,
      speed_limit_visible: false,
      speed_limit: "",
      time_alert: false,
    },
    geofence_name_en: "",
    geofence_name_jp: "",
    geofence_description_en: "",
    geofence_description_jp: "",
    isNewAttach: false,
    geofence_code: "",
    geofence_code_ref: "",
    app_id: 2,
  },
  shapeEditCurrent: {
    geomType: "",
    radius: 10,
    center: { lat: 0, lng: 0 },
    paths: [],
  },
  validateSubmit: {
    geofenceName: { isErr: false, message: "" },
    geomType: { isErr: false, message: "" },
    coordinates: { isErr: false, message: "" },
    coordinatesRef: { isErr: false, message: "" },
    icon: { isErr: false, message: "" },
    alert: { isErr: false, message: "" },
    iconType: { isErr: false, message: "" },
    iconTemplate: { isErr: false, message: "" },
  },
  //#endregion
});

/* ------------- Reducers ------------- */
export const setValues = (state, { name, value }) => {
  return state.merge({ [name]: value });
};
export const setGeofTypes = (state, { geofenceByTypes }) => {
  return state.merge({ geofenceByTypes });
};
export const setMapControlGeofences = (state, { id, value }) => {
  let _stateMapControl = JSON.parse(JSON.stringify(state.stateMapControl));
  _stateMapControl[id] = value;
  return state.merge({ stateMapControl: _stateMapControl });
};
export const setStatesGeofencesRedux = (state, { obj }) => {
  return state.merge(obj);
};
export const setFormData = (
  state,
  { filedName, value, isSubObject = false }
) => {
  let data = JSON.parse(JSON.stringify(state.dataForm));
  if (isSubObject)
    data[filedName.split(".")[0]][filedName.split(".")[1]] = value;
  else data[filedName] = value;

  return state.merge({ dataForm: data });
};
export const setFormDataEdit = (state, { data }) => {
  let formData = { ...dataFormTemp };
  let assignData = Object.assign(formData, data);

  if (assignData.alert.in_geofence)
    assignData.alert.overtime_stay_visible = true;
  else assignData.alert.overtime_stay_visible = false;

  if (assignData.alert.time_alert)
    assignData.alert.range_alert_time_visible = true;
  else assignData.alert.range_alert_time_visible = false;

  if (assignData.alert.start_odo > 0) assignData.alert.start_odo_visible = true;

  if (assignData.alert.speed_limit > 0)
    assignData.alert.speed_limit_visible = true;

  if (!assignData.alert_status) assignData.alert.start_odo = 2000;

  return state.merge({ dataForm: assignData });
};

export const clearDataForm = (state) => {
  return state.merge({ dataForm: dataFormTemp });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_VALUES]: setValues,
  [Types.SET_GEOF_TYPES]: setGeofTypes,
  [Types.SET_MAP_CONTROL_GEOFENCES]: setMapControlGeofences,
  [Types.SET_STATES_GEOFENCES_REDUX]: setStatesGeofencesRedux,
  [Types.SET_FORM_DATA]: setFormData,
  [Types.SET_FORM_DATA_EDIT]: setFormDataEdit,
  [Types.CLEAR_DATA_FORM]: clearDataForm,
});

const dataFormTemp = {
  user_id: "",
  geofence_name: "",
  geofence_description: "",
  geofence_type: "",
  geom_type: "",
  radius: 10,
  coordinate: [],
  icon_attach_id: "",
  is_share: false,
  is_preset: false,
  is_hazard: false, // Geofence Tpye = 2, 7
  active_status: "A", // A = Active , I = Inactive
  alert_status: false,
  alert: {
    in_geofence: false,
    out_geofence: false,
    overtime_stay_visible: false,
    overtime_stay: "",
    range_alert_time_visible: false,
    start_alert: "00:00",
    end_alert: "00:00",
    start_odo_visible: false,
    start_odo: 2000,
    speed_limit_visible: false,
    speed_limit: "",
    time_alert: false,
  },
  geofence_name_en: "",
  geofence_name_jp: "",
  geofence_description_en: "",
  geofence_description_jp: "",
  isNewAttach: false,
  geofence_code: "",
  geofence_code_ref: "",
};

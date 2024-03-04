import { takeLatest, all } from "redux-saga/effects";
// import { AuthTypes } from '../Redux/AuthRedux'
// import { ListVehicleTypes } from "../Redux/ListVehicleRedux";

import API from "../Services";

/* ------------- Types ------------- */
// import { ListVehicleTypes } from "../Redux/ListVehicleRedux";
import { SigninTypes } from "../Redux/SigninRedux";
import { AlertSettingTypes } from "../Redux/AlertSettingRedux";
import { RealtimeTypes } from "../Redux/RealtimeRedux";
import { DashboardTypes } from "../Redux/DashboardRedux";
import { DriverTypes } from "../Redux/DriverRedux";
import { CustomerTypes } from "../Redux/CustomerRedux";
import { VehicleTypes } from "../Redux/VehicleRedux";
import { AuthTypes } from "../Redux/AuthRedux";
import { TestTypes } from "../Redux/TestRedux";
import { DealerTypes } from "../Redux/DealerRedux";
import { UserSettingTypes } from "../Redux/UserSettingRedux";
import { GeofenceTypes } from "../Redux/GeofenceRedux";
import { RoleSettingTypes, updatePermission } from "../Redux/RoleSettingRedux";
import { MessageTypes } from "../Redux/MessageRedux";
import { VersatileTypes } from "../Redux/VersatileRedux";
import { DrivingSettingsTypes } from "../Redux/DrivingSettingsRedux";
import { CargoLinkTypes } from "../Redux/CargoLinkRedux";
import { ModelTypes } from "../Redux/ModelRedux";
import { HistoryTypes } from "../Redux/HistoryRedux";
import { GPSUnitTypes } from "../Redux/GPSUnitRedux";
import { NotificationTypes } from "../Redux/NotificationRedux";
import { DropdownTypes } from "../Redux/DropdownRedux";
import { UserTypes } from "../Redux/UserRedux";
import { PasswordTypes } from "../Redux/PasswordRedux";
import { GeneralTypes } from "../Redux/GeneralRedux";
import { SubscriptionTypes } from "../Redux/SubscriptionRedux";
import { InstallingTypes } from "../Redux/InstallingRedux";
import { OtherReportTypes } from "../Redux/OtherReportRedux";
import { VehicleAllocationTypes } from "../Redux/VehicleAllocationRedux";
import { RealtimeNewTypes } from "../Redux/RealtimeNewRedux";
import { ControlRoomTypes } from "../Redux/ControlRoomRedux";
import { SummaryTypes } from "../Redux/SummaryRedux";
import { DrivingReportTypes } from "../Redux/DrivingReportRedux";

// import { signin } from './AuthSagas'
// import { signin2 } from './TestLoginSagas'
// import { getAllDealer, createDealerRequest, patchDealerRequest } from './DealerSagas'
// import { listVehicle } from './ListVehicleSagas'

/* ------------- Types ------------- */

/* ------------- Sagas ------------- */
import {
  signin,
  signinTractor,
  signout,
  signoutTractor,
  checkAgreement,
  getAgreement,
  putAgreement,
  getProfileAndMenu,
  refresh,
  refreshTractor,
  getPasswordPolicyAuth,
} from "./SigninSagas";

import {
  getDropdownAlertSetting,
  getDropdownUserDealer,
  getCriteria,
} from "./AlertSettingSagas";

import {
  getInitialTruckData,
  getInitialEventData,
  getEventDataForTruck,
  getGeofenceByTypes,
  getGeofenceDetail,
} from "./RealtimeSagas";

import { getInformationMarker, getGeofenceByType } from "./RealtimeNewSagas";

import {
  // addProfileSub,
  // getDropdownPackage,
  DltVehicleType,
  DltBodyType,
  CargolinkType,
  DocumentType,
  Package,
  PackageID,
  CustomerBY,
  getCustomer,
  getPay,
  MyDealers,
  getProfileSub,
  VerifyCust,
  VerifyPaymentCust,
  Map,
  Create,
  getSubscriber,
  postProfile,
  showSubscriber,
  putSubscriber,
  VerifySub,
  ItemCerticate,
  Signatures,
  ResendDlt,
  delSubscriber,
  ActiveGps,
  TableSub,
} from "./SubscriptionSaga";

// import { signup, signin } from './AuthSagas'
import {
  getDrop11,
  listVehicle,
  addVehicle,
  getProfile,
  editVehicle,
  checkVinno,
  getInfoVehicle,
  getInfoVehicleExtension,
  deleteVehicle,
  updateVehicle,
  vehicleTypeByLaw,
  addProfile,
} from "./VehicleSagas";
// import { signin } from './AuthSagas'
import {
  getInfoDealer,
  deleteDealer,
  createDealer,
  updateDealer,
} from "./DealerSagas";

import {getListUser} from "./TractorUserSagas";

// import { getAllDealer, listDealer, infoDealer, addDealer, deleteDealer, updateDealer, updateLocationDealer } from './DealerSagas'

// import { listVehicle } from './ListVehicleSagas'
import ListVehicle from "../Services/VehicleApi";

import {
  getInfoCustomer,
  deleteCustomer,
  createCustomer,
  updateCustomer,
  getOptionFormCustomer,
  checkCustomerStatus,
  subscriptionPrint,
  CertificatePrint,
} from "./CustomerSagas";

import {
  updateServiceStatus,
  updateIntegrationService,
} from "./InstallingSaga";

// import { createGroup, listPermission, listGroupPermission, permissionOfGroup } from './RoleSettingSagas'

import {
  getRoleGroup,
  addRoleGroup,
  getUser,
  addUser,
  addUserRoleGroup,
  removeUserRoleGroup,
  getUserGroup,
  addUserGroup,
} from "./UserSettingSagas";
import {
  createGroup,
  listPermission,
  listGroupPermission,
  updatePermissionForGroup,
} from "./RoleSettingSagas";

import {
  getSourceType,
  getPresentIcon,
  getDropdownPartnerName,
  getIconByGeofenceType,
  getDropdownGeofence,
  getDropdownGeofenceType,
  getGeofence,
  addGeofence,
  editGeofence,
  deleteGeofence,
  getGeofenceType,
  addGeofenceType,
  editGeofenceType,
  deleteGeofenceType,
  cloneGeofenceSharing,
  editGeofenceSharing,
  getGeofenceByTypesGeof,
} from "./GeofenceSagas";

import { getGeofenceByTypesSum, getGeofenceDetailSum } from "./SummarySagas";

import {
  getDriver,
  getExistingDriver,
  createDriver,
  getDriverProfile,
  updateDriver,
  deleteDriver,
  deleteDriverProfile,
  getInitialDriverData,
  getDrivingDetail,
  getMyVehicles,
} from "./DriverSagas";

import { callRealtimeApi, callDltApi, callPerDayApi } from "./DashboardSagas";

import { callReportApi } from "./ReportSagas";
import { getDataUser } from "./MessageSagas";

import {
  getDrivingBehaviorListRequest,
  getBehaviorCriteriaRequest,
  getBehaviorScoreRequest,
  getBehaviorScoreSummaryRequest,
  getBehaviorDrivingViewerIdRequest,
  updateBehaviorNameRequest,
  createBehaviorCriteriaSubkeyRequest,
  updateBehaviorScoreRequest,
  getBehaviorSubkeysRequest,
  updateCriteriaSettingRequest,
  // updateBehaviorDrivingViewerIdRequest,
} from "./DrivingSettingsSagas";
import { from } from "zen-observable";
// import GeofenceApi from '../Services/GeofenceApi'
import {
  getLanguageRequest,
  getDataDictionary,
  searchLocation,
  getLocation,
  getImageUrl,
} from "./VersatileSagas";
import {
  getCategoryTypeRequest,
  getClassTypeRequest,
  getEngineSeriesRequest,
} from "./ModelSagas";

import {
  getHistory,
  getListMember,
  getHistoryTrip,
  getHistoryGps,
} from "./HistorySagas";
import { getDataUnit } from "./GPSUnitSagas";

import {
  getEventData,
  getMessageCount,
  getDetailMessage,
} from "./NotificationSagas";

import {
  getDataDropdown,
  getDataDropdownLocation,
  getDataDropdownVehicle,
} from "./DropdownSaga";

import { login, getOrders } from "./CargoLinkSagas";

import {
  getUserSearch,
  resetAndUnlock,
  searchGridView,
  getUserManage,
  createUser,
  updateUser,
  deleteUser,
  getDropdownTable,
  getPermissionSummary,
  getUserCreateAndUpdate,
  getUserCreateAndUpdateOpt,
  getAgreementUser,
  getPasswordPolicy,
  getFileUserForm,
  sendEmailUserForm,
  getDealerToSendEmail,
} from "./UserSagas";

import {
  forgotPassword,
  confirmForgot,
  changePassword,
  respondChallenge,
} from "./PasswordSagas";

import {
  getInfoGeneral,
  updateInfoGeneral,
  getHistoryGeneral,
  updateFleet,
  createFleet,
  delFleet,
} from "./GeneralSagas";

import {
  getVehicles,
  getVehiclesMulti,
  getReportMenu,
  getFleet,
  getMasterData,
  getSummaryData,
  getDetailData,
  getInstall,
  getCustomer as getCustomerOtherReport,
} from "./OtherReportSaga";

import {
  getOwnerPartner,
  getListVehicles,
  getNewOwnerPartner,
  updateNewPartner,
} from "./VehicleAllocationSaga";

import { getDailyReports } from "./DrivingReportSagas";

import { takeEvery } from "redux-saga";
import { TractorUserTypes } from "../Redux/TractorUserRedux";

/* ------------- API ------------- */
const signinApi = API.Signin.create();
const signinTractorApi = API.SigninTractorApi.create();
const alertSettingApi = API.AlertSetting.create();

const dashboardApi = API.Dashboard.create();
const reportApi = API.Report.create();
const realtimeApi = API.Realtime.create();
const realtimeNewApi = API.RealtimeNew.create();
// const authApi = API.Auth.create()
const vehicleApi = API.Vehicle.create();
const SubscriptionApi = API.Subscription.create();
// const addVehicleApi = API.Vehicle.create()
// const editVehicleApi = API.Vehicle.create()
const cargoLinkApi = API.CargoLink.create();

const driverApi = API.Driver.create();
// const vehicleApi = API.ListVehicle.create()
const dealerApi = API.Dealer.create();

const customerApi = API.Customer.create();
const versatileApi = API.Versatile.create();

const userSettingApi = API.UserSetting.create();
const roleSettingApi = API.RoleSetting.create();
const MessageApi = API.Message.create();

const geofenceApi = API.Geofence.create();
const drivingSettingsApi = API.DrivingSettings.create();
const modelApi = API.Model.create();

const historyApi = API.History.create();
const gpsUnitApi = API.GPSUnit.create();
const notificationApi = API.GPSUnit.create();

const DropdownApi = API.Dropdown.create();
const UserApi = API.User.create();
const PasswordApi = API.Password.create();
const GeneralApi = API.General.create();
const InstallingApi = API.Installing.create();

const OtherReportApi = API.OtherReport.create();
const VehicleAllocationApi = API.VehicleAllocation.create();

const DrivingReportApi = API.DrivingReport.create();

//
const TractorApi = API.Tractor.create();


/* ------------- Connect Types To Sagas ------------- */

export default function* root(context = {}) {
  yield all([
    takeLatest(SigninTypes.SIGNIN, signin, signinApi),
    takeLatest(SigninTypes.SIGNIN_TRACTOR, signinTractor, signinTractorApi),
    takeLatest(SigninTypes.SIGNOUT, signout, signinApi),
    takeLatest(SigninTypes.SIGNOUT_TRACTOR, signoutTractor, signinTractorApi),
    takeLatest(SigninTypes.CHECK_AGREEMENT, checkAgreement, signinApi),
    takeLatest(SigninTypes.GET_AGREEMENT, getAgreement, signinApi),
    takeLatest(SigninTypes.PUT_AGREEMENT, putAgreement, signinApi),
    takeLatest(SigninTypes.GET_PROFILE_AND_MENU, getProfileAndMenu, signinApi),
    takeLatest(SigninTypes.REFRESH, refresh, signinApi),
    takeLatest(SigninTypes.REFRESH_TRACTOR, refreshTractor, signinTractorApi),
    takeLatest(
      SigninTypes.GET_PASSWORD_POLICY_AUTH,
      getPasswordPolicyAuth,
      signinApi
    ),

    takeLatest(
      AlertSettingTypes.GET_DROPDOWN_ALERT_SETTING,
      getDropdownAlertSetting,
      alertSettingApi
    ),
    // takeLatest(AlertSettingTypes.GET_DROPDOWN_USER_HMST, getDropdownUserHMST, alertSettingApi),
    takeLatest(
      AlertSettingTypes.GET_DROPDOWN_USER_DEALER,
      getDropdownUserDealer,
      alertSettingApi
    ),
    // takeLatest(AlertSettingTypes.GET_DROPDOWN_USER_CUSTOMER, getDropdownUserCustomer, alertSettingApi),
    takeLatest(AlertSettingTypes.GET_CRITERIA, getCriteria, alertSettingApi),

    takeLatest(
      SubscriptionTypes.DLT_VEHICLE_TYPE,
      DltVehicleType,
      SubscriptionApi
    ),
    takeLatest(SubscriptionTypes.DLT_BODY_TYPE, DltBodyType, SubscriptionApi),
    takeLatest(
      SubscriptionTypes.CARGOLINK_TYPE,
      CargolinkType,
      SubscriptionApi
    ),
    takeLatest(SubscriptionTypes.DOCUMENT_TYPE, DocumentType, SubscriptionApi),
    takeLatest(SubscriptionTypes.PACKAGE, Package, SubscriptionApi),
    takeLatest(SubscriptionTypes.PACKAGE_I_D, PackageID, SubscriptionApi),
    takeLatest(SubscriptionTypes.CUSTOMER_B_Y, CustomerBY, SubscriptionApi),
    takeLatest(SubscriptionTypes.GET_CUSTOMER, getCustomer, SubscriptionApi),
    takeLatest(SubscriptionTypes.GET_PAY, getPay, SubscriptionApi),
    takeLatest(SubscriptionTypes.MY_DEALERS, MyDealers, SubscriptionApi),
    takeLatest(
      SubscriptionTypes.GET_PROFILE_SUB,
      getProfileSub,
      SubscriptionApi
    ),
    takeLatest(SubscriptionTypes.VERIFY_CUST, VerifyCust, SubscriptionApi),
    takeLatest(
      SubscriptionTypes.VERIFY_PAYMENT_CUST,
      VerifyPaymentCust,
      SubscriptionApi
    ),
    takeLatest(SubscriptionTypes.MAP, Map, SubscriptionApi),
    takeLatest(SubscriptionTypes.CREATE, Create, SubscriptionApi),
    takeLatest(SubscriptionTypes.POST_PROFILE, postProfile, SubscriptionApi),
    takeLatest(
      SubscriptionTypes.SHOW_SUBSCRIBER,
      showSubscriber,
      SubscriptionApi
    ),
    takeLatest(
      SubscriptionTypes.PUT_SUBSCRIBER,
      putSubscriber,
      SubscriptionApi
    ),
    takeLatest(
      SubscriptionTypes.GET_SUBSCRIBER,
      getSubscriber,
      SubscriptionApi
    ),
    takeLatest(SubscriptionTypes.VERIFY_SUB, VerifySub, SubscriptionApi),
    takeLatest(
      SubscriptionTypes.ITEM_CERTICATE,
      ItemCerticate,
      SubscriptionApi
    ),
    takeLatest(SubscriptionTypes.SIGNATURES, Signatures, SubscriptionApi),
    takeLatest(SubscriptionTypes.RESEND_DLT, ResendDlt, SubscriptionApi),
    takeLatest(SubscriptionTypes.ACTIVE_GPS, ActiveGps, SubscriptionApi),
    takeLatest(
      SubscriptionTypes.DEL_SUBSCRIBER,
      delSubscriber,
      SubscriptionApi
    ),
    takeLatest(SubscriptionTypes.TABLE_SUB, TableSub, SubscriptionApi),

    // takeLatest(SigninTypes.REFRESH, refresh, signinApi),
    // takeLatest(SigninTypes.GET_CREDENTIAL, getCredential, signinApi),
    // takeLatest(SigninTypes.GET_HINO_ROLE, getHinoRole, signinApi),

    takeLatest(DashboardTypes.CALL_REALTIME_API, callRealtimeApi, dashboardApi),
    takeLatest(DashboardTypes.CALL_DLT_API, callDltApi, dashboardApi),
    //takeLatest(DashboardTypes.CALL_PERDAY_API, callPerDayApi, dashboardApi),

    //takeLatest(ReportTypes.CALL_REPORT_API, callReportApi, reportApi),

    takeLatest(
      VersatileTypes.GET_DATA_DICTIONARY,
      getDataDictionary,
      versatileApi
    ),
    takeLatest(VersatileTypes.SEARCH_LOCATION, searchLocation, versatileApi),
    takeLatest(VersatileTypes.GET_LOCATION, getLocation, versatileApi),
    takeLatest(VersatileTypes.GET_IMAGE_URL, getImageUrl, versatileApi),

    takeLatest(
      RealtimeTypes.GET_INITIAL_TRUCK_DATA,
      getInitialTruckData,
      realtimeApi
    ),
    takeLatest(
      RealtimeTypes.GET_INITIAL_EVENT_DATA,
      getInitialEventData,
      realtimeApi
    ),
    // takeLatest(RealtimeTypes.GET_INFORMATION, getInformation, realtimeApi),
    takeLatest(
      RealtimeTypes.GET_EVENT_DATA_FOR_TRUCK,
      getEventDataForTruck,
      realtimeApi
    ),
    takeLatest(
      RealtimeTypes.GET_GEOFENCE_BY_TYPES,
      getGeofenceByTypes,
      realtimeApi
    ),
    takeLatest(
      RealtimeTypes.GET_GEOFENCE_DETAIL,
      getGeofenceDetail,
      realtimeApi
    ),

    // takeLatest(ControlRoomTypes.GET_INFORMATION, getInformation, realtimeApi),

    takeLatest(CustomerTypes.GET_INFO_CUSTOMER, getInfoCustomer, customerApi),
    takeLatest(CustomerTypes.CREATE_CUSTOMER, createCustomer, customerApi),
    takeLatest(CustomerTypes.DELETE_CUSTOMER, deleteCustomer, customerApi),
    takeLatest(CustomerTypes.UPDATE_CUSTOMER, updateCustomer, customerApi),
    takeLatest(
      CustomerTypes.GET_OPTION_FORM_CUSTOMER,
      getOptionFormCustomer,
      customerApi
    ),
    takeLatest(
      CustomerTypes.CHECK_CUSTOMER_STATUS,
      checkCustomerStatus,
      customerApi
    ),
    takeLatest(
      CustomerTypes.SUBSCRIPTION_PRINT,
      subscriptionPrint,
      customerApi
    ),
    takeLatest(CustomerTypes.CERTIFICATE_PRINT, CertificatePrint, customerApi),

    takeLatest(DriverTypes.GET_DRIVER, getDriver, driverApi),
    takeLatest(DriverTypes.GET_EXISTING_DRIVER, getExistingDriver, driverApi),
    takeLatest(DriverTypes.CREATE_DRIVER, createDriver, driverApi),
    takeLatest(DriverTypes.GET_DRIVER_PROFILE, getDriverProfile, driverApi),
    takeLatest(DriverTypes.UPDATE_DRIVER, updateDriver, driverApi),
    takeLatest(DriverTypes.DELETE_DRIVER, deleteDriver, driverApi),
    takeLatest(
      DriverTypes.DELETE_DRIVER_PROFILE,
      deleteDriverProfile,
      driverApi
    ),
    takeLatest(DriverTypes.GET_DRIVING_DETAIL, getDrivingDetail, driverApi),
    takeLatest(DriverTypes.GET_MY_VEHICLES, getMyVehicles, driverApi),

    //////// Tractor user
    takeLatest(TractorUserTypes.GET_LIST_USER, getListUser, TractorApi),
    ////////

    takeLatest(VehicleTypes.SET_LIST_VEHICLE, listVehicle, vehicleApi),
    //takeLatest(VehicleTypes.SET_ADD_VEHICLE, addVehicle, vehicleApi),
    takeLatest(VehicleTypes.EDIT_VEHICLE, editVehicle, vehicleApi),
    takeEvery(VehicleTypes.CHECK_VINNO, checkVinno, vehicleApi),

    takeLatest(VehicleTypes.ADD_VEHICLE, addVehicle, vehicleApi),
    takeLatest(VehicleTypes.GET_INFO_VEHICLE, getInfoVehicle, vehicleApi),
    takeLatest(
      VehicleTypes.GET_INFO_VEHICLE_EXTENSION,
      getInfoVehicleExtension,
      vehicleApi
    ),
    takeLatest(VehicleTypes.DELETE_VEHICLE, deleteVehicle, vehicleApi),
    takeLatest(VehicleTypes.UPDATE_VEHICLE, updateVehicle, vehicleApi),
    takeLatest(VehicleTypes.VEHICLE_TYPE_BY_LAW, vehicleTypeByLaw, vehicleApi),
    takeLatest(VehicleTypes.VEHICLE_TYPE_BY_LAW, vehicleTypeByLaw, vehicleApi),

    //update Profile screen
    takeLatest(VehicleTypes.GET_PROFILE, getProfile, vehicleApi),
    takeLatest(VehicleTypes.GET_DROP11, getDrop11, vehicleApi),
    takeLatest(VehicleTypes.ADD_PROFILE, addProfile, vehicleApi),

    takeLatest(DealerTypes.GET_INFO_DEALER, getInfoDealer, dealerApi),
    takeLatest(DealerTypes.CREATE_DEALER, createDealer, dealerApi),
    takeLatest(DealerTypes.DELETE_DEALER, deleteDealer, dealerApi),
    takeLatest(DealerTypes.UPDATE_DEALER, updateDealer, dealerApi),

    takeLatest(
      RoleSettingTypes.LIST_PERMISSION,
      listPermission,
      roleSettingApi
    ),
    takeLatest(
      RoleSettingTypes.LIST_GROUP_PERMISSION,
      listGroupPermission,
      roleSettingApi
    ),

    takeLatest(UserSettingTypes.GET_ROLE_GROUP, getRoleGroup, userSettingApi),
    takeLatest(UserSettingTypes.ADD_ROLE_GROUP, addRoleGroup, userSettingApi),
    takeLatest(
      UserSettingTypes.ADD_USER_ROLE_GROUP,
      addUserRoleGroup,
      userSettingApi
    ),
    takeLatest(
      UserSettingTypes.REMOVE_USER_ROLE_GROUP,
      removeUserRoleGroup,
      userSettingApi
    ),
    takeLatest(UserSettingTypes.GET_USER, getUser, userSettingApi),
    takeLatest(UserSettingTypes.ADD_USER, addUser, userSettingApi),
    takeLatest(UserSettingTypes.GET_ROLE_GROUP, getRoleGroup, userSettingApi),
    takeLatest(UserSettingTypes.GET_USER_GROUP, getUserGroup, userSettingApi),

    takeLatest(HistoryTypes.GET_HISTORY, getHistory, historyApi),
    takeLatest(HistoryTypes.GET_LIST_MEMBER, getListMember, historyApi),
    takeLatest(HistoryTypes.GET_HISTORY_TRIP, getHistoryTrip, historyApi),
    takeEvery(HistoryTypes.GET_HISTORY_GPS, getHistoryGps, historyApi),

    takeLatest(GPSUnitTypes.GET_DATA_UNIT, getDataUnit, gpsUnitApi),
    //     takeLatest(UserSettingTypes.ADD_ROLE_GROUP, addRoleGroup, userSettingApi),
    //     takeLatest(UserSettingTypes.ADD_USER_ROLE_GROUP, addUserRoleGroup, userSettingApi),
    //     takeLatest(UserSettingTypes.REMOVE_USER_ROLE_GROUP, removeUserRoleGroup, userSettingApi),

    takeLatest(
      RoleSettingTypes.UPDATE_PERMISSION_FOR_GROUP,
      updatePermissionForGroup,
      roleSettingApi
    ),
    takeLatest(RoleSettingTypes.CREATE_GROUP, createGroup, roleSettingApi),

    takeLatest(MessageTypes.GET_DATA_USER, getDataUser, MessageApi),

    takeLatest(GeofenceTypes.GET_SOURCE_TYPE, getSourceType, geofenceApi),
    takeLatest(
      GeofenceTypes.GET_DROPDOWN_GEOFENCE,
      getDropdownGeofence,
      geofenceApi
    ),
    takeLatest(
      GeofenceTypes.GET_DROPDOWN_PARTNER_NAME,
      getDropdownPartnerName,
      geofenceApi
    ),
    takeLatest(
      GeofenceTypes.GET_DROPDOWN_GEOFENCE_TYPE,
      getDropdownGeofenceType,
      geofenceApi
    ),
    takeLatest(
      GeofenceTypes.GET_ICON_BY_GEOFENCE_TYPE,
      getIconByGeofenceType,
      geofenceApi
    ),
    takeLatest(GeofenceTypes.GET_GEOFENCE, getGeofence, geofenceApi),
    takeLatest(GeofenceTypes.GET_PRESENT_ICON, getPresentIcon, geofenceApi),
    takeLatest(GeofenceTypes.ADD_GEOFENCE, addGeofence, geofenceApi),
    takeLatest(GeofenceTypes.EDIT_GEOFENCE, editGeofence, geofenceApi),
    takeLatest(GeofenceTypes.DELETE_GEOFENCE, deleteGeofence, geofenceApi),
    takeLatest(GeofenceTypes.GET_GEOFENCE_TYPE, getGeofenceType, geofenceApi),
    takeLatest(GeofenceTypes.ADD_GEOFENCE_TYPE, addGeofenceType, geofenceApi),
    takeLatest(GeofenceTypes.EDIT_GEOFENCE_TYPE, editGeofenceType, geofenceApi),
    takeLatest(
      GeofenceTypes.DELETE_GEOFENCE_TYPE,
      deleteGeofenceType,
      geofenceApi
    ),
    takeLatest(
      GeofenceTypes.CLONE_GEOFENCE_SHARING,
      cloneGeofenceSharing,
      geofenceApi
    ),
    takeLatest(
      GeofenceTypes.EDIT_GEOFENCE_SHARING,
      editGeofenceSharing,
      geofenceApi
    ),

    takeLatest(
      GeofenceTypes.GET_GEOFENCE_BY_TYPES_GEOF,
      getGeofenceByTypesGeof,
      realtimeApi
    ),

    takeLatest(
      DrivingSettingsTypes.GET_DRIVING_BEHAVIOR_LIST,
      getDrivingBehaviorListRequest,
      drivingSettingsApi
    ),
    takeLatest(
      DrivingSettingsTypes.GET_BEHAVIOR_DRIVING_VIEWER_ID,
      getBehaviorDrivingViewerIdRequest,
      drivingSettingsApi
    ),
    // takeLatest(DrivingSettingsTypes.UPDATE_BEHAVIOR_DRIVING_VIEWER_ID, updateBehaviorDrivingViewerIdRequest, drivingSettingsApi),
    takeLatest(
      DrivingSettingsTypes.GET_BEHAVIOR_CRITERIA,
      getBehaviorCriteriaRequest,
      drivingSettingsApi
    ),
    takeLatest(
      DrivingSettingsTypes.GET_BEHAVIOR_SCORE,
      getBehaviorScoreRequest,
      drivingSettingsApi
    ),
    takeLatest(
      DrivingSettingsTypes.GET_BEHAVIOR_SCORE_SUMMARY,
      getBehaviorScoreSummaryRequest,
      drivingSettingsApi
    ),
    takeLatest(
      DrivingSettingsTypes.UPDATE_BEHAVIOR_NAME,
      updateBehaviorNameRequest,
      drivingSettingsApi
    ),
    takeLatest(
      DrivingSettingsTypes.CREATE_BEHAVIOR_CRITERIA_SUBKEY,
      createBehaviorCriteriaSubkeyRequest,
      drivingSettingsApi
    ),
    takeLatest(
      DrivingSettingsTypes.UPDATE_BEHAVIOR_SCORE,
      updateBehaviorScoreRequest,
      drivingSettingsApi
    ),
    takeLatest(
      DrivingSettingsTypes.GET_BEHAVIOR_SUBKEYS,
      getBehaviorSubkeysRequest,
      drivingSettingsApi
    ),
    takeLatest(
      DrivingSettingsTypes.UPDATE_CRITERIA_SETTING,
      updateCriteriaSettingRequest,
      drivingSettingsApi
    ),

    takeLatest(ModelTypes.GET_CATEGORY_TYPE, getCategoryTypeRequest, modelApi),
    takeLatest(ModelTypes.GET_CLASS_TYPE, getClassTypeRequest, modelApi),
    takeLatest(ModelTypes.GET_ENGINE_SERIES, getEngineSeriesRequest, modelApi),

    takeLatest(NotificationTypes.GET_EVENT_DATA, getEventData, notificationApi),
    takeLatest(
      NotificationTypes.GET_MESSAGE_COUNT,
      getMessageCount,
      notificationApi
    ),
    takeLatest(
      NotificationTypes.GET_DETAIL_MESSAGE,
      getDetailMessage,
      notificationApi
    ),

    takeEvery(DropdownTypes.GET_DATA_DROPDOWN, getDataDropdown, DropdownApi),
    takeEvery(
      DropdownTypes.GET_DATA_DROPDOWN_VEHICLE,
      getDataDropdownVehicle,
      DropdownApi
    ),
    takeEvery(
      DropdownTypes.GET_DATA_DROPDOWN_LOCATION,
      getDataDropdownLocation,
      DropdownApi
    ),

    takeEvery(UserTypes.RESET_AND_UNLOCK, resetAndUnlock, UserApi),
    takeEvery(UserTypes.GET_USER_SEARCH, getUserSearch, UserApi),
    takeLatest(UserTypes.SEARCH_GRID_VIEW, searchGridView, UserApi),
    takeLatest(UserTypes.GET_USER_MANAGE, getUserManage, UserApi),
    takeLatest(UserTypes.CREATE_USER, createUser, UserApi),
    takeLatest(UserTypes.UPDATE_USER, updateUser, UserApi),
    takeLatest(UserTypes.DELETE_USER, deleteUser, UserApi),
    takeEvery(UserTypes.GET_DROPDOWN_TABLE, getDropdownTable, UserApi),
    takeEvery(UserTypes.GET_PERMISSION_SUMMARY, getPermissionSummary, UserApi),
    takeEvery(
      UserTypes.GET_USER_CREATE_AND_UPDATE,
      getUserCreateAndUpdate,
      UserApi
    ),
    takeEvery(
      UserTypes.GET_USER_CREATE_AND_UPDATE_OPT,
      getUserCreateAndUpdateOpt,
      UserApi
    ),
    takeEvery(UserTypes.GET_AGREEMENT_USER, getAgreementUser, UserApi),
    takeLatest(UserTypes.GET_PASSWORD_POLICY, getPasswordPolicy, UserApi),
    takeLatest(UserTypes.GET_FILE_USER_FORM, getFileUserForm, UserApi),
    takeLatest(UserTypes.SEND_EMAIL_USER_FORM, sendEmailUserForm, UserApi),
    takeLatest(
      UserTypes.GET_DEALER_TO_SEND_EMAIL,
      getDealerToSendEmail,
      UserApi
    ),

    takeEvery(
      RealtimeTypes.GET_INITIAL_DRIVER_DATA,
      getInitialDriverData,
      driverApi
    ),

    takeLatest(CargoLinkTypes.SET_LOGIN, login, cargoLinkApi),
    takeLatest(CargoLinkTypes.GET_ORDERS, getOrders, cargoLinkApi),

    takeLatest(PasswordTypes.FORGOT_PASSWORD, forgotPassword, PasswordApi),
    takeLatest(PasswordTypes.CONFIRM_FORGOT, confirmForgot, PasswordApi),
    takeLatest(PasswordTypes.CHANGE_PASSWORD, changePassword, PasswordApi),
    takeLatest(PasswordTypes.RESPOND_CHALLENGE, respondChallenge, PasswordApi),

    takeLatest(GeneralTypes.GET_INFO_GENERAL, getInfoGeneral, GeneralApi),
    takeLatest(GeneralTypes.UPDATE_INFO_GENERAL, updateInfoGeneral, GeneralApi),
    takeLatest(GeneralTypes.UPDATE_FLEET, updateFleet, GeneralApi),
    takeLatest(GeneralTypes.CREATE_FLEET, createFleet, GeneralApi),
    takeLatest(GeneralTypes.DEL_FLEET, delFleet, GeneralApi),
    takeLatest(GeneralTypes.GET_HISTORY_GENERAL, getHistoryGeneral, GeneralApi),

    takeLatest(
      InstallingTypes.UPDATE_SERVICE_STATUS_REQUEST,
      updateServiceStatus,
      InstallingApi
    ),
    takeLatest(
      InstallingTypes.UPDATE_INTEGRATION_SERVICE_REQUEST,
      updateIntegrationService,
      InstallingApi
    ),

    takeLatest(OtherReportTypes.GET_VEHICLES, getVehicles, OtherReportApi),
    takeLatest(
      OtherReportTypes.GET_VEHICLES_MULTI,
      getVehiclesMulti,
      OtherReportApi
    ),
    takeLatest(OtherReportTypes.GET_REPORT_MENU, getReportMenu, OtherReportApi),
    takeLatest(OtherReportTypes.GET_FLEET, getFleet, OtherReportApi),
    takeLatest(OtherReportTypes.GET_MASTER_DATA, getMasterData, OtherReportApi),
    takeEvery(
      OtherReportTypes.GET_SUMMARY_DATA,
      getSummaryData,
      OtherReportApi
    ),
    takeLatest(OtherReportTypes.GET_DETAIL_DATA, getDetailData, OtherReportApi),
    takeEvery(OtherReportTypes.GET_INSTALL, getInstall, OtherReportApi),
    takeEvery(
      OtherReportTypes.GET_CUSTOMER_OTHER_REPORT,
      getCustomerOtherReport,
      OtherReportApi
    ),
    // takeLatest(OtherReportTypes.GET_DRIVING_MASTER, getDrivingMaster, OtherReportApi),
    // takeLatest(OtherReportTypes.GET_DRIVING, getDriving, OtherReportApi),

    takeLatest(
      VehicleAllocationTypes.GET_OWNER_PARTNER,
      getOwnerPartner,
      VehicleAllocationApi
    ),
    takeLatest(
      VehicleAllocationTypes.GET_LIST_VEHICLES,
      getListVehicles,
      VehicleAllocationApi
    ),
    takeLatest(
      VehicleAllocationTypes.GET_NEW_OWNER_PARTNER,
      getNewOwnerPartner,
      VehicleAllocationApi
    ),
    takeLatest(
      VehicleAllocationTypes.UPDATE_NEW_PARTNER,
      updateNewPartner,
      VehicleAllocationApi
    ),

    takeLatest(
      RealtimeNewTypes.GET_INFORMATION_MARKER,
      getInformationMarker,
      realtimeNewApi
    ),
    takeLatest(
      RealtimeNewTypes.GET_GEOFENCE_BY_TYPE,
      getGeofenceByType,
      realtimeNewApi
    ),
    takeLatest(
      SummaryTypes.GET_GEOFENCE_BY_TYPES_SUM,
      getGeofenceByTypesSum,
      realtimeApi
    ),
    takeLatest(
      SummaryTypes.GET_GEOFENCE_DETAIL_SUM,
      getGeofenceDetailSum,
      realtimeApi
    ),

    takeLatest(
      DrivingReportTypes.GET_DAILY_REPORTS,
      getDailyReports,
      DrivingReportApi
    ),
  ]);
}

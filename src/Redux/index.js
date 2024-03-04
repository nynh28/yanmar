import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import configureStore from "./CreateStore";
import rootSaga from "../Sagas/";
import { get } from "lodash";

// import { firebaseReducer } from 'react-redux-firebase'
// import { firestoreReducer } from 'redux-firestore'
// import firebase from 'firebase'
import ReduxPersist from "../Config/ReduxPersist";

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  // firebase: require('./FirebaseRedux').reducer,
  //   firebase: firebaseReducer,
  // firestore: firestoreReducer,
  //   product: require('./ProductRedux').reducer,
  //   profile: require('./ProfileRedux').reducer,
  //   start: require('./StartupRedux').reducer,
  //   category: require('./CategoriesRedux').reducer,
  alertSetting: require("./AlertSettingRedux").reducer,
  versatile: require("./VersatileRedux").reducer,
  // auth: require('./AuthRedux').reducer,
  signin: require("./SigninRedux").reducer,
  test: require("./TestRedux").reducer,
  vehicle: require("./VehicleRedux").reducer,
  tractorUser: require("./TractorUserRedux").reducer,
  subscription: require("./SubscriptionRedux").reducer,
  controlroom: require("./ControlRoomRedux").reducer,
  customer: require("./CustomerRedux").reducer,
  driver: require("./DriverRedux").reducer,
  dashboard: require("./DashboardRedux").reducer,
  report: require("./ReportRedux").reducer,
  dealer: require("./DealerRedux").reducer,
  userSetting: require("./UserSettingRedux").reducer,
  roleSetting: require("./RoleSettingRedux").reducer,
  message: require("./MessageRedux").reducer,
  formValidate: require("./FormValidateRedux").reducer,
  realtime: require("./RealtimeRedux").reducer,
  geofence: require("./GeofenceRedux").reducer,
  drivingsettings: require("./DrivingSettingsRedux").reducer,
  history: require("./HistoryRedux").reducer,
  gpsUnit: require("./GPSUnitRedux").reducer,
  model: require("./ModelRedux").reducer,
  notification: require("./NotificationRedux").reducer,
  dropdown: require("./DropdownRedux").reducer,
  cargolink: require("./CargoLinkRedux").reducer,
  user: require("./UserRedux").reducer,
  password: require("./PasswordRedux").reducer,
  general: require("./GeneralRedux").reducer,
  installing: require("./InstallingRedux").reducer,
  otherReport: require("./OtherReportRedux").reducer,
  vehicleAllocation: require("./VehicleAllocationRedux").reducer,
  realtimeNew: require("./RealtimeNewRedux").reducer,
  myVehicles: require("./MyVehiclesRedux").reducer,
  myDrivers: require("./MyDriversRedux").reducer,
  hmstDashboard: require("./HMSTdashboardRedux").reducer,
  dashboardMonitor: require("./DashboardMonitorRedux").reducer,
  analysisReport: require("./AnalysisReportRedux").reducer,
  common: require("./CommonRedux").reducer,
  summary: require("./SummaryRedux").reducer,
  maintenance: require("./MaintenanceRedux").reducer,
  drivingreport: require("./DrivingReportRedux").reducer,
  trackingHistory: require("./TrackingHistoryRedux").reducer,
  controlroomdealer: require("./ControlRoomDealerRedux").reducer,
  playback: require("./PlaybackRedux").reducer,
  insurance: require("./InsuranceRedux").reducer,
  maintenanceHistory: require("./MaintenanceHistoryRedux").reducer,
  drivingCompetition: require("./DrivingCompetitionRedux").reducer,
  geofenceReport: require("./GeofenceReportRedux").reducer,
  summaryNew: require("./SummaryNewRedux").reducer,
  geofences: require("./GeofencesRedux").reducer,
  banner: require("./BannerRedux").reducer,
});

export const rootReducer = (state, action) => {
  // console.log('action', action.type, get(state, 'signin.stateSignin'))
  if (action.type === "SIGNOUT_SUCCESS") state = undefined;
  else if (action.type === "SET_CONFIG") {
  } else if (action.type === "SIGNIN_SUCCESS") {
  } else if (get(state, "signin.dataForce") !== null) {
  } else if (get(state, "signin.stateSignin") === false) state = undefined;
  // else if (get(state, 'signin.stateSignin') === false && action.type !== "SIGNIN_SUCCESS") state = undefined

  // console.log('state', state)
  return reducers(state, action);
};

export default () => {
  let finalReducers = rootReducer;
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig;
    finalReducers = persistReducer(persistConfig, rootReducer);
  }

  let { store, persistor, sagasManager, sagaMiddleware } = configureStore(
    finalReducers,
    rootSaga,
    {
      // routerHistory: this.props.history
    }
  );

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require("./").reducers;
      store.replaceReducer(nextRootReducer);

      const newYieldedSagas = require("../Sagas").default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas);
      });
    });
  }

  return { store, persistor };
};

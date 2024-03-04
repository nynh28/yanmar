import immutablePersistenceTransform from "../Services/Store/ImmutablePersistenceTransform";
// import { AsyncStorage } from 'react-native'
import { localforage } from "localforage";
import storage from "redux-persist/lib/storage";

// More info here:  https://shift.infinite.red/shipping-persistant-reducers-7341691232b1
const REDUX_PERSIST = {
  active: true,
  reducerVersion: "1.0",
  storeConfig: {
    key: "primary",
    // storage: localforage,
    storage,
    // Reducer keys that you do NOT want stored to persistence here.
    // blacklist: ['auth'],
    // Optionally, just specify the keys you DO want stored to persistence.
    // An empty array means 'don't store any reducers' -> infinitered/ignite#409
    whitelist: [
      "profile",
      "customer",
      "driver",
      "dealer",
      "signin",
      "vehicle",
      "versatile",
      "user",
      "password",
      "subscription",
      "dropdown",
      "otherReport",
      "realtime",
      "notification",
      "common",
      "myVehicles",
      "myDrivers",
      "summary",
      "geofence",
      "maintenance",
      "drivingreport",
      "hmstDashboard",
      "trackingHistory",
      "insurance",
      "maintenanceHistory",
      "drivingCompetition",
      "geofenceReport",
      "realtimeNew",
      "summaryNew",
    ],
    // whitelist: ['profile', 'customer', 'driver', 'dealer', 'signin', 'vehicle', 'versatile', 'user', 'password', 'subscription', 'dropdown', 'realtime', 'notification'],
    transforms: [immutablePersistenceTransform],
  },
};

export default REDUX_PERSIST;

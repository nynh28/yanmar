import { call, put, select } from 'redux-saga/effects'
import RealtimeNewActions from '../Redux/RealtimeNewRedux'
import { get } from 'lodash'
import SidenavHeader from 'rsuite/lib/Sidenav/SidenavHeader'
const signinRedux = state => state.signin
const VersatileRedux = state => state.versatile
// const auth = state => state.signin

// Get Initial Truck Data
export function* getInitialVehiclesData(api, { }) {
  const signin = yield select(signinRedux)
  let header = {
    Authorization: signin.header.idToken,
    'X-API-Key': signin.header.redisKey
  }
  yield call(api.setHeader, header)
  let vehicles = [], LastEvaluatedKey
  // const response = yield call(api.getInitialVehiclesData, { user_id: signin.dataLogin.userId, page: 0, per_page: 2000 })
  const response = yield call(api.getInitialVehiclesData, { user_id: signin.dataLogin.userId, page: 0, per_page: 10000 })

  if (response.ok) {
    // vehicles.push(...response.data.vehicles)
    // LastEvaluatedKey = response.data.LastEvaluatedKey
    // while (LastEvaluatedKey) {
    //   let resp = yield call(api.getInitialVehiclesData, { user_id: signin.dataLogin.userId, page: LastEvaluatedKey.page, per_page: 2000 })
    //   if (resp.ok) {
    //     vehicles.push(...resp.data.vehicles)
    //     LastEvaluatedKey = resp.data.LastEvaluatedKey
    //   } else {
    //     break
    //   }

    // }
    // yield put(RealtimeNewActions.getInitialVehiclesDataSucc(vehicles))
    // console.log('response', response)
    yield put(RealtimeNewActions.getInitialVehiclesDataSucc(response.data))
  }
  else {
    yield put(RealtimeNewActions.getInitialVehiclesDataSucc([]))
  }

}

// Get Initial Truck Data
// Get Information
export function* getInformationMarker(api, { vid, callFrom }) {

  const signin = yield select(signinRedux)
  let header = {
    Authorization: signin.header.idToken,
    'X-API-Key': signin.header.redisKey
  }
  yield call(api.setHeader, header)

  // let data = {
  //   user_id: signin.dataLogin.userId,
  //   vid
  // }

  const response = yield call(api.getInformationMarker, vid)
  if (response.ok) {
    yield put(RealtimeNewActions.getInformationMarkerSucc(response.data, callFrom))
    // mockInfo.info.vid = vid
    // mockInfo.info.vehicle_name = vid == 18731 ? "0099001A41" : "DEMO-30G-555.68"
    // yield put(RealtimeNewActions.getInformationMarkerSucc(mockInfo, callFrom))
  }
  else {
    yield put(RealtimeNewActions.getInformationMarkerSucc({}, callFrom))
    // yield put(CustomerActions.loginFail('*username or password is incorrect'))
  }
}


// Get Geofence By Types
export function* getGeofenceByType(api, { GeofenceTypeIds }) {
  if (GeofenceTypeIds.length === 0) return yield put(RealtimeNewActions.setGeofenceByType([]))

  const signin = yield select(signinRedux)
  let header = {
    Authorization: signin.header.idToken,
    'X-API-Key': signin.header.redisKey
  }
  yield call(api.setHeader, header)

  let param = ""
  for (let index in GeofenceTypeIds) {
    if (param !== "") param += "&GeofenceTypeIds=" + GeofenceTypeIds[index]
    else param += "GeofenceTypeIds=" + GeofenceTypeIds[index]
  }

  const response = yield call(api.getGeofenceByType, param)

  if (response.ok) {
    yield put(RealtimeNewActions.setGeofenceByType(response.data.geofenceByTypes))
  }
  else {
    return yield put(RealtimeNewActions.setGeofenceByType([]))
  }
}


const mockInfo = {
  "mdvr": {
    "terminal_number": "00990163D7",
    "camera_unit": 2,
    "main_stream": true,
    "sub_stream": true,
    "audio": true,
    "channel": [
      {
        "channel": 1,
        "label_name": "CHANNEL 1",
        "url": "https://vimeo.com/90509568"
      },
      {
        "channel": 2,
        "label_name": "CHANNEL 2",
        "url": "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"
      },
      {
        "channel": 3,
        "label_name": "CHANNEL 3",
        "url": "https://soundcloud.com/miami-nights-1984/accelerated"
      },
      {
        "channel": 4,
        "label_name": "CHANNEL 4",
        "url": "https://home.wistia.com/medias/bq6epni33s"
      },
      {
        "channel": 5,
        "label_name": "CHANNEL 5",
        "url": "https://video.vidyard.com/watch/BLXgYCDGfwU62vdMWybNVJ"
      }
    ]
  },
  "Maintenance": {
    "Insurance": "",
    "Next_service": 0,
    "Tires_Service": ""
  },
  "driver_cards": {
    "card_id": "",
    "name": "",
    "status_swipe_card": 0,
    "type_name": ""
  },
  "driving_count": {
    "driving": 0
  },
  "gps": {
    "acc": "f",
    "engine_hour": "0",
    "gpsdate": "",
    "gsm_level": 0,
    "gsm_per": 0,
    "image": {
      "class_type": 0,
      "course": 0,
      "status": 4
    },
    "io_time": "N/A",
    "lat": 0,
    "lng": 0,
    "location": {
      "admin_level1_name": "",
      "admin_level1_name_en": "",
      "admin_level2_name": "",
      "admin_level2_name_en": "",
      "admin_level3_name": "",
      "admin_level3_name_en": ""
    },
    "sattellite_level": 0,
    "sattellite_per": 0,
    "speed": 0
  },
  "info": {
    "licenseplate": "30G-555.68",
    "model_code": "",
    "odo": "",
    "vehicle_name": "DEMO-30G-555.68",
    "vehicle_type_id": 2,
    "vid": 18554,
    "vin_no": "DEMO-30G-555.68"
  },
  "sensor": {
    "canbus": {
      "acc_pedal": 0,
      "clutch_switch": "-",
      "cooltemp": 0,
      "exhaust_brake": "-",
      "foot_brake": "0",
      "fuel_per": 0,
      "fuel_rate": "",
      "rpm": 0
    },
    "device_batt": 0,
    "device_batt_level": 1,
    "options": {
      "door_sensor": "-",
      "pto": "-",
      "safety_belt": "-"
    },
    "temperatures": {
      "sensor1": "0.0",
      "sensor2": "-",
      "sensor3": "-",
      "sensor4": "-"
    },
    "vehicle_batt": 0,
    "vehicle_batt_level": 1
  }
}

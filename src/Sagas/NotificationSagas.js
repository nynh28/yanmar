import { call, put } from 'redux-saga/effects'
import NotificationActions from '../Redux/NotificationRedux'

const initialData = [
  {
    "id": 110000,
    "dtstart": "2019-11-25T01:23:48",
    "event_id": 9001,
    "event_name": "ความเร็วเกินกำหนด",
    "lat": 13.786947,
    "lng": 100.607727,
    "acc": "t",
    "speed": 120,
    "course": 321,
    "location": "คลองเจ้าคุณสิทห์ วังทองหลาง กรุงเทพ",
    "station_nearby": "บ.วันลิ้งค์",
    "notes": "",
    "vehicle_info": {
      "vid": 99999,
      "vin_no": "",
      "licenseplate": "10-1111",
      "vehicle_name": "VE01-1111"
    },
    "icons": {
      "icon_map": "green_w.gif",
      "color": "#FF0000"
    }
  },
  {
    "id": 120000,
    "dtstart": "2019-11-25T01:13:48",
    "event_id": 9001,
    "event_name": "ความเร็วเกินกำหนด",
    "lat": 13.786947,
    "lng": 100.607727,
    "acc": "t",
    "speed": 120,
    "course": 321,
    "location": "คลองเจ้าคุณสิทห์ วังทองหลาง กรุงเทพ",
    "station_nearby": "บ.วันลิ้งค์",
    "notes": "",
    "vehicle_info": {
      "vid": 99999,
      "vin_no": "",
      "licenseplate": "10-2222",
      "vehicle_name": "VE01-2222"
    },
    "icons": {
      "icon_map": "green_w.gif",
      "color": "#FF0000"
    }
  },
  {
    "id": 220000,
    "dtstart": "2019-11-24T01:23:48",
    "event_id": 9002,
    "event_name": "ความเร็วเกินกำหนด",
    "lat": 13.787956,
    "lng": 100.609166,
    "acc": "t",
    "speed": 110,
    "course": 321,
    "location": "คลองเจ้าคุณสิทห์ วังทองหลาง กรุงเทพ",
    "station_nearby": "บ.วันลิ้งค์",
    "notes": "",
    "vehicle_info": {
      "vid": 99999,
      "vin_no": "",
      "licenseplate": "20-2222",
      "vehicle_name": "VE02-2222"
    },
    "icons": {
      "icon_map": "green_w.gif",
      "color": "#FF0000"
    }
  },
  {
    "id": 330000,
    "dtstart": "2019-11-01T13:23:48",
    "event_id": 9003,
    "event_name": "Stop Duration",
    "lat": 13.786675,
    "lng": 100.609289,
    "acc": "t",
    "speed": 0,
    "course": 321,
    "location": "คลองเจ้าคุณสิทห์ วังทองหลาง กรุงเทพ",
    "station_nearby": "บ.วันลิ้งค์",
    "notes": "",
    "vehicle_info": {
      "vid": 99999,
      "vin_no": "",
      "licenseplate": "30-3333",
      "vehicle_name": "VE03-3333"
    },
    "icons": {
      "icon_map": "green_w.gif",
      "color": "#FF0000"
    }
  },
  {
    "id": 440000,
    "dtstart": "2019-09-15T23:12:41",
    "event_id": 9034,
    "event_name": "Stop Duration",
    "lat": 13.813327,
    "lng": 100.560161,
    "acc": "t",
    "speed": 0,
    "course": 321,
    "location": "คลองเจ้าคุณสิทห์ วังทองหลาง กรุงเทพ",
    "station_nearby": "บ.วันลิ้งค์",
    "notes": "",
    "vehicle_info": {
      "vid": 99999,
      "vin_no": "",
      "licenseplate": "40-4444",
      "vehicle_name": "VE04-4444"
    },
    "icons": {
      "icon_map": "green_w.gif",
      "color": "#FF0000"
    }
  },
  {
    "id": 550000,
    "dtstart": "2019-09-15T10:40:00",
    "event_id": 9054,
    "event_name": "Stop Duration",
    "lat": 13.764741,
    "lng": 100.539084,
    "acc": "t",
    "speed": 0,
    "course": 321,
    "location": "คลองเจ้าคุณสิทห์ วังทองหลาง กรุงเทพ",
    "station_nearby": "บ.วันลิ้งค์",
    "notes": "",
    "vehicle_info": {
      "vid": 99999,
      "vin_no": "",
      "licenseplate": "50-5555",
      "vehicle_name": "VE05-5555"
    },
    "icons": {
      "icon_map": "green_w.gif",
      "color": "#FF0000"
    }
  },
  {
    "id": 660000,
    "dtstart": "2019-09-14T13:23:48",
    "event_id": 9094,
    "event_name": "Stop Duration",
    "lat": 13.899003,
    "lng": 100.5436,
    "acc": "t",
    "speed": 0,
    "course": 321,
    "location": "คลองเจ้าคุณสิทห์ วังทองหลาง กรุงเทพ",
    "station_nearby": "บ.วันลิ้งค์",
    "notes": "",
    "vehicle_info": {
      "vid": 99999,
      "vin_no": "",
      "licenseplate": "60-6666",
      "vehicle_name": "VE06-666666"
    },
    "icons": {
      "icon_map": "green_w.gif",
      "color": "#FF0000"
    }
  }
]

export function* getDataUser(api, { id, groupType }) {



}


export function* getEventData(api, { }) {
  // MOCKUP DATA

  yield put(NotificationActions.getEventDataSuccess(initialData))

  // const response = yield call(api.getInitialEventData)
  // if (response.ok) {
  //   yield put(RealtimeActions.setInitialEventData(response.data.events))
  // }
  // else {
  //   // yield put(CustomerActions.loginFail('*username or password is incorrect'))
  // }

}

export function* getMessageCount(api, { }) {
  // MOCKUP DATA

  // const response = yield call(api.getInitialEventData)
  // if (response.ok) {
  yield put(NotificationActions.getMessageCountSuccess(1))
  // }
  // else {
  //   // yield put(CustomerActions.loginFail('*username or password is incorrect'))
  // }

}

export function* getDetailMessage(api, { id }) {


  let data = initialData.find((item) => item.id === id)

  // const response = yield call(api.getInitialEventData)
  // if (response.ok) {
  yield put(NotificationActions.getDetailMessageSuccess(data))
  // }
  // else {
  //   // yield put(CustomerActions.loginFail('*username or password is incorrect'))
  // }

}

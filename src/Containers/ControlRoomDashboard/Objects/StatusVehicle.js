import { get } from 'lodash'
import moment from 'moment-timezone';
import { momentDate } from '../../../Functions/DateMoment'
// export function statusColor(striDate, format = 'DD/MM/YYYY HH:mm:ss', nameTimeZone = 'Asia/Bangkok', lang = 'en') {
//   get(device, 'acc', '') === 't' ? get(device, 'speed', 0) <= 2 ? 'Idling' : 'Driving' : 'Parking'
//   return 'color'
// }

export function statusColor(device) {


  // console.log("statusColor :", device)

  let color = ''
  let acc = get(device, 'acc', '')
  let speed = get(device, 'speed', 0)
  let speed_limit = get(device, 'speed_limit', 0)
  let gpsdate = momentDate(get(device, 'gpsdate'))
  let OverRPM = get(device, 'alarm.OverRPM', 0)

  if (!moment(gpsdate, 'DD/MM/YYYY HH:mm:ss').isAfter(moment().subtract(15, 'minutes'))) color = '#ADADB2'
  else if (acc === 't') {
    if (speed_limit > 0 && speed > speed_limit) color = '#5856d6'
    else if (speed <= 2) color = 'rgb(255, 230, 0)'
    else color = 'rgb(93, 230, 72)'
  } else {
    color = '#ff3b30'
  }
  return color
}

export function statusName(device) {
  let name = ''
  let acc = get(device, 'acc', '')
  let speed = get(device, 'speed', 0)
  let speed_limit = get(device, 'speed_limit', 0)
  let gpsdate = momentDate(get(device, 'gpsdate'))
  let OverRPM = get(device, 'alarm.OverRPM', 0)

  if (!moment(gpsdate, 'DD/MM/YYYY HH:mm:ss').isAfter(moment().subtract(15, 'minutes'))) name = 'realtime_4'
  else if (acc === 't') {
    if (speed_limit > 0 && speed > speed_limit) name = 'realtime_5'
    else if (speed <= 2) name = 'realtime_3'
    else name = 'realtime_1'
  } else {
    name = 'realtime_2'
  }
  // console.log(gpsdate, name)
  return name
}


export function statusCar(device) {


  // console.log("statusCar :", device)



  let name = ''
  let acc = get(device, 'acc', '')
  let speed = get(device, 'speed', 0)
  let speed_limit = get(device, 'speed_limit', 0)
  let gpsdate = momentDate(get(device, 'gpsdate'))
  let OverRPM = get(device, 'alarm.OverRPM', 0)

  if (!moment(gpsdate, 'DD/MM/YYYY HH:mm:ss').isAfter(moment().subtract(15, 'minutes'))) name = 'Offline'
  else if (acc === 't') {
    if (speed_limit > 0 && speed > speed_limit) name = 'Overspeed'
    else if (speed <= 2) name = 'Idling'
    else name = 'Driving'
  } else {
    name = 'Parking'
  }
  return name
}

export function statusCarOld(device) {
  let name = ''
  let acc = get(device, 'gps.acc', '')
  let speed = get(device, 'gps.speed', 0)
  let speed_limit = get(device, 'info.speed_limit', 0)
  let gpsdate = momentDate(get(device, 'gps.gpsdate'))
  let OverRPM = get(device, 'alarm.OverRPM', 0)

  if (!moment(gpsdate, 'DD/MM/YYYY HH:mm:ss').isAfter(moment().subtract(15, 'minutes'))) name = 'Offline'
  else if (acc === 't') {
    if (speed_limit > 0 && speed > speed_limit) name = 'Overspeed'
    else if (speed <= 2) name = 'Idling'
    else name = 'Driving'
  } else {
    name = 'Parking'
  }
  return name
}

const status = [
  { color: '#ADADB2', name: 'Offline', car: 'Offline' },
  { color: '#5856d6', name: 'Overspeed', car: 'Overspeed' },
  { color: 'rgb(255, 230, 0)', name: 'Idling', car: 'Idling' },
  { color: 'rgb(93, 230, 72)', name: 'Driving', car: 'Driving' },
  { color: 'rgb(248, 108, 139)', name: 'Parking', car: 'Parking' },
]
export function setStatus(device, key) {
  let index
  let acc = get(device, 'acc', '')
  let speed = get(device, 'speed', 0)
  let speed_limit = get(device, 'speed_limit', 0)
  let gpsdate = momentDate(get(device, 'gpsdate'))
  let OverRPM = get(device, 'alarm.OverRPM', 0)

  if (!moment(gpsdate, 'DD/MM/YYYY HH:mm:ss').isAfter(moment().subtract(15, 'minutes'))) index = 0
  else if (acc === 't') {
    if (speed_limit > 0 && speed > speed_limit) index = 1
    else if (speed <= 2) index = 2
    else index = 3
  } else {
    index = 4
  }
  return status[index][key]
}

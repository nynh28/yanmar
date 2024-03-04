import { get, isEqual } from 'lodash'
import moment from 'moment-timezone';
import { momentDate } from '../../Functions/DateMoment'

export function statusCar(device) {
  // console.log("statusCar :", device)
  let name = ''
  let acc = get(device, 'acc', '')
  let speed = get(device, 'speed', 0)
  let speed_limit = get(device, 'speed_limit', 0)
  let gpsdate = momentDate(get(device, 'dtstart'))

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
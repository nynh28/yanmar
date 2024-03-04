import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'


const { Types, Creators } = createActions({
  calculateRealtime: ['data'],
  callRealtimeApi: [],
  callDltApi: [],
  calculateDlt: ['data'],
  callPerDayApi: [],
  calculatePerDay: ['data'],
})

export const DashboardTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  DoughnutData: [],
  DLTstandart: [],
  name: "",
})

/* ------------- Reducers ------------- */
export const callRealtimeApi = (state) => {
  return state.merge({})
}
export const callDltApi = (state) => {
  return state.merge({})
}
export const callPerDayApi = (state) => {
  return state.merge({})
}
export const calculateRealtime = (state, { data }) => {
  var vehicle = data.vehicles;
  var active = 0;
  var inactive = 0;
  var ignition = 0;
  var overspeed = 0;
  var parking = 0;
  vehicle.forEach((element, index) => {
    if (element.gps.acc == "t") {
      if (element.gps.speed > 0) {
        active++;
        ignition++;
        if (element.gps.speed > element.info.speed_limit) {
          overspeed++
        }
      }
      else {
        parking++
      }
    } else {
      inactive++;
    }

  });
  var object = [{
    name: 'Parking',
    val: (parking / ((inactive + active + ignition + overspeed + parking) / 100) / 100)
  },
  {
    name: 'Idling',
    val: (ignition / ((inactive + active + ignition + overspeed + parking) / 100) / 100)
  },
  {
    name: 'Driving',
    val: (active / ((inactive + active + ignition + overspeed + parking) / 100) / 100)
  },
  {
    name: 'Overspeed',
    val: (overspeed / ((inactive + active + ignition + overspeed + parking) / 100) / 100)
  },
  {
    name: 'Inactive',
    val: (inactive / ((inactive + active + ignition + overspeed + parking) / 100) / 100)
  }
  ]
  return state.merge({ DoughnutData: object })
}

export const calculateDlt = (state, { data }) => {
  var vehicle = data.vehicles;
  var unplug = 0;
  var overspeedbar = 0;
  vehicle.forEach((element, index) => {
    if (element.gps.speed > element.info.speed_limit) {
      overspeedbar++
    }
    if (element.sensor.batt_b <= 0) {
      unplug++
    } else {

    }

  });
  var object = [{
    name: 'Unplug',
    unplug: unplug
  }, {
    name: 'Overspeed',
    over: overspeedbar
  },

  ]
  return state.merge({ DLTstandart: object })
}

// export const calculatePerDay = (state, { data }) => {
//   console.log(data);
//   var vehicle = data.vehicles;
//   var active = 0;
//   var inactive = 0;
//   var ignition = 0;
//   var overspeed = 0;
//   var parking = 0;
//   vehicle.forEach((element,index)=>{
//     if(element.gps.acc == "t"){
//       if(element.gps.speed > 0){
//         active++;
//         ignition++;
//         if(element.gps.speed > element.info.speed_limit){
//           overspeed++
//         }
//       }
//       else {
//         parking++
//       }
//     }else {
//       inactive++;
//     }

//   });
//   var object = [{
//       name : 'Driving',
//       val : (active/((inactive+active+ignition+overspeed+parking)/100)/100)
//     },
//     {
//       name : 'Parking',
//       val : (parking/((inactive+active+ignition+overspeed+parking)/100)/100)
//     },
//     {
//       name : 'ignition',
//       val : (ignition/((inactive+active+ignition+overspeed+parking)/100)/100)
//     },
//     {
//       name : 'overspeed',
//       val : (overspeed/((inactive+active+ignition+overspeed+parking)/100)/100)
//     },
//     {
//       name : 'inactive',
//       val : (inactive/((inactive+active+ignition+overspeed+parking)/100)/100)
//     }
//   ]
//   return state.merge({DoughnutData : object })
// }


export const reducer = createReducer(INITIAL_STATE, {
  [Types.CALCULATE_REALTIME]: calculateRealtime,
  [Types.CALL_REALTIME_API]: callRealtimeApi,
  [Types.CALCULATE_DLT]: calculateDlt,
  [Types.CALL_DLT_API]: callDltApi,
  // [Types.CALCULATE_PERDAY]: calculatePerDay,
  // [Types.CALL_PERDAY_API]: callPerDayApi
});

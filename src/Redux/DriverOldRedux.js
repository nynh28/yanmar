import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setData: ['typeForm'],

  searchDrivers: ['id'],
  searchDriversSuccess: ['listdriver'],

  getDriversByID: ['id'],
  getDriversByIDSuccess: ['objData'],

  deleteDriversByID: ['bID', 'id'],

  createDriver: ['id', 'data'],
  updateDrivers: ['id', 'driver'],
  createAndUpdateDriverFail: [],


  searchLocationList: ['name', 'id'],
  searchLocationListSuccess: ['locationList'],

  getLocation: ['code'],
  getLocationSuccess: ['location'],


  getDictionary: [],
  getDictionarySuccess: ['dictionary'],


  setLoading: ['loading'],

  setDriverProfile: ['data'],

  setDataEditDriver: ['data'],

  getDriverDetail: ['id'],
  getDriverDetailSuc: ['data'],
  getDriverDetailFail: null,

  setRadarGraph: ['data', 'data2'],
  deleteSimulation: ['data'],

  //   signup: ['email', 'password'],
  //   signupSuccess: ['data'],
  //   signupFailure: ['error'],

})

export const DriverTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  objData: null,
  typeForm: null,
  //   signingUp: false,
  //   signupErrorMessage: null,

  data: null,

  listdriver: null,

  getIDSuccess: false,


  dictionary: null,

  locationList: [],

  location: null,

  loading: false,

  tmp_driver_profile: null,

  data_getDriverDetail: null,
  request_getDriverDetail: null,

  radar_graph1: null,
  radar_graph2: null,

})

/* ------------- Reducers ------------- */

export const deleteSimulation = (state, { data }) => {
  let tmp = JSON.parse(JSON.stringify(state.listdriver))
  tmp.map((e, i) => {
    if (data && data.customerDriverId) {
      if (e.customerDriverId == data.customerDriverId) {
        tmp.splice(i, 1)
      }
    }
  })
  return state.merge({ listdriver: tmp })
}

export const setRadarGraph = (state, { data, data2 }) => {
  return state.merge({ radar_graph1: data, radar_graph2: data2 })
}

export const getDriverDetail = (state) => state.merge({ request_getDriverDetail: true })
export const getDriverDetailSuc = (state, { data }) => state.merge({ request_getDriverDetail: false, data_getDriverDetail: data })
export const getDriverDetailFail = (state) => state.merge({ request_getDriverDetail: false })

export const setDriverProfile = (state, { data }) => state.merge({ tmp_driver_profile: data })

export const setData = (state, { typeForm }) => {
  return state.merge({ typeForm, objData: null, loading: false })
}


export const searchDrivers = (state) => {
  return state.merge({ typeForm: null, loading: false })
}

export const searchDriversSuccess = (state, { listdriver }) => {
  listdriver.forEach((e, i) => {
    e.ID = i + 1
    if (e.contact) {
      e.email = e.contact.email ? e.contact.email : ''
      e.lineID = e.contact.lineID ? e.contact.lineID : ''
      e.fax = e.contact.fax ? e.contact.fax : ''
      e.phone = e.contact.phone ? e.contact.phone : ''
      e.pic = i
    }
    if (e.drivingLicenseCard) {
      e.drivingCardNo = e.drivingLicenseCard.drivingCardNo ? e.drivingLicenseCard.drivingCardNo : ''
      e.drivingCardCountry = e.drivingLicenseCard.drivingCardCountry ? e.drivingLicenseCard.drivingCardCountry : ''
    }
    if (e.customerDriverId && e.customerDriverId == 67) {
      e.driverName = "Sompongs"
    }
    if (e.customerDriverId && e.customerDriverId == 66) {
      e.driverName = "Waynessa"
    }
    if (e.customerDriverId && e.customerDriverId == 65) {
      e.driverName = "Greyger"
    }
  })
  return state.merge({ listdriver })
}



export const getDriversByID = (state) => {
  return state.merge({})
}
export const getDriversByIDSuccess = (state, { objData }) => {
  return state.merge({ objData, typeForm: 'edit' })
}



export const deleteDriversByID = (state) => {
  return state.merge()
}
// export const deleteDriversByIDSuccess = (state,{objData}) => {
//   return state.merge({objData})
// }



export const createDriver = (state) => {
  return state.merge({ loading: true })
}
export const updateDrivers = (state) => {
  return state.merge({})
}

export const createAndUpdateDriverFail = (state) => {
  return state.merge({ loading: false })
}
// export const updateDriversSuccess = (state) => {
//     return state.merge({typeForm:null})
// }


export const searchLocationList = (state) => {
  return state.merge({})
}
export const searchLocationListSuccess = (state, { locationList }) => {
  return state.merge({ locationList })
}



export const getLocation = (state) => {
  return state.merge({})
}
export const getLocationSuccess = (state, { location }) => {
  return state.merge({ location })
}



export const getDictionary = (state) => {
  return state.merge({})
}
export const getDictionarySuccess = (state, { dictionary }) => {
  return state.merge({ dictionary })
}



export const setLoading = (state, { loading }) => {
  return state.merge({ loading })
}



export const setDataEditDriver = (state, { data }) => state.merge({ objData: data })






// export const signup = (state) => state.merge({ signingUp: true, signupErrorMessage: null })

// export const signupSuccess = (state, params) => {
//   let { data } = params
//   return state.merge({ signingUp: false, signupErrorMessage: null })
// }

// export const signupFailure = (state, params) => {
//   let { error } = params
//   return state.merge({ signupErrorMessage: error, signingUp: false })
// }


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_DATA]: setData,
  [Types.SEARCH_DRIVERS]: searchDrivers,
  [Types.SEARCH_DRIVERS_SUCCESS]: searchDriversSuccess,
  [Types.GET_DRIVERS_BY_I_D]: getDriversByID,
  [Types.GET_DRIVERS_BY_I_D_SUCCESS]: getDriversByIDSuccess,

  [Types.DELETE_DRIVERS_BY_I_D]: deleteDriversByID,

  [Types.CREATE_DRIVER]: createDriver,
  [Types.UPDATE_DRIVERS]: updateDrivers,
  [Types.CREATE_AND_UPDATE_DRIVER_FAIL]: createAndUpdateDriverFail,


  //[Types.SEARCH_LOCATION_LIST]: searchLocationList,
  //[Types.SEARCH_LOCATION_LIST_SUCCESS]: searchLocationListSuccess,

  //[Types.GET_LOCATION]: getLocation,
  //[Types.GET_LOCATION_SUCCESS]: getLocationSuccess,


  [Types.GET_DICTIONARY]: getDictionary,
  [Types.GET_DICTIONARY_SUCCESS]: getDictionarySuccess,





  [Types.SET_LOADING]: setLoading,
  [Types.SET_DRIVER_PROFILE]: setDriverProfile,
  [Types.SET_DATA_EDIT_DRIVER]: setDataEditDriver,
  //   [Types.SIGNUP_FAILURE]: signupFailure,

  [Types.GET_DRIVER_DETAIL]: getDriverDetail,
  [Types.GET_DRIVER_DETAIL_SUC]: getDriverDetailSuc,
  [Types.GET_DRIVER_DETAIL_FAIL]: getDriverDetailFail,

  [Types.SET_RADAR_GRAPH]: setRadarGraph,
  [Types.DELETE_SIMULATION]: deleteSimulation,
  //   [Types.SIGNUP_FAILURE]: signupFailure,

  //   [Types.SIGNUP]: signup,
  //   [Types.SIGNUP_SUCCESS]: signupSuccess,
  //   [Types.SIGNUP_FAILURE]: signupFailure,
})

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import moment from 'moment';
/* ------------- Types and Action Creators ------------- */
const todayStart = moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
const todayEnd = moment().set({ hour: 23, minute: 59, second: 59, millisecond: 59 })

const { Types, Creators } = createActions({
  setDefaultReduxSummary: [],
  setStateSummary: ['obj'],
  setRegion: ['id', 'value'],
  setFilterData: ['fieldName', 'value'],
  setStateReduxSummary: ['objState'],
  setValue: ['name', 'value']
})
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  // MAP OPTIONS
  defaultZoom: 5,
  defaultCenter: { lat: 13.786377, lng: 100.608755 },
  stateMapControl: {
    legendEnabled: true,
    clusterEnabled: true,
    objectEnabled: false,
    fitObjectEnabled: false,
    mapType: "roadmap",
    geofencesEnabled: [],
    dashboardEnabled: false,
    licensePlateEnabled: false,
    nameGeofEnabled: false
  },
  summaryData: [],


  // FILTER
  isLoadingSummary: false,
  isLoadingMap: false,
  filterSummary: {
    custID: [],
    region: [],
    dateRange: {
      dateStart: todayStart.format('DD/MM/YYYY'),
      dateEnd: todayEnd.format('DD/MM/YYYY')
    },
    dateDisplay: {
      Start: todayStart.format('DD/MM/YYYY'),
      End: todayEnd.format('DD/MM/YYYY')
    }
  },

  // DATA
  pointData: [],
  keepAgument: "",
  detailDaliy: [
    {
      "count": 0,
      "vehicle_list": []
    },
    {
      "count": 0,
      "vehicle_list": []
    },
    {
      "count": 0,
      "vehicle_list": []
    },
    {
      "count": 0,
      "vehicle_list": []
    },
    {
      "count": 0,
      "vehicle_list": []
    },
    {
      "count": 0,
      "vehicle_list": []
    }
  ],
  isWarning: false
})

/* ------------- Reducers ------------- */
export const setDefaultReduxSummary = (state, { }) => {
  return INITIAL_STATE
}

export const setStateSummary = (state, { obj }) => {
  return state.merge(obj)
}

export const setRegion = (state, { id, value }) => {
  return state.merge({ id, value })
}

export const setFilterData = (state, { fieldName, value }) => {
  let filterCurrent = { ...state.filterSummary, [fieldName]: value }
  return state.merge({ filterSummary: filterCurrent })
}

export const setStateReduxSummary = (state, { objState }) => {
  return state.merge(objState)
}
export const setValue = (state, { name, value }) => {
  return state.merge({
    [name]: value
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_DEFAULT_REDUX_SUMMARY]: setDefaultReduxSummary,
  [Types.SET_STATE_SUMMARY]: setStateSummary,
  [Types.SET_FILTER_DATA]: setFilterData,
  [Types.SET_REGION]: setRegion,
  [Types.SET_STATE_REDUX_SUMMARY]: setStateReduxSummary,
  [Types.SET_VALUE]: setValue
})

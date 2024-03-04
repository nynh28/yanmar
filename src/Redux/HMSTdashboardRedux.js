import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  filterDate: ['dateStart', 'dateEnd', 'year'],
  setYear: ['year'],
  setDataChart: ['data'],
  setDefaultReduxHmst: [],
  setListFilter: ['data'],
  setIsNotFilter: ['isNotFilter'],
  setExportFilter: ['data'],
  setValue: ['name', 'value'],
})

export const HmstDashboardTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  dateStart: "",
  dateEnd: "",
  year: "",
  isNotFilter: false,
  lstAct: [],
  monthName: [
    {
      id: 1,
      Month: 'Jan',
      monthTH: 'ม.ค.',
      monthEN: 'Jan',
      monthJA: '1月'
    },
    {
      id: 2,
      Month: 'Feb',
      monthTH: 'ก.พ.',
      monthEN: 'Feb',
      monthJA: '2月'
    },
    {
      id: 3,
      Month: 'Mar',
      monthTH: 'มี.ค.',
      monthEN: 'Mar',
      monthJA: '3月'
    },
    {
      id: 4,
      Month: 'Apr',
      monthTH: 'เม.ย.',
      monthEN: 'Apr',
      monthJA: '4月'
    },
    {
      id: 5,
      Month: 'May',
      monthTH: 'พ.ค.',
      monthEN: 'May',
      monthJA: '5月'
    },
    {
      id: 6,
      Month: 'Jun',
      monthTH: 'มิ.ย.',
      monthEN: 'Jun',
      monthJA: '6月'
    },
    {
      id: 7,
      Month: 'Jul',
      monthTH: 'ก.ค.',
      monthEN: 'Jul',
      monthJA: '7月'
    },
    {
      id: 8,
      Month: 'Aug',
      monthTH: 'ส.ค.',
      monthEN: 'Aug',
      monthJA: '8月'
    },
    {
      id: 9,
      Month: 'Sep',
      monthTH: 'ก.ย.',
      monthEN: 'Sep',
      monthJA: '9月'
    },
    {
      id: 10,
      Month: 'Oct',
      monthTH: 'ต.ค.',
      monthEN: 'Oct',
      monthJA: '10月'
    },
    {
      id: 11,
      Month: 'Nov',
      monthTH: 'พ.ย.',
      monthEN: 'Nov',
      monthJA: '11月'
    },
    {
      id: 12,
      Month: 'Dec',
      monthTH: 'ธ.ค.',
      monthEN: 'Dec',
      monthJA: '12月'
    },
  ],
  dataChart: {},
  exportFilter: {
    "businessType": [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "H",
      "W",
      "X",
      "Z"
    ],
    "classType": [
      "SS_SR",
      "GY",
      "FM",
      "FL",
      "FG",
      "FC",
      "XZU"
    ],
    "bodyType": [
      "A",
      "B",
      "C",
      "D1",
      "D2",
      "D3",
      "D4",
      "E1",
      "E2",
      "E3",
      "E4",
      "F",
      "G",
      "H",
      "I",
      "W",
      "X",
      "Z",
      "Z1",
      "Z2",
      "Z3",
      "Z4"
    ]
  },
  view: 0
})

/* ------------- Reducers ------------- */
export const filterDate = (state, { dateStart, dateEnd, year, isNotFilter }) => {
  return state.merge({ dateStart, dateEnd, year, isNotFilter })
}

export const setDataChart = (state, { data }) => {
  return state.merge({ dataChart: data })
}

export const setListFilter = (state, { data }) => {
  return state.merge({ lstAct: data })
}

export const setYear = (state, { year }) => {
  return state.merge({ year })
}

export const setIsNotFilter = (state, { isNotFilter }) => {
  return state.merge({ isNotFilter })
}

export const setExportFilter = (state, { data }) => {
  return state.merge({ exportFilter: data })
}

export const setValue = (state, { name, value }) => { return state.merge({ [name]: value }) }

export const setDefaultReduxHmst = (state, { }) => {
  return INITIAL_STATE
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FILTER_DATE]: filterDate,
  [Types.SET_DATA_CHART]: setDataChart,
  [Types.SET_LIST_FILTER]: setListFilter,
  [Types.SET_DEFAULT_REDUX_HMST]: setDefaultReduxHmst,
  [Types.SET_YEAR]: setYear,
  [Types.SET_IS_NOT_FILTER]: setIsNotFilter,
  [Types.SET_EXPORT_FILTER]: setExportFilter,
  [Types.SET_VALUE]: setValue
});
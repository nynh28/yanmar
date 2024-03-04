import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getDrivingBehaviorList: ['language'],
    getDrivingBehaviorListSuc: ['data'],
    getDrivingBehaviorListFail: null,

    getBehaviorDrivingViewerId: ['behavior_id'],
    getBehaviorDrivingViewerIdSuc: ['data'],
    getBehaviorDrivingViewerIdFail: null,

    updateBehaviorDrivingViewerId: ['behavior_name', 'driving_viewer_id'],
    updateBehaviorDrivingViewerIdSuc: ['data'],
    updateBehaviorDrivingViewerIdFail: null,

    getBehaviorCriteria: ['id'],
    getBehaviorCriteriaSuc: ['data'],
    getBehaviorCriteriaFail: null,

    getBehaviorScore: ['sub1', 'sub2', 'behaviorId'],
    getBehaviorScoreSuc: ['data'],
    getBehaviorScoreFail: null,

    getBehaviorScoreSummary: ['behavior_id'],
    getBehaviorScoreSummarySuc: ['data'],
    getBehaviorScoreSummaryFail: null,

    updateBehaviorName: ['behaviorId', 'drivingViewerId', 'behaviorNameEn', 'behaviorNameTh', 'behaviorNameJa'],
    updateBehaviorNameSuc: ['data'],
    updateBehaviorNameFail: null,

    createBehaviorCriteriaSubkey: ['behaviorCriteriaSettings'],
    createBehaviorCriteriaSubkeySuc: ['data'],
    createBehaviorCriteriaSubkeyFail: null,

    updateBehaviorScore: ['data'],
    updateBehaviorScoreSuc: ['data'],
    updateBehaviorScoreFail: null,

    getBehaviorSubkeys: ['behavior_id'],
    getBehaviorSubkeysSuc: ['data'],
    getBehaviorSubkeysFail: null,

    updateCriteriaSetting: ['data'],
    updateCriteriaSettingSuc: ['data'],
    updateCriteriaSettingFail: null,

    setMockSubKey: ['data'],

    clearDataCriteria: null,
    setBehaviorId: ['data'],
    setVisible1: ['data'],
    setVisible2: ['data'],
    setVisible3: ['data'],

})

export const DrivingSettingsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    data_getDrivingBehaviorList: null,
    request_getDrivingBehaviorList: null,

    request_getBehaviorDrivingViewerId: null,
    data_getBehaviorDrivingViewerId: null,

    request_updateBehaviorDrivingViewerId: null,
    data_updateBehaviorDrivingViewerId: null,

    request_getBehaviorCriteria: null,
    data_getBehaviorCriteria: null,

    request_getBehaviorScore: null,
    data_getBehaviorScore: null,

    request_getBehaviorScoreSummary: null,
    data_getBehaviorScoreSummary: null,

    request_updateBehaviorName: null,
    data_updateBehaviorName: null,

    request_createBehaviorCriteriaSubkey: null,
    data_createBehaviorCriteriaSubkey: null,

    request_updateBehaviorScore: null,
    data_updateBehaviorScore: null,

    request_getBehaviorSubkeys: null,
    data_getBehaviorSubkeys: null,

    request_updateCriteriaSetting: null,
    data_updateCriteriaSetting: null,

    mock_data_subkey: null,

    behaviorId: null,

    visible1: false,
    visible2: false,
    visible3: false,

})

/* ------------- Reducers ------------- */
export const setVisible1 = (state, {data}) => state.merge({ visible1: data})
export const setVisible2 = (state, {data}) => state.merge({ visible2: data})
export const setVisible3 = (state, {data}) => state.merge({ visible3: data})
export const setMockSubKey = (state, { data }) => state.merge({ mock_data_subkey: data })

export const setBehaviorId = (state, { data }) => {
    return state.merge({ behaviorId: data })
}

export const clearDataCriteria = (state) => state.merge({ data_getDrivingBehaviorList: null, data_getBehaviorCriteria: null, data_getBehaviorScore: null, data_getBehaviorScoreSummary: null, data_getBehaviorDrivingViewerId: null, mock_data_subkey: null, })

export const getDrivingBehaviorList = (state) => {
    return state.merge({ request_getDrivingBehaviorList: true })
}

export const getDrivingBehaviorListSuc = (state, { data }) => {
    return state.merge({ request_getDrivingBehaviorList: false, data_getDrivingBehaviorList: data })
}

export const getDrivingBehaviorListFail = (state) => {
    return state.merge({ request_getDrivingBehaviorList: false })
}

export const getBehaviorDrivingViewerId = (state) => {
    return state.merge({ request_getBehaviorDrivingViewerId: true })
}

export const getBehaviorDrivingViewerIdSuc = (state, { data }) => {
    return state.merge({ request_getBehaviorDrivingViewerId: false, data_getBehaviorDrivingViewerId: data })
}

export const getBehaviorDrivingViewerIdFail = (state) => {
    return state.merge({ request_getBehaviorDrivingViewerId: false })
}

export const updateBehaviorDrivingViewerId = (state) => {
    return state.merge({ request_updateBehaviorDrivingViewerId: true })
}

export const updateBehaviorDrivingViewerIdSuc = (state, { data }) => {
    return state.merge({ request_updateBehaviorDrivingViewerId: false, data_updateBehaviorDrivingViewerId: data })
}

export const updateBehaviorDrivingViewerIdFail = (state) => {
    return state.merge({ request_updateBehaviorDrivingViewerId: false })
}

export const getBehaviorCriteria = (state) => {
    return state.merge({ request_getBehaviorCriteria: true })
}

export const getBehaviorCriteriaSuc = (state, { data }) => {
    return state.merge({ request_getBehaviorCriteria: false, data_getBehaviorCriteria: data })
}

export const getBehaviorCriteriaFail = (state) => {
    return state.merge({ request_getBehaviorCriteria: false })
}

export const getBehaviorScore = (state) => {
    return state.merge({ request_getBehaviorScore: true })
}

export const getBehaviorScoreSuc = (state, { data }) => {
    return state.merge({ request_getBehaviorScore: false, data_getBehaviorScore: data })
}

export const getBehaviorScoreFail = (state) => {
    return state.merge({ request_getBehaviorScore: false })
}

export const getBehaviorScoreSummary = (state) => {
    return state.merge({ request_getBehaviorScoreSummary: true })
}

export const getBehaviorScoreSummarySuc = (state, { data }) => {
    return state.merge({ request_getBehaviorScoreSummary: false, data_getBehaviorScoreSummary: data })
}

export const getBehaviorScoreSummaryFail = (state) => {
    return state.merge({ request_getBehaviorScoreSummary: false })
}

export const updateBehaviorName = (state) => {
    return state.merge({ request_updateBehaviorName: true })
}

export const updateBehaviorNameSuc = (state, { data }) => {
    return state.merge({ request_updateBehaviorName: false, data_updateBehaviorName: data })
}

export const updateBehaviorNameFail = (state) => {
    return state.merge({ request_updateBehaviorName: false })
}

export const createBehaviorCriteriaSubkey = (state) => {
    return state.merge({ request_createBehaviorCriteriaSubkey: true })
}

export const createBehaviorCriteriaSubkeySuc = (state, { data }) => {
    return state.merge({ request_createBehaviorCriteriaSubkey: false, data_createBehaviorCriteriaSubkey: data })
}

export const createBehaviorCriteriaSubkeyFail = (state) => {
    return state.merge({ request_createBehaviorCriteriaSubkey: false })
}

export const updateBehaviorScore = (state) => state.merge({ request_updateBehaviorScore: true })
export const updateBehaviorScoreSuc = (state, { data }) => state.merge({ reuqest_updateBehaviorScore: false, data_updateBehaviorScore: data })
export const updateBehaviorScoreFail = (state) => state.merge({ request_updateBehaviorScore: false })

export const getBehaviorSubkeys = (state) => state.merge({ request_getBehaviorSubkeys: true })
export const getBehaviorSubkeysSuc = (state, { data }) => state.merge({ request_getBehaviorSubkeys: false, data_getBehaviorSubkeys: data })
export const getBehaviorSubkeysFail = (state) => state.merge({ request_getBehaviorSubkeys: false })

export const updateCriteriaSetting = (state) => {
    return state.merge({ request_updateCriteriaSetting: true })
}

export const updateCriteriaSettingSuc = (state, { data }) => {
    return state.merge({ request_updateCriteriaSetting: false, data_updateCriteriaSetting: data })
}

export const updateCriteriaSettingFail = (state) => {
    return state.merge({ request_updateCriteriaSetting: false })
}

// export const start = (state) => {
//     return state.merge({ request_: true })
// }

// export const Suc = (state, { data }) => {
//     return state.merge({ request_: false, data })
// }

// export const Fail = (state) => {
//     return state.merge({ request_: false })
// }

// export const start = (state) => {
//     return state.merge({ request_: true })
// }

// export const Suc = (state, { data }) => {
//     return state.merge({ request_: false, data })
// }

// export const Fail = (state) => {
//     return state.merge({ request_: false })
// }

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_DRIVING_BEHAVIOR_LIST]: getDrivingBehaviorList,
    [Types.GET_DRIVING_BEHAVIOR_LIST_SUC]: getDrivingBehaviorListSuc,
    [Types.GET_DRIVING_BEHAVIOR_LIST_FAIL]: getDrivingBehaviorListFail,

    [Types.GET_BEHAVIOR_DRIVING_VIEWER_ID]: getBehaviorDrivingViewerId,
    [Types.GET_BEHAVIOR_DRIVING_VIEWER_ID_SUC]: getBehaviorDrivingViewerIdSuc,
    [Types.GET_BEHAVIOR_DRIVING_VIEWER_ID_FAIL]: getBehaviorDrivingViewerIdFail,

    [Types.UPDATE_BEHAVIOR_DRIVING_VIEWER_ID]: updateBehaviorDrivingViewerId,
    [Types.UPDATE_BEHAVIOR_DRIVING_VIEWER_ID_SUC]: updateBehaviorDrivingViewerIdSuc,
    [Types.UPDATE_BEHAVIOR_DRIVING_VIEWER_ID_FAIL]: updateBehaviorDrivingViewerIdFail,

    [Types.GET_BEHAVIOR_CRITERIA]: getBehaviorCriteria,
    [Types.GET_BEHAVIOR_CRITERIA_SUC]: getBehaviorCriteriaSuc,
    [Types.GET_BEHAVIOR_CRITERIA_FAIL]: getBehaviorCriteriaFail,

    [Types.CLEAR_DATA_CRITERIA]: clearDataCriteria,

    [Types.GET_BEHAVIOR_SCORE]: getBehaviorScore,
    [Types.GET_BEHAVIOR_SCORE_SUC]: getBehaviorScoreSuc,
    [Types.GET_BEHAVIOR_SCORE_FAIL]: getBehaviorScoreFail,

    [Types.GET_BEHAVIOR_SCORE_SUMMARY]: getBehaviorScoreSummary,
    [Types.GET_BEHAVIOR_SCORE_SUMMARY_SUC]: getBehaviorScoreSummarySuc,
    [Types.GET_BEHAVIOR_SCORE_SUMMARY_FAIL]: getBehaviorScoreSummaryFail,

    [Types.SET_BEHAVIOR_ID]: setBehaviorId,

    [Types.UPDATE_BEHAVIOR_NAME]: updateBehaviorName,
    [Types.UPDATE_BEHAVIOR_NAME_SUC]: updateBehaviorNameSuc,
    [Types.UPDATE_BEHAVIOR_NAME_FAIL]: updateBehaviorNameFail,

    [Types.CREATE_BEHAVIOR_CRITERIA_SUBKEY]: createBehaviorCriteriaSubkey,
    [Types.CREATE_BEHAVIOR_CRITERIA_SUBKEY_SUC]: createBehaviorCriteriaSubkeySuc,
    [Types.CREATE_BEHAVIOR_CRITERIA_SUBKEY_FAIL]: createBehaviorCriteriaSubkeyFail,

    [Types.UPDATE_BEHAVIOR_SCORE]: updateBehaviorScore,
    [Types.UPDATE_BEHAVIOR_SCORE_SUC]: updateBehaviorScoreSuc,
    [Types.UPDATE_BEHAVIOR_SCORE_FAIL]: updateBehaviorScoreFail,

    [Types.GET_BEHAVIOR_SUBKEYS]: getBehaviorSubkeys,
    [Types.GET_BEHAVIOR_SUBKEYS_SUC]: getBehaviorSubkeysSuc,
    [Types.GET_BEHAVIOR_SUBKEYS_FAIL]: getBehaviorSubkeysFail,

    [Types.SET_MOCK_SUB_KEY]: setMockSubKey,

    [Types.UPDATE_CRITERIA_SETTING]: updateCriteriaSetting,
    [Types.UPDATE_CRITERIA_SETTING_SUC]: updateCriteriaSettingSuc,
    [Types.UPDATE_CRITERIA_SETTING_FAIL]: updateCriteriaSettingFail,

      [Types.SET_VISIBLE1]: setVisible1,
      [Types.SET_VISIBLE2]: setVisible2,
      [Types.SET_VISIBLE3]: setVisible3,

    //   [Types._]: ssttaarrtt,
    //   [Types._SUC]: Suc,
    //   [Types._FAIL]: Fail,
    //   [Types._]: ssttaarrtt,
    //   [Types._SUC]: Suc,
    //   [Types._FAIL]: Fail,
    //   [Types._]: ssttaarrtt,
    //   [Types._SUC]: Suc,
    //   [Types._FAIL]: Fail,
    //   [Types._]: ssttaarrtt,
    //   [Types._SUC]: Suc,
    //   [Types._FAIL]: Fail,
    //   [Types._]: ssttaarrtt,
    //   [Types._SUC]: Suc,
    //   [Types._FAIL]: Fail,
    //   [Types._]: ssttaarrtt,
    //   [Types._SUC]: Suc,
    //   [Types._FAIL]: Fail,
    //   [Types._]: ssttaarrtt,
    //   [Types._SUC]: Suc,
    //   [Types._FAIL]: Fail,
})

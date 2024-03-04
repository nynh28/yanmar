import { call, put, select } from 'redux-saga/effects'
import DrivingSettingsActions from '../Redux/DrivingSettingsRedux'
const auth = state => state.signin
const drivingsettings = state => state.drivingsettings

export function* getDrivingBehaviorListRequest(api, { language }) {

    const authen = yield select(auth)
    const id = yield select(auth)
    yield call(api.setHeader, authen.header)

    // console.log(language)
    // console.log('==================== Data getDrivingBehaviorList  ===============================')
    // const data = {
    //     language: "en"
    // }
    // const response = yield call(api.getDrivingBehaviorList, id.idToken)
    const response = yield call(api.getDrivingBehaviorList, language)
    // const response = yield call(api.getDrivingBehaviorList, data)
    // console.log(response)
    // console.log('===================== Response getDrivingBehaviorList  ==========================')

    if (response.ok) {
        yield put(DrivingSettingsActions.getDrivingBehaviorListSuc(response.data))
    } else {
        yield put(DrivingSettingsActions.getDrivingBehaviorListFail())
    }

}

export function* getBehaviorDrivingViewerIdRequest(api, { behavior_id }) {
    const drive = yield select(drivingsettings)
    const authen = yield select(auth)
    yield call(api.setHeader, authen.header)
    const data = {
        BehaviorId: behavior_id
    }
    // console.log(data)
    // console.log('==================== Data  getBehaviorDrivingViewerId ===============================')
    const response = yield call(api.getBehaviorDrivingViewerId, data)
    // console.log(response)
    // console.log('===================== Response getBehaviorDrivingViewerId  ==========================')

    if (response.ok) {
        yield put(DrivingSettingsActions.getBehaviorDrivingViewerIdSuc(response.data))
        if (drive.behaviorId) {
            yield put(DrivingSettingsActions.getBehaviorCriteria(drive.behaviorId))
        }
    } else {
        yield put(DrivingSettingsActions.getBehaviorDrivingViewerIdFail())
    }

}

// export function* updateBehaviorDrivingViewerIdRequest(api, { behavior_name, driving_viewer_id }) {
//     const driving = yield select(drivingsettings)
//     console.log(driving.behavior_id, behavior_name, driving_viewer_id)
//     console.log('==================== Data updateBehaviorDrivingViewerId  ===============================')
//     const response = yield call(api.updateBehaviorDrivingViewerId, driving.behavior_id, behavior_name, driving_viewer_id)
//     console.log(response)
//     console.log('===================== Response updateBehaviorDrivingViewerId  ==========================')

//     if (response.ok) {
//         yield put(DrivingSettingsActions.updateBehaviorDrivingViewerIdSuc(response.data))
//     } else {
//         yield put(DrivingSettingsActions.updateBehaviorDrivingViewerIdFail())
//     }
// }

export function* getBehaviorCriteriaRequest(api, { id }) {
    const drive = yield select(drivingsettings)
    const authen = yield select(auth)
    const data = {
        BehaviorId: id
    }
    yield call(api.setHeader, authen.header)
    // console.log(data)
    // console.log('==================== Data  getBehaviorCriteria ===============================')
    const response = yield call(api.getBehaviorCriteria, data)
    // console.log(response)
    // console.log('===================== Response getBehaviorCriteria  ==========================')

    if (response.ok) {
        yield put(DrivingSettingsActions.getBehaviorCriteriaSuc(response.data))
        if (drive.behaviorId) {
            yield put(DrivingSettingsActions.getBehaviorSubkeys(id))
            yield put(DrivingSettingsActions.getBehaviorScore(1, 1, drive.behaviorId))
        }

    } else {
        yield put(DrivingSettingsActions.getBehaviorCriteriaFail())
    }

}

export function* getBehaviorScoreRequest(api, { sub1, sub2, behaviorId }) {
    const authen = yield select(auth)
    const data = {
        SubKey1Value: sub1 == "" || sub1 == 1 ? null : sub1,
        SubKey2Value: sub2 == "" || sub2 == 1 ? null : sub2,
        BehaviorId: behaviorId,
    }
    yield call(api.setHeader, authen.header)
    // console.log(data)
    // console.log('==================== Data getBehaviorScore  ===============================')
    const response = yield call(api.getBehaviorScore, data)
    // console.log(response)
    // console.log('===================== Response getBehaviorScore  ==========================')

    if (response.ok) {
        yield put(DrivingSettingsActions.getBehaviorScoreSuc(response.data))
    } else {
        yield put(DrivingSettingsActions.getBehaviorScoreFail())
    }

}

export function* getBehaviorScoreSummaryRequest(api, { behavior_id }) {
    const data = {
        behaviorId: behavior_id
    }
    const authen = yield select(auth)
    yield call(api.setHeader, authen.header)
    // console.log(data)
    // console.log('==================== Data  getBehaviorScoreSummary ===============================')
    const response = yield call(api.getBehaviorScoreSummary, data)
    // console.log(response)
    // console.log('===================== Response getBehaviorScoreSummary  ==========================')

    if (response.ok) {
        yield put(DrivingSettingsActions.getBehaviorScoreSummarySuc(response.data))
    } else {
        yield put(DrivingSettingsActions.getBehaviorScoreSummaryFail())
    }

}

export function* updateBehaviorNameRequest(api, { behaviorId, drivingViewerId, behaviorNameEn, behaviorNameTh, behaviorNameJa }) {
    const data = {
        behaviorId,
        drivingViewerId,
        behaviorNameDict: {
            en: behaviorNameEn,
            th: behaviorNameTh,
            ja: behaviorNameJa
        }
    }
    const authen = yield select(auth)
    yield call(api.setHeader, authen.header)
    // console.log(data)
    // console.log('==================== Data updateBehaviorName  ===============================')
    const response = yield call(api.updateBehaviorName, data)
    // console.log(response)
    // console.log('===================== Response updateBehaviorName  ==========================')

    if (response.ok) {
        yield put(DrivingSettingsActions.updateBehaviorNameSuc(response.data))
    } else {
        yield put(DrivingSettingsActions.updateBehaviorNameFail())
    }

}

export function* createBehaviorCriteriaSubkeyRequest(api, { behaviorCriteriaSettings }) {
    const data = {
        behaviorCriteriaSettings
    }
    const authen = yield select(auth)
    yield call(api.setHeader, authen.header)
    // console.log(data)
    // console.log('==================== Data createBehaviorCriteriaSubkey  ===============================')
    const response = yield call(api.createBehaviorCriteriaSubkey, data)
    // console.log(response)
    // console.log('===================== Response createBehaviorCriteriaSubkey  ==========================')

    if (response.ok) {
        yield put(DrivingSettingsActions.createBehaviorCriteriaSubkeySuc(response.data))
    } else {
        yield put(DrivingSettingsActions.createBehaviorCriteriaSubkeyFail())
    }

}

export function* updateBehaviorScoreRequest(api, { data }) {
    const authen = yield select(auth)
    yield call(api.setHeader, authen.header)
    // console.log(data)
    // console.log('==================== Data  updateBehaviorScore ===============================')
    const response = yield call(api.updateBehaviorScore, data)
    // console.log(response)
    // console.log('===================== Response updateBehaviorScore  ==========================')

    if (response.ok) {
        yield put(DrivingSettingsActions.updateBehaviorScoreSuc(response.data))
    } else {
        yield put(DrivingSettingsActions.updateBehaviorScoreFail())
    }

}

export function* getBehaviorSubkeysRequest(api, { behavior_id }) {
    const data = {
        SubkeyGroupId: behavior_id
    }
    const authen = yield select(auth)
    yield call(api.setHeader, authen.header)
    // console.log(data)
    // console.log('==================== Data getBehaviorSubkeys  ===============================')
    const response = yield call(api.getBehaviorSubkeys, data)
    // console.log(response)
    // console.log('===================== Response getBehaviorSubkeys  ==========================')

    if (response.ok) {
        yield put(DrivingSettingsActions.getBehaviorSubkeysSuc(response.data))
    } else {
        yield put(DrivingSettingsActions.getBehaviorSubkeysFail())
    }

}

export function* updateCriteriaSettingRequest(api, { data }) {
    const data1 = data
    const authen = yield select(auth)
    yield call(api.setHeader, authen.header)
    // console.log(data1)
    // console.log('==================== Data  updateCriteriaSetting ===============================')
    const response = yield call(api.updateCriteriaSetting, data1)
    // console.log(response)
    // console.log('===================== Response updateCriteriaSetting  ==========================')

    if (response.ok) {
        yield put(DrivingSettingsActions.updateCriteriaSettingSuc(response.data))
    } else {
        yield put(DrivingSettingsActions.updateCriteriaSettingFail())
    }

}

// export function* getDrivingBehaviorList(api, { id }) {
//     console.log(id)
//     console.log('==================== Data   ===============================')
//     const response = yield call(api.getDrivingBehaviorList, id)
//     console.log(response)
//     console.log('===================== Response   ==========================')

//     if (response.ok) {
//         yield put(DrivingSettingsActions.Suc(response.data))
//     } else {
//         yield put(DrivingSettingsActions.Fail())
//     }

// }
import apisauce from 'apisauce'
import { ENDPOINT_BASE_URL } from '../Config/app-config';

const create = (baseURL = ENDPOINT_BASE_URL) => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Accept': 'application/json',
      // 'Accept': 'text/plain',
      // 'Content-Type': 'application/x-www-form-urlencoded'
      // 'Access-Control-Allow-Origin': '*',
    },
    timeout: 10000
  })

  const setHeader = (header) => {
    api.setHeaders({
      Authorization: header.idToken,
      'X-API-Key': header.redisKey,
    })
  }
  // ********************** Driving Behavior Zone for Settings ******************** //
  // const addQuestion2 = (images, questions, amuletID, user_id) => {

  //   let body = new FormData()
  //   images.forEach((element, i) => {
  //     body.append('files[' + i + ']', element)
  //   });
  //   body.append('type', amuletID)
  //   body.append('user_id', user_id)

  //   questions.forEach((element, i) => {
  //     body.append('question[' + i + ']', element)
  //   })
  //   return api.post('v2/question/add', body, { headers: { 'Content-Type': 'multipart/form-data' } })
  // }
  const getDrivingBehaviorList = (data) => {
    // let body = new FormData()
    return api.get('/setting/driving-behavior/behaviors?language=' + data, null, {
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        'Accept-Language': data,
        // "Authentication": id,
      }
    })
  }
  // const getDrivingBehaviorList = (id) => api.get('/setting/driving-behavior/behaviors?id=' + id)
  const getBehaviorDrivingViewerId = (data) => api.get("/setting/driving-behavior/behavior-profile", data)
  const updateBehaviorName = (data) => api.put('/setting/driving-behavior/behavior-profile', data)
  const updateBehaviorDrivingViewerId = (behavior_id, behavior_name, driving_viewer_id) => api.put('/setting/driving-behavior/behaviors-viewer', behavior_id, behavior_name, driving_viewer_id)
  const getBehaviorCriteria = (behavior_id) => api.get('/setting/driving-behavior/behaviors-criteria', behavior_id)

  const getBehaviorSubkeys = (data) => api.get('/setting/driving-behavior/behaviors-subkey-data', data)

  const getBehaviorScore = (data) => api.get('/setting/driving-behavior/behaviors-score', data)
  const updateBehaviorScore = (data) => api.put('/setting/driving-behavior/behaviors-score', data)
  const getBehaviorScoreSummary = (behavior_id) => api.get('/setting/driving-behavior/behaviors-score-summary', behavior_id)

  const createBehaviorCriteriaSubkey = (data) => api.put('/setting/driving-behavior/behaviors-criteria-setting', data)
  const updateCriteriaSetting = (data) => api.put('/setting/driving-behavior/behaviors-criteria-setting', data)

  // ********************** Driving Behavior Zone for Settings ******************** //



  return {

    // ********************** Driving Behavior Zone for Settings ******************** //
    setHeader,
    getDrivingBehaviorList,
    getBehaviorDrivingViewerId,
    updateBehaviorDrivingViewerId,
    getBehaviorCriteria,
    getBehaviorSubkeys,
    getBehaviorScore,
    updateBehaviorScore,
    getBehaviorScoreSummary,
    updateBehaviorName,
    createBehaviorCriteriaSubkey,
    updateCriteriaSetting,
    // ********************** Driving Behavior Zone for Settings ******************** //
  }
}


// let's return back our create method as the default.
export default {
  create
}

import apisauce from 'apisauce'
import { ENDPOINT_BASE_URL } from '../Config/app-config';

const create = (baseURL = ENDPOINT_BASE_URL) => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Accept': 'application/json',
      // 'Accept': 'text/plain',
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 10000
  })


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

  // const getDrivingBehaviorList = (id) => {
  //     let body = new FormData()
  //     return api.get('/setting/driving-behavior/behaviors', null, {
  //         headers: {
  //             'Accept': 'application/json',
  //             'Content-Type': 'application/json',
  //             "Authentication": id,
  //             // tokenId: id
  //         }
  //     })
  // }

  const getCategoryType = () => api.get('/category-type')
  const getClassType = () => api.get('/class-type')
  const getEngineSeries = () => api.get('/engine-series')


  return {

    // getDrivingBehaviorList,
    getCategoryType,
    getClassType,
    getEngineSeries

  }
}


// let's return back our create method as the default.
export default {
  create
}

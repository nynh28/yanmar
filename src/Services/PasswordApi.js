import apisauce from 'apisauce'
import { ENDPOINT_BASE_URL } from '../Config/app-config';

const create = (baseURL = ENDPOINT_BASE_URL) => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Accept': 'application/json'
      // , 'X-Amz-Security-Token': 'Onelink-Admin-Support'
      // 'Accept': 'text/plain',
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 10000
  })


  const setHeader = (header) => { api.setHeaders(header) }


  //#region  Hino Account Management

  const forgotPassword = (body) => api.post('users/auth/forgot-password', body)

  const confirmForgot = (body) => api.post('users/auth/confirm-forgot-password', body)

  const changePassword = (body) => api.post('users/auth/change-password', body)

  const respondChallenge = (body) => api.post('users/auth/respond-challenge', body)

  //#endregion


  return {
    setHeader,
    forgotPassword,
    confirmForgot,
    changePassword,
    respondChallenge
  }
}


// let's return back our create method as the default.
export default {
  create
}

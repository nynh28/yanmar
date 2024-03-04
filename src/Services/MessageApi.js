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

  const getDataUserHino = () => api.get('/api/hino/accounts/users/list')
  const getDataUserDealer = (id) => api.get('/api/dealers/accounts/users/list?id=' + id)
  const getDataUserCustomer = (id) => api.get('/api/customers/accounts/users/list?id=' + id)

  // const setHeaderRefresh = (refreshToken) => api.post('Authorization', refreshToken)
  // const refresh = () => api.post('/api/master/users/refresh')


  // const setIDToken = (idToken) => api.setHeader('Authorization', idToken)
  // const getCredential = () => api.get('/api/master/users/credential')


  // const getHinoRole = (key) => api.get('/api/admin/hino/roles', key)



  return {
    getDataUserHino,
    getDataUserDealer,
    getDataUserCustomer,
    // login,
    // refresh,
    // setIDToken,
    // getCredential,
    // getHinoRole,
  }
}


// let's return back our create method as the default.
export default {
  create
}

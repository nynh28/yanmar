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


  return {

  }
}


// let's return back our create method as the default.
export default {
  create
}

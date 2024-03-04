import apisauce from 'apisauce'
// const BASE_URL = "https://installing.onelink-iot.com:3900/"
// const LOCAL_URL = "http://localhost:3000/"
import { ENDPOINT_INSTALL_BASE_URL } from '../Config/app-config';

const create = (baseURL = ENDPOINT_INSTALL_BASE_URL) => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 30000
  })

  const getService = () => api.get('/grid-view/services')
  const updateStatus = ({ id, body }) => api.patch('/services/' + id, body)
  const updateIntegrationService = ({ id, body }) => api.patch('/services/integration/update/' + id, body)

  return {
    getService,
    updateStatus,
    updateIntegrationService,
  }
}

export default {
  create
}

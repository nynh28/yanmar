import axios from 'axios'
import { ENDPOINT_SCGL, ENDPOINT_SCGL2 } from '../Config/app-config'

export default {
  getMasterData: async function (name) {
    try {
      // const response = await axios.get(`${ENDPOINT_SCGL}scgl/${name}`)
      const response = await axios.get(`${ENDPOINT_SCGL2}fleet/V2/scg/${name}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  getMasterDataById: async function (name, params) {
    try {
      // const response = await axios.get(`${ENDPOINT_SCGL}scgl/${name}?${params}`)
      const response = await axios.get(`${ENDPOINT_SCGL2}fleet/V2/scg/${name}?${params}`)
      return response.data
    } catch (error) {
      throw error
    }
  }
}

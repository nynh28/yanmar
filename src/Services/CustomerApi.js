import apisauce from 'apisauce'
import { ENDPOINT_BASE_URL } from '../Config/app-config';

const create = (baseURL = ENDPOINT_BASE_URL) => {
  // const create = (baseURL = 'https://u7e1ywm6v5.execute-api.ap-southeast-1.amazonaws.com/Prod/') => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Accept': 'application/json',
      // 'Accept': 'text/plain',
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 60000
  })

  // Set Header
  const setHeader = (header) => { api.setHeaders(header) }

  // Get Customer By ID
  const getInfoCustomer = (id) => api.get('Partner/Customers/' + id)

  // Create a new Customer
  const createCustomer = (data) => api.post('Partner/Customers', data)

  // Delete Customer By Id
  const deleteCustomer = (id) => api.delete('/Partner/Customers/' + id)

  // Update Customer
  const updateCustomer = (data) => api.put('Partner/Customers/' + data.id, data.updateInfo)

  // Update Check Customer Status
  const checkCustomerStatus = (data) => api.post('Partner/Customers/CheckCustomerStatus', data)

  // Get Option Form Customer
  const getOptionFormCustomer = (data) => api.get('Partner/Customers/Option/' + data.name) // MyOwnerDealer

  // Get Option Form Customer
  const subscriptionPrint = (id) => api.put('Partner/Customer/' + id + '/SubscriptionPrint')

  // Get Option Form Customer
  const CertificatePrint = (id) => api.get('Vehicles/Profiles/' + id + '/PrintCertification')


  // ----------------------------------------------------------------------------------------------------


  return {
    setHeader,
    getInfoCustomer,
    createCustomer,
    deleteCustomer,
    updateCustomer,
    checkCustomerStatus,
    getOptionFormCustomer,
    subscriptionPrint,
    CertificatePrint
  }
}


// let's return back our create method as the default.
export default {
  create
}

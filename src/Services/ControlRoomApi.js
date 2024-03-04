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



    // ----------------------------------------------------------------------------------------------------


    return {
        setHeader,
        getInfoCustomer,

    }
}


// let's return back our create method as the default.
export default {
    create
}

import apisauce from 'apisauce'
import { ENDPOINT_BASE_URL } from '../Config/app-config';

const create = (baseURL = ENDPOINT_BASE_URL) => {

    const api = apisauce.create({
        // base URL is read from the "constructor"
        baseURL,
        // here are some default headers
        headers: {
            'Accept': 'application/json',
            'X-Amz-Security-Token': 'Onelink-Admin-Support'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // 10 second timeout...
        timeout: 60000
    })


    const setHeader = (header) => { api.setHeaders(header) }




    // const getSubGuid = (id) => api.get('Subscription/Profile/' + id)
    // const getAddSub = (data) => api.post('Subscription/Profile/', data)
    // const getEditSub = (data) => api.put('Subscription/Profile/' + data.id, data.body)
    // const getDelSub = (id) => api.delete('Subscription/Profile/' + id)


    //Dropdown
    const DltVehicleType = () => api.get('Subscription/Fundamental/DltVehicleType')
    const DltBodyType = (id) => api.get('Subscription/Fundamental/DltVehicleType/' + id + '/BodyType')
    const CargolinkType = () => api.get('Subscription/Fundamental/CargolinkType')
    const DocumentType = () => api.get('util/options?OptionGroup=VehicleType')
    const Package = () => api.get('Subscription/Fundamental/Package')
    const PackageID = (id) => api.get('Subscription/Fundamental/Package/' + id)
    const CustomerBY = (id) => api.get('Subscription/Fundamental/Dealer/' + id + '/Customer')
    const getCustomer = (id) => api.get('Subscription/Fundamental/Customer/' + id)
    const getPay = (id) => api.get('Subscription/Fundamental/Customer/' + id)
    const MyDealers = () => api.get('Subscription/Fundamental/MyDealers')
    const Signatures = (id) => api.get('Subscription/Profile/' + id + '/DealerSignatures')



    //Profile
    const getProfileSub = (id) => api.get('Subscription/Profile/' + id)
    const getSubscriber = (id) => api.get('Subscription/Subscriber/' + id)
    const postProfile = (data) => api.post('Subscription/Profile', data)
    const showSubscriber = (SubscriptionID, subscriberID) => api.get('Subscription/Profile/' + SubscriptionID + '/Subscriber/' + subscriberID)
    const putSubscriber = (SubscriptionID, subscriberID, data) => api.put('Subscription/Profile/' + SubscriptionID + '/Subscriber/' + subscriberID, data)
    const delSubscriber = (id, subscriberID) => api.delete('Subscription/Profile/' + id + '/Subscriber/' + subscriberID)



    //VerifyCustomer and VerifyPaymentCust
    const VerifyCust = (id) => api.put('Subscription/Profile/' + id + '/VerifyCust')
    const VerifyPaymentCust = (id) => api.put('Subscription/Profile/' + id + '/VerifyPaymentCust')
    const VerifySub = (id, subscriberId, isAgree, dateStart) => api.put('Subscription/Profile/' + id + '/Subscriber/' + subscriberId + '/Verify?isAgree=' + isAgree + '&installDate=' + dateStart)

    //
    const Map = (id) => api.put('Subscription/Customer/' + id + '/SaveAsPartner')
    const Create = (id, code) => api.put('Subscription/Customer/' + id + '/Map?intCustCode=' + code)

    //print cer
    const ItemCerticate = (id, subscriberId, dealerSignature) => api.get('Subscription/Profile/' + id + '/Subscriber/' + subscriberId + '/PrintCertification?dealerSignature=' + dealerSignature)
    const ResendDlt = (id, subscriberId) => api.put('Subscription/Profile/' + id + '/Subscriber/' + subscriberId + '/ResendDlt')
    const ActiveGps = (id, subscriberId) => api.put('Subscription/Profile/' + id + '/Subscriber/' + subscriberId + '/ActiveGps')

    //new customer
    const TableSub = () => api.get('Subscription/GridView/SubscriberStatus')


    return {
        setHeader,
        DltVehicleType,
        DltBodyType,
        CargolinkType,
        DocumentType,
        Package,
        PackageID,
        CustomerBY,
        getCustomer,
        getPay,
        MyDealers,
        getProfileSub,
        VerifyCust,
        VerifyPaymentCust,
        Map,
        Create,
        getSubscriber,
        postProfile,
        showSubscriber,
        putSubscriber,
        VerifySub,
        ItemCerticate,
        Signatures,
        ResendDlt,
        delSubscriber,
        ActiveGps,
        TableSub


    }
}

// let's return back our create method as the default.
export default {
    create
}



import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import PannelBox from '../../Components/PannelBox'
import Form from "react-jsonschema-form"
import DataGridView from '../../Components/DataGridView'
import { setSchema } from './Form/Fields/Schema'
import SaveButton from '../../Components/SaveButton'
import CancelButton from '../../Components/CancelButton'
import { diff } from 'json-diff';
import SubscriptionActions from '../../Redux/SubscriptionRedux'
import { isEmpty } from 'ramda'
import { get } from 'lodash'
import Data from "./Form/Fields/Data"
import LicenseData from "./Form/Fields/LicenseData"
import Alert from '../../Components/Alert'
import { ArrayFieldTemplateNoSeperator } from "../.../../../Components/FormComponent/ArrayFieldTemplateNoSeperator"
import { t } from '../../Components/Translation'
import GirdSubscriptionItems from '../Subscription/GirdSubscriptionItems'


const CustomTitleField = () => { return '' }

export const fields = {
  TitleField: CustomTitleField,
  basicData: Data,
  licenseData: LicenseData
}

export const uiSchema = {
  DriverDetail: {
    basicData: {
      "ui:field": "basicData",
    },
  },
  LicenseDetail: {
    licenseData: {
      "ui:ArrayFieldTemplate": ArrayFieldTemplateNoSeperator,
      items: {
        "ui:field": "licenseData",
      }
    }
  }
}

class SubscriptionForm extends Component {

  constructor(props) {
    super(props)
    this.state = {

      alertSetting: {
        show: false,
        type: 3,
        content: "",
        ErrorSubcode: 0
      },
      formDataSubmit: {},
      formData: {
        DriverDetail: {
          basicData: {
            statusAction: "",
            taxId_pay: "",
            phoneNo_pay: "",
            corporateTypeName_pay: "",
            lineId_pay: "",
            email_pay: "",
            officialAddress_pay: "",
            billingAddress_pay: "",
            currentAddress_pay: "",
            mailingAddress_pay: "",
            packgeNav: "",
            attachCode: "",
            vinNo: "",
            payCustId: "",
            dltVehicleType: [],
            dltBodyType: [],
            onelinkVehicleType: [],
            cargolinkVehicleType: [],
            licensePlate: "",
            vehicleBrand: "",
            chassisNo: "",
            itemStatus: "",
            personalCard: "",
            attachInfoType7: {},
            pw20: "",
            attachInfoType9: {},
            Certificated: "",
            attachInfoType10: {},

            personalCardPay: "",
            attachInfoType7Pay: {},
            pw20Pay: "",
            attachInfoType9Pay: {},
            CertificatedPay: "",
            attachInfoType10Pay: {},

            attachInfo: {},
            CustomerNav: "",
            customerCodeSuggestion: "",
            customerCodeSuggestion1: "",
            DealerNav: "",
            id: "",
            tabNumber: "",
            customerCode: "",
            customerNameTh: "",
            customerNameEn: "",
            registerDate: "",
            isIndividual: true,
            isIndividualPay: true,
            isVerifyCust: false,
            isVerifyPaymentCust: false,
            taxId: "",
            taxBranchId: "",
            taxBranchIdPay: "",
            groupTaxId: "",
            CustomerCode: "",
            CustomerCode1: "",
            Vertify: "",
            inputS: "",
            inputS1: "",
            groupCorporateName: "",
            corporateType: "",
            corporateType_pay: "",
            corporateTypeName: "",
            BusinessType: "",
            BusinessType_pay: "",
            vendorBusinessType: "",
            vendorBusinessTypeName: "",
            phoneNo: "",
            email: "",
            prefix: "",
            firstname: "",
            lastname: "",
            suffix: "",
            prefixEn: "",
            firstnameEn: "",
            lastnameEn: "",
            suffixEn: "",
            fullnameBilling: "",
            fullnameMailing: "",
            officialAddressId: 0,
            officialAddress: "",
            currentAddress: "",
            lineId: "",
            endoserName: "",
            endoserPosition: "",
            isApprove: false,
            airtimePackageName: "",
            airtimePackageDescription: "",
            guid: "",
            subscriberNo: "",
            subscriptionDate: "",
            searchGrid: "",
            VehicleOwner: "",
            DocumentTypeNav: "",

            VerifyCustV: "",
            VerifyPaymentCustV: "",
            waitCraeteCus: false,
            statusItem: "",
            statusAction: ""


          },
        }
      },


      statusSubmit: {
        submitSuccess: false,
        status: true,
        ErrorSubcode: ""
      },
      MyDealersList: [],
      PackageList: [],
      CustomerBYList: [],


    }
    this.item = {}

  }




  componentWillMount() {


    let { MyDealers, Package, getProfileSub, formAction, infoMyDealers, infoPackage } = this.props




    if (isEmpty(infoMyDealers)) MyDealers()
    if (isEmpty(infoPackage)) Package()




    if (formAction.action === "Edit") {
      this.setAlertSetting(true, 6)
      getProfileSub(get(formAction, 'data.subscriptionID', ''))
    }

  }


  componentDidUpdate(prevProps, nextState) {

    let { infoMyDealers, infoPackage, infoPackageID, infoCustomerBY, infogetPay, infogetCustomer, infogetProfileSub, formAction, infoVerifyCust,
      infoVerifyPaymentCust, statusSubmit, infoItemCerticate, infoVerifySub, infoputSubscriber, infoResendDlt, infoCreate, infoMap } = this.props

    let { alertSetting } = this.state
    let formData = JSON.parse(JSON.stringify(this.state.formData))
    let _formData = formData.DriverDetail.basicData

    // prevProps.infoMyDealers !== infoMyDealers && this.setState({ MyDealersList: infoMyDealers })
    // prevProps.infoPackage !== infoPackage && this.setState({ PackageList: infoPackage })
    // prevProps.infoCustomerBY !== infoCustomerBY && this.setState({ CustomerBYList: infoCustomerBY })



    if (prevProps.statusSubmit !== statusSubmit) {
      alertSetting.show = true
      alertSetting.type = statusSubmit.status ? 1 : 2
      if (formAction.action === 'Add') {
        alertSetting.content = statusSubmit.status ? 'subscription_87' : 'subscription_88'
      } else {
        alertSetting.content = statusSubmit.status ? 'subscription_89' : 'subscription_90'
      }
      alertSetting.ErrorSubcode = statusSubmit.ErrorSubcode
      this.setState({ alertSetting })
    }



    if (prevProps.infoPackageID !== infoPackageID) {

      _formData.airtimePackageDescription = get(infoPackageID, 'airtimePackageDescription', '')


      this.setState({ formData })

    }
    if (prevProps.infoItemCerticate !== infoItemCerticate || prevProps.infoVerifySub !== infoVerifySub || prevProps.infoputSubscriber !== infoputSubscriber || prevProps.infoResendDlt !== infoResendDlt) {



      this.setAlertSetting(false, 6)


    }


    if (prevProps.infogetCustomer !== infogetCustomer) {

      // get data customer
      // console.log("infogetCustomer", infogetCustomer)



      this.setAlertSetting(false, 6)
      try {
        let t7 = infogetCustomer.attachInfos.find((e) => e.attachTypeNav.key === 7)
        let t9 = infogetCustomer.attachInfos.find((e) => e.attachTypeNav.key === 9)
        let t10 = infogetCustomer.attachInfos.find((e) => e.attachTypeNav.key === 10)

        _formData.attachInfoType7 = t7
        _formData.attachInfoType9 = t9
        _formData.attachInfoType10 = t10
      } catch (error) {

      }


      _formData.taxBranchId = get(infogetCustomer, "taxBranchId", "")
      _formData.taxId = get(infogetCustomer, "taxId", "")
      _formData.phoneNo = get(infogetCustomer, "phoneNo", "")
      _formData.isIndividual = get(infogetCustomer, "isIndividual", true)
      _formData.isApprove = get(infogetCustomer, "isApprove", false)
      _formData.lineId = get(infogetCustomer, "lineId", "")
      _formData.email = get(infogetCustomer, "email", "")

      _formData.BusinessType = get(infogetCustomer, "vendorBusinessTypeName", "")
      _formData.corporateType = get(infogetCustomer, "corporateTypeName", "")
      _formData.officialAddress = get(infogetCustomer, "officialAddress", "")
      _formData.currentAddress = get(infogetCustomer, "currentAddress", "")
      _formData.CustomerCode = get(infogetCustomer, "customerCode", "")
      _formData.customerCodeSuggestion = get(infogetCustomer, "customerCodeSuggestion", "")




      this.setState({ formData })


    }

    if (prevProps.infogetPay !== infogetPay) {
      // console.log("infogetPay", infogetPay)


      try {
        let t7 = infogetPay.attachInfos.find((e) => e.attachTypeNav.key === 7)
        let t9 = infogetPay.attachInfos.find((e) => e.attachTypeNav.key === 9)
        let t10 = infogetPay.attachInfos.find((e) => e.attachTypeNav.key === 10)

        _formData.attachInfoType7Pay = t7
        _formData.attachInfoType9Pay = t9
        _formData.attachInfoType10Pay = t10
      } catch (error) {

      }



      _formData.taxId_pay = get(infogetPay, "taxId", "")
      _formData.taxBranchIdPay = get(infogetPay, "taxBranchId", "")
      _formData.BusinessType_pay = get(infogetPay, "vendorBusinessTypeName", "")
      _formData.corporateType_pay = get(infogetPay, "corporateTypeName", "")
      _formData.phoneNo_pay = get(infogetPay, "phoneNo", "")
      _formData.isIndividualPay = get(infogetPay, "isIndividual", true)
      _formData.lineId_pay = get(infogetPay, "lineId", "")
      _formData.email_pay = get(infogetPay, "email", "")
      _formData.officialAddress_pay = get(infogetPay, "officialAddress", "")
      _formData.currentAddress_pay = get(infogetPay, "currentAddress", "")
      _formData.CustomerCode1 = get(infogetPay, "customerCode", "")
      _formData.customerCodeSuggestion1 = get(infogetPay, "customerCodeSuggestion", "")

      this.setState({ formData })


    }
    if (prevProps.infoVerifyCust !== infoVerifyCust) {

      _formData.isVerifyCust = true
      _formData.isVerifyPaymentCust = true
      this.setState({ formData })
    }

    if (prevProps.infoVerifyPaymentCust !== infoVerifyPaymentCust) {
      _formData.isVerifyPaymentCust = true
      this.setState({ formData })
    }



    if (prevProps.infoCreate !== infoCreate) {
      console.log("infoCreate")
      this.setAlertSetting(false, 6)
      _formData.CustomerCode = get(infoCreate, "intCustCode", "")
      _formData.CustomerCode1 = get(infoCreate, "intCustCode", "")
      this.setState({ formData })

    }
    if (prevProps.infoMap !== infoMap) {
      console.log("infoMap")
      this.setAlertSetting(false, 6)
      _formData.CustomerCode = get(infoMap, "intCustCode", "")
      _formData.CustomerCode1 = get(infoMap, "intCustCode", "")
      this.setState({ formData })
    }



    if (prevProps.infogetProfileSub !== infogetProfileSub) {



      if (formAction.action === "Edit") {

        // console.log("infogetProfileSub", infogetProfileSub)

        _formData.DealerNav = "" + get(infogetProfileSub, "intDealerId", "")
        _formData.packgeNav = "" + get(infogetProfileSub, "airtimePackageId", "")
        _formData.isVerifyCust = get(infogetProfileSub, "isVerifyCust", false)
        _formData.isVerifyPaymentCust = get(infogetProfileSub, "isVerifyPaymentCust", false)
        _formData.payCustId = "" + get(infogetProfileSub, "payCustId", "")
        _formData.CustomerNav = "" + get(infogetProfileSub, "custId", "")
        _formData.subscriptionDate = get(infogetProfileSub, "createDate", "")
        _formData.itemStatus = get(infogetProfileSub, "statusName", "")

        this.props.CustomerBY(_formData.DealerNav)
        this.props.getCustomer(_formData.CustomerNav)
        this.props.getPay(_formData.payCustId)
        this.props.PackageID(_formData.packgeNav)

        this.setState({ formData })



      }

    }






  }



  componentWillUnmount() {

  }




  onChange(v) {

    let diffValue = get(diff(this.state.formData, v.formData), 'DriverDetail.basicData', undefined)



    if (diffValue === undefined) return
    let objects = Object.getOwnPropertyNames(diffValue)


    for (let index in objects) {



      try {

        if ("" + objects[index] === "attachInfoType7") {
          this.bindingData("attachInfoType7", {
            attachCode: diffValue["" + objects[index]]["attachCode"]["__new"],
            fileName: diffValue["" + objects[index]]["fileName"]["__new"],
            fileUrl: diffValue["" + objects[index]]["fileUrl"]["__new"]
          })
        } else {

          this.bindingData("" + objects[index], diffValue["" + objects[index]]["__new"])
        }
      } catch (error) {
        // console.log("ERROR : ", "" + error)

      }

    }

  }

  bindingData(fieldName, value) {


    let { CustomerBY, getCustomer } = this.props
    let formData = JSON.parse(JSON.stringify(this.state.formData))
    let _formData = formData.DriverDetail.basicData





    if (value !== undefined) {
      _formData[fieldName] = value

      formData.DriverDetail.basicData.tabNumber = ""



      if (fieldName === 'packgeNav') {
        _formData.airtimePackageDescription = ""
        // console.log(value)
        this.props.PackageID(value)

      }
      if (fieldName === 'DealerNav') {


        _formData.CustomerNav = []
        _formData.payCustId = []

        CustomerBY(value)

        this.clearData()


      }

      if (fieldName === 'CustomerNav') {

        _formData.payCustId = value
        this.props.getCustomer(value)
        this.props.getPay(value)
        this.clearData()
      }

      if (fieldName === 'payCustId') {

        this.props.getPay(value)
        this.clearData()

      }

      // formData.DriverDetail.basicData = _formData

      // this.setState(state => ({

      //     formData,

      // }))
      this.setState({ formData })
    }


  }




  clearData = () => {
    let formData = JSON.parse(JSON.stringify(this.state.formData))
    let _formData = formData.DriverDetail.basicData



    _formData.taxBranchId = ""
    _formData.taxId = ""
    _formData.subscriptionDate = ""
    _formData.subscriberNo = ""
    _formData.itemStatus = ""
    _formData.phoneNo = ""
    _formData.isIndividual = ""
    _formData.isApprove = ""
    _formData.lineId = ""
    _formData.email = ""
    _formData.officialAddress = ""
    _formData.currentAddress = ""
    _formData.CustomerCode = ""
    _formData.customerCodeSuggestion = ""

    _formData.taxId_pay = ""
    _formData.taxBranchIdPay = ""
    _formData.phoneNo_pay = ""
    _formData.isIndividualPay = ""
    _formData.lineId_pay = ""
    _formData.email_pay = ""
    _formData.officialAddress_pay = ""
    _formData.billingAddress_pay = ""
    _formData.currentAddress_pay = ""
    _formData.mailingAddress_pay = ""
    _formData.CustomerCode1 = ""
    _formData.customerCodeSuggestion1 = ""

    this.setState({ formData })


  }


  submitComfirm() {
    let { formDataSubmit } = this.state
    let { formAction } = this.props



    // Add
    if (formAction.action === 'Add') {
      this.mappingFieldsInsert(formDataSubmit.formData.DriverDetail)
    } else {
      this.mappingFieldsUpdate(formDataSubmit.formData.DriverDetail)
    }



  }



  mappingFieldsInsert() {
    this.setAlertSetting(true, 6)
    let formData = JSON.parse(JSON.stringify(this.state.formData))
    let _formData = this.state.formData.DriverDetail.basicData



    let data = {
      "payCustId": _formData.payCustId,
      "airtimePackageId": _formData.packgeNav,
      "intDealerId": _formData.DealerNav,
      "custId": _formData.CustomerNav,
      "items": this.item


    }



    console.log("data Insert:", data)
    this.props.postProfile(data)

  }


  mappingFieldsUpdate() {
    this.setAlertSetting(true, 6)
    let { infoGuid, formAction } = this.props
    let formData = JSON.parse(JSON.stringify(this.state.formData))
    let _formData = this.state.formData.DriverDetail.basicData


    let data = {
      "payCustId": _formData.payCustId,
      "airtimePackageId": _formData.airtimePackageId,
      "intDealerId": _formData.intDealerId,
      "custId": _formData.custId,
      "items": this.item


    }

    console.log("data  Update:", data)
    // this.props.postProfile(data)

  }



  setAlertSetting(isShow, type, content = "", ErrorSubcode) {
    let { alertSetting, checkNullTable } = this.state
    alertSetting.show = isShow
    alertSetting.type = type
    alertSetting.content = content
    alertSetting.ErrorSubcode = ErrorSubcode
    this.setState({ alertSetting })


  }

  submit(e) {

    let formData = JSON.parse(JSON.stringify(this.state.formData))

    let data = e.formData.DriverDetail.basicData

    console.log("1", data.DealerNav)
    console.log("2", data.CustomerNav)
    console.log("3", data.packgeNav)

    if (isEmpty(data.DealerNav)) {
      this.setAlertSetting(true, 4, "subscription_75")
      formData.DriverDetail.basicData.tabNumber = 0
      this.setState({ formData })
    } else if (isEmpty(data.CustomerNav)) {
      this.setAlertSetting(true, 4, "subscription_76")
      formData.DriverDetail.basicData.tabNumber = 0
      this.setState({ formData })
    } else if (isEmpty(data.payCustId)) {
      this.setAlertSetting(true, 4, "subscription_77")
      formData.DriverDetail.basicData.tabNumber = 1
      this.setState({ formData })
    } else if (isEmpty(data.packgeNav)) {
      this.setAlertSetting(true, 4, "subscription_78")
      formData.DriverDetail.basicData.tabNumber = 2
      this.setState({ formData })
    }


    else {

      this.setAlertSetting(true, 3, "Subscription")

      this.setState({ formDataSubmit: e })
    }



  }




  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift(
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'dx-icon icon-font-size-increase-2-512-01',
          onClick: DataGridView.zoom.zoomChange.bind(this, "gridVehicle"),
          onload: DataGridView.zoom.setDefaultZoom()
        }
      }
    );
  }



  setHeaderSection(title, showLine = true) {
    return <div>
      {showLine && <div className="hr-line-dashed" />}
      <h3>{title}</h3>
      <div style={{ minHeight: '2rem' }}></div>
    </div>
  }

  loading = (e) => {

    console.log(e)
    this.setAlertSetting(true, 6)
  }





  render() {
    let { header, formAction } = this.props


    let dataSource
    dataSource = DataGridView.connect.dataSource('/v1.0.1/grid-view/vehicles', 'id', header)



    let { schema, alertSetting, MyDealersList, PackageList, CustomerBYList

    } = this.state



    const log = (type) => console.log.bind(console, type);
    let { statusSubmit } = this.props
    let formData = JSON.parse(JSON.stringify(this.state.formData))
    let _formData = formData.DriverDetail.basicData

    return (
      <Suspense fallback={null}>
        <PannelBox title={t("subscription_64")}>



          <Form
            schema={setSchema(MyDealersList, PackageList, CustomerBYList)}
            uiSchema={uiSchema}
            fields={fields}
            formData={this.state.formData}
            onChange={v => this.onChange(v)}
            onSubmit={v => this.submit(v)}
            onError={log("errors")}
          >

            <GirdSubscriptionItems subscriptionID={get(formAction, 'data.subscriptionID', '')} DealerNav={_formData.DealerNav} packgeNav={_formData.packgeNav} itemsdata={(e) => {
              this.item = e
              console.log(e)
            }}
              loading={(e) => {

                this.loading(e)

              }}
            />


            <div className="hr-line-dashed" />
            <div className="row" style={{ textAlign: "right" }}>
              <CancelButton
                name={t("cancel")}
                loading={false}
                onClick={() => {

                  this.props.history.push("/subscription")
                }} />

              {
                (get(formAction, 'action', '') === "Add") &&
                <SaveButton
                  name={t("save")}
                // loading={this.props.loading}
                />
              }

            </div>
          </Form>
          <Alert
            setting={alertSetting}
            onConfirm={() => {
              if (alertSetting.type === 3) {
                alertSetting.show = false
                this.submitComfirm()
              }
              //if success
              else if (statusSubmit.key) {
                alertSetting.show = true
                alertSetting.show = false
              }
              else if (statusSubmit.status) {
                alertSetting.show = true
                this.props.history.push("/subscription")
              }
              else {
                alertSetting.show = false
                // alertSetting.type = 2
                // alertSetting.content = action + " User Failed"
              }
              this.setState({ alertSetting })
            }}
            onCancel={() => {
              alertSetting.show = false
              this.setState({ alertSetting })
            }}
          />


        </PannelBox>


      </Suspense >
    )
  }
}


const mapStateToProps = (state) => ({

  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  statusSubmit: state.subscription.statusSubmit,

  //get Dropdown
  infoMyDealers: state.subscription.infoMyDealers,
  infoPackage: state.subscription.infoPackage,
  infoPackageID: state.subscription.infoPackageID,
  infoCustomerBY: state.subscription.infoCustomerBY,
  infogetCustomer: state.subscription.infogetCustomer,
  infogetPay: state.subscription.infogetPay,

  //verify
  infoVerifyCust: state.subscription.infoVerifyCust,
  infoVerifyPaymentCust: state.subscription.infoVerifyPaymentCust,
  infoItemCerticate: state.subscription.infoItemCerticate,
  infoVerifySub: state.subscription.infoVerifySub,
  infoputSubscriber: state.subscription.infoputSubscriber,
  infoResendDlt: state.subscription.infoResendDlt,

  //map or craete

  infoCreate: state.subscription.infoCreate,
  infoMap: state.subscription.infoMap,


  formAction: state.subscription.formAction,
  //profile
  infogetProfileSub: state.subscription.infogetProfileSub,


});

const mapDispatchToProps = (dispatch) => ({
  //dropdown
  MyDealers: () => dispatch(SubscriptionActions.MyDealers()),
  Package: () => dispatch(SubscriptionActions.Package()),
  PackageID: (id) => dispatch(SubscriptionActions.PackageID(id)),
  CustomerBY: (id) => dispatch(SubscriptionActions.CustomerBY(id)),
  getCustomer: (id) => dispatch(SubscriptionActions.getCustomer(id)),
  getPay: (id) => dispatch(SubscriptionActions.getPay(id)),

  //profile
  getProfileSub: (id) => dispatch(SubscriptionActions.getProfileSub(id)),
  postProfile: (data) => dispatch(SubscriptionActions.postProfile(data)),


});

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionForm)


// return [data.Title, data.FirstName, data.LastName].join(' ');

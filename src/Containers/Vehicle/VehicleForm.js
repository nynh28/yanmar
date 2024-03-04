
import VehicleActions from '../../Redux/VehicleRedux'
import FormValidateActions from '../../Redux/FormValidateRedux'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PannelBox from '../../Components/PannelBox'
import Form from "react-jsonschema-form"
// import { uiSchema, fields } from './Form/uiSchema'
import { setSchema } from './Form/Fields/Schema'
import SaveButton from '../../Components/SaveButton'
import CancelButton from '../../Components/CancelButton'
import { diffString, diff } from 'json-diff';
import DropdownActions from '../../Redux/DropdownRedux'
import { tryCatch } from 'ramda'
import { get, isEmpty } from 'lodash'
import moment from 'moment'
import VehicleData from "./Form/Fields/VehicleData"
import LicenseData from "./Form/Fields/LicenseData"
import Alert from '../../Components/Alert'
import { ArrayFieldTemplateNoSeperator } from "../.../../../Components/FormComponent/ArrayFieldTemplateNoSeperator"
import { t, v, v_em } from '../../Components/Translation'

const CustomTitleField = () => { return '' }

export const fields = {
  TitleField: CustomTitleField,
  basicData: VehicleData,
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

class VehiceForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
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
            alertSetting: {
              show: false,
              type: 3,
              content: "",
              ErrorSubcode: 0
            },
            cargoLinkVehicleTypeNav: [],
            attachCode: "",
            attachInfo: {
              attachCode: "",
              fileName: "",
              fileUrl: ""
            },
            vehicleBrandNav: [],
            vehicleBrandNav_value: "",
            modelNav: [],
            orderingModel: "",
            specCode: "",
            vehicleName: "",
            vinNo: "",
            chassisNo: "",
            engineNo: "",
            tire: "",
            axle: "",
            bodyColor: "",
            isActive: true,
            licensePlateNo: "",
            dltProvinceNav: [],
            dltProvinceNav_value: "",
            licenseDate: "",
            isRequireCertificated: "",
            tabNumber: "",
            customerNav: [],
            customerNav_value: "",
            fleetNav: [],
            fleetNav_value: "",

            sellerPartnerNav: [],
            sellerPartnerNav_value: "",
            purchaseDate: "",
            purchasePrice: "",

            warrantyStartDate: "",
            warrantyEndDate: "",

            actStartDate: "",
            actEndDate: "",

            taxStartDate: "",
            taxEndDate: "",

            insuranceStartDate: "",
            insuranceEndDate: "",
            insuranceCompany: "",
            insuranceType: "",
            insuranceNo: "",
            insuranceCost: "",
            driverNav: [],
            dltVehicleTypeNav: [],
            dltVehicleTypeNav_value: "",
            dltBodyTypeNav: [],
            dltBodyTypeNav_value: "",
            vehicleTypeNav: [],
            vehicleTypeNav_value: "",
            vendorBodyTypeNav: [],
            vendorBodyTypeNav_value: "",
            vehicleStatusNav: [],
            vehicleStatusNav_value: "",
            activeStatusNav: [],
            activeStatusNav_value: "",

            speedLimit: "",
            thermalLimited: "",
            standardTypeNav: [],
            standardTypeNav_value: "",
            fuelTank: "",
            minFuelVoltage: "",
            maxFuelVoltage: "",
            fuelConsumption: "",

            airtimePackageName: "",
            purchaseTypeName: "",
            airtimePackageDescription: "",
            rentalPeriod: "",
            rentalUnitPrice: "",
            paymentPeriodName: "",
            airtimeUnitPrice: "",
            nextPaymentDate: "",

            productCode: "",
            productName: "",
            productModel: "",
            firstInstallationDate: "",
            warrantyInstallationStartDateVendor: "",
            warrantyInstallationEndDateVendor: "",
            warrantyStartDateCust: "",
            warrantyEndDateCust: "",
            currentImei: "",
            currentMid: "",
            currentImsi: "",
            currentPhoneNo: "",
            canCreate: false,
            lastCertificateId: ""
          }
        }
      },
      CargoLinkVehicleTypeList: [],
      VehicleBrandList: [],
      FleetList: [],
      VehicleModelDataList: [],
      VehicleProvinceDataList: [],
      CustomerDataList: [],
      SellerDataList: [],
      VehicleTypeDataList: [],
      DriverList: [],
      VehicleTypeByLawDataList: [],
      VehicleBodyTypeByLawList: [],
      VehicleBodyTypeList: [],
      VehicleFuelTypeList: [],
      statusSubmit: {
        submitSuccess: false,
        status: true,
        ErrorSubcode: ""
      },
      canCreate: false,

    }


  }




  componentWillMount() {


    let { VehicleBrandData, VehicleProvinceData, formAction, SellerData, VehicleTypeData, VehicleTypeByLawData, CargoLinkVehicleTypeData, VehicleBodyTypeData, CustomerData, VehicleFuelTypeData } = this.props

    // let formAction = {
    //   action: 'Edit',
    //   personalId: 7061
    // }



    if (formAction.action === 'Edit') {

      // console.log("formAction", formAction.personalId)
      this.props.getInfoVehicleExtension(formAction.personalId)
      this.props.getInfoVehicle(formAction.personalId)
      this.setAlertSetting(true, 5)
    }


    this.props.getDataDropdownVehicle("Seller")
    this.props.getDataDropdownVehicle("Customer", 2)


    if (isEmpty(VehicleBrandData)) this.props.getDataDropdownVehicle("VehicleBrand")
    if (isEmpty(VehicleProvinceData)) this.props.getDataDropdownVehicle("VehicleProvince")
    // if (isEmpty(SellerData)) this.props.getDataDropdownVehicle("Seller")
    if (isEmpty(VehicleTypeByLawData)) this.props.getDataDropdownVehicle("VehicleTypeByLaw")
    if (isEmpty(VehicleTypeData)) this.props.getDataDropdownVehicle("VehicleType")
    if (isEmpty(CargoLinkVehicleTypeData)) this.props.getDataDropdownVehicle("CargoLinkVehicleType")
    if (isEmpty(VehicleBodyTypeData)) this.props.getDataDropdownVehicle("VehicleBodyType")
    if (isEmpty(VehicleFuelTypeData)) this.props.getDataDropdownVehicle("VehicleFuelType")
    // if (isEmpty(CustomerData)) this.props.getDataDropdownVehicle("Customer", 2)


    // this.setState({
    //   VehicleBrandList: VehicleBrandData,
    //   VehicleProvinceDataList: VehicleProvinceData,
    //   SellerDataList: SellerData,
    //   VehicleTypeByLawDataList: VehicleTypeByLawData,
    //   VehicleTypeDataList: VehicleTypeData,
    //   CargoLinkVehicleTypeList: CargoLinkVehicleTypeData,
    //   VehicleBodyTypeList: VehicleBodyTypeData,
    //   VehicleFuelTypeList: VehicleFuelTypeData,
    //   CustomerDataList: CustomerData
    // })




    // console.log("VehicleBrandData :", VehicleBrandData)





  }

  componentDidUpdate(prevProps, nextState) {
    let { basicData } = this.state.formData.DriverDetail
    let formData = JSON.parse(JSON.stringify(this.state.formData))
    let _formData = formData.DriverDetail.basicData


    let { FleetData, VehicleBrandData, VehicleModelData, VehicleProvinceData,
      CustomerData, SellerData, VehicleTypeByLawData, VehicleBodyTypeData,
      VehicleBodyTypeByLawData, VehicleTypeData, DriverData, VehicleFuelTypeData,
      infoVehicle, infoVehicleExtension, statusSubmit, formAction, CargoLinkVehicleTypeData, infoVinno } = this.props

    let { alertSetting } = this.state
    if (prevProps.statusSubmit !== statusSubmit) {
      alertSetting.show = true
      alertSetting.type = statusSubmit.status ? 1 : 2
      alertSetting.content = statusSubmit.status ? formAction.action + "Vehicle Successed" : formAction.action + " Vehicle Failed"
      alertSetting.ErrorSubcode = statusSubmit.ErrorSubcode
      this.setState({ alertSetting })
    }
    // driverNav

    if (prevProps.FleetData !== FleetData) {

      // this.setState({ FleetList: FleetData })
      // console.log("FleetData", FleetData)
    }

    if (prevProps.infoVinno !== infoVinno) {

      _formData.chassisNo = get(infoVinno, 'vehicle.chassisNo', "")
      _formData.engineNo = get(infoVinno, 'vehicle.engineNo', "")
      _formData.orderingModel = get(infoVinno, 'vehicle.orderingModel', "")
      _formData.canCreate = get(infoVinno, 'canCreate', "")
      this.setState({ formData, canCreate: get(infoVinno, 'canCreate', "") })

    }



    // prevProps.VehicleBrandData !== VehicleBrandData && this.setState({ VehicleBrandList: VehicleBrandData })
    // prevProps.CargoLinkVehicleTypeData !== CargoLinkVehicleTypeData && this.setState({ CargoLinkVehicleTypeList: CargoLinkVehicleTypeData })
    // prevProps.VehicleModelData !== VehicleModelData && this.setState({ VehicleModelDataList: VehicleModelData })
    // prevProps.VehicleProvinceData !== VehicleProvinceData && this.setState({ VehicleProvinceDataList: VehicleProvinceData })
    // prevProps.CustomerData !== CustomerData && this.setState({ CustomerDataList: CustomerData })
    // prevProps.SellerData !== SellerData && this.setState({ SellerDataList: SellerData })
    // prevProps.VehicleTypeByLawData !== VehicleTypeByLawData && this.setState({ VehicleTypeByLawDataList: VehicleTypeByLawData })
    // prevProps.VehicleTypeData !== VehicleTypeData && this.setState({ VehicleTypeDataList: VehicleTypeData })
    // prevProps.DriverData !== DriverData && this.setState({ DriverList: DriverData })
    // prevProps.VehicleBodyTypeData !== VehicleBodyTypeData && this.setState({ VehicleBodyTypeList: VehicleBodyTypeData })
    // prevProps.VehicleBodyTypeByLawData !== VehicleBodyTypeByLawData && this.setState({ VehicleBodyTypeByLawList: VehicleBodyTypeByLawData })
    // prevProps.VehicleFuelTypeData !== VehicleFuelTypeData && this.setState({ VehicleFuelTypeList: VehicleFuelTypeData })

    if (prevProps.infoVehicle !== infoVehicle) {



      let { infoVehicle, infoVehicleExtension } = this.props
      let { basicData } = this.state.formData.DriverDetail

      basicData.vehicleBrandNav = "" + get(infoVehicle, 'vehicleBrandNav.key', "51")
      basicData.cargoLinkVehicleTypeNav = "" + get(infoVehicle, 'cargoLinkVehicleTypeNav.key', "")
      basicData.vehicleBrandNav_value = get(infoVehicle, 'vehicleBrandNav.key', "")

      basicData.modelNav = "" + get(infoVehicle, 'modelNav.key', "")
      basicData.modelNav_value = get(infoVehicle, 'modelNav.key', "")

      basicData.orderingModel = get(infoVehicle, 'orderingModel', "")
      basicData.specCode = get(infoVehicle, 'specCode', "")
      basicData.vehicleName = get(infoVehicle, 'vehicleName', "")
      basicData.vinNo = get(infoVehicle, 'vinNo', "")
      basicData.chassisNo = get(infoVehicle, 'chassisNo', "")
      basicData.engineNo = get(infoVehicle, 'engineNo', "")
      basicData.tire = get(infoVehicle, 'tire', "")
      basicData.axle = get(infoVehicle, 'axle', "")
      basicData.bodyColor = get(infoVehicle, 'bodyColor', "")

      basicData.licensePlateNo = get(infoVehicle, 'licensePlateNo', "")
      basicData.dltProvinceNav = "" + get(infoVehicle, 'dltProvinceNav.key', "")
      basicData.licenseDate = get(infoVehicle, 'licenseDate', "")
      basicData.isRequireCertificated = get(infoVehicle, 'isRequireCertificated', "")
      basicData.lastCertificateId = get(infoVehicle, 'lastCertificateId', "")


      basicData.customerNav = "" + get(infoVehicle, 'customerNav.key', "")

      basicData.fleetNav = "" + get(infoVehicle, 'fleetNav.key', "")
      basicData.customerNav_value = get(infoVehicle, 'customerNav.key', "")
      basicData.fleetNav_value = "" + get(infoVehicle, 'fleetNav.key', "")


      basicData.sellerPartnerNav = "" + get(infoVehicle, 'sellerPartnerNav.key', "")
      basicData.sellerPartnerNav_value = get(infoVehicle, 'sellerPartnerNav.key', "")
      basicData.purchaseDate = get(infoVehicle, 'purchaseDate', "")

      basicData.purchasePrice = get(infoVehicle, 'purchasePrice', "")

      basicData.warrantyStartDate = get(infoVehicle, 'warrantyStartDate', "")
      basicData.warrantyEndDate = get(infoVehicle, 'warrantyEndDate', "")
      basicData.actStartDate = get(infoVehicle, 'actStartDate', "")
      basicData.actEndDate = get(infoVehicle, 'actEndDate', "")



      basicData.driverNav = "" + get(infoVehicle, 'driverNav.key', "")
      basicData.taxStartDate = get(infoVehicle, 'taxStartDate', "")
      basicData.taxEndDate = get(infoVehicle, 'taxEndDate', "")
      basicData.insuranceStartDate = get(infoVehicle, 'insuranceStartDate', "")
      basicData.insuranceEndDate = get(infoVehicle, 'insuranceEndDate', "")

      basicData.insuranceCompany = get(infoVehicle, 'insuranceCompany', "")
      basicData.insuranceType = get(infoVehicle, 'insuranceType', "")
      basicData.insuranceNo = get(infoVehicle, 'insuranceNo', "")
      basicData.insuranceCost = get(infoVehicle, 'insuranceCost', "")


      get(infoVehicle, 'dltVehicleTypeNav.key', "") === null ? basicData.dltVehicleTypeNav = "" : basicData.dltVehicleTypeNav = "" + get(infoVehicle, 'dltVehicleTypeNav.key', "")
      get(infoVehicle, 'vendorBodyTypeNav.key', "") === null ? basicData.vendorBodyTypeNav = "" : basicData.vendorBodyTypeNav = "" + get(infoVehicle, 'vendorBodyTypeNav.key', "")
      get(infoVehicle, 'dltBodyTypeNav.key', "") === null ? basicData.dltBodyTypeNav = "" : basicData.dltBodyTypeNav = "" + get(infoVehicle, 'dltBodyTypeNav.key', "")
      get(infoVehicle, 'cargoLinkVehicleTypeNav.key', "") === null ? basicData.cargoLinkVehicleTypeNav = "" : basicData.cargoLinkVehicleTypeNav = "" + get(infoVehicle, 'cargoLinkVehicleTypeNav.key', "")
      get(infoVehicle, 'vehicleTypeNav.key', "") === null ? basicData.vehicleTypeNav = "" : basicData.vehicleTypeNav = "" + get(infoVehicle, 'vehicleTypeNav.key', "")



      basicData.vehicleStatusNav = "" + get(infoVehicle, 'vehicleStatusNav.key', "")
      basicData.activeStatusNav = "" + get(infoVehicle, 'activeStatusNav.key', "")
      basicData.dltVehicleTypeNav_value = "" + get(infoVehicle, 'dltVehicleTypeNav.key', "")
      basicData.dltBodyTypeNav_value = "" + get(infoVehicle, 'dltBodyTypeNav.key', "")
      basicData.vehicleTypeNav_value = "" + get(infoVehicle, 'vehicleTypeNav.key', "")
      basicData.vendorBodyTypeNav_value = "" + get(infoVehicle, 'vendorBodyTypeNav.key', "")
      basicData.vehicleStatusNav_value = "" + get(infoVehicle, 'vehicleStatusNav.key', "")
      basicData.activeStatusNav_value = "" + get(infoVehicle, 'activeStatusNav.key', "")

      basicData.speedLimit = get(infoVehicle, 'speedLimit', "")
      basicData.thermalLimited = get(infoVehicle, 'thermalLimited', "")
      basicData.standardTypeNav = "" + get(infoVehicle, 'standardTypeNav.key', "")
      basicData.standardTypeNav_value = "" + get(infoVehicle, 'standardTypeNav.key', "")
      basicData.fuelTank = get(infoVehicle, 'fuelTank', "")
      basicData.minFuelVoltage = get(infoVehicle, 'minFuelVoltage', "")
      basicData.maxFuelVoltage = get(infoVehicle, 'maxFuelVoltage', "")
      basicData.fuelConsumption = get(infoVehicle, 'fuelConsumption', "")

      basicData.attachCode = get(infoVehicle, 'lastestAttach.attachCode', '')
      const att = {
        attachCode: get(infoVehicle, 'lastestAttach.attachCode', ''),
        fileName: get(infoVehicle, 'lastestAttach.fileName', ''),
        fileUrl: get(infoVehicle, 'lastestAttach.fileUrl', ''),

      }
      basicData.attachInfo = att

      this.props.getDataDropdownVehicle('VehicleBodyTypeByLaw', "" + get(infoVehicle, 'dltVehicleTypeNav.key', ""))
      this.props.getDataDropdownVehicle('VehicleModel', "" + get(infoVehicle, 'vehicleBrandNav.key', ""))
      this.props.getDataDropdownVehicle("Fleet", "" + get(infoVehicle, 'customerNav.key', ""))
      this.props.getDataDropdownVehicle('Driver', "" + get(infoVehicle, 'customerNav.key', ""))

      this.setAlertSetting(false, 5)

    }


    if (prevProps.infoVehicleExtension !== infoVehicleExtension) {

      // console.log("productPakage :", infoVehicleExtension.productPakage.length)
      // console.log("device :", infoVehicleExtension.device.length)
      // if(103103)
      basicData.airtimePackageName = get(infoVehicleExtension, 'productPakage.packageName', "") //
      basicData.purchaseTypeName = get(infoVehicleExtension, ' productPakage.purchaseType', "")//
      basicData.airtimePackageDescription = get(infoVehicleExtension, 'productPakage.packageDescription', "")//
      basicData.rentalPeriod = get(infoVehicleExtension, 'productPakage.paymentPeriod', "")//
      basicData.rentalUnitPrice = get(infoVehicleExtension, 'productPakage.rentalUnitPrice', "")//    rentalUnitPrice + airtimeUnitPrice
      basicData.paymentPeriodName = get(infoVehicleExtension, 'productPakage.paymentPeriodName', "")
      basicData.airtimeUnitPrice = get(infoVehicleExtension, 'productPakage.actualPrice', "")    // rentalUnitPrice + airtimeUnitPrice
      basicData.nextPaymentDate = get(infoVehicleExtension, 'productPakage.nextPaymentDate', "") //

      basicData.productCode = get(infoVehicleExtension, 'device.productCode', "")
      basicData.productName = get(infoVehicleExtension, 'device.productName', "")
      basicData.productModel = get(infoVehicleExtension, 'device.productModel', "")


      basicData.firstInstallationDate = get(infoVehicleExtension, 'device.installationDate', "")
      basicData.warrantyInstallationStartDateVendor = get(infoVehicleExtension, 'device.warrantyVendorStart', "")
      basicData.warrantyInstallationEndDateVendor = get(infoVehicleExtension, 'device.warrantyVendorEnd', "")
      basicData.warrantyStartDateCust = get(infoVehicleExtension, 'device.warrantyCustStart', "")
      basicData.warrantyEndDateCust = get(infoVehicleExtension, 'device.warrantyCustEnd', "")
      basicData.currentImei = get(infoVehicleExtension, 'device.currentImei', "")
      basicData.currentMid = get(infoVehicleExtension, 'device.currentMid', "")
      basicData.currentImsi = get(infoVehicleExtension, 'device.currentImsi', "")
      basicData.currentPhoneNo = get(infoVehicleExtension, 'device.currentPhoneNo', "")

      // let expiredDate = get(userDetailInfo, 'expiredDate', '')
      // expiredDate !== "" ? _formData.expiredDate = moment(expiredDate).format('DD/MM/YYYY') : _formData.expiredDate = expiredDate

    }

  }




  componentWillUnmount() {


  }


  setAlertSetting(isShow, type, content = "", ErrorSubcode) {
    let { alertSetting } = this.state
    alertSetting.show = isShow
    alertSetting.type = type
    alertSetting.content = content
    alertSetting.ErrorSubcode = ErrorSubcode
    this.setState({ alertSetting })
  }

  renameKey(data) {
    let result = []
    for (let index in data) result.push({ label: data[index].value, value: data[index].key })
    return result
  }



  onChange(v) {

    // console.log(diff(this.state.formData, v.formData));
    let diffValue = get(diff(this.state.formData, v.formData), 'DriverDetail.basicData', undefined)

    if (diffValue === undefined) return
    let objects = Object.getOwnPropertyNames(diffValue)


    // try {
    for (let index in objects) {

      try {



        if ("" + objects[index] === "attachInfo") {
          if (diffValue["" + objects[index]]["attachCode"]) {
            this.bindingData("attachInfo", {
              attachCode: diffValue["" + objects[index]]["attachCode"]["__new"],
              fileName: diffValue["" + objects[index]]["fileName"]["__new"],
              fileUrl: diffValue["" + objects[index]]["fileUrl"]["__new"]
            })
          } else {
            let formData = JSON.parse(JSON.stringify(this.state.formData))
            formData.DriverDetail.basicData["attachInfo"] = {
              attachCode: "",
              fileName: "",
              fileUrl: ""
            }
            formData.DriverDetail.basicData.attachCode = ''
            this.setState({ formData })
          }
        } else {

          this.bindingData("" + objects[index], diffValue["" + objects[index]]["__new"])

        }
      } catch (error) {

      }



    }
    // } catch (error) {

    // }

  }

  bindingData(fieldName, value) {




    // let { formData } = this.state
    let formData = JSON.parse(JSON.stringify(this.state.formData))



    formData.DriverDetail.basicData[fieldName] = value
    // formData.CustomerDetail.basicData.tabNumber = ""

    if (fieldName === 'customerNav') {
      formData.DriverDetail.basicData.fleetNav = []
      formData.DriverDetail.basicData.driverNav = []

      this.props.getDataDropdownVehicle('Fleet', value)
      this.props.getDataDropdownVehicle('Driver', value)


    } else if (fieldName === 'vehicleBrandNav') {

      formData.DriverDetail.basicData.modelNav = []

      this.props.getDataDropdownVehicle('VehicleModel', value)

      formData.DriverDetail.basicData.canCreate = false


    } else if (fieldName === 'vinNo') {

      formData.DriverDetail.basicData.canCreate = false


    } else if (fieldName === 'dltVehicleTypeNav') {

      // console.log(value)
      formData.DriverDetail.basicData.dltBodyTypeNav = []

      this.props.getDataDropdownVehicle('VehicleBodyTypeByLaw', value)


    }
    this.setState({ formData })

  }


  submitComfirm() {
    let { formDataSubmit } = this.state
    let { infoVehicle, infoVehicleExtension } = this.props
    if (this.props.formAction.action === 'Edit') {
      // Update User
      let data = this.mappingFieldsUpdate(formDataSubmit.formData.DriverDetail)

      this.setAlertSetting(true, 6)
    } else {
      // Add
      let data = this.mappingFieldsInsert(formDataSubmit.formData.DriverDetail)

      this.setAlertSetting(true, 6)

    }
  }

  validate(data, value, root) {


    if (value === undefined
      || value === null
      || value === ""
      || value.key === null
      || value.key === "null"
      || value.key === []
      || value.length == 0
    ) {
      delete data[root]
    }
    return data



  }


  mappingFieldsUpdate() {


    let { infoVehicle } = this.props
    const { formData } = this.state

    let { cargoLinkVehicleTypeNav, axle, fuelTank, tire, speedLimit, purchasePrice, fuelConsumption, thermalLimited,
      minFuelVoltage, maxFuelVoltage, insuranceCost } = formData.DriverDetail.basicData

    axle !== "" ? axle = parseInt(axle) : axle = axle
    fuelTank !== "" ? fuelTank = parseInt(fuelTank) : fuelTank = fuelTank
    tire !== "" ? tire = parseInt(tire) : tire = tire
    speedLimit !== "" ? speedLimit = parseInt(speedLimit) : speedLimit = speedLimit
    purchasePrice !== "" ? purchasePrice = parseInt(purchasePrice) : purchasePrice = purchasePrice
    fuelConsumption !== "" ? fuelConsumption = parseInt(fuelConsumption) : fuelConsumption = fuelConsumption
    thermalLimited !== "" ? thermalLimited = parseInt(thermalLimited) : thermalLimited = thermalLimited
    minFuelVoltage !== "" ? minFuelVoltage = parseInt(minFuelVoltage) : minFuelVoltage = minFuelVoltage
    maxFuelVoltage !== "" ? maxFuelVoltage = parseInt(maxFuelVoltage) : maxFuelVoltage = maxFuelVoltage
    insuranceCost !== "" ? insuranceCost = parseInt(insuranceCost) : insuranceCost = insuranceCost


    let { licenseDate, warrantyStartDate, warrantyEndDate, purchaseDate, taxStartDate, taxEndDate, actStartDate, actEndDate,
      insuranceStartDate, insuranceEndDate } = formData.DriverDetail.basicData

    // licenseDate !== "" ? licenseDate = moment(licenseDate).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]') : licenseDate = licenseDate
    // warrantyStartDate !== "" ? warrantyStartDate = moment(warrantyStartDate).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]') : warrantyStartDate = warrantyStartDate
    // warrantyEndDate !== "" ? warrantyEndDate = moment(warrantyEndDate).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]') : warrantyEndDate = warrantyEndDate
    // purchaseDate !== "" ? purchaseDate = moment(purchaseDate).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]') : purchaseDate = purchaseDate
    // taxStartDate !== "" ? taxStartDate = moment(taxStartDate).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]') : taxStartDate = taxStartDate
    // taxEndDate !== "" ? taxEndDate = moment(taxEndDate).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]') : taxEndDate = taxEndDate
    // actStartDate !== "" ? actStartDate = moment(actStartDate).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]') : actStartDate = actStartDate
    // actEndDate !== "" ? actEndDate = moment(actEndDate).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]') : actEndDate = actEndDate
    // insuranceStartDate !== "" ? insuranceStartDate = moment(insuranceStartDate).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]') : insuranceStartDate = insuranceStartDate
    // insuranceEndDate !== "" ? insuranceEndDate = moment(insuranceEndDate).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]') : insuranceEndDate = insuranceEndDate



    let { sellerPartnerNav, vehicleBrandNav, modelNav, vendorBodyTypeNav, vehicleTypeNav, dltVehicleTypeNav, dltBodyTypeNav, dltProvinceNav, standardTypeNav, customerNav, fleetNav, driverNav } = formData.DriverDetail.basicData
    let ve = this.state.formData.DriverDetail.basicData


    let data = {

      "canUpdateSeller": true,
      "sellerPartnerNav": {
        "key": isEmpty(sellerPartnerNav) ? null : sellerPartnerNav,

      },
      "canUpdateCustomer": false,
      "customerNav": {
        "key": isEmpty(customerNav) ? null : customerNav,

      },
      "fleetNav": {
        "key": isEmpty(fleetNav) ? null : fleetNav,

      },
      "driverNav": {
        "key": isEmpty(driverNav) ? null : driverNav,

      },
      "vehicleName": ve.vehicleName,
      "modelNav": {
        "key": isEmpty(modelNav) ? null : modelNav,

      },
      "specCode": ve.specCode,
      "orderingModel": ve.orderingModel,
      "chassisNo": ve.chassisNo,
      "engineNo": ve.engineNo,
      "vendorBodyTypeNav": {
        "key": isEmpty(vendorBodyTypeNav) ? null : vendorBodyTypeNav

      },
      "vehicleTypeNav": {
        "key": isEmpty(vehicleTypeNav) ? null : vehicleTypeNav

      },
      "dltVehicleTypeNav": {
        "key": isEmpty(dltVehicleTypeNav) ? null : dltVehicleTypeNav

      },
      "dltBodyTypeNav": {
        "key": isEmpty(dltBodyTypeNav) ? null : dltBodyTypeNav
      },
      "fuelTank": ve.fuelTank,
      "tire": ve.tire,
      "axle": ve.axle,
      "speedLimit": ve.speedLimit,
      "licensePlateNo": ve.licensePlateNo,
      "dltProvinceNav": {
        "key": isEmpty(dltProvinceNav) ? null : dltProvinceNav
      },
      "licenseDate": ve.licenseDate,
      "bodyColor": ve.bodyColor,
      "warrantyStartDate": ve.warrantyStartDate,
      "warrantyEndDate": ve.warrantyEndDate,
      "isActive": ve.isActive,
      "standardTypeNav": {
        "key": standardTypeNav
      },
      "purchaseDate": ve.purchaseDate,
      "purchasePrice": ve.purchasePrice,
      "fuelConsumption": ve.fuelConsumption,
      "thermalLimited": ve.thermalLimited,
      "minFuelVoltage": ve.minFuelVoltage,
      "taxStartDate": ve.taxStartDate,
      "taxEndDate": ve.taxEndDate,
      "actStartDate": ve.actStartDate,
      "actEndDate": ve.actEndDate,
      "insuranceStartDate": ve.insuranceStartDate,
      "insuranceEndDate": ve.insuranceEndDate,
      "insuranceCompany": ve.insuranceCompany,
      "insuranceType": ve.insuranceType,
      "insuranceNo": ve.insuranceNo,
      "insuranceCost": ve.insuranceCost,
      "cargoLinkVehicleTypeNav": {
        "key": ve.cargoLinkVehicleTypeNav

      },
      "attachCode": ve.attachCode == get(infoVehicle, 'lastestAttach.attachCode', '') ? "" : ve.attachCode,



    }




    data = this.validate(data, ve.attachCode, "attachCode")
    data = this.validate(data, vendorBodyTypeNav, "vendorBodyTypeNav")
    data = this.validate(data, dltBodyTypeNav, "dltBodyTypeNav")
    data = this.validate(data, ve.cargoLinkVehicleTypeNav, "cargoLinkVehicleTypeNav")
    data = this.validate(data, ve.vinNo, "vinNo")
    // data = this.validate(data, fleetNav, "fleetNav")
    data = this.validate(data, driverNav, "driverNav")
    data = this.validate(data, ve.vehicleName, "vehicleName")
    data = this.validate(data, ve.specCode, "specCode")
    data = this.validate(data, ve.orderingModel, "orderingModel")
    data = this.validate(data, ve.chassisNo, "chassisNo")
    data = this.validate(data, ve.engineNo, "engineNo")
    data = this.validate(data, ve.fuelTank, "fuelTank")
    data = this.validate(data, ve.tire, "tire")
    data = this.validate(data, ve.axle, "axle")
    data = this.validate(data, ve.speedLimit, "speedLimit")
    data = this.validate(data, ve.licensePlateNo, "licensePlateNo")
    data = this.validate(data, ve.licenseDate, "licenseDate")
    data = this.validate(data, ve.bodyColor, "bodyColor")
    data = this.validate(data, ve.warrantyStartDate, "warrantyStartDate")
    data = this.validate(data, ve.warrantyEndDate, "warrantyEndDate")
    data = this.validate(data, ve.purchaseDate, "purchaseDate")
    data = this.validate(data, ve.purchasePrice, "purchasePrice")
    data = this.validate(data, ve.fuelConsumption, "fuelConsumption")
    data = this.validate(data, ve.thermalLimited, "thermalLimited")
    data = this.validate(data, ve.minFuelVoltage, "minFuelVoltage")
    data = this.validate(data, ve.maxFuelVoltage, "maxFuelVoltage")
    data = this.validate(data, ve.taxStartDate, "taxStartDate")
    data = this.validate(data, ve.taxEndDate, "taxEndDate")
    data = this.validate(data, ve.actStartDate, "actStartDate")
    data = this.validate(data, ve.actEndDate, "actEndDate")
    data = this.validate(data, ve.insuranceStartDate, "insuranceStartDate")
    data = this.validate(data, ve.insuranceEndDate, "insuranceEndDate")
    data = this.validate(data, ve.insuranceCompany, "insuranceCompany")
    data = this.validate(data, ve.insuranceType, "insuranceType")
    data = this.validate(data, ve.insuranceNo, "insuranceNo")
    data = this.validate(data, ve.insuranceCost, "insuranceCost")

    // console.log("data_update", infoVehicle.id, data)
    this.props.editVehicle(infoVehicle.id, data)

    return data

  }


  mappingFieldsInsert() {

    let { infoVehicle, infoVehicleExtension } = this.props
    const { formData } = this.state
    let { axle, fuelTank, tire, speedLimit, purchasePrice, fuelConsumption, thermalLimited, minFuelVoltage, maxFuelVoltage, insuranceCost } = formData.DriverDetail.basicData

    axle !== "" ? axle = parseInt(axle) : axle = axle
    fuelTank !== "" ? fuelTank = parseInt(fuelTank) : fuelTank = fuelTank
    tire !== "" ? tire = parseInt(tire) : tire = tire
    speedLimit !== "" ? speedLimit = parseInt(speedLimit) : speedLimit = speedLimit
    purchasePrice !== "" ? purchasePrice = parseInt(purchasePrice) : purchasePrice = purchasePrice
    fuelConsumption !== "" ? fuelConsumption = parseInt(fuelConsumption) : fuelConsumption = fuelConsumption
    thermalLimited !== "" ? thermalLimited = parseInt(thermalLimited) : thermalLimited = thermalLimited
    minFuelVoltage !== "" ? minFuelVoltage = parseInt(minFuelVoltage) : minFuelVoltage = minFuelVoltage
    maxFuelVoltage !== "" ? maxFuelVoltage = parseInt(maxFuelVoltage) : maxFuelVoltage = maxFuelVoltage
    insuranceCost !== "" ? insuranceCost = parseInt(insuranceCost) : insuranceCost = insuranceCost


    let { licenseDate, warrantyStartDate, warrantyEndDate, purchaseDate, taxStartDate, taxEndDate, actStartDate, actEndDate, insuranceStartDate, insuranceEndDate } = formData.DriverDetail.basicData



    let { cargoLinkVehicleTypeNav, sellerPartnerNav, vehicleBrandNav, modelNav, vendorBodyTypeNav, vehicleTypeNav, dltVehicleTypeNav, dltBodyTypeNav, dltProvinceNav, standardTypeNav, customerNav, fleetNav, driverNav } = formData.DriverDetail.basicData
    let ve = this.state.formData.DriverDetail.basicData
    // let _formData = formData.DriverDetail.basicData
    //if isEmpty(sellerPartnerNav) have data return false
    // console.log("check", isEmpty(sellerPartnerNav))
    // console.log("check_brand", isEmpty(vehicleBrandNav))

    let data = {

      "sellerPartnerNav": {//
        "key": isEmpty(sellerPartnerNav) ? null : sellerPartnerNav,
      },
      "vehicleBrandNav": {//
        "key": isEmpty(vehicleBrandNav) ? null : vehicleBrandNav,

      },
      "modelNav": {//
        "key": isEmpty(modelNav) ? null : modelNav,

      },
      "vendorBodyTypeNav": {//
        "key": isEmpty(vendorBodyTypeNav) ? null : vendorBodyTypeNav,

      },
      "vehicleTypeNav": {//
        "key": isEmpty(vehicleTypeNav) ? null : vehicleTypeNav,

      },
      "dltVehicleTypeNav": {//
        "key": isEmpty(dltVehicleTypeNav) ? null : dltVehicleTypeNav,

      },
      "dltBodyTypeNav": {

        "key": isEmpty(dltBodyTypeNav) ? null : dltBodyTypeNav,
      },
      "dltProvinceNav": {//
        "key": isEmpty(dltProvinceNav) ? null : dltProvinceNav,

      },
      "isActive": ve.isActive,//
      "standardTypeNav": {//
        "key": isEmpty(standardTypeNav) ? null : standardTypeNav,

      },
      "cargoLinkVehicleTypeNav": {//
        "key": isEmpty(cargoLinkVehicleTypeNav) ? null : cargoLinkVehicleTypeNav,


      },
      "vinNo": ve.vinNo,
      "customerNav": {
        "key": isEmpty(customerNav) ? null : customerNav,

      },
      "fleetNav": {
        "key": isEmpty(fleetNav) ? null : fleetNav,

      },
      "driverNav": {
        "key": isEmpty(driverNav) ? null : driverNav,

      },
      "vehicleName": ve.vehicleName,
      "specCode": ve.specCode,
      "orderingModel": ve.orderingModel,
      "chassisNo": ve.chassisNo,
      "engineNo": ve.engineNo,
      "fuelTank": ve.fuelTank,
      "tire": ve.tire,
      "axle": ve.axle,
      "speedLimit": ve.speedLimit,
      "licensePlateNo": ve.licensePlateNo,
      "licenseDate": ve.licenseDate,
      "bodyColor": ve.bodyColor,
      "warrantyStartDate": ve.warrantyStartDate,
      "warrantyEndDate": ve.warrantyEndDate,
      "purchaseDate": ve.purchaseDate,
      "purchasePrice": ve.purchasePrice,
      "fuelConsumption": ve.fuelConsumption,
      "thermalLimited": ve.thermalLimited,
      "minFuelVoltage": ve.minFuelVoltage,
      "maxFuelVoltage": ve.maxFuelVoltage,
      "taxStartDate": ve.taxStartDate,
      "taxEndDate": ve.taxEndDate,
      "actStartDate": ve.actStartDate,
      "actEndDate": ve.actEndDate,
      "insuranceStartDate": ve.insuranceStartDate,
      "insuranceEndDate": ve.insuranceEndDate,
      "insuranceCompany": ve.insuranceCompany,
      "insuranceType": ve.insuranceType,
      "insuranceNo": ve.insuranceNo,
      "insuranceCost": ve.insuranceCost,
      "attachCode": ve.attachCode,
      // "vehicleAttachInfos": [
      //   {
      //     "attachTypeNav": {
      //       "key": 2,

      //     },
      //     "attachCode": "56599a91-9d8f-490b-904c-1048ca95d38c"
      //   },
      //   {
      //     "attachTypeNav": {
      //       "key": 2,

      //     },
      //     "attachCode": "d6523c79-3c09-4df4-aaad-0dff9a5e9f63"
      //   }
      // ]


    }

    // console.log("data_InsertCON", data)
    // "null value in column "chassis_no" violates not-null constraint"
    // chassis_no

    data = this.validate(data, ve.attachCode, "attachCode")
    data = this.validate(data, dltBodyTypeNav, "dltBodyTypeNav")
    data = this.validate(data, cargoLinkVehicleTypeNav, "cargoLinkVehicleTypeNav")
    data = this.validate(data, ve.vinNo, "vinNo")
    data = this.validate(data, fleetNav, "fleetNav")
    data = this.validate(data, driverNav, "driverNav")
    data = this.validate(data, ve.vehicleName, "vehicleName")
    data = this.validate(data, ve.specCode, "specCode")
    data = this.validate(data, ve.orderingModel, "orderingModel")
    data = this.validate(data, ve.chassisNo, "chassisNo")
    data = this.validate(data, ve.engineNo, "engineNo")
    data = this.validate(data, ve.fuelTank, "fuelTank")
    data = this.validate(data, ve.tire, "tire")
    data = this.validate(data, ve.axle, "axle")
    data = this.validate(data, ve.speedLimit, "speedLimit")
    data = this.validate(data, ve.licensePlateNo, "licensePlateNo")
    data = this.validate(data, ve.licenseDate, "licenseDate")
    data = this.validate(data, ve.bodyColor, "bodyColor")
    data = this.validate(data, ve.warrantyStartDate, "warrantyStartDate")
    data = this.validate(data, ve.warrantyEndDate, "warrantyEndDate")
    data = this.validate(data, ve.purchaseDate, "purchaseDate")
    data = this.validate(data, ve.purchasePrice, "purchasePrice")
    data = this.validate(data, ve.fuelConsumption, "fuelConsumption")
    data = this.validate(data, ve.thermalLimited, "thermalLimited")
    data = this.validate(data, ve.minFuelVoltage, "minFuelVoltage")
    data = this.validate(data, ve.maxFuelVoltage, "maxFuelVoltage")
    data = this.validate(data, ve.taxStartDate, "taxStartDate")
    data = this.validate(data, ve.taxEndDate, "taxEndDate")
    data = this.validate(data, ve.actStartDate, "actStartDate")
    data = this.validate(data, ve.actEndDate, "actEndDate")
    data = this.validate(data, ve.insuranceStartDate, "insuranceStartDate")
    data = this.validate(data, ve.insuranceEndDate, "insuranceEndDate")
    data = this.validate(data, ve.insuranceCompany, "insuranceCompany")
    data = this.validate(data, ve.insuranceType, "insuranceType")
    data = this.validate(data, ve.insuranceNo, "insuranceNo")
    data = this.validate(data, ve.insuranceCost, "insuranceCost")
    // data = this.validate(data, insuranceNo, "insuranceNo")
    // console.log("data_Insert", data)

    this.props.addVehicle(data)
    return data

  }



  setAlertSetting(isShow, type, content = "", ErrorSubcode) {
    let { alertSetting } = this.state
    alertSetting.show = isShow
    alertSetting.type = type
    alertSetting.content = content
    alertSetting.ErrorSubcode = ErrorSubcode
    this.setState({ alertSetting })
  }

  submit(e) {
    let formData = JSON.parse(JSON.stringify(this.state.formData))
    let data = e.formData.DriverDetail.basicData
    let _formData = formData.DriverDetail.basicData



    if (data.sellerPartnerNav.length === 0) {
      this.setAlertSetting(true, 4, "vehicle_02")

      _formData.tabNumber = 3
      this.setState({ formData })
    } else {


      this.setAlertSetting(true, 3, this.props.formAction.action + " Vehicle")

      this.setState({ formDataSubmit: e })
    }

    // console.log(formDataSubmit)
  }

  render() {
    let { FleetList, VehicleBrandList, VehicleModelDataList, alertSetting, VehicleProvinceDataList, CustomerDataList, SellerDataList, VehicleTypeByLawDataList, VehicleTypeDataList,
      DriverList, VehicleBodyTypeByLawList, VehicleBodyTypeList, VehicleFuelTypeList, CargoLinkVehicleTypeList, canCreate } = this.state
    const log = (type) => console.log.bind(console, type);
    let { statusSubmit, VehicleBrandData } = this.props


    // console.log("RENDER FORM : ", this.state.formData)
    return (
      <PannelBox title={'Vehicle Form'}>

        <Form
          schema={
            setSchema(FleetList, VehicleBrandList, VehicleModelDataList, alertSetting, VehicleProvinceDataList, CustomerDataList, SellerDataList,
              VehicleTypeByLawDataList, VehicleTypeDataList, DriverList, VehicleBodyTypeByLawList, VehicleBodyTypeList, VehicleFuelTypeList, CargoLinkVehicleTypeList)
          }

          uiSchema={uiSchema}
          fields={fields}
          formData={this.state.formData}
          onChange={v => this.onChange(v)}
          onSubmit={v => this.submit(v)}
          onError={log("errors")} >


          {/* {console.log("CustomerDataList", CustomerDataList)} */}
          <div className="hr-line-dashed" />
          <div className="row" style={{ textAlign: "right" }}>
            <CancelButton
              loading={false}
              onClick={() => {
                this.props.setPersonalIdSelect("", "")
                this.props.history.push("/vehicle")
              }} />
            {
              (this.props.formAction.action === 'Edit' || canCreate === true) &&
              <SaveButton
                name={t("save")}
                loading={this.props.loading}
              />
            }

          </div>
        </Form>

        <Alert
          setting={alertSetting}
          onConfirm={() => {
            if (alertSetting.type === 4) {
              alertSetting.show = false
            }
            else if (alertSetting.type === 3) {
              alertSetting.show = false
              this.submitComfirm()
            }
            else if (statusSubmit.status) {
              alertSetting.show = true
              // alertSetting.type = 1
              // alertSetting.content = action + " User Successed"
              this.props.history.push("/vehicle")
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
    )
  }
}




const mapStateToProps = (state) => ({
  isValid: state.formValidate.isValid,
  infoVehicle: state.vehicle.infoVehicle,
  infoVinno: state.vehicle.infoVinno,
  infoVehicleExtension: state.vehicle.infoVehicleExtension,
  FleetData: state.dropdown.FleetData,
  VehicleBrandData: state.dropdown.VehicleBrandData,
  CargoLinkVehicleTypeData: state.dropdown.CargoLinkVehicleTypeData,
  VehicleModelData: state.dropdown.VehicleModelData,
  VehicleProvinceData: state.dropdown.VehicleProvinceData,
  CustomerData: state.dropdown.CustomerData,
  SellerData: state.dropdown.SellerData,
  VehicleTypeByLawData: state.dropdown.VehicleTypeByLawData,
  VehicleBodyTypeByLawData: state.dropdown.VehicleBodyTypeByLawData,
  VehicleBodyTypeData: state.dropdown.VehicleBodyTypeData,
  VehicleTypeData: state.dropdown.VehicleTypeData,
  DriverData: state.dropdown.DriverData,
  VehicleFuelTypeData: state.dropdown.VehicleFuelTypeData,
  formAction: state.vehicle.formAction,
  statusSubmit: state.vehicle.statusSubmit,
  DDVehicleBrand: state.vehicle.DDVehicleBrand,

});
const mapDispatchToProps = (dispatch) => ({
  setDDvehicleBrand: (DDVehicleBrand) => dispatch(VehicleActions.setDDvehicleBrand(DDVehicleBrand)),
  getDataDropdown: (optionGroup, key) => dispatch(DropdownActions.getDataDropdown(optionGroup, key)),
  getDataDropdownVehicle: (optionGroup, key) => dispatch(DropdownActions.getDataDropdownVehicle(optionGroup, key)),
  addVehicle: (data) => dispatch(VehicleActions.addVehicle(data)),
  editVehicle: (id, data) => dispatch(VehicleActions.editVehicle(id, data)),
  checkVinno: (VehicleBrandId, VinNo) => dispatch(VehicleActions.checkVinno(VehicleBrandId, VinNo)),
  getInfoVehicle: (data) => dispatch(VehicleActions.getInfoVehicle(data)),
  setInfoVehicle: (data) => dispatch(VehicleActions.setInfoVehicle(data)),
  setInfoVehicleExtension: (data) => dispatch(VehicleActions.setInfoVehicleExtension(data)),
  getInfoVehicleExtension: (data) => dispatch(VehicleActions.getInfoVehicleExtension(data)),
  getVehicleProvince: () => dispatch(DropdownActions.getVehicleProvince()),
  setPersonalIdSelect: (personalId, action) => dispatch(VehicleActions.setPersonalIdSelect(personalId, action)),
  setVinSuccess1: (VehicleBrandId, VinNo) => dispatch(VehicleActions.setVinSuccess1(VehicleBrandId, VinNo))
});


export default connect(mapStateToProps, mapDispatchToProps)(VehiceForm)

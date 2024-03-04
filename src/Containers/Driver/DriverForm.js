import React, { Component } from 'react'
import { connect } from 'react-redux'
import DriverActions from '../../Redux/DriverRedux'
import UserActions from '../../Redux/UserRedux'
import DropdownActions from '../../Redux/DropdownRedux'
import PannelBox from '../../Components/PannelBox'
import Form from "react-jsonschema-form"
import { setSchema } from './Form/setSchema.js'
import BasicData from "./Form/Fields/BasicData"
import EmployeeData from "./Form/Fields/EmployeeData"
import { diff } from 'json-diff';
import { ArrayFieldTemplateNoSeperator } from "../.../../../Components/FormComponent/ArrayFieldTemplateNoSeperator"
import { ArrayFieldForm } from "../.../../../Components/FormComponent/ArrayFieldForm"
import { LicenseData } from "./Form/Fields/LicenseData"
import SaveButton from '../../Components/SaveButton'
import CancelButton from '../../Components/CancelButton'
import './Form/styles.css'
import { get } from 'lodash'
import { isEmpty } from 'react-redux-firebase'
import Alert from '../../Components/Alert'
import { t } from '../../Components/Translation'
import moment from 'moment'
import { F } from 'ramda'

const CustomTitleField = () => { return '' }

export const fields = {
  TitleField: CustomTitleField,
  basicData: BasicData
}

export const uiSchema = {
  DriverDetail: {
    basicData: {
      "ui:field": "basicData"
    }
  }
}

class DriverForm extends Component {
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
      formDataSubmit: "",
      formData: {
        DriverDetail: {
          basicData: {
            tabActive: 0,
            intCustId: [],
            intCustName: "",
            lastUpdated: "",
            personalId: "",
            prefix: "",
            firstname: "",
            lastname: "",
            personalCard: "",
            nickname: "",
            personalCard_attachCode: "",
            personalCard_attachInfo: {
              attachCode: "",
              fileName: "",
              fileUrl: ""
            },

            houseNo: "",
            villageNo: "",
            building: "",
            roomNo: "",
            soi: "",
            road: "",
            villageName: "",
            subDistrict: [],
            subDistrict_Name: "",
            district: [],
            district_Name: "",
            province: [],
            province_Name: "",
            country: "1",
            postalCode: "",
            phone1: "",
            ext1: "",
            phone2: "",
            ext2: "",

            isCurrentSameOfficial: false,
            houseNo_current: "",
            villageNo_current: "",
            building_current: "",
            roomNo_current: "",
            soi_current: "",
            road_current: "",
            villageName_current: "",
            subDistrict_current: [],
            subDistrict_current_Name: "",
            district_current: [],
            district_current_Name: "",
            province_current: [],
            province_current_Name: "",
            country_current: "1",
            postalCode_current: "",
            phone1_current: "",
            ext1_current: "",
            phone2_current: "",
            ext2_current: "",

            username: "",
            password: "",
            confirmPassword: "",
            displayName: "",
            avartar: "",
            mobile: "",
            email: "",
            lineId: "",
            expiredDate: "",
            defaultLanguage: "1",
            user_acttachCode: "",
            user_acttachInfo: {
              attachCode: "",
              fileName: "",
              fileUrl: ""
            },

            driverFile: "",
            employeeCode: "",
            displayName_emp: "",
            department: "",
            position: "",
            startDate: "",
            endDate: "",
            personalCard2_attachCode: "",
            personalCard2_attachInfo: {},
            isActive: false,
            employeeCardList: [],
            employeeCardDeleteList: []
          }
        }
      },
      lisenceCardList: [],
      employeeCardList: [],
      customerList: [],
      cardTypeList: [],

      countryList: [],
      provinceList: [],
      districtList: [],
      subdistrictList: [],

      countryList_current: [],
      provinceList_current: [],
      districtList_current: [],
      subdistrictList_current: [],

      defaultLanguageList: [],

      driverProfileCards: [],
      drivers: [],
      defaultValue: {
        country: "1",
        country_current: "1"
      }
    }
  }


  componentWillMount() {
    let { formAction, getDriver } = this.props

    this.props.getUserCreateAndUpdateOpt('Language', '', '')
    this.props.getDataDropdownLocation("LocationCountry", "", "LocationCountryOfficialData")
    this.props.getDataDropdownLocation("LocationCountry", "", "LocationCountryCurrentData")
    this.props.getDataDropdown("Customer", 2)  // key 2 : Manage

    if (formAction.action === "Edit") {
      getDriver(formAction.id)
      this.setAlertSetting(true, 5, "")
    }
  }


  componentDidUpdate(prevProps, prevState) {
    let {
      driverData, loading, CustomerData, driverExisting, statusSubmit, formAction, lstLanguage,
      LocationCountryOfficialData, LocationProvinceOfficialData, LocationDistrictOfficialData, LocationSubdistrictOfficialData,
      LocationCountryCurrentData, LocationProvinceCurrentData, LocationDistrictCurrentData, LocationSubdistrictCurrentData
    } = this.props
    let { lisenceCardList, employeeCardList, alertSetting } = this.state


    prevProps.lstLanguage !== lstLanguage && this.setState({ defaultLanguageList: lstLanguage })

    if (prevProps.statusSubmit !== statusSubmit) {
      alertSetting.show = true
      alertSetting.type = statusSubmit.status ? 1 : 2
      alertSetting.content = statusSubmit.status ? formAction.action + " Driver Successed" : formAction.action + " Driver Failed"
      alertSetting.ErrorSubcode = statusSubmit.ErrorSubcode
      this.setState({ alertSetting })
    }

    if (prevProps.driverData !== driverData) {
      if (isEmpty(driverData)) return

      let formData = JSON.parse(JSON.stringify(this.state.formData))
      let information = get(driverData, 'information', '')
      let officialAddress = get(driverData, 'address.officialAddress', '')
      let currentAddress = get(driverData, 'address.currentAddress', '')
      let userInfo = get(driverData, 'userInfo', '') === null ? "" : driverData.userInfo
      let employeeInfo = get(driverData, 'employeeInfo', '')

      let _formData = formData.DriverDetail.basicData
      _formData.intCustId = get(information, 'intCustNav.key', '')
      _formData.intCustName = get(information, 'intCustNav.value', '')
      _formData.lastUpdated = get(information, 'lastUpdated', '')
      _formData.personalId = get(information, 'personalId', '')
      _formData.prefix = get(information, 'prefix', '')
      _formData.firstname = get(information, 'firstname', '')
      _formData.lastname = get(information, 'lastname', '')
      _formData.nickname = get(information, 'nickname', '')

      let updatedDateTime = get(information, 'updatedDateTime', '')
      updatedDateTime !== "" ? _formData.lastUpdated = moment(updatedDateTime).format('DD/MM/YYYY') : _formData.lastUpdated = updatedDateTime

      let cardAttach = get(information, 'personalCardAttaches', '') === null ? "" : information.personalCardAttaches
      if (cardAttach !== "") {
        let index = information.personalCardAttaches.findIndex(x => x.attachTypeNav.key === 7);
        if (index > -1) {
          _formData.personalCard_attachCode = get(information.personalCardAttaches, 'attachCode', '')
          _formData.personalCard_attachInfo = get(information, 'personalCardAttaches', {})
        }
      }

      // _formData.personalCard_attachInfo = get(userInfo, 'attachInfo', {}) /// FOR TEST

      _formData.houseNo = get(officialAddress, 'houseNo', '')
      _formData.villageNo = get(officialAddress, 'villageNo', '')
      _formData.building = get(officialAddress, 'buildingName', '')
      _formData.roomNo = get(officialAddress, 'roomNo', '')
      _formData.soi = get(officialAddress, 'soi', '')
      _formData.road = get(officialAddress, 'road', '')
      _formData.villageName = get(officialAddress, 'villageName', '')
      if (get(officialAddress, 'countryNav.key', '') === 1) {
        _formData.subDistrict = "" + get(officialAddress, 'subDistrictNav.key', '')
        _formData.district = "" + get(officialAddress, 'districtNav.key', '')
        _formData.province = "" + get(officialAddress, 'provinceNav.key', '')
      }
      _formData.subDistrict_Name = get(officialAddress, 'subDistrictNav.value', '')
      _formData.district_Name = get(officialAddress, 'districtNav.value', '')
      _formData.province_Name = get(officialAddress, 'provinceNav.value', '')
      _formData.country = "" + get(officialAddress, 'countryNav.key', '')
      _formData.postalCode = get(officialAddress, 'postalCode', '')
      _formData.phone1 = get(officialAddress, 'phone1', '')
      _formData.ext1 = get(officialAddress, 'ext1', '')
      _formData.phone2 = get(officialAddress, 'phone2', '')
      _formData.ext2 = get(officialAddress, 'ext2', '')

      _formData.isCurrentSameOfficial = get(driverData.address, 'isCurrentSameOfficial', false)
      _formData.houseNo_current = get(currentAddress, 'houseNo', '')
      _formData.villageNo_current = get(currentAddress, 'villageNo', '')
      _formData.building_current = get(currentAddress, 'buildingName', '')
      _formData.roomNo_current = get(currentAddress, 'roomNo', '')
      _formData.soi_current = get(currentAddress, 'soi', '')
      _formData.road_current = get(currentAddress, 'road', '')
      _formData.villageName_current = get(currentAddress, 'villageName', '')
      if (get(currentAddress, 'countryNav.key', '') === 1) {
        _formData.subDistrict_current = "" + get(currentAddress, 'subDistrictNav.key', '')
        _formData.district_current = "" + get(currentAddress, 'districtNav.key', '')
        _formData.province_current = "" + get(currentAddress, 'provinceNav.key', '')
      }
      _formData.subDistrict_current_Name = get(currentAddress, 'subDistrictNav.value', '')
      _formData.district_current_Name = get(currentAddress, 'districtNav.value', '')
      _formData.province_current_Name = get(currentAddress, 'provinceNav.value', '')
      _formData.country_current = "" + get(currentAddress, 'countryNav.key', '')
      _formData.postalCode_current = get(currentAddress, 'postalCode', '')
      _formData.phone1_current = get(currentAddress, 'phone1', '')
      _formData.ext1_current = get(currentAddress, 'ext1', '')
      _formData.phone2_current = get(currentAddress, 'phone2', '')
      _formData.ext2_current = get(currentAddress, 'ext2', '')

      _formData.username = get(userInfo, 'username', '')
      _formData.displayName = get(userInfo, 'displayName', '')
      _formData.mobile = get(userInfo, 'mobile', '')
      _formData.lineId = get(userInfo, 'lineId', '')
      _formData.email = get(userInfo, 'email', '')
      let expiredDate = get(userInfo, 'expiredDate', '')
      expiredDate !== "" ? _formData.expiredDate = moment(expiredDate).format('DD/MM/YYYY') : _formData.expiredDate = expiredDate
      _formData.defaultLanguage = get(userInfo, 'defaultLanguageNav.value', '')
      _formData.user_acttachCode = get(userInfo.attachInfo, 'attachCode', '')
      _formData.user_acttachInfo = get(userInfo, 'attachInfo', '')


      // employeeInfo
      _formData.employeeCode = get(employeeInfo, 'employeeCode', '')
      _formData.displayName_emp = get(employeeInfo, 'displayName', '')
      _formData.department = get(employeeInfo, 'department', '')
      _formData.position = get(employeeInfo, 'position', '')

      if (get(employeeInfo, 'startDate', '') !== "0001-01-01T00:00:00Z") {
        let startDate = get(employeeInfo, 'startDate', '') === null ? "" : employeeInfo.startDate
        startDate !== "" ? _formData.startDate = moment(startDate).format('DD/MM/YYYY') : _formData.startDate = expiredDate
      }

      if (get(employeeInfo, 'endDate', '') !== "0001-01-01T00:00:00Z") {
        let endDate = get(employeeInfo, 'endDate', '') === null ? "" : employeeInfo.endDate
        endDate !== "" ? _formData.endDate = moment(endDate).format('DD/MM/YYYY') : _formData.endDate = expiredDate
      }

      // _formData.startDate = get(employeeInfo, 'startDate', '')
      // _formData.endDate = get(employeeInfo, 'endDate', '')
      _formData.isActive = get(employeeInfo, 'isActive', '')


      //#region  Load Locations Dropdown Binding  
      this.props.getDataDropdownLocation("LocationProvince", get(officialAddress, 'countryNav.key', 0), "LocationProvinceOfficialData")
      this.props.getDataDropdownLocation("LocationDistrict", get(officialAddress, 'provinceNav.key', 0), "LocationDistrictOfficialData")
      this.props.getDataDropdownLocation("LocationSubdistrict", get(officialAddress, 'districtNav.key', 0), "LocationSubdistrictOfficialData")

      this.props.getDataDropdownLocation("LocationProvince", get(currentAddress, 'countryNav.key', 0), "LocationProvinceCurrentData")
      this.props.getDataDropdownLocation("LocationDistrict", get(currentAddress, 'provinceNav.key', 0), "LocationDistrictCurrentData")
      this.props.getDataDropdownLocation("LocationSubdistrict", get(currentAddress, 'districtNav.key', 0), "LocationSubdistrictCurrentData")
      //#endregion

      formData.DriverDetail.basicData = _formData
      this.setState(state => ({
        formData,
        lisenceCardList: this.pushId(get(driverData, 'lisenceCards', []) === null ? [] : driverData.lisenceCards),
        employeeCardList: this.pushId(get(employeeInfo, 'employeeCards', []))
      }))
      this.setAlertSetting(false, 5)
    }


    // DRIVER EXITING
    if (prevProps.driverExisting !== driverExisting) {
      // console.log("driverExisting : ", driverExisting)
    }

    prevProps.CustomerData !== CustomerData && this.setState({ customerList: CustomerData })

    // Official Address
    if (prevProps.LocationCountryOfficialData !== LocationCountryOfficialData) {
      this.props.getDataDropdownLocation("LocationProvince", 1, "LocationProvinceOfficialData")
      this.setState({ countryList: LocationCountryOfficialData })
    }
    prevProps.LocationProvinceOfficialData !== LocationProvinceOfficialData && this.setState({ provinceList: LocationProvinceOfficialData })
    prevProps.LocationDistrictOfficialData !== LocationDistrictOfficialData && this.setState({ districtList: LocationDistrictOfficialData })
    prevProps.LocationSubdistrictOfficialData !== LocationSubdistrictOfficialData && this.setState({ subdistrictList: LocationSubdistrictOfficialData })

    // Current Address
    if (prevProps.LocationCountryCurrentData !== LocationCountryCurrentData) {
      this.props.getDataDropdownLocation("LocationProvince", 1, "LocationProvinceCurrentData")
      this.setState({ countryList_current: LocationCountryCurrentData })
    }
    prevProps.LocationProvinceCurrentData !== LocationProvinceCurrentData && this.setState({ provinceList_current: LocationProvinceCurrentData })
    prevProps.LocationDistrictCurrentData !== LocationDistrictCurrentData && this.setState({ districtList_current: LocationDistrictCurrentData })
    prevProps.LocationSubdistrictCurrentData !== LocationSubdistrictCurrentData && this.setState({ subdistrictList_current: LocationSubdistrictCurrentData })
  }

  //#region  SET ATTRIBUTE "ID" FOR MANAGE IN DATAGRID
  pushId(data) {
    let _newData = JSON.parse(JSON.stringify(data))
    for (let index in _newData) {
      _newData[index]['id'] = "GET_" + Math.floor(Math.random() * 1000)
    }
    return _newData
  }

  removeId(data) {
    let _newData = JSON.parse(JSON.stringify(data))
    for (let index in _newData) {
      delete _newData[index].id;
    }
    return _newData
  }
  //#endregion

  setAlertSetting(isShow, type, content = "", ErrorSubcode) {
    let { alertSetting } = this.state
    alertSetting.show = isShow
    alertSetting.type = type
    alertSetting.content = content
    alertSetting.ErrorSubcode = ErrorSubcode
    this.setState({ alertSetting })
  }


  onFormChange(v) {
    // console.log("onFormChange")
    let diffValue = get(diff(this.state.formData, v.formData), 'DriverDetail.basicData', undefined)

    if (diffValue === undefined) return
    let objects = Object.getOwnPropertyNames(diffValue)

    // console.log("objects : ", objects)
    for (let index in objects) {
      // console.log("objects[index] : ", objects[index])
      try {
        if ("" + objects[index] === "country"
          || "" + objects[index] === "province"
          || "" + objects[index] === "district"
          || "" + objects[index] === "subDistrict"
          || "" + objects[index] === "country_current"
          || "" + objects[index] === "province_current"
          || "" + objects[index] === "district_current"
          || "" + objects[index] === "subDistrict_current"
        ) {
          this.locationChange("" + objects[index], diffValue["" + objects[index]]["__new"], diffValue["" + objects[index]]["__new"])
        }
        else if ("" + objects[index] === "personalCard_attachInfo") {
          this.bindingData("personalCard_attachInfo", {
            attachCode: diffValue["" + objects[index]]["attachCode"]["__new"],
            fileName: diffValue["" + objects[index]]["fileName"]["__new"],
            fileUrl: diffValue["" + objects[index]]["fileUrl"]["__new"]
          })
        }
        else if ("" + objects[index] === "user_acttachInfo") {
          this.bindingData("user_acttachInfo", {
            attachCode: diffValue["" + objects[index]]["attachCode"]["__new"],
            fileName: diffValue["" + objects[index]]["fileName"]["__new"],
            fileUrl: diffValue["" + objects[index]]["fileUrl"]["__new"]
          })
        }
        else if ("" + objects[index] === "employeeCardList") {
          this.employeeCardListUpdate(v.formData)
        }
        else if ("" + objects[index] === "employeeCardDeleteList") {
          this.setState({ employeeCardList: get(v.formData.DriverDetail.basicData, "employeeCardList", []) })
          this.bindingData("employeeCardDeleteList", get(v.formData.DriverDetail.basicData, "employeeCardDeleteList", []))
        }
        else if ("" + objects[index] !== "showPopupEmployeeCard__added"
          && "" + objects[index] !== "showPopupLicenseCard__added"
        ) {
          this.bindingData("" + objects[index], diffValue["" + objects[index]]["__new"])
        }
      } catch (error) {
        // console.log("ERROR : ", "" + objects[index])

      }
    }

    //#endregion
  }

  bindingData(fieldName, value) {
    let formData = JSON.parse(JSON.stringify(this.state.formData))
    formData.DriverDetail.basicData[fieldName] = value
    this.setState({ formData })
  }

  employeeCardListUpdate(formData) {
    this.bindingData("employeeCardList", get(formData.DriverDetail.basicData, "employeeCardList", []))
    this.setState({
      employeeCardList: get(formData.DriverDetail.basicData, "employeeCardList", [])
    })
  }

  locationChange(fieldName, value, key) {
    //#region  Dropdown change binding condition
    let formData = JSON.parse(JSON.stringify(this.state.formData))

    switch (fieldName) {
      case "country":
        if (value !== "1") {
          formData.DriverDetail.basicData.country = value
          formData.DriverDetail.basicData.province = []
          formData.DriverDetail.basicData.district = []
          formData.DriverDetail.basicData.subDistrict = []
        }
        else {
          formData.DriverDetail.basicData.country = value
          formData.DriverDetail.basicData.province = []
          formData.DriverDetail.basicData.district = []
          formData.DriverDetail.basicData.subDistrict = []
          this.props.getDataDropdownLocation("LocationProvince", key, "LocationProvinceOfficialData")
          this.props.getDataDropdownLocation("LocationDistrict", 0, "LocationDistrictOfficialData")
          this.props.getDataDropdownLocation("LocationSubdistrict", 0, "LocationSubdistrictOfficialData")
        }
        break;
      case "province":
        formData.DriverDetail.basicData.province = value
        formData.DriverDetail.basicData.district = []
        formData.DriverDetail.basicData.subDistrict = []

        formData.DriverDetail.basicData.district_Name = []
        formData.DriverDetail.basicData.subDistrict_Name = []
        this.props.getDataDropdownLocation("LocationDistrict", key, "LocationDistrictOfficialData")
        this.props.getDataDropdownLocation("LocationSubdistrict", 0, "LocationSubdistrictOfficialData")
        break;
      case "district":
        formData.DriverDetail.basicData.district = value
        formData.DriverDetail.basicData.subDistrict = []
        this.props.getDataDropdownLocation("LocationSubdistrict", key, "LocationSubdistrictOfficialData")
        break;
      case "subDistrict":
        formData.DriverDetail.basicData.subDistrict = value
        break;
      case "country_current":
        if (value !== "1") {
          formData.DriverDetail.basicData.country_current = value
          formData.DriverDetail.basicData.province_current = []
          formData.DriverDetail.basicData.district_current = []
          formData.DriverDetail.basicData.subDistrict_current = []
        }
        else {
          formData.DriverDetail.basicData.country_current = value
          formData.DriverDetail.basicData.province_current = []
          formData.DriverDetail.basicData.district_current = []
          formData.DriverDetail.basicData.subDistrict_current = []
          this.props.getDataDropdownLocation("LocationProvince", key, "LocationProvinceCurrentData")
          this.props.getDataDropdownLocation("LocationDistrict", 0, "LocationDistrictCurrentData")
          this.props.getDataDropdownLocation("LocationSubdistrict", 0, "LocationSubdistrictCurrentData")
        }
        break;
      case "province_current":
        formData.DriverDetail.basicData.province_current = value
        formData.DriverDetail.basicData.district_current = []
        formData.DriverDetail.basicData.subDistrict_current = []
        this.props.getDataDropdownLocation("LocationDistrict", key, "LocationDistrictCurrentData")
        this.props.getDataDropdownLocation("LocationSubdistrict", 0, "LocationSubdistrictCurrentData")
        break;
      case "district_current":
        formData.DriverDetail.basicData.district_current = value
        formData.DriverDetail.basicData.subDistrict_current = []
        this.props.getDataDropdownLocation("LocationSubdistrict", key, "LocationSubdistrictCurrentData")
        break;
      case "subDistrict_current":
        formData.DriverDetail.basicData.subDistrict_current = value
        break;
    }

    //#endregion
    this.setState({ formData })
  }

  submit(FormData) {
    let { formAction } = this.props
    let dt = FormData.formData.DriverDetail.basicData
    let isValid = true
    let tabId = 0
    if (dt.intCustId.length == 0) {
      isValid = false
      tabId = 0
      this.setAlertSetting(true, 4, "driver_1")
    }
    else if (dt.personalId == "") {
      isValid = false
      tabId = 0
      this.setAlertSetting(true, 4, "driver_2")
    }
    else if (dt.firstname == "") {
      isValid = false
      tabId = 0
      this.setAlertSetting(true, 4, "driver_3")
    }
    else if (dt.lastname == "") {
      isValid = false
      tabId = 0
      this.setAlertSetting(true, 4, "driver_4")
    }

    else if (dt.houseNo == "") {
      isValid = false
      tabId = 1
      this.setAlertSetting(true, 4, "driver_5")
    }
    else if (dt.subDistrict.length == 0 && dt.country == "1") {
      isValid = false
      tabId = 1
      this.setAlertSetting(true, 4, "driver_6")
    }
    else if (dt.district.length == 0 && dt.country == "1") {
      isValid = false
      tabId = 1
      this.setAlertSetting(true, 4, "driver_7")
    }
    else if (dt.province.length == 0 && dt.country == "1") {
      isValid = false
      tabId = 1
      this.setAlertSetting(true, 4, "driver_8")
    }
    else if (dt.country.length == 0 || dt.country == "") {
      isValid = false
      tabId = 1
      this.setAlertSetting(true, 4, "driver_9")
    }

    else if (!dt.isCurrentSameOfficial && dt.country_current == "1" && dt.houseNo_current == "") {
      isValid = false
      tabId = 1
      this.setAlertSetting(true, 4, "driver_10")
    }
    else if (!dt.isCurrentSameOfficial && dt.country_current == "1" && dt.subDistrict_current.length == 0) {
      isValid = false
      tabId = 1
      this.setAlertSetting(true, 4, "driver_11")
    }
    else if (!dt.isCurrentSameOfficial && dt.country_current == "1" && dt.district_current.length == 0) {
      isValid = false
      tabId = 1
      this.setAlertSetting(true, 4, "driver_12")
    }
    else if (!dt.isCurrentSameOfficial && dt.country_current == "1" && dt.province_current.length == 0) {
      isValid = false
      tabId = 1
      this.setAlertSetting(true, 4, "driver_13")
    }
    else if (!dt.isCurrentSameOfficial && dt.country_current == "1" && dt.country_current.length == 0 || dt.country_current == "") {
      isValid = false
      tabId = 1
      this.setAlertSetting(true, 4, "driver_14")
    }

    else if (formAction.action === "Add" && dt.displayName == "") {
      isValid = false
      tabId = 2
      this.setAlertSetting(true, 4, "driver_15")
    }
    else if (formAction.action === "Add" && formAction.action === "Add" && dt.username == "") {
      isValid = false
      tabId = 2
      this.setAlertSetting(true, 4, "driver_16")
    }
    // else if (formAction.action === "Add" && dt.password == "") {
    //   isValid = false
    //   tabId = 2
    //   this.setAlertSetting(true, 4, "driver_17")
    // }
    // else if (formAction.action === "Add" && dt.confirmPassword == "") {
    //   isValid = false
    //   tabId = 2
    //   this.setAlertSetting(true, 4, "driver_18")
    // }
    // else if (formAction.action === "Add" && dt.password !== dt.confirmPassword) {
    //   isValid = false
    //   tabId = 2
    //   this.setAlertSetting(true, 4, "driver_19")
    // }
    else if (formAction.action === "Add" && dt.email !== "" && !dt.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      isValid = false
      tabId = 2
      this.setAlertSetting(true, 4, "driver_20")
    }
    else if (formAction.action === "Add" && dt.mobile === "" && dt.email === "") {
      isValid = false
      tabId = 2
      this.setAlertSetting(true, 4, "driver_21")
    }
    else if (dt.employeeCode == "") {
      isValid = false
      tabId = 4
      this.setAlertSetting(true, 4, "driver_22")
    }
    else if (dt.displayName_emp == "") {
      isValid = false
      tabId = 4
      this.setAlertSetting(true, 4, "driver_23")
    }

    if (isValid) {
      this.setAlertSetting(true, 3, this.props.formAction.action + " Driver")
      this.setState({ formDataSubmit: FormData })
    }
    else {
      this.bindingData("tabActive", tabId)
    }
  }

  submitConfirm() {
    let { formDataSubmit } = this.state
    let { formAction } = this.props

    if (formAction.action === "Edit") {
      let data = this.mappingFieldsUpdate(formDataSubmit.formData.DriverDetail)
      console.log("data : ", data)
      this.props.updateDriver(this.props.formAction.id, data)
      this.setAlertSetting(true, 6)
    }
    else {
      let data = this.mappingFieldsInsert(formDataSubmit.formData.DriverDetail)

      this.props.createDriver(data)
      this.setAlertSetting(true, 6)
    }
  }

  getName(fieldName, key) {
    let {
      provinceList, districtList, subdistrictList,
      provinceList_current, districtList_current, subdistrictList_current
    } = this.state

    let data = []
    switch (fieldName) {
      case "province":
        data = provinceList
        break;
      case "district":
        data = districtList
        break;
      case "subDistrict":
        data = subdistrictList
        break;
      case "province_current":
        data = provinceList_current
        break;
      case "district_current":
        data = districtList_current
        break;
      case "subDistrict_current":
        data = subdistrictList_current
        break;
    }
    let obj = data.find(x => x.key === parseInt(key));
    return get(obj, 'value', '')
  }

  setObjectAddressType(countryId, key, value, fieldName) {
    if (countryId == "1")
      return { "key": key, "value": this.getName(fieldName, key) }
    else
      return { "value": value }
  }

  mappingFieldsInsert(FormData) {
    let dt = FormData.basicData
    let currentAddress = ""
    let personalCardAttaches = []
    let personalCardAttachesEmp = []

    if (!dt.isCurrentSameOfficial) {
      currentAddress = {
        "action": "INSERT",
        "countryNav": {
          "key": dt.country_current
        },
        "houseNo": dt.houseNo_current,
        "villageNo": dt.villageNo_current,
        "buildingName": dt.building_current,
        "roomNo": dt.roomNo_current,
        "soi": dt.soi_current,
        "road": dt.road_current,
        "villageName": dt.villageName_current,
        "subDistrictNav": this.setObjectAddressType(dt.country, dt.subDistrict_current, dt.subDistrict_current_Name, "subDistrict_current"),
        "districtNav": this.setObjectAddressType(dt.country, dt.district_current, dt.district_current_Name, "district_current"),
        "provinceNav": this.setObjectAddressType(dt.country, dt.province_current, dt.province_current_Name, "province_current"),
        "postalCode": dt.postalCode_current,
        "ext1": dt.ext1_current,
        "ext2": dt.ext2_current
      }

      if (dt.phone1_current !== "") currentAddress['phone1'] = dt.phone1_current
      if (dt.phone2_current !== "") currentAddress['phone2'] = dt.phone2_current
    }

    if (dt.personalCard_attachCode !== "") {
      personalCardAttaches.push({
        "action": "INSERT",
        "attachCode": dt.personalCard_attachCode,
        "attachTypeNav": {
          "key": 7
        }
      })
    }

    if (dt.personalCard2_attachCode !== "") {
      personalCardAttachesEmp.push({
        "action": "INSERT",
        "attachCode": dt.personalCard2_attachCode,
        "attachTypeNav": {
          "key": 7
        }
      })
    }

    let data = {
      "information": {
        "action": "INSERT",
        "prefix": dt.prefix,
        "firstname": dt.firstname,
        "lastname": dt.lastname,
        "nickname": dt.nickname,
        personalCardAttaches,
        "intCustNav": {
          "key": dt.intCustId
        },
        "personalId": dt.personalId
      },
      "address": {
        "officialAddress": {
          "action": "INSERT",
          "countryNav": {
            "key": dt.country
          },
          "houseNo": dt.houseNo,
          "villageNo": dt.villageNo,
          "buildingName": dt.building,
          "roomNo": dt.roomNo,
          "soi": dt.soi,
          "road": dt.road,
          "villageName": dt.villageName,
          "subDistrictNav": this.setObjectAddressType(dt.country, dt.subDistrict, dt.subDistrict_Name, "subDistrict"),
          "districtNav": this.setObjectAddressType(dt.country, dt.district, dt.district_Name, "district"),
          "provinceNav": this.setObjectAddressType(dt.country, dt.province, dt.province_Name, "province"),
          "postalCode": dt.postalCode,
          "ext1": dt.ext1,
          "ext2": dt.ext2
        },
        "isCurrentSameOfficial": dt.isCurrentSameOfficial
      },
      "userInfo": {
        "action": "INSERT",
        "username": dt.username,
        "password": dt.username,
        "displayName": dt.displayName,
        "email": dt.email,
        "lineId": dt.lineId,
        "expiredDate": this.convertDate(dt.expiredDate),
        "defaultLanguageNav": {
          "key": dt.defaultLanguage
        },
        "attachCode": dt.user_acttachCode
      },
      "lisenceCards": [],
      "employeeInfo": {
        "employeeCode": dt.employeeCode,
        "displayName": dt.displayName_emp,
        "department": dt.department,
        "position": dt.position,
        "startDate": dt.startDate === "" ? "" : this.convertDate(dt.startDate),
        "endDate": dt.endDate === "" ? "" : this.convertDate(dt.endDate),
        "isActive": dt.isActive,
        "personalCardAttaches": [
          ...personalCardAttachesEmp
        ],
        "employeeCards": this.removeId(dt.employeeCardList),
      }
    }

    if (data.employeeInfo.startDate === "") delete data.employeeInfo.startDate;
    if (data.employeeInfo.endDate === "") delete data.employeeInfo.endDate;
    // currentAddress
    if (dt.phone1 !== "") data['address']['officialAddress']['phone1'] = dt.phone1
    if (dt.phone2 !== "") data['address']['officialAddress']['phone2'] = dt.phone2
    if (dt.currentAddress !== "") data['address']['currentAddress'] = currentAddress
    if (dt.mobile !== "") data['userInfo']['mobile'] = dt.phone2

    return data
  }

  mappingFieldsUpdate(FormData) {
    let dt = FormData.basicData
    let _employeeCardList = this.mergeData(dt.employeeCardList, dt.employeeCardDeleteList)
    let currentAddress = ""
    let personalCardAttaches = []
    let personalCardAttachesEmp = []

    if (!dt.isCurrentSameOfficial) {
      currentAddress = {
        "action": "UPDATE",
        "countryNav": {
          "key": dt.country_current
        },
        "houseNo": dt.houseNo_current,
        "villageNo": dt.villageNo_current,
        "buildingName": dt.building_current,
        "roomNo": dt.roomNo_current,
        "soi": dt.soi_current,
        "road": dt.road_current,
        "villageName": dt.villageName_current,
        "subDistrictNav": this.setObjectAddressType(dt.country, dt.subDistrict_current, dt.subDistrict_current_Name, "subDistrict_current"),
        "districtNav": this.setObjectAddressType(dt.country, dt.district_current, dt.district_current_Name, "district_current"),
        "provinceNav": this.setObjectAddressType(dt.country, dt.province_current, dt.province_current_Name, "province_current"),
        "postalCode": dt.postalCode_current,
        "ext1": dt.ext1_current,
        "ext2": dt.ext2_current
      }

      if (dt.phone1_current !== "") currentAddress['phone1'] = dt.phone1_current
      if (dt.phone2_current !== "") currentAddress['phone2'] = dt.phone2_current
    }

    if (dt.personalCard_attachCode !== "") {
      // personalCardAttaches.push({
      //   "action": "INSERT",
      //   "attachCode": dt.personalCard_attachCode,
      //   "attachTypeNav": {
      //     "key": 7
      //   }
      // })
    }


    if (dt.personalCard2_attachCode !== "") {
      // personalCardAttachesEmp.push({
      //   "action": "INSERT",
      //   "attachCode": dt.personalCard2_attachCode,
      //   "attachTypeNav": {
      //     "key": 7
      //   }
      // })
    }

    let data = {
      "information": {
        "action": "UPDATE",
        "prefix": dt.prefix,
        "firstname": dt.firstname,
        "lastname": dt.lastname,
        "nickname": dt.nickname,
        personalCardAttaches
      },
      "address": {
        "officialAddress": {
          "action": "UPDATE",
          "countryNav": {
            "key": dt.country
          },
          "houseNo": dt.houseNo,
          "villageNo": dt.villageNo,
          "buildingName": dt.building,
          "roomNo": dt.roomNo,
          "soi": dt.soi,
          "road": dt.road,
          "villageName": dt.villageName,
          "subDistrictNav": this.setObjectAddressType(dt.country, dt.subDistrict, dt.subDistrict_Name, "subDistrict"),
          "districtNav": this.setObjectAddressType(dt.country, dt.district, dt.district_Name, "district"),
          "provinceNav": this.setObjectAddressType(dt.country, dt.province, dt.province_Name, "province"),
          "postalCode": dt.postalCode,
          "ext1": dt.ext1,
          "ext2": dt.ext2
        },
        "isCurrentSameOfficial": dt.isCurrentSameOfficial
      },
      "lisenceCards": [],
      "employeeInfo": {
        "employeeCode": dt.employeeCode,
        "displayName": dt.displayName_emp,
        "department": dt.department,
        "position": dt.position,
        "startDate": dt.startDate === "" ? "" : this.convertDate(dt.startDate),
        "endDate": dt.endDate === "" ? "" : this.convertDate(dt.endDate),
        "isActive": dt.isActive,
        "personalCardAttaches": [
          ...personalCardAttachesEmp
        ],
        "employeeCards": this.removeId(_employeeCardList)
      }
    }

    if (data.employeeInfo.startDate === "") delete data.employeeInfo.startDate;
    if (data.employeeInfo.endDate === "") delete data.employeeInfo.endDate;
    if (dt.phone1 !== "") data['address']['officialAddress']['phone1'] = dt.phone1
    if (dt.phone2 !== "") data['address']['officialAddress']['phone2'] = dt.phone2
    if (dt.currentAddress !== "") data['address']['currentAddress'] = currentAddress
    if (dt.mobile !== "" && dt.mobile !== null) data['userInfo']['mobile'] = dt.phone2

    return data
  }

  convertDate(date) {
    let _expiredDate = date
    if (_expiredDate !== "" && _expiredDate !== null) {
      let spDate = date.split("/");
      _expiredDate = spDate[1] + "/" + spDate[0] + "/" + spDate[2]
      _expiredDate = moment(_expiredDate).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]')
    }
    else {
      _expiredDate = null
    }
    return _expiredDate
  }

  mergeData(data, mergeData) {
    let _newData = [...data]
    for (let index in mergeData) {
      _newData.push(mergeData[index])
    }
    return _newData
  }
  render() {
    let {
      formData, alertSetting, cardTypeList, countryList, provinceList, districtList, subdistrictList,
      countryList_current, provinceList_current, districtList_current, subdistrictList_current,
      driverProfileCards, drivers, customerList, lisenceCardList, employeeCardList, defaultLanguageList
    } = this.state
    let { statusSubmit } = this.props

    return (
      <PannelBox title={t("driver_24")}>
        <Alert
          setting={alertSetting}
          onConfirm={() => {
            if (alertSetting.type === 4) {
              alertSetting.show = false
            }
            else if (alertSetting.type === 3) {
              alertSetting.show = false
              this.submitConfirm()
            }
            else if (statusSubmit.status) {
              alertSetting.show = true
              this.props.history.push("/driver")
            }
            else {
              alertSetting.show = false
            }
            this.setState({ alertSetting })
          }}
          onCancel={() => {
            alertSetting.show = false
            this.setState({ alertSetting })
          }}
        />

        <Form
          className="title-form"
          schema={
            setSchema(cardTypeList, countryList, provinceList, districtList, subdistrictList,
              countryList_current, provinceList_current, districtList_current, subdistrictList_current,
              driverProfileCards, drivers, customerList, lisenceCardList, employeeCardList, defaultLanguageList)
          }
          uiSchema={uiSchema}
          fields={fields}
          formData={formData}
          onChange={v => this.onFormChange(v)}
          onSubmit={v => this.submit(v)}
          noHtml5Validate={true}
        >

          <div className="hr-line-dashed" />
          <div className="row" style={{ textAlign: "right" }}>
            <CancelButton
              name={t("cancel")}
              loading={false}
              onClick={() => {
                this.props.history.push("/driver")
              }} />
            <SaveButton
              name={t("save")}
            // loading={this.props.loading}
            />
          </div>
        </Form>
      </PannelBox>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.driver.loading,
  formAction: state.driver.formAction,
  submitSuccess: state.driver.submitSuccess,
  driverData: state.driver.driverData,
  statusSubmit: state.driver.statusSubmit,
  driverExisting: state.driver.driverExisting,

  driverProfile: state.driver.driverProfile,
  CustomerData: state.dropdown.CustomerData,
  CardTypeData: state.dropdown.CardTypeData,
  lstLanguage: state.user.lstLanguage,


  LocationCountryOfficialData: state.dropdown.LocationCountryOfficialData,
  LocationProvinceOfficialData: state.dropdown.LocationProvinceOfficialData,
  LocationDistrictOfficialData: state.dropdown.LocationDistrictOfficialData,
  LocationSubdistrictOfficialData: state.dropdown.LocationSubdistrictOfficialData,

  LocationCountryCurrentData: state.dropdown.LocationCountryCurrentData,
  LocationProvinceCurrentData: state.dropdown.LocationProvinceCurrentData,
  LocationDistrictCurrentData: state.dropdown.LocationDistrictCurrentData,
  LocationSubdistrictCurrentData: state.dropdown.LocationSubdistrictCurrentData,
});
const mapDispatchToProps = (dispatch) => ({
  getDriver: (id) => dispatch(DriverActions.getDriver(id)),
  createDriver: (data) => dispatch(DriverActions.createDriver(data)),
  updateDriver: (id, data) => dispatch(DriverActions.updateDriver(id, data)),
  getDataDropdown: (optionGroup, key) => dispatch(DropdownActions.getDataDropdown(optionGroup, key)),
  getDataDropdownLocation: (optionGroup, key, stateName) => dispatch(DropdownActions.getDataDropdownLocation(optionGroup, key, stateName)),
  getExistingDriver: (personalId, customerId) => dispatch(DriverActions.getExistingDriver(personalId, customerId)),
  setPersonalIdSelect: (personalId, action) => dispatch(DriverActions.setPersonalIdSelect(personalId, action)),
  setDriverExisting: (driverExisting) => dispatch(DriverActions.setDriverExisting(driverExisting)),
  getUserCreateAndUpdateOpt: (name, id, query) => dispatch(UserActions.getUserCreateAndUpdateOpt(name, id, query)),

});

export default connect(mapStateToProps, mapDispatchToProps)(DriverForm)
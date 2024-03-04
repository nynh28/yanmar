
import React, { Component } from 'react'
import { connect } from 'react-redux'
import DriverActions from '../../Redux/DriverRedux'
import DropdownActions from '../../Redux/DropdownRedux'
import PannelBox from '../../Components/PannelBox'
import Form from "react-jsonschema-form"
import { setSchema } from './Form/setSchema.js'
import BasicData from "./Form/Fields/BasicData"
import EmployeeData from "./Form/Fields/EmployeeData"
import { diff } from 'json-diff';
import { ArrayFieldTemplateNoSeperator } from "../../Components/FormComponent/ArrayFieldTemplateNoSeperator"
import { ArrayFieldForm } from "../../Components/FormComponent/ArrayFieldForm"
import { LicenseData } from "./Form/Fields/LicenseData"
import SaveButton from '../../Components/SaveButton'
import CancelButton from '../../Components/CancelButton'
import './Form/styles.css'
import { get } from 'lodash'
import Alert from '../../Components/Alert'

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

const formDataDefault = {
  DriverDetail: {
    basicData: {
      intCustId: "",
      intCustId_value: "",
      personalID: "",
      prefix: "",
      firstname: "",
      lastname: "",
      personalCard: "",
      nickname: "",
      lastUpdated: "",

      houseNo: "",
      villageNo: "",
      building: "",
      roomNo: "",
      soi: "",
      road: "",
      villageName: "",
      subDistrict: "",
      district: "",
      province: "",
      country: "Thailand",
      subDistrict_value: "",
      district_value: "",
      province_value: "",
      country_value: "1",
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
      subDistrict_current: "",
      district_current: "",
      province_current: "",
      country_current: "Thailand",
      subDistrict_current_value: "",
      district_current_value: "",
      province_current_value: "",
      country_current_value: "1",
      postalCode_current: "",
      phone1_current: "",
      ext1_current: "",
      phone2_current: "",
      ext2_current: "",

      userName: "",
      avartar: "",
      mobile: "",
      email: "",
      lineId: "",

      driverFile: "",
      employeeCode: "",
      displayName: "",
      department: "",
      position: "",
      startDate: "",
      endDate: "",
      isActive: false
    },
    employeeData: {
      employeeCode: "",

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
      formData: {
        DriverDetail: {
          basicData: {
            intCustId: "",
            intCustId_value: "",
            personalID: "",
            prefix: "",
            firstname: "",
            lastname: "",
            personalCard: "",
            nickname: "",
            lastUpdated: "",

            houseNo: "",
            villageNo: "",
            building: "",
            roomNo: "",
            soi: "",
            road: "",
            villageName: "",
            subDistrict: "",
            district: "",
            province: "",
            country: "Thailand",
            subDistrict_value: "",
            district_value: "",
            province_value: "",
            country_value: "1",
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
            subDistrict_current: "",
            district_current: "",
            province_current: "",
            country_current: "Thailand",
            subDistrict_current_value: "",
            district_current_value: "",
            province_current_value: "",
            country_current_value: "1",
            postalCode_current: "",
            phone1_current: "",
            ext1_current: "",
            phone2_current: "",
            ext2_current: "",

            userName: "",
            avartar: "",
            mobile: "",
            email: "",
            lineId: "",

            driverFile: "",
            employeeCode: "",
            displayName: "",
            department: "",
            position: "",
            startDate: "",
            endDate: "",
            isActive: false
          },
          LicenseDetail: {
            licenseData: [{
              cardType: '11111',
              cardNo: '11111'
            },
            {
              cardType: '22222',
              cardNo: '22222'
            }
            ]

          }
        },
        // LicenseDetail: {
        //   type: "object",
        //   title: "Employee Card",
        //   properties: {
        //     licenseData: {
        //       type: "array",
        //       items: {
        //         type: "object",
        //         label: {
        //           cardType: 'Card Type',
        //           cardNo: 'Card No.',
        //           expireedDate: 'Expireed Date',
        //           description: 'Description'
        //         }
        //       }
        //     }
        //   }
        // }
      },
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
      driverProfileCards: [],
      drivers: [],
      defaultValue: {
        country: "Thailand",
        country_current: "Thailand"
      },
      inputTypeChange: {
        country: 'select',
        country_current: 'select',
        country_billing: 'select',
        country_mailing: 'select'
      },
    }
  }


  componentWillMount() {
    this.props.getDataDropdown("LocationCountry")
    this.props.getDataDropdownLocation("LocationCountry", "", "LocationCountryCurrentDataDv")
    this.props.getDataDropdown("CardType")
    this.props.getDataDropdown("Customer")

    if (this.props.formAction.action === "edit") {
      this.setAlertSetting(true, 5)
    }
    this.props.formAction.personalId !== "" && this.props.getExistingDriver(this.props.formAction.personalId, "")
  }

  componentWillUnmount() {
    this.props.setPersonalIdSelect("", "")
    this.props.setDriverExisting({})
  }

  componentDidUpdate(prevProps, prevState) {
    let { defaultValue, formData } = this.state
    let {
      driverExisting, driverProfile, formAction, CustomerData, submitSuccess,
      LocationCountryData, LocationProvinceData, LocationDistrictData, LocationSubdistrictData, CardTypeData,
      LocationCountryCurrentDataDv, LocationProvinceCurrentDataDv, LocationDistrictCurrentDataDv, LocationSubdistrictCurrentDataDv
    } = this.props

    if (prevProps.submitSuccess !== submitSuccess) {
      if (submitSuccess) {
        this.props.history.push("/driver")
      }
    }

    if (prevProps.driverExisting !== driverExisting) {
      console.log("DRIVER EXISTING", driverExisting)
      if (driverExisting.isExisting) {
        const { formData } = this.state
        let _formData = formData.DriverDetail.basicData

        const driverProfile = driverExisting.driverProfile
        const officialAddress = driverProfile.officialAddress
        const currentAddress = driverProfile.currentAddress

        const user = driverExisting.user
        const driverProfileCards = driverExisting.driverProfileCards
        const drivers = driverExisting.drivers

        _formData.personalID = formAction.personalId
        _formData.prefix = get(driverProfile, 'prefix', '')
        _formData.firstname = get(driverProfile, 'firstname', '')
        _formData.lastname = get(driverProfile, 'lastname', '')
        _formData.nickname = get(driverProfile, 'nickname', '')

        _formData.houseNo = get(officialAddress, 'houseNo', '')
        _formData.villageNo = get(officialAddress, 'villageNo', '')
        _formData.building = get(officialAddress, 'buildingName', '')
        _formData.roomNo = get(officialAddress, 'roomNo', '')
        _formData.soi = get(officialAddress, 'soi', '')
        _formData.road = get(officialAddress, 'road', '')
        _formData.villageName = get(officialAddress, 'villageName', '')
        _formData.subDistrict = get(officialAddress, 'subDistrictNav.value', '')
        _formData.district = get(officialAddress, 'districtNav.value', '')
        _formData.province = get(officialAddress, 'provinceNav.value', '')
        _formData.country = get(officialAddress, 'countryNav.value', '')
        _formData.subDistrict_value = get(officialAddress, 'subDistrictNav.key', '')
        _formData.district_value = get(officialAddress, 'districtNav.key', '')
        _formData.province_value = get(officialAddress, 'provinceNav.key', '')
        _formData.country_value = get(officialAddress, 'countryNav.key', '')
        _formData.postalCode = get(officialAddress, 'postalCode', '')
        _formData.phone1 = get(officialAddress, 'phone1', '')
        _formData.ext1 = get(officialAddress, 'ext1', '')
        _formData.phone2 = get(officialAddress, 'phone2', '')
        _formData.ext2 = get(officialAddress, 'ext2', '')

        _formData.houseNo_current = get(currentAddress, 'houseNo', '')
        _formData.villageNo_current = get(currentAddress, 'villageNo', '')
        _formData.building_current = get(currentAddress, 'buildingName', '')
        _formData.roomNo_current = get(currentAddress, 'roomNo', '')
        _formData.soi_current = get(currentAddress, 'soi', '')
        _formData.road_current = get(currentAddress, 'road', '')
        _formData.villageName_current = get(currentAddress, 'villageName', '')
        _formData.subDistrict_current = get(currentAddress, 'subDistrictNav.value', '')
        _formData.district_current = get(currentAddress, 'districtNav.value', '')
        _formData.province_current = get(currentAddress, 'provinceNav.value', '')
        _formData.country_current = get(currentAddress, 'countryNav.value', '')
        _formData.subDistrict_current_value = get(currentAddress, 'subDistrictNav.key', '')
        _formData.district_current_value = get(currentAddress, 'districtNav.key', '')
        _formData.province_current_value = get(currentAddress, 'provinceNav.key', '')
        _formData.country_current_value = get(currentAddress, 'countryNav.key', '')
        _formData.postalCode_current = get(currentAddress, 'postalCode', '')
        _formData.phone1_current = get(currentAddress, 'phone1', '')
        _formData.ext1_current = get(currentAddress, 'ext1', '')
        _formData.phone2_current = get(currentAddress, 'phone2', '')
        _formData.ext2_current = get(currentAddress, 'ext2', '')

        _formData.userName = get(user, 'userName', '')
        _formData.mobile = get(user, 'mobile', '')
        _formData.email = get(user, 'email', '')
        _formData.lineId = get(user, 'lineId', '')

        // Load Locations Dropdown Binding
        this.props.getDataDropdown("LocationProvince", get(officialAddress, 'countryNav.key', 0))
        this.props.getDataDropdown("LocationDistrict", get(officialAddress, 'provinceNav.key', 0))
        this.props.getDataDropdown("LocationSubdistrict", get(officialAddress, 'districtNav.key', 0))

        this.props.getDataDropdownLocation("LocationProvince", get(currentAddress, 'countryNav.key', 0), "LocationProvinceCurrentDataDv")
        this.props.getDataDropdownLocation("LocationDistrict", get(currentAddress, 'provinceNav.key', 0), "LocationDistrictCurrentDataDv")
        this.props.getDataDropdownLocation("LocationSubdistrict", get(currentAddress, 'districtNav.key', 0), "LocationSubdistrictCurrentDataDv")

        formData.DriverDetail.basicData = _formData
        this.setState({ formData, driverProfileCards: [...driverProfileCards], drivers: [...drivers] })
      }
    }

    prevProps.CustomerData !== CustomerData && this.setState({ customerList: this.renameKey(CustomerData) })
    prevProps.CardTypeData !== CardTypeData && this.setState({ cardTypeList: this.renameKey(CardTypeData) })
    // Official Address
    if (prevProps.LocationCountryData !== LocationCountryData) {
      this.props.getDataDropdown("LocationProvince", 1)
      this.setState({ countryList: this.renameKey(LocationCountryData) })
    }

    prevProps.LocationProvinceData !== LocationProvinceData && this.setState({
      provinceList: this.renameKey(LocationProvinceData)
    })

    prevProps.LocationDistrictData !== LocationDistrictData && this.setState({ districtList: this.renameKey(LocationDistrictData) })
    prevProps.LocationSubdistrictData !== LocationSubdistrictData && this.setState({ subdistrictList: this.renameKey(LocationSubdistrictData) })

    // Current Address
    if (prevProps.LocationCountryCurrentDataDv !== LocationCountryCurrentDataDv) {
      this.props.getDataDropdownLocation("LocationProvince", 1, "LocationProvinceCurrentDataDv")
      this.setState({ countryList_current: this.renameKey(LocationCountryCurrentDataDv) })
    }
    prevProps.LocationProvinceCurrentDataDv !== LocationProvinceCurrentDataDv && this.setState({ provinceList_current: this.renameKey(LocationProvinceCurrentDataDv) })
    prevProps.LocationDistrictCurrentDataDv !== LocationDistrictCurrentDataDv && this.setState({ districtList_current: this.renameKey(LocationDistrictCurrentDataDv) })
    prevProps.LocationSubdistrictCurrentDataDv !== LocationSubdistrictCurrentDataDv && this.setState({ subdistrictList_current: this.renameKey(LocationSubdistrictCurrentDataDv) })
  }

  setAlertSetting(isShow, type, content = "", ErrorSubcode) {
    let { alertSetting } = this.state
    alertSetting.show = isShow
    alertSetting.type = type
    alertSetting.content = content
    alertSetting.ErrorSubcode = ErrorSubcode
    this.setState({ alertSetting })
  }

  getOwnPropertyNames = oject => {
    return Object.getOwnPropertyNames(JSON.parse(JSON.stringify(oject)))
  }

  setBindingFormData(data, objectsName, fieldList) {
    let formBasic = Object.getOwnPropertyNames(this.state.formData.DriverDetail.basicData)
    for (let index in fieldList) {
      let found = formBasic.find(x => x === fieldList[index]);
      found !== undefined && this.bindingData(fieldList[index], data[objectsName][fieldList[index]])
    }
  }


  renameKey(data) {
    let result = []
    for (let index in data) result.push({ label: data[index].value, value: data[index].key })
    return result
  }


  onFormChange(v) {
    let diffValue = get(diff(this.state.formData, v.formData), 'DriverDetail.basicData', undefined)
    if (diffValue === undefined) return


    console.log("CHANGE CHANGE")
    //#region  Update state.formData
    let objects = Object.getOwnPropertyNames(diffValue)
    console.log("objects CHANGE", diffValue)
    for (let index in objects) {
      console.log(objects[index])
      if ("" + objects[index] === "country"
        || "" + objects[index] === "province"
        || "" + objects[index] === "district"
        || "" + objects[index] === "subDistrict"
        || "" + objects[index] === "country_current"
        || "" + objects[index] === "province_current"
        || "" + objects[index] === "district_current"
        || "" + objects[index] === "subDistrict_current"
      ) {
        this.locationChange("" + objects[index], diffValue["" + objects[index]]["__new"], diffValue["" + objects[index] + "_value"]["__new"])
      }
      else if ("" + objects[index] !== "inputTypeChange__added") {
        this.bindingData("" + objects[index], diffValue["" + objects[index]]["__new"])
      }
    }
    //#endregion
  }

  bindingData(fieldName, value) {
    let { formData } = this.state
    formData.DriverDetail.basicData[fieldName] = value
    this.setState({ formData })
  }

  locationChange(fieldName, value, key) {
    //#region  Dropdown change binding condition
    let { formData, inputTypeChange, defaultValue } = this.state

    switch (fieldName) {
      case "country":
        if (value !== "Thailand" && value !== "ไทย") {
          inputTypeChange.country = "text"
          formData.DriverDetail.basicData.country = value
          formData.DriverDetail.basicData.province = ""
          formData.DriverDetail.basicData.district = ""
          formData.DriverDetail.basicData.subDistrict = ""

          formData.DriverDetail.basicData.country_value = key
          formData.DriverDetail.basicData.province_value = ""
          formData.DriverDetail.basicData.district_value = ""
          formData.DriverDetail.basicData.subDistrict_value = ""
          this.props.getDataDropdown("LocationProvince", key)
          this.props.getDataDropdown("LocationDistrict", 0)
          this.props.getDataDropdown("LocationSubdistrict", 0)
        }
        else {
          inputTypeChange.country = "select"
          formData.DriverDetail.basicData.country = value
          formData.DriverDetail.basicData.country_value = key
        }
        break;
      case "province":
        formData.DriverDetail.basicData.province = value
        formData.DriverDetail.basicData.district = ""
        formData.DriverDetail.basicData.subDistrict = ""
        formData.DriverDetail.basicData.province_value = key
        formData.DriverDetail.basicData.district_value = ""
        formData.DriverDetail.basicData.subDistrict_value = ""
        this.props.getDataDropdown("LocationDistrict", key)
        this.props.getDataDropdown("LocationSubdistrict", 0)
        break;
      case "district":
        formData.DriverDetail.basicData.district = value
        formData.DriverDetail.basicData.subDistrict = ""
        formData.DriverDetail.basicData.district_value = key
        formData.DriverDetail.basicData.subDistrict_value = ""
        this.props.getDataDropdown("LocationSubdistrict", key)

        break;
      case "subDistrict":
        formData.DriverDetail.basicData.subDistrict = value
        formData.DriverDetail.basicData.subDistrict_value = key
        break;
      case "country_current":
        if (value !== "Thailand" && value !== "ไทย") {
          inputTypeChange.country_current = "text"
          formData.DriverDetail.basicData.country_current = value
          formData.DriverDetail.basicData.province_current = ""
          formData.DriverDetail.basicData.district_current = ""
          formData.DriverDetail.basicData.subDistrict_current = ""
          formData.DriverDetail.basicData.country_current_value = key
          formData.DriverDetail.basicData.province_current_value = ""
          formData.DriverDetail.basicData.district_current_value = ""
          formData.DriverDetail.basicData.subDistrict_current_value = ""
          this.props.getDataDropdownLocation("LocationProvince", key, "LocationProvinceCurrentDataDv")
          this.props.getDataDropdownLocation("LocationDistrict", 0, "LocationDistrictCurrentDataDv")
          this.props.getDataDropdownLocation("LocationSubdistrict", 0, "LocationSubdistrictCurrentDataDv")
        }
        else {
          inputTypeChange.country_current = "select"
          formData.DriverDetail.basicData.country_current = value
          formData.DriverDetail.basicData.country_current_value = key
        }
        break;
      case "province_current":
        formData.DriverDetail.basicData.province_current = value
        formData.DriverDetail.basicData.district_current = ""
        formData.DriverDetail.basicData.subDistrict_current = ""
        formData.DriverDetail.basicData.province_current_value = key
        formData.DriverDetail.basicData.district_current_value = ""
        formData.DriverDetail.basicData.subDistrict_current_value = ""
        this.props.getDataDropdownLocation("LocationDistrict", key, "LocationDistrictCurrentDataDv")
        this.props.getDataDropdownLocation("LocationSubdistrict", 0, "LocationSubdistrictCurrentDataDv")
        break;
      case "district_current":
        formData.DriverDetail.basicData.district_current = value
        formData.DriverDetail.basicData.subDistrict_current = ""
        formData.DriverDetail.basicData.district_current_value = key
        formData.DriverDetail.basicData.subDistrict_current_value = ""
        this.props.getDataDropdownLocation("LocationSubdistrict", key, "LocationSubdistrictCurrentDataDv")
        break;
      case "subDistrict_current":
        formData.DriverDetail.basicData.subDistrict_current = value
        formData.DriverDetail.basicData.subDistrict_current_value = key
        break;
    }

    //#endregion
    this.setState({ formData, inputTypeChange })
  }


  submit(FormData) {
    let { driverExisting } = this.props

    console.log("FormData : ", FormData)

    if (this.props.formAction.action === "edit" || driverExisting.isExisting) {
      // Update Driver
      let data = this.mappingFieldsUpdate(FormData.formData.DriverDetail)
      console.log("Form Update", data)
      //   console.log(JSON.stringify(data))
      // this.props.updateDriver(FormData.formData.DriverDetail.basicData.personalID, data)
    }
    else {
      // Create new Driver
      let data = this.mappingFieldsInsert(FormData.formData.DriverDetail)
      console.log("Form Insert", data)
      // this.props.createDriver(data)
    }
  }

  mappingFieldsInsert(FormData) {
    let dt = FormData.basicData

    let data = {
      "intCustId": dt.intCustId_value,
      "employeeCode": dt.employeeCode,
      "personalId": dt.personalID,
      "displayName": dt.displayName,
      "department": dt.department,
      "position": dt.position,
      "officialAddress": {
        "countryNav": {
          "key": dt.country_value
        },
        "houseNo": dt.houseNo,
        "villageNo": dt.villageNo,
        "buildingName": dt.building,
        "roomNo": dt.roomNo,
        "soi": dt.soi,
        "road": dt.road,
        "villageName": dt.villageName,
        "subDistrictNav": {
          "key": dt.subDistrict_value
        },
        "subDistrictName": dt.subDistrict,
        "districtNav": {
          "key": dt.district_value
        },
        "districtName": dt.district,
        "provinceNav": {
          "key": dt.province_value
        },
        "provinceName": dt.province,
        "postalCode": dt.postalCode,
        "phone1": dt.phone1,
        "ext1": dt.ext1,
        "phone2": dt.phone2,
        "ext2": dt.ext2
      },
      "isCurrentSameOfficial": dt.isCurrentSameOfficial,
      "currentAddress": {
        "countryNav": {
          "key": dt.isCurrentSameOfficial ? dt.country_value : dt.country_current_value
        },
        "houseNo": dt.isCurrentSameOfficial ? dt.houseNo : dt.houseNo_current,
        "villageNo": dt.isCurrentSameOfficial ? dt.villageNo : dt.villageNo_current,
        "buildingName": dt.isCurrentSameOfficial ? dt.building : dt.building_current,
        "roomNo": dt.isCurrentSameOfficial ? dt.roomNo : dt.roomNo_current,
        "soi": dt.isCurrentSameOfficial ? dt.soi : dt.soi_current,
        "road": dt.isCurrentSameOfficial ? dt.road : dt.road_current,
        "villageName": dt.isCurrentSameOfficial ? dt.villageName : dt.villageName_current,
        "subDistrictNav": {
          "key": dt.isCurrentSameOfficial ? dt.subDistrict_value : dt.subDistrict_current_value
        },
        "subDistrictName": dt.isCurrentSameOfficial ? dt.subDistrict : dt.subDistrict_current,
        "districtNav": {
          "key": dt.isCurrentSameOfficial ? dt.district_value : dt.district_current_valuedt
        },
        "districtName": dt.isCurrentSameOfficial ? dt.district : dt.district_current,
        "provinceNav": {
          "key": dt.isCurrentSameOfficial ? dt.province_value : dt.province_current_value
        },
        "provinceName": dt.isCurrentSameOfficial ? dt.province : dt.province_current,
        "postalCode": dt.isCurrentSameOfficial ? dt.postalCode : dt.postalCode_current,
        "phone1": dt.isCurrentSameOfficial ? dt.phone1 : dt.phone1_current,
        "ext1": dt.isCurrentSameOfficial ? dt.ext1 : dt.ext1_current,
        "phone2": dt.isCurrentSameOfficial ? dt.phone2 : dt.phone2_current,
        "ext2": dt.isCurrentSameOfficial ? dt.ext2 : dt.ext2_current,
      },
      "startDate": dt.startDate,
      "endDate": dt.endDate,
      "prefix": dt.prefix,
      "firstname": dt.firstname,
      "lastname": dt.lastname,
      "nickname": dt.nickname
    }

    return data
  }

  mappingFieldsUpdate(FormData) {

    let isExisting = this.props.driverExisting.isExisting

    let dt = FormData.basicData

    console.log("dt", dt)

    let driverProfileCards = []
    let drivers = []

    let driverProfileCard = {
      "action": "",
      "id": 0,
      "dltCountry": "",
      "cardExpiredDate": "",
      "birthDate": "",
      "dltCardTypeNav": {
        "key": "",
        "value": ""
      },
      "dltSexTypeNav": {
        "key": "",
        "value": ""
      },
      "cardId": "",
      "dltProvinceNav": {
        "key": "",
        "value": ""
      },
      "dltBranchNav": {
        "key": "",
        "value": ""
      },
      "isLifetime": true
    }

    let driver = {
      "action": "",
      "id": 0,
      "intCustNav": {
        "key": 0,
        "value": ""
      },
      "employeeCode": "",
      "displayName": "",
      "department": "",
      "position": "",
      "startDate": "",
      "endDate": "",
      "driverCardInfos": [
        {
          "action": "",
          "id": 0,
          "driverId": 0,
          "cardTypeNav": {
            "key": 0,
            "value": ""
          },
          "cardId": "",
          "cardExpired": "",
          "description": ""
        }
      ],
      "isActive": true
    }

    let data = {
      "driverProfile": {
        "action": "UPDATE",
        "prefix": dt.prefix,
        "firstname": dt.firstname,
        "lastname": dt.lastname,
        "nickname": dt.nickname,
        "officialAddress": {
          "countryNav": {
            "key": dt.country_value
          },
          "houseNo": dt.houseNo,
          "villageNo": dt.villageNo,
          "buildingName": dt.building,
          "roomNo": dt.roomNo,
          "soi": dt.soi,
          "road": dt.road,
          "villageName": dt.villageName,
          "subDistrictNav": {
            "key": dt.subDistrict_value
          },
          // "subDistrictName": dt.subDistrict,
          "subDistrictName": "TESTEST",
          "districtNav": {
            "key": dt.district_value
          },
          "districtName": dt.district,
          "provinceNav": {
            "key": dt.province_value
          },
          "provinceName": dt.province,
          "postalCode": dt.postalCode,
          "phone1": dt.phone1,
          "ext1": dt.ext1,
          "phone2": dt.phone2,
          "ext2": dt.ext2
        },
        "isCurrentSameOfficial": dt.isCurrentSameOfficial,
        "currentAddress": {
          "countryNav": {
            "key": dt.isCurrentSameOfficial ? dt.country_value : dt.country_current_value
          },
          "houseNo": dt.isCurrentSameOfficial ? dt.houseNo : dt.houseNo_current,
          "villageNo": dt.isCurrentSameOfficial ? dt.villageNo : dt.villageNo_current,
          "buildingName": dt.isCurrentSameOfficial ? dt.building : dt.building_current,
          "roomNo": dt.isCurrentSameOfficial ? dt.roomNo : dt.roomNo_current,
          "soi": dt.isCurrentSameOfficial ? dt.soi : dt.soi_current,
          "road": dt.isCurrentSameOfficial ? dt.road : dt.road_current,
          "villageName": dt.isCurrentSameOfficial ? dt.villageName : dt.villageName_current,
          "subDistrictNav": {
            "key": dt.isCurrentSameOfficial ? dt.subDistrict_value : dt.subDistrict_current_value
          },
          "subDistrictName": dt.isCurrentSameOfficial ? dt.subDistrict : dt.subDistrict_current,
          "districtNav": {
            "key": dt.isCurrentSameOfficial ? dt.district_value : dt.district_current_valuedt
          },
          "districtName": dt.isCurrentSameOfficial ? dt.district : dt.district_current,
          "provinceNav": {
            "key": dt.isCurrentSameOfficial ? dt.province_value : dt.province_current_value
          },
          "provinceName": dt.isCurrentSameOfficial ? dt.province : dt.province_current,
          "postalCode": dt.isCurrentSameOfficial ? dt.postalCode : dt.postalCode_current,
          "phone1": dt.isCurrentSameOfficial ? dt.phone1 : dt.phone1_current,
          "ext1": dt.isCurrentSameOfficial ? dt.ext1 : dt.ext1_current,
          "phone2": dt.isCurrentSameOfficial ? dt.phone2 : dt.phone2_current,
          "ext2": dt.isCurrentSameOfficial ? dt.ext2 : dt.ext2_current,
        }
      },
      "driverProfileCards": [
        ...driverProfileCards
      ],
      "drivers": [
        ...drivers
      ],
      "isExisting": isExisting
    }

    return data
  }

  render() {
    let {
      formData, cardTypeList, countryList, provinceList, districtList, subdistrictList,
      countryList_current, provinceList_current, districtList_current, subdistrictList_current,
      inputTypeChange, driverProfileCards, drivers, customerList
    } = this.state

    const log = (type) => console.log.bind(console, type);

    return (
      <PannelBox title={'Driver'}>
        <Form
          className="title-form"
          schema={
            setSchema(cardTypeList, countryList, provinceList, districtList, subdistrictList,
              countryList_current, provinceList_current, districtList_current, subdistrictList_current,
              inputTypeChange, driverProfileCards, drivers, customerList)
          }
          uiSchema={uiSchema}
          fields={fields}
          formData={formData}
          onChange={v => this.onFormChange(v)}
          onSubmit={v => this.submit(v)}
          onError={log("errors")}
        >

          <div className="hr-line-dashed" />
          <div className="row" style={{ textAlign: "right" }}>
            <CancelButton
              loading={false}
              onClick={() => {
                this.props.history.push("/driver")
              }} />
            <SaveButton
              loading={this.props.loading}
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
  driverExisting: state.driver.driverExisting,
  driverProfile: state.driver.driverProfile,
  CustomerData: state.dropdown.CustomerData,
  CardTypeData: state.dropdown.CardTypeData,
  LocationCountryData: state.dropdown.LocationCountryData,
  LocationProvinceData: state.dropdown.LocationProvinceData,
  LocationDistrictData: state.dropdown.LocationDistrictData,
  LocationSubdistrictData: state.dropdown.LocationSubdistrictData,
  LocationCountryCurrentDataDv: state.dropdown.LocationCountryCurrentDataDv,
  LocationProvinceCurrentDataDv: state.dropdown.LocationProvinceCurrentDataDv,
  LocationDistrictCurrentDataDv: state.dropdown.LocationDistrictCurrentDataDv,
  LocationSubdistrictCurrentDataDv: state.dropdown.LocationSubdistrictCurrentDataDv,
});
const mapDispatchToProps = (dispatch) => ({
  createDriver: (data) => dispatch(DriverActions.createDriver(data)),
  updateDriver: (personalId, data) => dispatch(DriverActions.updateDriver(personalId, data)),
  getDataDropdown: (optionGroup, key) => dispatch(DropdownActions.getDataDropdown(optionGroup, key)),
  getDataDropdownLocation: (optionGroup, key, stateName) => dispatch(DropdownActions.getDataDropdownLocation(optionGroup, key, stateName)),
  getExistingDriver: (personalId, customerId) => dispatch(DriverActions.getExistingDriver(personalId, customerId)),
  setPersonalIdSelect: (personalId, action) => dispatch(DriverActions.setPersonalIdSelect(personalId, action)),
  setDriverExisting: (driverExisting) => dispatch(DriverActions.setDriverExisting(driverExisting)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DriverForm)

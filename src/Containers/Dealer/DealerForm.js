import React, { Component } from 'react'
import { connect } from 'react-redux'
import PannelBox from '../../Components/PannelBox'
import Form from "react-jsonschema-form"
import SaveButton from '../../Components/SaveButton'
import CancelButton from '../../Components/CancelButton'
import { BasicData } from "./Form/Fields/BasicData"
import { setSchema } from './Form/schema.js'
import DropdownActions from '../../Redux/DropdownRedux'
import DealerActions from '../../Redux/DealerRedux'
import { diff } from 'json-diff';
import { get } from 'lodash'
import { t } from '../../Components/Translation'
import Alert from '../../Components/Alert'

const DealerTitleField = () => { return '' }

export const fields = {
  TitleField: DealerTitleField,
  basicData: BasicData
}

export const uiSchema = {
  DealerDetail: {
    basicData: {
      "ui:field": "basicData",
    },
  }
}

const listLocation = [
  'subDistrict', 'district', 'province', 'country',
  'subDistrict_current', 'district_current', 'province_current', 'country_current',
  'subDistrict_billing', 'district_billing', 'province_billing', 'country_billing',
  'subDistrict_mailing', 'district_mailing', 'province_mailing', 'country_mailing',
]

class DealerForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      alertSetting: {
        show: false,
        type: 3,
        content: "",
        ErrorSubcode: 0
      },
      loading: false,
      processing: false,
      formData: {
        DealerDetail: {
          basicData: {
            individual: false,
            taxId: "",
            taxBranchId: "",
            dealerCode: "",
            areaCode: "",
            dealerPrefixTh: "",
            dealerFirstNameTh: "",
            dealerLastNameTh: "",
            dealerPrefixEn: "",
            dealerFirstNameEn: "",
            dealerLastNameEn: "",
            email: "",
            lineId1: "",

            groupTaxId: "",
            groupTaxBranchId: "",
            lineId2: "",

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
            country: "1",
            postalCode: "",
            phone1: "",
            ext1: "",
            phone2: "",
            ext2: "",
            fax: "",

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
            country_current: "1",
            postalCode_current: "",
            phone1_current: "",
            ext1_current: "",
            phone2_current: "",
            ext2_current: "",
            fax_current: "",

            isBillingSameOfficail: false,
            houseNo_billing: "",
            villageNo_billing: "",
            building_billing: "",
            roomNo_billing: "",
            soi_billing: "",
            road_billing: "",
            villageName_billing: "",
            subDistrict_billing: "",
            district_billing: "",
            province_billing: "",
            country_billing: "1",
            postalCode_billing: "",
            phone1_billing: "",
            ext1_billing: "",
            phone2_billing: "",
            ext2_billing: "",
            fax_billing: "",

            isMailingSameOfficail: false,
            houseNo_mailing: "",
            villageNo_mailing: "",
            building_mailing: "",
            roomNo_mailing: "",
            soi_mailing: "",
            road_mailing: "",
            villageName_mailing: "",
            subDistrict_mailing: "",
            district_mailing: "",
            province_mailing: "",
            country_mailing: "1",
            postalCode_mailing: "",
            phone1_mailing: "",
            ext1_mailing: "",
            phone2_mailing: "",
            ext2_mailing: "",
            fax_mailing: "",

            signatory1: "",
            signatory2: "",
            // endoserName: "",
            // endoserPosition: "",

            businessType: "",
            vendorBusinessType: "",
            corporateType: "",
            lock: false,
            active: false,
            lastUpdated: "",

            userName: "",
            avartar: "",
            mobile: "",
            email2: "",
            lineId3: "",

            registerDate: "",
            userQuota: "",

            peopleName: "",
            peoplePhone: "",
            peopleExt: "",
            peopleEmail: "",
            peopleLine: "",
            peopleDescription: ""
          },
          employeeData: {
            employeeCode: "",

          }
        },
      },
      countryList: [],
      provinceList: [],
      districtList: [],
      subdistrictList: [],
      countryList_current: [],
      provinceList_current: [],
      districtList_current: [],
      subdistrictList_current: [],
      countryList_billing: [],
      provinceList_billing: [],
      districtList_billing: [],
      subdistrictList_billing: [],
      countryList_mailing: [],
      provinceList_mailing: [],
      districtList_mailing: [],
      subdistrictList_mailing: [],
      peopleNameList: []
      // inputTypeChange: {
      //   country: 'select',
      //   country_current: 'select'
      // }
    }
  }

  componentWillMount() {
    let { action } = this.props
    this.props.getDataDropdownLocation("LocationCountry", "", "LocationCountryOfficialData")
    this.props.getDataDropdownLocation("LocationCountry", "", "LocationCountryCurrentData")
    this.props.getDataDropdownLocation("LocationCountry", "", "LocationCountryBillingData")
    this.props.getDataDropdownLocation("LocationCountry", "", "LocationCountryMailingData")
    // if (action === 'Add') {
    if (true) {
      this.props.getDataDropdownLocation("LocationProvince", 1, "LocationProvinceOfficialData")
      this.props.getDataDropdownLocation("LocationProvince", 1, "LocationProvinceCurrentData")
      this.props.getDataDropdownLocation("LocationProvince", 1, "LocationProvinceBillingData")
      this.props.getDataDropdownLocation("LocationProvince", 1, "LocationProvinceMailingData")
    }
  }

  componentDidUpdate(prevProps) {
    let { defaultValue, statusSubmit, alertSetting } = this.state
    let {
      LocationCountryOfficialData, LocationProvinceOfficialData, LocationDistrictOfficialData, LocationSubdistrictOfficialData,
      LocationCountryCurrentData, LocationProvinceCurrentData, LocationDistrictCurrentData, LocationSubdistrictCurrentData,
      LocationCountryBillingData, LocationProvinceBillingData, LocationDistrictBillingData, LocationSubdistrictBillingData,
      LocationCountryMailingData, LocationProvinceMailingData, LocationDistrictMailingData, LocationSubdistrictMailingData,
    } = this.props

    //#region ------------ Address ------------
    // Official Address
    if (prevProps.LocationCountryOfficialData !== LocationCountryOfficialData) {
      this.setState({ countryList: LocationCountryOfficialData })
    }
    if (prevProps.LocationProvinceOfficialData !== LocationProvinceOfficialData) {
      this.setState({ provinceList: LocationProvinceOfficialData })
    }
    if (prevProps.LocationDistrictOfficialData !== LocationDistrictOfficialData) {
      this.setState({ districtList: LocationDistrictOfficialData })
    }
    if (prevProps.LocationSubdistrictOfficialData !== LocationSubdistrictOfficialData) {
      this.setState({ subdistrictList: LocationSubdistrictOfficialData })
    }

    // Current Address
    if (prevProps.LocationCountryCurrentData !== LocationCountryCurrentData) {
      this.setState({ countryList_current: LocationCountryCurrentData })
    }
    if (prevProps.LocationProvinceCurrentData !== LocationProvinceCurrentData) {
      this.setState({ provinceList_current: LocationProvinceCurrentData })
    }
    if (prevProps.LocationDistrictCurrentData !== LocationDistrictCurrentData) {
      this.setState({ districtList_current: LocationDistrictCurrentData })
    }
    if (prevProps.LocationSubdistrictCurrentData !== LocationSubdistrictCurrentData) {
      this.setState({ subdistrictList_current: LocationSubdistrictCurrentData })
    }

    // Billing Address
    if (prevProps.LocationCountryBillingData !== LocationCountryBillingData) {
      this.setState({ countryList_billing: LocationCountryBillingData })
    }
    if (prevProps.LocationProvinceBillingData !== LocationProvinceBillingData) {
      this.setState({ provinceList_billing: LocationProvinceBillingData })
    }
    if (prevProps.LocationDistrictBillingData !== LocationDistrictBillingData) {
      this.setState({ districtList_billing: LocationDistrictBillingData })
    }
    if (prevProps.LocationSubdistrictBillingData !== LocationSubdistrictBillingData) {
      this.setState({ subdistrictList_billing: LocationSubdistrictBillingData })
    }

    // Mailing Address
    if (prevProps.LocationCountryMailingData !== LocationCountryMailingData) {
      this.setState({ countryList_mailing: LocationCountryMailingData })
    }
    if (prevProps.LocationProvinceMailingData !== LocationProvinceMailingData) {
      this.setState({ provinceList_mailing: LocationProvinceMailingData })
    }
    if (prevProps.LocationDistrictMailingData !== LocationDistrictMailingData) {
      this.setState({ districtList_mailing: LocationDistrictMailingData })
    }
    if (prevProps.LocationSubdistrictMailingData !== LocationSubdistrictMailingData) {
      this.setState({ subdistrictList_mailing: LocationSubdistrictMailingData })
    }
    //#endregion ------------------------------------------------------------------------
    // ----------------------------------------

    if (prevProps.statusSubmit !== statusSubmit) {
      // alertSetting.show = true
      // alertSetting.type = statusSubmit.status ? 1 : 2
      // alertSetting.content = statusSubmit.status ? action + " User Successed" : action + " User Failed"
      // alertSetting.ErrorSubcode = statusSubmit.ErrorSubcode
      // this.setState({ alertSetting })
    }
  }


  //#region FORM CHANGE
  onFormChange(v) {
    console.log('-1')
    let diffValue = get(diff(this.state.formData, v.formData), 'DealerDetail.basicData', undefined)
    if (diffValue === undefined) return

    console.log('0')
    let objects = Object.getOwnPropertyNames(diffValue)
    for (let index in objects) {
      if (listLocation.includes("" + objects[index])) {
        console.log('1')
        this.locationChange("" + objects[index], diffValue["" + objects[index]]["__new"], diffValue["" + objects[index]]["__new"])
      }
      else if ("" + objects[index] !== "inputTypeChange__added") {
        this.bindingData("" + objects[index], diffValue["" + objects[index]]["__new"])
      }
    }
  }

  bindingData(fieldName, value) {
    let formData = JSON.parse(JSON.stringify(this.state.formData))
    formData.DealerDetail.basicData[fieldName] = value
    console.log('bindingData:', fieldName, value)
    // if (fieldName === 'ownerPartnerType') {
    //   formData.UserDetail.basicData.ownerPartner = []
    //   formData.UserDetail.basicData.userLevel = []
    //   this.props.getDataDropdownLocation("LocationCountry", "", "LocationCountryOfficialData")
    //   this.props.getDataDropdownLocation("LocationCountry", "", "LocationCountryCurrentData")
    // }
    this.setState({ formData })
  }

  locationChange(fieldName, value, key) {
    console.log('2')
    let formData = JSON.parse(JSON.stringify(this.state.formData))
    formData.DealerDetail.basicData[fieldName] = key

    let lst = fieldName.split('_')

    let ct = formData.DealerDetail.basicData[lst[1] ? 'country_' + lst[1] : 'country']
    let pv = lst[1] ? 'province_' + lst[1] : 'province'
    let dt = lst[1] ? 'district_' + lst[1] : 'district'
    let sd = lst[1] ? 'subDistrict_' + lst[1] : 'subDistrict'

    let stateName = (lst[1] ? (lst[1].charAt(0).toUpperCase() + lst[1].slice(1)) : 'Official') + "Data"

    if (fieldName.includes('country')) {
      console.log('fieldName:', fieldName, 'country', stateName)
      formData.DealerDetail.basicData[pv] = []
      formData.DealerDetail.basicData[dt] = []
      formData.DealerDetail.basicData[sd] = []
      this.props.getDataDropdownLocation("LocationProvince", key, "LocationProvince" + stateName)
    }
    else if (fieldName.includes('province') && ct == '1') {
      console.log('fieldName:', fieldName, 'province', stateName)
      formData.DealerDetail.basicData[dt] = []
      formData.DealerDetail.basicData[sd] = []
      this.props.getDataDropdownLocation("LocationDistrict", key, "LocationDistrict" + stateName)
    }
    else if (fieldName.includes('district') && ct == '1') {
      console.log('fieldName:', fieldName, 'district', stateName)
      formData.DealerDetail.basicData[sd] = []
      this.props.getDataDropdownLocation("LocationSubdistrict", key, "LocationSubdistrict" + stateName)
    }
    // console.log("key : ", key)
    this.setState({ formData })
  }

  submitConfirm() {
    let { id, action } = this.props
    if (action === 'Add') {


    } else if (action === 'Edit') {

    }

  }


  submit(e) {
    console.log(e)
    this.setAlertSetting(true, 3, this.props.action.toLowerCase() + "_dealer")

    // submit(FormData) {
    //   if (FormData.formData.UserDetail.basicData.password !== FormData.formData.UserDetail.basicData.confirmPassword) {
    //     this.setAlertSetting(true, 4, "The password confirmation does not match.")
    //   }
    //   else {
    //     this.setAlertSetting(true, 3, this.props.action + " User")
    //     this.setState({ formDataSubmit: FormData })
    //   }
    // }
  }

  setAlertSetting(isShow, type, content = "", ErrorSubcode) {
    let { alertSetting } = this.state
    alertSetting.show = isShow
    alertSetting.type = type
    alertSetting.content = content
    alertSetting.ErrorSubcode = ErrorSubcode
    this.setState({ alertSetting })
  }

  render() {
    let {
      formData, inputTypeChange,
      countryList, provinceList, districtList, subdistrictList,
      countryList_current, provinceList_current, districtList_current, subdistrictList_current,
      countryList_billing, provinceList_billing, districtList_billing, subdistrictList_billing,
      countryList_mailing, provinceList_mailing, districtList_mailing, subdistrictList_mailing,
      peopleNameList,

      alertSetting, statusSubmit
    } = this.state

    const log = (type) => console.log.bind(console, type);
    return (
      <PannelBox title={'Dealer Form'}>
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
              this.props.history.push("/userSetting")
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
          schema={
            setSchema(inputTypeChange, countryList, provinceList, districtList, subdistrictList,
              countryList_current, provinceList_current, districtList_current, subdistrictList_current,
              countryList_billing, provinceList_billing, districtList_billing, subdistrictList_billing,
              countryList_mailing, provinceList_mailing, districtList_mailing, subdistrictList_mailing,
              peopleNameList
            )
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
              name={t("cancel")}
              loading={false}
              onClick={() => {
                this.props.setIdSelectDealer(null, null)
                this.props.history.push("/dealer")
              }} />
            <SaveButton
              type="submit"
              name={t("save")}
            />
          </div>
        </Form>

      </PannelBox>
    )
  }
}

const mapStateToProps = (state) => ({
  businessPartnerId: state.signin.businessPartnerId,
  // --------------------------------------------------
  LocationCountryOfficialData: state.dropdown.LocationCountryOfficialData,
  LocationProvinceOfficialData: state.dropdown.LocationProvinceOfficialData,
  LocationDistrictOfficialData: state.dropdown.LocationDistrictOfficialData,
  LocationSubdistrictOfficialData: state.dropdown.LocationSubdistrictOfficialData,

  LocationCountryCurrentData: state.dropdown.LocationCountryCurrentData,
  LocationProvinceCurrentData: state.dropdown.LocationProvinceCurrentData,
  LocationDistrictCurrentData: state.dropdown.LocationDistrictCurrentData,
  LocationSubdistrictCurrentData: state.dropdown.LocationSubdistrictCurrentData,

  LocationCountryBillingData: state.dropdown.LocationCountryBillingData,
  LocationProvinceBillingData: state.dropdown.LocationProvinceBillingData,
  LocationDistrictBillingData: state.dropdown.LocationDistrictBillingData,
  LocationSubdistrictBillingData: state.dropdown.LocationSubdistrictBillingData,

  LocationCountryMailingData: state.dropdown.LocationCountryMailingData,
  LocationProvinceMailingData: state.dropdown.LocationProvinceMailingData,
  LocationDistrictMailingData: state.dropdown.LocationDistrictMailingData,
  LocationSubdistrictMailingData: state.dropdown.LocationSubdistrictMailingData,
  // --------------------------------------------------
  id: state.dealer.id,
  action: state.dealer.action,
  infoDealer: state.dealer.infoDealer,
  statusSubmit: state.dealer.statusSubmit,
});
const mapDispatchToProps = (dispatch) => ({
  getDataDropdown: (optionGroup, key) => dispatch(DropdownActions.getDataDropdown(optionGroup, key)),
  getDataDropdownLocation: (optionGroup, key, stateName) => dispatch(DropdownActions.getDataDropdownLocation(optionGroup, key, stateName)),
  setIdSelectDealer: (personalId, action) => dispatch(DealerActions.setIdSelectDealer(personalId, action)),
  getInfoDealer: (id) => dispatch(DealerActions.getInfoDealer(id)),
  createDealer: (newInfo) => dispatch(DealerActions.createDealer(newInfo)),
  updateDealer: (id, updateInfo) => dispatch(DealerActions.updateDealer(id, updateInfo)),

});


export default connect(mapStateToProps, mapDispatchToProps)(DealerForm)

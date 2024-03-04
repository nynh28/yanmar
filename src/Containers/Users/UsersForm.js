
import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserActions from '../../Redux/UserRedux'
import DropdownActions from '../../Redux/DropdownRedux'
import PannelBox from '../../Components/PannelBox'
import Form from "react-jsonschema-form"
import { setSchema } from './Form/schema.js'
import BasicData from "./Form/Fields/BasicData"
import { diff } from 'json-diff';
import SaveButton from '../../Components/SaveButton'
import CancelButton from '../../Components/CancelButton'
import './Form/styles.css'
import { get } from 'lodash'
import moment from 'moment'

const CustomTitleField = () => { return '' }

export const fields = {
  TitleField: CustomTitleField,
  basicData: BasicData
}

export const uiSchema = {
  UserDetail: {
    basicData: {
      "ui:field": "basicData"
    }
  }
}

class UserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      formData: {
        UserDetail: {
          basicData: {
            userLevelNav: "",
            userLevelNav_value: "",
            ownerPartnerNav: "",
            ownerPartnerNav_value: "",
            username: "",
            password: "",
            displayName: "",
            email: "",
            mobile: "",
            lineId: "",
            expiredDate: "",
            avatar: ""
          }
        }
      },
      userLevelNavList: [],
      ownerPartnerNavList: []
    }
  }


  componentWillMount() {
    let { personalId, action } = this.props
    // console.log(personalId, action)
    if (action === 'edit' && personalId) {
      // console.log('testest')
      this.props.getUserManage(personalId)

    }
    this.props.getDataDropdown('UserLevelOwner')
  }

  componentWillUnmount() {
    this.props.setPersonalIdSelect(null, null)

  }

  componentDidUpdate(prevProps, prevState) {
    let { defaultValue, formData } = this.state
    let { UserLevelOwnerData, PartnerOwnerByLevelData, userData } = this.props

    if (prevProps.UserLevelOwnerData !== UserLevelOwnerData) {
      // console.log("UserLevelOwnerData", UserLevelOwnerData)
      this.setState({ userLevelNavList: this.renameKey(UserLevelOwnerData) })

    }
    if (prevProps.PartnerOwnerByLevelData !== PartnerOwnerByLevelData) {
      this.setState({ ownerPartnerNavList: this.renameKey(PartnerOwnerByLevelData) })
    }
    if (prevProps.userData !== userData) {
      // console.log(userData)
      for (let i in userData) {
        // console.log(get(formData, `UserDetail.basicData[${i}]`), i, userData[i])
        if (i === 'userLevelNav' || i === 'ownerPartnerNav') {
          formData.UserDetail.basicData[(i + '_value')] = userData[i].key
        } else if (i === 'avatarUrl') {

        } else {
          // get(formData, `UserDetail.basicData[${i}]`)
          let info = userData[i]
          if (i === 'expiredDate') info = moment(info).format("DD/MM/YYYY")
          formData.UserDetail.basicData[i] = info
        }
      }
      this.setState(prevState => prevState)

    }


  }

  renameKey(data) {
    let result = []
    for (let index in data) result.push({ label: data[index].value, value: data[index].key })
    return result
  }

  onFormChange(v) {
    let diffValue = get(diff(this.state.formData, v.formData), 'UserDetail.basicData', undefined)
    if (diffValue === undefined) return


    // console.log("state old", this.state.formData.UserDetail.basicData)
    // console.log("state new", v.formData.UserDetail.basicData)
    // console.log("diffValue", diffValue)
    // console.log("__________________________________")
    //#region  Update state.formData
    let objects = Object.getOwnPropertyNames(diffValue)

    for (let index in objects) {
      if ("" + objects[index] === "userLevelNav") {
        this.userLevelOwnerChange("" + objects[index], diffValue["" + objects[index]]["__new"], diffValue["" + objects[index] + "_value"]["__new"])
      }
      else {
        this.bindingData("" + objects[index], diffValue["" + objects[index]]["__new"])
      }
    }
  }

  // //#endregion


  bindingData(fieldName, value) {
    let { formData } = this.state
    formData.UserDetail.basicData[fieldName] = value
    this.setState({ formData })
  }

  userLevelOwnerChange(fieldName, value, key) {
    let { formData } = this.state
    formData.UserDetail.basicData.userLevelNav = value
    formData.UserDetail.basicData.userLevelNav_value = key
    formData.UserDetail.basicData.ownerPartnerNav = ""
    formData.UserDetail.basicData.ownerPartnerNav_value = ""


    // console.log("PartnerOwnerByLevel", key)
    this.props.getDataDropdown("PartnerOwnerByLevel", key)

    // >>>> PartnerOwnerByLevelData TEST <<<<
    // this.props.setDataDropdown([
    //   {
    //     "key": 1,
    //     "value": "Partner 001"
    //   },
    //   {
    //     "key": 2,
    //     "value": "Partner 002"
    //   },
    //   {
    //     "key": 3,
    //     "value": "Partner 003"
    //   },
    //   {
    //     "key": 4,
    //     "value": "Partner 004"
    //   }], "PartnerOwnerByLevel")


    this.setState({ formData })
  }

  submit(FormData) {
    // console.log(get(FormData, 'formData.UserDetail.basicData'))

    let data = {
      "userLevelNav": {
        "key": get(FormData, 'formData.UserDetail.basicData.userLevelNav_value'),
        // "value": "string"
      },
      "displayName": get(FormData, 'formData.UserDetail.basicData.displayName'),
      "username": get(FormData, 'formData.UserDetail.basicData.username'),
      "password": get(FormData, 'formData.UserDetail.basicData.password'),
      "mobile": get(FormData, 'formData.UserDetail.basicData.mobile'),
      "email": get(FormData, 'formData.UserDetail.basicData.email'),
      "lineId": get(FormData, 'formData.UserDetail.basicData.lineId'),
      "expiredDate": get(FormData, 'formData.UserDetail.basicData.expiredDate'),
      "ownerPartnerNav": {
        "key": get(FormData, 'formData.UserDetail.basicData.ownerPartnerNav_value'),
        // "value": "string"
      },
      "attachCode": get(FormData, 'formData.UserDetail.basicData'),

    }
    // console.log(get(FormData, 'formData.UserDetail.basicData'), data)

  }

  mappingFieldsInsert(FormData) {
    let dt = FormData.basicData
    let data = {
      "prefix": dt.prefix_value,
      "name": dt.name,
    }

    return data
  }

  mappingFieldsUpdate(FormData) {
    let dt = FormData.basicData
    let data = {
      "prefix": dt.prefix_value,
      "name": dt.name,
    }
    return data
  }

  render() {
    let { formData, userLevelNavList, ownerPartnerNavList } = this.state

    const log = (type) => console.log.bind(console, type);

    // console.log("formData", formData.UserDetail.basicData)

    return (
      <PannelBox title={'User'}>
        <Form
          className="title-form"
          schema={
            setSchema(userLevelNavList, ownerPartnerNavList)
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
                this.props.history.push("/users")
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
  UserLevelOwnerData: state.dropdown.UserLevelOwnerData,
  PartnerOwnerByLevelData: state.dropdown.PartnerOwnerByLevelData,
  personalId: state.user.personalId,
  action: state.user.action,
  userData: state.user.userData,
});
const mapDispatchToProps = (dispatch) => ({
  getDataDropdown: (optionGroup, key) => dispatch(DropdownActions.getDataDropdown(optionGroup, key)),
  setDataDropdown: (dropdownData, optionGroup) => dispatch(DropdownActions.setDataDropdown(dropdownData, optionGroup)),
  setPersonalIdSelect: (personalId, action) => dispatch(UserActions.setPersonalIdSelect(personalId, action)),
  getUserManage: (id) => dispatch(UserActions.getUserManage(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)

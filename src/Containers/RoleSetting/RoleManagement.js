import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'reactstrap'
import TableRole from '../../Components/DataGridView/TableRole.js'
import UserActions from '../../Redux/UserRedux'
import RoleSettingActions from '../../Redux/RoleSettingRedux'

import PannelBox from '../../Components/PannelBox'
import Form from "react-jsonschema-form"
import { setSchemaSearch } from './Form/schema.js'
import SearchData from "./Form/Fields/SearchData"
import { diff } from 'json-diff';
import SaveButton from '../../Components/SaveButton'
import './Form/styles.css'
import { get } from 'lodash'
import { t } from '../../Components/Translation'

const CustomTitleField = () => { return '' }

export const fields = {
  TitleField: CustomTitleField,
  basicData: SearchData
}

export const uiSchema = {
  UserDetail: {
    basicData: {
      "ui:field": "basicData"
    }
  }
}

const lstMutilSelect = ['ownerPartnerType', 'userLevel', 'partnerType', 'roleName', 'functions', 'action']

class RoleManagement extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      params: "",
      formData: {
        UserDetail: {
          basicData: {
            ownerPartnerType: [],
            ownerPartnerName: "",
            roleName: [],
            action: [],
            permission: null,
            master: null
          }
        }
      },

      ownerPartnerTypeList: [{
        "key": 1,
        "value": "ฮีโน่มอเตอร์สเซลส์ (ประเทศไทย) จำกัด "
      },
      {
        "key": 2,
        "value": "นิวแมน จำกัด (สาขารัชดา) "
      },
      {
        "key": 3,
        "value": "อุบลเมืองทอง จำกัด (สาขายโสธร) "
      },
      {
        "key": 4,
        "value": "มิตซุย บุซซัน ออโตโมทีฟ (ประเทศไทย) จำกัด "
      }],
      userLevelList: [{
        "groupName": "Provider(Hino)",
        "items": [
          {
            "key": 21,
            "value": "HMST Admin"
          },
          {
            "key": 22,
            "value": "HMST User"
          }
        ]
      }],
      roleNameList: [{
        "groupName": "Provider(Hino)",
        "items": [
          {
            "key": 21,
            "value": "HMST Admin"
          },
          {
            "key": 22,
            "value": "HMST User"
          }
        ]
      }],
      functionsList: [{ key: 0, value: "1111" }, { key: 1, value: "2222" }, { key: 2, value: "3333" }],
      actionList: [{
        "groupName": "Provider(Hino)",
        "items": [
          {
            "key": 21,
            "value": "HMST Admin"
          },
          {
            "key": 22,
            "value": "HMST User"
          }
        ]
      }],

      partnerNameList: [{ key: 0, value: "1111" }, { key: 1, value: "2222" }, { key: 2, value: "3333" }],
      ownerPartnerNameList: [{ key: 0, value: "1111" }, { key: 1, value: "2222" }, { key: 2, value: "3333" }],
    }
  }

  componentWillMount() {
    this.props.getUserSearch('PartnerType')
    // this.props.getUserSearch('GroupAction')
    // this.props.getUserSearch('OwnerUserLevel')
    // this.props.getUserSearch('Role')
  }

  componentDidUpdate(prevProps, nextState) {
    let { lstOptGroupAction, lstOptActionByRoles, lstOptOwnerPartnerType, lstOptOwnerUserLevel, lstOptRole } = this.props
    if (prevProps.lstOptGroupAction !== lstOptGroupAction) {
      // console.log("lstOptGroupAction", lstOptGroupAction)
      this.setState({ functionsList: lstOptGroupAction })
    }
    if (prevProps.lstOptOwnerPartnerType !== lstOptOwnerPartnerType) {
      // console.log("lstOptGroupAction", lstOptGroupAction)
      this.setState({ ownerPartnerTypeList: lstOptOwnerPartnerType })
    }
    if (prevProps.lstOptOwnerUserLevel !== lstOptOwnerUserLevel) {
      // console.log("lstOptGroupAction", lstOptGroupAction)
      this.setState({ userLevelList: lstOptOwnerUserLevel })
    }
    if (prevProps.lstOptRole !== lstOptRole) {
      // console.log("lstOptGroupAction", lstOptGroupAction)
      this.setState({ roleNameList: lstOptRole })
    }
    if (prevProps.lstOptActionByRoles !== lstOptActionByRoles) {
      let { formData } = this.state
      formData.UserDetail.basicData.action = []
      this.setState({ formData, actionList: lstOptActionByRoles })
    }

  }

  onClickAdd() {
    this.props.setPersonalIdSelect(null, "Add")
    this.props.history.push("/userSetting/userSettingForm")
  }

  editCallback(e) {
    console.log(e)
    // this.props.setPersonalIdSelect(e.data.id, 'Edit')
    // this.props.history.push("/userSetting/userSettingForm")
    this.props.setRoleDataFromTable(e.data, "edit")
    this.props.history.push("/roleSettingPermission")

  }
  deleteCallback(e) {
    this.props.deleteUser(e.data.id)
  }

  onFormChange(v) {
    console.log(v)
    let diffValue = get(diff(this.state.formData, v.formData), 'UserDetail.basicData', undefined)

    console.log(diffValue)

    if (diffValue === undefined) return

    let objects = Object.getOwnPropertyNames(diffValue)
    console.log(objects)
    for (let index in objects) {
      console.log(objects[index], diffValue["" + objects[index]])
      // if ("" + objects[index] === "ownerPartnerType") {
      if (lstMutilSelect.includes("" + objects[index])) {
        console.log('==> a')
        this.setValueMultiSelectChange("" + objects[index], diffValue["" + objects[index]])
      }
      else {
        console.log('==> b')
        this.bindingData("" + objects[index], diffValue["" + objects[index]]["__new"])
      }
    }
  }

  setValueMultiSelectChange(fieldName, value) {


    let { formData } = this.state
    let values = []
    for (let index in value) {
      value[index][0] !== "-" && values.push(value[index][1])
    }
    console.log('CHANGE FIELD', fieldName, values)
    formData.UserDetail.basicData[fieldName] = values
    if (fieldName === 'roleName') {
      // this.props.getUserOption('ActionByRoles', values)
      this.functionsChange()
    } else if (fieldName === 'ownerPartnerType') {
      this.props.getUserSearch('PartnerByType', values)
    }

    console.log('FORM DATA', formData)
    this.setState({ formData })
  }

  functionsChange() {
    // let listAction = this.state.formData.UserDetail.basicData.action
    // console.log("lstOptActionByRoles Change", lstOptActionByRoles)
    // console.log("lstFunction", listAction)

    // for (let index in listAction) {
    //   let foundIdx = lstOptActionByRoles.findIndex(x => x.key === listAction[index])
    //   if (foundIdx >= 0) {
    //     console.log("THIS HAVE : " + listAction[index])
    //   }
    // }

  }

  bindingData(fieldName, value) {
    let { formData } = this.state
    formData.UserDetail.basicData[fieldName] = value

    if (fieldName === 'ownerPartnerName') {
      this.props.getUserSearch('Role', undefined, value)
      this.props.getUserSearch('Function', undefined, value)
      this.props.getUserSearch('Action', [], value)
    }


    console.log(formData)
    this.setState({ formData })
  }

  submit(FormData) {
    console.log("SUBMIT FormData : ", FormData)
    // console.log("FormData", get(FormData, 'formData.UserDetail.basicData'))
    let data, params
    // let {
    //   ownerPartnerType, ownerPartnerName,
    //   roleName, action, permission, master
    // }

    data = get(FormData, 'formData.UserDetail.basicData')
    console.log(data)
    params = Object.keys(data).map(key => {
      console.log(data[key])
      if (Array.isArray(data[key])) {
        if (data[key].length > 0) {
          data[key] = data[key].filter(e => e)
          console.log(data[key])
          return (`${key}=` + data[key].join(`&${key}=`))
        } else {
          return ''
        }
      } else {
        console.log(`${key}=` + data[key])
        console.log(data[key] == '', data[key] == null)
        if (data[key] !== null && data[key] !== '') {

          return (`${key}=` + data[key])
        }
      }
    })

    params = params.filter(e => e)
    params = params.join('&')
    console.log("PARAMS", params)
    this.setState({ params })

    // console.log(ownerPartnerType)
    // if (activeTab === '0') {
    //     params = '?'
    //     data = {
    //         "OwnerPartnerTypes": ownerPartnerType,
    //         "OwnerPartnerName": ownerPartnerName,
    //         "UserLevels": userLevel,
    //         "Username": username,
    //         "Mobile": mobile,
    //         "Email": email,
    //         "IsExpired": expired,
    //         "IsLocked": locked,
    //         "I sActive": active
    //     }
    // } else {
    //     params = 'ByRole?'
    //     data = {
    //         "OwnerPartnerTypes": partnerType,
    //         "OwnerPartnerName": partnerName,
    //         "Roles": roleName,
    //         "Functions": functions,
    //         "Actions": action,
    //         "HavePermission": permission
    //     }
    // }

    // let arrUrl = (Object.keys(data).map(function (key, index) {
    //   if (Array.isArray(data[key])) {
    //     if (data[key].length > 0) return (`${key}=` + data[key].join(`&${key}=`))
    //   } else if (data[key] !== '') return (`${key}=` + data[key])
    // })).filter((item) => item !== undefined)

    // params += arrUrl.join('&')
    // console.log(params)
    // this.setState({ params })
  }

  checkParam(params, paramName, value) {
    if (params !== "") {
      return params += "&" + paramName + "=" + value
    }
    else {
      return params = paramName + "=" + value
    }
  }


  render() {

    let { header, lstSchPartnerType,
      lstSchPartnerByType, lstSchRole, lstSchAction } = this.props

    console.log('HEADER', header)

    let { formData, params } = this.state
    const log = (type) => console.log.bind(console, type);

    console.log(params)
    let prm = params
      .replace('ownerPartnerType', 'OwnerPartnerTypes')
      .replace('ownerPartnerName', 'OwnerPartnerName')
      .replace('permission', 'HavePermission')
      .replace('roleName', 'Roles')
      .replace('master', 'IsMaster')
    console.log(prm)
    console.log('------------ Role Management Screen -------------------')
    console.log(this.props.dataLogin)
    console.log(lstSchPartnerType)
    console.log(lstSchPartnerByType)
    console.log(lstSchRole)

    return [
      <PannelBox title={t("search")}>
        <Form
          className="title-form"
          schema={
            setSchemaSearch(
              lstSchPartnerType || [],
              lstSchPartnerByType.dropdownTrees || [],
              lstSchRole || [],
              // lstSchFunction || [],
              lstSchAction.dropdownTrees || [])
            // roleNameList, functionsList,
            // actionList, partnerNameList)
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
            <SaveButton
              name={t("search")}
            // loading={this.props.loadingSearch}
            />
          </div>
        </Form>
      </PannelBox>
      ,
      // <div className="form-horizontal" >
      <div>
        <Row>
          <Col lg="12">
            <div className="ibox float-e-margins">
              <div className="ibox-content" style={{ paddingLeft: 35, paddingRight: 35, borderWidth: ' 4px 0px 0px ', borderColor: '#e7eaec' }}>

                <Row style={{ textAlign: "right", marginTop: 5, marginBottom: 0 }}>
                  {/* <Button className="btn btn-primary btn-sm" onClick={() => this.onClickEdit()}>Edit</Button> */}
                  <Button className="btn btn-primary btn-sm" onClick={() => this.onClickAdd()}><i className="fa fa-plus"></i>{' '}{t("add")}</Button>
                </Row>
                <Row>
                  <TableRole
                    mode={"api"}
                    serversideSource={'https://api-center.onelink-iot.com/v1.0.1/UserManage/RoleSetting/GridView?' + prm}
                    author={header.idToken}
                    xAPIKey={header.redisKey}
                    table_id={6}
                    user_id={this.props.dataLogin.userId}
                    editing={{
                      enabled: true,
                      allowUpdating: true,
                      // allowDeleting: true
                    }}
                    searchPanel={false}
                    selectedCallback={this.selectedCallback}
                    initialCallback={this.tableInitial}
                    // deleteCallback={(e) => this.deleteCallback(e)}
                    editCallback={(e) => this.editCallback(e)}
                    autoExpandAll={false}
                    remoteOperations={false}
                    column={[
                      // {
                      // column_name: 'id',
                      // column_caption: "Roleid",
                      // },
                      {
                        column_name: 'roleName',
                        column_caption: "role_name",
                      },
                      {
                        column_name: 'partnerTypeId',
                        column_caption: "partner_Type",
                      },
                      {
                        column_name: 'partnerTypeName',
                        column_caption: "partner_type_name",
                      },
                      {
                        column_name: 'ownerPartnerId',
                        column_caption: "owner_partner_id",
                      },
                      {
                        column_name: 'ownerPartnerName',
                        column_caption: "owner_partner_name",
                      },

                      {
                        column_name: 'isShare',
                        column_caption: "is_share",
                      },
                      {
                        column_name: 'numberOfUser',
                        column_caption: "Total User",
                      },
                      {
                        column_name: 'action',
                        column_caption: "Action",
                      },

                    ]}
                  >
                  </TableRole>
                </Row>

              </div>
            </div>
          </Col>
        </Row>
      </div>
    ]
  }
}


const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  loadingSearch: state.user.loadingSearch,
  lstUserData: state.user.lstUserData,
  // lstOptOwnerPartnerType: state.user.lstOptOwnerPartnerType,
  lstSchPartnerType: state.user.lstSchPartnerType,
  lstSchPartnerByType: state.user.lstSchPartnerByType,
  lstSchRole: state.user.lstSchRole,
  lstSchFunction: state.user.lstSchFunction,
  lstSchAction: state.user.lstSchAction,

  lstOptOwnerUserLevel: state.user.lstOptOwnerUserLevel,
  lstOptGroupAction: state.user.lstOptGroupAction,
  lstOptActionByRoles: state.user.lstOptActionByRoles,
  lstOptRole: state.user.lstOptRole,
});

const mapDispatchToProps = (dispatch) => ({
  setPersonalIdSelect: (personalId, action) => dispatch(UserActions.setPersonalIdSelect(personalId, action)),
  getUserSearch: (name, arr, id) => dispatch(UserActions.getUserSearch(name, arr, id)),
  // getUserOption: (name, data) => dispatch(UserActions.getUserOption(name, data)),
  searchGridView: (data, activeTab) => dispatch(UserActions.searchGridView(data, activeTab)),
  deleteUser: (id) => dispatch(UserActions.deleteUser(id)),
  setRoleDataFromTable: (data, actions) => dispatch(RoleSettingActions.setRoleDataFromTable(data, actions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoleManagement)

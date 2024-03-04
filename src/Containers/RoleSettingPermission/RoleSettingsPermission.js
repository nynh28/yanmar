import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Row, Col, Button } from 'reactstrap'
import TableRole from '../../Components/DataGridView/TableRole.js'
import Form from "react-jsonschema-form"
import { setSchemaSearch } from './Form/schema.js'
import SearchData from "./Form/Fields/SearchData"
import { setSchemaSearch2 } from './Form2/schema.js'
import SearchData2 from "./Form2/Fields/SearchData"

import UserActions from '../../Redux/UserRedux'
import RoleSettingActions from '../../Redux/RoleSettingRedux'
import PannelBox from '../../Components/PannelBox'
import SaveButton from '../../Components/SaveButton'
import './Form/styles.css'
import { diff } from 'json-diff';
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

const CustomTitleField2 = () => { return '' }

export const fields2 = {
  TitleField: CustomTitleField2,
  basicData: SearchData2
}

export const uiSchema2 = {
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
            // action: [],       // never use
            // permission: null, // never use
            master: null,
            active: null,
          }
        }
      },
      formData2: {
        UserDetail: {
          basicData: {
            passwordPolicy: null,
            applicationCurrentPolicy: null,
            manageRole: null,
            manageUser: null,
            blockUnblockUser: null,
            unlockUser: null,
            resetPassword: null,
          }
        }
      },

    }
  }

  componentWillMount() {
    this.props.getUserSearch('PartnerType')
  }

  componentDidMount = () => {
    console.log(this.props.roleDataRow)
    console.log(this.props.actions)
    console.log("--------------------- Did Mount Role Setting Permission ------------------")
  }

  componentDidUpdate(prevProps, nextState) {
    let { lstOptGroupAction, lstOptActionByRoles, lstOptOwnerPartnerType, lstOptOwnerUserLevel, lstOptRole } = this.props
    if (prevProps.lstOptGroupAction !== lstOptGroupAction) {
      this.setState({ functionsList: lstOptGroupAction })
    }
    if (prevProps.lstOptOwnerPartnerType !== lstOptOwnerPartnerType) {
      this.setState({ ownerPartnerTypeList: lstOptOwnerPartnerType })
    }
    if (prevProps.lstOptOwnerUserLevel !== lstOptOwnerUserLevel) {
      this.setState({ userLevelList: lstOptOwnerUserLevel })
    }
    if (prevProps.lstOptRole !== lstOptRole) {
      this.setState({ roleNameList: lstOptRole })
    }
    if (prevProps.lstOptActionByRoles !== lstOptActionByRoles) {
      let { formData, formData2 } = this.state
      formData.UserDetail.basicData.action = []
      formData2.UserDetail.basicData.action = []
      this.setState({ formData, formData2, actionList: lstOptActionByRoles })
    }

  }

  onFormChange(v) {
    console.log(v)
    let diffValue = get(diff(this.state.formData, v.formData), 'UserDetail.basicData', undefined)

    console.log("DIFF_VALUE :: ", diffValue)

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


    // console.log(formData)
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
    console.log('---------------- Data Form ------------------')
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
      } else if (data[key]) return (`${key}=` + data[key])
    })

    // params = params.filter(e => e)
    // params = params.join('&')
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

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.roleDataRow)
    let formData = {
      UserDetail: {
        ownerPartnerType: '',
        ownerPartnerName: '',
        roleName: [],
        master: null,
        active: null
      }
    }
  }




  onFormChange2 = (v) => {
    console.log(v)
    let diffValue = get(diff(this.state.formData2, v.formData2), 'UserDetail.basicData', undefined)

    console.log("DIFF_VALUE :: ", diffValue)

    if (diffValue === undefined) return

    let objects = Object.getOwnPropertyNames(diffValue)
    console.log("CHANGE DIFF_VALUE TO OBJECT :: ", objects)
    for (let index in objects) {
      console.log(objects[index], diffValue["" + objects[index]])
      // if ("" + objects[index] === "ownerPartnerType") {
      if (lstMutilSelect.includes("" + objects[index])) {
        console.log('CHECK DROPDOWN MULTI SLECT ?? ==> a  :: ')
        this.setValueMultiSelectChange2("" + objects[index], diffValue["" + objects[index]])
      }
      else {
        console.log('CHECK OTHER FORM (TEXT, RADIO ... ) ==> b :: ', objects[index], " && ", diffValue["" + objects[index]])
        this.bindingData2("" + objects[index], diffValue["" + objects[index]]["__new"])
      }
    }
  }

  setValueMultiSelectChange2 = (fieldName, value) => {

    let { formData2 } = this.state
    let values = []
    for (let index in value) {
      value[index][0] !== "-" && values.push(value[index][1])
    }
    console.log('CHANGE FIELD', fieldName, values)
    formData2.UserDetail.basicData[fieldName] = values
    if (fieldName === 'roleName') {
      // this.props.getUserOption('ActionByRoles', values)
      this.functionsChange()
    } else if (fieldName === 'ownerPartnerType') {
      this.props.getUserSearch('PartnerByType', values)
    }

    console.log('FORM DATA', formData2)
    this.setState({ formData2 })
  }

  functionsChange2 = () => {
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

  bindingData2 = (fieldName, value) => {
    let { formData2 } = this.state
    console.log("FIELD NAME IN BINDING FUNC :: ", fieldName, "  &&  VALUE :: ", value)
    formData2.UserDetail.basicData[fieldName] = value

    if (fieldName === 'ownerPartnerName') {
      this.props.getUserSearch('Role', undefined, value)
      this.props.getUserSearch('Function', undefined, value)
      this.props.getUserSearch('Action', [], value)
    }


    console.log("Form Data 2 (value):: ", formData2)
    this.setState({ formData2 })
  }

  submit2 = (FormData2) => {
    console.log("SUBMIT FormData2 : ", FormData2)
    // console.log("FormData2", get(FormData2, 'formData2.UserDetail.basicData'))
    let data, params
    // let {
    //   ownerPartnerType, ownerPartnerName,
    //   roleName, action, permission, master
    // }

    data = get(FormData2, 'formData2.UserDetail.basicData')
    console.log(data)
    console.log('---------------- Data Form ------------------')
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
      } else if (data[key]) return (`${key}=` + data[key])
    })

    // params = params.filter(e => e)
    // params = params.join('&')
    // this.setState({ params })
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
  checkParam(params, paramName, value) {
    if (params !== "") {
      return params += "&" + paramName + "=" + value
    }
    else {
      return params = paramName + "=" + value
    }
  }

  render() {

    let { header, lstUserData, lstSchPartnerType,
      lstSchPartnerByType, lstSchRole, lstSchFunction,
      lstSchAction, roleDataRow } = this.props

    console.log('ROLE DATA', roleDataRow)

    let { formData, formData2, params } = this.state
    const log = (type) => console.log.bind(console, type);

    // console.log(formData)
    console.log(this.props.lstSchPartnerType)
    console.log('---------------------- Role Settings Permission ------------------------')
    let prm = params
    .replace('ownerPartnerType', 'OwnerPartnerTypes')
    .replace('ownerPartnerName', 'OwnerPartnerName')
    .replace('permission', 'HavePermission')
    .replace('roleName', 'Roles')
    .replace('master', 'IsMaster')

    return [
      <PannelBox title={t("edit-role-setting")}>
        <Form
          className="title-form"
          schema={
            setSchemaSearch(
              lstSchPartnerType || [],    // data is show in new dropdown list
              lstSchPartnerByType.dropdownTrees || [],
              lstSchRole || [],
              lstSchAction.dropdownTrees || [])
          }
          uiSchema={uiSchema} //
          fields={fields}     // fields (Component field form)
          formData={formData} // value is use to ...
          onChange={v => this.onFormChange(v)}
          onSubmit={v => this.submit(v)}
          onError={log("errors")}
        >
          <div className="hr-line-dashed" />
          <div className="row" style={{ textAlign: "right" }}>
            <SaveButton
              name={t("save")}
            // loading={this.props.loadingSearch}
            />
          </div>
        </Form>
      </PannelBox>
      ,
      <PannelBox title={t("permission")}>
        <Form
          className="title-form"
          schema={
            setSchemaSearch2(
              // lstSchPartnerType || [],    // data is show in new dropdown list
              // lstSchPartnerByType.dropdownTrees || [],
              // lstSchRole || [],
              // lstSchAction.dropdownTrees || []
            )
          }
          uiSchema={uiSchema2} //
          fields={fields2}     // fields (Component field form)
          formData={formData2} // value is use to ...
          onChange={v => this.onFormChange2(v)}
          onSubmit={v => this.submit2(v)}
          onError={log("errors")}
        >
          <div className="hr-line-dashed" />
          <div className="row" style={{ textAlign: "right" }}>
            <SaveButton
              name={t("save")}
            // loading={this.props.loadingSearch}
            />
          </div>
        </Form>
      </PannelBox>,

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

  roleDataRow: state.roleSetting.roleDataRow,
  actions: state.roleSetting.actions,
});

const mapDispatchToProps = (dispatch) => ({
  setPersonalIdSelect: (personalId, action) => dispatch(UserActions.setPersonalIdSelect(personalId, action)),
  getUserSearch: (name, arr, id) => dispatch(UserActions.getUserSearch(name, arr, id)),
  // getUserOption: (name, data) => dispatch(UserActions.getUserOption(name, data)),
  searchGridView: (data, activeTab) => dispatch(UserActions.searchGridView(data, activeTab)),
  deleteUser: (id) => dispatch(UserActions.deleteUser(id)),
  
  setPersonalIdSelect: (personalId, action) => dispatch(UserActions.setPersonalIdSelect(personalId, action)),
  getUserSearch: (name, arr, id) => dispatch(UserActions.getUserSearch(name, arr, id)),
  // getUserOption: (name, data) => dispatch(UserActions.getUserOption(name, data)),
  searchGridView: (data, activeTab) => dispatch(UserActions.searchGridView(data, activeTab)),
  deleteUser: (id) => dispatch(UserActions.deleteUser(id)),
  setRoleDataFromTable: (data, actions) => dispatch(RoleSettingActions.setRoleDataFromTable(data, actions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoleManagement)

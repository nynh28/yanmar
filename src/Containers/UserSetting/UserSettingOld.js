import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'reactstrap'
// import Table from '../../Components/DataGridView/Table.js'
import Table from '../../Components/DataGridView/TableVehicles'

import UserActions from '../../Redux/UserRedux'

import PannelBox from '../../Components/PannelBox'
import Form from "react-jsonschema-form"
import { setSchemaSearch } from './Form/schema.js'
import SearchData from "./Form/Fields/SearchData"
import { diff } from 'json-diff';
import SaveButton from '../../Components/SaveButton'
import CancelButton from '../../Components/CancelButton'
import './Form/styles.css'
import { get } from 'lodash'
import moment from 'moment'
import { t } from '../../Components/Translation'
import { ENDPOINT_BASE_URL } from '../../Config/app-config';

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

class UserSetting extends Component {

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
            userLevel: [],
            username: "",
            mobile: "",
            email: "",
            expired: "",
            locked: "",
            active: "",
            partnerType: [],
            partnerName: [],
            roleName: [],
            functions: [],
            action: [],
            permission: "",
            activeTab: "0"
          }
        }
      },
      ownerPartnerTypeList: [],
      userLevelList: [],
      OwnerPartnerByTypeList: [],
      roleNameList: [],
      functionsList: [],
      actionList: [],

      partnerNameList: [],
      ownerPartnerNameList: [],
    }
  }

  componentWillMount() {
    this.props.getUserSearch('PartnerType')
    this.props.getUserSearch('UserLevel', [])
    this.props.getUserSearch('PartnerByType', [])
    // this.props.getUserSearch('Role', undefined, 54)
    // this.props.getUserSearch('Function', undefined, 54)
    // this.props.getUserSearch('Action', [], 54)
  }

  componentDidUpdate(prevProps, nextState) {
    let { lstSchPartnerType, lstSchUserLevel, lstSchPartnerByType,
      lstSchRole, lstSchFunction, lstSchAction, deletes } = this.props

    if (prevProps.lstSchPartnerType !== lstSchPartnerType) {
      this.setState({ ownerPartnerTypeList: lstSchPartnerType })
    }

    if (prevProps.lstSchUserLevel !== lstSchUserLevel) {
      this.setState({ userLevelList: get(lstSchUserLevel, 'dropdownTrees', []) })
    }

    if (prevProps.lstSchPartnerByType !== lstSchPartnerByType) {
      this.setState({ OwnerPartnerByTypeList: lstSchPartnerByType.dropdownTrees })
    }

    if (prevProps.lstSchRole !== lstSchRole) {
      this.setState({ roleNameList: lstSchRole })
    }

    if (prevProps.lstSchFunction !== lstSchFunction) {
      this.setState({ functionsList: lstSchFunction })
    }

    if (prevProps.lstSchAction !== lstSchAction) {
      this.setState({ actionList: lstSchAction.dropdownTrees })
    }
    if (prevProps.deletes !== deletes) {
      this.render()
    }
  }

  onClickAdd() {
    this.props.setIdSelect(null, "Add")
    this.props.history.push("/userSetting/userSettingForm")
  }

  editCallback(e) {
    this.props.setIdSelect(e.data.id, 'Edit')
    this.props.history.push("/userSetting/userSettingForm")

  }

  deleteCallback(e) {
    this.props.deleteUser(e.data.id)
  }

  onFormChange(v) {
    let diffValue = get(diff(this.state.formData, v.formData), 'UserDetail.basicData', undefined)
    if (diffValue === undefined) return

    let objects = Object.getOwnPropertyNames(diffValue)
    for (let index in objects) {
      // if ("" + objects[index] === "ownerPartnerType") {
      if (lstMutilSelect.includes("" + objects[index])) {
        this.setValueMultiSelectChange("" + objects[index], diffValue["" + objects[index]])
      }
      else {
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
    formData.UserDetail.basicData[fieldName] = values
    let { partnerName } = formData.UserDetail.basicData
    if (fieldName === 'ownerPartnerType') this.props.getUserSearch('UserLevel', values)
    if (fieldName === 'partnerType') this.props.getUserSearch('PartnerByType', values)
    if (fieldName === 'functions') this.props.getUserSearch('Action', values, partnerName)

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
    if (fieldName === 'partnerName') {
      this.props.getUserSearch('Role', undefined, value)
      this.props.getUserSearch('Function', undefined, value)
      this.props.getUserSearch('Action', [], value)
    }
    this.setState({ formData })
  }

  submit(FormData) {
    let data, params
    let {
      ownerPartnerType, ownerPartnerName, userLevel,
      username, mobile, email, expired, locked, active,
      partnerType, partnerName, roleName,
      functions, action, permission, activeTab
    } = get(FormData, 'formData.UserDetail.basicData')
    if (activeTab === '0') {
      params = '?'
      data = {
        "OwnerPartnerTypes": ownerPartnerType,
        "OwnerPartnerName": ownerPartnerName,
        "UserLevels": userLevel,
        "Username": username,
        "Mobile": mobile,
        "Email": email,
        "IsExpired": expired,
        "IsLocked": locked,
        "IsActive": active
      }
    } else {
      params = 'ByRole?'
      data = {
        "OwnerPartnerTypes": partnerType,
        "OwnerPartnerId": partnerName,
        "Roles": roleName,
        // "Functions": functions,
        "Actions": action,
        "HavePermission": permission
      }
    }

    let arrUrl = (Object.keys(data).map(function (key, index) {
      if (Array.isArray(data[key])) {
        if (data[key].length > 0) return (`${key}=` + data[key].join(`&${key}=`))
      } else if (data[key] !== '') return (`${key}=` + data[key])
    })).filter((item) => item !== undefined)

    params += arrUrl.join('&')

    this.setState({ params })
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

    let { header, lstUserData } = this.props
    let { formData, ownerPartnerTypeList, userLevelList, OwnerPartnerByTypeList, roleNameList, functionsList, actionList, params } = this.state
    const log = (type) => console.log.bind(console, type);

    return [
      <PannelBox title={t("user_72")} iboxStyle={{ marginBottom: 6 }}>
        <Form
          className="title-form"
          schema={
            setSchemaSearch(ownerPartnerTypeList, userLevelList, OwnerPartnerByTypeList, roleNameList, functionsList, actionList)
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
              <div className="ibox-content" style={{ borderWidth: ' 4px 0px 0px ', borderColor: '#e7eaec' }}>

                <Row style={{ textAlign: "right", margin: '5px -3px 0px 0px' }}>
                  {/* <Button className="btn btn-primary btn-sm" onClick={() => this.onClickEdit()}>Edit</Button> */}
                  <Button className="btn btn-primary btn-sm" onClick={() => this.onClickAdd()}><i className="fa fa-plus"></i>{' '}{t("add")}</Button>
                </Row>
                <Row style={{ margin: '0px -3px 0px 0px' }}>
                  <Table
                    mode={"api"}
                    // serversideSource={'https://api-center.onelink-iot.com/v1.0.1/UserManage/User/GridView' + params}
                    serversideSource={ENDPOINT_BASE_URL + 'UserManage/User/GridView' + params}
                    author={header.idToken}
                    xAPIKey={header.redisKey}
                    table_id={6}
                    user_id={this.props.dataLogin.userId}
                    editing={{
                      enabled: true,
                      allowUpdating: true,
                      allowDeleting: true
                    }}
                    searchPanel={true}
                    selectedCallback={this.selectedCallback}
                    // initialCallback={this.tableInitial}
                    // initialCallback={(e) => console.log(e)}
                    deleteCallback={(e) => this.deleteCallback(e)}
                    editCallback={(e) => this.editCallback(e)}
                    autoExpandAll={false}
                    remoteOperations={false}
                    allowDeleting={{
                      column_name: "canDelete",
                      condition: true
                    }}
                    allowUpdating={{
                      column_name: "canEdit",
                      condition: true
                    }}
                    columnCount={"ownerPartnerTypeName"}
                    column={[
                      // {
                      //   column_name: 'ownerPartnerTypeId',
                      //   column_caption: "owner_partner_type_id",
                      // },
                      {
                        column_name: 'ownerPartnerTypeName',
                        column_caption: "user_101",
                      },
                      // {
                      //   column_name: 'ownerPartnerId',
                      //   column_caption: "owner_partner_id",
                      // },
                      {
                        column_name: 'ownerPartnerName',
                        column_caption: "user_102",
                      },
                      // {
                      //   column_name: 'userLevelId',
                      //   column_caption: "user_level_d",
                      // },
                      {
                        column_name: 'userLevelName',
                        column_caption: "user_103",
                      },
                      {
                        column_name: 'displayName',
                        column_caption: "user_104",
                      },
                      {
                        column_name: 'username',
                        column_caption: "user_105",
                      },
                      {
                        column_name: 'mobile',
                        column_caption: "user_106",
                      },
                      {
                        column_name: 'email',
                        column_caption: "user_107",
                      },
                      {
                        column_name: 'lineId',
                        column_caption: "user_108",
                      },
                      {
                        column_name: 'isExpired',
                        column_caption: "user_109",
                      },
                      {
                        column_name: 'expiredDate',
                        column_caption: "user_110",
                      },
                      {
                        column_name: 'loginFailedCount',
                        column_caption: "user_111",
                      },
                      {
                        column_name: 'isLocked',
                        column_caption: "user_112",
                      },
                      {
                        column_name: 'isActive',
                        column_caption: "user_113",
                      },
                      {
                        column_name: 'lastChangePassword',
                        column_caption: "user_114",
                        column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss'),
                      }
                      // {
                      //   column_name: 'avatarUrl',
                      //   column_caption: "avatar_url",
                      // }
                    ]}
                  />
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div >
    ]
  }
}


const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  loadingSearch: state.user.loadingSearch,
  // lstOwnerPartnerType: state.user.lstOwnerPartnerType,
  // lstOwnerUserLevel: state.user.lstOwnerUserLevel,
  // lstOwnerPartnerByType: state.user.lstOwnerPartnerByType,
  lstSchPartnerType: state.user.lstSchPartnerType,
  lstSchUserLevel: state.user.lstSchUserLevel,
  lstSchPartnerByType: state.user.lstSchPartnerByType,
  lstSchRole: state.user.lstSchRole,
  lstSchFunction: state.user.lstSchFunction,
  lstSchAction: state.user.lstSchAction,
  deletes: state.user.deletes,

  lstUserData: state.user.lstUserData,
  lstOptOwnerPartnerType: state.user.lstOptOwnerPartnerType,
  lstOptOwnerUserLevel: state.user.lstOptOwnerUserLevel,
  lstOptGroupAction: state.user.lstOptGroupAction,
  lstOptActionByRoles: state.user.lstOptActionByRoles,
  lstOptRole: state.user.lstOptRole,
});

const mapDispatchToProps = (dispatch) => ({
  setIdSelect: (personalId, action) => dispatch(UserActions.setIdSelect(personalId, action)),
  getUserSearch: (name, arr, id) => dispatch(UserActions.getUserSearch(name, arr, id)),
  searchGridView: (data, activeTab) => dispatch(UserActions.searchGridView(data, activeTab)),
  deleteUser: (id) => dispatch(UserActions.deleteUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSetting)

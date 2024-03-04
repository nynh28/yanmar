import React, { Component } from "react";
import { connect } from "react-redux";
// import UserActions from "../../Redux/UserRedux";
// import DropdownActions from "../../Redux/DropdownRedux";
import AlertSettingActions from "../../Redux/AlertSettingRedux";
import PannelBox from "../../Components/PannelBox";
import Form from "react-jsonschema-form";
import { Col, Row } from "reactstrap"
import Table from './Managements/Table'
import {
  setSchemaInfo,
  setSchemaNotifyHMST,
  setSchemaNotifyCustomer,
  setSchemaNotifyDealer,
  setSchemaEffectVehicle,
  setSchemaNotifyFleet,
  setSchemaNotifyDriver,
} from "./Form/setSchema.js";
import AlertSettingData from "./Form/Fields/AlertSettingData";
import NotifyHMSTData from "./Form/Fields/NotifyHMSTData";
import NotifyFleetData from "./Form/Fields/NotifyFleetData";
import NotifyDealerData from "./Form/Fields/NotifyDealerData";
import NotifyCustomerData from "./Form/Fields/NotifyCustomerData";
import NotifyDriverData from "./Form/Fields/NotifyDriverData";
import NotifyGPSDeviceData from "./Form/Fields/NotifyGPSDeviceData";
import NotifyGroupUserData from "./Form/Fields/NotifyGroupUserData";
import EffectVehicleData from "./Form/Fields/EffectVehicleData";
// import BasicData from "./Form/Fields/BasicData"
// import BasicDataEdit from "./Form/Fields/BasicDataEdit"
import { diff } from "json-diff";
import SaveButton from "../../Components/SaveButton";
import CancelButton from "../../Components/CancelButton";
import "./Form/styles.css";
import { get } from "lodash";
import moment from "moment";
import Tabbed from "../../Components/Tabbed";
//Management Section
// import Agreement from './Managements/Agreement'
// import Customer from './Managements/Customer'
// import Dealer from './Managements/Dealer'
// import Fleet from './Managements/Fleet'
// import GroupUser from './Managements/GroupUser'
// import Role from './Managements/Role'
// import Vehicle from './Managements/Vehicle'
import Alert from "../../Components/Alert";
import { t } from "../../Components/Translation";
import { getErrorMessage } from "../../Functions/getErrorMessage";

const CustomTitleField = () => {
  return "";
};

// export const fields = {
//   TitleField: CustomTitleField,
//   basicData: BasicData
// }

// export const fieldsEdit = {
//   TitleField: CustomTitleField,
//   basicData: BasicDataEdit
// }

export const fieldsInfo = {
  infoData: AlertSettingData,
};

export const fieldsNotifyHMST = {
  notifyData: NotifyHMSTData,
};

export const fieldsNotifyDealer = {
  notifyData: NotifyDealerData,
};

export const fieldsNotifyCustomer = {
  notifyData: NotifyCustomerData,
};

export const fieldsNotifyFleet = {
  notifyData: NotifyFleetData,
};

export const fieldsNotifyDriver = {
  notifyData: NotifyDriverData,
};

export const fieldsNotifyGPSDevice = {
  notifyData: NotifyGPSDeviceData,
};

export const fieldsNotifyGroupUser = {
  notifyData: NotifyGroupUserData,
};

export const fieldsEffectVehicle = {
  effectVehicleData: EffectVehicleData,
};

export const uiSchemaInfo = {
  AlertSettingDetail: {
    infoData: {
      "ui:field": "infoData",
    },
  },
};

export const uiSchemaNotify = {
  AlertSettingDetail: {
    notifyData: {
      "ui:field": "notifyData",
    },
  },
};

export const uiSchemaEffectVehicle = {
  AlertSettingDetail: {
    effectVehicleData: {
      "ui:field": "effectVehicleData",
    },
  },
};

class AlertSettingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      owner_partner_id: null,
      level: 21,
      alert: {
        show: false,
        type: 3,
        content: "",
        ErrorSubcode: 0,
      },
      setForm: false,
      tabNameEnable: [],
      tabPaneEnable: [],

      formData: {
        alertSettingData: {
          AlertSettingDetail: {
            infoData: {
              ownerPartnerName: "",
              alertType: "",
              alertName: "",
              criteria: "",
              // isLocked: false,
              // isActive: true,
              // attachCode: "",
              // attachInfo: {}
            },
            notifyData: {
              notifyHMST: false,
              notifyLevelHMST: null,
              subjectHMST: null,
              messageHMST: null,
              specifyUserHMST: null,

              notifyDealer: false,
              notifyLevelDealer: null,
              subjectDealer: null,
              messageDealer: null,
              specifyUserDealer: null,

              notifyCustomer: false,
              notifyLevelCustomer: null,
              subjectCustomer: null,
              messageCustomer: null,
              specifyUserCustomer: null,

              notifyFleet: false,
              notifyLevelFleet: null,
              subjectFleet: null,
              messageFleet: null,
              specifyUserFleet: null,

              notifyDriver: false,
              notifyLevelDriver: null,
              subjectDriver: null,
              messageDriver: null,
              specifyUserDriver: null,

              notifyGroup: false,
              notifyLevelGroup: null,
              subjectGroup: null,
              messageGroup: null,
              // specifyUserHMST: null,

              notifyGPSDevice: false,
              notifyLevelGPSDevice: null,
              voiceFile: null,

              effectAll: false,

              userLevel: [],
              userLevelName: "",
              isLocked: false,
              isActive: true,
            },
            effectVehicleData: {
              effectAll: false,
            }
          },
        },
      },
      infoData: {
        AlertSettingDetail: {
          infoData: {
            owner_partner_id: "",
            alert_type: "",
            alert_name: "",
            // criteria: "",
            alert_setting_criteria: [

            ],
          },
        },
      },
      notifyHMSTData: {
        AlertSettingDetail: {
          notifyData: {
            notifyHMST: false,
            notifyLevelHMST: "Normal",
            subjectHMST: null,
            messageHMST: null,
            specifyUserHMST: false,

            specifyUserData: [],
            userLoading: false,
            add: [],

            userId: [],
            showFormPopupNotifyHMST: false,
            groupId: [],
            canAdd: false,
            dupData: false,
          },
        },
      },
      notifyDealerData: {
        AlertSettingDetail: {
          notifyData: {
            notifyDealer: false,
            notifyLevelDealer: null,
            subjectDealer: null,
            messageDealer: null,
            specifyUserDealer: false,

            specifyUserData: [],
            userLoading: false,
            add: [],

            dealer: '',
            userId: '',
            showFormPopupNotifyDealer: false,
            groupId: [],
            canAdd: false,
            dupData: false,

          },
        },
      },
      notifyCustomerData: {
        AlertSettingDetail: {
          notifyData: {
            notifyCustomer: false,
            notifyLevelCustomer: null,
            subjectCustomer: null,
            messageCustomer: null,
            specifyUserCustomer: false,

            specifyUserData: [],
            userLoading: false,
            add: [],

            customer: '',
            userId: '',
            showFormPopupNotifyCustomer: false,
            groupId: [],
            canAdd: false,
            dupData: false,
          },
        },
      },
      notifyFleetData: {
        AlertSettingDetail: {
          notifyData: {
            notifyFleet: false,
            notifyLevelFleet: null,
            subjectFleet: null,
            messageFleet: null,
            specifyUserFleet: false,

            specifyUserData: [],
            userLoading: false,
            add: [],

            fleet: '',
            userId: '',
            showFormPopupNotifyFleet: false,
            groupId: [],
            canAdd: false,
            dupData: false,
          },
        },
      },
      notifyDriverData: {
        AlertSettingDetail: {
          notifyData: {
            notifyDriver: false,
            notifyLevelDriver: null,
            subjectDriver: null,
            messageDriver: null,
            specifyUserDriver: false,

            specifyUserData: [],
            userLoading: false,
            add: [],

            driver: '',
            userId: '',
            showFormPopupNotifyDriver: false,
            groupId: [],
            canAdd: false,
            dupData: false,
          },
        },
      },
      notifyGroupData: {
        AlertSettingDetail: {
          notifyData: {
            notifyGroup: false,
            notifyLevelGroup: null,
            subjectGroup: null,
            messageGroup: null,
          },
        },
      },
      notifyGPSData: {
        AlertSettingDetail: {
          notifyData: {
            notifyGPSDevice: false,
            notifyLevelGPSDevice: null,
            voiceFile: null,
          },
        },
      },
      effectVehicleData: {
        AlertSettingDetail: {
          effectVehicleData: {
            // ownerPartnerName: "",
            effectAll: false,
            // attachCode: "",
            // attachInfo: {}
          },
        },
      },

      alert_notify_specify_user: [],
      alert_notify_group_user: [],
      alert_effect_partner: [],
      alert_effect_customer: [],
      alert_effect_fleet: [],
      alert_effect_vehicle: [],
      alert_effect_vehicle_status: [],

      ownerPartnerTypeList: [],
      ownerPartnerList: [],
      alertTypeList: [],

      dealerList: [],
      customerList: [],
      fleetList: [],
      driverList: [],

      userLevelList: [],
      userHMSTList: [],
      userDealerList: [],
      userCustomerList: [],
      userFleetList: [],
      userDriverList: [],

      alert_notify_specify_user: [
        {
          receiver_user_type: 1,
          receiver_user_name: "HMST",
          data: [

          ]
        },
        {
          receiver_user_type: 2,
          receiver_user_name: "Dealer",
          data: [

          ]
        },
        {
          receiver_user_type: 3,
          receiver_user_name: "Customer",
          data: [

          ]
        },
        {
          receiver_user_type: 4,
          receiver_user_name: "Fleet",
          data: [

          ]
        },
        {
          receiver_user_type: 5,
          receiver_user_name: "Driver",
          data: [

          ]
        },
      ],

      userHMST: [],
      userDealer: [],
      userCustomer: [],
      userFleet: [],
      userDriver: [],
    };
    this.setTabEnable = this.setTabEnable.bind(this);
  }

  componentWillMount() {
    let { id, action } = this.props;
    // this.props.getUserCreateAndUpdateOpt('OwnerPartnerType', '', '')
    // this.props.getUserCreateAndUpdateOpt('Language', '', '')
    console.log(this.props.dataLogin)
    console.log(this.props.profileUser)
    this.props.getDropdownAlertSetting(this.props.dataLogin.userId);


    if (action === "Edit" && id) {
      //   this.setAlertSetting(true, 5)
      //   this.props.getUserManage(id)
      this.setTabEnable();
    } else {
      this.setState({ setForm: true });
      this.setTabEnable();
    }
  }

  componentWillUnmount() {
    // this.props.setIdSelect("", "")
  }

  componentDidUpdate(prevProps, prevState) {
    let {
      ownerPartnerTypeList,
      ownerPartnerList,
      userLevelList,
      setForm,
      alertTypeList,
    } = this.state;
    let {
      partnerNav,
      alertTypeNav,
      statusSubmit,
      action,
      dealer,
      customer,
      userHMST,
      userDealer,
      userCustomer,
      userFleet,
      userDriver,
    } = this.props;

    if (prevProps.statusSubmit !== statusSubmit) {
      alert.show = true;
      alert.type = statusSubmit.status ? 1 : 2;
      alert.content = statusSubmit.status
        ? action + " User Successed"
        : action + " User Failed";
      alert.ErrorSubcode = statusSubmit.ErrorSubcode;
      this.setState({ alert });
    }

    // console.log(this.state)
    // console.log(prevState)
    // console.log(prevProps.alert_setting_criteria != this.props.alert_setting_criteria)
    // console.log(this.props.alert_setting_criteria)

    // console.log(alertTypeNav)
    // console.log(alertTypeList)
    // console.log(prevProps.alertTypeNav !== alertTypeNav)

    if (prevProps.partnerNav !== partnerNav) {
      console.log(partnerNav)
      this.setState({ ownerPartnerList: partnerNav })
      console.log(ownerPartnerList)
    }

    if (prevProps.alertTypeNav !== alertTypeNav) {
      console.log(alertTypeNav)
      this.setState({ alertTypeList: alertTypeNav })
      console.log(alertTypeList)
    }

    if (prevProps.userHMST !== userHMST) {
      console.log(userHMST)
      this.setState({ userHMSTList: userHMST })
      // console.log(dealer)
    }

    if (prevProps.userDealer !== userDealer) {
      console.log(userDealer)

      // notifyDealerData: {
      //   AlertSettingDetail: {
      //     notifyData: {
      //       notifyDealer: false,
      //       notifyLevelDealer: null,
      //       subjectDealer: null,
      //       messageDealer: null,
      //       specifyUserDealer: null,

      //       specifyUserData: [],
      //       userLoading: false,

      //       dealer: '',
      //       userId: '',
      //       showFormPopupNotifyDealer: false,
      //       groupId: [],
      //       canAdd: false,
      //       dupData: false,

      //     },
      //   },
      // },
      let { notifyDealerData } = JSON.parse(JSON.stringify(this.state))
      let id = notifyDealerData.AlertSettingDetail.notifyData.dealer
      let userId = []

      for (let i = 0; i <= userId.length - 1; i++) {
        // this.state.userDealerList.forEach(i => {

        // })
        let obj = this.state.userDealerList.find(x => x.key === parseInt(id[i]));
        // userId.push({key: parseInt(id[i]), value: obj.value})
        userId.push(parseInt(id[i]))
      }
      notifyDealerData.AlertSettingDetail.notifyData.userId = userId
      notifyDealerData.AlertSettingDetail.notifyData.userLoading = false
      this.setState({ userDealerList: userDealer, notifyDealerData }, () => this.setTabEnable())

      // console.log(dealer)
    }

    if (prevProps.userCustomer !== userCustomer) {
      console.log(userCustomer)
      this.setState({ userCustomerList: userCustomer })
      // console.log(dealer)
    }

    if (prevProps.userFleet !== userFleet) {
      console.log(userFleet)
      this.setState({ userFleetList: userFleet })
      // console.log(dealer)
    }

    if (prevProps.userDriver !== userDriver) {
      console.log(userDriver)
      this.setState({ userDriverList: userDriver })
      // console.log(dealer)
    }

    if (prevProps.dealer !== dealer) {
      console.log(dealer)
      this.setState({ dealerList: dealer })
      console.log(dealer)
    }

    if (prevProps.customer !== customer) {
      console.log(customer)
      this.setState({ customerList: customer })
      console.log(customer)
    }

    // if (prevProps.alertTypeNav !== alertTypeNav) {
    //   console.log(alertTypeNav)
    //   this.setState({ alertTypeList: alertTypeNav })
    //   console.log(alertTypeList)
    // }

    // if (prevState.infoData.AlertSettingDetail.infoData.alert_type !== this.state.infoData.AlertSettingDetail.infoData.alert_type) {
    //     let { infoData } = JSON.parse(JSON.stringify(this.state))
    //     infoData.AlertSettingDetail.infoData.alert_setting_criteria = []

    //     this.setState({ infoData })
    //     this.props.getCriteria(infoData.AlertSettingDetail.infoData.alertType)

    // }

    if (prevProps.alert_setting_criteria != this.props.alert_setting_criteria) {
      let { infoData } = JSON.parse(JSON.stringify(this.state))
      console.log(this.props.alert_setting_criteria)
      console.log(infoData)
      infoData.AlertSettingDetail.infoData.alert_setting_criteria = this.props.alert_setting_criteria
      // this.props.alert_setting_criteria.forEach((e)=>{this.state.infoData.AlertSettingDetail.infoData.alert_setting_criteria.push(e)})

      this.setState({ infoData: infoData }, () => {
        this.setTabEnable();
        console.log(this.state)
      })

    }

    //#region  WHEN PROPS CHANGE
    // if (prevProps.lstOwnerPartnerType !== lstOwnerPartnerType) {
    //   this.setState({ ownerPartnerTypeList: lstOwnerPartnerType })
    // }

    // if (prevProps.lstOwnerPartnersByType !== lstOwnerPartnersByType) {
    //   this.setState({ ownerPartnerList: lstOwnerPartnersByType })
    // }

    // if (prevProps.lstUserLevelByType !== lstUserLevelByType) {
    //   this.setState({ userLevelList: lstUserLevelByType })
    // }

    // if (prevProps.lstLanguage !== lstLanguage) {
    //   this.setState({ defaultLanguageList: lstLanguage })
    // }

    // if (prevProps.userData !== userData) {
    //   let { formData } = this.state
    //   let _formData = formData.UserDetail.basicData
    //   let userDetailInfo = userData.userDetailInfo
    //   _formData.displayName = get(userData, 'displayName', '')
    //   _formData.ownerPartnerType = get(userDetailInfo, 'ownerPartnerTypeNav.key', [])
    //   _formData.ownerPartnerTypeName = get(userDetailInfo, 'ownerPartnerTypeNav.value', '')
    //   _formData.ownerPartner = get(userDetailInfo, 'ownerPartnerNav.key', [])
    //   _formData.ownerPartnerName = get(userDetailInfo, 'ownerPartnerNav.value', '')
    //   _formData.userLevel = get(userDetailInfo, 'userLevelNav.key', [])
    //   _formData.userLevelName = get(userDetailInfo, 'userLevelNav.value', '')
    //   _formData.userToken = get(userDetailInfo, 'userToken', '')
    //   _formData.displayName = get(userDetailInfo, 'displayName', '')
    //   _formData.username = get(userDetailInfo, 'username', '')
    //   _formData.mobile = get(userDetailInfo, 'mobile', '')
    //   _formData.email = get(userDetailInfo, 'email', '')
    //   _formData.lineId = get(userDetailInfo, 'lineId', '')
    //   let expiredDate = get(userDetailInfo, 'expiredDate', '')
    //   expiredDate !== "" ? _formData.expiredDate = moment(expiredDate).format('DD/MM/YYYY') : _formData.expiredDate = expiredDate
    //   _formData.isActive = get(userDetailInfo, 'isActive', false)
    //   _formData.defaultLanguage = "" + get(userDetailInfo, 'defaultLanguageNav.key', '')
    //   _formData.loginFailedCount = get(userDetailInfo, 'loginFailedCount', '0')
    //   _formData.isLocked = get(userDetailInfo, 'isLocked', '')
    //   _formData.attachCode = get(userDetailInfo.attachInfo, 'attachCode', '')
    //   _formData.attachInfo = get(userDetailInfo, 'attachInfo', '')
    //   formData.UserDetail.basicData = _formData

    //   // this.setTabEnable()
    //   this.setState(state => ({
    //     formData,
    //     setForm: true,
    //     // userRoleInfoList: this.pushId(get(userData, 'userRoleInfos', [])),
    //     // dealerManagementList: this.pushId(get(userData, 'dealerManagements', [])),
    //     // customerManagementList: this.pushId(get(userData, 'customerManagements', [])),
    //     // fleetManagementList: this.pushId(get(userData, 'fleetManagements', [])),
    //     // vehicleManagementList: this.pushId(get(userData, 'vehicleManagements', [])),
    //     // groupManagementList: this.pushId(get(userData, 'groupManagements', [])),
    //   }))
    //   this.setAlertSetting(false, 5)
    // }
    //#endregion

    //#region WHEN STATE CHANGE
    if (
      (prevState.ownerPartnerList !== ownerPartnerList ||
        prevState.userLevelList !== userLevelList) &&
      setForm
    ) {
      this.setTabEnable();
    }
    // if (prevState.formData !== this.state.formData) {
    //   this.setTabEnable()
    // }
    if (prevState.setForm !== setForm && setForm) {
      this.setTabEnable();
    }

    // if (prevState.userRoleInfoList !== this.state.userRoleInfoList
    //   || prevState.dealerManagementList !== this.state.dealerManagementList
    //   || prevState.customerManagementList !== this.state.customerManagementList
    //   || prevState.fleetManagementList !== this.state.fleetManagementList
    //   || prevState.vehicleManagementList !== this.state.vehicleManagementList
    //   || prevState.groupManagementList !== this.state.groupManagementList
    // ) {
    //   this.setTabEnable()
    // }

    //#endregion
  }

  //#region  SET ATTRIBUTE "ID" FOR MANAGE IN DATAGRID
  pushId(data) {
    let _newData = JSON.parse(JSON.stringify(data));
    for (let index in _newData) {
      _newData[index]["id"] = "GET_" + Math.floor(Math.random() * 1000);
    }
    return _newData;
  }

  removeId(data) {
    let _newData = JSON.parse(JSON.stringify(data));
    for (let index in _newData) {
      delete _newData[index].id;
    }
    return _newData;
  }
  //#endregion

  //#region DATAGRID MANAGE
  onChangeTable(tableName, action, data) {
    console.log("onChangeTable", tableName, action, data);

    if (this.props.action === "Add") {
      if (action === "INSERT") {
        this.addToTableList(tableName, data);
      } else {
        this.removeFromTableList(tableName, data.id);
      }
    } else {
      if (action === "INSERT") {
        this.addToTableList(tableName, data);
      } else {
        let delType = data.id.split("_")[0];
        if (delType === "GET") {
          this.updateDeleteStatus(tableName, data);
          this.removeFromTableList(tableName, data.id);
        } else {
          this.removeFromTableList(tableName, data.id);
        }
      }
    }
  }

  //#endregion

  //#region SET TAB ENABLE
  setTabEnable() {
    // let { action, actionUser, id } = this.props
    let {
      //   alertSettingData,
      alert_notify_specify_user,
      infoData,
      notifyHMSTData,
      notifyDealerData,
      notifyCustomerData,
      notifyFleetData,
      notifyDriverData,
      notifyGroupData,
      notifyGPSData,
      effectVehicleData,
      ownerPartnerTypeList,
      ownerPartnerList,
      userLevelList,
      alertTypeList,
      dealerList,
      customerList,
      fleetList,
      driverList,
      userHMSTList,
      userDealerList,
      userCustomerList,
      userFleetList,
      userDriverList,
    } = this.state;

    // let actionId = actionUser.userActions.find((obj) => obj.actionId == 2) ? true : false

    let tabNameDefault = [t("information"), "Notify", "Effect Vehicle"];
    let tabPaneDefault = [];

    //#region SET TAB NAME ENABLE
    // let userLevelId = get(formData, 'UserDetail.basicData.userLevel')
    // let ownerPartnerId = get(formData, 'UserDetail.basicData.ownerPartner')

    // if (typeof ownerPartnerId !== "object" && typeof userLevelId !== "object") tabNameDefault.push(t("role"))
    // if (userLevelId == 31 || userLevelId == 32) tabNameDefault.push(t("dealer"))
    // if (userLevelId == 41 || userLevelId == 42) tabNameDefault.push(t("customer"))
    // userLevelId == 43 && tabNameDefault.push(t("fleet"))
    // userLevelId == 43 && tabNameDefault.push(t("vehicle"))
    // tabNameDefault.push(t("group_user"))
    // action === 'Edit' && tabNameDefault.push(t("agreement"))

    // switch(userLevelId){
    //     case 21:

    // }

    //#endregion

    //#region  SET TAB PANE ENABLE
    // Driver Information Tab
    const log = (type) => console.log.bind(console, type);

    // Info
    tabPaneDefault.push(
      <div>
        <Form
          className="title-form"
          schema={setSchemaInfo(
            ownerPartnerTypeList,
            ownerPartnerList,
            alertTypeList,
            userLevelList
          )}
          uiSchema={uiSchemaInfo}
          fields={fieldsInfo}
          formData={infoData}
          onChange={(v) => this.onFormChangeInfo(v)}
          onSubmit={(v) => this.submit(v)}
          onError={(v) => console.log(v)}
        >
          <SaveButton
            visible={true}
            type="submit"
            // form="form_user"
            name={t("save")}
          />
        </Form>
      </div>
    );

    // Notify
    tabPaneDefault.push(
      <div>
        {

          console.log(this.props.dataLogin.userLevelId)
        }
        {
          (this.props.dataLogin.userLevelId == 21) || (this.props.dataLogin.userLevelId == 22) ? console.log('tab notify hmst show') : console.log('tab notify hmst not show')
        }
        {
          //   this.props.dataLogin.userLevelId == 21 || this.props.dataLogin.userLevelId == 22 ? <Form
          this.state.level == 21 || this.state.level == 22 ? <Form
            className="title-form"
            schema={setSchemaNotifyHMST(userHMSTList, alert_notify_specify_user[0].data)}
            uiSchema={uiSchemaNotify}
            fields={fieldsNotifyHMST}
            formData={notifyHMSTData}
            onChange={(v) => this.onFormChangeNotifyHMST(v)}
            // onChange={(v) => console.log(v)}
            onSubmit={(v) => this.submit(v)}
            onError={(v) => console.log(v)}
          >
            {/* <Row>
                        <Col lg={12}>
                            <Table
                            btnForm={true}
                            btnFormClick={() => this.openModal()}
                            btnPermissionClick={() => this.openModal()}
                            onRowRemoving={(e) => this.onRowRemoving(e)}
                            dataSource={[]}
                            column={[
                                {
                                column_name: "dealerNav.value",
                                column_caption: "Dealer",
                                },
                                {
                                column_name: "manageLevelNav.value",
                                column_caption: "Manage Level",
                                },
                            ]}
                            ></Table>
                        </Col>
                        </Row> */}
            <SaveButton
              visible={true}
              type="submit"
              // form="form_user"
              name={t("save")}
            />

          </Form>
            :
            console.log('user level not hmst')
        }
        {
          this.state.level == 31 || this.state.level == 32 || this.state.level == 21 || this.state.level == 22 ?
            <Form
              className="title-form"
              schema={setSchemaNotifyDealer(dealerList, userDealerList, alert_notify_specify_user[1].data)}
              uiSchema={uiSchemaNotify}
              fields={fieldsNotifyDealer}
              formData={notifyDealerData}
              onChange={(v) => this.onFormChangeNotifyDealer(v)}
              onSubmit={(v) => this.submit(v)}
              onError={(v) => console.log(v)}
            >
              {/* <Row>
                        <Col lg={12}>
                            <Table
                            btnForm={true}
                            btnFormClick={() => this.openModal()}
                            btnPermissionClick={() => this.openModal()}
                            onRowRemoving={(e) => this.onRowRemoving(e)}
                            dataSource={[]}
                            column={[
                                {
                                column_name: "dealerNav.value",
                                column_caption: "Dealer",
                                },
                                {
                                column_name: "manageLevelNav.value",
                                column_caption: "Manage Level",
                                },
                            ]}
                            ></Table>
                        </Col>
                        </Row> */}
              <SaveButton
                visible={true}
                type="submit"
                // form="form_user"
                name={t("save")}
              />
            </Form>
            :
            console.log('user level not dealer')
        }
        {
          this.state.level == 41 || this.state.level == 42 || this.state.level == 31 || this.state.level == 32 || this.state.level == 21 || this.state.level == 22 ?
            <Form
              className="title-form"
              schema={setSchemaNotifyCustomer(customerList, userCustomerList, alert_notify_specify_user[2].data)}
              uiSchema={uiSchemaNotify}
              fields={fieldsNotifyCustomer}
              formData={notifyCustomerData}
              onChange={(v) => this.onFormChangeNotifyCustomer(v)}
              onSubmit={(v) => this.submit(v)}
              onError={(v) => console.log(v)}
            >
              {/* <Row>
                        <Col lg={12}>
                            <Table
                            btnForm={true}
                            btnFormClick={() => this.openModal()}
                            btnPermissionClick={() => this.openModal()}
                            onRowRemoving={(e) => this.onRowRemoving(e)}
                            dataSource={[]}
                            column={[
                                {
                                column_name: "dealerNav.value",
                                column_caption: "Dealer",
                                },
                                {
                                column_name: "manageLevelNav.value",
                                column_caption: "Manage Level",
                                },
                            ]}
                            ></Table>
                        </Col>
                        </Row> */}
              <SaveButton
                visible={true}
                type="submit"
                // form="form_user"
                name={t("save")}
              />
            </Form>
            :
            console.log('user level not dealer')
        }
        {
          this.state.level == 41 || this.state.level == 42 || this.state.level == 43 || this.state.level == 31 || this.state.level == 32 || this.state.level == 21 || this.state.level == 22 ?
            <Form
              className="title-form"
              schema={setSchemaNotifyFleet(fleetList, userFleetList, alert_notify_specify_user[3].data)}
              uiSchema={uiSchemaNotify}
              fields={fieldsNotifyFleet}
              formData={notifyFleetData}
              onChange={(v) => this.onFormChangeNotifyFleet(v)}
              onSubmit={(v) => this.submit(v)}
              onError={(v) => console.log(v)}
            >
              {/* <Row>
                        <Col lg={12}>
                            <Table
                            btnForm={true}
                            btnFormClick={() => this.openModal()}
                            btnPermissionClick={() => this.openModal()}
                            onRowRemoving={(e) => this.onRowRemoving(e)}
                            dataSource={[]}
                            column={[
                                {
                                column_name: "dealerNav.value",
                                column_caption: "Dealer",
                                },
                                {
                                column_name: "manageLevelNav.value",
                                column_caption: "Manage Level",
                                },
                            ]}
                            ></Table>
                        </Col>
                        </Row> */}
              <SaveButton
                visible={true}
                type="submit"
                // form="form_user"
                name={t("save")}
              />
            </Form>
            :
            console.log('user level not dealer')
        }
        {
          this.state.level == 41 || this.state.level == 42 || this.state.level == 43 || this.state.level == 44 || this.state.level == 31 || this.state.level == 32 || this.state.level == 21 || this.state.level == 22 ?
            <Form
              className="title-form"
              schema={setSchemaNotifyDriver(driverList, userDriverList, alert_notify_specify_user[4].data)}
              uiSchema={uiSchemaNotify}
              fields={fieldsNotifyDriver}
              formData={notifyDriverData}
              onChange={(v) => this.onFormChangeNotifyDriver(v)}
              onSubmit={(v) => this.submit(v)}
              onError={(v) => console.log(v)}
            >
              {/* <Row>
                        <Col lg={12}>
                            <Table
                            btnForm={true}
                            btnFormClick={() => this.openModal()}
                            btnPermissionClick={() => this.openModal()}
                            onRowRemoving={(e) => this.onRowRemoving(e)}
                            dataSource={[]}
                            column={[
                                {
                                column_name: "dealerNav.value",
                                column_caption: "Dealer",
                                },
                                {
                                column_name: "manageLevelNav.value",
                                column_caption: "Manage Level",
                                },
                            ]}
                            ></Table>
                        </Col>
                        </Row> */}
              <SaveButton
                visible={true}
                type="submit"
                // form="form_user"
                name={t("save")}
              />
            </Form>
            :
            console.log('user level not dealer')
        }
      </div>
    );

    // Effect Vehicle
    tabPaneDefault.push(
      <div>
        <Form
          className="title-form"
          schema={setSchemaEffectVehicle()}
          uiSchema={uiSchemaEffectVehicle}
          fields={fieldsEffectVehicle}
          formData={effectVehicleData}
          onChange={(v) => this.onFormChangeEffectVehicle(v)}
          onSubmit={(v) => this.submit(v)}
          onError={(v) => console.log(v)}
        >
          <SaveButton
            visible={true}
            type="submit"
            // form="form_user"
            name={t("save")}
          />
        </Form>
      </div>
    );
    //#endregion

    this.setState({
      tabNameEnable: tabNameDefault,
      tabPaneEnable: tabPaneDefault,
    });
  }
  //#endregion

  //#region FORM SCHMA
  onFormChangeInfo(v) {
    console.log(v)
    let diffValue = get(diff(this.state.infoData, v.formData), "AlertSettingDetail.infoData", undefined);
    if (diffValue === undefined) return;

    console.log(diffValue)

    let objects = Object.getOwnPropertyNames(diffValue);
    for (let index in objects) {
      console.log(diffValue["" + objects[index]])
      try {

        if ("" + objects[index] === "isLocked__deleted") {

        }
        else if ("" + objects[index] === "alert_name" || "" + objects[index] === "alert_type" || "" + objects[index] === "owner_partner_id") {
          this.bindingDataInfo("" + objects[index], diffValue["" + objects[index]]["__new"]);
        }
        else {
          for (let i in diffValue["" + objects[index]]) {
            console.log(diffValue["" + objects[index]][i][0])
            if (diffValue["" + objects[index]][i][0] == '~') {
              let { infoData } = JSON.parse(JSON.stringify(this.state));
              infoData.AlertSettingDetail.infoData.alert_setting_criteria[i].criteria_value = diffValue["" + objects[index]][i][1].criteria_value.__new;
              this.setState({ infoData }, () => {
                this.setTabEnable()
                console.log(this.state.infoData)

              });
            }
          }
          // this.bindingDataInfo("" + objects[index],diffValue["" + objects[index]]["__new"]);
        }
      } catch (error) {
        console.log("" + objects[index]);
      }
    }
    // this.setTabEnable();
  }

  bindingDataInfo(fieldName, value) {
    let { infoData } = this.state;
    infoData.AlertSettingDetail.infoData[fieldName] = value;
    // if (fieldName === "ownerPartnerType") {
    //   formData.UserDetail.basicData.ownerPartner = [];
    //   formData.UserDetail.basicData.userLevel = [];
    //   this.props.getUserCreateAndUpdateOpt("OwnerPartnersByType", value, "");
    //   this.props.getUserCreateAndUpdateOpt("UserLevelByType", value, "");
    // }
    this.setState({ infoData }, () => {
      // this.setTabEnable()
      console.log(this.state.infoData)

    });
  }

  onFormChangeNotifyHMST(v) {
    // if(value )
    console.log(v)
    let diffValue = get(diff(this.state.notifyHMSTData, v.formData), "AlertSettingDetail.notifyData", undefined);
    console.log(diffValue)
    if (diffValue === undefined) return;

    let objects = Object.getOwnPropertyNames(diffValue);
    for (let index in objects) {
      try {
        if ("" + objects[index] === "isLocked__deleted") {
        }
        else if ("" + objects[index] === "alert_notify_specify_user__added") {
          let { infoData } = this.state;
          console.log(diffValue["" + objects[index]]["__added"])
          // infoData.AlertSettingDetail.infoData["" + objects[index]] = diffValue["" + objects[index]]["__added"];
          // this.setState({ infoData });
        }
        else if ("" + objects[index] === "add") {
          console.log(diffValue["" + objects[index]])
          let { alert_notify_specify_user } = this.state
          console.log(v.formData.AlertSettingDetail.notifyData.add)
          // diffValue["" + objects[index]].forEach(element => {
          //   if(e[0] == +){
          //     data.push(e[1])
          //   }
          // });
          // console.log(data)
          alert_notify_specify_user[0].data = v.formData.AlertSettingDetail.notifyData.add
          this.setState({ alert_notify_specify_user })
          // this.state.userHMST.push()
        }
        else if ("" + objects[index] === "userId") {
          console.log(diffValue["" + objects[index]])
          let { notifyHMSTData } = this.state
          console.log(v.formData.AlertSettingDetail.notifyData.userId)
          console.log(notifyHMSTData.AlertSettingDetail.notifyData)
          notifyHMSTData.AlertSettingDetail.notifyData.userId = v.formData.AlertSettingDetail.notifyData.userId
          this.setState({ notifyHMSTData }, () => {
            // this.setTabEnable()
            console.log(notifyHMSTData)
          })
        }
        else {
          this.bindingDataNotifyHMST("" + objects[index], diffValue["" + objects[index]]["__new"]);
        }
      } catch (error) {
        console.log("" + objects[index]);
      }
    }
    this.setTabEnable();
  }

  bindingDataNotifyHMST(fieldName, value) {
    let { notifyHMSTData } = this.state;
    console.log(value)
    notifyHMSTData.AlertSettingDetail.notifyData[fieldName] = value;
    // if (fieldName === "ownerPartnerType") {
    //   notifyData.UserDetail.basicData.ownerPartner = [];
    //   notifyData.UserDetail.basicData.userLevel = [];
    //   this.props.getUserCreateAndUpdateOpt("OwnerPartnersByType", value, "");
    //   this.props.getUserCreateAndUpdateOpt("UserLevelByType", value, "");
    // }
    this.setState({ notifyHMSTData }, () => {
      console.log(this.state)
      this.setTabEnable()
    });
  }

  onFormChangeNotifyDealer(v) {
    console.log(v)
    let diffValue = get(diff(this.state.notifyDealerData, v.formData), "AlertSettingDetail.notifyData", undefined);
    console.log(diffValue)
    if (diffValue === undefined) return;

    let objects = Object.getOwnPropertyNames(diffValue);
    for (let index in objects) {
      try {
        if ("" + objects[index] === "isLocked__deleted") {
        }
        else if ("" + objects[index] === "add") {
          console.log(diffValue["" + objects[index]])
          let { alert_notify_specify_user } = this.state
          console.log(v.formData.AlertSettingDetail.notifyData.add)
          // diffValue["" + objects[index]].forEach(element => {
          //   if(e[0] == +){
          //     data.push(e[1])
          //   }
          // });
          // console.log(data)
          alert_notify_specify_user[1].data = v.formData.AlertSettingDetail.notifyData.add
          this.setState({ alert_notify_specify_user })
          // this.state.userHMST.push()
        }
        else if ("" + objects[index] === "userId") {
          console.log(diffValue["" + objects[index]])
          let { notifyDealerData } = this.state
          console.log(v.formData.AlertSettingDetail.notifyData.userId)
          console.log(notifyDealerData.AlertSettingDetail.notifyData)
          notifyDealerData.AlertSettingDetail.notifyData.userId = v.formData.AlertSettingDetail.notifyData.userId
          this.setState({ notifyDealerData }, () => {
            // this.setTabEnable()
            console.log(notifyDealerData)
          })
        }
        else {
          this.bindingDataNotifyDealer(
            "" + objects[index],
            diffValue["" + objects[index]]["__new"]
          );
        }

      } catch (error) {
        console.log("" + objects[index]);
      }
    }
    this.setTabEnable();
  }

  bindingDataNotifyDealer(fieldName, value) {
    let { notifyDealerData } = this.state;
    console.log(value)
    notifyDealerData.AlertSettingDetail.notifyData[fieldName] = value;
    // if (fieldName === "ownerPartnerType") {
    //   notifyData.UserDetail.basicData.ownerPartner = [];
    //   notifyData.UserDetail.basicData.userLevel = [];
    //   this.props.getUserCreateAndUpdateOpt("OwnerPartnersByType", value, "");
    //   this.props.getUserCreateAndUpdateOpt("UserLevelByType", value, "");
    // }
    this.setState({ notifyDealerData });
  }

  onFormChangeNotifyCustomer(v) {
    console.log(v)
    let diffValue = get(diff(this.state.notifyCustomerData, v.formData), "AlertSettingDetail.notifyData", undefined);
    console.log(diffValue)
    if (diffValue === undefined) return;

    let objects = Object.getOwnPropertyNames(diffValue);
    for (let index in objects) {
      try {
        if ("" + objects[index] === "isLocked__deleted") {
        }
        else if ("" + objects[index] === "add") {
          console.log(diffValue["" + objects[index]])
          let { alert_notify_specify_user } = this.state
          console.log(v.formData.AlertSettingDetail.notifyData.add)
          // diffValue["" + objects[index]].forEach(element => {
          //   if(e[0] == +){
          //     data.push(e[1])
          //   }
          // });
          // console.log(data)
          alert_notify_specify_user[2].data = v.formData.AlertSettingDetail.notifyData.add
          this.setState({ alert_notify_specify_user })
          // this.state.userHMST.push()
        }
        else if ("" + objects[index] === "userId") {
          console.log(diffValue["" + objects[index]])
          let { notifyCustomerData } = this.state
          console.log(v.formData.AlertSettingDetail.notifyData.userId)
          console.log(notifyCustomerData.AlertSettingDetail.notifyData)
          notifyCustomerData.AlertSettingDetail.notifyData.userId = v.formData.AlertSettingDetail.notifyData.userId
          this.setState({ notifyCustomerData }, () => {
            // this.setTabEnable()
            console.log(notifyCustomerData)
          })
        }
        else {
          this.bindingDataNotifyCustomer(
            "" + objects[index],
            diffValue["" + objects[index]]["__new"]
          );
        }
      } catch (error) {
        console.log("" + objects[index]);
      }
    }
    this.setTabEnable();
  }

  bindingDataNotifyCustomer(fieldName, value) {
    let { notifyCustomerData } = this.state;
    console.log(value)
    notifyCustomerData.AlertSettingDetail.notifyData[fieldName] = value;
    // if (fieldName === "ownerPartnerType") {
    //   notifyData.UserDetail.basicData.ownerPartner = [];
    //   notifyData.UserDetail.basicData.userLevel = [];
    //   this.props.getUserCreateAndUpdateOpt("OwnerPartnersByType", value, "");
    //   this.props.getUserCreateAndUpdateOpt("UserLevelByType", value, "");
    // }
    this.setState({ notifyCustomerData });
  }

  onFormChangeNotifyFleet(v) {
    console.log(v)
    let diffValue = get(diff(this.state.notifyFleetData, v.formData), "AlertSettingDetail.notifyData", undefined);
    console.log(diffValue)
    if (diffValue === undefined) return;

    let objects = Object.getOwnPropertyNames(diffValue);
    for (let index in objects) {
      try {
        if ("" + objects[index] === "isLocked__deleted") {
        }
        else if ("" + objects[index] === "add") {
          console.log(diffValue["" + objects[index]])
          let { alert_notify_specify_user } = this.state
          console.log(v.formData.AlertSettingDetail.notifyData.add)
          // diffValue["" + objects[index]].forEach(element => {
          //   if(e[0] == +){
          //     data.push(e[1])
          //   }
          // });
          // console.log(data)
          alert_notify_specify_user[3].data = v.formData.AlertSettingDetail.notifyData.add
          this.setState({ alert_notify_specify_user })
          // this.state.userHMST.push()
        }
        else if ("" + objects[index] === "userId") {
          console.log(diffValue["" + objects[index]])
          let { notifyFleetData } = this.state
          console.log(v.formData.AlertSettingDetail.notifyData.userId)
          console.log(notifyFleetData.AlertSettingDetail.notifyData)
          notifyFleetData.AlertSettingDetail.notifyData.userId = v.formData.AlertSettingDetail.notifyData.userId
          this.setState({ notifyFleetData }, () => {
            // this.setTabEnable()
            console.log(notifyFleetData)
          })
        }
        else {
          this.bindingDataNotifyFleet(
            "" + objects[index],
            diffValue["" + objects[index]]["__new"]
          );
        }
      } catch (error) {
        console.log("" + objects[index]);
      }
    }
    this.setTabEnable();
  }

  bindingDataNotifyFleet(fieldName, value) {
    let { notifyFleetData } = this.state;
    console.log(value)
    notifyFleetData.AlertSettingDetail.notifyData[fieldName] = value;
    // if (fieldName === "ownerPartnerType") {
    //   notifyData.UserDetail.basicData.ownerPartner = [];
    //   notifyData.UserDetail.basicData.userLevel = [];
    //   this.props.getUserCreateAndUpdateOpt("OwnerPartnersByType", value, "");
    //   this.props.getUserCreateAndUpdateOpt("UserLevelByType", value, "");
    // }
    this.setState({ notifyFleetData });
  }

  onFormChangeNotifyDriver(v) {
    console.log(v)
    let diffValue = get(diff(this.state.notifyDriverData, v.formData), "AlertSettingDetail.notifyData", undefined);
    console.log(diffValue)
    if (diffValue === undefined) return;

    let objects = Object.getOwnPropertyNames(diffValue);
    for (let index in objects) {
      try {
        if ("" + objects[index] === "isLocked__deleted") {
        }
        else if ("" + objects[index] === "add") {
          console.log(diffValue["" + objects[index]])
          let { alert_notify_specify_user } = this.state
          console.log(v.formData.AlertSettingDetail.notifyData.add)
          // diffValue["" + objects[index]].forEach(element => {
          //   if(e[0] == +){
          //     data.push(e[1])
          //   }
          // });
          // console.log(data)
          alert_notify_specify_user[4].data = v.formData.AlertSettingDetail.notifyData.add
          this.setState({ alert_notify_specify_user })
          // this.state.userHMST.push()
        }
        else if ("" + objects[index] === "userId") {
          console.log(diffValue["" + objects[index]])
          let { notifyDriverData } = this.state
          console.log(v.formData.AlertSettingDetail.notifyData.userId)
          console.log(notifyDriverData.AlertSettingDetail.notifyData)
          notifyDriverData.AlertSettingDetail.notifyData.userId = v.formData.AlertSettingDetail.notifyData.userId
          this.setState({ notifyDriverData }, () => {
            // this.setTabEnable()
            console.log(notifyDriverData)
          })
        }
        else {
          this.bindingDataNotifyDriver(
            "" + objects[index],
            diffValue["" + objects[index]]["__new"]
          );
        }
      } catch (error) {
        console.log("" + objects[index]);
      }
    }
    this.setTabEnable();
  }

  bindingDataNotifyDriver(fieldName, value) {
    let { notifyDriverData } = this.state;
    console.log(value)
    notifyDriverData.AlertSettingDetail.notifyData[fieldName] = value;
    // if (fieldName === "ownerPartnerType") {
    //   notifyData.UserDetail.basicData.ownerPartner = [];
    //   notifyData.UserDetail.basicData.userLevel = [];
    //   this.props.getUserCreateAndUpdateOpt("OwnerPartnersByType", value, "");
    //   this.props.getUserCreateAndUpdateOpt("UserLevelByType", value, "");
    // }
    this.setState({ notifyDriverData });
  }

  onFormChangeNotifyGroup(v) {
    console.log(v)
    let diffValue = get(diff(this.state.notifyGroupData, v.formData), "AlertSettingDetail.notifyData", undefined);
    console.log(diffValue)
    if (diffValue === undefined) return;

    let objects = Object.getOwnPropertyNames(diffValue);
    for (let index in objects) {
      try {
        if ("" + objects[index] === "isLocked__deleted") {
        } else {
          this.bindingDataNotifyGroup(
            "" + objects[index],
            diffValue["" + objects[index]]["__new"]
          );
        }
      } catch (error) {
        console.log("" + objects[index]);
      }
    }
    this.setTabEnable();
  }

  bindingDataNotifyGroup(fieldName, value) {
    let { notifyGroupData } = this.state;
    console.log(value)
    notifyGroupData.AlertSettingDetail.notifyData[fieldName] = value;
    // if (fieldName === "ownerPartnerType") {
    //   notifyData.UserDetail.basicData.ownerPartner = [];
    //   notifyData.UserDetail.basicData.userLevel = [];
    //   this.props.getUserCreateAndUpdateOpt("OwnerPartnersByType", value, "");
    //   this.props.getUserCreateAndUpdateOpt("UserLevelByType", value, "");
    // }
    this.setState({ notifyGroupData });
  }

  onFormChangeNotifyGPS(v) {
    console.log(v)
    let diffValue = get(diff(this.state.notifyGPSData, v.formData), "AlertSettingDetail.notifyData", undefined);
    console.log(diffValue)
    if (diffValue === undefined) return;

    let objects = Object.getOwnPropertyNames(diffValue);
    for (let index in objects) {
      try {
        if ("" + objects[index] === "isLocked__deleted") {
        } else {
          this.bindingDataNotifyGPS(
            "" + objects[index],
            diffValue["" + objects[index]]["__new"]
          );
        }
      } catch (error) {
        console.log("" + objects[index]);
      }
    }
    this.setTabEnable();
  }

  bindingDataNotifyGPS(fieldName, value) {
    let { notifyGPSData } = this.state;
    console.log(value)
    notifyGPSData.AlertSettingDetail.notifyData[fieldName] = value;
    // if (fieldName === "ownerPartnerType") {
    //   notifyData.UserDetail.basicData.ownerPartner = [];
    //   notifyData.UserDetail.basicData.userLevel = [];
    //   this.props.getUserCreateAndUpdateOpt("OwnerPartnersByType", value, "");
    //   this.props.getUserCreateAndUpdateOpt("UserLevelByType", value, "");
    // }
    this.setState({ notifyGPSData });
  }

  onFormChangeEffectVehicle(v) {
    console.log(v)
    let diffValue = get(diff(this.state.effectVehicleData, v.formData), "AlertSettingDetail.effectVehicleData", undefined);
    if (diffValue === undefined) return;

    let objects = Object.getOwnPropertyNames(diffValue);
    for (let index in objects) {
      try {
        if ("" + objects[index] === "isLocked__deleted") {
        } else {
          this.bindingDataEffectVehicle(
            "" + objects[index],
            diffValue["" + objects[index]]["__new"]
          );
        }
      } catch (error) {
        console.log("" + objects[index]);
      }
    }
    this.setTabEnable();
  }

  bindingDataEffectVehicle(fieldName, value) {
    let { effectVehicleData } = this.state;
    effectVehicleData.AlertSettingDetail.effectVehicleData[fieldName] = value;
    // if (fieldName === "ownerPartnerType") {
    //   formData.UserDetail.basicData.ownerPartner = [];
    //   formData.UserDetail.basicData.userLevel = [];
    //   this.props.getUserCreateAndUpdateOpt("OwnerPartnersByType", value, "");
    //   this.props.getUserCreateAndUpdateOpt("UserLevelByType", value, "");
    // }
    this.setState({ effectVehicleData });
  }

  userOwnerPartnerTypeChange(fieldName, value) {
    let { formData } = this.state;
    formData.UserDetail.basicData[fieldName] = value;
    formData.UserDetail.basicData.ownerPartner = "";
    formData.UserDetail.basicData.userLevel = "";
    this.setState({ formData });
  }

  submit(FormData) {
    if (
      FormData.formData.UserDetail.basicData.password !==
      FormData.formData.UserDetail.basicData.confirmPassword
    ) {
      this.setAlertSetting(
        true,
        4,
        "The password confirmation does not match."
      );
    } else {
      this.setAlertSetting(true, 3, this.props.action + " User");
      this.setState({ formDataSubmit: FormData });
    }
  }

  setAlertSetting(isShow, type, content = "", ErrorSubcode) {
    let { alert } = this.state;
    alert.show = isShow;
    alert.type = type;
    alert.content = content;
    alert.ErrorSubcode = ErrorSubcode;
    this.setState({ alert });
  }

  submitConfirm() {
    let { formDataSubmit } = this.state;
    console.log("formDataSubmit : ", formDataSubmit);

    if (this.props.action === "Edit") {
      let data = this.mappingFieldsUpdate(formDataSubmit.formData.UserDetail);
      this.props.updateUser(this.props.id, data);
      this.setAlertSetting(true, 6);
    } else {
      let data = this.mappingFieldsInsert(formDataSubmit.formData.UserDetail);
      this.props.createUser(data);
      this.setAlertSetting(true, 6);
    }
  }

  //#endregion

  //#region MAPPING FIELDS
  mappingFieldsInsert(FormData) {
    let dt = FormData.basicData;
    let {
      userRoleInfoList,
      dealerManagementList,
      customerManagementList,
      fleetManagementList,
      vehicleManagementList,
      groupManagementList,
    } = this.state;

    let data = {
      userDetailInfo: {
        userLevelNav: {
          key: dt.userLevel,
        },
        displayName: dt.displayName,
        username: dt.username,
        password: dt.password,
        mobile: dt.mobile,
        email: dt.email,
        lineId: dt.lineId,
        expiredDate: this.convertDate(dt.expiredDate),
        ownerPartnerNav: {
          key: dt.ownerPartner,
        },
        defaultLanguageNav: {
          key: dt.defaultLanguage,
        },
        attachCode: dt.attachCode,
        isActive: dt.isActive,
      },
      userRoleInfos: this.removeId(userRoleInfoList),
      dealerManagements: this.removeId(dealerManagementList),
      customerManagements: this.removeId(customerManagementList),
      fleetManagements: this.removeId(fleetManagementList),
      vehicleManagements: this.removeId(vehicleManagementList),
      groupManagements: this.removeId(groupManagementList),
    };
    return data;
  }

  mappingFieldsUpdate(FormData) {
    let {
      userRoleInfoList,
      dealerManagementList,
      customerManagementList,
      fleetManagementList,
      vehicleManagementList,
      groupManagementList,
      userRoleInfoDelete,
      dealerManagementDelete,
      customerManagementDelete,
      fleetManagementDelete,
      vehicleManagementDelete,
      groupManagementDelete,
    } = this.state;

    let _userRoleInfoList = this.mergeData(
      userRoleInfoList,
      userRoleInfoDelete
    );
    let _dealerManagementList = this.mergeData(
      dealerManagementList,
      dealerManagementDelete
    );
    let _customerManagementList = this.mergeData(
      customerManagementList,
      customerManagementDelete
    );
    let _fleetManagementList = this.mergeData(
      fleetManagementList,
      fleetManagementDelete
    );
    let _vehicleManagementList = this.mergeData(
      vehicleManagementList,
      vehicleManagementDelete
    );
    let _groupManagementList = this.mergeData(
      groupManagementList,
      groupManagementDelete
    );
    let dt = FormData.basicData;
    let data = {
      userDetailInfo: {
        action: "UPDATE",
        displayName: dt.displayName,
        mobile: dt.mobile,
        email: dt.email,
        lineId: dt.lineId,
        expiredDate: this.convertDate(dt.expiredDate),
        defaultLanguageNav: {
          key: dt.defaultLanguage,
        },
        attachCode: dt.attachCode,
        isActive: dt.isActive,
      },
      userRoleInfos: this.removeId(_userRoleInfoList),
      dealerManagements: this.removeId(_dealerManagementList),
      customerManagements: this.removeId(_customerManagementList),
      fleetManagements: this.removeId(_fleetManagementList),
      vehicleManagements: this.removeId(_vehicleManagementList),
      groupManagements: this.removeId(_groupManagementList),
    };
    return data;
  }

  convertDate(date) {
    let _expiredDate = date;
    if (_expiredDate !== "" && _expiredDate !== null) {
      let spDate = date.split("/");
      _expiredDate = spDate[1] + "/" + spDate[0] + "/" + spDate[2];
      _expiredDate = moment(_expiredDate).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
    }
    else {
      _expiredDate = null
    }
    return _expiredDate;
  }

  mergeData(data, mergeData) {
    let _newData = [...data];
    for (let index in mergeData) {
      _newData.push(mergeData[index]);
    }
    return _newData;
  }
  //#endregion

  render() {
    let { tabNameEnable, tabPaneEnable, alert } = this.state;
    let { statusSubmit } = this.props;

    return [
      <PannelBox title={t("alert_setting")}>
        <Alert
          setting={alert}
          onConfirm={() => {
            if (alert.type === 4) {
              alert.show = false;
            } else if (alert.type === 3) {
              alert.show = false;
              this.submitConfirm();
            } else if (statusSubmit.status) {
              alert.show = true;
              this.props.history.push("/userSetting");
            } else {
              alert.show = false;
            }
            this.setState({ alert });
          }}
          onCancel={() => {
            alert.show = false;
            this.setState({ alert });
          }}
        />

        <Tabbed
          defaultActiveKey={0}
          tabName={tabNameEnable}
          tabPane={tabPaneEnable}
        ></Tabbed>

        <div className="hr-line-dashed" />
        <div className="row" style={{ textAlign: "right" }}>
          <CancelButton
            name={t("cancel")}
            loading={false}
            onClick={() => {
              this.props.history.push("/alertSetting");
              // this.props.setIdSelect("", "");
            }}
          />
          <SaveButton type="submit" name={t("save")} />
        </div>
      </PannelBox>,
    ];
  }
}

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  language: state.versatile.language,
  dataLogin: state.signin.dataLogin,
  statusSubmit: state.user.statusSubmit,
  actionUser: state.signin.actionUser,
  profileUser: state.signin.profileUser,

  partnerNav: state.alertSetting.partnerName,
  alertTypeNav: state.alertSetting.alertType,
  alert_setting_criteria: state.alertSetting.alert_setting_criteria,
  UserLevelOwnerData: state.dropdown.UserLevelOwnerData,
  PartnerOwnerByLevelData: state.dropdown.PartnerOwnerByLevelData,

  userHMST: state.alertSetting.userHMST,
  userDealer: state.alertSetting.userDealer,
  userCustomer: state.alertSetting.userCustomer,
  userFleet: state.alertSetting.userFleet,
  userDriver: state.alertSetting.userDriver,

  dealer: state.alertSetting.dealer,
  customer: state.alertSetting.customer,
});
const mapDispatchToProps = (dispatch) => ({
  getDropdownAlertSetting: (id) => dispatch(AlertSettingActions.getDropdownAlertSetting(id)),
  getCriteria: (id) => dispatch(AlertSettingActions.getCriteria(id)),
  //   setDataDropdown: (dropdownData, optionGroup) => dispatch(DropdownActions.setDataDropdown(dropdownData, optionGroup)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertSettingForm);

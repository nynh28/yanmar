import React, { Component } from "react";
import { connect } from "react-redux";
import UserActions from "../../Redux/UserRedux";
import DropdownActions from "../../Redux/DropdownRedux";
import PannelBox from "../../Components/PannelBox";
import Form from "react-jsonschema-form";
import { setSchema, setSchemaEdit } from "./Form/schema.js";
import BasicData from "./Form/Fields/BasicData";
import BasicDataEdit from "./Form/Fields/BasicDataEdit";
import { diff } from "json-diff";
import SaveButton from "../../Components/SaveButton";
import CancelButton from "../../Components/CancelButton";
import "./Form/styles.css";
import { get, isEmpty } from "lodash";
import moment from "moment";
import Tabbed from "../../Components/Tabbed";
import { Modal } from "antd";
import FormSelectSearch from "../../Components/FormControls/FormSelectSearch";
//Management Section
import Agreement from "./Managements/Agreement";
import Customer from "./Managements/Customer";
import Dealer from "./Managements/Dealer";
import Fleet from "./Managements/Fleet";
import GroupUser from "./Managements/GroupUser";
import Role from "./Managements/Role";
import Vehicle from "./Managements/Vehicle";
import Alert from "../../Components/Alert";
import { t } from "../../Components/Translation";
import { getErrorMessage } from "../../Functions/getErrorMessage";
import { ENDPOINT_BASE_URL } from "../../Config/app-config";

const CustomTitleField = () => {
  return "";
};

export const fields = {
  TitleField: CustomTitleField,
  basicData: BasicData,
};

export const fieldsEdit = {
  TitleField: CustomTitleField,
  basicData: BasicDataEdit,
};

export const uiSchema = {
  UserDetail: {
    basicData: {
      "ui:field": "basicData",
    },
  },
};

export function isEmptyValue(value) {
  return isEmpty(value) ? "" : value;
}

class UserSettingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      alertSetting: {
        show: false,
        type: 3,
        content: "",
        ErrorSubcode: 0,
        validateCode: true,
      },
      setForm: false,
      tabNameEnable: [],
      tabPaneEnable: [],
      defaultActiveKey: 0,
      formData: {
        UserDetail: {
          basicData: {
            ownerPartnerType: [],
            ownerPartnerTypeName: "",
            ownerPartner: [],
            ownerPartnerName: "",
            userLevel: [],
            userLevelName: "",
            userToken: "",
            displayName: "",
            username: "",
            password: "",
            confirmPassword: "",
            resetPassword: false,
            mobile: "",
            email: "",
            lineId: "",
            expiredDate: "",
            loginFailedCount: "",
            isLocked: false,
            isActive: true,
            avartar: "",
            defaultLanguage: "2",
            attachCode: "",
            attachInfo: { attachCode: "", fileName: "", fileUrl: "" },
          },
        },
      },
      ownerPartnerTypeList: [],
      ownerPartnerList: [],
      userLevelList: [],
      defaultLanguageList: [],
      userRoleInfoList: [],
      dealerManagementList: [],
      customerManagementList: [],
      fleetManagementList: [],
      vehicleManagementList: [],
      groupManagementList: [],
      userRoleInfoDelete: [],
      dealerManagementDelete: [],
      customerManagementDelete: [],
      fleetManagementDelete: [],
      vehicleManagementDelete: [],
      groupManagementDelete: [],
      showFormPopup: false,
      dealerId: [],
    };
    this.setTabEnable = this.setTabEnable.bind(this);
  }

  componentWillMount() {
    let { id, action } = this.props;
    this.props.getUserCreateAndUpdateOpt("OwnerPartnerType", "", "");
    this.props.getUserCreateAndUpdateOpt("Language", "", "");

    if (action === "Edit" && id) {
      this.props.getDealerToSendEmail(id);
      this.setAlertSetting(true, 5);
      this.props.getUserManage(id);
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
      defaultLanguageList,
      formLabel,
      alertSetting,
      setForm,
    } = this.state;
    let {
      lstOwnerPartnerType,
      lstOwnerPartnersByType,
      lstUserLevelByType,
      userData,
      language,
      statusSubmit,
      action,
      lstLanguage,
      statusLoadFile,
      statusSendEmail,
      sentEmailSuccess,
    } = this.props;

    if (prevProps.statusLoadFile !== statusLoadFile) {
      !statusLoadFile && this.setAlertSetting(false, 5);
    }
    if (prevProps.statusSendEmail !== statusSendEmail) {
      if (!statusSendEmail) {
        if (sentEmailSuccess) this.setAlertSetting(true, 1, "user_117", false);
        else this.setAlertSetting(true, 2, "user_118", false);
      }
    }

    if (prevProps.statusSubmit !== statusSubmit) {
      alertSetting.show = true;
      alertSetting.type = statusSubmit.status ? 1 : 2;
      alertSetting.content = statusSubmit.status
        ? action + " User Successed"
        : action + " User Failed";
      alertSetting.ErrorSubcode = statusSubmit.ErrorSubcode;
      this.setState({ alertSetting });
    }
    //#region  WHEN PROPS CHANGE
    if (prevProps.lstOwnerPartnerType !== lstOwnerPartnerType) {
      this.setState({ ownerPartnerTypeList: lstOwnerPartnerType });
    }

    if (prevProps.lstOwnerPartnersByType !== lstOwnerPartnersByType) {
      this.setState({ ownerPartnerList: lstOwnerPartnersByType });
    }

    if (prevProps.lstUserLevelByType !== lstUserLevelByType) {
      this.setState({ userLevelList: lstUserLevelByType });
    }

    if (prevProps.lstLanguage !== lstLanguage) {
      this.setState({ defaultLanguageList: lstLanguage });
    }

    if (prevProps.userData !== userData) {
      let { formData } = this.state;
      let _formData = formData.UserDetail.basicData;
      let userDetailInfo = userData.userDetailInfo;
      // console.log("userDetailInfo : ", userDetailInfo)

      _formData.displayName = get(userData, "displayName", "");
      _formData.ownerPartnerType = get(
        userDetailInfo,
        "ownerPartnerTypeNav.key",
        []
      );
      _formData.ownerPartnerTypeName = get(
        userDetailInfo,
        "ownerPartnerTypeNav.value",
        ""
      );
      _formData.ownerPartner = get(userDetailInfo, "ownerPartnerNav.key", []);
      _formData.ownerPartnerName = get(
        userDetailInfo,
        "ownerPartnerNav.value",
        ""
      );
      _formData.userLevel = get(userDetailInfo, "userLevelNav.key", []);
      _formData.userLevelName = get(userDetailInfo, "userLevelNav.value", "");
      _formData.userToken = get(userDetailInfo, "userToken", "");
      _formData.displayName = get(userDetailInfo, "displayName", "");
      _formData.username = get(userDetailInfo, "username", "");
      _formData.mobile = get(userDetailInfo, "mobile", "");
      _formData.email = isEmptyValue(get(userDetailInfo, "email", ""));
      _formData.lineId = get(userDetailInfo, "lineId", "");
      let expiredDate = isEmptyValue(get(userDetailInfo, "expiredDate", ""));
      expiredDate !== ""
        ? (_formData.expiredDate = moment(expiredDate).format("DD/MM/YYYY"))
        : (_formData.expiredDate = expiredDate);
      _formData.isActive = get(userDetailInfo, "isActive", false);
      _formData.defaultLanguage =
        "" + get(userDetailInfo, "defaultLanguageNav.key", "");
      _formData.loginFailedCount = isEmpty(
        get(userDetailInfo, "loginFailedCount", "0")
      )
        ? 0
        : get(userDetailInfo, "loginFailedCount", "0");
      _formData.isLocked = get(userDetailInfo, "isLocked", "");
      _formData.attachCode = get(userDetailInfo.attachInfo, "attachCode", "");
      _formData.attachInfo = get(userDetailInfo, "attachInfo", "");
      formData.UserDetail.basicData = _formData;

      // this.setTabEnable()
      this.setState((state) => ({
        formData,
        setForm: true,
        userRoleInfoList: this.pushId(get(userData, "userRoleInfos", [])),
        dealerManagementList: this.pushId(
          get(userData, "dealerManagements", [])
        ),
        customerManagementList: this.pushId(
          get(userData, "customerManagements", [])
        ),
        fleetManagementList: this.pushId(get(userData, "fleetManagements", [])),
        vehicleManagementList: this.pushId(
          get(userData, "vehicleManagements", [])
        ),
        groupManagementList: this.pushId(get(userData, "groupManagements", [])),
      }));
      this.setAlertSetting(false, 5);
    }
    //#endregion

    //#region WHEN STATE CHANGE
    if (
      (prevState.ownerPartnerTypeList !== ownerPartnerTypeList ||
        prevState.ownerPartnerList !== ownerPartnerList ||
        prevState.ownerPartnerList !== ownerPartnerList ||
        prevState.userLevelList !== userLevelList ||
        prevState.defaultLanguageList !== defaultLanguageList) &&
      setForm
    ) {
      this.setTabEnable();
    }
    if (prevState.formData !== this.state.formData) {
      this.setTabEnable();
    }
    if (prevState.setForm !== setForm && setForm) {
      this.setTabEnable();
    }

    if (
      prevState.userRoleInfoList !== this.state.userRoleInfoList ||
      prevState.dealerManagementList !== this.state.dealerManagementList ||
      prevState.customerManagementList !== this.state.customerManagementList ||
      prevState.fleetManagementList !== this.state.fleetManagementList ||
      prevState.vehicleManagementList !== this.state.vehicleManagementList ||
      prevState.groupManagementList !== this.state.groupManagementList
    ) {
      this.setTabEnable();
    }

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

  removeFieldEmptry(data, root, fieldName, value) {
    let _newData = JSON.parse(JSON.stringify(data));

    if (value == "") delete _newData[root][fieldName];
    return _newData;
  }
  //#endregion

  //#region DATAGRID MANAGE
  onChangeTable(tableName, action, data) {
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

  updateDeleteStatus(tableName, data) {
    let {
      userRoleInfoDelete,
      dealerManagementDelete,
      customerManagementDelete,
      fleetManagementDelete,
      vehicleManagementDelete,
      groupManagementDelete,
    } = this.state;
    let newData;
    switch (tableName) {
      case "Role":
        newData = [...userRoleInfoDelete];
        newData.push({
          action: "DELETE",
          roleNav: { key: parseInt(data.roleNav.key) },
        });
        this.setState({ userRoleInfoDelete: newData });
        break;
      case "Dealer":
        newData = [...dealerManagementDelete];
        newData.push({
          action: "DELETE",
          dealerNav: { key: parseInt(data.dealerNav.key) },
          manageLevelNav: { key: parseInt(data.manageLevelNav.key) },
        });
        this.setState({ dealerManagementDelete: newData });
        break;
      case "Customer":
        newData = [...customerManagementDelete];
        newData.push({
          action: "DELETE",
          customerNav: { key: parseInt(data.customerNav.key) },
          manageLevelNav: { key: parseInt(data.manageLevelNav.key) },
        });
        this.setState({ customerManagementDelete: newData });
        break;
      case "Fleet":
        newData = [...fleetManagementDelete];
        newData.push({
          action: "DELETE",
          customerNav: { key: parseInt(data.customerNav.key) },
          fleetNav: { key: parseInt(data.fleetNav.key) },
          manageLevelNav: { key: parseInt(data.manageLevelNav.key) },
        });
        this.setState({ fleetManagementDelete: newData });
        break;
      case "Vehicle":
        newData = [...vehicleManagementDelete];
        newData.push({
          action: "DELETE",
          customerNav: { key: parseInt(data.customerNav.key) },
          fleetNav: { key: parseInt(data.fleetNav.key) },
          vehicleNav: { key: parseInt(data.vehicleNav.key) },
          manageLevelNav: { key: parseInt(data.manageLevelNav.key) },
        });
        this.setState({ vehicleManagementDelete: newData });
        break;
      case "GroupUser":
        newData = [...groupManagementDelete];
        newData.push({
          action: "DELETE",
          groupNav: { key: parseInt(data.groupNav.key) },
        });
        this.setState({ groupManagementDelete: newData });
        break;
    }
  }

  removeFromTableList(tableName, data) {
    let {
      userRoleInfoList,
      dealerManagementList,
      customerManagementList,
      fleetManagementList,
      vehicleManagementList,
      groupManagementList,
    } = this.state;
    let newData, index;
    switch (tableName) {
      case "Role":
        index = userRoleInfoList.findIndex((x) => x.id === data);
        if (index > -1) {
          newData = [...userRoleInfoList];
          newData.splice(index, 1);
          this.setState({ userRoleInfoList: newData });
        }
        break;
      case "Dealer":
        index = dealerManagementList.findIndex((x) => x.id === data);
        if (index > -1) {
          newData = [...dealerManagementList];
          newData.splice(index, 1);
          this.setState({ dealerManagementList: newData });
        }
        break;
      case "Customer":
        index = customerManagementList.findIndex((x) => x.id === data);
        if (index > -1) {
          newData = [...customerManagementList];
          newData.splice(index, 1);
          this.setState({ customerManagementList: newData });
        }
        break;
      case "Fleet":
        index = fleetManagementList.findIndex((x) => x.id === data);
        if (index > -1) {
          newData = [...fleetManagementList];
          newData.splice(index, 1);
          this.setState({ fleetManagementList: newData });
        }
        break;
      case "Vehicle":
        index = vehicleManagementList.findIndex((x) => x.id === data);
        if (index > -1) {
          newData = [...vehicleManagementList];
          newData.splice(index, 1);
          this.setState({ vehicleManagementList: newData });
        }
        break;
      case "GroupUser":
        index = groupManagementList.findIndex((x) => x.id === data);
        if (index > -1) {
          newData = [...groupManagementList];
          newData.splice(index, 1);
          this.setState({ groupManagementList: newData });
        }
        break;
    }
  }

  addToTableList(tableName, data) {
    let {
      userRoleInfoList,
      dealerManagementList,
      customerManagementList,
      fleetManagementList,
      vehicleManagementList,
      groupManagementList,
    } = this.state;
    let newData;
    switch (tableName) {
      case "Role":
        newData = [...userRoleInfoList];
        newData.push(data);
        this.setState({ userRoleInfoList: newData });
        break;
      case "Dealer":
        newData = [...dealerManagementList];
        newData.push(data);
        this.setState({ dealerManagementList: newData });
        break;
      case "Customer":
        newData = [...customerManagementList];
        newData.push(data);
        this.setState({ customerManagementList: newData });
        break;
      case "Fleet":
        newData = [...fleetManagementList];
        newData.push(data);
        this.setState({ fleetManagementList: newData });
        break;
      case "Vehicle":
        newData = [...vehicleManagementList];
        newData.push(data);
        this.setState({ vehicleManagementList: newData });
        break;
      case "GroupUser":
        newData = [...groupManagementList];
        newData.push(data);
        this.setState({ groupManagementList: newData });
        break;
    }
  }
  //#endregion

  //#region SET TAB ENABLE
  setTabEnable() {
    let { action, dataLogin, id } = this.props;
    let {
      formData,
      defaultLanguageList,
      ownerPartnerTypeList,
      ownerPartnerList,
      userLevelList,
      userRoleInfoList,
      dealerManagementList,
      customerManagementList,
      fleetManagementList,
      vehicleManagementList,
      groupManagementList,
    } = this.state;

    let actionId;
    try {
      actionId = dataLogin.userActions.find((obj) => obj.actionId == 2)
        ? true
        : false;
    } catch {
      return;
    }

    let tabNameDefault = [t("user_12")];
    let tabPaneDefault = [];

    //#region SET TAB NAME ENABLE
    let userLevelId = get(formData, "UserDetail.basicData.userLevel");
    let ownerPartnerId = get(formData, "UserDetail.basicData.ownerPartner");

    if (typeof ownerPartnerId !== "object" && typeof userLevelId !== "object")
      tabNameDefault.push(t("user_29"));
    if (userLevelId == 31 || userLevelId == 32)
      tabNameDefault.push(t("user_35"));
    if (userLevelId == 41 || userLevelId == 42)
      tabNameDefault.push(t("user_38"));
    userLevelId == 43 && tabNameDefault.push(t("user_40"));
    userLevelId == 43 && tabNameDefault.push(t("user_41"));
    tabNameDefault.push(t("user_13"));
    action === "Edit" && tabNameDefault.push(t("agreement"));

    //#endregion

    //#region  SET TAB PANE ENABLE
    // Driver Information Tab
    // const log = (type) => console.log.bind(console, type);
    tabPaneDefault.push(
      <div>
        <Form
          id={"form_user"}
          className="title-form"
          schema={setSchema(
            ownerPartnerTypeList,
            ownerPartnerList,
            userLevelList,
            defaultLanguageList
          )}
          uiSchema={uiSchema}
          fields={action === "Edit" ? fieldsEdit : fields} //fields : fieldsEdit
          formData={formData}
          onChange={(v) => this.onFormChange(v)}
          onSubmit={(v) => this.submit(v)}
          noHtml5Validate={true}
          // onError={log("errors")}
        >
          <p></p>
        </Form>
      </div>
    );

    // Role Menagement
    if (typeof ownerPartnerId !== "object" && typeof userLevelId !== "object") {
      tabPaneDefault.push(
        <div>
          <Role
            id={id}
            onChange={(action, data) =>
              this.onChangeTable("Role", action, data)
            }
            data={userRoleInfoList}
            action={action}
            actionId={actionId}
            ownerPartnerId={ownerPartnerId}
            userLevel={userLevelId}
          />
        </div>
      );
    }

    // Dealer Menagement
    if (userLevelId == 31 || userLevelId == 32) {
      tabPaneDefault.push(
        <div>
          <Dealer
            onChange={(action, data) =>
              this.onChangeTable("Dealer", action, data)
            }
            actionId={actionId}
            data={dealerManagementList}
          />
        </div>
      );
    }

    // Customer Menagement
    if (userLevelId == 41 || userLevelId == 42) {
      tabPaneDefault.push(
        <div>
          <Customer
            onChange={(action, data) =>
              this.onChangeTable("Customer", action, data)
            }
            actionId={actionId}
            data={customerManagementList}
          />
        </div>
      );
    }

    // Fleet Menagement
    if (userLevelId == 43) {
      tabPaneDefault.push(
        <div>
          <Fleet
            onChange={(action, data) =>
              this.onChangeTable("Fleet", action, data)
            }
            actionId={actionId}
            data={fleetManagementList}
          />
        </div>
      );
    }

    // Vehicle Menagement
    if (userLevelId == 43) {
      tabPaneDefault.push(
        <div>
          <Vehicle
            onChange={(action, data) =>
              this.onChangeTable("Vehicle", action, data)
            }
            actionId={actionId}
            data={vehicleManagementList}
          />
        </div>
      );
    }

    // Group User
    tabPaneDefault.push(
      <div>
        <GroupUser
          onChange={(action, data) =>
            this.onChangeTable("GroupUser", action, data)
          }
          actionId={actionId}
          data={groupManagementList}
          ownerPartnerId={ownerPartnerId}
        />
      </div>
    );

    // Agreements
    tabPaneDefault.push(
      <div>
        <Agreement
          id={id}
          agreementInfos={get(this.props.userData, "agreementInfos", [])}
        />
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
  onFormChange(v) {
    let diffValue = get(
      diff(this.state.formData, v.formData),
      "UserDetail.basicData",
      undefined
    );
    if (diffValue === undefined) return;

    let objects = Object.getOwnPropertyNames(diffValue);
    for (let index in objects) {
      try {
        if ("" + objects[index] === "isLocked__deleted") {
        } else if ("" + objects[index] === "attachInfo") {
          this.bindingData("attachInfo", {
            attachCode: diffValue["" + objects[index]]["attachCode"]["__new"],
            fileName: diffValue["" + objects[index]]["fileName"]["__new"],
            fileUrl: diffValue["" + objects[index]]["fileUrl"]["__new"],
          });
        } else {
          this.bindingData(
            "" + objects[index],
            diffValue["" + objects[index]]["__new"]
          );
        }
      } catch (error) {}
    }
    this.setTabEnable();
  }

  bindingData(fieldName, value) {
    let { formData } = this.state;
    formData.UserDetail.basicData[fieldName] = value;
    if (fieldName === "ownerPartnerType") {
      formData.UserDetail.basicData.ownerPartner = [];
      formData.UserDetail.basicData.userLevel = [];
      this.props.getUserCreateAndUpdateOpt("OwnerPartnersByType", value, "");
      this.props.getUserCreateAndUpdateOpt("UserLevelByType", value, "");
    }
    this.setState({ formData });
  }

  userOwnerPartnerTypeChange(fieldName, value) {
    let { formData } = this.state;
    formData.UserDetail.basicData[fieldName] = value;
    formData.UserDetail.basicData.ownerPartner = "";
    formData.UserDetail.basicData.userLevel = "";
    this.setState({ formData });
  }

  submit(FormData) {
    let data = FormData.formData.UserDetail.basicData;

    let isValid = true;
    if (this.props.action === "Add" && data.ownerPartnerType.length == 0) {
      isValid = false;
      this.setAlertSetting(true, 4, "user_1");
    } else if (this.props.action === "Add" && data.ownerPartner.length == 0) {
      isValid = false;
      this.setAlertSetting(true, 4, "user_2");
    } else if (this.props.action === "Add" && data.userLevel.length == 0) {
      isValid = false;
      this.setAlertSetting(true, 4, "user_3");
    } else if (data.displayName == "") {
      isValid = false;
      this.setAlertSetting(true, 4, "user_4");
    } else if (this.props.action === "Add" && data.username === "") {
      isValid = false;
      this.setAlertSetting(true, 4, "user_5");
    }
    // else if (this.props.action === "Add" && data.password == "") {
    //   isValid = false
    //   this.setAlertSetting(true, 4, "user_6")
    // }
    // else if (this.props.action === "Add" && data.confirmPassword == "") {
    //   isValid = false
    //   this.setAlertSetting(true, 4, "user_7")
    // }
    // else if (data.password !== data.confirmPassword) {
    //   isValid = false
    //   this.setAlertSetting(true, 4, "user_8")
    // }
    else if (
      data.email !== "" &&
      !data.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    ) {
      isValid = false;
      this.setAlertSetting(true, 4, "user_9");
    } else if (data.mobile === "" && data.email === "") {
      isValid = false;
      this.setAlertSetting(true, 4, "user_10");
    }

    if (isValid) {
      this.setAlertSetting(true, 3, this.props.action + " User");
      this.setState({ formDataSubmit: FormData });
    } else {
      this.setState({ defaultActiveKey: 0 });
    }
  }

  setAlertSetting(
    isShow,
    type,
    content = "",
    ErrorSubcode,
    validateCode = true
  ) {
    let { alertSetting } = this.state;
    alertSetting.show = isShow;
    alertSetting.type = type;
    alertSetting.content = content;
    alertSetting.ErrorSubcode = ErrorSubcode;
    alertSetting.validateCode = validateCode;
    this.setState({ alertSetting });
  }

  submitConfirm() {
    let { formDataSubmit } = this.state;

    if (this.props.action === "Edit") {
      let data = this.mappingFieldsUpdate(formDataSubmit.formData.UserDetail);
      this.props.updateUser(this.props.id, data);
      this.setAlertSetting(true, 6);
    } else {
      let data = this.mappingFieldsInsert(formDataSubmit.formData.UserDetail);
      this.props.createUser(data);
      this.setAlertSetting(true, 6);
    }
    this.clickButton = "save";
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
        password: dt.username,
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

    data = this.removeFieldEmptry(data, "userDetailInfo", "mobile", dt.mobile);
    data = this.removeFieldEmptry(data, "userDetailInfo", "email", dt.email);

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
    data = this.removeFieldEmptry(data, "userDetailInfo", "mobile", dt.mobile);
    data = this.removeFieldEmptry(data, "userDetailInfo", "email", dt.email);
    return data;
  }

  convertDate(date) {
    let _expiredDate = date;
    if (_expiredDate !== "" && _expiredDate !== null) {
      let spDate = date.split("/");
      _expiredDate = spDate[1] + "/" + spDate[0] + "/" + spDate[2];
      _expiredDate = moment(_expiredDate).format(
        "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"
      );
    } else {
      _expiredDate = null;
    }
    return _expiredDate;
  }

  mergeData(data, mergeData) {
    let _newData = data !== null ? [...data] : [];
    // let _newData = [...data]
    for (let index in mergeData) {
      _newData.push(mergeData[index]);
    }
    return _newData;
  }
  //#endregion

  openModal = () =>
    this.setState((state) => ({
      showFormPopup: !state.showFormPopup,
      dealerId: [],
    }));

  render() {
    let {
      tabNameEnable,
      tabPaneEnable,
      alertSetting,
      defaultActiveKey,
      showFormPopup,
      dealerId,
    } = this.state;
    let { statusSubmit, action, id, dataLogin, DealerList } = this.props;

    // console.log("userData : ", this.props.userData)

    return [
      <PannelBox title={t("user_detail")}>
        <Alert
          setting={alertSetting}
          onConfirm={() => {
            if (alertSetting.type === 4) {
              alertSetting.show = false;
            } else if (alertSetting.type === 3) {
              alertSetting.show = false;
              this.submitConfirm();
            } else if (statusSubmit.status) {
              alertSetting.show = false;
              if (this.clickButton === "save")
                this.props.history.push("/userSetting");
            } else {
              alertSetting.show = false;
            }
            this.setState({ alertSetting });
          }}
          onCancel={() => {
            alertSetting.show = false;
            this.setState({ alertSetting });
          }}
        />

        <Tabbed
          id="tab_user"
          defaultActiveKey={defaultActiveKey}
          tabName={tabNameEnable}
          tabPane={tabPaneEnable}
          onActive={(key) => this.setState({ defaultActiveKey: key })}
        ></Tabbed>

        <div className="hr-line-dashed" />
        <div className="row" style={{ textAlign: "right" }}>
          <CancelButton
            name={t("cancel")}
            loading={false}
            onClick={() => {
              this.props.history.push("/UserSetting");
              this.props.setIdSelect("", "");
            }}
          />

          {action === "Edit" &&
            (dataLogin.userLevelId == 1 ||
              dataLogin.userLevelId == 2 ||
              dataLogin.userLevelId == 21 ||
              dataLogin.userLevelId == 22) && [
              <SaveButton
                name={t("user_115")}
                loading={false}
                onClick={() => {
                  this.setAlertSetting(true, 5);
                  this.props.getFileUserForm(id);
                }}
              />,
              <>
                {this.props.userData.userDetailInfo &&
                  this.props.userData.userDetailInfo.email && (
                    <SaveButton
                      name={t("user_116")}
                      loading={false}
                      onClick={() => {
                        this.openModal();
                      }}
                    />
                  )}
              </>,
            ]}

          <SaveButton type="submit" form="form_user" name={t("save")} />
        </div>

        <Modal
          title={t("user_116")}
          visible={showFormPopup}
          okText={t("submit")}
          cancelText={t("cancel")}
          onOk={() => {
            this.setAlertSetting(true, 5);
            this.clickButton = "mail";
            this.props.sendEmailUserForm(id, dealerId);
            this.openModal();
          }}
          onCancel={this.openModal}
        >
          <FormSelectSearch
            mode={"single"}
            schema={{ required: [""] }}
            list={[...DealerList]}
            label={"user_35"}
            placeholder={"user_59"}
            flex={1}
            onChange={(selected) => {
              // console.log("selected : ", selected)
              this.setState({ dealerId: selected || [] });
            }}
          />
        </Modal>
      </PannelBox>,
    ];
  }
}

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  language: state.versatile.language,
  dataLogin: state.signin.dataLogin,
  statusSubmit: state.user.statusSubmit,
  UserLevelOwnerData: state.dropdown.UserLevelOwnerData,
  PartnerOwnerByLevelData: state.dropdown.PartnerOwnerByLevelData,
  id: state.user.id,
  action: state.user.action,
  userData: state.user.userData,
  lstOwnerPartnerType: state.user.lstOwnerPartnerType,
  lstOwnerPartnersByType: state.user.lstOwnerPartnersByType,
  lstUserLevelByType: state.user.lstUserLevelByType,
  lstLanguage: state.user.lstLanguage,
  statusLoadFile: state.user.statusLoadFile,
  statusSendEmail: state.user.statusSendEmail,
  sentEmailSuccess: state.user.sentEmailSuccess,
  DealerList: state.user.DealerList,
});
const mapDispatchToProps = (dispatch) => ({
  getDataDropdown: (optionGroup, key) =>
    dispatch(DropdownActions.getDataDropdown(optionGroup, key)),
  setDataDropdown: (dropdownData, optionGroup) =>
    dispatch(DropdownActions.setDataDropdown(dropdownData, optionGroup)),
  setIdSelect: (id, action) => dispatch(UserActions.setIdSelect(id, action)),
  getUserManage: (id) => dispatch(UserActions.getUserManage(id)),
  getUserCreateAndUpdateOpt: (name, id, query) =>
    dispatch(UserActions.getUserCreateAndUpdateOpt(name, id, query)),
  getDropdownTable: (name, id) =>
    dispatch(UserActions.getDropdownTable(name, id)),
  createUser: (data) => dispatch(UserActions.createUser(data)),
  updateUser: (id, data) => dispatch(UserActions.updateUser(id, data)),
  submitStatus: (status, ErrorSubcode) =>
    dispatch(UserActions.submitStatus(status, ErrorSubcode)),
  getFileUserForm: (id) => dispatch(UserActions.getFileUserForm(id)),
  sendEmailUserForm: (id, dealerId) =>
    dispatch(UserActions.sendEmailUserForm(id, dealerId)),
  getDealerToSendEmail: (id) => dispatch(UserActions.getDealerToSendEmail(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingForm);

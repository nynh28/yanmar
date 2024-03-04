import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import UserActions from "../../Redux/UserRedux";
import UserSettingActions from "../../Redux/UserSettingRedux";
import PannelBox from "../../Components/PannelBox";
import Form from "react-jsonschema-form";
import { setSchemaSearch } from "./Form/schema.js";
import FormSelectSearch from "../../Components/FormControls/FormSelectSearch";
import FormInput from "../../Components/FormControls/FormInput";
import SearchData from "./Form/Fields/SearchData";
import { diff } from "json-diff";
import SaveButton from "../../Components/SaveButton";
import "./Form/styles.css";
import { get, isEmpty } from "lodash";
import moment from "moment";
import { t } from "../../Components/Translation";
import Table from "./DataTable";
import { BoxContrainer, Button } from "../../components_new";
import SearchBar from "./SearchBar";

const CustomTitleField = () => {
  return "";
};

export const fields = {
  TitleField: CustomTitleField,
  basicData: SearchData,
};

export const uiSchema = {
  UserDetail: {
    basicData: {
      "ui:field": "basicData",
    },
  },
};

const lstMutilSelect = [
  "ownerPartnerType",
  "userLevel",
  "partnerType",
  "roleName",
  "functions",
  "action",
];

class UserSetting extends Component {
  constructor(props) {
    super(props);
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
            activeTab: "0",
          },
        },
      },
      ownerPartnerTypeList: [],
      userLevelList: [],
      OwnerPartnerByTypeList: [],
      roleNameList: [],
      functionsList: [],
      actionList: [],

      partnerNameList: [],
      ownerPartnerNameList: [],
    };
  }

  componentWillMount() {
    this.props.getUserSearch("PartnerType");
    this.props.getUserSearch("UserLevel", []);
    this.props.getUserSearch("PartnerByType", []);
  }

  componentDidUpdate(prevProps, nextState) {
    let {
      lstSchPartnerType,
      lstSchUserLevel,
      lstSchPartnerByType,
      lstSchRole,
      lstSchFunction,
      lstSchAction,
      deletes,
    } = this.props;

    if (prevProps.lstSchPartnerType !== lstSchPartnerType) {
      this.setState({ ownerPartnerTypeList: lstSchPartnerType });
    }

    if (prevProps.lstSchUserLevel !== lstSchUserLevel) {
      this.setState({
        userLevelList: get(lstSchUserLevel, "dropdownTrees", []),
      });
    }

    if (prevProps.lstSchPartnerByType !== lstSchPartnerByType) {
      this.setState({
        OwnerPartnerByTypeList: lstSchPartnerByType.dropdownTrees,
      });
    }

    if (prevProps.lstSchRole !== lstSchRole) {
      this.setState({ roleNameList: lstSchRole });
    }

    if (prevProps.lstSchFunction !== lstSchFunction) {
      this.setState({ functionsList: lstSchFunction });
    }

    if (prevProps.lstSchAction !== lstSchAction) {
      this.setState({ actionList: lstSchAction.dropdownTrees });
    }
    if (prevProps.deletes !== deletes) {
      this.render();
    }
  }

  onClickAdd() {
    this.props.setIdSelect(null, "Add");
    this.props.history.push("/userSetting/userSettingForm");
  }

  editCallback(e) {
    this.props.setIdSelect(e.data.id, "Edit");
    this.props.history.push("/userSetting/userSettingForm");
  }

  deleteCallback(e) {
    this.props.deleteUser(e.data.id);
  }

  onFormChange(v) {
    let diffValue = get(
      diff(this.state.formData, v.formData),
      "UserDetail.basicData",
      undefined
    );
    if (diffValue === undefined) return;

    let objects = Object.getOwnPropertyNames(diffValue);
    for (let index in objects) {
      // if ("" + objects[index] === "ownerPartnerType") {
      if (lstMutilSelect.includes("" + objects[index])) {
        this.setValueMultiSelectChange(
          "" + objects[index],
          diffValue["" + objects[index]]
        );
      } else {
        this.bindingData(
          "" + objects[index],
          diffValue["" + objects[index]]["__new"]
        );
      }
    }
  }

  setValueMultiSelectChange(fieldName, value) {
    let { formData } = this.state;
    let values = [];

    for (let index in value) {
      value[index][0] !== "-" && values.push(value[index][1]);
    }
    formData.UserDetail.basicData[fieldName] = values;
    let { partnerName } = formData.UserDetail.basicData;
    if (fieldName === "ownerPartnerType")
      this.props.getUserSearch("UserLevel", values);
    if (fieldName === "partnerType")
      this.props.getUserSearch("PartnerByType", values);
    if (fieldName === "functions")
      this.props.getUserSearch("Action", values, partnerName);

    this.setState({ formData });
  }

  bindingData(fieldName, value) {
    let { formData } = this.state;
    formData.UserDetail.basicData[fieldName] = value;
    if (fieldName === "partnerName") {
      this.props.getUserSearch("Role", undefined, value);
      this.props.getUserSearch("Function", undefined, value);
      this.props.getUserSearch("Action", [], value);
    }
    this.setState({ formData });
  }

  submit(FormData) {
    let data, params;
    let {
      ownerPartnerType,
      ownerPartnerName,
      userLevel,
      username,
      mobile,
      email,
      expired,
      locked,
      active,
      partnerType,
      partnerName,
      roleName,
      functions,
      action,
      permission,
      activeTab,
    } = get(FormData, "formData.UserDetail.basicData");
    if (activeTab === "0") {
      params = "?";
      data = {
        OwnerPartnerTypes: ownerPartnerType,
        OwnerPartnerName: ownerPartnerName,
        UserLevels: userLevel,
        Username: username,
        Mobile: mobile,
        Email: email,
        IsExpired: expired,
        IsLocked: locked,
        IsActive: active,
      };
    } else {
      params = "ByRole?";
      data = {
        OwnerPartnerTypes: partnerType,
        OwnerPartnerId: partnerName,
        Roles: roleName,
        // "Functions": functions,
        Actions: action,
        HavePermission: permission,
      };
    }

    let arrUrl = Object.keys(data)
      .map(function (key, index) {
        if (Array.isArray(data[key])) {
          if (data[key].length > 0)
            return `${key}=` + data[key].join(`&${key}=`);
        } else if (data[key] !== "") return `${key}=` + data[key];
      })
      .filter((item) => item !== undefined);

    params += arrUrl.join("&");

    this.props.setParam(params);

    // this.setState({ params })
  }

  render() {
    let {
      formData,
      ownerPartnerTypeList,
      userLevelList,
      OwnerPartnerByTypeList,
      roleNameList,
      functionsList,
      actionList,
      params,
    } = this.state;
    const log = (type) => console.log.bind(console, type);

    return [
      <>
        <Table />
      </>,
    ];
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
  setIdSelect: (personalId, action) =>
    dispatch(UserActions.setIdSelect(personalId, action)),
  getUserSearch: (name, arr, id) =>
    dispatch(UserActions.getUserSearch(name, arr, id)),
  searchGridView: (data, activeTab) =>
    dispatch(UserActions.searchGridView(data, activeTab)),
  deleteUser: (id) => dispatch(UserActions.deleteUser(id)),
  setParam: (value) => dispatch(UserSettingActions.setParam(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSetting);

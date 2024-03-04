import React, { Component } from "react";
import { connect } from "react-redux";
import VehicleActions from "../../Redux/VehicleRedux";
import SigninActions from "../../Redux/SigninRedux";
import VersatileActions from "../../Redux/VersatileRedux";
import PannelBox from "../../Components/PannelBox";
import UserActions from "../../Redux/UserRedux";
import Form from "react-jsonschema-form";
import { setSchema } from "./Form/Fields/Schema";
import SaveButton from "../../Components/SaveButton";
import DropdownActions from "../../Redux/DropdownRedux";
import CancelButton from "../../Components/CancelButton";
import { get } from "lodash";
import Data from "./Form/Fields/Data";
import Alert from "../../Components/Alert";
import { t } from "../../Components/Translation";
import { BoxContrainer, Button } from "../../components_new";

const CustomTitleField = () => {
  return "";
};

export const fields = {
  TitleField: CustomTitleField,
  basicData: Data,
};

export const uiSchema = {
  DriverDetail: {
    basicData: {
      "ui:field": "basicData",
    },
  },
};

class UpdateProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      alertSetting: {
        show: false,
        type: 3,
        content: "",
        ErrorSubcode: 0,
      },
      formDataSubmit: {},
      formData: {
        DriverDetail: {
          basicData: {
            displayName: "",
            mobile: "",
            email: "",
            lineId: "",
            defaultLanguageNav: [],
            attachCode: "",
            attachInfo: {},
            fileUrl: "",
          },
        },
      },
      defaultLanguagelist: [],
      attachInfo: [],
      statusSubmit: {
        submitSuccess: false,
        status: true,
        ErrorSubcode: "",
      },
    };
  }

  componentWillMount() {
    this.setAlertSetting(true, 5);
    let { getProfile } = this.props;
    getProfile();

    this.props.getUserCreateAndUpdateOpt("Language", "", "");
  }

  componentDidUpdate(prevProps) {
    let { statusSubmit, lstLanguage } = this.props;
    let { infoProfile } = this.props;
    let { basicData } = this.state.formData.DriverDetail;

    let { alertSetting } = this.state;

    if (prevProps.lstLanguage !== lstLanguage) {
      this.setState({ defaultLanguagelist: lstLanguage });
    }

    if (prevProps.statusSubmit !== statusSubmit) {
      alertSetting.show = true;
      alertSetting.type = statusSubmit.status ? 1 : 2;
      alertSetting.content = statusSubmit.status
        ? "Update Profile Successed"
        : "Update Profile Failed";
      alertSetting.ErrorSubcode = statusSubmit.ErrorSubcode;
      this.setState({ alertSetting });
    }

    if (prevProps.infoProfile !== infoProfile) {
      basicData.displayName = get(infoProfile, "displayName", "");
      basicData.mobile = get(infoProfile, "mobile", "");
      basicData.email = get(infoProfile, "email", "");
      basicData.lineId = get(infoProfile, "lineId", "");
      basicData.defaultLanguageNav =
        "" + get(infoProfile, "defaultLanguageNav.key", "");
      basicData.attachCode = get(infoProfile, "attachInfo.attachCode", "");
      basicData.attachInfo = get(infoProfile, "attachInfo", "");
      this.setAlertSetting(false, 6);
    }
  }

  onChange(v) {
    this.setState({
      formData: v.formData,
    });
  }

  submit(e) {
    let { alertSetting, formDataSubmit } = this.state;
    alertSetting.show = true;
    alertSetting.type = 3;
    alertSetting.content = "Update Profile";
    this.setState({ formDataSubmit: e });
  }

  submitComfirm() {
    let { formDataSubmit } = this.state;
    // Add
    let data = this.mappingFieldsInsert(formDataSubmit.formData.DriverDetail);
    this.setAlertSetting(true, 6);
  }

  setAlertSetting(isShow, type, content = "", ErrorSubcode) {
    let { alertSetting } = this.state;
    alertSetting.show = isShow;
    alertSetting.type = type;
    alertSetting.content = content;
    alertSetting.ErrorSubcode = ErrorSubcode;
    this.setState({ alertSetting });
  }

  mappingFieldsInsert() {
    let { basicData } = this.state.formData.DriverDetail;
    let data = {
      displayName: basicData.displayName,
      mobile: basicData.mobile,
      email: basicData.email,
      lineId: basicData.lineId,
      defaultLanguageNav: {
        key: basicData.defaultLanguageNav,
      },
      attachCode: basicData.attachCode,
    };
    this.props.addProfile(data);
  }

  render() {
    let { lstLanguage } = this.props;
    let { alertSetting, defaultLanguagelist } = this.state;
    const log = (type) => console.log.bind(console, type);
    let { statusSubmit } = this.props;
    return (
      <BoxContrainer title={"update_profile"}>
        <Form
          schema={setSchema(defaultLanguagelist)}
          uiSchema={uiSchema}
          fields={fields}
          formData={this.state.formData}
          onChange={(v) => this.onChange(v)}
          onSubmit={(v) => this.submit(v)}
          onError={log("errors")}
        >
          <div className="hr-line-dashed" />
          <div className="row" style={{ textAlign: "right" }}>
            <Button
              isCancelButton={true}
              loading={false}
              onClick={() => {
                this.props.history.push("/homePage");
              }}
            />
            <Button
              isSaveButton={true}
              loading={this.props.loading}
              onClick={(v) => {
                this.submit(v);
              }}
            />

            {/* <CancelButton
              name={t("cancel")}
              loading={false}
              onClick={() => {
                this.props.history.push("/homePage");
              }}
            />
            <SaveButton name={t("save")} loading={this.props.loading} /> */}
          </div>
        </Form>

        <Alert
          setting={alertSetting}
          onConfirm={() => {
            if (alertSetting.type === 3) {
              alertSetting.show = false;
              this.submitComfirm();
            }
            //if success
            else if (statusSubmit.status) {
              alertSetting.show = false;
              let fileUrl = get(
                this.state.formData,
                "DriverDetail.basicData.fileUrl",
                ""
              );
              let defaultLanguageNav = get(
                this.state.formData,
                "DriverDetail.basicData.defaultLanguageNav",
                "1"
              );
              if (fileUrl !== "") {
                let dataLogin = JSON.parse(
                  JSON.stringify(this.props.dataLogin)
                );
                dataLogin.avatarUrl = fileUrl;
                this.props.setStateRedux("dataLogin", dataLogin);
              }
              if (defaultLanguageNav == 3) this.props.setLanguage("ja");
              else if (defaultLanguageNav == 2) this.props.setLanguage("th");
              else if (defaultLanguageNav == 1) this.props.setLanguage("en");

              this.props.history.push("/homePage");
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
      </BoxContrainer>
      // <PannelBox title={t("update_profile")}>

      //
      // </PannelBox>
    );
  }
}

const mapStateToProps = (state) => ({
  infoProfile: state.vehicle.infoProfile,
  infoAddProfile: state.vehicle.infoAddProfile,
  statusSubmit: state.vehicle.statusSubmit,
  dataLogin: state.signin.dataLogin,
  lstLanguage: state.user.lstLanguage,
});

const mapDispatchToProps = (dispatch) => ({
  getProfile: () => dispatch(VehicleActions.getProfile()),
  addProfile: (data) => dispatch(VehicleActions.addProfile(data)),
  setStateRedux: (name, value) =>
    dispatch(SigninActions.setStateRedux(name, value)),
  setLanguage: (data) => dispatch(VersatileActions.setLanguage(data)),
  getUserCreateAndUpdateOpt: (name, id, query) =>
    dispatch(UserActions.getUserCreateAndUpdateOpt(name, id, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileForm);

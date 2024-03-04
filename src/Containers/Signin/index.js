import React, { Component, Suspense } from "react";
import Particles from "react-particles-js";
import { connect } from "react-redux";
import SigninActions from "../../Redux/SigninRedux";
import VersatileActions from "../../Redux/VersatileRedux";
import "antd/dist/antd.css";
import "./styles/SigninScreenStyles.css";
// import Checkbox from '@material-ui/core/Checkbox';
import { IconButton } from "@material-ui/core";
import Images from "../../Themes/Images";
import { Row, Col } from "reactstrap";
import { getErrorMessage } from "../../Functions/getErrorMessage";
import i18n from "../../i18n";
import { t, rTT } from "../../Components/Translation";
import { useTranslation } from "react-i18next";
import { Button } from "../../components_new";
import { Input, Checkbox } from "antd";
import { UserIcon, LockClosedIcon } from "@heroicons/react/outline";
import tractorpic from "./picture/tractor.png";
import excavatorpic from "./picture/excavator.png";

const LiLanguage = (arg) => {
  const { i18n } = useTranslation();
  const changeLanguage = (Language) => {
    i18n.changeLanguage(Language);
  };

  let style =
    arg.index === 0
      ? {
          borderRadius: 0,
          border: 0,
          height: 30,
          width: 30,
          padding: "0 0px",
        }
      : {
          borderRadius: "0px 5px 5px 0px",
          border: 0,
          height: 30,
          width: 30,
          padding: "0 0px",
        };

  return (
    <IconButton
      style={style}
      onClick={() => {
        changeLanguage(arg.language);
        arg.onClick();
      }}
    >
      <img
        src={Images[arg.language === "ja" ? "jp" : arg.language]}
        style={{
          height: 12.5,
          boxShadow: "1px 2px 10px 0px rgba(0,0,0,0.2)",
          animation: "display-icon 1s",
        }}
      />
    </IconButton>
  );
};

const FormInput = (arg) => {
  const { t } = useTranslation();

  return (
    <input
      type={arg.type}
      value={arg.value}
      placeholder={t(arg.placeholder)}
      onChange={(e) => arg.onChange(e)}
      style={arg.style}
    />
  );
};

class SigninScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      languageBox: "",
      language: this.props.language ? this.props.language : "en",
      remember: false,
      messageErrorInput: "",
      isActive: true,
      platformId: 2,
      platformName: "Yanmar Excavator",
    };
  }

  componentWillMount() {
    this.props.setLoading();
    if (this.props.stateSignin === true) {
      if (this.props.dataLogin.platform_id === 3) {
        this.props.history.push({
          pathname: "Tractor/homePage",
          state: "fristTest",
        });
      } else {
        {
          this.props.history.push({
            pathname: "/homePage",
            state: "fristTest",
          });
        }
      }
    }
  }

  componentDidMount() {
    if (this.props.language == "ja") {
      i18n.changeLanguage("th");
      this.props.setLanguage("th");
    } else i18n.changeLanguage(this.props.language);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.configtest !== this.props.configtest) {
    }
    if (prevProps.dataForce !== this.props.dataForce && this.props.dataForce) {
      this.props.history.push("forceChange");
    }
    if (
      prevProps.isAgreement !== this.props.isAgreement &&
      this.props.stateSignin
    ) {
      if (this.props.isAgreement) {
        this.props.getProfileAndMenu();
      } else {
        this.props.history.push("/privacyandpolicy");
      }
    }
    if (
      prevProps.menuUser !== this.props.menuUser &&
      this.props.stateSignin &&
      this.props.isAgreement
    )
      if (this.props.dataLogin.platform_id === 3) {
        this.props.history.push({
          pathname: "Tractor/homePage",
          state: "fristTest",
        });
      } else {
        {
          this.props.history.push({
            pathname: "/homePage",
            state: "fristTest",
          });
        }
      }
  }

  _pressLogin = (e) => {
    e.preventDefault();
    let { username, password, remember } = this.state;
    if (username === "") {
      this.setState({ messageErrorInput: "please_input_username" });
    } else if (password === "") {
      this.setState({ messageErrorInput: "please_input_password" });
    } else {
      this.setState({ messageErrorInput: "" });
      this.props.signin(username, password, remember);
    }
  };

  pressLogin = () => {
    let { username, password, remember, platformId } = this.state;
    if (username === "") {
      this.setState({ messageErrorInput: "please_input_username" });
    } else if (password === "") {
      this.setState({ messageErrorInput: "please_input_password" });
    } else {
      this.setState({ messageErrorInput: "" });
      if (this.state.platformId === 2) {
        this.props.signin(username, password, remember);
      } else if (this.state.platformId === 3) {
        this.props.signinTractor(username, password, remember, platformId);
        this.props.setConfig({
          parking: "#ff3b30",
          driving: "#5CE648",
          idling: "#FFE600",
          overspeed: "#6F25E5",
          offline: "#55c1d9",
          speed: "#5CE648",
          brake: "#FF5733",
          rpm: "#0000FF",
          fuel: "#F1C40F",
          dtc: "#FF0000",
          clutch: "#008080",
          exhaust: "#800000",
          temperature: "#00FFFF",
          pedal: "#005eb8",
          temp_limit: "#6F25E5",
          temp_hot: "#EB5757",
          temp_cool: "#2D9CDB",
          speed_limit: "#ff0000",
          rpm_zone: {
            red_zone: "#ff5252",
            green_zone: "#78ff52",
          },
          main_battery: "#e10000",
          backup_battery: "#ff7c3e",
          option_temperature: [
            "#ff0000",
            "#0218fe",
            "#eb04ff",
            "#fc7a00",
            "#00ecff",
          ],
        });
      }
    }
  };

  _changeUsername = (e) => {
    this.setState({ username: e.target.value.trim() });
  };

  _changePassword = (e) => {
    this.setState({ password: e.target.value.trim() });
  };

  changeLanguage(language, index) {
    return (
      <LiLanguage
        language={language}
        index={language}
        onClick={() => {
          this.props.setLanguage(language);
        }}
      />
    );
  }

  render() {
    let color = "black";
    if (process.env.REACT_APP_NODE_ENV == "development") {
      color = "red";
    } else if (process.env.REACT_APP_NODE_ENV == "production") {
      color = "green";
    }
    let { languageBox, isActive } = this.state;

    let arrLg = ["en", "th"];

    return (
      <Suspense fallback={null}>
        <div
          id="main"
          style={{
            flex: 1,
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: "100%",
            width: "100%",
            flexDirection: "row",
            backgroundColor: "#DCDCDC",
            backgroundImage: `url(${require("./yanmar-bg.png")})`,
            backgroundSize: "cover",
          }}
        >
          {/* <div className='tw-bg-cover tw-bg-center' style={{ backgroundImage: `url(${require('./yanmar-bg-3.png')})`, backgroundSize: 'cover' }}> */}
          <Row style={{ position: "absolute", height: "100%", width: "100%" }}>
            <Col
              lg="12"
              style={{
                display: "flex",
                height: "100%",
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              {/* <div className='box-signin-opacity'></div> */}
              <div className="box-signin">
                {" "}
                {isActive ? (
                  ""
                ) : (
                  <a
                    style={{ display: "flex" }}
                    onClick={() => this.setState({ isActive: true })}
                  >
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-1 h-1"
                      style={{ width: 24, height: 24 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                    {t("driver_report_43")}
                  </a>
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <img
                    alt="image"
                    src={Images.logoYanmar}
                    style={{
                      position: "relative",
                      width: 240,
                      marginBottom: "15px",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    height: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {isActive ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontSize: 14, marginBottom: 15 }}>
                        {t("welcome_to")}
                      </span>
                    </div>
                  ) : (
                    <span
                      style={{
                        width: "146px",
                        height: "20px",
                        borderRadius: "14px",
                        background: "rgba(220, 30, 55, 0.15)",
                        textAlign: "center",
                        color: "#DC1E37",
                      }}
                    >
                      {this.state.platformId === 2
                        ? t("platformexcavator")
                        : t("platformtractor")}
                    </span>
                  )}

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {isActive ? (
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <div
                          id="language-signin"
                          style={{
                            position: "absolute",
                            marginLeft: 102,
                            marginTop: -43,
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              background: "#ebebeb",
                              borderRadius: "5px 5px",
                              border: 0,
                              height: 30,
                              width: languageBox ? 60 : 0,
                              padding: "0 0px",
                              boxShadow: "1px 2px 10px 0px rgba(0,0,0,0.1)",
                              animation:
                                languageBox === ""
                                  ? ""
                                  : languageBox
                                  ? "mymove 0.3s"
                                  : "mymove-out 0.3s",
                            }}
                          />

                          {languageBox && (
                            <div
                              style={{
                                position: "absolute",
                                background: "a6a6a6",
                                borderRadius: "5px 5px",
                                border: 0,
                                height: 30,
                                width: 30,
                                padding: "0 0px",
                                boxShadow: "1px 2px 10px 0px rgba(0,0,0,0.2)",
                              }}
                            />
                          )}

                          <IconButton
                            id="button-signin"
                            aria-label="delete"
                            style={{
                              height: 30,
                              width: 30,
                              padding: 0,
                              borderRadius: "5px 5px",
                            }}
                            onClick={() =>
                              this.setState({ languageBox: !languageBox })
                            }
                            onBlur={() =>
                              setTimeout(
                                () => this.setState({ languageBox: false }),
                                200
                              )
                            }
                          >
                            <img
                              src={
                                Images[
                                  this.props.language === "ja"
                                    ? "en"
                                    : this.props.language
                                ]
                              }
                              styMuiTouchRipple-root-29le={{
                                height: 12.5,
                                boxShadow: "1px 2px 10px 0px rgba(0,0,0,0.2)",
                              }}
                            />
                          </IconButton>

                          {languageBox &&
                            arrLg
                              .filter((l) => l !== this.props.language)
                              .map((item, i) => this.changeLanguage(item, i))}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    {isActive ? (
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {" "}
                        <div style={{ display: "flex" }}>
                          <div
                            className="selectplatform"
                            style={{
                              border: "1px solid",
                              borderRadius: "12px",
                              marginRight: "20px",
                            }}
                            id="excavator"
                            onClick={(boxId) => {
                              document.getElementById(
                                "excavator"
                              ).style.border = "3px solid red";
                              document.getElementById("tractor").style.border =
                                "1px solid";
                              document.getElementById(
                                "main"
                              ).style.backgroundImage = `url(${require("./yanmar-bg.png")})`;
                              this.setState({
                                platformId: 2,
                                platformName: "Yanmar Excavator",
                              });
                            }}
                          >
                            <img
                              src={excavatorpic}
                              style={{
                                height: "170px",
                                width: "150px",
                              }}
                            />
                            {t("excavator")}
                          </div>
                          <div
                            id="tractor"
                            className="selectplatform"
                            style={{
                              border: "1px solid",
                              borderRadius: "12px",
                            }}
                            onClick={(boxId) => {
                              document.getElementById("tractor").style.border =
                                "3px solid red";
                              document.getElementById(
                                "excavator"
                              ).style.border = "1px solid";
                              document.getElementById(
                                "main"
                              ).style.backgroundImage = `url(${require("./picture/yanmar-2.png")})`;
                              this.setState({
                                platformId: 3,
                                platformName: "Yanmar Tractor",
                              });
                            }}
                          >
                            <img
                              src={tractorpic}
                              style={{ height: "170px", width: "170px" }}
                            />
                            {t("tractor")}
                          </div>
                        </div>
                        {/* <br /> */}
                        <span
                          style={{ marginTop: "20px", textAlign: "center" }}
                        >
                          {t("platformselect")}
                        </span>
                        <div style={{ display: "flex", marginTop: 10 }}>
                          <Button
                            className="btn-login"
                            text="next"
                            backgroundColor="rgb(230, 29, 42)"
                            borderColor="rgb(230, 29, 42)"
                            width={350}
                            loading={this.props.loading}
                            onClick={() => {
                              this.setState({ isActive: false });
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ margin: "0px -15px 0px -15px " }}>
                          <div
                            className="form-group field field-string"
                            style={{
                              padding: "0 10px",
                              flex: 1,
                              marginBottom: 10,
                            }}
                          >
                            <label
                              className="control-label"
                              style={{ fontWeight: 500, fontSize: 14 }}
                            >
                              {t("username")}
                            </label>
                            <Input
                              size="large"
                              placeholder={rTT(t("username"))}
                              prefix={
                                <UserIcon
                                  style={{ width: 20, marginRight: 5 }}
                                  aria-hidden="true"
                                />
                              }
                              onChange={(e) => this._changeUsername(e)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") this.pressLogin();
                              }}
                            />
                          </div>

                          <div
                            className="form-group field field-string"
                            style={{ padding: "0 10px", flex: 1 }}
                          >
                            <label
                              className="control-label"
                              style={{ fontWeight: 500, fontSize: 14 }}
                            >
                              {t("password")}
                            </label>
                            <Input.Password
                              size="large"
                              placeholder={rTT(t("password"))}
                              prefix={
                                <LockClosedIcon
                                  style={{ width: 20, marginRight: 5 }}
                                  aria-hidden="true"
                                />
                              }
                              onChange={(e) => this._changePassword(e)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") this.pressLogin();
                              }}
                            />
                          </div>
                        </div>
                        <span style={{ color: "red", marginTop: 10 }}>
                          {this.state.messageErrorInput !== ""
                            ? t(this.state.messageErrorInput)
                            : this.props.messageError !== null &&
                              getErrorMessage(
                                parseInt(this.props.messageError),
                                this.props.language
                              )}
                        </span>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: 350,
                          }}
                        >
                          <div style={{ flexDirection: "column" }}>
                            <Checkbox
                              checked={this.state.remember}
                              onChange={(e) => {
                                this.setState((state) => ({
                                  remember: !state.remember,
                                }));
                              }}
                            >
                              {t("remember")}
                            </Checkbox>
                          </div>
                          <div
                            style={{
                              flexDirection: "column",
                              justifyContent: "end",
                            }}
                          >
                            <a
                              href="#/forgetPassword"
                              style={{
                                fontWeight: "bold",
                                fontSize: 14,
                                // paddingLeft: 40,
                                // marginLeft: 30,
                              }}
                            >
                              {t("forgot_password")}
                            </a>
                          </div>
                        </div>
                        <div style={{ display: "flex", marginTop: 10 }}>
                          <Button
                            className="btn-login"
                            text="log_in"
                            backgroundColor="rgb(230, 29, 42)"
                            borderColor="rgb(230, 29, 42)"
                            width={350}
                            loading={this.props.loading}
                            onClick={() => this.pressLogin()}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <span
            style={{ position: "absolute", bottom: 0, left: 5, color: "white" }}
          >
            {t("last_version_1")}
          </span>
        </div>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  users: state.signin.users,
  loading: state.signin.loading,
  messageError: state.signin.messageError,
  stateSignin: state.signin.stateSignin,
  language: state.versatile.language,
  isAgreement: state.signin.isAgreement,
  menuUser: state.signin.menuUser,
  dataForce: state.signin.dataForce,
  lstRemember: state.signin.lstRemember,
  configtest: state.signin.configtest,
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: () => dispatch(SigninActions.setLoading()),
  signin: (username, password, remember) =>
    dispatch(SigninActions.signin(username, password, remember)),
  signinTractor: (username, password, remember) =>
    dispatch(SigninActions.signinTractor(username, password, remember)),
  setLanguage: (data) => dispatch(VersatileActions.setLanguage(data)),
  getProfileAndMenu: () => dispatch(SigninActions.getProfileAndMenu()),
  setConfig: (data) => dispatch(SigninActions.setConfig(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SigninScreen);

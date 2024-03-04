import React, { Component, Suspense } from "react";
import Particles from "react-particles-js";
import { connect } from "react-redux";
import SigninActions from "../../Redux/SigninRedux";
import VersatileActions from "../../Redux/VersatileRedux";
import "antd/dist/antd.css";
import "./styles/SigninScreenStyles.css";
import Checkbox from "@material-ui/core/Checkbox";
import { IconButton } from "@material-ui/core";
import Images from "../../Themes/Images";
import { Row, Col } from "reactstrap";
import LaddaButton, { S, SLIDE_LEFT } from "react-ladda";
import { getErrorMessage } from "../../Functions/getErrorMessage";
import i18n from "../../i18n";
import { t } from "../../Components/Translation";
import { useTranslation } from "react-i18next";

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
    };
  }

  componentWillMount() {
    this.props.setLoading();
    if (this.props.stateSignin === true) {
      this.props.history.push("homePage");
    }
  }

  componentDidMount() {
    if (this.props.language == "ja") {
      i18n.changeLanguage("en");
      this.props.setLanguage("en");
    } else i18n.changeLanguage(this.props.language);
  }

  componentDidUpdate(prevProps, prevState) {
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
    ) {
      this.props.history.push({
        pathname: "/homePage",
        state: "fristTest",
      });
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
    let { languageBox } = this.state;

    // let arrLg = ['en', 'th', 'ja']
    let arrLg = ["en", "th"];

    return (
      <Suspense fallback={null}>
        <div
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
            flexDirection: "row", // justifyContent: 'left', alignItems: 'center',
            backgroundColor: "#DCDCDC",
            backgroundImage: `url(${Images.backgroundSignin2})`,
            backgroundSize: "cover",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
            }}
          >
            <Particles
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
              params={{
                particles: {
                  number: {
                    value: 80,
                    density: {
                      enable: true,
                      value_area: 800,
                    },
                  },
                  size: {
                    value: 5,
                  },
                  color: {
                    value: "#aaa",
                  },
                  line_linked: {
                    color: "#aaa",
                  },
                },
                interactivity: {
                  detect_on: "canvas",
                  events: {
                    onhover: {
                      enable: false,
                      mode: "repulse",
                    },
                    onclick: {
                      enable: true,
                      mode: "push",
                    },
                    resize: true,
                  },
                  modes: {
                    grab: {
                      distance: 400,
                      line_linked: {
                        opacity: 1,
                      },
                    },
                    bubble: {
                      distance: 400,
                      size: 40,
                      duration: 2,
                      opacity: 8,
                      speed: 3,
                    },
                    repulse: {
                      distance: 200,
                      duration: 0.4,
                    },
                    push: {
                      particles_nb: 4,
                    },
                    remove: {
                      particles_nb: 2,
                    },
                  },
                },
              }}
            />
          </div>

          <Row style={{ position: "absolute", height: "100%", width: "100%" }}>
            <Col
              lg="6"
              style={{
                display: "flex",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ flexDirection: "column", zIndex: 500 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    alt="image"
                    src={Images.logoYanmar}
                    style={{
                      position: "relative",
                      width: "270px",
                      marginBottom: "30px",
                    }}
                  />
                </div>

                <form onSubmit={(e) => this._pressLogin(e)}>
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
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      {/* <span style={{ fontSize: 28 }}>{t('user_login')}</span> */}
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: 14,
                          marginTop: -5,
                        }}
                      >
                        {t("welcome_to")}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <div
                          id="language-signin"
                          style={{
                            position: "absolute",
                            marginLeft: 102,
                            marginTop: -25,
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

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          paddingTop: 10,
                          alignItems: "center",
                        }}
                      >
                        <i
                          className="fa fa-user"
                          aria-hidden="true"
                          style={{ fontSize: 25 }}
                        ></i>

                        {/* <AutoComplete
                          style={{ marginLeft: 10, borderRadius: 5, borderColor: 'transparent', width: 225 }}
                          value={this.state.username}
                          options={this.props.lstRemember}
                          placeholder={t("username")}
                          onChange={(e) => this._changeUsername(e)}
                          filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                          }
                        /> */}

                        <FormInput
                          type={"username"}
                          placeholder={"username"}
                          value={this.state.username}
                          onChange={(e) => this._changeUsername(e)}
                          style={{
                            marginLeft: 10,
                            height: 30,
                            width: 225,
                            borderColor: "transparent",
                            padding: "10px",
                          }}
                        />
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          paddingTop: 10,
                          alignItems: "center",
                        }}
                      >
                        <i
                          className="fa fa-lock"
                          aria-hidden="true"
                          style={{ fontSize: 25 }}
                        ></i>

                        <FormInput
                          type={"password"}
                          placeholder={"password"}
                          value={this.state.password}
                          onChange={(e) => this._changePassword(e)}
                          style={{
                            marginLeft: 10,
                            height: 30,
                            width: 225,
                            borderColor: "transparent",
                            padding: "10px",
                          }}
                        />

                        {/* <input type='password' placeholder={t("password")} onChange={(e) => this._changePassword(e)} value={this.state.password}
                        style={{
                          marginLeft: 10, height: 30, width: 220,
                          borderColor: 'transparent', padding: '10px'
                        }}
                        required /> */}
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
                    {/* <br /> */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Checkbox
                        value="checkedA"
                        checked={this.state.remember}
                        onChange={() => {
                          this.setState((state) => ({
                            remember: !state.remember,
                          }));
                        }}
                        inputProps={{ "aria-label": "Checkbox A" }}
                      />
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: 14,
                          paddingRight: 10,
                        }}
                      >
                        {t("remember")}
                      </span>
                      {"|"}
                      <a
                        href="#/forgetPassword"
                        style={{
                          fontWeight: "bold",
                          fontSize: 14,
                          paddingLeft: 10,
                        }}
                      >
                        {t("forgot_password")}
                      </a>
                    </div>
                    <div style={{ display: "flex", marginTop: 10 }}>
                      <LaddaButton
                        loading={this.props.loading}
                        type="submit"
                        data-size={S}
                        data-style={SLIDE_LEFT}
                        data-spinner-size={30}
                        data-spinner-lines={12}
                        style={{
                          lineHeight: 0,
                          backgroundColor: "#a4a8a9",
                          width: 120,
                          height: 30,
                          color: "white",
                          fontSize: 15,
                          borderRadius: "15px",
                        }}
                      >
                        {t("log_in")}
                      </LaddaButton>
                    </div>
                  </div>
                </form>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 40,
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: "bold" }}>
                      {t("compattible_browser")}
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <span style={{ position: "absolute", bottom: 0, left: 5 }}>
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
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: () => dispatch(SigninActions.setLoading()),
  signin: (username, password, remember) =>
    dispatch(SigninActions.signin(username, password, remember)),
  setLanguage: (data) => dispatch(VersatileActions.setLanguage(data)),
  getProfileAndMenu: () => dispatch(SigninActions.getProfileAndMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SigninScreen);

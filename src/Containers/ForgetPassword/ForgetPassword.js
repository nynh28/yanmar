import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import Images from "../../Themes/Images";
import PasswordActions from "../../Redux/PasswordRedux";
import { Row, Col, Table } from "reactstrap";
import SaveButton from "../../Components/SaveButton";
import CancelButton from "../../Components/CancelButton";
import { t, rTT } from "../../Components/Translation";
import { getErrorMessage } from "../../Functions/getErrorMessage";
import { useTranslation } from "react-i18next";
import "./styles.css";
import { Input } from "antd";
import { Button } from "../../components_new";

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

class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      isActive: true,
      language: this.props.language ? this.props.language : "en",
      loginText: {
        en: "SUBMIT",
        th: "ยืนยัน",
        ja: "SUBMIT",
      },
      userLogin: {
        en: "Forgot Password",
        th: "กรุณาเข้าสู่ระบบ",
        ja: "ลืมรหัสผ่าน",
      },
      reSendText: {
        en: "Resend Password",
        th: "ส่งอีกครั้ง",
        ja: "Resend Password",
      },
      emailOrMobile: "",
      confirmCode: "",
      newPassword: "",
      conNewPassword: "",
      passNotEqual: "",
      respone: false,
      username: "",
    };
    this.toggleShow = this.toggleShow.bind(this);
  }

  handleHide = () => {
    this.setState({
      isActive: false,
    });
  };
  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  componentDidMount = () => {
    if (this.props.newPassword) {
      this.setState({ newPassword: this.props.newPassword });
    }
    if (this.props.conNewPassword) {
      this.setState({ conNewPassword: this.props.conNewPassword });
    }
  };
  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  componentDidUpdate(prevProps, prevState) {
    let { infoForgotPassword, errorSubcodeForget, stateForget, countCoolDown } =
      this.props;
    if (
      prevProps.infoForgotPassword !== infoForgotPassword &&
      infoForgotPassword
    ) {
      this.setState({
        isActive: false,
      });
    }
    if (
      prevProps.errorSubcodeForget !== errorSubcodeForget &&
      errorSubcodeForget &&
      !this.state.isActive
    ) {
      this.setState({
        isActive: true,
      });
    }
    if (prevProps.stateForget !== stateForget && stateForget) {
      this.props.history.push("/");
    }
    if (prevProps.countCoolDown !== countCoolDown) {
      // console.log(countCoolDown)
      if (prevProps.countCoolDown <= 0 && countCoolDown > 0) {
        this.cooldownButton();
        this.props.setStateRedux(
          "timeStart",
          (new Date().getTime() / 1000) | 0
        );
      } else if (countCoolDown === 0) {
        clearInterval(this.interval);
        this.props.setStateRedux("timeStart", null);
      }
    }
  }

  cooldownButton() {
    this.interval = setInterval(() => {
      // console.log(((new Date()).getTime() / 1000 | 0), this.props.countCoolDown)
      this.props.setCoolDown();
    }, 1000);
  }

  componentWillMount() {
    this.props.setStateRedux("loadingForget", false);
    this.props.setStateRedux("loadingConfirm", false);
    this.props.setStateRedux("errorSubcodeForget", null);
    this.props.setStateRedux("errorSubcodeConfirm", null);
    this.props.setStateRedux("infoForgotPassword", null);
    // console.log((new Date()).getTime())
    let { timeStart } = this.props;
    if (timeStart && ((new Date().getTime() / 1000) | 0) - timeStart < 30) {
      let timeNow = ((new Date().getTime() / 1000) | 0) - timeStart;
      this.props.setStateRedux("countCoolDown", 30 - timeNow);
      // console.log(30 - timeNow)
      this.cooldownButton();
    } else if (
      timeStart &&
      ((new Date().getTime() / 1000) | 0) - timeStart > 30
    ) {
      this.props.setStateRedux("countCoolDown", 0);
    }
    // if (this.props.countCoolDown > 0) {
    //   this.cooldownButton()
    // }
  }

  sendEmailOrMobile = () => {
    this.props.forgotPassword(this.state.emailOrMobile);
  };

  _pressLogin = (e) => {
    e.preventDefault();

    let { infoForgotPassword } = this.props;
    let { newPassword, conNewPassword, respone, confirmCode } = this.state;
    // if (!respone) {

    if (newPassword !== conNewPassword) {
      this.setState({ passNotEqual: "password_not_match" });
      this.props.setStateRedux("errorSubcodeConfirm", null);
    } else if (this.state.username === "") {
      this.setState({ passNotEqual: "Username  is Required" });
      this.props.setStateRedux("errorSubcodeConfirm", null);
    } else {
      this.setState({ passNotEqual: "" });
      this.props.confirmForgot(this.state.username, confirmCode, newPassword);
      // this.props.confirmForgot(get(infoForgotPassword, 'userName'), confirmCode, newPassword)
    }
  };

  handleHide = () => {
    this.setState({
      isActive: false,
    });
  };

  checkPassword = (e) => {
    let pass = e.target.value.trim();

    // let paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,50}$/;
    // if (pass.match(paswd)) this.setState({ respone: true })
    // else this.setState({ respone: false })

    this.setState({ newPassword: pass });
  };

  ConcheckPassword = (e) => {
    let pass = e.target.value;
    this.setState({ conNewPassword: pass.trim() });
  };

  render() {
    let {
      emailOrMobile,
      newPassword,
      conNewPassword,
      confirmCode,
      passNotEqual,
      respone,
    } = this.state;
    let {
      infoForgotPassword,
      errorSubcodeConfirm,
      errorSubcodeForget,
      loadingConfirm,
      loadingForget,
      countCoolDown,
    } = this.props;

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
            backgroundImage: `url(${require("./yanmar-bg.png")})`,
            backgroundSize: "cover",
          }}
        >
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
              <div className="box-forgotpassword">
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
                      width: "230px",
                      marginBottom: "15px",
                    }}
                  />
                </div>

                {this.state.isActive ? (
                  // ------------------ Email or Mobile ------------------
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
                    <span style={{ fontSize: 14, marginBottom: 15 }}>
                      {t("forgot_password")}
                    </span>
                    <div
                      className="form-group field field-string"
                      style={{ padding: "0 10px", flex: 1 }}
                    >
                      <label
                        className="control-label"
                        style={{ fontWeight: 500, fontSize: 14 }}
                      >
                        {t("email_or_mobile")}
                      </label>
                      <Input
                        size="large"
                        placeholder={rTT(t("email_or_mobile"))}
                        onChange={(e) =>
                          this.setState({
                            emailOrMobile: e.target.value.trim(),
                          })
                        }
                      />
                    </div>
                    {/* --------------------- */}
                    <span style={{ color: "red", marginTop: 10 }}>
                      {errorSubcodeForget &&
                        getErrorMessage(parseInt(errorSubcodeForget))}
                    </span>
                    <div style={{ display: "flex", marginTop: 10 }}>
                      <Button
                        className="btn-forgot-submit"
                        text={countCoolDown > 0 ? countCoolDown : "submit"}
                        backgroundColor="rgb(230, 29, 42)"
                        borderColor="rgb(230, 29, 42)"
                        width={270}
                        loading={loadingForget}
                        onClick={() => this.sendEmailOrMobile()}
                      />
                    </div>
                  </div>
                ) : (
                  // ------------------ Confirm Password ------------------
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
                    <span style={{ fontSize: 22, marginBottom: 15 }}>
                      {t("forgot_password")}
                    </span>

                    <div
                      className="form-group field field-string"
                      style={{ padding: "0 10px", flex: 1 }}
                    >
                      <label
                        className="control-label"
                        style={{ fontWeight: 500 }}
                      >
                        {t("email_or_mobile")}
                      </label>
                      <Input
                        size="large"
                        placeholder={rTT(t("email_or_mobile"))}
                        value={this.state.username}
                        onChange={(e) => {
                          this.setState({ username: e.target.value });
                        }}
                      />
                    </div>

                    <div
                      className="form-group field field-string"
                      style={{ padding: "0 10px", flex: 1 }}
                    >
                      <label
                        className="control-label"
                        style={{ fontWeight: 500 }}
                      >
                        {t("forgot_password_1")}
                      </label>
                      <Input
                        size="large"
                        placeholder={rTT(t("forgot_password_1"))}
                        value={confirmCode}
                        onChange={(e) =>
                          this.setState({ confirmCode: e.target.value.trim() })
                        }
                      />
                    </div>

                    <div
                      className="form-group field field-string"
                      style={{ padding: "0 10px", flex: 1 }}
                    >
                      <label
                        className="control-label"
                        style={{ fontWeight: 500 }}
                      >
                        {t("forgot_password_2")}
                      </label>
                      <Input.Password
                        size="large"
                        placeholder={rTT(t("forgot_password_2"))}
                        onChange={(e) => this.checkPassword(e)}
                        value={newPassword}
                      />
                    </div>

                    <div
                      className="form-group field field-string"
                      style={{ padding: "0 10px", flex: 1 }}
                    >
                      <label
                        className="control-label"
                        style={{ fontWeight: 500 }}
                      >
                        {t("forgot_password_3")}
                      </label>
                      <Input.Password
                        size="large"
                        placeholder={rTT(t("forgot_password_3"))}
                        onChange={(e) => this.ConcheckPassword(e)}
                        value={conNewPassword}
                      />
                    </div>

                    {/* --------------------- */}
                    <span style={{ color: "red" }}>
                      {t(passNotEqual)}
                      {errorSubcodeConfirm &&
                        getErrorMessage(parseInt(errorSubcodeConfirm))}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        marginTop: 5,
                        flexDirection: "column",
                      }}
                    >
                      <Button
                        className="btn-resend-password"
                        text={
                          countCoolDown > 0 ? countCoolDown : "resend_password"
                        }
                        backgroundColor="#FFF"
                        borderColor="#a1a1a1"
                        textColor="#000"
                        width={240}
                        loading={loadingForget}
                        disabled={countCoolDown > 0 && true}
                        onClick={() =>
                          this.props.forgotPassword(this.state.emailOrMobile)
                        }
                      />

                      <Button
                        className="btn-forgot-submit"
                        text={"submit"}
                        backgroundColor="rgb(230, 29, 42)"
                        borderColor="rgb(230, 29, 42)"
                        width={240}
                        loading={loadingConfirm}
                        onClick={() => this.handleHide()}
                      />
                    </div>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.versatile.language,
  infoForgotPassword: state.password.infoForgotPassword,
  loadingForget: state.password.loadingForget,
  loadingConfirm: state.password.loadingConfirm,
  errorSubcodeForget: state.password.errorSubcodeForget,
  errorSubcodeConfirm: state.password.errorSubcodeConfirm,
  stateForget: state.password.stateForget,
  countCoolDown: state.password.countCoolDown,
  timeStart: state.password.timeStart,
});

const mapDispatchToProps = (dispatch) => ({
  forgotPassword: (targetDelivery) =>
    dispatch(PasswordActions.forgotPassword(targetDelivery)),
  confirmForgot: (userName, confirmationCode, password) =>
    dispatch(
      PasswordActions.confirmForgot(userName, confirmationCode, password)
    ),
  setStateRedux: (name, value) =>
    dispatch(PasswordActions.setStateRedux(name, value)),
  setCoolDown: () => dispatch(PasswordActions.setCoolDown()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);

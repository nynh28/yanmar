import React, { Component } from "react";
import { connect } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import SigninActions from "../../Redux/SigninRedux";
import SaveButton from "../../Components/SaveButton";
import CancelButton from "../../Components/CancelButton";
import { get } from "lodash";

const messages = {
  topic: {
    en: "Privacy and Policy",
    th: "นโยบายความเป็นส่วนตัว",
  },
  agree: {
    en: "I agree with the Terms and Conditions.",
    th: "ฉันเห็นด้วยกับข้อตกลงและเงื่อนไข",
  },
  buttonCancel: {
    en: "Cancel",
    th: "ยกเลิก",
  },
  buttonConfirm: {
    en: "Confirm",
    th: "ยืนยัน",
  },
};

class PrivacyAndPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      disabled: true,
    };
  }

  componentWillMount() {
    if (this.props.isAgreement && this.props.stateSignin) {
      this.props.history.push("/homePage");
    }
    this.props.getAgreement();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
      this.props.getAgreement();
    }
    if (prevProps.isAgreement !== this.props.isAgreement) {
      if (this.props.isAgreement && this.props.stateSignin) {
        this.props.getProfileAndMenu();
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
    if (prevProps.textAgreement !== this.props.textAgreement) {
      this.setState({ disabled: true });
      this.checkScroll();
    }
  }

  checkScroll(e) {
    let element = document.getElementById("box-text");
    let diff = Math.abs(
      Math.ceil(element.scrollTop) -
        (element.scrollHeight - element.clientHeight)
    );
    if ([0, 1].includes(diff)) {
      this.setState({ disabled: false });
    }
  }

  render() {
    let { language, textAgreement } = this.props;

    return (
      <div
        className="contrainner"
        style={{ height: "100%", minHeight: "calc(100vh - 151px)" }}
      >
        <div
          className="panel panel-default"
          style={{ height: "calc(100vh - 181px)", minHeight: "350px" }}
        >
          <div className="panel-body" style={{ height: "calc(100% - 30px)" }}>
            <h2 style={{ textAlign: "center" }}>
              {get(textAgreement, "agreementName", null)}
            </h2>
            <br />
            <div style={{ height: "calc(100% - 120px)", padding: "0px 7%" }}>
              <div
                id="box-text"
                className="scroll"
                style={{ height: "100%", padding: "0px 3%" }}
                onScroll={(e) => this.checkScroll(e.target)}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: get(textAgreement, "agreementDetail", ""),
                  }}
                />
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <Checkbox
                disabled={this.state.disabled}
                checked={this.state.checked}
                onChange={() => this.setState({ checked: !this.state.checked })}
                value="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              {messages.agree[language] || messages.agree.en}
            </div>

            <div style={{ textAlign: "center" }}>
              <CancelButton
                style={{
                  backgroundColor: "#D3D3D3",
                  width: "20%",
                  minWidth: 100,
                  maxWidth: 250,
                }}
                name={
                  messages.buttonCancel[language] || messages.buttonCancel.en
                }
                onClick={() =>
                  this.props.signout(this.props.dataLogin.redisKey)
                }
              />{" "}
              <SaveButton
                style={{
                  backgroundColor: !this.state.checked ? "#BCC3C9" : "#8F9BA6",
                  width: "20%",
                  minWidth: 100,
                  maxWidth: 250,
                }}
                disabled={!this.state.checked}
                loading={this.props.loading}
                name={
                  messages.buttonConfirm[language] || messages.buttonConfirm.en
                }
                onClick={() => {
                  this.props.putAgreement(this.state.checked);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.signin.loading,
  isAgreement: state.signin.isAgreement,
  stateSignin: state.signin.stateSignin,
  textAgreement: state.signin.textAgreement,
  dataLogin: state.signin.dataLogin,
  language: state.versatile.language,
  menuUser: state.signin.menuUser,
});

const mapDispatchToProps = (dispatch) => ({
  signout: (redisKey) => dispatch(SigninActions.signout(redisKey)),
  getAgreement: () => dispatch(SigninActions.getAgreement()),
  putAgreement: (agree) => dispatch(SigninActions.putAgreement(agree)),
  getProfileAndMenu: () => dispatch(SigninActions.getProfileAndMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyAndPolicy);

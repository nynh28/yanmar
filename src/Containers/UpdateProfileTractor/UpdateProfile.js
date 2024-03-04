import React, { Component, Suspense } from "react";
import { BoxContrainer, Button } from "../../components_new";
import { Row, Col } from "reactstrap";
import FormInput from "../../Components/FormControls/FormInput";
import FormSelect from "../../Components/FormControls/Basic/FormSelect";
import FormUpload from "../../Components/FormControls/FormUpload";
import { YM_BASE_URL } from "../../Config/app-config";
import { connect } from "react-redux";
import Alert from "../../Components/Alert";
import { t } from "../../helpers/Translation";

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: {},
      defaultLanguageNav: "",
      defaultLanguage: "",
      display_name: "",
      phone: "",
      email: "",
      line: "",
      alertSetting: {
        show: false,
        type: 3,
        content: "",
        ErrorSubcode: 0,
      },
    };
  }

  componentWillMount() {
    this.getinfo();
  }

  async getinfo() {
    try {
      var resp = await fetch(`${YM_BASE_URL}fleet/setting/Profile`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-api-key": this.props.dataLogin.redis_key,
        },
      });
      var data = await resp.json();
      this.setState({
        display_name: data.result.display_name,
        phone: data.result.phone,
        email: data.result.email,
        line: data.result.line,
        defaultLanguageNav: data.result.default_language_id,
        // defaultLanguage: data.result.default_language_id,
      });
      if (data.result.default_language_id === 1) {
        this.setState({ defaultLanguage: ('user_profile_9') });
      } else {
        this.setState({ defaultLanguage: ('user_profile_8') });
      }
    } catch (err) {}
  }

  async postuserinfo() {
    let { userinfo, defaultLanguageNav, display_name, phone, email, line } =
      this.state;
    let body = {
      display_name: display_name,
      phone: phone,
      email: email,
      line: line,
      default_language_id: defaultLanguageNav,
    };
    try {
      var resp = await fetch(`${YM_BASE_URL}fleet/setting/Profile`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-api-key": this.props.dataLogin.redis_key,
        },
        body: JSON.stringify(body),
      });
      var data = await resp.json();
      if (data?.code === 200) {
        this.setAlert(true, 1, "save");
      }
    } catch (err) {}
  }

  setAlert(isShow, type, content = "", ErrorSubcode) {
    let { alertSetting } = this.state;
    alertSetting.show = isShow;
    alertSetting.type = type;
    alertSetting.content = content;
    alertSetting.ErrorSubcode = ErrorSubcode;
    this.setState({ alertSetting });
  }
  render() {
    let {
      userinfo,
      defaultLanguageNav,
      defaultLanguage,
      display_name,
      phone,
      email,
      line,
      alertSetting,
    } = this.state;
    return (
      (
        <div>
          <Suspense fallback={null}>
            <Alert
              setting={alertSetting}
              onConfirm={() => {
                if (alertSetting.type === 1) {
                  this.props.history.push("/Tractor/homepage");
                }
              }}
              onCancel={() => {
                alertSetting.show = false;
                this.setState({ alertSetting });
              }}
            />
            <BoxContrainer title={"update_profile"}>
              {" "}
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                  style={{ display: "flex", flexDirection: "column", flex: 2 }}
                >
                  <Row>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={"schema"}
                        value={display_name}
                        label={"display_name"}
                        fieldForm={"displayName"}
                        placeholder={"display_name"}
                        flex={1}
                        onChange={(e) => {
                          this.setState({
                            display_name: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={"schema"}
                        value={phone}
                        label={"mobile"}
                        fieldForm={"mobile"}
                        placeholder={"mobile"}
                        flex={1}
                        onChange={(e) => {
                          this.setState({
                            phone: e.target.value,
                          });
                        }}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      <FormInput
                        type={"email"}
                        schema={"schema"}
                        value={email}
                        label={"email"}
                        fieldForm={"email"}
                        placeholder={"email"}
                        flex={1}
                        onChange={(e) => {
                          this.setState({
                            email: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={"schema"}
                        value={line}
                        label={"line_Id"}
                        fieldForm={"lineId"}
                        placeholder={"line_Id"}
                        flex={1}
                        onChange={(e) => {
                          this.setState({
                            line: e.target.value,
                          });
                        }}
                      />
                    </Col>
                  </Row>

                  <Row>
                    {/* <Col lg={6} md={12}>
                      <FormUpload
                        schema={{ required: [""] }}
                        fieldForm="avartar"
                        listType="picture-card"
                        label={"attachInfo"}
                        attachCode={"attachCode"}
                        attachInfo={"attachInfo"}
                        endPoint="UserManage/Files/Avatar"
                        response={(res) => {}}
                      />
                    </Col> */}
                    <Col lg={6} md={12}>
                      <FormSelect
                        mode={"single"}
                        schema={"schema"}
                        value={defaultLanguage}
                        label={"default_language"}
                        list={[
                          { key: 1, value: ('user_profile_9'), text: ('user_profile_9')},
                          { key: 2, value: ('user_profile_8'), text:  ("user_profile_8") },
                        ]}
                        fieldForm={"defaultLanguageNav"}
                        placeholder={"default_language"}
                        flex={1}
                        onChange={(selected, value) => {
                          console.log(value);
                          this.setState({
                            defaultLanguageNav: value.key,
                            defaultLanguage: value.value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <div className="hr-line-dashed" />
                  <div className="row" style={{ textAlign: "right" }}>
                    <Button
                      isCancelButton={true}
                      loading={false}
                      onClick={() => {
                        this.props.history.push("/Tractor/homepage");
                      }}
                    />
                    <Button
                      isSaveButton={true}
                      loading={this.props.loading}
                      onClick={() => {
                        this.postuserinfo();
                      }}
                    />
                  </div>
                </div>
              </div>
            </BoxContrainer>
          </Suspense>
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);

import React, { Component } from "react";
import { Row, Col, Select } from "antd";
import FormSelectSearch from "../../Components/FormControls/FormSelectSearch";
import FormInput from "../../Components/FormControls/Basic/FormInput";
import { BoxContrainer, Button } from "../../components_new";
import { connect } from "react-redux";
import { AutoComplete, Input } from "antd";
import { rTT, t } from "../../Components/Translation";
import { ENDPOINT_BASE_URL } from "../../Config/app-config";
import Alert from "../../Components/Alert";
import e from "cors";

const { Option } = Select;

class UserSettingFormnew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roleData: [],
      role: [],
      customerName: [],
      languagelist: [],
      language: [],
      languageId: "",
      ownerpartnername: "",
      email: "",
      line_Id: "",
      displayname: "",
      username: "",
      mobile: "",
      partnerId: "",
      roldId: "",
      alertSetting: {
        show: false,
        type: 1,
        content: "",
        ErrorSubcode: 0,
        validateCode: true,
      },
    };
  }

  componentWillMount() {
    // this.getroleuser();
    this.getlang();
    if (this.props.id != null) this.getuserdata();
    // if (this.state.partnerId != "") this.getroleuser();
  }
  async getuserdata() {
    let id = this.props.id;
    try {
      var response = await fetch(
        `https://api-center.onelink-iot.com/prod/user/Yanmar/${id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": this.props.header.redisKey,
          },
        }
      );
      var data = await response.json();
      this.setState({
        language: data.language,
        languageId: data.languageId,
        ownerpartnername: data.partner,
        email: data.email,
        line_Id: data.lineId,
        displayname: data.displayName,
        username: data.username,
        mobile: data.phoneNo,
        role: data.roleList[0].value,
        roldId: data.roleList[0].key,
        partnerId: data.partnerId,
      });
      if (this.state.partnerId != "") this.getroleuser();
    } catch (err) {
      return err;
    }
  }

  async getroleuser() {
    let { partnerId } = this.state;
    try {
      var response = await fetch(
        `https://api-center.onelink-iot.com/prod/user/Yanmar/Dropdown?name=ManagedRole&partnerId=` +
          partnerId,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": this.props.header.redisKey,
          },
        }
      );
      var data = await response.json();
      this.setState({ roleData: data });
    } catch (error) {
      return error;
    }
  }
  async getroleuser2(value) {
    try {
      var response = await fetch(
        `https://api-center.onelink-iot.com/prod/user/Yanmar/Dropdown?name=ManagedRole&partnerId=` +
          value,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": this.props.header.redisKey,
          },
        }
      );
      var data = await response.json();
      this.setState({ roleData: data });
    } catch (error) {
      return error;
    }
  }

  async getnameCust(value) {
    try {
      var response = await fetch(
        `https://api-center.onelink-iot.com/prod/user/Yanmar/Partner?name=` +
          value,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": this.props.header.redisKey,
          },
        }
      );
      var data = await response.json();
      this.setState({ customerName: data });
    } catch (error) {
      return error;
    }
  }

  async getlang() {
    try {
      var response = await fetch(
        ENDPOINT_BASE_URL + "user/Yanmar/Dropdown?name=Language",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": this.props.header.redisKey,
          },
        }
      );
      var data = await response.json();
      this.setState({ languagelist: data });
    } catch (error) {
      return error;
    }
  }

  async addnewUser() {
    let {
      role,
      language,
      customerName,
      email,
      line_Id,
      displayname,
      username,
      mobile,
      ownerpartnername,
      alertSetting,
    } = this.state;
    let namecus = ownerpartnername.key;

    let body = {
      username: username,
      password: username,
      displayName: displayname,
      lineId: line_Id,
      email: email,
      phoneNo: mobile,
      languageId: language,
      partnerId: namecus,
      roleId: role,
    };
    try {
      var response = await fetch(ENDPOINT_BASE_URL + "user/Yanmar", {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          "x-api-key": this.props.header.redisKey,
        },
        body: JSON.stringify(body),
      });

      let data = await response.json();

      if (data.status !== 400) {
        alertSetting.show = true;
        alertSetting.type = 1;
        this.setState({ alertSetting });
      } else if (data.status === 400) {
        alertSetting.show = true;
        alertSetting.type = 2;
        alertSetting.content = "";
        this.setState({ alertSetting });
      } else if (data.status === 500) {
        alertSetting.show = true;
        alertSetting.type = 2;
        alertSetting.content = "";
        this.setState({ alertSetting });
      } else if (data.status !== 500) {
        alertSetting.show = true;
        alertSetting.type = 1;
        alertSetting.content = "";
        this.setState({ alertSetting });
      }
    } catch (error) {
      return error;
    }
  }

  async updateuser() {
    let userId = this.props.id;
    let {
      role,
      language,
      email,
      line_Id,
      displayname,
      mobile,
      alertSetting,
      languageId,
      roldId,
    } = this.state;

    if (language) {
    }
    let body = {
      displayName: displayname,
      languageId: languageId,
      phoneNo: mobile,
      lineId: line_Id,
      roleList: [{ key: roldId }],
      email: email,
    };
    try {
      var response = await fetch(ENDPOINT_BASE_URL + "user/Yanmar/" + userId, {
        method: "PUT",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          "x-api-key": this.props.header.redisKey,
        },
        body: JSON.stringify(body),
      });

      if (response.status === 204) {
        alertSetting.show = true;
        alertSetting.type = 1;
        this.setState({ alertSetting });
      } else if (response.status === 400) {
        alertSetting.show = true;
        alertSetting.type = 2;
        alertSetting.content = "";
        this.setState({ alertSetting });
      }
    } catch (err) {
      return err;
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
  render() {
    let {
      roleData,
      role,
      customerName,
      languagelist,
      language,
      ownerpartnername,
      email,
      line_Id,
      displayname,
      username,
      mobile,
      alertSetting,
      roldId,
      partnerId,
    } = this.state;
    let { dataLogin, id } = this.props;
    return (
      <BoxContrainer
        title={"user_detail"}
        footer={
          <div style={{ textAlign: "right" }}>
            <Button
              isSaveButton={true}
              onClick={() => {
                if (username === "" || mobile === "") {
                  alertSetting.type = 2;
                  alertSetting.show = true;
                  if (username === "") {
                    alertSetting.content = "กรุณาใส่ชื่อผู้ใช้";
                    alertSetting.ErrorSubcode = "";
                    if (email === "" || mobile === "") {
                      alertSetting.content = "กรุณาใส่เบอร์โทรศัพท์ หรือ อีเมล";
                      alertSetting.ErrorSubcode = "";
                    }
                  }

                  this.setState({ alertSetting });
                }
                if (
                  (username != "" && displayname != "") ||
                  mobile != "" ||
                  email != ""
                ) {
                  this.props.id != null ? this.updateuser() : this.addnewUser();
                }
              }}
            />
            <Button
              isCancelButton={true}
              onClick={() => {
                this.props.history.push("/UserSetting");
              }}
            />
          </div>
        }
      >
        <Alert
          setting={alertSetting}
          onConfirm={() => {
            if (alertSetting.type === 3) {
              alertSetting.show = false;
              this.props.history.push("/UserSetting");
              this.setState({ alertSetting });
            } else if (alertSetting.type === 2) {
              alertSetting.show = false;
              alertSetting.content = "";
              this.setState({ alertSetting });
            } else if (alertSetting.type === 1) {
              alertSetting.show = false;
              this.setState({ alertSetting });
              this.props.history.push("/UserSetting");
            }
          }}
          onCancel={() => {
            alertSetting.show = false;
            this.setState({ alertSetting });
          }}
        />

        <div style={{ height: "calc(100vh-240px)" }}>
          <Row>
            <Col lg={12}>
              {this.props.id != null ? (
                <div style={{ flex: "80%", paddingLeft: "10px" }}>
                  <label className="control-label" style={{ fontWeight: 500 }}>
                    {t("owner_partner_name")}
                    {<span style={{ color: "red" }}>*</span>} :
                  </label>
                  <Input
                    style={{ width: "98%" }}
                    value={ownerpartnername}
                    disabled={true}
                  />
                </div>
              ) : (
                <div style={{ flex: "80%", paddingLeft: "10px" }}>
                  <label className="control-label" style={{ fontWeight: 500 }}>
                    {t("owner_partner_name")}
                    {<span style={{ color: "red" }}>*</span>} :
                  </label>
                  <AutoComplete
                    style={{ width: "98%" }}
                    onSearch={(value) => {
                      {
                        if (value.length >= 2) this.getnameCust(value);
                      }
                    }}
                    onSelect={(selected, option) => {
                      this.setState({
                        ownerpartnername: option !== "" ? option : "",
                        partnerId: option,
                      });
                      this.getroleuser2(option.key);
                    }}
                    disabled={this.props.id !== null ? true : false}
                  >
                    {customerName.map((item) => (
                      <Option key={item.key} value={item.value}></Option>
                    ))}
                  </AutoComplete>
                </div>
              )}
            </Col>
            <Col lg={12}>
              <FormSelectSearch
                mode={"single"}
                schema={{ required: "role" }}
                fieldForm={"role"}
                value={role}
                label={"user_level"}
                list={roleData}
                placeholder={"user_level"}
                flex={1}
                onChange={(selected) => {
                  this.setState({ role: selected });
                }}
                disabled={dataLogin.userId === id ? true : false}
              />
            </Col>
            <Col lg={12}>
              <FormInput
                mode={"single"}
                schema={{ required: "displayname" }}
                fieldForm={"displayname"}
                value={displayname}
                label={"display_name"}
                flex={1}
                placeholder={"display_name"}
                onChange={(e) => {
                  this.setState({ displayname: e.target.value });
                }}
              />
            </Col>
            <Col lg={12}>
              <FormInput
                mode={"single"}
                schema={{ required: "username" }}
                fieldForm={"username"}
                value={username}
                label={"user_19"}
                flex={1}
                placeholder={"user_19"}
                disabled={this.props.id != null ? true : false}
                onChange={(e) => {
                  this.setState({ username: e.target.value });
                }}
              />
            </Col>
            <Col lg={12}>
              <FormInput
                mode={"single"}
                schema={{ required: "" }}
                value={mobile}
                label={"mobile"}
                flex={1}
                placeholder={"mobile"}
                onChange={(e) => {
                  this.setState({ mobile: e.target.value });
                }}
                disabled={dataLogin.userId === id ? true : false}
              />
            </Col>
            <Col lg={12}>
              <FormInput
                mode={"single"}
                schema={{ required: "" }}
                value={email}
                label={"email"}
                flex={1}
                placeholder={"email"}
                onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}
                disabled={dataLogin.userId === id ? true : false}
              />
            </Col>
            <Col lg={12}>
              <FormInput
                mode={"single"}
                schema={{ required: "" }}
                value={line_Id}
                label={"line_Id"}
                flex={1}
                placeholder={"line_Id"}
                onChange={(e) => {
                  this.setState({ line_Id: e.target.value });
                }}
              />
            </Col>
            <Col lg={12}>
              <FormSelectSearch
                mode={"single"}
                schema={{ required: "language" }}
                fieldForm={"language"}
                value={language}
                label={"default_language"}
                list={languagelist}
                flex={1}
                placeholder={"default_language"}
                onChange={(selected) => {
                  this.setState({ language: selected, languageId: selected });
                }}
              />
            </Col>
          </Row>
        </div>
      </BoxContrainer>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.userSetting.userData,
  header: state.signin.header,
  id: state.user.id,
  dataLogin: state.signin.dataLogin,
});

export default connect(mapStateToProps)(UserSettingFormnew);

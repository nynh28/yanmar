import React, { Component } from "react";
import { Row, Col, Select } from "antd";
import FormSelectSearch from "../../Components/FormControls/FormSelectSearch";
import FormInput from "../../Components/FormControls/Basic/FormInput";
import UserSettingActions from "../../Redux/UserSettingRedux";
import { connect } from "react-redux";
import { BoxContrainer, Button } from "../../components_new";
import { AutoComplete } from "antd";
import { t } from "../../Components/Translation";

const { Option } = Select;

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerpartnertype: [],
      ownerpartnername: "",
      username: "",
      moblie: "",
      email: "",
      role: [],
      roleData: [],
      customerName: [],
      usernameparams: "",
    };
  }

  componentWillMount() {
    this.getroleuser();
    this.getuserdata();
  }

  async getuserdata() {
    let {
      ownerpartnertype,
      ownerpartnername,
      username,
      moblie,
      email,
      role,
      usernameparams,
    } = this.state;
    let { userData } = this.props;
    try {
      var response = await fetch(
        `https://api-center.onelink-iot.com/prod/user/Yanmar?username=` +
          username +
          `&PhoneNo=` +
          moblie +
          `&email=` +
          email +
          `&Partner=` +
          ownerpartnername +
          `&Roleid=` +
          role,
        // `?partner=` + ownerpartnername + `?role=` + role + `?email=` + email + `?phoneNo=` + moblie
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
      let all = data?.data;
      this.props.setSearch({ userData: all });
    } catch (error) {
      return error;
    }
  }

  async getroleuser() {
    try {
      var response = await fetch(
        `https://api-center.onelink-iot.com/prod/user/Yanmar/Dropdown?name=Role`,
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

  searchForm = () => {
    const {
      username,
      moblie,
      email,
      role,
      roleData,
      customerName,
      ownerpartnername,
    } = this.state;
    let data = {
      username: username,
      PhoneNo: moblie,
      email: email,
      Roleid: role,
      Partner: ownerpartnername,
    };

    let prmList = [];
    for (const key in data) {
      if (data[key] !== "") prmList.push(`${key}=${data[key]}`);
    }
    let param = prmList.join("&");
    console.log(param);
    this.props.onSearch(param);
    // const {
    //   username,
    //   moblie,
    //   email,
    //   role,
    //   roleData,
    //   customerName,
    //   ownerpartnername,
    // } = this.state;
    // const data = {
    //   username,
    //   moblie,
    //   email,
    //   role,
    //   roleData,
    //   customerName,
    //   ownerpartnername,
    // };

    // if (
    //   this.checkDataSelect(username) ||
    //   this.checkDataSelect(moblie) ||
    //   this.checkDataSelect(role) ||
    //   this.checkDataSelect(email) ||
    //   this.checkDataSelect(customerName) ||
    //   this.checkDataSelect(ownerpartnername)
    // ) {
    //   this.props.data(data);
    // } else {
    // }
  };

  checkDataSelect = (e) => {
    return true;
  };

  render() {
    let {
      ownerpartnername,
      username,
      moblie,
      email,
      role,
      roleData,
      customerName,
    } = this.state;
    let { userData } = this.props;
    return (
      <BoxContrainer
        title={"user_72"}
        footer={
          <div style={{ textAlign: "right" }}>
            {" "}
            <Button
              isSearchButton={true}
              onClick={() => {
                this.getuserdata();
                this.searchForm();
              }}
            />
          </div>
        }
      >
        <div>
          <Row>
            <Col lg={12} md={6}>
              <FormInput
                mode={"single"}
                schema={{ required: "owner_partner_name" }}
                fieldForm={"owner_partner_name"}
                value={ownerpartnername}
                label={"owner_partner_name"}
                flex={1}
                placeholder={"owner_partner_name"}
                onChange={(e) => {
                  this.setState({ ownerpartnername: e.target.value });
                }}
              />
              {/* <div style={{ flex: '80%', paddingLeft: '10px' }}>
                <label className="control-label" style={{ fontWeight: 500 }}>
                  {t("owner_partner_name")} :
                </label>

                <AutoComplete
                  style={{ width: '98%' }}
                  onSearch={(value) => {
                    if (value.length >= 2) this.getnameCust(value)
                  }}
                  onChange={(selected) => this.setState({ ownerpartnername: selected !== "" ? selected : "" })}
                >
                  {customerName.map((item) => (
                    <Option key={item.key} value={item.value}></Option>
                  ))}
                </AutoComplete>
              </div> */}
              {/* <FormSelectSearch
                mode={"single"}
                schema={{ "required": "" }}
                value={ownerpartnername}
                label={"owner_partner_name"}
                placeholder={"owner_partner_name"}
                flex={1}
                onChange={(e) => {
                  this.setState({ ownerpartnername: e.target.value })
                }}
              /> */}
            </Col>
            <Col lg={12} md={6}>
              <FormInput
                mode={"single"}
                schema={{ required: "" }}
                value={username}
                label={"username"}
                placeholder={"username"}
                flex={1}
                onChange={(e) => {
                  this.setState({ username: e.target.value });
                }}
              />
            </Col>
            <Col lg={12} md={6}>
              <FormInput
                mode={"single"}
                schema={{ required: "" }}
                value={moblie}
                label={"mobile"}
                placeholder={"mobile"}
                flex={1}
                onChange={(e) => {
                  this.setState({ moblie: e.target.value });
                }}
              />
            </Col>
            <Col lg={12} md={6}>
              <FormInput
                mode={"single"}
                schema={{ required: "" }}
                value={email}
                label={"email"}
                placeholder={"email"}
                flex={1}
                onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}
              />
            </Col>
            <Col lg={12} md={6}>
              <FormSelectSearch
                mode={"single"}
                schema={{ required: "" }}
                value={role}
                label={"role_name"}
                list={roleData}
                placeholder={"role_name"}
                flex={1}
                onChange={(selected) => {
                  this.setState({ role: selected });
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
});

const mapDispatchToProps = (dispatch) => ({
  setSearch: (name, value) =>
    dispatch(UserSettingActions.setSearch(name, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

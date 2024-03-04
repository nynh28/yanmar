import React, { Component, Suspense } from "react";
import { BoxContrainer, Button } from "../../components_new";
import { Row, Col, Select, Input } from "antd";
import { FormInput } from "../../Components/FormControls";
import { t, rTT } from "../../Components/Translation";
import VehicleActions from "../../Redux/VehicleRedux";
import { connect } from "react-redux";
import { YM_BASE_URL } from "../../Config/app-config";
import FormSelectSearch from "../../Components/FormControls/FormSelectSearch";
import Alert from "../../Components/Alert";
import { AutoComplete } from "antd";
const { Option } = Select;

class VehicleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      param: "",
      Dealer: [],
      dealer_name: "",
      vin_no: "",
      model: "",
      engine_no: "",
      alertSetting: {
        show: false,
        type: 4,
        content: "",
        messageList: [],
        ErrorSubcode: 0,
        validateCode: false,
        title: "",
      },
      dname: "",
    };
  }

  componentDidMount() {
    if (this.props.action === "edit") {
      this.getVehicle();
    }
  }

  async createVehicle() {
    const { dataLogin } = this.props;
    const { dealer_name, engine_no, vin_no, model } = this.state;

    let body = {
      vin_no: vin_no,
      engine_no: engine_no,
      model_name: model,
      dealer_id: dealer_name,
      user_id: dataLogin.user_id,
    };
    try {
      var response = await fetch(`${YM_BASE_URL}fleet/setting/Createvehicle`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-api-key": this.props.dataLogin.redis_key,
        },
        body: JSON.stringify(body),
      });
      var data = await response.json();
      if (data?.code === 200) {
        this.setAlert(true, 1);
      }
      if (data?.code === 409) {
        this.setAlert(true, 2, "ข้อมูลซ้ำ");
      }
    } catch (err) {
      return err;
    }
  }

  async getSeller(value) {
    try {
      var response = await fetch(
        `${YM_BASE_URL}fleet/setting/Dealer?dealer_name=${value}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": this.props.dataLogin.redis_key,
            "Accept-Language":
              this.props.language == "ja" ? "jp" : this.props.language,
          },
        }
      );

      var data = await response.json();
      let list = data.result.dealer_list.map((e) => ({
        key: e.dealer_id,
        value: e.dealer_name,
        text: e.dealer_name,
      }));
      this.setState({
        Dealer: list,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getVehicle() {
    const { id } = this.props;
    console.log(id);
    try {
      var response = await fetch(`${YM_BASE_URL}fleet/setting/vehicle/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-api-key": this.props.dataLogin.redis_key,
          "Accept-Language":
            this.props.language == "ja" ? "jp" : this.props.language,
        },
      });

      var data = await response.json();
      let result = data.result;
      this.setState({
        vin_no: result.vin_no,
        model: result.model_name,
        engine_no: result.engine_no,
        dname: result.dealer_name,
        dealer_name: result.dealer_id,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async editVehicle() {
    const { id, dataLogin } = this.props;
    const { dealer_name, engine_no, vin_no, model, dname } = this.state;
    let body = {
      vin_no: vin_no,
      engine_no: engine_no,
      model_name: model,
      dealer_id: dealer_name || dname,
      user_id: dataLogin.user_id,
    };
    try {
      var response = await fetch(`${YM_BASE_URL}fleet/setting/vehicle/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-api-key": this.props.dataLogin.redis_key,
          "Accept-Language":
            this.props.language == "ja" ? "jp" : this.props.language,
        },
        body: JSON.stringify(body),
      });
      var data = await response.json();
      if (data?.code === 200) {
        this.setAlert(true, 1);
      } else if ([409].includes(data?.code)) {
        this.setAlert(true, 2, "ข้อมูลซ้ำกรุณากรอกใหม");
      }
    } catch (err) {
      console.log(err);
    }
  }

  onCheckRequired() {
    let { vin_no, dealer_name } = this.state;
    let messageList = [];
    if (vin_no === "") messageList.push("โปรดระบุข้อมูลให้ครบ");
    if (dealer_name === "") messageList.push("โปรดระบุชื่อตัวแทนจำหน่าย");

    console.log(messageList);

    if (messageList.length > 0) this.setAlert(true, 4, "", messageList);
    else this.setAlert(true, 3, "save");
  }
  setAlert(show = false, type = 4, content = "", messageList = [], title = "") {
    const { alertSetting } = this.state;
    let alert = { ...alertSetting };
    alert.show = show;
    alert.type = type;
    alert.content = content;
    alert.messageList = messageList;
    alert.title = title;
    this.setState({ alertSetting: alert });
  }

  render() {
    const { Dealer, selectDealer, alertSetting, dealer_name, vin_no, dname } =
      this.state;
    const { action } = this.props;
    return (
      <Suspense fallback={null}>
        <Alert
          setting={alertSetting}
          onConfirm={() => {
            if (alertSetting.type === 3) {
              if (action === "edit") {
                this.editVehicle();
              } else if (action === "add") {
                this.createVehicle();
              }
            }
            if (alertSetting.type === 1) {
              window.location.replace("#/Tractor/vehicle");
            }
            if (alertSetting.type === 2) {
              this.setAlert(false);
            }
            if (alertSetting.type === 4) {
              this.setAlert(false);
            }
          }}
          onCancel={() => this.setAlert(false)}
        />
        <BoxContrainer
          title="vehicle_3"
          footer={
            <div className="row" style={{ textAlign: "right", marginRight: 3 }}>
              <Button
                isCancelButton={true}
                onClick={() => window.location.replace("#/Tractor/vehicle")}
              />

              <Button
                isSaveButton={true}
                onClick={() => {
                  if (action === "edit") {
                    this.setAlert(true, 3, "edit");
                  } else {
                    this.setAlert(true, 3, "save");
                  }
                  if (dname === "" || vin_no === "") {
                    this.setAlert(true, 4, "กรุกณากรอกข้อมูลให้ครบ");
                  }

                  // this.createVehicle();
                  // CreateDealer();
                }}
              />
            </div>
          }
        >
          <Row>
            <Col xs={24} lg={12}>
              <FormInput
                mode={"single"}
                schema={{ required: ["vin_no"] }}
                placeholder={"vehicle_1"}
                fieldForm="vin_no"
                label={"vehicle_1"}
                disabled={action === "edit" ? true : false}
                value={this.state.vin_no}
                onChange={(e) => {
                  this.setState({ vin_no: e.target.value });
                }}
              />
            </Col>
            <Col xs={24} lg={12}>
              <FormInput
                mode={"single"}
                schema={{ required: [""] }}
                placeholder={"my_vehicles_78"}
                label={"my_vehicles_78"}
                value={this.state.model}
                onChange={(e) => {
                  this.setState({ model: e.target.value });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={24} lg={12}>
              <FormInput
                mode={"single"}
                schema={{ required: [""] }}
                placeholder={"other_reports_143"}
                label={"other_reports_143"}
                value={this.state.engine_no}
                onChange={(e) => {
                  this.setState({ engine_no: e.target.value });
                }}
              />
            </Col>
            <Col xs={24} lg={12}>
              <div
                style={{
                  flex: "90%",
                  marginBottom: "10px",
                  marginLeft: "10px",
                }}
              >
                <label className="control-label" style={{ fontWeight: 500 }}>
                  {t("dealer")} <span className="text-danger">*</span>:
                </label>

                <AutoComplete
                  style={{ width: "99%" }}
                  value={dname}
                  placeholder={t("dealer")}
                  onSearch={(value) => {
                    if (value.length >= 3) this.getSeller(value);
                  }}
                  allowClear={true}
                  // disabled={sellerId === "" ? true : false}
                  onSelect={(value, option) => {
                    this.setState({ dealer_name: option.key });
                  }}
                  onChange={(e, value) => {
                    this.setState({ dname: value.value });
                    console.log(value);
                  }}
                >
                  {this.state.Dealer.map((item) => (
                    <Option
                      key={item.key}
                      value={item.value}
                      text={item.text}
                    ></Option>
                  ))}
                </AutoComplete>
              </div>
            </Col>
          </Row>
        </BoxContrainer>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.vehicle.id,
  action: state.vehicle.action,
  dataLogin: state.signin.dataLogin,
});

const mapDispatchToProps = (dispatch) => ({
  setIdSelectVehicle: (id, action) =>
    dispatch(VehicleActions.setIdSelectVehicle(id, action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VehicleForm);

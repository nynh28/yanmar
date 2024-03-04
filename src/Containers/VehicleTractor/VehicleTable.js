import React, { Component, useState, Suspense } from "react";
import { connect } from "react-redux";
import { Row, Col, Form } from "antd";
import { get, isEmpty } from "lodash";

import VehicleActions from "../../Redux/VehicleRedux";
import Alert from "../../Components/Alert";
import FormInput from "../../Components/FormControls/FormInput";
import FormSelectSearch from "../../Components/FormControls/FormSelectSearch";
import FormSelectGroup from "../../Components/FormControls/Basic/FormSelectGroup";
import { ENDPOINT_BASE_URL, YM_BASE_URL } from "../../Config/app-config";
import { BoxContrainer, Button } from "../../components_new";

class VehicleTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LicenseProvinceId: "-1",
      Tire: "-1",
      dealer_name: "",
      CustomerName: "",
      imei: "",
      mid: "",
      LicensePlateNo: "",
      VehicleBrandName: "",
      model_name: "",
      vin_no: "",
      ChassisNo: "",
      EngineNo: "",
      Dealer: [],
      // list
      LicenseProvinceIdList: [],
      TireList: [
        {
          key: -1,
          value: "ทั้งหมด",
        },
        {
          key: -2,
          value: "ยังไม่ระบุ",
        },
        {
          key: 0,
          value: "0",
        },
        {
          key: 2,
          value: "2",
        },
        {
          key: 4,
          value: "4",
        },
        {
          key: 6,
          value: "6",
        },
        {
          key: 10,
          value: "10",
        },
        {
          key: 14,
          value: "14",
        },
        {
          key: 18,
          value: "18",
        },
        {
          key: 22,
          value: "22",
        },
      ],
      alertSetting: {
        show: false,
        type: 3,
        content: "",
        ErrorSubcode: 0,
      },
    };
  }

  componentDidMount() {
    this.getSeller();
  }

  componentWillMount() {
    const { VehicleProvinceData } = this.props;
    let data = JSON.parse(JSON.stringify(VehicleProvinceData));
    data.unshift({ key: -1, value: "ทั้งหมด" });
    this.setState({ LicenseProvinceIdList: data });
  }

  setAlertSetting(isShow, type, content = "", ErrorSubcode) {
    let { alertSetting } = this.state;
    alertSetting.show = isShow;
    alertSetting.type = type;
    alertSetting.content = content;
    alertSetting.ErrorSubcode = ErrorSubcode;
    this.setState({ alertSetting });
  }

  async getSeller() {
    try {
      var response = await fetch(`${YM_BASE_URL}fleet/setting/Dealer`, {
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
      let list = data.result.dealer_list.map((e) => ({
        key: e.dealer_id,
        value: e.dealer_name,
      }));

      this.setState({
        Dealer: list,
      });
    } catch (error) {
      console.log(error);
    }
  }

  checkData = (e) => {
    let value = e.trim();
    if (isEmpty(value) || value.length < 3) {
      return false;
    } else {
      return true;
    }
  };

  checkDataSelect = (e) => {
    return true;
  };

  searchForm = () => {
    const {
      LicenseProvinceId,
      Tire,
      dealer_name,
      CustomerName,
      imei,
      mid,
      LicensePlateNo,
      VehicleBrandName,
      model_name,
      vin_no,
      ChassisNo,
      EngineNo,
    } = this.state;
    const data = {
      dealer_name,
      CustomerName,
      vin_no,
      ChassisNo,
      EngineNo,
      model_name,
      imei,
      mid,
    };

    if (
      this.checkDataSelect(LicenseProvinceId) ||
      this.checkDataSelect(Tire) ||
      this.checkData(dealer_name) ||
      this.checkData(CustomerName) ||
      this.checkData(imei) ||
      this.checkData(mid) ||
      this.checkData(LicensePlateNo) ||
      this.checkData(VehicleBrandName) ||
      this.checkData(model_name) ||
      this.checkData(vin_no) ||
      this.checkData(ChassisNo) ||
      this.checkData(EngineNo)
    ) {
      this.props.data(data);
    } else {
      this.setAlertSetting(true, 4, "vehicle_10");
      // Must have at least 1 field and at least 3 characters
    }
  };

  render() {
    const { header, dataLogin } = this.props;
    const {
      LicenseProvinceId,
      LicenseProvinceIdList,
      Tire,
      TireList,
      CustomerName,
      imei,
      mid,
      LicensePlateNo,
      VehicleBrandName,
      model_name,
      vin_no,
      ChassisNo,
      EngineNo,
      alertSetting,
      Dealer,
    } = this.state;
    return (
      <BoxContrainer
        footer={
          <div className="row" style={{ textAlign: "right" }}>
            <Button
              isSearchButton={true}
              onClick={() => {
                this.searchForm();
                this.getSeller();
              }}
            />
          </div>
        }
      >
        <Alert
          setting={alertSetting}
          onConfirm={() => {
            alertSetting.show = false;

            this.setState({ alertSetting });
          }}
          onCancel={() => {
            // alertSetting.show = false
            // this.setState({ alertSetting })
          }}
        />
        <Row>
          <Col lg={12} md={12}>
            <FormInput
              schema={{ required: [""] }}
              value={vin_no}
              label={"vehicle_1"}
              placeholder={"vehicle_1"}
              fieldForm={"vin_no"}
              onChange={(e) => {
                this.setState({ vin_no: e.target.value });
              }}
            />
          </Col>
          <Col lg={12} md={12}>
            <FormInput
              schema={{ required: [""] }}
              value={model_name}
              label={"my_vehicles_78"}
              placeholder={"my_vehicles_78"}
              fieldForm={"model_name"}
              onChange={(e) => {
                this.setState({ model_name: e.target.value });
              }}
            />
          </Col>
          <Col lg={12} md={12}>
            <FormSelectSearch
              schema={{ required: "" }}
              mode={"single"}
              value={this.state.dealer_name}
              label={"dealer"}
              list={Dealer}
              placeholder={"dealer"}
              flex={1}
              onChange={(e, value) => {
                this.setState({ dealer_name: value.children });
              }}
            />
          </Col>

          <Col lg={12} md={12}>
            <FormInput
              schema={{ required: [""] }}
              value={imei}
              label={"current_imei"}
              placeholder={"current_imei"}
              fieldForm={"imei"}
              onChange={(e) => {
                this.setState({ imei: e.target.value });
              }}
            />
          </Col>

          <Col lg={12} md={12}>
            <FormInput
              schema={{ required: [""] }}
              value={mid}
              label={"current_imei"}
              placeholder={"current_imei"}
              fieldForm={"mid"}
              onChange={(e) => {
                this.setState({ mid: e.target.value });
              }}
            />
          </Col>
        </Row>
      </BoxContrainer>
    );
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  VehicleProvinceData: state.dropdown.VehicleProvinceData,
});

const mapDispatchToProps = (dispatch) => ({
  setPersonalIdSelect: (personalId, action) =>
    dispatch(VehicleActions.setPersonalIdSelect(personalId, action)),
  deleteVehicle: (id) => dispatch(VehicleActions.deleteVehicle(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VehicleTable);

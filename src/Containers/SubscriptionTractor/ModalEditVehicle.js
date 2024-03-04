import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "antd";
import { Col, Row } from "reactstrap";
import { Alert, t } from "../../Components";
import { FormInput, FormLabel, FormRadio } from "../../Components/FormControls";

class ModalEditVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isIndividual: true,
      contractNo: "",
      alertSetting: {
        show: false,
        type: 4,
        content: "โปรดระบุเลขที่สัญญาไฟแนนซ์",
        messageList: [],
        ErrorSubcode: 0,
        validateCode: false,
        title: "",
      },
      payment: false,
    };
  }

  componentDidUpdate(prevProps) {
    let { defaultVehicleRegister } = this.props;
    let { model, engine_no, cashPaymentName, vin_no } = defaultVehicleRegister;

    if (prevProps.defaultVehicleRegister !== defaultVehicleRegister) {
      this.setState({
        isIndividual: defaultVehicleRegister.isIndividual,
        contractNo: defaultVehicleRegister.contractNo,
      });
    }
  }

  onCheckRequired() {
    let { isIndividual, contractNo, alertSetting, payment } = this.state;
    if (payment && contractNo === "") {
      this.setState({ alertSetting: { ...alertSetting, show: true } });
    } else {
      this.setState({ contractNo: "", isIndividual: true });
      let subInfo = { ...this.props.dataInfo.info };
      console.log(subInfo);
      subInfo.contractNo = payment ? contractNo : "";
      subInfo.cashPayment = payment;
      subInfo.cashPaymentName = payment ? "เช่าซื้อ" : "เงินสด";

      this.props.onUpdating(subInfo);
    }
  }

  closeAlert() {
    this.setState({
      alertSetting: { ...this.state.alertSetting, show: false },
    });
  }

  render() {
    const { contractNo, isIndividual, alertSetting, payment } = this.state;
    const { visible, dataInfo, vehicleData, defaultVehicleRegister } =
      this.props;
    let { model, engine_no, cashPaymentName, vin_no } = defaultVehicleRegister;

    return (
      <div>
        <Alert
          setting={alertSetting}
          onConfirm={() => {
            this.closeAlert();
          }}
          onCancel={() => this.closeAlert()}
        />

        <Modal
          title={t("subscription_64")}
          width={1000}
          visible={visible}
          okText={t("save")}
          cancelText={t("cancel")}
          onOk={() => this.onCheckRequired()}
          onCancel={() => this.props.onCancel()}
        >
          <Row>
            <Col lg={6} md={12}>
              <FormLabel value={model} label={"my_vehicles_13"} />
            </Col>

            <Col lg={6} md={12}>
              <FormLabel value={vin_no} label={"realtime_117"} />
            </Col>
          </Row>

          <Row>
            <Col lg={6} md={12}>
              <FormLabel value={engine_no} label={"subscription_42"} />
            </Col>
            <Col lg={6} md={12}>
              <FormRadio
                schema={{ required: [""] }}
                value={payment}
                label={"customer_3"}
                fieldForm={"isIndividual"}
                flex={1}
                word={["เงินสด", "เช่าซื้อ"]}
                disabled={false}
                onClick={(isIndividual) => {
                  this.setState({ payment: isIndividual });
                }}
              />
            </Col>
          </Row>
          {payment && (
            <Row>
              <Col lg={6} md={12}>
                <FormInput
                  mode={"single"}
                  schema={{ required: [""] }}
                  fieldForm=""
                  value={contractNo}
                  label={"realtime_157"}
                  disabled={false}
                  placeholder={"realtime_157"}
                  flex={3}
                  onChange={(e) =>
                    this.setState({ contractNo: e.target.value })
                  }
                />
              </Col>
            </Row>
          )}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  defaultVehicleRegister: state.subscription.defaultVehicleRegister,
  vehicleData: state.subscription.vehicleData,
});

export default connect(mapStateToProps)(ModalEditVehicle);

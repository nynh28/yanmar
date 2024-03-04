import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'antd';
import { Col, Row } from 'reactstrap'
import { Alert, t } from '../../Components'
import { FormInput, FormLabel, FormRadio } from '../../Components/FormControls'

class ModalEditVehicle extends Component {
  constructor(props) {
    super(props)
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
        title: ""
      }
    }
  }

  componentDidUpdate(prevProps) {
    let { defaultVehicleRegister } = this.props

    if (prevProps.defaultVehicleRegister !== defaultVehicleRegister) {
      this.setState({
        isIndividual: defaultVehicleRegister.isIndividual,
        contractNo: defaultVehicleRegister.contractNo
      })
    }
  }

  onCheckRequired() {
    let { isIndividual, contractNo, alertSetting } = this.state
    if (isIndividual && contractNo === "") {
      this.setState({ alertSetting: { ...alertSetting, show: true } })
    }
    else {
      this.setState({ contractNo: "", isIndividual: true })
      let subInfo = { ...this.props.dataInfo.info }
      subInfo.contractNo = isIndividual ? contractNo : ""
      subInfo.cashPayment = isIndividual
      subInfo.cashPaymentName = isIndividual ? "เช่าซื้อ" : "เงินสด"

      this.props.onUpdating(subInfo)
    }
  }

  closeAlert() {
    this.setState({ alertSetting: { ...this.state.alertSetting, show: false } })
  }

  render() {
    const { contractNo, isIndividual, alertSetting } = this.state
    const { visible, dataInfo } = this.props
    let { model, engineNo, vin } = dataInfo.info

    return (
      <div>
        <Alert
          setting={alertSetting}
          onConfirm={() => {
            this.closeAlert()
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
              <FormLabel
                value={model}
                label={"my_vehicles_13"}
              />
            </Col>

            <Col lg={6} md={12}>
              <FormLabel
                value={vin}
                label={"other_reports_15"}
              />
            </Col>
          </Row>

          <Row >
            <Col lg={6} md={12}>
              <FormLabel
                value={engineNo}
                label={"subscription_42"}
              />
            </Col>
            <Col lg={6} md={12}>
              <FormRadio
                schema={{ "required": [""] }}
                value={isIndividual}
                label={"customer_3"}
                fieldForm={"isIndividual"}
                flex={1}
                word={['เงินสด', 'เช่าซื้อ']}
                disabled={false}
                onClick={(isIndividual) => this.setState({ isIndividual })} />
            </Col>
          </Row>
          {
            isIndividual && <Row>
              <Col lg={6} md={12}>
                <FormInput
                  mode={"single"}
                  schema={{ "required": [""] }}
                  fieldForm=""
                  value={contractNo}
                  label={"realtime_157"}
                  disabled={false}
                  placeholder={"realtime_157"}
                  flex={3}
                  onChange={(e) => this.setState({ contractNo: e.target.value })}
                />
              </Col>
            </Row>
          }
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  defaultVehicleRegister: state.subscription.defaultVehicleRegister
})

export default connect(mapStateToProps)(ModalEditVehicle)
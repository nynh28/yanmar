import React, { Component } from "react";
import { connect } from "react-redux";
// import BasicData from "./Form/Fields/BasicData"
// import { setSchema } from './Form/schema.js'
import { Modal } from "antd";
import { Col, Row } from "reactstrap";
import { Alert, t, FormLoading } from "../../Components";
import {
  FormInput,
  FormLabel,
  FormSelectSearch,
  FormRadio,
  FormTextArea,
  FormDatepicker,
} from "../../Components/FormControls";
import {
  ENDPOINT_BASE_URL_YNM,
  ENDPOINT_BASE_URL,
} from "../../Config/app-config";

class MadalAddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isIndividual: true,
      taxId: "",
      prefix: "",
      firstname: "",
      lastname: "",
      phoneNo: "",
      businessType: "",
      lineId: "",
      email: "",
      officialAddress: "",
      businessTypeList: [],
      alertSetting: {
        show: false,
        type: 4,
        content: "",
        messageList: [],
        ErrorSubcode: 0,
        validateCode: false,
        title: "",
      },
    };
  }

  componentDidMount() {
    // if (this.props.action !== "view") this.getBusinesstype();
  }

  componentDidUpdate(prevProps) {
    let { language } = this.props;
    if (prevProps.language !== language) {
      this.getBusinesstype();
    }
  }

  componentWillUnmount() {
    this.clearFormData();
  }

  // async getBusinesstype() {
  //   let { header, language } = this.props
  //   try {
  //     var response = await fetch(`${ENDPOINT_BASE_URL}/ServiceContract/Yanmar/Dropdown?name=BusinessType`, {
  //       method: 'get',
  //       headers: {
  //         "Accept": 'application/json',
  //         'Content-Type': 'application/json',
  //         'x-api-key': header.redisKey,
  //         'Accept-Language': language == 'ja' ? 'jp' : language
  //       }
  //     })

  //     var data = await response.json();
  //     let list = data.map(e => ({ key: e.key, value: e.value }))
  //     this.setState({ businessTypeList: list })
  //   } catch (error) {
  //     this.setState({ businessTypeList: [] })
  //   }
  // }

  async createCustomer() {
    let { header, language } = this.props;
    let {
      prefix,
      firstname,
      lastname,
      isIndividual,
      businessType,
      taxId,
      phoneNo,
      email,
      lineId,
      officialAddress,
    } = this.state;
    try {
      this.setState({ loading: true });
      this.setAlert(false, 6);
      let body = {
        sellerid: this.props.sellerId,
        prefix: prefix,
        firstname: firstname,
        lastname: lastname,
        isIndividual: isIndividual,
        businessType: businessType,
        taxNo: taxId,
        phoneNo: phoneNo,
        email: email,
        lineId: lineId,
        address: officialAddress,
      };

      var response = await fetch(
        `${ENDPOINT_BASE_URL}ServiceContract/Yanmar/Customer`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": header.redisKey,
          },
          body: JSON.stringify(body),
        }
      );
      // console.log("createCustomer response : ", response)
      if (response.status === 200) {
        this.setAlert(true, 1, "บันทึกข้อมูลสำเร็จ");
      } else {
        // this.setAlert(true, 2, error)
      }
      this.setState({ loading: false });
    } catch (error) {
      this.setAlert(true, 2, error);
      this.setState({ loading: false });
    }
  }

  clearFormData() {
    this.setState({
      isIndividual: true,
      taxId: "",
      prefix: "",
      firstname: "",
      lastname: "",
      phoneNo: "",
      businessType: "",
      lineId: "",
      email: "",
      officialAddress: "",
    });
  }

  onCheckRequired() {
    let { taxId, firstname, businessType, email } = this.state;

    let messageList = [];
    if (taxId === "") messageList.push("โปรดระบุเลขประจำตัวผู้เสียภาษี");
    if (firstname === "") messageList.push("โปรดระบุชื่อ");
    if (businessType === "") messageList.push("โปรดเลือกประเภทธุรกิจ");
    if (
      email !== "" &&
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    )
      messageList.push("อีเมลไม่ถูกต้อง โปรดระบุอีกครั้ง");

    if (messageList.length > 0) this.setAlert(true, 4, "", messageList);
    else this.setAlert(true, 3, "save");
  }

  setAlert(show = false, type = 4, content = "", messageList = [], title = "") {
    let alert = { ...this.state.alertSetting };
    alert.show = show;
    alert.type = type;
    alert.content = content;
    alert.messageList = messageList;
    alert.title = title;
    this.setState({ alertSetting: alert });
  }

  render() {
    const { visible } = this.props;
    const {
      businessTypeList,
      isIndividual,
      taxId,
      prefix,
      firstname,
      lastname,
      phoneNo,
      businessType,
      lineId,
      email,
      officialAddress,
      alertSetting,
      loading,
    } = this.state;

    return (
      <div>
        <Alert
          setting={alertSetting}
          onConfirm={() => {
            // console.log("alertSetting : ", alertSetting)
            if (alertSetting.type === 3) this.createCustomer();
            if (alertSetting.type === 4) this.setAlert(false);

            if (alertSetting.type === 1) {
              this.clearFormData();
              this.setAlert(false);
              this.props.onCancel();
            }
          }}
          onCancel={() => {
            this.clearFormData();
            this.setAlert(false);
          }}
        />

        <Modal
          title={t("subscription_70")}
          width={1000}
          visible={visible}
          okText={t("save")}
          cancelText={t("cancel")}
          onOk={() => this.onCheckRequired()}
          onCancel={() => this.props.onCancel()}
        >
          <FormLoading loading={loading} tip="กำลังบันทึก...">
            <Row>
              <Col lg={6} md={12}>
                <FormRadio
                  schema={{ required: [""] }}
                  value={isIndividual}
                  label={"customer_3"}
                  fieldForm={"isIndividual"}
                  flex={1}
                  word={["customer_133", "customer_132"]}
                  disabled={false}
                  onClick={(isIndividual) => this.setState({ isIndividual })}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormInput
                  mode={"single"}
                  schema={{ required: ["taxId"] }}
                  fieldForm="taxId"
                  value={taxId}
                  label={"customer_4"}
                  placeholder={"customer_4"}
                  maxLength={13}
                  minLength={1}
                  flex={3}
                  onChange={(e) => this.setState({ taxId: e.target.value })}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={2} md={12}>
                <FormInput
                  mode={"single"}
                  schema={{ required: [""] }}
                  value={prefix}
                  label={"driver_33"}
                  placeholder="driver_33"
                  onChange={(e) => this.setState({ prefix: e.target.value })}
                />
              </Col>
              <Col lg={4} md={12}>
                <FormInput
                  mode={"single"}
                  schema={{ required: ["firstname"] }}
                  fieldForm="firstname"
                  value={firstname}
                  label={"driver_34"}
                  placeholder="driver_34"
                  onChange={(e) => this.setState({ firstname: e.target.value })}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormInput
                  mode={"single"}
                  schema={{ required: [""] }}
                  value={lastname}
                  placeholder="driver_35"
                  label={"driver_35"}
                  onChange={(e) => this.setState({ lastname: e.target.value })}
                />
              </Col>
            </Row>
            <Row>
              {/* <Col lg={6} md={12}>
                <FormSelectSearch
                  mode={"single"}
                  schema={{ required: ["businessType"] }}
                  fieldForm="businessType"
                  value={businessType}
                  list={businessTypeList}
                  label={"customer_47"}
                  placeholder="customer_47"
                  onChange={(value) =>
                    this.setState({
                      businessType: value !== undefined ? value : "",
                    })
                  }
                />
              </Col> */}
              <Col lg={6} md={12}>
                <FormInput
                  mode={"single"}
                  schema={{ required: [""] }}
                  value={phoneNo}
                  maxLength={10}
                  minLength={1}
                  placeholder={"customer_33"}
                  label={"customer_33"}
                  onChange={(e) => this.setState({ phoneNo: e.target.value })}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={12}>
                <FormInput
                  mode={"single"}
                  schema={{ required: [""] }}
                  value={lineId}
                  placeholder={"customer_15"}
                  label={"customer_15"}
                  onChange={(e) => this.setState({ lineId: e.target.value })}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormInput
                  mode={"single"}
                  schema={{ required: [""] }}
                  value={email}
                  placeholder={"customer_14"}
                  label={"customer_14"}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={24}>
                <FormTextArea
                  mode={"single"}
                  schema={{ required: [""] }}
                  value={officialAddress}
                  placeholder={"customer_36"}
                  label={"customer_36"}
                  onChange={(e) =>
                    this.setState({ officialAddress: e.target.value })
                  }
                />
              </Col>
            </Row>
          </FormLoading>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  header: state.signin.header,
  language: state.versatile.language,
  action: state.subscription.action,
});

export default connect(mapStateToProps)(MadalAddCustomer);

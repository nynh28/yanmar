import React, { Component } from "react";
import { connect } from "react-redux";
// import BasicData from "./Form/Fields/BasicData"
// import { setSchema } from './Form/schema.js'
import { Modal, Row, Col } from "antd";
import Table from "../../Components/DataGridView/Table";
import { t } from "../../Components";
import {
  ENDPOINT_BASE_URL_YNM,
  ENDPOINT_BASE_URL,
  YM_BASE_URL,
} from "../../Config/app-config";
import FormSelect from "../../Components/FormControls/Basic/FormSelect";
import { FormInput } from "../../Components/FormControls";
import { Button } from "../../components_new";
import { Alert } from "../../Components";

class ModalDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedName: "",
      param: "",
      value: "",
      vehicleData: {},
      selectedId: "",
      alertSetting: {
        show: false,
        type: 4,
        content: "",
        messageList: [],
        ErrorSubcode: 0,
        validateCode: false,
        title: "",
      },
      method: "",
    };
    this.vehicle = [];
    this.selectId = [];
  }

  async deletecustomer() {
    let { id, dataLogin, language, contractid } = this.props;
    // let { param } = this.state;
    let methodId = parseInt(this.state.method);
    let body = {
      contract_item_id: contractid,
      method: methodId,
    };
    try {
      var resp = await fetch(
        `${YM_BASE_URL}fleet/setting/Registration/Delete`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": dataLogin.redis_key,
            "Accept-Language": language,
          },
          body: JSON.stringify(body),
        }
      );
      var data = await resp.json();
      if (data.message === 200) {
        window.location.replace("#/Tractor/subscription");
      }
    } catch (err) {
      return err;
    }
  }

  setAlert(show = false, type = 4, content = "", messageList = [], title = "") {
    let { alertSetting } = this.state;
    let alert = { ...alertSetting };
    alert.show = show;
    alert.type = type;
    alert.content = content;
    alert.messageList = messageList;
    alert.title = title;
    this.setState({ alertSetting: alert });
  }

  render(props) {
    const { visible, selected, id } = this.props;
    const { selectedName, value, vehicleData, selectedId, alertSetting } =
      this.state;
    return (
      <div>
        <Alert
          setting={alertSetting}
          onConfirm={() => {
            if (alertSetting.type === 3) {
              this.deletecustomer();
              this.setAlert(false);
            }
          }}
          onCancel={() => this.setAlert(false)}
        />
        <Modal
          width={500}
          visible={visible}
          okText={t("save")}
          cancelText={t("cancel")}
          onOk={
            () => {
              this.setAlert(true, 3, "delete");
            }
            // this.props.onClick(this.vehicle, this.selectId)
          }
          onCancel={() => this.props.onCancel()}
        >
          <div
            style={{
              justifyItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2 style={{ textAlign: "center" }}>{t("subscription_101")}</h2>
            <FormSelect
              mode={"single"}
              schema={{ required: [""] }}
              fieldForm=""
              value={this.state.method}
              list={[
                {
                  key: 1,
                  text: "ลงทะเบียนผิดพลาด",
                },
                {
                  key: 2,
                  text: "ลูกค้าขอยกเลิกสัญญา",
                },
              ]}
              label={"subscription_100"}
              placeholder={"subscription_100"}
              onChange={(value, e) => {
                this.setState({ method: value });
              }}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  language: state.versatile.language,
  id: state.subscription.id,
  contractid: state.subscription.contractid,
});

export default connect(mapStateToProps)(ModalDelete);

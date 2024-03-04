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

class ModalAddcar extends Component {
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
    };
    this.vehicle = [];
    this.selectId = [];
  }

  async getVehicle(param) {
    let { id, dataLogin, language } = this.props;
    // let { param } = this.state;
    try {
      var resp = await fetch(
        `${YM_BASE_URL}fleet/setting/Registration/Vehicle?dealer_id=${id}&limit=100000&${param}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": dataLogin.redis_key,
            "Accept-Language": language,
          },
        }
      );
      var data = await resp.json();
      this.setState({ vehicleData: data.result.vehicle_list });
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
              this.setAlert(false);
              this.props.onClick(this.vehicle, this.selectId);
            }
          }}
          onCancel={() => this.setAlert(false)}
        />
        <Modal
          title={t("subscription_63")}
          width={1000}
          visible={visible}
          okText={t("save")}
          cancelText={t("cancel")}
          onOk={
            () => {
              this.setAlert(true, 3, "save");
            }
            // this.props.onClick(this.vehicle, this.selectId)
          }
          onCancel={() => this.props.onCancel()}
        >
          <Row>
            <Col xs={6} lg={6}>
              <FormSelect
                mode={"single"}
                schema={{ required: [""] }}
                fieldForm=""
                value={selectedName}
                label={selectedName}
                list={[
                  { key: 1, value: "Model name", text: "Model name" },
                  { key: 2, value: "Vin", text: "Vin" },
                ]}
                // placeholder={"subscription_27"}
                onChange={(value, e) => {
                  // setCustomerId(value !== undefined ? value : "");
                  // getCustomerinfo(e.key);
                  this.setState({ selectedName: value, selectedId: e.key });
                }}
                style={{ width: "50%" }}
              />
            </Col>

            <Col xs={12} lg={12}>
              <FormInput
                schema={{ required: [""] }}
                value={value}
                style={{ width: "50%" }}
                onChange={(e) => {
                  this.setState({ value: e.target.value });
                }}
              />
            </Col>
            <Col>
              <br />
              <Button
                isSearchButton={true}
                onClick={(e) => {
                  let lst = [],
                    param = "";
                  if (selectedId == 1) lst.push("model_name=" + value);
                  if (selectedId == 2) lst.push("vin_no=" + value);
                  this.getVehicle(lst);
                }}
              />
            </Col>
          </Row>
          <Table
            mode={"offline"}
            // serversideSource={`${ENDPOINT_BASE_URL}ServiceContract/Yanmar/Vehicle/${
            //   this.props.sellerId
            // }${
            //   selected.length > 0
            //     ? `?SelectedId=${JSON.stringify(selected)}`
            //     : ""
            // }`}
            dataSource={vehicleData}
            // author={idToken}
            xAPIKey={this.props.header.redisKey}
            // user_id={userId}
            table_id={4}
            showSetting={false}
            editing={{
              enabled: false,
              allowUpdating: false,
              allowDeleting: false,
            }}
            autoExpandAll={false}
            selectedCallback={(e) => {
              // this.selectId = `?SelectedId=${e.selectedRowKeys}`
              this.vehicle = e.selectedRowsData;
            }}
            // tableKey={"subscriberId"}
            // columnCount="subscriberNo"
            column={[
              {
                column_name: "model",
                column_caption: "รุ่นรถ",
              },
              {
                column_name: "vin_no",
                column_caption: "เลขรถ",
              },
              {
                column_name: "engine_no",
                column_caption: "เลขเครื่อง",
              },
              {
                column_name: "MID",
                column_caption: "MID",
              },
            ]}
          ></Table>
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
});

export default connect(mapStateToProps)(ModalAddcar);

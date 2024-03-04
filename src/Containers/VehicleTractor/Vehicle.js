import React, { Component, useState, Suspense } from "react";
import { connect } from "react-redux";
import { Row, Col, AutoComplete } from "antd";
import { get } from "lodash";
import Alert from "../../Components/Alert";
import DataGridView from "../../Components/DataGridView";

import Table from "../../Components/DataGridView/TableTractor";
import Test from "../../Components/DataGridView/Table";

import "moment/locale/th";
import VehicleActions from "../../Redux/VehicleRedux";
import RealtimeActions from "../../Redux/RealtimeRedux";
import FormSelect from "../../Components/FormControls/Basic/FormSelect";
// import axios from 'axios'
import FormInput from "../../Components/FormControls/FormInput";
import {
  Checkbox,
  Button as ButtonAntd,
  Select,
  Row as RowAntd,
  Col as ColAntd,
  Input as InputAntd,
} from "antd";
import { ENDPOINT_BASE_URL, YM_BASE_URL, adminRoleId } from "../../Config/app-config";
import { BoxContrainer, Button } from "../../components_new";
import { t } from "../../helpers/Translation";
import "./Vehicle.css";
const { Option } = Select;

const getOrderDay = (rowData) => {
  return new Date(rowData.OrderDate).getDay();
};

class vehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleList: [],
      loading: false,
      img: null,
      titleFormType: "",
      modal: false,
      setModal: false,
      // userData: null,
      events: [],
      isRenderFirst: false,
      isSelectEvent: false,
      isRenderImage: false,
      arrImg: [],
      course: 0,
      deferred: true,
      dealerId: null,
      selectData: null,
      dataSearch: "",

      tableLoaded: false,
      alertSetting1: {
        show: false,
        type: 3,
        content: "",
        ErrorSubcode: 0,
      },
      alertSetting: {
        show: false,
        type: 4,
        content: "",
        messageList: [],
        ErrorSubcode: 0,
        validateCode: false,
        title: "",
      },
      vehicleData: [],
      model_name: "",
      vin_no: "",
      dealer_name: undefined,
      imei: "",
      mid: "",
      Dealer: [],
      dealer_id: "",
    };

    this.dataGrid = React.createRef();
  }
  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: "after",
      widget: "dxButton",
      options: {
        icon: "dx-icon icon-font-size-increase-2-512-01",
        onClick: DataGridView.zoom.zoomChange.bind(this, "gridVehicle"),
        onload: DataGridView.zoom.setDefaultZoom(),
      },
    });
  }

  initialCallback(datagridInstance) {
    // console.log(datagridInstance)
    this.datagridInstance = datagridInstance;
    this.setState({ tableLoaded: true });
  }

  // componentDidMount() {
  //   this.getSeller();
  // }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.typeForm !== this.props.typeForm) {
      if (this.props.typeForm !== null) {
      }
    }
  }

  _vehicle = (value) => {
    this.setAlert(true, 6);
    this.setState({ dataSearch: value });

    setTimeout(() => this.setAlert(false, 6), 1000);
  };

  editCallback(e) {
    console.log(e);
    let id = e.data.id;
    this.props.setIdSelectVehicle(id, "edit");
    this.props.history.push("/Tractor/vehicle/vehicleForm");
  }

  async deleteVehicle(id) {
    try {
      var response = await fetch(`${YM_BASE_URL}fleet/setting/vehicle/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-api-key": this.props.dataLogin.redis_key,
          "Accept-Language":
            this.props.language == "ja" ? "jp" : this.props.language,
        },
      });
      var data = await response.json();
      if (data?.code === 200) {
        this.setAlert(true, 1);
        this.setState({ dataSearch: "" });
      }
    } catch (err) {}
  }

  async getVehicle() {
    let { dataSearch, model_name, vin_no, imei, mid, dealer_name } = this.state;
    console.log(dealer_name);
    var Dname;
    if (dealer_name === undefined) {
      Dname = "";
    } else {
      Dname = dealer_name.value;
    }
    try {
      var resp = await fetch(
        YM_BASE_URL +
          "fleet/setting/Vehicle?dealer_name=" +
          Dname +
          "&model_name=" +
          model_name +
          "&vin_no=" +
          vin_no +
          "&imei=" +
          imei +
          "&mid=" +
          mid +
          "&limit=10000000",
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

      var data = await resp.json();
      if (data?.code === 200) {
        if (data.result.vehicle_list == undefined) {
          this.setState({ vehicleData: [] });
        } else {
          this.setState({
            vehicleData: data.result.vehicle_list,
          });
        }
      }
    } catch (err) {
      return err;
    }
  }

  deleteCallback(e) {
    let id = get(e, "data.id");
    this.deleteVehicle(id);
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

  checkVisible(e) {
    let visible = true;
    if (e.row.data.can_edit != true) visible = false;
    return visible;
  }

  checkdelete(e) {
    let visible = true;
    if (e.row.data.can_delete != true) visible = false;
    return visible;
  }
  editCallback(e) {
    console.log(e);
    this.props.setIdSelectVehicle(e.data.id, "edit");
    this.props.history.push("/Tractor/vehicle/vehicleForm");
  }

  render() {
    const { component: Component, dataLogin, ...rest } = this.props;

    const {
      alertSetting,
      dataSearch,
      vehicleData,
      vin_no,
      model_name,
      dealer_name,
      Dealer,
      mid,
      imei,
    } = this.state;
    const userLevel = [41, 42, 43, 44];

    let { header } = this.props;

    return (
      <Suspense fallback={null}>
        <Alert
          setting={alertSetting}
          onConfirm={() => {
            if (alertSetting.type === 1) {
              this.setAlert(false);
            } else if (alertSetting.type === 3) {
              this.setAlert(false);
              this.deleteVehicle();
            }
          }}
          onCancel={() => this.setAlert(false)}
        />
        {/* <VehicleTable data={(value) => this._vehicle(value)} />
         */}

        <BoxContrainer
          footer={
            <div className="row" style={{ textAlign: "right" }}>
              <Button
                isSearchButton={true}
                onClick={() => {
                  this.getVehicle();
                }}
              />
            </div>
          }
        >
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
                style={{ height: "32px" }}
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
            { this.props.dataLogin.role_id != 18 &&
              <>
                <Col lg={12} md={12}>
                <div style={{ flex: "90%", marginLeft: "10px" }}>
                  <label className="control-label" style={{ fontWeight: 500 }}>
                    {t("dealer")} {/* <span className="text-danger">*</span> */}:
                  </label>

                  <div>
                    {" "}
                    <AutoComplete
                      style={{ width: "99%", height: "34%" }}
                      onSearch={(value) => {
                        if (value.length >= 3) this.getSeller(value);
                      }}
                      // bordered={false}
                      allowClear={true}
                      placeholder={t("dealer")}
                      // disabled={sellerId === "" ? true : false}
                      onSelect={(value, option) => {
                        this.setState({
                          dealer_name: option,
                        });
                      }}
                      onClear={(value, option) => {
                        this.getSeller();
                        this.setState({
                          dealer_name: option,
                        });
                      }}
                    >
                      {this.state.Dealer.map((item) => (
                        <Option key={item.key} value={item.value}></Option>
                      ))}
                    </AutoComplete>
                  </div>
                </div>
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
                    label={"current_mid"}
                    placeholder={"current_mid"}
                    fieldForm={"mid"}
                    onChange={(e) => {
                      this.setState({ mid: e.target.value });
                    }}
                  />
                </Col>
              </>
            }
          </Row>
        </BoxContrainer>
        <BoxContrainer
          title="my_vehicles"
          toolbarRight={
            <>
              <Button
                size="small"
                isAddButton={true}
                onClick={() => {
                  this.props.setIdSelectVehicle(null, "add");
                  this.props.history.push("/Tractor/vehicle/vehicleForm");
                }}
              />
               {(this.props.dataLogin.role_id == adminRoleId) && <Button
                size="small"
                isAddButton={true}
                text='Import excel'
                onClick={() => {
                  // props.history.push("vehicle/import");
                  this.props.history.push("/Tractor/vehicle/import");
                }}
               />}
            </>
          }
        >
          <Row style={{ overflow: "scroll" }}>
            <Col lg="12">
              <Row>
                <Table
                  mode={"offline"}
                  // serversideSource={
                  //   YM_BASE_URL +
                  //   "fleet/setting/Vehicle?limit=100&dealer_name=" +
                  //   get(dataSearch, "dealer_name", "") +
                  //   "&model_name=" +
                  //   get(dataSearch, "model_name", "") +
                  //   "&vin_no=" +
                  //   get(dataSearch, "vin_no", "") +
                  //   "&imei=" +
                  //   get(dataSearch, "imei", "") +
                  //   "&mid=" +
                  //   get(dataSearch, "mid", "")
                  // }
                  dataSource={vehicleData}
                  searchPanel={false}
                  // author={header.idToken}
                  xAPIKey={dataLogin.redis_key}
                  // user_id={dataLogin.userId}
                  // table_id={4}
                  showSetting={false}
                  initialCallback={this.tableInitial}
                  editing={{
                    enabled: true,
                    allowUpdating: true,
                    allowDeleting: true,
                  }}
                  key={"vin_no"}
                  // searchPanel={true}
                  selectedCallback={this.selectedCallback}
                  deleteCallback={(e) => {
                    this.deleteCallback(e);
                  }}
                  editCallback={(e) => this.editCallback(e)}
                  autoExpandAll={false}
                  allowUpdating={{
                    column_name: "can_edit",
                    condition: true,
                  }}
                  allowDeleting={{
                    column_name: "can_delete",
                    condition: true,
                  }}
                  remoteOperations={false}
                  column={[
                    {
                      column_name: "vin_no",
                      column_caption: "vehicle_1",
                    },
                    {
                      column_name: "model_name",
                      column_caption: "my_vehicles_78",
                    },
                    {
                      column_name: "engine_no",
                      column_caption: "other_reports_143",
                    },
                    {
                      column_name: "customer_name",
                      column_caption: "customer_80",
                    },
                    {
                      column_name: "dealer_name",
                      column_caption: "vehicle_2",
                    },

                    {
                      column_name: "imei",
                      column_caption: "current_imei",
                    },
                    {
                      column_name: "mid",
                      column_caption: "current_mid",
                    },
                  ]}
                ></Table>
              </Row>
            </Col>
          </Row>
        </BoxContrainer>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  loading: state.vehicle.loading,
  vehicle: state.vehicle.vehicle,
  //  editStart: state.vehicle.editStart,
  // error: state.vehicle.error,
  // status: state.vehicle.status,
  //  title: state.vehicle.title,
  typeForm: state.vehicle.typeForm,
  // eventsForTruck: state.realtime.eventsForTruck,
  credentialsInfo: state.signin.credentialsInfo,
  header: state.signin.header,
  infoVehicle: state.vehicle.infoVehicle,
  infoVehicleExtension: state.vehicle.infoVehicleExtension,
  statusSubmit: state.vehicle.statusSubmit,
});

const mapDispatchToProps = (dispatch) => ({
  idSelected: (id) => dispatch(VehicleActions.idSelected(id)),
  setListVehicle: () => dispatch(VehicleActions.setListVehicle()),
  deleteVehicle: (id) => dispatch(VehicleActions.deleteVehicle(id)),

  setVehicleSuccess: () => dispatch(VehicleActions.setVehicleSuccess()),
  setVehicleStatus: (status) =>
    dispatch(VehicleActions.setVehicleStatus(status)),

  getEventDataForTruck: (vinNo) =>
    dispatch(RealtimeActions.getEventDataForTruck(vinNo)),

  getInformation: (vin_no) => dispatch(RealtimeActions.getInformation(vin_no)),

  getInfoVehicleExtension: (data) =>
    dispatch(VehicleActions.getInfoVehicleExtension(data)),
  getInfoVehicle: (data) => dispatch(VehicleActions.getInfoVehicle(data)),
  setInfoVehicle: (data) => dispatch(VehicleActions.setInfoVehicle(data)),
  setInfoVehicleExtension: (data) =>
    dispatch(VehicleActions.setInfoVehicleExtension(data)),
  setPersonalIdSelect: (personalId, action) =>
    dispatch(VehicleActions.setPersonalIdSelect(personalId, action)),
  setIdSelectVehicle: (id, action) =>
    dispatch(VehicleActions.setIdSelectVehicle(id, action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(vehicle);

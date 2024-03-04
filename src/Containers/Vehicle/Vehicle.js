import React, { Component, useState, Suspense } from "react";
import { connect } from "react-redux";
import { Row, Col, Form } from "reactstrap";
import { get } from "lodash";
// import './custom.css'
import "./Styles/animation.css";
import "./Styles/fontello-codes.css";
import "./Styles/fontello-embedded.css";
import "./Styles/fontello-ie7-codes.css";
import "./Styles/fontello-ie7.css";
import "./Styles/fontello.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "./font/fontello.eot";
import "./font/fontello.svg";
import "./font/fontello.ttf";
import "./font/fontello.woff";
import "./font/fontello.woff2";
import Alert from "../../Components/Alert";
import "devextreme-react/text-area";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import service from "./data.js";
import { t } from "../../Components/Translation";

import DataGrid, {
  ColumnChooser,
  Texts,
  GroupItem,
  FilterRow,
  HeaderFilter,
  SearchPanel,
  Grouping,
  GroupPanel,
  Paging,
  Export,
  Selection,
  MasterDetail,
  Editing,
  StringLengthRule,
  Summary,
  Scrolling,
} from "devextreme-react/data-grid";
import DataGridView from "../../Components/DataGridView";

import Table from "../../Components/DataGridView/Table";

import { Item } from "devextreme-react/form";
import "moment/locale/th";
import VehicleActions from "../../Redux/VehicleRedux";
import RealtimeActions from "../../Redux/RealtimeRedux";
// import axios from 'axios'

import PannelBox from "../../Components/PannelBox";
import {
  Checkbox,
  Button as ButtonAntd,
  Select,
  Row as RowAntd,
  Col as ColAntd,
  Input as InputAntd,
} from "antd";
import picProfile0 from "./PictureProfile/profile0.jpg";
import FormInput from "../../Components/FormControls/FormInput";
import FormSelectSearch from "../../Components/FormControls/FormSelectSearch";
import { numberWithComma } from "../../Functions/Calculation";
import { ENDPOINT_BASE_URL } from "../../Config/app-config";
import VehicleTable from "./VehicleTable";
import { BoxContrainer, Button } from "../../components_new";
const { Option } = Select;

const getOrderDay = (rowData) => {
  return new Date(rowData.OrderDate).getDay();
};

const nameList = {
  LicenseProvinceId: "ph_dlt_province",
  Tire: "tire",
  SellerName: "seller_partner",
  CustomerName: "subscription_6",
  IMEI: "current_imei",
  MID: "current_mid",
  LicensePlateNo: "tab_license",
  VehicleBrandName: "vehicle_brand",
  VehicleModelName: "my_vehicles_78",
  VinNo: "VIN",
  ChassisNo: "chassis",
  EngineNo: "my_vehicles_67",
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
      picProfile: picProfile0,
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
    };

    this.onAutoExpandAllChanged = this.onAutoExpandAllChanged.bind(this);

    this.events = service.getEvents();

    this.dataGrid = React.createRef();
    this.orderHeaderFilter = this.orderHeaderFilter.bind(this);
    this.setButton = this.setButton.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.dataGrid = React.createRef();
    this.toggle = this.toggle.bind(this);
    this.onEditingStart = this.onEditingStart.bind(this);

    this.selectViewData = this.selectViewData.bind(this);
    this.onVehicleView = this.onVehicleView.bind(this);
    // this.onInitialized = this.onInitialized.bind(this);
    // this.onRowRemoving = this.logEvent.bind(this, 'RowRemoving');
    this.onToolbarPreparing = this.onToolbarPreparing.bind(this);

    this.selectedCallback = this.selectedCallback.bind(this);
    this.initialCallback = this.initialCallback.bind(this);
    this.onRowDelete = this.onRowDelete.bind(this);
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

  componentDidMount() {
    this.getSellertype();

    // this.setState({ loading: this.props.loading })

    // console.log("loading", this.state.loading)
    // this.props.setListVehicle()
    // this.props.setVehicleSuccess()
  }

  async getSellertype() {
    try {
      var response = await fetch(
        ENDPOINT_BASE_URL`/ServiceContract/Yanmar/DropdownGroup?name=Seller`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": this.props.header.redisKey,
            "Accept-Language":
              this.props.language == "ja" ? "jp" : this.props.language,
          },
        }
      );

      var data = await response.json();
      let list = data.map((e) => ({
        groupName: e.groupName,
        items: e.items,
        key: e.key,
        value: e.value,
      }));
    } catch (error) {}
  }

  setAlertSetting(isShow, type, content = "", ErrorSubcode) {
    let { alertSetting1 } = this.state;
    alertSetting1.show = isShow;
    alertSetting1.type = type;
    alertSetting1.content = content;
    alertSetting1.ErrorSubcode = ErrorSubcode;
    this.setState({ alertSetting1 });
  }

  handleChange(event) {
    this.setState({
      img: URL.createObjectURL(event.target.files[0]),
    });
  }

  calculateFilterExpression(value, selectedFilterOperations, target) {
    let column = this;
    if (target === "headerFilter" && value === "weekends") {
      return [[getOrderDay, "=", 0], "or", [getOrderDay, "=", 6]];
    }
    return column.defaultCalculateFilterExpression.apply(this, arguments);
  }

  orderHeaderFilter(data) {
    data.dataSource.postProcess = (results) => {
      results.push({
        text: "Weekends",
        value: "weekends",
      });
      return results;
    };
  }

  onAutoExpandAllChanged() {
    this.setState({
      autoExpandAll: !this.state.autoExpandAll,
    });
  }

  onClickAdd() {
    this.props.setPersonalIdSelect("", "Add");
    this.props.history.push("/vehicle/vehicleForm");
    this.props.setInfoVehicle(null);
    this.props.setInfoVehicleExtension(null);
  }

  setButton() {
    var currentSetting = this.dataGrid.current.instance.state();
    currentSetting.pageIndex = 7;
    // console.log(this.dataGrid.current.instance.state());
    // console.log(currentSetting);
    this.dataGrid.current.instance.state(currentSetting);
    this.dataGrid.current.instance.refresh();
  }

  showForm(isShow) {
    this.setState({ frmvehicleShow: isShow });

    if (!isShow) window.scrollTo(0, 0);
  }

  addForm() {
    this.props.setData("Add");
    this.showForm(true);
    this.setState({ titleFormType: "Add" });
    let fdi = this.state.formVehicleInfo;

    for (let d in fdi) {
      fdi[d].value = "";
    }

    let fdi2 = this.state.formPurchasinhInfo;
    for (let d in fdi2) {
      fdi2[d].value = "";
    }

    let fdi3 = this.state.formInsurance;
    for (let d in fdi3) {
      fdi3[d].value = "";
    }

    this.setState({
      formVehicleInfo: fdi,
      formPurchasinhInfo: fdi2,
      formInsurance: fdi3,
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  addFormModal() {
    this.state.modal = !this.state.modal;

    this.setState({ titleFormType: "Add" });
    let fdi = this.state.formVehicleInfo;

    for (let d in fdi) {
      fdi[d].value = "";
    }

    let fdi2 = this.state.formPurchasinhInfo;
    for (let d in fdi2) {
      fdi2[d].value = "";
    }

    let fdi3 = this.state.formInsurance;
    for (let d in fdi3) {
      fdi3[d].value = "";
    }

    this.setState({
      formVehicleInfo: fdi,
      formPurchasinhInfo: fdi2,
      formInsurance: fdi3,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.typeForm !== this.props.typeForm) {
      if (this.props.typeForm !== null) {
        // setTimeout(() => this.props.history.push("/vehicle/vehicleForm"), 200)
      }
    }
    // if (prevProps.infoVehicle !== this.props.infoVehicle) {
    //   console.log(this.props.infoVehicle)
    //   this.props.history.push("/vehicle/vehicleForm")
    // }
  }

  onRowDelete(e) {
    e.cancel = "true";
    // this.props.deleteVehicle(e.data.vehicleId)
  }

  selectViewData({ selectedRowsData }) {
    const data = selectedRowsData[0];
    // data !== undefined ? this.setEventInfo(data, true) : this.setEventInfo(data, false)
  }

  onVehicleView(e) {
    // this.props.getInformation(e.row.data.vehicleId)
    this.props.history.push("/vehicle/VehicleView");
  }

  submitDelete = () => {
    if (this.props.tmp_driver_profile) {
      confirmAlert({
        title: "Confirm to Delete",
        message: "Are you sure to do this.",
        buttons: [
          {
            label: "Yes",
            onClick: () =>
              this.props.deleteVehicle(this.props.tmp_driver_profile),
          },
          {
            label: "No",
            // onClick: () => alert('Click No')
            onClick: () => {},
          },
        ],
      });
    } else {
      alert("Please select vehicle");
    }
  };

  selectedCallback(e) {
    // console.log(e)
  }

  initialCallback(datagridInstance) {
    // console.log(datagridInstance)
    this.datagridInstance = datagridInstance;
    this.setState({ tableLoaded: true });
  }

  editCallback(e) {
    let id = get(e, "data.id");
    this.props.setPersonalIdSelect(id, "Edit");
    this.props.history.push("/vehicle/vehicleForm");
    // this.props.getInfoVehicleExtension(id)
    // this.props.getInfoVehicle(id)

    // this.props.history.push({ pathname: "/vehicle/VehicleForm", state: { id: id } })
  }

  deleteCallback(e) {
    // console.log(e)
    let id = get(e, "data.id");
    if (id) this.props.deleteVehicle(id);

    // this.props.deleteVehicle(id)
  }

  onEditingStart(e) {
    e.cancel = "true";
    this.props.history.push("/vehicle/vehicleForm");
    this.props.getInfoVehicleExtension(e.data.id);
    this.props.getInfoVehicle(e.data.id);
  }

  _vehicle = (value) => {
    this.setAlertSetting(true, 6);
    this.setState({ dataSearch: value });

    setTimeout(() => this.setAlertSetting(false, 6), 1000);
  };

  render() {
    const { component: Component, dataLogin, ...rest } = this.props;

    const { alertSetting1, dataSearch } = this.state;
    const userLevel = [41, 42, 43, 44];

    let { header } = this.props;

    return (
      <Suspense fallback={null}>
        <VehicleTable data={(value) => this._vehicle(value)} />

        <BoxContrainer title="my_vehicles">
          {/* <VehicleTable data={(value) => this._vehicle(value)} /> */}
          <Alert
            setting={alertSetting1}
            onConfirm={() => {
              alertSetting1.show = false;

              this.setState({ alertSetting1 });
            }}
            onCancel={() => {
              // alertSetting1.show = false
              // this.setState({ alertSetting1 })
            }}
          />
          <Row>
            <Col lg="12">
              <Row>
                <Table
                  mode={"api"}
                  serversideSource={
                    ENDPOINT_BASE_URL +
                    "Vehicle/Yanmar?take=1000000&SellerId=" +
                    get(dataSearch, "SellerId", "") +
                    "&Buyer=" +
                    get(dataSearch, "CustomerName", "") +
                    "&Model=" +
                    get(dataSearch, "VehicleModelName", "") +
                    "&EngineNo=" +
                    get(dataSearch, "EngineNo", "") +
                    "&VinChassis=" +
                    get(dataSearch, "VinNo", "") +
                    "&DeviceNo=" +
                    get(dataSearch, "IMEI", "")
                  }
                  // searchPanel={false}
                  author={header.idToken}
                  xAPIKey={header.redisKey}
                  user_id={dataLogin.userId}
                  table_id={4}
                  showSetting={false}
                  editing={{
                    enabled: true,
                    allowUpdating: true,
                    allowDeleting: true,
                  }}
                  searchPanel={false}
                  selectedCallback={this.selectedCallback}
                  initialCallback={this.tableInitial}
                  deleteCallback={(e) => this.deleteCallback(e)}
                  editCallback={(e) => this.editCallback(e)}
                  autoExpandAll={false}
                  columnCount="sellerId"
                  key={"id"}
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
                      column_name: "seller",
                      column_caption: "seller_partner",
                    },
                    {
                      column_name: "buyer",
                      column_caption: "customer_80",
                    },
                    {
                      column_name: "mid",
                      column_caption: "current_mid",
                    },
                    {
                      column_name: "imei",
                      column_caption: "current_imei",
                    },
                    {
                      column_name: "vin",
                      column_caption: "vinno",
                    },
                    {
                      column_name: "model",
                      column_caption: "my_vehicles_78",
                    },
                    {
                      column_name: "engineNo",
                      column_caption: "my_vehicles_67",
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
});

export default connect(mapStateToProps, mapDispatchToProps)(vehicle);

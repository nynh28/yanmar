import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import OtherReportActions from "../../Redux/OtherReportRedux";
import DropdownActions from "../../Redux/DropdownRedux";
import { Row, Col } from "antd";
import FormSelect from "../../Components/FormControls/Basic/FormSelect";
import FormSelectGroup from "../../Components/FormControls/Basic/FormSelectGroup";
import FormSelectSearch from "../../Components/FormControls/FormSelectSearch";
import DateRangePicker from "./FormControls/DateRangePicker";
import Alert from "../../Components/Alert";
import { ENDPOINT_BASE_URL_YNM2, YM_BASE_URL } from "../../Config/app-config";
import { get, isEmpty } from "lodash";
import Loading from "./Loading";
import TableVehicles from "./TableVehicles";
import { Select } from "antd";
import { BoxContrainer, Button } from "../../components_new";

const { Option } = Select;

const DropdownDealer = (arg) => {
  return (
    <Col>
      <FormSelect
        mode={"single"}
        allowClear={false}
        value={arg.selected.length == 0 ? [] : arg.selected}
        label={"dealer"}
        disabled={arg.disabled}
        list={arg.data.map((element, i) => {
          return {
            key: i,
            value: element.dealer_id,
            text: element.dealer_name,
          };
        })}
        placeholder={"dealer"}
        flex={1}
        onChange={(selected) => arg.onChange(selected)}
      />
    </Col>
  );
};

let vehicleSelected = [];
class OtherReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportId: "101",
      fleetId: [],
      listMembers: [],
      listMembersAll: [],
      startSearch: false,
      fleetIdMulti: [],
      alertSetting: {
        show: false,
        type: 2,
        content: "",
        validateCode: false,
      },
      listCustomerMulti: [],
      listFleetMulti: [],
      customer: "",
      dealer: [],
    };
    this.customer_mode = false;
    this.dealer_mode = false;
    this.admin_mode = false;
    this.selectedCallback = this.selectedCallback.bind(this);
  }

  componentWillMount() {
    let {
      detailSelected,
      masterDataTemp,
      history,
      dataLogin,
      customers,
      reportSelected,
      customerSelected,
      fleetSelected,
      fleetMulti,
      dealer_id,
    } = this.props;

    if (detailSelected !== "") history.push("/OtherReportNew/Detail");
    else if (masterDataTemp !== null) history.push("/OtherReportNew/Summary");
    vehicleSelected = [];
    const userLevelAdmin = [1, 2, 11, 12, 21, 22];

    if (dataLogin.userLevelId === 32) this.dealer_mode = true;
    else if (userLevelAdmin.includes(dataLogin.userLevelId))
      this.admin_mode = true;
    else this.customer_mode = true;
    vehicleSelected = [];
    if (this.customer_mode) {
      let obj = {
        user_id: this.props.dataLogin.userId,
      };

      this.props.vehiclesData.length == 0 && this.props.getVehiclesMulti(obj);
      this.props.fleets.length == 0 &&
        this.props.getFleet(this.props.dataLogin.userId);
    } else {
      customers.length == 0 && this.props.getCustomer(dataLogin.userId);
    }
    // reportMenu.length == 0 ? this.props.getReportMenu(dataLogin.userId) : this.props.setReportMenu(reportMenu)
    // if(reportSelected)this.setState({ customerId: "" + defaultCustomerId })
    let obj = {};
    if (reportSelected != "") obj.reportId = reportSelected;
    if (customerSelected != "")
      obj.customerId = Array.isArray(customerSelected)
        ? customerSelected.map((e) => "" + e)
        : "" + customerSelected;
    if (fleetSelected != "") obj.fleetId = fleetSelected;
    if (fleetMulti.length > 0) obj.fleetIdMulti = fleetMulti;
    if (!isEmpty(obj)) this.setState(obj);

    this.loadCustomer();
    this.getalldata();
    this.getvehicleid((dealer_id = "all"));
  }

  componentDidUpdate(prevProps) {
    let { reportMenu, fleets, customers } = this.props;
    if (prevProps.reportMenu !== reportMenu) this.setDefaultReportMenu();
    if (prevProps.fleets !== fleets) this.setDefaultFleets();
    if (prevProps.customers !== customers) this.setDefaultCustomers();
  }
  async getalldata() {
    try {
      var response = await fetch(YM_BASE_URL + "fleet/getV", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: this.props.dataLogin.userId,
        }),
      });
      var data = await response.json();
      if (data?.code === 200) {
        let dealerList = data?.result;
        dealerList.unshift({
          dealer_id: 0,
          dealer_name: "my_vehicles_92",
        });
        this.props.setStateOtherReport({
          dealerData: dealerList,
          selectDealer: 0,
        });
      } else this.props.setStateOtherReport({ dealerData: [] });
    } catch (error) {
      this.props.setStateOtherReport({ dealerData: [] });
    }
  }

  setDefault() {
    this.setDefaultReportMenu();
    this.setDefaultFleets();
    this.setDefaultCustomers();
  }

  setListMemberAll(listMembers) {
    let listMembersAll = [],
      number = 0;

    listMembers.map((member, index) => {
      if (this.checkDupName(listMembersAll, member.engine_no)) {
        listMembersAll.push({
          id: member.id + "_" + index + "_" + number + "_n1",
          value: member.engine_no,
        });
        number++;
      }
      if (this.checkDupName(listMembersAll, member.model)) {
        listMembersAll.push({
          id: member.id + "_" + index + "_" + number + "_n2",
          value: member.model,
        });
        number++;
      }
      if (this.checkDupName(listMembersAll, member.vin_no)) {
        listMembersAll.push({
          id: member.id + "_" + index + "_" + number + "_n3",
          value: member.vin_no,
        });
        number++;
      }
    });

    if (listMembers.length > 0) {
      this.setState({
        listMembers,
        listMembersAll,
        vin_no: [listMembers[0].id],
      });
      //this.props.setValue("", [listMembers[0].id])
    } else {
      this.setState({ listMembers, listMembersAll, vin_no: [] });
      // this.props.setValue("vin_no", "")
    }

    // this.props.setValue("listMembers", listMembers)
    // this.props.setValue("listMembersAll", listMembersAll)
  }

  checkDupName(listMembersAll, name) {
    let index = listMembersAll.findIndex((x) => x.value === name);
    return index > 0 ? false : true;
  }
  loadCustomer = async () => {
    const { customers } = this.props;
    let obj = { userId: this.props.dataLogin.userId };

    if (isEmpty(customers)) {
      var response = await fetch(YM_BASE_URL + "fleet/get_manage_customer", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      var data = await response.json();
      let list = data.map((e) => ({ key: e.id, value: e.customer_name }));

      this.props.setCustomerOtherReport(list);
      this.setState({ listCustomerMulti: list });
    } else {
      this.setState({ listCustomerMulti: customers });
    }
  };

  setDefaultReportMenu() {
    let { reportSelected } = this.props;
    if (reportSelected === "") {
      this.props.setStateReduxOtherReport({ reportSelected: 101 });
      this.props.setStateReduxOtherReport({ reportId: 101 });
    }
    // if (reportMenu.length > 0) {
    //   let defaultReportId = ""
    //   if (this.props.reportSelected != "") defaultReportId = this.props.reportSelected
    //   else defaultReportId = reportMenu[0].items[0].key

    //   this.setState({ reportId: defaultReportId })
    //   this.props.setReportSelected(defaultReportId)
    // }
  }

  setDefaultCustomers() {
    let { customers } = this.props;
    if (customers.length > 0) {
      let defaultCustomerId = "";
      if (this.props.customerSelected != "")
        defaultCustomerId = this.props.customerSelected;
      else defaultCustomerId = customers[0].key;
      this.setState({ customerId: "" + defaultCustomerId });
      this.props.setCustomerSelected(defaultCustomerId);
    }
  }

  setDefaultFleets() {
    let { fleets } = this.props;
    if (fleets.length > 0) {
      let defaultFleetId = "";
      if (this.props.fleetSelected != "")
        defaultFleetId = "" + this.props.fleetSelected;
      else defaultFleetId = "" + fleets[0].key;
      this.setState({ fleetId: defaultFleetId });
      this.props.setFleetSelected(defaultFleetId);
      // this.props.getVehicles(this.props.dataLogin.userId, fleets[0].key)
    }
  }

  selectedCallback(e) {
    this.props.setVehicleSelected(e.selectedRowsData);
  }

  createReport() {
    if (vehicleSelected.length == 0) {
      this.setAlertSetting(true, "other_reports_60");
      return;
    }
    this.props.setVehicleSelected(vehicleSelected);
    this.props.history.push("/OtherReportNew/Summary");
  }

  onApplyEvent(dataObject) {
    this.props.setDateRang(
      dataObject.startDate.format("YYYY/MM/DD"),
      dataObject.endDate.format("YYYY/MM/DD")
    );
  }

  getVehicleInfo(vid) {
    let { listMembers } = this.state;
    let obj = listMembers.find((x) => x.id === parseInt(vid));
    return obj;
  }
  async getvehicleid(dealer_id) {
    let dealer = "";
    if (dealer_id === 0) {
      dealer = "all";
    } else {
      dealer = dealer_id;
    }
    let body = {
      user_id: this.props.dataLogin.userId,
      dealer_id,
    };
    try {
      var response = await fetch(
        YM_BASE_URL + `fleet/Yanmar/getVehicleByDealer`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Accept-Language": this.props.language,
          },
          body: JSON.stringify(body),
        }
      );

      var data = await response.json();
      let { by_chassis_no_and_engine_no, model_list, by_model_code } =
        data.result[0];

      let model = [],
        chassisNo = [],
        engineNo = [];
      by_chassis_no_and_engine_no.forEach((item) => {
        chassisNo.push({ id: item.vid, value: item.chassis_no });
        engineNo.push({ id: item.vid, value: item.engine_no });
      });
      model_list.forEach((item) => {
        model.push({ id: item, value: item });
      });
      this.props.setStateOtherReport({
        modelList: model,
        chassisNoList: chassisNo,
        engineNoList: engineNo,
        byModelCode: by_model_code,
      });
    } catch (error) {
      console.log(error);
    }
  }
  selectEventDevice(select) {
    let text = "" + select;
    let selectSp = text.split("_");
    let selectID = "";

    let vehicleInfo = this.getvehicleid(select);
    let vinNo = get(vehicleInfo, "vid", "");
    let engine_no =
      showName == "เลขเครื่อง" ? get(vehicleInfo, "engine_no", "") : "";
    let chassis_no =
      showName == "เลขตัวรถ" ? get(vehicleInfo, "vin_no", "") : "";
    let model = showName == "รุ่นรถ" ? get(vehicleInfo, "model", "") : "";

    let showName = this.state.showName;
    if (selectSp.length > 1) {
      selectID = selectSp[0];
      selectSp[3] === "1"
        ? (showName = "รุ่นรถ")
        : selectSp[3] === "2"
        ? (showName = "เลขตัวรถ")
        : selectSp[3] === "3"
        ? (showName = "เลขเครื่อง")
        : (showName = "");
    } else {
      selectID = select;
    }

    this.setState({
      vin_no: [parseInt(selectID)],
      vinNo,
      model,
      engine_no,

      startSearch: false,
    });
    //this.props.setValue("vin_no", [parseInt(selectID)])
  }

  convertDate(date) {
    var start_date = date;
    var start_date_y = start_date.split("/")[0];
    var start_date_m = start_date.split("/")[1];
    var start_date_d = start_date.split("/")[2];

    return start_date_d + "/" + start_date_m + "/" + start_date_y;
  }

  setAlertSetting(isShow, content) {
    let { alertSetting } = this.state;
    alertSetting.show = isShow;
    alertSetting.content = content;
    this.setState({ alertSetting });
  }

  getListVehicle = () => {
    let vid_list = [];
    let name = this.props.showName;
    let value = this.props.currentValue;
    if (value === "") {
      let result = this.props.chassisNoList.map((item) => item.id);
      vid_list.push(...result);
    } else if (name === "เลขเครื่อง" || name === "เลขตัวรถ") {
      vid_list.push(value);
    } else {
      let code = this.props.byModelCode.find((item) => item[value]);
      vid_list.push(...code[value]);
    }

    let obj = {
      user_id: this.props.dataLogin.userId,
      vid_list: vid_list,
    };

    this.props.getVehiclesMulti(obj);
  };

  render() {
    let { alertSetting, listMembers, listMembersAll, startSearch, vin_no } =
      this.state;
    let {
      dealerData,
      selectDealer,
      currentValue,
      showName,
      modelList,
      chassisNoList,
      engineNoList,
    } = this.props;

    return (
      <Suspense fallback={null}>
        <Alert
          setting={alertSetting}
          onConfirm={() => this.setAlertSetting(false, "")}
        />
        <Loading />
        <BoxContrainer
          footer={
            <div style={{ textAlign: "right" }}>
              <Button
                isSearchButton={true}
                onClick={() => this.getListVehicle()}
              />
            </div>
          }
        >
          <Row>
            <Col lg={12} md={12} sm={12}>
              <FormSelectSearch
                schema={{ required: "" }}
                mode={"single"}
                value={this.state.reportId}
                label={"other_reports_3"}
                list={[
                  { key: 101, value: " 101 - รายงานการใช้งานรถขุด" },
                  // {
                  //   key: 102,
                  //   value: " 102 - รายงานการเข้า/ออกพื้นที่จีโอเฟนซ์",
                  // },
                ]}
                placeholder={""}
                flex={1}
                onChange={(e, value) => {
                  this.setState({ reportId: e });
                  this.props.setStateReduxOtherReport({ reportSelected: e });
                  this.props.setStateReduxOtherReport({
                    reportName: value.children,
                  });
                }}
              />
            </Col>
            <Col lg={12} md={12} sm={12}>
              <DropdownDealer
                data={dealerData}
                selected={selectDealer}
                onChange={(selected) => {
                  this.props.setStateOtherReport({
                    selectDealer: selected,
                    currentValue: "",
                  });
                  this.getvehicleid(selected);
                }}
              />
              {/* <FormSelectGroup
              schema={{ "required": "" }}
              mode={"single"}
              value={this.state.dealerId}
              label={"other_reports_140"}
              list={this.state.dealer}
              placeholder={"dealer"}
              flex={1}
              onChange={(selected) => {
                this.setState({ dealerId: selected })
              }}
            /> */}
            </Col>
          </Row>

          <Row>
            <Col lg={12} md={12} sm={12}>
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <div id="selected-1">
                    <FormSelect
                      schema={{ required: "" }}
                      mode={"single"}
                      value={showName}
                      style={{ width: "100%" }}
                      padding="0px 0px 0px 10px"
                      showSearch={false}
                      label={showName}
                      list={[
                        { key: 1, value: "รุ่นรถ", text: "รุ่นรถ" },
                        { key: 2, value: "เลขตัวรถ", text: "เลขตัวรถ" },
                        { key: 3, value: "เลขเครื่อง", text: "เลขเครื่อง" },
                      ]}
                      placeholder={""}
                      onChange={(selected) => {
                        this.props.setStateOtherReport({
                          showName: selected,
                          currentValue: "",
                        });
                      }}
                    />
                  </div>
                  <style type="text/css">
                    {`
                           #selected-1 > .form-group > .ant-select > .ant-select-selector {
                             border-radius: 6px 0px 0px 6px !important;
                         }
                      `}
                  </style>
                </Col>

                <Col lg={12} md={12} sm={12}>
                  <div id="selected-2" style={{ margin: "25px 10px 0px 0px" }}>
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      optionFilterProp="children"
                      value={currentValue}
                      onChange={(value) =>
                        this.props.setStateOtherReport({ currentValue: value })
                      }
                      onSearch={(input) => {
                        this.setState({
                          startSearch: input !== "" ? true : false,
                        });
                      }}
                    >
                      {showName === "รุ่นรถ"
                        ? modelList.map((item) => (
                            <Option key={item.id} value={item.id}>
                              {item.value}
                            </Option>
                          ))
                        : showName === "เลขเครื่อง"
                        ? engineNoList.map((item) => (
                            <Option key={item.id} value={item.id}>
                              {item.value}
                            </Option>
                          ))
                        : showName === "เลขตัวรถ"
                        ? chassisNoList.map((item) => (
                            <Option key={item.id} value={item.id}>
                              {item.value}
                            </Option>
                          ))
                        : null}
                    </Select>
                  </div>
                  <style type="text/css">
                    {`
                    #selected-2 > .ant-select > .ant-select-selector {
                     border-radius: 0px 6px 6px 0px !important;
                   }
                `}
                  </style>
                </Col>
              </Row>
            </Col>

            <Col lg={12} md={12} xs={12}>
              <DateRangePicker />
            </Col>
          </Row>
        </BoxContrainer>

        <BoxContrainer
          title="side_menu_13"
          toolbarRight={
            <>
              <Button
                size="small"
                className="ant-btn-primary-outline"
                icon={
                  <i
                    className="far fa-file-alt"
                    style={{ width: 15, marginRight: 4 }}
                  />
                }
                text="other_reports_17"
                onClick={() => this.createReport()}
              />
            </>
          }
        >
          <div style={{ height: `calc(100vh - 482px)` }}>
            <TableVehicles
              selectedCallback={(value) => (vehicleSelected = value)}
            />
          </div>
        </BoxContrainer>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  vehiclesData: state.otherReport.vehiclesData,
  reportMenu: state.otherReport.reportMenu,
  fleets: state.otherReport.fleets,
  customers: state.otherReport.customers,
  reportSelected: state.otherReport.reportSelected,
  fleetSelected: state.otherReport.fleetSelected,
  vehicleSelected: state.otherReport.vehicleSelected,
  detailSelected: state.otherReport.detailSelected,
  masterDataTemp: state.otherReport.masterDataTemp,
  customerSelected: state.otherReport.customerSelected,
  fleetMulti: state.otherReport.fleetMulti,
  FleetListMulti: state.otherReport.FleetListMulti,
  reportId: state.otherReport.reportId,
  dealerData: state.otherReport.dealerData,
  selectDealer: state.otherReport.selectDealer,
  currentValue: state.otherReport.currentValue,
  modelList: state.otherReport.modelList,
  chassisNoList: state.otherReport.chassisNoList,
  engineNoList: state.otherReport.engineNoList,
  byModelCode: state.otherReport.byModelCode,
  showName: state.otherReport.showName,
  language: state.versatile.language,
  reportName: state.otherReport.reportName,
});

const mapDispatchToProps = (dispatch) => ({
  getDataDropdown: (optionGroup, key) =>
    dispatch(DropdownActions.getDataDropdown(optionGroup, key)),
  getVehicles: (user_id, cust_id, fleet_id) =>
    dispatch(OtherReportActions.getVehicles(user_id, cust_id, fleet_id)),
  getVehiclesMulti: (data) =>
    dispatch(OtherReportActions.getVehiclesMulti(data)),
  getReportMenu: (user_id) =>
    dispatch(OtherReportActions.getReportMenu(user_id)),
  getFleet: (user_id) => dispatch(OtherReportActions.getFleet(user_id)),
  getCustomer: (user_id) =>
    dispatch(OtherReportActions.getCustomerOtherReport(user_id)),
  setReportSelected: (reportId) =>
    dispatch(OtherReportActions.setReportSelected(reportId)),
  setCustomerSelected: (customerId) =>
    dispatch(OtherReportActions.setCustomerSelected(customerId)),
  setVehicleSelected: (vehicles) =>
    dispatch(OtherReportActions.setVehicleSelected(vehicles)),
  setFleetSelected: (fleetId) =>
    dispatch(OtherReportActions.setFleetSelected(fleetId)),
  setDateRang: (dateStart, dateEnd) =>
    dispatch(OtherReportActions.setDateRang(dateStart, dateEnd)),
  setReportMenu: (data) => dispatch(OtherReportActions.setReportMenu(data)),
  setMasterDataTemp: (data) =>
    dispatch(OtherReportActions.setMasterDataTemp(data)),
  setOverTime: (data) => dispatch(OtherReportActions.setOverTime(data)),
  setFleet: (data) => dispatch(OtherReportActions.setFleet(data)),
  setCustomerOtherReport: (data) =>
    dispatch(OtherReportActions.setCustomerOtherReport(data)),
  setFleetMulti: (fleetMulti) =>
    dispatch(OtherReportActions.setFleetMulti(fleetMulti)),
  setFleetListMulti: (FleetListMulti) =>
    dispatch(OtherReportActions.setFleetListMulti(FleetListMulti)),
  setStateReduxOtherReport: (objState) =>
    dispatch(OtherReportActions.setStateReduxOtherReport(objState)),
  setStateOtherReport: (name, value) =>
    dispatch(OtherReportActions.setStateOtherReport(name, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OtherReports);

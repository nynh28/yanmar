import React, { Component, Suspense } from "react";
import DataTable from "./DataTable.js";
import { connect } from "react-redux";
import FormSelect from "../../Components/FormControls/Basic/FormSelect";
import DrivingReportActions from "../../Redux/DrivingReportRedux";
import OtherReportActions from "../../Redux/OtherReportRedux";
import moment from "moment";
import FormDateTimePicker from "../../Components/FormControls/FormDateTimePicker";
import LaddaButton, { S, SLIDE_LEFT } from "react-ladda";
import { t } from "../../Components/Translation";
import Alert from "../../Components/Alert";
import { ENDPOINT_BASE_URL } from "../../Config/app-config";
import { extra_info } from "./PdfViewer/data.js";

class DrivingReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: [],
      fleet: [],
      start_date: moment().format("DD/MM/YYYY 00:00:00"),
      end_date: moment().format("DD/MM/YYYY 23:59:59"),
      selected_customer: [],
      selected_fleet: [],
      selected_license_plate: [],
      alertSetting: {
        show: false,
        type: 2,
        content: "",
        validateCode: false,
      },
      index: 0,
      daily_data: [],
      vehicles: [],
      loading: false,
    };
    this.selectedRow = [];
    this.selectedCallback = this.selectedCallback.bind(this);
    this.onApplyEvent = this.onApplyEvent.bind(this);
    this.onCustomerChanged = this.onCustomerChanged.bind(this);
    this.onLicensePlateChanged = this.onLicensePlateChanged.bind(this);
    this.exportsDrivingReport = this.exportsDrivingReport.bind(this);
    this.loadfleet = this.loadfleet.bind(this);
  }

  componentWillMount() {
    this.load_manage_customer();
  }

  componentDidMount() {
    const { vehicles } = this.props;
    if (vehicles && vehicles.length) {
      this.setState({
        vehicles,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { vehicles, dailyData } = nextProps;
    const { index, daily_data } = this.state;
    if (vehicles && vehicles.length && vehicles !== this.props.vehicles) {
      this.setState({
        vehicles,
      });
    }
    if (
      index &&
      dailyData &&
      daily_data[index] &&
      (this.props.dailyData !== dailyData ||
        this.props.dailyData.length !== dailyData.length) &&
      dailyData.length < daily_data.length
    ) {
      this.props.getDailyReports(daily_data[index]);
      const count = index + 1;
      this.setState({ index: count });
    }
    if (
      dailyData &&
      dailyData.length &&
      dailyData.length === daily_data.length
    ) {
      this.setState({ loading: false });
      this.props.history.push("/DrivingReport/FillInformation");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { dataLogin } = this.props;
    const { selected_customer, selected_fleet } = this.state;
    if (
      prevState.selected_customer !== selected_customer ||
      prevState.selected_fleet !== selected_fleet
    ) {
      this.props.getVehicles(
        dataLogin.userId,
        selected_customer,
        selected_fleet
      );
    }
  }

  onApplyEvent(dataObject) {
    const start_date = dataObject.startDate.format("YYYY-MM-DD HH:mm:ss");
    const end_date = dataObject.endDate.format("YYYY-MM-DD HH:mm:ss");

    this.setState({ start_date, end_date, index: [] });
  }

  async load_manage_customer() {
    const userId = this.props.dataLogin.userId;
    const api = ENDPOINT_BASE_URL + "fleet/get_customer_by_manage";
    const object = {
      userId: userId,
    };
    const response = await fetch(api, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    });
    const responseJson = await response.json();
    responseJson.length > 0 &&
      this.onCustomerChanged(responseJson[0].int_cust_id);
    this.setState({ customer: responseJson });
  }

  onCustomerChanged(e) {
    this.setState(
      {
        selected_customer: e,
        index: 0,
      },
      () => {
        this.loadfleet();
      }
    );
  }

  onLicensePlateChanged(e) {
    let vehicles = this.props.vehicles;
    if (e) vehicles = [vehicles.find((ele) => ele.id == e)];
    this.setState({
      selected_license_plate: e,
      vehicles,
      index: 0,
    });
  }

  async loadfleet() {
    const userId = this.props.dataLogin.userId;
    const _selected_customer = this.state.selected_customer;
    const object = {
      userId: userId,
      customer_id: _selected_customer,
    };
    const api = ENDPOINT_BASE_URL + "fleet/getfleet";
    const response = await fetch(api, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    });
    const responseJson = await response.json();
    // responseJson.length > 0 && this.onFleetChanged(responseJson[0].fleet_id);

    if (responseJson.length > 0) {
      this.onFleetChanged(responseJson[0].fleet_id);
      this.setState(
        {
          fleet: responseJson,
          index: 0,
        },
        () => {
          this.props.getVehicles(
            userId,
            this.state.selected_customer,
            responseJson[0].fleet_id
          );
        }
      );
    }
  }

  onFleetChanged(e) {
    this.setState({ selected_fleet: e });
  }

  selectedCallback(e) {
    this.selectedRow = e.selectedRowsData;
  }

  exportsDrivingReport() {
    const { start_date, end_date } = this.state;
    if (this.selectedRow.length == 0) {
      this.setAlertSetting(
        true,
        "daily_1"
      );
      this.props.setDailyReports();
      this.setState({ daily_data: [], index: 0 });
    } else {
      let daily_data = [];
      const data = this.selectedRow.map((e) => {
        daily_data.push({
          user_id: this.props.dataLogin.userId,
          vehicle_id: e.id,
          start_date: moment(start_date).format("YYYY-MM-DD HH:mm:ss"),
          end_date: moment(end_date).format("YYYY-MM-DD HH:mm:ss"),
        });
        return {
          info: e,
          extra_info: extra_info,
          start_date,
          end_date,
        };
      });
      this.props.setDailyReports();
      this.props.getDailyReports(daily_data[0]);
      this.setState({ daily_data, index: 1, loading: true });
      this.props.getCustDrivings(data);
    }
  }

  setAlertSetting(isShow, content) {
    let { alertSetting } = this.state;
    alertSetting.show = isShow;
    alertSetting.content = content;
    this.setState({ alertSetting });
  }

  render() {
    const { dataLogin } = this.props;
    const {
      alertSetting,
      vehicles,
      start_date,
      end_date,
      loading,
    } = this.state;
    return (
      <Suspense fallback={null}>
        <Alert
          setting={alertSetting}
          onConfirm={() => this.setAlertSetting(false, "")}
        />
        <div className="row">
          <div className="col-md-12">
            <div className="ibox">
              <div
                className="ibox-title"
                style={{ padding: "15px 10px 10px 15px" }}
              >
                <div className="row">
                  <div className="col-lg-4">
                    <h3 style={{ marginTop: 5, fontSize: 18 }}>
                      {t("driver_report_34")}
                    </h3>
                  </div>
                  <div className="col-lg-8" style={{ textAlign: "right" }}>
                    <div
                      style={{
                        display: this.state.tableLoaded == false ? "none" : "",
                      }}
                      className="col-md-12 text-right"
                    >
                      <LaddaButton
                        loading={loading}
                        type="submit"
                        data-size={S}
                        data-style={SLIDE_LEFT}
                        data-spinner-size={30}
                        data-spinner-lines={12}
                        onClick={this.exportsDrivingReport}
                        style={{
                          lineHeight: 0,
                          backgroundColor: "#1AB394",
                          width: 150,
                          height: 35,
                          color: "white",
                          fontSize: 15,
                          borderRadius: 4,
                          padding: "6px 12px",
                        }}
                      >
                        <i className="far fa-file-alt" aria-hidden="true"></i>{" "}
                        {t("other_reports_17")}
                      </LaddaButton>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ibox-content">
                <div className="form-group row" style={{ marginBottom: 4 }}>
                  <>
                    <div className="col-lg-6">
                      <FormSelect
                        mode={"single"} //mode : (single/multiple)
                        value={this.state.selected_customer} //single = "key" , multiple = [key]
                        label={"analysis_reports_14"}
                        list={this.state.customer.map((element, i) => {
                          return {
                            key: i,
                            value: element.int_cust_id,
                            text: element.customer_name,
                          };
                        })}
                        placeholder={"my_drivers_4"}
                        flex={1}
                        onChange={(selected) => {
                          this.onCustomerChanged(selected);
                        }}
                      ></FormSelect>
                    </div>

                    <div className="col-lg-6">
                      <FormSelect
                        mode={"single"} //mode : (single/multiple)
                        value={this.state.selected_fleet} //single = "key" , multiple = [key]
                        label={"my_drivers_5"}
                        list={this.state.fleet.map((element, i) => {
                          return {
                            key: i,
                            value: element.fleet_id,
                            text: element.fleet_name,
                          };
                        })}
                        placeholder={"my_drivers_6"}
                        flex={1}
                        onChange={(selected) => {
                          this.setState(
                            {
                              selected_fleet: selected,
                            },
                            () => {
                              this.props.getVehicles(
                                dataLogin.userId,
                                this.state.selected_customer,
                                selected
                              );
                              this.onFleetChanged(selected);
                            }
                          );
                        }}
                      ></FormSelect>
                    </div>

                    <div className="col-lg-6">
                      <FormSelect
                        mode={"single"} //mode : (single/multiple)
                        value={this.state.selected_license_plate} //single = "key" , multiple = [key]
                        label={"license_plate"}
                        list={
                          this.props.vehicles &&
                          this.props.vehicles.map((element, i) => {
                            return {
                              key: i,
                              value: element.id,
                              text: element.license_plate_no,
                            };
                          })
                        }
                        placeholder={"select_a_plate_no"}
                        flex={1}
                        onChange={(selected) => {
                          this.onLicensePlateChanged(selected);
                        }}
                      ></FormSelect>
                    </div>

                    <div className="col-lg-6">
                      <div
                        className="form-group field field-string"
                        style={{ padding: "0 10px", flex: 1 }}
                      >
                        <label
                          className="control-label"
                          style={{ fontWeight: 500 }}
                        >
                          {t("driver_ranking_8")} :
                        </label>
                        <FormDateTimePicker
                          startDate={start_date}
                          endDate={end_date}
                          maxDate={moment().endOf("day")}
                          select_change={this.onApplyEvent.bind(this)}
                          timePicker={true}
                        ></FormDateTimePicker>
                      </div>
                    </div>
                  </>
                </div>
              </div>

              <div style={{ marginTop: 5 }} className="panel">
                <div className="panel-body">
                  <DataTable
                    selectedCallback={this.selectedCallback}
                    lstDriverTable={vehicles}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataLogin: state.signin.dataLogin,
    vehicles: state.otherReport.vehicles,
    dailyData: state.drivingreport.dailyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCustDrivings: (data) =>
      dispatch(DrivingReportActions.getCustDrivings(data)),
    getDailyReports: (obj) =>
      dispatch(DrivingReportActions.getDailyReports(obj)),
    setDailyReports: () => dispatch(DrivingReportActions.setDailyReports()),
    getVehicles: (user_id, cust_id, fleet_id) =>
      dispatch(OtherReportActions.getVehicles(user_id, cust_id, fleet_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrivingReports);

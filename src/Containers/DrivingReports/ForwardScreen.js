import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { t } from "../../Components/Translation";
import moment from "moment";
import { Table, Input, Button } from "reactstrap";
import { extra_info } from "./PdfViewer/data.js";
import HeaderFillInfo from "./HeaderFillInfo";
import DrivingReportActions from "../../Redux/DrivingReportRedux";

class ForwardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lstCustomer: [],
      count: 0,
    };
  }

  componentDidMount() {
    const { custDriving } = this.props;
    if (custDriving) this.setState({ lstCustomer: custDriving });
  }

  componentWillReceiveProps(nextProps) {
    const { custDriving } = nextProps;
    if (custDriving != this.props.custDriving) {
      this.setState({ lstCustomer: custDriving });
    }
  }

  onClickPreviousButton = () => {
    let count = this.state.count;
    count--;
    this.setState({ count });
  };

  onClickNextButton = () => {
    let count = this.state.count;
    count++;
    this.setState({ count });
  };

  onChangeValue = (event, name) => {
    const { lstCustomer, count } = this.state;
    let data = JSON.parse(JSON.stringify(lstCustomer));
    data[count].extra_info[name] = event.target.value;
    this.setState({ lstCustomer: data });
    this.props.getCustDrivings(data);
  };

  clickClearCurrentData = () => {
    const { lstCustomer, count } = this.state;
    let data = JSON.parse(JSON.stringify(lstCustomer));
    data[count].extra_info = extra_info;
    this.setState({ lstCustomer: data });
    this.props.getCustDrivings(data);
  };

  clickClearAllData = () => {
    const { lstCustomer } = this.state;
    const data = lstCustomer.map((e) => {
      return {
        info: e,
        extra_info: extra_info,
        start_date: e.start_date,
      };
    });
    this.setState({ lstCustomer: data });
    this.props.getCustDrivings(data);
  };

  render() {
    const { lstCustomer, count } = this.state;
    const { language } = this.props;
    moment.locale(
      language,
      language == "ja"
        ? {
            monthsShort: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
          }
        : {}
    );
    let info = null;
    let extra_info = null;
    let start_date = null;
    if (lstCustomer[count]) {
      info = lstCustomer[count].info;
      extra_info = lstCustomer[count].extra_info;
      start_date = lstCustomer[count].start_date;
    }
    return (
      <Suspense fallback={null}>
        <HeaderFillInfo
          boxid={100}
          onClick={() => {
            this.props.history.push("/DrivingReport");
          }}
        />
        <div className="row">
          <div className="col-md-12">
            <div className="ibox">
              <div
                className="ibox-title"
                style={{ padding: "15px 10px 10px 15px" }}
              >
                <div className="panel-body">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 10,
                      margin: "0px 10%",
                    }}
                  >
                    <div style={{ display: "flex", flex: 1 }}>
                      {count != 0 ? (
                        <button
                          style={{ width: 120 }}
                          className="btn btn-success"
                          onClick={() => this.onClickPreviousButton()}
                        >
                          {t("previous")}
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <label style={{ fontWeight: "bold" }}>
                        {t("driver_report_41")}:
                      </label>
                      <span style={{ margin: "0px 10px 0px 5px" }}>
                        {start_date ? moment(start_date).format("ll") : "-"}
                      </span>
                      <label style={{ fontWeight: "bold" }}>
                        {t("other_reports_19")}:
                      </label>
                      <span style={{ margin: "0px 10px 0px 5px" }}>
                        {info && info.vehicle_name ? info.vehicle_name : "-"}
                      </span>
                      <label style={{ fontWeight: "bold" }}>
                        {t("license_plate")}:
                      </label>
                      <span style={{ margin: "0px 10px 0px 5px" }}>
                        {info && info.license_plate_no
                          ? info.license_plate_no
                          : "-"}
                      </span>
                      <label style={{ fontWeight: "bold" }}>
                        {t("province")}:
                      </label>
                      <span style={{ marginLeft: "5px" }}>
                        {info && info.province_name ? info.province_name : "-"}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "flex-end",
                      }}
                    >
                      {count != lstCustomer.length - 1 ? (
                        <button
                          style={{ width: 120 }}
                          className="btn btn-success"
                          onClick={() => this.onClickNextButton()}
                        >
                          {t("next")}
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: 10,
                      alignItems: "center",
                    }}
                  >
                    <Table
                      size="sm"
                      striped
                      className="table-eco"
                      style={{
                        borderColor: "white",
                        textAlign: "center",
                        width: "80%",
                        marginTop: 20,
                      }}
                    >
                      <thead>
                        <tr style={{ backgroundColor: "#bcc4c1" }}>
                          <th colSpan="2">{t("driver_report_18")}</th>
                          <th colSpan="2">{t("driver_report_19")}</th>
                          <th colSpan="2">{t("driver_report_20")}</th>
                          <th colSpan="2">{t("driver_report_21")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{t("driver_ranking_5")}</td>
                          <td>
                            <Input
                              type="text"
                              value={extra_info ? extra_info.row1col1 : ""}
                              onChange={(event) =>
                                this.onChangeValue(event, "row1col1")
                              }
                            />
                          </td>
                          <td>{t("driver_ranking_5")}</td>
                          <td>
                            <Input
                              type="text"
                              value={extra_info ? extra_info.row1col2 : ""}
                              onChange={(event) =>
                                this.onChangeValue(event, "row1col2")
                              }
                            />
                          </td>
                          <td>{t("driver_report_22")}</td>
                          <td>
                            <Input
                              type="text"
                              value={extra_info ? extra_info.row1col3 : ""}
                              onChange={(event) =>
                                this.onChangeValue(event, "row1col3")
                              }
                            />
                          </td>
                          <td>{t("driver_report_23")}</td>
                          <td>
                            <Input
                              type="text"
                              value={extra_info ? extra_info.row1col4 : ""}
                              onChange={(event) =>
                                this.onChangeValue(event, "row1col4")
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>{t("subscription_5")}</td>
                          <td>
                            <Input
                              type="text"
                              value={extra_info ? extra_info.row2col1 : ""}
                              onChange={(event) =>
                                this.onChangeValue(event, "row2col1")
                              }
                            />
                          </td>
                          <td>{t("subscription_5")}</td>
                          <td>
                            <Input
                              type="text"
                              value={extra_info ? extra_info.row2col2 : ""}
                              onChange={(event) =>
                                this.onChangeValue(event, "row2col2")
                              }
                            />
                          </td>
                          <td>{t("driver_report_24")}</td>
                          <td>
                            <Input
                              type="text"
                              value={extra_info ? extra_info.row2col3 : ""}
                              onChange={(event) =>
                                this.onChangeValue(event, "row2col3")
                              }
                            />
                          </td>
                          <td>{t("driver_report_25")}</td>
                          <td>
                            <Input
                              type="text"
                              value={extra_info ? extra_info.row2col4 : ""}
                              onChange={(event) =>
                                this.onChangeValue(event, "row2col4")
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>{t("other")}</td>
                          <td>
                            <Input
                              type="text"
                              value={extra_info ? extra_info.row3col1 : ""}
                              onChange={(event) =>
                                this.onChangeValue(event, "row3col1")
                              }
                            />
                          </td>
                          <td>{t("other")}</td>
                          <td>
                            <Input
                              type="text"
                              value={extra_info ? extra_info.row3col2 : ""}
                              onChange={(event) =>
                                this.onChangeValue(event, "row3col2")
                              }
                            />
                          </td>
                          <td>{t("other")}</td>
                          <td>
                            <Input
                              type="text"
                              value={extra_info ? extra_info.row3col3 : ""}
                              onChange={(event) =>
                                this.onChangeValue(event, "row3col3")
                              }
                            />
                          </td>
                          <td>{t("other")}</td>
                          <td>
                            <Input
                              type="text"
                              value={extra_info ? extra_info.row3col4 : ""}
                              onChange={(event) =>
                                this.onChangeValue(event, "row3col4")
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>{t("total")}</td>
                          <td>
                            <Input
                              type="text"
                              value={extra_info ? extra_info.row4col1 : ""}
                              onChange={(event) =>
                                this.onChangeValue(event, "row4col1")
                              }
                            />
                          </td>
                          <td>{t("total")}</td>
                          <td>
                            <Input
                              type="text"
                              value={extra_info ? extra_info.row4col2 : ""}
                              onChange={(event) =>
                                this.onChangeValue(event, "row4col2")
                              }
                            />
                          </td>
                          <td>{t("total")}</td>
                          <td>
                            <Input
                              type="text"
                              value={extra_info ? extra_info.row4col3 : ""}
                              onChange={(event) =>
                                this.onChangeValue(event, "row4col3")
                              }
                            />
                          </td>
                          <td>{t("total")}</td>
                          <td>
                            <Input
                              type="text"
                              value={extra_info ? extra_info.row4col4 : ""}
                              onChange={(event) =>
                                this.onChangeValue(event, "row4col4")
                              }
                            />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      padding: 10,
                      marginRight: "10%",
                    }}
                  >
                    <button
                      style={{ width: 120 }}
                      className="btn btn-success"
                      onClick={() => this.clickClearCurrentData()}
                    >
                      {t("dismiss")}
                    </button>
                    <button
                      style={{ margin: "0px 15px", width: 120 }}
                      className="btn btn-success"
                      onClick={() => this.clickClearAllData()}
                    >
                      {t("dismiss_all")}
                    </button>
                    <Button
                      style={{
                        backgroundColor: "#1AB394",
                        color: "white",
                        width: 120,
                      }}
                      onClick={() =>
                        window.open("/#/DrivingReport/PdfViewer", "_blank")
                      }
                    >
                      {t("submit")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  custDriving: state.drivingreport.custDriving,
  language: state.versatile.language,
});

const mapDispatchToProps = (dispatch) => ({
  getCustDrivings: (data) =>
    dispatch(DrivingReportActions.getCustDrivings(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForwardScreen);

import React, { Component } from "react";
import { connect } from "react-redux";
import { t } from "../../../Components/Translation";
import { Table } from "reactstrap";
import "./driver.css";
import DriverHeaderReport from "./DriverHeaderReport";
import moment from "moment";
import "./driver.css";

class BackPageDriverReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyTrips: [],
    };
  }

  componentDidMount() {
    const { trips, page } = this.props;
    let dailyTrips = [];
    if (trips && trips.length == 40) {
      dailyTrips.push(...trips);
    } else if (trips && trips.length) {
      dailyTrips.push(...trips);
      const data = Array(40 - trips.length + 1)
        .fill()
        .map((_, idx) => {
          return { no: 40 * page + trips.length + idx + 1 };
        });
      dailyTrips.push(...data);
    } else {
      const data = Array(40)
        .fill()
        .map((_, idx) => {
          return { no: idx + 1 };
        });
      dailyTrips.push(...data);
    }
    this.setState({ dailyTrips });
  }

  render() {
    const { dailyTrips } = this.state;
    const { dataSource, dailyData } = this.props;
    return (
      <div
        className="a4-portrait-with-diver-other-report printreport"
        style={{ padding: 10 }}
      >
        <DriverHeaderReport
          infoData={dailyData && dailyData.info}
          dataSource={dataSource}
        />
        <div style={{ border: "1px solid #fd3c32", margin: "10px 0px" }} />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "5px 10px 10px",
              flex: 2.5,
            }}
          >
            <Table
              size="sm"
              striped
              className="table-eco"
              style={{
                borderColor: "white",
                textAlign: "center",
                marginBottom: 0,
              }}
            >
              <thead style={{ fontSize: 10 }}>
                <tr id="driver-comment" style={{ backgroundColor: "#bcc4c1" }}>
                  <th colSpan="2" style={{ padding: 4 }}>
                    {t("driver_report_18")}
                  </th>
                  <th colSpan="2" style={{ padding: 4 }}>
                    {t("driver_report_19")}
                  </th>
                  <th colSpan="2" style={{ padding: 4 }}>
                    {t("driver_report_20")}
                  </th>
                  <th colSpan="2" style={{ padding: 4 }}>
                    {t("driver_report_21")}
                  </th>
                </tr>
              </thead>
              <tbody style={{ fontSize: 8 }}>
                <tr>
                  <td style={{ padding: 4 }}>{t("driver_ranking_5")}</td>
                  <td style={{ padding: 4 }}>
                    {dataSource && dataSource.extra_info.row1col1}
                  </td>
                  <td style={{ padding: 4 }}>{t("driver_ranking_5")}</td>
                  <td style={{ padding: 4 }}>
                    {dataSource && dataSource.extra_info.row1col2}
                  </td>
                  <td style={{ padding: 4 }}>{t("driver_report_22")}</td>
                  <td style={{ padding: 4 }}>
                    {dataSource && dataSource.extra_info.row1col3}
                  </td>
                  <td style={{ padding: 4 }}>{t("driver_report_23")}</td>
                  <td style={{ padding: 4 }}>
                    {dataSource && dataSource.extra_info.row1col4}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: 4 }}>{t("subscription_5")}</td>
                  <td style={{ padding: 4 }}>
                    {dataSource && dataSource.extra_info.row2col1}
                  </td>
                  <td style={{ padding: 4 }}>{t("subscription_5")}</td>
                  <td style={{ padding: 4 }}>
                    {dataSource && dataSource.extra_info.row2col2}
                  </td>
                  <td style={{ padding: 4 }}>{t("driver_report_24")}</td>
                  <td style={{ padding: 4 }}>
                    {dataSource && dataSource.extra_info.row2col3}
                  </td>
                  <td style={{ padding: 4 }}>{t("driver_report_25")}</td>
                  <td style={{ padding: 4 }}>
                    {dataSource && dataSource.extra_info.row2col4}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: 4 }}>{t("other")}</td>
                  <td style={{ padding: 4 }}>
                    {dataSource && dataSource.extra_info.row3col1}
                  </td>
                  <td style={{ padding: 4 }}>{t("other")}</td>
                  <td style={{ padding: 4 }}>
                    {dataSource && dataSource.extra_info.row3col2}
                  </td>
                  <td style={{ padding: 4 }}>{t("other")}</td>
                  <td style={{ padding: 4 }}>
                    {dataSource && dataSource.extra_info.row3col3}
                  </td>
                  <td style={{ padding: 4 }}>{t("other")}</td>
                  <td style={{ padding: 4 }}>
                    {dataSource && dataSource.extra_info.row3col4}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: 4 }}>{t("total")}</td>
                  <td style={{ padding: 4 }}>
                    {dataSource && dataSource.extra_info.row4col1}
                  </td>
                  <td style={{ padding: 4 }}>{t("total")}</td>
                  <td style={{ padding: 4 }}>
                    {dataSource && dataSource.extra_info.row4col2}
                  </td>
                  <td style={{ padding: 4 }}>{t("total")}</td>
                  <td style={{ padding: 4 }}>
                    {dataSource && dataSource.extra_info.row4col3}
                  </td>
                  <td style={{ padding: 4 }}>{t("total")}</td>
                  <td style={{ padding: 4 }}>
                    {dataSource && dataSource.extra_info.row4col4}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "5px 10px 10px",
              flex: 0.5,
            }}
          >
            <div
              style={{
                border: "1px solid #8c8e8c",
                borderWidth: "1px",
                display: "flex",
                height: "100%",
              }}
            >
              <h6
                id="driver-comment"
                style={{
                  borderBottom: "1px solid #8c8e8c",
                  height: 25,
                  padding: 4,
                  width: "100%",
                  backgroundColor: "#bcc4c1",
                  marginBottom: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {t("driver_control")}
              </h6>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: 10,
              flex: 1,
              alignItems: "center",
            }}
          >
            <Table
              size="sm"
              striped
              className="table-eco"
              scroll={{
                x: "max-content",
              }}
              style={{
                borderColor: "white",
                textAlign: "center",
                marginBottom: 0,
              }}
            >
              <thead style={{ fontSize: 10 }}>
                <tr
                  id="driver-comment"
                  style={{
                    backgroundColor: "#bcc4c1",
                  }}
                >
                  <th colSpan="1" style={{ padding: 4 }}>
                    {" "}
                  </th>
                  <th colSpan="1" style={{ padding: 4 }}>
                    {t("report_back_1")}
                  </th>
                  <th colSpan="1" style={{ padding: 4 }}>
                    {t("subscription_4")}
                  </th>
                  <th colSpan="1" style={{ padding: 4 }}>
                    {t("report_back_2")}
                  </th>
                  <th colSpan="1" style={{ padding: 4 }}>
                    {t("report_back_3")}
                  </th>
                  <th colSpan="1" style={{ padding: 4 }}>
                    {t("report_back_4")}
                  </th>
                </tr>
              </thead>
              <tbody style={{ fontSize: 8 }}>
                {dailyTrips &&
                  dailyTrips.length &&
                  dailyTrips.slice(0, 20).map((element, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ padding: 4 }}>{element.no}</td>
                        <td style={{ padding: 4 }}>
                          {element.datetime &&
                            moment(element.datetime).format("HH:mm")}
                        </td>
                        <td style={{ padding: 4 }}>
                          {element.status && t(element.status)}
                        </td>
                        <td style={{ padding: 4 }}>
                          {element.place && element.place}
                        </td>
                        <td style={{ padding: 4 }}>
                          {element.distance && element.distance}
                        </td>
                        <td style={{ padding: 4 }}>
                          {element.time && element.time}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: 10,
              flex: 1,
              alignItems: "center",
            }}
          >
            <Table
              size="sm"
              striped
              className="table-eco"
              scroll={{
                x: "max-content",
              }}
              style={{
                borderColor: "white",
                textAlign: "center",
                marginBottom: 0,
              }}
            >
              <thead style={{ fontSize: 10 }}>
                <tr
                  id="driver-comment"
                  style={{
                    backgroundColor: "#bcc4c1",
                  }}
                >
                  <th colSpan="1" style={{ padding: 4 }}>
                    {" "}
                  </th>
                  <th colSpan="1" style={{ padding: 4 }}>
                    {t("report_back_1")}
                  </th>
                  <th colSpan="1" style={{ padding: 4 }}>
                    {t("subscription_4")}
                  </th>
                  <th colSpan="1" style={{ padding: 4 }}>
                    {t("report_back_2")}
                  </th>
                  <th colSpan="1" style={{ padding: 4 }}>
                    {t("report_back_3")}
                  </th>
                  <th colSpan="1" style={{ padding: 4 }}>
                    {t("report_back_4")}
                  </th>
                </tr>
              </thead>
              <tbody style={{ fontSize: 8 }}>
                {dailyTrips &&
                  dailyTrips.length &&
                  dailyTrips.slice(20, 40).map((element, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ padding: 4 }}>{element.no}</td>
                        <td style={{ padding: 4 }}>
                          {element.datetime &&
                            moment(element.datetime).format("HH:mm")}
                        </td>
                        <td style={{ padding: 4 }}>
                          {element.status && t(element.status)}
                        </td>
                        <td style={{ padding: 4 }}>
                          {element.place && element.place}
                        </td>
                        <td style={{ padding: 4 }}>
                          {element.distance && element.distance}
                        </td>
                        <td style={{ padding: 4 }}>
                          {element.time && element.time}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BackPageDriverReport);

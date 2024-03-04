import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import Images from "../../../Themes/Images";
import { t } from "../../../Components/Translation";
import moment from "moment";

const styled = { display: "flex", flexDirection: "row", marginBottom: 2 };
class DriverHeaderReport extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
    const { infoData, dataSource } = this.props;

    let start_date = "";
    let end_date = "";
    if (infoData) {
      const summary = infoData.summary;
      if (summary && summary.trip_start)
        start_date = moment(summary.trip_start).format("lll");
      if (summary && summary.trip_end)
        end_date = moment(summary.trip_end).format("lll");
    }

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "10px 5px 0px 5px",
        }}
      >
        <div style={{ display: "flex" }}>
          <div>
            <h2 id="time-trip" style={{ fontWeight: 500 }}>
              {t("driver_report_34")}
            </h2>
            <h5 id="time-trip" style={{ fontSize: 8, marginBottom: 6 }}>
              {t("driver_report_3")}
            </h5>
            <h6 id="time-trip" style={{ fontSize: 8 }}>
              {start_date + " - " + end_date}
            </h6>
          </div>
          <div
            style={{
              paddingLeft: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <div style={styled}>
              <h6 style={{ marginRight: 5 }}>{t("driver_ranking_5")}:</h6>
              <h6 style={{ fontWeight: "bold" }}>
                {infoData && infoData.company_name
                  ? infoData.company_name
                  : "-"}
              </h6>
            </div>
            <div style={styled}>
              <h6 style={{ marginRight: 5 }}>{t("realtime_6")}: </h6>
              <h6 style={{ fontWeight: "bold", marginRight: 5 }}>
                {infoData && infoData.fleet_name ? infoData.fleet_name : "-"}
              </h6>
            </div>
            <div style={styled}>
              <h6 style={{ marginRight: 5 }}>{t("license_plate")}:</h6>
              <h6 style={{ fontWeight: "bold" }}>
                {infoData && infoData.licenseplate
                  ? infoData.licenseplate
                  : "-"}
              </h6>
              <h6 style={{ marginLeft: 10, marginRight: 5 }}>
                {t("ph_vehicle_name")}:
              </h6>
              <h6 style={{ fontWeight: "bold" }}>
                {dataSource && dataSource.info.vehicle_name
                  ? dataSource.info.vehicle_name
                  : "-"}
              </h6>
              <h6 style={{ marginLeft: 10, marginRight: 5 }}>
                {t("driver_report_32")}:
              </h6>
              <h6 style={{ fontWeight: "bold" }}>
                {infoData && infoData.vin ? infoData.vin : "-"}
              </h6>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h6 style={{ marginRight: 5 }}>{t("driver_report_33")}: </h6>
              <h6 style={{ fontWeight: "bold" }}>
                {infoData && infoData.driver_name ? infoData.driver_name : "-"}
              </h6>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <img
            src={Images.logoTopLeft3}
            style={{ width: "auto", height: 45, cursor: "pointer" }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.versatile.language,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DriverHeaderReport);

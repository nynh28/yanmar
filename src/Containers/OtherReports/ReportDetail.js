import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import OtherReportActions from "../../Redux/OtherReportRedux";
import Table from "../../Components/DataGridView/Table.js";
import PannelBox from "../../Components/PannelBox";
import { t } from "../../Components/Translation";
import { getColumnDetail } from "./ColumnConfig";
import { get, isEmpty } from "lodash";
import Alert from "../../Components/Alert";
import moment from "moment";
import { calculateToDuration } from "../../Functions/DateMoment";
import { sum, max, avg, calFuelCons, nameColReport } from "./Calculation";
import { BoxContrainer, Button } from "../../components_new";

class ReportDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicle: [],
      reportId: [""],
      fleetId: [""],
      masterData: [],
      alertSetting: {
        show: true,
        type: 5,
      },
      dataDetail: [],
    };
  }

  componentWillMount() {
    let { detailData } = this.props;
    console.log("detailData : ", detailData);
    if (!isEmpty(detailData)) {
      let { alertSetting } = this.state;
      alertSetting.show = false;
      this.footerCustom = { list: this.setfooterCustom() };
      this.footerSummary = { hideCount: true, objSum: this.setFooterSummary() };
      this.setState({ dataDetail: detailData, alertSetting });
    } else {
      this.loadDetailData();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let { detailData, loadDetailStatus } = this.props;

    if (prevProps.detailData !== detailData) {
      this.footerCustom = { list: this.setfooterCustom() };
      this.footerSummary = { hideCount: true, objSum: this.setFooterSummary() };
      this.setState({ dataDetail: detailData });
    }
    if (prevProps.loadDetailStatus !== loadDetailStatus) {
      if (loadDetailStatus) this.setAlertSetting(true);
      else this.setAlertSetting(false);
    }
  }

  setfooterCustom() {
    let { reportSelected, detailData } = this.props;
    let objSum, sumFuel, sumDis;

    let array = nameColReport(reportSelected, detailData);

    return array;
  }

  setFooterSummary() {
    let { reportSelected, detailData } = this.props;
    let objSum, sumFuel, sumDis;

    nameColReport(reportSelected, detailData);

    switch (reportSelected) {
      case "101":
        sumFuel = sum(
          detailData.map((item) => item.fuel_used),
          2
        );
        // sumDis = sum(detailData.map((item) => item.distance))
        objSum = {
          speed_avg: {
            text: avg(
              detailData.map((item) => item.speed_avg),
              2
            ),
            font: { bold: true },
          },
          speed_max: {
            text: max(detailData.map((item) => item.speed_max)),
            font: { bold: true },
          },

          fuel_used: { text: sumFuel, font: { bold: true } },
          fuel_cons: {
            text: calFuelCons(sumDis, sumFuel),
            font: { bold: true },
          },
          distance: { text: sumDis, font: { bold: true } },
        };
        break;
    }

    return objSum;
  }

  setAlertSetting(isShow) {
    let { alertSetting } = this.state;
    alertSetting.show = isShow;
    this.setState({ alertSetting });
  }

  convertDate(date) {
    var start_date = date;
    var start_date_y = start_date.split("/")[0];
    var start_date_m = start_date.split("/")[1];
    var start_date_d = start_date.split("/")[2];
    return start_date_y + "-" + start_date_m + "-" + start_date_d;
  }

  //#region Load Detail
  loadDetailData() {
    let {
      reportSelected,
      dateStart,
      dateEnd,
      detailSelected,
      overtime,
      group,
    } = this.props;
    let _dateStart = dateStart;
    let _dateEnd = dateEnd;
    let body = {
      dtstart: _dateStart,
      dtstop: _dateEnd,
    };
    if (group) body.group = true;

    if (
      reportSelected == "201" ||
      reportSelected == "202" ||
      reportSelected == "203"
    )
      body.overtime = overtime * 60;

    switch (reportSelected) {
      case "101":
        this.props.getDetailData(
          body,
          "fleet/report/driving/" + detailSelected
        );
        break;
      case "102":
        this.props.getDetailData(
          body,
          "fleet/report/geofence/driving/" + detailSelected
        );
        break;
    }
  }
  //#endregion

  render() {
    let { alertSetting, dataDetail } = this.state;
    let {
      header,
      dataLogin,
      reportSelected,
      reportName,
      nameDetail,
      dateStart,
      dateEnd,
      headerDetail,
      vehicleSelected,
    } = this.props;

    console.log(vehicleSelected[0].cust_name);

    let textHeader = [
      t("export_2"),
      " : ",
      get(headerDetail, "cust_name"),
      ", ",
      t("other_reports_142"),
      " : ",
      get(headerDetail, "vin_no", "-"),
      ", ",
      t("export_4"),
      " : ",
      moment(dateStart, "YYYY/MM/DD HH:mm:ss").format("DD/MM/YYYY HH:mm"),
      " ",
      t("export_5"),
      " ",
      moment(dateEnd, "YYYY/MM/DD HH:mm:ss").format("DD/MM/YYYY HH:mm"),
    ];
    let headerCustom = {
      list: [
        {
          text: textHeader,
          merge_cell: true,
          font: { size: 12 },
          alignment: { vertical: "middle" },
          height: 30,
        },
      ],
    };
    let lstName = [],
      strName = "";
    if (get(headerDetail, "vehicleName"))
      lstName.push(get(headerDetail, "vehicleName"));
    if (get(headerDetail, "licenseplate"))
      lstName.push(get(headerDetail, "licenseplate"));
    strName = lstName.join("_");
    let exportName = [
      reportSelected,
      " - ",
      t("export_7"),
      " ",
      strName,
      " ",
      moment(dateStart, "YYYY/MM/DD HH:mm:ss").format("DD-MM-YYYY HH_mm"),
      " ",
      t("export_5"),
      " ",
      moment(dateEnd, "YYYY/MM/DD HH:mm:ss").format("DD-MM-YYYY HH_mm"),
    ];
    // console.log('exportName', exportName)
    // let exportName = reportSelected + nameDetail + moment(dateStart, "YYYY/MM/DD HH:mm:ss").format("DD-MM-YYYY HH_mm") + " to " + moment(dateEnd, "YYYY/MM/DD HH:mm:ss").format("DD-MM-YYYY HH_mm")

    return (
      <Suspense fallback={null}>
        {alertSetting.show ? (
          <Alert setting={alertSetting} />
        ) : (
          <>
            <BoxContrainer
              title={reportName}
              toolbarRight={
                <>
                  <Button
                    size="small"
                    className="ant-btn-primary-outline"
                    icon={
                      <i
                        className="fa fa-chevron-circle-left"
                        style={{ width: 15, marginRight: 4 }}
                      />
                    }
                    text="other_reports_24"
                    onClick={() => {
                      this.props.setStateReduxOtherReport({
                        detailData: [],
                        detailSelected: "",
                      });
                      this.props.history.push("/OtherReportNew/Summary");
                    }}
                  />
                </>
              }
            >
              <div style={{ height: `calc(100vh - 229px)` }}>
                <Table
                  mode={"offline"}
                  dataSource={[...dataDetail]}
                  headerCustom={headerCustom}
                  topLeftSpace={{ left: 1 }}
                  exportToPDFVisible={true}
                  height={`calc(100vh - 210px)`}
                  cookiesOptions={{
                    enable: true,
                    name: "ReportDetail_" + reportSelected,
                  }}
                  footerCustom={this.footerCustom}
                  // footerSummary={false}
                  footerSummary={{ deleteRow: true }}
                  // footerSummary={this.footerSummary}
                  author={header.idToken}
                  xAPIKey={header.redisKey}
                  table_id={6}
                  exportName={exportName}
                  user_id={dataLogin.userId}
                  showSetting={false}
                  searchPanel={true}
                  autoExpandAll={false}
                  remoteOperations={false}
                  editing={{ enabled: false }}
                  columnCount="dtstart"
                  column={getColumnDetail(reportSelected)}
                />
              </div>
            </BoxContrainer>
          </>
        )}
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  detailData: state.otherReport.detailData,
  detailSelected: state.otherReport.detailSelected,
  dateStart: state.otherReport.dateStart,
  dateEnd: state.otherReport.dateEnd,
  reportSelected: state.otherReport.reportSelected,
  reportName: state.otherReport.reportName,
  nameDetail: state.otherReport.nameDetail,
  headerDetail: state.otherReport.headerDetail,
  loadDetailStatus: state.otherReport.loadDetailStatus,
  group: state.otherReport.group,
  overtime: state.otherReport.overtime,
  vehicleSelected: state.otherReport.vehicleSelected,
});

const mapDispatchToProps = (dispatch) => ({
  getDetailData: (body, url) =>
    dispatch(OtherReportActions.getDetailData(body, url)),
  setStateReduxOtherReport: (objState) =>
    dispatch(OtherReportActions.setStateReduxOtherReport(objState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetail);

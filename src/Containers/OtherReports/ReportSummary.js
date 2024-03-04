import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import OtherReportActions from "../../Redux/OtherReportRedux";
import PannelBox from "../../Components/PannelBox";
import { Row, Col } from "antd";
import { t } from "../../Components/Translation";
import { getColumnSummary, getUrlMaster, getUrlSummary } from "./ColumnConfig";
import HeaderSummary from "./HeaderSummary";
import moment from "moment";
import { get } from "lodash";
import { ENDPOINT_BASE_URL, YM_BASE_URL } from "../../Config/app-config";
import Table from "../../Components/DataGridView/Table.js";
import DataSource from "devextreme/data/data_source";
import ArrayStore from "devextreme/data/array_store";
import TableReport402 from "./TableReport402";
import FormSelectGroup from "../../Components/FormControls/Basic/FormSelectGroup";
import FormSelect from "../../Components/FormControls/FormSelectSearch";
import { BoxContrainer, Button } from "../../components_new";
import Alert from "../../Components/Alert";

export const dataStore = new ArrayStore({ key: "vid", data: [] });
var dataSource;

const uuidv4 = require("uuid/v4");

class ReportSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertSetting: {
        show: false,
        type: 5,
      },
      vehicle: [],
      reportId: [""],
      fleetId: [""],
      masterData: [],
      ColumnConfig: [],
      total: 0,
      complete: false,
    };
    this.isFirstLoad = true;
    this.dataMaster = [];
    this.totalSuccess = 0;
    this.controller = [];
    this.controllerMaster = [];
    this.queueProgress = [];
    dataSource = new DataSource({
      store: dataStore,
      reshapeOnPush: true,
    });
  }

  componentWillMount() {
    this.setDefault();
    // this.getDataSummary()
  }

  componentWillUnmount() {
    this.cancleFetchApi(true);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { reportSelected } = this.props;

    if (nextProps.reportSelected !== reportSelected) {
      dataStore.clear();
      dataSource.reload();

      this.cancleFetchApi(false);
      setTimeout(() => this.loadData(nextProps.reportSelected), 500);

      return true;
    }
    return true;
  }

  setDefault() {
    let { reportMenu, masterDataTemp, reportSelected, percent } = this.props;
    if (reportMenu.length > 0) this.setState({ reportId: reportSelected });

    if (masterDataTemp && masterDataTemp.length > 0 && percent === 100) {
      this.setDataStore(masterDataTemp);
    } else {
      this.loadData(reportSelected);
    }
  }
  checkCurrentProcess(queueNumber) {
    let lastedQueue = this.queueProgress[this.queueProgress.length - 1];
    return queueNumber === lastedQueue;
  }

  async loadData(reportSelected) {
    let {
      vehicleSelected,
      fleetSelected,
      dateStart,
      dateEnd,
      dataLogin,
      overtime,
    } = this.props;
    let vidList = [];
    this.totalSuccess = 0;
    this.cancleFetchApi();
    this.props.setPercent(0);
    setTimeout(async () => {
      vehicleSelected.forEach((element) => {
        vidList.push(element.int_vehicle_id);
      });

      let body = {
        vid_list: vidList,
        dtstart: dateStart,
        dtstop: dateEnd,
        user_id: dataLogin.userId,
      };

      let urlMaster = getUrlMaster(reportSelected);
      let urlSummary = getUrlSummary(reportSelected);

      let dataMaster = await this.getDataMaster(urlMaster, body);
      this.dataMaster = dataMaster;

      //#region
      let isSuccess = false,
        rangeIndex = { min: 0, max: 15 },
        nextRange = 15,
        countSuccess = 0,
        total = dataMaster.length;
      if (dataMaster.length > 0) {
        let queueNumber = uuidv4();
        this.queueProgress.push(queueNumber);

        do {
          let listAPI = [];
          let countLast = nextRange;
          for (let index = rangeIndex.min; index < rangeIndex.max; index++) {
            if (index < total) {
              let body = {
                vid_list: [dataMaster[index].vid],
                dtstart: dateStart,
                dtstop: dateEnd,
                fleet_id: fleetSelected[0] || "",
                user_id: dataLogin.userId,
              };

              listAPI.push({
                url: urlSummary,
                body: body,
                vid: dataMaster[index].vid,
                queueNumber,
              });
            } else {
              countLast--;
            }
          }

          if (listAPI.length > 0) {
            if (this.checkCurrentProcess(listAPI[0].queueNumber)) {
              await this.fetchPromiseAll(listAPI, total);

              countSuccess += countLast;
              let nextRage = {
                min: rangeIndex.min + nextRange,
                max: rangeIndex.max + nextRange,
              };
              rangeIndex = nextRage;

              if (countSuccess === total) isSuccess = true;
            } else {
              isSuccess = true;
            }
          }
        } while (!isSuccess);

        setTimeout(() => {
          this.props.setValueOtherReport("masterDataTemp", dataStore._array);
        }, 1000);
      }

      //#endregion
    }, 1000);
  }

  async fetchPromiseAll(listAPI, total) {
    const promises = listAPI.map(async (dt) => {
      if (this.checkCurrentProcess(dt.queueNumber)) {
        let isSuccess = true;
        isSuccess = await this.getDataSummary(dt.url, dt.body, dt.vid, total);

        while (!isSuccess) {
          await this.fetchPromiseAll(
            [
              {
                url: dt.url,
                body: dt.body,
                vid: dt.vid,
                queueNumber: dt.queueNumber,
              },
            ],
            total
          );
          isSuccess = true;
        }
      } else {
      }
    });
    await Promise.all(promises);
  }

  setDataStore(data) {
    data.forEach((item) => {
      dataStore.push([
        {
          type: "insert",
          data: item,
        },
      ]);
    });
  }

  async getDataMaster(url, body) {
    let result = [];
    this.totalSuccess = 0;
    dataStore.clear();
    dataSource.reload();
    this.props.setPercent(0);

    try {
      const controller = new AbortController();
      let signal = controller.signal;
      this.controllerMaster.push(controller);
      let response = await fetch(YM_BASE_URL + url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "accept-language": this.props.language,
        },
        body: JSON.stringify(body),
        signal,
      });

      var resp = await response.json();

      if (resp.message == "ok") {
        this.setDataStore(resp.result);
        result = [...resp.result];
      } else {
      }
    } catch {
      this.props.setPercent();
    }
    return result;
  }

  async getDataSummary(url, body, vid, total, reportId) {
    let isSuccess = false;
    // this.setAlertSetting(true, 5)
    // if (reportId !== this.props.reportSelected) return true;
    try {
      const controller = new AbortController();
      let signal = controller.signal;
      this.controller.push(controller);

      let response = await fetch(YM_BASE_URL + url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "accept-language": this.props.language,
        },
        body: JSON.stringify(body),
        signal,
      });

      var resp = await response.json();
      this.totalSuccess++;
      let percent = parseInt((this.totalSuccess / total) * 100);
      this.props.setPercent(percent);
      if (resp.code === 200) {
        this.updateDataStore(vid, resp.result[0]);
        isSuccess = true;
      } else {
        isSuccess = false;
      }
    } catch (err) {
      this.totalSuccess++;
      isSuccess = false;
    }
    return isSuccess;
  }

  cancleFetchApi(isUnmount = false) {
    if (isUnmount) this.queueProgress.length = 0;
    this.controller.forEach((controller) => {
      if (!controller.signal.aborted) controller.abort();
    });
    this.controllerMaster.forEach((controller) => {
      if (!controller.signal.aborted) controller.abort();
    });
  }
  handleAbort() {
    const abortController = new AbortController();
    abortController.abort(); // Cancel the request
  }
  updateDataStore(vid, data) {
    let { reportSelected } = this.props;

    if (get(data, "vid")) {
      let dataUpdate = data;

      if (reportSelected === "402") {
        // ให้ runing vin_no ใหม่
        let obj = this.dataMaster.find((item) => item.vid === data.vid);
        dataUpdate.vin_no = obj.vin_no;
      }

      dataStore.push([
        {
          type: "update",
          key: vid,
          data: { ...dataUpdate },
        },
      ]);

      dataSource.reload();
    }
  }

  setAlertSetting(isShow, type, content = "") {
    let { alertSetting } = this.state;
    alertSetting.show = isShow;
    alertSetting.type = type;
    alertSetting.content = content;
    this.setState({ alertSetting });
  }

  render() {
    let { ColumnConfig, alertSetting, total } = this.state;
    let {
      reportMenu,
      reportName,
      reportSelected,
      dateStart,
      dateEnd,
      fleets,
      fleetSelected,
      language,
      percent,
    } = this.props;
    let exportName = [
      t(reportName),
      " ",
      moment(dateStart, "YYYY/MM/DD HH:mm:ss").format("DD-MM-YYYY HH_mm"),
      " ",
      t("export_5"),
      " ",
      moment(dateEnd, "YYYY/MM/DD HH:mm:ss").format("DD-MM-YYYY HH_mm"),
    ];

    let nameFleet = get(
      fleets.find((item) => item.key == fleetSelected),
      "value",
      ""
    );
    let textHeader = [
      t("export_3"),
      " : ",
      nameFleet,
      ", ",
      t("export_4"),
      " : ",
      moment(dateStart, "YYYY/MM/DD HH:mm:ss").format("DD/MM/YYYY HH:mm"),
      " ",
      t("export_5"),
      " ",
      moment(dateEnd, "YYYY/MM/DD HH:mm:ss").format("DD/MM/YYYY HH:mm"),
    ];
    if (reportSelected === "402") textHeader.splice(0, 4);

    return (
      <Suspense fallback={null}>
        <Alert
          setting={alertSetting}
          onConfirm={() => {
            if (alertSetting.type === 4) alertSetting.show = false;
            else alertSetting.show = false;

            this.setState({ alertSetting });
          }}
          onCancel={() => {
            alertSetting.show = false;
            this.setState({ alertSetting });
          }}
        />
        <HeaderSummary
          boxid={100}
          onClick={() => {
            this.props.setMasterDataTemp(null);
            this.props.history.push("/OtherReportNew");
            // this.props.setVehicleSelected([]);
          }}
        >
          <Row>
            <Col lg={9} md={9} sm={9}>
              <FormSelect
                schema={{ required: "" }}
                mode={"single"}
                //width="100%"
                value={"" + this.props.reportSelected}
                list={[
                  {
                    key: "101",
                    value: "101 - รายงานการใช้รถขุด",
                  },
                  // {
                  //   key: "102",
                  //   value: "102 - รายงานเข้า/ออกสถานี",
                  // },
                ]}
                placeholder={""}
                // disabled={percent < 100 ? true : false}
                flex={1}
                showLabel={true}
                onChange={(selected, value) => {
                  if (selected !== undefined) {
                    this.isFirstLoad = true;
                    this.props.setStateReduxOtherReport({
                      reportSelected: selected,
                    });
                    this.props.setStateReduxOtherReport({ reportId: selected });
                    this.props.setStateReduxOtherReport({
                      reportName: value.children,
                    });
                    // this.cancleFetchApi()
                  }
                }}
              />
            </Col>
            <Col>
              {percent < 100 ? (
                <span
                  style={{
                    textalign: "center",
                    alignItems: "center",
                    marginLeft: "35rem",
                  }}
                >
                  {t("loading")} {`${this.props.percent} %`}
                </span>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </HeaderSummary>

        <BoxContrainer title={reportName}>
          <div style={{ height: `calc(100vh - 314px)`, textalign: "center" }}>
            {reportSelected === "402" ? (
              <TableReport402
                dataSource={dataSource}
                exportName={exportName}
                reportSelected={reportSelected}
                column={getColumnSummary(reportSelected)}
                textHeader={textHeader}
              />
            ) : (
              <Table
                mode={"offline"}
                dataSource={dataSource}
                exportName={exportName}
                table_id={6}
                user_id={this.props.dataLogin.userId}
                exportToPDFVisible={true}
                height={`calc(100vh - 360px)`}
                editing={{
                  enabled: reportSelected === "402" ? false : true,
                }}
                cookiesOptions={{
                  enable: true,
                  name: "ReportSummary_" + reportSelected,
                }}
                // headerCustom={{
                //   list: [
                //     { text: textHeader, merge_cell: true, font: { size: 12 }, alignment: { vertical: 'middle' }, height: 30 },
                //   ]
                // }}
                columnCount="fleet_name"
                footerSummary={{
                  hideCount: true,
                }}
                customButton={[
                  {
                    hint: language == "th" ? "รายละเอียด" : "Detail",
                    icon: "file",
                    visible: true,
                    onClick: (e) => {
                      let headerDetail = {
                        nameFleet,
                        cust_name: get(e, "row.data.customer"),
                        vin_no: get(e, "row.data.vin_no"),
                      };
                      this.props.setDetailSelected(
                        e.row.data.vid,
                        headerDetail
                      );

                      this.props.history.push("/OtherReportNew/Detail");
                    },
                  },
                ]}
                column={getColumnSummary(reportSelected)}
              />
            )}
          </div>
        </BoxContrainer>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  reportMenu: state.otherReport.reportMenu,
  reportSelected: state.otherReport.reportSelected,
  vehicleSelected: state.otherReport.vehicleSelected,
  fleetSelected: state.otherReport.fleetSelected,
  dateStart: state.otherReport.dateStart,
  dateEnd: state.otherReport.dateEnd,
  overtime: state.otherReport.overtime,
  masterData: state.otherReport.masterData,
  reportName: state.otherReport.reportName,
  masterDataTemp: state.otherReport.masterDataTemp,
  fleets: state.otherReport.fleets,
  DataSummary: state.otherReport.DataSummary,
  language: state.versatile.language,
  percent: state.otherReport.percent,
});

const mapDispatchToProps = (dispatch) => ({
  getMasterData: (body, url) =>
    dispatch(OtherReportActions.getMasterData(body, url)),
  getSummaryData: (body, url) =>
    dispatch(OtherReportActions.getSummaryData(body, url)),
  getDetailData: (body, url) =>
    dispatch(OtherReportActions.getDetailData(body, url)),
  setReportSelected: (reportId) =>
    dispatch(OtherReportActions.setReportSelected(reportId)),
  setMasterData: (data) => dispatch(OtherReportActions.setMasterData(data)),
  setDetailSelected: (vid, headerDetail, group) =>
    dispatch(OtherReportActions.setDetailSelected(vid, headerDetail, group)),
  setPercent: (percent) => dispatch(OtherReportActions.setPercent(percent)),
  setMasterDataTemp: (data) =>
    dispatch(OtherReportActions.setMasterDataTemp(data)),
  setDetailData: (data) => dispatch(OtherReportActions.setDetailData(data)),
  setDataSummary: (data) => dispatch(OtherReportActions.setDataSummary(data)),
  setValueOtherReport: (name, value) =>
    dispatch(OtherReportActions.setValueOtherReport(name, value)),
  setStateReduxOtherReport: (objState) =>
    dispatch(OtherReportActions.setStateReduxOtherReport(objState)),
  setVehicleSelected: (vehicles) =>
    dispatch(OtherReportActions.setVehicleSelected(vehicles)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportSummary);

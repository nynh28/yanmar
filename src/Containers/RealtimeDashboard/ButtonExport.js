import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import RealtimeActions from "../../Redux/RealtimeRedux";
import { exportExcel } from "../../Functions/ExportExcel";
import { momentDate, calculateToDuration } from "../../Functions/DateMoment";
import { getStatusVehicle, getStatusCard } from "../../Functions/StatusColor";
import { numberWithComma } from "../../Functions/Calculation";
import RealtimeNewActions from "../../Redux/RealtimeNewRedux";
import { Button } from "../../components_new";
import { renderToString } from "react-dom/server";
import { t } from "../../Components/Translation";
import { get, isEqual } from "lodash";
import moment from "moment";
import $ from "jquery";
import {
  ENDPOINT_REALTIME,
  ENDPOINT_REALTIME_V2,
  ENDPOINT_BASE_URL_YNM3,
} from "../../Config/app-config";

const mySuspense = (<Suspense />).type;

const USER_LEVEL_DISPLAY = [21, 22, 31, 32];

class ButtonExport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowPanel: true,
    };
  }

  componentWillMount() {
    let { dataLogin, setStateReduxRealtime } = this.props;
    this.isDisplay = USER_LEVEL_DISPLAY.includes(dataLogin.userLevelId);
    setStateReduxRealtime({ isLoadingExportRealtime: false });
  }

  async getApiExportRealtime() {
    let { dataLogin, language, setStateReduxRealtime } = this.props;
    setStateReduxRealtime({ isLoadingExportRealtime: true });
    let date = moment(),
      first = true,
      data_excel = [],
      LastEvaluatedKey,
      is_ok = true,
      format_file = "DD-MM-YYYY HH_mm",
      format_header = "DD/MM/YYYY HH:mm:ss"; // "26/08/2021 13:21:38"
    while (first || LastEvaluatedKey) {
      // var response = await fetch("http://10.8.0.4:5000/prod/" +
      var response = await fetch(
        ENDPOINT_BASE_URL_YNM3 +
          "fleet/V2/ExportRealtime?user_id=" +
          dataLogin.userId +
          "&gzip_status=True" +
          "&page=" +
          (first ? 0 : LastEvaluatedKey.page) +
          "&per_page=5000",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Accept-Language": language,
          },
        }
      );
      if (response.ok) {
        let data = await response.json();
        LastEvaluatedKey = data.LastEvaluatedKey;
        data_excel.push(...data.vehicles);
      } else {
        is_ok = false;
        break;
        // setStateReduxRealtime({ isLoadingExportRealtime: false })
      }
      first = false;
    }
    setStateReduxRealtime({ isLoadingExportRealtime: false });

    if (is_ok)
      this.onClickExport(
        this.setFormatJsonData(data_excel),
        date.format(format_file),
        date.format(format_header)
      );
  }

  onClickExport(json_data, date_file_name, date_header) {
    let column_header,
      custom_header = { list: [], total_row: 2 },
      file_name = [t("realtime_151"), " ", date_file_name],
      is_sub_table = true,
      obj_merge_col = {
        font: { bold: true },
        alignment: { horizontal: "center" },
        index_row: 2,
      };

    column_header = this.setColumnHeader();

    custom_header.list.push({
      text: [t("realtime_150"), ": ", date_header],
      merge_cell: true,
      height: 30,
      font: { size: 12 },
      alignment: { vertical: "middle" },
    });
    custom_header.list.push(
      {
        text: [t("realtime_122")],
        index_cell: 9,
        merge_cell: [9, 13],
        ...obj_merge_col,
      },
      {
        text: [t("realtime_126")],
        index_cell: 14,
        merge_cell: [14, 15],
        ...obj_merge_col,
      },
      {
        text: [t("realtime_143")],
        index_cell: 16,
        merge_cell: [16, 18],
        ...obj_merge_col,
      },
      {
        text: [t("realtime_175")],
        index_cell: 19,
        merge_cell: [19, 21],
        ...obj_merge_col,
      }
    );

    this.props.setStateReduxRealtime({ isLoadingExportRealtime: false });
    exportExcel({
      column_header,
      json_data,
      file_name,
      custom_header,
      is_sub_table,
    });
  }

  setFormatJsonData(data) {
    for (let itm of data) {
      // --------- plate_no ---------
      itm.plate_no = get(itm, "vehicle_name", null)
        ? get(itm, "vehicle_name")
        : get(itm, "licenseplate", null)
        ? get(itm, "licenseplate")
        : get(itm, "vin_no", null);
      // --------- odo_km ---------
      itm.odo_km = numberWithComma(Number(get(itm, "odo", "0")));
      // --------- vehicles_status ---------
      itm.vehicles_status = this.rTT(
        t(getStatusVehicle(get(itm, "status", 0)).name)
      );
      // --------- duration ---------
      let _drt = get(itm, "io_time", "N/A");
      if (_drt === "N/A") _drt = 0;
      itm.duration = this.rTT(calculateToDuration(_drt, "hideSec"));
      // --------- driver_status ---------
      itm.driver_status = this.rTT(
        t(getStatusCard(get(itm, "status_swipe_card", 0)).name)
      );
      // --------- driver_name ---------
      itm.driver_name =
        get(itm, "name", "") !== ""
          ? get(itm, "name")
          : get(itm, "card_id", "");
      // --------- dtc_engine_lamp ---------
      itm.dtc_engine_lamp =
        get(itm, "dtc_engine") === "1"
          ? this.rTT(t("realtime_50"))
          : this.rTT(t("realtime_51"));
      // --------- maint_stat ---------
      itm.maint_stat =
        get(itm, "maintenance_status") === 1
          ? this.rTT(t("realtime_73"))
          : get(itm, "maintenance_status") === 2
          ? this.rTT(t("realtime_69"))
          : this.rTT(t("realtime_153"));
      // maintenance_status
      // --------- gps_device_status ---------
      itm.gps_device_status =
        get(itm, "device_batt") === 0
          ? this.rTT(t("realtime_52"))
          : this.rTT(t("realtime_50"));
      itm.gpsdate = momentDate(
        get(itm, "gps_date")
          ? get(itm, "gps_date", null)
          : get(itm, "gps_date", null)
      );
    }

    return data;
  }

  rTT(reactSymbol) {
    if (reactSymbol.type === mySuspense)
      reactSymbol = reactSymbol.props.children;
    let str = renderToString(reactSymbol);
    str = str
      .replace('<div data-reactroot="">', "")
      .replace(/<\/div>/g, "")
      .replace('<span data-reactroot="">', "")
      .replace(/<\/span>/g, "")
      .replace(/<!-- -->/g, "");
    return str;
  }

  setColumnHeader() {
    return [
      { text: t("my_vehicles_78"), key: "model_code" }, //รุ่นรถ
      { text: t("realtime_172"), key: "vin_no" },
      // { text: t("other_reports_143"), key: "" },
      { text: t("realtime_121"), key: "dealer_code" },
      { text: t("realtime_119"), key: "customer_name" },
      { text: t("my_drivers_48"), key: "phone" },
      { text: t("realtime_158"), key: "delivery" },
      { text: t("realtime_157"), key: "finance_contract_number" },
      {
        text: t("realtime_170"),
        key: "engine_hour",
        style: { alignment: { horizontal: "right" } },
      },

      { text: t("ละติจูด"), key: "lat", sub: true }, // ละติจูด
      { text: t("ลองติจูด"), key: "lng", sub: true }, // ลองติจูด
      { text: t("realtime_123"), key: "admin_level3_name", sub: true }, // ตำบล
      { text: t("realtime_124"), key: "admin_level2_name", sub: true }, // อำเภอ
      { text: t("realtime_125"), key: "admin_level1_name", sub: true }, // จังหวัด
      { text: t("realtime_127"), key: "vehicles_status", sub: true }, //รถของฉัน
      {
        text: t("realtime_128"),
        key: "gpsdate",
        sub: true,
        style: { alignment: { horizontal: "right" } },
      }, //รถของฉัน
      // { text: t("realtime_130"), key: "driver_status", sub: true },
      // { text: t("realtime_131"), key: "driver_name", sub: true },
      // { text: t("realtime_133"), key: "sudden_start", sub: true },
      // { text: t("realtime_134"), key: "sudden_accelerator", sub: true },
      // { text: t("realtime_135"), key: "sudden_turn", sub: true },
      // { text: t("realtime_136"), key: "sudden_brake", sub: true },
      // { text: t("realtime_137"), key: "rpm_green_zone", sub: true },
      // { text: t("realtime_138"), key: "over_speed_60", sub: true },
      // { text: t("realtime_139"), key: "over_speed_80", sub: true },
      // { text: t("realtime_140"), key: "over_speed_100", sub: true },
      // { text: t("realtime_141"), key: "over_speed_120", sub: true },
      // { text: t("realtime_142"), key: "rpm_red_zone", sub: true },
      { text: t("realtime_144"), key: "dtc_engine_lamp", sub: true }, //สถานะการซ่อมบำรุง
      { text: t("realtime_143"), key: "maint_stat", sub: true }, //สถานะการซ่อมบำรุง
      { text: t("realtime_145"), key: "battery_status", sub: true }, //สถานะการซ่อมบำรุง
      { text: t("realtime_13"), key: "rpm", sub: true }, //สัญญาณอุปกรณ์
      { text: t("other_reports_155"), key: "fuel_per", sub: true }, //สัญญาณอุปกรณ์
      { text: t("realtime_33"), key: "", sub: true }, //สัญญาณอุปกรณ์
      // { text: t("realtime_146"), key: "serive_campiagn", sub: true },
      { text: t("realtime_147"), key: "vehicle_batt" },
      // { text: t("realtime_148"), key: "device_batt" },
      {
        text: t("realtime_149"),
        key: "gps_device_status",
        style: { alignment: { horizontal: "center" } },
      },
    ];
  }

  render() {
    return this.isDisplay ? (
      <Button
        size="small"
        className="ant-btn-export-excel-outline"
        icon={
          <img
            className="ic-export-excel"
            src="icons/icon-excel.png"
            style={{ width: 15, margin: "-1px 4px" }}
          />
        }
        text="realtime_152"
        onClick={() => this.getApiExportRealtime()}
      />
    ) : (
      <></>
    );
    return this.isDisplay ? (
      <Button
        onClick={() => this.getApiExportRealtime()}
        // onClick={() => this.onClickExport()}
        style={{ marginRight: 5 }}
      >
        {t("realtime_152")}
      </Button>
    ) : (
      <></>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.versatile.language,
  dataLogin: state.signin.dataLogin,
  // dashboardEnabled: state.realtime.dashboardEnabled,
});

const mapDispatchToProps = (dispatch) => ({
  setStateReduxRealtime: (objStateRudux) =>
    dispatch(RealtimeNewActions.setStateReduxRealtime(objStateRudux)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ButtonExport);

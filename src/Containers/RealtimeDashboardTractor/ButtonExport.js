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
    this.isDisplay = USER_LEVEL_DISPLAY.includes(dataLogin.user_level_id);
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
          dataLogin.user_id +
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
    // console.log('data_excel', this.setFormatJsonData(data_excel))
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
      file_name = [t("realtime_178"), " ", date_file_name],
      is_sub_table = true,
      obj_merge_col = {
        font: { bold: true },
        alignment: { horizontal: "center" },
        index_row: 2,
      };

    column_header = this.setColumnHeader();

    custom_header.list.push({
      text: [t("realtime_179"), ": ", date_header],
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
        text: [t("realtime_196")],
        index_cell: 14,
        merge_cell: [14, 15],
        ...obj_merge_col,
      }
    );
    // console.log('onClickExport!')
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
      // console.log(itm)
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
      // console.log(itm)
      itm.gpsdate = momentDate(
        get(itm, "gps_date")
          ? get(itm, "gps_date", null)
          : get(itm, "gps_date", null)
      );
    }
    // console.log('test', data)

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
      { text: t("my_vehicles_78"), key: "model_code" }, //รุ่นรถ 1
      { text: t("realtime_180"), key: "vin_no" }, //2
      { text: t("realtime_181"), key: "dealer_code" }, //3
      { text: t("realtime_119"), key: "customer_name" }, //4
      { text: t("realtime_182"), key: "phone" }, //5
      { text: t("realtime_158"), key: "delivery" }, //6
      { text: t("realtime_183"), key: "finance_contract_number" }, //7
      {
        text: t("realtime_184"),
        key: "engine_hour",
        style: { alignment: { horizontal: "right" } },
      }, //8
      { text: t("realtime_185"), key: "lat", sub: true }, // ละติจูด 9
      { text: t("realtime_186"), key: "lng", sub: true }, // ลองติจูด 10
      { text: t("realtime_187"), key: "admin_level3_name", sub: true }, // ตำบล 11
      { text: t("realtime_188"), key: "admin_level2_name", sub: true }, // อำเภอ 12
      { text: t("realtime_189"), key: "admin_level1_name", sub: true }, // จังหวัด 13
      { text: t("realtime_190"), key: "vehicles_status", sub: true }, //รถของฉัน 14
      {
        text: t("realtime_194"),
        key: "gpsdate",
        sub: true,
        style: { alignment: { horizontal: "right" } },
      }, //รถของฉัน 15
      { text: t("realtime_195"), key: "vehicle_batt" }, //16
      {
        text: t("realtime_18"),
        key: "gps_device_status",
        style: { alignment: { horizontal: "center" } },
      }, //17
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

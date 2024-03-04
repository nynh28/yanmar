import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import MaintenanceActions from "../../Redux/MaintenanceHistoryRedux";
import { Row, Col } from "antd";
import PannelBox from "../../Components/PannelBox";
import FormSelect from "../../Components/FormControls/Basic/FormSelect";
import FormDatepickerNew from "../../Components/FormControls/FormDatepickerNew";
import DataTable from "./DataTable";
import moment from "moment";
import { get, isEmpty } from "lodash";
import { t } from "../../Components/Translation";
import {
  ENDPOINT_BASE_URL,
  ENDPOINT_BASE_URL_YNM2,
  ENDPOINT_BASE_URL_YNM4,
} from "../../Config/app-config";
import { useTranslation } from "react-i18next";
import { Select } from "antd";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { BoxContrainer, Button } from "../../components_new";

const { Option } = Select;
const TODAY = moment().format("DD/MM/YYYY");
const FormSelectSearch = (arg) => {
  const { t } = useTranslation();

  return (
    <Select
      allowClear={true}
      id={arg.id}
      mode={arg.mode}
      showSearch={arg.showSearch !== undefined ? arg.showSearch : true}
      style={{ width: "100%" }}
      placeholder={t(arg.placeholder)}
      // defaultValue={arg.value}
      value={arg.value}
      disabled={arg.disabled}
      onChange={arg.onChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      // labelInValue={arg.labelInValue}
    >
      {!isEmpty(arg.list) &&
        arg.list !== null &&
        arg.list.map((item) => {
          return <Option key={item.key}>{t(item.value)}</Option>;
        })}
    </Select>
  );
};

const DatePicker = (arg) => {
  const { t } = useTranslation();

  return (
    <>
      <div
        className="form-group field field-string icon-calendar"
        style={{ padding: "0 10px", flex: 1 }}
      >
        <label
          className="control-label"
          style={{ fontWeight: 500, paddingBottom: 6 }}
        >
          {t(arg.label)} :
        </label>
        <DateRangePicker
          startDate={arg.value}
          locale={{ format: "DD/MM/YYYY" }}
          onApply={(e, p) => arg.onChange(p.startDate.format("DD/MM/YYYY"))}
          autoApply={true}
          singleDatePicker
          showDropdowns
        >
          <input
            className="form-control"
            value={arg.value || ""}
            // placeholder={t("วันที่นัดหมายการเข้าศูนย์บริการ")}
          />
        </DateRangePicker>
      </div>
    </>
  );
};
const WORDEVETNAME = {
  en: {
    Notification_M_10001: "Engine Lamp",
    Notification_M_10008: "Remind Battery Low",
    Notification_M_11000: "แจ้งเตือนการเข้าเช็คระยะ 50 ชม.แรก",
    Notification_M_11001: "แจ้งเตือนการเข้าเช็คระยะทุก 250 ชม.",
    Notification_M_10010: "แจ้งเตือนเข้าพื้นที่เสี่ยง",
    Notification_M_10009: "แจ้งเตือนออกนอกพื้นที่ที่กำหนด",
    Notification_M_10012: "แจ้งเตือนน้ำมันเชื้อเพลิงลดลงผิดปกติ",
    Notification_M_10013: "แจ้งเตือน GPS ถูกถอด",
    Notification_M_10014: "แจ้งเตือนแบตเตอรี่ถูกถอด",
    Notification_M_10015: "แจ้งเตือนอุณหภูมิน้ำหล่อเย็น",
    Notification_M_10016: "แจ้งเตือนอุณหภูมิน้ำมันไฮดรอลิค",
  },
  th: {
    Notification_M_10001: "ไฟเครื่องยนต์เตือน", //use
    Notification_M_10008: "เตือนแบตเตอรี่ต่ำ", //use
    Notification_M_11000: "แจ้งเตือนการเข้าเช็คระยะ 50 ชม.แรก",
    Notification_M_11001: "แจ้งเตือนการเข้าเช็คระยะทุก 250 ชม.",
    Notification_M_10010: "แจ้งเตือนเข้าพื้นที่เสี่ยง",
    Notification_M_10009: "แจ้งเตือนออกนอกพื้นที่ที่กำหนด",
    Notification_M_10012: "แจ้งเตือนน้ำมันเชื้อเพลิงลดลงผิดปกติ",
    Notification_M_10013: "แจ้งเตือน GPS ถูกถอด",
    Notification_M_10014: "แจ้งเตือนแบตเตอรี่ถูกถอด",
    Notification_M_10015: "แจ้งเตือนอุณหภูมิน้ำหล่อเย็น",
    Notification_M_10016: "แจ้งเตือนอุณหภูมิน้ำมันไฮดรอลิค",
  },
  ja: {
    Notification_M_10001: "Engine Lamp",
    Notification_M_10008: "Remind Battery Low",
    Notification_M_11000: "แจ้งเตือนการเข้าเช็คระยะ 50 ชม.แรก",
    Notification_M_11001: "แจ้งเตือนการเข้าเช็คระยะทุก 250 ชม.",
    Notification_M_10010: "แจ้งเตือนเข้าพื้นที่เสี่ยง",
    Notification_M_10009: "แจ้งเตือนออกนอกพื้นที่ที่กำหนด",
    Notification_M_10012: "แจ้งเตือนน้ำมันเชื้อเพลิงลดลงผิดปกติ",
    Notification_M_10013: "แจ้งเตือน GPS ถูกถอด",
    Notification_M_10014: "แจ้งเตือนแบตเตอรี่ถูกถอด",
    Notification_M_10015: "แจ้งเตือนอุณหภูมิน้ำหล่อเย็น",
    Notification_M_10016: "แจ้งเตือนอุณหภูมิน้ำมันไฮดรอลิค",
  },
};
class MaintenanceHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startSearch: false,
      listMembers: [],
      listMembersAll: [],
      listMembersAlls: [],
      id: [],
      isFirstLoading: true,
      event: [
        "11000",
        "11001",
        "20004",
        "111111",
        "20002",
        "20003",
        "10001",
        "2003",
        "1008",
      ],
    };
    this.startDate = "";
    this.stopDate = "";
  }

  componentDidMount() {
    let { endDate } = this.props;

    this.getvehicleid();

    if (endDate === "") this.props.setValue("endDate", TODAY);
  }

  componentWillUnmount = () =>
    this.props.setValue("isLoadingMaintenance", false);

  async getvehicleid() {
    let body = {
      user_id: this.props.dataLogin.userId,
      dealer_id: "all",
    };
    try {
      var response = await fetch(
        ENDPOINT_BASE_URL_YNM4 + `fleet/Yanmar/getVehicleByDealer`,
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
      console.log("model", model);
      console.log("chassisNo", chassisNo);
      console.log("engineNo", engineNo);
      this.props.setStateMaintenanceHistory({
        modelList: model,
        chassisNoList: chassisNo,
        engineNoList: engineNo,
        byModelCode: by_model_code,
      });
    } catch (error) {
      console.log(error);
    }
  }

  //#region Load Vehicles

  //#endregion

  //#region Load Maintenacce History
  async loadMaintenanceHistory() {
    let { endDate, vin_no_search } = this.props;

    let vid_list = [];
    console.log(this.props.historyShowName);
    let name = this.props.historyShowName;
    console.log("value", this.props.currentValue);
    let value = this.props.currentValue;
    console.log(value);
    if (name === "เลขเครื่อง" || name === "เลขตัวรถ") {
      vid_list.push(value);
    } else {
      let code = this.props.byModelCode.find((item) => item[value]);
      vid_list.push(...code[value]);
    }
    let endDateTime = moment(endDate, "DD/MM/YYYY").format(
      "YYYY-MM-DD 23:59:59"
    );
    let searchData = {
      event: this.state.event,
    };

    this.props.setValue("isLoadingMaintenance", true);
    try {
      var response = await fetch(
        ENDPOINT_BASE_URL_YNM4 + "fleet/maintenance/history",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // "x-api-key": "OWo5jZ60dCrvrOOPP9d0sYbN8RNFk47o",
          },
          body: JSON.stringify({
            vid_list: vid_list,
            stop_date: endDateTime,
            user_id: this.props.dataLogin.userId,
            // 'vinNo': 'MNKFM1AN1XHX13152',
            // 'endDateTime': '20210721'
          }),
        }
      );

      var data = await response.json();

      if (response.status === 200) {
        // this.props.setValue("dataMaintanance", data.result)
        let newdata = this.addEventName(data.result);
        console.log(newdata);
        this.props.setHistoryData(newdata, searchData, this.props.language);
        console.log(this.props.historyData);
      } else {
        this.props.setHistoryData([], searchData, this.props.language);
        this.props.setValue("dataMaintanance", []);
      }
    } catch (error) {
      console.log(error);
      this.props.setValue("dataMaintanance", []);
    }

    this.props.setValue("isLoadingMaintenance", false);
  }

  addEventName(arr) {
    let { language } = this.props;
    let newArr = arr.map((item) => {
      item.event_name =
        WORDEVETNAME[language]["Notification_M_" + item.event_id];
      return item;
    });
    return newArr;
  }

  //#endregion

  //#region Vehicles
  getVehicleInfo(vid) {
    let { listMembers } = this.state;
    let obj = listMembers.find((x) => x.id === parseInt(vid));
    return obj;
  }

  selectEventDevice(select) {
    let text = "" + select;
    let selectSp = text.split("_");
    let selectID = "";
    let historyShowName = this.props.historyShowName;

    let vehicleInfo = this.getvehicleid(select);
    let vinNo = get(vehicleInfo, "vid", "");
    let engine_no =
      historyShowName == "เลขเครื่อง" ? get(vehicleInfo, "engine_no", "") : "";
    let chassis_no =
      historyShowName == "เลขตัวรถ" ? get(vehicleInfo, "vin_no", "") : "";
    let model =
      historyShowName == "รุ่นรถ" ? get(vehicleInfo, "model", "") : "";

    if (selectSp.length > 1) {
      selectID = selectSp[0];
      selectSp[3] === "n1"
        ? (historyShowName = "รุ่นรถ")
        : selectSp[3] === "n2"
        ? (historyShowName = "เลขตัวรถ")
        : selectSp[3] === "n3"
        ? (historyShowName = "เลขเครื่อง")
        : (historyShowName = "");
    } else {
      selectID = select;
    }

    this.setState({
      vin_no: [parseInt(selectID)],
      vinNo,
      engine_no,
      chassis_no,
      model,
      startSearch: false,
    });
    console.log(this.state.vin_no);
    //this.props.setValue("vin_no", [parseInt(selectID)])
  }
  //#endregion

  onApplyEvent(dataObject) {
    this.startDate = dataObject.startDate.format("YYYY-MM-DD");
    this.stopDate = dataObject.endDate.format("YYYY-MM-DD");

    this.props.setValue([
      { name: "start_date", value: this.startDate },
      { name: "stop_date", value: this.stopDate },
    ]);
  }

  render() {
    let {
      endDate,
      modelList,
      engineNoList,
      chassisNoList,
      currentValue,
      historyShowName,
    } = this.props;
    let { startSearch, listMembers, listMembersAll, vin_no, listMembersAlls } =
      this.state;

    // console.log(">> RENDER MY DRIVERS <<", this.dealer_mode)
    return (
      <Suspense fallback={null}>
        <BoxContrainer
          footer={
            <div style={{ textAlign: "Right" }}>
              <Button
                onClick={() => this.loadMaintenanceHistory()}
                style={{
                  marginRight: 10,
                  backgroundColor: "#1AB394",
                  color: "white",
                }}
                isSearchButton={true}
              />
            </div>
          }
        >
          <Row>
            <Col lg={12} md={12} sm={12}>
              <Row>
                <Col lg={12} md={12} xs={12}>
                  <div id="selected-1">
                    <FormSelect
                      schema={{ required: "" }}
                      mode={"single"}
                      value={historyShowName}
                      padding="0px 0px 0px 10px"
                      style={{ width: "100%" }}
                      showSearch={false}
                      label={historyShowName}
                      list={[
                        { key: 1, value: "รุ่นรถ", text: "รุ่นรถ" },
                        { key: 2, value: "เลขตัวรถ", text: "เลขตัวรถ" },
                        { key: 3, value: "เลขเครื่อง", text: "เลขเครื่อง" },
                      ]}
                      placeholder={""}
                      onChange={(selected) => {
                        this.props.setStateMaintenanceHistory({
                          historyShowName: selected,
                          currentValue: "",
                        });
                        console.log(historyShowName);
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

                <Col lg={12} md={12} xs={12}>
                  <div id="selected-2" style={{ margin: "25px 10px 0px 0px" }}>
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      optionFilterProp="children"
                      value={currentValue}
                      onChange={(value) => {
                        this.props.setStateMaintenanceHistory({
                          currentValue: value,
                        });
                        console.log(currentValue);
                      }}
                      onSearch={(input) => {}}
                    >
                      {historyShowName === "รุ่นรถ"
                        ? modelList.map((item) => (
                            <Option key={item.id} value={item.id}>
                              {item.value}
                            </Option>
                          ))
                        : historyShowName === "เลขเครื่อง"
                        ? engineNoList.map((item) => (
                            <Option key={item.id} value={item.id}>
                              {item.value}
                            </Option>
                          ))
                        : historyShowName === "เลขตัวรถ"
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
            <Col lg={12} md={12} sm={12}>
              <DatePicker
                label="Maintenace_History_1"
                value={endDate}
                onChange={(value) => this.props.setValue("endDate", value)}
              />
            </Col>
          </Row>
        </BoxContrainer>

        <BoxContrainer title="my_vehicles_20">
          <div style={{ height: `calc(100vh - 405px)` }}>
            <DataTable />
          </div>
        </BoxContrainer>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.versatile.language,
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  listVehicles: state.maintenanceHistory.listVehicles,
  vehicle_name: state.maintenanceHistory.vehicle_name,
  vin_no: state.maintenanceHistory.vin_no,
  listMembers: state.maintenanceHistory.listMembers,
  listMembersAll: state.maintenanceHistory.listMembersAll,
  endDate: state.maintenanceHistory.endDate,
  vin_no_search: state.maintenanceHistory.vin_no_search,
  dealerData: state.maintenanceHistory.dealerData,
  modelList: state.maintenanceHistory.modelList,
  chassisNoList: state.maintenanceHistory.chassisNoList,
  engineNoList: state.maintenanceHistory.engineNoList,
  historyShowName: state.maintenanceHistory.historyShowName,
  selectDealer: state.maintenanceHistory.selectDealer,
  currentValue: state.maintenanceHistory.currentValue,
  byModelCode: state.maintenanceHistory.byModelCode,
  dataMaintanance: state.maintenanceHistory.dataMaintanance,
  historyData: state.maintenanceHistory.historyData,
});

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(MaintenanceActions.setValue(name, value)),
  setStateMaintenanceHistory: (name, value) =>
    dispatch(MaintenanceActions.setStateMaintenanceHistory(name, value)),
  setHistoryData: (data, searchData, languageLocation) =>
    dispatch(
      MaintenanceActions.setHistoryData(data, searchData, languageLocation)
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceHistory);

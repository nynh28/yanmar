import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import TrackingHistoryActions from "../../Redux/TrackingHistoryRedux";
import SigninActions from "../../Redux/SigninRedux";
import { Row, Col } from "reactstrap";
import { t } from "../../Components/Translation";
import FormSelect from "../../Components/FormControls/Basic/FormSelect";
// import FormDatepicker from '../../Components/FormControls/FormDatepicker'
import DataTable from "./DataTable";
import TripExport from "./Template/TripExport";
// import DateRangePicker from "react-bootstrap-daterangepicker";

import DateRangePicker from "react-bootstrap-daterangepicker-maxspan";
import "bootstrap-daterangepicker/daterangepicker.css";

import { useTranslation } from "react-i18next";
import {
  CalendarOutlined,
  RedditSquareFilled,
  ReloadOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import moment from "moment";
import {
  ENDPOINT_BASE_URL,
  ENDPOINT_BASE_URL_YNM2,
  ENDPOINT_BASE_URL_YNM,
  YM_BASE_URL,
} from "../../Config/app-config";
import { Select } from "antd";
import WarningAlert from "./WarningAlert";
import "./Styles/tracking-history.css";
import { isEqual } from "lodash";
import FormSelectGroup from "../../Components/FormControls/Basic/FormSelectGroup";
import { tr } from "date-fns/locale";
import { BoxContrainer, Button } from "../../components_new";

const { Option } = Select;
const { get, isEmpty } = require("lodash");
const todayStart = moment().set({
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0,
});
const todayEnd = moment().set({
  hour: 23,
  minute: 59,
  second: 59,
  millisecond: 59,
});

const FormDatepickerNew = (arg) => {
  const { t } = useTranslation();
  return (
    <div
      className="form-group field field-string icon-calendar"
      style={{ padding: "0 10px", flex: arg.flex || 1 }}
    >
      <label
        className="control-label"
        style={{ fontWeight: 500, paddingBottom: 5 }}
      >
        {" "}
        {t(arg.label)} :
      </label>
      <CalendarOutlined />
      <DateRangePicker
        onShow={() => {
          let elms = document.querySelectorAll("li[data-range-key]");
          if (elms.length > 0) {
            elms[0].textContent = t("calendar_27");
            elms[1].textContent = t("calendar_1");
            elms[2].textContent = t("calendar_28");
            elms[3].textContent = t("calendar_5");
          }
        }}
        timePicker
        timePicker24Hour
        // singleDatePicker
        showDropdowns
        maxSpan={{ days: 1 }}
        locale={{
          format: "DD/MM/YYYY HH:mm",
          applyLabel: t("calendar_26"),
          cancelLabel: t("calendar_25"),
          customRangeLabel: t("calendar_5"),
          customRangeLabel: "Custom Range",
          daysOfWeek: [
            t("calendar_12"),
            t("calendar_6"),
            t("calendar_7"),
            t("calendar_8"),
            t("calendar_9"),
            t("calendar_10"),
            t("calendar_11"),
          ],
          monthNames: [
            t("calendar_13"),
            t("calendar_14"),
            t("calendar_15"),
            t("calendar_16"),
            t("calendar_17"),
            t("calendar_18"),
            t("calendar_19"),
            t("calendar_20"),
            t("calendar_21"),
            t("calendar_22"),
            t("calendar_23"),
            t("calendar_24"),
          ],
        }}
        startDate={arg.startDate}
        endDate={arg.endDate}
        onApply={arg.onApply}
        maxDate={todayEnd}
        ranges={{
          Today: [moment().startOf("day"), moment().endOf("day")],
          Yesterday: [
            moment().subtract(1, "days").startOf("day"),
            moment().subtract(1, "days").endOf("day"),
          ],
          "Past 3 days": [
            moment().subtract(3, "days").startOf("day"),
            moment().subtract(1, "days").endOf("day"),
          ],
          // "ระบุเอง": [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }}
        alwaysShowCalendars={true}
      >
        <input
          className="form-control"
          id={arg.fieldForm}
          disabled={arg.disabled}
          value={arg.value || ""}
          // required={arg.required}
          placeholder={t(arg.placeholder)}
        />
      </DateRangePicker>
    </div>
  );
};

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

class TrackingHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: [],
      customerList: [],
      startSearch: false,
      listMembers: [],
      listMembersAll: [],
      id: [],
      vin_no: [],
      dateStart: todayStart.format("DD/MM/YYYY HH:mm"),
      dateEnd: todayEnd.format("DD/MM/YYYY HH:mm"),
      dealer: [],
      dealerId: [],
    };
    this.onApplyDate = this.onApplyDate.bind(this);
    this.isDealer = false;
    this.isCustomer = false;
    this.isHino = false;
  }

  componentWillMount() {
    let {
      dataLogin,
      vehicle_name,
      vin_no,
      dateStart,
      dateEnd,
      customerList,
      listMembers,
      listMembersAll,
      customerId,
      fleetList,
      dealer_id,
    } = this.props;
    this.props.setValue("isLoadingTrips", false);
    if ([31, 32].includes(dataLogin.userLevelId)) this.isDealer = true;
    else if ([41, 42].includes(dataLogin.userLevelId)) this.isCustomer = true;
    else if ([21, 22].includes(dataLogin.userLevelId)) this.isHino = true;

    if (customerList.length > 0) {
      this.setState({
        vin_no: vin_no,
        dateStart,
        dateEnd,
        listMembers,
        listMembersAll,
        customerId: customerId,
        customerList,
      });
    } else {
      this.props.setValue("isLoadingTrips", true);
      this.load_manage_customer();
    }
    this.load_manage_dealer();
    this.getvehicleid((dealer_id = "all"));
    this.getalldata();
    this.props.setConfig({
      chart_colors: {
        parking: "#ff3b30",
        driving: "#5CE648",
        idling: "#FFE600",
        overspeed: "#6F25E5",
        offline: "#55c1d9",
        speed: "#5CE648",
        brake: "#FF5733",
        rpm: "#0000FF",
        fuel: "#F1C40F",
        dtc: "#FF0000",
        clutch: "#008080",
        exhaust: "#800000",
        temperature: "#00FFFF",
        pedal: "#005eb8",
        temp_limit: "#6F25E5",
        temp_hot: "#EB5757",
        temp_cool: "#2D9CDB",
        speed_limit: "#ff0000",
        rpm_zone: {
          red_zone: "#ff5252",
          green_zone: "#78ff52",
        },
        main_battery: "#e10000",
        backup_battery: "#ff7c3e",
        option_temperature: [
          "#ff0000",
          "#0218fe",
          "#eb04ff",
          "#fc7a00",
          "#00ecff",
        ],
      },
    });
  }

  componentWillUnmount() {
    this.props.setValue("isLoadingTrips", false);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { dataTrips, language, indexTripSelected } = this.props;

    if (nextProps.indexTripSelected !== indexTripSelected) return false;

    if (nextProps.language !== language) {
      this.addFieldData(dataTrips, nextProps.language);
      return false;
    }

    // if (nextProps.dataTrips != dataTrips) {

    if (!isEqual(nextProps.dataTrips, dataTrips)) {
      nextProps.dataTrips.length == 21 &&
        this.addFieldData(nextProps.dataTrips, language);
      return true;
    }

    return true;
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
          user_id: this.props.dataLogin.userId || this.props.dataLogin.user_id,
        }),
      });
      var data = await response.json();
      if (data?.code === 200) {
        let dealerList = data?.result;
        dealerList.unshift({
          dealer_id: 0,
          dealer_name: "my_vehicles_92",
        });
        this.props.setStateTracking({
          dealerData: dealerList,
          selectDealer: 0,
        });
      } else this.props.setStateTracking({ dealerData: [] });
    } catch (error) {
      this.props.setStateTracking({ dealerData: [] });
    }
  }

  async getvehicleid(dealer_id) {
    let dealer = "";
    if (dealer_id === 0) {
      dealer = "all";
    } else {
      dealer = dealer_id;
    }
    let body = {
      user_id: this.props.dataLogin.userId || this.props.dataLogin.user_id,
      dealer_id: dealer,
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
      this.props.setStateTracking({
        modelList: model,
        chassisNoList: chassisNo,
        engineNoList: engineNo,
        byModelCode: by_model_code,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async load_manage_customer() {
    let userId = this.props.dataLogin.userId || this.props.dataLogin.user_id;
    var response = await fetch(
      ENDPOINT_BASE_URL_YNM2 + "fleet/get_customer_by_manage",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );

    var data = await response.json();
    // console.log("load_manage_customer  : ", data)
    if (data.length > 0) {
      let customerList = [];
      for (let index in data) {
        customerList.push({
          key: data[index].int_cust_id,
          value: data[index].int_cust_id,
          text: data[index].customer_name,
        });
      }

      this.getFleet(customerList[0].key);
      // this.loadListMember(userId, customerList[0].key)
      this.setState({
        customerList,
        customerId: customerList[0].key,
      });
      this.props.setValue("customerList", customerList);
      this.props.setValue("customerId", customerList[0].key);
    } else {
      this.getFleet(0);
      // this.loadListMember(0)
      this.setState({ customerId: [], customerList: [] });
      this.props.setValue("customerId", 0);
      this.props.setValue("customerList", []);
    }
  }
  async load_manage_dealer() {
    var response = await fetch(
      `${ENDPOINT_BASE_URL_YNM}ServiceContract/Yanmar/DropdownGroup?name=Seller`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-api-key": this.props.header.redisKey,
          "Accept-Language":
            this.props.language == "ja" ? "jp" : this.props.language,
        },
      }
    );

    var data = await response.json();

    try {
      let list = data.map((e) => ({
        groupName: e.groupName,
        items: e.items,
        key: e.key,
        value: e.value,
      }));
      this.setState({ dealer: list });
    } catch (error) {
      return error;
    }
  }

  async getFleet(cust_id) {
    var object = {
      userId: this.props.dataLogin.userId || this.props.dataLogin.user_id,
    };
    try {
      var response = await fetch(ENDPOINT_BASE_URL_YNM2 + "fleet/getfleet", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      });
      let data = await response.json();

      if (data.length > 0) {
        data.unshift({
          fleet_id: 0,
          fleet_name: "my_vehicles_4",
        });
        let fleetList = [];
        data.forEach((item) => {
          fleetList.push({
            key: item.fleet_id,
            value: item.fleet_id,
            text: item.fleet_name,
          });
        });

        this.props.setValue("fleetList", fleetList);
        this.props.setValue("fleetId", fleetList[0].key);
        this.loadListMember(cust_id, 0); // DEFAULT ALL FLEET
      } else {
        this.loadListMember(cust_id, 0); // DEFAULT ALL FLEET
      }
    } catch (error) {
      this.props.setValue("fleetList", []);
    }
  }

  async loadListMember(cust_id, fleetId) {
    this.props.setValue("isLoadingTrips", true);
    let userId = this.props.dataLogin.userId || this.props.dataLogin.user_id;
    let url =
      ENDPOINT_BASE_URL_YNM2 +
      "fleet/dropdown?user_id=" +
      userId +
      "&options=VEHICLE";

    if (this.isDealer) url += "&cust_id=" + cust_id;
    if (fleetId !== 0 && this.isCustomer) url += "&fleet_id=" + fleetId;

    var response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    var data = await response.json();
    this.setListMemberAll(data.result);
    this.props.setValue("listMembers", data.result);
    this.props.setValue("isLoadingTrips", false);
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
      this.props.setValue("vin_no", [listMembers[0].id]);
    } else {
      this.setState({ listMembers, listMembersAll, vin_no: [] });
      this.props.setValue("vin_no", "");
    }

    this.props.setValue("listMembers", listMembers);
    this.props.setValue("listMembersAll", listMembersAll);
  }

  checkDupName(listMembersAll, name) {
    let index = listMembersAll.findIndex((x) => x.value === name);
    return index > 0 ? false : true;
  }

  getVehicleInfo(vid) {
    let { listMembers } = this.state;
    let obj = listMembers.find((x) => x.id === parseInt(vid));
    return obj;
  }

  selectEventDevice(select) {
    let showName = this.props.showName;
    let text = "" + select;
    let selectSp = text.split("_");
    let selectID = "";

    let vehicleInfo = this.getvehicleid(select);
    let vinNo = get(vehicleInfo, "vin_no", "");
    let engine_no =
      showName == "เลขเครื่อง" ? get(vehicleInfo, "engine_no", "") : "";
    let chassis_no =
      showName == "เลขตัวรถ" ? get(vehicleInfo, "vin_no", "") : "";
    let model = showName == "รุ่นรถ" ? get(vehicleInfo, "model", "") : "";

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
      chassis_no,

      startSearch: false,
    });
    this.props.setValue("vin_no", [parseInt(selectID)]);
  }

  onApplyDate(event, picker, name) {
    if (name == "dateStart") {
      let _dateStart = moment(picker.startDate).format("DD/MM/YYYY HH:mm");
      this.setState({ dateStart: _dateStart });
      this.props.setValue("", _dateStart);
    } else {
      let _dateEnd = moment(picker.startDate).format("DD/MM/YYYY HH:mm");
      this.setState({ dateEnd: _dateEnd });
      this.props.setValue("", _dateEnd);
    }
  }

  async searchData() {
    let { listMembers, currentValue } = this.props;
    let { vin_no, dateStart, dateEnd } = this.state;

    this.props.setValue("isLoadingTrips", true);
    let index = listMembers.findIndex((x) => x.int_vehicle_id === vin_no[0]);

    if (index >= 0) {
      let dt = listMembers[index];
      let vehicleName = get(dt, "vehicle_name");
      if (vehicleName == "") vehicleName = get(dt, "license_plate_no");
      if (vehicleName == "") vehicleName = get(dt, "vin_no");
      this.props.setValue("vehicleNameDisplay", vehicleName);
    }

    let userId = this.props.dataLogin.userId || this.props.dataLogin.user_id;
    var response = await fetch(
      YM_BASE_URL +
        "fleet/trips?user_id=" +
        userId +
        // ENDPOINT_REALTIME_V2 + "fleet/V2/tripsTest?user_id=" + this.props.dataLogin.userId +
        "&vid=" +
        currentValue +
        "&start=" +
        moment(dateStart, "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") +
        "&end=" +
        moment(dateEnd, "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss"),
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Accept-Language": this.props.language,
        },
      }
    );

    var data = await response.json();

    let rpm_zone = [],
      option_temperature = [];
    if (data?.code == 200) {
      if (get(data, "rpm_zone")) rpm_zone = data.rpm_zone;
      if (get(data, "option_temperature")) {
        let _temperatuere = [];
        for (let idx in data.option_temperature) {
          _temperatuere.push({
            seq: data.option_temperature[idx].seq,
            name: data.option_temperature[idx].name,
            color: this.getColorIndex(data.option_temperature[idx].seq),
          });
        }
        option_temperature = _temperatuere;
      }

      this.props.setValue("rpm_zone", rpm_zone);
      this.props.setValue("option_temperature", option_temperature);
      this.addFieldData(data.result, this.props.language);
    } else {
      this.props.setValue("dataTrips", []);
      this.props.setValue("rpm_zone", rpm_zone);
      this.props.setValue("option_temperature", option_temperature);
    }
    this.props.setValue("isLoadingTrips", false);
  }

  getColorIndex(seq) {
    let colorTemp = this.props.configtest.chart_colors.option_temperature,
      color = "#000";

    if (seq >= colorTemp.length) return color;
    else return colorTemp[seq - 1];
  }

  addFieldData(data, language) {
    let dataTrips = [];
    for (let index in data) {
      let trip = JSON.parse(JSON.stringify(data[index]));

      if (trip.length == 27) trip[26] = this.setEventName(trip[2], language);
      else trip.push(this.setEventName(trip[2], language));

      dataTrips.push(trip);
    }
    this.props.setValue("dataTrips", dataTrips);
  }

  setEventName(event_id, language) {
    return this.props.eventName[language][event_id];
  }

  render() {
    let {
      fleetList,
      fleetId,
      dealerData,
      selectDealer,
      showName,
      currentValue,
      chassisNoList,
      engineNoList,
      chassisNo,
      configtest,
    } = this.props;
    let {
      startSearch,
      listMembers,
      listMembersAll,
      vin_no,
      dateStart,
      dateEnd,
      customerId,
      customerList,
    } = this.state;

    return (
      <Suspense fallback={null}>
        <WarningAlert />
        <BoxContrainer
          title={"event_log"}
          footer={
            <div style={{ textAlign: "right" }}>
              <Button
                text={"search"}
                icon={<ReloadOutlined />}
                margin={1}
                isAddButton={true}
                onClick={() => {
                  this.searchData();
                }}
              />
            </div>
          }
        >
          <Row>
            <Col lg={6}>
              <DropdownDealer
                data={dealerData}
                selected={selectDealer}
                onChange={(selected) => {
                  this.props.setStateTracking({
                    selectDealer: selected,
                    currentValue: "",
                  });
                  this.getvehicleid(selected);
                }}
              />
            </Col>

            <Col lg={6}>
              <Row>
                <Col lg={6} sm={6}>
                  <FormSelect
                    schema={{ required: "" }}
                    mode={"single"}
                    value={showName}
                    style={{ width: "100%" }}
                    showSearch={false}
                    label={showName}
                    list={[
                      { key: 2, value: "เลขตัวรถ", text: "เลขตัวรถ" },
                      { key: 3, value: "เลขเครื่อง", text: "เลขเครื่อง" },
                    ]}
                    placeholder={""}
                    onChange={(selected) => {
                      this.setState({ showName: selected });
                      this.props.setStateTracking({
                        showName: selected,
                        currentValue: "",
                      });
                    }}
                  />
                </Col>
                <label className="control-label">&nbsp;</label>
                <Col lg={6} sm={5}>
                  <Select
                    showSearch
                    style={{ width: "97%" }}
                    optionFilterProp="children"
                    value={currentValue}
                    onChange={(value, id) => {
                      this.props.setStateTracking({ currentValue: value });
                      this.props.setStateTracking({ chassisNo: id.children });
                    }}
                    onSearch={(input) => {
                      this.setState({
                        startSearch: input !== "" ? true : false,
                      });
                    }}
                  >
                    {showName === "เลขเครื่อง"
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
                </Col>
              </Row>
            </Col>

            {!this.isDealer && (
              <Col lg={6} md={12}>
                <FormDatepickerNew
                  schema={""}
                  startDate={dateStart}
                  endDate={dateEnd}
                  value={dateStart + " - " + dateEnd}
                  label={"history_4"}
                  placeholder={"DD/MM/YYYY HH:mm"}
                  flex={1}
                  timePicker={true}
                  onApply={(e, picker) => {
                    let dateStart = picker.startDate.format("DD/MM/YYYY HH:mm");
                    let dateEnd = picker.endDate.format("DD/MM/YYYY HH:mm");

                    this.setState({ dateStart, dateEnd });
                    this.props.setValue("dateStart", dateStart);
                    this.props.setValue("dateEnd", dateEnd);
                  }}
                />
              </Col>
            )}
          </Row>

          {this.isDealer && (
            <Row>
              <Col lg={6} md={12}>
                <FormDatepickerNew
                  schema={""}
                  startDate={dateStart}
                  endDate={dateEnd}
                  value={dateStart + " - " + dateEnd}
                  label={"history_4"}
                  placeholder={"DD/MM/YYYY HH:mm"}
                  flex={1}
                  timePicker={true}
                  onApply={(e, picker) => {
                    let dateStart = picker.startDate.format("DD/MM/YYYY HH:mm");
                    let dateEnd = picker.endDate.format("DD/MM/YYYY HH:mm");

                    this.setState({ dateStart, dateEnd });
                    this.props.setValue("dateStart", dateStart);
                    this.props.setValue("dateEnd", dateEnd);
                  }}
                />
              </Col>
            </Row>
          )}
        </BoxContrainer>

        <BoxContrainer>
          <div
            style={{ textAlign: "right", marginBottom: "5px", marginTop: "0" }}
          >
            <Button
              text={"history_94"}
              icon={<GlobalOutlined />}
              onClick={() => {
                if (this.props.indexTripSelected.length === 0) {
                  this.props.setValue("isWarning", true);
                } else {
                  this.props.history.push("/TrackingHistory-Route");
                  this.props.getHistoryData(1);
                }
              }}
            />

            <TripExport />
          </div>
          <Row>
            <Col lg={12}>
              <DataTable />
            </Col>
          </Row>
        </BoxContrainer>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  header: state.signin.header,
  language: state.versatile.language,
  dataLogin: state.signin.dataLogin,
  vehicle_name: state.trackingHistory.vehicle_name,
  vin_no: state.trackingHistory.vin_no,
  dateStart: state.trackingHistory.dateStart,
  dateEnd: state.trackingHistory.dateEnd,
  period: state.trackingHistory.period,
  dataTrips: state.trackingHistory.dataTrips,
  eventName: state.trackingHistory.eventName,
  indexTripSelected: state.trackingHistory.indexTripSelected,
  customerList: state.trackingHistory.customerList,
  listMembers: state.trackingHistory.listMembers,
  listMembersAll: state.trackingHistory.listMembersAll,
  customerId: state.trackingHistory.customerId,
  fleetList: state.trackingHistory.fleetList,
  fleetId: state.trackingHistory.fleetId,
  configtest: state.signin.configtest,
  dealerData: state.trackingHistory.dealerData,
  selectDealer: state.trackingHistory.selectDealer,
  currentValue: state.trackingHistory.currentValue,
  modelList: state.trackingHistory.modelList,
  chassisNoList: state.trackingHistory.chassisNoList,
  engineNoList: state.trackingHistory.engineNoList,
  showName: state.trackingHistory.showName,
  chassisNo: state.trackingHistory.chassisNo,
  // objectVisibled: state.trackingHistory.objectVisibled
});

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) =>
    dispatch(TrackingHistoryActions.setValue(name, value)),
  getHistoryData: (data) =>
    dispatch(TrackingHistoryActions.getHistoryData(data)),
  setStateTracking: (name, value) =>
    dispatch(TrackingHistoryActions.setStateTracking(name, value)),
  setConfig: (data) => dispatch(SigninActions.setConfig(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackingHistory);

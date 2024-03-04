import React, { Component } from "react";
import { connect } from "react-redux";
import MaintenanceActions from "../../Redux/MaintenanceRedux";
import { Row, Col } from "antd";
import { t } from "../../Components/Translation";
import Alert from "../../Components/Alert";
import FormSelectSearch from "../../Components/FormControls/FormSelectSearch";
import FormDatepickerNew from "../../Components/FormControls/FormDatepickerNew";
import moment from "moment";
import "moment/locale/th";
import {
  ENDPOINT_BASE_URL,
  ENDPOINT_BASE_URL_YNM4,
} from "../../Config/app-config";
import { get, isEmpty, parseInt } from "lodash";
import FormSelect from "../../Components/FormControls/Basic/FormSelect";
import DataTable from "./DataTable";
import OtherReportActions from "../../Redux/OtherReportRedux";
import { Select } from "antd";
import { BoxContrainer, Button } from "../../components_new";
import axios from "axios";
import DataSource from "devextreme/data/data_source";
import ArrayStore from "devextreme/data/array_store";

export const dataStore = new ArrayStore({ key: "id", data: [] });
var dataSource;

const { Option } = Select;

const DateRangePicker = (arg) => {
  return (
    <div
      className="form-group field field-string"
      style={{ padding: "0 10px", flex: 1 }}
    >
      <label className="control-label" style={{ fontWeight: 500 }}>
        {t("date_Range")} :
      </label>
      <FormDatepickerNew
        timePicker={false}
        select_change={arg.select_change}
        language={arg.language}
        startDate={arg.startDate}
        endDate={arg.endDate}
        maxDate={arg.eDate}
      ></FormDatepickerNew>
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

const DropdownCustomer = (arg) => {
  return (
    <FormSelect
      mode={"multiple"}
      value={arg.selected.length == 0 ? [] : arg.selected}
      label={"summary_84"}
      list={arg.data.map((element, i) => {
        return {
          key: i,
          value: element.partner_id,
          text:
            (element.prefix ? element.prefix + " " : "") +
            (element.firstname ? element.firstname : "") +
            (element.lastname ? " " + element.lastname : "") +
            (element.suffix ? " " + element.suffix : ""),
        };
      })}
      placeholder={"summary_84"}
      flex={1}
      onChange={(selected) => {
        var lastItem = selected[selected.length - 1];
        let select = selected;

        if ([0, -1].includes(lastItem)) {
          select = lastItem;
        } else {
          let idx = select.findIndex((id) => id === 0 || id === -1);

          if (idx > -1) {
            const index = select.indexOf(select[idx]);
            if (index > -1) {
              select.splice(index, 1);
            }
          }
        }
        if (!isEmpty(selected)) arg.onChange(select);
      }}
    />
  );
};

const TODAYSTART = moment().set({
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0,
});
const TODAYEND = moment().set({
  hour: 23,
  minute: 59,
  second: 59,
  millisecond: 59,
});
const WORDEVETNAME = {
  en: {
    Notification_M_10001: "Engine Lamp",
    Notification_M_10008: "Remind Battery Low",
    Notification_M_11000: "แจ้งเตือนการเข้าเช็คระยะ 50 ชม.แรก",
    Notification_M_11001: "แจ้งเตือนการเข้าเช็คระยะทุก 250 ชม.",
    Notification_M_3001: "แจ้งเตือนออกนอกพื้นที่ที่กำหนด",
    Notification_M_1008: "แจ้งเตือนน้ำมันเชื้อเพลิงลดลงผิดปกติ",
    Notification_M_20004: "แจ้งเตือน GPS ถูกถอด",
    Notification_M_11113: "แจ้งเตือนแบตเตอรี่ถูกถอด",
    Notification_M_20002: "แจ้งเตือนอุณหภูมิน้ำหล่อเย็น",
    Notification_M_20003: "แจ้งเตือนอุณหภูมิน้ำมันไฮดรอลิค",
    Notification_M_3002: "แจ้งเตือนออกนอกประเทศ",
  },
  th: {
    Notification_M_10001: "ไฟเครื่องยนต์เตือน", //use
    Notification_M_10008: "เตือนแบตเตอรี่ต่ำ", //use
    Notification_M_11000: "แจ้งเตือนการเข้าเช็คระยะ 50 ชม.แรก",
    Notification_M_11001: "แจ้งเตือนการเข้าเช็คระยะทุก 250 ชม.",
    Notification_M_3001: "แจ้งเตือนออกนอกพื้นที่ที่กำหนด",
    Notification_M_1008: "แจ้งเตือนน้ำมันเชื้อเพลิงลดลงผิดปกติ",
    Notification_M_20004: "แจ้งเตือน GPS ถูกถอด",
    Notification_M_11113: "แจ้งเตือนแบตเตอรี่ถูกถอด",
    Notification_M_20002: "แจ้งเตือนอุณหภูมิน้ำหล่อเย็น",
    Notification_M_20003: "แจ้งเตือนอุณหภูมิน้ำมันไฮดรอลิค",
    Notification_M_3002: "แจ้งเตือนออกนอกประเทศ",
  },
  ja: {
    Notification_M_10001: "Engine Lamp",
    Notification_M_10008: "Remind Battery Low",
    Notification_M_11000: "แจ้งเตือนการเข้าเช็คระยะ 50 ชม.แรก",
    Notification_M_11001: "แจ้งเตือนการเข้าเช็คระยะทุก 250 ชม.",
    Notification_M_3001: "แจ้งเตือนออกนอกพื้นที่ที่กำหนด",
    Notification_M_1008: "แจ้งเตือนน้ำมันเชื้อเพลิงลดลงผิดปกติ",
    Notification_M_20004: "แจ้งเตือน GPS ถูกถอด",
    Notification_M_11113: "แจ้งเตือนแบตเตอรี่ถูกถอด",
    Notification_M_20002: "แจ้งเตือนอุณหภูมิน้ำหล่อเย็น",
    Notification_M_20003: "แจ้งเตือนอุณหภูมิน้ำมันไฮดรอลิค",
    Notification_M_3002: "แจ้งเตือนออกนอกประเทศ",
  },
};

class Maintenance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertSetting: {
        show: false,
        type: 5,
      },
      listMembers: [],
      listMembersAlls: [],
      dealer: [],
      startSearch: false,
      prm_start_date: TODAYSTART.format("YYYY-MM-DD HH:mm:ss"),
      prm_stop_date: TODAYEND.format("YYYY-MM-DD HH:mm:ss"),
      startDate: TODAYSTART,
      endDate: TODAYEND,
      strStartEndDate:
        TODAYSTART.format("DD/MM/YYYY HH:mm") +
        " - " +
        TODAYEND.format("DD/MM/YYYY HH:mm"),
      event: [
        "11000",
        "11001",
        "20004",
        "111111",
        "20002",
        "20003",
        "10001",
        "10008",
        "1008",
      ],
      data: [],
      company: [],
      companyData: [],
      vehicleslist: [],
      dataSource: new DataSource({
        store: dataStore,
        reshapeOnPush: true,
      }),
    };
    this.startDate = "";
    this.stopDate = "";
    this.selectCustomer = [0];
    this.cust_id_list = [12391];
    this.selectEvent = [
      "11000",
      "11001",
      "20004",
      "20002",
      "20003",
      "10001",
      "10008",
      "1008",
    ];
    this.isHino = false;
    dataSource = new DataSource({
      store: dataStore,
      reshapeOnPush: true,
    });
  }

  componentWillMount() {
    let {
      searchData,
      customerSelected,
      dealerSelected,
      eventSelected,
      dataLogin,
      dealer_id,
    } = this.props;

    this.isHino = [1, 2, 11, 12, 21, 22].includes(dataLogin.userLevelId);

    this.selectCustomer = customerSelected;
    if (!isEmpty(eventSelected)) {
      eventSelected.length > 0 && (this.selectEvent = eventSelected);
    }

    if (!isEmpty(searchData)) {
      this.startDate = searchData.start_date;
      this.stopDate = searchData.stop_date;
      this.setState({ event: searchData.event, company: searchData.company });
    } else {
      this.setInitailDate();
      if (this.isHino) this.load_manage_customer();
    }
    this.getalldata();
    this.getvehicleid((dealer_id = "all"));
  }

  componentWillUnmount() {
    dataStore.clear();
  }

  async getalldata() {
    try {
      var response = await fetch(
        // ENDPOINT_BASE_URL_YNM2 + "fleet/getV",
        ENDPOINT_BASE_URL_YNM4 + "fleet/getV",
        // "http://192.168.7.39:5001/prod/fleet/getV",

        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: this.props.dataLogin.userId,
          }),
        }
      );
      var data = await response.json();
      if (data?.code === 200) {
        let dealerList = data?.result;
        dealerList.unshift({
          dealer_id: 0,
          dealer_name: "my_vehicles_92",
        });
        this.props.setStateMaintenance({
          dealerData: dealerList,
          selectDealer: 0,
        });
      } else this.props.setStateMaintenance({ dealerData: [] });
    } catch (error) {
      this.props.setStateMaintenance({ dealerData: [] });
    }
  }

  setInitailDate() {
    let selected_date = "",
      startDate = "",
      endDate = "";

    if (
      moment().format("DD/MM/YYYY") ==
      moment().startOf("month").format("DD/MM/YYYY")
    ) {
      startDate = moment().subtract(1, "month").format("DD/MM/YYYY");
      endDate = moment().subtract(1, "day").format("DD/MM/YYYY");
    } else {
      startDate = moment().startOf("month").format("DD/MM/YYYY");
      endDate = moment().subtract(1, "days").format("DD/MM/YYYY");
    }
    selected_date = startDate + " - " + endDate;
    this.startDate = moment(startDate, "DD/MM/YYYY").format("YYYY-MM-DD");
    this.stopDate = moment(endDate, "DD/MM/YYYY").format("YYYY-MM-DD");
  }

  async getMessageData() {
    this.setAlertSetting(true, 5);
    let event = [],
      cust_id_list = this.selectCustomer;
    for (let index in this.selectEvent) {
      event.push(parseInt(this.selectEvent[index]));
    }

    if (this.selectCustomer === 0) cust_id_list = this.props.allCustomer;
    if (this.selectCustomer === -1) cust_id_list = [-1];

    let searchData = {
      event: this.state.event,
      company: this.state.company,
      start_date: this.state.prm_start_date,
      stop_date: this.state.prm_stop_date,
    };
    let vid_list = [];
    let name = this.props.showName;
    let value = this.props.currentValue;
    if (value === "") {
      let result = this.props.chassisNoList.map((item) => item.id);
      vid_list.push(...result);
    } else if (name === "เลขเครื่อง" || name === "เลขตัวรถ") {
      vid_list.push(value);
    } else {
      let code = this.props.byModelCode.find((item) => item[value]);
      vid_list.push(...code[value]);
    }

    let data = [],
      response = "",
      isLastKey = false;
    try {
      do {
        response = await this.getMessage(
          event,
          isLastKey,
          response.LastEvaluatedKey,
          response.lent_array_custid,
          cust_id_list
        );
        response.result.length > 0 && data.push(...response.result);

        let total = vid_list.length;

        let percent = parseInt(100 - (response.Vehicle_count / total) * 100);
        this.setAlertSetting(true, 5, `${percent} %`);

        if (
          response.LastEvaluatedKey.vid_list ||
          response.lent_array_custid >= 0
        ) {
          isLastKey = true;
        } else {
          isLastKey = false;
        }
        // isLastKey = false
      } while (isLastKey);

      let newData = this.addEventName(data);
      if (newData.length > 0) {
        // let dataInsert = newData.map((item) => ({
        //   type: "insert",
        //   data: item,
        // }));
        // console.log("dataInsert", dataInsert);
        const mappingDataToArray = (data) => {
          let result = data.map((dt) => [
            dt.id,
            dt.unix,
            dt.event_id,
            dt.vid,
            dt.licenseplate,
            dt.vehicle_name,
            dt.engine_no,
            dt.current_engine_hour,
            dt.class_type,
            dt.model,
            dt.driver_name,
            dt.vin_no,
            dt.readed,
            dt.condition_val,
            dt.gpsdate,
            dt.acc,
            dt.fuel_percent,
            dt.lat,
            dt.lng,
            dt.course,
            dt.speed,
            dt.card_id,
            dt.card_stat,
            dt.mileage,
            dt.location,
            dt.location_name_3,
            dt.location_name_2,
            dt.location_name_1,
            dt.cust_id,
            dt.cust_name,
            dt.appointment,
            dt.followed,
            dt.is_normal,
            dt.remark,
            dt.current_mileage,
            dt.status,
            dt.official_tel,
            dt.seller,
            dt.leased_no,
            dt.delivery_date,
            dt.maintenance_value,
            dt.note,
            dt.event_name,
          ]);
          return result;
        };
        let newdataStore = new ArrayStore({
          type: "array",
          key: "0",
          data: mappingDataToArray(newData),
        });

        this.setState({
          dataSource: new DataSource({
            store: newdataStore,
            reshapeOnPush: true,
          }),
        });
        // dataStore._array = [
        //   ...new Map(dataStore._array.map((v) => [v.id, v])).values(),
        // ];
        // dataSource.reload();
      }
      this.props.setMessageData(newData, searchData, this.props.language);
      this.setAlertSetting(false, 5);
    } catch {
      this.props.setMessageData([], searchData, this.props.language);
      this.setAlertSetting(false, 5);
    }
  }

  getVehicleInfo(vid) {
    let { listMembers } = this.state;
    let obj = listMembers.find((x) => x.id === parseInt(vid));
    return obj;
  }
  async getvehicleid(dealer_id) {
    let dealer = "";
    if (dealer_id === 0) {
      dealer = "all";
    } else {
      dealer = dealer_id;
    }
    let body = {
      user_id: this.props.dataLogin.userId,
      dealer_id: dealer,
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
      this.props.setStateMaintenance({
        modelList: model,
        chassisNoList: chassisNo,
        engineNoList: engineNo,
        byModelCode: by_model_code,
      });
    } catch (error) {
      console.log(error);
    }
  }

  selectEventDevice(select) {
    let text = "" + select;
    let selectSp = text.split("_");
    let selectID = "";
    let showName = this.props.showName;

    let vehicleInfo = this.getvehicleid(select);
    let vinNo = get(vehicleInfo, "vid", "");
    let engine_no =
      showName == "เลขเครื่อง" ? get(vehicleInfo, "engine_no", "") : "";
    let chassis_no =
      showName == "เลขตัวรถ" ? get(vehicleInfo, "vin_no", "") : "";
    let model = showName == "รุ่นรถ" ? get(vehicleInfo, "model", "") : "";

    if (selectSp.length > 1) {
      selectID = selectSp[0];
      selectSp[3] === "n1"
        ? (showName = "รุ่นรถ")
        : selectSp[3] === "n2"
        ? (showName = "เลขตัวรถ")
        : selectSp[3] === "n3"
        ? (showName = "เลขเครื่อง")
        : (showName = "");
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
    //this.props.setValue("vin_no", [parseInt(selectID)])
  }

  async getMessage(
    _event,
    isLastKey,
    LastEvaluatedKey,
    lent_array_custid,
    showName,
    currentValue
  ) {
    let vid_list = [];
    let name = this.props.showName;
    let value = this.props.currentValue;
    if (value === "") {
      let result = this.props.chassisNoList.map((item) => item.id);
      vid_list.push(...result);
    } else if (name === "เลขเครื่อง" || name === "เลขตัวรถ") {
      vid_list.push(value);
    } else {
      let code = this.props.byModelCode.find((item) => item[value]);
      vid_list.push(...code[value]);
    }
    let body = {
      vid_list,
      user_id: this.props.dataLogin.userId,
      start_date: this.state.prm_start_date,
      stop_date: this.state.prm_stop_date.replace("00:00:00", "23:59:59"),
      event_list: _event,
    };
    if (isLastKey) body.vid_list = LastEvaluatedKey.vid_list;
    if (isLastKey) body.lent_array_custid = lent_array_custid;

    // var response = await fetch("http://10.8.0.5:5000/prod/" + "fleet/history/notify", {
    //var response = await fetch(`http://192.168.7.205:8282/prod/fleet/history/notify`
    var response = await fetch(
      //  ENDPOINT_BASE_URL_YNM2 + `fleet/history/notify`,
      ENDPOINT_BASE_URL_YNM4 + "fleet/history/notify",
      // "http://192.168.7.39:5001/prod/fleet/history/notify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": this.props.language,
        },
        body: JSON.stringify(body),
      }
    );
    var data = await response.json();

    if (data?.code == 200) {
      return data;
    } else return {};

    // axios
    //   .post(
    //     "https://yanmar-qa.onelink-iot.com/prod/fleet/history/notify",
    //     body,
    //     { mode: "no-cors" }
    //   )
    //   .then((res) => console.log(res));

    // await axios({
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     "Accept-Language": this.props.language,
    //   },
    //   url: "https://yanmar-qa.onelink-iot.com/prod/fleet/history/notify",
    //   data: body,
    // })
    // .create({
    //   baseURL: "https://yanmar-qa.onelink-iot.com/prod/",
    //   timeout: 300000,
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     "Accept-Language": this.props.language,
    //   },
    // })
    // .post("fleet/history/notify", body)
    // .then((res) => {
    //   var data = res.data;

    //   console.log(data);
    //   if (data?.code == 200) {
    //     return data;
    //   } else return {};
    // });

    // const requestMetadata = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     accept: "application/json",
    //   },
    //   body: JSON.stringify(body),
    // };

    // await fetch(
    //   `https://yanmar-qa.onelink-iot.com/prod/fleet/history/notify`,
    //   requestMetadata
    // ).then((res) => {
    //   var data = res.data;
    //   console.log(data);
    //   if (data?.code == 200) {
    //     return data;
    //   } else return {};
    // });

    // const xhr = new XMLHttpRequest();
    // xhr.open(
    //   "POST",
    //   "https://yanmar-qa.onelink-iot.com/prod/fleet/history/notify"
    // );
    // xhr.setRequestHeader(
    //   "Content-Type",
    //   "application/json",
    //   "Accept",
    //   "application/json"
    // );

    // xhr.send(JSON.stringify(body));
    // console.log(xhr.responseText);

    // var settings = {
    //   url: "https://yanmar-qa.onelink-iot.com/prod/fleet/history/notify",
    //   method: "POST",
    //   timeout: 0,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: JSON.stringify({
    //     vid_list: [44080, 43241, 39941],
    //     user_id: 14497,
    //     start_date: "2023-06-01 00:00:00",
    //     stop_date: "2023-06-01 23:59:59",
    //     event_list: [11000, 11001, 20004, 20002, 20003, 10001, 10008, 1008],
    //   }),
    // };
    // ajax(settings).done(function (response) {
    //   console.log(response);
    // });
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

  async load_manage_customer() {
    let dealer_id = 0;
    var response = await fetch(ENDPOINT_BASE_URL_YNM4 + "fleet/get_customer", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: this.props.dataLogin.userId,
        dealer_id: dealer_id,
      }),
    });

    var data = await response.json();

    if (data.length > 0) {
      let companyData = data,
        company = [];
      for (let index in data) {
        company.push(data[index].partner_id);
      }
      companyData.unshift(
        {
          firstname: "my_vehicles_92",
          lastname: null,
          partner_id: 0,
          prefix: null,
          suffix: null,
        },
        {
          firstname: "dropdown_1",
          lastname: null,
          partner_id: -1,
          prefix: null,
          suffix: null,
        }
      );

      this.selectCustomer = companyData[0].partner_id;
      this.props.setStateMapControlNoti("companyData", companyData);
      this.props.setStateMapControlNoti("allCustomer", company);
      this.setState({ company: company });
    } else {
      this.selectCustomer = [];
      this.setState({ companyData: [], company: [] });
    }
  }

  shouldComponentUpdate(nextProps) {
    let { searchData, selectAll } = this.props;

    if (nextProps.selectAll !== selectAll) return true;
    if (nextProps.searchData !== searchData) return false;
    return true;
  }

  setAlertSetting(isShow, type, content = "") {
    let { alertSetting } = this.state;
    alertSetting.show = isShow;
    alertSetting.type = type;
    alertSetting.content = content;
    this.setState({ alertSetting });
  }

  onApplyEvent(dataObject) {
    this.startDate = dataObject.startDate.format("YYYY-MM-DD");
    this.stopDate = dataObject.endDate.format("YYYY-MM-DD");

    let prm_start_date = dataObject.startDate.format("YYYY-MM-DD HH:mm:ss");
    let prm_stop_date = dataObject.endDate.format("YYYY-MM-DD HH:mm:ss");

    if (
      prm_start_date !== this.state.prm_start_date ||
      prm_stop_date !== this.state.prm_stop_date
    ) {
      this.setState({
        prm_start_date,
        prm_stop_date,
        fileNameDate:
          dataObject.startDate.format("DD-MM-YYYY HH_mm") +
          " to " +
          dataObject.endDate.format("DD-MM-YYYY HH_mm"),
      });
    }
  }

  render() {
    let { alertSetting, vin_no, startSearch, listMembers, listMembersAlls } =
      this.state;
    let {
      showName,
      dealerData,
      selectDealer,
      modelList,
      chassisNoList,
      engineNoList,
      currentValue,
    } = this.props;

    return (
      <>
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

        <BoxContrainer
          footer={
            <div style={{ textAlign: "right" }}>
              <Button
                isSearchButton={true}
                onClick={() => this.getMessageData()}
              />
            </div>
          }
        >
          <Row>
            <Col lg={12} md={12} sm={12}>
              <DropdownDealer
                data={dealerData}
                selected={selectDealer}
                onChange={(selected) => {
                  this.props.setStateMaintenance({
                    selectDealer: selected,
                    currentValue: "",
                  });
                  this.getvehicleid(selected);
                }}
              />
            </Col>
            <Col lg={12} md={12} sm={12}>
              <Row>
                <Col lg={12} md={12} xs={12}>
                  <div id="selected-1">
                    <FormSelect
                      schema={{ required: "" }}
                      mode={"single"}
                      value={showName}
                      padding="0px 0px 0px 10px"
                      style={{ width: "100%" }}
                      showSearch={false}
                      label={showName}
                      list={[
                        { key: 1, value: "รุ่นรถ", text: "รุ่นรถ" },
                        { key: 2, value: "เลขตัวรถ", text: "เลขตัวรถ" },
                        { key: 3, value: "เลขเครื่อง", text: "เลขเครื่อง" },
                      ]}
                      placeholder={""}
                      onChange={(selected) => {
                        this.props.setStateMaintenance({
                          showName: selected,
                          currentValue: "",
                        });
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
                      mode={"single"}
                      showSearch
                      style={{ width: "100%" }}
                      optionFilterProp="children"
                      value={currentValue}
                      onChange={(value) =>
                        this.props.setStateMaintenance({ currentValue: value })
                      }
                      onSearch={(input) => {}}
                    >
                      {showName === "รุ่นรถ"
                        ? modelList.map((item) => (
                            <Option key={item.id} value={item.id}>
                              {item.value}
                            </Option>
                          ))
                        : showName === "เลขเครื่อง"
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
          </Row>

          <Row>
            <Col lg={12} md={12} sm={12}>
              <FormSelectSearch
                mode={"multiple"}
                schema={{ required: [""] }}
                value={this.selectEvent}
                label={"event"}
                list={[
                  {
                    key: 11000,
                    value: "Notification_M_11000",
                  },
                  {
                    key: 11001,
                    value: "Notification_M_11001", // 250 hour
                  },
                  {
                    key: 3001,
                    value: "Notification_M_3001", //resiteced area
                  },
                  {
                    key: 1008,
                    value: "Notification_M_1008", //fuel
                  },
                  {
                    key: 20004,
                    value: "Notification_M_20004", //gps disable
                  },
                  {
                    key: 11113,
                    value: "Notification_M_11113", //batt disable
                  },
                  {
                    key: 20002,
                    value: "Notification_M_20002", //coolent temp
                  },
                  {
                    key: 20003,
                    value: "Notification_M_20003", //hydrolic temp
                  },
                  {
                    key: 10001,
                    value: "Notification_M_10001", //Engine lamp
                  },
                  {
                    key: 10008,
                    value: "Notification_M_10008", //batt low
                  },
                  {
                    key: 3002,
                    value: "Notification_M_3002",
                  },
                  // 11000 ,11100,11110,11111,11112,11113,11114,11115,10001,10008
                ]}
                fieldForm={"event"}
                placeholder={""}
                flex={1}
                onChange={(selected) => {
                  this.selectEvent = selected;
                  this.props.setStateMapControlNoti("eventSelected", selected);
                }}
              />
            </Col>

            <Col lg={12} md={12} sm={12}>
              <DateRangePicker
                select_change={this.onApplyEvent.bind(this)}
                language={this.props.language}
                maxDate={this.state.eDate}
                startDate={moment(this.startDate).format("DD/MM/YYYY")}
                endDate={moment(this.stopDate).format("DD/MM/YYYY")}
              />
            </Col>
          </Row>
        </BoxContrainer>

        <BoxContrainer title="side_menu_10">
          <div style={{ height: `calc(100vh - 480px)` }}>
            <DataTable
              dataStore={dataStore}
              dataSource={this.state.dataSource}
              onChangeData={(data) => {
                this.setState({ dataSource: data });
              }}
            />
          </div>
        </BoxContrainer>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  searchData: state.maintenance.searchData,
  languageLocation: state.maintenance.languageLocation,
  language: state.versatile.language,
  companyData: state.maintenance.companyData,
  companyDataDealer: state.maintenance.companyDataDealer,
  allCustomer: state.maintenance.allCustomer,
  allDealer: state.maintenance.allDealer,
  selectAll: state.maintenance.selectAll,
  customerSelected: state.maintenance.customerSelected,
  dealerSelected: state.maintenance.dealerSelected,
  eventSelected: state.maintenance.eventSelected,
  dealerData: state.maintenance.dealerData,
  selectDealer: state.maintenance.selectDealer,
  currentValue: state.maintenance.currentValue,
  modelList: state.maintenance.modelList,
  chassisNoList: state.maintenance.chassisNoList,
  engineNoList: state.maintenance.engineNoList,
  showName: state.maintenance.showName,
  byModelCode: state.maintenance.byModelCode,
});

const mapDispatchToProps = (dispatch) => ({
  setMessageData: (data, searchData, languageLocation) =>
    dispatch(
      MaintenanceActions.setMessageData(data, searchData, languageLocation)
    ),
  setStateMapControlNoti: (name, value) =>
    dispatch(MaintenanceActions.setStateMapControlNoti(name, value)),
  setSelectAll: (isSelectAll) =>
    dispatch(MaintenanceActions.setSelectAll(isSelectAll)),
  setReportSelected: (reportId) =>
    dispatch(OtherReportActions.setReportSelected(reportId)),
  setValue: (name, value) => dispatch(MaintenanceActions.setValue(name, value)),
  setStateMaintenance: (name, value) =>
    dispatch(MaintenanceActions.setStateMaintenance(name, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Maintenance);

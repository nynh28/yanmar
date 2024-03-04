import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import NotificationRedux from "../../Redux/NotificationRedux";
import { Row, Col } from "antd";
import PannelBox from "../../Components/PannelBox";
import { t } from "../../Components/Translation";
import Alert from "../../Components/Alert";
import FormSelectSearch from "../../Components/FormControls/FormSelectSearch";
import FormSelect from "../../Components/FormControls/Basic/FormSelect";
import FormSelectGroup from "../../Components/FormControls/FormSelectGroup";
import FormDatepickerNew from "../../Components/FormControls/FormDatepickerNew";
// import DateRangePicker from 'react-bootstrap-daterangepicker-maxspan';
import moment from "moment";
import "moment/locale/th";
import {
  ENDPOINT_BASE_URL,
  ENDPOINT_BASE_URL_YNM2,
  ENDPOINT_BASE_URL_YNM4,
} from "../../Config/app-config";
import { get, isEmpty } from "lodash";
import DataTable from "./DataTable";
import { Select } from "antd";
import { BoxContrainer, Button } from "../../components_new";

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
    Notification_M_11110: "แจ้งเตือนออกนอกประเทศ",
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
    Notification_M_11110: "แจ้งเตือนออกนอกประเทศ",
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
    Notification_M_11110: "แจ้งเตือนออกนอกประเทศ",
    Notification_M_3001: "แจ้งเตือนออกนอกพื้นที่ที่กำหนด",
    Notification_M_1008: "แจ้งเตือนน้ำมันเชื้อเพลิงลดลงผิดปกติ",
    Notification_M_20004: "แจ้งเตือน GPS ถูกถอด",
    Notification_M_11113: "แจ้งเตือนแบตเตอรี่ถูกถอด",
    Notification_M_20002: "แจ้งเตือนอุณหภูมิน้ำหล่อเย็น",
    Notification_M_20003: "แจ้งเตือนอุณหภูมิน้ำมันไฮดรอลิค",
    Notification_M_3002: "แจ้งเตือนออกนอกประเทศ",
  },
};

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertSetting: {
        show: false,
        type: 5,
      },
      startSearch: false,
      listMembers: [
        {
          id: 21512,
          int_vehicle_id: 21512,
          vehicle_name: "",
          vin_no: "MNKFL8JT1XHX13384",
          license_plate_no: "72-4049",
        },
        {
          id: 11268,
          int_vehicle_id: 11268,
          vehicle_name: "",
          vin_no: "CWM430H03106",
          license_plate_no: "70-3761",
        },
        {
          id: 17442,
          int_vehicle_id: 17442,
          vehicle_name: "",
          vin_no: "MNKFM1AN1XHX14974",
          license_plate_no: "72-3558",
        },
        {
          id: 26381,
          int_vehicle_id: 26381,
          vehicle_name: "",
          vin_no: "MNKFM2PK1XHX12083",
          license_plate_no: "71-1552",
        },
        {
          id: 26382,
          int_vehicle_id: 26382,
          vehicle_name: "1",
          vin_no: "MNKFM2PK1XHX12084",
          license_plate_no: "71-1553",
        },
      ],
      listMembersAll: [
        {
          id: "21512_0_0_n1",
          value: "72-4049",
        },
        {
          id: "21512_0_1_n2",
          value: "",
        },
        {
          id: "21512_0_2_n3",
          value: "MNKFL8JT1XHX13384",
        },
        {
          id: "11268_1_3_n1",
          value: "70-3761",
        },
        {
          id: "11268_1_4_n3",
          value: "CWM430H03106",
        },
        {
          id: "17442_2_5_n1",
          value: "72-3558",
        },
        {
          id: "17442_2_6_n3",
          value: "MNKFM1AN1XHX14974",
        },
        {
          id: "26381_3_7_n1",
          value: "71-1552",
        },
        {
          id: "26381_3_8_n3",
          value: "MNKFM2PK1XHX12083",
        },
        {
          id: "26382_4_9_n1",
          value: "71-1553",
        },
        {
          id: "26382_4_10_n3",
          value: "MNKFM2PK1XHX12084",
        },
        {
          id: "24464_5_11_n1",
          value: "72-4580",
        },
        {
          id: "24464_5_12_n3",
          value: "MNKFC9JJ1XHX11830",
        },
      ],
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
    };
    // this.handleEvent = this.handleEvent.bind(this)
    this.startDate = "";
    this.stopDate = "";
    this.selectCustomer = [0];
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
  }

  componentWillMount() {
    let { searchData, dealer_id, eventSelected } = this.props;
    // let obj = {}
    if (!isEmpty(searchData)) {
      this.startDate = searchData.start_date;
      this.stopDate = searchData.stop_date;
      this.setState({ event: searchData.event });
    } else {
      this.setInitailDate();
      this.load_manage_dealer();
    }
    this.getalldata();
    this.getvehicleid((dealer_id = "all"));
    this.loadListMember();
  }

  componentDidMount() {}

  async loadListMember(cust_id, fleetId) {
    let userId = this.props.dataLogin.userId;
    let url =
      ENDPOINT_BASE_URL_YNM4 +
      "fleet/dropdown?user_id=" +
      userId +
      "&options=VEHICLE";

    // if (this.isDealer) url += "&cust_id=" + cust_id
    // if (fleetId !== 0 && this.isCustomer) url += "&fleet_id=" + fleetId

    var response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    var data = await response.json();

    this.setListMemberAll(data.result);
  }

  setInitailDate() {
    let selected_date = "",
      startDate = "",
      endDate = "";

    // if (moment().format("DD/MM/YYYY") == moment().startOf('month').format("DD/MM/YYYY")) {
    //   startDate = moment().subtract(1, 'month').format("DD/MM/YYYY")
    //   endDate = moment().subtract(1, 'day').format('DD/MM/YYYY')
    // }
    // else {
    //   startDate = moment().startOf('month').format("DD/MM/YYYY")
    //   endDate = moment().subtract(1, 'days').format("DD/MM/YYYY")
    // }

    startDate = moment().startOf("month").format("DD/MM/YYYY");
    endDate = moment().format("DD/MM/YYYY");

    selected_date = startDate + " - " + endDate;
    this.startDate = moment(startDate, "DD/MM/YYYY").format("YYYY-MM-DD");
    this.stopDate = moment(endDate, "DD/MM/YYYY").format("YYYY-MM-DD");
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { searchData } = this.props;

    if (nextProps.searchData !== searchData) return false;
    return true;
  }

  //#region  GET NOITFICATION MASSAGE
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
        console.log("percent", percent);
        console.log("data :", response.Vehicle_count);
        console.log("total:", vid_list.length);

        if (
          response.LastEvaluatedKey.vid_list ||
          response.lent_array_custid >= 0
        ) {
          console.log("ma law : ", response.LastEvaluatedKey);
          isLastKey = true;
        } else {
          isLastKey = false;
        }
        // isLastKey = false
      } while (isLastKey);

      let newData = this.addEventName(data);
      console.log("newdata", newData);
      this.props.setMessageData(newData, searchData, this.props.language);
      this.setAlertSetting(false, 5);
    } catch {
      this.props.setMessageData([], searchData, this.props.language);
      this.setAlertSetting(false, 5);
    }
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
    var response = await fetch(
      ENDPOINT_BASE_URL_YNM4 + `fleet/history/notify`,
      //var response = await fetch(`http://192.168.7.205:8282/prod/fleet/history/notify`
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

    if (data?.code == 200) {
      return data;
    } else return {};
  }

  async load_manage_dealer() {
    try {
      // var response = await fetch(ENDPOINT_BASE_URL + "fleet/get_dealer_by_manage", {
      // method: 'POST',
      // var response = await fetch("http://10.8.0.6:5000/prod/" + "fleet/dropdown"
      var response = await fetch(
        ENDPOINT_BASE_URL +
          "fleet/dropdown" +
          "?user_id=" +
          this.props.dataLogin.userId +
          "&options=DEALER",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({ userId: this.props.dataLogin.userId })
        }
      );

      var data = await response.json();
      if (get(data, "result", []) && get(data, "result", []).length > 0) {
        let companyData = data.result,
          company = [];
        // for (let index in data) {
        //   companyData.push({ key: data[index].partner_id, value: data[index].firstname })
        //   company.push(data[index].partner_id)
        // }
        companyData.unshift({
          dealer_name: "my_vehicles_92",
          dealer_id: 0,
        });
        this.selectDealer = companyData[0].dealer_id;
        this.props.setStateMapControlNoti("companyDataDealer", companyData);
        this.props.setStateMapControlNoti("allDealer", company);
        this.setState({ companyDealer: company });
      } else {
        this.selectDealer = [];
        this.setState({ companyDataDealer: [], companyDealer: [] });
      }
    } catch {
      this.selectDealer = [];
      this.setState({ companyDataDealer: [], companyDealer: [] });
    }
  }

  //#endregion
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
      this.props.setStateNotification({
        modelList: model,
        chassisNoList: chassisNo,
        engineNoList: engineNo,
        byModelCode: by_model_code,
      });
    } catch (error) {
      console.log(error);
    }
  }

  checkDupName(listMembersAll, name) {
    let index = listMembersAll.findIndex((x) => x.value === name);
    return index > 0 ? false : true;
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
      this.props.setValue("", [listMembers[0].id]);
    } else {
      this.setState({ listMembers, listMembersAll, vin_no: [] });
      this.props.setValue("vin_no", "");
    }

    this.props.setValue("listMembers", listMembers);
    this.props.setValue("listMembersAll", listMembersAll);
  }

  getVehicleInfo(vid) {
    let { listMembers } = this.state;
    let obj = listMembers.find((x) => x.id === parseInt(vid));
    return obj;
  }

  selectEventDevice(select) {
    let text = "" + select;
    let selectSp = text.split("_");
    let selectID = "";

    let vehicleInfo = this.getvehicleid(select);
    let vinNo = get(vehicleInfo, "vin_no", "");
    let vehicleName = get(vehicleInfo, "vehicle_name", "");
    let licensePlate = get(vehicleInfo, "license_plate_no", "");

    let showName = this.state.showName;
    if (selectSp.length > 1) {
      selectID = selectSp[0];
      selectSp[3] === "101"
        ? (showName = "รุ่นรถ")
        : selectSp[3] === "102"
        ? (showName = "เลขตัวรถ")
        : selectSp[3] === "103"
        ? (showName = "เลขเครื่อง")
        : (showName = "");
    } else {
      selectID = select;
    }

    this.setState({
      vin_no: [parseInt(selectID)],
      vinNo,
      vehicleName,
      licensePlate,

      showName,
      startSearch: false,
    });
    this.props.setValue("vin_no", [parseInt(selectID)]);
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

    let prm_start_date = this.startDate + " 00:00:00";
    let prm_stop_date = this.stopDate + " 23:59:59";

    if (
      prm_start_date !== this.state.prm_start_date ||
      prm_stop_date !== this.state.prm_stop_date
    ) {
      this.setState(
        {
          prm_start_date,
          prm_stop_date,
          fileNameDate:
            dataObject.startDate.format("DD-MM-YYYY") +
            " 00:00 to " +
            dataObject.endDate.format("DD-MM-YYYY") +
            " 23:59",
        },
        () => {
          let searchData = {
            event: this.state.event,
            start_date: prm_start_date,
            stop_date: prm_stop_date,
          };
          this.props.setStateMapControlNoti("searchData", searchData);
        }
      );
    }
  }
  async getalldata() {
    try {
      var response = await fetch(ENDPOINT_BASE_URL_YNM4 + "fleet/getV", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: this.props.dataLogin.userId,
        }),
      });
      var data = await response.json();
      if (data?.code === 200) {
        let dealerList = data?.result;
        dealerList.unshift({
          dealer_id: 0,
          dealer_name: "my_vehicles_92",
        });
        this.props.setStateNotification({
          dealerData: dealerList,
          selectDealer: 0,
        });
      } else this.props.setStateNotification({ dealerData: [] });
    } catch (error) {
      this.props.setStateNotification({ dealerData: [] });
    }
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

  render() {
    let {
      alertSetting,
      event,
      fileNameDate,
      vin_no,
      startSearch,
      listMembers,
      listMembersAll,
    } = this.state;
    let { companyDataDealer, showName, dealerData, selectDealer } = this.props;
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

        <BoxContrainer
          title={"search"}
          footer={
            <div style={{ textAlign: "right" }}>
              <Button
                isSearchButton={true}
                onClick={() => this.getMessageData()}
              />
            </div>
            // <div style={{ textAlign: 'Right' }}>
            //   <button onClick={() => this.getMessageData()}
            //     className="btn" style={{ marginRight: 10, backgroundColor: '#1AB394', color: 'white' }}><i className="fa fa-search" aria-hidden="true"  ></i> {t("search")}
            //   </button>
            // </div>
          }
        >
          <Row>
            <Col lg={12} md={12} sm={12}>
              <DropdownDealer
                data={dealerData}
                selected={selectDealer}
                onChange={(selected) => {
                  this.props.setStateNotification({
                    selectDealer: selected,
                    currentValue: "",
                  });
                  this.getvehicleid(selected);
                }}
              />
              {/* <FormSelectSearch
              schema={""}
              mode={"single"}
              label={"dealer"}
              value={""}
            /> */}
            </Col>
            <Col lg={12} md={12} sm={12}>
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <div id="selected-1">
                    <FormSelect
                      schema={{ required: "" }}
                      mode={"single"}
                      value={showName}
                      padding="0px 0px 0px 10px"
                      style={{ width: "100%" }}
                      showSearch={false}
                      label={showName}
                      placeholder={""}
                      list={[
                        { key: 101, value: "รุ่นรถ", text: "รุ่นรถ" },
                        { key: 102, value: "เลขตัวรถ", text: "เลขตัวรถ" },
                        { key: 103, value: "เลขเครื่อง", text: "เลขเครื่อง" },
                      ]}
                      onChange={(selected) => {
                        this.props.setStateNotification({ showName: selected });
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
                <Col g={12} md={12} sm={12}>
                  <div id="selected-2" style={{ margin: "25px 10px 0px 0px" }}>
                    <Select
                      showSearch
                      style={{ width: "97%" }}
                      optionFilterProp="Children"
                      value={vin_no}
                      onChange={(id) => {
                        this.selectEventDevice(id);
                      }}
                      onSelect={(select) => {
                        this.props.setStateNotification({
                          currentValue: select,
                        });
                      }}
                      onSearch={(input) => {
                        this.setState({
                          startSearch: input !== "" ? true : false,
                        });
                      }}
                    >
                      {!startSearch
                        ? listMembers.map(
                            (member, i) =>
                              member.id != null && (
                                <Option key={i} value={member.id}>
                                  {showName == "รุ่นรถ"
                                    ? member.model
                                    : showName == "เลขตัวรถ"
                                    ? member.vin_no
                                    : showName == "เลขเครื่อง"
                                    ? member.engine_no
                                    : ""}
                                </Option>
                              )
                          )
                        : listMembersAll.map((member) => (
                            <Option value={member.id}>{member.value}</Option>
                          ))}
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
            <Col g={12} md={12} sm={12}>
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
                    key: 3002,
                    value: "Notification_M_3002", //risk place
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
            <Col g={12} md={12} sm={12}>
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

        <BoxContrainer
          style={{ marginTop: -20 }}
          contentStyle={{
            paddingLeft: 35,
            paddingRight: 35,
            borderWidth: " 4px 0px 0px ",
            borderColor: "#e7eaec",
          }}
        >
          <DataTable fileName={fileNameDate} />
        </BoxContrainer>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  searchData: state.notification.searchData,
  languageLocation: state.notification.languageLocation,
  language: state.versatile.language,
  companyDataDealer: state.maintenance.companyDataDealer,
  dealerSelected: state.maintenance.dealerSelected,
  showName: state.notification.showName,
  dealerData: state.notification.dealerData,
  selectDealer: state.notification.selectDealer,
  chassisNoList: state.notification.chassisNoList,
  engineNoList: state.notification.engineNoList,
  byModelCode: state.notification.byModelCode,
  modelList: state.notification.modelList,
  currentValue: state.notification.currentValue,
  eventSelected: state.notification.eventSelected,
});

const mapDispatchToProps = (dispatch) => ({
  setMessageData: (data, searchData, languageLocation) =>
    dispatch(
      NotificationRedux.setMessageData(data, searchData, languageLocation)
    ),
  setStateMapControlNoti: (name, value) =>
    dispatch(NotificationRedux.setStateMapControlNoti(name, value)),
  setValue: (name, value) => dispatch(NotificationRedux.setValue(name, value)),
  setStateNotification: (name, value) =>
    dispatch(NotificationRedux.setStateNotification(name, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);

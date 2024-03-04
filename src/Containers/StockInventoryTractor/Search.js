import React, { Component } from "react";
import { BoxContrainer, Button } from "../../components_new";
import FormSelect from "../../Components/FormControls/Basic/FormSelect";
import FormSelectSearch from "../../Components/FormControls/FormSelectSearch";
import FormInput from "../../Components/FormControls/FormInput";
import { Row, Col, Checkbox, Select, Button as ButtonAntd } from "antd";
import { ButtonGroup } from "reactstrap";
import { t } from "../../Components/Translation";
import moment from "moment";
import ControlRoomDealerActions from "../../Redux/ControlRoomDealerRedux";
import { connect } from "react-redux";
import { exportExcel } from "../../Functions/ExportExcel";
import { ENDPOINT_BASE_URL_YNM2, YM_BASE_URL } from "../../Config/app-config";
import { fancyTimeFormat } from "../../Functions/Calculationtime";
import { calculateToDuration } from "../../Functions/DateMoment";
import Alert from "../../Components/Alert";
import { AutoComplete } from "antd";
import RealtimeNewActions from "../../Redux/RealtimeNewRedux";
import debounce from 'lodash/debounce';

const { Option } = Select;

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

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ["test1", "test2"],
      timeUpdate: moment().format("DD/MM/YYYY HH:mm:ss"),
      autoRefresh: true,
      allModellist: [],
      modelValue: [],
      alertSetting: {
        show: false,
        type: 5,
      },
      name: "",
      dealerList: [],
      model: "",
      vin_no: "",
    };
    this.auto = false;
  }
  setAlertSetting(isShow, type, content = "") {
    let { alertSetting } = this.state;
    alertSetting.show = isShow;
    alertSetting.type = type;
    alertSetting.content = content;
    this.setState({ alertSetting });
  }
  setIntervalTimeUpdate() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
      // console.log('clearInterval', moment().format('DD/MM/YYYY HH:mm:ss'))
    }
    if (!this.interval) {
      this.interval = setInterval(() => {
        if (this.state.autoRefresh) {
          this.auto = true;
          this.searchVahicle();
          // console.log('setInterval', moment().format('DD/MM/YYYY HH:mm:ss'))
        }
        // }, 5000)
      }, 900000);
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  componentWillMount() {
    // this.getSeller();
    this.setIntervalTimeUpdate();
  }

  componentDidMount() {
    let { dealer_id, model } = this.props;
    this.getallmodel();
    this.getallvin_no((dealer_id = "all"), (model = "all"));
  }

  async getallmodel() {
    try {
      var response = await fetch(
        ENDPOINT_BASE_URL_YNM2 + `fleet/Yanmar/getModel`,
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
        let modellist = data?.result;

        let modelall = [];
        modellist.forEach((item) => {
          modelall.push({ key: item, value: item, text: item });
        });
        this.setState({ allModellist: modelall });
      } else {
        this.props.setStateStock({ modelCode: [] });
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async getallvin_no(dealer_id, model) {
    let dealer = "";
    let modellist = "";
    if (dealer_id === 0) {
      dealer = "all";
    } else if (dealer_id !== 0) {
      dealer = dealer_id;
    }

    if (model === "") {
      modellist = "all";
    } else {
      modellist = model;
    }
    let body = {
      user_id: this.props.dataLogin.userId,
      model: modellist,
      dealer_id: dealer,
    };
    try {
      var response = await fetch(
        ENDPOINT_BASE_URL_YNM2 + `fleet/getV/controlroom`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      var data = await response.json();
      if (data?.code === 200) {
        let { vehicle_list } = data.result;
        let chassisno = [];
        vehicle_list.forEach((item) => {
          chassisno.push({
            key: item.vid,
            value: item.chassis_no,
            text: item.chassis_no,
          });
        });

        this.props.setStateStock({
          chassisNoList: chassisno,
        });
        console.log(this.props.chassisNoList);
      }
    } catch (error) {}
  }
  async searchVahicle(currentVehicle) {
    this.setAlertSetting(true, 5);
    this.props.setStatesContorlRoomDealerRedux({
      displayVehicle: [],
    });
    let vid_list = [];
    let value = this.props.currentVehicle;
    // if (value === "") {
    //   let result = this.props.chassisNoList.map((item) => item.key);
    //   vid_list.push(result);
    // } else if (value !== "") {
    //   vid_list.push(value);
    // }
    if (value === "")
      vid_list = this.props.chassisNoList.map((item) => item.key);
    else vid_list.push(parseInt(value));
    var dealer;

    console.log(this.state.name);
    if (this.state.name === "") {
      dealer = 0;
    } else {
      dealer = this.state.name;
    }

    let body = {
      user_id: this.props.dataLogin.userId,
    };
    try {
      var response = await fetch(
        YM_BASE_URL +
          `fleet/master/stock/vehicle?limit=1000000&dealer_id=${dealer}&model_name=${this.state.model}&vin_no=${this.state.vin_no}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Accept-Language": this.props.language,
            "x-api-key": this.props.dataLogin.redis_key,
          },
          // body: JSON.stringify(body),
        }
      );
      var data = await response.json();

      console.log(data);
      // this.props.setInformation(data?.result || []);
      this.props.setList(data?.result, this.auto);
      // this.props.setList(
      //   [
      //     {
      //       dealer_id: "17018",
      //       dealer_name: "ยันม่าร์ เอส.พี. (แทรกเตอร์)",
      //       vid: "53283",
      //       vin_no: "EMKSR1085019G26",
      //       engine_hour: "1.6666666666666667",
      //       engine_no: "",
      //       gps_date: "20230921065037000000+0000",
      //       lat: "13.788339",
      //       lng: "100.610530",
      //       status: "0",
      //       admin_level1_name: "ต. แขวงวังทองหลาง",
      //       admin_level1_name_en: "Kwang Wang Thong Lang",
      //       admin_level2_name: "อ. เขตวังทองหลาง",
      //       admin_level2_name_en: "Wang Thong Laeng",
      //       admin_level3_name: "จ. กรุงเทพมหานคร ",
      //       admin_level3_name_en: "Bangkok",
      //     },
      //   ],
      //   this.auto
      // );
      this.setAlertSetting(false, 5);
    } catch (error) {
      this.props.setList([], this.auto);
      this.setAlertSetting(false, 5);
      console.log(error);
    }
  }

  setupExport() {
    const { initialVehiclesDataSI } = this.props;
    let [dataJson, header] = this.changeFormatJSON(initialVehiclesDataSI);
    let export_date_time = moment().format("YYYY-MM-DD HH_mm");
    exportExcel({
      column_header: header,
      json_data: dataJson,
      file_name: "Stock " + export_date_time,
    });
  }

  changeFormatJSON(dataJson) {
    console.log(dataJson);
    let newData,
      header,
      export_date_time = moment().format("YYYY-MM-DD HH:mm");
    newData = dataJson.map((item) => {
      console.log(item);
      let gpsdate = moment().format("YYYY-MM-DD HH:mm");
      let engine_hour = (item.engine_hour / 60).toFixed(1);
      return {
        "Data Date Time": gpsdate,
        Dealer: item.dealer_name,
        "Vehicle Number": item.vin_no,
        "Engine Number": item.engine_no,
        "Engine Hour": item.engine_hour,
        Latitude: item.lat,
        Longitude: item.lng,
        "Sub District": item.location.admin_level1_name,
        District: item.location.admin_level2_name,
        Province: item.location.admin_level3_name,
      };
    });
    header = [
      "Data Date Time",
      "Dealer",
      "Vehicle Number",
      "Engine Number",
      "Engine Hour",
      "Latitude",
      "Longitude",
      "Sub District",
      "District",
      "Province",
    ];
    // "Customer Name", "Installed Date", "Activated Date", "ODO"]
    // console.log('newData', newData)
    return [newData, header];
  }

  async getSeller(value) {
    let { dataLogin, language } = this.props;
    let { name } = this.state;
    try {
      var response = await fetch(
        `${YM_BASE_URL}fleet/setting/Dealer?dealer_name=${value}`,
        // `${ENDPOINT_BASE_URL}ServiceContract/Yanmar/DropdownGroup?name=Seller`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": dataLogin.redis_key,
            "Accept-Language": language == "ja" ? "jp" : language,
          },
        }
      );

      var data = await response.json();
      let list = data.result.dealer_list.map((e) => ({
        key: e.dealer_id,
        value: e.dealer_name,
        text: e.dealer_name,
      }));
      this.setState({ dealerList: list });
    } catch (error) {}
  }
  render() {
    let {
      dealerData,
      selectDealer,
      modelCode,
      modelall,
      currentModel,
      chassisNoList,
      currentVehicle,
    } = this.props;
    let {
      data,
      timeUpdate,
      autoRefresh,
      allModellist,
      modelValue,
      alertSetting,
      dealerList,
    } = this.state;

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
          title={"control_room_11"}
          footer={
            <div style={{ textAlign: "right" }}>
              <Button
                isSearchButton={true}
                onClick={() => {
                  this.searchVahicle();
                  this.props.setRefresh(false);
                }}
              />
            </div>
          }
          toolbarRight={
            <Col>
              <b>{t("control_room_14")}: </b>
              {timeUpdate}
              <Checkbox
                checked={autoRefresh}
                onChange={() => {
                  this.setState({ autoRefresh: !autoRefresh });
                }}
                style={{ marginLeft: 10 }}
              >
                {t("control_room_18")}
              </Checkbox>
              <ButtonAntd
                icon={
                  <i
                    class="fa fa-refresh"
                    aria-hidden="true"
                    style={{ paddingRight: 5 }}
                  ></i>
                }
                style={{ marginLeft: 10 }}
                onClick={() => {
                  this.props.setRefresh(true);
                  this.searchVahicle();
                  this.setIntervalTimeUpdate();
                }}
              >
                {t("control_room_17")}
              </ButtonAntd>
              <ButtonAntd
                icon={<i class="icon-excel-01" style={{ paddingRight: 5 }} />}
                style={{ marginLeft: 10 }}
                onClick={() => this.setupExport()}
              >
                {t("control_room_16")}
              </ButtonAntd>
            </Col>
          }
        >
          <Row>
            <Col lg={8}>
              <div>
                <label className="control-label" style={{ fontWeight: 500 }}>
                  {t("dealer")} :
                </label>

                <AutoComplete
                  style={{ width: "100%" }}
                  onSearch={(value) => {
                      if (value.length >= 1) this.getSeller(value);
                  }}
                  placeholder={t("dealer")}
                  allowClear={true}
                  // disabled={sellerId === "" ? true : false}
                  onSelect={(value, option) => {
                    this.setState({ name: option.key });
                  }}
                  onClear={() => {
                    this.setState({ name: "" });
                  }}
                >
                  {this.state.dealerList.map((item) => (
                    <Option key={item.key} value={item.value}></Option>
                  ))}
                </AutoComplete>
              </div>
            </Col>
            <Col lg={8}>
              <FormInput
                mode={"single"}
                schema={{ required: [""] }}
                value={this.state.model}
                label={"Model_Code"}
                placeholder="Model_Code"
                onChange={(e) => {
                  this.setState({ model: e.target.value });
                }}
              />
            </Col>
            <Col lg={8}>
              <FormInput
                mode={"single"}
                schema={{ required: [""] }}
                value={this.state.vin_no}
                label={"other_reports_142"}
                placeholder="other_reports_142"
                onChange={(e) => {
                  this.setState({ vin_no: e.target.value });
                }}
              />
            </Col>
          </Row>
        </BoxContrainer>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  language: state.versatile.language,
  header: state.signin.header,
  dealerData: state.controlroomdealer.dealerData,
  selectDealer: state.controlroomdealer.selectDealer,
  modelCode: state.controlroomdealer.modelCode,
  currentModel: state.controlroomdealer.currentModel,
  chassisNoList: state.controlroomdealer.chassisNoList,
  currentVehicle: state.controlroomdealer.currentVehicle,
  initialVehiclesDataSI: state.controlroomdealer.initialVehiclesDataSI,
  information: state.controlroomdealer.information,
});

const mapDispatchToProps = (dispatch) => ({
  setStateStock: (name, value) =>
    dispatch(ControlRoomDealerActions.setStateStock(name, value)),
  setValue: (name, value) =>
    dispatch(ControlRoomDealerActions.setValue(name, value)),
  setinitialVehiclesData: (initialVehiclesDataSI) =>
    dispatch(
      ControlRoomDealerActions.setinitialVehiclesData(initialVehiclesDataSI)
    ),
  setData: (searchData) =>
    dispatch(ControlRoomDealerActions.setData(searchData)),
  setList: (initialVehiclesDataSI, auto) =>
    dispatch(ControlRoomDealerActions.setList(initialVehiclesDataSI, auto)),
  setRefresh: (isRefresh) =>
    dispatch(ControlRoomDealerActions.setRefresh(isRefresh)),
  setStatesContorlRoomDealerRedux: (obj) =>
    dispatch(ControlRoomDealerActions.setStatesContorlRoomDealerRedux(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);

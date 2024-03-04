import React, { Component } from "react";
import { BoxContrainer, Button } from "../../components_new";
import FormSelect from "../../Components/FormControls/Basic/FormSelect";
import FormSelectSearch from "../../Components/FormControls/FormSelectSearch";
import { Row, Col, Checkbox, Button as ButtonAntd } from "antd";
import { ButtonGroup } from "reactstrap";
import { t } from "../../Components/Translation";
import moment from "moment";
import ControlRoomDealerActions from "../../Redux/ControlRoomDealerRedux";
import { connect } from "react-redux";
import { exportExcel } from "../../Functions/ExportExcel";
import { YM_BASE_URL } from "../../Config/app-config";
import { fancyTimeFormat } from "../../Functions/Calculationtime";
import { calculateToDuration } from "../../Functions/DateMoment";
import Alert from "../../Components/Alert";

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
    this.setIntervalTimeUpdate();
  }

  componentDidMount() {
    let { dealer_id, model } = this.props;
    this.getalldata();
    this.getallmodel();
    this.getallvin_no((dealer_id = "all"), (model = "all"));
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
        this.props.setStateStock({ dealerData: dealerList, selectDealer: 0 });
      } else this.props.setStateStock({ dealerData: [] });
    } catch (error) {
      this.props.setStateStock({ dealerData: [] });
    }
  }

  async getallmodel() {
    try {
      var response = await fetch(YM_BASE_URL + `fleet/Yanmar/getModel`, {
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
      var response = await fetch(YM_BASE_URL + `fleet/getV/controlroom`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

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
      }
    } catch (error) { }
  }
  async searchVahicle(currentVehicle) {
    this.setAlertSetting(true, 5);
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

    let body = {
      user_id: this.props.dataLogin.userId,
      vid_list,
    };
    try {
      var response = await fetch(
        YM_BASE_URL + `fleet/excavator/realtime/controlroom`,
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

      // this.props.setInformation(data?.sidebar || [])
      this.props.setList(data?.sidebar || [], this.auto);
      this.setAlertSetting(false, 5);
    } catch (error) {
      this.setAlertSetting(false, 5);
      console.log(error);
    }
  }

  setupExport() {
    const { initialVehiclesDataSI } = this.props;
    let [dataJson, header] = this.changeFormatJSON(initialVehiclesDataSI);
    exportExcel({
      column_header: header,
      json_data: dataJson,
      file_name: "Controlroom Map",
    });
  }

  changeFormatJSON(dataJson) {
    let newData,
      header,
      export_date_time = moment().format("YYYY-MM-DD HH:mm");
    newData = dataJson.map((item) => {
      let gpsdate = moment().format("YYYY-MM-DD HH:mm");
      let engine_hour = (item.engine_hour / 60).toFixed(1);
      return {
        "Data Date Time": gpsdate,
        "Export Date Time": export_date_time,
        "Seller Code": item.dealer_id,
        "Seller Name": item.dealer_name,
        VIN: item.vid,
        Chassis: item.chassis_no,
        Engine: item.engine_no,
        "Engine Hour": engine_hour,
        "Geofence Name": "-",
        "Geofence Time": 0,
        Lat: item.lat,
        Lng: item.lng,
        "Sub District": item.location.admin_level3_name,
        District: item.location.admin_level2_name,
        Province: item.location.admin_level1_name,
      };
    });
    header = [
      "Data Date Time",
      "Export Date Time",
      "Seller Code",
      "Seller Name",
      "VIN",
      "Chassis",
      "Engine",
      "Engine Hour",
      "Geofence Name",
      "Geofence Time",
      "Lat",
      "Lng",
      "Sub District",
      "District",
      "Province",
    ];
    // "Customer Name", "Installed Date", "Activated Date", "ODO"]
    // console.log('newData', newData)
    return [newData, header];
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
              <DropdownDealer
                data={dealerData}
                selected={selectDealer}
                style={{ width: "100%" }}
                onChange={(select) => {
                  this.getallvin_no(
                    (this.state.dealer_id = select),
                    (this.state.model = currentModel)
                  );
                  this.props.setStateStock({
                    selectDealer: select,
                    currentVehicle: "",
                    currentModel: "",
                  });
                  this.props.setRefresh(false);
                }}
              />
            </Col>
            <Col lg={8}>
              <FormSelectSearch
                schema={{ required: "" }}
                mode={"single"}
                value={currentModel}
                style={{ width: "100%" }}
                label={"model"}
                placeholder={""}
                list={allModellist}
                onChange={(value) => {
                  let selected = value ? value : "";
                  this.getallvin_no(
                    (this.state.dealer_id = selectDealer),
                    (this.state.model = selected)
                  );
                  this.props.setStateStock({
                    currentModel: selected,
                    currentVehicle: "",
                    selectDealer: 0,
                  });
                }}
              />
            </Col>
            <Col lg={8}>
              <FormSelectSearch
                schema={{ required: "" }}
                mode={"single"}
                value={currentVehicle}
                style={{ width: "100%" }}
                label={"control_room_27"}
                placeholder={""}
                list={chassisNoList}
                onChange={(key) => {
                  this.props.setStateStock({ currentVehicle: key ? key : "" });
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
  informationCR: state.controlroomdealer.informationCR,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import RealtimeNewActions from "../../Redux/RealtimeNewRedux";
import "./Styles/stylesfooter.css";
import { Row } from "reactstrap";
import { isEmpty } from "react-redux-firebase";
import {
  getStatusVehicle,
  getStatusCard,
  getIconStatusPath,
  getStatusName,
} from "../../Functions/StatusColor";
import { momentDate } from "../../Functions/DateMoment";
import { formatMath, numberWithComma } from "../../Functions/Calculation";
import { get } from "lodash";
import $ from "jquery";
import { t } from "../../Components/Translation";
import { diff } from "json-diff";
import ReactPlayer from "react-player";
import { PulseLoader } from "react-spinners";
import { YM_BASE_URL } from "../../Config/app-config";
import { Spin } from "antd";
import axios from "axios";

const FormLoading = (arg) => {
  return (
    <Spin tip={"กำลังโหลด..."} spinning={arg.loading}>
      {arg.children}
      <style type="text/css">
        {`
          .ant-spin-dot-item {
            background-color: #176fc1 !important
          }
          .ant-spin-blur{
            opacity : 1 !important;
          }

          .ant-spin-container::after {
            background: #c1c1c1 !important;
          }
          `}
      </style>
    </Spin>
  );
};

let controllerSignal = [];
class FooterInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkhide: 0,
      defaultChanel: 2,
      loadingVideo: false,
    };
  }

  componentDidMount() {
    this._onCollapseComponent();
  }

  componentDidUpdate(prevProps, nextState) {
    let { hideFooter } = this.props;
    if (prevProps.hideFooter !== hideFooter) {
      this._onCollapseComponent();
    }
  }

  shouldComponentUpdate(nextProps) {
    let { listVideo, isShowModalVideo, information, isLoadInfo } = this.props;

    if (nextProps.information !== information) {
      if (!isEmpty(nextProps.information)) {
        if (isEmpty(information)) {
          this.getInformationExtend(nextProps.information.info.vid);
        } else if (
          nextProps.information.info.vid !== information.info.vid ||
          isLoadInfo
        ) {
          this.getInformationExtend(nextProps.information.info.vid);
        }
      }
    }

    if (
      nextProps.isShowModalVideo !== isShowModalVideo &&
      nextProps.isShowModalVideo === true
    ) {
      this.unloadVideo(get(listVideo, "[0]", {}));
      this.setState({ loadingVideo: false });
      return false;
    }

    if (nextProps.listVideo !== listVideo) {
      if (nextProps.listVideo === null) {
        this.unloadVideo(get(listVideo, "[0]", {}));
        return true;
      } else if (listVideo !== null && nextProps.listVideo !== null) {
        if (diff(nextProps.listVideo[0], listVideo[0])) {
          if (
            get(this, "[ref_" + listVideo[0].channel + "].player.player.flv")
          ) {
            get(
              this,
              "[ref_" + listVideo[0].channel + "].player.player.flv"
            ).destroy();
          }
        }
      }
      if (!isEmpty(get(nextProps, "listVideo[0]"))) {
        this.setState({ loadingVideo: true });
        return false;
      } else if (isEmpty(get(nextProps, "listVideo[0]"))) {
        this.setState({ loadingVideo: false });
        return false;
      }
    }
    return true;
  }

  componentWillUnmount() {
    let { listVideo } = this.props;
    if (listVideo) this.unloadVideo(listVideo[0]);
    this.props.setValue("isLoadInfo", false);
  }

  async getInformationExtend(vid) {
    try {
      if (this.props.isLoadInfo) {
        controllerSignal.forEach((controller) => {
          if (!controller.signal.aborted) controller.abort();
        });

        const controller = new AbortController();
        let signal = controller.signal;
        controllerSignal.push(controller);
        // var response = await fetch(
        //   `https://yanmar-qa.onelink-iot.com/prod/fleet/dlt/excavator/Infomation?vid=${vid}`,
        //   {
        //     method: "GET",
        //     headers: {
        //       Accept: "application/json",
        //       "Content-Type": "application/json",

        //     },
        //     signal,
        //   }
        // );
        axios
          .get(`${YM_BASE_URL}fleet/dlt/excavator/Infomation?vid=${vid}`)
          .then((res) => {
            var data = res.data;
            if (!isEmpty(data)) {
              let infoUpdate = { ...this.props.information };

              if (infoUpdate?.info.vid === vid) {
                infoUpdate.infoExtend = {
                  model_name: data?.model_name,
                  dealer_name: get(data, "dealer_name", ""),
                  vin_no: data?.vin_no,
                  finance_contract_number: data?.finance_contract_number,
                  phone: data?.phone,
                  next_service: data?.next_service,
                  status: parseInt(get(data, "status", 0)),
                  customer_name: get(data, "customer_name", ""),
                  delivery_date: data?.delivery_date,
                  engine_hour: (data?.engine_hour / 60).toFixed(1),
                  vehicleBattLevel: data?.vehicle_batt_level,
                  rpm: data?.rpm,
                  deviceBattLevel: data?.device_batt_level,
                  device_batt: data?.device_batt,
                  lat: data?.lat,
                  lng: data?.lng,
                  location: data?.location,
                  dtc_engine: data?.dtc_engine,
                  dtc_code: data?.dtc_code,
                  gsm_per: data?.gsm_per,
                  gsmLevel: data?.gsm_level,
                  sattelliteLevel: data?.sattellite_level,
                  sattellitePer: data?.sattellite_per,
                  fuel_per: data?.fuel_per,
                };
                this.props.setValue("isLoadInfo", false);
                this.props.getInformationMarkerSucc(infoUpdate, "List");
              }
            }
          }, signal);
      }
    } catch (error) {
      console.log("ERROR => getInformationExtend  : ", error);
      this.props.setValue("isLoadInfo", false);
    }
  }

  checkScroll() {
    let sX = document.getElementById("scrollx");
    // console.log('checkScroll', sX.scrollWidth - sX.clientWidth, sX.scrollLeft)
    if (sX.scrollLeft === 0) this.setState({ checkhide: 0 });
    else if (sX.scrollWidth - sX.clientWidth <= sX.scrollLeft)
      this.setState({ checkhide: 2 });
    else if (this.state.checkhide !== 1) this.setState({ checkhide: 1 });
  }

  slideScrollX(num) {
    let sX = document.getElementById("scrollx");
    sX.scrollLeft += num * 600;
    if (sX.scrollLeft === 0) this.setState({ checkhide: 0 });
    else if (sX.scrollWidth - sX.clientWidth <= sX.scrollLeft)
      this.setState({ checkhide: 2 });
    else if (this.state.checkhide !== 1) this.setState({ checkhide: 1 });
  }

  getLocation(place, node) {
    let name = get(this.props.information, node, "");
    if (name !== "") place += name + " ";
    return place;
  }

  _onCollapseComponent = () => {
    let { hideFooter } = this.props;
    let myibox2 = $(`#footer-info-colaps`);
    if (myibox2) {
      if (hideFooter) myibox2.slideUp();
      else myibox2.slideDown();
      // myibox2.slideToggle(600);
    }
  };

  unloadVideo(item) {
    if (!isEmpty(item)) {
      // console.log('channel2', item.channel, this)
      if (get(this, "[ref_" + item.channel + "].player.player.flv")) {
        get(this, "[ref_" + item.channel + "].player.player.flv").unload();
      }
    }
  }

  colorAndNameBatt(batt_b_level) {
    return batt_b_level === 2
      ? ["demo-icon icon-battery-4", "#4CD964"]
      : ["demo-icon icon-battery-0", "#FF3B30"];
  }

  onOff(data) {
    return data == "0" ? "realtime_51" : data === "1" ? "realtime_50" : "-";
  }

  changeChanel(isNext) {
    let { listVideo, information } = this.props;
    let channel = get(listVideo, "[0].channel");
    let lst = get(information, "['option.mdvr'].channel", []);
    // let lst = JSON.parse(JSON.stringify(get(information, "['option.mdvr'].channel", [])))
    // lst.push(...MOCKARRAY)
    if (channel !== undefined) {
      // let channel = get(listVideo, '[0].channel')
      let idx = lst.findIndex((item) => item.channel === channel);
      if (idx > -1) {
        if (isNext) {
          if (lst.length - 1 === idx) idx = 0;
          else idx += 1;
        } else {
          if (idx === 0) idx = lst.length - 1;
          else idx -= 1;
        }
        let info = lst[idx];
        this.props.setListVideo(info);
      }
    }
  }

  onClickHistory() {
    this.props.history.push({
      pathname: "/history",
      // search: '?query=abc',
      state: { id: 999, name: "realtime" },
    });
  }

  setFormatInfoDynamic(info) {
    let data = [],
      temp = get(info, "['option.temperature']", []),
      door = get(info, "['option.door']", []),
      mixer = get(info, "['option.mixer']", {});
    if (!isEmpty(temp))
      data.push(
        ...temp.map(({ name, min, max, val }) => {
          let color = val > max ? "red" : val < min ? "skyblue" : "blue";
          return { key: "temp", name, val, color };
        })
      );
    if (!isEmpty(door))
      data.push(
        ...door.map(({ name, status }) => {
          return { key: "door", name, status };
        })
      );
    if (!isEmpty(mixer))
      data.push({ key: "mixer", val: mixer.rpm, status: mixer.status });
    // data.push(...MOCKDYNAMIC)
    if (isEmpty(data)) return undefined;

    let format = [[], [], [], [], []];
    for (let i in data) format[i % 5].push(data[i]);
    let result = format.filter((item) => !isEmpty(item));
    return result;
  }

  setdynamicSensor(info) {
    let maxIdx = Math.max(...info.map((a) => a.length)) - 1;
    return (
      <th rowSpan="5" className="table-sensor-dynamic">
        <div style={{ height: 120 }}>
          <table style={{ width: "100%" }}>
            <tbody>
              {info.map((row) => (
                <tr>
                  {row.map((col, idx) =>
                    this.setColumnDynamic(col, idx, maxIdx)
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </th>
    );
  }

  setColumnDynamic(data, idx, maxIdx) {
    let { key, name, val, color, status } = data;
    let icon = {
      temp: "icon-temperatire icon-new-icon-07",
      door: "demo-icon icon-doorsensorsvg",
      mixer: "demo-icon icon-concrete-01",
    };
    switch (key) {
      case "temp":
        return [
          <th>
            <i className={icon[key]} style={{ paddingRight: 4 }} />
            <small>{name}</small>
          </th>,
          <th style={{ textAlign: "right", paddingRight: 5, color }}>
            {" "}
            <small>{val}</small>
          </th>,
          <th className={maxIdx !== idx && "border-right-sensor"}>
            <small>{t("realtime_48")}</small>
          </th>,
        ];
      case "door":
        return [
          <th>
            <i className={icon[key]} style={{ paddingRight: 4 }} />
            <small>{name}</small>
          </th>,
          <th style={{ textAlign: "right", paddingRight: 5 }}>
            {" "}
            <small>{t(this.onOff(status))}</small>
          </th>,
          <th className={maxIdx !== idx && "border-right-sensor"}></th>,
        ];
      default:
        return [
          <th>
            <i
              className={icon[key]}
              style={{ marginRight: "10px", fontSize: "12px" }}
            />
            <small>{t("realtime_110")}</small>
          </th>,
          <th style={{ textAlign: "right", paddingRight: 5 }}>
            {" "}
            <small>{t(this.readyMixer(status))}</small>
          </th>,
          <th className={maxIdx !== idx && "border-right-sensor"}></th>,
          // <th className={maxIdx !== idx && 'border-right-sensor'}><small>{(status !== "2" && ['(', val, ' ', t('realtime_42'), ')'])}</small></th>
        ];
    }
  }
  readyMixer(data) {
    return data == "0"
      ? "realtime_111"
      : data === "1"
      ? "realtime_112"
      : data === "2"
      ? "realtime_113"
      : "realtime_114";
  }

  setLayoutListVideo(data) {
    let { listVideo } = this.props;
    let format = [[], [], [], [], []];
    let mdvr = JSON.parse(JSON.stringify(data));
    for (let i in mdvr) format[i % 5].push(mdvr[i]);
    let result = format.filter((item) => !isEmpty(item));
    let maxIdx = Math.max(...result.map((a) => a.length)) - 1;
    return result.map((row) => {
      return (
        <tr>
          {row.map((info, idx) => {
            let _color = "",
              index;
            if (listVideo) {
              index = listVideo.findIndex(
                (item) => item.channel === info.channel
              );
              if (index > -1) _color = "#4CD964";
            }
            return (
              <th
                className={maxIdx !== idx && "border-right-sensor"}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.props.setListVideo(info, index);
                }}
              >
                <i
                  className="fas fa-video"
                  style={{ paddingRight: 4, color: _color }}
                ></i>
                <small>{info.label_name}</small>
              </th>
            );
          })}
        </tr>
      );
    });
  }

  render() {
    // console.log(" ___________ FOOTER INFO ___________ ")
    let {
      information,
      hideFooter,
      language,
      listVideo,
      isShowModalVideo,
      isLoadInfo,
    } = this.props;
    let { loadingVideo } = this.state;
    let place = "";
    if (language === "en") {
      place = this.getLocation(place, "gps.location.admin_level3_name_en");
      place = this.getLocation(place, "gps.location.admin_level2_name_en");
      place = this.getLocation(place, "gps.location.admin_level1_name_en");
    } else {
      place = this.getLocation(place, "gps.location.admin_level3_name");
      place = this.getLocation(place, "gps.location.admin_level2_name");
      place = this.getLocation(place, "gps.location.admin_level1_name");
    }
    console.log("RENDER FOOTER INFO ", information);

    let info = {
      // vehicle: get(information, 'info.licenseplate', null) ? get(information, 'info.vehicle', '') + ' ' + get(information, 'info.licenseplate') : get(information, 'info.vin_no', null),
      vehicle: get(information, "info.vehicle_name", null)
        ? get(information, "info.vehicle_name")
        : get(information, "info.licenseplate", null)
        ? get(information, "info.licenseplate")
        : get(information, "info.vin_no", null),
      gpsdate: momentDate(
        get(information, "infoExtend.gpsdate")
          ? get(information, "infoExtend.gpsdate", null)
          : get(information, "gps.gpsdate", null)
      ),
      colorStatus: getStatusVehicle(get(information, "gps.image.status", 0)),
      nameStatus: getStatusVehicle(get(information, "gps.image.status", 0))
        .name,
      workHours: getStatusVehicle(get(information, "my_drivers_21")),
      counterTime: get(information, "gps.io_time", "N/A"),
      // model: get(information, 'info.model', '-'),
      acc: get(information, "gps.acc", "f"),
      dtc_engine: this.onOff(get(information, "infoExtend.dtc_engine")),
      io_color: get(information, "gps.io_color", "#FFFFFF"),
      odo: formatMath(get(information, "info.odo", 0)),
      speed: get(information, "gps.speed", 0),
      // engine_hour: get(information, 'gps.engine_hour', 0),
      model_code: get(information, "info.model_code", "-"),
      rpm: get(information, "infoExtend.rpm", 0),
      nameDriver:
        get(information, "driver_cards.name", "") === ""
          ? get(information, "driver_cards.card_id")
            ? get(information, "driver_cards.card_id", "")
            : t("realtime_55")
          : get(information, "driver_cards.name", ""),
      cardIdDriver:
        get(information, "driver_cards.card_id", "") === ""
          ? t("realtime_56")
          : get(information, "driver_cards.card_id", ""),
      typeNameDriver: get(information, "driver_cards.type_name", "-"),
      statusSwipeCard: getStatusCard(
        get(information, "driver_cards.status_swipe_card", 0)
      ).code,
      drivingTime: get(information, "driving_count.driving", 0),
      sattelliteLevel: get(information, "infoExtend.sattelliteLevel", 0),
      sattellitePer: Number(get(information, "infoExtend.sattellitePer", 0)),
      gsmLevel: get(information, "infoExtend.gsmLevel", "-"),
      gsmPer: Number(get(information, "infoExtend.gsm_per", "-")),
      deviceStatus:
        get(information, "infoExtend.device_batt", 0) <= 0 ? false : true,
      location:
        get(information, "infoExtend.lat", "-") +
        ", " +
        get(information, "infoExtend.lng", "-"),
      place: place === "" ? "-" : place,
      cooltemp: get(information, "sensor.canbus.cooltemp", "-"),
      vehicleBattLevel: this.colorAndNameBatt(
        get(information, "infoExtend.vehicleBattLevel")
      ),
      vehicleBatt: get(information, "sensor.vehicle_batt", "-"),
      deviceBattLevel: this.colorAndNameBatt(
        get(information, "infoExtend.device_batt_level")
      ),
      deviceBatt: get(information, "infoExtend.device_batt", "-"),
      accPedal: get(information, "sensor.canbus.acc_pedal", "-"),
      fuel: get(information, "infoExtend.fuel_per", "-"),
      safetyBelt: this.onOff(get(information, "sensor.options.safety_belt")),
      doorSensor: this.onOff(get(information, "sensor.options.door_sensor")),
      pto: "",
      temp1: get(information, "sensor.temperatures.sensor1"),
      fuelCons:
        get(information, "sensor.canbus.fuel_rate", "") === ""
          ? "0.0"
          : get(information, "sensor.canbus.fuel_rate", ""),
      exhaustBrake: this.onOff(get(information, "sensor.canbus.exhaust_brake")),
      clutchStatus: this.onOff(get(information, "sensor.canbus.clutch_switch")),
      brakeStatus: this.onOff(get(information, "sensor.canbus.foot_brake")),
      insurance:
        get(information, "Maintenance.Insurance", "") !== ""
          ? get(information, "Maintenance.Insurance", "")
          : "-",
      tiresService:
        get(information, "Maintenance.Tires_Service", "") !== ""
          ? get(information, "Maintenance.Tires_Service", "")
          : "-",
      nextService: get(information, "Maintenance.Next_service", "-"),
      sleep_mode: get(information, "gps.sleep_mode", "0"),
      vin_no: get(information, "info.vin_no", ""),
      icon: getIconStatusPath(
        parseInt(get(information, "infoExtend.status", 99))
      ),
      statusName: getStatusName(get(information, "infoExtend.status", 99)),
      dealer_name: get(information, "infoExtend.dealer_name", ""),
      delivery_date: get(information, "infoExtend.delivery_date", ""),
      finance_contract_number: get(
        information,
        "infoExtend.finance_contract_number",
        ""
      ),
      model_name: get(information, "infoExtend.model_name", ""),
      next_service: get(information, "infoExtend.next_service", ""),
      phone: get(information, "infoExtend.phone", ""),
      status: get(information, "infoExtend.status", ""),
      customer_name: get(information, "infoExtend.customer_name", ""),
      engine_hour: get(information, "infoExtend.engine_hour", ""),
    };

    let pto_option = {
      input5: get(information, "sensor.options.pto.input5", ""),
      input6: get(information, "sensor.options.pto.input6", ""),
    };

    if (pto_option.input5 === 1 || pto_option.input6 === 1)
      info.pto = "realtime_50";
    else info.pto = "realtime_51";

    if (!isEmpty(information) && get(information, "infoExtend.dtc_code")) {
      let dtc = information?.infoExtend?.dtc_code.map((item) => item?.Code);
      let dtcLabel = dtc.join(", ");
      info.dtc = dtcLabel;
    }

    let dynamicSensor = this.setFormatInfoDynamic(information);

    return (
      !isEmpty(information) && (
        // return ((true) &&
        <Row style={{ margin: "0px -10px -15px 0px" }}>
          <div div style={{ width: 80 }}>
            <div
              style={{
                backgroundColor: "white",
                cursor: "pointer",
                boxShadow: "0px -2px 6px rgba(0,0,0,0.3)",
                width: "100%",
                borderRadius: "0px 4px 0px 0px",
                height: 25,
              }}
              onClick={() => {
                this.props.setStateReduxRealtime({ hideFooter: !hideFooter });
                // this._onCollapseComponent()
              }}
            >
              <center>
                <i
                  className={
                    "fa " + (hideFooter ? "fa-chevron-up" : "fa-chevron-down")
                  }
                ></i>
              </center>
            </div>
          </div>

          {/* {!hideFooter && */}
          <div
            id="footer-info-colaps"
            style={{ display: hideFooter && "none" }}
          >
            <FormLoading loading={isLoadInfo}>
              {/* Button */}
              {
                this.state.checkhide === 0
                  ? [
                      //<i className='fa fa-chevron-left arrow-scroll' style={{ left: 0, color: "white", boxShadow: 0 }} ></i>,
                      <button
                        className="button-slide-horizontal footer-scroll"
                        onClick={() => this.slideScrollX(1)}
                        style={{ right: 0 }}
                      >
                        <i className="fa fa-chevron-right"></i>
                      </button>,
                    ]
                  : this.state.checkhide === 1
                  ? [
                      <button
                        className="button-slide-horizontal footer-scroll"
                        onClick={() => this.slideScrollX(-1)}
                        style={{ left: 0 }}
                      >
                        <i className="fa fa-chevron-left"></i>
                      </button>,
                      <button
                        className="button-slide-horizontal footer-scroll"
                        onClick={() => this.slideScrollX(1)}
                        style={{ right: 0 }}
                      >
                        <i className="fa fa-chevron-right"></i>
                      </button>,
                    ]
                  : // [<i className='fa fa-chevron-left arrow-scroll' style={{ left: 0 }} onClick={() => this.slideScrollX(-1)}  ></i>,
                    // <i className='fa fa-chevron-right arrow-scroll' style={{ right: 0 }} onClick={() => this.slideScrollX(1)} ></i>]
                    [
                      <button
                        className="button-slide-horizontal footer-scroll"
                        onClick={() => this.slideScrollX(-1)}
                        style={{ left: 0 }}
                      >
                        <i className="fa fa-chevron-left"></i>
                      </button>,
                    ]
                // [<i className='fa fa-chevron-left arrow-scroll' style={{ left: 0 }} onClick={() => this.slideScrollX(-1)}  ></i>]
              }

              <div
                id="scrollx"
                className="scrollfooter"
                onScroll={() => this.checkScroll()}
                style={{
                  backgroundColor: "white",
                  padding: "5px 30px 5px 10px",
                  boxShadow: "0 2px 6px rgba(0,0,0,.3)",
                  flexDirection: "row",
                  display: "flex",
                  position: "relative",
                  height: 200,
                  // marginLeft: 20,
                  // marginRight: 30
                }}
              >
                <div style={{ flexDirection: "row", display: "flex" }}>
                  <div className="b-r table-tan" style={{ minWidth: "auto" }}>
                    {/* <div className="b-r table-tan" style={{ minWidth: 450 }}> */}

                    <b style={{ fontSize: 16 }}>
                      {t("realtime_9")} : {info.vehicle}
                    </b>
                    <br />
                    <small style={{ color: "#B2BABB" }}>
                      {info.gpsdate}
                      {info.vid}
                    </small>
                    <br />
                    {/* <small><b> {t("realtime_10")} : {info.model_code}</b>  </small> */}

                    {info.icon !== "" && (
                      <img style={{ height: "25px" }} src={info.icon} />
                    )}
                    <small style={{ marginLeft: info.icon === "" ? 5 : 0 }}>
                      <b>{t("subscription_4")} : </b>
                    </small>
                    <small style={{ paddingRight: 5 }}>
                      <b>{t(info.statusName)}</b>
                    </small>

                    <table style={{ width: "100%" }}>
                      <thead>
                        {/* <tr>
                      <th>
                        <img style={{ height: '25px' }} src={info.icon} />
                        <small><b>{t("subscription_4")} : </b></small>
                        <small style={{ paddingRight: 5 }}><b>{t(info.statusName)}</b></small>
                      </th>
                    </tr> */}

                        <tr>
                          <th
                            style={{
                              textAlign: "left",
                              paddingRight: 5,
                              minWidth: 200,
                            }}
                          >
                            <small>
                              {t("my_vehicles_78")} : {info.model_name}
                            </small>
                          </th>
                          <th>
                            <small style={{ paddingRight: 5 }}>
                              <b>
                                {t("realtime_155")} :{" "}
                                {numberWithComma(info.engine_hour)}{" "}
                                {t("ecotree_22")}
                              </b>
                            </small>
                          </th>
                        </tr>

                        <tr>
                          <th>
                            <small>
                              {t("realtime_156")} : {info.dealer_name}
                            </small>
                          </th>
                          <th>
                            <small>
                              {t("realtime_172")} : {info.vin_no}
                            </small>
                          </th>
                        </tr>
                        <tr>
                          <th>
                            <small>
                              {t("realtime_119")} : {info.customer_name}
                            </small>
                          </th>
                          {/* <th style={{ textAlign: 'right', paddingRight: 5 }}><small></small></th> */}
                          <th>
                            <small>
                              {t("realtime_157")} :{" "}
                              {info.finance_contract_number}
                            </small>
                          </th>
                        </tr>

                        <tr>
                          <th>
                            <small
                              style={{ textAlign: "right", paddingRight: 5 }}
                            >
                              {t("customer_33")} : {info.phone}
                            </small>
                          </th>
                          <th>
                            <small
                              style={{ textAlign: "right", paddingRight: 5 }}
                            >
                              {t("realtime_158")} : {info.delivery_date}
                            </small>
                          </th>
                        </tr>
                      </thead>
                    </table>
                  </div>

                  {/* ------------- MONITOR ------------- */}
                  {
                    // get(information, 'mdvr') && [
                    get(information, "option.mdvr") && [
                      // !isEmpty(information.mdvr) && [

                      isShowModalVideo ? (
                        <></>
                      ) : (
                        <div
                          className="b-r table-tan"
                          style={{
                            minWidth: 320,
                            padding: 0,
                            marginTop: -13,
                            // display: isShowModalVideo ? 'none' : ''
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              flex: 1,
                              justifyContent: "space-between",
                              marginTop: 8,
                              height: 205,
                            }}
                          >
                            <div className="form-group field field-string">
                              <button
                                className="button-slide-horizontal"
                                onClick={() => this.changeChanel(false)}
                              >
                                <i className="fa fa-chevron-left"></i>
                              </button>
                            </div>
                            <div
                              className="form-group field field-string"
                              style={{ backgroundColor: "#000" }}
                            >
                              <div
                                style={{
                                  textAlign: "center",
                                  position: "absolute",
                                  zIndex: 2,
                                }}
                              >
                                <button
                                  class="botton-explan"
                                  type="button"
                                  title="Explan"
                                  onClick={() => {
                                    this.props.setIsShowModalVideo(true);
                                    // get(information, "['option.mdvr'].channel", []).length > 0 && this.props.setIsShowModalVideo(true)
                                  }}
                                >
                                  <img
                                    alt="image"
                                    src={require("./icons/ic_explan.png")}
                                  />
                                </button>
                              </div>
                              {loadingVideo && (
                                <div
                                  className="loading-video"
                                  style={{ width: "320px", height: "100%" }}
                                >
                                  <PulseLoader
                                    size={10}
                                    margin={8}
                                    color={"#fff"}
                                  />
                                </div>
                              )}
                              <ReactPlayer
                                ref={(ref) => {
                                  if (get(listVideo, "[0].url")) {
                                    this["ref_" + listVideo[0].channel] = ref;
                                  }
                                }}
                                className="react-player"
                                url={get(listVideo, "[0].url", "")}
                                width={320}
                                height="100%"
                                playing
                                muted={true}
                                onReady={() => {}}
                                onStart={() => {
                                  this.setState({ loadingVideo: false });
                                }}
                                // onEnded={() => console.log("onEnded")}
                                onError={() => {}}
                              />
                            </div>
                            <div className="form-group field field-string">
                              <button
                                className="button-slide-horizontal"
                                onClick={() => this.changeChanel(true)}
                              >
                                <i className="fa fa-chevron-right"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      ),
                      <div className="b-r table-tan" style={{ minWidth: 200 }}>
                        <table
                          className="table table-borderless"
                          style={{ width: "100%" }}
                        >
                          <thead>
                            <th>
                              <b style={{ fontSize: 16 }}> {t("วิดีโอ")}</b>
                            </th>
                          </thead>
                        </table>
                        <table style={{ width: "100%" }}>
                          <tbody>
                            {this.setLayoutListVideo(
                              get(information, "['option.mdvr'].channel", [])
                            )}
                          </tbody>
                        </table>
                      </div>,
                    ]
                  }

                  {/* ------------- GPS Status ------------- */}
                  <div className="b-r table-tan" style={{ minWidth: 350 }}>
                    <table
                      className="table table-borderless"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <th>
                          <b style={{ fontSize: 16 }}> {t("realtime_18")}</b>
                        </th>
                      </thead>
                    </table>

                    <table style={{ width: "100%" }}>
                      <tbody>
                        <tr>
                          <th>
                            {info.sattelliteLevel === 4 ? (
                              <div>
                                {" "}
                                <i
                                  className="demo-icon icon-005-wifi-2"
                                  style={{ color: "#4CD964", paddingRight: 4 }}
                                />
                                <small>{t("realtime_19")}</small>
                              </div>
                            ) : info.sattelliteLevel === 3 ? (
                              <div>
                                <i
                                  className="demo-icon icon-009-wifi-4"
                                  style={{ color: "#FFCC00", paddingRight: 4 }}
                                />
                                <small>{t("realtime_19")}</small>
                              </div>
                            ) : info.sattelliteLevel === 2 ? (
                              <div>
                                <i
                                  className="demo-icon icon-007-wifi-3"
                                  style={{ color: "#FF6800", paddingRight: 4 }}
                                />
                                <small>{t("realtime_19")}</small>
                              </div>
                            ) : (
                              <div>
                                <i
                                  className="demo-icon icon-001-wifi"
                                  style={{ color: "#FF3B30", paddingRight: 4 }}
                                />
                                <small>{t("realtime_19")}</small>
                              </div>
                            )}
                          </th>
                          <th>
                            <small>
                              {info.sattellitePer} {t("realtime_47")}
                            </small>
                          </th>
                        </tr>
                        <tr>
                          <th>
                            {info.gsmLevel === 4 ? (
                              <div>
                                {" "}
                                <i
                                  className="icon-cell-4-01"
                                  style={{ color: "#4CD964", paddingRight: 4 }}
                                />
                                <small>{t("realtime_20")}</small>
                              </div>
                            ) : info.gsmLevel === 3 ? (
                              <div>
                                <i
                                  className="icon-006-high"
                                  style={{ color: "#FFCC00", paddingRight: 4 }}
                                />
                                <small>{t("realtime_20")}</small>
                              </div>
                            ) : info.gsmLevel === 2 ? (
                              <div>
                                <i
                                  className="icon-008-cell-1"
                                  style={{ color: "#FF6800", paddingRight: 4 }}
                                />
                                <small>{t("realtime_20")}</small>
                              </div>
                            ) : (
                              <div>
                                <i
                                  className="icon-010-wifi-5"
                                  style={{ color: "#FF3B30", paddingRight: 4 }}
                                />
                                <small>{t("realtime_20")}</small>
                              </div>
                            )}
                          </th>
                          <th>
                            <small>
                              {info.gsmPer} {t("realtime_47")}
                            </small>
                          </th>
                        </tr>
                        <tr>
                          <th>
                            <i
                              className="icon-device"
                              style={{ paddingRight: 12, fontSize: 10 }}
                            />{" "}
                            <small>{t("realtime_21")}</small>
                          </th>
                          <th>
                            {info.deviceStatus ? (
                              <small>{t("realtime_50")}</small>
                            ) : (
                              <small style={{ color: "red" }}>
                                {t("realtime_52")}
                              </small>
                            )}
                            {info.sleep_mode == "1" && (
                              <small>, {t("sleep mode")}</small>
                            )}
                            <br />
                          </th>
                        </tr>
                        <tr>
                          <th>
                            <i
                              className="icon-map-marker-alt"
                              style={{ paddingRight: 4 }}
                            />{" "}
                            <small>{t("realtime_22")}</small>
                          </th>
                          <th>
                            <u>
                              <a
                                href={
                                  `https://maps.google.com/?q= ` + info.location
                                }
                                target="_blank"
                              >
                                <small>{info.location}</small>
                                <br />
                              </a>
                            </u>
                          </th>
                        </tr>
                        <tr>
                          <th colspan="2">
                            <i
                              className="icon-globe"
                              style={{ paddingRight: 12 }}
                            />
                            <small>{info.place}</small>
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* ------------- Sensors & Switches ------------- */}
                  <div className="b-r table-tan">
                    {/* <b style={{ fontSize: 16 }} > {t("realtime_175")}</b><br /><br /> */}
                    <table
                      className="table table-borderless"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <th>
                          {<b style={{ fontSize: 16 }}> {t("realtime_175")}</b>}
                        </th>
                      </thead>
                    </table>

                    <table style={{ width: "100%" }}>
                      <tbody>
                        {/* 1 */}
                        <tr>
                          {/* Fuel Consumption */}
                          {/* <th><i className="demo-icon icon-water" style={{ paddingRight: 4 }} /><small>{t("realtime_24")}</small></th>
                      <th style={{ textAlign: 'right', paddingRight: 5 }}> <small>{isViewTemp.includes(this.props.dataLogin.userId) ? "N/A" : info.fuelCons}</small></th>
                      <th className='border-right-sensor'> <small>{t("realtime_46")}</small></th> */}

                          {/* Vehicle Battery */}
                          <th>
                            <i
                              className={info.vehicleBattLevel[0]}
                              style={{
                                color: info.vehicleBattLevel[1],
                                paddingRight: 4,
                              }}
                            />
                            <small>{t("realtime_29")} </small>
                          </th>
                          <th>
                            <small></small>
                          </th>
                          <th>
                            <small> {info.vehicleBatt}</small>
                            <small style={{ textAlign: "right" }}>
                              {t("realtime_49")}
                            </small>
                          </th>

                          {/* {t("Sensor Dynamic")} */}
                          {dynamicSensor &&
                            this.setdynamicSensor(dynamicSensor)}
                        </tr>

                        {/* 2 */}
                        <tr>
                          {/* รอบเครื่องยนต์ */}
                          <th>
                            <i
                              className="demo-icon icon-onetrack--icon-01"
                              style={{ paddingRight: 10, fontSize: 10 }}
                            />
                            <small>{t("realtime_13")}</small>
                          </th>
                          <th>
                            <small>{info.rpm}</small>
                          </th>
                          <th>
                            <small>{t("realtime_42")}</small>
                          </th>

                          {/* {t("realtime_30")} */}
                          {/* <th><i className={info.deviceBattLevel[0]} style={{ color: info.deviceBattLevel[1], paddingRight: 4 }} /><small>{t("realtime_30")} </small></th>
                      <th style={{ textAlign: 'right', paddingRight: 5 }}><small> {info.deviceBatt}</small></th>
                      <th ><small> {t("realtime_49")}</small></th> */}

                          {/* Door Sensor */}
                          {/* <th><i className="demo-icon icon-doorsensorsvg" style={{ paddingRight: 4 }} /><small >{t("realtime_32")}</small></th>
                      <th style={{ textAlign: 'right', paddingRight: 5 }}><small> {t(info.doorSensor)} </small></th>
                      <th><small></small></th> */}
                        </tr>

                        {/* 3 */}
                        <tr>
                          {/* Fuel Tank Level */}
                          <th>
                            <i
                              className="demo-icon icon-fuel"
                              style={{ paddingRight: 4 }}
                            />
                            <small>{t("realtime_26")}</small>
                          </th>
                          <th>
                            <small></small>
                          </th>
                          <th style={{ textAlign: "right", paddingRight: 5 }}>
                            {" "}
                            <small> {info.fuel}</small>
                            <small>{t("realtime_47")}</small>
                          </th>

                          {/* Brake */}
                          {/* <th><i className="icon-break" style={{ paddingRight: 4 }} /><small>{t("realtime_34")}</small></th>
                      <th style={{ textAlign: 'right', paddingRight: 5 }}> <small>{t(info.brakeStatus)}</small></th>
                      <th ><small></small></th> */}

                          {/* {t("PTO")} */}
                          {/* <th><i className="demo-icon icon-engine-01" style={{ paddingRight: 4 }} /><small>{t("realtime_33")}</small></th>
                      <th style={{ textAlign: 'right', paddingRight: 5 }}> <small> {t(info.pto)}</small></th>
                      <th><small></small></th> */}
                        </tr>

                        {/* 4 */}
                        <tr>
                          {/* Coolant Temperature */}
                          {/* <th><i className="demo-icon icon-coolant" style={{ paddingRight: 4 }} /><small>{t("realtime_27")}</small></th>
                      <th style={{ textAlign: 'right', paddingRight: 5 }}> <small>{info.cooltemp}</small></th>
                      <th className='border-right-sensor'> <small>{t("realtime_48")}</small></th> */}

                          {/* Exhaust Brake */}
                          {/* <th><i className="demo-icon icon-exhaust" style={{ paddingRight: 4 }} /><small>{t("realtime_35")}</small></th>
                      <th style={{ textAlign: 'right', paddingRight: 5 }}><small>{t(info.exhaustBrake)} </small>  </th>
                      <th ><small></small></th> */}
                        </tr>

                        {/* 5 */}
                        <tr>
                          {/* {t("E/G Check Lamp")} */}
                          <th>
                            <i
                              className="demo-icon icon-engine-01"
                              style={{ paddingRight: 4 }}
                            />
                            <small>{t("realtime_28")}</small>
                          </th>
                          <th>
                            <small></small>
                          </th>
                          <th
                            style={{
                              textAlign: "right",
                              paddingRight: 5,
                              color: info.dtc_engine === "realtime_50" && "red",
                            }}
                          >
                            {" "}
                            <small> {t(info.dtc_engine)}</small>
                          </th>

                          {/* Clutch */}
                          {/* <th><i className="icon-onetrack--icon-1" style={{ paddingRight: 4 }} /><small>{t("realtime_36")}</small></th>
                      <th style={{ textAlign: 'right', paddingRight: 5 }}><small>{t(info.clutchStatus)}</small></th>
                      <th ><small></small></th> */}
                        </tr>

                        <tr>
                          {/* {t("PTO")} */}
                          <th>
                            <span
                              style={{
                                fontSize: 12,
                                margin: "0px 6px 0px 1px",
                              }}
                            >
                              PTO
                            </span>
                            <small>{t("realtime_33")}</small>
                          </th>
                          <th>
                            <small></small>
                          </th>
                          <th style={{ textAlign: "right", paddingRight: 5 }}>
                            {" "}
                            <small> {t(info.pto)}</small>
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="table-tan" style={{ minWidth: 320 }}>
                    {/* <b style={{ fontSize: 16 }} > {t("realtime_37")}</b><br /><br /> */}
                    <table
                      className="table table-borderless"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <th>
                          <b style={{ fontSize: 16 }}> {t("realtime_37")}</b>
                        </th>
                      </thead>
                    </table>

                    <table style={{ width: "100%" }}>
                      <tbody>
                        {/* <tr>
                      <th><i className="icon-business" style={{ paddingRight: 4 }} /><small>{t("realtime_38")}</small></th>
                      <th><small style={{ color: '#A3A5A2' }}>{t("realtime_92")}</small></th>
                      <th style={{ textAlign: 'right' }}><small style={{ color: '#A3A5A2' }}>{info.insurance}</small></th>
                      <th><small style={{ color: '#A3A5A2' }}>{t("realtime_53")}</small></th>
                    </tr>

                    <tr>
                      <th><i className="icon-edited" style={{ paddingRight: 4 }} /><small >{t("realtime_39")}</small></th>
                      <th><small style={{ color: '#A3A5A2' }}>{t("realtime_92")}</small></th>
                      <th style={{ textAlign: 'right' }}><small style={{ color: '#A3A5A2' }}>{info.tiresService}</small></th>
                      <th><small style={{ color: '#A3A5A2' }}>{t("realtime_53")}</small></th>
                    </tr> */}

                        <tr>
                          <th>
                            <i
                              className="fa fa-cog"
                              style={{ paddingRight: 11 }}
                            />
                            <small>{t("other_reports_152")} </small>
                          </th>
                          {/* <th colspan="2" style={{ textAlign: 'right' }}><small style={{ color: '#ceb400e0' }}>{numberWithComma(info.nextService)}</small></th> */}
                          <th colspan="2" style={{ textAlign: "right" }}>
                            <small style={{ color: "#ceb400e0" }}>
                              {info.next_service}
                            </small>
                          </th>
                          <th>
                            <small>{t("realtime_44")}</small>
                          </th>
                        </tr>

                        <tr>
                          <th>
                            <img
                              alt="image"
                              style={{ height: 12, paddingRight: 9 }}
                              src={require("./icons/dtccode.png")}
                            />
                            <small>{t("DTC Code")} </small>
                          </th>
                          <th colspan="2" style={{ textAlign: "right" }}>
                            <small>{info.dtc}</small>
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </FormLoading>
          </div>
        </Row>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  information: state.realtimeNew.information,
  hideFooter: state.realtimeNew.hideFooter,
  language: state.versatile.language,
  listVideo: state.realtimeNew.listVideo,
  listSteaming: state.realtimeNew.listSteaming,
  isShowModalVideo: state.realtimeNew.isShowModalVideo,
  isLoadInfo: state.realtimeNew.isLoadInfo,
});

const mapDispatchToProps = (dispatch) => ({
  setStateReduxRealtime: (objStateRudux) =>
    dispatch(RealtimeNewActions.setStateReduxRealtime(objStateRudux)),
  setListVideo: (info, index) =>
    dispatch(RealtimeNewActions.setListVideo(info, index)),
  setValue: (name, value) => dispatch(RealtimeNewActions.setValue(name, value)),
  setIsShowModalVideo: (bln) =>
    dispatch(RealtimeNewActions.setIsShowModalVideo(bln)),
  getInformationMarkerSucc: (information, callFrom) =>
    dispatch(
      RealtimeNewActions.getInformationMarkerSucc(information, callFrom)
    ),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FooterInfo)
);

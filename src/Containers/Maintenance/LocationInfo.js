import React, { Component } from "react";
import MaintenanceActions from "../../Redux/MaintenanceRedux";
import { Row, Col } from "reactstrap";
import "./custom.css";
import { connect } from "react-redux";
import moment from "moment";
import { momentDate } from "../../Functions/DateMoment";
import PannelBox from "../../Components/PannelBox";
import { t, rTT } from "../../Components/Translation";
import { get, isEqual } from "lodash";
import {
  ENDPOINT_BASE_URL,
  ENDPOINT_REALTIME_V2,
  ENDPOINT_BASE_URL_YNM2,
} from "../../Config/app-config";
import Map from "./Map";
import { Radio } from "antd";
import $ from "jquery";
import { BoxContrainer } from "../../components_new";

export function statusCar(dt) {
  let id = "";
  let acc = get(dt, "acc", "");
  let speed = get(dt, "speed", 0);
  let speed_limit = get(dt, "speed_limit", 0);

  if (acc === "t") {
    if (speed_limit > 0 && speed > speed_limit) id = 5;
    else if (speed <= 2) id = 3;
    else id = 1;
  } else {
    id = 2;
  }
  return id;
}

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "-",
      eventTitle: "EVENT_1",
    };
    this.map = null;
  }

  componentDidMount = () => {
    let { messageInfo } = this.props;
    this.setInfoMarker(messageInfo, this.getStatusVehicle(messageInfo));
  };

  componentDidUpdate(prevProps, prevState) {
    let { messageInfo } = this.props;
    if (prevProps.messageInfo !== messageInfo) {
      this.setInfoMarker(messageInfo, this.getStatusVehicle(messageInfo));
    }
  }
  async setInfoMarker(messageInfo, status) {
    if (messageInfo.messageType == "topic") {
      let dt = messageInfo;
      this.getLocation(messageInfo);
      // let data = await this.getInfomation(messageInfo.vid)
      try {
        this.props.setValue("markerInfo", {
          lat: dt.lat,
          lng: dt.lng,
          course: dt.course,
          class_type: await this.getClassTypeVehicle(messageInfo.vid),
          status: status,
        });
        this.setInfo(dt);
        this.setState({ eventTitle: "EVENT_1" });
      } catch {}
    } else {
      this.setInfo(this.props.messageInfo);
    }
  }

  getStatusVehicle(data) {
    let info = {
      acc: data.acc,
      speed: data.speed,
      speed_limit: data.speed_limit,
      gpsdate: data.gpsdate,
    };
    return statusCar(info);
  }

  async getClassTypeVehicle(vid) {
    let data = await this.getInfomation(vid);
    return data.info.vehicle_type_id;
  }

  setInfo(data) {
    $("#lb_1").text(
      data.isCurrent
        ? data.event_id
        : data.event_id
        ? rTT(t("Notification_M_" + data.event_id)) || "-"
        : "-"
    );
    $("#lb_2").text(data.vin_no || "-");
    $("#lb_4").text(
      data.messageType && data.messageType == "grid"
        ? data.location || "-"
        : this.state.location
    );
    $("#lb_5").text(data.working_hour);
    $("#lb_6").text(
      data.isCurrent
        ? data.gpsdate
        : data.gpsdate
        ? moment(data.gpsdate).format("DD/MM/YYYY HH:mm:ss")
        : "-"
    );
  }

  fitBounds(lat, lng) {
    if (this.map !== null) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend({ lat, lng });
      this.map.fitBounds(bounds);

      if (this.map.fitBounds) {
        let northWest = new window.google.maps.LatLng(
          bounds.getSouthWest().lat(),
          bounds.getNorthEast().lng()
        );
        this.map.panTo(northWest);
      }
    }
  }

  async getLocation(info) {
    var response = await fetch(
      ENDPOINT_BASE_URL +
        "fleet/history/notify/" +
        info.unix +
        "/" +
        info.event_id +
        "?user_id=" +
        this.props.dataLogin.userId,
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

    if (data?.code == 200) this.setState({ location: data.result.location });
    else this.setState({ location: "" });

    this.fitBounds(info.lat, info.lng);
  }

  setLocation(location, value) {
    if (value !== "") location += value + " ";
    return location;
  }

  async getInfomation(vid) {
    try {
      var response = await fetch(
        ENDPOINT_REALTIME_V2 + "fleet/V2/Infomation?vid=" + vid,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        return data;
      }
    } catch {}
  }

  async getInformationExtend(vid) {
    try {
      var response = await fetch(
        `${ENDPOINT_BASE_URL_YNM2}fleet/dlt/excavator/Infomation?vid=${vid}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      var data = await response.json();
      if (response.status === 200) {
        return data;
      }

      console.log("getInformationExtend : ", data);
    } catch (error) {
      console.log("ERROR => getInformationExtend  : ", error);
    }
  }

  async changeEvent(event) {
    console.log(event);
    let { messageInfo, language } = this.props;
    if (event === "EVENT_2") {
      try {
        let data = await this.getInfomation(messageInfo.vid);

        let data2 = await this.getInformationExtend(messageInfo.vid);

        let location = "";
        if (language === "th") {
          location = this.setLocation(
            location,
            data2.location.admin_level3_name
          );
          location = this.setLocation(
            location,
            data2.location.admin_level2_name
          );
          location = this.setLocation(
            location,
            data2.location.admin_level1_name
          );
        } else {
          location = this.setLocation(
            location,
            data2.location.admin_level3_name_en
          );
          location = this.setLocation(
            location,
            data2.location.admin_level2_name_en
          );
          location = this.setLocation(
            location,
            data2.location.admin_level1_name_en
          );
        }

        let gpsdate = await get(data2, "gpsdate", null);
        let info = {
          vid: data2.vid,
          messageType: "grid",
          gpsdate:
            gpsdate !== null ? momentDate(get(data2, "gpsdate", null)) : "",
          event_id: "เหตุการณ์ปัจจุบัน",
          lat: data2.lat,
          lng: data2.lng,
          location: location,
          licenseplate: data2.licenseplate,
          class_type: data.info.vehicle_type_id,
          isCurrent: true,
          vin_no: data2.vin_no,
        };

        this.props.setValue("markerInfo", {
          lat: data2.lat,
          lng: data2.lng,
          course: data.gps.image.course,
          class_type: data.info.vehicle_type_id,
          status: data2.status,
        });

        this.setInfo(info);
      } catch {}
    } else {
      try {
        console.log(messageInfo);
        this.props.setValue("markerInfo", {
          lat: messageInfo.lat,
          lng: messageInfo.lng,
          course: messageInfo.course,
          class_type: await this.getClassTypeVehicle(messageInfo.vid),
          status: this.getStatusVehicle(messageInfo),
        });
        this.setInfo(messageInfo);
      } catch {}
    }
  }

  render() {
    let styles = { paddingRight: 20, fontSize: 16 };

    // console.log("RENDER LOACTION INFO", messageInfo)
    return (
      <div className="form-horizontal">
        <BoxContrainer
          title={"Notification_2"}
          toolbarRight={
            <div className="ibox-tools">
              <Radio.Group
                options={[
                  { label: "สถานที่เกิดเหตุ", value: "EVENT_1" },
                  { label: "สถานที่ปัจจุบัน", value: "EVENT_2" },
                ]}
                onChange={(e) => {
                  console.log(e);
                  this.setState({ eventTitle: e.target.value });
                  this.changeEvent(e.target.value);
                }}
                value={this.state.eventTitle}
                optionType="button"
                buttonStyle="solid"
              />
              <button
                onClick={() => this.props.history.push("/maintenance")}
                className="btn"
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  margin: "2px 5px 4px 4px",
                  height: 32,
                }}
              >
                <i className="fa fa-chevron-circle-left" aria-hidden="true" />{" "}
                {t("other_reports_24")}
              </button>
            </div>
          }
          showFooter={false}
          footerStyle={{ padding: 0 }}
        >
          <Row>
            <Col lg={12} md={6}>
              <div>
                <span style={styles}>
                  <b>{t("event")} : </b>
                  <span id="lb_1" />
                </span>
                <span style={styles}>
                  <b>{t("VIN")} : </b>
                  <span id="lb_2" />
                </span>
                {/* <span style={styles}><b>{t("realtime_7")} : </b><span id="lb_3" /></span> */}
                <span style={styles}>
                  <b>{t("location")} : </b>
                  <span id="lb_4" />
                </span>
                <span style={styles}>
                  <b>{t("history_19")} : </b>
                  <span id="lb_6" />
                </span>
                <span style={styles}>
                  <b>{t("history_117")} : </b>
                  <span id="lb_5" />
                </span>
              </div>
            </Col>
          </Row>
        </BoxContrainer>

        <div style={{ marginTop: -24, padding: "30px 15px 0px 15px" }}>
          <Row>
            <Map markerInfo={""} />
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  detailEvent: state.maintenance.detailEvent,
  messageInfo: state.maintenance.messageInfo,
  language: state.versatile.language,
});
const mapDispatchToProps = (dispatch) => ({
  setDetailEvent: () => dispatch(MaintenanceActions.setDetailEvent()),
  setStateMapControlNoti: (name, value) =>
    dispatch(MaintenanceActions.setStateMapControlNoti(name, value)),
  setValue: (name, value) => dispatch(MaintenanceActions.setValue(name, value)),
  setMessageInfoMtn: (data) =>
    dispatch(MaintenanceActions.setMessageInfoMtn(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Location);

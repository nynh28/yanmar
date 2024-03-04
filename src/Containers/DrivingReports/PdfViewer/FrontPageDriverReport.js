import React, { Component } from "react";
import { connect } from "react-redux";
import { t } from "../../../Components/Translation";
import moment from "moment";
import { Table } from "reactstrap";
import {
  Chart,
  CommonSeriesSettings,
  ValueAxis,
  ConstantLine,
  Label,
  SeriesTemplate,
  Animation,
  ArgumentAxis,
  Tooltip,
  Point,
  Series,
  Grid,
  Export,
  Legend,
  Font
} from "devextreme-react/chart";
import {
  exportFormats,
  categories_speed_level,
  categories_speed_event,
  translation,
} from "./data.js";
import DriverHeaderReport from "./DriverHeaderReport";
import Images from "../../../Themes/Images";
import "./driver.css";
import i18n from '../../../i18n'

const labelStyles = {
  display: "flex",
  justifyContent: "space-between",
  lineHeight: 17.85,
};

const headerBoxStyle = {
  borderBottom: "1px solid #8c8e8c",
  height: 25,
  padding: 3,
  width: "100%",
  backgroundColor: "#bcc4c1",
  marginBottom: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const HEIGHT = 125;
const nf = new Intl.NumberFormat();
class FrontPageDriverReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      driving: [],
      events: [],
      contentGps: [],
      contentTemp: [],
      gpsData: [],
      temperature: [],
      per_speed: {
        total: 0,
        parking: 0,
        idling: 0,
        speed_lv1: 0,
        speed_lv2: 0,
        speed_lv3: 0,
        speed_lv4: 0,
      },
      yLableSpeed: [],
      yLableRpm: [],
      yLableTemp: [],
      renderSpeed: [],
      renderRpm: [],
    };
  }

  componentDidMount() {
    const { dailyData, dataSource, language } = this.props;
    i18n.changeLanguage(language)
    if (dailyData) {
      let driving = [];
      let events = [];
      let gpsData = [];
      let temperature = [];
      let per_speed = this.state.per_speed;

      per_speed.total = moment(dataSource.end_date).diff(
        moment(dataSource.start_date),
        "seconds"
      );

      dailyData.gps &&
        dailyData.gps.map((element, index) => {
          if (index != dailyData.gps.length - 1) {
            // graph 1
            let obj = {};
            const start_date = moment(element.gpstime);
            const end_date = moment(dailyData.gps[index + 1].gpstime);
            if (element.acc == "f") {
              obj.speed_level = "จอดดับเครื่อง";
              per_speed.parking =
                per_speed.parking + end_date.diff(start_date, "seconds");
            }
            if (element.acc == "t") {
              if (element.speed == 0) {
                obj.speed_level = "จอดไม่ดับเครื่อง";
                per_speed.idling =
                  per_speed.idling + end_date.diff(start_date, "seconds");
              } else if (element.speed <= 60) {
                obj.speed_level = "ขับขี่ < 60 กม./ชม.";
                per_speed.speed_lv1 =
                  per_speed.speed_lv1 + end_date.diff(start_date, "seconds");
              } else if (element.speed <= 80) {
                obj.speed_level = "ขับขี่ 61-80 กม./ชม.";
                per_speed.speed_lv2 =
                  per_speed.speed_lv2 + end_date.diff(start_date, "seconds");
              } else if (element.speed <= 100) {
                obj.speed_level = "ขับขี่ 81-100 กม./ชม.";
                per_speed.speed_lv3 =
                  per_speed.speed_lv3 + end_date.diff(start_date, "seconds");
              } else {
                obj.speed_level = "ขับขี่ > 100 กม./ชม.";
                per_speed.speed_lv4 =
                  per_speed.speed_lv4 + end_date.diff(start_date, "seconds");
              }
            }

            const trip_date = moment(dataSource.start_date).add(1, "days");
            let last_date = moment(dailyData.gps[index + 1].gpstime);
            if (last_date.diff(trip_date, "seconds") > 0) last_date = trip_date;

            obj.start = new Date(element.gpstime);
            obj.end = new Date(last_date);
            obj.speed = "speed";
            obj.event = null;
            driving.push(obj);
          }

          // graph 3
          gpsData.push({
            gpstime: new Date(element.gpstime),
            speed: parseFloat(element.speed),
            rpm: parseFloat(element.rpm),
            event: null,
          });

          // graph 4
          temperature.push({
            gpstime: new Date(element.gpstime),
            temp1:
              element.temp[0] > 50
                ? 50
                : element.temp[0] < -50
                  ? -50
                  : element.temp[0],
            temp2:
              element.temp[1] > 50
                ? 50
                : element.temp[1] < -50
                  ? -50
                  : element.temp[1],
            temp3:
              element.temp[2] > 50
                ? 50
                : element.temp[2] < -50
                  ? -50
                  : element.temp[2],
          });
        });

      // data series in graph 3
      const contentGps = [
        {
          axis: "speed",
          value: "speed",
          name: "Speed",
          color: dailyData.colors.speed_limit,
        },
        { axis: "rpm", value: "rpm", name: "RPM", color: dailyData.colors.rpm },
        {
          axis: "speed",
          value: "point",
          name: "Alarm",
          color: "rgba(105, 210, 231, 0.01)",
        },
      ];

      // point - images;
      dailyData.alarm &&
        dailyData.alarm.map((element) => {
          // graph 3
          gpsData.push({
            gpstime: new Date(element.datetime),
            point: 110,
            event: element.event,
          });
        });

      // data series in graph 4
      const contentTemp = [
        {
          value: "temp1",
          name: "Temp Sensor 1",
          color: dailyData.colors.temperature_1,
        },
        {
          value: "temp2",
          name: "Temp Sensor 2",
          color: dailyData.colors.temperature_2,
        },
        {
          value: "temp3",
          name: "Temp Sensor 3",
          color: dailyData.colors.temperature_3,
        },
      ];

      for (let i = 0; i < 24; i++) {
        // mock data graph 1
        driving.push({
          start: new Date(moment(dataSource.start_date).add(i, "hours")),
          end: new Date(moment(dataSource.start_date).add(i + 1, "hours")),
          speed: "speed",
          speed_level: "จอดดับเครื่อง",
          event: "mock",
        });

        // mock data graph 2
        events.push({
          start: new Date(moment(dataSource.start_date).add(i, "hours")),
          end: new Date(moment(dataSource.start_date).add(i + 1, "hours")),
          speed: "speed",
          speed_level: "เบรกรุนแรง",
          event: "mock",
        });

        // mock data graph 3
        gpsData.push({
          gpstime: new Date(moment(dataSource.start_date).add(i, "hours")),
          speed: 0,
          rpm: 0,
          event: "mock",
        });

        // mock data graph 4
        temperature.push({
          gpstime: new Date(moment(dataSource.start_date).add(i, "hours")),
          temp1: null,
        });
      }

      gpsData.push({
        gpstime: new Date(moment(dataSource.start_date).add(24, "hours")),
        speed: 0,
        rpm: 0,
        event: "mock",
      });

      temperature.push({
        gpstime: new Date(moment(dataSource.start_date).add(24, "hours")),
        temp1: null,
      });

      // console.log("driving :> ", driving);
      // console.log("events :> ", events);
      // console.log("gpsData :> ", gpsData);
      // console.log("temperature :> ", temperature);

      this.setState(
        {
          driving,
          events,
          gpsData,
          temperature,
          contentGps,
          contentTemp,
          per_speed,
        },
        () => {
          // graph 2 and graph 1 (เข้าสถานี)
          dailyData.events && this.generateEvents(dataSource, dailyData.events);
        }
      );
    }
  }

  generateEvents = (dataSource, data) => {
    let events = this.state.events;
    let per_speed = this.state.per_speed;
    let driving = this.state.driving;

    per_speed.geofence = 0;
    per_speed.overspeed = data.overspeed ? data.overspeed.length : 0;
    per_speed.acceleration = data.acceleration ? data.acceleration.length : 0;
    per_speed.harsh_turn = data.harsh_turn ? data.harsh_turn.length : 0;
    per_speed.harsh_brake = data.harsh_brake ? data.harsh_brake.length : 0;
    per_speed.over_rpm = data.over_rpm ? data.over_rpm.length : 0;

    const trip_date = moment(dataSource.start_date).add(1, "days");

    data.geofence &&
      data.geofence.map((element, idx) => {
        let last_date = moment(element.end);
        if (last_date.diff(trip_date, "seconds") > 0) last_date = trip_date;

        per_speed.geofence =
          per_speed.geofence + last_date.diff(moment(element.start), "seconds");

        driving.push({
          speed_level: "เข้าสถานี",
          start: new Date(element.start),
          end: new Date(last_date),
          speed: "speed",
          event: null,
        });
      });

    data.overspeed_dlt &&
      data.overspeed_dlt.map((element, index) => {
        let last_date = moment(element.end);
        if (last_date.diff(trip_date, "seconds") > 0) last_date = trip_date;

        events.push({
          speed_level: "ความเร็วเกินกฎหมายกำหนด",
          start: new Date(element.start),
          end: new Date(last_date),
          speed: "speed",
          event: null,
        });
      });

    data.acceleration &&
      data.acceleration.map((element, index) => {
        let last_date = moment(element.end);
        if (last_date.diff(trip_date, "seconds") > 0) last_date = trip_date;

        events.push({
          speed_level: "เร่ง/ออกตัวรุนแรง",
          start: new Date(element.start),
          end: new Date(last_date),
          speed: "speed",
          event: null,
        });
      });

    data.harsh_turn &&
      data.harsh_turn.map((element, index) => {
        let last_date = moment(element.end);
        if (last_date.diff(trip_date, "seconds") > 0) last_date = trip_date;

        events.push({
          speed_level: "เลี้ยวรุนแรง",
          start: new Date(element.start),
          end: new Date(last_date),
          speed: "speed",
          event: null,
        });
      });

    data.harsh_brake &&
      data.harsh_brake.map((element, index) => {
        let last_date = moment(element.end);
        if (last_date.diff(trip_date, "seconds") > 0) last_date = trip_date;

        events.push({
          speed_level: "เบรกรุนแรง",
          start: new Date(element.start),
          end: new Date(last_date),
          speed: "speed",
          event: null,
        });
      });

    data.over_rpm &&
      data.over_rpm.map((element, index) => {
        let last_date = moment(element.end);
        if (last_date.diff(trip_date, "seconds") > 0) last_date = trip_date;

        events.push({
          speed_level: "รอบเครื่องเกินกรีนโซน",
          start: new Date(element.start),
          end: new Date(last_date),
          speed: "speed",
          event: null,
        });
      });

    this.setState({ events, per_speed, driving });
  };

  customizeText = (val) => {
    const time = moment(val.value).format("HH:mm");
    return time == "00:00" ? " 00:00 " : time;
  };

  customizePoint = (arg) => {
    const { colors } = this.props.dailyData;
    const speed_level = arg.data.speed_level;
    if (
      (speed_level == "จอดดับเครื่อง" || speed_level == "เบรกรุนแรง") &&
      arg.data.event == "mock"
    ) {
      return {
        color: "rgba(105, 210, 231, 0.01)",
        hoverStyle: { color: "rgba(105, 210, 231, 0.01)" },
      };
    } else if (speed_level == "จอดดับเครื่อง") {
      return { color: colors.parking, hoverStyle: { color: colors.parking } };
    } else if (speed_level == "จอดไม่ดับเครื่อง") {
      return { color: colors.idling, hoverStyle: { color: colors.idling } };
    } else if (speed_level == "ขับขี่ < 60 กม./ชม.") {
      return {
        color: colors.speed_lv1,
        hoverStyle: { color: colors.speed_lv1 },
      };
    } else if (speed_level == "ขับขี่ 61-80 กม./ชม.") {
      return {
        color: colors.speed_lv2,
        hoverStyle: { color: colors.speed_lv2 },
      };
    } else if (speed_level == "ขับขี่ 81-100 กม./ชม.") {
      return {
        color: colors.speed_lv3,
        hoverStyle: { color: colors.speed_lv3 },
      };
    } else if (speed_level == "ขับขี่ > 100 กม./ชม.") {
      return {
        color: colors.speed_lv4,
        hoverStyle: { color: colors.speed_lv4 },
      };
    } else if (speed_level == "เข้าสถานี") {
      return { color: colors.geofence, hoverStyle: { color: colors.geofence } };
    } else if (speed_level == "ความเร็วเกินกฎหมายกำหนด") {
      return {
        color: colors.overspeed,
        hoverStyle: { color: colors.overspeed },
      };
    } else if (speed_level == "เร่ง/ออกตัวรุนแรง") {
      return {
        color: colors.acceleration,
        hoverStyle: { color: colors.acceleration },
      };
    } else if (speed_level == "เลี้ยวรุนแรง") {
      return {
        color: colors.harsh_turn,
        hoverStyle: { color: colors.harsh_turn },
      };
    } else if (speed_level == "เบรกรุนแรง") {
      return {
        color: colors.harsh_brake,
        hoverStyle: { color: colors.harsh_brake },
      };
    } else if (speed_level == "รอบเครื่องเกินกรีนโซน") {
      return { color: colors.over_rpm, hoverStyle: { color: colors.over_rpm } };
    }
  };

  customizeImagePoint = (event) => {
    if (event.data.event == 10002) {
      // icon สีเหลือง
      return {
        image: {
          url: Images.temp,
          height: 17,
        },
        visible: true,
      };
    } else if (event.data.event == 10001) {
      return {
        image: {
          url: Images.pressure,
          height: 17,
        },
        visible: true,
      };
    } else if (event.data.event == 10000) {
      // icon สีแดง
      return {
        image: {
          url: Images.engine,
          height: 17,
        },
        visible: true,
      };
    }
  };

  customizeTextSpeed = (event) => {
    if (this.state.renderSpeed.length > 6) {
      const yLable = JSON.parse(JSON.stringify(this.state.yLableSpeed));
      const found = yLable.find((ele) => ele.value == event.value);
      if (!found && event.value != 80) {
        let yLableSpeed = this.state.yLableSpeed;
        yLableSpeed.push(event);
        yLableSpeed = yLableSpeed.sort((a, b) => b.value - a.value);
        this.setState({ yLableSpeed });
      }
    } else {
      let renderSpeed = this.state.renderSpeed;
      renderSpeed.push(1);
      this.setState({ renderSpeed });
    }
    return;
  };

  customizeTextRpm = (event) => {
    if (this.state.renderRpm.length > 6) {
      let yLableRpm = this.state.yLableRpm;
      const found = this.state.yLableRpm.find(
        (ele) => ele.value == event.value
      );
      if (!found) {
        yLableRpm.push(event);
        yLableRpm = yLableRpm.sort((a, b) => b.value - a.value);
        this.setState({ yLableRpm });
      }
    } else {
      let renderRpm = this.state.renderRpm;
      renderRpm.push(1);
      this.setState({ renderRpm });
    }
    return;
  };

  customizeTextTemp = (event) => {
    let yLableTemp = this.state.yLableTemp;
    const found = this.state.yLableTemp.find((ele) => ele.value == event.value);
    if (!found) {
      yLableTemp.push(event);
      yLableTemp = yLableTemp.sort((a, b) => b.value - a.value);
      this.setState({ yLableTemp });
    }
    return;
  };

  render() {
    const { per_speed, yLableSpeed, yLableRpm, yLableTemp } = this.state;
    const { dataSource, dailyData, language } = this.props;
    moment.locale(
      language,
      language == "ja"
        ? {
          monthsShort: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
        }
        : {}
    );
    let summary = null;
    let score = null;
    if (dailyData && dailyData.info) {
      summary = dailyData.info.summary;
      score = dailyData.info.score;
    }

    const time = translation[language].time;

    const total =
      per_speed.parking +
      per_speed.idling +
      per_speed.speed_lv1 +
      per_speed.speed_lv2 +
      per_speed.speed_lv3 +
      per_speed.speed_lv4 +
      per_speed.geofence || 24;

    return (
      <div
        className="a4-portrait-with-diver-other-report printreport"
        style={{ padding: 10 }}
      >
        <div style={{ height: "100%" }}>
          <DriverHeaderReport
            infoData={dailyData && dailyData.info}
            dataSource={dataSource}
          />
          <div style={{ border: "1px solid #fd3c32", margin: "10px 0px" }} />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "0px 10px",
                flex: 0.6,
              }}
            >
              <div style={labelStyles}>
                <h6>{t("driver_report_42")}:</h6>
                <h6
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    flex: 1,
                  }}
                >
                  {summary && summary.driving
                    ? `${Math.floor(summary.driving / 3600)} ${translation[language].h
                    } ${Math.round(
                      (summary.driving -
                        Math.floor(summary.driving / 3600) * 3600) /
                      60
                    )} ${translation[language].min}`
                    : `0 ${translation[language].min}`}
                </h6>
              </div>
              <div style={labelStyles}>
                <h6>{t("driver_report_5")}:</h6>
                <h6
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    flex: 1,
                  }}
                >
                  {summary && summary.working
                    ? `${Math.floor(summary.working / 3600)} ${translation[language].h
                    } ${Math.round(
                      (summary.working -
                        Math.floor(summary.working / 3600) * 3600) /
                      60
                    )} ${translation[language].min}`
                    : `0 ${translation[language].min}`}
                </h6>
              </div>
              <div style={labelStyles}>
                <h6>{t("driver_report_6")}:</h6>
                <h6
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    flex: 1,
                  }}
                >
                  {summary && summary.odo_start
                    ? `${nf.format(summary.odo_start)} ${translation[language].km
                    }`
                    : `0 ${translation[language].km}`}
                </h6>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h6 style={{ marginBottom: 0 }}>{t("driver_report_7")}:</h6>
                <h6
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    flex: 1,
                    marginBottom: 0,
                  }}
                >
                  {summary && summary.odo_end
                    ? `${nf.format(summary.odo_end)} ${translation[language].km
                    }`
                    : `0 ${translation[language].km}`}
                </h6>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "0px 20px",
                flex: 0.7,
              }}
            >
              <div style={labelStyles}>
                <h6>{t("summary_32")}:</h6>
                <h6
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    flex: 1,
                  }}
                >
                  {summary && summary.distance
                    ? `${nf.format(summary.distance)} ${translation[language].km
                    }`
                    : `0 ${translation[language].km}`}
                </h6>
              </div>
              <div style={labelStyles}>
                <h6>{t("summary_43")}:</h6>
                <h6
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    flex: 1,
                  }}
                >
                  {summary && summary.speed_max
                    ? `${summary.speed_max} ${translation[language].kmh}`
                    : `0 ${translation[language].kmh}`}
                </h6>
              </div>
              <div style={labelStyles}>
                <h6>{t("avg_speed")}:</h6>
                <h6
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    flex: 1,
                  }}
                >
                  {summary && summary.speed_avg
                    ? `${summary.speed_avg} ${translation[language].kmh}`
                    : `0 ${translation[language].kmh}`}
                </h6>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h6 style={{ marginBottom: 0 }}>{t("driver_report_10")}:</h6>
                <h6
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    flex: 1,
                    marginBottom: 0,
                  }}
                >
                  {summary && summary.fuel_cons
                    ? `${summary.fuel_cons} ${translation[language].kmL}`
                    : `0 ${translation[language].kmL}`}
                </h6>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "0px 20px",
                flex: 0.5,
              }}
            >
              <div style={labelStyles}>
                <h6>{t("driver_report_8")}:</h6>
                <h6
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    flex: 1,
                  }}
                >
                  {summary && summary.fuel_used
                    ? `${summary.fuel_used} ${translation[language].L}`
                    : `0 ${translation[language].kmL}`}
                </h6>
              </div>
              <div style={labelStyles}>
                <h6>{t("driver_report_9")}:</h6>
                <h6
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    flex: 1,
                  }}
                >
                  {summary && summary.fuel_price
                    ? `${nf.format(summary.fuel_price)} ${translation[language].thb
                    }`
                    : `0 ${translation[language].thb}`}
                </h6>
              </div>
              <div style={labelStyles}>
                <h6>{t("driver_report_1")}:</h6>
                <h6
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    flex: 1,
                  }}
                >
                  {summary && summary.idling
                    ? `${Math.round(summary.idling / 60)} ${translation[language].min
                    }`
                    : `0 ${translation[language].min}`}
                </h6>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h6 style={{ marginBottom: 0 }}>{t("driver_report_9")}:</h6>
                <h6
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    flex: 1,
                    marginBottom: 0,
                  }}
                >
                  {summary && summary.fuel_idle_price
                    ? `${summary.fuel_idle_price} ${translation[language].thb}`
                    : `0 ${translation[language].thb}`}
                </h6>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "0px 10px 0px 20px",
                flex: 0.5,
              }}
            >
              <Table
                size="sm"
                striped
                className="table-eco"
                style={{
                  textAlign: "center",
                  marginBottom: 0,
                }}
              >
                <thead style={{ fontSize: 10 }}>
                  <tr
                    style={{ color: "white", borderTop: "1px solid #8c8e8c" }}
                  >
                    <th
                      id="safety"
                      style={{
                        padding: 3,
                        fontWeight: "normal",
                        backgroundColor: "#1c84c6",
                      }}
                    >
                      {t("driver_report_11")}
                    </th>
                    <th
                      id="eco"
                      style={{
                        padding: 3,
                        backgroundColor: "#1ab394",
                        fontWeight: "normal",
                      }}
                    >
                      {t("driver_report_12")}
                    </th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: 8 }}>
                  <tr>
                    <th style={{ padding: 3 }}>
                      {score && score.safety ? score.safety : "70/70"}
                    </th>
                    <td style={{ padding: 3, fontWeight: "bold" }}>
                      {score && score.eco ? score.eco : "30/30"}
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ padding: 3 }}>
                      {score && score.total ? score.total : "100/100"}
                    </th>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "10px 10px 0px",
              justifyContent: "space-between",
              height: 135,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1.35,
                marginRight: 5,
              }}
            >
              <div style={labelStyles}>
                <h6 style={{ lineHeight: 1.05 }}>{t("driver_report_26")}</h6>
                <h6 style={{ lineHeight: 1.05 }}>{`${Math.round((per_speed.parking * 200) / total) / 2
                  }%`}</h6>
              </div>
              <div style={labelStyles}>
                <h6 style={{ lineHeight: 1.05 }}>{t("driver_report_1")}</h6>
                <h6 style={{ lineHeight: 1.05 }}>{`${Math.round((per_speed.idling * 200) / total) / 2
                  }%`}</h6>
              </div>
              <div style={labelStyles}>
                <h6 style={{ lineHeight: 1.05 }}>{t("driver_report_27")}</h6>
                <h6 style={{ lineHeight: 1.05 }}>{`${Math.round((per_speed.speed_lv1 * 200) / total) / 2
                  }%`}</h6>
              </div>
              <div style={labelStyles}>
                <h6 style={{ lineHeight: 1.05 }}>{t("driver_report_28")}</h6>
                <h6 style={{ lineHeight: 1.05 }}>{`${Math.round((per_speed.speed_lv2 * 200) / total) / 2
                  }%`}</h6>
              </div>
              <div style={labelStyles}>
                <h6 style={{ lineHeight: 1.05 }}>{t("driver_report_29")}</h6>
                <h6 style={{ lineHeight: 1.05 }}>{`${Math.round((per_speed.speed_lv3 * 200) / total) / 2
                  }%`}</h6>
              </div>
              <div style={labelStyles}>
                <h6 style={{ lineHeight: 1.05 }}>{t("driver_report_30")}</h6>
                <h6 style={{ lineHeight: 1.05 }}>{`${Math.round((per_speed.speed_lv4 * 200) / total) / 2
                  }%`}</h6>
              </div>
              <div style={labelStyles}>
                <h6 style={{ lineHeight: 1.05 }}>{t("driver_report_31")}</h6>
                <h6 style={{ lineHeight: 1.05 }}>{`${Math.round((per_speed.geofence * 200) / total) / 2
                  }%`}</h6>
              </div>
              <div style={labelStyles}>
                <h6 style={{ lineHeight: 2.45 }} />
                <h6 id="percent" style={{ lineHeight: 2.45, marginTop: 2 }}>
                  {total == 24 ? "0%" : "100%"}
                </h6>
              </div>
            </div>
            <div
              id="timeline-chart1"
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 6,
                marginLeft: -2,
              }}
            >
              <Chart
                id="timeline-chart-v1"
                // dataSource={this.state.driving}
                dataSource={this.state.driving}
                customizePoint={(arg) => this.customizePoint(arg)}
                rotated={true}
                size={{ height: HEIGHT, width: 870 }}
              >
                <ArgumentAxis categories={categories_speed_level}>
                  <Label
                    customizeText={(val) => {
                      return;
                    }}
                  >
                    <Font size={"9"} family={"Prompt"} weight={500} />
                  </Label>
                </ArgumentAxis>
                <ValueAxis valueMarginsEnabled={false} axisDivisionFactor={30}>
                  <Label customizeText={(val) => this.customizeText(val)}>
                    <Font size={"9"} family={"Prompt"} weight={500} />
                  </Label>
                </ValueAxis>
                <CommonSeriesSettings
                  type="rangeBar"
                  argumentField="speed_level"
                  rangeValue1Field="start"
                  rangeValue2Field="end"
                  barOverlapGroup="speed_level"
                />
                <SeriesTemplate nameField="speed" />
                <Animation enabled={false} />
                <Tooltip enabled={false} />
                <Legend visible={false} />
              </Chart>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 0.15,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "10px 10px 0px",
              justifyContent: "space-between",
              height: 115,
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", flex: 1.35 }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 8,
                  fontWeight: 500,
                  color: "#767676",
                  textAlign: "left",
                }}
              >
                <h6 style={{ lineHeight: 1.3 }}>{t("driver_report_36")}</h6>
                <h6
                  style={{ lineHeight: 1.3 }}
                >{`${per_speed.overspeed} ${time}`}</h6>
              </div>
              <div style={labelStyles}>
                <h6 style={{ lineHeight: 1.3 }}>{t("driver_report_37")}</h6>
                <h6
                  style={{ lineHeight: 1.3 }}
                >{`${per_speed.acceleration} ${time}`}</h6>
              </div>
              <div style={labelStyles}>
                <h6 style={{ lineHeight: 1.3 }}>{t("driver_report_38")}</h6>
                <h6
                  style={{ lineHeight: 1.3 }}
                >{`${per_speed.harsh_turn} ${time}`}</h6>
              </div>
              <div style={labelStyles}>
                <h6 style={{ lineHeight: 1.3 }}>{t("driver_report_39")}</h6>
                <h6
                  style={{ lineHeight: 1.3 }}
                >{`${per_speed.harsh_brake} ${time}`}</h6>
              </div>
              <div style={labelStyles}>
                <h6 style={{ lineHeight: 1.3 }}>{t("driver_report_40")}</h6>
                <h6
                  style={{ lineHeight: 1.3 }}
                >{`${per_speed.over_rpm} ${time}`}</h6>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", flex: 6 }}>
              <Chart
                id="timeline-chart-v2"
                dataSource={this.state.events}
                customizePoint={(arg) => this.customizePoint(arg)}
                rotated={true}
                size={{ height: 105, width: 870 }}
              >
                <ArgumentAxis categories={categories_speed_event}>
                  <Label
                    customizeText={(val) => {
                      return;
                    }}
                  >
                    <Font size={"9"} family={"Prompt"} weight={500} />
                  </Label>
                </ArgumentAxis>
                <ValueAxis valueMarginsEnabled={false} axisDivisionFactor={30}>
                  <Label customizeText={(e) => this.customizeText(e)}>
                    <Font size={"9"} family={"Prompt"} weight={500} />
                  </Label>
                </ValueAxis>
                <CommonSeriesSettings
                  type="rangeBar"
                  argumentField="speed_level"
                  rangeValue1Field="start"
                  rangeValue2Field="end"
                  barOverlapGroup="speed_level"
                ></CommonSeriesSettings>
                <SeriesTemplate nameField="speed" />
                <Animation enabled={false} />
                <Tooltip enabled={false} />
                <Legend visible={false} />
              </Chart>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 0.15,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "10px 10px 0px",
              height: 205,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <div
                style={{
                  margin: "12px 7px 0px 0px",
                  border: "1px solid #8c8e8c",
                  borderWidth: "1px",
                  display: "flex",
                  height: 160,
                }}
              >
                <h6 id="driver-comment" style={headerBoxStyle}>
                  {t("driver_report_16")}
                </h6>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 0.35,
                margin: "-6px -6px auto auto",
              }}
            >
              <h6 style={{ marginBottom: 3, textAlign: "right" }}>Speed</h6>
              {yLableSpeed.map((element, idx) => {
                const margin = Math.ceil(150 / (yLableSpeed.length - 1)) - 11;
                return (
                  <h6
                    key={idx}
                    style={{
                      textAlign: "right",
                      marginBottom: yLableSpeed.length == idx + 1 ? 0 : margin,
                    }}
                  >
                    {`${element.value} km/h`}
                  </h6>
                );
              })}
            </div>
            <div
              style={{
                width: "100%",
                flex: 6,
                marginTop: 10,
                marginRight: -6,
              }}
            >
              <Chart
                id="point-image-chart"
                dataSource={this.state.gpsData}
                style={{ height: 180, width: 870 }}
                customizePoint={(val) => this.customizeImagePoint(val)}
              >
                <CommonSeriesSettings argumentField="gpstime">
                  <Point visible={false} />
                </CommonSeriesSettings>
                {this.state.contentGps.map(function (item) {
                  return (
                    <Series
                      axis={item.axis}
                      key={item.value}
                      valueField={item.value}
                      name={item.name}
                      color={item.color}
                    />
                  );
                })}
                <ArgumentAxis axisDivisionFactor={30}>
                  <Grid visible={true} />
                  <Label customizeText={(val) => this.customizeText(val)}>
                    <Font
                      color="white"
                      size={"9"}
                      family={"Prompt"}
                      weight={500}
                    />
                  </Label>
                </ArgumentAxis>

                {/* left value */}
                <ValueAxis
                  name="speed"
                  position="left"
                  // axisDivisionFactor={20}
                  defaultVisualRange={[0, 120]}
                  tickInterval={30}
                  valueMarginsEnabled={false}
                >
                  <ConstantLine
                    value={80}
                    width={2}
                    color="#6e2c4f"
                    dashStyle="dash"
                  />
                  <Label customizeText={(val) => this.customizeTextSpeed(val)}>
                    <Font size={"9"} family={"Prompt"} weight={500} />
                  </Label>
                  <Grid visible={false} />
                </ValueAxis>

                {/* rigth value */}
                <ValueAxis
                  name="rpm"
                  position="right"
                  // axisDivisionFactor={2}
                  defaultVisualRange={[0, 8000]}
                  tickInterval={2000}
                  valueMarginsEnabled={false}
                >
                  <Label customizeText={(val) => this.customizeTextRpm(val)}>
                    <Font size={"9"} family={"Prompt"} weight={500} />
                  </Label>
                  <Grid visible={false} />
                </ValueAxis>

                <Export enabled={false} formats={exportFormats} />
                <Legend visible={false} />
              </Chart>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: -15,
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h6
                    id="temp-sensor-1"
                    style={{
                      marginBottom: 0,
                      color: dailyData.colors.temperature_1,
                    }}
                  >
                    Temp Sensor 1
                  </h6>
                  <h6
                    id="temp-sensor-2"
                    style={{
                      paddingLeft: 20,
                      marginBottom: 0,
                      color: dailyData.colors.temperature_2,
                    }}
                  >
                    Temp Sensor 2
                  </h6>
                  <h6
                    id="temp-sensor-3"
                    style={{
                      paddingLeft: 20,
                      marginBottom: 0,
                      color: dailyData.colors.temperature_3,
                    }}
                  >
                    Temp Sensor 3
                  </h6>
                </div>
                <div style={{ display: "flex" }}>
                  <h6 style={{ marginBottom: 0 }}>
                    <img
                      src={Images.temp}
                      style={{ width: 26, height: 26, padding: 3 }}
                    />
                    {t("driver_report_13")}
                  </h6>
                  <h6
                    style={{
                      paddingLeft: 10,
                      marginBottom: 0,
                      color: "rgb(131 131 131)",
                    }}
                  >
                    <img
                      src={Images.pressure}
                      style={{ width: 26, height: 26, padding: 3 }}
                    />
                    {t("driver_report_14")}
                  </h6>
                  <h6
                    style={{
                      paddingLeft: 10,
                      marginBottom: 0,
                      color: "rgb(131 131 131)",
                    }}
                  >
                    <img
                      src={Images.engine}
                      style={{ width: 26, height: 26, padding: 3 }}
                    />
                    {t("driver_report_15")}
                  </h6>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 0.15,
                margin: "-6px auto auto 2px",
              }}
            >
              <h6 style={{ marginBottom: 3, textAlign: "left" }}>RPM</h6>
              {yLableRpm.map((element, idx) => {
                const margin = Math.ceil(150 / (yLableRpm.length - 1)) - 11;
                return (
                  <h6
                    key={idx}
                    style={{
                      textAlign: "left",
                      marginBottom: yLableRpm.length == idx + 1 ? 0 : margin,
                    }}
                  >
                    {`${element.valueText}`}
                  </h6>
                );
              })}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "10px 10px",
              height: 135,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <div
                style={{
                  margin: "-33px 1px 0px 0px",
                  borderLeft: "1px solid #8c8e8c",
                  borderRight: "1px solid #8c8e8c",
                  borderBottom: "1px solid #8c8e8c",
                  borderWidth: "1px",
                  display: "flex",
                  height: 160,
                }}
              >
                <h6 id="driver-comment" style={headerBoxStyle}>
                  {t("driver_report_17")}
                </h6>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 0.35,
                margin: "-3px 2px 0px 0px",
              }}
            >
              {yLableTemp.map((element, idx) => {
                const margin = Math.ceil(100 / (yLableTemp.length - 1)) - 11;
                return (
                  <h6
                    key={idx}
                    style={{
                      textAlign: "right",
                      marginTop:
                        yLableTemp.length == 1 && element.value == 0
                          ? 102
                          : yLableTemp.length == 1
                            ? 51
                            : 0,
                      marginBottom: yLableTemp.length == idx + 1 ? 0 : margin,
                    }}
                  >
                    {`${element.valueText}\u00b0 C`}
                  </h6>
                );
              })}
            </div>
            <div style={{ width: "100%", flex: 6 }}>
              <Chart
                id="line-chart"
                dataSource={this.state.temperature}
                style={{
                  height: HEIGHT,
                  width: 870,
                }}
              >
                <CommonSeriesSettings argumentField="gpstime">
                  <Point visible={false} />
                </CommonSeriesSettings>
                {this.state.contentTemp.map(function (item) {
                  return (
                    <Series
                      key={item.value}
                      valueField={item.value}
                      name={item.name}
                      color={item.color}
                    />
                  );
                })}
                <ArgumentAxis axisDivisionFactor={20}>
                  <Grid visible={true} />
                  <Label customizeText={(val) => this.customizeText(val)}>
                    <Font size={"9"} family={"Prompt"} weight={500} />
                  </Label>
                </ArgumentAxis>
                <ValueAxis defaultVisualRange={[-50, 50]} tickInterval={50}>
                  <ConstantLine
                    value={dailyData.info.temp_limit}
                    width={2}
                    color="#6e2c4f"
                    dashStyle="dash"
                  >
                    <Label visible={false} />
                  </ConstantLine>
                  <Grid visible={false} />
                  <Label customizeText={(val) => this.customizeTextTemp(val)}>
                    <Font size={"9"} family={"Prompt"} weight={500} />
                  </Label>
                </ValueAxis>
                <Export enabled={false} formats={exportFormats} />
                <Legend visible={false} />
              </Chart>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", flex: 0.15 }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.versatile.language,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FrontPageDriverReport);

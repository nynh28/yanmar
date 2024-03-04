import React, { Component } from "react";
import { connect } from "react-redux";
import TrackingHistoryActions from "../../../Redux/TrackingHistoryRedux";
import { get } from "lodash";
import $ from "jquery";
import { Row, Col } from "reactstrap";
import { t } from "../../../Components/Translation";
import "../Styles/footer.css";
import "../Styles/slider.css";
import ChartRender from "../Charts/ChartRender";
import Combinations from "../Charts/Combinations";
import PopSetting from "./Popover/PopSetting";
import PopSettingChart from "./Popover/PopSettingChart";
import PopSettingSpeed from "./Popover/PopSettingSpeed";
import { getChartName, getConfigChart } from "../Functions";
import { momentDate } from "../../../Functions/DateMoment";
import moment from "moment";
import images from "../../../Themes/Images";
import icons from "../icons/Images";
import Loading from "./Loading";
import SliderBar from "../Objects/SliderBar";
import { numberWithComma } from "../../../Functions/Calculation";

const EVENT_EXPAND_CHART = [
  {
    title: "Small",
    cssClass: "small-chart",
    icon: icons.ic_small,
    // icon: 'fas fa-hourglass-end'
  },
  {
    title: "Middle",
    cssClass: "middle-chart",
    icon: icons.ic_middle,
    // icon: 'fas fa-hourglass-half'
  },
  {
    title: "Large",
    cssClass: "large-chart",
    icon: icons.ic_large,
    // icon: 'fas fa-hourglass'
  },
];

let countRender = 0;
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.popSetting = true;
    this.PointHoverCurrent = {};
    this.defaultVisualRange = "";
  }

  componentWillMount() {
    this.defaultVisualRange = this.props.defaultVisualRange;
  }

  componentDidMount() {
    if (this.props.isRenderChart) this.props.setValue("isRenderChart", false);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { playing, indexPlaying, dataAllPoint, isRenderChart } = this.props;

    if (nextProps.isRenderChart !== isRenderChart) {
      if (nextProps.isRenderChart) {
        setTimeout(() => {
          this.props.setValue("isRenderChart", false);
        }, 1500);
      }
    }

    if (nextProps.playing !== playing) {
      this.resetChart();
      this.setIcon(nextProps.playing);
      return false;
    }

    if (nextProps.indexPlaying !== indexPlaying) {
      this.pointHover(dataAllPoint[nextProps.indexPlaying], false);
      return false;
    }

    return true;
  }

  setIcon(isPlay) {
    if (isPlay) {
      $("#ic-playing").removeClass("fa fa-play");
      $("#ic-playing").addClass("fa fa-pause");
    } else {
      $("#ic-playing").removeClass("fa fa-pause");
      $("#ic-playing").addClass("fa fa-play");
    }
  }

  _onCollapseComponent = () => {
    let myibox2 = $(`#footer-colaps-chart`);
    myibox2.slideToggle(600);
  };

  onLegendClick(chart_id) {
    // console.log("onLegendClick : ", this["charRef_" + chart_id])
    // let e = this["charRef_" + chart_id]
    // const series = e.current.instance.series[0];
    // if (series.isVisible()) {
    //   series.hide();
    // } else {
    //   series.show();
    // }
  }

  setInfo(label, color, isCircle = true, text = "", isDashed = false) {
    let elm = [];

    if (isDashed)
      elm.push(
        <span onClick={() => this.onLegendClick(7)} style={{ color }}>
          <b>---</b>
        </span>
      );
    else
      elm.push(
        <i
          onClick={() => this.onLegendClick(7)}
          className={isCircle ? "fa fa-circle" : "fa fa-square"}
          style={{ color, fontSize: 10 }}
        />
      );

    elm.push(
      <span
        onClick={() => this.onLegendClick(7)}
        style={{ marginLeft: 5, fontSize: 12, paddingRight: 20 }}
      >
        {" "}
        {text} {t(label)}
      </span>
    );
    return elm;
  }

  setLegendChart(chart_id) {
    let { option_temperature, config } = this.props;
    let chart_colors = get(config, "chart_colors", {}),
      element = [];
    switch (chart_id) {
      case 1:
        element.push(this.setInfo("PTO", "rgb(141 0 241)", false));
        element.push(
          this.setInfo("realtime_174", get(chart_colors, "driving"), false)
        );
        element.push(
          this.setInfo("history_123", get(chart_colors, "idling"), false)
        );
        element.push(
          this.setInfo("history_22", get(chart_colors, "parking"), false)
        );
        // element.push(
        //   this.setInfo(
        //     "history_27",
        //     get(chart_colors, "overspeed"),
        //     false,
        //     "",
        //     true
        //   )
        // );
        break;
      case 2:
        // element.push(
        //   this.setInfo(
        //     "history_104",
        //     get(chart_colors, "rpm_zone.green_zone"),
        //     false
        //   )
        // );
        // element.push(
        //   this.setInfo(
        //     "history_105",
        //     get(chart_colors, "rpm_zone.red_zone"),
        //     false
        //   )
        // );
        element.push(
          this.setInfo("history_10", get(chart_colors, "rpm"), false)
        );
        break;
      case 3:
        element.push(
          this.setInfo("history_16", get(chart_colors, "pedal"), false)
        );
        break;
      case 4:
        element.push(
          this.setInfo("history_23", get(chart_colors, "brake"), true, "BK = ")
        );
        element.push(
          this.setInfo(
            "history_24",
            get(chart_colors, "exhaust"),
            true,
            "EB = "
          )
        );
        element.push(
          this.setInfo("history_25", get(chart_colors, "dtc"), true, "EL = ")
        );
        element.push(
          this.setInfo("history_26", get(chart_colors, "clutch"), true, "CL = ")
        );
        break;
      case 5:
        element.push(
          this.setInfo("history_14", get(chart_colors, "temperature"), false)
        );
        break;
      case 6:
        element.push(
          this.setInfo("history_12", get(chart_colors, "fuel"), false)
        );
        break;
      // case 7: Old
      //   element.push(this.setInfo("history_44", get(chart_colors, "temp_cool"), false))
      //   element.push(this.setInfo("history_44", get(chart_colors, "temp_hot"), false))
      //   element.push(this.setInfo("เส้นอุณหภูมิจำกัด", get(chart_colors, "temp_limit"), false, "", true))
      //   break;
      case 7:
        for (let idx in option_temperature) {
          element.push(
            this.setInfo(
              option_temperature[idx].name,
              option_temperature[idx].color,
              false
            )
          );
        }
        element.push(
          this.setInfo(
            "history_103",
            get(chart_colors, "temp_limit"),
            false,
            "",
            true
          )
        );
        break;
      case 8:
        element.push(
          this.setInfo("Main Battery", get(chart_colors, "main_battery"), false)
        );
        // element.push(
        //   this.setInfo(
        //     "Backup Battery",
        //     get(chart_colors, "backup_battery"),
        //     false
        //   )
        // );
        break;
      case 9:
        element.push(
          this.setInfo("history_121", get(chart_colors, "temperature"), false)
        );
        break;
    }

    return element;
  }

  setHeaderChart(chart_id) {
    return (
      <div className="footer-header-legend">
        <div className="bar-tools-track" style={{ minHeight: 30 }}>
          <span
            style={{
              marginLeft: 6,
              fontSize: 12,
              paddingRight: 20,
              fontWeight: 600,
            }}
          >
            <i
              className={"fa fa-area-chart"}
              style={{ fontSize: 10, marginRight: 6 }}
            />
            {t(getChartName(chart_id))}
          </span>
          <div
            className="bar-tools-right"
            style={{ marginRight: 0, marginTop: 0 }}
          >
            {this.setLegendChart(chart_id)}
          </div>
        </div>
      </div>
    );
  }

  pointHover(data, index, isHover) {
    $("#point_1").text(
      moment(data.time, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss")
    );
    $("#point_2").text(data.speed < 0 ? 0 : data.speed);
    $("#point_3").text(numberWithComma(data.rpm));
    $("#point_4").text(parseInt(data.fuel));
    $("#point_5").text(data.canbus_cooltemp);
    $("#point_6").text(data.canbus_acc_pedal);
    $("#point_7").text(data.temperatures);
    $("#point_8").text(data.vehicle_batt);
    $("#point_9").text(data.device_batt);
    $("#point_10").text(data.pto === 1 ? "เปิด" : "ปิด");

    if (isHover) {
      this.PointHoverCurrent = data;
      this.IndexPointCurrent = index;
    } else {
      // this.props.setValue("indexPlaying", this.IndexPointCurrent)
    }
  }

  resetChart() {
    let { chartVisibled, dateStart, dateEnd } = this.props;
    let _dateStart = moment(dateStart, "DD/MM/YYYY HH:mm:ss").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    let _dateEnd = moment(dateEnd, "DD/MM/YYYY HH:mm:ss").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    for (let index in chartVisibled) {
      let argAxis =
        this[
          "charRef_" + chartVisibled[index]
        ].current.instance.getArgumentAxis();
      argAxis.visualRange([_dateStart, _dateEnd]);
    }

    // let argAxis = this["charRef_" + 2].current.instance.getArgumentAxis()
    // argAxis.visualRange([_dateStart, _dateEnd]);
  }

  zoomChart(zoomType) {
    let { chartVisibled } = this.props;
    let dateStart = moment(this.defaultVisualRange[0]).toDate();
    let dateEnd = moment(this.defaultVisualRange[1]).toDate();

    let _dateStart = "",
      _dateEnd = "",
      timestampStart = "",
      timestampEnd = "";
    if (zoomType == "IN") {
      timestampStart = dateStart.setHours(dateStart.getHours() + 1);
      timestampEnd = dateEnd.setHours(dateEnd.getHours() - 1);
    } else {
      timestampStart = dateStart.setHours(dateStart.getHours() - 1);
      timestampEnd = dateEnd.setHours(dateEnd.getHours() + 1);
    }

    _dateStart = moment(timestampStart, "x").format("YYYY-MM-DD HH:mm:ss");
    _dateEnd = moment(timestampEnd, "x").format("YYYY-MM-DD HH:mm:ss");

    let diffHours = moment(_dateEnd).diff(moment(_dateStart), "hours");
    if (diffHours == 0) {
      _dateEnd = this.defaultVisualRange[1];
      $("#btn-zoom-in").css("color", "#dbdbdb");
      $("#btn-zoom-in").css("cursor", "no-drop");
    } else if (diffHours > 0) {
      $("#btn-zoom-in").css("color", "#595959");
      $("#btn-zoom-in").css("cursor", "pointer");
    } else {
      return;
    }

    // this.canZoomIn

    for (let index in chartVisibled) {
      let argAxis =
        this[
          "charRef_" + chartVisibled[index]
        ].current.instance.getArgumentAxis();
      argAxis.visualRange([_dateStart, _dateEnd]);
    }
    this.defaultVisualRange = [_dateStart, _dateEnd];
  }

  render() {
    let { isLoadingTrips, chartVisibled, isRenderChart, cssChart } = this.props;
    let styles = { paddingRight: 20, fontSize: 12 };
    // console.log(">> RENDER FOOTER << : ")

    return !isLoadingTrips ? (
      <div style={{ backgroundColor: "#FFF" }}>
        <SliderBar
          onPointMove={(value) => this.pointHover(value, null, false)}
        />

        <div>
          {/* <div style={{ margin: '0px 0px -15px 0px', padding: '0px 13px 0px 16px' }}> */}
          <div className="footer-header-setting">
            <div className="bar-tools">
              <a
                className="btn btn-option btn-sm btn-play"
                onClick={() => {
                  this.props.setPlay();
                }}
              >
                <i id="ic-playing" className="fa fa-play" title={"Play"}></i>
              </a>
              <span>
                <b>{t("history_19")} : </b>
                <span id="point_1"> -</span>
              </span>
              <span>
                <b>{t("realtime_11")} : </b>
                <span id="point_2"> - </span> {t("realtime_41")}
              </span>
              <span>
                <b>{t("history_10")} : </b>
                <span id="point_3"> - </span> {t("realtime_42")}
              </span>
              <span>
                <b>{t("history_13")} : </b>
                <span id="point_4"> - </span> {t("%")}
              </span>
              <span>
                <b>{t("history_15")} : </b>
                <span id="point_5"> - </span> {t("realtime_48")}
              </span>
              {/* <span>
                <b>{t("history_17")} : </b>
                <span id="point_6"> - </span> {t("%")}
              </span> */}
              <span>
                <b>{t("Main Battery")} : </b>
                <span id="point_8"> - </span> {t("V")}
              </span>
              <span>
                <b>{t("Backup Battery")} : </b>
                <span id="point_9"> - </span> {t("V")}
              </span>

              <span>
                <b>{t("PTO")} : </b>
                <span id="point_10"> - </span>
              </span>
              {/* <span><b>{t("history_44")} : </b><span id="point_7"> - </span> {t("realtime_48")}</span> */}

              <div
                className="bar-tools-right"
                style={{ marginRight: 0, marginTop: 0 }}
              >
                {/* ------------------------------------------------------- */}
                {EVENT_EXPAND_CHART.map((item) => {
                  return (
                    <a
                      className="btn btn-option btn-sm btn-option"
                      onClick={() =>
                        this.props.setValue("cssChart", item.cssClass)
                      }
                    >
                      {/* <i className={item.icon} title={item.title}></i> */}
                      <img src={item.icon} alt="image" style={{ height: 12 }} />
                    </a>
                  );
                })}
                {/* ------------------------------------------------------- */}
                <a
                  className="btn btn-option btn-sm btn-option"
                  onClick={() => this.zoomChart("OUT")}
                >
                  <i className="fa fa-search-minus" title={"zoom out"}></i>
                </a>

                <a
                  id="btn-zoom-in"
                  className="btn btn-option btn-sm btn-option"
                  onClick={() => this.zoomChart("IN")}
                >
                  <i className="fa fa-search-plus" title={"zoom in"}></i>
                </a>

                <a
                  className="btn btn-option btn-sm btn-option"
                  onClick={() => {
                    this.resetChart();
                  }}
                >
                  <i className="fa fa-undo" title={"Reset"}></i>
                </a>

                <PopSettingChart />
                <PopSettingSpeed />

                {/* <PopSetting
                content={
                  <a className="btn btn-option btn-sm btn-option"
                    onClick={() => { }}>
                    <i className="fa fa-cog" title={"Setting"}></i>
                  </a>
                }
              /> */}
              </div>
            </div>
          </div>

          <div className={"footer-chart scrollbar-custom " + cssChart}>
            <div className="footer-panel-chart">
              {/* {console.log("chartVisibled : ", chartVisibled)} */}
              {/* <Loading /> */}
              {isRenderChart ? (
                <div style={{ height: 178 }}>
                  <br />
                  <br />
                  <center>
                    <div>
                      <img
                        src={images.loading}
                        style={{ width: 50, height: 50 }}
                      />
                    </div>
                  </center>
                </div>
              ) : (
                chartVisibled.map((chart_id, index) => {
                  return (
                    <div
                      id={"chart_" + chart_id}
                      style={{ marginTop: index == 0 ? 0 : -20 }}
                    >
                      {this.setHeaderChart(chart_id)}

                      <div id="row_chart">
                        <Col lg={12}>
                          <ChartRender
                            chartRefList={this.chartRefList}
                            onDone={(ref) =>
                              (this["charRef_" + chart_id] = ref)
                            }
                            chartName={"distance"}
                            chartTypeId={chart_id}
                            onPointHoverChanged={(data, index) =>
                              this.pointHover(data, index, true)
                            }
                            onSeriesClick={() =>
                              this.props.setValue(
                                "MarkerInteractiveData",
                                this.PointHoverCurrent
                              )
                            }
                            chartConfig={getConfigChart(chart_id)}
                            visualRangeChange={(range) => {
                              if (
                                range[0] !== this.defaultVisualRange[0] &&
                                range[1] !== this.defaultVisualRange[1]
                              ) {
                                this.defaultVisualRange = range;
                                try {
                                  for (let index in chartVisibled) {
                                    // console.log("CHANGE : ", index)
                                    let argAxis =
                                      this[
                                        "charRef_" + chartVisibled[index]
                                      ].current.instance.getArgumentAxis();
                                    argAxis.visualRange(range);
                                  }
                                } catch {}
                              }
                            }}
                          />
                        </Col>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    ) : (
      ""
    );
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  playing: state.trackingHistory.playing,
  isLoadingTrips: state.trackingHistory.isLoadingTrips,
  chartVisibled: state.trackingHistory.chartVisibled,
  config: state.signin.config,
  isRenderChart: state.trackingHistory.isRenderChart,
  defaultVisualRange: state.trackingHistory.defaultVisualRange,
  indexPlaying: state.trackingHistory.indexPlaying,
  dataAllPoint: state.trackingHistory.dataAllPoint,
  dateStart: state.trackingHistory.dateStart,
  dateEnd: state.trackingHistory.dateEnd,
  cssChart: state.trackingHistory.cssChart,
  option_temperature: state.trackingHistory.option_temperature,
});

const mapDispatchToProps = (dispatch) => ({
  getHistoryData: (data) =>
    dispatch(TrackingHistoryActions.getHistoryData(data)),
  setPlay: () => dispatch(TrackingHistoryActions.setPlay()),
  setValue: (name, value) =>
    dispatch(TrackingHistoryActions.setValue(name, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);

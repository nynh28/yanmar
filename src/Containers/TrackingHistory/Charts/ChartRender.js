import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import TrackingHistoryActions from "../../../Redux/TrackingHistoryRedux";
import {
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  CommonAxisSettings,
  Grid,
  Export,
  Legend,
  Margin,
  Tooltip,
  Point,
  ValueAxis,
  Border,
  Animation,
  ZoomAndPan,
  ScrollBar,
  Label,
  Crosshair,
  HorizontalLine,
  ConstantLine,
  Aggregation,
  Strip,
  StripStyle,
} from "devextreme-react/chart";
import { t } from "../../../Components/Translation";
import { useTranslation } from "react-i18next";
import { getData } from "./data";
import $ from "jquery";
import { getCrosshairHeight } from "../Functions";
import moment from "moment";

const { get } = require("lodash");

const ChartRenders = (arg) => {
  const { t } = useTranslation();
  let hideTitle = false,
    config = arg.config,
    speed_limit = 0,
    temp_limit = 0,
    isDynamic = false,
    rpm_zone = arg.rpm_zone;

  if (arg.hideTitle) hideTitle = arg.hideTitle;

  if (arg.data.length > 0) {
    speed_limit = arg.data[0].speed_limit;
    temp_limit = arg.data[0].temp_limit;
  }

  if (get(config, "isDynamic")) isDynamic = config.isDynamic;

  return (
    <Chart
      key={arg.chartTypeId}
      ref={arg.chartRef}
      onDone={(e) => arg.onDone(e)}
      palette="Violet"
      dataSource={arg.data}
      style={{ height: config.height }}
      // style={{ height: 160 }}
      onPointHoverChanged={(e) => arg.onPointHoverChanged(e)}
      // onPointHoverChanged={(e) => {
      //   arg.onPointHoverChanged(e)
      //   if (arg.chartTypeId === 7) {
      //     console.log("onSeriesHoverChanged : ", e)
      //     // console.log("getValueAxis : ", e.target.getValueAxis())

      //   }
      // }}
      onSeriesClick={(e) => arg.onSeriesClick(e)}
      onOptionChanged={(e) => {
        // return
        if (e.fullName === "argumentAxis.visualRange") {
          const range = e.value;
          let newRange = [
            moment(range[0]).format("YYYY-MM-DD HH:mm:ss"),
            moment(range[1]).format("YYYY-MM-DD HH:mm:ss"),
          ];
          arg.visualRangeChange(newRange);
        }
      }}
    >
      <Animation enabled={false} />
      <CommonAxisSettings>
        <Grid visible={true} />
      </CommonAxisSettings>

      <CommonSeriesSettings argumentField={"gpsdate"}>
        <Border visible={false} />
        <Point hoverMode="allArgumentPoints" />
      </CommonSeriesSettings>

      {isDynamic
        ? arg.option_temperature.map((item) => {
            return (
              <Series
                type={config.dynamicSeriesOption.type}
                valueField={"temp_" + item.seq}
                name={item.name}
                color={item.color}
                border={{
                  color: "#595959",
                  width: 1,
                  visible: true,
                }}
                barWidth={200}
                width={config.dynamicSeriesOption.width || 2}
              >
                <Point
                  visible={true}
                  size={config.dynamicSeriesOption.point.size}
                ></Point>
              </Series>
            );
          })
        : config.Series.map((item, i) => {
            return (
              <Series
                type={item.type}
                valueField={item.valueField}
                name={t(item.name)}
                color={get(
                  arg.chartColour,
                  "chart_colors." + item.color,
                  item.color
                )}
                border={{
                  color: "#595959",
                  width: 1,
                  visible: true,
                }}
                barWidth={200}
                width={item.width || 2}
              >
                <Point visible={true} size={item.point.size}></Point>
              </Series>
            );
          })}

      <ValueAxis
        // min={config.ValueAxis.min}
        // max={config.ValueAxis.max}
        defaultVisualRange={[config.ValueAxis.min, config.ValueAxis.max]}
        tickInterval={config.ValueAxis.tickInterval}
        minValueMargin={config.ValueAxis.minValueMargin}
        // defaultVisualRange={[config.ValueAxis.min, config.ValueAxis.max]}
        // defaultVisualRange={[0, 150]}
        // tickInterval={config.ValueAxis.tickInterval || 50}
        title={{
          // text: rpmName,
          margin: 10,
        }}
      >
        {arg.chartTypeId === 2 &&
          get(arg, "rpm_zone") &&
          get(arg.chartColour, "chart_colors") && [
            rpm_zone.red_zone[0] !== 0 && rpm_zone.red_zone[1] !== 0 && (
              <Strip
                startValue={rpm_zone.red_zone[0]}
                endValue={rpm_zone.red_zone[1]}
                color={arg.chartColour.chart_colors.rpm_zone.red_zone}
              />
            ),
            rpm_zone.green_zone[0] !== 0 && rpm_zone.green_zone[1] !== 0 && (
              <Strip
                startValue={rpm_zone.green_zone[0]}
                endValue={rpm_zone.green_zone[1]}
                color={arg.chartColour.chart_colors.rpm_zone.green_zone}
              />
            ),
          ]}

        <Grid visible={config.ValueAxis.grid.visible || false} />
        {get(config.ValueAxis, "label.customizeText", false) && (
          <Label customizeText={arg.customizeTextSensor} />
        )}

        {get(config.ValueAxis, "constantLine", false) && (
          <ConstantLine
            value={
              arg.chartTypeId === 1
                ? parseInt(speed_limit)
                : arg.chartTypeId === 7
                ? parseInt(temp_limit)
                : 0
            }
            // value={50}
            width={2}
            // color={get(chart_colors, config.ValueAxis.constantLine.color)}
            color={get(
              arg.chartColour,
              "chart_colors." + config.ValueAxis.constantLine.color
            )}
            dashStyle="Dash"
          >
            <Label visible={false} />
          </ConstantLine>
        )}
      </ValueAxis>

      <Margin bottom={20} />

      <ArgumentAxis
        minVisualRangeLength={{ minutes: 10 }}
        defaultVisualRange={arg.defaultVisualRange}
        position={"buttom"}
        argumentType={"datetime"}
        label={{
          format: "HH:mm",
          // format: "yyyy-MM-dd \n HH:mm",
          // format: "MMM yyyy",
        }}
      />

      <Crosshair horizontalLine={false} enabled={true} width={2} color="#000">
        <HorizontalLine visible={false} />
      </Crosshair>

      <Legend
        visible={false}
        verticalAlignment="top"
        horizontalAlignment="center"
      />
      <Export enabled={false} />
      {/* <Tooltip enabled={false} /> */}
      <Tooltip
        enabled={isDynamic && arg.chartTypeId === 7 ? true : false}
        customizeTooltip={(e) => {
          let data = e.point.data,
            element = "";

          for (let idx in arg.option_temperature) {
            element +=
              '<i class="fa fa-square" style="color: ' +
              arg.option_temperature[idx].color +
              '; font-size: 10px;"></i><span style="margin-left: 5px; font-size: 12px; padding-right: 20px;">' +
              arg.option_temperature[idx].name +
              " : " +
              data["temp_" + arg.option_temperature[idx].seq] +
              "</span><br>";
          }

          return {
            html: element,
          };
        }}
      />
      <ZoomAndPan
        argumentAxis={"both"}
        dragToZoom={true}
        allowMouseWheel={false}
      />
      <ScrollBar visible={false} />
    </Chart>
  );
};

class ChartRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.chartRef = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { indexPlaying, chartTypeId } = this.props;

    if (nextProps.indexPlaying !== indexPlaying) {
      this.crosshairCustom(nextProps.indexPlaying, chartTypeId);
      return false;
    }
    return true;
  }

  customizeTextSensor(e) {
    if (e.value == 5) return "BK";
    if (e.value == 4) return "EB";
    if (e.value == 3) return "EL";
    if (e.value == 2) return "CL";
  }

  crosshairCustom(index, chartTypeId) {
    let { chartVisibled } = this.props;

    try {
      let points = this["chartDone_" + chartTypeId].target.series[0]._points;
      if (index < points.length) {
        if (chartVisibled.includes(1)) {
          let crosshairHeight = getCrosshairHeight(1);
          $("#chart_1 .dxc-crosshair-cursor").attr("visibility", "visible");
          $("#chart_1 .dxc-crosshair-cursor circle").attr("cx", "869");
          $("#chart_1 .dxc-crosshair-cursor circle").attr("r", "7.5");
          $("#chart_1 .dxc-crosshair-cursor g").attr(
            "transform",
            "translate(" + (points[index].x - 31) + ", 0)"
          );
          $("#chart_1 .dxc-crosshair-cursor g path").attr(
            "d",
            "M 31 8 L 31 " + crosshairHeight
          );
          $("#chart_1 .dxc-crosshair-cursor g path").attr("stroke-width", "2");
          $("#chart_1 .dxc-crosshair-cursor g path").attr("stroke", "#000");
          $("#chart_1 .dxc-crosshair-cursor circle").remove();
        }

        if (chartVisibled.includes(2)) {
          let crosshairHeight = getCrosshairHeight(2);
          $("#chart_2 .dxc-crosshair-cursor").attr("visibility", "visible");
          $("#chart_2 .dxc-crosshair-cursor circle").attr("cx", "869");
          $("#chart_2 .dxc-crosshair-cursor circle").attr("r", "7.5");
          $("#chart_2 .dxc-crosshair-cursor g").attr(
            "transform",
            "translate(" + (points[index].x - 31) + ", 0)"
          );
          $("#chart_2 .dxc-crosshair-cursor g path").attr(
            "d",
            "M 31 8 L 31 " + crosshairHeight
          );
          $("#chart_2 .dxc-crosshair-cursor g path").attr("stroke-width", "2");
          $("#chart_2 .dxc-crosshair-cursor g path").attr("stroke", "#000");
          $("#chart_2 .dxc-crosshair-cursor circle").remove();
        }

        if (chartVisibled.includes(3)) {
          let crosshairHeight = getCrosshairHeight(3);
          $("#chart_3 .dxc-crosshair-cursor").attr("visibility", "visible");
          $("#chart_3 .dxc-crosshair-cursor circle").attr("cx", "869");
          $("#chart_3 .dxc-crosshair-cursor circle").attr("r", "7.5");
          $("#chart_3 .dxc-crosshair-cursor g").attr(
            "transform",
            "translate(" + (points[index].x - 31) + ", 0)"
          );
          $("#chart_3 .dxc-crosshair-cursor g path").attr(
            "d",
            "M 31 8 L 31 " + crosshairHeight
          );
          $("#chart_3 .dxc-crosshair-cursor g path").attr("stroke-width", "2");
          $("#chart_3 .dxc-crosshair-cursor g path").attr("stroke", "#000");
          $("#chart_3 .dxc-crosshair-cursor circle").remove();
        }

        if (chartVisibled.includes(4)) {
          let crosshairHeight = getCrosshairHeight(4);
          $("#chart_4 .dxc-crosshair-cursor").attr("visibility", "visible");
          $("#chart_4 .dxc-crosshair-cursor circle").attr("cx", "869");
          $("#chart_4 .dxc-crosshair-cursor circle").attr("r", "7.5");
          $("#chart_4 .dxc-crosshair-cursor g").attr(
            "transform",
            "translate(" + (points[index].x - 31) + ", 0)"
          );
          $("#chart_4 .dxc-crosshair-cursor g path").attr(
            "d",
            "M 31 0 L 31 " + crosshairHeight
          );
          $("#chart_4 .dxc-crosshair-cursor g path").attr("stroke-width", "2");
          $("#chart_4 .dxc-crosshair-cursor g path").attr("stroke", "#000");
          $("#chart_4 .dxc-crosshair-cursor circle").remove();
        }

        if (chartVisibled.includes(5)) {
          let crosshairHeight = getCrosshairHeight(5);
          $("#chart_5 .dxc-crosshair-cursor").attr("visibility", "visible");
          $("#chart_5 .dxc-crosshair-cursor circle").attr("cx", "869");
          $("#chart_5 .dxc-crosshair-cursor circle").attr("r", "7.5");
          $("#chart_5 .dxc-crosshair-cursor g").attr(
            "transform",
            "translate(" + (points[index].x - 31) + ", 0)"
          );
          $("#chart_5 .dxc-crosshair-cursor g path").attr(
            "d",
            "M 31 8 L 31 " + crosshairHeight
          );
          $("#chart_5 .dxc-crosshair-cursor g path").attr("stroke-width", "2");
          $("#chart_5 .dxc-crosshair-cursor g path").attr("stroke", "#000");
          $("#chart_5 .dxc-crosshair-cursor circle").remove();
        }

        if (chartVisibled.includes(6)) {
          let crosshairHeight = getCrosshairHeight(6);
          $("#chart_6 .dxc-crosshair-cursor").attr("visibility", "visible");
          $("#chart_6 .dxc-crosshair-cursor circle").attr("cx", "869");
          $("#chart_6 .dxc-crosshair-cursor circle").attr("r", "7.5");
          $("#chart_6 .dxc-crosshair-cursor g").attr(
            "transform",
            "translate(" + (points[index].x - 31) + ", 0)"
          );
          $("#chart_6 .dxc-crosshair-cursor g path").attr(
            "d",
            "M 31 8 L 31 " + crosshairHeight
          );
          $("#chart_6 .dxc-crosshair-cursor g path").attr("stroke-width", "2");
          $("#chart_6 .dxc-crosshair-cursor g path").attr("stroke", "#000");
          $("#chart_6 .dxc-crosshair-cursor circle").remove();
        }

        if (chartVisibled.includes(7)) {
          let crosshairHeight = getCrosshairHeight(7);
          $("#chart_7 .dxc-crosshair-cursor").attr("visibility", "visible");
          $("#chart_7 .dxc-crosshair-cursor circle").attr("cx", "869");
          $("#chart_7 .dxc-crosshair-cursor circle").attr("r", "7.5");
          $("#chart_7 .dxc-crosshair-cursor g").attr(
            "transform",
            "translate(" + (points[index].x - 31) + ", 0)"
          );
          $("#chart_7 .dxc-crosshair-cursor g path").attr(
            "d",
            "M 31 8 L 31 " + crosshairHeight
          );
          $("#chart_7 .dxc-crosshair-cursor g path").attr("stroke-width", "2");
          $("#chart_7 .dxc-crosshair-cursor g path").attr("stroke", "#000");
          $("#chart_7 .dxc-crosshair-cursor circle").remove();
        }

        if (chartVisibled.includes(8)) {
          let crosshairHeight = getCrosshairHeight(8);
          $("#chart_8 .dxc-crosshair-cursor").attr("visibility", "visible");
          $("#chart_8 .dxc-crosshair-cursor circle").attr("cx", "869");
          $("#chart_8 .dxc-crosshair-cursor circle").attr("r", "7.5");
          $("#chart_8 .dxc-crosshair-cursor g").attr(
            "transform",
            "translate(" + (points[index].x - 31) + ", 0)"
          );
          $("#chart_8 .dxc-crosshair-cursor g path").attr(
            "d",
            "M 31 8 L 31 " + crosshairHeight
          );
          $("#chart_8 .dxc-crosshair-cursor g path").attr("stroke-width", "2");
          $("#chart_8 .dxc-crosshair-cursor g path").attr("stroke", "#000");
          $("#chart_8 .dxc-crosshair-cursor circle").remove();
        }
      }
    } catch {
      // console.log("ERROR")
    }
  }

  render() {
    let {
      chartConfig,
      chartTypeId,
      dataAllPoint,
      configtest,
      defaultVisualRange,
      rpm_zone,
      option_temperature,
    } = this.props;

    // console.log(">> RENDER CHART <<", dataAllPoint)
    // console.log(JSON.stringify(dataAllPoint))

    return (
      <Suspense fallback={null}>
        <ChartRenders
          chartTypeId={chartTypeId}
          chartRef={this.chartRef}
          onDone={(e) => {
            this.props.onDone(this.chartRef);
            this["chartDone_" + chartTypeId] = e;
            this["charRef_" + chartTypeId] = this.chartRef;
          }}
          data={[...dataAllPoint]}
          config={chartConfig}
          chartColour={configtest}
          rpm_zone={rpm_zone}
          defaultVisualRange={defaultVisualRange}
          visualRangeChange={(range) => this.props.visualRangeChange(range)}
          customizeTextSensor={this.customizeTextSensor}
          onSeriesClick={(e) => this.props.onSeriesClick()}
          option_temperature={option_temperature}
          onPointHoverChanged={(e) => {
            // console.log("dataAllPoint : ", dataAllPoint)
            // console.log("onPointHoverChanged : ", e)
            // console.log("index : ", e.target.index)
            // console.log("data 1 : ", dataAllPoint[e.target.index])
            // console.log("data 2 : ", e.target.data)
            this.crosshairCustom(e.target.index, chartTypeId);
            // this.props.onPointHoverChanged(dataAllPoint[e.target.index], e.target.index)
            this.props.onPointHoverChanged(e.target.data, e.target.index);
          }}
        />
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.versatile.language,
  dataAllPoint: state.trackingHistory.dataAllPoint,
  indexPlaying: state.trackingHistory.indexPlaying,
  defaultVisualRange: state.trackingHistory.defaultVisualRange,
  configtest: state.signin.configtest,
  chartVisibled: state.trackingHistory.chartVisibled,
  rpm_zone: state.trackingHistory.rpm_zone,
  option_temperature: state.trackingHistory.option_temperature,
});

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) =>
    dispatch(TrackingHistoryActions.setValue(name, value)),
  setAfterZoomChart: (value) =>
    dispatch(TrackingHistoryActions.setAfterZoomChart(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartRender);

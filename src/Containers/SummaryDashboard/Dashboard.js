import React, { Suspense, useState } from "react";
import { connect } from "react-redux";
import SummaryActions from "../../Redux/SummaryNewRedux";
import { Row, Col } from "reactstrap";
import { t } from "../../Components/Translation";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Select, Button as ButtonAntd } from "antd";
import FormDatepickerSummary from "../../Components/FormControls/FormDatepickerSummary";
import {
  ENDPOINT_BASE_URL,
  ENDPOINT_BASE_URL_YNM2,
  ENDPOINT_BASE_URL_YNM4,
} from "../../Config/app-config";
import { FormLoading } from "../../components_new";
import axios from "axios";

import Chart, {
  CommonSeriesSettings,
  Legend,
  Series,
  Tooltip,
  ArgumentAxis,
  Label,
} from "devextreme-react/chart";
import service from "./data.js";
import { refresh } from "../../Redux/SigninRedux";
const { Option } = Select;
const { get } = require("lodash");
const dataSource = service.dataSource();
var chartOptions = {
  argumentAxis: {
    label: {
      format: "dd",
    },
  },
};

const FormSelectSearch = (arg) => {
  const { t } = useTranslation();
  return (
    <Select
      id={arg.id}
      mode={arg.mode}
      showSearch
      style={{ width: 300 }}
      placeholder={t(arg.placeholder)}
      value={arg.value}
      disabled={arg.disabled}
      onChange={arg.onChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {arg.list !== null &&
        arg.list.map((item) => {
          return <Option key={item.key}>{t(item.value)}</Option>;
        })}
    </Select>
  );
};

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
let utilizationDayData = [];

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryData: {
        chart: {
          eco: [],
          safety: [],
        },
      },
      chartData: [],
      chartStat: [],
      Working0: "",
      chartDefault: {},
      detailDaliy: [
        {
          count: 0,
          vehicle_list: [],
        },
        {
          count: 0,
          vehicle_list: [],
        },
        {
          count: 0,
          vehicle_list: [],
        },
        {
          count: 0,
          vehicle_list: [],
        },
        {
          count: 0,
          vehicle_list: [],
        },
        {
          count: 0,
          vehicle_list: [],
        },
      ],
      locationData: [],
    };
    this.chartRef = React.createRef();
    this.setinfo = this.setinfo.bind(this);
    this.firstLoad = true;
    this.firstClick = true;
  }

  componentDidMount() {
    this.getvidDashboard();
  }
  shouldComponentUpdate(nextProps, nextState) {
    let { keepArgument, filterSummary } = this.props;
    let { chartRef } = this.state;
    let startdate = filterSummary.dateRange.dateStart;
    startdate = moment(startdate).format("YYYY-MM-DD");
    if (chartRef === undefined) {
      if (get(this, "chart.instance") && this.firstLoad) {
        if (startdate !== undefined) {
          setTimeout(() => {
            this.chartRef.instance
              ._getStackPoints()
              [startdate].axis_default_stack_default[0].select();
            this.chartRef.instance
              ._getStackPoints()
              [startdate].axis_default_stack_default[1].select();
            this.chartRef.instance
              ._getStackPoints()
              [startdate].axis_default_stack_default[2].select();
            this.chartRef.instance
              ._getStackPoints()
              [startdate].axis_default_stack_default[3].select();
            this.chartRef.instance
              ._getStackPoints()
              [startdate].axis_default_stack_default[4].select();
            this.chartRef.instance
              ._getStackPoints()
              [startdate].axis_default_stack_default[5].select();

            // this.props.selectedCallback(keepArgument)
          }, 100);
        }
        this.firstLoad = false;
      }
    }

    return true;
  }

  customizeTooltip(e) {
    console.log(e);
    return {
      text: `${e.percentText}`,
    };
  }

  async getvidDashboard() {
    let user_id = this.props.dataLogin.userId;
    let region_id = this.props.filterSummary.region;
    let start = this.props.filterSummary.dateRange.dateStart;
    let dateEnd = this.props.filterSummary.dateRange.dateEnd;
    start = moment(start, "DD/MM/YYYY").format("YYYY-MM-DD");
    dateEnd = moment(dateEnd, "DD/MM/YYYY").format("YYYY-MM-DD");

    try {
      var response = await fetch(
        ENDPOINT_BASE_URL_YNM4 +
          `fleet/dashboard/summary?userId=` +
          user_id +
          `&start_date=` +
          start +
          `&stop_date=` +
          dateEnd +
          `&region_id=` +
          region_id,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      var data = await response.json();
      if (data?.code === 200) this.setStateSummary({ summaryData: data.result });
      this.setStateSummary({ detailDaliy: this.props.summaryData[0].status });
      console.log(this.props.summaryData);
      // this.setState({ chartData: data.result })
      // console.log(this.state.chartData[0].status[0].count)
    } catch (error) {}
  }
  async getMessageData(data) {
    this.props.setStateSummary({ isLoadingMap: true });
    this.props.setStateSummary({ pointData: [] });
    let start = this.props.filterSummary.dateRange.dateStart;
    let dateEnd = this.props.filterSummary.dateRange.dateEnd;
    start = moment(start, "DD/MM/YYYY").format("YYYY-MM-DD HH:MM:SS");
    dateEnd = moment(dateEnd, "DD/MM/YYYY").format("YYYY-MM-DD HH:MM:SS");
    let vid_list = data.vehicle_list;

    let searchData = {
      user_id: this.props.dataLogin.userId,
      company: this.state.company,
      dtstart: start,
      dtstop: dateEnd,
      vid_list: vid_list,
    };

    let response = "",
      isLastKey = false,
      test = [];
    try {
      do {
        response = await this.getdata(
          isLastKey,
          response.LastEvaluatedKey,
          vid_list
        );
        //response.result.length > 0 && test.push(...response.result)

        console.log("res", response);
        if (get(response.LastEvaluatedKey, "dtstart")) {
          isLastKey = true;
          let test = response.result || [];
          let points = [...this.props.pointData];
          console.log("pointdata", this.props.pointData);
          test.forEach((item) => {
            points.push({
              type: "Feature",
              properties: { cluster: false, id: item.vid },
              geometry: {
                type: "Point",
                coordinates: [item.lng, item.lat],
              },
              chassis_no: item.chassis_no,
            });
            // console.log("point", points)
            // console.log("pointData" , this.props.pointData)
          });
          this.props.setStateSummary({ pointData: points });
        } else {
          isLastKey = false;
          let test = response.result || [];
          let points = [...this.props.pointData];
          test.forEach((item) => {
            points.push({
              type: "Feature",
              properties: { cluster: false, id: item.vid },
              geometry: {
                type: "Point",
                coordinates: [item.lng, item.lat],
              },
              chassis_no: item.chassis_no,
            });
          });
          this.props.setStateSummary({ pointData: points });
        }

        console.log("isLastKey", isLastKey);
        // isLastKey = false
      } while (isLastKey);
      this.props.setStateSummary({ isLoadingMap: false });
    } catch (error) {
      console.log(error);
    }
  }

  async getdata(isLastKey, LastEvaluatedKey, vid) {
    // this.props.setStateSummary({ isLoadingMap: true })
    window.scroll({ top: 5555, behavior: "smooth" });
    //this.props.setStateSummary({ pointData: [] })
    let vid_list = vid;
    // console.log("vehicle_list", vid_list)
    let start = this.props.filterSummary.dateRange.dateStart;
    let dateEnd = this.props.filterSummary.dateRange.dateEnd;
    start = moment(start, "DD/MM/YYYY").format("YYYY-MM-DD 00:00:00");
    dateEnd = moment(dateEnd, "DD/MM/YYYY").format("YYYY-MM-DD 23:59:59");
    let body = {
      user_id: this.props.dataLogin.userId,
      dtstart: start,
      dtstop: dateEnd,
      vid_list: vid_list,
    };
    if (isLastKey) body.vid_list = LastEvaluatedKey.vid_list;
    try {
      var response = await fetch(ENDPOINT_BASE_URL_YNM4 + "fleet/langlnt", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Accept-Language": this.props.language,
        },
        body: JSON.stringify(body),
      });

      var data = await response.json();
      console.log(this.props.pointData);

      if (data?.code == 200) {
        return data;
      } else return {};
    } catch (error) {
      this.props.setStateSummary({ isLoadingMap: false });
    }
  }

  setinfo(color, text = "", data) {
    console.log("vehicle_list", data.vehicle_list);
    return (
      <span
        style={{ paddingLeft: "4%", cursor: "pointer" }}
        onClick={() => {
          this.getMessageData(data);
        }}
      >
        <i className="fa fa-square" style={{ color, fontSize: 18 }} /> {text} :{" "}
        {data.count} {t("summary_95")} <br></br>
      </span>
    );
  }

  //#region BAR CHART ACTIONS
  onPointClick(e) {
    let { target } = e;
    console.log("e", target);
    let { keepArgument } = this.props;
    // console.log('keepArgument', keepArgument, target.argument, target.isSelected())
    if (this.firstClick && keepArgument === target.argument) {
      this.chart.instance
        ._getStackPoints()
        [keepArgument].axis_default_stack_default[0].clearSelection();
      this.chart.instance
        ._getStackPoints()
        [keepArgument].axis_default_stack_default[1].clearSelection();
      this.chart.instance
        ._getStackPoints()
        [keepArgument].axis_default_stack_default[2].clearSelection();
      this.chart.instance
        ._getStackPoints()
        [keepArgument].axis_default_stack_default[3].clearSelection();
      this.props.selectedCallback("unselect");
      this.firstClick = false;
    } else {
      if (target.isSelected()) {
        target.clearSelection();
        this.selectedCallback("unselect");
      } else {
        target.select();
        this.selectedCallback(target.argument);
        this.props.setStateSummary({ detailDaliy: e.target.data.status });
        this.props.setFilterData("dateRange", {
          dateStart: moment(target.argument).format("DD/MM/YYYY 00:00:00"),
          dateEnd: moment(target.argument).format("DD/MM/YYYY 23:59:59"),
        });
        var date = moment("1946-05-21").set({
          hour: 23,
          minute: 59,
          second: 59,
        });
        console.log("test", moment(date).format("DD-MM-yyyy hh:mm:ss"));
        console.log("state", e.target.data);
        // this.setState({ Point })
      }
    }
  }

  selectedCallback(argument) {
    // var detail = this.props.summaryData.status
    console.log("selectedCallback", argument);
    if (argument == "unselect") {
      this.props.setStateReduxSummary({
        keepArgument: undefined,
        selectData: undefined,
        eventData: undefined,
      });
    } else {
      // this.setDataSelectByDate(argument)
      this.props.setStateReduxSummary({
        keepArgument: argument,
        selectData: undefined,
        eventData: undefined,
      });
      // this.setState({ detailDaliy: detail })
      // console.log("state", this.props.summaryData.status)
    }
  }
  //#endregion

  render() {
    let { isLoadingSummary, summaryData, detailDaliy } = this.props;
    let { chartData, Working0, chartStat } = this.state;
    return (
      <Suspense fallback={null}>
        <FormLoading loading={isLoadingSummary}>
          <Row>
            <Col lg={8} md={8} sm={12} xs={12}>
              <Chart
                onLoad={(chartref) => {
                  this.chartref = chartref;
                  this.setState({ chartref });
                }}
                id="chart-data"
                ref={(ref) => (this.chartRef = ref)}
                chartOptions={chartOptions}
                dataSource={summaryData}
                // dataSource={chartData}
                pointSelectionMode={"single"}
                size={{ height: "200", width: "100%" }}
                onPointClick={(e) => this.onPointClick(e)}
              >
                <ArgumentAxis argumentType="datetime" tickInterval="day">
                  <Label format="dd" overlappingBehavior="stagger"></Label>
                </ArgumentAxis>
                <CommonSeriesSettings
                  argumentField="datetime"
                  type="fullstackedbar"
                />
                <Series valueField="inactive" color={"#d9d9d9"} />
                <Series valueField="active_type1" color={"#fbeb44"} />
                <Series valueField="active_type2" color={"#c9eb64"} />
                <Series valueField="active_type3" color={"#548135"} />
                <Series valueField="active_type4" color={"#35cbfc"} />
                {/* <Series valueField="active.5.stat" color={'#35cbfc'} /> */}
                <Series valueField="active_type5" color={"#0270c0"} />
                <Legend visible={false} />
                <Tooltip
                  enabled={true}
                  customizeTooltip={this.customizeTooltip}
                  onClick={""}
                />
              </Chart>
            </Col>
            <Col lg={4} md={4} sm={12} xs={12}>
              <label
                style={{
                  textweight: "bold",
                  fontSize: "18px",
                  paddingLeft: "4%",
                }}
              >
                {t("summary_94")}
              </label>
              <br></br>
              {this.setinfo(
                "#d9d9d9",
                t("summary_86"),
                detailDaliy[0],
                "summary_95"
              )}
              {this.setinfo(
                "#fbeb44",
                t("summary_87"),
                detailDaliy[1],
                "summary_95"
              )}
              {this.setinfo(
                "#c9eb64",
                t("summary_88"),
                detailDaliy[2],
                "summary_95"
              )}
              {this.setinfo(
                "#548135",
                t("summary_89"),
                detailDaliy[3],
                "summary_95"
              )}
              {this.setinfo(
                "#35cbfc",
                t("summary_90"),
                detailDaliy[4],
                "summary_95"
              )}
              {this.setinfo(
                "#0270c0",
                t("summary_91"),
                detailDaliy[5],
                "summary_95"
              )}
            </Col>
          </Row>
        </FormLoading>
      </Suspense>
    );
  }

  customizeLabel(e) {
    // const { t } = useTranslation()
    // //console.log(e)
    if (e.value == 0) {
      // //console.log("summary_6")
      return "summary_6";
    }
    if (e.value == 0.25) {
      // //console.log("summary_5")
      return "summary_5";
    }
    if (e.value == 0.5) {
      // //console.log("summary_4")
      return "summary_4";
    }
    if (e.value == 0.75) {
      // //console.log("summary_3")
      return "summary_3";
    }
    // //console.log("summary_2")
    else return "summary_2";
  }

  customizeText(e) {
    // //console.log(e)
    var date = e.value.split("-")[2];
    for (var i = 0; i <= date.length; i++) {
      if (date[0] == 0) {
        var date = date.slice(1, 2);
      } else {
        var date;
      }
    }
    return `${date}`;
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.versatile.language,
    menuUser: state.signin.menuUser,
    dataLogin: state.signin.dataLogin,
    isLoadingSummary: state.summaryNew.isLoadingSummary,
    filterSummary: state.summaryNew.filterSummary,
    summaryData: state.summaryNew.summaryData,
    keepArgument: state.summaryNew.keepArgument,
    detailDaliy: state.summaryNew.detailDaliy,
    pointData: state.summaryNew.pointData,
  };
};
const mapDispatchToProps = (dispatch) => ({
  setStateSummary: (obj) => dispatch(SummaryActions.setStateSummary(obj)),
  setLoadingSummary: (value) =>
    dispatch(SummaryActions.setLoadingSummary(value)),
  setStateReduxSummary: (objstate) =>
    dispatch(SummaryActions.setStateReduxSummary(objstate)),
  setFilterData: (fieldName, value) =>
    dispatch(SummaryActions.setFilterData(fieldName, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

let data = {
  notWorking: {
    total: "400",
    vehicles: [
      {
        id: "car01",
        vid: 1,
        lat: 14.408565,
        lng: 100.59528,
      },
      {
        id: "car02",
        vid: 2,
        lat: 14.408551,
        lng: 100.59539,
      },
    ],
  },
  Working2: {
    total: "3",
    vehicles: [
      {
        id: "car011",
        vid: 1,
        lat: 14.408587,
        lng: 100.595221,
      },
      {
        id: "car022",
        vid: 2,
        lat: 14.410253,
        lng: 100.592683,
      },
      {
        id: "car033",
        vid: 3,
        lat: 14.527313,
        lng: 100.70108,
      },
    ],
  },
  working4: {
    total: "4",
    vehicles: [
      {
        id: "car0111",
        vid: 1,
        lat: 14.408587,
        lng: 100.595221,
      },
      {
        id: "car0222",
        vid: 2,
        lat: 14.410253,
        lng: 100.592683,
      },
      {
        id: "car0333",
        vid: 3,
        lat: 14.527313,
        lng: 100.70108,
      },
      {
        id: "car0444",
        vid: 4,
        lat: 14.542,
        lng: 100.718,
      },
    ],
  },
  working6: {
    total: "0",
    vehicles: [],
  },
  working8: {
    total: "0",
    vehicles: [],
  },
  working10: {
    total: "0",
    vehicles: "0",
  },
  test: [
    {
      1: {
        stat: 4,
      },
      2: {
        stat: 3,
      },
      3: {
        stat: 2,
      },
      4: {
        stat: 2,
      },
      5: {
        stat: 5,
      },
    },
  ],
};

const DATATEST2 = [
  {
    datetime: "2022-12-01",
    active2: [
      {
        1: {
          stat: 20,
        },
      },
    ],
    active: {
      1: {
        stat: 20,
      },
      2: {
        stat: 30,
      },
      3: {
        stat: 0,
      },
      4: {
        stat: 0,
      },
      5: {
        stat: 0,
      },
    },
    inactive: 50,
    active: 50,
  },
];
const DATATEST = [
  {
    datetime: "2022-12-01",
    inactive: 50,
    active1: 50,
    active2: 50,
    active3: 50,
    active4: 50,
    active5: 50,
    status: [
      {
        count: 397,
        "vehicle_list ": [
          36409, 36411, 36412, 36413, 36414, 36416, 36417, 36418, 36419, 36420,
          36421, 36422, 36423, 36424, 36425, 36426, 36427, 36429, 36430, 36431,
          36432, 36433, 36434, 36435, 36436, 36440, 36441, 36443, 36444, 36445,
          36446, 36768, 36769, 36770, 36771, 36772, 36773, 36774, 36775, 36776,
          36778, 36779, 36780, 36781, 36782, 36783, 36784, 36785, 36786, 36788,
          36789, 36790, 36791, 36792, 36793, 36794, 36796, 36797, 36798, 36799,
          36800, 36801, 36802, 36803, 36804, 36805, 36806, 36808, 36809, 36810,
          36811, 36812, 36813, 36814, 36815, 36816, 37307, 37308, 37309, 37310,
          37311, 37312, 37313, 37314, 37315, 37316, 37317, 37318, 37319, 37320,
          37321, 37322, 37323, 37324, 37325, 37326, 37327, 37328, 37329, 37330,
          37331, 37333, 37334, 37335, 37336, 37337, 37338, 37339, 37341, 37342,
          37343, 37344, 37345, 37346, 37347, 37348, 37349, 37350, 37351, 37352,
          37353, 37354, 37355, 37356, 37357, 37359, 37360, 37362, 37363, 37364,
          37365, 37366, 37367, 37368, 37369, 37370, 37371, 37373, 37374, 37375,
          37376, 37377, 37378, 37380, 37381, 37383, 37967, 37968, 37969, 37970,
          38538, 38539, 38541, 38542, 38544, 38545, 38546, 38547, 38548, 38549,
          38550, 38551, 38552, 38554, 38555, 38556, 38557, 38558, 38559, 38560,
          38562, 38564, 39897, 39898, 39899, 39900, 39901, 39902, 39904, 39905,
          39906, 39907, 39908, 39909, 39910, 39911, 39912, 39913, 39914, 39915,
          39916, 39918, 39919, 39920, 39921, 39922, 39923, 39925, 39927, 39928,
          39929, 39930, 39931, 39932, 39933, 39934, 39935, 39936, 39937, 39938,
          39939, 39940, 39941, 39942, 39946, 39948, 39949, 39950, 39951, 39952,
          39953, 39954, 39955, 39956, 39957, 39958, 39959, 39960, 39961, 39962,
          39964, 39965, 39966, 39967, 39968, 39969, 39970, 39971, 39972, 39973,
          39974, 39975, 39976, 39977, 39980, 39981, 39982, 39983, 39990, 39991,
          39994, 41914, 41915, 41916, 41917, 41918, 41922, 41923, 41924, 41925,
          41926, 41927, 41928, 41930, 41931, 41932, 41934, 41935, 41936, 41937,
          41938, 41939, 41941, 41942, 41943, 41944, 41945, 41946, 42663, 42664,
          42665, 42666, 42667, 42669, 42670, 42673, 42674, 42675, 42676, 42678,
          42679, 42680, 42681, 43220, 43221, 43223, 43224, 43225, 43226, 43227,
          43228, 43229, 43230, 43231, 43232, 43233, 43234, 43236, 43237, 43238,
          43239, 43240, 43241, 44051, 44052, 44054, 44055, 44056, 44057, 44058,
          44059, 44060, 44061, 44065, 44066, 44068, 44069, 44070, 44071, 44072,
          44073, 44074, 44075, 44076, 44077, 44078, 44079, 44081, 44082, 44083,
          44084, 44085, 44086, 44087, 44088, 44089, 44090, 44091, 44092, 44093,
          44094, 45773, 45774, 45775, 45776, 45777, 45778, 45779, 45781, 45783,
          45784, 45785, 45786, 46015, 46016, 46017, 46019, 46020, 46021, 46022,
          46023, 46024, 46025, 46026, 46027, 46028, 46029, 46030, 46031, 46032,
          46033, 46034, 46035, 46036, 46037, 46039, 46040, 46041, 46042, 46043,
          47266, 47267, 47268, 47270, 47271, 47272, 47273,
        ],
      },
      {
        count: 3,
        "vehicle_list ": [36777, 39988, 42672],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
    ],
  },
  {
    datetime: "2022-12-02",
    active: {
      1: {
        stat: 2,
      },
      2: {
        stat: 0,
      },
      3: {
        stat: 0,
      },
      4: {
        stat: 0,
      },
      5: {
        stat: 0,
      },
    },
    inactive: 98,
    status: [
      {
        count: 391,
        "vehicle_list ": [
          36409, 36411, 36412, 36413, 36414, 36416, 36417, 36418, 36420, 36421,
          36422, 36424, 36425, 36426, 36427, 36429, 36430, 36432, 36433, 36434,
          36435, 36436, 36441, 36443, 36444, 36445, 36446, 36768, 36769, 36770,
          36771, 36772, 36773, 36774, 36775, 36776, 36777, 36778, 36779, 36780,
          36781, 36782, 36783, 36784, 36785, 36786, 36788, 36789, 36790, 36791,
          36792, 36793, 36794, 36796, 36797, 36798, 36799, 36800, 36801, 36802,
          36803, 36804, 36805, 36806, 36808, 36809, 36810, 36811, 36812, 36813,
          36814, 36815, 36816, 37307, 37308, 37309, 37310, 37311, 37312, 37313,
          37314, 37315, 37316, 37317, 37318, 37319, 37320, 37321, 37322, 37323,
          37324, 37325, 37326, 37327, 37328, 37329, 37330, 37331, 37333, 37334,
          37335, 37336, 37337, 37338, 37339, 37341, 37342, 37343, 37344, 37346,
          37347, 37348, 37349, 37350, 37351, 37352, 37353, 37354, 37355, 37356,
          37357, 37359, 37360, 37362, 37363, 37364, 37365, 37366, 37367, 37368,
          37369, 37370, 37371, 37373, 37374, 37375, 37376, 37377, 37378, 37380,
          37381, 37383, 37968, 37969, 38538, 38539, 38541, 38542, 38544, 38545,
          38546, 38547, 38548, 38549, 38550, 38551, 38552, 38554, 38555, 38556,
          38557, 38558, 38559, 38560, 38562, 38564, 39897, 39898, 39899, 39900,
          39901, 39902, 39904, 39905, 39906, 39907, 39908, 39909, 39910, 39911,
          39912, 39913, 39914, 39915, 39916, 39918, 39919, 39920, 39921, 39922,
          39923, 39925, 39928, 39929, 39930, 39931, 39932, 39933, 39934, 39935,
          39936, 39937, 39938, 39939, 39940, 39941, 39942, 39946, 39948, 39949,
          39950, 39951, 39952, 39953, 39954, 39955, 39956, 39957, 39958, 39959,
          39960, 39961, 39962, 39964, 39965, 39966, 39967, 39968, 39969, 39970,
          39971, 39972, 39973, 39974, 39975, 39976, 39977, 39980, 39981, 39982,
          39983, 39988, 39990, 39991, 39994, 41914, 41915, 41916, 41917, 41918,
          41922, 41923, 41924, 41925, 41926, 41927, 41928, 41930, 41931, 41932,
          41934, 41935, 41936, 41937, 41938, 41939, 41941, 41942, 41943, 41944,
          41945, 41946, 42663, 42664, 42665, 42666, 42667, 42669, 42670, 42672,
          42673, 42674, 42675, 42676, 42679, 42680, 42681, 43220, 43221, 43223,
          43224, 43225, 43226, 43227, 43228, 43229, 43230, 43231, 43232, 43233,
          43234, 43236, 43237, 43238, 43239, 43240, 43241, 44051, 44052, 44054,
          44055, 44056, 44057, 44058, 44059, 44060, 44061, 44065, 44066, 44068,
          44069, 44070, 44071, 44072, 44073, 44074, 44075, 44076, 44077, 44078,
          44079, 44081, 44082, 44083, 44084, 44085, 44086, 44087, 44088, 44089,
          44090, 44091, 44092, 44093, 44094, 45773, 45774, 45775, 45776, 45777,
          45778, 45779, 45781, 45783, 45784, 45785, 45786, 46015, 46016, 46017,
          46019, 46020, 46021, 46022, 46023, 46024, 46025, 46026, 46027, 46028,
          46029, 46030, 46031, 46032, 46033, 46034, 46035, 46036, 46037, 46039,
          46040, 46041, 46042, 46043, 47266, 47267, 47268, 47270, 47271, 47272,
          47273,
        ],
      },
      {
        count: 8,
        "vehicle_list ": [
          36423, 36431, 36440, 37345, 37967, 37970, 39927, 42678,
        ],
      },
      {
        count: 1,
        "vehicle_list ": [36419],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
    ],
  },
  {
    datetime: "2022-12-03",
    active: {
      1: {
        stat: 1,
      },
      2: {
        stat: 0,
      },
      3: {
        stat: 0,
      },
      4: {
        stat: 0,
      },
      5: {
        stat: 1,
      },
    },
    inactive: 98,
    status: [
      {
        count: 388,
        "vehicle_list ": [
          36409, 36411, 36412, 36413, 36416, 36417, 36418, 36419, 36420, 36421,
          36422, 36423, 36424, 36425, 36426, 36427, 36430, 36431, 36432, 36433,
          36434, 36435, 36441, 36443, 36444, 36445, 36446, 36768, 36769, 36770,
          36771, 36772, 36773, 36774, 36776, 36777, 36778, 36779, 36780, 36781,
          36782, 36783, 36784, 36785, 36786, 36788, 36789, 36790, 36791, 36792,
          36793, 36794, 36796, 36797, 36798, 36799, 36800, 36801, 36802, 36803,
          36804, 36805, 36806, 36808, 36809, 36810, 36811, 36812, 36813, 36814,
          36815, 36816, 37307, 37308, 37309, 37310, 37311, 37312, 37313, 37314,
          37315, 37316, 37317, 37319, 37320, 37321, 37322, 37323, 37324, 37325,
          37326, 37327, 37328, 37329, 37330, 37331, 37333, 37334, 37335, 37336,
          37337, 37338, 37339, 37341, 37342, 37343, 37344, 37345, 37346, 37347,
          37348, 37349, 37350, 37351, 37352, 37353, 37354, 37355, 37356, 37357,
          37359, 37360, 37363, 37364, 37365, 37366, 37367, 37368, 37369, 37370,
          37371, 37373, 37374, 37375, 37376, 37377, 37378, 37380, 37381, 37383,
          37967, 37968, 37969, 37970, 38538, 38539, 38541, 38542, 38544, 38545,
          38546, 38547, 38548, 38549, 38550, 38551, 38552, 38554, 38555, 38556,
          38557, 38558, 38559, 38560, 38562, 38564, 39897, 39898, 39899, 39901,
          39904, 39906, 39907, 39908, 39909, 39910, 39911, 39912, 39913, 39914,
          39915, 39916, 39918, 39920, 39921, 39922, 39923, 39925, 39927, 39928,
          39929, 39930, 39931, 39932, 39933, 39934, 39935, 39936, 39937, 39938,
          39939, 39940, 39941, 39942, 39946, 39948, 39949, 39950, 39951, 39952,
          39953, 39954, 39955, 39956, 39957, 39958, 39959, 39961, 39962, 39964,
          39965, 39966, 39967, 39968, 39969, 39970, 39971, 39972, 39973, 39974,
          39975, 39976, 39977, 39980, 39981, 39982, 39983, 39988, 39990, 39991,
          39994, 41914, 41915, 41916, 41917, 41918, 41922, 41923, 41924, 41925,
          41926, 41927, 41928, 41930, 41931, 41932, 41934, 41935, 41936, 41937,
          41938, 41939, 41941, 41942, 41943, 41944, 41945, 41946, 42663, 42664,
          42665, 42666, 42667, 42669, 42670, 42672, 42673, 42674, 42675, 42676,
          42678, 42679, 42680, 42681, 43220, 43221, 43223, 43224, 43225, 43226,
          43227, 43228, 43229, 43230, 43231, 43232, 43233, 43234, 43236, 43237,
          43238, 43239, 43240, 43241, 44051, 44052, 44054, 44055, 44056, 44057,
          44058, 44059, 44060, 44061, 44065, 44066, 44068, 44069, 44070, 44071,
          44072, 44073, 44074, 44075, 44076, 44077, 44078, 44079, 44081, 44082,
          44083, 44084, 44085, 44086, 44087, 44088, 44089, 44090, 44091, 44092,
          44093, 44094, 45773, 45774, 45775, 45776, 45777, 45778, 45779, 45781,
          45783, 45784, 45785, 45786, 46015, 46016, 46017, 46019, 46020, 46021,
          46022, 46023, 46024, 46025, 46026, 46027, 46028, 46029, 46030, 46031,
          46032, 46033, 46034, 46035, 46036, 46037, 46039, 46040, 46041, 46042,
          46043, 47266, 47267, 47268, 47270, 47271, 47272, 47273,
        ],
      },
      {
        count: 6,
        "vehicle_list ": [36414, 36440, 36775, 37362, 39902, 39905],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 2,
        "vehicle_list ": [36429, 39960],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 4,
        "vehicle_list ": [36436, 37318, 39900, 39919],
      },
    ],
  },
  {
    datetime: "2022-12-04",
    active: {
      1: {
        stat: 11,
      },
      2: {
        stat: 7,
      },
      3: {
        stat: 5,
      },
      4: {
        stat: 3,
      },
      5: {
        stat: 10,
      },
    },
    inactive: 64,
    status: [
      {
        count: 228,
        "vehicle_list ": [
          36409, 36411, 36413, 36418, 36420, 36423, 36424, 36425, 36427, 36433,
          36435, 36436, 36441, 36443, 36446, 36768, 36772, 36774, 36776, 36779,
          36780, 36782, 36783, 36786, 36788, 36789, 36790, 36792, 36793, 36794,
          36796, 36797, 36798, 36799, 36801, 36804, 36808, 36813, 36815, 37308,
          37309, 37310, 37311, 37312, 37314, 37317, 37320, 37321, 37322, 37323,
          37325, 37326, 37328, 37329, 37330, 37331, 37333, 37334, 37335, 37336,
          37337, 37338, 37339, 37341, 37343, 37348, 37349, 37350, 37351, 37352,
          37353, 37355, 37357, 37363, 37364, 37369, 37370, 37373, 37374, 37375,
          37376, 37380, 37968, 37970, 38542, 38546, 38547, 38550, 38551, 38552,
          38554, 38555, 38556, 38557, 38558, 38559, 38564, 39897, 39901, 39904,
          39908, 39909, 39910, 39911, 39914, 39916, 39918, 39923, 39925, 39928,
          39937, 39939, 39940, 39942, 39946, 39948, 39950, 39951, 39953, 39954,
          39960, 39961, 39964, 39965, 39966, 39967, 39970, 39971, 39972, 39973,
          39974, 39983, 39988, 39990, 39994, 41914, 41917, 41924, 41925, 41926,
          41930, 41934, 41939, 41941, 41942, 41944, 41946, 42663, 42665, 42666,
          42667, 42673, 42674, 42678, 42679, 42680, 42681, 43220, 43221, 43223,
          43225, 43226, 43233, 43234, 43237, 43238, 43239, 43241, 44051, 44054,
          44055, 44057, 44059, 44060, 44065, 44066, 44068, 44072, 44074, 44075,
          44077, 44078, 44079, 44081, 44082, 44083, 44085, 44086, 44087, 44088,
          44089, 44090, 44091, 44092, 44093, 44094, 45773, 45777, 45781, 45783,
          45784, 45785, 45786, 46016, 46017, 46019, 46022, 46023, 46024, 46026,
          46027, 46029, 46030, 46031, 46032, 46033, 46034, 46037, 46039, 46040,
          46041, 46042, 47266, 47267, 47268, 47270, 47272, 47273,
        ],
      },
      {
        count: 50,
        "vehicle_list ": [
          36414, 36431, 36434, 36445, 36769, 36770, 36775, 36778, 36802, 36812,
          36814, 37313, 37315, 37324, 37327, 37342, 37356, 37365, 37367, 37371,
          38545, 39900, 39906, 39912, 39931, 39936, 39938, 39941, 39952, 39959,
          39968, 39977, 39991, 41937, 42669, 42670, 42672, 43240, 44052, 44058,
          44061, 45774, 45775, 45778, 46015, 46020, 46025, 46035, 46043, 47271,
        ],
      },
      {
        count: 34,
        "vehicle_list ": [
          36422, 36429, 36771, 36806, 36816, 37316, 37354, 37359, 37360, 37362,
          37967, 39898, 39920, 39922, 39929, 39930, 39956, 39981, 41922, 41927,
          41928, 41932, 41935, 41945, 42675, 42676, 43224, 43228, 44056, 44069,
          44070, 44084, 46028, 46036,
        ],
      },
      {
        count: 23,
        "vehicle_list ": [
          36417, 36421, 36430, 36432, 36444, 36781, 36791, 37319, 37344, 37346,
          37366, 38548, 38560, 39905, 39913, 39921, 39927, 39957, 39958, 39980,
          43229, 45779, 46021,
        ],
      },
      {
        count: 16,
        "vehicle_list ": [
          36416, 36784, 36785, 36810, 37318, 38539, 39915, 39934, 39969, 41915,
          41916, 41931, 41938, 43231, 43236, 44073,
        ],
      },
      {
        count: 49,
        "vehicle_list ": [
          36412, 36419, 36426, 36440, 36773, 36777, 36800, 36803, 36805, 36809,
          36811, 37307, 37345, 37347, 37368, 37377, 37378, 37381, 37383, 37969,
          38538, 38541, 38544, 38549, 38562, 39899, 39902, 39907, 39919, 39932,
          39933, 39935, 39949, 39955, 39962, 39975, 39976, 39982, 41918, 41923,
          41936, 41943, 42664, 43227, 43230, 43232, 44071, 44076, 45776,
        ],
      },
    ],
  },
  {
    datetime: "2022-12-05",
    active: {
      1: {
        stat: 3,
      },
      2: {
        stat: 1,
      },
      3: {
        stat: 0,
      },
      4: {
        stat: 0,
      },
      5: {
        stat: 1,
      },
    },
    inactive: 95,
    status: [
      {
        count: 378,
        "vehicle_list ": [
          36409, 36411, 36412, 36413, 36414, 36416, 36417, 36418, 36419, 36420,
          36421, 36422, 36423, 36424, 36425, 36426, 36427, 36429, 36432, 36433,
          36434, 36435, 36441, 36443, 36444, 36445, 36446, 36768, 36769, 36770,
          36771, 36772, 36773, 36774, 36775, 36776, 36777, 36778, 36779, 36780,
          36781, 36782, 36783, 36784, 36785, 36786, 36788, 36789, 36790, 36791,
          36792, 36793, 36794, 36796, 36797, 36798, 36799, 36800, 36801, 36802,
          36803, 36804, 36805, 36806, 36808, 36809, 36810, 36811, 36812, 36813,
          36814, 36815, 36816, 37307, 37308, 37309, 37310, 37311, 37312, 37313,
          37314, 37315, 37316, 37317, 37319, 37320, 37321, 37322, 37323, 37324,
          37325, 37326, 37328, 37329, 37330, 37331, 37333, 37334, 37336, 37337,
          37338, 37339, 37341, 37342, 37343, 37344, 37345, 37346, 37347, 37348,
          37349, 37350, 37351, 37352, 37353, 37354, 37355, 37356, 37357, 37359,
          37362, 37363, 37364, 37365, 37366, 37367, 37368, 37369, 37370, 37371,
          37373, 37374, 37375, 37376, 37377, 37378, 37380, 37381, 37967, 37968,
          37969, 37970, 38538, 38539, 38541, 38542, 38544, 38545, 38546, 38547,
          38548, 38549, 38550, 38551, 38552, 38554, 38555, 38556, 38557, 38558,
          38559, 38560, 38562, 38564, 39897, 39898, 39899, 39900, 39901, 39902,
          39905, 39906, 39907, 39908, 39909, 39910, 39911, 39913, 39914, 39915,
          39916, 39918, 39919, 39920, 39921, 39922, 39923, 39925, 39927, 39928,
          39929, 39930, 39932, 39933, 39935, 39936, 39937, 39938, 39939, 39940,
          39941, 39942, 39946, 39948, 39949, 39950, 39951, 39952, 39954, 39955,
          39956, 39957, 39958, 39959, 39960, 39961, 39962, 39964, 39965, 39966,
          39968, 39969, 39970, 39971, 39973, 39974, 39976, 39977, 39980, 39981,
          39982, 39983, 39988, 39990, 39991, 39994, 41914, 41915, 41916, 41917,
          41918, 41923, 41924, 41925, 41926, 41927, 41928, 41930, 41931, 41932,
          41934, 41935, 41936, 41937, 41938, 41939, 41941, 41942, 41943, 41944,
          41945, 41946, 42663, 42664, 42665, 42666, 42667, 42669, 42670, 42672,
          42673, 42674, 42675, 42676, 42678, 42679, 42680, 42681, 43220, 43221,
          43224, 43225, 43226, 43227, 43228, 43229, 43230, 43231, 43232, 43233,
          43234, 43236, 43237, 43238, 43239, 43240, 43241, 44051, 44052, 44054,
          44055, 44056, 44057, 44058, 44059, 44060, 44061, 44066, 44068, 44069,
          44070, 44071, 44072, 44073, 44074, 44075, 44076, 44077, 44078, 44079,
          44081, 44082, 44084, 44085, 44086, 44087, 44088, 44089, 44090, 44091,
          44092, 44093, 44094, 45773, 45774, 45775, 45776, 45777, 45779, 45781,
          45783, 45784, 45785, 45786, 46015, 46016, 46017, 46019, 46020, 46021,
          46022, 46023, 46024, 46025, 46026, 46027, 46028, 46029, 46030, 46031,
          46032, 46033, 46034, 46035, 46036, 46037, 46039, 46040, 46041, 46042,
          46043, 47266, 47267, 47268, 47270, 47271, 47272, 47273,
        ],
      },
      {
        count: 12,
        "vehicle_list ": [
          36430, 36431, 36436, 37327, 37335, 37360, 39904, 39931, 39972, 43223,
          44065, 45778,
        ],
      },
      {
        count: 3,
        "vehicle_list ": [37318, 39967, 44083],
      },
      {
        count: 1,
        "vehicle_list ": [36440],
      },
      {
        count: 1,
        "vehicle_list ": [39934],
      },
      {
        count: 5,
        "vehicle_list ": [37383, 39912, 39953, 39975, 41922],
      },
    ],
  },
  {
    datetime: "2022-12-06",
    active: {
      1: {
        stat: 13,
      },
      2: {
        stat: 11,
      },
      3: {
        stat: 3,
      },
      4: {
        stat: 3,
      },
      5: {
        stat: 2,
      },
    },
    inactive: 68,
    status: [
      {
        count: 249,
        "vehicle_list ": [
          36409, 36411, 36413, 36414, 36417, 36418, 36419, 36420, 36423, 36424,
          36427, 36433, 36434, 36440, 36441, 36443, 36445, 36768, 36769, 36770,
          36771, 36774, 36777, 36779, 36780, 36782, 36783, 36784, 36786, 36788,
          36789, 36790, 36792, 36793, 36794, 36796, 36798, 36801, 36803, 36804,
          36808, 36813, 36815, 36816, 37307, 37308, 37309, 37310, 37311, 37313,
          37314, 37318, 37319, 37320, 37321, 37323, 37324, 37327, 37328, 37329,
          37330, 37331, 37336, 37337, 37338, 37339, 37343, 37344, 37346, 37348,
          37349, 37350, 37352, 37356, 37357, 37359, 37363, 37364, 37368, 37369,
          37370, 37371, 37373, 37374, 37375, 37376, 37377, 37383, 37967, 37970,
          38541, 38542, 38544, 38545, 38547, 38548, 38551, 38552, 38554, 38555,
          38556, 38557, 38558, 38559, 38560, 38562, 38564, 39897, 39899, 39900,
          39901, 39904, 39905, 39908, 39909, 39910, 39911, 39912, 39913, 39915,
          39916, 39918, 39922, 39925, 39928, 39930, 39931, 39933, 39936, 39937,
          39938, 39939, 39941, 39942, 39948, 39949, 39952, 39953, 39954, 39956,
          39958, 39960, 39962, 39964, 39968, 39974, 39976, 39977, 39980, 39983,
          39988, 39994, 41915, 41916, 41917, 41922, 41924, 41925, 41927, 41928,
          41931, 41934, 41936, 41939, 41941, 41943, 41944, 42663, 42664, 42665,
          42666, 42667, 42669, 42670, 42674, 42678, 42679, 42680, 42681, 43220,
          43221, 43226, 43229, 43230, 43233, 43234, 43239, 43240, 43241, 44051,
          44054, 44057, 44059, 44061, 44065, 44068, 44069, 44070, 44071, 44074,
          44075, 44076, 44077, 44078, 44079, 44081, 44082, 44086, 44089, 44090,
          44091, 44092, 44093, 44094, 45773, 45774, 45776, 45777, 45779, 45781,
          45783, 45784, 45785, 45786, 46015, 46016, 46017, 46021, 46022, 46023,
          46025, 46027, 46029, 46030, 46031, 46032, 46033, 46034, 46036, 46039,
          46040, 46041, 46042, 46043, 47266, 47267, 47268, 47272, 47273,
        ],
      },
      {
        count: 59,
        "vehicle_list ": [
          36416, 36421, 36422, 36425, 36430, 36775, 36778, 36797, 36800, 36802,
          36812, 37312, 37315, 37317, 37322, 37325, 37342, 37351, 37360, 37365,
          37378, 37380, 37381, 37968, 37969, 38549, 39902, 39919, 39923, 39935,
          39940, 39955, 39957, 39959, 39961, 39967, 39971, 39972, 39973, 39975,
          39981, 41926, 41937, 41938, 41945, 42676, 43225, 43227, 43231, 44058,
          44066, 44072, 44083, 44085, 44087, 46024, 46026, 46035, 47271,
        ],
      },
      {
        count: 52,
        "vehicle_list ": [
          36412, 36426, 36429, 36431, 36432, 36444, 36773, 36781, 36799, 36814,
          37326, 37333, 37334, 37335, 37345, 37347, 37354, 37362, 37367, 38539,
          38546, 39906, 39907, 39914, 39920, 39921, 39934, 39950, 39965, 39966,
          39991, 41914, 41918, 41923, 41946, 42673, 42675, 43223, 43224, 43228,
          43232, 43236, 43237, 44055, 44056, 44060, 44084, 44088, 45775, 45778,
          46037, 47270,
        ],
      },
      {
        count: 15,
        "vehicle_list ": [
          36436, 36772, 36776, 37316, 37341, 37366, 38538, 39927, 39951, 39990,
          43238, 44052, 44073, 46020, 46028,
        ],
      },
      {
        count: 15,
        "vehicle_list ": [
          36435, 36791, 36806, 36809, 36811, 37355, 39929, 39946, 39969, 39970,
          39982, 41930, 41932, 41942, 46019,
        ],
      },
      {
        count: 10,
        "vehicle_list ": [
          36446, 36785, 36805, 36810, 37353, 38550, 39898, 39932, 41935, 42672,
        ],
      },
    ],
  },
  {
    datetime: "2022-12-07",
    active: {
      1: {
        stat: 4,
      },
      2: {
        stat: 2,
      },
      3: {
        stat: 3,
      },
      4: {
        stat: 3,
      },
      5: {
        stat: 2,
      },
    },
    inactive: 86,
    status: [
      {
        count: 331,
        "vehicle_list ": [
          36409, 36411, 36412, 36413, 36414, 36416, 36418, 36419, 36420, 36421,
          36422, 36423, 36424, 36425, 36426, 36427, 36429, 36430, 36431, 36432,
          36433, 36434, 36440, 36441, 36443, 36444, 36445, 36768, 36769, 36770,
          36771, 36773, 36774, 36775, 36777, 36778, 36779, 36780, 36782, 36783,
          36784, 36786, 36788, 36789, 36790, 36792, 36793, 36794, 36796, 36797,
          36798, 36799, 36800, 36801, 36802, 36803, 36804, 36808, 36813, 36814,
          36816, 37307, 37308, 37309, 37310, 37311, 37312, 37313, 37314, 37315,
          37317, 37318, 37319, 37320, 37321, 37322, 37323, 37324, 37325, 37327,
          37328, 37329, 37330, 37331, 37335, 37336, 37337, 37338, 37339, 37342,
          37343, 37344, 37345, 37346, 37347, 37348, 37349, 37350, 37351, 37352,
          37354, 37356, 37357, 37359, 37360, 37362, 37363, 37364, 37365, 37368,
          37369, 37370, 37371, 37373, 37374, 37375, 37376, 37377, 37381, 37383,
          37967, 37968, 37969, 37970, 38538, 38539, 38541, 38542, 38545, 38547,
          38548, 38549, 38551, 38554, 38555, 38556, 38557, 38558, 38559, 38560,
          38562, 38564, 39897, 39899, 39901, 39904, 39905, 39906, 39907, 39908,
          39909, 39910, 39911, 39912, 39913, 39914, 39915, 39916, 39918, 39919,
          39920, 39921, 39923, 39925, 39928, 39930, 39931, 39933, 39934, 39936,
          39937, 39938, 39939, 39940, 39941, 39942, 39948, 39949, 39950, 39951,
          39952, 39953, 39954, 39955, 39956, 39957, 39958, 39960, 39962, 39964,
          39965, 39966, 39967, 39968, 39969, 39971, 39972, 39973, 39974, 39975,
          39976, 39980, 39981, 39983, 39988, 39991, 39994, 41914, 41915, 41916,
          41917, 41918, 41922, 41923, 41924, 41925, 41926, 41927, 41928, 41931,
          41934, 41936, 41937, 41938, 41939, 41943, 41944, 41945, 41946, 42663,
          42664, 42665, 42666, 42667, 42669, 42670, 42674, 42675, 42676, 42678,
          42679, 42680, 42681, 43220, 43221, 43223, 43224, 43225, 43227, 43229,
          43230, 43231, 43232, 43233, 43234, 43236, 43239, 43241, 44051, 44054,
          44055, 44057, 44058, 44059, 44061, 44065, 44066, 44068, 44069, 44070,
          44071, 44072, 44074, 44075, 44076, 44077, 44078, 44079, 44081, 44082,
          44083, 44084, 44085, 44086, 44088, 44089, 44090, 44091, 44092, 44093,
          44094, 45773, 45774, 45775, 45776, 45777, 45779, 45781, 45783, 45784,
          45785, 45786, 46015, 46016, 46017, 46021, 46022, 46023, 46024, 46025,
          46026, 46027, 46028, 46029, 46030, 46031, 46032, 46033, 46034, 46035,
          46036, 46037, 46040, 46041, 46042, 47266, 47267, 47268, 47270, 47272,
          47273,
        ],
      },
      {
        count: 19,
        "vehicle_list ": [
          36417, 36436, 36446, 36811, 36812, 37341, 38546, 38552, 39900, 39922,
          39935, 39961, 41935, 41941, 42673, 43228, 44052, 44087, 45778,
        ],
      },
      {
        count: 10,
        "vehicle_list ": [
          36785, 36815, 37316, 37380, 39959, 41930, 43240, 44056, 44073, 47271,
        ],
      },
      {
        count: 16,
        "vehicle_list ": [
          36772, 36781, 36791, 37326, 37333, 37353, 37366, 37378, 39898, 39932,
          39982, 43237, 43238, 46019, 46039, 46043,
        ],
      },
      {
        count: 15,
        "vehicle_list ": [
          36435, 36776, 36806, 36809, 36810, 37355, 37367, 39902, 39927, 39929,
          39977, 39990, 42672, 44060, 46020,
        ],
      },
      {
        count: 9,
        "vehicle_list ": [
          36805, 37334, 38544, 38550, 39946, 39970, 41932, 41942, 43226,
        ],
      },
    ],
  },
  {
    datetime: "2022-12-08",
    active: {
      1: {
        stat: 4,
      },
      2: {
        stat: 2,
      },
      3: {
        stat: 3,
      },
      4: {
        stat: 6,
      },
      5: {
        stat: 1,
      },
    },
    inactive: 84,
    status: [
      {
        count: 327,
        "vehicle_list ": [
          36409, 36411, 36412, 36413, 36414, 36416, 36417, 36418, 36419, 36420,
          36421, 36422, 36423, 36424, 36425, 36426, 36427, 36429, 36430, 36431,
          36432, 36433, 36434, 36435, 36436, 36440, 36441, 36443, 36444, 36445,
          36768, 36769, 36770, 36771, 36773, 36774, 36775, 36777, 36778, 36779,
          36780, 36782, 36783, 36784, 36786, 36788, 36789, 36790, 36792, 36793,
          36794, 36796, 36798, 36799, 36800, 36801, 36802, 36803, 36804, 36811,
          36813, 36814, 36816, 37307, 37308, 37309, 37310, 37311, 37312, 37313,
          37314, 37317, 37318, 37319, 37320, 37321, 37322, 37323, 37324, 37325,
          37326, 37327, 37329, 37330, 37331, 37335, 37336, 37337, 37338, 37339,
          37342, 37343, 37344, 37345, 37346, 37347, 37348, 37349, 37350, 37352,
          37354, 37356, 37357, 37360, 37362, 37363, 37364, 37365, 37368, 37369,
          37370, 37371, 37373, 37374, 37375, 37376, 37377, 37378, 37381, 37383,
          37967, 37969, 37970, 38538, 38539, 38541, 38542, 38545, 38547, 38548,
          38549, 38551, 38552, 38554, 38555, 38556, 38557, 38558, 38559, 38560,
          38562, 38564, 39897, 39899, 39901, 39904, 39905, 39907, 39908, 39909,
          39910, 39911, 39912, 39913, 39914, 39915, 39916, 39918, 39919, 39920,
          39921, 39923, 39925, 39928, 39930, 39931, 39933, 39934, 39935, 39936,
          39937, 39938, 39939, 39940, 39942, 39948, 39949, 39950, 39951, 39952,
          39953, 39954, 39955, 39956, 39957, 39958, 39960, 39961, 39962, 39964,
          39965, 39966, 39968, 39970, 39971, 39972, 39973, 39974, 39975, 39976,
          39980, 39981, 39983, 39988, 39991, 39994, 41914, 41915, 41916, 41917,
          41918, 41922, 41923, 41924, 41925, 41926, 41927, 41928, 41931, 41934,
          41935, 41936, 41937, 41938, 41939, 41943, 41944, 41945, 41946, 42663,
          42664, 42665, 42666, 42667, 42669, 42670, 42674, 42676, 42678, 42679,
          42680, 42681, 43220, 43221, 43223, 43224, 43225, 43229, 43230, 43231,
          43232, 43233, 43234, 43236, 43239, 43241, 44051, 44054, 44055, 44057,
          44058, 44059, 44061, 44065, 44066, 44069, 44070, 44071, 44072, 44074,
          44075, 44076, 44077, 44078, 44079, 44081, 44082, 44083, 44084, 44085,
          44086, 44088, 44089, 44090, 44091, 44092, 44093, 44094, 45773, 45774,
          45775, 45776, 45777, 45779, 45781, 45783, 45784, 45785, 45786, 46015,
          46016, 46017, 46021, 46023, 46024, 46025, 46026, 46027, 46028, 46029,
          46030, 46031, 46032, 46033, 46034, 46035, 46036, 46037, 46040, 46041,
          46042, 47266, 47267, 47268, 47270, 47272, 47273,
        ],
      },
      {
        count: 20,
        "vehicle_list ": [
          36797, 36812, 37333, 37351, 37366, 39906, 39922, 39941, 41941, 41942,
          42675, 43228, 43237, 43238, 44068, 44087, 46022, 46039, 46043, 47271,
        ],
      },
      {
        count: 8,
        "vehicle_list ": [
          36772, 37341, 37359, 37367, 37968, 39946, 43226, 45778,
        ],
      },
      {
        count: 15,
        "vehicle_list ": [
          36791, 36805, 36815, 37316, 37380, 38544, 38546, 39927, 39967, 41930,
          42673, 43227, 44056, 44060, 44073,
        ],
      },
      {
        count: 27,
        "vehicle_list ": [
          36446, 36776, 36781, 36785, 36806, 36808, 36809, 36810, 37315, 37328,
          37334, 37353, 37355, 38550, 39902, 39929, 39932, 39959, 39969, 39977,
          39982, 39990, 42672, 43240, 44052, 46019, 46020,
        ],
      },
      {
        count: 3,
        "vehicle_list ": [39898, 39900, 41932],
      },
    ],
  },
  {
    datetime: "2022-12-09",
    active: {
      1: {
        stat: 0,
      },
      2: {
        stat: 0,
      },
      3: {
        stat: 0,
      },
      4: {
        stat: 0,
      },
      5: {
        stat: 0,
      },
    },
    inactive: 100,
    status: [
      {
        count: 400,
        "vehicle_list ": [
          36409, 36411, 36412, 36413, 36414, 36416, 36417, 36418, 36419, 36420,
          36421, 36422, 36423, 36424, 36425, 36426, 36427, 36429, 36430, 36431,
          36432, 36433, 36434, 36435, 36436, 36440, 36441, 36443, 36444, 36445,
          36446, 36768, 36769, 36770, 36771, 36772, 36773, 36774, 36775, 36776,
          36777, 36778, 36779, 36780, 36781, 36782, 36783, 36784, 36785, 36786,
          36788, 36789, 36790, 36791, 36792, 36793, 36794, 36796, 36797, 36798,
          36799, 36800, 36801, 36802, 36803, 36804, 36805, 36806, 36808, 36809,
          36810, 36811, 36812, 36813, 36814, 36815, 36816, 37307, 37308, 37309,
          37310, 37311, 37312, 37313, 37314, 37315, 37316, 37317, 37318, 37319,
          37320, 37321, 37322, 37323, 37324, 37325, 37326, 37327, 37328, 37329,
          37330, 37331, 37333, 37334, 37335, 37336, 37337, 37338, 37339, 37341,
          37342, 37343, 37344, 37345, 37346, 37347, 37348, 37349, 37350, 37351,
          37352, 37353, 37354, 37355, 37356, 37357, 37359, 37360, 37362, 37363,
          37364, 37365, 37366, 37367, 37368, 37369, 37370, 37371, 37373, 37374,
          37375, 37376, 37377, 37378, 37380, 37381, 37383, 37967, 37968, 37969,
          37970, 38538, 38539, 38541, 38542, 38544, 38545, 38546, 38547, 38548,
          38549, 38550, 38551, 38552, 38554, 38555, 38556, 38557, 38558, 38559,
          38560, 38562, 38564, 39897, 39898, 39899, 39900, 39901, 39902, 39904,
          39905, 39906, 39907, 39908, 39909, 39910, 39911, 39912, 39913, 39914,
          39915, 39916, 39918, 39919, 39920, 39921, 39922, 39923, 39925, 39927,
          39928, 39929, 39930, 39931, 39932, 39933, 39934, 39935, 39936, 39937,
          39938, 39939, 39940, 39941, 39942, 39946, 39948, 39949, 39950, 39951,
          39952, 39953, 39954, 39955, 39956, 39957, 39958, 39959, 39960, 39961,
          39962, 39964, 39965, 39966, 39967, 39968, 39969, 39970, 39971, 39972,
          39973, 39974, 39975, 39976, 39977, 39980, 39981, 39982, 39983, 39988,
          39990, 39991, 39994, 41914, 41915, 41916, 41917, 41918, 41922, 41923,
          41924, 41925, 41926, 41927, 41928, 41930, 41931, 41932, 41934, 41935,
          41936, 41937, 41938, 41939, 41941, 41942, 41943, 41944, 41945, 41946,
          42663, 42664, 42665, 42666, 42667, 42669, 42670, 42672, 42673, 42674,
          42675, 42676, 42678, 42679, 42680, 42681, 43220, 43221, 43223, 43224,
          43225, 43226, 43227, 43228, 43229, 43230, 43231, 43232, 43233, 43234,
          43236, 43237, 43238, 43239, 43240, 43241, 44051, 44052, 44054, 44055,
          44056, 44057, 44058, 44059, 44060, 44061, 44065, 44066, 44068, 44069,
          44070, 44071, 44072, 44073, 44074, 44075, 44076, 44077, 44078, 44079,
          44081, 44082, 44083, 44084, 44085, 44086, 44087, 44088, 44089, 44090,
          44091, 44092, 44093, 44094, 45773, 45774, 45775, 45776, 45777, 45778,
          45779, 45781, 45783, 45784, 45785, 45786, 46015, 46016, 46017, 46019,
          46020, 46021, 46022, 46023, 46024, 46025, 46026, 46027, 46028, 46029,
          46030, 46031, 46032, 46033, 46034, 46035, 46036, 46037, 46039, 46040,
          46041, 46042, 46043, 47266, 47267, 47268, 47270, 47271, 47272, 47273,
        ],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
    ],
  },
  {
    datetime: "2022-12-10",
    active: {
      1: {
        stat: 0,
      },
      2: {
        stat: 0,
      },
      3: {
        stat: 0,
      },
      4: {
        stat: 0,
      },
      5: {
        stat: 0,
      },
    },
    inactive: 100,
    status: [
      {
        count: 400,
        "vehicle_list ": [
          36409, 36411, 36412, 36413, 36414, 36416, 36417, 36418, 36419, 36420,
          36421, 36422, 36423, 36424, 36425, 36426, 36427, 36429, 36430, 36431,
          36432, 36433, 36434, 36435, 36436, 36440, 36441, 36443, 36444, 36445,
          36446, 36768, 36769, 36770, 36771, 36772, 36773, 36774, 36775, 36776,
          36777, 36778, 36779, 36780, 36781, 36782, 36783, 36784, 36785, 36786,
          36788, 36789, 36790, 36791, 36792, 36793, 36794, 36796, 36797, 36798,
          36799, 36800, 36801, 36802, 36803, 36804, 36805, 36806, 36808, 36809,
          36810, 36811, 36812, 36813, 36814, 36815, 36816, 37307, 37308, 37309,
          37310, 37311, 37312, 37313, 37314, 37315, 37316, 37317, 37318, 37319,
          37320, 37321, 37322, 37323, 37324, 37325, 37326, 37327, 37328, 37329,
          37330, 37331, 37333, 37334, 37335, 37336, 37337, 37338, 37339, 37341,
          37342, 37343, 37344, 37345, 37346, 37347, 37348, 37349, 37350, 37351,
          37352, 37353, 37354, 37355, 37356, 37357, 37359, 37360, 37362, 37363,
          37364, 37365, 37366, 37367, 37368, 37369, 37370, 37371, 37373, 37374,
          37375, 37376, 37377, 37378, 37380, 37381, 37383, 37967, 37968, 37969,
          37970, 38538, 38539, 38541, 38542, 38544, 38545, 38546, 38547, 38548,
          38549, 38550, 38551, 38552, 38554, 38555, 38556, 38557, 38558, 38559,
          38560, 38562, 38564, 39897, 39898, 39899, 39900, 39901, 39902, 39904,
          39905, 39906, 39907, 39908, 39909, 39910, 39911, 39912, 39913, 39914,
          39915, 39916, 39918, 39919, 39920, 39921, 39922, 39923, 39925, 39927,
          39928, 39929, 39930, 39931, 39932, 39933, 39934, 39935, 39936, 39937,
          39938, 39939, 39940, 39941, 39942, 39946, 39948, 39949, 39950, 39951,
          39952, 39953, 39954, 39955, 39956, 39957, 39958, 39959, 39960, 39961,
          39962, 39964, 39965, 39966, 39967, 39968, 39969, 39970, 39971, 39972,
          39973, 39974, 39975, 39976, 39977, 39980, 39981, 39982, 39983, 39988,
          39990, 39991, 39994, 41914, 41915, 41916, 41917, 41918, 41922, 41923,
          41924, 41925, 41926, 41927, 41928, 41930, 41931, 41932, 41934, 41935,
          41936, 41937, 41938, 41939, 41941, 41942, 41943, 41944, 41945, 41946,
          42663, 42664, 42665, 42666, 42667, 42669, 42670, 42672, 42673, 42674,
          42675, 42676, 42678, 42679, 42680, 42681, 43220, 43221, 43223, 43224,
          43225, 43226, 43227, 43228, 43229, 43230, 43231, 43232, 43233, 43234,
          43236, 43237, 43238, 43239, 43240, 43241, 44051, 44052, 44054, 44055,
          44056, 44057, 44058, 44059, 44060, 44061, 44065, 44066, 44068, 44069,
          44070, 44071, 44072, 44073, 44074, 44075, 44076, 44077, 44078, 44079,
          44081, 44082, 44083, 44084, 44085, 44086, 44087, 44088, 44089, 44090,
          44091, 44092, 44093, 44094, 45773, 45774, 45775, 45776, 45777, 45778,
          45779, 45781, 45783, 45784, 45785, 45786, 46015, 46016, 46017, 46019,
          46020, 46021, 46022, 46023, 46024, 46025, 46026, 46027, 46028, 46029,
          46030, 46031, 46032, 46033, 46034, 46035, 46036, 46037, 46039, 46040,
          46041, 46042, 46043, 47266, 47267, 47268, 47270, 47271, 47272, 47273,
        ],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
    ],
  },
  {
    datetime: "2022-12-11",
    active: {
      1: {
        stat: 0,
      },
      2: {
        stat: 0,
      },
      3: {
        stat: 0,
      },
      4: {
        stat: 0,
      },
      5: {
        stat: 0,
      },
    },
    inactive: 100,
    status: [
      {
        count: 400,
        "vehicle_list ": [
          36409, 36411, 36412, 36413, 36414, 36416, 36417, 36418, 36419, 36420,
          36421, 36422, 36423, 36424, 36425, 36426, 36427, 36429, 36430, 36431,
          36432, 36433, 36434, 36435, 36436, 36440, 36441, 36443, 36444, 36445,
          36446, 36768, 36769, 36770, 36771, 36772, 36773, 36774, 36775, 36776,
          36777, 36778, 36779, 36780, 36781, 36782, 36783, 36784, 36785, 36786,
          36788, 36789, 36790, 36791, 36792, 36793, 36794, 36796, 36797, 36798,
          36799, 36800, 36801, 36802, 36803, 36804, 36805, 36806, 36808, 36809,
          36810, 36811, 36812, 36813, 36814, 36815, 36816, 37307, 37308, 37309,
          37310, 37311, 37312, 37313, 37314, 37315, 37316, 37317, 37318, 37319,
          37320, 37321, 37322, 37323, 37324, 37325, 37326, 37327, 37328, 37329,
          37330, 37331, 37333, 37334, 37335, 37336, 37337, 37338, 37339, 37341,
          37342, 37343, 37344, 37345, 37346, 37347, 37348, 37349, 37350, 37351,
          37352, 37353, 37354, 37355, 37356, 37357, 37359, 37360, 37362, 37363,
          37364, 37365, 37366, 37367, 37368, 37369, 37370, 37371, 37373, 37374,
          37375, 37376, 37377, 37378, 37380, 37381, 37383, 37967, 37968, 37969,
          37970, 38538, 38539, 38541, 38542, 38544, 38545, 38546, 38547, 38548,
          38549, 38550, 38551, 38552, 38554, 38555, 38556, 38557, 38558, 38559,
          38560, 38562, 38564, 39897, 39898, 39899, 39900, 39901, 39902, 39904,
          39905, 39906, 39907, 39908, 39909, 39910, 39911, 39912, 39913, 39914,
          39915, 39916, 39918, 39919, 39920, 39921, 39922, 39923, 39925, 39927,
          39928, 39929, 39930, 39931, 39932, 39933, 39934, 39935, 39936, 39937,
          39938, 39939, 39940, 39941, 39942, 39946, 39948, 39949, 39950, 39951,
          39952, 39953, 39954, 39955, 39956, 39957, 39958, 39959, 39960, 39961,
          39962, 39964, 39965, 39966, 39967, 39968, 39969, 39970, 39971, 39972,
          39973, 39974, 39975, 39976, 39977, 39980, 39981, 39982, 39983, 39988,
          39990, 39991, 39994, 41914, 41915, 41916, 41917, 41918, 41922, 41923,
          41924, 41925, 41926, 41927, 41928, 41930, 41931, 41932, 41934, 41935,
          41936, 41937, 41938, 41939, 41941, 41942, 41943, 41944, 41945, 41946,
          42663, 42664, 42665, 42666, 42667, 42669, 42670, 42672, 42673, 42674,
          42675, 42676, 42678, 42679, 42680, 42681, 43220, 43221, 43223, 43224,
          43225, 43226, 43227, 43228, 43229, 43230, 43231, 43232, 43233, 43234,
          43236, 43237, 43238, 43239, 43240, 43241, 44051, 44052, 44054, 44055,
          44056, 44057, 44058, 44059, 44060, 44061, 44065, 44066, 44068, 44069,
          44070, 44071, 44072, 44073, 44074, 44075, 44076, 44077, 44078, 44079,
          44081, 44082, 44083, 44084, 44085, 44086, 44087, 44088, 44089, 44090,
          44091, 44092, 44093, 44094, 45773, 45774, 45775, 45776, 45777, 45778,
          45779, 45781, 45783, 45784, 45785, 45786, 46015, 46016, 46017, 46019,
          46020, 46021, 46022, 46023, 46024, 46025, 46026, 46027, 46028, 46029,
          46030, 46031, 46032, 46033, 46034, 46035, 46036, 46037, 46039, 46040,
          46041, 46042, 46043, 47266, 47267, 47268, 47270, 47271, 47272, 47273,
        ],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
    ],
  },
  {
    datetime: "2022-12-12",
    active: {
      1: {
        stat: 0,
      },
      2: {
        stat: 0,
      },
      3: {
        stat: 0,
      },
      4: {
        stat: 0,
      },
      5: {
        stat: 0,
      },
    },
    inactive: 100,
    status: [
      {
        count: 400,
        "vehicle_list ": [
          36409, 36411, 36412, 36413, 36414, 36416, 36417, 36418, 36419, 36420,
          36421, 36422, 36423, 36424, 36425, 36426, 36427, 36429, 36430, 36431,
          36432, 36433, 36434, 36435, 36436, 36440, 36441, 36443, 36444, 36445,
          36446, 36768, 36769, 36770, 36771, 36772, 36773, 36774, 36775, 36776,
          36777, 36778, 36779, 36780, 36781, 36782, 36783, 36784, 36785, 36786,
          36788, 36789, 36790, 36791, 36792, 36793, 36794, 36796, 36797, 36798,
          36799, 36800, 36801, 36802, 36803, 36804, 36805, 36806, 36808, 36809,
          36810, 36811, 36812, 36813, 36814, 36815, 36816, 37307, 37308, 37309,
          37310, 37311, 37312, 37313, 37314, 37315, 37316, 37317, 37318, 37319,
          37320, 37321, 37322, 37323, 37324, 37325, 37326, 37327, 37328, 37329,
          37330, 37331, 37333, 37334, 37335, 37336, 37337, 37338, 37339, 37341,
          37342, 37343, 37344, 37345, 37346, 37347, 37348, 37349, 37350, 37351,
          37352, 37353, 37354, 37355, 37356, 37357, 37359, 37360, 37362, 37363,
          37364, 37365, 37366, 37367, 37368, 37369, 37370, 37371, 37373, 37374,
          37375, 37376, 37377, 37378, 37380, 37381, 37383, 37967, 37968, 37969,
          37970, 38538, 38539, 38541, 38542, 38544, 38545, 38546, 38547, 38548,
          38549, 38550, 38551, 38552, 38554, 38555, 38556, 38557, 38558, 38559,
          38560, 38562, 38564, 39897, 39898, 39899, 39900, 39901, 39902, 39904,
          39905, 39906, 39907, 39908, 39909, 39910, 39911, 39912, 39913, 39914,
          39915, 39916, 39918, 39919, 39920, 39921, 39922, 39923, 39925, 39927,
          39928, 39929, 39930, 39931, 39932, 39933, 39934, 39935, 39936, 39937,
          39938, 39939, 39940, 39941, 39942, 39946, 39948, 39949, 39950, 39951,
          39952, 39953, 39954, 39955, 39956, 39957, 39958, 39959, 39960, 39961,
          39962, 39964, 39965, 39966, 39967, 39968, 39969, 39970, 39971, 39972,
          39973, 39974, 39975, 39976, 39977, 39980, 39981, 39982, 39983, 39988,
          39990, 39991, 39994, 41914, 41915, 41916, 41917, 41918, 41922, 41923,
          41924, 41925, 41926, 41927, 41928, 41930, 41931, 41932, 41934, 41935,
          41936, 41937, 41938, 41939, 41941, 41942, 41943, 41944, 41945, 41946,
          42663, 42664, 42665, 42666, 42667, 42669, 42670, 42672, 42673, 42674,
          42675, 42676, 42678, 42679, 42680, 42681, 43220, 43221, 43223, 43224,
          43225, 43226, 43227, 43228, 43229, 43230, 43231, 43232, 43233, 43234,
          43236, 43237, 43238, 43239, 43240, 43241, 44051, 44052, 44054, 44055,
          44056, 44057, 44058, 44059, 44060, 44061, 44065, 44066, 44068, 44069,
          44070, 44071, 44072, 44073, 44074, 44075, 44076, 44077, 44078, 44079,
          44081, 44082, 44083, 44084, 44085, 44086, 44087, 44088, 44089, 44090,
          44091, 44092, 44093, 44094, 45773, 45774, 45775, 45776, 45777, 45778,
          45779, 45781, 45783, 45784, 45785, 45786, 46015, 46016, 46017, 46019,
          46020, 46021, 46022, 46023, 46024, 46025, 46026, 46027, 46028, 46029,
          46030, 46031, 46032, 46033, 46034, 46035, 46036, 46037, 46039, 46040,
          46041, 46042, 46043, 47266, 47267, 47268, 47270, 47271, 47272, 47273,
        ],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
    ],
  },
  {
    datetime: "2022-12-13",
    active: {
      1: {
        stat: 1,
      },
      2: {
        stat: 0,
      },
      3: {
        stat: 0,
      },
      4: {
        stat: 0,
      },
      5: {
        stat: 0,
      },
    },
    inactive: 99,
    status: [
      {
        count: 393,
        "vehicle_list ": [
          36409, 36411, 36412, 36413, 36414, 36416, 36417, 36418, 36419, 36420,
          36421, 36422, 36423, 36424, 36425, 36426, 36427, 36429, 36430, 36431,
          36432, 36433, 36434, 36435, 36436, 36441, 36443, 36444, 36445, 36446,
          36768, 36769, 36770, 36772, 36773, 36774, 36775, 36776, 36777, 36778,
          36779, 36780, 36781, 36782, 36783, 36784, 36785, 36786, 36788, 36789,
          36790, 36791, 36792, 36793, 36794, 36796, 36797, 36798, 36799, 36800,
          36801, 36802, 36803, 36804, 36805, 36806, 36808, 36809, 36810, 36811,
          36812, 36813, 36814, 36815, 36816, 37307, 37308, 37309, 37310, 37311,
          37312, 37313, 37315, 37316, 37317, 37318, 37319, 37320, 37321, 37322,
          37323, 37324, 37325, 37326, 37327, 37328, 37329, 37330, 37331, 37333,
          37334, 37335, 37336, 37337, 37338, 37339, 37341, 37342, 37343, 37344,
          37345, 37346, 37347, 37348, 37349, 37350, 37351, 37353, 37354, 37355,
          37356, 37357, 37359, 37360, 37363, 37364, 37365, 37366, 37367, 37368,
          37369, 37370, 37371, 37373, 37374, 37375, 37376, 37377, 37378, 37380,
          37381, 37383, 37967, 37968, 37969, 37970, 38538, 38539, 38541, 38542,
          38544, 38545, 38546, 38547, 38548, 38549, 38550, 38551, 38552, 38554,
          38555, 38556, 38557, 38558, 38559, 38560, 38562, 38564, 39897, 39898,
          39899, 39900, 39901, 39902, 39904, 39905, 39906, 39907, 39908, 39909,
          39910, 39911, 39912, 39913, 39914, 39915, 39916, 39918, 39919, 39920,
          39921, 39922, 39923, 39925, 39927, 39928, 39929, 39930, 39932, 39933,
          39934, 39935, 39936, 39937, 39938, 39939, 39940, 39941, 39942, 39946,
          39948, 39949, 39950, 39951, 39952, 39953, 39954, 39955, 39956, 39957,
          39958, 39959, 39960, 39961, 39962, 39964, 39965, 39966, 39967, 39968,
          39969, 39970, 39971, 39972, 39973, 39974, 39975, 39976, 39977, 39980,
          39981, 39982, 39983, 39988, 39990, 39991, 39994, 41914, 41915, 41916,
          41917, 41918, 41922, 41923, 41924, 41925, 41926, 41927, 41928, 41930,
          41931, 41932, 41934, 41935, 41936, 41937, 41938, 41939, 41941, 41942,
          41943, 41944, 41945, 41946, 42663, 42664, 42665, 42666, 42667, 42669,
          42670, 42672, 42673, 42674, 42675, 42676, 42678, 42679, 42680, 42681,
          43220, 43221, 43223, 43224, 43225, 43226, 43227, 43228, 43229, 43230,
          43231, 43232, 43233, 43234, 43236, 43237, 43238, 43239, 43240, 43241,
          44051, 44052, 44054, 44055, 44056, 44057, 44058, 44059, 44060, 44061,
          44065, 44066, 44068, 44069, 44071, 44072, 44073, 44074, 44075, 44076,
          44077, 44078, 44079, 44081, 44082, 44083, 44084, 44085, 44086, 44087,
          44088, 44089, 44090, 44091, 44092, 44093, 44094, 45773, 45774, 45775,
          45776, 45777, 45778, 45779, 45781, 45783, 45784, 45785, 45786, 46015,
          46016, 46017, 46019, 46020, 46021, 46022, 46023, 46024, 46025, 46026,
          46027, 46028, 46029, 46030, 46031, 46032, 46033, 46034, 46035, 46036,
          46037, 46039, 46040, 46041, 46042, 46043, 47266, 47267, 47268, 47270,
          47271, 47272, 47273,
        ],
      },
      {
        count: 5,
        "vehicle_list ": [36440, 36771, 37352, 37362, 44070],
      },
      {
        count: 1,
        "vehicle_list ": [37314],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 1,
        "vehicle_list ": [39931],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
    ],
  },
  {
    datetime: "2022-12-14",
    active: {
      1: {
        stat: 8,
      },
      2: {
        stat: 6,
      },
      3: {
        stat: 4,
      },
      4: {
        stat: 4,
      },
      5: {
        stat: 10,
      },
    },
    inactive: 68,
    status: [
      {
        count: 250,
        "vehicle_list ": [
          36409, 36411, 36414, 36417, 36419, 36420, 36422, 36423, 36424, 36425,
          36427, 36429, 36431, 36432, 36433, 36435, 36436, 36440, 36441, 36443,
          36446, 36768, 36772, 36776, 36777, 36780, 36781, 36785, 36786, 36788,
          36790, 36791, 36793, 36794, 36796, 36797, 36798, 36800, 36803, 36805,
          36806, 36808, 36809, 36810, 36811, 36812, 36813, 36815, 36816, 37308,
          37309, 37312, 37315, 37316, 37318, 37320, 37321, 37323, 37325, 37326,
          37328, 37330, 37331, 37333, 37334, 37336, 37337, 37338, 37341, 37343,
          37349, 37350, 37351, 37353, 37355, 37356, 37357, 37359, 37360, 37364,
          37366, 37367, 37369, 37370, 37374, 37375, 37376, 37377, 37378, 37380,
          37968, 37970, 38542, 38544, 38546, 38550, 38551, 38552, 38556, 38557,
          38558, 38562, 38564, 39898, 39900, 39902, 39904, 39906, 39907, 39908,
          39910, 39911, 39914, 39915, 39916, 39918, 39922, 39923, 39925, 39927,
          39929, 39930, 39932, 39933, 39935, 39939, 39941, 39942, 39946, 39948,
          39950, 39951, 39956, 39957, 39959, 39960, 39961, 39965, 39967, 39968,
          39969, 39970, 39973, 39974, 39977, 39981, 39982, 39988, 39990, 39994,
          41914, 41917, 41922, 41923, 41924, 41925, 41926, 41928, 41930, 41932,
          41935, 41939, 41941, 41942, 41943, 41944, 41946, 42665, 42666, 42667,
          42669, 42672, 42673, 42674, 42675, 42676, 42678, 42679, 42681, 43220,
          43223, 43225, 43226, 43227, 43228, 43230, 43233, 43234, 43236, 43237,
          43238, 43239, 43240, 43241, 44051, 44052, 44054, 44056, 44057, 44059,
          44060, 44061, 44065, 44066, 44068, 44073, 44074, 44075, 44076, 44078,
          44079, 44081, 44082, 44083, 44086, 44087, 44089, 44090, 44092, 44094,
          45773, 45774, 45777, 45778, 45784, 45785, 45786, 46017, 46019, 46020,
          46022, 46023, 46024, 46025, 46027, 46029, 46030, 46032, 46033, 46034,
          46035, 46036, 46037, 46039, 46040, 46041, 46042, 46043, 47271, 47273,
        ],
      },
      {
        count: 38,
        "vehicle_list ": [
          36416, 36444, 36773, 36774, 36775, 36778, 36801, 36802, 36804, 37311,
          37322, 37335, 37342, 37383, 37969, 38539, 39901, 39919, 39921, 39928,
          39937, 39940, 39949, 39964, 39972, 39983, 41945, 42670, 43221, 44055,
          44069, 44072, 44085, 45775, 45776, 45781, 46015, 47272,
        ],
      },
      {
        count: 26,
        "vehicle_list ": [
          36413, 36421, 36426, 36434, 36771, 36783, 37310, 37317, 37324, 37339,
          37365, 38545, 38554, 38560, 39912, 39958, 39975, 39991, 41936, 41937,
          44058, 44084, 45779, 45783, 47266, 47270,
        ],
      },
      {
        count: 19,
        "vehicle_list ": [
          36779, 36789, 36792, 37313, 37319, 37344, 37348, 37362, 37371, 38559,
          39897, 39920, 39962, 39980, 41918, 41934, 43229, 44070, 47268,
        ],
      },
      {
        count: 21,
        "vehicle_list ": [
          36412, 36769, 36784, 36799, 37345, 37346, 37363, 38541, 38547, 38555,
          39905, 39954, 39966, 41915, 41927, 41931, 42663, 42664, 43224, 43231,
          46021,
        ],
      },
      {
        count: 46,
        "vehicle_list ": [
          36418, 36430, 36445, 36770, 36782, 36814, 37307, 37314, 37327, 37329,
          37347, 37352, 37354, 37368, 37373, 37381, 37967, 38538, 38548, 38549,
          39899, 39909, 39913, 39931, 39934, 39936, 39938, 39952, 39953, 39955,
          39971, 39976, 41916, 41938, 42680, 43232, 44071, 44077, 44088, 44091,
          44093, 46016, 46026, 46028, 46031, 47267,
        ],
      },
    ],
  },
  {
    datetime: "2022-12-15",
    active: {
      1: {
        stat: 4,
      },
      2: {
        stat: 2,
      },
      3: {
        stat: 2,
      },
      4: {
        stat: 3,
      },
      5: {
        stat: 1,
      },
    },
    inactive: 88,
    status: [
      {
        count: 340,
        "vehicle_list ": [
          36409, 36411, 36412, 36414, 36417, 36418, 36419, 36421, 36422, 36424,
          36425, 36426, 36427, 36429, 36430, 36431, 36432, 36433, 36434, 36435,
          36436, 36440, 36441, 36443, 36444, 36446, 36768, 36769, 36772, 36773,
          36774, 36775, 36776, 36777, 36778, 36779, 36780, 36781, 36784, 36785,
          36786, 36788, 36789, 36790, 36791, 36793, 36794, 36796, 36797, 36798,
          36799, 36800, 36801, 36802, 36803, 36804, 36805, 36806, 36808, 36809,
          36810, 36811, 36812, 36813, 36814, 36815, 36816, 37308, 37309, 37310,
          37311, 37312, 37315, 37316, 37318, 37319, 37320, 37321, 37322, 37323,
          37324, 37325, 37326, 37327, 37328, 37330, 37331, 37333, 37334, 37335,
          37336, 37337, 37338, 37339, 37341, 37342, 37343, 37344, 37345, 37346,
          37347, 37349, 37350, 37351, 37352, 37353, 37354, 37355, 37356, 37357,
          37359, 37360, 37362, 37364, 37365, 37366, 37367, 37369, 37370, 37371,
          37374, 37376, 37377, 37378, 37380, 37381, 37383, 37968, 37969, 37970,
          38538, 38539, 38542, 38544, 38546, 38549, 38550, 38551, 38552, 38554,
          38556, 38557, 38558, 38559, 38564, 39897, 39898, 39900, 39901, 39902,
          39904, 39906, 39907, 39908, 39909, 39910, 39911, 39912, 39913, 39914,
          39915, 39916, 39918, 39919, 39920, 39921, 39922, 39923, 39925, 39927,
          39928, 39929, 39930, 39931, 39932, 39933, 39934, 39935, 39936, 39937,
          39939, 39940, 39941, 39942, 39946, 39948, 39949, 39950, 39951, 39952,
          39953, 39954, 39955, 39956, 39957, 39958, 39959, 39960, 39961, 39964,
          39965, 39966, 39967, 39968, 39969, 39970, 39972, 39973, 39974, 39975,
          39977, 39981, 39982, 39988, 39990, 39991, 41914, 41917, 41918, 41922,
          41923, 41924, 41925, 41926, 41928, 41930, 41931, 41932, 41934, 41935,
          41936, 41937, 41939, 41941, 41942, 41944, 41945, 41946, 42665, 42666,
          42669, 42670, 42672, 42673, 42674, 42675, 42676, 42678, 42679, 42681,
          43220, 43221, 43223, 43224, 43225, 43226, 43227, 43228, 43230, 43232,
          43233, 43234, 43236, 43237, 43238, 43239, 43240, 43241, 44052, 44054,
          44055, 44056, 44058, 44059, 44060, 44061, 44065, 44066, 44068, 44072,
          44073, 44074, 44075, 44076, 44077, 44078, 44079, 44081, 44082, 44083,
          44084, 44085, 44086, 44087, 44088, 44089, 44090, 44091, 44092, 44093,
          44094, 45773, 45774, 45775, 45777, 45778, 45779, 45781, 45783, 45784,
          45785, 45786, 46017, 46019, 46020, 46022, 46023, 46024, 46025, 46026,
          46027, 46029, 46030, 46032, 46033, 46034, 46035, 46036, 46037, 46039,
          46040, 46041, 46042, 46043, 47266, 47267, 47270, 47271, 47272, 47273,
        ],
      },
      {
        count: 18,
        "vehicle_list ": [
          36416, 36771, 36783, 37313, 37314, 37317, 37967, 38545, 38547, 39971,
          39983, 39994, 41943, 42667, 43231, 44051, 44057, 46028,
        ],
      },
      {
        count: 10,
        "vehicle_list ": [
          36413, 36423, 37368, 39938, 42663, 42680, 44069, 44071, 46015, 47268,
        ],
      },
      {
        count: 10,
        "vehicle_list ": [
          36770, 37348, 37373, 37375, 38555, 39899, 39962, 43229, 45776, 46031,
        ],
      },
      {
        count: 16,
        "vehicle_list ": [
          36420, 36445, 36792, 37307, 37363, 38541, 38548, 38560, 38562, 39905,
          39980, 41915, 41927, 41938, 42664, 44070,
        ],
      },
      {
        count: 6,
        "vehicle_list ": [36782, 37329, 39976, 41916, 46016, 46021],
      },
    ],
  },
  {
    datetime: "2022-12-16",
    active: {
      1: {
        stat: 0,
      },
      2: {
        stat: 0,
      },
      3: {
        stat: 0,
      },
      4: {
        stat: 0,
      },
      5: {
        stat: 0,
      },
    },
    inactive: 100,
    status: [
      {
        count: 400,
        "vehicle_list ": [
          36409, 36411, 36412, 36413, 36414, 36416, 36417, 36418, 36419, 36420,
          36421, 36422, 36423, 36424, 36425, 36426, 36427, 36429, 36430, 36431,
          36432, 36433, 36434, 36435, 36436, 36440, 36441, 36443, 36444, 36445,
          36446, 36768, 36769, 36770, 36771, 36772, 36773, 36774, 36775, 36776,
          36777, 36778, 36779, 36780, 36781, 36782, 36783, 36784, 36785, 36786,
          36788, 36789, 36790, 36791, 36792, 36793, 36794, 36796, 36797, 36798,
          36799, 36800, 36801, 36802, 36803, 36804, 36805, 36806, 36808, 36809,
          36810, 36811, 36812, 36813, 36814, 36815, 36816, 37307, 37308, 37309,
          37310, 37311, 37312, 37313, 37314, 37315, 37316, 37317, 37318, 37319,
          37320, 37321, 37322, 37323, 37324, 37325, 37326, 37327, 37328, 37329,
          37330, 37331, 37333, 37334, 37335, 37336, 37337, 37338, 37339, 37341,
          37342, 37343, 37344, 37345, 37346, 37347, 37348, 37349, 37350, 37351,
          37352, 37353, 37354, 37355, 37356, 37357, 37359, 37360, 37362, 37363,
          37364, 37365, 37366, 37367, 37368, 37369, 37370, 37371, 37373, 37374,
          37375, 37376, 37377, 37378, 37380, 37381, 37383, 37967, 37968, 37969,
          37970, 38538, 38539, 38541, 38542, 38544, 38545, 38546, 38547, 38548,
          38549, 38550, 38551, 38552, 38554, 38555, 38556, 38557, 38558, 38559,
          38560, 38562, 38564, 39897, 39898, 39899, 39900, 39901, 39902, 39904,
          39905, 39906, 39907, 39908, 39909, 39910, 39911, 39912, 39913, 39914,
          39915, 39916, 39918, 39919, 39920, 39921, 39922, 39923, 39925, 39927,
          39928, 39929, 39930, 39931, 39932, 39933, 39934, 39935, 39936, 39937,
          39938, 39939, 39940, 39941, 39942, 39946, 39948, 39949, 39950, 39951,
          39952, 39953, 39954, 39955, 39956, 39957, 39958, 39959, 39960, 39961,
          39962, 39964, 39965, 39966, 39967, 39968, 39969, 39970, 39971, 39972,
          39973, 39974, 39975, 39976, 39977, 39980, 39981, 39982, 39983, 39988,
          39990, 39991, 39994, 41914, 41915, 41916, 41917, 41918, 41922, 41923,
          41924, 41925, 41926, 41927, 41928, 41930, 41931, 41932, 41934, 41935,
          41936, 41937, 41938, 41939, 41941, 41942, 41943, 41944, 41945, 41946,
          42663, 42664, 42665, 42666, 42667, 42669, 42670, 42672, 42673, 42674,
          42675, 42676, 42678, 42679, 42680, 42681, 43220, 43221, 43223, 43224,
          43225, 43226, 43227, 43228, 43229, 43230, 43231, 43232, 43233, 43234,
          43236, 43237, 43238, 43239, 43240, 43241, 44051, 44052, 44054, 44055,
          44056, 44057, 44058, 44059, 44060, 44061, 44065, 44066, 44068, 44069,
          44070, 44071, 44072, 44073, 44074, 44075, 44076, 44077, 44078, 44079,
          44081, 44082, 44083, 44084, 44085, 44086, 44087, 44088, 44089, 44090,
          44091, 44092, 44093, 44094, 45773, 45774, 45775, 45776, 45777, 45778,
          45779, 45781, 45783, 45784, 45785, 45786, 46015, 46016, 46017, 46019,
          46020, 46021, 46022, 46023, 46024, 46025, 46026, 46027, 46028, 46029,
          46030, 46031, 46032, 46033, 46034, 46035, 46036, 46037, 46039, 46040,
          46041, 46042, 46043, 47266, 47267, 47268, 47270, 47271, 47272, 47273,
        ],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
    ],
  },
  {
    datetime: "2022-12-17",
    active: {
      1: {
        stat: 0,
      },
      2: {
        stat: 0,
      },
      3: {
        stat: 0,
      },
      4: {
        stat: 0,
      },
      5: {
        stat: 0,
      },
    },
    inactive: 100,
    status: [
      {
        count: 400,
        "vehicle_list ": [
          36409, 36411, 36412, 36413, 36414, 36416, 36417, 36418, 36419, 36420,
          36421, 36422, 36423, 36424, 36425, 36426, 36427, 36429, 36430, 36431,
          36432, 36433, 36434, 36435, 36436, 36440, 36441, 36443, 36444, 36445,
          36446, 36768, 36769, 36770, 36771, 36772, 36773, 36774, 36775, 36776,
          36777, 36778, 36779, 36780, 36781, 36782, 36783, 36784, 36785, 36786,
          36788, 36789, 36790, 36791, 36792, 36793, 36794, 36796, 36797, 36798,
          36799, 36800, 36801, 36802, 36803, 36804, 36805, 36806, 36808, 36809,
          36810, 36811, 36812, 36813, 36814, 36815, 36816, 37307, 37308, 37309,
          37310, 37311, 37312, 37313, 37314, 37315, 37316, 37317, 37318, 37319,
          37320, 37321, 37322, 37323, 37324, 37325, 37326, 37327, 37328, 37329,
          37330, 37331, 37333, 37334, 37335, 37336, 37337, 37338, 37339, 37341,
          37342, 37343, 37344, 37345, 37346, 37347, 37348, 37349, 37350, 37351,
          37352, 37353, 37354, 37355, 37356, 37357, 37359, 37360, 37362, 37363,
          37364, 37365, 37366, 37367, 37368, 37369, 37370, 37371, 37373, 37374,
          37375, 37376, 37377, 37378, 37380, 37381, 37383, 37967, 37968, 37969,
          37970, 38538, 38539, 38541, 38542, 38544, 38545, 38546, 38547, 38548,
          38549, 38550, 38551, 38552, 38554, 38555, 38556, 38557, 38558, 38559,
          38560, 38562, 38564, 39897, 39898, 39899, 39900, 39901, 39902, 39904,
          39905, 39906, 39907, 39908, 39909, 39910, 39911, 39912, 39913, 39914,
          39915, 39916, 39918, 39919, 39920, 39921, 39922, 39923, 39925, 39927,
          39928, 39929, 39930, 39931, 39932, 39933, 39934, 39935, 39936, 39937,
          39938, 39939, 39940, 39941, 39942, 39946, 39948, 39949, 39950, 39951,
          39952, 39953, 39954, 39955, 39956, 39957, 39958, 39959, 39960, 39961,
          39962, 39964, 39965, 39966, 39967, 39968, 39969, 39970, 39971, 39972,
          39973, 39974, 39975, 39976, 39977, 39980, 39981, 39982, 39983, 39988,
          39990, 39991, 39994, 41914, 41915, 41916, 41917, 41918, 41922, 41923,
          41924, 41925, 41926, 41927, 41928, 41930, 41931, 41932, 41934, 41935,
          41936, 41937, 41938, 41939, 41941, 41942, 41943, 41944, 41945, 41946,
          42663, 42664, 42665, 42666, 42667, 42669, 42670, 42672, 42673, 42674,
          42675, 42676, 42678, 42679, 42680, 42681, 43220, 43221, 43223, 43224,
          43225, 43226, 43227, 43228, 43229, 43230, 43231, 43232, 43233, 43234,
          43236, 43237, 43238, 43239, 43240, 43241, 44051, 44052, 44054, 44055,
          44056, 44057, 44058, 44059, 44060, 44061, 44065, 44066, 44068, 44069,
          44070, 44071, 44072, 44073, 44074, 44075, 44076, 44077, 44078, 44079,
          44081, 44082, 44083, 44084, 44085, 44086, 44087, 44088, 44089, 44090,
          44091, 44092, 44093, 44094, 45773, 45774, 45775, 45776, 45777, 45778,
          45779, 45781, 45783, 45784, 45785, 45786, 46015, 46016, 46017, 46019,
          46020, 46021, 46022, 46023, 46024, 46025, 46026, 46027, 46028, 46029,
          46030, 46031, 46032, 46033, 46034, 46035, 46036, 46037, 46039, 46040,
          46041, 46042, 46043, 47266, 47267, 47268, 47270, 47271, 47272, 47273,
        ],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
    ],
  },
  {
    datetime: "2022-12-18",
    active: {
      1: {
        stat: 0,
      },
      2: {
        stat: 0,
      },
      3: {
        stat: 0,
      },
      4: {
        stat: 0,
      },
      5: {
        stat: 0,
      },
    },
    inactive: 100,
    status: [
      {
        count: 400,
        "vehicle_list ": [
          36409, 36411, 36412, 36413, 36414, 36416, 36417, 36418, 36419, 36420,
          36421, 36422, 36423, 36424, 36425, 36426, 36427, 36429, 36430, 36431,
          36432, 36433, 36434, 36435, 36436, 36440, 36441, 36443, 36444, 36445,
          36446, 36768, 36769, 36770, 36771, 36772, 36773, 36774, 36775, 36776,
          36777, 36778, 36779, 36780, 36781, 36782, 36783, 36784, 36785, 36786,
          36788, 36789, 36790, 36791, 36792, 36793, 36794, 36796, 36797, 36798,
          36799, 36800, 36801, 36802, 36803, 36804, 36805, 36806, 36808, 36809,
          36810, 36811, 36812, 36813, 36814, 36815, 36816, 37307, 37308, 37309,
          37310, 37311, 37312, 37313, 37314, 37315, 37316, 37317, 37318, 37319,
          37320, 37321, 37322, 37323, 37324, 37325, 37326, 37327, 37328, 37329,
          37330, 37331, 37333, 37334, 37335, 37336, 37337, 37338, 37339, 37341,
          37342, 37343, 37344, 37345, 37346, 37347, 37348, 37349, 37350, 37351,
          37352, 37353, 37354, 37355, 37356, 37357, 37359, 37360, 37362, 37363,
          37364, 37365, 37366, 37367, 37368, 37369, 37370, 37371, 37373, 37374,
          37375, 37376, 37377, 37378, 37380, 37381, 37383, 37967, 37968, 37969,
          37970, 38538, 38539, 38541, 38542, 38544, 38545, 38546, 38547, 38548,
          38549, 38550, 38551, 38552, 38554, 38555, 38556, 38557, 38558, 38559,
          38560, 38562, 38564, 39897, 39898, 39899, 39900, 39901, 39902, 39904,
          39905, 39906, 39907, 39908, 39909, 39910, 39911, 39912, 39913, 39914,
          39915, 39916, 39918, 39919, 39920, 39921, 39922, 39923, 39925, 39927,
          39928, 39929, 39930, 39931, 39932, 39933, 39934, 39935, 39936, 39937,
          39938, 39939, 39940, 39941, 39942, 39946, 39948, 39949, 39950, 39951,
          39952, 39953, 39954, 39955, 39956, 39957, 39958, 39959, 39960, 39961,
          39962, 39964, 39965, 39966, 39967, 39968, 39969, 39970, 39971, 39972,
          39973, 39974, 39975, 39976, 39977, 39980, 39981, 39982, 39983, 39988,
          39990, 39991, 39994, 41914, 41915, 41916, 41917, 41918, 41922, 41923,
          41924, 41925, 41926, 41927, 41928, 41930, 41931, 41932, 41934, 41935,
          41936, 41937, 41938, 41939, 41941, 41942, 41943, 41944, 41945, 41946,
          42663, 42664, 42665, 42666, 42667, 42669, 42670, 42672, 42673, 42674,
          42675, 42676, 42678, 42679, 42680, 42681, 43220, 43221, 43223, 43224,
          43225, 43226, 43227, 43228, 43229, 43230, 43231, 43232, 43233, 43234,
          43236, 43237, 43238, 43239, 43240, 43241, 44051, 44052, 44054, 44055,
          44056, 44057, 44058, 44059, 44060, 44061, 44065, 44066, 44068, 44069,
          44070, 44071, 44072, 44073, 44074, 44075, 44076, 44077, 44078, 44079,
          44081, 44082, 44083, 44084, 44085, 44086, 44087, 44088, 44089, 44090,
          44091, 44092, 44093, 44094, 45773, 45774, 45775, 45776, 45777, 45778,
          45779, 45781, 45783, 45784, 45785, 45786, 46015, 46016, 46017, 46019,
          46020, 46021, 46022, 46023, 46024, 46025, 46026, 46027, 46028, 46029,
          46030, 46031, 46032, 46033, 46034, 46035, 46036, 46037, 46039, 46040,
          46041, 46042, 46043, 47266, 47267, 47268, 47270, 47271, 47272, 47273,
        ],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
    ],
  },
  {
    datetime: "2022-12-19",
    active: {
      1: {
        stat: 0,
      },
      2: {
        stat: 0,
      },
      3: {
        stat: 0,
      },
      4: {
        stat: 0,
      },
      5: {
        stat: 0,
      },
    },
    inactive: 100,
    status: [
      {
        count: 400,
        "vehicle_list ": [
          36409, 36411, 36412, 36413, 36414, 36416, 36417, 36418, 36419, 36420,
          36421, 36422, 36423, 36424, 36425, 36426, 36427, 36429, 36430, 36431,
          36432, 36433, 36434, 36435, 36436, 36440, 36441, 36443, 36444, 36445,
          36446, 36768, 36769, 36770, 36771, 36772, 36773, 36774, 36775, 36776,
          36777, 36778, 36779, 36780, 36781, 36782, 36783, 36784, 36785, 36786,
          36788, 36789, 36790, 36791, 36792, 36793, 36794, 36796, 36797, 36798,
          36799, 36800, 36801, 36802, 36803, 36804, 36805, 36806, 36808, 36809,
          36810, 36811, 36812, 36813, 36814, 36815, 36816, 37307, 37308, 37309,
          37310, 37311, 37312, 37313, 37314, 37315, 37316, 37317, 37318, 37319,
          37320, 37321, 37322, 37323, 37324, 37325, 37326, 37327, 37328, 37329,
          37330, 37331, 37333, 37334, 37335, 37336, 37337, 37338, 37339, 37341,
          37342, 37343, 37344, 37345, 37346, 37347, 37348, 37349, 37350, 37351,
          37352, 37353, 37354, 37355, 37356, 37357, 37359, 37360, 37362, 37363,
          37364, 37365, 37366, 37367, 37368, 37369, 37370, 37371, 37373, 37374,
          37375, 37376, 37377, 37378, 37380, 37381, 37383, 37967, 37968, 37969,
          37970, 38538, 38539, 38541, 38542, 38544, 38545, 38546, 38547, 38548,
          38549, 38550, 38551, 38552, 38554, 38555, 38556, 38557, 38558, 38559,
          38560, 38562, 38564, 39897, 39898, 39899, 39900, 39901, 39902, 39904,
          39905, 39906, 39907, 39908, 39909, 39910, 39911, 39912, 39913, 39914,
          39915, 39916, 39918, 39919, 39920, 39921, 39922, 39923, 39925, 39927,
          39928, 39929, 39930, 39931, 39932, 39933, 39934, 39935, 39936, 39937,
          39938, 39939, 39940, 39941, 39942, 39946, 39948, 39949, 39950, 39951,
          39952, 39953, 39954, 39955, 39956, 39957, 39958, 39959, 39960, 39961,
          39962, 39964, 39965, 39966, 39967, 39968, 39969, 39970, 39971, 39972,
          39973, 39974, 39975, 39976, 39977, 39980, 39981, 39982, 39983, 39988,
          39990, 39991, 39994, 41914, 41915, 41916, 41917, 41918, 41922, 41923,
          41924, 41925, 41926, 41927, 41928, 41930, 41931, 41932, 41934, 41935,
          41936, 41937, 41938, 41939, 41941, 41942, 41943, 41944, 41945, 41946,
          42663, 42664, 42665, 42666, 42667, 42669, 42670, 42672, 42673, 42674,
          42675, 42676, 42678, 42679, 42680, 42681, 43220, 43221, 43223, 43224,
          43225, 43226, 43227, 43228, 43229, 43230, 43231, 43232, 43233, 43234,
          43236, 43237, 43238, 43239, 43240, 43241, 44051, 44052, 44054, 44055,
          44056, 44057, 44058, 44059, 44060, 44061, 44065, 44066, 44068, 44069,
          44070, 44071, 44072, 44073, 44074, 44075, 44076, 44077, 44078, 44079,
          44081, 44082, 44083, 44084, 44085, 44086, 44087, 44088, 44089, 44090,
          44091, 44092, 44093, 44094, 45773, 45774, 45775, 45776, 45777, 45778,
          45779, 45781, 45783, 45784, 45785, 45786, 46015, 46016, 46017, 46019,
          46020, 46021, 46022, 46023, 46024, 46025, 46026, 46027, 46028, 46029,
          46030, 46031, 46032, 46033, 46034, 46035, 46036, 46037, 46039, 46040,
          46041, 46042, 46043, 47266, 47267, 47268, 47270, 47271, 47272, 47273,
        ],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
    ],
  },
  {
    datetime: "2022-12-20",
    active: {
      1: {
        stat: 0,
      },
      2: {
        stat: 0,
      },
      3: {
        stat: 0,
      },
      4: {
        stat: 0,
      },
      5: {
        stat: 0,
      },
    },
    inactive: 100,
    status: [
      {
        count: 399,
        "vehicle_list ": [
          36409, 36411, 36412, 36413, 36414, 36416, 36417, 36418, 36419, 36420,
          36421, 36422, 36423, 36424, 36425, 36426, 36427, 36429, 36430, 36431,
          36432, 36433, 36434, 36435, 36436, 36440, 36441, 36443, 36444, 36445,
          36446, 36768, 36769, 36770, 36771, 36772, 36773, 36774, 36775, 36776,
          36777, 36778, 36779, 36780, 36781, 36782, 36783, 36784, 36785, 36786,
          36788, 36789, 36790, 36791, 36792, 36793, 36794, 36796, 36797, 36798,
          36799, 36800, 36801, 36802, 36803, 36804, 36805, 36806, 36808, 36809,
          36810, 36811, 36812, 36813, 36814, 36815, 36816, 37307, 37308, 37309,
          37310, 37311, 37312, 37313, 37314, 37315, 37316, 37317, 37318, 37319,
          37320, 37321, 37322, 37323, 37324, 37325, 37326, 37327, 37328, 37329,
          37330, 37331, 37333, 37334, 37335, 37336, 37337, 37338, 37339, 37341,
          37342, 37343, 37344, 37345, 37346, 37347, 37348, 37349, 37350, 37351,
          37352, 37353, 37354, 37355, 37356, 37357, 37359, 37360, 37362, 37363,
          37364, 37365, 37366, 37367, 37368, 37369, 37370, 37371, 37373, 37374,
          37375, 37376, 37377, 37378, 37380, 37381, 37383, 37967, 37968, 37969,
          37970, 38538, 38539, 38541, 38542, 38544, 38545, 38546, 38547, 38548,
          38549, 38550, 38551, 38552, 38554, 38555, 38556, 38557, 38558, 38559,
          38560, 38562, 38564, 39897, 39898, 39899, 39900, 39901, 39902, 39904,
          39905, 39906, 39907, 39908, 39909, 39910, 39911, 39912, 39913, 39914,
          39915, 39916, 39918, 39919, 39920, 39921, 39922, 39923, 39925, 39927,
          39928, 39929, 39930, 39931, 39932, 39933, 39934, 39935, 39936, 39937,
          39938, 39939, 39940, 39941, 39942, 39946, 39948, 39949, 39950, 39951,
          39952, 39953, 39954, 39955, 39956, 39957, 39958, 39959, 39960, 39961,
          39962, 39964, 39965, 39966, 39967, 39968, 39969, 39970, 39971, 39972,
          39973, 39974, 39975, 39976, 39977, 39980, 39981, 39982, 39983, 39988,
          39990, 39991, 39994, 41914, 41915, 41916, 41917, 41918, 41922, 41923,
          41924, 41925, 41926, 41927, 41928, 41930, 41931, 41932, 41934, 41935,
          41936, 41937, 41938, 41939, 41941, 41942, 41943, 41944, 41945, 41946,
          42663, 42664, 42665, 42667, 42669, 42670, 42672, 42673, 42674, 42675,
          42676, 42678, 42679, 42680, 42681, 43220, 43221, 43223, 43224, 43225,
          43226, 43227, 43228, 43229, 43230, 43231, 43232, 43233, 43234, 43236,
          43237, 43238, 43239, 43240, 43241, 44051, 44052, 44054, 44055, 44056,
          44057, 44058, 44059, 44060, 44061, 44065, 44066, 44068, 44069, 44070,
          44071, 44072, 44073, 44074, 44075, 44076, 44077, 44078, 44079, 44081,
          44082, 44083, 44084, 44085, 44086, 44087, 44088, 44089, 44090, 44091,
          44092, 44093, 44094, 45773, 45774, 45775, 45776, 45777, 45778, 45779,
          45781, 45783, 45784, 45785, 45786, 46015, 46016, 46017, 46019, 46020,
          46021, 46022, 46023, 46024, 46025, 46026, 46027, 46028, 46029, 46030,
          46031, 46032, 46033, 46034, 46035, 46036, 46037, 46039, 46040, 46041,
          46042, 46043, 47266, 47267, 47268, 47270, 47271, 47272, 47273,
        ],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 1,
        "vehicle_list ": [42666],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
    ],
  },
  {
    datetime: "2022-12-21",
    active: {
      1: {
        stat: 3,
      },
      2: {
        stat: 3,
      },
      3: {
        stat: 3,
      },
      4: {
        stat: 3,
      },
      5: {
        stat: 2,
      },
    },
    inactive: 86,
    status: [
      {
        count: 335,
        "vehicle_list ": [
          36409, 36411, 36412, 36413, 36414, 36416, 36417, 36418, 36419, 36420,
          36421, 36422, 36423, 36424, 36426, 36427, 36429, 36430, 36431, 36432,
          36433, 36434, 36436, 36440, 36441, 36443, 36444, 36445, 36446, 36768,
          36769, 36770, 36771, 36773, 36774, 36775, 36777, 36778, 36779, 36780,
          36781, 36782, 36783, 36784, 36786, 36788, 36789, 36790, 36791, 36792,
          36793, 36794, 36796, 36797, 36798, 36799, 36800, 36801, 36802, 36803,
          36804, 36811, 36813, 36814, 36816, 37307, 37308, 37309, 37310, 37311,
          37312, 37313, 37314, 37315, 37317, 37318, 37319, 37321, 37322, 37323,
          37324, 37325, 37326, 37327, 37329, 37330, 37331, 37335, 37336, 37337,
          37338, 37339, 37341, 37342, 37343, 37344, 37345, 37346, 37347, 37348,
          37349, 37350, 37352, 37353, 37354, 37356, 37357, 37359, 37360, 37362,
          37363, 37364, 37365, 37368, 37369, 37370, 37371, 37373, 37374, 37375,
          37376, 37377, 37380, 37381, 37383, 37967, 37968, 37969, 37970, 38538,
          38539, 38541, 38542, 38545, 38547, 38548, 38549, 38551, 38554, 38555,
          38556, 38558, 38559, 38560, 38562, 38564, 39897, 39899, 39901, 39904,
          39905, 39907, 39908, 39909, 39910, 39911, 39912, 39913, 39914, 39915,
          39916, 39918, 39919, 39920, 39921, 39922, 39923, 39925, 39928, 39930,
          39931, 39933, 39934, 39935, 39936, 39937, 39938, 39939, 39940, 39941,
          39942, 39948, 39949, 39950, 39951, 39952, 39953, 39954, 39955, 39956,
          39957, 39958, 39960, 39961, 39962, 39964, 39965, 39966, 39967, 39968,
          39969, 39971, 39972, 39973, 39974, 39975, 39976, 39977, 39980, 39981,
          39982, 39983, 39988, 39991, 39994, 41914, 41915, 41916, 41918, 41923,
          41924, 41925, 41926, 41927, 41928, 41931, 41934, 41936, 41937, 41938,
          41939, 41941, 41942, 41943, 41945, 41946, 42663, 42664, 42665, 42666,
          42667, 42669, 42670, 42673, 42674, 42675, 42676, 42678, 42679, 42680,
          42681, 43220, 43221, 43224, 43225, 43226, 43229, 43230, 43231, 43232,
          43233, 43234, 43236, 43239, 43241, 44051, 44054, 44055, 44057, 44058,
          44059, 44060, 44061, 44066, 44069, 44070, 44071, 44072, 44073, 44074,
          44075, 44076, 44077, 44079, 44081, 44082, 44084, 44085, 44086, 44088,
          44089, 44090, 44091, 44092, 44093, 44094, 45773, 45774, 45775, 45776,
          45777, 45779, 45781, 45783, 45784, 45785, 45786, 46015, 46016, 46021,
          46022, 46023, 46024, 46025, 46026, 46027, 46028, 46029, 46030, 46031,
          46032, 46034, 46035, 46036, 46037, 46040, 46041, 46042, 47266, 47267,
          47268, 47270, 47271, 47272, 47273,
        ],
      },
      {
        count: 14,
        "vehicle_list ": [
          36425, 36772, 36812, 38546, 39906, 39959, 41922, 43223, 43227, 44052,
          44056, 44083, 46017, 46043,
        ],
      },
      {
        count: 15,
        "vehicle_list ": [
          36785, 36808, 36809, 36815, 37316, 37320, 37355, 37367, 38552, 38557,
          39946, 39990, 41917, 41932, 46039,
        ],
      },
      {
        count: 13,
        "vehicle_list ": [
          36776, 37366, 38544, 39900, 39902, 39927, 39932, 41935, 43228, 43237,
          44065, 45778, 46019,
        ],
      },
      {
        count: 14,
        "vehicle_list ": [
          36435, 36810, 37328, 37333, 37334, 38550, 39898, 41944, 42672, 43238,
          43240, 44087, 46020, 46033,
        ],
      },
      {
        count: 9,
        "vehicle_list ": [
          36805, 36806, 37351, 37378, 39929, 39970, 41930, 44068, 44078,
        ],
      },
    ],
  },
  {
    datetime: "2022-12-22",
    active: {
      1: {
        stat: 6,
      },
      2: {
        stat: 6,
      },
      3: {
        stat: 0,
      },
      4: {
        stat: 0,
      },
      5: {
        stat: 0,
      },
    },
    inactive: 88,
    status: [
      {
        count: 341,
        "vehicle_list ": [
          36409, 36411, 36412, 36413, 36414, 36416, 36418, 36419, 36420, 36421,
          36422, 36423, 36424, 36425, 36426, 36427, 36429, 36430, 36431, 36432,
          36433, 36434, 36440, 36441, 36443, 36444, 36445, 36768, 36769, 36770,
          36771, 36772, 36773, 36774, 36775, 36777, 36778, 36779, 36780, 36781,
          36782, 36783, 36784, 36785, 36786, 36788, 36789, 36790, 36791, 36792,
          36793, 36794, 36796, 36798, 36799, 36800, 36801, 36802, 36803, 36804,
          36805, 36811, 36813, 36814, 36816, 37307, 37308, 37309, 37310, 37311,
          37312, 37313, 37314, 37315, 37317, 37318, 37319, 37320, 37321, 37322,
          37323, 37324, 37325, 37326, 37327, 37329, 37330, 37331, 37333, 37335,
          37336, 37338, 37339, 37342, 37343, 37344, 37345, 37346, 37347, 37348,
          37349, 37350, 37352, 37354, 37356, 37357, 37360, 37362, 37363, 37364,
          37365, 37368, 37369, 37370, 37371, 37373, 37375, 37376, 37377, 37378,
          37381, 37383, 37967, 37968, 37969, 37970, 38538, 38539, 38541, 38542,
          38544, 38545, 38546, 38547, 38548, 38549, 38550, 38551, 38552, 38554,
          38555, 38556, 38558, 38559, 38560, 38562, 38564, 39897, 39898, 39899,
          39901, 39904, 39905, 39906, 39907, 39908, 39909, 39910, 39911, 39912,
          39913, 39914, 39915, 39916, 39918, 39919, 39920, 39921, 39923, 39925,
          39928, 39930, 39931, 39933, 39934, 39935, 39936, 39937, 39938, 39939,
          39940, 39941, 39942, 39948, 39949, 39950, 39951, 39952, 39953, 39954,
          39955, 39956, 39957, 39958, 39959, 39960, 39962, 39964, 39965, 39966,
          39967, 39968, 39969, 39970, 39971, 39972, 39973, 39974, 39975, 39976,
          39977, 39980, 39981, 39982, 39983, 39988, 39991, 39994, 41914, 41915,
          41916, 41918, 41923, 41924, 41925, 41926, 41927, 41928, 41930, 41931,
          41934, 41935, 41936, 41937, 41938, 41939, 41941, 41942, 41943, 41945,
          41946, 42663, 42664, 42665, 42667, 42669, 42670, 42673, 42674, 42675,
          42676, 42678, 42679, 42680, 42681, 43220, 43221, 43223, 43224, 43225,
          43227, 43229, 43230, 43231, 43232, 43233, 43234, 43236, 43237, 43239,
          43241, 44051, 44052, 44054, 44055, 44057, 44058, 44059, 44060, 44061,
          44066, 44069, 44070, 44071, 44072, 44074, 44075, 44076, 44077, 44079,
          44081, 44082, 44083, 44084, 44085, 44086, 44087, 44088, 44089, 44090,
          44091, 44092, 44093, 44094, 45773, 45774, 45775, 45776, 45779, 45781,
          45783, 45784, 45785, 45786, 46015, 46016, 46017, 46021, 46023, 46024,
          46025, 46026, 46027, 46028, 46029, 46030, 46031, 46032, 46034, 46035,
          46036, 46037, 46040, 46042, 47266, 47267, 47268, 47270, 47271, 47272,
          47273,
        ],
      },
      {
        count: 29,
        "vehicle_list ": [
          36436, 36776, 36812, 37316, 37328, 37337, 37341, 37351, 37355, 37359,
          37366, 37367, 37374, 38557, 39900, 39922, 39932, 39961, 39990, 41917,
          41922, 41944, 42666, 43226, 43228, 44065, 44068, 44078, 46041,
        ],
      },
      {
        count: 29,
        "vehicle_list ": [
          36417, 36435, 36446, 36797, 36806, 36808, 36809, 36810, 36815, 37334,
          37353, 37380, 39902, 39927, 39929, 39946, 42672, 43238, 43240, 44056,
          44073, 45777, 45778, 46019, 46020, 46022, 46033, 46039, 46043,
        ],
      },
      {
        count: 1,
        "vehicle_list ": [41932],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
    ],
  },
  {
    datetime: "2022-12-23",
    active: {
      1: {
        stat: 0,
      },
      2: {
        stat: 0,
      },
      3: {
        stat: 0,
      },
      4: {
        stat: 0,
      },
      5: {
        stat: 0,
      },
    },
    inactive: 100,
    status: [
      {
        count: 400,
        "vehicle_list ": [
          36409, 36411, 36412, 36413, 36414, 36416, 36417, 36418, 36419, 36420,
          36421, 36422, 36423, 36424, 36425, 36426, 36427, 36429, 36430, 36431,
          36432, 36433, 36434, 36435, 36436, 36440, 36441, 36443, 36444, 36445,
          36446, 36768, 36769, 36770, 36771, 36772, 36773, 36774, 36775, 36776,
          36777, 36778, 36779, 36780, 36781, 36782, 36783, 36784, 36785, 36786,
          36788, 36789, 36790, 36791, 36792, 36793, 36794, 36796, 36797, 36798,
          36799, 36800, 36801, 36802, 36803, 36804, 36805, 36806, 36808, 36809,
          36810, 36811, 36812, 36813, 36814, 36815, 36816, 37307, 37308, 37309,
          37310, 37311, 37312, 37313, 37314, 37315, 37316, 37317, 37318, 37319,
          37320, 37321, 37322, 37323, 37324, 37325, 37326, 37327, 37328, 37329,
          37330, 37331, 37333, 37334, 37335, 37336, 37337, 37338, 37339, 37341,
          37342, 37343, 37344, 37345, 37346, 37347, 37348, 37349, 37350, 37351,
          37352, 37353, 37354, 37355, 37356, 37357, 37359, 37360, 37362, 37363,
          37364, 37365, 37366, 37367, 37368, 37369, 37370, 37371, 37373, 37374,
          37375, 37376, 37377, 37378, 37380, 37381, 37383, 37967, 37968, 37969,
          37970, 38538, 38539, 38541, 38542, 38544, 38545, 38546, 38547, 38548,
          38549, 38550, 38551, 38552, 38554, 38555, 38556, 38557, 38558, 38559,
          38560, 38562, 38564, 39897, 39898, 39899, 39900, 39901, 39902, 39904,
          39905, 39906, 39907, 39908, 39909, 39910, 39911, 39912, 39913, 39914,
          39915, 39916, 39918, 39919, 39920, 39921, 39922, 39923, 39925, 39927,
          39928, 39929, 39930, 39931, 39932, 39933, 39934, 39935, 39936, 39937,
          39938, 39939, 39940, 39941, 39942, 39946, 39948, 39949, 39950, 39951,
          39952, 39953, 39954, 39955, 39956, 39957, 39958, 39959, 39960, 39961,
          39962, 39964, 39965, 39966, 39967, 39968, 39969, 39970, 39971, 39972,
          39973, 39974, 39975, 39976, 39977, 39980, 39981, 39982, 39983, 39988,
          39990, 39991, 39994, 41914, 41915, 41916, 41917, 41918, 41922, 41923,
          41924, 41925, 41926, 41927, 41928, 41930, 41931, 41932, 41934, 41935,
          41936, 41937, 41938, 41939, 41941, 41942, 41943, 41944, 41945, 41946,
          42663, 42664, 42665, 42666, 42667, 42669, 42670, 42672, 42673, 42674,
          42675, 42676, 42678, 42679, 42680, 42681, 43220, 43221, 43223, 43224,
          43225, 43226, 43227, 43228, 43229, 43230, 43231, 43232, 43233, 43234,
          43236, 43237, 43238, 43239, 43240, 43241, 44051, 44052, 44054, 44055,
          44056, 44057, 44058, 44059, 44060, 44061, 44065, 44066, 44068, 44069,
          44070, 44071, 44072, 44073, 44074, 44075, 44076, 44077, 44078, 44079,
          44081, 44082, 44083, 44084, 44085, 44086, 44087, 44088, 44089, 44090,
          44091, 44092, 44093, 44094, 45773, 45774, 45775, 45776, 45777, 45778,
          45779, 45781, 45783, 45784, 45785, 45786, 46015, 46016, 46017, 46019,
          46020, 46021, 46022, 46023, 46024, 46025, 46026, 46027, 46028, 46029,
          46030, 46031, 46032, 46033, 46034, 46035, 46036, 46037, 46039, 46040,
          46041, 46042, 46043, 47266, 47267, 47268, 47270, 47271, 47272, 47273,
        ],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
    ],
  },
  {
    datetime: "2022-12-24",
    active: {
      1: {
        stat: 0,
      },
      2: {
        stat: 0,
      },
      3: {
        stat: 0,
      },
      4: {
        stat: 0,
      },
      5: {
        stat: 0,
      },
    },
    inactive: 100,
    status: [
      {
        count: 400,
        "vehicle_list ": [
          36409, 36411, 36412, 36413, 36414, 36416, 36417, 36418, 36419, 36420,
          36421, 36422, 36423, 36424, 36425, 36426, 36427, 36429, 36430, 36431,
          36432, 36433, 36434, 36435, 36436, 36440, 36441, 36443, 36444, 36445,
          36446, 36768, 36769, 36770, 36771, 36772, 36773, 36774, 36775, 36776,
          36777, 36778, 36779, 36780, 36781, 36782, 36783, 36784, 36785, 36786,
          36788, 36789, 36790, 36791, 36792, 36793, 36794, 36796, 36797, 36798,
          36799, 36800, 36801, 36802, 36803, 36804, 36805, 36806, 36808, 36809,
          36810, 36811, 36812, 36813, 36814, 36815, 36816, 37307, 37308, 37309,
          37310, 37311, 37312, 37313, 37314, 37315, 37316, 37317, 37318, 37319,
          37320, 37321, 37322, 37323, 37324, 37325, 37326, 37327, 37328, 37329,
          37330, 37331, 37333, 37334, 37335, 37336, 37337, 37338, 37339, 37341,
          37342, 37343, 37344, 37345, 37346, 37347, 37348, 37349, 37350, 37351,
          37352, 37353, 37354, 37355, 37356, 37357, 37359, 37360, 37362, 37363,
          37364, 37365, 37366, 37367, 37368, 37369, 37370, 37371, 37373, 37374,
          37375, 37376, 37377, 37378, 37380, 37381, 37383, 37967, 37968, 37969,
          37970, 38538, 38539, 38541, 38542, 38544, 38545, 38546, 38547, 38548,
          38549, 38550, 38551, 38552, 38554, 38555, 38556, 38557, 38558, 38559,
          38560, 38562, 38564, 39897, 39898, 39899, 39900, 39901, 39902, 39904,
          39905, 39906, 39907, 39908, 39909, 39910, 39911, 39912, 39913, 39914,
          39915, 39916, 39918, 39919, 39920, 39921, 39922, 39923, 39925, 39927,
          39928, 39929, 39930, 39931, 39932, 39933, 39934, 39935, 39936, 39937,
          39938, 39939, 39940, 39941, 39942, 39946, 39948, 39949, 39950, 39951,
          39952, 39953, 39954, 39955, 39956, 39957, 39958, 39959, 39960, 39961,
          39962, 39964, 39965, 39966, 39967, 39968, 39969, 39970, 39971, 39972,
          39973, 39974, 39975, 39976, 39977, 39980, 39981, 39982, 39983, 39988,
          39990, 39991, 39994, 41914, 41915, 41916, 41917, 41918, 41922, 41923,
          41924, 41925, 41926, 41927, 41928, 41930, 41931, 41932, 41934, 41935,
          41936, 41937, 41938, 41939, 41941, 41942, 41943, 41944, 41945, 41946,
          42663, 42664, 42665, 42666, 42667, 42669, 42670, 42672, 42673, 42674,
          42675, 42676, 42678, 42679, 42680, 42681, 43220, 43221, 43223, 43224,
          43225, 43226, 43227, 43228, 43229, 43230, 43231, 43232, 43233, 43234,
          43236, 43237, 43238, 43239, 43240, 43241, 44051, 44052, 44054, 44055,
          44056, 44057, 44058, 44059, 44060, 44061, 44065, 44066, 44068, 44069,
          44070, 44071, 44072, 44073, 44074, 44075, 44076, 44077, 44078, 44079,
          44081, 44082, 44083, 44084, 44085, 44086, 44087, 44088, 44089, 44090,
          44091, 44092, 44093, 44094, 45773, 45774, 45775, 45776, 45777, 45778,
          45779, 45781, 45783, 45784, 45785, 45786, 46015, 46016, 46017, 46019,
          46020, 46021, 46022, 46023, 46024, 46025, 46026, 46027, 46028, 46029,
          46030, 46031, 46032, 46033, 46034, 46035, 46036, 46037, 46039, 46040,
          46041, 46042, 46043, 47266, 47267, 47268, 47270, 47271, 47272, 47273,
        ],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
    ],
  },
  {
    datetime: "2022-12-25",
    active: {
      1: {
        stat: 0,
      },
      2: {
        stat: 0,
      },
      3: {
        stat: 0,
      },
      4: {
        stat: 0,
      },
      5: {
        stat: 0,
      },
    },
    inactive: 100,
    status: [
      {
        count: 400,
        "vehicle_list ": [
          36409, 36411, 36412, 36413, 36414, 36416, 36417, 36418, 36419, 36420,
          36421, 36422, 36423, 36424, 36425, 36426, 36427, 36429, 36430, 36431,
          36432, 36433, 36434, 36435, 36436, 36440, 36441, 36443, 36444, 36445,
          36446, 36768, 36769, 36770, 36771, 36772, 36773, 36774, 36775, 36776,
          36777, 36778, 36779, 36780, 36781, 36782, 36783, 36784, 36785, 36786,
          36788, 36789, 36790, 36791, 36792, 36793, 36794, 36796, 36797, 36798,
          36799, 36800, 36801, 36802, 36803, 36804, 36805, 36806, 36808, 36809,
          36810, 36811, 36812, 36813, 36814, 36815, 36816, 37307, 37308, 37309,
          37310, 37311, 37312, 37313, 37314, 37315, 37316, 37317, 37318, 37319,
          37320, 37321, 37322, 37323, 37324, 37325, 37326, 37327, 37328, 37329,
          37330, 37331, 37333, 37334, 37335, 37336, 37337, 37338, 37339, 37341,
          37342, 37343, 37344, 37345, 37346, 37347, 37348, 37349, 37350, 37351,
          37352, 37353, 37354, 37355, 37356, 37357, 37359, 37360, 37362, 37363,
          37364, 37365, 37366, 37367, 37368, 37369, 37370, 37371, 37373, 37374,
          37375, 37376, 37377, 37378, 37380, 37381, 37383, 37967, 37968, 37969,
          37970, 38538, 38539, 38541, 38542, 38544, 38545, 38546, 38547, 38548,
          38549, 38550, 38551, 38552, 38554, 38555, 38556, 38557, 38558, 38559,
          38560, 38562, 38564, 39897, 39898, 39899, 39900, 39901, 39902, 39904,
          39905, 39906, 39907, 39908, 39909, 39910, 39911, 39912, 39913, 39914,
          39915, 39916, 39918, 39919, 39920, 39921, 39922, 39923, 39925, 39927,
          39928, 39929, 39930, 39931, 39932, 39933, 39934, 39935, 39936, 39937,
          39938, 39939, 39940, 39941, 39942, 39946, 39948, 39949, 39950, 39951,
          39952, 39953, 39954, 39955, 39956, 39957, 39958, 39959, 39960, 39961,
          39962, 39964, 39965, 39966, 39967, 39968, 39969, 39970, 39971, 39972,
          39973, 39974, 39975, 39976, 39977, 39980, 39981, 39982, 39983, 39988,
          39990, 39991, 39994, 41914, 41915, 41916, 41917, 41918, 41922, 41923,
          41924, 41925, 41926, 41927, 41928, 41930, 41931, 41932, 41934, 41935,
          41936, 41937, 41938, 41939, 41941, 41942, 41943, 41944, 41945, 41946,
          42663, 42664, 42665, 42666, 42667, 42669, 42670, 42672, 42673, 42674,
          42675, 42676, 42678, 42679, 42680, 42681, 43220, 43221, 43223, 43224,
          43225, 43226, 43227, 43228, 43229, 43230, 43231, 43232, 43233, 43234,
          43236, 43237, 43238, 43239, 43240, 43241, 44051, 44052, 44054, 44055,
          44056, 44057, 44058, 44059, 44060, 44061, 44065, 44066, 44068, 44069,
          44070, 44071, 44072, 44073, 44074, 44075, 44076, 44077, 44078, 44079,
          44081, 44082, 44083, 44084, 44085, 44086, 44087, 44088, 44089, 44090,
          44091, 44092, 44093, 44094, 45773, 45774, 45775, 45776, 45777, 45778,
          45779, 45781, 45783, 45784, 45785, 45786, 46015, 46016, 46017, 46019,
          46020, 46021, 46022, 46023, 46024, 46025, 46026, 46027, 46028, 46029,
          46030, 46031, 46032, 46033, 46034, 46035, 46036, 46037, 46039, 46040,
          46041, 46042, 46043, 47266, 47267, 47268, 47270, 47271, 47272, 47273,
        ],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
    ],
  },
  {
    datetime: "2022-12-26",
    active: {
      1: {
        stat: 0,
      },
      2: {
        stat: 0,
      },
      3: {
        stat: 0,
      },
      4: {
        stat: 0,
      },
      5: {
        stat: 0,
      },
    },
    inactive: 100,
    status: [
      {
        count: 400,
        "vehicle_list ": [
          36409, 36411, 36412, 36413, 36414, 36416, 36417, 36418, 36419, 36420,
          36421, 36422, 36423, 36424, 36425, 36426, 36427, 36429, 36430, 36431,
          36432, 36433, 36434, 36435, 36436, 36440, 36441, 36443, 36444, 36445,
          36446, 36768, 36769, 36770, 36771, 36772, 36773, 36774, 36775, 36776,
          36777, 36778, 36779, 36780, 36781, 36782, 36783, 36784, 36785, 36786,
          36788, 36789, 36790, 36791, 36792, 36793, 36794, 36796, 36797, 36798,
          36799, 36800, 36801, 36802, 36803, 36804, 36805, 36806, 36808, 36809,
          36810, 36811, 36812, 36813, 36814, 36815, 36816, 37307, 37308, 37309,
          37310, 37311, 37312, 37313, 37314, 37315, 37316, 37317, 37318, 37319,
          37320, 37321, 37322, 37323, 37324, 37325, 37326, 37327, 37328, 37329,
          37330, 37331, 37333, 37334, 37335, 37336, 37337, 37338, 37339, 37341,
          37342, 37343, 37344, 37345, 37346, 37347, 37348, 37349, 37350, 37351,
          37352, 37353, 37354, 37355, 37356, 37357, 37359, 37360, 37362, 37363,
          37364, 37365, 37366, 37367, 37368, 37369, 37370, 37371, 37373, 37374,
          37375, 37376, 37377, 37378, 37380, 37381, 37383, 37967, 37968, 37969,
          37970, 38538, 38539, 38541, 38542, 38544, 38545, 38546, 38547, 38548,
          38549, 38550, 38551, 38552, 38554, 38555, 38556, 38557, 38558, 38559,
          38560, 38562, 38564, 39897, 39898, 39899, 39900, 39901, 39902, 39904,
          39905, 39906, 39907, 39908, 39909, 39910, 39911, 39912, 39913, 39914,
          39915, 39916, 39918, 39919, 39920, 39921, 39922, 39923, 39925, 39927,
          39928, 39929, 39930, 39931, 39932, 39933, 39934, 39935, 39936, 39937,
          39938, 39939, 39940, 39941, 39942, 39946, 39948, 39949, 39950, 39951,
          39952, 39953, 39954, 39955, 39956, 39957, 39958, 39959, 39960, 39961,
          39962, 39964, 39965, 39966, 39967, 39968, 39969, 39970, 39971, 39972,
          39973, 39974, 39975, 39976, 39977, 39980, 39981, 39982, 39983, 39988,
          39990, 39991, 39994, 41914, 41915, 41916, 41917, 41918, 41922, 41923,
          41924, 41925, 41926, 41927, 41928, 41930, 41931, 41932, 41934, 41935,
          41936, 41937, 41938, 41939, 41941, 41942, 41943, 41944, 41945, 41946,
          42663, 42664, 42665, 42666, 42667, 42669, 42670, 42672, 42673, 42674,
          42675, 42676, 42678, 42679, 42680, 42681, 43220, 43221, 43223, 43224,
          43225, 43226, 43227, 43228, 43229, 43230, 43231, 43232, 43233, 43234,
          43236, 43237, 43238, 43239, 43240, 43241, 44051, 44052, 44054, 44055,
          44056, 44057, 44058, 44059, 44060, 44061, 44065, 44066, 44068, 44069,
          44070, 44071, 44072, 44073, 44074, 44075, 44076, 44077, 44078, 44079,
          44081, 44082, 44083, 44084, 44085, 44086, 44087, 44088, 44089, 44090,
          44091, 44092, 44093, 44094, 45773, 45774, 45775, 45776, 45777, 45778,
          45779, 45781, 45783, 45784, 45785, 45786, 46015, 46016, 46017, 46019,
          46020, 46021, 46022, 46023, 46024, 46025, 46026, 46027, 46028, 46029,
          46030, 46031, 46032, 46033, 46034, 46035, 46036, 46037, 46039, 46040,
          46041, 46042, 46043, 47266, 47267, 47268, 47270, 47271, 47272, 47273,
        ],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
    ],
  },
  {
    datetime: "2022-12-27",
    active: {
      1: {
        stat: 0,
      },
      2: {
        stat: 0,
      },
      3: {
        stat: 0,
      },
      4: {
        stat: 0,
      },
      5: {
        stat: 0,
      },
    },
    inactive: 0,
    status: [
      {
        count: 400,
        "vehicle_list ": [
          36409, 36411, 36412, 36413, 36414, 36416, 36417, 36418, 36419, 36420,
          36421, 36422, 36423, 36424, 36425, 36426, 36427, 36429, 36430, 36431,
          36432, 36433, 36434, 36435, 36436, 36440, 36441, 36443, 36444, 36445,
          36446, 36768, 36769, 36770, 36771, 36772, 36773, 36774, 36775, 36776,
          36777, 36778, 36779, 36780, 36781, 36782, 36783, 36784, 36785, 36786,
          36788, 36789, 36790, 36791, 36792, 36793, 36794, 36796, 36797, 36798,
          36799, 36800, 36801, 36802, 36803, 36804, 36805, 36806, 36808, 36809,
          36810, 36811, 36812, 36813, 36814, 36815, 36816, 37307, 37308, 37309,
          37310, 37311, 37312, 37313, 37314, 37315, 37316, 37317, 37318, 37319,
          37320, 37321, 37322, 37323, 37324, 37325, 37326, 37327, 37328, 37329,
          37330, 37331, 37333, 37334, 37335, 37336, 37337, 37338, 37339, 37341,
          37342, 37343, 37344, 37345, 37346, 37347, 37348, 37349, 37350, 37351,
          37352, 37353, 37354, 37355, 37356, 37357, 37359, 37360, 37362, 37363,
          37364, 37365, 37366, 37367, 37368, 37369, 37370, 37371, 37373, 37374,
          37375, 37376, 37377, 37378, 37380, 37381, 37383, 37967, 37968, 37969,
          37970, 38538, 38539, 38541, 38542, 38544, 38545, 38546, 38547, 38548,
          38549, 38550, 38551, 38552, 38554, 38555, 38556, 38557, 38558, 38559,
          38560, 38562, 38564, 39897, 39898, 39899, 39900, 39901, 39902, 39904,
          39905, 39906, 39907, 39908, 39909, 39910, 39911, 39912, 39913, 39914,
          39915, 39916, 39918, 39919, 39920, 39921, 39922, 39923, 39925, 39927,
          39928, 39929, 39930, 39931, 39932, 39933, 39934, 39935, 39936, 39937,
          39938, 39939, 39940, 39941, 39942, 39946, 39948, 39949, 39950, 39951,
          39952, 39953, 39954, 39955, 39956, 39957, 39958, 39959, 39960, 39961,
          39962, 39964, 39965, 39966, 39967, 39968, 39969, 39970, 39971, 39972,
          39973, 39974, 39975, 39976, 39977, 39980, 39981, 39982, 39983, 39988,
          39990, 39991, 39994, 41914, 41915, 41916, 41917, 41918, 41922, 41923,
          41924, 41925, 41926, 41927, 41928, 41930, 41931, 41932, 41934, 41935,
          41936, 41937, 41938, 41939, 41941, 41942, 41943, 41944, 41945, 41946,
          42663, 42664, 42665, 42666, 42667, 42669, 42670, 42672, 42673, 42674,
          42675, 42676, 42678, 42679, 42680, 42681, 43220, 43221, 43223, 43224,
          43225, 43226, 43227, 43228, 43229, 43230, 43231, 43232, 43233, 43234,
          43236, 43237, 43238, 43239, 43240, 43241, 44051, 44052, 44054, 44055,
          44056, 44057, 44058, 44059, 44060, 44061, 44065, 44066, 44068, 44069,
          44070, 44071, 44072, 44073, 44074, 44075, 44076, 44077, 44078, 44079,
          44081, 44082, 44083, 44084, 44085, 44086, 44087, 44088, 44089, 44090,
          44091, 44092, 44093, 44094, 45773, 45774, 45775, 45776, 45777, 45778,
          45779, 45781, 45783, 45784, 45785, 45786, 46015, 46016, 46017, 46019,
          46020, 46021, 46022, 46023, 46024, 46025, 46026, 46027, 46028, 46029,
          46030, 46031, 46032, 46033, 46034, 46035, 46036, 46037, 46039, 46040,
          46041, 46042, 46043, 47266, 47267, 47268, 47270, 47271, 47272, 47273,
        ],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
    ],
  },
  {
    datetime: "2022-12-28",
    active: {
      1: {
        stat: 0,
      },
      2: {
        stat: 0,
      },
      3: {
        stat: 0,
      },
      4: {
        stat: 0,
      },
      5: {
        stat: 0,
      },
    },
    inactive: 0,
    status: [
      {
        count: 400,
        "vehicle_list ": [
          36409, 36411, 36412, 36413, 36414, 36416, 36417, 36418, 36419, 36420,
          36421, 36422, 36423, 36424, 36425, 36426, 36427, 36429, 36430, 36431,
          36432, 36433, 36434, 36435, 36436, 36440, 36441, 36443, 36444, 36445,
          36446, 36768, 36769, 36770, 36771, 36772, 36773, 36774, 36775, 36776,
          36777, 36778, 36779, 36780, 36781, 36782, 36783, 36784, 36785, 36786,
          36788, 36789, 36790, 36791, 36792, 36793, 36794, 36796, 36797, 36798,
          36799, 36800, 36801, 36802, 36803, 36804, 36805, 36806, 36808, 36809,
          36810, 36811, 36812, 36813, 36814, 36815, 36816, 37307, 37308, 37309,
          37310, 37311, 37312, 37313, 37314, 37315, 37316, 37317, 37318, 37319,
          37320, 37321, 37322, 37323, 37324, 37325, 37326, 37327, 37328, 37329,
          37330, 37331, 37333, 37334, 37335, 37336, 37337, 37338, 37339, 37341,
          37342, 37343, 37344, 37345, 37346, 37347, 37348, 37349, 37350, 37351,
          37352, 37353, 37354, 37355, 37356, 37357, 37359, 37360, 37362, 37363,
          37364, 37365, 37366, 37367, 37368, 37369, 37370, 37371, 37373, 37374,
          37375, 37376, 37377, 37378, 37380, 37381, 37383, 37967, 37968, 37969,
          37970, 38538, 38539, 38541, 38542, 38544, 38545, 38546, 38547, 38548,
          38549, 38550, 38551, 38552, 38554, 38555, 38556, 38557, 38558, 38559,
          38560, 38562, 38564, 39897, 39898, 39899, 39900, 39901, 39902, 39904,
          39905, 39906, 39907, 39908, 39909, 39910, 39911, 39912, 39913, 39914,
          39915, 39916, 39918, 39919, 39920, 39921, 39922, 39923, 39925, 39927,
          39928, 39929, 39930, 39931, 39932, 39933, 39934, 39935, 39936, 39937,
          39938, 39939, 39940, 39941, 39942, 39946, 39948, 39949, 39950, 39951,
          39952, 39953, 39954, 39955, 39956, 39957, 39958, 39959, 39960, 39961,
          39962, 39964, 39965, 39966, 39967, 39968, 39969, 39970, 39971, 39972,
          39973, 39974, 39975, 39976, 39977, 39980, 39981, 39982, 39983, 39988,
          39990, 39991, 39994, 41914, 41915, 41916, 41917, 41918, 41922, 41923,
          41924, 41925, 41926, 41927, 41928, 41930, 41931, 41932, 41934, 41935,
          41936, 41937, 41938, 41939, 41941, 41942, 41943, 41944, 41945, 41946,
          42663, 42664, 42665, 42666, 42667, 42669, 42670, 42672, 42673, 42674,
          42675, 42676, 42678, 42679, 42680, 42681, 43220, 43221, 43223, 43224,
          43225, 43226, 43227, 43228, 43229, 43230, 43231, 43232, 43233, 43234,
          43236, 43237, 43238, 43239, 43240, 43241, 44051, 44052, 44054, 44055,
          44056, 44057, 44058, 44059, 44060, 44061, 44065, 44066, 44068, 44069,
          44070, 44071, 44072, 44073, 44074, 44075, 44076, 44077, 44078, 44079,
          44081, 44082, 44083, 44084, 44085, 44086, 44087, 44088, 44089, 44090,
          44091, 44092, 44093, 44094, 45773, 45774, 45775, 45776, 45777, 45778,
          45779, 45781, 45783, 45784, 45785, 45786, 46015, 46016, 46017, 46019,
          46020, 46021, 46022, 46023, 46024, 46025, 46026, 46027, 46028, 46029,
          46030, 46031, 46032, 46033, 46034, 46035, 46036, 46037, 46039, 46040,
          46041, 46042, 46043, 47266, 47267, 47268, 47270, 47271, 47272, 47273,
        ],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
    ],
  },
  {
    datetime: "2022-12-29",
    active: {
      1: {
        stat: 0,
      },
      2: {
        stat: 0,
      },
      3: {
        stat: 0,
      },
      4: {
        stat: 0,
      },
      5: {
        stat: 0,
      },
    },
    inactive: 0,
    status: [
      {
        count: 400,
        "vehicle_list ": [
          36409, 36411, 36412, 36413, 36414, 36416, 36417, 36418, 36419, 36420,
          36421, 36422, 36423, 36424, 36425, 36426, 36427, 36429, 36430, 36431,
          36432, 36433, 36434, 36435, 36436, 36440, 36441, 36443, 36444, 36445,
          36446, 36768, 36769, 36770, 36771, 36772, 36773, 36774, 36775, 36776,
          36777, 36778, 36779, 36780, 36781, 36782, 36783, 36784, 36785, 36786,
          36788, 36789, 36790, 36791, 36792, 36793, 36794, 36796, 36797, 36798,
          36799, 36800, 36801, 36802, 36803, 36804, 36805, 36806, 36808, 36809,
          36810, 36811, 36812, 36813, 36814, 36815, 36816, 37307, 37308, 37309,
          37310, 37311, 37312, 37313, 37314, 37315, 37316, 37317, 37318, 37319,
          37320, 37321, 37322, 37323, 37324, 37325, 37326, 37327, 37328, 37329,
          37330, 37331, 37333, 37334, 37335, 37336, 37337, 37338, 37339, 37341,
          37342, 37343, 37344, 37345, 37346, 37347, 37348, 37349, 37350, 37351,
          37352, 37353, 37354, 37355, 37356, 37357, 37359, 37360, 37362, 37363,
          37364, 37365, 37366, 37367, 37368, 37369, 37370, 37371, 37373, 37374,
          37375, 37376, 37377, 37378, 37380, 37381, 37383, 37967, 37968, 37969,
          37970, 38538, 38539, 38541, 38542, 38544, 38545, 38546, 38547, 38548,
          38549, 38550, 38551, 38552, 38554, 38555, 38556, 38557, 38558, 38559,
          38560, 38562, 38564, 39897, 39898, 39899, 39900, 39901, 39902, 39904,
          39905, 39906, 39907, 39908, 39909, 39910, 39911, 39912, 39913, 39914,
          39915, 39916, 39918, 39919, 39920, 39921, 39922, 39923, 39925, 39927,
          39928, 39929, 39930, 39931, 39932, 39933, 39934, 39935, 39936, 39937,
          39938, 39939, 39940, 39941, 39942, 39946, 39948, 39949, 39950, 39951,
          39952, 39953, 39954, 39955, 39956, 39957, 39958, 39959, 39960, 39961,
          39962, 39964, 39965, 39966, 39967, 39968, 39969, 39970, 39971, 39972,
          39973, 39974, 39975, 39976, 39977, 39980, 39981, 39982, 39983, 39988,
          39990, 39991, 39994, 41914, 41915, 41916, 41917, 41918, 41922, 41923,
          41924, 41925, 41926, 41927, 41928, 41930, 41931, 41932, 41934, 41935,
          41936, 41937, 41938, 41939, 41941, 41942, 41943, 41944, 41945, 41946,
          42663, 42664, 42665, 42666, 42667, 42669, 42670, 42672, 42673, 42674,
          42675, 42676, 42678, 42679, 42680, 42681, 43220, 43221, 43223, 43224,
          43225, 43226, 43227, 43228, 43229, 43230, 43231, 43232, 43233, 43234,
          43236, 43237, 43238, 43239, 43240, 43241, 44051, 44052, 44054, 44055,
          44056, 44057, 44058, 44059, 44060, 44061, 44065, 44066, 44068, 44069,
          44070, 44071, 44072, 44073, 44074, 44075, 44076, 44077, 44078, 44079,
          44081, 44082, 44083, 44084, 44085, 44086, 44087, 44088, 44089, 44090,
          44091, 44092, 44093, 44094, 45773, 45774, 45775, 45776, 45777, 45778,
          45779, 45781, 45783, 45784, 45785, 45786, 46015, 46016, 46017, 46019,
          46020, 46021, 46022, 46023, 46024, 46025, 46026, 46027, 46028, 46029,
          46030, 46031, 46032, 46033, 46034, 46035, 46036, 46037, 46039, 46040,
          46041, 46042, 46043, 47266, 47267, 47268, 47270, 47271, 47272, 47273,
        ],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
    ],
  },
  {
    datetime: "2022-12-30",
    active: {
      1: {
        stat: 0,
      },
      2: {
        stat: 0,
      },
      3: {
        stat: 0,
      },
      4: {
        stat: 0,
      },
      5: {
        stat: 0,
      },
    },
    inactive: 0,
    status: [
      {
        count: 400,
        "vehicle_list ": [
          36409, 36411, 36412, 36413, 36414, 36416, 36417, 36418, 36419, 36420,
          36421, 36422, 36423, 36424, 36425, 36426, 36427, 36429, 36430, 36431,
          36432, 36433, 36434, 36435, 36436, 36440, 36441, 36443, 36444, 36445,
          36446, 36768, 36769, 36770, 36771, 36772, 36773, 36774, 36775, 36776,
          36777, 36778, 36779, 36780, 36781, 36782, 36783, 36784, 36785, 36786,
          36788, 36789, 36790, 36791, 36792, 36793, 36794, 36796, 36797, 36798,
          36799, 36800, 36801, 36802, 36803, 36804, 36805, 36806, 36808, 36809,
          36810, 36811, 36812, 36813, 36814, 36815, 36816, 37307, 37308, 37309,
          37310, 37311, 37312, 37313, 37314, 37315, 37316, 37317, 37318, 37319,
          37320, 37321, 37322, 37323, 37324, 37325, 37326, 37327, 37328, 37329,
          37330, 37331, 37333, 37334, 37335, 37336, 37337, 37338, 37339, 37341,
          37342, 37343, 37344, 37345, 37346, 37347, 37348, 37349, 37350, 37351,
          37352, 37353, 37354, 37355, 37356, 37357, 37359, 37360, 37362, 37363,
          37364, 37365, 37366, 37367, 37368, 37369, 37370, 37371, 37373, 37374,
          37375, 37376, 37377, 37378, 37380, 37381, 37383, 37967, 37968, 37969,
          37970, 38538, 38539, 38541, 38542, 38544, 38545, 38546, 38547, 38548,
          38549, 38550, 38551, 38552, 38554, 38555, 38556, 38557, 38558, 38559,
          38560, 38562, 38564, 39897, 39898, 39899, 39900, 39901, 39902, 39904,
          39905, 39906, 39907, 39908, 39909, 39910, 39911, 39912, 39913, 39914,
          39915, 39916, 39918, 39919, 39920, 39921, 39922, 39923, 39925, 39927,
          39928, 39929, 39930, 39931, 39932, 39933, 39934, 39935, 39936, 39937,
          39938, 39939, 39940, 39941, 39942, 39946, 39948, 39949, 39950, 39951,
          39952, 39953, 39954, 39955, 39956, 39957, 39958, 39959, 39960, 39961,
          39962, 39964, 39965, 39966, 39967, 39968, 39969, 39970, 39971, 39972,
          39973, 39974, 39975, 39976, 39977, 39980, 39981, 39982, 39983, 39988,
          39990, 39991, 39994, 41914, 41915, 41916, 41917, 41918, 41922, 41923,
          41924, 41925, 41926, 41927, 41928, 41930, 41931, 41932, 41934, 41935,
          41936, 41937, 41938, 41939, 41941, 41942, 41943, 41944, 41945, 41946,
          42663, 42664, 42665, 42666, 42667, 42669, 42670, 42672, 42673, 42674,
          42675, 42676, 42678, 42679, 42680, 42681, 43220, 43221, 43223, 43224,
          43225, 43226, 43227, 43228, 43229, 43230, 43231, 43232, 43233, 43234,
          43236, 43237, 43238, 43239, 43240, 43241, 44051, 44052, 44054, 44055,
          44056, 44057, 44058, 44059, 44060, 44061, 44065, 44066, 44068, 44069,
          44070, 44071, 44072, 44073, 44074, 44075, 44076, 44077, 44078, 44079,
          44081, 44082, 44083, 44084, 44085, 44086, 44087, 44088, 44089, 44090,
          44091, 44092, 44093, 44094, 45773, 45774, 45775, 45776, 45777, 45778,
          45779, 45781, 45783, 45784, 45785, 45786, 46015, 46016, 46017, 46019,
          46020, 46021, 46022, 46023, 46024, 46025, 46026, 46027, 46028, 46029,
          46030, 46031, 46032, 46033, 46034, 46035, 46036, 46037, 46039, 46040,
          46041, 46042, 46043, 47266, 47267, 47268, 47270, 47271, 47272, 47273,
        ],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
    ],
  },
  {
    datetime: "2022-12-31",
    active: {
      1: {
        stat: 0,
      },
      2: {
        stat: 0,
      },
      3: {
        stat: 0,
      },
      4: {
        stat: 0,
      },
      5: {
        stat: 0,
      },
    },
    inactive: 0,
    status: [
      {
        count: 400,
        "vehicle_list ": [
          36409, 36411, 36412, 36413, 36414, 36416, 36417, 36418, 36419, 36420,
          36421, 36422, 36423, 36424, 36425, 36426, 36427, 36429, 36430, 36431,
          36432, 36433, 36434, 36435, 36436, 36440, 36441, 36443, 36444, 36445,
          36446, 36768, 36769, 36770, 36771, 36772, 36773, 36774, 36775, 36776,
          36777, 36778, 36779, 36780, 36781, 36782, 36783, 36784, 36785, 36786,
          36788, 36789, 36790, 36791, 36792, 36793, 36794, 36796, 36797, 36798,
          36799, 36800, 36801, 36802, 36803, 36804, 36805, 36806, 36808, 36809,
          36810, 36811, 36812, 36813, 36814, 36815, 36816, 37307, 37308, 37309,
          37310, 37311, 37312, 37313, 37314, 37315, 37316, 37317, 37318, 37319,
          37320, 37321, 37322, 37323, 37324, 37325, 37326, 37327, 37328, 37329,
          37330, 37331, 37333, 37334, 37335, 37336, 37337, 37338, 37339, 37341,
          37342, 37343, 37344, 37345, 37346, 37347, 37348, 37349, 37350, 37351,
          37352, 37353, 37354, 37355, 37356, 37357, 37359, 37360, 37362, 37363,
          37364, 37365, 37366, 37367, 37368, 37369, 37370, 37371, 37373, 37374,
          37375, 37376, 37377, 37378, 37380, 37381, 37383, 37967, 37968, 37969,
          37970, 38538, 38539, 38541, 38542, 38544, 38545, 38546, 38547, 38548,
          38549, 38550, 38551, 38552, 38554, 38555, 38556, 38557, 38558, 38559,
          38560, 38562, 38564, 39897, 39898, 39899, 39900, 39901, 39902, 39904,
          39905, 39906, 39907, 39908, 39909, 39910, 39911, 39912, 39913, 39914,
          39915, 39916, 39918, 39919, 39920, 39921, 39922, 39923, 39925, 39927,
          39928, 39929, 39930, 39931, 39932, 39933, 39934, 39935, 39936, 39937,
          39938, 39939, 39940, 39941, 39942, 39946, 39948, 39949, 39950, 39951,
          39952, 39953, 39954, 39955, 39956, 39957, 39958, 39959, 39960, 39961,
          39962, 39964, 39965, 39966, 39967, 39968, 39969, 39970, 39971, 39972,
          39973, 39974, 39975, 39976, 39977, 39980, 39981, 39982, 39983, 39988,
          39990, 39991, 39994, 41914, 41915, 41916, 41917, 41918, 41922, 41923,
          41924, 41925, 41926, 41927, 41928, 41930, 41931, 41932, 41934, 41935,
          41936, 41937, 41938, 41939, 41941, 41942, 41943, 41944, 41945, 41946,
          42663, 42664, 42665, 42666, 42667, 42669, 42670, 42672, 42673, 42674,
          42675, 42676, 42678, 42679, 42680, 42681, 43220, 43221, 43223, 43224,
          43225, 43226, 43227, 43228, 43229, 43230, 43231, 43232, 43233, 43234,
          43236, 43237, 43238, 43239, 43240, 43241, 44051, 44052, 44054, 44055,
          44056, 44057, 44058, 44059, 44060, 44061, 44065, 44066, 44068, 44069,
          44070, 44071, 44072, 44073, 44074, 44075, 44076, 44077, 44078, 44079,
          44081, 44082, 44083, 44084, 44085, 44086, 44087, 44088, 44089, 44090,
          44091, 44092, 44093, 44094, 45773, 45774, 45775, 45776, 45777, 45778,
          45779, 45781, 45783, 45784, 45785, 45786, 46015, 46016, 46017, 46019,
          46020, 46021, 46022, 46023, 46024, 46025, 46026, 46027, 46028, 46029,
          46030, 46031, 46032, 46033, 46034, 46035, 46036, 46037, 46039, 46040,
          46041, 46042, 46043, 47266, 47267, 47268, 47270, 47271, 47272, 47273,
        ],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
      {
        count: 0,
        "vehicle_list ": [],
      },
    ],
  },
];

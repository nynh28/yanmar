import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import MyVehicleActions from "../../Redux/MyVehiclesRedux";
import { Row, Col } from "antd";
import FormSelect from "../../Components/FormControls/Basic/FormSelect";
import DateRangePicker from "react-bootstrap-daterangepicker-maxspan";
import DataTable from "./DataTable";
import moment from "moment";
import { get, isEmpty } from "lodash";
import { t } from "../../Components/Translation";
import {
  ENDPOINT_BASE_URL_YNM4,
  ENDPOINT_BASE_URL_YNM2,
} from "../../Config/app-config";
import { useTranslation } from "react-i18next";
import { Select } from "antd";
import ArrayStore from "devextreme/data/array_store";
import { BoxContrainer, Button } from "../../components_new";
import axios from "axios";
import { CalendarOutlined } from "@ant-design/icons";

export const dataStore = new ArrayStore({ data: [] });

const { Option } = Select;
const todayEnd = moment().set({
  hour: 23,
  minute: 59,
  second: 59,
  millisecond: 59,
});

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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

const FormDatepickerNew = (arg) => {
  const { t } = useTranslation();
  return (
    <div className="form-group field field-string icon-calendar flex-1">
      <CalendarOutlined />
      <DateRangePicker
        onShow={() => {
          let elms = document.querySelectorAll("li[data-range-key]");
          if (elms.length > 0) {
            elms[0].textContent = t("calendar_27");
            elms[1].textContent = t("calendar_1");
            elms[2].textContent = t("calendar_28");
            elms[3].textContent = t("calendar_5");
          }
        }}
        showDropdowns
        timePicker
        // timePickerSeconds
        timePicker24Hour
        locale={{
          format: "DD/MM/YYYY HH:mm",
          applyLabel: t("calendar_26"),
          cancelLabel: t("calendar_25"),
          customRangeLabel: t("calendar_5"),
          customRangeLabel: "Custom Range",
          daysOfWeek: [
            t("calendar_12"),
            t("calendar_6"),
            t("calendar_7"),
            t("calendar_8"),
            t("calendar_9"),
            t("calendar_10"),
            t("calendar_11"),
          ],
          monthNames: [
            t("calendar_13"),
            t("calendar_14"),
            t("calendar_15"),
            t("calendar_16"),
            t("calendar_17"),
            t("calendar_18"),
            t("calendar_19"),
            t("calendar_20"),
            t("calendar_21"),
            t("calendar_22"),
            t("calendar_23"),
            t("calendar_24"),
          ],
        }}
        startDate={arg.startDate}
        endDate={arg.endDate}
        onApply={arg.onApply}
        maxDate={todayEnd}
        maxSpan={{ days: 2 }}
        ranges={{
          Today: [moment().startOf("day"), moment().endOf("day")],
          Yesterday: [
            moment().subtract(1, "days").startOf("day"),
            moment().subtract(1, "days").endOf("day"),
          ],
          "Past 3 days": [
            moment().subtract(3, "days").startOf("day"),
            moment().subtract(1, "days").endOf("day"),
          ],
        }}
        alwaysShowCalendars={true}
      >
        <input
          className="form-control"
          id={arg.fieldForm}
          disabled={arg.disabled}
          value={arg.value || ""}
          placeholder={t(arg.placeholder)}
        />
      </DateRangePicker>
    </div>
  );
};

//#endregion

class MyVehicles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vid: [],
    };
    this.controller = [];
    this.vehicleHourTemp = [];
  }

  componentDidMount() {
    this.props.setStateMyVehicle({ isLoadingVehicles: false });
    this.getalldata();
  }

  componentWillUnmount() {
    this.props.setStateMyVehicle({ isLoadingVehicles: false });
  }

  getvehicleid(dealer_id) {
    let { dealerData } = this.props;
    let obj = dealerData.find(
      (x) => parseInt(x.dealer_id) === parseInt(dealer_id)
    );
    let vehicles = obj?.items || [];

    let model = [],
      chassisNo = [],
      engineNo = [];
    vehicles.forEach((item) => {
      if (
        !isEmpty(item.model_code) &&
        !this.checkDupName(model, item.model_code)
      ) {
        model.push({
          id: item.model_code,
          value: item.model_code,
        });
      }

      if (
        !isEmpty(item.chassis_no) &&
        !this.checkDupName(model, item.chassis_no)
      ) {
        chassisNo.push({
          id: item.chassis_no,
          value: item.chassis_no,
        });
      }

      if (
        !isEmpty(item.engine_no) &&
        !this.checkDupName(model, item.engine_no)
      ) {
        engineNo.push({
          id: item.engine_no,
          value: item.engine_no,
        });
      }
    });

    this.props.setStateMyVehicle({
      modelList: model,
      chassisNoList: chassisNo,
      engineNoList: engineNo,
    });
  }

  checkDupName(data, value) {
    let isDup = false;
    data.forEach((item) => {
      if (item.value === value) isDup = true;
    });
    return isDup;
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
      showName == "เลขตัวรถ" ? get(vehicleInfo, "chassis_no", "") : "";
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
      showName,
      startSearch: false,
    });
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
        this.props.setStateMyVehicle({
          dealerData: dealerList,
          selectDealer: 0,
        });
      } else this.props.setStateMyVehicle({ dealerData: [] });
    } catch (error) {
      this.props.setStateMyVehicle({ dealerData: [] });
    }
  }

  async getDataVehicles() {
    let { showName, selectDealer, currentValue } = this.props;
    this.props.setStateMyVehicle({ isLoadingVehicles: true, vehicleData: [] });

    let { dateStart, dateEnd } = this.props.dateRangeFilter;
    let start_date = moment(dateStart, "DD/MM/YYYY HH:mm").format(
      "YYYY-MM-DD HH:mm"
    );
    let stop_date = moment(dateEnd, "DD/MM/YYYY HH:mm").format(
      "YYYY-MM-DD HH:mm"
    );

    await axios
      .post(`${ENDPOINT_BASE_URL_YNM4}fleet/myvehicle`, {
        user_id: this.props.dataLogin.userId,
        dealer_id:
          selectDealer === "" || selectDealer === 0 ? null : selectDealer,
        start_date,
        stop_date,
        chassis_no: showName === "เลขตัวรถ" ? currentValue : "",
        engine_no: showName === "เลขเครื่อง" ? currentValue : "",
        model_code: showName === "รุ่นรถ" ? currentValue : "",
      })
      .then((response) => {
        let data = response?.data?.result || [];
        if (response.status === 200) {
          data = response?.data?.result || [];
          this.loadData(data);
        }
        else {
          this.props.setStateMyVehicle({ isLoadingVehicles: false })
        }

        for (let index in response?.data.result) {
          this.state.vid.push(response?.data.result[index].vid);
          // this.setState({
          //   vid: [response?.data.result[index].vid],
          // });
        }


      })
      .catch((error) => {
        this.props.setStateMyVehicle({
          isLoadingVehicles: false,
          vehicleData: [],
        });
      });
  }

  cancleFetchApi() {
    this.vehicleHourTemp = []
    this.controller.forEach((controller) => {
      if (!controller.signal.aborted) controller.abort();
    });
  }

  async loadData(data) {
    let { dateStart, dateEnd } = this.props.dateRangeFilter;
    let start_date = moment(dateStart, "DD/MM/YYYY HH:mm:ss").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    let stop_date = moment(dateEnd, "DD/MM/YYYY HH:mm:ss").format(
      "YYYY-MM-DD HH:mm:ss"
    );

    this.cancleFetchApi();
    setTimeout(async () => {
      //#region
      let isSuccess = false,
        rangeIndex = { min: 0, max: 20 },
        nextRange = 20,
        countSuccess = 0,
        total = data.length;
      do {
        let listAPI = [];
        let countLast = nextRange;
        for (let index = rangeIndex.min; index < rangeIndex.max; index++) {
          if (index < total) {
            let vidi = parseInt(data[index].vid);
            let body = {
              vid_list: [vidi],
              dtstart: start_date,
              dtstop: stop_date,
            };

            listAPI.push({ body });
          } else {
            countLast--;
          }
        }
        await this.fetchPromiseAll(listAPI, total);

        countSuccess += countLast;
        let nextRage = {
          min: rangeIndex.min + nextRange,
          max: rangeIndex.max + nextRange,
        };
        rangeIndex = nextRage;

        if (countSuccess === total) isSuccess = true;
      } while (!isSuccess);

      // let vehicleDataNew = [];

      // this.vehicleHourTemp.map((item) => {
      //   let { vid, working_hour, working_hour_start, working_hour_stop } = item;
      //   const test = JSON.parse(JSON.stringify(data));
      //   let findIndex = test.findIndex((item) => item.vid == vid);
      //   if (findIndex >= 0) {
      //     let vehicleDataOld = test[findIndex];

      //     vehicleDataOld.working_hours = item.working_hour;
      //     vehicleDataOld.working_hours_start = item.working_hour_start;
      //     vehicleDataOld.working_hours_end = item.working_hour_stop;
      //     vehicleDataNew.push(vehicleDataOld);
      //   }
      // });

      let vehicleDataNew = data.map((dt) => {
        let found = this.vehicleHourTemp.find((item) => item.vid == dt.vid)
        if (found) {
          dt.working_hours = found.working_hour
          dt.working_hours_start = found.working_hour_start
          dt.working_hours_end = found.working_hour_stop
        }
        return dt
      })

      this.props.setStateMyVehicle({
        isLoadingVehicles: false,
        vehicleData: vehicleDataNew,
      });

      //#endregion
    }, 1000);
  }

  async fetchPromiseAll(listAPI, total) {
    const promises = listAPI.map(async (dt) => {
      let isSuccess = true;
      isSuccess = await this.getVehicleHoure(dt.body);

      while (!isSuccess) {
        await this.fetchPromiseAll([{ body: dt.body }], total);
        isSuccess = true;
      }
      this.props.setStateMyVehicle({
        isLoadingVehicles: true,
      });
    });
    await Promise.all(promises);
  }

  async getVehicleHoure(body) {
    let isSuccess = false;
    try {
      const controller = new AbortController();
      let signal = controller.signal;
      this.controller.push(controller);

      let response = await fetch(
        `${ENDPOINT_BASE_URL_YNM4}fleet/report/enginehour`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "accept-language": this.props.language,
          },
          body: JSON.stringify(body),
          signal,
        }
      );

      var resp = await response.json();

      if (resp.code === 200) {
        let data = resp.result;
        // data.vid = body.vid;
        this.vehicleHourTemp.push(...data);
        isSuccess = true;
      } else {
        isSuccess = false;
      }
    } catch {
      isSuccess = false;
    }
    return isSuccess;
  }
  //#endregion

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

  onApplyEvent(dataObject) {
    this.startDate = dataObject.startDate.format("YYYY-MM-DD MM:SS");
    this.stopDate = dataObject.endDate.format("YYYY-MM-DD MM:ss");

    if (!this.isFirstLoad && this.customer_mode) {
      this.loadVehicles();
    } else if (this.dealer_mode) {
      this.props.updateSearchDataMyVehicles([
        { name: "start_date", value: this.startDate },
        { name: "stop_date", value: this.stopDate },
      ]);
    } else {
      this.isFirstLoad = false;
    }
  }

  render() {
    let {
      isLoadingVehicles,
      selectDealer,
      currentValue,
      showName,
      dealerData,
      modelList,
      chassisNoList,
      engineNoList,
    } = this.props;
    let { dateStart, dateEnd } = this.props.dateRangeFilter;
    let { vid } = this.state;

    return (
      <Suspense fallback={null}>
        <BoxContrainer
          footer={
            <div style={{ textAlign: "right" }}>
              <Button
                isSearchButton={true}
                disabled={isLoadingVehicles}
                onClick={() => this.getDataVehicles()}
              />
            </div>
          }
        >
          <Row>
            <Col lg={8} md={8} sm={8}>
              <DropdownDealer
                data={dealerData}
                selected={selectDealer}
                // disabled={isLoadingVehicles}
                onChange={(selected) => {
                  this.props.setStateMyVehicle({ selectDealer: selected });
                  this.getvehicleid(selected);
                }}
              />
            </Col>

            <Col lg={8} md={8} sm={8}>
              <Row>
                <Col lg={12} md={12} xs={12}>
                  <div id="selected-1">
                    <FormSelect
                      schema={{ required: "" }}
                      mode={"single"}
                      allowClear={false}
                      value={showName}
                      style={{ width: "100%" }}
                      padding="0px 0px 0px 10px"
                      showSearch={false}
                      label={showName}
                      // disabled={isLoadingVehicles}
                      list={[
                        { key: 101, value: "รุ่นรถ", text: "รุ่นรถ" },
                        { key: 102, value: "เลขตัวรถ", text: "เลขตัวรถ" },
                        { key: 103, value: "เลขเครื่อง", text: "เลขเครื่อง" },
                      ]}
                      placeholder={""}
                      onChange={(selected) => {
                        this.props.setStateMyVehicle({
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
                      showSearch
                      style={{ width: "100%" }}
                      optionFilterProp="children"
                      value={currentValue}
                      // disabled={isLoadingVehicles}
                      onChange={(value) => {
                        this.props.setStateMyVehicle({ currentValue: value });
                      }}
                      onSearch={(input) => {
                        // this.setState({ startSearch: input !== "" ? true : false })
                      }}
                      onSelect={(select) => {
                        // this.setState({ member: select })
                      }}
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

            <Col lg={8} md={8} sm={8}>
              <div className="space-x-2 text-start mr-4">
                <label style={{ fontWeight: 500 }}>{t("history_4")} :</label>
              </div>

              <FormDatepickerNew
                schema={""}
                startDate={dateStart}
                endDate={dateEnd}
                value={dateStart + " - " + dateEnd}
                label={"history_4"}
                placeholder={"DD/MM/YYYY HH:mm"}
                flex={1}
                // disabled={isLoadingVehicles}
                onApply={(e, picker) => {
                  this.props.setStateMyVehicle({
                    dateRangeFilter: {
                      dateStart: picker.startDate.format("DD/MM/YYYY HH:mm"),
                      dateEnd: picker.endDate.format("DD/MM/YYYY HH:mm"),
                    },
                  });
                }}
              />
            </Col>
          </Row>
        </BoxContrainer>

        <BoxContrainer title="my_vehicles_1">
          <div style={{ height: `calc(100vh - 406px)` }}>
            <DataTable />
          </div>
        </BoxContrainer>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  dateRangeFilter: state.myVehicles.dateRangeFilter,
  isLoadingVehicles: state.myVehicles.isLoadingVehicles,
  selectDealer: state.myVehicles.selectDealer,
  currentValue: state.myVehicles.currentValue,
  dealerData: state.myVehicles.dealerData,
  modelList: state.myVehicles.modelList,
  chassisNoList: state.myVehicles.chassisNoList,
  engineNoList: state.myVehicles.engineNoList,
  showName: state.myVehicles.showName,
  vehicleData: state.myVehicles.vehicleData,
});

const mapDispatchToProps = (dispatch) => ({
  setIsLoadingVehicles: (isLoading) =>
    dispatch(MyVehicleActions.setIsLoadingVehicles(isLoading)),
  updateSearchDataMyVehicles: (array) =>
    dispatch(MyVehicleActions.updateSearchDataMyVehicles(array)),
  setValue: (name, value) => dispatch(MyVehicleActions.setValue(name, value)),
  setStateMyVehicle: (name, value) =>
    dispatch(MyVehicleActions.setStateMyVehicle(name, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyVehicles);

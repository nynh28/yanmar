import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import SummaryActions from "../../Redux/SummaryNewRedux";
import { connect } from "react-redux";
import axios from "axios";
import { get } from "lodash";
import moment from "moment";
import { rTT, t } from "../../Components/Translation";
import { useTranslation } from "react-i18next";
import { CalendarOutlined, ReloadOutlined } from "@ant-design/icons";
import Alert from "../../Components/Alert";
import { Select, Button, BoxContrainer } from "../../components_new";
import FormSelectSearch from "../../Components/FormControls/FormSelectSearch";
// import FormDatepickerSummary from '../../Components/FormControls/FormDatepickerSummary';
import $ from "jquery";
import {
  ENDPOINT_BASE_URL_YNM2,
  ENDPOINT_BASE_URL_YNM4,
} from "../../Config/app-config";
import DateRangePicker from "react-bootstrap-daterangepicker-maxspan";
import { Row, Col } from "antd";
import { setNestedObjectValues } from "formik";
import WarningAlert from "./WarningAlert";
import { prop } from "ramda";

let controllerSignal = [];

const todayEnd = moment().set({
  hour: 23,
  minute: 59,
  second: 59,
  millisecond: 59,
});
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
        locale={{
          format: "DD/MM/YYYY",
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
        maxSpan={{ days: 30 }}
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

const FilterBar = (props) => {
  let { dataLogin, isLoadingSummary, filterSummary, summaryData } = props; // STATE
  let { setStateSummary, setFilterData, setValue } = props; // ACTION
  let user_id = dataLogin?.userId;
  let { custID, region, dateRange, dateDisplay } = filterSummary;
  let { dateStart, dateEnd } = dateRange;
  let { Start, End } = dateDisplay;

  const [alertSetting, setAlertSetting] = useState({
    show: false,
    type: 2,
    content: "",
    ErrorSubcode: 0,
    validateCode: false,
  });
  const [testRegion, setTest] = useState([]);
  const [startdate, setStart] = useState(moment().format("DD/MM/YYYY"));
  const [enddate, setEnd] = useState(moment().format("DD/MM/YYYY"));
  const [customer, setCustomer] = useState([]);
  useEffect(() => {
    getRegion();
    getCustomer();
  }, []);
  useEffect(() => {
    getCustomer();
    getRegion();
  }, [props.language]);

  const loadData = async (refreshClick = false) => {
    setStateSummary({ isLoadingSummary: true });

    controllerSignal.forEach((controller) => controller.cancel());
    const controller = new AbortController();
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    controllerSignal.push(source);
    let region_id = props.filterSummary.region;
    let start = props.filterSummary.dateRange.dateStart;
    let dateEnd = props.filterSummary.dateRange.dateEnd;
    let cust_id = props.filterSummary.custID;
    start = moment(start, "DD/MM/YYYY").format("YYYY-MM-DD");
    dateEnd = moment(dateEnd, "DD/MM/YYYY").format("YYYY-MM-DD");

    try {
      await axios
        .get(
          ENDPOINT_BASE_URL_YNM4 +
            `fleet/dashboard/summary?userId=` +
            user_id +
            `&start_date=` +
            start +
            `&stop_date=` +
            dateEnd +
            `&region_id=` +
            region_id +
            `&cust_id=` +
            cust_id,
          {
            cancelToken: source.token,
            signal: controller.signal,
          }
        )
        .then((response) => {
          console.log("loadData:  ", response);

          setStateSummary({
            isLoadingSummary: false,
            summaryData: response.data.result,
          });
          console.log(summaryData);
          if (response.data.result === null) {
            setValue("isWarning", true);
          }
        });
    } catch (error) {
      setStateSummary({ isLoadingSummary: false });
    }
  };

  const getRegion = async () => {
    let lang = "";
    if (props.language === "en") {
      lang = "eng";
    } else {
      lang = props.language;
    }
    try {
      var response = await fetch(
        `${ENDPOINT_BASE_URL_YNM4}fleet/Yanmar/getRegion`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "accept-language": lang,
          },
          body: JSON.stringify({
            "accept-language": lang,
          }),
        }
      );
      var data = await response.json();
      if (data?.code === 200) {
        let allregion = data.result;
        allregion.unshift({
          region_id: 0,
          region_name: "เลือกทั้งหมด",
        });
        let regionreal = [];
        allregion.forEach((item) => [
          regionreal.push({
            key: item.region_id,
            value: item.region_name,
            text: item.region_name,
          }),
        ]);
        setTest(regionreal);
        setStateSummary({ isLoadingSummary: false });
      }
    } catch (error) {}
  };

  const getCustomer = async () => {
    let lang = "";
    if (props.language === "en") {
      lang = "eng";
    } else {
      lang = props.language;
    }
    var response = await fetch(ENDPOINT_BASE_URL_YNM4 + `fleet/get_customer`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "accept-language": lang,
      },
      body: JSON.stringify({
        userId: user_id,
      }),
    });
    var data = await response.json();

    let allcustomer = data;
    allcustomer.unshift({
      partner_id: 0,
      firstname: rTT(t("summary_97")),
      lastname: "",
      prefix: "",
      suffix: "",
    });

    let customersall = [];
    allcustomer.forEach((item) => {
      if (item.lastname == null && item.prefix == null) {
        customersall.push({ key: item.partner_id, value: `${item.firstname}` });
      }
      if (item.prefix !== null) {
        customersall.push({
          key: item.partner_id,
          value: `${item.prefix}${item.firstname} ${item.lastname}`,
        });
      }
    });

    setCustomer(customersall);
    console.log(customer);
  };

  const setAlert = (show = false, type = 2, content = "") => {
    setAlertSetting({
      ...alertSetting,
      show,
      type,
      content,
    });
  };

  return (
    <>
      <Alert
        setting={alertSetting}
        onConfirm={() => setAlert(false)}
        onCancel={() => setAlert(false)}
      />
      <WarningAlert />
      <BoxContrainer
        title={`${rTT(t("summary_93"))} ${Start} ${rTT(
          t("summary_96")
        )} ${End}`}
        isTran={false}
        footer={
          <div style={{ textAlign: "right" }}>
            <Button
              text={"search"}
              icon={<ReloadOutlined />}
              margin={1}
              isAddButton={true}
              disabled={isLoadingSummary}
              onClick={() => {
                loadData();
                setFilterData("dateDisplay", {
                  Start: dateStart,
                  End: dateEnd,
                });
                props.setStateSummary({ pointData: [] });
              }}
            />
          </div>
        }
      >
        <div>
          <Row>
            <Col lg={8} md={8} sm={8} style={{ paddingRight: "10px" }}>
              <Select
                mode="single"
                placeholder="summary_84"
                optionFilterProp="children"
                list={customer}
                value={custID}
                disabled={isLoadingSummary}
                onChange={(value) => {
                  setFilterData("custID", value);
                  setStateSummary({
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
                  });
                }}
              />
            </Col>
            <Col lg={8} md={8} sm={8} style={{ paddingRight: "10px" }}>
              <Select
                mode="single"
                placeholder="summary_92"
                optionFilterProp="children"
                list={testRegion}
                value={region}
                padding="0px 0px 0px 10px"
                disabled={isLoadingSummary}
                onChange={(value) => {
                  setFilterData("region", value);
                  setStateSummary({
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
                  });
                }}
              />
            </Col>
            <Col lg={8} md={8} sm={8} style={{ paddingRight: "10px" }}>
              <FormDatepickerNew
                schema={""}
                startDate={dateStart}
                endDate={dateEnd}
                value={startdate + " - " + enddate}
                label={"history_4"}
                padding="0px 0px 0px 10px"
                placeholder={"DD/MM/YYYY"}
                flex={1}
                disabled={isLoadingSummary}
                onApply={(e, picker) => {
                  setFilterData("dateRange", {
                    dateStart: picker.startDate.format("DD/MM/YYYY"),
                    dateEnd: picker.endDate.format("DD/MM/YYYY"),
                  });
                  console.log(picker);
                  setStart(picker.startDate.format("DD/MM/YYYY"));
                  setEnd(picker.endDate.format("DD/MM/YYYY"));
                  setStateSummary({
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
                  });
                }}
              />
            </Col>
          </Row>
        </div>
      </BoxContrainer>
    </>
  );
};

const mapStateToProps = (state) => ({
  language: state.versatile.language,
  dataLogin: state.signin.dataLogin,
  isLoadingSummary: state.summaryNew.isLoadingSummary,
  filterSummary: state.summaryNew.filterSummary,
  summaryData: state.summaryNew.summaryData,
  detailDaliy: state.summaryNew.detailDaliy,
  isWarning: state.summaryNew.isWarning,
});

const mapDispatchToProps = (dispatch) => ({
  setStateSummary: (obj) => dispatch(SummaryActions.setStateSummary(obj)),
  setFilterData: (fieldName, value) =>
    dispatch(SummaryActions.setFilterData(fieldName, value)),
  setRegion: (id, value) => dispatch(SummaryActions.setRegion(id, value)),
  setValue: (name, value) => dispatch(SummaryActions.setValue(name, value)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FilterBar)
);

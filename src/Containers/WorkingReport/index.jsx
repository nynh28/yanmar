import React, { useEffect, useState, Suspense } from "react";
import { BoxContrainer, Button, FormLoading } from "../../components_new";
import "./style.css";
import { Row, Col } from "antd";
import Timeline from "./Timeline";
import moment from "moment";
import { get } from "lodash";
import FormSelectSearch from "../../Components/FormControls/FormSelectSearch";
import { t, rTT } from "../../Components/Translation";
import FormDatepickerNew from "../../Components/FormControls/FormDatepickerNew";
import {
  ENDPOINT_BASE_URL_YNM2,
  ENDPOINT_BASE_URL_YNM4,
} from "../../Config/app-config";
import { connect } from "react-redux";
import { ExportPDF } from "./Export/ExportPDF";

// const DateRangePicker = (arg) => {
//   return (<div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
//     <label className="control-label" style={{ fontWeight: 500 }}>
//       {t('date_Range')} :
//     </label>
//     <FormDatepickerNew
//       timePicker={false}
//       select_change={arg.select_change}
//       language={arg.language}
//       startDate={arg.startDate}
//       endDate={arg.endDate}
//       maxSpan={{ days: 31 }}
//       maxDate={arg.eDate}>
//     </FormDatepickerNew>
//   </div>
//   )
// }

const DateRangePicker = (arg) => {
  return (
    <div
      className="form-group field field-string"
      style={{ padding: "0 10px", flex: 1 }}
    >
      <label className="control-label" style={{ fontWeight: 500 }}>
        {t("date_Range")} :
      </label>
      <FormDatepickerNew
        select_change={arg.select_change}
        startDate={arg.startDate}
        endDate={arg.endDate}
        language={arg.language}
        maxSpan={{ days: 31 }}
        maxDate={arg.eDate}
      ></FormDatepickerNew>
    </div>
  );
};

const TODAYSTART = moment()
  .add(-1, "days")
  .set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
const TODAYEND = moment().set({
  hour: 23,
  minute: 59,
  second: 59,
  millisecond: 59,
});
const TODAY = moment().set({
  hour: 23,
  minute: 59,
  second: 59,
  millisecond: 59,
});
const DEFAULT_START = TODAYSTART.format("YYYY-MM-DD"),
  DEFAULT_END = TODAYEND.format("YYYY-MM-DD");
let startdate_temp = TODAY,
  enddate_temp = TODAY;
const WorkingReport = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({});
  // const [startdate, setStartDate] = useState(DEFAULT_START)
  // const [enddate, setEndDate] = useState(DEFAULT_END)
  const [chassis, setChasiss] = useState("");
  const [vin, setVin] = useState("");
  const [currentDateRange, setCurrentDateRange] = useState("");
  let info = get(dataSource, "vehicle_data", {});

  useEffect(() => {
    setLoading(false);
    Getv();
  }, []);

  async function GetData() {
    let body = {
      dtstart: moment(startdate_temp).format("YYYY-MM-DD 00:00:00"),
      dtstop: moment(enddate_temp).format("YYYY-MM-DD 23:59:59"),
    };
    try {
      setLoading(true);
      const response = await fetch(
        ENDPOINT_BASE_URL_YNM4 + "fleet/report/working/" + vin,
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
      if (Object.keys(data.result.working_data).length !== 0) {
        // console.log(">>", data.result)
        setDataSource(data.result);
        setCurrentDateRange(
          `${moment(startdate_temp).format("DD/MM/YYYY")} - ${moment(
            enddate_temp
          ).format("DD/MM/YYYY")}`
        );
      } else {
        setDataSource([]);
      }
      setLoading(false);
    } catch (err) {
      alert(`${err}`);
      setLoading(false);
    }
  }

  async function Getv() {
    try {
      const response = await fetch(
        ENDPOINT_BASE_URL_YNM4 + "fleet/Yanmar/getVehicleByDealer",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: props.dataLogin.userId,
            dealer_id: "all",
          }),
        }
      );
      var data = await response.json();
      let { by_chassis_no_and_engine_no } = data.result[0];
      let chassisNo = [];
      by_chassis_no_and_engine_no.forEach((item) => {
        chassisNo.push({ key: item.vid, value: item.chassis_no });
      });
      if (data?.code === 200) {
        setChasiss(chassisNo);
      }
    } catch (err) {
      console.log("ERROR : Getv : ", err);
    }
  }

  function onApplyEvent(dataObject) {
    // console.log("dataObject : ", dataObject)
    // console.log("START : ", dataObject.startDate.format('YYYY-MM-DD'))
    // console.log("END : ", dataObject.endDate.format('YYYY-MM-DD'))
    // setStartDate(dataObject.startDate.format('YYYY-MM-DD'))
    // setEndDate(dataObject.endDate.format('YYYY-MM-DD'))

    startdate_temp = dataObject.startDate.format("YYYY-MM-DD");
    enddate_temp = dataObject.endDate.format("YYYY-MM-DD");

    let prm_start_date = dataObject.startDate.format("YYYY-MM-DD");
    let prm_stop_date = dataObject.endDate.format("YYYY-MM-DD");

    if (prm_start_date !== prm_start_date || prm_stop_date !== prm_stop_date) {
      this.setState({
        prm_start_date,
        prm_stop_date,
        fileNameDate:
          dataObject.startDate.format("DD-MM-YYYY HH_mm") +
          " to " +
          dataObject.endDate.format("DD-MM-YYYY HH_mm"),
      });
    }
  }

  return (
    <Suspense fallback={null}>
      <BoxContrainer
        title={rTT(t("side_menu_89"))}
        footer={
          <div style={{ textAlign: "right" }}>
            <Button
              disabled={vin === "" || loading ? true : false}
              isSearchButton={true}
              onClick={() => {
                GetData();
                setDataSource([]);
              }}
            />
          </div>
        }
      >
        <Row>
          <Col lg={12} md={12} sm={12}>
            <FormSelectSearch
              allowClear={false}
              schema={{ required: "" }}
              mode={"single"}
              label={"VIN"}
              placeholder={"VIN"}
              flex={1}
              list={chassis}
              value={vin}
              onChange={(value, e) => setVin(value ? value : "")}
            />
          </Col>

          <Col lg={12} md={12} sm={12}>
            {/* <DateRangePicker
              select_change={onApplyEvent.bind(this)}
              language={props.language}
              startDate={moment(startdate).format('DD/MM/YYYY')}
              endDate={moment(enddate).format('DD/MM/YYYY')}
            /> */}

            <DateRangePicker
              select_change={(e) => onApplyEvent(e)}
              language={props.language}
              // startDate={moment(startdate).format('DD/MM/YYYY')}
              // endDate={moment(enddate).format('DD/MM/YYYY')}
              startDate={moment(startdate_temp).format("DD/MM/YYYY")}
              endDate={moment(enddate_temp).format("DD/MM/YYYY")}
            />
          </Col>
        </Row>
      </BoxContrainer>

      <BoxContrainer>
        <FormLoading loading={loading}>
          <div>
            <Row>
              <Col lg={6} md={12} sm={24}>
                <span className="info-title">
                  {t("date_Range")} : <b>{currentDateRange}</b>
                </span>
              </Col>
              <Col lg={6} md={12} sm={24}>
                <span className="info-title">
                  {t("อัปเดตล่าสุด")} : <b>{info?.gps_date}</b>
                </span>
              </Col>
              <Col lg={6} md={12} sm={24} />
              <Col lg={6} md={12} sm={24} />
            </Row>

            <Row>
              <Col lg={6} md={12} sm={24}>
                <span className="info-title">
                  {t("dealer")} : <b>{info?.dealer_name}</b>
                </span>
              </Col>
              <Col lg={6} md={12} sm={24}>
                <span className="info-title">
                  {t("Model_Code")} : <b>{info?.model_code}</b>
                </span>
              </Col>
              <Col lg={6} md={12} sm={24}>
                <span className="info-title">
                  {t("partner_name")} : <b>{info?.customer_name}</b>
                </span>
              </Col>
              <Col lg={6} md={12} sm={24}>
                <span className="info-title">
                  {t("realtime_158")} : <b>{info?.delivery_date}</b>
                </span>
              </Col>
            </Row>

            <Row>
              <Col lg={6} md={12} sm={24}>
                <span className="info-title">
                  {t("ตำแน่งปัจจุบัน")} : <b>{info?.location}</b>
                </span>
              </Col>
              <Col lg={6} md={12} sm={24}>
                <span className="info-title">
                  {t("VIN")} : <b>{info?.vin_no}</b>
                </span>
              </Col>
              <Col lg={6} md={12} sm={24}>
                <span className="info-title">
                  {t("ph_mobile")} : <b>{info?.phone}</b>
                </span>
              </Col>
              <Col lg={6} md={12} sm={24}>
                <span className="info-title">
                  {t("realtime_157")} : <b>{info?.leased_no}</b>
                </span>
              </Col>
            </Row>

            <Row>
              <Col lg={6} md={12} sm={24}>
                <span className="info-title">
                  {t("other_reports_144")} : <b>{info?.engine_hour}</b>
                </span>
              </Col>
              <Col lg={6} md={12} sm={24}>
                <span className="info-title">
                  {t("history_118")} : <b>{info?.working_hour_start}</b>
                </span>
              </Col>
              <Col lg={6} md={12} sm={24}>
                <span className="info-title">
                  {t("history_119")} : <b>{info?.working_hour_stop}</b>
                </span>
              </Col>
              <Col lg={6} md={12} sm={24}>
                <span className="info-title">
                  {t("ระยะเวลาการทำงาน")} : <b>{info?.working_hour}</b>
                </span>
              </Col>
            </Row>
          </div>

          <div style={{ textAlign: "right" }}>
            <Button
              disabled={
                get(dataSource, "working_data", []).length > 0 ? false : true
              }
              icon={
                <i
                  class="fa fa-print"
                  aria-hidden="true"
                  style={{ width: 15, marginRight: 4 }}
                />
              }
              isSecondaryButton={true}
              text={"Export"}
              onClick={async () => {
                setLoading(true);
                await ExportPDF(dataSource);
                setLoading(false);
              }}
            />
          </div>
          <div>
            <div className="container-timeline" style={{ zoom: 0.8 }}>
              <div
                style={{
                  overflow: "scroll",
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <span className="title-chart"> ชั่วโมงการทำงาน/วัน</span>
                  <Timeline dataSource={get(dataSource, "working_data", [])} />
                </div>
              </div>
            </div>
          </div>
        </FormLoading>
      </BoxContrainer>
    </Suspense>
  );
};
const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
});

export default connect(mapStateToProps)(WorkingReport);

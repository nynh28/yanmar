import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import NotificationRedux from "../../Redux/NotificationRedux";
import { withRouter } from "react-router";
import Table from "../../Components/DataGridView/Table.js";
import { momentDate } from "../../Functions/DateMoment";
import { calculateToDuration } from "../../Functions/DateMoment";
import moment from "moment";
import { t } from "../../Components/Translation";
import { Switch } from "antd";
class DataTable extends Component {
  shouldComponentUpdate(nextProps) {
    let { messageData } = this.props;

    if (nextProps.messageData !== messageData) return true;
    return false;
  }

  render() {
    let {
      header,
      messageData,
      language,
      dataLogin,
      fileName,
      dataNote,
      dataViewAppointment,
      dataViewHour,
    } = this.props;

    return (
      <Suspense fallback={null}>
        <Table
          mode={"offline"}
          dataSource={[...messageData]}
          author={header.idToken}
          xAPIKey={header.redisKey}
          table_id={6}
          user_id={dataLogin.userId}
          editing={{
            enabled: true,
            allowUpdating: false,
            allowDeleting: false,
          }}
          showSetting={false}
          searchPanel={true}
          exportName={fileName}
          autoExpandAll={false}
          remoteOperations={true}
          selectAll={true}
          cookiesOptions={{
            enable: true,
            name: "Notification",
          }}
          columnCount="event_name"
          customButton={[
            {
              hint:
                language == "en" ? "Map" : language == "th" ? "แผนที่" : "Map",
              text:
                language == "en" ? "Map" : language == "th" ? "แผนที่" : "Map",
              // icon: "map",
              visible: true,
              onClick: (e) => {
                let dt = e.row.data;

                let data = {
                  messageType: "grid",
                  gpsdate: dt.gpsdate,
                  event_id: dt.event_id,
                  lat: dt.lat,
                  lng: dt.lng,
                  acc: dt.acc,
                  speed: dt.speed,
                  course: dt.course,
                  location: dt.location,
                  vehicle_info: {
                    vid: dt.vid,
                    vin_no: dt.vin_no,
                    licenseplate: dt.licenseplate,
                    vehicle_name: dt.vehicle_name,
                  },
                  class_type: dt.class_type,
                  speed_limit: dt.condition_val,
                  hour: dt.current_engine_hour,
                };
                this.props.setMessageInfo(data);
                this.props.history.push("/notification/information");
              },
            },
          ]}
          column={[
            {
              column_name: "model",
              column_caption: "other_reports_21",
            },
            {
              column_name: "vin_no",
              column_caption: "history_3",
            },
            {
              column_name: "engine_no",
              column_caption: "other_reports_143",
            },
            {
              column_name: "seller",
              column_caption: "dealer",
            },
            {
              column_name: "cust_name",
              column_caption: "customer_80",
            },
            {
              column_name: "official_tel",
              column_caption: "history_30",
            },
            {
              column_name: "delivery_date",
              column_caption: "realtime_158",
            },
            {
              column_name: "leased_no",
              column_caption: "realtime_157",
            },
            {
              column_name: "current_engine_hour",
              column_caption: "other_reports_144",
              // column_render: (e) => calculateToDuration(e.value, "hideSec")
            },

            {
              column_name: "event_name",
              column_caption: "event",
            },
            {
              column_name: "condition_val",
              column_caption: "other_reports_157",
            },
            {
              column_name: "gpsdate",
              column_caption: "general_6",
              column_render: (e) =>
                moment(e.value).format("DD/MM/YYYY HH:mm:ss"),
            },
            {
              column_name: "location_name_3",
              column_caption: "history_68",
            },
            {
              column_name: "location_name_2",
              column_caption: "history_69",
            },
            {
              column_name: "location_name_1",
              column_caption: "history_70",
            },
            {
              column_name: "engine_lamp_status",
              column_caption: "Maintenace_13",
              column_render: (e) =>
                e.value ? t("Maintenace_6") : t("Maintenace_5"),
            },
            {
              column_name: "maintenance_value",
              column_caption: "Maintenace_History_19",
              column_export: (e) => e.value,
            },
            {
              column_name: "appointment",
              column_caption: "Maintenace_14",
              column_export: (e) => {
                if (e.value !== "")
                  return (
                    <span>
                      {moment(e.value, "YYYY-MM-DD").format("DD/MM/YYYY")}
                    </span>
                  );
                else return "";
              },
            },
            {
              column_name: "followed",
              column_caption: "Maintenace_17",
              column_render: (e) => {
                return (
                  <center>
                    <Switch
                      checkedChildren={t("Maintenace_9")}
                      unCheckedChildren={t("Maintenace_8")}
                      checked={e.value}
                    />
                  </center>
                );
              },
              column_export: (e) => {
                if (e.value) return t("Maintenace_9");
                else return "";
              },
            },
            {
              column_name: "note",
              column_caption: "Maintenace_18",
              column_export: (e) => e.value,
            },
          ]}
        />
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  language: state.versatile.language,
  header: state.signin.header,
  messageData: state.maintenance.messageData,
  dataNote: state.maintenance.dataNote,
  dataViewAppointment: state.maintenance.dataViewAppointment,
  dataViewHour: state.maintenance.dataViewHour,
});

const mapDispatchToProps = (dispatch) => ({
  setMessageInfo: (data) => dispatch(NotificationRedux.setMessageInfo(data)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DataTable)
);

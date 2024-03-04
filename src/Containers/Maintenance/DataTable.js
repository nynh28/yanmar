import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import MaintenanceActions from "../../Redux/MaintenanceRedux";
import Table from "../../Components/DataGridView/Table.js";
import { calculateToDuration } from "../../Functions/DateMoment";
import moment from "moment";
import { Switch } from "antd";
import ModalRemark from "./ModalRemark";
import ModalAppointment from "./ModalAppointment";
import ModalNote from "./ModalNote";
import { fnUpdateNotify } from "./fnUpdateNotify";
import { t } from "../../Components/Translation";
import Modalhour from "./Modalhour";
import ArrayStore from "devextreme/data/array_store";
import DataSource from "devextreme/data/data_source";
import { FormLoading } from "../../components_new";

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  async updateFollow(id, followed) {
    this.setState({ loading: true });
    let { messageData } = this.props;
    let response = await fnUpdateNotify({
      id: id,
      language: this.props.language,
      body: { followed },
    });

    if (response === 201) {
      this.updateDataStore(id, followed, 31);
    } else {
      this.setState({ loading: false });
    }
  }

  updateDataStore(id, value, index) {
    let { dataSource, dataStore, driverData } = this.props;
    // dataStore.push([
    //   {
    //     type: "update",
    //     key: id,
    //     data: { followed: value },
    //   },
    // ]);

    // dataSource.reload();

    // let newData = [...dataSource];
    let newData = JSON.parse(JSON.stringify(dataSource._store._array));
    let idx = newData.findIndex((item) => item[0] === id);
    if (idx >= 0) {
      newData[idx][index] = value;
      this.props.setValue("dataSource", newData);
    }

    let newdataStore = new ArrayStore({
      type: "array",
      key: "0",
      data: newData,
    });

    this.props.onChangeData(
      new DataSource({
        store: newdataStore,
        reshapeOnPush: true,
      })
    );
    this.setState({ loading: false });
  }

  render() {
    let { header, messageData, language, dataLogin } = this.props;
    let { loading } = this.state;

    // console.log(this.props.dataSource);
    return (
      console.log(this.props.dataSource),
      (
        <Suspense fallback={null}>
          <FormLoading loading={loading}>
            <ModalRemark
              onChangeData={(id, data, index) => {
                this.updateDataStore(id, data, index);
              }}
            />
            <ModalAppointment
              onChangeData={(id, data, index) => {
                this.updateDataStore(id, data, index);
              }}
            />
            <ModalNote
              onChangeData={(id, data, index) =>
                this.updateDataStore(id, data, index)
              }
            />
            <Modalhour
              onChangeData={(id, data, index) => {
                this.updateDataStore(id, data, index);
              }}
            />
            <Table
              mode={"offline"}
              keyExpr={"0"}
              // dataSource={[...messageData]}
              dataSource={this.props.dataSource}
              author={header.idToken}
              xAPIKey={header.redisKey}
              table_id={6}
              user_id={dataLogin.userId}
              editing={{
                enabled: true,
                allowUpdating: false,
                allowDeleting: false,
              }}
              height={`calc(100vh - 470px)`}
              showSetting={false}
              searchPanel={true}
              autoExpandAll={false}
              remoteOperations={true}
              selectAll={true}
              scrolling="virtual"
              cookiesOptions={{
                enable: true,
                name: "Maintenance",
              }}
              columnCount="current_mileage"
              customButton={[
                {
                  hint:
                    language == "en"
                      ? "Map"
                      : language == "th"
                      ? "แผนที่"
                      : "Map",
                  text:
                    language == "en"
                      ? "Map"
                      : language == "th"
                      ? "แผนที่"
                      : "Map",
                  // icon: "map",
                  visible: true,
                  onClick: (e) => {
                    // if (this.props.history.location.pathname.toLowerCase() !== "/realtime") this.props.history.push("/realtime")
                    let dt = e.row.data;
                    let data = {
                      acc: dt[15],
                      vid: dt[3],
                      messageType: "grid",
                      gpsdate: dt[14],
                      event_id: dt[2],
                      driver_name: dt[10],
                      lat: dt[17],
                      lng: dt[18],
                      speed: dt[20],
                      course: dt[19],
                      location: dt[24],
                      licenseplate: dt[4],
                      class_type: dt[8],
                      status: dt[35],
                      vin_no: dt[11],
                      current_engine_hour: dt[7],
                    };

                    this.props.setValue("markerInfo", {
                      lat: dt[17],
                      lng: dt[18],
                      course: dt[19],
                      class_type: dt[8],
                      status: dt[35],
                      messageType: "grid",
                    });

                    this.props.setMessageInfoMtn(data);
                    this.props.history.push("/maintenance/information");
                  },
                },
              ]}
              column={[
                {
                  column_name: "9", //model
                  column_caption: "other_reports_21",
                },
                {
                  column_name: "11", //vin_no
                  column_caption: "history_3",
                },
                {
                  column_name: "6", //enging_no
                  column_caption: "other_reports_143",
                },
                // {
                //   column_name: 'mileage',
                //   column_caption: "realtime_12",
                //   column_render: (e) => numberWithComma((e.value * 0.001).toFixed(1))
                // },
                {
                  column_name: "37", // seller
                  column_caption: "dealer",
                },
                {
                  column_name: "29", //cust_name
                  column_caption: "customer_80",
                },
                {
                  column_name: "36", //official_tel
                  column_caption: "history_30",
                },
                {
                  column_name: "39", //delivery_date
                  column_caption: "realtime_158",
                },
                {
                  column_name: "38", //leased_no
                  column_caption: "realtime_157",
                },
                {
                  column_name: "7", //current_engine_hour
                  column_caption: "other_reports_144",
                  // column_render: (e) => calculateToDuration(e.value, "hideSec")
                },

                {
                  column_name: "42", //event_name
                  column_caption: "event",
                },
                {
                  column_name: "13", //condition_val
                  column_caption: "other_reports_157",
                },
                {
                  column_name: "14", //gpsdate
                  column_caption: "general_6",
                  column_render: (e) =>
                    moment(e.value).format("DD/MM/YYYY HH:mm:ss"),
                },
                {
                  column_name: "25", //loca_name_3
                  column_caption: "history_68",
                },
                {
                  column_name: "26", //loca_name_2
                  column_caption: "history_69",
                },
                {
                  column_name: "27", //location_name_1
                  column_caption: "history_70",
                },
                {
                  column_name: "engine_lamp_status", //engine_lamp_status
                  column_caption: "Maintenace_13",
                  column_render: (e) =>
                    e.value ? t("Maintenace_6") : t("Maintenace_5"),
                },
                {
                  column_name: "40", //maintenance_value
                  column_caption: "Maintenace_History_19",
                  column_render: (e) => {
                    return (
                      <center>
                        {e.value !== "" ? (
                          <span
                            onClick={() => {
                              this.props.setValue("dataViewHour", e.data);
                              this.props.setValue("showFormHourPopup", true);
                              // this.updateFollow(e.data.id)
                            }}
                          >
                            {e.value}
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              this.props.setValue("dataViewHour", e.data);
                              this.props.setValue("showFormHourPopup", true);
                            }}
                          >
                            {t("Maintenace_11")}
                          </button>
                        )}
                      </center>
                    );
                  },
                  column_export: (e) => e.value,
                },
                {
                  column_name: "30", //appointment
                  column_caption: "Maintenace_14",
                  column_render: (e) => {
                    return (
                      <center>
                        {e.value !== "" ? (
                          <span
                            onClick={() => {
                              this.props.setValue(
                                "dataViewAppointment",
                                e.data
                              );
                              this.props.setValue("showAppointmentPop", true);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            {moment(e.value, "YYYY-MM-DD").format("DD/MM/YYYY")}
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              this.props.setValue(
                                "dataViewAppointment",
                                e.data
                              );

                              this.props.setValue("showAppointmentPop", true);
                            }}
                          >
                            {t("Maintenace_10")}
                          </button>
                        )}
                      </center>
                    );
                  },
                  column_export: (e) => {
                    // console.log('e', e, e.value, moment(e.value, "YYYY-MM-DD").format("DD/MM/YYYY"))
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
                  column_name: "31", //followed
                  column_caption: "Maintenace_17",
                  column_render: (e) => {
                    return (
                      <center>
                        <Switch
                          checkedChildren={t("Maintenace_9")}
                          unCheckedChildren={t("Maintenace_8")}
                          checked={e.value}
                          onClick={(checked) =>
                            this.updateFollow(e.data[0], checked)
                          }
                        />
                      </center>
                    );
                  },
                  column_export: (e) => {
                    // console.log('e', e, e.value, moment(e.value, "YYYY-MM-DD").format("DD/MM/YYYY"))
                    if (e.value) return t("Maintenace_9");
                    else return "";
                  },
                },
                {
                  column_name: "41", //note
                  column_caption: "Maintenace_18",
                  column_render: (e) => {
                    return (
                      <center>
                        <button
                          type="button"
                          onClick={() => {
                            this.props.setValue("dataViewRemark", e.data);
                            this.props.setValue("showFormPopup", true);
                          }}
                        >
                          {e.value !== ""
                            ? t("Maintenace_12")
                            : t("Maintenace_11")}
                        </button>
                      </center>
                    );
                  },
                  column_export: (e) => e.value,
                },
                // {
                //   column_name: "official_tel",
                //   column_caption: "Maintenace_21",
                //   // column_render: (e) => {
                //   //   return (<center>
                //   //     <button type="button" onClick={() => {
                //   //       console.log('sdfsdf')
                //   //       this.props.setValue("dataNote", e.data)
                //   //       this.props.setValue("showNotePopup", true)
                //   //     }}>{e.value !== "" ? t('Maintenace_12') : t('Maintenace_11')}</button>
                //   //   </center>)
                //   // },
                //   // column_export: (e) => e.value
                // },
                // {
                //   column_name: "note",
                //   column_caption: "Maintenace_22",
                //   column_render: (e) => {
                //     return (<center>
                //       <button type="button" onClick={() => {
                //         this.props.setValue("dataNote", e.data)
                //         this.props.setValue("showNotePopup", true)
                //       }}>{e.value !== "" ? t('Maintenace_12') : t('Maintenace_11')}</button>
                //     </center>)
                //   },
                //   column_export: (e) => e.value
                // }
              ]}
            />
          </FormLoading>
        </Suspense>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  language: state.versatile.language,
  header: state.signin.header,
  messageData: state.maintenance.messageData,
});

const mapDispatchToProps = (dispatch) => ({
  setMessageInfoMtn: (data) =>
    dispatch(MaintenanceActions.setMessageInfoMtn(data)),
  setValue: (name, value) => dispatch(MaintenanceActions.setValue(name, value)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DataTable)
);

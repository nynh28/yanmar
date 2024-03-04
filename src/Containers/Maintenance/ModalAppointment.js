import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import MaintenanceRedux from "../../Redux/MaintenanceRedux";
import { Modal } from "antd";
import { t } from "../../Components/Translation";
import { fnUpdateNotify } from "./fnUpdateNotify";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { get, isEmpty } from "lodash";
import "./custom.css";

const DatePicker = (arg) => {
  const { t } = useTranslation();

  return (
    <>
      {arg.value && (
        <i
          id="date-close"
          className="fas fa-times-circle"
          onClick={() => arg.onChange("")}
        ></i>
      )}

      <DateRangePicker
        autoUpdateInput={false}
        locale={{ format: "DD/MM/YYYY" }}
        onApply={(e, p) => arg.onChange(p.startDate.format("DD/MM/YYYY"))}
        autoApply={true}
        singleDatePicker
        showDropdowns
      >
        <input
          className="form-control"
          value={arg.value || ""}
          placeholder={t("Maintenace_19")}
        />
      </DateRangePicker>
    </>
  );
};

class ModalAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.updateAppointment = this.updateAppointment.bind(this);
  }

  componentDidMount() {
    if (get(this.props.dataViewAppointment, "appointment"))
      this.setState({ value: this.props.dataViewAppointment[30] });
  }

  shouldComponentUpdate(nextProps) {
    let { dataViewAppointment, messageData } = this.props;

    if (nextProps.dataViewAppointment !== dataViewAppointment) {
      this.setState({
        value: !isEmpty(nextProps.dataViewAppointment[30])
          ? moment(nextProps.dataViewAppointment[30], "YYYY-MM-DD").format(
              "DD/MM/YYYY"
            )
          : "",
      });
    }

    if (nextProps.messageData !== messageData) return false;

    return true;
  }

  async updateAppointment() {
    let { dataViewAppointment, messageData } = this.props;
    let appointmentDate = "";
    if (this.state.value !== "") {
      appointmentDate = moment(this.state.value, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );
    }

    let response = await fnUpdateNotify({
      id: dataViewAppointment[0],
      language: this.props.language,
      body: { appointment: appointmentDate },
    });

    this.props.setValue("showAppointmentPop", false);
    if (response === 201) {
      // let newData = JSON.parse(JSON.stringify(messageData));
      // let idx = messageData.findIndex(
      //   (item) => item[0] === dataViewAppointment.id
      // );
      // if (idx >= 0) {
      //   newData[idx][30] = appointmentDate;
      // }

      this.props.onChangeData(dataViewAppointment[0], appointmentDate, 30);

      // setTimeout(() => this.props.setValue("messageData", newData), 500);
    }
  }

  render() {
    let { showAppointmentPop } = this.props;

    return (
      <Suspense fallback={null}>
        <Modal
          title={t("เพิ่มวันที่นัดหมายการเข้าศูนย์บริการ")}
          visible={showAppointmentPop}
          okText={t("add")}
          cancelText={t("cancel")}
          onOk={this.updateAppointment}
          onCancel={() => {
            this.props.setValue("dataViewAppointment", {});
            this.props.setValue("showAppointmentPop", false);
          }}
        >
          <DatePicker
            value={this.state.value}
            onChange={(value) => {
              this.setState({ value: value });
            }}
          />
        </Modal>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.versatile.language,
  showAppointmentPop: state.maintenance.showAppointmentPop,
  dataViewAppointment: state.maintenance.dataViewAppointment,
  messageData: state.maintenance.messageData,
});

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(MaintenanceRedux.setValue(name, value)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ModalAppointment)
);

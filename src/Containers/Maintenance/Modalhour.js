import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import MaintenanceRedux from "../../Redux/MaintenanceRedux";
import { Modal } from "antd";
import { t, rTT } from "../../Components/Translation";
import { fnUpdateNotify } from "./fnUpdateNotify";
import { get } from "lodash";

class Modalhour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.updateHour = this.updateHour.bind(this);
  }

  componentDidMount() {
    if (get(this.props.dataViewHour, "maintenance_value"))
      this.setState({ value: this.props.dataViewHour[40] });
  }

  shouldComponentUpdate(nextProps) {
    let { dataViewHour, messageData } = this.props;

    if (nextProps.dataViewHour !== dataViewHour) {
      this.setState({ value: nextProps.dataViewHour[40] || "" });
    }

    if (nextProps.messageData !== messageData) return false;

    return true;
  }

  async updateHour() {
    // let { dataViewHour, messageData } = this.props
    // let newData = JSON.parse(JSON.stringify(messageData))
    // let idx = messageData.findIndex(item => item.id === dataViewHour.id)

    // console.log("dataviewhour", dataViewHour)
    // if (idx >= 0) {
    //   newData[idx].hour = this.state.value
    // }
    // this.props.setValue("showFormHourPopup", false)
    // console.log("newdata", newData)

    // setTimeout(() => this.props.setValue("messageData", newData), 500)

    // return
    let { dataViewHour, messageData } = this.props;
    let response = await fnUpdateNotify({
      id: dataViewHour[0],
      language: this.props.language,
      body: { maintenance_value: this.state.value },
    });

    this.props.setValue("showFormHourPopup", false);
    if (response === 201) {
      this.props.onChangeData(dataViewHour[0], this.state.value, 40);
      //   let newData = JSON.parse(JSON.stringify(messageData))
      //   let idx = messageData.findIndex(item => item.id === dataViewHour.id)
      //   if (idx >= 0) {
      //     newData[idx].maintenance_value = this.state.value
      //   }

      //   setTimeout(() => this.props.setValue("messageData", newData), 500)
      // }
    }
  }

  render() {
    let { showFormHourPopup } = this.props;

    return (
      <Suspense fallback={null}>
        <Modal
          title={t("Maintenace_20")}
          visible={showFormHourPopup}
          okText={t("add")}
          cancelText={t("cancel")}
          onOk={
            this.updateHour
            // console.log(this.state.value)
          }
          onCancel={() => {
            this.props.setValue("dataViewHour", {});
            this.props.setValue("showFormHourPopup", false);
          }}
        >
          <textarea
            rows="1"
            className="form-control"
            value={this.state.value}
            placeholder={rTT(t("Maintenace_18"))}
            onChange={(e) => this.setState({ value: e.target.value })}
          />
        </Modal>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.versatile.language,
  showFormHourPopup: state.maintenance.showFormHourPopup,
  dataViewHour: state.maintenance.dataViewHour,
  messageData: state.maintenance.messageData,
});

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(MaintenanceRedux.setValue(name, value)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Modalhour)
);

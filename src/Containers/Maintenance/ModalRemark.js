import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import MaintenanceRedux from "../../Redux/MaintenanceRedux";
import { Modal } from "antd";
import { t, rTT } from "../../Components/Translation";
import { fnUpdateNotify } from "./fnUpdateNotify";
import { get } from "lodash";

class ModalRemark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.updateRemark = this.updateRemark.bind(this);
  }

  componentDidMount() {
    if (get(this.props.dataViewRemark, "remark"))
      this.setState({ value: this.props.dataViewRemark[41] });
  }

  shouldComponentUpdate(nextProps) {
    let { dataViewRemark, messageData } = this.props;

    if (nextProps.dataViewRemark !== dataViewRemark) {
      this.setState({ value: nextProps.dataViewRemark[41] });
    }

    if (nextProps.messageData !== messageData) return false;

    return true;
  }

  async updateRemark() {
    let { dataViewRemark, messageData } = this.props;
    let response = await fnUpdateNotify({
      id: dataViewRemark[0],
      language: this.props.language,
      body: { note: this.state.value },
    });

    this.props.setValue("showFormPopup", false);
    if (response === 201) {
      this.props.onChangeData(dataViewRemark[0], this.state.value, 41);
      // let newData = JSON.parse(JSON.stringify(messageData));
      // let idx = messageData.findIndex((item) => item[0] === dataViewRemark.id);
      // if (idx >= 0) {
      //   newData[idx][41] = this.state.value;
      // }

      // setTimeout(() => this.props.setValue("messageData", newData), 500);
    }
  }

  render() {
    let { showFormPopup } = this.props;

    return (
      <Suspense fallback={null}>
        <Modal
          title={t("Maintenace_20")}
          visible={showFormPopup}
          okText={t("add")}
          cancelText={t("cancel")}
          onOk={this.updateRemark}
          onCancel={() => {
            this.props.setValue("dataViewRemark", {});
            this.props.setValue("showFormPopup", false);
          }}
        >
          <textarea
            rows="10"
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
  showFormPopup: state.maintenance.showFormPopup,
  dataViewRemark: state.maintenance.dataViewRemark,
  messageData: state.maintenance.messageData,
});

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(MaintenanceRedux.setValue(name, value)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ModalRemark)
);

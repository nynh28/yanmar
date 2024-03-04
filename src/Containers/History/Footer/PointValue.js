import React, { Component } from 'react';
import { connect } from 'react-redux'
import { momentDate } from '../../../Functions/DateMoment'
import { numberWithComma } from '../../../Functions/Calculation'
import { t } from '../../../Components/Translation';

const { get } = require('lodash')

class ValuePoint extends Component {
  render() {
    let { pointValue } = this.props
    let speed = pointValue.speed !== "" ? pointValue.speed : "-"
    let rpm = pointValue.rpm !== "" ? pointValue.rpm : "-"
    let fuel = pointValue.fuel !== "" ? pointValue.fuel : "-"
    let canbus_cooltemp = pointValue.canbus_cooltemp !== "" ? pointValue.canbus_cooltemp : "-"
    let canbus_acc_pedal = pointValue.canbus_acc_pedal !== "" ? pointValue.canbus_acc_pedal : "-"
    let temp = pointValue.temp !== "" ? pointValue.temp : "-"

    let styles = { paddingRight: 20, fontSize: 12 }
    return (
      <div>
        <span style={styles}><b>{t("realtime_11")} : </b>{speed} {pointValue.speed !== "" && t("realtime_41")}</span>
        <span style={styles}><b>{t("history_10")} : </b>{numberWithComma(rpm)} {pointValue.rpm !== "" && t("realtime_42")}</span>
        <span style={styles}><b>{t("history_13")} : </b>{fuel} {pointValue.fuel !== "" && t("%")}</span>
        <span style={styles}><b>{t("history_15")} : </b>{canbus_cooltemp} {pointValue.canbus_cooltemp !== "" && t("realtime_48")}</span>
        <span style={styles}><b>{t("history_17")} : </b>{canbus_acc_pedal} {pointValue.canbus_acc_pedal !== "" && t("%")}</span>
        {
          (this.props.dataLogin.userId == 117 || this.props.dataLogin.userId == 2656 || this.props.dataLogin.userId == 2657) &&
          <span style={styles}><b>{t("history_44")} : </b>{temp} {pointValue.temp !== "" && t("realtime_48")}</span>
        }
        <span style={styles}><b>{t("history_19")} :</b> {momentDate(pointValue.date)}</span >
        <a className="btn btn-option btn-sm"
          onClick={() => this.props.resetChart()}>
          <i className="fa fa-undo" title={"Reset"}></i>
        </a>
      </div >
    )
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  pointValue: state.history.pointValue
});

export default connect(mapStateToProps)(ValuePoint)

import React, { Component } from "react";
import $ from "jquery";
import { t } from "../../../Components/Translation";
import { connect } from "react-redux";
import RealtimeNewActions from "../../../Redux/RealtimeNewRedux";

class MaintenanceStatus extends Component {
  shouldComponentUpdate(nextProps) {
    let { dashboardSummary } = this.props;
    if (
      nextProps.dashboardSummary.maintenance_status !==
      dashboardSummary.maintenance_status
    ) {
      return true;
    }
    return false;
  }

  _onCollapseComponent = () => {
    let myibox2 = $(`#content-colaps`);
    myibox2.slideToggle(200);
  };

  setPanel(vid_list, title1, value, title2 = "", color = "#ff3b30") {
    let _color = parseInt(value) === 0 ? "#ADADAD" : "#ff3b30";
    return (
      <div
        style={{
          minHeight: 74,
          marginBottom: 7,
          backgroundColor: title1 !== "" ? "white" : "#C0C0C0",
          border: "2px solid #e7eaec",
          borderRadius: 5,
          cursor: vid_list.length > 0 && "pointer",
        }}
        onClick={() => {
          if (vid_list.length > 0) {
            if (vid_list) {
              this.props.setDisplayVehicle([], true);
              this.props.getInformationMarkerSucc([], "List");
            }
            this.props.setDisplayVehicle(vid_list, true);
            window.scroll({ top: 5555, behavior: "smooth" });
            this.props.setHideFooter(true);
          }
        }}
      >
        <div style={{ paddingTop: 3, paddingLeft: 10 }}>
          <div>
            <div className="pull-right text-right">
              <label
                style={{
                  fontSize: 35,
                  color: _color,
                  fontWeight: "bold",
                  marginRight: 5,
                  marginLeft: 5,
                }}
              >
                {value}
              </label>
            </div>
            <p
              style={{
                fontSize: 16,
                marginBottom: "1em",
                color: color === "#e7eaec" && color,
              }}
            >
              {t(title1)}
              {title2 !== "" && <br />}
              {title2 !== "" && t(title2)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  render() {
    let data = this.props.dashboardSummary.maintenance_status.status;
    let paneLeftStyles = { width: "50%", marginRight: "0.5%" };
    let paneRightStyles = { width: "50%", marginLeft: "0.5%" };

    // console.log("maintenance_status : ", data)
    return (
      <div>
        <div style={{ flexDirection: "row", display: "flex" }}>
          <div style={paneLeftStyles}>
            {" "}
            {this.setPanel(
              data["0"].vid_list,
              "realtime_159",
              data["0"].count,
              ""
            )}
          </div>
          <div style={paneRightStyles}>
            {" "}
            {this.setPanel(
              data["1"].vid_list,
              "realtime_160",
              data["1"].count,
              ""
            )}
          </div>
        </div>
        <div style={{ flexDirection: "row", display: "flex" }}>
          <div style={paneLeftStyles}>
            {" "}
            {this.setPanel(
              data["2"].vid_list,
              "realtime_65",
              data["2"].count,
              ""
            )}
          </div>
          <div style={paneLeftStyles}>
            {" "}
            {this.setPanel(
              data["3"].vid_list,
              "realtime_77",
              data["3"].count,
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialVehiclesData: state.realtimeNew.initialVehiclesData,
    vehiclesLoading: state.realtimeNew.vehiclesLoading,
    dashboardSummary: state.realtimeNew.dashboardSummary,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDisplayVehicle: (listVehicles, isFilter) =>
      dispatch(RealtimeNewActions.setDisplayVehicle(listVehicles, isFilter)),
    setHideFooter: (value) => dispatch(RealtimeNewActions.setHideFooter(value)),
    getInformationMarkerSucc: (information, callFrom) =>
      dispatch(
        RealtimeNewActions.getInformationMarkerSucc(information, callFrom)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceStatus);

import React, { Component } from "react";
import $ from "jquery";
import { t } from "../../../Components/Translation";
import { connect } from "react-redux";
import RealtimeNewActions from "../../../Redux/RealtimeNewRedux";

class DrivingBehavior extends Component {
  shouldComponentUpdate(nextProps) {
    let { dashboardSummary } = this.props;
    if (
      nextProps.dashboardSummary.dash_behaviour_bar !==
      dashboardSummary.dash_behaviour_bar
    ) {
      return true;
    }
    return false;
  }

  _onCollapseComponent = () => {
    let myibox2 = $(`#content-colaps`);
    myibox2.slideToggle(200);
  };

  setPanel(vid_list, title1, value, title2 = "") {
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
            <p style={{ fontSize: 16, marginBottom: "1em" }}>
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
    let data = this.props.dashboardSummary.dash_behaviour_bar.status;

    let paneLeftStyles = { width: "50%", marginRight: "0.5%" };
    let paneRightStyles = { width: "50%", marginLeft: "0.5%" };

    // console.log("dash_behaviour_bar : ", data)

    return (
      <div>
        <div style={{ flexDirection: "row", display: "flex" }}>
          <div style={paneLeftStyles}>
            {" "}
            {this.setPanel(
              data["0"].vid_list,
              "realtime_161",
              data["0"].count,
              ""
            )}
          </div>
          <div style={paneLeftStyles}>
            {" "}
            {this.setPanel(
              data["1"].vid_list,
              "realtime_162",
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
              "realtime_163",
              data["2"].count,
              ""
            )}
          </div>
          <div style={paneLeftStyles}>
            {" "}
            {this.setPanel(
              data["3"].vid_list,
              "realtime_164",
              data["3"].count,
              ""
            )}
          </div>
        </div>
        <div style={{ flexDirection: "row", display: "flex" }}>
          <div style={paneLeftStyles}>
            {" "}
            {this.setPanel(
              data["4"].vid_list,
              "realtime_165",
              data["4"].count,
              ""
            )}
          </div>
          <div style={paneLeftStyles}>
            {" "}
            {this.setPanel(
              data["5"].vid_list,
              "realtime_166",
              data["5"].count,
              ""
            )}
          </div>
        </div>
        <div style={{ flexDirection: "row", display: "flex" }}>
          <div style={paneLeftStyles}>
            {" "}
            {this.setPanel(
              data["6"].vid_list,
              "realtime_167",
              data["6"].count,
              ""
            )}
          </div>
          <div style={paneLeftStyles}>
            {" "}
            {this.setPanel(
              data["7"].vid_list,
              "realtime_168",
              data["7"].count,
              ""
            )}
          </div>
        </div>
        <div style={{ flexDirection: "row", display: "flex" }}>
          <div style={paneLeftStyles}>
            {" "}
            {this.setPanel(
              data["8"].vid_list,
              "realtime_169",
              data["8"].count,
              ""
            )}
          </div>
        </div>
        <div style={{ flexDirection: "row", display: "flex" }}>
          <div style={paneRightStyles}></div>
          <div style={paneRightStyles}></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DrivingBehavior);

import React from "react";
import { connect } from "react-redux";
import { t, rTT } from "../../Components/Translation";
import RealtimeNewActions from "../../Redux/RealtimeNewRedux";

class DashboardChart extends React.Component {
  shouldComponentUpdate(nextProps) {
    let { dashboardSummary } = this.props;
    if (
      nextProps.dashboardSummary.dash_count_bar !==
      dashboardSummary.dash_count_bar
    ) {
      return true;
    }
    return false;
  }

  setPanel(vid_list = [], title1, value, title2 = "") {
    return (
      <div
        style={{
          marginBottom: 15,
          backgroundColor: title1 !== "" ? "white" : "#C0C0C0",
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
        <div
          style={{
            paddingTop: 3,
            paddingLeft: 5,
          }}
        >
          <div>
            <div className="pull-right ">
              <label style={{ fontSize: 30 }}>{value}</label>
            </div>

            <p
              style={{
                fontSize: 16,
                marginBottom: "5em",
                color: "black",
                fontWeight: "normal",
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
    let data = this.props.dashboardSummary?.dash_count_bar?.status;
    let paneLeftStyles = { width: "50%", marginRight: 15 };
    // return (<></>)
    // console.log("dashboardSummary : ", data)
    return (
      <div>
        <div style={{ flexDirection: "row", display: "flex" }}>
          <img
            style={{ alignItems: "start", height: "60px" }}
            src="../icons/MarkerTractor/whitebg.png"
          ></img>
          <div style={paneLeftStyles}>
            {" "}
            {this.setPanel(
              data["1"]?.vid_list,
              rTT(t("realtime_197")),
              data["1"]?.count,
              ""
            )}
          </div>
          <img
            style={{ alignItems: "left", height: "60px" }}
            src="../icons/MarkerTractor/greybg.png"
          ></img>
          <div style={paneLeftStyles}>
            {" "}
            {this.setPanel(
              data["0"]?.vid_list,
              rTT(t("realtime_198")),
              data["0"]?.count,
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dashboardSummary: state.realtimeNew.dashboardSummary,
});

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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardChart);

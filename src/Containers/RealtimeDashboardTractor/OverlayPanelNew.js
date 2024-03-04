import React, { Suspense } from "react";
import { connect } from "react-redux";
import VehicleList from "./OverlayPanelBoxNew/VehicleList";
import RealtimeNewActions from "../../Redux/RealtimeNewRedux";
import "./Styles/style-overlay-panel-realtime-new.css";
import Tabbed from "../../Components/Tabbed";
import ButtonExport from "./ButtonExport";

class OverlayPanelNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  swicthTabs(active) {
    this.props.setStateReduxRealtime({ activeTabOverlay: active });
  }

  render() {
    let { activeTabOverlay, hideOverlayPanel, initialVehiclesData, isLoading } =
      this.props;
    // console.log('isLoading', isLoading)
    return (
      <Suspense fallback={null}>
        <div className="box-overlay-panel-realtime">
          <div style={{ height: "100%", paddingTop: 0 /*165*/ }}>
            <div
              style={{
                height: 70,
                width: 25,
                cursor: "pointer",
                paddingTop: 25,
                boxShadow: "0 2px 6px rgba(0,0,0,.3)",
                backgroundColor: "white",
                borderRadius: "4px 0px 0px 4px",
              }}
              onClick={() =>
                this.props.setStateReduxRealtime({
                  hideOverlayPanel: !hideOverlayPanel,
                })
              }
            >
              <center>
                <i
                  className={
                    "fa " +
                    (hideOverlayPanel ? "fa-chevron-left" : "fa-chevron-right")
                  }
                ></i>
              </center>
            </div>
          </div>

          <div
            className="tabs-container detail-overlay-realtime"
            id={"overlay-panel-colaps"}
            style={{
              display: hideOverlayPanel ? "none" : "inline-block",
            }}
          >
            <Tabbed
              id={"overlay-panel-001"}
              // activeKey={activeTabOverlay}
              tabBarExtraContent={{
                right: <ButtonExport />,
              }}
              className="overflow-auto max-h-[calc(100vh_-_140px)] flex"
              defaultActiveKey={activeTabOverlay}
              tabPosition={"top"}
              onActive={(active) => this.swicthTabs(active)}
              tabPaneStyles={{ marginTop: -15, height: '100%' }}
              tabName={[
                <span>
                  <img
                    style={{ height: 20, width: 30 }}
                    src="../icons/tractor.png"
                  />
                </span>,
              ]}
              tabPane={[
                <VehicleList
                  initialVehiclesData={initialVehiclesData}
                  isLoading={isLoading}
                />,
              ]}
            />
          </div>
        </div>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  hideOverlayPanel: state.realtimeNew.hideOverlayPanel,
  activeTabOverlay: state.realtimeNew.activeTabOverlay,
});

const mapDispatchToProps = (dispatch) => ({
  setActiveTab: (activeTab) =>
    dispatch(RealtimeNewActions.setActiveTab(activeTab)),
  getInformationMarker: (vid, callFrom) =>
    dispatch(RealtimeNewActions.getInformationMarker(vid, callFrom)),
  setStateReduxRealtime: (objStateRudux) =>
    dispatch(RealtimeNewActions.setStateReduxRealtime(objStateRudux)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OverlayPanelNew);

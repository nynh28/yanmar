import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import Tabbed from "../../Components/Tabbed";
import { t } from "../../Components/Translation";
import { connect } from "react-redux";
import DrivingBehavior from "./Tabs/DrivingBehavior";
import MaintenanceStatus from "./Tabs/MaintenanceStatus";
import RealtimeNewActions from "../../Redux/RealtimeNewRedux";
import DashboardChart from "./DashboardChart";
import BoxContrainer from "../../components_new/BoxContrainer";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.admin_role_array = [1, 2, 21, 22];
    this.state = {
      data: [],
    };
  }

  shouldComponentUpdate(nextProps) {
    let { activeTabDashboard } = this.props;
    if (nextProps.activeTabDashboard !== activeTabDashboard) {
      return false;
    }
    return true;
  }

  swicthTabs(active) {
    this.props.setStateReduxRealtime({ activeTabDashboard: active });
  }

  render() {
    let { lastTime, activeTabDashboard } = this.props;

    return (
      <Row className="layout-padding-three" style={{ marginBottom: 8 }}>
        <Col lg={7}>
          <BoxContrainer
            iconAwesome={
              <i
                className="fa fa-location-arrow"
                aria-hidden="true"
                style={{ marginRight: 10 }}
              />
            }
            title="realtime_88"
            toolbarLeft={":  " + lastTime}
            // boxContrainerStyles={{ width: '99%' }}
            boxContentStyles={{ minHeight: 450 }}
          >
            <DashboardChart />
          </BoxContrainer>
        </Col>

        <Col lg={5}>
          <BoxContrainer boxContentStyles={{ minHeight: 506 }}>
            <Tabbed
              id={"dashboard"}
              defaultActiveKey={activeTabDashboard}
              onActive={(active) => this.swicthTabs(active)}
              tabPosition={"top"}
              tabName={[
                <span>
                  <img
                    src="../icons/tractor.png"
                    style={{ paddingRight: 4, height: 20, width: 30 }}
                  />
                  {t("realtime_199")}
                </span>,
                <span>
                  <i
                    className="fas fa-tools"
                    aria-hidden="true"
                    style={{ paddingRight: 4 }}
                  ></i>
                  {t("realtime_177")}
                </span>,
              ]}
              tabPane={[
                // Driving Behavior
                <DrivingBehavior key="tab_driving_behavior" />,
                // Maintenance Status
                <MaintenanceStatus key="tab_maintenance_status" />,
              ]}
            />
          </BoxContrainer>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataLogin: state.signin.dataLogin,
    activeTabDashboard: state.realtimeNew.activeTabDashboard,
    lastTime: state.realtimeNew.lastTime,
    vehiclesLoading: state.realtimeNew.vehiclesLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setStateReduxRealtime: (objStateRudux) =>
      dispatch(RealtimeNewActions.setStateReduxRealtime(objStateRudux)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

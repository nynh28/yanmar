import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import Map from "./Map";
import Search from "./Search";
import $ from "jquery";
import { Hidden } from "@material-ui/core";
import { BoxContrainer, Button } from "../../components_new";

class ControlRoomDealerDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowPanel: true,
      alertSetting: {
        show: false,
        type: 2,
        content: "",
        validateCode: false,
      },
    };
    // this.startDate
    // this.stopDate
  }

  componentWillMount() {}

  componentDidUpdate(prevProps) {
    // let { infoInstall } = this.props
    // if (prevProps.infoInstall !== infoInstall) this.setAlertSetting(false, 5)
    let { showDashboard } = this.props;
    if (prevProps.showDashboard !== showDashboard) {
      if (!this.state.isShowPanel) this.setState({ isShowPanel: true });
      this._onCollapseComponent();
    }
  }

  _onCollapseComponent = () => {
    let myibox2 = $(`#content-colaps`);
    myibox2.slideToggle(600);
  };

  setAlertSetting(isShow, type, content = "", ErrorSubcode) {
    let { alertSetting } = this.state;
    alertSetting.show = isShow;
    alertSetting.type = type;
    alertSetting.content = content;
    alertSetting.ErrorSubcode = ErrorSubcode;
    this.setState({ alertSetting });
  }

  render() {
    let { alertSetting } = this.state;
    let {} = this.props;

    return (
      <Suspense fallback={null}>
        <div id={"content-colaps"} style={{ backgroundColor: "#bac2c4" }}>
          <Search />
        </div>
        <Map onDashboardChange={(e) => this._onCollapseComponent()} />
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  header: state.signin.header,
  dataLogin: state.signin.dataLogin,

  statusSubmit: state.subscription.statusSubmit,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlRoomDealerDashboard);

import React, { Component } from 'react';
import { connect } from 'react-redux'
import RealtimeActions from '../../Redux/RealtimeRedux'
import Dashboard from './Dashboard'
import $ from 'jquery'

class DashboardPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowPanel: true,
    }
  }

  componentWillUnmount() {
    this.props.setStateMapControl("dashboardEnabled", this.props.showDashboard)
  }

  componentDidMount() {
    if (!this.props.dashboardEnabled) this.setState({ isShowPanel: false })
  }

  componentDidUpdate(prevProps) {
    let { showDashboard } = this.props
    if (prevProps.showDashboard !== showDashboard) {
      if (!this.state.isShowPanel) this.setState({ isShowPanel: true })
      this._onCollapseComponent()
    }
  }

  _onCollapseComponent = () => {
    let myibox2 = $(`#content-colaps`)
    myibox2.slideToggle(600);
  }

  render() {
    return (
      this.state.isShowPanel && <div id={"content-colaps"} style={{ backgroundColor: "#bac2c4", marginBottom: -20, padding: "0px 27px 0px 27px" }}>
        <Dashboard vehicles={this.props.vehicles} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  dashboardEnabled: state.realtime.dashboardEnabled,
  showDashboard: state.realtime.showDashboard,
  vehicles: state.realtime.vehicles
});

const mapDispatchToProps = (dispatch) => ({
  setStateMapControl: (name, value) => dispatch(RealtimeActions.setStateMapControl(name, value)),
});
export default (connect(mapStateToProps, mapDispatchToProps)(DashboardPanel))
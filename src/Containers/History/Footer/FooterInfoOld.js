import React, { Component } from 'react'
import { connect } from 'react-redux'
import HistoryActions from '../../../Redux/HistoryRedux'
import { get } from 'lodash'

import { Row } from "reactstrap";
import '../Styles/stylesfooter.css'
import '../Styles/animation.css'
import '../Styles/fontello-codes.css'
import '../Styles/fontello-embedded.css'
import '../Styles/fontello-ie7-codes.css'
import '../Styles/fontello-ie7.css'
import '../Styles/fontello.css'

import '../Styles/font/fontello.eot'
import '../Styles/font/fontello.svg'
import '../Styles/font/fontello.ttf'
import '../Styles/font/fontello.woff'
import '../Styles/font/fontello.woff2'

// Tools
import PointValue from './PointValue'
import ToolsPlayTour from './ToolsPlayTour'

// Charts
import SpeedChart from '../Charts/Speed'
import RPMChart from '../Charts/RPM'
import FuelChart from '../Charts/Fuel'
import CoolantChart from '../Charts/Coolant'

class FooterInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabSpeed: true,
      tabRPM: false,
      tabFuel: false,
      tabCoolant: false,
      chartName: "speed",
      hideFooterHis: false
    }
  }

  selectTab(e) {
    for (var i = 0; i < document.getElementsByClassName('tabclick').length; i++) {
      document.getElementsByClassName('tabclick')[i].classList.remove("active")
    }
    e.target.parentElement.classList.add("active");

    switch (e.target.getAttribute("button_value")) {

      case "tabSpeed":
        this.setState({
          tabSpeed: true,
          tabRPM: false,
          tabFuel: false,
          tabCoolant: false,
          chartName: 'speed'
        })
        break;
      case "tabRPM":
        this.setState({
          tabSpeed: false,
          tabRPM: true,
          tabFuel: false,
          tabCoolant: false,
          chartName: 'rpm'
        })
        break;
      case "tabFuel":
        this.setState({
          tabSpeed: false,
          tabRPM: false,
          tabFuel: true,
          tabCoolant: false,
          chartName: 'fuel'
        })
        break;
      case "tabCoolant":
        this.setState({
          tabSpeed: false,
          tabRPM: false,
          tabFuel: false,
          tabCoolant: true,
          chartName: 'coolant'
        })
        break;
    }
  }

  componentWillUnmount() {
    this.props.setStateReduxHistory('hideFooterHis', false)
  }

  render() {
    let { tabSpeed, tabRPM, tabFuel, tabCoolant, chartName } = this.state

    return (
      <Row style={{ marginBottom: -15 }}>
        {
          !this.props.loading && get(this.props.dataHistory, 'trips', []).length &&
          <div style={{ width: 80, marginLeft: 15 }}>
            <div style={{ backgroundColor: 'white', cursor: 'pointer', boxShadow: '0px -2px 6px rgba(0,0,0,0.3)', padding: 5, width: '100%' }}
              onClick={() => this.props.setHideFooterHis()}>
              <center><i className={"fa " + (this.props.hideFooterHis ? "fa-chevron-up" : "fa-chevron-down")}></i></center>
            </div>
          </div>
        }

        {
          !this.props.loading && get(this.props.dataHistory, 'trips', []).length && !this.props.hideFooterHis &&
          <div style={{ backgroundColor: 'white', width: '100%', maxHeight: '250px', zIndex: 2 }}>
            <div className="row" >
              <div className="col-lg-12">
                <div className="tabs-container" >
                  <ul className="nav nav-tabs nav-tabs-chart" >
                    <li onClick={this.selectTab.bind(this)} className="tabclick active"><a button_value="tabSpeed">Vehicle Usage</a></li>
                    <li onClick={this.selectTab.bind(this)} className="tabclick"><a button_value="tabRPM">RPM</a></li>
                    <li onClick={this.selectTab.bind(this)} className="tabclick"><a button_value="tabFuel">Fuel Tank Level</a></li>
                    <li onClick={this.selectTab.bind(this)} className="tabclick"><a button_value="tabCoolant">Coolant</a></li>
                  </ul>
                  <div className="tab-content" style={{ height: 180, boxShadow: 'inset 1px 2px rgba(0,0,0,.075)' }}>
                    <div className="bar-tools">
                      <ToolsPlayTour chartName={chartName} />
                      <div className="bar-tools-right">
                        <PointValue />
                      </div>
                    </div>

                    {tabSpeed && (
                      <div style={{ display: 'block' }} id="tab-1" className="tab-pane">
                        <div className="panel-body" >
                          <div style={{ padding: '20px' }}>
                            <SpeedChart chartHeight={140} chartName={chartName}></SpeedChart>
                          </div>
                        </div>
                      </div>
                    )}

                    {tabRPM && (
                      <div style={{ display: 'block' }} id="tab-2" className="tab-pane">
                        <div className="panel-body">
                          <div style={{ padding: '20px' }}>
                            <RPMChart chartHeight={140} chartName={chartName}></RPMChart>
                          </div>
                        </div>
                      </div>
                    )}

                    {tabFuel && (
                      <div style={{ display: 'block' }} id="tab-4" className="tab-pane">
                        <div className="panel-body">
                          <div style={{ padding: '20px' }}>
                            <FuelChart chartHeight={140} chartName={chartName}></FuelChart>
                          </div>
                        </div>
                      </div>
                    )}

                    {tabCoolant && (
                      <div style={{ display: 'block' }} id="tab-4" className="tab-pane">
                        <div className="panel-body">
                          <div style={{ padding: '20px' }}>
                            <CoolantChart chartHeight={140} chartName={chartName}></CoolantChart>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </Row >
    )
  }
}

const mapStateToProps = (state) => ({
  hideFooterHis: state.history.hideFooterHis,
  dataHistory: state.history.dataHistory,
  loading: state.history.loading
});

const mapDispatchToProps = (dispatch) => ({
  setHideFooterHis: () => dispatch(HistoryActions.setHideFooterHis()),
  setStateReduxHistory: (name, value) => dispatch(HistoryActions.setStateReduxHistory(name, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FooterInfo)

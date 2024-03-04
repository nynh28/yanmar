import React, { Component } from 'react'
import { connect } from 'react-redux'

import HistoryActions from '../../Redux/HistoryRedux'
import './Styles/stylesfooter.css'

import './Styles/animation.css'
import './Styles/fontello-codes.css'
import './Styles/fontello-embedded.css'
import './Styles/fontello-ie7-codes.css'
import './Styles/fontello-ie7.css'
import './Styles/fontello.css'

import './font/fontello.eot'
import './font/fontello.svg'
import './font/fontello.ttf'
import './font/fontello.woff'
import './font/fontello.woff2'

import {
  Row, Col
} from "reactstrap";

import { isEmpty } from 'react-redux-firebase'

import {
  Chart, Series, Legend, ArgumentAxis, ValueAxis, Size, ZoomAndPan
} from 'devextreme-react/chart';

import dataSource from '../Graph/data';

import VehicleInfo from './VehicleInfo'
import RPMchart from './RPM/RPM'
import SPEEDchart from './SPEED/SPEED'
import AVGSPEEDchart from './AVGSPEED/AVGSPEED'
import IDLEchart from './IDLE/IDLE'
import FUELchart from './FUEL/FUEL'


class FooterInfo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tabsSpeed: true,
      tabsAVG_Speed: false,
      tabsIdliling: false,
      tabsRPM: false,
      selectedDevice: null,
      selectedposition: [],
      reporttype: 1,
      eventmark: false,
      eventmarks: [],
      hideFooterHis: false
    }
  }

  selectTab(e) {
    for (var i = 0; i < document.getElementsByClassName('tabclick').length; i++) {
      document.getElementsByClassName('tabclick')[i].classList.remove("active")
    }
    e.target.parentElement.classList.add("active");

    switch (e.target.getAttribute("button_value")) {

      case "tabsSpeed":
        this.setState({
          tabsSpeed: true,
          tabsAVG_Speed: false,
          tabsIdliling: false,
          tabsRPM: false
        })
        break;
      case "tabsAVG_Speed":
        this.setState({
          tabsSpeed: false,
          tabsAVG_Speed: true,
          tabsIdliling: false,
          tabsRPM: false
        })
        break;
      case "tabsIdliling":
        this.setState({
          tabsSpeed: false,
          tabsAVG_Speed: false,
          tabsIdliling: true,
          tabsRPM: false
        })
        break;
      case "tabsRPM":
        this.setState({
          tabsSpeed: false,
          tabsAVG_Speed: false,
          tabsIdliling: false,
          tabsRPM: true
        })
        break;
    }
  }

  slideScrollX(num) {
    document.getElementById('scrollx').scrollLeft += (num * 600);
  }


  render() {

    return (
      <Row style={{ marginBottom: -15 }}>

        {this.props.vid &&
          <div style={{ flexDirection: 'row', display: 'flex', zIndex: 0 }}>
            <div style={{ width: 80, marginLeft: 15 }}>
              <div style={{ backgroundColor: 'white', cursor: 'pointer', boxShadow: '0px -2px 6px rgba(0,0,0,0.3)', padding: 5, width: '100%' }}
                onClick={() => this.props.setHideFooter()}>
                <center><i class={"fa " + (this.props.hideFooterHis ? "fa-chevron-up" : "fa-chevron-down")}></i></center>
              </div>
            </div>
          </div>}

        {
          this.props.vid && !this.props.hideFooterHis &&
          <div style={{ backgroundColor: 'white', width: '100%', maxHeight: '250px', zIndex: 2 }}>
            <div className="row" >
              <div className="col-lg-12">
                <div className="tabs-container" >
                  <ul className="nav nav-tabs">
                    <li onClick={this.selectTab.bind(this)} className="tabclick active"><a button_value="tabsSpeed">Speed</a></li>
                    <li onClick={this.selectTab.bind(this)} className="tabclick"><a button_value="tabsAVG_Speed">AVG Speed</a></li>
                    <li onClick={this.selectTab.bind(this)} className="tabclick"><a button_value="tabsIdliling">Idliling</a></li>
                    <li onClick={this.selectTab.bind(this)} className="tabclick"><a button_value="tabsRPM">RPM</a></li>
                  </ul>
                  <div className="tab-content" style={{ height: 195 }}>
                    {this.state.tabsSpeed && (
                      <div style={{ display: 'block' }} id="tab-1" className="tab-pane">
                        <div className="panel-body" >
                          <div style={{ padding: '20px' }}>
                            <SPEEDchart chartHeight={150}></SPEEDchart>
                          </div>
                        </div>
                      </div>
                    )}
                    {this.state.tabsAVG_Speed && (
                      <div style={{ display: 'block' }} id="tab-2" className="tab-pane">
                        <div className="panel-body">
                          <div style={{ padding: '20px' }}>
                            <AVGSPEEDchart chartHeight={150}></AVGSPEEDchart>
                          </div>
                        </div>
                      </div>
                    )}
                    {this.state.tabsIdliling && (
                      <div style={{ display: 'block' }} id="tab-3" className="tab-pane">
                        <div className="panel-body">
                          <div style={{ padding: '20px' }}>
                            <IDLEchart chartHeight={150}></IDLEchart>
                          </div>
                        </div>
                      </div>
                    )}
                    {this.state.tabsRPM && (
                      <div style={{ display: 'block' }} id="tab-4" className="tab-pane">
                        <div className="panel-body">
                          <div style={{ padding: '20px' }}>
                            <RPMchart chartHeight={150}></RPMchart>
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
  information: state.realtime.information,
  hideFooterHis: state.history.hideFooterHis
});

const mapDispatchToProps = (dispatch) => ({
  setHideFooter: () => dispatch(HistoryActions.setHideFooter()),

})

export default connect(mapStateToProps, mapDispatchToProps)(FooterInfo)

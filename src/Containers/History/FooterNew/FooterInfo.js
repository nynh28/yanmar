import React, { Component } from 'react'
import { connect } from 'react-redux'
import HistoryActions from '../../../Redux/HistoryRedux'
import { get } from 'lodash'
import $ from 'jquery'

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

// Combinations
import CombinationsChart from '../Charts/Combinations/Combinations'
import ChartTest from '../Charts/Combinations/ChartTest'


class FooterInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showChart: false,
      chartName: "speed",
      showFooter: true
    }
  }


  _onCollapseComponent = () => {
    let myibox2 = $(`#footer-colaps`)
    myibox2.slideToggle(600);
    // this.setState(state => ({ showFooter: !state.showFooter }))
  }

  componentWillUnmount() {
    this.props.setStateReduxHistory('hideFooterHis', false)
  }

  render() {
    let { showFooter } = this.state
    let { dataAllPoint, hideFooterHis } = this.props

    return (
      <Row style={{ margin: '0px 0px -15px 0px' }}>
        {!this.props.loading && dataAllPoint.length > 0 &&
          <div style={{ width: 80 }}>
            <div style={{ backgroundColor: 'white', cursor: 'pointer', boxShadow: '0px -2px 6px rgba(0,0,0,0.3)', width: '100%', borderRadius: '0px 4px 0px 0px', height: 25 }}
              onClick={() => {
                this.props.setHideFooterHis()
                this._onCollapseComponent()
              }}>
              <center><i className={"fa " + (hideFooterHis ? "fa-chevron-up" : "fa-chevron-down")}></i></center>
            </div>
          </div>
        }

        {!this.props.loading && dataAllPoint.length > 0 &&
          <div id={"footer-colaps"} style={{ backgroundColor: 'white', width: '100%', height: '380px', maxHeight: '380px', zIndex: 2, boxShadow: 'rgba(0, 0, 0, 0.3) 0px 2px 6px' }}>
            <div className="bar-tools">
              <ToolsPlayTour chartName={""} />
              <div className="bar-tools-right">
                <PointValue />
              </div>
            </div>
            {/* {
              <CombinationsChart chartHeight={400} />
            } */}
            <ChartTest />
          </div>
        }
      </Row >
    )
  }
}

const mapStateToProps = (state) => ({
  hideFooterHis: state.history.hideFooterHis,
  dataHistory: state.history.dataHistory,
  loading: state.history.loading,
  dataAllPoint: state.history.dataAllPoint,
});

const mapDispatchToProps = (dispatch) => ({
  setHideFooterHis: () => dispatch(HistoryActions.setHideFooterHis()),
  setStateReduxHistory: (name, value) => dispatch(HistoryActions.setStateReduxHistory(name, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FooterInfo)

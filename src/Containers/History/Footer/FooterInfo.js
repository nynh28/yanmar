import React, { Component } from 'react'
import { connect } from 'react-redux'
import HistoryActions from '../../../Redux/HistoryRedux'
import { get } from 'lodash'
import $ from 'jquery'
import { Row } from "reactstrap";
import { t } from '../../../Components/Translation'

// Tools
import PointValue from './PointValue'
import ToolsPlayTour from './ToolsPlayTour'

// Combinations
import CombinationsChart from '../Charts/Combinations/Combinations'

class FooterInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showChart: false,
      chartName: "speed",
      showFooter: true,
      renderChart: true,
      chartDone: null,
      dataHistory: null
    }
    this.chart = null
    this.chartDone = null
    // this.chartRef = React.createRef()
  }

  _onCollapseComponent = () => {
    let myibox2 = $(`#footer-colaps`)
    myibox2.slideToggle(600);
  }

  componentWillUnmount() {
    this.props.setStateReduxHistory('hideFooterHis', false)
  }
  componentDidMount() {
    // let { dataHistory } = this.props
    // if (dataHistory) {
    //   setTimeout(() => {
    //     this.setState({ dataHistory })
    //   }, 1500)
    // }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   let { dataHistory } = this.props
  //   // console.log('111')
  //   if (nextProps.dataHistory !== dataHistory) {
  //     this.setState({ dataHistory: nextProps.dataHistory })
  //     return false
  //   }
  //   // if (nextProps.showNameSelect !== showNameSelect) return false
  //   // if (nextProps.vehicleSelect !== vehicleSelect) return false
  //   // if (nextProps.listMembersAll !== listMembersAll) return false
  //   // console.log('222')
  //   return true
  // }

  render() {
    let { loading, hideFooterHis, searchHistoryStatus, dataHistory } = this.props
    // let { dataHistory } = this.state
    return (
      <Row style={{ margin: '0px 0px -15px 0px' }}>
        {!loading && searchHistoryStatus && dataHistory && dataHistory.trips.length > 0 &&
          <div div style={{ width: 80 }}>
            <div style={{ backgroundColor: 'white', cursor: 'pointer', boxShadow: '0px -2px 6px rgba(0,0,0,0.3)', borderRadius: '0px 4px 0px 0px', height: 25 }}
              onClick={() => {
                this.props.setHideFooterHis()
                this._onCollapseComponent()
              }}>
              <center><i className={"fa " + (hideFooterHis ? "fa-chevron-up" : "fa-chevron-down")}></i></center>
            </div>
          </div>
        }

        {/* {!this.props.loading && dataAllPoint.length > 0 && */}

        {/* // <div className="test-footer" id={"footer-colaps"} style={{ backgroundColor: 'white', width: '100%', height: '280px', maxHeight: '280px', zIndex: 2, boxShadow: 'rgba(0, 0, 0, 0.3) 0px 2px 6px' }}> */}
        <div className="test-footer" id={"footer-colaps"} style={{ width: '100%' }} >
          {/* <div className="bar-tools" style={{ padding: '5px 0px 0px 0px' }}>
              <ToolsPlayTour chartName={"Combinations"} />
              <div className="bar-tools-right" style={{ marginRight: 0, marginTop: 0 }}>
                <PointValue resetChart={() => {
                  this.chart.current.instance.refresh()
                  this.props.setPointValue({ speed: '', rpm: '', fuel: '', canbus_cooltemp: '', date: '' })
                  this.props.setRenderChart(true)
                }} />
              </div>
            </div> */}
          {/* <div className="combinations-chart"> */}
          {
            !loading && searchHistoryStatus && dataHistory && dataHistory.trips.length > 0 &&
            <CombinationsChart renderChart={this.state.renderChart} onLoad={(ref) => { this.chart = ref }} setInfoMarker={(positionMarker, infoMarker) => this.props.setInfoMarker(positionMarker, infoMarker)} chartHeight={400} />
          }
          {/* </div> */}

        </div>

      </Row>
    )
  }
}

const mapStateToProps = (state) => ({
  hideFooterHis: state.history.hideFooterHis,
  searchHistoryStatus: state.history.searchHistoryStatus,
  dataHistory: state.history.dataHistory,
  loading: state.history.loading,
  dataAllPoint: state.history.dataAllPoint,
});

const mapDispatchToProps = (dispatch) => ({
  setHideFooterHis: () => dispatch(HistoryActions.setHideFooterHis()),
  setStateReduxHistory: (name, value) => dispatch(HistoryActions.setStateReduxHistory(name, value)),
  setPointValue: (pointValue) => dispatch(HistoryActions.setPointValue(pointValue)),
  setRenderChart: (isRender) => dispatch(HistoryActions.setRenderChart(isRender))
})

export default connect(mapStateToProps, mapDispatchToProps)(FooterInfo)

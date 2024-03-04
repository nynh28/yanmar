import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux'
import TrackingHistoryActions from '../../../Redux/TrackingHistoryRedux'
import $ from 'jquery'
import { Row } from "reactstrap";
import { Slider } from 'antd';

class SliderBar extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    let { indexPlaying, cssChart } = this.props

    if (nextProps.indexPlaying !== indexPlaying) {
      return true
    }
    if (nextProps.cssChart !== cssChart) {
      return true
    }

    return false
  }

  pointChange(index) {
    this.props.setValue("indexPlaying", index)
    this.props.onPointMove(this.props.dataAllPoint[index])
  }

  render() {
    let { dataAllPoint, indexPlaying, cssChart } = this.props
    // console.log('cssChart', cssChart)
    return <div id="slider_test" className={cssChart}>
      {/* return <Row id="slider_test" style={{ padding: '0px 26px 0px 25px', margin: -14 }}> */}
      <Slider
        style={{ color: 'red' }}
        min={0}
        max={(dataAllPoint.length - 1)}
        onChange={(index) => {
          this.pointChange(index)
        }}
        tooltipVisible={false}
        value={indexPlaying}
      />
    </div>
  }
}

const mapStateToProps = (state) => ({
  dataAllPoint: state.trackingHistory.dataAllPoint,
  indexPlaying: state.trackingHistory.indexPlaying,
  cssChart: state.trackingHistory.cssChart
});

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(TrackingHistoryActions.setValue(name, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(SliderBar)

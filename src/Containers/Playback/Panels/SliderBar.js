import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux'
import TrackingHistoryActions from '../../../Redux/RealtimeRedux'
import $ from 'jquery'
import { Row } from "reactstrap";
import { Slider } from 'antd';
import '../styles/slider.css'

class SliderBar extends Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   let { indexPlaying } = this.props

  //   if (nextProps.indexPlaying !== indexPlaying) {
  //     return true
  //   }

  //   return false
  // }

  // pointChange(index) {
  //   this.props.setValue("indexPlaying", index)
  //   this.props.onPointMove(this.props.dataAllPoint[index])
  // }

  render() {
    // let { dataAllPoint, indexPlaying } = this.props
    return <Row id="slider_test" style={{ padding: '0px 26px 0px 25px', margin: -14 }}>
      <Slider
        style={{ color: 'red' }}
        min={0}
        max={200}
        onChange={(index) => {
          // this.pointChange(index)
        }}
        tooltipVisible={false}
      // value={indexPlaying}
      />
    </Row>
  }
}

const mapStateToProps = (state) => ({
  // dataAllPoint: state.trackingHistory.dataAllPoint,
  // indexPlaying: state.trackingHistory.indexPlaying,
});

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(TrackingHistoryActions.setValue(name, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(SliderBar)
import React, { Component } from 'react';
import { connect } from 'react-redux'
import RealtimeNewActions from '../../Redux/RealtimeNewRedux'
import Map from './Map'
import './Styles/custom.css'

class Realtime extends Component {
  render() {
    return <Map />
  }
}

const mapStateToProps = (state) => ({
  initialVehiclesData: state.realtimeNew.initialVehiclesData,
  lastTime: state.realtimeNew.lastTime
});

const mapDispatchToProps = (dispatch) => ({
  getInitialVehiclesData: () => dispatch(RealtimeNewActions.getInitialVehiclesData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Realtime)
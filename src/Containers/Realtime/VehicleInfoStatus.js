import React, { Component } from 'react'
import { connect } from 'react-redux'
import RealtimeActions from '../../Redux/RealtimeRedux'

class VehicleInfoStatus extends React.Component {

  componentWillUnmount() {
    this.props.setStateMapControl("vehicleInfoStatusEnabled", this.props.showVehicleInfoStatusRealtime)
  }

  setInfo(label, color) {
    return <div className="form-group field field-string" style={{ padding: '5px 5px 5px 10px', marginBottom: 0 }}>
      <i className="fa fa-circle" style={{ color }} />
      <span style={{ marginLeft: 10 }}>{label}</span>
    </div>
  }

  render() {
    return <div style={{
      backgroundColor: '#FFF',
      width: 170,
      height: 204,
      boxShadow: 'rgba(0, 0, 0, 0.3) 0px 2px 6px',
      borderRadius: 4,
      marginLeft: 10,
      visibility: this.props.showVehicleInfoStatusRealtime ? '' : 'hidden'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', marginTop: 9 }}>
        {this.setInfo("Driving", 'rgb(93, 230, 72)')}
        {this.setInfo("Parking", 'rgb(248, 108, 139)')}
        {this.setInfo("Idling", 'rgb(255, 230, 0)')}
        {this.setInfo("Offline", '#ADADB2')}
        {this.setInfo("Over Speed", '#5856d6')}
        {this.setInfo("Vehicle Group", '#0272b7')}
      </div>
    </div>
  }
}

const mapStateToProps = (state) => ({
  showVehicleInfoStatusRealtime: state.realtime.showVehicleInfoStatusRealtime
});
const mapDispatchToProps = (dispatch) => ({
  setStateMapControl: (name, value) => dispatch(RealtimeActions.setStateMapControl(name, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VehicleInfoStatus)
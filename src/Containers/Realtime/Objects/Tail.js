import React, { Component } from 'react';
import { connect } from 'react-redux'
import RealtimeActions from '../../../Redux/RealtimeRedux'
import { Polyline } from '@react-google-maps/api'
import { isEmpty } from 'react-redux-firebase'

const { get, isEqual } = require('lodash')


class Tail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pathHistory: [],
      truckActive: null,
    }
  }

  componentDidUpdate(prevProps, nextState) {

    let { information } = this.props


    // console.log('information', this.props.information, !isEqual(prevProps.information, this.props.information))
    if (!isEqual(prevProps.information, information) && get(information, 'info.vid', null)) {

      let { lat, lng, io_code } = information.gps
      let { vid } = information.info
      let vidPre = get(prevProps.information, 'info.vid', null)

      // console.log('MID:', vidPre, vid)
      if (vidPre !== vid) {
        let truckActive = vid
        this.setState({ truckActive, pathHistory: [] })
      }
      else {
        let { pathHistory } = this.state
        // console.log('information:', this.props.information, lat, lng, io_code, vid)
        if (io_code === '01') {
          if (this.state.pathHistory.length !== 0) this.setState({ pathHistory: [] })
        } else {
          if (pathHistory.length === 0) { pathHistory.unshift({ lat, lng }) }

          else if (pathHistory[0].lat !== lat && pathHistory[0].lng !== lng) {
            pathHistory.unshift({ lat, lng })
          }
          // console.log('pathHistory:', pathHistory)
          this.setState({ pathHistory: [...pathHistory] })
        }
      }
    }
  }



  render() {
    // console.log(' XX---------------- Tail ----------------XX ')
    let { pathHistory } = this.state
    return (
      <Polyline
        onLoad={polyline => {
          this.polyline = polyline
        }}
        path={pathHistory}
        options={{
          strokeColor: '#4CD964',
          strokeOpacity: 0.8,
          strokeWeight: 4,
          fillOpacity: 0.35,
          draggable: false,
          visible: true,
          radius: 30000,
          paths: this.state.pathHistory,
          zIndex: 1
        }}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  vehicles: state.realtime.vehicles,
  information: state.realtime.information,
  activeMap: state.realtime.activeMap
});
const mapDispatchToProps = (dispatch) => ({
  setFocusPosition: (lat, lng) => dispatch(RealtimeActions.setFocusPosition(lat, lng))
});


export default connect(mapStateToProps, mapDispatchToProps)(Tail)

import React, { Component } from 'react';
import { connect } from 'react-redux'

import Polygon from './Geofences/Polygons'
import Line from './Geofences/Line'
import Point from './Geofences/Point'
import InfoGeof from './Geofences/InfoGeof';
import RealtimeActions from '../../../Redux/RealtimeRedux'
import { ENDPOINT_BASE_URL } from '../../../Config/app-config';

class Geofences extends Component {

  constructor(props) {
    super(props)
    this.state = {
      infoWin: null,
      anchor: null,
      geofenceDetail: null
    }
  }

  // geofenceDetail

  async getGeofenceDetail(id) {
    let { language, header } = this.props
    var response = await fetch(ENDPOINT_BASE_URL + 'Geofence/Geofence/' + id + '?lang=' + language, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': header.idToken,
        'X-API-Key': header.redisKey
      },
      // body: JSON.stringify({ userId: this.props.dataLogin.userId })
    });
    let data = response.ok ? await response.json() : {}

    return data
  }

  async markerLoadHandler(anchor, id) {
    let geofenceDetail = await this.getGeofenceDetail(id)
    this.setState({ anchor, geofenceDetail })
  };

  render() {
    let { geofenceByTypes } = this.props
    let { infoWin, anchor, geofenceDetail } = this.state
    // console.log(anchor)
    return (
      <div>
        {geofenceByTypes &&
          geofenceByTypes.map((data, i) => {
            if (data.geomTypeName === 'Polygon') return <Polygon data={data} markerLoadHandler={(anchor) => this.markerLoadHandler(anchor, data.id)} />
            if (data.geomTypeName === 'Line') return <Line data={data} markerLoadHandler={(anchor) => this.markerLoadHandler(anchor, data.id)} />
            if (data.geomTypeName === 'Point') return <Point data={data} markerLoadHandler={(anchor) => this.markerLoadHandler(anchor, data.id)} />
            // return
          })
        }

        <InfoGeof infoWin={infoWin} anchor={anchor} geofenceDetail={geofenceDetail} markerLoadHandler={(anchor) => this.markerLoadHandler(anchor, null)} />

      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  geofenceByTypes: state.controlroomdealer.geofenceByTypes,
  language: state.versatile.language,
  header: state.signin.header
});
const mapDispatchToProps = (dispatch) => ({
  getGeofenceDetail: (geofenceId) => dispatch(RealtimeActions.getGeofenceDetail(geofenceId))
});


export default connect(mapStateToProps, mapDispatchToProps)(Geofences)

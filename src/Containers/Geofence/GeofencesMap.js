import React, { Component } from 'react';
import { connect } from 'react-redux'

import Polygon from './GeofencesMap/Polygons'
import Line from './GeofencesMap/Line'
import Point from './GeofencesMap/Point'
import InfoGeof from './GeofencesMap/InfoGeof';
import RealtimeActions from '../../Redux/RealtimeRedux'

class Geofences extends Component {

  constructor(props) {
    super(props)
    this.state = {
      infoWin: null,
      anchor: null
    }
  }

  markerLoadHandler(anchor, id) {
    // if (info === undefined) {

    //   this.setState({ infoWin: null })
    // } else {

    //   this.setState({ infoWin: { anchor, info } })

    // }
    // console.log(id, anchor)
    this.props.getGeofenceDetail(id)
    this.setState({ anchor })


  };

  render() {
    let { geofenceByTypes } = this.props
    let { infoWin, anchor } = this.state
    // console.log('geofenceByTypes', geofenceByTypes)
    // console.log(anchor)


    return (
      <div>
        {geofenceByTypes &&
          geofenceByTypes.map((data, i) => {
            // console.log(data.Id)
            if (data.geomTypeName === 'Polygon') return <Polygon data={data} markerLoadHandler={(anchor) => this.markerLoadHandler(anchor, data.id)} />
            if (data.geomTypeName === 'Line') return <Line data={data} markerLoadHandler={(anchor) => this.markerLoadHandler(anchor, data.id)} />
            if (data.geomTypeName === 'Point') return <Point data={data} markerLoadHandler={(anchor) => this.markerLoadHandler(anchor, data.id)} />
            // return
          })
        }

        <InfoGeof infoWin={infoWin} anchor={anchor} markerLoadHandler={(anchor) => this.markerLoadHandler(anchor, null)} />

      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  geofenceByTypes: state.geofence.geofenceByTypes,
});
const mapDispatchToProps = (dispatch) => ({
  getGeofenceDetail: (geofenceId) => dispatch(RealtimeActions.getGeofenceDetail(geofenceId))
});


export default connect(mapStateToProps, mapDispatchToProps)(Geofences)

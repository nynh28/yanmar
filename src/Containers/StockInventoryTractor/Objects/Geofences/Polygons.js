import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Polygon, Marker } from '@react-google-maps/api'
import { MarkerScale } from '../../../../Functions/MarkerScale'

import { get } from 'lodash'

class Polygons extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    let { data } = this.props

    console.log("data : ", data)

    return [
      <Polygon
        onLoad={polygon => { this.polygon = polygon }}
        paths={get(data, 'coordinates', [])}
        options={{
          fillColor: "#007aff",
          fillOpacity: 0.1,
          strokeColor: "#007aff",
          strokeOpacity: 1,
          strokeWeight: 2,
          zIndex: 1,
        }}
      />,
      <Marker
        onLoad={marker => {
          this.marker = marker
        }}
        // icon={data.iconUrl ? {
        //   url: data.iconUrl,
        // } : undefined}

        icon={MarkerScale(data.iconUrl)}
        position={get(data, 'iconPoint', {})}
        onClick={() => {
          this.props.markerLoadHandler(this.marker)
        }}
      />

    ]
  }
}

const mapStateToProps = (state) => ({
  // vehicles: state.realtime.vehicles,
});
const mapDispatchToProps = (dispatch) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(Polygons)

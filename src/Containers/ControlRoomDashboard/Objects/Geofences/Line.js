import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Polyline, Marker } from '@react-google-maps/api'
import { MarkerScale } from '../../../../Functions/MarkerScale'

import { get } from 'lodash'

class Line extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    let { data } = this.props
    // console.log(data)

    return [
      <Polyline
        onLoad={polyline => {
          this.polyline = polyline
        }}
        id={'polyline'}
        path={get(data, 'coordinates', [])}
        options={{
          strokeColor: 'red',
          // strokeColor: '#0000ff',
          strokeOpacity: 0.8,
          // strokeWeight: 3,
          fillOpacity: 0.35,
          draggable: false,
          visible: true,
          radius: 30000,
          zIndex: 1
        }}
      />
      ,
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


export default connect(mapStateToProps, mapDispatchToProps)(Line)

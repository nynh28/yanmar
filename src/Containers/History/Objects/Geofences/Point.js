import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Marker, InfoWindow } from '@react-google-maps/api';

import { get, isEqual } from 'lodash'

class Point extends Component {

  constructor(props) {
    super(props)
    this.state = {
      marker: null

    }
  }

  render() {
    let { data } = this.props
    // console.log(data)
    // console.log(get(data, 'coordinates[0]', {}))
    return (
      <Marker
        onLoad={marker => {
          this.marker = marker
          this.setState({ marker })
        }}
        // icon={data.iconUrl}
        icon={data.iconUrl ? {
          url: data.iconUrl,
          // scaledSize: new window.google.maps.Size(24, 24)
          // anchor: { x: 50, y: 50 }
        } : undefined}
        position={get(data, 'coordinates[0]', {})}
        onClick={() => {
          this.props.markerLoadHandler(this.marker)
        }}
      >
        {/* <InfoWindow
          anchor={this.marker}
          position={{}}
        // onCloseClick={() => this.props.setInfoMarker(null, null)}
        >
          <div>{"ACR-12345"}</div>
        </InfoWindow> */}
      </Marker>



    )
  }
}

const mapStateToProps = (state) => ({
  // vehicles: state.realtime.vehicles,
});
const mapDispatchToProps = (dispatch) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(Point)

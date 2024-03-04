import React, { Component } from 'react';
import { connect } from 'react-redux'
import { isEmpty } from 'lodash';

class Tail extends Component {
  constructor(props) {
    super(props)
    this.polyline = null
  }

  componentDidMount() {
    this.polyLine = new window.google.maps.Polyline({
      map: this.props.map,
      path: this.props.tailMarker,
      geodesic: true,
      strokeColor: '#4CD964',
      strokeOpacity: 0.8,
      strokeWeight: 4,
      fillOpacity: 0.35,
      draggable: false,
      visible: true,
      radius: 30000,
      zIndex: 1
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { tailMarker } = this.props

    if (tailMarker !== nextProps.tailMarker && !isEmpty(nextProps.tailMarker)) {
      this.updatePath(nextProps.tailMarker)
    }

    return false
  }

  updatePath(tailMarker) {
    this.polyLine.setPath(tailMarker)
  }

  render() {
    return ""
  }
}

const mapStateToProps = (state) => ({
  tailMarker: state.realtimeNew.tailMarker,
});

export default connect(mapStateToProps)(Tail)
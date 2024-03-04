import React, { Component } from 'react';
import { connect } from 'react-redux'
import HistoryActions from '../../../Redux/HistoryRedux'
import { Polyline } from '@react-google-maps/api'
import { get } from 'lodash'

class Tail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tails: [],
      tailsGroup: null
    }
    this.fitBounds = this.fitBounds.bind(this);
    this.map = null
  }

  // componentWillReceiveProps(nextProps) {
  //   if (get(nextProps, 'map', null) !== null) {
  //     console.log('componentWillReceiveProps', nextProps.map)
  //     this.map = nextProps.map
  //   }
  // }

  componentWillMount() {
    this.map = this.props.map
    // console.log('tsetsetsetset')
  }
  componentDidMount() {
    if (this.props.dataHistory) {
      // setTimeout(() => {
      let { dataHistory } = this.props
      let tails = []
      if (dataHistory && dataHistory.trips && dataHistory.trips.length > 0) {
        dataHistory.trips.map((trips) => {
          if (trips[29].length === 0) {
            let ar = trips[9].split(',')
            if (trips[21] === 2) ar = trips[17].split(',')
            tails.push({ lat: Number(ar[0]), lng: Number(ar[1]) })
          } else if (trips[21] !== 5 && trips[21] !== 6) {
            trips[29].map((item) => {
              tails.push({ lat: item[2], lng: item[3] })
            })
          }
        })
      }

      this.setState({ tails, tailsGroup: null })
      // if (tails.length > 0) this.fitBounds(tails)
      // }, 500)



    }
  }

  componentDidUpdate(prevProps) {
    // console.log('nextProps.map', this.map, prevProps.map)
    if (prevProps.dataHistory !== this.props.dataHistory) {

      let { dataHistory } = this.props
      let tails = []
      if (dataHistory && dataHistory.trips && dataHistory.trips.length > 0) {
        dataHistory.trips.map((trips) => {
          if (trips[29].length === 0) {
            let ar = trips[9].split(',')
            if (trips[21] === 2) ar = trips[17].split(',')
            tails.push({ lat: Number(ar[0]), lng: Number(ar[1]) })
          } else if (trips[21] !== 5 && trips[21] !== 6) {
            trips[29].map((item) => {
              tails.push({ lat: item[2], lng: item[3] })
            })
          }
        })
      }

      this.setState({ tails, tailsGroup: null })
      if (tails.length > 0) this.fitBounds(tails)

    }

    if (prevProps.tailActive !== this.props.tailActive) {
      let { tailActive } = this.props
      this.setState({ tailsGroup: tailActive })
      if (tailActive !== null) {
        if (tailActive.length > 0) this.fitBounds(tailActive)
        // if (this.state.tails.length > 0) this.fitBounds(this.state.tails)

      }
    }
  }

  setPolyline(tails, lineType) {
    let lineColor = '#0000ff'
    if (lineType === 'trip') {
      if (this.props.eventId === 3) {
        lineColor = '#FFF24A'
      } else {
        lineColor = '#66ff33'
      }
    }

    return (
      <Polyline
        onLoad={polyline => {
          this.polyline = polyline
        }}
        id={'polyline'}
        path={tails}
        options={{
          strokeColor: lineColor,
          strokeOpacity: 0.8,
          // strokeWeight: 3,
          fillOpacity: 0.35,
          draggable: false,
          visible: true,
          radius: 30000,
          paths: tails,
          zIndex: 1
        }}
      />
    )
  }

  fitBounds(tails) {
    // console.log('map', this.map, this.props.map)
    if (this.map !== undefined) {
      const bounds = new window.google.maps.LatLngBounds();
      tails.map(item => {
        bounds.extend(item);
      });

      if (this.map.fitBounds) {
        this.map.fitBounds(bounds);
        let northWest = new window.google.maps.LatLng(bounds.getSouthWest().lat(), bounds.getNorthEast().lng());
        this.map.panTo(northWest);

        let zoom = this.map.getZoom()
        this.map.setZoom(zoom - 3);
        this.map.panBy(0, 180);
        this.props.setCookiesValue('zoomCookie', this.map.getZoom())
        this.props.setCookiesValue('centerCookie', { lat: this.map.getCenter().lat(), lng: this.map.getCenter().lng() })
      }
    }
  }

  render() {
    let { tails, tailsGroup } = this.state

    // console.log('this.props.map', this.props.map)

    return <div>
      {this.setPolyline(tails)}
      {this.setPolyline(tailsGroup, 'trip')}
    </div>
  }
}

const mapStateToProps = (state) => ({
  dataHistory: state.history.dataHistory,
  tailGroup: state.history.tailGroup,
  tailActive: state.history.tailActive,
  eventId: state.history.eventId
});
const mapDispatchToProps = (dispatch) => ({
  setCookiesValue: (name, value) => dispatch(HistoryActions.setCookiesValue(name, value)),
  // setFocusPosition: (lat, lng) => dispatch(HistoryActions.setFocusPosition(lat, lng))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tail)

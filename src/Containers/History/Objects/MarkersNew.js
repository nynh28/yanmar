import React, { Component } from 'react';
import { connect } from 'react-redux'
import HistoryActions from '../../../Redux/HistoryRedux'
import '../Styles/markerStyle.css'

import { Marker } from '@react-google-maps/api'
import Images from '../icons/Images'

const { get, isEqual } = require('lodash')

class Markers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arrImg: [],
      markers: null,
      markerMap: [],
      selectedPlace: null,
      isImageOpen: false,
      indexTripsEnd: 0,
      indexLocationEnd: 0,
    }
  }

  handleShowDialog = () => {
    this.setState({ isImageOpen: !this.state.isImageOpen });
  };

  componentDidUpdate(prevProps, nextState) {
    let { dataTrip } = this.props

    // console.log("SET MARKER : ", dataTrip)

    if (!isEqual(prevProps.dataHistory, this.props.dataHistory)) {
      let { dataHistory } = this.props
      let index = { indexTripsEnd: 0, indexLocationEnd: 0 }
      if (this.props.dataHistory !== null) {
        if (dataHistory && dataHistory.trips && dataHistory.trips.length > 0) {
          let indexTripsEnd = dataHistory.trips.length - 1
          let indexLocationEnd = dataHistory.trips[indexTripsEnd][29].length - 1
          index = { indexTripsEnd, indexLocationEnd }
        }

      }
      // console.log(index)
      this.setState({ markers: dataHistory, ...index, markerMap: [] })
    }
  }

  markerLoadHandler = (maker, index, data) => {

    this.state.markerMap.push(
      {
        "place": 'place' + index,
        maker,
        data
      }
    )
  };


  markerClickHandler = (key) => {

    // this.setState(state => ({ infoOpen: !state.infoOpen }))
    // index
    let idx = this.state.markerMap.findIndex(x => x.place === 'place' + key);

    // console.log(key, idx)
    if (idx >= 0) {
      let { maker, data } = this.state.markerMap[idx]
      this.props.setInfoMarker(maker, data)

    }
  };

  onClickMarker(lat, lng) {
    // console.log("CLICK MARKER")
  }

  setIcon(indexTrips, indexLocations, event_id, course) {

    let { indexTripsEnd, indexLocationEnd } = this.state
    // console.log('it:', indexTrips, 'il:', indexLocations, 'e:', event_id)
    if (indexLocations === -1) {
      if (indexTripsEnd === indexTrips) {
        return Images.markerEnd
      }
      else if (0 === indexTrips) {
        return Images.markerStart
      }
    }
    else {
      if (indexTripsEnd === indexTrips && indexLocationEnd === indexLocations) {
        return Images.markerEnd
      }
      else if (0 === indexLocations && 0 === indexTrips) {
        return Images.markerStart
      }
    }
    if (event_id === 2) {
      return Images.markerParking

    } else if (event_id === 3) {
      return Images.markerIdling

    } else if (event_id === 5) {
      return {
        url: Images.markerOverSpeed,
        scaledSize: new window.google.maps.Size(25, 25)
      }
    }
    else {
      return {
        path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        strokeColor: "red",
        fillColor: "red",
        fillOpacity: 1,
        scale: 1.5,
        rotation: course
        // anchor: { x: 13, y: 13 }
      }
    }
  }

  setMarkerTrips(key, trips, indexTrips) {
    let { indexTripsEnd } = this.state
    let { objectEnabled } = this.props

    let ar = trips[9].split(',')


    let start = indexTrips === 0
    let end = indexTrips === indexTripsEnd

    if (!(start || end)) {
      if (trips[21] !== 2 && trips[21] !== 3) return null
      if (!objectEnabled) return null
    }

    if (trips[21] === 2) ar = trips[17].split(',')

    let position = { lat: Number(ar[0]), lng: Number(ar[1]) }
    return <div> <Marker
      key={key}
      onLoad={marker => this.markerLoadHandler(marker, key, trips)}
      icon={this.setIcon(indexTrips, -1, trips[21], 0)}
      position={position}
      onClick={() => {
        this.onClickMarker(Number(ar[0]), Number(ar[1]))
        this.markerClickHandler(key)
      }}
    >
    </Marker>
    </div >
  }

  setMarkerLocation(key, trips, indexTrips, locations, indexLocations) {
    let { indexTripsEnd, indexLocationEnd } = this.state
    let { zoom, objectEnabled, isPrint } = this.props

    let start = indexTrips === 0 && indexLocations === 0
    let end = indexTrips === indexTripsEnd && indexLocations === indexLocationEnd

    let lengthLoc = trips[29].length
    let num = zoom <= 8 ? 200 : zoom <= 14 ? 100 : 50

    if (!(start || end)) {
      if (trips[21] === 5 || trips[21] === 6) {
        if (indexLocations !== ((lengthLoc / 2) | 0)) {
          return null
        }
      }

      if (indexLocations !== ((lengthLoc / 2) | 0)) {
        if (zoom <= 7 || isPrint) {
          return null
        }
        else if ((indexLocations % num) !== 0) {
          return null
        }
      }

      if (!objectEnabled) {
        return null
      }
    }

    return <div> <Marker
      key={key}
      onLoad={marker => this.markerLoadHandler(marker, key, locations)}
      icon={this.setIcon(indexTrips, indexLocations, trips[21], locations[10])}
      position={{ lat: locations[2], lng: locations[3] }}
      onClick={() => {
        this.onClickMarker(locations[2], locations[3])
        this.markerClickHandler(key)
      }}
    >
    </Marker>
    </div >

  }



  render() {
    let { markers } = this.state
    let keyLoacation = 0

    let length = 0
    for (let i = 0; i < 100; i++) {
      if (i % 50 === 0) {
        length++
      }
    }
    // console.log("markers", markers)
    let markersTrip = get(markers, 'trips', [])

    return (
      markersTrip.map((trips, indexTrips) => {
        if (trips[29].length === 0) {
          let key = 'key_' + keyLoacation
          keyLoacation++
          return this.setMarkerTrips(key, trips, indexTrips)

        }
        else {
          return trips[29].map((locations, indexLocations) => {
            let key = 'key_' + keyLoacation
            keyLoacation++
            return this.setMarkerLocation(key, trips, indexTrips, locations, indexLocations)
          })
        }
      })
    )
  }
}

const mapStateToProps = (state) => ({
  dataHistory: state.history.dataHistory,
  tailActiveID: state.history.tailActiveID,

  dataTrip: state.history.dataTrip,
});
const mapDispatchToProps = (dispatch) => ({
  // setInfoOpen: (infoOpen) => dispatch(HistoryActions.setInfoOpen(infoOpen))
});

export default connect(mapStateToProps, mapDispatchToProps)(Markers)

import React, { Component } from 'react';
import { connect } from 'react-redux'
import HistoryActions from '../../../Redux/HistoryRedux'
import { Polyline } from '@react-google-maps/api'
import data from './data';

class Tail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tails: [],
      // tails: data,
      tailsGroup: null
    }
  }

  componentWillMount() {

  }

  componentDidUpdate(prevProps, nextState) {
    let { dataAllPoint, dataTrip } = this.props
    // console.log("dataTrip XXXXX: ", dataTrip)

    if (prevProps.dataAllPoint !== dataAllPoint) {
      // console.log("____________________")
      // console.log("dataAllPoint UPDATE : ", dataAllPoint)
      let tails = []

      dataAllPoint.map((trip) => {
        trip.map((dt) => {
          tails.push({
            lat: dt.location.lat,
            lng: dt.location.lng
          })
        })
      })
      this.setState({ tails, tailsGroup: null })
      if (tails.length > 0) this.props.sendTails(tails)
      // console.log("RENDER TIAL : ", JSON.stringify(tails))

      // console.log("____________________")
    }



    // if (prevProps.dataHistory !== this.props.dataHistory) {

    //   let { dataHistory } = this.props

    //   let tails = []
    //   if (dataHistory && dataHistory.trips && dataHistory.trips.length > 0) {
    //     dataHistory.trips.map((trips) => {
    //       if (trips[29].length === 0) {
    //         let ar = trips[9].split(',')
    //         if (trips[21] === 2) ar = trips[17].split(',')

    //         tails.push({ lat: Number(ar[0]), lng: Number(ar[1]) })

    //       } else if (trips[21] !== 5 && trips[21] !== 6) {
    //         trips[29].map((item) => {
    //           tails.push({ lat: item[2], lng: item[3] })
    //         })
    //       }

    //     })
    //   }

    //   this.setState({ tails, tailsGroup: null })
    //   if (tails.length > 0) this.props.sendTails(tails)
    // }

    // if (prevProps.tailActive !== this.props.tailActive) {
    //   let { tailActive } = this.props
    //   this.setState({ tailsGroup: tailActive })
    //   if (tailActive !== null) {
    //     if (tailActive.length > 0) this.props.sendTails(tailActive)
    //   }
    // }
  }


  setPolyline(tails, lineType) {
    // trip : #4CD964  normal: #0000ff
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

  render() {
    let { tails, tailsGroup } = this.state

    // console.log("tails : >>> ", JSON.stringify(tails))

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
  eventId: state.history.eventId,

  dataAllPoint: state.history.dataAllPoint,
  dataTrip: state.history.dataTrip,
});
const mapDispatchToProps = (dispatch) => ({
  // setFocusPosition: (lat, lng) => dispatch(HistoryActions.setFocusPosition(lat, lng))
});


export default connect(mapStateToProps, mapDispatchToProps)(Tail)

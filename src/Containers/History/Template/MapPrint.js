import React, { Component } from 'react';
import { connect } from 'react-redux'
import HistoryActions from '../../../Redux/HistoryRedux'

import { Col, Row } from 'reactstrap'

import { GoogleMap, LoadScript, InfoWindow } from '@react-google-maps/api'


// import icStart from './icons/ic-start.png'
// import icWayPoint from './icons/ic-way-point.png'
// import icEnd from './icons/ic-end.png'

import Markers from '../Objects/Markers'
import Tail from '../Objects/Tail'
import Images from '../icons/Images'
import $ from 'jquery';
import html2canvas from 'html2canvas';


class MapPrint extends Component {

  constructor(props) {
    super(props)
    this.state = {

      centerDefault: { lat: 13.786377, lng: 100.608755 },
      zoomDefault: 5,

      tails: [],
      imgData: null,
      // printMap: false,
      // mapLoad: null

    }

  }


  componentDidUpdate(prevProps, nextState) {

    // console.log('mapLoad', nextState.mapLoad, this.state.mapLoad)

    if (nextState.mapLoad !== this.state.mapLoad && this.state.mapLoad) {
      // console.log('mapLoad', this.state.mapLoad)
      // this.canvasMap(5000)

    }
    // if (prevProps.dataHistory !== this.props.dataHistory) {
    //   this.setState({ printMap: true })
    // }
    if (prevProps.printMap !== this.props.printMap && this.props.printMap) {
      this.canvasMap()
    }
  }

  // componentWillMount() {

  // }


  canvasMap(time) {
    try {
      let div = document.querySelector("#maphistory-print")
      if (div) {
        html2canvas(div,
          {
            useCORS: true
          }).then(canvas => {
            // console.log('canvas', canvas)
            const imgData = canvas.toDataURL('image/png');
            this.props.setImgMap(imgData, false)
            // this.props.setPrint()
          });
      }
    } catch (error) {

    }

  }

  // printHistory() {
  //   this.setState({ printMap: false })

  //   let div = document.querySelector("#maphistory-print")

  //   setTimeout(() => {

  //     html2canvas(div,
  //       {
  //         useCORS: true
  //       }).then(canvas => {
  //         const imgData = canvas.toDataURL('image/png');
  //         this.props.setImgMap(imgData, false)

  //       });

  //   }, 2000)

  // }

  fitBounds(tails) {
    this.setState({ tails })
    const bounds = new window.google.maps.LatLngBounds();

    tails.map(item => {
      bounds.extend({ lat: item.lat, lng: item.lng });
    });

    this.map.fitBounds(bounds);
  };


  render() {
    let { centerDefault } = this.state

    return (
      <Row>
        {/* <LoadScript id="script-loader" googleMapsApiKey={"AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&libraries=geometry"}> */}
        <GoogleMap
          onLoad={map => {
            this.map = map
            this.setState({ mapLoad: map })
          }}
          mapContainerClassName={'map-containerTest'}
          zoom={this.state.zoomDefault}
          disableDefaultUI={true}
          center={centerDefault}
          options={{
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false

          }}
          id='maphistory-print'
          mapContainerStyle={{
            width: '100%',
            // height: "calc(100vh - 61px)",
            height: 500,
          }}
        >

          {
            this.map !== undefined && <Tail sendTails={(tails => this.fitBounds(tails))} />
          }

          {
            this.map !== undefined &&
            <Markers zoom={this.map.zoom} objectEnabled={true} isPrint={true} />
          }

        </GoogleMap>

        {/* </LoadScript > */}
      </Row >
    )
  }
}

const mapStateToProps = (state) => ({
  hideFooter: state.history.hideFooter,
  focusLocation: state.history.focusLocation,
  dataHistory: state.history.dataHistory,
});
const mapDispatchToProps = (dispatch) => ({
  setImgMap: (imgMap, buttonPrint) => dispatch(HistoryActions.setImgMap(imgMap, buttonPrint)),
});


export default connect(mapStateToProps, mapDispatchToProps)(MapPrint)

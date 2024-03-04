import React, { Component } from 'react';
import { connect } from 'react-redux'
import HistoryActions from '../../../Redux/HistoryRedux'
import { InfoWindow } from '@react-google-maps/api'

class InfoWindows extends Component {
  constructor(props) {
    super(props)
    this.state = {
      positionMarker: null

    }
  }
 

  render() {
//  let  { infoMarker } = this.props.
     
    // return (positionMarker !== null && infoMarker !== null &&
    //   <InfoWindow
    //     anchor={anchor}
    //     onCloseClick={() => this.props.setInfoMarker(null, null)}
    //     position={position}
    //   >
    //      {"ACR-12345"}
    //   </InfoWindow>
    // )

  return <div></div>

  }
}

const mapStateToProps = (state) => ({
  // infoMarker: state.history.infoMarker,
  // infoOpen: state.history.infoOpen
});
const mapDispatchToProps = (dispatch) => ({
  // setInfoOpen: (infoOpen) => dispatch(HistoryActions.setInfoOpen(infoOpen))
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoWindows)

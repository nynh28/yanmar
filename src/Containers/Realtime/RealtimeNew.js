import React, { Component } from 'react';
import { connect } from 'react-redux'
import RealtimeActions from '../../Redux/RealtimeRedux'
import { LoadScriptNext } from '@react-google-maps/api'
import Map from './Map'
import './Styles/custom.css'
import DashboardPanel from './DashboardPanel'
import { Col } from 'reactstrap'

class Realtime extends Component {
  render() {
    let keyApi = this.props.language === 'en' ? "AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&libraries=geometry&language=en&region=EN"
      : "AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&libraries=geometry&language=th&region=TH"
    return (
      <div>
        <DashboardPanel />
        <div id='mydiv' style={{ paddingLeft: 6, paddingRight: 7 }}>
          <Col lg={12} style={{ marginTop: -10 }}>
            <LoadScriptNext id="script-loader" googleMapsApiKey={keyApi}>
              <Map dashboardHidden={false} />
            </LoadScriptNext>
          </Col>
        </div >
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  language: state.versatile.language
});

const mapDispatchToProps = (dispatch) => ({
  // getInitialTruckData: () => dispatch(RealtimeActions.getInitialTruckData()),
  // getInitialDriverData: () => dispatch(RealtimeActions.getInitialDriverData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Realtime)


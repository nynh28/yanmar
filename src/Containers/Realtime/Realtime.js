// import React, { Component } from 'react';
// import { LoadScript } from '@react-google-maps/api'
// import Map from './Map'
// import './Styles/custom.css'
// import $ from 'jquery'
// import Dashboard from './Dashboard'
// import { connect } from 'react-redux'
// import RealtimeActions from '../../Redux/RealtimeRedux'
// import { Row, Col } from 'reactstrap'
// import AmplifyRealtime from './AmplifyRealtime';
// import DashboardPanel from './DashboardPanel'

// let showDashboard = false

// class Realtime extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showDashboard: true,
//       dashboardActive: true
//     }
//   }

//   // _onCollapseComponent = (value) => {
//   //   this.setState({ showDashboard: value })
//   //   showDashboard = true
//   //   let myibox2 = $(`#content-colaps`)
//   //   myibox2.slideToggle(600);
//   // }

//   render() {
//     let { showDashboard } = this.state
//     let keyApi = this.props.language === 'en' ? "AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&libraries=geometry&language=en&region=EN"
//       : "AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&libraries=geometry&language=th&region=TH"
//     return (
//       <div>
//         <DashboardPanel />

//         <div id='mydiv' style={{ paddingLeft: 6, paddingRight: 7 }}>
//           <Col lg={12} style={{ marginTop: -10 }}>
//             <LoadScript id="script-loader" googleMapsApiKey={keyApi}>
//               <Map dashboardHidden={false} />
//             </LoadScript>
//           </Col>
//         </div >
//         <AmplifyRealtime />
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state) => ({
//   // vehicles: state.realtime.vehicles,
//   drivers: state.realtime.drivers,
//   language: state.versatile.language,
// });

// const mapDispatchToProps = (dispatch) => ({
//   getInitialTruckData: () => dispatch(RealtimeActions.getInitialTruckData()),
//   getInitialDriverData: () => dispatch(RealtimeActions.getInitialDriverData()),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Realtime)

import React, { Component, Suspense } from 'react';
import { LoadScriptNext } from '@react-google-maps/api'
import Map from './Map'
import './Styles/custom.css'
import $ from 'jquery'
import Dashboard from './Dashboard'
import { connect } from 'react-redux'
import RealtimeActions from '../../Redux/RealtimeRedux'
import { Row, Col } from 'reactstrap'
import AmplifyRealtime from './AmplifyRealtime';

let showDashboard = false

class Realtime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDashboard: true,
      dashboardActive: true
    }
  }

  _onCollapseComponent = (value) => {
    this.setState({ showDashboard: value })
    showDashboard = true
    let myibox2 = $(`#content-colaps`)
    myibox2.slideToggle(600);
  }

  render() {
    let { showDashboard } = this.state
    let keyApi = this.props.language === 'en' ? "AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&libraries=geometry&language=en&region=EN"
      : this.props.language === 'ja' ? "AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&libraries=geometry&language=ja&region=JA"
        : "AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&libraries=geometry&language=th&region=TH"
    return (
      <Suspense>
        {/* <div id={"content-colaps"} style={{ backgroundColor: "#bac2c4", marginBottom: -20, padding: "0px 27px 0px 27px" }}> */}
        <div id={"content-colaps"}>
          <Dashboard />
        </div>
        {/* </div> */}

        {/* <div id='mydiv' style={{ paddingLeft: 6, paddingRight: 7 }}> */}
        {/* <Col lg={12} style={{ marginTop: -10 }}> */}
        <div>
          <LoadScriptNext id="script-loader" googleMapsApiKey={keyApi}>
            <Map dashboardHidden={false} onShowDashboard={(value) => {
              this._onCollapseComponent(value)
            }
            } />
          </LoadScriptNext>
        </div>
        {/* </Col> */}
        {/* </div > */}
        <AmplifyRealtime />
      </Suspense >
    )
  }
}

const mapStateToProps = (state) => ({
  // vehicles: state.realtime.vehicles,
  drivers: state.realtime.drivers,
  language: state.versatile.language,
});

const mapDispatchToProps = (dispatch) => ({
  getInitialTruckData: () => dispatch(RealtimeActions.getInitialTruckData()),
  getInitialDriverData: () => dispatch(RealtimeActions.getInitialDriverData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Realtime)


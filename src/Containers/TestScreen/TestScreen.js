import React, { Component } from 'react'
// import { Switch, withRouter } from 'react-router'
import {
  Row, Col,
  Card, CardHeader, CardBlock,
  Button,

} from "reactstrap";
import Images from '../../Themes/Images'
import MapControlsCustom from '../../Components/GoogleMap/MapControlsCustomNew'
import { LoadScriptNext, GoogleMap } from '@react-google-maps/api'
// import './Styles/StylesTestScreen.css'
class TestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      centerDefualt: {
        lat: 13.786377,
        lng: 100.608755
      },
      zoomDefault: 5,
      mapLoad: null,
      defaultActiveButtons: {
        alert: true,
        licensePlate: true,
        dashboard: true,
        geofences: [3, 8, 10],
        testest: 4
      },
      activeButtons: {
        cluster: true,
        mapType: 'satellite'
      }
    }
    this.map = null
  }

  render() {
    let { zoomDefault, centerDefualt, defaultActiveButtons, activeButtons } = this.state
    let keyApi = "AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&libraries=geometry&language=en&region=EN"

    // console.log('---------------------- TestScreen Screen ------------------------------')
    return (
      <LoadScriptNext id="script-loader" googleMapsApiKey={keyApi}>
        <GoogleMap
          onLoad={map => {
            this.map = map
            this.setState({ mapLoad: map })
          }}
          zoom={zoomDefault}
          center={centerDefualt}
          disableDefaultUI={true}
          mapContainerClassName={"map"}
          id='test-screen-map'
          options={{
            gestureHandling: 'greedy',
            zoomControl: true,
            zoomControlOptions: {
              position: 5,
            },
            mapTypeControl: false,
            streetViewControl: true,
            streetViewControlOptions: {
              position: 5,
            },
            rotateControl: false,
            fullscreenControl: false
          }}
          mapContainerStyle={{
            width: '100%',
            height: "calc(83vh)"
          }}
        >

          {this.map !== null && <MapControlsCustom
            position={1}
            width="auto"
            map={this.map}
            beforeCusBtn={[
              { id: "alert", title: "Alert", icon: "fa fa-bell" },
              { id: "cluster", title: "Cluster", icon: "icon-layer-group" },
              { id: "objects", title: "Objects", icon: "icon-location-arrow" },
              { id: "fitObjects", title: "Fit Objects", icon: "icon-expand" },
              {
                id: "testest", title: "TESTTTTT", icon: "fas fa-air-freshener", sub: [
                  { key: 1, name: 'test1' },
                  { key: 2, name: 'test2' },
                  { key: 3, name: 'test3' },
                  { key: 4, name: 'test4' },
                  { key: 5, name: 'test5' }
                ]
              },
            ]}
            afterCusBtn={[
              { id: "dashboard", title: "Dashboard", icon: "fa fa-area-chart" },
              { id: "dashboard2", title: "Dashboard", icon: "fa fa-filter" },
              { id: "info", title: "Info", icon: "fa fa-info-circle" }
            ]}
            defaultActiveButtons={defaultActiveButtons}
            activeButtons={activeButtons}
            disableButtons={["fullscreen"]}
            onToggleActive={(id, value) => {
              let _activeButtons = JSON.parse(JSON.stringify(activeButtons))
              _activeButtons[id] = value
              console.log('_activeButtons', _activeButtons)
              this.setState({ activeButtons: _activeButtons })
            }}
            hiddenButtons={["measure", "dashboard"]}
          />
          }
        </GoogleMap>
      </LoadScriptNext>
    )
  }
}

export default TestScreen

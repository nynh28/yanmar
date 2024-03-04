import React, { Component } from 'react';
import { GoogleMap, LoadScriptNext, Marker, Polyline } from '@react-google-maps/api'
import { Animation, Chart, Series, Legend, ArgumentAxis, ValueAxis, Title, Pane, Grid, Tooltip, Crosshair, ConstantLine, Label, VisualRange, Size, Point, ScrollBar, ZoomAndPan } from 'devextreme-react/chart';
import './Map.css';
import OverlayPanel from './OverlayPanel';
import dataSource from '../Graph/data';
import RPMchart from './RPM/RPM'
import SPEEDchart from './SPEED/SPEED'
import AVGSPEEDchart from './AVGSPEED/AVGSPEED'
import IDLEchart from './IDLE/IDLE'
import FUELchart from './FUEL/FUEL'

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabsVehicle_Usage: true,
      tabsRPM: false,
      tabsSpeed: false,
      tabsAVG_Speed: false,
      tabsIdliling: false,
      tabsBreak: false,
      tabsFuel_Usages: false,
      selectedDevice: null,
      selectedposition: [],
      reporttype: 1,
      eventmark: false,
      eventmarks: []
    }

  }
  eventMarker(event) {
    this.setState({
      eventmark: true,
      eventmarks: event
    }, () => {
      console.log(this.state.eventmark);
      this.map.panTo({ lat: this.state.eventmarks.position.lat, lng: this.state.eventmarks.position.lng })

    })
    // var marker = this.map.Marker({
    //     position: myLatLng,
    //     map: map,
    //     title: 'Hello World!'
    // });
  }
  rerenderReportType(type) {
    this.setState({
      reporttype: type
    });
  }
  rerenderDeviceInformation(device) {
    this.setState({
      selectedDevice: device,
    }, () => {

    });
  }
  rerenderGoogle(device) {
    var tmpposition = [];
    device.event.map((event, i) => {
      tmpposition.push({
        lat: event.position.lat,
        lng: event.position.lng
      })
    });
    this.setState({
      selectedDevice: device,
      selectedposition: tmpposition
    }, () => {
      this.map.panTo({
        lat: tmpposition[0].lat,
        lng: tmpposition[0].lng
      })
      this.map.setZoom(14);
      console.log(this.state.selectedDevice);
    });
  }
  selectTab(e) {
    for (var i = 0; i < document.getElementsByClassName('tabclick').length; i++) {
      document.getElementsByClassName('tabclick')[i].classList.remove("active")
    }
    e.target.parentElement.classList.add("active");

    switch (e.target.getAttribute("button_value")) {
      case "tabsVehicle_Usage":
        this.setState({
          blanktabs: false,
          tabsVehicle_Usage: true,
          tabsRPM: false,
          tabsSpeed: false,
          tabsAVG_Speed: false,
          tabsIdliling: false,
          tabsBreak: false,
          tabsFuel_Usages: false
        })
        break;
      case "tabsRPM":
        this.setState({
          blanktabs: false,
          tabsVehicle_Usage: false,
          tabsRPM: true,
          tabsSpeed: false,
          tabsAVG_Speed: false,
          tabsIdliling: false,
          tabsBreak: false,
          tabsFuel_Usages: false
        })
        break;
      case "tabsSpeed":
        this.setState({
          blanktabs: false,
          tabsVehicle_Usage: false,
          tabsRPM: false,
          tabsSpeed: true,
          tabsAVG_Speed: false,
          tabsIdliling: false,
          tabsBreak: false,
          tabsFuel_Usages: false
        })
        break;
      case "tabsAVG_Speed":
        this.setState({
          blanktabs: false,
          tabsVehicle_Usage: false,
          tabsRPM: false,
          tabsSpeed: false,
          tabsAVG_Speed: true,
          tabsIdliling: false,
          tabsBreak: false,
          tabsFuel_Usages: false
        })
        break;
      case "tabsIdliling":
        this.setState({
          blanktabs: false,
          tabsVehicle_Usage: false,
          tabsRPM: false,
          tabsSpeed: false,
          tabsAVG_Speed: false,
          tabsIdliling: true,
          tabsBreak: false,
          tabsFuel_Usages: false
        })
        break;
      case "tabsBreak":
        this.setState({
          blanktabs: false,
          tabsVehicle_Usage: false,
          tabsRPM: false,
          tabsSpeed: false,
          tabsAVG_Speed: false,
          tabsIdliling: false,
          tabsBreak: true,
          tabsFuel_Usages: false
        })
        break;
      case "tabsFuel_Usages":
        this.setState({
          blanktabs: false,
          tabsVehicle_Usage: false,
          tabsRPM: false,
          tabsSpeed: false,
          tabsAVG_Speed: false,
          tabsIdliling: false,
          tabsBreak: false,
          tabsFuel_Usages: true
        })
        break;
    }
  }
  render() {
    return (
      <div className="row">
        <div style={{ position: 'relative' }} className="col-md-12">
          <div style={{ width: '100%', lineHeight: '70px', height: '70px', backgroundColor: 'white', textAlign: 'center' }}>
            Advertiseing Area
                        </div>
          <OverlayPanel rerenderDeviceInformation={this.rerenderDeviceInformation.bind(this)} seteventMarker={this.eventMarker.bind(this)} setReport={this.rerenderReportType.bind(this)} rerenderGoogle={this.rerenderGoogle.bind(this)}></OverlayPanel>
          <LoadScriptNext id="script-loader" googleMapsApiKey={"AIzaSyARJq0tmjYp9iw9YkEDmJZTJz4fU73e4ZI"}>
            <GoogleMap onLoad={map => { this.map = map }} zoom={12} disableDefaultUI={true} center={{ lat: 13.887107, lng: 100.583897 }} mapContainerClassName={"map"} id='example-map'>
              {this.state.eventmark && (
                <Marker onLoad={marker => { console.log(marker); }} icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }} position={{ lat: this.state.eventmarks.position.lat, lng: this.state.eventmarks.position.lng }}></Marker>
              )}
              <Polyline
                onLoad={polyline => {
                  this.polyline = polyline
                }}

                path={this.state.selectedposition}
                options={{
                  strokeColor: '#FF0000',
                  strokeOpacity: 0.8,
                  strokeWeight: 13,
                  fillColor: '#FF0000',
                  fillOpacity: 0.35,
                  clickable: false,
                  draggable: false,
                  editable: false,
                  visible: true,
                  radius: 30000,
                  paths: [
                    { lat: 37.772, lng: -122.214 },
                    { lat: 21.291, lng: -157.821 },
                    { lat: -18.142, lng: 178.431 },
                    { lat: -27.467, lng: 153.027 }
                  ],
                  zIndex: 1
                }}
              />
            </GoogleMap>
          </LoadScriptNext>
          <div style={{ backgroundColor: 'white', width: '100%', maxHeight: '250px' }}>
            <div className="row">
              <div className="col-lg-12">
                <div className="tabs-container">
                  <ul className="nav nav-tabs">
                    <li onClick={this.selectTab.bind(this)} className="tabclick active"><a button_value="tabsVehicle_Usage">Vehicle Usage</a></li>
                    {this.state.selectedDevice && (<li onClick={this.selectTab.bind(this)} className="tabclick"><a button_value="tabsSpeed">Speed</a></li>)}
                    {this.state.selectedDevice && (<li onClick={this.selectTab.bind(this)} className="tabclick"><a button_value="tabsAVG_Speed">AVG Speed</a></li>)}
                    {this.state.selectedDevice && (<li onClick={this.selectTab.bind(this)} className="tabclick"><a button_value="tabsIdliling">Idliling</a></li>)}
                    {this.state.selectedDevice && (<li onClick={this.selectTab.bind(this)} className="tabclick"><a button_value="tabsRPM">RPM</a></li>)}



                    {/* <li onClick={this.selectTab.bind(this)} className="tabclick"><a button_value="tabsBreak">Break</a></li> */}

                  </ul>
                  <div className="tab-content">
                    {this.state.tabsVehicle_Usage && (
                      <div style={{ display: 'block' }} id="tab-1" className="tab-pane">
                        <div className="panel-body">
                          <div style={{ padding: '0px' }}>
                            <div className="row">
                              <div className="col-md-3">
                                {this.state.selectedDevice && (<b>{this.state.selectedDevice.device_name}</b>)}<br></br>
                                {this.state.selectedDevice && (<small>Model : FG8JH1B-PGT</small>)}<br></br>
                                <div className="row">
                                  <div className="col-md-6">
                                    {this.state.selectedDevice && (<small style={{ color: 'green' }}>ONLINE</small>)}<br></br>
                                    {this.state.selectedDevice && (<small>Speed : 20(80) km/hr</small>)}<br></br>
                                    {this.state.selectedDevice && (<small>RPM : 850</small>)}<br></br>
                                  </div>
                                  <div className="col-md-6">
                                    {this.state.selectedDevice && (<small>Odometer : 8323 km</small>)}<br></br>
                                    {this.state.selectedDevice && (<small>Engine Hour : 239 hr</small>)}<br></br>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-2">
                                {this.state.selectedDevice && (<b>Driver</b>)}<br></br>
                                {this.state.selectedDevice && (<small><b>Loylum Bunnag</b></small>)}<br></br>
                                {this.state.selectedDevice && (<small>Driving Time : 3hr 20 min</small>)}<br></br>
                              </div>
                              <div className="col-md-3">
                                {this.state.selectedDevice && (<b>Status</b>)}<br></br>
                                {this.state.selectedDevice && (<small><b>GPS Signal</b> {this.state.selectedDevice.gps_signal} </small>)}<br></br>
                                {this.state.selectedDevice && (<small><b>GSM Signal</b> {this.state.selectedDevice.gsm_signal}</small>)}<br></br>
                              </div>
                              <div className=" col-md-4">
                                <div className="row">
                                  {this.state.selectedDevice && (<b>Sensors</b>)}<br></br>
                                  <div className="col-md-6">
                                    {this.state.selectedDevice && (<small>Engine : {this.state.selectedDevice.sensors_engine}</small>)}<br></br>
                                    {this.state.selectedDevice && (<small>Car Battery : {this.state.selectedDevice.sensors_carbattery}</small>)}<br></br>
                                    {this.state.selectedDevice && (<small>Device Battery : {this.state.selectedDevice.sensors_devicebattery}</small>)}<br></br>
                                    {this.state.selectedDevice && (<small>Fuel Level : {this.state.selectedDevice.sensors_fuel_level}</small>)}<br></br>
                                    {this.state.selectedDevice && (<small>Fuel Consumption : {this.state.selectedDevice.sensors_fuel_consumption} litre/km</small>)}<br></br>
                                  </div>
                                  <div className="col-md-6">
                                    {this.state.selectedDevice && (<small>Coolant : {this.state.selectedDevice.sensors_coolant} °C</small>)}<br></br>
                                    {this.state.selectedDevice && (<small>Door Sensors : {this.state.selectedDevice.sensors_doorsensors}</small>)}<br></br>
                                    {this.state.selectedDevice && (<small>Foot Pedal : {this.state.selectedDevice.sensors_fool_pedal} %</small>)}<br></br>
                                    {this.state.selectedDevice && (<small>Safety Belt : {this.state.selectedDevice.sensors_safety_belt}</small>)}<br></br>
                                    {this.state.selectedDevice && (<small>Exhaust Break : {this.state.selectedDevice.sensors_sensors_exhaust_breakengine}</small>)}<br></br>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {this.state.tabsRPM && (
                      <div style={{ display: 'block' }} id="tab-1" className="tab-pane">
                        <div className="panel-body">
                          <div style={{ padding: '0px' }}>
                            <RPMchart chartHeight={150}></RPMchart>
                          </div>
                        </div>
                      </div>
                    )}
                    {this.state.tabsSpeed && (
                      <div style={{ display: 'block' }} id="tab-1" className="tab-pane">
                        <div className="panel-body">
                          <div style={{ padding: '0px' }}>
                            <SPEEDchart chartHeight={150}></SPEEDchart>
                          </div>
                        </div>
                      </div>
                    )}
                    {this.state.tabsAVG_Speed && (
                      <div style={{ display: 'block' }} id="tab-1" className="tab-pane">
                        <div className="panel-body">
                          <div style={{ padding: '0px' }}>
                            <AVGSPEEDchart chartHeight={150}></AVGSPEEDchart>
                          </div>
                        </div>
                      </div>
                    )}
                    {this.state.tabsIdliling && (
                      <div style={{ display: 'block' }} id="tab-1" className="tab-pane">
                        <div className="panel-body">
                          <div style={{ padding: '0px' }}>
                            <IDLEchart chartHeight={150}></IDLEchart>
                          </div>
                        </div>
                      </div>
                    )}
                    {this.state.tabsBreak && (
                      <div style={{ display: 'block' }} id="tab-1" className="tab-pane">
                        <div className="panel-body">
                          <div style={{ padding: '0px' }}>
                            <Chart
                              palette={'Harmony Light'}
                              dataSource={dataSource}
                              commonSeriesSettings={{ argumentField: 'month' }}
                              style={{ maxHeight: '200px' }}
                            >
                              <Size
                                height={200}
                                width={'95%'}
                              >
                              </Size>
                              <ZoomAndPan argumentAxis={'both'} dragToZoom={true} />
                              <ValueAxis
                                max={100}

                              ></ValueAxis>
                              <Series type="area" valueField={'avgT'} name={'Avg Speed'}></Series>
                              <Legend
                                visible={false}
                                verticalAlignment={'bottom'}
                                horizontalAlignment={'center'}
                              />
                              <ArgumentAxis label={{ visible: false }}></ArgumentAxis>
                            </Chart>
                          </div>
                        </div>
                      </div>
                    )}
                    {this.state.tabsFuel_Usages && (
                      <div style={{ display: 'block' }} id="tab-1" className="tab-pane">
                        <div className="panel-body">
                          <div style={{ padding: '0px' }}>
                            <FUELchart chartHeight={150}></FUELchart>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>

    )
  }
}

export default Map;

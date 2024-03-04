import React from "react";
import { Row, Col } from "reactstrap";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '../../Dashboard/table.css';
import Operationchartvehicle from '../../Dashboard/Graph/Operationvehicle/Operationchartvehicle'

import Operationchartdriver from '../../Dashboard/Graph/Operationdriver/Operationchartdriver'

import { LoadScriptNext } from '@react-google-maps/api'
import Map from '../../Realtime/Map'
import DrivingBehavior from '../Realtime Dashboard/DrivingBehavior'
import { connect } from 'react-redux'

import { ENDPOINT_BASE_URL, ENDPOINT_SETTING_REPORT_BASE_URL } from '../../../Config/app-config';
import { t } from '../../../Components/Translation'
// import $ from "jquery";
const { get, isEqual } = require('lodash')

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}
function handleErrors(response) {
  if (!response.ok)
    throw Error(response.statusText);
  return response;
}

class realtimedashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      startdatefocus: false,
      enddatefocus: false,
      add: false,


      selectedDevice: null,
      selectedposition: [],
      reporttype: 1,
      eventmark: false,
      eventmarks: [],
      infoOpen: false,
      centerDefualt: {
        lat: 13.786377,
        lng: 100.608755
      },
      zoomDefault: 5,
      truckActive: null,
      arrImg: [],
      arrImgActive: [],
      pathHistory: [],
      clusterEnabled: true,
      objectEnabled: true,
      fitObjectEnabled: false,
      GeofencesEnabled: false,
      markerMap: null,
      infoEnabled: true,
      onDragingStatus: false,
      mapLoad: null,

      infoWindowEnabled: false
    }
    this.prevloadOption = {}
    this.datagrid = React.createRef()
    this.spec_code = React.createRef();
    this.vehicle_name = React.createRef();
    this.start_date = React.createRef()
    this.end_date = React.createRef()
    this.startdateCalendar = React.createRef();
    this.enddateCalendar = React.createRef();
    this.Datepicker = React.createRef();



  }

  async loadvehicle() {
    var userId = this.props.dataLogin.userId
    var object = {
      userId: userId,
    }
    // var dealer_id = this.state.selected_dealer;
    // var vehicle_type = this.state.selected_vehicle_type;
    // var fleet_id = this.state.selected_fleet;
    // var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/getallvehicle"
    var api = ENDPOINT_BASE_URL + "fleet/getallvehicle"
    // var object = {
    //   type_id: vehicle_type,
    //   fleet_id: fleet_id,
    //   dealer_id: dealer_id
    // }
    var response = await fetch(api, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)

    });
    var responseJson = await response.json();
    console.log(responseJson);
    this.setState({
      vehicle: responseJson.vehicle
    })
    // if (responseJson.fleet.length > 0) {
    //   this.setState({
    //     vehicle: responseJson.vehicle,
    //     fleet: responseJson.fleet
    //   })
    // } else {
    //   this.setState({
    //     vehicle: responseJson.vehicle,
    //   })
    // }

  }

  // loadTrigger(){
  //     this.datagrid.current.instance.refresh();
  // }
  // componentDidMount(){
  //     this.readyonload = 1;
  //     this.datagrid.current.instance.refresh();
  // }
  componentDidMount() {

    this.loadvehicle();

  }

  componentDidUpdate(prevProps, nextState) {
    if (!isEqual(prevProps.focusPosition, this.props.focusPosition)) {

      // console.log(prevProps.focusPosition, this.props.focusPosition)
      let zoom = this.props.zoom ? this.props.zoom : this.map.zoom
      this.setDefualtMap(this.props.focusPosition.lat, this.props.focusPosition.lng, zoom)
      this.props.setZoomMap(undefined)
      // this.props.setActiveMap(true)

      if (!this.state.fitObjectEnabled) this.setState({ fitObjectEnabled: true })


    }
    else if (this.props.activeMap && this.map) {
      let lat = this.map.center.lat()
      let lng = this.map.center.lng()
      if (!isEqual({ lat, lng }, this.props.focusPosition)) {
        let zoom = this.props.zoom ? this.props.zoom : this.map.zoom
        this.setDefualtMap(this.props.focusPosition.lat, this.props.focusPosition.lng, zoom)
        this.props.setZoomMap(undefined)
      }
    }




    if (prevProps.activeMap !== this.props.activeMap) {
      this.setState({ fitObjectEnabled: this.props.activeMap })
    }
  }

  goadd(e) {
    console.log(e)
    this.setState({
      add: true,

    })
  }
  gomain() {
    this.setState({
      add: false,
    })
  }










  render() {
    let { fitObjectEnabled, GeofencesEnabled, objectEnabled, clusterEnabled, infoWindowEnabled, arrImg, arrImgActive } = this.state
    var config = {
      language: 'TH',
      showDropdowns: true,
      format: "MM/DD/YYYY" // รองรับแต่ format นี้ เท่านั้น !!!!!!!!
    };

    return (

      <div className="row" style={{ marginLeft: 5 }}>
        <div style={{ paddingTop: 22, paddingBottom: 40, backgroundColor: 'whitesmoke', marginBottom: 20, marginLeft: -36, marginTop: -30, marginRight: -20 }}>
          <div className="col-md-10">
            <h3 style={{ fontWeight: "bold", fontSize: 18, marginLeft: 20 }}>Real Time Dashboard</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            <div className="ibox float-e-margins">
              <div className="ibox-title"  >
                <div style={{ fontWeight: "bold" }}>
                  <i className="fa fa-location-arrow" aria-hidden="true" style={{ marginRight: 10 }}></i>
                  <label style={{ fontWeight: "bold", fontSize: 18 }}>{t('realtime_88')}</label>
                </div>
              </div>
              <div className="ibox-content" style={{ height: 420 }}>
                <div className="row">
                  <div className="col-md-6">
                    <div style={{ margin: 10, fontSize: 16 }} className={'text-center'}><h3>My Vehicles</h3></div>
                    <Operationchartvehicle chartHeight={400} chartWeight={470}></Operationchartvehicle>
                  </div>
                  <div className="col-md-6">
                    <div style={{ margin: 10, fontSize: 16 }} className={'text-center'}><h3>My Drivers</h3></div>
                    <Operationchartdriver chartHeight={400} chartWeight={470}></Operationchartdriver>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <DrivingBehavior />
          </div>

          <div className="row" >
            <div className="col-md-12" style={{ left: 30 }}>
              <Col style={{ position: 'relative', width: '95.8%', height: "calc(98vh)", }}>
                <Row>
                  <LoadScriptNext id="script-loader" googleMapsApiKey={"AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&libraries=geometry"}>
                    <Map />
                  </LoadScriptNext>
                </Row>
              </Col>
            </div>
            {/* <div className="col-md-7" style={{ left: 18 }}>
                            <div>
                                <LoadScript id="script-loader" googleMapsApiKey={"AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&libraries=geometry,places"}>
                                    <GoogleMap
                                        onLoad={map => {
                                            this.map = map
                                            this.setState({ mapLoad: map })
                                        }}
                                        zoom={this.state.zoomDefault}
                                        center={this.state.centerDefualt}

                                        onDrag={() => { this.unFocusMarker() }}

                                        // disableDefaultUI={true}
                                        // onDrag={() => { this.unFocusMarker() }}
                                        // onZoomChanged={() => {
                                        //   if (get(this.map, 'zoom')) {
                                        //     console.log('onZoomChanged', get(this.map, 'zoom'))
                                        //     // this.map.setZoom(get(this.map, 'zoom'))
                                        //   }
                                        // }}
                                        mapContainerClassName={"map"}
                                        id='dashboard-map'
                                        options={{
                                            zoomControl: true,
                                            mapTypeControl: true,
                                            streetViewControl: true,
                                            rotateControl: true,
                                            fullscreenControl: true
                                        }}

                                        mapContainerStyle={{
                                            width: '97.5%',
                                            height: "calc(104vh)",

                                        }}
                                    >
                                        {
                                            this.state.mapLoad !== null &&
                                            objectEnabled && <Tail />
                                        }

                                        {
                                            document.getElementById("footer-info") !== null &&
                                            (document.getElementById("footer-info").style.zIndex = 1000000)
                                        }

                                        <StreetViewService
                                            onLoad={
                                                (streetViewService) => {
                                                    streetViewService.getPanorama({
                                                        location: this.state.centerDefualt,
                                                        radius: 50
                                                    }, (data, status) => console.log(
                                                        "StreetViewService results",
                                                        { data, status }
                                                    ))
                                                }
                                            }
                                        />


                                    </GoogleMap>
                                </LoadScript>
                            </div>
                        </div> */}
            {/* <div className="col-md-5">
                            <div className="ibox float-e-margins">
                                <div className="ibox-title"  >
                                    <div style={{ fontWeight: "bold" }}>
                                        <i className="fa fa-location-arrow" aria-hidden="true" style={{ marginRight: 10 }}></i>
                                        <font>Maintenance Status</font>
                                    </div>
                                </div>
                                <div className="ibox-content">
                                    <div className="row" >
                                        <div className="col-md-6" >
                                            <div className="panel panel-default">
                                                <div className="panel-body">
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <label style={{ fontSize: 16 }}>Go To Dealer Immediately</label>
                                                        </div>
                                                        <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'right' }}>
                                                            <label style={{ fontSize: 45, color: 'red', fontWeight: 'bold', margin: -10 }}>1</label>
                                                        </div>
                                                        <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'right' }}>
                                                            <label style={{ fontSize: 16, marginTop: 25 }}>Unit</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6" >
                                            <div className="panel panel-default">
                                                <div className="panel-body">
                                                    <div className="row">
                                                        <div className="col-sm-5">
                                                            <label style={{ fontSize: 16, color: 'grey' }}>Derate Condition</label>
                                                        </div>
                                                        <div className="col-sm-7" style={{ flexDirection: 'row', textAlign: 'left' }}>
                                                            <label style={{ fontSize: 45, color: 'grey', fontWeight: 'bold', margin: 1 }}>N/A</label>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                    <div className="row" >
                                        <div className="col-md-6" >
                                            <div className="panel panel-default">
                                                <div className="panel-body" >
                                                    <div className="row" >
                                                        <div className="col-sm-6">
                                                            <label style={{ fontSize: 16 }}>Maintenance Immediately</label>
                                                        </div>
                                                        <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'right', }}>
                                                            <label style={{ fontSize: 45, color: 'orange', fontWeight: 'bold', margin: -10 }}>1</label>
                                                        </div>
                                                        <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'right' }}>
                                                            <label style={{ fontSize: 16, marginTop: 25 }}>Unit</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6" >
                                            <div className="panel panel-default">
                                                <div className="panel-body">
                                                    <div className="row">
                                                        <div className="col-sm-5">
                                                            <label style={{ fontSize: 16 }}>Service Campaign</label>
                                                        </div>
                                                        <div className="col-sm-4" style={{ flexDirection: 'row', textAlign: 'left' }}>
                                                            <label style={{ fontSize: 45, color: 'blue', fontWeight: 'bold', margin: -10, }}>100</label>
                                                        </div>
                                                        <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'right' }}>
                                                            <label style={{ fontSize: 16, marginTop: 25 }}>Units</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6" >
                                            <div className="panel panel-default">
                                                <div className="panel-body">
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <label style={{ fontSize: 16 }}>Maintenance Soon</label>
                                                        </div>
                                                        <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'right' }}>
                                                            <label style={{ fontSize: 45, color: '#e6e600', fontWeight: 'bold', margin: -10 }}>3</label>
                                                        </div>
                                                        <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'right' }}>
                                                            <label style={{ fontSize: 16, marginTop: 25 }}>Units</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6" >
                                            <div className="panel panel-default">
                                                <div className="panel-body">
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <label style={{ fontSize: 16 }}>Healthy Vehicles</label>
                                                        </div>
                                                        <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'Left' }}>
                                                            <label style={{ fontSize: 45, color: '#00cc00', fontWeight: 'bold', margin: -10 }}>95</label>
                                                        </div>
                                                        <div className="col-sm-3" style={{ flexDirection: 'row', textAlign: 'right' }}>
                                                            <label style={{ fontSize: 16, marginTop: 25 }}>Units</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ibox float-e-margins">
                                <div className="ibox-title" >
                                    <div style={{ fontWeight: "bold" }}>
                                        <i className="fa fa-leaf" aria-hidden="true" style={{ marginRight: 10 }}></i>
                                        <font>Station</font>
                                    </div>
                                </div>
                                <div className="ibox-content">
                                    <Table
                                        dataSource={this.state.vehicle}
                                        mode={"offline"}
                                        //serversideSource={'https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders'}
                                        tableId={0}
                                        user_id={0}
                                        selectedCallback={this.selectedCallback}
                                        initialCallback={this.tableInitial}
                                        column={[
                                            {
                                                column_name: 'vehicle_name',
                                                column_caption: 'Vehicle Count'
                                            }, {
                                                column_name: 'model_code',
                                                column_caption: 'Station Name'
                                            }

                                            // , {
                                            //   column_name: 'chassis_no',
                                            //   column_caption: 'Chassis No'
                                            // }
                                        ]}
                                    >
                                    </Table>
                                </div>
                            </div>
                        </div> */}
          </div>


        </div>
      </div >


    )



  }
}

const mapStateToProps = (state) => {
  return {
    // request_signin: state.auth.request_signin,
    dataLogin: state.signin.dataLogin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // signin: (email, password) => dispatch(AuthActions.signin(email, password)),
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(realtimedashboard))

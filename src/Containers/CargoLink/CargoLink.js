import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose, withProps, lifecycle } from "recompose"
import { GoogleMap, withScriptjs, withGoogleMap, Marker, DirectionsRenderer } from "react-google-maps"
import { Col, Row } from 'reactstrap'
import CargoLinkActions from '../../Redux/CargoLinkRedux'
import './App.css';
import GetOrders from './GetOrders'

// const DirectionsService =


class CargoLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorization: this.props.authorization,
      isMarkerShown: false,
      isFetching: this.props.fetching,
      orders: null,
      content: null,
      strtLat: null,
      strtLng: null,
      destLat: null,
      destLng: null,
      directions: null,
      visible: true,
      idDirection: null
    };

    this.loginId = "+660623640161"
    this.password = "Yasamuth123"
    this.userType = 0

    this.page = 0;
    this.rowsPerPage = 10;
    this.sortBy = "";
    this.descending = true;
    this.orderId = "";
    this.loadingAddress = "";
    this.deliveryAddress = "";
    this.searchType = "Waiting";
    this.loadingTimeFrom = "";
    this.loadingTimeTo = "";
    this.deliveryTimeFrom = "";
    this.deliveryTimeTo = "";
    this.loadingProvince = "";
    this.loadingDistrict = "";
    this.deliveryProvince = "";
    this.deliveryDistrict = "";
    this.loadingProvinceIds = "";
    this.deliveryProvinceIds = "";
  }

  componentWillMount() {
    this.props.setLogin({
      loginId: this.loginId,
      password: this.password,
      userType: this.userType,
    })
    // if(this.props.)

  }

  componentDidUpdate(prevProps) {
    if (prevProps.authorization != this.props.authorization) {
      console.log(this.props.authorization);
      this.props.getOrders({
        page: this.page,
        rowsPerPage: this.rowsPerPage,
        sortBy: this.sortBy,
        descending: this.descending,
        orderId: this.orderId,
        loadingAddress: this.loadingAddress,
        deliveryAddress: this.deliveryAddress,
        searchType: this.searchType,
        loadingTimeFrom: this.loadingTimeFrom,
        loadingTimeTo: this.loadingTimeTo,
        deliveryTimeFrom: this.deliveryTimeFrom,
        deliveryTimeTo: this.deliveryTimeTo,
        loadingProvince: this.loadingProvince,
        loadingDistrict: this.loadingDistrict,
        deliveryProvince: this.deliveryProvince,
        deliveryDistrict: this.deliveryDistrict,
        loadingProvinceIds: this.loadingProvinceIds,
        deliveryProvinceIds: this.deliveryProvinceIds,
      })
    }

    if (this.props.orders != null && this.state.orders != this.props.orders) {
      this.setState({ orders: this.props.orders })
      console.log(this.state.orders)
      // this.setState({
      //   strtLat: this.props.orders.loadingLatitude,
      //   strtLng: this.props.orders.loadingLongitude,
      //   destLat: this.props.orders.shipmentList[0].latitudeDest,
      //   destLng: this.props.orders.shipmentList[0].longitudeDest
      // })
      // console.log(this.shipmentList)
    }

  }

  direction(e) {
    if (this.state.idDirection != e) {
      var DirectionsService = new window.google.maps.DirectionsService();
      if (this.state.orders[e].shipmentList.length > 2) {
        let waypoint = []
        console.log(this.state.orders[e].shipmentList.length)
        this.state.orders[e].shipmentList.forEach((element, i) => {
          console.log(i)
          if (i != (this.state.orders[e].shipmentList.length - 1)) {
            waypoint.push({ location: new window.google.maps.LatLng(element.latitudeDest, element.longitudeDest) })
          }
          // console.log()
        });
        // let waypoint = this.state.orders[e].shipmentList.map(e => ({location: new window.google.maps.LatLng(e.latitudeDest,  e.longitudeDest)}));
        // waypoint = waypoint.pop()
        console.log(waypoint)
        DirectionsService.route({
          origin: new window.google.maps.LatLng(this.state.orders[e].loadingLatitude, this.state.orders[e].loadingLongitude),
          waypoints: waypoint,
          destination: new window.google.maps.LatLng(this.state.orders[e].shipmentList[this.state.orders[e].shipmentList.length - 1].latitudeDest, this.state.orders[e].shipmentList[this.state.orders[e].shipmentList.length - 1].longitudeDest),
          travelMode: window.google.maps.TravelMode.DRIVING,
        }, (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
              isMarkerShown: true
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        });
      }

      else {
        DirectionsService.route({
          origin: new window.google.maps.LatLng(this.state.orders[e].loadingLatitude, this.state.orders[e].loadingLongitude),
          // waypoints: waypoint,
          destination: new window.google.maps.LatLng(this.state.orders[e].shipmentList[this.state.orders[e].shipmentList.length - 1].latitudeDest, this.state.orders[e].shipmentList[this.state.orders[e].shipmentList.length - 1].longitudeDest),
          travelMode: window.google.maps.TravelMode.DRIVING,
        }, (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
              isMarkerShown: true
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        });
      }

      this.setState({ strtLat: this.state.orders[e].loadingLatitude, strtLng: this.state.orders[e].loadingLongitude, destLat: this.state.orders[e].shipmentList[0].latitudeDest, destLng: this.state.orders[e].shipmentList[0].longitudeDest, idDirection: e })
    }
    else {
      this.setState({ isMarkerShown: false, strtLat: null, strtLng: null, destLat: null, destLng: null, directions: null, idDirection: null })
      // this.setState({directions: null, idDirection: null})
    }
  }

  render() {
    // console.log("auth from render")
    // console.log(this.state.authorization)
    return (
      <div>
        <Row>
          <Col lg={6}>
            {/* <div class="float-comp"> */}
            <div style={{
              borderStyle: "solid", borderColor: "#fcba03",
              backgroundColor: "white",

            }}>
              <div className="yellow-bar">
                <h1 className="bar-text">Show Route</h1>
              </div>
              <ul className="no-bullet-list" style={{
                paddingLeft: 0,
                height: 'calc(80vh - 70px)',
                // overflowY: 'scroll'
              }}>
                <Map isMarkerShown={this.state.isMarkerShown}
                  strtLat={this.state.strtLat}
                  strtLng={this.state.strtLng}
                  destLat={this.state.destLat}
                  destLng={this.state.destLng}
                  directions={this.state.directions}
                />
              </ul>
            </div>
            {/* </div> */}
          </Col>
          <Col lg={6}>
            {/* <div class="float-comp2"> */}
            {this.state.isFetching ? <h1>Loading</h1> : (

              <ul style={{
                paddingLeft: 0,
                // height: `calc(85vh - 70px)`
              }}>
                {<GetOrders auth={this.state.authorization} direction={e => this.direction(e)} idDirection={this.state.idDirection} />}
              </ul>

            )}
            {/* </div> */}
          </Col>
        </Row>

      </div>
    );
  }
}

const Map = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `calc(80vh - 70px)` }} />,
    containerElement: <div style={{ height: `calc(80vh - 70px)` }} />,
    mapElement: <div style={{ height: `calc(80vh - 70px)`, }} />,
  }),
  withScriptjs,
  withGoogleMap,
  // lifecycle({
  //   componentDidUpdate() {
  //     if(this.props.)
  //     const DirectionsService = new window.google.maps.DirectionsService();

  //     DirectionsService.route({
  //       origin: new window.google.maps.LatLng(41.8507300, -87.6512600),
  //       destination: new window.google.maps.LatLng(41.8525800, -87.6514100),
  //       travelMode: window.google.maps.TravelMode.DRIVING,
  //     }, (result, status) => {
  //       if (status === window.google.maps.DirectionsStatus.OK) {
  //         this.setState({
  //           directions: result,
  //         });
  //       } else {
  //         console.error(`error fetching directions ${result}`);
  //       }
  //     });
  //   }
  // })
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 13.7563, lng: 100.5018 }}
    mapContainerClassName={"map"}
    id='realtime-map'
    options={{
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false
    }}

    mapContainerStyle={{
      // width: '55%',
      height: "calc(100vh - 127px)",
    }}
  >
    {props.isMarkerShown && <Marker visible={props.isMarkerShown} position={{ lat: props.strtLat, lng: props.strtLng }} />}
    {props.isMarkerShown && <Marker visible={props.isMarkerShown} position={{ lat: props.destLat, lng: props.destLng }} />}
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
)

const mapStateToProps = (state) => ({
  authorization: state.cargolink.authorization,
  fetching: state.cargolink.fetching,
  orders: state.cargolink.orders,
});

const mapDispatchToProps = (dispatch) => ({
  setLogin: (data) => dispatch(CargoLinkActions.setLogin(data)),
  getOrders: (data) => dispatch(CargoLinkActions.getOrders(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CargoLink)

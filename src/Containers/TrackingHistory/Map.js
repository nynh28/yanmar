import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import TrackingHistoryActions from "../../Redux/TrackingHistoryRedux";
import RealtimeNewActions from "../../Redux/RealtimeNewRedux";
import { LoadScriptNext, GoogleMap } from "@react-google-maps/api";
// import Map from './Map'
import { Row, Col } from "reactstrap";
import { Tabs } from "antd";
import "antd/dist/antd.css";
import $ from "jquery";
import MapControl from "../../Components/GoogleMap/MapControl";
import MapControlsCustom from "../../Components/GoogleMap/MapControlsCustom";
// import MapControlsCustom from '../../Components/GoogleMap/MapControlsCustomNew'
import PanelBox from "./Panel/PanelBox";
import PanelImage from "./Panel/PanelImage";
import { t } from "../../Components/Translation";
import Point from "./Objects/Point";
import Tail from "./Objects/Tail";
import MarkTour from "./Objects/MarkTour";
import MarkEvent from "./Objects/MarkEvent";
import MarkInteractiveChart from "./Objects/MarkInteractiveChart";
import LegendStatus from "./Panel/LegendStatus";
import Geofences from "./Objects/Geofences";
import ChartRender from "./Charts/ChartRender";
import Footer from "./Panel/Footer";
import Loading from "./Loading";
import {
  ENDPOINT_BASE_URL,
  setBusinessPOI,
  GOOGLE_MAP_API_KEY,
  YM_BASE_URL,
} from "../../Config/app-config";

const { get } = require("lodash");
const { TabPane } = Tabs;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      centerDefualt: {
        lat: 13.786377,
        lng: 100.608755,
      },
      zoomDefault: 5,
      mapLoad: null,
    };
    this.map = null;
    this.Points = [];
    this.objectVisibled = true;
  }

  componentDidMount() {
    this.loadTripDetial();
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { eventPercent, objectVisibled, eventVisibled, geofenesVisibled } =
      this.props;

    if (
      nextProps.eventPercent !== eventPercent ||
      nextProps.objectVisibled !== objectVisibled ||
      nextProps.eventVisibled !== eventVisibled ||
      nextProps.geofenesVisibled !== geofenesVisibled
    ) {
      return false;
    }

    return true;
  }

  async loadTripDetial() {
    let { tripRange, dataLogin, vin_no, currentValue } = this.props;
    let userid = dataLogin.userId || dataLogin.user_id;
    console.log(dataLogin.platform_id);
    var pid = 1;
    if (dataLogin.platform_id != undefined) {
      pid = 2;
    }
    this.props.setValue("isLoadingTrips", true);
    try {
      // var response = await fetch(ENDPOINT_BASE_URL + "fleet/trips/detail?user_id=" + dataLogin.userId +
      // var response = await fetch("https://engineer.onelink-iot.com:4002/prod/fleet/trips/detail?user_id=" + dataLogin.userId +
      var response = await fetch(
        YM_BASE_URL +
          "fleet/trips/detail?user_id=" +
          userid +
          "&vid=" +
          currentValue +
          "&start=" +
          tripRange.deteStartTrip +
          "&end=" +
          tripRange.deteEndTrip +
          "&platform_id=" +
          pid,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "accept-language": this.props.language,
          },
        }
      );

      var data = await response.json();
      this.props.setHistoryData(data?.result);
      this.props.setValue("isLoadingTrips", false);
      // if (data?.code == 200) {
      //   this.props.setHistoryData(data.result)
      // }
      // else {
      //   this.props.setHistoryData([])
      // }
    } catch (error) {
      this.props.setValue("isLoadingTrips", false);
    }
  }

  async getGeofenceByType(value) {
    let { header } = this.props;

    if (value.length > 0) {
      let url = "?GeofenceTypeIds=" + value.join("&GeofenceTypeIds=");
      let response = await fetch(
        ENDPOINT_BASE_URL + "Geofence/Geofence/ListByTypes" + url,
        {
          method: "GET",
          headers: {
            Authorization: header.idToken,
            "X-API-Key": header.redisKey,
          },
        }
      );
      // console.log('data', data?.code, data)

      if (response.ok) {
        var data = await response.json();
        this.props.setValue("geofenceByTypes", data.geofenceByTypes);
      }
      // else this.props.setValue('geofenceByTypes', [])
    } else {
      this.props.setValue("geofenceByTypes", []);

      // this.props.setValue('name', value)
    }
  }

  between(x, min, max) {
    return x >= min && x <= max;
  }

  checkLocationInBound() {
    if (this.map) {
      const bd = this.map.getBounds();
      // console.log("bd : ", this.props.eventPercent, bd)
      if (this.Points.length > 0 && this.props.objectVisibled) {
        for (let index in this.Points) {
          let lat = this.Points[index].position.lat();
          let lng = this.Points[index].position.lng();
          let latlng = new window.google.maps.LatLng(lat, lng);
          if (bd.contains(latlng) && index % this.props.eventPercent === 0)
            this.Points[index].setVisible(true);
          else this.Points[index].setVisible(false);
        }
      }
    }
  }

  render() {
    let {
      language,
      objectVisibled,
      eventVisibled,
      eventPercent,
      isLoadingTrips,
      cssChart,
      legendVisibled,
      mapType,
      geofences,
      imageVisibled,
      geofenesVisibled,
    } = this.props;
    let { centerDefualt, zoomDefault } = this.state;
    let keyApi =
      language === "en"
        ? "&libraries=drawing,geometry,places&language=en&region=EN"
        : language === "ja"
        ? "&libraries=geometry&language=ja&region=JA"
        : "&libraries=geometry&language=th&region=TH";

    // console.log(">> RENDER MAP <<")
    return (
      <Suspense fallback={null}>
        <Row>
          <Loading />
          <Col
            className={isLoadingTrips ? "" : cssChart}
            lg={12}
            style={{ marginTop: -10 }}
          >
            <LoadScriptNext
              id="script-loader"
              googleMapsApiKey={GOOGLE_MAP_API_KEY + keyApi}
            >
              <GoogleMap
                onLoad={(map) => {
                  this.map = map;
                  this.setState({ mapLoad: map });
                  setBusinessPOI(map);
                }}
                zoom={zoomDefault}
                center={centerDefualt}
                disableDefaultUI={true}
                mapContainerClassName={"map"}
                id="tracking-history-map"
                options={{
                  gestureHandling: "greedy",
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
                  fullscreenControl: false,
                }}
                // mapContainerStyle={{
                //   width: '100%',
                //   // height: isLoadingTrips ? "calc(94.4vh)" : "calc(73vh)"
                //   height: "calc(100vh - 55px)",
                // }}
                onZoomChanged={(e) => {
                  if (this.map) {
                    let zoom = this.map.getZoom();
                    let percent = 0;
                    if (this.between(zoom, 0, 7)) percent = 256;
                    if (this.between(zoom, 8, 10)) percent = 184;
                    if (this.between(zoom, 11, 12)) percent = 32;
                    if (this.between(zoom, 13, 15)) percent = 8;
                    if (this.between(zoom, 16, 22)) percent = 1;

                    if (eventPercent !== percent)
                      this.props.setEventPercent(percent);
                  }
                }}
                onDragEnd={() => {
                  // this.setState({ mapLoad: this.map })
                  this.checkLocationInBound();
                }}
                onIdle={() => this.checkLocationInBound()}
              >
                {this.map !== null && (
                  <>
                    <MapControlsCustom
                      position={1}
                      width="auto"
                      map={this.map}
                      isArrows={true}
                      clusterHidden={true}
                      fitObjectHidden={true}
                      licensePlateHidden={true}
                      alertHidden={false}
                      alertEnabled={eventVisibled}
                      objectEnabled={objectVisibled}
                      btnObjectActive={false}
                      geofencesrHidden={true}
                      infoHidden={true}
                      geofencesEnabled={geofenesVisibled}
                      onObjectChange={(value) => {
                        this.props.setValue("objectVisibled", value);
                      }}
                      onAlertChange={(value) => {
                        this.props.setValue("eventVisibled", value);
                      }}
                      onGeofencesChange={(value) => {
                        this.props.setValue("geofenesVisibled", value);
                        this.getGeofenceByType(value);
                      }}
                      onInfoChange={(value) =>
                        this.props.setValue("legendVisibled", value)
                      }
                    />
                    {/* <MapControlsCustom
                      position={1}
                      width="auto"
                      map={this.map}
                      beforeCusBtn={[
                        { id: "eventVisibled", title: "Alert", icon: "fa fa-bell" },
                        { id: "objectVisibled", title: "Arrows", icon: "icon-location-arrow" },
                        // { id: "imageVisibled", title: "Image", icon: "fa fa-picture-o" }
                      ]}
                      afterCusBtn={[
                        { id: "legendVisibled", title: "Info", icon: "fa fa-info-circle" }
                      ]}
                      defaultActiveButtons={{
                        eventVisibled: eventVisibled,
                        objectVisibled: objectVisibled,
                        imageVisibled: imageVisibled,
                        geofences: geofences,
                        legendVisibled: legendVisibled
                      }}
                      activeButtons={{
                        mapType: mapType
                      }}
                      // disableButtons={["fullscreen"]}
                      onToggleActive={(id, value) => {
                        // console.log("onToggleActive : ", id, value)
                        if (id == "geofences") {
                          this.getGeofenceByType(value)
                          this.props.setValue(id, value)
                        }
                        else {
                          this.props.setValue(id, value)
                        }
                      }}
                      hiddenButtons={["licensePlate"]}
                    /> */}

                    {/* <MapControl
                      position={1}
                      map={this.map}
                      id={"Info"}
                      width="auto"
                    >
                      <LegendStatus />
                    </MapControl> */}

                    {/* Panel Box */}
                    <MapControl
                      position={7}
                      map={this.map}
                      id={"box-panel-control"}
                      width="auto"
                      zIndex="100000000"
                    >
                      <PanelBox map={this.map} />
                    </MapControl>

                    {/* <MapControl position={5} map={this.map} id={'box-panel-image'} width="auto" zIndex="100000000">
                      <PanelImage map={this.map} />
                    </MapControl> */}

                    <Geofences map={this.map} />
                    <MarkTour map={this.map} />
                    <MarkEvent map={this.map} />
                    <MarkInteractiveChart map={this.map} />
                    <Point map={this.map} onLoad={(e) => (this.Points = e)} />
                    <Tail map={this.map} />
                    {/* <Tail map={this.state.mapLoad} /> */}
                  </>
                )}
              </GoogleMap>
            </LoadScriptNext>
          </Col>
        </Row>

        {/* <Row style={{ textAlign: 'center' }}>
          <Col>
            <button type="button" onClick={() => this.props.getHistoryData(1)}>Data 1</button>
            <button type="button" onClick={() => this.props.getHistoryData(2)}>Data 2</button>
            <button type="button" onClick={() => this.props.setPlay()}>Play</button>
          </Col>
        </Row> */}

        {!isLoadingTrips && <Footer />}
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  language: state.versatile.language,
  eventVisibled: state.trackingHistory.eventVisibled,
  objectVisibled: state.trackingHistory.objectVisibled,
  imageVisibled: state.trackingHistory.imageVisibled,
  legendVisibled: state.trackingHistory.legendVisibled,
  eventPercent: state.trackingHistory.eventPercent,
  geofences: state.trackingHistory.geofences,
  isLoadingTrips: state.trackingHistory.isLoadingTrips,
  vin_no: state.trackingHistory.vin_no,
  detailTrip: state.trackingHistory.detailTrip,
  indexTripSelected: state.trackingHistory.indexTripSelected,
  tripRange: state.trackingHistory.tripRange,
  cssChart: state.trackingHistory.cssChart,
  geofenesVisibled: state.trackingHistory.geofenesVisibled,
  currentValue: state.trackingHistory.currentValue,
  chassisNo: state.trackingHistory.chassisNo,
});

const mapDispatchToProps = (dispatch) => ({
  getHistoryData: (data) =>
    dispatch(TrackingHistoryActions.getHistoryData(data)),
  setZoom: (zoomLevel) => dispatch(TrackingHistoryActions.setZoom(zoomLevel)),
  setEventPercent: (percent) =>
    dispatch(TrackingHistoryActions.setEventPercent(percent)),
  setValue: (name, value) =>
    dispatch(TrackingHistoryActions.setValue(name, value)),
  setPlay: () => dispatch(TrackingHistoryActions.setPlay()),
  setHistoryData: (data) =>
    dispatch(TrackingHistoryActions.setHistoryData(data)),
  getGeofenceByType: (data) =>
    dispatch(RealtimeNewActions.getGeofenceByType(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);

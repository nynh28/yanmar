import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import TrackingHistoryActions from "../../Redux/TrackingHistoryRedux";
import { LoadScriptNext, GoogleMap } from "@react-google-maps/api";
// import Map from './Map'
import { Row, Col } from "reactstrap";
import { Tabs } from "antd";
import "antd/dist/antd.css";
import $ from "jquery";
import MapControl from "../../Components/GoogleMap/MapControl";
import MapControlsCustom from "../../Components/GoogleMap/MapControlsCustom";
import PanelBox from "./Panel/PanelBox";
import { t } from "../../Components/Translation";
import Point from "./Objects/Point";
import Tail from "./Objects/Tail";
import MarkTour from "./Objects/MarkTour";
import LegendStatus from "./Panel/LegendStatus";
import ChartRender from "./Charts/ChartRender";
import Footer from "./Panel/Footer";

const { get } = require("lodash");
const { TabPane } = Tabs;

class TrackingHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      centerDefualt: {
        lat: 13.786377,
        lng: 100.608755,
        // lat: 15.332344,
        // lng: 100.254435
      },
      // zoomDefault: 15,
      zoomDefault: 5,
      mapLoad: null,
    };
    this.map = null;
    this.Points = [];
    this.objectVisibled = true;
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { eventPercent, objectVisibled } = this.props;

    if (
      nextProps.eventPercent !== eventPercent ||
      nextProps.objectVisibled !== objectVisibled
    ) {
      return false;
    }

    return true;
  }

  callback(key) {
    console.log(key);
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
    let { language, objectVisibled, eventPercent } = this.props;
    let { centerDefualt, zoomDefault } = this.state;
    let keyApi =
      language === "en"
        ? "AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&libraries=geometry&language=en&region=EN"
        : language === "ja"
          ? "AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&libraries=geometry&language=ja&region=JA"
          : "AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&libraries=geometry&language=th&region=TH";

    console.log("RENDER MAP");
    return (
      <Suspense>
        <Row>
          <Col lg={12} style={{ marginTop: -10 }}>
            <LoadScriptNext id="script-loader" googleMapsApiKey={keyApi}>
              <GoogleMap
                onLoad={(map) => {
                  this.map = map;
                  this.setState({ mapLoad: map });
                }}
                zoom={zoomDefault}
                center={centerDefualt}
                disableDefaultUI={true}
                mapContainerClassName={"map"}
                id="summary-map"
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
                mapContainerStyle={{
                  width: "100%",
                  height: "calc(68vh)",
                  // height: "calc(150vh - 55px)",
                }}
                onZoomChanged={(e) => {
                  if (this.map) {
                    let zoom = this.map.getZoom();
                    let percent = 0;
                    console.log("zoom", zoom);
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
                      clusterHidden={true}
                      fitObjectHidden={true}
                      licensePlateHidden={true}
                      // infoWindowEnabled={this.props.showVehicleInfoStatus}
                      objectEnabled={objectVisibled}
                      btnObjectActive={false}
                      onObjectChange={(value) => {
                        this.props.setValue("objectVisibled", value);
                        // this.props.setShowObject(value)
                        // this.props.setMapState(null, null, 1)
                      }}
                      onGeofencesChange={(value) => {
                        // this.props.getGeofenceByTypes(value)
                      }}
                      onInfoChange={(value) =>
                        this.props.setValue("legendVisibled", value)
                      }
                    />

                    <MapControl
                      position={1}
                      map={this.map}
                      id={"Info"}
                      width="auto"
                    >
                      <LegendStatus />
                    </MapControl>

                    {/* Panel Box */}
                    {/* <MapControl position={7} map={this.map} id={'overlay-panel'} width="auto">
                      <PanelBox />
                    </MapControl> */}

                    <MarkTour map={this.map} />
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

        <Row style={{ height: 260, backgroundColor: "#FFF" }}>
          <Col lg={12}>
            <div className="card-container">
              <Tabs
                type="card"
                defaultActiveKey="4"
                size={"small"}
                tabBarExtraContent={[
                  <button
                    className="btn-sm"
                    type="button"
                    onClick={() => this.props.getHistoryData(1)}
                  >
                    Data 1
                  </button>,
                  <button
                    className="btn-sm"
                    type="button"
                    onClick={() => this.props.getHistoryData(2)}
                  >
                    Data 2
                  </button>,
                  <button
                    className="btn-sm"
                    type="button"
                    onClick={() => this.props.setPlay()}
                  >
                    Play
                  </button>,
                ]}
              >
                <TabPane tab={t("history_9")} key="1">
                  <ChartRender
                    chartName={"distance"}
                    chartTypeId={4}
                    seriesConfig={[
                      {
                        type: "spline",
                        valueField: "rpm",
                        name: "hmst_25",
                        color: "rpm",
                      },
                    ]}
                  />
                </TabPane>

                {/* RPM */}
                <TabPane tab={t("history_10")} key="2">
                  <ChartRender
                    chartName={"distance"}
                    chartTypeId={4}
                    min={0}
                    max={2900}
                    seriesConfig={[
                      {
                        type: "spline",
                        valueField: "rpm",
                        name: "hmst_25",
                        color: "rpm",
                      },
                    ]}
                  />
                </TabPane>

                {/* Acceleration Pedal */}
                <TabPane tab={t("history_16")} key="3">
                  <ChartRender
                    chartName={"distance"}
                    chartTypeId={4}
                    min={0}
                    max={90}
                    seriesConfig={[
                      {
                        type: "spline",
                        valueField: "canbus_acc_pedal",
                        name: "hmst_25",
                        color: "pedal",
                      },
                    ]}
                  />
                </TabPane>

                {/* Sensors and switch */}
                {/* <TabPane tab={t("history_11")} key="4">
                  <ChartRender
                    chartName={"distance"}
                    chartTypeId={4}
                    ValueAxisConfig={{
                      min: 2,
                      max: 5,
                      label: {
                        isLabelCustomize: true,
                      },
                    }}
                    seriesConfig={[
                      {
                        type: "scatter",
                        valueField: "canbus_foot_brake",
                        name: "hmst_25",
                        color: "pedal",
                        point: {
                          symbol: "circle",
                          size: 6,
                        },
                      },
                      {
                        type: "scatter",
                        valueField: "canbus_exhaust_brake",
                        name: "hmst_25",
                        color: "exhaust",
                        point: {
                          symbol: "circle",
                          size: 6,
                        },
                      },
                      {
                        type: "scatter",
                        valueField: "canbus_dtc_engine",
                        name: "hmst_25",
                        color: "dtc",
                        point: {
                          symbol: "circle",
                          size: 6,
                        },
                      },
                      {
                        type: "scatter",
                        valueField: "canbus_clutch_switch",
                        name: "hmst_25",
                        color: "clutch",
                        point: {
                          symbol: "circle",
                          size: 6,
                        },
                      },
                    ]}
                  />
                </TabPane> */}

                {/* Coolrance temperature */}
                <TabPane tab={t("history_14")} key="5">
                  <ChartRender
                    chartName={"distance"}
                    chartTypeId={4}
                    seriesConfig={[
                      {
                        type: "spline",
                        valueField: "canbus_cooltemp",
                        name: "hmst_25",
                        color: "temperature",
                      },
                    ]}
                  />
                </TabPane>

                {/* Fuel Tank (%) */}
                <TabPane tab={t("history_12")} key="6">
                  <ChartRender
                    chartName={"distance"}
                    chartTypeId={4}
                    min={0}
                    max={90}
                    seriesConfig={[
                      {
                        type: "spline",
                        valueField: "fuel",
                        name: "hmst_25",
                        color: "fuel",
                      },
                    ]}
                  />
                </TabPane>

                {/* Temp Sensor C */}
                <TabPane tab={t("history_44")} key="7">
                  <ChartRender
                    chartName={"distance"}
                    chartTypeId={4}
                    min={-20}
                    max={40}
                    seriesConfig={[
                      {
                        type: "steparea",
                        valueField: "tempTop",
                        name: "hmst_25",
                        color: "temp_hot",
                      },
                      {
                        type: "steparea",
                        valueField: "tempButtom",
                        name: "hmst_25",
                        color: "temp_cool",
                      },
                    ]}
                  />
                </TabPane>
              </Tabs>
            </div>
          </Col>
        </Row>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.versatile.language,
  objectVisibled: state.trackingHistory.objectVisibled,
  eventPercent: state.trackingHistory.eventPercent,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackingHistory);

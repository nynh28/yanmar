import React, { Component } from 'react';
import NotificationRedux from '../../Redux/NotificationRedux'
import RealtimeActions from '../../Redux/RealtimeRedux'
import { Input, Row, Col, ListGroup, ListGroupItem, Table } from 'reactstrap'
import './custom.css'
import { connect } from 'react-redux'
import moment from 'moment'
import { IconButton } from '@material-ui/core';
import PannelBox from '../../Components/PannelBox'
import { t } from '../../Components/Translation'
import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api'
import MapControlsCustom from '../../Components/GoogleMap/MapControlsCustom'
import Geofences from './Geofences'
import { statusCar } from './StatusVehicle'
import { get, isEqual } from 'lodash'
import { ENDPOINT_BASE_URL, GOOGLE_MAP_API_KEY } from '../../Config/app-config';
import { momentDate } from '../../Functions/DateMoment'
import { numberWithComma } from '../../Functions/Calculation'
import { BoxContrainer } from '../../components_new'


class Location extends Component {
  constructor(props) {
    super(props)
    this.state = {
      geofencesEnabled: false,
      location: "-",
      mileage: ""
    }
    this.map = null
  }

  componentDidMount = () => {
    if (this.props.messageInfo.messageType == "topic") this.getLocation(this.props.messageInfo)
  }

  fitBounds(lat, lng) {
    try {
      this.map.setZoom(10)
      this.map.panTo({ lat, lng })
    } catch { }
  }

  async getLocation(info) {

    var response = await fetch(ENDPOINT_BASE_URL + "fleet/history/notify/" + info.unix + "/" + info.event_id + "?user_id=" + this.props.dataLogin.userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': this.props.language
      }
    });
    var data = await response.json();

    if (data?.code == 200)
      this.setState({ location: data.result.location, mileage: numberWithComma((data.result.mileage * 0.001).toFixed(1)) })
    else
      this.setState({ location: "" })

    this.fitBounds(info.lat, info.lng)
  }

  render() {
    let { messageInfo, mapType, geofencesEnabled } = this.props
    let styles = { paddingRight: 20, fontSize: 16 }
    let status = statusCar(messageInfo)
    let obj = this.props.iconInactived.find(x => x.classType === parseInt(get(messageInfo, 'class_type', 0)) && x.status === status);
    let icon = get(obj, 'icon', "")

    let keyApi = this.props.language === 'en' ? GOOGLE_MAP_API_KEY + `&libraries=geometry&language=en&region=EN`
      : this.props.language === 'ja' ? GOOGLE_MAP_API_KEY + `&libraries=geometry&language=ja&region=JA`
        : GOOGLE_MAP_API_KEY + `&libraries=geometry&language=th&region=TH`

    messageInfo.lat && this.fitBounds(messageInfo.lat, messageInfo.lng)

    return (
      <div className="form-horizontal" >
        <BoxContrainer
          title={"Notification_2"}
          toolbarRight={
            <div className="ibox-tools">
              <button
                onClick={() => this.props.history.push("/notification")}
                className="btn"
                style={{ backgroundColor: 'gray', color: 'white', marginTop: -5, marginBottom: 5, marginRight: 6 }}>
                <i className="fa fa-chevron-circle-left" aria-hidden="true" /> {t('other_reports_24')}
              </button>
            </div>
          }
          showFooter={false}
          footerStyle={{ padding: 0 }}
        >
          <Row>
            <Col lg={12}>
              <div>
                <span style={styles}><b>{t("event")} : </b>{messageInfo.event_id ? t('Notification_M_' + messageInfo.event_id) || "-" : '-'}</span>
                <span style={styles}><b>{t("VIN")} : </b>{messageInfo.vehicle_info && messageInfo.vehicle_info.vin_no || "-"}</span>
                <span style={styles}><b>{t("location")} : </b>{messageInfo.location}</span>
                <span style={styles}><b>{t("history_19")} : </b>{messageInfo.gpsdate ? momentDate(messageInfo.gpsdate, "DD/MM/YYYY HH:mm:ss") : "-"}</span>
                {/* <span style={styles}><b>{t("my_vehicles_14")} : </b>{messageInfo.mileage ? numberWithComma((messageInfo.mileage * 0.001).toFixed(1)) : "-"}</span> */}
                <span style={styles}><b>{t("other_reports_144")} : </b>{messageInfo.hour} {t("h.")}</span>
                {/* {messageInfo.dtstart} */}
              </div >
            </Col>
          </Row>
        </BoxContrainer>

        <div style={{ marginTop: -24, padding: "30px 15px 0px 15px" }}>
          <Row>
            <LoadScriptNext id="script-loader" googleMapsApiKey={keyApi}>
              <GoogleMap
                onLoad={map => {
                  this.map = map
                  this.setState({ mapLoad: map })
                }}
                // zoom={this.state.zoomDefault || 5}
                center={get(messageInfo, 'messageType') && messageInfo.messageType === "grid" && {
                  lat: messageInfo.lat,
                  lng: messageInfo.lng
                }}
                disableDefaultUI={true}
                mapContainerClassName={"map"}
                id='realtime-map'
                options={{
                  gestureHandling: 'greedy',
                  zoomControl: true,
                  zoomControlOptions: {
                    position: 5,
                  },
                  mapTypeControl: false,
                  streetViewControl: true,
                  // streetViewControl: false,
                  streetViewControlOptions: {
                    position: 5,
                  },
                  rotateControl: false,
                  fullscreenControl: false
                }}
                mapContainerStyle={{
                  width: '100%',
                  height: "calc(76.8vh)"
                }}
              >
                <>
                  {
                    this.map !== null &&
                    <>
                      <MapControlsCustom
                        position={1}
                        map={this.map}
                        width="auto"
                        clusterHidden={true}
                        fitObjectHidden={true}
                        geofencesEnabled={geofencesEnabled}
                        mapType={mapType}
                        objectHidden={true}
                        licensePlateHidden={true}
                        infoHidden={true}
                        measureHidden={true}
                        onGeofencesChange={value => {
                          this.props.setStateMapControlNoti("geofencesEnabled", value)
                          this.props.getGeofenceByTypes(value)
                        }}
                        onMapTypeChange={value => this.props.setStateMapControlNoti("mapType", value)}
                      />
                      {
                        messageInfo.lat && <Marker
                          key={0}
                          onLoad={(m) => {
                            // console.log("LOAD Marker : ", messageInfo.lat, messageInfo.lng)
                            // this['markers_' + data.vehicle_id] = m
                            messageInfo.lat && this.fitBounds(messageInfo.lat, messageInfo.lng)
                          }}
                          position={{ lat: messageInfo.lat, lng: messageInfo.lng }}
                          // position={{ lat: data.lat, lng: data.lng }}
                          // onClick={(e) => {
                          //     this.getlistvehicle(messageInfo.vehicle_id)
                          // }}
                          icon={icon ? {
                            url: `data:image/svg+xml;charset=utf-8,
                                                              ${encodeURIComponent(icon
                              .replace('{{width}}', 100)
                              .replace('{{height}}', 100)
                              .replace('{{transform}}', `rotate(${messageInfo.course})`))}`,
                            anchor: { x: 100 / 2, y: 100 / 2 },
                            // labelOrigin: { x: size / 2, y: 10 },
                          } : ''}
                          yAxis={-75}

                        >
                        </Marker>
                      }

                      <Geofences />
                    </>
                  }
                </>
              </GoogleMap>
            </LoadScriptNext>
          </Row>
        </div>
      </div >
    )
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  detailEvent: state.notification.detailEvent,
  iconInactived: state.realtime.iconInactived,
  messageInfo: state.notification.messageInfo,
  mapType: state.notification.mapType,
  geofencesEnabled: state.notification.geofencesEnabled,
  language: state.versatile.language
});
const mapDispatchToProps = (dispatch) => ({
  setDetailEvent: () => dispatch(NotificationRedux.setDetailEvent()),
  setStateMapControlNoti: (name, value) => dispatch(NotificationRedux.setStateMapControlNoti(name, value)),
  getGeofenceByTypes: (GeofenceTypeIds) => dispatch(RealtimeActions.getGeofenceByTypes(GeofenceTypeIds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Location)

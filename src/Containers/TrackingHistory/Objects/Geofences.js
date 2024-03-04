import React, { Component } from 'react';
import { connect } from 'react-redux'
import TrackingHistoryActions from '../../../Redux/TrackingHistoryRedux'
import RealtimeActions from '../../../Redux/RealtimeRedux'
import { ENDPOINT_BASE_URL } from '../../../Config/app-config';
import { get } from 'lodash';
import $ from 'jquery'
import { MarkerScale } from '../../../Functions/MarkerScale'

let keyEN = ["Geofence Type", "Geofence Name", "Geofence Description", "Subdistrict", "District", "Province", "Hazard", "Share", "Geometry Type"]
let keyTH = ["ชนิดจีโอเฟนซ์", "ชื่อจีโอเฟนซ์", "รายละเอียดจีโอเฟนซ์", "ตำบล/แขวง", "อำเภอ", "จังหวัด", "เขตอันตราย", "ใช้ร่วมกับผู้อื่น", "รูปแบบพื้นที่"]
let keyJA = ["ジオフェンスタイプ", "ジオフェンス名", "ジオフェンスの説明", "区、町", "市、行政区", "県", "危険地帯", "シェア", "形状"]

class Geofences extends Component {
  constructor(props) {
    super(props)
    this.infoWindow = null
    this.activeInfoWindow = null
    this.markers = []
    this.polylines = []
    this.markerPolylines = []
    this.polygons = []
    this.markerPolygons = []
    this.geofenceDetail = []
    this.geofenceId = null
  }

  componentDidMount() {
    this.props.geofenceByTypes.length > 0 && this.setObjectData(this.props.geofenceByTypes)
  }

  shouldComponentUpdate(nextProps) {
    let { geofenceByTypes, geofenceDetail, language } = this.props

    if (language !== nextProps.language) this.setTitleInfoWindow(nextProps.language)

    if (geofenceDetail !== nextProps.geofenceDetail) {
      $("#lb_geofenceType").text(get(nextProps.geofenceDetail, 'geofenceTypeNav.value'))
      $("#lb_geofenceName").text(get(nextProps.geofenceDetail, 'name'))
      $("#lb_geofenceDescription").text(get(nextProps.geofenceDetail, 'description'))
      $("#lb_subdistrict").text(get(nextProps.eofenceDetail, 'locationSimpleInfo.subdistrict'))
      $("#lb_district").text(get(nextProps.geofenceDetail, 'locationSimpleInfo.district'))
      $("#lb_province").text(get(nextProps.geofenceDetail, 'locationSimpleInfo.province'))
      $("#lb_hazard").text(get(nextProps.geofenceDetail, 'isHazard') ? 'Yes' : 'No')
      $("#lb_share").text(get(nextProps.geofenceDetail, 'isShare') ? 'Yes' : 'No')
      $("#lb_geometryType").text(get(nextProps.geofenceDetail, 'geomTypeNav.value'))
    }

    if (geofenceByTypes !== nextProps.geofenceByTypes) {
      this.setObjectData(nextProps.geofenceByTypes)
    }
    return false
  }

  setObjectData(geofenceByTypes) {
    this.clearAllObject()
    geofenceByTypes.map((data) => {
      if (data.geomTypeName === 'Polygon') this.createGeoPolygon(data)
      if (data.geomTypeName === 'Line') this.createGeoLine(data)
      if (data.geomTypeName === 'Point') this.createGeoPoint(data)
    })
  }


  clearAllObject() {
    // Clear InfoWindow
    if (this.activeInfoWindow !== null) this.activeInfoWindow.close()

    // Clear Marker
    for (let index in this.markers) this.markers[index].setMap(null)

    // Clear PolyLine
    for (let index in this.polylines) this.polylines[index].setMap(null)
    for (let index in this.markerPolylines) this.markerPolylines[index].setMap(null)

    // Clear Polygon
    for (let index in this.polygons) this.polygons[index].setMap(null)
    for (let index in this.markerPolygons) this.markerPolygons[index].setMap(null)

    this.markers.length = 0
    this.polylines.length = 0
    this.markerPolylines.length = 0
    this.polygons.length = 0
    this.markerPolygons.length = 0
  }

  createGeoPoint(data) {
    const marker = new window.google.maps.Marker({
      position: get(data, 'coordinates[0]', {}),
      map: this.props.map,
      icon: MarkerScale(data.iconUrl),
    });

    this.markers.push(marker)

    const infowindow = new window.google.maps.InfoWindow({
      content: this.contentString(),
    });

    this.addListenerMarker(marker, infowindow, data.id)
  }

  createGeoLine(data) {
    const polyLine = new window.google.maps.Polyline({
      path: get(data, 'coordinates', []),
      geodesic: true,
      strokeColor: '#4CD964',
      strokeOpacity: 0.8,
      strokeWeight: 4,
      fillOpacity: 0.35,
      draggable: false,
      visible: true,
      radius: 30000,
      zIndex: 1
    });

    this.polylines.push(polyLine);
    polyLine.setMap(this.props.map);

    const marker = new window.google.maps.Marker({
      position: get(data, 'iconPoint', {}),
      map: this.props.map,
      icon: MarkerScale(data.iconUrl),
    });

    this.markerPolylines.push(marker);

    const infowindow = new window.google.maps.InfoWindow({
      content: this.contentString(),
    });

    this.addListenerMarker(marker, infowindow, data.id)
  }


  createGeoPolygon(data) {
    const bermudaTriangle = new window.google.maps.Polygon({
      paths: get(data, 'coordinates', []),
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    });

    this.polygons.push(bermudaTriangle);
    bermudaTriangle.setMap(this.props.map)

    const marker = new window.google.maps.Marker({
      position: get(data, 'iconPoint', {}),
      map: this.props.map,
      icon: MarkerScale(data.iconUrl),
    });

    this.markerPolygons.push(marker);

    const infowindow = new window.google.maps.InfoWindow({
      content: this.contentString()
    });

    this.addListenerMarker(marker, infowindow, data.id)
  }

  addListenerMarker(marker, infowindow, id) {
    marker.addListener("click", () => {
      this.getGeofenceDetail(id)
      this.geofenceId = id
      if (this.activeInfoWindow) { this.activeInfoWindow.close(); }
      infowindow.open(this.props.map, marker);
      this.activeInfoWindow = infowindow;
    });
  }

  setTitleInfoWindow(language) {
    let dt = []
    language == "en" ? dt = keyEN : language == "th" ? dt = keyTH : dt = keyJA

    $("#lb_realtime_93").text(dt[0])
    $("#lb_realtime_94").text(dt[1])
    $("#lb_realtime_95").text(dt[2])
    $("#lb_realtime_96").text(dt[3])
    $("#lb_realtime_97").text(dt[4])
    $("#lb_realtime_98").text(dt[5])
    $("#lb_realtime_99").text(dt[6])
    $("#lb_realtime_100").text(dt[7])
    $("#lb_realtime_101").text(dt[8])

    this.geofenceId !== null && this.getGeofenceDetail(this.geofenceId)
  }

  async getGeofenceDetail(id) {
    let { header, language } = this.props

    // https://api-center.onelink-iot.com/prod/Geofence/Geofence/349?lang=th
    let response = await fetch(ENDPOINT_BASE_URL + "Geofence/Geofence/" + id + "?lang=" + language, {
      method: 'GET',
      headers: {
        Authorization: header.idToken,
        'X-API-Key': header.redisKey
      }
    });
    if (response.ok) {
      var data = await response.json();
      this.props.setValue('geofenceDetail', data)
    }

  }

  contentString() {
    const tdStyle1 = "border: none; width: 180px;vertical-align: top"
    const tdStyle2 = "border: none; width: 150px;vertical-align: top"
    let dt = []
    this.props.language == "en" ? dt = keyEN : this.props.language == "th" ? dt = keyTH : dt = keyJA
    let lb_realtime_93 = dt[0]
    let lb_realtime_94 = dt[1]
    let lb_realtime_95 = dt[2]
    let lb_realtime_96 = dt[3]
    let lb_realtime_97 = dt[4]
    let lb_realtime_98 = dt[5]
    let lb_realtime_99 = dt[6]
    let lb_realtime_100 = dt[7]
    let lb_realtime_101 = dt[8]

    return '<div>' +
      '<table className="table-info-window">' +
      '  <tbody>' +
      '    <tr>' +
      '       <td style="' + tdStyle1 + '">' +
      '           <small id="lb_realtime_93">' + lb_realtime_93 + '</small>' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '          <small id="lb_geofenceType"></small>' +
      '        </td>' +
      '      </tr>' +

      '      <tr>' +
      '        <td style="' + tdStyle1 + '">' +
      '           <small id="lb_realtime_94">' + lb_realtime_94 + '</small > ' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '          <small id="lb_geofenceName"></small>' +
      '        </td>' +
      '      </tr>' +

      '      <tr>' +
      '        <td style="' + tdStyle1 + '">' +
      '           <small id="lb_realtime_95">' + lb_realtime_95 + '</small>' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '          <small id="lb_geofenceDescription"></small>' +
      '        </td>' +
      '      </tr>' +

      '      <tr>' +
      '        <td style="' + tdStyle1 + '">' +
      '           <small id="lb_realtime_96">' + lb_realtime_96 + '</small>' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '          <small id="lb_subdistrict"></small>' +
      '        </td>' +
      '      </tr>' +

      '      <tr>' +
      '        <td style="' + tdStyle1 + '">' +
      '           <small id="lb_realtime_97">' + lb_realtime_97 + '</small>' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '          <small id="lb_district"></small>' +
      '        </td>' +
      '      </tr>' +

      '      <tr>' +
      '        <td style="' + tdStyle1 + '">' +
      '           <small id="lb_realtime_98">' + lb_realtime_98 + '</small>' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '          <small id="lb_province"></small>' +
      '        </td>' +
      '      </tr>' +

      '      <tr>' +
      '        <td style="' + tdStyle1 + '">' +
      '           <small id="lb_realtime_99">' + lb_realtime_99 + '</small>' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '          <small id="lb_hazard"></small>' +
      '        </td>' +
      '      </tr>' +

      '      <tr>' +
      '        <td style="' + tdStyle1 + '">' +
      '           <small id="lb_realtime_100">' + lb_realtime_100 + '</small>' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '          <small id="lb_share"></small>' +
      '        </td>' +
      '      </tr>' +

      '      <tr>' +
      '        <td style="' + tdStyle1 + '">' +
      '           <small id="lb_realtime_101">' + lb_realtime_101 + '</small>' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '          <small id="lb_geometryType"></small>' +
      '        </td>' +
      '      </tr>' +
      '    </tbody>' +
      '  </table>' +
      '</div>'
  }

  render() {
    return ""
  }
}

const mapStateToProps = (state) => ({
  header: state.signin.header,
  geofenceByTypes: state.trackingHistory.geofenceByTypes,
  geofenceDetail: state.trackingHistory.geofenceDetail,
  language: state.versatile.language
});
const mapDispatchToProps = (dispatch) => ({
  getGeofenceDetail: (geofenceId) => dispatch(RealtimeActions.getGeofenceDetail(geofenceId)),
  setValue: (name, value) => dispatch(TrackingHistoryActions.setValue(name, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Geofences)

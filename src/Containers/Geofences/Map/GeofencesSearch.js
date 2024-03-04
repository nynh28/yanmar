import React, { Component } from 'react';
import { connect } from 'react-redux'
import GeofencesActions from "../../../Redux/GeofencesRedux"
import { MarkerScale } from '../../../helpers/MarkerScale'
import { get } from 'lodash';
import $ from 'jquery'

let keyEN = ["Geofence Type", "Geofence Name", "Geofence Description", "Subdistrict", "District", "Province", "Hazard", "Share", "Geometry Type"]
let keyTH = ["ชนิดจีโอเฟนซ์", "ชื่อจีโอเฟนซ์", "รายละเอียดจีโอเฟนซ์", "ตำบล/แขวง", "อำเภอ", "จังหวัด", "เขตอันตราย", "ใช้ร่วมกับผู้อื่น", "รูปแบบพื้นที่"]
let keyJA = ["ジオフェンスタイプ", "ジオフェンス名", "ジオフェンスの説明", "区、町", "市、行政区", "県", "危険地帯", "シェア", "形状"]

class GeofenceDisplay extends Component {
  constructor(props) {
    super(props)
    this.infoWindow = null
    this.activeInfoWindow = null
    this.markers = []
    this.polylines = []
    this.markerPolylines = []
    this.polygons = []
    this.markerPolygons = []
    this.circles = []
    this.markerCircles = []
    this.geofenceDetailSearch = []
    this.geofenceId = null
  }

  componentWillMount() {
    // if (this.props.geofenceBySearch) this.props.setStatesGeofencesRedux({ geofenceDetailSearch: undefined, geofenceBySearch: undefined })
  }

  componentDidMount() {
    if (get(this.props, 'geofenceBySearch', []).length > 0) this.setObjectData(this.props.geofenceBySearch)
  }

  shouldComponentUpdate(nextProps) {
    let { geofenceBySearch, geofenceDetailSearch, language } = this.props

    //  console.log('geofenceBySearch', this.props.geofenceBySearch)

    if (language !== nextProps.language) this.setTitleInfoWindow(nextProps.language)

    if (geofenceDetailSearch !== nextProps.geofenceDetailSearch) {
      this.setDetailInfo(language, nextProps.geofenceDetailSearch)
      // $("#lb_s_geofenceType").text(get(nextProps.geofenceDetailSearch, 'geofence_type_name'))
      // $("#lb_s_geofenceName").text(get(nextProps.geofenceDetailSearch, 'geofence_name'))
      // $("#lb_s_geofenceDescription").text(get(nextProps.geofenceDetailSearch, 'geofence_description'))
      // $("#lb_s_subdistrict").text(get(nextProps.geofenceDetailSearch, 'admin_level3_name'))
      // $("#lb_s_district").text(get(nextProps.geofenceDetailSearch, 'admin_level2_name'))
      // $("#lb_s_province").text(get(nextProps.geofenceDetailSearch, 'admin_level1_name'))
      // $("#lb_s_hazard").text(get(nextProps.geofenceDetailSearch, 'is_hazard') ? 'Yes' : 'No')
      // $("#lb_s_share").text(get(nextProps.geofenceDetailSearch, 'is_share') ? 'Yes' : 'No')
      // $("#lb_s_geometryType").text(get(nextProps.geofenceDetailSearch, 'geom_type_name'))
    }

    // if(geofenceDisplay !== nextProps.geofenceDisplay){
    //   this.listGeof
    // }

    if (geofenceBySearch !== nextProps.geofenceBySearch) {
      this.setObjectData(nextProps.geofenceBySearch, true)
    }
    return false
  }

  componentWillUnmount() {
    this.clearAllObject()
    this.listGeof = []
    // this.props.setListIconGeof(this.listGeof)
    this.props.setStatesGeofencesRedux({ geofenceDetailSearch: null })

  }

  setObjectData(geofenceBySearch, change) {
    this.clearAllObject()
    this.listGeof = []
    geofenceBySearch.map((data) => {
      if (data.geom_type_name === 'Polygon') this.createGeoPolygon(data, change)
      if (data.geom_type_name === 'Line') this.createGeoLine(data, change)
      if (data.geom_type_name === 'Point') {
        if (data.radius > 0) this.createGeoCircle(data, change)
        else this.createGeoPoint(data, change)
      }
    })
    // this.props.setListIconGeof(this.listGeof)
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

    // Clear Polygon
    for (let index in this.circles) this.circles[index].setMap(null)
    for (let index in this.markerCircles) this.markerCircles[index].setMap(null)

    this.markers.length = 0
    this.polylines.length = 0
    this.markerPolylines.length = 0
    this.polygons.length = 0
    this.markerPolygons.length = 0
    this.circles.length = 0
    this.markerCircles.length = 0
  }

  createGeoPoint(data) {
    const marker = new window.google.maps.Marker({
      position: get(data, 'coordinate[0]', {}),
      map: this.props.map,
      icon: MarkerScale(data.url),
    });

    this.markers.push(marker)
    this.listGeof.push({ id: get(data, 'id'), position: get(data, 'coordinate[0]', {}), point: marker })

    const infowindow = new window.google.maps.InfoWindow({
      content: this.contentString(),
    });

    this.addListenerMarker(marker, infowindow, data.id)
  }

  createGeoLine(data, change) {
    const polyLine = new window.google.maps.Polyline({
      path: get(data, 'coordinate', []),
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
      position: get(data, 'center_point', {}),
      map: this.props.map,
      icon: MarkerScale(data.url),
    });

    this.markerPolylines.push(marker);
    this.listGeof.push({ id: get(data, 'id'), position: get(data, 'center_point', {}), point: marker, polyline: polyLine })

    const infowindow = new window.google.maps.InfoWindow({
      content: this.contentString(),
    });

    if (change) this.props.map.fitBounds(this.getBoundsFromPath([polyLine.getPath()]))
    this.addListenerMarker(marker, infowindow, data.id)
  }


  createGeoPolygon(data, change) {

    const bermudaTriangle = new window.google.maps.Polygon({
      paths: get(data, 'coordinate', []),
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    });

    this.polygons.push(bermudaTriangle);
    bermudaTriangle.setMap(this.props.map)

    const marker = new window.google.maps.Marker({
      position: get(data, 'center_point', {}),
      map: this.props.map,
      icon: MarkerScale(data.url),
    });

    this.markerPolygons.push(marker);
    this.listGeof.push({ id: get(data, 'id'), position: get(data, 'center_point', {}), point: marker, polygon: bermudaTriangle })

    const infowindow = new window.google.maps.InfoWindow({
      content: this.contentString()
    });


    if (change) this.props.map.fitBounds(this.getBoundsFromPath(bermudaTriangle.getPaths()))
    this.addListenerMarker(marker, infowindow, data.id)
  }

  getBoundsFromPath(paths) {
    let bounds = new window.google.maps.LatLngBounds();
    paths.forEach(function (path) {
      let ar = path.getArray();
      for (let i = 0, l = ar.length; i < l; i++) {
        bounds.extend(ar[i]);
      }
    });
    return bounds
  }

  createGeoCircle(data, change) {

    const circle = new window.google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      center: get(data, 'center_point', {}),
      radius: data.radius,
    });

    this.circles.push(circle);
    circle.setMap(this.props.map)

    const marker = new window.google.maps.Marker({
      position: get(data, 'center_point', {}),
      map: this.props.map,
      icon: MarkerScale(data.url),
    });


    this.markerCircles.push(marker);
    this.listGeof.push({ id: get(data, 'id'), position: get(data, 'center_point', {}), point: marker, circle: circle })

    const infowindow = new window.google.maps.InfoWindow({
      content: this.contentString()
    });

    if (change) this.props.map.fitBounds(circle.getBounds())
    this.addListenerMarker(marker, infowindow, data.id)
  }

  addListenerMarker(marker, infowindow, id) {
    marker.addListener("click", (event) => {
      // console.log('event', event, event.domEvent.stopPropagation, event.domEvent)
      this.getGeofenceDetail(id)
      this.geofenceId = id
      if (this.activeInfoWindow) { this.activeInfoWindow.close(); }
      infowindow.open(this.props.map, marker);
      this.activeInfoWindow = infowindow;
      if (get(event, 'domEvent.stopPropagation')) {
        event.domEvent.stopPropagation();
      }
    });
    infowindow.addListener('domready', () => {
      const btn = document.getElementById('info-window')
      if (btn) {
        btn.addEventListener('click', (e) => {
          if (e.stopPropagation) e.stopPropagation()
        });
      }
    })
  }

  async getGeofenceDetail(id) {
    let { header, language, geofenceBySearch } = this.props

    // var response = await fetch(ENDPOINT_BASE_URL + 'Geofence/Geofence/' + id + "?lang=" + language, {
    //   method: 'GET',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'Authorization': header.idToken,
    //     'X-API-Key': header.redisKey
    //   },
    //   // body: JSON.stringify({ userId: this.props.dataLogin.userId })
    // });
    // let data = response.ok ? await response.json() : null
    // console.log('data', data)
    let _data = geofenceBySearch.find((dt) => dt.id === id)
    // console.log('_data', _data)

    setTimeout(() => {
      this.props.setStatesGeofencesRedux({ geofenceDetailSearch: _data })
    }, 500)


    // this.props.setStatesGeofencesRedux({ geofenceDetailSearch: data })

  }

  setTitleInfoWindow(language) {
    let dt = []
    language == "en" ? dt = keyEN : language == "th" ? dt = keyTH : dt = keyJA

    $("#lb_s_realtime_93").text(dt[0])
    $("#lb_s_realtime_94").text(dt[1])
    $("#lb_s_realtime_95").text(dt[2])
    $("#lb_s_realtime_96").text(dt[3])
    $("#lb_s_realtime_97").text(dt[4])
    $("#lb_s_realtime_98").text(dt[5])
    $("#lb_s_realtime_99").text(dt[6])
    $("#lb_s_realtime_100").text(dt[7])
    $("#lb_s_realtime_101").text(dt[8])

    // this.geofenceId !== null && this.getGeofenceDetail(this.geofenceId)
    let detail = get(this.props, 'geofenceDetailSearch', {})
    this.setDetailInfo(language, detail)
  }

  setDetailInfo(language, detail) {
    // console.log('language', language)
    $("#lb_s_geofenceType").text(get(detail, 'geofence_type_name'))

    if (language === 'en' && get(detail, 'geofence_name_en') !== "")
      $("#lb_s_geofenceName").text(get(detail, 'geofence_name_en'))
    else if (language === 'ja' && get(detail, 'geofence_name_jp') !== "")
      $("#lb_s_geofenceName").text(get(detail, 'geofence_name_jp'))
    else $("#lb_s_geofenceName").text(get(detail, 'geofence_name'))

    if (language === 'en' && get(detail, 'geofence_description_en') !== "")
      $("#lb_s_geofenceDescription").text(get(detail, 'geofence_description_en'))
    else if (language === 'ja' && get(detail, 'geofence_description_jp') !== "")
      $("#lb_s_geofenceDescription").text(get(detail, 'geofence_description_jp'))
    else $("#lb_s_geofenceDescription").text(get(detail, 'geofence_description'))

    // $("#lb_s_geofenceDescription").text(get(detail, 'geofence_description'))
    $("#lb_s_subdistrict").text(get(detail, 'admin_level3_name'))
    $("#lb_s_district").text(get(detail, 'admin_level2_name'))
    $("#lb_s_province").text(get(detail, 'admin_level1_name'))
    $("#lb_s_hazard").text(get(detail, 'is_hazard') ? 'Yes' : 'No')
    $("#lb_s_share").text(get(detail, 'is_share') ? 'Yes' : 'No')
    $("#lb_s_geometryType").text(get(detail, 'geom_type_name'))
  }

  contentString() {
    const tdStyle1 = "border: none; width: 180px;vertical-align: top"
    const tdStyle2 = "border: none; width: 150px;vertical-align: top"
    let dt = []
    this.props.language == "en" ? dt = keyEN : this.props.language == "th" ? dt = keyTH : dt = keyJA
    let lb_s_realtime_93 = dt[0]
    let lb_s_realtime_94 = dt[1]
    let lb_s_realtime_95 = dt[2]
    let lb_s_realtime_96 = dt[3]
    let lb_s_realtime_97 = dt[4]
    let lb_s_realtime_98 = dt[5]
    let lb_s_realtime_99 = dt[6]
    let lb_s_realtime_100 = dt[7]
    let lb_s_realtime_101 = dt[8]

    return '<div id="info-window">' +
      '<table className="table-info-window">' +
      '  <tbody>' +
      '    <tr>' +
      '       <td style="' + tdStyle1 + '">' +
      '           <small id="lb_s_realtime_93">' + lb_s_realtime_93 + '</small>' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '          <small id="lb_s_geofenceType"></small>' +
      '        </td>' +
      '      </tr>' +

      '      <tr>' +
      '        <td style="' + tdStyle1 + '">' +
      '           <small id="lb_s_realtime_94">' + lb_s_realtime_94 + '</small > ' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '          <small id="lb_s_geofenceName"></small>' +
      '        </td>' +
      '      </tr>' +

      '      <tr>' +
      '        <td style="' + tdStyle1 + '">' +
      '           <small id="lb_s_realtime_95">' + lb_s_realtime_95 + '</small>' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '          <small id="lb_s_geofenceDescription"></small>' +
      '        </td>' +
      '      </tr>' +

      '      <tr>' +
      '        <td style="' + tdStyle1 + '">' +
      '           <small id="lb_s_realtime_96">' + lb_s_realtime_96 + '</small>' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '          <small id="lb_s_subdistrict"></small>' +
      '        </td>' +
      '      </tr>' +

      '      <tr>' +
      '        <td style="' + tdStyle1 + '">' +
      '           <small id="lb_s_realtime_97">' + lb_s_realtime_97 + '</small>' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '          <small id="lb_s_district"></small>' +
      '        </td>' +
      '      </tr>' +

      '      <tr>' +
      '        <td style="' + tdStyle1 + '">' +
      '           <small id="lb_s_realtime_98">' + lb_s_realtime_98 + '</small>' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '          <small id="lb_s_province"></small>' +
      '        </td>' +
      '      </tr>' +

      '      <tr>' +
      '        <td style="' + tdStyle1 + '">' +
      '           <small id="lb_s_realtime_99">' + lb_s_realtime_99 + '</small>' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '          <small id="lb_s_hazard"></small>' +
      '        </td>' +
      '      </tr>' +

      '      <tr>' +
      '        <td style="' + tdStyle1 + '">' +
      '           <small id="lb_s_realtime_100">' + lb_s_realtime_100 + '</small>' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '          <small id="lb_s_share"></small>' +
      '        </td>' +
      '      </tr>' +

      '      <tr>' +
      '        <td style="' + tdStyle1 + '">' +
      '           <small id="lb_s_realtime_101">' + lb_s_realtime_101 + '</small>' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '          <small id="lb_s_geometryType"></small>' +
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
  language: state.versatile.language,
  geofenceBySearch: state.geofences.geofenceBySearch,
  geofenceDetailSearch: state.geofences.geofenceDetailSearch,
});
const mapDispatchToProps = (dispatch) => ({
  setStatesGeofencesRedux: (obj) => dispatch(GeofencesActions.setStatesGeofencesRedux(obj))
  // getGeofenceDetail: (geofenceId) => dispatch(RealtimeActions.getGeofenceDetail(geofenceId))
});

export default connect(mapStateToProps, mapDispatchToProps)(GeofenceDisplay)

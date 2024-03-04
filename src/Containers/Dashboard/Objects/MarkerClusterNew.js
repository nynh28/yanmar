import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import SummaryActions from '../../../Redux/SummaryRedux'
import Images from '../icons/Images'
import '../Styles/infowindow.css'
import moment from 'moment';
import { t } from '../../../Components/Translation';
import { isEmpty, isEqual } from 'lodash';
import { MarkerClusterer } from './markerclusterer'
import $ from 'jquery'
import { renderToString } from 'react-dom/server'
import { get } from 'lodash'

const mySuspense = (<Suspense />).type;

const MCOPTIONS = {
  styles: [
    { url: Images.cluster, height: 53, width: 52, textColor: 'white', textSize: 16 },
    { url: Images.cluster, height: 53, width: 52, textColor: 'white', textSize: 16 },
    { url: Images.cluster, height: 53, width: 52, textColor: 'white', textSize: 16 },
    { url: Images.cluster, height: 53, width: 52, textColor: 'white', textSize: 16 },
    { url: Images.cluster, height: 53, width: 52, textColor: 'white', textSize: 16 }
  ]
}

class MarkerClusterNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      indexDisplay: null,
      data: []
    }
    this.Clusterer = null
    this.markerCluster = null
    this.activeInfoWindow = null
  }

  componentDidMount() {
    if (this.props.selectData) {
      if (get(this, 'props.eventDataSummary', []).length > 2000) {
        setTimeout(() => this.createMarkerCluster(this.props.eventDataSummary), 1000)
      } else {
        this.createMarkerCluster(this.props.eventDataSummary)
      }
    }
    document.addEventListener('click', (e) => {
      if (e.target.id === 'ic_history' || e.target.id === 'i_history') {
        this.props.history.push({
          pathname: '/history',
          // search: '?query=abc',
          state: { id: 999, name: 'summary' }
        })
      }
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { enabled, eventDataSummary, isLoadingevent, language, data, summaryData, keepArgument } = this.props
    // if (isLoadingevent !== nextProps.isLoadingevent) this.removeMarkerCluster()
    if (nextProps.summaryData !== summaryData || nextProps.keepArgument !== keepArgument) {
      this.props.setInfoWindowIndex(null)
      this.removeMarkerCluster()
      return false
    }
    if (language !== nextProps.language) return true

    if (nextProps.enabled !== enabled) {
      if (this.markerCluster) {
        if (nextProps.enabled) this.markerCluster.setMinClusterSize(2);
        else this.markerCluster.setMinClusterSize(eventDataSummary.length + 1);
        this.markerCluster.repaint();
      }
    }
    if (eventDataSummary !== nextProps.eventDataSummary) {
      // console.log(">> eventDataSummary change : ", nextProps.eventDataSummary)
      this.removeMarkerCluster()
      this.setState({ indexDisplay: null })
      this.createMarkerCluster(nextProps.eventDataSummary)
      return true
    }
    return false
  }

  componentDidUpdate(prevProps) {
    let { language } = this.props
    if (prevProps.language !== language) setTimeout(() => this.setTitleInfoWindow(), 50)
  }

  removeMarkerCluster() {
    if (this.activeInfoWindow !== null) this.activeInfoWindow.close()
    this.markerCluster && this.markerCluster.clearMarkers()
  }

  createMarkerCluster(data) {
    let locations = []

    for (let index in data) {
      if (!isEmpty(data[index].latlng)) {
        let lat = data[index].latlng.split(',')[0]
        let lng = data[index].latlng.split(' ')[1]
        locations.push({ lat: parseFloat(lat), lng: parseFloat(lng) })
      }
    }

    this.fitBounds(locations)
    // bound

    let icon = {
      url: Images.markerOverSpeed, // url
      scaledSize: new window.google.maps.Size(25, 25)
    }
    const markers = locations.map((latlng, index) => {
      const marker = new window.google.maps.Marker({
        position: latlng,
        icon
      });

      const infowindow = new window.google.maps.InfoWindow({
        content: this.contentString(data[index]),
      });

      this.addListenerMarker(marker, infowindow, index)
      return marker
    });

    // Add a marker clusterer to manage the markers.
    this.markerCluster = new MarkerClusterer(this.props.map, markers, {
      minimumClusterSize: this.props.enabled ? 2 : data.length + 1,
      ...MCOPTIONS
    })
  }

  fitBounds(path) {
    if (this.props.map) {
      let bounds = new window.google.maps.LatLngBounds();
      for (let index in path) {
        bounds.extend({ lat: path[index].lat, lng: path[index].lng })
      }
      this.props.map.fitBounds(bounds)
    }
  }

  addListenerMarker(marker, infowindow, index) {

    if (this.props.infoWindowIndex !== null && this.props.infoWindowIndex == index)
      infowindow.open(this.props.map, marker);

    marker.addListener("click", () => {
      if (this.activeInfoWindow) {
        this.activeInfoWindow.close();
      }
      infowindow.open(this.props.map, marker);
      this.activeInfoWindow = infowindow

      // let ic = document.getElementById('ic_history')
      // if (ic) {
      //   ic.addEventListener('click', function () {
      //     console.log('sflaj;sflkaj;slfaksfa;ksfl');
      //   })
      // }
      this.props.setInfoWindowIndex(index)
    });

    // infowindow.content.addListener("click", (e) => {
    //   console.log('infowindow', e)
    // });
  }


  getEventNameKey(eventName) {
    let key = ""
    switch (eventName) {
      case "Driving Over 4h":
        key = "summary_47"
        break;
      case "Driving Over 8h":
        key = "summary_48"
        break;
      case "Driving Over Speed":
        key = "summary_49"
        break;
      case "Not Swipe card":
        key = "summary_50"
        break;
      case "GPS Unpluged":
        key = "summary_51"
        break;
      case "Wrongtype":
        key = "summary_52"
        break;
      case "Harsh Start":
        key = "summary_54"
        break;
      case "Harsh Acceleration":
        key = "summary_55"
        break;
      case "Harsh Brake":
        key = "summary_57"
        break;
      case "Harsh Start":
        key = "summary_54"
        break;
      case "Sharp Turn":
        key = "summary_56"
        break;
      case "Over Speed 60":
        key = "summary_58"
        break;
      case "Over Speed 80":
        key = "summary_59"
        break;
      case "Over Speed 100":
        key = "summary_60"
        break;
      case "Over Speed 120":
        key = "summary_61"
        break;
      case "E/G Check Lamp":
        key = "summary_63"
        break;
      case "Over Maintenance Period":
        key = "summary_64"
        break;
      case "Maintenance Soon":
        key = "summary_65"
        break;
      case "Battery Voltage Low":
        key = "summary_66"
        break;
      case "Derate Condition":
        key = "summary_67"
        break;
      case "Tire Pressure Low":
        key = "summary_68"
        break;
    }

    return key
  }

  setTitleInfoWindow() {
    let { eventName } = this.props
    let name = this.getEventNameKey(eventName)

    $("#lb_event").text(this.reTT(t('event')))
    $("#lb_name").text(this.reTT(t(name)))
    $("#lb_license_plate").text(this.reTT(t('license_plate')))
    $("#lb_summary_79").text(this.reTT(t('summary_79')))
    $("#lb_summary_80").text(this.reTT(t('summary_80')))
    $("#lb_summary_81").text(this.reTT(t('summary_81')))
    $("#lb_summary_82").text(this.reTT(t('summary_82')))
    $("#lb_realtime_11").text(this.reTT(t('realtime_11')))
    $("#lb_summary_44").text(this.reTT(t('summary_44')))
  }

  reTT(reactSymbol) {
    if (reactSymbol.type === mySuspense) reactSymbol = reactSymbol.props.children
    let str = renderToString(reactSymbol)
    str = str.replace('<div data-reactroot="">', '').replace(/<\/div>/g, '')
      .replace('<span data-reactroot="">', '').replace(/<\/span>/g, '').replace(/<!-- -->/g, '')
    return str
  }

  contentString(data) {
    // console.log("contentString : ", data)
    const tdStyle1 = "border: none; width: 130px;vertical-align: top"
    const tdStyle2 = "border: none; width: 200px;vertical-align: top"
    let { eventName } = this.props
    let { vehicle_id, dtstart, dtstop, speed_avg, latlng } = data
    let [lat, lng] = latlng.split(', ')
    let name = this.getEventNameKey(eventName)
    let lb_event = this.reTT(t('event'))
    let lb_license_plate = this.reTT(t('license_plate'))
    let lb_summary_79 = this.reTT(t('summary_79'))
    let lb_summary_80 = this.reTT(t('summary_80'))
    let lb_summary_81 = this.reTT(t('summary_81'))
    let lb_summary_82 = this.reTT(t('summary_82'))
    let lb_realtime_11 = this.reTT(t('realtime_11'))
    let lb_summary_44 = this.reTT(t('summary_44'))

    return '<div>' +
      '<table className="table-info-window">' +
      '  <tbody>' +
      '    <tr>' +
      '       <td style="' + tdStyle1 + '">' +
      '           <small id="lb_event">' + lb_event + ':</small>' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '          <small id="lb_name">' + this.reTT(t(name)) + '</small>' +
      // '          <small id="ic_history">' + '<i id="i_history" class="fas fa-history"></i>' + '</small>' +
      '        </td>' +
      '      </tr>' +

      '      <tr>' +
      '        <td style="' + tdStyle1 + '">' +
      '           <small id="lb_license_plate">' + lb_license_plate + ':</small > ' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '                <small>' + vehicle_id + '</small>' +
      '        </td>' +
      '      </tr>' +

      '      <tr>' +
      '        <td style="' + tdStyle1 + '">' +
      '           <small id="lb_summary_79">' + lb_summary_79 + ':</small>' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '              <small>' + moment(dtstart).format('DD/MM/YYYY HH:mm:ss') + '</small>' +
      '        </td>' +
      '      </tr>' +

      '      <tr>' +
      '        <td style="' + tdStyle1 + '">' +
      '           <small id="lb_summary_80">' + lb_summary_80 + ':</small>' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '               <small>' + moment(dtstop).format('DD/MM/YYYY HH:mm:ss') + '</small>' +
      '        </td>' +
      '      </tr>' +

      '      <tr>' +
      '        <td style="' + tdStyle1 + '">' +
      '           <small id="lb_summary_81">' + lb_summary_81 + ':</small>' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '                <small>' + lat + '</small>' +
      '        </td>' +
      '      </tr>' +

      '      <tr>' +
      '        <td style="' + tdStyle1 + '">' +
      '           <small id="lb_summary_82">' + lb_summary_82 + ':</small>' +
      '        </td>' +
      '        <td style="' + tdStyle2 + '">' +
      '              <small>' + lng + '</small>' +
      '        </td>' +
      '      </tr>' +
      (speed_avg !== undefined ?
        '      <tr>' +
        '        <td style="' + tdStyle1 + '">' +
        '           <small id="lb_realtime_11">' + lb_realtime_11 + ':</small>' +
        '        </td>' +
        '        <td style="' + tdStyle2 + '">' +
        '                <small>' + speed_avg.toFixed(0) + ' ' + lb_summary_44 + '</small>' +
        '        </td>' +
        '      </tr>' : '') +
      '    </tbody>' +
      '  </table>' +
      '</div>'
  }


  render() {
    return ""
  }
}

const mapStateToProps = (state) => ({
  language: state.versatile.language,
  isLoadingevent: state.summary.isLoadingevent,
  selectData: state.summary.selectData,
  eventDataSummary: state.summary.eventDataSummary,
  summaryData: state.summary.summaryData,
  keepArgument: state.summary.keepArgument,
  infoWindowIndex: state.summary.infoWindowIndex,
});

const mapDispatchToProps = (dispatch) => ({
  setInfoWindowIndex: (id) => dispatch(SummaryActions.setInfoWindowIndex(id))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MarkerClusterNew))

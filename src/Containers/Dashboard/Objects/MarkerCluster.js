import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Marker, MarkerClusterer, InfoWindow } from '@react-google-maps/api'
import Images from '../icons/Images'
import moment from 'moment';
import { t } from '../../../Components/Translation';
import { isEmpty, isEqual } from 'lodash';

const tdStyle1 = {
  border: 'none',
  width: '120px',
  verticalAlign: 'top'
}

const tdStyle2 = {
  border: 'none',
  width: '180px',
  verticalAlign: 'top'
}

class MarkerCluster extends Component {
  constructor(props) {
    super(props)
    this.state = {
      indexDisplay: null,
      data: []
    }
    this.Clusterer = null
    this.ClusterEnabled = true
  }

  componentDidMount = () => {
    let { enabled, eventDataSummary } = this.props
    this.ClusterEnabled = enabled
    // console.log("DidMount : ", eventDataSummary)
    // this.setState({ data: eventDataSummary })
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { enabled, eventDataSummary, isLoadingevent } = this.props

    // if (nextProps.isLoadingevent !== isLoadingevent) {
    //   let { markers } = this.Clusterer
    //   console.log("markers change : ", markers)
    //   if (markers.length > 0) {
    //     console.log("this.Clusterer : ", this.Clusterer)
    //     this.Clusterer.clearMarkers();
    //   }
    // }

    // console.log("nextState.enabled : ", nextProps.enabled)
    // console.log("this.ClusterEnabled : ", this.ClusterEnabled)
    if (nextProps.enabled !== this.ClusterEnabled) {
      // console.log("OK")
      this.ClusterEnabled = nextProps.enabled
      this.Clusterer.repaint();
      return true
    }

    // if (!isEqual(data, nextProps.data)) {
    //   this.setState({ indexDisplay: null })
    //   return true
    // }

    if (this.state.indexDisplay !== nextState.indexDisplay) {
      return true
    }

    if (eventDataSummary !== nextProps.eventDataSummary) {
      // this.Clusterer && this.Clusterer.clearMarkers();
    }

    if (eventDataSummary !== nextProps.eventDataSummary) {
      this.setState({ indexDisplay: null })
      return true
    }

    return false
  }

  // componentDidUpdate(prevProps) {
  //   let { enabled, data } = this.props
  //   if (enabled !== this.ClusterEnabled) {
  //     this.ClusterEnabled = enabled
  //     this.Clusterer.repaint();
  //   }
  //   if (!isEqual(data, prevProps.data)) {
  //     this.setState({ indexDisplay: null })
  //   }
  // }

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

  render() {
    let { enabled, map, indexMarker, eventName, eventDataSummary } = this.props
    let { indexDisplay, eventData, data } = this.state
    let name = this.getEventNameKey(eventName)

    // console.log(">> Redux eventData : ", this.props.eventDataSummary)
    // console.log(">> Redux eventData : ", data)

    return <MarkerClusterer
      ignoreHidden={true}
      minimumClusterSize={enabled ? 5 : (eventDataSummary.length + 1)}
      onLoad={Clusterer => {
        this.Clusterer = Clusterer
      }}
      styles={[{ "url": Images.cluster, height: 53, width: 52, textColor: 'white', textSize: 16 }]}
    >
      {
        (clusterer) => eventDataSummary.map((location, i) => {
          let lat = location.latlng.split(',')[0]
          let lng = location.latlng.split(' ')[1]

          let { vehicle_id, dtstart, dtstop, speed_avg } = location

          return [<Marker
            key={i}
            clusterer={clusterer}
            position={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
            icon={{
              url: Images.markerOverSpeed,
              scaledSize: new window.google.maps.Size(25, 25)
            }}
            onClick={() => { this.setState({ indexDisplay: i }) }}
          // visible={true}
          >
            {indexDisplay === i &&
              <InfoWindow
                position={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
                onCloseClick={() => {
                  this.setState({ indexDisplay: null })
                  // var object = this.state.marker_isOpen;
                  // object[indexMarker] = false
                  // this.setState({
                  //   marker_isOpen: object,
                  //   indexMarker: 0
                  // })
                }}
              >
                {/* {console.log('sdf', vehicle_id, dtstart, dtstop, speed_avg)} */}
                <table className="table-info-window">
                  <tbody>
                    <tr>
                      <td style={tdStyle1}>
                        <small>{t("event")}:</small>
                      </td>
                      <td style={tdStyle2}>
                        <small>{t(name)}</small>
                      </td>
                    </tr>
                    <tr>
                      <td style={tdStyle1}>
                        <small>{t("license_plate")}:</small>
                      </td>
                      <td style={tdStyle2}>
                        <small>{vehicle_id}</small>
                      </td>
                    </tr>
                    <tr>
                      <td style={tdStyle1}>
                        <small>{t("summary_79")}:</small>
                      </td>
                      <td style={tdStyle2}>
                        <small>{moment(dtstart).format('DD/MM/YYYY HH:mm:ss')}</small>
                      </td>
                    </tr>
                    <tr>
                      <td style={tdStyle1}>
                        <small>{t("summary_80")}:</small>
                      </td>
                      <td style={tdStyle2}>
                        <small>{moment(dtstop).format('DD/MM/YYYY HH:mm:ss')}</small>
                      </td>
                    </tr>
                    <tr>
                      <td style={tdStyle1}>
                        <small>{t("summary_81")}:</small>
                      </td>
                      <td style={tdStyle2}>
                        <small>{lat}</small>
                      </td>
                    </tr>
                    <tr>
                      <td style={tdStyle1}>
                        <small>{t("summary_82")}:</small>
                      </td>
                      <td style={tdStyle2}>
                        <small>{lng}</small>
                      </td>
                    </tr>
                    {speed_avg !== undefined && <tr>
                      <td style={tdStyle1}>
                        <small>{t("realtime_11")}:</small>
                      </td>
                      <td style={tdStyle2}>
                        <small>{speed_avg.toFixed(0)} {t("summary_44")}</small>
                      </td>
                    </tr>}
                  </tbody>
                </table>
              </InfoWindow>
            }
          </Marker>]
        })
      }
    </MarkerClusterer>
  }
}

const mapStateToProps = (state) => ({
  isLoadingevent: state.summary.isLoadingevent,
  eventDataSummary: state.summary.eventDataSummary,
});
const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MarkerCluster)
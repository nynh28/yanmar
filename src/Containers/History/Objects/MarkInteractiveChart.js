import React, { Component } from 'react';
import { connect } from 'react-redux'
import HistoryActions from '../../../Redux/HistoryRedux'
import { Marker, InfoWindow } from '@react-google-maps/api'
import moment from 'moment-timezone';
import { momentDate, calculateToDuration } from '../../../Functions/DateMoment'
import { get } from 'lodash'
import Images from '../icons/Images'
import { isEmpty } from 'react-redux-firebase'
import { t } from '../../../Components/Translation'

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

class MarkInteractiveChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postIndex: 0,
            markers: "",
            markTour: {
                lat: "",
                lng: "",
                course: 0
            },
            isShowInfo: false
        }
    }

    onToggleOpen(isShow) {
        this.setState({ isShowInfo: isShow })
    }

    componentDidUpdate(prevProps) {
        let { MarkerInteractiveData, map } = this.props

        if (prevProps.MarkerInteractiveData !== MarkerInteractiveData) {
            this.onToggleOpen(false)
            if (!isEmpty(MarkerInteractiveData)) {
                map.panTo({ lat: MarkerInteractiveData.lat, lng: MarkerInteractiveData.lng })
                map.panBy(0, 400)
                map.setZoom(15)
            }
        }
    }

    setInfo(infoMarker) {
        let driverName = get(infoMarker, 'driverName', '-')
        let phoneNo = get(infoMarker, 'phoneNo', '-')
        let vin = get(infoMarker, 'vin', '-')
        let address = get(infoMarker, 'admin_level3_name', '-') + ' ' +
            get(infoMarker, 'admin_level2_name', '-') + ' ' +
            get(infoMarker, 'admin_level1_name', '-')
        let driver = get(infoMarker, 'driver_cards_name', '-')
        let lat = get(infoMarker, 'lat', '-')
        let lng = get(infoMarker, 'lng', '-')
        let altitude = get(infoMarker, 'gps.altitude', 0) //
        let speed = get(infoMarker, 'speed', 0)
        let time = momentDate(get(infoMarker, 'time', '-'))
        let duration = calculateToDuration(get(infoMarker, 'gps.duration', 0)) //
        let fuelCons = get(infoMarker, 'canbus_fuel_cons', 0)
        let link = 'http://maps.google.com/maps?q=&layer=c&cbll=' + lat + ',' + lng + '&cbp=,' + get(infoMarker, 'gps.course', 0) + ',,,0'
        let images = Images.noImage

        return (
            <table className="table-info-window">
                <tbody>
                    <tr>
                        <td style={tdStyle1}>
                            <small>{t('history_29')} :</small>
                        </td>
                        <td style={tdStyle2}>
                            <small>{driverName}</small>
                        </td>
                    </tr>
                    <tr>
                        <td style={tdStyle1}>
                            <small>{t('history_30')} :</small>
                        </td>
                        <td style={tdStyle2}>
                            <small>{phoneNo}</small>
                        </td>
                    </tr>
                    <tr>
                        <td style={tdStyle1}>
                            <small>{t('history_31')} :</small>
                        </td>
                        <td style={tdStyle2}>
                            <small>{vin}</small>
                        </td>
                    </tr>

                    <tr>
                        <td style={tdStyle1}>
                            <small>{t('history_32')} :</small>
                        </td>
                        <td style={tdStyle2}>
                            <small>{address}</small>
                        </td>
                    </tr>

                    <tr>
                        <td style={tdStyle1}>
                            <small>{t('history_33')} :</small>
                        </td>
                        <td style={tdStyle2}>
                            <small>{"-"}</small>
                        </td>
                    </tr>

                    <tr>
                        <td style={tdStyle1}>
                            <small>{t('history_34')} :</small>
                        </td>
                        <td style={tdStyle2}>
                            <small id='test'>
                                <a href={link} target="_blank">{t('history_35')} &gt;&gt;</a>
                            </small>
                        </td>
                    </tr>

                    <tr>
                        <td style={tdStyle1}>
                            <small>{t('history_36')} :</small>
                        </td>
                        <td style={tdStyle2}>
                            <small>{driver}</small>
                        </td>
                    </tr>

                    <tr>
                        <td style={tdStyle1}>
                            <small>{t('history_37')} :</small>
                        </td>
                        <td style={tdStyle2}>
                            <small>{lat}°</small>
                        </td>
                    </tr>

                    <tr>
                        <td style={tdStyle1}>
                            <small>{t('history_38')} :</small>
                        </td>
                        <td style={tdStyle2}>
                            <small>{lng}°</small>
                        </td>
                    </tr>

                    <tr>
                        <td style={tdStyle1}>
                            <small>{t('history_39')} :</small>
                        </td>
                        <td style={tdStyle2}>
                            <small>{speed} {t('realtime_41')}</small>
                        </td>
                    </tr>

                    <tr>
                        <td style={tdStyle1}>
                            <small>{t('history_40')} :</small>
                        </td>
                        <td style={tdStyle2}>
                            <small>{time}</small>
                        </td>
                    </tr>

                    <tr>
                        <td style={tdStyle1}>
                            <small>{t('history_41')} :</small>
                        </td>
                        <td style={tdStyle2}>
                            <small>{duration}</small>
                        </td>
                    </tr>

                    <tr>
                        <td style={tdStyle1}>
                            <small>{t('history_42')} :</small>
                        </td>
                        <td style={tdStyle2}>
                            <small>{fuelCons} {t('realtime_46')}</small>
                        </td>
                    </tr>

                    <tr>
                        <td style={tdStyle1}>
                            <small>{t('history_43')} :</small>
                        </td>
                        <td style={tdStyle2}>
                            <img src={images} style={{ minHeight: 60, maxHeight: 60 }} />
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }

    statusColor(info) {
        let color = ''
        let acc = get(info, 'acc', '')
        let speed = get(info, 'speed', 0)
        let speed_limit = get(info, 'speed_limit', 0)
        let gpsdate = momentDate(get(info, 'gpsdate'))

        if (acc === 't') {
            if (speed_limit > 0 && speed > speed_limit) color = '#5856d6'
            else if (speed <= 2) color = 'rgb(255, 230, 0)'
            else color = 'rgb(93, 230, 72)'
        } else {
            color = '#ff3b30'
        }
        return color
    }


    render() {
        let { isShowInfo } = this.state
        let { map, MarkerInteractiveData } = this.props

        return (
            <div>
                {
                    !isEmpty(MarkerInteractiveData) && <Marker
                        position={{ lat: MarkerInteractiveData.lat, lng: MarkerInteractiveData.lng }}
                        clickable={true}
                        zIndex={1000}
                        icon={{
                            path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                            strokeColor: "#000",
                            strokeWeight: 1,
                            fillColor: this.statusColor(MarkerInteractiveData),
                            fillOpacity: 1,
                            scale: 3,
                            rotation: MarkerInteractiveData.course
                        }}
                        onClick={() => this.onToggleOpen(true)}
                    >
                        {
                            isShowInfo && <InfoWindow
                                position={{ lat: MarkerInteractiveData.lat, lng: MarkerInteractiveData.lng }}
                                onCloseClick={() => this.onToggleOpen(false)}
                            >
                                {this.setInfo(MarkerInteractiveData)}
                            </InfoWindow>
                        }
                    </Marker>
                }
            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    MarkerInteractiveData: state.history.MarkerInteractiveData
});

export default connect(mapStateToProps)(MarkInteractiveChart)
import React, { Component } from 'react';
import { connect } from 'react-redux'
import TrackingHistoryActions from '../../../Redux/TrackingHistoryRedux'
import { Marker, InfoWindow } from '@react-google-maps/api'
import { get } from 'lodash'
import { t } from '../../../Components/Translation'


class MarkInteractiveChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.markers = []
        this.createPoint = this.createPoint.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { MarkerInteractiveData } = this.props

        if (nextProps.MarkerInteractiveData !== MarkerInteractiveData) this.createPoint(nextProps.MarkerInteractiveData)

        return false
    }

    componentWillUnmount() {
        this.clearMarker()
    }

    statusColor(info) {
        let color = ''
        let acc = get(info, 'acc', '')
        let speed = get(info, 'speed', 0)
        let speed_limit = get(info, 'speed_limit', 0)

        if (acc === 't') {
            if (speed_limit > 0 && speed > speed_limit) color = '#6F25E5'
            else if (speed <= 2) color = '#FFE600'
            else color = '#5CE648'
        } else {
            color = '#ff3b30'
        }
        return color
    }

    createPoint(point) {
        // console.log("MarkerInteractiveData : ", point)
        let course = parseInt(point.course)
        if (this.markers.length == 0) {
            const marker = new window.google.maps.Marker({
                position: { lat: point.lat, lng: point.lng },
                map: this.props.map,
                icon: {
                    path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    strokeColor: "#000",
                    strokeWeight: 1,
                    fillColor: this.statusColor(point),
                    fillOpacity: 1,
                    scale: 3,
                    rotation: course
                },
                zIndex: 1000000
            });
            this.markers.push(marker)
        }
        else {
            let latLast = this.markers[0].position.lat(), lngLast = this.markers[0].position.lat()
            if (latLast != point.lat && lngLast !== point.lng) {
                this.markers[0].map.panTo({ lat: point.lat, lng: point.lng })
                this.markers[0].setPosition({ lat: point.lat, lng: point.lng })
                this.markers[0].setIcon({
                    path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    strokeColor: "#000",
                    strokeWeight: 1,
                    fillColor: this.statusColor(point),
                    fillOpacity: 1,
                    scale: 3,
                    rotation: course
                })
            }
        }
    }

    clearMarker() {
        for (let index in this.markers) this.markers[index].setMap(null)
        this.markers.length = 0
    }

    render() {
        return ("")
    }
}

const mapStateToProps = (state) => ({
    MarkerInteractiveData: state.trackingHistory.MarkerInteractiveData
});

export default connect(mapStateToProps)(MarkInteractiveChart)
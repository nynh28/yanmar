import React, { Component } from 'react';
import { connect } from 'react-redux'
import HistoryActions from '../../../Redux/HistoryRedux'
import { Marker } from '@react-google-maps/api'
import { dataSource } from './dataSource.js';


class PlayTour extends Component {
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
            zoomLevel: 14,
            tails: []
        }
        this.fitBounds = this.fitBounds.bind(this);
    }

    componentWillMount() {
        this.setState({ markers: dataSource.vehicles })
    }

    componentDidUpdate(prevProps) {
        let { markTourInfo, dataHistory } = this.props
        if (prevProps.markTourInfo !== markTourInfo) {
            if (markTourInfo.isMarkPlay) {
                this.props.map.panTo(markTourInfo.location)
                this.props.map.panBy(0, 200);
            }
        }

        if (prevProps.dataHistory !== this.props.dataHistory) {
            let { dataHistory } = this.props
            let tails = []
            if (dataHistory && dataHistory.trips && dataHistory.trips.length > 0) {
                dataHistory.trips.map((trips) => {
                    if (trips[29].length === 0) {
                        let ar = trips[9].split(',')
                        if (trips[21] === 2) ar = trips[17].split(',')
                        tails.push({ lat: Number(ar[0]), lng: Number(ar[1]) })
                    } else if (trips[21] !== 5 && trips[21] !== 6) {
                        trips[29].map((item) => {
                            tails.push({ lat: item[2], lng: item[3] })
                        })
                    }
                })
            }

            this.setState({ tails })
            if (tails.length > 0) this.fitBounds(tails, true)

        }
    }

    fitBounds(tails, isIntital) {
        let { map } = this.props
        if (map !== undefined) {
            const bounds = new window.google.maps.LatLngBounds();
            tails.map(item => {
                bounds.extend({ lat: item.lat, lng: item.lng });
            });

            if (map.fitBounds) {
                map.fitBounds(bounds);
                let northWest = new window.google.maps.LatLng(bounds.getSouthWest().lat(), bounds.getNorthEast().lng());
                map.panTo(northWest);

                let zoom = map.getZoom()
                if (isIntital) {
                    map.setZoom(zoom - 3);
                    map.panBy(0, 200);
                }
                else {
                    map.setZoom(this.state.zoomLevel)
                    // map.setZoom(zoom - 3);
                    // map.panBy(0, 200);
                }

            }
        }
    }

    render() {
        let { markTourInfo, map } = this.props
        // console.log(">> RENDER MARTOUR <<")
        markTourInfo.isMarkPlay && this.fitBounds(this.state.tails, false)

        return (
            <div>
                {
                    markTourInfo.isMarkPlay &&
                    <Marker
                        key={0}
                        icon={{
                            path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                            strokeColor: "green",
                            fillColor: "green",
                            fillOpacity: 1,
                            scale: 4,
                            rotation: markTourInfo.course
                        }}
                        position={markTourInfo.location}
                    >
                    </Marker>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    playTourAction: state.history.playTourAction,
    dataHistory: state.history.dataHistory,
    speed: state.history.speed,
    markTourInfo: state.history.markTourInfo
});

export default connect(mapStateToProps)(PlayTour)
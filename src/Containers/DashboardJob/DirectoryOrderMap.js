import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Row } from 'reactstrap'
import { GoogleMap, LoadScriptNext } from '@react-google-maps/api'

class DirectoryOrderMap extends Component {

    constructor(props) {
        super(props)
        this.state = {
            centerDefualt: {
                lat: 13.786377,
                lng: 100.608755
            },
            zoomDefault: 5
        }
    }


    render() {
        let { zoomDefault, centerDefualt } = this.state
        return (
            <LoadScriptNext id="script-loader" googleMapsApiKey={"AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&libraries=geometry"}>
                <GoogleMap
                    onLoad={map => {
                        this.map = map
                        this.setState({ mapLoad: map })
                    }}
                    zoom={zoomDefault}
                    center={centerDefualt}
                    disableDefaultUI={true}
                    mapContainerClassName={"map"}
                    id='realtime-map'
                    options={{
                        zoomControl: false,
                        mapTypeControl: false,
                        streetViewControl: false,
                        rotateControl: false,
                        fullscreenControl: false
                    }}

                    mapContainerStyle={{
                        width: '100%',
                        height: '600px'
                    }}
                >
                </GoogleMap>
            </LoadScriptNext>
        )
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(DirectoryOrderMap)
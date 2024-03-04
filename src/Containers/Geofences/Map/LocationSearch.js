import React, { useState, useEffect, useMemo } from "react";
import { connect } from 'react-redux'
import GeofencesActions from "../../../Redux/GeofencesRedux"
import { AutoComplete, Select } from "antd";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

const { Option } = Select;

const LocationSearch = (props) => {
    let { map } = props

    let errors = false

    const {
        ready,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete();


    const handleInput = (data) => {
        setValue(data);
    };

    const handleSelect = (data) => {
        setValue(data, false);
        clearSuggestions();

        getGeocode({ address: data }).then((results) => {
            const { lat, lng } = getLatLng(results[0]);
            if (map) {
                map.panTo({ lat, lng })
                setTimeout(() => map.setZoom(17), 800);
            }
        })
    }

    return (
        <div style={{ padding: 10 }}>
            <AutoComplete
                style={{ width: "100%" }}
                onChange={handleInput}
                onSelect={handleSelect}
                placeholder="ค้นหาสถานที่"
                disabled={!ready}
                status={errors ? "error" : ""}
            >
                {status === "OK" &&
                    data.map(({ id, description }) => (
                        <Option key={id} value={description}>
                            {description}
                        </Option>
                    ))}
            </AutoComplete>
        </div>
    )
}

const mapStateToProps = (state) => ({
    dataLogin: state.signin.dataLogin,
    language: state.versatile.language,
    valueSearch: state.geofences.valueSearch,
    // dataSource: state.geofences.dataSource,
});

const mapDispatchToProps = (dispatch) => ({
    setStatesGeofencesRedux: (obj) => dispatch(GeofencesActions.setStatesGeofencesRedux(obj))
})

export default connect(mapStateToProps, mapDispatchToProps)(LocationSearch)

import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { StandaloneSearchBox } from "@react-google-maps/api";
import MapControl from '../../../Components/GoogleMap/MapControl';

const SearchBox = (props) => {
  // const search = useRef()
  const { language } = useSelector((state) => state.versatile)

  const keyPress = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  }

  return (
    <MapControl position={7} map={props.map} id={'search-mp-geofence'} width="auto" >
      <StandaloneSearchBox
        onLoad={(search) => props.search(search)}
        key={`search-mp-geofence-${language}`}
        onPlacesChanged={
          props.onPlacesChanged
        }
      >
        <input
          type="text"
          className="form-control"
          placeholder={language == 'en' ? "Search Place" : language == 'th' ? "ค้นหาสถานที่" : language == 'ja' && "Search Place"}
          style={{
            margin: 10,
            width: `240px`,
          }}
          onKeyDown={keyPress}
        />
      </StandaloneSearchBox>
    </MapControl>
  )
}

export default SearchBox;

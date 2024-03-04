import React from 'react'
import './styles.css'
import { Select } from "antd";
import {
  GoogleMap,
  LoadScriptNext,
  StreetViewPanorama,
  Marker,
  Circle,
} from "@react-google-maps/api";
import { GOOGLE_MAP_API_KEY } from "../../Config/app-config";

const { Option } = Select;
export default (props) => {
  let {
    id = "google-map",
    children = "",
    zoom = 3,
    center = {
      lat: 13.786377,
      lng: 100.608755,
    },
    mapTypeId = "",
    zoomControl = true,
    streetViewControl = true,
    onLoad
  } = props

  return (<LoadScriptNext
    id="script-loader"
    region="thailand"
    googleMapsApiKey={`${GOOGLE_MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
  >
    <GoogleMap
      id={id}
      center={{
        lat: parseFloat(center.lat),
        lng: parseFloat(center.lng),
      }}
      onLoad={onLoad}
      zoom={zoom}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      options={{
        gestureHandling: 'greedy',
        zoomControl,
        zoomControlOptions: {
          position: 5,
        },
        mapTypeControl: false,
        streetViewControl,
        streetViewControlOptions: {
          position: 5,
        },
        rotateControl: false,
        fullscreenControl: true,
        // mapTypeId: "satellite",
      }}
    >
      {children}
    </GoogleMap>
  </LoadScriptNext>
  )
}
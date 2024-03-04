import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import ObjectMap from './Components/ObjectMap'
import GeofenceActions from "../../Redux/GeofenceRedux"
// DrawingManager
import { LoadScriptNext, GoogleMap } from "@react-google-maps/api";
import { GOOGEL_MAP_API_KEY } from '../../Config/app-config';


const Map = () => {
  let mapContainerStyle = { width: '98%', height: "calc(100vh - 150px)" }
  // if (this.props.form) delete mapContainerStyle.width
  // const map = useRef()
  // const search = useRef()
  const { language } = useSelector((state) => state.versatile)
  const { selectData, zoomSelected, centerSelected, geofencesEnabled, mapType } = useSelector((state) => state.geofence)
  const [map, setMap] = useState(null);
  const [search, setSearch] = useState(null);
  const [centerDefualt, setCenterDefualt] = useState({
    lat: 13.786377,
    lng: 100.608755
  })
  const [zoomDefualt, setZoomDefualt] = useState(6)
  const [place, setPlace] = useState(null);

  const dispatch = useDispatch()
  const resetSelectRow = () => dispatch(GeofenceActions.resetSelectRow())
  const getGeofenceByTypesGeof = (GeofenceTypeIds) => dispatch(GeofenceActions.getGeofenceByTypesGeof(GeofenceTypeIds))
  const setStateReduxGeofence = (objState) => dispatch(GeofenceActions.setStateReduxGeofence(objState))

  const onPlacesChanged = (e) => {
    console.log(search.getPlaces())
    if (search.getPlaces().length == 1) {
      setPlace({
        location: {
          lat: search.getPlaces()[0].geometry.location.lat(),
          lng: search.getPlaces()[0].geometry.location.lng(),
        },
      })
      setZoomDefualt(12)
      setCenterDefualt({
        lat: search.getPlaces()[0].geometry.location.lat(),
        lng: search.getPlaces()[0].geometry.location.lng(),
      })
    }
    else {
      setPlace(null)
      setZoomDefualt(8)
      setCenterDefualt({
        lat: 13.786377,
        lng: 100.608755
      })
    }
  };

  useEffect(() => {
    console.log(map)
  })

  return (
    <LoadScriptNext
      key={`geofence-map-${language}`}
      id="script-loader"
      language={language}
      region="thailand"
      // googleMapsApiKey="AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&v=3.exp&libraries=geometry,drawing,places">
      googleMapsApiKey={GOOGEL_MAP_API_KEY + "&v=3.exp&libraries=geometry,drawing,places"}>
      <GoogleMap
        onLoad={(e) => setMap(e)}
        onUnmount={(e) => console.log('onUnmount:', setMap(null))}
        zoom={zoomDefualt}
        center={centerDefualt}
        disableDefaultUI={true}
        key={`geofence-map-${language}`}
        id='geofence-map'
        options={{
          zoomControl: true,
          zoomControlOptions: {
            position: 5,
          },
          mapTypeControl: false,
          streetViewControl: true,
          streetViewControlOptions: {
            position: 5,
          },
          rotateControl: false,
          fullscreenControl: false
        }}

        mapContainerStyle={mapContainerStyle}
      >

        {
          map && <ObjectMap map={map} search={(search) => setSearch(search)} place={place} onPlacesChanged={(e) => onPlacesChanged(e)} />
        }


      </GoogleMap>
    </LoadScriptNext>
  )
}

export default Map;

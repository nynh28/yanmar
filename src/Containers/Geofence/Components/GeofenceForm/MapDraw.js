import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux'
import MapControlsCustom from '../../../../Components/GoogleMap/MapControlsCustom'
import MapControl from '../../../../Components/GoogleMap/MapControl'
import GeofenceActions from "../../../../Redux/GeofenceRedux"
import { LoadScriptNext, GoogleMap, DrawingManager, Data, Polygon, Polyline, Circle, Marker, StandaloneSearchBox } from "@react-google-maps/api";
import { GOOGEL_MAP_API_KEY } from '../../../../Config/app-config';

const MapDraw = ({ form, paths, mode, type, iconUrl, showIcon, iconPoint, center, radius, onChange, getPaths, getPathsPoint, position }) => {
  const dispatch = useDispatch()
  const getGeofenceByTypesGeof = (GeofenceTypeIds) => dispatch(GeofenceActions.getGeofenceByTypesGeof(GeofenceTypeIds))
  const setStateReduxGeofence = (objState) => dispatch(GeofenceActions.setStateReduxGeofence(objState))

  const { language } = useSelector(state => state.versatile);
  const { selectData, zoomSelected, centerSelected, geofencesEnabled, mapType } = useSelector(state => state.geofence);

  const [map, setMap] = useState(null);
  const [search, setSearch] = useState(null);
  const [place, setPlace] = useState(null);
  const [centerDefualt, setcenterDefualt] = useState({
    lat: 13.786377,
    lng: 100.608755
  });

  const [zoomDefualt, setZoomDefualt] = useState(6);
  const [objectEnabled, setObjectEnabled] = useState(true)
  const [polygonDraw, setPolygonDraw] = useState(null);
  const [polylineDraw, setPolylineDraw] = useState(null);
  const [circleDraw, setcircleDraw] = useState(null);
  const [previosOverlay, setPreviosOverlay] = useState(null)

  let mapContainerStyle = { width: '98%', height: "calc(100vh - 150px)" }
  if (form) delete mapContainerStyle.width

  const onPlacesChanged = () => {
    if (search.getPlaces().length == 1) {
      setPlace(true)
      setcenterDefualt({
        lat: search.getPlaces()[0].geometry.location.lat(),
        lng: search.getPlaces()[0].geometry.location.lng(),
      })
    }
    else {
      setPlace(false)
      setcenterDefualt({
        lat: 13.786377,
        lng: 100.608755
      })
    }
  };

  const handleOverlayComplete = (e) => {
    if (previosOverlay) {
      previosOverlay.setMap(null);
    }
    setPreviosOverlay(e.overlay)
    if (e.type == 'polygon' || e.type == 'polyline') {
      window.google.maps.event.addListener(e.overlay, "mouseup", function (event) {
        console.log(e.type)
        getPaths(e.overlay, e.type)
      });
    }
    else if (e.type == 'circle') {
      window.google.maps.event.addListener(e.overlay, "radius_changed", function (event) {
        console.log("mouseup radius : ", e.overlay);
        getPathsPoint(e.overlay, 'radius')
      });
      window.google.maps.event.addListener(e.overlay, "center_changed", function (event) {
        console.log("mouseup center : ", e.overlay);
        getPathsPoint(e.overlay, 'center')
      });
    }
    e.overlay.setMap(null)
  }

  const keyPress = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  }

  useEffect(() => {
    console.log('===== MapDraw Paths :', paths)
    console.log('===== MapDraw iconPoint :', iconPoint)
    console.log('===== MapDraw radius :', radius)
  }, [])

  return (
    <LoadScriptNext
      key={`script-loader-geofence-form-${language}`}
      id="script-loader-geofence-form"
      language={language}
      region="thailand"
      // googleMapsApiKey="AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&v=3.exp&libraries=geometry,drawing,places"
      googleMapsApiKey={GOOGEL_MAP_API_KEY + "&v=3.exp&libraries=geometry,drawing,places"}
    >
      <GoogleMap
        onLoad={(e) => {
          setMap(e)
          if (position) {
            // if (!createGeof) createPoint(position, require('./icons/ic_stop_m.png'))
            e.panTo(position);
            e.setZoom(17)
          }
        }}
        onUnmount={(e) => console.log('onUnmount:', setMap(null))}
        key={`geofence-map-form-${language}`}
        zoom={zoomDefualt}
        center={centerDefualt}
        disableDefaultUI={true}
        id='geofence-map-form'
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
          map &&
          <MapControlsCustom
            key={`object-map-geofence-${language}`}
            position={1}
            map={map}
            width="auto"
            clusterHidden={true}
            fitObjectHidden={true}
            licensePlateHidden={true}
            geofencesrHidden={false}
            objectHidden={true}
            dashboardHidden={true}
            infoHidden={true}
            measureHidden={true}
            geofencesEnabled={geofencesEnabled}
            mapType={mapType}
            onObjectChange={value => setObjectEnabled(value)}
            onGeofencesChange={value => getGeofenceByTypesGeof(value)}
            onMapTypeChange={value => setStateReduxGeofence({ mapType: value })}
          />
        }

        {
          map &&
          <MapControl key={`search-map-geofence-${language}`} position={7} map={map} id={'search-mp-geofence'} width="auto" >
            <StandaloneSearchBox
              onLoad={(search) => setSearch(search)}
              onPlacesChanged={onPlacesChanged}
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
        }

        <Polygon
          onLoad={(polygon) => setPolygonDraw(polygon)}
          paths={paths}
          options={{
            clickable: true,
            draggable: true,
            editable: true,
            visible: type == 'polygon',
            zIndex: 1
          }}
          onMouseUp={(e) => onChange('polygon', polygonDraw)}
        />
        <Polyline
          onLoad={(polyline) => setPolylineDraw(polyline)}
          path={paths}
          options={{
            clickable: true,
            draggable: true,
            editable: true,
            visible: type == 'polyline',
            zIndex: 1
          }}
          onMouseUp={(e) => onChange('polyline', polylineDraw)}
        />
        <Circle
          onLoad={(circle) => setcircleDraw(circle)}
          center={paths[0]}
          onCenterChanged={(e) => type == 'circle' && circleDraw && onChange('circle', circleDraw, 'center')}
          onRadiusChanged={(e) => type == 'circle' && circleDraw && onChange('circle', circleDraw, 'radius')}
          options={{
            radius: radius,
            clickable: true,
            draggable: true,
            editable: true,
            visible: type == 'circle',
            zIndex: 1
          }}
        />
        <div>
          {
            showIcon && <Marker
              visible={showIcon}
              position={iconPoint}
              icon={{
                url: iconUrl,
              }}
            />
          }
          {
            place && <Marker
              visible={place}
              position={centerDefualt}
            />
          }
        </div>
        {
          map && <DrawingManager
            position={window.google.maps.ControlPosition.TOP_CENTER}
            drawingModes={[
              window.google.maps.drawing.OverlayType.CIRCLE,
              window.google.maps.drawing.OverlayType.POLYGON,
              window.google.maps.drawing.OverlayType.POLYLINE,
            ]}

            options={{
              drawingControlOptions: {
                position: window.google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                  window.google.maps.drawing.OverlayType.CIRCLE,
                  window.google.maps.drawing.OverlayType.POLYGON,
                  window.google.maps.drawing.OverlayType.POLYLINE,
                ]
              },
              circleOptions: {
                clickable: true,
                editable: true,
                zIndex: 1
              },
              polygonOptions: {
                clickable: true,
                editable: true,
                zIndex: 1
              },
              polylineOptions: {
                clickable: true,
                editable: true,
                zIndex: 1
              },

            }}
            onCircleComplete={(value) => getPathsPoint(value, 'add')}
            onPolygonComplete={(value) => getPaths(value, 'polygon')}
            onPolylineComplete={(value) => getPaths(value, 'polyline')}
            onOverlayComplete={(value) => handleOverlayComplete(value)}

          >
          </DrawingManager>
        }
      </GoogleMap>
    </LoadScriptNext>
  )
}

export default MapDraw;

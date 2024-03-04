import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import GoogleMapReact from "google-map-react";
import MapControlsCustomNew from "../../../Components/GoogleMap/MapControlsCustomNew";
import MapControl from "../../../Components/GoogleMap/MapControl";
import GeofenceDisplay from "./GeofenceDisplay";
import GeofencesSearch from "./GeofencesSearch";
import LocationSearch from "./LocationSearch";
import DrawingManager from "./DrawingManager";
import FullTextSearch from "./FullTextSearch";
import GeofencesActions from "../../../Redux/GeofencesRedux";
// # Import object on map
import { isEmpty, get } from "lodash";
import { GOOGLE_MAP_API_KEY, setBusinessPOI } from "../../../Config/app-config";

const Marker = ({ children }) => children;

const keyPage = "geofence";

let stateMapControl = {
  legendEnabled: true,
  clusterEnabled: true,
  objectEnabled: false,
  fitObjectEnabled: false,
  mapType: "roadmap",
  geofencesEnabled: [],
  dashboardEnabled: false,
  licensePlateEnabled: false,
  nameGeofEnabled: false,
};
let listGeof = [];
let listGeofDisplay = [];

const MarkerGeof = (arg) => {
  return (
    <Marker key={arg.id} lat={arg.lat} lng={arg.lng}>
      <div
        className="div-marker"
        style={{ cursor: "pointer" }}
        // onClick={arg.onClick}
      >
        <span
          className="tooltip-geof"
          style={{
            bottom: 20,
          }}
        >
          {arg.geofenceName}
        </span>
      </div>
    </Marker>
  );
};

const Map = (props) => {
  let {
    language,
    header,
    stateMapControl,
    isFormSetting,
    geofenceByTypes,
    isDrawing,
    geofenceDisplay,
    geofenceList,
    geofenceDataByPage,
    setGeofTypes,
    setMapControlGeofences,
    setStatesGeofencesRedux,
  } = props;
  // State
  const mapRef = useRef();
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(10);
  const [pointData, setPointData] = useState([]);
  const [map, setMap] = useState(null);

  useEffect(() => {
    fitBoundDisplay();
    checkLocationInBoundDisplay();
  }, [geofenceDisplay, isFormSetting]);
  useEffect(() => {
    if (mapRef.current && !isFormSetting) {
      mapRef.current.setZoom(5);
      mapRef.current.setCenter({ lat: 13.786377, lng: 100.608755 });
    }
  }, [isFormSetting]);

  //#region  useEffect

  //#region Get Geofence __________________________

  const checkLocationInBound = () => {
    // console.log(' _________ checkLocationInBound _________ ', listGeof)
    for (let i in listGeof) {
      if (mapRef.current) {
        let { position, point, polyline, polygon } = listGeof[i];
        const bd = mapRef.current.getBounds();
        let latlng = new window.google.maps.LatLng(position.lat, position.lng);
        let visible = false;
        if (bd.contains(latlng)) visible = true;
        if (point) point.setVisible(visible);
        if (polyline) polyline.setVisible(visible);
        if (polygon) polygon.setVisible(visible);
      }
    }
  };
  const checkLocationInBoundDisplay = () => {
    // console.log(' _________ checkLocationInBoundDisplay _________ ', listGeofDisplay)
    for (let i in listGeofDisplay) {
      if (mapRef.current) {
        let { position, point, polyline, polygon, circle, id } =
          listGeofDisplay[i];
        const bd = mapRef.current.getBounds();
        let latlng = new window.google.maps.LatLng(position.lat, position.lng);
        let visible = false;
        if (!isFormSetting && geofenceDisplay.includes(id)) {
          if (bd.contains(latlng)) visible = true;
        }
        if (point) point.setVisible(visible);
        if (polyline) polyline.setVisible(visible);
        if (polygon) polygon.setVisible(visible);
        if (circle) circle.setVisible(visible);
      }
    }
  };

  const fitBoundDisplay = () => {
    if (mapRef.current) {
      const getBounds = (bd, paths) => {
        paths.forEach(function (path) {
          let ar = path.getArray();
          for (let i = 0, l = ar.length; i < l; i++) {
            bd.extend(ar[i]);
          }
        });
      };
      let bounds = new window.google.maps.LatLngBounds();
      for (let itm of listGeofDisplay) {
        let { position, point, polyline, polygon, circle, id } = itm;
        if (!isFormSetting && geofenceDisplay.includes(id)) {
          if (polyline) getBounds(bounds, [polyline.getPath()]);
          if (polygon) getBounds(bounds, polygon.getPaths());
          if (circle) bounds.union(circle.getBounds());
        }
      }
      if (!isFormSetting && geofenceDisplay.length > 0)
        mapRef.current.fitBounds(bounds);
    }
  };
  //#endregion ____________________________________

  let disableButtons = ["geofences"],
    afterCusBtn = [];
  // if (clusterDisable) disableButtons.push('cluster')
  if (mapRef.current && mapRef.current.zoom <= 11)
    disableButtons.push("nameGeof");
  // if (isFormSetting) afterCusBtn.push({ id: "hand", title: "Hand", icon: "far fa-hand-paper" })
  if (isFormSetting)
    afterCusBtn.push({
      id: "drawing",
      title: "Drawing",
      icon: "fa fa-draw-polygon",
    });

  return (
    <div style={{ height: "calc(100vh - 56px)", width: "100%" }}>
      <GoogleMapReact
        // bootstrapURLKeys={{ key: `${GOOGLE_MAP_API_KEY} &libraries=drawing&language=${language}&region=${language}` }}
        bootstrapURLKeys={{
          key: `${GOOGLE_MAP_API_KEY}`,
          region: language,
          language: language,
          libraries: "drawing,geometry,places",
        }}
        defaultCenter={{ lat: 13.786377, lng: 100.608755 }}
        defaultZoom={5}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          map.minZoom = 0;
          setBusinessPOI(map);
          mapRef.current = map;
          setMap(map);
        }}
        onChange={({ zoom, bounds }) => {
          // console.log("zoom : ", zoom)
          setZoom(zoom);
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat,
          ]);
        }}
        onDrag={() => {}}
        onDragEnd={() => {
          checkLocationInBound();
          checkLocationInBoundDisplay();
        }}
        onZoomAnimationStart={() => {}}
        onZoomAnimationEnd={() => {
          checkLocationInBound();
          checkLocationInBoundDisplay();
        }}
        options={{
          gestureHandling: "greedy",
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
          fullscreenControl: false,
        }}
      >
        {map !== null && (
          <>
            <MapControlsCustomNew
              map={map}
              keyPage={keyPage}
              // beforeCusBtn={[
              //   { id: "cluster", title: "Cluster", icon: "icon-layer-group" },
              //   { id: "fitObjects", title: "Fit Objects", icon: "icon-expand" }
              // ]}
              afterCusBtn={afterCusBtn}
              // defaultActiveButtons={{ info: true }}
              activeButtons={{ ...stateMapControl, drawing: isDrawing }}
              disableButtons={disableButtons}
              hiddenButtons={["licensePlate", "geofLicen"]}
              onToggleActive={(id, value) => {
                console.log(id, value);
                if (id === "drawing") {
                  setStatesGeofencesRedux({ isDrawing: value });
                } else {
                  // if (id === 'geofences') getGeofenceByTypes(value)
                  setMapControlGeofences(id, value);
                }
                if (id === "measure") {
                  setStatesGeofencesRedux({ isDrawing: false });
                }
              }}
            />

            {/* <Geofences map={mapRef.current} setListIconGeof={(list) => {
              listGeof = list
              checkLocationInBound()
            }} /> */}

            {!isFormSetting && (
              <GeofenceDisplay
                map={mapRef.current}
                setListIconGeof={(list) => {
                  listGeofDisplay = list;
                  fitBoundDisplay(list);
                  checkLocationInBoundDisplay();
                }}
              />
            )}

            <MapControl
              position={7}
              map={map}
              id={"full-text-search"}
              width="auto"
              style={{ marginLeft: "5px" }}
            >
              {!isFormSetting ? (
                <FullTextSearch />
              ) : (
                <LocationSearch map={map} />
              )}
            </MapControl>

            {/* {!isFormSetting && <MapControl position={7} map={map} id={'full-text-search'} width="auto">
              <FullTextSearch />
            </MapControl>
            } */}

            {!isFormSetting && <GeofencesSearch map={mapRef.current} />}

            {isFormSetting && <DrawingManager map={mapRef.current} />}
          </>
        )}

        {/* GEOFENCES */}
        {mapRef.current &&
          mapRef.current.zoom > 11 &&
          stateMapControl.nameGeof &&
          get(geofenceDataByPage, "[" + keyPage + "]", []).map((data) => {
            let { geofence_id, center_point, geofence_name } = data;
            const bd = mapRef.current.getBounds();
            let latlng = new window.google.maps.LatLng(
              center_point.lat,
              center_point.lng
            );

            if (bd.contains(latlng)) {
              // อยู่ในพื้นที่
              return (
                <MarkerGeof
                  id={`geof-name-${geofence_id}`}
                  lat={center_point.lat}
                  lng={center_point.lng}
                  geofenceName={geofence_name}
                />
              );
            }
          })}

        {/* GEOFENCES */}
        {!isEmpty(geofenceList) &&
          mapRef.current &&
          mapRef.current.zoom > 11 &&
          stateMapControl.nameGeof &&
          geofenceList.map((data) => {
            // console.log('geofenceByTypes', geofenceByTypes)

            let { id, center_point, geofence_name, icon_url } = data;
            // if (mapRef.current && mapRef.current.zoom > 11) {
            const bd = mapRef.current.getBounds();
            let latlng = new window.google.maps.LatLng(
              center_point.lat,
              center_point.lng
            );
            if (geofenceDisplay.includes(id) && bd.contains(latlng)) {
              // อยู่ในพื้นที่
              return (
                <MarkerGeof
                  id={`geof-name-${id}`}
                  lat={center_point.lat}
                  lng={center_point.lng}
                  geofenceName={geofence_name}
                  iconUrl={icon_url}
                />
              );
            }
          })}
      </GoogleMapReact>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  language: state.versatile.language,
  geofenceByTypes: state.geofences.geofenceByTypes,
  stateMapControl: state.geofences.stateMapControl,
  isFormSetting: state.geofences.isFormSetting,
  isDrawing: state.geofences.isDrawing,
  geofenceDisplay: state.geofences.geofenceDisplay,
  geofenceList: state.geofences.geofenceList,
  geofenceDataByPage: state.common.geofenceDataByPage,
});

const mapDispatchToProps = (dispatch) => ({
  setGeofTypes: (geofenceByTypes) =>
    dispatch(GeofencesActions.setGeofTypes(geofenceByTypes)),
  setMapControlGeofences: (id, value) =>
    dispatch(GeofencesActions.setMapControlGeofences(id, value)),
  setStatesGeofencesRedux: (obj) =>
    dispatch(GeofencesActions.setStatesGeofencesRedux(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);

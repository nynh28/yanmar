import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import GoogleMapReact from "google-map-react";
import MapControlsCustom from "../../Components/GoogleMap/MapControlsCustomNew";
import MaintenanceActions from "../../Redux/MaintenanceRedux";
import { ENDPOINT_BASE_URL, GOOGEL_MAP_API_KEY } from "../../Config/app-config";
import Geofences from "./Geofences";
import { getIconStatusPath } from "../../Functions/StatusColor";
// import "./Styles/custom.css";
const { get } = require("lodash");
const Marker = ({ children }) => children;
const LT_UNKNOW = [0, 1, 4, 16, 17, 18, 19, 20, 21, 23, 24, 26, 27];

const MarkerMap = (arg) => {
  // console.log("arg : ", arg)
  let cla_t = "";
  if (LT_UNKNOW.includes(arg.classType) || arg.classType === null)
    cla_t = "unknow";
  else cla_t = arg.classType;

  let iconPath = getIconStatusPath(parseInt(arg.status));

  console.log(
    ">> : ",
    "/icons/MarkerYanmar/" + arg.status + "-" + "T" + "-1" + ".png"
  );
  return (
    <Marker key={arg.key} lat={arg.lat} lng={arg.lng}>
      <div
        className="div-marker"
        style={{ cursor: "pointer" }}
        onClick={arg.onClick}
      >
        <img
          className="marker-icon"
          src={iconPath}
          style={{ width: arg.iconSize }}
        />
      </div>
    </Marker>
  );
};

const Map = (props) => {
  // State
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  //#region  useEffect

  useEffect(() => {}, [props.markerInfo]);

  //#endregion

  let data = props.markerInfo;

  // console.log("data : ", data)

  //#region  Fit Bounds
  const fitBounds = () => {
    if (mapRef.current) {
      mapRef.current.setZoom(10);
      mapRef.current.panTo({ lat: data.lat, lng: data.lng });
    }
  };
  fitBounds();
  //#endregion

  const loadGeofence = async (GeofenceTypeIds) => {
    if (GeofenceTypeIds.length === 0) {
      props.setValue("geofenceByTypes", []);
      return;
    }

    let param = "";
    for (let index in GeofenceTypeIds) {
      if (param !== "") param += "&GeofenceTypeIds=" + GeofenceTypeIds[index];
      else param += "GeofenceTypeIds=" + GeofenceTypeIds[index];
    }

    var response = await fetch(
      ENDPOINT_BASE_URL + "Geofence/Geofence/ListByTypes?" + param,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: props.header.idToken,
          "X-API-Key": props.header.redisKey,
        },
      }
    );

    var data = await response.json();

    if (response.ok) props.setValue("geofenceByTypes", data.geofenceByTypes);
    else props.setValue("geofenceByTypes", []);
  };

  return (
    <div style={{ height: "calc(100vh - 240px)", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key:
            GOOGEL_MAP_API_KEY +
            "&libraries=geometry&language=en&region=" +
            props.language,
        }}
        defaultCenter={props.defaultCenter}
        defaultZoom={props.defaultZoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          map.minZoom = 0;
          mapRef.current = map;
          // console.log("map : ", map)
          // setMap(map)
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
            <MapControlsCustom
              position={1}
              width="auto"
              map={map}
              hiddenButtons={["measure", "licensePlate"]}
              onToggleActive={(id, value) => {
                if (id === "geofences") loadGeofence(value);
              }}
            />

            <Geofences map={mapRef.current} />
          </>
        )}

        {console.log("data : ", data)}

        {get(data, "lat") && (
          <MarkerMap
            lat={data.lat}
            lng={data.lng}
            onClick={() => {}}
            markerType={"Inactived"}
            classType={data.class_type}
            course={data.course}
            status={data.status}
          />
        )}
      </GoogleMapReact>
    </div>
  );
};

// export default Map

const mapStateToProps = (state) => ({
  language: state.versatile.language,
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  detailEvent: state.maintenance.detailEvent,
  iconInactived: state.realtime.iconInactived,
  markerInfo: state.maintenance.markerInfo,
  mapType: state.maintenance.mapType,
  geofencesEnabled: state.maintenance.geofencesEnabled,
  defaultCenter: state.maintenance.defaultCenter,
  defaultZoom: state.maintenance.defaultZoom,
});
const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(MaintenanceActions.setValue(name, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);

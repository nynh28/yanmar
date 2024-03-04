import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RealtimeNewActions from "../../Redux/RealtimeNewRedux";
import SummaryActions from "../../Redux/SummaryNewRedux";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import "../RealtimeDashboard/Styles/custom.css";
import $ from "jquery";
import MapControl from "../../Components/GoogleMap/MapControl";
import MapControlsCustomNew from "../../Components/GoogleMap/MapControlsCustomNew";
import { FormLoading } from "../../components_new";

// # Import object on map
import Dashboard from "./Dashboard";
import Loading from "../RealtimeDashboard/Loading";
import {
  ENDPOINT_REALTIME_V2,
  GOOGEL_MAP_API_KEY,
  setBusinessPOI,
  getGeoServerUrl,
} from "../../Config/app-config";

const { get } = require("lodash");
const Marker = ({ children }) => children;
//#region Initial value
let _iconSize = 50;
let _tooltipButtom = 5;
let _timeLast = "";
let _stateMapControl = {
  legendEnabled: true,
  clusterEnabled: true,
  objectEnabled: false,
  fitObjectEnabled: false,
  mapType: "roadmap",
  geofencesEnabled: [],
  dashboardEnabled: false,
  licensePlateEnabled: false,
};
let displayDB = false;

//#endregion

const Map = () => {
  // Connect Redux
  const dispatch = useDispatch();
  const { setTempMapControl, getGeofenceByType } = RealtimeNewActions;
  const { setStateSummary } = SummaryActions;

  const language = useSelector((state) => state.versatile.language);
  const dataLogin = useSelector((state) => state.signin.dataLogin);
  const stateMapControl = useSelector(
    (state) => state.summaryNew.stateMapControl
  );
  const displayVehicle = useSelector(
    (state) => state.realtimeNew.displayVehicle
  );
  const defaultZoom = useSelector((state) => state.summaryNew.defaultZoom);
  const defaultCenter = useSelector((state) => state.summaryNew.defaultCenter);
  const pointData = useSelector((state) => state.summaryNew.pointData);
  const isLoading = useSelector((state) => state.summaryNew.isLoadingMap);

  // State
  const mapRef = useRef();
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(10);
  const [map, setMap] = useState(null);

  //#region  useEffect
  useEffect(() => {
    for (let index in pointData) {
      // console.log(pointData[index].geometry)
    }
  }, [pointData]);
  useEffect(() => {
    displayDB = stateMapControl.dashboardEnabled;
  }, []);

  useEffect(() => {
    _stateMapControl = stateMapControl;
  }, [stateMapControl]);

  let points = pointData;
  // console.log(pointData);
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 22, minZoom: 0 },
  });
  // console.log("clusters", clusters);
  //#endregion

  //#region  Set icon size
  if (mapRef.current) {
    let zoom = mapRef.current.getZoom();
    if (zoom < 15) {
      _iconSize = 50;
      _tooltipButtom = 5;
    } else if (zoom >= 15 && zoom <= 17) {
      _iconSize = 100;
      _tooltipButtom = 15;
    } else {
      _iconSize = 150;
      _tooltipButtom = 25;
    }
  }
  //#endregion

  const _onCollapseComponent = (value) => {
    let myibox2 = $(`#content-colaps`);
    myibox2.slideToggle(600);
  };

  const setStateMapControlChange = (stateNameList, value) => {
    let stateMapControl = JSON.parse(JSON.stringify(_stateMapControl));
    for (let index in stateNameList)
      stateMapControl[stateNameList[index]] = value;
    dispatch(setTempMapControl(stateMapControl));
  };

  let clusterDisable =
    displayVehicle && displayVehicle.length > 200 ? true : false;

  let disableButtons = [];
  if (clusterDisable) disableButtons.push("cluster");
  if (mapRef.current && mapRef.current.zoom <= 11)
    disableButtons.push("nameGeof");

  return (
    <FormLoading loading={isLoading}>
      <div style={{ marginTop: 6 }}>
        {/* <div id={"content-colaps"} style={{ backgroundColor: "#bac2c4", display: (displayDB ? 'block' : 'none') }}>
        <Dashboard onClick={(value) => {
          console.log(value)
          setPointData(value)
        }} />
      </div> */}

        <div style={{ height: "calc(100vh - 116px)" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key:
                GOOGEL_MAP_API_KEY +
                "&libraries=drawing,geometry,places&language=en&region=" +
                language,
            }}
            defaultCenter={defaultCenter}
            defaultZoom={defaultZoom}
            yesIWantToUseGoogleMapApiInternals
            // options={{ minZoom: 4, backgroundColor: '#000' }}
            onGoogleApiLoaded={({ map }) => {
              map.minZoom = 0;
              // console.log('map', map)
              mapRef.current = map;
              setMap(map);

              // GEOSERVER

              setBusinessPOI(map);
            }}
            onChange={({ zoom, bounds }) => {
              setZoom(zoom);
              setBounds([
                bounds.nw.lng,
                bounds.se.lat,
                bounds.se.lng,
                bounds.nw.lat,
              ]);
            }}
            onDrag={() => {}}
            onDragEnd={() => {}}
            onZoomAnimationStart={() => {}}
            onZoomAnimationEnd={() => {}}
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
                {/* MAP CONTROL OPTIONS */}
                <MapControlsCustomNew
                  map={map}
                  beforeCusBtn={[
                    {
                      id: "cluster",
                      title: "Cluster",
                      icon: "icon-layer-group",
                    },
                    {
                      id: "fitObjects",
                      title: "Fit Objects",
                      icon: "icon-expand",
                    },
                  ]}
                  afterCusBtn={[
                    {
                      id: "dashboard",
                      title: "Dashboard",
                      icon: "fa fa-pie-chart",
                    },
                  ]}
                  defaultActiveButtons={{}}
                  activeButtons={{
                    dashboard: stateMapControl.dashboardEnabled,
                    geofences: stateMapControl.geofencesEnabled,
                    cluster: stateMapControl.clusterEnabled,
                    nameGeof: stateMapControl.nameGeofEnabled,
                    licensePlate: stateMapControl.licensePlateEnabled,
                    fitObjects: stateMapControl.fitObjectEnabled,
                    mapType: stateMapControl.mapType,
                    traffic: stateMapControl.traffic,
                  }}
                  disableButtons={disableButtons}
                  hiddenButtons={[
                    "fitObjects",
                    "cluster",
                    "nameGeof",
                    "geofences",
                    "fullscreen",
                    "geofLicen",
                    "measure",
                    "dashboard",
                  ]}
                  onToggleActive={(id, value) => {
                    if (id === "cluster")
                      setStateMapControlChange(["clusterEnabled"], value);
                    else if (id === "geofences") {
                      // setStateMapControlChange(["geofencesEnabled"], value)
                      // dispatch(getGeofenceByType(value))
                    } else if (id === "nameGeof")
                      setStateMapControlChange(["nameGeofEnabled"], value);
                    else if (id === "licensePlate")
                      setStateMapControlChange(["licensePlateEnabled"], value);
                    else if (id === "dashboard") {
                      setStateMapControlChange(["dashboardEnabled"], value);
                    } else if (id === "info")
                      setStateMapControlChange(["legendEnabled"], value);
                    else if (id === "mapType")
                      setStateMapControlChange(["mapType"], value);
                    else if (id === "fitObjects") {
                    } else if (id === "traffic")
                      setStateMapControlChange(["traffic"], value);
                  }}
                />
              </>
            )}

            {/* MARKER CLUSTER */}
            {clusters.map((cluster) => {
              const [longitude, latitude] = cluster.geometry.coordinates;
              const { cluster: isCluster, point_count: pointCount } =
                cluster.properties;
              // console.log(latitude, longitude);

              if (isCluster) {
                let clusterSize = `${30 + (pointCount / points.length) * 40}px`;
                return (
                  <Marker
                    key={`cluster-${cluster.id}`}
                    lat={latitude}
                    lng={longitude}
                  >
                    <div
                      className="cluster-marker"
                      style={{
                        width: clusterSize,
                        height: clusterSize,
                      }}
                      onClick={() => {
                        const expansionZoom = Math.min(
                          supercluster.getClusterExpansionZoom(cluster.id),
                          20
                        );
                        mapRef.current.setZoom(expansionZoom);
                        mapRef.current.panTo({ lat: latitude, lng: longitude });
                      }}
                    >
                      {pointCount}
                    </div>
                  </Marker>
                );
              }

              return (
                (
                  <div className="div-marker">
                    <span style={{ fontSize: 12 }}>{pointData.chassis_no}</span>
                  </div>
                ),
                (
                  <Marker
                    key={`crime-${cluster.properties.id}`}
                    lat={latitude}
                    lng={longitude}
                    label={pointData.chassis_no}
                  >
                    <div className="div-marker">
                      <span style={{ fontSize: 12 }}>
                        {pointData.chassis_no}
                      </span>
                      <img
                        src={"../icons/MarkerYanmar/1-T-2.png"}
                        style={{
                          width: 30,
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    </div>
                  </Marker>
                )
              );
            })}
          </GoogleMapReact>
        </div>
      </div>
    </FormLoading>
  );
};

export default Map;

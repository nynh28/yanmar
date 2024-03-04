import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RealtimeNewActions from "../../Redux/RealtimeNewRedux";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import "./Styles/custom.css";
import $ from "jquery";
import MapControl from "../../Components/GoogleMap/MapControl";
import MapControlsCustomNew from "../../Components/GoogleMap/MapControlsCustomNew";

// # Import object on map
import Dashboard from "./Dashboard";
import FooterInfo from "./FooterInfo";
import ModalVideo from "./ModalVideo";
import OverlayPanelNew from "./OverlayPanelNew";
import Geofences from "./Objects/Geofences";
import Tail from "./Objects/Tail";
import Loading from "./Loading";
import { isEmpty } from "ramda";
import {
  ENDPOINT_BASE_URL_YNM2,
  GOOGEL_MAP_API_KEY,
  setBusinessPOI,
  getGeoServerUrl,
  YM_BASE_URL,
} from "../../Config/app-config";
import { getIconStatusPath } from "../../Functions/StatusColor";
import axios from "axios";

const { get } = require("lodash");
const Marker = ({ children }) => children;

const LT_UNKNOW = [0, 1, 4, 16, 17, 18, 19, 20, 21, 23, 24, 26, 27];

//#region Initial value
let eventMapActive = false;
let dataInitail = [];
let _iconSize = 50;
let _tooltipButtom = 5;
let _timeLast = "";
let _informationTemp = {};
let _firstLoad = false;
let _isZoomPan = false;
let timeoutTask = null;
let _markerFocus = "";
let _isZoomOfFocus = false;
let _stateMapControl = {
  legendEnabled: false,
  clusterEnabled: true,
  objectEnabled: false,
  fitObjectEnabled: false,
  mapType: "roadmap",
  geofencesEnabled: [],
  dashboardEnabled: false,
  licensePlateEnabled: false,
};
let isOnDragEnd = false;
let displayDB = false;
let listGeof = [];
//#endregion

const MarkerMap = (arg) => {
  let iconPath = getIconStatusPath(parseInt(arg.status));

  return (
    <Marker key={arg.key} lat={arg.lat} lng={arg.lng}>
      <div
        className="div-marker"
        style={{ cursor: "pointer" }}
        onClick={arg.onClick}
      >
        <span
          className="tooltipMarker"
          style={{
            bottom: arg.bottom,
            fontSize: 12,
            visibility:
              arg.licensePlateEnabled || arg.markerType == "Actived"
                ? "visible"
                : "hidden",
          }}
        >
          {arg.licenseplate}
        </span>

        <img
          className="marker-icon"
          src={iconPath}
          style={{ width: arg.iconSize }}
        />
      </div>
    </Marker>
  );
};

let controllerSignal = [];
const Map = () => {
  // Connect Redux
  const dispatch = useDispatch();
  const {
    setTempMapControl,
    getInformationMarker,
    getGeofenceByType,
    setInitialVehicles,
    setDefaultZoom,
    setFitBounds,
    setZoomPan,
    setFocus,
    setDefaultCenter,
    setStateReduxRealtime,
    setTimeLast,
    setValue,
  } = RealtimeNewActions;
  const language = useSelector((state) => state.versatile.language);
  const dataLogin = useSelector((state) => state.signin.dataLogin);
  const stateMapControl = useSelector(
    (state) => state.realtimeNew.stateMapControl
  );
  const displayVehicle = useSelector(
    (state) => state.realtimeNew.displayVehicle
  );
  const information = useSelector((state) => state.realtimeNew.information);
  const defaultZoom = useSelector((state) => state.realtimeNew.defaultZoom);
  const isFitBounds = useSelector((state) => state.realtimeNew.isFitBounds);
  const isZoomPan = useSelector((state) => state.realtimeNew.isZoomPan);
  const isFocus = useSelector((state) => state.realtimeNew.isFocus);
  const defaultCenter = useSelector((state) => state.realtimeNew.defaultCenter);
  const initialVehiclesData = useSelector(
    (state) => state.realtimeNew.initialVehiclesData
  );
  const timeLast = useSelector((state) => state.realtimeNew.timeLast);
  const isFocusPanTo = useSelector((state) => state.realtimeNew.isFocusPanTo);
  const isFilterInteractiveDashboard = useSelector(
    (state) => state.realtimeNew.isFilterInteractiveDashboard
  );

  // State
  const mapRef = useRef();
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(10);
  const [pointData, setPointData] = useState([]);
  const [map, setMap] = useState(null);
  const [requestWorking, setRequestWorking] = useState(false);
  //#region  useEffect

  useEffect(() => {
    // console.log('useEffect => display:', stateMapControl.dashboardEnabled)
    displayDB = stateMapControl.dashboardEnabled;
  }, []);
  useEffect(() => {
    isOnDragEnd = false;
    _isZoomOfFocus = false;
    information && updateDataInitial(JSON.parse(JSON.stringify(information)));
  }, [information]);

  // useEffect(() => {
  //   if (isFocus) setFocusMarker()
  // }, [isFocus])

  useEffect(() => {
    // console.log("isFocusPanTo : ", isFocusPanTo)
    if (isFocusPanTo.visible) {
      if (mapRef.current) {
        mapRef.current.panTo(isFocusPanTo.location);
        mapRef.current.setZoom(17);
        // dispatch(setFocus(false))
        dispatch(
          setValue("isFocusPanTo", {
            visible: false,
            location: { lat: 0, lng: 0 },
          })
        );
      }
    }
  }, [isFocusPanTo]);

  useEffect(() => {}, [isFitBounds]);

  // useEffect(() => {
  //   _isZoomPan = isZoomPan
  //   if (_isZoomPan) setZoomPanMarker()
  // }, [isZoomPan])

  useEffect(() => {
    _stateMapControl = stateMapControl;
  }, [stateMapControl]);

  useEffect(() => {
    _timeLast = timeLast;
  }, [timeLast]);

  useEffect(() => {
    // !_firstLoad ? loadRealtimeInitial() : loadRealtimeLast()
    if (!_firstLoad) {
      if (initialVehiclesData.length > 0) {
        let data = JSON.parse(JSON.stringify(initialVehiclesData));
        dataInitail = [...data];
        setPointData([...data]);
        countdownUpdate();
      } else {
        loadRealtimeInitial();
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      // componentWillUnmount
      // cancleFetchApi();
      dispatch(setValue("isLoadInfo", false));
      timeoutTask !== null && clearTimeout(timeoutTask);
      dispatch(
        setStateReduxRealtime({
          tailMarker: [],
          isFilterInteractiveDashboard: false,
        })
      );
      setStateMapControlChange(["legendEnabled"], true);
      _firstLoad = false;
    };
  }, []);

  const cancleFetchApi = () => {
    controllerSignal.forEach((controller) => {
      if (!controller.signal.aborted) controller.abort();
    });
  };

  //#endregion

  const countdownUpdate = () => {
    // timeoutTask = setTimeout(loadRealtimeLast, intervalTime)
    timeoutTask = setTimeout(loadRealtimeLast, 20000);
  };

  const loadRealtimeInitial = async () => {
    // console.log(">> loadRealtimeInitial")
    // cancleFetchApi();
    setRequestWorking(true);
    // Load data initial
    if (!eventMapActive) {
      _firstLoad = true;
      try {
        dispatch(setStateReduxRealtime({ vehiclesLoading: true }));
        const controller = new AbortController();
        let signal = controller.signal;
        controllerSignal.push(controller);
        // var response = await fetch(ENDPOINT_REALTIME_V2 + "fleet/V2/Realtime?user_id=" + dataLogin.userId + "&gzip_status=True", {
        var response = await fetch(
          `${YM_BASE_URL}fleet/dlt/excavator/realtime1?user_id=${dataLogin.userId}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            signal,
          }
        );

        if (get(document, "location.hash") !== "#/realtime") return;

        _timeLast = new Date().toISOString().split(".")[0];
        dispatch(setTimeLast(_timeLast));

        var data = await response.json();
        // var data2 = await response2.json();

        // console.log("loadRealtimeInitial : ", data)
        if (!isEmpty(data)) {
          let dataVehicles = get(data, "sidebar", []);
          // let { dash_count_bar, dash_behaviour_bar, maintenance_status } =
          //   data2;

          dataInitail = [...dataVehicles];
          setPointData([...dataVehicles]);
          dispatch(setInitialVehicles([...dataVehicles]));
          // dispatch(
          //   setStateReduxRealtime({
          //     dashboardSummary: {
          //       dash_count_bar,
          //       dash_behaviour_bar,
          //       maintenance_status,
          //     },
          //   })
          // );
          loadRealtimeInitialDash();
        } else {
          dispatch(setInitialVehicles([]));
        }
        dispatch(setStateReduxRealtime({ vehiclesLoading: false }));
        setRequestWorking(false);
      } catch (error) {
        dispatch(setInitialVehicles([]));
        setRequestWorking(false);
      }
    }
    countdownUpdate();
  };

  const loadRealtimeInitialDash = async () => {
    // console.log(">> loadRealtimeInitial")
    // cancleFetchApi();
    // setRequestWorking(true);
    // Load data initial
    if (!eventMapActive) {
      _firstLoad = true;
      try {
        dispatch(setStateReduxRealtime({ vehiclesLoading: true }));
        const controller = new AbortController();
        let signal = controller.signal;
        controllerSignal.push(controller);
        // var response = await fetch(ENDPOINT_REALTIME_V2 + "fleet/V2/Realtime?user_id=" + dataLogin.userId + "&gzip_status=True", {
        var response = await fetch(
          `${YM_BASE_URL}fleet/dlt/excavator/realtime2?user_id=${dataLogin.userId}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            signal,
          }
        );

        if (get(document, "location.hash") !== "#/realtime") return;

        _timeLast = new Date().toISOString().split(".")[0];
        dispatch(setTimeLast(_timeLast));

        var data = await response.json();

        // console.log("loadRealtimeInitial : ", data)
        if (!isEmpty(data)) {
          // let dataVehicles = get(data, "sidebar", []);
          let { dash_count_bar, dash_behaviour_bar, maintenance_status } = data;

          // dataInitail = [...dataVehicles];
          // setPointData([...dataVehicles]);
          // dispatch(setInitialVehicles([...dataVehicles]));
          dispatch(
            setStateReduxRealtime({
              dashboardSummary: {
                dash_count_bar,
                dash_behaviour_bar,
                maintenance_status,
              },
            })
          );
        } else {
          // dispatch(setInitialVehicles([]));
        }
        // setRequestWorking(false);
      } catch (error) {
        // dispatch(setInitialVehicles([]));
        // setRequestWorking(true);
      }
    }
    // countdownUpdate();
  };

  const loadRealtimeLast = async () => {
    if (!eventMapActive && !requestWorking) {
      cancleFetchApi();

      try {
        const controller = new AbortController();
        let signal = controller.signal;
        controllerSignal.push(controller);
        // var response = await fetch(ENDPOINT_REALTIME + "fleet/GunicornRealtime?user_id=" + dataLogin.userId + "&last_call=" + _timeLast + "&gzip_status=True", {
        // var response = await fetch(ENDPOINT_REALTIME_V2 + "fleet/V2/Realtime?user_id=" + dataLogin.userId + "&last_call=" + _timeLast + "&gzip_status=True", {
        axios
          .get(
            `${YM_BASE_URL}fleet/dlt/excavator/realtime1?user_id=${dataLogin.userId}&last_call=${_timeLast}`
          )
          .then((res) => {
            var data = res.data;
            _timeLast = new Date().toISOString().split(".")[0];
            dispatch(setTimeLast(_timeLast));

            if (!isEmpty(data)) {
              // loadRealtimeExtend(false, data, dataLogin.userId)
              let dataVehicles = get(data, "sidebar", []);
              // let { dash_count_bar, dash_behaviour_bar, maintenance_status } =
              //   data;

              let _newDataInitail = [...dataInitail];
              // console.log("dataVehicles : ", dataVehicles)
              //#region อัพเดท Data initail
              for (let index in dataVehicles) {
                // update data initial
                let idx = _newDataInitail.findIndex(
                  (x) => x.vid === dataVehicles[index].vid
                );
                _newDataInitail[idx] = dataVehicles[index];

                //#region ถ้ารถ focus อยู่ และมีข้อมูลอัพเดทของคันที่ focus ให้ดึง api information แล้วอัพเดทข้อมูล initial ด้วย

                // if (_informationTemp.info) {
                //   console.log("_informationTemp : ", _informationTemp)
                // }
                if (
                  _informationTemp.info &&
                  _informationTemp.info.vid == dataVehicles[index].vid
                ) {
                  dispatch(setValue("isLoadInfo", true));
                  setTimeout(() => {
                    dispatch(
                      getInformationMarker(dataVehicles[index].vid, "Mqtt")
                    );
                  }, 200);
                }
                //#endregion
              }
              //#endregion

              dataInitail = [..._newDataInitail];
              setPointData([..._newDataInitail]);
              dispatch(setInitialVehicles([..._newDataInitail]));
              // dispatch(
              //   setStateReduxRealtime({
              //     dashboardSummary: {
              //       dash_count_bar,
              //       dash_behaviour_bar,
              //       maintenance_status,
              //     },
              //   })
              // );
              loadRealtimeLast2();
            }
            if (window.location.hash === "#/realtime") countdownUpdate();
          });

        // var response = await fetch(
        //   `https://192.168.3.45:5001/prod/fleet/dlt/excavator/realtime?user_id=${dataLogin.userId}&last_call=${_timeLast}`,
        //   {
        //     method: "GET",
        //     headers: {
        //       Accept: "application/json",
        //       "Content-Type": "application/json",
        //     },
        //     signal,
        //   }
        // );
      } catch (error) {
        if (window.location.hash === "#/realtime") countdownUpdate();
        else timeoutTask !== null && clearTimeout(timeoutTask);
      }
    }
  };
  const loadRealtimeLast2 = async () => {
    if (!eventMapActive && !requestWorking) {
      cancleFetchApi();

      try {
        const controller = new AbortController();
        let signal = controller.signal;
        controllerSignal.push(controller);
        // var response = await fetch(ENDPOINT_REALTIME + "fleet/GunicornRealtime?user_id=" + dataLogin.userId + "&last_call=" + _timeLast + "&gzip_status=True", {
        // var response = await fetch(ENDPOINT_REALTIME_V2 + "fleet/V2/Realtime?user_id=" + dataLogin.userId + "&last_call=" + _timeLast + "&gzip_status=True", {
        axios
          .get(
            `${YM_BASE_URL}fleet/dlt/excavator/realtime2?user_id=${dataLogin.userId}&last_call=${_timeLast}`
          )
          .then((res) => {
            var data = res.data;
            _timeLast = new Date().toISOString().split(".")[0];
            dispatch(setTimeLast(_timeLast));

            if (!isEmpty(data)) {
              // loadRealtimeExtend(false, data, dataLogin.userId)
              // let dataVehicles = get(data, "sidebar", []);
              let { dash_count_bar, dash_behaviour_bar, maintenance_status } =
                data;

              // let _newDataInitail = [...dataInitail];
              // //#region อัพเดท Data initail
              // for (let index in dataVehicles) {
              //   // update data initial
              //   let idx = _newDataInitail.findIndex(
              //     (x) => x.vid === dataVehicles[index].vid
              //   );
              //   _newDataInitail[idx] = dataVehicles[index];

              //   //#region ถ้ารถ focus อยู่ และมีข้อมูลอัพเดทของคันที่ focus ให้ดึง api information แล้วอัพเดทข้อมูล initial ด้วย
              //   if (
              //     _informationTemp.info &&
              //     _informationTemp.info.vid == dataVehicles[index].vid
              //   ) {
              //     dispatch(getInformationMarker(currentData[index].info.vid, 'Mqtt'))

              //     dispatch(setValue("isLoadInfo", true));
              //     setTimeout(() => {
              //       dispatch(
              //         getInformationMarker(dataVehicles[index].vid, "Mqtt")
              //       );
              //     }, 200);
              //   }
              //   //#endregion
              // }
              //#endregion

              // dataInitail = [..._newDataInitail];
              // setPointData([..._newDataInitail]);
              // dispatch(setInitialVehicles([..._newDataInitail]));
              dispatch(
                setStateReduxRealtime({
                  dashboardSummary: {
                    dash_count_bar,
                    dash_behaviour_bar,
                    maintenance_status,
                  },
                })
              );
            }
            // if (window.location.hash === "#/realtime") countdownUpdate();
          });

        // var response = await fetch(
        //   `https://192.168.3.45:5001/prod/fleet/dlt/excavator/realtime?user_id=${dataLogin.userId}&last_call=${_timeLast}`,
        //   {
        //     method: "GET",
        //     headers: {
        //       Accept: "application/json",
        //       "Content-Type": "application/json",
        //     },
        //     signal,
        //   }
        // );
      } catch (error) {
        // if (window.location.hash === "#/realtime") countdownUpdate();
        // else timeoutTask !== null && clearTimeout(timeoutTask);
      }
    }
  };

  const updateDataInitial = (data) => {
    // console.log("updateDataInitial : ", data)
    if (!get(data, "infoExtend")) return;

    let _newDataInitail = [...dataInitail];
    let idx = _newDataInitail.findIndex((x) => x.vid === data.info.vid);

    if (idx >= 0) {
      _newDataInitail[idx].lat = data.gps.lat;
      _newDataInitail[idx].lng = data.gps.lng;
      _newDataInitail[idx].status = data.infoExtend.status;
      _newDataInitail[idx].vehicle_name = data.info.vehicle_name;
      _newDataInitail[idx].engine_hour =
        parseFloat(data.infoExtend.engine_hour) * 60;

      dataInitail = [..._newDataInitail];
      setPointData([..._newDataInitail]);
      dispatch(setInitialVehicles([..._newDataInitail]));
    }
  };

  //#region Check condition point

  _informationTemp = information;
  let data = [];

  for (let index in pointData) {
    let {
      vid,
      lat,
      lng,
      vehicle_type_id,
      status,
      course,
      licenseplate,
      vehicle_name,
      vin_no,
      sleep_mode,
    } = pointData[index];
    let found = true;
    displayVehicle !== null && (found = displayVehicle.includes(vid));

    //#region ทำลบที่ตรงกับ info
    if (!isEmpty(information) && vid == information.vid) found = false;

    //#endregion

    // FILTER DATA IN BOUNDS
    let insideBounds = true;

    // if (mapRef.current) {
    //   const bd = mapRef.current.getBounds();
    //   var latlng = new window.google.maps.LatLng(lat, lng);
    //   if (bd.contains(latlng))
    //     insideBounds = true
    //   else
    //     insideBounds = false
    // }

    if (found && insideBounds) {
      data.push({
        category: "anti-social-behaviour",
        location_type: "Force",
        location: {
          latitude: lat,
          longitude: lng,
          street: {
            id: vid,
            name: "On or near Shopping Area",
          },
        },
        context: "",
        outcome_status: null,
        persistent_id: "",
        id: vid,
        location_subtype: "",
        month: "2019-10",
        image: {
          class_type: vehicle_type_id,
          status: status,
          course: course,
        },
        vid: vid,
        licenseplate: licenseplate,
        vehicle_name: vehicle_name,
        vin_no: vin_no,
        sleep_mode: sleep_mode || "0",
      });
    }
  }

  let points = [];
  for (let idx in data) {
    let dt = data[idx];
    let { latitude, longitude } = dt.location;
    let insideBounds = false;
    if (mapRef.current) {
      const bd = mapRef.current.getBounds();
      var latlng = new window.google.maps.LatLng(latitude, longitude);
      if (bd.contains(latlng)) insideBounds = true;
    }

    if (insideBounds) {
      points.push({
        type: "Feature",
        properties: { cluster: false, markId: dt.id },
        geometry: {
          type: "Point",
          coordinates: [
            parseFloat(dt.location.longitude),
            parseFloat(dt.location.latitude),
          ],
        },
        image: {
          class_type: dt.image.class_type,
          status: dt.image.status,
          course: dt.image.course,
        },
        vid: dt.vid,
        licenseplate: dt.licenseplate,
        vehicle_name: dt.vehicle_name,
        vin_no: dt.vin_no,
        sleep_mode: dt.sleep_mode,
      });
    }
  }

  let clusterDisable = data.length > 100 ? true : false;

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, minPoints: 2, maxZoom: 22 },
  });
  //#endregion

  //#region  Fit Bounds
  const fitBounds = () => {
    if (mapRef.current && isFilterInteractiveDashboard) {
      let bounds = new window.google.maps.LatLngBounds();
      for (let index in data) {
        bounds.extend({
          lat: data[index].location.latitude,
          lng: data[index].location.longitude,
        });
      }
      mapRef.current.fitBounds(bounds);
      // dispatch(setFitBounds(false))

      dispatch(setStateReduxRealtime({ isFilterInteractiveDashboard: false }));
    }
  };
  fitBounds();
  //#endregion

  //#region Set Zoom Pan
  const setZoomPanMarker = () => {
    if (mapRef.current && _informationTemp.info) {
      eventMapActive = true;
      mapRef.current.panTo({
        lat: information.lat,
        lng: information.lng,
      });
      mapRef.current.setZoom(17);
      // setSmoothZoom(mapRef.current, 17, mapRef.current.getZoom())   // เอาออกก่อน เพราะดูจากเครื่องลูกค้า มันดูเหมื่อนช้า
      dispatch(setZoomPan(false));
      _markerFocus = information.vid;
      eventMapActive = false;
    } else {
      dispatch(setZoomPan(false));
    }
  };

  const setSmoothZoom = (map, level, cnt) => {
    if (cnt > level) {
      cnt -= 1;
      setTimeout(() => {
        map.setZoom(cnt);
        setSmoothZoom(map, level, cnt);
      }, 80);
    } else if (cnt < level) {
      cnt += 1;
      setTimeout(() => {
        map.setZoom(cnt);
        setSmoothZoom(map, level, cnt);
      }, 80);
    } else {
      return;
    }
  };
  //#endregion

  //#region Focus Marler
  const setFocusMarker = () => {
    if (mapRef.current && isFocus && _informationTemp.info) {
      if (!isOnDragEnd && !_isZoomOfFocus) {
        mapRef.current.panTo({
          lat: _informationTemp.gps.lat,
          lng: _informationTemp.gps.lng,
        });
        dispatch(setFocus(false));
      }
    }
  };
  //#endregion

  //#region  Set icon size
  if (mapRef.current) {
    let zoom = mapRef.current.getZoom();
    if (zoom < 15) {
      _iconSize = 30;
      _tooltipButtom = 5;
    } else if (zoom >= 15 && zoom <= 17) {
      _iconSize = 50;
      _tooltipButtom = 15;
    } else {
      _iconSize = 75;
      _tooltipButtom = 25;
    }
  }
  //#endregion

  const _onCollapseComponent = (value) => {
    // console.log("_onCollapseComponent : ", value)

    let myibox2 = $(`#content-colaps`);
    myibox2.slideToggle(600);
  };

  const setStateMapControlChange = (stateNameList, value) => {
    let stateMapControl = JSON.parse(JSON.stringify(_stateMapControl));
    for (let index in stateNameList)
      stateMapControl[stateNameList[index]] = value;
    dispatch(setTempMapControl(stateMapControl));
  };

  const setActiceMarker = (information) => {
    // if (_markerFocus !== "" && get(information, 'info.vid') == _markerFocus) {
    //   setFocusMarker()
    // }
    return (
      <MarkerMap
        key={get(information, "info.vid")}
        lat={get(information, "infoExtend.lat")}
        lng={get(information, "infoExtend.lng")}
        bottom={_tooltipButtom}
        licensePlateEnabled={_stateMapControl.licensePlateEnabled}
        licenseplate={
          get(information, "info.vehicle_name", "") !== ""
            ? get(information, "info.vehicle_name")
            : get(information, "info.licenseplate", "") !== ""
            ? get(information, "info.licenseplate")
            : get(information, "info.vin_no")
        }
        markerType={"Actived"}
        classType={get(information, "info.vehicle_type_id")}
        status={get(information, "infoExtend.status")}
        iconSize={_iconSize}
        course={get(information, "gps.image.course")}
        sleep_mode={get(information, "gps.sleep_mode", "0")}
      />
    );
  };

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

  let disableButtons = [];
  if (mapRef.current && mapRef.current.zoom <= 11)
    disableButtons.push("nameGeof");
  // console.log("RENDER : ", points)

  return (
    <div style={{ marginTop: 6 }}>
      <Loading />
      <div
        id={"content-colaps"}
        style={{
          backgroundColor: "#bac2c4",
          display: displayDB ? "block" : "none",
        }}
      >
        <Dashboard />
      </div>

      <div style={{ height: "calc(100vh - 71px)", width: "100%" }}>
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
            var overlayImageMaps = [
              {
                getTileUrl: function (coord, zoom) {
                  return (
                    getGeoServerUrl("v_hino_dealer") +
                    "&zoom=" +
                    zoom +
                    "&x=" +
                    coord.x +
                    "&y=" +
                    coord.y +
                    "&format=image/png"
                  );
                },
                tileSize: new window.google.maps.Size(256, 256),
                opacity: 0.7,
                isPng: true,
              },
            ];
            // var overlayMap = new window.google.maps.ImageMapType(overlayImageMaps[0]);
            // mapRef.current.overlayMapTypes.setAt(0, overlayMap)

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
          onDrag={() => {
            isOnDragEnd = true;
            eventMapActive = true;
          }}
          onDragEnd={() => {
            eventMapActive = false;
            checkLocationInBound();
            setStateMapControlChange(["fitObjectEnabled"], false);
            dispatch(setFocus(false));
          }}
          onZoomAnimationStart={() => {
            eventMapActive = true;
            _isZoomOfFocus = true;
          }}
          onZoomAnimationEnd={() => {
            eventMapActive = false;
            checkLocationInBound();
            let zoom = mapRef.current.getZoom();
            dispatch(setDefaultZoom(zoom));
            !_informationTemp.info &&
              dispatch(
                setDefaultCenter(
                  mapRef.current.getCenter().lat(),
                  mapRef.current.getCenter().lng()
                )
              );
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
              {/* MAP CONTROL OPTIONS */}
              {/* {console.log('_stateMapControl.dashboardEnabled', _stateMapControl.dashboardEnabled)} */}
              <MapControlsCustomNew
                map={map}
                beforeCusBtn={[
                  { id: "cluster", title: "Cluster", icon: "icon-layer-group" },
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
                  { id: "info", title: "Info", icon: "fa fa-info-circle" },
                ]}
                defaultActiveButtons={{ info: false }}
                activeButtons={{
                  dashboard: stateMapControl.dashboardEnabled,
                  geofences: stateMapControl.geofencesEnabled,
                  cluster: stateMapControl.clusterEnabled,
                  nameGeof: stateMapControl.nameGeofEnabled,
                  licensePlate: stateMapControl.licensePlateEnabled,
                  fitObjects: false,
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
                  "info",
                ]}
                onToggleActive={(id, value) => {
                  if (id === "dashboard") {
                    setStateMapControlChange(["dashboardEnabled"], value);
                    _onCollapseComponent(value);
                  } else if (id === "mapType")
                    setStateMapControlChange(["mapType"], value);
                  else if (id === "traffic")
                    setStateMapControlChange(["traffic"], value);
                }}
              />

              {/* VEHICLES LIST PANEL */}
              <MapControl
                position={7}
                map={map}
                id={"overlay-panel"}
                width="auto"
              >
                <OverlayPanelNew />
              </MapControl>

              {/* GEOFENCES */}
              <Geofences
                map={mapRef.current}
                setListIconGeof={(list) => {
                  listGeof = list;
                  checkLocationInBound();
                }}
              />

              {/* FOOTER INFORMATION */}
              <MapControl position={9} map={map} id={"footer-info"}>
                <FooterInfo />
              </MapControl>

              {/* MODAL VIDEO */}
              {/* {dataLogin.userId === 36 && <MapControl position={5} map={map} id={'layout-modal-video'} width='auto'>
                <ModalVideo />
              </MapControl>} */}

              {/* MODAL VIDEO TEST*/}
              {
                <MapControl
                  position={5}
                  map={map}
                  id={"layout-modal-video"}
                  width="auto"
                >
                  <ModalVideo />
                </MapControl>
              }

              {/* POLY LINE > แสดงเมื่อ focus marker */}
              <Tail map={mapRef.current} />
            </>
          )}

          {/* Marker Actice */}

          {!isEmpty(information) && setActiceMarker(information)}

          {/* MARKER CLUSTER */}
          {clusterDisable
            ? clusters.map((cluster) => {
                let class_type = "",
                  status = 0,
                  course = "";

                if (cluster.image) {
                  class_type = cluster.image.class_type;
                  status = cluster.image.status;
                  course = cluster.image.course;
                }

                let _licenseplate = get(cluster, "vehicle_name");
                if (_licenseplate == "")
                  _licenseplate = get(cluster, "licenseplate");
                if (_licenseplate == "") _licenseplate = get(cluster, "vin_no");

                const [longitude, latitude] = cluster.geometry.coordinates;
                const { cluster: isCluster, point_count: pointCount } =
                  cluster.properties;

                if (isCluster) {
                  return (
                    <Marker
                      key={`cluster-${cluster.id}`}
                      // key={`cluster-${cluster.vid}`}
                      lat={latitude}
                      lng={longitude}
                    >
                      <div
                        className="cluster-marker"
                        style={{
                          width: `${30 + (pointCount / points.length) * 40}px`,
                          height: `${30 + (pointCount / points.length) * 40}px`,
                          transform: "translate(-50%, -50%)",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          const expansionZoom = Math.min(
                            supercluster.getClusterExpansionZoom(cluster.id),
                            22
                          );

                          mapRef.current.setZoom(expansionZoom + 2);
                          mapRef.current.panTo({
                            lat: latitude,
                            lng: longitude,
                          });
                        }}
                      >
                        {pointCount}
                      </div>
                    </Marker>
                  );
                }

                return (
                  <MarkerMap
                    // key={cluster.id}
                    key={cluster.vid}
                    lat={latitude}
                    lng={longitude}
                    onClick={() => {
                      // dispatch(getInformationMarker(cluster.vid, 'Marker'))
                      dispatch(setValue("isLoadInfo", true));
                      setTimeout(() => {
                        dispatch(getInformationMarker(cluster.vid, "Marker"));
                      }, 200);
                      _markerFocus = cluster.vid;
                    }}
                    bottom={_tooltipButtom}
                    licensePlateEnabled={stateMapControl.licensePlateEnabled}
                    licenseplate={_licenseplate}
                    markerType={"Inactived"}
                    classType={class_type}
                    status={status}
                    iconSize={_iconSize}
                    course={course}
                    sleep_mode={cluster.sleep_mode}
                  />
                );
              })
            : points.map((cluster, index) => {
                const [longitude, latitude] = cluster.geometry.coordinates;
                if (mapRef.current) {
                  const bd = mapRef.current.getBounds();
                  var latlng = new window.google.maps.LatLng(
                    latitude,
                    longitude
                  );
                  if (!bd.contains(latlng)) return;
                }

                let class_type = "",
                  status = 0,
                  course = "";

                if (cluster.image) {
                  class_type = cluster.image.class_type;
                  status = cluster.image.status;
                  course = cluster.image.course;
                }

                let _licenseplate = get(cluster, "vehicle_name");
                if (_licenseplate == "")
                  _licenseplate = get(cluster, "licenseplate");
                if (_licenseplate == "") _licenseplate = get(cluster, "vin_no");

                // let markerType = "Inactived"
                // if (_markerFocus !== "" && cluster.vid == _markerFocus) {
                //   markerType = "Actived"
                //   setFocusMarker()
                // }

                return (
                  <MarkerMap
                    // key={cluster.id}
                    key={cluster.vid}
                    lat={latitude}
                    lng={longitude}
                    onClick={() => {
                      // dispatch(getInformationMarker(cluster.vid, 'Marker'))

                      dispatch(setValue("isLoadInfo", true));
                      setTimeout(() => {
                        dispatch(getInformationMarker(cluster.vid, "Marker"));
                      }, 200);
                      _markerFocus = cluster.vid;
                    }}
                    bottom={_tooltipButtom}
                    licensePlateEnabled={stateMapControl.licensePlateEnabled}
                    licenseplate={_licenseplate}
                    markerType={"Inactived"}
                    classType={class_type}
                    status={status}
                    iconSize={_iconSize}
                    course={course}
                    sleep_mode={cluster.sleep_mode}
                  />
                );
              })}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;

import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ControlRoomDealerActions from "../../Redux/ControlRoomDealerRedux";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import "./Styles/custom.css";
import $ from "jquery";
import MapControl from "../../Components/GoogleMap/MapControl";
import MapControlsCustomNew from "../../Components/GoogleMap/MapControlsCustomNew";
import { momentDate } from "../../Functions/DateMoment";
// # Import object on map
import FooterInfo from "./FooterInfo";
import OverlayPanel from "./OverlayPanel";
import Geofences from "./Objects/Geofences";
import moment from "moment";
import {
  getGeoServerUrl,
  GOOGEL_MAP_API_KEY,
  ENDPOINT_BASE_URL,
  ENDPOINT_REALTIME_V2,
  setBusinessPOI,
  ENDPOINT_BASE_URL_YNM4,
} from "../../Config/app-config";
import { get, isEmpty } from "lodash";
import { t } from "../../Components/Translation";
import { numberWithComma } from "../../Functions/Calculation";
import {
  getIconStatusPath,
  getIconStatusPathTractor,
} from "../../Functions/StatusColor";

const Marker = ({ children }) => children;
const LT_UNKNOW = [0, 1, 4, 16, 17, 18, 19, 20, 21, 23, 24, 26, 27];
const MAXTOTAL = 300;

//#region Initial value
// let eventMapActive = false
// let dataInitail = []
// let intervalTime = 0
// let RangeInterval = [
//   {
//     min: 300,
//     max: 6000,
//     interval: 10000
//   },
//   {
//     min: 6001,
//     max: 80000,
//     interval: 15000
//   }
// ]
let _iconSize = 50;
let _tooltipButtom = 5;
// let _timeLast = ""
// let _informationTemp = {}
// let _firstLoad = false
// let _isZoomPan = false
// let _isFocus = false
// let timeoutTask = null
let _markerFocus = "";
let _isZoomOfFocus = false;
let _stateMapControl = {
  legendEnabled: true,
  clusterEnabled: true,
  objectEnabled: false,
  fitObjectEnabled: false,
  mapType: "roadmap",
  geofencesEnabled: [],
  dashboardEnabled: true,
  licensePlateEnabled: false,
};
let isOnDragEnd = false;
let isFitBounds = false;
let firstLoad = true;
let fromMarker = false;
//#endregion

const statusCar = (device) => {
  let status = 4;
  let acc = get(device, "acc", "");
  let speed = get(device, "speed", 0);
  let speed_limit = get(device, "speed_limit", 0);
  let gpsdate = momentDate(get(device, "gpsdate"));
  let OverRPM = get(device, "alarm.OverRPM", 0);

  if (
    !moment(gpsdate, "DD/MM/YYYY HH:mm:ss").isAfter(
      moment().subtract(15, "minutes")
    )
  )
    status = 4;
  else if (acc === "t") {
    if (speed_limit > 0 && speed > speed_limit) status = 5;
    else if (speed <= 2) status = 3;
    else status = 1;
  } else {
    status = 2;
  }
  return status;
};

const MarkerMap = (arg) => {
  let iconPath = getIconStatusPathTractor(parseInt(arg.status));
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

const Map = (props) => {
  // Connect Redux

  const dispatch = useDispatch();
  // const {
  //   setTempMapControl,
  //   setInformation,
  //   setClusterEnabled,
  //   setStatesContorlRoomDealerRedux
  // } = ControlRoomActions
  const {
    setTempMapControl,
    setInformation,
    setClusterEnabled,
    setVid,
    setStatesContorlRoomDealerRedux,
  } = ControlRoomDealerActions;

  const language = useSelector((state) => state.versatile.language);
  const dataLogin = useSelector((state) => state.signin.dataLogin);
  const header = useSelector((state) => state.signin.header);
  const informationCR = useSelector(
    (state) => state.controlroomdealer.informationCR
  );
  const statusSubmit = useSelector((state) => state.subscription.statusSubmit);
  const searchData = useSelector((state) => state.controlroomdealer.searchData);
  const select = useSelector((state) => state.controlroomdealer.select);
  const vid = useSelector((state) => state.controlroomdealer.vid);
  const auto = useSelector((state) => state.controlroomdealer.auto);
  // const zoom = useSelector(state => state.controlroomdealer.zoom);
  const displayVehicle = useSelector(
    (state) => state.controlroomdealer.displayVehicle
  );
  const initialVehiclesDataSI = useSelector(
    (state) => state.controlroomdealer.initialVehiclesDataSI
  );
  const geofencesEnabled = useSelector(
    (state) => state.controlroomdealer.geofencesEnabled
  );
  const clusterEnabled = useSelector(
    (state) => state.controlroomdealer.clusterEnabled
  );

  // useEffect(() => {
  //   _isZoomPan = isZoomPan
  //   if (_isZoomPan) setZoomPanMarker()
  // }, [isZoomPan])
  // const information = useSelector(state => state.controlroom.information);
  // const geofencesEnabled = useSelector(state => state.controlroom.geofencesEnabled);
  // const initialVehiclesDataSI = useSelector(state => state.controlroom.initialVehiclesDataSI);
  // const clusterEnabled = useSelector(state => state.controlroom.clusterEnabled);

  // State
  const mapRef = useRef();
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(10);
  const [pointData, setPointData] = useState([]);
  const [map, setMap] = useState(null);
  const [defaultCenter, setDefaultCenter] = useState({
    lat: 13.786377,
    lng: 100.608755,
  });
  const [defaultZoom, setDefaultZoom] = useState(5);
  // const [clusterEnabled, setClusterEnabled] = useState(true);

  //#region  useEffect
  useEffect(() => {
    if (fromMarker) {
      fromMarker = false;
    } else if (map && !isEmpty(informationCR)) {
      let lat = informationCR.lat;
      let lng = informationCR.lng;
      map.setZoom(17);
      map.panTo({ lat, lng });
    }
  }, [informationCR, map]);

  useEffect(() => {
    // console.log('initialVehiclesDataSI', firstLoad, initialVehiclesDataSI)
    // if (firstLoad) firstLoad = false
    if (!isEmpty(initialVehiclesDataSI)) {
      isFitBounds = true;
      fitBounds(initialVehiclesDataSI);
    } else if (!isEmpty(informationCR)) {
      isFitBounds = true;
      fitBounds(initialVehiclesDataSI, true);
    }
    // map
  }, [initialVehiclesDataSI]);

  // componentWillUnmount
  useEffect(() => {
    return () => {
      // componentWillUnmount
      if (!firstLoad) {
        firstLoad = true;
        if (initialVehiclesDataSI.length > 0) {
          let data = JSON.parse(JSON.stringify(initialVehiclesDataSI));
          // dataInitail = [...data];
          setPointData([...data]);
        }
      }
      console.log([...data]);

      dispatch(setInformation({}));
    };
  }, []);

  //#endregion

  //#region Check condition point

  // _informationTemp = information
  let data = [];
  console.log(pointData);
  for (let index in initialVehiclesDataSI) {
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
    } = initialVehiclesDataSI[index];
    let found = true;
    displayVehicle !== null && (found = displayVehicle.includes(vid));

    //#region กรณี focus อยู่ให้แสดง Marker
    // if (information.info && mapRef.current && pointData[index].info.vid == information.info.vid) {
    //   found = true
    //   _markerFocus = pointData[index].info.vid
    // }
    //#endregion
    //#region ทำลบที่ตรงกับ info
    if (!isEmpty(informationCR) && vid == informationCR.vid) {
      // console.log("ทำลบที่ตรงกับ info  : ", initialVehiclesDataSI[index])
      found = false;
    }
    //#endregion

    if (
      initialVehiclesDataSI[index].lat == 0 &&
      initialVehiclesDataSI[index].lng == 0
    ) {
      // console.log("lat lng 0 0 : ", initialVehiclesDataSI[index])
      found = false;
    }

    found &&
      data.push({
        category: "anti-social-behaviour",
        location_type: "Force",
        location: {
          latitude: parseFloat(lat),
          longitude: parseFloat(lng),
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
          vehicle_type_id,
          // "class_type": initialVehiclesDataSI[index].class_type,
          status: status,
          // "status": statusCar(initialVehiclesDataSI[index]),
          course: course,
        },
        vid: vid,
        licenseplate: licenseplate,
        vehicle_name: vehicle_name,
        vin_no: vin_no,
      });
  }
  //#endregion

  const getGeofenceByTypes = async (value) => {
    // let { header } = this.props
    let param = "";
    for (let index in value) {
      if (param !== "") param += "&GeofenceTypeIds=" + value[index];
      else param += "GeofenceTypeIds=" + value[index];
    }

    var response = await fetch(
      ENDPOINT_BASE_URL + "Geofence/Geofence/ListByTypes?" + param,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: header.idToken,
          "X-API-Key": header.redisKey,
        },
        // body: JSON.stringify({ userId: this.props.dataLogin.userId })
      }
    );
    let data = response.ok ? await response.json() : { geofenceByTypes: [] };
    dispatch(
      setStatesContorlRoomDealerRedux({
        geofenceByTypes: data.geofenceByTypes,
        geofencesEnabled: value,
      })
    );
  };

  const getInformation = async (vid) => {
    const response = await fetch(
      // ENDPOINT_REALTIME_V2 + "fleet/V2/Infomation?vid=" + vid + '&user_id=' + dataLogin.userId
      `${ENDPOINT_BASE_URL_YNM4}fleet/dlt/excavator/Infomation?vid=${vid}`,
      {
        // const response = await fetch(ENDPOINT_REALTIME + "fleet/GunicornInfomation?vid=" + vid + '&user_id=' + dataLogin.userId, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Accept-Language": dataLogin.language,
        },
        // body: JSON.stringify({

        // })
      }
    );
    const data = await response.json();
    fromMarker = true;
    dispatch(setInformation(data));
  };

  //#region  Fit Bounds
  const fitBounds = (initialVehiclesDataSI, isInfo = false) => {
    console.log("informationCR", initialVehiclesDataSI);
    if (
      mapRef.current &&
      isFitBounds &&
      isEmpty(informationCR) &&
      !isEmpty(data) &&
      !auto
    ) {
      console.log(data);
      let bounds = new window.google.maps.LatLngBounds();
      if ((isInfo = true)) {
        bounds.extend({
          lat: informationCR.lat,
          lng: informationCR.lng,
        });
      } else if ((isInfo = false)) {
        for (let index in data) {
          bounds.extend({
            lat: data[index].location.latitude,
            lng: data[index].location.longitude,
          });
        }
      }

      mapRef.current.fitBounds(bounds);
      isFitBounds = false;
    }
  };
  // fitBounds();
  //#endregion

  //#region Set Zoom Pan
  // const setZoomPanMarker = () => {
  //   if (mapRef.current && _informationTemp.info) {
  //     eventMapActive = true
  //     mapRef.current.panTo({ lat: information.gps.lat, lng: information.gps.lng });
  //     mapRef.current.setZoom(17)
  //     // setSmoothZoom(mapRef.current, 17, mapRef.current.getZoom())   // เอาออกก่อน เพราะดูจากเครื่องลูกค้า มันดูเหมื่อนช้า
  //     dispatch(setZoomPan(false))
  //     _markerFocus = information.info.vid
  //     eventMapActive = false
  //   }
  //   else {
  //     dispatch(setZoomPan(false))
  //   }
  // }

  // const setSmoothZoom = (map, level, cnt) => {
  //   if (cnt > level) {
  //     cnt -= 1
  //     setTimeout(() => {
  //       map.setZoom(cnt)
  //       setSmoothZoom(map, level, cnt);
  //     }, 80);

  //   }
  //   else if (cnt < level) {
  //     cnt += 1
  //     setTimeout(() => {
  //       map.setZoom(cnt)
  //       setSmoothZoom(map, level, cnt);
  //     }, 80);
  //   } else {
  //     return;
  //   }
  // }
  //#endregion

  //#region Set PanTo เมื่อ focus อยู่
  // const setFocusMarker = () => {
  //   if (mapRef.current && isFocus && _informationTemp.info) {
  //     !isOnDragEnd && !_isZoomOfFocus && mapRef.current.panTo({ lat: _informationTemp.gps.lat, lng: _informationTemp.gps.lng });
  //   }
  // }
  //#endregion

  //#region Set Data Point
  console.log("dt", data);
  const points = data.map((dt) => ({
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
      class_type: dt.class_type,
      status: dt.image.status,
      course: dt.course,
    },
    vid: dt.vid,
    licenseplate: dt.licenseplate,
    vehicle_name: dt.vehicle_name,
    vin_no: dt.vin_no,
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, minPoints: 2, maxZoom: 22 },
  });

  console.log("clusters", clusters);
  //#endregion

  //#region  #Subscribe to the MQTT topic sss
  // const subscribe = () => {
  //   let topicConnect = PubSub._pluggables[0]._topicObservers.get(topicRealtime)
  //   if (topicConnect === undefined || topicConnect.size === 0) {
  //     console.log(">> SUBSCRIBE MQTT : ")
  //     PubSub.subscribe(topicRealtime).subscribe({
  //       // next : we successfully received a message and inside data is that messagea,
  //       next: data => {
  //         if (!eventMapActive) {
  //           console.log(">> MQTT UPDATE : ", moment().format('DD/MM/YYYY HH:mm:ss'))
  //           let _newDataInitail = [...dataInitail]
  //           for (let index in data.value.gps) {

  //             //#region ถ้ารถ focus อยู่ และมีข้อมูลอัพเดทของคันที่ focus ให้ดึง api information แล้วอัพเดทข้อมูล initial ด้วย
  //             if (_informationTemp.info && _informationTemp.info.vid == data.value.gps[index].vid) {
  //               dispatch(getInformationMarker(data.value.gps[index].vid, 'Mqtt'))
  //             }
  //             //#endregion

  //             //#region  Find Index Marker
  //             let idx = _newDataInitail.findIndex(x => x.info.vid === data.value.gps[index].vid);

  //             if (idx >= 0) {
  //               _newDataInitail[idx].info.vid = data.value.gps[index].vid
  //               _newDataInitail[idx].gps.speed = data.value.gps[index].speed
  //               _newDataInitail[idx].gps.lat = data.value.gps[index].lat
  //               _newDataInitail[idx].gps.lng = data.value.gps[index].lng
  //               _newDataInitail[idx].gps.image.course = data.value.gps[index].image.course
  //               _newDataInitail[idx].gps.image.class_type = data.value.gps[index].image.class_type
  //               _newDataInitail[idx].gps.image.status = data.value.gps[index].image.status
  //               _newDataInitail[idx].sensor.canbus.dtc_engine = data.value.gps[index].canbus_dtc_engine
  //               _newDataInitail[idx].sensor.device_batt_level = data.value.gps[index].device_batt_level
  //               _newDataInitail[idx].driver_cards.card_id = data.value.gps[index].driver_cards.card_id
  //               _newDataInitail[idx].driver_cards.name = data.value.gps[index].driver_cards.name
  //               _newDataInitail[idx].driver_cards.status_swipe_card = data.value.gps[index].driver_cards.status_swipe_card
  //               _newDataInitail[idx].alarm.SuddenAccelerator = data.value.gps[index].SuddenAccelerator
  //               _newDataInitail[idx].alarm.SuddenStart = data.value.gps[index].SuddenStart
  //               _newDataInitail[idx].alarm.SuddenBrake = data.value.gps[index].SuddenBrake
  //               _newDataInitail[idx].alarm.SuddenTurn = data.value.gps[index].SuddenTurn
  //               _newDataInitail[idx].alarm.OverRPM = data.value.gps[index].OverRPM
  //             }
  //             else {
  //               console.log("NOT FOUND!!!! : ", data.value.gps[index].vid)
  //             }
  //             //#endregion
  //           }

  //           //#region Set Data Initail
  //           dataInitail = [..._newDataInitail]
  //           setPointData([..._newDataInitail])
  //           dispatch(setInitialVehicles([..._newDataInitail])) // SET TO REDUX
  //           //#endregion
  //         }
  //       },
  //       // error : something went wrong when trying to subscribe to the topic
  //       error: () => {
  //         console.log("ERROR SUBSCRIBE")
  //         unsubscribe()
  //         subscribe()
  //       },
  //       // close : stop subscribing to this topic
  //       close: () => console.log('Done'),
  //     });

  //     PubSub.publish('/HINO/UserRegister/All/', {
  //       "Event": "SubRealtime",
  //       "clientId": PubSub._pluggables[0].clientId,
  //       "Env": process.env.REACT_APP_NODE_ENV,
  //       "UserID": dataLogin.userId
  //     })
  //   }
  // }

  // const unsubscribe = () => {
  //   let subGPSTopic = Amplify.PubSub._pluggables[0]._topicObservers.get(topicRealtime)
  //   if (subGPSTopic !== undefined) {
  //     if (subGPSTopic.size > 0) {
  //       subGPSTopic.values().next().value._subscription.unsubscribe();
  //     }
  //   }
  // }
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

  const _onCollapseComponent = () => {
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
    return (
      console.log(
        "latitude : longitude",
        get(information, "info.lat"),
        get(information, "info.lng")
      ),
      (
        <MarkerMap
          key={information.vid}
          lat={information.lat}
          lng={information.lng}
          bottom={_tooltipButtom}
          licensePlateEnabled={true}
          licenseplate={get(information, "chassis_no")}
          markerType={"Actived"}
          status={get(information, "status")}
          iconSize={_iconSize}
          course={0}
        />
      )
    );

    return (
      <MarkerMap
        key={get(information, "vid")}
        lat={get(information, "gps.lat")}
        lng={get(information, "gps.lng")}
        // lat={get(information, "gps.lat")}
        // lng={get(information, "gps.lng")}
        // onClick={() => {
        //   dispatch(getInformationMarker(vid, 'Marker'))
        //   _markerFocus = vid
        // }}
        bottom={_tooltipButtom}
        licensePlateEnabled={false}
        // licensePlateEnabled={_stateMapControl.licensePlateEnabled}
        // licenseplate={(get(information, 'info.licenseplate', "") !== "") ? get(information, 'info.licenseplate') : get(information, 'info.vin_no')}
        licenseplate={
          get(information, "info.vehicle_name", "") !== ""
            ? get(information, "info.vehicle_name")
            : get(information, "info.licenseplate", "") !== ""
            ? get(information, "info.licenseplate")
            : get(information, "info.vin_no")
        }
        markerType={"Actived"}
        classType={get(information, "info.vehicle_type_id")}
        // classType={get(information, 'gps.image.class_type')}
        // status={statusCarOld(information)}
        status={get(information, "gps.image.status")}
        iconSize={_iconSize}
        // course={get(information, 'gps.course')}
        course={get(information, "gps.image.course")}
      />
    );
  };

  let clusterDisable =
    displayVehicle && displayVehicle.length > MAXTOTAL ? true : false;

  // console.log('clusters', clusters)

  return (
    <div>
      {/* <div id={"content-colaps"} style={{ backgroundColor: "#bac2c4" }}>
        <Dashboard />
      </div> */}

      <div style={{ height: "90vh", width: "100%", marginTop: "5px" }}>
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

            setBusinessPOI(map);
            // var overlayMap = new window.google.maps.ImageMapType(overlayImageMaps[0]);
            // mapRef.current.overlayMapTypes.setAt(0, overlayMap)
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
            // isOnDragEnd = true
            // eventMapActive = true
          }}
          onDragEnd={() => {
            // eventMapActive = false
            // setStateMapControlChange(["fitObjectEnabled"], false)
            // dispatch(setFocus(false))
          }}
          onZoomAnimationStart={() => {
            // eventMapActive = true
            // _isZoomOfFocus = true
          }}
          onZoomAnimationEnd={() => {
            // eventMapActive = false
            // let zoom = mapRef.current.getZoom()
            // dispatch(setDefaultZoom(zoom))
            // !_informationTemp.info && dispatch(setDefaultCenter(mapRef.current.getCenter().lat(), mapRef.current.getCenter().lng()))
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
              <MapControlsCustomNew
                isDashboardIcon={false}
                position={1}
                map={map}
                licensePlateHidden={true}
                // geofencesrHidden={true}
                clusterEnabled={clusterEnabled}
                clusterDisable={clusterDisable}
                fitObjectHidden={true}
                objectHidden={true}
                dashboardHidden={false}
                geofencesEnabled={geofencesEnabled}
                onClusterChange={(value) =>
                  dispatch(
                    setStatesContorlRoomDealerRedux({ clusterEnabled: value })
                  )
                }
                // onObjectChange={value => console.log("onObjectChange", value)}
                // onImeasureChange={value => console.log("onImeasureChange", value)}
                onDashboardChange={(value) => props.onDashboardChange(value)}
                onGeofencesChange={(value) => {
                  getGeofenceByTypes(value);
                }}
                infoHidden={true}
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
                width={400}
              />

              {/* VEHICLES LIST PANEL */}
              <MapControl
                position={7}
                map={map}
                id={"overlay-panel"}
                width="auto"
              >
                <OverlayPanel />
              </MapControl>

              <MapControl
                position={2}
                map={map}
                id={"vehicle-count"}
                width="auto"
              >
                <div className="total-vehicle">
                  <center>
                    <span>
                      {initialVehiclesDataSI
                        ? numberWithComma(initialVehiclesDataSI.length)
                        : 0}
                    </span>{" "}
                    {t("summary_95")}
                  </center>
                </div>
              </MapControl>

              {/* GEOFENCES */}
              <Geofences map={map} />

              {/* FOOTER INFORMATION */}
              <MapControl position={9} map={map} id={"footer-info"}>
                <FooterInfo />
              </MapControl>
            </>
          )}

          {/* Marker Actice */}
          {!isEmpty(informationCR) && setActiceMarker(informationCR)}

          {/* MARKER CLUSTER */}
          {/* {clusterDisable ? clusters.map((cluster) => { */}
          {
            clusters.map((cluster) => {
              let class_type = "";
              let status = "";
              let course = "";

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
              } else {
                console.log("latitude : longitude", cluster);
                return (
                  <MarkerMap
                    key={cluster.vid}
                    lat={latitude}
                    lng={longitude}
                    // key={get(informationCR, "info.vid")}
                    // lat={get(informationCR, "info.lat")}
                    // lng={get(informationCR, "info.lng")}
                    onClick={() => {
                      // dispatch(getInformationMarker(cluster.vid, 'Marker'))
                      // _markerFocus = cluster.vid
                    }}
                    bottom={_tooltipButtom}
                    // licensePlateEnabled={stateMapControl.licensePlateEnabled}
                    // licensePlateEnabled={stateMapControl.licensePlateEnabled}
                    licenseplate={_licenseplate}
                    markerType={"Inactived"}
                    classType={class_type}
                    status={status}
                    iconSize={_iconSize}
                    course={course}
                  />
                );
              }
            })

            // : points.map((cluster, index) => {
            //     const [longitude, latitude] = cluster.geometry.coordinates;
            //     console.log(cluster);
            //     if (mapRef.current) {
            //       const bd = mapRef.current.getBounds();
            //       var latlng = new window.google.maps.LatLng(
            //         latitude,
            //         longitude
            //       );
            //       if (!bd.contains(latlng)) return;
            //     }

            //     let class_type = "";
            //     let status = "";
            //     let course = "";

            //     if (cluster.image) {
            //       class_type = cluster.image.class_type;
            //       status = cluster.image.status;
            //       course = cluster.image.course;
            //     }
            //     // let _licenseplate = get(cluster, "licenseplate");
            //     // if (_licenseplate == "") _licenseplate = get(cluster, "vin_no");

            //     let _licenseplate = get(cluster, "vin_no");
            //     if (_licenseplate == "")
            //       _licenseplate = get(cluster, "licenseplate");
            //     if (_licenseplate == "") _licenseplate = get(cluster, "vin_no");

            //     return (
            //       console.log("latitude : longitude", latitude, longitude),
            //       (
            //         <MarkerMap
            //           key={cluster.vid}
            //           lat={latitude}
            //           lng={longitude}
            //           // key={get(initialVehiclesDataSI, "info.vid")}
            //           // lat={get(initialVehiclesDataSI, "info.lat")}
            //           // lng={get(initialVehiclesDataSI, "info.lng")}
            //           onClick={() => {
            //             getInformation(initialVehiclesDataSI[index].vid);
            //             dispatch(setVid(initialVehiclesDataSI[index].vid));
            //             // dispatch(getInformationMarker(cluster.vid, 'Marker'))
            //             // _markerFocus = cluster.vid
            //           }}
            //           bottom={_tooltipButtom}
            //           // licensePlateEnabled={stateMapControl.licensePlateEnabled}
            //           licenseplate={_licenseplate}
            //           markerType={"Inactived"}
            //           classType={class_type}
            //           status={status}
            //           iconSize={_iconSize}
            //           course={course}
            //         />
            //       )
            //     );
            //   })
          }
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;

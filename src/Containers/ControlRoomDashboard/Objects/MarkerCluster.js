import React, { Component } from "react";
import { Marker, MarkerClusterer } from "@react-google-maps/api";
import { statusCar } from "./StatusVehicle";
import ControlRoomDealerActions from "../../../Redux/ControlRoomDealerRedux";
import { ENDPOINT_REALTIME_V2 } from "../../../Config/app-config";
const { get } = require("lodash");
const ClusterImage = require("../Icons/Cluster.png");

class MarkerCluster extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.Clusterer = null;
    this.markers = {};
    this.check = null;
    this.listvehicle = [];
  }

  componentDidMount(prevProps) {
    // let { initialVehiclesData, clusterEnabled, searchData, select, size, yAxis } = this.props
    // this.setMarkerSize(size, yAxis, initialVehiclesData)
  }

  componentDidUpdate(prevProps) {
    let {
      initialVehiclesData,
      clusterEnabled,
      searchData,
      select,
      size,
      yAxis,
    } = this.props;
    this.setMarkerSize(size, yAxis, initialVehiclesData);
    this.repaintCluster(clusterEnabled, initialVehiclesData);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let {
      initialVehiclesData,
      clusterEnabled,
      searchData,
      select,
      size,
      yAxis,
      isRefresh,
    } = this.props;

    //     if (nextProps.isRefresh !== isRefresh) {

    //         // console.log("isRefresh :", size, yAxis)
    //         // this.setMarkerSize(size, yAxis, initialVehiclesData)
    //         return false
    //     }

    if (nextProps.clusterEnabled !== clusterEnabled) {
      this.repaintCluster(nextProps.clusterEnabled, initialVehiclesData);
      return false;
    }

    //     if (initialVehiclesData !== nextProps.initialVehiclesData) {

    //         // console.log("initialVehiclesData :", size, this.props.map.getZoom(), isRefresh)

    //         if (isRefresh === true) {

    //             // console.log("size :", nextProps.size, nextProps.yAxis)
    //             this.setMarkerSize(size, yAxis, nextProps.initialVehiclesData)
    //             return false
    //         } else if (nextProps.initialVehiclesData.length > 0) {
    //             const google = window.google

    //             let bounds = new google.maps.LatLngBounds();
    //             for (let i in nextProps.initialVehiclesData) {
    //                 let { lat, lng } = nextProps.initialVehiclesData[i]
    //                 if (!(lat === 0 && lng === 0)) {
    //                     bounds.extend({ lat, lng })
    //                 }
    //             }
    //             this.props.map.fitBounds(bounds);
    //         }
    //         // this.calSizeFormZoom()

    //         //     console.log("initialVehiclesData :", initialVehiclesData)
    //         //     if (isEmpty(initialVehiclesData)) {
    //         //         console.log("111111")
    //         //         return true
    //         //     }

    //         // this.setMarkerSize(size, yAxis, initialVehiclesData)
    //         return true
    //     }

    //     if (nextProps.size !== size || nextProps.yAxis !== yAxis) {

    //         console.log("size :", size, yAxis)
    //         //nextProps.size คือการเอาค่าตัวหใม่
    //         this.setMarkerSize(nextProps.size, nextProps.yAxis, initialVehiclesData)
    //         return false

    return true;
  }

  //     //render
  //     return true
  // }

  calSizeFormZoom(zoom, size) {
    // console.log("xx :", zoom, size)

    if (zoom < 15 && size !== 50) {
      // console.log('1')

      return { size: 50, yAxis: -50 };
    } else if (15 <= zoom && zoom < 18 && size !== 100) {
      // console.log('2')

      return { size: 100, yAxis: -75 };
    } else {
      // console.log('3')

      return { size: 150, yAxis: -100 };
    }
  }

  setMarkerSize(size, yAxis, initialVehiclesData) {
    for (let idx in initialVehiclesData) {
      let status = statusCar(initialVehiclesData[idx]);
      let obj = this.props.iconInactived.find(
        (x) =>
          x.classType === parseInt(get(initialVehiclesData, "class_type", 0)) &&
          x.status === status
      );
      let icon = get(obj, "icon", "");

      let markerName = "markers_" + initialVehiclesData[idx].vid;
      try {
        this[markerName].setIcon(
          icon
            ? {
                url: `data:image/svg+xml;charset=utf-8,
                          ${encodeURIComponent(
                            icon
                              .replace("{{width}}", size)
                              .replace("{{height}}", size)
                              .replace(
                                "{{transform}}",
                                `rotate(${initialVehiclesData[idx].course})`
                              )
                          )}`,
                anchor: { x: size / 2, y: size / 2 },
              }
            : ""
        );
      } catch (error) {
        // console.log('error', error)
      }

      // this[markerName].yAxis(icon ? {})
    }
  }
  repaintCluster(clusterEnabled, initialVehiclesData) {
    // เมื่อมีการเปิดปิด Marker ให้ทำการ Repaint Cluster ใหม่
    if (this.Clusterer !== null) {
      if (clusterEnabled) this.Clusterer.setMinimumClusterSize(5);
      else this.Clusterer.setMinimumClusterSize(initialVehiclesData.length + 9); // set min > Vehicles = disable cluster

      this.Clusterer && this.Clusterer.repaint();
    }
  }

  // updateMarkerInfo(data) {
  //     // เมื่อมีข้อมูลอัพเดท ให้อัพเดท Marker ด้วย Object Marker
  //     for (let idx in data) {
  //         if (this["markers_" + data[idx].vid]) {
  //             let markerName = "markers_" + data[idx].vid
  //             let status = statusCar(data[idx])
  //             let obj = this.props.iconInactived.find(x => x.classType === parseInt(get(data[idx], 'class_type', 0)) && x.status === status);
  //             let icon = get(obj, 'icon', "")

  //             this[markerName].setPosition({ lat: data[idx].lat, lng: data[idx].lng })
  //             this[markerName].setIcon(icon ? {
  //                 url: `data:image/svg+xml;charset=utf-8,
  //                           ${encodeURIComponent(icon
  //                     .replace('{{width}}', 50)
  //                     .replace('{{height}}', 50)
  //                     .replace('{{transform}}', `rotate(${data[idx].course})`))}`,
  //                 anchor: { x: 50 / 2, y: 50 / 2 }
  //             } : '')
  //         }
  //     }
  // }

  setShowHideMarker(vehicles, initialVehiclesData) {
    // เซตเปิดปิด Marker
    if (this.Clusterer) {
      for (let index in initialVehiclesData) {
        let vid = initialVehiclesData[index].info.vid;
        let found = vehicles.includes(vid);
        this["markers_" + vid].setVisible(found);
      }
      this.Clusterer.repaint();
    }
  }

  async getlistvehicle(vid) {
    // fleet/Infomation?vid=11061' + vid

    const response = await fetch(
      ENDPOINT_REALTIME_V2 +
        "fleet/V2/Infomation?vid=" +
        vid +
        "&user_id=" +
        this.props.dataLogin.userId,
      {
        // const response = await fetch(ENDPOINT_BASE_URL + 'fleet/Infomation?vid=' + vid + '&user_id=' + this.props.dataLogin.userId, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // 'user_id': JSON.stringify({ userId: this.props.dataLogin.userId }),
          "Accept-Language": this.props.dataLogin.language,
        },
        // body: JSON.stringify({

        // })
      }
    );
    const data = await response.json();

    console.log("Infomation :", data);

    this.props.setInformation(data);
    // this.props.setListvehicle(data)
    // this.setAlertSetting(false, 5)
    // this.setState({ listvehicle: data })
  }

  render() {
    let {
      initialVehiclesData,
      clusterEnabled,
      size,
      yAxis,
      displayVehicle,
      informationCR,
    } = this.props;

    // console.log(">> RENDER MARKER CLUSTER <<")

    // if (this.Clusterer !== null) {
    //     let { markers } = this.Clusterer
    //     console.log("markers : ", markers)
    // }

    return (
      initialVehiclesData.length > 0 && (
        <>
          <MarkerClusterer
            onLoad={(Clusterer) => {
              // console.log("LOAD CLUSTER", Clusterer)
              this.Clusterer = Clusterer;
              this.repaintCluster(clusterEnabled, initialVehiclesData);
            }}
            ignoreHidden={true}
            minimumClusterSize={5} // Default min = 5
            styles={[
              {
                url: ClusterImage,
                height: 53,
                width: 52,
                textColor: "white",
                textSize: 16,
              },
            ]}
          >
            {(clusterer) =>
              initialVehiclesData.map((data, index) => {
                if (!displayVehicle.includes(data.vid)) return;
                if (get(data, "vid") === get(informationCR, "info.vid")) return;

                let status = statusCar(data);

                // let obj = this.props.iconInactived.find(x => x.classType === parseInt(get(data, 'class_type', 0)) && x.status === status);
                let obj = this.props.iconInactived.find(
                  (x) =>
                    x.classType ===
                      parseInt(data.class_type == null ? 0 : data.class_type) &&
                    x.status === status
                );

                let icon = get(obj, "icon", "");

                // console.log('initialVehiclesData :', initialVehiclesData)
                if (!icon) {
                  // console.log("data : ", data)
                  // console.log("vid : ", data.vid)
                  // console.log("status : ", status)
                  // console.log("class_type : ", parseInt(get(data, 'class_type', 0)))
                  // console.log("obj : ", obj)
                }

                return (
                  <Marker
                    key={index}
                    onLoad={(m) => {
                      this["markers_" + data.vid] = m;
                      // console.log("AAAA", m)
                    }}
                    clusterer={clusterer}
                    position={{ lat: data.lat, lng: data.lng }}
                    onClick={(e) => {
                      this.getlistvehicle(data.vid);
                    }}
                    icon={
                      icon
                        ? {
                            url: `data:image/svg+xml;charset=utf-8,
                                        ${encodeURIComponent(
                                          icon
                                            .replace("{{width}}", size)
                                            .replace("{{height}}", size)
                                            .replace(
                                              "{{transform}}",
                                              `rotate(${data.course})`
                                            )
                                        )}`,
                            anchor: { x: size / 2, y: size / 2 },
                            // labelOrigin: { x: size / 2, y: 10 },
                          }
                        : ""
                    }
                    yAxis={yAxis}
                  ></Marker>
                );
              })
            }
          </MarkerClusterer>
        </>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  isRefresh: state.controlroomdealer.isRefresh,
  searchData: state.controlroomdealer.searchData,
  select: state.controlroomdealer.select,
  initialVehiclesData: state.controlroomdealer.initialVehiclesData,
  displayVehicle: state.controlroomdealer.displayVehicle,
  iconInactived: state.realtime.iconInactived,
  dataLogin: state.signin.dataLogin,
  informationCR: state.controlroomdealer.informationCR,
});

const mapDispatchToProps = (dispatch) => ({
  // getInformation: (vid, zoom, activeMap) => dispatch(RealtimeNewActions.getInformation(vid, zoom, activeMap)),
  setInformation: (information) =>
    dispatch(ControlRoomDealerActions.setInformation(information)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MarkerCluster);

import image from "./icons/Images";
import moment from "moment";
import { t } from "../../Components/Translation";
import { momentDate } from "../../Functions/DateMoment";
import { isEmpty } from "lodash";

export function getEventIcon(id) {
  let icon = "unknow";

  switch (id) {
    case 1:
      icon = image.ic_driving;
      break;
    case 2000:
      icon = "/icons/MarkerYanmar/1-T-2.png";
      break;
    case 3:
      // icon = image.ic_idling;
      icon = "/icons/MarkerYanmar/1-T-1.png";
      break;
    case 5:
      icon = image.ic_overspeed;
      break;
    case 7:
      icon = image.ic_harsh_start;
      break;
    case 9:
      icon = image.ic_harsh_accelelation;
      break;
    case 14:
      icon = image.ic_harsh_brake;
      break;
    case 21:
      icon = image.ic_harsh_turn;
      break;
    case 1001:
      icon = image.ic_fence_in;
      break;
    case 1002:
      icon = image.ic_fence_out;
      break;
    case 1010:
      icon = image.ic_swipe_in;
      break;
    case 1011:
      icon = image.ic_swipe_out;
      break;
    case 20000:
      icon = image.ic_sos;
      break;
    case 20001:
      icon = image.ic_engine_oil;
      break;
    default:
      icon = "unknow";
      break;
  }
  return icon;
}

export function getEventIconTractor(id) {
  let icon = "unknow";

  switch (id) {
    case 2000:
      icon = image.Tractorgrey;
      break;
    case 3:
      icon = image.Tractorwhite;
  }
}

export function getEventIconMap(id) {
  let icon = "unknow";

  switch (id) {
    case 1:
      icon = image.ic_driving;
      break;
    case 2000:
      // icon = image.ic_parking;
      icon = "/icons/MarkerYanmar/1-T-2.png";
      break;
    case 3:
      // icon = image.ic_idling;
      icon = "/icons/MarkerYanmar/1-T-1.png";
      break;
    case 5:
      icon = image.ic_overspeed;
      break;
    case 7:
      icon = image.ic_harsh_start;
      break;
    case 9:
      icon = image.ic_harsh_accelelation;
      break;
    case 14:
      icon = image.ic_harsh_brake;
      break;
    case 21:
      icon = image.ic_harsh_turn;
      break;
    case 1001:
      icon = image.ic_fence_in;
      break;
    case 1002:
      icon = image.ic_fence_out;
      break;
    case 1010:
      icon = image.ic_swipe_in;
      break;
    case 1011:
      icon = image.ic_swipe_out;
      break;
    case 20000:
      icon = image.ic_sos;
      break;
    case 20001:
      icon = image.ic_engine_oil;
      break;
    default:
      icon = "unknow";
      break;
  }
  return icon;
}

export function getEventName(id) {
  let eventName = "";
  switch (id) {
    case 1:
      eventName = "history_120";
      break;
    case 2000:
      eventName = "history_55";
      break;
    case 3:
      eventName = "realtime_191";
      break;
    // case 4:
    //     eventName = "XXXXXX"
    //     break;
    case 5:
      eventName = "history_57";
      break;
    case 7:
      eventName = "history_58";
      break;
    case 9:
      eventName = "history_59";
      break;
    case 14:
      eventName = "history_60";
      break;
    case 21:
      eventName = "history_61";
      break;
    case 1001:
      eventName = "history_62";
      break;
    case 1002:
      eventName = "history_63";
      break;
    case 1010:
      eventName = "history_98";
      break;
    case 1011:
      eventName = "history_99";
      break;
    case 20000:
      eventName = "history_110";
      break;
    case 20001:
      eventName = "history_111";
      break;
  }
  return eventName;
}

export function getChartName(id) {
  let chartName = "";
  switch (id) {
    case 1:
      chartName = "history_9";
      break;
    case 2:
      chartName = "history_10";
      break;
    case 3:
      chartName = "history_16";
      break;
    case 4:
      chartName = "history_11";
      break;
    case 5:
      chartName = "history_14";
      break;
    case 6:
      chartName = "history_12";
      break;
    case 7:
      chartName = "history_44";
      break;
    case 8:
      chartName = "history_112";
      break;
    case 9:
      chartName = "history_121";
      break;
  }
  return chartName;
}
export function getCrosshairHeight(id) {
  let height = 0;
  switch (id) {
    case 1:
      height = 130;
      break;
    case 2:
      height = 90;
      break;
    case 3:
      height = 90;
      break;
    case 4:
      height = 140;
      break;
    case 5:
      height = 130;
      break;
    case 6:
      height = 90;
      break;
    case 7:
      height = 100;
      break;
    case 8:
      height = 90;
      break;
  }
  return height;
}

export function getConfigChart(chartId) {
  // chartId => 1 : Speed | 2 : RPM | 3 : Acceleration Pedal | 4 : Sensors and switch | 5 : Coolrance temperature | 6 : Fuel Tank | 7 : Temp Sensor
  let Config = {};
  switch (chartId) {
    //#region Running
    case 1:
      Config = {
        height: 140,
        Series: [
          // {
          //   type: 'spline',
          //   valueField: 'speed',
          //   name: 'XXX',
          //   color: 'driving',
          //   point: {
          //     size: 1
          //   },
          //   width: 6
          // },
          // {
          //   type: "spline",
          //   valueField: "idling",
          //   name: "XXX",
          //   color: "idling",
          //   point: {
          //     size: 1,
          //   },
          //   width: 6,
          // },
          // {
          //   type: "spline",
          //   valueField: "parking",
          //   name: "XXX",
          //   color: "parking",
          //   point: {
          //     size: 1,
          //   },
          //   width: 6,
          // },

          {
            type: "line",
            valueField: "working",
            name: "XXX",
            color: "driving",
            point: {
              size: 1,
            },
            width: 5,
          },
          {
            type: "line",
            valueField: "moving",
            name: "XXX",
            // color: "idling",
            color: "rgb(255 228 0)",
            point: {
              size: 1,
            },
            width: 6,
          },
          {
            type: "line",
            valueField: "ign_off",
            name: "XXX",
            color: "parking",
            point: {
              size: 1,
            },
            width: 6,
          },
          {
            type: "scatter",
            valueField: "pto",
            name: "XXX",
            color: "rgb(141 0 241)",
            point: {
              size: 4,
            },
            width: 6,
          },
        ],
        ValueAxis: {
          min: 0,
          max: 1,
          tickInterval: 1,
          minValueMargin: 0,
          title: {
            text: "RPM",
            margin: 10,
          },
          grid: {
            visible: true,
          },
          // constantLine: {
          //   value: "speed_limit",
          //   width: 2,
          //   color: 'overspeed',
          //   dashStyle: "Dash",
          //   label: {
          //     visible: false
          //   }
          // }
        },
      };

      break;
    //#endregion

    //#region RPM
    case 2:
      Config = {
        height: 140,
        Series: [
          {
            type: "spline",
            valueField: "rpm",
            name: "XXX",
            color: "rpm",
            point: {
              size: 1,
            },
          },
        ],
        ValueAxis: {
          min: 0,
          max: 2900,
          title: {
            text: "RPM",
            margin: 10,
          },
          grid: {
            visible: true,
          },
        },
      };

      break;
    //#endregion

    //#region Acceleration Pedal
    case 3:
      Config = {
        height: 140,
        Series: [
          {
            type: "spline",
            valueField: "canbus_acc_pedal",
            name: "XXXX",
            color: "pedal",
            border: {
              color: "#595959",
              width: 1,
              visible: true,
            },
            point: {
              size: 1,
            },
          },
        ],
        ValueAxis: {
          min: 0,
          max: 90,
          title: {
            text: "Acceleration Pedal",
            margin: 5,
          },
          grid: {
            visible: true,
          },
        },
      };

      break;
    //#endregion

    //#region Sensors and switch
    case 4:
      Config = {
        height: 190,
        Series: [
          {
            type: "scatter",
            valueField: "canbus_foot_brake",
            name: "XXXXX",
            color: "brake",
            point: {
              symbol: "circle",
              size: 6,
            },
          },
          {
            type: "scatter",
            valueField: "canbus_exhaust_brake",
            name: "XXXXX",
            color: "exhaust",
            point: {
              symbol: "circle",
              size: 6,
            },
          },
          {
            type: "scatter",
            valueField: "canbus_dtc_engine",
            name: "XXXXX",
            color: "dtc",
            point: {
              symbol: "circle",
              size: 6,
            },
          },
          {
            type: "scatter",
            valueField: "canbus_clutch_switch",
            name: "XXXXX",
            color: "clutch",
            point: {
              symbol: "circle",
              size: 6,
            },
          },
        ],
        ValueAxis: {
          min: 2,
          max: 5,
          title: {
            text: "Acceleration Pedal",
            margin: 5,
          },
          grid: {
            visible: true,
          },
          label: {
            customizeText: true,
          },
        },
      };

      break;
    //#endregion

    //#region Coolrance temperature
    case 5:
      Config = {
        height: 180,
        Series: [
          {
            type: "spline",
            valueField: "canbus_cooltemp",
            name: "XXXX",
            color: "temperature",
            border: {
              color: "#595959",
              width: 1,
              visible: true,
            },
            point: {
              visible: true,
              size: 1,
            },
          },
        ],
        ValueAxis: {
          min: 0,
          max: 120,
          title: {
            text: "coolrance temperature",
            margin: 5,
          },
          grid: {
            visible: true,
          },
        },
      };

      break;
    //#endregion

    //#region Hydraulic
    case 9:
      Config = {
        height: 180,
        Series: [
          {
            type: "spline",
            valueField: "hydraulic",
            name: "XXXX",
            color: "temperature",
            border: {
              color: "#595959",
              width: 1,
              visible: true,
            },
            point: {
              visible: true,
              size: 1,
            },
          },
        ],
        ValueAxis: {
          min: 0,
          max: 120,
          title: {
            text: "hydraulic temperature",
            margin: 5,
          },
          grid: {
            visible: true,
          },
        },
      };

      break;
    //#endregion

    //#region Fuel Tank
    case 6:
      Config = {
        height: 140,
        Series: [
          {
            type: "spline",
            valueField: "fuel",
            name: "XXXX",
            color: "fuel",
            border: {
              color: "#595959",
              width: 1,
              visible: true,
            },
            point: {
              visible: true,
              size: 1,
            },
          },
        ],
        ValueAxis: {
          min: 0,
          max: 90,
          title: {
            text: "coolrance temperature",
            margin: 5,
          },
          grid: {
            visible: true,
          },
        },
      };

      break;
    //#endregion

    //#region Temp Sensor Old
    // case 7:
    //     Config = {
    //         height: 150,
    //         Series: [
    //             {
    //                 type: 'steparea',
    //                 valueField: 'tempTop',
    //                 name: 'XXXX',
    //                 color: 'temp_hot',
    //                 barWidth: 200,
    //                 border: {
    //                     color: "#595959",
    //                     width: 1,
    //                     visible: true
    //                 },
    //                 point: {
    //                     visible: true,
    //                     size: 0.5
    //                 }
    //             },
    //             {
    //                 type: 'steparea',
    //                 valueField: 'tempButtom',
    //                 name: 'XXXX',
    //                 color: 'temp_cool',
    //                 barWidth: 200,
    //                 border: {
    //                     color: "#595959",
    //                     width: 1,
    //                     visible: true
    //                 },
    //                 point: {
    //                     visible: true,
    //                     size: 0.5
    //                 }
    //             }
    //         ],
    //         ValueAxis: {
    //             min: -20,
    //             max: 40,
    //             title: {
    //                 text: "Temp Sensor C",
    //                 margin: 5
    //             },
    //             grid: {
    //                 visible: true
    //             },
    //             constantLine: {
    //                 value: "temp_limit",
    //                 width: 2,
    //                 color: 'temp_limit',
    //                 dashStyle: "Dash",
    //                 label: {
    //                     visible: false
    //                 }
    //             }
    //         }
    //     }

    //     break;
    //#endregion

    //#region dynamic option temperature
    case 7:
      Config = {
        height: 150,
        dynamicFields: "temp_list",
        dynamicSeriesOption: {
          type: "spline",
          point: {
            size: 1,
          },
        },
        isDynamic: true,
        ValueAxis: {
          min: -20,
          max: 40,
          title: {
            text: "Temp Sensor C",
            margin: 5,
          },
          grid: {
            visible: true,
          },
          constantLine: {
            value: "temp_limit",
            width: 2,
            color: "temp_limit",
            dashStyle: "Dash",
            label: {
              visible: false,
            },
          },
        },
      };

      break;
    //#endregion

    //#region Battery
    case 8:
      Config = {
        height: 140,
        Series: [
          {
            type: "spline",
            valueField: "vehicle_batt",
            name: "XXXX",
            color: "main_battery",
            border: {
              color: "#595959",
              width: 1,
              visible: true,
            },
            point: {
              visible: true,
              size: 1,
            },
          },
        ],
        ValueAxis: {
          min: 0,
          max: 20,
          tickInterval: 10,
          title: {
            text: "Battery",
            margin: 5,
          },
          grid: {
            visible: true,
          },
        },
      };

      break;
    //#endregion
  }
  return Config;
}

export function mappingField(data, speed_limit, temp_limit) {
  let mapData = [];
  // console.log("MAPPING FIELD : ", data)
  for (let index in data) {
    let d = data[index];
    mapData.push({
      speed_limit: speed_limit, // "speed_limit": d[99],
      course: d[7],
      rpm: d[5],
      fuel: d[16],
      // "gpsdate": momentDate(d[0], "YYYY-MM-DD HH:mm:ss"),
      gpsdate: d[0],
      admin_level1_name: d[8],
      admin_level2_name: d[9],
      admin_level3_name: d[10],
      driver_cards_name: d[22],
      lat: d[2],
      lng: d[3],
      time: d[0],
      canbus_fuel_cons: d[15],
      canbus_foot_brake: parseInt(d[18]) == 1 ? 5 : 0,
      canbus_exhaust_brake: parseInt(d[19]) == 1 ? 4 : 0,
      canbus_dtc_engine: parseInt(d[21]) == 1 ? 3 : 0,
      canbus_clutch_switch: parseInt(d[20]) == 1 ? 2 : 0,
      canbus_cooltemp: d[14],
      canbus_acc_pedal: d[17],
      speed: d[4],
      parking: 0, // "parking": d[99],
      idling: 0, // "idling": d[99],
      overspeed: 0, // "overspeed": d[99],
      acc: d[6],
      temp_limit: temp_limit, //   "temp_limit": d[99],
      temperatures: d[27],
      tempTop: d[27] >= 0 ? d[27] : 0,
      tempButtom: d[27] <= 0 ? d[27] : 0,
      option_temperature: d[32],
      device_batt: d[33], // battery backup
      vehicle_batt: d[30], // battery Main
      hydraulic: d[32], // hydraulic
      pto: d[33], // PTO
      speeds: d[4],
    });
  }
  // console.log("DETAIL : ", calSpeedChart(mapData))
  return calSpeedChart(mapData);
  // return mapData
}

export function randomNumber(key) {
  let result = 0;
  switch (key) {
    case 1:
      result = Math.floor(Math.random() * 20);
      break;
    case 2:
      result = Math.floor(Math.random() * 20) - 10;
      break;
    case 3:
      result = Math.floor(Math.random() * 20) + 10;
      break;
    case 4:
      result = Math.floor(Math.random() * 40) - 15;
      break;
  }

  return result;
}

export function calSpeedChart(data) {
  let plotData = [],
    speed_limit = 0,
    temp_limit = 0,
    i = 0;
  for (let idx in data) {
    speed_limit = data[idx].speed_limit;
    temp_limit = data[idx].temp_limit;

    let next = data.length - 1 == i ? i : i + 1;
    let acc = data[idx].acc;
    let speed = data[idx].speed;
    let dataNext = data[next];

    let stat_parking = 0;
    let stat_idling = -10;
    let stat_driving = -10;
    let stat_overspeed = -10;
    if (acc == "f") {
    } else if (acc == "t" && speed == 0) {
      stat_parking = -10;
      stat_idling = 0;
    } else if (acc == "t") {
      stat_parking = -10;
      stat_driving = 0;
    }

    let temperatures = data[idx].temperatures;
    let pointData = {
      speed_limit: speed_limit,
      course: data[idx].course,
      rpm: data[idx].rpm,
      fuel: data[idx].fuel,
      gpsdate: data[idx].gpsdate,
      admin_level1_name: data[idx].admin_level1_name,
      admin_level2_name: data[idx].admin_level2_name,
      admin_level3_name: data[idx].admin_level3_name,
      driver_cards_name: data[idx].driver_cards_name,
      lat: data[idx].lat,
      lng: data[idx].lng,
      time: data[idx].time,
      canbus_fuel_cons: data[idx].canbus_fuel_cons,
      canbus_foot_brake: data[idx].canbus_foot_brake,
      canbus_exhaust_brake: data[idx].canbus_exhaust_brake,
      canbus_dtc_engine: data[idx].canbus_dtc_engine,
      canbus_clutch_switch: data[idx].canbus_clutch_switch,
      canbus_cooltemp: data[idx].canbus_cooltemp,
      canbus_acc_pedal: data[idx].canbus_acc_pedal,
      speed: speed,
      parking: 0,
      idling: 0,
      overspeed: 0,
      acc: data[idx].acc,
      stat_parking: stat_parking,
      stat_idling: stat_idling,
      stat_driving: stat_driving,
      stat_overspeed: stat_overspeed,
      temp_limit,
      temperatures: temperatures,
      tempTop: temperatures >= 0 ? temperatures : 0,
      tempButtom: temperatures <= 0 ? temperatures : 0,
      device_batt: data[idx].device_batt,
      vehicle_batt: data[idx].vehicle_batt,
      hydraulic: data[idx].hydraulic,
      pto: data[idx].pto === 1 ? 1 : -10,
      working: -10,
      moving: -10,
      ign_off: -10,
      speeds: data[idx].speeds,
    };

    let option_temp = data[idx].option_temperature;
    for (let item in option_temp) {
      pointData["temp_" + option_temp[item][0]] = option_temp[item][2];
    }

    //#region Operation and PTO
    if (acc == "t") {
      pointData.working = 1;
      pointData.moving = -10;
      pointData.ign_off = -10;
    } else if (acc == "f" && pointData.speeds === 0) {
      pointData.working = -10;
      pointData.moving = -10;
      pointData.ign_off = 0;
    } else {
      if (acc == "f" && pointData.speeds > 0) {
        // console.log("____________________")
        // console.log("NEXT : (" + idx + ")", dataNext.gpsdate, dataNext.speeds)
        // console.log("CURRENT TIME : ", pointData.gpsdate)
        // console.log("NEXT TIME : ", dataNext.gpsdate)

        pointData.working = -10;
        pointData.moving = 0;
        pointData.ign_off = -10;

        // if (!isEmpty((pointData.gpsdate)) && !isEmpty((dataNext.gpsdate))) {
        //   let diffMinute = moment(dataNext.gpsdate).diff(moment(pointData.gpsdate), "minutes");

        //   if (diffMinute > 1) {
        //     pointData.working = -10;
        //     pointData.moving = 0;
        //     pointData.ign_off = -10;
        //   }
        //   else {
        //     pointData.working = -10;
        //     pointData.moving = -10;
        //     pointData.ign_off = 0;
        //   }
        // }
      } else {
        pointData.working = -10;
        pointData.moving = -10;
        pointData.ign_off = 0;
      }
    }

    // if(pointData.speeds  > 0)
    // นานเกิน 5 นาที (#0 GPS Datetime)
    // นับโดยดูจากข้อมูลถัดไปว่ายังคงมี GPS Speed หรือไม่

    //#endregion

    if (acc == "f") {
      pointData.speed = -10;
      pointData.parking = -1;
      pointData.idling = -10;
      pointData.overspeed = -10;
      plotData.push(pointData);
      if (dataNext.acc == "t") {
        plotData.push({
          speed_limit: speed_limit,
          course: dataNext.course,
          rpm: dataNext.rpm,
          fuel: dataNext.fuel,
          gpsdate: dataNext.gpsdate,
          admin_level1_name: dataNext.admin_level1_name,
          admin_level2_name: dataNext.admin_level2_name,
          admin_level3_name: dataNext.admin_level3_name,
          driver_cards_name: dataNext.driver_cards_name,
          lat: dataNext.lat,
          lng: dataNext.lng,
          time: dataNext.time,
          canbus_fuel_cons: dataNext.canbus_fuel_cons,
          canbus_foot_brake: dataNext.canbus_foot_brake,
          canbus_exhaust_brake: dataNext.canbus_exhaust_brake,
          canbus_dtc_engine: dataNext.canbus_dtc_engine,
          canbus_clutch_switch: dataNext.canbus_clutch_switch,
          canbus_cooltemp: dataNext.canbus_cooltemp,
          canbus_acc_pedal: dataNext.canbus_acc_pedal,
          speed: -10,
          parking: -1,
          idling: -10,
          overspeed: -10,
          acc: dataNext.acc,
          stat_parking: 0,
          stat_idling: -10,
          stat_driving: -10,
          stat_overspeed: -10,
        });
      }
    } else if (acc == "t" && speed == 0) {
      pointData.stat_idling = 0;
      pointData.speed = -10;
      pointData.parking = -10;
      pointData.idling = -1;
      pointData.overspeed = -10;
      plotData.push(pointData);
    } else if (acc == "t") {
      pointData.stat_driving = 0;
      pointData.speed = data[idx].speed;
      pointData.parking = -10;
      pointData.idling = -10;
      pointData.overspeed = -10;
      plotData.push(pointData);
    }
    i++;
  }
  let length = plotData.length;
  let index = 0;
  let fuel_prev = 0;
  let round = 0;
  for (let ix in plotData) {
    if (index > 4) {
      if (plotData[ix].acc == "f") {
        plotData[index].fuel = fuel_prev;
        round = 0;
      } else if (plotData[ix - 1].acc == "f") {
        plotData[index].fuel = fuel_prev;
        round++;
      } else if (plotData[ix].acc == "t") {
        if (round > 0 && round <= 4) {
          plotData[index].fuel = fuel_prev;
          round++;
        } else {
          if (
            index > 4 &&
            length >= 10 &&
            index < length - 5 &&
            plotData[ix].acc == "t"
          ) {
            plotData[index].fuel = getAverage(index, plotData);
          }

          round = 0;
        }
      }
    }
    fuel_prev = plotData[index].fuel;
    index++;
  }

  return plotData;
}

export function getAverage(index, plotData) {
  let fuel = 0;
  let ix = 0;
  ix = index - 5;
  let round = 0;
  for (let i = 0; i < 10; i++) {
    let data = plotData[ix];
    if (data.acc == "t") {
      fuel += data.fuel;
      round++;
    } else {
      break;
    }
    ix++;
  }
  if (round == 0) {
    round = 1;
  }
  return fuel / round;
}

export function getSum(arr, decimal = 1) {
  let result;
  if (arr.length > 0)
    result = arr.reduce((total, num) => total + num).toFixed(decimal);
  else result = 0;
  return parseFloat(result);
}

export function getAvg(arr, decimal = 0) {
  let result;
  if (arr.length > 0)
    result = (arr.reduce((total, num) => total + num, 0) / arr.length).toFixed(
      decimal
    );
  else result = 0;
  return parseFloat(result);
}

import { calculateToDuration } from "../../Functions/DateMoment";
import { numberWithComma } from "../../Functions/Calculation";
import { fancyTimeFormat } from "../../Functions/Calculationtime";
import moment from "moment";

export function toFixed(value, point) {
  try {
    return value.toFixed(point);
  } catch {
    return value;
  }
}

export function getColumnSummary(reportId) {
  let columnConfig = [];
  switch (reportId + "") {
    //ใช้รถขุด
    case "101":
      columnConfig.push(
        {
          column_name: "model",
          column_caption: "other_reports_21",
        },
        {
          column_name: "vin_no",
          column_caption: "other_reports_142",
        },
        {
          column_name: "engine_no",
          column_caption: "other_reports_143",
        },
        {
          column_name: "seller",
          column_caption: "dealer",
        },
        {
          column_name: "customer",
          column_caption: "customer_80",
        },
        {
          column_name: "phone",
          column_caption: "other_reports_146",
        },
        {
          column_name: "delivery",
          column_caption: "realtime_158",
        },
        {
          column_name: "leased_no",
          column_caption: "realtime_157",
        },
        {
          column_name: "working_hour_stop",
          column_caption: "realtime_170",
          // column_render: (e) => e.value.toFixed(2)
          // column_render: (e) => toFixed(e.value, 2)
        },
        {
          column_name: "working_hour",
          column_caption: "other_reports_149",
        },
        {
          column_name: "working_hour_start",
          column_caption: "other_reports_150",
        },
        {
          column_name: "geofence_start",
          column_caption: "history_106",
        },
        {
          column_name: "working_hour_stop",
          column_caption: "other_reports_151",
        },
        {
          column_name: "geofence_stop",
          column_caption: "history_107",
        },
        {
          column_name: "stop_region",
          column_caption: "other_reports_154",
        },
        {
          column_name: "maintenance_next_hour",
          column_caption: "other_reports_152",
        },
        // {
        //   column_name: "maintenance_status",
        //   column_caption: "Maintenace_History_2",
        // },
        {
          column_name: "fuel_level",
          column_caption: "other_reports_155",
        },
        // {
        //   column_name: "fuel_cons",
        //   column_caption: "other_reports_32",
        //   // column_render: (e) => e.value.toFixed(2)
        //   column_render: (e) => toFixed(e.value, 2),
        // },
        // {
        //   column_name: "fuel_used",
        //   column_caption: "other_reports_33",
        // },
        {
          column_name: "battery",
          column_caption: "my_vehicles_29",
        },
        {
          column_name: "coolant",
          column_caption: "my_vehicles_33",
        },
        {
          column_name: "hydraulic",
          column_caption: "other_reports_156",
        }
        // {
        //   column_name: "pto_counter",
        //   column_caption: "other_reports_153",
        // }
      );
      break;
    case "102":
      columnConfig.push(
        {
          column_name: "model",
          column_caption: "other_reports_21",
        },
        {
          column_name: "chassis_no",
          column_caption: "เลขรถ (คัสซี)",
        },
        {
          column_name: "engine_no",
          column_caption: "other_reports_143",
        },
        {
          column_name: "seller",
          column_caption: "dealer",
        },
        {
          column_name: "customer",
          column_caption: "other_reports_127",
        },
        {
          column_name: "phone",
          column_caption: "geofence_reports_10",
        },
        {
          column_name: "deliver_date",
          column_caption: "realtime_158",
        },
        {
          column_name: "finance_contract",
          column_caption: "realtime_157",
        },
        {
          column_name: "fuel_cons",
          column_caption: "other_reports_32",
          // column_render: (e) => e.value.toFixed(2)
          column_render: (e) => toFixed(e.value, 2),
        },
        {
          column_name: "fuel_used",
          column_caption: "other_reports_33",
        },
        {
          column_name: "working_hour",
          column_caption: "other_reports_149",
        },
        {
          column_name: "working_hour_start",
          column_caption: "other_reports_148",
        },
        {
          column_name: "working_hour_stop",
          column_caption: "other_reports_151",
        },
        {
          column_name: "stay_time",
          column_caption: "other_reports_80",
          column_render: (e) => calculateToDuration(e.value, "hideSec"),
        },
        {
          column_name: "travel_time",
          column_caption: "other_reports_81",
        },
        {
          column_name: "count",
          column_caption: "other_reports_137",
        }
      );
      break;
    //#endregion
  }
  return columnConfig;
}

export function getColumnDetail(reportId) {
  let columnConfig = [];
  switch (reportId + "") {
    //#region  การใช้รถขุด
    case "101":
      columnConfig.push(
        {
          column_name: "dtstart",
          column_caption: "other_reports_52",
          column_render: (e) => moment(e.value).format("DD/MM/YYYY HH:mm:ss"),
        },
        {
          column_name: "dtstop",
          column_caption: "other_reports_53",
          column_render: (e) => moment(e.value).format("DD/MM/YYYY HH:mm:ss"),
        },
        {
          column_name: "start_loc",
          column_caption: "other_reports_54",
        },
        {
          column_name: "start_location_gis_tambon",
          column_caption: "other_reports_69",
        },
        {
          column_name: "start_location_gis_amphur",
          column_caption: "other_reports_70",
        },
        {
          column_name: "start_location_gis_province",
          column_caption: "other_reports_71",
        },

        {
          column_name: "stop_loc",
          column_caption: "other_reports_55",
        },
        {
          column_name: "stop_location_gis_tambon",
          column_caption: "other_reports_72",
        },
        {
          column_name: "stop_location_gis_amphur",
          column_caption: "other_reports_73",
        },
        {
          column_name: "stop_location_gis_province",
          column_caption: "other_reports_74",
        },
        {
          column_name: "working_hour",
          column_caption: "other_reports_149",
        },
        {
          column_name: "working_hour_start",
          column_caption: "other_reports_150",
        },
        {
          column_name: "working_hour_stop",
          column_caption: "other_reports_151",
        },
        {
          column_name: "fuel_level",
          column_caption: "other_reports_155",
        },
        // {
        //   column_name: "fuel_used",
        //   column_caption: "other_reports_33",
        // },
        // {
        //   column_name: "fuel_cons",
        //   column_caption: "other_reports_32",
        // },
        {
          column_name: "battery",
          column_caption: "my_vehicles_29",
        },
        {
          column_name: "coolant",
          column_caption: "my_vehicles_33",
        },
        {
          column_name: "hydraulic",
          column_caption: "other_reports_156",
        }
        // {
        //   column_name: "pto_counter",
        //   column_caption: "other_reports_153",
        // }
      );
      break;
    //#endregion

    //#region geofence/driving
    case "102":
      columnConfig.push(
        {
          column_name: "dtstart",
          column_caption: "other_reports_106",
          column_render: (e) => moment(e.value).format("DD/MM/YYYY HH:mm:ss"),
        },
        {
          column_name: "dtstop",
          column_caption: "other_reports_107",
          column_render: (e) => moment(e.value).format("DD/MM/YYYY HH:mm:ss"),
        },
        {
          column_name: "other_reports_148",
          column_caption: "other_reports_148",
        },
        {
          column_name: "geofence_name_stop",
          column_caption: "other_reports_89",
        },
        {
          column_name: "other_reports_151",
          column_caption: "other_reports_151",
        },
        {
          column_name: "other_reports_31",
          column_caption: "other_reports_31",
        },
        {
          column_name: "fuel_used",
          column_caption: "other_reports_33",
        },
        {
          column_name: "fuel_cons",
          column_caption: "other_reports_32",
        },
        {
          column_name: "PTO",
          column_caption: "other_reports_153",
        }
      );
      break;
    //#endregion
  }
  return columnConfig;
}

export function getUrlMaster(reportId) {
  let url = "";
  switch (reportId + "") {
    case "101":
      url = "fleet/report/master/driving";
      break;
    case "102":
      url = "fleet/report/master/geofence/driving";
      break;
  }
  return url;
}

export function getUrlSummary(reportId) {
  let url = "";
  switch (reportId + "") {
    case "101":
      url = "fleet/report/driving";
      break;
    case "102":
      url = "fleet/report/geofence/driving";
      break;
  }
  return url;
}

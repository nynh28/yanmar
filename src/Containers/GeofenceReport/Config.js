import { calculateToDuration } from '../../Functions/DateMoment'
import { numberWithComma } from '../../Functions/Calculation'
import moment from 'moment'
import { t } from '../../Components/Translation'

export function toFixed(value, point) {
  try {
    return value.toFixed(point)
  } catch {
    return value
  }
}

export function getColumnReport(reportId) {
  let columnConfig = []
  switch (reportId) {
    //#region  รายงานเข้าศูนย์ (HINO/ISUSU)
    case "0":
    case "1":
      columnConfig.push(
        {
          column_name: 'customer_name',
          column_caption: "geofence_reports_2"
        },
        {
          column_name: 'customer_tel',
          column_caption: "geofence_reports_3"
        },
        {
          column_name: 'fleet_name',
          column_caption: "geofence_reports_4"
        },
        {
          column_name: 'licenseplate',
          column_caption: "geofence_reports_5"
        },
        {
          column_name: 'vehicle_name',
          column_caption: "geofence_reports_6"
        },
        {
          column_name: 'vin_no',
          column_caption: "geofence_reports_7"
        },
        {
          column_name: 'mileage',
          column_caption: "geofence_reports_8",
          column_render: (e) => numberWithComma(e.value.toFixed(1))
        },
        {
          column_name: 'driver_name',
          column_caption: "geofence_reports_9"
        },
        {
          column_name: 'driver_tel',
          column_caption: "geofence_reports_10"
        },
        {
          column_name: 'event_name',
          column_caption: "geofence_reports_11"
        },
        {
          column_name: 'b_mileage',
          column_caption: "geofence_reports_14",
          column_render: (e) => numberWithComma(e.value.toFixed(1))
        },
        {
          column_name: 'geofence_name',
          column_caption: "geofence_reports_15"
        },
        {
          column_name: 'location_level1',
          column_caption: "geofence_reports_16"
        },
        {
          column_name: 'location_level2',
          column_caption: "geofence_reports_17"
        },
        {
          column_name: 'location_level3',
          column_caption: "geofence_reports_18"
        },
        {
          column_name: 'dtstart',
          column_caption: "geofence_reports_19",
          column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
        },
        {
          column_name: 'dtstop',
          column_caption: "geofence_reports_20",
          column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
        },
        {
          column_name: 'stay_time',
          column_caption: "geofence_reports_21",
          column_render: (e) => calculateToDuration(e.value, 'hideSec')
        },
        {
          column_name: 'engine_lamp',
          column_caption: "geofence_reports_22",
          column_render: (e) => e.value === 1 ? t("realtime_50") : t("realtime_51")
        },
        {
          column_name: 'value_1',
          column_caption: "geofence_reports_23",
          // column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
        },
        {
          column_name: 'value_2',
          column_caption: "geofence_reports_24",
          // column_render: (e) => e.value ? t("Maintenace_9") : ""
        },
        {
          column_name: 'value_3',
          column_caption: "geofence_reports_25"
        },
        {
          column_name: 'note',
          column_caption: "geofence_reports_26"
        }
      )
      break;
    //#endregion
  }
  return columnConfig
}

export function getUrlReport(reportId) {
  let url = ""
  switch (reportId) {
    case "0":
    case "1":
      url = "fleet/report/geofence/servicecenter"
      break;
  }
  return url
}

export function getDefaultDuration(reportId) {
  let duration = 0
  switch (reportId) {
    case "0":
      duration = 72
      break;
    case "1":
      duration = 1
      break;
  }
  return duration
}

export function getEventName(reportId, duration) {
  let getEventName = ""
  switch (reportId) {
    case 0:
      getEventName = "รายงานเข้าศูนย์ HINO นานเกิน " + duration + " ชั่วโมง"
      break;
    case 1:
      getEventName = "รายงานเข้าศูนย์ ISUZU  นานเกิน " + duration + " ชั่วโมง"
      break;
  }
  return getEventName
}

export function mappingData(reportId, data, dict, duration) {
  let result = []
  switch (reportId) {
    case "0":
    case "1":
      data.forEach(dt => {
        result.push({
          "vid": dt[dict.vid],
          "customer_name": dt[dict.customer_name],
          "customer_tel": dt[dict.customer_tel],
          "fleet_name": dt[dict.fleet_name],
          "licenseplate": dt[dict.licenseplate],
          "vehicle_name": dt[dict.vehicle_name],
          "vin_no": dt[dict.vin_no],
          "mileage": dt[dict.mileage],
          "engine_lamp": dt[dict.engine_lamp],
          "note": dt[dict.note],
          "driver_name": dt[dict.driver_name],
          "driver_tel": dt[dict.driver_tel],
          "event_name": getEventName(dt[dict.event_name], duration),
          "geofence_type": dt[dict.geofence_type],
          "geofence_name": dt[dict.geofence_name],
          "location_level1": dt[dict.location_level1],
          "location_level2": dt[dict.location_level2],
          "location_level3": dt[dict.location_level3],
          "dtstart": dt[dict.dtstart],
          "dtstop": dt[dict.dtstop],
          "b_mileage": dt[dict.b_mileage],
          "e_mileage": dt[dict.e_mileage],
          "b_fuel_cons": dt[dict.b_fuel_cons],
          "e_fuel_cons": dt[dict.e_fuel_cons],
          "stay_time": dt[dict.stay_time],
          "fuel_used": dt[dict.fuel_used],
          "fuel_cons": dt[dict.fuel_cons],
          "distance": dt[dict.distance],
          "value_1": "", //วันที่นัดหมายการเข้าศูนย์บริการ
          "value_2": "", //การติดตาม
          "value_3": "", //บอร์โทร (หมายเหตุ 2)
        })
      })
      break;
  }

  return result
}
import { calculateToDuration } from '../../Functions/DateMoment'
import { numberWithComma } from '../../Functions/Calculation'
import moment from 'moment'

export function toFixed(value, point) {
  try {
    return value.toFixed(point)
  } catch {
    return value
  }
}

export function getColumnSummary(reportId) {
  let columnConfig = []
  switch (reportId) {
    //#region  driving
    case "101":
      columnConfig.push(
        {
          column_name: 'fleet_name',
          column_caption: 'other_reports_27'
        },
        {
          column_name: 'licenseplate',
          column_caption: 'other_reports_28'
        },
        {
          column_name: 'vehicle_name',
          column_caption: 'other_reports_29'
        },
        {
          column_name: 'total_distance',
          column_caption: 'other_reports_30',
          // column_render: (e) => numberWithComma(e.value.toFixed(1)),
          column_render: (e) => numberWithComma(toFixed(e.value, 1))
        },
        {
          column_name: 'total_time',
          column_caption: 'other_reports_31', //calculateToDuration
          column_render: (e) => calculateToDuration(e.value, 'hideSec'),
        },
        {
          column_name: 'fuel_cons',
          column_caption: 'other_reports_32',
          // column_render: (e) => e.value.toFixed(2)
          column_render: (e) => toFixed(e.value, 2)

        },
        {
          column_name: 'fuel_used',
          column_caption: 'other_reports_33',
          // column_render: (e) => numberWithComma(e.value.toFixed(2))
          column_render: (e) => numberWithComma(toFixed(e.value, 2))
        },
        {
          column_name: 'speed_max',
          column_caption: 'other_reports_34'
        },
        {
          column_name: 'speed_avg',
          column_caption: 'other_reports_35',
          column_render: (e) => parseInt(e.value)
        },
        {
          column_name: 'speed_limit',
          column_caption: 'other_reports_36'
        },
        {
          column_name: 'overspd_total',
          column_caption: 'other_reports_37'
        },
        {
          column_name: 'overspd_time',
          column_caption: 'other_reports_38'
        },
        {
          column_name: 'overspd_distance',
          column_caption: 'other_reports_39'
        },
        {
          column_name: 'dlt_overspd',
          column_caption: 'other_reports_40'
        },
        {
          column_name: 'dlt_driving4h',
          column_caption: 'other_reports_41'
        },
        {
          column_name: 'dlt_driving8h',
          column_caption: 'other_reports_42'
        },
        {
          column_name: 'dlt_notswipe',
          column_caption: 'other_reports_43'
        },
        {
          column_name: 'dlt_unmached',
          column_caption: 'other_reports_44'
        },
        {
          column_name: 'dlt_unplug',
          column_caption: 'other_reports_45'
        },
        {
          column_name: 'overspd_hino_1',
          column_caption: 'other_reports_46'
        },
        {
          column_name: 'overspd_hino_2',
          column_caption: 'other_reports_47'
        },
        {
          column_name: 'overspd_hino_3',
          column_caption: 'other_reports_48'
        },
        {
          column_name: 'overspd_hino_4',
          column_caption: 'other_reports_49'
        }
      )
      break;
    //#endregion

    //#region overspeed
    case "201":
      columnConfig.push(
        {
          column_name: 'fleet_name',
          column_caption: 'other_reports_27'
        },
        {
          column_name: 'licenseplate',
          column_caption: 'other_reports_28'
        },
        {
          column_name: 'vehicle_name',
          column_caption: 'other_reports_29'
        },
        {
          column_name: 'overtime',
          column_caption: 'other_reports_50'
        },
        {
          column_name: 'total_distance',
          column_caption: 'other_reports_30',
          // column_render: (e) => numberWithComma(e.value.toFixed(1)),
          column_render: (e) => numberWithComma(toFixed(e.value, 1))
        },
        {
          column_name: 'total_time',
          column_caption: 'other_reports_31',
          column_render: (e) => calculateToDuration(e.value, 'hideSec')
        },
        {
          column_name: 'fuel_cons',
          column_caption: 'other_reports_32',
          // column_render: (e) => e.value.toFixed(2)
          column_render: (e) => toFixed(e.value, 2)
        },
        {
          column_name: 'fuel_used',
          column_caption: 'other_reports_33',
          // column_render: (e) => numberWithComma(e.value.toFixed(2))
          column_render: (e) => numberWithComma(toFixed(e.value, 2))

        },
        {
          column_name: 'speed_max',
          column_caption: 'other_reports_34'
        },
        {
          column_name: 'speed_avg',
          column_caption: 'other_reports_35',
          column_render: (e) => parseInt(e.value)
        },
        {
          column_name: 'speed_limit',
          column_caption: 'other_reports_36'
        }
      )
      break;
    //#endregion

    //#region overidling
    case "202":
      columnConfig.push(
        {
          column_name: 'fleet_name',
          column_caption: 'other_reports_27'
        },
        {
          column_name: 'licenseplate',
          column_caption: 'other_reports_28'
        },
        {
          column_name: 'vehicle_name',
          column_caption: 'other_reports_29'
        },
        {
          column_name: 'overtime',
          column_caption: 'other_reports_63'
        },
        {
          column_name: 'total_time',
          column_caption: 'other_reports_64',
          column_render: (e) => calculateToDuration(e.value, 'hideSec')
        },
        {
          column_name: 'fuel_cons',
          column_caption: 'other_reports_32',
          // column_render: (e) => e.value.toFixed(2)
          column_render: (e) => toFixed(e.value, 2)
        },
        {
          column_name: 'fuel_used',
          column_caption: 'other_reports_33',
          // column_render: (e) => numberWithComma(e.value.toFixed(2))
          column_render: (e) => numberWithComma(toFixed(e.value, 2))

        },
        {
          column_name: 'co2',
          column_caption: 'other_reports_51'
        }
      )
      break;
    //#endregion

    //#region overparking
    case "203":
      columnConfig.push(
        {
          column_name: 'fleet_name',
          column_caption: 'other_reports_27'
        },

        {
          column_name: 'licenseplate',
          column_caption: 'other_reports_28'
        },
        {
          column_name: 'vehicle_name',
          column_caption: 'other_reports_29'
        },
        {
          column_name: 'overtime',
          column_caption: 'other_reports_65'
        },
        {
          column_name: 'total_time',
          column_caption: 'other_reports_66',
          column_render: (e) => calculateToDuration(e.value, 'hideSec')
        }
      )
      break;
    //#endregion

    //#region dlt overspeed
    case "301":
      columnConfig.push(
        {
          column_name: 'fleet_name',
          column_caption: 'other_reports_27'
        },
        {
          column_name: 'licenseplate',
          column_caption: 'other_reports_28'
        },
        {
          column_name: 'vehicle_name',
          column_caption: 'other_reports_29'
        },
        {
          column_name: 'overtime',
          column_caption: 'other_reports_50'
        },
        {
          column_name: 'total_distance',
          column_caption: 'other_reports_30',
          // column_render: (e) => numberWithComma(e.value.toFixed(1)),
          column_render: (e) => numberWithComma(toFixed(e.value, 1))

        },
        {
          column_name: 'total_time',
          column_caption: 'other_reports_31',
          column_render: (e) => calculateToDuration(e.value, 'hideSec')
        },
        {
          column_name: 'fuel_cons',
          column_caption: 'other_reports_32',
          // column_render: (e) => e.value.toFixed(2)
          column_render: (e) => toFixed(e.value, 2)

        },
        {
          column_name: 'fuel_used',
          column_caption: 'other_reports_33',
          // column_render: (e) => numberWithComma(e.value.toFixed(2))
          column_render: (e) => numberWithComma(toFixed(e.value, 2))

        },
        {
          column_name: 'speed_max',
          column_caption: 'other_reports_34'
        },
        {
          column_name: 'speed_avg',
          column_caption: 'other_reports_35',
          column_render: (e) => parseInt(e.value)
        },
        {
          column_name: 'speed_limit',
          column_caption: 'other_reports_36'
        }
      )
      break;
    //#endregion

    //#region dlt over4hour
    case "302":
      columnConfig.push(
        {
          column_name: 'fleet_name',
          column_caption: 'other_reports_27'
        },
        {
          column_name: 'licenseplate',
          column_caption: 'other_reports_28'
        },
        {
          column_name: 'vehicle_name',
          column_caption: 'other_reports_29'
        },
        {
          column_name: 'total_distance',
          column_caption: 'other_reports_30',
          // column_render: (e) => numberWithComma(e.value.toFixed(1)),
          column_render: (e) => numberWithComma(toFixed(e.value, 1))
        },
        {
          column_name: 'total_time',
          column_caption: 'other_reports_31',
          column_render: (e) => calculateToDuration(e.value, 'hideSec')
        },
        {
          column_name: 'fuel_cons',
          column_caption: 'other_reports_32',
          // column_render: (e) => e.value.toFixed(2)
          column_render: (e) => toFixed(e.value, 2)
        },
        {
          column_name: 'fuel_used',
          column_caption: 'other_reports_33',
          // column_render: (e) => numberWithComma(e.value.toFixed(2))
          column_render: (e) => numberWithComma(toFixed(e.value, 2))
        },
        {
          column_name: 'speed_max',
          column_caption: 'other_reports_34'
        },
        {
          column_name: 'speed_avg',
          column_caption: 'other_reports_35',
          column_render: (e) => parseInt(e.value)
        }
      )
      break;
    //#endregion

    //#region dlt over8hour
    case "303":
      columnConfig.push(
        {
          column_name: 'fleet_name',
          column_caption: 'other_reports_27'
        },
        {
          column_name: 'licenseplate',
          column_caption: 'other_reports_28'
        },
        {
          column_name: 'vehicle_name',
          column_caption: 'other_reports_29'
        },
        {
          column_name: 'total_distance',
          column_caption: 'other_reports_30',
          // column_render: (e) => numberWithComma(e.value.toFixed(1)),
          column_render: (e) => numberWithComma(toFixed(e.value, 1))
        },
        {
          column_name: 'total_time',
          column_caption: 'other_reports_31',
          column_render: (e) => calculateToDuration(e.value, 'hideSec')
        },
        {
          column_name: 'fuel_cons',
          column_caption: 'other_reports_32',
          // column_render: (e) => e.value.toFixed(2)
          column_render: (e) => toFixed(e.value, 2)
        },
        {
          column_name: 'fuel_used',
          column_caption: 'other_reports_33',
          // column_render: (e) => numberWithComma(e.value.toFixed(2))
          column_render: (e) => numberWithComma(toFixed(e.value, 2))
        },
        {
          column_name: 'speed_max',
          column_caption: 'other_reports_34'
        },
        {
          column_name: 'speed_avg',
          column_caption: 'other_reports_35',
          column_render: (e) => parseInt(e.value)
        }
      )
      break;
    //#endregion

    //#region dlt unknowndriver
    case "304":
      columnConfig.push(
        {
          column_name: 'fleet_name',
          column_caption: 'other_reports_27'
        },
        {
          column_name: 'licenseplate',
          column_caption: 'other_reports_28'
        },
        {
          column_name: 'vehicle_name',
          column_caption: 'other_reports_29'
        },
        {
          column_name: 'total_distance',
          column_caption: 'other_reports_30',
          // column_render: (e) => numberWithComma(e.value.toFixed(1)),
          column_render: (e) => numberWithComma(toFixed(e.value, 1))
        },
        {
          column_name: 'total_time',
          column_caption: 'other_reports_31',
          column_render: (e) => calculateToDuration(e.value, 'hideSec')
        },
        {
          column_name: 'fuel_cons',
          column_caption: 'other_reports_32',
          // column_render: (e) => e.value.toFixed(2)
          column_render: (e) => toFixed(e.value, 2)
        },
        {
          column_name: 'fuel_used',
          column_caption: 'other_reports_33',
          // column_render: (e) => numberWithComma(e.value.toFixed(2))
          column_render: (e) => numberWithComma(toFixed(e.value, 2))
        },
        {
          column_name: 'speed_max',
          column_caption: 'other_reports_34'
        },
        {
          column_name: 'speed_avg',
          column_caption: 'other_reports_35',
          column_render: (e) => parseInt(e.value)
        }
      )
      break;
    //#endregion

    //#region dlt wrongtype
    case "305":
      columnConfig.push(
        {
          column_name: 'fleet_name',
          column_caption: 'other_reports_27'
        },
        {
          column_name: 'licenseplate',
          column_caption: 'other_reports_28'
        },
        {
          column_name: 'vehicle_name',
          column_caption: 'other_reports_29'
        },
        {
          column_name: 'total_distance',
          column_caption: 'other_reports_30',
          // column_render: (e) => numberWithComma(e.value.toFixed(1)),
          column_render: (e) => numberWithComma(toFixed(e.value, 1))
        },
        {
          column_name: 'total_time',
          column_caption: 'other_reports_31',
          column_render: (e) => calculateToDuration(e.value, 'hideSec')
        },
        {
          column_name: 'fuel_cons',
          column_caption: 'other_reports_32',
          // column_render: (e) => e.value.toFixed(2)
          column_render: (e) => toFixed(e.value, 2)
        },
        {
          column_name: 'fuel_used',
          column_caption: 'other_reports_33',
          // column_render: (e) => numberWithComma(e.value.toFixed(2))
          column_render: (e) => numberWithComma(toFixed(e.value, 2))
        },
        {
          column_name: 'speed_max',
          column_caption: 'other_reports_34'
        },
        {
          column_name: 'speed_avg',
          column_caption: 'other_reports_35',
          column_render: (e) => parseInt(e.value)
        }
      )
      break;
    //#endregion

    //#region dlt rejectgps
    case "306":
      columnConfig.push(
        {
          column_name: 'fleet_name',
          column_caption: 'other_reports_27'
        },
        {
          column_name: 'licenseplate',
          column_caption: 'other_reports_28'
        },
        {
          column_name: 'vehicle_name',
          column_caption: 'other_reports_29'
        },
        {
          column_name: 'total_distance',
          column_caption: 'other_reports_30',
          // column_render: (e) => numberWithComma(e.value.toFixed(1)),
          column_render: (e) => numberWithComma(toFixed(e.value, 1))
        },
        {
          column_name: 'total_time',
          column_caption: 'other_reports_31',
          column_render: (e) => calculateToDuration(e.value, 'hideSec')
        },
        {
          column_name: 'fuel_cons',
          column_caption: 'other_reports_32',
          // column_render: (e) => e.value.toFixed(2)
          column_render: (e) => toFixed(e.value, 2)
        },
        {
          column_name: 'fuel_used',
          column_caption: 'other_reports_33',
          // column_render: (e) => numberWithComma(e.value.toFixed(2))
          column_render: (e) => numberWithComma(toFixed(e.value, 2))
        },
        {
          column_name: 'speed_max',
          column_caption: 'other_reports_34'
        },
        {
          column_name: 'speed_avg',
          column_caption: 'other_reports_35',
          column_render: (e) => parseInt(e.value)
        }
      )
      break;
    //#endregion

    //#region geofence/driving
    case "401":
      columnConfig.push(
        {
          column_name: 'fleet_name',
          column_caption: 'other_reports_27'
        },
        {
          column_name: 'licenseplate',
          column_caption: 'other_reports_28'
        },
        {
          column_name: 'vehicle_name',
          column_caption: 'other_reports_29'
        },
        {
          column_name: 'dtstart',
          column_caption: 'other_reports_106',
          visible: false
        },
        {
          column_name: 'dtstop',
          column_caption: 'other_reports_107',
          visible: false
        },
        {
          column_name: 'distance',
          column_caption: 'other_reports_77'
        },
        {
          column_name: 'fuel_cons',
          column_caption: 'other_reports_32',
          // column_render: (e) => e.value.toFixed(2)
          column_render: (e) => toFixed(e.value, 2)
        },
        {
          column_name: 'fuel_used',
          column_caption: 'other_reports_33'
        },
        {
          column_name: 'mileage_start',
          column_caption: 'other_reports_78'
        },
        {
          column_name: 'mileage_stop',
          column_caption: 'other_reports_79'
        },
        {
          column_name: 'speed_limit',
          column_caption: 'other_reports_36'
        },
        {
          column_name: 'stay_time',
          column_caption: 'other_reports_80',
          column_render: (e) => calculateToDuration(e.value, 'hideSec')
        },
        {
          column_name: 'travel_time',
          column_caption: 'other_reports_81',
          column_render: (e) => calculateToDuration(e.value, 'hideSec')
        },
        {
          column_name: 'count',
          column_caption: 'other_reports_137'
        }
      )
      break;
    //#endregion

    //#region Insurance Report
    case "402":
      columnConfig.push(
        {
          column_name: 'vin_no',
          column_caption: 'other_reports_123',
          fixed: true,
          fixedPosition: 'left',
          column_render: (e) => numberWithComma(e.value)
        },
        {
          column_name: 'vid',
          column_caption: 'other_reports_18',
          fixed: true,
          fixedPosition: 'left'
        },
        {
          column_name: 'customer_name',
          column_caption: 'other_reports_127',
          fixed: true,
          fixedPosition: 'left'
        },
        {
          column_caption: 'other_reports_128',
          subTable: [
            {
              column_name: 'g_sensor.x',
              column_caption: 'other_reports_129'
            },
            {
              column_name: 'g_sensor.y',
              column_caption: 'other_reports_130'
            },
            {
              column_name: 'g_sensor.z',
              column_caption: 'other_reports_131'
            }
          ]
        },
        {
          column_caption: 'other_reports_132',
          subTable: [
            {
              column_name: 'alarm.sudden_start',
              column_caption: 'other_reports_133'
            },
            {
              column_name: 'alarm.sudden_accelerator',
              column_caption: 'other_reports_134'
            },
            {
              column_name: 'alarm.sudden_brake',
              column_caption: 'other_reports_135'
            },
            {
              column_name: 'alarm.sudden_turn',
              column_caption: 'other_reports_136'
            }
          ]
        },
        {
          column_name: 'distance',
          column_caption: 'other_reports_124',
          column_render: (e) => numberWithComma(e.value)
        },
        {
          column_name: 'date_start',
          column_caption: 'other_reports_125',
          column_render: (e) => moment(e.value).format('DD/MM/YYYY'),
          // column_render: (e) => { return "XXXXXXXXXXX" },
        },
        {
          column_name: 'date_end',
          column_caption: 'other_reports_126',
          column_render: (e) => moment(e.value).format('DD/MM/YYYY'),
        }
      )
      break;
    //#endregion

  }
  return columnConfig
}

export function getColumnDetail(reportId) {
  let columnConfig = []
  switch (reportId) {
    //#region  driving
    case "101":
      columnConfig.push(
        {
          column_name: 'dtstart',
          column_caption: 'other_reports_52',
          column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
        },
        {
          column_name: 'dtstop',
          column_caption: 'other_reports_53',
          column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
        },
        {
          column_name: 'start_loc',
          column_caption: 'other_reports_54'
        },
        {
          column_name: 'start_location_gis_tambon',
          column_caption: 'other_reports_69'
        },
        {
          column_name: 'start_location_gis_amphur',
          column_caption: 'other_reports_70'
        },
        {
          column_name: 'start_location_gis_province',
          column_caption: 'other_reports_71'
        },
        // {
        //   column_name: 'start_geofence',
        //   column_caption: 'other_reports_75'
        // },
        {
          column_name: 'stop_loc',
          column_caption: 'other_reports_55'
        },
        {
          column_name: 'stop_location_gis_tambon',
          column_caption: 'other_reports_72'
        },
        {
          column_name: 'stop_location_gis_amphur',
          column_caption: 'other_reports_73'
        },
        {
          column_name: 'stop_location_gis_province',
          column_caption: 'other_reports_74'
        },
        // {
        //   column_name: 'stop_geofence',
        //   column_caption: 'other_reports_76'
        // },
        {
          column_name: 'start_mileage',
          column_caption: 'other_reports_56',
          column_render: (e) => numberWithComma(e.value.toFixed(1))
        },
        {
          column_name: 'stop_mileage',
          column_caption: 'other_reports_57',
          column_render: (e) => numberWithComma(e.value.toFixed(1))
        },
        {
          column_name: 'total_distance',
          column_caption: 'other_reports_30',
          column_render: (e) => numberWithComma(e.value.toFixed(1)),
        },
        {
          column_name: 'total_time',
          column_caption: 'other_reports_31',
          column_render: (e) => calculateToDuration(e.value, 'hideSec')
        },
        {
          column_name: 'fuel_cons',
          column_caption: 'other_reports_32',
          column_render: (e) => e.value.toFixed(2)
        },
        {
          column_name: 'fuel_used',
          column_caption: 'other_reports_33',
          column_render: (e) => numberWithComma(e.value.toFixed(2))
        },
        {
          column_name: 'speed_max',
          column_caption: 'other_reports_34'
        },
        {
          column_name: 'speed_avg',
          column_caption: 'other_reports_35',
          column_render: (e) => parseInt(e.value)
        },
        {
          column_name: 'speed_limit',
          column_caption: 'other_reports_36'
        }
      )
      break;
    //#endregion

    //#region overspeed
    case "201":
      columnConfig.push(
        {
          column_name: 'dtstart',
          column_caption: 'other_reports_52',
          column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
        },
        {
          column_name: 'dtstop',
          column_caption: 'other_reports_53',
          column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
        },
        {
          column_name: 'start_loc',
          column_caption: 'other_reports_54'
        },
        {
          column_name: 'start_location_gis_tambon',
          column_caption: 'other_reports_69'
        },
        {
          column_name: 'start_location_gis_amphur',
          column_caption: 'other_reports_70'
        },
        {
          column_name: 'start_location_gis_province',
          column_caption: 'other_reports_71'
        },
        {
          column_name: 'stop_loc',
          column_caption: 'other_reports_55'
        },
        {
          column_name: 'stop_location_gis_tambon',
          column_caption: 'other_reports_72'
        },
        {
          column_name: 'stop_location_gis_amphur',
          column_caption: 'other_reports_73'
        },
        {
          column_name: 'stop_location_gis_province',
          column_caption: 'other_reports_74'
        },
        {
          column_name: 'start_mileage',
          column_caption: 'other_reports_56',
          column_render: (e) => numberWithComma(e.value.toFixed(1))
        },
        {
          column_name: 'stop_mileage',
          column_caption: 'other_reports_57',
          column_render: (e) => numberWithComma(e.value.toFixed(1))
        },
        {
          column_name: 'total_distance',
          column_caption: 'other_reports_30',
          column_render: (e) => numberWithComma(e.value.toFixed(1)),
        },
        {
          column_name: 'total_time',
          column_caption: 'other_reports_31',
          column_render: (e) => calculateToDuration(e.value, 'hideSec')
        },
        {
          column_name: 'fuel_cons',
          column_caption: 'other_reports_32',
          column_render: (e) => e.value.toFixed(2)
        },
        {
          column_name: 'fuel_used',
          column_caption: 'other_reports_33',
          column_render: (e) => numberWithComma(e.value.toFixed(2))
        },
        {
          column_name: 'speed_max',
          column_caption: 'other_reports_34'
        },
        {
          column_name: 'speed_avg',
          column_caption: 'other_reports_35',
          column_render: (e) => parseInt(e.value)
        },
        {
          column_name: 'speed_limit',
          column_caption: 'other_reports_36'
        }
      )
      break;
    //#endregion

    //#region overidling
    case "202":
      columnConfig.push(
        {
          column_name: 'dtstart',
          column_caption: 'other_reports_52',
          column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
        },
        {
          column_name: 'dtstop',
          column_caption: 'other_reports_53',
          column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
        },
        {
          column_name: 'location',
          column_caption: 'other_reports_58'
        },
        {
          column_name: 'start_location_gis_tambon',
          column_caption: 'other_reports_69'
        },
        {
          column_name: 'start_location_gis_amphur',
          column_caption: 'other_reports_70'
        },
        {
          column_name: 'start_location_gis_province',
          column_caption: 'other_reports_71'
        },
        {
          column_name: 'total_time',
          column_caption: 'other_reports_64',
          column_render: (e) => calculateToDuration(e.value, 'hideSec')
        },
        // {
        //   column_name: 'fuel_used',
        //   column_caption: 'other_reports_32',
        //   column_render: (e) => e.value.toFixed(2)
        // },
        {
          column_name: 'fuel_used',
          column_caption: 'other_reports_33',
          column_render: (e) => numberWithComma(e.value.toFixed(2))
        },
        {
          column_name: 'co2',
          column_caption: 'other_reports_51'
        }
      )
      break;
    //#endregion

    //#region overparking
    case "203":
      columnConfig.push(
        {
          column_name: 'dtstart',
          column_caption: 'other_reports_52',
          column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
        },
        {
          column_name: 'dtstop',
          column_caption: 'other_reports_53',
          column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
        },
        {
          column_name: 'location',
          column_caption: 'other_reports_58'
        },
        {
          column_name: 'start_location_gis_tambon',
          column_caption: 'other_reports_69'
        },
        {
          column_name: 'start_location_gis_amphur',
          column_caption: 'other_reports_70'
        },
        {
          column_name: 'start_location_gis_province',
          column_caption: 'other_reports_71'
        },
        {
          column_name: 'total_time',
          column_caption: 'other_reports_66',
          column_render: (e) => calculateToDuration(e.value, 'hideSec')
        }
      )
      break;
    //#endregion

    //#region dlt overspeed
    case "301":
      columnConfig.push(
        {
          column_name: 'dtstart',
          column_caption: 'other_reports_52',
          column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
        },
        {
          column_name: 'dtstop',
          column_caption: 'other_reports_53',
          column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
        },
        {
          column_name: 'start_loc',
          column_caption: 'other_reports_54'
        },
        {
          column_name: 'start_location_gis_tambon',
          column_caption: 'other_reports_69'
        },
        {
          column_name: 'start_location_gis_amphur',
          column_caption: 'other_reports_70'
        },
        {
          column_name: 'start_location_gis_province',
          column_caption: 'other_reports_71'
        },
        {
          column_name: 'stop_loc',
          column_caption: 'other_reports_55'
        },
        {
          column_name: 'stop_location_gis_tambon',
          column_caption: 'other_reports_72'
        },
        {
          column_name: 'stop_location_gis_amphur',
          column_caption: 'other_reports_73'
        },
        {
          column_name: 'stop_location_gis_province',
          column_caption: 'other_reports_74'
        },
        {
          column_name: 'start_mileage',
          column_caption: 'other_reports_56',
          column_render: (e) => numberWithComma(e.value.toFixed(1))
        },
        {
          column_name: 'stop_mileage',
          column_caption: 'other_reports_57',
          column_render: (e) => numberWithComma(e.value.toFixed(1))
        },
        {
          column_name: 'total_distance',
          column_caption: 'other_reports_30',
          column_render: (e) => numberWithComma(e.value.toFixed(1)),
        },
        {
          column_name: 'total_time',
          column_caption: 'other_reports_31',
          column_render: (e) => calculateToDuration(e.value, 'hideSec')
        },
        {
          column_name: 'fuel_cons',
          column_caption: 'other_reports_32',
          column_render: (e) => e.value.toFixed(2)
        },
        {
          column_name: 'fuel_used',
          column_caption: 'other_reports_33',
          column_render: (e) => numberWithComma(e.value.toFixed(2))
        },
        {
          column_name: 'speed_max',
          column_caption: 'other_reports_34'
        },
        {
          column_name: 'speed_avg',
          column_caption: 'other_reports_35',
          column_render: (e) => parseInt(e.value)
        },
        {
          column_name: 'speed_limit',
          column_caption: 'other_reports_36'
        }
      )
      break;
    //#endregion

    //#region dlt over4hour
    case "302":
      columnConfig.push(
        {
          column_name: 'dtstart',
          column_caption: 'other_reports_52',
          column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
        },
        {
          column_name: 'dtstop',
          column_caption: 'other_reports_53',
          column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
        },
        {
          column_name: 'start_loc',
          column_caption: 'other_reports_54'
        },
        {
          column_name: 'start_location_gis_tambon',
          column_caption: 'other_reports_69'
        },
        {
          column_name: 'start_location_gis_amphur',
          column_caption: 'other_reports_70'
        },
        {
          column_name: 'start_location_gis_province',
          column_caption: 'other_reports_71'
        },
        {
          column_name: 'stop_loc',
          column_caption: 'other_reports_55'
        },
        {
          column_name: 'stop_location_gis_tambon',
          column_caption: 'other_reports_72'
        },
        {
          column_name: 'stop_location_gis_amphur',
          column_caption: 'other_reports_73'
        },
        {
          column_name: 'stop_location_gis_province',
          column_caption: 'other_reports_74'
        },
        {
          column_name: 'start_mileage',
          column_caption: 'other_reports_56',
          column_render: (e) => numberWithComma(e.value.toFixed(1))
        },
        {
          column_name: 'stop_mileage',
          column_caption: 'other_reports_57',
          column_render: (e) => numberWithComma(e.value.toFixed(1))
        },
        {
          column_name: 'total_distance',
          column_caption: 'other_reports_30',
          column_render: (e) => numberWithComma(e.value.toFixed(1)),
        },
        {
          column_name: 'total_time',
          column_caption: 'other_reports_31',
          column_render: (e) => calculateToDuration(e.value, 'hideSec')
        },
        {
          column_name: 'fuel_cons',
          column_caption: 'other_reports_32',
          column_render: (e) => e.value.toFixed(2)
        },
        {
          column_name: 'fuel_used',
          column_caption: 'other_reports_33',
          column_render: (e) => numberWithComma(e.value.toFixed(2))
        },
        {
          column_name: 'speed_max',
          column_caption: 'other_reports_34'
        },
        {
          column_name: 'speed_avg',
          column_caption: 'other_reports_35',
          column_render: (e) => parseInt(e.value)
        },
        {
          column_name: 'speed_limit',
          column_caption: 'other_reports_36'
        }
      )
      break;
    //#endregion

    //#region dlt over8hour
    case "303":
      columnConfig.push(
        {
          column_name: 'dtstart',
          column_caption: 'other_reports_52',
          column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
        },
        {
          column_name: 'dtstop',
          column_caption: 'other_reports_53',
          column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
        },
        {
          column_name: 'start_loc',
          column_caption: 'other_reports_54'
        },
        {
          column_name: 'start_location_gis_tambon',
          column_caption: 'other_reports_69'
        },
        {
          column_name: 'start_location_gis_amphur',
          column_caption: 'other_reports_70'
        },
        {
          column_name: 'start_location_gis_province',
          column_caption: 'other_reports_71'
        },
        {
          column_name: 'stop_loc',
          column_caption: 'other_reports_55'
        },
        {
          column_name: 'stop_location_gis_tambon',
          column_caption: 'other_reports_72'
        },
        {
          column_name: 'stop_location_gis_amphur',
          column_caption: 'other_reports_73'
        },
        {
          column_name: 'stop_location_gis_province',
          column_caption: 'other_reports_74'
        },
        {
          column_name: 'start_mileage',
          column_caption: 'other_reports_56',
          column_render: (e) => numberWithComma(e.value.toFixed(1))
        },
        {
          column_name: 'stop_mileage',
          column_caption: 'other_reports_57',
          column_render: (e) => numberWithComma(e.value.toFixed(1))
        },
        {
          column_name: 'total_distance',
          column_caption: 'other_reports_30',
          column_render: (e) => numberWithComma(e.value.toFixed(1)),
        },
        {
          column_name: 'total_time',
          column_caption: 'other_reports_31',
          column_render: (e) => calculateToDuration(e.value, 'hideSec')
        },
        {
          column_name: 'fuel_cons',
          column_caption: 'other_reports_32',
          column_render: (e) => e.value.toFixed(2)
        },
        {
          column_name: 'fuel_used',
          column_caption: 'other_reports_33',
          column_render: (e) => numberWithComma(e.value.toFixed(2))
        },
        {
          column_name: 'speed_max',
          column_caption: 'other_reports_34'
        },
        {
          column_name: 'speed_avg',
          column_caption: 'other_reports_35',
          column_render: (e) => parseInt(e.value)
        },
        {
          column_name: 'speed_limit',
          column_caption: 'other_reports_36'
        }
      )
      break;
    //#endregion

    //#region dlt unknowndriver
    case "304":
      columnConfig.push(
        {
          column_name: 'dtstart',
          column_caption: 'other_reports_52',
          column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
        },
        {
          column_name: 'dtstop',
          column_caption: 'other_reports_53',
          column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
        },
        {
          column_name: 'start_loc',
          column_caption: 'other_reports_54'
        },

        {
          column_name: 'start_location_gis_tambon',
          column_caption: 'other_reports_69'
        },
        {
          column_name: 'start_location_gis_amphur',
          column_caption: 'other_reports_70'
        },
        {
          column_name: 'start_location_gis_province',
          column_caption: 'other_reports_71'
        },
        {
          column_name: 'stop_loc',
          column_caption: 'other_reports_55'
        },
        {
          column_name: 'stop_location_gis_tambon',
          column_caption: 'other_reports_72'
        },
        {
          column_name: 'stop_location_gis_amphur',
          column_caption: 'other_reports_73'
        },
        {
          column_name: 'stop_location_gis_province',
          column_caption: 'other_reports_74'
        },
        {
          column_name: 'start_mileage',
          column_caption: 'other_reports_56',
          column_render: (e) => numberWithComma(e.value.toFixed(1))
        },
        {
          column_name: 'stop_mileage',
          column_caption: 'other_reports_57',
          column_render: (e) => numberWithComma(e.value.toFixed(1))
        },
        {
          column_name: 'total_distance',
          column_caption: 'other_reports_30',
          column_render: (e) => numberWithComma(e.value.toFixed(1)),
        },
        {
          column_name: 'total_time',
          column_caption: 'other_reports_31',
          column_render: (e) => calculateToDuration(e.value, 'hideSec')
        },
        {
          column_name: 'fuel_cons',
          column_caption: 'other_reports_32',
          column_render: (e) => e.value.toFixed(2)
        },
        {
          column_name: 'fuel_used',
          column_caption: 'other_reports_33',
          column_render: (e) => numberWithComma(e.value.toFixed(2))
        },
        {
          column_name: 'speed_max',
          column_caption: 'other_reports_34'
        },
        {
          column_name: 'speed_avg',
          column_caption: 'other_reports_35',
          column_render: (e) => parseInt(e.value)
        },
        {
          column_name: 'speed_limit',
          column_caption: 'other_reports_36'
        }
      )
      break;
    //#endregion

    //#region dlt wrongtype
    case "305":
      columnConfig.push(
        {
          column_name: 'dtstart',
          column_caption: 'other_reports_52',
          column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
        },
        {
          column_name: 'dtstop',
          column_caption: 'other_reports_53',
          column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
        },
        {
          column_name: 'start_loc',
          column_caption: 'other_reports_54'
        },
        {
          column_name: 'start_location_gis_tambon',
          column_caption: 'other_reports_69'
        },
        {
          column_name: 'start_location_gis_amphur',
          column_caption: 'other_reports_70'
        },
        {
          column_name: 'start_location_gis_province',
          column_caption: 'other_reports_71'
        },
        {
          column_name: 'stop_loc',
          column_caption: 'other_reports_55'
        },
        {
          column_name: 'stop_location_gis_tambon',
          column_caption: 'other_reports_72'
        },
        {
          column_name: 'stop_location_gis_amphur',
          column_caption: 'other_reports_73'
        },
        {
          column_name: 'stop_location_gis_province',
          column_caption: 'other_reports_74'
        },
        {
          column_name: 'start_mileage',
          column_caption: 'other_reports_56',
          column_render: (e) => numberWithComma(e.value.toFixed(1))
        },
        {
          column_name: 'stop_mileage',
          column_caption: 'other_reports_57',
          column_render: (e) => numberWithComma(e.value.toFixed(1))
        },
        {
          column_name: 'total_distance',
          column_caption: 'other_reports_30',
          column_render: (e) => numberWithComma(e.value.toFixed(1)),
        },
        {
          column_name: 'total_time',
          column_caption: 'other_reports_31',
          column_render: (e) => calculateToDuration(e.value, 'hideSec')
        },
        {
          column_name: 'fuel_cons',
          column_caption: 'other_reports_32',
          column_render: (e) => e.value.toFixed(2)
        },
        {
          column_name: 'fuel_used',
          column_caption: 'other_reports_33',
          column_render: (e) => numberWithComma(e.value.toFixed(2))
        },
        {
          column_name: 'speed_max',
          column_caption: 'other_reports_34'
        },
        {
          column_name: 'speed_avg',
          column_caption: 'other_reports_35',
          column_render: (e) => parseInt(e.value)
        },
        {
          column_name: 'speed_limit',
          column_caption: 'other_reports_36'
        }
      )
      break;
    //#endregion

    //#region dlt rejectgps
    case "306":
      columnConfig.push(
        {
          column_name: 'dtstart',
          column_caption: 'other_reports_52',
          column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
        },
        {
          column_name: 'dtstop',
          column_caption: 'other_reports_53',
          column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
        },
        {
          column_name: 'start_loc',
          column_caption: 'other_reports_54'
        },
        {
          column_name: 'start_location_gis_tambon',
          column_caption: 'other_reports_69'
        },
        {
          column_name: 'start_location_gis_amphur',
          column_caption: 'other_reports_70'
        },
        {
          column_name: 'start_location_gis_province',
          column_caption: 'other_reports_71'
        },
        {
          column_name: 'stop_loc',
          column_caption: 'other_reports_55'
        },
        {
          column_name: 'stop_location_gis_tambon',
          column_caption: 'other_reports_72'
        },
        {
          column_name: 'stop_location_gis_amphur',
          column_caption: 'other_reports_73'
        },
        {
          column_name: 'stop_location_gis_province',
          column_caption: 'other_reports_74'
        },
        {
          column_name: 'start_mileage',
          column_caption: 'other_reports_56',
          column_render: (e) => numberWithComma(e.value.toFixed(1))
        },
        {
          column_name: 'stop_mileage',
          column_caption: 'other_reports_57',
          column_render: (e) => numberWithComma(e.value.toFixed(1))
        },
        {
          column_name: 'total_distance',
          column_caption: 'other_reports_30',
          column_render: (e) => numberWithComma(e.value.toFixed(1)),
        },
        {
          column_name: 'total_time',
          column_caption: 'other_reports_31',
          column_render: (e) => calculateToDuration(e.value, 'hideSec')
        },
        {
          column_name: 'fuel_cons',
          column_caption: 'other_reports_32',
          column_render: (e) => e.value.toFixed(2)
        },
        {
          column_name: 'fuel_used',
          column_caption: 'other_reports_33',
          column_render: (e) => numberWithComma(e.value.toFixed(2))
        },
        {
          column_name: 'speed_max',
          column_caption: 'other_reports_34'
        },
        {
          column_name: 'speed_avg',
          column_caption: 'other_reports_35',
          column_render: (e) => parseInt(e.value)
        },
        {
          column_name: 'speed_limit',
          column_caption: 'other_reports_36'
        }
      )
      break;
    //#endregion

    //#region geofence/driving
    case "401":
      columnConfig.push(
        {
          column_name: 'dtstart',
          column_caption: 'other_reports_106',
          column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
        },
        {
          column_name: 'dtstop',
          column_caption: 'other_reports_107',
          column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
        },
        {
          column_name: 'geofence_type_start',
          column_caption: 'other_reports_82',
          visible: false
        },
        {
          column_name: 'geofence_name_start',
          column_caption: 'other_reports_83'
        },
        {
          column_name: 'gis_level1_start',
          column_caption: 'other_reports_84',
          visible: false
        },
        {
          column_name: 'gis_level2_start',
          column_caption: 'other_reports_85',
          visible: false
        },
        {
          column_name: 'gis_level3_start',
          column_caption: 'other_reports_86',
          visible: false
        },
        {
          column_name: 'mileage_start',
          column_caption: 'other_reports_87'
        },
        {
          column_name: 'geofence_type_stop',
          column_caption: 'other_reports_88',
          visible: false
        },
        {
          column_name: 'geofence_name_stop',
          column_caption: 'other_reports_89'
        },
        {
          column_name: 'gis_level1_stop',
          column_caption: 'other_reports_90',
          visible: false
        },
        {
          column_name: 'gis_level2_stop',
          column_caption: 'other_reports_91',
          visible: false
        },
        {
          column_name: 'gis_level3_stop',
          column_caption: 'other_reports_92',
          visible: false
        },
        {
          column_name: 'mileage_stop',
          column_caption: 'other_reports_93'
        },
        {
          column_name: 'over_speed_count',
          column_caption: 'other_reports_108'
        },
        {
          column_name: 'speed_avg',
          column_caption: 'other_reports_100'
        },
        {
          column_name: 'speed_max',
          column_caption: 'other_reports_101'
        },
        {
          column_name: 'over_speed_time',
          column_caption: 'other_reports_94',
          column_render: (e) => calculateToDuration(e.value, 'hideSec')
        },
        {
          column_name: 'travel_time',
          column_caption: 'other_reports_97',
          column_render: (e) => calculateToDuration(e.value, 'hideSec')
        },
        {
          column_name: 'fuel_used',
          column_caption: 'other_reports_33',
          column_render: (e) => numberWithComma(e.value.toFixed(2))
        },
        {
          column_name: 'fuel_cons',
          column_caption: 'other_reports_32',
          column_render: (e) => e.value.toFixed(2)
        },
        {
          column_name: 'distance',
          column_caption: 'other_reports_77'
        },
        {
          column_name: 'over_speed_60_count',
          column_caption: 'other_reports_102'
        },
        {
          column_name: 'over_speed_80_count',
          column_caption: 'other_reports_103'
        },
        {
          column_name: 'over_speed_100_count',
          column_caption: 'other_reports_104'
        },
        {
          column_name: 'over_speed_120_count',
          column_caption: 'other_reports_105'
        }
      )
      break;
    //#endregion
  }
  return columnConfig
}

export function getUrlMaster(reportId) {
  let url = ""
  switch (reportId) {
    case "101":
      url = "fleet/report/master/driving"
      break;
    case "201":
      url = "fleet/report/master/overspeed"
      break;
    case "202":
      url = "fleet/report/master/overidling"
      break;
    case "203":
      url = "fleet/report/master/overparking"
      break;
    case "301":
      url = "fleet/report/master/dlt/overspeed"
      break;
    case "302":
      url = "fleet/report/master/dlt/over4hour"
      break;
    case "303":
      url = "fleet/report/master/dlt/over8hour"
      break;
    case "304":
      url = "fleet/report/master/dlt/unknowndriver"
      break;
    case "305":
      url = "fleet/report/master/dlt/wrongtype"
      break;
    case "306":
      url = "fleet/report/master/dlt/rejectgps"
      break;
    case "401":
      url = "fleet/report/master/geofence/driving"
      break;
    case "402":
      url = "fleet/report/master/insurance"
      break;
  }
  return url
}

export function getUrlSummary(reportId) {
  let url = ""
  switch (reportId) {
    case "101":
      url = "fleet/report/driving"
      break;
    case "201":
      url = "fleet/report/overspeed"
      break;
    case "202":
      url = "fleet/report/overidling"
      break;
    case "203":
      url = "fleet/report/overparking"
      break;
    case "301":
      url = "fleet/report/dlt/overspeed"
      break;
    case "302":
      url = "fleet/report/dlt/over4hour"
      break;
    case "303":
      url = "fleet/report/dlt/over8hour"
      break;
    case "304":
      url = "fleet/report/dlt/unknowndriver"
      break;
    case "305":
      url = "fleet/report/dlt/wrongtype"
      break;
    case "306":
      url = "fleet/report/dlt/rejectgps"
      break;
    case "401":
      url = "fleet/report/geofence/driving"
      break;
    case "402":
      url = "fleet/report/insurance"
      break;
  }
  return url
}

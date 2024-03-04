import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux'
import { get } from 'lodash'
import { t } from '../../../Components/Translation'
import { momentDate, calculateToDuration } from '../../../Functions/DateMoment'
import { numberWithComma } from '../../../Functions/Calculation'
import { getEventIcon } from '../Functions'
import { renderToString } from 'react-dom/server'
// import ReactExport from "react-export-excel";
import ReactExport from 'react-data-export';
import XLSX from 'xlsx';
import ExcelJS from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import moment from 'moment';
import { exportExcel } from '../../../Functions/ExportExcel'
import { getSum, getAvg, getEventName } from '../Functions'
import { Button } from '../../../components_new'
// import { ExcelFile, ExcelSheet } from "react-export-excel";


const mySuspense = (<Suspense />).type;


class TripExport extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  statusName(speed) {
    let { language } = this.props

    let name = ''
    let speed_limit = 60

    if (speed_limit > 0 && speed > speed_limit) name = language == "en" ? 'Over Speed' : 'ความเร็วเกิน 60 กม./ชม.'
    else if (speed <= 2) name = language == "en" ? 'Idling' : 'จอดไม่ดับเครื่อง'
    else name = language == "en" ? 'Driving' : 'วิ่ง'

    return name
  }



  addFieldSubEvent(dataTrips) {
    let result = []
    dataTrips.map((item, index) => {
      let newData = []
      newData.push(item)

      let lastGeofence = ""
      if (item[2] === 1) {
        const getLastGeofence = (idx) => {
          let location = "", idxStartDriving = idx
          while (idxStartDriving < dataTrips.length) {
            if (dataTrips[idxStartDriving][2] === 2000) {
              location = dataTrips[(idxStartDriving - 1)][3]
              break;
            }
            idxStartDriving++
          }

          return location
        }
        lastGeofence = getLastGeofence(index)
      }
      // else if ([3, 2000].includes(item[2])) {
      //   lastGeofence = item[3]
      // }

      if ([1].includes(item[2])) { // IS STATUS
        newData[0].push(item[21])   // สถานะ
        newData[0].push("")   // เหตุการณ์ [sub]
        newData[0].push(lastGeofence) // จีโอเฟนซ์สิ้นสุด
        newData[0].push(item[8])    // เวลารวม
        newData[0].push("")    // เวลาที่ใช้ [sub]
        newData[0].push(item[9])    // ระยะทาง (กม.)
        newData[0].push("")    // ระยะทาง (กม.) [sub]
        newData[0].push(item[19])    // เลขกิโลเมตรเริ่มต้น (กม.)
        newData[0].push(item[20])    // เลขกิโลเมตรสิ้นสุด (กม.)
        newData[0].push("")    // เลขกิโลเมตรเริ่มต้น (กม.)   [sub]
        newData[0].push("")   // เลขกิโลเมตรสิ้นสุด (กม.) [sub]
        newData[0].push(item[10])    // ปริมาณการใช้น้ำมัน (ลิตร)
        newData[0].push("")    // ปริมาณการใช้น้ำมัน (ลิตร) [sub]
      }
      else { // IS EVENT
        newData[0].push("")   // สถานะ
        newData[0].push(item[21])   // เหตุการณ์ [sub]
        newData[0].push(lastGeofence) // จีโอเฟนซ์สิ้นสุด
        newData[0].push("")    // เวลารวม
        newData[0].push(item[8])    // เวลาที่ใช้ [sub]
        newData[0].push("")    // ระยะทาง (กม.)
        newData[0].push(item[9])    // ระยะทาง (กม.) [sub]
        newData[0].push("")    // เลขกิโลเมตรเริ่มต้น (กม.)
        newData[0].push("")    // เลขกิโลเมตรสิ้นสุด (กม.)
        newData[0].push(item[19])   // เลขกิโลเมตรเริ่มต้น (กม.)   [sub]
        newData[0].push(item[20])    // เลขกิโลเมตรสิ้นสุด (กม.) [sub]
        newData[0].push("")    // ปริมาณการใช้น้ำมัน (ลิตร)
        newData[0].push(item[10])    // ปริมาณการใช้น้ำมัน (ลิตร) [sub]
      }

      result.push(...newData)
    })

    return result
  }

  setupExport() {
    let { indexTripSelected, listMembers, vin_no, dateStart, dateEnd, dataTrips } = this.props

    let data = this.addFieldSubEvent(JSON.parse(JSON.stringify(dataTrips)).filter((item, idx) => indexTripSelected.length === 0 || (indexTripSelected.includes(idx))))
    console.log("data : ", data)
    // console.log(JSON.stringify(newDataTrip))

    // let data = JSON.parse(JSON.stringify(dataTrips)).filter((item, idx) => indexTripSelected.length === 0 || (indexTripSelected.includes(idx)))
    // console.log('data', data.length)
    // data.filter((item, idx) => indexTripSelected.length === 0 || (indexTripSelected.includes(idx)))
    // console.log('data2', data.length)
    let info = listMembers.find((item) => item.id === vin_no[0])
    let file_name = "Trip_of_" + (info.vin_no || "-") +
      "_" + moment(dateStart, 'DD/MM/YYYY HH:mm').format('DD-MM-YYYY HH_mm') +
      " to " + moment(dateEnd, 'DD/MM/YYYY HH:mm').format('DD-MM-YYYY HH_mm')
    let text = [
      t('history_91'), ' : ', (info.vin_no || "-"), ', ',
      t('history_92'), ' : ', dateStart, ' - ', dateEnd
    ]
    let custom_header = {
      list: [{ text, merge_cell: true, height: 30, font: { size: 12 }, alignment: { vertical: 'middle' } }]
    }
    let [json_data, column_header] = this.changeFormatJSON(data)
    console.log('json_data', json_data, column_header)
    let lst_cus_footer = [
      { index_row: 1, index_cell: 1, font: { bold: true }, text: [t("other_reports_120")] },
      { index_row: 2, index_cell: 1, font: { bold: true }, text: [t("other_reports_121")] }
    ]
    let sumAndAvg = ['distance_1', 'fuel_usage_1']
    const setFormatData = (key, eventId) => {
      if (eventId === 1)
        return data.map((item) => (item[key] && item[2] === eventId) ? item[key] : '').filter((item) => item !== '')
      else
        return data.map((item) => (item[key] && item[2] !== 1) ? item[key] : '').filter((item) => item !== '')

    }
    console.log('column_header : ', column_header)
    for (let i in column_header) {

      let key = get(column_header[i], 'key'),
        idxKey = { total_time: 8, use_time: 8, fuel_usage_1: 10, event_id: 0 }

      console.log('key : ', key)
      console.log('idxKey : ', idxKey)

      if (data.length > 0) {
        if (sumAndAvg.includes(key)) {
        } else if (key === 'total_time') {
          console.log('formData : ', setFormatData(idxKey[key]))
          let textSum = this.rTT(calculateToDuration(getSum(setFormatData(idxKey[key], 1))))
          lst_cus_footer.push(
            { text: textSum, index_row: 1, index_cell: key, font: { bold: true }, alignment: { horizontal: 'right' } },
            { text: "-", index_row: 2, index_cell: key, font: { bold: true }, alignment: { horizontal: 'center' } }
          )
        }
        else if (key === 'use_time') {
          let textSum = this.rTT(calculateToDuration(getSum(setFormatData(idxKey[key], 0))))
          lst_cus_footer.push(
            { text: textSum, index_row: 1, index_cell: key, font: { bold: true }, alignment: { horizontal: 'right' } },
            { text: "-", index_row: 2, index_cell: key, font: { bold: true }, alignment: { horizontal: 'center' } }
          )
        }
      }
    }
    column_header.unshift('')

    let custom_footer = { list: lst_cus_footer }

    // exportExcel({ column_header, json_data, custom_header, file_name })
    exportExcel({ column_header, json_data, custom_header, file_name, custom_footer })
  }

  changeFormatJSON(dataJson) {
    let { indexTripSelected } = this.props
    let newData, header

    newData = dataJson.map((item, i) => {
      // if (indexTripSelected.length === 0 || (indexTripSelected.includes(i))) {
      return {
        // state_id: item[2],
        event_id: this.rTT(t(getEventName(item[2]))),
        dtstart: item[0],
        goef_start: item[3],
        dtend: item[1],
        goef_end: item[3],
        total_time: item[2] === 1 ? this.rTT(calculateToDuration(item[8])) : "",
        use_time: item[2] !== 1 ? this.rTT(calculateToDuration(item[8])) : "",
        start_odo_1: typeof item[24] === "number" ? numberWithComma(item[24].toFixed(1)) : item[24],
        end_odo_1: typeof item[25] === "number" ? numberWithComma(item[25].toFixed(1)) : item[25],
        fuel_usage_1: item[10],
        model_Code: item[21],
        vin_no: item[13],
        engine_no: item[22],
      }
      // }
    })
    header = [
      // { key: 'state_id', text: t("history_67") },
      { key: 'event_id', text: t("history_45") },
      { key: 'dtstart', text: t("history_46") },
      { key: 'goef_start', text: t("history_106") },
      { key: 'dtend', text: t("history_48") },
      { key: 'goef_end', text: t("history_107") },
      { key: 'total_time', text: t("history_108"), style: { alignment: { horizontal: 'right' } } },
      { key: 'use_time', text: t("history_109"), style: { alignment: { horizontal: 'right' } } },
      { key: 'start_odo_1', text: t("history_101"), style: { alignment: { horizontal: 'right' } } },
      { key: 'end_odo_1', text: t("history_102"), style: { alignment: { horizontal: 'right' } } },
      { key: 'fuel_usage_1', text: t("history_50") },
      { key: 'model_Code', text: t("Model_Code") },
      { key: 'vin_no', text: t("history_52") },
      { key: 'engine_no', text: t("my_vehicles_67") }
    ]
    return [newData, header]
  }

  rTT(reactSymbol) {
    if (reactSymbol.type === mySuspense) reactSymbol = reactSymbol.props.children
    let str = renderToString(reactSymbol)
    str = str.replace('<div data-reactroot="">', '').replace(/<\/div>/g, '')
      .replace('<span data-reactroot="">', '').replace(/<\/span>/g, '').replace(/<!-- -->/g, '')
    return str
  }


  render() {
    let { dataHistory, language, date, vehicleName, licensePlate, vinNo,
      dataTrips, indexTripSelected, listMembers, vin_no, dateStart, dateEnd } = this.props


    return (<Button
      onClick={() => this.setupExport()}
      text={"history_7"}
      icon={<i className="icon-excel-01" style={{ fontSize: 12, marginRight: 6 }} />} />)

  }
}

const mapStateToProps = (state) => ({
  dataHistory: state.history.dataHistory,
  language: state.versatile.language,
  dataTrips: state.trackingHistory.dataTrips,
  indexTripSelected: state.trackingHistory.indexTripSelected,
  listMembers: state.trackingHistory.listMembers,
  vin_no: state.trackingHistory.vin_no,
  dateStart: state.trackingHistory.dateStart,
  dateEnd: state.trackingHistory.dateEnd,
});

export default connect(mapStateToProps)(TripExport);

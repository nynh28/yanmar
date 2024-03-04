import React, { Component, Suspense } from 'react';
import { t } from '../../Components/Translation'
import { exportExcel } from '../../Functions/ExportExcel'

class DataExport extends Component {
  setupExport() {
    let { dataSource, currentDate, currentMonth, currentYear } = this.props

    let text = [
      t("สรุปสถานะการเปิดใช้งาน HINO CONNECT ณ วันที่ "), currentDate, " ", t(currentMonth), " ", currentYear
    ]

    let custom_header = {
      list: [{ text, merge_cell: true, height: 30, font: { size: 12 }, alignment: { vertical: 'middle' } }]
    }
    let [json_data, column_header] = this.changeFormatJSON(dataSource)

    exportExcel({
      column_header,
      json_data,
      custom_header,
      file_name: ["สรุปสถานะการเปิดใช้งาน HINO CONNECT ณ วันที่ ", currentDate, " ", t(currentMonth), " ", currentYear],
      custom_footer: {},
      is_sub_table: false
    })
  }

  changeFormatJSON(dataJson) {
    let newData = [], header = []

    newData = dataJson.map((item) => {
      return {
        status: item.status,
        tire_category_ten: item.tire_category_ten,
        tire_category_six: item.tire_category_six,
        total: item.total,
        score: item.score,
      }
    })
    header = [
      { key: 'status', text: `สถานะการลงทะเบียน (คิดเฉพาะการแจ้งขายปี ${this.props.currentYear})` },
      { key: 'tire_category_ten', text: "10W", style: { alignment: { horizontal: 'center' } } },
      { key: 'tire_category_six', text: "6W", style: { alignment: { horizontal: 'center' } } },
      { key: 'total', text: t("ทั้งหมด"), style: { alignment: { horizontal: 'center' } } },
      { key: 'score', text: t("คะแนน"), style: { alignment: { horizontal: 'center' } } }
    ]
    return [newData, header]
  }

  render() {
    return (<button
      onClick={() => this.setupExport()}
      className="btn"
      style={{ marginRight: 10, backgroundColor: '#1AB394', color: 'white' }}>
      <i className="icon-excel-01" style={{ fontSize: 12, marginRight: 6 }} />{t("Export")}
    </button>)

  }
}

export default DataExport
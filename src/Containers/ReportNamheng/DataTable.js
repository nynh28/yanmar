import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import Table from '../../Components/DataGridView/Table.js'

class DataTable extends Component {
  render() {
    let { dataSource, dataLogin, reportDate } = this.props
    return (
      <Suspense fallback={null}>
        <Table
          mode={"offline"}
          dataSource={dataSource}
          table_id={0}
          cookiesOptions={{
            enable: true,
            name: "ReportNamheng"
          }}
          columnCount={"vehicle_name"}
          user_id={dataLogin.userId}
          editing={{ enabled: false }}
          headerCustom={{
            list: [
              { text: ['รายงานวันที่ : ' + reportDate], merge_cell: true, font: { size: 12 }, alignment: { vertical: 'middle' }, height: 30 },
            ]
          }}
          exportName={"ERP Integration " + reportDate}
          column={[
            {
              column_name: 'vehicle_name',
              column_caption: "ชื่อรถ"
            },
            {
              column_name: 'license_plate_no',
              column_caption: "ทะเบียนรถ"
            },
            {
              column_name: 'plant_name',
              column_caption: "ชื่อแพลนต์"
            },
            {
              column_name: 'p_bill',
              column_caption: "แพลนต์ bill"
            },
            {
              column_name: 'round',
              column_caption: "เที่ยว"
            },
            {
              column_name: 'start_time',
              column_caption: "เริ่มเวลา"
            },
            {
              column_name: 'customer_no',
              column_caption: "รหัสลูกค้า"
            },
            {
              column_name: 'cus_name',
              column_caption: "ชื่อลูกค้า 1"
            },
            {
              column_name: 'cus_name2',
              column_caption: "ชื่อลูกค้า 2"
            },
            {
              column_name: 'cus_in_time',
              column_caption: "ถึงเวลา"
            },
            {
              column_name: 'cus_out_time',
              column_caption: "ออกเวลา"
            },
            {
              column_name: 'in_time',
              column_caption: "ระยะเวลาที่อยู่ภายใน"
            },
            {
              column_name: 'remark',
              column_caption: "หมายเหตุ"
            }
          ]
          }
        />
      </Suspense >
    )
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header
});

export default connect(mapStateToProps)(DataTable)
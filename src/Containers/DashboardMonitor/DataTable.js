import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from "reactstrap";
import './styles.css'
import { t } from '../../Components/Translation'
import Table from '../../Components/DataGridView/Table'
import DashboardMonitorActions from '../../Redux/DashboardMonitorRedux'
import service from './data.js';
import moment from 'moment';
import { ENDPOINT_BASE_URL } from '../../Config/app-config';
import { calculateToDuration, momentDate } from '../../Functions/DateMoment'

const data = service.getData();

const configColumnStation = [
  {
    column_name: 'no',
    column_caption: "ลำดับ",
  },
  {
    column_name: 'licenseplte',
    column_caption: "ทะเบียน",
    column_render: (data) => {
      let display = []
      if (data.data.vehicle_name) display.push(data.data.vehicle_name)
      if (data.value) display.push(data.value)
      return display.join(' || ')
    }
  },
  {
    column_name: 'trip_type_name',
    column_caption: "สถานะ",
    column_render: (data) => {
      return <label style={{ color: '#FFF', backgroundColor: data.data.trip_type === 1 ? 'rgb(0 197 85)' : 'rgb(252 74 61)', borderRadius: 19, fontWeight: 100, padding: "0px 10px 0px 10px" }}>{data.value} </label>
    }
  },
  {
    column_name: 'total_time',
    column_caption: "เวลา (ทั้งหมด)",
    column_render: (data) => calculateToDuration(data.value, 'hideSec')
  },
  {
    column_name: 'fence_source_name',
    column_caption: "สถานีต้นทาง",
  },
  // {
  //   column_name: 'currentStation',
  //   column_caption: "สถานีปลายทาง",
  // },
  {
    column_name: 'source_gate_in_time',
    column_caption: "เวลาเข้าสถานี",
    column_render: (data) => momentDate(data.value)
  },
  // {
  //   column_name: 'source_gate_out_time',
  //   column_caption: "เวลาออกสถานี",
  // },
  {
    column_name: 'eta',
    column_caption: "เวลาถึง (ปลายทาง)",
    column_render: (data) => momentDate(data.value)
  },
  {
    column_name: 'distance',
    column_caption: "ระยะทาง (ปลายทาง)",
  },
  {
    column_name: 'address',
    column_caption: "ตำแหน่งปัจจุบัน",
  }
]

const configColumnBetween = [
  {
    column_name: 'no',
    column_caption: "ลำดับ",
  },
  {
    column_name: 'licenseplte',
    column_caption: "ทะเบียน",
    column_render: (data) => {
      let display = []
      if (data.data.vehicle_name) display.push(data.data.vehicle_name)
      if (data.value) display.push(data.value)
      return display.join(' || ')
    }
  },
  {
    column_name: 'trip_type_name',
    column_caption: "สถานะ",
    column_render: (data) => {
      return <label style={{ color: '#FFF', backgroundColor: data.data.trip_type === 1 ? 'rgb(0 197 85)' : 'rgb(252 74 61)', borderRadius: 19, fontWeight: 100, padding: "0px 10px 0px 10px" }}>{data.value} </label>
    }
  },
  {
    column_name: 'total_time',
    column_caption: "เวลา (ทั้งหมด)",
    column_render: (data) => calculateToDuration(data.value, 'hideSec')
  },
  {
    column_name: 'fence_source_name',
    column_caption: "สถานีต้นทาง",
  },
  // {
  //   column_name: 'currentStation',
  //   column_caption: "สถานีปลายทาง",
  // },
  {
    column_name: 'source_gate_out_time',
    column_caption: "เวลาออกสถานี",
    column_render: (data) => momentDate(data.value)
  },
  {
    column_name: 'eta',
    column_caption: "เวลาถึง (ปลายทาง)",
    column_render: (data) => momentDate(data.value)
  },
  {
    column_name: 'distance',
    column_caption: "ระยะทาง (ปลายทาง)",
  },
  {
    column_name: 'address',
    column_caption: "ตำแหน่งปัจจุบัน",
  }
]



class DataTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: []
    }
  }

  componentWillMount() {

  }
  componentWillUnmount() {

  }

  renderDetail(props) {
    let { driverName, cardType, area, picture } = props.data;
    return (
      <div>
        <div className="pull-left">
          <h5>พนักงานขับรถ</h5>
          <img alt="image" className="img-circle" src={require('./Avatar.png')} style={{ width: 50, height: 50 }} />
        </div>
        <div className="media-body" style={{ paddingTop: 25 }}>
          <table className="tb-driver-info">
            <tr>
              <td style={{ width: 100 }}><b>{t('ชื่อคนขับ')}</b></td>
              <td><span>{driverName}</span></td>
            </tr>
            <tr>
              <td style={{ width: 100 }}><b>{t('ประเภทบัตร')}</b></td>
              <td>{cardType}</td>
            </tr>
            <tr>
              <td style={{ width: 100 }}><b>{t('เขตที่ออกบัตร')}</b></td>
              <td>{area}</td>
            </tr>
          </table>
        </div>
      </div>
    )
  }


  render() {
    let { dataTable, isStation } = this.props
    let { result } = this.state
    return <Table
      mode={"offline"}
      table_id={1}
      user_id={1}
      dataSource={[...dataTable] || []}
      author={""}
      xAPIKey={""}
      // MasterDetailEnabled={true}
      searchPanel={false}
      autoExpandAll={false}
      selectionVisible={false}
      ExportEnable={false}
      GroupPanelVisible={false}
      zoomVisible={false}
      selectItemVisible={false}
      renderDetail={this.renderDetail}
      column={isStation ? configColumnStation : configColumnBetween}
    />
  }

  //#region
  // render() {
  //   return <Table
  //     mode={"offline"}
  //     table_id={1}
  //     user_id={1}
  //     dataSource={[...data]}
  //     author={""}
  //     xAPIKey={""}
  //     MasterDetailEnabled={true}
  //     searchPanel={false}
  //     autoExpandAll={false}
  //     selectionVisible={false}
  //     ExportEnable={false}
  //     GroupPanelVisible={false}
  //     zoomVisible={false}
  //     selectItemVisible={false}
  //     renderDetail={this.renderDetail}
  //     column={[
  //       {
  //         column_name: 'sequence',
  //         column_caption: "ลำดับ",
  //       },
  //       {
  //         column_name: 'licensePlate',
  //         column_caption: "ทะเบียน",
  //       },
  //       {
  //         column_name: 'status',
  //         column_caption: "สถานะ",
  //         column_render: (data) => {
  //           return <label style={{ color: '#FFF', backgroundColor: data.data.color, borderRadius: 19, fontWeight: 100, padding: "0px 10px 0px 10px" }}>{data.value} </label>
  //         }
  //       },
  //       {
  //         column_name: 'distance',
  //         column_caption: "เวลา (ทั้งหมด)",
  //       },
  //       {
  //         column_name: 'currentStation',
  //         column_caption: "สถานีปัจจุบัน",
  //       },
  //       {
  //         column_name: 'timeIn',
  //         column_caption: "เวลาเข้าสถานี",
  //       },
  //       {
  //         column_name: 'timeEnd',
  //         column_caption: "เวลาถึง (ปลายทาง)",
  //       },
  //       {
  //         column_name: 'destinationDistance',
  //         column_caption: "ระยะทาง (ปลายทาง)",
  //       },
  //       {
  //         column_name: 'position',
  //         column_caption: "ตำแหน่งปัจจุบัน",
  //       }
  //     ]}
  //   />
  // }
  //#endregion

}

const mapStateToProps = (state) => ({
  dataTable: state.dashboardMonitor.dataTable,
  isStation: state.dashboardMonitor.isStation,
});

const mapDispatchToProps = (dispatch) => ({
  // setDataTable: (dataTable) => dispatch(DashboardMonitorActions.setDataTable(dataTable)),
  // filterData: (dateStart, dateEnd) => dispatch(HmstDashboardActions.filterData(dateStart, dateEnd)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DataTable)

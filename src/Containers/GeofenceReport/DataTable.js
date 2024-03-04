import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Table from '../../Components/DataGridView/Table.js'
// import Loading from './Loading'
import { get } from 'lodash'
import { t } from "../../Components/Translation";
import moment from 'moment'
import Loading from './Loading'
import { getEventName } from './Config'
import { isEqual } from 'lodash'

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class DataTable extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    let { gridInfo } = this.props

    if (!isEqual(nextProps.gridInfo, gridInfo)) {
      return true
    }
    return false
  }

  render() {
    let { dataSource, columnConfig, dataLogin, gridInfo } = this.props
    // console.log("TABLE : ", this.props)
    let textHeader = [t('geofence_reports_1'), ' : ', t(gridInfo.reportName), ', ', t('export_4'), ' : ', moment(gridInfo.dateStart, "YYYY/MM/DD HH:mm:ss").format("DD/MM/YYYY HH:mm"), ' ', t('export_5'), ' ', moment(gridInfo.dateEnd, "YYYY/MM/DD HH:mm:ss").format("DD/MM/YYYY HH:mm")]

    return (
      <Suspense fallback={null}>
        <Loading />
        <Table
          mode={"offline"}
          dataSource={dataSource}
          table_id={11}
          user_id={dataLogin.userId}
          cookiesOptions={{
            enable: true,
            name: "GeofenceReport"
          }}
          editing={{ enabled: false }}
          headerCustom={this.headerCustom}
          columnCount={"customer_name"}
          headerCustom={{
            list: [
              { text: textHeader, merge_cell: true, font: { size: 12 }, alignment: { vertical: 'middle' }, height: 30 },
            ]
          }}
          column={columnConfig}
        />
      </Suspense >
    )
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  gridInfo: state.geofenceReport.gridInfo,
});

export default withRouter(connect(mapStateToProps)(DataTable))
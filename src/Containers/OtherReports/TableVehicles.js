import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import OtherReportActions from '../../Redux/OtherReportRedux'
import Table from '../../Components/DataGridView/Table.js'
import { get } from 'lodash'


class TableVehicles extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.selectedCallback = this.selectedCallback.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    let { vehiclesData } = this.props

    let dataOld = get(vehiclesData, 'result', [])
    let dateNew = get(nextProps.vehiclesData, 'result', [])

    if (dataOld !== dateNew) {
      return true
    }

    return false
  }

  selectedCallback(e) {
    this.props.setVehicleSelected(e.selectedRowsData)
  }

  render() {
    let { header, vehiclesData } = this.props
    let listVehicle = JSON.parse(JSON.stringify(get(vehiclesData, 'result', [])))

    return <Suspense fallback={null}>
      <Table
        mode={"offline"}
        dataSource={listVehicle}
        author={header.idToken}
        xAPIKey={header.redisKey}
        table_id={9}
        height={`calc(100vh - 465px)`}
        cookiesOptions={{
          enable: true,
          name: "OtherReport"
        }}
        user_id={this.props.dataLogin.userId}
        editing={{ enabled: false }}
        showSetting={true}
        searchPanel={true}
        autoExpandAll={false}
        remoteOperations={true}
        // columnCount="vin_no"
        selectedCallback={(e) => this.props.selectedCallback(e.selectedRowsData)}
        selectAll={true}
        initialCallback={(e) => {
          if (e.current !== null) {
            e.current.instance.selectRows([4]);
          }
        }}
        column={[
          {
            column_name: 'model_code',
            column_caption: "other_reports_21"
          },
          {
            column_name: 'vin_no',
            column_caption: "other_reports_142"
          },
          {
            column_name: 'engine_no',
            column_caption: "other_reports_143"
          },
          {
            column_name: 'seller_name',
            column_caption: "my_vehicles_71"
          },
          {
            column_name: 'cust_name',
            column_caption: "other_reports_127"
          },
          {
            column_name: 'phone',
            column_caption: "geofence_reports_10"
          },
          {
            column_name: 'delivery_date',
            column_caption: "realtime_158"
          },
          {
            column_name: 'leased_no',
            column_caption: "realtime_157"
          }
        ]}
      />
    </Suspense>
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  vehiclesData: state.otherReport.vehiclesData
});

const mapDispatchToProps = (dispatch) => ({
  setVehicleSelected: (vehicles) => dispatch(OtherReportActions.setVehicleSelected(vehicles)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableVehicles)

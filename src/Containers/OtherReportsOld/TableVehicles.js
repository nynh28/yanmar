import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import OtherReportActions from '../../Redux/OtherReportRedux'
import Table from '../../Components/DataGridView/Table.js'
import { get, isEqual } from 'lodash'


class TableVehicles extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.selectedCallback = this.selectedCallback.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
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
        columnCount="vin_no"
        selectedCallback={(e) => this.props.selectedCallback(e.selectedRowsData)}
        selectAll={true}
        initialCallback={(e) => {
          if (e.current !== null) {
            e.current.instance.selectRows([4]);
          }
        }}
        column={[
          {
            column_name: 'vin_no',
            column_caption: "other_reports_18"
          },
          {
            column_name: 'vehicle_name',
            column_caption: "other_reports_19"
          },
          {
            column_name: 'model_code',
            column_caption: "other_reports_21"
          },
          {
            column_name: 'fleet_name',
            column_caption: "other_reports_25"
          },
          {
            column_name: 'license_plate_no',
            column_caption: "other_reports_20"
          },
          {
            column_name: 'province_name',
            column_caption: "other_reports_26"
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
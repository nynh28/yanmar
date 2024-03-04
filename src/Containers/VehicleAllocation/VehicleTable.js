import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import DropdownActions from '../../Redux/DropdownRedux'
import VehicleAllocationActions from '../../Redux/VehicleAllocationRedux'

import Table from '../../Components/DataGridView/Table.js'
import SaveButton from '../../Components/SaveButton'
import { t } from '../../Components/Translation'
import Alert from '../../Components/Alert'
import DropwDownActions from '../../Redux/DropdownRedux'
import { schema } from './schema'


class VehicleTable extends Component {

  constructor(props) {
    super(props)

    this.state = {


    }
  }


  selectedCallback(e) {
    let selectedData = e.selectedRowsData.map(e => {
      return {
        vehicle_id: e.vehicle_id
      }
    })
    this.props.setAllocated(selectedData)
    // console.log(selectedData)
  }



  render() {

    let {
      // selectedOwnerIdList, selectedNewOwnerIdList,
      vehicleData,
      header,
    } = this.props



    return (<Table
      mode={"offline"}
      // serversideSource={`${ENDPOINT_BASE_URL}fleet/vehicle/vehicle_allocation/list_vehicle?user_id=` + schema.OwnerPartnerId}
      // serversideSource={'https://api-center.onelink-iot.com/v1.0.1/grid-view/allocable-vehicles/' + schema.OwnerPartnerId}
      table_id={1}
      user_id={1}
      dataSource={[...vehicleData]}
      author={header.idToken}
      xAPIKey={header.redisKey}
      column={[
        {
          column_name: 'vehicle_id',
          column_caption: "vehicle_allocation_3",
        },
        {
          column_name: 'vin_no',
          column_caption: "vehicle_allocation_4",
        },
        {
          column_name: 'chassis_no',
          column_caption: "vehicle_allocation_5",
        },
        {
          column_name: 'engine_no',
          column_caption: "vehicle_allocation_6",
        },
        {
          column_name: 'model_code',
          column_caption: "vehicle_allocation_7",
        },
        {
          column_name: 'spec_code',
          column_caption: "vehicle_allocation_8",
        },
        {
          column_name: 'ordering_model',
          column_caption: "vehicle_allocation_9",
        },
        {
          column_name: 'license_plate_no',
          column_caption: "vehicle_allocation_10",
        },
        {
          column_name: 'province_name',
          column_caption: "vehicle_allocation_11",
        }
      ]}
      selectedCallback={(e) => this.selectedCallback(e)}
    // initialCallback={this.tableInitial}
    // autoExpandAll={false}
    // remoteOperations={false}
    >
      {/* <GroupPanel visible={true} />
                    <Grouping autoExpandAll={this.state.autoExpandAll} /> */}
    </Table>)
  }
}

const mapStateToProps = (state) => ({
  header: state.signin.header,
  vehicleData: state.vehicleAllocation.vehicleData,

});

const mapDispatchToProps = (dispatch) => ({
  //getOwnerPartner: () => dispatch(),
  // getDataDropdown: (optionGroup, key) => dispatch(DropdownActions.getDataDropdown(optionGroup, key)),
  setAllocated: (vehicles) => dispatch(VehicleAllocationActions.setAllocated(vehicles))
});

export default connect(mapStateToProps, mapDispatchToProps)(VehicleTable)

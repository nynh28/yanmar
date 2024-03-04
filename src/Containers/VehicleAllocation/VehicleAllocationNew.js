import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import DropdownActions from '../../Redux/DropdownRedux'
import VehicleAllocationActions from '../../Redux/VehicleAllocationRedux'
import { OwnerField } from './Fields/OwnerField'
import { NewOwnerField } from './Fields/NewOwnerField'
import VehicleTable from './VehicleTable'
import Form from "react-jsonschema-form"
// import VehicleTable from './Fields/VehicleTable'
import PannelBox from '../../Components/PannelBox'
import { setSchema } from './schema.js'
import { get } from 'lodash'
import Swal from 'sweetalert2'
import FormSelectSearch from '../../Components/FormControls/FormSelectSearch'
import Table from '../../Components/DataGridView/Table.js'
import SaveButton from '../../Components/SaveButton'
import { t } from '../../Components/Translation'
import Alert from '../../Components/Alert'
import DropwDownActions from '../../Redux/DropdownRedux'
import { schema } from './schema'


class VehicleAllocationNew extends Component {

  constructor(props) {
    super(props)

    this.state = {
      alertSetting: {
        show: false,
        type: 3,
        content: "",
        ErrorSubcode: 0
      },
      selectedOwnerId: [],
      selectedNewOwnerId: [],
      selectedOwnerIdList: [],
      selectedNewOwnerIdList: [],

    }
  }

  componentDidMount() {
    const { dataLogin } = this.props
    this.userId = get(dataLogin, 'userId', 0)
    this.props.getOwnerPartner(this.userId)
  }

  componentDidUpdate(prevProps) {
    let { ownerList, newOwnerList, allocatedUpdating, allocatedUpdatingError } = this.props
    if (prevProps.ownerList !== ownerList) this.setState({ selectedOwnerIdList: this.renameKey(ownerList) })
    if (prevProps.newOwnerList !== newOwnerList) this.setState({ selectedNewOwnerIdList: this.renameKey(newOwnerList) })
    if (prevProps.allocatedUpdating !== allocatedUpdating && !allocatedUpdating) {
      if (allocatedUpdatingError) {
        this.setAlertSetting(true, 2, "", allocatedUpdatingError)
      } else {
        this.props.getListVehicles(this.userId, this.state.selectedOwnerId)
        this.setAlertSetting(true, 1)
      }
    }

  }

  renameKey(data) {
    let result = []
    for (let index in data) result.push({ key: data[index].partner_id, value: data[index].partner_name })
    console.log('result', result)
    return result
  }

  onChange(name, value) {

    this.setState({ [name]: value || [] })
    if (name === 'selectedOwnerId') {
      this.setState({ selectedNewOwnerId: [] })
      this.props.getListVehicles(this.userId, value)
      this.props.getNewOwnerPartner(this.userId, value)
      this.props.setAllocated([])
    }

  }


  onSubmit() {

    console.log(this.state.selectedOwnerId, this.state.selectedNewOwnerId, this.props.allocatedVehicles.length > 0)

    if (this.state.selectedOwnerId.length > 0 && this.state.selectedNewOwnerId.length > 0 && this.props.allocatedVehicles.length > 0) {
      this.setAlertSetting(true, 3, "vehicle_allocation_16")

    } else if (!this.state.selectedOwnerId.length > 0) {
      this.setAlertSetting(true, 4, "vehicle_allocation_12")

    } else if (!this.props.allocatedVehicles.length) {
      if (this.props.vehicleData.length < 1) this.setAlertSetting(true, 4, "vehicle_allocation_14")
      else this.setAlertSetting(true, 4, "vehicle_allocation_15")

    } else if (!this.state.selectedNewOwnerId.length > 0) {
      this.setAlertSetting(true, 4, "vehicle_allocation_13")

    }
  }

  setAlertSetting(isShow, type, content = "", ErrorSubcode) {
    let { alertSetting } = this.state
    alertSetting.show = isShow
    alertSetting.type = type
    alertSetting.content = content
    alertSetting.ErrorSubcode = ErrorSubcode
    this.setState({ alertSetting })
  }

  render() {
    let {
      selectedOwnerIdList,
      selectedNewOwnerIdList,
      newOwnerPartnerId,
      formData,
      selectedOwnerId,
      selectedNewOwnerId,
      alertSetting
    } = this.state
    let {
      // selectedOwnerIdList, selectedNewOwnerIdList,
      vehicleData,
      header,
    } = this.props



    return (<Suspense fallback={null} >
      <Alert
        setting={alertSetting}
        onConfirm={() => {
          if (alertSetting.type === 4) {
            alertSetting.show = false
          }
          else if (alertSetting.type === 3) {
            alertSetting.type = 6
            this.props.updateNewPartner(
              this.props.dataLogin.userId, this.state.selectedOwnerId,
              this.state.selectedNewOwnerId, this.props.allocatedVehicles
            )
          }
          // else if (statusSubmit.status) {
          //   alertSetting.show = true
          // }
          else {
            alertSetting.show = false
          }
          this.setState({ alertSetting })
        }}
        onCancel={() => {
          alertSetting.show = false
          this.setState({ alertSetting })
        }}
      />
      <PannelBox title={'Vehicle Allocation'}>
        <FormSelectSearch
          mode={"single"}
          schema={{ required: 'selectedOwnerId' }}
          value={selectedOwnerId}
          label={"vehicle_allocation_1"}
          list={selectedOwnerIdList}
          fieldForm={"selectedOwnerId"}
          placeholder={"vehicle_allocation_1"}
          flex={1}
          onChange={(selected) => this.onChange("selectedOwnerId", selected)}
        />
        <FormSelectSearch
          mode={"single"}
          schema={{ required: 'selectedNewOwnerId' }}
          value={selectedNewOwnerId}
          label={"vehicle_allocation_2"}
          list={selectedNewOwnerIdList}
          fieldForm={"selectedNewOwnerId"}
          placeholder={"vehicle_allocation_2"}
          flex={1}
          onChange={(selected) => this.onChange("selectedNewOwnerId", selected)}
        />
        <div style={{ textAlign: "right" }}>
          <SaveButton
            loading={this.state.loading}
            name={t('submit')}
            onClick={() => {
              this.onSubmit()
            }}
          />
        </div>
        <div className="hr-line-dashed" />
        <VehicleTable />

      </PannelBox>
    </Suspense >)
  }
}

const mapStateToProps = (state) => ({
  // VehicleAllocationOwnerData: state.dropdown.VehicleAllocationOwnerData,
  // VehicleAllocationPartnerData: state.dropdown.VehicleAllocationPartnerData,
  // VehicleTableData: state.dropdown.VehicleAllocationPartnerData
  header: state.signin.header,
  dataLogin: state.signin.dataLogin,
  ownerList: state.vehicleAllocation.ownerList,
  newOwnerList: state.vehicleAllocation.newOwnerList,
  vehicleData: state.vehicleAllocation.vehicleData,
  allocatedVehicles: state.vehicleAllocation.allocatedVehicles,
  allocatedUpdating: state.vehicleAllocation.allocatedUpdating,
  allocatedUpdatingError: state.vehicleAllocation.allocatedUpdatingError,
});

const mapDispatchToProps = (dispatch) => ({
  //getOwnerPartner: () => dispatch(),
  // getDataDropdown: (optionGroup, key) => dispatch(DropdownActions.getDataDropdown(optionGroup, key)),
  getOwnerPartner: (userId) => dispatch(VehicleAllocationActions.getOwnerPartner(userId)),
  getListVehicles: (userId, partnerId) => dispatch(VehicleAllocationActions.getListVehicles(userId, partnerId)),
  getNewOwnerPartner: (userId, partnerId) => dispatch(VehicleAllocationActions.getNewOwnerPartner(userId, partnerId)),
  updateNewPartner: (userId, partnerId, newOwnerId, vehicles) => dispatch(VehicleAllocationActions.updateNewPartner(userId, partnerId, newOwnerId, vehicles)),
  setAllocated: (vehicles) => dispatch(VehicleAllocationActions.setAllocated(vehicles))
});

export default connect(mapStateToProps, mapDispatchToProps)(VehicleAllocationNew)

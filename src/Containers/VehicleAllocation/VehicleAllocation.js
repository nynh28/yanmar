import React, { Component } from 'react'
import { connect } from 'react-redux'
import DropdownActions from '../../Redux/DropdownRedux'
import VehicleAllocationActions from '../../Redux/VehicleAllocationRedux'
import { OwnerField } from './Fields/OwnerField'
import { NewOwnerField } from './Fields/NewOwnerField'
import Form from "react-jsonschema-form"
import VehicleTable from './Fields/VehicleTable'
import PannelBox from '../../Components/PannelBox'
import { setSchema } from './schema.js'
import { get } from 'lodash'
import Swal from 'sweetalert2'

import DropwDownActions from '../../Redux/DropdownRedux'
import { schema } from './schema'

export const fields = {
  ownerField: OwnerField,
  newOwnerField: NewOwnerField,
  vehicleTable: VehicleTable
}

export const uiSchema = {
  section1: {
    ownerPartner: {
      "ui:field": "ownerField",
    },
    newOwnerPartner: {
      "ui:field": "newOwnerField",
    },
    vehicleTable: {
      "ui:field": "vehicleTable",
    }
  }
}


let OwnerPartnerIdTest = null

class VehicleAllocation extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedOwnerId: null,
      selectedNewOwnerId: null,
      formData: {
        section1: {
          vehicleTable: {
            vehicleTable: [
              'a38288d4-36d2-44de-93d7-1dccc14ba4ce',
              'e038d41c-b8e6-4b65-87e7-4c75b4a73755'
            ]
          }
        }
      },
      VehicleAllocationOwnerList: [],
      VehicleAllocationPartnerList: [],
      OwnerPartnerId: '',
      newOwnerPartnerId: ''
    }
  }

  componentDidMount() {
    const { dataLogin } = this.props
    const userId = get(dataLogin, 'userId', 0)
    console.log('USERID', userId)
    this.props.getOwnerPartner(userId)
  }

  componentWillMount() {
    // this.props.getDataDropdown("VehicleAllocationOwner")
    // this.props.getDataDropdown("VehicleAllocationPartner")
  }

  componentWillReceiveProps(nextProps) {
    const { allocatedUpdating, allocatedUpdatingError } = this.props
    if (nextProps.allocatedUpdating == false && allocatedUpdating == true) {
      if (nextProps.allocatedUpdatingError) {
        // console.log(nextProps.allocatedUpdatingError)
        Swal.fire(
          'Failure!',
          'An error has occurred.',
          'error'
        )
      } else {
        Swal.fire(
          'Success!',
          'Success vehicles allocating.',
          'success'
        )
        this.props.getListVehicles(this.props.dataLogin.userId, this.state.selectedOwnerId)
      }
    }
  }

  componentDidUpdate(prevProps) {
    // let { VehicleAllocationOwnerData, VehicleAllocationPartnerData } = this.props

    // if (prevProps.VehicleAllocationOwnerData !== VehicleAllocationOwnerData) {
    //   this.setState({ VehicleAllocationOwnerList: this.renameKey(VehicleAllocationOwnerData) })
    // }
    // if (prevProps.VehicleAllocationPartnerData !== VehicleAllocationPartnerData) {
    //   this.setState({ VehicleAllocationPartnerList: this.renameKey(VehicleAllocationPartnerData) })
    // }
  }

  renameKey(data) {
    let result = []
    for (let index in data) result.push({ label: data[index].value, value: data[index].key })
    return result
  }

  onChange(e) {
    console.log(e)
    console.log("onChange")
    // console.log(v)
    // let OwnerPartnerId = e.formData.section1.ownerPartner.ownerPartner
    const OwnerPartnerId = get(e, 'formData.section1.ownerPartner.ownerPartner', 0)
    const newOwnerPartnerId = get(e, 'formData.section1.newOwnerPartner.newOwnerPartner', 0)
    console.log(OwnerPartnerId)
    if (OwnerPartnerId != 0) {
      // get table
      this.setState({ selectedOwnerId: OwnerPartnerId })
      this.props.getListVehicles(this.props.dataLogin.userId, OwnerPartnerId)
      this.props.getNewOwnerPartner(this.props.dataLogin.userId, OwnerPartnerId)
    }

    if (newOwnerPartnerId != 0) {
      this.setState({ selectedNewOwnerId: newOwnerPartnerId })
    }
    // this.setState({ OwnerPartnerId })
  }

  onSubmit(v) {
    console.log(v)
    if (this.state.selectedOwnerId && this.state.selectedNewOwnerId && this.props.allocatedVehicles.length > 0) {
      this.props.updateNewPartner(
        this.props.dataLogin.userId, this.state.selectedOwnerId,
        this.state.selectedNewOwnerId, this.props.allocatedVehicles
      )
    } else if (!this.state.selectedOwnerId) {
      Swal.fire(
        'Failure!',
        'Please select vehicle\'s owner',
        'error'
      )
    } else if (!this.state.selectedNewOwnerId) {
      Swal.fire(
        'Failure!',
        'Please select new vehicle\'s owner',
        'error'
      )
    } else if (!this.props.allocatedVehicles.length) {
      Swal.fire(
        'Failure!',
        'Please select vehicle(s)',
        'error'
      )
    }
  }

  render() {
    let {
      // VehicleAllocationOwnerList, VehicleAllocationPartnerList,
      newOwnerPartnerId,
      formData,
      selectedOwnerId,
      selectedNewOwnerId
    } = this.state
    console.log(selectedOwnerId, selectedNewOwnerId)
    // console.log('---------------------- TestScreen Screen ------------------------------')
    const {
      ownerList,
      newOwnerList,
      vehicleData
    } = this.props
    // console.log("ownerPartnerId", OwnerPartnerId)
    const schema = setSchema(ownerList, newOwnerList, vehicleData || [], OwnerPartnerIdTest, newOwnerPartnerId)
    console.log('VEHICLE', vehicleData)

    return (
      <PannelBox title={'Vehicle Allocation'}>
        <Form schema={schema}
          uiSchema={uiSchema}
          fields={fields}
          formData={formData}
          onChange={e => this.onChange(e)}
          onSubmit={v => { this.onSubmit(v) }}
          onError={v => { console.log(v) }}
        >
        </Form>
      </PannelBox>
    )
  }
}

const mapStateToProps = (state) => ({
  // VehicleAllocationOwnerData: state.dropdown.VehicleAllocationOwnerData,
  // VehicleAllocationPartnerData: state.dropdown.VehicleAllocationPartnerData,
  // VehicleTableData: state.dropdown.VehicleAllocationPartnerData
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
  updateNewPartner: (userId, partnerId, newOwnerId, vehicles) => dispatch(VehicleAllocationActions.updateNewPartner(userId, partnerId, newOwnerId, vehicles))
});

export default connect(mapStateToProps, mapDispatchToProps)(VehicleAllocation)

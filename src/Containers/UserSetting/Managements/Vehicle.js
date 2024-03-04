import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserActions from '../../../Redux/UserRedux'
import '../Form/styles.css'
import { get } from 'lodash'
import Table from './Table'
import { Modal } from 'antd';
import FormSelectSearch from '../../../Components/FormControls/FormSelectSearch'
import { t } from '../../../Components/Translation'

class Vehicle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lstDropdownCustomer: [],
      lstDropdownFleet: [],
      lstDropdownVehicle: [],
      dataVehicle: [],
      lstManageLevel: [],
      customerId: [],
      fleetId: [],
      vehicleId: [],
      manageId: [],
      canAdd: false,
      dupData: false
    }
    this.openModal = this.openModal.bind(this)
    this.onRowInserting = this.onRowInserting.bind(this)
  }

  componentWillMount() {
    this.props.getDropdownTable('Customer')
    this.props.getUserCreateAndUpdateOpt('ManageLevel', '', '')
  }

  componentDidUpdate(prevProps, prevState) {
    let { lstTableCustomer, lstTableFleet, lstTableVehicle, lstManageLevel } = this.props
    let { customerId, fleetId, vehicleId, manageId } = this.state

    if (prevProps.lstTableCustomer !== lstTableCustomer) {
      this.setState({ lstDropdownCustomer: lstTableCustomer })
    }
    if (prevProps.lstTableFleet !== lstTableFleet) {
      this.setState({ lstDropdownFleet: lstTableFleet })
    }
    if (prevProps.lstTableVehicle !== lstTableVehicle) {
      this.setState({ lstDropdownVehicle: lstTableVehicle })
    }
    if (prevProps.lstManageLevel !== lstManageLevel) {
      this.setState({ lstManageLevel: lstManageLevel })
    }

    if (prevState.customerId !== customerId
      || prevState.fleetId !== fleetId
      || prevState.vehicleId !== vehicleId
      || prevState.manageId !== manageId
    ) {
      this.validateSave()
    }
  }

  openModal() {
    this.setState(state => ({
      showFormPopup: !state.showFormPopup,
      canAdd: false,
      customerId: [],
      fleetId: [],
      vehicleId: [],
      manageId: [],
      lstDropdownFleet: [],
      lstDropdownVehicle: [],
      dupData: false
    }))
  }

  getCustomerName() {
    let { lstDropdownCustomer, customerId } = this.state
    let obj = lstDropdownCustomer.find(x => x.key === parseInt(customerId));
    return obj.value
  }

  getFleetName() {
    let { lstDropdownFleet, fleetId } = this.state
    let obj = lstDropdownFleet.find(x => x.key === parseInt(fleetId));
    return obj.value
  }

  getVehicleName() {
    let { lstDropdownVehicle, vehicleId } = this.state
    let obj = lstDropdownVehicle.find(x => x.key === parseInt(vehicleId));
    return obj.value
  }

  getManageName() {
    let { lstManageLevel, manageId } = this.state
    let obj = lstManageLevel.find(x => x.key === parseInt(manageId));
    return obj.value
  }

  checkDuplicateData() {
    let index = this.props.data.findIndex(x =>
      x.customerNav.key === parseInt(this.state.customerId)
      && x.fleetNav.key === parseInt(this.state.fleetId)
      && x.vehicleNav.key === parseInt(this.state.vehicleId)
    )
    if (index > -1) {
      this.setState({ dupData: true })
      return true
    }
    else {
      return false
    }
  }

  onRowInserting() {
    if (!this.checkDuplicateData()) {
      this.props.onChange("INSERT", {
        "id": "INSERT_" + Math.floor(Math.random() * 1000),
        "action": "INSERT",
        "customerNav": {
          "key": parseInt(this.state.customerId),
          "value": this.getCustomerName()
        },
        "fleetNav": {
          "key": parseInt(this.state.fleetId),
          "value": this.getFleetName()
        },
        "vehicleNav": {
          "key": parseInt(this.state.vehicleId),
          "value": this.getVehicleName()
        },
        "manageLevelNav": {
          "key": parseInt(this.state.manageId),
          "value": this.getManageName()
        }
      })
      this.openModal()
      this.setState({ dupData: false })
    }
  }

  onRowRemoving(e) {
    this.props.onChange("DELETE", {
      "id": e.data.id,
      "action": "DELETE",
      "customerNav": {
        "key": e.data.customerNav.key
      },
      "fleetNav": {
        "key": e.data.fleetNav.key
      },
      "vehicleNav": {
        "key": e.data.vehicleNav.key
      },
      "manageLevelNav": {
        "key": e.data.manageLevelNav.key
      }
    })
  }

  validateSave() {
    let { customerId, fleetId, vehicleId, manageId } = this.state
    if (customerId.length > 0 && fleetId.length > 0 && vehicleId.length > 0 && manageId.length > 0) {
      this.setState({ canAdd: true })
    }
    else {
      this.setState({ canAdd: false })
    }
  }

  render() {
    let { data } = this.props
    let { showFormPopup, canAdd, dupData, lstDropdownCustomer, lstDropdownFleet, lstDropdownVehicle, lstManageLevel, customerId, fleetId, vehicleId, manageId } = this.state

    return <div>
      <Table
        btnForm={true}
        btnFormClick={() => this.openModal()}
        btnPermissionClick={() => this.openModal()}
        onRowRemoving={(e) => this.onRowRemoving(e)}
        dataSource={data}
        column={[
          {
            column_name: 'customerNav.value',
            column_caption: "user_68",
          },
          {
            column_name: 'fleetNav.value',
            column_caption: "user_69",
          },
          {
            column_name: 'vehicleNav.value',
            column_caption: "user_71",
          },
          {
            column_name: 'manageLevelNav.value',
            column_caption: "user_67",
          }
        ]}
      >
      </Table>

      <Modal
        title={t("user_43")}
        visible={showFormPopup}
        okText={t("add")}
        cancelText={t("cancel")}
        onOk={this.onRowInserting}
        okButtonProps={{ disabled: !canAdd }}
        onCancel={this.openModal}
      >
        <FormSelectSearch
          mode={"single"}
          schema={{ "required": ["Customer"] }}
          fieldForm="Customer"
          value={customerId}
          label={"user_38"}
          list={lstDropdownCustomer}
          placeholder={"user_61"}
          flex={1}
          onChange={(selected) => {
            this.props.getDropdownTable('Fleet', selected)
            this.setState({ customerId: selected || [], fleetId: [], vehicleId: [] })
          }}
        />

        <FormSelectSearch
          mode={"single"}
          schema={{ "required": ["Fleet"] }}
          fieldForm="Fleet"
          value={fleetId}
          label={"user_40"}
          list={lstDropdownFleet}
          placeholder={"user_62"}
          flex={1}
          onChange={(selected) => {
            this.props.getDropdownTable('Vehicle', selected)
            this.setState({ fleetId: selected || [], vehicleId: [] })
          }}
        />

        <FormSelectSearch
          mode={"single"}
          schema={{ "required": ["Vehicle"] }}
          fieldForm="Vehicle"
          value={vehicleId}
          label={"user_41"}
          list={lstDropdownVehicle}
          placeholder={"user_63"}
          flex={1}
          onChange={(selected) => {
            this.setState({ vehicleId: selected || [] })
          }}
        />

        <FormSelectSearch
          mode={"single"}
          schema={{ "required": ["Mangelevel"] }}
          fieldForm="Mangelevel"
          value={manageId}
          label={"user_37"}
          list={lstManageLevel}
          placeholder={"user_60"}
          flex={1}
          onChange={(selected) => {
            this.setState({ manageId: selected || [] })
          }}
        />

        {dupData && <div className="form-group field field-string" style={{ padding: '0 10px', marginBottom: -10, flex: 1, textAlign: 'center' }}>
          <span className="text-danger">ไม่สามารถเพิ่มข้อมูล เนื่องจากรายการนี้มีอยู่แล้ว</span>
        </div>}
      </Modal>
    </div >
  }
}


const mapStateToProps = (state) => ({
  userData: state.user.userData,
  lstTableCustomer: state.user.lstTableCustomer,
  lstTableFleet: state.user.lstTableFleet,
  lstTableVehicle: state.user.lstTableVehicle,
  lstManageLevel: state.user.lstManageLevel
});

const mapDispatchToProps = (dispatch) => ({
  getDropdownTable: (name, id) => dispatch(UserActions.getDropdownTable(name, id)),
  getUserCreateAndUpdateOpt: (name, id, query) => dispatch(UserActions.getUserCreateAndUpdateOpt(name, id, query)),
  // getUserOption: (name, data) => dispatch(UserActions.getUserOption(name, data))
});


export default connect(mapStateToProps, mapDispatchToProps)(Vehicle)

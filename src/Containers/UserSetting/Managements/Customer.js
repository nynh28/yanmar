import React, { Component } from 'react'
import UserActions from '../../../Redux/UserRedux'
import { connect } from 'react-redux'
import '../Form/styles.css'
import { get } from 'lodash'
import Table from './Table'
import { Modal } from 'antd';
import FormSelectSearch from '../../../Components/FormControls/FormSelectSearch'
import { t } from '../../../Components/Translation'

class Customer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      lstDropdownCustomer: [],
      lstManageLevel: [],
      dataCustomer: [],
      customerId: [],
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
    let { lstTableCustomer, lstManageLevel } = this.props
    let { customerId, manageId } = this.state

    if (prevProps.lstTableCustomer !== lstTableCustomer
      || prevProps.lstManageLevel !== lstManageLevel) {
      this.setState({
        lstDropdownCustomer: lstTableCustomer,
        lstManageLevel: lstManageLevel
      })
    }

    if (prevState.customerId !== customerId
      || prevState.manageId !== manageId
    ) {
      this.validateSave()
    }
  }

  openModal() {
    this.setState(state => ({ showFormPopup: !state.showFormPopup, customerId: [], manageId: [], dupData: false }))
  }

  getCustomerName() {
    let { lstDropdownCustomer, customerId } = this.state
    let obj = lstDropdownCustomer.find(x => x.key === parseInt(customerId));
    return obj.value
  }

  getManageName() {
    let { lstManageLevel, manageId } = this.state
    let obj = lstManageLevel.find(x => x.key === parseInt(manageId));
    return obj.value
  }

  checkDuplicateData() {
    let index = this.props.data.findIndex(x => x.customerNav.key === parseInt(this.state.customerId))
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
      "manageLevelNav": {
        "key": e.data.manageLevelNav.key
      }
    })
  }

  validateSave() {
    let { customerId, manageId } = this.state
    if (customerId.length > 0 && manageId.length > 0) {
      this.setState({ canAdd: true })
    }
    else {
      this.setState({ canAdd: false })
    }
  }

  render() {
    let { data } = this.props
    let { showFormPopup, canAdd, dupData, lstDropdownCustomer, lstManageLevel, customerId, manageId } = this.state

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
            column_name: 'manageLevelNav.value',
            column_caption: "user_67",
          }
        ]}
      >
      </Table>

      <Modal
        title={t("user_39")}
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
          placeholder={"user_38"}
          flex={1}
          onChange={(selected) => {
            this.setState({ customerId: selected || [] })
          }}
        />

        <FormSelectSearch
          mode={"single"}
          schema={{ "required": ["Mangelevel"] }}
          fieldForm="Mangelevel"
          value={manageId}
          label={"user_37"}
          list={lstManageLevel}
          placeholder={"user_37"}
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
  lstManageLevel: state.user.lstManageLevel
});

const mapDispatchToProps = (dispatch) => ({
  getDropdownTable: (name, id) => dispatch(UserActions.getDropdownTable(name, id)),
  getUserCreateAndUpdateOpt: (name, id, query) => dispatch(UserActions.getUserCreateAndUpdateOpt(name, id, query)),
  // getUserOption: (name, data) => dispatch(UserActions.getUserOption(name, data))
});


export default connect(mapStateToProps, mapDispatchToProps)(Customer)

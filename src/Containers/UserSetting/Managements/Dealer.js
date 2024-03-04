import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserActions from '../../../Redux/UserRedux'
import '../Form/styles.css'
import { get } from 'lodash'
import Table from './Table'
import { Modal } from 'antd';
import FormSelectSearch from '../../../Components/FormControls/FormSelectSearch'
import { t } from '../../../Components/Translation'

class Dealer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      lstDropdownDealer: [],
      lstManageLevel: [],
      dataDealer: [],
      showFormPopup: false,
      dealerId: [],
      manageId: [],
      canAdd: false,
      dupData: false
    }
    this.openModal = this.openModal.bind(this)
    this.onRowInserting = this.onRowInserting.bind(this)
  }

  componentWillMount() {
    this.props.getDropdownTable('Dealer')
    this.props.getUserCreateAndUpdateOpt('ManageLevel', '', '')
  }

  componentDidUpdate(prevProps, prevState) {
    let { lstTableDealer, lstManageLevel } = this.props
    let { dealerId, manageId } = this.state

    if (prevProps.lstTableDealer !== lstTableDealer
      || prevProps.lstManageLevel !== lstManageLevel
    ) {
      this.setState({
        lstDropdownDealer: lstTableDealer,
        lstManageLevel: lstManageLevel
      })
    }

    if (prevState.dealerId !== dealerId || prevState.manageId !== manageId
    ) {
      this.validateSave()
    }
  }

  openModal() {
    this.setState(state => ({ showFormPopup: !state.showFormPopup, dealerId: [], manageId: [], dupData: false }))
  }


  getDealerName() {
    let { lstDropdownDealer, dealerId } = this.state
    let obj = lstDropdownDealer.find(x => x.key === parseInt(dealerId));
    return obj.value
  }

  getManageName() {
    let { lstManageLevel, manageId } = this.state
    let obj = lstManageLevel.find(x => x.key === parseInt(manageId));
    return obj.value
  }

  checkDuplicateData() {
    let index = this.props.data.findIndex(x =>
      x.dealerNav.key === parseInt(this.state.dealerId)
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
        "dealerNav": {
          "key": parseInt(this.state.dealerId),
          "value": this.getDealerName()
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
      "dealerNav": {
        "key": e.data.dealerNav.key
      },
      "manageLevelNav": {
        "key": e.data.manageLevelNav.key
      }
    })
  }

  validateSave() {
    let { dealerId, manageId } = this.state
    if (dealerId.length > 0 && manageId.length > 0) {
      this.setState({ canAdd: true })
    }
    else {
      this.setState({ canAdd: false })
    }
  }

  render() {
    let { data } = this.props
    let { showFormPopup, canAdd, dupData, lstDropdownDealer, lstManageLevel, dealerId, manageId } = this.state

    return <div>
      <Table
        btnForm={true}
        btnFormClick={() => this.openModal()}
        btnPermissionClick={() => this.openModal()}
        onRowRemoving={(e) => this.onRowRemoving(e)}
        dataSource={data}
        column={[
          {
            column_name: 'dealerNav.value',
            column_caption: "user_66",
          },
          {
            column_name: 'manageLevelNav.value',
            column_caption: "user_67",
          }
        ]}
      >
      </Table>


      <Modal
        title={t("user_36")}
        visible={showFormPopup}
        okText={t("add")}
        cancelText={t("cancel")}
        onOk={this.onRowInserting}
        okButtonProps={{ disabled: !canAdd }}
        onCancel={this.openModal}
      >
        <FormSelectSearch
          mode={"single"}
          schema={{ "required": ["Dealer"] }}
          fieldForm="Dealer"
          value={dealerId}
          label={"user_35"}
          list={lstDropdownDealer}
          placeholder={"user_59"}
          flex={1}
          onChange={(selected) => {
            this.setState({ dealerId: selected || [] })
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
  lstTableDealer: state.user.lstTableDealer,
  lstManageLevel: state.user.lstManageLevel
});

const mapDispatchToProps = (dispatch) => ({
  getDropdownTable: (name, id) => dispatch(UserActions.getDropdownTable(name, id)),
  getUserCreateAndUpdateOpt: (name, id, query) => dispatch(UserActions.getUserCreateAndUpdateOpt(name, id, query)),
  // getUserOption: (name, data) => dispatch(UserActions.getUserOption(name, data))
});


export default connect(mapStateToProps, mapDispatchToProps)(Dealer)

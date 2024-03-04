import React, { Component } from 'react'
import { connect } from 'react-redux'
import DataGrid, { Column, Paging, Editing, Lookup } from 'devextreme-react/data-grid';
import '../Form/styles.css'
import { get } from 'lodash'
import UserActions from '../../../Redux/UserRedux'
import Table from './Table'
import { Modal } from 'antd';
import FormSelectSearch from '../../../Components/FormControls/FormSelectSearch'
import { t } from '../../../Components/Translation'

class Role extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      alertSetting: {
        show: false,
        type: 4,
        content: "",
      },
      disabled: true,
      showPermissionSummary: false,
      lstDropdownRole: [],
      lstFunctionPreview: [],
      dataRole: [],
      showFormPopup: false,
      showPremissPopup: false,
      roleId: [],
      canAdd: false,
      dupData: false
    }
    this.openModal = this.openModal.bind(this)
    this.openPermissModal = this.openPermissModal.bind(this)
    this.onRowInserting = this.onRowInserting.bind(this)
  }

  componentWillMount() {
    let { ownerPartnerId, userLevel, action, id } = this.props
    if (action === "Add") {
      this.props.getUserCreateAndUpdate('AvaiableRole', undefined, { PartnerId: ownerPartnerId, UserLevel: userLevel })
    }
    else {
      this.props.getUserCreateAndUpdate('AvaiableRole', id)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let { roleId } = this.state
    let { lstAvaiableRole, ownerPartnerId, lstFunctionPreview, userLevel } = this.props

    if (prevProps.userLevel !== userLevel || prevProps.ownerPartnerId !== ownerPartnerId) {
      this.props.getUserCreateAndUpdate('AvaiableRole', undefined, { PartnerId: ownerPartnerId, UserLevel: userLevel })
    }

    if (prevProps.lstAvaiableRole !== lstAvaiableRole) {
      this.setState({ lstDropdownRole: lstAvaiableRole })
    }

    if (prevProps.lstFunctionPreview !== lstFunctionPreview) {
      this.setState({ lstFunctionPreview: lstFunctionPreview })
    }

    if (prevState.roleId !== roleId) {
      this.validateSave()
    }
  }

  openModal() {
    this.setState(state => ({
      showFormPopup: !state.showFormPopup,
      roleId: [],
      dupData: false
    }))
  }

  openPermissModal() {
    let { data, ownerPartnerId } = this.props
    let roleList = []
    for (let index in data) {
      roleList.push(data[index].roleNav.key)
    }

    this.props.getUserCreateAndUpdate('FunctionPreview', ownerPartnerId, { roleIds: roleList })
    this.setState(state => ({ showPremissPopup: !state.showPremissPopup }))
  }

  getRoleName() {
    let { lstDropdownRole, roleId } = this.state
    let obj = lstDropdownRole.find(x => x.key === parseInt(roleId));
    return obj.value
  }

  checkDuplicateData() {
    let index = this.props.data.findIndex(x => x.roleNav.key === parseInt(this.state.roleId))
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
        "roleNav": {
          "key": parseInt(this.state.roleId),
          "value": this.getRoleName()
        },
        "ownerPartnerNav": {
          "key": this.props.ownerPartnerId,
          "value": ""
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
      "roleNav": {
        "key": e.data.roleNav.key
      }
    })
  }

  validateSave() {
    let { roleId } = this.state
    roleId.length > 0 ? this.setState({ canAdd: true }) : this.setState({ canAdd: false })
  }

  render() {
    let { data, lstFunctionPreview } = this.props
    let { showFormPopup, canAdd, dupData, showPremissPopup, lstDropdownRole, dataRole, alertSetting, disabled, roleId } = this.state

    return <div>
      <Table
        btnPerm={true}
        btnForm={true}
        btnFormClick={() => this.openModal()}
        btnPermissionClick={() => this.openPermissModal()}
        onRowRemoving={(e) => this.onRowRemoving(e)}
        dataSource={data}
        column={[{
          column_name: 'roleNav.value',
          column_caption: "user_64",
        }
        ]}
      >
      </Table>

      <Modal
        title={t("user_32")}
        visible={showFormPopup}
        okText={t("add")}
        cancelText={t("cancel")}
        onOk={this.onRowInserting}
        okButtonProps={{ disabled: !canAdd }}
        onCancel={this.openModal}
      >
        <FormSelectSearch
          mode={"single"}
          schema={{ "required": ["role"] }}
          fieldForm="role"
          value={roleId}
          label={"user_29"}
          list={lstDropdownRole}
          placeholder={"user_57"}
          flex={1}
          onChange={(selected) => {
            this.setState({ roleId: selected || [] })
          }}
        />

        {dupData && <div className="form-group field field-string" style={{ padding: '0 10px', marginBottom: -10, flex: 1, textAlign: 'center' }}>
          <span className="text-danger">ไม่สามารถเพิ่มข้อมูล เนื่องจากรายการนี้มีอยู่แล้ว</span>
        </div>}
      </Modal>

      <Modal
        title="Function Preview"
        width="900px"
        height="600px"
        visible={showPremissPopup}
        okText={t("add")}
        cancelText={t("cancel")}
        onCancel={this.openPermissModal}
        footer={null}
      >
        <div className="scroll-modal">
          <table className="table-permission-summary" style={{ margin: '5px 20px' }}>
            {lstFunctionPreview &&
              lstFunctionPreview.permissions.length > 0 &&
              lstFunctionPreview.permissions.map((item) => {
                return [
                  <tr><th>{item.functionName}</th></tr>,
                  item.actions.map((action) => <tr><td>{action.key}</td><td>{action.value}</td></tr>)
                ]
              })

            }
          </table>
        </div>
      </Modal>
    </div >
  }
}


const mapStateToProps = (state) => ({
  userData: state.user.userData,
  lstTableRole: state.user.lstTableRole,
  lstFunctionPreview: state.user.lstFunctionPreview,
  lstAvaiableRole: state.user.lstAvaiableRole,
});

const mapDispatchToProps = (dispatch) => ({
  getDropdownTable: (name, id) => dispatch(UserActions.getDropdownTable(name, id)),
  getUserCreateAndUpdate: (name, id, query) => dispatch(UserActions.getUserCreateAndUpdate(name, id, query)),
  setStateRedux: (name, value) => dispatch(UserActions.setStateRedux(name, value)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Role)

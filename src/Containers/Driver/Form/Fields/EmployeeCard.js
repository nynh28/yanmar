import React, { Component } from 'react'
import { connect } from 'react-redux'
import DropdownActions from '../../../../Redux/DropdownRedux'
import { get } from 'lodash'
import UserActions from '../../../../Redux/UserRedux'
import Table from './Table'
import { Modal } from 'antd';
import FormSelectSearch from '../../../../Components/FormControls/FormSelectSearch'
import FormInput from '../../../../Components/FormControls/FormInput'
import FormDatepicker from '../../../../Components/FormControls/FormDatepicker'
import { t } from '../../../../Components/Translation'
import moment from 'moment'

class EmployeeCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lstDropdownGroup: [],
      showFormPopup: false,
      canAdd: false,
      dupData: false,
      cardTypeData: [],
      cardTypeId: [],
      cardNo: "",
      expiredDate: "",
      note: "",
      actionAdd: ""
    }
    this.openModal = this.openModal.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onRowInserting = this.onRowInserting.bind(this)
  }

  componentWillMount() {
    this.props.getDataDropdown("CardType")
  }

  componentDidUpdate(prevProps, prevState) {
    let { cardTypeId, cardNo } = this.state
    let { CardTypeData } = this.props

    if (prevProps.CardTypeData !== CardTypeData) {
      this.setState({ cardTypeData: CardTypeData })
    }

    if (prevState.cardTypeId !== cardTypeId
      || prevState.cardNo !== cardNo
    ) {
      this.validateSave()
    }
  }

  onChange(name) {
    return (event) => {
      let value = event.target.value
      this.setState({
        [name]: value
      })
    };
  }

  //#region  DATE PICKER
  onChangeDate(name, value) {
    let sta = { [name]: value }
    this.setState(sta, () => this.props.onChange(this.state));
  }

  onChangeInputDate(fieldForm) {
    this.setState({
      [fieldForm]: this.state[fieldForm]
    })
  }

  //#endregion

  openModal() {
    this.setState(state => ({
      showFormPopup: !state.showFormPopup,
      cardTypeId: [],
      cardNo: "",
      expiredDate: "",
      note: "",
      dupData: false,
      actionAdd: ""
    }))
  }

  getCardTypeName() {
    let { cardTypeData, cardTypeId } = this.state
    let obj = cardTypeData.find(x => x.key === parseInt(cardTypeId));
    return obj.value
  }

  checkDuplicateData() {
    let index = this.props.data.findIndex(x => x.cardTypeNav.key === parseInt(this.state.cardTypeId) && x.cardId === this.state.cardNo)
    if (index > -1) {
      this.setState({ dupData: true })
      return true
    }
    else {
      return false
    }
  }

  onRowInserting() {
    let { cardTypeId, cardNo, expiredDate, note, actionAdd } = this.state
    // console.log("actionAdd : ", actionAdd)
    if (!this.checkDuplicateData()) {
      this.props.onChange("INSERT", {
        "id": "INSERT_" + Math.floor(Math.random() * 1000),
        "action": "INSERT",
        // "action": actionAdd === "UPDATE" ? "UPDATE" : "INSERT",
        "cardTypeNav": {
          "key": parseInt(cardTypeId),
          "value": this.getCardTypeName()
        },
        "cardId": cardNo,
        "cardExpired": expiredDate,
        "description": note,
      })
      this.openModal()
      this.setState({ dupData: false })
    }
  }

  onRowRemoving(e) {
    // console.log("e ", e)
    this.props.onChange("DELETE", {
      "id": e.data.id,
      "action": "DELETE",
      "cardTypeNav": {
        "key": e.data.cardTypeNav.key
      },
      "cardId": e.data.cardId
    })
  }
  onRowEditing(e) {
    let dt = e.data
    this.setState(state => ({
      showFormPopup: !state.showFormPopup,
      cardTypeId: "" + get(dt, 'cardTypeNav.key', ''),
      cardNo: get(dt, 'cardId', ''),
      expiredDate: get(dt, 'cardExpired', ''),
      note: get(dt, 'description', ''),
      actionAdd: "UPDATE"
    }))
  }

  validateSave() {
    let { cardTypeId, cardNo } = this.state
    if (cardTypeId.length > 0 && cardNo !== "")
      this.setState({ canAdd: true })
    else
      this.setState({ canAdd: false })
  }

  render() {
    let { data } = this.props
    let { actionAdd, cardTypeData, canAdd, dupData, showFormPopup, cardTypeId, cardNo, expiredDate, note } = this.state

    let dataSource = []
    for (let index in data) {

      let cardExpired = get(data[index], 'cardExpired', '')
      cardExpired !== "" ? cardExpired = moment(cardExpired).format('DD/MM/YYYY') : cardExpired = cardExpired


      dataSource.push({
        "id": get(data[index], 'id', ''),
        "action": get(data[index], 'action', ''),
        "cardTypeNav": {
          "key": get(data[index], 'cardTypeNav.key', ''),
          "value": get(data[index], 'cardTypeNav.value', ''),
        },
        "cardId": get(data[index], 'cardId', ''),
        "description": get(data[index], 'description', ''),
        "cardExpired": cardExpired
      })
    }

    return <div>
      <Table
        btnForm={true}
        btnFormClick={() => this.openModal()}
        btnPermissionClick={() => this.openModal()}
        onRowRemoving={(e) => this.onRowRemoving(e)}
        onRowEditing={(e) => this.onRowEditing(e)}
        dataSource={dataSource}
        column={[
          {
            column_name: 'cardTypeNav.value',
            column_caption: "driver_119",
          },
          {
            column_name: 'cardId',
            column_caption: "driver_120",
          },
          {
            column_name: 'cardExpired',
            column_caption: "driver_121",
          },
          {
            column_name: 'description',
            column_caption: "driver_122",
          }
        ]}
      >
      </Table>
      <Modal
        title={t("driver_133")}
        visible={showFormPopup}
        okText={actionAdd === "UPDATE" ? t("save") : t("add")}
        cancelText={t("cancel")}
        onOk={this.onRowInserting}
        okButtonProps={{ disabled: !canAdd }}
        onCancel={this.openModal}
      >
        <FormSelectSearch
          mode={"single"}
          schema={{ "required": ["cardType"] }}
          value={cardTypeId}
          label={"card_type"}
          list={cardTypeData}
          // list={[]}
          fieldForm={"cardType"}
          placeholder={"driver_134"}
          flex={1}
          onChange={(selected) => {
            this.setState({ cardTypeId: selected })
          }}
        />

        <FormInput
          schema={{ "required": ["cardNo"] }}
          value={cardNo}
          label={"card_no"}
          fieldForm={"cardNo"}
          placeholder={"driver_135"}
          disabled={actionAdd === "UPDATE" ? true : false}
          flex={1}
          onChange={this.onChange("cardNo")}
        />

        <FormDatepicker
          schema={{ "required": [] }}
          value={expiredDate}
          label={"expired_date"}
          fieldForm={"expiredDate"}
          placeholder={"driver_136"}
          flex={1}
          onChange={this.onChangeDate}
        />

        <FormInput
          schema={{ "required": [] }}
          value={note}
          label={"note"}
          fieldForm={"note"}
          placeholder={"driver_137"}
          flex={1}
          onChange={this.onChange("note")}
        />
        {dupData && <div className="form-group field field-string" style={{ padding: '0 10px', marginBottom: -10, flex: 1, textAlign: 'center' }}>
          <span className="text-danger">ไม่สามารถเพิ่มข้อมูล เนื่องจากรายการนี้มีอยู่แล้ว</span>
        </div>}
      </Modal>
    </div>
  }
}

const mapStateToProps = (state) => ({
  CardTypeData: state.dropdown.CardTypeData
  //   userData: state.user.userData,
  //   lstOwnerGroup: state.user.lstOwnerGroup,
});

const mapDispatchToProps = (dispatch) => ({
  getDataDropdown: (optionGroup, key) => dispatch(DropdownActions.getDataDropdown(optionGroup, key)),

  //   getDropdownTable: (name, id) => dispatch(UserActions.getDropdownTable(name, id)),
  //   getUserCreateAndUpdate: (name, id, query) => dispatch(UserActions.getUserCreateAndUpdate(name, id, query)),

});


export default connect(mapStateToProps, mapDispatchToProps)(EmployeeCard)

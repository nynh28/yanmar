import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import MaintenanceRedux from '../../Redux/MaintenanceRedux'
import { Modal } from 'antd';
import { t, rTT } from '../../Components/Translation'
import { fnUpdateNotify } from './fnUpdateNotify'
import { get } from 'lodash'

class ModalNote extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: ""
    }
    this.updateNote = this.updateNote.bind(this)
  }

  componentDidMount() {
    if (get(this.props.dataNote, 'note')) this.setState({ value: this.props.dataNote.note })
  }

  shouldComponentUpdate(nextProps) {
    let { dataNote, messageData } = this.props

    if (nextProps.dataNote !== dataNote) {
      this.setState({ value: nextProps.dataNote.note })
    }

    if (nextProps.messageData !== messageData) return false

    return true
  }

  async updateNote() {
    let { dataNote, messageData } = this.props
    let response = await fnUpdateNotify({
      id: dataNote.id,
      language: this.props.language,
      body: { note: this.state.value }
    })

    this.props.setValue("showNotePopup", false)
    if (response === 201) {
      let newData = JSON.parse(JSON.stringify(messageData))
      let idx = messageData.findIndex(item => item.id === dataNote.id)
      if (idx >= 0) {
        newData[idx].note = this.state.value
      }

      setTimeout(() => this.props.setValue("messageData", newData), 500)
    }
  }


  render() {
    let { showNotePopup } = this.props

    return (
      <Suspense fallback={null}>
        <Modal
          title={t("Maintenace_20")}
          visible={showNotePopup}
          okText={t("add")}
          cancelText={t("cancel")}
          onOk={this.updateNote}
          onCancel={() => {
            this.props.setValue("dataNote", {})
            this.props.setValue("showNotePopup", false)
          }}
        >
          <textarea
            rows="10"
            className="form-control"
            value={this.state.value}
            placeholder={rTT(t("Maintenace_18"))}
            onChange={(e) => this.setState({ value: e.target.value })}
          />
        </Modal>
      </Suspense >
    )
  }
}

const mapStateToProps = (state) => ({
  language: state.versatile.language,
  showNotePopup: state.maintenance.showNotePopup,
  dataNote: state.maintenance.dataNote,
  messageData: state.maintenance.messageData
});

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(MaintenanceRedux.setValue(name, value)),

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalNote))

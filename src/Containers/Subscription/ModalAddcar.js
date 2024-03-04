import React, { Component } from 'react'
import { connect } from 'react-redux'
// import BasicData from "./Form/Fields/BasicData"
// import { setSchema } from './Form/schema.js'
import { Modal } from 'antd';
import Table from '../../Components/DataGridView/Table'
import { t } from '../../Components'
import { ENDPOINT_BASE_URL_YNM, ENDPOINT_BASE_URL } from '../../Config/app-config';


class ModalAddcar extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.vehicle = []
    this.selectId = []
  }

  render(props) {
    const { visible, selected } = this.props
    const { } = this.state
    return (
      <div>
        <Modal
          title={t("subscription_63")}
          width={1000}
          visible={visible}
          okText={t("save")}
          cancelText={t("cancel")}
          onOk={() => this.props.onClick(this.vehicle, this.selectId)}
          onCancel={() => this.props.onCancel()}
        >
          <Table
            mode={"api"}
            serversideSource={`${ENDPOINT_BASE_URL}ServiceContract/Yanmar/Vehicle/${this.props.sellerId}${selected.length > 0 ? `?SelectedId=${JSON.stringify(selected)}` : ""}`}
            // author={idToken}
            xAPIKey={this.props.header.redisKey}
            // user_id={userId}
            table_id={4}
            showSetting={false}
            editing={{
              enabled: false,
              allowUpdating: false,
              allowDeleting: false
            }}
            autoExpandAll={false}
            selectedCallback={(e) => {
              console.log(this.selectId)
              // this.selectId = `?SelectedId=${e.selectedRowKeys}`
              this.vehicle = e.selectedRowsData
            }}
            tableKey={"subscriberId"}
            columnCount="subscriberNo"
            column={[
              {
                column_name: 'model',
                column_caption: "รุ่นรถ",
              }, {

                column_name: 'vin',
                column_caption: "เลขรถ",

              }, {

                column_name: 'engineNo',
                column_caption: "เลขเครื่อง",

              }, {
                column_name: 'mid',
                column_caption: "MID",
              }
            ]}
          >


          </Table>
        </Modal>
      </div >
    )
  }
}
const mapStateToProps = (state) => ({
  header: state.signin.header,
  language: state.versatile.language
})

export default connect(mapStateToProps)(ModalAddcar)

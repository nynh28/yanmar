import React, { Component } from 'react'
import { connect } from 'react-redux'
import DataGrid, { Column, Paging, Editing } from 'devextreme-react/data-grid';
import '../Form/styles.css'
import UserActions from '../../../Redux/UserRedux'
import { Modal } from 'antd';
import { t } from '../../../Components/Translation'
import { useTranslation } from 'react-i18next'

const DataGridTrans = (arg) => {
  const { t } = useTranslation()
  return (
    <DataGrid
      id={'gridContainer_role'}
      dataSource={arg.dataSource || []}
      keyExpr="agreementId"
      allowColumnReordering={false}
      showBorders={true}
    >
      <Paging enabled={true} defaultPageSize={5} />
      <Editing
        mode="row"
      />

      {arg.column && arg.column.map((element, index) => {
        return (
          <Column key={index} dataField={element.column_name} caption={t(element.column_caption)} />
        )
      })}
      <Column type="buttons" width={150}
        buttons={[{
          hint: 'View',
          icon: 'search',
          onClick: arg.viewAgreement
        }
        ]} />
    </DataGrid>
  )
}

class Agreement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAgreement: false
    }
    this.modalOpening = this.modalOpening.bind(this);
    this.viewAgreement = this.viewAgreement.bind(this);
  }

  viewAgreement(e) {
    this.props.getAgreementUser(this.props.id, e.row.key)
    this.modalOpening()

  }

  modalOpening() {
    this.setState(state => ({ showAgreement: !state.showAgreement }))
  }

  render() {
    let { id, agreementInfos, infoAgreement } = this.props
    return <div>
      <DataGridTrans
        dataSource={agreementInfos}
        viewAgreement={this.viewAgreement}
        downloadAgreement={this.downloadAgreement}
        column={[
          {
            column_name: 'typeName',
            column_caption: "Agreement Type",
          },
          {
            column_name: 'isAgreement',
            column_caption: "Agreement Status",
          },
          {
            column_name: 'dateTime',
            column_caption: "Agreement Date Time",
          }
        ]}
      />

      <Modal
        title="Agreement"
        width="900px"
        height="600px"
        visible={this.state.showAgreement}
        okText={t("add")}
        cancelText={t("cancel")}
        onCancel={this.modalOpening}
        footer={null}
      >
        <div className="scroll-modal">
          <table className="table-permission-summary" style={{ margin: '5px 20px' }}>
            {infoAgreement}
          </table>
        </div>
      </Modal>
    </div>
  }
}

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  infoAgreement: state.user.infoAgreement,
});

const mapDispatchToProps = (dispatch) => ({
  getAgreementUser: (id, agreementId) => dispatch(UserActions.getAgreementUser(id, agreementId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Agreement)
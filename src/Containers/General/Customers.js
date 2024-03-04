import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import GeneralActions from '../../Redux/GeneralRedux'
import PannelBox from '../../Components/PannelBox'
// import BasicData from "./Form/Fields/BasicData"
import images from '../../Themes/Images'
import { diff } from 'json-diff';
import SaveButton from '../../Components/SaveButton'
import CancelButton from '../../Components/CancelButton'
import { get } from 'lodash'
import moment from 'moment'
import Tabbed from '../../Components/Tabbed'
import Alert from '../../Components/Alert'
import { t, v, v_em } from '../../Components/Translation'
import { Select, Modal, TimePicker, Slider, InputNumber, Button } from 'antd';
import { Row, Label, FormGroup, Col, Input, ButtonGroup } from 'reactstrap';
import TableHistory from './Table.js'
import ModalEdit from './ModalEdit.js'
import './styleGeneral.css'
import { momentDate } from '../../Functions/DateMoment';
import { isEqual, isEmpty } from 'lodash';
import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
  Editing,
  Popup,
  Lookup,
  Form
} from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';

import { useTranslation } from 'react-i18next'

const { Option } = Select;

const listGMT = [
  { key: '-12', value: '-12:00' },
  { key: '-11', value: '-11:00' },
  { key: '-10', value: '-10:00' },
  { key: '-9', value: '-09:00' },
  { key: '-8', value: '-08:00' },
  { key: '-7', value: '-07:00' },
  { key: '-6', value: '-06:00' },
  { key: '-5', value: '-05:00' },
  { key: '-4', value: '-04:00' },
  { key: '-3', value: '-03:00' },
  { key: '-2', value: '-02:00' },
  { key: '-1', value: '-01:00' },
  { key: '0', value: '+00:00' },
  { key: '1', value: '+01:00' },
  { key: '2', value: '+02:00' },
  { key: '3', value: '+03:00' },
  { key: '4', value: '+04:00' },
  { key: '5', value: '+05:00' },
  { key: '6', value: '+06:00' },
  { key: '7', value: '+07:00' },
  { key: '8', value: '+08:00' },
  { key: '9', value: '+09:00' },
  { key: '10', value: '+10:00' },
  { key: '11', value: '+11:00' },
  { key: '12', value: '+12:00' },
  { key: '13', value: '+13:00' },
  { key: '14', value: '+14:00' }
]

const format = 'HH:mm';

const Table = (arg) => {

  const { t } = useTranslation()

  return <DataGrid
    ref={arg.datagrids}
    dataSource={arg.dataSource}
    keyExpr={arg.key}
    onEditingStart={arg.onEditingStart}
    columnAutoWidth={true}
    columnMinWidth={100}
    showBorders={true}
    // onToolbarPreparing={arg.onToolbarPreparing}
    // columnAutoWidth={true}
    // columnMinWidth={100}
    columnResizingMode={"widget"}
    allowColumnReordering={true}
  >
    <SearchPanel visible={true} placeholder={t("dg_search")} />
    <Paging defaultPageSize={15} />
    <Editing
      mode="row"
      useIcons={true}
      allowUpdating={true}
    />
    {arg.column.map((item) => {
      return <Column
        dataField={item.data_field}
        caption={t(item.caption)}
        cellRender={item.column_render}
        alignment={item.alignment}
      // groupCellTemplate={item.column_render ? (elem, data) => arg.groupCellTemplate(elem, data, item.column_render) : false}
      // fixed={item.fixed}
      // fixedPosition={"right"}
      />
    })}

    <Column fixed={true} type="buttons" width={110}
      buttons={[{
        hint: "History",
        // icon: groupfile,
        icon: "fas fa-history",
        // icon: "groupfile",
        visible: true,
        onClick: arg.onClickHistory
      }, 'edit']} />

    {/* <Column type="buttons" width={110}>
      <Button name="edit" />
      <Button hint="History" icon="email" visible={true} onClick={arg.onClickHistory} />
    </Column> */}

  </DataGrid>
}


class Customers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      infoCustomer: [],
      customer: {},
      showPopupHistory: false
    }
    // this.setTabEnable = this.setTabEnable.bind(this)
    this.datagrids = React.createRef();
    this.openModal = this.openModal.bind(this)
    this.onRowUpdating = this.onRowUpdating.bind(this)
    // this.submitConfirm = this.submitConfirm.bind(this)
  }

  componentWillMount() {
    let { infoCustomer } = this.props
    if (!isEmpty(infoCustomer)) this.setState({ infoCustomer: JSON.parse(JSON.stringify(infoCustomer)) })
  }

  componentDidMount() {
    // this.setInfoGeneralToInfoGroups()
  }

  componentWillUnmount() {
    // this.props.setPersonalIdSelect(null, null)
  }

  componentDidUpdate(prevProps, prevState) {
    let { infoCustomer } = this.props
    if (prevProps.infoCustomer !== infoCustomer) this.setState({ infoCustomer: JSON.parse(JSON.stringify(infoCustomer)) })



  }

  onRowUpdating(data) {
    let { dataEdit, confirmEdit } = this.state
    let { infoCustomer } = this.props

    if (data) {
      dataEdit.default_gmt = data.default_gmt
      dataEdit.start_time_of_day = data.start_time_of_day
      dataEdit.fuel_coefficient = data.fuel_coefficient

      let prodInfo = infoCustomer.find((itm) => itm.partner_id === data.partner_id)

      if (!isEqual(prodInfo, data)) {
        this.props.updateInfoCustomer("UPDATE", data)
      } else {
        this.props.updateInfoCustomer('DELETE', data.partner_id)
      }
      this.openModal({ dataEdit: undefined })
      const dataSource = this.datagrids.current.instance.getDataSource();
      dataSource.load();
    } else {
      this.openModal('showPopupEdit')
    }

  }

  openModal(name, obj = {}) {
    // console.log('name', name)
    if (typeof name === 'string')
      this.setState(state => ({ [name]: !state[name], ...obj }))
    else
      this.setState({ showPopupEdit: false, showPopupHistory: false })
  }

  render() {
    let { loadingHistory, infoHistory } = this.props
    let { customer, showPopupEdit, showPopupHistory, infoCustomer, dataEdit } = this.state

    return [
      <Table
        datagrids={this.datagrids}
        dataSource={infoCustomer}
        key={"partner_id"}
        onEditingStart={(e) => {
          this.openModal('showPopupEdit', { dataEdit: e.data })
          e.cancel = true
        }}
        onClickHistory={(e) => {
          let id = get(e, 'row.data.partner_id')
          if (id !== undefined) {
            this.props.getHistoryGeneral(id)
            this.openModal('showPopupHistory')
          }

        }}
        column={[
          { data_field: 'partner_name', caption: "dealer" },
          {
            data_field: 'default_gmt',
            caption: "general_1",
            alignment: "right",
            column_render: (data) => {
              let idx = listGMT.findIndex((item) => item.key === data.value)
              if (idx >= 0) return listGMT[idx].value
            }
          },
          {
            data_field: 'start_time_of_day',
            alignment: 'right',
            caption: "general_2"
          },
          {
            data_field: 'fuel_coefficient',
            alignment: 'right',
            caption: "general_11"
          }
        ]}
      />,

      showPopupEdit && <ModalEdit
        dataEdit={dataEdit}
        onRowUpdating={(ele) => this.onRowUpdating(ele)}
        form="customer"
      />
      ,

      <Modal
        title={t("general_4")}
        width={800}
        visible={showPopupHistory}
        onCancel={this.openModal}
        footer={[
          <Button key="back" onClick={this.openModal}>
            {t("cancel")}
          </Button>
        ]}
      >

        {loadingHistory ?
          <div>
            <center><img src={images.loading} style={{ width: 50, height: 50 }}></img></center>
            <center>{t("loading")}</center>
          </div>

          : <TableHistory
            btnForm={true}
            dataSource={infoHistory || []}
            column={[
              {
                column_name: 'updated_date_time',
                column_caption: "general_6",
                column_render: (e) => <div>{momentDate(e.value)}</div>
              },
              {
                column_name: 'fuel_coefficient',
                column_caption: "general_11",
              },
              {
                column_name: 'update_by',
                column_caption: "general_7",
              }

            ]}
          >
          </TableHistory>}

      </Modal>
    ]

  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  loadingHistory: state.general.loadingHistory,
  infoHistory: state.general.infoHistory,
});
const mapDispatchToProps = (dispatch) => ({
  updateInfoCustomer: (action, objOrId) => dispatch(GeneralActions.updateInfoCustomer(action, objOrId)),
  getHistoryGeneral: (partnerId) => dispatch(GeneralActions.getHistoryGeneral(partnerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Customers)


// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import GeneralActions from '../../Redux/GeneralRedux'
// import PannelBox from '../../Components/PannelBox'
// // import BasicData from "./Form/Fields/BasicData"
// import images from '../../Themes/Images'
// import { diff } from 'json-diff';
// import SaveButton from '../../Components/SaveButton'
// import CancelButton from '../../Components/CancelButton'
// import { get } from 'lodash'
// import moment from 'moment'
// import Tabbed from '../../Components/Tabbed'
// import Alert from '../../Components/Alert'
// import { t, v, v_em } from '../../Components/Translation'
// import { Select, TimePicker, Slider, InputNumber } from 'antd';
// import { Row, Label, FormGroup, Col, Input, ButtonGroup } from 'reactstrap';
// import Table from './Table.js'
// import './styleGeneral.css'
// import { Button, Modal } from 'antd';
// import { isEqual } from 'lodash';
// import { isEmpty } from 'react-redux-firebase';
// import { momentDate } from '../../Functions/DateMoment';

// const { Option } = Select;

// const listGMT = [
//   { key: '-12', value: '-12:00' },
//   { key: '-11', value: '-11:00' },
//   { key: '-10', value: '-10:00' },
//   { key: '-9', value: '-09:00' },
//   { key: '-8', value: '-08:00' },
//   { key: '-7', value: '-07:00' },
//   { key: '-6', value: '-06:00' },
//   { key: '-5', value: '-05:00' },
//   { key: '-4', value: '-04:00' },
//   { key: '-3', value: '-03:00' },
//   { key: '-2', value: '-02:00' },
//   { key: '-1', value: '-01:00' },
//   { key: '0', value: '+00:00' },
//   { key: '1', value: '+01:00' },
//   { key: '2', value: '+02:00' },
//   { key: '3', value: '+03:00' },
//   { key: '4', value: '+04:00' },
//   { key: '5', value: '+05:00' },
//   { key: '6', value: '+06:00' },
//   { key: '7', value: '+07:00' },
//   { key: '8', value: '+08:00' },
//   { key: '9', value: '+09:00' },
//   { key: '10', value: '+10:00' },
//   { key: '11', value: '+11:00' },
//   { key: '12', value: '+12:00' },
//   { key: '13', value: '+13:00' },
//   { key: '14', value: '+14:00' }
// ]

// const format = 'HH:mm';

// class Customers extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       customer: {},
//       showFormPopup: false
//     }
//     // this.setTabEnable = this.setTabEnable.bind(this)
//     this.openModal = this.openModal.bind(this)
//     // this.submitConfirm = this.submitConfirm.bind(this)
//   }

//   componentWillMount() {
//     let { customer } = this.props
//     if (!isEmpty(customer)) this.setState({ customer: JSON.parse(JSON.stringify(customer)) })
//   }

//   componentDidMount() {
//     // this.setInfoGeneralToInfoGroups()
//   }

//   componentWillUnmount() {
//     // this.props.setPersonalIdSelect(null, null)
//   }

//   componentDidUpdate(prevProps, prevState) {
//     let { customer } = this.props
//     if (prevProps.customer !== customer) this.setState({ customer: JSON.parse(JSON.stringify(customer)) })



//   }

//   onFormChangeCustomer(id, name, value) {
//     let { customer } = this.state

//     if (name === 'GMT') customer.default_gmt = value
//     else if (name === 'sTime') customer.start_time_of_day = value
//     else if (name === 'fuelC') customer.fuel_coefficient = value

//     if (isEqual(this.props.customer, customer)) this.props.updateInfoCustomer('DELETE', id)
//     else this.props.updateInfoCustomer("UPDATE", customer)

//     this.setState({ customer })
//   }

//   openModal() {
//     this.setState(state => ({ showFormPopup: !state.showFormPopup }))
//   }

//   render() {
//     let { loadingHistory, infoHistory } = this.props
//     let { customer, showFormPopup } = this.state
//     let { partner_id, partner_name, default_gmt, start_time_of_day, fuel_coefficient } = customer

//     return (
//       <div style={{ marginBottom: '20px' }}>
//         {/* {this.props.dataLogin.userLevelId !== 41 && this.props.dataLogin.userLevelId !== 42 && <Label>{partner_name}</Label>} */}
//         <Label>{partner_name}</Label>
//         <Row style={{ marginBottom: '10px', marginTop: '10px' }}>
//           <Col md={3} >
//             <div className="text-md-right"> {t('general_1')}</div>
//             {/* <div className="text-md-right"> {t('GMT')}</div> */}
//           </Col>
//           <Col md={3}>
//             <Select
//               mode={'single'}
//               style={{ width: '100%', maxWidth: 151 }}
//               value={default_gmt}
//               onChange={(selected) => this.onFormChangeCustomer(partner_id, 'GMT', selected)}
//             >
//               {listGMT.map((item) => <Option key={item.key}>{item.value}</Option>)}
//             </Select>
//           </Col>
//           <Col md={3}>
//             <div className="text-md-right"> {t('general_2')}</div>
//             {/* <div className="text-md-right"> {t('Start Time of Day')}</div> */}
//           </Col>
//           <Col md={3}>
//             <TimePicker
//               onChange={(selected) => {
//                 this.onFormChangeCustomer(partner_id, 'sTime', selected ? selected.format(format) : '00:00')
//               }}
//               value={moment(start_time_of_day, format)}
//               format={format} />
//           </Col>
//         </Row>
//         <Row>
//           <Col md={3}>
//             <div className="text-md-right"> {t('general_3')}</div>
//             {/* <div className="text-md-right"> {t('Fuel Coefficient Value')}</div> */}
//           </Col>
//           <Col md={3}>
//             <Slider
//               min={-10}
//               max={10}
//               marks={{
//                 '-10': '-10',
//                 '0': '0',
//                 '10': '10',
//               }}
//               onChange={(selected) => this.onFormChangeCustomer(partner_id, 'fuelC', selected)}
//               value={typeof fuel_coefficient === 'number' ? fuel_coefficient : 0}
//             // step={0.01}
//             />
//           </Col>
//           <Col md={1}>
//             <span>{typeof fuel_coefficient === 'number' ? fuel_coefficient : 0} %</span>
//             {/* <Button
//               style={{ marginLeft: 10, width: 151 }}
//               onClick={() => {
//                 // this.getExistingDriver(intCustId, personalId)
//               }}
//             >{t("history")}</Button> */}
//           </Col>
//           <Col md={3}>
//             <Button
//               style={{ width: 151 }}
//               onClick={() => {
//                 this.props.getHistoryGeneral(partner_id)
//                 this.openModal()
//               }}
//             >{t("general_4")}</Button>
//           </Col>
//         </Row>
//         <Row>
//           <Col md={3}>
//             {/* <div className="text-md-right"> {t('Fuel Coefficient Value')}</div> */}
//           </Col>
//           <Col md={9}><small>{t("general_5")}</small></Col>
//         </Row>
//         <Modal
//           title={t("general_4")}
//           width={800}
//           visible={showFormPopup}
//           onCancel={this.openModal}
//           footer={[
//             <Button key="back" onClick={this.openModal}>
//               {t("cancel")}
//             </Button>
//           ]}
//         >

//           {loadingHistory ?
//             <div>
//               <center><img src={images.loading} style={{ width: 50, height: 50 }}></img></center>
//               <center>{t("loading")}</center>
//             </div>

//             : <Table
//               btnForm={true}
//               dataSource={infoHistory || []}
//               column={[
//                 {
//                   column_name: 'updated_date_time',
//                   column_caption: "general_6",
//                   column_render: (e) => <div>{momentDate(e.value)}</div>
//                 },
//                 {
//                   column_name: 'fuel_coefficient',
//                   column_caption: "general_3",
//                 },
//                 {
//                   column_name: 'update_by',
//                   column_caption: "general_7",
//                 }
//               ]}
//             >
//             </Table>}

//         </Modal>
//       </div >
//     )
//   }
// }

// const mapStateToProps = (state) => ({
//   dataLogin: state.signin.dataLogin,
//   loadingHistory: state.general.loadingHistory,
//   infoHistory: state.general.infoHistory,
// });
// const mapDispatchToProps = (dispatch) => ({
//   updateInfoCustomer: (action, objOrId) => dispatch(GeneralActions.updateInfoCustomer(action, objOrId)),
//   getHistoryGeneral: (partnerId) => dispatch(GeneralActions.getHistoryGeneral(partnerId)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Customers)



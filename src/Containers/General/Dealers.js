import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import GeneralActions from '../../Redux/GeneralRedux'
import PannelBox from '../../Components/PannelBox'
// import BasicData from "./Form/Fields/BasicData"
import { diff } from 'json-diff';
import SaveButton from '../../Components/SaveButton'
import CancelButton from '../../Components/CancelButton'
import { get } from 'lodash'
import moment from 'moment'
import Tabbed from '../../Components/Tabbed'
import Alert from '../../Components/Alert'
import { t, v, v_em } from '../../Components/Translation'
import { Select, Modal, TimePicker, Slider, InputNumber } from 'antd';
import { Row, Label, FormGroup, Col, Input, ButtonGroup, Button } from 'reactstrap';
// import Table from './Table.js'
import './styleGeneral.css'
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
import ModalEdit from './ModalEdit.js'

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

  </DataGrid>
}

class Dealers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dealer: {},
      infoDealer: []
    }

    this.datagrids = React.createRef();
    this.openModal = this.openModal.bind(this)
    this.onRowUpdating = this.onRowUpdating.bind(this)
  }

  componentWillMount() {
    let { infoDealer } = this.props
    if (!isEmpty(infoDealer)) this.setState({ infoDealer: JSON.parse(JSON.stringify(infoDealer)) })
  }

  componentDidMount() {
    // this.setInfoGeneralToInfoGroups()
  }

  componentWillUnmount() {
    // this.props.setPersonalIdSelect(null, null)
  }

  componentDidUpdate(prevProps, prevState) {
    let { infoDealer } = this.props
    if (prevProps.infoDealer !== infoDealer) this.setState({ infoDealer: JSON.parse(JSON.stringify(infoDealer)) })
  }

  openModal(obj = {}) {
    this.setState(state => ({ showFormPopup: !state.showFormPopup, ...obj }))
  }


  onRowUpdating(data) {

    let { dataEdit } = this.state
    let { infoDealer } = this.props

    if (data) {
      dataEdit.default_gmt = data.default_gmt
      dataEdit.start_time_of_day = data.start_time_of_day

      let prodInfo = infoDealer.find((itm) => itm.partner_id === data.partner_id)

      if (!isEqual(prodInfo, data)) {
        this.props.updateInfoDealer("UPDATE", data)
      } else {
        this.props.updateInfoDealer('DELETE', data.partner_id)
      }
      this.openModal({ dataEdit: undefined })
      const dataSource = this.datagrids.current.instance.getDataSource();
      dataSource.load();
    } else {
      this.openModal()
    }


  }

  render() {
    let { infoDealer, showFormPopup, dataEdit } = this.state

    return [
      <Table
        datagrids={this.datagrids}
        dataSource={infoDealer}
        key={"partner_id"}
        onEditingStart={(e) => {
          this.openModal({ dataEdit: e.data })
          e.cancel = true
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
        ]}
      />,

      showFormPopup && <ModalEdit
        dataEdit={dataEdit}
        onRowUpdating={(ele) => this.onRowUpdating(ele)}
        form="dealer"
      />
    ]
  }
}

const mapStateToProps = (state) => ({
});
const mapDispatchToProps = (dispatch) => ({
  updateInfoDealer: (action, objOrId) => dispatch(GeneralActions.updateInfoDealer(action, objOrId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dealers)


// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import GeneralActions from '../../Redux/GeneralRedux'
// import PannelBox from '../../Components/PannelBox'
// // import BasicData from "./Form/Fields/BasicData"
// import { diff } from 'json-diff';
// import SaveButton from '../../Components/SaveButton'
// import CancelButton from '../../Components/CancelButton'
// import { get } from 'lodash'
// import moment from 'moment'
// import Tabbed from '../../Components/Tabbed'
// import Alert from '../../Components/Alert'
// import { t, v, v_em } from '../../Components/Translation'
// import { Select, TimePicker, Slider, InputNumber } from 'antd';
// import { Row, Label, FormGroup, Col, Input, ButtonGroup, Button } from 'reactstrap';
// import Table from './Table.js'
// import './styleGeneral.css'
// import { Modal } from 'antd';
// import { isEqual } from 'lodash';
// import { isEmpty } from 'react-redux-firebase';

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

// class Dealers extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       dealer: {},
//     }
//     // this.setTabEnable = this.setTabEnable.bind(this)
//     // this.openModal = this.openModal.bind(this)
//     // this.submitConfirm = this.submitConfirm.bind(this)
//   }

//   componentWillMount() {
//     let { dealer } = this.props
//     if (!isEmpty(dealer)) this.setState({ dealer: JSON.parse(JSON.stringify(dealer)) })
//   }

//   componentDidMount() {
//     // this.setInfoGeneralToInfoGroups()
//   }

//   componentWillUnmount() {
//     // this.props.setPersonalIdSelect(null, null)
//   }

//   componentDidUpdate(prevProps, prevState) {
//     let { dealer } = this.props
//     if (prevProps.dealer !== dealer) this.setState({ dealer: JSON.parse(JSON.stringify(dealer)) })



//   }

//   onFormChangeDealer(id, name, value) {
//     let { dealer } = this.state

//     if (name === 'GMT') dealer.default_gmt = value
//     else if (name === 'sTime') dealer.start_time_of_day = value

//     if (isEqual(this.props.dealer, dealer)) this.props.updateInfoDealer('DELETE', id)
//     else this.props.updateInfoDealer("UPDATE", dealer)

//     this.setState({ dealer })
//     // this.setTabEnable()
//   }

//   render() {
//     let { partner_id, partner_name, default_gmt, start_time_of_day } = this.state.dealer

//     return (
//       <div style={{ marginBottom: '20px' }}>
//         <Label>{partner_name}</Label>
//         <Row style={{ marginTop: '10px' }}>
//           <Col lg={6}>
//             <Row>
//               <Col md={6} >
//                 <div className="text-md-right"> {t('general_1')}</div>
//                 {/* <div className="text-md-right"> {t('GMT')}</div> */}
//               </Col>
//               <Col md={6}>
//                 <Select
//                   mode={'single'}
//                   style={{ width: '100%', maxWidth: 151 }}
//                   value={default_gmt}
//                   onChange={(selected) => this.onFormChangeDealer(partner_id, 'GMT', selected)}
//                 >
//                   {listGMT.map((item) => <Option key={item.key}>{item.value}</Option>)}
//                 </Select>
//               </Col>
//             </Row>
//           </Col>
//           <Col lg={6}>
//             <Row>
//               <Col md={6}>
//                 <div className="text-md-right"> {t('general_2')}</div>
//                 {/* <div className="text-md-right"> {t('Start Time of Day')}</div> */}
//               </Col>
//               <Col md={6}>
//                 <TimePicker
//                   onChange={(selected) => this.onFormChangeDealer(partner_id, 'sTime', selected ? selected.format(format) : '00:00')}
//                   value={moment(start_time_of_day, format)}
//                   format={format} />
//               </Col>
//             </Row>
//           </Col>
//         </Row>
//       </div >
//     )
//   }
// }

// const mapStateToProps = (state) => ({
// });
// const mapDispatchToProps = (dispatch) => ({
//   updateInfoDealer: (action, objOrId) => dispatch(GeneralActions.updateInfoDealer(action, objOrId)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Dealers)



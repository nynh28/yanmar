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


class ModalEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPopupEdit: false,
      dataEdit: {}
    }
    this.openModal = this.openModal.bind(this)
  }

  componentWillMount() {
    let { showPopupEdit, dataEdit } = this.props
    this.setState({ showPopupEdit, dataEdit: JSON.parse(JSON.stringify(dataEdit)) })
  }

  componentDidMount() {
    // this.setInfoGeneralToInfoGroups()
  }

  componentWillUnmount() {
    // this.props.setPersonalIdSelect(null, null)
  }

  componentDidUpdate(prevProps, prevState) {
    let { dataEdit } = this.props
    if (prevProps.dataEdit !== dataEdit) this.setState({ dataEdit: JSON.parse(JSON.stringify(dataEdit)) })
  }

  openModal(name, obj = {}) {
    console.log('name', name)
    if (typeof name === 'string')
      this.setState(state => ({ [name]: !state[name], ...obj }))
    else
      this.setState({ showPopupEdit: false, showPopupHistory: false })

    this.props.onClick()
  }

  render() {
    let { form } = this.props
    let { dataEdit } = this.state

    return (
      <Modal
        title={get(dataEdit, 'partner_name')}
        visible={true}
        okText={t("edit")}
        cancelText={t("cancel")}
        onOk={() => { this.props.onRowUpdating(dataEdit) }}
        onCancel={() => { this.props.onRowUpdating() }}
      >
        <div>

          <Row style={{ marginTop: '10px' }}>
            <Col md={5} >
              <div className="text-md-right"> {t('general_1')}</div>
              {/* <div className="text-md-right"> {t('GMT')}</div> */}
            </Col>
            <Col md={7}>
              <Select
                mode={'single'}
                style={{ width: '100%', maxWidth: 151 }}
                value={get(dataEdit, 'default_gmt')}
                onChange={(selected) => {
                  dataEdit.default_gmt = selected
                  this.setState({ dataEdit })
                }}
              >
                {listGMT.map((item) => <Option key={item.key}>{item.value}</Option>)}
              </Select>
            </Col>
          </Row>

          <Row style={{ marginTop: '20px' }}>
            <Col md={5}>
              <div className="text-md-right"> {t('general_2')}</div>
            </Col>
            <Col md={7}>
              <TimePicker
                onChange={(selected) => {
                  dataEdit.start_time_of_day = selected ? selected.format(format) : '00:00'
                  this.setState({ dataEdit })
                }}
                value={moment(get(dataEdit, 'start_time_of_day'), format)}
                format={format} />
            </Col>
          </Row>

          {form === 'customer' && [<Row style={{ marginTop: '20px' }}>
            <Col md={5}>
              <div className="text-md-right"> {t('general_3')}</div>
            </Col>
            <Col md={5}>
              <Slider
                min={-10}
                max={10}
                marks={{
                  '-10': '-10',
                  '0': '0',
                  '10': '10',
                }}
                onChange={(selected) => {
                  dataEdit.fuel_coefficient = selected
                  this.setState({ dataEdit })
                }}
                value={typeof get(dataEdit, 'fuel_coefficient') === 'number' ? get(dataEdit, 'fuel_coefficient') : 0}
              // step={0.01}
              />
            </Col>
            <Col md={2}>
              <span>{typeof get(dataEdit, 'fuel_coefficient') === 'number' ? get(dataEdit, 'fuel_coefficient') : 0} %</span>
            </Col>
          </Row>
            ,
          <Row>
            <Col md={3}>
            </Col>
            <Col md={9}><small>{t("general_5")}</small></Col>
          </Row>]}

        </div >

      </Modal>
    )

  }
}

const mapStateToProps = (state) => ({
  // dataLogin: state.signin.dataLogin,

});
const mapDispatchToProps = (dispatch) => ({
  // updateInfoDealer: (action, objOrId) => dispatch(GeneralActions.updateInfoDealer(action, objOrId)),
  // updateInfoCustomer: (action, objOrId) => dispatch(GeneralActions.updateInfoCustomer(action, objOrId)),
  // getHistoryGeneral: (partnerId) => dispatch(GeneralActions.getHistoryGeneral(partnerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalEdit)

import React, { Component } from 'react'
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
import { Select, TimePicker, Slider, InputNumber } from 'antd';
import { Row, Label, FormGroup, Col, Input, ButtonGroup, Button } from 'reactstrap';
import Table from './Table.js'
import './styleGeneral.css'
import { Modal } from 'antd';
import { isEqual } from 'lodash';
import { isEmpty } from 'react-redux-firebase';

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

class Groups extends Component {
  constructor(props) {
    super(props)
    this.state = {
      setting: {},
      group_id: null,
    }
    // this.setTabEnable = this.setTabEnable.bind(this)
    // this.openModal = this.openModal.bind(this)
    // this.submitConfirm = this.submitConfirm.bind(this)
  }

  componentWillMount() {
    let { setting, group_id } = this.props
    if (!isEmpty(setting)) this.setState({ group_id, setting: JSON.parse(JSON.stringify(setting)) })
  }

  componentDidMount() {
    // this.setInfoGeneralToInfoGroups()
  }

  componentWillUnmount() {
    // this.props.setPersonalIdSelect(null, null)
  }

  componentDidUpdate(prevProps, prevState) {
    let { setting, group_id } = this.props
    if (prevProps.setting !== setting) this.setState({ group_id, setting: JSON.parse(JSON.stringify(setting)) })



  }

  onFormChangeGroup(group_id, id, value, type) {
    let { setting } = this.state

    if (type === 'b' || type === 't' || type === null) {
      setting.setting_value = value
      if (type === 'b') {
        if (isEqual(this.props.setting, setting)) this.props.updateInfoGroup('DELETE', id, group_id)
        else this.props.updateInfoGroup("UPDATE", setting, group_id)
      }

    } else if (type === 'i') {
      setting.setting_value = value.match(/^[-]?\d*/g)[0]
    }
    else {
      let num = type.substring(1, type.length)
      let regex = "^[-]?\\d*\\.?\\d{0," + num + "}";
      let reg = new RegExp(regex, 'g')

      setting.setting_value = value.match(reg)[0]


    }

    console.log('setting', setting)
    this.setState({ setting })
    // this.setTabEnable()
  }

  render() {
    let { setting, group_id } = this.state
    let { setting_id, setting_name, setting_prefix, setting_value, setting_suffix, setting_value_type } = setting

    return (
      <Row style={{ marginBottom: 10 }}>
        <Col lg={6}>
          <Label >{setting_name}</Label>
        </Col>
        <Col lg={6}>
          <Row>
            <Col md={4}>
              <div className="text-md-right">
                {setting_prefix}
              </div>

            </Col>
            <Col md={4}>
              {setting_value_type === 'b' ?
                <ButtonGroup style={{ zIndex: 1 }}>
                  <Button
                    className='button-radio-checkbox'
                    style={{ marginBottom: 0 }}
                    onClick={(event) => this.onFormChangeGroup(group_id, setting_id, 'false', setting_value_type)}
                    active={setting_value == 'false'}
                  >{t("no")}</Button>
                  <Button
                    className='button-radio-checkbox'
                    style={{ marginBottom: 0 }}
                    onClick={(event) => this.onFormChangeGroup(group_id, setting_id, 'true', setting_value_type)}
                    active={setting_value == 'true'}
                  >{t("yes")}</Button>
                </ButtonGroup>
                :
                <Input value={setting_value}
                  onBlur={() => {
                    if (isEqual(this.props.setting, setting)) this.props.updateInfoGroup('DELETE', setting_id, group_id)
                    else this.props.updateInfoGroup("UPDATE", setting, group_id)
                  }}
                  onChange={(event) => this.onFormChangeGroup(group_id, setting_id, event.target.value, setting_value_type)}
                />}
            </Col>
            <Col md={4}>
              {setting_suffix}
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => ({
});
const mapDispatchToProps = (dispatch) => ({
  updateInfoGroup: (action, objOrId, groupId) => dispatch(GeneralActions.updateInfoGroup(action, objOrId, groupId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Groups)



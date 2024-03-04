import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'

import GeneralActions from '../../Redux/GeneralRedux'
import PannelBox from '../../Components/PannelBox'
// import BasicData from "./Form/Fields/BasicData"
import { diff } from 'json-diff';
import SaveButton from '../../Components/SaveButton'
import CancelButton from '../../Components/CancelButton'
import { get, isEmpty } from 'lodash'
import moment from 'moment'
import Tabbed from '../../Components/Tabbed'
import Alert from '../../Components/Alert'
import { t, v, v_em } from '../../Components/Translation'
import { Select, TimePicker, Slider, InputNumber } from 'antd';
import { Row, Label, FormGroup, Col, Input, ButtonGroup, Button } from 'reactstrap';
import Table from './Table.js'
import './styleGeneral.css'
import { Modal } from 'antd';
import Dealers from './Dealers';
import Customers from './Customers';
import Groups from './Groups';
import Fleets from './Fleets'
import { data } from 'jquery';

class General extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      alertSetting: {
        show: false,
        type: 3,
        content: "",
        ErrorSubcode: 0,
        name: null
      },

      infoGeneral: {},
      tabNameEnable: [],
      tabPaneEnable: [],
      infoGroups: [],
      infoDealer: [],
      infoCustomer: [],
      updateInfoGroups: [],
      updateInfoDealer: [],
      updateInfoCustomer: [],
      test: false,
      showFormPopup: false
    }
    this.setTabEnable = this.setTabEnable.bind(this)
    this.openModal = this.openModal.bind(this)
    // this.submitConfirm = this.submitConfirm.bind(this)
  }

  componentWillMount() {
    this.props.getInfoGeneral()
    this.setAlertSetting(true, 5)
  }

  componentDidMount() {
    // this.setInfoGeneralToInfoGroups()
  }

  componentWillUnmount() {
    // this.props.setPersonalIdSelect(null, null)
  }

  componentDidUpdate(prevProps, prevState) {
    let { infoGroups } = this.state
    let { infoGeneral, language, loading, processing } = this.props

    // console.log(prevState.loading, loading, !loading)

    if (prevProps.infoGeneral !== infoGeneral) this.setState({ infoGeneral })
    if (prevState.infoGeneral !== this.state.infoGeneral) this.setInfoGeneralToInfoGroups()
    if (prevState.infoGroups !== infoGroups) this.setTabEnable()
    if (prevProps.processing !== processing) {
      if (processing) this.setAlertSetting(true, 6)
      else this.displayAlertUpdated()
    }
    if (prevProps.language !== language) {
      this.props.getInfoGeneral()
      this.setAlertSetting(true, 5)
    }

  }

  openModal() {
    this.setState(state => ({
      showFormPopup: !state.showFormPopup,
    }))
  }

  displayAlertUpdated() {
    let { errorSubcode } = this.props
    let { alertSetting } = this.state
    if (errorSubcode) {
      alertSetting.show = true
      alertSetting.type = 2
      alertSetting.content = ''

    } else {

      alertSetting.show = true
      alertSetting.type = 1
      alertSetting.content = ''

    }
    // alertSetting.show = false
    this.setState({ alertSetting })
  }

  setInfoGeneralToInfoGroups() {
    let { alertSetting, infoGeneral } = this.state
    let newInfo = JSON.stringify(infoGeneral)
    let infoGroups = JSON.parse(newInfo).groups
    let infoDealer = JSON.parse(newInfo).dealers
    let infoCustomer = JSON.parse(newInfo).customers
    alertSetting.show = false
    this.props.resetUpdateInfo()
    this.setState({ infoGroups, alertSetting, infoDealer, infoCustomer })
    // this.setTabEnable()
  }


  buttonSubmit() {
    return <div>
      <div className="hr-line-dashed" />
      <div className="row" style={{ textAlign: "right" }}>
        <CancelButton
          name={t("reset")}
          loading={false}
          onClick={() => {
            this.clkButton('reset')
          }} />
        <SaveButton
          name={t("save")}
          // loading={this.props.loading}
          loading={false}
          onClick={() => {
            console.log('sdlfksjldfkjsldfkjlksdf')
            this.clkButton('save')
          }}
        />
      </div>
    </div>
  }


  setTabEnable() {
    let { infoGroups, infoDealer, infoCustomer } = this.state
    let tabNameDefault = []
    let tabPaneDefault = []

    // console.log(get(lst, 'groups[0].settings[0].setting_value'), get(infoGroups, '[0].settings[0].setting_value'))

    if (infoGroups) {
      infoGroups.map((groups) => {
        tabNameDefault.push(groups.group_name)
        tabPaneDefault.push(
          <div>
            {/* {groups.settings.map((item) => this.setInfoSettings(item, groups.group_id))} */}
            {groups.settings.map((setting) => <Groups setting={setting} group_id={groups.group_id} />)}
          </div >)

      })
    }

    if (infoDealer && infoDealer.length > 0) {
      tabNameDefault.push(t('dealer'))
      tabPaneDefault.push(
        <Dealers infoDealer={infoDealer} />
        // <div className='scroll' style={{ maxHeight: '70vh' }}>
        //   {/* {infoDealer.map((dealers) => this.setInfoDealers(dealers))} */}
        //   {infoDealer.map((dealer) => <Dealers dealer={dealer} />)}
        // </div>

      )
    }

    if (infoDealer && infoCustomer.length > 0) {
      tabNameDefault.push(t('customer'))
      tabPaneDefault.push(
        <Customers infoCustomer={infoCustomer} />
        // <div className='scroll' style={{ maxHeight: '70vh' }}>
        //   {/* {infoCustomer.map((customer, idx) => <Customers customer={customer} />)} */}
        //   {/* {infoCustomer.map((customer, idx) => { if (idx < 20) return <Customers customer={customer} /> })} */}
        // </div>
      )
    }

    {
      [1, 2, 11, 12, 21, 22, 31, 32, 42].includes(this.props.dataLogin.userLevelId) &&
        tabNameDefault.push(t('fleet'))
      tabPaneDefault.push(
        <Fleets />
      )
    }

    this.setState({ tabNameEnable: tabNameDefault, tabPaneEnable: tabPaneDefault })
  }

  setInfoSettings(item, group_id) {
    let { setting_id, setting_name, setting_prefix, setting_value, setting_suffix, setting_value_type } = item

    return (<Row style={{ marginBottom: 10 }}>
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
                onChange={(event) => this.onFormChangeGroup(group_id, setting_id, event.target.value, setting_value_type)}
              />}
          </Col>
          <Col md={4}>
            {setting_suffix}
          </Col>
        </Row>
      </Col>
    </Row>)

  }

  onFormChangeGroup(group_id, id, value, type) {
    let { infoGroups } = this.state
    let group = infoGroups.find(element => element.group_id === group_id);
    let setting = group.settings.find(element => element.setting_id == id);
    if (type === 'b' || type === 't' || type === null) {
      setting.setting_value = value
    } else if (type === 'i') {
      setting.setting_value = value.match(/^[-]?\d*/g)[0]
    }
    else {
      let num = type.substring(1, type.length)
      let regex = "^[-]?\\d*\\.?\\d{0," + num + "}";
      let reg = new RegExp(regex, 'g')

      setting.setting_value = value.match(reg)[0]
    }

    this.setTabEnable()
  }


  setAlertSetting(isShow, type, content = "", ErrorSubcode) {
    let { alertSetting } = this.state
    alertSetting.show = isShow
    alertSetting.type = type
    alertSetting.content = content
    alertSetting.ErrorSubcode = ErrorSubcode
    this.setState({ alertSetting })
  }


  clkButton(text) {
    let { alertSetting } = this.state
    alertSetting.show = true
    alertSetting.type = 3
    alertSetting.content = text
    alertSetting.name = text
    this.setState(prevState => prevState)
  }

  submitConfirm() {
    let { alertSetting, infoGroups, infoDealer, infoCustomer, updateInfoDealer, updateInfoCustomer } = this.state
    let { infoGeneral, infoFleet } = this.props
    let infoUpdate = {}
    if (alertSetting.name === 'save') {

      // infoUpdate.groups = infoGroups.map((groups) => {
      //   let newGroups = { ...groups }
      //   let settings = groups.settings.map((setting) => ({ setting_id: setting.setting_id, setting_value: setting.setting_value }))
      //   newGroups.settings = settings
      //   return newGroups
      // })
      // infoUpdate.dealers = updateInfoDealer
      // infoUpdate.customers = updateInfoCustomer

      // console.log('infoUpdate', infoUpdate)

      let data_edit = {
        user_id: parseInt(get(infoFleet, 'user_id', '')),
        cust_id: parseInt(get(infoFleet, 'cust_id', '')),
        fleet_id: parseInt(get(infoFleet, 'fleet_id', '')),
        fleet_name: get(infoFleet, 'fleet_name', '')
      }

      let data_add = {
        user_id: parseInt(get(infoFleet, 'user_id', '')),
        cust_id: parseInt(get(infoFleet, 'cust_id', '')),
        fleet_name: get(infoFleet, 'fleet_name', '')
      }

      if (isEmpty(infoFleet)) {

        this.props.updateInfoGeneral(infoUpdate)
      } else {

        if (isEmpty(get(infoFleet, 'cust_id', ''))) this.setAlertSetting(true, 4, "general_8")
        else if (isEmpty(get(infoFleet, 'fleet_id', '')) && !get(infoFleet, 'action', '')) this.setAlertSetting(true, 4, "general_9")
        else if (isEmpty(get(infoFleet, 'fleet_name', ''))) this.setAlertSetting(true, 4, "general_9")
        else {

          infoFleet.action ? this.props.createFleet(data_add) : this.props.updateFleet(data_edit)
          this.props.updateInfoGeneral(infoUpdate)

        }
      }



    } else if (alertSetting.name === 'reset') {
      // this.props.resetUpdateInfo()
      this.setInfoGeneralToInfoGroups()
    }
  }


  render() {
    let { tabNameEnable, tabPaneEnable, alertSetting,
      infoGeneral, infoGroups, infoDealer, infoCustomer } = this.state
    let { statusSubmit, action, dataLogin } = this.props




    return [
      <Suspense fallback={null}>
        <PannelBox title={t("general")}>
          <Alert
            setting={alertSetting}
            onConfirm={() => {
              if (alertSetting.type === 3) {
                alertSetting.show = false
                this.submitConfirm(alertSetting.name)
              } else if (alertSetting.type === 1) {
                // alertSetting.show = false
                // infoGeneral = {}
                // infoGeneral.groups = infoGroups
                // infoGeneral.dealers = infoDealer
                // infoGeneral.customers = infoCustomer
                // this.setState({ infoGeneral })
                this.props.getInfoGeneral()
                this.setAlertSetting(true, 5)
              }
              else {
                alertSetting.show = false
              }
              this.setState({ alertSetting })
            }}
            onCancel={() => {
              alertSetting.show = false
              this.setState({ alertSetting })
            }}
          />

          <Tabbed
            empty={true}
            // tabPosition={'top'}
            tabName={tabNameEnable}
            tabPane={tabPaneEnable}
          >
          </Tabbed >
          {this.buttonSubmit()}
        </PannelBox >
      </Suspense>
    ]
  }
}

const mapStateToProps = (state) => ({
  language: state.versatile.language,
  infoGeneral: state.general.infoGeneral,
  loading: state.general.loading,
  processing: state.general.processing,
  errorSubcode: state.general.errorSubcode,
  dataLogin: state.signin.dataLogin,
  infoFleet: state.general.infoFleet,
});
const mapDispatchToProps = (dispatch) => ({
  getInfoGeneral: () => dispatch(GeneralActions.getInfoGeneral()),
  resetUpdateInfo: () => dispatch(GeneralActions.resetUpdateInfo()),
  updateInfoGeneral: (infoUpdate) => dispatch(GeneralActions.updateInfoGeneral(infoUpdate)),
  updateFleet: (data) => dispatch(GeneralActions.updateFleet(data)),
  createFleet: (data) => dispatch(GeneralActions.createFleet(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(General)



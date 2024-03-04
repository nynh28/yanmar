import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from "reactstrap";
import Box from '../../Components/Box'
import { t } from '../../Components/Translation'
import moment from 'moment';
import service from './data.js';
import Alert from '../../Components/Alert'
import DashboardMonitorActions from '../../Redux/DashboardMonitorRedux'
import { ENDPOINT_BASE_URL } from '../../Config/app-config';
import { get, isEmpty } from 'lodash';

const mock = service.getMockData();

let styleBadge = { margin: '-2px 0px', float: 'right', color: 'white', fontSize: 18, paddingBottom: 2 }

class Summary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alertSetting: {
        name: '',
        show: false,
        type: 2,
        content: ""
      },
    }
  }

  componentWillMount() {
    if (!this.interval) {
      this.loadInfoFence()
      this.interval = setInterval(() => {
        this.loadInfoFence()
      }, 60000)
    }

  }
  componentWillUnmount() {
    clearInterval(this.interval)
    this.interval = undefined
    this.props.setDataTable([], true)
  }

  async loadInfoFence() {
    let body = {
      "user_id": this.props.dataLogin.userId
    }
    let response = await fetch(ENDPOINT_BASE_URL + "fleet/SCGL/dashboard/monitor", {
      method: 'POST',
      headers: {
        "Accept-Language": this.props.language,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    let data = await response.json();
    // console.log("Load Dealer : ", data)
    if (get(data, 'code') === 200 && get(data, 'result[0]') !== 'query fail ') {
      this.setState({ mock: data.result })
    } else {

    }
  }

  async onClick(state, fence_id) {
    this.setAlertSetting(true)
    let isStation = false
    let getDataTable = {
      "user_id": this.props.dataLogin.userId,
      "state": state
    }
    if (fence_id) {
      getDataTable.fence_id = fence_id
      isStation = true
    }

    let response = await fetch(ENDPOINT_BASE_URL + "fleet/SCGL/listvehicle", {
      method: 'POST',
      headers: {
        "Accept-Language": this.props.language,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(getDataTable)
    });

    let data = await response.json();
    if (data?.code === 200 && data.result[0] !== 'query fail ') {
      this.props.setDataTable(data.result, isStation)
    } else {

    }
    this.setAlertSetting(false)
  }

  setAlertSetting(isShow, type = 5) {
    let { alertSetting } = this.state
    alertSetting.show = isShow
    alertSetting.type = type
    this.setState({ alertSetting })
  }

  setLabelWay({ state, name = '', name2 = '', count = 0, color = "rgb(255 101 153)" }) {
    return (
      <label className="form-control"
        onClick={() => { count && this.onClick(state) }}
        style={{ backgroundColor: '#F5F5F5', cursor: count && 'pointer' }}>
        {state === 5 ? <b>{t(name)}</b> : <b>{t('อยู่ระหว่างทาง ')}{t(name)}{t(' ไป ')}{t(name2)}</b>}
        <span className="badge" style={{ ...styleBadge, backgroundColor: color }}>{count}</span>
      </label>
    )
  }

  setLabelFence(info, i, arr, state, color) {
    let { fence_id, fence_name, total_vehicle } = info
    let marginBottom = arr.length - 1 === i ? 0 : 15

    return (
      <label className="form-control"
        onClick={() => { total_vehicle && this.onClick(state, fence_id) }}
        style={{ backgroundColor: '#F5F5F5', cursor: total_vehicle && 'pointer', marginBottom }}>
        <b>{t(fence_name)}</b>
        <span className="badge" style={{ ...styleBadge, backgroundColor: color }}>{total_vehicle}</span>
      </label>
    )
  }

  render() {
    let { mock, alertSetting } = this.state
    let source, target, way, away, other

    if (mock) {
      source = mock.fence_zone.find((zone) => zone.zone_def === 'source')
      target = mock.fence_zone.find((zone) => zone.zone_def === 'target')
      way = get(mock, 'way')
      way.name = get(source, 'zone_name') || get(source, 'zone_id')
      way.name2 = get(target, 'zone_name') || get(target, 'zone_id')
      away = get(mock, 'away')
      away.name = get(target, 'zone_name') || get(target, 'zone_id')
      away.name2 = get(source, 'zone_name') || get(source, 'zone_id')
      other = {
        name: "อื่นๆ คือรถที่อยู่นอกเส้นทาง",
        count: get(mock, 'off_way.count', 0) + get(mock, 'off_away.count', 0),
        state: get(mock, 'off_way.state')
      }
    }

    return [
      <Alert
        setting={alertSetting}
        onConfirm={() => {
          alertSetting.show = false
          this.setState({ alertSetting })
        }}
        onCancel={() => {
          this.setState({ alertSetting })
        }}
      />,
      <Row className='layout-padding-three'>
        <Col lg={4} md={12}>
          <Box title={t(get(target, 'zone_name') || get(target, 'zone_id'))} iboxContentStyles={{ height: 318 }} >
            <div className='scroll' style={{ maxHeight: 283 }}>
              {get(target, 'list') && target.list.map((info, i, arr) => this.setLabelFence(info, i, arr, target.state, "rgb(29 186 36)"))}
            </div>
          </Box>
        </Col>

        <Col lg={4} md={12}>
          <Box title={t(get(away, 'name')) || ''} iboxContentStyles={{ height: 70 }}>
            <div>
              {away && this.setLabelWay(away)}
            </div>
          </Box>
          <Box title={t(get(other, 'name')) || ''} iboxContentStyles={{ height: 70 }}>
            <div>
              {other && this.setLabelWay(other)}
            </div>
          </Box>
          <Box title={t(get(way, 'name')) || ''} iboxContentStyles={{ height: 70 }}>
            <div>
              {way && this.setLabelWay(way)}
            </div>
          </Box>
        </Col>

        <Col lg={4} md={12}>

          <Box title={t(get(source, 'zone_name') || get(source, 'zone_id'))} iboxContentStyles={{ height: 318 }} >
            <div className='scroll' style={{ maxHeight: 283 }}>
              {get(source, 'list') && source.list.map((info, i, arr) => this.setLabelFence(info, i, arr, source.state, "rgb(0 178 255)"))}
            </div>
          </Box>
        </Col>
      </Row >]
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  language: state.versatile.language,
  // isProcess: state.hmstDashboard.isProcess,
});

const mapDispatchToProps = (dispatch) => ({
  setDataTable: (dataTable, isStation) => dispatch(DashboardMonitorActions.setDataTable(dataTable, isStation)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Summary)
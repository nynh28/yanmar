import React, { Component } from 'react';
import { Row, Col } from 'reactstrap'
import './Styles/custom.css'
import $ from 'jquery'
import Tabbed from '../../Components/Tabbed'
import Operationchartvehicle from './Charts/Operationchartvehicle'
import Operationchartdriver from './Charts/Operationchartdriver'
import { t } from '../../Components/Translation'
import { connect } from 'react-redux'
import { ENDPOINT_BASE_URL, ENDPOINT_SETTING_REPORT_BASE_URL } from '../../Config/app-config';
import RealtimeActions from '../../Redux/RealtimeRedux'
import Amplify, { PubSub } from 'aws-amplify';
import moment from 'moment-timezone';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.admin_role_array = [1, 2, 21, 22]
    this.LoadData = this.LoadData.bind(this)
    this.setData = this.setData.bind(this)
    this.state = {
      data: [],
      SuddenStart: [],
      SuddenAccelerator: [],
      SuddenBrake: [],
      SuddenTurn: [],
      Speed60: [],
      Speed80: [],
      Speed100: [],
      Speed120: [],
      OverRPM: [],
      OverRPMRed: [],
      Batt: [],
      EG: [],
      Hvehicle: [],
      SOS: [],
      hmst: this.admin_role_array.indexOf(this.props.dataLogin.userLevelId) > -1 ? true : false
    }

    // if (this.admin_role_array.indexOf(this.props.dataLogin.userLevelId) > -1) {
    //   Amplify.PubSub.subscribe('hmst').subscribe({
    //     next: data => { alert('alert Received @!'); console.log('Message received', data.value) },
    //     error: error => console.error(error),
    //     close: () => console.log('Done'),
    //   });
    // } else {
    //   this.start_subscribe(this.props.dataLogin.userId);
    // }
  }

  componentDidMount() {
    this.setData()
    // this.Load = setInterval(() => { this.LoadData() }, 5000)
  }

  componentWillUnmount() {
    // clearInterval(this.Load)
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { activeTabDashboard } = this.props
    if (nextProps.activeTabDashboard !== activeTabDashboard) return false
    return true
  }

  async start_subscribe(userId) {
    // var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/get_role_information"
    var api = ENDPOINT_BASE_URL + "fleet/get_role_information"
    var object = {
      userId: this.props.dataLogin.userId
    }
    var response = await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)
    });
    var responseJson = await response.json();
    if (responseJson.result == true) {
      this.get_sos_information(responseJson.id)
      Amplify.PubSub.subscribe('customer-' + responseJson.id).subscribe({
        next: (data) => {
          this.get_sos_information(data.value.int_cust_id)
        },
        error: error => console.error(error),
        close: () => console.log('Done'),
      });
    }
  }
  async get_sos_information(data) {
    if (this.state.hmst) {
      var object = {
        type: 'hmst'
      }
    } else {
      var object = {
        type: 'customer',
        id: data
      }
    }
    var api = ENDPOINT_SETTING_REPORT_BASE_URL + "get_sos_information"
    var response = await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)
    });
    var responseJson = await response.json();

    this.setState({
      SOS: responseJson.length
      //
      //responseJson[0]
      // {
      //   "_id" : ObjectId("5eba4875031ec30d8ecf443f"),
      //   "unix" : 1589266549,
      //   "userId" : 23,
      //   "int_cust_id" : 149,
      //   "msg" : "SOS Alert FROM : นาย  SORRASAK LANMA at lat : 13.7884873 & lng : 100.6104654 ",
      //   "location" : {
      //       "lat" : 13.7884873,
      //       "lng" : 100.6104654
      //   }
      // }
    })
  }
  async LoadData() {
    if (typeof this.props.dataLogin.userTokenInfo == 'undefined') { return }
    var accessToken = this.props.dataLogin.userTokenInfo.accessToken
    var redisKey = this.props.dataLogin.redisKey
    var userId = this.props.dataLogin.userId
    var api = ENDPOINT_BASE_URL + "fleet/Realtime?user_id=" + userId
    var response = await fetch(api, {
      method: 'GET',
      headers: {
        'Authorization': accessToken,
        'X-API-Key': redisKey
      },
      body: JSON.stringify()
    });
    if (response.status == 200) {
      var responseJson = await response.json();
      this.setState({
        data: responseJson.vehicles
      }, () => {
        this.setData()
      })
    }
    else {
      // console.log('api Error')
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.vehicles !== this.props.vehicles) {
      this.setData()
    }

  }



  setData() {
    let { vehicles } = this.props
    let SuddenStart = []
    let SuddenAccelerator = []
    let SuddenBrake = []
    let SuddenTurn = []
    let Speed60 = []
    let Speed80 = []
    let Speed100 = []
    let Speed120 = []
    let OverRPM = []
    let OverRPMRed = []
    let Batt = []
    let EG = []
    let Hvehicle = []
    let Wvehicle = 0
    for (var i = 0; i < vehicles.length; i++) {
      if (vehicles[i].alarm.SuddenStart == 1) {
        SuddenStart.push(vehicles[i].info.vid)
      }
      if (vehicles[i].alarm.SuddenAccelerator == 1) {
        SuddenAccelerator.push(vehicles[i].info.vid)
      }
      if (vehicles[i].alarm.SuddenBrake == 1) {
        SuddenBrake.push(vehicles[i].info.vid)
      }
      if (vehicles[i].alarm.SuddenTurn == 1) {
        SuddenTurn.push(vehicles[i].info.vid)
      }
      if (vehicles[i].alarm.OverRPM == 1) {
        OverRPM.push(vehicles[i].info.vid)
      }
      if (vehicles[i].gps.speed > 120) {
        Speed120.push(vehicles[i].info.vid)
      }
      else if (vehicles[i].gps.speed > 100) {
        Speed100.push(vehicles[i].info.vid)
      }
      else if (vehicles[i].gps.speed > 80) {
        Speed80.push(vehicles[i].info.vid)
      }
      else if (vehicles[i].gps.speed > 60) {
        Speed60.push(vehicles[i].info.vid)
      }
      if (vehicles[i].sensor.canbus.dtc_engine != "0" || vehicles[i].sensor.device_batt_level <= 1) {
        if (vehicles[i].sensor.canbus.dtc_engine != "0") {
          EG.push(vehicles[i].info.vid)
        }
        if (vehicles[i].sensor.device_batt_level <= 1) {
          Batt.push(vehicles[i].info.vid)
        }
      } else {
        Hvehicle.push(vehicles[i].info.vid)
      }
    }
    // Hvehicle = Hvehicle - Wvehicle

    this.setState({
      SuddenStart: SuddenStart,
      SuddenAccelerator: SuddenAccelerator,
      SuddenBrake: SuddenBrake,
      SuddenTurn: SuddenTurn,
      OverRPM: OverRPM,
      Speed60: Speed60,
      Speed80: Speed80,
      Speed100: Speed100,
      Speed120: Speed120,
      Batt: Batt,
      EG: EG,
      Hvehicle: Hvehicle
    })
  }

  _onCollapseComponent = () => {
    let myibox2 = $(`#content-colaps`)
    myibox2.slideToggle(200);
  }


  setPanel(title1, value, title2 = "", tabNo = 1) {
    let unit = parseInt(value) > 1 ? "" : ""

    /* ------------------------------------------------- GRAY ------------------ BLACK ------ RED ---------- */
    let _color = value.length === 0 || value === "" ? "#ADADAD" : tabNo == 2 ? "#595959" : "#ff3b30"


    // return <div style={{ marginBottom: '2%', backgroundColor: title1 !== "" ? 'white' : '#C0C0C0', borderStyle: 'solid', borderRadius: 5, borderColor: '#e7eaec', borderWidth: '2px', minHeight: 73 }} >
    return <div style={{
      minHeight: 74,
      marginBottom: '2%',
      backgroundColor: title1 !== "" ? 'white' : '#C0C0C0',
      border: '2px solid #e7eaec',
      borderRadius: 5,
      cursor: value.length > 0 && 'pointer'
    }}
      onClick={() => {
        console.log(value)
        if (value.length > 0) {
          this.props.setActiveMap(false)
          this.props.setDisplayTruck(value, true)
          // window.scrollLeft += (num * 600);
          window.scroll({
            top: 5555,
            behavior: 'smooth'
          })
        }

      }}>
      <div style={{ paddingTop: 3, paddingLeft: 10 }}>
        <div>
          <div className="pull-right text-right">
            <label style={{ fontSize: 35, color: tabNo === 3 ? '#e7eaec' : _color, fontWeight: 'bold', marginRight: value !== "" ? 0 : 0, marginLeft: 5 }}>{value !== "" ? value.length : t("realtime_91")}</label>
            <label style={{ fontSize: 16, marginTop: 0, paddingLeft: 5 }}>{value !== "" ? unit : "  "}</label>
          </div>
          <p style={{ fontSize: 16, marginBottom: '1em', color: tabNo === 3 && '#e7eaec' }}>
            {t(title1)}
            {title2 !== "" && <br />}
            {title2 !== "" && t(title2)}
          </p>
        </div>
      </div>
    </div >
  }

  render() {
    let paneLeftStyles = { width: '50%', marginRight: '0.5%' }
    let paneRightStyles = { width: '50%', marginLeft: '0.5%' }

    let { activeTabDashboard } = this.props

    return (
      // <Row style={{ marginTop: -5 }}>
      <Row className='layout-padding-three'>
        {/* <Col lg={7} md={12} style={{ paddingRight: 0, marginBottom: -5 }}> */}
        <Col lg={7} md={12} style={{ marginBottom: -18 }}>
          <div className="ibox float-e-margins">
            <div className="ibox-title">
              <h3 style={{ marginBottom: '0.5em' }}>
                <i className="fa fa-location-arrow" aria-hidden="true" style={{ marginRight: 10 }}></i>
                {t('realtime_88')}
                {':  '}{moment().format('DD/MM/YYYY HH:mm:ss')}</h3>
            </div>
            <div className="ibox-content" style={{ minHeight: 411 }}>
              {/* {true && ( */}
              {this.props.vehicles.length > 0 && (
                // <Row>
                //   <Col lg={6} md={6} sm={12} style={{ textAlign: 'center' }}>
                //     <Operationchartvehicle chartHeight={360} chartWeight={400} vehicles={this.props.vehicles}></Operationchartvehicle>
                //   </Col>
                //   <Col lg={6} md={6} sm={12} style={{ textAlign: 'center' }}>
                //     <Operationchartdriver chartHeight={360} chartWeight={400} drivers={this.props.vehicles}></Operationchartdriver>
                //   </Col>
                // </Row>

                <Row>
                  <Col lg={6} md={6} sm={12} style={{ textAlign: 'center' }}>
                    <Operationchartvehicle chartHeight={370} chartWeight={410} vehicles={this.props.vehicles}></Operationchartvehicle>
                  </Col>
                  <Col lg={6} md={6} sm={12} style={{ textAlign: 'center' }}>
                    <Operationchartdriver chartHeight={370} chartWeight={410} drivers={this.props.vehicles}></Operationchartdriver>
                  </Col>
                </Row>

              )}
            </div>
          </div>
        </Col>
        <Col lg={5} md={12} style={{ marginBottom: -18 }}>
          {/* <Col lg={5} md={12} style={{ paddingLeft: 5, marginBottom: -5 }}> */}
          <div className="ibox float-e-margins" style={{ borderColor: '#e7eaec', borderImage: 'none', borderStyle: 'solid solid none', borderWidth: '3px 0px 0', }}>
            <div className="ibox-content" style={{ padding: '5px 5px 1px 5px', height: 467 }}>
              {/* <Tabbed
                // tabMarginButtom={-10}
                tabPosition={'top'}
                tabName={["TAB 1", "TAB 2", "TAB 3"]}
                tabPane={[
                  <div>
                    AAAAAAAAAAAAAA
                    <br />
                    <br />
                    <br />
                  </div>,
                  <div>
                    BBBBBBBBBBBBB
                    <br />
                    <br />
                    <br />
                  </div>,
                  <div>
                    CCCCCCCCCCCC
                    <br />
                    <br />
                    <br />
                  </div>]}
              /> */}

              <Tabbed
                // tabMarginButtom={-10}
                id={'tab-db-realtime'}
                defaultActiveKey={activeTabDashboard}
                tabPosition={'top'}
                onActive={(activeKey) => { this.props.setStateReduxRealtime('activeTabDashboard', activeKey) }}
                tabName={[<span><i className="icon-racing" style={{ paddingRight: 4 }} />{t("summary_53")}</span>,
                <span><i className="fas fa-tools" aria-hidden="true" style={{ paddingRight: 4 }}></i>{t("summary_62")}</span>]}
                tabPane={[
                  // Driving Behavior
                  <div>
                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                      <div style={paneLeftStyles}> {this.setPanel("realtime_81", this.state.SuddenStart, "realtime_83")}</div>
                      <div style={paneRightStyles}> {this.setPanel("realtime_89", this.state.Speed60, "realtime_84")}</div>
                    </div>
                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                      <div style={paneLeftStyles}> {this.setPanel("my_drivers_38", this.state.SuddenAccelerator, "realtime_83")}</div>

                      <div style={paneRightStyles}> {this.setPanel("realtime_89", this.state.Speed80, "realtime_85")}</div>
                    </div>
                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                      <div style={paneLeftStyles}> {this.setPanel("realtime_80", this.state.SuddenTurn, "realtime_83")}</div>
                      <div style={paneRightStyles}>{this.setPanel("realtime_89", this.state.Speed100, "realtime_86")}</div>
                    </div>
                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                      <div style={paneLeftStyles}> {this.setPanel("realtime_82", this.state.SuddenBrake, "realtime_83")}</div>
                      <div style={paneRightStyles}>{this.setPanel("realtime_89", this.state.Speed120, "realtime_87")}</div>
                    </div>
                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                      <div style={paneLeftStyles}> {this.setPanel("realtime_102", this.state.OverRPM, "realtime_103")}</div>
                      <div style={paneLeftStyles}> {this.setPanel("realtime_104", this.state.OverRPMRed, "realtime_105")}</div>
                      {/* <div style={paneRightStyles}>{this.setPanel("realtime_89", this.state.Speed120, "realtime_87")}</div> */}
                    </div>
                    {/* <div style={{ flexDirection: 'row', display: 'flex' }}>
                      <div style={paneLeftStyles}> {this.setPanel("SOS", this.state.SOS, "red", "(Times)")}</div>
                    </div> */}
                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                      <div style={paneRightStyles}></div>
                      <div style={paneRightStyles}></div>
                    </div>
                  </div>,

                  // Maintenance Status
                  <div>
                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                      <div style={paneLeftStyles}>  {this.setPanel("realtime_65", this.state.EG, "realtime_66")}</div>
                      <div style={paneRightStyles}> {this.setPanel("realtime_67", "", "", 3)}</div>
                    </div>
                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                      <div style={paneLeftStyles}>  {this.setPanel("realtime_69", [], "")}</div>
                      <div style={paneRightStyles}> {this.setPanel("summary_68", "", "")}</div>
                    </div>
                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                      <div style={paneLeftStyles}>  {this.setPanel("realtime_73", [], "realtime_74")}</div>
                      <div style={paneRightStyles}> {this.setPanel("realtime_75", [], "")}</div>
                    </div>
                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                      <div style={paneLeftStyles}>  {this.setPanel("realtime_77", this.state.Batt, "")}</div>
                      <div style={paneRightStyles}> {this.setPanel("realtime_78", this.state.Hvehicle, "realtime_79", 2)}</div>
                    </div>
                  </div>
                ]}
              />
            </div>
          </div>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // request_signin: state.auth.request_signin,
    dataLogin: state.signin.dataLogin,
    vehicles: state.realtime.vehicles,
    activeTabDashboard: state.realtime.activeTabDashboard,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDisplayTruck: (displayTruck, dashboard) => dispatch(RealtimeActions.setDisplayTruck(displayTruck, dashboard)),
    setActiveMap: (activeMap) => dispatch(RealtimeActions.setActiveMap(activeMap)),
    setStateReduxRealtime: (name, value) => dispatch(RealtimeActions.setStateReduxRealtime(name, value)),
    // signin: (email, password) => dispatch(AuthActions.signin(email, password)),

  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(Dashboard))

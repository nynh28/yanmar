import React, { Component } from 'react';
import { connect } from 'react-redux'
import SigninActions from '../../Redux/SigninRedux'
import RealtimeActions from '../../Redux/RealtimeRedux'
// import "./Styles/style-overlay-panel-realtime.css";
import $ from 'jquery'
import { ENDPOINT_BASE_URL } from '../../Config/app-config';
import "./Styles/style-overlay-panel-realtime.css";
import 'react-notifications-component/dist/theme.css'
import { t } from '../../Components/Translation'
import moment from 'moment'
import Alert from '../../Components/Alert'
import SummaryActions from '../../Redux/SummaryRedux'
import EventLoading from './EventLoading'

const { get, isEqual } = require('lodash')

class OverlayPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      startdatefocus: false,
      enddatefocus: false,
      selectedDevice: null,
      selectedposition: [],
      reporttype: 1,
      eventmark: false,
      eventmarks: [],
      deviceHistory: [],
      displayOverlayPanel: true,
      serieclick: "",
      displayList: {},
      checkVehicles: {},
      dlt_4hour: 0,
      dlt_8hour: 0,
      dlt_overspeed: 0,
      dlt_unknown: 0,
      dlt_unplug: 0,
      dlt_wrongtype: 0,
      sos: 0,
      harsh_start: 0,
      harsh_acc: 0,
      sharp_turn: 0,
      harsh_brake: 0,
      over_60: 0,
      over_80: 0,
      over_100: 0,
      over_120: 0,
      over_rpm: 0,
      lamp: 0,
      over_maintenance: 0,
      maintaninnace_soon: 0,
      battery_voltage: 0,
      brake: 0,
      derate_condition: 0,
      tire_low: 0,
      maintaninace_related: 0,
      health_vehicle: 0,
      select: null,




      alertSetting: {
        show: true,
        content: this.props.percentLoading + '%',
        type: 5
      },

    }
    this.isFirstKeep = false
    // console.log(props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { keepArgument } = this.props

    // if (nextProps.keepArgument !== keepArgument) return false

    return true

  }

  componentDidUpdate(prevProps) {
    let { dataOverlayPanel } = this.props
    if (prevProps.dataOverlayPanel !== dataOverlayPanel) {
      this.setState({
        selectData: "",
        dlt_4hour: dataOverlayPanel.dlt_4hour,
        dlt_8hour: dataOverlayPanel.dlt_8hour,
        dlt_overspeed: dataOverlayPanel.dlt_overspeed,
        dlt_unknown: dataOverlayPanel.dlt_unknown,
        dlt_unplug: dataOverlayPanel.dlt_unplug,
        dlt_wrongtype: dataOverlayPanel.dlt_wrongtype,
        harsh_start: dataOverlayPanel.harsh_start,
        harsh_acc: dataOverlayPanel.harsh_acc,
        sharp_turn: dataOverlayPanel.sharp_turn,
        harsh_brake: dataOverlayPanel.harsh_brake,
        over_60: dataOverlayPanel.over_60,
        over_80: dataOverlayPanel.over_80,
        over_100: dataOverlayPanel.over_100,
        over_120: dataOverlayPanel.over_120,
      })
      // console.log('isFirstKeep', this.isFirstKeep)
      // if (this.isFirstKeep) {
      //   this.isFirstKeep = false
      // } else {
      //   this.setState({
      //     selectData: "",
      //     dlt_4hour: dataOverlayPanel.dlt_4hour,
      //     dlt_8hour: dataOverlayPanel.dlt_8hour,
      //     dlt_overspeed: dataOverlayPanel.dlt_overspeed,
      //     dlt_unknown: dataOverlayPanel.dlt_unknown,
      //     dlt_unplug: dataOverlayPanel.dlt_unplug,
      //     dlt_wrongtype: dataOverlayPanel.dlt_wrongtype,
      //     harsh_start: dataOverlayPanel.harsh_start,
      //     harsh_acc: dataOverlayPanel.harsh_acc,
      //     sharp_turn: dataOverlayPanel.sharp_turn,
      //     harsh_brake: dataOverlayPanel.harsh_brake,
      //     over_60: dataOverlayPanel.over_60,
      //     over_80: dataOverlayPanel.over_80,
      //     over_100: dataOverlayPanel.over_100,
      //     over_120: dataOverlayPanel.over_120,
      //   })
      // }

    }
  }

  componentDidMount() {

    let { selectData, dataOverlayPanel, keepArgument, tabs, condition } = this.props
    // console.log('dataOverlayPanel', dataOverlayPanel, keepArgument)
    let obj = {
      // select: false,   ??????
      select: true,
      dlt_4hour: dataOverlayPanel.dlt_4hour,
      dlt_8hour: dataOverlayPanel.dlt_8hour,
      dlt_overspeed: dataOverlayPanel.dlt_overspeed,
      dlt_unknown: dataOverlayPanel.dlt_unknown,
      dlt_unplug: dataOverlayPanel.dlt_unplug,
      dlt_wrongtype: dataOverlayPanel.dlt_wrongtype,
      harsh_start: dataOverlayPanel.harsh_start,
      harsh_acc: dataOverlayPanel.harsh_acc,
      sharp_turn: dataOverlayPanel.sharp_turn,
      harsh_brake: dataOverlayPanel.harsh_brake,
      over_60: dataOverlayPanel.over_60,
      over_80: dataOverlayPanel.over_80,
      over_100: dataOverlayPanel.over_100,
      over_120: dataOverlayPanel.over_120,
    }
    if (selectData) obj.selectData = selectData
    this.setState(obj)
    if (tabs) this.tabs_enable2(tabs, condition)
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   var date = nextProps.date
  //   if (date == '') {
  //     this.setState({
  //       select: true,
  //       // date: date_dmy,
  //       dlt_4hour: nextProps.dataOverlayPanel.dlt_4hour,
  //       dlt_8hour: nextProps.dataOverlayPanel.dlt_8hour,
  //       dlt_overspeed: nextProps.dataOverlayPanel.dlt_overspeed,
  //       dlt_unknown: nextProps.dataOverlayPanel.dlt_unknown,
  //       dlt_unplug: nextProps.dataOverlayPanel.dlt_unplug,
  //       dlt_wrongtype: nextProps.dataOverlayPanel.dlt_wrongtype,
  //       harsh_start: nextProps.dataOverlayPanel.harsh_start,
  //       harsh_acc: nextProps.dataOverlayPanel.harsh_acc,
  //       sharp_turn: nextProps.dataOverlayPanel.sharp_turn,
  //       harsh_brake: nextProps.dataOverlayPanel.harsh_brake,
  //       over_60: nextProps.dataOverlayPanel.over_60,
  //       over_80: nextProps.dataOverlayPanel.over_80,
  //       over_100: nextProps.dataOverlayPanel.over_100,
  //       over_120: nextProps.dataOverlayPanel.over_120,
  //       percentLoading: nextProps.percentLoading
  //     })
  //   }
  //   else {
  //     var date_y = date.split('-')[0]
  //     var date_m = date.split('-')[1]
  //     var date_d = date.split('-')[2]
  //     var date_dmy = date_d + '/' + date_m + '/' + date_y

  //     this.setState({
  //       select: true,
  //       date: date_dmy,
  //       dlt_4hour: nextProps.dataOverlayPanel.dlt_4hour,
  //       dlt_8hour: nextProps.dataOverlayPanel.dlt_8hour,
  //       dlt_overspeed: nextProps.dataOverlayPanel.dlt_overspeed,
  //       dlt_unknown: nextProps.dataOverlayPanel.dlt_unknown,
  //       dlt_unplug: nextProps.dataOverlayPanel.dlt_unplug,
  //       dlt_wrongtype: nextProps.dataOverlayPanel.dlt_wrongtype,
  //       harsh_start: nextProps.dataOverlayPanel.harsh_start,
  //       harsh_acc: nextProps.dataOverlayPanel.harsh_acc,
  //       sharp_turn: nextProps.dataOverlayPanel.sharp_turn,
  //       harsh_brake: nextProps.dataOverlayPanel.harsh_brake,
  //       over_60: nextProps.dataOverlayPanel.over_60,
  //       over_80: nextProps.dataOverlayPanel.over_80,
  //       over_100: nextProps.dataOverlayPanel.over_100,
  //       over_120: nextProps.dataOverlayPanel.over_120,
  //       percentLoading: nextProps.percentLoading
  //     })
  //   }
  // }

  // componentWillUnmount(){
  //   this.setState({ selectData: this.state.selectData == "Driving Over 8h" ? "" : "Driving Over 8h" },
  //    () => this.props.date != '' && this.props.stateMarker("Driving Over 8h", this.state.dlt_8hour))
  // }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  tabs_enable(tabs, condition) {
    this.props.setStateReduxSummary({ tabs, condition })
    this.tabs_enable2(tabs, condition)
  }

  tabs_enable2(tabs, condition) {
    switch (tabs) {
      case 'device_performance_histroy':
        this.setState({
          device_performance_histroy: (condition == true) ? false : true,
          dlt_standard: false,
          dlt_standard_criteria: false,
          dlt_standard_behavior: false,
          dlt_standard_status: false,
          dlt_matenance_status: false,
        })
        break;
      case 'dlt_standard':
        this.setState({
          dlt_standard: (condition == true) ? false : true,
          dlt_standard_criteria: false,
          dlt_standard_behavior: false,
          device_performance_histroy: false,
          dlt_standard_status: false,
          dlt_matenance_status: false,
        });
        break;
      case 'dlt_standard_criteria':
        this.setState({
          dlt_standard_criteria: (condition == true) ? false : true,
          dlt_standard_behavior: false,
          device_performance_histroy: false,
          dlt_standard_status: false,
          dlt_matenance_status: false,
          dlt_standard: false,
        });
        break;
      case 'dlt_standard_behavior':
        this.setState({
          dlt_standard_behavior: (condition == true) ? false : true,
          dlt_standard_status: false,
          dlt_matenance_status: false,
          dlt_standard: false,
          dlt_standard_criteria: false,
          device_performance_histroy: false,
        });
        break;
      case 'dlt_standard_status':
        this.setState({
          dlt_standard_status: (condition == true) ? false : true,
          dlt_matenance_status: false,
          dlt_standard: false,
          dlt_standard_criteria: false,
          device_performance_histroy: false,
          dlt_standard_behavior: false,
        });
        break;
      case 'dlt_matenance_status':
        this.setState({
          dlt_matenance_status: (condition == true) ? false : true,
          dlt_standard_status: false,
          dlt_standard: false,
          dlt_standard_criteria: false,
          device_performance_histroy: false,
          dlt_standard_behavior: false,
        });
        break;
    }
  }

  selectTab(nameTabs) {
    this.props.setTabs(nameTabs)
  }

  setLayoutList(name, type, value) {
    // console.log('setLayoutList', this.state.selectData, type)
    // console.log('setLayoutList', this.state.selectData == type)
    return [
      <div className="form-group row"
        style={{ backgroundColor: this.state.selectData == type && '#FFD1D1' }}
        onClick={() => {
          this.setState({ selectData: this.state.selectData == type ? "" : type },
            () => {
              this.props.setStateReduxSummary({ selectData: this.state.selectData || undefined })
              this.props.stateMarker(type, value)
            })
        }} >
        <div className="col-md-9">
          <b>{t(name)}</b>
        </div>
        <div className="col-md-3" style={{ textAlign: 'right' }}>
          <b style={{ color: value != 0 && 'red' }}>{this.numberWithCommas(value)}</b>
        </div>
      </div>
    ]
  }

  render() {
    let { hideOverlayPanel } = this.props

    return (
      <div className="box-overlay-panel-realtime">
        <EventLoading />
        <div style={{ height: '100%', paddingTop: 0 /*165*/ }}>
          <div style={{
            height: 70, width: 25, cursor: 'pointer',
            paddingTop: 25,
            boxShadow: '0 2px 6px rgba(0,0,0,.3)',
            backgroundColor: 'white',
            borderRadius: '4px 0px 0px 4px'
          }}
            // onClick={() => this.setState({ displayOverlayPanel: !displayOverlayPanel })}>
            onClick={() => this.props.setHideOverlayPanel()}>
            {/* <center><i className="fa fa-chevron-right"></i></center> */}
            <center><i className={"fa " + (hideOverlayPanel ? "fa-chevron-left" : "fa-chevron-right")}></i></center>
          </div>
        </div>

        <div className="tabs-container"
          id={"overlay-panel-colaps"} className='detail-overlay-realtime' style={{
            display: hideOverlayPanel ? 'none' : 'inline-block'
          }}>
          <div className="tab-content">
            <table className="table table-bordered table-hover" style={{ fontSize: 12, marginBottom: 0 }}>
              <thead >
                <tr >
                  <th colSpan="2" style={{ padding: 0 }}>
                    <div style={{ padding: '0px 0px 0px 8px', color: 'grey', flexDirection: 'row', display: 'flex' }}>
                      <div
                        style={{ padding: '8px 8px 8px 0px', width: '100%', marginTop: 1 }}
                        onClick={() => { }}>
                        <i className="fas fa-history" aria-hidden="true" style={{ marginRight: 10 }}></i>
                        {t('summary_45')}
                        <div style={{ float: 'right' }}>
                        </div>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody style={{ display: this.state.device_performance_histroy == true ? '' : 'none' }}>
                <tr style={{ cursor: 'pointer' }} >
                  <td width="65%" style={{ padding: 8 }}>
                    <div style={{ flexDirection: 'row', display: 'flex', paddingLeft: 10 }}>
                      {/* <div onClick={() => this.props.getInformation(device.gps.mid)} style={{ width: '100%' }}> */}
                      <div onClick={() => { }} style={{ width: '100%' }}>
                        {/* {device.device_name} */}
                        <div className="form-group row">
                          <div className="col-md-6">
                            <b>Driving 65-1523 </b>
                          </div>
                          <div className="col-md-2">
                            <i className="fa fa-circle" style={{ color: 'red', Size: 20 }} />
                          </div>
                          <div className="col-md-2">
                            <i className="fa fa-circle" style={{ color: '#66FF33' }} />
                          </div>
                          <div className="col-md-2">
                            <i className="fa fa-circle" style={{ color: 'yellow' }} />
                          </div>

                        </div>
                        <div className="form-group row">
                          <div className="col-md-9">
                            <b>Parking</b>
                          </div>
                          <div className="col-md-3">
                            <b style={{ color: "red" }}>8  Hour</b>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-md-9">
                            <b>Idling </b>
                          </div>
                          <div className="col-md-3">
                            <b style={{ color: "red" }}>7  Hour</b>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-md-9">
                            <b>Offline</b>
                          </div>
                          <div className="col-md-3">
                            <b style={{ color: "red" }}>2 Hour</b>
                          </div>
                        </div>

                        <div style={{ fontSize: 14, marginTop: -3, color: 'grey' }}>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table >
            <div className="table-wrapper-scroll-y dashbord-scrollbar scroll" >
              <table className="table table-bordered table-hover" style={{ fontSize: 12, marginBottom: 0 }}>
                <thead>
                  <tr>
                    <th colSpan="2" style={{ padding: 0 }}>
                      <div style={{ padding: '0px 0px 0px 8px', color: 'grey', flexDirection: 'row', display: 'flex' }}>
                        <div
                          style={{ padding: '8px 8px 8px 0px', width: '100%', marginTop: 1 }}
                          onClick={() => { }}>
                          <i className="fas fa-balance-scale" aria-hidden="true" style={{ marginRight: 10 }}></i>
                          {t('summary_46')}
                          <div style={{ float: 'right' }}>
                            <i className={"fa r fa-" + (this.state.dlt_standard == true ? 'minus' : 'plus') + "-square "} onClick={this.tabs_enable.bind(this, 'dlt_standard', this.state.dlt_standard)} style={{ marginTop: 1, cursor: 'pointer' }}></i>
                          </div>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody style={{ display: this.state.dlt_standard == true ? '' : 'none' }}>
                  <tr style={{ cursor: 'pointer' }} >
                    <td width="65%" style={{ padding: 8 }}>
                      <div style={{ flexDirection: 'row', display: 'flex', paddingLeft: 10 }}>
                        {/* <div onClick={() => this.props.getInformation(device.gps.mid)} style={{ width: '100%' }}> */}
                        <div style={{ width: '100%' }}>

                          {this.setLayoutList('summary_47', 'Driving Over 4h', this.state.dlt_4hour)}

                          {this.setLayoutList('summary_48', 'Driving Over 8h', this.state.dlt_8hour)}

                          {this.setLayoutList('summary_49', 'Driving Over Speed', this.state.dlt_overspeed)}

                          {this.setLayoutList('summary_50', 'Not Swipe card', this.state.dlt_unknown)}

                          {this.setLayoutList('summary_51', 'GPS Unpluged', this.state.dlt_unplug)}

                          {this.setLayoutList('summary_52', 'Wrongtype', this.state.dlt_wrongtype)}

                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table >
              <table className="table table-bordered table-hover" style={{ fontSize: 12, marginBottom: 0 }}>
                <thead>
                  <tr>
                    <th colSpan="2" style={{ padding: 0 }}>
                      <div style={{ padding: '0px 0px 0px 8px', color: 'grey', flexDirection: 'row', display: 'flex' }}>
                        <div
                          style={{ padding: '8px 8px 8px 0px', width: '100%', marginTop: 1 }}
                          onClick={() => { }}>
                          <i className="icon-racing" aria-hidden="true" style={{ marginRight: 10 }}></i>
                          {t('summary_53')}
                          <div style={{ float: 'right' }}>
                            <i className={"fa r fa-" + (this.state.dlt_standard_behavior == true ? 'minus' : 'plus') + "-square "} onClick={this.tabs_enable.bind(this, 'dlt_standard_behavior', this.state.dlt_standard_behavior)} style={{ marginTop: 1, cursor: 'pointer' }}></i>
                          </div>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody style={{ display: this.state.dlt_standard_behavior == true ? '' : 'none' }}>
                  <tr style={{ cursor: 'pointer' }} >
                    <td width="65%" style={{ padding: 8 }}>
                      <div style={{ flexDirection: 'row', display: 'flex', paddingLeft: 10 }}>
                        {/* <div onClick={() => this.props.getInformation(device.gps.mid)} style={{ width: '100%' }}> */}
                        <div style={{ width: '100%' }}>

                          {this.setLayoutList('summary_54', 'Harsh Start', this.state.harsh_start)}

                          {this.setLayoutList('summary_55', 'Harsh Acceleration', this.state.harsh_acc)}

                          {this.setLayoutList('summary_56', 'Sharp Turn', this.state.sharp_turn)}

                          {this.setLayoutList('summary_57', 'Harsh Brake', this.state.harsh_brake)}

                          {this.setLayoutList('summary_58', 'Over Speed 60', this.state.over_60)}

                          {this.setLayoutList('summary_59', 'Over Speed 80', this.state.over_80)}

                          {this.setLayoutList('summary_60', 'Over Speed 100', this.state.over_100)}

                          {this.setLayoutList('summary_61', 'Over Speed 120', this.state.over_120)}

                          {/* <div className="form-group row" >
                            <div className="col-md-10">
                              <b>Over RPM</b>
                            </div>
                            <div className="col-md-2">
                              <b style={{ color: "grey" }}>{this.state.over_rpm}</b>
                            </div>
                          </div> */}



                          <div style={{ fontSize: 14, marginTop: -3, color: 'grey' }}>
                          </div>
                        </div>

                      </div>
                    </td>
                  </tr>
                </tbody>

              </table >
              <table className="table table-bordered table-hover" style={{ fontSize: 12, marginBottom: 0 }}>
                <thead>
                  <tr>
                    <th colSpan="2" style={{ padding: 0 }}>
                      <div style={{ padding: '0px 0px 0px 8px', color: 'grey', flexDirection: 'row', display: 'flex' }}>
                        <div
                          style={{ padding: '8px 8px 8px 0px', width: '100%', marginTop: 1 }}
                          onClick={() => { }}>
                          <i className="fas fa-tools" aria-hidden="true" style={{ marginRight: 10, marginLeft: 5 }}></i>
                          {t('summary_62')}
                          <div style={{ float: 'right' }}>
                            <i className={"fa r fa-" + (this.state.dlt_standard_status == true ? 'minus' : 'plus') + "-square "}
                              onClick={this.state.select == true && this.tabs_enable.bind(this, 'dlt_standard_status', this.state.dlt_standard_status)}
                              style={{ marginTop: 1, cursor: 'pointer' }}></i>
                          </div>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody style={{ display: this.state.dlt_standard_status == true ? '' : 'none' }}>
                  <tr style={{ cursor: 'pointer' }} >
                    <td width="65%" style={{ padding: 8 }}>
                      <div style={{ flexDirection: 'row', display: 'flex', paddingLeft: 10 }}>
                        {/* <div onClick={() => this.props.getInformation(device.gps.mid)} style={{ width: '100%' }}> */}
                        <div onClick={() => { }} style={{ width: '100%' }}>

                          {this.setLayoutList('summary_63', 'E/G Check Lamp', this.state.lamp)}

                          {this.setLayoutList('summary_64', 'Over Maintenance Period', this.state.over_maintenance)}

                          {this.setLayoutList('summary_65', 'Maintenance Soon', this.state.maintaninnace_soon)}

                          {this.setLayoutList('summary_66', 'Battery Voltage Low', this.state.battery_voltage)}

                          {this.setLayoutList('summary_67', 'Derate Condition', this.state.derate_condition)}

                          {this.setLayoutList('summary_68', 'Tire Pressure Low', this.state.tire_low)}


                          {/* {device.device_name} */}
                          {/* <div className="form-group row" >
                              <div className="col-md-10">
                                <b>{t('summary_63')}</b>
                              </div>
                              <div className="col-md-2">
                                <b style={{ color: "grey" }}>{this.state.lamp}</b>
                              </div>
                            </div>
                            <div className="form-group row" >
                              <div className="col-md-10">
                                <b>{t('summary_64')}</b>
                              </div>
                              <div className="col-md-2">
                                <b style={{ color: "grey" }}>{this.state.over_maintenance}</b>
                              </div>
                            </div>
                            <div className="form-group row" >
                              <div className="col-md-10">
                                <b>{t('summary_65')}</b>
                              </div>
                              <div className="col-md-2">
                                <b style={{ color: "grey" }}>{this.state.maintaninnace_soon}</b>
                              </div>
                            </div>
                            <div className="form-group row" >
                              <div className="col-md-10">
                                <b>{t('summary_66')}</b>
                              </div>
                              <div className="col-md-2">
                                <b style={{ color: "grey" }}>{this.state.battery_voltage}</b>
                              </div>
                            </div>

                            <div className="form-group row" >
                              <div className="col-md-10">
                                <b>{t('summary_67')}</b>
                              </div>
                              <div className="col-md-2">
                                <b style={{ color: "grey" }}>{this.state.derate_condition}</b>
                              </div>
                            </div>
                            <div className="form-group row" >
                              <div className="col-md-10">
                                <b>{t('summary_68')}</b>
                              </div>
                              <div className="col-md-2">
                                <b style={{ color: "grey" }}>{this.state.tire_low}</b>
                              </div>
                            </div> */}

                          {/* <div className="form-group row" >
                              <div className="col-md-10">
                                <b>Harsh Brake</b>
                              </div>
                              <div className="col-md-2">
                                <b style={{ color: "grey" }}>{this.state.brake}</b>
                              </div>
                            </div> */}

                          {/* <div className="form-group row" >
                              <div className="col-md-10">
                                <b>{t('summary_69')}</b>
                              </div>
                              <div className="col-md-2">
                                <b style={{ color: "grey" }}>{this.state.maintaninace_related}</b>
                              </div>
                            </div> */}
                          {/* <div className="form-group row" >
                              <div className="col-md-10">
                                <b>{t('summary_70')}</b>
                              </div>
                              <div className="col-md-2">
                                <b style={{ color: "grey" }}>{this.state.health_vehicle}</b>
                              </div>
                            </div> */}
                        </div>

                      </div>
                    </td>
                  </tr>
                </tbody>

              </table >
              {/* } */}
            </div>
          </div>
        </div>

      </div >
    );
    // }
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  // events: state.realtime.events,
  tabsRealtime: state.signin.tabsRealtime,
  hideOverlayPanel: state.realtime.hideOverlayPanel,
  selectData: state.summary.selectData,
  keepArgument: state.summary.keepArgument,
  tabs: state.summary.tabs,
  condition: state.summary.condition,
});
const mapDispatchToProps = (dispatch) => ({
  // getInitialData: () => dispatch(RealtimeActions.getInitialData()),
  setTabs: (tabsRealtime) => dispatch(SigninActions.setTabs(tabsRealtime)),
  setHideOverlayPanel: () => dispatch(RealtimeActions.setHideOverlayPanel()),
  setStateReduxSummary: (objState) => dispatch(SummaryActions.setStateReduxSummary(objState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OverlayPanel);

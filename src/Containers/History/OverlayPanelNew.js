import React, { Component } from 'react';
import { connect } from 'react-redux'
import HistoryActions from '../../Redux/HistoryRedux'

import TimePicker from 'react-bootstrap-time-picker';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import "./Styles/OverlayPanel.css";
import "react-datepicker/dist/react-datepicker.css";
import 'react-notifications-component/dist/theme.css'

import ReactToPrint from "react-to-print";
import Print from './Template/Print'
import SaveButton from '../../Components/SaveButton'
import { IconButton } from '@material-ui/core';
import Images from './icons/Images'

import moment from 'moment'
import { momentDate, calculateToDuration, calculateToTimestamp } from '../../Functions/DateMoment'
import { Typeahead } from 'react-bootstrap-typeahead';
import { get } from 'lodash'
import { t } from '../../Components/Translation'
import images from '../../Themes/Images'
import { Row, ButtonGroup, Button, Col } from 'reactstrap'
import 'antd/dist/antd.css';
import { Select } from 'antd';
const { Option } = Select;
const nowDate = new Date((new Date()).setHours(0, 0, 0, 0))
const formatDate = 'DD MMM YYYY (ddd) HH:mm'


class OverlayPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceHistory: [],
      displayOverlayPanel: true,
      timeStart: 0,
      timeEnd: 85500,
      dateStart: nowDate,
      dateEnd: nowDate,
      int_vehicle_id: [],
      index: null,
      showHistoryTest: false,
      strDataTime: { start: nowDate, end: (nowDate.getTime() + 85500000) }
    }
    this.handleDateStartChange = this.handleDateStartChange.bind(this);
    this.handleTimeStartChange = this.handleTimeStartChange.bind(this);
    this.handleDateEndChange = this.handleDateEndChange.bind(this);
    this.handleTimeEndChange = this.handleTimeEndChange.bind(this);
  }


  componentWillMount() {
    this.props.setClear()
    this.props.getListMember(this.props.dataLogin.userId)
  }


  componentDidUpdate(prevProps, nextState) {
    let { listMember } = this.props
    if (prevProps.listMember !== listMember && listMember.length > 0) {
      this.selectEventDevice(listMember[0].int_vehicle_id)
    }
  }


  selectDevice(e) {
    this.props.rerenderDeviceInformation(e);
  }

  handleDateStartChange(event, picker) {
    let dateStart = moment(picker.startDate)

    let sta = { dateStart }
    if (!(dateStart.isBefore(this.state.dateEnd))) sta.dateEnd = dateStart
    this.setState(sta);
  }

  handleTimeStartChange(timeStart) {
    this.setState({ timeStart });
  }

  handleDateEndChange(event, picker) {
    let dateEnd = moment(picker.startDate)
    this.setState({ dateEnd });
  }

  handleTimeEndChange(timeEnd) {
    // console.log(timeEnd)
    this.setState({ timeEnd });
  }

  selectEventDevice(int_vehicle_id) {
    this.setState({
      int_vehicle_id: int_vehicle_id
    })
  }

  selectEvent(e, index) {

    // console.log("selectEvent: ", e)

    this.setState({
      index
    })
    let array = []
    let locations = e[29]
    let position = {}
    if (locations.length > 0) {
      for (let i in locations) {
        array.push({ lat: locations[i][2], lng: locations[i][3] })
      }
      position = { lat: locations[locations.length / 2 | 0][2], lng: locations[locations.length / 2 | 0][3] }
    } else {
      let ar = e[9].split(',')

      if (e[21] === 2) ar = e[17].split(',')
      array.push({ lat: Number(ar[0]), lng: Number(ar[1]) })
      position = { lat: Number(ar[0]), lng: Number(ar[1]) }

    }
    this.props.setTailActive(array, e.event_id)
    this.props.setInfoMarker(position, e)
  }

  searchHistory(e) {

    this.setState(state => ({ showHistoryTest: !state.showHistoryTest }))

    let { dateStart, timeStart, dateEnd, timeEnd, int_vehicle_id } = this.state

    if (int_vehicle_id !== null) {

      let dateTimeStart = calculateToTimestamp(dateStart, timeStart)
      let dateTimeEnd = calculateToTimestamp(dateEnd, timeEnd)

      // this.props.getHistory(Number(int_vehicle_id), dateTimeStart, dateTimeEnd)
      this.props.getHistoryTrip(Number(int_vehicle_id), dateTimeStart, dateTimeEnd)


      this.props.setInfoMarker(null, null)

      let strDataTime = {}
      strDataTime.start = dateTimeStart
      strDataTime.end = dateTimeEnd

      this.setState({ strDataTime })
    }
  }

  actionIcon(code) {
    return (
      code == 2 ?
        <img src={Images.iconParking} /> :
        code == 3 ?
          <img src={Images.iconIdling} /> :
          code == 4 ?
            <img src={Images.iconMoving} /> :
            code == 5 ?
              <img src={Images.iconOverSpeed} /> : ''
    )
  }

  setFormatTable(e, index, icon, time, name, duration) {
    return (
      <tr
        onClick={this.selectEvent.bind(this, e, index)}
        style={{ cursor: 'pointer', backgroundColor: this.state.index === index ? '#F4F4F4' : '' }}
        key={"tr_" + index}>
        <td>{icon}</td>
        <td>{time}</td>
        <td>{name}</td>
        <td align="right">{duration}</td>
      </tr>
    )
  }

  setDataRow(e, index) {

    let icon = this.actionIcon(e.event_id)
    let timeStart = momentDate(e.dtstart)
    let timeStop = momentDate(e.dtstop)

    // let name = get(event, '[27][2]', '-')
    let name = ""

    let duration = calculateToDuration(get(e, 'total_minute', 0))

    if (index === 0 && index === this.props.dataTrip.trips.length - 1) {
      return [
        <tr>
          <td><span className="action-icon startstop-action" title="parking"><i className="fas fa-arrow-down"></i></span></td>
          <td>{timeStart}</td>
          <td></td>
          <td></td>
        </tr>,
        this.setFormatTable(e, index, icon, timeStart, name, duration),
        <tr onClick={this.selectEvent.bind(this, e)} style={{ cursor: 'pointer' }} key={"tr" + index}>
          <td><span className="action-icon startstop-action" title="parking"><i className="far fa-flag"></i></span></td>
          <td>{timeStop}</td>
          <td></td>
          <td></td>
        </tr>
      ]
    }
    else if (index === 0) {
      return [
        <tr key='start'>
          <td><span className="action-icon startstop-action" title="parking"><i className="fas fa-arrow-down"></i></span></td>
          <td>{timeStart}</td>
          <td></td>
          <td></td>
        </tr>,
        this.setFormatTable(e, index, icon, timeStart, name, duration)
      ]
    }
    else if (index === this.props.dataTrip.trips.length - 1) {
      return [
        this.setFormatTable(e, index, icon, timeStart, name, duration)
        ,
        <tr key='stop'>
          <td><span className="action-icon startstop-action" title="parking"><i className="far fa-flag"></i></span></td>
          <td>{timeStop}</td>
          <td></td>
          <td></td>
        </tr>
      ]
    }
    else {
      return this.setFormatTable(e, index, icon, timeStart, name, duration)
    }
  }


  render() {

    let { displayOverlayPanel, strDataTime, dateStart, timeStart, dateEnd, timeEnd } = this.state
    let { dataHistory, imgData, buttonPrint, listMember, dataTrip } = this.props

    // let dataHistoryTrip = get(dataHistory, 'trips', null)
    let dataHistoryTrip = get(dataTrip, 'trips', [])

    console.log("RENDER PANEL NEW : ", this.props.loading)

    return (
      <div style={{
        position: 'absolute',
        zIndex: '1',
        height: '500px',

        top: '15px',
        right: '0px',
        flexDirection: 'row', display: 'flex'

      }}>
        <div style={{ height: '100%', paddingTop: 0 /*165*/ }}>
          <div style={{
            height: 70, width: 27, cursor: 'pointer',
            paddingTop: 25,
            boxShadow: '0 2px 6px rgba(0,0,0,.3)', backgroundColor: 'white'
          }}
            onClick={() => this.setState({ displayOverlayPanel: !displayOverlayPanel })}>
            <center><i className={"fa " + (displayOverlayPanel ? "fa-chevron-right" : "fa-chevron-left")}></i></center>
          </div>
        </div>

        <div
          className="tabs-container"
          style={{
            backgroundColor: 'white',
            width: 470,
            display: displayOverlayPanel ? 'inline-block' : 'none',
            boxShadow: '0 2px 6px rgba(0,0,0,.3)'
          }}
        >
          <div style={{ padding: 10 }}>
            <div className="pull-left" style={{ margin: 6 }}>
              <h3>{t('event_log')}</h3>
            </div>
            <div className="pull-right">
              <ReactToPrint
                trigger={() => (
                  <IconButton
                    id='print'
                    style={{
                      height: 35,
                      width: 80,
                      padding: 0,
                      borderRadius: '5px 5px',
                      border: '1px solid #e7eaec',
                    }}
                  >
                    <i className="fa fa-print"></i><span style={{ paddingLeft: 5 }}>{t("print")}</span>
                  </IconButton>
                )}
                onBeforeGetContent={() => {
                  this.props.setPrint(true)
                  return new Promise((resolve, reject) => {
                    setTimeout(() => {
                      console.log('10 seconds Timer expired!!!');
                      this.props.setPrint(false)
                      resolve();
                    }, 5000)

                  });
                }}
                content={() => this.componentRef}

              />
              <div style={{ display: "none" }}>
                <Print ref={el => (this.componentRef = el)} dataHistory={dataHistory} strDataTime={strDataTime} dateTimeEnd={{ dateEnd, timeEnd }} imgData={imgData} />
              </div>
            </div>
          </div>
          <div style={{ borderBottom: '1px solid lightgray', marginTop: 30 }}></div>

          <div className="tab-content">

            <div className="form-horizontal" style={{ padding: 12 }}>

              <table className='form-history'>
                <tbody>
                  <tr>
                    <td style={{ width: '30%', paddingRight: 6 }}>
                      <p align="right" style={{ marginTop: 10 }}><b>{t("plate_no")} :</b></p>
                    </td>
                    <td colSpan="2" style={{ width: '70%' }}>

                      <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder={t("select_a_plate_no")}
                        optionFilterProp="children"
                        disabled={this.props.loading}
                        value={this.state.int_vehicle_id}
                        onChange={(id) => {
                          this.selectEventDevice(id)
                        }}
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {
                          listMember !== null &&
                          listMember.map((device, i) => {
                            return <Option value={device.int_vehicle_id} >{device.vehicle_name}</Option>
                          })
                        }
                      </Select>
                    </td>
                  </tr>

                  <tr style={{ height: 50 }}>
                    <td style={{ width: '30%', paddingRight: 6 }}>
                      <p align="right" style={{ marginTop: 10 }}><b>{t("from")} :</b></p>
                    </td>
                    <td style={{ width: '40%', paddingRight: 6 }}>
                      {this.props.loading === false ? <DateRangePicker
                        autoUpdateInput={false}
                        startDate={this.state.dateStart}
                        locale={{ format: "YYYY-MM-DD" }}
                        singleDatePicker
                        onEvent={this.handleDateStartChange}
                      >
                        <input className="form-control input-sm"
                          type="text"
                          value={moment(this.state.dateStart).format("YYYY-MM-DD")}
                        />
                      </DateRangePicker>
                        : <input className="form-control input-sm"
                          type="text"
                          disabled={this.props.loading}
                          value={moment(this.state.dateStart).format("YYYY-MM-DD")}
                        />}
                    </td>
                    <td style={{ width: '30%', paddingLeft: 6 }}>
                      <TimePicker className="input-sm" onChange={this.handleTimeStartChange} value={this.state.timeStart} format={24} start="00:00" end="23:45" step={15} disabled={this.props.loading} />
                    </td>
                  </tr>

                  <tr>
                    <td style={{ width: '30%', paddingRight: 6 }}>
                      <p align="right" style={{ marginTop: 10 }}><b>{t("to")} :</b></p>
                    </td>
                    <td style={{ width: '40%', paddingRight: 6 }}>
                      {this.props.loading === false ? <DateRangePicker
                        startDate={this.state.dateEnd}
                        locale={{ format: "YYYY-MM-DD" }}
                        singleDatePicker
                        onEvent={this.handleDateEndChange}
                        minDate={this.state.dateStart}
                        containerStyles={{ display: 'none' }}
                      >
                        <input className="form-control input-sm"
                          type="text"
                          value={moment(this.state.dateEnd).format("YYYY-MM-DD")}
                        />
                      </DateRangePicker>
                        : <input className="form-control input-sm"
                          type="text"
                          disabled={this.props.loading}
                          value={moment(this.state.dateEnd).format("YYYY-MM-DD")}
                        />}
                    </td>
                    <td style={{ width: '30%', paddingLeft: 6 }}>
                      <TimePicker className="input-sm" onChange={this.handleTimeEndChange} value={this.state.timeEnd} format={24} start="00:00" end="23:45" step={15} disabled={this.props.loading} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <center>
              <SaveButton
                onClick={() => {
                  this.searchHistory()
                }}
                disabled={this.props.loading}
                name={t('search')}
                style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#8F9BA6', fontSize: '14px' }}
              /></center>



            <div className="table-wrapper-scroll-y history-scrollbar scroll" style={{ marginTop: 10 }}>
              <table className="table table-hover table-bordered tb-history" style={{ marginBottom: 0 }}>
                <thead>
                  <tr>
                    <th><i className="fas fa-flag" title="Action"></i></th>
                    <th><i className="far fa-calendar-alt" title="Date"></i></th>
                    <th><i className="fas fa-user" title="Driver"></i></th>
                    <th><i className="fa fa-clock-o" title="Duration"></i></th>
                  </tr>
                </thead>
                <tbody>
                  {!this.props.loading && dataTrip && dataTrip.trips &&
                    dataTrip.trips.map((event, index) => {
                      return this.setDataRow(event, index)
                    })
                  }
                </tbody>
              </table>

              {this.props.loading ?
                [<br />, <br />, <br />,
                <center><img src={images.loading} style={{ width: 50, height: 50 }}></img></center>]
                :
                dataHistoryTrip && dataHistoryTrip.length === 0 &&

                [<br />, <br />, <br />,
                <center><div style={{ fontSize: "12px" }} id="dataHistory_null" ><label>{t("no_data_found")}</label></div></center>]
              }
            </div>
          </div>

        </div>
      </div >
    );
  }
}


const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  dataHistory: state.history.dataHistory,
  tabs: state.history.tabs,
  tailGroup: state.history.tailGroup,
  listMember: state.history.listMember,
  loading: state.history.loading,
  buttonPrint: state.history.buttonPrint,

  dataTrip: state.history.dataTrip
});
const mapDispatchToProps = (dispatch) => ({
  getHistoryTrip: (int_vehicle_id, startDate, endDate) => dispatch(HistoryActions.getHistoryTrip(int_vehicle_id, startDate, endDate)),



  getHistory: (int_vehicle_id, startDate, endDate) => dispatch(HistoryActions.getHistory(int_vehicle_id, startDate, endDate)),
  setTabs: (tabs) => dispatch(HistoryActions.setTabs(tabs)),
  setFocusLocation: (lat, lng) => dispatch(HistoryActions.setFocusLocation(lat, lng)),
  setTailActive: (tailActive, eventId) => dispatch(HistoryActions.setTailActive(tailActive, eventId)),
  getListMember: (user_id, username, partner_id, partner_type) => dispatch(HistoryActions.getListMember(user_id, username, partner_id, partner_type)),
  setClear: (dataHistory) => dispatch(HistoryActions.setClear(dataHistory))
});

export default connect(mapStateToProps, mapDispatchToProps)(OverlayPanel);

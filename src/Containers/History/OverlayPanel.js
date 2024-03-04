import React, { Component } from 'react';
import { connect } from 'react-redux'
import HistoryActions from '../../Redux/HistoryRedux'

import TimePicker from 'react-bootstrap-time-picker';
// import DateRangePicker from 'react-bootstrap-daterangepicker';
import "./Styles/style-overlay-panel-history.css";
import "react-datepicker/dist/react-datepicker.css";
import 'react-notifications-component/dist/theme.css'

import ReactToPrint from "react-to-print";
import Print from './Template/Print'
import DetailExport from './Template/DetailExport'
import TripExport from './Template/TripExport'
import SaveButton from '../../Components/SaveButton'
import { IconButton } from '@material-ui/core';
import Images from './icons/Images'
import { momentDate, calculateToDuration, calculateToTimestamp } from '../../Functions/DateMoment'
import { get } from 'lodash'
import { t } from '../../Components/Translation'
import images from '../../Themes/Images'
import { Input } from 'reactstrap'
import 'antd/dist/antd.css';
import { Select, Menu, Dropdown, Button } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import moment from 'moment'
import 'moment/locale/th'
import DateRangePicker from 'react-bootstrap-daterangepicker-maxspan';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { useTranslation } from 'react-i18next'
import { CalendarOutlined } from '@ant-design/icons';
import { ENDPOINT_BASE_URL } from '../../Config/app-config';
import SelectControl from '../../Components/FormControls/Basic/SelectControl'

const { Option } = Select;
const format = 'HH:mm';
const nowDate = new Date((new Date()).setHours(0, 0, 0, 0))
const formatDate = 'DD MMM YYYY (ddd) HH:mm'
const todayStart = moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
const todayEnd = moment().set({ hour: 23, minute: 59, second: 59, millisecond: 59 })
const listName = [
  { key: 'history_1', value: 'history_1' },
  { key: 'history_2', value: 'history_2' },
  { key: 'history_3', value: 'history_3' },
]


const DateRangePickersTrans = (arg) => {
  const { t } = useTranslation()
  return (
    <div className='icon-calendar-ranges-history'>
      <CalendarOutlined />
      <DateRangePicker
        timePicker
        timePicker24Hour
        startDate={arg.startDate}
        endDate={arg.endDate}
        onEvent={arg.onEvent}
        maxSpan={{ days: 3 }}
        containerStyles={{ display: 'inline-block', width: '100%' }}
        locale={{
          "applyLabel": t("calendar_26"),
          "cancelLabel": t("calendar_25"),
          "customRangeLabel": t("calendar_5"),
          "daysOfWeek": [
            t("calendar_12"),
            t("calendar_6"),
            t("calendar_7"),
            t("calendar_8"),
            t("calendar_9"),
            t("calendar_10"),
            t("calendar_11")
          ],
          "monthNames": [
            t("calendar_13"),
            t("calendar_14"),
            t("calendar_15"),
            t("calendar_16"),
            t("calendar_17"),
            t("calendar_18"),
            t("calendar_19"),
            t("calendar_20"),
            t("calendar_21"),
            t("calendar_22"),
            t("calendar_23"),
            t("calendar_24")
          ]
        }}
      >
        <Input
          className="form-control"
          name="dates"
          disabled={arg.loading}
          style={{ width: '102.2%', borderRadius: 2, border: '1px solid #d9d9d9', boxShadow: 'none', paddingRight: 30 }}
          value={arg.strStartEndDate} />
      </DateRangePicker>
    </div>
  )
}


const DropdownCustomer = (arg) => {
  return (
    <SelectControl
      mode={"single"}
      value={arg.selected.length == 0 ? [] : parseInt(arg.selected)}
      label={"my_drivers_2"}
      list={arg.list.map((element, i) => {
        return { key: i, value: element.key, text: element.value }
      })}
      placeholder={"my_drivers_4"}
      flex={1}
      onChange={(selected) => {
        if (selected) arg.onChange(selected)
      }}
      style={arg.style}
    />
  )
}

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
      vinNo: "",
      vehicleName: "",
      licensePlate: "",
      index: null,
      showHistoryTest: false,
      strDataTime: { start: nowDate, end: (nowDate.getTime() + 85500000) },
      startDate: todayStart,
      endDate: todayEnd,
      strStartEndDate: todayStart.format('DD/MM/YYYY HH:mm') + ' - ' + todayEnd.format('DD/MM/YYYY HH:mm'),
      showName: "history_1",
      listMembers: [],
      listMembersAll: [],
      startSearch: false,
      showBoxSearch: true,
      pageLoadFirst: true,
      fileNameDate: "",
      companyId: [],
    }
    this.handleDateStartChange = this.handleDateStartChange.bind(this);
    this.handleTimeStartChange = this.handleTimeStartChange.bind(this);
    this.handleDateEndChange = this.handleDateEndChange.bind(this);
    this.handleTimeEndChange = this.handleTimeEndChange.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
    this.selectEventDevice = this.selectEventDevice.bind(this);
    this.dealer_mode = false
  }
  componentDidMount() {
    if (this.props.dataLogin.userLevelId === 32) this.dealer_mode = true
  }


  componentWillMount() {
    // this.props.setClear()
    // this.props.getListMember(this.props.dataLogin.userId)
    let { customerSelect, showNameSelect, vehicleSelect, listMembersAll, strStartEndDate } = this.props
    if (customerSelect) {
      let obj = { companyId: customerSelect, showName: showNameSelect, listMembersAll }
      if (strStartEndDate) {
        let lstDate = strStartEndDate.split(' - ')
        obj.startDate = moment(lstDate[0], 'DD/MM/YYYY HH:mm')
        obj.endDate = moment(lstDate[1], 'DD/MM/YYYY HH:mm')
        obj.strStartEndDate = strStartEndDate
        obj.fileNameDate = lstDate.join(' to ')
      }
      this.setState(obj, () => this.selectEventDevice(vehicleSelect))
    } else {
      this.load_manage_customer()
    }

  }

  shouldComponentUpdate(nextProps, nextState) {
    // let { customerSelect, showNameSelect, vehicleSelect, listMembersAll } = this.props
    // console.log('111')
    // if (nextProps.customerSelect !== customerSelect) return false
    // if (nextProps.showNameSelect !== showNameSelect) return false
    // if (nextProps.vehicleSelect !== vehicleSelect) return false
    // if (nextProps.listMembersAll !== listMembersAll) return false
    // console.log('222')
    return true
  }

  componentDidUpdate(prevProps, nextState) {
    let { listMember, showBoxSearch } = this.props
    if (prevProps.listMember !== listMember && listMember.length > 0) {
      let listMembersAll = []
      let number = 0
      listMember.map((member, index) => {
        if (this.checkDupName(listMembersAll, member.license_plate_no)) {
          listMembersAll.push({ "int_vehicle_id": member.int_vehicle_id + "_" + index + "_" + number + "_n1", "value": member.license_plate_no })
          number++
        }
        if (this.checkDupName(listMembersAll, member.vehicle_name)) {
          // console.log(" member.vehicle_name  : ", member.vehicle_name)
          // if (member.vehicle_name !== null) {
          listMembersAll.push({ "int_vehicle_id": member.int_vehicle_id + "_" + index + "_" + number + "_n2", "value": member.vehicle_name })
          // }
          number++
        }
        if (this.checkDupName(listMembersAll, member.vin_no)) {
          listMembersAll.push({ "int_vehicle_id": member.int_vehicle_id + "_" + index + "_" + number + "_n3", "value": member.vin_no })
          number++
        }
      })
      this.setState({ listMembersAll })
      this.props.setCookiesValue('listMembersAll', listMembersAll)
      this.props.setCookiesValue('vehicleSelect', listMember[0].int_vehicle_id)
      this.selectEventDevice(listMember[0].int_vehicle_id)
    }

    // if (prevProps.showBoxSearch !== showBoxSearch) {
    //   this.setState({ showBoxSearch })
    // }
  }

  componentWillUnmount() {
    this.props.setShowBoxSearch(true)
  }

  async load_manage_customer() {
    let userLevelId = this.props.dataLogin.userLevelId
    var response = await fetch(ENDPOINT_BASE_URL + "fleet/get_customer_by_manage", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: this.props.dataLogin.userId })
    });

    var data = await response.json();
    if (data.length > 0) {
      let companyList = []
      for (let index in data) {
        companyList.push({ key: data[index].int_cust_id, value: data[index].customer_name })
      }

      let cust_id = companyList[0].key

      if (userLevelId === 41 || userLevelId === 42 || userLevelId === 43) cust_id = null

      this.props.setCompanyList(companyList)
      this.props.getListMember(this.props.dataLogin.userId, cust_id)
      this.setState({ companyId: "" + cust_id })
      this.props.setCookiesValue('customerSelect', "" + cust_id)
    }
    else {
      this.props.setCompanyList([])
      this.props.getListMember(this.props.dataLogin.userId, null)
      this.setState({ companyId: [] })
      this.props.setCookiesValue('customerSelect', [])
    }
  }

  handleEvent(event, picker) {
    // console.log("handleEvent")
    let startDate = moment(picker.startDate)
    let endDate = moment(picker.endDate)

    this.setState({
      startDate,
      endDate,
      // strStartEndDate: startDate.format('DD-MM-YYYY HH:mm') + ' - ' + endDate.format('DD-MM-YYYY HH:mm'),
      strStartEndDate: startDate.format('DD/MM/YYYY HH:mm') + ' - ' + endDate.format('DD/MM/YYYY HH:mm'),
      fileNameDate: startDate.format('DD-MM-YYYY HH_mm') + ' to ' + endDate.format('DD-MM-YYYY HH_mm')
    })

    this.props.setCookiesValue('strStartEndDate', startDate.format('DD/MM/YYYY HH:mm') + ' - ' + endDate.format('DD/MM/YYYY HH:mm'))

  }


  handleDateStartChange(event, picker) {
    let dateStart = moment(picker.startDate)

    let sta = {
      dateStart
    }

    // console.log(dateStart.isBefore(this.state.dateEnd))
    if (!(dateStart.isBefore(this.state.dateEnd))) sta.dateEnd = dateStart
    this.setState(sta);
    // console.log("START", dateStart)
    // console.log("START", dateStart._i)
  }

  handleTimeStartChange(timeStart) {
    this.setState({ timeStart });
  }

  handleDateEndChange(event, picker) {
    let dateEnd = moment(picker.startDate)
    this.setState({ dateEnd });
    // console.log("END", dateEnd)
    // console.log("END", dateEnd._i)
  }

  handleTimeEndChange(timeEnd) {
    // console.log(timeEnd)
    this.setState({ timeEnd });
  }

  getVehicleInfo(vid) {
    let { listMember } = this.props
    let obj = listMember.find(x => x.int_vehicle_id === parseInt(vid));
    // return get(obj, "vehicle_name", "")
    return obj
  }

  selectEventDevice(select) {
    let text = "" + select
    let selectSp = text.split("_");
    let selectID = ""

    let vehicleInfo = this.getVehicleInfo(select)
    let vinNo = get(vehicleInfo, "vin_no", "")
    let vehicleName = get(vehicleInfo, "vehicle_name", "")
    let licensePlate = get(vehicleInfo, "license_plate_no", "")

    let showName = this.state.showName
    if (selectSp.length > 1) {
      selectID = selectSp[0]
      selectSp[3] === "n1" ? showName = "history_1"
        : selectSp[3] === "n2" ? showName = "history_2"
          : selectSp[3] === "n3" ? showName = "history_3" : showName = ""
    }
    else {
      selectID = select
    }
    if (this.props.showNameSelect !== this.state.showName) this.props.setCookiesValue('showNameSelect', showName)
    this.setState({
      int_vehicle_id: [parseInt(selectID)],
      vinNo,
      vehicleName,
      licensePlate,
      showName,
      startSearch: false
    })
  }

  selectEvent(e, index) {
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
    this.props.setMapState(position, null, 1)
  }

  searchHistory(e) {

    let { int_vehicle_id, startDate, endDate } = this.state

    if (int_vehicle_id.length != 0) {
      this.setState(state => ({ showHistoryTest: !state.showHistoryTest }))
      let dateTimeStart = calculateToTimestamp(startDate)
      let dateTimeEnd = calculateToTimestamp(endDate)

      //#region TEST
      // int_vehicle_id = 198296
      // dateTimeStart = 1588957200
      // dateTimeEnd = 1589042700

      // int_vehicle_id = 198297
      // dateTimeStart = 1591722000
      // dateTimeEnd = 1591758000

      // int_vehicle_id = 8525
      // dateTimeStart = 1604966400
      // dateTimeEnd = 1604973600

      //#endregion

      // console.log("int_vehicle_id : ", int_vehicle_id)
      // console.log("dateTimeStart : ", dateTimeStart)
      // console.log("dateTimeEnd : ", dateTimeEnd)

      this.props.getHistory(Number(int_vehicle_id), dateTimeStart, dateTimeEnd)
      this.props.setMapState(null, null, 1)

      let strDataTime = {}
      strDataTime.start = dateTimeStart
      strDataTime.end = dateTimeEnd

      this.setState({ strDataTime, pageLoadFirst: false })
      this.props.setShowBoxSearch(true)
    }
  }

  checkDupName(listMembersAll, name) {
    let index = listMembersAll.findIndex(x => x.value === name);
    return index > 0 ? false : true
  }

  setFormatTable(event, index, icon, time, name, duration) {
    return (
      <tr
        onClick={this.selectEvent.bind(this, event, index)}
        style={{ cursor: 'pointer', backgroundColor: this.state.index === index ? '#F4F4F4' : '' }}
        key={"tr_" + index}>
        <td>{icon}</td>
        <td>{time}</td>
        {/* <td>{name}</td> */}
        <td align="right">{duration}</td>
      </tr>
    )
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

  setActionIcon(code) {
    return <i
      className="fa fa-circle"
      style={{
        color: code == 2 ? 'rgb(248, 108, 139)' : code == 3 ? 'rgb(255, 230, 0)' : code == 4 ? 'rgb(93, 230, 72)' : code == 5 && 'rgb(88, 86, 214)',
        margin: 0
      }} />
  }

  setDataRow(event, index) {
    // let icon = this.actionIcon(event[21])
    let icon = this.setActionIcon(event[21])
    let timeStart = momentDate(event[0])
    let timeStop = momentDate(event[1])
    let name = get(event, '[27][2]', '-')
    let duration = calculateToDuration(get(event, '[26]', 0))

    if (index === 0 && index === this.props.dataHistory.trips.length - 1) {
      return [
        <tr>
          <td><span className="action-icon startstop-action"><i className="fas fa-arrow-down"></i></span></td>
          <td>{timeStart}</td>
          {/* <td></td> */}
          <td></td>
        </tr>,
        this.setFormatTable(event, index, icon, timeStart, name, duration),
        <tr onClick={this.selectEvent.bind(this, event)} style={{ cursor: 'pointer' }} key={"tr" + index}>
          <td><span className="action-icon startstop-action"><i className="far fa-flag"></i></span></td>
          <td>{timeStop}</td>
          {/* <td></td> */}
          <td></td>
        </tr>
      ]
    }
    else if (index === 0) {
      return [
        <tr key='start'>
          <td><span className="action-icon startstop-action" ><i className="fas fa-arrow-down"></i></span></td>
          <td>{timeStart}</td>
          {/* <td></td> */}
          <td></td>
        </tr>,
        this.setFormatTable(event, index, icon, timeStart, name, duration)
      ]
    }
    else if (index === this.props.dataHistory.trips.length - 1) {
      return [
        this.setFormatTable(event, index, icon, timeStart, name, duration)
        ,
        <tr key='stop'>
          <td><span className="action-icon startstop-action" ><i className="far fa-flag"></i></span></td>
          <td>{timeStop}</td>
          {/* <td></td> */}
          <td></td>
        </tr>
      ]
    }
    else {
      return this.setFormatTable(event, index, icon, timeStart, name, duration)
    }
  }

  eventName(code) {
    return (
      code == 2 ?
        'Parking' :
        code == 3 ?
          'Idling' :
          code == 4 ?
            'Moving' :
            code == 5 ?
              'Over speed' : ''
    )
  }

  render() {
    let { pageLoadFirst, strDataTime, dateStart, timeStart, dateEnd, timeEnd, showName, listMembers, startSearch, listMembersAll, vehicleName, vinNo, licensePlate, fileNameDate, companyId } = this.state
    let { dataHistory, imgData, buttonPrint, listMember, displayOverlayPanel, displayChange, showBoxSearch, searchHistoryStatus, companyList } = this.props
    let dataHistoryTrip = get(dataHistory, 'trips', [])

    const menu = (
      <Menu>
        <Menu.Item key="1">
          <TripExport />
        </Menu.Item>
        <Menu.Item key="2">
          <DetailExport vehicleName={vehicleName} vinNo={vinNo} licensePlate={licensePlate} date={fileNameDate} />
        </Menu.Item>
      </Menu>
    );

    // console.log("showName : ", showName)
    return (
      <div className='box-overlay-panel'>
        <div style={{ height: '100%', paddingTop: 0 /*165*/ }}>
          <div style={{
            height: 70, width: 25, cursor: 'pointer',
            paddingTop: 25,
            boxShadow: '0 2px 6px rgba(0,0,0,.3)',
            backgroundColor: 'white',
            borderRadius: '4px 0px 0px 4px'
          }}
            onClick={() => this.props.setShowBoxSearch(!showBoxSearch)}
          >
            <center><i className={"fa " + (showBoxSearch ? "fa-chevron-right" : "fa-chevron-left")}></i></center>
          </div>
        </div>


        <div
          className="tabs-container detail-overlay"
          style={{
            display: showBoxSearch ? 'inline-block' : 'none'
          }}
        >
          {/* <div style={{ padding: 10, borderBottom: '1px solid lightgray' }}> */}
          <div style={{ padding: 10 }}>
            <div className="pull-left" style={{ margin: 6 }}>
              {/* <h3>{t('event_log')}</h3> */}
              <h3>{t('event_log')}</h3>
            </div>
            <div className="pull-right">
              <Dropdown overlay={menu}>
                <Button
                  style={{
                    height: 35,
                    width: 105,
                    padding: 0,
                    marginRight: 5,
                    borderRadius: '5px 5px',
                    border: '1px solid #e7eaec',
                  }}>
                  <i className="fa fa-file-export" style={{ marginRight: 5 }} />{t("export")} <DownOutlined />
                </Button>
              </Dropdown>

              {/* <CSVLink data={dataExportCSV} filename={"Event Log.csv"}>
                <button
                  type="button"
                  className="ant-btn hover-export"
                  title="Export CSV"
                  style={{
                    height: 35,
                    width: 80,
                    padding: 0,
                    marginRight: 5,
                    borderRadius: '5px 5px',
                    border: '1px solid #e7eaec',
                  }}><i className="fas fa-file-csv"></i><span style={{ paddingLeft: 5 }}>{t("export")}</span></button>
              </CSVLink> */}

              {/* <a className={'btn btn-white'} title={'Print'} disabled={buttonPrint}> <i className="fa fa-print"></i></a> */}
              <ReactToPrint
                trigger={() => (
                  <IconButton
                    id='print'
                    // title={t('print')}
                    style={{
                      height: 35,
                      width: 80,
                      padding: 0,
                      borderRadius: '5px 5px',
                      border: '1px solid #e7eaec',
                    }}
                  // disabled={buttonPrint}
                  >
                    <i className="fa fa-print"></i><span style={{ paddingLeft: 5 }}>{t("print")}</span>
                  </IconButton>
                )}
                onBeforeGetContent={() => {
                  this.props.setPrint(true)
                  return new Promise((resolve, reject) => {
                    setTimeout(() => {
                      this.props.setPrint(false)
                      resolve();
                    }, 5000)

                  });
                }}
                content={() => this.componentRef}

              />
              {/* <button onClick={() => this.test()}>sdf</button> */}
              <div style={{ display: "none" }}>
                <Print ref={el => (this.componentRef = el)} dataHistory={dataHistory} strDataTime={strDataTime} dateTimeEnd={{ dateEnd, timeEnd }} imgData={imgData} />
              </div>
              {/* <a className={'btn btn-white'} title={'Print'} onClick={() => { this.props.printHistory() }}> <i className="fa fa-print"></i></a> */}
            </div>
          </div>
          <div style={{ borderBottom: '1px solid lightgray', marginTop: 30 }}></div>
          <div className="tab-content">
            <div className="form-horizontal" style={{ padding: 10 }}>
              <table className='form-history'>
                <tbody>
                  {
                    this.dealer_mode && <tr style={{ height: 50 }}>
                      <td style={{ width: '35%', paddingRight: 6 }}>
                        <b><span>{t("summary_84")} </span></b>
                      </td>
                      <td style={{ width: '5%', paddingRight: 6 }}><b><span>:</span></b></td>
                      <td style={{ width: '60%', paddingRight: 0 }}>
                        <DropdownCustomer
                          list={companyList}
                          selected={companyId}
                          disabled={this.props.loading}
                          onChange={(id) => {
                            this.setState({ companyId: id })
                            this.props.getListMember(this.props.dataLogin.userId, id)
                            this.props.setCookiesValue('customerSelect', id)
                          }}
                          style={{
                            width: 276
                          }}
                        />
                      </td>
                    </tr>
                  }

                  <tr>
                    <td style={{ width: '35%', paddingRight: 6, textAlign: "end" }}>
                      {/* <p align="right" style={{ marginTop: 10 }}><b>{t("plate_no")} :</b></p> */}
                      <Select
                        mode={'single'}
                        style={{
                          width: '100%',
                          maxWidth: 151,
                          textAlign: "left",
                          marginRight: 5,
                          fontWeight: 'bold'
                        }}
                        value={this.state.showName}
                        disabled={this.props.loading}
                        onChange={(selected) => {
                          this.setState({ showName: selected })
                          this.props.setCookiesValue('showNameSelect', selected)
                        }}
                      >
                        {listName.map((item) => <Option key={item.key}>{t(item.value)}</Option>)}
                      </Select>
                    </td>
                    <td style={{ width: '5%', paddingRight: 6 }}><b><span>:</span></b></td>
                    <td colSpan="2" style={{ width: '60%' }}>
                      <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder={t("select_a_plate_no")}
                        optionFilterProp="children"
                        disabled={this.props.loading}
                        value={this.state.int_vehicle_id}
                        onChange={(id) => {
                          this.selectEventDevice(id)
                          this.props.setCookiesValue('vehicleSelect', id)
                        }}
                        onSearch={(input) => {
                          this.setState({ startSearch: input !== "" ? true : false })
                        }}
                      // filterOption={(input, option) =>
                      //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      // }
                      >
                        {/* {
                          !startSearch ?
                            listMembers.map((member, i) => member.int_vehicle_id != null &&
                              <Option value={member.int_vehicle_id} >{showName === "history_1" ?
                                member.license_plate_no : showName === "history_2" ? member.vehicle_name :
                                  showName === "history_3" ? member.vin_no : ""
                              }</Option>
                            )
                            :
                            listMembersAll.map((member) =>
                              <Option value={member.int_vehicle_id} >{member.value}</Option>
                            )
                        } */}


                        {
                          !startSearch ?
                            listMember.map((member, i) => member.int_vehicle_id != null &&
                              // <Option value={member.int_vehicle_id} > {member.vehicle_name}</Option>

                              <Option value={member.int_vehicle_id} >{showName === "history_1" ?
                                member.license_plate_no : showName === "history_2" ? (member.vehicle_name === null ? ' ' : member.vehicle_name) :
                                  showName === "history_3" ? member.vin_no : ""
                              }</Option>
                            )
                            :
                            listMembersAll.map((member) =>
                              <Option value={member.int_vehicle_id} >{member.value}</Option>
                            )
                        }
                      </Select>
                    </td>
                  </tr>

                  <tr style={{ height: 50 }}>
                    <td style={{ width: '35%', paddingRight: 6 }}>

                      {/* <p align="right" style={{ marginTop: 10 }}>
                        <b>  <span> :</span></b>
                      </p> */}

                      <b><span>{t("history_4")} </span></b>
                    </td>
                    <td style={{ width: '5%', paddingRight: 6 }}><b><span>:</span></b></td>

                    <td style={{ width: '60%', paddingRight: 6 }}>
                      {/* <DateRangePicker
                        timePicker
                        timePicker24Hour
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onEvent={this.handleEvent}
                        maxSpan={{ days: 2 }}
                        containerStyles={{ display: 'inline-block', width: '100%' }}
                      >
                        <Input
                          className="form-control"
                          name="dates"
                          disabled={this.props.loading}
                          style={{ width: '102.2%', borderRadius: 2, border: '1px solid #d9d9d9', boxShadow: 'none' }}
                          value={this.state.strStartEndDate} />
                      </DateRangePicker> */}

                      <DateRangePickersTrans
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onEvent={this.handleEvent}
                        loading={this.props.loading}
                        strStartEndDate={this.state.strStartEndDate}
                      />
                    </td>
                  </tr>

                  {/* <tr style={{ height: 50 }}>
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
                      //
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
                      <TimePicker
                        className="input-sm"
                        onChange={this.handleTimeStartChange}
                        value={this.state.timeStart}
                        format={24}
                        start="00:00"
                        end="23:45"
                        step={15}
                        disabled={this.props.loading} />
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
                      <TimePicker
                        className="input-sm"
                        onChange={this.handleTimeEndChange}
                        value={this.state.timeEnd}
                        format={24}
                        start="00:00"
                        end="23:45"
                        step={15}
                        disabled={this.props.loading} />
                    </td>
                  </tr> */}
                </tbody>
              </table>

            </div>

            {/* <button onClick={this.searchHistory.bind(this)} style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto' }} className="btn btn-primary btn-block">Show History</button> */}

            <center>
              <SaveButton
                id="searchHistory"
                onClick={() => {
                  this.searchHistory()
                }}

                disabled={this.props.loading}
                name={t('search')}
                style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#8F9BA6', fontSize: '14px' }}
              /><br />
              <span style={{ fontSize: 14 }}>{t('history_6')}</span>
            </center>



            <div className="table-wrapper-scroll-y history-scrollbar scroll" style={{ marginTop: 10 }}>
              <table className="table table-hover table-bordered tb-history" style={{ marginBottom: 0 }}>
                <thead>
                  <tr>
                    <th><i className="fas fa-flag" title="Action"></i></th>
                    <th><i className="far fa-calendar-alt" title="Date"></i></th>
                    {/* <th><i className="fas fa-user" title="Driver"></i></th> */}
                    <th><i className="fa fa-clock-o" title="Duration"></i></th>
                  </tr>
                </thead>
                <tbody>
                  {/* {false && */}
                  {dataHistory && dataHistory.trips &&
                    dataHistory.trips.map((event, index) => {
                      return this.setDataRow(event, index)
                    })
                  }

                  {/* {

                    dataHistoryTrip.map((event, index) => {
                      return this.setDataRow(event, index)

                    })
                  } */}



                  {/* {
                    this.state.showHistoryTest &&
                    this.props.tailGroup !== null &&
                    this.props.tailGroup.map((event, index) => {
                      return (
                        <tr onClick={this.selectEvent.bind(this, event, index)} style={{ cursor: 'pointer', backgroundColor: this.state.index === index ? '#F4F4F4' : '' }} key={"tr" + index}>
                          <td>{this.actionIcon(event.io_code)}</td>
                          <td>{moment(event.gpsdate * 1000).format('DD-MM-YYYY HH:mm')}</td>
                          <td>{event.driverName}</td>
                          <td>2min 47s</td>
                        </tr>
                      )
                    })} */}
                </tbody>
              </table>

              {/* {get(dataHistory, 'trips', []).length === 0 && */}

              {/* {dataHistory && dataHistory.trips && dataHistory.trips.length === 0 &&

                [<br />, <br />, <br />,
                <center><div style={{ fontSize: "12px" }} id="dataHistory_null" >No data found.</div></center>]}
              */}

              {this.props.loading &&
                [<br />, <br />, <br />, <br />,
                <center>
                  <img src={images.loading} style={{ width: 50, height: 50 }} />
                  {/* {t('loading')} */}
                </center>]
              }

              {!pageLoadFirst && !this.props.loading && dataHistoryTrip && dataHistoryTrip.length === 0 &&
                [<br />, <br />, <br />, <br />,
                <center><div style={{ fontSize: "12px" }} id="dataHistory_null" ><label>{t("history_5")}</label></div></center>]
              }
            </div>
          </div >
        </div >
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
  showBoxSearch: state.history.showBoxSearch,
  searchHistoryStatus: state.history.searchHistoryStatus,
  companyList: state.history.companyList,
  customerSelect: state.history.customerSelect,
  showNameSelect: state.history.showNameSelect,
  vehicleSelect: state.history.vehicleSelect,
  listMembersAll: state.history.listMembersAll,
  strStartEndDate: state.history.strStartEndDate,
});
const mapDispatchToProps = (dispatch) => ({
  getHistory: (int_vehicle_id, startDate, endDate) => dispatch(HistoryActions.getHistory(int_vehicle_id, startDate, endDate)),
  setTabs: (tabs) => dispatch(HistoryActions.setTabs(tabs)),
  setFocusLocation: (lat, lng) => dispatch(HistoryActions.setFocusLocation(lat, lng)),
  setTailActive: (tailActive, eventId) => dispatch(HistoryActions.setTailActive(tailActive, eventId)),
  getListMember: (user_id, cust_id) => dispatch(HistoryActions.getListMember(user_id, cust_id)),
  setClear: (dataHistory) => dispatch(HistoryActions.setClear(dataHistory)),
  setMapState: (positionMarker, infoMarker, infoType) => dispatch(HistoryActions.setMapState(positionMarker, infoMarker, infoType)),
  setShowBoxSearch: (isShow) => dispatch(HistoryActions.setShowBoxSearch(isShow)),
  setCompanyList: (companyList) => dispatch(HistoryActions.setCompanyList(companyList)),
  setCookiesValue: (name, value) => dispatch(HistoryActions.setCookiesValue(name, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OverlayPanel);

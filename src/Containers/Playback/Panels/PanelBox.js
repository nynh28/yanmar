import React, { Component, Suspense } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import PlaybackActions from '../../../Redux/PlaybackRedux'
import '../styles/box-panel.css'
import '../styles/table.css'
import { t } from '../../../Components/Translation'
import { useTranslation } from 'react-i18next'
import { Row, Col } from 'reactstrap'
import moment from 'moment';
import 'antd/dist/antd.css';
import { get, isEmpty, isEqual } from 'lodash';
import { Calendar, Badge, Radio, Checkbox } from 'antd';
import Alert from './Loading'
import WarningAlert from './WarningAlert'
import { ENDPOINT_BASE_URL } from '../../../Config/app-config';
import DataGrid, { Column, SearchPanel } from 'devextreme-react/data-grid';

const optionsWithDisabled = [
  { label: t('playback_3'), value: '1' },
  { label: t('playback_4'), value: '0' }
];

const CheckboxGroup = Checkbox.Group;

const DataGridTrans = (arg) => {
  const { t } = useTranslation()
  return (<DataGrid
    dataSource={arg.dataSource}
    selection={{ mode: 'single' }}
    showBorders={true}
    hoverStateEnabled={true}
    keyExpr="vehicle_id"
    onSelectionChanged={(e) => arg.onSelectionChanged(e)}
  >
    <SearchPanel visible={true} width={'auto'} placeholder={t('dg_search')} />
    <Column
      dataField="name"
      caption={t('playback_1')}
      cellRender={(e) => arg.cellRender(e)}
    />
  </DataGrid>)
}


class OverlayPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
      st: "1",
      checkedList: []
    }
    this.vid = ""
    this.isChangeMonth = false
    this.dateActive = []
    this.channelList = []
    // this.dateStart = "2021-04-01"
    this.dateStart = moment().format('YYYY-MM-01')
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { listVehicles, skipTimeChart, listVideo, channelRange } = this.props

    if (nextProps.listVehicles !== listVehicles) {
      return true
    }

    if (
      nextProps.listVideo !== listVideo
      || nextProps.channelRange !== channelRange
    ) {
      return false
    }

    if (nextProps.skipTimeChart !== skipTimeChart) {
      // console.log("skipTimeChart : ", nextProps.skipTimeChart)
      // console.log("channelRange : ", channelRange)

      let range = []
      for (const [key, value] of Object.entries(channelRange)) {
        for (let idx in value) {
          if (range.length === 0) {
            if (new Date(nextProps.skipTimeChart).getTime() < new Date(value[idx].endtime).getTime()) {
              range = [nextProps.skipTimeChart, value[idx].endtime]
              this.props.setValue("maxTimeEnd", value[idx].endtime)
            }
          }
        }
      }

      console.log("range : ", range)

      // this.loadUrlMDVR(nextProps.skipTimeChart, moment(nextProps.skipTimeChart).format('YYYY-MM-DD 23:59:59'), null, true)
      this.loadUrlMDVR(range[0], range[1], null, true)
      return false
    }

    return true
  }

  createRow(data, index) {
    return <tr key={index} className="row-item" id={"tr_" + data.vehicle_id} style={{ cursor: 'pointer' }} onClick={() => {

      this.props.setValue("isLoadingInfo", true)
      this.vid = data.vehicle_id
      this.loadCalendarMDVR(data.vehicle_id)
      this.setHighlight("tr_" + data.vehicle_id)
      this.props.resetListVideo()

    }}>
      {/* <td> <Badge color="#f50" text={} /> <span style={{ fontSize: 12 }}>{data.vehicle_name !== "" ? data.vehicle_name : data.license_plate_no !== "" ? data.license_plate_no : data.vin_no}</span></td> */}
      <td style={{ paddingRight: 20 }}> <i className="fas fa-video" style={{ paddingRight: 10, color: data.status == 1 ? 'rgb(76, 217, 100)' : 'rgb(173, 173, 178)' }} /><span>{data.vehicle_name !== "" ? data.vehicle_name : data.license_plate_no !== "" ? data.license_plate_no : data.vin_no}</span></td>
    </tr>
  }

  setHighlight(id) {
    let { listVehicles } = this.props

    for (let idx in listVehicles) {
      let elm = document.querySelectorAll("[id=\"" + "tr_" + listVehicles[idx].vehicle_id + "\"]")
      if (get(elm, '[0]')) {
        let tr = get(elm, '[0]')
        tr.classList.remove("highlight-item");
      }
    }

    let elm_item = document.querySelectorAll("[class=row-item]")
    for (let index in elm_item) {
      if (elm_item[index].id !== undefined) {
        if (elm_item[index].id === id) {
          elm_item[index].classList.add("highlight-item");
        }
      }
    }
  }

  async loadCalendarMDVR(vehicle_id) {
    this.clearActiveAll()
    var response = await fetch(ENDPOINT_BASE_URL + "fleet/mdvr/playback/calendar/info?"
      + "user_id=" + this.props.dataLogin.userId
      + "&vehicle_id=" + vehicle_id
      + "&start=" + this.dateStart
      + "&st=" + this.state.st
      , {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

    var data = await response.json();

    console.log("loadCountMDVR : ", data)

    if (data.message === "ok") {
      this.setActiveCalendar(data.result.data)
      this.dateActive = data.result.data
      this.channel_info = data.result.channel_info

      let channelList = [], checkedList = []
      for (let idx in data.result.channel_info) {
        let channel_id = "" + data.result.channel_info[idx].channel_id
        channelList.push(channel_id)
        if (checkedList.length < 4) checkedList.push(channel_id)
      }
      this.channelList = channelList
      this.setState({ checkedList })
      this.props.setValue("channelChecked", checkedList)
    }
    else {
      this.setState({ checkedList: [] })
      this.props.setValue("channelChecked", [])
    }
    this.props.setValue("isLoadingInfo", false)
  }

  async loadCountMDVR(vehicle_id, dateStart, dateEnd) {
    this.clearActiveAll()
    var response = await fetch(ENDPOINT_BASE_URL + "fleet/mdvr/playback/gps/count?"
      + "user_id=" + this.props.dataLogin.userId
      + "&vehicle_id=" + vehicle_id
      + "&start=" + dateStart
      + "&end=" + dateEnd, {
      //   + "&start=2021-04-01 00:00:00"
      // + "&end=2021-04-17 23:59:59", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    var data = await response.json();

    console.log("loadCountMDVR : ", data)

    if (data.message === "ok") {
      this.setActiveCalendar(data.result)
      this.dateActive = data.result
    }
    else {

    }
  }


  async loadDataChart(date, isByCalendar = true) {
    // console.log("loadDataChart: ", date)

    //#region  VALIDATE
    if (this.state.checkedList.length > 4) {
      this.props.setValue("isWarning", {
        show: true,
        content: "playback_5"
      })
      return
    }
    if (this.vid === "") {
      this.props.setValue("isWarning", {
        show: true,
        content: "playback_6"
      })
      return
    }
    if (this.state.checkedList.length === 0) {
      this.props.setValue("isWarning", {
        show: true,
        content: "playback_7"
      })
      return
    }
    //#endregion

    this.props.setValue("dataChart", [])
    let dateStart = "", dateEnd = "", dateStartStream = date

    if (isByCalendar) {
      dateStartStream = date + " 00:00:00"
      dateStart = date + " 00:00:00"
      dateEnd = date + " 23:59:59"
    }
    else {
      dateStart = moment(date).format('YYYY-MM-DD 00:00:00')
      dateEnd = moment(date).format('YYYY-MM-DD 23:59:59')
      dateStartStream = date
    }

    this.props.setValue("isLoadingInfo", true)
    this.props.setValue("defaultVisualRange", [dateStart, dateEnd])
    var response = await fetch(ENDPOINT_BASE_URL + "fleet/mdvr/playback/info?"
      + "&user_id=" + this.props.dataLogin.userId
      + "&vehicle_id=" + this.vid
      + "&channel=" + this.state.checkedList
      + "&start=" + dateStart
      + "&end=" + dateEnd
      + "&ft=0"
      + "&st=" + this.state.st
      , {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

    var data = await response.json();

    console.log("loadDataChart : ", data)

    if (data.message === "ok") {
      let channelRange = this.setRangeDataOfChannel(data.result)
      // console.log("channelRange : ", channelRange)
      // this.loadUrlMDVR(dateStartStream, dateEnd, channelRange, false)

      let firstChannelRange = {}
      ////#region  TEST
      let listVideo = [], timestampLast = 0, minTimeStart = "", timestampEndLast = 0, maxTimeEnd = ""
      for (const [key, value] of Object.entries(channelRange)) {
        let newValue = []
        if (value.length > 0) {
          let _timestamp = new Date(value[0].starttime).getTime()

          if (_timestamp > timestampLast) {
            minTimeStart = value[0].starttime
            timestampLast = _timestamp
          }

          let _timestampEnd = new Date(value[0].endtime).getTime()
          if (_timestampEnd > timestampEndLast) {
            maxTimeEnd = value[0].endtime
            timestampEndLast = _timestampEnd
          }

          let result = await this.loadSubUrlMDVR(value[0].starttime, value[0].endtime, key)
          // console.log("result : ", result)
          result.length > 0 && listVideo.push(...result)
        }
        for (let idx in value) {
          newValue.push({
            starttime: value[idx].starttime,
            endtime: value[idx].endtime,
            load: idx == 0 ? 1 : 0
          })
        }
        firstChannelRange[key] = newValue
      }

      // console.log("firstChannelRange : ", firstChannelRange)
      // console.log("listVideo : ", listVideo)
      // console.log("minTimeStart : ", minTimeStart)
      // console.log("maxTimeEnd : ", maxTimeEnd)

      this.props.setValue("minTimeStart", minTimeStart)
      this.props.setValue("maxTimeEnd", maxTimeEnd)
      if (listVideo.length > 0) {
        this.props.setValue("listVideo", listVideo)
        this.props.setValue("listVideoTemp", listVideo)
        this.props.setValue("isLoadingInfo", false)
      }
      else {
        this.props.setValue("listVideo", [{}, {}, {}, {}])
        this.props.setValue("listVideoTemp", [{}, {}, {}, {}])
        this.props.setValue("isLoadingInfo", false)
      }


      //#endregion

      let result = this.setSubRangeDataNew(data.result)
      this.props.setValue("dataChart", result)
      this.props.setValue("channelRange", firstChannelRange)

      if (data.result.length > 0) {
        this.props.setValue("minTimeStart", data.result[0].starttime)
      }
    }
    else {
      this.props.setValue("dataChart", [])
      this.props.setValue("isLoadingInfo", false)
    }
  }


  setRangeDataOfChannel(data) {
    let channelActive = {}, lastChannel = "", lastData = {}, rangeData = []
    for (let idx in data) {
      let dt = data[idx]
      lastChannel = dt.chn

      if (get(lastData, dt.chn)) { // มีการสร้าง channel แล้ว
        if (dt.starttime === lastData[dt.chn][0].endtime) { // ถ้า starttime เท่ากับ endtime ของข้อมูลก่อนหน้าให้เปลี่ยนค่า endtime 
          lastData[dt.chn][0].endtime = dt.endtime
        }
        else { // เปลี่ยนช่วงของ channel
          rangeData.push(lastData[dt.chn][0]) // เพิ่มช่วงของข้อมูล
          lastData = {}
          lastData[dt.chn] = [{ starttime: dt.starttime, endtime: dt.endtime, load: 0 }] // เก็บค่าข้อมูลตัวล่าสุด
        }
      }
      else {  // เปลี่ยน channel
        if (!isEmpty(lastData)) {
          if (dt.starttime !== lastData[data[idx - 1].chn][0].endtime) { // ถ้า starttime ไม่เท่ากับ endtime ของข้อมูลก่อนหน้า
            channelActive[data[idx - 1].chn] = rangeData
            channelActive[data[idx - 1].chn].push(lastData[data[idx - 1].chn][0])

            lastData = {}
            rangeData = []
          }
        }
        lastData[dt.chn] = [{ starttime: dt.starttime, endtime: dt.endtime, load: 0 }]// เก็บค่าข้อมูลตัวล่าสุด
      }
    }

    if (rangeData.length > 0 || !isEmpty(lastData)) { // เพิ่มข้อมูลของ channel สุดท้าย
      channelActive[lastChannel] = rangeData
      channelActive[lastChannel].push(lastData[lastChannel][0])
    }

    return channelActive
  }

  setSubRangeDataNew(lst) {
    let newLst = []
    lst.forEach((item) => {
      let { chn, starttime, endtime } = item
      let start = moment(starttime, 'YYYY-MM-DD HH:mm:ss'), end = moment(endtime, 'YYYY-MM-DD HH:mm:ss')
      if (end.diff(start, 'minutes', true) === 0) {
        newLst.push({
          x: "" + chn,
          y: [
            new Date(starttime).getTime(),
            new Date(endtime).getTime()
          ],
          fillColor: "#36d7b7"
        })
      } else {
        let min = end.diff(start, 'minutes')
        for (let i = 0; i < min; i++) {
          let _start = "", _end = ""
          let obj = {
            x: "" + chn
          }

          _start = start.format('YYYY-MM-DD HH:mm:ss')
          start.add(1, 'm');
          _end = start.format('YYYY-MM-DD HH:mm:ss')


          obj.y = [
            new Date(_start).getTime(),
            new Date(_end).getTime()
          ]
          obj.fillColor = "#36d7b7"
          newLst.push(obj)
        }
        if (end.diff(start, 'minutes') !== end.diff(start, 'minutes', true))
          newLst.push({
            x: "" + chn,
            y: [
              new Date(start.format('YYYY-MM-DD HH:mm:ss')).getTime(),
              new Date(endtime).getTime()
            ],
            fillColor: "#36d7b7"
          })
      }

    });
    return newLst
  }


  async loadSubUrlMDVR(dateStart, dateEnd, channel) {
    var response = await fetch(ENDPOINT_BASE_URL + "fleet/mdvr/playback?"
      + "user_id=" + this.props.dataLogin.userId
      + "&vehicle_id=" + this.vid
      + "&channel=" + channel
      + "&start=" + dateStart
      + "&end=" + dateEnd
      , {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

    var data = await response.json();

    console.log("** loadSubUrlMDVR : ", data)

    if (data.message === "ok") {
      let listVideo = []
      for (let idx in data.result) {
        listVideo.push({
          "label_name": "Channel " + data.result[idx].channel,
          "channel": data.result[idx].channel,
          "url": data.result[idx].url
        })
      }
      return listVideo
    }

    return []
  }


  async loadUrlMDVR(dateStart, dateEnd) {
    console.log("___________loadUrlMDVR___________________")
    console.log("dateStart : ", dateStart)
    console.log("dateEnd : ", dateEnd)

    this.props.setValue("minTimeStart", dateStart)

    let channelList = [], listVideo = []
    for (let idx in this.state.checkedList) {
      channelList.push(parseInt(this.state.checkedList[idx]))
    }

    var response = await fetch(ENDPOINT_BASE_URL + "fleet/mdvr/playback?"
      + "user_id=" + this.props.dataLogin.userId
      + "&vehicle_id=" + this.vid
      + "&channel=" + channelList
      + "&start=" + dateStart
      + "&end=" + dateEnd
      , {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

    var data = await response.json();

    console.log("loadUrlMDVR : ", data)

    if (data.message === "ok") {
      for (let idx in data.result) {
        listVideo.push({
          "label_name": "Channel " + data.result[idx].channel,
          "channel": data.result[idx].channel,
          "url": data.result[idx].url
        })
      }
      this.props.setValue("listVideo", listVideo)
      this.props.setValue("listVideoTemp", listVideo)
      this.props.setValue("isLoadingInfo", false)
    }
    else {
      this.props.setValue("listVideo", [{}, {}, {}, {}])
      this.props.setValue("listVideoTemp", [{}, {}, {}, {}])
    }
  }




  setSubRangeData(lst) {
    let newLst = []
    lst.forEach((item) => {
      let { chn, starttime, endtime } = item
      let start = moment(starttime, 'YYYY-MM-DD HH:mm:ss'), end = moment(endtime, 'YYYY-MM-DD HH:mm:ss')
      if (end.diff(start, 'minutes', true) === 0) {
        newLst.push({
          chn,
          starttime,
          endtime,
          timeStartForRange: moment(starttime).format('2021-04-01 HH:mm:ss'),
          timeEndForRange: moment(endtime).format('2021-04-01 HH:mm:ss')
        })
      } else {
        let min = end.diff(start, 'minutes')
        // console.log('min', min, end.diff(start, 'minutes', true))
        for (let i = 0; i < min; i++) {
          let obj = { chn, starttime: start.format('YYYY-MM-DD HH:mm:ss') }
          start.add(1, 'm');
          obj.endtime = start.format('YYYY-MM-DD HH:mm:ss')

          obj.timeStartForRange = moment(obj.starttime).format('2021-04-01 HH:mm:ss')
          obj.timeEndForRange = moment(obj.endtime).format('2021-04-01 HH:mm:ss')
          newLst.push(obj)
        }
        if (end.diff(start, 'minutes') !== end.diff(start, 'minutes', true))
          newLst.push({
            chn,
            starttime: start.format('YYYY-MM-DD HH:mm:ss'),
            endtime,
            timeStartForRange: moment(start).format('2021-04-01 HH:mm:ss'),
            timeEndForRange: moment(endtime).format('2021-04-01 HH:mm:ss')
          })
      }

    });
    return newLst
  }


  getListData(value) {
    let listData;
    console.log("getListData : ", value.date())

    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ];
        break;
      default:
    }
    return []
  }

  setActiveCalendar(data) {
    data.forEach((item) => {
      let sele = document.querySelectorAll("[title=\"" + item.date + "\"]");
      // if (get(sele, '[0]') && item.count > 0) {
      //   let tr = get(sele, '[0]')
      //   tr.classList.add("active-green");
      // }
      if (get(sele, '[0]')) {
        let tr = get(sele, '[0]')
        tr.classList.add("active-green");
      }
    })
  }

  clearActiveAll() {
    let elems = document.querySelectorAll(".active-green");
    [].forEach.call(elems, (el) => {
      el.classList.remove("active-green");
    });
  }

  onPanelChange() {
    this.isChangeMonth = true
    this.clearActiveAll()
    // if (this.vid !== "") this.loadCountMDVR(this.vid, dateStart, dateEnd)
    if (this.vid !== "") this.loadCalendarMDVR(this.vid)
  }

  cellRender(e) {
    let data = e.data

    return (<div>
      <i className="fas fa-video" style={{ paddingRight: 10, color: data.status == 1 ? 'rgb(76, 217, 100)' : 'rgb(173, 173, 178)' }} />
      <span>{data.name}</span>
    </div>
    )
  }

  onSelectionChanged({ selectedRowsData }) {
    const data = selectedRowsData[0];
    this.props.setValue("isLoadingInfo", true)
    this.props.setValue("videoTime", '')
    this.vid = data.vehicle_id
    this.loadCalendarMDVR(data.vehicle_id)
    this.props.resetListVideo()
  }

  render() {
    let { listVehicles } = this.props
    let { date, st, checkedList } = this.state

    return (
      <div style={{ margin: '0px -20px 0px -15px' }}>
        <Alert />
        <WarningAlert />

        <div className="ibox-content-list">
          <div className="DefaultLayout">
            <div className="box-panel-trip-list-2 list-scrollbar-2 scrollbar-custom-2" id="style-3">
              {/* <table className="table table-hover table-bordered tb-trip-list header-fixed" style={{ marginBottom: 0 }}>
                <thead>
                  <tr>
                    <th style={{ zIndex: 1 }}><i className="icon-group-10971"></i> รายการรถ</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    // dataMock.map((item, index) => {
                    listVehicles.map((item, index) => {
                      return this.createRow(item, index)
                    })
                  }
                </tbody>
              </table> */}


              <DataGridTrans
                dataSource={[...listVehicles]}
                onSelectionChanged={(e) => this.onSelectionChanged(e)}
                cellRender={(e) => this.cellRender(e)}
              />
            </div>
          </div>
        </div>

        <div className="ibox-footer-list">
          <div className="ibox-scrollbar">
            <div className="checkbox-channel">
              <Radio.Group
                options={optionsWithDisabled}
                onChange={(e) => {
                  this.setState({ st: e.target.value })
                }}
                value={st}
                optionType="button"
                buttonStyle="solid"
              />
            </div>

            {
              this.channelList.length > 0 && <div className="checkbox-channel">
                <span>{t('playback_2')} : </span>
                <CheckboxGroup
                  options={this.channelList}
                  value={checkedList}
                  onChange={(value) => {
                    this.setState({ checkedList: value })
                    this.props.setValue("channelChecked", value)
                  }}
                />
              </div>
            }
            {/* <div className="ibox-scrollbar"> */}
            <div className="site-calendar-card-border">
              <Calendar fullscreen={false}
                onPanelChange={(e) => {
                  this.dateStart = e.year() + "-" + ('0' + (e.month() + 1)).slice(-2) + "-01"
                  this.onPanelChange()
                }}
                onSelect={(e) => {
                  this.props.setValue("videoTime", '')
                  if (!this.isChangeMonth) {
                    let date = e.year() + "-" + ('0' + (e.month() + 1)).slice(-2) + "-" + ('0' + e.date()).slice(-2)
                    setTimeout(() => {
                      if (this.vid !== "") {
                        this.clearActiveAll()
                        this.setActiveCalendar(this.dateActive)
                      }
                    }, 50)

                    this.loadDataChart(date, true)
                  }
                  this.isChangeMonth = false
                }}
              />
            </div>
            {/* </div> */}
          </div>
        </div>
        {/* </div> */}
      </div>)
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  listVehicles: state.playback.listVehicles,
  skipTimeChart: state.playback.skipTimeChart,
  listVideo: state.playback.listVideo,
  channelRange: state.playback.channelRange,
});

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(PlaybackActions.setValue(name, value)),
  resetListVideo: () => dispatch(PlaybackActions.resetListVideo()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OverlayPanel))
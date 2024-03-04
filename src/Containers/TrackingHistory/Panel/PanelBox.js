import React, { Component, Suspense } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import TrackingHistoryActions from '../../../Redux/TrackingHistoryRedux'
import '../Styles/box-panel.css'
import '../Styles/footer.css'
import '../Styles/table.css'
import { t } from '../../../Components/Translation'
import { Button } from 'antd';
import { momentDate, calculateToDuration, calculateToTimestamp } from '../../../Functions/DateMoment'
import { getSum, getAvg } from '../Functions'
import { exportExcel } from '../../../Functions/ExportExcel'
import { get } from 'lodash'
import moment from 'moment'
import { getEventIcon, getEventName } from '../Functions'
import { useTranslation } from 'react-i18next'
import { renderToString } from 'react-dom/server'
import Tabbed from '../../../Components/Tabbed'
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

const mySuspense = (<Suspense />).type;
const { Panel } = Collapse;

const ColumnHint = (arg) => {
  const { t } = useTranslation()
  return (<td title={arg.keyName !== undefined ? t(arg.keyName) : t(getEventName(arg.eventId))}>
    {arg.content}
  </td>)
}

const ColumnColspanHint = (arg) => {
  const { t } = useTranslation()
  return (<td colSpan={arg.colspan} title={arg.keyName !== undefined ? t(arg.keyName) : t(getEventName(arg.eventId))}>
    {arg.content}
  </td>)
}

const IconHint = (arg) => {
  const { t } = useTranslation()
  return (<i className={arg.className} title={t(arg.keyName)} />)
}

class OverlayPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripList: []
    }
  }

  componentDidMount() {
    let { dataTrips, indexTripSelected } = this.props
    let tripList = []
    for (let index in indexTripSelected) {
      tripList.push(dataTrips[indexTripSelected[index]])
    }
    this.setState({ tripList })
  }

  componentWillUnmount() {
    this.props.setValue("listImages", [])
    this.props.setValue('cssChart', "small-chart")
  }

  createRow_old(trip, typeTrip) {
    let tbRow = []
    let { event_id_list } = this.props

    if (typeTrip == "ENDONLIY") {
      tbRow.push(
        <tr style={{ cursor: 'pointer' }}>
          <ColumnHint
            keyName={"history_65"}
            content={<span className="action-icon startstop-action" ><i className="far fa-flag"></i></span>}
          />
          <td><span style={{ fontSize: 12 }}>{moment(trip[0]).format('DD/MM/YYYY HH:mm:ss')}</span></td>
          {/* <td>Loylum Bunnag</td> */}
          <td> </td>
        </tr>
      )
    }
    else {
      if (typeTrip == "START") {
        tbRow.push(
          <tr style={{ cursor: 'pointer' }}>
            <ColumnHint
              keyName={"history_64"}
              eventId={trip[2]}
              content={<span className="action-icon startstop-action" ><i className="fas fa-arrow-down"></i></span>}
            />
            <td><span style={{ fontSize: 12 }}>{moment(trip[0]).format('DD/MM/YYYY HH:mm:ss')}</span></td>
            {/* <td>Loylum Bunnag</td> */}
            <td> </td>
          </tr>
        )
      }

      tbRow.push(
        <tr style={{ cursor: 'pointer' }} onClick={() => this.selectTrip(trip)}>
          <ColumnHint
            eventId={trip[2]}
            content={
              ("" + getEventIcon(trip[2]) === "unknow") ?
                <span className="action-icon startstop-action">
                  {trip[2]}
                </span> : <img src={getEventIcon(trip[2])} alt="image" style={{ width: 20, height: 20 }} />
            }
          />

          <td><span style={{ fontSize: 12 }}>{moment(trip[0]).format('DD/MM/YYYY HH:mm:ss')}</span></td>
          <td>
            {/* <span style={{ fontSize: 12 }}>{calculateToDuration(get(trip, '[8]', 0))}</span> */}
            <span style={{ fontSize: 12 }}>{(event_id_list.includes(get(trip, '[2]', 0)) ?
              trip[2] === 1001 ? t('history_62') + " (" + get(trip, '[3]', "-") + ")" :
                trip[2] === 1002 ? t('history_63') + " (" + get(trip, '[3]', "-") + ")" :
                  get(trip, '[3]', "-") : calculateToDuration(get(trip, '[8]', 0)))}</span>
          </td>
        </tr>
      )

      if (typeTrip == "END") {
        tbRow.push(
          <tr style={{ cursor: 'pointer' }} >
            <ColumnHint
              keyName={"history_65"}
              eventId={trip[2]}
              content={<span className="action-icon startstop-action" ><i className="far fa-flag"></i></span>}
            />
            <td><span style={{ fontSize: 12 }}>{moment(trip[0]).format('DD/MM/YYYY HH:mm:ss')}</span></td>
            {/* <td>Loylum Bunnag</td> */}
            <td> </td>
          </tr>
        )
      }
    }

    return tbRow
  }

  createRow(trip, typeTrip, tripEnd) {
    let tbRow = []
    let { event_id_list } = this.props
    if (typeTrip == "ENDONLIY") {
      tbRow.push(
        <tr style={{ cursor: 'pointer' }} onClick={() => this.selectTrip(trip)}>
          <ColumnHint
            keyName={"history_65"}
            content={
              <div>
                <span className="action-icon startstop-action" ><i className="far fa-flag"></i></span>
                <span style={{ fontSize: 12, paddingLeft: 10 }}>{moment(trip[0]).format('DD/MM/YYYY HH:mm:ss')}</span>
              </div>
            }
          />
          <td> </td>
        </tr>
      )
    }
    else {
      if (typeTrip == "START") {
        tbRow.push(
          <tr style={{ cursor: 'pointer' }} onClick={() => this.selectTrip(trip)}>
            <ColumnColspanHint
              keyName={"history_64"}
              eventId={trip[2]}
              colspan={2}
              content={<div>
                <span className="action-icon startstop-action" ><i className="fas fa-arrow-down"></i></span>
                <span style={{ fontSize: 12, paddingLeft: 10 }}>{moment(trip[0]).format('DD/MM/YYYY HH:mm:ss')} - {moment(tripEnd[0]).format('DD/MM/YYYY HH:mm:ss')}</span>
              </div>
              }
            />
            {/* <td><span style={{ fontSize: 12, paddingLeft: 10 }}>{moment(tripEnd[0]).format('DD/MM/YYYY HH:mm:ss')}</span></td> */}
          </tr>
        )
      }

      tbRow.push(
        <tr style={{ cursor: 'pointer', backgroundColor: this.props.subRootTrip.includes(trip[2]) ? 'rgb(249 249 249)' : '' }} onClick={() => this.selectTrip(trip)}>
          <ColumnHint
            eventId={trip[2]}
            content={
              ("" + getEventIcon(trip[2]) === "unknow") ?
                <span className="action-icon startstop-action">
                  {trip[2]}
                </span> :
                <div style={{
                  paddingLeft: this.props.subRootTrip.includes(trip[2]) ? 20 : 0
                }} >
                  <img src={getEventIcon(trip[2])} alt="image" style={{ width: 20, height: 20 }} />
                  <span style={{ fontSize: 12, paddingLeft: 10 }}>{moment(trip[0]).format('DD/MM/YYYY HH:mm:ss')}</span>
                </div>
            }
          />
          {/* <td style={{ maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            <span style={{ fontSize: 12 }}>{(event_id_list.includes(get(trip, '[2]', 0)) ?
              trip[2] === 1001 ? this.rTT(t('history_62')) + " (" + get(trip, '[3]', "-") + ")" :
                trip[2] === 1002 ? this.rTT(t('history_63')) + " (" + get(trip, '[3]', "-") + ")" :
                  trip[2] === 1010 ? get(trip, '[4]', '') :
                    trip[2] === 1011 ? get(trip, '[4]', '') :
                      get(trip, '[3]', "-") : calculateToDuration(get(trip, '[8]', 0)))}</span>
          </td> */}
          <td style={{ maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            <span style={{ fontSize: 12 }}>{get(trip, '[2]', 0) === 1 ? calculateToDuration(get(trip, '[8]', 0)) : get(trip, '[3]', "-")}</span>
          </td>
        </tr>
      )

      if (typeTrip == "END") {
        tbRow.push(
          <tr style={{ cursor: 'pointer' }} onClick={() => this.selectTrip(trip)}>
            <ColumnHint
              keyName={"history_65"}
              eventId={trip[2]}
              content={
                <div>
                  <span className="action-icon startstop-action" ><i className="far fa-flag"></i></span>
                  <span style={{ fontSize: 12, paddingLeft: 10 }}>{moment(trip[0]).format('DD/MM/YYYY HH:mm:ss')}</span>
                </div>}
            />
            <td> </td>
          </tr>
        )
      }
    }
    return tbRow
  }

  selectTrip(data, isTopStart = false) {
    let { detailTrip } = this.props
    let path = []

    if ([1, 5].includes(data[2])) {
      let timeStart = calculateToTimestamp(data[0])
      let timeEnd = calculateToTimestamp(data[1])
      let indexStart = detailTrip.findIndex(x => x[28] == timeStart);

      for (let index = indexStart; index < detailTrip.length; index++) {
        if (detailTrip[index][28] < timeEnd) {
          path.push({ lat: detailTrip[index][2], lng: detailTrip[index][3] })
        }
      }
    }
    else {
      path.push({ lat: data[15], lng: data[16] })
    }

    this.fitBoundsEvent(path)
    this.props.setValue("tailActive", path)
  }

  fitBoundsEvent(path) {
    let { map } = this.props

    if (map) {
      let bounds = new window.google.maps.LatLngBounds();
      for (let index in path) {
        bounds.extend({ lat: path[index].lat, lng: path[index].lng })
      }
      map.fitBounds(bounds)
      let zoom = map.getZoom()

      const removeDuplicatesFromArray = (arr) => [...new Set(
        arr.map(el => JSON.stringify(el))
      )].map(e => JSON.parse(e));

      let dataNotDuplicate = removeDuplicatesFromArray(path)

      if (dataNotDuplicate.length === 1) {
        map.setZoom(zoom - 4)
      }
      else if (dataNotDuplicate.length <= 30) {
        map.setZoom(zoom - 1)
      }
    }
  }

  createGroupCamera(data, key) {
    return <Panel header={moment(data.take_photo_time, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss')} key={key} className="site-collapse-custom-panel">
      <div className='panel-image'
      // style={{ display: "flex", flexDirection: "row", paddingTop: 10, marginBottom: -10 }}
      >
        {
          data.channelList.map((item, i) => {
            return <div
              style={{ width: 110, height: 100, backgroundColor: "white", textAlign: 'center', cursor: 'pointer' }}
              onClick={() => this.props.setValue("indexImage", {
                channel: item.channel,
                url: item.url,
                lat: item.lat,
                lng: item.lng,
                course: item.course,
                take_photo_time: item.take_photo_time
              })}
            >
              <img src={item.url} width="60" height="60" />
              <div className="image-footer" >
                <span style={{ fontSize: 12, fontWeight: 500 }}>channel : {item.channel}</span>
              </div>
            </div>
          })
        }
      </div>
    </Panel>
  }

  render() {
    let { tripList, hidePanelBox } = this.state
    let { listImages, indexOpen, vehicleNameDisplay, chassisNo } = this.props
    // console.log(">> RENDER PANEL LISTS << : ")

    let _indexOpen = []
    for (let i = 0; i < 2000; i++) _indexOpen.push(i)

    return [
      <span style={{ height: '100%', paddingTop: 0 /*165*/ }}>
        <div style={{
          height: 70, width: 25, cursor: 'pointer',
          paddingTop: 25,
          boxShadow: '0 2px 6px rgba(0,0,0,.3)',
          backgroundColor: 'white',
          borderRadius: '4px 0px 0px 4px'
        }}
          // onClick={() => this.setState({ displayOverlayPanel: !displayOverlayPanel })}>
          onClick={() => this.setState({ hidePanelBox: !hidePanelBox })}>
          {/* <center><i className="fa fa-chevron-right"></i></center> */}
          <center><i className={"fa " + (hidePanelBox ? "fa-chevron-left" : "fa-chevron-right")}></i></center>
        </div>
      </span>
      ,
      <div className="box-panel-trip" style={{ display: hidePanelBox ? 'none' : 'inline-block' }}>
        <div className="box-panel-trip-header" >
          <span style={{ fontSize: 12, fontWeight: 600, paddingLeft: 5 }}>
            {t("event_log")}
          </span>
          <div className="box-panel-trip-right"  >
            <Button type="button" size="small" style={{ marginRight: 2 }}
              onClick={() => this.props.history.push('/TrackingHistory')}>
              <i className="fa fa-chevron-left" style={{ fontSize: 12, marginRight: 6 }} />{t("history_93")}
            </Button>

            <Button type="button" size="small"
              onClick={() => this.setupExport()}>
              <i className="icon-excel-01" style={{ fontSize: 12, marginRight: 2 }} />{t("history_8")}
            </Button>
          </div>
        </div>
        <Tabbed
          id={'panel-box-history'}
          defaultActiveKey={0}
          tabPosition={'top'}
          onActive={(active) => {
            // console.log("active : ", active)
          }}
          // tabPaneStyles={{ marginTop: -15 }}
          tabName={[
            <span><i className="fa fa-history" title="History" /></span>,
          ]}
          tabPane={[
            // VehicleList
            <div>
              <div style={{
                position: 'absolute',
                width: '100%',
                padding: 1,
                zIndex: 11,
                backgroundColor: '#FFF'
              }} />
              <div className="box-panel-trip-list list-history-scrollbar scrollbar-custom" id="style-3">
                <table className="table table-hover table-bordered tb-trip-list header-fixed" style={{ marginBottom: 0 }}>
                  <thead>
                    <tr>
                      <th style={{ zIndex: 1 }}> <IconHint className="fas fa-flag" keyName="history_45" />
                        <span style={{ fontSize: 12, paddingLeft: 10 }}>{chassisNo}</span>
                      </th>
                      {/* <th><IconHint className="far fa-calendar-alt" keyName="history_40" /></th> */}
                      <th style={{ width: '55%' }}><IconHint className="fa fa-clock-o" keyName="history_41" /></th>

                    </tr>
                  </thead>
                  <tbody>
                    {
                      tripList.map((trip, index) => {
                        let typeTrip = index == 0 ? "START" : tripList.length == (index + 1) ? "END" : ""
                        let tripEnd = tripList[tripList.length - 1]
                        return this.createRow(trip, typeTrip, tripEnd)
                      })
                    }
                    {
                      tripList.length == 1 && this.createRow(tripList[0], "ENDONLIY")
                    }

                  </tbody>
                </table>
              </div>
            </div>
            // <div className="box-panel-trip-list list-history-scrollbar scrollbar-custom" id="style-3">
            //   {/* {console.log("indexOpen : ", _indexOpen)} */}
            //   <Collapse
            //     bordered={false}
            //     defaultActiveKey={_indexOpen}
            //     // activeKey={indexOpen}
            //     expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            //     className="site-collapse-custom-collapse"
            //   >
            //     {/* {this.createGroupCamera(MOCK, -1)} */}
            //     {
            //       listImages.map((item, key) => {
            //         return this.createGroupCamera(item, key)
            //       })
            //     }

            //   </Collapse>
            // </div>
          ]}
        />
      </div >
    ]
  }

  setupExport() {
    // alert("EXPORT DETAIL")
    let { detailTrip, listMembers, chassisNo, option_temperature } = this.props
    // console.log('listMembers', listMembers, vin_no[0])
    // console.log('detailTrip', detailTrip)

    let data = JSON.parse(JSON.stringify(detailTrip))
    let text = [
      t('history_91'), ' : ', (chassisNo || "-"), ', ',
      t('history_92'), ' : '
    ]
    let file_name = "Detail_of_" + chassisNo + "_"
    if (data.length > 0) {
      let start_date = moment(get(data, '[0][0]'), 'YYYY-MM-DD HH:mm:ss')
      let end_date = moment(get(data, '[' + (data.length - 1) + '][0]'), 'YYYY-MM-DD HH:mm:ss')

      text.push(start_date.format('DD/MM/YYYY HH:mm:ss'), ' - ', end_date.format('DD/MM/YYYY HH:mm:ss'))
      file_name += (start_date.format('DD-MM-YYYY HH_mm_ss') + " to " + end_date.format('DD-MM-YYYY HH_mm_ss'))
    } else {
      text.push("-")
      file_name += "-"
    }
    let is_sub_table = false
    let custom_header = {
      list: [{ text, merge_cell: true, height: 30, font: { size: 12 }, alignment: { vertical: 'middle' } }]
    }
    let [json_data, column_header] = this.changeFormatJSON(data)

    // console.log('option_temperature', option_temperature)
    if (option_temperature.length > 0) {
      is_sub_table = true
      custom_header.list.push({ text: [t('history_44')], index_cell: 25, merge_cell: [25, 24 + option_temperature.length], font: { bold: true }, alignment: { horizontal: 'center' } })
    }


    let lst_cus_footer = [
      { index_row: 1, index_cell: 1, font: { bold: true }, text: [t("other_reports_120")] },
      { index_row: 2, index_cell: 1, font: { bold: true }, text: [t("other_reports_121")] }
    ]
    let sum = ['total_fuel', 'distance']
    let avg = ['speed', 'total_fuel']
    for (let i in column_header) {
      let key = get(column_header[i], 'key')
      if (sum.includes(key)) {
        let textSum = getSum(json_data.map((item) => item[key]))
        lst_cus_footer.push({ text: textSum, index_row: 1, index_cell: key, font: { bold: true }, alignment: { horizontal: 'right' } })
      }
      else lst_cus_footer.push({ text: "-", index_row: 1, index_cell: key, font: { bold: true }, alignment: { horizontal: 'center' } })
      if (avg.includes(key)) {
        let decimal = key === 'speed' ? 0 : 2
        let textAvg = getAvg(json_data.map((item) => item[key]), decimal)
        lst_cus_footer.push({ text: textAvg, index_row: 2, index_cell: key, font: { bold: true }, alignment: { horizontal: 'right' } })
      }
      else lst_cus_footer.push({ text: "-", index_row: 2, index_cell: key, font: { bold: true }, alignment: { horizontal: 'center' } })
      // console.log('key', key)
    }
    column_header.unshift('')

    let custom_footer = { list: lst_cus_footer }

    // console.log('column_header', column_header)

    exportExcel({ column_header, json_data, custom_header, file_name, custom_footer, is_sub_table })
    // let fileName = "Detail_of_" + (info.vehicle_name || "-") +
    //   "_" + (info.license_plate_no || "-") + "_" + (info.vin_no || "-") +
    //   "_" + moment(dateStart, 'DD/MM/YYYY HH:mm').format('DD-MM-YYYY HH_mm') +
    //   " to " + moment(dateEnd, 'DD/MM/YYYY HH:mm').format('DD-MM-YYYY HH_mm')
    // let font = { size: 12 }, alignment = { vertical: 'middle' }
    // let text = [
    //   'ทะเบียนรถ', ' : ', (info.license_plate_no || "-"), ', ',
    //   'ชื่อรถ', ' : ', (info.vehicle_name || "-"), ', ',
    //   'ตัวเลขถัง', ' : ', (info.vin_no || "-"), ', ',
    //   'ช่วงวัน - เวลา', ' : ', dateStart, ' - ', dateEnd
    // ]
    // let workbook = new ExcelJS.Workbook();
    // let worksheet = workbook.addWorksheet('Detail');

    // let data = JSON.parse(JSON.stringify(this.props.detailTrip))
  }

  changeFormatJSON(dataJson, license_plate_no) {
    let newData, header

    let { option_temperature } = this.props

    newData = dataJson.map((item, i) => {
      let obj = {
        date_time: item[0],
        status: this.statusName(item[4]),
        sub_district: item[10],
        district: item[9],
        province: item[8],
        lat_lng: item[2] + ", " + item[3],
        // speed: item[4],
        rpm: item[5],
        brake: item[18],
        exhaust_brake: item[19],
        eg_check_lamp: item[21],
        clutch: item[20],
        per_fuel: item[16],
        total_fuel: item[24],
        // distance: item[23],
        cool_temp: item[14],
        // thro_degree: item[17],
        // harsh_start: item[25],
        // harsh_acc: item[11],
        // sharp_turn: item[13],
        // harsh_brake: item[12],
        gps: item[26],
        geof: item[29],
        pto: item[33],
      }
      if (option_temperature.length > 0) option_temperature.forEach((value, idx) => {
        obj['temp_' + idx] = item[32][idx][2]
      });
      return obj
    })
    header = [
      { key: "date_time", text: t("history_66") },
      { key: "status", text: t("history_67") },
      { key: "sub_district", text: t("history_68") },
      { key: "district", text: t("history_69") },
      { key: "province", text: t("history_70") },
      { key: "lat_lng", text: t("history_71") },
      // { key: "speed", text: t("history_72") },
      { key: "rpm", text: t("history_73") },
      // { key: "brake", text: t("history_74") },
      // { key: "exhaust_brake", text: t("history_75") },
      { key: "eg_check_lamp", text: t("history_76") },
      // { key: "clutch", text: t("history_77") },
      { key: "per_fuel", text: t("history_78") },
      // { key: "total_fuel", text: t("history_79") },
      // { key: "distance", text: t("history_80") },
      { key: "cool_temp", text: t("history_81") },
      // { key: "thro_degree", text: t("history_82") },
      // { key: "harsh_start", text: t("history_83") },
      // { key: "harsh_acc", text: t("history_84") },
      // { key: "sharp_turn", text: t("history_85") },
      // { key: "harsh_brake", text: t("history_86") },
      { key: "gps", text: t("history_87") },
      // { key: "geof", text: t("history_88") }
      { key: "pto", text: t("history_122") }
    ]

    if (option_temperature.length > 0) option_temperature.forEach((value, idx) => {
      header.push({ key: ('temp_' + idx), text: value.name, sub: true })
    });

    return [newData, header]
  }

  rTT(reactSymbol) {
    if (reactSymbol.type === mySuspense) reactSymbol = reactSymbol.props.children
    let str = renderToString(reactSymbol)
    str = str.replace('<div data-reactroot="">', '').replace(/<\/div>/g, '')
      .replace('<span data-reactroot="">', '').replace(/<\/span>/g, '').replace(/<!-- -->/g, '')
    return str
  }

  statusName(speed) {
    let { language, speed_limit } = this.props
    let name = ''

    if (speed_limit > 0 && speed > speed_limit) name = language == "en" ? 'Over Speed' : 'ความเร็วเกิน 60 กม./ชม.'
    else if (speed <= 2) name = language == "en" ? 'Idling' : 'จอดไม่ดับเครื่อง'
    else name = language == "en" ? 'Driving' : 'วิ่ง'

    return name
  }
}

const mapStateToProps = (state) => ({
  // dataLogin: state.signin.dataLogin,
  dataTrips: state.trackingHistory.dataTrips,
  indexTripSelected: state.trackingHistory.indexTripSelected,
  event_id_list: state.trackingHistory.event_id_list,
  detailTrip: state.trackingHistory.detailTrip,
  speed_limit: state.trackingHistory.speed_limit,
  language: state.versatile.language,
  listMembers: state.trackingHistory.listMembers,
  vin_no: state.trackingHistory.vin_no,
  listImages: state.trackingHistory.listImages,
  indexOpen: state.trackingHistory.indexOpen,
  subRootTrip: state.trackingHistory.subRootTrip,
  vehicleNameDisplay: state.trackingHistory.vehicleNameDisplay,
  option_temperature: state.trackingHistory.option_temperature,
  chassisNo: state.trackingHistory.chassisNo
});
const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(TrackingHistoryActions.setValue(name, value)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OverlayPanel))

import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import OtherReportActions from '../../Redux/OtherReportRedux'
import Table from '../../Components/DataGridView/Table.js'
import PannelBox from '../../Components/PannelBox'
import { t } from '../../Components/Translation'
import { getColumnDetail } from './ColumnConfig'
import { get, isEmpty } from 'lodash'
import Alert from '../../Components/Alert'
import moment from 'moment';
import { calculateToDuration } from '../../Functions/DateMoment'
import { sum, max, avg, calFuelCons, nameColReport } from './Calculation'

class ReportDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vehicle: [],
      reportId: [""],
      fleetId: [""],
      masterData: [],
      alertSetting: {
        show: true,
        type: 5
      },
      dataDetail: []
    }
  }

  componentWillMount() {
    let { detailData } = this.props
    if (!isEmpty(detailData)) {
      let { alertSetting } = this.state
      alertSetting.show = false
      this.footerCustom = { list: this.setfooterCustom() }
      this.footerSummary = { hideCount: true, objSum: this.setFooterSummary() }
      this.setState({ dataDetail: detailData, alertSetting })
    } else {
      this.loadDetailData()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let { detailData, loadDetailStatus } = this.props

    if (prevProps.detailData !== detailData) {
      this.footerCustom = { list: this.setfooterCustom() }
      this.footerSummary = { hideCount: true, objSum: this.setFooterSummary() }
      this.setState({ dataDetail: detailData })
    }
    if (prevProps.loadDetailStatus !== loadDetailStatus) {
      if (loadDetailStatus) this.setAlertSetting(true)
      else this.setAlertSetting(false)
    }
  }

  setfooterCustom() {
    let { reportSelected, detailData } = this.props
    let objSum, sumFuel, sumDis

    let array = nameColReport(reportSelected, detailData)

    return array

  }

  setFooterSummary() {
    let { reportSelected, detailData } = this.props
    let objSum, sumFuel, sumDis

    nameColReport(reportSelected, detailData)

    switch (reportSelected) {
      case "202":
        objSum = {
          'total_time': {
            text: [calculateToDuration(sum(detailData.map((item) => item.total_time)), 'hideSec')],
            font: { bold: true }, alignment: { horizontal: 'right' }
          },
          'fuel_used': { text: sum(detailData.map((item) => item.fuel_used), 2), font: { bold: true } },
          'co2': { text: sum(detailData.map((item) => item.co2)), font: { bold: true } }
        }
        break;
      case "203":
        objSum = {
          'total_time': {
            text: [calculateToDuration(sum(detailData.map((item) => item.total_time)), 'hideSec')],
            font: { bold: true }, alignment: { horizontal: 'right' }
          }
        }
        break;
      case "401":
        sumFuel = sum(detailData.map((item) => item.fuel_used), 2)
        sumDis = sum(detailData.map((item) => item.distance))
        objSum = {
          'over_speed_count': { text: sum(detailData.map((item) => item.over_speed_count)), font: { bold: true } },
          'speed_avg': { text: avg(detailData.map((item) => item.speed_avg), 2), font: { bold: true } },
          'speed_max': { text: max(detailData.map((item) => item.speed_max)), font: { bold: true } },
          'over_speed_time': {
            text: [calculateToDuration(sum(detailData.map((item) => item.over_speed_time)), 'hideSec')],
            font: { bold: true }, alignment: { horizontal: 'right' }
          },
          'travel_time': {
            text: [calculateToDuration(sum(detailData.map((item) => item.travel_time)), 'hideSec')],
            font: { bold: true }, alignment: { horizontal: 'right' }
          },
          'fuel_used': { text: sumFuel, font: { bold: true } },
          'fuel_cons': { text: calFuelCons(sumDis, sumFuel), font: { bold: true } },
          'distance': { text: sumDis, font: { bold: true } },
          'over_speed_60_count': { text: sum(detailData.map((item) => item.over_speed_60_count)), font: { bold: true } },
          'over_speed_80_count': { text: sum(detailData.map((item) => item.over_speed_80_count)), font: { bold: true } },
          'over_speed_100_count': { text: sum(detailData.map((item) => item.over_speed_100_count)), font: { bold: true } },
          'over_speed_120_count': { text: sum(detailData.map((item) => item.over_speed_120_count)), font: { bold: true } },
        }
        break;
      case "101": case "201": case "301": case "302": case "303": case "304": case "305": case "306":
        sumDis = sum(detailData.map((item) => item.total_distance))
        sumFuel = sum(detailData.map((item) => item.fuel_used), 2)
        objSum = {
          'total_distance': { text: sumDis, font: { bold: true } },
          'total_time': {
            text: [calculateToDuration(sum(detailData.map((item) => item.total_time)), 'hideSec')],
            font: { bold: true }, alignment: { horizontal: 'right' }
          },
          'fuel_cons': { text: calFuelCons(sumDis, sumFuel), font: { bold: true } },
          'fuel_used': { text: sumFuel, font: { bold: true } },
          'speed_max': { text: max(detailData.map((item) => item.speed_max)), font: { bold: true } },
          'speed_avg': { text: avg(detailData.map((item) => item.speed_avg)), font: { bold: true } },
        }
        break;
    }

    return objSum
  }

  setAlertSetting(isShow) {
    let { alertSetting } = this.state
    alertSetting.show = isShow
    this.setState({ alertSetting })
  }

  convertDate(date) {
    var start_date = date
    var start_date_y = start_date.split('/')[0]
    var start_date_m = start_date.split('/')[1]
    var start_date_d = start_date.split('/')[2]
    return start_date_y + '-' + start_date_m + '-' + start_date_d
  }

  //#region Load Detail
  loadDetailData() {
    let { reportSelected, dateStart, dateEnd, detailSelected, overtime, group } = this.props
    let _dateStart = dateStart
    let _dateEnd = dateEnd
    let body = {
      dtstart: _dateStart,
      dtstop: _dateEnd
    }
    if (group) body.group = true


    if (reportSelected == "201" || reportSelected == "202" || reportSelected == "203") body.overtime = (overtime * 60)

    switch (reportSelected) {
      case "101":
        this.props.getDetailData(body, "fleet/report/driving/" + detailSelected)
        break;
      case "201":
        this.props.getDetailData(body, "fleet/report/overspeed/" + detailSelected)
        break;
      case "202":
        this.props.getDetailData(body, "fleet/report/overidling/" + detailSelected)
        break;
      case "203":
        this.props.getDetailData(body, "fleet/report/overparking/" + detailSelected)
        break;
      case "301":
        this.props.getDetailData(body, "fleet/report/dlt/overspeed/" + detailSelected)
        break;
      case "302":
        this.props.getDetailData(body, "fleet/report/dlt/over4hour/" + detailSelected)
        break;
      case "303":
        this.props.getDetailData(body, "fleet/report/dlt/over8hour/" + detailSelected)
        break;
      case "304":
        this.props.getDetailData(body, "fleet/report/dlt/unknowndriver/" + detailSelected)
        break;
      case "305":
        this.props.getDetailData(body, "fleet/report/dlt/wrongtype/" + detailSelected)
        break;
      case "306":
        this.props.getDetailData(body, "fleet/report/dlt/rejectgps/" + detailSelected)
        break;
      case "401":
        this.props.getDetailData(body, "fleet/report/geofence/driving/" + detailSelected)
        break;
    }

  }
  //#endregion

  render() {
    let { alertSetting, dataDetail } = this.state
    let { header, dataLogin, reportSelected, reportName, nameDetail, dateStart, dateEnd, headerDetail } = this.props

    let textHeader = [
      t('export_3'), ' : ', get(headerDetail, 'nameFleet', '-'), ', ',
      t('export_6'), ' : ', get(headerDetail, 'licenseplate', '-'), ', ',
      t('export_4'), ' : ', moment(dateStart, "YYYY/MM/DD HH:mm:ss").format("DD/MM/YYYY HH:mm"), ' ', t('export_5'), ' ', moment(dateEnd, "YYYY/MM/DD HH:mm:ss").format("DD/MM/YYYY HH:mm")
    ]
    let headerCustom = {
      list: [
        { text: textHeader, merge_cell: true, font: { size: 12 }, alignment: { vertical: 'middle' }, height: 30 },
      ]
    }
    let lstName = [], strName = ''
    if (get(headerDetail, 'vehicleName')) lstName.push(get(headerDetail, 'vehicleName'))
    if (get(headerDetail, 'licenseplate')) lstName.push(get(headerDetail, 'licenseplate'))
    strName = lstName.join('_')
    let exportName = [
      reportSelected, ' - ', t('export_7'), ' ', strName, ' ',
      moment(dateStart, "YYYY/MM/DD HH:mm:ss").format("DD-MM-YYYY HH_mm"), ' ', t('export_5'), ' ', moment(dateEnd, "YYYY/MM/DD HH:mm:ss").format("DD-MM-YYYY HH_mm")
    ]
    // console.log('exportName', exportName)
    // let exportName = reportSelected + nameDetail + moment(dateStart, "YYYY/MM/DD HH:mm:ss").format("DD-MM-YYYY HH_mm") + " to " + moment(dateEnd, "YYYY/MM/DD HH:mm:ss").format("DD-MM-YYYY HH_mm")

    return <Suspense fallback={null}>
      {
        alertSetting.show ? <Alert
          setting={alertSetting}
        /> :
          <PannelBox
            title={t(reportName)}
            toolBox={
              <div className="ibox-tools">
                <button
                  onClick={() => {
                    this.props.setStateReduxOtherReport({ detailData: [], detailSelected: "" })
                    this.props.history.push("/OtherReportNew/Summary")
                  }}
                  className="btn"
                  style={{ backgroundColor: 'gray', color: 'white', marginTop: -5, marginBottom: 5, marginRight: 6 }}>
                  <i className="fa fa-chevron-circle-left" aria-hidden="true" /> {t('other_reports_24')}
                </button>
              </div>
            }
          >
            <Table
              mode={"offline"}
              dataSource={[...dataDetail]}
              headerCustom={headerCustom}
              topLeftSpace={{ left: 1 }}
              exportToPDFVisible={true}
              cookiesOptions={{
                enable: true,
                name: "ReportDetail_" + reportSelected
              }}
              footerCustom={this.footerCustom}
              // footerSummary={false}
              footerSummary={{ deleteRow: true }}
              // footerSummary={this.footerSummary}
              author={header.idToken}
              xAPIKey={header.redisKey}
              table_id={6}
              exportName={exportName}
              user_id={dataLogin.userId}
              showSetting={false}
              searchPanel={true}
              autoExpandAll={false}
              remoteOperations={false}
              editing={{ enabled: false }}
              columnCount="dtstart"
              column={getColumnDetail(reportSelected)}
            />
          </PannelBox>
      }
    </Suspense>
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  detailData: state.otherReport.detailData,
  detailSelected: state.otherReport.detailSelected,
  dateStart: state.otherReport.dateStart,
  dateEnd: state.otherReport.dateEnd,
  reportSelected: state.otherReport.reportSelected,
  reportName: state.otherReport.reportName,
  nameDetail: state.otherReport.nameDetail,
  headerDetail: state.otherReport.headerDetail,
  loadDetailStatus: state.otherReport.loadDetailStatus,
  group: state.otherReport.group,
  overtime: state.otherReport.overtime
});

const mapDispatchToProps = (dispatch) => ({
  getDetailData: (body, url) => dispatch(OtherReportActions.getDetailData(body, url)),
  setStateReduxOtherReport: (objState) => dispatch(OtherReportActions.setStateReduxOtherReport(objState))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetail)

import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import OtherReportActions from '../../Redux/OtherReportRedux'
import PannelBox from '../../Components/PannelBox'
import FormSelectGroup from '../../Components/FormControls/Basic/FormSelectGroup'
import { t } from '../../Components/Translation'
import { getColumnSummary } from './ColumnConfig'
import HeaderSummary from './HeaderSummary'
import LoadingPercent from './LoadingPercent'
import UpdateMasterData from './UpdateMasterData'
import TableStore from './TableStore'
import moment from 'moment';
import { get, isEmpty } from 'lodash';

class ReportSummary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vehicle: [],
      reportId: [""],
      fleetId: [""],
      masterData: [],
      ColumnConfig: []
    }
    this.isFirstLoad = true
  }

  componentWillUnmount() {
    // this.props.setMasterDataTemp(this.state.masterData)
    // this.props.setDetailData([])
  }

  componentDidUpdate(prevProps, prevState) {
    let {
      reportSelected, masterData, summaryData, dataLogin, fleetSelected, vehicleSelected, dateStart, dateEnd, overtime
    } = this.props

    if (prevProps.reportSelected !== reportSelected) {
      this.setState({ ColumnConfig: getColumnSummary(reportSelected) })
      // this.props.setValue("ColumnConfig", getColumnSummary(reportSelected))
      this.loadMasterData()
    }

    //#region  Set Master Data
    if (prevProps.masterData !== masterData) {
      if (masterData.length > 0 && this.isFirstLoad) {
        this.isFirstLoad = false
        let _dateStart = dateStart
        let _dateEnd = dateEnd
        for (let index in vehicleSelected) {
          let vid = vehicleSelected[index].int_vehicle_id
          var object = {
            vid_list: [vid],
            dtstart: _dateStart,
            dtstop: _dateEnd,
            fleet_id: fleetSelected[0] || "",
            user_id: dataLogin.userId
          }

          if (reportSelected === "201" || reportSelected === "202" || reportSelected === "203") object.overtime = (overtime * 60)
          this.loadSummaryData(object)
          // console.log("LOAD SUMMARY : ", object)
        }
      }
    }
    //#endregion
  }

  componentWillMount() {
    this.setDefault()
    this.setState({ ColumnConfig: getColumnSummary(this.props.reportSelected) })
    // this.props.setValue("ColumnConfig", getColumnSummary(this.props.reportSelected))
    if (this.props.masterDataTemp && this.props.masterDataTemp.length > 0) this.props.setMasterData(this.props.masterDataTemp)
    else this.loadMasterData()
  }

  setDefault() {
    let { reportMenu } = this.props
    if (reportMenu.length > 0) this.setState({ reportId: this.props.reportSelected })
  }

  convertDate(date) {
    var start_date = date
    var start_date_y = start_date.split('/')[0]
    var start_date_m = start_date.split('/')[1]
    var start_date_d = start_date.split('/')[2]
    return start_date_y + '-' + start_date_m + '-' + start_date_d
  }

  //#region Load Master
  loadMasterData() {
    let { reportSelected, vehicleSelected, fleetSelected, dateStart, dateEnd, dataLogin, overtime } = this.props
    let _dateStart = dateStart
    let _dateEnd = dateEnd
    let vidList = []
    vehicleSelected.forEach((element) => {
      vidList.push(element.int_vehicle_id)
    })

    let body = {
      vid_list: vidList,
      dtstart: _dateStart,
      dtstop: _dateEnd,
      fleet_id: fleetSelected[0] || "",
      user_id: dataLogin.userId
    }

    if (reportSelected === "201" || reportSelected === "202" || reportSelected === "203") body.overtime = (overtime * 60)

    switch (reportSelected) {
      case "101":
        this.props.getMasterData(body, "fleet/report/master/driving")
        break;
      case "201":
        this.props.getMasterData(body, "fleet/report/master/overspeed")
        break;
      case "202":
        this.props.getMasterData(body, "fleet/report/master/overidling")
        break;
      case "203":
        this.props.getMasterData(body, "fleet/report/master/overparking")
        break;
      case "301":
        this.props.getMasterData(body, "fleet/report/master/dlt/overspeed")
        break;
      case "302":
        this.props.getMasterData(body, "fleet/report/master/dlt/over4hour")
        break;
      case "303":
        this.props.getMasterData(body, "fleet/report/master/dlt/over8hour")
        break;
      case "304":
        this.props.getMasterData(body, "fleet/report/master/dlt/unknowndriver")
        break;
      case "305":
        this.props.getMasterData(body, "fleet/report/master/dlt/wrongtype")
        break;
      case "306":
        this.props.getMasterData(body, "fleet/report/master/dlt/rejectgps")
        break;
      case "401":
        this.props.getMasterData(body, "fleet/report/master/geofence/driving")
        break;
      case "402":
        this.props.getMasterData(body, "fleet/report/master/insurance")
        break;
    }
  }
  //#endregion

  //#region Load Summary
  loadSummaryData(body) {
    switch (this.props.reportSelected) {
      case "101":
        this.props.getSummaryData(body, "fleet/report/driving")
        break;
      case "201":
        this.props.getSummaryData(body, "fleet/report/overspeed")
        break;
      case "202":
        this.props.getSummaryData(body, "fleet/report/overidling")
        break;
      case "203":
        this.props.getSummaryData(body, "fleet/report/overparking")
        break;
      case "301":
        this.props.getSummaryData(body, "fleet/report/dlt/overspeed")
        break;
      case "302":
        this.props.getSummaryData(body, "fleet/report/dlt/over4hour")
        break;
      case "303":
        this.props.getSummaryData(body, "fleet/report/dlt/over8hour")
        break;
      case "304":
        this.props.getSummaryData(body, "fleet/report/dlt/unknowndriver")
        break;
      case "305":
        this.props.getSummaryData(body, "fleet/report/dlt/wrongtype")
        break;
      case "306":
        this.props.getSummaryData(body, "fleet/report/dlt/rejectgps")
        break;
      case "401":
        this.props.getSummaryData(body, "fleet/report/geofence/driving")
        break;
      case "402":
        this.props.getSummaryData(body, "fleet/report/insurance")
        break;
    }
  }
  //#endregion

  render() {
    let { ColumnConfig } = this.state
    let { reportMenu, reportName, reportSelected, dateStart, dateEnd, fleets, fleetSelected } = this.props
    let exportName = [t(reportName), ' ', moment(dateStart, "YYYY/MM/DD HH:mm:ss").format("DD-MM-YYYY HH_mm"), ' ', t('export_5'), ' ', moment(dateEnd, "YYYY/MM/DD HH:mm:ss").format("DD-MM-YYYY HH_mm")]

    let nameFleet = get(fleets.find((item) => item.key == fleetSelected), 'value', '')
    let textHeader = [t('export_3'), ' : ', nameFleet, ', ', t('export_4'), ' : ', moment(dateStart, "YYYY/MM/DD HH:mm:ss").format("DD/MM/YYYY HH:mm"), ' ', t('export_5'), ' ', moment(dateEnd, "YYYY/MM/DD HH:mm:ss").format("DD/MM/YYYY HH:mm")]
    if (reportSelected === "402") textHeader.splice(0, 4)

    return <Suspense fallback={null}>
      <HeaderSummary boxid={100} onClick={() => {
        this.props.setMasterDataTemp(null)
        this.props.history.push("/OtherReportNew")
      }} >
        <FormSelectGroup
          mode={"single"}
          value={this.state.reportId}
          label={"other_reports_3"}
          list={reportMenu}
          placeholder={""}
          flex={1}
          showLabel={true}
          onChange={(selected) => {
            if (selected !== undefined) {
              this.isFirstLoad = true
              this.setState({ reportId: selected })
              this.props.setDataSummary([])
              // this.props.setMasterData([])
              // this.props.setMasterDataTemp([])
              this.props.setReportSelected(selected)
            }
          }}
        />
      </HeaderSummary>
      <PannelBox
        title={t(reportName)}
      >
        <LoadingPercent />
        <UpdateMasterData />
        <TableStore
          reportSelected={reportSelected}
          column={ColumnConfig}
          exportName={exportName}
          cookiesOptions={{
            enable: true,
            name: "ReportSummary_" + reportSelected
          }}
          headerCustom={{
            list: [
              { text: textHeader, merge_cell: true, font: { size: 12 }, alignment: { vertical: 'middle' }, height: 30 },
            ]
          }}
          columnCount="fleet_name"
          footerSummary={{
            hideCount: true
          }}
          onClickButton={(e) => {
            let headerDetail = { nameFleet, vehicleName: get(e, 'row.data.vehicle_name'), licenseplate: get(e, 'row.data.licenseplate') }
            this.props.setDetailSelected(e.row.data.vid, headerDetail)
            this.props.history.push("/OtherReportNew/Detail")
          }}
          onClickButtonGroup={(e) => {
            let headerDetail = { nameFleet, vehicleName: get(e, 'row.data.vehicle_name'), licenseplate: get(e, 'row.data.licenseplate') }
            this.props.setDetailSelected(e.row.data.vid, headerDetail, true)
            this.props.history.push("/OtherReportNew/Detail")
          }}
        />
      </PannelBox>
    </Suspense>
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  reportMenu: state.otherReport.reportMenu,
  reportSelected: state.otherReport.reportSelected,
  vehicleSelected: state.otherReport.vehicleSelected,
  fleetSelected: state.otherReport.fleetSelected,
  dateStart: state.otherReport.dateStart,
  dateEnd: state.otherReport.dateEnd,
  overtime: state.otherReport.overtime,
  masterData: state.otherReport.masterData,
  reportName: state.otherReport.reportName,
  masterDataTemp: state.otherReport.masterDataTemp,
  fleets: state.otherReport.fleets,
});

const mapDispatchToProps = (dispatch) => ({
  getMasterData: (body, url) => dispatch(OtherReportActions.getMasterData(body, url)),
  getSummaryData: (body, url) => dispatch(OtherReportActions.getSummaryData(body, url)),
  getDetailData: (body, url) => dispatch(OtherReportActions.getDetailData(body, url)),
  setReportSelected: (reportId) => dispatch(OtherReportActions.setReportSelected(reportId)),
  setMasterData: (data) => dispatch(OtherReportActions.setMasterData(data)),
  setDetailSelected: (vid, headerDetail, group) => dispatch(OtherReportActions.setDetailSelected(vid, headerDetail, group)),
  setPercent: (percent) => dispatch(OtherReportActions.setPercent(percent)),
  setMasterDataTemp: (data) => dispatch(OtherReportActions.setMasterDataTemp(data)),
  setDetailData: (data) => dispatch(OtherReportActions.setDetailData(data)),
  setDataSummary: (data) => dispatch(OtherReportActions.setDataSummary(data)),
  setValue: (name, value) => dispatch(OtherReportActions.setValue(name, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportSummary)

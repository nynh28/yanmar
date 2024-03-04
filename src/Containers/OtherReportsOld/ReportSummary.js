import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import OtherReportActions from '../../Redux/OtherReportRedux'
import PannelBox from '../../Components/PannelBox'
import FormSelectGroup from '../../Components/FormControls/Basic/FormSelectGroup'
import { t } from '../../Components/Translation'
import { getColumnSummary, getUrlMaster, getUrlSummary } from './ColumnConfig'
import HeaderSummary from './HeaderSummary'
import LoadingPercent from './LoadingPercent'
import moment from 'moment';
import { get } from 'lodash';
import { ENDPOINT_BASE_URL } from '../../Config/app-config';
import Table from '../../Components/DataGridView/Table.js'
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import TableReport402 from './TableReport402'

export const dataStore = new ArrayStore({ key: 'vid', data: [] });
var dataSource

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
    this.dataMaster = []
    this.totalSuccess = 0
    this.controller = []
    dataSource = new DataSource({
      store: dataStore,
      reshapeOnPush: true
    });
  }

  componentWillMount() {
    this.setDefault()
  }

  componentWillUnmount() {
    this.cancleFetchApi()
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { reportSelected } = this.props

    if (nextProps.reportSelected !== reportSelected) {
      dataStore.clear()
      dataSource.reload()
      this.loadData(nextProps.reportSelected)

      return true
    }
    return true
  }

  setDefault() {
    let { reportMenu, masterDataTemp, reportSelected } = this.props
    if (reportMenu.length > 0) this.setState({ reportId: reportSelected })

    if (masterDataTemp && masterDataTemp.length > 0) {
      this.setDataStore(masterDataTemp)
    }
    else
      this.loadData(reportSelected)
  }

  async loadData(reportSelected) {
    let { vehicleSelected, fleetSelected, dateStart, dateEnd, dataLogin, overtime } = this.props
    let vidList = []

    vehicleSelected.forEach((element) => {
      vidList.push(element.int_vehicle_id)
    })

    let body = {
      vid_list: vidList,
      dtstart: dateStart,
      dtstop: dateEnd,
      fleet_id: fleetSelected[0] || "",
      user_id: dataLogin.userId
    }

    if (["201", "202", "203"].includes(reportSelected)) body.overtime = (overtime * 60)

    let urlMaster = getUrlMaster(reportSelected)
    let urlSummary = getUrlSummary(reportSelected)

    let dataMaster = await this.getDataMaster(urlMaster, body)
    this.dataMaster = dataMaster

    //#region
    let isSuccess = false, rangeIndex = { min: 0, max: 20 }, nextRange = 20, countSuccess = 0, total = dataMaster.length
    do {
      let listAPI = []
      let countLast = nextRange
      for (let index = rangeIndex.min; index < rangeIndex.max; index++) {
        if (index < total) {
          let body = {
            vid_list: [dataMaster[index].vid],
            dtstart: dateStart,
            dtstop: dateEnd,
            fleet_id: fleetSelected[0] || "",
            user_id: dataLogin.userId
          }

          if (["201", "202", "203"].includes(reportSelected)) body.overtime = (overtime * 60)

          listAPI.push({
            url: urlSummary,
            body: body,
            vid: dataMaster[index].vid
          })
        }
        else {
          countLast--
        }
      }
      await this.fetchPromiseAll(listAPI, total)

      countSuccess += countLast
      let nextRage = { min: (rangeIndex.min + nextRange), max: (rangeIndex.max + nextRange) }
      rangeIndex = nextRage

      if (countSuccess === total) isSuccess = true

    } while (!isSuccess);

    setTimeout(() => {
      this.props.setValueOtherReport("masterDataTemp", dataStore._array)
    }, 1000);

    //#endregion
  }

  async fetchPromiseAll(listAPI, total) {
    // const promises = listAPI.map(async (dt) => {
    //   await this.getDataSummary(dt.url, dt.body, dt.vid, total)
    // })
    const promises = listAPI.map(async (dt) => {
      let isSuccess = true
      isSuccess = await this.getDataSummary(dt.url, dt.body, dt.vid, total)

      while (!isSuccess) {
        await this.fetchPromiseAll([{
          url: dt.url,
          body: dt.body,
          vid: dt.vid
        }], total)
        isSuccess = true
      }
    })
    await Promise.all(promises)
  }

  setDataStore(data) {
    data.forEach(item => {
      dataStore.push([{
        type: 'insert',
        data: item
      }]);
    });
  }

  async getDataMaster(url, body) {
    let result = []
    this.totalSuccess = 0
    dataStore.clear()
    dataSource.reload()
    this.props.setPercent(0)

    try {
      const controller = new AbortController();
      let signal = controller.signal;
      let response = await fetch(ENDPOINT_BASE_URL + url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'accept-language': this.props.language
        },
        body: JSON.stringify(body),
        signal
      });

      var resp = await response.json();

      if (resp.message == "ok") {
        this.setDataStore(resp.result)
        result = [...resp.result]
      }
    } catch {
    }
    return result
  }

  async getDataSummary(url, body, vid, total) {
    let isSuccess = false
    try {
      const controller = new AbortController();
      let signal = controller.signal;
      this.controller.push(controller)

      let response = await fetch(ENDPOINT_BASE_URL + url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'accept-language': this.props.language
        },
        body: JSON.stringify(body),
        signal
      });

      var resp = await response.json();

      if (resp.message == "ok") {
        this.totalSuccess++
        let percent = parseInt((this.totalSuccess / total) * 100)
        this.props.setPercent(percent)
        this.updateDataStore(vid, resp.result[0])
        isSuccess = true
      }
      else {
        isSuccess = false
      }
    } catch {
      isSuccess = false
    }
    return isSuccess
  }

  cancleFetchApi() {
    this.controller.forEach(controller => {
      if (!controller.signal.aborted) controller.abort()
    });
  }

  updateDataStore(vid, data) {
    let { reportSelected } = this.props

    if (get(data, 'vid')) {
      let dataUpdate = data

      if (reportSelected === '402') {// ให้ runing vin_no ใหม่
        let obj = this.dataMaster.find((item) => item.vid === data.vid)
        dataUpdate.vin_no = obj.vin_no
      }

      dataStore.push([{
        type: 'update',
        key: vid,
        data: { ...dataUpdate }
      }])

      dataSource.reload()
    }
  }

  render() {
    let { ColumnConfig } = this.state
    let { reportMenu, reportName, reportSelected, dateStart, dateEnd, fleets, fleetSelected, language } = this.props
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
              // this.props.setDataSummary([])
              this.props.setReportSelected(selected)
            }
          }}
        />
      </HeaderSummary>
      <PannelBox
        title={t(reportName)}
      >
        <LoadingPercent />
        {
          reportSelected === "402" ?
            <TableReport402
              dataSource={dataSource}
              exportName={exportName}
              reportSelected={reportSelected}
              column={getColumnSummary(reportSelected)}
              textHeader={textHeader}
            /> :

            <Table
              mode={"offline"}
              dataSource={dataSource}
              exportName={exportName}
              table_id={6}
              user_id={this.props.dataLogin.userId}
              exportToPDFVisible={true}
              editing={{
                enabled: reportSelected === "402" ? false : true
              }}
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
              customButton={[
                {
                  hint: language == "th" ? "รายละเอียด" : "Detail",
                  icon: "file",
                  visible: true,
                  onClick: (e) => {
                    let headerDetail = { nameFleet, vehicleName: get(e, 'row.data.vehicle_name'), licenseplate: get(e, 'row.data.licenseplate') }
                    this.props.setDetailSelected(e.row.data.vid, headerDetail)
                    this.props.history.push("/OtherReportNew/Detail")
                  }
                },
                reportSelected === "101" && {
                  hint: "Group",
                  icon: "far fa-copy",
                  visible: true,
                  onClick: (e) => {
                    let headerDetail = { nameFleet, vehicleName: get(e, 'row.data.vehicle_name'), licenseplate: get(e, 'row.data.licenseplate') }
                    this.props.setDetailSelected(e.row.data.vid, headerDetail, true)
                    this.props.history.push("/OtherReportNew/Detail")
                  }
                }
              ]}
              column={getColumnSummary(reportSelected)}
            />

        }


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
  DataSummary: state.otherReport.DataSummary,
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
  setValueOtherReport: (name, value) => dispatch(OtherReportActions.setValueOtherReport(name, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportSummary)
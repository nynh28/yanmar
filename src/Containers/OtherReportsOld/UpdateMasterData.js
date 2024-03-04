import React, { Component } from 'react'
import { connect } from 'react-redux'
import OtherReportActions from '../../Redux/OtherReportRedux'
import { numberWithComma } from '../../Functions/Calculation'
import moment from 'moment'

class UpdateMasterData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      masterData: []
    }
    this.dataTemp = []
  }

  componentDidUpdate(prevProps) {
    let { masterData, summaryData, percent, reportSelected } = this.props

    if (prevProps.masterData !== masterData) {
      this.setState({ masterData })
    }

    //#region Set Summary Data
    if (prevProps.summaryData !== summaryData) {

      let _masterData = JSON.parse(JSON.stringify(this.state.masterData))
      for (let idx in _masterData) {
        let vid = _masterData[idx].vid
        if (summaryData.length > 0) {
          if (vid == summaryData[0].vid) {
            _masterData[idx] = summaryData[0]
            this.setState({ masterData: _masterData })
            this.dataTemp = _masterData
          }
        }
      }
      // this.dataTemp = this.state.masterData
    }
    // #endregion

    if (prevProps.percent !== percent) {
      if (percent == 100) {
        if (this.props.DataSummaryTemp.length > 0) {

          if (reportSelected === '402') { // ให้ runing vin_no ใหม่
            let data = [], no = 1
            for (let idx in this.dataTemp) {
              let dt = JSON.parse(JSON.stringify(this.dataTemp[idx]))
              dt.vin_no = no
              // dt.distance = numberWithComma(this.dataTemp[idx].distance)
              // dt.date_start = moment(this.dataTemp[idx].date_start).format('DD/MM/YYYY')
              // dt.date_end = moment(this.dataTemp[idx].date_end).format('DD/MM/YYYY')
              data.push(dt)
              no++
            }
            this.props.setMasterData(data)
            this.props.setMasterDataTemp(data)
          }
          else {
            this.props.setMasterData(this.dataTemp)
            this.props.setMasterDataTemp(this.dataTemp)
          }
        } else {
          this.props.setMasterDataTemp([...masterData])
        }
      }
    }
  }

  render() {
    return ""
  }
}

const mapStateToProps = (state) => ({
  masterData: state.otherReport.masterData,
  summaryData: state.otherReport.summaryData,
  percent: state.otherReport.percent,
  DataSummaryTemp: state.otherReport.DataSummaryTemp,
  reportSelected: state.otherReport.reportSelected
});

const mapDispatchToProps = (dispatch) => ({
  setMasterData: (data) => dispatch(OtherReportActions.setMasterData(data)),
  setMasterDataTemp: (data) => dispatch(OtherReportActions.setMasterDataTemp(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMasterData)
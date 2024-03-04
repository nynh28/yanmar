import React, { Component } from 'react';
import { connect } from 'react-redux'
import { t } from '../../../Components/Translation'
import { CSVLink } from "react-csv";
import { get } from 'lodash'
import { momentDate, calculateToDuration } from '../../../Functions/DateMoment'

class TripExport extends Component {

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

  exportData(dataTrip) {
    let data = [
      ["Date/Time", "Driver", "Event", "Total distance", "Duration", "Location"]
    ]

    let timeStop = ""
    for (let index in dataTrip) {
      let timeStart = momentDate(dataTrip[index][0])
      timeStop = momentDate(dataTrip[index][1])
      let name = get(dataTrip[index], '[27][2]', '-')
      let routeLength = (get(dataTrip[index], '[25]', 0) / 1000).toFixed(2) + ' km'
      let duration = calculateToDuration(get(dataTrip[index], '[26]', 0))
      let location = get(dataTrip[index], '[29][0][19]', '-') + ' ' +
        get(dataTrip[index], '[29][0][20]', '') + ' ' +
        get(dataTrip[index], '[29][0][21]', '')

      index == 0 && data.push([timeStart, "", "Start trip", "", "", ""])
      data.push([timeStart, name, this.eventName(dataTrip[index][21]), routeLength, duration, location])
    }
    timeStop !== "" && data.push([timeStop, "", "End trip", "", "", ""])

    return data
  }

  render() {
    let { dataHistory } = this.props
    let data = this.exportData(get(dataHistory, 'trips', []))
    return (<CSVLink data={data} filename={"Trip.csv"}>
      <i class="fas fa-file-csv" style={{ marginLeft: 3 }}></i><span style={{ paddingLeft: 9 }}>{t("history_7")}</span>
    </CSVLink>
    )
  }
}

const mapStateToProps = (state) => ({
  dataHistory: state.history.dataHistory
});

export default connect(mapStateToProps)(TripExport);
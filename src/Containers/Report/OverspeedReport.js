import React, { Component } from 'react';
import Table from '../../Components/Table';


class OverspeedReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      report: []
    }
    this.getReport = this.getReport.bind(this)
    //console.log(this.props.params.selectedVehicle);
    this.getReport(this.props.params.selectedVehicle);
  }
  async getReport(vehicle) {
    var value = "[";
    vehicle.forEach((element) => {
      value += "" + element.vin_no + ",";
    })
    value = value.substring(0, value.length - 1);
    value += "]";
    var object = {
      vin_no: value
    }
    var response = await fetch('https://hino-dev-api.natapol.work/dodeepapi/overspeed', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Accept": "text/html",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(object) // body data type must match "Content-Type" header
    });
    var responseJson = await response.json();
    //console.log(responseJson)
    var report = [];
    Object.keys(responseJson.data).forEach(function (item) {
      //object[item]
      report.push({
        id: item,
        licenseplate: (responseJson.data[item].licenseplate == "") ? 'no data' : responseJson.data[item].licenseplate,
        time: (responseJson.data[item].time == "") ? 'no data' : responseJson.data[item].time,
        speed_max: (responseJson.data[item].speed_max == "") ? 'no data' : responseJson.data[item].speed_max,
        count: (responseJson.data[item].count == "") ? 'no data' : responseJson.data[item].count
      })
    });
    this.setState({
      report: report,
      loading: false
    });
    // var report = [];
    // responseJson.data.forEach((element) => {
    //   report.push({
    //     id : element
    //   })
    // });
  }
  render() {
    if (this.state.loading == true) {
      return (<div></div>)
    }

    return (
      <div>
        <Table
          dataSource={this.state.report}
          mode={"offline"}
          tableId={0}
          user_id={0}
        >
        </Table>
      </div>
    );
  }
}

export default OverspeedReport;
import React, { Component } from 'react';
import { connect } from 'react-redux'
import VehicleActions, { reducer } from '../../Redux/VehicleRedux'
import {
  Col, Row, FormGroup, Label, Input
} from 'reactstrap'

import { CsvToHtmlTable } from 'react-csv-to-table';
import PannelBox from '../../Components/PannelBox'
import SaveButton from '../../Components/SaveButton'
import CancelButton from '../../Components/CancelButton'

const csv = require('csvtojson')

class ImportCSV extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      datas: [],
      data: {
        "vehicleName": "",
        "chassisNo": "",
        "vinNo": "",
        "isTemporaryLicense": true,
        "licenseDate": "",
        "licensePlate": "",
        "licensePlace": "",
        "vehicleBrand": "",
        "vehicleModel": "",
        "vehicleColor": "",
        "vehicleBodyType": "",
        "vehicleSpecCode": "",
        "vehicleType": "",
        "fuelRate": 0,
        "fuelTankSize": 0,
        "maxFuelLevelCoefficient": 0,
        "minFuelLevelCoefficient": 0,
        "speedLimit": 0,
        "cumulativeKM": 0,
        "temperatureLimit": 0,
        "isRequiredCertificate": true,
        "registerType": "",
        "vehicleTypeByLaw": "",
        "vehicleTypeByBook": "",
        "dltStatus": "",
        "tireNo": 0,
        "axleNo": 0,
        "presaleMileage": 0,
        "warrantyStartDate": "",
        "warrantyEndDate": ""
      }
    }
  }

  onClickCancel() {
    this.props.setDataCsv(null)
    this.props.history.push("VehicleForm")
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.typeForm !== this.props.typeForm) {
      console.log("typeForm : " + this.props.typeForm)
      if (this.props.typeForm === null) {
        this.props.history.push("truck")
      }
    }
  }
  onClickSubmit() {
    console.log(">>> onClickSubmit <<<")
    console.log(this.props.csvData)

    csv({
      noheader: false,
      output: "json"
    })
      .fromString(this.props.csvData)
      .then((jsonObj) => {
        // Create Data for save
        for (let item in jsonObj) {
          var keyName = Object.keys(jsonObj[item]);
          for (let propsName in jsonObj[item]) {
            // Set Form Data
            this.state.data[propsName] = jsonObj[item][propsName]

          }
          this.state.datas.push({ ...this.state.data })
        }
        this.props.addVehicle(this.state.datas)
      })
  }

  render() {
    console.log(">> Import CSV <<")
    console.log(this.props.csvData)
    const { component: Component, ...rest } = this.props
    return <PannelBox title={'Preview'} {...rest}>
      <div>
        <Row>
          <CsvToHtmlTable
            data={this.props.csvData}
            csvDelimiter=","
            tableClassName="table table-bordered  table-hover"
          />
        </Row>
        <div style={{ minHeight: '1rem' }}></div>

        <div className="hr-line-dashed" />
        <Row>
          <div className="pull-right">
            <CancelButton loading={false} onClick={() => {
              //  this.setState({ loading: true })
              // this.props.history.push("VehicleForm")
              this.onClickCancel()
            }} />

            <SaveButton loading={this.state.loading} onClick={() => {
              //   this.setState({ loading: true })
              this.onClickSubmit()
            }} />
          </div>
        </Row>
      </div>
    </PannelBox>
  }

}


const mapStateToProps = (state) => ({
  csvData: state.vehicle.csvData,
  typeForm: state.vehicle.typeForm

});
const mapDispatchToProps = (dispatch) => ({
  setDataCsv: (csvData) => dispatch(VehicleActions.setDataCsv(csvData)),
  addVehicle: (data) => dispatch(VehicleActions.addVehicle(data))


});

export default connect(mapStateToProps, mapDispatchToProps)(ImportCSV)

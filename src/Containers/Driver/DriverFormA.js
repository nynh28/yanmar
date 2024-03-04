import React, { Component } from 'react'
import { connect } from 'react-redux'
import VehicleActions, { reducer } from '../../Redux/VehicleRedux'
import FormValidateActions from '../../Redux/FormValidateRedux'

import { Col, Row, Button, Table } from 'reactstrap'

import PannelBox from '../../Components/PannelBox'
import FormGenerator from '../../Components/FormGenerator/Form'
import { formValidation } from "../../Components/FormGenerator/validate";
import { resetForm } from "../../Components/FormGenerator/resetForm";

import SaveButton from '../../Components/SaveButton'
import CancelButton from '../../Components/CancelButton'

let arrayCustomer = []

class DriverForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      titleFormType: "",
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
      },

      formInfo: {
        "title": "Vehicle Infomation",
        "showHeaderTitle": false,
        "formName": "driverInfo",
        "girdFormColumn": 2,
        "setDisabledField": true,
        // "disabledField": ['LicensePlate', 'ChassisNumber', 'Brand', 'DistanceTotal', 'GPSDeviceType', 'GPSDeviceimei', 'SiMNumber', 'AirTime', 'vehiclestutus', 'OrderingModel', 'EngineNumber'],
        "sections": [
          {
            "sectionTitle": "Driver Information",
            "fieldRow": [
              {
                "properties": {
                  "PersionalID": {
                    "type": "text",
                    "title": "Personal ID",
                    "value": "",
                    // "placeholder": "XXXXXXXXXXXX",
                    "required": true,
                  },
                  "Nickname": {
                    "type": "text",
                    "title": "Personal ID",
                    "value": "",
                    "placeholder": "Enter your's Driver's Nickname",
                  }
                }
              },
              {
                "properties": {
                  "DriverName": {
                    "type": "text",
                    "title": "Driver's Name - Last Name",
                    "value": "",
                    // "placeholder": "",
                    "required": true,
                  },
                  "PersonalCard": {
                    "type": "file",
                    "title": "Personal Card",
                    "value": "",
                    // "placeholder": "",
                    "required": true,
                  },
                }
              },
              {
                "properties": {
                  "LastUpdated": {
                    "type": "text",
                    "title": "Last Updated",
                    "value": "",
                  },
                }
              }
            ]
          },
          {
            "sectionTitle": "Current Address",
            "fieldRow": [
              {
                "properties": {
                  "HouseNo": {
                    "type": "text",
                    "title": "House No.",
                    "value": "",
                    "placeholder": "Enter your's Driver's House No"
                  },
                  "VillageNo": {
                    "type": "text",
                    "title": "Village No.",
                    "value": "",
                    "placeholder": "Enter your's Driver's  Village No."
                  },
                }
              },
              {
                "properties": {
                  "Building": {
                    "type": "text",
                    "title": "Building",
                    "value": "",
                    "placeholder": "Enter your's Driver's Building"
                  },
                  "RoomNo": {
                    "type": "text",
                    "title": "Room No.",
                    "value": "",
                    "placeholder": "Enter your's Driver's  Roon No."
                  },
                }
              },
              {
                "properties": {
                  "Soi": {
                    "type": "text",
                    "title": "Soi",
                    "value": "",
                    "placeholder": "Enter your's Driver's Soi"
                  },
                  "Road": {
                    "type": "text",
                    "title": "Road",
                    "value": "",
                    "placeholder": "Enter your's Driver's  Road"
                  },
                }
              },
              {
                "properties": {
                  "VillageName": {
                    "type": "text",
                    "title": "Village Name",
                    "value": "",
                    "placeholder": "Enter your's Driver's Village Name"
                  },
                  "SubDistrict": {
                    "type": "text",
                    "title": "Sub District",
                    "value": "",
                    "placeholder": "Enter your's Driver's  Sub District"
                  },
                }
              },
              {
                "properties": {
                  "District": {
                    "type": "text",
                    "title": "District",
                    "value": "",
                    "placeholder": "Enter your's Driver's District"
                  },
                  "Province": {
                    "type": "text",
                    "title": "Province",
                    "value": "",
                    "placeholder": "Enter your's Driver's  Province"
                  },
                }
              },
              {
                "properties": {
                  "Country": {
                    "type": "text",
                    "title": "Country",
                    "value": "",
                    "placeholder": "Enter your's Driver's Country"
                  },
                  "PostalCode": {
                    "type": "text",
                    "title": "Postal Code",
                    "value": "",
                    "placeholder": "Enter your's Driver's Postal Code",
                    "disabled": true
                  },
                }
              },
              {
                "properties": {
                  "Phone1": {
                    "type": "text",
                    "title": "Phone 1",
                    "value": "",
                    "placeholder": "Enter your's Driver's Phone Number 1"
                  },
                  "Phone2": {
                    "type": "text",
                    "title": "Phone 2",
                    "value": "",
                    "placeholder": "Enter your's Driver's Phone Number 2"
                  },
                }
              }
            ]
          },
          {
            "sectionTitle": "Current Address",
            "fieldRow": [
              {
                "properties": {
                  "SameOfficialAddress": {
                    "type": "radio",
                    "title": "Same as Official Address",
                    "required": true,
                    "radioButton": [
                      {
                        "checked": false,
                        "value": false,
                        "name": "No"
                      },
                      {
                        "checked": false,
                        "value": true,
                        "name": "Yes"
                      }
                    ]
                  }
                }
              },
              {
                "properties": {
                  "HouseNo_Current": {
                    "type": "text",
                    "title": "House No.",
                    "value": "",
                    "placeholder": "Enter your's Driver's House No"
                  },
                  "VillageNo_Current": {
                    "type": "text",
                    "title": "Village No.",
                    "value": "",
                    "placeholder": "Enter your's Driver's  Village No."
                  },
                }
              },
              {
                "properties": {
                  "Building_Current": {
                    "type": "text",
                    "title": "Building",
                    "value": "",
                    "placeholder": "Enter your's Driver's Building"
                  },
                  "RoomNo_Current": {
                    "type": "text",
                    "title": "Room No.",
                    "value": "",
                    "placeholder": "Enter your's Driver's  Roon No."
                  },
                }
              },
              {
                "properties": {
                  "Soi_Current": {
                    "type": "text",
                    "title": "Soi",
                    "value": "",
                    "placeholder": "Enter your's Driver's Soi"
                  },
                  "Road_Current": {
                    "type": "text",
                    "title": "Road",
                    "value": "",
                    "placeholder": "Enter your's Driver's  Road"
                  },
                }
              },
              {
                "properties": {
                  "VillageName_Current": {
                    "type": "text",
                    "title": "Village Name",
                    "value": "",
                    "placeholder": "Enter your's Driver's Village Name"
                  },
                  "SubDistrict_Current": {
                    "type": "text",
                    "title": "Sub District",
                    "value": "",
                    "placeholder": "Enter your's Driver's  Sub District"
                  },
                }
              },
              {
                "properties": {
                  "District_Current": {
                    "type": "text",
                    "title": "District",
                    "value": "",
                    "placeholder": "Enter your's Driver's District"
                  },
                  "Province_Current": {
                    "type": "text",
                    "title": "Province",
                    "value": "",
                    "placeholder": "Enter your's Driver's  Province"
                  },
                }
              },
              {
                "properties": {
                  "Country_Current": {
                    "type": "text",
                    "title": "Country",
                    "value": "",
                    "placeholder": "Enter your's Driver's Country"
                  },
                  "PostalCode_Current": {
                    "type": "text",
                    "title": "Postal Code",
                    "value": "",
                    "placeholder": "Enter your's Driver's Postal Code",
                    "disabled": true
                  },
                }
              },
              {
                "properties": {
                  "Phone1_Current": {
                    "type": "text",
                    "title": "Phone 1",
                    "value": "",
                    "placeholder": "Enter your's Driver's Phone Number 1"
                  },
                  "Phone2_Current": {
                    "type": "text",
                    "title": "Phone 2",
                    "value": "",
                    "placeholder": "Enter your's Driver's Phone Number 2"
                  },
                }
              }
            ]
          },
          {
            "sectionTitle": "Employee {Employee Name}",
            "fieldRow": [
              {
                "properties": {
                  "EmployeeCode": {
                    "type": "text",
                    "title": "Employee Code",
                    "value": "",
                    "placeholder": "Enter your's Employee Department Code"
                  },
                  "Upload": {
                    "type": "file",
                    "value": ""
                  }
                }
              },
              {
                "properties": {
                  "DisplayName": {
                    "type": "text",
                    "title": "Display Name",
                    "value": "",
                    "placeholder": "Enter your's Employee Display Name"
                  }
                }
              },
              {
                "properties": {
                  "Department": {
                    "type": "text",
                    "title": "Department",
                    "value": "",
                    "placeholder": "Enter your's Employee Department"
                  },
                  "Position": {
                    "type": "text",
                    "title": "Position",
                    "value": "",
                    "placeholder": "Enter your's Employee Position"
                  }
                }
              },
              {
                "properties": {
                  "StartDate": {
                    "type": "date",
                    "title": "Start Date",
                    "value": "",
                    "placeholder": "Enter your's Employee Start Date"
                  },
                  "EndDate": {
                    "type": "date",
                    "title": "End Date",
                    "value": "",
                    "placeholder": "Enter your's Employee Endt Date"
                  }
                }
              },
              {
                "properties": {
                  "Active": {
                    "type": "radio",
                    "title": "Active",
                    "required": true,
                    "radioButton": [
                      {
                        "checked": false,
                        "value": false,
                        "name": "No"
                      },
                      {
                        "checked": false,
                        "value": true,
                        "name": "Yes"
                      }
                    ]
                  }
                }
              }
            ]
          }
        ],
      },
      isUpload: null
    }
    this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount() {
    console.log("ID SELECTED : " + this.props.idSelected)
    window.scrollTo(0, 0);
    if (this.props.idSelected != null) {
      // this.props.infoVehicle(this.props.idSelected)
      this.setState({ titleFormType: "Edit" })
    }
    else {
      this.setState({ titleFormType: "Add" })
    }
  }


  componentDidUpdate(prevProps, prevState) {

  }


  onClickSubmit() {
    this.props.setErrorList(true)

    // Form Validate
    let formData = formValidation([this.state.formInfo])

    // Set Form Data
    for (let props in this.state.data) {
      let value = formData[props]
      if (value == undefined) value = ""
      this.state.data[props] = value
    }



    this.state.datas.push(this.state.data)

    setTimeout(() => this.submitData(), 500)
  }

  submitData() {
    if (this.props.isValid) {
      this.props.typeForm === 'add' ? this.props.addVehicle(this.state.datas) : this.updataData()
    }
    else {
      this.setState({ loading: false })
    }
  }

  updataData() {

  }


  onClickImportCSV() {
    // document.getElementById('uploadFile').click()
  }

  handleChange(event) {
    var file = event.target.files[0];
    if (file) {
      var fileReader = new FileReader();
      const scope = this
      fileReader.onload = function (event) {

        let contents = event.target.result;
        scope.props.setDataCsv(contents)
      }
      fileReader.readAsText(file);
    }
  }



  render() {
    const { dropdownVendor, dropdownCustomer, dropdownVehicleProvince, dropdownVehicleType, dropdownVehicleTypeByLaw, dropdownVehicleBodyType, dropdownVehicleBodyTypeByLaw, dropdownVehicleModel, dropdownVehicleFuelType, dropdownVehicleStatus, component: Component, ...rest } = this.props

    return (
      <PannelBox title={this.state.titleFormType + ' Driver'} {...rest}>
        <div>

          <Row>
            <Col lg={12}>
              <FormGenerator schema={this.state.formInfo}  {...rest} />
            </Col>
          </Row>
          <div style={{ minHeight: '1rem' }}></div>
          <div className="hr-line-dashed" />
          <Row>
            <div className="pull-right">
              <CancelButton loading={false} onClick={() => {
                this.props.history.push("/vehicle")
              }} />

              <SaveButton loading={this.state.loading} onClick={() => {
                this.setState({ loading: true })
                this.onClickSubmit()
              }} />
            </div>
          </Row>
        </div>
      </PannelBox>
    )
  }
}

const mapStateToProps = (state) => ({
  // idSelected: state.vehicle.idSelected,
  // infoVehicleData: state.vehicle.infoVehicleData,
  // formData: state.formValidate.data,
  // isValid: state.formValidate.isValid,
  // typeForm: state.vehicle.typeForm,
  // csvData: state.vehicle.csvData,
  // dropdownCustomer: state.vehicle.dropdownCustomer,
  // dropdownVendor: state.vehicle.dropdownVendor,
  // dropdownVehicleProvince: state.vehicle.dropdownVehicleProvince,
  // dropdownVehicleType: state.vehicle.dropdownVehicleType,
  // dropdownVehicleTypeByLaw: state.vehicle.dropdownVehicleTypeByLaw,
  // dropdownVehicleBodyType: state.vehicle.dropdownVehicleBodyType,
  // dropdownVehicleBodyTypeByLaw: state.vehicle.dropdownVehicleBodyTypeByLaw,
  // dropdownVehicleModel: state.vehicle.dropdownVehicleModel,
  // dropdownVehicleFuelType: state.vehicle.dropdownVehicleFuelType,
  // dropdownVehicleStatus: state.vehicle.dropdownVehicleStatus,
  // dropdownVehicleProvince:state.vehicle.dropdownVehicleProvince,

});
const mapDispatchToProps = (dispatch) => ({
  // infoVehicle: (id) => dispatch(VehicleActions.infoVehicle(id)),
  // addVehicle: (data) => dispatch(VehicleActions.addVehicle(data)),
  // updateVehicle: (vehicle) => dispatch(VehicleActions.updateVehicle(vehicle)),
  // setFormData: (fieldData) => dispatch(FormValidateActions.setFormData(fieldData)),
  // setErrorList: (data) => dispatch(FormValidateActions.setErrorList(data)),
  // setDataCsv: (csvData) => dispatch(VehicleActions.setDataCsv(csvData)),
  // vehicleTypeByLaw: (data) => dispatch(VehicleActions.vehicleTypeByLaw(data))

});

export default connect(mapStateToProps, mapDispatchToProps)(DriverForm)

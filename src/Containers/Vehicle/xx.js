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

class VehivcleForm extends Component {

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
                "formName": "vehicleInfo",
                "girdFormColumn": 2,
                "setDisabledField": true,
                "disabledField": ['LicensePlate', 'ChassisNumber', 'Brand', 'DistanceTotal', 'GPSDeviceType', 'GPSDeviceimei', 'SiMNumber', 'AirTime', 'vehiclestutus', 'OrderingModel', 'EngineNumber'],
                "sections": [
                    {
                        "sectionTitle": "Vehicle Information",
                        "fieldRow": [
                            {
                                "properties": {
                                    "VehicleBrand": {
                                        "type": "DropdownBinding",
                                        "title": "Brand",
                                        "optionGroup": "VehicleBrand",
                                        "required": true
                                    },
                                    "VehicleModel": {
                                        "type": "DropdownBinding",
                                        "title": "Model",
                                        "optionGroup": "VehicleModel",
                                        "required": true
                                    }
                                },

                            },
                            {
                                "properties": {
                                    "vehicleNameEn": {
                                        "type": "text",
                                        "title": "Vehicle Name (EN)",
                                        "value": "",
                                        "placeholder": "Enter your's Vehicle Name",
                                        "required": true,
                                    },
                                }
                            },
                            {
                                "properties": {
                                    "CustomerName": {
                                        "type": "text",
                                        "title": "Customer Name",
                                        "value": "",
                                        "placeholder": "Enter your's Customer Name",


                                    },
                                    // "chassisNo": {
                                    //   "type": "text",
                                    //   "title": "Chassis No.",
                                    //   "value": "",
                                    //   "required": true,

                                    // }
                                }
                            },
                            {
                                "properties": {
                                    "vehiclestutus": {
                                        "type": "text",
                                        "title": "Vehicle Status",
                                        "value": "",
                                        "placeholder": "",
                                        "disabled": true

                                    },
                                    // "chassisNo": {
                                    //   "type": "text",
                                    //   "title": "Chassis No.",
                                    //   "value": "",
                                    //   "required": true,

                                    // }
                                }
                            },
                            {
                                "properties": {
                                    "vinNo": {
                                        "type": "number",
                                        "title": "VIN No",
                                        "value": "",
                                        "placeholder": "Enter your's VIN Number",


                                    },
                                    " SpaceCode": {
                                        "type": "text",
                                        "title": "Spec Code",
                                        "value": "",
                                        "required": true,
                                        "placeholder": "Enter your's Space Code",
                                    }
                                }
                            },
                            {
                                "properties": {
                                    "FleetName": {
                                        "type": "DropdownBinding",
                                        "title": "Fleet Name",
                                        "optionGroup": "VehicleModel",
                                        "required": true
                                    }
                                }
                            },
                            {
                                "properties": {
                                    "LicensePlate": {
                                        "type": "text",
                                        "title": "License Plate",
                                        "value": "",
                                        // "required": true,
                                        "disabled": true

                                    },
                                    "Province": {
                                        "type": "DropdownBinding",
                                        "title": "Vehicle Province",
                                        "optionGroup": "VehicleProvince",
                                        "required": true,
                                        // "placeholder": "- Select your's Vehicle Issue Year -"
                                    }
                                },

                            },
                            {

                                "properties": {
                                    "ChassisNumber": {
                                        "type": "text",
                                        "title": "Chassis Number",
                                        "value": "",
                                        // "required": true,
                                        "disabled": true

                                    },
                                    "EngineNumber": {
                                        "type": "text",
                                        "title": "Engine Number",
                                        "value": "",
                                        // "required": true,
                                        "disabled": true

                                    },
                                }
                            },
                            {

                                "properties": {
                                    "Brand": {
                                        "type": "text",
                                        "title": "Brand",
                                        "value": "",
                                        // "required": true,
                                        "disabled": true

                                    },
                                    "OrderingModel": {
                                        "type": "text",
                                        "title": "Ordering Model",
                                        "value": "",
                                        "placeholder": "",
                                        "disabled": true

                                    }
                                }
                            },
                            {

                                "properties": {
                                    "VehicleType": {
                                        "type": "DropdownBinding",
                                        "title": "Vehicle Province",
                                        "optionGroup": "VehicleType",
                                        "required": true
                                    },
                                    "VehicleTypebyLaw": {
                                        "type": "DropdownBinding",
                                        "title": "Vehicle Type by Law",
                                        "optionGroup": "VehicleTypeByLaw",
                                        "required": true
                                    },
                                }
                            },
                            {

                                "properties": {
                                    "BodyType": {
                                        "type": "DropdownBinding",
                                        "title": "Body Type",
                                        "optionGroup": "VehicleBodyType",
                                        "required": true
                                    },
                                    "BodyTypebyLaw": {
                                        "type": "DropdownBinding",
                                        "title": "Body Type by Law",
                                        "optionGroup": "VehicleBodyTypeByLaw",
                                        "required": true
                                    },
                                }
                            },
                            {

                                "properties": {
                                    "Color": {
                                        "type": "text",
                                        "title": "Color",
                                        "value": "",
                                        "placeholder": "- Select your's Vehicle Color -",
                                        "required": true,
                                    },
                                }
                            },
                            {

                                "properties": {

                                    "IssueYear": {
                                        "type": "text",
                                        "title": "Issue Year",
                                        "value": "",
                                        "placeholder": "- Select your's Vehicle Issue Year -",
                                        "required": true,
                                    },
                                    "Speedlimit": {
                                        "type": "number",
                                        "title": "Speed Limit",
                                        "value": "",
                                        "required": true,
                                        "placeholder": "Enter your's Vehicle Speed Limit"

                                    },

                                }
                            },
                            {

                                "properties": {

                                    "Fueltank": {
                                        "type": "text",
                                        "title": "Fuel tank size (Litre)",
                                        "value": "",
                                        "placeholder": "- Select your's Vehicle Fuel tank size (Litre) -",
                                        "required": true,
                                    },
                                    "FuelType": {
                                        "type": "DropdownBinding",
                                        "title": "Fuel Type",
                                        "optionGroup": "VehicleFuelType",
                                        "required": true,
                                        "placeholder": "- Select your's Vehicle Issue Year -",
                                    }
                                }
                            },
                            {

                                "properties": {
                                    "NumberofWheel": {
                                        "type": "select",
                                        "title": "Number of Wheel",
                                        "value": "",
                                        "selectOption": [


                                            {
                                                "value": '',
                                                "name": "- Select your's Vehicle Number of Wheel -"
                                            },
                                            {
                                                "value": '3',
                                                "name": "CCC"
                                            },
                                            {
                                                "value": '4',
                                                "name": "DDD"
                                            }
                                        ],
                                        "placeholder": "- Select your's Vehicle Issue Year -",
                                        "required": true,
                                    },

                                    "FuelConsumption": {
                                        "type": "text",
                                        "title": " Fuel Consumption (Km/Litre)",
                                        "value": "",
                                        "placeholder": "- Select your's Vehicle  Fuel Consumption (Km/Litre) -",
                                        "required": true,
                                    },


                                }
                            },
                            {
                                "properties": {

                                    "Thermal": {
                                        "type": "text",
                                        "title": "Thermal Limited",
                                        "value": "",
                                        "required": true,
                                        "placeholder": "Enter your's Vehicle Thermal Limited"

                                    },
                                    "AxleNo": {
                                        "type": "select",
                                        "title": "Axle No",
                                        "value": "",
                                        "selectOption": [
                                            {
                                                "value": '',
                                                "name": "- Select Vehicle Number Axle -"
                                            },
                                            {
                                                "value": '3',
                                                "name": "CCC"
                                            },
                                            {
                                                "value": '4',
                                                "name": "DDD"
                                            }
                                        ],
                                        "placeholder": "- Select Vehicle Number Axle -",
                                        "required": true,
                                    }



                                }
                            },
                            {

                                "properties": {

                                    "MiximumTemperature": {
                                        "type": "text",
                                        "title": "Miximum Temperature",
                                        "value": "",
                                        "placeholder": "Enter your's Vehicle Miximum Temperature (C)",
                                        "required": true,

                                    },
                                    "MinimumTemperature": {
                                        "type": "text",
                                        "title": "Minimum Temperature",
                                        "value": "",
                                        "placeholder": "Enter your's Vehicle Minimum Temperature (C)",
                                        "required": true,

                                    }


                                }
                            },

                            {
                                "properties": {

                                    "WarrantyStartDate": {
                                        "type": "date",
                                        "title": "Warranty Start Date",
                                        "value": "",
                                        "required": true,
                                        "placeholder": ""

                                    },
                                    "WarrantyEndDate": {
                                        "type": "date",
                                        "title": "Warranty End Date",
                                        "value": "",
                                        "placeholder": "",
                                        "required": true,


                                    }


                                }
                            },



                        ]
                    },
                    {
                        "sectionTitle": "GPS Device Information",
                        "fieldRow": [
                            {
                                "properties": {

                                    "GPSDeviceType": {
                                        "type": "text",
                                        "title": "GPS Device Type",
                                        "value": "",
                                        "placeholder": "",
                                        "disabled": true


                                    },
                                    "GPSDeviceimei": {
                                        "type": "text",
                                        "title": "GPS Device imei",
                                        "value": "",
                                        "placeholder": "",
                                        "disabled": true

                                    },



                                }
                            },
                            {
                                "properties": {

                                    "SiMNumber": {
                                        "type": "text",
                                        "title": "SiM Number",
                                        "value": "",
                                        "placeholder": "",
                                        "disabled": true


                                    },
                                    "AirTime": {
                                        "type": "text",
                                        "title": "Air Time",
                                        "value": "",
                                        "placeholder": "",
                                        "disabled": true

                                    },



                                }
                            }
                        ]
                    },
                    {
                        "sectionTitle": "Driver Information",
                        "fieldRow": [
                            {
                                "properties": {
                                    "DriverName": {
                                        "type": "select",
                                        "title": "Driver's Name",
                                        "value": "",
                                        "selectOption": [


                                            {
                                                "value": '',
                                                "name": "- Select Driver's Name -"
                                            },
                                            {
                                                "value": '3',
                                                "name": "CCC"
                                            },
                                            {
                                                "value": '4',
                                                "name": "DDD"
                                            }
                                        ],
                                        "placeholder": "- Select Driver's Name -",
                                    },
                                }
                            },
                        ]
                    },
                    {
                        "sectionTitle": "Vehicle Status",
                        "fieldRow": [
                            {
                                "properties": {
                                    "Current": {
                                        "type": "select",
                                        "title": "Current Status",
                                        "value": "",
                                        "selectOption": [


                                            {
                                                "value": '',
                                                "name": "- Select Current Status -"
                                            },
                                            {
                                                "value": '3',
                                                "name": "CCC"
                                            },
                                            {
                                                "value": '4',
                                                "name": "DDD"
                                            }
                                        ],
                                        "placeholder": "- Select Driver's Name -",
                                    },
                                }
                            },
                        ]
                    },
                    {
                        "sectionTitle": "Purchasing Information",
                        "fieldRow": [
                            {
                                "properties": {

                                    "Vendor": {
                                        "type": "text",
                                        "title": "Vendor's name",
                                        "value": "",
                                        "placeholder": "Enter Vehicle Vendor's Name",
                                        "required": true,

                                    },
                                    "PurchaseDate": {
                                        "type": "date",
                                        "title": "Purchase Date",
                                        "value": "",
                                        "placeholder": "",
                                        "required": true,

                                    },



                                }
                            },
                            {
                                "properties": {

                                    "Price": {
                                        "type": "number",
                                        "title": "Price",
                                        "value": "",
                                        "placeholder": "Enter Vehicle Price",
                                        "required": true,

                                    },
                                    // "PurchaseDate": {
                                    //   "type": "text",
                                    //   "title": "Purchase Date",
                                    //   "value": "",
                                    //   "placeholder": "",
                                    //   "required": true,

                                    // },



                                }
                            },
                        ]
                    },
                    {
                        "sectionTitle": "Insurance",
                        "fieldRow": [
                            {
                                "properties": {

                                    "InsuranceCompany": {
                                        "type": "text",
                                        "title": "Insurance Company",
                                        "value": "",
                                        "placeholder": "Enter Vehicle Insurance Company",
                                        "required": true,

                                    },
                                    " InsurancePolicyNumber": {
                                        "type": "text",
                                        "title": "Insurance Policy Number",
                                        "value": "",
                                        "placeholder": "Enter Vehicle Insurance Policy Number",
                                        "required": true,

                                    },



                                }
                            },
                            {
                                "properties": {

                                    "InsuranceCompany": {
                                        "type": "text",
                                        "title": "Insurance Premium Rate",
                                        "value": "",
                                        "placeholder": "Enter Vehicle Insurance Premium Rate",
                                        "required": true,

                                    },
                                    " InsuranceType": {
                                        "type": "text",
                                        "title": "Insurance Type",
                                        "value": "",
                                        "placeholder": "Enter Vehicle Insurance Type",
                                        "required": true,

                                    },
                                }
                            },
                            {
                                "properties": {

                                    "EffectiveDate": {
                                        "type": "date",
                                        "title": "EffectiveDate",
                                        "value": "",
                                        "placeholder": "",
                                        "required": true,

                                    },
                                    "ExpirationDate": {
                                        "type": "date",
                                        "title": " ExpirationDate",
                                        "value": "",
                                        "placeholder": "",
                                        "required": true,

                                    },



                                }
                            },
                        ]
                    },
                    {
                        "sectionTitle": "Data Act",
                        "fieldRow": [

                            {
                                "properties": {

                                    "ExpirationDate": {
                                        "type": "date",
                                        "title": "Expiration Date",
                                        "value": "",
                                        "placeholder": "",
                                        "required": true,

                                    },
                                    " EffectiveDate": {
                                        "type": "date",
                                        "title": "  Effective Date",
                                        "value": "",
                                        "placeholder": "",
                                        "required": true,

                                    },



                                }
                            },
                        ]
                    },
                    {
                        "sectionTitle": "Tax Date",
                        "fieldRow": [
                            {
                                "properties": {

                                    "ExpirationDate": {
                                        "type": "date",
                                        "title": "Expiration Date",
                                        "value": "",
                                        "placeholder": "",
                                        "required": true,

                                    },
                                    "EffectiveDate": {
                                        "type": "date",
                                        "title": "  Effective Date",
                                        "value": "",
                                        "placeholder": "",
                                        "required": true,

                                    },



                                }
                            },
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

        // ถ้า props.typeForm มีการเปลี่ยนแปลงค่าให้กลับไปหน้า vehicle
        if (prevProps.typeForm !== this.props.typeForm) {
            if (this.props.typeForm === null) {
                this.props.history.push("/vehicle")
            }
        }

        // ถ้า props.csvData มีการเปลี่ยนแปลงค่าให้ไปที่หน้า ImportCSV
        if (prevProps.csvData !== this.props.csvData) {
            this.props.history.push("/vehicle/ImportCSV")
        }
        // if (prevProps.dropdownCustomer !== this.props.dropdownCustomer) {
        //   let { dropdownCustomer } = this.props
        //   let array = []
        //   for (let i in dropdownCustomer) {
        //     array.push({ value: dropdownCustomer[i].key, name: dropdownCustomer[i].value })
        //   }
        //   console.log(this.state.formInfo.sections[0].fieldRow[4].properties.FleetName.selectOption, array)
        //   this.state.formInfo.sections[0].fieldRow[4].properties.selectOption = [...array]

        //   console.log(this.state.formInfo.sections[0].fieldRow[4].properties.selectOption)

        //   this.setState(prevState => prevState)
        // }


    }

    componentWillMount() {


        this.props.vehicleTypeByLaw(['Customer', 'Vendor', 'VehicleProvince', 'VehicleType', 'VehicleTypeByLaw', 'VehicleBodyType', 'VehicleBodyTypeByLaw', 'VehicleModel', 'VehicleFuelType', 'VehicleStatus', 'VehicleBrand'])


        // this.props.dropdownCustomer.map((item, i) => {
        //   this.state.formInfo.sections[0].fieldRow[4].properties.FleetName.selectOption.push({
        //     "value": item.key,
        //     "name": item.value
        //   })
        // })


        // this.props.dropdownVehicleType.map((item, i) => {
        //   this.state.formInfo.sections[0].fieldRow[4].properties.FleetName.selectOption.push({
        //     "value": item.key,
        //     "name": item.value
        //   })
        // })


        // this.props.dropdownVehicleType.map((item, i) => {
        //   this.state.formInfo.sections[0].fieldRow[8].properties.VehicleType.selectOption.push({
        //     "value": item.key,
        //     "name": item.value
        //   })
        // })

        // this.props.dropdownVehicleTypeByLaw.map((item, i) => {
        //   this.state.formInfo.sections[0].fieldRow[8].properties.VehicleTypebyLaw.selectOption.push({
        //     "value": item.key,
        //     "name": item.value
        //   })
        // })

        // this.props.dropdownVehicleBodyType.map((item, i) => {
        //   this.state.formInfo.sections[0].fieldRow[9].properties.BodyType.selectOption.push({
        //     "value": item.key,
        //     "name": item.value
        //   })
        // })

        // this.props.dropdownVehicleBodyTypeByLaw.map((item, i) => {
        //   this.state.formInfo.sections[0].fieldRow[9].properties.BodyTypebyLaw.selectOption.push({
        //     "value": item.key,
        //     "name": item.value
        //   })
        // })


        // this.props.dropdownVehicleModel.map((item, i) => {
        //   this.state.formInfo.sections[0].fieldRow[10].properties.Model.selectOption.push({
        //     "value": item.key,
        //     "name": item.value
        //   })
        // })


        // this.props.dropdownVehicleFuelType.map((item, i) => {
        //   this.state.formInfo.sections[0].fieldRow[12].properties.FuelType.selectOption.push({
        //     "value": item.key,
        //     "name": item.value
        //   })
        // })

        // this.props.dropdownVehicleFuelType.map((item, i) => {
        //   this.state.formInfo.sections[0].fieldRow[13].properties.NumberofWheel.selectOption.push({
        //     "value": item.key,
        //     "name": item.value
        //   })
        // })







        let { formInfo } = this.state

        console.log("_____componentWillMount______")
        console.log(this.props.infoVehicleData)
        if (this.props.infoVehicleData !== null) {

            if (this.props.typeForm == "edit") this.state.formInfo.setDisabledField = true

            for (let obj in formInfo.fieldRow) {
                let subProperties = formInfo.fieldRow[obj].properties
                for (let name in subProperties) {
                    subProperties[name].value = this.props.infoVehicleData[name]
                }
            }


            console.log(this.state.formInfo)
        }
    }


    onClickSubmit() {
        this.props.setErrorList(true)

        // Form Validate
        let formData = formValidation([this.state.formInfo])

        console.log(">>>> FORM DATA <<<<<<")
        console.log(formData)


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
        let { data } = this.state
        let { infoVehicleData } = this.props

        console.log(">> UPDATA DATA <<")
        console.log(data)
        console.log(infoVehicleData)

        let updateVehicle = []

        for (let name in data) {

            if (infoVehicleData[name] != undefined) {
                if (data[name] != infoVehicleData[name]) {
                    updateVehicle.push({ "op": "replace", "path": "/" + name, "value": data[name] })
                }
            }
        }
        console.log(">> UPDATE CHANGE ONLY <<")
        console.log(updateVehicle)
        if (updateVehicle.length > 0) {
            let vehicle = {
                id: infoVehicleData.id,
                array: updateVehicle
            }


            console.log(vehicle)
            this.props.updateVehicle(vehicle)
            //  setTimeout(() => this.props.history.push("truck"), 500)
            this.setState({ loading: false })
        }
        else {
            alert("ไม่มีข้อมูลเปลี่ยนแปลง")
            this.setState({ loading: false })
        }
    }


    onClickImportCSV() {
        document.getElementById('uploadFile').click()
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
        const { dropdownVendor, dropdownCustomer, dropdownVehicleProvince, dropdownVehicleType, dropdownVehicleTypeByLaw, dropdownVehicleBodyType, dropdownVehicleBodyTypeByLaw, dropdownVehicleModel, dropdownVehicleFuelType, dropdownVehicleStatus, dropdownVehicleBrand, component: Component, ...rest } = this.props


        // console.log("dropdownVehicleStatus", dropdownVehicleBrand)
        return (
            <PannelBox title={this.state.titleFormType + ' Vehicle'} {...rest}>
                <div>
                    {/* <div>
            <select >
              {this.props.dropdownCustomer.map((item, i) => {
                return (<option value={item.key}>{item.value}</option>)
              })}
            </select>
          </div> */}
                    {/* <div>
            <select >
              {this.props.dropdownVendor.map((item, i) => {
                return (<option value={item.key}>{item.value}</option>)
              })}
            </select>
          </div> */}
                    <Row>
                        <Col lg={12}>
                            <FormGenerator schema={this.state.formInfo}  {...rest} />
                        </Col>
                    </Row>
                    <div style={{ minHeight: '1rem' }}></div>

                    <div className="hr-line-dashed" />



                    {/* <Row>
            <Col lg={12}>
              <FormGenerator schema={this.state.formDriver}  {...rest} />
            </Col>
          </Row>
          <div style={{ minHeight: '1rem' }}></div>


          <Row>
            <Col lg={12}>
              <FormGenerator schema={this.state.formVehicleStatus}  {...rest} />
            </Col>
          </Row>
          <div style={{ minHeight: '1rem' }}></div>



          <Row>
            <Col lg={12}>
              <FormGenerator schema={this.state.PurchasingInformation}  {...rest} />
            </Col>
          </Row>
          <div style={{ minHeight: '1rem' }}></div>


          <Row>
            <Col lg={12}>
              <FormGenerator schema={this.state.Insurance}  {...rest} />
            </Col>
          </Row>
          <div style={{ minHeight: '1rem' }}></div>


          <Row>
            <Col lg={12}>
              <FormGenerator schema={this.state.DataAct}  {...rest} />
            </Col>
          </Row>
          <div style={{ minHeight: '1rem' }}></div>



          <Row>
            <Col lg={12}>
              <FormGenerator schema={this.state.TaxDate}  {...rest} />
            </Col>
          </Row>
          <div style={{ minHeight: '1rem' }}></div> */}

                    <h3>Service</h3>
                    <br />
                    <Row >
                        <div className="form-column col-lg-12">
                            <Table hover bordered striped={false} responsive>
                                <thead>
                                    <tr>

                                        <th>No</th>
                                        <th>Time</th>
                                        <th>Details</th>
                                        <th>Technician</th>
                                        <th>Stasus</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>xxxxxx</td>
                                        <td>xxxxxx</td>
                                        <td>xxxxxx</td>
                                        <td>xxxxxx</td>
                                        <td>xxxxxx</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Row>


                    <div className="hr-line-dashed" />
                    <Row>
                        <div className="pull-left">
                            <Button className="btn btn-warning" style={{ marginRight: 10 }} size="md" onClick={() => {
                                //  this.setState({ loading: true })
                                // formInfo, formDriver, formVehicleStatus, PurchasingInformation, Insurance, DataAct, TaxDate
                                resetForm([this.state.formInfo,


                                ])

                            }}  >{this.props.typeForm === "add" ? "Clear" : "Reset"}</Button>

                            {this.props.typeForm === "add" &&
                                <Button className="btn btn-success" size="md" onClick={() => {
                                    //  this.setState({ loading: true })
                                    this.onClickImportCSV()
                                }}  >Import CSV</Button>
                            }
                            <input type='file' id='uploadFile' onChange={(e) => this.handleChange(e)} style={{ display: 'none' }} />
                        </div>
                        <div className="pull-right">
                            <CancelButton loading={false} onClick={() => {
                                //  this.setState({ loading: true })
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
    idSelected: state.vehicle.idSelected,
    infoVehicleData: state.vehicle.infoVehicleData,
    formData: state.formValidate.data,
    isValid: state.formValidate.isValid,
    typeForm: state.vehicle.typeForm,
    csvData: state.vehicle.csvData,
    dropdownCustomer: state.vehicle.dropdownCustomer,
    dropdownVendor: state.vehicle.dropdownVendor,
    dropdownVehicleProvince: state.vehicle.dropdownVehicleProvince,
    dropdownVehicleType: state.vehicle.dropdownVehicleType,
    dropdownVehicleTypeByLaw: state.vehicle.dropdownVehicleTypeByLaw,
    dropdownVehicleBodyType: state.vehicle.dropdownVehicleBodyType,
    dropdownVehicleBodyTypeByLaw: state.vehicle.dropdownVehicleBodyTypeByLaw,
    dropdownVehicleModel: state.vehicle.dropdownVehicleModel,
    dropdownVehicleFuelType: state.vehicle.dropdownVehicleFuelType,
    dropdownVehicleStatus: state.vehicle.dropdownVehicleStatus,
    dropdownVehicleBrand: state.vehicle.dropdownVehicleBrand
    // dropdownVehicleProvince:state.vehicle.dropdownVehicleProvince,

});
const mapDispatchToProps = (dispatch) => ({
    infoVehicle: (id) => dispatch(VehicleActions.infoVehicle(id)),
    addVehicle: (data) => dispatch(VehicleActions.addVehicle(data)),
    updateVehicle: (vehicle) => dispatch(VehicleActions.updateVehicle(vehicle)),
    setFormData: (fieldData) => dispatch(FormValidateActions.setFormData(fieldData)),
    setErrorList: (data) => dispatch(FormValidateActions.setErrorList(data)),
    setDataCsv: (csvData) => dispatch(VehicleActions.setDataCsv(csvData)),
    vehicleTypeByLaw: (data) => dispatch(VehicleActions.vehicleTypeByLaw(data))

});

export default connect(mapStateToProps, mapDispatchToProps)(VehivcleForm)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import DriverActions from '../../Redux/DriverRedux'
import FormValidateActions from '../../Redux/FormValidateRedux'

import {
  Col, Row, FormGroup, Label, Input, Button, Table, Form, CardImg
} from 'reactstrap'

import PannelBox from '../../Components/PannelBox'
import FormGenerator from '../../Components/FormGenerator/Form'
import { formValidation } from "../../Components/FormGenerator/validate";
import SaveButton from '../../Components/SaveButton'
import CancelButton from '../../Components/CancelButton'
import { resetForm } from "../../Components/FormGenerator/resetForm";
import { red } from '@material-ui/core/colors'
class DriverFormEdit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      titleFormType: "",
      loading: false,
      datas: [],
      data: {
        "prefixName": "",
        "familyName": "",
        "name": "",
        "aliasName": "",
        "houseAndVillage": "",
        "subdistrict": "",
        "district": "",
        "province": "",
        "country": "",
        "phone": "",
        "lineID": "",
        "position": "",
        "department": "",
        "driverCode": "",
        "personalId": "",
        "drivingLicenseCards": []
      },
      formInfo: {
        "title": "",
        "showHeaderTitle": false,
        "formName": "driverInfo",
        "girdFormColumn": 2,
        "setDisabledField": true,
        "disabledField": [],
        "sections": [
          {
            "sectionTitle": "",
            "fieldRow": [
              {
                "properties": {
                  "DriverPhone": {
                    "type": "number",
                    "title": "Driver's Phone",
                    "value": "",
                    "placeholder": "Enter your's Driver's Phone Number xxx-xxx-xxxx",
                    "required": true,

                  },
                  "Driverline": {
                    "type": "text",
                    "title": "Driver's Line ID",
                    "value": "",
                    "placeholder": "Enter your's Driver's Line ID",
                    "required": true,


                  }
                }
              },
              {
                "properties": {
                  "Department": {
                    "type": "text",
                    "title": "Department",
                    "value": "",
                    "placeholder": "Enter your's Driver's Department",


                  },
                  "Position": {
                    "type": "text",
                    "title": "Position",
                    "value": "",
                    "placeholder": "Enter your's Driver's Position",



                  }
                }
              },

              {
                "properties": {

                  "HouseandVillage": {
                    "type": "select",
                    "title": "House and Village",
                    "value": "",
                    "selectOption": [


                      {
                        "value": '',
                        "name": "- Select Driver's House and Village -"
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

                  },
                  "Subdistrict": {
                    "type": "select",
                    "title": "Subdistrict",
                    "value": "",
                    "selectOption": [


                      {
                        "value": '',
                        "name": "- Select Driver's Subdistrict - "
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

                  }


                }
              },
              {
                "properties": {

                  "District": {
                    "type": "select",
                    "title": "District",
                    "value": "",
                    "selectOption": [


                      {
                        "value": '',
                        "name": "- Select Driver's District -"
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
                    "placeholder": "- Select Driver's District -",

                  },
                  "Province": {
                    "type": "select",
                    "title": "Province",
                    "value": "",
                    "selectOption": [


                      {
                        "value": '',
                        "name": "- Select Driver's Province -"
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
                    "placeholder": "- Select Driver's Province -",

                  }


                }
              },
              {
                "properties": {

                  "Country": {
                    "type": "select",
                    "title": "Country",
                    "value": "",
                    "selectOption": [


                      {
                        "value": '',
                        "name": "- Select Driver's Country -"
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
                    "placeholder": "- Select Driver's Country -",

                  },


                }
              },





            ]
          }
        ],
      },

      formInfo1: {
        "title": "",
        "showHeaderTitle": false,
        "formName": "driverInfo",
        "girdFormColumn": 2,
        "setDisabledField": true,
        "disabledField": [],
        "sections": [
          {
            "sectionTitle": "Driving License Cards",
            "fieldRow": [
              {
                "properties": {
                  "DriverPhone": {
                    "type": "number",
                    "title": "Driver's Phone",
                    "value": "",
                    "placeholder": "Enter your's Driver's Phone Number xxx-xxx-xxxx",
                    "required": true,

                  },
                  "HouseandVillage": {
                    "type": "select",
                    "title": "House and Village",
                    "value": "",
                    "selectOption": [
                      {
                        "value": '',
                        "name": "- Select Driver's House and Village -"
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

                  },
                }
              },
              {
                "properties": {
                  "Department": {
                    "type": "text",
                    "title": "Department",
                    "value": "",
                    "placeholder": "Enter your's Driver's Department",


                  },
                  "Position": {
                    "type": "text",
                    "title": "Position",
                    "value": "",
                    "placeholder": "Enter your's Driver's Position",



                  }
                }
              },
              {
                "properties": {
                  "LicenseExpiryDate": {
                    "type": "date",
                    "title": "License Expiry Date",
                    "value": "",
                    "placeholder": "",


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
    if (prevProps.typeForm !== this.props.typeForm) {
      if (this.props.typeForm === null) {
        this.props.history.push("driver")
      }
    }
  }

  componentWillMount() {
    let { formInfo, formInfo1 } = this.state

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





      for (let obj in formInfo1.fieldRow) {
        let subProperties = formInfo1.fieldRow[obj].properties
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
    let formData = formValidation([this.state.formInfo, this.state.formInfo1])

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
    const { component: Component, ...rest } = this.props
    return (
      <PannelBox title={this.state.titleFormType + ' Driver'} >

        <Row >

          <Col lg={6}>
            <label style={{ fontWeight: 500 }}>Driver's Name - Last Name <span style={{ color: 'red' }}>*</span> :</label>
            <Row>

              <Col lg={2} >


                <select className="form-control">
                  <option class="form-control" selected value="grapefruit">Prefix Name</option>
                  <option value="lime">Lime</option>
                  <option value="coconut">Coconut</option>
                  <option value="mango">Mango</option>
                </select>
              </Col>
              <Col lg={5}  >
                <input className="form-control" value="" placeholder="Enter your's Driver's Name"></input>
              </Col>
              <Col lg={5}  >
                <input className="form-control" value="" placeholder="Enter your's Driver's Last Name"></input>
              </Col>
            </Row>
          </Col>
          <Col lg={6}>
            <Row>


            </Row>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg={6}>
            <label style={{ fontWeight: 500 }}>Alias Name :</label>
            <input className="form-control" value="" placeholder="Enter your's Driver's ID"></input>
          </Col>
          <Col lg={6}>
            <Row>


            </Row>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg={6}>
            <label style={{ fontWeight: 500 }}>Driver's Code<span style={{ color: 'red' }}>*</span> :</label>
            <input className="form-control" value="" placeholder="Enter your's Driver's Code"></input>
          </Col>
          <Col lg={6}>
            <Row>


            </Row>
          </Col>
        </Row>



        <Row style={{ paddingLeft: '0px !important' }}>

          <Col lg={12}>
            <FormGenerator schema={this.state.formInfo}  {...rest} />
          </Col>
        </Row>
        <div style={{ minHeight: '1rem' }}></div>

        <div className="hr-line-dashed" />


        <Row style={{ paddingLeft: '0px !important' }}>

          <Col lg={12}>
            <FormGenerator schema={this.state.formInfo1}  {...rest} />
          </Col>
        </Row>
        <div style={{ minHeight: '1rem' }}></div>

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

      </PannelBox>
    )

  }

}



const mapStateToProps = (state) => ({
  isValid: state.formValidate.isValid,
  businessPartnerId: state.signin.businessPartnerId,
  objData: state.driver.objData,
  typeForm: state.driver.typeForm,
  loading: state.driver.loading,
  tmp_driver_profile: state.driver.tmp_driver_profile,

});
const mapDispatchToProps = (dispatch) => ({
  setData: typeForm => dispatch(DriverActions.setData(typeForm)),
  setErrorList: (data) => dispatch(FormValidateActions.setErrorList(data)),
  createDriver: (id, data) => dispatch(DriverActions.createDriver(id, data)),
  updateDrivers: (id, driver) => dispatch(DriverActions.updateDrivers(id, driver)),
  getDriverDetail: (id) => dispatch(DriverActions.getDriverDetail(id)),
  searchDrivers: (id) => dispatch(DriverActions.searchDrivers(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(DriverFormEdit)

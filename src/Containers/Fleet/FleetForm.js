import React, { Component, useState } from 'react'
// import '../Layouts/css/custom.css';
import { connect } from 'react-redux'
import GenerateForm from 'react-form-generator-from-json'
import {
  Container,
  Row,
  Card,
  Col,
  CardTitle,
  Form,
  Input,
  FormText,
  Alert,
  FormGroup,
  Label,
  Button,
  ButtonGroup, CardImg
} from 'reactstrap'
// import './custom.css'
import DetailTemplate from './DetailTemplate.js';
import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css'
import service from './data.js';
import DataGrid, { Column, FilterRow, HeaderFilter, SearchPanel, Grouping, GroupPanel, Paging, Export, Selection, MasterDetail, Editing } from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import { states } from './data.js';
import { throwStatement } from '@babel/types';
import { HashRouter } from 'react-router-dom';
import moment from 'moment'
import 'moment/locale/th'
import VehicleActions from "../../Redux/VehicleRedux";
import SaveButton from "../../Components/SaveButton";
import CancelButton from "../../Components/CancelButton";
import PannelBox from "../../Components/PannelBox";
import JsonSchema from "react-jsonschema-form";
// import FormSchema from "../../Components/FormSchema";
// import Alert from "reactstrap/es/Alert";

class VehicleForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lang: 'en',
      // dataDefault: {

      titleFormType: 'add',
      FleetName: '',

      // },

      alerts: this.props.error,
      visibility: false,
      formVehicle: [
        {
          en: "Vehicle Brand",
          th: "รหัสตัวแทนจำหน่าย",
          id: "vehicleBrand",
          value: "",
          type: "text",
        },

      ],
      formVehicleInfo: [
        {
          en: "VIN No",
          th: "รหัส VIN",
          id: "FleetName",
          value: "",
          type: "text",
        },

      ],
      formSpecInfo: [
        {
          en: "Chassis No",
          th: "หมายเลขโครง",
          id: "chassisNo",
          value: "",
          type: "text",
        },


      ],
    }

  }

  handleChange(event) {
    this.setState({
      img: URL.createObjectURL(event.target.files[0])
    })
  }

  setDropdownInfo(item) {
    return (
      <div>
        <Input key={'dropdown'} type="select" name={item.id} id={item.id} onChange={(e) => this.setValue(item.id, e.target.value)} disabled={this.state.setDisabled}>
          {item.subitem.map((subitem) => <option value={subitem.id}>{subitem[this.state.lang]}</option>)}
        </Input>

      </div>)
  }

  setValueButtonGroup(id, subitem) {
    // console.log(id,subitem)

    // item.value = subitem
    // this.setState(prevState => prevState)
  }

  setRadioInfo(item) {
    return (
      <ButtonGroup key={'radio_button'} disabled={this.state.setDisabled}>
        {item.subitem.map((subitem) => <Button className='button-radio' id={item.id} onClick={() => this.setValue(item.id, subitem.id)} disabled={this.state.setDisabled} active={item.id + this.state.dataDefault[item.id] === item.id + subitem.id} >{subitem[this.state.lang]}</Button>)}
      </ButtonGroup>
    )
  }

  setPhotoInfo(item) {
    return (
      <div>
        <CardImg key={'card_img'} src={this.state.dataDefault.img} width="65%" height="200" />
        <br /><br />
        {/*{this.props.typeForm === 'show' ? null :*/}
        <Input key={"photo_upload"} name="fileToUpload" id={item.id} onChange={this.handleChange} />
      </div>
    )
  }

  setValue(id, value) {
    this.state.dataDefault[id] = value
    this.setState(prevState => prevState)
    // console.log(id,value)
    // let item = this.state.fieldDealerInfo.find(o => o.id === id);
    // if(item === undefined){
    //     item = this.state.fieldLicence.find(o => o.id === id);
    // }
    // item.value = value;
    // console.log(item)
  }

  setCheckbox = (item) => {
    return (
      <div>
        <Input type="checkbox" onClick={(e) => {
          this.setValue(item.id, e.target.checked)
          // this.setState({ checkSameOfficerAddress: e.target.checked })
        }} />
      </div>)
  }

  setDatePicker = (item) => {
    return (
      <div>
        <Input type="date" onChange={(e) => this.setValue(item.id, e.target.value)}></Input>
      </div>
    )
  }

  setInfo(item) {
    // console.log(this.state.dataDefault)
    return (
      <div className="form-group">
        <label className="col-sm-4 control-label" >{item[this.state.lang]}:</label >
        <div className="col-sm-8">
          {item.type === "radio" ? this.setRadioInfo(item) :
            item.type === "dropdown" ? this.setDropdownInfo(item) :
              item.type === "file" ? this.setPhotoInfo(item) :
                item.type === "checkbox" ? this.setCheckbox(item) :
                  item.type === "date" ? this.setDatePicker(item) : <div>
                    <Input key={'input_form'} type={item.type} id={item.id} onChange={(e) => this.setValue(item.id, e.target.value)} disabled={this.state.setDisabled}></Input>

                  </div>}
        </div>
      </div>
    )

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.error === null && this.props.success === "addSuccess" && this.props.status === null) {
      // this.props.setAddVehicleSuccess2()
      this.props.history.push('/vehicle')
    }
    if (this.state.error) {
      this.setState({ visibility: true })
    }


    // console.log(this.props.formData)
    // console.log(this.formData)
  }

  addForm() {
    // this.showForm(true);
    this.setState({ titleFormType: 'Add' });
    let fdi = this.state.formVehicleInfo

    for (let d in fdi) {
      fdi[d].value = ""
    }

    let fdi2 = this.state.formPurchasinhInfo
    for (let d in fdi2) {
      fdi2[d].value = ""
    }

    let fdi3 = this.state.formInsurance
    for (let d in fdi3) {
      fdi3[d].value = ""
    }

    this.setState({ formVehicleInfo: fdi, formPurchasinhInfo: fdi2, formInsurance: fdi3 })

  }

  onClickSave = () => {
    // console.log(this.state.customerId)
    if (this.state.FleetName) {
      this.props.setAddVehicle(this.state.FleetName)
    }
    else {
      this.setState({ alerts: 'กรุณากรอก FleetName', visibility: true })
    }
  }

  onClickCancel = () => {
    this.props.history.push('/fleet')

  }

  render() {
    /*<JsonSchema schema={this.state.schema} uiSchema={this.state.uiSchema}/>*/
    /*<FormSchema schema={this.state.schema} uiSchema={this.state.uiSchema}/>*/
    return (

      <div className="contrainner">
        <div className="ibox float-e-margins">
          <div className="ibox-title">
            <div className="form-horizontal">
              <h3>Add Fleet</h3>
              <div className="ibox-content">
                <h3>Fleet info</h3>
                <Alert isOpen={this.state.visibility} fade={false} color='danger'>{this.state.alerts}</Alert>
                <div className="hr-line-dashed"></div>
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <Label lg="4" className="control-label">FleetName : <Label style={{ color: 'red' }}>*</Label></Label>
                      <Col lg="8">
                        <Input className="form-control" type="text" value={this.state.FleetName} onChange={(e) => this.setState({ FleetName: e.target.value })} />
                      </Col>
                    </FormGroup>
                  </Col>

                </Row>



                {/*<GenerateForm formJson={this.state.formVehicleInfo} />*/}
                {/*// </div>*/}
                <Row style={{ textAlign: "right" }}>
                  {/*<span style={{ color: 'red' }}>{this.props.error}</span>*/}
                  {/*<Button className="ladda-button btn btn-primary" style={{ width: 100 }} data-style="slide-left" onClick={() => this.onClickSave()} disabled={this.props.loading} data-loading={this.props.loading}>*/}
                  {/*    <span className="ladda-label">Save</span>*/}
                  {/*    <span className="ladda-spinner"></span>*/}
                  {/*</Button>*/}
                  <CancelButton onClick={() => this.onClickCancel()} loading={false} />
                  {' '}
                  <SaveButton onClick={() => this.onClickSave()} loading={this.props.loading} />

                  {/*<Button className="ladda-button btn btn-danger" style={{ width: 100 }} data-style="slide-left" onClick={() => this.onClickCancel()} disabled={this.props.loading} data-loading={this.props.loading}>Cancel</Button>*/}
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }

}

const mapStateToProps = (state) => ({
  loading: state.vehicle.loading,
  vehicle: state.vehicle.vehicle,
  error: state.vehicle.error,
  success: state.vehicle.success,
  status: state.vehicle.status,
  // userData: state.login.userData,
  //   test: state.popup.test,
  // messageError: state.login.messageError,
  // data: state.login.data
});

const mapDispatchToProps = (dispatch) => ({
  // setListVehicle: () => dispatch(VehicleActions.setListVehicle()),
  setAddVehicle: (FleetName, vehicleName, vehicleBrand, vehicleModel, vehicleSpecCode, chassisNo, speedLimit, licensePlateNo, licensePlace, licenseDate, customerId) => dispatch(VehicleActions.setAddVehicle(FleetName, vehicleName, vehicleBrand, vehicleModel, vehicleSpecCode, chassisNo, speedLimit, licensePlateNo, licensePlace, licenseDate, customerId)),
  setAddVehicleSuccess2: () => dispatch(VehicleActions.setAddVehicleSuccess2())
  // setTest: test => dispatch(PopupActions.setTest(test))
});

export default connect(mapStateToProps, mapDispatchToProps)(VehicleForm)





import React, {Component, useState} from 'react'
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
import './custom.css'
import DetailTemplate from './DetailTemplate.js';
import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css'
import service from './data.js';
import DataGrid, { Column, FilterRow, HeaderFilter, SearchPanel, Grouping, GroupPanel, Paging, Export, Selection, MasterDetail, Editing } from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import { states } from './data.js';
import { throwStatement } from '@babel/types';
import { HashRouter } from  'react-router-dom';
import moment from 'moment'
import 'moment/locale/th'
import VehicleActions from "../../Redux/VehicleRedux";
import SaveButton from "../../Components/SaveButton";
import CancelButton from "../../Components/CancelButton";
import PannelBox from "../../Components/PannelBox";
import JsonSchema from "react-jsonschema-form";
// import FormSchema from "../../Components/FormSchema";
// import Alert from "reactstrap/es/Alert";

class VehicleForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            lang: 'en',
            // dataDefault: {
                img: null,
                titleFormType: 'add',
                vinNo: '',
                vehicleName: '',
                vehicleBrand: '',
                vehicleModel: '',
                vehicleSpecCode: '',
                vehicleOrderingModel: '',
                chassisNo: '',
                engineNo: '',
                hinoVehicleType: '',
                hinoBodyType: '',
                OLTVehicleType: '',
                DLTVehicleType: '',
                DLTBodyType: '',
                speedLimit: '',
                licensePlateNo: '',
                licensePlace: '',
                licensePlateDate: '',
                bodyColor: '',
                sellerCode: '',
                customerId: '',
                warrantyStartDate: '',
                warrantyEndDate: '',
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
                {
                    en: "Vehicle Model",
                    th: "รหัสตัวแทนจำหน่าย",
                    id: "vehicleModel",
                    value: "",
                    type: "text",
                },
                {
                    en: "Vehicle Spec Code",
                    th: "รหัสตัวแทนจำหน่าย",
                    id: "vehicleSpecCode",
                    value: "",
                    type: "text",
                },
                {
                    en: "Vehicle Ordering Model",
                    th: "รหัสตัวแทนจำหน่าย",
                    id: "vehicleOrderingModel",
                    value: "",
                    type: "text",
                },
                {
                    en: "Chassis No",
                    th: "รหัสตัวแทนจำหน่าย",
                    id: "Chassis No",
                    value: "",
                    type: "text",
                },
                {
                    en: "Engine No",
                    th: "รหัสตัวแทนจำหน่าย",
                    id: "engineNo",
                    value: "",
                    type: "text",
                },
                {
                    en: "HINO Vehicle Type",
                    th: "รหัสตัวแทนจำหน่าย",
                    id: "hinoVehicleType",
                    value: "",
                    type: "text",
                },
                {
                    en: "HINO Body Type",
                    th: "รหัสตัวแทนจำหน่าย",
                    id: "hinoBodyType",
                    value: "",
                    type: "text",
                },
                {
                    en: "OLT Vehicle Type",
                    th: "รหัสตัวแทนจำหน่าย",
                    id: "OLTVehicleType",
                    value: "",
                    type: "text",
                },
                {
                    en: "DLT Vehicle Type",
                    th: "รหัสตัวแทนจำหน่าย",
                    id: "DLTVehicleType",
                    value: "",
                    type: "text",
                },
                {
                    en: "DLT Body Type",
                    th: "รหัสตัวแทนจำหน่าย",
                    id: "DLTBodyType",
                    value: "",
                    type: "text",
                },
                {
                    en: "Speed Limit",
                    th: "รหัสตัวแทนจำหน่าย",
                    id: "speedLimit",
                    value: "",
                    type: "text",
                },
                {
                    en: "Body Color",
                    th: "รหัสตัวแทนจำหน่าย",
                    id: "bodyColor",
                    value: "",
                    type: "text",
                },
                {
                    en: "Seller Code",
                    th: "รหัสตัวแทนจำหน่าย",
                    id: "sellerCode",
                    value: "",
                    type: "text",
                },
                {
                    en: "Customer Id",
                    th: "รหัสตัวแทนจำหน่าย",
                    id: "customerId",
                    value: "",
                    type: "text",
                },
                {
                    en: "Warranty Start Date",
                    th: "รหัสตัวแทนจำหน่าย",
                    id: "warrantyStartDate",
                    value: "",
                    type: "text",
                },
                {
                    en: "Warranty End",
                    th: "รหัสตัวแทนจำหน่าย",
                    id: "warrantyEndDate",
                    value: "",
                    type: "date",
                },
            ],
            formVehicleInfo: [
                {
                    en: "VIN No",
                    th: "รหัส VIN",
                    id: "vinNo",
                    value: "",
                    type: "text",
                },
                {
                    en: "Vehicle Owner",
                    th: "เจ้าของรถ",
                    id: "vinNo",
                    value: "",
                    type: "text",
                },
                {
                    en: "Vehicle Name",
                    th: "ชื่อรถ ของลูกค้า",
                    id: "vehicleName",
                    value: "",
                    type: "text",
                },
                {
                    en: "Driver",
                    th: "คนขับ",
                    id: "driver",
                    value: "",
                    type: "text",
                },
                {
                    en: "Dealer Full Name",
                    th: "ชื่อตัวแทนจำหน่าย",
                    id: "dealerFullName",
                    value: "",
                    type: "text",
                },
                {
                    en: "Purchase Date",
                    th: "วันที่ซื้อ",
                    id: "purchaseDate",
                    value: "",
                    type: "text",
                },

                {
                    en: "License Date",
                    th: "วันที่จดทะเบียน",
                    id: "licenseDate",
                    value: "",
                    type: "text",
                },
                {
                    en: "License Plate",
                    th: "หมายเลขทำเบัยนรถ",
                    id: "licensePlate",
                    value: "",
                    type: "text",
                },
                {
                    en: "License Place",
                    th: "รหัสตัจังหวัด/สถานที่จดทะเบีนน",
                    id: "licensePlace",
                    value: "",
                    type: "text",
                },
                {
                    en: "Vehicle Type by Law",
                    th: "ประเภทจามกฎหมาย",
                    id: "vehicleTypeByLaw",
                    value: "",
                    type: "text",
                },
                {
                    en: "Vehicle Type by Book",
                    th: "ลักษณะรถตามทะเบียนจำหน่าย",
                    id: "vehicleTypeByBook",
                    value: "",
                    type: "text",
                },
                {
                    en: "Pre-sale Mileage",
                    th: "ระยะทาง(กิโลเมตร)ก่อนจำหน่าย",
                    id: "preSaleMileage",
                    value: "",
                    type: "text",
                },
                {
                    en: "Vehicle Type",
                    th: "ประเภทรถ",
                    id: "vehicleType",
                    value: "",
                    type: "text",
                },
                {
                    en: "Status",
                    th: "สถานะรถ",
                    id: "status",
                    value: "",
                    type: "text",
                },
                {
                    en: "Is Temporary Plate",
                    th: "ป้ายแดง",
                    id: "isTemporaryPlate",
                    value: "",
                    type: "text",
                },
                {
                    en: "Require Certificate",
                    th: "ต้องการหนังสือรับรองจากขน",
                    id: "requireCertificate",
                    value: "",
                    type: "text",
                },
                {
                    en: "Upload",
                    th: "รูปภาพ",
                    id: "upload",
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
                {
                    en: "Brand",
                    th: "ยี่ห้อ",
                    id: "brand",
                    value: "",
                    type: "text",
                },
                {
                    en: "Model",
                    th: "รุ่นรถ",
                    id: "model",
                    value: "",
                    type: "text",
                },
                {
                    en: "Color",
                    th: "สีรถ",
                    id: "color",
                    value: "",
                    type: "text",
                },
                {
                    en: "Body Type",
                    th: "ประเภทตัวถัง",
                    id: "bodyType",
                    value: "",
                    type: "text",
                },
                {
                    en: "Spec Code",
                    th: "รหัส Spec",
                    id: "specCode",
                    value: "",
                    type: "text",
                },
                {
                    en: "Fuel Tank Size",
                    th: "ขนาดถังน้ำมัน (ลิตร)",
                    id: "fuelTankSize",
                    value: "",
                    type: "text",
                },
                {
                    en: "Speed Limit",
                    th: "จำกัดความเร็ว(กิโลเมตร/ชั่วโมง)",
                    id: "speedLimit",
                    value: "",
                    type: "text",
                },
                {
                    en: "Tire",
                    th: "ยางล้อ",
                    id: "tire",
                    value: "",
                    type: "text",
                },
                {
                    en: "Axle",
                    th: "เพลา",
                    id: "axle",
                    value: "",
                    type: "text",
                },
            ],
            formInsurance: [
                {
                    en: "Insurance Company",
                    th: "บริษัทประกัน",
                    id: "insuranceCompany",
                    value: "",
                    type: "text",
                },
                {
                    en: "Insurance Number",
                    th: "เลขที่กรรมธรรม์",
                    id: "insuranceNumber",
                    value: "",
                    type: "text",
                },
                {
                    en: "Insurance Premium Rate",
                    th: "ไม่รู้",
                    id: "speedLimit",
                    value: "",
                    type: "text",
                },
                {
                    en: "Insurance Type",
                    th: "ประเภทกรรมธรรณ์",
                    id: "insuranceType",
                    value: "",
                    type: "text",
                },
                {
                    en: "Start Date",
                    th: "วันเริ่มกรมธรรณ์",
                    id: "startDate",
                    value: "",
                    type: "text",
                },
                {
                    en: "End Date",
                    th: "วันสิ้นสุดกรมธรรณ์",
                    id: "endDate",
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
        console.log(item.id + this.state.dataDefault[item.id])
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
        console.log(id, value)
        console.log('-------------------- Set Value Function ------------------')
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
        if (this.props.error === null && this.props.success === "addSuccess" && this.props.status === null){
            // this.props.setAddVehicleSuccess2()
            this.props.history.push('/vehicle')
        }
        if (this.state.error) {
            this.setState({visibility: true})
        }
        console.log(this.state.vinNo)
        console.log(this.state.chassisNo)
        console.log(this.state.licensePlateDate)

        // console.log(this.props.formData)
        // console.log(this.formData)
    }

    addForm() {
        // this.showForm(true);
        this.setState({titleFormType:'Add'});
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
        if (this.state.vinNo && this.state.chassisNo && this.state.licensePlateDate) {
            console.log('saving...')
            this.props.setAddVehicle(this.state.vinNo, this.state.vehicleName, this.state.vehicleBrand, this.state.vehicleModel, this.state.vehicleSpecCode, this.state.chassisNo, this.state.speedLimit, this.state.licensePlateNo, this.state.licensePlace, this.state.licensePlateDate, this.state.customerId)
        }
        else {
            console.log('cant save')
            console.log(this.state.vinNo)
            console.log(this.state.chassisNo)
            console.log(this.state.licensePlateDate)
            this.setState({alerts: 'กรุณากรอก Vin No , Chassis No , License Plate Date', visibility: true})
        }
    }

    onClickCancel = () => {
        this.props.history.push('/vehicle')

    }

    render() {
        /*<JsonSchema schema={this.state.schema} uiSchema={this.state.uiSchema}/>*/
        /*<FormSchema schema={this.state.schema} uiSchema={this.state.uiSchema}/>*/
        return (

            <div className="contrainner">
                <div className="ibox float-e-margins">
                    <div className="ibox-title">
                        <div className="form-horizontal">
                            <h3>Add Vehicle</h3>
                            <div className="ibox-content">
                                <Alert isOpen={this.state.visibility} fade={false} color='danger'>{this.state.alerts}</Alert>
                                <div className="hr-line-dashed"></div>
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">VIN No : <Label style={{color:'red'}}>*</Label></Label>
                                            <Col lg="8">
                                                <Input className="form-control" type="number" value={this.state.vinNo} onChange={(e) => this.setState({vinNo: e.target.value})}/>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">Speed Limit :</Label>
                                            <Col lg="8">
                                                <Input className="form-control" type="number" value={this.state.speedLimit} onChange={(e) => this.setState({speedLimit: e.target.value})}/>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">Vehicle Name :</Label>
                                            <Col lg="8">
                                                <Input className="form-control" value={this.state.vehicleName} onChange={(e) => this.setState({vehicleName: e.target.value})}/>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">License Plate No :</Label>
                                            <Col lg="8">
                                                <Input className="form-control" value={this.state.licensePlateNo} onChange={(e) => this.setState({licensePlateNo: e.target.value})}/>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">Vehicle Brand :</Label>
                                            <Col lg="8">
                                                <Input className="form-control" value={this.state.vehicleBrand} onChange={(e) => this.setState({vehicleBrand: e.target.value})}/>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">License Place :</Label>
                                            <Col lg="8">
                                                <Input className="form-control" value={this.state.licensePlace} onChange={(e) => this.setState({licensePlace: e.target.value})}/>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">Vehicle Model :</Label>
                                            <Col lg="8">
                                                <Input className="form-control" value={this.state.vehicleModel} onChange={(e) => this.setState({vehicleModel: e.target.value})}/>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">License Date : <Label style={{color:'red'}}>*</Label></Label>
                                            <Col lg="8">
                                                <Input type="date" className="form-control" value={this.state.licensePlateDate} onChange={(e) => this.setState({licensePlateDate: e.target.value})}/>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">Vehicle Spec Code :</Label>
                                            <Col lg="8">
                                                <Input className="form-control" value={this.state.vehicleSpecCode} onChange={(e) => this.setState({vehicleSpecCode: e.target.value})}/>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">Body Color :</Label>
                                            <Col lg="8">
                                                <Input className="form-control" value={this.state.bodyColor} onChange={(e) => this.setState({bodyColor: e.target.value})}/>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">Vehicle Ordering Model :</Label>
                                            <Col lg="8">
                                                <Input className="form-control" value={this.state.vehicleOrderingModel} onChange={(e) => this.setState({vehicleOrderingModel: e.target.value})}/>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">SellerCode :</Label>
                                            <Col lg="8">
                                                <Input className="form-control" value={this.state.sellerCode} onChange={(e) => this.setState({sellerCode: e.target.value})}/>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">Chassis No : <Label style={{color:'red'}}>*</Label></Label>
                                            <Col lg="8">
                                                <Input className="form-control" type="number" value={this.state.chassisNo} onChange={(e) => this.setState({chassisNo: e.target.value})}/>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">Customer ID :</Label>
                                            <Col lg="8">
                                                <Input className="form-control" type="number" value={this.state.customerId} onChange={(e) => this.setState({customerId: e.target.value})}/>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">Engine No :</Label>
                                            <Col lg="8">
                                                <Input className="form-control" type="number" value={this.state.engineNo} onChange={(e) => this.setState({engineNo: e.target.value})}/>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">Warranty Start Date :</Label>
                                            <Col lg="8">
                                                <Input type="date" className="form-control" value={this.state.warrantyStartDate} onChange={(e) => this.setState({warrantyStartDate: e.target.value})}/>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">HINO Vehicle Type :</Label>
                                            <Col lg="8">
                                                <Input className="form-control" value={this.state.hinoVehicleType} onChange={(e) => this.setState({hinoVehicleType: e.target.value})}/>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">Warranty End Date :</Label>
                                            <Col lg="8">
                                                <Input type="date" className="form-control" value={this.state.warrantyEndDate} onChange={(e) => this.setState({warrantyEndDate: e.target.value})}/>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">HINO Body Type :</Label>
                                            <Col lg="8">
                                                <Input className="form-control" value={this.state.hinoBodyType} onChange={(e) => this.setState({hinoBodyType: e.target.value})}/>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6"/>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">OLT Vehicle Type :</Label>
                                            <Col lg="8">
                                                <Input className="form-control" value={this.state.OLTVehicleType} onChange={(e) => this.setState({OLTVehicleType: e.target.value})}/>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6"/>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">DLT Vehicle Type :</Label>
                                            <Col lg="8">
                                                <Input className="form-control" value={this.state.DLTVehicleType} onChange={(e) => this.setState({DLTVehicleType: e.target.value})}/>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6"/>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">DLT Body Type :</Label>
                                            <Col lg="8">
                                                <Input className="form-control" value={this.state.DLTBodyType} onChange={(e) => this.setState({DLTBodyType: e.target.value})}/>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6"/>
                                </Row>

                                {/*<GenerateForm formJson={this.state.formVehicleInfo} />*/}
                                {/*// </div>*/}
                                <Row style={{ textAlign: "right" }}>
                                    {/*<span style={{ color: 'red' }}>{this.props.error}</span>*/}
                                    {/*<Button className="ladda-button btn btn-primary" style={{ width: 100 }} data-style="slide-left" onClick={() => this.onClickSave()} disabled={this.props.loading} data-loading={this.props.loading}>*/}
                                    {/*    <span className="ladda-label">Save</span>*/}
                                    {/*    <span className="ladda-spinner"></span>*/}
                                    {/*</Button>*/}
                                    <CancelButton onClick={() =>this.onClickCancel()} loading={false}/>
                                    {' '}
                                    <SaveButton onClick={() => this.onClickSave()} loading={this.props.loading}/>

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
    setAddVehicle: ( vinNo, vehicleName, vehicleBrand, vehicleModel, vehicleSpecCode, chassisNo, speedLimit, licensePlateNo, licensePlace, licenseDate, customerId ) => dispatch(VehicleActions.setAddVehicle( vinNo, vehicleName, vehicleBrand, vehicleModel, vehicleSpecCode, chassisNo, speedLimit, licensePlateNo, licensePlace, licenseDate, customerId )),
    setAddVehicleSuccess2: () => dispatch(VehicleActions.setAddVehicleSuccess2())
    // setTest: test => dispatch(PopupActions.setTest(test))
});

export default connect(mapStateToProps,mapDispatchToProps)(VehicleForm)





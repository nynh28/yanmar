import React, {Component, useState} from 'react'
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
import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css'
import service from './data.js';
import { Item } from 'devextreme-react/form';
import { states } from './data.js';
import { throwStatement } from '@babel/types';
import { HashRouter } from  'react-router-dom';
import moment from 'moment'
import 'moment/locale/th'
import UserSettingActions from "../../Redux/UserSettingRedux";
import SaveButton from "../../Components/SaveButton";
import CancelButton from "../../Components/CancelButton";
import UserSetting from "./UserSetting";
// import FormSchema from "../../Components/FormSchema";

class GroupSettingAdd extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            fullname: '',
            aliasName: '',
            email: '',
            temporaryPassword: '',
            businessPartnerId: this.props.businessPartnerId,
            suffixRoleName: '',
            alerts: this.props.error,
            visibility: false,
            role: this.props.role,
            i: 2
        }


    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.error === null && this.props.success === "addSuccess" && this.props.status === null){
            // this.props.setAddVehicleSuccess2()
            this.props.history.push('/vehicle')
        }
        if (this.state.error) {
            this.setState({visibility: true})
        }

        // if (this.props.role) {
        //     console.log(this.props.role)
        //
        // }
        // console.log(this.state.vinNo)
        // console.log(this.state.chassisNo)
        // console.log(this.state.licensePlateDate)


        console.log(this.state)
    }

    componentDidMount() {
        if (this.props.groupType == 'Hino'){
            this.setState({i:1})
        }
        var role = this.props.role.map((i) => <option>{i.roleName.split('_')[2]}</option>)
        // var suffixRole = role.map((i) => <option>i.roleName<option>)

        console.log(role)
        this.setState({role:role})
        // this.props.setVehicleSuccess()
        // console.log(this.state.modal)
    }


    onClickSave = () => {
        // console.log(this.state.customerId)
        if (this.state.username && this.state.fullname && this.state.aliasName && this.state.email && this.state.temporaryPassword && this.state.businessPartnerId && this.state.suffixRoleName ) {
            console.log('saving...')
            this.props.addUser({type:this.props.groupType,id:this.props.businessPartnerId,userRequest:{username:this.state.username, fullname:this.state.fullname, aliasName:this.state.aliasName, email:this.state.email, temporaryPassword:this.state.temporaryPassword, businessPartnerId:this.state.businessPartnerId, suffixRoleName:this.state.suffixRoleName}})
        }
        else {
            console.log('cant save')
            console.log(this.state.username , this.state.fullname , this.state.aliasName , this.state.email , this.state.temporaryPassword , this.state.businessPartnerId , this.suffixRoleName )
            // console.log(this.state.chassisNo)
            // console.log(this.state.licensePlateDate)
            this.setState({alerts: 'กรุณากรอก Vin No , Chassis No , License Plate Date', visibility: true})
        }
    }

    onClickCancel = () => {
        this.props.history.push('/UserSetting')

    }

    render() {
        /*<JsonSchema schema={this.state.schema} uiSchema={this.state.uiSchema}/>*/
        /*<FormSchema schema={this.state.schema} uiSchema={this.state.uiSchema}/>*/
        return (
            <div className="contrainner">
                <div className="ibox float-e-margins">
                    <div className="ibox-title">
                        <div className="form-horizontal">
                            <h3>Add User</h3>
                            <div className="ibox-content">
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">Username : <Label style={{color:'red'}}>*</Label></Label>
                                            <Col lg="8">
                                                <Input className="form-control" type="string" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})}/>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">Fullname : <Label style={{color:'red'}}>*</Label></Label>
                                            <Col lg="8">
                                                <Input className="form-control" type="string" value={this.state.fullname} onChange={(e) => this.setState({fullname: e.target.value})}/>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">Alias Name : <Label style={{color:'red'}}>*</Label></Label>
                                            <Col lg="8">
                                                <Input className="form-control" type="string" value={this.state.aliasName} onChange={(e) => this.setState({aliasName: e.target.value})}/>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">Email : <Label style={{color:'red'}}>*</Label></Label>
                                            <Col lg="8">
                                                <Input className="form-control" type="string" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">Temporary Password : <Label style={{color:'red'}}>*</Label></Label>
                                            <Col lg="8">
                                                <Input className="form-control" type="password" value={this.state.temporaryPassword} onChange={(e) => this.setState({temporaryPassword: e.target.value})}/>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">Business Partner Id :</Label>
                                            <Col lg="8">
                                                <Input className="form-control" type="number" value={this.state.businessPartnerId} disabled={true}/>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label lg="4" className="control-label">Suffix Role Name : <Label style={{color:'red'}}>*</Label></Label>
                                            <Col lg="6">
                                                <Input type="select" name="select"
                                                       value={this.state.suffixRoleName}
                                                       onChange={(e) => this.setState({suffixRoleName: e.target.value})}>
                                                    <option value="">--- โปรดเลือก ---</option>
                                                    {/*<option value="50">หน่วยงานรัฐ</option>
                                                    <option value="60">รัฐวิสาหกิจ</option>
                                                    <option value="71">บริษัทมหาชน</option>
                                                    <option value="72">บริษัทจำกัด</option>
                                                    <option value="73">ห้างหุ้นส่วน</option>
                                                    <option value="74">สหกรณ์</option>
                                                    <option value="75">มูลนิธิ</option>*/}
                                                    {/*{this.props.role.map(({roleName}) => <option value={roleName.split('_').length(2)}>{roleName.split('_').length(2)}</option>)}*/}
                                                    {this.props.role.map((i) => <option value={i.roleName.split('_')[this.state.i]}>{i.roleName.split('_')[this.state.i]}</option>)}
                                                    {
                                                        // this.state.role.map((i) => <option value={i.roleName.split('_').length(2)}>{i.roleName.split('_').length(2)}</option>)
                                                    }
                                                </Input>
                                                {/*<Input className="form-control" type="dropdown" value={this.state.suffixRoleName} onChange={(e) => this.setState({suffixRoleName: e.target.value})}/>*/}
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
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
    role: state.userSetting.role,
    groupType: state.signin.groupType,
    businessPartnerId: state.signin.businessPartnerId
    // loading: state.vehicle.loading,
    // vehicle: state.vehicle.vehicle,
    // error: state.vehicle.error,
    // success: state.vehicle.success,
    // status: state.vehicle.status,
    // userData: state.login.userData,
    //   test: state.popup.test,
    // messageError: state.login.messageError,
    // data: state.login.data
});

const mapDispatchToProps = (dispatch) => ({
    addUser: (getData) => dispatch(UserSettingActions.addUser(getData))
    // setListVehicle: () => dispatch(VehicleActions.setListVehicle()),
    // setAddVehicle: ( vinNo, vehicleName, vehicleBrand, vehicleModel, vehicleSpecCode, chassisNo, speedLimit, licensePlateNo, licensePlace, licenseDate, customerId ) => dispatch(VehicleActions.setAddVehicle( vinNo, vehicleName, vehicleBrand, vehicleModel, vehicleSpecCode, chassisNo, speedLimit, licensePlateNo, licensePlace, licenseDate, customerId )),
    // setAddVehicleSuccess2: () => dispatch(VehicleActions.setAddVehicleSuccess2())
    // setTest: test => dispatch(PopupActions.setTest(test))
});

export default connect(mapStateToProps,mapDispatchToProps)(GroupSettingAdd)





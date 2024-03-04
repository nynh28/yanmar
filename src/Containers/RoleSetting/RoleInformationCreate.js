import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import { connect } from 'react-redux'
import PannelBoxWithButton from '../../Components/PannelBoxWithButton'
import SaveButton from '../../Components/SaveButton'
import FormGenerator from '../../Components/FormGenerator/FormRow'
// import { Row } from 'devextreme-react/responsive-box'
import { Button, Col, FormGroup, Label, Input, Row } from 'reactstrap';
import LaddaButton, { S, SLIDE_LEFT } from 'react-ladda';
import RoleSettingActions from '../../Redux/RoleSettingRedux'
import {
    TextArea
} from 'devextreme-react';
import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css'
import DataGrid, { RemoteOperations, Column, ColumnChooser, Pager, FilterRow, HeaderFilter, SearchPanel, Grouping, GroupPanel, Paging, Export, Selection, MasterDetail, Editing } from 'devextreme-react/data-grid';
import DataGridView from '../../Components/DataGridView'
import { Item } from 'devextreme-react/form';

class RoleInformationCreate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            language: this.props.language,
            information: {
                en: 'Information',
                th: 'รายละเอีียด',
                jp: 'Information',
            },
            permission: {
                en: 'Permission',
                th: 'สิทธิ์การเข้าถึง',
                jp: 'Permission',
            },
            user: {
                en: 'User',
                th: 'ผู้ใช้งาน',
                jp: 'User',
            },
            search: {
                en: 'Search',
                th: 'ค้นหา',
                jp: 'Search',
            },
            result: {
                en: 'Result',
                th: 'ผลลัพธ์',
                jp: 'Result',
            },
            edit: {
                en: 'Edit',
                th: 'แก้ไข',
                jp: 'Edit',
            },
            delete: {
                en: 'Delete',
                th: 'ลบ',
                jp: 'Delete',
            },
            save: {
                en: 'Save',
                th: 'บันทึก',
                jp: 'Save'
            },
            add: {
                en: 'Add', th: 'เพิ่ม', jp: 'Add',
            },
            tableView: {
                en: 'Table View', th: 'แสดงตาราง', jp: 'Table View',
            },
            reset: {
                en: 'Reset',
                th: 'ล้าง',
                jp: 'Reset',
            }, setting: {
                en: 'Setting', th: 'การตั้งค่า', jp: 'Setting'
            }, userPermission: {
                en: 'User & Permission', th: 'ผู้ใช้งานและสิทธิ์', jp: 'User & Permission',
            }, function: {
                en: '{Function Name}', th: 'ชื่อฟังก์ชั่น', jp: '{Function Name}',
            },




            formInformation1: {
                "title": "Search",
                "showHeaderTitle": false,
                "formName": "search",
                "girdFormColumn": 1,
                "fieldRow": [
                    {
                        "properties": {
                            "partnerType": {
                                "type": "select",
                                "title": "Partner Type",
                                "required": true,
                                "selectOption": [
                                    {
                                        "value": "1",
                                        "name": "--- Please Select ---"
                                    },
                                    {
                                        "value": "onelink",
                                        "name": "Onelink"
                                    },
                                    {
                                        "value": "hino",
                                        "name": "Hino Connect"
                                    },
                                    {
                                        "value": "dealer",
                                        "name": "Dealer"
                                    },
                                    {
                                        "value": "customer",
                                        "name": "Customer"
                                    },
                                ]
                            },
                        },

                    },
                    {
                        "properties": {
                            "Role Name": {
                                "type": "string",
                                "title": "Role Name",
                                "required": true,
                                "maxLength": 100
                            }
                        }
                    },
                    {
                        "properties": {
                            "active": {
                                "type": "radio",
                                "title": "Active",
                                "required": true,
                                "radioButton": [
                                    {
                                        "checked": true,
                                        "value": true,
                                        "name": "Yes"
                                    },
                                    {
                                        "checked": false,
                                        "value": false,
                                        "name": "No"
                                    }
                                ]
                            },
                        }
                    },
                ]
            },
            formInformation2: {
                "title": "Search",
                "showHeaderTitle": false,
                "formName": "search2",
                "girdFormColumn": 1,
                "fieldRow": [
                    {
                        "properties": {
                            "partner": {
                                "type": "select",
                                "title": "Partner",
                                "required": true,
                                "selectOption": [
                                    {
                                        "value": "1",
                                        "name": "--- All ---"
                                    },
                                    {
                                        "value": "partner1",
                                        "name": "Partner1"
                                    },
                                    {
                                        "value": "partner2",
                                        "name": "Partner2"
                                    },
                                    {
                                        "value": "partner3",
                                        "name": "Partner3"
                                    },
                                ]
                            }
                        }
                    },

                    {
                        "properties": {
                            "master": {
                                "type": "radio",
                                "title": "Master",
                                "required": true,
                                "radioButton": [
                                    {
                                        "checked": false,
                                        "value": true,
                                        "name": "Yes"
                                    },
                                    {
                                        "checked": true,
                                        "value": false,
                                        "name": "No"
                                    }
                                ]
                            },
                        }
                    },
                ]
            },


            formPermission1: {
                "title": "Setting1",
                "showHeaderTitle": false,
                "formName": "setting1",
                "girdFormColumn": 1,
                "fieldRow": [
                    {
                        "properties": {
                            "passwordPolicy": {
                                "type": "radio",
                                "title": "Password Policy",
                                "required": true,
                                "radioButton": [
                                    {
                                        "checked": true,
                                        "value": "none",
                                        "name": "None"
                                    },
                                    {
                                        "checked": false,
                                        "value": "manage",
                                        "name": "Manage"
                                    }
                                ]
                            },
                        }
                    },
                    {
                        "properties": {
                            "concurrentPolicy": {
                                "type": "radio",
                                "title": "Concurrent Policy",
                                "required": true,
                                "radioButton": [
                                    {
                                        "checked": true,
                                        "value": "none",
                                        "name": "None"
                                    },
                                    {
                                        "checked": false,
                                        "value": 'manage',
                                        "name": "Manage"
                                    }
                                ]
                            },
                        }
                    },
                ]
            },


            formPermission2: {
                "title": "User & permission1",
                "showHeaderTitle": false,
                "formName": "user & permission1",
                "girdFormColumn": 1,
                "fieldRow": [
                    {
                        "properties": {
                            "manageRole": {
                                "type": "radio",
                                "title": "Manage Role",
                                "required": true,
                                "radioButton": [
                                    {
                                        "checked": true,
                                        "value": "none",
                                        "name": "None"
                                    },
                                    {
                                        "checked": false,
                                        "value": "view",
                                        "name": "View"
                                    },
                                    {
                                        "checked": false,
                                        "value": "manage",
                                        "name": "Manage"
                                    }
                                ]
                            },
                        }
                    },

                    {
                        "properties": {
                            "manageUser": {
                                "type": "radio",
                                "title": "Manage User",
                                "required": true,
                                "radioButton": [
                                    {
                                        "checked": true,
                                        "value": "none",
                                        "name": "None"
                                    },
                                    {
                                        "checked": false,
                                        "value": "view",
                                        "name": "View"
                                    },
                                    {
                                        "checked": false,
                                        "value": "manage",
                                        "name": "Manage"
                                    }
                                ]
                            },
                        }
                    },

                    {
                        "properties": {
                            "activeUser": {
                                "type": "radio",
                                "title": "Active User",
                                "required": true,
                                "radioButton": [
                                    {
                                        "checked": true,
                                        "value": "none",
                                        "name": "None"
                                    },
                                    {
                                        "checked": false,
                                        "value": "manage",
                                        "name": "Manage"
                                    }
                                ]
                            },
                        }
                    },

                    {
                        "properties": {
                            "unlockUser": {
                                "type": "radio",
                                "title": "Unlock User",
                                "required": true,
                                "radioButton": [
                                    {
                                        "checked": true,
                                        "value": "none",
                                        "name": "None"
                                    },
                                    {
                                        "checked": false,
                                        "value": "manage",
                                        "name": "Manage"
                                    }
                                ]
                            },
                        }
                    },

                    {
                        "properties": {
                            "resetPassword": {
                                "type": "radio",
                                "title": "Reset Password",
                                "required": true,
                                "radioButton": [
                                    {
                                        "checked": true,
                                        "value": "none",
                                        "name": "None"
                                    },
                                    {
                                        "checked": false,
                                        "value": "manage",
                                        "name": "Manage"
                                    }
                                ]
                            },
                        }
                    },
                ]
            },

            formPermission3: {
                "title": "Function Name",
                "showHeaderTitle": false,
                "formName": "function name",
                "girdFormColumn": 1,
                "fieldRow": [
                    {
                        "properties": {
                            "actionName": {
                                "type": "radio",
                                "title": "Action Name",
                                "required": true,
                                "radioButton": [
                                    {
                                        "checked": true,
                                        "value": "actionLevelName1",
                                        "name": "Action Level Name1"
                                    },
                                    {
                                        "checked": false,
                                        "value": "actionLevelName2",
                                        "name": "Action Level Name2"
                                    },

                                ]
                            },
                        }
                    },
                ]
            },
            formTableView: {
                "title": "Search",
                "showHeaderTitle": false,
                "formName": "search2",
                "girdFormColumn": 1,
                "fieldRow": [
                    {
                        "properties": {
                            "tableView": {
                                "type": "select",
                                "title": "Table View",
                                // "required": true,
                                "selectOption": [
                                    {
                                        "value": "1",
                                        "name": "--- Please Select ---"
                                    },
                                    {
                                        "value": "standard",
                                        "name": "Standard"
                                    },
                                    {
                                        "value": "medium",
                                        "name": "Medium"
                                    },
                                    {
                                        "value": "normal",
                                        "name": "Normal"
                                    },
                                ]
                            },
                        },

                    },
                ]
            },
        }

    };



    componentDidMount() {
        // console.log(this.props.userGroup)  // => IotSystem
        // console.log(this.props.groupType)  // => Hino
        // console.log('---------------------- Did Mount New Role Settings --------------------')
    }


    render() {



        const { component: Component, ...rest } = this.props
        let data = [
            { id: 1, roleName: "hino admin", master: "truck", totalUser: 15, action: 'truck driver' },
            { id: 2, roleName: "driver", master: "super truck", totalUser: 5, action: 'super truck driver' },
            { id: 3, roleName: "dealer", master: "bussiness requirement", totalUser: 22, action: 'bussiness input' },
            { id: 4, roleName: "partner", master: "contact requirement", totalUser: 5, action: 'bussiness partner' },
        ]
        console.log('--------------- New Role Information Create Screen -------------------')
        return (
            <div>

               
                    <PannelBoxWithButton title={this.state.information[this.props.language]}
                    // enableFirstButton={true}
                    // firstFunction={() => console.log('----------- SEARCH BUTTON -----------------')}
                    // firstText={this.state.search[this.props.language]}
                    // firstIcon={"fas fa-search"} 
                    >
                        <Row>
                            <Col lg={6}>
                                <FormGenerator schema={this.state.formInformation1} />
                            </Col>
                            <Col lg={6}>
                                <FormGenerator schema={this.state.formInformation2} />
                            </Col>

                        </Row>
                        <div className="row" style={{ textAlign: "right" }}>
                            <LaddaButton
                                id="reset"
                                loading={false}
                                onClick={() => { console.log('------------------ Reset Button ------------------') }}
                                data-color="#eee"
                                data-size={S} data-style={SLIDE_LEFT} data-spinner-size={30} data-spinner-color="#ddd"
                                data-spinner-lines={12}
                                style={{ backgroundColor: '#A5A8AA', borderRadius: 2.5, marginRight: 10 }}
                            >
                                <div>
                                    {this.state.reset[this.props.language]}</div>

                            </LaddaButton>

                            <LaddaButton
                                id="save"
                                loading={false}
                                onClick={() => { console.log('------------------ Save Button ------------------') }}
                                data-color="#eee"
                                data-size={S} data-style={SLIDE_LEFT} data-spinner-size={30} data-spinner-color="#ddd"
                                data-spinner-lines={12}
                                style={{ backgroundColor: '#1ab394', borderRadius: 2.5, marginRight: 10 }}
                            > <div>
                                    {this.state.save[this.props.language]}</div>
                            </LaddaButton>
                        </div>
                    </PannelBoxWithButton>
             


            
                    <PannelBoxWithButton title={this.state.permission[this.props.language]} {...rest}>
                        <Row>
                            <Col lg={8}>
                                <Label lg="4" className="control-label">{this.state.setting[this.props.language]}</Label>
                                <FormGenerator schema={this.state.formPermission1} />
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={8}>
                                <Label lg="4" className="control-label">{this.state.userPermission[this.props.language]}</Label>
                                <FormGenerator schema={this.state.formPermission2} />
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={8}>
                                <Label lg="4" className="control-label">{this.state.function[this.props.language]}</Label>
                                <FormGenerator schema={this.state.formPermission3} />
                            </Col>
                        </Row>
                        <div className="row" style={{ textAlign: "right" }}>
                            <LaddaButton
                                id="reset"
                                loading={false}
                                onClick={() => { console.log('------------------ Reset Button ------------------') }}
                                data-color="#eee"
                                data-size={S} data-style={SLIDE_LEFT} data-spinner-size={30} data-spinner-color="#ddd"
                                data-spinner-lines={12}
                                style={{ backgroundColor: '#A5A8AA', borderRadius: 2.5, marginRight: 10 }}
                            >
                                <div>
                                    {this.state.reset[this.props.language]}</div>

                            </LaddaButton>

                            <LaddaButton
                                id="save"
                                loading={false}
                                onClick={() => { console.log('------------------ Save Button ------------------') }}
                                data-color="#eee"
                                data-size={S} data-style={SLIDE_LEFT} data-spinner-size={30} data-spinner-color="#ddd"
                                data-spinner-lines={12}
                                style={{ backgroundColor: '#1ab394', borderRadius: 2.5, marginRight: 10 }}
                            > <div>
                                    {this.state.save[this.props.language]}</div>
                            </LaddaButton>
                        </div>
                    </PannelBoxWithButton>
             

             
                    <PannelBoxWithButton title={this.state.user[this.props.language]}
                        enableFirstButton={true}
                        firstFunction={() => console.log('--------------- Add User Button  ------------------------')}
                        firstText={this.state.add[this.props.language]}
                        firstIcon={"fas fa-plus"} >
                        <Row>
                            <Col lg={6}></Col>
                            <Col lg={6}>
                                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <FormGenerator schema={this.state.formTableView} />

                                    <LaddaButton
                                        id="save"
                                        loading={false}
                                        onClick={() => { console.log('------------------ Save Button ------------------') }}
                                        data-color="#eee"
                                        data-size={S} data-style={SLIDE_LEFT} data-spinner-size={30} data-spinner-color="#ddd"
                                        data-spinner-lines={12}
                                        style={{ backgroundColor: '#A5A8AA', borderRadius: 2.5, marginRight: 10, marginLeft: 10, marginTop: -10 }}
                                    > <div>
                                            {this.state.save[this.props.language]}</div>
                                    </LaddaButton>

                                    <LaddaButton
                                        id="delete"
                                        loading={false}
                                        onClick={() => { console.log('------------------ Delete Button ------------------') }}
                                        data-color="#eee"
                                        data-size={S} data-style={SLIDE_LEFT} data-spinner-size={30} data-spinner-color="#ddd"
                                        data-spinner-lines={12}
                                        style={{ backgroundColor: '#A5A8AA', borderRadius: 2.5, marginRight: 10, marginTop: -10 }}
                                    >
                                        <div>
                                            {this.state.delete[this.props.language]}</div>

                                    </LaddaButton>

                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <DataGrid
                                    id={'grid-role-permission'}
                                    dataSource={data ? data : []}
                                    showBorders={true}
                                    keyExpr={'id'}
                                    height={450}
                                    showColumnLines={false}
                                    allowColumnReordering={true}
                                >
                                    <Paging defaultPageSize={10} />
                                    <GroupPanel visible={true} />
                                    <Export enabled={true} fileName={'Dealer'} allowExportSelectedData={true} />
                                    <ColumnChooser enabled={true} />
                                    <SearchPanel visible={true} highlightCaseSensitive={true} />
                                    <Button onClick={() => console.log('------------- Fuckin Button 55555555555555555555')}>Save </Button>
                                    <Button onClick={() => console.log('------------- Fuckin Button 55555555555555555555')}>Delete </Button>
                                    <Column dataField="roleName" caption="Role Name" width={150} />
                                    <Column dataField="master" caption="Master" minWidth={100} />
                                    <Column dataField="totalUser" caption="Total User" minWidth={150} />
                                    <Column dataField="action" caption="Action" minWidth={150} />
                                </DataGrid>
                            </Col>
                        </Row>
                    </PannelBoxWithButton>
               

            </div >
        )
    }
}



const mapStateToProps = (state) => ({
    language: state.versatile.language,
    listPers: state.roleSetting.listPers,
    listGroupPers: state.roleSetting.listGroupPers,
    businessPartnerId: state.signin.businessPartnerId,
    groupType: state.signin.groupType,
    userGroup: state.signin.userGroup,

});
const mapDispatchToProps = (dispatch) => ({
    listPermission: (roleUser) => dispatch(RoleSettingActions.listPermission(roleUser)),
    listGroupPermission: (roleUser, id) => dispatch(RoleSettingActions.listGroupPermission(roleUser, id)),
    updatePermissionForGroup: (roleUser, data, id) => dispatch(RoleSettingActions.updatePermissionForGroup(roleUser, data, id)),
    createGroup: (roleUser, suffixRoleName, id) => dispatch(RoleSettingActions.createGroup(roleUser, suffixRoleName, id))

});

export default connect(mapStateToProps, mapDispatchToProps)(RoleInformationCreate)

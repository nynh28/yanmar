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
import { confirmAlert } from 'react-confirm-alert'; // Import
import {
  TextArea
} from 'devextreme-react';
import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css'
// import service from './data.js';
import DataGrid, { RemoteOperations, Column, ColumnChooser, Pager, FilterRow, HeaderFilter, SearchPanel, Grouping, GroupPanel, Paging, Export, Selection, MasterDetail, Editing } from 'devextreme-react/data-grid';
import DataGridView from '../../Components/DataGridView'
import { Item } from 'devextreme-react/form';
import { formValidation } from "../../Components/FormGenerator/validate";
// import TreeList, { Column, ColumnChooser, HeaderFilter, SearchPanel, Selection, Lookup, Export } from 'devextreme-react/tree-list';
// import { Template } from 'devextreme-react/core/template';
// import { employees, priorities, tasks } from './Data.js';
// import EmployeeCell from './EmployeeCell.js';

class NewRoleSetting extends Component {

  constructor(props) {
    super(props)
    this.state = {
      language: this.props.language,
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
      save: {
        en: 'Save',
        th: 'บันทึก',
        jp: 'Save'
      },
      delete: {
        en: 'Delete',
        th: 'ลบ',
        jp: 'Delete',
      },
      add: {
        en: 'Add',
        th: 'เพิ่ม',
        jp: 'Add',
      },

      formInfo1: {
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
              "havePermission": {
                "type": "radio",
                "title": "Have permission",
                "required": true,
                "radioButton": [
                  {
                    "checked": false,
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
          {
            "properties": {
              "function": {
                "type": "select",
                "title": "Fucntion",
                "required": true,
                "selectOption": [
                  {
                    "value": "1",
                    "name": "--- All ---"
                  },
                  {
                    "value": "function1",
                    "name": "Function1"
                  },
                  {
                    "value": "function2",
                    "name": "Function2"
                  },
                  {
                    "value": "function3",
                    "name": "Function3"
                  },
                ]
              }
            }
          }

        ]
      },
      formInfo2: {
        "title": "Search",
        "showHeaderTitle": false,
        "formName": "search2",
        "girdFormColumn": 1,
        "fieldRow": [
          {
            "properties": {
              "partnerName": {
                "type": "string",
                "title": "Partner Name",
                "required": true,
                "maxLength": 100
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
                    "checked": false,
                    "value": false,
                    "name": "No"
                  }
                ]
              },
            }
          },
          // {
          //   "properties": {
          //     "licensePlate": {
          //       "type": "string",
          //       "title": "License Plate",
          //       "required": true,
          //       "maxLength": 100
          //     }
          //   }
          // },
          {
            "properties": {
              "action": {
                "type": "select",
                "title": "Action",
                "required": true,
                "selectOption": [
                  {
                    "value": "1",
                    "name": "--- Please Select ---"
                  },
                  {
                    "value": "manageRole",
                    "name": "Manage Role"
                  },
                  {
                    "value": "deleteBranch",
                    "name": "Delete Branch"
                  },
                  {
                    "value": "editProfile",
                    "name": "Edit Profile"
                  },
                  {
                    "value": "createRole",
                    "name": "Create Role"
                  },
                ]
              },
            },

          },

          // {
          //   "properties": {
          //     "function": {
          //       "type": "select",
          //       "title": "Fucntion",
          //       "required": true,
          //       "selectOption": [
          //         {
          //           "value": "1",
          //           "name": "--- All ---"
          //         },
          //         {
          //           "value": "function1",
          //           "name": "Function1"
          //         },
          //         {
          //           "value": "function2",
          //           "name": "Function2"
          //         },
          //         {
          //           "value": "function3",
          //           "name": "Function3"
          //         },
          //       ]
          //     }
          //   }
          // }

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
  _editCellRow = () => {
    this.props.history.push('/newRoleSetting/roleInformationUpdate')
    console.log('----------------- Click Edit -------------------')
  }

  _deleteCellRow = () => {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => console.log('----------------- Delete Success ---------------------')
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });


  }

  _searchRole = () => {
    console.log('----------- FUck yeah ---------------')
    let formData = formValidation([this.state.formInfo1])
    let formData2 = formValidation([this.state.formInfo2])
    console.log(formData)
    console.log(formData2)
  }

  render() {

    let data = [
      {
        id: 1,
        partnerType: 'Onelink',
        partnerName: 'Onelink Technology',
        roleName: 'Onelink Admin',
        master: false,
        totalUser: 1,
        action: [{ id: 1, action: 'view' }, { id: 2, action: 'edit' }, { id: 3, action: 'delete' }],
        message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.',
      },
      {
        id: 2,
        partnerType: 'Onelink',
        partnerName: 'Onelink Technology',
        roleName: 'Sale & Marketing',
        master: false,
        totalUser: 0,
        action: [{ id: 1, action: 'view' }, { id: 2, action: 'edit' }, { id: 3, action: 'delete' }],
        message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.',
      },
      {
        id: 3,
        partnerType: 'Onelink',
        partnerName: 'Onelink Technology',
        roleName: 'Stock & QA',
        master: false,
        totalUser: 2,
        action: [{ id: 1, action: 'view' }, { id: 2, action: 'edit' }, { id: 3, action: 'delete' }],
        message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.',
      },
      {
        id: 4,
        partnerType: 'Provider',
        partnerName: 'Hino Motors Sales Thailand',
        roleName: 'HMST Admin',
        master: false,
        totalUser: 4,
        action: [{ id: 1, action: 'view' }, { id: 2, action: 'edit' }, { id: 3, action: 'delete' }],
        message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.',
      },
      {
        id: 5,
        partnerType: 'Provider',
        partnerName: 'Hino Motors Sales Thailand',
        roleName: 'Dealer Admin',
        master: true,
        totalUser: 96,
        action: [{ id: 1, action: 'view' }, { id: 2, action: 'edit' }, { id: 3, action: 'delete' }],
        message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.',
      },
      {
        id: 6,
        partnerType: 'Provider',
        partnerName: 'Hino Motors Sales Thailand',
        roleName: 'Customer Admin',
        master: true,
        totalUser: 1220,
        action: [{ id: 1, action: 'view' }, { id: 2, action: 'edit' }, { id: 3, action: 'delete' }],
        message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.',
      },
      // {
      //   id: 7,
      //   partnerType: 'Partner Plus',
      //   message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.',
      // },
      // {
      //   id: 8,
      //   partnerType: 'Admin',
      //   message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.',
      // },
      // {
      //   id: 9,
      //   partnerType: 'Hino Admin',
      //   message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.',
      // },
      // {
      //   id: 10,
      //   partnerType: 'Security',
      //   message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.',
      // },
      // {
      //   id: 11,
      //   partnerType: 'Guard',
      //   message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.',
      // },
      // {
      //   id: 12,
      //   partnerType: 'Maintenance',
      //   message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.',
      // },
    ]

    const { component: Component, ...rest } = this.props

    console.log('--------------- New Role Settings Screen -------------------')
    return (
      <div>

        <Row>
          <PannelBoxWithButton title={this.state.search[this.props.language]}
            //  showButtonRight={true} 
            //  onClickButtonRight={() => console.log('-----------SEARCH ---------------------')}
            //  titleButtonRight={"Search"}
            enableFirstButton={true}
            firstFunction={() => this._searchRole()}
            firstText={this.state.search[this.props.language]}
            firstIcon={"fas fa-search"}
          >

            {/* {this.props.groupType && this.props.groupType == "Hino" && <Row>
              <Col lg={12}>
                <FormGenerator schema={this.state.adminHinoForm} />
              </Col>
            </Row>} */}

            <Row>
              <Col lg={6}>
                <FormGenerator schema={this.state.formInfo1} />
              </Col>
              <Col lg={6}>
                <FormGenerator schema={this.state.formInfo2} />
                {/* <div className="row" style={{ textAlign: "right" }}>
                  <LaddaButton
                    id="save"
                    loading={false}
                    onClick={() => { console.log('------------------ Reset Button ------------------') }}
                    data-color="#eee"
                    data-size={S}
                    icon
                    data-style={SLIDE_LEFT}
                    data-spinner-size={30}
                    data-spinner-color="#ddd"
                    data-spinner-lines={12}
                    style={{ backgroundColor: '#A5A8AA', borderRadius: 2.5, marginRight: 10 }}
                  >
                    <div id="save" style={{ paddingLeft: 10, paddingRight: 10 }}>
                      <i className="fas fa-search" style={{ paddingRight: 5 }}></i>
                      {this.state.search[this.props.language]}
                    </div>
                  </LaddaButton>
                </div> */}
              </Col>
            </Row>

          </PannelBoxWithButton>
        </Row>

        <Row>
          <PannelBoxWithButton title={this.state.result[this.props.language]}
            enableFirstButton={true}
            firstFunction={() => this.props.history.push("/newRoleSetting/roleInformationCreate")}
            firstText={this.state.add[this.props.language]}
            firstIcon={"fas fa-plus"} >
            <Row>
              <Col lg={12}>

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

                <Row >
                  <Col lg={12} md={12}>
                    <DataGrid
                      id={'grid-role-permission'}
                      dataSource={data ? data : []}
                      showBorders={true}
                      keyExpr={'id'}
                      height={600}
                      showColumnLines={false}
                      allowColumnReordering={true}
                    >


                      <Paging defaultPageSize={10} />
                      <GroupPanel visible={true} />
                      {/* <Grouping autoExpandAll={false} /> */}
                      {/* <Pager allowedPageSizes={10} showPageSizeSelector={true} /> */}
                      <Export enabled={true} fileName={'Dealer'} allowExportSelectedData={true} />
                      <ColumnChooser enabled={true} />
                      <SearchPanel visible={true} highlightCaseSensitive={true} />
                      <Column dataField="partnerType" caption="Partner Type" />
                      <Column dataField="partnerName" caption="Partner Name" />
                      <Column dataField="roleName" caption="Role Name" />
                      <Column dataField="master" caption="Master" />
                      <Column dataField="totalUser" caption="Total User" />
                      <Column dataField="action" cellRender={(element) => {
                        return <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                          <a><i className="fas fa-eye"></i></a>
                          <a onClick={() => this._editCellRow()}><i className="fas fa-edit"></i></a>
                          <a onClick={() => this._deleteCellRow()}><i className="fas fa-trash-alt"></i></a>
                        </div>
                      }} />
                      {/* <Column dataField="message" caption="Message" minWidth={300} cellRender={
                    (e, i) => {
                      return <TextArea
                        style={{ borderWidth: 0, marginTop: -7.5 }}
                        height={180}
                        value={e.data.message}
                        readonly={true}
                        disabled={true}
                      />
                    }
                  } /> */}
                      {/* <Column type="buttons" width={110}
                    cellRender={(e, i) => {
                      return <LaddaButton
                        id="save"
                        loading={false}
                        onClick={() => { this._editCellRow() }}
                        data-color="#eee"
                        data-size={S} data-style={SLIDE_LEFT} data-spinner-size={30} data-spinner-color="#ddd"
                        data-spinner-lines={12}
                        style={{ backgroundColor: '#A5A8AA', borderRadius: 2.5, marginRight: 10, marginLeft: 10 }}
                      > <div>
                          <i className='fas fa-edit'></i>
                          <span style={{ paddingLeft: 5 }}>{this.state.edit[this.props.language]}</span></div>
                      </LaddaButton>

                    }}
                  /> */}
                      {/* <Column type="buttons" width={110}
                    cellRender={(e, i) => {
                      return <LaddaButton
                        id="delete"
                        loading={false}
                        onClick={() => { console.log('------------------ Delete Button ------------------') }}
                        data-color="#eee"
                        data-size={S} data-style={SLIDE_LEFT} data-spinner-size={30} data-spinner-color="#ddd"
                        data-spinner-lines={12}
                        style={{ backgroundColor: '#A5A8AA', borderRadius: 2.5, marginRight: 10 }}
                      >
                        <div>
                          <i className="fas fa-trash-alt"></i>
                          <span style={{ paddingLeft: 5 }}>{this.state.delete[this.props.language]}</span></div>

                      </LaddaButton>

                    }}
                  /> */}
                    </DataGrid></Col></Row>

              </Col>
            </Row>
          </PannelBoxWithButton>
        </Row>

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

export default connect(mapStateToProps, mapDispatchToProps)(NewRoleSetting)

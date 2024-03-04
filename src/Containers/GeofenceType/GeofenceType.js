import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import GenerateForm from 'react-form-generator-from-json'
import {
  Label, Container, Row, Card, Col, Form, Input, ButtonGroup, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
  , Modal, ModalHeader, ModalBody, ModalFooter

} from 'reactstrap'

import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import { Item } from 'devextreme-react/form';

import moment from 'moment'
import 'moment/locale/th'

import MapDraw from './MapDraw'
import Table from '../../Components/DataGridView/Table.js'
// import Icon from './Form/Fields/Icon'

import GeofenceActions from "../../Redux/GeofenceRedux"
import { t } from '../../Components/Translation'

import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import icon from './Form/Fields/Icon'

import { ENDPOINT_BASE_URL } from '../../Config/app-config';

const getOrderDay = (rowData) => {
  return (new Date(rowData.OrderDate)).getDay();
};

const saleAmountEditorOptions = { format: 'currency', showClearButton: true };

function cellRender(cellData) {
  // console.log(cellData)
  if (cellData.value != undefined) {
    return <img src={cellData.text} height="42" width="42" />
  }
}

class GeofenceType extends Component {

  constructor(props) {
    super(props)

    this.onAutoExpandAllChanged = this.onAutoExpandAllChanged.bind(this);
    //   this.orders = service.getOrders();
    // this.selectGeofence = this.selectGeofence.bind(this);

    this.orders = [];

    this.dataGrid = React.createRef();
    this.orderHeaderFilter = this.orderHeaderFilter.bind(this);
    this.setButton = this.setButton.bind(this);
    this.detectContentReady = this.detectContentReady.bind(this);
    this.state = {
      autoExpandAll: true
      , rSelected: null
      , currentDataGridState: []
      , frmVihecleShow: false
      , titleFormType: ''
      , dropdownOpen: false
      // , mapCenter: [37.8189, -122.4786]
      // , bounds: null
    }
    this.dataGrid = React.createRef();
    this.toggle = this.toggle.bind(this);

    this.deleteCallback = this.deleteCallback.bind(this);
    this.editCallback = this.editCallback.bind(this);
    this.selectedCallback = this.selectedCallback.bind(this);
    // this.initialCallback = this.initialCallback.bind(this);
  }

  delete(e) {
    e.cancel = "true";
    console.log(e.data.id);
    // this.props.deleteGeofence(e.data.id)
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  onRefreshClick() {
    window.location.reload();
  }
  calculateFilterExpression(value, selectedFilterOperations, target) {
    let column = this;
    if (target === 'headerFilter' && value === 'weekends') {
      return [[getOrderDay, '=', 0], 'or', [getOrderDay, '=', 6]];
    }
    return column.defaultCalculateFilterExpression.apply(this, arguments);
  }
  orderHeaderFilter(data) {
    data.dataSource.postProcess = (results) => {
      results.push({
        text: 'Weekends',
        value: 'weekends'
      });
      return results;
    };
  }
  setButton() {
    var currentSetting = this.dataGrid.current.instance.state();
    currentSetting.pageIndex = 7;
    this.dataGrid.current.instance.state(currentSetting);
    this.dataGrid.current.instance.refresh();
  }

  detectContentReady(event) {
    var currentSetting = this.dataGrid.current.instance.state();
    this.setState((state, props) => {
      return { currentDataGridState: currentSetting };
    }, () => {
    });
  }

  dateFormat = (data) => {
    return moment(data.value).format('llll')
  }

  onAutoExpandAllChanged() {
    this.setState({
      autoExpandAll: !this.state.autoExpandAll
    });
  }

  // setButton() {
  //   var currentSetting = this.dataGrid.current.instance.state();
  //   currentSetting.pageIndex = 7;
  //   this.dataGrid.current.instance.state(currentSetting);
  //   this.dataGrid.current.instance.refresh();
  // }

  // detectContentReady(event) {
  //   if (this.dataGrid && this.dataGrid.current && this.dataGrid.current.instance) {
  //     var currentSetting = this.dataGrid.current.instance.state();
  //     // this.setState((state, props) => {
  //     //   return { currentDataGridState: currentSetting };
  //     // }, () => {
  //     //   console.log(this.state.currentDataGridState);
  //     // });
  //   }
  // }
  dateFormat = (data) => {
    // console.log(data)
    // return "5555";
    return moment(data.value).format('llll')
  }

  showForm(isShow) {
    this.setState({ frmvehicleShow: isShow });

    if (!isShow) window.scrollTo(0, 0);
  }

  componentDidMount() {
    // this.props.listCustomer()
    // console.log(services.getEvents());
    // this.props.getGeofenceType()
    // console.log(this.props.dataList);
  }

  componentDidUpdate(prevProps, nextState) {
    // if (prevProps.listCustomer != this.props.listCustomer) {
    //   this.props.history.push('customer')
    // }
    console.log(this.props.dataList)
    if (prevProps.typeForm !== this.props.typeForm) {
      if (this.props.typeForm !== null) {
        this.props.history.push("geofenceForm")
      }
    }
    // console.log(this.props.profileUser.partnerId)
    // console.log(this.props.geofenceType)
  }

  loadCustomerList() {
    //  this.props.listCustomer()
  }

  componentWillMount() {
    // this.props.searchDrivers(this.props.businessPartnerId)
    //  this.props.getDictionary()
    // console.log(this.props.partnerId)
    // this.props.setData(null)
  }

  //componentDidUpdate(prevProps, prevState) {
  // console.log("_______ : " + this.props.typeForm)
  // if (prevProps.typeForm !== this.props.typeForm) {
  //   if (this.props.typeForm !== null) {
  //     this.props.history.push("customer/customerForm")
  //   }
  // }
  //}

  // componentDidUpdate(prevProps, prevState) {
  //   // console.log(this.props.dataList);
  //   // if (prevProps.typeForm !== this.props.typeForm) {
  //   //   if (this.props.typeForm !== null) {
  //   //     this.props.history.push("customerForm")
  //   //   }
  //   // }
  // }

  addForm() {
    this.props.setData('add', {})
    this.props.history.push("geofenceTypeForm")
    // this.props.idSelected(null)
    // this.props.setInfoCustomer(null)
    // this.props.addAndUpdateCustomerSuccess('add')
    // this.props.history.push('/customer/customerForm')
    // this.props.history.push('CustomerFormGenerate')
    // this.props.history.push('PermissionSetting')
  }

  selectedCallback(e) {
    console.log(e)

  }

  deleteCallback = (e) => this.props.deleteGeofenceType(e.data.id)
  editCallback = (e) => {
    console.log(e.data.id)
    // this.props.getSourceType()
    this.props.idSelected("edit", e.data.id)
    this.props.history.push('/geofenceTypeForm')
  }



  //--------------------------------  Start Geofence ------------------------//

  //--------------------------------  End Geofence ------------------------//
  render() {
    console.log(this.props.dataLogin.userId)
    return (
      <div>
        <Row>
          <Col lg="12">
            <div className="ibox">
              <div className="ibox-title" style={{ padding: '15px 20px 10px 15px' }}>
                <Row style={{ marginBottom: 0 }}>
                  <Col lg="6">
                    <h4>{t('geofence_type_1')}</h4>
                    {/* {cellRender("https://s3.amazonaws.com/hino.ecm.file.bucket/Temp2/0319_fetjhipqgssurtw")} */}
                    {/* <img src="https://s3.amazonaws.com/hino.ecm.file.bucket/Temp2/0319_fetjhipqgssurtw"/> */}
                  </Col>
                  <Col lg="6">
                    <div style={{ textAlign: "right", }} >
                      <Button className="btn btn-primary btn-sm" onClick={() => this.addForm()}><i className="fa fa-plus"></i>{' '}{t("geofence_type_2")}</Button>
                      {/* <Button className="btn btn-primary btn-sm" onClick={() => this.addForm()}><i className="fa fa-plus"></i>{' '}Add</Button> */}
                    </div>
                  </Col>
                </Row>
              </div>
              {/* <div className="ibox float-e-margins"> */}
              <div className="ibox-content" style={{ paddingLeft: 35, paddingRight: 35 }}>
                {/* <h5>Geofence Type</h5> */}
                {/* <Row>
                    <h4>Geofence Type</h4>
                    <div className="ibox-tools">
                      <Button className="btn btn-primary btn-xs" onClick={() => this.addForm()}><i className="fa fa-plus"></i>{' '}Add</Button>
                    </div>
                  </Row> */}

                {/* <Row style={{ marginTop: 5, marginBottom: 0 }}>
                    <Col lg="6">
                      <h4>Geofence Type</h4>
                    </Col>
                    <Col lg="6">
                      <div style={{ textAlign: "right",}} >
                        <Button className="btn btn-primary btn-sm" onClick={() => this.addForm()}><i className="fa fa-plus"></i>{' '}Add</Button>
                      </div>
                    </Col>
                  </Row> */}
                <Row>
                  <Table
                    mode={"api"}
                    // serversideSource={'https://api-center.onelink-iot.com/v1.0.1/Geofence/GeofenceType/GridView'}
                    serversideSource={ENDPOINT_BASE_URL + 'Geofence/GeofenceType/GridView' + '?lang=' + this.props.language}
                    author={this.props.headers.idToken}
                    xAPIKey={this.props.headers.redisKey}
                    language={this.props.language}
                    table_id={8}
                    user_id={this.props.dataLogin.userId}
                    editing={{
                      enabled: true,
                      allowUpdating: true,
                      allowDeleting: true
                    }}
                    selectedCallback={this.selectedCallback}
                    deleteCallback={this.deleteCallback}
                    editCallback={this.editCallback}
                    autoExpandAll={false}
                    remoteOperations={true}
                    // cellRender={true}
                    column={[
                      {
                        column_name: 'partnerTypeName',
                        // column_caption: 'partner_type'
                        column_caption: 'geofence_type_3'
                      },
                      {
                        column_name: 'partnerName',
                        // column_caption: 'partner_name'
                        column_caption: 'geofence_type_4'
                      },
                      {
                        column_name: 'name',
                        column_caption: 'geofence_type_5'
                      },
                      {
                        column_name: 'description',
                        column_caption: 'geofence_type_6'
                      },
                      {
                        column_name: 'isHazard',
                        column_caption: 'geofence_type_7',
                      },
                      {
                        column_name: 'iconUrl',
                        column_caption: 'geofence_type_8',
                        column_render: (e) => cellRender(e),
                      }
                    ]}
                  >
                  </Table>
                </Row>
              </div>
              {/* </div> */}

              {/* <div className="ibox-content">
                <Row>
                  <Table
                    mode={"api"}
                    serversideSource={'https://api-center.onelink-iot.com/v1.0.1/Geofence/GeofenceType/GridView'}
                    author={this.props.headers.idToken}
                    xAPIKey={this.props.headers.redisKey}
                    tableId={2}
                    user_id={2}//this.props.dataLogin.userId
                    selectedCallback={this.selectedCallback}
                    initialCallback={this.tableInitial}
                    autoExpandAll={false}
                    remoteOperations={false}
                    deleteCallback={this.deleteCallback}
                    editCallback={this.editCallback}
                    editing={{
                      enabled: true,
                      allowUpdating: true,
                      allowDeleting: true
                    }}
                    // cellRender={cellRender}
                    column={[
                      {
                        column_name: 'partnerTypeName',
                        column_caption: 'Partner Type Name'
                      },
                      {
                        column_name: 'partnerName',
                        column_caption: 'partnerName'
                      },
                      {
                        column_name: 'geofenceTypeName',
                        column_caption: 'Geofence Name'
                      },
                      {
                        column_name: 'geofenceDescription',
                        column_caption: 'Geofence Description'
                      },
                      {
                        column_name: 'isHazard',
                        column_caption: 'is Hazard'
                      },
                      {
                        column_name: 'iconUrl',
                        column_caption: 'Icon',
                        // column_render: (data) => <img src={data.value}/>
                      }
                    ]}
                  ></Table>
                </Row>
              </div> */}
            </div>
          </Col>
          {/* <Col lg="6" style={{ position: 'relative', marginTop: -10, height: '40%' }}>
            <MapDraw>

            </MapDraw>
          </Col> */}
        </Row>
      </div>
    );
  }

}

// function cellRender(data){
//   console.log(data)
//   return <img src={data.value}/>
// }

const mapStateToProps = (state) => ({
  loading: state.geofence.loading,
  dataLogin: state.signin.dataLogin,
  // vehicle: state.vehicle.vehicle,
  // editStart: state.vehicle.editStart,
  error: state.geofence.error,
  groupType: state.signin.groupType,
  userGroup: state.signin.userGroup,
  currentUser: state.signin.currentUser,
  // businessPartnerId: state.signin.profileUser,
  profileUser: state.signin.profileUser,
  // partnerId: state.signin.profileUser.partnerId,
  // partnerTypeName: state.signin.profileUser.partnerTypeName,
  id: state.geofence.idSelected,
  geofenceType: state.geofence.geofenceType,
  success: state.geofence.success,
  headers: state.signin.header,
  language: state.versatile.language,
  // modal: state.userSetting.modal,
  // title: state.vehicle.title,
});
const mapDispatchToProps = (dispatch) => ({
  setData: (typeForm) => dispatch(GeofenceActions.setData(typeForm)),
  idSelected: (typeForm, id) => dispatch(GeofenceActions.idSelected(typeForm, id)),
  getGeofenceType: (id) => dispatch(GeofenceActions.getGeofenceType(id)),
  deleteGeofenceType: (id) => dispatch(GeofenceActions.deleteGeofenceType(id)),
  getSourceType: (id) => dispatch(GeofenceActions.getSourceType(id))
  // removeUserRoleGroup: () => dispatch(UserSettingActions.remove)
  // setEditVehicleStart: (chassisNo,customerId,customerName,dealerId,dealerName,geoData,imei,lastGPSUpdate,lastLatitude,lastLongitude,licensePlate,status,vehicleId,vinNo) => dispatch(VehicleActions.setEditVehicleStart(chassisNo,customerId,customerName,dealerId,dealerName,geoData,imei,lastGPSUpdate,lastLatitude,lastLongitude,licensePlate,status,vehicleId,vinNo))
  // setEditVehicleStart: (data) => dispatch(VehicleActions.setEditVehicleStart(data)),
  // setVehicleSuccess: () => dispatch(VehicleActions.setVehicleSuccess()),
  // setVehicleStatus: (status) => dispatch(VehicleActions.setVehicleStatus(status)),
});


export default connect(mapStateToProps, mapDispatchToProps)(GeofenceType)

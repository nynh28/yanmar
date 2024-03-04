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
import 'devextreme/dist/css/dx.light.css'
import services from './data.js';
import DataGrid, { Column, FilterRow, HeaderFilter, SearchPanel, Grouping, GroupPanel, Paging, Export, Selection, MasterDetail, Editing, Texts } from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';

import moment from 'moment'
import 'moment/locale/th'

// import MapDraw from './MapDraw'
import Table from '../../Components/DataGridView/Table.js'

import GeofenceActions from "../../Redux/GeofenceRedux"

import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';

const getOrderDay = (rowData) => {
  return (new Date(rowData.OrderDate)).getDay();
};

const saleAmountEditorOptions = { format: 'currency', showClearButton: true };

class PromotionSetting extends Component {

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
      , promotion: []
      // , mapCenter: [37.8189, -122.4786]
      // , bounds: null
    }
    this.dataGrid = React.createRef();
    this.onEditingStart = this.onEditingStart.bind(this);
    this.delete = this.delete.bind(this);
    this.toggle = this.toggle.bind(this);
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
    this.props.getGeofenceType()
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
    console.log(this.props.geofenceType)
  }

  loadCustomerList() {
    //  this.props.listCustomer()
  }

  componentWillMount() {
    // this.props.searchDrivers(this.props.businessPartnerId)
    //  this.props.getDictionary()
    this.props.setData(null)
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
    this.props.history.push("promotionForm")
    // this.props.idSelected(null)
    // this.props.setInfoCustomer(null)
    // this.props.addAndUpdateCustomerSuccess('add')
    // this.props.history.push('/customer/customerForm')
    // this.props.history.push('CustomerFormGenerate')
    // this.props.history.push('PermissionSetting')
  }

  onEditingStart(e) {
    // e.cancel = true;
    // console.log(">> onEditingStart")
    // // GET DATA SELECTED
    // console.log("ID : " + e.data.id)

    // console.log(e)
    // this.props.addAndUpdateCustomerSuccess('edit')
    // this.props.idSelected(e.data.id)
    // // this.props.history.push('/customer/customerForm')
    // this.props.history.push('CustomerForm')

    e.cancel = "true"

    let id = e.data.id
    console.log("ID SELECTED : " + id)

    // this.props.infoGeofence(id)

    // setTimeout(() => this.props.history.push("geofenceEdit")
    //   , 500)
    //  this.props.getDriversByID(key)
  }

  cellRender({ data }) {
    // console.log(data)
    if (data.admin === undefined) {
      return <center><a href={'#/customer/addCustomerAdmin?id=' + data.id}><u>add</u></a></center>
    }
    return data.admin
  }

  //--------------------------------  Start Geofence ------------------------//

  //--------------------------------  End Geofence ------------------------//
  render() {
    return (
      <div>
        <Row>
          <Col lg="12">
            <div className="ibox float-e-margins">
              <div className="ibox-title">
                <h5>Geofence Type</h5>
                <div className="ibox-tools">
                  <Button className="btn btn-primary btn-xs" onClick={() => this.addForm()}><i className="fa fa-plus"></i>{' '}Add</Button>
                </div>
              </div>
              <div className="ibox-content">
                <Row>
                  {/* <Table
                    mode={"api"}
                    serversideSource={'https://api-center.onelink-iot.com/v1.0.1/geofence/type/management/grid-view'}
                    author={this.props.headers.idToken}
                    xAPIKey={this.props.headers.redisKey}
                    tableId={1}
                    user_id={1}
                    selectedCallback={this.selectedCallback}
                    initialCallback={this.tableInitial}
                    autoExpandAll={false}
                    remoteOperations={false}
                  >
                  </Table> */}
                  {/* <Table
                    mode={"api"}
                    serversideSource={'https://api-center.onelink-iot.com/v1.0.1/geofence/type/management/grid-view'}
                    author={this.props.headers.idToken}
                    xAPIKey={this.props.headers.redisKey}
                    tableId={1}
                    user_id={1}
                    selectedCallback={this.selectedCallback}
                    initialCallback={this.tableInitial}
                    autoExpandAll={false}
                    remoteOperations={false}
                    column={[
                      {
                        column_name: 'geofenceName',
                        column_caption: 'Geofence Name'
                      },
                      {
                        column_name: 'geofenceDescription',
                        column_caption: 'Geofence Description'
                      },
                      {
                        column_name: 'isShare',
                        column_caption: 'is Share'
                      },
                      {
                        column_name: 'iconAttachId',
                        column_caption: 'Icon Attach Id'
                      }
                    ]}
                  ></Table> */}
                  <DataGrid id={'gridContainer'}
                    ref={this.dataGrid}
                    // dataSource={this.props.dataList}
                    dataSource={this.state.promotion}
                    keyExpr={'id'}
                    showBorders={true}
                    allowColumnReordering={true}
                    onContentReady={this.detectContentReady}
                    onEditingStart={this.onEditingStart}
                    onRowRemoving={this.delete}
                  >
                    <GroupPanel visible={true} />
                    <Grouping autoExpandAll={this.state.autoExpandAll} />
                    <Paging defaultPageSize={10} />

                    {/* <Editing
                        mode={'window'}
                        useIcons="plus"

                        allowDeleting={true}
                        allowUpdating={true}
                      > */}
                    <Texts
                      confirmDeleteMessage={""}
                    />
                    {/* <Form>
                          <Item itemType={'group'} colCount={2} colSpan={2}>
                            <Item dataField={'geofenceName'} />
                            <Item dataField={'geofenceType'} />
                          </Item>
                        </Form> */}
                    {/* </Editing> */}
                    <FilterRow visible={false} />
                    <HeaderFilter visible={true} />
                    <SearchPanel visible={true}
                      width={240}
                      placeholder={'Search...'} />
                    <Export enabled={true} fileName={'TEST'} allowExportSelectedData={true} />
                    <Selection mode={'multiple'} />

                    <Column dataField={'promotionName'} minWidth={150} />
                    <Column dataField={'promotionStateDate'} minWidth={150} />
                    <Column dataField={'promotionEndDate'} minWidth={150} />
                    <Column dataField={'dealerLocationRequire'} minWidth={150} />
                    <Column dataField={'dealerClientOnly'} minWidth={150} />
                  </DataGrid>
                </Row>
              </div>
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

const mapStateToProps = (state) => ({
  loading: state.geofence.loading,
  // vehicle: state.vehicle.vehicle,
  // editStart: state.vehicle.editStart,
  error: state.geofence.error,
  groupType: state.signin.groupType,
  userGroup: state.signin.userGroup,
  currentUser: state.signin.currentUser,
  // businessPartnerId: state.signin.profileUser.,
  partnerId: state.signin.profileUser.partnerId,
  partnerTypeName: state.signin.profileUser.partnerTypeName,
  idSelected: state.geofence.idSelected,
  geofenceType: state.geofence.geofenceType,
  success: state.geofence.success,
  headers: state.signin.header
  // modal: state.userSetting.modal,
  // title: state.vehicle.title,
});
const mapDispatchToProps = (dispatch) => ({
  setData: (typeForm) => dispatch(GeofenceActions.setData(typeForm)),
  //   getGeofenceType: () => dispatch(GeofenceActions.getGeofenceType()),
  //   deleteGeofenceType: () => dispatch(GeofenceActions.deleteGeofenceType())
  // removeUserRoleGroup: () => dispatch(UserSettingActions.remove)
  // setEditVehicleStart: (chassisNo,customerId,customerName,dealerId,dealerName,geoData,imei,lastGPSUpdate,lastLatitude,lastLongitude,licensePlate,status,vehicleId,vinNo) => dispatch(VehicleActions.setEditVehicleStart(chassisNo,customerId,customerName,dealerId,dealerName,geoData,imei,lastGPSUpdate,lastLatitude,lastLongitude,licensePlate,status,vehicleId,vinNo))
  // setEditVehicleStart: (data) => dispatch(VehicleActions.setEditVehicleStart(data)),
  // setVehicleSuccess: () => dispatch(VehicleActions.setVehicleSuccess()),
  // setVehicleStatus: (status) => dispatch(VehicleActions.setVehicleStatus(status)),
});


export default connect(mapStateToProps, mapDispatchToProps)(PromotionSetting)

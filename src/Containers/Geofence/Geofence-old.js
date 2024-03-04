/* eslint-disable default-case */
/* eslint-disable no-dupe-class-members */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  Label, Container, Row, Card, Col, Form, Input, ButtonGroup, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
  , Modal, ModalHeader, ModalBody, ModalFooter

} from 'reactstrap'

import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css'
// import services from './data.js';
// import DataGrid, { Column, FilterRow, HeaderFilter, SearchPanel, Grouping, GroupPanel, Paging, Export, Selection, MasterDetail, Editing, Texts } from 'devextreme-react/data-grid';
// import { Item } from 'devextreme-react/form';

import moment from 'moment'
import 'moment/locale/th'

import MapDraw from './MapDraw'
// import Map from './Map'

import GeofenceActions from "../../Redux/GeofenceRedux"
import Table from '../../Components/DataGridView/Table.js'
import { t } from '../../Components/Translation'
// import { t } from '../../Components/Translation'
import { ENDPOINT_BASE_URL } from '../../Config/app-config';
// import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';

const getOrderDay = (rowData) => {
  return (new Date(rowData.OrderDate)).getDay();
};


class Geofence extends Component {

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
      visible: false,
      showIcon: false,
      form: false,
      autoExpandAll: true,
      rSelected: null,
      currentDataGridState: [],
      frmVihecleShow: false,
      titleFormType: '',
      dropdownOpen: false,
      polygon: null,
      polyline: null,
      type: null,
      circle: [],
      radius: 0,
      center: { lat: null, lng: null },
      iconPoint: { lat: null, lng: null },
      iconUrl: null,
      loadStore: false,
      centerDefualt: {
        lat: 13.786377,
        lng: 100.608755
      },
      zoomDefualt: 6,
      // , mapCenter: [37.8189, -122.4786]
      // , bounds: null
    }

    this.dataGrid = React.createRef();
    this.deleteCallback = this.deleteCallback.bind(this);
    this.editCallback = this.editCallback.bind(this);
    this.selectedCallback = this.selectedCallback.bind(this);
    // this.initialCallback = this.initialCallback.bind(this);
  }

  delete(e) {
    e.cancel = "true";
    // console.log(e.data.id);
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

  selectEvent({ selectedRowsData }) {
    const data = selectedRowsData[0];
    // if (data !== undefined) {
    //   this.props.setGerofenceData(data)
    //   this.props.getGeofenceDetail(data.id)
    // }
    // else {
    //   this.props.setGeofenceData(null)
    // }
  }

  showForm(isShow) {
    this.setState({ frmvehicleShow: isShow });
    if (!isShow) window.scrollTo(0, 0);
  }

  componentDidMount() {
    // console.log(this.props.headers)
    // this.props.getGeofence()
    // this.props.listCustomer()
    // console.log(services.getEvents());
    // console.log(this.props.dataList);
  }

  componentDidUpdate(prevProps, nextState) {
    // if (prevProps.listCustomer != this.props.listCustomer) {
    //   this.props.history.push('customer')
    // }
    // console.log(this.props.dataList)
    if (prevProps.typeForm !== this.props.typeForm) {
      if (this.props.typeForm !== null) {
        this.props.history.push("geofenceForm")
      }
    }
    if (prevProps.loading !== this.props.loading) {
      if (this.props.loading == false) {
        this.setState({ loadStore: false })
        // console.log('delete complete')
      }
    }
  }

  componentWillUnmount() {
    this.props.resetSelectRow()
  }

  loadCustomerList() {
    //  this.props.listCustomer()
  }

  componentWillMount() {
    // this.props.searchDrivers(this.props.businessPartnerId)
    //  this.props.getDictionary()
    //  this.props.setData(null)
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
    this.props.history.push("geofenceForm")
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
    // console.log("ID SELECTED : " + id)

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

  // eslint-disable-next-line no-dupe-class-members
  getPathsPolygon(polygon, iconUrl, iconPoint) {
    let coordinate = JSON.parse(polygon.toLowerCase())
    // this.setState({polygon: coordinate, type: 'polygon', iconUrl:iconUrl, iconPoint:JSON.parse(iconPoint.toLowerCase()),showIcon: true, visible:true, zoomDefualt: 8, centerDefualt: JSON.parse(iconPoint.toLowerCase())})
    // console.log(coordinate)
  }

  getPathsPolyline(polyline, iconUrl, iconPoint) {
    let coordinate = JSON.parse(polyline.toLowerCase())
    // this.setState({polyline:coordinate, type: 'polyline', iconUrl:iconUrl, iconPoint:JSON.parse(iconPoint.toLowerCase()),showIcon: true, visible:true, zoomDefualt: 8, centerDefualt: JSON.parse(iconPoint.toLowerCase())})
    // console.log(coordinate)
  }

  getPathsPoint(circle, radius, iconUrl, iconPoint) {
    let coordinate = JSON.parse(circle.toLowerCase())
    let ra = parseInt(radius)
    // this.setState({ radius: ra, center: coordinate, type: 'circle', iconUrl:iconUrl, iconPoint:JSON.parse(iconPoint.toLowerCase()),showIcon: true, visible:true, zoomDefualt: 8, centerDefualt: JSON.parse(iconPoint.toLowerCase())})
    // console.log(coordinate)
    // console.log(radius)
  }


  selectedCallback(e) {
    // console.log(e)

    if (e.selectedRowsData.length == 1) {
      // console.log('data 1 row')
      this.props.selectRow(e.selectedRowsData, 13, JSON.parse(e.selectedRowsData[0].iconPoint.toLowerCase()))
      // switch(e.selectedRowsData[0].geomTypeName){
      //   case 'Line':
      //     this.getPathsPolyline(e.selectedRowsData[0].coordinate,e.selectedRowsData[0].iconUrl,e.selectedRowsData[0].iconPoint)
      //     break;
      //   case 'Point':
      //     this.getPathsPoint(e.selectedRowsData[0].coordinate,e.selectedRowsData[0].radius,e.selectedRowsData[0].iconUrl,e.selectedRowsData[0].iconPoint)
      //     break;
      //   case 'Polygon':
      //     this.getPathsPolygon(e.selectedRowsData[0].coordinate,e.selectedRowsData[0].iconUrl,e.selectedRowsData[0].iconPoint)
      //     break;
      //   default:
      //     console.log('default')
      //     break;
      // }

    }
    else if (e.selectedRowsData.length == 0) {
      // console.log('deSelect', 6, {lat: 13.786377, lng: 100.608755})
      this.props.selectRow(e.selectedRowsData)
      // this.setState({showIcon: false, type:null, zoomDefualt: 6, centerDefualt: {lat: 13.786377, lng: 100.608755},})
    }
    else if (e.selectedRowsData.length > 1) {
      // console.log('more 1')
      this.props.selectRow(e.selectedRowsData, 6, { lat: 13.786377, lng: 100.608755 })
      // this.setState({showIcon: false, type:null, zoomDefualt: 6, centerDefualt: {lat: 13.786377, lng: 100.608755},})
    }

  }

  deleteCallback = (e) => {
    this.props.deleteGeofence(e.data.id)
    this.setState({ loadStore: true })
  }

  editCallback = (e) => {
    // console.log(e.data.id)
    this.props.idSelected("edit", e.data.id)
    this.props.history.push('/geofenceForm')
  }

  //--------------------------------  Start Geofence ------------------------//

  //--------------------------------  End Geofence ------------------------//
  render() {
    return (
      <div>
        <Row>
          <Col lg="6">
            <div className="ibox">
              <div className="ibox-title" style={{ padding: '15px 20px 10px 15px' }}>
                <Row style={{ marginBottom: 0 }}>
                  <Col lg="6">
                    <h4>{t('geofence_1')}</h4>
                    {/* <h4>{t('geofence_1')}</h4> */}
                    {/* {t('geofence_1')} */}
                    {/* {cellRender("https://s3.amazonaws.com/hino.ecm.file.bucket/Temp2/0319_fetjhipqgssurtw")} */}
                    {/* <img src="https://s3.amazonaws.com/hino.ecm.file.bucket/Temp2/0319_fetjhipqgssurtw"/> */}
                  </Col>
                  <Col lg="6">
                    <div style={{ textAlign: "right", }} >

                      <Button className="btn btn-primary btn-sm" onClick={() => this.addForm()}><i className="fa fa-plus"></i>{' '}{t('geofence_2')}</Button>
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
                    // selection={{ mode: 'single' }}
                    mode={"api"}
                    serversideSource={ENDPOINT_BASE_URL + 'Geofence/Geofence/GridView?lang=' + this.props.language}
                    // loadStore={this.state.loadStore}
                    cookiesOptions={{
                      enable: true,
                      name: "Geofences"
                    }}
                    author={this.props.headers.idToken}
                    xAPIKey={this.props.headers.redisKey}
                    language={this.props.language}
                    table_id={7}
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
                        column_name: 'name',
                        column_caption: 'geofence_3'
                      },
                      {
                        column_name: 'geofenceTypeName',
                        column_caption: 'geofence_4'
                      },
                      {
                        column_name: 'province',
                        column_caption: 'geofence_5'
                      },
                      {
                        column_name: 'createdBy',
                        column_caption: 'geofence_6'
                      },
                      {
                        column_name: 'createdDateTime',
                        column_caption: 'geofence_7',
                        column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
                      },
                      {
                        column_name: 'updatedBy',
                        column_caption: 'geofence_8'
                      },
                      {
                        column_name: 'updatedDateTime',
                        column_caption: 'geofence_9',
                        column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
                      },
                    ]}
                  >
                  </Table>
                </Row>
              </div>
            </div>

          </Col>
          <Col lg="6" style={{ position: 'relative', }}>
            <Row>
              <MapDraw
                // visible={this.state.visible}
                zoomDefualt={this.state.zoomDefualt}
                centerDefualt={this.state.centerDefualt}
                showIcon={this.state.showIcon}
                form={false}
                polygon={[{
                  lat: 0,
                  lng: 0
                }]}
                polyline={[{
                  lat: 0,
                  lng: 0
                }]}
                circle={[{
                  lat: 0,
                  lng: 0
                }]}
                center={[{
                  lat: 0,
                  lng: 0
                }]}
                radius={0}
                iconUrl={this.state.iconUrl}
                iconPoint={{
                  lat: 0,
                  lng: 0
                }}
                type={this.state.type}
              // getPathsPolygon={(e) => console.log(e)}
              // getPathsPolyline={(e) => console.log(e)}
              // getPathsPoint={(e, edit) => console.log(e)}
              // onChangeLat={(type, overlay, edit) => console.log(overlay)}
              >
                {/*  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `calc(70vh - 70px` }} />}
                containerElement= {<div style={{ height: `calc(70vh - 70px` }} />}
                mapElement={<div style={{ height: `calc(70vh - 70px` }} />} >
                getPathsPolygon={(e) => this.getPathsPolygon(e)}
            getPathsPolyline={(e) => this.getPathsPolyline(e)}
            getPathsCircle={(e) => this.getPathsCircle(e)}
            path={this.state.coordinates}
            radius={this.state.radius} */}

              </MapDraw>
            </Row>
          </Col>
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
  // groupType: state.signin.groupType,
  // userGroup: state.signin.userGroup,
  // currentUser: state.signin.currentUser,
  // partnerId: state.signin.profileUser.partnerId,
  // partnerTypeId: state.signin.profileUser.intPartnerType,
  // partnerType: state.signin.profileUser.partnerTypeName,
  id: state.geofence.idSelected,
  geofence: state.geofence.geofence,
  success: state.geofence.success,
  edit: state.geofence.edit,
  headers: state.signin.header,
  dataLogin: state.signin.dataLogin,
  language: state.versatile.language,
  // modal: state.userSetting.modal,
  // title: state.vehicle.title,
});
const mapDispatchToProps = (dispatch) => ({
  setData: (typeForm) => dispatch(GeofenceActions.setData(typeForm)),
  idSelected: (typeForm, id) => dispatch(GeofenceActions.idSelected(typeForm, id)),
  selectRow: (data, zoomSelected, centerSelected) => dispatch(GeofenceActions.selectRow(data, zoomSelected, centerSelected)),
  getGeofence: (id) => dispatch(GeofenceActions.getGeofence(id)),
  deleteGeofence: (id) => dispatch(GeofenceActions.deleteGeofence(id)),
  getDropdown: (id) => dispatch(GeofenceActions.getDropdown(id)),
  resetSelectRow: () => dispatch(GeofenceActions.resetSelectRow()),
  // removeUserRoleGroup: () => dispatch(UserSettingActions.remove)
  // setEditVehicleStart: (chassisNo,customerId,customerName,dealerId,dealerName,geoData,imei,lastGPSUpdate,lastLatitude,lastLongitude,licensePlate,status,vehicleId,vinNo) => dispatch(VehicleActions.setEditVehicleStart(chassisNo,customerId,customerName,dealerId,dealerName,geoData,imei,lastGPSUpdate,lastLatitude,lastLongitude,licensePlate,status,vehicleId,vinNo))
  // setEditVehicleStart: (data) => dispatch(VehicleActions.setEditVehicleStart(data)),
  // setVehicleSuccess: () => dispatch(VehicleActions.setVehicleSuccess()),
  // setVehicleStatus: (status) => dispatch(VehicleActions.setVehicleStatus(status)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Geofence)

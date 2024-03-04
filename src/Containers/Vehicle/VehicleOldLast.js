import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Form, Button } from 'reactstrap'
// import './custom.css'
import './Styles/animation.css'
import './Styles/fontello-codes.css'
import './Styles/fontello-embedded.css'
import './Styles/fontello-ie7-codes.css'
import './Styles/fontello-ie7.css'
import './Styles/fontello.css'

import './font/fontello.eot'
import './font/fontello.svg'
import './font/fontello.ttf'
import './font/fontello.woff'
import './font/fontello.woff2'

import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css'
import service from './data.js';

import DataGrid, {
  RemoteOperations, Texts, Column, FilterRow, HeaderFilter,
  SearchPanel, Grouping, GroupPanel, Paging, Export, Selection,
  MasterDetail, Editing, StringLengthRule, Summary, Scrolling
} from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';

import { Item } from 'devextreme-react/form';
import 'moment/locale/th'
import VehicleActions from "../../Redux/VehicleRedux";
import RealtimeActions from '../../Redux/RealtimeRedux'
// import axios from 'axios'

import PannelBox from '../../Components/PannelBox'

import { GoogleMap, LoadScriptNext, Marker, Polyline, InfoWindow, MarkerClusterer } from '@react-google-maps/api'


import picProfile0 from './PictureProfile/profile0.jpg'
import picProfile1 from './PictureProfile/profile1.jpg'
import picProfile2 from './PictureProfile/profile2.jpg'
import picProfile3 from './PictureProfile/profile3.jpg'
import picProfile4 from './PictureProfile/profile4.jpg'
import picProfile5 from './PictureProfile/profile5.jpg'
import picProfile6 from './PictureProfile/profile6.jpg'

import Images from '../Realtime/icons/Images'
import { switchCase } from '@babel/types'

const getOrderDay = (rowData) => {
  return (new Date(rowData.OrderDate)).getDay();
};

const saleAmountEditorOptions = { format: 'currency', showClearButton: true };

// Grid View Hino Vehicles
const url = 'https://api-center.onelink-iot.com/v1.0.0/api/hino/vehicles/grid-view';
const dataSource = createStore({
  key: 'vehicleId',//OrderID
  loadUrl: `${url}`,///Orders
  insertUrl: `${url}/InsertOrder`,
  updateUrl: `${url}/UpdateOrder`,
  deleteUrl: `${url}/DeleteOrder`,
  onBeforeSend: (method, ajaxOptions) => {

    ajaxOptions.xhrFields = { withCredentials: false };
  },
  onLoaded: (result) => result.data
});

const customersData = createStore({
  key: 'Value',
  loadUrl: `${url}`,///CustomersLookup
  onBeforeSend: (method, ajaxOptions) => {
    ajaxOptions.xhrFields = { withCredentials: true };
  }
});



class vehicle extends Component {

  constructor(props) {
    super(props)
    this.state = {

      img: null,
      titleFormType: '',
      modal: false,
      setModal: false,
      // userData: null,
      events: [],
      isRenderFirst: false,
      isSelectEvent: false,
      isRenderImage: false,
      picProfile: picProfile0,
      eventInfo: {
        event_id: '-',
        vehicle_name: '-',
        licenseplate: '-',
        speed: '-',
        location: '-',
        event_name: '-',
        type: '-',
        color: '-',
        fuelLevel: '-',
        cardID: '-',
        Insurance: '-',
        InsuranceNo: '-',
        Stared: '-',
        Enden: '-',
        plate: '-',
        diverName: '-'


      },
      renderMarker: false,
      isShowMarker: false,
      locationMarker: { lat: null, lng: null },
      centerDefault: { lat: 13.786377, lng: 100.608755 },
      zoomDefault: 8,
      arrImg: [],
      course: 0,
      deferred: true,
      dealerId: null,
      selectData: null
    }
    this.onAutoExpandAllChanged = this.onAutoExpandAllChanged.bind(this);

    this.events = service.getEvents();
    this.applyFilterTypes = [{
      key: 'auto',
      name: 'Immediately'
    }, {
      key: 'onClick',
      name: 'On Button Click'
    }];
    this.saleAmountHeaderFilter = [{
      text: 'Less than $3000',
      value: ['SaleAmount', '<', 3000]
    }, {
      text: '$3000 - $5000',
      value: [
        ['SaleAmount', '>=', 3000],
        ['SaleAmount', '<', 5000]
      ]
    }, {
      text: '$5000 - $10000',
      value: [
        ['SaleAmount', '>=', 5000],
        ['SaleAmount', '<', 10000]
      ]
    }, {
      text: '$10000 - $20000',
      value: [
        ['SaleAmount', '>=', 10000],
        ['SaleAmount', '<', 20000]
      ]
    }, {
      text: 'Greater than $20000',
      value: ['SaleAmount', '>=', 20000]
    }];

    this.dataGrid = React.createRef();
    this.orderHeaderFilter = this.orderHeaderFilter.bind(this);
    this.setButton = this.setButton.bind(this);
    this.detectContentReady = this.detectContentReady.bind(this);

    this.handleChange = this.handleChange.bind(this)
    this.dataGrid = React.createRef();
    this.toggle = this.toggle.bind(this)
    this.onEditingStart = this.onEditingStart.bind(this);
    this.delete = this.delete.bind(this);

    this.selectTruck = this.selectTruck.bind(this);
    this.selectEvent = this.selectEvent.bind(this);

    // this.onInitialized = this.onInitialized.bind(this);
    // this.onRowRemoving = this.logEvent.bind(this, 'RowRemoving');

  }

  componentDidMount() {
    this.props.setListVehicle()
    this.props.setVehicleSuccess()


  }

  handleChange(event) {
    this.setState({
      img: URL.createObjectURL(event.target.files[0])
    })
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


  onAutoExpandAllChanged() {
    this.setState({
      autoExpandAll: !this.state.autoExpandAll
    });
  }

  onClickAdd() {
    // this.props.history.push("VehicleForm")
    this.props.setData('add')
  }


  setButton() {
    var currentSetting = this.dataGrid.current.instance.state();
    currentSetting.pageIndex = 7;
    // console.log(this.dataGrid.current.instance.state());
    // console.log(currentSetting);
    this.dataGrid.current.instance.state(currentSetting);
    this.dataGrid.current.instance.refresh();
  }

  detectContentReady(event) {
    var currentSetting = this.dataGrid.current.instance.state();
    this.setState((state, props) => {
      return { currentDataGridState: currentSetting };
    }, () => {
      //  console.log(this.state.currentDataGridState);
    });
  }

  showForm(isShow) {
    this.setState({ frmvehicleShow: isShow });

    if (!isShow) window.scrollTo(0, 0);
  }

  addForm() {
    this.props.setData('add')
    this.showForm(true);
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

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  addFormModal() {
    //   console.log("addFormModal")

    this.state.modal = !this.state.modal;

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

  componentWillMount() {
    this.state.isRenderFirst = true

    this.props.setData(null)
    let { arrImg, arrImgActive } = this.state
    let icon = [
      Images.carIcon1,
      Images.carIcon2,
      Images.carIcon3,
      Images.carIcon4,
      Images.carIcon5,
      Images.carIcon6
    ]
    for (let i in icon) {
      fetch(icon[i])
        .then(response => response.text())
        .then(text => {
          let svg_ = text;
          svg_ = svg_
            .replace(/^<\?(.+)\?>$/gm, '') // unsupported unnecessary line
            // You can replace anything you want, but first of all check your svg code
            .replace(/width.+\Wheight\S+/,
              'width="{{width}}" height="{{height}}" transform="{{transform}}"')

          // Load Map
          arrImg.push(svg_)
        })
    }

    let vid = ""
    for (let item in this.props.vehicle) {
      vid += "," + this.props.vehicle[item].vehicleId
    }

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.typeForm !== this.props.typeForm) {
      if (this.props.typeForm !== null) {
        setTimeout(() => this.props.history.push("vehicle/vehicleForm"), 200)

      }
    }
    if (prevProps.eventsForTruck !== this.props.eventsForTruck) {
      if (this.props.eventsForTruck !== null) {
        //  console.log(">> eventsForTruck DidUpdate <<")
        //  console.log(this.props.eventsForTruck)

        //  if (this.props.eventsForTruck.length > 0) this.setEventInfo(this.props.eventsForTruck[0], true)


      }
    }
  }


  delete(e) {
    e.cancel = "true";
    this.props.deleteVehicle(e.data.vehicleId)
  }


  selectTruck({ selectedRowsData }) {
    //this.setState({ events: [] })

    const data = selectedRowsData[0];
    let eventList = []

    if (data !== undefined) {

      // Get Events
      // console.log("data.vehicleId : " + data.vinNo)
      // this.props.getEventDataForTruck(data.vinNo)

      console.log("data : ", data)
      console.log("data.dealerId : " + data.dealerId)

      this.setState({
        selectData: data,
        dealerId: data.dealerId

      })

      this.setEventInfo(null, false)
      //TEST FIND OJECT
      for (let item in this.events) {
        if (this.events[item].vehicle_info.vid === data.vehicleId) {
          eventList.push(this.events[item])
        }
      }


      // this.setEventInfo(data, true)
      if (eventList.length > 0) this.setEventInfo(eventList[0], true)





      this.setState({ events: eventList, isRenderFirst: false })
    }
  }

  selectEvent({ selectedRowsData }) {

    // console.log(">> select Evnet <<")
    // console.log(selectedRowsData)

    const data = selectedRowsData[0];

    data !== undefined ? this.setEventInfo(data, true) : this.setEventInfo(data, false)
  }

  setEventInfo(data, isSeleted) {

    let eventInfo = this.state.eventInfo
    this.setState({ isRenderImage: false })
    if (data !== undefined && isSeleted) {
      // set event info
      eventInfo.event_id = data.event_id
      eventInfo.vehicle_name = data.vehicle_info.vehicle_name
      eventInfo.licenseplate = data.vehicle_info.licenseplate
      eventInfo.speed = data.speed
      eventInfo.location = data.location
      eventInfo.event_name = data.event_name

      eventInfo.type = data.type
      eventInfo.color = data.color
      eventInfo.fuelLevel = data.fuelLevel
      eventInfo.cardID = data.cardID
      eventInfo.Insurance = data.Insurance
      eventInfo.InsuranceNo = data.InsuranceNo
      eventInfo.Stared = data.Stared
      eventInfo.Enden = data.Enden
      eventInfo.plate = data.plate
      eventInfo.diverName = data.diverName

      let picProfile = null

      switch (data.picture) {
        case "profile1":
          picProfile = picProfile1
          break;
        case "profile2":
          picProfile = picProfile2
          break;
        case "profile3":
          picProfile = picProfile3
          break;
        case "profile4":
          picProfile = picProfile4
          break;
        case "profile5":
          picProfile = picProfile5
          break;
        case "profile6":
          picProfile = picProfile6
          break;
        default:
          picProfile = picProfile0
          break;
      }

      this.setState({ course: data.course, isSelectEvent: true, isRenderImage: true, picProfile })
      // focusMarker
      this.focusMarker(true, data.lat, data.lng, data.speed, data.vehicle_info.licenseplate)

    }
    else {
      eventInfo.event_id = '-'
      eventInfo.vehicle_name = '-'
      eventInfo.licenseplate = '-'
      eventInfo.speed = '-'
      eventInfo.location = '-'
      eventInfo.event_name = '-'

      eventInfo.type = '-'
      eventInfo.color = '-'
      eventInfo.fuelLevel = '-'
      eventInfo.cardID = '-'

      eventInfo.Insurance = '-'
      eventInfo.InsuranceNo = '-'
      eventInfo.Stared = '-'
      eventInfo.Enden = '-'
      eventInfo.plate = '-'
      eventInfo.diverName = '-'

      this.setState({ isSelectEvent: false, isRenderImage: true, picProfile: picProfile0 })
      this.focusMarker(false, null, null, null, null)
    }
    this.setState({ eventInfo })
    this.setState(prevState => prevState)
  }

  focusMarker(isShowMarker, lat, lng, speed, licenseplate) {
    this.setState({ renderMarker: false })
    if (isShowMarker) {
      this.map.panTo({ lat, lng })
      this.map.setZoom(10)
      let position = this.state.locationMarker
      position.lat = lat
      position.lng = lng

      this.setState({ isShowMarker, locationMarker: position, renderMarker: true, speed, licenseplate })
    }
    else {

      this.map.panTo({ lat: 13.786377, lng: 100.608755 })
      this.map.setZoom(8)
      this.setState({ isShowMarker, speed, licenseplate })
    }
  }
  onClickMarker(location) {
    this.map.panTo(location)
    this.map.setZoom(16)
  }

  onEditingStart(e) {
    e.cancel = "true";
    this.props.idSelected(e.data.vehicleId)
    this.props.infoVehicle(e.data.vehicleId)
    this.props.setData('edit')
  }


  onCenterChange() {
    if (this.map !== undefined) this.setState({ lat: this.map.getCenter().lat(), lng: this.map.getCenter().lng() })
  }

  markerMap() {
    // let index = Math.floor((Math.random() * 10) % 6)
    let index = 2
    let icon = this.state.arrImg[index]

    return (
      <Marker
        // icon={{ url: icTruck }}
        icon={{
          url: icon ? `data:image/svg+xml;charset=utf-8,
          ${encodeURIComponent(icon
            .replace('{{width}}', 100)
            .replace('{{height}}', 100)
            .replace('{{transform}}', `rotate(${this.state.course})`))}` : null,
          anchor: { x: 50, y: 50 }
        }}
        position={this.state.locationMarker}
        title={this.state.licenseplate + ' (' + this.state.speed + 'kph)'}
        onClick={() => {
          this.onClickMarker(this.state.locationMarker)
        }}
      />
    )
  }

  onInitialized(e) {
    // dataGrid = e.component;
    // this.calculateStatistics();
  }

  calculateStatistics() {
    // dataGrid.getSelectedRowsData().then(rowData => {
    //   var commonDuration = 0;

    //   for (var i = 0; i < rowData.length; i++) {
    //     commonDuration += rowData[i].Task_Due_Date - rowData[i].Task_Start_Date;
    //   }
    //   commonDuration = commonDuration / MILLISECONDS_IN_DAY;
    //   this.setState({
    //     taskCount: rowData.length,
    //     peopleCount: query(rowData)
    //       .groupBy('ResponsibleEmployee.Employee_Full_Name')
    //       .toArray()
    //       .length,
    //     avgDuration: Math.round(commonDuration / rowData.length) || 0
    //   });
    // });
  }





  render() {

    const style = {
      width: '300px',
      height: '300px'
    }
    const { component: Component, ...rest } = this.props

    const selectionFilter = ['event_id', '=', 9001];

    return (
      <div className="form-horizontal" >
        <Row>
          <Col lg="6">
            <div className="ibox float-e-margins">
              <div className="ibox-title">
                <h5>Vehicle</h5>
                <div className="ibox-tools">
                  <Button className="btn btn-primary btn-xs" onClick={() => this.onClickAdd()}><i className="fa fa-plus"></i>{' '}Add</Button>
                </div>
                <div className="ibox-content">
                  <Row>
                    {/* <DataGrid id={'gridContainer'}
                      ref={this.dataGrid}
                      dataSource={this.props.vehicle}
                      keyExpr={'vehicleId'}
                      showBorders={true}
                      allowColumnReordering={true}
                      onContentReady={this.detectContentReady}
                      onEditingStart={this.onEditingStart}
                      onRowRemoving={this.delete}
                      onSelectionChanged={this.selectTruck}
                    >
                      <GroupPanel visible={true} />
                      <RemoteOperations
                        groupPaging={true} />
                      <Grouping autoExpandAll={this.state.autoExpandAll} />
                      <Paging defaultPageSize={15} />

                      <Editing
                        mode={'window'}
                        useIcons="plus"

                        allowDeleting={true}
                        allowUpdating={true}>
                        <Form>
                          <Item itemType={'group'} colCount={2} colSpan={2}>
                            <Item dataField={'FirstName'} />
                            <Item dataField={'LastName'} />
                            <Item dataField={'Prefix'} />
                            <Item dataField={'BirthDate'} />
                            <Item dataField={'Position'} />
                            <Item dataField={'HireDate'} />
                            <Item
                              dataField={'Notes'}
                              editorType={'dxTextArea'}
                              colSpan={2}
                              editorOptions={{ height: 100 }} />
                          </Item>
                          <Item itemType={'group'} caption={'Home Address'} colCount={2} colSpan={2}>
                            <Item dataField={'StateID'} />
                            <Item dataField={'Address'} />
                          </Item>
                        </Form>
                      </Editing>
                      <FilterRow visible={false} />
                      <HeaderFilter visible={false} />
                      <SearchPanel visible={true}
                        width={240}
                        placeholder={'Search...'} />
                      <Export enabled={true} fileName={'Vehicle'} allowExportSelectedData={true} />
                      <Selection mode={'multiple'} />
                      <Column dataField={'vinNo'} minWidth={120} />
                      <Column dataField={'status'} minWidth={80} />
                      <Column dataField={'dealerName'} minWidth={120} />
                      <Column dataField={'licensePlate'} minWidth={120} />
                      <Column dataField={'chassisNo'} minWidth={120} />
                      <Column dataField={'imei'} minWidth={120} />
                    </DataGrid> */}


                    <DataGrid
                      dataSource={dataSource}
                      showBorders={true}
                      height={600}
                      remoteOperations={true}
                      keyExpr={'vehicleId'}
                      allowColumnReordering={true}
                      onContentReady={this.detectContentReady}
                      onEditingStart={this.onEditingStart}
                      onRowRemoving={this.delete}
                      onSelectionChanged={this.selectTruck}
                    >
                      <FilterRow visible={true} />
                      <HeaderFilter visible={true} />
                      <GroupPanel visible={true} />
                      <Scrolling mode="virtual" />
                      <Export enabled={true} fileName={'Vehicles'} allowExportSelectedData={true} />
                      <Selection mode="single" deferred={false} />
                      <Grouping autoExpandAll={false} />
                      <Paging defaultPageSize={15} />

                      <SearchPanel visible={true}
                        width={240}
                        placeholder={'Search...'} />
                      <Editing
                        mode={'window'}
                        useIcons="plus"
                        allowDeleting={true}
                        allowUpdating={true}>
                      </Editing>

                      <Column dataField="vinNo" caption="Vin No">

                      </Column>
                      <Column dataField="status" caption="Status">

                      </Column>
                      <Column dataField="dealerName" caption="Dealer Name">

                      </Column>
                      <Column dataField="chassisNo" caption="Chassis No">

                      </Column>
                      <Column dataField="imei" caption="Imei">

                      </Column>
                      <Summary>
                      </Summary>
                    </DataGrid>
                  </Row>
                </div>
              </div>
            </div>
          </Col>
          <Col lg="6">
            <div className="ibox float-e-margins">
              <div className="ibox-title" style={{ paddingBottom: 0 }}>
                <h5>Tracking Status</h5>
                <div className="ibox-tools">
                </div>
                <div className="ibox-content" style={{ padding: 0 }} >
                  <Row>
                    <Col lg="5" sm="4" xs="5" style={{ paddingTop: 10, paddingBottom: 10 }}>
                      {/* <small><i className="fa fa-stack-exchange"></i><b>Insurance:</b>กรุงเทพประกันภัย</small> */}
                      {/* <Row>
                        <small><i className="fa fa-stack-exchange"></i>{' '}<b>Insurance:</b>กรุงเทพประกันภัย</small> </Row>
                      <Row>
                        <small><i className="fa fa-stack-exchange"></i>{' '}<b>Insurance No.:</b>1100334456432</small>
                      </Row>
                      <Row>
                        <small><i className="fa fa-stack-exchange"></i>{' '}<b>Started:</b>2019-10-10</small>
                        <small><i className="fa fa-stack-exchange"></i>{' '}<b>Ended:</b>2020-10-10</small>
                      </Row> */}

                      {/*
                      <FormGroup>
                        <Label lg={12}>Event ID</Label>
                        <Col lg={12}>{this.state.eventInfo.event_id}</Col>
                      </FormGroup>

                      <FormGroup>
                        <Label lg={12}>Vehicle Name</Label>
                        <Col lg={12}>{this.state.eventInfo.vehicle_name}</Col>
                      </FormGroup>

                      <FormGroup>
                        <Label lg={12}>License Plate</Label>
                        <Col lg={12}>{this.state.eventInfo.licenseplate}</Col>
                      </FormGroup>

                      <FormGroup>
                        <Label lg={12}>Speed</Label>
                        <Col lg={12}>{this.state.eventInfo.speed}</Col>
                      </FormGroup>

                      <FormGroup>
                        <Label lg={12}>location</Label>
                        <Col lg={12}>{this.state.eventInfo.location}</Col>
                      </FormGroup>

                      <FormGroup>
                        <Label lg={12}>Event Name</Label>
                        <Col lg={12}>{this.state.eventInfo.event_name}</Col>
                      </FormGroup> */}
                      {
                        this.state.isSelectEvent && <Row>
                          <Col lg="12">
                            <b>{this.state.eventInfo.licenseplate}</b>{'   '}<small><i className="fa fa-circle" style={{ color: '#4CD964', paddingRight: 2 }} />Online {'   '}<i className="icon-path-21558" />50sec</small>
                          </Col>

                        </Row>
                      }
                      {
                        this.state.isSelectEvent && <Row>
                          <Col lg="12">
                            <small>{this.state.eventInfo.dateEvent}</small>
                          </Col>
                        </Row>
                      }


                      <Row>
                        <Col lg="6">
                          <small><b>Type:</b>{' ' + this.state.eventInfo.type}</small>
                        </Col>
                        <Col lg="6">
                          <small><b>Color:</b>{' ' + this.state.eventInfo.color}</small>
                        </Col>
                      </Row>
                      <div style={{ minHeight: '1rem' }}></div>

                      <Row>
                        <Col lg="6">
                          <small><i className="icon-gauge-1"></i><b>Speed:</b>{' ' + this.state.eventInfo.speed} km/hr</small>
                        </Col>
                        <Col lg="6">
                          <small><i className="demo-icon icon-fuel"></i><b>Fuel Level:</b>{' ' + this.state.eventInfo.fuelLevel}%</small>
                        </Col>
                      </Row>

                      <Row>
                        <Col lg="6">
                          <small><i className="icon-racing"></i><b>Tires:</b>{' '}--</small>
                        </Col>
                        <Col lg="6">
                          <small><i className="icon-axle"></i><b>Axle:</b>{' '}--</small>
                        </Col>
                      </Row>
                      <div style={{ minHeight: '1rem' }}></div>

                      <Row>
                        <Col lg="12">
                          <Col lg="2" style={{ paddingLeft: 0 }}>
                            {this.state.isRenderFirst ?
                              <img alt="image" className="img-circle" src={picProfile0} style={{ width: 34, height: 34 }} />
                              : this.state.isRenderImage &&
                              <img alt="image" className="img-circle" src={this.state.picProfile} style={{ width: 34, height: 34 }} />

                            }
                            {/* {this.state.isRenderImage &&
                              <img alt="image" className="img-circle" src={this.state.picProfile} style={{ width: 34, height: 34 }} />
                            } */}

                          </Col>
                          <Col lg="10">
                            <Row style={{ paddingLeft: 10 }}>
                              <small><b>{this.state.eventInfo.diverName}</b></small>
                            </Row>
                            <Row style={{ paddingLeft: 10 }}>
                              <small><i className="icon-credit-card-1" /> : {this.state.eventInfo.cardID}</small>
                            </Row>
                          </Col>
                        </Col>
                      </Row>

                      {/* <Row>
                        <Col lg="12">
                          <small><b>DLT:</b>{' '}Approved</small>
                        </Col>
                      </Row> */}
                      <div style={{ minHeight: '1rem' }}></div>

                      <Row>
                        <Col lg="12">
                          <small><i className="icon-audit"></i><b>Insurance:</b>{' ' + this.state.eventInfo.Insurance}</small>
                        </Col>
                      </Row>
                      {/* style={{ paddingLeft: 15 }} */}
                      <Row>
                        <Col lg="12">
                          <small><b>Insurance No.:</b>{' ' + this.state.eventInfo.InsuranceNo}</small>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <small><b>Stared:</b>{' ' + this.state.eventInfo.Stared}</small>
                        </Col>
                        <Col lg="6">
                          <small><b>Enden:</b>{' ' + this.state.eventInfo.Enden}</small>
                        </Col>
                      </Row>
                      {/* <Row>
                        <Col lg="12">
                          <small><b>Enden:</b>{' '}2020-10-10</small>
                        </Col>
                      </Row> */}
                      <br />
                      {this.state.selectData &&
                        <div>

                          <Row>
                            <Col lg="6">
                              <Button color="info" style={{ width: 90 }} href={'#/driver?id=' + this.state.driverId} >Driver </Button>
                            </Col>
                            <Col lg="6">
                              <Button color="info" style={{ width: 90 }} href={'#/dealer?id=' + this.state.dealerId}>Dealer</Button>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="6">
                              <Button color="info" style={{ width: 90 }} href={'#/customer?id=' + this.state.customerId}>Customer</Button>
                            </Col>
                            <Col lg="6">

                            </Col>
                          </Row>
                        </div>
                      }


                    </Col>
                    <Col lg="7" sm="8" xs="7" style={{ padding: 0 }}>
                      <LoadScriptNext id="script-loader" googleMapsApiKey={"AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A"}>
                        <GoogleMap
                          onLoad={map => { this.map = map }}
                          // zoom={this.state.zoomDefault}
                          zoom={this.state.zoomDefault}
                          mapContainerStyle={{
                            width: '100%',
                            height: '310px'
                          }}
                          isableDefaultUI={true}
                          center={this.state.centerDefault}
                          onDragEnd={this.onCenterChange.bind(this)}
                          mapContainerClassName={"map"}
                          id='event-map'
                          // options={{
                          //   fullscreenControlOptions: { position: 5 },
                          //   streetViewControlOptions: { position: 6 },
                          //   zoomControlOptions: { position: 6 },
                          // }}
                          options={{
                            zoomControl: true,
                            streetViewControl: false,
                            fullscreenControl: true,
                            mapTypeControl: false,
                          }}
                        // MapOptions={{
                        //   zoomControl: true,
                        //   mapTypeControl: true,
                        //   scaleControl: true,
                        //   streetViewControl: true,
                        //   rotateControl: true,
                        //   fullscreenControl: true
                        // }}
                        >

                          {
                            this.state.isShowMarker &&
                            this.state.renderMarker &&
                            this.markerMap()
                          }

                        </GoogleMap>
                      </LoadScriptNext>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>

            <div className="ibox float-e-margins">
              <div className="ibox-title">
                <h5>Recent Activities</h5>
                <div className="ibox-tools">
                </div>
                <div className="ibox-content">
                  <Row>
                    <Col lg="12">
                      {/* <DataGrid id={'gridContainer'}
                        selection={{ mode: 'single' }}
                        ref={this.dataGrid}
                        dataSource={this.state.events}
                        keyExpr={'id'}
                        showBorders={true}
                        allowColumnReordering={false}
                        onSelectionChanged={this.selectEvent}
                        defaultSelectionFilter={selectionFilter}
                      >
                        <GroupPanel visible={false} />
                        <Grouping autoExpandAll={this.state.autoExpandAll} />
                        <Paging defaultPageSize={5} />
                        <FilterRow visible={false} />
                        <HeaderFilter visible={false} />
                        <SearchPanel visible={false}
                          width={240}
                          placeholder={'Search...'} />
                        <Export enabled={false} fileName={'TEST'} allowExportSelectedData={true} />
                        <Selection mode={'multiple'} />

                        <Column dataField={'dtstart'} caption="Time" />
                        <Column dataField={'vehicle_info.licenseplate'} caption="Plate" />
                        <Column dataField={'diverName'} caption="Driver" />
                        <Column dataField={'event_name'} caption="Event" />
                      </DataGrid> */}

                      <DataGrid
                        id={'gridContainer'}
                        ref={this.dataGrid}
                        dataSource={this.state.events}
                        //  dataSource={this.props.eventsForTruck}
                        keyExpr={'id'}
                        showBorders={true}
                        allowColumnReordering={false}
                        onSelectionChanged={this.selectEvent}
                        defaultSelectionFilter={selectionFilter}
                      >
                        <Grouping autoExpandAll={this.state.autoExpandAll} />
                        <Selection mode="single" deferred={false} />
                        <Paging defaultPageSize={5} />
                        <FilterRow visible={false} />
                        <Column dataField={'dtstart'} caption="Time" />
                        <Column dataField={'vehicle_info.licenseplate'} caption="Plate" />
                        <Column dataField={'diverName'} caption="Driver" />
                        <Column dataField={'event_name'} caption="Event" />
                      </DataGrid>

                    </Col>
                  </Row>
                </div>
              </div>
            </div>

          </Col>
        </Row>

        {/* <Row>
          <Col lg="7">
            <div className="ibox-title">
              <h5>Vehicle</h5>
              <div className="ibox-tools">
                <Button className="btn btn-primary btn-xs" onClick={() => this.onClickAdd()}><i className="fa fa-plus"></i>{' '}Add</Button>
              </div>
            </div>
            <div className="ibox-content">
              <DataGrid id={'gridContainer'}
                ref={this.dataGrid}
                dataSource={this.props.vehicle}
                keyExpr={'vehicleId'}
                showBorders={true}
                allowColumnReordering={true}
                onContentReady={this.detectContentReady}
                onEditingStart={this.onEditingStart}
                onRowRemoving={this.delete}
                onSelectionChanged={this.selectTruck}
              >
                <GroupPanel visible={true} />
                <Grouping autoExpandAll={this.state.autoExpandAll} />
                <Paging defaultPageSize={15} />

                <Editing
                  mode={'window'}
                  useIcons="plus"

                  allowDeleting={true}
                  allowUpdating={true}>
                  <Form>
                    <Item itemType={'group'} colCount={2} colSpan={2}>
                      <Item dataField={'FirstName'} />
                      <Item dataField={'LastName'} />
                      <Item dataField={'Prefix'} />
                      <Item dataField={'BirthDate'} />
                      <Item dataField={'Position'} />
                      <Item dataField={'HireDate'} />
                      <Item
                        dataField={'Notes'}
                        editorType={'dxTextArea'}
                        colSpan={2}
                        editorOptions={{ height: 100 }} />
                    </Item>
                    <Item itemType={'group'} caption={'Home Address'} colCount={2} colSpan={2}>
                      <Item dataField={'StateID'} />
                      <Item dataField={'Address'} />
                    </Item>
                  </Form>
                </Editing>
                <FilterRow visible={false} />
                <HeaderFilter visible={true} />
                <SearchPanel visible={true}
                  width={240}
                  placeholder={'Search...'} />
                <Export enabled={true} fileName={'TEST'} allowExportSelectedData={true} />
                <Selection mode={'multiple'} />

                <Column dataField={'vinNo'} minWidth={120} />
                <Column dataField={'status'} minWidth={80} />
                <Column dataField={'dealerName'} minWidth={120} />
                <Column dataField={'customerName'} minWidth={120} />
                <Column dataField={'licensePlate'} minWidth={120} />
                <Column dataField={'chassisNo'} minWidth={120} />
                <Column dataField={'imei'} minWidth={120} />
              </DataGrid>
            </div>
          </Col>
          <Col lg="5">

            <div className="contrainner">
              <div className="ibox float-e-margins">
                <div className="ibox-title">
                  <h5>Tracking Status</h5>
                  <div className="ibox-content">
                    <Row>
                      <Col lg="3"></Col>
                      <Col lg="9">
                        <LoadScript id="script-loader" googleMapsApiKey={"AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A"}>
                          <GoogleMap
                            onLoad={map => { this.map = map }}
                            zoom={10}
                            disableDefaultUI={true}
                            center={{ lat: this.state.lat, lng: this.state.lng }}
                            onDragEnd={this.onCenterChange.bind(this)}
                            mapContainerClassName={"map"}
                            id='event-map'
                            options={{
                              fullscreenControlOptions: { position: 5 },
                              streetViewControlOptions: { position: 6 },
                              zoomControlOptions: { position: 6 }

                            }}
                          >
                          </GoogleMap>
                        </LoadScript>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>

            <div className="contrainner">
              <div className="ibox float-e-margins">
                <div className="ibox-title">
                  <h5>Recent Activities</h5>
                  <div className="ibox-content">
                    <Row>
                      <DataGrid id={'gridContainer'}
                        selection={{ mode: 'single' }}
                        ref={this.dataGrid}
                        dataSource={this.state.events}
                        keyExpr={'id'}
                        showBorders={true}
                        allowColumnReordering={false}
                        onSelectionChanged={this.selectEvent}
                      >
                        <GroupPanel visible={false} />
                        <Grouping autoExpandAll={this.state.autoExpandAll} />
                        <Paging defaultPageSize={5} />
                        <FilterRow visible={false} />
                        <HeaderFilter visible={false} />
                        <SearchPanel visible={false}
                          width={240}
                          placeholder={'Search...'} />
                        <Export enabled={false} fileName={'TEST'} allowExportSelectedData={true} />
                        <Selection mode={'multiple'} />

                        <Column dataField={'event_id'} caption="Event ID" minWidth={50} />
                        <Column dataField={'dtstart'} caption="Date Start" minWidth={150} />
                        <Column dataField={'event_name'} caption="Event Name" minWidth={150} />
                      </DataGrid>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row> */}
      </div >
    )
  }
}



const mapStateToProps = (state) => ({
  loading: state.vehicle.loading,
  vehicle: state.vehicle.vehicle,
  editStart: state.vehicle.editStart,
  error: state.vehicle.error,
  status: state.vehicle.status,
  title: state.vehicle.title,
  typeForm: state.vehicle.typeForm,
  eventsForTruck: state.realtime.eventsForTruck,
});

const mapDispatchToProps = (dispatch) => ({
  setData: typeForm => dispatch(VehicleActions.setData(typeForm)),
  idSelected: id => dispatch(VehicleActions.idSelected(id)),
  setListVehicle: () => dispatch(VehicleActions.setListVehicle()),
  deleteVehicle: (id) => dispatch(VehicleActions.deleteVehicle(id)),

  setVehicleSuccess: () => dispatch(VehicleActions.setVehicleSuccess()),
  setVehicleStatus: (status) => dispatch(VehicleActions.setVehicleStatus(status)),
  infoVehicle: (id) => dispatch(VehicleActions.infoVehicle(id)),

  getEventDataForTruck: (vinNo) => dispatch(RealtimeActions.getEventDataForTruck(vinNo)),

});


export default connect(mapStateToProps, mapDispatchToProps)(vehicle)

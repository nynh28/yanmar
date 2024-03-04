import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Form, Button, FormGroup } from 'reactstrap'
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
import './Styles/Table.css'

import DataGrid, {
  Column, FilterRow, Grouping, Paging, Selection
} from 'devextreme-react/data-grid';
import DataGridView from '../../Components/DataGridView'

import { Item } from 'devextreme-react/form';
import 'moment/locale/th'
import VehicleActions from "../../Redux/VehicleRedux";
import RealtimeActions from '../../Redux/RealtimeRedux'
// import axios from 'axios'

import PannelBox from '../../Components/PannelBox'

import { GoogleMap, LoadScriptNext, Marker, Polyline, InfoWindow, MarkerClusterer } from '@react-google-maps/api'
import MapControlsCustom from '../../Components/GoogleMap/MapControlsCustom'

import picProfile0 from './PictureProfile/profile0.jpg'
import picProfile1 from './PictureProfile/profile1.jpg'
import picProfile2 from './PictureProfile/profile2.jpg'
import picProfile3 from './PictureProfile/profile3.jpg'
import picProfile4 from './PictureProfile/profile4.jpg'
import picProfile5 from './PictureProfile/profile5.jpg'
import picProfile6 from './PictureProfile/profile6.jpg'

import Images from '../Realtime/icons/Images'

const getOrderDay = (rowData) => {
  return (new Date(rowData.OrderDate)).getDay();
};

class VehicleView extends Component {

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
    console.log(this.props.information)
    // this.state.isRenderFirst = true

    // this.props.setData(null)
    // let { arrImg, arrImgActive } = this.state
    // let icon = [
    //   Images.carIcon1,
    //   Images.carIcon2,
    //   Images.carIcon3,
    //   Images.carIcon4,
    //   Images.carIcon5,
    //   Images.carIcon6
    // ]
    // for (let i in icon) {
    //   fetch(icon[i])
    //     .then(response => response.text())
    //     .then(text => {
    //       let svg_ = text;
    //       svg_ = svg_
    //         .replace(/^<\?(.+)\?>$/gm, '') // unsupported unnecessary line
    //         // You can replace anything you want, but first of all check your svg code
    //         .replace(/width.+\Wheight\S+/,
    //           'width="{{width}}" height="{{height}}" transform="{{transform}}"')

    //       // Load Map
    //       arrImg.push(svg_)
    //     })
    // }

    // let vid = ""
    // for (let item in this.props.vehicle) {
    //   vid += "," + this.props.vehicle[item].vehicleId
    // }

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.typeForm !== this.props.typeForm) {
      if (this.props.typeForm !== null) {
        setTimeout(() => this.props.history.push("vehicle/vehicleForm"), 200)
      }
    }
    if (prevProps.information !== this.props.information) {
      console.log("_update_")
      console.log(this.props.information)
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

    console.log("render")

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
                <h5>Vehicle Status</h5>
                <div className="ibox-tools">
                </div>
                <div className="ibox-content" style={{ paddingLeft: 0, paddingRight: 0 }}>
                  <table className="table-custom">
                    <thead>
                      <tr>
                        <th><b>Vehicle</b></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td rowSpan="4" style={{ width: '10%' }}>
                          <img alt="image" className="img-circle" src={picProfile0} style={{ width: 34, height: 34 }} />
                        </td>
                        <td><small><b>Plate:</b> OLT-7878</small></td>
                        <td>
                          <small><b>Model: </b> FG8JH1B-PGT</small>
                        </td>
                        <td>
                          <small><b>Type: </b> รถบรรทุก 10 ล้อ</small>
                        </td>
                      </tr>

                      <tr>
                        <td><small>2019-10-10 22:22:22</small></td>
                        <td>
                          <small><b>Type: </b> รถบรรทุก 10 ล้อ</small>
                        </td>
                        <td>
                          <small><b>Color: </b> White</small>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <small><b>Insurance: </b> กรุงเทพประกันภัย</small>
                        </td>
                        <td>
                          <small><b>Started: </b> 2019-10-10</small>
                        </td>
                      </tr>


                      <tr>
                        <td>
                          <small><b>Insurance No: </b> 77013990129</small>
                        </td>
                        <td>
                          <small><b>Ended: </b> 2020-10-10</small>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div style={{ minHeight: '2rem' }}></div>

                  <table className="table-custom">
                    <thead>
                      <tr>
                        <th><b>Status</b></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <small><i className="fa fa-circle" style={{ color: '#4CD964', paddingRight: 2 }} />Online</small>
                        </td>
                        <td>
                          <small><b>DLT: </b> Approved</small>
                        </td>
                        <td>
                          <small><i className="icon-009-wifi-4" style={{ color: '#4CD964' }}></i><b>GPS Signal: </b> 77%</small>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <small><i className="icon-gauge-1"></i><b> speed: </b> 20(80) Km/Hr</small>
                        </td>
                        <td>
                          <small><b>Odometer: </b> 03225820 Km</small>
                        </td>
                        <td>
                          <small><i className="icon-006-high" style={{ color: '#4CD964' }}></i><b>GSM Signal: </b> 80%</small>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <small><i className="icon-onetrack--icon-01" style={{ marginRight: 5 }}></i><b> RPM: </b> 850</small>
                        </td>
                        <td>
                          <small><b>Engine Hours: </b> 0047818 Hr</small>
                        </td>
                      </tr>

                      <tr>
                        <td>{' '}</td>
                      </tr>

                      <tr>
                        <td>
                          <b>Status</b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div style={{ minHeight: '2rem' }}></div>

                  <table className="table-custom">
                    <thead>
                      <tr>
                        <th><b>Sensors</b></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <small><i className="icon-engine-01"></i><b> Engine: </b> On</small>
                        </td>
                        <td>
                          <small><i className="icon-exhaust"></i><b> Exhaust Break: </b> Off</small>
                        </td>
                        <td>
                          <small><i className="icon-doorsensorsvg"></i><b> Door Sensor: </b> Closed</small>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <small><i className="icon-path-21559"></i><b> Fuel Level: </b>96% </small>
                        </td>
                        <td>
                          <small><i className="icon-water"></i><b> Fuel Consumption: </b>3 Litre/Km </small>
                        </td>
                        <td>
                          <small><i className="icon-onetrack--icon-03"></i><b> Foot Pedal: </b> 96%</small>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <small><i className="icon-battery-4" style={{ color: '#4CD964' }}></i><b> Car Battery: </b> 24 V.</small>
                        </td>
                        <td>
                          <small><i className="icon-safety-belt"></i><b> Safety Belt: </b> Used</small>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <small><i className="icon-battery-4" style={{ color: '#4CD964' }}></i><b> Device Battery: </b> 4 V.</small>
                        </td>
                        <td>
                          <small><i className="icon-coolant"></i><b> Coolant: </b>100 °C</small>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div style={{ minHeight: '2rem' }}></div>

                  <table className="table-custom">
                    <thead>
                      <tr>
                        <th><b>Driver</b></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td rowSpan="3" style={{ width: '10%' }}>
                          <img alt="image" className="img-circle" src={picProfile0} style={{ width: 34, height: 34 }} />
                        </td>
                        <td>
                          <small><b>Name:</b> Loylum Bunnag</small>
                        </td>
                        <td>
                          <small><b>ตำแหน่ง </b> พนักงานขับรถ</small>
                        </td>
                        <td>
                          <small><b>ฝ่าย: </b> Logistics</small>
                        </td>
                      </tr>

                      <tr>
                        <td><small><i className="icon-credit-card-1"></i>7887828314</small></td>
                        <td>
                          <small><b>ประเภทบัตร: </b> ท.4</small>
                        </td>
                        <td>
                          <small><b>วันที่หมดอายุ: </b> 2020-10-10</small>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <small><b>โทร: </b> 064-551-6650</small>
                        </td>
                        <td>
                          <small><b>ไลน์: </b> puuuz</small>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/*
                  <table className="table-custom">
                    <tbody>
                      <tr>
                        <td>
                          <small><b>โทร: </b> 064-551-6650</small>
                        </td>
                        <td>
                          <small><b>ไลน์: </b> puuuz</small>
                        </td>
                        <td style={{ width: '50%' }}></td>
                      </tr>
                    </tbody>
                  </table> */}

                  <div style={{ minHeight: '2rem' }}></div>
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
                </div>
              </div>
            </div>
          </Col>
          <Col lg="6">
            <LoadScriptNext id="script-loader" googleMapsApiKey={"AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A"}>
              <GoogleMap
                onLoad={map => { this.map = map }}
                // zoom={this.state.zoomDefault}
                zoom={this.state.zoomDefault}
                mapContainerStyle={{
                  width: '100%',
                  height: window.innerHeight - 250,
                }}
                isableDefaultUI={true}
                center={this.state.centerDefault}
                onDragEnd={this.onCenterChange.bind(this)}
                mapContainerClassName={"map"}
                // options={{
                //   fullscreenControlOptions: { position: 5 },
                //   streetViewControlOptions: { position: 6 },
                //   zoomControlOptions: { position: 6 },
                // }}
                options={{
                  zoomControl: false,
                  mapTypeControl: false,
                  streetViewControl: false,
                  rotateControl: false,
                  fullscreenControl: false
                }}

              >
                {
                  this.map !== undefined &&
                  <MapControlsCustom
                    position={1}
                    map={this.map}

                    onClusterChange={value => this.setState({ clusterEnabled: value })}
                    onObjectChange={value => this.setState({ objectEnabled: value })}
                    onGeofencesChange={value => this.setState({ GeofencesEnabled: value })}

                  />
                }

                {
                  this.state.isShowMarker &&
                  this.state.renderMarker &&
                  this.markerMap()
                }

              </GoogleMap>
            </LoadScriptNext>
          </Col>
        </Row>

      </div >
    )
  }
}



const mapStateToProps = (state) => ({
  // loading: state.vehicle.loading,
  vehicle: state.vehicle.vehicle,
  //  editStart: state.vehicle.editStart,
  // error: state.vehicle.error,
  // status: state.vehicle.status,
  //  title: state.vehicle.title,
  typeForm: state.vehicle.typeForm,
  // eventsForTruck: state.realtime.eventsForTruck,
  credentialsInfo: state.signin.credentialsInfo,

  information: state.realtime.information,


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


export default connect(mapStateToProps, mapDispatchToProps)(VehicleView)

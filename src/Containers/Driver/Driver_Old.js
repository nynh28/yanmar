import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// import { connect } from 'react-redux'
import GenerateForm from 'react-form-generator-from-json'
import {
  Container, Row, Card, Col, Form,
  Input, Button, CardImg,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
  ButtonGroup, Modal
} from 'reactstrap'

import DetailTemplate from './DetailTemplate.js';
import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css'
import service from './data.js';
import DataGrid, { RemoteOperations, Column, FilterRow, HeaderFilter, SearchPanel, Grouping, GroupPanel, Paging, Export, Selection, MasterDetail, Editing } from 'devextreme-react/data-grid';
import DataGridView from '../../Components/DataGridView'

import { Item } from 'devextreme-react/form';
import data, { states } from './data.js';
import { throwStatement, thisExpression } from '@babel/types';
import moment from 'moment'
// import 'moment/locale/th'
import PannelBox from '../../Components/PannelBox'
// import './style.css'
import DriverActions from '../../Redux/DriverRedux'
import { connect } from 'react-redux'
import { Texts } from 'devextreme-react/tree-list';
import SigninActions from '../../Redux/SigninRedux'
import StarRatings from 'react-star-ratings';
import Chart from 'react-apexcharts'
import picProfile from './robert.jpg'
// import Images from '../Realtime/icons/Images'
import { GoogleMap, LoadScript, Marker, Polyline, InfoWindow, MarkerClusterer } from '@react-google-maps/api'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Images from '../../Themes/Images'
import DrivingSettingsActions, { DrivingSettingsTypes } from '../../Redux/DrivingSettingsRedux'
// import dataHino1 from './DataDriverJson/data-hino1'
// import dataHino2 from './DataDriverJson/data-hino2'
// import dataHino3 from './DataDriverJson/data-hino3'
// import dataHino4 from './DataDriverJson/data-hino4'

const getOrderDay = (rowData) => {
  return (new Date(rowData.OrderDate)).getDay();
};

const saleAmountEditorOptions = { format: 'currency', showClearButton: true };

class Driver extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tmp_graph: null,
      autoExpandAll: true,
      currentDataGridState: [],
      language: this.props.language,
      rating: 4,
      firstTiTle: {
        en: 'Driver List',
        th: 'รายการคนขับรถ'
      },
      secondTiTle: {
        en: 'Driver Profile',
        th: 'ประวัติคนขับรถ'
      },
      dataDefault: {
        "code": null,
        "prefixName": null,
        "name": null,
        "familyName": null,
        "aliasName": null,
        "houseAndVillage": null,
        "subdistrict": null,
        "district": null,
        "province": null,
        "phone": null,
        "lineID": null,
        "drivingLicenseCards": [
          {
            "drivingCardNo": null,
            "drivingCardType": 0,
            "driverId": 0,
          },
        ],
      },

      tmpDriverProfile: null,
      options: {
        series: [
          {
            name: "Radar ECO Summary",
            data: [10, 10, 10, 10, 10, 10]
          },
          // {
          //   name: "Radar Series 2",
          //   data: [26, 21, 20, 6, 8, 15]
          // }
        ],
        dataLabels: {
          enabled: false,
          style: {
            fontSize: 0,
            // fontFamily: 'Helvetica, Arial, sans-serif',
            // colors: undefined
          },
        },
        yaxis: {
          show: false,
        },
        markers: {
          size: 0,
          hover: {
            size: 0
          }
        },
        labels: ['Throttle Control', 'Shift-Up & Shift-Down', 'Exhaust & Retarder', 'Hash Start & Hash Acceletation', 'idling', 'RPM High & Low Speed']
      },
      options2: {
        series: [
          {
            name: "Radar Driving Safety",
            data: [10, 10, 10, 10, 10, 10]
          },
          // {
          //   name: "Radar Series 2",
          //   data: [26, 21, 20, 6, 8, 15]
          // }
        ],
        dataLabels: {
          enabled: false,
          style: {
            fontSize: 0,
            // fontFamily: 'Helvetica, Arial, sans-serif',
            // colors: undefined
          },
        },
        yaxis: {
          show: false,
        },
        markers: {
          size: 0,
          hover: {
            size: 0
          }
        },
        labels: ['Driving Speed', 'Hash Start', 'Seat Belt', 'Hash Turn', 'Hash Break', 'Driving Time']
      }

    };
    this.onAutoExpandAllChanged = this.onAutoExpandAllChanged.bind(this);
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
    this.delete = this.delete.bind(this);


    this.dataGrid = React.createRef();
    this.onEditingStart = this.onEditingStart.bind(this);
    this.selectEvent = this.selectEvent.bind(this);

    this.onToolbarPreparing = this.onToolbarPreparing.bind(this);
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift(
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'dx-icon icon-font-size-increase-2-512-01',
          onClick: DataGridView.zoom.zoomChange.bind(this, "gridDriver"),
          onload: DataGridView.zoom.setDefaultZoom()
        }
      });
  }

  componentWillReceiveProps(newProps, prevState) {

    if (newProps.listdriver && newProps.listdriver != null && newProps.listdriver.ID && newProps.listdriver.lineID) {
      this.props.setDriverProfile(newProps.listdriver[0])
    }
    if (newProps.data_getDriverDetail && newProps.data_getDriverDetail != null) {
      let tmp1 = this.state.options
      let tmp2 = this.state.options2
      if (newProps.data_getDriverDetail.drivingSafe && newProps.data_getDriverDetail.drivingSummary && newProps.data_getDriverDetail != this.state.tmp_graph) {
        tmp2.labels.forEach((e, i) => {
          if (e == "Driving Speed" && newProps.data_getDriverDetail.drivingSafe.drivingSpeed) {
            tmp2.series[0].data[i] = newProps.data_getDriverDetail.drivingSafe.drivingSpeed
          } else if (e == "Hash Start" && newProps.data_getDriverDetail.drivingSafe.hashStart) {
            tmp2.series[0].data[i] = newProps.data_getDriverDetail.drivingSafe.hashStart
          } else if (e == "Seat Belt" && newProps.data_getDriverDetail.drivingSafe.seatBelt) {
            tmp2.series[0].data[i] = newProps.data_getDriverDetail.drivingSafe.seatBelt
          } else if (e == "Hash Turn" && newProps.data_getDriverDetail.drivingSafe.hashTum) {
            tmp2.series[0].data[i] = newProps.data_getDriverDetail.drivingSafe.hashTum
          } else if (e == "Hash Break" && newProps.data_getDriverDetail.drivingSafe.hashBreak) {
            tmp2.series[0].data[i] = newProps.data_getDriverDetail.drivingSafe.hashBreak
          } else if (e == "Driving Time" && newProps.data_getDriverDetail.drivingSafe.drivingTime) {
            tmp2.series[0].data[i] = newProps.data_getDriverDetail.drivingSafe.drivingTime
          }

        })

        tmp1.labels.forEach((e, i) => {
          if (e == "Throttle Control" && newProps.data_getDriverDetail.drivingSummary.throttleControl) {
            tmp1.series[0].data[i] = newProps.data_getDriverDetail.drivingSummary.throttleControl
          } else if (e == "Shift-Up & Shift-Down" && newProps.data_getDriverDetail.drivingSummary.shiftUpDown) {
            tmp1.series[0].data[i] = newProps.data_getDriverDetail.drivingSummary.shiftUpDown
          } else if (e == "Exhaust & Retarder" && newProps.data_getDriverDetail.drivingSummary.exhaustRetarder) {
            tmp1.series[0].data[i] = newProps.data_getDriverDetail.drivingSummary.exhaustRetarder
          } else if (e == "Hash Start & Hash Acceletation" && newProps.data_getDriverDetail.drivingSummary.startAcceleration) {
            tmp1.series[0].data[i] = newProps.data_getDriverDetail.drivingSummary.startAcceleration
          } else if (e == "idling" && newProps.data_getDriverDetail.drivingSummary.idling) {
            tmp1.series[0].data[i] = newProps.data_getDriverDetail.drivingSummary.idling
          } else if (e == "RPM High & Low Speed" && newProps.data_getDriverDetail.drivingSummary.rpm) {
            tmp1.series[0].data[i] = newProps.data_getDriverDetail.drivingSummary.rpm
          }
        })
        this.props.setRadarGraph(tmp1, tmp2)
        this.setState({ options: tmp1, options2: tmp2, tmp_graph: newProps.data_getDriverDetail })
      }
    }
  }


  componentDidMount = () => {

    // let data1 = dataHino1
    // let data2 = dataHino2
    // let data3 = dataHino3
    // let data4 = dataHino4
    // console.log(data1)
    // console.log('------------------- Here JSON ----------------------------')
    // data2.forEach((e, i) => {
    //   if (i >= 2501 && i <= 2700) {
    //     let tmp = {
    //       prefixName: null,
    //       familyName: null,
    //       name: null,
    //       aliasName: null,
    //       houseAndVillage: null,
    //       subdistrict: null,
    //       district: null,
    //       province: null,
    //       country: null,
    //       phone: null,
    //       lineID: null,
    //       position: null,
    //       department: null,         // new
    //       drivingCardNo: null,      // new
    //       driverCode: null,
    //       activeDate: "2019-12-16",         // new
    //       personalId: null,
    //       drivingLicenseCards: [
    //         {
    //           drivingCardNo: null,
    //           drivingCardCountry: null,
    //           drivingCardType: null,
    //         }
    //       ]
    //     }

    //     // console.log(e.citizen_id)
    //     // console.log('--------------------- CItizen ID -------------------------------')
    //     // if (e.citizen_id && String(e.citizen_id.length) > 5 && String(e.citizen_id.length) < 30) {
    //       if (e.citizen_id && String(e.citizen_id.length > 5)) {
    //       // tmp.personalId = String(e.citizen_id.slice(0, 14))
    //       // console.log(e.citizen_id)
    //       // console.log('--------------------- CItizen ID -------------------------------')
    //       tmp.personalId = String(e.citizen_id).slice(0, 7) + String(i)
    //       // console.log(tmp.personalId, 'personalllllllllllllll')
    //     }
    //     if (e.sname && e.sname != null && e.sname != "") {
    //       tmp.name = e.sname
    //     }
    //     if (e.fname && e.fname != null && e.sname != "") {
    //       tmp.familyName = e.fname
    //     }
    //     if (e.prefix && e.prefix != null && e.prefix != "") {
    //       tmp.prefixName = e.prefix
    //       tmp.phone = "119911" + i
    //     }
    //     if (e.driver_id_card && e.driver_id_card != null) {
    //       tmp.drivingLicenseCards[0].drivingCardNo = e.driver_id_card
    //       tmp.drivingCardNo = e.driver_id_card
    //     }
    //     if (e.card_type && e.card_type != null) {
    //       tmp.drivingLicenseCards[0].drivingCardType = e.card_type
    //     }
    //     if (e.branch && e.branch != null) {
    //       tmp.drivingLicenseCards[0].drivingCardCountry = e.branch
    //     }
    //     if (e.birthdate && e.birthdate != null) {
    //       tmp.driverCode = e.birthdate
    //     }
    //     // console.log(tmp)
    //     // console.log('------------------ Tmp Before Link API ----------------------------')
    //     if (tmp && tmp != null && tmp.prefixName && tmp.name && tmp.phone && tmp.driverCode && tmp.personalId &&
    //       tmp.drivingLicenseCards[0].drivingCardNo && tmp.drivingLicenseCards[0].drivingCardCountry) {
    //       // console.log('------------------ Last Step Connect API -------------------')

    //       // this.props.createDriver(2, tmp)

    //     }
    //   }
    // })


    // console.log(dataHino1)
    // console.log("---------------- Data JSON Form --------------------------------------")
    // // this.props.searchDrivers(this.props.businessPartnerId)
    // let id = this.props.businessPartnerId ? this.props.businessPartnerId : 2
    // this.props.searchDrivers(id)
    // //  this.props.getDictionary()
    // // this.props.getDriversByID(67) // can't call API
    // this.props.setData(null)
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps.typeForm !== this.props.typeForm) {
      if (this.props.typeForm !== null) {
        this.props.history.push("/driver/driverForm")
      }
    }

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

  dateFormat = (data) => {
    // console.log(data)
    // return "5555";
    return moment(data.value).format('llll')
  }

  onAutoExpandAllChanged() {
    this.setState({
      autoExpandAll: !this.state.autoExpandAll
    });
  }

  setButton() {
    var currentSetting = this.dataGrid.current.instance.state();
    currentSetting.pageIndex = 7;
    this.dataGrid.current.instance.state(currentSetting);
    this.dataGrid.current.instance.refresh();
  }

  detectContentReady(event) {
    if (this.props.listdriver !== null) {
      var currentSetting = this.dataGrid.current.instance.state();
      this.setState((state, props) => {
        return { currentDataGridState: currentSetting };
      }, () => {
        // console.log(this.state.currentDataGridState);
      });
    }
  }

  delete(e) {
    e.cancel = "true";
    this.props.deleteDriversByID(this.props.businessPartnerId, e.data.customerDriverId)
  }

  changeRating = (newRating, name) => {
    // this.setState({
    //   rating: newRating
    // });
  }

  changeRating = (newRating, name) => {
    // this.setState({
    //   rating: newRating
    // });
  }


  dateFormat = (data) => {
    // console.log(data)
    // return "5555";
    return moment(data.value).format('llll')
  }

  // showForm(isShow) {
  //   this.setState({ frmVihecleShow: isShow });

  //   if (!isShow) window.scrollTo(0, 0);
  // }

  addForm() {
    this.props.setData('add')
    // this.props.history.push("formdriver")
    this.props.history.push("/driver/driverForm")

  }

  onEditingStart(e) {
    // ใช้
    e.cancel = "true"

    let key = e.row.data.driverId
    // this.props.getDriversByID(key)
    // if(this.props.typeForm==='edit'){

  }


  setDevicelist(device, i) {
    let color = this.props.information.gps === undefined ? null :
      device.gps.mid === this.state.tdAcitive ? '#EEEEEE' : null
    let iconcheckbox = this.state.checkArrayVehicles.includes(device.gps.mid) ? "fa-check-square" : "fa-square-o"
    return (
      // <tr onClick={this.selectDevice.bind(this, device)} style={{ cursor: 'pointer' }} key={"tr" + i}>
      <tr style={{ cursor: 'pointer', backgroundColor: color }} key={"tr" + i} >
        <td width="70%" style={{ padding: 4 }}>
          <div style={{ flexDirection: 'row', display: 'flex', paddingLeft: 10 }}>
            <i className={"fa " + iconcheckbox} style={{ marginRight: 5, marginTop: 2 }}
              onClick={() => console.log('test button ')} />
            {/* <div onClick={() => this.props.getInformation(device.gps.mid)} style={{ width: '100%' }}> */}
            <div onClick={() => console.log('test button 2')} style={{ width: '100%' }}>
              {/* {device.device_name} */}
              <b>{device.info.licenseplate}</b>
              <div style={{ fontSize: 8, marginTop: -3, color: 'grey' }}>
                555555
              </div>
            </div>
          </div>

        </td>
        <td width="30%" style={{ padding: '6px 4px', marginTop: 2 }}>
          <div style={{ float: 'right' }}>
            {72}kph
            <i className="fa fa-circle" style={{ color: device.icons.color, marginLeft: 5 }} />
          </div>
        </td>
      </tr>
    )
  }

  // selectDriver = (item, index) => {
  //   console.log(item)
  //   let itemSelect = item.selectedRowsData
  //   if (itemSelect.length == 1) {
  //     this.props.setDriverProfile(itemSelect[0])
  //     this.props.getDriverDetail(itemSelect[0].customerDriverId)
  //   } else {
  //     this.props.setDriverProfile(null)
  //   }
  // }

  selectEvent({ selectedRowsData }) {
    const data = selectedRowsData[0];
    if (data !== undefined) {
      this.props.setDriverProfile(data)
      this.props.getDriverDetail(data.id)
    }
    else {
      this.props.setDriverProfile(null)
    }
  }

  editFormDriver = () => {
    if (this.props.tmp_driver_profile) {
      this.props.setDataEditDriver(this.props.tmp_driver_profile)
      this.props.history.push('/driver/driverFormEdit')
    } else {
      alert('Please Select Driver')
    }
  }

  submitDelete = () => {
    if (this.props.tmp_driver_profile) {
      confirmAlert({
        title: 'Confirm to Delete',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => this.props.deleteSimulation(this.props.tmp_driver_profile)
          },
          {
            label: 'No',
            // onClick: () => alert('Click No')
            onClick: () => { }
          }
        ]
      });
    }
    else {
      alert('Please select driver')
    }

  };

  render() {
    let dataSource
    // if (this.props.credentialsInfo) {
    //   dataSource = DataGridView.connect.dataSource('/v1.0.0/api/customers/drivers/grid-view?id=69', 'id', this.props.credentialsInfo)
    // }
    // console.log(this.props.credentialsInfo)
    // console.log('-----------------Driver Screen -----------------------')

    return (

      <div className="form-horizontal" >
        <Row>
          <Col lg="6">

            <div className="ibox float-e-margins">
              <div className="ibox-content" style={{ paddingLeft: 35, paddingRight: 35, borderWidth: ' 4px 0px 0px ', borderColor: '#e7eaec' }}>
                <Row style={{ textAlign: "right", marginTop: 5, marginBottom: 5 }}>
                  <Button className="btn btn-primary btn-sm" onClick={() => this.addForm()}><i className="fa fa-plus"></i>{' '}Add</Button>
                </Row>
                <Row>
                  <DataGrid
                    id={'gridDriver'}
                    dataSource={dataSource ? dataSource.connect : []}
                    showBorders={true}
                    keyExpr={'id'}
                    height={600}
                    remoteOperations={true}
                    allowColumnReordering={true}
                    //  onEditingStart={this.onEditingStart}
                    onRowRemoving={this.delete}
                    // onSelectionChanged={this.selectDriver}
                    onSelectionChanged={this.selectEvent}
                    onToolbarPreparing={this.onToolbarPreparing}
                  >
                    <FilterRow visible={true} />
                    <HeaderFilter visible={true} />
                    <GroupPanel visible={true} />
                    <SearchPanel visible={true}
                      width={240}
                      placeholder={'Search...'} />
                    <Export enabled={true} fileName={'Driver'} allowExportSelectedData={true} />
                    {/* <Grouping autoExpandAll={false} /> */}
                    <Grouping autoExpandAll={this.state.autoExpandAll} />
                    {/* <Scrolling mode="virtual" /> */}
                    <Paging defaultPageSize={10} />
                    <Selection mode={'multiple'} />

                    <Editing
                      mode={'window'}
                      useIcons="plus"
                      allowDeleting={true}
                      allowUpdating={true}
                    >
                      <Texts
                        confirmDeleteMessage={""}
                      />
                      {/* <Form>
                          <Item itemType={'group'} colCount={2} colSpan={2}>
                            <Item dataField={'code'} />
                            <Item dataField={'prefixName'} />
                            <Item dataField={'partnerName'} />
                            <Item dataField={'suffixName'} />
                            <Item dataField={'familyName'} />
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
                        </Form> */}
                    </Editing>

                    <Column dataField="driverCode" caption="Driver Code" minWidth={120}>
                      {/* <Lookup dataSource={customersData} valueExpr="Value" displayExpr="Text" /> */}
                      {/* <StringLengthRule max={5} message="The field Customer must be a string with a maximum length of 5." /> */}
                    </Column>
                    <Column dataField="name" caption="Name" minWidth={120}>
                      {/* <Lookup dataSource={customersData} valueExpr="Value" displayExpr="Text" /> */}
                      {/* <StringLengthRule max={5} message="The field Customer must be a string with a maximum length of 5." /> */}
                    </Column>
                    <Column dataField="drivingCardNo" caption="Driving Card No" minWidth={120}>
                      {/* <Lookup dataSource={customersData} valueExpr="Value" displayExpr="Text" /> */}
                      {/* <StringLengthRule max={5} message="The field Customer must be a string with a maximum length of 5." /> */}
                    </Column>
                    <Column dataField="email" caption="Email" minWidth={120}>
                      {/* <Lookup dataSource={customersData} valueExpr="Value" displayExpr="Text" /> */}
                      {/* <StringLengthRule max={5} message="The field Customer must be a string with a maximum length of 5." /> */}
                    </Column>

                    <Column dataField="phone" caption="Phone" minWidth={120}>
                      {/* <Lookup dataSource={customersData} valueExpr="Value" displayExpr="Text" /> */}
                      {/* <StringLengthRule max={5} message="The field Customer must be a string with a maximum length of 5." /> */}
                    </Column>
                    <Column dataField="lineID" caption="Line ID" minWidth={120}>
                      {/* <Lookup dataSource={customersData} valueExpr="Value" displayExpr="Text" /> */}
                      {/* <StringLengthRule max={5} message="The field Customer must be a string with a maximum length of 5." /> */}
                    </Column>

                    <Column type="buttons" width={110}
                      buttons={[
                        {
                          icon: 'fas fa-edit',
                          onClick: this.onEditingStart
                        },
                        // 'edit',
                        'delete',

                      ]} />

                    {/* <Summary>
                        <TotalItem column="Freight" summaryType="sum">
                          <ValueFormat type="decimal" precision={2} />
                        </TotalItem>

                        <GroupItem column="Freight" summaryType="sum">
                          <ValueFormat type="decimal" precision={2} />
                        </GroupItem>

                        <GroupItem summaryType="count" />

                      </Summary> */}
                  </DataGrid>
                </Row>
              </div>
            </div>

          </Col>
          {this.props.tmp_driver_profile && <Col lg="6">
            <div className="ibox float-e-margins">
              <div className="ibox-title">
                <h5>{this.state.secondTiTle[this.state.language]}</h5>
                <div style={{ textAlign: 'right' }}>
                  <div className="ibox-tools" style={{ float: 'none', marginRight: 5 }}>
                    <Button className="btn btn-primary btn-sm" onClick={() => {
                      if (this.props.tmp_driver_profile) {
                        this.submitDelete()
                      }
                      else {
                        alert('Please select driver')
                      }
                    }}><i className="fas fa-trash-alt"></i></Button>
                  </div>
                  <div className="ibox-tools" style={{ float: 'none' }}>
                    <Button className="btn btn-primary btn-sm" onClick={() => this.editFormDriver()}><i className="fas fa-edit"></i></Button>
                  </div>
                </div>
                <div className="ibox-content">

                  <Row>
                    <Row lg="12">
                      <div style={{ paddingLeft: 10 }}>
                        <span style={{ fontSize: 24 }}>{this.props.tmp_driver_profile && this.props.tmp_driver_profile.driverName ? this.props.tmp_driver_profile.driverName : 'Do not have driver name'}</span>
                      </div>
                    </Row>

                    <Row lg="12">
                      <div style={{ paddingLeft: 10 }}>
                        <span style={{ fontSize: 16, color: 'lightgrey' }}>{this.props.tmp_driver_profile && this.props.tmp_driver_profile.position ? this.props.tmp_driver_profile.position : 'Do not have position'}</span>
                      </div>
                    </Row>

                    <Row lg="12" style={{ paddingTop: 10 }}>

                      <Col lg="4">
                        <div>
                          <div>
                            {this.props.tmp_driver_profile && this.props.tmp_driver_profile.customerDriverId == 69 ? <img src={Images.driver1} style={{ width: '75%', minHeight: 75, maxHeight: 125, borderRadius: 5 }} /> : <img src={Images.noneuser} style={{ width: '75%', minHeight: 75, maxHeight: 125, borderRadius: 5 }} />}
                            {/* {this.props.tmp_driver_profile && this.props.tmp_driver_profile.pic && this.props.tmp_driver_profile.pic == 0 ? <img src={Images.pic0} style={{ width: '100%', minHeight: 150, borderRadius: 5 }} /> :
                              this.props.tmp_driver_profile && this.props.tmp_driver_profile.pic && this.props.tmp_driver_profile.pic == 1 ? <img src={Images.pic1} style={{ width: '100%', minHeight: 150, borderRadius: 5 }} /> :
                                this.props.tmp_driver_profile && this.props.tmp_driver_profile.pic && this.props.tmp_driver_profile.pic == 2 ? <img src={Images.pic2} style={{ width: '100%', minHeight: 150, borderRadius: 5 }} /> :
                                  this.props.tmp_driver_profile && this.props.tmp_driver_profile.pic && this.props.tmp_driver_profile.pic == 3 ? <img src={Images.pic3} style={{ width: '100%', minHeight: 150, borderRadius: 5 }} /> :
                                    this.props.tmp_driver_profile && this.props.tmp_driver_profile.pic && this.props.tmp_driver_profile.pic == 4 ? <img src={Images.pic4} style={{ width: '100%', minHeight: 150, borderRadius: 5 }} /> : <img src={Images.pic0} style={{ width: '100%', minHeight: 150, borderRadius: 5 }} />} */}


                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: 5 }}>
                            <div style={{ display: 'flex', flexDirection: 'row', ustifyContent: 'flex-start', alignItems: 'center' }}>
                              <i className="fas fa-map-marker-alt" ></i>
                              {/* <span style={{ color: 'lightgrey', paddingLeft: 5, fontSize: 14 }}>Bangkok, Thailand</span> */}
                              {this.props.tmp_driver_profile && this.props.tmp_driver_profile.pic && this.props.tmp_driver_profile.pic == 0 ? <span style={{ color: 'lightgrey', paddingLeft: 5, fontSize: 14 }}>Bangkok, Thailand</span> :
                                this.props.tmp_driver_profile && this.props.tmp_driver_profile.pic && this.props.tmp_driver_profile.pic == 1 ? <span style={{ color: 'lightgrey', paddingLeft: 5, fontSize: 14 }}>Nakhon Pathom</span> :
                                  this.props.tmp_driver_profile && this.props.tmp_driver_profile.pic && this.props.tmp_driver_profile.pic == 2 ? <span style={{ color: 'lightgrey', paddingLeft: 5, fontSize: 14 }}>Nakhonsritammarach</span> :
                                    this.props.tmp_driver_profile && this.props.tmp_driver_profile.pic && this.props.tmp_driver_profile.pic == 3 ? <span style={{ color: 'lightgrey', paddingLeft: 5, fontSize: 14 }}>Nontaburee</span> :
                                      this.props.tmp_driver_profile && this.props.tmp_driver_profile.pic && this.props.tmp_driver_profile.pic == 4 ? <span style={{ color: 'lightgrey', paddingLeft: 5, fontSize: 14 }}>Bangkok, Thailand</span> : <span style={{ color: 'lightgrey', paddingLeft: 5, fontSize: 14 }}>Chiangmai, Thailand</span>}

                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                              <i className={'fas fa-phone'}></i>
                              <span style={{ color: 'lightgrey', paddingLeft: 5, fontSize: 14 }}>{this.props.tmp_driver_profile && this.props.tmp_driver_profile.phone ? this.props.tmp_driver_profile.phone : "no phone"}</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                              <i className={'fab fa-line'}></i>
                              <span style={{ color: 'lightgrey', paddingLeft: 5, fontSize: 14 }}>{this.props.tmp_driver_profile && this.props.tmp_driver_profile.lineID ? this.props.tmp_driver_profile.lineID : 'no line ID'}</span>
                            </div>
                          </div>

                          <div style={{ paddingTop: 10, display: 'flex', flexDirection: 'column' }}>
                            <span>Rankings</span>
                            <StarRatings
                              rating={this.state.rating}
                              starRatedColor="#FFC107"
                              changeRating={this.changeRating}
                              numberOfStars={5}
                              name='rating'
                              starSpacing={2}
                              starDimension={20}
                            // isAggregateRating={false}
                            // isSelectable={true}
                            />
                          </div>
                          <div style={{ paddingTop: 10 }}>
                            <button>
                              <i className="fas fa-comment-dots"></i>
                              <span style={{ fontWeight: 'bold', paddingLeft: 2.5 }}>Message</span>
                            </button>
                          </div>

                        </div>
                      </Col>

                      <Col lg="4">
                        <div>
                          <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <i className="fas fa-leaf"></i>
                            <span style={{ fontWeight: 'bold', paddingLeft: 5 }}>ECO Driving Summary</span>
                          </div>

                          <div id="chart">

                            <Chart
                              options={this.state.options}
                              series={this.state.options.series}
                              type="radar"
                              width={"100%"}
                              height={200}
                            />
                            {/* {
                              this.props.radar_graph1 ? <Chart
                                options={this.props.radar_graph1}
                                series={this.props.radar_graph1}
                                type="radar"
                                width={"100%"}
                                height={200}
                              /> : <Chart
                                  options={this.state.options}
                                  series={this.state.options.series}
                                  type="radar"
                                  width={"100%"}
                                  height={200}
                                />
                            } */}
                            {/* <Chart
                              options={this.props.radar_graph1 ? this.props.radar_graph1 : this.state.options}
                              series={this.props.radar_graph1 ? this.props.radar_graph1.series : this.state.options.series}
                              type="radar"
                              width={"100%"}
                              height={200}
                            /> */}
                          </div>

                          <div>
                            {this.state.options && this.state.options.labels.map((e, i) => {
                              return (
                                <div key={'label' + i} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                  <span style={{ fontSize: this.state.options2.series[0].data[i].length > 19 ? 4 : 12 }}>{e} : {this.state.options.series[0].data[i]}</span>
                                </div>
                              )
                            })}
                          </div>
                          <div className="hr-line-dashed"></div>
                          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <span style={{ fontWeight: 'bold', textAlign: "center" }}>Summary : 100</span>
                          </div>
                        </div>
                      </Col>

                      <Col lg="4">
                        <div>
                          <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <i className="fas fa-user-shield"></i>
                            <span style={{ fontWeight: 'bold', paddingLeft: 5 }}>Driving Safety</span>
                          </div>

                          <div id="chart2">

                            <Chart
                              options={this.state.options2}
                              series={this.state.options2.series}
                              type="radar"
                              width={"100%"}
                              height={200}
                            />
                            {/* {
                              this.props.radar_graph2 ? <Chart
                                options={this.props.radar_graph2}
                                series={this.props.radar_graph2}
                                type="radar"
                                width={"100%"}
                                height={200}
                              /> : <Chart
                                  options={this.state.options2}
                                  series={this.state.options2.series}
                                  type="radar"
                                  width={"100%"}
                                  height={200}
                                />
                            } */}
                            {/* <Chart
                              options={this.props.radar_graph2 ? this.props.radar_graph2 : this.state.options2}
                              series={this.props.radar_graph2 ? this.props.radar_graph2.series : this.state.options2.series}
                              type="radar"
                              width={"100%"}
                              height={200}
                            /> */}

                            <div>
                              {this.state.options2 && this.state.options2.labels && this.state.options2.labels.map((e, i) => {
                                return (
                                  <div key={'label' + i} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                    <span style={{ fontSize: this.state.options2.series[0].data[i].length > 19 ? 6 : 12 }}>{e} : {this.state.options2.series[0].data[i]}</span>
                                  </div>
                                )
                              })}
                            </div>
                            <div className="hr-line-dashed"></div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                              <span style={{ fontWeight: 'bold', textAlign: "center" }}>Summary : 100</span>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Row>


                </div>
              </div>
            </div>

          </Col>}
        </Row>

      </div >
    )
  }
}


const mapStateToProps = (state) => ({
  getIDSuccess: state.driver.getIDSuccess,
  listdriver: state.driver.listdriver,
  typeForm: state.driver.typeForm,
  businessPartnerId: state.signin.businessPartnerId,
  language: state.versatile.language,
  tmp_driver_profile: state.driver.tmp_driver_profile,
  data_getDriverDetail: state.driver.data_getDriverDetail,
  radar_graph1: state.driver.radar_graph1,
  radar_graph2: state.driver.radar_graph2,
  // messageError: state.login.messageError,
  // data: state.login.data
  credentialsInfo: state.signin.credentialsInfo
});

const mapDispatchToProps = (dispatch) => ({
  setData: typeForm => dispatch(DriverActions.setData(typeForm)),

  getDriversByID: (id) => dispatch(DriverActions.getDriversByID(id)),

  deleteDriversByID: (bID, id) => dispatch(DriverActions.deleteDriversByID(bID, id)),

  searchDrivers: (id) => dispatch(DriverActions.searchDrivers(id)),

  getDictionary: () => dispatch(DriverActions.getDictionary()),

  createDriver: (id, data) => dispatch(DriverActions.createDriver(id, data)),
  setLoading: () => dispatch(DriverActions.setLoading()),
  setDriverProfile: (data) => dispatch(DriverActions.setDriverProfile(data)),
  setDataEditDriver: (data) => dispatch(DriverActions.setDataEditDriver(data)),
  getDriverDetail: (id) => dispatch(DriverActions.getDriverDetail(id)),
  setRadarGraph: (graph1, graph2) => dispatch(DriverActions.setRadarGraph(graph1, graph2)),
  deleteSimulation: (data) => dispatch(DriverActions.deleteSimulation(data)),
  getDrivingBehaviorList: () => dispatch(DrivingSettingsActions.getDrivingBehaviorList()),
  // setTest: test => dispatch(PopupActions.setTest(test))
});


export default connect(mapStateToProps, mapDispatchToProps)(Driver)

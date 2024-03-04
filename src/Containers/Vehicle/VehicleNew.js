import React, { Component } from 'react'
// import '../Layouts/css/custom.css';
// import { connect } from 'react-redux'
import GenerateForm from 'react-form-generator-from-json'
import { Container, Row, Card, Col, CardTitle, Form, Input, FormText, Button, FormGroup, Label } from 'reactstrap'
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
import moment from 'moment'
import 'moment/locale/th'
import Alert from "reactstrap/es/Alert";
import PannelBox from "../../Components/PannelBox";
import CancelButton from "../../Components/CancelButton";
import SaveButton from "../../Components/SaveButton";


const getOrderDay = (rowData) => {
  return (new Date(rowData.OrderDate)).getDay();
};

const saleAmountEditorOptions = { format: 'currency', showClearButton: true };

class vehicle extends Component {

  constructor(props) {
    super(props)
    this.state = {
      autoExpandAll: true,
      currentDataGridState: []
    };
    this.onAutoExpandAllChanged = this.onAutoExpandAllChanged.bind(this);
    this.orders = service.getOrders();
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

    this.state = {
      img: null,
      frmvehicleShow: false,
      titleFormType: '',
      formVehicleInfo:
        [
          {
            "typeField": "select",
            "label": "Fleet Name :",
            "required": false,
            "options": [
              {
                "pos": 1,
                "label": "10 ล้อ",
                "value": "001"
              }
            ],
            "name": "FleetName",
            "class": "",
            "tipText": "",
            "value": ""
          },
          {
            "typeField": "text",
            "label": "Vehicle Code : ",
            "required": false,
            "type": "text",
            "name": "VehicleCode",
            "class": "",
            "tipText": "",
            "placeholder": "",
            "value": "",
            "min_length": "",
            "max_length": "",
            "sufix": ""
          },
          {
            "typeField": "text",
            "label": "License Plate",
            "required": false,
            "type": "text",
            "name": "LicensePlate",
            "class": "",
            "tipText": "",
            "placeholder": "",
            "value": "",
            "min_length": "",
            "max_length": "",
            "sufix": ""
          },
          {
            "typeField": "select",
            "label": "Province",
            "required": false,
            "options": [
              {
                "pos": 1,
                "label": "กรุงเทพมหานคร",
                "value": "001"
              },
              {
                "pos": 2,
                "label": "พิษณุโลก",
                "value": "002"
              },
              {
                "pos": 3,
                "label": "สระบุรี",
                "value": "003"
              }
            ],
            "name": "Province",
            "class": "",
            "tipText": "",
            "value": ""
          },
          {
            "typeField": "text",
            "label": "Classis Number : ",
            "required": false,
            "type": "text",
            "name": "ClassisNumber",
            "class": "",
            "tipText": "",
            "placeholder": "",
            "value": "",
            "min_length": "",
            "max_length": "",
            "sufix": ""
          },
          {
            "typeField": "text",
            "label": "Type : ",
            "required": false,
            "type": "text",
            "name": "Type",
            "class": "",
            "tipText": "",
            "placeholder": "",
            "value": "",
            "min_length": "",
            "max_length": "",
            "sufix": ""
          }
          ,
          {
            "typeField": "text",
            "label": "Brand : ",
            "required": false,
            "type": "text",
            "name": "Brand",
            "class": "",
            "tipText": "",
            "placeholder": "",
            "value": "",
            "min_length": "",
            "max_length": "",
            "sufix": ""
          },
          {
            "typeField": "text",
            "label": "Model : ",
            "required": false,
            "type": "text",
            "name": "Model",
            "class": "",
            "tipText": "",
            "placeholder": "",
            "value": "",
            "min_length": "",
            "max_length": "",
            "sufix": ""
          },
          {
            "typeField": "text",
            "label": "Color : ",
            "required": false,
            "type": "text",
            "name": "Color",
            "class": "",
            "tipText": "",
            "placeholder": "",
            "value": "",
            "min_length": "",
            "max_length": "",
            "sufix": ""
          },
          {
            "typeField": "text",
            "label": "Speed Limit : ",
            "required": false,
            "type": "text",
            "name": "SpeedLimit",
            "class": "",
            "tipText": "",
            "placeholder": "",
            "value": "",
            "min_length": "",
            "max_length": "",
            "sufix": ""
          }
          ,
          {
            "typeField": "select",
            "label": "Issue Year",
            "required": false,
            "options": [
              {
                "pos": 1,
                "label": "2019",
                "value": "001"
              },
              {
                "pos": 2,
                "label": "2018",
                "value": "001"
              },
              {
                "pos": 3,
                "label": "2017",
                "value": "001"
              },
              {
                "pos": 4,
                "label": "2016",
                "value": "001"
              }
            ],
            "name": "IssueYear",
            "class": "",
            "tipText": "",
            "value": ""
          },
          {
            "typeField": "text",
            "label": "Engine(cc) : ",
            "required": false,
            "type": "text",
            "name": "Engine",
            "class": "",
            "tipText": "",
            "placeholder": "",
            "value": "",
            "min_length": "",
            "max_length": "",
            "sufix": ""
          }
          ,
          {
            "typeField": "text",
            "label": "Fuel tank size(Litre) : ",
            "required": false,
            "type": "text",
            "name": "FuelTankSize",
            "class": "",
            "tipText": "",
            "placeholder": "",
            "value": "",
            "min_length": "",
            "max_length": "",
            "sufix": ""
          }
          ,
          {
            "typeField": "text",
            "label": "Fuel type : ",
            "required": false,
            "type": "text",
            "name": "FuelType",
            "class": "",
            "tipText": "",
            "placeholder": "",
            "value": "",
            "min_length": "",
            "max_length": "",
            "sufix": ""
          }
          ,
          {
            "typeField": "text",
            "label": "Number of wheel : ",
            "required": false,
            "type": "text",
            "name": "NumberOfWheel",
            "class": "",
            "tipText": "",
            "placeholder": "",
            "value": "",
            "min_length": "",
            "max_length": "",
            "sufix": ""
          }
          ,
          {
            "typeField": "text",
            "label": "Fuel Consumtion(KM/L) or (KM/Hr) : ",
            "required": false,
            "type": "text",
            "name": "FuelConsumtion",
            "class": "",
            "tipText": "",
            "placeholder": "",
            "value": "",
            "min_length": "",
            "max_length": "",
            "sufix": ""
          }
          ,
          {
            "typeField": "text",
            "label": "Thermal limited : ",
            "required": false,
            "type": "text",
            "name": "ThermalLimited",
            "class": "",
            "tipText": "",
            "placeholder": "",
            "value": "",
            "min_length": "",
            "max_length": "",
            "sufix": ""
          }
          ,
          {
            "typeField": "text",
            "label": "Distance repair (km) : ",
            "required": false,
            "type": "text",
            "name": "DistanceRepair",
            "class": "",
            "tipText": "",
            "placeholder": "",
            "value": "",
            "min_length": "",
            "max_length": "",
            "sufix": ""
          },
          {
            "typeField": "text",
            "label": "Distance Total (km) : ",
            "required": false,
            "type": "text",
            "name": "DistanceTotal",
            "class": "",
            "tipText": "",
            "placeholder": "",
            "value": "",
            "min_length": "",
            "max_length": "",
            "sufix": ""
          }
          ,
          {
            "typeField": "text",
            "label": "Minimum temperature : ",
            "required": false,
            "type": "text",
            "name": "MinimumTemperature",
            "class": "",
            "tipText": "",
            "placeholder": "",
            "value": "",
            "min_length": "",
            "max_length": "",
            "sufix": ""
          }
          ,
          {
            "typeField": "text",
            "label": "Maximum temperature : ",
            "required": false,
            "type": "text",
            "name": "MaximumTemperature",
            "class": "",
            "tipText": "",
            "placeholder": "",
            "value": "",
            "min_length": "",
            "max_length": "",
            "sufix": ""
          }
          ,
          {
            "typeField": "text",
            "label": "Maximum RPM : ",
            "required": false,
            "type": "text",
            "name": "MaximumRPM",
            "class": "",
            "tipText": "",
            "placeholder": "",
            "value": "",
            "min_length": "",
            "max_length": "",
            "sufix": ""
          }

        ],
      formDriver: [
        {
          "typeField": "select",
          "label": "Driver's name",
          "required": false,
          "options": [
            {
              "pos": 1,
              "label": "นาย แดน ศักดิ์นาวัง",
              "value": "001"
            }
          ],
          "name": "field_xg_156860129ๆ8421",
          "class": "",
          "tipText": "",
          "value": ""
        }
      ],
      formVehicleStatus: [
        {
          "typeField": "select",
          "label": "Current Status",
          "required": false,
          "options": [
            {
              "pos": 1,
              "label": "Normal",
              "value": "001"
            }
          ],
          "name": "field_xg_1568601298421",
          "class": "",
          "tipText": "",
          "value": ""
        }
      ],
      formPicture: [
        {
          "typeField": "fileUpload",
          "label": "Upload",
          "required": false,
          "name": "field_wu_1568607381565",
          "class": "",
          "tipText": "",
          "placeholder": "",
          "value": ""
        }
      ],
      formPurchasinhInfo: [
        {
          "typeField": "text",
          "label": "Vendor's name : ",
          "required": false,
          "type": "text",
          "name": "VendorName",
          "class": "",
          "tipText": "",
          "placeholder": "",
          "value": "",
          "min_length": "",
          "max_length": "",
          "sufix": ""
        }
      ],
      formInsurance: [
        {
          "typeField": "text",
          "label": "Insurace Company : ",
          "required": false,
          "type": "text",
          "name": "InsuranceCompany",
          "class": "",
          "tipText": "",
          "placeholder": "",
          "value": "",
          "min_length": "",
          "max_length": "",
          "sufix": ""
        },
        {
          "typeField": "text",
          "label": "Insurance Policy Number : ",
          "required": false,
          "type": "text",
          "name": "InsurancePolicyNumber",
          "class": "",
          "tipText": "",
          "placeholder": "",
          "value": "",
          "min_length": "",
          "max_length": "",
          "sufix": ""
        },
        {
          "typeField": "text",
          "label": "Insurance Premium Rate : ",
          "required": false,
          "type": "text",
          "name": "InsurancePremiumRate",
          "class": "",
          "tipText": "",
          "placeholder": "",
          "value": "",
          "min_length": "",
          "max_length": "",
          "sufix": ""
        },
        {
          "typeField": "select",
          "label": "Insurance Type",
          "required": false,
          "options": [
            {
              "pos": 1,
              "label": "NA",
              "value": "001"
            }
          ],
          "name": "InsuranceType",
          "class": "",
          "tipText": "",
          "value": ""
        }
      ],
      formDataAct: [
        {
          "typeField": "text",
          "label": "Effective Date : ",
          "required": false,
          "type": "text",
          "name": "field_9_1568600937086",
          "class": "",
          "tipText": "",
          "placeholder": "",
          "value": "",
          "min_length": "",
          "max_length": "",
          "sufix": ""
        },
        {
          "typeField": "text",
          "label": "Expiration Date : ",
          "required": false,
          "type": "text",
          "name": "field_9_1568600937086",
          "class": "",
          "tipText": "",
          "placeholder": "",
          "value": "",
          "min_length": "",
          "max_length": "",
          "sufix": ""
        }

      ],
      formTaxData: [

        {
          "typeField": "text",
          "label": "Effective Date : ",
          "required": false,
          "type": "text",
          "name": "field_9_1568600937086",
          "class": "",
          "tipText": "",
          "placeholder": "",
          "value": "",
          "min_length": "",
          "max_length": "",
          "sufix": ""
        },
        {
          "typeField": "text",
          "label": "Expiration Date : ",
          "required": false,
          "type": "text",
          "name": "field_9_1568600937086",
          "class": "",
          "tipText": "",
          "placeholder": "",
          "value": "",
          "min_length": "",
          "max_length": "",
          "sufix": ""
        }
      ]
    }
    this.handleChange = this.handleChange.bind(this)
    // this.dataGrid = React.createRef();
    this.onEditingStart = this.onEditingStart.bind(this);
  }


  addForm() {
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

  onEditingStart(e) {
    e.cancel = true;

    this.showForm(true);
    this.setState({ titleFormType: 'Edit' });
    // GET DATA SELECTED
    let obj = {}
    for (const [key, value] of Object.entries(e.data)) {
      obj[key] = value
      // this.dataGrid.current.instance.cellValue(e.key, key, value + "01");
    }
    // this.dataGrid.current.instance.saveEditData();

    let fdi = this.state.formVehicleInfo

    for (let d in fdi) {
      fdi[d].value = obj[fdi[d].name]
    }

    let fdi2 = this.state.formPurchasinhInfo
    for (let d in fdi2) {
      fdi2[d].value = obj[fdi2[d].name]
    }

    let fdi3 = this.state.formInsurance
    for (let d in fdi3) {
      fdi3[d].value = obj[fdi3[d].name]
    }

    this.setState({ formVehicleInfo: fdi, formPurchasinhInfo: fdi2, formInsurance: fdi3 })

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

  setButton() {
    var currentSetting = this.dataGrid.current.instance.state();
    currentSetting.pageIndex = 7;
    console.log(this.dataGrid.current.instance.state());
    console.log(currentSetting);
    this.dataGrid.current.instance.state(currentSetting);
    this.dataGrid.current.instance.refresh();
  }

  detectContentReady(event) {
    var currentSetting = this.dataGrid.current.instance.state();
    this.setState((state, props) => {
      return { currentDataGridState: currentSetting };
    }, () => {
      console.log(this.state.currentDataGridState);
    });
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
    console.log(this.dataGrid.current.instance.state());
    console.log(currentSetting);
    this.dataGrid.current.instance.state(currentSetting);
    this.dataGrid.current.instance.refresh();
  }

  detectContentReady(event) {
    var currentSetting = this.dataGrid.current.instance.state();
    this.setState((state, props) => {
      return { currentDataGridState: currentSetting };
    }, () => {
      console.log(this.state.currentDataGridState);
    });
  }

  dateFormat = (data) => {
    // console.log(data)
    // return "5555";
    return moment(data.value).format('llll')
  }


  showForm(isShow) {
    this.setState({ frmvehicleShow: isShow });

    if (!isShow) window.scrollTo(0, 0);
  }


  render() {
    return (
      <div className="contrainner">


        <Container>
          <div className="ibox float-e-margins">
            <div className="ibox-title">
              <h5>{this.state.titleFormType} Vehicle</h5>
              <Alert>{this.props.error}</Alert>
            </div>
            <div className="ibox-content" >
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="row">
                        <div className="col-xs-12">
                          <div className="panel panel-default">
                            <div className="panel-heading">
                              <h4>Vehicle Information</h4>
                            </div>
                            <div className="panel-body">
                              {/*<div className="form-group">*/}
                              {/*    <label className="mainLabel inputLabel">*/}
                              {/*        <span>Vehicle ID</span>*/}
                              {/*        <input className="form-control" onChange={(e) => this.setState({vehicleId: e.target.value})}/>*/}
                              {/*    </label>*/}
                              {/*</div>*/}
                              <div className="form-group">
                                <label className="mainLabel inputLabel">
                                  <span>VIN No</span>
                                  <Input className="form-control" value={this.state.vinNo} onChange={(e) => this.setState({ vinNo: e.target.value })} />
                                </label>
                              </div>
                              <div className="form-group">
                                <label className="mainLabel inputLabel">
                                  <span>Vehicle Name</span>
                                  <Input type="select" className="form-control" value={this.state.vehicleName} onChange={(e) => this.setState({ vehicleName: e.target.value })}>
                                    <option selected disabled>Select</option>
                                    <option value="001">10 ล้อ</option>
                                  </Input>
                                </label>
                              </div>

                              <div className="form-group">
                                <label className="mainLabel inputLabel">
                                  <span>Vehicle Brand</span>
                                  <Input className="form-control" value={this.state.vehicleBrand} onChange={(e) => this.setState({ vehicleBrand: e.target.value })} />
                                </label>
                              </div>

                              <div className="form-group">
                                <label className="mainLabel inputLabel">
                                  <span>Vehicle Model</span>
                                  <Input className="form-control" value={this.state.vehicleModel} onChange={(e) => this.setState({ vehicleModel: e.target.value })} />
                                </label>
                              </div>
                              <div className="form-group">
                                <label className="mainLabel inputLabel">
                                  <span>Vehicle Spec Code</span>
                                  <Input className="form-control" value={this.state.vehicleSpecCode} onChange={(e) => this.setState({ vehicleSpecCode: e.target.value })} />
                                </label>
                              </div>
                              <div className="form-group">
                                <label className="mainLabel inputLabel">
                                  <span>Vehicle Ordering Model </span>
                                  <Input className="form-control" value={this.state.vehicleOrderingModel} onChange={(e) => this.setState({ vehicleOrderingModel: e.target.value })} />
                                </label>
                              </div>
                              <div className="form-group">
                                <label className="mainLabel inputLabel">
                                  <span>Chassis No</span>
                                  <Input className="form-control" value={this.state.chassisNo} onChange={(e) => this.setState({ chassisNo: e.target.value })} disbled={true} />
                                </label>
                              </div>
                              <div className="form-group">
                                <label className="mainLabel inputLabel">
                                  <span>Engine No</span>
                                  <Input className="form-control" value={this.state.engineNo} onChange={(e) => this.setState({ engineNo: e.target.value })} />
                                </label>
                              </div>
                              <div className="form-group">
                                <label className="mainLabel inputLabel">
                                  <span>HINO Vehicle Type</span>
                                  <Input className="form-control" value={this.state.hinoVehicleType} onChange={(e) => this.setState({ hinoVehicleType: e.target.value })} />
                                </label>
                              </div>
                              <div className="form-group">
                                <label className="mainLabel inputLabel">
                                  <span>HINO Body Type</span>
                                  <Input className="form-control" value={this.state.hinoBodyType} onChange={(e) => this.setState({ hinoBodyType: e.target.value })} />
                                </label>
                              </div>
                              <div className="form-group">
                                <label className="mainLabel inputLabel">
                                  <span>OLT Vehicle Type</span>
                                  <Input className="form-control" value={this.state.OLTVehicleType} onChange={(e) => this.setState({ OLTVehicleType: e.target.value })} />
                                </label>
                              </div>
                              <div className="form-group">
                                <label className="mainLabel inputLabel">
                                  <span>DLT Vehicle Type</span>
                                  <Input className="form-control" value={this.state.DLTVehicleType} onChange={(e) => this.setState({ DLTVehicleType: e.target.value })} />
                                </label>
                              </div>
                              <div className="form-group">
                                <label className="mainLabel inputLabel">
                                  <span>DLT Body Type</span>
                                  <Input className="form-control" value={this.state.DLTBodyType} onChange={(e) => this.setState({ DLTBodyType: e.target.value })} />
                                </label>
                              </div>


                              {/*<GenerateForm formJson={this.state.formVehicleInfo} />*/}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*<div className="row">
                                            <div className="col-xs-12">
                                                <div className="panel panel-default">
                                                    <div className="panel-heading">
                                                        <h4>Driver</h4>
                                                    </div>
                                                    <div className="panel-body">
                                                        <GenerateForm formJson={this.state.formDriver} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <div className="panel panel-default">
                                                    <div className="panel-heading">
                                                        <h4>Vehicle Status</h4>
                                                    </div>
                                                    <div className="panel-body">
                                                        <GenerateForm formJson={this.state.formVehicleStatus} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>*/}
                    </div>

                    <div className="col-sm-6">
                      <div className="row">
                        <div className="col-xs-12">
                          <div className="panel panel-default">
                            <div className="panel-body">
                              <div className="form-group">
                                <label className="mainLabel inputLabel">
                                  <span>Speed Limit</span>
                                  <Input className="form-control" value={this.state.speedLimit} onChange={(e) => this.setState({ speedLimit: e.target.value })} />
                                </label>
                              </div>
                              <div className="form-group">
                                <label className="mainLabel inputLabel">
                                  <span>License Plate No</span>
                                  <Input className="form-control" value={this.state.licensePlateNo} onChange={(e) => this.setState({ licensePlateNo: e.target.value })} />
                                </label>
                              </div>
                              <div className="form-group">
                                <label className="mainLabel inputLabel">
                                  <span>License Place</span>
                                  <Input className="form-control" value={this.state.licensePlace} onChange={(e) => this.setState({ licensePlace: e.target.value })} />
                                </label>
                              </div>
                              <div className="form-group">
                                <label className="mainLabel inputLabel">
                                  <span>License Date</span>
                                  <Input type="date" className="form-control" value={this.state.licensePlateDate} onChange={(e) => this.setState({ licensePlateDate: e.target.value })} />
                                </label>
                              </div>
                              <div className="form-group">
                                <label className="mainLabel inputLabel">
                                  <span>Body Color</span>
                                  <Input className="form-control" value={this.state.bodyColor} onChange={(e) => this.setState({ bodyColor: e.target.value })} />
                                </label>
                              </div>
                              <div className="form-group">
                                <label className="mainLabel inputLabel">
                                  <span>Seller Code</span>
                                  <Input className="form-control" value={this.state.sellerCode} onChange={(e) => this.setState({ sellerCode: e.target.value })} />
                                </label>
                              </div>
                              <div className="form-group">
                                <label className="mainLabel inputLabel">
                                  <span>Customer ID</span>
                                  <Input className="form-control" value={this.state.customerId} onChange={(e) => this.setState({ customerId: e.target.value })} />
                                </label>
                              </div>
                              <div className="form-group">
                                <label className="mainLabel inputLabel">
                                  <span>Warranty Start Date</span>
                                  <Input type="date" className="form-control" value={this.state.warrantyStartDate} onChange={(e) => this.setState({ warrantyStartDate: e.target.value })} />
                                </label>
                              </div>
                              <div className="form-group">
                                <label className="mainLabel inputLabel">
                                  <span>Warranty End Date</span>
                                  <Input type="date" className="form-control" value={this.state.warrantyEndDate} onChange={(e) => this.setState({ warrantyEndDate: e.target.value })} />
                                </label>
                              </div>
                              <div className="row">
                                {/*<div className="col-xs-12">
                                                                <div className="panel panel-default">
                                                                    <div className="panel-heading">
                                                                        <h4>Picture</h4>
                                                                    </div>
                                                                    <div className="panel-body">
                                                                        <Form action="upload.php" method="post" encType="multipart/form-data" >
                                                                            <Row>
                                                                                <img src={this.state.img} width="250" height="250" />
                                                                            </Row>
                                                                            <Row className="mt-2">
                                                                                <Input type="file" name="fileToUpload" id="fileToUpload" onChange={this.handleChange} />
                                                                                <FormText color="muted">file must be type .jpg and less than 100k</FormText>
                                                                            </Row>
                                                                        </Form>
                                                                    </div>
                                                                </div>
                                                            </div>*/}
                              </div>
                              <div className="row" >
                                {/*<div className="col-xs-12">
                                                                <div className="panel panel-default">
                                                                    <div className="panel-heading">
                                                                        <h4>Purchasing Information</h4>
                                                                    </div>
                                                                    <div className="panel-body">
                                                                        <GenerateForm formJson={this.state.formPurchasinhInfo} />
                                                                        <div className="form-group">
                                                                            <label className="mainLabel inputLabel">
                                                                                <span>Purchase Date : </span>
                                                                                <Input type="date"></Input>
                                                                            </label>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label className="mainLabel inputLabel">
                                                                                <span>Price : </span>
                                                                                <Input type="text"></Input>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>*/}
                              </div>
                              <div className="row">
                                {/*<div className="col-xs-12">
                                                                <div className="panel panel-default">
                                                                    <div className="panel-heading">
                                                                        <h4>Insurance</h4>
                                                                    </div>
                                                                    <div className="panel-body">
                                                                        <GenerateForm formJson={this.state.formInsurance} />
                                                                        <div className="form-group">
                                                                            <label className="mainLabel inputLabel">
                                                                                <span>Effective Date : </span>
                                                                                <Input type="date"></Input>
                                                                            </label>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label className="mainLabel inputLabel">
                                                                                <span>Expiration Date : </span>
                                                                                <Input type="date"></Input>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>*/}
                              </div>
                              <div className="row">
                                {/*<div className="col-xs-12">
                                                                <div className="panel panel-default">
                                                                    <div className="panel-heading">
                                                                        <h4>Data Act.</h4>
                                                                    </div>
                                                                    <div className="panel-body">
                                                                        <div className="form-group">
                                                                            <label className="mainLabel inputLabel">
                                                                                <span>Effective Date : </span>
                                                                                <Input type="date"></Input>
                                                                            </label>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label className="mainLabel inputLabel">
                                                                                <span>Expiration Date : </span>
                                                                                <Input type="date"></Input>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>*/}
                              </div>
                              <div className="row">
                                {/*<div className="col-xs-12">
                                                                <div className="panel panel-default">
                                                                    <div className="panel-heading">
                                                                        <h4>Tax data</h4>
                                                                    </div>
                                                                    <div className="panel-body">
                                                                        <div className="form-group">
                                                                            <label className="mainLabel inputLabel">
                                                                                <span>Effective Date : </span>
                                                                                <Input type="date"></Input>
                                                                            </label>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label className="mainLabel inputLabel">
                                                                                <span>Expiration Date : </span>
                                                                                <Input type="date"></Input>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>*/}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Row style={{ textAlign: "right" }}>
                <span style={{ color: 'red' }}>{this.props.error}</span>
                <Button className="ladda-button btn btn-primary" size="md" style={{ width: 100 }} data-style="slide-left" onClick={() => this.onClickSave()} disabled={this.props.loading} data-loading={this.props.loading}>
                  <span className="ladda-label">Save</span>
                  <span className="ladda-spinner"></span>
                </Button>
                {' '}
                <Button className="ladda-button btn btn-danger" size="md" style={{ width: 100 }} data-style="slide-left" onClick={() => this.onClickCancel()} disabled={this.props.loading} data-loading={this.props.loading}>Cancel</Button>
              </Row>
            </div>
          </div>
        </Container>
        <div className="ibox float-e-margins">
          <div className="ibox-title">
            <h5>Vehicle</h5>
            <div className="ibox-tools">
              <button className="btn btn-primary btn-xs" type="button" onClick={() => this.addForm()}><i className="fa fa-plus"></i>{' '}Add
              </button>
            </div>
          </div>
          <div className="ibox-content">
            <div className="row">
              <div className="col-lg-12">
                {/* <div id={'data-grid-demo'}>
                  <DataGrid
                    ref={this.dataGrid}
                    dataSource={employees}
                    keyExpr={'ID'}
                    showBorders={true}
                    onEditingStart={this.onEditingStart}
                  >
                    <Paging enabled={false} />
                    <Editing
                      mode={'window'}
                      allowUpdating={true}>
                      <Form>
                        <Item itemType={'group'} colCount={2} colSpan={2}>
                          <Item dataField={'FleetName'} />
                          <Item dataField={'VehicleCode'} />
                          <Item dataField={'LicensePlate'} />
                          <Item dataField={'Province'} />
                          <Item dataField={'ClassisNumber'} />
                          <Item dataField={'Type'} />
                          <Item dataField={'DriverName'} />
                        </Item>

                      </Form>
                    </Editing>
                    <Column dataField={'FleetName'} />
                    <Column dataField={'LicensePlate'} />
                    <Column dataField={'Province'}  />
                    <Column dataField={'ClassisNumber'} width={170} />
                    <Column dataField={'Type'}  />
                    <Column dataField={'DriverName'}  />

                  </DataGrid>
                </div> */}
                <DataGrid id={'gridContainer'}
                  ref={this.dataGrid}
                  dataSource={this.orders}
                  keyExpr={'ID'}
                  showBorders={true}
                  allowColumnReordering={true}
                  onContentReady={this.detectContentReady}
                  onEditingStart={this.onEditingStart}
                >
                  <GroupPanel visible={true} />
                  <Grouping autoExpandAll={this.state.autoExpandAll} />
                  <Paging defaultPageSize={10} />
                  <Editing
                    mode={'window'}
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
                  <FilterRow visible={true} />
                  <HeaderFilter visible={true} />
                  <SearchPanel visible={true}
                    width={240}
                    placeholder={'Search...'} />
                  <Export enabled={true} fileName={'TEST'} allowExportSelectedData={true} />
                  <Selection mode={'multiple'} />


                  {/* <Column dataField={'OrderNumber'}
                    minWidth={150}
                    caption={'Invoice Number'}>
                    <HeaderFilter groupInterval={10000} />
                  </Column>

                  <Column dataField={'OrderDate'}
                    alignment={'right'}
                    dataType={'date'}
                    minWidth={150}
                    calculateFilterExpression={this.calculateFilterExpression}
                    cellRender={this.dateFormat}
                  >
                    <HeaderFilter dataSource={this.orderHeaderFilter} />
                  </Column>

                  <Column dataField={'DeliveryDate'}
                    alignment={'right'}
                    dataType={'datetime'}
                    format={'M/d/yyyy, HH:mm'}
                    minWidth={150}
                  />

                  <Column dataField={'SaleAmount'}
                    alignment={'right'}
                    dataType={'number'}
                    format={'currency'}
                    minWidth={150}
                    editorOptions={saleAmountEditorOptions}>
                    <HeaderFilter dataSource={this.saleAmountHeaderFilter} />
                  </Column> */}

                  <Column dataField={'FleetName'} minWidth={150} />
                  <Column dataField={'LicensePlate'} minWidth={150} />
                  <Column dataField={'Province'} minWidth={150} />
                  <Column dataField={'ClassisNumber'} minWidth={150} />
                  <Column dataField={'DriverName'} minWidth={150} />
                  {/* <Column dataField={'CustomerStoreCity'}
                    caption={'City'} minWidth={150}>
                    <HeaderFilter allowSearch={true} />
                  </Column>
                  <MasterDetail
                    enabled={true}
                    component={DetailTemplate}
                  /> */}
                </DataGrid>
              </div>
            </div>
          </div>
        </div>

        <div className="ibox float-e-margins" style={this.state.frmvehicleShow ? {} : { visibility: "hidden" }} >
          <div className="ibox-title">
            <h5>{this.state.titleFormType} vehicle</h5>
          </div>
          <div className="ibox-content" >
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="row">
                      <div className="col-xs-12">
                        <div className="panel panel-default">
                          <div className="panel-heading">
                            <h4>Vehicle Information</h4>
                          </div>
                          <div className="panel-body">
                            <GenerateForm formJson={this.state.formVehicleInfo} />
                          </div>
                        </div>

                        {/* <div className="ibox float-e-margins">
                          <div className="ibox-title">
                            <h5>Vehicle Information</h5>
                          </div>
                          <div className="ibox-content">
                            <GenerateForm formJson={this.state.formVehicleInfo} />
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12">
                        <div className="panel panel-default">
                          <div className="panel-heading">
                            <h4>Driver</h4>
                          </div>
                          <div className="panel-body">
                            <GenerateForm formJson={this.state.formDriver} />
                          </div>
                        </div>
                        {/* <div className="ibox float-e-margins">
                          <div className="ibox-title">
                            <h5>Driver</h5>
                          </div>
                          <div className="ibox-content">
                            <GenerateForm formJson={this.state.formDriver} />
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12">
                        <div className="panel panel-default">
                          <div className="panel-heading">
                            <h4>Vehicle Status</h4>
                          </div>
                          <div className="panel-body">
                            <GenerateForm formJson={this.state.formVehicleStatus} />
                          </div>
                        </div>
                        {/* <div className="ibox float-e-margins">
                          <div className="ibox-title">
                            <h5>Vehicle Status</h5>
                          </div>
                          <div className="ibox-content">
                            <GenerateForm formJson={this.state.formVehicleStatus} />
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="row">
                      <div className="col-xs-12">
                        <div className="panel panel-default">
                          <div className="panel-heading">
                            <h4>Picture</h4>
                          </div>
                          <div className="panel-body">
                            <Form action="upload.php" method="post" encType="multipart/form-data" >
                              <Row>
                                <img src={this.state.img} width="250" height="250" />
                              </Row>
                              <Row className="mt-2">
                                <Input type="file" name="fileToUpload" id="fileToUpload" onChange={this.handleChange} />
                                <FormText color="muted">file must be type .jpg and less than 100k</FormText>
                              </Row>
                            </Form>
                          </div>
                        </div>
                        {/* <div className="ibox float-e-margins">
                          <div className="ibox-title">
                            <h5>Picture</h5>
                          </div>
                          <div className="ibox-content">
                            <Form action="upload.php" method="post" enctype="multipart/form-data" >
                              <Row>
                                <img src={this.state.img} width="250" height="250" />
                              </Row>
                              <Row className="mt-2">
                                <Input type="file" name="fileToUpload" id="fileToUpload" onChange={this.handleChange} />
                                <FormText color="muted">file must be type .jpg and less than 100k</FormText>
                              </Row>
                            </Form>

                          </div>
                        </div> */}
                      </div>
                    </div>
                    <div className="row" >
                      <div className="col-xs-12">
                        <div className="panel panel-default">
                          <div className="panel-heading">
                            <h4>Purchasing Information</h4>
                          </div>
                          <div className="panel-body">
                            <GenerateForm formJson={this.state.formPurchasinhInfo} />
                            <div className="form-group">
                              <label className="mainLabel inputLabel">
                                <span>Purchase Date : </span>
                                <Input type="date"></Input>
                              </label>
                            </div>
                            <div className="form-group">
                              <label className="mainLabel inputLabel">
                                <span>Price : </span>
                                <Input type="text"></Input>
                              </label>
                            </div>
                          </div>
                        </div>
                        {/* <div className="ibox float-e-margins">
                          <div className="ibox-title">
                            <h5>Purchasing Information</h5>
                          </div>
                          <div className="ibox-content">
                            <GenerateForm formJson={this.state.formPurchasinhInfo} />
                            <div className="form-group">
                              <label className="mainLabel inputLabel">
                                <span>Purchase Date : </span>
                                <Input type="date"></Input>
                              </label>
                            </div>
                            <div className="form-group">
                              <label className="mainLabel inputLabel">
                                <span>Price : </span>
                                <Input type="text"></Input>
                              </label>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12">
                        <div className="panel panel-default">
                          <div className="panel-heading">
                            <h4>Insurance</h4>
                          </div>
                          <div className="panel-body">
                            <GenerateForm formJson={this.state.formInsurance} />
                            <div className="form-group">
                              <label className="mainLabel inputLabel">
                                <span>Effective Date : </span>
                                <Input type="date"></Input>
                              </label>
                            </div>
                            <div className="form-group">
                              <label className="mainLabel inputLabel">
                                <span>Expiration Date : </span>
                                <Input type="date"></Input>
                              </label>
                            </div>
                          </div>
                        </div>
                        {/* <div className="ibox float-e-margins">
                          <div className="ibox-title">
                            <h5>Insurance</h5>
                          </div>
                          <div className="ibox-content">
                            <GenerateForm formJson={this.state.formInsurance} />
                            <div className="form-group">
                              <label className="mainLabel inputLabel">
                                <span>Effective Date : </span>
                                <Input type="date"></Input>
                              </label>
                            </div>
                            <div className="form-group">
                              <label className="mainLabel inputLabel">
                                <span>Expiration Date : </span>
                                <Input type="date"></Input>
                              </label>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12">
                        <div className="panel panel-default">
                          <div className="panel-heading">
                            <h4>Data Act.</h4>
                          </div>
                          <div className="panel-body">
                            <div className="form-group">
                              <label className="mainLabel inputLabel">
                                <span>Effective Date : </span>
                                <Input type="date"></Input>
                              </label>
                            </div>
                            <div className="form-group">
                              <label className="mainLabel inputLabel">
                                <span>Expiration Date : </span>
                                <Input type="date"></Input>
                              </label>
                            </div>
                          </div>
                        </div>
                        {/* <div className="ibox float-e-margins">
                          <div className="ibox-title">
                            <h5>Data Act.</h5>
                          </div>
                          <div className="ibox-content">
                            <div className="form-group">
                              <label className="mainLabel inputLabel">
                                <span>Effective Date : </span>
                                <Input type="date"></Input>
                              </label>
                            </div>
                            <div className="form-group">
                              <label className="mainLabel inputLabel">
                                <span>Expiration Date : </span>
                                <Input type="date"></Input>
                              </label>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12">
                        <div className="panel panel-default">
                          <div className="panel-heading">
                            <h4>Tax data</h4>
                          </div>
                          <div className="panel-body">
                            <div className="form-group">
                              <label className="mainLabel inputLabel">
                                <span>Effective Date : </span>
                                <Input type="date"></Input>
                              </label>
                            </div>
                            <div className="form-group">
                              <label className="mainLabel inputLabel">
                                <span>Expiration Date : </span>
                                <Input type="date"></Input>
                              </label>
                            </div>
                          </div>
                        </div>
                        {/* <div className="ibox float-e-margins">
                          <div className="ibox-title">
                            <h5>Tax data</h5>
                          </div>
                          <div className="ibox-content">
                            <div className="form-group">
                              <label className="mainLabel inputLabel">
                                <span>Effective Date : </span>
                                <Input type="date"></Input>
                              </label>
                            </div>
                            <div className="form-group">
                              <label className="mainLabel inputLabel">
                                <span>Expiration Date : </span>
                                <Input type="date"></Input>
                              </label>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Row style={{ textAlign: "right" }}>
              <button className="btn btn-success  dim" type="button" onClick={() => this.showForm(false)}><i className="fa fa-save"></i></button>
              <button className="btn btn-danger dim" type="button" onClick={() => this.showForm(false)}><i className="fa fa-remove"></i></button>
            </Row>
          </div>
        </div>
      </div >
    )
  }
}



// const mapStateToProps = (state) => ({
//     //   test: state.popup.test,
//     // messageError: state.login.messageError,
//     // data: state.login.data
// });

// const mapDispatchToProps = (dispatch) => ({
//     // setTest: test => dispatch(PopupActions.setTest(test))
// });


export default (vehicleNew)

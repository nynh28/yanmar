import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Form, Button } from 'reactstrap'
import { get } from 'lodash'
// import './custom.css'
import '../../Vehicle/Styles/animation.css'
import '../../Vehicle/Styles/fontello-codes.css'
import '../../Vehicle/Styles/fontello-embedded.css'
import '../../Vehicle/Styles/fontello-ie7-codes.css'
import '../../Vehicle/Styles/fontello-ie7.css'
import '../../Vehicle/Styles/fontello.css'
import { confirmAlert } from 'react-confirm-alert'; // Import
import '../../Vehicle/font/fontello.eot'
import '../../Vehicle/font/fontello.svg'
import '../../Vehicle/font/fontello.ttf'
import '../../Vehicle/font/fontello.woff'
import '../../Vehicle/font/fontello.woff2'

import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css'
import service from '../../Vehicle/data.js';

import DataGrid, {
  ColumnChooser, Texts, GroupItem, FilterRow, HeaderFilter,
  SearchPanel, Grouping, GroupPanel, Paging, Export, Selection,
  MasterDetail, Editing, StringLengthRule, Summary, Scrolling
} from 'devextreme-react/data-grid';
import DataGridView from '../../../Components/DataGridView'


import Table from '../../../Components/DataGridView/Table.js'

import { Item } from 'devextreme-react/form';
import 'moment/locale/th'
import VehicleActions from "../../../Redux/VehicleRedux";
import RealtimeActions from '../../../Redux/RealtimeRedux'
// import axios from 'axios'

import PannelBox from '../../../Components/PannelBox'

import { GoogleMap, LoadScript, Marker, Polyline, InfoWindow, MarkerClusterer } from '@react-google-maps/api'



import Images from '../../Realtime/icons/Images'
import { switchCase } from '@babel/types'

import { ENDPOINT_BASE_URL } from '../../../Config/app-config';

const getOrderDay = (rowData) => {
  return (new Date(rowData.OrderDate)).getDay();
};

const saleAmountEditorOptions = { format: 'currency', showClearButton: true };



class TripSummaryOL extends Component {

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

      arrImg: [],
      course: 0,
      deferred: true,
      dealerId: null,
      selectData: null,
      data: [],

      tableLoaded: false

    }
    this.onAutoExpandAllChanged = this.onAutoExpandAllChanged.bind(this);

    this.events = service.getEvents();

    this.loaddata()
    this.dataGrid = React.createRef();
    this.orderHeaderFilter = this.orderHeaderFilter.bind(this);
    this.setButton = this.setButton.bind(this);

    this.handleChange = this.handleChange.bind(this)
    this.dataGrid = React.createRef();
    this.toggle = this.toggle.bind(this)
    this.onEditingStart = this.onEditingStart.bind(this);

    this.selectViewData = this.selectViewData.bind(this);
    this.onVehicleView = this.onVehicleView.bind(this);
    // this.onInitialized = this.onInitialized.bind(this);
    // this.onRowRemoving = this.logEvent.bind(this, 'RowRemoving');
    this.onToolbarPreparing = this.onToolbarPreparing.bind(this);

    this.selectedCallback = this.selectedCallback.bind(this);
    this.tableInitial = this.tableInitial.bind(this)

    this.onRowDelete = this.onRowDelete.bind(this);
  }


  async loaddata() {
    var api = ENDPOINT_BASE_URL + "fleet/report/driving"
    var object = {
      vid_list: [196309],
      dtstart: "2020-04-28 07:00:00",
      dtstop: "2020-05-05 07:59:59",
      fleet_id: 0,
      cust_id: 1
    }
    var response = await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)

    });
    var responseJson = await response.json();
    //console.log(responseJson);
    this.setState({
      data: responseJson.result
    }, () => {
      this.setState({
        loading: false
      })
    })
    //console.log(this.state.vehicle);
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift(
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'dx-icon icon-font-size-increase-2-512-01',
          onClick: DataGridView.zoom.zoomChange.bind(this, "gridVehicle"),
          onload: DataGridView.zoom.setDefaultZoom()
        }
      });
  }

  componentDidMount() {
    // this.props.setListVehicle()
    // this.props.setVehicleSuccess()
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
    // this.props.setData('add')
    this.props.setPersonalIdSelect("", 'add')
    this.props.history.push("/vehicle/vehicleForm")
    this.props.setInfoVehicle(null)
    this.props.setInfoVehicleExtension(null)
  }


  setButton() {
    var currentSetting = this.dataGrid.current.instance.state();
    currentSetting.pageIndex = 7;
    // //console.log(this.dataGrid.current.instance.state());
    // //console.log(currentSetting);
    this.dataGrid.current.instance.state(currentSetting);
    this.dataGrid.current.instance.refresh();
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


  componentDidUpdate(prevProps, prevState) {
    if (prevProps.typeForm !== this.props.typeForm) {
      if (this.props.typeForm !== null) {
        // setTimeout(() => this.props.history.push("/vehicle/vehicleForm"), 200)
      }
    }
    // if (prevProps.infoVehicle !== this.props.infoVehicle) {
    //   //console.log(this.props.infoVehicle)
    //   this.props.history.push("/vehicle/vehicleForm")
    // }
  }


  onRowDelete(e) {
    e.cancel = "true";
    // this.props.deleteVehicle(e.data.vehicleId)
  }
  tableInitial(datagridinstance) {
    this.datagridinstance = datagridinstance
  }


  selectViewData({ selectedRowsData }) {
    const data = selectedRowsData[0];
    // data !== undefined ? this.setEventInfo(data, true) : this.setEventInfo(data, false)
  }



  onVehicleView(e) {
    // this.props.getInformation(e.row.data.vehicleId)
    this.props.history.push("/vehicle/VehicleView")
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

  submitDelete = () => {
    if (this.props.tmp_driver_profile) {
      confirmAlert({
        title: 'Confirm to Delete',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => this.props.deleteVehicle(this.props.tmp_driver_profile)
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
      alert('Please select vehicle')
    }

  };




  selectedCallback(e) {
    this.selectedRow = e.selectedRowsData;

  }

  // initialCallback(datagridInstance) {
  //   //console.log(datagridInstance)
  //   this.datagridInstance = datagridInstance
  //   this.setState({ tableLoaded: true })

  // }

  // editFormDriver = () => {
  //   if (this.props.tmp_driver_profile) {
  //     this.props.setDataEditDriver(this.props.tmp_driver_profile)
  //     this.props.history.push('/vehicle/VehicleForm')
  //   } else {
  //     alert('Please Select Driver')
  //   }
  // }

  editCallback(e) {
    //console.log(e)

    // let id = get(e, 'data.id')
    // this.props.setPersonalIdSelect(id, 'edit')
    // this.props.history.push("/vehicle/vehicleForm")
    // this.props.getInfoVehicleExtension(id)
    // this.props.getInfoVehicle(id)

    // this.props.history.push({ pathname: "/vehicle/VehicleForm", state: { id: id } })
  }

  // deleteCallback(e) {
  //   // //console.log(e)
  //   let id = get(e, 'data.id')
  //   if (id) this.props.deleteVehicle(id)

  //   // this.props.deleteVehicle(id)
  // }



  onEditingStart(e) {
    e.cancel = "true";

    //console.log("onEditingStart", e.data.id)
    this.props.history.push("/vehicle/vehicleForm")
    this.props.getInfoVehicleExtension(e.data.id)
    this.props.getInfoVehicle(e.data.id)
  }


  render() {

    // Grid View Hino Vehicles


    // const style = {
    //   width: '300px',
    //   height: '300px'
    // }
    // const { component: Component, ...rest } = this.props

    // const selectionFilter = ['event_id', '=', 9001];

    // let { header } = this.props




    return (
      <div >
        <Row>
          <Col lg="12">
            <div className="ibox float-e-margins">
              <div className="ibox-content" style={{ paddingLeft: 35, paddingRight: 35, borderWidth: ' 4px 0px 0px ', borderColor: '#e7eaec' }}>
                <Row style={{ textAlign: "right", marginTop: 5, marginBottom: 0 }}>
                  <Button className="btn btn-primary btn-sm" onClick={() => this.onClickAdd()}><i className="fa fa-plus"></i>{' '}Add</Button>
                </Row>
                <Row>
                  <Table

                    dataSource={this.state.data}
                    mode={"offline"}
                    table_id={4}
                    user_id={this.props.dataLogin.userId}
                    editing={{
                      enabled: true,
                      allowUpdating: true,
                      allowDeleting: true
                    }}
                    selectedCallback={this.selectedCallback}
                    initialCallback={this.tableInitial}
                    deleteCallback={(e) => this.deleteCallback(e)}
                    editCallback={(e) => this.editCallback(e)}
                    column={[
                      {
                        column_name: 'fleet_name',
                        column_caption: 'fleet_name'
                      },

                      {
                        column_name: 'licenseplate',
                        column_caption: 'licenseplate'
                      },
                      {
                        column_name: 'vehicle_name',
                        column_caption: 'vehicle_name'
                      },
                      {
                        column_name: 'total_distance',
                        column_caption: 'total_distance'
                      },
                      {
                        column_name: 'total_time',
                        column_caption: 'total_time'
                      },
                      {
                        column_name: 'speed_max',
                        column_caption: 'speed_max'
                      },
                      {
                        column_name: 'speed_min',
                        column_caption: 'speed_min'
                      },
                      {
                        column_name: 'speed_avg',
                        column_caption: 'speed_avg'
                      },
                      {
                        column_name: 'speed_limit',
                        column_caption: 'speed_limit'
                      },
                      {
                        column_name: 'fuel_cons',
                        column_caption: 'fuel_cons'
                      },
                      {
                        column_name: 'fuel_used',
                        column_caption: 'fuel_used'
                      },

                      {
                        column_name: 'count',
                        column_caption: 'count'
                      },
                    ]}

                  >

                  </Table>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div >
    )
  }
}





const mapStateToProps = (state) => {
  return {
    // request_signin: state.auth.request_signin,
    dataLogin: state.signin.dataLogin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // signin: (email, password) => dispatch(AuthActions.signin(email, password)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TripSummaryOL)

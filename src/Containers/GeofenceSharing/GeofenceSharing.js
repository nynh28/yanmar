import React, { Component, Suspense } from 'react'
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

import Table from '../../Components/DataGridView/Table.js'
// import Icon from './Form/Fields/Icon'

import GeofenceActions from "../../Redux/GeofenceRedux"
import { useTranslation } from 'react-i18next'
import './styles.css'
import { t } from '../../Components/Translation'
// import { setSchema } from './setSchema.js'

import FormSelect from '../../Components/FormControls/Basic/FormSelect'
import Alert from '../../Components/Alert'

import SaveButton from '../../Components/SaveButton'

import { ENDPOINT_BASE_URL } from '../../Config/app-config';

const getOrderDay = (rowData) => {
  return (new Date(rowData.OrderDate)).getDay();
};

class GeofenceSharing extends Component {

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
      alert: {
        confirm: null,
        show: false,
        type: 3,
        content: "",
        ErrorSubcode: 0
      },
      partnameName: null,
      partnerNameNav: [],
      status: [],
      mode: 'offline',
      serversideSource: '',
      data: [],

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
    this.setAlert(true, 5)
    this.props.getDropdownPartnerName()
    // this.props.listCustomer()
    // console.log(services.getEvents());
    // this.props.getGeofenceType()
    // console.log(this.props.dataList);
  }

  componentDidUpdate(prevProps, nextState) {
    // if (prevProps.listCustomer != this.props.listCustomer) {
    //   this.props.history.push('customer')
    // }
    // console.log(this.props.dataList)
    // if (prevProps.typeForm !== this.props.typeForm) {
    //   if (this.props.typeForm !== null) {
    //     this.props.history.push("geofenceForm")
    //   }
    // }

    if (prevProps.statusSubmit !== this.props.statusSubmit) {
      // console.log(this.setAlert(true, 3))
      console.log(this.props.statusSubmit)
      let { alert } = this.state
      alert.show = true
      alert.type = this.props.statusSubmit.status ? 1 : 2
      alert.content = this.props.statusSubmit.status ? this.props.action + " Share Successed" : this.props.action + " Share Failed"
      alert.ErrorSubcode = this.props.statusSubmit.ErrorSubcode
      this.setState({ alert }, () => console.log(this.state.alert))
    }

    if (prevProps.partnerName !== this.props.partnerName) {
      this.setAlert(false, 5)
      this.setState({ partnerNameNav: this.props.partnerName })
    }
    console.log(this.props)
    // console.log(this.props.geofenceType)
  }

  loadCustomerList() {
    //  this.props.listCustomer()
  }


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

  onUpdateStatus(data) {
    console.log(data)
    let status = this.state.status
    if (this.state.status.findIndex((e) => e.key == data.key) == -1) {
      status.push({ key: data.key, value: !data.value })
    }
    else {
      this.state.status.splice(this.state.status.findIndex((e) => e.key == data.key), 1)
    }
    this.setState({ status: status })
    console.log(this.state.status)
  }

  setAlert(isShow, type, content = "", ErrorSubcode) {
    let { alert } = this.state
    alert.show = isShow
    alert.type = type
    alert.content = content
    alert.ErrorSubcode = ErrorSubcode
    this.setState({ alert })
  }

  onCheck(data) {
    //   console.log(data)
    if (this.state.status.findIndex((e) => e.key == data.key) == -1) {
      // this.state.status.findIndex((e) => {
      //     console.log(e.key)
      //     console.log(data.key)
      //         return e.key == data.key
      //     })
      return data.value
    }
    else {
      // console.log(this.state.status.findIndex((e) => e.key == data.key))
      // console.log(this.state.status[this.state.status.findIndex((e) => e.key == data.key)].value)
      return this.state.status[this.state.status.findIndex((e) => e.key == data.key)].value
    }
  }

  submitConfirm(confirm) {
    // let { formDataSubmit } = this.state
    // console.log("formDataSubmit : ", formDataSubmit)

    // if (this.props.action === "Edit") {
    //   let data = this.mappingFieldsUpdate(formDataSubmit.formData.UserDetail)
    // this.props.updateUser(this.props.id, data)
    // this.setAlertSetting(true, 6)
    // }
    // else {
    //   let data = this.mappingFieldsInsert(formDataSubmit.formData.UserDetail)
    // this.props.createUser(data)

    if (confirm == 'edit') {
      this.props.editGeofenceSharing(this.props.profileUser.partnerId, this.state.status)
      this.setAlert(true, 6)
    }
    // }
  }

  cellRender = (cellData) => {
    // console.log(cellData)
    if (cellData.value != undefined) {
      return [
        <div>
          <ButtonGroup style={{ zIndex: 1 }}>
            <Button
              className='button-radio-checkbox'
              onClick={() => this.onUpdateStatus(cellData)}
              active={this.onCheck(cellData) == false}
            >{t("On")}</Button>
            <Button
              className='button-radio-checkbox'
              onClick={() => this.onUpdateStatus(cellData)}
              active={this.onCheck(cellData) == true}
            >{t("Off")}</Button>
          </ButtonGroup>
        </div>
      ]
    }
  }

  //--------------------------------  Start Geofence ------------------------//

  //--------------------------------  End Geofence ------------------------//
  render() {
    let { alert } = this.state
    console.log(this.state)
    console.log(this.props.statusSubmit)
    console.log(this.props.profileUser)
    return (
      <div>
        <Alert
          setting={alert}
          onConfirm={() => {
            if (alert.type === 4) {
              alert.show = false
            }
            else if (alert.type === 3) {
              alert.show = false
              this.submitConfirm(alert.content)
            }
            else if (this.props.statusSubmit.status) {
              alert.show = false
              // this.props.history.push("/userSetting")
            }
            else {
              alert.show = false
            }
            this.setState({ alert })
          }}
          onCancel={() => {
            alert.show = false
            this.setState({ alert })
          }}
        />
        <Row>
          <Col lg="12">
            <div className="ibox">
              <div className="ibox-title" style={{ padding: '15px 20px 10px 15px' }}>
                <Row style={{ marginBottom: 0 }}>
                  <Col lg="6">
                    <h4>Geofence Sharing</h4>
                    {/* {cellRender("https://s3.amazonaws.com/hino.ecm.file.bucket/Temp2/0319_fetjhipqgssurtw")} */}
                    {/* <img src="https://s3.amazonaws.com/hino.ecm.file.bucket/Temp2/0319_fetjhipqgssurtw"/> */}
                  </Col>
                  <Col lg="6">
                    <div style={{ textAlign: "right", }} >
                      {/* <Button className="btn btn-primary btn-sm" onClick={() => this.addForm()}><i className="fa fa-plus"></i>{' '}{t("add")}</Button> */}
                      {/* <Button className="btn btn-primary btn-sm" onClick={() => this.addForm()}><i className="fa fa-plus"></i>{' '}Add</Button> */}
                    </div>
                  </Col>
                </Row>
              </div>
              {/* <div className="ibox float-e-margins"> */}
              <div className="ibox-content" style={{ paddingLeft: 35, paddingRight: 35 }}>
                <div className="form-group">
                  <Row>
                    <Col lg={6}>
                      <Suspense fallback={null}>
                        <FormSelect
                          mode={"single"}
                          value={this.state.partnerName}
                          label={"owner_partner_name"}
                          list={this.state.partnerNameNav.map((e, i) => {
                            // console.log(e)
                            return { key: i, value: e.key, text: e.value }
                          })}
                          placeholder={"ph_owner_partner_name"}
                          flex={1}
                          onChange={(selected) => {
                            this.setState({
                              partnerName: selected,
                              mode: 'api',
                              dataSource: this.state.data,
                              // serversideSource: 'https://api-center.onelink-iot.com/v1.0.1/Geofence/ShareManagement/GridViewGeofence?partnerId='+selected
                              serversideSource: ENDPOINT_BASE_URL + 'Geofence/ShareManagement/GridViewGeofence?partnerId=' + selected

                            });
                          }}
                        />
                      </Suspense>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ marginTop: 5 }} className="panel">

                <div className="panel-body">
                  <Row style={{ textAlign: "right", marginTop: -5, marginBottom: 5
                 }}>
                    {/* <Button className="btn btn-primary btn-sm" onClick={() => this.onClickEdit()}>Edit</Button> */}
                    {/* <Button className="btn btn-primary btn-sm" onClick={() => this.onClickAdd()}><i className="fa fa-plus"></i>{' '}{t("add")}</Button> */}
                    <SaveButton
                      name={t("save")}
                      loading={this.props.loading}
                      onClick={() => {
                        // this.setAlert(true, 3)
                        let { alert } = this.state
                        alert.show = true
                        alert.type = 3
                        // alert.comfirm = this.props.editGeofenceSharing(this.props.profileUser.partnerId, this.state.status)
                        alert.content = 'edit'
                        // alert.ErrorSubcode = ErrorSubcode
                        this.setState({ alert })
                      }}
                    />
                  </Row>
                  <Table
                    mode={this.state.mode}
                    serversideSource={this.state.serversideSource}
                    language = {this.props.language}
                    author={this.props.headers.idToken}
                    xAPIKey={this.props.headers.redisKey}
                    table_id={2}
                    user_id={this.props.dataLogin.userId}
                    editing={{
                      enabled: true,
                      allowUpdating: false,
                      allowDeleting: false
                    }}
                    selectedCallback={this.selectedCallback}
                    deleteCallback={this.deleteCallback}
                    editCallback={this.editCallback}
                    autoExpandAll={false}
                    remoteOperations={true}
                    customButton={[
                      {
                        hint: "Clone",
                        icon: "download",

                        visible: true,
                        onClick: (e) => {
                          this.setAlert(true, 3)
                          let data = {
                            partnerId: this.props.profileUser.partnerId,
                            sharedIds: [e.row.key]
                          }
                          console.log(data)
                          this.props.cloneGeofenceSharing(data)
                        }
                      }
                    ]
                    }
                    captionCustomButton={'Clone'}

                    // cellRender={true}
                    column={[
                      {
                        column_name: 'partnerName',
                        column_caption: 'partner_name'
                      },
                      {
                        column_name: 'partnerTypeName',
                        column_caption: 'partner_type'
                      },

                      {
                        column_name: 'geofenceTypeName',
                        column_caption: 'geofence_type_name'
                      },
                      {
                        column_name: 'geofenceName',
                        column_caption: 'Geofence Name'
                      },
                      {
                        column_name: 'geofenceDescription',
                        column_caption: 'geofence_type_description'
                      },
                      {
                        column_name: 'isUsed',
                        fixed: true,
                        // column_position: "right",
                        column_caption: 'is Used',
                        column_render: (e) => this.cellRender(e),
                      }
                    ]}
                  >
                  </Table>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  loading: state.geofence.loading,
  dataLogin: state.signin.dataLogin,
  error: state.geofence.error,
  groupType: state.signin.groupType,
  userGroup: state.signin.userGroup,
  currentUser: state.signin.currentUser,
  profileUser: state.signin.profileUser,
  // partnerId: state.signin.profileUser.partnerId,
  // partnerTypeName: state.signin.profileUser.partnerTypeName,
  statusSubmit: state.geofence.statusSubmit,
  partnerName: state.geofence.partnerName,
  id: state.geofence.idSelected,
  action: state.geofence.action,
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
  getDropdownPartnerName: () => dispatch(GeofenceActions.getDropdownPartnerName()),
  deleteGeofenceType: (id) => dispatch(GeofenceActions.deleteGeofenceType(id)),
  getSourceType: () => dispatch(GeofenceActions.getSourceType()),
  cloneGeofenceSharing: (data) => dispatch(GeofenceActions.cloneGeofenceSharing(data)),
  editGeofenceSharing: (id, data) => dispatch(GeofenceActions.editGeofenceSharing(id, data)),
  submitStatus: (status, ErrorSubcode) => dispatch(GeofenceActions.submitStatus(status, ErrorSubcode)),

  // removeUserRoleGroup: () => dispatch(UserSettingActions.remove)
  // setEditVehicleStart: (chassisNo,customerId,customerName,dealerId,dealerName,geoData,imei,lastGPSUpdate,lastLatitude,lastLongitude,licensePlate,status,vehicleId,vinNo) => dispatch(VehicleActions.setEditVehicleStart(chassisNo,customerId,customerName,dealerId,dealerName,geoData,imei,lastGPSUpdate,lastLatitude,lastLongitude,licensePlate,status,vehicleId,vinNo))
  // setEditVehicleStart: (data) => dispatch(VehicleActions.setEditVehicleStart(data)),
  // setVehicleSuccess: () => dispatch(VehicleActions.setVehicleSuccess()),
  // setVehicleStatus: (status) => dispatch(VehicleActions.setVehicleStatus(status)),
});


export default connect(mapStateToProps, mapDispatchToProps)(GeofenceSharing)

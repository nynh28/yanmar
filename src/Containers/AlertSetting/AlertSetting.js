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

import AlertSettingActions from "../../Redux/AlertSettingRedux";
import { useTranslation } from 'react-i18next'
// import './styles.css'
import { t } from '../../Components/Translation'
// import { setSchema } from './setSchema.js'

import FormSelect from '../../Components/FormControls/Basic/FormSelect'

import SaveButton from '../../Components/SaveButton'

import { ENDPOINT_BASE_URL } from '../../Config/app-config';

const getOrderDay = (rowData) => {
  return (new Date(rowData.OrderDate)).getDay();
};

class AlertSetting extends Component {

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
    // this.props.getSourceType()
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
        this.props.history.push("alertSettingForm")
      }
    }
    prevProps.partnerName !== this.props.partnerName && this.setState({ partnerNameNav: this.props.partnerName })
    console.log(this.props.profileUser.partnerId)
    // console.log(this.props.geofenceType)
  }

  loadCustomerList() {
    //  this.props.listCustomer()
  }


  addForm() {
    this.props.setData('add', {})
    this.props.history.push("alertSettingForm")
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

  deleteCallback = (e) => this.props.deleteAlertSetting(e.data.id)
  editCallback = (e) => {
    console.log(e.data.id)
    // this.props.getSourceType()
    this.props.idSelected("edit", e.data.id)
    this.props.history.push('/alertSettingForm')
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

//   cellRender = (cellData) => {
//     // console.log(cellData)
//     if (cellData.value != undefined) {
//       return (
//         <div>
//           <ButtonGroup style={{ zIndex: 1 }}>
//             <Button
//               className='button-radio-checkbox'
//               onClick={() => this.onUpdateStatus(cellData)}
//               active={this.onCheck(cellData) == false}
//             >{t("On")}</Button>
//             <Button
//               className='button-radio-checkbox'
//               onClick={() => this.onUpdateStatus(cellData)}
//               active={this.onCheck(cellData) == true}
//             >{t("Off")}</Button>
//           </ButtonGroup>
//         </div>
//       )
//     }
//   }

  //--------------------------------  Start Geofence ------------------------//

  //--------------------------------  End Geofence ------------------------//
  render() {
    console.log(this.props.profileUser)
    console.log(this.props.dataLogin)
    return (
        <div>
          <Row>
            <Col lg="12">
              <div className="ibox">
                <div className="ibox-title" style={{ padding: '15px 20px 10px 15px' }}>
                  <Row style={{ marginBottom: 0 }}>
                    <Col lg="6">
                      <h4>Alert Setting</h4>
                      {/* {cellRender("https://s3.amazonaws.com/hino.ecm.file.bucket/Temp2/0319_fetjhipqgssurtw")} */}
                      {/* <img src="https://s3.amazonaws.com/hino.ecm.file.bucket/Temp2/0319_fetjhipqgssurtw"/> */}
                    </Col>
                    <Col lg="6">
                      <div style={{ textAlign: "right", }} >
                        <Button className="btn btn-primary btn-sm" onClick={() => this.addForm()}><i className="fa fa-plus"></i>{' '}{t("add")}</Button>
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
                      serversideSource={'http://3.130.59.229:9000/api/grid-view/'+ this.props.profileUser.partnerId}
                    //   serversideSource={ENDPOINT_BASE_URL + 'Geofence/GeofenceType/GridView'}
                      author={this.props.headers.idToken}
                      xAPIKey={this.props.headers.redisKey}
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
                          column_caption: 'POI Type'
                        },
                        {
                          column_name: 'partnerName',
                          // column_caption: 'partner_name'
                          column_caption: 'POI Name'
                        },
                        {
                          column_name: 'geofenceTypeName',
                          column_caption: 'geofence_type_name'
                        },
                        {
                          column_name: 'geofenceDescription',
                          column_caption: 'geofence_type_description'
                        },
                        {
                          column_name: 'isHazard',
                          column_caption: 'is_hazard',
                        },
                      ]}
                    >
                    </Table>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      );
  }

}

const mapStateToProps = (state) => ({
  loading: state.alertSetting.loading,
  dataLogin: state.signin.dataLogin,
  error: state.alertSetting.error,
  groupType: state.signin.groupType,
  userGroup: state.signin.userGroup,
  currentUser: state.signin.currentUser,
  profileUser: state.signin.profileUser,
  // partnerId: state.signin.profileUser.partnerId,
  // partnerTypeName: state.signin.profileUser.partnerTypeName,
//   partnerName: state.geofence.partnerName,
  id: state.alertSetting.idSelected,
//   geofenceType: state.alertSetting.geofenceType,
  success: state.alertSetting.success,
  headers: state.signin.header
  // modal: state.userSetting.modal,
  // title: state.vehicle.title,
});
const mapDispatchToProps = (dispatch) => ({
  setData: (typeForm) => dispatch(AlertSettingActions.setData(typeForm)),
  idSelected: (typeForm, id) => dispatch(AlertSettingActions.idSelected(typeForm, id)),
  getAlertSetting: (id) => dispatch(AlertSettingActions.getAlertSetting(id)),
  deleteAlertSetting: (id) => dispatch(AlertSettingActions.deleteAlertSetting(id)),
  editAlertSetting: (id, data) => dispatch(AlertSettingActions.editAlertSetting(id, data))
});


export default connect(mapStateToProps, mapDispatchToProps)(AlertSetting)

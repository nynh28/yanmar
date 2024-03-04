import React, { Component } from 'react'
import { connect } from 'react-redux'
import PannelBox from '../../Components/PannelBox'
import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css'
import DataGrid, { Column, FilterRow, HeaderFilter, SearchPanel, Grouping, GroupPanel, Paging, Export, Selection, MasterDetail, Editing } from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import {Button, Form, Modal, ModalHeader, ModalBody, ModalFooter, Tab, TabContent, TabPane, Nav, NavItem, NavLink, Col, Row} from "reactstrap";
import service from "../Vehicle/data";
import UserSettingActions from "../../Redux/UserSettingRedux";
import {Texts} from "devextreme-react/tree-list";

class MessageSetting extends Component {

  constructor(props) {
    super(props)
    this.onAutoExpandAllChanged = this.onAutoExpandAllChanged.bind(this);
    this.tasks = service.getTasks();
    this.orders = service.getOrders();

    this.dataGrid = React.createRef();
    this.orderHeaderFilter = this.orderHeaderFilter.bind(this);
    this.setButton = this.setButton.bind(this);

    this.state = {
        activeTab: '1'

    };
    this.detectContentReady = this.detectContentReady.bind(this);
  }

  componentDidMount() {
    // if (this.props.groupType == 'Hino') {
    //   this.props.getRoleGroup({type:'hino'})
    //   this.props.getUser({id:this.props.businessPartnerId, type:'hino'})
    // }
    // else {
    //   this.props.getRoleGroup({id:'?id='+this.props.businessPartnerId, type:this.props.groupType.toLowerCase()+'s'})
    //   this.props.getUser({id:'?id='+this.props.businessPartnerId, type:'dealers'})
    // }
    // else if (this.props.groupType == 'Customer'){
    //   this.props.getRoleGroup({id:'?id='+this.props.businessPartnerId, type:'customers'})
    //   this.props.getUser({id:'?id='+this.props.businessPartnerId, type:'customers'})
    // }

    // this.props.setVehicleSuccess()
    // console.log(this.state.modal)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(this.props.user.user)
    // if (this.props.error === null && this.props.success === "editSuccess" && this.props.status === null){
    //     // this.props.setEditVehicleSuccess2()
    //     this.props.history.push('/vehicle')
    // }
    // if (this.state.error) {
    //     this.setState({visibility: true})
    // }
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

  toolBox() {
    return (
      <div className="ibox-tools">
        <Button className="btn btn-primary btn-xs" onClick={() => this.onClickAdd()}><i className="fa fa-plus"></i>{' '}Create User</Button>
      </div>
    )
  }

  canEdit() {
    if(this.props.groupType == 'Hino' || this.props.groupType == 'Dealer' ){
      return (
        <Editing
          mode={'window'}
          useIcons="plus"
          allowUpdating={true}
          allowDeleting={true}>

          <Form>
            <Item itemType={'group'} colCount={2} colSpan={2}>
              <Item dataField={'username'} />
              <Item dataField={'fullName'} />
              <Item dataField={'aliasName'} />
              <Item dataField={'email'} />
            </Item>
          </Form>
        </Editing>
      )
    }
  }
  // onClickSave() {
  //
  // }
  onEdit() {
    // this.props.history.push('/')
  }

  onDelete() {
    // this.props.
  }

  onClickAdd() {
    // this.setState({modal: true})
    // console.log(this.state.modal)
    this.props.history.push('/userSettingAdd')
  }

  onClickCancel() {
    this.setState({modal: false})
  }

  onActiveTab(e) {
      if (this.state.activeTab !== e) this.setState({activeTab: e})

  }

  render() {
    const { component: Component, ...rest } = this.props
    return (
      <div>
        {/*<Modal isOpen={this.state.modal} toggle={() => this.onClickCancel()} fade={false}>
                    <ModalHeader toggle={() => this.onClickCancel()}>Add User</ModalHeader>
                    <ModalBody>test</ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={() => this.onClickSave()}>Save</Button>
                        <Button color="danger" onClick={() => this.onClickCancel()}>Cancel</Button>
                    </ModalFooter>
                </Modal>*/}
        <PannelBox title={'Message Setting'} {...rest} >
          <div className="row">
            <div className="col-lg-12">
                <Nav tabs>
                    <NavItem>
                        <NavLink onClick={() => this.onActiveTab('1')}>
                            1
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={() =>this.onActiveTab('2')}>
                            2
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={() =>this.onActiveTab('3')}>
                            3
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <h4>Tab 1 Contents</h4>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <h4>Tab 2 Contents</h4>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            <Col sm="12">
                                <h4>Tab 3 Contents</h4>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
          </div>
        </PannelBox>
      </div>
    )

  }

}



const mapStateToProps = (state) => ({
  loading: state.userSetting.loading,
  // vehicle: state.vehicle.vehicle,
  // editStart: state.vehicle.editStart,
  error: state.userSetting.error,
  status: state.userSetting.status,
  user: state.userSetting.user,
  role: state.userSetting.role,
  groupType: state.signin.groupType,
  userGroup: state.signin.userGroup,
  currentUser: state.signin.currentUser,
  businessPartnerId: state.signin.businessPartnerId,
  // modal: state.userSetting.modal,
  // title: state.vehicle.title,
});
const mapDispatchToProps = (dispatch) => ({
//   getRoleGroup: (getData) => dispatch(UserSettingActions.getRoleGroup(getData)),
//   getUser: (getData) => dispatch(UserSettingActions.getUser(getData)),
  // removeUserRoleGroup: () => dispatch(UserSettingActions.remove)
  // setEditVehicleStart: (chassisNo,customerId,customerName,dealerId,dealerName,geoData,imei,lastGPSUpdate,lastLatitude,lastLongitude,licensePlate,status,vehicleId,vinNo) => dispatch(VehicleActions.setEditVehicleStart(chassisNo,customerId,customerName,dealerId,dealerName,geoData,imei,lastGPSUpdate,lastLatitude,lastLongitude,licensePlate,status,vehicleId,vinNo))
  // setEditVehicleStart: (data) => dispatch(VehicleActions.setEditVehicleStart(data)),
  // setVehicleSuccess: () => dispatch(VehicleActions.setVehicleSuccess()),
  // setVehicleStatus: (status) => dispatch(VehicleActions.setVehicleStatus(status)),
});


export default connect(mapStateToProps, mapDispatchToProps)(MessageSetting)

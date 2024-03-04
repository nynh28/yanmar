import React, { Component } from 'react'
import { connect } from 'react-redux'
import PannelBox from '../../Components/PannelBox'
import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css'
import DataGrid, { Column, FilterRow, HeaderFilter, SearchPanel, Grouping, GroupPanel, Paging, Export, Selection, MasterDetail, Editing } from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import {Button, Form, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Input} from "reactstrap";
import UserSettingActions from "../../Redux/UserSettingRedux";
import {Texts} from "devextreme-react/tree-list";


const operation = (user, userGroup, isUnion = false) => user.filter( a => isUnion === userGroup.some( b => a.username === b.username ) );

// Following functions are to be used:
const inBoth = (list1, list2) => operation(list1, list2, true),
      inUserOnly = operation,
      inUserGroupOnly = (list1, list2) => inUserOnly(list2, list1);

class GroupSetting extends Component {

  constructor(props) {
    super(props)
    this.onAutoExpandAllChanged = this.onAutoExpandAllChanged.bind(this);
    // this.tasks = service.getTasks();
    // this.orders = service.getOrders();

    this.dataGrid = React.createRef();
    this.orderHeaderFilter = this.orderHeaderFilter.bind(this);
    this.setButton = this.setButton.bind(this);

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.state = {
      userSetting : [
        {
          id: null,
          username: null,
          fullName: null,
          aliasName: null,
          email: null,
          temporaryPassword: null,
        }
      ],
      listUser: [
        {
          username: null
        }
      ],
      suffixRoleName: null,
      success: this.props.success,
      // waitingForMap: false
      // modal: false,

    };
    this.detectContentReady = this.detectContentReady.bind(this);
  }

  componentDidMount() {
    if (this.props.groupType == 'Hino') {
      this.setState({i:1})
      this.props.getRoleGroup({type:'hino'})
      this.props.getUser({id:this.props.businessPartnerId, type:'hino'})
    }
    else {
      this.setState({i:2})
      this.props.getRoleGroup({id:'?id='+this.props.businessPartnerId, type: this.props.groupType.toLowerCase()+'s'})
      this.props.getUser({id:'?id='+this.props.businessPartnerId, type:this.props.groupType.toLowerCase()+'s'})
    }

    // this.props.setVehicleSuccess()
    // console.log(this.state.modal)
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log(nextProps.loadUser)
    console.log(nextProps.loadUserGroup)
    return nextProps.loadUser !== this.props.loadUser || nextProps.loadUserGroup !== this.props.loadUserGroup || nextProps.loadRole !== this.props.loadRole || nextProps.user.user !== this.props.user.user
  }

  // componentWillUpdate(nextProps, nextState, nextContext) {
    // console.log(nextProps)
    // console.log(nextProps.user)
    // console.log(this.props.user)
    // console.log(nextProps.userFromGroup)
    // console.log(this.props.userFromGroup)

    // this.queryUser(nextProps.user,nextProps.userFromGroup)
    // if (this.props.userFromGroup.userFromGroup !== nextProps.userFromGroup.userFromGroup) {
    //
    // }
  // }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log(prevProps)
    // console.log(prevProps.user)
    console.log(this.props.user)
    // console.log(prevProps.userFromGroup)
    // console.log(this.userFromGroup)
    console.log(this.state.listUser)
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

  handleRole(e){
    this.setState({suffixRoleName: e.target.value})
    console.log('handle')
    this.props.getUserGroup({groupType:this.props.groupType.toLowerCase(), roleName: e.target.value, id: this.props.businessPartnerId})

  }

  toolBoxCustom() {
    return (
      <div className="ibox-tools">
        <Input type="select" value={this.state.suffixRoleName} onChange={(e) => this.handleRole(e)}>
          <option value="">--- โปรดเลือก ---</option>
          {this.props.role.map((i) => <option value={i.roleName.split('_')[this.state.i]}>{i.roleName.split('_')[this.state.i]}</option>)}
        </Input>
      </div>
    )
  }

  toolBox() {
    return (
      <div className="ibox-tools">
        {/*<Button className="btn btn-primary btn-xs" onClick={() => this.onClickAdd()}><i className="fa fa-plus"></i>{' '}Create User</Button>*/}
        {/*<Button className="btn btn-primary btn-xs" onClick={() => this.onClickAdd()}><i className="fa fa-plus"></i>{' '}Create Group</Button>*/}
        {/*<Button className="btn btn-primary btn-xs" onClick={() => this.onClickAdd()}><i className="fa fa-plus"></i>{' '}Add User to Group</Button>*/}
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
            </Item>
          </Form>
        </Editing>
      )
    }
  }
  // onClickSave() {
  //
  // }

  onDelete(e) {
    e.cancel = "true"
    // console.log(e)
    console.log(this.props.groupType.toLowerCase())
    this.props.removeUserRoleGroup(e.data.username, this.state.suffixRoleName, this.props.groupType.toLowerCase())
  }

  onAdd(e) {
    e.cancel = "true"
    console.log(this.props.groupType.toLowerCase())
    this.props.addUserRoleGroup(e.data.username, this.state.suffixRoleName, this.props.groupType.toLowerCase())
  }

  onClickAdd() {
    // this.setState({modal: true})
    // console.log(this.state.modal)
    this.props.history.push('/userSettingAdd')
  }

  onClickCancel() {
    this.setState({modal: false})
  }

  queryUser(user,userGroup) {
    console.log(userGroup)
    console.log(user)

    let listUser = inUserOnly(this.props.user.user, this.props.userFromGroup.userGroup)
    console.log(listUser)
    return(listUser)
  }

  render() {
    const { component: Component, ...rest } = this.props
    return (
      <Row>
        {/*<Modal isOpen={this.state.modal} toggle={() => this.onClickCancel()} fade={false}>
                    <ModalHeader toggle={() => this.onClickCancel()}>Add User</ModalHeader>
                    <ModalBody>test</ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={() => this.onClickSave()}>Save</Button>
                        <Button color="danger" onClick={() => this.onClickCancel()}>Cancel</Button>
                    </ModalFooter>
                </Modal>*/}
        <Col lg='7'>
          <PannelBox title={'Group Setting'} toolbox={this.toolBoxCustom()} {...rest} >
            <Row>
              <Col lg='12'>
                <DataGrid id={'gridContainer'}
                          ref={this.dataGrid}
                          dataSource={this.props.userFromGroup.userGroup}
                          keyExpr={'username'}
                          showBorders={true}
                          allowColumnReordering={true}
                          onContentReady={this.detectContentReady}
                          onRowRemoving={this.onDelete}
                >
                  <GroupPanel visible={true} />
                  <Grouping autoExpandAll={this.state.autoExpandAll} />
                  <Paging defaultPageSize={15} />
                  <Editing
                    mode={'window'}
                    useIcons={true}
                    allowDeleting={true}>

                    <Form>
                      <Item itemType={'group'} colCount={2} colSpan={2}>
                        <Item dataField={'username'} />
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

                  <Column dataField={'username'} minWidth={120} />
                </DataGrid>
              </Col>
            </Row>
          </PannelBox>
        </Col>
        <Col lg='5'>
          <PannelBox title={'Add User to Group'} toolbox={this.toolBox()} {...rest}>
            <Row>
              <Col lg="12">
                <DataGrid id={'gridContainer'}
                          ref={this.dataGrid}
                          dataSource={this.queryUser(this.props.user,this.props.userFromGroup)}
                          keyExpr={'username'}
                          showBorders={true}
                          allowColumnReordering={true}
                          onContentReady={this.detectContentReady}
                          onEditingStart={this.onAdd}
                >
                  <GroupPanel visible={true} />
                  <Grouping autoExpandAll={this.state.autoExpandAll} />
                  <Paging defaultPageSize={15} />
                  <Editing
                    mode={'window'}
                    useIcons={true}
                    allowUpdating={true}
                    >
                    <Form>
                      <Item itemType={'group'} colCount={2} colSpan={2}>
                        <Item dataField={'username'} />
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

                  <Column dataField={'username'} minWidth={120} />
                </DataGrid>
              </Col>
            </Row>
          </PannelBox>
        </Col>
      </Row>
    )

  }

}



const mapStateToProps = (state) => ({
  loading: state.userSetting.loading,
  loadRole: state.userSetting.loadRole,
  loadUser: state.userSetting.loadUser,
  loadUserGroup: state.userSetting.loadUserGroup,
  error: state.userSetting.error,
  success: state.userSetting.success,
  status: state.userSetting.status,
  user: state.userSetting.user,
  userFromGroup: state.userSetting.userGroup,
  role: state.userSetting.role,
  count: state.userSetting.count,
  matchUser: state.userSetting.matchUser,
  groupType: state.signin.groupType,
  userGroup: state.signin.userGroup,
  // currentUser: state.signin.currentUser,
  partnerId: state.signin.profileUser.partnerId,
  partnerType: state.signin.profileUser.partnerTypeName,


  // modal: state.userSetting.modal,
  // title: state.vehicle.title,
});
const mapDispatchToProps = (dispatch) => ({
  getRoleGroup: (getData) => dispatch(UserSettingActions.getRoleGroup(getData)),
  getUser: (getData) => dispatch(UserSettingActions.getUser(getData)),
  getUserGroup: (getData) => dispatch(UserSettingActions.getUserGroup(getData)),
  addUserRoleGroup: (username, roleName, groupType) => dispatch(UserSettingActions.addUserRoleGroup(username, roleName, groupType)),
  removeUserRoleGroup: (username, roleName, groupType) => dispatch(UserSettingActions.removeUserRoleGroup(username, roleName, groupType)),
  // matchUser: (getUser, getUserGroup) => dispatch(UserSettingActions.getMatchUserGroup(getUser, getUserGroup))
  // removeUserRoleGroup: () => dispatch(UserSettingActions.remove)
  // setEditVehicleStart: (chassisNo,customerId,customerName,dealerId,dealerName,geoData,imei,lastGPSUpdate,lastLatitude,lastLongitude,licensePlate,status,vehicleId,vinNo) => dispatch(VehicleActions.setEditVehicleStart(chassisNo,customerId,customerName,dealerId,dealerName,geoData,imei,lastGPSUpdate,lastLatitude,lastLongitude,licensePlate,status,vehicleId,vinNo))
  // setEditVehicleStart: (data) => dispatch(VehicleActions.setEditVehicleStart(data)),
  // setVehicleSuccess: () => dispatch(VehicleActions.setVehicleSuccess()),
  // setVehicleStatus: (status) => dispatch(VehicleActions.setVehicleStatus(status)),
});


export default connect(mapStateToProps, mapDispatchToProps)(GroupSetting)

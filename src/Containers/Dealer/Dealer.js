import React, { Component } from 'react'
import { connect } from 'react-redux'
import DealerActions from '../../Redux/DealerRedux'
import GenerateForm from 'react-form-generator-from-json'
import { withRouter } from 'react-router'
import { Container, Button, Row, Card, Col, CardTitle, Form, Input, FormText } from 'reactstrap'
import DetailTemplate from './DetailTemplate.js';
import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css'
import service from './data.js';
import DataGrid, { ColumnChooser, Texts, Scrolling, FilterRow, HeaderFilter, SearchPanel, Grouping, GroupPanel, Paging, Export, Selection, Summary, Editing, GroupItem } from 'devextreme-react/data-grid';
import DataGridView from '../../Components/DataGridView'

import { Item } from 'devextreme-react/form';
import { states } from './data.js';
import { throwStatement } from '@babel/types';
import moment from 'moment'
import 'moment/locale/th'
// import { connect } from 'mqtt';
import Table from '../../Components/DataGridView/Table.js'

const getOrderDay = (rowData) => {
  return (new Date(rowData.OrderDate)).getDay();
};

const saleAmountEditorOptions = { format: 'currency', showClearButton: true };
let checkRequest = true
class Dealer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      autoExpandAll: true,
      currentDataGridState: [],
      listfilter: []

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

    // this.state = {
    //   img: null,
    //   frmVihecleShow: false,
    //   titleFormType: '',
    //   checkSameOfficeAddress: false,


    // }
    this.handleChange = this.handleChange.bind(this)
    this.dataGrid = React.createRef();
    // this.onEditingStart = this.onEditingStart.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.onToolbarPreparing = this.onToolbarPreparing.bind(this);
    // this.onRowDelete = this.onRowDelete.bind(this);
    this.deleteCallback = this.deleteCallback.bind(this);
    this.editCallback = this.editCallback.bind(this);
  }
  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift(
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'dx-icon icon-font-size-increase-2-512-01',
          onClick: DataGridView.zoom.zoomChange.bind(this, "gridDealer"),
          onload: DataGridView.zoom.setDefaultZoom()
        }
      });
  }

  handleChange(event) {
    this.setState({
      img: URL.createObjectURL(event.target.files[0])
    })
  }

  // static getDerivedStateFromProps(newProps, prevState) {
  //   console.log(newProps)
  //   console.log(prevState)
  //   console.log('--------------- Props From Dealer List --------------------')
  //   if (newProps.data_getDealerList && newProps.data_getDealerList != null) {
  //     if (prevState.data_getDealerList != newProps.data_getDealerList) {
  //       return {
  //         data_getDealerList: newProps.data_getDealerList
  //       }
  //     }
  //   }
  // }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps.infoDealerData !== this.props.infoDealerData) {
      this.props.history.push('/dealer/dealerForm')
    }
    // if (prevProps.data_getDealerList !== this.props.data_getDealerList && this.props.data_getDealerList !== null) {

    //   if (this.state.filterId !== null) {
    //     // dataDisplayTable

    //     // console.log(prevProps.data_getDealerList, this.props.data_getDealerList)
    //     console.log(prevState.filterId, this.state.filterId)


    //     console.log("1111", this.props.data_getDealerList)
    //     let filterdata = this.props.data_getDealerList.filter(data => data.id === parseInt(this.state.filterId))
    //     console.log("2222", filterdata)

    //     // this.setState({ dataDisplayTable: filterdata })
    //   }




    // }

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

  dateFormat = (data) => {
    // console.log(data)
    // return "5555";
    return moment(data.value).format('llll')
  }


  showForm(isShow) {
    this.setState({ frmVihecleShow: isShow });

    if (!isShow) window.scrollTo(0, 0);
  }

  // addForm() {
  //   this.showForm(true);
  //   this.setState({ titleFormType: 'Add' });

  //   let fdi = this.state.formVehicleInfo
  //   for (let d in fdi) {
  //     fdi[d].value = ""
  //   }

  //   let fdi0 = this.state.formVehicleInfo2
  //   for (let d in fdi0) {
  //     fdi0[d].value = ""
  //   }

  //   let fdi2 = this.state.formPurchasinhInfo
  //   for (let d in fdi2) {
  //     fdi2[d].value = ""
  //   }

  //   let fdi3 = this.state.formInsurance
  //   for (let d in fdi3) {
  //     fdi3[d].value = ""
  //   }

  //   let fdi4 = this.state.formDealerAddress
  //   for (let d in fdi4) {
  //     fdi4[d].value = ""
  //   }



  //   let fdi5 = this.state.formDealerAddress2
  //   for (let d in fdi5) {
  //     fdi5[d].value = ""
  //   }


  //   this.setState({ formVehicleInfo: fdi, formVehicleInfo2: fdi0, formPurchasinhInfo: fdi2, formInsurance: fdi3, formDealerAddress: fdi4, formDealerAddress2: fdi5 })

  // }


  onDeleteRow = (e) => {
    e.cancel = "true"

    // this.props.deleteDealer(e.data.id)
  }



  cellRender({ data }) {
    if (data.adminUserName === undefined) {
      return <center><a href={'#/dealer/addDealerAdmin?id=' + data.id}><u>add</u></a></center>
    }
    return <center>{data.adminUserName}</center>
  }


  addForm() {
    this.props.setIdSelectDealer(null, 'Add')
    this.props.history.push('/dealer/dealerForm')
  }

  editCallback = (e) => {
    this.props.setIdSelectDealer(e.data.id, 'Edit')
    this.props.history.push('/dealer/dealerForm')
  }

  deleteCallback = (e) => {
    // this.props.deleteDriver(e.data.id)
  }


  isCloneIconVisible(data) {
    if (data.Title === undefined) {
      return true
    }
    return false
  }

  addIconClick(data) {
    // http://localhost:3000/#/addDealerAdmin
    this.props.history.push("/dealer/dealerForm")
    // this.props.history.push('/addDealerAdmin?id='+data.id)
  }




  render() {
    // const dataSource = []
    // const dataSource = DataGridView.connect.dataSource('/v1.0.0/api/hino/dealers/grid-view', 'id', this.props.credentialsInfo)

    let url = window.location.href;
    let strID = url.substring(url.lastIndexOf('?') + 1);
    let id = strID.includes('id') ? parseInt(strID.substring(3, strID.length)) : null
    let { header } = this.props

    //let dataSource
    //dataSource = DataGridView.connect.dataSource('/v1.0.1/grid-view/dealers', 'id', header)


    return (
      // <div className="form-horizontal" >
      <div>
        <Row>
          <Col lg="12">

            <div className="ibox float-e-margins">
              <div className="ibox-content" style={{ paddingLeft: 35, paddingRight: 35, borderWidth: ' 4px 0px 0px ', borderColor: '#e7eaec' }}>
                <Row style={{ textAlign: "right", marginTop: 5, marginBottom: 0 }}>
                  <Button className="btn btn-primary btn-sm" onClick={() => this.addForm()}><i className="fa fa-plus"></i>{' '}Add</Button>
                </Row>
                <Row>
                  <Table
                    mode={"api"}
                    serversideSource={'https://api-center.onelink-iot.com/v1.0.1/grid-view/dealers'}
                    author={header.idToken}
                    xAPIKey={header.redisKey}
                    table_id={5}
                    user_id={this.props.dataLogin.userId}
                    editing={{
                      enabled: true,
                      allowUpdating: true,
                      allowDeleting: true
                    }}
                    column={[
                      {
                        column_name: 'id',
                        column_caption: "id",
                      },
                      {
                        column_name: 'manageLevel',
                        column_caption: "manageLevel",
                      },
                      {
                        column_name: 'dealerCode',
                        column_caption: "dealerCode",
                      },
                      {
                        column_name: 'dealerName',
                        column_caption: "dealerName",
                      },
                      {
                        column_name: 'areaName',
                        column_caption: "areaName",
                      },
                      {
                        column_name: 'intPartnerCode',
                        column_caption: "intPartnerCode",
                      },
                      {
                        column_name: 'partnerType',
                        column_caption: "partnerType",
                      },
                      {
                        column_name: 'businessType',
                        column_caption: "businessType",
                      },
                      {
                        column_name: 'registerDate',
                        column_caption: "registerDate",
                      },
                      {
                        column_name: 'isIndividual',
                        column_caption: "isIndividual",
                      },
                      {
                        column_name: 'taxId',
                        column_caption: "taxId",
                      },
                      {
                        column_name: 'taxBranchId',
                        column_caption: "taxBranchId",
                      },
                      {
                        column_name: 'corporateType',
                        column_caption: "corporateType",
                      },
                      {
                        column_name: 'name',
                        column_caption: "name",
                      },
                      {
                        column_name: 'fullnameBilling',
                        column_caption: "fullnameBilling",
                      },
                      {
                        column_name: 'fullnameMailing',
                        column_caption: "fullnameMailing",
                      },
                      {
                        column_name: 'signatory1',
                        column_caption: "signatory1",
                      },
                      {
                        column_name: 'isOltEditOnly',
                        column_caption: "isOltEditOnly",
                      },
                    ]}
                    selectedCallback={this.selectedCallback}
                    initialCallback={this.tableInitial}
                    deleteCallback={this.deleteCallback}
                    editCallback={this.editCallback}
                    autoExpandAll={false}
                    remoteOperations={false}
                  >
                  </Table>
                  {/*
                  <DataGrid
                    id={'gridDriver'}
                    dataSource={dataSource ? dataSource.connect : []}
                    showBorders={true}
                    keyExpr={'id'}
                    height={600}
                    remoteOperations={true}
                    allowColumnReordering={true}
                    onEditingStart={this.onEditingStart}
                    // onSelectionChanged={this.selectDriver}
                    onSelectionChanged={this.selectEvent}
                    onToolbarPreparing={this.onToolbarPreparing}
                  >
                    <ColumnChooser enabled={true} mode="select" />
                    <FilterRow visible={true} />
                    <HeaderFilter visible={true} />
                    <GroupPanel visible={true} />
                    <SearchPanel visible={true}
                      width={240}
                      placeholder={'Search...'} />
                    <Export enabled={true} fileName={'Driver'} allowExportSelectedData={true} />
                    <Grouping autoExpandAll={this.state.autoExpandAll} />
                    <Scrolling mode="virtual" />

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
                    </Editing>
                    <Summary>
                      <GroupItem
                        column="Id"
                        summaryType="count" />
                    </Summary>
                  </DataGrid> */}
                </Row>
              </div>
            </div>

          </Col>

        </Row>

      </div >
    )
    // return (
    //   <div className="form-horizontal" >
    //     <Row>
    //       <Col lg="12">
    //         <div className="ibox float-e-margins">
    //           <div className="ibox-content" style={{ paddingLeft: 35, paddingRight: 35, borderWidth: ' 4px 0px 0px ', borderColor: '#e7eaec' }}>
    //             <Row style={{ textAlign: "right", marginTop: 5, marginBottom: 5 }}>
    //               <button className="btn btn-primary btn-sm" type="button"
    //                 onClick={() => {
    //                   this.props.setTypeForm('add')
    //                   this.props.history.push('/dealer/dealerForm')
    //                 }}><i className="fa fa-plus"></i>
    //                 {' '}Add
    //             </button>
    //             </Row>
    //             <Row>
    //               <DataGrid
    //                 id={'gridDealer'}
    //                 dataSource={dataSource.connect}
    //                 showBorders={true}
    //                 height={600}
    //                 remoteOperations={true}
    //                 keyExpr={'id'}
    //                 allowColumnReordering={true}
    //                 //  onEditingStart={this.onEditingStart}
    //                 onRowRemoving={this.onDeleteRow}
    //                 onToolbarPreparing={this.onToolbarPreparing}
    //               >

    //                 <FilterRow visible={true} />
    //                 <HeaderFilter visible={true} />
    //                 <GroupPanel visible={true} />
    //                 <SearchPanel visible={true}
    //                   width={240}
    //                   placeholder={'Search...'} />
    //                 <Export enabled={true} fileName={'Dealer'} allowExportSelectedData={true} />
    //                 {/* <Grouping autoExpandAll={false} /> */}
    //                 <Grouping autoExpandAll={this.state.autoExpandAll} />
    //                 {/* <Scrolling mode="virtual" /> */}
    //                 <Paging defaultPageSize={10} />
    //                 <Selection mode={'multiple'} />

    //                 <Editing
    //                   mode={'window'}
    //                   useIcons="plus"
    //                   allowDeleting={true}
    //                   allowUpdating={true}
    //                 >
    //                   {/* <Form>
    //                       <Item itemType={'group'} colCount={2} colSpan={2}>
    //                         <Item dataField={'code'} />
    //                         <Item dataField={'prefixName'} />
    //                         <Item dataField={'partnerName'} />
    //                         <Item dataField={'suffixName'} />
    //                         <Item dataField={'familyName'} />
    //                         <Item
    //                           dataField={'Notes'}
    //                           editorType={'dxTextArea'}
    //                           colSpan={2}
    //                           editorOptions={{ height: 100 }} />
    //                       </Item>
    //                       <Item itemType={'group'} caption={'Home Address'} colCount={2} colSpan={2}>
    //                         <Item dataField={'StateID'} />
    //                         <Item dataField={'Address'} />
    //                       </Item>
    //                     </Form> */}
    //                 </Editing>

    //                 <Column dataField="code" caption="Code" minWidth={120}>
    //                   {/* <Lookup dataSource={customersData} valueExpr="Value" displayExpr="Text" /> */}
    //                   {/* <StringLengthRule max={5} message="The field Customer must be a string with a maximum length of 5." /> */}
    //                 </Column>
    //                 <Column dataField="endorserName" caption="Endorser Name" minWidth={120}>
    //                   {/* <Lookup dataSource={customersData} valueExpr="Value" displayExpr="Text" /> */}
    //                   {/* <StringLengthRule max={5} message="The field Customer must be a string with a maximum length of 5." /> */}
    //                 </Column>
    //                 <Column dataField="partnerName" caption="Partner Name" minWidth={120}>
    //                   {/* <Lookup dataSource={customersData} valueExpr="Value" displayExpr="Text" /> */}
    //                   {/* <StringLengthRule max={5} message="The field Customer must be a string with a maximum length of 5." /> */}
    //                 </Column>
    //                 <Column dataField="billingFullName" caption="Billing FullName" minWidth={120}>
    //                   {/* <Lookup dataSource={customersData} valueExpr="Value" displayExpr="Text" /> */}
    //                   {/* <StringLengthRule max={5} message="The field Customer must be a string with a maximum length of 5." /> */}
    //                 </Column>
    //                 <Column dataField="taxNo" caption="Tax No" minWidth={120}>
    //                   {/* <Lookup dataSource={customersData} valueExpr="Value" displayExpr="Text" /> */}
    //                   {/* <StringLengthRule max={5} message="The field Customer must be a string with a maximum length of 5." /> */}
    //                 </Column>

    //                 <Column dataField="admin" caption="Admin"
    //                   cellRender={this.cellRender} minWidth={120}
    //                 >
    //                   {/* <StringLengthRule max={5} message="The field Customer must be a string with a maximum length of 5." /> */}
    //                 </Column>

    //                 <Column type="buttons" width={110}
    //                   buttons={[
    //                     {
    //                       icon: 'fas fa-edit',
    //                       onClick: this.onEditingStart
    //                     },
    //                     'delete',

    //                   ]} />
    //                 {/* <Summary>
    //                     <TotalItem column="Freight" summaryType="sum">
    //                       <ValueFormat type="decimal" precision={2} />
    //                     </TotalItem>

    //                     <GroupItem column="Freight" summaryType="sum">
    //                       <ValueFormat type="decimal" precision={2} />
    //                     </GroupItem>

    //                     <GroupItem summaryType="count" />

    //                   </Summary> */}
    //               </DataGrid>
    //             </Row>
    //           </div>
    //         </div>
    //       </Col>
    //     </Row>
    //   </div>
    // )
  }
}



const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  groupType: state.signin.groupType,
  businessPartnerId: state.signin.businessPartnerId,
  // userGroup: state.signin.userGroup,

  //----------------------------------------------------------------

  dataDealerList: state.dealer.dataDealerList,
  infoDealerData: state.dealer.infoDealerData,
  credentialsInfo: state.signin.credentialsInfo,
  header: state.signin.header,

});

const mapDispatchToProps = (dispatch) => ({
  // setTest: test => dispatch(PopupActions.setTest(test))
  setIdSelectDealer: (personalId, action) => dispatch(DealerActions.setIdSelectDealer(personalId, action)),
  deleteDealer: (id) => dispatch(DealerActions.deleteDealer(id)),

  // ------------------------------------------------------------------------------------------

});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dealer))

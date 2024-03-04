import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import GenerateForm from 'react-form-generator-from-json'
import {
  Label, Container, Row, Card, Col, Form, Input, ButtonGroup, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
  , Modal, ModalHeader, ModalBody, ModalFooter

} from 'reactstrap'

import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css'
import service from './data.js';
import DataGrid, { Column, FilterRow, HeaderFilter, SearchPanel, Grouping, GroupPanel, Paging, Export, Selection, MasterDetail, Editing } from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';

import moment from 'moment'
import 'moment/locale/th'
import './custom.css'


import CustomerActions from '../../Redux/CustomerRedux'

const getOrderDay = (rowData) => {
  return (new Date(rowData.OrderDate)).getDay();
};

const saleAmountEditorOptions = { format: 'currency', showClearButton: true };


class Customer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      autoExpandAll: true,
      rSelected: null,
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
      frmVihecleShow: false
      , titleFormType: ''
      , dropdownOpen: false
    }
    this.dataGrid = React.createRef();
    this.onEditingStart = this.onEditingStart.bind(this);

    this.toggle = this.toggle.bind(this);
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
      // console.log(this.state.currentDataGridState);
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
      // console.log(this.state.currentDataGridState);
    });
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

  addForm() {

    this.props.history.push('customerForm')
    this.props.dataEdit(null)
  }

  onEditingStart(e) {
    // e.cancel = true;
 
    let dataEdit;
 
    // GET DATA SELECTED
    let obj = {}
    for (const [key, value] of Object.entries(e.data)) {
      obj[key] = value
      // this.dataGrid.current.instance.cellValue(e.key, key, value + "01");
    }
 
    this.props.dataEdit(obj)
    this.props.history.push('customerForm')
  }

  render() {
    return (
      <div className="contrainner">

        <div className="ibox float-e-margins">
          <div className="ibox-title">
            <h5>Customer Info</h5>
            <div className="ibox-tools">
              <Button className="btn btn-primary btn-xs" onClick={() => this.addForm()}><i className="fa fa-plus"></i>{' '}Add</Button>

            </div>
          </div>
          <div className="ibox-content">
            <div className="row">
              <div className="col-lg-12">
                <DataGrid id={'gridContainer'}
                  ref={this.dataGrid}
                  dataSource={this.orders}
               //   keyExpr={'ID'}
                  showBorders={true}
                  allowColumnReordering={true}
                  onContentReady={this.detectContentReady}
                  onEditingStart={this.onEditingStart}
                >
                  {/* <Table tableComponent={TableComponent} /> */}
                  <GroupPanel visible={true} />
                  <Grouping autoExpandAll={this.state.autoExpandAll} />
                  <Paging defaultPageSize={10} />
                  <Editing
                    mode={'window'}
                    allowUpdating={true}>

                    <Form>
                      <Item itemType={'group'} colCount={2} colSpan={2}>
                        <Item dataField={'CustomerID'} />
                        <Item dataField={'DealerCode'} />
                        <Item dataField={'InternalCustomerID'} />
                        <Item dataField={'FullNameEN'} />
                        <Item dataField={'RegisterDate'} />
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

                  <Column dataField={'CustomerID'} minWidth={150} />
                  <Column dataField={'DealerCode'} minWidth={150} />
                  <Column dataField={'InternalCustomerID'} minWidth={150} />
                  <Column dataField={'FullName'} minWidth={150} />
                  <Column dataField={'RegisterDate'} minWidth={150} />
                  {/* <Column dataField={'CustomerStoreCity'}
                    caption={'City'} minWidth={150}>
                    <HeaderFilter allowSearch={true} />
                  </Column> */}
                  {/* <MasterDetail
                    enabled={true}
                    component={DetailTemplate}
                  /> */}
                </DataGrid>
              </div>
            </div>
          </div>
        </div>

      </div>

    )
  }
}


const mapStateToProps = (state) => ({
  dataEdit: state.customer.dataEdit
});
const mapDispatchToProps = (dispatch) => ({
  dataEdit: dataEdit => dispatch(CustomerActions.dataEdit(dataEdit))

});

export default connect(mapStateToProps, mapDispatchToProps)(Customer)

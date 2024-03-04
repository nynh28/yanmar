import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom'

// import { connect } from 'react-redux'
import GenerateForm from 'react-form-generator-from-json'
import { Container, Row, Card, Col, Form, Input, Button } from 'reactstrap'

import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';

// import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
// import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap4';
// import '../Vehicle/custom.css'


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


const getOrderDay = (rowData) => {
  return (new Date(rowData.OrderDate)).getDay();
};

const saleAmountEditorOptions = { format: 'currency', showClearButton: true };


class Fleet extends Component {

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
      titleFormType: '',
      FleetInfo: [
        {
          "typeField": "text",
          "label": "Fleet Name",
          "required": false,
          "type": "text",
          "name": "FleetName",
          "class": "",
          "tipText": "",
          "placeholder": "",
          "value": "",
          "min_length": "",
          "max_length": "",
          "sufix": ""
        }
      ],

      columns: [
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      rows: [
        { sex: "Female", name: "Sandra", city: "Las Vegas", car: "Audi A4" },
        { sex: "Male", name: "Paul", city: "Paris", car: "Nissan Altima" },
        { sex: "Male", name: "Mark", city: "Paris", car: "Honda Accord" },
        { sex: "Male", name: "Paul", city: "Paris", car: "Nissan Altima" },
        { sex: "Female", name: "Linda", city: "Austin", car: "Toyota Corolla" },
        {
          sex: "Male",
          name: "Robert",
          city: "Las Vegas",
          car: "Chevrolet Cruze"
        },
        { sex: "Female", name: "Lisa", city: "London", car: "BMW 750" },
        { sex: "Male", name: "Mark", city: "Chicago", car: "Toyota Corolla" },
        {
          sex: "Male",
          name: "Thomas",
          city: "Rio de Janeiro",
          car: "Honda Accord"
        },
        { sex: "Male", name: "Robert", city: "Las Vegas", car: "Honda Civic" },
        { sex: "Female", name: "Betty", city: "Paris", car: "Honda Civic" },
        {
          sex: "Male",
          name: "Robert",
          city: "Los Angeles",
          car: "Honda Accord"
        },
        {
          sex: "Male",
          name: "William",
          city: "Los Angeles",
          car: "Honda Civic"
        },
        { sex: "Male", name: "Mark", city: "Austin", car: "Nissan Altima" }
      ]
    }
    this.dataGrid = React.createRef();
    this.onEditingStart = this.onEditingStart.bind(this);
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
    var currentSetting = this.dataGrid.current.instance.state();
    this.setState((state, props) => {
      return { currentDataGridState: currentSetting };
    }, () => {
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
  addForm() {
    this.props.history.push('/fleet/fleetForm')
    // this.props.dataEdit(null)
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

    //  this.props.dataEdit(obj)
    this.props.history.push('fleetForm')

  }

  render() {
    return (
      <div className="contrainner">
        <div className="ibox float-e-margins">
          <div className="ibox-title">
            <h5>Fleet</h5>
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
                  keyExpr={'ID'}
                  showBorders={true}
                  allowColumnReordering={true}
                  onContentReady={this.detectContentReady}
                  onEditingStart={this.onEditingStart}
                  onRowRemoving={this.onDeleteRow}
                >
                  <GroupPanel visible={true} />
                  <Grouping autoExpandAll={this.state.autoExpandAll} />
                  <Paging defaultPageSize={10} />
                  <Editing
                    mode={'window'}
                    useIcons="plus"
                    allowUpdating={true}
                    allowDeleting={true} >

                    <Form>
                      <Item itemType={'group'} colCount={2} colSpan={2}>
                        <Item dataField={'FirstName'} />

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
                  <Column dataField={'FleetName'} minWidth={150} />
                </DataGrid>
              </div>
            </div>
          </div>
        </div>






      </div>
    )
  }
}


// const mapStateToProps = (state) => ({
//     test: state.popup.test,
//     // messageError: state.login.messageError,
//     // data: state.login.data
// });

// const mapDispatchToProps = (dispatch) => ({
//     // setTest: test => dispatch(PopupActions.setTest(test))
// });


export default (Fleet)

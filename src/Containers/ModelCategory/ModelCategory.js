import React, { Component } from 'react'
import { connect } from 'react-redux'
import GenerateForm from 'react-form-generator-from-json'
import ModelActions from '../../Redux/ModelRedux'
import { withRouter } from 'react-router'
import { Container, Row, Card, Col, CardTitle, Form, Input, FormText } from 'reactstrap'
import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css'
import DataGrid, { RemoteOperations, Texts, Column, FilterRow, HeaderFilter, SearchPanel, Grouping, GroupPanel, Paging, Export, Selection, MasterDetail, Editing } from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import { throwStatement } from '@babel/types';
import moment from 'moment'
import 'moment/locale/th'


const getOrderDay = (rowData) => {
  return (new Date(rowData.OrderDate)).getDay();
};

const saleAmountEditorOptions = { format: 'currency', showClearButton: true };
let checkRequest = true
class ModelCategory extends Component {

  constructor(props) {
    super(props)
    this.state = {
      autoExpandAll: true,
      currentDataGridState: [],
      listfilter: []
    };
    this.dataGrid = React.createRef();
  }

  handleChange(event) {
    this.setState({
      img: URL.createObjectURL(event.target.files[0])
    })
  }

  componentWillMount = () => {
    this.props.getCategoryType()
    this.props.getClassType()
    this.props.getEngineSeries()
  }

  componentDidMount = () => {

  }

  isCloneIconVisible(data) {
    if (data.Title === undefined) {
      return true
    }
    return false
  }


  render() {

    // let url = window.location.href;
    // let strID = url.substring(url.lastIndexOf('?') + 1);
    // let id = strID.includes('id') ? parseInt(strID.substring(3, strID.length)) : null

    return (
      <Row>
        <Col>
          <div className="contrainner">
            <div className="ibox float-e-margins">
              <div className="ibox-title">
                <h5>Category Type</h5>
                <div className="ibox-tools">
                </div>
              </div>
              <div className="ibox-content">
                <div className="row">
                  <div className="col-lg-12">
                    <div className={"table-responsive"}>

                      {/* // Table Here */}
                      <DataGrid id={'gridContainer'}
                        ref={this.dataGrid}
                        dataSource={this.props.data_getCategoryType}
                        // dataSource={this.state.listfilter}
                        keyExpr={'id'}
                        showBorders={true}
                        allowColumnReordering={true}
                        onContentReady={this.detectContentReady}
                      >
                        <GroupPanel visible={true} />
                        <Grouping autoExpandAll={this.state.autoExpandAll} />
                        <Paging defaultPageSize={10} />

                        <HeaderFilter visible={true} />
                        <RemoteOperations
                          groupPaging={true} />
                        <SearchPanel visible={true}
                          width={240}
                          placeholder={'Search...'} />
                        <Export enabled={true} fileName={'TEST'} allowExportSelectedData={true} />
                        <Selection mode={'multiple'} />
                        <Column dataField={'name'} minWidth={80} />
                        <Column dataField={'created_date_time'} minWidth={150} />
                        <Column dataField={'created_by'} minWidth={150} />
                        <Column dataField={'updated_date_time'} minWidth={150} />
                        <Column dataField={'updated_by'} minWidth={150} />
                      </DataGrid>
                      {/* // Table Here */}

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div >
        </Col>

        <Col>
          <div className="contrainner">
            <div className="ibox float-e-margins">
              <div className="ibox-title">
                <h5>Class Type</h5>
                <div className="ibox-tools">
                </div>
              </div>
              <div className="ibox-content">
                <div className="row">
                  <div className="col-lg-12">
                    <div className={"table-responsive"}>

                      {/* // Table Here */}
                      <DataGrid id={'gridContainer'}
                        ref={this.dataGrid}
                        dataSource={this.props.data_getClassType}
                        // dataSource={this.state.listfilter}
                        keyExpr={'id'}
                        showBorders={true}
                        allowColumnReordering={true}
                        onContentReady={this.detectContentReady}
                      >
                        <GroupPanel visible={true} />
                        <Grouping autoExpandAll={this.state.autoExpandAll} />
                        <Paging defaultPageSize={10} />

                        <HeaderFilter visible={true} />
                        <RemoteOperations
                          groupPaging={true} />
                        <SearchPanel visible={true}
                          width={240}
                          placeholder={'Search...'} />
                        <Export enabled={true} fileName={'TEST'} allowExportSelectedData={true} />
                        <Selection mode={'multiple'} />
                        <Column dataField={'name'} minWidth={80} />
                        <Column dataField={'created_date_time'} minWidth={150} />
                        <Column dataField={'created_by'} minWidth={150} />
                        <Column dataField={'updated_date_time'} minWidth={150} />
                        <Column dataField={'updated_by'} minWidth={150} />
                      </DataGrid>
                      {/* // Table Here */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div >
        </Col>

        <Col>
          <div className="contrainner">
            <div className="ibox float-e-margins">
              <div className="ibox-title">
                <h5>Engine Series</h5>
                <div className="ibox-tools">
                </div>
              </div>
              <div className="ibox-content">
                <div className="row">
                  <div className="col-lg-12">
                    <div className={"table-responsive"}>

                      {/* // Table Here */}
                      <DataGrid id={'gridContainer'}
                        ref={this.dataGrid}
                        dataSource={this.props.data_getEngineSeries}
                        // dataSource={this.state.listfilter}
                        keyExpr={'id'}
                        showBorders={true}
                        allowColumnReordering={true}
                        onContentReady={this.detectContentReady}
                      >
                        <GroupPanel visible={true} />
                        <Grouping autoExpandAll={this.state.autoExpandAll} />
                        <Paging defaultPageSize={10} />

                        <HeaderFilter visible={true} />
                        <RemoteOperations
                          groupPaging={true} />
                        <SearchPanel visible={true}
                          width={240}
                          placeholder={'Search...'} />
                        <Export enabled={true} fileName={'TEST'} allowExportSelectedData={true} />
                        <Selection mode={'multiple'} />
                        <Column dataField={'name'} minWidth={80} />
                        <Column dataField={'created_date_time'} minWidth={150} />
                        <Column dataField={'created_by'} minWidth={150} />
                        <Column dataField={'updated_date_time'} minWidth={150} />
                        <Column dataField={'updated_by'} minWidth={150} />
                      </DataGrid>
                      {/* // Table Here */}

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div >
        </Col>
      </Row>
    )
  }
}



const mapStateToProps = (state) => ({
  language: state.versatile.language,

  data_getCategoryType: state.model.data_getCategoryType,
  request_getCategoryType: state.model.request_getCategoryType,

  data_getClassType: state.model.data_getClassType,
  request_getClassType: state.model.request_getClassType,

  data_getEngineSeries: state.model.data_getEngineSeries,
  request_getEngineSeries: state.model.request_getEngineSeries,
});

const mapDispatchToProps = (dispatch) => ({
  getCategoryType: () => dispatch(ModelActions.getCategoryType()),
  getClassType: () => dispatch(ModelActions.getClassType()),
  getEngineSeries: () => dispatch(ModelActions.getEngineSeries()),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModelCategory))




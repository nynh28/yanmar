import React from "react";
import DataGrid, {
  RemoteOperations,
  Grouping,
  GroupPanel,
  Summary,
  GroupItem,
  Pager,
  Paging,
  Column,
  ColumnChooser,
  SearchPanel,
  FilterRow,
  HeaderFilter,
  Sorting,
  Export,
  Selection,
  Editing,
  Item,
  Popup,
  Position,
  Form
} from "devextreme-react/data-grid";
import { Animation, Chart, Series, Legend, ValueAxis, Title, Pane, Grid, Tooltip, Crosshair, ConstantLine, Label, VisualRange, Size, Point, ScrollBar, ZoomAndPan, } from 'devextreme-react/chart';
import CustomStore from "devextreme/data/custom_store";
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './table.css';
import { CommonAxisSettingsLabel } from "devextreme-react/chart";
import DatepickerCustom from './datepicker-custom';
import dataSource from './datatable2';
import { Card } from "@material-ui/core";
// import $ from "jquery";

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}
function handleErrors(response) {
  if (!response.ok)
    throw Error(response.statusText);
  return response;
}

class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startdatefocus: false,
      enddatefocus: false
    }
    this.prevloadOption = {}
    this.datagrid = React.createRef()
    this.spec_code = React.createRef();
    this.vehicle_name = React.createRef();
    this.start_date = React.createRef()
    this.end_date = React.createRef()
    this.startdateCalendar = React.createRef();
    this.enddateCalendar = React.createRef();
    this.Datepicker = React.createRef();
    this.onToolbarPreparing = this.onToolbarPreparing.bind(this);
  }



  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift(
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'dx-icon icon-font-size-increase-2-512-01',
          onClick: this.zoomDataGrid.bind(this)
        }
      });
  }

  zoomDataGrid() {

    let level = this.state.zoomTableLevel
    if (level === undefined) level = 1

    switch (level) {
      case 1:
        level = 2
        document.getElementById('gridUserAuthen').style.zoom = 1.3
        break;
      case 2:
        level = 3
        document.getElementById('gridUserAuthen').style.zoom = 1.6
        break;
      default:
        level = 1
        document.getElementById('gridUserAuthen').style.zoom = 1
        break;
    }

    this.setState({ zoomTableLevel: level })
  }



  loadTrigger() {
    this.datagrid.current.instance.refresh();
  }
  componentDidMount() {
    this.readyonload = 1;
    this.datagrid.current.instance.refresh();
  }

  render() {
    var config = {
      language: 'TH',
      showDropdowns: true,
      format: "MM/DD/YYYY" // รองรับแต่ format นี้ เท่านั้น !!!!!!!!
    };
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="ibox float-e-margins">
            <div className="ibox-title">
              <h5>User Authentication</h5>
              <div className="ibox-tools">
              </div>
            </div>
            <div className="ibox-content">
              <DataGrid
                id={'gridUserAuthen'}
                ref={this.datagrid}
                dataSource={dataSource}
                // dataSource={this.store}
                columnAutoWidth={true}
                allowColumnResizing={true}
                columnResizingMode={"widget"}
                allowColumnReordering={true}
                columnMinWidth={50}
                keyExpr={'Id'}
                pager={
                  {
                    allowedPageSizes: [5, 10],
                    showPageSizeSelector: true,
                    showNavigationButtons: true
                  }
                }
                onToolbarPreparing={this.onToolbarPreparing}
              >
                <Selection
                  mode={'multiple'}
                />
                <ColumnChooser enabled={true} mode={"select"} />
                <Export enabled={true} fileName={'Report'} allowExportSelectedData={true} />
                {/* <FilterRow visible={false}  /> */}
                <HeaderFilter visible={true} />
                <SearchPanel visible={true}
                  width={240}
                  placeholder={'Search...'} />
                <Sorting mode={'multiple'} />
                <Grouping autoExpandAll={false} />
                <GroupPanel visible={true} />
                <Editing
                  mode="popup"
                  allowUpdating={true}
                  allowAdding={true}>
                  <Popup title="Employee Info" showTitle={true} width={700} height={525}>
                    <Position my="top" at="top" of={window} />
                  </Popup>
                  <Form>
                    <Item itemType="group" colCount={2} colSpan={2}>
                      <Item dataField="full_name" />
                      <Item dataField="roel" />
                      <Item dataField="company" />
                      <Item dataField="City" />
                      <Item dataField="level" />

                      <Item
                        dataField="Notes"
                        editorType="dxTextArea"
                        colSpan={2}
                        editorOptions={{ height: 100 }} />
                    </Item>

                    <Item itemType="group" caption="Home Address" colCount={2} colSpan={2}>
                      <Item dataField="StateID" />
                      <Item dataField="Address" />
                    </Item>
                  </Form>
                </Editing>
                <RemoteOperations
                  groupPaging={true} />
                <Summary>
                  <GroupItem
                    column={'Id'}
                    summaryType={'count'} />
                </Summary>
              </DataGrid>
            </div>
          </div>

        </div>
      </div>



    );
  }
}
export default Table;

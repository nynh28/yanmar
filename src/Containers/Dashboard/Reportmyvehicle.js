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
  Selection
} from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './table.css';
import { CommonAxisSettingsLabel } from "devextreme-react/chart";
import DatepickerCustom from './datepicker-custom';
// import $ from "jquery";

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}
function handleErrors(response) {
  if (!response.ok)
    throw Error(response.statusText);
  return response;
}

class ReportMyvehicle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startdatefocus: false,
      enddatefocus: false
    }
    this.prevloadOption = {}
    this.datagrid = React.createRef()
    this.store = new CustomStore({
      key: "id",
      load: (loadOptions) => {
        let params = "?";
        [
          "skip",
          "take",
          "requireTotalCount",
          "requireGroupCount",
          "sort",
          "filter",
          "totalSummary",
          "group",
          "groupSummary"
        ].forEach(function (i) {
          if (i in loadOptions && isNotEmpty(loadOptions[i]))
            params += `${i}=${JSON.stringify(loadOptions[i])}&`;
        });
        var startdate;
        var enddate;
        if (this.Datepicker.current.refs.dateinput.value == "") {
          startdate = window.moment().format("MM/DD/YYYY");
          enddate = window.moment().format("MM/DD/YYYY");
          this.initialdateinstance = 1;
        } else {
          var datesplit = this.Datepicker.current.refs.dateinput.value.split('-');
          startdate = datesplit[0];
          enddate = datesplit[1];
        }
        startdate = startdate.replace(/\s/g, '')
        enddate = enddate.replace(/\s/g, '')

        var splitstartdate = startdate.split('/');
        startdate = splitstartdate[2] + "-" + splitstartdate[0] + "-" + splitstartdate[1];

        var splitenddate = enddate.split('/');
        enddate = splitenddate[2] + "-" + splitenddate[0] + "-" + splitenddate[1];

        if (this.spec_code.current.value != "")
          params += `spec_code=${this.spec_code.current.value}&`;
        if (this.vehicle_name.current.value != "")
          params += `vehicle_name=${this.vehicle_name.current.value}&`;

        params += `customstartdate=${startdate}&`;
        params += `customenddate=${enddate}&`;
        params = params.slice(0, -1);
        return fetch(`https://hino-dev-api.natapol.work/api/best${params}`)
          .then(handleErrors)
          .then(response => response.json())
          .then((result) => {
            return {
              data: result.data,
              totalCount: result.totalCount,
              summary: result.summary,
              groupCount: result.groupCount
            }
          });
      }
    })
    this.spec_code = React.createRef();
    this.vehicle_name = React.createRef();
    this.start_date = React.createRef()
    this.end_date = React.createRef()
    this.startdateCalendar = React.createRef();
    this.enddateCalendar = React.createRef();
    this.Datepicker = React.createRef();
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
              <h5>Report Myvehicle</h5>
              <div className="ibox-tools">
              </div>
            </div>
            <div className="ibox-content">
              <div className="row">
                <div className="col-md-3">
                  <div className="form-group">
                    <label>Spec Code :</label>
                    <input ref={this.spec_code} className="form-control"></input>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label>Vehecle Name :</label>
                    <input ref={this.vehicle_name} className="form-control"></input>
                  </div>
                </div>
                <div style={{ display: 'none' }} className="col-md-3">
                  <div className="form-group">
                    <label>Start date :</label>
                    <DatepickerCustom Configuration={config} Class={"form-control"} ref={this.Datepicker}></DatepickerCustom>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <div className="form-group">
                    <button onClick={this.loadTrigger.bind(this)} className="btn btn-primary"> <i className="fa fa-refresh" aria-hidden="true"></i> Filter</button>
                  </div>
                </div>

              </div>
              <div className="row">
                <div className="col-md-12 text-right">
                  <div className="form-group">
                  </div>
                </div>
              </div>
              <DataGrid
                ref={this.datagrid}
                dataSource={this.store}
                columnAutoWidth={true}
                allowColumnResizing={true}
                columnResizingMode={"widget"}
                columnMinWidth={50}
                keyExpr={'Id'}
                pager={
                  {
                    allowedPageSizes: [5, 10],
                    showPageSizeSelector: true,
                    showNavigationButtons: true
                  }
                }
              >
                <Selection
                  mode={'multiple'}
                />
                <ColumnChooser enabled={true} mode={"select"} />
                <Export enabled={true} fileName={'Report'} allowExportSelectedData={true} />
                <FilterRow visible={true} />
                <HeaderFilter visible={true} />
                <SearchPanel visible={true}
                  width={240}
                  placeholder={'Search...'} />
                <Sorting mode={'multiple'} />
                <Grouping autoExpandAll={false} />
                <GroupPanel visible={true} />
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
export default ReportMyvehicle;

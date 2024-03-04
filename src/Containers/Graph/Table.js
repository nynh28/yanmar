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
import dataSource from './datatable';
import { connect } from 'react-redux';
import ReportActions from '../../Redux/ReportRedux';
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
    //console.log(this.props.ReportData)
    this.props.callReportApi();
    this.props.calculateReport();

    // this.store = new CustomStore({
    //         key: "id",
    //         load: (loadOptions) => {
    //             let params = "?";
    //             [
    //                 "skip",
    //                 "take",
    //                 "requireTotalCount",
    //                 "requireGroupCount",
    //                 "sort",
    //                 "filter",
    //                 "totalSummary",
    //                 "group",
    //                 "groupSummary"
    //             ].forEach(function(i) {
    //                 if(i in loadOptions && isNotEmpty(loadOptions[i]))
    //                     params += `${i}=${JSON.stringify(loadOptions[i])}&`;
    //             });
    //             var startdate;
    //             var enddate;
    //             if(this.Datepicker.current.refs.dateinput.value == ""){
    //                 startdate = window.moment().format("MM/DD/YYYY");
    //                 enddate = window.moment().format("MM/DD/YYYY");
    //                 this.initialdateinstance = 1;
    //             } else {
    //                 var datesplit = this.Datepicker.current.refs.dateinput.value.split('-');
    //                 startdate = datesplit[0];
    //                 enddate = datesplit[1];
    //             }
    //             startdate = startdate.replace(/\s/g,'')
    //             enddate = enddate.replace(/\s/g,'')

    //             var splitstartdate = startdate.split('/');
    //             startdate = splitstartdate[2]+"-"+splitstartdate[0]+"-"+splitstartdate[1];

    //             var splitenddate = enddate.split('/');
    //             enddate = splitenddate[2]+"-"+splitenddate[0]+"-"+splitenddate[1];

    //             if(this.spec_code.current.value != "")
    //                 params += `spec_code=${this.spec_code.current.value }&`;
    //             if(this.vehicle_name.current.value != "")
    //                 params += `vehicle_name=${this.vehicle_name.current.value }&`;

    //             params += `customstartdate=${startdate}&`;
    //             params += `customenddate=${enddate}&`;
    //             params = params.slice(0, -1);
    //             //console.log(params);
    //             return fetch(`http://178.128.56.85:5000/api/Behavior${params}`)
    //                 .then(handleErrors)
    //                 .then(response => response.json())
    //                 .then((result) => {
    //                     return {
    //                         data: result.data,
    //                         totalCount: result.totalCount,
    //                         summary: result.summary,
    //                         groupCount: result.groupCount
    //                     }
    //                 });
    //         }
    //     })
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
  onRowPrepared(e) {
    //console.log(e)
    if (e.rowType == 'data' && e.data.acc == 'f') {
      e.rowElement.style.backgroundColor = '#ff765a';
      e.rowElement.className = e.rowElement.className.replace("dx-row-alt", "");

    }
  }
  wow() {
    //console.log(this.props.ReportData);
  }
  render() {
    this.store = new CustomStore({
      key: 'id',
      load: function (loadOptions) {
        let params = '?';
        [
          'skip',
          'take',
          'requireTotalCount',
          'requireGroupCount',
          'sort',
          'filter',
          'totalSummary',
          'group',
          'groupSummary'
        ].forEach(function (i) {
          if (i in loadOptions && isNotEmpty(loadOptions[i])) { params += `${i}=${JSON.stringify(loadOptions[i])}&`; }
        });
        params = params.slice(0, -1);
        return fetch(`https://hino-dev-api.natapol.work/api/fleet/${params}`)
          .then(response => response.json())
          .then((data) => {
            return {
              data: data.data,
              totalCount: data.totalCount,
              summary: data.summary,
              groupCount: data.groupCount
            };
          })
          .catch(() => { throw 'Data Loading Error'; });
      }
    });
    var config = {
      language: 'TH',
      showDropdowns: true,
      format: "MM/DD/YYYY" // รองรับแต่ format นี้ เท่านั้น !!!!!!!!
    };
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-default">
            <div className="panel-body">
              {/* <div className="row">
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
                                    <div style={{display:'none'}} className="col-md-3">
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

                                </div> */}
              <div className="row">
                {/* <button onClick={this.wow.bind(this)}>sdsd</button> */}
                <div className="col-md-12 text-right">
                  <div className="form-group">
                    <a href={'#/reportTable/reportEcotree'}><button style={{ width: "150px" }} className="btn btn-primary"><i className="fa fa-cogs"></i> Full Report</button></a>
                  </div>
                </div>
              </div>
              <DataGrid
                ref={this.datagrid}
                dataSource={this.store}
                // dataSource={this.store}
                columnAutoWidth={true}
                onRowPrepared={this.onRowPrepared.bind(this)}
                allowColumnResizing={true}
                columnResizingMode={"widget"}
                allowColumnReordering={true}
                columnMinWidth={30}
                keyExpr={'id'}
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
                {/* <FilterRow visible={true} /> */}
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
                    column={'id'}
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

// export default dashboardreport;
const mapStateToProps = (state) => ({
  ReportData: state.report.ReportData
  // DoughnutData: state.dashboard.DoughnutData,
  // DLTstandart:state.dashboard.DLTstandart
});

const mapDispatchToProps = (dispatch) => ({
  callReportApi: () => dispatch(ReportActions.callReportApi()),
  calculateReport: () => dispatch(ReportActions.calculateReport())
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

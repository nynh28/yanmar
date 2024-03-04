import React from "react";
import Radarbar from './Graph/Radarcomponent'
import Barcaom4 from './Graph/SpeedReportCharts/Barcomponent4'
import Dngraph from './Graph/daynightgraph/dngraph'
import Dngraph1 from './Graph/daynightgraph1/dngraph1'
import Doughnut from './Graph/doughnutchart/doughnutcom'
import Safety from './Graph/safety/spider1'
import { connect } from 'react-redux';
import DashboardActions from '../../Redux/DashboardRedux';
// import $ from "jquery";

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}
function handleErrors(response) {
  if (!response.ok)
    throw Error(response.statusText);
  return response;
}

class dashboardreport extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      startdatefocus: false,
      enddatefocus: false
    }
    this.prevloadOption = {}
    this.props.callRealtimeApi();
    this.props.callDltApi();
    this.datagrid = React.createRef()
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
  // loadTrigger(){
  //     this.datagrid.current.instance.refresh();
  // }
  // componentDidMount(){
  //     this.readyonload = 1;
  //     this.datagrid.current.instance.refresh();
  // }

  testcall() {
    this.props.callRealtimeApi();
    //console.log(this.props.DoughnutData);
  }

  render() {
    var config = {
      language: 'TH',
      showDropdowns: true,
      format: "MM/DD/YYYY" // รองรับแต่ format นี้ เท่านั้น !!!!!!!!
    };
    return (
      <div className="row">
        <div className="row">
          <div className="col-md-3">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="row">
                  <div className="col-md-8" style={{ fontWeight: "bold" }}>
                    <font>Fuel Comsumption</font>
                  </div>
                  <div className="col-md-4" align="right" >
                    <font style={{ color: 'white', fontSize: 10, backgroundColor: '#55c1d9', paddingTop: 2, paddingLeft: 2, paddingRight: 2, paddingBottom: 2, borderRadius: 5 }}>1 Oct 2019</font>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-4" style={{ fontWeight: "bold" }}>
                    <font>6.89 Km/L</font>
                  </div>
                  <div className="col-md-8" align="right" style={{ fontWeight: "bold" }}>
                    <font>Mileage 2,245 Km</font>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <font>Total</font>
                  </div>
                  <div className="col-md-8" align="right">
                    <font>Fuel Usage 325.4 Liters</font>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="row">
                  <div className="col-md-8" style={{ fontWeight: "bold" }}>
                    <font>Drive with N Gear</font>
                  </div>
                  <div className="col-md-4" align="right">
                    <font style={{ color: 'white', fontSize: 10, backgroundColor: '#55d978', paddingTop: 2, paddingLeft: 2, paddingRight: 2, paddingBottom: 2, borderRadius: 5 }}>Monthly</font>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-4" style={{ fontWeight: "bold" }}>
                    <font>2 Units</font>
                  </div>
                  <div className="col-md-8" align="right" style={{ fontWeight: "bold" }}>
                    <font>OLT-7878 2.14 Km</font>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <font>Total</font>
                  </div>
                  <div className="col-md-8" align="right">
                    <font>Max Speed 56 Km/Hr</font>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="row">
                  <div className="col-md-8" style={{ fontWeight: "bold" }}>
                    <font>Idling</font>
                  </div>
                  <div className="col-md-4" align="right" >
                    <font style={{ color: 'white', fontSize: 10, backgroundColor: '#55d978', paddingTop: 2, paddingLeft: 2, paddingRight: 2, paddingBottom: 2, borderRadius: 5 }}>Monthly</font>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-5" style={{ fontWeight: "bold" }}>
                    <font>3 Hr 10 min</font>
                  </div>
                  <div className="col-md-7" align="right" style={{ fontWeight: "bold" }}>
                    <font>OLT-7878 113 Min</font>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-5">
                    <font>Total</font>
                  </div>
                  <div className="col-md-7" align="right">
                    <font>Fuel Usage 29.9 Liters</font>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="row">
                  <div className="col-md-8" style={{ fontWeight: "bold" }}>
                    <font>Overspeed</font>
                  </div>
                  <div className="col-md-4" align="right">
                    <font style={{ color: 'white', fontSize: 10, backgroundColor: '#55d978', paddingTop: 2, paddingLeft: 2, paddingRight: 2, paddingBottom: 2, borderRadius: 5 }}>Monthly</font>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-4" style={{ fontWeight: "bold" }}>
                    <font>12 Km/Hr</font>
                  </div>
                  <div className="col-md-8" align="right" style={{ fontWeight: "bold" }}>

                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <font>Max Speed</font>
                  </div>
                  <div className="col-md-8" align="right">
                    <font>12 Units</font>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-5">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div style={{ fontWeight: "bold" }}>
                  <i className="fa fa-location-arrow" aria-hidden="true" style={{ marginRight: 10 }}></i>
                  <font>Vehicle Usage</font>
                </div>
              </div>
              <div className="panel-body">
                <Doughnut data={this.props.DoughnutData} chartHeight={275} chartWeight={400}></Doughnut>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div style={{ fontWeight: "bold" }}>
                  <i className="fa fa-location-arrow" aria-hidden="true" style={{ marginRight: 10 }}></i>
                  <font> Daily Usage</font>
                </div>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-6">
                    <Dngraph1 chartHeight={275}></Dngraph1>
                  </div>
                  <div className="col-md-6">
                    <Dngraph chartHeight={200}></Dngraph>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div style={{ fontWeight: "bold" }}>
                  <i className="fa fa-envira" aria-hidden="true" style={{ marginRight: 10 }}></i>
                  <font>ECO Driving Summary</font>
                </div>
              </div>
              <div className="panel-body">
                <center>
                  <Safety chartHeight={200} chartWeight={200}></Safety>
                </center>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div style={{ fontWeight: "bold" }}>
                  <i className="fa fa-user-plus" aria-hidden="true" style={{ marginRight: 10 }}></i>
                  <font>Safety Driving Summary</font>
                </div>
              </div>
              <div className="panel-body">
                <center>
                  <Radarbar chartHeight={200} chartWeight={200}></Radarbar>
                </center>

              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div style={{ fontWeight: "bold" }}>
                  <i className="fa fa-balance-scale" aria-hidden="true" style={{ marginRight: 10 }}></i>
                  <font>DLT Standard</font>
                </div>
              </div>
              <div className="panel-body">
                <Barcaom4 data={this.props.DLTstandart} chartHeight={200} chartWeight={700}></Barcaom4>
              </div>
            </div>
          </div>
        </div>
      </div>








    );
  }
}
// export default dashboardreport;
const mapStateToProps = (state) => ({
  DoughnutData: state.dashboard.DoughnutData,
  DLTstandart: state.dashboard.DLTstandart
});

const mapDispatchToProps = (dispatch) => ({
  callRealtimeApi: () => dispatch(DashboardActions.callRealtimeApi()),
  callDltApi: () => dispatch(DashboardActions.callDltApi()),
  callPerDayApi: () => dispatch(DashboardActions.callPerDayApi()),
});


export default connect(mapStateToProps, mapDispatchToProps)(dashboardreport)

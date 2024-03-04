import React from "react";
import DataGrid, { 
    RemoteOperations , 
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
// import $ from "jquery";
import { SelectBox } from 'devextreme-react';
import CustomStore from "devextreme/data/custom_store";
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './table.css';
import { CommonAxisSettingsLabel } from "devextreme-react/chart";
import DatepickerCustom from './datepicker-custom';
import Radarchart from './Radarchart';
import ReportApplicationusage from './ReportApplicationusage';
import ReportDealerhistory from './ReportDealerhistory';
import ReportInput8 from './ReportInput8';
import Reportinventoryvehiclelastengineon from './Reportinventoryvehiclelastengineon';
import Reportinventoryvehiclemovementhistory from'./Reportinventoryvehiclemovementhistory';
import Reportmydriver from './Reportmydriver';
import Reportmydriversummary from './Reportmydriversummary';
import Reportmydrivertripdetail from './Reportmydrivertripdetail';
import Reportmyvehicle from'./Reportmyvehicle';
import Reportmyvehiclesummary from'./Reportmyvehiclesummary-Waittt';
import Reportmyvehicletrip from'./Reportmyvehicletrip';
import Reportpromotion from './Reportpromotion';
import Reportpromotionhistory from './Reportpromotionhistory';
import ReportUtilization from './ReportUtilization';
import Reportvehicleallocationstockaging from './Reportvehicleallocationstockaging';
import Reportvehiclehasenteredandleft from './Reportvehiclehasenteredandleft';
import ReportVehiclelastengine from './ReportVehiclelastengine';
import Reportvehiclepartlifetime from './Reportvehiclepartlifetime';
import Reportvehicleutilization from './Reportvehicleutilization';
import RPMhistogram from './RPMhistogram';
import ScatterGraph from './ScatterGraph';
import Speedhistogram from './Speedhistogram';
import Messagesdelivery from './Messagesdelivery';
import Throttlehistogram from './Throttlehistogram';
import UserAuthentication from './UserAuthentication';
function isNotEmpty(value) {
    return value !== undefined && value !== null && value !== "";
}
function handleErrors(response) {
    if (!response.ok) 
        throw Error(response.statusText);
    return response;
}

class LayoutReport extends React.Component {
    constructor(props){
        super(props)
        this.sizes = [ "กรุณาเลือกหน้า",
        "Messagesdelivery",
        "UserAuthentication",
        "Radarchart", 
        "ReportApplicationusage", 
        "RPMhistogram", 
        "ScatterGraph", 
        "Speedhistogram",
        "ReportDealerhistory",
        "ReportInput8", 
        "Reportinventoryvehiclelastengineon", 
        "Reportinventoryvehiclemovementhistory", 
        "Reportmydriver", 
        "Reportmydriversummary", 
        "Reportmydrivertripdetail",
        "Reportmyvehicle",
        "Reportmyvehiclesummary",
        "Reportmyvehicletrip",
        "Reportpromotion",
        "Reportpromotionhistory",
        "ReportUtilization",
        "Reportvehicleallocationstockaging",
        "Reportvehiclehasenteredandleft",
        "ReportVehiclelastengine",
        "Reportvehiclepartlifetime",
        "Reportvehicleutilization",
        "Throttlehistogram" ]
        this.state = {
            value : this.sizes[0]
        };
        this.onValueChanged = this.onValueChanged.bind(this);

    }

    onValueChanged(e) {
        this.setState({
          value: e.value,
        });
    }
    getContainer() {
        switch (this.state.value) {
          case "Radarchart":
            return (<div><Radarchart></Radarchart></div>);
          case "ReportApplicationusage":
            return (<div><ReportApplicationusage></ReportApplicationusage></div>);
          case "ReportDealerhistory":
            return (<div><ReportDealerhistory></ReportDealerhistory></div>);
          case "ReportInput8":
            return (<div><ReportInput8></ReportInput8></div>);
          case "Reportinventoryvehiclelastengineon":
            return (<div><Reportinventoryvehiclelastengineon></Reportinventoryvehiclelastengineon></div>);
          case "Reportinventoryvehiclemovementhistory":
            return (<div><Reportinventoryvehiclemovementhistory></Reportinventoryvehiclemovementhistory></div>);
          case "Reportmydriver":
            return (<div><Reportmydriver></Reportmydriver></div>);
            case "Reportmydriversummary":
            return (<div><Reportmydriversummary></Reportmydriversummary></div>);
            case "Reportmydrivertripdetail":
            return (<div><Reportmydrivertripdetail></Reportmydrivertripdetail></div>);
            case "Reportmyvehicle":
            return (<div><Reportmyvehicle></Reportmyvehicle></div>);
            case "Reportmyvehiclesummary":
            return (<div><Reportmyvehiclesummary></Reportmyvehiclesummary></div>);
            case "Reportmyvehicletrip":
            return (<div><Reportmyvehicletrip></Reportmyvehicletrip></div>);
            case "Reportpromotion":
            return (<div><Reportpromotion></Reportpromotion></div>);
            case "Reportpromotionhistory":
            return (<div><Reportpromotionhistory></Reportpromotionhistory></div>);
            case "ReportUtilization":
            return (<div><ReportUtilization></ReportUtilization></div>);
            case "Reportvehicleallocationstockaging":
            return (<div><Reportvehicleallocationstockaging></Reportvehicleallocationstockaging></div>);
            case "Reportvehiclehasenteredandleft":
            return (<div><Reportvehiclehasenteredandleft></Reportvehiclehasenteredandleft></div>);
            case "ReportVehiclelastengine":
            return (<div><ReportVehiclelastengine></ReportVehiclelastengine></div>);
            case "Reportvehiclepartlifetime":
            return (<div><Reportvehiclepartlifetime></Reportvehiclepartlifetime></div>);
            case "Reportvehicleutilization":
            return (<div><Reportvehicleutilization></Reportvehicleutilization></div>);
            case "Throttlehistogram":
            return (<div><Throttlehistogram></Throttlehistogram></div>);
            case "RPMhistogram":
            return (<div><RPMhistogram></RPMhistogram></div>);
            case "ScatterGraph":
            return (<div><ScatterGraph></ScatterGraph></div>);
            case "Speedhistogram":
            return (<div><Speedhistogram></Speedhistogram></div>);
            case "Messagesdelivery":
            return (<div><Messagesdelivery></Messagesdelivery></div>);
            case "UserAuthentication":
            return (<div><UserAuthentication></UserAuthentication></div>);          
            default:
            return (<div><h3>กรุณาเลือกหน้าที่คุณต้องการ</h3></div>);
        }
      }
    render() {
        return (
            <div>
              
                <div>
                     Page Layout: {this.state.value} 
                </div>
                <SelectBox
                    items={this.sizes}
                    value={this.state.value}
                    onValueChanged={this.onValueChanged}
                />
                <br></br>
                <br></br>
                {this.getContainer()}

            </div>
        );
        }
    }
export default LayoutReport;
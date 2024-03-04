import React from "react";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './table.css';

import Barcomponent5 from "./Graph/SpeedReportCharts/Barcomponent5";
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
      dataSource: [],
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
  }
  // loadTrigger(){
  //     this.datagrid.current.instance.refresh();
  // }
  // componentDidMount(){
  //     this.readyonload = 1;
  //     this.datagrid.current.instance.refresh();
  // }

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
              <h5>Trip: Speedhistogram</h5>
              <div className="ibox-tools">
              </div>
            </div>
            <div className="ibox-content">
              <br></br>
              <div class="divTable reportdataTable">
                <div class="divTableBody">
                  <div class="divTableRow">
                    <div class="divTableCell">Date:</div>
                    <div class="divTableCell">24-10-201916:03:43-24-10-2019 16:05:19</div>
                    <div class="divTableCell">ODO(km)</div>
                    <div class="divTableCell">72891.7-72891.7</div>
                    <div class="divTableCell">Transit Time</div>
                    <div class="divTableCell">00:00:16</div>
                    <div class="divTableCell">Idling Time</div>
                    <div class="divTableCell">00:00:00</div>
                  </div>
                  <div class="divTableRow">
                    <div class="divTableCell">Driver:</div>
                    <div class="divTableCell">Undefined[Undefined]</div>
                    <div class="divTableCell">Driver Affliation</div>
                    <div class="divTableCell">Undefined</div>
                    <div class="divTableCell">Mileage</div>
                    <div class="divTableCell">0.2</div>
                    <div class="divTableCell">Hours Exceeded Time</div>
                    <div class="divTableCell">00:01:37</div>
                  </div>
                  <div class="divTableRow">
                    <div class="divTableCell">Vehicle:</div>
                    <div class="divTableCell">51-5531(515531]</div>
                    <div class="divTableCell">Vehicle Affiliation</div>
                    <div class="divTableCell">MAIN</div>
                    <div class="divTableCell">Refuel Amount(L)</div>
                    <div class="divTableCell">10</div>
                    <div class="divTableCell">Stop Time Over 30min</div>
                    <div class="divTableCell">00:00:00</div>
                  </div>
                  <div class="divTableRow">
                    <div class="divTableCell">Refueling ODO(km):</div>
                    <div class="divTableCell">72891.7-72891.7</div>
                    <div class="divTableCell">Refueling Mileage(km)</div>
                    <div class="divTableCell">2</div>
                    <div class="divTableCell">&nbsp;</div>
                    <div class="divTableCell">&nbsp;</div>
                    <div class="divTableCell">Fuel Consumption(km/L)</div>
                    <div class="divTableCell">5.3</div>
                  </div>
                  <div class="divTableRow">
                    <div class="divTableCell">Service In Point:</div>
                    <div class="divTableCell">Phra Nakhon Si Ayudhya,Bang Chai,MAI TRA</div>
                    <div class="divTableCell">&nbsp;</div>
                    <div class="divTableCell">&nbsp;</div>
                    <div class="divTableCell">&nbsp;</div>
                    <div class="divTableCell">&nbsp;</div>
                    <div class="divTableCell">&nbsp;</div>
                    <div class="divTableCell">&nbsp;</div>
                  </div>
                  <div class="divTableRow">
                    <div class="divTableCell">Service Out Point:</div>
                    <div class="divTableCell">Phra Nakhon Si Ayudhya,Bang Chai,MAI TRA</div>
                    <div class="divTableCell">&nbsp;</div>
                    <div class="divTableCell">&nbsp;</div>
                    <div class="divTableCell">&nbsp;</div>
                    <div class="divTableCell">&nbsp;</div>
                    <div class="divTableCell">&nbsp;</div>
                    <div class="divTableCell">&nbsp;</div>
                  </div>
                </div>
              </div>
              <br></br>
              <br></br>

              <div className="row">
                <div className="col-md-3">
                  <br></br>
                  <h3 class="text-center">Driving Time : 00:00:20 Time</h3>
                  <h3 class="text-center">Overspeed Threshold : 102 km/h</h3>
                  <div className="speedhistogram"><img src="assets/img/speed2.png" width="70%" height="70%">
                  </img></div>
                </div>
                <div className="col-md-8">
                  <Barcomponent5 className="speedhistogram"></Barcomponent5>

                </div>
              </div>
              <br></br>
              <br></br>
              <div className="row" >
                <div className="col-md-4">
                  <h3 class="text-center">Max Speed = 100 km/h</h3>
                </div>
                <div className="col-md-4">
                  <h3 class="text-center">Over speed count = 1 Time</h3>
                </div>
                <div className="col-md-4">
                  <h3 class="text-center">Over speed time = 1:00:03 Time</h3>
                </div>
              </div>





            </div>
          </div>

        </div>

      </div>



    );
  }
}
export default Table;

import React from "react";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './table.css';
import Spider from './Graph/spiderchart/spider'
import Spider1 from './Graph/spiderchart1/spider1'
// import $ from "jquery";

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
              <h5>Radarcharts</h5>
              <div className="ibox-tools">
              </div>
            </div>
            <div className="ibox-content">
              <h2>Trip: Radar chart</h2>
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
              <div className="row">
                <div className="col-lg-6">
                  <div className="radarchart"><h3>Safety Driving Summary</h3>
                    <Spider style={{ height: 440 }}></Spider>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="radarchart"><h3>Eco Driving Summary</h3>
                    <Spider1 style={{ height: 440 }}></Spider1>

                  </div>
                </div>
              </div>
              <br></br>
              <br></br>
              <div className="row">
                <div className="col-md-6">
                  <div className="divTable greyGridTable">
                    <div className="divTableHeading">
                      <div className="divTableRow">
                        <div className="divTableHead">&nbsp;</div>
                        <div className="divTableHead">Criteria</div>
                        <div className="divTableHead">Score(100)</div>
                        <div className="divTableHead">Comment</div>
                      </div>
                    </div>
                    <div className="divTableBody">
                      <div className="divTableRow">
                        <div className="divTableCell">
                          <p style={{ marginBottom: 0 }}>Driving Time</p>
                        </div>
                        <div className="divTableCell">&nbsp;</div>
                        <div className="divTableCell scorecell">5</div>
                        <div className="divTableCell">
                          <p style={{ marginBottom: 0 }}>Keep a good driving. Be careful on using brake.</p>
                        </div>
                      </div>
                      <div className="divTableRow">
                        <div className="divTableCell">Speed</div>
                        <div className="divTableCell">
                          <p style={{ marginBottom: 0 }}>Over Speed time (%) all driving time (No idling)</p>
                        </div>
                        <div className="divTableCell scorecell">5</div>
                        <div className="divTableCell">Good driving. Keep it this way.</div>
                      </div>
                      <div className="divTableRow">
                        <div className="divTableCell">&nbsp;</div>
                        <div className="divTableCell">Maximum Speed (Km/Hr)</div>
                        <div className="divTableCell scorecell">4</div>
                        <div className="divTableCell">Keep a good driving.</div>
                      </div>
                      <div className="divTableRow">
                        <div className="divTableCell">&nbsp;</div>
                        <div className="divTableCell">RPM time (%)</div>
                        <div className="divTableCell scorecell">5</div>
                        <div className="divTableCell">
                          <p style={{ marginBottom: 0 }}>Keep a good driving. Be careful on using brake.</p>
                        </div>
                      </div>
                      <div className="divTableRow">
                        <div className="divTableCell">&nbsp;</div>
                        <div className="divTableCell scorecell">
                          <p style={{ marginBottom: 0 }}>RPM Count (times/Hr of driving time (No idling))</p>
                        </div>
                        <div className="divTableCell scorecell">5</div>
                        <div className="divTableCell ">
                          <p style={{ marginBottom: 0 }}>Keep a good driving. Be careful on using brake.</p>
                        </div>
                      </div>
                      <div className="divTableRow">
                        <div className="divTableCell">&nbsp;</div>
                        <div className="divTableCell">RPM (% of driving time (No idling))</div>
                        <div className="divTableCell scorecell">4</div>
                        <div className="divTableCell">Good driving. Keep it this way.</div>
                      </div>
                      <div className="divTableRow">
                        <div className="divTableCell">Hash Start</div>
                        <div className="divTableCell">
                          <p style={{ marginBottom: 0 }}>Acceleration Pedal (% of driving time (No idling))</p>
                        </div>
                        <div className="divTableCell scorecell">4</div>
                        <div className="divTableCell">Keep a good driving.</div>
                      </div>
                      <div className="divTableRow">
                        <div className="divTableCell">&nbsp;</div>
                        <div className="divTableCell">
                          <p style={{ marginBottom: 0 }}>Acceleration change (% of driving time (No idling))</p>
                        </div>
                        <div className="divTableCell scorecell">4</div>
                        <div className="divTableCell">Keep a good driving.</div>
                      </div>
                      <div className="divTableRow">
                        <div className="divTableCell">&nbsp;</div>
                        <div className="divTableCell">
                          <p style={{ marginBottom: 0 }}>HASH start (times/Hr of driving time (No idling))</p>
                        </div>
                        <div className="divTableCell scorecell">4</div>
                        <div className="divTableCell">Keep a good driving.</div>
                      </div>
                      <div className="divTableRow">
                        <div className="divTableCell">&nbsp;</div>
                        <div className="divTableCell">
                          <p style={{ marginBottom: 0 }}>HASH start (% of start time)</p>
                        </div>
                        <div className="divTableCell scorecell">4</div>
                        <div className="divTableCell">Keep a good driving.</div>
                      </div>
                      <div className="divTableRow">
                        <div className="divTableCell">&nbsp;</div>
                        <div className="divTableCell">
                          <p style={{ marginBottom: 0 }}>HASH Acceleration (times/Hr)</p>
                        </div>
                        <div className="divTableCell scorecell">4</div>
                        <div className="divTableCell">Keep a good driving.</div>
                      </div>
                      <div className="divTableRow">
                        <div className="divTableCell">&nbsp;</div>
                        <div className="divTableCell">
                          <p style={{ marginBottom: 0 }}>HASH Acceleration (% of acceleration time)</p>
                        </div>
                        <div className="divTableCell scorecell">4</div>
                        <div className="divTableCell">Keep a good driving.</div>
                      </div>
                      <div className="divTableRow">
                        <div className="divTableCell">Hash Break</div>
                        <div className="divTableCell">
                          <p style={{ marginBottom: 0 }}>HARSH break (times/Hr)</p>
                        </div>
                        <div className="divTableCell scorecell">4</div>
                        <div className="divTableCell">Keep a good driving. Be coreful on using brake.</div>
                      </div>
                      <div className="divTableRow">
                        <div className="divTableCell">Seat belt</div>
                        <div className="divTableCell">
                          <p style={{ marginBottom: 0 }}>Seat belt (% of driving time (No idling))</p>
                        </div>
                        <div className="divTableCell scorecell">3</div>
                        <div className="divTableCell">Good driving. Keep it this way.</div>
                      </div>
                      <div className="divTableRow">
                        <div className="divTableCell">Hash Turn</div>
                        <div className="divTableCell">
                          <p style={{ marginBottom: 0 }}>G-sensor detect (% of break time)</p>
                        </div>
                        <div className="divTableCell scorecell">4</div>
                        <div className="divTableCell">Keep a good driving.</div>
                      </div>
                      <div class="divTableRow summary" >
                        <div className="divTableCell">&nbsp;</div>
                        <div className="divTableCell">
                          <p style={{ marginBottom: 0 }}>Safety Driving Score</p>
                        </div>
                        <div className="divTableCell">86.5</div>
                        <div className="divTableCell">Keep a good driving.</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="divTable greyGridTable">
                    <div className="divTableHeading">
                      <div className="divTableRow">
                        <div className="divTableHead">Criteria</div>
                        <div className="divTableHead">Score(100)</div>
                        <div className="divTableHead">Comment</div>
                      </div>
                    </div>
                    <div className="divTableBody">
                      <div className="divTableRow">
                        <div className="divTableCell">
                          <p style={{ marginBottom: 0 }}>Idling (% of engine start until engine stop)</p>
                        </div>
                        <div className="divTableCell scorecell">5</div>
                        <div className="divTableCell">
                          <p style={{ marginBottom: 0 }}>Good driving. Keep it this way.</p>
                        </div>
                      </div>
                      <div className="divTableRow">
                        <div className="divTableCell">
                          <p style={{ marginBottom: 0 }}>Exhaust/Retarder when RPMk900</p>
                        </div>
                        <div className="divTableCell scorecell">4</div>
                        <div className="divTableCell">
                          <p style={{ marginBottom: 0 }}>Keep a good driving.</p>
                        </div>
                      </div>
                      <div className="divTableRow">
                        <div className="divTableCell">
                          <p style={{ marginBottom: 0 }}>{'Average RPM high speed (speed > 61 km/Hr)'}</p>
                        </div>
                        <div className="divTableCell scorecell">4</div>
                        <div className="divTableCell">
                          <p style={{ marginBottom: 0 }}>Keep a good driving.</p>
                        </div>
                      </div>
                      <div className="divTableRow">
                        <div className="divTableCell">
                          <p style={{ marginBottom: 0 }}>{'Average RPM low speed (speed 1 > 60 km/Hr)'}</p>
                        </div>
                        <div className="divTableCell scorecell">4</div>
                        <div className="divTableCell">
                          <p style={{ marginBottom: 0 }}>Keep a good driving. Be careful on using brake.</p>
                        </div>
                      </div>
                      <div className="divTableRow">
                        <div className="divTableCell">
                          <p style={{ marginBottom: 0 }}>Average Shift+Up RPM</p>
                        </div>
                        <div className="divTableCell scorecell">4</div>
                        <div className="divTableCell">
                          <p style={{ marginBottom: 0 }}>Keep a good driving. Be careful on using brake.</p>
                        </div>
                      </div>
                      <div className="divTableRow">
                        <div className="divTableCell">
                          <p style={{ marginBottom: 0 }}>Average Shift+Down RPM</p>
                        </div>
                        <div className="divTableCell scorecell">3</div>
                        <div className="divTableCell">
                          <p style={{ marginBottom: 0 }}>Keep a good driving. Be careful on using brake.</p>
                        </div>
                      </div>
                      <div class="divTableRow summary" >
                        <div className="divTableCell">
                          <p style={{ marginBottom: 0 }}>Eco Driving Score</p>
                        </div>
                        <div className="divTableCell">88</div>
                        <div className="divTableCell">
                          <p style={{ marginBottom: 0 }}>Keep a good driving.</p>
                        </div>
                      </div>
                    </div>
                  </div>
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

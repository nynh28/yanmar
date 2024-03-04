import React, { Component } from 'react';
import "./eco.css";
import $ from 'jquery';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Dngraph1 from './daynightgraph1/dngraph1'
import Stackchart1 from './stackbarchart1/stackbar1'
import Gauge from './gauge/gauge'
import Gauge1 from './gauge1/gauge1'
import Custombar from './custombar/custombar'
import Spider from './spiderchart/spider'
import Spider1 from './spiderchart1/spider1'
import Chartmile from './chartmile/chartmile'
import Chartoil from './chartoil/chartoil'
import Chartidle from './chartidle/chartidle'

export const table1Source = [{
  "Criteria": { "Criteria": ["Driving Time"] },
  "Score": 5,
  "Suggestion": "keep a good driving"
},
{
  "Criteria": "2.Harsh Acceleration",
  "Score": 4,
  "Suggestion": "Good driving. Keep it this way"
}, {
  "Criteria": "3.Max RPM",
  "Score": 3,
  "Suggestion": "keep a good driving"
}, {
  "Criteria": "4.Fuel Usage",
  "Score": 1,
  "Suggestion": "Try to improve the use of brake and speed"
}, {
  "Criteria": "5.Fuel Consumption",
  "Score": 3,
  "Suggestion": "keep a good driving"
}, {
  "Criteria": "6.Harsh Break",
  "Score": 4,
  "Suggestion": "Try to improve the use of brake and speed"
}
];

export const table2Source = [{
  "Driver": "1.Top Speed",
  "Score": 3,
  "Suggestion": "keep a good driving"
},
{
  "Driver": "2.Overspeed",
  "Score": 2,
  "Suggestion": "Good driving. Keep it this way"
}, {
  "Driver": "3.Harsh Break",
  "Score": 1,
  "Suggestion": "Try to improve the use of brake and speed"
}, {
  "Driver": "4.Harsh start",
  "Score": 4,
  "Suggestion": "keep a good driving"
}, {
  "Driver": "5.Driving Time",
  "Score": 3,
  "Suggestion": "keep a good driving"
}, {
  "Driver": "6.Harsh Acceleration",
  "Score": 5,
  "Suggestion": "Try to improve the use of brake and speed"
}
];

class EcoComponent extends Component {
  constructor(props) {
    super(props);
    this.CreatePDFfromHTML = this.CreatePDFfromHTML.bind(this);
  }
  async CreatePDFfromHTML() {
    var HTML_Width = 210;
    var HTML_Height = 297;
    var top_left_margin = 0;
    var PDF_Width = HTML_Width;
    var PDF_Height = HTML_Height;
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;
    var pdf = jsPDF('p', 'mm', 'a4', true);
    for (var i = 0; i < $(".print").length; i++) {
      await html2canvas($(".print")[i], {
        scale: window.devicePixelRatio,
        allowTaint: true,
        taintTest: false
      }).then(function (canvas) {
        var imgData = canvas.toDataURL("image/png", 1.0);
        pdf.addImage(imgData, 'PNG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
        if (i != $(".print").length - 1) {
          pdf.addPage();
        }

        // pdf.addImage(imgData, 'PNG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
      });
    }

    pdf.save("SummaryReport.pdf");
  }
  render() {
    return (

      <div className="Test2">
        <center><button onClick={this.CreatePDFfromHTML}>Export PDF</button></center><br></br>

        {/* <div className="a4-portrait print">
                    <div className="pdf-headline"><h2>Executive Summary</h2></div>
                    <div className="pdf-title-1"><h3>Utilization summary between 1 Jan 2019 - 1 Feb 2019</h3></div>
                    <div className="pdf-title-2"><h2>Total number of Vehicle 79</h2></div>
                        <div className="stackchart"><Stackchart chartwidth={700} chartHeight={220}></Stackchart></div>
                    <div className="pdf-title-3"><h3>Utilization summary between 1 Jan 2019 - 1 Feb 2019</h3></div>
                    <div className="pdf-title-10"><h4>Day time : AM 6:00 ~ PM 5:59           Night time : PM 6:00 ~ AM 5:59</h4></div>
                    <img className="moon" src="assets/img/moon.png"></img>
                    <img className="day" src="assets/img/sun.png"></img>
                    <div className="dngraph"><Dngraph chartwidth={650} chartHeight={300} ></Dngraph></div>
                    <div className="pdf-title-4"><h4>Score summary for drivers between 1 Jan. 2019 - 1 Feb 2019</h4></div> <div className="pdf-title-5"><h4>Score summary for drivers between 1 Jan. 2019 - 1 Feb 2019</h4></div>
                    <div className="pdf-title-6">
                        <div className="pie1"><Piechart chartwidth={250} chartHeight={300}></Piechart></div>
                        <b style={{fontSize:'20px'}}>Safety Driving</b><br></br>
                        * Most of driver should have Safety Score more than 4
                    </div>
                    <div className="pdf-title-7">
                        <div className="pie2"><Piechart1 chartwidth={250} chartHeight={300}></Piechart1></div>
                        <b style={{fontSize:'20px'}}>Echo Driving</b><br></br>
                        * Most of driver should have Eco Score more than 4
                    </div>

                </div> */}

        <div style={{ fontFamily: 'RSU' }} className="a4-portrait-with-start print">
          {/* <div className="pdf-headline"><h2>Vehicle Summary</h2></div>
                    <div className="pdf-headline-con" style={{lineHeight:'15px'}}><b style={{fontSize:'18px'}}>AB-5685 Phetchaburi</b><br></br>Chassic TR-001 63-0076</div>
                    <div className="pdf-title-1"><h3>Operation summary between 1 Jan 2019 - 1 Feb 2019</h3></div>
                        <div className="stackchart2"><Stackchart1 chartwidth={470} chartHeight={200}></Stackchart1></div>
                    <div className="pdf-title-graph-1"><h3>Max Speed & RPM Summary</h3></div>
                       <div className="gauge"><Gauge  chartwidth={300} chartHeight={100}></Gauge></div>
                       <div className="gauge-title-1"><h3>Over Speed Time</h3></div>
                       <div className="gauge-title-3"><h3>0</h3></div>
                       <img className="border2" src="assets/img/broder2.png"></img>
                       <div className="gauge1"><Gauge1  chartwidth={300} chartHeight={100}></Gauge1></div>
                       <div className="gauge-title-2"><h3>Over RPM Time</h3></div>
                       <div className="gauge-title-4"><h3>1</h3></div>
                       <img className="border3" src="assets/img/broder2.png"></img>
                    <div className="pdf-title-3"><h3>Utilization summary between 1 Jan 2019 - 1 Feb 2019</h3></div>
                       <div className="custom"><Custombar  chartwidth={450} chartHeight={300}></Custombar></div>
                    <div className="pdf-title-graph-3"><h3>Vehicle Utilization Summary</h3></div>
                       <img className="truck" src="assets/img/truck-icon-31.png"></img>
                       <div className="doughnut"><Doughnut  chartwidth={250} chartHeight={250}></Doughnut></div>
                    <div className="vehicle-title-1"><h2>Vehicle Fuel Usage</h2></div>
                    <div className="vehicle-title-2"><h2>Vehicle Fuel Consumption</h2></div>
                    <div className="vehicle-title-3"><h2>3349</h2></div>
                    <div className="vehicle-title-4"><h2>5.2</h2></div>
                    <div className="vehicle-title-5"><h2>lite</h2></div>
                    <div className="vehicle-title-6"><h2>lite/Km.</h2></div>
                    <div className="pdf-2-container">
                        Utilization rate for vehicle's Chassic No. TR-001 63-0076 is still lower than the average of utilization rate for all vehicles in Hino's afflilate 40%
                        and low of utilization rate for all vehicles ub the company 30%. This Vehicle  can take more job.
                    </div> */}
          <div className="pdf-headline"><h2>Vehicle Summary</h2></div>
          <div className="pdf-headline-con" style={{ lineHeight: '15px' }}><b style={{ fontSize: '18px' }}>AB-5685 Phetchaburi</b><br></br>Chassic TR-001 63-0076</div>
          <div className="pdf-title-1"><h3>Operation summary between 1 Jan 2019 - 1 Feb 2019</h3></div>
          <div className="stackchart2"><Stackchart1 chartwidth={490} chartHeight={125}></Stackchart1></div>
          {/* <div className="pdf-title-graph-1"><h3>Max Speed & RPM Summary</h3></div> */}
          {/* <div className="custom2" ><Custombar1 chartwidth={250}chartHeight={120}></Custombar1></div> */}
          <div className="gauge"><Gauge chartwidth={300} chartHeight={70}></Gauge>
            <img className="gaugeline" src="assets/img/line7.png"></img>
          </div>
          <div className="gauge-values"><h3>90 Km/Hr</h3></div>
          <div className="gauge-values1"><h3>97 Km/Hr</h3></div>
          <div className="gauge-title-1"><h3>Over Speed Time</h3></div>
          <div className="gauge-title-3"><h3>0</h3></div>
          <img className="border2" src="assets/img/broder2.png"></img>
          <div className="gauge1"><Gauge1 chartwidth={300} chartHeight={70}></Gauge1>
            <img className="gaugeline1" src="assets/img/line6.png"></img>
          </div>
          <div className="gauge-values3"><h3>2250 RPM</h3></div>
          <div className="gauge-values4"><h3>2123 RPM</h3></div>
          <div className="gauge-title-2"><h3>Over RPM Time</h3></div>
          <div className="gauge-title-4"><h3>1</h3></div>
          <img className="border3" src="assets/img/broder2.png"></img>
          <div className="pdf-title-11"><h3>Runing Time summary between 1 Jan 2019 - 1 Feb 2019</h3></div>
          <div className="pdf-title-12"><h4>Day time : AM 6:00 ~ PM 5:59           Night time : PM 6:00 ~ AM 5:59</h4></div>
          <div className="dngraph1"><Dngraph1 chartwidth={450} chartHeight={200} ></Dngraph1></div>
          <div className="pdf-title-13"><h3>Vehicle Fuel Consumption summary between 1 Jan 2019 - 1 Feb 2019</h3></div>
          <div className="custom"><Custombar chartwidth={400} chartHeight={200}></Custombar></div>
          <div className="pdf-title-graph-3"><h3>Driving Distance Summary</h3></div>

          <div className="doughnut"><Chartmile chartwidth={300} chartHeight={110}></Chartmile></div>
          <div className="doughnut-1"><Chartoil chartwidth={300} chartHeight={110}></Chartoil></div>
          <div className="doughnut-2"><Chartidle chartwidth={300} chartHeight={110}></Chartidle></div>
          <div className="vehicle-title-1"><h2>Vehicle Fuel Consumption</h2></div>
          <div className="vehicle-title-2"><h3>Average Fuel Consumption All Vehicle</h3></div>
          <div className="vehicle-title-3"><h2>5.30</h2></div>
          <div className="vehicle-title-4"><h3>5.02</h3></div>
          <div className="vehicle-title-5"><h2>Km./lite</h2></div>
          <div className="vehicle-title-6"><h3>Km./lite</h3></div>
          <div className="vehicle-title-7"><h3>Vehicle Mileages</h3></div>
          <div className="vehicle-title-8"><h3>Average Mileages All Vehicle</h3></div>
          <div className="vehicle-title-9"><h3>17,897</h3></div>
          <div className="vehicle-title-10"><h3>9,105</h3></div>
          <div className="vehicle-title-11"><h3>Km.</h3></div>
          <div className="vehicle-title-12"><h3>Km.</h3></div>
          <div className="vehicle-title-13"><h3>Your Fuel Amount Use</h3></div>
          <div className="vehicle-title-14"><h3>Average Fuel Usage All Vehicle</h3></div>
          <div className="vehicle-title-15"><h3>3,349</h3></div>
          <div className="vehicle-title-16"><h3>1,804</h3></div>
          <div className="vehicle-title-17"><h3>lite</h3></div>
          <div className="vehicle-title-18"><h3>lite</h3></div>
          <div className="vehicle-title-19"><h3>Vehicle Idling Time</h3></div>
          <div className="vehicle-title-20"><h3>Average Idling Time All Vehicle</h3></div>
          <div className="vehicle-title-21"><h3>35:10:02  </h3></div>
          <div className="vehicle-title-22"><h3>29:01:28  </h3></div>
          <div className="vehicle-title-23"><h3>Hr.</h3></div>
          <div className="vehicle-title-24"><h3>Hr.</h3></div>
          <div className="pdf-2-container">
            Operation rate for the​ vehicle's Chassic No. TR-00163-0076 is​ 20% higher than the average of all​ the vehicles in Hino's afflilate and 10% higher than the​ average​ of all​ the vehicles in​ the company.​Keep​ up​ the​ good​ work.
          </div>
        </div>
        <div className="a4-portrait-with-con print">
          <div className="pdf3-headline"><h1>Driving Behavior</h1></div>
          <img className="border" src="assets/img/broder.png"></img>
          <img className="border1" src="assets/img/broder.png"></img>
          <div className="spider"><Spider chartwidth={300} chartHeight={300}></Spider></div>
          <div className="spider1"><Spider1 chartwidth={350} chartHeight={350}></Spider1></div>
          <div className="pdf-title-8"><h3>Safety Driving Summary</h3></div>
          <div className="pdf-title-9"><h3>Eco Driving Summary</h3></div>
          <img className="table-spider" src="assets/img/table.jpg"></img>
          <img className="table-spider-1" src="assets/img/table1.jpg"></img>


          {/* <div class="pdf3-table">
                         <Table></Table>
                     </div> */}
          <div className="pdf-3-container" style={{ fontSize: "23px" }}>
            You are the 2nd driver out of 79 drivers in the company.Your Safety Driving <font style={{ fontSize: "26px" }} color="green"> 84.8 </font> Score.Your Eco Driving  <font style={{ fontSize: "26px" }} color="green"> 83.3 </font> Score.
          </div>
        </div>


      </div>


    );
  }
}

export default EcoComponent;

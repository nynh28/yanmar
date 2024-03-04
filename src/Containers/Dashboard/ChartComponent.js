import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Animation, Chart, Series, Legend, ValueAxis, Title, Pane, Grid, Tooltip, Crosshair, ConstantLine, Label, VisualRange, Size, Point, ScrollBar, ZoomAndPan } from 'devextreme-react/chart';
import dataSource from './data';
import { thisExpression } from '@babel/types';
import Swal from 'sweetalert2'
import Button from 'devextreme-react/button';



class ChartComponent extends React.Component {

  constructor(props) {
    super(props);
    this.chart = React.createRef();
    this.pointHover = this.pointHover.bind(this);
    this.onSeriesClick = this.onSeriesClick.bind(this);
    this.resetZoom = this.resetZoom.bind(this);
    this.zz = 1;

    this.state = {
      dataSource: [],
      visualpoint: { x: this.x, y: 0, z: 0, zzz: 0 }
    };
    this.updatevisualpoint = this.updatevisualpoint.bind(this);
    // this.dataSource = fetch('https://onelink-devexpress-table.natapol.work/getChart')
    //   .then(response => response.json())
    //   .then( (data) =>{
    //     this.setState({dataSource:data})
    //   });
    // //console.log(JSON.stringify(this.dataSource));
  }


  resetZoom() {
    this.chart.current.instance.resetVisualRange();
  }

  updatevisualpoint(e) {
    this.setState({ visualpoint: e.value })
  }

  // componentDidMount(){
  //   //console.log(this.charts);
  // }

  pointHover(e) {
    document.getElementById("max-label").innerHTML = e.target.data.maxT;
    document.getElementById("min-label").innerHTML = e.target.data.minT;
    document.getElementById("month-label").innerHTML = e.target.argument;
    document.getElementById("avg-label").innerHTML = e.target.data.avgT;
    if (e.target._currentStyle == "normal") {
      document.getElementById("max-label").innerHTML = "";
      document.getElementById("min-label").innerHTML = "";
      document.getElementById("month-label").innerHTML = "";
      document.getElementById("avg-label").innerHTML = "";
    }
  }

  onSeriesClick(e) {
    var x = e.target.name;

    Swal.fire(
      x + ' Event',
      'You clicked on chart!',
      'success'

    )
  }

  render() {

    return (
      <div className="card">
        <div className="card-body>">
          <div className="row">
            <div className="col-md-12">
              <div>
                <div className="row">
                  <center>
                    <div className="col-md-3" style={{ fontSize: 22, marginTop: 10 }}>RPM  = <font id="max-label"></font></div>
                    <div className="col-md-3" style={{ fontSize: 22, marginTop: 10 }}>Speed = <font id="min-label"></font></div>
                    <div className="col-md-3" style={{ fontSize: 22, marginTop: 10 }}>AvgSpeed = <font id="avg-label"></font></div>
                    <div className="col-md-3" style={{ fontSize: 22, marginTop: 10 }}>TIME = <font id="month-label"></font></div>
                  </center>
                </div>
                <br></br>
              </div>
              <Button
                id={'reset-zoom'}
                text={'Reset'}
                onClick={this.resetZoom}
                style={{ position: "absolute", right: "10px", top: "70px" }}
              ></Button>
              <Chart
                ref={this.chart}
                onPointHoverChanged={this.pointHover}
                onSeriesClick={this.onSeriesClick}
                //  dataSource= {this.state.dataSource}
                dataSource={dataSource}
                commonSeriesSettings={{ argumentField: 'month' }}
                defaultPane={"bottomPane"}

              >

                <Size
                  height={600}
                >
                </Size>
                <Animation
                  enabled={true}
                />
                <Pane
                  name='topPane'

                />
                <Pane
                  name='toppPane'
                />
                <Pane
                  name='bottomPane'
                />
                <Series
                  pane='topPane'
                  color='#E74C3C '
                  valueField='maxT'
                  name='RPM'
                  type='spline'
                >
                  <Point
                    visible={true}
                    size={0}
                  >
                  </Point>
                </Series>

                <Series
                  pane='toppPane'
                  color='#2ECC71 '
                  valueField='minT'
                  name='Speed'
                  type='spline'

                >
                  <Point
                    visible={true}
                    size={0}>
                  </Point>
                </Series>
                <Series
                  type='bar'
                  color='#3498DB'
                  valueField='avgT'
                  name='Avg Speed'
                />

                <Grid
                  visible={'true'}
                />
                <Title
                  text='Precipitation, mm'
                />

                <ValueAxis
                  pane='bottomPane'
                  title='AvgSpeed'
                  max={100}
                />
                <ValueAxis
                  pane='topPane'
                  title='RPM'
                >
                  <ConstantLine
                    width={1}
                    value={2800}
                    color={'#02D75B'}
                    dashStyle={'dash'}
                  >
                    <Label visible={false}></Label>
                  </ConstantLine>
                </ValueAxis>
                <ValueAxis
                  pane='toppPane'
                  title='Speed'
                  max={100}

                >
                  <ConstantLine
                    width={1}
                    value={100}
                    color={'#FF0000'}
                    dashStyle={'dash'}
                  >
                    <Label visible={false}></Label>
                  </ConstantLine>
                  <VisualRange>
                  </VisualRange>
                </ValueAxis>
                <Grid
                  visible={'true'}
                />

                <Crosshair
                  horizontalLine={false}
                  enabled={true}
                  width={1}
                  color='#95A5A6'
                />
                <ScrollBar visible={true} />
                <ZoomAndPan argumentAxis={'both'}
                  dragToZoom={true} />
                <Legend
                  verticalAlignment='bottom'
                  horizontalAlignment='center'
                />
                <Title
                  text='SpeedReport'
                />
                <Tooltip
                  enabled={true}
                  customizeTooltip={this.customizeTooltip}
                  shared={true}
                />
              </Chart>

            </div>

          </div>
        </div>
      </div>

    );

  }

}

// const mapDispatchToProps = {
//     onExportChartData: exportChartData,
// }

// const mapStateToProps = state => ({
//     searchParams: state.ParamsState.PARAMS,
//     update : state.ParamsState.UPDATE,
//     tabledata : state.ParamsState.TABLESDATA,
//     x : state.ParamsState.CHART_EXPORT_DATA.x ,
//     y : state.ParamsState.CHART_EXPORT_DATA.y ,
//     z : state.ParamsState.CHART_EXPORT_DATA.z ,
//     avg : state.ParamsState.CHART_EXPORT_DATA.avg
// });


export default ChartComponent

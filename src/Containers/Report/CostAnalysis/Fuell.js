import React, { Suspense } from 'react'
// import $ from "jquery";
import { SelectBox } from 'devextreme-react';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '../table.css'
import { connect } from 'react-redux'
import Table from '../../../Components/DataGridView/Table';
import FormSelect from '../../../Components/FormControls/Basic/FormSelect'
import TimePicker from 'react-bootstrap-time-picker';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment'
import { ENDPOINT_BASE_URL } from '../../../Config/app-config';

class Fuel extends React.Component {
  constructor(props) {
    super(props)
    this.tableInitial = this.tableInitial.bind(this)
    this.selectedCallback = this.selectedCallback.bind(this)
    this.state = {
      loading: true,
      data: []
    }
    this.loadvehicle()
  }

  selectedCallback(e) {
    this.selectedRow = e.selectedRowsData;

  }
  tableInitial(datagridinstance) {
    this.datagridinstance = datagridinstance
  }

  async loadvehicle() {
    var api = ENDPOINT_BASE_URL + "fleet/report/driving"
    var object = {
      vid_list: [196309],
      dtstart: "2020-04-28 07:00:00",
      dtstop: "2020-05-05 07:59:59",
      fleet_id: 0,
      cust_id: 1
    }
    var response = await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)

    });
    var responseJson = await response.json();
    //console.log(responseJson);
    this.setState({
      data: responseJson.result[0]
    }, () => {
      this.setState({
        loading: false
      })
    })
    //console.log(this.state.data);
  }
  render() {
    if (this.state.loading == true) {
      return (<div></div>)
    }
    return (

      <Suspense fallback={null}>
        <div>
          <div div style={{ paddingTop: 22, paddingBottom: 40, backgroundColor: 'whitesmoke', marginBottom: 20, marginLeft: -36, marginTop: -30, marginRight: -20 }}>
            <div className="col-md-10">
              <h3 style={{ fontWeight: "bold", fontSize: 18, marginLeft: 22 }}>My Vehicles</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="ibox ">
                <div className="ibox-title" style={{ padding: '15px 20px 10px 15px' }}>
                  <div className="row">
                    <div className="col-lg-4">
                      <h3 style={{ fontSize: 18 }}>My Vehicles</h3>
                    </div>

                  </div>
                </div>
                <div className="ibox-content" style={{ padding: '15px 20px 5px 20px' }}>
                  {this.dealer_mode == true && (
                    <div className="form-group row">
                      <div className="col-lg-6">
                        {/* <FormSelect mode={"single"}  //mode : (single/multiple)
                          value={this.state.selected_dealer}  //single = "key" , multiple = [key]
                          label={"Dealer name"}
                          fontSize={16}
                          list={this.state.dealer.map((element, i) => {
                            //console.log(element)
                            return { key: i, value: element.partner_id, text: ((element.prefix == null) ? '' : element.prefix) + ' ' + ((element.firstname == null) ? '' : element.firstname) + ' ' + ((element.lastname == null) ? '' : element.lastname) + ' ' + ((element.suffix == null) ? '' : element.suffix) }
                          })}
                          placeholder={"Dealer name"}
                          flex={1}
                          onChange={(selected) => {
                            //console.log(selected)
                            this.setState({
                              selected_dealer: selected
                            })
                            this.onDealerChanged(selected)
                          }}>
                        </FormSelect> */}
                      </div>
                      <div className="col-lg-6">
                        {/* <select ref={this.selectedCustomer} className="form-control" value={this.state.selected_customer} onChange={this.onCustomerChanged}>
              <option value={0}>Select Customer</option>
              {this.state.customer.map((element, i) => {
                return (<option key={i} value={element.int_cust_id}>{element.customer_name}</option>)
              })}
            </select> */}
                        {/* <FormSelect mode={"single"}   //mode : (single/multiple)
                          value={this.state.selected_customer}  //single = "key" , multiple = [key]
                          label={"Company name"}
                          list={this.state.customer.map((element, i) => {
                            //console.log(element)
                            return { key: i, value: element.int_cust_id, text: element.customer_name }
                          })}
                          placeholder={"Company name"}
                          flex={1}
                          onChange={(selected) => {
                            //console.log(selected)
                            this.setState({
                              selected_customer: selected
                            })
                            this.onCustomerChanged(selected)
                          }}>
                        </FormSelect> */}
                      </div>
                    </div>
                  )}

                  {this.customer_mode == true && (
                    <div className="form-group row">
                      <div className="col-lg-6">
                        {/* <FormSelect mode={"single"}   //mode : (single/multiple)
                          value={this.state.selected_customer}  //single = "key" , multiple = [key]
                          label={"Company Name"}
                          list={this.state.customer.map((element, i) => {
                            //console.log(element)
                            return { key: i, value: element.int_cust_id, text: element.customer_name }
                          })}
                          placeholder={"Company Name"}
                          flex={1}
                          onChange={(selected) => {
                            //console.log(selected)
                            this.setState({
                              selected_customer: selected
                            })
                            this.onCustomerChanged(selected)
                          }}>
                        </FormSelect> */}
                      </div>
                      <div className="col-lg-6">
                        <label className="col-lg-6 col-form-label">From</label>
                        <label className="col-lg-6 col-form-label">To</label>
                      </div>
                      <div className="col-lg-6">
                        <div className="col-lg-6" >
                          {/* <input ref={this.DateForm} onChange={this.Formdate} className="form-control" type="date"></input> */}
                          <DateRangePicker
                            autoUpdateInput={false}
                            startDate={this.state.dateStart}
                            locale={{ format: "YYYY-MM-DD" }}
                            singleDatePicker
                            onEvent={this.handleDateStartChange}
                          //
                          >
                            <input className="form-control input-sm"
                              type="text"
                              value={moment(this.state.dateStart).format("YYYY-MM-DD")}
                            />
                          </DateRangePicker>
                        </div>
                        <div className="col-lg-6" >
                          <DateRangePicker
                            // autoUpdateInput={false}
                            startDate={this.state.dateEnd}
                            locale={{ format: "YYYY-MM-DD" }}
                            singleDatePicker
                            onEvent={this.handleDateEndChange}
                            // maxDate={moment(this.state.dateStart).add(1, 'month').calendar()}
                            minDate={this.state.dateStart}
                            // maxDate={moment(this.state.dateStart).add(1, 'day')}
                            containerStyles={{ display: 'none' }}
                          >
                            <input className="form-control input-sm"
                              type="text"
                              value={moment(this.state.dateEnd).format("YYYY-MM-DD")}
                            />
                          </DateRangePicker>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="form-group row">
                    <div className="col-lg-6">
                      {/* <select ref={this.selectedFleet} className="form-control" onChange={this.onFleetChanged} value={this.state.selected_fleet} >
            <option value={0}>Select Fleet</option>
            {this.state.fleet.map((element, i) => {
              return (<option key={i} value={element.id}>{element.fleet_name}</option>)
            })}
          </select> */}

                      {/* <FormSelect mode={"single"}   //mode : (single/multiple)
                        value={this.state.selected_fleet}  //single = "key" , multiple = [key]
                        label={" Fleet Name"}
                        list={this.state.fleet.map((element, i) => {
                          //console.log(element)
                          return { key: i, value: element.id, text: element.fleet_name }
                        })}
                        placeholder={"Fleet ame"}
                        flex={1}
                        onChange={(selected) => {
                          //console.log(selected)
                          this.setState({
                            selected_fleet: selected
                          })
                          this.onFleetChanged(selected)
                        }}>
                      </FormSelect> */}
                    </div>

                  </div>
                </div>
                <div style={{ marginTop: 5 }} className="panel">
                  <div className="panel-body">
                    <Table
                      dataSource={this.state.data}
                      mode={"offline"}
                      //serversideSource={'https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders'}
                      table_id={4}
                      user_id={this.props.dataLogin.userId}  //9999 20
                      selectedCallback={this.selectedCallback}
                      initialCallback={this.tableInitial}
                      column={[
                        {
                          column_name: 'fleet_name',
                          column_caption: 'fleet_name Plate  '
                        }
                      ]}
                    >

                    </Table>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div >
      </Suspense>
      // <Chart

      //   dataSource={populationData}
      //   id={'chart'}
      //   size={{
      //     height: this.props.chartHeight,
      //     width: this.props.chartwidth
      //   }}
      //   customizePoint={this.customizePoint}
      //   customizeLabel={this.customizeLabel}

      // >
      //   <Pane name="top" />
      //   <Pane name="bottom" />
      //   <CommonSeriesSettings
      //     type={'bar'}
      //     argumentField={'day'}

      //   />
      //   {/* <CommonAxisSettings>
      //     <Grid visible={true} />
      //   </CommonAxisSettings> */}
      //   {/* {
      //     continentSources.map(function (item) {
      //       return (
      //         <Series
      //           key={item.value}
      //           valueField={item.value}
      //           name={item.name} >
      //           <Label
      //             visible={true}
      //             rotationAngle={270}
      //             verticalOffset={18}
      //             alignment={'center'}
      //             horizontalOffset={0}
      //             backgroundColor={'undefined'}

      //           >
      //             <Font color={'black'} size={12}></Font>
      //           </Label>

      //         </Series>);
      //     })
      //   } */}

      //   <Series
      //     pane="top"
      //     type="line"
      //     valueField="mileages"
      //     name="mileages"
      //     color="#008fd8"
      //     barWidth={5}
      //   >
      //     <Point
      //       visible={true}
      //       size='6' />
      //     <Label
      //       visible={true}
      //       rotationAngle={270}
      //       verticalOffset={18}
      //       alignment={'center'}
      //       horizontalOffset={0}
      //       backgroundColor={'undefined'}

      //     >
      //       <Font color={'black'} size={12}></Font>
      //     </Label>

      //   </Series>

      //   <Series
      //     pane="bottom"
      //     axis="fuel"
      //     type="line"
      //     valueField="fuel"
      //     name="fuel"
      //     color="#133660"

      //   >
      //     <Point
      //       visible={true}
      //       size='6' />
      //     <Label
      //       visible={true}
      //       rotationAngle={270}
      //       verticalOffset={18}
      //       alignment={'center'}
      //       horizontalOffset={0}
      //       backgroundColor={'undefined'}

      //     >
      //       <Font color={'black'} size={12}></Font>
      //     </Label>

      //   </Series>
      //   {/* <Series
      //     valueField={'C'}
      //     name={'Night Time'}
      //     color={'#3F7FBF'}
      //     barWidth={7}

      //   >
      //     <Label
      //       visible={true}
      //       customizeText={this.customizeText}
      //       rotationAngle={270}
      //       verticalOffset={18}
      //       alignment={'center'}
      //       horizontalOffset={0}
      //       backgroundColor={'undefined'}

      //     >
      //       <Font color={'black'} size={12}></Font>

      //     </Label>

      //   </Series> */}
      //   <Tooltip
      //     enabled={true}
      //     customizeTooltip={this.customizeTooltip}
      //   />

      //   <ValueAxis
      //     name="mileages"
      //     position="left"

      //   >
      //     <Label customizeText={this.customizeLabel2} />
      //     <Grid visible={true} />
      //     <ConstantLine
      //       width={0.5}
      //       value={this.state.MAverage}
      //       color={'red'}
      //       dashStyle={'dash'}
      //     >
      //       <Label text={'Average'} horizontalAlignment="right" position={'outside'}>
      //         <Font color={'red'} size={'10'} weight={'500'}></Font>
      //       </Label>
      //     </ConstantLine>
      //   </ValueAxis>


      //   <ValueAxis
      //     name="fuel"
      //     position="left"

      //   >

      //     <Label customizeText={this.customizeLabel3} />
      //     <Grid visible={true} />
      //     <ConstantLine
      //       width={0.5}
      //       value={this.state.FAverage}
      //       color={'red'}
      //       dashStyle={'dash'}

      //     >
      //       <Label text={'Average'} horizontalAlignment="right" position={'outside'}>
      //         <Font color={'red'} size={'10'} weight={'500'}></Font>
      //       </Label>
      //     </ConstantLine>
      //   </ValueAxis>
      //   <Legend visible={false}
      //     verticalAlignment="bottom"
      //     horizontalAlignment="center"></Legend>
      //   <Crosshair enabled={true}>
      //     <HorizontalLine visible={false} />
      //     <Label visible={true} format={crosshairFormat} />
      //   </Crosshair>

      //   <ArgumentAxis
      //     type={'discrete'}
      //     staggeringSpacing={10}
      //     displayMode="stagger">

      //   </ArgumentAxis>
      // </Chart>
    );
  }


  //   customizePoint(e) {


  //   }


  //   customizeTooltip(e) {
  //     //console.log(e.point.data)
  //     var data = e.point.data.mileages / e.point.data.fuel;
  //     var fuelcon = data.toFixed(2)
  //     //console.log(fuelcon)
  //     // return { text: Math.abs(e.valueText) };
  //     return {
  //       text: "Mileages : " + e.point.data.mileages + "<br>Fuel : " + e.point.data.fuel + "<br>Fuel Consumtion : " + fuelcon
  //     };
  //   }

  //   customizeLabel3(e) {
  //     return `${Math.abs(e.value)}`;
  //   }


  //   customizeLabel2(e) {
  //     return `${Math.abs(e.value)}`;
  //   }

  //   // customizePoint(arg) {

  //   //   if (arg.value > this.state.highAverage) {
  //   //     return { color: '#ff7c7c', hoverStyle: { color: '#ff7c7c' } };
  //   //   } else if (arg.value < this.state.lowAverage) {
  //   //     return { color: '#8c8cff', hoverStyle: { color: '#8c8cff' } };
  //   //   }
  //   // }

  //   customizeLabel(arg) {
  //     //console.log(arg)
  //     if (arg.seriesName == "mileages" && arg.value > this.state.MAverage) {
  //       return {
  //         visible: true,
  //         font: {
  //           color: '#c90000',

  //         },
  //         customizeText: function (e) {
  //           return `${e.valueText}`;
  //         }
  //       };
  //     }
  //     if (arg.seriesName == "fuel" && arg.value > this.state.FAverage) {
  //       return {
  //         visible: true,
  //         font: {
  //           color: '#c90000',

  //         },
  //         customizeText: function (e) {
  //           return `${e.valueText}`;
  //         }
  //       };
  //     } else return {
  //       visible: true,
  //       font: {
  //         color: 'green',

  //       },
  //       customizeText: function (e) {
  //         return `${e.valueText}`;
  //       }
  //     };

  //   }



  //   customizeText(pointInfo) {
  //     //console.log(pointInfo)
  //     return `${pointInfo.value}`;
  //   }

}

export default Fuel;

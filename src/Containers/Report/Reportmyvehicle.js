import React, { Suspense } from 'react'
// import $ from "jquery"; 
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './table.css';
import { connect } from 'react-redux'
import Table from '../../Components/DataGridView/TableMyVehicle.js';
import FormSelect from '../../Components/FormControls/Basic/FormSelect'
import moment from 'moment'
import FormDatePicker_dev from '../../Components/FormControls/FormDatepickerNew';
import { t } from '../../Components/Translation';
import { ENDPOINT_BASE_URL, ENDPOINT_SETTING_REPORT_BASE_URL } from '../../Config/app-config';
import Alert from '../../Components/Alert'
class ReportMyvehicle extends React.Component {
  constructor(props) {
    super(props)
    this.selectedDealer = React.createRef();
    this.selectedCustomer = React.createRef();
    this.selectedFleet = React.createRef();

    this.select_report_filter = this.select_report_filter.bind(this)
    this.tableInitial = this.tableInitial.bind(this)
    this.selectedCallback = this.selectedCallback.bind(this)
    this.loadcustomer = this.loadcustomer.bind(this)
    this.loadfleet = this.loadfleet.bind(this);

    this.handleDateStartChange = this.handleDateStartChange.bind(this);
    this.handleTimeStartChange = this.handleTimeStartChange.bind(this);
    this.handleDateEndChange = this.handleDateEndChange.bind(this);
    this.handleTimeEndChange = this.handleTimeEndChange.bind(this);
    const nowDate = new Date((new Date()).setHours(0, 0, 0, 0))
    this.state = {
      isLoading: true,
      dealer: [],
      customer: [],
      fleet: [],
      vehicle: [],
      selected_dealer: 'Please select dealer name',
      selected_customer: t("my_drivers_4"),
      selected_fleet: t("my_drivers_6"),
      selected_vehicle: [],
      timeStart: 0,
      timeEnd: 85500,
      dateStart: nowDate,
      dateEnd: nowDate,
      strDataTime: { start: nowDate, end: (nowDate.getTime() + 85500000) },
      start_date: moment().startOf('month'),
      end_date: moment().subtract(1, 'day'),
      start_date_timestamp: moment().startOf('month').unix(),
      end_date_timestamp: moment().subtract(1, 'day').unix(),
      alertSetting: {
        show: true,
        type: 5
      }

    };
    this.onDealerChanged = this.onDealerChanged.bind(this);
    this.onCustomerChanged = this.onCustomerChanged.bind(this);
    this.onFleetChanged = this.onFleetChanged.bind(this);
    if (this.props.dataLogin.userLevelId > 40) {
      this.customer_mode = true
      this.load_manage_customer()

    } else {
      this.dealer_mode = true
      this.load_manage_dealer()
    }
  }


  async load_manage_dealer() {
    var userId = this.props.dataLogin.userId
    // var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/get_dealer_by_manage"
    var api = ENDPOINT_BASE_URL + "fleet/get_dealer_by_manage"
    var object = {
      userId: userId
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
    responseJson.length > 0 && this.onDealerChanged(responseJson[0].partner_id)
    console.log(responseJson)
    this.setState({
      dealer: responseJson
    }, () => {

    })
  }

  async load_manage_customer() {
    var userId = this.props.dataLogin.userId
    // var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/get_customer_by_manage"
    var api = ENDPOINT_BASE_URL + "fleet/get_customer_by_manage"
    var object = {
      userId: userId
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
    if (responseJson.length > 0) {
      this.onCustomerChanged(responseJson[0].int_cust_id)
      this.setState({
        customer: responseJson
      }, () => {

      })
    }
    else {
      this.setState({ isLoading: false })
    }

  }

  async loadcustomer() {
    var userId = this.props.dataLogin.userId
    var object = {
      userId: userId,
      dealer_id: this.state.selected_dealer
    }

    // var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/get_customer"
    var api = ENDPOINT_BASE_URL + "fleet/get_customer"
    var response = await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)
    });
    var responseJson = await response.json();
    responseJson.length > 0 && this.onCustomerChanged(responseJson[0].int_cust_id)
    console.log(responseJson)
    this.setState({
      customer: responseJson
    }, () => {

    })
  }

  async loadfleet() {
    var userId = this.props.dataLogin.userId
    var object = {
      userId: userId,
      customer_id: this.state.selected_customer
    }
    // var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/getfleet"
    var api = ENDPOINT_BASE_URL + "fleet/getfleet"
    var response = await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)
    });
    var responseJson = await response.json();

    this.setState({
      fleet: responseJson
    }, () => {

    })
  }

  selectedCallback(e) {
    this.selectedRow = e.selectedRowsData;

  }
  tableInitial(datagridinstance) {
    this.datagridinstance = datagridinstance
  }
  onDealerChanged(e) {

    this.setState({
      selected_dealer: e,
      customer: [],
      selected_customer: "Please select company name"
    }, () => {

      this.loadcustomer()
      this.loadvehicle()
    });
  }

  onCustomerChanged(e) {
    this.setState({
      selected_customer: e,
      fleet: [],
      selected_fleet: t("my_drivers_6")
    }, () => {

      this.loadfleet()
      this.loadvehicle()
    });
  }

  onFleetChanged(e) {
    this.setState({
      selected_fleet: e,
    }, () => {
      this.loadvehicle()
    });
  }
  handleDateStartChange(event, picker) {
    let dateStart = moment(picker.startDate)

    let sta = {
      dateStart
    }


    if (!(dateStart.isBefore(this.state.dateEnd))) sta.dateEnd = dateStart
    this.setState(sta);

  }

  handleTimeStartChange(timeStart) {
    this.setState({ timeStart });
  }

  handleDateEndChange(event, picker) {
    let dateEnd = moment(picker.startDate)
    this.setState({ dateEnd });

  }

  handleTimeEndChange(timeEnd) {

    this.setState({ timeEnd });
  }

  async loadvehicle() {

    var userId = this.props.dataLogin.userId
    var dealer_id = this.state.selected_dealer;
    var customer_id = this.state.selected_customer;
    var fleet_id = this.state.selected_fleet;
    var start_date = this.state.start_date_timestamp;
    var end_date = this.state.end_date_timestamp;
    var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/getvehicle/test"
    // var api = ENDPOINT_BASE_URL + "fleet/myvehicle"

    var object = {
      userId: userId,
      dealer_id: (isNaN(dealer_id)) ? null : dealer_id,
      customer_id: (isNaN(customer_id)) ? null : customer_id,
      fleet_id: (isNaN(fleet_id)) ? null : fleet_id,
      start_date: start_date,
      end_date: end_date
    }

    // var object = {
    //   user_id: this.props.dataLogin.userId,
    //   start_date: "2020-07-01",
    //   stop_date: "2020-07-01",
    //   cust_id: 114,
    //   dealer_id: 0,
    //   fleet_id: 0,
    // }


    var response = await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)

    });
    var responseJson = await response.json();

    this.setState({
      vehicle: responseJson,
      isLoading: false
    })
    // if (responseJson.fleet.length > 0) {
    //   this.setState({
    //     vehicle: responseJson.vehicle,
    //     fleet: responseJson.fleet
    //   })
    // } else {
    //   this.setState({
    //     vehicle: responseJson.vehicle,
    //   })
    // }

  }
  select_report_filter(key) {
    this.state.new_report.forEach((element, i) => {
      element.items.forEach((subelement, i) => {

        if (key == subelement.key) {

          return (<span>{subelement.value}</span>)
        }
      })
    })
  }

  onApplyEvent(dataObject) {

    this.setState({
      start_date: dataObject.startDate.format('YYYY/MM/DD'),
      end_date: dataObject.endDate.format('YYYY/MM/DD'),
      start_date_timestamp: dataObject.startDate.unix(),
      end_date_timestamp: dataObject.endDate.unix()
    }, () => {
      this.loadvehicle()
    })
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    // var column = [
    //   {
    //     column_name: 'license_plate_no',
    //     column_caption: 'ป้ายทะเบียน'
    //   },
    //   {
    //     column_name: 'vin_no',
    //     column_caption: 'หมายเลขรถ'
    //   }
    // ]
    let { alertSetting } = this.state
    if (this.state.isLoading == true) {
      return (
        <Alert
          setting={alertSetting}
          onConfirm={() => { }}
          onCancel={() => {
            alertSetting.show = false
            this.setState({ alertSetting })
          }}
        />
      )
    }
    else
      return (
        <Suspense fallback={null}>
          <div>
            <div className="row">
              <div className="col-lg-12">
                <div className="ibox" style={{ marginBottom: 0 }}>
                  <div className="ibox-title" style={{ padding: '15px 20px 10px 15px' }}>
                    <div className="row">
                      <div className="col-lg-4">
                        <h3 style={{ fontSize: 18 }}>{t("my_vehicles_1")}</h3>
                      </div>

                    </div>
                  </div>
                  <div className="ibox-content" style={{ padding: '15px 20px 5px 20px' }}>
                    {this.dealer_mode == true && (
                      <div>
                        <div className="form-group row">
                          <div className="col-lg-6">
                            <FormSelect mode={"single"}  //mode : (single/multiple)
                              value={this.state.selected_dealer}  //single = "key" , multiple = [key]
                              label={"Dealer name"}
                              fontSize={16}
                              list={this.state.dealer.map((element, i) => {

                                return { key: i, value: element.partner_id, text: ((element.prefix == null) ? '' : element.prefix) + ' ' + ((element.firstname == null) ? '' : element.firstname) + ' ' + ((element.lastname == null) ? '' : element.lastname) + ' ' + ((element.suffix == null) ? '' : element.suffix) }
                              })}
                              placeholder={"Dealer name"}
                              flex={1}
                              onChange={(selected) => {

                                this.setState({
                                  selected_dealer: selected
                                })
                                this.onDealerChanged(selected)
                              }}>
                            </FormSelect>
                          </div>
                          <div className="col-lg-6">
                            <FormSelect mode={"single"}   //mode : (single/multiple)
                              value={this.state.selected_customer}  //single = "key" , multiple = [key]
                              label={"my_drivers_3"}
                              list={this.state.customer.map((element, i) => {

                                return { key: i, value: element.partner_id, text: element.prefix + " " + ((element.firstname == null) ? '' : element.firstname) + " " + ((element.lastname == null) ? '' : element.lastname) + "  " + ((element.suffix == null ? '' : element.suffix)) }
                              })}
                              placeholder={"Company name"}
                              flex={1}
                              onChange={(selected) => {

                                this.setState({
                                  selected_customer: selected
                                })
                                this.onCustomerChanged(selected)
                              }}>
                            </FormSelect>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-lg-6">
                            <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
                              <label className="control-label" style={{ fontWeight: 500 }}>
                                {t('date_Range')} :
                              </label>
                              <FormDatePicker_dev select_change={this.onApplyEvent.bind(this)}>
                              </FormDatePicker_dev>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <FormSelect mode={"single"}   //mode : (single/multiple)
                              value={this.state.selected_fleet}  //single = "key" , multiple = [key]
                              label={"my_drivers_5"}
                              list={this.state.fleet.map((element, i) => {

                                return { key: i, value: element.id, text: element.fleet_name }
                              })}
                              placeholder={"Fleet ame"}
                              flex={1}
                              onChange={(selected) => {

                                this.setState({
                                  selected_fleet: selected
                                })
                                this.onFleetChanged(selected)
                              }}>
                            </FormSelect>
                          </div>
                        </div>
                      </div>
                    )}

                    {this.customer_mode == true && (
                      <div>
                        <div className="form-group row" style={{ marginBottom: 4 }}>
                          <div className="col-lg-6">
                            <FormSelect mode={"single"}   //mode : (single/multiple)
                              value={this.state.selected_customer}  //single = "key" , multiple = [key]
                              label={"my_drivers_3"}
                              list={this.state.customer.map((element, i) => {

                                return { key: i, value: element.int_cust_id, text: element.customer_name }
                              })}
                              placeholder={"Company Name"}
                              flex={1}
                              onChange={(selected) => {

                                this.setState({
                                  selected_customer: selected
                                })
                                this.onCustomerChanged(selected)
                              }}>
                            </FormSelect>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
                              <label className="control-label" style={{ fontWeight: 500 }}>
                                {t('date_Range')} :
                              </label>
                              <FormDatePicker_dev select_change={this.onApplyEvent.bind(this)}>
                              </FormDatePicker_dev>
                            </div>
                          </div>
                          {/* <div className="col-lg-6">
                          <label className="col-lg-6 col-form-label">{t("date_Range")}</label>
                        </div>
                        <div className="col-lg-6">
                          <div className="col-lg-12" >
                            <FormDatePicker_dev select_change={this.onApplyEvent.bind(this)}>
                            </FormDatePicker_dev>
                          </div>
                        </div> */}
                        </div>
                        <div className="form-group row">
                          <div className="col-lg-6">
                            <FormSelect mode={"single"}   //mode : (single/multiple)
                              value={this.state.selected_fleet}  //single = "key" , multiple = [key]
                              label={"my_drivers_5"}
                              list={this.state.fleet.map((element, i) => {

                                return { key: i, value: element.id, text: element.fleet_name }
                              })}
                              placeholder={"Fleet ame"}
                              flex={1}
                              onChange={(selected) => {

                                this.setState({
                                  selected_fleet: selected
                                })
                                this.onFleetChanged(selected)
                              }}>
                            </FormSelect>
                          </div>
                        </div>
                      </div>
                    )}


                  </div>
                </div>
                <div style={{ marginTop: 6 }} className="panel">
                  <div className="panel-body">
                    <Table
                      dataSource={this.state.vehicle}
                      mode={"offline"}
                      //serversideSource={'https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders'}
                      table_id={4}
                      user_id={this.props.dataLogin.userId} //9999 20
                      selectedCallback={this.selectedCallback}
                      initialCallback={this.tableInitial}
                      column={[
                        // {
                        //   column_name: 'id',
                        //   column_caption: 'ID'
                        // },
                        // {
                        //   column_name: 'Vehicle Name',
                        //   column_caption: "my_vehicles_10"
                        // },
                        // {
                        //   column_name: 'int_vehicle_id',
                        //   column_caption: "my_vehicles_11"
                        // },
                        {
                          column_name: 'license_plate_no',
                          column_caption: "my_vehicles_11"
                        },
                        {
                          column_name: 'vin_no',
                          column_caption: "my_vehicles_12"
                        },
                        {
                          column_name: 'model_code',
                          column_caption: "my_vehicles_13",
                        },
                        {
                          column_name: 'mileage',
                          column_caption: "my_vehicles_14",
                          column_render: (data) => {
                            if (data.value == "N/A" || data.value == null) {
                              return (<div>{data.value}</div>)
                            }
                            return (<div>{Number(data.value).toFixed(1).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>)
                          }
                        },
                        {
                          column_name: 'driven',
                          column_caption: "my_vehicles_87",
                          column_render: (data) => {
                            if (data.value == "N/A" || data.value == null) {
                              return (<div>{data.value}</div>)
                            }
                            return (<div>{Number(data.value).toFixed(1).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>)
                          }
                        },

                        // {
                        //   column_name: 'Ignition_ON_Count',
                        //   column_caption: "my_vehicles_16"
                        // },

                        // {
                        //   column_name: 'Ignition_ON_Count',
                        //   column_caption: "my_vehicles_16"
                        // },
                        {
                          column_name: 'engine_hour',
                          column_caption: "my_vehicles_17",
                          column_render: (data) => {
                            if (data.value == "N/A" || data.value == null) {
                              return (<div>{data.value}</div>)
                            }
                            var num = data.value;
                            var hours = (num / 60);
                            var rhours = Math.floor(hours);
                            var minutes = (hours - rhours) * 60;
                            var rminutes = Math.round(minutes) + "";
                            if (rminutes.length == 1) {
                              rminutes = '0' + rminutes
                            }
                            var content = rhours
                            //  + "." + rminutes + "";

                            return (<div>{this.numberWithCommas(content.toFixed(0))}</div>)
                          }

                        },
                        {
                          column_name: 'idling',
                          column_caption: "my_vehicles_18",
                          column_render: (data) => {
                            if (data.value == "N/A" || data.value == null) {
                              return (<div>{data.value}</div>)
                            }
                            return (<div> {this.numberWithCommas(data.value.toFixed(0))} </div>)
                          }
                        },
                        {
                          column_name: 'next_maintenance',
                          column_caption: "my_vehicles_19",
                          column_render: (data) => {
                            if (data.value == "N/A" || data.value == null) {
                              return (<div>{data.value}</div>)
                            }
                            return (<div>{data.value.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>)
                          }
                        },
                        {
                          column_name: 'maintenance_status',
                          column_caption: "my_vehicles_20",

                        },
                        {
                          column_name: 'fuel_tank',
                          column_caption: "my_vehicles_21",
                          column_render: (data) => {
                            if (data.value == "N/A" || data.value == null) {
                              return (<div>{data.value}</div>)
                            }
                            return (<div>{data.value}</div>)
                          }
                        },
                        {
                          column_name: 'fuel_usage',
                          column_caption: "my_vehicles_22",
                          column_render: (data) => {
                            if (data.value == "N/A" || data.value == null) {
                              return (<div>{data.value}</div>)
                            }
                            return (<div>{data.value.toFixed(1).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>)
                          }
                        },
                        {
                          column_name: 'fuel_consumption',
                          column_caption: "my_vehicles_23",
                          column_render: (data) => {
                            if (data.value == "N/A" || data.value == null) {
                              return (<div>{data.value}</div>)
                            }
                            return (<div>{data.value.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>)
                          }
                        },
                        {
                          column_name: 'Sharp_Fuel_Drop',
                          column_caption: "my_vehicles_24",
                          visible: false
                        },
                        {
                          column_name: 'max_speed',
                          column_caption: "my_vehicles_26",
                          column_render: (data) => {

                            if (data.value == "N/A" || data.value == null) {
                              return (<div>{data.value}</div>)
                            }
                            return (<div>{data.value.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>)
                          }
                        },
                        {
                          column_name: 'E/G_Check_Lamp',
                          column_caption: "my_vehicles_27",
                          visible: false
                        },
                        {
                          column_name: 'E/G_Check_Lamp_History',
                          column_caption: "my_vehicles_28",
                          visible: false
                        },
                        {
                          column_name: 'battery_voltage',
                          column_caption: "my_vehicles_29"
                        },
                        {
                          column_name: 'safety_score',
                          column_caption: "my_vehicles_31",
                          column_render: (data) => {
                            if (data.value == "N/A" || data.value == null) {
                              return (<div>{data.value}</div>)
                            }
                            return (<div>{data.value.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>)
                          }
                        },

                        {
                          column_name: 'eco_score',
                          column_caption: "my_vehicles_30",
                          column_render: (data) => {
                            if (data.value == "N/A" || data.value == null) {
                              return (<div>{data.value}</div>)
                            }
                            return (<div>{data.value.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>)
                          }
                        },

                        {
                          column_name: 'total_score',
                          column_caption: "my_vehicles_32",
                          column_render: (data) => {
                            if (data.value == "N/A" || data.value == null) {
                              return (<div>{data.value}</div>)
                            }
                            return (<div>{data.value}</div>)
                          }

                        },
                        {
                          column_name: 'coolant_temp',
                          column_caption: "my_vehicles_33",
                          visible: false
                        },
                        {
                          column_name: 'over_coolant_temp',
                          column_caption: "my_vehicles_34",
                          visible: false
                        },
                        {
                          column_name: 'dlt_over4',
                          column_caption: "my_vehicles_38"
                        },
                        {
                          column_name: 'dlt_over8',
                          column_caption: "my_vehicles_39"
                        },
                        {
                          column_name: 'dlt_overspeed',
                          column_caption: "my_vehicles_40"
                        },
                        {
                          column_name: 'dlt_not_swipe_card',
                          column_caption: "my_vehicles_41"
                        },
                        {
                          column_name: 'dlt_unplug',
                          column_caption: "my_vehicles_42"
                        },
                        {
                          column_name: 'speed_over_60',
                          column_caption: "my_vehicles_43"
                        },
                        {
                          column_name: 'speed_over_80',
                          column_caption: "my_vehicles_44"
                        },
                        {
                          column_name: 'speed_over_100',
                          column_caption: "my_vehicles_45"
                        },
                        {
                          column_name: 'speed_over_120',
                          column_caption: "my_vehicles_46"
                        },
                        {
                          column_name: 'over_rpm_count',
                          column_caption: "my_vehicles_89",
                          column_render: (data) => {
                            if (data.value == "N/A" || data.value == null) {
                              return (<div>{data.value}</div>)
                            }

                            return (<div>{data.value.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>)
                          }
                        },
                        {
                          column_name: 'over_rpm',
                          column_caption: "my_vehicles_47",
                          column_render: (data) => {
                            if (data.value == "N/A" || data.value == null) {
                              return (<div>{data.value}</div>)
                            }
                            var num = data.value;
                            var hours = (num / 60);
                            var rhours = Math.floor(hours);
                            var minutes = (hours - rhours) * 60;
                            var rminutes = Math.round(minutes);
                            return (<div>{rhours.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "." + rminutes}</div>)
                          }
                        },
                        {
                          column_name: 'harsh_start',
                          column_caption: "my_vehicles_48"
                        }, {
                          column_name: 'harsh_acceleration',
                          column_caption: "my_vehicles_49"
                        }, {
                          column_name: 'harsh_break',
                          column_caption: "my_vehicles_50",
                          column_render: (data) => {
                            if (data.value == "N/A" || data.value == null) {
                              return (<div>{data.value}</div>)
                            }
                            return (<div>{data.value.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>)
                          }
                        },
                        {
                          column_name: 'sharp_turn',
                          column_caption: "my_vehicles_51",
                          visible: false
                        },
                        {
                          column_name: 'Tire_Status',
                          column_caption: "my_vehicles_52",
                          visible: false
                        }, {
                          column_name: 'co2',
                          column_caption: "my_vehicles_53",
                          column_render: (data) => {
                            if (data.value == "N/A" || data.value == null) {
                              return (<div>{data.value}</div>)
                            }
                            return (<div>{data.value.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>)
                          }
                        },
                        {
                          column_name: 'co2_efficiency',
                          column_caption: "my_vehicles_54",
                          column_render: (data) => {
                            if (data.value == "N/A" || data.value == null) {
                              return (<div>{data.value}</div>)
                            }
                            return (<div>{data.value.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>)
                          }
                        },

                      ]}
                    >

                    </Table>
                  </div>

                </div>

              </div>
            </div>

          </div >
        </Suspense >
      );
  }
}

const mapStateToProps = (state) => {
  return {
    // request_signin: state.auth.request_signin,
    dataLogin: state.signin.dataLogin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // signin: (email, password) => dispatch(AuthActions.signin(email, password)),
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(ReportMyvehicle))

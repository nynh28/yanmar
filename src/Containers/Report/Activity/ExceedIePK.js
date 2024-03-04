import React, { Suspense } from 'react'
// import $ from "jquery";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '../table.css'
import { connect } from 'react-redux'
import Table from '../../../Components/DataGridView/Table_Report';
import moment from 'moment'
import { ENDPOINT_BASE_URL, ENDPOINT_SETTING_REPORT_BASE_URL } from '../../../Config/app-config';
import Alert from '../../../Components/Alert'
class ExceedIePK extends React.Component {
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
      alertSetting: {
        show: true,
        type: 5
      },
      dealer: [],
      customer: [],
      fleet: [],
      data: [],
      selected_dealer: 'please select dealer name',
      selected_customer: 'please select company name',
      selected_fleet: 'please select fleet name',
      selected_vehicle: [],
      timeStart: 0,
      timeEnd: 85500,
      dateStart: nowDate,
      dateEnd: nowDate,
      strDataTime: { start: nowDate, end: (nowDate.getTime() + 85500000) },
      editing: {
        enabled: true,
        allowUpdating: true,
        allowDeleting: true
      },
      none_edit: { enabled: false }
      ,
      column: [
        {
          column_name: 'fleet_name',
          column_caption: 'Fleet Name'
        },

        {
          column_name: 'licenseplate',
          column_caption: 'License Plate'
        },
        // {
        //   column_name: 'overtime',
        //   column_caption: 'Over Time'
        // },
        {
          column_name: 'vehicle_name',
          column_caption: 'Vehicle Name'
        },
        {
          column_name: 'overtime',
          column_caption: 'Over Time'
        },
        {
          column_name: 'total_time',
          column_caption: 'Total Time'
        },
        // {
        //   column_name: 'total_distance',
        //   column_caption: 'Total Distance'
        // },

        // {
        //   column_name: 'speed_max',
        //   column_caption: 'Speed Max'
        // },
        // {
        //   column_name: 'speed_min',
        //   column_caption: 'Speed Min'
        // },
        // {
        //   column_name: 'speed_avg',
        //   column_caption: 'Speed Avg'
        // },
        // {
        //   column_name: 'speed_limit',
        //   column_caption: 'Speed Limit'
        // },
        // {
        //   column_name: 'fuel_cons',
        //   column_caption: 'Fuel Consumption'
        // },
        // {
        //   column_name: 'fuel_used',
        //   column_caption: 'Fuel Usege'
        // },

        // {
        //   column_name: 'count',
        //   column_caption: 'Count'
        // }
      ],
      columndetail: [
        // {
        //   column_name: 'vid',
        //   column_caption: 'Vid'
        // },

        {
          column_name: 'dtstart',
          column_caption: 'Ign. On'
        },
        {
          column_name: 'dtstop',
          column_caption: 'Ign. Off'
        },
        {
          column_name: 'location',
          column_caption: 'location'
        },
        {
          column_name: 'total_time',
          column_caption: 'Total Time'
        },
        // {
        //   column_name: 'start_gis_id',
        //   column_caption: 'Start Gis Id'
        // },
        // ,
        // {
        //   column_name: 'stop_gis_id',
        //   column_caption: 'Stop Gis Id'
        // },
        ,
        // {
        //   column_name: 'start_mileage',
        //   column_caption: 'Start Mileage'
        // },
        // {
        //   column_name: 'stop_mileage',
        //   column_caption: 'Stop Mileage'
        // },
        // {
        //   column_name: 'start_fuel_cons',
        //   column_caption: 'Start Fuel Cons'
        // },
        // {
        //   column_name: 'stop_fuel_cons',
        //   column_caption: 'Stop Fuel Cons'
        // },
        // {
        //   column_name: 'total_distance',
        //   column_caption: 'Total Distance'
        // },

        // {
        //   column_name: 'speed_max',
        //   column_caption: 'Speed Max'
        // },
        // {
        //   column_name: 'speed_min',
        //   column_caption: 'Speed Min'
        // },
        // {
        //   column_name: 'speed_avg',
        //   column_caption: 'Speed Avg'
        // },
        // {
        //   column_name: 'speed_limit',
        //   column_caption: 'Speed Limit'
        // },
        // {
        //   column_name: 'fuel_used',
        //   column_caption: 'Fuel Consumption'
        // },
      ],
      default_column: [],
      default_editing: {}
    };
    this.loaddata()
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
    this.setState({
      dealer: responseJson
    }, () => {

    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.isLoading != true) {
      //console.log(nextProps)
      this.setState({
        isLoading: true,
        default_column: this.state.column,
        default_editing: this.state.editing
      }, () => {
        this.loaddata()
      })
    }


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
    this.setState({
      customer: responseJson
    }, () => {

    })
  }

  async loadcustomer() {
    var userId = this.props.dataLogin.userId
    var object = {
      userId: userId,
      dealer_id: this.state.selected_dealer
    }
    //console.log(object);
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
    //console.log(responseJson);
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
    //console.log(responseJson);
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
    //console.log(e)
    this.setState({
      selected_dealer: e,
      customer: [],
      selected_customer: 'please select company name'
    }, () => {
      this.loadcustomer()
      this.loadvehicle()
    });
  }

  onCustomerChanged(e) {
    this.setState({
      selected_customer: e,
      fleet: [],
      selected_fleet: 'please select fleet name'
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
    //console.log(timeEnd)
    this.setState({ timeEnd });
  }














  async loaddata() {
    var cust_id = 0
    var start_date = this.props.startDate
    var start_date_y = start_date.split('/')[0]
    var start_date_m = start_date.split('/')[1]
    var start_date_d = start_date.split('/')[2]
    var start_date_dmy = start_date_y + '-' + start_date_m + '-' + start_date_d
    var end_date = this.props.endDate
    var end_date_y = end_date.split('/')[0]
    var end_date_m = end_date.split('/')[1]
    var end_date_d = end_date.split('/')[2]
    var end_date_dmy = end_date_y + '-' + end_date_m + '-' + end_date_d
    this.props.customer_data.forEach((element) => {
      cust_id = element.int_cust_id
    })

    //console.log(cust_id)
    var api = ENDPOINT_BASE_URL + "fleet/report/overparking"
    var object = {
      vid_list: this.props.data,
      dtstart: "2020-04-28 07:00:00",
      dtstop: "2020-05-05 07:59:59",
      fleet_id: 0,
      cust_id: cust_id,
      overtime: 0
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
      default_column: this.state.column,
      data: responseJson.result,
      default_editing: this.state.editing
    }, () => {
      this.setState({
        isLoading: false
      })
    })
    //console.log(this.state.vehicle);
  }
  select_report_filter(key) {
    this.state.new_report.forEach((element, i) => {
      element.items.forEach((subelement, i) => {
        //console.log(key == subelement.key);
        if (key == subelement.key) {
          //console.log('wow')
          return (<span>{subelement.value}</span>)
        }
      })
    })
  }

  async loaddatadetail(id) {
    var api = ENDPOINT_BASE_URL + "fleet/report/overparking/" + id
    var start_date = this.props.startDate
    var start_date_y = start_date.split('/')[0]
    var start_date_m = start_date.split('/')[1]
    var start_date_d = start_date.split('/')[2]
    var start_date_dmy = start_date_y + '-' + start_date_m + '-' + start_date_d
    var end_date = this.props.endDate
    var end_date_y = end_date.split('/')[0]
    var end_date_m = end_date.split('/')[1]
    var end_date_d = end_date.split('/')[2]
    var end_date_dmy = end_date_y + '-' + end_date_m + '-' + end_date_d
    var object = {
      dtstart: start_date_dmy + " 00:00:00",
      dtstop: end_date_dmy + " 23:59:00",
      overtime: 0
    }
    // var object = {
    //   dtstart: "2020-04-28 07:00:00",
    //   dtstop: "2020-05-05 07:59:59",
    //   overtime: 0
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
    //console.log(responseJson);
    this.setState({
      data: responseJson.result
    }, () => {
      this.setState({
        isLoading: false,
        default_column: this.state.columndetail,
        default_editing: this.state.none_edit
      })
    })
    //console.log(this.state.vehicle);
  }


  editCallback(e) {

    //console.log(e.row.data.vid)
    this.setState({
      isLoading: true
    }, () => {
      this.loaddatadetail(e.row.data.vid)
      this.props.ReportCallBack('Detail')
    })
  }
  render() {
    let { fitObjectEnabled, GeofencesEnabled, objectEnabled, clusterEnabled, infoWindowEnabled, arrImg, arrImgActive, alertSetting } = this.state
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
      return (
        <Suspense fallback={null}>
          <div>

            <div className="row">
              <div className="col-lg-12">
                <div className="ibox ">


                  <div className="ibox-content">

                    <Table
                      dataSource={this.state.data}
                      mode={"offline"}
                      table_id={4}
                      user_id={this.props.dataLogin.userId} //9999 20

                      selectedCallback={this.selectedCallback}
                      initialCallback={this.tableInitial}
                      deleteCallback={(e) => this.deleteCallback(e)}
                      editCallback={(e) => this.editCallback(e)}
                      editing={this.state.default_editing}
                      column={this.state.default_column}
                    >

                    </Table>
                  </div>
                </div>


              </div>
            </div>

          </div >
        </Suspense>
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

export default (connect(mapStateToProps, mapDispatchToProps)(ExceedIePK))

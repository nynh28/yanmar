import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import MyDriverActions from '../../Redux/MyDriversRedux'
import { Row, Col } from 'reactstrap'
import PannelBox from '../../Components/PannelBox'
import FormSelect from '../../Components/FormControls/Basic/FormSelect'
import FormDatepickerNew from '../../Components/FormControls/FormDatepickerNew';
import DataTable from './DataTable'
import Alert from '../../Components/Alert'
import moment from 'moment';
import { get, isEmpty } from 'lodash'
import { t } from "../../Components/Translation";
import { ENDPOINT_BASE_URL, ENDPOINT_HINO_API_URL } from '../../Config/app-config';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';

export const dataStore = new ArrayStore({ key: 'id', data: [] });
var dataSource

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//#region Commponent Control

const DropdownDealer = (arg) => {
  return (<Col lg={6}>
    <FormSelect
      mode={"multiple"}
      value={arg.selected.length == 0 ? [] : arg.selected}
      label={"my_vehicles_71"}
      list={arg.data.map((element, i) => {
        return { key: i, value: element.partner_id, text: ((element.prefix == null) ? '' : element.prefix) + ' ' + ((element.firstname == null) ? '' : element.firstname) + ' ' + ((element.lastname == null) ? '' : element.lastname) + ' ' + ((element.suffix == null) ? '' : element.suffix) }
      })}
      placeholder={"Dealer Name"}
      flex={1}
      onChange={(selected) => {
        if (!isEmpty(selected)) arg.onChange(selected)
      }}
    />
  </Col>
  )
}

const DropdownCustomer = (arg) => {
  return (<Col lg={6}>
    <FormSelect
      mode={arg.isDealer ? "multiple" : "single"}
      // mode={"single"}
      value={arg.selected.length == 0 ? [] : arg.selected}
      label={"my_drivers_2"}
      list={arg.data.map((element, i) => {
        if (arg.isCustomer)
          return { key: i, value: element.int_cust_id, text: element.customer_name }
        else if ([0].includes(element.partner_id))
          return { key: i, value: element.partner_id, text: element.firstname }
        else
          return { key: i, value: element.partner_id, text: element.prefix + " " + ((element.firstname == null) ? '' : element.firstname) + " " + ((element.lastname == null) ? '' : element.lastname) + "  " + ((element.suffix == null ? '' : element.suffix)) }
      })}
      placeholder={"my_drivers_4"}
      flex={1}
      onChange={(selected) => {
        if (arg.isDealer) {
          var lastItem = selected[selected.length - 1];
          let select = selected

          if ([0].includes(lastItem)) {
            select = lastItem
          }
          else {
            let idx = select.findIndex((id) => id === 0)

            if (idx > -1) {
              const index = select.indexOf(select[idx]);
              if (index > -1) {
                select.splice(index, 1);
              }
            }
          }

          if (!isEmpty(selected)) arg.onChange(select)
        }
        else {
          if (selected !== undefined) arg.onChange(selected)
        }
      }}
    />
  </Col>
  )
}

const DateRangePicker = (arg) => {
  return (<Col lg={6}>
    <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
      <label className="control-label" style={{ fontWeight: 500 }}>
        {t('date_Range')} :
      </label>
      <FormDatepickerNew
        select_change={arg.select_change}
        language={arg.language}
        startDate={arg.startDate}
        endDate={arg.endDate}
        maxDate={arg.eDate}>
      </FormDatepickerNew>
    </div>
  </Col>
  )
}

//#endregion

class MyDrivers extends Component {
  constructor(props) {
    super(props)
    this.state = { isFirstLoading: true }
    this.fleet_mode = false
    this.customer_mode = false
    this.dealer_mode = false
    this.hino_mode = false
    this.isFirstLoad = true
    this.isFirstLoad2 = true
    this.selectCustomer = []
    this.selectDealer = []
    // this.selectFleet = []
    this.startDate = ""
    this.stopDate = ""
    dataSource = new DataSource({
      store: dataStore,
      reshapeOnPush: true
    });
  }

  componentDidMount() {
    let { searchData, dataLogin, driverData } = this.props

    if (driverData.length > 0) {
      driverData.forEach(item => {
        dataStore.push([{
          type: 'insert',
          data: item
        }]);
      });
    }

    if (!isEmpty(searchData)) {
      if (this.props.dataLogin.userLevelId === 43) {  // 13-11-2020 Hidden for fleet level
        this.fleet_mode = true
        this.loadDrivers(0)
      }
      else if ([31, 32].includes(dataLogin.userLevelId)) {
        this.dealer_mode = true
        this.selectDealer = searchData.dealer_id
      }
      else if ([21, 22].includes(dataLogin.userLevelId)) {
        this.hino_mode = true
      }
      else {
        this.customer_mode = true
      }
      this.selectCustomer = searchData.cust_id
      this.startDate = searchData.start_date
      this.stopDate = searchData.stop_date
      this.isFirstLoad2 = false
      this.setState({ isFirstLoading: false })
      this.props.setIsLoadingDrivers(false)
    } else {
      this.setInitailDate()
      if (this.props.dataLogin.userLevelId === 43) {  // 13-11-2020 Hidden for fleet level
        this.fleet_mode = true
        this.loadDrivers(0)
      }
      else if ([31, 32].includes(dataLogin.userLevelId)) {
        this.dealer_mode = true
        this.load_manage_dealer()
        this.setState({ isFirstLoading: false })
        this.props.setIsLoadingDrivers(false)
      }
      else if ([21, 22].includes(dataLogin.userLevelId)) {
        this.hino_mode = true
        this.load_manage_customer()
        this.setState({ isFirstLoading: false })
        this.props.setIsLoadingDrivers(false)
      }
      else {
        this.customer_mode = true
        this.load_manage_customer()
      }
    }
  }

  componentWillUnmount() {
    dataStore.clear()
    dataSource.reload()
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.driverData !== this.props.driverData) return false
    return true
  }


  async load_manage_dealer() {
    var response = await fetch(ENDPOINT_BASE_URL + "fleet/get_dealer_by_manage", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: this.props.dataLogin.userId })
    });

    var data = await response.json();
    // console.log("Load Dealer : ", data)
    if (data.length > 0) {
      this.selectDealer = data[0].partner_id
      this.props.setDealerData(data)
    }
    else {
      this.selectDealer = []
      this.props.setDealerData([])
    }
    this.loadCustomer(this.selectDealer)
  }

  async loadCustomer(partner_id) {
    var response = await fetch(ENDPOINT_BASE_URL + "fleet/get_customer", {
      // var response = await fetch("http://10.8.0.7:5100/prod/" + "fleet/get_customer", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: this.props.dataLogin.userId,
        dealer_id: partner_id
      })
    });

    var data = await response.json();

    if (this.dealer_mode) {
      data.unshift(
        {
          firstname: "my_vehicles_92",
          lastname: "",
          partner_id: 0,
          prefix: "",
          suffix: ""
        }
      )
    }
    // console.log("Load Customer : ", data)
    if (data.length > 0) {
      this.selectCustomer = data[0].partner_id
      this.props.setCustomerOfMyDrivers(data)
    }
    else {
      this.selectCustomer = []
      this.props.setCustomerOfMyDrivers([])
    }
    if (this.customer_mode) this.loadDrivers(this.selectCustomer)
    if (this.dealer_mode && this.isFirstLoad2) {
      let object = {
        user_id: this.props.dataLogin.userId,
        start_date: this.startDate,
        stop_date: this.stopDate,
        cust_id: this.selectCustomer == 0 ? 0 : this.selectCustomer,
        dealer_id: this.selectDealer.length == 0 ? 0 : this.selectDealer
      }
      this.props.setDriverData([], object)

    }
    this.isFirstLoad2 = false
  }

  async load_manage_customer() {
    var response = await fetch(ENDPOINT_BASE_URL + "fleet/get_customer_by_manage", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: this.props.dataLogin.userId })
    });

    var data = await response.json();
    // console.log("Load Manage Customer : ", data)
    if (data.length > 0) {
      // this.selectCustomer = data[0].int_cust_id
      if (this.props.dataLogin.userLevelId === 21 || this.props.dataLogin.userLevelId === 22) data.unshift({ id: 0, int_cust_id: 0, customer_name: "my_vehicles_92" })
      this.selectCustomer = data[0].int_cust_id
      this.props.setCustomerOfMyDrivers(data)
      this.customer_mode && this.loadDrivers(data[0].int_cust_id)
    }
    else {
      this.selectCustomer = []
      this.props.setCustomerOfMyDrivers([])
      this.customer_mode && this.loadDrivers(0)
    }
  }

  async loadDrivers2() {
    this.props.setIsLoadingDrivers(true)

    var object = {
      user_id: this.props.dataLogin.userId,
      start_date: this.startDate,
      stop_date: this.stopDate,
      // cust_id: 0,
      cust_id: this.selectCustomer == 0 ? 0 : this.selectCustomer,
      dealer_id: this.selectDealer.length == 0 ? 0 : this.selectDealer
    }

    // var response = await fetch("http://10.8.0.5:5000/prod/fleet/mydriver", {
    var response = await fetch(ENDPOINT_HINO_API_URL + "fleet/V2/mydriverTest", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)
    });
    var data = await response.json();
    if (data?.code == 200) {
      let headerData = this.setHeaderData(object)
      this.props.setDriverData(data.result, object, headerData)
    }
    else
      this.props.setDriverData([], object)

    if (this.state.isFirstLoading) this.setState({ isFirstLoading: false })
  }


  //#region LAST EVALUATE KEY

  async loadDrivers() {
    this.props.setIsLoadingDrivers(true)
    let data = [], response = "", isLastKey = false, dict = {}
    let body = {
      user_id: this.props.dataLogin.userId,
      start_date: this.startDate,
      stop_date: this.stopDate,
      cust_id: this.selectCustomer == 0 ? 0 : this.selectCustomer,
      dealer_id: this.selectDealer.length == 0 ? 0 : this.selectDealer
    }

    let isFirstLoad = true

    do {
      response = await this.loadDriverData(isLastKey, get(response, 'LastEvaluatedKey', []), body)
      try {
        if (isFirstLoad) {
          dataStore.clear()
          dataSource.reload()
        }
        isFirstLoad = false

        get(response, 'dict') && (dict = response.dict)
        if (response.list.length > 0) {
          data.push(...response.list)
          let result = this.mappingData(response.list, dict)
          result.forEach(item => {
            dataStore.push([{
              type: 'insert',
              data: item
            }]);
          });
        }

        if (get(response, 'LastEvaluatedKey'))
          isLastKey = true
        else
          isLastKey = false

      } catch {
        isLastKey = false
      }

    } while (isLastKey);

    let result = this.mappingData(data, dict)
    let headerData = this.setHeaderData(body)
    this.props.setDriverData(result, body, headerData)

    if (this.state.isFirstLoading) this.setState({ isFirstLoading: false })
  }

  async loadDriverData(isLastKey = false, LastEvaluatedKey = [], body) {
    if (isLastKey) {
      body.LastEvaluatedKey = LastEvaluatedKey
    }

    try {

      var response = await fetch(ENDPOINT_BASE_URL + "fleet/mydriver", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Accept-Language': this.props.language
        },
        body: JSON.stringify(body)
      });

      var resp = await response.json();
      let data = []
      if (resp.code === 200) data = resp.result

      if (get(data, 'list')) {
        return data
      }
      else {
        this.props.setDriverData([], body)

        if (get(data, 'LastEvaluatedKey'))
          return { LastEvaluatedKey: data.LastEvaluatedKey }
        else
          return {}
      }
    } catch {
      this.props.setDriverData([], body)
    }

    if (!isLastKey) {
      if (this.state.isFirstLoading) this.setState({ isFirstLoading: false })
    }
  }

  mappingData(data, dict) {
    let result = []
    data.forEach(dt => {
      result.push({
        "id": dt[dict.id],
        "personal_id": dt[dict.personal_id],
        "date_time_swipe_card": dt[dict.date_time_swipe_card],
        "prefix": dt[dict.prefix],
        "firstname": dt[dict.firstname],
        "lastname": dt[dict.lastname],
        "telephone_no": dt[dict.telephone_no],
        "line_id": dt[dict.line_id],
        "email": dt[dict.email],
        "drive_with_n_gear": dt[dict.drive_with_n_gear],
        "ranking": dt[dict.ranking],
        "fleet_ranking": dt[dict.fleet_ranking],
        "customer_name": dt[dict.customer_name],
        "dlt_overspeed": dt[dict.dlt_overspeed],
        "dlt_over4": dt[dict.dlt_over4],
        "dlt_over8": dt[dict.dlt_over8],
        "speed_over_60": dt[dict.speed_over_60],
        "speed_over_80": dt[dict.speed_over_80],
        "speed_over_100": dt[dict.speed_over_100],
        "speed_over_120": dt[dict.speed_over_120],
        "safety_score": dt[dict.safety_score],
        "eco_score": dt[dict.eco_score],
        "total_score": dt[dict.total_score],
        "grade": dt[dict.grade],
        "trip_amount": dt[dict.trip_amount],
        "trip_count": dt[dict.trip_count],
        "time": dt[dict.time],
        "engine_hour": dt[dict.engine_hour],
        "idling": dt[dict.idling],
        "max_speed": dt[dict.max_speed],
        "over_rpm_count": dt[dict.over_rpm_count],
        "harsh_start": dt[dict.harsh_start],
        "harsh_acceleration": dt[dict.harsh_acceleration],
        "harsh_break": dt[dict.harsh_break],
        "sharp_turn": dt[dict.sharp_turn],
        "driven": dt[dict.driven],
        "distant": dt[dict.distant],
        "fuel_usage": dt[dict.fuel_usage],
        "fuel_consumption": dt[dict.fuel_consumption],
        "co2": dt[dict.co2],
        "working_day": dt[dict.working_day],
        "working_hours_per_day": dt[dict.working_hours_per_day],
        "over_rpm": dt[dict.over_rpm],
        "harsh_acceleration_second": dt[dict.harsh_acceleration_second],
        "harsh_accel_with_g_censor": dt[dict.harsh_accel_with_g_censor],
        "card_id": dt[dict.card_id],
        "expire_date": dt[dict.expire_date],
        "card_expired_date": dt[dict.card_expired_date],
        "dlt_province": dt[dict.dlt_province],
        "dlt_branch": dt[dict.dlt_branch],
        "dlt_card_type": dt[dict.dlt_card_type],
        "driver_license_type": dt[dict.driver_license_type],
        "vin_no": dt[dict.vin_no],
        "licenseplate": dt[dict.licenseplate],
        "vehicle_name": dt[dict.vehicle_name],
        "imei": dt[dict.imei],
        "competition": dt[dict.competition],
        "competition_date": dt[dict.competition_date]
      })
    });

    return result
  }
  //#endregion


  setInitailDate() {
    let selected_date = "", startDate = "", endDate = ""

    if (moment().format("DD/MM/YYYY") == moment().startOf('month').format("DD/MM/YYYY")) {
      startDate = moment().subtract(1, 'month').format("DD/MM/YYYY")
      endDate = moment().subtract(1, 'day').format('DD/MM/YYYY')
    }
    else {
      startDate = moment().startOf('month').format("DD/MM/YYYY")
      endDate = moment().subtract(1, 'days').format("DD/MM/YYYY")
    }
    selected_date = startDate + " - " + endDate
    this.startDate = moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
    this.stopDate = moment(endDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
  }

  onApplyEvent(dataObject) {
    this.startDate = dataObject.startDate.format('YYYY-MM-DD')
    this.stopDate = dataObject.endDate.format('YYYY-MM-DD')

    if (!this.isFirstLoad && this.customer_mode) {
      this.loadDrivers()
    } else if (this.dealer_mode) {
      this.props.updateSearchDataMyDrivers([
        { name: 'start_date', value: this.startDate },
        { name: 'stop_date', value: this.stopDate }
      ])
    } else {
      this.isFirstLoad = false
    }
  }

  setHeaderData(obj) {
    let { dealerData, customerData } = this.props
    let headerData = { start_date: obj.start_date, stop_date: obj.stop_date }, name = ''
    if (this.dealer_mode) {
      let deal = dealerData.find((item) => item.partner_id == get(obj, 'dealer_id'))
      if (deal) {
        let lstName = []
        if (deal.prefix) lstName.push(deal.prefix)
        if (deal.firstname) lstName.push(deal.firstname)
        if (deal.lastname) lstName.push(deal.lastname)
        if (deal.suffix) lstName.push(deal.suffix)
        name = lstName.join(' ')
      } else name = '-'
      headerData.dealer_name = name
      let cust = customerData.find((item) => item.partner_id == get(obj, 'cust_id'))
      if (cust) {
        let lstName = []
        if (cust.prefix) lstName.push(cust.prefix)
        if (cust.firstname) lstName.push(cust.firstname)
        if (cust.lastname) lstName.push(cust.lastname)
        if (cust.suffix) lstName.push(cust.suffix)
        name = lstName.join(' ')
      } else name = '-'
      headerData.customer_name = name
    } else {
      let cust = customerData.find((item) => item.int_cust_id == get(obj, 'cust_id'))
      if (cust) name = cust.customer_name
      else name = '-'
      headerData.customer_name = name
    }
    return headerData
  }

  render() {
    let { dealerData, customerData } = this.props
    // console.log(">> RENDER MY DRIVERS <<", this.selectCustomer)

    if (this.state.isFirstLoading) {
      return (
        <Alert
          setting={{ show: true, type: 5 }}
          onConfirm={() => { }}
        />
      )
    }
    else return (
      <Suspense fallback={null}>
        <PannelBox
          title={t("my_drivers")}
          showFooter={this.dealer_mode || this.hino_mode}
          footerchildren={
            <div style={{ textAlign: 'Right' }}>
              <button onClick={() => this.loadDrivers()} className="btn" style={{ marginRight: 10, backgroundColor: '#1AB394', color: 'white' }}>{t("search")} </button>
            </div>
          }
        >
          <Row>
            {
              (this.customer_mode || this.hino_mode) && <>
                <DropdownCustomer
                  data={customerData}
                  selected={this.selectCustomer}
                  isCustomer={true}
                  onChange={(selected) => {
                    this.selectCustomer = selected
                    this.customer_mode && this.loadDrivers(selected)
                    // this.hino_mode && this.props.updateSearchDataMyDrivers([{ name: 'cust_id', value: this.selectCustomer }])
                    this.props.setValue("cust_id", this.selectCustomer)
                  }}
                />

                <DateRangePicker
                  select_change={this.onApplyEvent.bind(this)}
                  language={this.props.language}
                  maxDate={this.state.eDate}
                  startDate={moment(this.startDate).format('DD/MM/YYYY')}
                  endDate={moment(this.stopDate).format('DD/MM/YYYY')}
                />
              </>
            }

            {this.dealer_mode && [
              <DropdownDealer
                data={dealerData}
                selected={this.selectDealer}
                onChange={(selected) => {
                  this.selectDealer = selected
                  this.loadCustomer(selected)
                }}
              />
              ,
              <DropdownCustomer
                data={customerData}
                selected={this.selectCustomer}
                isCustomer={false}
                isDealer={true}
                onChange={(selected) => {
                  this.selectCustomer = selected
                  if (this.dealer_mode) this.props.updateSearchDataMyDrivers([{ name: 'cust_id', value: this.selectCustomer }])
                }}
              />
            ]}

            {
              this.fleet_mode && <DateRangePicker
                select_change={this.onApplyEvent.bind(this)}
                language={this.props.language}
                maxDate={this.state.eDate}
              />
            }
          </Row>

          <Row>
            {this.dealer_mode && <DateRangePicker
              select_change={this.onApplyEvent.bind(this)}
              language={this.props.language}
              maxDate={this.state.eDate}
              startDate={moment(this.startDate).format('DD/MM/YYYY')}
              endDate={moment(this.stopDate).format('DD/MM/YYYY')}
            />
            }
          </Row>

        </PannelBox>

        <PannelBox
          style={{ marginTop: -20 }}
          contentStyle={{ paddingLeft: 35, paddingRight: 35, borderWidth: ' 4px 0px 0px ', borderColor: '#e7eaec' }}>
          <DataTable isDealer={this.dealer_mode} isHino={this.hino_mode} dataStore={dataStore} dataSource={dataSource} />
        </PannelBox>
      </Suspense >
    )
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  dealerData: state.myDrivers.dealerData,
  customerData: state.myDrivers.customerData,
  searchData: state.myDrivers.searchData,
  driverData: state.myDrivers.driverData,
  cust_id: state.myDrivers.cust_id
});

const mapDispatchToProps = (dispatch) => ({
  setIsLoadingDrivers: (isLoading) => dispatch(MyDriverActions.setIsLoadingDrivers(isLoading)),
  setDealerData: (data) => dispatch(MyDriverActions.setDealerData(data)),
  setCustomerOfMyDrivers: (data) => dispatch(MyDriverActions.setCustomerOfMyDrivers(data)),
  setDriverData: (data, object, headerData) => dispatch(MyDriverActions.setDriverData(data, object, headerData)),
  updateSearchDataMyDrivers: (array) => dispatch(MyDriverActions.updateSearchDataMyDrivers(array)),
  setValue: (name, value) => dispatch(MyDriverActions.setValue(name, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyDrivers)

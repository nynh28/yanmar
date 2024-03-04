import React, { Suspense, useState } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from "reactstrap";
import { t } from '../../Components/Translation';
import { useTranslation } from 'react-i18next'
import moment from 'moment-timezone';
import { Select, Button as ButtonAntd } from 'antd';
import FormDatepickerSummary from '../../Components/FormControls/FormDatepickerSummary';
import { ENDPOINT_BASE_URL } from '../../Config/app-config';
import SummaryActions from '../../Redux/SummaryRedux'
import Chart, {
  CommonSeriesSettings,
  Legend,
  Series,
  Tooltip,
  ArgumentAxis,
  Label,
} from 'devextreme-react/chart';
import service from './data.js';
const { Option } = Select;
const { get } = require('lodash')
const dataSource = service.dataSource();
var chartOptions = {
  argumentAxis: {
    label: {
      format: "dd"
    }
  }
};

const FormSelectSearch = (arg) => {
  const { t } = useTranslation()
  return (
    <Select
      id={arg.id}
      mode={arg.mode}
      showSearch
      style={{ width: 300 }}
      placeholder={t(arg.placeholder)}
      value={arg.value}
      disabled={arg.disabled}
      onChange={arg.onChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {
        arg.list !== null && arg.list.map((item) => {
          return <Option key={item.key}>{t(item.value)}</Option>
        })
      }
    </Select>
  )
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
let utilizationDayData = []

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectcustomer: [],
      listCustomer: [],
      listFleet: [],
      selectFleet: [],
      start_date: '',
      end_date: '',
      start_date: "",
      end_date: "",
      summaryData: {
        chart: {
          eco: [],
          safety: []
        }
      }
    }
    this.setDataSelected = this.setDataSelected.bind(this);
    this.chartRef = React.createRef()
    this.firstLoad = true
    this.firstClick = true
  }

  customizeTooltip(arg) {
    return {
      text: `${arg.percentText} years: ${arg.valueText}`,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  setinfo(label, color, icon, text = "", data) {
    return <span class style={{ paddingLeft: '4%', cursor: 'pointer' }} onClick={() => {
      let points = []
      data.vehicles.forEach(item => {
        points.push({
          type: "Feature",
          properties: { cluster: false, id: item.id },
          geometry: {
            type: "Point",
            coordinates: [item.lng, item.lat]
          },
          iconUrl: item.url
        })
      });
      window.scroll({ top: 5555, behavior: 'smooth' })
      this.props.onClick(points)
    }}><i className="fa fa-square" style={{ color, fontSize: 18 }} /> {text} : {data.total} คัน<br></br></span>
  }

  onApplyEvent(dataObject) {
    let { isFirstLoadSummary } = this.state

    var start_date_dmy = dataObject.startDate.format('DD/MM/YYYY')
    var end_date_dmy = dataObject.endDate.format('DD/MM/YYYY')
    this.setState({
      date: start_date_dmy + " to " + end_date_dmy,
      start_date: start_date_dmy,
      end_date: end_date_dmy,
      serieclick: moment(dataObject.startDate).format('YYYY-MM-DD') + " - " + moment(dataObject.endDate).format('YYYY-MM-DD'),
      selectData: false,
    }, () => {

    })
  }


  setDataSelected() {
    this.setState({
      utilizationday: utilizationDayData
    })
  }

  setDataSelected() {
    this.setState({
      utilizationday: utilizationDayData
    })
  }

  //#region BAR CHART ACTIONS
  onPointClick(e) {
    let { target } = e
    let { keepArgument } = this.props
    if (this.firstClick && keepArgument === target.argument) {
      this.chartRef.instance._getStackPoints()[keepArgument].axis_default_stack_default[0].clearSelection()
      this.chartRef.instance._getStackPoints()[keepArgument].axis_default_stack_default[1].clearSelection()
      this.chartRef.instance._getStackPoints()[keepArgument].axis_default_stack_default[2].clearSelection()
      this.chartRef.instance._getStackPoints()[keepArgument].axis_default_stack_default[3].clearSelection()
      this.selectedCallback("unselect")
      this.firstClick = false
    } else {
      if (target.isSelected()) {
        target.clearSelection();
        this.selectedCallback("unselect")
      } else {
        target.select()
        this.selectedCallback(target.argument)
      }
    }
  }

  selectedCallback(argument) {
    console.log('selectedCallback', argument)
    // if (argument == 'unselect') {
    //   this.props.setStateReduxSummary({ keepArgument: undefined, selectData: undefined, eventData: undefined })
    // } else {
    //   this.setDataSelectByDate(argument)
    //   this.props.setStateReduxSummary({ keepArgument: argument, selectData: undefined, eventData: undefined })
    // }
  }
  //#endregion



  render() {
    let { selectCustomer, listCustomer, listFleet, selectFleet } = this.state
    return (
      <Suspense fallback={null}>
        <div className="ibox float-e-margins" style={{ marginBottom: 6 }}>
          <div className="ibox-content">
            <Row sm={3} lg={6}>
              <Col >
                <label style={{ fontWeight: "bold", fontSize: 18 }}> {t("summary_71")} {""}
                  {this.props.keepArgument !== undefined ? (
                    moment(this.props.keepArgument, 'YYYY-MM-DD').format('DD/MM/YYYY')
                  )
                    : [this.state.start_date + ' ',
                    t('summary_74'),
                    ' ' + this.state.end_date
                    ]}</label>

                <div className="pull-right">
                  <label style={{ fontWeight: "bold", fontSize: 18, marginRight: '5px' }}>{t("summary_84")}</label>
                  <FormSelectSearch
                    mode={"single"}
                    schema={{ "required": ["customerDD"] }}
                    value={selectCustomer}
                    label={"summary_84"}
                    list={listCustomer || []}
                    fieldForm={"customerDD"}
                    placeholder={"summary_84"}
                    flex={1}
                    onChange={(selected) => {
                      this.setState({
                        selectCustomer: selected,
                      }, () => {
                        this.props.setStateReduxSummary({ selectCustomer: selected })
                        this.getFleet(selected)
                      })
                    }}
                  />
                </div>
              </Col>
            </Row>
            <br></br>
            <Row>
              <label style={{ fontWeight: "bold", fontSize: 18, marginRight: '5px' }}>{t("my_vehicles_5")}</label>
              <FormSelectSearch
                mode={"single"}
                schema={{ "required": ["customerDD"] }}
                value={selectFleet}
                label={"summary_84"}
                list={listFleet || []}
                fieldForm={"customerDD"}
                placeholder={"summary_84"}
                flex={1}
                onChange={(selected) => {
                  this.setState({
                    selectFleet: selected,
                  }, () => {
                    this.props.setStateReduxSummary({ selectFleet: selected })
                    this.getFleet(selected)
                  })
                }}
              />
              <Col className="pull-right" style={{ display: 'flex', flexDirection: 'row' }}>
                <label className="" style={{ paddingRight: '5px', fontSize: '18px' }}> {t('summary_72')}</label>
                <div className="" style={{ paddingRight: '5px' }}>
                  <FormDatepickerSummary
                    select_change={this.onApplyEvent.bind(this)}
                    language={this.props.language}
                    maxDate={moment()}
                    startDate={this.props.start_date}
                    endDate={this.props.end_date}
                  >
                  </FormDatepickerSummary>
                </div>
                <ButtonAntd
                  icon={<i className="fa fa-refresh" aria-hidden="true" style={{}}></i>}
                  onClick={() => { }}>{t('control_room_17')}</ButtonAntd>
              </Col>
            </Row>
          </div>
        </div>

        <div className="ibox float-e-margins" style={{ marginBottom: 6 }}>
          <div className="ibox-title" >
            <Row style={{ paddingRight: 0, paddingLeft: 5 }}>
              <Col lg={12}>
                <div style={{ fontWeight: "bold" }}>
                  <i className="fa fa-location-arrow" aria-hidden="true" style={{ marginRight: 10 }}></i>
                  {/* <label style={{ fontWeight: "bold", fontSize: 18 }}> {t("summary_1")} {' (' + this.props.menuUser.vehicleCount + ' '} {t("summary_41")}{') '}</label> */}
                  <label style={{ fontWeight: "bold", fontSize: 18 }}> {t("summary_1")} </label>
                </div>
              </Col>
            </Row>
          </div>
          <div className="ibox-content">
            <Row>
              <Col lg={8} md={8} sm={12} xs={12}>
                <Chart
                  id="chart-data"
                  ref={(ref) => this.chartRef = ref}
                  chartOptions={chartOptions}
                  dataSource={dataSource}
                  pointSelectionMode={'single'}
                  size={{ height: '200', width: '100%' }}
                  onPointClick={(e) => this.onPointClick(e)}
                >
                  <ArgumentAxis argumentType="datetime" tickInterval="day">
                    <Label format="dd" overlappingBehavior="stagger"></Label>
                  </ArgumentAxis>
                  <CommonSeriesSettings argumentField="datetime" type="fullstackedbar" />
                  <Series valueField="dlt_4hour" color={'#d9d9d9'} />
                  <Series valueField="dlt_8hour" color={'#caeb63'} />
                  <Series valueField="dlt_overspeed" color={'#fceb3b'} />
                  <Series valueField="harsh_acc" color={'#548135'} />
                  <Series valueField="sharp_turn" color={'#35cbfc'} />
                  <Series valueField="fuel_con" color={'#0470c0'} />
                  <Legend visible={false} />
                  <Tooltip
                    enabled={true}
                    customizeTooltip={this.customizeTooltip}
                  />
                </Chart>
              </Col>

              <Col lg={4} md={4} sm={12} xs={12}>
                <label style={{ textweight: 'bold', fontSize: "18px", paddingLeft: '4%' }}>พฤติกรรมการใช้รถขุด</label><br></br>
                {this.setinfo("", "#d9d9d9", "", t('summary_86'), data.notWorking, "คัน")} {/* ไม่ทำงาน */}
                {this.setinfo("", "#fbeb44", "", t('summary_87'), data.Working2, "คัน")} {/* ทำงานสองชม */}
                {this.setinfo("", "#c9eb64", "", t('summary_88'), data.working4, "คัน")} {/* ทำงานสี่ชม */}
                {this.setinfo("", "#548135", "", t('summary_89'), data.working6, "คัน")} {/* ทำงานหกชม */}
                {this.setinfo("", "#35cbfc", "", t('summary_90'), data.working8, "คัน")} {/* ทำงานแปดชม */}
                {this.setinfo("", "#0270c0", "", t('summary_91'), data.working10, "คัน")} {/* ทำงานมากกว่าแปดชม */}
              </Col>
            </Row>


          </div>
        </div>
      </Suspense>
    );
  }

  customizeLabel(e) {
    // const { t } = useTranslation()
    // //console.log(e)
    if (e.value == 0) {
      // //console.log("summary_6")
      return "summary_6"
    }
    if (e.value == 0.25) {
      // //console.log("summary_5")
      return "summary_5"
    }
    if (e.value == 0.5) {
      // //console.log("summary_4")
      return "summary_4"
    }
    if (e.value == 0.75) {
      // //console.log("summary_3")
      return "summary_3"
    }
    else
      // //console.log("summary_2")
      return "summary_2"
  }

  customizeText(e) {
    // //console.log(e)
    var date = e.value.split('-')[2]
    for (var i = 0; i <= date.length; i++) {
      if (date[0] == 0) {
        var date = date.slice(1, 2);
      }
      else {
        var date
      }
    }
    return `${date}`;
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.versatile.language,
    menuUser: state.signin.menuUser,
    dataLogin: state.signin.dataLogin,
    utilization: state.summary.utilization,
    start_date: state.summary.start_date,
    end_date: state.summary.end_date,
    summaryData: state.summary.summaryData,
    selectCustomer: state.summary.selectCustomer,
    listCustomer: state.summary.listCustomer,
    selectFleet: state.summary.selectFleet,
    listFleet: state.summary.listFleet,
    setData: state.summary.setData,
  }
}
const mapDispatchToProps = (dispatch) => ({
  setStateReduxSummary: (objState) => dispatch(SummaryActions.setStateReduxSummary(objState)),
  setLoadingSummary: (value) => dispatch(SummaryActions.setLoadingSummary(value)),
});

export default (connect(mapStateToProps, mapDispatchToProps)(Dashboard))


let data = {
  notWorking: {
    total: "2",
    vehicles: [
      {
        id: "car01",
        vid: 1,
        lat: 14.408565,
        lng: 100.59528
      },
      {
        id: "car02",
        vid: 2,
        lat: 14.408551,
        lng: 100.59539
      }
    ]
  },
  Working2: {
    total: "3",
    vehicles: [
      {
        id: "car011",
        vid: 1,
        lat: 14.408587,
        lng: 100.595221
      },
      {
        id: "car022",
        vid: 2,
        lat: 14.410253,
        lng: 100.592683
      },
      {
        id: "car033",
        vid: 3,
        lat: 14.527313,
        lng: 100.70108
      }
    ]
  },
  working4: {
    total: "4",
    vehicles: [
      {
        id: "car0111",
        vid: 1,
        lat: 14.408587,
        lng: 100.595221
      },
      {
        id: "car0222",
        vid: 2,
        lat: 14.410253,
        lng: 100.592683
      },
      {
        id: "car0333",
        vid: 3,
        lat: 14.527313,
        lng: 100.70108
      },
      {
        id: "car0444",
        vid: 4,
        lat: 14.542,
        lng: 100.718
      }
    ]
  },
  working6: {
    total: "0",
    vehicles: []
  },
  working8: {
    total: "0",
    vehicles: []
  },
  working10: {
    total: "0",
    vehicles: "0"
  }
}


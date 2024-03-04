import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import OtherReportActions from '../../Redux/OtherReportRedux'
import Table from '../../Components/DataGridView/Table.js'
import moment from 'moment'
import { t } from '../../Components/Translation';
// import DateRangePicker from './FormControls/DateRangePicker'
import { Row, Col } from 'reactstrap'
import PannelBox from '../../Components/PannelBox'
import FormDateRangePickers from '../../Components/FormControls/FormDateRangePickers';
import FormDatepickerNew from '../../Components/FormControls/FormDatepickerNew';
import { get } from 'lodash'
import { calculateToTimestamp } from '../../Functions/DateMoment'
import Alert from '../../Components/Alert'

const DateRangePicker = (arg) => {
  return (<Col lg={6} md={12}>
    <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
      <label className="control-label" style={{ fontWeight: 500 }}>
        {t('date_Range')} :
              </label>
      <FormDatepickerNew
        select_change={arg.select_change}
        language={arg.language}
        maxDate={arg.eDate}>
      </FormDatepickerNew>
    </div>
  </Col>
  )
}

class InstallationReport extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dateStart: '',
      dateEnd: '',
      startDate: '',
      stopDate: '',
      alertSetting: {
        show: false,
        type: 2,
        content: "",
        validateCode: false
      },

    }
    // this.startDate
    // this.stopDate
  }

  componentWillMount() {
    let data = {
      "dtstart": calculateToTimestamp(this.state.startDate,),
      "dtstop": calculateToTimestamp(this.state.stopDate
      )

    }
    this.setAlertSetting(true, 6)
    this.setInitailDate()
    this.props.getInstall(data)
  }

  componentDidUpdate(prevProps) {
    let { infoInstall } = this.props
    if (prevProps.infoInstall !== infoInstall) this.setAlertSetting(false, 5)
  }

  setAlertSetting(isShow, type, content = "", ErrorSubcode) {
    let { alertSetting } = this.state
    alertSetting.show = isShow
    alertSetting.type = type
    alertSetting.content = content
    alertSetting.ErrorSubcode = ErrorSubcode
    this.setState({ alertSetting })
  }

  setInitailDate = () => {
    let selected_date = "", startDate = "", endDate = ""

    if (moment().format("DD/MM/YYYY") == moment().startOf('month').format("DD/MM/YYYY")) {
      selected_date = moment().subtract(1, 'month').format("DD/MM/YYYY") + " - " + moment().subtract(1, 'day').format('DD/MM/YYYY')
      startDate = moment().subtract(1, 'month').format("DD/MM/YYYY")
      endDate = moment().subtract(1, 'day').format('DD/MM/YYYY')
    }
    else {
      selected_date = moment().startOf('month').format("DD/MM/YYYY") + " - " + moment().subtract(1, 'days').format("DD/MM/YYYY")
      startDate = moment().startOf('month').format("DD/MM/YYYY")
      endDate = moment().subtract(1, 'days').format("DD/MM/YYYY")
    }

    this.setState({
      startDate: moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      stopDate: moment(endDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
    })
    // this.startDate = moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
    // this.stopDate = moment(endDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
  }

  onApplyEvent(dataObject) {
    var start_date_d = dataObject.startDate.format('YYYY-MM-DD').split('-')[2]
    var start_date_m = dataObject.startDate.format('YYYY-MM-DD').split('-')[1]
    var start_date_y = dataObject.startDate.format('YYYY-MM-DD').split('-')[0]
    var startDate = start_date_y + '-' + start_date_m + '-' + start_date_d
    var end_date_d = dataObject.endDate.format('YYYY-MM-DD').split('-')[2]
    var end_date_m = dataObject.endDate.format('YYYY-MM-DD').split('-')[1]
    var end_date_y = dataObject.endDate.format('YYYY-MM-DD').split('-')[0]
    var stopDate = end_date_y + '-' + end_date_m + '-' + end_date_d

    console.log(calculateToTimestamp(startDate), ' ', calculateToTimestamp(stopDate))
    this.setState({
      startDate: startDate,
      stopDate: stopDate
    })

    let data = {
      "dtstart": calculateToTimestamp(startDate),
      "dtstop": calculateToTimestamp(stopDate)
    }

    this.setAlertSetting(true, 5)
    this.props.getInstall(data)
  }

  render() {
    let { dateStart, dateEnd, alertSetting } = this.state
    let { header, infoInstall } = this.props
    let listInstall = get(infoInstall, 'result', [])

    return (
      <Suspense fallback={null}>
        <Alert
          setting={alertSetting}
          onConfirm={() => {
            alertSetting.show = false

            this.setState({ alertSetting })
          }}
          onCancel={() => {
            // alertSetting.show = false
            // this.setState({ alertSetting })
          }}
        />
        <PannelBox
          title={t("Installation_3")}
          showFooter={false}
        >
          <Row>
            <DateRangePicker
              select_change={this.onApplyEvent.bind(this)}
            // language={this.props.language}
            // maxDate={this.state.eDate}
            />
          </Row>
        </PannelBox>
        <PannelBox style={{ marginTop: -20 }}
          contentStyle={{ paddingLeft: 30, paddingRight: 30, borderWidth: ' 4px 0px 0px ', borderColor: '#e7eaec' }}>
          <Table
            mode={"offline"}
            dataSource={[...listInstall]}
            author={header.idToken}
            xAPIKey={header.redisKey}
            table_id={6}
            user_id={this.props.dataLogin.userId}
            editing={{ enabled: false }}
            showSetting={false}
            searchPanel={true}
            autoExpandAll={false}
            remoteOperations={true}
            columnCount="created_date_time"
            // selectedCallback={(e) => vehicleSelected = e.selectedRowsData}
            selectAll={true}
            column={[
              {
                column_name: 'created_date_time',
                column_caption: "Installation_report_1",
                column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
              },
              {
                column_name: 'ordering_model',
                column_caption: "Installation_report_2"
              },
              {
                column_name: 'engine_no',
                column_caption: "Installation_report_3"
              },
              {
                column_name: 'vin_no',
                column_caption: "Installation_report_4"
              },
              {
                column_name: 'subscriber_no',
                column_caption: "Installation_report_5",
                visible: false
              },
              {
                column_name: 'current_imei',
                column_caption: "Installation_report_6",
                visible: false
              },
              {
                column_name: 'current_mid',
                column_caption: "Installation_report_7",
                visible: false
              },
              {
                column_name: 'current_imsi',
                column_caption: "Installation_report_8",
                visible: false
              },
              {
                column_name: 'current_phone_no',
                column_caption: "Installation_report_9",
                visible: false
              },
              {
                column_name: 'service_result_name',
                column_caption: "Installation_report_10"
              },
              {
                column_name: 'display_name',
                column_caption: "Installation_report_11",
                visible: false
              },
              {
                column_name: 'service_status_name',
                column_caption: "Installation_report_12",
              },
              {
                column_name: 'seller_code',
                column_caption: "Installation_report_13",

              },
              {
                column_name: 'stock_status',
                column_caption: "Installation_report_14",

              },
              {
                column_name: 'register_status',
                column_caption: "Installation_report_15",

              },
            ]}
          />
        </PannelBox>
      </Suspense >
    )
  }
}

const mapStateToProps = (state) => ({
  header: state.signin.header,
  dataLogin: state.signin.dataLogin,
  infoInstall: state.otherReport.infoInstall,
  statusSubmit: state.subscription.statusSubmit,
});

const mapDispatchToProps = (dispatch) => ({
  getInstall: (data) => dispatch(OtherReportActions.getInstall(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InstallationReport)
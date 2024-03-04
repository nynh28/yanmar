import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import PannelBox from '../../Components/PannelBox'
import GPSUnitActions from '../../Redux/GPSUnitRedux'
import { withRouter } from 'react-router'
import FormInput from '../../Components/FormControls/FormInput'
import FormSelect from '../../Components/FormControls/FormSelectSearch'
import { Row, Col, Input } from 'reactstrap'
import moment from 'moment'
import 'moment/locale/th'
import DateRangePicker from 'react-bootstrap-daterangepicker-maxspan';
import 'bootstrap-daterangepicker/daterangepicker.css';
import SaveButton from '../../Components/SaveButton'
import Alert from '../../Components/Alert'
import { calculateToTimestamp } from '../../Functions/DateMoment'

const TODAY_START = moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
const TODAY_END = moment().set({ hour: 23, minute: 59, second: 59, millisecond: 59 })
const LST_LIMIT = [{ key: 10, value: "10" }, { key: 50, value: "50" }, { key: 100, value: "100" }, { key: 500, value: "500" }, { key: "All", value: "All" }]
const LST_SORT = [{ key: 'Ascending', value: "Ascending" }, { key: 'Descending', value: "Descending" }]
const FORMAT_DATE = 'DD/MM/YYYY HH:mm'

class SearchData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alertSetting: {
        show: false,
        type: 3,
        content: "",
        ErrorSubcode: 0
      },
      imei: '',
      startDate: TODAY_START,
      endDate: TODAY_END,
      limit: 'All',
      orderBy: 'Ascending',
      strStartEndDate: TODAY_START.format(FORMAT_DATE) + ' - ' + TODAY_END.format(FORMAT_DATE),
      page: 10

    };

    this.handleEvent = this.handleEvent.bind(this);
    this.dataGrid = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { loading } = this.props
    if (nextProps.loading !== loading && !nextProps.loading) {
      if (nextProps.messageError !== null) this.setAlertSetting(true, 2, false)
      else this.setAlertSetting(false)
      return false
    }
    return true
  }

  componentDidMount() {
    this.setState({ imei: this.props.imei }, () => this.searchData())
  }


  searchData(e) {
    if (e) e.preventDefault()
    let { imei, startDate, endDate, orderBy } = this.state

    if (imei && startDate && endDate && orderBy) {
      this.props.getDataUnit(imei, calculateToTimestamp(startDate), calculateToTimestamp(endDate), orderBy)
      this.setAlertSetting(true, 6)
    }
  }

  handleEvent(event, picker) {
    let startDate = moment(picker.startDate)
    let endDate = moment(picker.endDate)
    this.setState({
      startDate,
      endDate,
      strStartEndDate: startDate.format(FORMAT_DATE) + ' - ' + endDate.format(FORMAT_DATE),
    })
  }

  setAlertSetting(isShow, type, validateCode) {
    let { alertSetting } = this.state
    alertSetting.show = isShow
    alertSetting.type = type
    alertSetting.validateCode = validateCode
    this.setState({ alertSetting })
  }

  render() {
    let { alertSetting, imei, limit, orderBy } = this.state
    return (<Suspense fallback={null}>
      <Alert
        setting={alertSetting}
        onConfirm={() => {
          if (alertSetting.type === 4) { alertSetting.show = false }
          else { alertSetting.show = false }
          this.setState({ alertSetting })
        }}
        onCancel={() => {
          alertSetting.show = false
          this.setState({ alertSetting })
        }}
      />
      <PannelBox
        title={"GPS Unit"}
        showFooter={true}
        footerchildren={
          <div style={{ textAlign: 'Right' }}>
            <SaveButton
              type="submit"
              form="form-search-gpsunit"
              name={'Search'}
              color={'#8F9BA6'}
            />
          </div>
        }
      >
        <form id="form-search-gpsunit" onSubmit={(e) => this.searchData(e)}>
          <Row>
            <Col lg={6}>
              <FormInput
                fieldForm={'imei'}
                schema={{ required: ['imei'] }}
                label={'IMEI'}
                value={imei}
                onChange={(e) => this.setState({ imei: (e.target.value).trim() })}
              />
            </Col>
            <Col lg={6}>
              <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
                <label className="control-label" style={{ fontWeight: 500 }}>Date :</label>
                <DateRangePicker
                  timePicker
                  timePicker24Hour
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onEvent={this.handleEvent}
                  maxSpan={{ days: 3 }}
                  containerStyles={{ display: 'inline-block', width: '100%' }} >
                  <Input name="dates" value={this.state.strStartEndDate} style={{ width: '100%' }} />
                </DateRangePicker>
              </div>
            </Col>
            <Col lg={6}>
              <FormSelect
                schema={{ "required": [""] }}
                disabled={true}
                mode={"single"}
                value={limit}
                label={"Limit"}
                list={LST_LIMIT}
                placeholder={""}
                flex={1}
                onChange={(selected) => { this.setState({ limit: selected }) }}
              />
            </Col>
            <Col lg={6}>
              <FormSelect
                schema={{ "required": [""] }}
                mode={"single"}
                value={orderBy}
                label={"Sort"}
                list={LST_SORT}
                placeholder={""}
                flex={1}
                onChange={(selected) => { this.setState({ orderBy: selected }) }}
              />
            </Col>
          </Row>
        </form>
      </PannelBox>
    </Suspense>
    )
  }
}



const mapStateToProps = (state) => ({
  loading: state.gpsUnit.loading,
  messageError: state.gpsUnit.messageError,
});

const mapDispatchToProps = (dispatch) => ({
  getDataUnit: (imei, startDate, endDate, orderBy) => dispatch(GPSUnitActions.getDataUnit(imei, startDate, endDate, orderBy))

});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchData))

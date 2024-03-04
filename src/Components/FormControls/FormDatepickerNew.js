import React, { Component } from 'react'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import { configConsumerProps } from 'antd/lib/config-provider';
import { useTranslation } from 'react-i18next'
import { CalendarOutlined } from '@ant-design/icons';
import './Styles/datepicker.css'

const DateRangePickers = (arg) => {
  const { t } = useTranslation()

  console.log('arg : ', arg)

  return (
    <div className='icon-calendar-ranges'>
      <CalendarOutlined />
      <DateRangePicker
        onShow={() => {
          let elms = document.querySelectorAll('li[data-range-key]');
          if (elms.length > 0) {
            elms[0].textContent = t('calendar_1')
            elms[1].textContent = t('calendar_2')
            elms[2].textContent = t('calendar_3')
            elms[3].textContent = t('calendar_4')
            elms[4].textContent = t('calendar_5')
          }
        }}
        // ref={arg.onApplyEvent}
        ref={arg.daterangepicker}
        locale={{
          "applyLabel": t("calendar_26"),
          "cancelLabel": t("calendar_25"),
          // "customRangeLabel":  t("calendar_5"),
          "customRangeLabel": "Custom Range",
          "daysOfWeek": [
            t("calendar_12"),
            t("calendar_6"),
            t("calendar_7"),
            t("calendar_8"),
            t("calendar_9"),
            t("calendar_10"),
            t("calendar_11")
          ],
          "monthNames": [
            t("calendar_13"),
            t("calendar_14"),
            t("calendar_15"),
            t("calendar_16"),
            t("calendar_17"),
            t("calendar_18"),
            t("calendar_19"),
            t("calendar_20"),
            t("calendar_21"),
            t("calendar_22"),
            t("calendar_23"),
            t("calendar_24")
          ]
        }}
        startDate={typeof arg.startDate != 'undefined' ?
          moment(arg.startDate, "DD/MM/YYYY") :
          moment().format("DD/MM/YYYY") == moment().startOf('month').format("DD/MM/YYYY") ?
            moment().subtract(1, 'month').format("DD/MM/YYYY") :
            moment().startOf('month').format("DD/MM/YYYY")
        }
        endDate={typeof arg.endDate != 'undefined' ?
          moment(arg.endDate, "DD/MM/YYYY") :
          moment().format("DD/MM/YYYY") == moment().startOf('month').format("DD/MM/YYYY") ?
            moment().subtract(1, 'day').format('DD/MM/YYYY') :
            moment().subtract(1, 'days').format("DD/MM/YYYY")
        }
        minDate={arg.minDate && moment(arg.minDate, "DD/MM/YYYY")}
        maxDate={arg.maxDate && moment(arg.maxDate, "DD/MM/YYYY")}
        showDropdowns={true}
        maxSpan={arg.maxSpan}
        onApply={arg.onApplyEvent}
        timePicker24Hour
        timePicker={arg.timePicker || false}
        // ranges={{
        //   [t('calendar_1')]: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        //   [t('calendar_2')]: [moment().subtract(8, 'days').startOf('week'), moment().subtract(8, 'days').endOf('week')],
        //   [t('calendar_3')]: moment().format("DD/MM/YYYY") == moment().startOf('month').format("DD/MM/YYYY") ? [moment().subtract(1, 'month'), moment().subtract(1, 'days')] : [moment().startOf('month'), moment().subtract(1, 'days')],
        //   [t('calendar_4')]: moment().format("DD/MM/YYYY") == moment().startOf('month').format("DD/MM/YYYY") ? [moment().subtract(2, 'month').startOf('month'), moment().subtract(2, 'month').endOf('month')] : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        // }}
        ranges={{
          "Yesterday": [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          "Last Week": [moment().subtract(8, 'days').startOf('week'), moment().subtract(8, 'days').endOf('week')],
          "This Month": moment().format("DD/MM/YYYY") == moment().startOf('month').format("DD/MM/YYYY") ? [moment().subtract(1, 'month'), moment().subtract(1, 'days')] : [moment().startOf('month'), moment().subtract(1, 'days')],
          "Last Month": moment().format("DD/MM/YYYY") == moment().startOf('month').format("DD/MM/YYYY") ? [moment().subtract(2, 'month').startOf('month'), moment().subtract(2, 'month').endOf('month')] : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }}
        alwaysShowCalendars={true}
      >
        <input className={'form-control'} onChange={() => { }} value={arg.selected_date}></input>


      </DateRangePicker>
    </div >
  )
}

let FORMAT = "DD/MM/YYYY"
class FormDatePicker_dev extends Component {
  constructor(props) {
    super(props)
    this.daterangepicker = React.createRef()
    this.onApplyEvent = this.onApplyEvent.bind(this)
    this.state = {
      selected_date: "",
    }
  }

  componentWillMount() {
    let { startDate, endDate, format } = this.props

    let _startDate = ""
    let _endDate = ""
    let _selected_date = ""

    if (startDate && endDate) {
      _selected_date = startDate + " - " + endDate
      _startDate = startDate
      _endDate = endDate
    }
    else if (moment().format("DD/MM/YYYY") == moment().startOf('month').format("DD/MM/YYYY")) {
      _selected_date = moment().subtract(1, 'month').format("DD/MM/YYYY") + " - " + moment().subtract(1, 'day').format('DD/MM/YYYY')
      _startDate = moment().subtract(1, 'month').format("DD/MM/YYYY")
      _endDate = moment().subtract(1, 'day').format('DD/MM/YYYY')
    }
    else {
      _selected_date = moment().startOf('month').format("DD/MM/YYYY") + " - " + moment().subtract(1, 'days').format("DD/MM/YYYY")
      _startDate = moment().startOf('month').format("DD/MM/YYYY")
      _endDate = moment().subtract(1, 'days').format("DD/MM/YYYY")
    }
    this.setState({ startDate: _startDate, endDate: _endDate, selected_date: _selected_date })
    this.props.select_change({
      startDate: moment(_startDate, "DD/MM/YYYY"),
      endDate: moment(_endDate, "DD/MM/YYYY")
    })
  }

  componentWillMount() {
    let { startDate, endDate, format } = this.props

    let _startDate = ""
    let _endDate = ""
    let _selected_date = ""

    if (startDate && endDate) {
      _selected_date = startDate + " - " + endDate
      _startDate = startDate
      _endDate = endDate
    }
    else if (moment().format("DD/MM/YYYY") == moment().startOf('month').format("DD/MM/YYYY")) {
      _selected_date = moment().subtract(1, 'month').format("DD/MM/YYYY") + " - " + moment().subtract(1, 'day').format('DD/MM/YYYY')
      _startDate = moment().subtract(1, 'month').format("DD/MM/YYYY")
      _endDate = moment().subtract(1, 'day').format('DD/MM/YYYY')
    }
    else {
      _selected_date = moment().startOf('month').format("DD/MM/YYYY") + " - " + moment().subtract(1, 'days').format("DD/MM/YYYY")
      _startDate = moment().startOf('month').format("DD/MM/YYYY")
      _endDate = moment().subtract(1, 'days').format("DD/MM/YYYY")
    }
    this.setState({ startDate: _startDate, endDate: _endDate, selected_date: _selected_date })
    this.props.select_change({
      startDate: moment(_startDate, "DD/MM/YYYY"),
      endDate: moment(_endDate, "DD/MM/YYYY")
    })
  }
  onApplyEvent(event, dateObject) {
    let _startDate = dateObject.startDate.format("DD/MM/YYYY")
    let _endDate = dateObject.endDate.format("DD/MM/YYYY")
    let dateDisplay = dateObject.startDate.format("DD/MM/YYYY") + " - " + dateObject.endDate.format("DD/MM/YYYY")

    this.props.select_change(dateObject)
    this.setState({
      startDate: _startDate,
      endDate: _endDate,
      selected_date: dateDisplay
    })
  }

  render() {
    return (
      <DateRangePickers
        onLoad={this.daterangepicker}
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        // startDate={this.props.startDate}
        // endDate={this.props.endDate}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        maxSpan={this.props.maxSpan}
        onApplyEvent={this.onApplyEvent}
        selected_date={this.state.selected_date}
        timePicker={this.props.timePicker}
      >
      </DateRangePickers>
    )
  }
}
export default FormDatePicker_dev;
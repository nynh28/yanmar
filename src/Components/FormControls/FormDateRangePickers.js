import React, { Component } from 'react'
import { useTranslation } from 'react-i18next'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';

let FORMAT = "DD/MM/YYYY"

const DateRangePickers = (arg) => {
  // console.log('TEST_DateRangePickers')
  const { t } = useTranslation()
  // console.log('TEST_CALENDAR', t('calendar_1'), t("calendar_12"))
  return (
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
      // ref={arg.daterangepicker}
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
        moment(arg.startDate, arg.format || FORMAT) :
        moment().format(arg.format || FORMAT) == moment().startOf('month').format(arg.format || FORMAT) ?
          moment().subtract(1, 'month').format(arg.format || FORMAT) :
          moment().startOf('month').format(arg.format || FORMAT)
      }
      endDate={typeof arg.endDate != 'undefined' ?
        moment(arg.endDate, arg.format || FORMAT) :
        moment().format(arg.format || FORMAT) == moment().startOf('month').format(arg.format || FORMAT) ?
          moment().subtract(1, 'day').format(arg.format || FORMAT) :
          moment().subtract(1, 'days').format(arg.format || FORMAT)
      }
      minDate={arg.minDate && moment(arg.minDate, arg.format || FORMAT)}
      maxDate={arg.maxDate && moment(arg.maxDate, arg.format || FORMAT)}
      showDropdowns={true}
      onApply={arg.onApplyEvent}
      // ranges={{
      //   [t('calendar_1')]: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      //   [t('calendar_2')]: [moment().subtract(8, 'days').startOf('week'), moment().subtract(8, 'days').endOf('week')],
      //   [t('calendar_3')]: moment().format(arg.format || FORMAT) == moment().startOf('month').format(arg.format || FORMAT) ? [moment().subtract(1, 'month'), moment().subtract(1, 'days')] : [moment().startOf('month'), moment().subtract(1, 'days')],
      //   [t('calendar_4')]: moment().format(arg.format || FORMAT) == moment().startOf('month').format(arg.format || FORMAT) ? [moment().subtract(2, 'month').startOf('month'), moment().subtract(2, 'month').endOf('month')] : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      // }}
      ranges={{
        "Yesterday": [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        "Last Week": [moment().subtract(8, 'days').startOf('week'), moment().subtract(8, 'days').endOf('week')],
        "This Month": moment().format("DD/MM/YYYY") == moment().startOf('month').format("DD/MM/YYYY") ? [moment().subtract(1, 'month'), moment().subtract(1, 'days')] : [moment().startOf('month'), moment().subtract(1, 'days')],
        "Last Month": moment().format("DD/MM/YYYY") == moment().startOf('month').format("DD/MM/YYYY") ? [moment().subtract(2, 'month').startOf('month'), moment().subtract(2, 'month').endOf('month')] : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      }}
      alwaysShowCalendars={true}
    >
      <input className={'form-control'}
        value={(!arg.startDate || !arg.endDate) ? ''
          : arg.startDate.format(arg.format || FORMAT) + ' - ' + arg.endDate.format(arg.format || FORMAT)}></input>
    </DateRangePicker>
  )
}

class FormDateRangePickers extends Component {
  constructor(props) {
    super(props)
    this.daterangepicker = React.createRef()
    this.onApplyEvent = this.onApplyEvent.bind(this)

  }

  componentWillMount() {
    let { format } = this.props
    if (this.props.startDate.format(format || FORMAT) === 'Invalid date' || this.props.endDate.format(format || FORMAT) === 'Invalid date') {
      let startDate = moment().startOf('month')
      let endDate = moment().subtract(1, 'days')
      if (moment().format(format || FORMAT) == moment().startOf('month').format(format || FORMAT)) {
        startDate = moment().subtract(1, 'month')
      }
      this.props.onChange(startDate, endDate)
    }

  }
  onApplyEvent(event, dateObject) {
    console.log("dateObject : ", dateObject)
    // console.log('1.', dateObject.startDate.format('YYYY/MM/DD'), dateObject.endDate.format('YYYY/MM/DD'))

    this.props.onChange(dateObject.startDate, dateObject.endDate)
  }
  render() {
    // console.log('TEST_CALENDAR_RENDER')
    return (
      <DateRangePickers
        // onLoad={this.daterangepicker}
        startDate={this.props.startDate}
        endDate={this.props.endDate}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        format={this.props.format}
        onApplyEvent={this.onApplyEvent}
      >
      </DateRangePickers>
    )
  }
}
export default FormDateRangePickers;

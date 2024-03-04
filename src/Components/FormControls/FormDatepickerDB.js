import React, { Component } from 'react'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import { configConsumerProps } from 'antd/lib/config-provider';
import { useTranslation } from 'react-i18next'



const DateRangePickers = (arg) => {
  const { t } = useTranslation()
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
      ref={arg.onLoad}
      // timeZone={'Asia/Bangkok'}
      // firstDayOfWeek={6}
      locale={{
        "applyLabel": t("calendar_26"),
        "cancelLabel": t("calendar_25"),
        // "customRangeLabel":  t("calendar_5"),
        "customRangeLabel": "Custom Range",
        "daysOfWeek": [
          //   t(arg.daysOfWeek[6]),
          //   t(arg.daysOfWeek[0]),
          //   t(arg.daysOfWeek[1]),
          //   t(arg.daysOfWeek[2]),
          //   t(arg.daysOfWeek[3]),
          //   t(arg.daysOfWeek[4]),
          //   t(arg.daysOfWeek[5]),

          // ],
          // [
          t("calendar_12"),
          t("calendar_6"),
          t("calendar_7"),
          t("calendar_8"),
          t("calendar_9"),
          t("calendar_10"),
          t("calendar_11"),
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
        ],
        "firstDay": 0
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
      onApply={arg.onApplyEvent}
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
      <input className={'form-control'} value={arg.selected_date}></input>
    </DateRangePicker>
  )
}


class FormDatePicker_DB extends Component {
  constructor(props) {
    super(props)
    this.daterangepicker = React.createRef()
    this.onApplyEvent = this.onApplyEvent.bind(this)
    this.state = {
      selected_date: typeof this.props.startDate != 'undefined' ?
        this.props.startDate + " - " + this.props.endDate :
        moment().format("DD/MM/YYYY") == moment().startOf('month').format("DD/MM/YYYY") ?
          moment().subtract(1, 'month').format("DD/MM/YYYY") + " - " + moment().subtract(1, 'day').format('DD/MM/YYYY') :
          moment().startOf('month').format("DD/MM/YYYY") + " - " + moment().subtract(1, 'days').format("DD/MM/YYYY")
    }
  }
  onApplyEvent(event, dateObject) {

    this.setState({
      selected_date: dateObject.startDate.format("DD/MM/YYYY") + " - " + dateObject.endDate.format("DD/MM/YYYY")
    }, () => {
      if (typeof this.props.select_change != 'undefined') {
        this.props.select_change(dateObject)
      }
    })
  }
  render() {

    return (
      <DateRangePickers
        onLoad={this.daterangepicker}
        startDate={this.props.startDate}
        endDate={this.props.endDate}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        onApplyEvent={this.onApplyEvent}
        selected_date={this.state.selected_date}
      // daysOfWeek={
      //   this.state.daysOfWeek[this.props.language]
      // }
      >
      </DateRangePickers>
    )
  }
}

export default FormDatePicker_DB;

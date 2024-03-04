import React, { Component } from 'react'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import { configConsumerProps } from 'antd/lib/config-provider';
import { useTranslation } from 'react-i18next'
import { CalendarOutlined } from '@ant-design/icons';
import './Styles/datepicker.css'

const DateRangePickers = (arg) => {
  const { t } = useTranslation()

  // console.log("arg.endDate : ", arg.startDate)
  // console.log("arg.endDate : ", arg.endDate)
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
        onApply={arg.onApplyEvent}
        // ranges={{
        //   [t('calendar_1')]: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        //   [t('calendar_2')]: [moment().subtract(8, 'days').startOf('week'), moment().subtract(8, 'days').endOf('week')],
        //   [t('calendar_3')]: [moment().startOf('month'), moment()],
        //   [t('calendar_4')]: [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        // }}
        ranges={{
          "Yesterday": [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          "Last Week": [moment().subtract(8, 'days').startOf('week'), moment().subtract(8, 'days').endOf('week')],
          "This Month": [moment().startOf('month'), moment()],
          "Last Month": [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }}
        alwaysShowCalendars={true}
      >
        <input className={'form-control'} onChange={() => { }} value={arg.selected_date}></input>


      </DateRangePicker>
    </div>
  )
}

let FORMAT = "DD/MM/YYYY"
class FormDatePicker_dev extends Component {
  constructor(props) {
    super(props)
    this.daterangepicker = React.createRef()
    this.onApplyEvent = this.onApplyEvent.bind(this)
    // this.state = {
    //   selected_date: typeof this.props.startDate != 'undefined' ?
    //     this.props.startDate + " - " + this.props.endDate :
    //     moment().format("DD/MM/YYYY") == moment().startOf('month').format("DD/MM/YYYY") ? moment().subtract(1, 'month').format("DD/MM/YYYY") + " - " + moment().subtract(1, 'day').format('DD/MM/YYYY') :
    //       moment().startOf('month').format("DD/MM/YYYY") + " - " + moment().subtract(1, 'days').format("DD/MM/YYYY")
    // }
    this.state = {
      selected_date: "",

    }
  }
  // onApplyEvent(event, dateObject) {

  //   this.setState({
  //     selected_date: dateObject.startDate.format("DD/MM/YYYY") + " - " + dateObject.endDate.format("DD/MM/YYYY")
  //   }, () => {
  //     if (typeof this.props.select_change != 'undefined') {
  //       this.props.select_change(dateObject)
  //     }
  //   })
  // }

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
    else {
      _startDate = moment().startOf('month').format("DD/MM/YYYY")
      _endDate = moment().format("DD/MM/YYYY")
      _selected_date = _startDate + " - " + _endDate
    }
    // else if (moment().format("DD/MM/YYYY") == moment().startOf('month').format("DD/MM/YYYY")) {
    //   _startDate = moment().subtract(1, 'month').format("DD/MM/YYYY")
    //   _endDate = moment().subtract(1, 'day').format('DD/MM/YYYY')
    // }
    // else {
    //   _startDate = moment().startOf('month').format("DD/MM/YYYY")
    //   _endDate = moment().subtract(1, 'days').format("DD/MM/YYYY")
    // }

    // _startDate = moment().startOf('month').format("DD/MM/YYYY")
    // _endDate = moment().format("DD/MM/YYYY")
    // _selected_date = _startDate + " - " + _endDate

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
        onApplyEvent={this.onApplyEvent}
        selected_date={this.state.selected_date}
      >
      </DateRangePickers>
    )
  }
}
export default FormDatePicker_dev;


// import React, { Component } from 'react'
// import DateRangePicker from 'react-bootstrap-daterangepicker';
// import moment from 'moment';
// import { configConsumerProps } from 'antd/lib/config-provider';

// class FormDatePicker_dev extends Component {
//   constructor(props) {
//     super(props)
//     this.daterangepicker = React.createRef()
//     this.onApplyEvent = this.onApplyEvent.bind(this)
//     this.state = {
//       selected_date: typeof this.props.startDate != 'undefined' ?
//       this.props.startDate + " - " + this.props.endDate :
//       moment().format("DD/MM/YYYY") == moment().startOf('month').format("DD/MM/YYYY") ? moment().subtract(1,'month').format("DD/MM/YYYY") + " - " + moment().subtract(1,'day').format('DD/MM/YYYY') :
//       moment().startOf('month').format("DD/MM/YYYY") + " - " + moment().subtract(1, 'days').format("DD/MM/YYYY")
//     }
//   }
//   componentDidMount() {
//     this.props.select_change({
//       startDate: this.props.startDate ? moment(this.props.startDate, "DD/MM/YYYY") : moment().startOf('month'),
//       endDate: this.props.endDate ? moment(this.props.endDate, "DD/MM/YYYY") : moment().subtract(1, 'days')
//       // startDate: typeof this.props.startDate == 'undefined' ? moment().subtract(6, 'months') : moment(this.props.startDate, "DD/MM/YYYY"),
//       // endDate: typeof this.props.startDate == 'undefined' ? moment() : moment(this.props.endDate, "DD/MM/YYYY")
//     })
//   }
//   onApplyEvent(event, dateObject) {
//     var startDate = dateObject.startDate
//     var endDate = dateObject.endDate
//     this.setState({
//       selected_date: dateObject.startDate.format("DD/MM/YYYY") + " - " + dateObject.endDate.format("DD/MM/YYYY")
//     }, () => {
//       if (typeof this.props.select_change != 'undefined') {
//         this.props.select_change({
//           startDate: startDate,
//           endDate: endDate
//         })
//       }
//     })
//   }
//   render() {
//     return (
//       <DateRangePicker
//         ref={this.daterangepicker}
//         startDate={typeof this.props.startDate != 'undefined' ?
//           moment(this.props.startDate, "DD/MM/YYYY") :
//           moment().format("DD/MM/YYYY") == moment().startOf('month').format("DD/MM/YYYY") ?
//           moment().subtract(1,'month').format("DD/MM/YYYY") :
//           moment().startOf('month').format("DD/MM/YYYY")
//         }
//         endDate={typeof this.props.endDate != 'undefined' ?
//           moment(this.props.endDate, "DD/MM/YYYY") :
//           moment().format("DD/MM/YYYY") == moment().startOf('month').format("DD/MM/YYYY") ?
//           moment().subtract(1,'day').format('DD/MM/YYYY') :
//           moment().subtract(1, 'days').format("DD/MM/YYYY")
//         }
//         minDate={this.props.minDate && moment(this.props.minDate, "DD/MM/YYYY")}
//         maxDate={this.props.maxDate && moment(this.props.maxDate, "DD/MM/YYYY")}
//         showDropdowns={true}
//         onApply={this.onApplyEvent}
//         ranges={{

//           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
//           'Last Week': [moment().subtract(7, 'days'), moment().subtract(1, 'days')],

//           'This Month': moment().format("DD/MM/YYYY") == moment().startOf('month').format("DD/MM/YYYY") ? [moment().subtract(1,'month'), moment().subtract(1,'days')] : [moment().startOf('month'), moment().subtract(1, 'days')],
//           'Last Month': moment().format("DD/MM/YYYY") == moment().startOf('month').format("DD/MM/YYYY") ? [moment().subtract(2, 'month').startOf('month'), moment().subtract(2, 'month').endOf('month')] : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
//         }}
//         alwaysShowCalendars={true}
//       >
//         <input className={'form-control'} value={this.state.selected_date}></input>
//       </DateRangePicker>
//     )
//   }
// }
// export default FormDatePicker_dev;

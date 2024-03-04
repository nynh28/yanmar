import React, { Component } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { CalendarOutlined } from "@ant-design/icons";
import "./Styles/datepicker.css";
import { get } from 'lodash'

const DateRangePickers = (arg) => {
  const { t } = useTranslation();
  let dateLimit = moment.duration(24, "hours")
  let ranges = {}
  if (get(arg, 'disabledDateLimit')) {
    dateLimit = false
    ranges = {
      "Yesterday": [moment().subtract(1, 'days').startOf("day"), moment().subtract(1, 'days').endOf("day")],
      "Last Week": [moment().subtract(8, 'days').startOf('week'), moment().subtract(8, 'days').endOf('week')],
      "This Month": moment().format("DD/MM/YYYY") == moment().startOf('month').format("DD/MM/YYYY") ? [moment().subtract(1, 'month'), moment().subtract(1, 'days').endOf("day")] : [moment().startOf('month'), moment().subtract(1, 'days').endOf("day")],
      "Last Month": moment().format("DD/MM/YYYY") == moment().startOf('month').format("DD/MM/YYYY") ? [moment().subtract(2, 'month').startOf('month'), moment().subtract(2, 'month').endOf('month')] : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    }
  }
  else {
    ranges = {
      Yesterday: [
        moment().subtract(1, "days").startOf("day"),
        moment().subtract(1, "days").endOf("day"),
      ],
      "Last Week": [
        moment().subtract(7, "days").startOf("day"),
        moment().subtract(7, "days").endOf("day"),
      ],
      "Last Month":
        moment().format("DD/MM/YYYY HH:mm:ss") ==
          moment().startOf("month").format("DD/MM/YYYY HH:mm:ss")
          ? [
            moment().subtract(2, "month").startOf("day"),
            moment().subtract(2, "month").endOf("day"),
          ]
          : [
            moment().subtract(1, "month").startOf("day"),
            moment().subtract(1, "month").endOf("day"),
          ]
    }
  }

  return (
    <div className="icon-calendar-ranges">
      <CalendarOutlined />
      <DateRangePicker
        onShow={() => {
          let elms = document.querySelectorAll("li[data-range-key]");
          if (elms.length > 0) {
            if (!dateLimit) {
              elms[0].textContent = t('calendar_1')
              elms[1].textContent = t('calendar_2')
              elms[2].textContent = t('calendar_3')
              elms[3].textContent = t('calendar_4')
              elms[4].textContent = t('calendar_5')
            }
            else {
              elms[0].textContent = t("calendar_1");
              elms[1].textContent = t("calendar_2");
              elms[2].textContent = t("calendar_4");
              elms[3].textContent = t("calendar_5");
            }
          }
        }}
        ref={arg.daterangepicker}
        locale={{
          applyLabel: t("calendar_26"),
          cancelLabel: t("calendar_25"),
          customRangeLabel: "Custom Range",
          daysOfWeek: [
            t("calendar_12"),
            t("calendar_6"),
            t("calendar_7"),
            t("calendar_8"),
            t("calendar_9"),
            t("calendar_10"),
            t("calendar_11"),
          ],
          monthNames: [
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
            t("calendar_24"),
          ],
        }}
        startDate={
          typeof arg.startDate != "undefined"
            ? moment(arg.startDate, "DD/MM/YYYY HH:mm:ss")
            : moment().startOf("day").format("DD/MM/YYYY HH:mm:ss")
        }
        endDate={
          typeof arg.endDate != "undefined"
            ? moment(arg.endDate, "DD/MM/YYYY HH:mm:ss")
            : moment().endOf("day").format("DD/MM/YYYY HH:mm:ss")
        }
        dateLimit={dateLimit}
        minDate={arg.minDate && moment(arg.minDate, "DD/MM/YYYY HH:mm:ss")}
        maxDate={arg.maxDate && moment(arg.maxDate, "DD/MM/YYYY HH:mm:ss")}
        showDropdowns={true}
        onApply={arg.onApplyEvent}
        timePicker24Hour
        timePicker={arg.timePicker || false}
        // ranges={{
        //   Yesterday: [
        //     moment().subtract(1, "days").startOf("day"),
        //     moment().subtract(1, "days").endOf("day"),
        //   ],
        //   "Last Week": [
        //     moment().subtract(7, "days").startOf("day"),
        //     moment().subtract(7, "days").endOf("day"),
        //   ],
        //   "Last Month":
        //     moment().format("DD/MM/YYYY HH:mm:ss") ==
        //       moment().startOf("month").format("DD/MM/YYYY HH:mm:ss")
        //       ? [
        //         moment().subtract(2, "month").startOf("day"),
        //         moment().subtract(2, "month").endOf("day"),
        //       ]
        //       : [
        //         moment().subtract(1, "month").startOf("day"),
        //         moment().subtract(1, "month").endOf("day"),
        //       ],
        // }}
        ranges={ranges}

        alwaysShowCalendars={true}
      >
        <input
          className={"form-control"}
          onChange={() => { }}
          value={arg.selected_date}
        ></input>
      </DateRangePicker>
    </div>
  );
};

const FORMAT = "DD/MM/YYYY HH:mm:ss";
class FormDateTimePicker extends Component {
  constructor(props) {
    super(props);
    this.daterangepicker = React.createRef();
    this.onApplyEvent = this.onApplyEvent.bind(this);
    this.state = {
      selected_date: "",
    };
  }

  // componentDidMount() {
  componentWillMount() {
    const { startDate, endDate } = this.props;
    let _startDate = moment().startOf("day").format(FORMAT);
    let _endDate = moment().endOf("day").format(FORMAT);
    let _selected_date = _startDate + " - " + _endDate;

    if (startDate && endDate) {
      _selected_date = startDate + " - " + endDate;
      _startDate = startDate;
      _endDate = endDate;
    }

    this.setState({
      startDate: _startDate,
      endDate: _endDate,
      selected_date: _selected_date,
    });
    this.props.select_change({
      startDate: moment(_startDate, FORMAT),
      endDate: moment(_endDate, FORMAT),
    });
  }

  componentWillReceiveProps(nextProps) {
    const { startDate, endDate } = nextProps;

    const _startDate = moment(startDate).format(FORMAT);
    const _endDate = moment(endDate).format(FORMAT);
    const _selected_date = _startDate + " - " + _endDate;

    if (startDate && this.props.startDate != startDate) {
      this.setState({
        startDate: _startDate,
        selected_date: _selected_date,
      });
    }

    if (endDate && this.props.endDate != endDate) {
      this.setState({
        endDate: _endDate,
        selected_date: _selected_date,
      });
    }
  }

  onApplyEvent(event, dateObject) {
    const _startDate = dateObject.startDate.format(FORMAT);
    const _endDate = dateObject.endDate.format(FORMAT);
    const dateDisplay = `${_startDate} - ${_endDate}`;

    this.props.select_change(dateObject);
    this.setState({
      startDate: _startDate,
      endDate: _endDate,
      selected_date: dateDisplay,
    });
  }

  render() {
    return (
      <DateRangePickers
        onLoad={this.daterangepicker}
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        onApplyEvent={this.onApplyEvent}
        selected_date={this.state.selected_date}
        timePicker={this.props.timePicker}
        disabledDateLimit={this.props.disabledDateLimit}
      ></DateRangePickers>
    );
  }
}
export default FormDateTimePicker;

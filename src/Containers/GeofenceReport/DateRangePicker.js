import React, { Component } from 'react'
import { connect } from 'react-redux'
import GeofenceReportActions from '../../Redux/GeofenceReportRedux'
import FormDateTimePicker from "../../Components/FormControls/FormDateTimePicker";
import { t } from '../../Components/Translation'
import moment from 'moment';

class DateRangePickerNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: moment().startOf('month').format("DD/MM/YYYY 00:00:00"),
      end_date: moment().format("DD/MM/YYYY 23:59:59")
    }
    this.onApplyEvent = this.onApplyEvent.bind(this);
  }

  componentWillMount() {
    let { dateStart, dateEnd } = this.props
    if (dateStart !== "" || dateEnd !== "") {
      this.setState({
        start_date: moment(dateStart).format("DD/MM/YYYY HH:mm:ss"),
        end_date: moment(dateEnd).format("DD/MM/YYYY HH:mm:ss")
      });
    }
  }

  onApplyEvent(dataObject) {
    const start_date = dataObject.startDate.format("YYYY-MM-DD HH:mm:ss");
    const end_date = dataObject.endDate.format("YYYY-MM-DD HH:mm:ss");
    this.setState({ start_date, end_date });
    this.props.setDateRang(start_date, end_date)
  }

  render() {
    let { start_date, end_date } = this.state

    return (
      <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
        <label className="control-label" style={{ fontWeight: 500 }}>
          {t('date_Range')} :
        </label>
        <FormDateTimePicker
          startDate={start_date}
          endDate={end_date}
          maxDate={moment().endOf("day")}
          select_change={this.onApplyEvent.bind(this)}
          timePicker={true}
          disabledDateLimit={true}
        ></FormDateTimePicker>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  dateStart: state.geofenceReport.dateStart,
  dateEnd: state.geofenceReport.dateEnd,
});

const mapDispatchToProps = (dispatch) => ({
  setDateRang: (dateStart, dateEnd) => dispatch(GeofenceReportActions.setDateRang(dateStart, dateEnd)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DateRangePickerNew)
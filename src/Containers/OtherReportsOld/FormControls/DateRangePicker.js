import React, { Component } from 'react'
import { connect } from 'react-redux'
import OtherReportActions from '../../../Redux/OtherReportRedux'
// import FormDateRangePickers from '../../../Components/FormControls/FormDateRangePickers';
import FormDateTimePicker from "../../../Components/FormControls/FormDateTimePicker";
import './styles.css'
import { t } from '../../../Components/Translation'
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

  // onApplyEvent(startDate, endDate) {
  //   this.props.setDateRang(startDate.format('YYYY/MM/DD'), endDate.format('YYYY/MM/DD'))
  // }
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
    // return (
    //   <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
    //     <label className="control-label" style={{ fontWeight: 500 }}>
    //       {t('date_Range')} :
    //           </label>
    //     <FormDateRangePickers
    //       onChange={this.onApplyEvent.bind(this)}
    //       startDate={moment(dateStart, 'YYYY/MM/DD')}
    //       endDate={moment(dateEnd, 'YYYY/MM/DD')}
    //     >
    //     </FormDateRangePickers>
    //   </div>
    // )

    // console.log("start_date : ", start_date)
    // console.log("end_date : ", end_date)

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
  dateStart: state.otherReport.dateStart,
  dateEnd: state.otherReport.dateEnd,
});

const mapDispatchToProps = (dispatch) => ({
  setDateRang: (dateStart, dateEnd) => dispatch(OtherReportActions.setDateRang(dateStart, dateEnd)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DateRangePickerNew)
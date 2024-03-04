import React, { Component } from 'react'
import { connect } from 'react-redux'
import OtherReportActions from '../../../Redux/OtherReportRedux'
import FormDateRangePickers from '../../../Components/FormControls/FormDateRangePickers';
import { t } from '../../../Components/Translation'
import moment from 'moment';

class DateRangePicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dateStart: '2020/08/01',
      dateEnd: '2020/08/01'
    }

  }

  onApplyEvent = (startDate, endDate) => {

    console.log(startDate.format('YYYY/MM/DD'), endDate.format('YYYY/MM/DD'))
  }

  render() {
    let { dateStart, dateEnd } = this.state

    return (
      <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
        <label className="control-label" style={{ fontWeight: 500 }}>
          {t('date_Range')} :
              </label>
        <FormDateRangePickers
          onChange={this.onApplyEvent.bind(this)}
          startDate={moment(dateStart, 'YYYY/MM/DD')}
          endDate={moment(dateEnd, 'YYYY/MM/DD')}
        >
        </FormDateRangePickers>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  // dateStart: state.otherReport.dateStart,
  // dateEnd: state.otherReport.dateEnd,
});

const mapDispatchToProps = (dispatch) => ({
  // setDateRang: (dateStart, dateEnd) => dispatch(OtherReportActions.setDateRang(dateStart, dateEnd)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DateRangePicker)
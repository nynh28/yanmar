import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import NotificationRedux from '../../Redux/NotificationRedux'
import SaveButton from '../../Components/SaveButton'

import { Background } from 'devextreme-react/range-selector'

// import Images from '../Themes/Images'
// import '../Layouts/css/style5.css'
import { lightBlue } from '@material-ui/core/colors';
import moment from 'moment'



class EventNotification extends Component {

  constructor(props) {
    super(props)
    this.state = {
      arrayDate: []

    }

    // moment.locale('en');


    // this.orderHeaderFilter = this.orderHeaderFilter.bind(this);

  }

  componentWillMount() {
    this.props.getEventData()
  }

  componentDidUpdate(prevProps, nextState) {
    if (prevProps.detailEvent !== this.props.detailEvent && this.props.detailEvent !== null) {
      // console.log(window.location.href.includes('notification/notificationDetail'))
      if (!window.location.href.includes('notification/notificationDetail')) {
        this.props.history.push('notification/notificationDetail')
      }

    }
  }




  onClickDropdown = (id) => {
    this.props.onClickDropdown(id)
  }

  checkDate(data, i) {

    let { arrayDate } = this.state

    let date = new Date(data.dtstart)

    if (arrayDate.includes(moment(date).format('MM-DD-YYYY'))) {
      return this.displayListEvent(data, i, date)
    }
    else {
      arrayDate.push(moment(date).format('MM-DD-YYYY'))

      moment.locale(this.props.language);

      let todayText = ''
      if (moment.locale() === 'th') todayText = '[วันนี้]'
      if (moment.locale() === 'en') todayText = '[Today]'
      if (moment.locale() === 'ja') todayText = 'วันนี้'

      let str = moment(date).calendar(null, {
        // sameDay: moment(date).fromNow(),
        sameDay: todayText,
        lastDay: 'll',
        lastWeek: 'll',
        sameElse: 'll'
      })

      return [
        // Add This ul (19-Dec-2019)
        <li key={'sub-first-li-' + i}>
          <div style={{ padding: '5px 10px', backgroundColor: '#EEEEEE' }}>
            {str}
          </div>
        </li>
        ,
        this.displayListEvent(data, i, date)
      ]

    }




    // this.setState({ dateData: date })

  }


  displayListEvent(data, i, time) {

    return (
      // Add This ul (19-Dec-2019)
      <li key={'sub-second-li-' + i} style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.075)' }}>
        <a onClick={() => this.props.getDetailMessage(data.id)}>
          {data.event_name === 'ความเร็วเกินกำหนด' && <i className="fas fa-exclamation-triangle" style={{ color: 'red' }}></i>}
          {' '}
          {data.vehicle_info !== undefined && data.vehicle_info.licenseplate}: {data.event_name}
          <span className="pull-right text-muted small">
            {moment(time).format('LTS')}
          </span>
        </a>
      </li >
    )

  }


  render() {
    let { events } = this.props
    this.state.arrayDate.length = 0

    console.log("events : ", events)

    return (

      <ul
        className="dropdown-menu dropdown-alerts scroll"
        onClick={() => this.onClickDropdown('notification-li')}
        style={{ maxHeight: "calc(100vh/2)" }}>

        {events === null ?
          <li>
            <SaveButton loading={true}
              name={'Show History'}
              style={{ width: '100%', backgroundColor: '#FFFFFF', borderRadius: 2.5, marginRight: 10 }}
            />
          </li>
          : [events.length === 0 ?
            <li style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.075)' }}>
              <div style={{ padding: '5px 10px', margin: '8px' }}>
                <center>Data Not Found.</center>
              </div>
            </li>
            : events.slice(0, 10).map((data, i) => this.checkDate(data, i)),
          <li>
            <a href="#/notification">
              <center><strong>See All Alerts</strong>
                <i className="fa fa-angle-right"></i></center>
            </a>
          </li>]}

      </ul>

    )
  }
}


const mapStateToProps = (state) => ({
  //   getIDSuccess: state.driver.getIDSuccess,
  events: state.notification.events,
  language: state.versatile.language,
  detailEvent: state.notification.detailEvent,
});

const mapDispatchToProps = (dispatch) => ({
  getEventData: () => dispatch(NotificationRedux.getEventData()),
  getDetailMessage: (id) => dispatch(NotificationRedux.getDetailMessage(id))

});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventNotification))

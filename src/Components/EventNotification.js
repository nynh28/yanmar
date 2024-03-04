import React, { Component } from 'react'
import { connect } from 'react-redux'

import Amplify, { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';
import RealtimeActions from '../Redux/RealtimeRedux'

import { Background } from 'devextreme-react/range-selector'

import Images from '../Themes/Images'
import '../Layouts/css/style5.css'
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
    // this.props.getInitialEventData()
  }

  componentDidUpdate(prevProps, nextState) {

  }




  onClickDropdown = (id) => {
    this.props.onClickDropdown(id)
  }

  checkDate(data, i) {

    let { arrayDate } = this.state

    let date = new Date(data.dtstart)

    if (arrayDate.includes(moment(date).format('l'))) {
      return this.displayListEvent(data, i, date)
    } else {
      arrayDate.push(moment(date).format('l'))

      // moment.locale('en');

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

      return (
        // Add This ul (19-Dec-2019)

        <ul key={'check-date-' + i} style={{ padding: 0 }}>
          <li key={'sub-first-li-' + i}>
            <div style={{ padding: '5px 10px', backgroundColor: '#EEEEEE' }}>
              {str}
            </div>
            {/* <li className="divider" style={{ margin: 0 }} ></li> */}
            {/* // Add ul wrapper li (19-Dec-2019) */}
            <ul>
              <li className="divider" style={{ margin: 0 }} ></li>
            </ul>
            {this.displayListEvent(data, i, date)}
          </li>
        </ul>
      )

    }




    // this.setState({ dateData: date })

  }


  displayListEvent(data, i, time) {

    return (
      // Add This ul (19-Dec-2019)
      <ul key={"display-list-event-" + i} style={{ padding: 0 }}>
        <li key={'sub-second-li-' + i}>
          {/* <a> */}
          <div style={{ padding: '5px 10px', margin: '8px' }}>
            {data.event_name === 'เร่งกระทันหัน' && <i className="fas fa-exclamation-triangle" style={{ color: 'red' }}></i>}{' '}{data.vehicle_info !== undefined && data.vehicle_info.licenseplate}: {data.event_name}
            <span className="pull-right text-muted small">
              {moment(time).format('LTS')}
            </span>

          </div>
          {/* </a> */}
          {/* <li key={"sub2-second-li-" + i} className="divider" style={{ margin: 0 }} ></li> */}
          {/* // Add ul wrapper li (19-Dec-2019) */}
          <ul>
            <li key={"sub2-second-li-" + i} className="divider" style={{ margin: 0 }} ></li>
          </ul>
        </li >
      </ul>
    )

  }


  render() {
    let { events } = this.props
    this.state.arrayDate.length = 0
    return (

      <ul className="dropdown-menu dropdown-alerts scroll" onClick={() => this.onClickDropdown('notification')}
        style={{ maxHeight: window.innerHeight / 2 }}>

        {events && events.map((data, i) => this.checkDate(data, i))}
        {events.length === 0 ? <div className="text-center link-block">No message</div>
          : events.length <= 4 ? <div className="text-center link-block"></div>
            :
            <li>
              <div className="text-center link-block">
                <a>
                  <strong>See All Alerts</strong>
                  <i className="fa fa-angle-right"></i>
                </a>
              </div>
            </li>
        }



      </ul>

    )
  }
}


const mapStateToProps = (state) => ({
  //   getIDSuccess: state.driver.getIDSuccess,
  events: state.realtime.events
});

const mapDispatchToProps = (dispatch) => ({
  getInitialEventData: () => dispatch(RealtimeActions.getInitialEventData())

});


export default connect(mapStateToProps, mapDispatchToProps)(EventNotification)

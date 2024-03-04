import React, { Component } from 'react';
import { connect } from 'react-redux'
import ImagesHino from '../../../Themes/Images'
import Images from '../icons/Images'
import { momentDate, calculateToDuration, calculateToTimestamp } from '../../../Functions/DateMoment'
import MapPrint from './MapPrint'
import moment from 'moment-timezone';
import { t } from '../../../Components/Translation'

import { get } from 'lodash'

const formatDate = 'DD MMM YYYY (ddd) HH:mm'

const rowStart = [<span className="action-icon startstop-action" key='span-print-start' style={{ paddingTop: 3, marginRight: 5 }}><i className="fas fa-arrow-down" /></span>, t('start_trip')]
const rowEnd = [<span className="action-icon startstop-action" key='span-print-end' style={{ paddingTop: 3, marginRight: 5 }}><i className="far fa-flag" /></span>, t('end_trip')]

class Print extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidUpdate(prevProps, nextState) {

  }

  actionIcon(code) {
    return (
      code == 2 ?
        [<img src={Images.iconParking} style={{ marginRight: 5 }} />, t('parking')] :
        code == 3 ?
          [<img src={Images.iconIdling} style={{ marginRight: 5 }} />, t('idling')] :
          code == 4 ?
            [<img src={Images.iconMoving} style={{ marginRight: 5 }} />, t('moving')] :
            code == 5 ?
              [<img src={Images.iconOverSpeed} style={{ marginRight: 5 }} />, t('over_speed')] : ''
    )
  }

  setFormatTable(index, icon, time, name = '', routeLength = '', duration = '', location = '') {
    if (index === 'start' || index === 'end') {
      return (
        <tr key={'tr-print-' + index}>
          <td colSpan="2">{time}</td>
          {/* <td>{name}</td> */}
          <td colSpan="3">{icon}</td>
          {/* <td align="right">{routeLength}</td>
        <td align="right">{duration}</td>
        <td>{location}</td> */}
        </tr>
      )
    } else {
      return (
        <tr key={'tr-print-' + index}>
          <td>{time}</td>
          <td>{name}</td>
          <td>{icon}</td>
          <td align="right">{routeLength}</td>
          <td align="right">{duration}</td>
          <td>{location}</td>
        </tr>
      )

    }

  }

  setDataRow(item, index) {

    let icon = this.actionIcon(item[21])
    let timeStart = momentDate(item[0])
    let timeStop = momentDate(item[1])
    let name = get(item, '[27][2]', '-')
    let routeLength = (get(item, '[25]', 0) / 1000).toFixed(2) + ' km'
    let duration = calculateToDuration(get(item, '[26]', 0))
    let location = get(item, '[29][0][19]', '-') + ' ' +
      get(item, '[29][0][20]', '') + ' ' +
      get(item, '[29][0][21]', '')


    if (index === 0 && index === this.props.dataHistory.trips.length - 1) {
      return [
        this.setFormatTable('start', rowStart, timeStart),
        this.setFormatTable(index, icon, timeStart, name, duration, location),
        this.setFormatTable('end', rowEnd, timeStop)
      ]
    }
    else if (index === 0) {
      return [
        this.setFormatTable('start', rowStart, timeStart),
        this.setFormatTable(index, icon, timeStart, name, routeLength, duration, location)
      ]
    }
    else if (index === this.props.dataHistory.trips.length - 1) {
      return [
        this.setFormatTable(index, icon, timeStart, name, routeLength, duration, location),
        this.setFormatTable('end', rowEnd, timeStop)
      ]
    }
    else {
      return this.setFormatTable(index, icon, timeStart, name, routeLength, duration, location)
    }
  }

  render() {

    let { dataHistory, strDataTime, imgMap, language } = this.props
    // console.log(dataHistory)
    // let { vehicle_name } = dataHistory

    // console.log(strDataTime)
    // console.log(momentDate(strDataTime.start))
    // console.log(momentDate(strDataTime.end))
    // let strDateTimeStart = calculateToTimestamp(dateTimeStart.dateStart, dateTimeStart.timeStart)
    // let stringDataTime = 'd'
    let stringDataTime = momentDate(strDataTime.start, formatDate, undefined, language) + ' - '
      + momentDate(strDataTime.end, formatDate, undefined, language)


    // console.log('imgMap:', imgMap)

    return (
      <div className='print' key='div-print-1' id='ifmcontentstoprint'>
        <div className="page" size="A4" key='div-print-2'>
          <div style={{ height: '50px', width: '100%', alignItems: 'center', padding: '0px 0px 10px' }}>
            <div className="pull-left">
              <img alt="image" src={ImagesHino.HinoConnectClear} style={{ width: '150px' }} />
            </div>
            <div className="pull-right" style={{ textAlign: 'right' }}>
              <p>{t('license_plate')} : {get(dataHistory, 'info.licenseplate', '-')}{'  '}{t('driver')}: {get(dataHistory, 'info.driver', '-')}</p>
              <p>{t('date_and_time')} : {stringDataTime}</p>
            </div>
          </div>

          <div style={{ width: '100%' }}>
            <img src={imgMap} key='img-map-print' style={{ width: 900 }}></img>
            {/* <MapPrint /> */}
          </div>


          <div className="table-print" style={{ marginTop: 10 }} key='div-print-3'>

            <table key='table-print'>
              <thead>
                <tr>
                  {/* <th style={{ width: 150 }}><i className="far fa-calendar-alt"></i>{' '}{dateTime[language]}</th>
                  <th style={{ width: 120 }}><i className="fas fa-user"></i>{' '}{driver[language]}</th>
                  <th style={{ width: 120 }}><i className="fas fa-flag"></i>{' '}{event[language]}</th>
                  <th style={{ width: 130 }}><i className="fas fa-car"></i>{' '}{routeLength[language]}</th>
                  <th style={{ width: 100 }}><i className="fa fa-clock-o"></i>{' '}{duration[language]}</th>
                  <th ><i className="fas fa-location-arrow"></i>{' '}{location[language]}</th> */}
                  <th><i className="far fa-calendar-alt"></i>{' '}{t('date_and_time')}</th>
                  <th><i className="fas fa-user"></i>{' '}{t('driver')}</th>
                  <th><i className="fas fa-flag"></i>{' '}{t('event')}</th>
                  <th><i className="fas fa-car"></i>{' '}{t('total_distance')}</th>
                  <th><i className="fa fa-clock-o"></i>{' '}{t('duration')}</th>
                  <th><i className="fas fa-location-arrow"></i>{' '}{t('location')}</th>
                </tr>
              </thead>
              <tbody key='tbody-print'>
                {get(dataHistory, 'trips', null) !== null &&
                  dataHistory.trips.map((item, index) => {
                    return this.setDataRow(item, index)

                  })}

              </tbody>
            </table>

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  imgMap: state.history.imgMap,
  language: state.versatile.language,
  // tailGroup: state.history.tailGroup,
  // tailActiveID: state.history.tailActiveID
});
const mapDispatchToProps = (dispatch) => ({
  // setFocusPosition: (lat, lng) => dispatch(HistoryActions.setFocusPosition(lat, lng))
});


export default connect(mapStateToProps, mapDispatchToProps)(Print)

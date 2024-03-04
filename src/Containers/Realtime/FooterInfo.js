import React, { Component } from 'react'
import { connect } from 'react-redux'
import RealtimeActions from '../../Redux/RealtimeRedux'

// import './Styles/stylesfooter.css'
import './Styles/animation.css'
import './Styles/fontello-codes.css'
import './Styles/fontello-embedded.css'
import './Styles/fontello-ie7-codes.css'
import './Styles/fontello-ie7.css'
import './Styles/fontello.css'

import './font/fontello.eot'
import './font/fontello.svg'
import './font/fontello.ttf'
import './font/fontello.woff'
import './font/fontello.woff2'
import { Row } from "reactstrap";
import { isEmpty } from 'react-redux-firebase'
import images from './icons/Images'
import { statusColor, statusName } from './StatusVehicle'
import { momentDate, calculateToDuration } from '../../Functions/DateMoment'
import { formatMath, numberWithComma } from '../../Functions/Calculation'
import { get, isEqual } from 'lodash'
import $ from 'jquery'
import { t } from '../../Components/Translation'

class FooterInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkhide: 0
    }
  }


  checkScroll() {
    let sX = document.getElementById('scrollx')
    // console.log('checkScroll', sX.scrollWidth - sX.clientWidth, sX.scrollLeft)
    if (sX.scrollLeft === 0) this.setState({ checkhide: 0 })
    else if (sX.scrollWidth - sX.clientWidth <= sX.scrollLeft) this.setState({ checkhide: 2 })
    else if (this.state.checkhide !== 1) this.setState({ checkhide: 1 })
  }

  slideScrollX(num) {
    let sX = document.getElementById('scrollx')
    sX.scrollLeft += (num * 600);
    if (sX.scrollLeft === 0) this.setState({ checkhide: 0 })
    else if (sX.scrollWidth - sX.clientWidth <= sX.scrollLeft) this.setState({ checkhide: 2 })
    else if (this.state.checkhide !== 1) this.setState({ checkhide: 1 })
  }

  getLocation(place, node) {

    let name = get(this.props.information, node, "")
    if (name !== "") place += name + " "
    return place
  }

  componentDidMount() {
    // console.log('footer-info-colaps', $(`#footer-info-colaps`))
    this._onCollapseComponent()
  }

  componentDidUpdate(prevProps, nextState) {
    let { hideFooter } = this.props
    if (prevProps.hideFooter !== hideFooter) {
      this._onCollapseComponent()
    }
  }

  _onCollapseComponent = () => {
    let { hideFooter } = this.props
    let myibox2 = $(`#footer-info-colaps`)
    if (myibox2) {
      if (hideFooter) myibox2.slideUp()
      else myibox2.slideDown()
      // myibox2.slideToggle(600);
    }
  }

  colorAndNameBatt(batt_b_level) {
    return batt_b_level === 4 ? ["demo-icon icon-battery-4", "#4CD964"]
      : batt_b_level === 3 ? ["demo-icon icon-battery-3", "#FFCC00"]
        : batt_b_level === 2 ? ["demo-icon icon-battery-1", "#FF9500"]
          : ["demo-icon icon-battery-0", "#FF3B30"]
  }

  onOff(data) {
    return data == '0' ? 'realtime_51'
      : data === '1' ? 'realtime_50'
        : "-"
  }


  render() {
    let { information, hideFooter, tabsRealtime, language } = this.props

    let place = ""
    if (language === 'en') {
      place = this.getLocation(place, 'gps.location.admin_level3_name_en')
      place = this.getLocation(place, 'gps.location.admin_level2_name_en')
      place = this.getLocation(place, 'gps.location.admin_level1_name_en')
    }
    else {
      place = this.getLocation(place, 'gps.location.admin_level3_name')
      place = this.getLocation(place, 'gps.location.admin_level2_name')
      place = this.getLocation(place, 'gps.location.admin_level1_name')
    }
    // console.log("RENDER FOOTER INFO ", information)

    let info = {
      // vehicle: get(information, 'info.licenseplate', null) ? get(information, 'info.vehicle', '') + ' ' + get(information, 'info.licenseplate') : get(information, 'info.vin_no', null),
      vehicle: get(information, 'info.vehicle_name', null) ? get(information, 'info.vehicle_name') : get(information, 'info.licenseplate', null) ? get(information, 'info.licenseplate') : get(information, 'info.vin_no', null),
      gpsdate: momentDate(get(information, 'gps.gpsdate', null)),
      // model: get(information, 'info.model', '-'),
      counterTime: get(information, 'gps.io_time', 'N/A'),
      acc: get(information, 'gps.acc', 'f'),
      dtc_engine: this.onOff(get(information, 'sensor.canbus.dtc_engine')),
      io_color: get(information, 'gps.io_color', '#FFFFFF'),
      odo: formatMath(get(information, 'info.odo', 0)),
      speed: get(information, 'gps.speed', 0),
      engine_hour: get(information, 'gps.engine_hour', 0),
      model_code: get(information, 'info.model_code', '-'),
      rpm: get(information, 'sensor.canbus.rpm', 0),
      nameDriver: get(information, 'driver_cards.name', '') === '' ? get(information, 'driver_cards.card_id') ? get(information, 'driver_cards.card_id', '') : t('realtime_55') : get(information, 'driver_cards.name', ''),
      cardIdDriver: get(information, 'driver_cards.card_id', '') === '' ? t('realtime_56') : get(information, 'driver_cards.card_id', ''),
      typeNameDriver: get(information, 'driver_cards.type_name', '-'),
      statusSwipeCard: get(information, 'driver_cards.status_swipe_card', 0) === 1 ? "#5de648" : get(information, 'driver_cards.status_swipe_card', 0) === 2 ? "#f86c8b" : "#cacaca",
      drivingTime: get(information, 'driving_count.driving', 0),
      sattelliteLevel: get(information, 'gps.sattellite_level', 0),
      sattellitePer: Number(get(information, 'gps.sattellite_per', 0)),
      gsmLevel: get(information, 'gps.gsm_level', "-"),
      gsmPer: Number(get(information, 'gps.gsm_per', "-")),
      deviceStatus: get(information, 'sensor.device_batt', 0) <= 0 ? false : true,
      location: get(information, 'gps.lat', "-") + ', ' + get(information, 'gps.lng', "-"),
      place: place === "" ? "-" : place,
      cooltemp: get(information, 'sensor.canbus.cooltemp', "-"),
      vehicleBattLevel: this.colorAndNameBatt(get(information, 'sensor.vehicle_batt_level')),
      vehicleBatt: get(information, 'sensor.vehicle_batt', "-"),
      deviceBattLevel: this.colorAndNameBatt(get(information, 'sensor.device_batt_level')),
      deviceBatt: get(information, 'sensor.device_batt', "-"),
      accPedal: get(information, 'sensor.canbus.acc_pedal', "-"),
      fuel: get(information, 'sensor.canbus.fuel_per', "-"),
      safetyBelt: this.onOff(get(information, 'sensor.options.safety_belt')),
      doorSensor: this.onOff(get(information, 'sensor.options.door_sensor')),
      pto: this.onOff(get(information, 'sensor.options.pto')),
      temp1: get(information, 'sensor.temperatures.sensor1'),
      fuelCons: get(information, 'sensor.canbus.fuel_rate', "") === '' ? '0.0' : get(information, 'sensor.canbus.fuel_rate', ""),
      exhaustBrake: this.onOff(get(information, 'sensor.canbus.exhaust_brake')),
      clutchStatus: this.onOff(get(information, 'sensor.canbus.clutch_switch')),
      brakeStatus: this.onOff(get(information, 'sensor.canbus.foot_brake')),
      insurance: get(information, 'Maintenance.Insurance', "") !== '' ? get(information, 'Maintenance.Insurance', "") : '-',
      tiresService: get(information, 'Maintenance.Tires_Service', "") !== '' ? get(information, 'Maintenance.Tires_Service', "") : '-',
      nextService: get(information, 'Maintenance.Next_service', "-")
    }



    return (!isEmpty(information) &&

      <Row style={{ margin: '0px -10px -15px 0px' }}>
        <div div style={{ width: 80 }}>
          <div style={{ backgroundColor: 'white', cursor: 'pointer', boxShadow: '0px -2px 6px rgba(0,0,0,0.3)', width: '100%', borderRadius: '0px 4px 0px 0px', height: 25 }}
            onClick={() => {
              this.props.setHideFooter()
              // this._onCollapseComponent()
            }}><center><i className={"fa " + (hideFooter ? "fa-chevron-up" : "fa-chevron-down")}></i></center></div>
        </div>

        {/* {!hideFooter && */}
        <div id="footer-info-colaps" style={{ display: hideFooter && 'none' }}>


          {/* Button */}
          {this.state.checkhide === 0 ?
            [//<i className='fa fa-chevron-left arrow-scroll' style={{ left: 0, color: "white", boxShadow: 0 }} ></i>,
              <i className='fa fa-chevron-right arrow-scroll' style={{ right: 0 }} onClick={() => this.slideScrollX(1)} ></i>]
            : this.state.checkhide === 1 ?
              [<i className='fa fa-chevron-left arrow-scroll' style={{ left: 0 }} onClick={() => this.slideScrollX(-1)}  ></i>,
              <i className='fa fa-chevron-right arrow-scroll' style={{ right: 0 }} onClick={() => this.slideScrollX(1)} ></i>]
              :
              [<i className='fa fa-chevron-left arrow-scroll' style={{ left: 0 }} onClick={() => this.slideScrollX(-1)}  ></i>]
          }


          <div id='scrollx' className="scrollfooter"
            onScroll={() => this.checkScroll()}
            style={{
              backgroundColor: 'white',
              padding: '5px 30px 5px 10px',
              boxShadow: '0 2px 6px rgba(0,0,0,.3)',
              flexDirection: 'row', display: 'flex',
              position: 'relative',
              height: 200,
              // marginLeft: 20,
              // marginRight: 30
            }}>

            <div style={{ flexDirection: 'row', display: 'flex' }}>
              <div className="b-r table-tan" style={{ minWidth: 500 }}>

                <b style={{ fontSize: 16 }} >{t("realtime_9")} : {info.vehicle}</b><br />
                <small style={{ color: '#B2BABB' }} >{info.gpsdate}</small><br />
                <small><b> {t("realtime_10")} : {info.model_code}</b>  </small>

                <table style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th colspan="6">
                        <i className="fa fa-circle" style={{ color: statusColor(information), paddingRight: 8 }} />
                        <small style={{ paddingRight: 5 }}><b>{t(statusName(information))}</b></small>
                        <small>{info.counterTime !== 'N/A' && ['(', calculateToDuration(Number(info.counterTime), 'hideSec'), ')']}</small>
                      </th>
                    </tr>

                    <tr>
                      <th><i className="icon-gauge-1" style={{ paddingRight: 4, marginLeft: -3 }} /><small>{t("realtime_11")}</small></th>
                      <th style={{ textAlign: 'right', paddingRight: 5 }}><small>{info.speed}</small></th>
                      <th><small>{t("realtime_41")}</small></th>
                      <th><i className="icon-road-1" style={{ paddingRight: 4 }} /><small>{t("realtime_12")}</small></th>
                      <th style={{ textAlign: 'right', paddingRight: 5 }}><small>{info.odo}</small></th>
                      <th><small>{t("realtime_43")}</small></th>
                    </tr>

                    <tr>
                      <th><i className="demo-icon icon-onetrack--icon-01" style={{ paddingRight: 9, marginLeft: -4, fontSize: 13 }} /><small>{t("realtime_13")}</small></th>
                      <th style={{ textAlign: 'right', paddingRight: 5 }}><small>{numberWithComma(info.rpm)}</small></th>
                      <th><small>{t("realtime_42")}</small></th>

                      <th><i className="icon-group-10971" style={{ paddingRight: 5 }} /><small>{t("realtime_14")}</small></th>
                      <th style={{ textAlign: 'right', paddingRight: 5 }}><small>{info.model_code !== 'FM1AN1D-SHT' ? numberWithComma(info.engine_hour) : '-'}</small></th>
                      <th><small>{info.model_code !== 'FM1AN1D-SHT' && t("realtime_44")}</small></th>
                    </tr>

                    <tr>
                      <th colspan="6">
                        <img src={images.Tire_pressure_sensor_not_install4} alt="" style={{ width: 15, height: 15, marginLeft: 2 }} />
                        {' '}
                        <small>
                          <a >{t("realtime_15")}</a>
                          {/* <a style={{ color: '#B2BABB', cursor: 'default' }}> <small>Tire pressure sensor not install</small></a> */}
                        </small>
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>

              {/* ------------- Driver ------------- */}
              <div className="b-r table-tan" style={{ minWidth: 320 }}>
                <b style={{ fontSize: 16 }} >{t("realtime_16")}</b><br /><br />
                <table className='table table-borderless' style={{ width: '100%' }}>
                  <tr>
                    <th rowspan="3" style={{ width: 80 }}><img alt="image" className="img-circle" src={images.DriverAvatar} style={{ width: 70, height: 70 }} /></th>
                    <th><small><b>{info.nameDriver}</b></small></th>
                  </tr>
                  <tr>
                    <th><i className="demo-icon icon-credit-card" style={{ paddingRight: 4, color: info.statusSwipeCard }}></i><small><b style={{ color: '#A3A5A2' }}>{info.cardIdDriver}</b></small></th>
                  </tr>
                  <tr>
                    <th> <small><b>{info.typeNameDriver}</b></small></th>
                  </tr>
                  <tr>
                    <th></th>
                    <th><i className="icon-routes-01" style={{ paddingRight: 4 }} /><small>{t("realtime_17")} {calculateToDuration(info.drivingTime, 'drivingTime')}</small></th>
                  </tr>
                </table>
              </div>

              {/* ------------- GPS Status ------------- */}
              <div className="b-r table-tan" style={{ minWidth: 450 }}>
                <table className='table table-borderless' style={{ width: '100%' }}>
                  <thead>
                    <th>
                      <b style={{ fontSize: 16 }} > {t("realtime_18")}</b>
                    </th>
                  </thead>
                </table>

                <table className='table table-borderless' style={{ width: '100%' }}>
                  <tr>
                    <th>
                      {
                        info.sattelliteLevel === 4 ?
                          <div> <i className="demo-icon icon-005-wifi-2" style={{ color: "#4CD964", paddingRight: 4 }} /><small>{t("realtime_19")}</small></div>
                          : info.sattelliteLevel === 3 ?
                            <div><i className="demo-icon icon-009-wifi-4" style={{ color: "#FFCC00", paddingRight: 4 }} /><small>{t("realtime_19")}</small></div>
                            : info.sattelliteLevel === 2 ?
                              <div><i className="demo-icon icon-007-wifi-3" style={{ color: "#FF6800", paddingRight: 4 }} /><small>{t("realtime_19")}</small></div>
                              :
                              <div><i className="demo-icon icon-001-wifi" style={{ color: "#FF3B30", paddingRight: 4 }} /><small>{t("realtime_19")}</small></div>
                      }
                    </th>
                    <th>
                      <small>{info.sattellitePer} {t("realtime_47")}</small>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      {
                        info.gsmLevel === 4 ?
                          <div> <i className="icon-cell-4-01" style={{ color: "#4CD964", paddingRight: 4 }} /><small>{t("realtime_20")}</small></div>
                          : info.gsmLevel === 3 ?
                            <div><i className="icon-006-high" style={{ color: "#FFCC00", paddingRight: 4 }} /><small>{t("realtime_20")}</small></div>
                            : info.gsmLevel === 2 ?
                              <div><i className="icon-008-cell-1" style={{ color: "#FF6800", paddingRight: 4 }} /><small>{t("realtime_20")}</small></div>
                              :
                              <div><i className="icon-010-wifi-5" style={{ color: "#FF3B30", paddingRight: 4 }} /><small>{t("realtime_20")}</small></div>
                      }
                    </th>
                    <th >
                      <small>{info.gsmPer}  {t("realtime_47")}</small>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <i className="icon-device" style={{ paddingRight: 12, fontSize: 10 }} /> <small>{t("realtime_21")}</small>
                    </th>
                    <th >
                      {info.deviceStatus ?
                        <small >{t("realtime_50")}</small> :
                        <small style={{ color: 'red' }}>{t("realtime_52")}</small>
                      }<br />
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <i className="icon-map-marker-alt" style={{ paddingRight: 4 }} /> <small>{t("realtime_22")}</small>
                    </th>
                    <th >
                      <small >{info.location}</small><br />
                    </th>
                  </tr>
                  <tr>
                    <th colspan="2">
                      <i className="icon-globe" style={{ paddingRight: 12 }} /><small>{info.place}</small>
                    </th>
                  </tr>
                </table>
              </div>

              {/* ------------- Sensors & Switches ------------- */}
              <div className="b-r table-tan" style={{ minWidth: 650 }}>
                {/* <b style={{ fontSize: 16 }} > {t("realtime_23")}</b><br /><br /> */}
                <table className='table table-borderless' style={{ width: '100%' }}>
                  <thead>
                    <th>
                      <b style={{ fontSize: 16 }} > {t("realtime_23")}</b>
                    </th>
                  </thead>
                </table>

                <table style={{ width: '100%' }}>
                  <thead>
                    {/* 1 */}
                    <tr>

                      {/* Fuel Consumption */}
                      <th><i className="demo-icon icon-water" style={{ paddingRight: 4 }} /><small>{t("realtime_24")}</small></th>
                      {/* <th style={{ textAlign: 'right', paddingRight: 5 }}> <small>{info.fuelCons}</small></th> */}
                      <th style={{ textAlign: 'right', paddingRight: 5 }}><small>  {(this.props.dataLogin.userId == 2656 || this.props.dataLogin.userId == 2657) ? "N/A" : info.fuelCons}</small></th>
                      <th className='border-right-sensor'> <small>{t("realtime_46")}</small></th>

                      {/* Vehicle Battery */}
                      <th><i className={info.vehicleBattLevel[0]} style={{ color: info.vehicleBattLevel[1], paddingRight: 4 }} /><small>{t("realtime_29")} </small></th>
                      <th style={{ textAlign: 'right', paddingRight: 5 }}><small>   {info.vehicleBatt}</small></th>
                      <th className='border-right-sensor'><small>{t("realtime_49")}</small></th>

                      {/* Brake */}
                      <th><i className="icon-break" style={{ paddingRight: 4 }} /><small>{t("realtime_34")}</small></th>
                      <th style={{ textAlign: 'right', paddingRight: 5 }}> <small>{t(info.brakeStatus)}</small></th>
                      <th> <small></small></th>

                    </tr>

                    {/* 2 */}
                    <tr>

                      {/* Acceleration pedal */}
                      <th><i className="icon-racing" style={{ paddingRight: 4 }} /><small>{t("realtime_25")}</small></th>
                      <th style={{ textAlign: 'right', paddingRight: 5 }}><small>{info.accPedal}</small></th>
                      <th className='border-right-sensor'><small>{t("realtime_47")}</small></th>

                      {/* {t("realtime_30")} */}
                      <th><i className={info.deviceBattLevel[0]} style={{ color: info.deviceBattLevel[1], paddingRight: 4 }} /><small>{t("realtime_30")} </small></th>
                      <th style={{ textAlign: 'right', paddingRight: 5 }}><small> {info.deviceBatt}</small></th>
                      <th className='border-right-sensor'><small> {t("realtime_49")}</small></th>

                      {/* Exhaust Brake */}
                      <th><i className="demo-icon icon-exhaust" style={{ paddingRight: 4 }} /><small>{t("realtime_35")}</small></th>
                      <th style={{ textAlign: 'right', paddingRight: 5 }}><small>{t(info.exhaustBrake)} </small>  </th>
                      <th><small></small></th>

                    </tr>

                    {/* 3 */}
                    <tr>

                      {/* Fuel Tank Level */}
                      <th><i className="demo-icon icon-fuel" style={{ paddingRight: 4 }} /><small>{t("realtime_26")}</small></th>
                      <th style={{ textAlign: 'right', paddingRight: 5 }}> <small> {info.fuel}</small></th>
                      <th className='border-right-sensor'> <small>{t("realtime_47")}</small></th>

                      {/* {t("realtime_31")} */}
                      <th><i className="demo-icon icon-safety-belt" style={{ paddingRight: 4 }} /><small >{t("realtime_31")}</small></th>
                      <th style={{ textAlign: 'right', paddingRight: 5 }}> <small>{t(info.safetyBelt)}</small> </th>
                      <th className='border-right-sensor'><small></small></th>

                      {/* Clutch */}
                      <th><i className="icon-onetrack--icon-1" style={{ paddingRight: 4 }} /><small>{t("realtime_36")}</small></th>
                      <th style={{ textAlign: 'right', paddingRight: 5 }}><small>{t(info.clutchStatus)}</small></th>
                      <th><small></small></th>

                    </tr>

                    {/* 4 */}
                    <tr>

                      {/* Coolant Temperature */}
                      <th><i className="demo-icon icon-coolant" style={{ paddingRight: 4 }} /><small>{t("realtime_27")}</small></th>
                      <th style={{ textAlign: 'right', paddingRight: 5 }}> <small>{info.cooltemp}</small></th>
                      <th className='border-right-sensor'> <small>{t("realtime_48")}</small></th>

                      {/* Door Sensor */}
                      <th><i className="demo-icon icon-doorsensorsvg" style={{ paddingRight: 4 }} /><small >{t("realtime_32")}</small></th>
                      <th style={{ textAlign: 'right', paddingRight: 5 }}><small> {t(info.doorSensor)} </small></th>
                      <th className='border-right-sensor'><small></small></th>

                      {/* {t("E/G Check Lamp")} */}
                      {
                        (this.props.dataLogin.userId == 2656 || this.props.dataLogin.userId == 2657) && [
                          <th ><i className="demo-icon icon-engine-01" style={{ paddingRight: 4 }} /><small>{t("realtime_28")}</small></th>,
                          <th style={{ textAlign: 'right', paddingRight: 5, color: info.dtc_engine === 'realtime_50' && 'red' }}> <small> {t(info.dtc_engine)}</small></th>,
                          <th><small></small></th>
                        ]
                      }

                    </tr>

                    {/* 5 */}
                    <tr>

                      {/* Coolant Temperature */}
                      {
                        (this.props.dataLogin.userId == 2656 || this.props.dataLogin.userId == 2657) ? [
                          <th><i className="icon-temperatire icon-new-icon-07" style={{ paddingRight: 4 }} /><small>{t("realtime_108")}</small></th>,
                          <th style={{ textAlign: 'right', paddingRight: 5 }}> <small>{info.temp1}</small></th>,
                          <th className='border-right-sensor'> <small>{t("realtime_48")}</small></th>,
                        ] :
                          [
                            <th th ><i className="demo-icon icon-engine-01" style={{ paddingRight: 4 }} /><small>{t("realtime_28")}</small></th>,
                            <th style={{ textAlign: 'right', paddingRight: 5, color: info.dtc_engine === 'realtime_50' && 'red' }}> <small> {t(info.dtc_engine)}</small></th>,
                            <th><small></small></th>
                          ]
                      }


                      {/* {t("PTO")} */}
                      <th><i className="demo-icon icon-engine-01" style={{ paddingRight: 4 }} /><small>{t("realtime_33")}</small></th>
                      <th style={{ textAlign: 'right', paddingRight: 5 }}> <small> {t(info.pto)}</small></th>
                      <th className='border-right-sensor'><small></small></th>

                    </tr>

                  </thead>
                </table>
              </div>

              <div className="b-r table-tan" style={{ minWidth: 320 }}>
                {/* <b style={{ fontSize: 16 }} > {t("realtime_37")}</b><br /><br /> */}
                <table className='table table-borderless' style={{ width: '100%' }}>
                  <thead>
                    <th>
                      <b style={{ fontSize: 16 }} > {t("realtime_37")}</b>
                    </th>
                  </thead>
                </table>

                <table style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th><i className="icon-business" style={{ paddingRight: 4 }} /><small>{t("realtime_38")}</small></th>
                      <th><small style={{ color: '#A3A5A2' }}>{t("realtime_92")}</small></th>
                      <th style={{ textAlign: 'right' }}><small style={{ color: '#A3A5A2' }}>{info.insurance}</small></th>
                      <th><small style={{ color: '#A3A5A2' }}>{t("realtime_53")}</small></th>
                    </tr>

                    <tr>
                      <th><i className="icon-edited" style={{ paddingRight: 4 }} /><small >{t("realtime_39")}</small></th>
                      <th><small style={{ color: '#A3A5A2' }}>{t("realtime_92")}</small></th>
                      <th style={{ textAlign: 'right' }}><small style={{ color: '#A3A5A2' }}>{info.tiresService}</small></th>
                      <th><small style={{ color: '#A3A5A2' }}>{t("realtime_53")}</small></th>
                    </tr>

                    <tr>
                      <th><i className="fa fa-cog" style={{ paddingRight: 11 }} /><small>{t("realtime_40")} </small></th>
                      <th colspan="2" style={{ textAlign: 'right' }}><small style={{ color: '#ceb400e0' }}>{numberWithComma(info.nextService)}</small></th>
                      <th><small >{t("realtime_43")}</small></th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>


            {/* {tabsRealtime === 'tabsDriver' &&
              <div style={{ flexDirection: 'row', display: 'flex' }}>
                <div className="b-r table-tan" style={{ minWidth: 870, padding: 5 }}>
                  <b style={{ fontSize: 16 }} > Driver Score (Safety Score)</b><br /><br />
                  <div style={{ flexDirection: 'row', display: 'flex', }}>
                    <div style={{ width: 280 }}>
                      <table style={{ width: '100%' }}>
                        <thead>
                          <tr>
                            <th><small style={{ paddingRight: 85 }}>Overspeed Time (%)</small></th>
                            <th><small style={{ color: '#A3A5A2' }}>5 point</small></th>
                          </tr>

                          <tr>
                            <th><small style={{ paddingRight: 64 }}>Maximum Speed (Km/Hr)</small></th>
                            <th><small style={{ color: '#A3A5A2' }}>5 point</small></th>
                          </tr>

                          <tr>
                            <th><small style={{ paddingRight: 49 }}>Acceleration Pedal (%)</small></th>
                            <th><small style={{ color: '#A3A5A2' }}>5 point</small></th>
                          </tr>

                          <tr>
                            <th><small style={{ paddingRight: 70 }}>RPM Time (%)</small></th>
                            <th><small style={{ color: '#A3A5A2' }}>5 point</small></th>
                          </tr>

                          <tr>
                            <th><small style={{ paddingRight: 32 }}>Acceleration Change (%)</small></th>
                            <th><small style={{ color: '#A3A5A2' }}>5 point</small></th>
                          </tr>
                        </thead>
                      </table>
                    </div>

                    <div style={{ width: 280, marginLeft: 10 }}>
                      <table style={{ width: '100%' }}>
                        <thead>
                          <tr>
                            <th><small >RPM Count (Time)</small></th>
                            <th><small style={{ color: '#A3A5A2' }}>5 point</small></th>
                          </tr>

                          <tr>
                            <th><small>HASH Start (Times)</small></th>
                            <th><small style={{ color: '#A3A5A2' }}>5 point</small></th>
                          </tr>

                          <tr>
                            <th><small >HASH Start (Time)</small></th>
                            <th><small style={{ color: '#A3A5A2' }}>5 point</small></th>
                          </tr>

                          <tr>
                            <th><small>HASH Acceleration (Times)</small></th>
                            <th><small style={{ color: '#A3A5A2' }}>5 point</small></th>
                          </tr>

                          <tr>
                            <th><small >HASH Acceleration (Time)</small></th>
                            <th><small style={{ color: '#A3A5A2' }}>5 point</small></th>
                          </tr>
                        </thead>
                      </table>

                    </div>
                    <div style={{ width: 300 }}>
                      <table style={{ width: '100%' }}>
                        <thead>
                          <tr>
                            <th><small style={{ paddingRight: 85 }}>Seat Belt (%)</small></th>
                            <th><small style={{ color: '#A3A5A2' }}>5 point</small></th>
                          </tr>

                          <tr>
                            <th><small style={{ paddingRight: 64 }}>RPM (%)</small></th>
                            <th><small style={{ color: '#A3A5A2' }}>5 point</small></th>
                          </tr>

                          <tr>
                            <th><small style={{ paddingRight: 49 }}>HASH Break (Time)</small></th>
                            <th><small style={{ color: '#A3A5A2' }}>5 point</small></th>
                          </tr>

                          <tr>
                            <th><small style={{ paddingRight: 70 }}>G-Sensor Detect (%)</small></th>
                            <th><small style={{ color: '#A3A5A2' }}>5 point</small></th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>

                </div>

                <div className="b-r table-tan" style={{ minWidth: 600, padding: 5 }}>
                  <b style={{ fontSize: 16 }} >Driver Score (ECO Score)</b><br /><br />
                  <div style={{ flexDirection: 'row', display: 'flex', }}>
                    <div style={{ width: 300 }}>
                      <table style={{ width: '100%' }}>
                        <thead>
                          <tr>
                            <th><small style={{ paddingRight: 85 }}>Idling (%)</small></th>
                            <th><small>5 point</small></th>
                          </tr>

                          <tr>
                            <th><small style={{ paddingRight: 64 }}>Exhaust/Rerarder</small></th>
                            <th><small>5 point</small></th>
                          </tr>

                          <tr>
                            <th><small style={{ paddingRight: 49 }}>Average RPM High Speed</small></th>
                            <th><small>5 point</small></th>
                          </tr>

                          <tr>
                            <th><small style={{ paddingRight: 70 }}>Average RPM Low Speed</small></th>
                            <th><small>5 point</small></th>
                          </tr>

                          <tr>
                            <th><small style={{ paddingRight: 70 }}>Average Shift Up RPM</small></th>
                            <th><small>5 point</small></th>
                          </tr>
                        </thead>
                      </table>
                    </div>


                    <div style={{ width: 300, marginLeft: 15 }}>
                      <table style={{ width: '100%' }}>
                        <thead>
                          <tr>
                            <th><small style={{ paddingRight: 85 }}>Average Shift Down RP</small></th>
                            <th><small>5 point</small></th>
                          </tr>

                          <tr>
                            <th><small style={{ paddingRight: 64 }}></small></th>
                            <th> </th>
                          </tr>

                          <tr>
                            <th><small style={{ paddingRight: 49 }}></small></th>
                            <th> </th>

                          </tr>

                          <tr>
                            <th><small style={{ paddingRight: 49 }}></small></th>
                            <th> </th>
                          </tr>

                          <tr>
                            <th><a >Total</a></th>
                            <th> <a>100 Ponit </a></th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                </div>
              </div>} */}
          </div>
        </div>
        {/* } */}
        {/* <Button ><i className="fas fa-chevron-right"></i></Button> */}
      </Row >
    )
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  information: state.realtime.information,
  hideFooter: state.realtime.hideFooter,
  tabsRealtime: state.signin.tabsRealtime,
  language: state.versatile.language,
});

const mapDispatchToProps = (dispatch) => ({
  setHideFooter: () => dispatch(RealtimeActions.setHideFooter()),

})

export default connect(mapStateToProps, mapDispatchToProps)(FooterInfo)

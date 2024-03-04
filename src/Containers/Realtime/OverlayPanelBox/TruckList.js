import React, { Component } from 'react';
import { BreakStyle } from 'devextreme-react/chart';
import { grey, green } from '@material-ui/core/colors';
import { Input, Button } from 'reactstrap';
import { connect } from 'react-redux'
import RealtimeActions from '../../../Redux/RealtimeRedux'
import moment from 'moment'
import { momentDate, calculateToDuration, calculateToTimestamp } from '../../../Functions/DateMoment'
import images from '../../../Themes/Images'
import { get, isEqual } from 'lodash'
import Fleet from '../../UserSetting/Managements/Fleet';
import { t } from '../../../Components/Translation'
import { statusColor, statusName, statusCar } from '../StatusVehicle'
import { isEmpty } from 'react-redux-firebase'
import { useTranslation } from 'react-i18next'

const InputSearch = (arg) => {
  const { t } = useTranslation()
  return <Input
    className="search-message-box-realtime"
    placeholder={t('search')}
    style={{ marginBottom: 0 }}
    onKeyUp={(e) => arg.onKeyUp(e)}
  />
}

let ResetFooter = null
class TruckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayList: {},
      // checkVehicles: {},
      // listVehicles: []

    }
  }

  componentWillMount() {
    let { displayfleet, displayList } = this.props
    // //console.log('componentWillMount', displayList)
    if (displayfleet) this.setState({ displayList: displayfleet })
    else if (displayList && isEmpty(this.state.displayList)) this.setState({ displayList })

  }

  componentDidUpdate(prevProps, nextState) {
    let { displayList } = this.props
    if (prevProps.displayList !== displayList && isEmpty(this.state.displayList)) {
      this.setState({ displayList })
    }
  }

  componentWillUnmount() {
    this.props.setStateReduxRealtime('displayfleet', this.state.displayList)
  }

  // __________________________________________________________________________________
  seteventMarker(device) {
    // //console.log('seteventMarker')
    let activeStatus = statusCar(device)
    let { vid } = device.info
    // //console.log('1.vid', vid)
    this.props.getInformation(vid, 17, true)
    // this.props.setActiveMap(true, activeStatus, get(device, 'info.class_type', 0))
  }

  changeCheckBox(id, vid) {
    // //console.log('changeCheckBox')
    // let { checkVehicles } = this.state

    // if (checkVehicles[id].includes(vid)) {
    //   checkVehicles[id] = checkVehicles[id].filter((ele) => ele != vid)
    //   // this.setState({ checkVehicles })
    // } else {
    //   checkVehicles[id].push(vid)
    //   // this.setState(preState => preState)
    // }
    // this.setState({ checkVehicles })
    // this.setDisplayTruck(checkVehicles)
    this.props.changeCheckBox(id, vid)
  }

  changeCheckBoxAll(id, vehicles) {
    this.props.changeCheckBoxAll(id, vehicles)
    // let { checkVehicles } = this.state
    // // //console.log('changeCheckBoxAll')
    // if (checkVehicles[id].length === vehicles.length) {
    //   checkVehicles[id].length = 0
    // } else {
    //   checkVehicles[id].length = 0
    //   checkVehicles[id] = vehicles.map((item) => item.info.vid)
    // }
    // this.setState({ checkVehicles })
    // this.setDisplayTruck(checkVehicles)
  }

  setDisplayTruck(checkVehicles) {
    let checkArrayVehicles = []
    for (let i in checkVehicles) {
      checkArrayVehicles.push(...checkVehicles[i])
    }
    // //console.log('checkArrayVehicles', checkArrayVehicles)
    this.props.setDisplayTruck(checkArrayVehicles)
  }

  changeDisplayList(id) {
    // //console.log(this.state.displayList)
    let displayList = JSON.parse(JSON.stringify(this.state.displayList))
    displayList[id] = !displayList[id]
    this.setState({ displayList })
  }

  // __________________________________________________________________________________

  search(value) {
    if (value !== undefined) {
      for (let id in this.state.displayList) {
        let filter, table, tr, td, i, txtValue;
        filter = value.toUpperCase();
        table = document.getElementById(id);
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[1];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }
        }
      }
    }
  }


  // // __________________________________________________________________________________
  setDevicelist(id, device, i) {
    let { information, checkVehicles } = this.props
    // let { checkVehicles } = this.state
    let gpsdate = get(device, 'gps.gpsdate', 0)
    let vid = get(device, 'info.vid', undefined)
    let vidInfo = get(information, 'info.vid', null)
    let driver = get(device, 'driver_cards.name', '')
    let card_id = get(device, 'driver_cards.card_id', '')
    // if (driver !== '') //console.log(device, get(device, 'driver_cards.name', ''))

    let color = vid === vidInfo ? '#EEEEEE' : null
    let iconcheckbox = ""
    try {
      iconcheckbox = checkVehicles[id].includes(vid) ? " fa-check-square" : "r fa-square"
    } catch {
      iconcheckbox = "r fa-square"
    }

    // console.log("setDevicelist > information: ", information)

    // let _licenseplate = get(device, 'info.licenseplate')   //>>> OLD

    let _licenseplate = get(device, 'info.vehicle_name')
    if (_licenseplate == "") _licenseplate = get(device, 'info.licenseplate')
    if (_licenseplate == "") _licenseplate = get(device, 'info.vin_no')

    //#region Check Vehicle Change
    // let _licenseplate = ""
    // if (information.info) {
    //   _licenseplate = get(information, 'info.vehicle_name')
    //   if (_licenseplate == "") _licenseplate = get(information, 'info.vehicle_name')
    //   if (_licenseplate == "") _licenseplate = get(information, 'info.vin_no')
    // }
    // else {
    //   _licenseplate = get(device, 'info.vehicle_name')
    //   if (_licenseplate == "") _licenseplate = get(device, 'info.vehicle_name')
    //   if (_licenseplate == "") _licenseplate = get(device, 'info.vin_no')
    // }
    //#endregion


    return (
      // <tr onClick={this.selectDevice.bind(this, device)} style={{ cursor: 'pointer' }} key={"tr" + i}>
      <tr style={{ cursor: 'pointer', backgroundColor: color }} key={"tr" + i}  >
        {/* <tr style={{ cursor: 'pointer', backgroundColor: color }} key={"tr" + i} onClick={this.seteventMarker.bind(this, device)} > */}
        <td width="10%" style={{ paddingRight: 0 }}>
          <div style={{ flexDirection: 'row', display: 'flex', paddingLeft: 10 }}>
            <i className={"fa" + iconcheckbox}
              onClick={() => this.changeCheckBox(id, vid)} />
          </div>
        </td>
        <td title={get(device, 'info.licenseplate')} width="40%" onClick={() => this.seteventMarker(device)} style={{ padding: '6px 4px 6px 0px', marginTop: 2, verticalAlign: 'middle' }}>
          <div style={{
            fontSize: 14, marginTop: -3, color: 'grey',
            width: 160, overflow: 'hidden', textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {/* <b>{get(device, 'info.licenseplate')}</b> */}
            <b>{_licenseplate}</b>
          </div>
        </td>
        {/* <td width="45%" style={{ padding: 8 }}>
          <div style={{ flexDirection: 'row', display: 'flex', paddingLeft: 10 }}>
            <i className={"fa" + iconcheckbox} style={{ marginRight: 5, marginTop: 2 }}
              onClick={() => this.changeCheckBox(id, vid)} />
            <div onClick={() => this.seteventMarker(device)} style={{ width: '100%' }}>
              <div style={{ width: '100%' }}>
              {device.device_name}
              <b>{get(device, 'info.licenseplate')}</b>
              <div style={{ fontSize: 14, marginTop: -3, color: 'grey' }}>
                {momentDate(gpsdate)}
              </div>
            </div>
          </div>
        </td> */}
        {/* <td onClick={() => this.seteventMarker(device)} width="25%" style={{ padding: '6px 4px', marginTop: 2, verticalAlign: 'middle' }}>
          <div style={{ fontSize: 14, marginTop: -3, color: 'grey' }}>
            {driver !== '' ? driver : card_id}
          </div>
        </td> */}
        <td onClick={() => this.seteventMarker(device)} width="5%" style={{ padding: '6px 4px', marginTop: 2, verticalAlign: 'middle' }}>
          {/* {driver} */}
          <i className="demo-icon icon-credit-card" style={{
            fontSize: 16,
            float: 'right',
            color: get(device, 'driver_cards.status_swipe_card', 0) === 1 ? "#5de648" : get(device, 'driver_cards.status_swipe_card', 0) === 2 ? "#f86c8b" : "#cacaca"
          }}></i>
        </td>
        <td onClick={() => this.seteventMarker(device)} width="25%" style={{ padding: '6px 4px', marginTop: 2, verticalAlign: 'middle' }}>
          <div style={{ float: 'right' }}>
            {/* {get(device, 'gps.speed', 0) > 70 && <i className="fas fa-exclamation-triangle" style={{ color: 'red' }}></i>} */}
            {get(device, 'gps.speed', 0)}{' '}{t('realtime_41')}
            <i className="fa fa-circle" style={{ color: statusColor(device), marginLeft: 5 }} />
          </div>
        </td>
      </tr>
    )
  }

  createTable(id, name, vehicles) {

    let { displayList } = this.state
    let { checkVehicles } = this.props

    let classNameCheckbox = ""

    if (checkVehicles[id]) {
      classNameCheckbox = checkVehicles[id].length < 1 ? "r fa-square"
        : checkVehicles[id].length === vehicles.length ? " fa-check-square"
          : " fa-minus-square"
    }

    // if (displayList[id] === undefined) displayList[id] = true
    let classNameDisplay = displayList[id] === true ? "r fa-minus-square"
      : "r fa-plus-square"


    return (
      <table className="table table-bordered table-hover" key={'table_' + id} id={id} style={{ fontSize: 12, marginBottom: 0 }}>
        <thead key={'thead_' + id}>
          <tr key={'tr_head_' + id}>
            <th colSpan="4" style={{ padding: 0 }}>
              <div style={{ padding: '0px 0px 0px 8px', color: 'grey', flexDirection: 'row', display: 'flex' }}>
                <i
                  className={"fa" + classNameCheckbox}
                  style={{ marginRight: 5, marginTop: 2, padding: '8px 0px', cursor: 'pointer' }}
                  onClick={() => this.changeCheckBoxAll(id, vehicles)} />
                <div
                  style={{ padding: '8px 8px 8px 0px', width: '100%', marginTop: 1 }}
                  onClick={() => this.changeDisplayList(id)}>
                  {name}
                  <div style={{ float: 'right' }}>
                    {vehicles ? vehicles.length : 0} {t('realtime_8')}{' '}
                    <i className={"fa" + classNameDisplay} style={{ marginTop: 1, cursor: 'pointer' }}></i>
                  </div>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        {
          displayList[id] === true &&
          <tbody>
            {vehicles.map((device, i) =>
              // Return the element. Also pass key
              this.setDevicelist(id, device, i)
            )}
          </tbody>
        }
      </table >
    )
  }

  render() {
    let { vehiclesLoading, listVehicles } = this.props
    // let { listVehicles } = this.state

    // //console.log('displayList', this.state.displayList)
    return (
      <div style={{ display: 'block' }} id="tab-1" className="tab-pane">
        <div style={{ padding: 5 }}>
          <i className="fas fa-search" style={{ position: 'absolute', padding: 10, color: '#A3A5A2' }}></i>
          {/* <Input placeholder="search" onKeyUp={(e) => this.search(e.target.value)} className="search-message-box-realtime" style={{ marginBottom: 0 }} /> */}
          <InputSearch onKeyUp={(e) => this.search(e.target.value)} />
        </div>

        <div className="list-vehicles scroll table-overlay">
          {/* {true ? */}
          {vehiclesLoading ?
            <div style={{ padding: '170px 5px' }}>
              <center><img src={images.loading} style={{ width: 50, height: 50 }}></img></center>
            </div>
            :
            listVehicles.length > 0 ? listVehicles.map((item) => {
              return this.createTable(item.fleet_id, item.fleet_name, item.vehicles)
            }) :
              <div style={{ padding: '170px 5px' }}>
                <center>{t("realtime_54")}</center>
              </div>
            // [
            //   this.createTable('table01', 'Device List 1', vehicles)
            // ]
          }
        </div>
      </div>

    )
  }
}


const mapStateToProps = (state) => ({
  // vehicles: state.realtime.vehicles,
  displayTruck: state.realtime.displayTruck,
  information: state.realtime.information,
  // activeMap: state.realtime.activeMap,
  vehiclesLoading: state.realtime.vehiclesLoading,
  // activeVid: state.realtime.activeVid,
  displayfleet: state.realtime.displayfleet
});

const mapDispatchToProps = (dispatch) => ({
  // getInitialData: () => dispatch(RealtimeActions.getInitialData()),
  // gpsUpdate: (vehicles, update) => dispatch(RealtimeActions.gpsUpdate(vehicles, update)),
  getInformation: (vid, zoom, activeMap) => dispatch(RealtimeActions.getInformation(vid, zoom, activeMap)),
  setFocusPosition: (lat, lng) => dispatch(RealtimeActions.setFocusPosition(lat, lng)),
  setDisplayTruck: (displayTruck) => dispatch(RealtimeActions.setDisplayTruck(displayTruck)),
  setZoomMap: (zoom) => dispatch(RealtimeActions.setZoomMap(zoom)),
  setActiveMap: (activeMap, activeStatus, activeClassType) => dispatch(RealtimeActions.setActiveMap(activeMap, activeStatus, activeClassType)),
  setInitialTruckData: (InitialData) => dispatch(RealtimeActions.setInitialTruckData(InitialData)),
  setStateReduxRealtime: (name, value) => dispatch(RealtimeActions.setStateReduxRealtime(name, value)),
  setDefaultReduxRealtime: () => dispatch(RealtimeActions.setDefaultReduxRealtime()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TruckList);
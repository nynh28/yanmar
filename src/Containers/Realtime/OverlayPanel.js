import React, { Component } from 'react';
import { connect } from 'react-redux'
import SigninActions from '../../Redux/SigninRedux'
import RealtimeActions from '../../Redux/RealtimeRedux'
// import "./Styles/style-overlay-panel-realtime.css";
import $ from 'jquery'
import 'react-notifications-component/dist/theme.css'
import TruckList from './OverlayPanelBox/TruckList';
import DriverList from './OverlayPanelBox/DriverList';
import { t } from '../../Components/Translation'
import { get, isEqual } from 'lodash'
import { isEmpty } from 'react-redux-firebase'

let ResetFooter = null
const MAX_COUNT = 500
class OverlayPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deviceHistory: [],
      displayOverlayPanel: true,
      checkVehicles: {},
      listVehicles: [],
      listDrivers: []
    }

  }

  componentWillMount() {
    let { vehicles } = this.props
    if (vehicles.length === 0) {
      this.props.getInitialTruckData()
    } else {
      this.setDriverList(vehicles)
    }

    // this.props.setDefaultReduxRealtime()
  }

  componentDidUpdate(prevProps, nextState) {
    let { information, vehicles, checkFromDashboard } = this.props
    // console.log('displayTruck', displayTruck)
    if (prevProps.information !== information && get(information, 'gps', undefined) !== undefined) {
      let { lat, lng } = information.gps
      // console.log('trereter')
      if (this.props.activeMap) this.props.setFocusPosition(lat, lng);
    }
    if (!isEqual(prevProps.vehicles, vehicles)) {
      let checkVehicles = this.setDriverList(vehicles)

      if (prevProps.vehicles.length === 0) {
        this.setDisplayTruck(checkVehicles)
      }
    }
    if (prevProps.checkFromDashboard !== checkFromDashboard) {
      this.setDriverList(vehicles)
    }
  }

  setDriverList(vehicles) {
    let { displayTruck, displayfleet } = this.props
    let count = vehicles.length
    let fleetId, checkVehicles = {}, lst = {}, listVehicles = [], listDrivers = [], displayList = {}
    for (let i in vehicles) {
      let { fleet_id, fleet_name } = vehicles[i].fleet
      if (fleet_id !== fleetId) {
        if (fleetId !== undefined) {
          listVehicles.push({ fleet_id: lst.fleet_id, fleet_name: lst.fleet_name, vehicles: lst.vehicles })
          listDrivers.push({ fleet_id: lst.fleet_id, fleet_name: lst.fleet_name, drivers: lst.drivers })
        }
        fleetId = fleet_id
        lst = {}
        lst.fleet_id = fleetId
        lst.fleet_name = fleet_name
        lst.vehicles = [vehicles[i]]
        lst.drivers = [vehicles[i]]
        if (get(vehicles[i], 'driver_cards.status_swipe_card', 0) !== 0) lst.drivers = [vehicles[i]]
        else lst.drivers = []
        // console.log(vehicles[i])
        if ((displayTruck && displayTruck.includes(vehicles[i].info.vid))) {
          checkVehicles[fleet_id] = [vehicles[i].info.vid]
        } else if (isEmpty(this.state.checkVehicles) && !displayTruck && count < MAX_COUNT) {
          checkVehicles[fleet_id] = [vehicles[i].info.vid]
        }
        else {
          checkVehicles[fleet_id] = []
        }

        // console.log('displayfleet', displayfleet)
        if (displayfleet && displayfleet[fleet_id] !== undefined) {
          displayList[fleet_id] = displayfleet[fleet_id]
        } else if (count < MAX_COUNT) {
          displayList[fleet_id] = true
        } else {
          displayList[fleet_id] = false
        }


      } else {
        lst.vehicles.push(vehicles[i])
        if (get(vehicles[i], 'driver_cards.status_swipe_card', 0) !== 0) lst.drivers.push(vehicles[i])
        if ((displayTruck && displayTruck.includes(vehicles[i].info.vid))) {
          checkVehicles[fleet_id].push(vehicles[i].info.vid)
        } else if (isEmpty(this.state.checkVehicles) && !displayTruck && count < MAX_COUNT) {
          checkVehicles[fleet_id].push(vehicles[i].info.vid)
        }

      }
    }
    if (lst.fleet_id) {
      listVehicles.push({ fleet_id: lst.fleet_id, fleet_name: lst.fleet_name, vehicles: lst.vehicles })
      listDrivers.push({ fleet_id: lst.fleet_id, fleet_name: lst.fleet_name, drivers: lst.drivers })
    }
    let _state = { listVehicles, checkVehicles, listDrivers }
    if (isEmpty(this.state.displayList)) _state.displayList = displayList
    this.setState(_state)

    return checkVehicles
  }

  componentDidMount() {
    // let { activeVid } = this.props
    // if (activeVid) this.props.getInformation(activeVid,this.props.zoom)
  }

  componentWillUnmount() {
    // this.props.setInitialTruckData([])
    // this.props.setDisplayTruck([])
    clearInterval(ResetFooter);
  }

  changeCheckBox(id, vid) {
    // console.log('changeCheckBox')
    let { checkVehicles } = this.state

    if (checkVehicles[id].includes(vid)) {
      checkVehicles[id] = checkVehicles[id].filter((ele) => ele != vid)
      // this.setState({ checkVehicles })
    } else {
      checkVehicles[id].push(vid)
      // this.setState(preState => preState)
    }
    this.setState({ checkVehicles })
    this.setDisplayTruck(checkVehicles)
  }

  changeCheckBoxAll(id, vehicles) {
    let { checkVehicles } = this.state
    // console.log('changeCheckBoxAll')
    if (checkVehicles[id].length === vehicles.length) {
      checkVehicles[id].length = 0
    } else {
      checkVehicles[id].length = 0
      checkVehicles[id] = vehicles.map((item) => item.info.vid)
    }
    this.setState({ checkVehicles })
    this.setDisplayTruck(checkVehicles)
  }

  setDisplayTruck(checkVehicles) {
    // console.log("setDisplayTruck : ", checkVehicles)
    let checkArrayVehicles = []
    for (let i in checkVehicles) {
      checkArrayVehicles.push(...checkVehicles[i])
    }
    // console.log('checkArrayVehicles', checkArrayVehicles)
    this.props.setDisplayTruck(checkArrayVehicles)
  }

  // ______________________________________ Select Tab ______________________________________
  selectTab(nameTabs) {
    this.props.setTabs(nameTabs)
  }
  // ________________________________________________________________________________________

  render() {
    let { tabsRealtime, hideOverlayPanel } = this.props
    let { displayOverlayPanel, checkVehicles, listVehicles, listDrivers, displayList } = this.state

    return (

      <div className="box-overlay-panel-realtime">

        <div style={{ height: '100%', paddingTop: 0 /*165*/ }}>
          <div style={{
            height: 70, width: 25, cursor: 'pointer',
            paddingTop: 25,
            boxShadow: '0 2px 6px rgba(0,0,0,.3)',
            backgroundColor: 'white',
            borderRadius: '4px 0px 0px 4px'
          }}
            // onClick={() => this.setState({ displayOverlayPanel: !displayOverlayPanel })}>
            onClick={() => this.props.setHideOverlayPanel()}>
            {/* <center><i className="fa fa-chevron-right"></i></center> */}
            <center><i className={"fa " + (hideOverlayPanel ? "fa-chevron-left" : "fa-chevron-right")}></i></center>
          </div>
        </div>

        <div className="tabs-container"
          id={"overlay-panel-colaps"} className='detail-overlay-realtime' style={{
            display: hideOverlayPanel ? 'none' : 'inline-block'
          }}>
          <ul className="nav nav-tabs">
            {/* <li className={tabsRealtime === "tabsTruck" ? ' active' : ''}><a onClick={() => this.selectTab('tabsTruck')} ><i className="icon-group-10971" style={{ fontSize: 25 }} />{t('realtime_7')}</a></li> */}
            <li className={tabsRealtime === "tabsTruck" ? ' active' : ''}><a onClick={() => this.selectTab('tabsTruck')} ><i className="icon-group-10971" style={{ fontSize: 25 }} /></a></li>
            {/* <li className={tabsRealtime === "tabsDriver" ? ' active' : ''}><a onClick={() => this.selectTab('tabsDriver')} ><i className="fas fa-users" style={{ fontSize: 25 }} />{t('my_drivers')}</a></li> */}
            {/* <li className={tabsRealtime === "tabsDriver" ? ' active' : ''}><a onClick={() => this.selectTab('tabsDriver')} ><i className="fas fa-users" style={{ fontSize: 25 }} /></a></li> */}
            {/* <li className={tabsRealtime === "tabsJob" ? ' active' : ''}><a onClick={() => this.selectTab(tabsRealtime)} style={{ color: 'lightgray', cursor: 'context-menu' }}><i className="fas fa-history" style={{ fontSize: 25 }} />{t('job')}</a></li> */}
          </ul>
          <div className="tab-content">
            {/* __________________________________ Truck __________________________________ */}
            {tabsRealtime === "tabsTruck" && (
              <TruckList checkVehicles={checkVehicles} listVehicles={listVehicles} displayList={displayList}
                changeCheckBox={(id, vid) => this.changeCheckBox(id, vid)}
                changeCheckBoxAll={(id, vehicles) => this.changeCheckBoxAll(id, vehicles)}
              />
            )}
            {/* <div style={{ display: tabsRealtime === "tabsTruck" ? 'block' : 'none' }}>
              <TruckList />
            </div> */}
            {/* ____________________________________________________________________________ */}
            {/* __________________________________ Driver __________________________________ */}
            {tabsRealtime === "tabsDriver" && (
              <DriverList checkVehicles={checkVehicles} listDrivers={listDrivers} displayList={displayList}
                changeCheckBox={(id, vid) => this.changeCheckBox(id, vid)}
                changeCheckBoxAll={(checkVehicles) => {
                  this.setState({ checkVehicles })
                  this.setDisplayTruck(checkVehicles)
                }} />
              // changeCheckBoxAll={(id, vehicles) => this.changeCheckBoxAll(id, vehicles)} />
            )}
            {/* <div style={{ display: tabsRealtime === "tabsDriver" ? 'block' : 'none' }}>
              <DriverList />
            </div> */}
            {/* ____________________________________________________________________________ */}
            {/* ___________________________________ Job ____________________________________ */}
            {/* {tabsRealtime === "tabsJob" && (
              <div style={{ display: 'block' }} id="tab-1" className="tab-pane">
              </div>
            )} */}
            {/* ____________________________________________________________________________ */}
          </div>
        </div>

      </div >
    );
  }
}


const mapStateToProps = (state) => ({
  // events: state.realtime.events,
  tabsRealtime: state.signin.tabsRealtime,
  hideOverlayPanel: state.realtime.hideOverlayPanel,
  vehicles: state.realtime.vehicles,
  displayTruck: state.realtime.displayTruck,
  information: state.realtime.information,
  activeMap: state.realtime.activeMap,
  vehiclesLoading: state.realtime.vehiclesLoading,
  displayfleet: state.realtime.displayfleet,
  checkFromDashboard: state.realtime.checkFromDashboard
});
const mapDispatchToProps = (dispatch) => ({
  // getInitialData: () => dispatch(RealtimeActions.getInitialData()),
  setTabs: (tabsRealtime) => dispatch(SigninActions.setTabs(tabsRealtime)),
  setHideOverlayPanel: () => dispatch(RealtimeActions.setHideOverlayPanel()),

  getInitialTruckData: () => dispatch(RealtimeActions.getInitialTruckData()),

  getInformation: (vid, zoom, activeMap) => dispatch(RealtimeActions.getInformation(vid, zoom, activeMap)),
  setFocusPosition: (lat, lng) => dispatch(RealtimeActions.setFocusPosition(lat, lng)),
  setDisplayTruck: (displayTruck) => dispatch(RealtimeActions.setDisplayTruck(displayTruck)),
  setZoomMap: (zoom) => dispatch(RealtimeActions.setZoomMap(zoom)),
  setActiveMap: (activeMap, activeStatus, activeClassType) => dispatch(RealtimeActions.setActiveMap(activeMap, activeStatus, activeClassType)),
  setInitialTruckData: (InitialData) => dispatch(RealtimeActions.setInitialTruckData(InitialData)),
  setStateReduxRealtime: (name, value) => dispatch(RealtimeActions.setStateReduxRealtime(name, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OverlayPanel);

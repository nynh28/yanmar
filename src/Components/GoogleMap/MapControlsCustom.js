import React, { Component } from 'react';
import { connect } from 'react-redux'
import DropdownActions from '../../Redux/DropdownRedux'
import { Row, ButtonGroup } from 'reactstrap'
import MapControl from '../GoogleMap/MapControl'
import MeasureTool from './MeasureTool/lib/index'
import $ from 'jquery'
import RealtimeActions from '../../Redux/RealtimeRedux'
import { t } from '../Translation'
import './style.css'
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
import { isEmpty, isEqual } from 'lodash'


class MapControlsCustom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alertHidden: true,
      clusterHidden: false,
      fitObjectHidden: false,
      objectHidden: false,
      geofencesrHidden: false,
      measureHidden: false,
      dashboardHidden: true,
      licensePlateHidden: false,
      infoHidden: false,
      clusterEnabled: true,
      objectEnabled: true,
      fitObjectEnabled: false,
      geofencesEnabled: [],
      infoWindowEnabled: false,
      measureEnabled: false,
      dashboardEnabled: false,
      infoEnabled: true,
      licensePlateEnabled: false,
      showMapTypeBox: false,
      mapType: "roadmap",
      btnClusterActive: true,
      btnFitObjectActive: false,
      btnObjectActive: true,
      btnGeofencesActive: false,
      btnMeasureActive: false,
      dashboardActive: true,
      infoActive: true,
      nonFitObject: false,
      measureToolObject: null,

      showGeofencesM: false,
      geof: false,
      subMenu: 'dropdown-menu',
      fullscreen: false,
    }
    this.isFitObjectClick = false
  }

  componentWillMount() {
    let { alertHidden, clusterHidden, fitObjectHidden, objectHidden, geofencesrHidden, dashboardHidden, infoHidden,
      clusterEnabled, fitObjectEnabled, objectEnabled, geofencesEnabled, infoWindowEnabled, alertEnabled,
      measureEnabled, dashboardEnabled, licensePlateEnabled, infoEnabled, mapType, measureHidden, licensePlateHidden
    } = this.props

    let _alertHidden = true
    let _clusterHidden = false
    let _fitObjectHidden = false
    let _objectHidden = false
    let _geofencesrHidden = false
    let _dashboardHidden = true
    let _infoHidden = false
    let _measureHidden = false
    let _licensePlateHidden = false

    // console.log('1_alertHidden', _alertHidden)
    if (alertHidden !== undefined) _alertHidden = alertHidden
    if (clusterHidden !== undefined) _clusterHidden = clusterHidden
    if (fitObjectHidden !== undefined) _fitObjectHidden = fitObjectHidden
    if (objectHidden !== undefined) _objectHidden = objectHidden
    if (geofencesrHidden !== undefined) _geofencesrHidden = geofencesrHidden
    if (dashboardHidden !== undefined) _dashboardHidden = dashboardHidden
    if (infoHidden !== undefined) _infoHidden = infoHidden
    if (measureHidden !== undefined) _measureHidden = measureHidden
    if (licensePlateHidden !== undefined) _licensePlateHidden = licensePlateHidden
    let _alertEnabled = true
    let _clusterEnabled = true
    let _fitObjectEnabled = false
    let _objectEnabled = true
    let _geofencesEnabled = []
    let _infoWindowEnabled = false
    let _measureEnabled = false
    let _infoEnabled = true
    let _licensePlateEnabled = true
    let _dashboardEnabled = true

    if (alertEnabled !== undefined) _alertEnabled = alertEnabled
    if (clusterEnabled !== undefined) _clusterEnabled = clusterEnabled
    if (fitObjectEnabled !== undefined) _fitObjectEnabled = fitObjectEnabled
    if (objectEnabled !== undefined) _objectEnabled = objectEnabled
    if (geofencesEnabled !== undefined) _geofencesEnabled = geofencesEnabled
    if (infoWindowEnabled !== undefined) _infoWindowEnabled = infoWindowEnabled
    if (measureEnabled !== undefined) _measureEnabled = measureEnabled
    if (infoEnabled !== undefined) _infoEnabled = infoEnabled
    if (licensePlateEnabled !== undefined) _licensePlateEnabled = licensePlateEnabled
    if (dashboardEnabled !== undefined) _dashboardEnabled = dashboardEnabled

    this.setState({
      alertEnabled: _alertEnabled,
      clusterEnabled: _clusterEnabled,
      fitObjectEnabled: _fitObjectEnabled,
      objectEnabled: _objectEnabled,
      geofencesEnabled: _geofencesEnabled,
      infoWindowEnabled: _infoWindowEnabled,
      btnAlertActive: _alertEnabled,
      btnClusterActive: _clusterEnabled,
      btnFitObjectActive: _fitObjectEnabled,
      infoEnabled: _infoEnabled,
      infoActive: _infoEnabled,
      btnObjectActive: _objectEnabled,
      dashboardEnabled: _dashboardEnabled,
      dashboardActive: _dashboardEnabled,
      // btnMeasureActive: _measureEnabled,
      alertHidden: _alertHidden,
      clusterHidden: _clusterHidden,
      fitObjectHidden: _fitObjectHidden,
      objectHidden: _objectHidden,
      geofencesrHidden: _geofencesrHidden,
      dashboardHidden: _dashboardHidden,
      infoHidden: _infoHidden,
      measureHidden: _measureHidden,
      licensePlateHidden: _licensePlateHidden
    })

    if (_measureEnabled) this.toggleMeasure()
    // if (!_dashboardHidden && dashboardEnabled === false) this.toggleDashboard()
    if (mapType) this.toggleMapType(mapType)

    if (!this.state.measureHidden) this.createMeasureTool()

    this.props.getDataDropdown("GeofenceType")

  }

  componentDidUpdate(prevProps) {
    let { fitObjectEnabled } = this.props
    if (prevProps.fitObjectEnabled !== fitObjectEnabled) {
      if (!this.isFitObjectClick) {
        this.setState({ fitObjectEnabled, btnFitObjectActive: fitObjectEnabled })
        this.props.onFitObjectChange && this.props.onFitObjectChange(fitObjectEnabled)
      }
      this.isFitObjectClick = false
    }
  }

  componentDidMount() {
    window.addEventListener('fullscreenchange', this.onFullscreen)
  }

  toggleAlert() {
    this.setState(state => ({ alertEnabled: !state.alertEnabled, btnAlertActive: !state.btnAlertActive }))
    this.props.onAlertChange && this.props.onAlertChange(!this.state.alertEnabled)
  }

  toggleCluster() {
    this.setState(state => ({ clusterEnabled: !state.clusterEnabled, btnClusterActive: !state.btnClusterActive }))
    this.props.onClusterChange && this.props.onClusterChange(!this.state.clusterEnabled)
  }

  toggleFitObject() {
    this.setState(state => ({ fitObjectEnabled: !state.fitObjectEnabled, btnFitObjectActive: !state.btnFitObjectActive }))
    this.props.onFitObjectChange && this.props.onFitObjectChange(!this.state.fitObjectEnabled)
  }

  toggleObject() {
    this.setState(state => ({ objectEnabled: !state.objectEnabled }))
    this.props.onObjectChange && this.props.onObjectChange(!this.state.objectEnabled)
  }

  toggleGeofences() {
    // this.setState(state => ({ geofencesEnabled: !state.geofencesEnabled }))
    // this.props.onGeofencesChange(!this.state.geofencesEnabled)
  }


  toggleDashboard() {
    this.props.onDashboardChange(!this.state.dashboardEnabled)
    this.setState(state => ({ dashboardEnabled: !state.dashboardEnabled, dashboardActive: !state.dashboardActive }))
    this.props.onDashcboard && this.props.onDashcboard(!this.state.dashboardEnabled)
  }

  toggleInfo() {
    this.props.onInfoChange && this.props.onInfoChange(!this.state.infoEnabled)
    this.setState(state => ({ infoEnabled: !state.infoEnabled, infoActive: !state.infoActive }))
  }

  componentWillUnmount() {
    this.props.geofence && this.props.onGeofencesChange([])
    this.props.geofence && this.props.setDataDropdown("GeofenceType", [])
  }


  toggleGeofencesM(name, key) {

    if (name === undefined) {
      this.setState(state => ({ showGeofencesM: !state.showGeofencesM }))

    }
    else {
      if (name === 'licensePlate') {
        this.setState(state => ({ infoWindowEnabled: !state.infoWindowEnabled }))
        this.props.onInfoWindowChange(!this.state.infoWindowEnabled)
      }
      else if (name === 'geofencesType' && key !== undefined) {
        let geof = [...this.state.geofencesEnabled]
        if (geof.find((k) => k === key)) {
          geof = geof.filter((k) => k !== key)
        } else {
          geof.push(key)
        }
        this.setState(state => ({ geofencesEnabled: geof }))
        this.props.onGeofencesChange && this.props.onGeofencesChange(geof)
      }
      else if (name === 'geofences') {
        let { geofencesEnabled } = this.state
        let { GeofenceTypeData } = this.props
        let geof = []
        if (geofencesEnabled.length !== GeofenceTypeData.length) {
          geof = GeofenceTypeData.map((item) => item.key)
        }
        this.setState({ geofencesEnabled: geof })
        this.props.onGeofencesChange && this.props.onGeofencesChange(geof)
      }
      $("#dd-info-geof").addClass("open")
    }

  }

  toggleMeasure() {
    this.props.onImeasureChange && this.props.onImeasureChange(!this.state.measureEnabled)
    this.setState(state => ({ measureEnabled: !state.measureEnabled }))
    !this.state.measureEnabled ? this.state.measureToolObject.start() : this.state.measureToolObject.end()
  }

  toggleZoom(zoom) {
    // Zoom  0-22
    this.props.map && this.props.map.setZoom(this.props.map.zoom + (zoom))
  }

  toggleMapType(mapType) {
    if (mapType === undefined) {
      this.setState(state => ({ showMapTypeBox: !state.showMapTypeBox }))
    }
    else {
      // #mapType
      //     - roadmap  : displays the default road map view. This is the default map type.
      //     - satellite : displays Google Earth satellite images.
      //     - hybrid :  displays a mixture of normal and satellite views.
      //     - terrain : displays a physical map based on terrain information.
      this.props.map.setMapTypeId(mapType);
      this.setState(state => ({ showMapTypeBox: false, mapType }))
      this.props.onMapTypeChange && this.props.onMapTypeChange(mapType)
    }
  }

  //#region  Measure Tools
  createMeasureTool() {
    let measureTool = new MeasureTool(this.props.map, {
      contextMenu: false,
      showSegmentLength: true,
      tooltip: true,
      unit: MeasureTool.UnitTypeId.METRIC // metric, imperial, or nautical
    });

    measureTool.addListener('measure_start', () => {
      //  measureTool.removeListener('measure_start')
    });
    measureTool.addListener('measure_end', (e) => {
      // console.log('ended', e.result);
      // measureTool.removeListener('measure_end');
    });
    measureTool.addListener('measure_change', (e) => {
      // console.log('changed', e.result);
      // measureTool.removeListener('measure_change');
    });

    this.setState({ measureToolObject: measureTool })
  }
  //#endregion

  // onClickDropdown(id) {
  //   let trigger = $("#dd-info-geof")
  //   $("#dd-info-geof").addClass("open")
  // }

  handleBlur(val, event) {
  }

  onFullscreen = () => {
    const isFullScreen = document.fullscreenElement
    if (isFullScreen) this.setState({ fullscreen: true })
    else this.setState({ fullscreen: false })
  }

  setIndexControl() {
    document.getElementById("MapControlCustom").style.zIndex = 2
  }

  render() {
    let { alertHidden, clusterHidden, fitObjectHidden, objectHidden, licensePlateHidden,
      geofencesrHidden, measureHidden, btnFitObjectActive, dashboardHidden,
      btnObjectActive, showGeofencesM, infoWindowEnabled, geofencesEnabled,
      btnClusterActive, btnAlertActive,
      infoHidden } = this.state
    let { map, position, fitObjectEnabled, GeofenceTypeData, isDashboardIcon, clusterDisable } = this.props

    let _isDashboardIcon = ""
    if (isDashboardIcon == undefined || isDashboardIcon) _isDashboardIcon = "fa fa-pie-chart"
    else _isDashboardIcon = "fa fa-filter"

    let checkBoxInfoWin = "fa" + (infoWindowEnabled ? " fa-check-square" : "r fa-square")

    let checkBoxGeofAll = "fa" + (geofencesEnabled.length < 1 ? "r fa-square"
      : geofencesEnabled.length === GeofenceTypeData.length ? " fa-check-square"
        : " fa-minus-square")


    const boxShadowStyle = 'rgba(0, 0, 0, 0.3) 0px 2px 6px'
    const boxWidth = '40px'
    const boxHeight = '40px'
    const dropdownBoxStyle = { display: 'flex', flexDirection: 'row', alignItems: 'center', color: '#353c42' }

    const styleSubDropdown = {
      whiteSpace: 'nowrap',
      // width: '150px',
      overflow: 'hidden',
      // textOverflow: 'ellipsis',
    }

    let disGeof = GeofenceTypeData && GeofenceTypeData.length > 0 ? '' : 'disable-goef'

    // let fullscreen = this.onFullscreen()

    return (
      <MapControl position={position} map={map} id={'MapControlCustom'} width={this.props.width} zIndex={2}>
        <Row style={{ margin: 10 }}>
          <ButtonGroup style={{ marginRight: 20, boxShadow: boxShadowStyle, backgroundColor: 'white', borderRadius: 5 }}>
            {!alertHidden &&
              <a className={
                "btn btn-white btn-bitbucket" +
                (btnAlertActive ? ' btnActive' : '')
              }
                data-toggle="tooltip" data-placement="buttom" title="Events"
                style={{ width: boxWidth, height: boxHeight, padding: '10px 12px 10px 9px' }}
                // disable={true}
                // disable={clusterDisable}
                onClick={() => this.toggleAlert()}>
                <i className="fa fa-bell" />
              </a>
            }
            {!clusterHidden &&
              <a className={
                "btn btn-white btn-bitbucket" +
                (clusterDisable ? ' btnActive clusterDisable' :
                  btnClusterActive ? ' btnActive' : '')
              }
                data-toggle="tooltip" data-placement="buttom" title="Cluster"
                style={{ width: boxWidth, height: boxHeight, padding: '10px 12px 10px 9px' }}
                // disable={true}
                // disable={clusterDisable}
                onClick={() => {
                  if (!clusterDisable) {
                    this.toggleCluster()
                  }

                }}>
                <i className="icon-layer-group" ></i>
              </a>
            }

            {!objectHidden &&
              <a className={this.state.btnObjectActive ? 'btn btn-white btn-bitbucket btnActive' : 'btn btn-white btn-bitbucket'}
                title={this.props.isArrows ? "Arrows" : "Objects"}
                style={{ width: boxWidth, height: boxHeight, padding: '10px 12px 10px 9px' }}
                onClick={() => {
                  this.toggleObject()
                  this.setState(state => ({ btnObjectActive: !state.btnObjectActive }))
                }}>
                <i className="icon-location-arrow" ></i>
              </a>
            }

            {!fitObjectHidden &&
              // <a id="btnFitObject" className={this.state.btnFitObjectActive ? 'btn btn-white btn-bitbucket btnActive' : 'btn btn-white btn-bitbucket'}
              // <a id="btnFitObject" className="btn btn-white btn-bitbucket"
              <a id="btnFitObject" className={this.state.btnFitObjectActive ? 'btn btn-white btn-bitbucket btnActive' : 'btn btn-white btn-bitbucket'}
                title="Fit Objects"
                style={{ width: boxWidth, height: boxHeight, padding: '10px 12px 10px 9px' }}
                onClick={() => {
                  this.isFitObjectClick = true
                  this.toggleFitObject()
                  // this.setState(state => ({ btnFitObjectActive: !state.btnFitObjectActive }))
                }}>
                <i className="icon-expand" ></i>
              </a>
            }

            {!geofencesrHidden && <ButtonGroup style={{ backgroundColor: 'white' }}>
              <div className={showGeofencesM ? "dropdown open" : "dropdown"} id='dd-info-geof'>
                {/* <a className={infoWindowEnabled && geofencesEnabled ? 'btn btn-white btn-bitbucket btnActive' : 'btn btn-white btn-bitbucket' + ' dropdown-toggle'} */}
                <a className='btn btn-white btn-bitbucket'
                  // <a className="btn btn-white btn-bitbucket dropdown-toggle"
                  data-toggle="dropdown"
                  title="Geofence"
                  style={{ width: boxWidth, height: boxHeight, padding: '10px 12px 10px 6px' }}
                  onClick={() => this.toggleGeofencesM()}
                >
                  <i className="icon-group-10493" ></i>
                </a>

                <ul className="dropdown-menu">
                  <li className="dropdown-submenu" onMouseOver={() => { if (GeofenceTypeData && GeofenceTypeData.length > 0) this.setState({ subMenu: 'dropdown-menu show' }) }} onMouseOut={() => this.setState({ subMenu: 'dropdown-menu' })}>
                    <a className={disGeof} tabIndex="-1" onClick={() => this.toggleGeofencesM('geofences')} >
                      <div> <i className={checkBoxGeofAll} style={{ marginRight: 4 }} />
                        {t('realtime_57')} <i className="fas fa-caret-right" ></i></div>
                    </a>
                    {GeofenceTypeData &&
                      <ul className={this.state.subMenu + ' scroll'} style={{ maxHeight: 260 }} onClick={() => this.toggleGeofencesM('geofencesType')}>
                        {/* <ul className={this.state.subMenu + ' scroll'} onClick={() => this.toggleGeofencesM('geofencesType')}> */}
                        {GeofenceTypeData.length > 0 ? GeofenceTypeData.map((item, index) => {
                          let checkBoxGeof = "fa" + (geofencesEnabled.find((k) => k === item.key) ? " fa-check-square" : "r fa-square")
                          return (
                            <li key={index}>
                              <a onClick={() => this.toggleGeofencesM('geofencesType', item.key)}>
                                <div style={{ ...dropdownBoxStyle, ...styleSubDropdown }} tabIndex="-1" title={item.value} >
                                  <i className={checkBoxGeof} style={{ marginRight: 4 }} />  {item.value}
                                </div>
                              </a>
                            </li>
                          )
                        }) :
                          <li>
                            <a>
                              <div style={{ ...dropdownBoxStyle, ...styleSubDropdown }} tabIndex="-1" >
                                {t('realtime_54')}
                              </div>
                            </a>
                          </li>
                        }

                      </ul>}
                  </li>
                  {
                    !licensePlateHidden && <li>
                      <a onClick={() => this.toggleGeofencesM('licensePlate')}>
                        <div style={dropdownBoxStyle}>
                          <i className={checkBoxInfoWin} style={{ marginRight: 4 }} />{t('realtime_58')}
                        </div>
                      </a>
                    </li>
                  }

                </ul>
              </div>
            </ButtonGroup>
            }


            {!measureHidden &&
              <a className={this.state.btnMeasureActive ? 'btn btn-white btn-bitbucket btnActive' : 'btn btn-white btn-bitbucket'}
                title="Measure"
                style={{ width: boxWidth, height: boxHeight, padding: '10px 10px' }}
                onClick={() => {
                  this.toggleMeasure()
                  this.setState(state => ({ btnMeasureActive: !state.btnMeasureActive }))
                }}>
                <i className="fas fa-pencil-ruler" ></i>
              </a>
            }


            <i className={this.state.fullscreen ? 'btn btn-white btn-bitbucket btnActive' : 'btn btn-white btn-bitbucket'}
              title="Full Screen"
              style={{ width: boxWidth, height: boxHeight, padding: '10px 9px' }}
              onClick={() => {
                document.getElementsByClassName('gm-control-active gm-fullscreen-control')[0].click()
                let isFullScreen = document.fullscreenElement
                setTimeout(() => {
                  if (isFullScreen && this.state.fullscreen) document.exitFullscreen();
                }, 50)
              }}>
              <i className={this.state.fullscreen ? 'fas fa-compress-arrows-alt' : 'icon-expand-arrows-alt'} ></i>
            </i>


            <ButtonGroup style={{ backgroundColor: 'white' }}>
              <div className={this.state.showMapTypeBox ? "dropdown open" : "dropdown"} >
                <a className="btn btn-white btn-bitbucket dropdown-toggle"
                  data-toggle="dropdown"
                  title="Map Style"
                  style={{ width: boxWidth, height: boxHeight, padding: '10px 10px' }}
                  onClick={() => this.toggleMapType()}>
                  <i className="fa fa-map" ></i>
                </a>

                <ul className="dropdown-menu dropdown-menu-map-style dropdown-alerts">
                  <li style={{ backgroundColor: this.state.mapType === "roadmap" ? '#b1b3b3' : '#FFF' }}>
                    <a onClick={() => this.toggleMapType('roadmap')}>
                      <div style={dropdownBoxStyle}>
                        {t('realtime_59')}
                      </div>
                    </a>
                  </li>

                  <li style={{ backgroundColor: this.state.mapType === "satellite" ? '#b1b3b3' : '#FFF' }}>
                    <a onClick={() => this.toggleMapType('hybrid')}>
                      <div style={dropdownBoxStyle}>
                        {t('realtime_60')}
                      </div>
                    </a>
                  </li>

                  <li style={{ backgroundColor: this.state.mapType === "terrain" ? '#b1b3b3' : '#FFF' }}>
                    <a onClick={() => this.toggleMapType('terrain')}>
                      <div style={dropdownBoxStyle}>
                        {t('realtime_61')}
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </ButtonGroup>

            {!dashboardHidden &&
              <a className={this.state.dashboardActive ? 'btn btn-white btn-bitbucket btnActive' : 'btn btn-white btn-bitbucket'}
                title="Dashboard"
                style={{ width: boxWidth, height: boxHeight, padding: '10px 12px 10px 9px' }}
                onClick={() => {
                  this.toggleDashboard()
                  {
                    this.state.fullscreen && !this.state.dashboardActive && document.getElementsByClassName('gm-control-active gm-fullscreen-control')[0].click()
                  }
                }}>
                <i className={_isDashboardIcon}></i>
              </a>
            }
            {!infoHidden &&
              <a className={this.state.infoActive ? 'btn btn-white btn-bitbucket btnActive' : 'btn btn-white btn-bitbucket'}
                title="Info"
                style={{ width: boxWidth, height: boxHeight, padding: '10px 12px 10px 9px' }}
                onClick={() => { this.toggleInfo() }}>
                <i className="fa fa-info-circle" />
              </a>
            }
          </ButtonGroup>

          {/* <ButtonGroup style={{ marginRight: 20, boxShadow: boxShadowStyle, backgroundColor: 'white' }}>
            <a className="btn btn-white btn-bitbucket"
              title="Zoom Out"
              style={{ width: boxWidth, height: boxHeight, padding: '10px 10px' }}
              onClick={() => this.toggleZoom(-1)} >
              <i className="fa fa-minus" ></i>
            </a>

            <a className="btn btn-white btn-bitbucket"
              title="Zoom In"
              style={{ width: boxWidth, height: boxHeight, padding: '10px 10px' }}
              onClick={() => this.toggleZoom(1)} >
              <i className="fa fa-plus" ></i>
            </a>
          </ButtonGroup> */}

          {/* <ButtonGroup style={{ marginRight: 20, boxShadow: boxShadowStyle, backgroundColor: 'white' }}>
            <div className={this.state.showMapTypeBox ? "dropdown open" : "dropdown"} >
              <a className="btn btn-white btn-bitbucket dropdown-toggle"
                data-toggle="dropdown"
                title="Map Style"
                style={{ width: boxWidth, height: boxHeight, padding: '10px 10px' }}
                onClick={() => this.toggleMapType()}>
                <i className="fa fa-map" ></i>
              </a>

              <ul className="dropdown-menu dropdown-menu-map-style dropdown-alerts">
                <li style={{ backgroundColor: this.state.mapType === "roadmap" ? '#b1b3b3' : '#FFF' }}>
                  <a onClick={() => this.toggleMapType('roadmap')}>
                    <div style={dropdownBoxStyle}>
                      Google Normal
                      </div>
                  </a>
                </li>

                <li style={{ backgroundColor: this.state.mapType === "satellite" ? '#b1b3b3' : '#FFF' }}>
                  <a onClick={() => this.toggleMapType('satellite')}>
                    <div style={dropdownBoxStyle}>
                      Google Satellite
                      </div>
                  </a>
                </li>

                <li style={{ backgroundColor: this.state.mapType === "terrain" ? '#b1b3b3' : '#FFF' }}>
                  <a onClick={() => this.toggleMapType('terrain')}>
                    <div style={dropdownBoxStyle}>
                      Google Terrain
                      </div>
                  </a>
                </li>
              </ul>
            </div>
          </ButtonGroup> */}

          {/* <ButtonGroup style={{ marginRight: 20, boxShadow: boxShadowStyle, backgroundColor: 'white' }} >
            <i className={this.state.fullscreen ? 'btn btn-white btn-bitbucket btnActive' : 'btn btn-white btn-bitbucket'}
              title="Full Screen"
              style={{ width: boxWidth, height: boxHeight, padding: '10px 9px' }}
              onClick={() => {
                document.getElementsByClassName('gm-control-active gm-fullscreen-control')[0].click()
              }}>
              <i className={this.state.fullscreen ? 'fas fa-compress-arrows-alt' : 'icon-expand-arrows-alt'} ></i>
            </i>
          </ButtonGroup> */}


          {/* <ButtonGroup style={{ marginRight: 20, boxShadow: boxShadowStyle, backgroundColor: 'white' }} >
            {!dashboardHidden &&
              <a className={this.state.dashboardActive ? 'btn btn-white btn-bitbucket btnActive' : 'btn btn-white btn-bitbucket'}
                title="Dashboard"
                style={{ width: boxWidth, height: boxHeight, padding: '10px 12px 10px 9px' }}
                onClick={() => {
                  this.toggleDashboard()
                  {
                    this.state.fullscreen && !this.state.dashboardActive && document.getElementsByClassName('gm-control-active gm-fullscreen-control')[0].click()
                  }
                }}>
                <i className="fa fa-area-chart" ></i>
              </a>
            }
            <a className={this.state.infoActive ? 'btn btn-white btn-bitbucket btnActive' : 'btn btn-white btn-bitbucket'}
              title="Info"
              style={{ width: boxWidth, height: boxHeight, padding: '10px 12px 10px 9px' }}
              onClick={() => { this.toggleInfo() }}>
              <i className="fa fa-info-circle" />
            </a>

          </ButtonGroup> */}

          {/* <ButtonGroup style={{ marginRight: 20, boxShadow: boxShadowStyle }} >
            <i className="btn btn-white btn-bitbucket" style={{ width: boxWidth }}
              title="Full Screen"
              onClick={() => document.getElementsByClassName('gm-control-active gm-fullscreen-control')[0].click()}>
              <i className="icon-expand-arrows-alt"style={{margin:0}}></i>
            </i>
          </ButtonGroup> */}

          {/* <ButtonGroup style={{ marginRight: 20, boxShadow: boxShadowStyle, backgroundColor: 'white' }}>
            <div className={showGeofencesM ? "dropdown open" : "dropdown"} >
              <a className="btn btn-white btn-bitbucket dropdown-toggle"
                // data-toggle="dropdown"
                title="Test"
                style={{ width: boxWidth, paddingTop: 8, paddingRight: 6, paddingBottom: 5, paddingLeft: 0 }}
                onClick={() => this.toggleGeofencesM()}
              // onBlur={() => this.toggleGeofencesM()}
              >
                <i className="icon-group-10493" ></i>
              </a>

              <ul className="dropdown-menu dropdown-alerts">
                <li>
                  <a onClick={() => this.toggleGeofencesM('details')}>
                    <div style={dropdownBoxStyle}>
                      <i className={checkBoxInfoWin} style={{ marginRight: 4 }} />Details
                    </div>
                  </a>
                </li>

                <li >
                  <a onClick={() => this.toggleGeofencesM('geofences')}>
                    <div style={dropdownBoxStyle}>
                      <i className={checkBoxGeof} style={{ marginRight: 4 }} />Geofences
                      </div>
                  </a>
                </li>
              </ul>
            </div>
          </ButtonGroup> */}


        </Row>
        {
          document.getElementById("MapControlCustom") !== null && this.setIndexControl()
        }
      </MapControl>
    )
  }
}

// export default MapControlsCustom

const mapStateToProps = (state) => ({
  GeofenceTypeData: state.dropdown.GeofenceTypeData
});
const mapDispatchToProps = (dispatch) => ({
  getDataDropdown: (optionGroup, key) => dispatch(DropdownActions.getDataDropdown(optionGroup, key)),
  setDataDropdown: (dropdownData, optionGroup) => dispatch(DropdownActions.setDataDropdown(dropdownData, optionGroup))
});

export default connect(mapStateToProps, mapDispatchToProps)(MapControlsCustom)

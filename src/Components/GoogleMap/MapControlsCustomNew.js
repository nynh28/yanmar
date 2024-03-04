import React, { Component } from 'react';
import { connect } from 'react-redux'
import DropdownActions from '../../Redux/DropdownRedux'
import { Row, ButtonGroup } from 'reactstrap'
import MapControl from '../GoogleMap/MapControl'
import MeasureTool from './MeasureTool/lib/index'
import $ from 'jquery'
import { t } from '../Translation'
import './Styles/control-custom.css'
import { get, isEmpty, isEqual } from 'lodash'
import { useTranslation } from 'react-i18next'

//#mapType
//  - roadmap  : displays the default road map view. This is the default map type.
//  - satellite : displays Google Earth satellite images.
//  - hybrid :  displays a mixture of normal and satellite views.
//  - terrain : displays a physical map based on terrain information.
const LSTMAPTYPE = [
  { key: "roadmap", name: "realtime_59" },
  { key: "hybrid", name: "realtime_60" },
  { key: "terrain", name: "realtime_61" }
]

const ButtonControl = (arg) => {
  const { t } = useTranslation()
  return (
    <a key={'a-' + arg.id}
      className={"btn btn-white btn-control-map" +
        (arg.disable ? ' disable' : '') + (arg.active ? ' btn-active' : '')
      }
      data-toggle="tooltip"
      data-placement="buttom"
      // title={arg.title}
      title={t(arg.title)}
      style={arg.style}
      // onClick={arg.onClick}>
      onClick={!arg.disable && arg.onClick}>
      <i key={"i-" + arg.id} className={arg.icon} />
    </a>
  )
}

class MapControlsCustom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeBtn: {
        measure: false,
        fullscreen: false,
        mapType: 'roadmap'
      },
      subMenu: 'dropdown-menu',
      displaySubBtn: {},
      measureToolObject: null,
    }
    this.wrapperRef = React.createRef();
  }

  componentWillMount() {
    let { activeBtn } = this.state
    let { activeButtons, defaultActiveButtons, GeofenceTypeData, map } = this.props

    this.createMeasureTool()
    this.props.getDataDropdown("GeofenceType")
    this.trafficLayer = new window.google.maps.TrafficLayer();
    if (defaultActiveButtons) {
      let _activeBtn = { ...activeBtn, ...(defaultActiveButtons || {}) }
      if (defaultActiveButtons['mapType']) map.setMapTypeId(defaultActiveButtons['mapType'])
      if (defaultActiveButtons['traffic']) this.trafficLayer.setMap(map)
      this.setState({ activeBtn: _activeBtn })
    }
    if (activeButtons && activeButtons['mapType']) map.setMapTypeId(activeButtons['mapType'])
    if (activeButtons && activeButtons['traffic']) this.trafficLayer.setMap(map)

  }


  componentDidMount() {
    window.addEventListener('fullscreenchange', this.onFullscreen)
    window.addEventListener('mousedown', (event) => {
      // console.log('MapControlCustom', this.state.displaySubBtn)
      let wrapperRef = document.getElementById("MapControlCustom")
      if (wrapperRef && !wrapperRef.contains(event.target)) {
        if (!isEmpty(this.state.displaySubBtn)) this.setState({ displaySubBtn: {} })
      }
    });
  }


  componentWillUnmount() {
    this.props.setDataDropdown([], "GeofenceType")
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

  onFullscreen = () => {
    let _activeBtn = JSON.parse(JSON.stringify(this.state.activeBtn))
    const isFullScreen = document.fullscreenElement
    if (isFullScreen) _activeBtn["fullscreen"] = true
    else _activeBtn["fullscreen"] = false
    this.setState({ activeBtn: _activeBtn })
  }

  toggleGeofLicen(e, lst, name, key) {
    if (name === undefined) {
      let _displaySubBtn = JSON.parse(JSON.stringify(this.state.displaySubBtn))
      _displaySubBtn = { geofLicen: !_displaySubBtn['geofLicen'] }
      this.setState(({ displaySubBtn: _displaySubBtn }))
    } else {
      let geof = []
      let { GeofenceTypeData, activeButtons } = this.props
      if (name === 'geofences') {
        if (lst.length !== GeofenceTypeData.length)
          geof = GeofenceTypeData.map((item) => item.key)

      } else if (name === 'geofencesType' && key !== undefined) {
        geof = [...lst]
        if (geof.find((k) => k === key)) geof = geof.filter((k) => k !== key)
        else geof.push(key)

      }
      let _activeBtn = JSON.parse(JSON.stringify(this.state.activeBtn))
      _activeBtn['geofences'] = geof
      this.setState({ activeBtn: _activeBtn })
      this.props.onToggleActive && this.props.onToggleActive("geofences", geof)
    }
    e.stopPropagation()
  }

  toggleMapType(e, id, type) {
    let _displaySubBtn = JSON.parse(JSON.stringify(this.state.displaySubBtn))
    if (type === undefined) {
      _displaySubBtn = { [id]: !_displaySubBtn[id] }
    }
    else {
      this.props.map.setMapTypeId(type);
      _displaySubBtn[id] = false
      let _activeBtn = JSON.parse(JSON.stringify(this.state.activeBtn))
      _activeBtn[id] = type
      this.setState({ activeBtn: _activeBtn })
      this.props.onToggleActive && this.props.onToggleActive(id, type)
    }
    this.setState(({ displaySubBtn: _displaySubBtn }))
    e.stopPropagation()
  }

  render() {
    let { subMenu, displaySubBtn, activeBtn, measureToolObject } = this.state

    let { map, width, position, beforeCusBtn, afterCusBtn, activeButtons,
      hiddenButtons, disableButtons, GeofenceTypeData, onToggleActive } = this.props

    let lstButtonControl = [
      ...(beforeCusBtn || []),
      { id: "geofLicen", icon: "icon-group-10493", style: { padding: '10px 12px 10px 6px' } },
      { id: "measure", title: "Measure", icon: "fas fa-pencil-ruler" },
      { id: "fullscreen", title: "Full Screen", icon: "icon-expand-arrows-alt", activeIcon: "fas fa-compress-arrows-alt" },
      { id: "mapType", title: "Map Style", icon: "fa fa-map", sub: LSTMAPTYPE },
      ...(afterCusBtn || [])
    ]
    // console.log('activeButtons', activeButtons)
    let _activeButtons = { ...activeBtn, ...(activeButtons || {}) }
    let _disableButtons = [...(disableButtons || [])]
    let _hiddenButtons = [...(hiddenButtons || [])]

    return (
      <MapControl position={position || 1} map={map} id={'MapControlCustom'} width={width || "auto"} zIndex={2}>
        <Row style={{ margin: 10 }}>
          <ButtonGroup className="btn-group-control-map" >
            {
              lstButtonControl.map(({ id, title, icon, activeIcon, style, sub }) => {
                if (_hiddenButtons.includes(id)) return ""

                if (id === 'geofLicen') {
                  let _geofences = [...get(_activeButtons, 'geofences', [])]
                  let disGeof = GeofenceTypeData && GeofenceTypeData.length > 0 ? '' : 'disable-goef'
                  let checkBoxGeofAll = "fa" + (_geofences.length < 1 ? "r fa-square"
                    : _geofences.length === GeofenceTypeData.length ? " fa-check-square"
                      : " fa-minus-square")

                  return <ButtonGroup key={'button-group-' + id}>
                    <div key={'button-' + id} className={displaySubBtn[id] ? "dropdown open" : "dropdown"} id='dd-info-geof'>
                      <ButtonControl
                        id={id}
                        title={title}
                        icon={icon}
                        disable={_disableButtons.includes(id)}
                        style={style}
                        onClick={(e) => this.toggleGeofLicen(e)} />

                      <ul className="dropdown-menu">
                        {!_hiddenButtons.includes("geofences") &&
                          <li className="dropdown-submenu" onMouseOver={() => { if (GeofenceTypeData && GeofenceTypeData.length > 0) this.setState({ subMenu: 'dropdown-menu show' }) }} onMouseOut={() => this.setState({ subMenu: 'dropdown-menu' })}>
                            <a className={disGeof} tabIndex="-1" onClick={(e) => this.toggleGeofLicen(e, _geofences, 'geofences')} >
                              <div> <i className={checkBoxGeofAll} style={{ marginRight: 4 }} />
                                {t('realtime_57')} <i className="fas fa-caret-right" ></i></div>
                            </a>
                            {GeofenceTypeData &&
                              <ul className={subMenu + ' scroll'} style={{ maxHeight: 260 }} onClick={(e) => this.toggleGeofLicen(e, 'geofencesType')}>
                                {GeofenceTypeData.length > 0 ? GeofenceTypeData.map((item, index) => {
                                  let checkBoxGeof = "fa" + (_geofences.find((k) => k === item.key) ? " fa-check-square" : "r fa-square")
                                  return (
                                    <li key={index}>
                                      <a onClick={(e) => this.toggleGeofLicen(e, _geofences, 'geofencesType', item.key)}>
                                        <div className="dropdown-box-style style-sub-dropdown" tabIndex="-1" title={item.value} >
                                          <i className={checkBoxGeof} style={{ marginRight: 4 }} />  {item.value}
                                        </div>
                                      </a>
                                    </li>
                                  )
                                }) :
                                  <li>
                                    <a>
                                      <div className="dropdown-box-style style-sub-dropdown" tabIndex="-1" >
                                        {t('realtime_54')}
                                      </div>
                                    </a>
                                  </li>
                                }

                              </ul>}
                          </li>}
                        {!_hiddenButtons.includes("nameGeof") && <li>
                          <a
                            className={_disableButtons.includes("nameGeof") ? 'disable-sub-checkbox' : ""}
                            onClick={(e) => !_disableButtons.includes("nameGeof") && this.onClick(e, 'nameGeof', _activeButtons)}>
                            <div className="style-sub-dropdown">
                              <i className={"fa" + (_activeButtons["nameGeof"] ? " fa-check-square" : "r fa-square")} style={{ marginRight: 4 }} />{t('realtime_115')}
                            </div>
                          </a>
                        </li>
                        }
                        {!_hiddenButtons.includes("licensePlate") && <li>
                          <a
                            className={_disableButtons.includes("licensePlate") ? 'disable-sub-checkbox' : ""}
                            onClick={(e) => !_disableButtons.includes("licensePlate") && this.onClick(e, 'licensePlate', _activeButtons)}>
                            <div className="style-sub-dropdown">
                              <i className={"fa" + (_activeButtons["licensePlate"] ? " fa-check-square" : "r fa-square")} style={{ marginRight: 4 }} />{t('realtime_58')}
                            </div>
                          </a>
                        </li>
                        }
                      </ul>
                    </div>
                  </ButtonGroup>
                } else if (sub) {
                  return (
                    <ButtonGroup style={{ backgroundColor: 'white' }}>
                      <div className={displaySubBtn[id] ? "dropdown open" : "dropdown"} >
                        <ButtonControl
                          id={id}
                          title={title}
                          icon={(_activeButtons[id] && activeIcon !== undefined) ? activeIcon : icon}
                          disable={_disableButtons.includes(id)}
                          onClick={(e) => this.toggleMapType(e, id)} />

                        <ul className="dropdown-menu dropdown-menu-map-style dropdown-alerts">
                          {sub.map((item, idx) => {
                            return (
                              <li key={"li" + idx} style={{ backgroundColor: _activeButtons[id] === item.key ? '#b1b3b3' : '#FFF' }}>
                                <a onClick={(e) => this.toggleMapType(e, id, item.key)}>
                                  <div className="style-sub-dropdown">
                                    {t(item.name)}
                                  </div>
                                </a>
                              </li>
                            )
                          })}
                          {id === "mapType" && <li>
                            <a
                              className={"traffic" + (_disableButtons.includes("traffic") ? ' disable-sub-checkbox' : "")}
                              onClick={(e) => !_disableButtons.includes("traffic") && this.onClick(e, 'traffic', _activeButtons)}>
                              <div className="style-sub-dropdown">
                                <i className={"fa" + (_activeButtons["traffic"] ? " fa-check-square" : "r fa-square")} style={{ marginRight: 4 }} />{t('การจราจร')}
                              </div>
                            </a>
                          </li>}
                        </ul>
                      </div>
                    </ButtonGroup>
                  )
                } else {
                  return (
                    <ButtonControl
                      id={id}
                      title={title}
                      icon={(_activeButtons[id] && activeIcon !== undefined) ? activeIcon : icon}
                      active={_activeButtons[id]}
                      style={style}
                      disable={_disableButtons.includes(id)}
                      onClick={(e) => this.onClick(e, id, _activeButtons)} />
                  )
                }
              })
            }

          </ButtonGroup>
        </Row>
      </MapControl>
    )
  }

  onClick(e, id, activeBtn) {
    let { onToggleActive, map } = this.props
    let { measureToolObject } = this.state
    let _activeBtn = JSON.parse(JSON.stringify(activeBtn))
    _activeBtn[id] = !_activeBtn[id]
    let objState = { activeBtn: _activeBtn, displaySubBtn: {} }
    if (id === 'licensePlate' || id === 'nameGeof') delete objState.displaySubBtn
    if (id === 'traffic') {
      delete objState.displaySubBtn
      if (_activeBtn[id]) this.trafficLayer.setMap(map)
      else this.trafficLayer.setMap(null)
    }
    this.setState(objState)
    if (id === 'measure' || id === 'fullscreen') {
      if (id === 'fullscreen') {
        document.getElementsByClassName('gm-control-active gm-fullscreen-control')[0].click()
      } else if (id === 'measure') {
        if (_activeBtn[id]) measureToolObject.start()
        else measureToolObject.end()
      }
    } else if (onToggleActive) {
      onToggleActive(id, _activeBtn[id])
    }
    e.stopPropagation()
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

// onToggleActive require

/* ----------------------- Format MapControlsCustomNew -----------------------
  1. map *require*
      => type: map
      => set map control custom ให้อยู่บน map ที่ส่งมา

  2. position (default: 1)
      => type: number
      => set ตำแหน่งของ map control custom

  3. width (default: 'auto')
      => type: string, number
      => set ขนาดความกว้างของ map control custom

  4. beforeCusBtn แลก afterCusBtn (default: undefined)
      => type: array
      => set ปุมขึ้นมาแบบเองโดย
          - beforeCusBtn จะอยู่ด้านหน้าปุ่มที่ default ไว้
          - afterCusBtn จะอยู่ด้านหลังปุ่มที่ default ไว้
      => ค่าใน array เป็น object ส่งค่ามาได้ดังนี้
          - id *require* : ไอดีของปุ่มนั้นๆ ใช้สำหรับอ้างอิงในการ set ต่างๆ
              => id ที่ default ไว้แล้ว : geofLicen, geofences, licensePlate, measure, fullscreen, mapType, traffic
          - title : คำที่แสดงเมื่อนำลูกศรไปชี้ สามารถใส่เป็น key dict ได้
          - icon *require* : ไอคอนที่ต้องการ set ให้แสดงบนปุ่มนั้นๆ
          - activeIcon : ไอคอนที่ต้องการ set ให้แสดงบนปุ่มเมื่อ id นั้นมีการ active อยู่
          - style : ใช้ set style ของปุ่ม (เน้นการใช้ set padding ในกรณีที่ icon ไม่อยู่ตรงการ Ex.icon geofences)
          - sub : ใช้สำหรับปุ่มที่ต้องการมีข้อมูลย่อยๆให้เลือก (Ex. mapType)
              => ส่งค่ามาเป็น array โดยที่ข้างในเป็น object ส่งค่า key, name

  5. defaultActiveButtons (default: undefined)
      => type: object
      => set default active ของปุ่ม
      => ใช้ id ของแต่ละปุ่มในการ set active { id: true/false }
      => กรณีเป็นแบบมี sub สามารถใส่ค่าเป็น key ใน sub นั้นไปได้เลยเลย { id: key }
      => กรณีพิเศษอย่าง id: geofences สามารถส่งค่ามาเป็น array ในนี้ได้เลย { "geofences": [id] }

  6. activeButtons (default: undefined)
      => type: object
      => set active ขอปุ่ม
      => ใช้ id ของแต่ละปุ่มในการ set active { id: true/false }
      => กรณีเป็นแบบมี sub สามารถใส่ค่าเป็น key ใน sub นั้นไปได้เลยเลย { id: key }
      => กรณีพิเศษอย่าง id: geofences สามารถส่งค่ามาเป็น array ในนี้ได้เลย { "geofences": [id] }

  7. disableButtons (default: undefined)
      => type: array
      => set disable ของปุ่ม
      => ใส่ id ของปุ่มใน array เพื่อใช้สำหรับ check [id]

  8. hiddenButtons (default: undefined)
      => type: array
      => set hide ของปุ่ม (เน้นใช้กับพวกปุ่มที่ default ไว้)
      => ใส่ id ของปุ่มใน array เพื่อใช้สำหรับ check [id]

  9. onToggleActive(id, value) (default: undefined)
      => type: function
      => จะส่งค่า id และ value กลับไป

  _______________________ ตัวอย่างในการส่งค่า _______________________

  defaultActiveButtons: { alert: true, licensePlate: true, dashboard: true, geofences: [3, 8, 10], testest: 4},
  activeButtons: { cluster: true, mapType: 'satellite'}

  <MapControlsCustom
    position={1}
    width={"auto"}
    map={this.map}
    beforeCusBtn={[
      { id: "alert", title: "Alert", icon: "fa fa-bell" },
      { id: "cluster", title: "Cluster", icon: "icon-layer-group" },
      { id: "objects", title: "Objects", icon: "icon-location-arrow" },
      { id: "fitObjects", title: "Fit Objects", icon: "icon-expand" },
      {
        id: "testest", title: "TESTTTTT", icon: "fas fa-air-freshener", sub: [
          { key: 1, name: 'test1' },
          { key: 2, name: 'test2' },
          { key: 3, name: 'test3' },
          { key: 4, name: 'test4' },
          { key: 5, name: 'test5' }
        ]
      },
    ]}
    afterCusBtn={[
      { id: "dashboard", title: "Dashboard", icon: "fa fa-area-chart" },
      { id: "dashboard2", title: "Dashboard", icon: "fa fa-filter" },
      { id: "info", title: "Info", icon: "fa fa-info-circle" }
    ]}
    defaultActiveButtons={defaultActiveButtons}
    activeButtons={activeButtons}
    disableButtons={["fullscreen"]}
    onToggleActive={(id, value) => {
      let _activeButtons = JSON.parse(JSON.stringify(activeButtons))
      _activeButtons[id] = value
      console.log('_activeButtons', _activeButtons)
      this.setState({ activeButtons: _activeButtons })
    }}
    hiddenButtons={["measure", "dashboard"]}
  />

  *สามารถ test การส่งค่าได้ที่ file: TestScreen ใน folder: TestScreen
  _______________________________________________________________


-------------------------------------------------------------------------------------- */

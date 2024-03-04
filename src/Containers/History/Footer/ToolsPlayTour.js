import React, { Component } from 'react';
import { connect } from 'react-redux'
import HistoryActions from '../../../Redux/HistoryRedux'
import { ButtonGroup } from "reactstrap";
import { Menu, Dropdown, Button, Checkbox, Row } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { t } from '../../../Components/Translation'

let playTourActive = null
let playIndex = 0
let activeLineIndex = 0

class ToolsPlayTour extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying: false,
      speedLevel: 1000,
      visible: false,
      checkDisabled: {
        ck1: false,
        ck2: false,
        ck3: false,
        ck4: false,
        ck5: false,
        ck6: false,
        ck7: false
      }
    }
    this.setPlay = this.setPlay.bind(this);
    this.setPause = this.setPause.bind(this);
    this.setStop = this.setStop.bind(this);
    this.playTour = this.playTour.bind(this);
    this.speedChange = this.speedChange.bind(this);
    this.setDefaultPlayTour = this.setDefaultPlayTour.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate(prevProps, nextState) {
    if (nextState.speedLevel !== this.state.speedLevel) {
      this.state.isPlaying && this.setPlay()
    }

    if (prevProps.chartName !== this.props.chartName) {
      this.setDefaultPlayTour()
    }
  }

  componentWillUnmount() {
    this.setDefaultPlayTour()
  }

  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  }

  setDefaultPlayTour() {
    this.setStop(false)
    this.props.setPointValue({ speed: '', rpm: '', fuel: '', canbus_cooltemp: '', canbus_acc_pedal: '', date: '' })
    this.props.setDefaultMarkTour()
    this.setState({ isPlaying: false })
    this.props.setChartCurrent(this.props.chartName)
    this.props.setRenderChart(true)
  }


  setPlay() {
    this.closeInfoWindow()
    clearInterval(playTourActive);
    playTourActive = setInterval(this.playTour, this.state.speedLevel)
    this.setState({ isPlaying: true })
  }

  setPause() {
    clearInterval(playTourActive);
  }

  setStop(isLastPoint) {
    let { dataAllPoint } = this.props
    clearInterval(playTourActive);
    playIndex = 0
    activeLineIndex = 0
    if (!isLastPoint) {
      this.props.onPlaying(playIndex, false)
      if (dataAllPoint.length > 0) {
        let markTourInfo = this.setMarkTourInfo(dataAllPoint, 0)
        this.props.setMarkTour(markTourInfo)
      }
      this.props.setPointValue({ speed: '', rpm: '', fuel: '', canbus_cooltemp: '', canbus_acc_pedal: '', date: '' })
    }
  }

  speedChange(speedLevel) {
    this.setPause()
    let speedChange

    switch (parseInt(speedLevel)) {   //speedChange : 1000 = 1s
      case 2:
        speedChange = 700
        break;
      case 3:
        speedChange = 500
        break;
      case 4:
        speedChange = 300
        break;
      case 5:
        speedChange = 100
        break;
      case 6:
        speedChange = 60
        break;
      default:
        speedChange = 1000
        break;
    }

    this.setState({ speedLevel: speedChange })
    this.setState(prevState => prevState)
  }

  closeInfoWindow() {
    this.props.setMapState(null, null, 1)
    this.props.setShowBoxSearch(false)
  }

  playTour() {
    playIndex++
    let { dataAllPoint } = this.props
    let markTourInfo

    if (dataAllPoint.length > 0 && dataAllPoint.length > playIndex) {
      markTourInfo = this.setMarkTourInfo(dataAllPoint, playIndex)
      playIndex++
      this.props.setMarkTour(markTourInfo)
      this.props.onPlaying(playIndex, true)
    }
    else {
      this.setStop(true)
    }
  }

  setMarkTourInfo(dataAllPoint, playIndex) {
    return {
      index: playIndex,
      location: dataAllPoint[playIndex].location,
      course: dataAllPoint[playIndex].course,
      gpsdate: dataAllPoint[playIndex].gpsdate,
      speed: dataAllPoint[playIndex].speed,
      rpm: dataAllPoint[playIndex].rpm,
      fuel: dataAllPoint[playIndex].fuel,
      coolant: dataAllPoint[playIndex].coolant,
      chartName: this.props.chartName,

      admin_level1_name: dataAllPoint[playIndex].admin_level1_name,
      admin_level2_name: dataAllPoint[playIndex].admin_level2_name,
      admin_level3_name: dataAllPoint[playIndex].admin_level3_name,
      driver_cards_name: dataAllPoint[playIndex].driver_cards_name,
      lat: dataAllPoint[playIndex].lat,
      lng: dataAllPoint[playIndex].lng,
      time: dataAllPoint[playIndex].time,
      canbus_fuel_cons: dataAllPoint[playIndex].canbus_fuel_cons,
      canbus_cooltemp: dataAllPoint[playIndex].canbus_cooltemp,
      canbus_acc_pedal: dataAllPoint[playIndex].canbus_acc_pedal
    }
  }

  onChange(checkedValues) {
    let checkDisabled = {
      ck1: false,
      ck2: false,
      ck3: false,
      ck4: false,
      ck5: false,
      ck6: false,
      ck7: false
    }

    if (checkedValues.length == 1) {
      let id = checkedValues[0]
      if (id == 1) checkDisabled.ck1 = true
      else if (id == 2) checkDisabled.ck2 = true
      else if (id == 3) checkDisabled.ck3 = true
      else if (id == 4) checkDisabled.ck4 = true
      else if (id == 5) checkDisabled.ck5 = true
      else if (id == 6) checkDisabled.ck6 = true
      else if (id == 7) checkDisabled.ck7 = true
    }

    this.setState({ checkDisabled })
    this.props.setShowChart(checkedValues)
  }

  render() {
    let { checkDisabled } = this.state
    let styleText = { fontWeight: 500 }
    const menu = (
      <Menu>
        <Checkbox.Group
          style={{ width: '100%', marginLeft: 10 }}
          defaultValue={[...this.props.showChartList]}
          onChange={this.onChange}>
          <Row>
            <Checkbox value={1} disabled={checkDisabled.ck1}><span style={styleText} >{t('history_9')}</span></Checkbox>
          </Row>
          <Row>
            <Checkbox value={2} disabled={checkDisabled.ck2}><span style={styleText}>{t('history_10')}</span></Checkbox>
          </Row>
          <Row>
            <Checkbox value={6} disabled={checkDisabled.ck6}><span style={styleText}>{t('history_16')}</span></Checkbox>
          </Row>
          <Row>
            <Checkbox value={3} disabled={checkDisabled.ck3}><span style={styleText}>{t('history_11')}</span></Checkbox>
          </Row>
          <Row>
            <Checkbox value={5} disabled={checkDisabled.ck5}><span style={styleText}>{t('history_14')}</span></Checkbox>
          </Row>
          <Row>
            <Checkbox value={4} disabled={checkDisabled.ck4}><span style={styleText}>{t('history_12')}</span></Checkbox>
          </Row>
          {
            (this.props.dataLogin.userId == 117 || this.props.dataLogin.userId == 2656 || this.props.dataLogin.userId == 2657) && <Row>
              <Checkbox value={7} disabled={checkDisabled.ck7}><span style={styleText}>{t('history_44')}</span></Checkbox>
            </Row>
          }
        </Checkbox.Group>
      </Menu>
    );

    return <ButtonGroup>
      <a className="btn btn-option btn-sm"
        onClick={() => this.setPlay()}>
        <i className="fa fa-play" title={"Play"}></i>
      </a>

      <a className="btn btn-option btn-sm"
        onClick={() => this.setPause()}>
        <i className="fa fa-pause" title={"Pause"}></i>
      </a>

      <a className="btn btn-option btn-sm"
        onClick={() => this.setStop(false)}>
        <i className="fa fa-stop" title={"Stop"}></i>
      </a>

      <select className="btn-select"
        onChange={(e) => this.speedChange(e.target.value)}>
        <option value="1">x1</option>
        <option value="2">x2</option>
        <option value="3">x3</option>
        <option value="4">x4</option>
        <option value="5">x5</option>
        <option value="6">x6</option>
      </select>

      <Dropdown
        overlay={menu}
        onVisibleChange={this.handleVisibleChange}
        visible={this.state.visible}>
        <Button
          visible={true}
          style={{
            height: 28,
            width: 125,
            padding: 0,
            marginLeft: 10,
            border: '1px solid #e7eaec',
          }}>
          <i class="fa fa-area-chart" style={{ marginRight: 5 }} />{t("history_18")} <DownOutlined />
        </Button>
      </Dropdown>
    </ButtonGroup>
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  dataAllPoint: state.history.dataAllPoint,
  showChartList: state.history.showChartList,
  showChartListTemp: state.history.showChartListTemp
});

const mapDispatchToProps = (dispatch) => ({
  setPointValue: (pointValue) => dispatch(HistoryActions.setPointValue(pointValue)),
  setMarkTour: (markTourInfo) => dispatch(HistoryActions.setMarkTour(markTourInfo)),
  setDefaultMarkTour: () => dispatch(HistoryActions.setDefaultMarkTour()),
  setChartCurrent: (chartName) => dispatch(HistoryActions.setChartCurrent(chartName)),
  setMapState: (positionMarker, infoMarker, infoType) => dispatch(HistoryActions.setMapState(positionMarker, infoMarker, infoType)),
  setShowBoxSearch: (isShow) => dispatch(HistoryActions.setShowBoxSearch(isShow)),
  setShowChart: (chartIdList) => dispatch(HistoryActions.setShowChart(chartIdList)),
  setRenderChart: (isRender) => dispatch(HistoryActions.setRenderChart(isRender))
})

export default connect(mapStateToProps, mapDispatchToProps)(ToolsPlayTour)

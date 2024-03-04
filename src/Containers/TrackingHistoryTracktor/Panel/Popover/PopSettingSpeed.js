import React, { Component } from 'react'
import { connect } from 'react-redux'
import TrackingHistoryActions from '../../../../Redux/TrackingHistoryRedux'
import '../../Styles/footer.css'
import { Menu, Dropdown, Button, Switch } from 'antd';
import 'antd/dist/antd.css';
import { t } from '../../../../Components/Translation'
import $ from 'jquery'

class PopSettingSpeed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      popVisible: false,
      popMainVisible: true,
      popChartVisible: false,
      popSpeedVisible: false
    }
    this.chartVisibled = []
    this.speedVisibled = 1
  }

  // shouldComponentUpdate(){

  // }
  componentWillMount() {
    this.chartVisibled = this.props.chartVisibled
    this.speedVisibled = this.props.speedVisibled
  }



  shouldComponentUpdate(nextProps) {
    let { speedVisibled } = this.props

    if (nextProps.speedVisibled !== speedVisibled) {
      this.setSpeedLabel(nextProps.speedVisibled)
      return false
    }

    return true
  }

  popHeader(title, icon, type) {
    return <div className="pop-header">
      <span span style={{ fontSize: 12, fontWeight: 600, paddingLeft: 5 }}>
        {/* <i className="fa fa-chevron-left" style={{ fontSize: 12, marginRight: 10 }} /> */}
        <i className={icon} style={{ fontSize: 12, marginLeft: 10, marginRight: 1 }} /><span id="sp_speed_current_1" >{this.props.speedVisibled}x</span> {t(title)}
      </span>
    </div>
  }

  //#region Speed Setting
  popSpeed() {
    return <div style={{ width: 180, height: 280, backgroundColor: "white", boxShadow: "rgb(0 0 0 / 30%) 0px 0px 2px" }}>
      {this.popHeader("history_95", "fa fa-forward")}
      {this.popSpeedList("1x", 1)}
      {this.popSpeedList("2x", 2)}
      {this.popSpeedList("3x", 3)}
      {this.popSpeedList("4x", 4)}
      {this.popSpeedList("5x", 5)}
      {this.popSpeedList("6x", 6)}
    </div >
  }

  popSpeedList(text, index) {
    let isCheck = this.speedVisibled == index ? 'visible' : 'hidden'
    return <div className="pop-list" onClick={() => this.setSpeedVisibled(index)}>
      <i id={"speed-" + index} className="fa fa-check" style={{ fontSize: 12, marginLeft: 5, visibility: isCheck }} />
      <span span style={{ fontSize: 12, fontWeight: 600, paddingLeft: isCheck ? 10 : 25 }}>{text}</span>
    </div>
  }

  setSpeedLabel(level) {
    $("#sp_speed_current_1").text(level + "x")
    $("#sp_speed_current_2").text(level + "x")
  }

  setSpeedVisibled(index) {
    this.setSpeedLabel(index)
    let speed = [1, 2, 3, 4, 5, 6]
    for (let idx in speed) {
      if (speed[idx] == index)
        $("#speed-" + speed[idx]).css("visibility", "visible");
      else
        $("#speed-" + speed[idx]).css("visibility", "hidden")
    }
    this.speedVisibled = index
    this.props.setValue("speedVisibled", index)
    this.setTimeTour(index)
  }

  setTimeTour(speedLevel) {
    let speedChange = 0
    switch (parseInt(speedLevel)) {   //speedChange : 1000 = 1s
      case 1:
        speedChange = 1200
        break;
      case 2:
        speedChange = 1000
        break;
      case 3:
        speedChange = 800
        break;
      case 4:
        speedChange = 400
        break;
      case 5:
        speedChange = 200
        break;
      case 6:
        speedChange = 100
        break;
    }
    this.props.setValue("timeTour", speedChange)
  }
  //#endregionf

  popMainChange(popVisible, name) {
    let popMainVisible = false
    if (popVisible && popMainVisible == false) popMainVisible = true
    if (popVisible === false)
      this.setState({ popVisible })
    else {
      let popChartVisible = false, popSpeedVisible = false
      if (name == "chart")
        popChartVisible = true
      else
        popSpeedVisible = true
      this.setState({ popVisible, popChartVisible, popSpeedVisible })
    }

  }

  render() {
    let { popVisible, popMainVisible, popSpeedVisible } = this.state


    return (
      <Dropdown
        overlay={
          popSpeedVisible ? this.popSpeed() :
            <span style={{ visible: 'hidden' }}></span>
        }
        placement="topRight"
        trigger={["click"]}
        onVisibleChange={(popVisible) => this.popMainChange(popVisible, "speed")}
        visible={popVisible}
        overlayClassName={"pop-setting-speed"}
      >
        <a className="btn btn-option btn-sm btn-option">
          {/* onClick={() => this.popMainChange("chart")}> */}
          <i className="fa fa-forward" title={"Speed"} style={{ fontSize: 12 }} /><span id="sp_speed_current_2" >{this.props.speedVisibled}x</span>
        </a>
      </Dropdown>
    )
  }

}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  speedVisibled: state.trackingHistory.speedVisibled,
})

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(TrackingHistoryActions.setValue(name, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PopSettingSpeed)

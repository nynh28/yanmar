import React, { Component } from 'react'
import { connect } from 'react-redux'
import TrackingHistoryActions from '../../../../Redux/TrackingHistoryRedux'
import '../../Styles/footer.css'
import { Menu, Dropdown, Button, Switch } from 'antd';
import 'antd/dist/antd.css';
import { t } from '../../../../Components/Translation'
import $ from 'jquery'

class PopSettingChart extends Component {
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
  // componentDidMount() {
  //     for (let index in this.chartVisibled) {
  //         this.setCheckbox(this.chartVisibled[index])
  //     }
  // }

  handleVisibleChange = popVisible => {
    let popMainVisible = false
    if (popVisible && popMainVisible == false) popMainVisible = true

    this.setState({ popVisible, popMainVisible, popChartVisible: false, popSpeedVisible: false });
  };

  popHeaderChange() {
    this.setState({ popMainVisible: true, popChartVisible: false, popSpeedVisible: false })
  }

  // popMainChange(name) {
  //   console.log('popMainChange', name)
  //   let popChartVisible = false, popSpeedVisible = false
  //   if (name == "chart")
  //     popChartVisible = true
  //   else
  //     popSpeedVisible = true

  //   this.setState({ popMainVisible: false, popChartVisible, popSpeedVisible })
  // }

  popHeader(title, icon, type) {
    return <div className="pop-header">
      <span span style={{ fontSize: 12, fontWeight: 600, paddingLeft: 5 }}>
        {/* <i className="fa fa-chevron-left" style={{ fontSize: 12, marginRight: 10 }} /> */}
        <i className={icon} style={{ fontSize: 18, marginLeft: 0, marginRight: 5 }} />{t(title)}
      </span>
    </div>
  }

  popMain() {
    return <div style={{ width: 180, height: 80, backgroundColor: "white", boxShadow: "rgb(0 0 0 / 30%) 0px 0px 2px" }}>
      <div className="pop-list" onClick={() => this.popMainChange("chart")}>
        <span span style={{ fontSize: 12, fontWeight: 600, paddingLeft: 5 }}>
          <i className="icon-1plusdashboard-01" style={{ fontSize: 16, marginRight: 10 }} />{t('history_18')}</span>
        <div className="pop-header-right"  >
          <i className="fa fa-chevron-right" style={{ fontSize: 12 }} />
        </div>
      </div>

      <div className="pop-list" onClick={() => this.popMainChange("speed")}>
        <span span style={{ fontSize: 12, fontWeight: 600, paddingLeft: 5 }}>
          <i className="icon-gauge" style={{ fontSize: 12, marginRight: 10 }} />{t('history_95')}</span>
        <div className="pop-header-right"  >
          <i className="fa fa-chevron-right" style={{ fontSize: 12 }} />
        </div>
      </div>
    </div >
  }

  //#region Chart Setting
  popChart() {
    return <div style={{ width: 200, height: 'auto', backgroundColor: "white", boxShadow: "rgb(0 0 0 / 30%) 0px 0px 2px" }}>
      {this.popHeader("history_18", "icon-1plusdashboard-01")}
      {this.popChartList("history_9", 1)}
      {this.popChartList("history_10", 2)}
      {/* {this.popChartList("history_16", 3)} */}
      {/* {this.popChartList("history_11", 4)} */}
      {this.popChartList("history_14", 5)}
      {this.popChartList("history_121", 9)}
      {this.popChartList("history_12", 6)}
      {this.popChartList("history_112", 8)}
      {this.props.option_temperature.length > 0 && this.popChartList("history_44", 7)}


      <div className="pop-footer" onClick={() => {
        this.props.setValue("chartVisibled", this.chartVisibled)
        this.props.setValue("isRenderChart", !this.props.isRenderChart)
        this.setState({ popVisible: false, popMainVisible: false, popChartVisible: false, popSpeedVisible: false });
      }}>
        <span span style={{ fontSize: 12, fontWeight: 600, paddingLeft: 15 }}>{t("history_96")}</span>
      </div>

    </div >
  }

  popChartList(text, index) {
    let isCheck = this.chartVisibled.includes(index)

    return <div className="pop-list" onClick={() => {
      let chartVisibled = JSON.parse(JSON.stringify(this.chartVisibled))
      if (chartVisibled.includes(index)) {
        chartVisibled = chartVisibled.filter(value => value != index);
        this.setCheckbox(index, false)
      }
      else {
        chartVisibled.push(index)
        this.setCheckbox(index, true)
      }
      this.chartVisibled = chartVisibled

      // this.props.setValue("chartVisibled", this.chartVisibled)
    }}>
      <i id={"chb-" + index} className={isCheck ? "fa fa-check-square" : "far fa-square"} style={{ fontSize: 12, marginLeft: 5 }} />
      <span span style={{ fontSize: 12, fontWeight: 600, paddingLeft: 15 }}>{t(text)}</span>
    </div>
  }

  setCheckbox(index, isCheck) {
    if (isCheck) {
      $("#chb-" + index).removeClass("far fa-square")
      $("#chb-" + index).addClass("fa fa-check-square")
    }
    else {
      $("#chb-" + index).removeClass("fa fa-check-square")
      $("#chb-" + index).addClass("far fa-square")
    }
  }
  //#endregion

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
    let { popVisible, popMainVisible, popChartVisible } = this.state

    return (
      <Dropdown
        overlay={
          popChartVisible ? this.popChart() :
            <span style={{ visible: 'hidden' }}></span>
        }
        placement="topRight"
        trigger={["click"]}
        onVisibleChange={(popVisible) => this.popMainChange(popVisible, "chart")}
        // onVisibleChange={this.handleVisibleChange}
        visible={popVisible}
        overlayClassName={
          popMainVisible ? "pop-setting-main" :
            popChartVisible ? "pop-setting-chart" : "pop-setting-speed"
        }
      >
        <a className="btn btn-option btn-sm btn-option">
          {/* onClick={() => this.popMainChange("chart")}> */}
          <i className="icon-1plusdashboard-01" title={"Chart"} style={{ fontSize: 16 }} />
        </a>
      </Dropdown>
    )
  }

}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  chartVisibled: state.trackingHistory.chartVisibled,
  option_temperature: state.trackingHistory.option_temperature
})

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(TrackingHistoryActions.setValue(name, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PopSettingChart)

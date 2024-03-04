import React, { Component } from 'react'
import { connect } from 'react-redux'
import TrackingHistoryActions from '../../../../Redux/TrackingHistoryRedux'
import '../../Styles/footer.css'
import { Menu, Dropdown, Button, Switch } from 'antd';
import 'antd/dist/antd.css';
import { t } from '../../../../Components/Translation'
import $ from 'jquery'

class PopSetting extends Component {
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

    popMainChange(name) {
        let popChartVisible = false, popSpeedVisible = false
        if (name == "chart")
            popChartVisible = true
        else
            popSpeedVisible = true

        this.setState({ popMainVisible: false, popChartVisible, popSpeedVisible })
    }

    popHeader(title, icon, type) {
        return <div className="pop-header" onClick={() => this.popHeaderChange()}>
            <span span style={{ fontSize: 12, fontWeight: 600, paddingLeft: 5 }}>
                <i className="fa fa-chevron-left" style={{ fontSize: 12, marginRight: 10 }} />
                <i className={icon} style={{ fontSize: 12, marginLeft: 10, marginRight: 5 }} />{t(title)}
            </span>
        </div>
    }

    popMain() {
        return <div style={{ width: 180, height: 80, backgroundColor: "white", boxShadow: "rgb(0 0 0 / 30%) 0px 0px 2px" }}>
            <div className="pop-list" onClick={() => this.popMainChange("chart")}>
                <span span style={{ fontSize: 12, fontWeight: 600, paddingLeft: 5 }}>
                    <i className="fa fa-area-chart" style={{ fontSize: 12, marginRight: 10 }} />{t('history_18')}</span>
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
            {this.popHeader("history_18", "fa fa-area-chart")}
            {this.popChartList("history_9", 1)}
            {this.popChartList("history_10", 2)}
            {this.popChartList("history_16", 3)}
            {this.popChartList("history_11", 4)}
            {this.popChartList("history_14", 5)}
            {this.popChartList("history_12", 6)}
            {[117, 2656, 2657].includes(this.props.dataLogin.userId) && this.popChartList("history_44", 7)}


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

    //#region Speed Setting
    popSpeed() {
        return <div style={{ width: 180, height: 280, backgroundColor: "white", boxShadow: "rgb(0 0 0 / 30%) 0px 0px 2px" }}>
            {this.popHeader("history_95", "icon-gauge")}
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

    setSpeedVisibled(index) {
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

    render() {
        let { popVisible, popMainVisible, popChartVisible, popSpeedVisible } = this.state
        return (
            <Dropdown
                overlay={
                    popMainVisible ? this.popMain() :
                        popChartVisible ? this.popChart() :
                            popSpeedVisible ? this.popSpeed() : <span style={{ visible: 'hidden' }}></span>
                }
                placement="topRight"
                trigger={["click"]}
                onVisibleChange={this.handleVisibleChange}
                visible={popVisible}
                overlayClassName={
                    popMainVisible ? "pop-setting-main" :
                        popChartVisible ? "pop-setting-chart" : "pop-setting-speed"
                }
            >
                <a className="btn btn-option btn-sm btn-undo"
                    onClick={() => { }}>
                    <i className="fa fa-cog" title={"Setting"}></i>
                </a>
            </Dropdown>
        )
    }
}

const mapStateToProps = (state) => ({
    dataLogin: state.signin.dataLogin,
    chartVisibled: state.trackingHistory.chartVisibled,
    speedVisibled: state.trackingHistory.speedVisibled,
    // isRenderChart: state.trackingHistory.isRenderChart,
})

const mapDispatchToProps = (dispatch) => ({
    setValue: (name, value) => dispatch(TrackingHistoryActions.setValue(name, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PopSetting)

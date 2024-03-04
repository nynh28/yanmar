import React, { Component } from 'react';
import { connect } from 'react-redux'
import HistoryActions from '../../../Redux/HistoryRedux'
import { ButtonGroup } from "reactstrap";

let playTourActive = null
let playIndex = 0

class ToolsPlayTour extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isPlaying: false,
            speedLevel: 1200
        }
        this.setPlay = this.setPlay.bind(this);
        this.setPause = this.setPause.bind(this);
        this.setStop = this.setStop.bind(this);
        this.playTour = this.playTour.bind(this);
        this.speedChange = this.speedChange.bind(this);
        this.setDefaultPlayTour = this.setDefaultPlayTour.bind(this);
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

    setDefaultPlayTour() {
        this.setStop()
        this.props.setPointValue({ value: '', unit: '', date: '' })
        this.props.setDefaultMarkTour()
        this.setState({ isPlaying: false })
        this.props.setChartCurrent(this.props.chartName)
    }

    setPlay() {
        clearInterval(playTourActive);
        playTourActive = setInterval(this.playTour, this.state.speedLevel)
        this.setState({ isPlaying: true })
    }

    setPause() {
        clearInterval(playTourActive);
    }

    setStop() {
        clearInterval(playTourActive);
        playIndex = 0
    }

    speedChange(speedLevel) {
        this.setPause()
        let speedChange

        switch (parseInt(speedLevel)) {   //speedChange : 1000 = 1s
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
            default:
                speedChange = 1200
                break;
        }

        this.setState({ speedLevel: speedChange })
        this.setState(prevState => prevState)
    }

    playTour() {
        let { dataAllPoint } = this.props
        let markTourInfo

        if (dataAllPoint.length > 0 && dataAllPoint.length > playIndex) {

            markTourInfo = {
                index: playIndex,
                location: dataAllPoint[playIndex].location,
                course: dataAllPoint[playIndex].course,
                gpsdate: dataAllPoint[playIndex].gpsdate,
                speed: dataAllPoint[playIndex].speed,
                rpm: dataAllPoint[playIndex].rpm,
                fuel: dataAllPoint[playIndex].fuel,
                coolant: dataAllPoint[playIndex].coolant,
                chartName: this.props.chartName
            }
            playIndex++
            this.props.setMarkTour(markTourInfo)
        }
        else {
            this.setStop()
        }
    }

    render() {
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
                onClick={() => this.setStop()}>
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
        </ButtonGroup>
    }
}

const mapStateToProps = (state) => ({
    dataAllPoint: state.history.dataAllPoint
});

const mapDispatchToProps = (dispatch) => ({
    setPointValue: (pointValue) => dispatch(HistoryActions.setPointValue(pointValue)),
    setMarkTour: (markTourInfo) => dispatch(HistoryActions.setMarkTour(markTourInfo)),
    setDefaultMarkTour: () => dispatch(HistoryActions.setDefaultMarkTour()),
    setChartCurrent: (chartName) => dispatch(HistoryActions.setChartCurrent(chartName))
})

export default connect(mapStateToProps, mapDispatchToProps)(ToolsPlayTour)
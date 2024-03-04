import React, { Component } from 'react'
import { connect } from 'react-redux'
import PlaybackActions from '../../../Redux/PlaybackRedux'
import { get } from 'lodash'
import $ from 'jquery'
import { Row, Col } from "reactstrap";
import '../styles/footer.css'
import SliderBar from '../Panels/SliderBar'
// import BarChart from '../Chart/BarChart'
// import BarChart from '../Chart/BarChartV2'
import BarChart from '../Chart/BarChartV3'
import moment from 'moment';

// import { t } from '../../../Components/Translation'
// import PopSetting from './Popover/PopSetting'


class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.refBarChart = null
    this.isCanPlay = false
    this.isStop = false
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { isMuted, isPlaying, dataChart, listVideo, listVideoTemp, videoTime, defaultVisualRange } = this.props

    if (nextProps.isMuted !== isMuted) {
      this.setIconVolume(nextProps.isMuted)
      return false
    }

    if (nextProps.isPlaying !== isPlaying) {
      this.setIconPlaying(nextProps.isPlaying)
      return false
    }

    if (nextProps.dataChart !== dataChart) {
      this.setToolVisibled(nextProps.dataChart)
      return false
    }

    if (nextProps.listVideo !== listVideo
      || nextProps.listVideoTemp !== listVideoTemp
      || nextProps.defaultVisualRange !== defaultVisualRange
    ) {
      return false
    }


    if (nextProps.videoTime !== videoTime) {
      // $("#lb_time").text(moment(nextProps.videoTime).format("HH:mm:ss"))
      $("#lb_time").text(nextProps.videoTime)
      return false
    }

    return true
  }

  componentDidMount() {
    let { isMuted, isPlaying, dataChart } = this.props
    this.setIconVolume(isMuted)
    this.setIconPlaying(isPlaying)
    this.setToolVisibled(dataChart)
  }

  setIconVolume(isMuted) {
    if (isMuted) {
      $("#ic-volume").removeClass("fas fa-volume-up")
      $("#ic-volume").addClass("fas fa-volume-mute")
    }
    else {
      $("#ic-volume").removeClass("fas fa-volume-mute")
      $("#ic-volume").addClass("fas fa-volume-up")
    }
  }

  setIconPlaying(isPlay) {
    if (isPlay) {
      $("#ic-playing").removeClass("fa fa-play")
      $("#ic-playing").addClass("fa fa-pause")
    }
    else {
      $("#ic-playing").removeClass("fa fa-pause")
      $("#ic-playing").addClass("fa fa-play")
    }
  }

  setToolVisibled(data) {
    if (data.length > 0) {
      this.props.setValue("isPlaying", true)
      this.isCanPlay = true
      $("#btn_playing").removeAttr("style")
      $("#btn_stop").removeAttr("style")
      $("#btn_volume").removeAttr("style")
    }
    else {
      this.props.setValue("isPlaying", false)
      $("#btn_playing").css("cursor", "no-drop");
      $("#btn_stop").css("cursor", "no-drop");
      $("#btn_volume").css("cursor", "no-drop");
      this.isCanPlay = false
    }
  }

  render() {
    console.log(">> RENDER FOOTER << : ")

    return (<div style={{ height: 'auto', backgroundColor: '#FFF' }} >
      {/* <div style={{ margin: '0px 0px -15px 0px', padding: '0px 13px 0px 16px' }}> */}
      <div className="footer-header-setting">
        <div className="bar-tools">
          <a
            id="btn_playing"
            className="btn btn-option btn-sm btn-play"
            onClick={() => {
              this.isCanPlay && this.props.setPlaying()

              if (this.isStop = true) {
                this.props.setValue("listVideo", this.props.listVideoTemp)
              }
              this.isStop = false
            }}
          >
            <i id="ic-playing" className="fa fa-play" title={"Play"}></i>
          </a>

          <a
            id="btn_stop"
            className="btn btn-option btn-sm btn-undo"
            onClick={() => {
              if (this.isCanPlay) {
                let listEmpty = [], count = 0
                while (count < this.props.listVideo.length) {
                  listEmpty.push({})
                  count++
                }
                this.isStop = true
                this.props.setValue("isPlaying", false)
                this.props.setValue("listVideo", listEmpty)
              }
            }}
          >
            <i className="fa fa-stop" title={"Stop"}></i>
          </a>

          <a
            id="btn_volume"
            className="btn btn-option btn-sm btn-undo"
            onClick={() => this.isCanPlay && this.props.setMuted()}
          >
            <i id="ic-volume" className="fas fa-volume-up" title={"Muted"}></i>
          </a>

          {/* <span id="lb_time" style={{ paddingLeft: 10, paddingRight: 20, fontSize: 12 }}>00:00:00</span > */}

          <div className="bar-tools-right-setting">
            {/* <a className="btn btn-option btn-sm btn-undo"
              onClick={() => {
              }}>
              <i className="fa fa-search-minus" title={"Zoom Out"}></i>
            </a>

            <a className="btn btn-option btn-sm btn-undo"
              onClick={() => { }}>
              <i className="fa fa-search-plus" title={"Zoom In"}></i>
            </a> */}

            <a className="btn btn-option btn-sm btn-undo"
              onClick={() => {
                this.refBarChart !== null && this.refBarChart.updateOptions({
                  xaxis: {
                    type: 'datetime',
                    labels: {
                      datetimeUTC: false,
                      datetimeFormatter: {
                        year: 'yyyy',
                        month: 'MMM \'yy',
                        day: 'dd MMM',
                        hour: 'HH:mm'
                      },
                    },
                    min: new Date(this.props.defaultVisualRange[0]).getTime(),
                    max: new Date(this.props.defaultVisualRange[1]).getTime(),
                    tickPlacement: 'between'
                  },
                })
              }}>
              <i className="fa fa-undo" title={"Reset"}></i>
            </a>

          </div>
        </div>
      </div>

      <div className="footer-panel-bar-chart scrollbar-custom-2">
        <BarChart refBarChart={(e) => this.refBarChart = e} />
      </div>
    </div >
    )
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  config: state.signin.config,
  isMuted: state.playback.isMuted,
  isPlaying: state.playback.isPlaying,
  dataChart: state.playback.dataChart,
  listVideo: state.playback.listVideo,
  listVideoTemp: state.playback.listVideoTemp,
  videoTime: state.playback.videoTime,
  defaultVisualRange: state.playback.defaultVisualRange,

})

const mapDispatchToProps = (dispatch) => ({
  setMuted: () => dispatch(PlaybackActions.setMuted()),
  setPlaying: () => dispatch(PlaybackActions.setPlaying()),
  setValue: (name, value) => dispatch(PlaybackActions.setValue(name, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Footer)

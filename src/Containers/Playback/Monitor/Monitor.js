import React, { Component, Suspense } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { get, isEmpty, isEqual } from 'lodash';
import PlaybackActions from '../../../Redux/PlaybackRedux'
import ReactPlayer from 'react-player'
import { PulseLoader } from 'react-spinners';
import { diff } from "json-diff";
import '../styles/monitor.css'
import { VideoTime } from '../functions'
import moment from 'moment';
import { compose } from 'ramda';


const DEFAULT_LIST = {
  1: [[{ idx: 1, fullheight: true }]],
  2: [[{ idx: 1, fullheight: true }, { idx: 2, fullheight: true }]],
  3: [[{ idx: 1, fullheight: true, rowspan: 2 }, { idx: 2 }], [{ idx: 3 }]],
  4: [[{ idx: 1 }, { idx: 2 }], [{ idx: 3 }, { idx: 4 }]],
}
const DEFAULT_LIST_VIDEO = [{}, {}, {}, {}]
// const DEFAULT_LIST = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
// const DEFAULT_LIST_VIDEO = [{}, {}, {}, {}, {}, {}, {}, {}, {}]
const TEST = [{
  "label_name": "yellow",
  "channel": 2,
  "url": "http://122.155.10.62:8090/play/0099001A41/1/20210316000000_20210316165555_main.m3u8"
}, {}, {}, {}, {}, {}, {}, {}, {}]

let durationCurrent = 0

class Monitor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripList: [],
      focus: undefined,
      active: undefined,
      loading: {},
      listVideo: [{}, {}, {}, {}]
    }
    this.duration = 0
  }

  componentDidMount() {
    let { loading } = this.state

    if (isEqual(this.props.listVideo, DEFAULT_LIST_VIDEO)) this.setState({ loading: {} })
    else if (this.props.listVideo) {
      let newLoading = {}
      let oldLoading = JSON.parse(JSON.stringify(loading))
      this.props.listVideo.filter(({ channel: id }) => {
        if (id) {
          if (oldLoading[id] === undefined) newLoading[id] = true
          else newLoading[id] = oldLoading[id]
        }
      })
      this.setState({ loading: newLoading, listVideo: this.props.listVideo, focus: undefined, active: 1 })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {

    let { information, isShowModalVideo, listVideo, isMuted, skipTimeChart } = this.props
    // let { listVideo, information, isShowModalVideo } = this.props
    // let { loading, listVideo } = this.state
    let { loading } = this.state
    // console.log(' ------------ shouldComponentUpdate ------------ ', get(this, 'ref_4.props.className'))
    // console.log(this.props, nextProps)
    // if (nextProps.isShowModalVideo !== isShowModalVideo && nextProps.isShowModalVideo === false) {
    //   this.unloadVideo(listVideo)
    // }


    if (nextProps.skipTimeChart !== skipTimeChart) {
      this.duration = 0
      durationCurrent = 0
    }

    if (nextProps.listVideo !== listVideo) {
      // console.log("listVideo : ", nextProps.listVideo)
      if (nextProps.listVideo === null) {
        this.unloadVideo(listVideo)
        return true
      }
      if (listVideo !== null && nextProps.listVideo !== null) {
        // for (let i in nextProps.listVideo) {
        //   if (diff(nextProps.listVideo[i], listVideo[i])) {
        //     if (get(this, '[ref_' + get(listVideo, '[' + i + ']channel') + '].player.player.flv')) {
        //       // console.log('UNLOADDDDDDDDDDDDDDDD!!!!!!!!!!!!!!!')
        //       get(this, '[ref_' + get(listVideo, '[' + i + ']channel') + '].player.player.flv').unload()
        //     }
        //     break
        //   }
        // }
      }
      let state = { listVideo: nextProps.listVideo, focus: undefined, active: 1 }
      if (isEqual(nextProps.listVideo, DEFAULT_LIST_VIDEO)) {
        state.loading = {}
        state.active = undefined
      }
      else if (nextProps.listVideo) {
        let newLoading = {}
        let oldLoading = JSON.parse(JSON.stringify(loading))
        nextProps.listVideo.filter(({ channel: id }) => {
          if (id) {
            if (oldLoading[id] === undefined) newLoading[id] = true
            else newLoading[id] = oldLoading[id]
          }
        })
        state.loading = newLoading
      }
      this.setState(state)
      return false
    }
    return true
  }

  setVideo(data, item) {
    // console.log("item : ", item)
    let { focus, mute, loading, active } = this.state
    let { isMuted, isPlaying, minTimeStart, channelRange, maxTimeEnd, firstChannelRange } = this.props

    let name = get(data, 'label_name', ''), url = get(data, 'url'), id = get(data, 'channel')
    // let idx = item.idx || 0, fullheight = item.fullheight
    let { idx = 0, fullheight } = item
    const setLoading = (nameFunc) => {
      // console.log(nameFunc)
      let _loading = JSON.parse(JSON.stringify(loading))

      let countLoadingDone = 0
      for (const [key, value] of Object.entries(_loading)) {
        if (value === false) countLoadingDone++
      }

      if (Object.keys(_loading).length !== countLoadingDone) {
        _loading[id] = false
        this.setState({ loading: _loading })
      }
    }

    return (
      <div
        className={active !== undefined && active === idx && "monitor-active"}
        id={"panel_video_" + get(data, 'channel')}
        style={{ height: '100%' }}
        onDoubleClick={() => {
          let _focus = idx
          if (focus === idx) _focus = undefined
          this.setState({ focus: _focus })
        }}
        onClick={() => {
          console.log("CLIK PANEL : ", get(data, 'channel'))
          if (active !== idx) this.setState({ active: idx })
        }}
      >
        <div className='monitor-div-name-react-player' title={name} >
          <span style={{ float: 'left', width: 10 }}>{idx}</span>
          <center className="text-name">{name}</center>
        </div>
        <div className={"monitor-div-react-player" + ((fullheight || focus === idx) ? ' fullheight' : '')}>
          {id !== undefined && loading[id] &&
            <div className="loading-video">
              <PulseLoader
                size={10}
                margin={8}
                color={'#fff'}
              />
            </div>
          }

          {id !== undefined ?
            <ReactPlayer
              ref={(ref) => this['ref_' + id] = ref}
              className='react-player'
              url={url}
              muted={isMuted || (active !== idx)}
              playing={isPlaying}
              // controls={true}
              // onReady={() => console.log("onReady")}
              onStart={() => setLoading("onStart")}
              // onEnded={() => console.log("onEnded")}
              onError={() => setLoading("onError")}
              // onError={e => console.log('onError', e)}
              onDuration={(duration) => {
                console.log(get(data, 'channel') + " > duration : ", duration)
                this.duration = duration
                if (duration > this.duration) {
                  this.duration = duration
                }
              }}
              onProgress={(e) => {
                let time = VideoTime(this.duration * e.played, moment(minTimeStart))
                let timeStamp = new Date(time).getTime()
                if (timeStamp > durationCurrent) {
                  durationCurrent = timeStamp
                  this.props.setValue("videoTime", time)
                }
                // console.log("________________onProgress___________________________")
                // console.log("channelRange : ", channelRange)

                if (timeStamp == new Date(maxTimeEnd).getTime()) {
                  let minTimeStart = ""
                  console.log(">> END ")
                  let idxCurrent = ""
                  for (const [key, value] of Object.entries(channelRange)) {
                    if (value.length > 0) {
                      for (let idx in value) {
                        if (parseInt(value[idx].load) !== 1) {
                          if (idxCurrent === "") {
                            minTimeStart = value[idx].starttime
                            idxCurrent = idx
                          }
                        }
                      }
                    }
                  }

                  // console.log("minTimeStart : ", minTimeStart)
                  // console.log(">>>> channelRange : ", channelRange)
                  this.props.setValue("minTimeStart", minTimeStart)
                  this.props.setValue("skipTimeChart", minTimeStart)

                  let newValue = [], ChannelRange = {}
                  for (const [key, value] of Object.entries(channelRange)) {

                    for (let idx in value) {
                      newValue.push({
                        starttime: value[idx].starttime,
                        endtime: value[idx].endtime,
                        load: idx === idxCurrent ? 1 : value[idx].load
                      })
                    }
                    ChannelRange[key] = newValue
                    newValue = []
                  }

                  // console.log("<<<<<<< ChannelRange : ", ChannelRange)

                  this.props.setValue("channelRange", ChannelRange)

                }

                console.log("id : ", id)
                console.log("___________________________________________")

              }}
            /> :
            <div className='react-player'></div>
          }
        </div>
      </div>
    )

  }

  render() {

    let { focus, listVideo, active } = this.state

    // console.log("listVideo render : ", listVideo)

    let leng = listVideo.length > 0 ? listVideo.length : 4
    return (
      <table className="monitor-table">
        {(DEFAULT_LIST[leng]).map((lst, idx) => {
          // console.log('idx', lst.idx)

          return (
            <tr style={{ display: focus && !lst.find((item) => item.idx === focus) && 'none' }}>
              {lst.map((item) => {
                return <td
                  // className={active !== undefined && active === item.idx && "monitor-active"}
                  rowSpan={item.rowspan || "1"} style={{ display: focus && focus !== item.idx && 'none' }}>
                  {/* return <td rowSpan={item.rowspan || "1"} style={{ display: focus && focus !== item.idx && 'none' }}> */}
                  {this.setVideo(get(listVideo, '[' + (item.idx - 1) + ']'), item)}</td>
              })}
            </tr>
          )

        })}
        {/* <tr>
          <td>{this.setVideo('red', 1)}</td> */}
        {/* <td>{this.setVideo('red', 1, "https://www.youtube.com/watch?v=CKZvWhCqx1s")}</td> */}
        {/* <td>{this.setVideo('green', 2)}</td>
          <td>{this.setVideo('yellow')}</td>
        </tr>
        <tr> */}
        {/* <tr style={{ display: 'none' }}> */}
        {/* <td>{this.setVideo('pink')}</td>
          <td>{this.setVideo('blue')}</td>
          <td>{this.setVideo('orange')}</td>
        </tr>
        <tr>
          <td>{this.setVideo('skyblue')}</td>
          <td>{this.setVideo('salmon')}</td>
          <td>{this.setVideo('purple')}</td>
        </tr> */}
      </table>
    )
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.playback.dataLogin,
  listVideo: state.playback.listVideo,
  isMuted: state.playback.isMuted,
  isPlaying: state.playback.isPlaying,
  minTimeStart: state.playback.minTimeStart,
  channelRange: state.playback.channelRange,
  maxTimeEnd: state.playback.maxTimeEnd,
  skipTimeChart: state.playback.skipTimeChart,
});
const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(PlaybackActions.setValue(name, value)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Monitor))

import React, { Component, Suspense, useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import EvidenceActions from '../../../Redux/EvidenceRedux'
import ReactPlayer from 'react-player'
import Duration from './Duration'
import { get } from 'lodash'

let indexVideo = 0, firstLoad = true
const VideoPanel = (props) => {
  let { videoPath, mapDetail } = props

  const [seeking, setSeeking] = useState(false)
  const [played, setPlayed] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [videoDetail, setVideoDetail] = useState([])
  const refPlayer = useRef(null);

  useEffect(() => {
    // firstLoad = false
    let evidence_detail = get(mapDetail, 'evidence_video_detail', [])
    setVideoDetail(evidence_detail)
    setDefaultGauge()
  }, [])

  useEffect(() => {
  }, [videoPath])

  useEffect(() => {
    return () => {
      // componentWillUnmount
      props.setValue("gaugeCurrentValue", {
        speed: 0,
        rpm: 0
      })
    }
  }, [])

  const setDefaultGauge = () => {
    props.setValue("gaugeCurrentValue", {
      speed: 0,
      rpm: 0
    })
  }

  //#region SEEK
  const handleSeekMouseDown = (e) => {
    setSeeking(true)
  }

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value))
  }

  const handleSeekMouseUp = (e) => {
    setSeeking(seeking)
    refPlayer.current.seekTo(parseFloat(e.target.value))
  }
  //#endregion


  //#region On Playing
  const onPlaying = () => {
    if (indexVideo < videoDetail.length) {
      props.setValue("gaugeCurrentValue", {
        speed: videoDetail[indexVideo].speed,
        rpm: get(videoDetail[indexVideo], 'rpm', 0)
      })
      indexVideo++
    }
  }

  //#endregion

  return (<>
    <div className='player-panel'>
      <ReactPlayer
        ref={refPlayer}
        width='100%'
        height='100%'
        className='react-player'
        url={videoPath}
        muted={true}
        playing={playing}
        onStart={() => {
          console.log("onStart")
          firstLoad = false
          // onPlaying()
        }}
        // onError={() => console.log("onError")}
        onDuration={(duration) => setDuration(duration)}
        onProgress={(state) => {
          // console.log("state.played : ", state.played)
          if (state.played !== 1) {
            // console.log("> onProgress <", indexVideo)
            if (!firstLoad) {
              onPlaying()
            }
          }
          setPlayed(state.played)
        }}
        onEnded={() => {
          // console.log("onEnded")
          setPlaying(false)
          // indexVideo = 0
        }}
      />

    </div>
    <div className='bar-playing'>
      <div className='bar-start'>
        <i className={`fa fa-${playing ? 'pause' : 'play'}`}
          onClick={() => {
            if (!playing) {
              indexVideo = 0
            }

            setPlaying(!playing)
          }} />
      </div>
      <div className='bar-center'>
        <input
          className="input-range-bar"
          type='range'
          min={0}
          max={0.999999}
          step='any'
          value={played}
          onMouseDown={handleSeekMouseDown}
          onChange={handleSeekChange}
          onMouseUp={handleSeekMouseUp}
        />
      </div>
      <div className='bar-end'>
        <span><Duration seconds={duration * played} /> / <Duration seconds={duration} /></span>
      </div>
    </div>
  </>
  )
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  videoPath: state.evidence.videoPath,
  mapDetail: state.evidence.mapDetail
});

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(EvidenceActions.setValue(name, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPanel)

let videoDetail2 = [
  {
    "speed": 59,
    "rpm": 5900,
    "gpsdate": "17:07:25"
  },
  {
    "speed": 60,
    "rpm": 5910,
    "gpsdate": "17:07:26"
  },
  {
    "speed": 59,
    "rpm": 5911,
    "gpsdate": "17:07:27"
  },
  {
    "speed": 60,
    "rpm": 5910,
    "gpsdate": "17:07:28"
  },
  {
    "speed": 58,
    "rpm": 5912,
    "gpsdate": "17:07:29"
  },
  {
    "speed": 60,
    "rpm": 5914,
    "gpsdate": "17:07:30"
  }
]
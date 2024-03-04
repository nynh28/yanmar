import React, { Component } from 'react'
import { connect } from 'react-redux'
import RealtimeNewActions from '../../Redux/RealtimeNewRedux'
import Draggable from 'react-draggable';
import PannelBox from '../../Components/PannelBox'
import ReactPlayer from 'react-player'
import './Styles/style-modal-video.css'
import { get, isEmpty, isEqual } from 'lodash';
import { PulseLoader } from 'react-spinners';
import { diff } from "json-diff";


const STYLEBOTTON = { width: '40px', height: '40px', padding: '10px 12px', marginLeft: 10 }
const DEFAULTLISTVIDEO = [{}, {}, {}, {}, {}, {}, {}, {}, {}]

class ModalVideo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkhide: 0,
      defaultChanel: 2,
      hide: false,
      fullscreen: false,
      loading: {}
    }
  }

  componentDidMount() {
    window.addEventListener('fullscreenchange', this.onFullscreen)
    // console.log(' ------------ componentDidMount ------------ ')
  }

  componentWillUnmount() {
    let { listVideo } = this.props
    this.unloadVideo(listVideo)
  }

  unloadVideo(list) {
    for (let i in list) {
      if (!isEmpty(list)) {
        if (get(this, '[ref_' + list[i].id + '].player.player.flv')) {
          // console.log('UNLOADDDDDDDDDDDDDDDD!!!!!!!!!!!!!!!')
          get(this, '[ref_' + list[i].id + '].player.player.flv').unload()
        }
      }
    }
  }

  shouldComponentUpdate(nextProps) {

    let { listVideo, information } = this.props
    let { loading } = this.state

    // console.log(' ------------ shouldComponentUpdate ------------ ')
    // console.log(this.props, nextProps)

    if (nextProps.listVideo !== listVideo) {
      console.log('listVideo', listVideo, nextProps.listVideo)
      if (nextProps.listVideo === null) {
        this.unloadVideo(listVideo)
        return true
      }
      if (listVideo !== null && nextProps.listVideo !== null) {
        let _new = nextProps.listVideo, _old = listVideo
        for (let i in _new) {
          if (diff(_new[i], _old[i])) {
            if (get(this, '[ref_' + _old[i].id + '].player.player.flv')) {
              console.log('UNLOADDDDDDDDDDDDDDDD!!!!!!!!!!!!!!!')
              get(this, '[ref_' + _old[i].id + '].player.player.flv').unload()
            }
            break
          }
        }
      }
      if (isEqual(nextProps.listVideo, DEFAULTLISTVIDEO)) this.setState({ loading: {} })
      else if (nextProps.listVideo) {
        let newLoading = {}
        let oldLoading = JSON.parse(JSON.stringify(loading))
        nextProps.listVideo.filter(({ id }) => {
          if (id) {
            if (oldLoading[id] === undefined) newLoading[id] = true
            else newLoading[id] = oldLoading[id]
          }
        })
        // console.log('newLoading', newLoading)
        this.setState({ loading: newLoading })
      }
      return false
    }
    // if (nextProps.information !== information) {
    //   if (get(information.))

    // }
    return true
  }

  setVideo(data, index) {
    // console.log(' ----------- setVideo ----------- ')
    let name = get(data, 'name', ''), url = get(data, 'url'), id = get(data, 'id')
    let style = { backgroundColor: '#000', verticalAlign: 'middle', float: 'left', margin: '0.5px' }
    let _width = 160, _height = 110, { focus, fullscreen, mute, loading } = this.state

    if (fullscreen) {
      _width = (this.widthFullscreen - 4) / 3
      _height = (this.heightFullscreen - 44) / 3
    }
    if (focus === index) {
      style.position = 'absolute'
      style.zIndex = 2
      _width = fullscreen ? (this.widthFullscreen - 4) : 483
      _height = fullscreen ? (this.heightFullscreen - 47) : 328
    }
    return (
      <div style={style} onDoubleClick={() => {
        let _focus = index
        if (focus === index) _focus = undefined
        this.setState({ focus: _focus })
      }}>
        <div className='text-model-video' title={name} style={{ width: _width, height: 18 }}>
          <span style={{ float: 'left', width: 10 }}>{index}</span>
          <center className="text-name">{name}</center>
        </div>
        <div>
          {id && loading[id] &&
            <div className="loading-video" style={{ width: _width, height: _height - 20 }}>
              <PulseLoader
                size={10}
                margin={8}
                color={'#fff'}
              />
            </div>}

          {id ? <ReactPlayer
            ref={(ref) => this['ref_' + id] = ref}
            className='react-player'
            url={url}
            width={_width}
            height={_height - 20}
            muted={mute || (focus === undefined ? false : !(focus === index))}
            playing
            // onReady={() => console.log("onReady")}
            onStart={() => {
              let _loading = JSON.parse(JSON.stringify(loading))
              _loading[id] = false
              this.setState({ loading: _loading })
            }}
            // onEnded={() => console.log("onEnded")}
            onError={() => console.log("onError")}
          /> : <div style={{ width: _width, height: _height - 20 }}></div>
          }
        </div>
      </div>
    )
  }

  getElementVideo() {
    var videoElem = document.getElementsByTagName('video')
    // console.log("videoElem : ", videoElem)
  }

  stopStreamedVideo() {
    var videoElem = document.getElementsByTagName('video')

    for (let index in videoElem) {
      let _videoElem = videoElem[index]
      // console.log("_videoElem : ", _videoElem)

      const stream = _videoElem.srcObject;
      // console.log("stream : ", stream)

      const tracks = stream.getTracks();
      // console.log("tracks : ", tracks)

      tracks.forEach(function (track) {
        track.stop();
      });

      _videoElem.srcObject = null;
    }

  }

  onClickFullscreen() {
    let { fullscreen } = this.state
    if (fullscreen) {
      document.exitFullscreen();
      this.setState({ fullscreen: false })
    } else {
      this.widthFullscreen = window.screen.width
      this.heightFullscreen = window.screen.height
      document.getElementById('div-content-video').requestFullscreen();
      setTimeout(() => this.setState({ fullscreen: true }), 50)
    }
  }


  onFullscreen = () => {
    let { fullscreen } = this.state
    const isFullScreen = document.fullscreenElement
    if (!isFullScreen && fullscreen) this.setState({ fullscreen: false })
    // else this.setState({ fullscreen: false })
    // console.log('fullscreenElement', document.getElementById('div-content-video').fullscreenElement)
    // const isFullScreen = document.fullscreenElement
    // if (isFullScreen) this.setState({ fullscreen: true })
    // else this.setState({ fullscreen: false })
  }


  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    let { hide, focus, fullscreen, mute } = this.state
    let { listVideo, listSteaming, information } = this.props

    // console.log('listSteaming', listSteaming)
    // console.log('render --->', this.ref_1)

    if (!listVideo || listSteaming.length == 0) return <></>

    // console.log(' ----------- render ----------- ')
    let _width = 484
    let _height = 327
    let _iconfullscreen = 'fas fa-expand-arrows-alt'
    let _iconmute = 'fas fa-volume-up'
    if (fullscreen) {
      _width = '100%'
      _height = 'calc(100% - 47px)'
      _iconfullscreen = 'fas fa-compress-arrows-alt'
    }
    if (mute) _iconmute = "fas fa-volume-mute"

    // console.log(">> RENDER MODAL : ", hide)

    return [
      <a className='btn btn-white btn-bitbucket shadow-model-video'
        data-toggle="dropdown"
        title="video"
        style={{ ...STYLEBOTTON, display: hide ? '' : 'none' }}
        onClick={() => this.setState({ hide: false })}
      > <i className="fas fa-video" ></i> </a>
      , <Draggable bounds={{ top: -100, left: -480 }} handle="strong" {...dragHandlers} >
        <div
          className="ibox float-e-margins shadow-model-video"
          style={{
            left: 100,
            top: -150,
            position: 'absolute',
            display: hide ? 'none' : '',
            // opacity: hide ? 0 : 1,
            // height: hide ? 0 : 'auto',
            // overflow: hide ? 'hidden' : undefined,
            // animation: hide ? 'hide-modal-video 0.3s ease-out' : 'display-modal-video 0.3s'
          }}>
          <strong>
            <div className="ibox-title">
              <div className="icon-hover" style={{ float: 'right' }} onClick={() => this.setState({ hide: true })}>
                <i className="far fa-minus-square"></i>
              </div>
              <b>{'Video'}</b>
            </div>
          </strong>
          <div id="div-content-video" className="ibox-content" style={{ padding: '0px', backgroundColor: '#fff' }}>

            <div style={{ height: _height, width: _width, backgroundColor: '#fff' }}>
              {listVideo.map((value, index) => this.setVideo(value, index + 1))}
              {/* {DEFAULTLIST.map((value) => this.setVideo(get(listVideo, '[' + (value - 1) + ']'), value))} */}
            </div>
            <div style={{ height: 47, paddingTop: 4, backgroundColor: '#fff' }}>
              <div className="style-button-modal-video"
                onClick={() => this.setState((state) => ({ mute: !state.mute }))}>
                <i class={_iconmute}></i>
              </div>
              <div className="style-button-modal-video"
                onClick={() => this.onClickFullscreen()}>
                <i class={_iconfullscreen}></i>
              </div>

              {/* <div className="style-button-modal-video"
                onClick={() => this.getElementVideo()}>
                <i class="fa fa-info"></i>
              </div>

              <div className="style-button-modal-video"
                onClick={() => this.stopStreamedVideo()}>
                <i class="fa fa-stop"></i>
              </div> */}
            </div>
          </div>
        </div>
      </Draggable >
    ]
  }
}

const mapStateToProps = (state) => ({
  // dataLogin: state.signin.dataLogin,
  listVideo: state.realtimeNew.listVideo,
  listSteaming: state.realtimeNew.listSteaming,
  // information: state.realtimeNew.information,
  // language: state.versatile.language,
});

const mapDispatchToProps = (dispatch) => ({
  // setStateReduxRealtime: (objStateRudux) => dispatch(RealtimeNewActions.setStateReduxRealtime(objStateRudux)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalVideo)

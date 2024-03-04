import React, { Component } from "react";
import { connect } from "react-redux";
import RealtimeNewActions from "../../Redux/RealtimeNewRedux";
import Draggable from "react-draggable";
import PannelBox from "../../Components/PannelBox";
import ReactPlayer from "react-player";
import "./Styles/style-modal-video.css";
import { get, isEmpty, isEqual } from "lodash";
import { PulseLoader } from "react-spinners";
import { diff } from "json-diff";
import { contains } from "jquery";

const STYLEBOTTON = {
  width: "40px",
  height: "40px",
  padding: "10px 12px",
  marginLeft: 10,
};
const DEFAULTLISTVIDEO = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
let intervalTest = "";
class ModalVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkhide: 0,
      defaultChanel: 2,
      fullscreen: false,
      loading: {},
    };
    this.intervalReload = this.intervalReload.bind(this);
  }

  componentDidMount() {
    window.addEventListener("fullscreenchange", this.onFullscreen);
    // intervalTest = setInterval(this.intervalReload, 20000);
  }

  intervalReload() {
    let { listVideo } = this.props;
    // console.log(">>________ intervalReload ________<<")
    // console.log("listVideo : ", listVideo)
    for (let idx in listVideo) {
      // console.log("listVideo[" + idx + "] > ", listVideo[idx])

      if (get(listVideo[idx], "channel")) {
        if (
          get(this, "[ref_" + listVideo[idx].channel + "].player.player.flv")
        ) {
          // console.log('RENDER! ref 1 >> ', this['ref_' + listVideo[idx].channel].player.player.flv)
          // console.log("ref_" + listVideo[idx].channel + " > " + this['ref_' + listVideo[idx].channel].player.player.flv._receivedCanPlay)

          if (
            !this["ref_" + listVideo[idx].channel].player.player.flv
              ._receivedCanPlay
          ) {
            // console.log(">>>>> RELOAD")
            // console.log("before : ", this['ref_' + listVideo[idx].channel].player.player.flv)
            this["ref_" + listVideo[idx].channel].player.player.flv.unload();
            // this['ref_' + listVideo[idx].channel].player.player.flv.destroy()

            // console.log("after : ", this['ref_' + listVideo[idx].channel].player.player.flv)

            setTimeout(() => {
              // console.log(">> RELOAD Channel : ", listVideo[idx].channel)
              try {
                // console.log("load : ", this['ref_' + listVideo[idx].channel].player.player.flv)
                this["ref_" + listVideo[idx].channel].player.player.flv.load();
                // console.log("xxx : ", this['ref_' + listVideo[idx].channel].player.player.flv)
                this["ref_" + listVideo[idx].channel].player.player.flv.play();
                // console.log("play : ", this['ref_' + listVideo[idx].channel].player.player.flv)
              } catch (error) {
                ///>>>>
                // console.log("catch : ", error)
              }
            }, 1000);
          } else {
            let _loading = JSON.parse(JSON.stringify(this.state.loading));
            // console.log("_loading: ", _loading)
            // console.log("_loading[] >> ", _loading[listVideo[idx].channel])

            if (_loading[listVideo[idx].channel]) {
              _loading[listVideo[idx].channel] = false;
              this.setState({ loading: _loading });
            }
          }
        }
      }
    }
    // console.log("____________________________________")
  }

  componentWillUnmount() {
    let { listVideo } = this.props;
    this.unloadVideo(listVideo);
  }

  unloadVideo(list) {
    for (let i in list) {
      if (!isEmpty(list[i])) {
        if (get(this, "[ref_" + list[i].channel + "].player.player.flv")) {
          // console.log('unloadVideo!!!!!!!!!!!!!!!')
          get(this, "[ref_" + list[i].channel + "].player.player.flv").unload();
        }
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    let { listVideo, information, isShowModalVideo } = this.props;
    let { loading } = this.state;

    // console.log(' ------------ shouldComponentUpdate ------------ ', get(this, 'ref_4.props.className'))
    // console.log(this.props, nextProps)
    if (
      nextProps.isShowModalVideo !== isShowModalVideo &&
      nextProps.isShowModalVideo === false
    ) {
      this.unloadVideo(listVideo);
    }
    if (nextProps.listVideo !== listVideo) {
      if (nextProps.listVideo === null) {
        this.unloadVideo(listVideo);
        return true;
      }
      if (listVideo !== null && nextProps.listVideo !== null) {
        for (let i in nextProps.listVideo) {
          if (diff(nextProps.listVideo[i], listVideo[i])) {
            if (
              get(this, "[ref_" + listVideo[i].channel + "].player.player.flv")
            ) {
              console.log("UNLOADDDDDDDDDDDDDDDD!!!!!!!!!!!!!!!");
              get(
                this,
                "[ref_" + listVideo[i].channel + "].player.player.flv"
              ).unload();
            }
            break;
          }
        }
      }
      if (isEqual(nextProps.listVideo, DEFAULTLISTVIDEO))
        this.setState({ loading: {} });
      else if (nextProps.listVideo) {
        let newLoading = {};
        let oldLoading = JSON.parse(JSON.stringify(loading));
        // console.log("listVideo", listVideo);
        nextProps.listVideo.filter(({ channel }) => {
          if (channel) {
            if (oldLoading[channel] === undefined) newLoading[channel] = true;
            else newLoading[channel] = oldLoading[channel];
          }
        });
        // console.log('newLoading', newLoading)
        this.setState({ loading: newLoading });
      }
      return false;
    }
    return true;
  }

  setVideo(data, index) {
    // console.log(' ----------- setVideo ----------- ')
    let name = get(data, "label_name", ""),
      url = get(data, "url"),
      id = get(data, "channel");
    let style = {
      backgroundColor: "#000",
      verticalAlign: "middle",
      float: "left",
      margin: "0.5px",
    };
    let _width = 160,
      _height = 110,
      { focus, fullscreen, mute, loading } = this.state;

    if (fullscreen) {
      _width = (this.widthFullscreen - 4) / 3;
      _height = (this.heightFullscreen - 44) / 3;
    }
    if (focus === index) {
      style.position = "absolute";
      style.zIndex = 2;
      _width = fullscreen ? this.widthFullscreen - 4 : 483;
      _height = fullscreen ? this.heightFullscreen - 47 : 328;
    }
    return (
      <div
        style={style}
        onDoubleClick={() => {
          let _focus = index;
          if (focus === index) _focus = undefined;
          this.setState({ focus: _focus });
        }}
      >
        <div
          className="text-model-video"
          title={name}
          style={{ width: _width, height: 18 }}
        >
          <span style={{ float: "left", width: 10 }}>{index}</span>
          <center className="text-name">{name}</center>
        </div>
        <div>
          {id && loading[id] && (
            <div
              className="loading-video"
              style={{ width: _width, height: _height - 20 }}
            >
              <PulseLoader size={10} margin={8} color={"#fff"} />
            </div>
          )}

          {id ? (
            <ReactPlayer
              ref={(ref) => (this["ref_" + id] = ref)}
              className="react-player"
              url={url}
              width={_width}
              height={_height - 20}
              muted={mute || (focus === undefined ? false : !(focus === index))}
              playing
              // onReady={() => console.log("onReady")}
              onStart={() => {
                let _loading = JSON.parse(JSON.stringify(loading));
                _loading[id] = false;
                this.setState({ loading: _loading });
              }}
              // onEnded={() => console.log("onEnded")}
              onError={() => console.log("onError")}
            />
          ) : (
            <div style={{ width: _width, height: _height - 20 }}></div>
          )}
        </div>
      </div>
    );
  }

  getElementVideo() {
    var videoElem = document.getElementsByTagName("video");
    // console.log("videoElem : ", videoElem)
  }

  stopStreamedVideo() {
    var videoElem = document.getElementsByTagName("video");

    for (let index in videoElem) {
      let _videoElem = videoElem[index];
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
    let { fullscreen } = this.state;
    if (fullscreen) {
      document.exitFullscreen();
      this.setState({ fullscreen: false });
    } else {
      this.widthFullscreen = window.screen.width;
      this.heightFullscreen = window.screen.height;
      document.getElementById("div-content-video").requestFullscreen();
      setTimeout(() => this.setState({ fullscreen: true }), 50);
    }
  }

  onFullscreen = () => {
    let { fullscreen } = this.state;
    const isFullScreen = document.fullscreenElement;
    if (!isFullScreen && fullscreen) this.setState({ fullscreen: false });
  };

  mapChannel(data) {
    let _data = [...data],
      channelCount = data.length;

    while (channelCount < 9) {
      _data.push({});
      channelCount++;
    }

    // console.log(">> mapChannel : ", _data)
  }

  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    let { fullscreen, mute } = this.state;
    let { listVideo, listSteaming, isShowModalVideo } = this.props;

    // console.log(">> RENDER MODAL VIDEO <<")
    // console.log("listVideo : ", listVideo)
    // console.log("listSteaming : ", listSteaming)
    // console.log("isShowModalVideo : ", isShowModalVideo)
    // console.log("________________________")

    // if (!listVideo || listSteaming.length == 0) return <></>
    if (!listVideo || !isShowModalVideo) return <></>;

    let _listVideo = this.mapChannel(listVideo);

    // console.log(' ----------- render ----------- ')
    let _width = 484;
    let _height = 327;
    let _iconfullscreen = "fas fa-expand-arrows-alt";
    let _iconmute = "fas fa-volume-up";
    if (fullscreen) {
      _width = "100%";
      _height = "calc(100% - 47px)";
      _iconfullscreen = "fas fa-compress-arrows-alt";
    }
    if (mute) _iconmute = "fas fa-volume-mute";

    return (
      <Draggable
        bounds={{ top: -100, left: -480 }}
        handle="strong"
        {...dragHandlers}
      >
        <div
          className="ibox float-e-margins shadow-model-video"
          style={{
            left: 100,
            top: -150,
            position: "absolute",
            display: "",
          }}
        >
          <strong>
            <div className="ibox-title">
              <div
                className="icon-hover"
                style={{ float: "right" }}
                onClick={() => this.props.setIsShowModalVideo(false)}
              >
                <i className="far fa-minus-square"></i>
              </div>
              <b>{"Video"}</b>
            </div>
          </strong>
          <div
            id="div-content-video"
            className="ibox-content"
            style={{ padding: "0px", backgroundColor: "#fff" }}
          >
            <div
              style={{
                height: _height,
                width: _width,
                backgroundColor: "#fff",
              }}
            >
              {/* {_listVideo.map((value, index) => this.setVideo(value, index + 1))} */}
              {listVideo.map((value, index) => this.setVideo(value, index + 1))}
              {/* {DEFAULTLIST.map((value) => this.setVideo(get(listVideo, '[' + (value - 1) + ']'), value))} */}
            </div>
            <div style={{ height: 47, paddingTop: 4, backgroundColor: "#fff" }}>
              <div
                className="style-button-modal-video"
                onClick={() =>
                  this.setState((state) => ({ mute: !state.mute }))
                }
              >
                <i class={_iconmute}></i>
              </div>
              <div
                className="style-button-modal-video"
                onClick={() => this.onClickFullscreen()}
              >
                <i class={_iconfullscreen}></i>
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    );
  }
}

const mapStateToProps = (state) => ({
  listVideo: state.realtimeNew.listVideo,
  listSteaming: state.realtimeNew.listSteaming,
  isShowModalVideo: state.realtimeNew.isShowModalVideo,
});

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(RealtimeNewActions.setValue(name, value)),
  setIsShowModalVideo: (bln) =>
    dispatch(RealtimeNewActions.setIsShowModalVideo(bln)),
  // setStateReduxRealtime: (objStateRudux) => dispatch(RealtimeNewActions.setStateReduxRealtime(objStateRudux)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalVideo);

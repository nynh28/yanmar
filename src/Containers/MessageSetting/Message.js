import React, { Component } from 'react'
// import { Switch, withRouter } from 'react-router'

import { connect } from 'react-redux'
import AuthActions from '../../Redux/AuthRedux'
import {
  Row, Col,
  Card, CardHeader, CardBlock,
  Button,

} from "reactstrap";

// import * as Ladda from 'ladda';

// import './Styles/StylesDashboard.css'


import BasicWizzard from '../../Components/BasicWizzard'
// import { ReactMic } from 'react-mic';
import AudioAnalyser from "react-audio-analyser"
import socketIOClient from 'socket.io-client'

// import { w3cwebsocket as W3CWebSocket } from "websocket";
// const client = new W3CWebSocket('ws://hinogps.onelinkspace.com:10001');

var net = require('net');
const jsftp = require("jsftp");


class Message extends Component {

  constructor(props) {
    super(props);
    this.state = {
      record: false,
      status: null,
    }
    // this.socket = socketIOClient('http://167.99.72.166:10001')
    this.socket = socketIOClient('https://hinogps.infiltech.org')
    // console.log(socket)
    this.socket.on('connect', function () {
      console.log('socket connected')
    });

    this.socket.on('disconnect', function () {
      console.log('disconnected')
    });
  }

  componentDidMount() {
    console.log('------------------signin---------------------------')

    // socket.connect()


    // this.props.signin("user001@gmail.com", "123456789")
  }

  // constructor(props) {
  //     super(props)
  //     this.state = {
  //         // l : Ladda.bind('.ladda-button-demo'),
  //         test : 'terer',
  //     }

  //     // this.orderHeaderFilter = this.orderHeaderFilter.bind(this);
  //     this.l = Ladda.bind('.ladda-button-demo')


  // }


  // onClk(e){
  //     console.log(this.state.test)

  //     this.l.ladda( 'start' );

  //     // Do something in backend and then stop ladda
  //     // setTimeout() is only for demo purpose
  //     setTimeout(function(){
  //         this.l.ladda('stop')
  //     },2000)


  // }
  startRecording = () => {
    console.log('start')
    this.setState({
      record: true
    });
  }

  stopRecording = () => {
    this.setState({
      record: false
    });
  }

  onData(recordedBlob) {
    console.log('chunk of real-time data is: ', recordedBlob);
  }

  onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);
  }
  controlAudio(status) {
    this.setState({
      status
    })
  }

  playOnGps() {
    this.socket.emit('play', 'play')
  }

  render() {
    const { component: Component, ...rest } = this.props

    const { status, audioSrc } = this.state;
    const audioProps = {
      audioType: "audio/wav", // Temporarily only supported audio/wav, default audio/webm
      status, // Triggering component updates by changing status
      audioSrc,
      startCallback: (e) => {
        console.log("succ start", e)
      },
      pauseCallback: (e) => {
        console.log("succ pause", e)
      },
      stopCallback: (e) => {
        this.setState({
          audioSrc: window.URL.createObjectURL(e)
        })
        console.log("succ stop", window.URL.createObjectURL(e))

        // var c = new Client();
        // c.on('ready', function () {
        //   c.put(window.URL.createObjectURL(e), '/VOICE_BC/sound1.wav', function (err) {
        //     if (err) throw err;
        //     c.end();
        //   });
        // });
        // connect to localhost:21 as anonymous
        // c.connect({
        //   host: '61.19.242.71',
        //   port: 21,
        //   user: 'r10v2',
        //   password: 'onelink@2012',

        // });
        // const Ftp = new jsftp({
        //   host: "61.19.242.71",
        //   port: 21, // defaults to 21
        //   user: "r10v2", // defaults to "anonymous"
        //   pass: "onelink@2012" // defaults to "@anonymous"
        // });
      }
    }
    return (
      <>
        <AudioAnalyser {...audioProps}>
          <div className="btn-box">
            {
              status !== "recording" &&
              <button onClick={() => this.controlAudio("recording")}>record</button>
            }
            {
              status === "recording" &&
              <button onClick={() => this.controlAudio("paused")}>pause</button>
            }
              <button onClick={() => this.controlAudio("inactive")}>stop</button>
          </div>
        </AudioAnalyser>
        <button
          onClick={() => this.playOnGps()}>Play on GPS Device</button>
      </>
    );
    // console.log(process.env.REACT_APP_NODE_ENV)
    // console.log('---------------------- Dashboard Screen ------------------------------')
    // return (

    // <div>

    //   <Row>
    //     <Col lg="12">
    //       {
    //         process.env.REACT_APP_NODE_ENV
    //       }
    //     </Col>
    //   </Row>
    //   <Row>
    //     <Col lg="4">
    //       <li className="list-group-item">
    //         <p><a className="text-info">@Stock Man</a> Check this stock chart. This price is crazy! </p>
    //         <div className="text-center m">
    //           <span id="sparkline8"><canvas width="170px" height="150px" style={{ display: "inline-block", width: "170", height: "150", verticalAlign: "top" }}></canvas></span>
    //         </div>
    //         <small className="block text-muted"><i className="fa fa-clock-o"></i> 2 hours ago</small>
    //       </li>
    //     </Col>
    //     <Col lg="4">
    //       <li className="list-group-item">
    //         <p><a className="text-info">@Alan Marry</a> I belive that. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
    //         <small className="block text-muted"><i className="fa fa-clock-o"></i> 1 minuts ago</small>
    //       </li>
    //     </Col>
    //   </Row >
    // </div>

    // <BasicWizzard title={"Test Wizzard Box 1"} {...rest}>
    //   <span>Test Basic Wizzard 1 line</span><br/>
    //   <span>Test Basic Wizzard 2 line</span><br/>
    //   <span>Test Basic Wizzard 3 line</span><br/>
    // </BasicWizzard>

    // <Row>
    //   <Col lg={6}>
    //     <div>
    //       <ReactMic
    //         record={this.state.record}
    //         className="sound-wave"
    //         onStop={this.onStop}
    //         strokeColor="#000000"
    //         backgroundColor="#FF4081" />
    //       <button onClick={() => this.startRecording()} type="button">Start</button>
    //       <button onClick={() => this.stopRecording()} type="button">Stop</button>
    //     </div>
    //     <BasicWizzard boxid={'my-box1'} title={"Test Wizzard Box 1"} {...rest}>
    //       <span>Test Basic Wizzard 1 line</span><br />
    //       <span>Test Basic Wizzard 2 line</span><br />
    //       <span>Test Basic Wizzard 3 line</span><br />
    //     </BasicWizzard>
    //   </Col>
    //   <Col lg={6}>
    //     <BasicWizzard boxid={'my-box2'} title={"Test Wizzard Box 2"} {...rest}>
    //       <span>Test Basic Wizzard 1 line</span><br />
    //       <span>Test Basic Wizzard 2 line</span><br />
    //       <span>Test Basic Wizzard 3 line</span><br />
    //     </BasicWizzard>
    //   </Col>
    // </Row>

    // )
  }
}

const mapStateToProps = (state) => {
  return {
    // request_signin: state.auth.request_signin,
    // data_signin: state.auth.data_signin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // signin: (email, password) => dispatch(AuthActions.signin(email, password)),
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(Message))

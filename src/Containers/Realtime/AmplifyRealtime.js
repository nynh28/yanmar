import React, { Component } from 'react';
import { connect } from 'react-redux'
import RealtimeActions from '../../Redux/RealtimeRedux'
import Amplify, { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';

import { Row } from 'reactstrap'
import Images from './icons/Images'


import { isEmpty } from 'react-redux-firebase'
import moment from 'moment';
// require('@react-google-maps/api/src/utils/isbrowser')

const { get, isEqual } = require('lodash')


class AmplifyRealtime extends Component {

  constructor(props) {
    super(props)
    this.state = {
      iconmarker: false,
      iconByClassTypeActive: [],
      iconByClassTypeInactived: []
    }
    this.map = null
  }

  handleToggleOpen() {

    this.setState({
      infoOpen: true
    });
  }

  handleToggleClose() {
    this.setState({
      infoOpen: false
    });
  }


  eventMarker(event) {

  }


  componentWillMount() {
    // if (this.props.iconActive.length === 0 || this.props.iconInactived.length === 0) this.setIconObjectType()
  }


  setIconObjectType() {
    //#region  ICON ACTIVE
    this.setIconSvg(Images.Green_Actived_1, 1, "Driving", true)
    this.setIconSvg(Images.Grey_Actived_1, 1, "Offline", true)
    this.setIconSvg(Images.Red_Actived_1, 1, "Parking", true)
    this.setIconSvg(Images.Yellow_Actived_1, 1, "Idling", true)
    this.setIconSvg(Images.Purple_Actived_1, 1, "Overspeed", true)
    this.setIconSvg(Images.Grey_Actived_1, 1, "Offine", true)

    this.setIconSvg(Images.Green_Actived_2, 2, "Driving", true)
    this.setIconSvg(Images.Grey_Actived_2, 2, "Offline", true)
    this.setIconSvg(Images.Red_Actived_2, 2, "Parking", true)
    this.setIconSvg(Images.Yellow_Actived_2, 2, "Idling", true)
    this.setIconSvg(Images.Purple_Actived_2, 2, "Overspeed", true)
    this.setIconSvg(Images.Grey_Actived_2, 2, "Offine", true)

    this.setIconSvg(Images.Green_Actived_3, 3, "Driving", true)
    this.setIconSvg(Images.Grey_Actived_3, 3, "Offline", true)
    this.setIconSvg(Images.Red_Actived_3, 3, "Parking", true)
    this.setIconSvg(Images.Yellow_Actived_3, 3, "Idling", true)
    this.setIconSvg(Images.Purple_Actived_3, 3, "Overspeed", true)
    this.setIconSvg(Images.Grey_Actived_3, 3, "Offine", true)

    this.setIconSvg(Images.Green_Actived_4, 4, "Driving", true)
    this.setIconSvg(Images.Grey_Actived_4, 4, "Offline", true)
    this.setIconSvg(Images.Red_Actived_4, 4, "Parking", true)
    this.setIconSvg(Images.Yellow_Actived_4, 4, "Idling", true)
    this.setIconSvg(Images.Purple_Actived_4, 4, "Overspeed", true)
    this.setIconSvg(Images.Grey_Actived_4, 4, "Offine", true)

    this.setIconSvg(Images.Green_Actived_5, 5, "Driving", true)
    this.setIconSvg(Images.Grey_Actived_5, 5, "Offline", true)
    this.setIconSvg(Images.Red_Actived_5, 5, "Parking", true)
    this.setIconSvg(Images.Yellow_Actived_5, 5, "Idling", true)
    this.setIconSvg(Images.Purple_Actived_5, 5, "Overspeed", true)
    this.setIconSvg(Images.Grey_Actived_5, 5, "Offine", true)

    this.setIconSvg(Images.Green_Actived_6, 6, "Driving", true)
    this.setIconSvg(Images.Grey_Actived_6, 6, "Offline", true)
    this.setIconSvg(Images.Red_Actived_6, 6, "Parking", true)
    this.setIconSvg(Images.Yellow_Actived_6, 6, "Idling", true)
    this.setIconSvg(Images.Purple_Actived_6, 6, "Overspeed", true)
    this.setIconSvg(Images.Grey_Actived_6, 6, "Offine", true)

    this.setIconSvg(Images.Green_Actived_0, 0, "Driving", true)
    this.setIconSvg(Images.Grey_Actived_0, 0, "Offline", true)
    this.setIconSvg(Images.Red_Actived_0, 0, "Parking", true)
    this.setIconSvg(Images.Yellow_Actived_0, 0, "Idling", true)
    this.setIconSvg(Images.Purple_Actived_0, 0, "Overspeed", true)
    this.setIconSvg(Images.Grey_Actived_0, 0, "Offine", true)

    //#endregion

    //#region  ICON ACTIVE
    this.setIconSvg(Images.Green_1, 1, "Driving", false)
    this.setIconSvg(Images.Grey_1, 1, "Offline", false)
    this.setIconSvg(Images.Red_1, 1, "Parking", false)
    this.setIconSvg(Images.Yellow_1, 1, "Idling", false)
    this.setIconSvg(Images.Purple_1, 1, "Overspeed", false)
    this.setIconSvg(Images.Grey_1, 1, "Offine", false)

    this.setIconSvg(Images.Green_2, 2, "Driving", false)
    this.setIconSvg(Images.Grey_2, 2, "Offline", false)
    this.setIconSvg(Images.Red_2, 2, "Parking", false)
    this.setIconSvg(Images.Yellow_2, 2, "Idling", false)
    this.setIconSvg(Images.Purple_2, 2, "Overspeed", false)
    this.setIconSvg(Images.Grey_2, 2, "Offine", false)

    this.setIconSvg(Images.Green_3, 3, "Driving", false)
    this.setIconSvg(Images.Grey_3, 3, "Offline", false)
    this.setIconSvg(Images.Red_3, 3, "Parking", false)
    this.setIconSvg(Images.Yellow_3, 3, "Idling", false)
    this.setIconSvg(Images.Purple_3, 3, "Overspeed", false)
    this.setIconSvg(Images.Grey_3, 3, "Offine", false)

    this.setIconSvg(Images.Green_4, 4, "Driving", false)
    this.setIconSvg(Images.Grey_4, 4, "Offline", false)
    this.setIconSvg(Images.Red_4, 4, "Parking", false)
    this.setIconSvg(Images.Yellow_4, 4, "Idling", false)
    this.setIconSvg(Images.Purple_4, 4, "Overspeed", false)
    this.setIconSvg(Images.Grey_4, 4, "Offine", false)

    this.setIconSvg(Images.Green_5, 5, "Driving", false)
    this.setIconSvg(Images.Grey_5, 5, "Offline", false)
    this.setIconSvg(Images.Red_5, 5, "Parking", false)
    this.setIconSvg(Images.Yellow_5, 5, "Idling", false)
    this.setIconSvg(Images.Purple_5, 5, "Overspeed", false)
    this.setIconSvg(Images.Grey_5, 5, "Offine", false)

    this.setIconSvg(Images.Green_6, 6, "Driving", false)
    this.setIconSvg(Images.Grey_6, 6, "Offline", false)
    this.setIconSvg(Images.Red_6, 6, "Parking", false)
    this.setIconSvg(Images.Yellow_6, 6, "Idling", false)
    this.setIconSvg(Images.Purple_6, 6, "Overspeed", false)
    this.setIconSvg(Images.Grey_6, 6, "Offine", false)

    this.setIconSvg(Images.Green_0, 0, "Driving", false)
    this.setIconSvg(Images.Grey_0, 0, "Offline", false)
    this.setIconSvg(Images.Red_0, 0, "Parking", false)
    this.setIconSvg(Images.Yellow_0, 0, "Idling", false)
    this.setIconSvg(Images.Purple_0, 0, "Overspeed", false)
    this.setIconSvg(Images.Grey_0, 0, "Offine", false, true)
    //#endregion

  }

  setIconSvg(iconByClassType, classType, status, isActive, icon) {
    let { iconByClassTypeActive, iconByClassTypeInactived } = this.state
    fetch(iconByClassType)
      .then(response => response.text())
      .then(text => {
        let svg_ = text;
        svg_ = svg_
          .replace(/^<\?(.+)\?>$/gm, '') // unsupported unnecessary line
          // You can replace anything you want, but first of all check your svg code
          .replace(/width.+\Wheight\S+/,
            'width="{{width}}" height="{{height}}" transform="{{transform}}"')

        // Load Map

        if (isActive) {
          iconByClassTypeActive.push({ "classType": classType, "status": status, "icon": svg_ })
        } else {
          iconByClassTypeInactived.push({ "classType": classType, "status": status, "icon": svg_ })
        }
        if (icon) {
          this.setState({ iconmarker: true, iconByClassTypeInactived, iconByClassTypeActive })
        }
      })
  }

  componentDidMount() {

    // #Subscribe to the MQTT topic
    let { topicRealtime, dataLogin } = this.props
    let topicConnect = PubSub._pluggables[0]._topicObservers.get(topicRealtime)

    // console.log('PubSub : ', PubSub)

    if (topicConnect === undefined || topicConnect.size === 0) {

      // #Subscribe UpdateGPS
      // console.log('PubSub Realtime', topicRealtime)
      // console.log('/HINO/UserRegister/All/', {
      //   "Event": "SubRealtime",
      //   "Env": process.env.REACT_APP_NODE_ENV,
      //   "UserID": dataLogin.userId
      // })

      PubSub.subscribe(topicRealtime).subscribe({
        // next : we successfully received a message and inside data is that messagea,
        next: data => {
          // console.log("Realtime : ", data.value)
          this.props.gpsUpdate(data.value)
        },
        // error : something went wrong when trying to subscribe to the topic
        error: error => console.error(error),
        // close : stop subscribing to this topic
        close: () => console.log('Done'),
      });

      PubSub.publish('/HINO/UserRegister/All/', {
        "Event": "SubRealtime",
        // "clientId": PubSub.awsAppSyncProvider.clientId,
        "clientId": PubSub._pluggables[0].clientId,
        "Env": process.env.REACT_APP_NODE_ENV,
        "UserID": dataLogin.userId
      })
    }
  }

  componentWillUnmount() {
    let subGPSTopic = Amplify.PubSub._pluggables[0]._topicObservers.get(this.props.topicRealtime)
    if (subGPSTopic !== undefined) {
      if (subGPSTopic.size > 0) {
        subGPSTopic.values().next().value._subscription.unsubscribe();
      }
    }
  }

  componentDidUpdate(prevProps, nextState) {
    if (nextState.iconmarker !== this.state.iconmarker && this.state.iconmarker) {
      this.props.setDefaultIconMarker(this.state.iconByClassTypeActive, this.state.iconByClassTypeInactived)
    }
  }

  render() {

    return (
      <div></div>
    )
  }
}

const mapStateToProps = (state) => ({
  topicRealtime: state.signin.topicRealtime,
  dataLogin: state.signin.dataLogin,
  iconActive: state.realtime.iconActive,
  iconInactived: state.realtime.iconInactived,
});

const mapDispatchToProps = (dispatch) => ({
  gpsUpdate: (update) => dispatch(RealtimeActions.gpsUpdate(update)),
  setDefaultIconMarker: (iconActive, iconInactived) => dispatch(RealtimeActions.setDefaultIconMarker(iconActive, iconInactived))

});

export default connect(mapStateToProps, mapDispatchToProps)(AmplifyRealtime)

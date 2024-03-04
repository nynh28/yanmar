import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ReactNotification, { store } from "react-notifications-component";
import NotificationRedux from "../../Redux/NotificationRedux";
import { get, isEqual } from "lodash";
import { momentDate } from "../../Functions/DateMoment";
import RealtimeNewActions from "../../Redux/RealtimeNewRedux";
import RealtimeActions from "../../Redux/RealtimeRedux";
import { t } from "../../Components/Translation";

const listFormatAlert = [
  {
    type: "success",
    icon: "fa fa-check-circle",
  },
  {
    type: "warning",
    icon: "fa fa-exclamation-triangle",
  },
  {
    type: "danger",
    icon: "fa fa-exclamation-circle",
  },
];

const notification = {
  title: "Awesomeness",
  message: "Awesome Notifications!",
  type: "success",
  container: "top-right",
  insert: "top",

  animationIn: ["animated", "fadeIn"],
  animationOut: ["animated", "faster", "fadeOut"],

  dismiss: {
    duration: 3000,
    onScreen: false,
    pauseOnHover: true,
    waitForAnimation: false,
    showIcon: true,
    click: true,
    touch: true,
  },
};

const dismissForDanger = {
  duration: 10000,
  onScreen: true,
  pauseOnHover: true,
  waitForAnimation: false,
  click: true,
  touch: true,
};

const dismissForWarning = {
  duration: 5000,
  onScreen: true,
  pauseOnHover: true,
  waitForAnimation: false,
  click: true,
  touch: true,
};

class ToastNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps, nextState) {
    if (prevProps.toastEvent !== this.props.toastEvent) {
      let { toastEvent } = this.props;
      this.props.notificationVisibled && this.displayNotification(toastEvent);
      this.props.getMessageCount();
    }
  }

  getConfigNotifactionType(event) {
    let config = {
      className: "",
      icon: "fa fa-exclamation-circle",
      dismiss: {
        duration: 10000,
        onScreen: false,
        pauseOnHover: true,
        waitForAnimation: false,
        click: true,
        touch: true,
      },
    };
    switch (event.event_id) {
      case 1001:
        config.className = "notification-custom-purple";
        break;
      case 10000:
        config.className = "notification-custom-blue";
        break;
      case 10001:
        config.className = "notification-custom-yellow";
        config.dismiss.onScreen = true;
        break;
      default:
        config.className = "notification-custom-danger";
        break;
    }
    return config;
  }

  displayNotification(event) {
    // let { type, icon } = listFormatAlert[2]
    let config = this.getConfigNotifactionType(event);
    console.log(event);

    let setNotification = {
      width: 290,
      container: "top-right",
      content: (
        // <div className={`notification-custom-${type}`}>
        <div className={config.className}>
          <div
            className="notification-custom-icon"
            onClick={() => this.onClickNotification(event)}
          >
            <i className={config.icon} />
          </div>
          <div
            className="notification-custom-content"
            onClick={() => this.onClickNotification(event)}
          >
            <div className="notification-message">
              <div>{event.licenseplate}</div>
              <div>
                {/* {
                  console.log(">> ALERT : ", event.gps.gpsdate)
                } */}
                {momentDate(event.gps.gpsdate, "DD/MM/YYYY HH:mm:ss")}
              </div>
              <div>{t("Notification_" + event.event_id)}</div>
            </div>
          </div>
          <div className="notification-custom-close">
            <i className="fas fa-times"></i>
          </div>
        </div>
      ),
    };
    setNotification.dismiss = config.dismiss;

    // if (type === 'danger') setNotification.dismiss = dismissForDanger
    // else if (type === 'warning') setNotification.dismiss = dismissForWarning

    return store.addNotification(
      Object.assign({}, notification, setNotification)
    );
  }

  onClickNotification(event) {
    console.log("event.vid", event.vid);
    this.props.getInformationMarker(event.vid, "List");
    // this.props.getInformation(event.vid, 17, true)
    // this.props.setActiveMap(false)
    // this.props.setDisplayTruck([event.vid], true)
    if (this.props.history.location.pathname.toLowerCase() !== "/realtime")
      this.props.history.push("/realtime");
  }

  render() {
    return <ReactNotification />;
  }
}

const mapStateToProps = (state) => ({
  toastEvent: state.notification.toastEvent,
  dataLogin: state.signin.dataLogin,
  notificationVisibled: state.notification.notificationVisibled,
});

const mapDispatchToProps = (dispatch) => ({
  getMessageCount: () => dispatch(NotificationRedux.getMessageCount()),
  getInformation: (vid, zoom, activeMap) =>
    dispatch(RealtimeActions.getInformation(vid, zoom, activeMap)),
  setDisplayTruck: (displayTruck, dashboard) =>
    dispatch(RealtimeActions.setDisplayTruck(displayTruck, dashboard)),
  setActiveMap: (activeMap) =>
    dispatch(RealtimeActions.setActiveMap(activeMap)),
  getInformationMarker: (vid, callFrom) =>
    dispatch(RealtimeNewActions.getInformationMarker(vid, callFrom)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ToastNotification)
);

import React, { Component } from 'react';
import { BreakStyle } from 'devextreme-react/chart';
import devicelist from './mock';
import { grey, green } from '@material-ui/core/colors';
import { Input } from 'reactstrap';

class OverlayPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabsDevice: true,
      tabsEvent: false,
      tabsHistory: false,
      deviceHistory: []
    }
    console.log(devicelist);
  }

  selectDevice(e) {
    this.props.rerenderDeviceInformation(e);
  }

  selectEventDevice(e) {
    //console.log(e.target.value);
    var selecteddevice;
    var device = devicelist.map((device, i) => {
      if (device.device_name == e.target.value) {
        selecteddevice = device
      }
    })
    this.setState({
      deviceHistory: selecteddevice.event
    }, () => {

    })
    this.props.rerenderGoogle(selecteddevice);
  }

  seteventMarker(event) {
    this.props.seteventMarker(event);
  }

  selectTab(e) {
    for (var i = 0; i < document.getElementsByClassName('tabclick2').length; i++) {
      document.getElementsByClassName('tabclick2')[i].classList.remove("active")
    }
    e.target.parentElement.classList.add("active");
    switch (e.target.getAttribute("button_value")) {
      case "tabsDevice":
        this.setState({
          tabsDevice: true,
          tabsEvent: false,
          tabsHistory: false
        }, () => {
        })
        break;
      case "tabsEvent":
        this.setState({
          tabsDevice: false,
          tabsEvent: true,
          tabsHistory: false
        }, () => {
        })
        break;
      case "tabsHistory":
        this.setState({
          tabsDevice: false,
          tabsEvent: false,
          tabsHistory: true
        }, () => {
        })
        break;
    }
  }

  setDevicelist(device, i) {
    console.log('-------------' + device, i + '-------------')
    return (
      <tr onClick={this.selectDevice.bind(this, device)} style={{ cursor: 'pointer' }} key={"tr" + i}>
        <td width="70%" style={{ padding: 4 }}>
          <div style={{ flexDirection: 'row', display: 'flex', paddingLeft: 10 }}>
            <i className="fa fa-square-o" style={{ marginRight: 5, marginTop: 2 }} />
            <div>
              {device.device_name}
              <div style={{ fontSize: 8, marginTop: -3, color: 'grey' }}>
                02-12-2019
            </div>
            </div>
          </div>

        </td>
        <td width="30%" style={{ padding: 4 }}>
          <div style={{ float: 'right' }}>
            0kph
            <i className="fa fa-circle" style={{ color: 'red', marginLeft: 5 }} />
          </div>
        </td>
      </tr>
    )
  }








  render() {
    return (
      <div className="" style={{
        position: 'absolute',
        zIndex: '1',
        width: '280px',
        height: '480px',

        top: '80px',
        right: '25px',
        backgroundColor: 'white'

      }}>

        <div className="tabs-container">
          <ul className="nav nav-tabs">
            <li onClick={this.selectTab.bind(this)} className="tabclick2 active"><a button_value="tabsDevice"> Device</a></li>
            <li onClick={this.selectTab.bind(this)} className="tabclick2"><a button_value="tabsEvent">Event</a></li>
            <li onClick={this.selectTab.bind(this)} className="tabclick2"><a button_value="tabsHistory">History</a></li>
          </ul>
          <div className="tab-content">
            {/* __________________________________ Device __________________________________ */}
            {this.state.tabsDevice && (
              <div style={{ display: 'block' }} id="tab-1" className="tab-pane">
                <div style={{ padding: 5 }}>
                  <Input placeholder="search" className="search-message-box" />
                </div>
                <div className="box-device scroll">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th colspan="2" style={{ fontSize: 14 }}><i className="fa fa-square-o" />{' '}Device List</th>
                      </tr>
                    </thead>
                    <tbody style={{ fontSize: 12 }}>
                      {devicelist.map((device, i) =>
                        // Return the element. Also pass key
                        this.setDevicelist(device, i)
                      )}
                    </tbody>
                  </table>

                </div>
              </div>
            )}
            {/* ____________________________________________________________________________ */}
            {this.state.tabsEvent && (
              <div style={{ display: 'block' }} id="tab-1" className="tab-pane">
                Underconstruction
                            </div>
            )}
            {this.state.tabsHistory && (
              <div style={{ display: 'block' }} id="tab-1" className="tab-pane">
                <br></br>
                <select onChange={this.selectEventDevice.bind(this)} style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto' }} className="form-control">
                  <option value="0">Device select</option>
                  {devicelist.map((device, i) => {
                    // Return the element. Also pass key
                    return (<option key={i} value={device.device_name}>{device.device_name}</option>)
                  })}
                </select>
                <br></br>
                <input style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto' }} placeholder="date start from.." className="form-control"></input>
                <br></br>
                <input style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto' }} placeholder="date start to.." className="form-control"></input>
                <br></br>
                <button style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto' }} className="btn btn-primary btn-block">Show History</button>
                <br></br>
                <div className="table-wrapper-scroll-y my-custom-scrollbar scroll">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Event</th>
                        <th>Time</th>
                        <th>Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.deviceHistory.map((event, i) => {
                        // Return the element. Also pass key
                        return (
                          <tr onClick={this.seteventMarker.bind(this, event)} style={{ cursor: 'pointer' }} key={"tr" + i}>
                            <td>{event.event_id}</td>
                            <td>{event.time}</td>
                            <td>{event.duration}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    );
  }
}

export default OverlayPanel;

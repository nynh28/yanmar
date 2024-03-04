import React, { Component } from 'react';
import { Input, Row, Col, ListGroup, ListGroupItem, Table } from 'reactstrap'
import './custom.css'
import { connect } from 'react-redux'
import picProfile0 from './profile0.jpg'
import moment from 'moment'
import { IconButton } from '@material-ui/core';
import NotificationRedux from '../../Redux/NotificationRedux'
import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api'

class NotificationDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount() {
    if (!this.props.detailEvent) {
      this.props.history.push('/notification')
    }
  }

  componentDidUpdate(prevProps, nextState) {
    if (prevProps.detailEvent !== this.props.detailEvent && this.props.detailEvent === null) {
      this.props.history.push('/notification')
    }
  }

  render() {
    let { detailEvent } = this.props
    return (
      <div className="form-horizontal" >
        <Row>
          {/* ครึ่งซ้าย */}
          <Col lg="3">
            <div className="ibox float-e-margins" >
              <div className="ibox-content mailbox-content">
                <div className="file-manager">
                  <h5>PRIORITY</h5>
                  <div className="space-15"></div>
                  <ListGroup>
                    <ListGroupItem tag="button" action>Normal <span className="label pull-right label-normal">999</span> </ListGroupItem>
                    <ListGroupItem tag="button" action>Warning<span className="label pull-right label-c-warning">999</span></ListGroupItem>
                    <ListGroupItem tag="button" action>Urgent<span className="label pull-right label-urgent">999</span></ListGroupItem>
                    <ListGroupItem tag="button" action>New Vehicle <span className="label pull-right label-new-vehicle">999</span></ListGroupItem>
                    <ListGroupItem tag="button" action>New Dealer<span className="label pull-right label-new-dealer">999</span> </ListGroupItem>
                  </ListGroup>
                  <div className="file-manager">
                    <h5>CATEGORIES</h5>
                    <div className="space-15"></div>
                    <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
                      <li><i class="fas fa-circle"></i> Not Swipe Card</li>
                      <li><i class="fas fa-circle"></i> Overspeed</li>
                      <li><i class="fas fa-circle"></i> Driver Over 4 Hr</li>
                      <li><i class="fas fa-circle"></i> Driver Over 8 Hr</li>
                      <li><i class="fas fa-circle"></i> Unplugs</li>
                    </ul>

                  </div>
                </div>
              </div>
            </div>
          </Col>
          {/* ครึ่งขวา */}
          <Col lg="9">
            {/* <Col lg="12"> */}
            <div className="mail-box-header" style={{ padding: '5px 15px', borderWidth: ' 4px 0px 0px ', borderColor: '#e7eaec' }}>
              <IconButton
                id='button-signin'
                aria-label="delete"
                style={{
                  height: 30,
                  width: 30,
                  padding: 0,
                }}
                onClick={() => this.props.setDetailEvent()}
              >
                <i class="fas fa-arrow-left"></i>
              </IconButton>
              {/* <h2>Notification Detail</h2> */}
            </div>
            <div className="mail-box" style={{ height: 500, paddingTop: '20px' }}>
              {!!detailEvent &&
                [<center><h1>{detailEvent.id} : {detailEvent.event_name}</h1></center>,
                <LoadScriptNext id="script-loader" googleMapsApiKey={"AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A"}>
                  <GoogleMap
                    onLoad={map => {
                      this.map = map
                      this.setState({ mapLoad: map })
                    }}
                    zoom={this.state.zoomDefault || 5}
                    center={this.state.centerDefualt || {
                      lat: 13.786377,
                      lng: 100.608755
                    }}
                    disableDefaultUI={true}
                    // onZoomChanged={() => {
                    //   if (get(this.map, 'zoom')) {
                    //     console.log('onZoomChanged', get(this.map, 'zoom'))
                    //     // this.map.setZoom(get(this.map, 'zoom'))
                    //   }
                    // }}
                    mapContainerClassName={"map"}
                    id='realtime-map'
                    options={{
                      zoomControl: false,
                      mapTypeControl: false,
                      streetViewControl: false,
                      rotateControl: false,
                      fullscreenControl: false
                    }}

                    mapContainerStyle={{
                      width: '100%',
                      height: "100%",
                      minHeight: 385
                    }}
                  >
                    <Marker
                      // onLoad={}
                      position={this.state.position}
                    />




                  </GoogleMap>
                </LoadScriptNext>]
              }
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  detailEvent: state.notification.detailEvent,

});
const mapDispatchToProps = (dispatch) => ({
  setDetailEvent: () => dispatch(NotificationRedux.setDetailEvent()),

});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationDetail)


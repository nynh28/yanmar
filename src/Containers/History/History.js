import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { LoadScriptNext } from '@react-google-maps/api'
import Map from './Map'
//
class History extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    window.scrollTo(0, 0)
    console.log('history', this.props.history)
  }

  render() {
    let keyApi = this.props.language === 'en' ? "AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&libraries=geometry&language=en&region=EN"
      : this.props.language === 'ja' ? "AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&libraries=geometry&language=ja&region=JA"
        : "AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&libraries=geometry&language=th&region=TH"
    return (
      // <div id='mydiv' style={{ paddingLeft: 21, paddingRight: 21 }}>
      <Row>
        <Col lg={12} style={{ marginTop: -10 }}>
          <LoadScriptNext id="script-loader" googleMapsApiKey={keyApi}>
            <Map />
          </LoadScriptNext>
        </Col>
      </Row>
      // </div>
    )
  }
}

const mapStateToProps = (state) => ({
  language: state.versatile.language,
});

export default connect(mapStateToProps)(History)

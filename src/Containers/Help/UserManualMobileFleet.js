import React, { Component } from 'react';
import Pdf from './UserManual_Fleet.pdf';

class UserManualMobileFleet extends Component {
  componentDidMount() {
    document.getElementById("download_pdf_2").click()
  }
  render() {
    return (<a id="download_pdf_2" href={Pdf} />)
  }
}

export default UserManualMobileFleet;
import React, { Component } from 'react';
import Pdf from './HINO_CONNECT_Manual.pdf';

class UserManual extends Component {
  componentDidMount() {
    document.getElementById("download_pdf").click()
  }
  render() {
    return (<a id="download_pdf" href={Pdf} />)
  }
}

export default UserManual;
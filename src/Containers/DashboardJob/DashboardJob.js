import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Progress } from "reactstrap";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './styles.css'
import barChart1 from './Image/Bar-Chart-1.png'
import barChart2 from './Image/Bar-Chart-2.png'
import barChart3 from './Image/Bar-Chart-3.png'
import barChart4 from './Image/Bar-Chart-4.png'
import timelineImg from './Image/timeline.png'

import BoxCollaps from './BoxCollaps'
import JobSummary from './Charts/JobSummary'

import nockup from './Data/data.js';

class DashboardJob extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
    this.organizationData = nockup.getOrganizationData();
  }

  setPanel(title, dispSummary, footerLabel, imgId) {
    return (
      <div className="ibox float-e-margins" style={{ borderColor: '#e7eaec', borderImage: 'none', borderStyle: 'solid solid none', borderWidth: '3px 0px 0' }}>
        <div className="ibox-content" style={{ padding: '20px 20px 20px 20px' }}>
          <Row>
            <Col sm={7}>
              <h4 style={{ color: '#757575' }}>{title}</h4>
              <h1 className="no-margins" style={{ fontWeight: 'bold' }}>{dispSummary}</h1>
            </Col>
            <Col sm={5}>
              <img src={imgId === 1 ? barChart1 : imgId === 2 ? barChart2 : imgId === 3 ? barChart3 : barChart4} style={{ width: '100%', minHeight: 40, maxHeight: 112 }} />
            </Col>
          </Row>
        </div>
        <div className="ibox-footer">
          <h4 style={{ color: '#757575', marginBottom: 0 }}>{footerLabel}</h4>
        </div>
      </div>
    )
  }

  setList(label, value, color) {
    return <li className="list-group-item fist-item">
      <span className="pull-right" style={{ fontWeight: 'bold' }}>{value}</span>
      <label style={{ backgroundColor: color, height: 10, width: 25, borderRadius: 19, marginBottom: 0 }}>{'   '}</label>
      <span style={{ marginLeft: 10 }}>{label}</span>
    </li>
  }

  setHeaderDesc(label, color) {
    return <div className="form-group field field-string" style={{ padding: '0 10px' }}>
      <label style={{ backgroundColor: color, height: 10, width: 25, borderRadius: 19, marginBottom: 0 }}>{'   '}</label>
      <span style={{ marginLeft: 10 }}>{label}</span>
    </div>
  }

  setOganizationProgress(item) {
    let maxValue = item.jobPercent.per1 + item.jobPercent.per2 + item.jobPercent.per3 + item.jobPercent.per4 + item.jobPercent.per5
    return (
      <tr key={item.id}>
        <td style={{ width: '25%' }}>{item.jobType}</td>
        <td style={{ width: '45%' }} >
          <Progress multi >
            <Progress bar color="green" value={item.jobPercent.per1} max={maxValue}>{item.jobPercent.per1}</Progress>
            <Progress bar color="yellow" value={item.jobPercent.per2} max={maxValue}>{item.jobPercent.per2}</Progress>
            <Progress bar color="gray" value={item.jobPercent.per3} max={maxValue}>{item.jobPercent.per3}</Progress>
            <Progress bar color="red" value={item.jobPercent.per4} max={maxValue}>{item.jobPercent.per4}</Progress>
            <Progress bar color="purple" value={item.jobPercent.per5} max={maxValue}>{item.jobPercent.per5}</Progress>
          </Progress>
        </td>
        <td style={{ width: '10px' }}>{item.car}</td>
        <td style={{ width: '10px' }}>{item.queue}</td>
        <td style={{ width: '10px' }}>{item.late}</td>
      </tr>
    )
  }


  render() {
    // console.log(this.organizationData)

    let jobPlan = [{ id: 1 }, { id: 2 }, { id: 3 }]

    return (
      <Row style={{ marginLeft: 5 }}>
        <Row>
          <Col lg={3} md={6}>
            {this.setPanel("Technicial Team", "70/100", "N/A (10)", 1)}
          </Col>
          <Col lg={3} md={6}>
            {this.setPanel("Job On Time Today", "89.5%", "Drop per Vehicle (6.8%)", 2)}
          </Col>
          <Col lg={3} md={6}>
            {this.setPanel("Job On Time This Month", "89.9%", "Drop per Vehicle (6.8%)", 3)}
          </Col>
          <Col lg={3} md={6}>
            {this.setPanel(" Late Jobs On This Month", "6.0%", "Better than last Week (70.1%)", 4)}
          </Col>
        </Row>

        <Row>
          <Col lg={6} md={12}>
            <div className="ibox float-e-margins">
              <div className="ibox-title" style={{ height: 65 }}>
                <h5 style={{ fontWeight: 'bold', paddingTop: 10 }}>Total Queue</h5>
                <div className="pull-right">
                  <Dropdown
                    className="dropdownStyle"
                    options={[{ label: 'Last 1 day', value: 1 }, { label: 'Last 1 week', value: 2 }, { label: 'Last 1 mounth', value: 3 }]}
                  />
                </div>

              </div>
              <div className="ibox-content">
                <Row>
                  <Col md={7}>
                    <JobSummary chartHeight={275} chartWeight={400}></JobSummary>
                  </Col>
                  <Col md={5}>
                    <ul className="list-group clear-list m-t">
                      {this.setList("On Time Jobs", 16, '#57DF4E')}
                      {this.setList("Late Jobs", 25, '#FFCC00')}
                      {this.setList("Not Started Jobs", 14, '#ADADB2')}
                      {this.setList("Expected late Jobs", 3, '#FF3B30')}
                      {this.setList("Cancle Jobs", 25, '#5856D6')}
                      <li className="list-group-item">
                        <span className="pull-right" style={{ fontWeight: 'bold' }}>83</span>
                        Total Queue
                       </li>
                    </ul>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col lg={6} md={12}>
            <div className="ibox float-e-margins">
              <div className="ibox-title" style={{ height: 65 }}>
                <h5 style={{ fontWeight: 'bold', paddingTop: 10 }}>By Organization</h5>
                {/* <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'flex-end', marginTop: 8 }}>
                  {this.setHeaderDesc("On Time Jobs", '#57DF4E')}
                  {this.setHeaderDesc("Late Jobs", '#FFCC00')}
                  {this.setHeaderDesc("Not Started Jobs", '#ADADB2')}
                  {this.setHeaderDesc("Expected late Jobs", '#FF3B30')}
                  {this.setHeaderDesc("Cancle Jobs", '#5856D6')}
                </div> */}
              </div>
              <div className="ibox-content">
                <Row>
                  <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
                    {this.setHeaderDesc("On Time Jobs", '#57DF4E')}
                    {this.setHeaderDesc("Late Jobs", '#FFCC00')}
                    {this.setHeaderDesc("Not Started Jobs", '#ADADB2')}
                    {this.setHeaderDesc("Expected late Jobs", '#FF3B30')}
                    {this.setHeaderDesc("Cancle Jobs", '#5856D6')}
                  </div>
                </Row>
                <Row>
                  <Col lg={12}>
                    <div className="scroll-tb">
                      <table className="table-organization noborder">
                        <thead>
                          <tr>
                            <th>Job Type</th>
                            <th></th>
                            <th>Total Vehicle</th>
                            <th>Total Queue</th>
                            <th>% สาย</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.organizationData.map((item) => this.setOganizationProgress(item))}
                        </tbody>
                      </table>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="ibox-footer" style={{ textAlign: 'center' }}>
                <a style={{ color: '#757575', marginBottom: 0, fontWeight: 'bold' }}>View all</a>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <div className="ibox float-e-margins">
              <div className="ibox-title">
                <h5 style={{ fontWeight: 'bold' }}>Current events</h5>
              </div>
              <div className="ibox-content">
                <Row>
                  <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'flex-end', marginTop: 8 }}>
                    <div className="form-group field field-string" >
                      <a className="btn btn-white btn-md" title="export to excel"><i className="icon-excel-01" style={{ color: '#007540', fontSize: 18 }}></i> </a>
                    </div>
                    <div className="form-group field field-string" style={{ padding: '0 10px' }}>
                      <input type="text" placeholder="Search" className="input-md form-control" />
                    </div>
                  </div>
                </Row>

                {
                  jobPlan.map((item) =>
                    <BoxCollaps boxid={item.id}>
                      <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'center', marginTop: 8 }}>
                        <div className="form-group field field-string" >
                          <h3 style={{ marginTop: 50 }}>
                            <span style={{ fontWeight: 'bold' }}>TL-046 <i className="fa fa-info-circle"></i></span><br />
                            <span style={{ color: '#757575' }}>บางเสาธง</span><br />
                            <span style={{ color: '#757575' }}>กิ่งอำเภอบางเสาธง</span><br />
                            <span style={{ color: '#757575' }}>สมุทรปราการ</span><br />
                            <span style={{ color: 'green' }}>Online</span>
                          </h3>
                        </div>
                        <div className="form-group field field-string" >
                          <img src={timelineImg} style={{ width: '100%' }} />
                        </div>
                        <div className="form-group field field-string" >
                          <h3 style={{ marginTop: 50 }}>
                            <span style={{ fontWeight: 'bold' }}>DCS2 <i className="fa fa-info-circle"></i></span><br />
                            <span style={{ color: '#757575' }}>วันที่ : 2020-02-23</span><br />
                            <span style={{ color: '#757575' }}>เวลา : 01:55:00</span><br />
                            <span style={{ color: '#757575' }}>ถึง :</span><br />
                            <span style={{ color: '#757575' }}>ออก :</span><br />
                            <span style={{ color: 'red' }}>สถานะ : LATE</span>
                          </h3>
                        </div>
                      </div>
                    </BoxCollaps>
                  )
                }
              </div>
            </div>
          </Col>
        </Row>
      </Row >
    );

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

export default (connect(mapStateToProps, mapDispatchToProps)(DashboardJob))

import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import DriverActions from '../../Redux/DriverRedux'
import {
  Row, Col, Button
} from 'reactstrap'
import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css'
import { get } from 'lodash'
import Images from '../../Themes/Images'
import Table from '../../Components/DataGridView/Table.js'
import StarRatings from 'react-star-ratings';
import SpiderChart from './Chart/Spider'
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import { t } from '../../Components/Translation'
import { ENDPOINT_BASE_URL } from '../../Config/app-config';
import moment from 'moment';
// import FormSelectGroup from '../../Components/FormControls/Basic/FormSelectGroup'

class Driver extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingChart: false,
      activeTab: 0,
      dataDefault: {
        "code": null,
        "prefixName": null,
        "name": null,
        "familyName": null,
        "aliasName": null,
        "houseAndVillage": null,
        "subdistrict": null,
        "district": null,
        "province": null,
        "phone": null,
        "lineID": null,
        "drivingLicenseCards": [
          {
            "drivingCardNo": null,
            "drivingCardType": 0,
            "driverId": 0,
          },
        ],
      },

      DrivingDetail: {
        name: "",
        position: "",
        avatar: "",
        location: "",
        phone: "",
        lineID: "",
        rank: 0,
        drivingSummaryScore: 0,
        drivingSafeScore: 0,
        SummaryLabels: ['Throttle Control', 'Shift-Up & Shift-Down', 'Exhaust & Retarder', 'Hash Start & Hash Acceletation', 'idling', 'RPM High & Low Speed'],
        SafetyLabels: ['Driving Speed', 'Hash Start', 'Seat Belt', 'Hash Turn', 'Hash Break', 'Driving Time']
      },

      drivingSummary: {
        seriesColor: '#00c6ff',
        scors: [{
          arg: 'Trottle',
          score: 0
        },
        {
          arg: ' Shift         ',
          score: 0
        },
        {
          arg: 'Exhaust ',
          score: 0
        },
        {
          arg: 'Hash',
          score: 0
        },
        {
          arg: '    Idling',
          score: 0
        }, {
          arg: '         RPM ',
          score: 0
        }],
      },
      drivingSafety: {
        seriesColor: '#f73861',
        scors: [{
          arg: 'Speed',
          score: 0
        },
        {
          arg: 'Harsh Start',
          score: 0
        },
        {
          arg: 'Seat Belt',
          score: 0
        },
        {
          arg: 'Hash Turn',
          score: 0
        },
        {
          arg: 'Hash Break',
          score: 0
        }, {
          arg: 'Driving Time',
          score: 0
        }],
      },
      drivingSummaryDefault: {
        seriesColor: '#00c6ff',
        scors: [{
          arg: 'Trottle',
          score: 0
        },
        {
          arg: ' Shift         ',
          score: 0
        },
        {
          arg: 'Exhaust ',
          score: 0
        },
        {
          arg: 'Hash',
          score: 0
        },
        {
          arg: '    Idling',
          score: 0
        }, {
          arg: '         RPM ',
          score: 0
        }],
      },
      drivingSafetyDefault: {
        seriesColor: '#f73861',
        scors: [{
          arg: 'Speed',
          score: 0
        },
        {
          arg: 'Harsh Start',
          score: 0
        },
        {
          arg: 'Seat Belt',
          score: 0
        },
        {
          arg: 'Hash Turn',
          score: 0
        },
        {
          arg: 'Hash Break',
          score: 0
        }, {
          arg: 'Driving Time',
          score: 0
        }
        ],
      }
    };

    this.selectedCallback = this.selectedCallback.bind(this);
    this.deleteCallback = this.deleteCallback.bind(this);
    this.editCallback = this.editCallback.bind(this);
  }

  componentWillMount = () => {
    this.props.setSubmitSuccess(false)
  }

  componentDidUpdate(prevProps) {
    let { DrivingDetail, drivingSummary, drivingSafety } = this.state
    let { drivingDetail } = this.props

    if (prevProps.drivingDetail !== this.props.drivingDetail) {
      let drivingSummaryScore = 0, drivingSafeScore = 0
      if (get(drivingDetail, 'drivingSummary', undefined) !== undefined) {
        let SummaryData = drivingDetail.drivingSummary
        let SafeData = drivingDetail.drivingSafe

        drivingSummary.scors[0].score = SummaryData.throttleControl
        drivingSummary.scors[1].score = SummaryData.shiftUpDown
        drivingSummary.scors[2].score = SummaryData.exhaustRetarder
        drivingSummary.scors[3].score = SummaryData.startAcceleration
        drivingSummary.scors[4].score = SummaryData.idling
        drivingSummary.scors[5].score = SummaryData.rpm

        drivingSafety.scors[0].score = SafeData.drivingSpeed
        drivingSafety.scors[1].score = SafeData.hashStart
        drivingSafety.scors[2].score = SafeData.seatBelt
        drivingSafety.scors[3].score = SafeData.hashTum
        drivingSafety.scors[4].score = SafeData.hashBreak
        drivingSafety.scors[5].score = SafeData.drivingTime

        for (let index in SummaryData) drivingSummaryScore += SummaryData[index]
        for (let index in SafeData) drivingSafeScore += SafeData[index]

        DrivingDetail.name = drivingDetail.name
        DrivingDetail.position = drivingDetail.position
        DrivingDetail.avatar = drivingDetail.avatar
        DrivingDetail.location = drivingDetail.location
        DrivingDetail.phone = drivingDetail.phone
        DrivingDetail.lineID = drivingDetail.lineID
        DrivingDetail.rank = drivingDetail.rank
        DrivingDetail.drivingSummaryScore = drivingSummaryScore
        DrivingDetail.drivingSafeScore = drivingSafeScore

        this.setState({ drivingSummary, drivingSafety, DrivingDetail })
        this.setState(state => ({ loadingChart: !state.loadingChart }))
      }
    }
  }

  addForm() {
    this.props.setDriverIdSelect("", "Add")
    this.props.history.push("/driver/driverForm")
  }

  selectedCallback(e) {
    // this.props.getDrivingDetail(e.selectedRowsData[0].personalId)
    // this.setState(state => ({ loadingChart: !state.loadingChart }))
  }

  deleteCallback = (e) => this.props.deleteDriver(e.data.id)
  editCallback = (e) => {
    // this.props.setDriverIdSelect(57, "Edit")
    this.props.setDriverIdSelect(e.data.id, "Edit")
    this.props.history.push('/driver/driverForm')
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  callback() {

  }

  render() {
    let { DrivingDetail, drivingSummary, drivingSafety, drivingSummaryDefault, drivingSafetyDefault } = this.state
    let { header } = this.props

    let infoStyles = { color: 'lightgrey', paddingLeft: 5, fontSize: 13 }
    let boxInfoStyles = { display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }

    return (
      // <div className="form-horizontal" >
      <Suspense fallback={null}>
        <div>
          <Row>
            {/* <FormDatepickerTest
              value={""}
              label={"TEST"}
              fieldForm={"expiredDate"}
              placeholder={""}
              flex={1}
              onChange={this.onChangeDate}
            /> */}
            <Col lg="12" md="12">
              <div className="ibox float-e-margins">
                <div className="ibox-content" style={{ paddingLeft: 35, paddingRight: 35, borderWidth: ' 4px 0px 0px ', borderColor: '#e7eaec' }}>

                  {/* <FormSelectGroup
                    mode={"single"}
                    schema={{ "required": [""] }}
                    label={"Report Type"}
                    list={[
                      {
                        "groupName": "Group A",
                        "items": [
                          {
                            "key": 0,
                            "value": "11111"
                          },
                          {
                            "key": 1,
                            "value": "2222"
                          }
                        ]
                      },
                      {
                        "groupName": "Group B",
                        "items": [
                          {
                            "key": 3,
                            "value": "3333"
                          },
                          {
                            "key": 4,
                            "value": "444"
                          }
                        ]
                      }
                    ]
                    }
                    placeholder={"ReportType"}
                    flex={1}
                    onChange={(selected) => {
                      console.log(selected)
                      this.setState({
                        vehicle_type_seletedReport: selected
                      })
                    }}
                  /> */}

                  <Row style={{ textAlign: "right", marginTop: 5, marginBottom: 0 }}>
                    <Button className="btn btn-primary btn-sm" onClick={() => this.addForm()}><i className="fa fa-plus"></i>{' '}{t('add')}</Button>
                  </Row>
                  <Row>
                    <Table
                      mode={"api"}
                      // serversideSource={'https://api-center.onelink-iot.com/v1.0.1/DriverManage/Drivers/GridView'}
                      serversideSource={ENDPOINT_BASE_URL + 'DriverManage/Drivers/GridView'}
                      author={header.idToken}
                      xAPIKey={header.redisKey}
                      table_id={2}
                      cookiesOptions={{
                        enable: true,
                        name: "Driver"
                      }}
                      user_id={this.props.dataLogin.userId}
                      editing={{
                        enabled: true,
                        allowUpdating: true,
                        allowDeleting: true
                      }}
                      selectedCallback={this.selectedCallback}
                      deleteCallback={this.deleteCallback}
                      editCallback={this.editCallback}
                      autoExpandAll={false}
                      remoteOperations={false}
                      columnCount="prefix"
                      column={[
                        // {
                        //   column_name: 'id',
                        //   column_caption: "id",
                        //   visible: false
                        // },
                        // {
                        //   column_name: 'employeeCode',
                        //   column_caption: "employeeCode",
                        // },
                        {
                          column_name: 'prefix',
                          column_caption: "driver_124",
                        },
                        {
                          column_name: 'name',
                          column_caption: "driver_125",
                        },
                        {
                          column_name: 'nickname',
                          column_caption: "driver_126",
                        },
                        {
                          column_name: 'displayName',
                          column_caption: "driver_127",
                        },
                        {
                          column_name: 'personalId',
                          column_caption: "driver_128",
                        },
                        {
                          column_name: 'department',
                          column_caption: "driver_129",
                        },
                        {
                          column_name: 'position',
                          column_caption: "driver_130",
                        },
                        {
                          column_name: 'startDate',
                          column_caption: "driver_131",
                          column_render: (e) => <div>{moment(e.value).format('DD/MM/YYYY')}</div>,
                        },
                        {
                          column_name: 'endDate',
                          column_caption: "driver_132"
                        }
                      ]}
                    >
                    </Table>
                  </Row>
                </div>
              </div>
            </Col>

            {/* <Col lg="6" md="12">
            <div className="ibox float-e-margins">
              <div className="ibox-title">
                <h5>Driver Profile</h5>
                <div className="ibox-content">
                  <Row>
                    <Row lg="12">
                      <div style={{ paddingLeft: 10 }}>
                        <span style={{ fontSize: 24 }}>{DrivingDetail.name !== "" ? DrivingDetail.name : 'Do not have driver name'}</span>
                      </div>
                    </Row>

                    <Row lg="12">
                      <div style={{ paddingLeft: 10 }}>
                        <span style={{ fontSize: 16, color: 'lightgrey' }}> {DrivingDetail.position !== "" ? DrivingDetail.position : 'Do not have position'}</span>
                      </div>
                    </Row>

                    <Row lg="12" style={{ paddingTop: 10 }}>
                      <Col lg="4" className="b-r">
                        <div>
                          <div>
                            <img src={Images.noneuser} style={{ width: '75%', minHeight: 75, maxHeight: 125, borderRadius: 5 }} />
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: 5 }}>
                            <div style={boxInfoStyles}>
                              <i className="fas fa-map-marker-alt" ></i>
                              <span style={infoStyles}>{DrivingDetail.location !== "" ? DrivingDetail.location : "-"}</span>

                            </div>
                            <div style={boxInfoStyles}>
                              <i className={'fas fa-phone'}></i>
                              <span style={infoStyles}>{DrivingDetail.phone !== "" ? DrivingDetail.phone : "-"}</span>
                            </div>
                            <div style={boxInfoStyles}>
                              <i className={'fab fa-line'}></i>
                              <span style={infoStyles}>{DrivingDetail.lineID !== "" ? DrivingDetail.lineID : "-"}</span>
                            </div>
                          </div>

                          <div style={{ paddingTop: 10, display: 'flex', flexDirection: 'column' }}>
                            <span>Rankings</span>
                            <StarRatings
                              rating={DrivingDetail.rank}
                              starRatedColor="#FFC107"
                              changeRating={this.changeRating}
                              numberOfStars={5}
                              name='rating'
                              starSpacing={2}
                              starDimension={20}
                            />
                          </div>
                          <div style={{ paddingTop: 10 }}>
                            <button>
                              <i className="fas fa-comment-dots"></i>
                              <span style={{ fontWeight: 'bold', paddingLeft: 2.5 }}>Message</span>
                            </button>
                          </div>
                        </div>
                      </Col>

                      <Col lg="4">
                        <div>
                          <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <i className="fas fa-leaf"></i>
                            <span style={{ fontWeight: 'bold', paddingLeft: 5, textAlign: 'center' }}>ECO Driving Summary</span>
                          </div>
                          <div id="chart">
                            <center>
                              {
                                this.state.loadingChart ?
                                  <SpiderChart data={drivingSummaryDefault} chartHeight={200} chartWidth={200}></SpiderChart>
                                  : <SpiderChart data={drivingSummary} chartHeight={200} chartWidth={200}></SpiderChart>
                              }
                            </center>
                          </div>

                          <div>
                            {
                              [
                                DrivingDetail.SummaryLabels.map((item, i) => {
                                  return (
                                    <div key={i} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                      <span style={{ fontSize: 12 }}>{item} : {drivingSummary.scors[i].score}</span>
                                    </div>
                                  )
                                })
                              ]
                            }
                          </div>
                          <div className="hr-line-dashed"></div>
                          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <span style={{ fontWeight: 'bold', textAlign: "center" }}>Summary : {DrivingDetail.drivingSummaryScore}</span>
                          </div>
                        </div>
                      </Col>

                      <Col lg="4">
                        <div>
                          <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <i className="fas fa-user-shield"></i>
                            <span style={{ fontWeight: 'bold', paddingLeft: 5, textAlign: 'center' }}>Driving Safety</span>
                          </div>
                          <div id="chart2">
                            <center>
                              {
                                this.state.loadingChart ?
                                  <SpiderChart data={drivingSafetyDefault} chartHeight={200} chartWidth={200}></SpiderChart>
                                  : <SpiderChart data={drivingSafety} chartHeight={200} chartWidth={200}></SpiderChart>
                              }
                            </center>
                            <div>
                              {
                                [
                                  DrivingDetail.SafetyLabels.map((item, i) => {
                                    return (
                                      <div key={i} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                        <span style={{ fontSize: 12 }}>{item} : {drivingSafety.scors[i].score}</span>
                                      </div>
                                    )
                                  })
                                ]
                              }
                            </div>
                            <div className="hr-line-dashed"></div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                              <span style={{ fontWeight: 'bold', textAlign: "center" }}>Summary : {DrivingDetail.drivingSafeScore}</span>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Row>
                </div>
              </div>
            </div>
          </Col> */}
          </Row>
        </div>
      </Suspense>
    )
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  drivingDetail: state.driver.drivingDetail,
});

const mapDispatchToProps = (dispatch) => ({
  deleteDriver: (id) => dispatch(DriverActions.deleteDriver(id)),
  getDrivingDetail: (personalId) => dispatch(DriverActions.getDrivingDetail(personalId)),
  setDriverIdSelect: (id, action) => dispatch(DriverActions.setDriverIdSelect(id, action)),
  setSubmitSuccess: (status) => dispatch(DriverActions.setSubmitSuccess(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(Driver)

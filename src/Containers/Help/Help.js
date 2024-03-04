import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Row, Col, UncontrolledCollapse, Button, CardBody, Card
} from 'reactstrap'
import { get } from 'lodash'
import { t } from "../../Components/Translation";

const ListItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 8,
  paddingBottom: 5,
  cursor: 'pointer'
  /// borderBottom: '1px solid #e8e8e8'
}

const NumberStyle = {
  padding: '2px 5px',
  fontSize: 12,
  borderRadius: 6,
  color: '#fff'
}

const FontStyle = {
  margin: 0,
  fontWeight: 'bold',
  fontSize: 14,
}

const TextLink = {
  textDecoration: 'underline',
  margin: 0,
  paddingLeft: 8,
  paddingRight: 20,
  fontWeight: 'bold',
  fontSize: 14,
}

const IconStyle = {
  fontSize: 18,
  height: 18,
}

const LinkStyle = {
  color: 'rgba(0, 0, 0, 0.65)',
  fontSize: 14,
  fontWeight: 'bold',
  textDecoration: 'underline',
}

const HeaderQuestion = {
  padding: '0px 0 10px 0'
}

const CollapseHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  backgroundColor: '#dadada85',
  padding: '8px 15px',
  margin: '3px 0',
  cursor: 'pointer',
}

const InDetail = {
  display: 'flex',
  alignItems: 'center',
  padding: '8px 15px',
  margin: '3px 0',
}

const QuestionList = [{
  name: 'FAQ',
  questions: [{
    id: 'coll-hino-merit',
    message: 'help_9',
    content: 'help_10',
    // messageEN: 'What is HINO CONNECT merit?',
    // contentEN: 'Other than the  typical vehicle tracking, vehicle status, it is also integrated with vehicle maintenance system, Driver Behavior as well as it comes default with Cargo-Link system where owner  not only gets a truck but also gets a job.',
    // messageTH: 'ระบบ Hino Connect คืออะไร?',
    // contentTH: 'เป็นระบบที่นอกเหนือจากการติดตามและสถานะของยานพาหนะทั่วไปแล้ว  ยังรวมเข้ากับระบบการซ่อมบำรุง พฤติกรรมของผู้ขับขี่แถมยังมีระบบ Cargo-Link ที่เจ้าของไม่เพียงแค่มีรถบรรทุกเท่านั้น แต่ยังได้งานแถมมา'
  }, {
    id: 'coll-real-time-tracking',
    message: 'help_11',
    content: 'help_12',
    // messageEN: 'How to view in Real-time tracking on map?',
    // contentEN: 'Click "Real Time Dashboard" from the left menu.  The overall status of My Vehicles and My drivers will show on the screen as Donut charts.  on the right, user will see summary Behavior score and if click "Maintenance Status" the sreen will replace behavior summary with maintenance status summary.  By scrolling down, user will see map with a list of vehicles on the right.  Click on any vehicle to see live status of each vehicles.',
    // messageTH: 'จะดูข้อมูลสถานะยานพาหนะล่าสุดได้ยังไง?',
    // contentTH: 'คลิก "ภาพรวมข้อมูลล่าสุด" จากเมนูด้านซ้าย สถานะโดยรวมของยานพาหนะของฉันและไดรเวอร์ของฉันจะแสดงบนหน้าจอเป็นแผนภูมิโดนัท ทางด้านขวาผู้ใช้จะเห็นคะแนนพฤติกรรมสรุปและหากคลิก "สถานะการซ่อมบำรุง" หน้าจอจะแทนที่สรุปพฤติกรรมด้วยหน้าสรุปสถานะการซ่อมบำรุง เมื่อเลื่อนลงผู้ใช้จะเห็นแผนที่พร้อมรายการยานพาหนะทางด้านขวา คลิกที่ยานพาหนะใด ๆ เพื่อดูสถานะล่าสุดของแต่ละยานพาหนะได้'
  }, {
    id: 'coll-tracking-history',
    message: 'help_13',
    content: 'help_14',
    // messageEN: 'How to view Tracking History on Map?',
    // contentEN: 'Click "History" from the left menu, then select Vehicle from the right menu and click to select the history period to view.',
    // messageTH: 'จะดูข้อมูลสถานะยานพาหนะย้อนหลังได้ยังไง?',
    // contentTH: 'คลิก "ข้อมูลย้อนหลัง" จากเมนูด้านซ้าย จากนั้นเลือกยานพาหนะ จากเมนูด้านขวาและคลิกเพื่อเลือกระยะเวลาย้อนหลังที่ต้องการ'
  }, {
    id: 'coll-view-and-create-geofence',
    message: 'help_15',
    content: 'help_16',
    // messageEN: 'How to view/add create Geofence?',
    // contentEN: '',
    // messageTH: 'จะดูหรือเพิ่ม จีโอเฟ้นซ์ยังไง?',
    // contentTH: ''
    // contentEN: 'Click "Setting" from the left menu, the click "My Geofence", a list of available Geofences will appear.  Click "Add" at the top-right to add a new one.'
  }, {
    id: 'coll-fuel-tank-level',
    message: 'help_17',
    content: 'help_18',
    // messageEN: 'How to view fuel tank level?',
    // contentEN: '',
    // messageTH: 'จะดูระดับน้ำมันในถังยังไง?',
    // contentTH: ''
  }, {
    id: 'coll-reviews-maintenance-features',
    message: 'help_19',
    content: 'help_20',
    // messageEN: 'How to use maintenance features?',
    // contentEN: 'Click "Real Time Dashboard" on the left menu, then select vehicle number from the right menu, then drag scroll bar at the bottom to the right most till the maintenance box appears.',
    // messageTH: 'จะดูระบบการซ่อมบำรุงยังไง?',
    // contentTH: 'คลิก "ภาพรวมข้อมูลล่าสุด" บนเมนูด้านซ้ายจากนั้นก็ คลิก "สถานะการซ่อมบำรุง" จากเมนูด้านขวา ก็จะเห็นสถานะทั้งหมด'
  }, {
    id: 'coll-my-vehicles',
    message: 'help_21',
    content: 'help_22',
    // messageEN: 'What is My Vehicles?',
    // contentEN: 'A group of vehicles (one or more) registered to use HINO CONNECT system under the same fleet or same customer.',
    // messageTH: 'รถของฉันคืออะไร?',
    // contentTH: 'กลุ่มรถ (หนึ่งหรือมากกว่า) ที่ลงทะเบียนเพื่อใช้ระบบ HINO CONNECT ภายใต้ฟลีทเดียวกันหรือลูกค้ารายเดียวกัน'
  }, {
    id: 'coll-my-drivers',
    message: 'help_23',
    content: 'help_24',
    // messageEN: 'What is My Drivers?',
    // contentEN: 'A group of drivers (one or more) registered to use HINO CONNECT system under the same fleet or same customer',
    // messageTH: 'คนขับรถของฉันคืออะไร?',
    // contentTH: 'กลุ่มคนขับรถ (หนึ่งหรือมากกว่า) ที่ลงทะเบียนเพื่อใช้ระบบ HINO CONNECT ภายใต้ฟลีทเดียวกันหรือลูกค้ารายเดียวกัน'
  }, {
    id: 'coll-choose-header-table-view',
    message: 'help_25',
    content: 'help_26',
    // messageEN: 'How to use choose header in table view?',
    // contentEN: 'User can select desired header column to view by using a mouse to select and drag  to the left or right to be viewable.',
    // messageTH: 'จะเลือกหัวข้อคอลัมน์ที่จะดูในตารางข้อมูลได้ยังไง?',
    // contentTH: 'ใช้เมาส์เพื่อเลือกคอลัมน์ที่ต้องการ คลิกค้างไว้และลากไปทางซ้ายหรือขวาตามที่ต้องการ'
  }, {
    id: 'coll-change-password',
    message: 'help_27',
    content: 'help_28',
    // messageEN: 'How to change password?',
    // contentEN: '',
    // messageTH: 'จะดูระดับน้ำมันในถังยังไง?',
    // contentTH: ''
  }, {
    id: 'coll-annual-fee',
    message: 'help_29',
    content: 'help_30',
    // messageEN: 'What is annual fee? How to pay annual fee?',
    // contentEN: '',
    // messageTH: 'จะเปลี่ยนพาสเวิร์ดยังไง?',
    // contentTH: ''
  }, {
    id: 'coll-warranty-hino-connect',
    message: 'help_31',
    content: 'help_32',
    // messageEN: 'What is warranty for HINO CONNECT product?',
    // contentEN: '',
    // messageTH: 'ค่าบริการรายปีคืออะไร จ่ายยังไง?',
    // contentTH: ''
  }, {
    id: 'coll-aftermarket',
    message: 'help_33',
    content: 'help_34',
    // messageEN: 'What is aftermarket?',
    // contentEN: '',
    // // contentEN: 'The addition of non-factory parts, spare parts or second-hand equipments or accessories and upgrades to a vehicle also to include removal of parts after vehicle is placed on market',
    // messageTH: 'การรับประกันสำหรับผลิตภัณฑ์ HINO CONNECT มีอะไรบ้าง?',
    // contentTH: ''
  },]
}, {
  name: 'Explanations',
  questions: [{
    id: 'coll-ask-vin',
    message: 'help_35',
    content: 'help_36',
    // messageEN: 'VIN',
    // contentEN: 'Vehicle Identification Number, A unique number for vehicle.',
    // messageTH: 'วีไอเอ็น',
    // contentTH: 'หมายเลขตัวถัง'
  }, {
    id: 'coll-ask-dlt',
    message: 'help_37',
    content: 'help_38',
    // messageEN: 'DLT',
    // contentEN: 'Department of Land Transport.',
    // messageTH: 'กรมขนส่งทางบก',
    // contentTH: 'กรมขนส่งทางบก'
  }, {
    id: 'coll-ask-eg',
    message: 'help_39',
    content: 'help_40',
    // messageEN: 'E/G',
    // contentEN: 'Lamp Engine Lamp, indicate an engine problem.',
    // messageTH: 'ไฟแสดงสถานะเครื่อง',
    // contentTH: 'ไฟแสดงสถานะเครื่องมีปัญหา'
  }, {
    id: 'coll-ask-co2',
    message: 'help_41',
    content: 'help_42',
    // messageEN: 'CO2',
    // contentEN: 'Carbon dioxide, odorless, colorless gas.',
    // messageTH: 'ซีโอทู',
    // contentTH: 'ก๊าซคาร์บอนไดออกไซด์'
  }, {
    id: 'coll-ask-co2-emissions',
    message: 'help_43',
    content: 'help_44',
    // messageEN: 'CO2 Emissions',
    // contentEN: 'emissions of CO 2 per transport unit (tonne-km). The less emission is more efficient.',
    // messageTH: 'การปล่อยก๊าซ CO2',
    // contentTH: 'การปล่อย CO2 ต่อหน่วยระยะทาง (ตัน - กม.) การปล่อยน้อยลงมีประสิทธิภาพมากขึ้น'
  }, {
    id: 'coll-ask-co2-efficiency',
    message: 'help_45',
    content: 'help_46',
    // messageEN: 'CO2 Efficiency',
    // contentEN: '',
    // messageTH: 'ประสิทธิภาพการปล่อย CO2',
    // contentTH: 'การวัดประสิทธิภาพการปล่อยก็าซ CO2'
  }, {
    id: 'coll-ask-imei',
    message: 'help_47',
    content: 'help_48',
    // messageEN: 'IMEI',
    // contentEN: 'International Mobile Equipment Identity.',
    // messageTH: 'IMEI',
    // contentTH: 'หมายเลขเฉพาะของอุปกรณ์สื่อสารเคลื่อนที'
  }, {
    id: 'coll-ask-imsi',
    message: 'help_49',
    content: 'help_50',
    // messageEN: 'IMSI',
    // contentEN: 'International Mobile Subscriber Identity.',
    // messageTH: 'IMSI',
    // contentTH: 'หมายเลขเฉพาะประจำตัวของซิม'
  }, {
    id: 'coll-ask-mid',
    message: 'help_51',
    content: 'help_52',
    // messageEN: 'MID',
    // contentEN: 'Mobile device IDentification.',
    // messageTH: 'MID',
    // contentTH: 'หมายเลขอ้างอิงอุปกรณ์สื่อสารเคลื่อนที่'
  }, {
    id: 'coll-ask-gps',
    message: 'help_53',
    content: 'help_54',
    // messageEN: 'GPS',
    // contentEN: 'Global Positioning System.',
    // messageTH: 'จีพีเอส',
    // contentTH: 'ระบบบอกพิกัดด้วยดาวเทียม'
  }, {
    id: 'coll-ask-odo',
    message: 'help_55',
    content: 'help_56',
    // messageEN: 'ODO',
    // contentEN: 'Odometer, instrument used for measuring the distance traveled by a vehicle.',
    // messageTH: 'โอโดมิเตอร์',
    // contentTH: 'อุปกรณ์แสดงระยะเคลื่อนสะสมของรถ'
  }, {
    id: 'coll-ask-cargolink',
    message: 'help_57',
    content: 'help_58',
    // messageEN: 'Cargo Link',
    // contentEN: 'Cargo Link, the partner who provide logistics technology solutions to help businesses directly connect with the network of transport partners nationwide.',
    // messageTH: 'คาร์โกลิงค์',
    // contentTH: 'Cargo Link พันธมิตรที่ให้บริการโซลูชั่นเทคโนโลยีด้านโลจิสติกส์เพื่อช่วยให้ธุรกิจเชื่อมต่อโดยตรงกับเครือข่ายพันธมิตรการขนส่งทั่วประเทศ'
  }, {
    id: 'coll-ask-vrp',
    message: 'help_59',
    content: 'help_60',
    // messageEN: 'VRP',
    // contentEN: 'Vehicle Route Planner',
    // messageTH: 'วีอาร์พี',
    // contentTH: 'การวางแผนเส้นทาง'
  },]
  // }]
}]

const ListItems = [
  {
    name: 'help_3',
    count: QuestionList[0].questions.length,
    color: '#51da70',
  },
  {
    name: 'help_4',
    count: QuestionList[1].questions.length,
    color: '#ffc107',
  },
  {
    name: 'help_5',
    count: 1,
    color: '#dc3545'
  },
  {
    name: 'help_6',
    count: 1,
    color: '#007bff'
  },
  {
    name: 'help_61',
    count: 1,
    color: 'rgb(0 69 143)'
  },
  {
    name: 'help_7',
    count: 1,
    color: '#28a745'
  },
  {
    name: 'help_62',
    count: 2,
    color: 'rgb(255 86 0)'
  }
]

class Help extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpenDetail: false
    }
  }

  componentWillMount() {
    // i18n.changeLanguage(this.props.language)
    if (get(this, 'props.history.location.state') === 'show_detail_help') this.setOpenDetail(100)
  }

  shouldComponentUpdate(nextProps, nextState) {

    if (get(nextProps, 'isOpenDetail') !== get(this, 'props.isOpenDetail')) {
      this.setOpenDetail(250)
      return false
    }
    return true
  }

  setOpenDetail(time) {
    this.setState({ isOpenDetail: true })
    setTimeout(() => {
      let ele = document.getElementById("help_62");
      if (ele) ele.scrollIntoView({ behavior: "smooth" })
    }, time)
  }


  render() {
    let { isOpenDetail } = this.state
    return (
      <div className="ibox">
        <div className="ibox-title">
          {/* Help */}
          <h2>{t('help_1')}</h2>
        </div>
        <div className="ibox-content" style={{ maxHeight: 'auto' }}>
          <Row style={{ margin: -5 }}>
            <Col md="3" style={{ paddingTop: 10 }}>
              {/* Categories */}
              <h3>{t('help_2')}</h3>
              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', paddingTop: 15 }}>
                {ListItems.map((e, i) => {
                  const border = i == ListItems.length - 1 ? 'none' : '1px solid #e8e8e8'
                  return (<div id={i} style={{ ...ListItemStyle, borderBottom: border }} onClick={() => {
                    // let element = document.getElementById(e.name);
                    // if (element) {
                    //   let headerOffset = document.getElementById('header-fixed').clientHeight;
                    //   let elementPosition = element.getBoundingClientRect().top;
                    //   let offsetPosition = elementPosition - headerOffset;

                    //   window.scrollTo({
                    //     top: offsetPosition,
                    //     behavior: "smooth"
                    //   });
                    // }
                    let ele = document.getElementById(e.name);
                    if (ele) ele.scrollIntoView({ behavior: "smooth" })
                    // let ele = document.getElementById(e.name);
                    // if (ele) {
                    //   let yourHeight = document.getElementById('header-fixed').clientHeight
                    //   ele.scrollIntoView(true)
                    //   let scrolledY = window.scrollY
                    //   let innerHeight = window.innerHeight
                    //   // console.log(scrolledY, yourHeight, innerHeight - 120)
                    //   if (scrolledY) {
                    //     window.scroll(0, scrolledY - yourHeight);
                    //   }

                    // }

                    if (e.name == "help_62") this.setOpenDetail(100)
                  }}>
                    {/* <p style={FontStyle}>{e.name}</p> */}
                    <p style={FontStyle}>{t(e.name)}</p>
                    <span style={{ backgroundColor: e.color, ...NumberStyle }}>{e.count}</span>
                  </div>)
                })}
              </div>
            </Col>
            <Col md="9" style={{ paddingTop: 10, paddingLeft: 30 }}>
              <div className='scroll' style={{ maxHeight: 'calc(100vh - 220px)' }}>
                <h3 style={HeaderQuestion} id='help_3'>{t('help_3')}</h3>
                {QuestionList[0].questions.map((e, i) => {
                  return (<div>
                    <div id={e.id} style={CollapseHeader}>
                      {/* <p style={FontStyle}>{e.message}</p> */}
                      <p style={FontStyle}>{t(e.message)}</p>
                      <i className="fa fa-caret-down"></i>
                    </div>
                    <UncontrolledCollapse toggler={`#${e.id}`}>
                      <Card>
                        <CardBody>
                          {/* {e.content} */}
                          {t(e.content)}
                        </CardBody>
                      </Card>
                    </UncontrolledCollapse>
                  </div>)
                })}
                <br />
                {/* <div id='help_4'> */}
                <h3 style={HeaderQuestion} id='help_4'>{t('help_4')}</h3>
                {QuestionList[1].questions.map((e, i) => {
                  return (<div>
                    <div id={e.id} style={CollapseHeader}>
                      {/* <p style={FontStyle}>{e.message}</p> */}
                      <p style={FontStyle}>{t(e.message)}</p>
                      <i className="fa fa-caret-down"></i>
                    </div>
                    <UncontrolledCollapse toggler={`#${e.id}`}>
                      <Card>
                        <CardBody>
                          {/* {e.content} */}
                          {t(e.content)}
                        </CardBody>
                      </Card>
                    </UncontrolledCollapse>
                  </div>)
                })}
                <br />
                <h3 style={HeaderQuestion} id='help_5'>{t('help_5')}</h3>
                <div style={{ ...InDetail, backgroundColor: '#dadada85' }}>
                  <p style={FontStyle}>{t('help_8')}</p>
                </div>
                <div style={{ ...InDetail, backgroundColor: '#d5d8d6' }}>
                  <span style={{ display: 'flex' }}><i className="fa fa-phone-alt" style={IconStyle}></i><p style={TextLink}>02-305-4443</p></span>
                  <span style={{ display: 'flex' }}><i className="fab fa-line" style={IconStyle}></i><p style={TextLink}>@Hinolink</p></span>
                  <span style={{ display: 'flex' }}><i className="fab fa-facebook" style={IconStyle}></i><p style={TextLink}>Hino Thailand Fanclub</p></span>
                </div>
                <br />
                <h3 style={HeaderQuestion}>{t('help_6')} & {t('help_7')}</h3>
                <div style={{ ...InDetail, backgroundColor: '#dadada85' }}>
                  <p style={FontStyle} id='help_6'>{t('help_6')}</p>
                </div>
                <div style={{ ...InDetail, backgroundColor: '#d5d8d6' }}>
                  <a href="#/UserManual" target="_blank" style={LinkStyle}>https://hino-connect.onelink-iot.com/#/UserManual</a>
                </div>
                <div style={{ ...InDetail, backgroundColor: '#dadada85' }}>
                  <p style={FontStyle} id='help_61'>{t('help_61')}</p>
                </div>
                <div style={{ ...InDetail, backgroundColor: '#d5d8d6' }}>
                  <a href="#/UserManualMobileFleet" target="_blank" style={LinkStyle}>https://hino-connect.onelink-iot.com/#/UserManualMobileFleet</a>
                </div>
                <div style={{ ...InDetail, backgroundColor: '#dadada85' }}>
                  <p style={FontStyle} id='help_7'>{t('help_7')}</p>
                </div>
                <div style={{ ...InDetail, backgroundColor: '#d5d8d6' }}>
                  <a href="https://e-learning.onelink.co.th" target="_bank" style={LinkStyle}>https://e-learning.onelink.co.th</a>
                </div>

                <br />
                {/* <h3 style={HeaderQuestion} id="Release Notes">{t("Release Notes")}</h3> */}
                <div id="help_62">
                  <div id={"coll-release-notes"} onClick={() => this.setState(state => ({ isOpenDetail: !state.isOpenDetail }))} style={CollapseHeader}>
                    <p style={FontStyle}>{t('help_62')}</p>
                    <i className="fa fa-caret-down"></i>
                  </div>
                  <UncontrolledCollapse isOpen={isOpenDetail} toggler={`#${"coll-release-notes"}`}>
                    <Card>
                      <CardBody>
                        <div style={{ padding: 15 }}>
                          <span style={{ fontSize: 18 }}><b>v1.4.00</b></span><br />
                          <span><i>{t('release_19')}</i></span>
                          <ul style={{ paddingTop: 10 }}>
                            <li>{t('release_20')}</li>
                            <li>{t('release_21')}</li>
                            <li>{t('release_22')}</li>
                            <li>{t('release_23')}</li>
                            <li>{t('release_24')}</li>
                          </ul>
                        </div>

                        <div style={{ padding: 15, marginTop: -30 }}>
                          <span style={{ fontSize: 18 }}><b>v1.3.01</b></span><br />
                          <span><i>{t('release_17')}</i></span>
                          <ul style={{ paddingTop: 10 }}>
                            <li>{t('release_9')}</li>
                            <li>{t('release_10')}</li>
                            <li>{t('release_11')}</li>
                            <li>{t('release_12')}
                              <ul>
                                <li>{t('release_13')}</li>
                                <li>{t('release_14')}</li>
                                <li>{t('release_15')}</li>
                                <li>{t('release_16')}</li>
                              </ul>
                            </li>
                          </ul>
                        </div>

                        <div style={{ padding: 15, marginTop: -30 }}>
                          <span style={{ fontSize: 18 }}><b>v1.3</b></span><br />
                          <span><i>{t('release_18')}</i></span>
                          <ul style={{ paddingTop: 10 }}>
                            <li>{t('release_2')}</li>
                            <li>{t('release_3')}</li>
                            <li>{t('release_4')}</li>
                            <li>{t('release_5')}</li>
                            <li>{t('release_6')}</li>
                            <li>{t('release_7')}</li>
                          </ul>
                        </div>
                      </CardBody>
                    </Card>
                  </UncontrolledCollapse>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  language: state.versatile.language,
  isOpenDetail: state.versatile.isOpenDetail,
  // dataLogin: state.signin.dataLogin,
  header: state.signin.header,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Help)
import React, { Component } from 'react'
import InstallingActions from '../../Redux/InstallingRedux'
import { connect } from 'react-redux'
import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css'
import 'moment/locale/th'
import { Row, Col, Label, Button } from 'reactstrap';
import Table from '../../Components/DataGridView/Table.js'
import { Link } from 'react-router-dom';
import { ENDPOINT_INSTALL_BASE_URL, ENDPOINT_BASE_URL } from '../../Config/app-config';
import { t } from '../../Components/Translation';
import moment from 'moment';
import Viewer from 'react-viewer';
import LazyLoad from 'react-lazyload'
import { get } from 'lodash'
import { element } from 'prop-types';

const STATUS_SUCCESSFUL_COLOR = '#008000'
const STATUS_UNSUCCESSFUL_COLOR = '#ff0000'
const STATUS_WAITING_COLOR = '#ffa500'

const ServiceStatusName = (status) => {
  return status === 1 ? (<span style={{ color: STATUS_WAITING_COLOR }}>
    รอตรวจสอบ
  </span>) : (status == 2 ? (<span style={{ color: STATUS_SUCCESSFUL_COLOR }}>
    ผ่าน
  </span>) : (<span style={{ color: STATUS_UNSUCCESSFUL_COLOR }}>
    ไม่ผ่าน
  </span>))
}

class InstallingApprovalForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      frontUrlShow: false,
      chassiUrlShow: false,
      gpsUrlShow: false,
      mileUrlShow: false,
      gsmUrlShow: false,
      cardUrlShow: false,
      speakerUrlShow: false,
      oilUrlShow: false,
      canbusUrlShow: false,
      stickerUrlShow: false,
      worksheetUrlShow: false,
      otherUrlShow: false,
      otherActiveIndex: 0,
      imgs: []
    }
  }

  async componentDidMount() {

    if (this.props.detail) {
      this.getAttach(this.props.detail.id)

      /*

      */
    }
  }

  async getAttach(id) {
    // console.log(id)
    const res = await fetch(`${ENDPOINT_INSTALL_BASE_URL}services/{id}/attached?id=${id}`)
    let attaches = await res.json()
    // console.log(attaches)
    const images = attaches.map(e => {
      return e.attachCode
    })
    // console.log("img : " ,images)
    let attachUrl = []

    if (images.length > 0) {
      const { redisKey, userTokenInfo } = this.props.dataLogin

      const res = await fetch(`${ENDPOINT_BASE_URL}ecm/files/list-by-code`, {
        method: 'post',
        body: JSON.stringify({
          "attachCodes": images
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': userTokenInfo.idToken,
          'X-API-Key': redisKey,
        }
      })
      const json = await res.json()
      // console.log(json)

      attachUrl = json.map((e, i) => {
        // e.attachType = attaches[i].attachType
        const index = attaches.findIndex(element => {
          return element.attachCode == e.attachCode
        })
        e.attachType = attaches[index].attachType
        return e
      })
      // console.log(attachUrl)
    }
    this.setState({ imgs: attachUrl })
  }

  render() {
    // console.log(this.props.detail)
    const { header } = this.props
    const {
      activeStatus,
      chassisNo,
      createdBy,
      createdDateTime,
      displayName,
      engineNo,
      id,
      imei,
      note,
      serviceResult,
      serviceResultName,
      serviceStatus,
      serviceStatusName,
      serviceType,
      serviceTypeName,
      subscriberId,
      ticketId,
      updatedBy,
      updatedDateTime,
      vehicleId,
      vinNo,
    } = this.props.detail || {}
    // console.log(this.props.dataLogin.userId)

    const frontUrl = this.state.imgs.filter(e => e.attachType == 3)
    const chassiUrl = this.state.imgs.filter(e => e.attachType == 4)
    const gpsUrl = this.state.imgs.filter(e => e.attachType == 5)
    const mileUrl = this.state.imgs.filter(e => e.attachType == 16)
    const gsmUrl = this.state.imgs.filter(e => e.attachType == 17)
    const cardUrl = this.state.imgs.filter(e => e.attachType == 18)
    const speakerUrl = this.state.imgs.filter(e => e.attachType == 19)
    const oilUrl = this.state.imgs.filter(e => e.attachType == 20)
    const canbusUrl = this.state.imgs.filter(e => e.attachType == 6)
    const stickerUrl = this.state.imgs.filter(e => e.attachType == 21)
    const worksheetUrl = this.state.imgs.filter(e => e.attachType == 22)
    const otherUrl = this.state.imgs.filter(e => e.attachType == 23)
    const otherUrlBig = otherUrl.map(e => ({ src: e.fileUrl }))

    // console.log("front : " ,frontUrl)

    return (<div className="ibox">
      <div class="ibox-title">
        <h2>{t("gps_installing_approval")} : {displayName}</h2>
      </div>
      <div class="ibox-content" style={{ paddingLeft: 35, paddingRight: 35, borderWidth: ' 1px 0px 0px ', borderColor: '#e7eaec' }}>
        <Row>
          <Col lg="12">
            <h3>{t("installation_information")}</h3>
            <Row>
              <Col lg="6">
                <div>
                  <Label>{t("installation_service_type")} : </Label>{` `}
                  {<span style={{ color: serviceType === 1 ? STATUS_SUCCESSFUL_COLOR : STATUS_WAITING_COLOR }}>
                    {serviceTypeName}
                  </span>}
                </div>
                <div>
                  <Label>VIN : </Label>{` `}{vinNo}
                </div>
                <div>
                  <Label>{t('chassis')} : </Label>{` `}{chassisNo}
                </div>
                <div>
                  <Label>IMEI : </Label>{` `}{imei}{` `}<a href="#" onClick={(e) => {
                    e.preventDefault()
                    this.props.history.push('/GPSUnit?imei=' + imei)
                  }}>ตรวจสอบสัญญาณ</a>
                </div>
              </Col>
              <Col lg="6">
                <div>
                  <Label>{t('installation_create_date_time')} : </Label> {` `}{moment(createdDateTime).format('lll')}
                </div>
                <div><Label></Label></div>
                <div>
                  <Label>{t('installation_engine_no')} : </Label> {` `}{engineNo}
                </div>
                <div><Label></Label></div>
              </Col>
            </Row>
          </Col>

          <Col lg="12" style={{ marginTop: 20 }}>
            <h3>{t("installation_image")}</h3>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ flex: 1, paddingRight: 15, marginBottom: 20 }}>
                <Label>{t('installation_front_image')}</Label>
                <div style={{ width: 64, height: 64, zIndex: 20000 }}>
                  {frontUrl.length > 0 && <><button onClick={() => this.setState({ frontUrlShow: true })}>
                    <LazyLoad height={64}>
                      <img src={frontUrl[0].fileUrl}
                        width={64} height={64} />
                    </LazyLoad>
                  </button>
                    <Viewer
                      visible={this.state.frontUrlShow}
                      onClose={() => { this.setState({ frontUrlShow: false }) }}
                      images={[{ src: frontUrl[0].fileUrl, alt: '' }]}
                    /></>
                  }{
                    frontUrl.length == 0 && <div>-</div>
                  }
                </div>
              </div>
              <div style={{ flex: 1, paddingLeft: 15, marginBottom: 20 }}>
                <Label>{t('installation_chassi_image')}</Label>
                <div style={{ width: 64, height: 64, zIndex: 20000 }}>
                  {chassiUrl.length > 0 && <><button onClick={() => this.setState({ chassiUrlShow: true })}>
                    <LazyLoad height={64}>
                      <img src={chassiUrl[0].fileUrl}
                        width={64} height={64} />
                    </LazyLoad>
                  </button>
                    <Viewer
                      visible={this.state.chassiUrlShow}
                      onClose={() => { this.setState({ chassiUrlShow: false }) }}
                      images={[{ src: chassiUrl[0].fileUrl, alt: '' }]}
                    /></>
                  }{
                    chassiUrl.length == 0 && <div>-</div>
                  }
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ flex: 1, paddingRight: 15, marginBottom: 20 }}>
                <Label>{t('installation_gps_device_image')}</Label>
                <div style={{ width: 64, height: 64, zIndex: 20000 }}>
                  {gpsUrl.length > 0 && <><button onClick={() => this.setState({ gpsUrlShow: true })}>
                    <LazyLoad height={64}>
                      <img src={gpsUrl[0].fileUrl}
                        width={64} height={64} />
                    </LazyLoad>
                  </button>
                    <Viewer
                      visible={this.state.gpsUrlShow}
                      onClose={() => { this.setState({ gpsUrlShow: false }) }}
                      images={[{ src: gpsUrl[0].fileUrl, alt: '' }]}
                    /></>
                  }{
                    gpsUrl.length == 0 && <div>-</div>
                  }
                </div>
              </div>
              <div style={{ flex: 1, paddingLeft: 15, marginBottom: 20 }}>
                <Label>{t('installation_speedometer_image')}</Label>
                <div style={{ width: 64, height: 64, zIndex: 20000 }}>
                  {mileUrl.length > 0 && <><button onClick={() => this.setState({ mileUrlShow: true })}>
                    <LazyLoad height={64}>
                      <img src={mileUrl[0].fileUrl}
                        width={64} height={64} />
                    </LazyLoad>
                  </button>
                    <Viewer
                      visible={this.state.mileUrlShow}
                      onClose={() => { this.setState({ mileUrlShow: false }) }}
                      images={[{ src: mileUrl[0].fileUrl, alt: '' }]}
                    /></>
                  }{
                    mileUrl.length == 0 && <div>-</div>
                  }
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ flex: 1, paddingRight: 15, marginBottom: 20 }}>
                <Label>{t('installation_antenna_image')}</Label>
                <div style={{ width: 64, height: 64, zIndex: 20000 }}>
                  {gsmUrl.length > 0 && <><button onClick={() => this.setState({ gsmUrlShow: true })}>
                    <LazyLoad height={64}>
                      <img src={gsmUrl[0].fileUrl}
                        width={64} height={64} />
                    </LazyLoad>
                  </button>
                    <Viewer
                      visible={this.state.gsmUrlShow}
                      onClose={() => { this.setState({ gsmUrlShow: false }) }}
                      images={[{ src: gsmUrl[0].fileUrl, alt: '' }]}
                    /></>
                  }{
                    gsmUrl.length == 0 && <div>-</div>
                  }
                </div>
              </div>
              <div style={{ flex: 1, paddingLeft: 15, marginBottom: 20 }}>
                <Label>{t('installation_card_swipe_machine_image')}</Label>
                <div style={{ width: 64, height: 64, zIndex: 20000 }}>
                  {cardUrl.length > 0 && <><button onClick={() => this.setState({ cardUrlShow: true })}>
                    <LazyLoad height={64}>
                      <img src={cardUrl[0].fileUrl}
                        width={64} height={64} />
                    </LazyLoad>
                  </button>
                    <Viewer
                      visible={this.state.cardUrlShow}
                      onClose={() => { this.setState({ cardUrlShow: false }) }}
                      images={[{ src: cardUrl[0].fileUrl, alt: '' }]}
                    /></>
                  }{
                    cardUrl.length == 0 && <div>-</div>
                  }
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ flex: 1, paddingRight: 15, marginBottom: 20 }}>
                <Label>{t('installation_speaker_image')}</Label>
                <div style={{ width: 64, height: 64, zIndex: 20000 }}>
                  {speakerUrl.length > 0 && <><button onClick={() => this.setState({ speakerUrlShow: true })}>
                    <LazyLoad height={64}>
                      <img src={speakerUrl[0].fileUrl}
                        width={64} height={64} />
                    </LazyLoad>
                  </button>
                    <Viewer
                      visible={this.state.speakerUrlShow}
                      onClose={() => { this.setState({ speakerUrlShow: false }) }}
                      images={[{ src: speakerUrl[0].fileUrl, alt: '' }]}
                    /></>
                  }{
                    speakerUrl.length == 0 && <div>-</div>
                  }
                </div>
              </div>
              <div style={{ flex: 1, paddingLeft: 15, marginBottom: 20 }}>
                <Label>{t('installation_oil_meter_cable_image')}</Label>
                <div style={{ width: 64, height: 64, zIndex: 20000 }}>
                  {oilUrl.length > 0 && <><button onClick={() => this.setState({ oilUrlShow: true })}>
                    <LazyLoad height={64}>
                      <img src={oilUrl[0].fileUrl}
                        width={64} height={64} />
                    </LazyLoad>
                  </button>
                    <Viewer
                      visible={this.state.oilUrlShow}
                      onClose={() => { this.setState({ oilUrlShow: false }) }}
                      images={[{ src: oilUrl[0].fileUrl, alt: '' }]}
                    /></>
                  }{
                    oilUrl.length == 0 && <div>-</div>
                  }
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ flex: 1, paddingRight: 15, marginBottom: 20 }}>
                <Label>{t('installation_canbus_plug_image')}</Label>
                <div style={{ width: 64, height: 64, zIndex: 20000 }}>
                  {canbusUrl.length > 0 && <><button onClick={() => this.setState({ canbusUrlShow: true })}>
                    <LazyLoad height={64}>
                      <img src={canbusUrl[0].fileUrl}
                        width={64} height={64} />
                    </LazyLoad>
                  </button>
                    <Viewer
                      visible={this.state.canbusUrlShow}
                      onClose={() => { this.setState({ canbusUrlShow: false }) }}
                      images={[{ src: canbusUrl[0].fileUrl, alt: '' }]}
                    /></>
                  }{
                    canbusUrl.length == 0 && <div>-</div>
                  }
                </div>
              </div>
              <div style={{ flex: 1, paddingLeft: 15, marginBottom: 20 }}>
                <Label>{t('installation_dlt_sticker_image')}</Label>
                <div style={{ width: 64, height: 64, zIndex: 20000 }}>
                  {stickerUrl.length > 0 && <><button onClick={() => this.setState({ stickerUrlShow: true })}>
                    <LazyLoad height={64}>
                      <img src={stickerUrl[0].fileUrl}
                        width={64} height={64} />
                    </LazyLoad>
                  </button>
                    <Viewer
                      visible={this.state.stickerUrlShow}
                      onClose={() => { this.setState({ stickerUrlShow: false }) }}
                      images={[{ src: stickerUrl[0].fileUrl, alt: '' }]}
                    /></>
                  }{
                    stickerUrl.length == 0 && <div>-</div>
                  }
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ flex: 1, paddingRight: 15, marginBottom: 20 }}>
                <Label>{t('installation_worksheet_image')}</Label>
                <div style={{ width: 64, height: 64, zIndex: 20000 }}>
                  {worksheetUrl.length > 0 && <><button onClick={() => this.setState({ worksheetUrlShow: true })}>
                    <LazyLoad height={64}>
                      <img src={worksheetUrl[0].fileUrl}
                        width={64} height={64} />
                    </LazyLoad>
                  </button>
                    <Viewer
                      visible={this.state.worksheetUrlShow}
                      onClose={() => { this.setState({ worksheetUrlShow: false }) }}
                      images={[{ src: worksheetUrl[0].fileUrl, alt: '' }]}
                    /></>
                  }{
                    worksheetUrl.length == 0 && <div>-</div>
                  }
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ flex: 1, paddingRight: 15, marginBottom: 20 }}>
                <Label>{t('installation_other_image')}</Label>
                <div style={{ display: 'flex', flexDirection: 'row' }}>{
                  otherUrl.map((e, i) => <div style={{ width: 84, height: 64, }}>
                    {otherUrl.length > 0 && <><button onClick={() => this.setState({
                      otherUrlShow: true, otherActiveIndex: i
                    })}>
                      <LazyLoad height={64}>
                        <img src={otherUrl[i].fileUrl}
                          width={64} height={64} />
                      </LazyLoad>
                    </button>
                    </>
                    }
                  </div>)}</div>
                {otherUrl.length > 0 && <Viewer
                  visible={this.state.otherUrlShow}
                  activeIndex={this.state.otherActiveIndex}
                  onClose={() => { this.setState({ otherUrlShow: false }) }}
                  images={otherUrlBig}
                />}
                {
                  otherUrl.length == 0 && <div>-</div>
                }
              </div>
            </div>

          </Col>

          <Col lg="12" style={{ paddingTop: 20 }}>
            <h3>{t("installation_items")}</h3>
            <Table
              mode={"api"}
              serversideSource={ENDPOINT_INSTALL_BASE_URL + 'grid-view/subscriber-items/'.concat(subscriberId)}
              author={header.idToken}
              xAPIKey={header.redisKey}
              table_id={6}
              user_id={this.props.dataLogin.userId}
              searchPanel={false}
              autoExpandAll={false}
              remoteOperations={false}
              column={[
                {
                  column_name: 'itemName',
                  column_caption: "Item Name / อุปกรณ์",
                },
                {
                  column_name: 'serialNo1',
                  column_caption: "Seria No.1",
                },
                {
                  column_name: 'serialNo2',
                  column_caption: "Seria No.2",
                },
                {
                  column_name: 'isInstallation',
                  column_caption: "Installation / ติดตั้ง (ติดตั้ง/ไม่ติดตั้ง)",
                  column_render: ({ value }) => {
                    return <div style={{ textAlign: 'center' }}>{value ?
                      <div style={{ color: 'green' }}>ติดตั้งแล้ว</div> :
                      <div style={{ color: 'orange' }}>ยังไม่ติดตั้ง</div>}
                    </div>
                  }
                },
              ]}
            >
            </Table>
          </Col>

          <Col lg="12" style={{ paddingTop: 20 }}>
            <h3>{t('installation_result_and_status')}</h3>
            <Row>
              <Col lg="6">
                <div>
                  <Label>{t('installation_service_result')} :</Label>{` `}
                  {<span style={{ color: serviceResult === 1 ? STATUS_SUCCESSFUL_COLOR : STATUS_UNSUCCESSFUL_COLOR }}>
                    {serviceResultName}
                  </span>}
                </div>
                <div>
                  <Label>{t('installation_note')} : </Label>{` `}{note}
                </div>
                <div>
                  <Label>{t('installation_service_status')} :</Label>{` `}
                  {<span style={{ color: serviceStatus === 1 ? STATUS_WAITING_COLOR : (serviceStatus === 2 ? STATUS_SUCCESSFUL_COLOR : STATUS_UNSUCCESSFUL_COLOR) }}>
                    {serviceStatusName}
                  </span>}
                </div>
              </Col>
              <Col lg="6">
                <div>
                  <Label>{t('installation_ticket_id')} : </Label> {` `}{ticketId}
                </div>
              </Col>
            </Row>
          </Col>

          <Col lg="12" style={{ paddingTop: 20, paddingBottom: 10, textAlign: 'right' }}>
            {serviceStatus === 2 ? (
              <Button className="btn btn-default" onClick={(e) => this.props.history.push('/Management/installingApproval')}>Close</Button>
            ) : (
                <><Button color="info" onClick={(e) => {
                  if (window.confirm('Are you sure you wish to approve this item?')) {
                    // console.log('click approve')
                    this.props.updateIntegrationService(id, this.props.dataLogin.userId, 2)
                  }
                }}>Approve</Button>{` `}
                  <Button color="danger" onClick={(e) => {
                    if (window.confirm('Are you sure you wish to reject this item?')) {
                      // console.log('click reject')
                      this.props.updateIntegrationService(id, this.props.dataLogin.userId, 3)
                    }
                  }}>Reject</Button></>
              )}
          </Col>

        </Row>
      </div>
    </div>)
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  id: state.installing.idSelected,
  detail: state.installing.infoInstallingData,
});

const mapDispatchToProps = (dispatch) => ({
  updateServiceStatus: (id, serviceStatus) => dispatch(InstallingActions.updateServiceStatusRequest(id, serviceStatus)),
  idSelected: (typeForm, id) => dispatch(InstallingActions.idSelected(typeForm, id)),
  updateIntegrationService: (id, user_id, action_status) => dispatch(InstallingActions.updateIntegrationServiceRequest(id, user_id.toString(), action_status))
});

export default connect(mapStateToProps, mapDispatchToProps)(InstallingApprovalForm)

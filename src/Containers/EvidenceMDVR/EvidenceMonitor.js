import React, { Component, Suspense, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'
import PannelBox from '../../Components/PannelBox'
import { t } from "../../Components/Translation";
import Table from '../../Components/DataGridView/Table.js'
import VideoPanel from './MonitorPanel/VideoPanel'
import Map from './MonitorPanel/Map'
import FooterPanel from './FooterPanel'
import './assets/styles.css'
import { Image } from 'antd';
import LaddaButton, { S, SLIDE_LEFT } from "react-ladda";
import { get } from 'lodash'
import moment from 'moment'
import { downloadVideo } from './downLoadFile'

const Button = (arg) => {
  return <LaddaButton
    loading={arg.loading}
    type="submit"
    data-size={S}
    data-style={SLIDE_LEFT}
    data-spinner-size={30}
    data-spinner-lines={12}
    onClick={async () => {
      arg.startLoad()
      await downloadVideo(arg.evidenceDownload.device_id, arg.evidenceDownload.evidence_id)
      arg.endLoad()
    }}
    style={{
      lineHeight: 0,
      backgroundColor: "#1AB394",
      width: '100%',
      height: 40,
      color: "white",
      fontSize: 15,
      borderRadius: 4,
      margin: 2,
    }}
  >
    <i className={`fa fa-${arg.name === "Download" ? 'download' : 'share'}`} style={{ paddingRight: 5 }}></i>
    {t(arg.name)}
  </LaddaButton >
}

const EvidenceMonitor = (props) => {
  let { dataLogin, mapDetail, evidenceName, evidenceDownload } = props
  const [evidence_info, seteEvidence_info] = useState({})
  const [loading, setLoading] = useState(false)

  const [vehicleInfo, setVehicleInfo] = useState({
    id: 'vehicleInfo',
    name: 'ข้อมูลรถ',
    fields: [
      {
        // name: 'อัพเดทล่าสุด',
        name: 'เวลาที่เกิดขึ้น',
        value: ""
      },
      {
        name: 'รุ่น',
        value: ""
      },
      {
        name: 'สถานะ',
        value: ""
      },
      {
        name: 'ความเร็ว',
        value: ""
      },
      {
        name: 'ระยะทางสะสม',
        value: ""
      },
      {
        name: 'รอบเครื่องยนต์',
        value: ""
      },
      {
        name: 'เครื่องทำงานสะสม',
        value: ""
      },
      {
        name: 'น้ำมัน',
        value: ""
      },
      {
        name: 'อัตราสิ้นเปลือง',
        value: ""
      }
    ]
  })

  const [driverInfo, setDriverInfo] = useState({
    id: 'driverInfo',
    name: 'ข้อมูลคนขับ',
    fields: [
      {
        name: 'คนขับรถ',
        value: ""
      },
      {
        name: 'ติดต่อ',
        value: ""
      },
      {
        name: 'รหัสขับขี่',
        value: ""
      }
    ]
  })

  const [statusInfo, setStatusInfo] = useState({
    id: 'statusInfo',
    name: 'สถานะอุปกรณ์',
    fields: [
      {
        name: 'สถานะ',
        value: ""
      },
      {
        name: 'สัญญาณจีพีเอส',
        value: ""
      },
      {
        name: 'สัญญาณจีเอสเอ็ม',
        value: ""
      },
      {
        name: 'ตำแหน่ง',
        value: ""
      }
    ]
  })

  useEffect(() => {
    let evidence_info = get(mapDetail, 'evidence_detail_driver', {})
    console.log(">> evidence_info : ", evidence_info)

    let _vehicleInfo = vehicleInfo
    let updateDate = get(evidence_info, 'starttime', '')
    _vehicleInfo.fields[0].value = updateDate !== "" ? moment(updateDate, ('YYYY-MM-DD HH:mm:ss')).format('DD/MM/YYYY HH:mm:ss') : ""
    // setVehicleInfo(_vehicleInfo)

    let _driverInfo = driverInfo
    _driverInfo.fields[0].value = get(evidence_info, 'drivername', '')
    _driverInfo.fields[1].value = get(evidence_info, 'driverphone', '')
    _driverInfo.fields[2].value = get(evidence_info, 'carlicense', '')
    setDriverInfo(_driverInfo)

    let _statusInfo = statusInfo
    _statusInfo.fields[3].value = `${evidence_info.lat}, ${evidence_info.lng} ${evidence_info.location}`
    setStatusInfo(_statusInfo)

  }, [])

  const infoText = (list, icon = "", isImage = false, url = "", size = 60) => {
    return <div className="form-group field field-string" style={{ padding: '10px 10px 15px 15px', marginBottom: 0, fontSize: 12, borderBottom: icon === "pStatus" ? '' : '1px solid #e8e8e8' }}>
      {/* {
        (icon === "vInfo" && isImage) && <>
          <Image
            width={size}
            src={url}
            preview={false}
          />
          <label>{list.name}</label><br />
        </>
      } */}

      {
        (icon === "pInfo" && isImage) && <>
          <label>{list.name}</label><br />
          <Image
            width={size}
            src={url}
            preview={false}
          /><br />
        </>
      }

      {
        icon === "" || icon === "pStatus" && <><label>{list.name}</label><br /> </>
      }

      {
        list.fields.map((field) => {
          return <><span>{t(field.name)} : <b>{field.value}</b></span><br /></>
        })
      }
    </div>
  }

  return (
    <Suspense fallback={null}>
      <div className="row">
        <div className="col-md-12">
          <div className="ibox">
            <div
              className="ibox-title"
              style={{ padding: "15px 10px 10px 15px" }}
            >
              <div className="row">
                <div className="col-lg-4">
                  <h3 style={{ marginTop: 5, fontSize: 18 }}>
                    {t("หลักฐานการเล่น")} {evidenceName !== "" && `(${evidenceName})`}
                  </h3>
                </div>
                <div className="col-lg-8" style={{ textAlign: "right" }}>
                  <div className="col-md-12 text-right"   >
                    <a
                      className="btn btn-white btn-md"
                      style={{ backgroundColor: 'grey' }}
                      onClick={() => props.history.push("/MDVR-Evidence")} >
                      {/* <i className="fa fa-cogs" style={{ fontSize: 16, color: "white", marginRight: 5 }}></i> */}
                      <span style={{ color: "white" }}>{t('Back')}</span></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="ibox-content" style={{ height: "calc(100vh - 130px)", padding: 0 }}>
              <div className="evidence-layout">
                <div className="box-left">
                  <div className='box-left-info'>
                    <style type="text/css">
                      {` ::-webkit-scrollbar {
                              width: 5px;
                            }
                          
                            ::-webkit-scrollbar-track {
                              background: #f1f1f1;
                            }
                          
                            ::-webkit-scrollbar-thumb {
                              background: rgb(213 213 213);
                            }
                          
                            ::-webkit-scrollbar-thumb:hover {
                              background: rgb(153 153 153);
                            }`}
                    </style>
                    {infoText(vehicleInfo, "", true, require('./assets/vehicle.svg'), 20)}
                    {infoText(driverInfo, "pInfo", true, require('./assets/person-icon.png'))}
                    {infoText(statusInfo, "pStatus")}

                    {/* <div
                      className="form-group field field-string"
                      style={{ marginBottom: 0, fontSize: 12, display: 'flex', flexDirection: 'row' }}>
                      <Button
                        name="Download"
                        loading={loading}
                        startLoad={() => setLoading(true)}
                        endLoad={() => setLoading(false)}
                        evidenceDownload={evidenceDownload}
                      />
                    </div> */}
                  </div>
                </div>
                <div className="box-right">
                  <div className='box-right-info'>
                    <div className='box-right-info-top'>
                      <div className="box-right-info-top-left-side">
                        <VideoPanel />
                      </div>

                      <div className="box-right-info-top-right-side">
                        <Map />
                      </div>
                    </div>

                    <div className='box-right-info-bottom'>
                      <FooterPanel />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense >
  )
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  mapDetail: state.evidence.mapDetail,
  evidenceName: state.evidence.evidenceName,
  evidenceDownload: state.evidence.evidenceDownload
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(EvidenceMonitor)
import React, { Component, Suspense, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import EvidenceActions from '../../Redux/EvidenceRedux'
import Table from '../../Components/DataGridView/Table.js'
import { calculateToDuration } from '../../Functions/DateMoment'
import { get } from 'lodash'
import { Image } from 'antd';
import Loading from './Loading'
import './assets/styles.css'
import { downloadVideo, download } from './downLoadFile'
import { ENDPOINT_BASE } from '../../Config/app-config';

const EvidenceMDVR = (props) => {
  let { dataLogin, evidenceData, header, language } = props
  const [visiblePreview, setVisiblePreview] = useState({
    visible: false,
    url: ''
  });

  const getEvidenceData = async (e) => {
    props.setValue("isLoadingEvidence", true)
    props.setValue("videoPath", get(e.video, 'path', ""))
    console.log(">> getEvidenceData : ", e)

    try {
      var response = await fetch(ENDPOINT_BASE + "gateway/mdvr/evidence/detail", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'AccessToken': header.idToken,
          'Accept-Language': language
        },
        body: JSON.stringify({
          "device_id": ["00BD0004F8"],
          "evidence_id": "1025"
          // "device_id": [ e.device_id],
          // "evidence_id":  e.evidence_id
        })
      });

      var data = await response.json();
      if (data.message === "ok") {
        console.log(">> getEvidenceData : ", data.result)
        props.setValue('mapDetail', data.result)
        props.setValue('evidenceName', e.evidence_name)
        props.setValue('evidenceDownload', {
          device_id: e.device_id,
          evidence_id: e.evidence_id
        })
        props.onLinkTo()
      }
      else {
      }
      props.setValue("isLoadingEvidence", false)

    } catch {
      props.setValue("isLoadingEvidence", false)
    }
  }

  return (
    <Suspense fallback={null}>
      <Loading />
      <div style={{ visibility: 'hidden' }}>
        <Image
          width={200}
          // src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
          preview={{
            visible: visiblePreview.visible,
            src: visiblePreview.url,
            onVisibleChange: value => {
              setVisiblePreview({ ...visiblePreview, visible: value })
            },
          }}
        />
      </div>
      <Table
        mode={"offline"}
        dataSource={evidenceData}
        table_id={4}
        cookiesOptions={{
          enable: false,
          name: "EvidenceMDVR"
        }}
        columnCount={"evidence_name"}
        user_id={dataLogin.userId}
        editing={{ enabled: true }}
        showSetting={false}
        // allowDeleting={{
        //   column_name: "canDelete",
        //   condition: true
        // }}
        allowUpdating={{
          column_name: "evidence_id",
          condition: "10252"
        }}
        customButton={[
          {
            hint: "Video",
            // icon: "photo",
            name: 'edit',
            icon: 'fa fa-video',
            visible: true,
            onClick: (e) => {
              getEvidenceData(e.row.data)
            }
          },
          {
            hint: "Image",
            icon: "image",
            visible: true,
            onClick: (e) => {
              console.log("> Image : ", e)
              let url = get(e.row.data, 'picture.path', '')

              if (url === "") {
                alert("ไม่พบข้อมูล")
                return
              }

              setVisiblePreview({
                visible: true,
                // url: get(e.row.data, 'picture.path', 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png')
                url: get(e.row.data, 'picture.path', '')
              })
            }
          },
          {
            hint: "Download",
            icon: "download",
            visible: false,
            onClick: (e) => {

              // const url = window.URL.createObjectURL(new Blob([e.row.data.video.path]));
              // const url = e.row.data.video.path;
              // const link = document.createElement('a');
              // link.href = url;
              // link.setAttribute('download', 'evidence.mp4');
              // document.body.appendChild(link);
              // link.click();

              var urlCreator = window.URL || window.webkitURL;
              var imageUrl = urlCreator.createObjectURL(new Blob([e.row.data.video.path]))
              var tag = document.createElement('a');
              tag.href = imageUrl;
              tag.download = 'evidence.mp4';
              document.body.appendChild(tag);
              tag.click();
              document.body.removeChild(tag);


              // downloadVideo(e.row.data.device_id, e.row.data.evidence_id, header.idToken)
              if (get(e.row.data.video, 'path')) {
                // download(e.row.data.video.path)


              }
            }
          }
        ]}
        column={[
          {
            column_name: 'evidence_name',
            column_caption: "ชื่อหลักฐาน"
          },
          {
            column_name: 'vehicle',
            column_caption: "ทะเบียน"
          },
          {
            column_name: 'event_time',
            column_caption: "เวลาที่เกิดขึ้น"
          },
          {
            column_name: 'report_time',
            column_caption: "รายงานเวลา"
          },
          {
            column_name: 'location',
            column_caption: "สถานที่ตั้งหลักฐาน"
          },
          {
            column_name: 'evidence_size',
            column_caption: "ขนาดหลักฐาน",
            column_render: (e) => `${e.value} (M)`
          },
          {
            column_name: 'evidence_time',
            column_caption: "ระยะเวลาหลักฐาน",
            column_render: (e) => calculateToDuration(Number(e.value), '')
          }
          // , {
          //   column_name: 'video',
          //   column_caption: "การกระทำ",
          //   column_render: (e) => {
          //     return <a onClick={() => {
          //       props.setValue("videoPath", e.value.path)
          //       props.onLinkTo()
          //     }}>วีดีโอ</a>
          //   }
          // },
          // {
          //   column_name: 'XXXX',
          //   column_caption: "ส่งออก",
          //   column_render: (e) => <button type="button">ส่งออก</button>
          // }
        ]}
      />
    </Suspense>
  )

}


const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  language: state.versatile.language,
  evidenceData: state.evidence.evidenceData,
});

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(EvidenceActions.setValue(name, value))

});

export default connect(mapStateToProps, mapDispatchToProps)(EvidenceMDVR)
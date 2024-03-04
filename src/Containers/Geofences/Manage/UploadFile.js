import React from 'react'
import { connect } from 'react-redux'
import GeofencesActions from "../../../Redux/GeofencesRedux"
import { useTranslation } from 'react-i18next'
import { Upload } from 'antd';

const { Dragger } = Upload;
const UploadFile = (props) => {
  let { setStatesGeofencesRedux, setFormData } = props // ACTION
  const { t } = useTranslation()

  const propUpload = {
    beforeUpload: async file => {
      let fileUplaod = { file, message: "" }
      let isLt2M = file.size / 1024 / 1024 < 2;
      if (!['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'].includes(file.type)) {
        fileUplaod.message = 'You can only upload JPG/PNG/JPEG/SVG file!'
      }
      else if (!isLt2M) {
        fileUplaod.message = 'Image must smaller than 2MB!'
      }
      setStatesGeofencesRedux({ "fileUplaod": fileUplaod })
      setFormData("isNewAttach", true)
    },
    onChange: info => handleUpload(info)
  }

  //#region  Convert to Base64
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  //#endregion

  const handleUpload = (info) => {
    //#region  GET BASE64
    getBase64(info.file.originFileObj, imageUrl => {
      setStatesGeofencesRedux({ "previewFileUpload": imageUrl })
    })
    //#endregion
  };

  return (
    <Dragger {...propUpload}>
      <div className="align-middle" style={{ height: 150, marginTop: 30 }}>
        <p className="ant-upload-drag-icon">
          <i className="fa fa-upload" style={{ fontSize: 30 }} />
        </p>
        <p className="ant-upload-text">{t('ลากไฟล์มาวางหรือคลิกที่นี้เพื่ออัพโหลด')}</p>
        <p className="ant-upload-hint">
          {t('ประเภทไฟล์ (JPG, JPEG, PNG & SVG) (ไม่เกิน 2MB)')}
        </p>
      </div>

    </Dragger>
  )
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  dataForm: state.geofences.dataForm,
});

const mapDispatchToProps = (dispatch) => ({
  setStatesGeofencesRedux: (obj) => dispatch(GeofencesActions.setStatesGeofencesRedux(obj)),
  setFormData: (filedName, value, isSubObject) => dispatch(GeofencesActions.setFormData(filedName, value, isSubObject)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadFile)
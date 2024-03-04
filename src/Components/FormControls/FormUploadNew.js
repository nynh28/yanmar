import React, { Component } from 'react'
import { connect } from 'react-redux'
import VersatileActions from '../../Redux/VersatileRedux'

import { Upload, message, Button } from 'antd';
import { UploadOutlined, LoadingOutlined, PlusOutlined, PaperClipOutlined } from '@ant-design/icons';
import reqwest from 'reqwest';
import './Styles/upload.css'
import { t } from '../Translation'
import { isEmpty } from 'react-redux-firebase'
import { get } from 'lodash'
import { ENDPOINT_BASE_URL } from '../../Config/app-config';
import Alert from '../Alert'

//#region  Convert to Base64
// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// }
//#endregion


let fileUploadTemp = []

class FormUploadNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileList: [
        // {
        //   uid: "1",
        //   name: "avataaars-e28093-koolinus-1-12mar2019.png",
        //   status: "done",
        //   url: "https://s3-ap-southeast-1.amazonaws.com/dev.hino.ecm.bucket/Temp/0615_erngtadzoxpdwls"
        // },
        // {
        //   uid: "2",
        //   name: "avataaars-e28093-koolinus-1-12mar2019.png",
        //   status: "done",
        //   url: "https://s3-ap-southeast-1.amazonaws.com/dev.hino.ecm.bucket/Temp/0615_erngtadzoxpdwls"
        // }
      ],
      alertSetting: {
        show: false,
        type: 7,
        content: "",
        validateCode: false
      }
    }
    this.beforeUpload = this.beforeUpload.bind(this);
    this.setAlertSetting = this.setAlertSetting.bind(this);
  }

  handleUpload = (file) => {
    let { acceptFileType, acceptMaxSizeMB, errorKey } = this.props

    //#region  Validation File Upload
    let isValid = true
    let _acceptMaxSizeMB = acceptMaxSizeMB || 5
    let isValidSize = file.size / 1024 / 1024 < _acceptMaxSizeMB;

    // console.log("file.type : ", file.type)

    if (acceptFileType && !acceptFileType.includes(file.type)) {
      let fileAccept = ""
      for (let index in acceptFileType) {
        if (fileAccept == "") fileAccept = acceptFileType[index].split('/')[1].toUpperCase()
        else fileAccept += "/" + acceptFileType[index].split('/')[1].toUpperCase()
      }

      // this.setAlertSetting(true, 2, 'You can only upload ' + fileAccept + ' file!')
      isValid = false
    }
    else if (!isValidSize) {
      // this.setAlertSetting(true, 2, 'Image must smaller than ' + _acceptMaxSizeMB + 'MB!')
      isValid = false
    }

    //#endregion

    if (isValid) {
      this.setAlertSetting(true, 7)
      fileUploadTemp = [file]
      this.reqwest_service()
    } else {
      this.setAlertSetting(true, 2, errorKey)
    }
  };

  reqwest_service() {
    const fileList = fileUploadTemp
    const formData = new FormData();

    fileList.forEach(file => {
      formData.append('fileUpload', file);
    });
    reqwest({
      url: this.props.endPoint ? ENDPOINT_BASE_URL + this.props.endPoint : ENDPOINT_BASE_URL + 'ecm/files',
      timeout: 60000,
      method: 'POST',
      type: 'file',
      accept: 'text/plain',
      headers: {
        'Authorization': this.props.dataLogin.userTokenInfo.accessToken,
        'X-API-Key': this.props.dataLogin.redisKey
      },
      contentType: 'multipart/form-data',
      crossOrigin: true,
      processData: false,
      data: formData,
      success: (res) => {
        let response = JSON.parse(res.response)
        response["status"] = true
        this.props.response(response)

        this.setState({
          fileList: [{
            uid: "001",
            name: response.attachInfo.fileName,
            status: "done",
            url: response.attachInfo.fileUrl,
          }]
        })
        this.setAlertSetting(false, 7)
      },
      error: (res) => {
        // console.log("fileList : ", this.state.fileList)
        // console.log("length : ", this.state.fileList.length)
        if (this.state.fileList.length > 0) {
          // if (fileList.length > 0) {
          // this.reqwest_service()
        } else {
          let response = JSON.parse(res.response)
          response["status"] = false
          this.props.response(response)
        }

        this.setAlertSetting(false, 7)
      },
    });
  }

  beforeUpload(file) {
    let { acceptFileType, acceptMaxSizeMB, errorKey } = this.props
    //#region  Validation File Upload
    let isValid = true
    let _acceptMaxSizeMB = acceptMaxSizeMB || 5
    let isValidSize = file.size / 1024 / 1024 < _acceptMaxSizeMB;

    if (acceptFileType && !acceptFileType.includes(file.type)) {
      let fileAccept = ""
      for (let index in acceptFileType) {
        if (fileAccept == "") fileAccept = acceptFileType[index].split('/')[1].toUpperCase()
        else fileAccept += "/" + acceptFileType[index].split('/')[1].toUpperCase()
      }

      // this.setAlertSetting(true, 2, keyUpload || 'You can only upload ' + fileAccept + ' file!')
      isValid = false
    }
    else if (!isValidSize) {
      // this.setAlertSetting(true, 2, keyUpload || 'Image must smaller than ' + _acceptMaxSizeMB + 'MB!')
      isValid = false
    }

    //#endregion

    if (isValid) {
      fileUploadTemp = [file]
      this.reqwest_service()
    } else {
      this.setAlertSetting(true, 2, errorKey)
    }
  }


  setAlertSetting(isShow, type = 7, content = "") {
    let { alertSetting } = this.state
    alertSetting.show = isShow
    alertSetting.type = type
    alertSetting.content = content
    this.setState({ alertSetting })
  }

  render() {
    let { fileList, imageUrl, alertSetting } = this.state;
    let { schema, fieldForm, label, flex, attachInfo, action, showadd, showRemoveIcon } = this.props

    // console.log("attachInfo", attachInfo)
    if (fileList.length == 0) {
      if (get(attachInfo, 'fileUrl', false)) {
        this.setState({
          fileList: [{
            uid: "001",
            name: attachInfo.fileName,
            status: "done",
            url: attachInfo.fileUrl,
          }]
        })
      }
    }
    else if (!get(attachInfo, 'fileUrl', false)) {
      this.setState(state => {
        return { fileList: [] }
      })
    }

    const props = {
      // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      // onChange: this.handleUpload,
      onRemove: file => {
        this.props.removeFile(file)
        this.setState(state => {
          return { fileList: [] }
        })
      },
      beforeUpload: file => {
        this.handleUpload(file)
        return false;
      },
      multiple: false,
      showUploadList: {
        showRemoveIcon: showRemoveIcon !== undefined ? showRemoveIcon : true
      }
    };

    return (
      <div className="form-group field field-string" style={{
        padding: '0 10px', flex: flex || 1
      }
      }>
        <label className="control-label" style={{ fontWeight: 500 }}>
          {t(label)}
          {
            schema.required && schema.required.includes(fieldForm) && [
              <span className="text-danger">*</span>
            ]
          } :
        </label>
        {/* {console.log("action", action)} */}
        <div>
          {(action !== 'View' || action !== 'Show') && !showadd ? <Upload
            {...props}
            fileList={this.state.fileList}
          >
            <Button>
              <UploadOutlined /> {t("upload")}
            </Button>
          </Upload> :
            attachInfo && !isEmpty(attachInfo) ? (<div>
              <PaperClipOutlined style={{ color: "#ADADAD" }} />
              <a href={attachInfo.fileUrl}
                target="_blank"
                style={{ marginLeft: 5 }}>
                {attachInfo.fileName}
              </a>
            </div>) :
              <span style={{ marginLeft: 10 }} >-</span>

          }
        </div>

        <Alert
          setting={alertSetting}
          onConfirm={() => {
            alertSetting.show = false
            this.setState({ alertSetting })
          }}
          onCancel={() => {
            alertSetting.show = false
            this.setState({ alertSetting })
          }}
        />
      </div >
    );
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  imageUrl: state.versatile.imageUrl
});
const mapDispatchToProps = (dispatch) => ({
  getImageUrl: (attachCode) => dispatch(VersatileActions.getImageUrl(attachCode))
});

export default connect(mapStateToProps, mapDispatchToProps)(FormUploadNew)


//#region Property
{/*

  # Props
    mode :  string ==> local|api
    schema :  {{ "required": ["fieldForm"] }}  **for Form Schama
    fieldForm : string  **for Form Schama
    label : string
    flex : number
    value : string  ==> "attach code"
    listType : : file|picture|picture-card
    multiple : true|false

  # Implement

   <FormUpload
        schema={{ "required": [""] }}
        fieldForm="avartar"
        listType="picture-card"
        label={schema.label.avartar}
        attachCode={attachCode}
        attachInfo={attachInfo}
        response={(res) => {
          if (res.status) {
            this.setState({
              ["attachCode"]: res.attachInfo.attachCode
            }, () => this.props.onChange(this.state))
          }
        }}
    />

  #Reference
    https://ant.design/components/upload/

  */}
//#endregion

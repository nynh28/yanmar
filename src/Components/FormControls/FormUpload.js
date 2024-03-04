import React, { Component } from 'react'
import { connect } from 'react-redux'
import VersatileActions from '../../Redux/VersatileRedux'

import { Upload, message, Button } from 'antd';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import reqwest from 'reqwest';
import './Styles/upload.css'
import { t } from '../Translation'
import { isEmpty } from 'react-redux-firebase'
import { get } from 'lodash'
import { ENDPOINT_BASE_URL } from '../../Config/app-config';
import Alert from '../../Components/Alert'
import Images from '../../Themes/Images'

//#region  Convert to Base64
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
//#endregion

const PictureUpload = (arg) => {
  return (
    arg.fileListInitial.length > 0 ?
      <Upload
        {...arg.props}
      >
        <Button>
          <UploadOutlined /> {t("upload")}
        </Button>
      </Upload> :
      <Upload
        {...arg.props}
      >
        <Button>
          <UploadOutlined /> {t("upload")}
        </Button>
      </Upload>
  )
}

let fileUploadTemp = []

class UploadFile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileList: [
        // {
        //   uid: "1",
        //   name: "avataaars-e28093-koolinus-1-12mar2019.png",
        //   status: "done",
        //   url: "https://s3-ap-southeast-1.amazonaws.com/dev.hino.ecm.bucket/Temp/0518_kwxbvvtyamntbpb"
        // }
      ],
      alertSetting: {
        show: false,
        type: 7
      },
      test: ""
    }

    this.beforeUpload = this.beforeUpload.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    // if (this.props.fieldForm === "personalCard_attachCode") {
    //   console.log("componentWillReceiveProps : ", nextProps)
    // }


  }

  componentWillReceiveProps(nextProps) {
    // if (this.props.fieldForm === "personalCard_attachCode") {
    //   console.log("componentWillReceiveProps : ", nextProps)
    // }

  }



  handleUpload = (info) => {
    if (info.fileList.length === 0) return
    //#region  GET BASE64
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        this.setState({
          imageUrl
        })
      }
      )
    }
    //#endregion

    this.reqwest_service()
  };

  reqwest_service() {
    // const { fileList } = this.state;
    const fileList = fileUploadTemp

    // console.log("fileList : ", fileList)

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
        'Authorization': this.props.dataLogin.userTokenInfo.idToken,
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
        // this.setState({ fileList: [] })
        // let _fileList = JSON.parse(JSON.stringify(this.state.fileList))

        // _fileList = {
        //   uid: '3',
        //   name: 'zzz.png',
        //   status: 'done',
        //   url: 'https://s3-ap-southeast-1.amazonaws.com/dev.hino.ecm.bucket/Temp/0518_zgtpuwiovylcfoy'
        // }

        // this.setState({
        //   fileList: [_fileList]
        // })


        this.setAlertSetting(false)
      },
      error: (res) => {
        // console.log("fileList : ", this.state.fileList)
        // console.log("length : ", this.state.fileList.length)
        if (this.state.fileList.length > 0) {
          // if (fileList.length > 0) {
          // this.reqwest_service()
        }
        else {
          let response = JSON.parse(res.response)
          response["status"] = false
          this.props.response(response)
        }
      },
    });
  }

  beforeUpload(file) {

    this.setAlertSetting(true)
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    let isLt2M

    let isValid = true
    if (this.props.listType === "picture-card" || this.props.listType === "picture") {
      if (!isJpgOrPng) {
        isValid = false
        message.error('You can only upload JPG/PNG file!');
      }
      isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        isValid = false
        message.error('Image must smaller than 2MB!');
      }
    }

    if (isValid) {
      this.setState(state => ({
        fileList: [...state.fileList, file],
        imageUrl: ""
      }));

      fileUploadTemp = [this.state.fileList, file]

      return isJpgOrPng && isLt2M;
    }
  }

  setImage(imageObject) {
    let { listType, attachInfo } = this.props
    switch (listType) {
      case "picture-card":

        break;
      case "picture":
        // this.setState({ fileList: [file] })
        this.setState({
          fileList: [
            {
              uid: "1",
              name: attachInfo.fileName,
              status: "done",
              url: attachInfo.imageUrl,
              thumbUrl: attachInfo.imageUrl
            }
          ]
        })
        break;
      case "file":

        break;
    }

    // state = {
    //   fileList: [
    //    {
    //        uid: '-1',
    //        name: 'thodsapon.png',
    //        status: 'done',
    //        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    //    },
    //    {
    //        uid: '-2',
    //        name: 'yyy.png',
    //        status: 'error',
    //    },
    //   ],
    // };

  }

  setAlertSetting(isShow) {
    let { alertSetting } = this.state
    alertSetting.show = isShow
    this.setState({ alertSetting })
  }

  render() {
    let { fileList, imageUrl, alertSetting } = this.state;
    let { schema, fieldForm, label, flex, attachCode, listType, multiple, attachInfo, disabled, className, action, imgDefault, showRemoveIcon } = this.props



    let fileListInitial = []
    let imageUrlInitial = ""
    if (listType === "picture-card") {
      let fileUrl = get(attachInfo, 'fileUrl', '')
      if (fileUrl !== "" && imageUrl === undefined) {
        imageUrlInitial = fileUrl
      }
      else {
        imageUrlInitial = imageUrl
      }
    }
    // else if (listType === "picture" || listType === "file") {
    //   if (this.props.fieldForm === "personalCard_attachCode") {
    //     console.log("attachInfo : ", attachInfo)
    //   }

    //   if (get(attachInfo, 'fileUrl', false) !== false) {
    //     fileListInitial.push(
    //       {
    //         uid: "1",
    //         name: get(attachInfo, 'fileName', ''),
    //         status: "done",
    //         url: get(attachInfo, 'fileUrl', ''),
    //         thumbUrl: "https://s3.amazonaws.com/hino.ecm.file.bucket/Temp/0414_ticdvlsmynnsyqg"
    //       }
    //     )

    //   }
    // }
    // if (this.props.fieldForm === "personalCard_attachCode") {
    // console.log("RENDER fileList : ", fileList)
    // console.log("RENDER fileListInitial : ", fileListInitial)
    // }



    let props = {
      className: multiple ? 'upload-list-inline' : "",
      listType: listType || 'picture',
      defaultFileList: fileListInitial.length > 0 ? [...fileListInitial] : [...fileList],
      multiple: multiple || false,
      showUploadList: {
        showRemoveIcon: showRemoveIcon !== undefined ? showRemoveIcon : true
      },
      onChange: this.handleUpload,
      onRemove: file => {
        // this.setState(state => {
        //   const index = state.fileList.indexOf(file);
        //   const newFileList = state.fileList.slice();
        //   newFileList.splice(index, 1);
        //   return {
        //     fileList: newFileList,
        //   };
        // });

        this.setState(state => {
          return { fileList: [] }
        })
      },
      beforeUpload: file => {
        this.setAlertSetting(true)
        // console.log("BEFORE UPLOAD : ", file)
        fileUploadTemp = [file]
        // this.setState({ fileList: [file] })
        return false;
      }
    };

    // console.log('this.props.attachInfo', attachInfo)

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

        <div>
          {
            listType === "picture-card" ?
              (action === "View" || imgDefault) ?
                <img src={get(this.props.attachInfo, 'fileUrl') || Images.avatar} style={{ width: 100 }}></img>
                :
                <Upload
                  disabled={disabled || false}
                  name="avatar"
                  listType="picture-card"
                  className={className || "avatar-uploader"}
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleUpload}
                >
                  {this.props.attachInfo.fileUrl ? <img src={this.props.attachInfo.fileUrl} alt="avatar" style={{ width: '100%' }} /> : t("upload")}
                </Upload>
              :
              listType === "picture" && fileListInitial.length > 0 ?
                <PictureUpload props={props} fileListInitial={fileListInitial} />
                :
                listType === "audio" ?
                  <Upload
                    {...props}
                  >
                    <Button>
                      <UploadOutlined /> {t("upload")}
                    </Button><br />
                    <audio controls>
                      <source src="https://s3.amazonaws.com/hino.ecm.file.bucket/Public/AlertSetting/file_example_WAV_1MG.wav" type="audio/ogg" />
                    </audio>
                  </Upload> :
                  listType === "file" ?
                    action === 'View' ? (
                      !isEmpty(this.props.attachInfo) ? <a href={this.props.attachInfo.fileUrl} target="_blank" style={{ marginLeft: 10 }}>{this.props.attachInfo.fileName}</a> : '-'
                    )
                      :
                      action === 'Edit' && !isEmpty(this.props.attachInfo) ? [
                        <Button type="button" onClick={(e) => this.props.removeFile()}>{t("delete")}</Button>,
                        <a href={this.props.attachInfo.fileUrl} target="_blank" style={{ marginLeft: 10 }}>{this.props.attachInfo.fileName}</a>
                      ]
                        :
                        <Upload Upload
                          {...props}
                        >
                          <Button>
                            <UploadOutlined /> {t("upload")}
                          </Button>
                        </Upload>
                    :
                    <Upload
                      {...props}
                    >
                      <Button>
                        <UploadOutlined /> {t("upload")}
                      </Button>
                    </Upload>
          }
        </div>

        <Alert
          setting={alertSetting}
          onConfirm={() => {
            this.setState({ alertSetting: false })
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadFile)


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

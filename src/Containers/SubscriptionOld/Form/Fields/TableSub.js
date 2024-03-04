import React, { Component } from 'react'
import { connect } from 'react-redux'
import SubscriptionActions from '../../../../Redux/SubscriptionRedux'
import Table from '../../../../Components/DataGridView/Table.js'
import { t } from '../../../../Components/Translation';
import { Row, Col, Button, Container } from 'reactstrap'
import FormInput from '../../../../Components/FormControls/FormInput'
import FormLabel from '../../../../Components/FormControls/FormLabel'
import FormSelectSearch from '../../../../Components/FormControls/FormSelectSearch'
import FormSelectGroup from '../../../../Components/FormControls/FormSelectGroup'
import FormDatepicker from '../../../../Components/FormControls/FormDatepicker'
import FormRadio from '../../../../Components/FormControls/FormRadio'
import FormTextArea from '../../../../Components/FormControls/FormTextArea'
import FormUpload from '../../../../Components/FormControls/FormUpload'
import Tabbed from '../../../../Components/Tabbed'
import Alert from '../../../../Components/Alert'
import { Modal } from 'antd';
import { get } from 'lodash'
class TableSub extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...props.data,
      infoSetGuid: 0,
      id: '',
      subscriberNo: "",
      customerFullName: "",
      vehicleID: "",
      vinNo: "",
      vehicleBrand: "",
      vehicleModel: "",
      chassisNo: "",
      licensePlate: "",
      licensePlace: "",
      midNo: "",
      imei: "",
      simNo: "",
      simVendor: "",
      subscriptionStatus: "",
      requireCertificate: "",
      itemStatusID: "",
      itemStatus: "",
      isApprove: false,
      isSendDltComplete: "",
      DocumentTypeNav: "",
      guid: "",
      itemGUID: "",
      attachCode: "",
      attachInfo: {},
      avartar: "",
      showFormPopupim: "",
      alertSetting: {
        show: false,
        type: 3,
        content: "",
        ErrorSubcode: 0
      },

    };
    this.openModal = this.openModal.bind(this)
    this.openModalAddIm = this.openModalAddIm.bind(this)
    this.onRowInserting = this.onRowInserting.bind(this)
    this.onRowInsertingIm = this.onRowInsertingIm.bind(this)
  }





  componentDidUpdate(prevProps) {

    console.log("packgeNav", this.state.packgeNav)

    let { infoSubItemGuid, infoGuid, addStatus, infoaddItemAttachment, infoDropdownDocType } = this.props
    let { vinNo, licensePlate, vehicleBrand, itemStatus, chassisNo, isApprove, attachInfo, infoSetGuid } = this.state

    // prevProps.infoDropdownDocType !== infoDropdownDocType && this.setState({ DocumentTypeList: infoDropdownDocType })
    if (prevProps.addStatus !== addStatus) {

      this.setState({ infoSetGuid: get(addStatus, "", "") })

    }
    // console.log("infoSetGuid", infoSetGuid)
    if (prevProps.infoGuid !== infoGuid) {

      console.log("infoGuid : ", get(infoGuid, "guid", ""))

    }
    // if (prevProps.attachInfo !== attachInfo) {

    //   console.log("attachInfo changing", attachInfo)

    // }

    if (prevProps.infoaddItemAttachment !== infoaddItemAttachment) {
      this.setAlertSetting(false, 6)
    }



    if (prevProps.infoSubItemGuid !== infoSubItemGuid) {

      // console.log("infoSubItemGuid", infoSubItemGuid)

      this.setState({ vinNo: get(infoSubItemGuid, "vinNo", "") })
      this.setState({ licensePlate: get(infoSubItemGuid, "licensePlate", "") })
      this.setState({ vehicleBrand: get(infoSubItemGuid, "vehicleBrand", "") })
      this.setState({ itemStatus: get(infoSubItemGuid, "itemStatus", "") })
      this.setState({ chassisNo: get(infoSubItemGuid, "chassisNo", "") })
      this.setState({ isApprove: get(infoSubItemGuid, "isApprove", "false") })

    }

  }

  openModal() {
    this.setState(state => ({ showFormPopup: !state.showFormPopup }))


  }
  openModalAddIm() {
    this.setState(state => ({ showFormPopupim: !state.showFormPopupim }))


  }



  editCallback(e) {

    let id = get(e, 'data.id')
    let guid = get(e, 'data.guid')
    let itemGUID = get(e, 'data.itemGUID')
    // this.props.onClick(e)
    console.log("-----------------------------------")
    console.log("id: " + id)
    console.log("guid: " + guid)
    console.log("itemGUID:" + itemGUID)


    this.setState({ guid: guid })
    this.setState({ itemGUID: itemGUID })
    this.props.getSubItemGuid(guid, itemGUID)
    this.openModal(e)
  }
  setHeaderSection(title, showLine = true) {
    return <div>
      {showLine && <div className="hr-line-dashed" />}
      <h3>{title}</h3>
      <div style={{ minHeight: '2rem' }}></div>
    </div>
  }

  editCallbackIm(e) {

    this.openModalAddIm()

  }

  setAlertSetting(isShow, type, content = "", ErrorSubcode) {
    let { alertSetting } = this.state
    alertSetting.show = isShow
    alertSetting.type = type
    alertSetting.content = content
    alertSetting.ErrorSubcode = ErrorSubcode
    this.setState({ alertSetting })
  }

  onRowInserting() {


    // let { attachCode, guid, itemGUID } = this.state



    // let data = {
    //   "attachId": 0,
    //   "subscriptionId": 0,
    //   "subscriberId": 0,
    //   "attachType": 2,
    //   "attachRefGUID": attachCode,
    //   "guid": guid,
    //   "itemGUID": itemGUID,
    //   "attachGUID": ""
    // }

    // console.log("ADD MODEL", data)
    // this.props.addItemAttachment(data)

    //post /Subscription/ItemAttachment
  }
  onRowInsertingIm(e) {


    console.log("event ", e)

    let { attachCode, guid, itemGUID } = this.state


    //  เพิ่มรูปภาพ
    let data = {
      "attachId": 0,
      "subscriptionId": 0,
      "subscriberId": 0,
      "attachType": 2,
      "attachRefGUID": e,
      "guid": guid,
      "itemGUID": itemGUID,
      "attachGUID": ""
    }

    console.log("data  image", data)
    this.props.addItemAttachment(data)


    //post /Subscription/ItemAttachment
  }


  render() {
    let { infoSetGuid, alertSetting, showFormPopup, showFormPopupim, DocumentTypeNav, VehicleOwner, canAdd, id, dupData, vinNo, licensePlate, vehicleBrand, itemStatus, chassisNo, isApprove, guid, itemGUID, attachCode, attachInfo, avartar } = this.state
    let { header, dataLogin, statusSubmit, schema } = this.props
    let tabNameDefault = ["Attachment", "Certificate History"]
    let tabPaneDefault = [

      // Attachment
      <div>


        <Container fluid>
          <Col md="4" style={{ padding: 2 }}>
            {/* <FormSelectSearch
              mode={"single"}
              schema={{ "required": [""] }}
              value={DocumentTypeNav}
              list={DocumentTypeNav}
              label={"DocumentTypeNav"}
              fieldForm={DocumentTypeNav}
              placeholder={""}
              flex={1}
              onChange={(selected) => {
                this.setState({
                  DocumentTypeNav: selected
                })
              }
              }
            /> */}



          </Col>
          <Col md="8">
            <FormUpload
              className={"avatar-big"}
              schema={{ "required": [""] }}
              fieldForm="avartar"
              listType="file"
              label={"อัพโหลดไฟล์"}
              attachCode={attachCode}
              attachInfo={attachInfo}

              response={(res) => {

                console.log("RESPX : ", res)
                if (res.status) {

                  this.onRowInsertingIm(res.attachInfo.attachCode)
                  this.setState({
                    attachCode: res.attachInfo.attachCode

                  })
                }
              }}
            />
          </Col>
          {/* 0933673465 */}
          <Col md="12">
            <Table
              showSetting={false}
              mode={"api"}
              serversideSource={'https://api-center.onelink-iot.com/v1.0.1/Subscription/GridView/SubscriptionItemAttachments?GUID=' + get(this.props.infoGuid, "guid", "") + '&ItemGUID=' + itemGUID}
              author={header.idToken}
              xAPIKey={header.redisKey}
              table_id={4}
              user_id={dataLogin.userId}
              editing={{
                enabled: true,
                allowUpdating: true,
                allowDeleting: true
              }}
              // selectedCallback={}
              initialCallback={this.tableInitial}
              // deleteCallback={(e) => this.deleteCallback(e)}
              editCallback={(e) => this.editCallbackIm(e)}
              autoExpandAll={false}
              remoteOperations={false}
              tableKey={"itemAttachGUID"}
              column={[
                // {
                //   column_name: 'attachmentId',
                //   column_caption: "id",
                // },
                // {
                //   column_name: 'subscriptonId',
                //   column_caption: "subscriptonId",
                // },
                // {
                //   column_name: 'subscriberId',
                //   column_caption: "subscriberId",
                // },
                // {
                //   column_name: 'attachmentTypeId',
                //   column_caption: "attachmentTypeId",
                // },
                {
                  column_name: 'attachmentName',
                  column_caption: "attachmentName",
                },
                {
                  column_name: 'attachmentTypeName',
                  column_caption: "attachmentTypeName",
                },
                // {
                //   column_name: 'createdDateTime',
                //   column_caption: "createdDateTime",
                // },
                // {
                //   column_name: 'updatedDateTime',
                //   column_caption: "updatedDateTime",
                // },
                // {
                //   column_name: 'guid',
                //   column_caption: "guid",
                // },
                // {
                //   column_name: 'itemGUID',
                //   column_caption: "itemGUID",
                // },
                // {
                //   column_name: 'itemAttachGUID',
                //   column_caption: "itemAttachGUID",
                // },
              ]}
            >
            </Table>
          </Col>

        </Container>

      </div>,

      // Certificate History

      //table SubscriptionItemCertificateHistory
      <div>
        <Container>

          <Table
            mode={"api"}
            serversideSource={'https://api-center.onelink-iot.com/v1.0.1/Subscription/GridView/SubscriptionItemCertificateHistory?GUID=' + get(this.props.infoGuid, "guid", "") + '&ItemGUID=' + itemGUID}
            author={header.idToken}
            xAPIKey={header.redisKey}
            table_id={4}
            user_id={dataLogin.userId}
            editing={{
              enabled: true,
              allowUpdating: false,
              allowDeleting: false
            }}
            // selectedCallback={}
            initialCallback={this.tableInitial}
            // deleteCallback={(e) => this.deleteCallback(e)}
            // editCallback={(e) => this.editCallback(e)}
            autoExpandAll={false}
            remoteOperations={false}
            column={[
              {
                column_name: 'id',
                column_caption: "id",
              },
              {
                column_name: 'subscriberNo',
                column_caption: "subscriberNo",
              },
              {
                column_name: 'customerFullName',
                column_caption: "customerFullName",
              },
              {
                column_name: 'vehicleID',
                column_caption: "vehicleID",
              },
              {
                column_name: 'vinNo',
                column_caption: "vinNo",
              },
              {
                column_name: 'vehicleBrand',
                column_caption: "vehicleBrand",
              },
              {
                column_name: 'vehicleModel',
                column_caption: "vehicleModel",
              },
              {
                column_name: 'chassisNo',
                column_caption: "chassisNo",
              },
              {
                column_name: 'licensePlate',
                column_caption: "licensePlate",
              },
              {
                column_name: 'licensePlace',
                column_caption: "licensePlace",
              },
              {
                column_name: 'midNo',
                column_caption: "midNo",
              },
              {
                column_name: 'imei',
                column_caption: "imei",
              },
              {
                column_name: 'simNo',
                column_caption: "simNo",
              },
              {
                column_name: 'simVendor',
                column_caption: "simVendor",
              },
              {
                column_name: 'subscriptionStatus',
                column_caption: "subscriptionStatus",
              },
              {
                column_name: 'requireCertificate',
                column_caption: "requireCertificate",
              },
              {
                column_name: 'itemStatusID',
                column_caption: "itemStatusID",
              },
              {
                column_name: 'itemStatus',
                column_caption: "itemStatus",
              },
              {
                column_name: 'isApprove',
                column_caption: "isApprove",
              },
              {
                column_name: 'isSendDltComplete',
                column_caption: "isSendDltComplete",
              },
              {
                column_name: 'guid',
                column_caption: "guid",
              },
              {
                column_name: 'itemGUID',
                column_caption: "itemGUID",
              },
            ]}
          >
          </Table>

        </Container>
      </div>

    ]

    // console.log("data : ")
    return (
      <div>
        <Alert
          setting={alertSetting}
          onConfirm={() => {
            if (alertSetting.type === 3) {
              alertSetting.show = false
              this.submitComfirm()
            }
            //if success
            else if (statusSubmit.status) {
              alertSetting.show = true
              // this.props.history.push("/homePage")
            }
            else {
              alertSetting.show = false
            }
            this.setState({ alertSetting })
          }}
          onCancel={() => {
            alertSetting.show = false
            this.setState({ alertSetting })
          }}
        />
        <Modal
          title="Upload Image"
          visible={showFormPopupim}
          okText={t("add")}
          cancelText={t("cancel")}
          // onOk={this.onRowInsertingIm}
          okButtonProps={{}}
          onCancel={this.openModalAddIm}
        >


        </Modal>

        <Modal
          title="View Subscription Item"
          width={1500}

          visible={showFormPopup}
          okText={t("add")}
          cancelText={t("cancel")}
          onOk={this.onRowInserting}
          okButtonProps={{}}
          onCancel={this.openModal}
        >
          {this.setHeaderSection("1) Vehicle Information")}
          <Row>
            <Col xs="12" lg="4">
              <FormLabel
                label={"vinNo"}
                value={vinNo}
              />
              <FormLabel
                label={"licensePlate"}
                value={licensePlate}
              />
            </Col>
            <Col xs="12" lg="4">
              <FormLabel
                label={"vehicleBrand"}
                value={vehicleBrand}
              />
              <FormLabel
                label={"itemStatus"}
                value={itemStatus}
              />
            </Col>
            <Col xs="12" lg="4">
              <FormLabel
                label={"chassisNo"}
                value={chassisNo}
              />

              <FormLabel
                label={"isApprove"}
                value={isApprove === true ? "Yse" : "No"}
              />
            </Col>
          </Row>
          {this.setHeaderSection("2) DLT Information")}
          <Row>
            <Col xs="12" md="4">
              <FormSelectSearch
                mode={"single"}
                schema={{ "required": [""] }}
                value={""}
                list={[]}
                label={"Payer"}
                fieldForm={"chassisNo"}
                placeholder={""}
                flex={1}
                onChange={(selected) => {
                  this.setState({
                    chassisNo: selected
                  })
                }
                }
              />

              {console.log("VehicleOwner", VehicleOwner)}
            </Col>
            <Col xs="12" md="4">
              <FormSelectSearch
                mode={"single"}
                schema={{ "required": [""] }}
                value={""}
                list={[]}
                label={"Vehicle Type"}
                fieldForm={"chassisNo"}
                placeholder={""}
                flex={1}
                onChange={(selected) => {
                  this.setState({
                    chassisNo: selected
                  })
                }
                }
              />
            </Col>
            <Col xs="12" md="4">
              <FormInput
                schema={{ "required": [""] }}
                value={VehicleOwner}
                label={"Vehicle Owner"}
                fieldForm={"VehicleOwner"}
                placeholder={""}
                flex={1}
                onChange={(e) => {
                  this.setState({ VehicleOwner: e.target.value })
                }}
              />
            </Col>
            <Col xs="12" md="12">
              <FormTextArea
                schema={{ "required": [""] }}
                label={"Note"}
                value={""}
                placeholder={""}
              />
            </Col>
          </Row>


          <Tabbed
            tabName={tabNameDefault}
            tabPane={tabPaneDefault}>
          </Tabbed>
        </Modal>
        {/* {console.log("guidguid", get(this.props.infoGuid, "guid", ""))} */}
        <Table
          mode={"api"}
          serversideSource={'https://api-center.onelink-iot.com/v1.0.1/Subscription/GridView/SubscriptionItems?GUID=' + get(this.props.infoGuid, "guid", "")}
          author={header.idToken}
          xAPIKey={header.redisKey}
          table_id={4}
          user_id={dataLogin.userId}
          editing={{
            enabled: true,
            allowUpdating: true,
            allowDeleting: true
          }}
          // selectedCallback={}
          initialCallback={this.tableInitial}
          // deleteCallback={(e) => this.deleteCallback(e)}
          editCallback={(e) => this.editCallback(e)}
          autoExpandAll={false}
          remoteOperations={false}
          column={[
            {
              column_name: 'id',
              column_caption: "id",
            },
            {
              column_name: 'subscriberNo',
              column_caption: "subscriberNo",
            },
            {
              column_name: 'customerFullName',
              column_caption: "customerFullName",
            },
            {
              column_name: 'vehicleID',
              column_caption: "vehicleID",
            },
            {
              column_name: 'vinNo',
              column_caption: "vinNo",
            },
            {
              column_name: 'vehicleBrand',
              column_caption: "vehicleBrand",
            },
            {
              column_name: 'vehicleModel',
              column_caption: "vehicleModel",
            },
            {
              column_name: 'chassisNo',
              column_caption: "chassisNo",
            },
            {
              column_name: 'licensePlate',
              column_caption: "licensePlate",
            },
            {
              column_name: 'licensePlace',
              column_caption: "licensePlace",
            },
            {
              column_name: 'midNo',
              column_caption: "midNo",
            },
            {
              column_name: 'imei',
              column_caption: "imei",
            },
            {
              column_name: 'simNo',
              column_caption: "simNo",
            },
            {
              column_name: 'simVendor',
              column_caption: "simVendor",
            },
            {
              column_name: 'subscriptionStatus',
              column_caption: "subscriptionStatus",
            },
            {
              column_name: 'requireCertificate',
              column_caption: "requireCertificate",
            },
            {
              column_name: 'itemStatusID',
              column_caption: "itemStatusID",
            },
            {
              column_name: 'itemStatus',
              column_caption: "itemStatus",
            },
            {
              column_name: 'isApprove',
              column_caption: "isApprove",
            },
            {
              column_name: 'isSendDltComplete',
              column_caption: "isSendDltComplete",
            },
            {
              column_name: 'guid',
              column_caption: "guid",
            },
            {
              column_name: 'itemGUID',
              column_caption: "itemGUID",
            },
          ]}
        >
        </Table>
      </div>
    )
  }

}


const mapStateToProps = (state) => ({
  infoSetGuid: state.subscription.infoSetGuid,
  infoSubItemGuid: state.subscription.infoSubItemGuid,
  addStatus: state.subscription.addStatus,
  header: state.signin.header,
  dataLogin: state.signin.dataLogin,
  infoGuid: state.subscription.infoGuid,
  infoaddItemAttachment: state.subscription.infoaddItemAttachment,
  statusSubmit: state.subscription.statusSubmit,
  infoDropdownDocType: state.subscription.infoDropdownDocType,
});

const mapDispatchToProps = (dispatch) => ({
  getSubItemGuid: (guid, guiditem) => dispatch(SubscriptionActions.getSubItemGuid(guid, guiditem)),
  addItemAttachment: (data) => dispatch(SubscriptionActions.addItemAttachment(data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(TableSub)
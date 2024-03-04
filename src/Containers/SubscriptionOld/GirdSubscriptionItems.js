import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'reactstrap'
import { ENDPOINT_BASE_URL } from '../../Config/app-config';
import { Modal } from 'antd';
import Table from '../../Components/DataGridView/Table.js'
import SubscriptionActions from '../../Redux/SubscriptionRedux'
import SaveButton from '../../Components/SaveButton'
import CancelButton from '../../Components/CancelButton'
import { get, isEmpty } from 'lodash'
import moment from 'moment'
import Alert from '../../Components/Alert'
import { t } from '../../Components/Translation'
import FormLabel from '../../Components/FormControls/FormLabel'
import FormRadio from '../../Components/FormControls/FormRadio'
// import TabbedSub from '../../Components/TabbedSub'

class GirdSubscriptionItems extends Component {


  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      alertSettingGird: {
        show: false,
        type: 3,
        content: "",
        ErrorSubcode: 0
      },
      formData: {
        DriverDetail: {
          basicData: {

          }
        }
      },
      formDataSubmit: {},
      showFormPopup: false,
      showFormPopup1: false,
      SignatureName: "",
      SignatureName_value: "",
      SignaturesList: [],
      subscriptionID: "",
      subscriberID: "",
      param: "",
      paramAllowcate: [],
      paramItem: "",
      canAdd: true,
      statusSubmit: {
        submitSuccess: false,
        status: true,
        ErrorSubcode: ""
      },
      ///
      vehicleBrand: "",
      vinNo: "",
      enginNo: "",
      vehicleModel: "",
      chassisNo: "",
      licensePlate: "",
      ///
      attach15: "",
      attachInfo15: {},
      attach14: "",
      attachInfo14: {},
      attach13: "",
      attachInfo13: {},
      attach12: "",
      attachInfo12: {},
      attach11: "",
      attachInfo11: {},
      subscriberId: "",
      ///
      vehicleOwner: "",
      dltVehicleType: "",
      DltVehicleTypeList: [],
      onelinkVehicleType: "",
      VehicleTypeList: [],
      isSendDLT: true,
      dltBodyType: "",
      DltBodyTypeList: [],
      cargolinkVehicleType: "",
      CargolinkList: [],
      ///
      itemStatus: "",
      SignatureName: "",
      SignaturesList: [],
      note: "",
      dealerContactOnly: false,
      itemsdata: [],
      data: {
        attaches: []

      },
      installDate: '',
      action: "",
      NumberTag: 0,
      arr_ID: [],
      dataItem: null,
      isIndividual: false,






    }

    this.arrID = []

    // this.NumberTag = 2



  }

  showVisible = (e) => {
    let visible = false
    const lstUserLavel = [1, 2, 11, 12]

    let itemStatusID = get(e, "row.data.itemStatusID", "")



    let { dataLogin, formAction } = this.props
    // console.log("userLevelId", dataLogin.userLevelId)



    if (lstUserLavel.includes(dataLogin.userLevelId) && itemStatusID === 5) {


      visible = true
    }
    return visible
  }

  DLTVisible = (e) => {
    let visible = false
    const lstUserLavel = [1, 2, 11, 12]

    let isVisibleActionSendDLT = get(e, "row.data.isVisibleActionSendDLT", "")



    let { dataLogin, formAction } = this.props
    // console.log("userLevelId", dataLogin.userLevelId)



    if (lstUserLavel.includes(dataLogin.userLevelId) && isVisibleActionSendDLT === true) {


      visible = true
    }
    return visible
  }

  checkVisible = (e) => {
    let visible = false
    const lstUserLavel = [1, 2, 11, 12]

    let itemStatusID = get(e, "row.data.itemStatusID", "")



    let { dataLogin, formAction } = this.props

    if (lstUserLavel.includes(dataLogin.userLevelId) && itemStatusID === 1 && formAction.action === 'Edit') {

      visible = true
    }

    return visible
  }

  checkVisibleEdit = (e) => {
    let visible = false

    let itemStatusID = get(e, "row.data.itemStatusID", "")

    let { dataLogin, formAction } = this.props
    // console.log("userLevelId", dataLogin.userLevelId)
    if (itemStatusID === 0 || itemStatusID === 1 || itemStatusID === 2) {


      visible = true

    }
    return visible
  }

  checkVisibleDel = (e) => {
    let { dataLogin, formAction } = this.props
    let visible = false


    let canDelete = get(e, "row.data.canDelete", "")


    if (canDelete) {

      visible = true
    }

    return visible
  }


  shouldComponentUpdate(prevProps, prevState, nextState) {

    // let { subscriptionID, DealerNav } = this.props
    // let { showFormPopup } = this.state
    // if (prevProps.subscriptionID !== subscriptionID || prevState.showFormPopup !== showFormPopup || prevProps.DealerNav !== DealerNav) {

    //     // render
    //     return true

    // } else {

    //     // don't  render
    //     return false
    // }
    return true
  }

  componentDidMount() {
    this.setState({ dealerContactOnly: false })
  }

  componentWillMount() {
    let { infogetSubscriber, info_DltVehicleType, infoDltBodyType, infoCargolinkType, infoDocumentType, subscriptionID, infoSignatures, formAction } = this.props

    // this.props.DltVehicleType()
    // this.props.CargolinkType()
    if (get(formAction, 'action', '') === "Edit") {

      this.props.Signatures(subscriptionID)
    }

    //Vehicle Type
    // this.props.DocumentType()





    if (isEmpty(info_DltVehicleType) || info_DltVehicleType === undefined) this.props.DltVehicleType()
    if (isEmpty(infoCargolinkType) || infoCargolinkType === undefined) this.props.CargolinkType()
    if (isEmpty(infoDocumentType) || infoDocumentType === undefined) this.props.DocumentType()








  }


  componentDidUpdate(prevProps, prevState) {
    let { infogetSubscriber, info_DltVehicleType, infoDltBodyType, infoCargolinkType, infoDocumentType, infoshowSubscriber, infoSignatures, packgeNav } = this.props



    // prevProps.info_DltVehicleType !== info_DltVehicleType && this.setState({ DltVehicleTypeList: info_DltVehicleType })
    // prevProps.infoDltBodyType !== infoDltBodyType && this.setState({ DltBodyTypeList: infoDltBodyType })
    // prevProps.infoCargolinkType !== infoCargolinkType && this.setState({ CargolinkList: infoCargolinkType })
    // prevProps.infoDocumentType !== infoDocumentType && this.setState({ VehicleTypeList: infoDocumentType })
    // prevProps.infoSignatures !== infoSignatures && this.setState({ SignaturesList: infoSignatures })

    if (prevProps.infogetSubscriber !== infogetSubscriber) {

      // console.log("infogetSubscriber", infogetSubscriber)
    }

    if (prevProps.packgeNav !== packgeNav) {

      // console.log("packgeNav : ", packgeNav)

      this.setState({ paramAllowcate: [] })
    }



    if (prevProps.infoshowSubscriber !== infoshowSubscriber) {


      // console.log("infoshowSubscriber", infoshowSubscriber)
      //do when edit

      let t15 = infoshowSubscriber.attaches.find((e) => e.attachTypeNav.key === 15)
      let t14 = infoshowSubscriber.attaches.find((e) => e.attachTypeNav.key === 14)
      let t13 = infoshowSubscriber.attaches.find((e) => e.attachTypeNav.key === 14)
      let t12 = infoshowSubscriber.attaches.find((e) => e.attachTypeNav.key === 12)
      let t11 = infoshowSubscriber.attaches.find((e) => e.attachTypeNav.key === 11)

      // console.log(infoshowSubscriber)

      this.setState({
        ////
        attachInfo15: t15 == undefined ? {} : t15,
        attach15: get(t15, 'attachCode', ''),
        attachInfo14: t14 == undefined ? {} : t14,
        attach14: get(t14, 'attachCode', ''),
        attachInfo13: t13 == undefined ? {} : t13,
        attach13: get(t13, 'attachCode', ''),
        attachInfo12: t12 == undefined ? {} : t12,
        attach12: get(t12, 'attachCode', ''),
        attachInfo11: t11 == undefined ? {} : t11,
        attach11: get(t11, 'attachCode', ''),

        ////

        dltVehicleType: "" + get(infoshowSubscriber, 'dltVehicleType', ''),
        onelinkVehicleType: infoshowSubscriber.onelinkVehicleType == null ? '' : "" + get(infoshowSubscriber, 'onelinkVehicleType', ''),
        isSendDLT: get(infoshowSubscriber, 'isSendDlt', true),
        dltBodyType: infoshowSubscriber.dltBodyType == null ? '' : "" + get(infoshowSubscriber, 'dltBodyType', ''),
        cargolinkVehicleType: infoshowSubscriber.cargoLinkVehicleType == null ? '' : "" + get(infoshowSubscriber, 'cargoLinkVehicleType', ''),

        subscriberId: get(infoshowSubscriber, 'subscriberId', ''),
        itemStatus: get(infoshowSubscriber, 'itemStatus', ''),
        vehicleOwner: get(infoshowSubscriber, 'vehicleOwner', ''),
        note: get(infoshowSubscriber, 'note', ''),
        dealerContactOnly: get(infoshowSubscriber, 'dealerContactOnly', false),


      })

      this.props.DltBodyType(get(infoshowSubscriber, 'dltVehicleType', ''))

    }




  }




  setAlertSetting(isShow, type, content = "", ErrorSubcode) {
    let { alertSettingGird, checkNullTable } = this.state
    alertSettingGird.show = isShow
    alertSettingGird.type = type
    alertSettingGird.content = content
    alertSettingGird.ErrorSubcode = ErrorSubcode
    this.setState({ alertSettingGird })


  }


  openModal = (e) => {


    this.setState(state => ({ showFormPopup: !state.showFormPopup }))



  }


  openModalManage = (e) => {


    //clear form
    this.setState(state => ({

      showFormPopup1: !state.showFormPopup1,
      attachInfo15: {},
      attachInfo14: {},
      attachInfo13: {},
      attachInfo12: {},
      attachInfo11: {},
      vehicleOwner: "",
      dltVehicleType: "",
      dltBodyType: "",
      onelinkVehicleType: "",
      cargolinkVehicleType: "",
      isSendDLT: true,
      note: "",

    }))

  }

  editCallback = (e) => {

    let str = ''

    if (e.selectedRowKeys.length > 0) {

      // str = '?NewSubscriberIds=' + e.selectedRowKeys.join('&NewSubscriberIds=')

      this.arrID = e.selectedRowKeys



      // console.log("OLD: ", this.state.param)

      this.setState({ canAdd: false, arr_ID: e.selectedRowKeys })

      // console.log('str', str)

    } else {
      this.setState({ canAdd: true })
    }
  }




  onRowInserting = (e) => {
    let { paramAllowcate } = this.state
    let str = ''
    paramAllowcate = [...paramAllowcate, ...this.arrID]

    this.setState({ paramAllowcate })
    this.props.getSubscriber(this.arrID)
    this.openModal()
  }


  editItem = (e) => {

    // e.preventDefault()
    let { showFormPopup, showFormPopup1, canAdd, paramAllowcate, vehicleBrand, vinNo, enginNo, vehicleModel, chassisNo, licensePlate,
      attach15, attachInfo15, attach14, attachInfo14, attach13, attachInfo13, attach12, attachInfo12, attach11, attachInfo11,
      vehicleOwner, dltVehicleType, DltVehicleTypeList, onelinkVehicleType, VehicleTypeList, isSendDLT, dltBodyType, DltBodyTypeList, cargolinkVehicleType, CargolinkList,
      itemStatus, SignatureName, SignaturesList, note, licensePlace, dataItem
    } = this.state
    let { infogetSubscriber, subscriptionID, formAction } = this.props
    let id = get(e, 'row.data.id', '')
    let row = e.row.data


    this.setState({
      vehicleBrand: row.vehicleBrand,
      vinNo: row.vinNo,
      enginNo: row.enginNo,
      vehicleModel: row.vehicleModel,
      chassisNo: row.chassisNo,
      licensePlate: isEmpty(row.licensePlate) ? "" : row.licensePlate,
      subscriberID: id
    })



    // console.log("dataItem :", JSON.stringify(dataItem))







    if (get(formAction, 'action', '') === "Edit") {

      this.props.showSubscriber(subscriptionID, id)

    } else {
      // ตอนเพิ่มข้อมูล
      let data
      if (!isEmpty(dataItem)) {

        data = dataItem.map(item => item.filter(e => {

          if (e.subscriberId == id) this.mapFormitem(e)

        }))
      }

    }


    this.setState({ action: "" })




  }


  mapFormitem = (data) => {
    // console.log(data)



    let t15 = data.attaches.find((e) => e.attachTypeNav.key === 15)
    let t14 = data.attaches.find((e) => e.attachTypeNav.key === 14)
    let t13 = data.attaches.find((e) => e.attachTypeNav.key === 14)
    let t12 = data.attaches.find((e) => e.attachTypeNav.key === 12)
    let t11 = data.attaches.find((e) => e.attachTypeNav.key === 11)


    this.setState({

      attachInfo15: t15 == undefined ? {} : t15,
      attach15: get(t15, 'attachCode', ''),
      attachInfo14: t14 == undefined ? {} : t14,
      attach14: get(t14, 'attachCode', ''),
      attachInfo13: t13 == undefined ? {} : t13,
      attach13: get(t13, 'attachCode', ''),
      attachInfo12: t12 == undefined ? {} : t12,
      attach12: get(t12, 'attachCode', ''),
      attachInfo11: t11 == undefined ? {} : t11,
      attach11: get(t11, 'attachCode', ''),

      dltVehicleType: "" + get(data, 'dltVehicleType', ''),
      onelinkVehicleType: "" + get(data, 'onelinkVehicleType', ''),
      isSendDLT: get(data, 'isSendDlt', true),
      dltBodyType: "" + get(data, 'dltBodyType', ''),
      cargolinkVehicleType: "" + get(data, 'cargoLinkVehicleType', ''),
      vehicleOwner: "" + get(data, 'vehicleOwner', ''),
      note: "" + get(data, 'note', ''),
      dealerContactOnly: "" + get(data, 'dealerContactOnly', false),
    })



  }



  saveModel() {


    let { subscriberID, attachInfo15, attachInfo14, attachInfo13, attachInfo12, attachInfo11, data, itemsdata,
      vehicleOwner, dltVehicleType, dltBodyType, onelinkVehicleType, cargolinkVehicleType, isSendDLT, note, dealerContactOnly } = this.state
    let { formAction, subscriptionID } = this.props

    let index = itemsdata.findIndex((item) => item.subscriberId === subscriberID)


    if (index !== -1) {

      itemsdata.splice(index, 1);

    }

    let attaches = []

    if (!isEmpty(attachInfo15)) attaches.push(attachInfo15)
    if (!isEmpty(attachInfo14)) attaches.push(attachInfo14)
    if (!isEmpty(attachInfo13)) attaches.push(attachInfo13)
    if (!isEmpty(attachInfo12)) attaches.push(attachInfo12)
    if (!isEmpty(attachInfo11)) attaches.push(attachInfo11)


    itemsdata.push({

      'vehicleOwner': vehicleOwner,
      'dltVehicleType': dltVehicleType,
      'dltBodyType': dltBodyType,
      'onelinkVehicleType': onelinkVehicleType,
      'cargoLinkVehicleType': cargolinkVehicleType,
      'isSendDlt': isSendDLT,
      'note': note,
      'dealerContactOnly': dealerContactOnly,
      'subscriberId': subscriberID,
      'attaches': attaches

    })



    if (get(formAction, 'action', '') === "Edit") {
      //call putSubscriber

      let data = {

        'vehicleOwner': vehicleOwner,
        'dltVehicleType': dltVehicleType,
        'dltBodyType': dltBodyType,
        'onelinkVehicleType': onelinkVehicleType,
        'cargoLinkVehicleType': cargolinkVehicleType,
        'isSendDlt': isSendDLT,
        'note': note,
        'dealerContactOnly': dealerContactOnly,
        'subscriberId': subscriberID,
        'attaches': attaches

      }

      this.props.loading(true)
      this.props.putSubscriber(subscriptionID, subscriberID, data)

    } else {


      //for appove
    }
    const arr_Item = []
    arr_Item.push(itemsdata)



    this.setState({ dataItem: arr_Item })
    this.props.itemsdata(itemsdata)
    this.openModalManage()
  }

  ManageModel = (e) => {

    let { formAction, subscriptionID } = this.props

    let id = get(e, 'row.data.id', '')
    let row = e.row.data

    this.setState({ subscriberID: id })




    this.setState({


      vehicleBrand: row.vehicleBrand,
      vinNo: row.vinNo,
      enginNo: row.enginNo,
      vehicleModel: row.vehicleModel,
      chassisNo: row.chassisNo,
      licensePlate: isEmpty(row.licensePlate) ? '' : row.licensePlate + " " + isEmpty(row.licensePlace) ? '' : row.licensePlace



    })



    this.setState({ action: "View" })


    if (get(formAction, 'action', '') === "Edit") {

      this.props.showSubscriber(subscriptionID, id)

    }
  }


  PrintModel = (e) => {

    let { formAction, subscriptionID } = this.props

    let id = get(e, 'row.data.id', '')
    let row = e.row.data

    this.setState({ subscriberID: id })





    this.setState({


      vehicleBrand: row.vehicleBrand,
      vinNo: row.vinNo,
      enginNo: row.enginNo,
      vehicleModel: row.vehicleModel,
      chassisNo: row.chassisNo,
      licensePlate: isEmpty(row.licensePlate) ? '' : row.licensePlate + " " + isEmpty(row.licensePlace) ? '' : row.licensePlace



    })



    this.setState({ action: "Print" })


    if (get(formAction, 'action', '') === "Edit") {

      this.props.showSubscriber(subscriptionID, id)

    }
  }

  ResendDtlModel = (e) => {

    let { formAction, subscriptionID } = this.props

    let id = get(e, 'row.data.id', '')
    let row = e.row.data

    this.setState({ subscriberID: id })





    this.setState({
      vehicleBrand: row.vehicleBrand,
      vinNo: row.vinNo,
      enginNo: row.enginNo,
      vehicleModel: row.vehicleModel,
      chassisNo: row.chassisNo,
      licensePlate: isEmpty(row.licensePlate) ? '' : row.licensePlate + " " + isEmpty(row.licensePlace) ? '' : row.licensePlace
    })

    this.setState({ action: "ResendDLT" })


    if (get(formAction, 'action', '') === "Edit") {

      this.props.showSubscriber(subscriptionID, id)

    }
  }


  deleteCallback = (e) => {

    let id = e.row.data.id


    let { paramAllowcate } = this.state


    let index = paramAllowcate.indexOf(id)
    if (index > -1) paramAllowcate.splice(index, 1)

    this.setState({ paramAllowcate })

    if (get(this.props.formAction, 'action', '') === "Edit") {
      this.props.delSubscriber(this.props.subscriptionID, id)
    }

  }

  VerifyAppove = (e) => {
    let dateStart = moment(this.state.installDate, 'DD/MM/YYYY').format('YYYY-MM-DD')

    if (isEmpty(this.state.installDate)) {

      this.setAlertSetting(true, 4, "subscription_96")

    } else {

      this.props.loading(true)
      this.props.VerifySub(this.props.subscriptionID, this.state.subscriberID, true, dateStart)

      this.openModalManage()

    }
  }

  VerifyReject = (e) => {
    // console.log("VerifyReject")

    this.props.loading(true)
    this.props.VerifySub(this.props.subscriptionID, this.state.subscriberID, false, '')
    this.openModalManage()

  }

  printItemCerticate = () => {

    // console.log("printItemCerticate")
    // console.log(">> state.SignatureName : ", this.state.SignatureName)

    if (this.state.SignatureName == '--ตัวแทนจากบริษัทวันลิ้งค์--' || this.state.SignatureName == undefined) {
      this.props.ItemCerticate(this.props.subscriptionID, this.state.subscriberID, '')
    } else {
      this.props.ItemCerticate(this.props.subscriptionID, this.state.subscriberID, this.state.SignatureName)
    }


    this.props.loading(true)
    this.openModalManage()

  }

  ResendDLT = () => {

    this.props.loading(true)
    this.props.ResendDlt(this.props.subscriptionID, this.state.subscriberID)
    this.openModalManage()



  }


  ResendSleep = () => {


    console.log("ResendSleep")
    this.props.loading(true)
    this.props.ActiveGps(this.props.subscriptionID, this.state.subscriberID)
    this.openModalManage()

  }

  CheckRequire = () => {
    let { attach15, vehicleOwner, dltVehicleType } = this.state


    if (isEmpty(attach15)) {

      this.setAlertSetting(true, 4, "subscription_80")
      // this.setState({ NumberTag: 1 })
      return false

    } else if (isEmpty(vehicleOwner)) {

      this.setAlertSetting(true, 4, "subscription_81")
      // this.setState({ NumberTag: 2 })
      return false

    } else if (isEmpty(dltVehicleType)) {
      this.setAlertSetting(true, 4, "subscription_82")
      // this.setState({ NumberTag: 2 })
      return false
    }

    return true
  }


  buttonResend = () => {

    return (

      <SaveButton
        name={t("subscription_65")}
        onClick={() => {
          this.ResendDLT()
        }}
      />,
      <SaveButton
        name={"Set Sleep Mode"}
        onClick={() => {
          this.ResendDLT()
        }}
      />
    )
  }



  render() {

    let { header, dataLogin, subscriptionID, formAction, DealerNav, CustomerNav, statusSubmit, packgeNav, info_DltVehicleType, infoDltBodyType, infoCargolinkType
      , infoDocumentType, infoSignatures

    } = this.props
    let { showFormPopup, showFormPopup1, canAdd, paramAllowcate, vehicleBrand, vinNo, enginNo, vehicleModel, chassisNo, licensePlate,
      attach15, attachInfo15, attach14, attachInfo14, attach13, attachInfo13, attach12, attachInfo12, attach11, attachInfo11,
      vehicleOwner, dltVehicleType, DltVehicleTypeList, onelinkVehicleType, VehicleTypeList, isSendDLT, dltBodyType, DltBodyTypeList, cargolinkVehicleType, CargolinkList,
      itemStatus, SignatureName, SignaturesList, note, dealerContactOnly, data, action, alertSettingGird, NumberTag

    } = this.state


    let strParamAllowcate = paramAllowcate.length > 0 ? '?NewSubscriberIds=' + paramAllowcate.join('&NewSubscriberIds=') : ''

    // console.log('strParamAllowcate', strParamAllowcate)


    const lstUserLavel = [1, 2, 11, 12]
    //ข้อมูลรถ
    let tabNameDefault1 = [
      <div >
        <Row >
          <Col xs="12" lg="6">
            <FormLabel
              label={"subscription_14"}
              value={vehicleBrand}
            />
            <FormLabel
              label={"subscription_13"}
              value={vinNo}
            />
            <FormLabel
              label={"engineno"}
              value={enginNo}
            />
          </Col>
          <Col xs="12" lg="6">
            <FormLabel
              label={"subscription_15"}
              value={vehicleModel}
            />
            <FormLabel
              label={"my_vehicles_63"}
              value={chassisNo}
            />

            <FormLabel
              label={"license_plate"}
              value={licensePlate}
            />
          </Col>
        </Row>
      </div>
    ]

    return (
      <div>
        <Row>
          <Col lg="12">
            <div className="ibox float-e-margins">
              <div className="ibox-content" style={{ paddingLeft: 35, paddingRight: 35, borderWidth: ' 4px 0px 0px ', borderColor: '#e7eaec' }}>
                <Row style={{ textAlign: "right", marginTop: 5, marginBottom: 0 }}>
                  {
                    (formAction.action !== "Edit" && DealerNav != "") &&
                    <Button className="btn btn-primary btn-sm" onClick={() => { this.openModal() }} ><i className="fa fa-plus"></i>{' '}Add</Button>
                  }
                </Row>
                <Row>
                  <Table
                    mode={"api"}
                    serversideSource={get(formAction, 'action', '') === "Edit" ? ENDPOINT_BASE_URL + 'Subscription/Profile/' + subscriptionID + '/Items' : 'Subscription/GridView/SubscriptionItems' + strParamAllowcate}
                    // serversideSource={ENDPOINT_BASE_URL + 'Subscription/GridView/Dealer/' + DealerNav + '/AirtimePackage/' + packgeNav + '/SubscriberAllowcate' + strParamAllowcate}
                    author={header.idToken}
                    xAPIKey={header.redisKey}
                    table_id={102}
                    user_id={this.props.dataLogin.userId}
                    editing={{
                      enabled: true,
                      allowUpdating: false,
                      allowDeleting: false
                    }}
                    autoExpandAll={false}
                    remoteOperations={false}
                    columnCount="vehicleBrand"
                    key={'id'}
                    // this.deleteCallback(e)
                    // deleteCallback={(e) => this.deleteCallback(e)}
                    allowDeleting={{
                      column_name: "canDelete",
                      condition: true
                    }}
                    column={[


                      // {
                      //   column_name: 'canDelete',
                      //   column_caption: "canDelete",
                      // },
                      // {
                      //   column_name: 'vehicleBrand',
                      //   column_caption: "subscription_14",
                      // },
                      {
                        column_name: 'vehicleModel',
                        column_caption: "subscription_15",
                      },
                      {
                        column_name: 'vinNo',
                        column_caption: "other_reports_142",
                      },
                      {
                        column_name: 'engine_no',
                        column_caption: "subscription_42",
                      },
                      {
                        column_name: 'Payment_type',
                        column_caption: "subscription_99"
                      },
                      {
                        column_name: 'finance',
                        column_caption: "realtime_157",
                      },
                      // {
                      //   column_name: 'licensePlace',
                      //   column_caption: "subscription_18",
                      // },
                      // {
                      //   column_name: 'isVisibleActionActiveGps',
                      //   column_caption: "isVisibleActionActiveGps",
                      // },


                    ]}
                    customButton={[
                      {
                        hint: "Resend DLT",
                        icon: "refresh",
                        visible: this.DLTVisible,
                        onClick: (e) => {
                          // do something ...
                          this.openModalManage()
                          this.ResendDtlModel(e)

                        }
                      },
                      {
                        hint: "Set Sleep Mode",
                        icon: "box",
                        visible: this.DLTVisible,
                        onClick: (e) => {
                          // do something ...
                          this.openModalManage()
                          this.ResendDtlModel(e)

                        }
                      },

                      {
                        hint: "Print",
                        icon: "print",
                        visible: this.showVisible,
                        onClick: (e) => {
                          // do something ...
                          this.openModalManage()
                          this.PrintModel(e)
                          // this.printItemCerticate(e)
                        }
                      },
                      {
                        hint: "Check",
                        icon: "check",
                        visible: this.checkVisible,
                        onClick: (e) => {
                          // do something ...
                          this.openModalManage()
                          this.ManageModel(e)
                        }
                      },
                      {
                        hint: "Edit",
                        icon: "edit",
                        visible: this.checkVisibleEdit,
                        onClick: (e) => {
                          // do something ...
                          //call model
                          this.openModalManage()
                          //call item
                          this.editItem(e)

                        }
                      },
                      {
                        hint: "Delete",
                        icon: "trash",
                        visible: this.checkVisibleDel,
                        onClick: (e) => {
                          // do something ...
                          this.deleteCallback(e)
                        }
                      }
                    ]}
                  >
                  </Table>



                  {/* SubscriberAllowcate */}
                  <Modal
                    title={t("subscription_63")}
                    width={1000}
                    visible={showFormPopup}
                    okText={t("add")}
                    cancelText={t("cancel")}
                    onOk={this.onRowInserting}
                    okButtonProps={{ disabled: canAdd }}
                    onCancel={this.openModal}
                  >

                    <Table
                      mode={"api"}
                      showSetting={false}
                      serversideSource={ENDPOINT_BASE_URL + 'Subscription/GridView/Dealer/' + DealerNav + '/AirtimePackage/' + '/SubscriberAllowcate' + strParamAllowcate} //no vehiceModel
                      author={header.idToken}
                      xAPIKey={header.redisKey}
                      table_id={8}
                      user_id={this.props.dataLogin.userId}
                      editing={{
                        enabled: false,
                        allowUpdating: false,
                        allowDeleting: false
                      }}
                      key={"id"}
                      selectedCallback={(e) => {
                        this.editCallback(e)
                        // this.props.callModel(e.selectedRowKeys)



                      }}
                      // initialCallback={this.tableInitial}
                      // editCallback={(e) => this.editCallback(e)}
                      autoExpandAll={false}
                      remoteOperations={false}
                      columnCount="vehicleModel"

                      column={[
                        {
                          column_name: 'vehicleModel',
                          column_caption: "subscription_15",
                        },
                        {
                          column_name: 'vinNo',
                          column_caption: "subscription_13",
                        },
                        {
                          column_name: 'engine_no',
                          column_caption: "subscription_42",
                        },
                        {
                          column_name: 'MID',
                          column_caption: "Installation_report_7",
                        }
                        // {
                        //   column_name: 'subscriberNo',
                        //   column_caption: "subscriberNo",
                        // },
                        // {
                        //   column_name: 'vehicleID',
                        //   column_caption: "vehicleID",
                        // },
                        // {
                        //   column_name: 'vehicleBrand',
                        //   column_caption: "vehicleBrand",
                        // },
                        // {
                        //   column_name: 'chassisNo',
                        //   column_caption: "chassisNo",
                        // },
                        // {
                        //   column_name: 'licensePlate',
                        //   column_caption: "licensePlate",
                        // },

                      ]}
                    >
                    </Table>
                  </Modal>


                  {/* Model Appove */}
                  <Alert
                    setting={alertSettingGird}
                    onConfirm={() => {
                      if (alertSettingGird.type === 3) {
                        alertSettingGird.show = false
                        this.submitComfirm()
                      }
                      //if success
                      else if (statusSubmit.key) {
                        alertSettingGird.show = true
                        alertSettingGird.show = false
                      }
                      else if (statusSubmit.status) {
                        alertSettingGird.show = true
                        this.props.history.push("/subscription")
                      }
                      else {
                        alertSettingGird.show = false
                        // alertSettingGird.type = 2
                        // alertSettingGird.content = action + " User Failed"
                      }
                      this.setState({ alertSettingGird })
                    }}
                    onCancel={() => {
                      alertSettingGird.show = false
                      this.setState({ alertSettingGird })
                    }}
                  />

                  <Modal
                    title={t("subscription_64")}
                    width={1000}
                    visible={showFormPopup1}
                    okText={t("add")}
                    cancelText={t("cancel")}
                    // onOk={this.onRowInserting}
                    // okButtonProps={{ disabled: canAdd }}
                    onCancel={this.openModalManage}
                    footer={''}
                  >
                    <div >
                      <Row >
                        <Col xs="12" lg="6">
                          <FormLabel
                            label={"subscription_15"}
                            value={vehicleModel}
                          />
                          <FormLabel
                            label={"engineno"}
                            value={enginNo}
                          />
                          <FormLabel
                            label={"realtime_157"}
                            value={""}
                          />
                        </Col>
                        <Col xs="12" lg="6">
                          <FormLabel
                            label={"my_vehicles_63"}
                            value={chassisNo}
                          />

                          <FormRadio
                            schema={{ "required": [""] }}
                            value={"เช่าซื้อ"}
                            label={"customer_3"}
                            fieldForm={"isIndividual"}
                            flex={1}
                            word={['เงินสด', 'เช่าซื้อ']}
                            disabled={false}
                            onClick={(isIndividual, fieldForm) => {
                              this.setState({ isIndividual })
                            }}
                          />
                        </Col>
                      </Row>
                    </div>
                    {/* {console.log("NumberTag :", NumberTag)} */}
                    <div className="hr-line-dashed" />
                    <div className="row" style={{ textAlign: "right" }}>

                      {action === 'View' ?
                        <CancelButton
                          name={t("subscription_61")}
                          style={{ backgroundColor: '#E34725' }}
                          onClick={() => {
                            this.VerifyReject()
                            // this.openModalManage()

                          }}
                        />
                        :
                        action === 'Print' ?
                          <CancelButton
                            name={t("cancel")}
                            onClick={() => {
                              this.openModalManage()

                            }}
                          />

                          :
                          <CancelButton
                            name={t("cancel")}
                            onClick={() => {
                              this.openModalManage()

                            }}
                          />
                      }
                      {' '}
                      {
                        action === 'View' ?
                          <SaveButton
                            name={t("subscription_60")}
                            onClick={() => {
                              this.VerifyAppove()

                            }}
                          />
                          :
                          action === 'Print' ?
                            <SaveButton
                              name={t("print")}
                              onClick={() => {

                                if (this.state.SignatureName == "") {

                                  this.setAlertSetting(true, 4, "subscription_85")
                                  this.setState({ NumberTag: 3 })

                                } else {
                                  this.printItemCerticate()
                                }

                                // this.printItemCerticate()

                              }}
                            />
                            :
                            action === 'ResendDLT' ?
                              <SaveButton
                                name={t("subscription_65")}
                                onClick={() => {
                                  this.ResendDLT()
                                }}
                              />
                              :
                              <SaveButton
                                name={t("save")}
                                onClick={() => {


                                  if (this.CheckRequire()) {
                                    this.saveModel()
                                  }

                                }}
                              />
                      }
                      {
                        (action === 'ResendDLT') &&

                        <SaveButton
                          name={t('subscription_95')}
                          onClick={() => {

                            this.ResendSleep()
                          }}
                        />
                      }

                    </div>

                  </Modal>


                </Row>
              </div>
            </div>

          </Col>
        </Row>


      </div >
    )
  }



}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  formAction: state.subscription.formAction,
  infogetSubscriber: state.subscription.infogetSubscriber,
  statusSubmit: state.subscription.statusSubmit,
  infoshowSubscriber: state.subscription.infoshowSubscriber,

  info_DltVehicleType: state.subscription.info_DltVehicleType,
  infoDltBodyType: state.subscription.infoDltBodyType,
  infoCargolinkType: state.subscription.infoCargolinkType,
  infoDocumentType: state.subscription.infoDocumentType,
  infoSignatures: state.subscription.infoSignatures,

  Dataitem: state.subscription.Dataitem,
});

const mapDispatchToProps = (dispatch) => ({
  getSubscriber: (id) => dispatch(SubscriptionActions.getSubscriber(id)),
  showSubscriber: (SubscriptionID, subscriberID) => dispatch(SubscriptionActions.showSubscriber(SubscriptionID, subscriberID)),
  putSubscriber: (SubscriptionID, subscriberID, data) => dispatch(SubscriptionActions.putSubscriber(SubscriptionID, subscriberID, data)),
  VerifySub: (id, subscriberId, isAgree, dateStart) => dispatch(SubscriptionActions.VerifySub(id, subscriberId, isAgree, dateStart)),
  ItemCerticate: (id, subscriberId, dealerSignature) => dispatch(SubscriptionActions.ItemCerticate(id, subscriberId, dealerSignature)),
  delSubscriber: (id, subscriberId) => dispatch(SubscriptionActions.delSubscriber(id, subscriberId)),
  ///
  DltVehicleType: () => dispatch(SubscriptionActions.DltVehicleType()),
  DltBodyType: (id) => dispatch(SubscriptionActions.DltBodyType(id)),
  CargolinkType: () => dispatch(SubscriptionActions.CargolinkType()),
  DocumentType: () => dispatch(SubscriptionActions.DocumentType()),
  Signatures: (id) => dispatch(SubscriptionActions.Signatures(id)),
  ResendDlt: (id, subscriberId) => dispatch(SubscriptionActions.ResendDlt(id, subscriberId)),
  ActiveGps: (id, subscriberId) => dispatch(SubscriptionActions.ActiveGps(id, subscriberId)),
  setDataitem: (Dataitem) => dispatch(SubscriptionActions.setDataitem(Dataitem)),

});

export default connect(mapStateToProps, mapDispatchToProps)(GirdSubscriptionItems)

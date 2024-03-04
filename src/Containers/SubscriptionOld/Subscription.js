import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux";
import SubscriptionActions from '../../Redux/SubscriptionRedux'
import { get } from 'lodash'
import { Modal, Select } from 'antd';
// import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Row } from 'reactstrap';
import { t } from '../../Components/Translation'
import Table from '../../Components/DataGridView/SubscriptionTable'
import { ENDPOINT_BASE_URL } from '../../Config/app-config';
// import { useDidUpdate } from './Components/UseDidUpdate'
import { getHeaders, getIdtoken, getRediskey, getLanguage, getUserId } from './Components/HeaderAPI'
import SweetAlert from 'react-bootstrap-sweetalert'
import images from '../../Themes/Images'
import axios from 'axios';
const { Option } = Select;

const Subscription = () => {

  const dispatch = useDispatch();
  const {

    setPersonalIdSelect

  } = SubscriptionActions

  const dataLogin = useSelector(state => state.signin.dataLogin);


  const header = getHeaders(dataLogin)
  const idToken = getIdtoken(dataLogin)
  const redisKey = getRediskey(dataLogin)
  const language = getLanguage(dataLogin)
  const userId = getUserId(dataLogin)


  const [allValues, setAllValues] = useState({
    idProfile: '',
    idSubscriber: '',
    vinNo: '',
    listDealer: []
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  // //modal

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);




  const onClickAdd = () => {

    dispatch(setPersonalIdSelect("", "Add"))
    window.location.replace("#/subscription/subscriptionForm")
  }

  const editCallback = ele => {

    let data = get(ele, 'row.data')
    dispatch(setPersonalIdSelect(data, 'Edit'))
    window.location.replace("#/subscription/subscriptionForm")
  }

  const printCertificate = (ele) => {


    const idProfile = get(ele, "row.data.id", "")
    const idSubscriber = get(ele, "row.data.subscriptionID", "")
    const vinNo = get(ele, "row.data.vinNo", "")

    fetchData(idProfile, idSubscriber, vinNo)

  }

  const deleteCallback = (e) => {

    let id = e.row.data.id


    let { paramAllowcate } = this.state


    let index = paramAllowcate.indexOf(id)
    if (index > -1) paramAllowcate.splice(index, 1)

    this.setState({ paramAllowcate })

    if (get(this.props.formAction, 'action', '') === "Edit") {
      this.props.delSubscriber(this.props.subscriptionID, id)
    }

  }


  const fetchData = useCallback((idProfile, idSubscriber, vinNo) => {

    // console.log(idProfile, idSubscriber, vinNo)

    let one = ENDPOINT_BASE_URL + "Subscription/Profile/" + idSubscriber + "/DealerSignatures"


    const requestOne = axios.get(one, {
      headers: header
    });

    axios.all([requestOne]).then(axios.spread((...responses) => {
      const isList = responses[0].data

      setAllValues({
        ...allValues,
        listDealer: isList,
        idProfile,
        idSubscriber,
        vinNo
      })

      showModal()

    })).catch(errors => {
      console.log(errors);
    })

  }, [])


  const handleChange = useCallback((name) => {

    setIsLoading(true)

    let one = ENDPOINT_BASE_URL + 'Subscription/Profile/' + allValues.idSubscriber
      + '/Subscriber/' + allValues.idProfile + '/PrintCertification?dealerSignature=' +
      (name === '--ตัวแทนจากบริษัทวันลิ้งค์--' ? '' : name)


    const requestOne = axios.get(one, {
      headers: header
    });

    axios.all([requestOne]).then(axios.spread((...responses) => {
      const response = responses[0]


      //print certificate
      const linkSource = `data:application/pdf;base64,${response.data}`;
      const downloadLink = document.createElement("a");
      const fileName = "หนังสือรับรองการติดตั้ง " + '_' + allValues.vinNo + ".pdf";
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();

      setIsLoading(false)

    })).catch(errors => {
      console.log(errors);
    })


  }, [allValues.idSubscriber, allValues.idProfile])


  return (

    <>
      <SweetAlert
        custom
        show={isLoading}
        style={{ width: 150, height: 150 }}
        showConfirm={false}
        customIcon={images.loading}
        title=""
      >
        {t("loading")}
      </SweetAlert>

      <Modal
        title={t("subscription_94")}
        visible={isModalVisible}
        cancelText={t("cancel")}
        onCancel={closeModal}
        footer={false}
        bodyStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >

        <Select
          style={{ width: 240 }}
          onChange={handleChange}
          showSearch
        >
          {allValues.listDealer.map(item => <Option value={item.key}>{item.value}</Option>)}
        </Select>
      </Modal>


      <div className="ibox float-e-margins">
        <div className="ibox-content" style={{ paddingLeft: 35, paddingRight: 35, borderWidth: ' 4px 0px 0px ', borderColor: '#e7eaec' }}>
          <Row style={{ textAlign: "right", marginTop: 5, marginBottom: 0 }}>
            <Button className="btn btn-primary btn-sm" onClick={() => onClickAdd()}><i className="fa fa-plus"></i>{' '}Add</Button>
          </Row>

          <Row>

            <MemoTable
              printCertificate={(ele) => printCertificate(ele)}
              editCallback={(ele) => editCallback(ele)}
            />
          </Row>



        </div>
      </div>

    </>
  )
}

const MemoTable = React.memo((props) => {

  // console.log(' ----Render MemoTable ---- ')

  const { printCertificate, editCallback } = props

  const dataLogin = useSelector(state => state.signin.dataLogin);
  const idToken = getIdtoken(dataLogin)
  const redisKey = getRediskey(dataLogin)
  const userId = getUserId(dataLogin)

  const checkVisiblePrint = ele => get(ele, 'row.data.canPrintCertificate', '')

  const checkVisible = ele => {
    let itemStatusID = get(ele, 'row.data.itemStatusID', '')
    return (itemStatusID !== 0 && itemStatusID !== 3)
  }

  return <Table
    mode={"api"}
    serversideSource={ENDPOINT_BASE_URL + 'Subscription/RemoteGridView'}
    author={idToken}
    xAPIKey={redisKey}
    user_id={userId}
    table_id={4}
    showSetting={true}

    editing={{
      enabled: true,
      allowUpdating: false,
      allowDeleting: false
    }}

    // deleteCallback={(e) => this.deleteCallback(e)}
    // editCallback={(ele) => editCallback(ele)}
    autoExpandAll={false}
    key={"id"}
    columnCount="subscriberNo"
    customButton={[
      {
        hint: "view",
        icon: "fa fa-eye",
        visible: checkVisible,
        onClick: (ele) => editCallback(ele)
      },
      {
        hint: "Delete",
        icon: "trash",
        visible: checkVisible,
        onClick: (e) => {
          // do something ...
          this.deleteCallback(e)
        }
      }
    ]}
    column={[
      {
        column_name: 'dealerFullName',
        column_caption: "subscription_1",
      },
      {
        column_name: 'customerFullName',
        column_caption: "subscription_11",
      },
      {
        column_name: 'vehicleModel',
        column_caption: "subscription_15",
      },

      {
        column_name: 'chassisNo',
        column_caption: "subscription_16",
      },
      {
        column_name: 'engineNo',
        column_caption: "subscription_42"
      },
      {
        column_name: 'Payment_type',
        column_caption: "subscription_99"
      },
      {
        column_name: 'finance',
        column_caption: "realtime_157",

      }
      // {
      //   column_name: 'licensePlate',
      //   column_caption: "subscription_17",
      // },
      // {
      //   column_name: 'licensePlace',
      //   column_caption: "subscription_18",
      // },
      // {
      //   column_name: 'midNo',
      //   column_caption: "subscription_19",
      // },
      // {
      //   column_name: 'imei',
      //   column_caption: "subscription_20",
      // },
      // {
      //   column_name: 'simNo',
      //   column_caption: "subscription_21",
      // },
      // {
      //   column_name: 'simVendor',
      //   column_caption: "subscription_22",
      // },
      // {
      //   column_name: 'subscriptionStatus',
      //   column_caption: "subscriptionStatus",
      // },
      // {
      //   column_name: 'requireCertificate',
      //   column_caption: "subscription_23",

      // },
      // {
      //   column_name: 'subscriptionDate',
      //   column_caption: "history_66",
      //   column_render: (e) => !isEmpty(e.value) ? moment(e.value).format('DD/MM/YYYY HH:mm:ss') : '',

      // },

    ]}
  >
  </Table>


}, () => true)



export default Subscription

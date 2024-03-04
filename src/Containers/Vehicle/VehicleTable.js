import React, { Component, useState, Suspense } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Form } from 'antd'
import { get, isEmpty } from 'lodash'
// import './custom.css'
import './Styles/animation.css'
import './Styles/fontello-codes.css'
import './Styles/fontello-embedded.css'
import './Styles/fontello-ie7-codes.css'
import './Styles/fontello-ie7.css'
import './Styles/fontello.css'
import './font/fontello.eot'
import './font/fontello.svg'
import './font/fontello.ttf'
import './font/fontello.woff'
import './font/fontello.woff2'

import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css'
import 'moment/locale/th'
import VehicleActions from "../../Redux/VehicleRedux";
import Alert from '../../Components/Alert'
import FormInput from '../../Components/FormControls/FormInput'
import FormSelectSearch from '../../Components/FormControls/FormSelectSearch'
import FormSelectGroup from '../../Components/FormControls/Basic/FormSelectGroup'
import { ENDPOINT_BASE_URL } from '../../Config/app-config';
import { BoxContrainer, Button } from '../../components_new'

class VehicleTable extends Component {

  constructor(props) {
    super(props)
    this.state = {
      LicenseProvinceId: '-1',
      Tire: '-1',
      SellerId: '',
      CustomerName: '',
      IMEI: '',
      MID: '',
      LicensePlateNo: '',
      VehicleBrandName: '',
      VehicleModelName: '',
      VinNo: '',
      ChassisNo: '',
      EngineNo: '',
      Dealer: [],
      // list
      LicenseProvinceIdList: [],
      TireList: [
        {
          "key": -1,
          "value": 'ทั้งหมด'
        },
        {
          "key": -2,
          "value": 'ยังไม่ระบุ'
        },
        {
          "key": 0,
          "value": '0'
        },
        {
          "key": 2,
          "value": '2'
        },
        {
          "key": 4,
          "value": '4'
        },
        {
          "key": 6,
          "value": '6'
        },
        {
          "key": 10,
          "value": '10'
        },
        {
          "key": 14,
          "value": '14'
        },
        {
          "key": 18,
          "value": '18'
        },
        {
          "key": 22,
          "value": '22'
        },
      ],
      alertSetting: {
        show: false,
        type: 3,
        content: "",
        ErrorSubcode: 0
      },
    }
  }

  componentDidMount() {
    this.getSeller()
  }

  componentWillMount() {

    const { VehicleProvinceData } = this.props
    let data = JSON.parse(JSON.stringify(VehicleProvinceData))
    data.unshift({ key: -1, value: 'ทั้งหมด' })
    this.setState({ LicenseProvinceIdList: data })

  }

  setAlertSetting(isShow, type, content = "", ErrorSubcode) {
    let { alertSetting } = this.state
    alertSetting.show = isShow
    alertSetting.type = type
    alertSetting.content = content
    alertSetting.ErrorSubcode = ErrorSubcode
    this.setState({ alertSetting })
  }

  async getSeller() {
    try {
      var response = await fetch(`${ENDPOINT_BASE_URL}/ServiceContract/Yanmar/DropdownGroup?name=Seller`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': this.props.header.redisKey,
          'Accept-Language': this.props.language == 'ja' ? 'jp' : this.props.language
        }
      });

      var data = await response.json();
      let list = data.map(e => ({
        groupName: e.groupName,
        items: e.items,
        key: e.key, value: e.value
      }
      ))

      this.setState({
        Dealer: list
      })

    } catch (error) {
      console.log(error)
    }
  }


  checkData = (e) => {

    let value = e.trim()
    if (isEmpty(value) || value.length < 3) {

      return false

    } else {


      return true
    }

  }

  checkDataSelect = (e) => {
    return true
  }

  searchForm = () => {

    const { LicenseProvinceId, Tire, SellerId, CustomerName,
      IMEI, MID, LicensePlateNo, VehicleBrandName, VehicleModelName, VinNo, ChassisNo, EngineNo
    } = this.state
    const data = {
      SellerId,
      CustomerName,
      VinNo,
      ChassisNo,
      EngineNo,
      VehicleModelName,
      IMEI
    }

    if (this.checkDataSelect(LicenseProvinceId) || this.checkDataSelect(Tire) || this.checkData(SellerId) || this.checkData(CustomerName) ||
      this.checkData(IMEI) || this.checkData(MID) || this.checkData(LicensePlateNo) || this.checkData(VehicleBrandName) || this.checkData(VehicleModelName)
      || this.checkData(VinNo) || this.checkData(ChassisNo) || this.checkData(EngineNo)) {

      this.props.data(data)

    } else {

      this.setAlertSetting(true, 4, "vehicle_10")
      // Must have at least 1 field and at least 3 characters
    }



  }


  render() {

    const { header, dataLogin } = this.props
    const { LicenseProvinceId, LicenseProvinceIdList, Tire, TireList, CustomerName,
      IMEI, MID, LicensePlateNo, VehicleBrandName, VehicleModelName, VinNo, ChassisNo, EngineNo,
      alertSetting, Dealer

    } = this.state
    return (
      <BoxContrainer footer={
        <div className="row" style={{ textAlign: "right" }}>
          <Button
            isSearchButton={true}
            onClick={() => {
              this.searchForm()
              this.getSeller()
            }}
          />
        </div>
      }>
        <Alert
          setting={alertSetting}
          onConfirm={() => {
            alertSetting.show = false

            this.setState({ alertSetting })
          }}
          onCancel={() => {
            // alertSetting.show = false
            // this.setState({ alertSetting })
          }}
        />
        <Row>
          <Col lg={12} md={12}>
            <FormInput
              schema={{ "required": [""] }}
              value={IMEI}
              label={"current_imei"}
              placeholder={"current_imei"}
              fieldForm={"IMEI"}
              onChange={(e) => {
                this.setState({ IMEI: e.target.value })
              }}
            />
          </Col>
          <Col lg={12} md={12}>
            <FormSelectGroup
              schema={{ "required": "" }}
              mode={"single"}
              value={this.state.SellerId}
              label={"dealer"}
              list={Dealer}
              placeholder={"dealer"}
              flex={1}
              onChange={(e, value) => {
                this.setState({ SellerId: e })
                console.log("SellerId", e)
              }}
            />
          </Col>
          <Col lg={12} md={12}>
            <FormInput
              schema={{ "required": [""] }}
              value={CustomerName}
              label={"user_46"}
              placeholder={"user_46"}
              fieldForm={"CustomerName"}
              onChange={(e) => {
                this.setState({ CustomerName: e.target.value })
              }}
            />
          </Col>
          <Col lg={12} md={12}>
            <FormInput
              schema={{ "required": [""] }}
              value={VinNo}
              label={"vinno"}
              placeholder={"vinno"}
              fieldForm={"VinNo"}
              onChange={(e) => {
                this.setState({ VinNo: e.target.value })
              }}
            />
          </Col>
          <Col lg={12} md={12}>
            <FormInput
              schema={{ "required": [""] }}
              value={EngineNo}
              label={"my_vehicles_67"}
              placeholder={"my_vehicles_67"}
              fieldForm={"EngineNo"}
              onChange={(e) => {
                this.setState({ EngineNo: e.target.value })
              }}
            />
          </Col>
          <Col lg={12} md={12}>
            <FormInput
              schema={{ "required": [""] }}
              value={VehicleModelName}
              label={"my_vehicles_78"}
              placeholder={"my_vehicles_78"}
              fieldForm={"VehicleModelName"}
              onChange={(e) => {
                this.setState({ VehicleModelName: e.target.value })
              }}
            />
          </Col>
        </Row>
      </BoxContrainer>


    )
  }
}






const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  VehicleProvinceData: state.dropdown.VehicleProvinceData,
});

const mapDispatchToProps = (dispatch) => ({
  setPersonalIdSelect: (personalId, action) => dispatch(VehicleActions.setPersonalIdSelect(personalId, action)),
  deleteVehicle: (id) => dispatch(VehicleActions.deleteVehicle(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(VehicleTable)

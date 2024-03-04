import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import DealerActions from '../../Redux/DealerRedux'
import FormValidateActions from '../../Redux/FormValidateRedux'

import GenerateForm from 'react-form-generator-from-json'
import {
  Container, Row, Card, Col, Form,
  Input, Button, CardImg,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
  ButtonGroup, Label
} from 'reactstrap'

import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css'

import moment from 'moment'

// import './styles/style.css'

import PannelBox from '../../Components/PannelBox'
import SaveButton from '../../Components/SaveButton'
import CancelButton from '../../Components/CancelButton'

import FormGenerator from '../../Components/FormGenerator/Form'
import { formValidation } from "../../Components/FormGenerator/validate";

const getOrderDay = (rowData) => {
  return (new Date(rowData.OrderDate)).getDay();
};
let INITIAL_STATE = {
  userName: null,
  fullName: null,
  aliasName: null,
  email: null,
  temporaryPassword: null,
  businessPartnerId: null,
}
const saleAmountEditorOptions = { format: 'currency', showClearButton: true };

class AddDealerAdmin extends Component {

  constructor(props) {
    super(props)

    this.state = {
      lang: 'en',
      mainTitle: {
        en: 'Dealer Admin',
        th: 'หัวหน้า ตัวแทนจำหน่าย'
      },


      // -----------------------
      formInfo: {
        "title": "Add Dealer Admin",
        "showHeaderTitle": true,
        "formName": "customerInfo",
        "girdFormColumn": 2,
        "fieldRow": [
          {
            "properties": {
              "username": {
                "type": "string",
                "title": "Username",
                "required": true,
                "maxLength": 50
              },
              "password": {
                "type": "password",
                "title": "Temporary Password",
                "required": true,
                "maxLength": 50
              }
            }
          },
          {
            "properties": {
              "fullName": {
                "type": "string",
                "title": "Full Name",
                "required": true,
                "maxLength": 100
              },
              "aliasName": {
                "type": "string",
                "title": "Alias Name",
                "maxLength": 100
              }
            }
          },
          {
            "properties": {
              "email": {
                "type": "email",
                "title": "E-mail",
                "required": true,
                "maxLength": 50

              }
            }
          }
        ]
      },
      data: {
        username: "",
        fullName: "",
        aliasName: "",
        email: "",
        password: "",
        businessPartnerId: 0
      }

    }
    // this.normalForm = React.createRef()
    // this.handleChange = this.handleChange.bind(this)
    // this.dataGrid = React.createRef();
  }


  componentDidMount() {
    let url = window.location.href;
    let strID = url.substring(url.lastIndexOf('?') + 1);
    if (strID.includes('id')) {
      let id = strID.substring(3, strID.length)
      this.state.data.businessPartnerId = parseInt(id)
    }

  }




  onclk(e) {
    if (e.target.id === 'cancel') {
      document.getElementById('form1').reset()
      document.getElementById('form1.1').reset()
    } else {
      // this.props.addDealerAdmin(this.state.dataDefault, 'hino/accounts/dealers-admin')
    }

  }


  onClickSubmit() {
    this.props.setErrorList(true)

    // Form Validate
    let formData = formValidation([this.state.formInfo])

    // Set Form Data
    for (let props in this.state.data) {
      if (props !== 'businessPartnerId') {
        let value = formData[props]
        if (value === undefined) value = ""
        this.state.data[props] = value
      }


    }


    setTimeout(() => this.submitData(), 500)
  }

  onClickCancel() {
    this.props.history.push("/dealer")
  }


  submitData() {
    if (this.props.isValid) {
      console.log("OKKKKK")
      this.props.createDealerAdmin(this.state.data)

    }
    else {
      console.log("ERROR")
    }
  }


  render() {
    const { component: Component, ...rest } = this.props
    return (
      <PannelBox title={this.state.mainTitle[this.state.lang]} {...rest}>

        <Row>
          <Col lg={12}>
            <FormGenerator schema={this.state.formInfo}  {...rest} />
          </Col>
        </Row>
        <div style={{ minHeight: '1rem' }}></div>

        <div className="hr-line-dashed" />
        <div className="row" style={{ textAlign: "right" }}>
          <CancelButton loading={false} onClick={() => {
            this.onClickCancel()
          }} />
          <SaveButton loading={this.props.loading} onClick={() => {
            //   this.setState({ loading: true })
            this.onClickSubmit()
          }} />
        </div>

      </PannelBox>
    )
  }
}


const mapStateToProps = (state) => ({

  loading: state.dealer.loading,
  isValid: state.formValidate.isValid,
});

const mapDispatchToProps = (dispatch) => ({

  createDealerAdmin: (data) => dispatch(DealerActions.createDealerAdmin(data)),
  setErrorList: (data) => dispatch(FormValidateActions.setErrorList(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(AddDealerAdmin)

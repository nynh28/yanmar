import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'
import DateRangePicker from "react-bootstrap-daterangepicker";
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import Dropdown from 'react-dropdown';
import Modal from 'react-awesome-modal';
import 'react-dropdown/style.css';
import '../styles.css'
import { Select } from 'antd';
import { t } from '../../../../Components/Translation'
import FormInput from '../../../../Components/FormControls/FormInput'
import FormLabel from '../../../../Components/FormControls/FormLabel'
import FormSelectSearch from '../../../../Components/FormControls/FormSelectSearch'
import FormDatepicker from '../../../../Components/FormControls/FormDatepicker'
import FormRadio from '../../../../Components/FormControls/FormRadio'
import FormUpload from '../../../../Components/FormControls/FormUpload'

registerPlugin(FilePondPluginFileValidateType);

const { Option } = Select;

// Define a custom component for handling the root position object ?
class BasicData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.formData
    };
    this.onChangeDate = this.onChangeDate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.formData
    })
  }

  onChange(name, nativeElement = true) {
    return (event) => {
      let value = nativeElement ? event.target.value : event.label

      !nativeElement && this.setState({ [name + "_value"]: event.value }, () => this.props.onChange(this.state));

      this.setState({
        [name]: value
      }, () => this.props.onChange(this.state));
    };
  }

  //#region  DATE PICKER
  onChangeDate(name, value) {
    let sta = { [name]: value }
    this.setState(sta, () => this.props.onChange(this.state));
  }

  onChangeInputDate(fieldForm) {
    this.setState({
      [fieldForm]: this.state[fieldForm]
    }, () => this.props.onChange(this.state));
  }

  //#endregion

  handleInitFilePond() {
    // console.log("FilePond instance has initialised", this.pond);
  }

  setHeaderSection(title, showLine = true) {
    return <div>
      {showLine && <div className="hr-line-dashed" />}
      <h3>{title}</h3>
      <div style={{ minHeight: '2rem' }}></div>
    </div>
  }


  onCheckedButton(isActive, fieldForm) {
    this.setState({
      [fieldForm]: isActive
    }, () => this.props.onChange(this.state));

  }

  render() {
    const {
      ownerPartnerType,
      ownerPartner,
      userLevel,
      userToken,
      displayName,
      username,
      password,
      confirmPassword,
      mobile,
      email,
      lineId,
      expiredDate,
      isActive,
      defaultLanguage,
      attachCode,
      attachInfo

    } = this.state
    const { schema } = this.props

    return (
      <Suspense fallback={null}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 2 }}>
            <Row>
              <Col lg={6} md={12}>
                <FormSelectSearch
                  mode={"single"}
                  schema={schema}
                  value={ownerPartnerType}
                  label={schema.label.ownerPartnerType}
                  list={schema.list.ownerPartnerType}
                  fieldForm={"ownerPartnerType"}
                  placeholder={"user_45"}
                  flex={1}
                  onChange={(selected) => {
                    this.setState({
                      ["ownerPartnerType"]: selected || []
                    }, () => this.props.onChange(this.state));
                  }}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormSelectSearch
                  mode={"single"}
                  schema={schema}
                  value={ownerPartner}
                  label={schema.label.ownerPartner}
                  list={schema.list.ownerPartner}
                  fieldForm={"ownerPartner"}
                  placeholder={"user_46"}
                  flex={1}
                  onChange={(selected) => {
                    this.setState({
                      ["ownerPartner"]: selected || []
                    }, () => this.props.onChange(this.state));
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col lg={6} md={12}>
                <FormSelectSearch
                  id={"userLevel"}
                  name={"userLevel"}
                  mode={"single"}
                  schema={schema}
                  value={userLevel}
                  label={schema.label.userLevel}
                  list={schema.list.userLevel}
                  fieldForm={"userLevel"}
                  placeholder={"user_47"}
                  flex={1}
                  onChange={(selected) => {
                    this.setState({
                      ["userLevel"]: selected || []
                    }, () => this.props.onChange(this.state));
                  }}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormLabel
                  schema={schema}
                  value={userToken}
                  label={schema.label.userToken}
                  flex={1}
                />
              </Col>
            </Row>

            <Row>
              <Col lg={6} md={12}>
                <FormInput
                  schema={schema}
                  value={displayName}
                  label={schema.label.displayName}
                  fieldForm={"displayName"}
                  placeholder={"user_49"}
                  flex={1}
                  onChange={this.onChange("displayName")}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormInput
                  schema={schema}
                  value={username}
                  label={schema.label.username}
                  fieldForm={"username"}
                  placeholder={"user_50"}
                  flex={1}
                  onChange={this.onChange("username")}
                />
              </Col>
            </Row>

            {/* <Row>
              <Col lg={6} md={12}>
                <FormInput
                  type="password"
                  schema={schema}
                  value={password}
                  label={schema.label.password}
                  fieldForm={"password"}
                  placeholder={"user_51"}
                  flex={1}
                  onChange={this.onChange("password")}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormInput
                  type="password"
                  schema={schema}
                  value={confirmPassword}
                  label={schema.label.confirmPassword}
                  fieldForm={"confirmPassword"}
                  placeholder={"user_52"}
                  flex={1}
                  onChange={this.onChange("confirmPassword")}
                />
              </Col>
            </Row> */}

            <Row>
              <Col lg={6} md={12}>
                <FormInput
                  schema={schema}
                  value={mobile}
                  label={schema.label.mobile}
                  fieldForm={"mobile"}
                  placeholder={"user_53"}
                  flex={1}
                  onChange={this.onChange("mobile")}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormInput
                  type="email"
                  schema={schema}
                  value={email}
                  label={schema.label.email}
                  fieldForm={"email"}
                  placeholder={"user_54"}
                  flex={1}
                  onChange={this.onChange("email")}
                />
              </Col>
            </Row>

            <Row>
              <Col lg={6} md={12}>
                <FormInput
                  schema={schema}
                  value={lineId}
                  label={schema.label.lineId}
                  fieldForm={"lineId"}
                  placeholder={"user_55"}
                  flex={1}
                  onChange={this.onChange("lineId")}
                />

              </Col>
              <Col lg={6} md={12}>
                <FormDatepicker
                  schema={schema}
                  value={expiredDate}
                  label={schema.label.expiredDate}
                  fieldForm={"expiredDate"}
                  placeholder={"user_56"}
                  flex={1}
                  onChange={this.onChangeDate}
                />
              </Col>
            </Row>

            <Row>
              <Col lg={6} md={12}>
                <FormRadio
                  schema={schema}
                  value={isActive}
                  label={schema.label.isActive}
                  fieldForm={"isActive"}
                  flex={1}
                  onClick={(isActive, fieldForm) => {
                    this.onCheckedButton(isActive, fieldForm)
                  }}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormSelectSearch
                  mode={"single"}
                  schema={schema}
                  value={defaultLanguage}
                  label={schema.label.defaultLanguage}
                  list={schema.list.defaultLanguage}
                  fieldForm={"defaultLanguage"}
                  placeholder={"user_27"}
                  flex={1}
                  onChange={(selected) => {
                    this.setState({
                      ["defaultLanguage"]: selected || []
                    }, () => this.props.onChange(this.state));
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col lg={6} md={12}>
                <FormUpload
                  // action="Upload"
                  schema={{ "required": [""] }}
                  fieldForm="avartar"
                  listType="picture-card"
                  endPoint="UserManage/Files/Avatar"
                  label={schema.label.avartar}
                  attachCode={attachCode}
                  attachInfo={attachInfo}
                  response={(res) => {
                    if (res.status) {
                      this.setState({
                        ["attachInfo"]: res.attachInfo,
                        ["attachCode"]: res.attachInfo.attachCode
                      }, () => this.props.onChange(this.state))
                    }
                  }}
                />
              </Col>
            </Row>
          </div>
        </div >
      </Suspense>
    )
  }
}

const mapStateToProps = (state) => ({
  header: state.signin.header
});
const mapDispatchToProps = (dispatch) => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(BasicData)

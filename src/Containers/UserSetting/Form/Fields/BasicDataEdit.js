import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import UserActions from '../../../../Redux/UserRedux'
import { Row, Col } from 'reactstrap'
import { FilePond } from 'react-filepond';
import 'react-dropdown/style.css';
import '../styles.css'
import SaveButton from '../../../../Components/SaveButton'
import { Popconfirm, message } from 'antd';
import FormInput from '../../../../Components/FormControls/FormInput'
import FormLabel from '../../../../Components/FormControls/FormLabel'
import FormSelectSearch from '../../../../Components/FormControls/FormSelectSearch'
import FormSelectGroup from '../../../../Components/FormControls/FormSelectGroup'
import FormDatepicker from '../../../../Components/FormControls/FormDatepicker'
import FormRadio from '../../../../Components/FormControls/FormRadio'
import Alert from '../../../../Components/Alert'
import FormUpload from '../../../../Components/FormControls/FormUpload'
import { Button } from 'antd';
import { t } from '../../../../Components/Translation'
// Define a custom component for handling the root position object ?
class BasicDataEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.formData,
      alertSetting: {
        show: false,
        submitTitle: "",
        type: 3,
        content: "",
        ErrorSubcode: 0
      }
    };
    this.onChangeDate = this.onChangeDate.bind(this)
    this.isCanResetPassword = false
    this.isCanUnlockUser = false

  }

  componentWillMount() {
    //#region check permission for Reset password / Unlock user
    if (this.props.dataLogin.userActions) {
      let isResetPassword = this.props.dataLogin.userActions.find(x => x.actionId == 6 && x.actionLevelMax == 2);
      let isUnlock = this.props.dataLogin.userActions.find(x => x.actionId == 7 && x.actionLevelMax == 2);
      if (isResetPassword !== undefined) this.isCanResetPassword = true
      if (isUnlock !== undefined) this.isCanUnlockUser = true
    }
    //#endregion
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.formData
    })
  }

  componentDidUpdate(prevProps) {
    let { alertSetting } = this.state
    let { submitStatusResetAndUnlocked } = this.props
    if (prevProps.submitStatusResetAndUnlocked !== submitStatusResetAndUnlocked) {
      let isSuccess = submitStatusResetAndUnlocked.status ? true : false
      let content = ""
      if (isSuccess) {
        content = alertSetting.submitTitle === "ResetPassword" ? "Reset password successed" : "Unlock password successed"
      }
      else {
        content = alertSetting.submitTitle === "ResetPassword" ? "Reset password failed" : "Unlock password failed"
      }

      this.setAlertSetting(true,
        submitStatusResetAndUnlocked.status ? 1 : 2,
        content,
        submitStatusResetAndUnlocked.ErrorSubcode
      )
    }
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

  setAlertSetting(isShow, type, content = "", submitTitle, ErrorSubcode) {
    let { alertSetting } = this.state
    alertSetting.submitTitle = submitTitle
    alertSetting.show = isShow
    alertSetting.type = type
    alertSetting.content = content
    alertSetting.ErrorSubcode = ErrorSubcode
    this.setState({ alertSetting })
  }

  render() {
    const {
      ownerPartnerTypeName,
      ownerPartnerName,
      userLevelName,
      userToken,
      displayName,
      username,
      mobile,
      email,
      lineId,
      expiredDate,
      loginFailedCount,
      isLocked,
      isActive,
      defaultLanguage,
      attachCode,
      attachInfo,
      alertSetting
    } = this.state
    const { schema } = this.props

    return (
      <Suspense fallback={null}>
        <Alert
          setting={alertSetting}
          onConfirm={() => {
            if (alertSetting.type === 1 || alertSetting.type === 2) {
              alertSetting.show = false
              this.setState({ alertSetting })
            }
            else if (alertSetting.submitTitle === "ResetPassword") {
              this.setAlertSetting(true, 6, "", "ResetPassword")
              this.props.resetAndUnlock("AdminResetPassword", this.props.id)
            }
            else {
              this.setAlertSetting(true, 6, "", "AdminUnlock")
              this.props.resetAndUnlock("AdminUnlock", this.props.id)
            }
          }}
          onCancel={() => {
            alertSetting.show = false
            this.setState({ alertSetting })
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 2 }}>

            <Row>
              <Col lg={6} md={12}>
                <FormLabel
                  schema={schema}
                  value={ownerPartnerTypeName}
                  label={schema.label.ownerPartnerType}
                  flex={1}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormLabel
                  schema={schema}
                  value={ownerPartnerName}
                  label={schema.label.ownerPartner}
                  flex={1}
                />
              </Col>
            </Row>

            <Row>
              <Col lg={6} md={12}>
                <FormLabel
                  schema={schema}
                  value={userLevelName}
                  label={schema.label.userLevel}
                  flex={1}
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
                <FormLabel
                  schema={schema}
                  value={username}
                  label={schema.label.username}
                  flex={1}
                />
              </Col>
            </Row>

            {
              this.isCanResetPassword && <Row>
                <Col lg={6} md={12}>
                  <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
                    <label className="control-label" style={{ fontWeight: 500 }}>{t(schema.label.resetPassword)}</label>
                    <div>
                      <Button
                        style={{ width: 100 }}
                        onClick={() => {
                          this.setAlertSetting(true, 3, "reset password ?", "ResetPassword")
                        }}
                      >{t("reset")}</Button>
                    </div>
                  </div>
                </Col>
              </Row>
            }


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
                <FormLabel
                  schema={schema}
                  value={loginFailedCount}
                  label={schema.label.loginFailedCount}
                  flex={1}
                />
              </Col>
              <Col lg={6} md={12}>
                <div style={{ display: 'flex', flexDirection: 'row', flex: 1, flexGrow: 1 }}>
                  <FormLabel
                    schema={schema}
                    value={isLocked ? "Yes" : "No"}
                    label={schema.label.isLocked}
                    flex={isLocked ? 5 : 1}
                  />

                  {/* <Button>Unlocked</Button> */}

                  {/* {
                  isLocked &&
                  <Popconfirm
                    placement="top"
                    title={"Are you sure you want to unlock ?"}
                    onConfirm={() => {
                      this.setState({
                        ["isLocked"]: false
                      }, () => this.props.onChange(this.state));
                      this.props.resetAndUnlock("AdminUnlock", this.props.id)
                    }}
                    okText="Yes" cancelText="No">
                    <SaveButton
                      className="btn btn-default form-control"
                      name="Unlocked"
                      size="sm" style={{ marginTop: 23, backgroundColor: "#c2c2c2", color: "#FFF" }}
                    />
                  </Popconfirm>
                } */}
                  {
                    this.isCanUnlockUser && isLocked &&
                    <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1, marginTop: 28 }}>
                      <Button
                        style={{ width: 100 }}
                        onClick={() => {
                          this.setAlertSetting(true, 3, "unlock ?", "AdminUnlock")
                        }}
                      >{t("unlocked")}</Button>
                    </div>
                  }
                </div>
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
                  schema={{ "required": [""] }}
                  fieldForm="avartar"
                  listType="picture-card"
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
        </div>
      </Suspense>
    )
  }
}

const mapStateToProps = (state) => ({
  header: state.signin.header,
  id: state.user.id,
  submitStatusResetAndUnlocked: state.user.submitStatusResetAndUnlocked,
  dataLogin: state.signin.dataLogin
});
const mapDispatchToProps = (dispatch) => ({
  resetAndUnlock: (name, id) => dispatch(UserActions.resetAndUnlock(name, id))
});
export default connect(mapStateToProps, mapDispatchToProps)(BasicDataEdit)
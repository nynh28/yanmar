import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import { Row, ButtonGroup, Button, Col } from 'reactstrap'
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import Modal from 'antd';
import 'react-dropdown/style.css';
import '../styles.css'
import { Input } from 'reactstrap'
import { Popconfirm, Select } from 'antd';
import { t } from '../../../../Components/Translation'
import SaveButton from '../../../../Components/SaveButton'
import FormInput from '../../../../Components/FormControls/FormInput'
import FormTextArea from '../../../../Components/FormControls/FormTextArea'
import FormLabel from '../../../../Components/FormControls/FormLabel'
import FormSelectSearch from '../../../../Components/FormControls/FormSelectSearch'
import FormSelectGroup from '../../../../Components/FormControls/FormSelectGroup'
import FormDatepicker from '../../../../Components/FormControls/FormDatepicker'
import FormRadio from '../../../../Components/FormControls/FormRadio'
import FormUpload from '../../../../Components/FormControls/FormUpload'
import LaddaButton, { S, SLIDE_LEFT } from 'react-ladda';
import { select } from 'redux-saga/effects';
import AlertSettingActions from "../../../../Redux/AlertSettingRedux";
// import '../styles.css'

// Define a custom component for handling the root position object
class AlertSettingData extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      ...props.formData,
      // inputTypeChange: props.schema.inputTypeChange,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    this.setState({
      ...nextProps.formData,
    },() => {
      console.log(this.state)
    })
    console.log(this.state)
  }

  modalOpening = (e) => this.setState(state => ({ viewImg: !state.viewImg }))

  handleInitFilePond() {
    // console.log("FilePond instance has initialised", this.pond);
  }

  onChange(name, nativeElement = true) {
    // console.log(this.state)
    return (event) => {
      // if (name == 'coordinates') {
      // this.validate(name,event.target.value)
      // }
      // else{
      console.log(event)
      let value = nativeElement ? event.target.value : event.label
      console.log(event.target)
      // console.log(event.label)
      console.log(value)
      // console.log(name)

      !nativeElement && this.setState({ [name + "_value"]: event.value }, () => this.props.onChange(this.state));

      this.setState({
        [name]: value
      }, () => this.props.onChange(this.state));
      // }
    };
  }

  onChangeCriteria(name, index, nativeElement = true) {
    // console.log(this.state)
    return (event) => {
      // if (name == 'coordinates') {
      // this.validate(name,event.target.value)
      // }
      // else{
      let { alert_setting_criteria } = JSON.parse(JSON.stringify(this.state))
      // let criteria = JSON.parse(JSON.stringify(this.state.alert_setting_criteria))
      console.log(event.target.value)
      // console.log(this.state.alert_setting_criteria)
      console.log(index)
      console.log(alert_setting_criteria[index].criteria_value)

      alert_setting_criteria[index].criteria_value = event.target.value
      let value = nativeElement ? event.target.value : event.label

      // this.state.alert_setting_criteria[index].criteria_value = event.target.value
      // criteria = event.target.value

      console.log(alert_setting_criteria)
      // console.log(criteria)

      this.setState({
        alert_setting_criteria: alert_setting_criteria
        // [name]: value
      }, () => {
      this.props.onChange(this.state)
      })
    };
  }

  onCheckedButton(isActive, fieldForm) {
    this.setState({
      [fieldForm]: isActive
    }, () => this.props.onChange(this.state));

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

  setFormRadio(schema, value, fieldNameLabel, fieldForm, flex) {

    return <div className="form-group field field-string" style={{ padding: '0 10px', flex: flex || 1 }}>
      <label className="control-label" style={{ fontWeight: 500 }}>
        {schema.label && fieldNameLabel + " :"}
        {
          schema.required && schema.required.includes(fieldForm) &&
          <span className="required">*</span>
        }
      </label>

      <div>
        <ButtonGroup style={{ zIndex: 1 }}>
          <Button
            className='button-radio-checkbox'
            onClick={(e) => {
              this.onCheckedButton(false, fieldForm)
            }}
            active={value === false}
          >No</Button>
          <Button
            className='button-radio-checkbox'
            onClick={(e) => {
              this.onCheckedButton(true, fieldForm)
            }}
            active={value === true}
          >Yes</Button>
        </ButtonGroup>
      </div>
    </div>
  }

  render() {
    const {
      owner_partner_id,
      alert_type,
      alert_name,
      criteria,
      alert_setting_criteria,
    } = this.state;
    const { schema } = this.props;

    return (
      <Suspense fallback={null}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 2 }}>
            {/* <Button className="btn btn-default" size="sm" >Create User</Button> */}
            <Row>
              <Col lg={6} md={12}>
                <FormSelectSearch
                  mode={"single"}
                  schema={schema}
                  value={owner_partner_id}
                  label={schema.label.ownerPartnerName}
                  list={schema.list.ownerPartnerNav}
                  fieldForm={"owner_partner_id"}
                  placeholder={"Select your's Owner Partner"}
                  flex={1}
                  onChange={(selected) => {
                    this.setState({
                      ["owner_partner_id"]: selected
                    }, () => this.props.onChange(this.state));
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col lg={6} md={12}>
                <FormSelectSearch
                  mode={"single"}
                  schema={schema}
                  value={alert_type}
                  label={schema.label.alert_type}
                  list={schema.list.alertTypeNav}
                  fieldForm={"alert_type"}
                  placeholder={"Select your's Alert Type"}
                  flex={1}
                  onChange={(selected) => {
                    this.props.getCriteria(selected)
                    this.setState({
                      ["alert_type"]: selected
                    }, () => this.props.onChange(this.state));
                  }}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormInput
                  schema={schema}
                  value={alert_name}
                  label={schema.label.alert_name}
                  fieldForm={"alert_name"}
                  placeholder={""}
                  // disabled={true}
                  flex={1}
                  onChange={this.onChange("alert_name")}
                />
              </Col>
            </Row>
            {
              console.log(this.state.alert_setting_criteria != undefined)
            }

            {
              console.log(this.state.alert_setting_criteria)
            }

            {
              this.state.alert_setting_criteria != undefined && this.state.alert_setting_criteria.map((e,i) => {
                console.log(e.criteria_name)
                return(
                  
                  <Row>
                    <Col lg={4}>
                      <FormLabel label={"criteria_name"} value={e.criteria_name + ' ' + e.criteria_prefix} flex={1}/>
                    </Col>
                    <Col lg={4} md={12}>
                      <FormInput
                        schema={schema}
                        // this.state.alert_setting_criteria[i]
                        value={e.criteria_value}
                        label={e.criteria_name}
                        fieldForm={"criteria_value"}
                        placeholder={""}
                        // disabled={true}
                        flex={1}
                        onChange={this.onChangeCriteria("criteria_value",i)}
                      />
                    </Col>
                    <Col lg={4}>
                      <FormLabel value={e.criteria_sufffix} flex={1}/>
                    </Col>
                    
                  </Row>
                )
              })
              
            }

           

          </div>
        </div>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  header: state.signin.header,
  // alert_setting_criteria: state.alertSetting.alert_setting_criteria,
  // driverProfile: state.driver.driverProfile,
  // loadingCheck: state.driver.loadingCheck,
  // formAction: state.driver.formAction,
  // driverExisting: state.driver.driverExisting,
});
const mapDispatchToProps = (dispatch) => ({
  getCriteria: (id) => dispatch(AlertSettingActions.getCriteria(id)),
  // getExistingDriver: (personalId, customerId) => dispatch(DriverActions.getExistingDriver(personalId, customerId)),
  // getDriverProfile: (personalId) => dispatch(DriverActions.getDriverProfile(personalId)),
  // setPersonalIdSelect: (personalId, action) => dispatch(DriverActions.setPersonalIdSelect(personalId, action)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AlertSettingData)




import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import '../../../../i18n'

import { Row, ButtonGroup, Button, Col } from 'reactstrap'
import DateRangePicker from "react-bootstrap-daterangepicker";
import DataGrid, { Column, Paging, Selection, Editing } from 'devextreme-react/data-grid';
import { FilePond } from 'react-filepond';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../styles.css'
import Tabbed from '../../../../Components/Tabbed'
import FormInput from '../../../../Components/FormControls/FormInput'
import FormLabel from '../../../../Components/FormControls/FormLabel'
import FormSelectSearch from '../../../../Components/FormControls/FormSelectSearch'
import FormSelectGroup from '../../../../Components/FormControls/FormSelectGroup'
import FormDatepicker from '../../../../Components/FormControls/FormDatepicker'
import FormRadio from '../../../../Components/FormControls/FormRadio'

import { t } from '../../../../Components/Translation'
// Define a custom component for handling the root position object ?
class SearchData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.formData
    };
    this.onCheckedButton = this.onCheckedButton.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.formData
    })
  }

  componentDidUpdate(prevProps) {
    let { language } = this.props
    if (prevProps.language !== language) {
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

  onCheckedButton(isActive, fieldForm) {
    this.setState({
      [fieldForm]: isActive
    }, () => this.props.onChange(this.state));
  }


  render() {
    const {
      ownerPartnerType,
      ownerPartnerName,
      roleName,
      action,
      permission,
      master,
      active
    } = this.state
    const { schema, dataLogin } = this.props

    console.log(schema)

    return (<div>
      <Suspense fallback={null}>
        <div>
          <div>
            {dataLogin.userLevelId !== 41 && dataLogin.userLevelId !== 42 && <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
              <FormSelectSearch
                mode={"multiple"}
                schema={schema}
                value={ownerPartnerType}
                label={schema.label.ownerPartnerType}
                list={schema.list.ownerPartnerType}
                fieldForm={"ownerPartnerType"}
                placeholder={"Owner Partnet Type"}
                flex={1}
                onChange={(selected) => {
                  this.setState({
                    ["ownerPartnerType"]: selected
                  }, () => this.props.onChange(this.state));
                }}
              />

              <FormSelectGroup
                schema={schema}
                value={ownerPartnerName}
                label={schema.label.ownerPartnerName}
                list={schema.list.ownerPartnerName}
                fieldForm={"ownerPartnerName"}
                placeholder={"Owner Partner Name"}
                flex={1}
                onChange={(selected) => {
                  this.setState({
                    ["ownerPartnerName"]: selected
                  }, () => this.props.onChange(this.state));
                }}
              />
            </div>}

            <div style={{ display: 'flex', flexDirection: 'row' }}>


              <FormSelectSearch
                mode={"multiple"}
                schema={schema}
                value={roleName}
                label={schema.label.roleName}
                list={schema.list.roleName}
                fieldForm={"roleName"}
                placeholder={"Role Name"}
                flex={1}
                onChange={(selected) => {
                  this.setState({
                    ["roleName"]: selected
                  }, () => this.props.onChange(this.state));
                }}
              />

              <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>

                <FormRadio
                  schema={schema}
                  value={master}
                  label={schema.label.master}
                  fieldForm={"master"}
                  flex={1}
                  onClick={(isActive, fieldForm) => {
                    this.onCheckedButton(isActive, fieldForm)
                  }}
                />
                <FormRadio
                  schema={schema}
                  value={active}
                  label={schema.label.active}
                  fieldForm={"active"}
                  flex={1}
                  onClick={(isActive, fieldForm) => {
                    this.onCheckedButton(isActive, fieldForm)
                  }}
                />
              </div>
              {/* <FormSelectGroup
                mode={"multiple"}
                schema={schema}
                value={action}
                label={schema.label.action}
                list={schema.list.action}
                fieldForm={"action"}
                placeholder={"ph_action"}
                flex={1}
                onChange={(selected) => {
                  this.setState({
                    ["action"]: selected
                  }, () => this.props.onChange(this.state));
                }} */}
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ display: 'flex', flex: 0.5 }}>
                <div style={{ display: 'flex', flex: 0.25 }}>
                  {/* <FormRadio
                    schema={schema}
                    value={permission}
                    label={schema.label.permission}
                    fieldForm={"permission"}
                    flex={1}
                    onClick={(isActive, fieldForm) => {
                      this.onCheckedButton(isActive, fieldForm)
                    }}
                  /> */}


                </div>
                <div style={{ display: 'flex', flex: 0.25 }}>
                  {/* <FormRadio
                    schema={schema}
                    value={master}
                    label={schema.label.master}
                    fieldForm={"master"}
                    flex={1}
                    onClick={(isActive, fieldForm) => {
                      this.onCheckedButton(isActive, fieldForm)
                    }}
                  /> */}
                </div>
              </div>
              <div style={{ display: 'flex', flex: 0.5 }}>

              </div>
            </div>
          </div>
        </div>
      </Suspense>

    </div >)
  }
}

const mapStateToProps = (state) => ({
  header: state.signin.header,
  dataLogin: state.signin.dataLogin,
  language: state.versatile.language,
});
const mapDispatchToProps = (dispatch) => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(SearchData)

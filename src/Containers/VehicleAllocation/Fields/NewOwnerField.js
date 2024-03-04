import React, { Component } from 'react'
import Dropdown from 'react-dropdown';
import Select from "react-dropdown-select";
import 'react-dropdown/style.css';
import { get } from 'lodash'


// Define a custom component for handling the root position object
export class NewOwnerField extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.formData };
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps : ", nextProps)
    this.setState({
      ...nextProps.formData,
      inputTypeChange: nextProps.schema.inputTypeChange,
    })
    // console.log('nextProps', nextProps)
    // if (nextProps.selectedOwnerId !== this.props.selectedOwnerId) {
    //   this.setState({ newOwnerPartner: nextProps.selectedNewOwnerId })
    // }

  }

  onChange(name, nativeElement = true) {
    return (event) => {
      let value = nativeElement ? event.target.value : event.value
      this.setState({
        [name]: value
      }, () => this.props.onChange(this.state));
    };
  }
  onChangeSelect(name) {
    return (event) => {
      // debugger;
      let value = event[0].value;
      this.setState({
        [name]: event[0].value
      }, () => this.props.onChange(this.state));
    };
  }

  handleInitFilePond() {

  }

  convert(data) {
    // console.log(data)
    return data ? data.map(e => ({
      value: e.partner_id,
      label: e.partner_name
    })
    ) : undefined
  }


  render() {
    const { newOwnerPartner } = this.state
    const { schema } = this.props
    console.log('SCHEMA', schema)
    const newData = this.convert(get(schema, 'list.newOwnerPartner', []))
    console.log("newOwnerPartner : ", newOwnerPartner)
    return (

      <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
        <label className="control-label">
          {schema.label && schema.label.newOwnerPartner}
          {
            schema.required && schema.required.includes('newOwnerPartner') &&
            <span className="required">*</span>
          }
        </label>
        <Select
          // options={schema.list && schema.list.newOwnerPartner}
          options={newData}
          onChange={this.onChangeSelect("newOwnerPartner")}
          value={newOwnerPartner}
          placeholder="โปรดระบุ" />
      </div>

    );
  }
}

import React, { Component } from 'react'
import Dropdown from 'react-dropdown';
import Select from "react-dropdown-select";
import 'react-dropdown/style.css';
import { get } from 'lodash'


// Define a custom component for handling the root position object
export class OwnerField extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.formData };
  }

  onChange(name, nativeElement = true) {
    return (event) => {
      console.log(event)
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
    const { ownerPartner } = this.state
    const { schema } = this.props
    // console.log('SCHEMA', schema)
    // console.log(ownerPartner)
    const newData = this.convert(get(schema, 'list.ownerPartner', []))
    // console.log(newData)
    // console.log(schema)
    return (

      <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
        <label className="control-label">
          {schema.label && schema.label.ownerPartner}
          {
            schema.required && schema.required.includes('ownerPartner') &&
            <span className="required">*</span>
          }
        </label>
        {/* <Dropdown
          // disabled={true}
          options={schema.list && schema.list.ownerPartner}
          onChange={this.onChange("ownerPartner", false)}
          value={ownerPartner}
          placeholder="โปรดระบุ" /> */}
        <Select
          // disabled={true}
          // options={schema.list && schema.list.ownerPartner}
          options={newData}
          onChange={this.onChangeSelect("ownerPartner")}
          value={ownerPartner}
          placeholder="โปรดระบุ" />
      </div>

    );
  }
}

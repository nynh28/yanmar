import React, { Component } from 'react'
import { Upload } from './Upload';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

// Define a custom component for handling the root position object
export class LicenseData extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.formData };
  }

  onChange(name) {
    return (event) => {
      this.setState({
        [name]: event.target.value
      }, () => this.props.onChange(this.state));
    };
  }


  setFormInput(schema, field, fieldNameLabel, fieldForm, placeholder, flex) {
    return <div className="form-group field field-string" style={{ padding: '0 10px', flex: flex || 1 }}>
      <label className="control-label" style={{ fontWeight: 500 }}>
        {schema.label && fieldNameLabel + " :"}
        {
          schema.required && schema.required.includes(field) &&
          <span className="required">*</span>
        }
      </label>
      <input
        className="form-control" value={field}
        required={schema.required && schema.required.includes(field)}
        placeholder={placeholder}
        onChange={this.onChange(fieldForm)} />
    </div>
  }

  render() {
    const { cardType, cardNo, expireedDate, description } = this.state
    const { schema } = this.props
    // console.log(schema)
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 2, }}>

          <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
            {this.setFormInput(schema, cardType, schema.label.cardType, "cardType", "Select your's Empployee's Card Type")}
            {this.setFormInput(schema, cardNo, schema.label.cardNo, "cardNo", "Enter your's Empployee's Card No.")}
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
            {this.setFormInput(schema, expireedDate, schema.label.expireedDate, "expireedDate", "Enter your's Empployee's Expireed Date")}
            {this.setFormInput(schema, description, schema.label.description, "description", "Enter your's Empployee's Description")}
          </div>



          {/* <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
            <label className="control-label">
              {schema.label && schema.label.cardCode}
              {
                schema.required && schema.required.includes(cardCode) &&
                <span className="required">*</span>
              }
            </label>
            <input
              className="form-control" value={cardCode}
              required={schema.required && schema.required.includes(cardCode)}
              onChange={this.onChange(cardCode)} />
          </div>
          <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
            <label className="control-label">
              {schema.label && schema.label.cardType}
              {
                schema.required && schema.required.includes('cardType') &&
                <span className="required">*</span>
              }
            </label>
            <input
              className="form-control" value={cardType}
              required={schema.required && schema.required.includes('cardType')}
              onChange={this.onChange("cardType")} />
          </div> */}
        </div>
      </div>
    );
  }
}

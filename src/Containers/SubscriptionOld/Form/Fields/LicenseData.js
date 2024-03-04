import React, { Component } from 'react'
import { Upload } from './Upload';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

// Define a custom component for handling the root position object
class LicenseData extends Component {
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

  render() {
    const { cardCode, cardType } = this.state
    const { schema } = this.props
    // console.log(schema)
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
          <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
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
          </div>
        </div>
      </div>
    );
  }
}
export default LicenseData
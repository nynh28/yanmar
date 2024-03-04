import React, { Component } from 'react'
import { Upload } from './Upload';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

// Define a custom component for handling the root position object
export class BasicData extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.formData };
  }

  onChange(name) {
    console.log(name)
    return (event) => {
      this.setState({
        [name]: event.target.value,
        currentChangeField: name
      }, () => {
        console.log(this.state.currentChangeField)
        this.props.onChange(this.state)
      });
    };
  }

  render() {
    const { prefix, name, lastName, aliasName, avatar } = this.state
    const { schema } = this.props
    console.log(schema)
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, paddingRight: 10 }}>
          <Upload schema={schema} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 2, }}>

          <div className="form-group field field-string" style={{ flex: 1, padding: '0 10px' }}>
            <label className="control-label">
              {schema.label && schema.label.prefix}
              {
                schema.required && schema.required.includes(prefix) &&
                <span className="required">*</span>
              }
            </label>
            <Dropdown
              options={schema.list && schema.list.prefix}
              onChange={this.onChange(prefix)}
              style={{ width: 100 }}
              value={prefix}
              placeholder="โปรดระบุ" />

          </div>

          <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
            <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
              <label className="control-label">
                {schema.label && schema.label.name}
                {
                  schema.required && schema.required.includes(name) &&
                  <span className="required">*</span>
                }
              </label>
              <input
                className="form-control" value={name}
                required={schema.required && schema.required.includes(name)}
                onChange={this.onChange(name)} />
            </div>
            <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
              <label className="control-label">
                {schema.label && schema.label.lastName}
                {
                  schema.required && schema.required.includes('lastName') &&
                  <span className="required">*</span>
                }
              </label>
              <input
                className="form-control" value={lastName}
                required={schema.required && schema.required.includes('lastName')}
                onChange={this.onChange("lastName")} />
            </div>
            <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
              <label className="control-label">
                {schema.label && schema.label.aliasName}
                {
                  schema.required && schema.required.includes('aliasName') &&
                  <span className="required">*</span>
                }
              </label>
              <input
                className="form-control" value={aliasName}
                required={schema.required && schema.required.includes('aliasName')}
                onChange={this.onChange("aliasName")} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
            <div className="form-group field field-string" style={{ flex: 1, }}>
              <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
                <label className="control-label">
                  {schema.label && schema.label.avatar}
                  {
                    schema.required && schema.required.includes(avatar) &&
                    <span className="required">*</span>
                  }
                </label>
                <input
                  className="form-control" value={avatar}
                  required={schema.required && schema.required.includes(avatar)}
                  onChange={this.onChange(avatar)} />
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

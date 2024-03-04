import React, { Component } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Upload } from '../Vehicle/Form/Fields/Upload';
import { FilePond } from 'react-filepond';

// Define a custom component for handling the root position object
export class BasicField extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.formData };
  }

  onChange(name, nativeElement = true) {
    return (event) => {
      let value = nativeElement ? event.target.value : event.value
      this.setState({
        [name]: value
      }, () => this.props.onChange(this.state));
    };
  }

  handleInitFilePond() {

  }

  render() {
    const { name, prefix, files } = this.state
    const { schema } = this.props
    // console.log(schema)
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>

        <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
          <label className="control-label">
            {schema.label && schema.label.prefix}
            {
              schema.required && schema.required.includes('prefix') &&
              <span className="required">*</span>
            }
          </label>
          <Dropdown
            options={schema.list && schema.list.prefix}
            onChange={this.onChange("prefix", false)}
            value={prefix}
            placeholder="โปรดระบุ" />
        </div>

        <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
          <label className="control-label">
            {schema.label && schema.label.name}
            {
              schema.required && schema.required.includes('name') &&
              <span className="required">*</span>
            }
          </label>
          <input
            className="form-control" value={name}
            required={schema.required && schema.required.includes('name')}
            onChange={this.onChange("name")} />
        </div>

        <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
          <label className="control-label">
            {schema.label && schema.label.files}
            {
              schema.required && schema.required.includes('files') &&
              <span className="required">*</span>
            }
          </label>
          <FilePond
            ref={ref => this.pond = ref}
            name="fileUpload"
            files={files}
            server={{
              url: 'https://api-center.onelink-iot.com/v1.0.1/ecm/files?DriverProfileId=1&AttachFileType=6&AttachTypeId=1',
              timeout: 7000,
              process: {
                headers: {
                  "Authorization": "eyJraWQiOiJYMUxRdmJjMmFLQlVxSDh3RVlhNCtIRG0zUlFwOWs5ZXNMSlwvRVlXekZTST0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxNzBmMWQ1MC1kOWQxLTQ4M2QtOGUwNy0wZTk1MWM5NmM3M2YiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX0R2OEhtSHRreiIsInBob25lX251bWJlcl92ZXJpZmllZCI6dHJ1ZSwiY29nbml0bzp1c2VybmFtZSI6ImRlYWxlcl8xX2FkbWluIiwiYXVkIjoiNDkwOThyY3Yya3E5M3RmZjg4OGY2MmQ2NmYiLCJldmVudF9pZCI6ImU3YWQ2Nzk2LWQ5YzEtNDU3NS1iNTUzLWI4ZDgwMmUxMDkzMCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTgyMzY0NzkyLCJwaG9uZV9udW1iZXIiOiIrNjY2NTYxMjczNDUiLCJleHAiOjE1ODIzNjgzOTIsImlhdCI6MTU4MjM2NDc5MiwiZW1haWwiOiJkZWFsZXJfMV9hZG1pbkBnbWFpbC5jb20ifQ.J74jtZ41zCw21GKh7aPSLG3CBk45BsD8Tm1sQHVOALjz7oFdAEpvuH_yMWde5dr4DjKkrt6zA_E-Jl9jkfclxUHPOerAJ9kDcbKhMAMSuMKd1dutuQJY8R5hkoS58xrEtRqskJ8_7p-MzMpENUT5_LFpVObotE8eCNv600b_ZRKDHH7E1ZDgJvvSueLzpHKecSOFXMdjCJz-D7VIhp5z4LoPOnWT8Jb-GNhC5l0XynHzntu-QrP6lUjRBddgFAulERNAeHD2MfJKZndKVNesarPHqk8W9HFgWjMr88-fpQ7CvKxZU_vJ3xtN5NJTAAfZDptywmf2wlWxEIetAUBGJw"
                },
                onload: (response) => {
                  console.log(response)
                  let fileItems = JSON.parse(response)
                  // fileItems = fileItems.files.map(e => {
                  // delete e.destination
                  // delete e.path
                  // return e
                  // })
                  console.log('File Items', fileItems)
                  this.setState({
                    filesResponse: fileItems
                  }, () => this.props.onChange(this.state));
                },
                onerror: (response) => response.data,
              },
            }}
            oninit={() => this.handleInitFilePond()}
            onprocessfile={(error, file) => {
              // console.log(file.getFile())
            }}
            onupdatefiles={(fileItems) => {
              console.log('File Items', fileItems)
              // Set current file objects to this.state
              this.setState({
                files: fileItems,
                // filesSource: fileItems.map(fileItem => fileItem.source)
              }, () => this.props.onChange(this.state));
            }}
            labelIdle='ลากและวางไฟล์ หรือ <span class="filepond--label-action"> เลือก </span>'
          />
        </div>
      </div>
    );
  }
}

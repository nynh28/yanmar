import React, { Component } from 'react'
import { FilePond } from 'react-filepond';

export class Upload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...props.formData,
    };
  }

  onChange(name) {
    return (event) => {
      this.setState({
        [name]: event.target.value
      }, () => this.props.onChange(this.state));
    };
  }

  onDateChange(name, date) {
    this.setState({
      [name]: date
    }, () => this.props.onChange(this.state));
  }

  onUpdateFiles() {
    return (fileItems) => {
      console.log(fileItems)
      // Set current file objects to this.state
      this.setState({
        files: fileItems.map(fileItem => fileItem.file)
      }, () => this.props.onChange(this.state));
    }
  }

  handleInitFilePond() {

  }

  render() {
    const { files, countOf } = this.state
    const { schema } = this.props
    console.log(schema)
    return (
      <div style={{ display: 'flex' }}>

        <div className="form-group field field-string" style={{ flex: 1 }}>
          <label className="control-label">
            {schema.label && schema.label.avatar || 'อัพโหลดไฟล์'}
            {
              schema.required && schema.required.includes('expiryDate') &&
              <span className="required">*</span>
            }
          </label>
          <FilePond
            ref={ref => this.pond = ref}
            name="acfs"
            files={files}
            server={{
              url: 'http://localhost:3000/upload',
              timeout: 7000,
              process: {
                onload: (response) => {
                  let fileItems = JSON.parse(response)
                  fileItems = fileItems.files.map(e => {
                    delete e.destination
                    delete e.path
                    return e
                  })
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
                filesSource: fileItems.map(fileItem => fileItem.source)
              }, () => this.props.onChange(this.state));
            }}
            labelIdle='ลากและวางไฟล์ หรือ <span class="filepond--label-action"> เลือก </span>' />
        </div>
      </div>
    )
  }

}

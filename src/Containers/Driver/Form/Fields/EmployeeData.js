// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import DriverActions from '../../../../Redux/DriverRedux'
// import { Table, ButtonGroup, Button, Row } from 'reactstrap'
// import DataGrid, { Column, Paging, Editing } from 'devextreme-react/data-grid';
// import { FilePond } from 'react-filepond';
// import DateRangePicker from "react-bootstrap-daterangepicker";
// import BoxCollaps from './BoxCollaps'

// let datasTest = []

// class EmployeeData extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       ...props.formData,
//       drivers: []
//     };
//     console.log("props employee", props)
//     // this.onRowInserted = this.onRowInserted.bind(this);
//     this.onRowUpdated = this.onRowUpdated.bind(this);
//     this.onEditingStart = this.onEditingStart.bind(this);
//     this.onRowUpdating = this.onRowUpdating.bind(this);
//     this.onRowUpdated = this.onRowUpdated.bind(this);
//     this.onRowRemoving = this.onRowRemoving.bind(this);
//     this.onInitNewRow = this.onInitNewRow.bind(this);
//     this.onRowInserting = this.onRowInserting.bind(this);
//     this.onRowInserted = this.onRowInserted.bind(this);
//   }

//   componentWillReceiveProps(nextProps) {
//     this.setState({
//       ...nextProps.formData
//     })
//   }


//   onChange(name) {
//     return (event) => {

//       this.setState({
//         [name]: event.target.value
//       }, () => this.props.onChange(this.state));
//     };
//   }

//   //#region  DATE PICKER

//   onChangeDate(event, picker) {
//     let value = picker.startDate.format("DD/MM/YYYY")
//     this.setState({
//       [event.target.children[0].id]: value
//     }, () => this.props.onChange(this.state));

//     this.setState({ [event.target.children[0].id]: picker.startDate.format("DD/MM/YYYY") })
//   }
//   onChangeInputDate(fieldForm) {
//     this.setState({
//       [fieldForm]: this.state[fieldForm]
//     }, () => this.props.onChange(this.state));
//   }

//   //#endregion


//   setHeaderSection(title, showLine = true) {
//     return <div>
//       {showLine && <div className="hr-line-dashed" />}
//       <h3>{title}</h3>
//       <div style={{ minHeight: '2rem' }}></div>
//     </div>
//   }

//   setFormInput(schema, field, fieldNameLabel, fieldForm, placeholder, flex) {
//     return <div className="form-group field field-string" style={{ padding: '0 10px', flex: flex || 1 }}>
//       <label className="control-label" style={{ fontWeight: 500 }}>
//         {schema.label && fieldNameLabel + " :"}
//         {
//           schema.required && schema.required.includes(fieldForm) &&
//           <span className="required">*</span>
//         }
//       </label>
//       <input
//         className="form-control" value={field}
//         required={schema.required && schema.required.includes(fieldForm)}
//         placeholder={placeholder}
//         onChange={this.onChange(fieldForm)} />
//     </div>
//   }


//   setFormDatepicker(schema, field, fieldNameLabel, fieldForm, placeholder, flex) {
//     return <div className="form-group field field-string" style={{ padding: '0 10px', flex: flex || 1 }}>
//       <label className="control-label" style={{ fontWeight: 500 }}>
//         {schema.label && fieldNameLabel + " :"}
//         {
//           schema.required && schema.required.includes(fieldForm) &&
//           <span className="required">*</span>
//         }
//       </label>
//       <DateRangePicker
//         id={field}
//         autoUpdateInput={false}
//         locale={{ format: "DD/MM/YYYY" }}
//         onApply={this.onChangeDate}
//         autoApply={true}
//         singleDatePicker
//       >
//         <input
//           className="form-control"
//           id={fieldForm}
//           value={this.state[fieldForm]}
//           required={schema.required && schema.required.includes(fieldForm)}
//           placeholder={placeholder}
//         />
//       </DateRangePicker>
//     </div>
//   }

//   setFormUpload(files, label, flex) {
//     return <div className="form-group field field-string" style={{ padding: '0 10px', flex: flex || 1 }}>
//       <label className="control-label" style={{ fontWeight: 500 }}>{label}</label>
//       <FilePond
//         ref={ref => this.pond = ref}
//         name="fileUpload"
//         files={files}
//         server={{
//           url: 'https://api-center.onelink-iot.com/v1.0.1/ecm/files?DriverProfileId=1&AttachFileType=6&AttachTypeId=1',
//           timeout: 7000,
//           process: {
//             headers: {
//               "Authorization": "eyJraWQiOiJYMUxRdmJjMmFLQlVxSDh3RVlhNCtIRG0zUlFwOWs5ZXNMSlwvRVlXekZTST0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxNzBmMWQ1MC1kOWQxLTQ4M2QtOGUwNy0wZTk1MWM5NmM3M2YiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX0R2OEhtSHRreiIsInBob25lX251bWJlcl92ZXJpZmllZCI6dHJ1ZSwiY29nbml0bzp1c2VybmFtZSI6ImRlYWxlcl8xX2FkbWluIiwiYXVkIjoiNDkwOThyY3Yya3E5M3RmZjg4OGY2MmQ2NmYiLCJldmVudF9pZCI6ImU3YWQ2Nzk2LWQ5YzEtNDU3NS1iNTUzLWI4ZDgwMmUxMDkzMCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTgyMzY0NzkyLCJwaG9uZV9udW1iZXIiOiIrNjY2NTYxMjczNDUiLCJleHAiOjE1ODIzNjgzOTIsImlhdCI6MTU4MjM2NDc5MiwiZW1haWwiOiJkZWFsZXJfMV9hZG1pbkBnbWFpbC5jb20ifQ.J74jtZ41zCw21GKh7aPSLG3CBk45BsD8Tm1sQHVOALjz7oFdAEpvuH_yMWde5dr4DjKkrt6zA_E-Jl9jkfclxUHPOerAJ9kDcbKhMAMSuMKd1dutuQJY8R5hkoS58xrEtRqskJ8_7p-MzMpENUT5_LFpVObotE8eCNv600b_ZRKDHH7E1ZDgJvvSueLzpHKecSOFXMdjCJz-D7VIhp5z4LoPOnWT8Jb-GNhC5l0XynHzntu-QrP6lUjRBddgFAulERNAeHD2MfJKZndKVNesarPHqk8W9HFgWjMr88-fpQ7CvKxZU_vJ3xtN5NJTAAfZDptywmf2wlWxEIetAUBGJw"
//             },
//             onload: (response) => {
//               console.log(response)
//               let fileItems = JSON.parse(response)
//               // fileItems = fileItems.files.map(e => {
//               // delete e.destination
//               // delete e.path
//               // return e
//               // })
//               console.log('File Items', fileItems)
//               this.setState({
//                 filesResponse: fileItems
//               }, () => this.props.onChange(this.state));
//             },
//             onerror: (response) => response.data,
//           },
//         }}
//         oninit={() => this.handleInitFilePond()}
//         onprocessfile={(error, file) => {
//           // console.log(file.getFile())
//         }}
//         onupdatefiles={(fileItems) => {
//           console.log('File Items', fileItems)
//           // Set current file objects to this.state
//           this.setState({
//             files: fileItems,
//             // filesSource: fileItems.map(fileItem => fileItem.source)
//           }, () => this.props.onChange(this.state));
//         }}
//         labelIdle='ลากและวางไฟล์ หรือ <span className="filepond--label-action"> เลือก </span>'
//       />
//     </div>
//   }


//   handleInitFilePond(fieldForm) {

//   }

//   // onRowInserted(e) {
//   //   console.log("new record", e)
//   // }

//   // onRowUpdating(e) {
//   //   console.log("onRowUpdating", e)
//   //   e.cancel = true
//   // }
//   onRowUpdated(e) {

//     // e.component.navigateToRow(e.key);
//     console.log("onRowUpdated", e)
//   }

//   onEditingStart(e) {
//     // e.cancel = true
//     console.log("onEditingStart", e)
//     // if (e.parentType === 'dataRow' && e.dataField === 'CityID') {
//     //   e.editorOptions.disabled = (typeof e.row.data.StateID !== 'number');
//     // }
//   }


//   onChangeList(name) {
//     return (event) => {

//       this.setState({
//         [name]: event.target.value
//       }, () => this.props.onChange(this.state));
//     };
//   }



//   onRowUpdating(e) {
//     e.cancel = false
//     console.log("onRowUpdating", e)

//   }
//   onRowRemoving(e) {
//     console.log("onRowRemoving", e)
//     e.cancel = true
//   }

//   onRowInserting(e) {
//     console.log("onRowInserting", e)
//     e.cancel = true

//     let { drivers } = this.state
//   }




//   onRowUpdated(e) {

//     console.log("onRowUpdated", e)
//     e.cancel = true
//   }

//   onInitNewRow(e) {
//     console.log("onInitNewRow", e)
//     e.cancel = true
//   }

//   onRowInserting(e) {
//     console.log("onRowInserting", e)
//     e.cancel = true
//   }

//   onRowInserted(e) {
//     console.log("onRowInserted", e)
//     e.cancel = true
//   }


//   componentDidUpdate(prevProps, prevState) {

//     // console.log("componentDidUpdate", this.props)
//     // console.log(prevState.drivers)
//     // console.log(this.props.schema.list.drivers)
//     if (prevState.drivers.length !== this.props.schema.list.drivers.length) {
//       // this.setState({ drivers: [...this.props.schema.list.drivers] })
//     }
//     // if (prevProps.driverExisting !== driverExisting) {
//     // }
//     // this.setState({ drivers: [...this.props.schema.list.drivers] })

//   }

//   setFormRedio(schema, field, fieldNameLabel, fieldForm, flex) {

//     return <div className="form-group field field-string" style={{ padding: '0 10px', flex: flex || 1 }}>
//       <label className="control-label" style={{ fontWeight: 500 }}>
//         {schema.label && fieldNameLabel + " :"}
//         {
//           schema.required && schema.required.includes(fieldForm) &&
//           <span className="required">*</span>
//         }
//       </label>

//       <div>
//         <ButtonGroup style={{ zIndex: 1 }}>
//           <Button
//             className='button-radio-checkbox'
//             onClick={(e) => {
//               this.onCheckedButton(false, fieldForm)
//             }}
//             active={field === false}
//           >No</Button>
//           <Button
//             className='button-radio-checkbox'
//             onClick={(e) => {
//               this.onCheckedButton(true, fieldForm)
//             }}
//             active={field === true}
//           >Yes</Button>
//         </ButtonGroup>
//       </div>
//     </div>
//   }


//   onCheckedButton(isActive, fieldForm) {
//     this.setState({
//       [fieldForm]: isActive
//     }, () => this.props.onChange(this.state));

//   }





//   render() {
//     const { schema } = this.props
//     const {
//       employeeCode, displayName, department, position, startDate, endDate, FileUpload, drivers, isActive
//     } = this.state

//     // console.log("this.state", this.props)
//     console.log("RENDER", drivers)



//     // let schema = this.props.schema
//     // console.log("employeeData ", schema)

//     // if (schema.list.drivers.length > 0) {
//     //   schema.list.drivers[1].employeeCode = "XXXXX"
//     // }



//     const { component: Component, ...rest } = this.props
//     return <div>
//       {
//         schema.list.drivers.map((item, index) =>
//           // drivers.map((item, index) =>
//           <BoxCollaps boxid={index} title={'Employee : ' + item.displayName}>
//             <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
//               <div className="form-group field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//                 {this.setFormInput(schema, item.employeeCode, schema.label.employeeCode, "employeeCode", "Enter your's Empployee Code ")}
//                 {this.setFormInput(schema, item.displayName, schema.label.displayName, "displayName", "Enter your's Empployee Display Name ")}
//               </div>
//               <div className="form-group field field-string" style={{ flex: 1 }}>
//                 {this.setFormUpload(FileUpload, "")}
//               </div>
//             </div>

//             <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
//               {this.setFormInput(schema, item.department, schema.label.department, "department", "Select your's Empployee's Department")}
//               {this.setFormInput(schema, item.position, schema.label.position, "position", "Enter your's Empployee's Position")}
//             </div>

//             <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
//               {this.setFormInput(schema, item.startDate, schema.label.startDate, "startDate", "DD/MM/YYYY")}
//               {this.setFormInput(schema, item.endDate, schema.label.endDate, "endDate", "DD/MM/YYYY")}
//               {/* {this.setFormDatepicker(schema, item.startDate, schema.label.startDate, "startDate", "DD/MM/YYYY")}
//               {this.setFormDatepicker(schema, item.endDate, schema.label.endDate, "endDate", "DD/MM/YYYY")} */}

//             </div>

//             <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
//               {this.setFormRedio(schema, isActive, schema.label.isActive, "isActive")}
//               <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}></div>
//             </div>

//             <div>
//               <div className="hr-line-dashed" />
//               <Row>
//                 <div className="pull-left" >
//                   <h3>Employee Card</h3>
//                 </div>
//                 {/* <div className="pull-right" style={{ paddingRight: 10 }}>
//                   <Button type="button" className="btn btn-default" size="sm" ><i className="fa fa-plus"></i> Add</Button>
//                 </div> */}
//               </Row>
//             </div>

//             <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
//               <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
//                 <DataGrid
//                   id={'gridContainer' + index}
//                   // dataSource={[...item.driverCardInfos]}
//                   dataSource={datasTest}
//                   keyExpr="id"
//                   allowColumnReordering={false}
//                   showBorders={true}
//                   onInitNewRow={this.onInitNewRow}
//                   onRowInserting={this.onRowInserting}
//                   onRowInserted={this.onRowInserted}
//                   onEditingStart={this.onEditingStart}
//                   onRowUpdating={this.onRowUpdating}
//                   onRowUpdated={this.onRowUpdated}
//                   onRowRemoving={this.onRowRemoving}
//                 >
//                   <Paging enabled={true} />
//                   <Editing
//                     mode="row"
//                     allowUpdating={true}
//                     allowDeleting={true}
//                     allowAdding={true}
//                   />
//                   <Column dataField="cardTypeNav.value" caption="Card Type" />
//                   <Column dataField="cardId" caption="Card No." />
//                   <Column dataField="cardExpired" caption="Expired Date" />
//                   <Column dataField="description" caption="Description" />
//                 </DataGrid>
//               </div>
//             </div>

//           </BoxCollaps>
//         )
//       }
//     </div>
//   }

// }


// const mapStateToProps = (state) => ({


// });
// const mapDispatchToProps = (dispatch) => ({

// });

// export default connect(mapStateToProps, mapDispatchToProps)(EmployeeData)

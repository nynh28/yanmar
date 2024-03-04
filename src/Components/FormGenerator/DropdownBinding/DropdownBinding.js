// import React, { Component } from 'react';
// import { Input, Button } from 'reactstrap'
// import { connect } from 'react-redux'
// import FormValidateActions, { getVehicleBrandData } from '../../../Redux/FormValidateRedux'
// import { select } from 'redux-saga/effects';


// class SelectWidget extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       isError: false,
//       errorMessage: '',
//       value: null,
//       FleetData: [],
//       DriverData: [],
//       VendorOfCustomerData: [],
//       VendorData: [],
//       CustomerData: [],
//       VehicleProvinceData: [],
//       VehicleTypeData: [],
//       VehicleTypeByLawData: [],
//       VehicleBodyTypeData: [],
//       VehicleBodyTypeByLawData: [],
//       VehicleModelData: [],
//       VehicleFuelTypeData: [],
//       VehicleStatusData: [],
//       VehicleBrandData: []

//     }
//     this.handleChange = this.handleChange.bind(this);
//     this.validate = this.validate.bind(this);
//   }

//   componentDidMount() {

//     let { optionGroup } = this.props

//     switch (optionGroup) {
//       case "Fleet":
//         this.props.getFleetData(optionGroup)
//         break;
//       case "Driver":
//         this.props.getDriverData(optionGroup)
//         break;
//       case "VendorOfCustomer":
//         this.props.getVendorOfCustomerData(optionGroup)
//         break;
//       case "Vendor":
//         this.props.getVendorData(optionGroup)
//         break;
//       case "Customer":
//         this.props.getCustomerData(optionGroup)
//         break;
//       case "VehicleProvince":
//         this.props.getVehicleProvinceData(optionGroup)
//         break;
//       case "VehicleType":
//         this.props.getVehicleTypeData(optionGroup)
//         break;
//       case "VehicleTypeByLaw":
//         this.props.getVehicleTypeByLawData(optionGroup)
//         break;
//       case "VehicleBodyType":
//         this.props.getVehicleBodyTypeData(optionGroup)
//         break;
//       case "VehicleBodyTypeByLaw":
//         this.props.getVehicleBodyTypeByLawData(optionGroup)
//         break;
//       case "VehicleModel":
//         this.props.getVehicleModelData(optionGroup)
//         break;
//       case "VehicleFuelType":
//         this.props.getVehicleFuelTypeData(optionGroup)
//         break;
//       case "VehicleStatus":
//         this.props.getVehicleStatusData(optionGroup)
//         break;
//       case "VehicleBrand":
//         this.props.getVehicleBrandData(this.props.optionGroup)
//         break;

//     }
//   }

//   componentDidUpdate(prevProps, prevState) {

//     if (prevProps.FleetData !== this.props.FleetData
//       || prevProps.DriverData !== this.props.DriverData
//       || prevProps.VendorOfCustomerData !== this.props.VendorOfCustomerData
//       || prevProps.VendorData !== this.props.VendorData
//       || prevProps.CustomerData !== this.props.CustomerData
//       || prevProps.VehicleProvinceData !== this.props.VehicleProvinceData
//       || prevProps.VehicleTypeData !== this.props.VehicleTypeData
//       || prevProps.VehicleTypeByLawData !== this.props.VehicleTypeByLawData
//       || prevProps.VehicleBodyTypeData !== this.props.VehicleBodyTypeData
//       || prevProps.VehicleBodyTypeByLawData !== this.props.VehicleBodyTypeByLawData
//       || prevProps.VehicleModelData !== this.props.VehicleModelData
//       || prevProps.VehicleFuelTypeData !== this.props.VehicleFuelTypeData
//       || prevProps.VehicleStatusData !== this.props.VehicleStatusData
//       || prevProps.VehicleBrandData !== this.props.VehicleBrandData
//     ) {
//       switch (optionGroup) {
//         case "Fleet":
//           this.setState({ FleetData: FleetData })
//           break;
//         case "Driver":
//           this.setState({ DriverData: DriverData })
//           break;
//         case "VendorOfCustomer":
//           this.setState({ VendorOfCustomerData: VendorOfCustomerData })
//           break;
//         case "Vendor":
//           this.setState({ VendorData: VendorData })
//           break;
//         case "Customer":
//           this.setState({ CustomerData: CustomerData })
//           break;
//         case "VehicleProvince":
//           this.setState({ VehicleProvinceData: VehicleProvinceData })
//           break;
//         case "VehicleType":
//           this.setState({ VehicleTypeData: VehicleTypeData })
//           break;
//         case "VehicleTypeByLaw":
//           this.setState({ VehicleTypeByLawData: VehicleTypeByLawData })
//           break;
//         case "VehicleBodyType":
//           this.setState({ VehicleBodyTypeData: VehicleBodyTypeData })
//           break;
//         case "VehicleBodyTypeByLaw":
//           this.setState({ VehicleBodyTypeByLawData: VehicleBodyTypeByLawData })
//           break;
//         case "VehicleModel":
//           this.setState({ VehicleModelData: VehicleModelData })
//           break;
//         case "VehicleFuelType":
//           this.setState({ VehicleFuelTypeData: VehicleFuelTypeData })
//           break;
//         case "VehicleStatus":
//           this.setState({ VehicleStatusData: VehicleStatusData })
//           break;
//         case "VehicleBrand":
//           this.setState({ VehicleBrandData: this.props.VehicleBrandData })
//           break;
//       }
//     }

//   }

//   handleChange(event) {
//     this.setState({ value: event.target.value })
//     this.validate(event.target.value)
//   }
//   validate() {
//     let value = document.getElementById(this.props.id).value

//     if (this.props.required && value == "") {
//       this.state.errorMessage = "This field is required."
//       this.state.isError = true
//     }
//     else {
//       this.state.isError = false
//     }

//     if (this.state.isError && !this.props.isValid) this.props.setErrorList(false)

//     this.setState(prevState => prevState)
//   }

//   componentWillMount() {
//     this.setState({ value: this.props.value })
//   }

//   repeatOptions(options) {
//     let optionLists = []
//     {
//       options.map((item) =>
//         optionLists.push(<option value={item.key}>{item.value}</option>))
//     }
//     return optionLists
//   }

//   render() {
//     let { optionGroup, placeholder } = this.props
//     let {
//       FleetData, DriverData, VendorOfCustomerData, VendorData, CustomerData,
//       VehicleProvinceData, VehicleTypeData, VehicleTypeByLawData, VehicleBodyTypeData,
//       VehicleBodyTypeByLawData, VehicleModelData, VehicleFuelTypeData, VehicleStatusData, VehicleBrandData
//     } = this.state


//     return <div className={isError ? 'has-error' : ''}>
//       <Input
//         type="select"
//         id={this.props.id}
//         name={this.props.name}
//         onChange={this.handleChange}
//         disabled={this.props.disabled}
//         value={this.state.value}
//       >
//         <option value="" disabled selected>{placeholder || "Select something..."}</option>
//         {
//           this.props.optionGroup === "Fleet" ? this.repeatOptions(FleetData) :
//             this.props.optionGroup === "Driver" ? this.repeatOptions(DriverData) :
//               this.props.optionGroup === "VendorOfCustomer" ? this.repeatOptions(VendorOfCustomerData) :
//                 this.props.optionGroup === "Vendor" ? this.repeatOptions(VendorData) :
//                   this.props.optionGroup === "Customer" ? this.repeatOptions(CustomerData) :
//                     this.props.optionGroup === "VehicleProvince" ? this.repeatOptions(VehicleProvinceData) :
//                       this.props.optionGroup === "VehicleType" ? this.repeatOptions(VehicleTypeData) :
//                         this.props.optionGroup === "VehicleTypeByLaw" ? this.repeatOptions(VehicleTypeByLawData) :
//                           this.props.optionGroup === "VehicleBodyType" ? this.repeatOptions(VehicleBodyTypeData) :
//                             this.props.optionGroup === "VehicleBodyTypeByLaw" ? this.repeatOptions(VehicleBodyTypeByLawData) :
//                               this.props.optionGroup === "VehicleModel" ? this.repeatOptions(VehicleModelData) :
//                                 this.props.optionGroup === "VehicleFuelType" ? this.repeatOptions(VehicleFuelTypeData) :
//                                   this.props.optionGroup === "VehicleStatus" ? this.repeatOptions(VehicleStatusData) :
//                                     this.props.optionGroup === "VehicleBrand" ? this.repeatOptions(VehicleBrandData) : ""

//         }

//       </Input>
//       <Button
//         id={this.props.id + 'checkValidate'}
//         onClick={this.validate}
//         style={{ display: 'none' }}></Button>

//       {isError &&
//         <div>
//           <span className="text-danger">{errorMessage}</span>
//         </div>
//       }
//     </div>
//   }
// }

// const mapStateToProps = (state) => ({
//   formData: state.formValidate.data,
//   isValid: state.formValidate.isValid,
//   FleetData: state.formValidate.FleetData,
//   DriverData: state.formValidate.DriverData,
//   VendorOfCustomerData: state.formValidate.VendorOfCustomerData,
//   VendorData: state.formValidate.VendorData,
//   CustomerData: state.formValidate.CustomerData,
//   VehicleProvinceData: state.formValidate.VehicleProvinceData,
//   VehicleTypeData: state.formValidate.VehicleTypeData,
//   VehicleTypeByLawData: state.formValidate.VehicleTypeByLawData,
//   VehicleBodyTypeData: state.formValidate.VehicleBodyTypeData,
//   VehicleBodyTypeByLawData: state.formValidate.VehicleBodyTypeByLawData,
//   VehicleModelData: state.formValidate.VehicleModelData,
//   VehicleFuelTypeData: state.formValidate.VehicleFuelTypeData,
//   VehicleStatusData: state.formValidate.VehicleStatusData,
//   VehicleBrandData: state.formValidate.VehicleBrandData
// });
// const mapDispatchToProps = (dispatch) => ({
//   setFormData: (oldFieldData, fieldData) => dispatch(FormValidateActions.setFormData(oldFieldData, fieldData)),
//   setErrorList: (data) => dispatch(FormValidateActions.setErrorList(data)),
//   getFleetData: (optionGroup) => dispatch(FormValidateActions.getFleetData(optionGroup)),
//   getDriverData: (optionGroup) => dispatch(FormValidateActions.getDriverData(optionGroup)),
//   getVendorOfCustomerData: (optionGroup) => dispatch(FormValidateActions.getVendorOfCustomerData(optionGroup)),
//   getVendorData: (optionGroup) => dispatch(FormValidateActions.getVendorData(optionGroup)),
//   getCustomerData: (optionGroup) => dispatch(FormValidateActions.getCustomerData(optionGroup)),
//   getVehicleProvinceData: (optionGroup) => dispatch(FormValidateActions.getVehicleProvinceData(optionGroup)),
//   getVehicleTypeData: (optionGroup) => dispatch(FormValidateActions.getVehicleTypeData(optionGroup)),
//   getVehicleTypeByLawData: (optionGroup) => dispatch(FormValidateActions.getVehicleTypeByLawData(optionGroup)),
//   getVehicleBodyTypeData: (optionGroup) => dispatch(FormValidateActions.getVehicleBodyTypeData(optionGroup)),
//   getVehicleBodyTypeByLawData: (optionGroup) => dispatch(FormValidateActions.getVehicleBodyTypeByLawData(optionGroup)),
//   getVehicleModelData: (optionGroup) => dispatch(FormValidateActions.getVehicleModelData(optionGroup)),
//   getVehicleFuelTypeData: (optionGroup) => dispatch(FormValidateActions.getVehicleFuelTypeData(optionGroup)),
//   getVehicleStatusData: (optionGroup) => dispatch(FormValidateActions.getVehicleStatusData(optionGroup)),
//   getVehicleBrandData: (optionGroup) => dispatch(FormValidateActions.getVehicleBrandData(optionGroup)),
// });
// export default connect(mapStateToProps, mapDispatchToProps)(SelectWidget)

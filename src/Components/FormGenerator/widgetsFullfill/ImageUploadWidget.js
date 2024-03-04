// import React, { Component } from 'react';
// import { Input, CardImg } from 'reactstrap'
// import { connect } from 'react-redux'

// import { FilePond, registerPlugin } from "react-filepond";

// // Import FilePond styles
// import "filepond/dist/filepond.min.css";

// // Import the Image EXIF Orientation and Image Preview plugins
// // Note: These need to be installed separately
// import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
// import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// class ImageUploadWidget extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       isError: false,
//       errorMessage: '',
//       img: null,
//       files: [
//         // {
//         //   source: "index.html",
//         //   options: {
//         //     type: "local"
//         //   }
//         // }
//         // {
//         //   source: "",
//         //   options: {
//         //     type: "local"
//         //   }
//         // }
//       ],
//     }
//     this.handleChange = this.handleChange.bind(this)
//   }


//   handleInit() {
//     console.log("FilePond instance has initialised", this.pond);
//   }

//   handleChange(event) {
//     this.setState({
//       img: URL.createObjectURL(event.target.files[0])
//     })
//   }

//   componentDidMount() {

//   }

//   render() {
//     console.log("AAAAAAAAAAAAAAA")
//     return <div className={this.state.isError ? 'has-error' : ''}>
//       <CardImg
//         src={this.state.img}
//         width="150"
//         height="150" />
//       <div style={{ minHeight: '1rem' }}></div>
//       <Input
//         type="file"
//         name={this.props.name}
//         id={this.props.id}
//         onChange={this.handleChange}
//         disabled={this.props.disabled}
//       />
//       {/* <FilePond
//         ref={ref => (this.pond = ref)}
//         files={this.state.files}
//         allowMultiple={true}
//         maxFiles={1}
//         server="https://api-center.onelink-iot.com/swg.v1/swagger/index.html?urls.primaryName=ecm%20API#/"
//         oninit={() => this.handleInit()}
//         onupdatefiles={fileItems => {
//           // Set currently active file objects to this.state
//           this.setState({
//             files: fileItems.map(fileItem => fileItem.file)
//           });
//         }}
//       /> */}


//     </div>
//   }
// }


// export default ImageUploadWidget


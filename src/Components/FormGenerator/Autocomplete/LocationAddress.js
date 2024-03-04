import React, { Component } from 'react';
import { Input } from 'reactstrap'
import { connect } from 'react-redux'
import FormValidateActions from '../../../Redux/FormValidateRedux'
import VersatileActions from '../../../Redux/VersatileRedux'

import { AsyncTypeahead } from 'react-bootstrap-typeahead';

class LocationAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isError: false,
      errorMessage: '',
      defaultValue: [],
      value: '',
      fieldName: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleChange(event) {
    // let fieldName = '{"' + event.target.id + '":"' + event.target.value + '"}'
    // this.props.setFormData(this.props.formData, JSON.parse(fieldName))
    this.validate(event.target.value)
  }

  validate(value) {

    if (this.props.required && value == "") {
      this.state.errorMessage = "This field is required."
      this.state.isError = true
    }
    else {
      this.state.isError = false
    }

    if (this.state.isError && !this.props.isValid) this.props.setErrorList(false)

    this.setState(prevState => prevState)
  }


  /*
    level 1 = จังหวัด
    level 2 = อำเภอ
    level 3 = ตำบล
  */
  getLocationAddress(selected, e) {

    // let code = selected[0].code
    // console.log("Code : " + code)

    // if (code !== undefined) this.props.getLocation(code)
    if (selected.length !== 0) {
      this.props.getLocation(selected[0].code)

      this.setState({ defaultValue: this.mapField(selected[0].nameTH) })

    }
    // if (selected.length !== 0) {
    //   this.props.getLocation(selected[0].code)
    // } else {
    //   if (id === 'subdistrict') {
    //     this.setState({ subdistrict: [] })
    //   } else if (id === 'district') {
    //     this.setState({ district: [] })
    //   } else {
    //     this.setState({ province: [] })
    //   }
    // }
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevProps.location !== this.props.location) {

      if (this.props.mapValues !== undefined &&
        this.props.mapValues !== null &&
        this.props.mapValues.length > 0) {
        let index = this.props.location.findIndex(x => x.level === this.props.level)

        this.setState({ defaultValue: this.mapField(this.props.location[index].nameTH) })
        this.setState(prevState => prevState)
      }
    }

  }

  mapField(value) {
    let obj = "", fieldName = ""
    switch (this.props.language) {
      case "en":
        obj = { "nameTH": value }
        fieldName = "nameTH"
        break;
      case "th":
        obj = { "nameTH": value }
        fieldName = "nameTH"
        break;
      case "jp":
        obj = { "nameJP": value }
        fieldName = "nameTH"
        break;
    }
    this.setState({ fieldName })
    return obj
  }

  componentWillMount() {

    this.setState({ defaultValue: this.mapField(this.props.value) })
  }


  render() {
    return <div className={this.state.isError ? 'has-error' : ''}>
      <AsyncTypeahead
        id={this.props.id}

        // isLoading={this.state.isLoading}
        labelKey={this.state.fieldName}
        onSearch={query => {

          let fieldName = ""


          //   let value = { "nameTH": query }
          this.state.defaultValue.nameTH = query


          //     this.setState({ defaultValue: value })
          //  this.searchLocationAddress(query, item.id)
          this.props.searchLocation(query, this.props.level)
        }}
        onChange={(selected) => {
          this.getLocationAddress(selected, this.props.id)
        }}
        options={this.props.locationList}
        // selected={this.props.id}
        selected={[this.state.defaultValue]}
      // selected={this.getLocationAddress("CCC")}
      // value={this.props.value}
      // defaultInputValue={this.state.defaultValue}
      />
      {this.state.isError &&
        <div>
          <span className="text-danger">{this.state.errorMessage}</span>
        </div>
      }
    </div>
  }
}

const mapStateToProps = (state) => ({
  formData: state.formValidate.data,
  isValid: state.formValidate.isValid,
  locationList: state.versatile.locationList,
  location: state.versatile.location,
  language: state.versatile.language
});
const mapDispatchToProps = (dispatch) => ({
  setFormData: (oldFieldData, fieldData) => dispatch(FormValidateActions.setFormData(oldFieldData, fieldData)),
  setErrorList: (data) => dispatch(FormValidateActions.setErrorList(data)),
  searchLocation: (name, level) => dispatch(VersatileActions.searchLocation(name, level)),
  getLocation: code => dispatch(VersatileActions.getLocation(code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationAddress)


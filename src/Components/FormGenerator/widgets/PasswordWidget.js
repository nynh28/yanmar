import React, { Component } from 'react';
import { Input, Button } from 'reactstrap'
import { connect } from 'react-redux'
import FormValidateActions from '../../../Redux/FormValidateRedux'
var passwordValidator = require('password-validator');
var schema = new passwordValidator();

class PasswordWidget extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isError: false,
      errorMessage: '',
      props: null

    }
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleChange(event) {
    this.validate()
  }

  validate() {
    let value = document.getElementById(this.props.id).value

    // Add properties to it
    schema
      .is().min(8)                                    // Minimum length 8
      .is().max(100)                                  // Maximum length 100
      .has().uppercase()                              // Must have uppercase letters
      .has().lowercase()                              // Must have lowercase letters
      .has().digits()                                 // Must have digits
      //  .has().not().spaces()                           // Should not have spaces
      .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

    // Get a full list of rules which failed
    // console.log(schema.validate('joke', { list: true }));
    // => [ 'min', 'uppercase', 'digits' ]

    let passValid = schema.validate(value)

    if (this.props.required && value == "") {
      this.state.errorMessage = "This field is required."
      this.state.isError = true
    }
    else if (!passValid) {
      this.state.errorMessage = "Please enter only alphabetical letters, A–Z , a–z or numbers. Length 8-100."
      this.state.isError = true
    }
    else {
      this.state.isError = false
    }
    if (this.state.isError && !this.props.isValid) this.props.setErrorList(false)

    this.setState(prevState => prevState)
  }

  render() {

    return <div className={this.state.isError ? 'has-error' : ''}>
      <Input
        type={this.props.type}
        id={this.props.id}
        name={this.props.name}
        defaultValue={this.props.defaultValue}
        onChange={this.handleChange}
        disabled={this.props.disabled}
      />
      <Button
        id={this.props.id + 'checkValidate'}
        onClick={this.validate}
        style={{ display: 'none' }}></Button>
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
  isValid: state.formValidate.isValid

});
const mapDispatchToProps = (dispatch) => ({
  setFormData: (oldFieldData, fieldData) => dispatch(FormValidateActions.setFormData(oldFieldData, fieldData)),
  setErrorList: (data) => dispatch(FormValidateActions.setErrorList(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordWidget)

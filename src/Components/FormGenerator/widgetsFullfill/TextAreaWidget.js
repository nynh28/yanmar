import React, { Component } from 'react';
import { Input, Button } from 'reactstrap'
import { connect } from 'react-redux'
import FormValidateActions from '../../../Redux/FormValidateRedux'

class TextAreaWidget extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isError: false,
      errorMessage: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleChange(event) {
    this.validate()
  }

  validate() {
    let value = document.getElementById(this.props.id).value

    if (this.props.required && value == "") {
      this.state.errorMessage = "This field is required."
      this.state.isError = true
    }
    else if (value.length > this.props.maxLength) {
      this.state.errorMessage = "should NOT be longer than " + this.props.maxLength + " characters"
      this.state.isError = true
    }
    else if (value.length < this.props.minLength) {
      this.state.errorMessage = "should NOT be shorter than " + this.props.minLength + " characters"
      this.state.isError = true
    }
    else {
      this.state.isError = false
    }

    if (this.state.isError && !this.props.isValid) this.props.setErrorList(false)

    this.setState(prevState => prevState)
  }


  render() {

    return <div className={this.state.isError ? 'has-error' : ''} style={{ display: 'flex', flex: 1 }}>
      <Input
        type={this.props.type}
        id={this.props.id}
        name={this.props.name}
        placeholder={this.props.placeholder}
        minLength={this.props.minLength}
        maxLength={this.props.maxLength}
        defaultValue={this.props.value}
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

export default connect(mapStateToProps, mapDispatchToProps)(TextAreaWidget)


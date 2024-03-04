import React, { Component } from 'react';
import { Input, Button } from 'reactstrap'
import { connect } from 'react-redux'
import FormValidateActions from '../../../Redux/FormValidateRedux'
import { select } from 'redux-saga/effects';

class SelectWidget extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isError: false,
      errorMessage: '',
      value: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
    this.validate(event.target.value)
  }
  validate() {
    let value = document.getElementById(this.props.id).value

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

  componentWillMount() {
    this.setState({ value: this.props.value })
  }

  render() {
    return <div className={this.state.isError ? 'has-error' : ''}>
      <Input
        type={this.props.type}
        id={this.props.id}
        name={this.props.name}
        onChange={this.handleChange}
        disabled={this.props.disabled}
        value={this.state.value}
      >
        {this.props.selectOption.map((item) =>
          <option value={item.value}>{item.name}</option>)}
      </Input>
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
export default connect(mapStateToProps, mapDispatchToProps)(SelectWidget)

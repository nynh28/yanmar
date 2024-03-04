import React, { Component } from 'react';
import { ButtonGroup, Button } from 'reactstrap'
import { connect } from 'react-redux'
import FormValidateActions from '../../../Redux/FormValidateRedux'

class RadioWidget extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isError: false,
      errorMessage: '',
      checkedActive: null,
      checkedValue: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleChange(event) {
  }

  validate(e) {
    if (this.state.isError && !this.props.isValid) this.props.setErrorList(false)

    if (this.props.required && this.state.checkedValue === '') {

      this.state.errorMessage = "This field is required."
      this.state.isError = true
    }
    else {
      this.state.isError = false
    }

    this.setState(prevState => prevState)
  }

  onCheckedButton(isActive) {

    this.state.checkedValue = isActive

    this.props.radioButton.find(function (element) {
      element.checked = element.value === isActive ? true : false
    })

  }

  render() {
    return <div className={this.state.isError ? 'has-error' : ''} style={{ display: 'flex', flex: 1 }}>
      <ButtonGroup>
        {this.props.radioButton.map((item, index) => <Button
          className='button-radio-checkbox'
          id={this.props.id + index}
          // name={this.props.name}
          value={item.value}
          onClick={(e) => {
            this.onCheckedButton(item.value)
            this.validate(e)
          }}
          disabled={this.props.disabled}
          active={item.checked}
        >{item.name}</Button>)}
        {/* <Button>Individual</Button>
        <Button >Coperate</Button> */}
      </ButtonGroup>
      {this.state.isError &&
        <div>
          <span className="text-danger">{this.state.errorMessage}</span>
        </div>
      }

      <Button
        id={this.props.id + 'checkValidate'}
        onClick={(e) => {
          this.validate(e)
        }}
        style={{ display: 'none' }}></Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(RadioWidget)

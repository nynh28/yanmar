import React, { Component } from 'react';
import { ButtonGroup, Button } from 'reactstrap'
import { connect } from 'react-redux'
import FormValidateActions from '../../../Redux/FormValidateRedux'

class CheckboxWidget extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isError: false,
      errorMessage: '',
      checkedActive: null,
      checkedValue: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleChange(event) {
  }

  validate() {
    if (this.state.isError && !this.props.isValid) this.props.setErrorList(false)

    if (this.props.required && this.state.checkedValue.length === 0) {

      this.state.errorMessage = "This field is required."
      this.state.isError = true
    }
    else {
      this.state.isError = false
    }

    this.setState(prevState => prevState)
  }

  componentWillMount() {
    for (let item in this.props.checkboxButton) {
      if (this.props.checkboxButton[item].checked) {
        this.state.checkedValue.push(this.props.checkboxButton[item].value)
      }
    }
    // console.log(this.state.checkedValue)
  }

  setChecked(value) {
    var found = this.state.checkedValue.find((element) => element === value)

    return found !== undefined ? true : false
  }

  onClickChange(valueChecked) {
    // console.log(this.props.checkboxButton)
    // console.log(valueChecked)
    let { checkedValue } = this.state
    if (checkedValue.includes(valueChecked)) {
      // checkedValue.map((value) => { if (value !== valueChecked) return value })
      let checkedValueNew = checkedValue.filter((value) => value !== valueChecked)
      checkedValue.length = 0
      checkedValue.push(...checkedValueNew)
    } else {
      checkedValue.push(valueChecked)
    }

  }

  render() {
    // console.log(this.props.checkboxButton)
    return <div className={this.state.isError ? 'has-error' : ''} style={{ display: 'flex', flex: 1 }}>


      <ButtonGroup>
        {this.props.checkboxButton.map((item, index) => <Button
          className='button-radio-checkbox'
          id={this.props.id + index}
          value={item.value}
          onClick={(e) => {
            this.onClickChange(item.value)
            this.validate(e)
          }}
          disabled={this.props.disabled}
          active={this.setChecked(item.value)}
        >{item.name}</Button>)}
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckboxWidget)

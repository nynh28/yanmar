import React, { Component } from 'react';
import { Input, Button } from 'reactstrap'
import { connect } from 'react-redux'
import FormValidateActions from '../../../Redux/FormValidateRedux'
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-daterangepicker/daterangepicker.css";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { node } from 'prop-types';
import { none } from 'ramda';
import '../Styles/custom.css'

class DateWidget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isError: false,
            errorMessage: '',
            inputStart: "01/01/2020",
            inputFinish: "01/01/2020"
        }
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
        this.handleEvent = this.handleEvent.bind(this);
        this.inputRef = React.createRef();
    }

    handleChange(event) {
        this.validate()
    }

    //DateRangePicker
    handleChangeS = event => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ inputStart: event.target.value });
    };
    handleChangeF = event => {
        this.setState({ inputFinish: event.target.value });
    };
    handleEvent(event, picker) {
        console.log(event);
        this.setState({
            inputStart: picker.startDate.format("DD/MM/YYYY"),
            inputFinish: picker.endDate.format("DD/MM/YYYY")
        });
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
            <DateRangePicker

                autoUpdateInput={false}
                startDate={this.props.inputStart}
                endDate={this.state.inputFinish}
                locale={{ format: "DD/MM/YYYY" }}
                onApply={this.handleEvent}
                autoApply={true}
                singleDatePicker

            >
                {console.log("xx", this.state.inputStart)}
                <input
                    style={{ display: 'none !important' }}
                    type="text"
                    id={this.props.id}
                    value={this.state.inputStart}
                    onChange={this.handleChangeS}
                    className="form-control"

                />
            </DateRangePicker>
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

export default connect(mapStateToProps, mapDispatchToProps)(DateWidget)


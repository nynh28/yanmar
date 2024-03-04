import React, { Component } from 'react';
import { Input, Button } from 'reactstrap'
import { connect } from 'react-redux'
// import FormValidateActions from '../../../Redux/FormValidateRedux'
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-daterangepicker/daterangepicker.css";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { node } from 'prop-types';
import { none } from 'ramda';


class DateWidget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isError: false,
            errorMessage: '',
            inputStart: '',
            inputFinish: ''
        }
        this.handleChange = this.handleChange.bind(this);
        // this.validate = this.validate.bind(this);
        this.handleEvent = this.handleEvent.bind(this);
        this.inputRef = React.createRef();
    }

    handleChange(event) {
        // this.validate()
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


    render() {

        let { value, required, onChange } = this.props
        console.log(value)

        return <div className={this.state.isError ? 'has-error' : ''}>
            <DateRangePicker
                autoUpdateInput={false}
                startDate={this.props.inputStart}
                endDate={this.state.inputFinish}
                locale={{ format: "DD/MM/YYYY" }}
                onApply={this.handleEvent}
                autoApply={true}
                singleDatePicker

            >
                <input
                    type="text"
                    id={this.props.id}
                    // value={value}
                    value={this.state.inputStart}
                    onChange={this.handleChangeS}

                    required={required}
                    className="form-control"
                    placeholder="DD/MM/YYYY"
                />
            </DateRangePicker>
        </div>
    }



}

const mapStateToProps = (state) => ({
    // formData: state.formValidate.data,
    // isValid: state.formValidate.isValid

});
const mapDispatchToProps = (dispatch) => ({
    // setFormData: (oldFieldData, fieldData) => dispatch(FormValidateActions.setFormData(oldFieldData, fieldData)),
    // setErrorList: (data) => dispatch(FormValidateActions.setErrorList(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(DateWidget)


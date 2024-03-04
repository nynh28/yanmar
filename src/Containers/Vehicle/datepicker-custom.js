import React, { Component } from 'react';




class DatepickerCustom extends Component {
    constructor(props) {
        super(props);
        this.dateinput_bind = React.createRef();
        this.dateinput = React.createRef();

    }
    initialDatepicker() {
        window.$(this.refs.dateinput_bind).CustomDateRangePicker(this.props.Configuration);
        window.$(this.refs.dateinput_bind).on('apply.CustomDateRangePicker', (ev, picker) => {
            var startdateraw = picker.startDate.format('MM/DD/YYYY');
            var enddateraw = picker.endDate.format('MM/DD/YYYY');
            this.refs.dateinput.value = startdateraw + ' - ' + enddateraw
            var startdatesplit = startdateraw.split('/');
            var enddatesplit = enddateraw.split('/');
            this.refs.dateinput_bind.value = startdatesplit[0] + "/" + startdatesplit[1] + "/" + (parseInt(startdatesplit[2]) + 543) + ' - ' + enddatesplit[0] + "/" + enddatesplit[1] + "/" + (parseInt(enddatesplit[2]) + 543)
            console.log(this.refs.dateinput.value);
        });
    }
    componentDidMount() {
        this.initialDatepicker();
    }
    render() {
        return (
            <div>
                <input type="text" className={this.props.Class} ref={this.dateinput_bind}  ></input>
                <input type="hidden" ref={this.dateinput}  ></input>
            </div>

        );
    }
}

export default DatepickerCustom;
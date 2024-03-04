import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import OtherReportActions from '../../../Redux/OtherReportRedux'
import FormInputNumber from '../../../Components/FormControls/FormInputNumber'

class InputNumber extends Component {
  render() {
    let { reportSelected } = this.props

    return <Suspense fallback={null}>
      <FormInputNumber
        schema={{ "required": [""] }}
        value={this.props.overtime}
        label={"other_reports_59"}
        fieldForm={"Overtime"}
        placeholder={""}
        minLengt={0}
        disabled={!(reportSelected == "201" || reportSelected == "202" || reportSelected == "203")}
        flex={5}
        onChange={(value) => this.props.setOverTime(value)}
      />
    </Suspense>
  }
}

const mapStateToProps = (state) => ({
  reportSelected: state.otherReport.reportSelected,
  overtime: state.otherReport.overtime,
});

const mapDispatchToProps = (dispatch) => ({
  setOverTime: (data) => dispatch(OtherReportActions.setOverTime(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputNumber)
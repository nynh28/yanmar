import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import SummaryActions from "../../Redux/SummaryNewRedux";
import Alert from '../../Components/Alert'
import { t } from '../../Components/Translation'

class WarningAlert extends Component {
  render() {
    return (
      <Suspense fallback={null}>
        {
          this.props.isWarning && <Alert
            setting={{
              content: "no_data_found",
              show: this.props.isWarning,
              type: 4,
              validateCode: false,
              // title: "common_1"
            }}
            onConfirm={() => {
              this.props.setValue("isWarning", false)
            }}
          />
        }
      </Suspense>
    )
  }
}

const mapStateToProps = (state) => ({
  isWarning: state.summaryNew.isWarning
});

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(SummaryActions.setValue(name, value))

});

export default connect(mapStateToProps, mapDispatchToProps)(WarningAlert)

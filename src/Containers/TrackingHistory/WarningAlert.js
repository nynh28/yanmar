import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import TrackingHistoryActions from '../../Redux/TrackingHistoryRedux'
import Alert from '../../Components/Alert'

class WarningAlert extends Component {
  render() {
    return (
      <Suspense fallback={null}>
        {
          this.props.isWarning && <Alert
            setting={{
              content: "history_97",
              show: this.props.isWarning,
              type: 2,
              validateCode: false
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
  isWarning: state.trackingHistory.isWarning
});

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(TrackingHistoryActions.setValue(name, value))

});

export default connect(mapStateToProps, mapDispatchToProps)(WarningAlert)
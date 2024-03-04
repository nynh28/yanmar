import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import Alert from '../../../Components/Alert'

class Loading extends Component {
  render() {
    return (
      <Suspense fallback={null}>
        {
          this.props.isRenderChart && <Alert
            setting={{ show: true, type: 5 }}
            onConfirm={() => { }}
          />
        }
      </Suspense>
    )
  }
}

const mapStateToProps = (state) => ({
  isRenderChart: state.trackingHistory.isRenderChart
});

export default connect(mapStateToProps)(Loading)
import React, { Component, Suspense } from 'react'
import Alert from '../../Components/Alert'

class Loading extends Component {
  render() {
    return (
      <Suspense fallback={null}>
        {
          this.props.isLoading && <Alert
            setting={{ show: true, type: 5 }}
            onConfirm={() => { }}
          />
        }
      </Suspense>
    )
  }
}

export default Loading
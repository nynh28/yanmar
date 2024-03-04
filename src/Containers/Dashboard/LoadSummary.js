import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import Alert from '../../Components/Alert'

class LoadSummary extends Component {
    render() {
        return (
            <Suspense fallback={null}>
                {
                    this.props.isLoadingSummary && <Alert
                        setting={{ show: true, type: 5 }}
                        onConfirm={() => { }}
                    />
                }
            </Suspense>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoadingSummary: state.summary.isLoadingSummary,
});

export default connect(mapStateToProps)(LoadSummary)
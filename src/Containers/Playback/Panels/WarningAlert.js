import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import PlaybackActions from '../../../Redux/PlaybackRedux'
import Alert from '../../../Components/Alert'

class WarningAlert extends Component {
    render() {
        return (
            <Suspense fallback={null}>
                {
                    this.props.isWarning.show && <Alert
                        setting={{
                            content: this.props.isWarning.content,
                            show: this.props.isWarning.show,
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
    isWarning: state.playback.isWarning
});

const mapDispatchToProps = (dispatch) => ({
    setValue: (name, value) => dispatch(PlaybackActions.setValue(name, value)),

});

export default connect(mapStateToProps, mapDispatchToProps)(WarningAlert)
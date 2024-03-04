import React, { Component } from 'react';
import { connect } from 'react-redux'
import { momentDate } from '../../../Functions/DateMoment'

class ValuePoint extends Component {
    render() {
        let { pointValue } = this.props
        return (
            <div>
                <span style={{ paddingRight: 20 }}>{pointValue.value} {pointValue.unit}</span>
                <span>{momentDate(pointValue.date)}</span>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    pointValue: state.history.pointValue
});

export default connect(mapStateToProps)(ValuePoint)

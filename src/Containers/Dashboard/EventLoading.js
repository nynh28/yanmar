import React, { Component } from 'react';
import { connect } from 'react-redux'
import Alert from '../../Components/Alert'

class EventLoading extends Component {
  render() {
    let { isLoadingevent, percentLoading } = this.props
    return (
      <Alert
        setting={{
          show: isLoadingevent,
          // content: percentLoading + '%',
          type: 5
        }}
        onConfirm={() => { }}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isLoadingevent: state.summary.isLoadingevent,
  percentLoading: state.summary.percentLoading,
});

export default connect(mapStateToProps)(EventLoading);
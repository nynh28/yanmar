import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import Alert from "../../Components/Alert";

class Loading extends Component {
  render() {
    let { isLoadingGeofence } = this.props;
    return (
      <Suspense fallback={null}>
        {isLoadingGeofence.visible && (
          <Alert
            setting={{ show: true, type: isLoadingGeofence.type }}
            onConfirm={() => {}}
          />
        )}
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoadingGeofence: state.geofences.isLoadingGeofence,
});

export default connect(mapStateToProps)(Loading);

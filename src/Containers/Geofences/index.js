import React from "react";
import { connect } from "react-redux";
import GeofencesActions from "../../Redux/GeofencesRedux";
import Map from "./Map/Map";
import FormManage from "./Manage";
import "./Styles/layout.css";
import Loading from "./Loading";

const Geofences = (props) => {
  let { isFormSetting } = props;

  return (
    <div className="flex-container" style={{ backgroundColor: "#FFF" }}>
      <Loading />
      <div className={`flex-item-left-${isFormSetting ? "80" : "50"}`}>
        <Map />
      </div>
      <div
        id="geofence-form"
        className={`flex-item-right-${isFormSetting ? "20" : "50"} div-scroll`}
      >
        <FormManage />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isFormSetting: state.geofences.isFormSetting,
});

const mapDispatchToProps = (dispatch) => ({
  setValues: (name, value) => dispatch(GeofencesActions.setValues(name, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Geofences);

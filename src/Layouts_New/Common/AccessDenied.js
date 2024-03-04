import React, { Component } from "react";
import "./styles.css";
import { connect } from "react-redux";

class NotFound extends Component {
  render() {
    console.log(this.props.dataLogin);
    return (
      <div className="text-center">
        <p className="text-error text-red text-bold">403</p>
        <h1 className="text-title text-bold mt-2">Access denied.</h1>
        <p className="mt-2">You are not authorized to access this page.</p>
        <div className="mt-6">
          <a
            className="text-link"
            onClick={() => {
              {
                this.props.dataLogin.userId === 22085 || 21639
                  ? this.props.history.push("/Tractor/homePage")
                  : this.props.history.push("/homePage");
              }
            }}
          >
            ← BACK TO HOME
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
});

export default connect(mapStateToProps)(NotFound);

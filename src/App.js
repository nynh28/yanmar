import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { withRouter } from 'react-router'
//#region Redux connect
import { connect } from 'react-redux'
import packageJson from "../package.json";
// import { getBuildDate } from "./utils/utils";
import withClearCache from "./ClearCache";
import AppRoute from "./AppRoute";
import moment from 'moment'
const ClearCacheComponent = withClearCache(MainApp);

function App() {
  return <ClearCacheComponent />;
}

function MainApp(props) {

  return (
    <AppRoute />
  );
}

export default App;

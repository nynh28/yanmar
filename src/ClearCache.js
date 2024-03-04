import React, { useState, useEffect } from "react";
import packageJson from "../package.json";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
//#region Redux connect
import { connect } from "react-redux";
import SigninActions from "./Redux/SigninRedux";

const buildDateGreaterThan = (latestDate, currentDate) => {
  const momLatestDateTime = moment(latestDate);
  const momCurrentDateTime = moment(currentDate);
  if (momLatestDateTime.isAfter(momCurrentDateTime)) {
    return true;
  } else {
    return false;
  }
};

function withClearCache(Component) {
  function ClearCacheComponent(props) {
    const dispatch = useDispatch();
    const { signout, signoutSuccess, signoutTractor, signoutTractorSuccess } =
      SigninActions;
    const dataLogin = useSelector((state) => state.signin.dataLogin);
    const stateSignin = useSelector((state) => state.signin.stateSignin);
    const [isLatestBuildDate, setIsLatestBuildDate] = useState(false);
    useEffect(() => {
      fetch("/meta.json")
        .then((response) => response.json())
        .then((meta) => {
          const latestVersionDate = meta.buildDate;
          const currentVersionDate = packageJson.buildDate;
          const shouldForceRefresh = buildDateGreaterThan(
            latestVersionDate,
            currentVersionDate
          );
          // console.log('test', test)
          // if (stateSignin) {
          if (shouldForceRefresh) {
            if (stateSignin) dispatch(signout());
            if (stateSignin) dispatch(signoutSuccess());
            if (stateSignin) dispatch(signoutTractor());
            if (stateSignin) dispatch(signoutTractorSuccess());
            setTimeout(() => {
              refreshCacheAndReload();
            }, 3000);
            setIsLatestBuildDate(false);
          } else {
            setIsLatestBuildDate(true);
          }
        });
    }, []);

    const refreshCacheAndReload = () => {
      // console.log('test_3', caches)
      if (caches) {
        // Service worker cache should be cleared with caches.delete()
        caches.keys().then((names) => {
          for (const name of names) {
            caches.delete(name);
          }
        });
      }
      // delete browser cache and hard reload
      window.location.reload(true);
    };

    // console.log('isLatestBuildDate', isLatestBuildDate)
    return (
      <React.Fragment>
        {/* <Component {...props} /> */}
        {isLatestBuildDate ? <Component {...props} /> : null}
      </React.Fragment>
    );
  }

  return ClearCacheComponent;
}

const mapDispatchToProps = (dispatch) => ({
  signout: () => dispatch(SigninActions.signout()),
  signoutTractor: () => dispatch(SigninActions.signoutTractor()),
});

export default withClearCache;

// export default withRouter(connect(mapDispatchToProps)(withClearCache))

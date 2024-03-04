import apisauce from "apisauce";
import { ENDPOINT_BASE_URL, ENDPOINT_BASE_URL_YNM_VNTEAM, YM_BASE_URL } from "../Config/app-config";

const create = (baseURL = ENDPOINT_BASE_URL_YNM_VNTEAM) => {
// const create = (baseURL = YM_BASE_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      Accept: "application/json",
      // 'X-Amz-Security-Token': 'Onelink-Admin-Support',
      "Accept-Language": "",
      // 'Content-Type': 'application/json',
      // 'Accept': 'text/plain',
      // 'Accept': 'text/plain',
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 60000,
  });

  const signinTractor = (data) => api.post("/fleet/auth/login", data);

  const setHeader = (header) => {
    api.setHeaders(header);
  };

  const checkAgreement = (agreementTypeId) =>
    api.get("/users/check-agreement?agreementTypeId=" + agreementTypeId);
  const getAgreement = (agreementTypeId) =>
    api.get("/users/agreement?agreementTypeId=" + agreementTypeId);
  const putAgreement = (data) =>
    api.put(
      "/users/agreement?AgreementTypeId=" +
        data.AgreementTypeId +
        "&IsAgreement=" +
        data.IsAgreement
    );

  const getProfile = () => api.get("/users/get-profile");
  const getMenu = () => api.get("/users/get-menu");
  const getAction = () => api.get("/users/get-action");

  const signout = (data) => api.post("/users/auth/logout", data);
  const signoutTractor = (data) => api.post("/fleet/auth/logout", data);

  const refresh = (data) => api.post("/users/auth/refresh", data);
  const refreshTractor = (data) => api.post("/fleet/auth/refresh", data);

  const getPasswordPolicyAuth = () => api.get("users/auth/PasswordPolicy");

  const getConfig = (user_id) =>
    api.get("fleet/trips/chartcolors?user_id=" + user_id);

  return {
    signinTractor,
    getProfile,
    setHeader,
    signout,
    signoutTractor,
    checkAgreement,
    getAgreement,
    putAgreement,
    getMenu,
    getAction,
    refresh,
    refreshTractor,
    getPasswordPolicyAuth,
    getConfig,

    // refresh,
    // setIDToken,
    // getCredential,
    // getHinoRole,
  };
};

// let's return back our create method as the default.
export default {
  create,
};

import apisauce from "apisauce";
import { ENDPOINT_BASE_URL } from "../Config/app-config";

const create = (baseURL = ENDPOINT_BASE_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      Accept: "application/json",
      // 'Accept': 'text/plain',
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 600000,
  });

  const setHeader = (header) => {
    api.setHeaders(header);
  };

  const getDailyReports = (data) => {
    return api.get("fleet/report/daily", data);
  };

  return {
    setHeader,
    getDailyReports,
  };
};

export default {
  create,
};

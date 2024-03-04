let baseUrl = "";
if (process.env.REACT_APP_NODE_ENV == "production") {
    baseUrl = "https://api-center.onelink-iot.com/prod/";
    // baseUrl = 'http://192.168.6.33:5000/v1.0.1/'
} else if (process.env.REACT_APP_NODE_ENV == "staging") {
    // baseUrl = 'https://api-center.onelink-iot.com/stage/'
    baseUrl = "https://api-center.onelink-iot.com/prod/";
} else {
    // baseUrl = 'https://api-center.onelink-iot.com/v1.0.1/'
    baseUrl = "https://api-center.onelink-iot.com/prod/";
}
export const ENDPOINT_BASE_URL = baseUrl;
export const ENDPOINT_BASE_URL_YNM =
    "https://ck0i7hnfbi.execute-api.ap-southeast-1.amazonaws.com/Prod/";
export const ENDPOINT_BASE_URL_YNM2 =
    "https://yanmar-api.onelink-iot.com/prod/";
export const ENDPOINT_BASE_URL_YNM3 =
    "https://yanmar-api2.onelink-iot.com/prod/";
export const ENDPOINT_BASE_URL_YNM4 = "https://yanmar-qa.onelink-iot.com/prod/";
export const ENDPOINT_BASE_URL_YNM_VNTEAM = "http://localhost:4000/prod/";
// export const ENDPOINT_BASE_URL_YNM_VNTEAM = "https://yanmar-api.veconnect.vn/prod/";

let yanmarBaseUrl = "";
if (process.env.REACT_APP_NODE_ENV == "production") {
    yanmarBaseUrl = "https://yanmar-api.onelink-iot.com/prod/";
} else if (process.env.REACT_APP_NODE_ENV == "staging") {
    yanmarBaseUrl = "https://yanmar-qa.onelink-iot.com/prod/";
} else {
    yanmarBaseUrl = "https://yanmar-qa.onelink-iot.com/prod/";
}
export const YM_BASE_URL = yanmarBaseUrl;

let settingBaseUrl = "";
if (process.env.REACT_APP_NODE_ENV == "production") {
    settingBaseUrl = "https://api-center.onelink-iot.com/prod/";
} else if (process.env.REACT_APP_NODE_ENV == "staging") {
    settingBaseUrl = "https://api-center.onelink-iot.com/prod/";
} else {
    settingBaseUrl = "https://api-center.onelink-iot.com/prod/";
}
export const ENDPOINT_SETTING_BASE_URL = settingBaseUrl;

let flaskBaseUrl = "";
if (process.env.REACT_APP_NODE_ENV == "production") {
    flaskBaseUrl = "https://api-center.onelink-iot.com/flask/";
} else if (process.env.REACT_APP_NODE_ENV == "staging") {
    flaskBaseUrl = "https://api-center.onelink-iot.com/flask/";
} else {
    flaskBaseUrl = "https://api-center.onelink-iot.com/flask/";
}
export const ENDPOINT_FLASK_BASE_URL = flaskBaseUrl;

let installBaseUrl = "";
if (process.env.REACT_APP_NODE_ENV == "production") {
    installBaseUrl = "https://installing.onelink-iot.com:4100/";
} else if (process.env.REACT_APP_NODE_ENV == "staging") {
    installBaseUrl = "https://installing.onelink-iot.com:4100/";
} else {
    installBaseUrl = "https://installing.onelink-iot.com:3900/";
}
export const ENDPOINT_INSTALL_BASE_URL = installBaseUrl;

let reportBaseUrl = "";
if (process.env.REACT_APP_NODE_ENV == "production") {
    reportBaseUrl = "https://tableprofile.onelink-iot.com:5502/proc/";
} else if (process.env.REACT_APP_NODE_ENV == "staging") {
    reportBaseUrl = "https://tableprofile.onelink-iot.com:5502/stage/";
} else {
    reportBaseUrl = "https://tableprofile.onelink-iot.com/5502/";
}
export const ENDPOINT_SETTING_REPORT_BASE_URL = reportBaseUrl;

let baseTopicEvent = "";
if (process.env.REACT_APP_NODE_ENV == "production") {
    baseTopicEvent = "/HINO/DeviceEvent/ALL/Prod/";
} else if (process.env.REACT_APP_NODE_ENV == "staging") {
    baseTopicEvent = "/HINO/DeviceEvent/ALL/Staging/";
} else {
    baseTopicEvent = "/HINO/DeviceEvent/ALL/Dev/";
}
export const ENDPOINT__BASE_TOPIC_EVENT = baseTopicEvent;

let baseTopicEvent2 = "";
if (process.env.REACT_APP_NODE_ENV == "production") {
    baseTopicEvent2 = "/YANMAR/NOTIFY/";
} else if (process.env.REACT_APP_NODE_ENV == "staging") {
    baseTopicEvent2 = "/YANMAR/NOTIFY/";
} else {
    baseTopicEvent2 = "/YANMAR/NOTIFY/";
}
export const ENDPOINT_BASE_TOPIC_EVENT_2 = baseTopicEvent2;

let baseTopicRealtime = "";
if (process.env.REACT_APP_NODE_ENV == "production") {
    baseTopicRealtime = "/HINO/DeviceRealtime/All/Prod/";
} else if (process.env.REACT_APP_NODE_ENV == "staging") {
    // baseTopicRealtime = '/HINO/DeviceRealtime/All/Staging/'
    baseTopicRealtime = "/HINO/DeviceRealtime/All/Prod/";
} else {
    baseTopicRealtime = "/HINO/DeviceRealtime/All/Dev/";
}
export const ENDPOINT__BASE_TOPIC_REALTIME = baseTopicRealtime;

let baseCargolink = "";
if (process.env.REACT_APP_NODE_ENV == "production") {
    baseCargolink = "https://cargolink.co.th/api/";
} else if (process.env.REACT_APP_NODE_ENV == "staging") {
    baseCargolink = "·https://staging.cargolink.co.th/";
} else {
    baseCargolink = "https://staging.cargolink.co.th/";
}
export const ENDPOINT_BASE_URL_CARGOLINK = baseCargolink;

export function getGeoServerUrl(layerName) {
    return (
        "http://geo.onelink-iot.com/geoserver/gwc/service/gmaps?layers=hino:" +
        layerName
    );
}

let baseUrl_Realtime = "";
if (process.env.REACT_APP_NODE_ENV == "production") {
    baseUrl_Realtime = "https://engineer.onelink-iot.com:4002/prod/";
} else if (process.env.REACT_APP_NODE_ENV == "staging") {
    baseUrl_Realtime = "https://engineer.onelink-iot.com:4002/prod/";
} else {
    baseUrl_Realtime = "https://engineer.onelink-iot.com:4002/prod/";
}
export const ENDPOINT_REALTIME = baseUrl_Realtime;

let baseUrl_RealtimeV2 = "";
if (process.env.REACT_APP_NODE_ENV == "production") {
    baseUrl_RealtimeV2 = "https://hino-api.onelink-iot.com/prod/";
} else if (process.env.REACT_APP_NODE_ENV == "staging") {
    baseUrl_RealtimeV2 = "https://hino-api.onelink-iot.com/prod/";
} else {
    baseUrl_RealtimeV2 = "https://hino-api.onelink-iot.com/prod/";
}
export const ENDPOINT_REALTIME_V2 = baseUrl_RealtimeV2;

let baseUrl_hinoApi = "";
if (process.env.REACT_APP_NODE_ENV == "production") {
    baseUrl_hinoApi = "https://hino-api.onelink-iot.com/prod/";
} else if (process.env.REACT_APP_NODE_ENV == "staging") {
    baseUrl_hinoApi = "https://hino-api.onelink-iot.com/prod/";
} else {
    baseUrl_hinoApi = "https://hino-api.onelink-iot.com/prod/";
}
export const ENDPOINT_HINO_API_URL = baseUrl_hinoApi;

export function setBusinessPOI(map) {
    var styles = [
        {
            featureType: "poi.business",
            stylers: [{ visibility: "on" }],
        },
    ];

    map.setOptions({ styles: styles });
}
let GoogleMapAPIkey = "AIzaSyCOZd-5XwpG3yEWqmHZpfO6Qm5H6NDsUeg";
// let GoogleMapAPIkey = ''
// if (window.location.hostname == "localhost") {
//   GoogleMapAPIkey = "AIzaSyAmjEn7OoUoj3EPApR7SvqCWxamJJAb6ig";
// } else {
//   GoogleMapAPIkey = "AIzaSyAmjEn7OoUoj3EPApR7SvqCWxamJJAb6ig";
// }
export const GOOGEL_MAP_API_KEY = GoogleMapAPIkey;
export const GOOGLE_MAP_API_KEY = GoogleMapAPIkey;

export const MEDIA_SRC_ROOT = 'https://s3.ap-southeast-1.amazonaws.com/prod.hino.ecm.bucket/'

export const listRole = [
    {
        "active_status": "A",
        "name": "Yanmar Admin",
        "id": 39,
        show: ['change-dealer', 'add-new']
    },
    {
      "active_status": "A",
      "name": "YSP User",
      "id": 34,
      show: ['add-new', 'change-dealer']
  },
    {
        "active_status": "A",
        "name": "YCT User",
        "id": 35,
        show: ['add-new', 'change-dealer']
    },
    {
        "active_status": "A",
        "name": "Dealer",
        "id": 18,
        show: ['add-new', 'change-dealer']
    },

]
export const adminRoleId = 39

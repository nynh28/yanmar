"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apisauce = _interopRequireDefault(require("apisauce"));

var _appConfig = require("../Config/app-config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var b = 'https://staging.cargolink.co.th/api/';
var baseCargolink = 'https://cargolink.co.th/api/';

var create = function create() {
  var baseURL = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _appConfig.ENDPOINT_BASE_URL_CARGOLINK;

  var api = _apisauce["default"].create({
    baseURL: baseURL,
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    timeout: 10000
  });

  var setHeader = function setHeader(header) {
    api.setHeaders(header);
  };

  var login = function login(data) {
    return api.post('mobile/v1/auth/login', data);
  };

  var getOrders = function getOrders(data) {
    return api.post('v1/carriers/getOrders', data);
  };

  return {
    login: login,
    getOrders: getOrders,
    setHeader: setHeader
  };
}; // let's return back our create method as the default.


var _default = {
  create: create
};
exports["default"] = _default;
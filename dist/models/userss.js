"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _authenticate = _interopRequireDefault(require("../middle_ware/authenticate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var users = [{
  id: 1,
  email: 'doyin@email.com',
  firstName: 'Ade',
  lastName: 'doyin',
  password: _authenticate["default"].hashPassword('password'),
  address: 'cresent street',
  status: 'verified',
  isAdmin: false,
  token: '7qnrdw1wundefinedundefined'
}, {
  id: 2,
  email: 'adebayo@ware.ng',
  password: _authenticate["default"].hashPassword('password'),
  firstName: 'james',
  lastName: 'john',
  address: 'New york city',
  status: 'not verified',
  isAdmin: false,
  token: '7qnrdw1wundefinedundefined'
}, {
  id: 3,
  email: 'adebayo@yahoo.com',
  password: _authenticate["default"].hashPassword('password'),
  firstName: 'john',
  lastName: 'doe',
  address: 'Lekki phase I, Lagos',
  status: 'verified',
  isAdmin: true,
  token: '7qnrdw1wundefinedundefined'
}];
var _default = users; // module.exports = users;

exports["default"] = _default;
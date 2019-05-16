"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _userss = _interopRequireDefault(require("../models/userss"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _authenticate = _interopRequireDefault(require("../middle_ware/authenticate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Usercontroller =
/*#__PURE__*/
function () {
  function Usercontroller() {
    _classCallCheck(this, Usercontroller);
  }

  _createClass(Usercontroller, null, [{
    key: "getUsers",
    //get all the users
    value: function getUsers(req, res) {
      try {
        return res.status(200).json({
          message: 'All users successfully gotten',
          users: _userss["default"],
          status: 200
        });
      } catch (e) {
        return res.status(500).json({
          message: 'An error occured'
        });
      }
    }
  }, {
    key: "createUsers",
    value: function createUsers(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          address = _req$body.address;
      var isAdmin = false;

      var token = _authenticate["default"].generateToken({
        email: email,
        isAdmin: isAdmin
      });

      var newUser = _objectSpread({
        id: _userss["default"].length + 1,
        token: token
      }, req.body, {
        status: 'unverified',
        isAdmin: isAdmin,
        registered: new Date()
      });

      var emailExists = _userss["default"].find(function (user) {
        return user.email === email;
      });

      if (emailExists) {
        return res.status(409).json({
          status: 409,
          error: 'User already exist'
        });
      }

      _userss["default"].push(newUser);

      return res.status(201).json({
        message: 'successfully created a user',
        status: 201,
        newUser: newUser
      });
    }
  }, {
    key: "loginUser",
    value: function loginUser(req, res) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password; // checks if user exists

      var emailExists = _userss["default"].find(function (user) {
        return user.email === email;
      });

      if (!emailExists && !_authenticate["default"].comparePassword(emailExists.password, password) || !emailExists && _authenticate["default"].comparePassword(emailExists.password, password) || emailExists && !_authenticate["default"].comparePassword(emailExists.password, password)) {
        return res.status(404).json({
          status: 404,
          error: 'user not found'
        });
      }

      return res.status(200).json({
        status: 200,
        data: {
          token: emailExists.token,
          id: emailExists.id,
          firstName: emailExists.firstName,
          lastName: emailExists.lastName,
          isAdmin: emailExists.isAdmin,
          email: emailExists.email
        }
      });
    }
  }, {
    key: "adminVerifyUser",
    value: function adminVerifyUser(req, res) {
      var email = req.params.email;

      var usersdata = _userss["default"].find(function (user) {
        return user.email === email;
      });

      if (!usersdata) {
        return res.status(404).send({
          status: 404,
          error: 'User not found!'
        });
      }

      if (usersdata.status === 'verified') {
        return res.status(409).json({
          status: 409,
          message: 'User has been verified'
        });
      }

      if (usersdata.status === 'not verified') {
        return res.status(401).json({
          status: 401,
          message: 'User has not been verified'
        });
      }

      usersdata.status = 'verified';
      var changedData = {
        email: usersdata.email,
        firstName: usersdata.firstName,
        lastName: usersdata.lastName,
        address: usersdata.address,
        status: usersdata.status,
        isAdmin: usersdata.isAdmin
      };
      return res.status(200).json({
        status: 200,
        data: changedData
      });
    }
  }]);

  return Usercontroller;
}(); // module.exports = userController;


var _default = Usercontroller;
exports["default"] = _default;
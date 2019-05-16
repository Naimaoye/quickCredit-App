"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var Authenticator =
/*#__PURE__*/
function () {
  function Authenticator() {
    _classCallCheck(this, Authenticator);
  }

  _createClass(Authenticator, null, [{
    key: "generateToken",
    value: function generateToken(payload) {
      return _jsonwebtoken["default"].sign({
        payload: payload
      }, process.env.JWT_SECRET_KEY, {
        expiresIn: '12h'
      });
    }
  }, {
    key: "verifyToken",
    value: function verifyToken(token) {
      return _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET_KEY);
    }
  }, {
    key: "hashPassword",
    value: function hashPassword(password) {
      return _bcryptjs["default"].hashSync(password, _bcryptjs["default"].genSaltSync(10));
    }
  }, {
    key: "comparePassword",
    value: function comparePassword(hashPassword, password) {
      return _bcryptjs["default"].compareSync(password, hashPassword);
    }
  }]);

  return Authenticator;
}();

var _default = Authenticator;
exports["default"] = _default;
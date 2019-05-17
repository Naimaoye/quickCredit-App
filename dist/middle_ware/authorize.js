"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _authenticate = _interopRequireDefault(require("./authenticate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Authorize =
/*#__PURE__*/
function () {
  function Authorize() {
    _classCallCheck(this, Authorize);
  }

  _createClass(Authorize, null, [{
    key: "verifyUser",
    value: function verifyUser(req, res, next) {
      try {
        var token = req.headers.authorization.split(' ')[1];

        var decoded = _authenticate["default"].verifyToken(token);

        var userMail = req.body.email;
        var check = userMail.endsWith("@quickcredit.com");

        if (check) {
          return res.status(403).send({
            status: 403,
            error: 'You do not have access to this route'
          });
        }

        return next();
      } catch (e) {
        return res.status(401).send({
          status: 401,
          error: 'Invalid input'
        });
      }
    }
  }, {
    key: "verifyAdmin",
    value: function verifyAdmin(req, res, next) {
      try {
        var token = req.headers.authorization.split(' ')[1];

        var decoded = _authenticate["default"].verifyToken(token);

        var userMail = req.body.email;
        var check = userMail.endsWith("@quickcredit.com");

        if (!check) {
          return res.status(403).send({
            status: 403,
            error: 'You cannot access this route'
          });
        }

        return next();
      } catch (e) {
        return res.status(401).send({
          status: 401,
          error: 'Invalid input'
        });
      }
    }
  }]);

  return Authorize;
}();

var _default = Authorize;
exports["default"] = _default;
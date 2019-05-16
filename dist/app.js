"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _debug = _interopRequireDefault(require("debug"));

var _index = _interopRequireDefault(require("./routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var Debug = (0, _debug["default"])('http');
var port = process.env.PORT || 3000;
app.use((0, _morgan["default"])('dev'));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
(0, _index["default"])(app);
app.get('/', function (req, res) {
  return res.status(200).send({
    'message': 'Welcome, this endpoints were created by Oyewale Naimat'
  });
});
app.listen(port, function () {
  return Debug("server has started on ".concat(port));
});
var _default = app;
exports["default"] = _default;
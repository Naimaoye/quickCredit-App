"use strict";

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var usersValidator = function usersValidator(req, res, next) {
  var schema = _joi["default"].object().keys({
    email: _joi["default"].string().trim().email().required(),
    firstName: _joi["default"].string().regex(/^[A-Z]|[a-z]+$/).min(3).required(),
    lastName: _joi["default"].string().regex(/^[A-Z]|[a-z]+$/).min(3).required(),
    password: _joi["default"].string().min(7).alphanum().required(),
    address: _joi["default"].string().required(),
    status: _joi["default"].string().insensitive()["default"]('unverified'),
    isAdmin: _joi["default"]["boolean"]()["default"](false)
  });

  return _joi["default"].validate(req.body, schema, function (error, result) {
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    next();
  });
};

var loginValidator = function loginValidator(req, res, next) {
  var schema = _joi["default"].object().keys({
    email: _joi["default"].string().email().trim().lowercase().required(),
    password: _joi["default"].string().min(7).required().strict()
  });

  return _joi["default"].validate(req.body, schema, function (error, result) {
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    next();
  });
};

var loanApprovalValidator = function loanApprovalValidator(req, res, next) {
  var schema = _joi["default"].object().keys({
    status: _joi["default"].string().insensitive().valid('approved', 'rejected').required()
  });

  return _joi["default"].validate(req.body, schema, function (error, result) {
    console.log(error);
    console.log(result);

    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    next();
  });
};

var loanValidator = function loanValidator(req, res, next) {
  var schema = _joi["default"].object().keys({
    email: _joi["default"].string().email().required(),
    firstName: _joi["default"].string().regex(/^[A-Z]|[a-z]+$/).min(3).required(),
    lastName: _joi["default"].string().regex(/^[A-Z]|[a-z]+$/).min(3).required(),
    tenor: _joi["default"].number().integer().min(1).max(12).required(),
    amount: _joi["default"].number().min(10000).required()
  });

  return _joi["default"].validate(req.body, schema, function (error, result) {
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    next();
  });
};

var loanQueryValidator = function loanQueryValidator(req, res, next) {
  var schema = _joi["default"].object().keys({
    status: _joi["default"].string().insensitive().valid('approved'),
    repaid: _joi["default"]["boolean"]().insensitive().valid(true, false)
  });

  return _joi["default"].validate(req.body, schema, function (error, result) {
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    next();
  });
};

var userId = function userId(req, res, next) {
  var schema = _joi["default"].object().keys({
    id: _joi["default"].number().required()
  });

  return _joi["default"].validate(req.body.id, schema, function (error, result) {
    console.log(error);
    console.log(result);

    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    next();
  });
};

var loanRepaymentValidator = function loanRepaymentValidator(req, res, next) {
  var schema = _joi["default"].object().keys({
    paidAmount: _joi["default"].number().required()
  });

  return _joi["default"].validate(req.body, schema, function (error, result) {
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    next();
  });
};

module.exports = {
  usersValidator: usersValidator,
  loginValidator: loginValidator,
  loanApprovalValidator: loanApprovalValidator,
  loanValidator: loanValidator,
  loanQueryValidator: loanQueryValidator,
  loanRepaymentValidator: loanRepaymentValidator,
  userId: userId
};
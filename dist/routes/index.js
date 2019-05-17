"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _users_controller = _interopRequireDefault(require("../controller/users_controller"));

var _loans_controller = _interopRequireDefault(require("../controller/loans_controller"));

var _repayments_controller = _interopRequireDefault(require("../controller/repayments_controller"));

var _validate = _interopRequireDefault(require("../middle_ware/validate"));

var _authorize = _interopRequireDefault(require("../middle_ware/authorize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var usersValidator = _validate["default"].usersValidator,
    loginValidator = _validate["default"].loginValidator,
    loanApprovalValidator = _validate["default"].loanApprovalValidator,
    loanValidator = _validate["default"].loanValidator,
    loanQueryValidator = _validate["default"].loanQueryValidator,
    loanRepaymentValidator = _validate["default"].loanRepaymentValidator,
    userId = _validate["default"].userId;
var verifyUser = _authorize["default"].verifyUser,
    verifyAdmin = _authorize["default"].verifyAdmin;
var createUsers = _users_controller["default"].createUsers,
    loginUser = _users_controller["default"].loginUser,
    adminVerifyUser = _users_controller["default"].adminVerifyUser;
var applyForLoan = _loans_controller["default"].applyForLoan,
    loanApproval = _loans_controller["default"].loanApproval,
    getAllLoans = _loans_controller["default"].getAllLoans,
    getSpecificLoan = _loans_controller["default"].getSpecificLoan;
var postRepayment = _repayments_controller["default"].postRepayment,
    getRepaymentHistory = _repayments_controller["default"].getRepaymentHistory;

var route = function route(app) {
  //sign up a user
  app.post('/api/v1/auth/signup', usersValidator, createUsers); //sign in a user

  app.post('/api/v1/auth/signin', loginValidator, loginUser); //apply for loan

  app.post('/api/v1/loans', verifyUser, loanValidator, applyForLoan); //admin post repayment

  app.post('/api/v1/loans/:id/repayment', verifyAdmin, loanRepaymentValidator, userId, postRepayment); //admin verify user

  app.patch('/api/v1/users/:email/verify', verifyAdmin, adminVerifyUser); //admin accept or reject loan

  app.patch('/api/v1/loans/:id', verifyAdmin, loanApprovalValidator, loanApproval); //admin get all loan repayment history

  app.get('/api/v1/loans/:id/repayments', verifyUser, userId, getRepaymentHistory); //admin get all loan applications

  app.get('/api/v1/loans', verifyAdmin, loanQueryValidator, getAllLoans); //admin get all loans that has been approved but not repaid

  app.get('/api/v1/loans?status=approved&repaid=false', loanQueryValidator, getAllLoans);
  app.get('/api/v1/loans?status=approved&repaid=true', loanQueryValidator, getAllLoans); //admin get all specific application

  app.get('/api/v1/loans/:id', verifyAdmin, userId, getSpecificLoan);
};

var _default = route;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _loans = _interopRequireDefault(require("../models/loans"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Loancontroller =
/*#__PURE__*/
function () {
  function Loancontroller() {
    _classCallCheck(this, Loancontroller);
  }

  _createClass(Loancontroller, null, [{
    key: "applyForLoan",
    value: function applyForLoan(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          amount = _req$body.amount,
          tenor = _req$body.tenor;
      var loanId = _loans["default"].length + 1;
      var status = 'pending';
      var interest = 0.05;
      var paymentInstallment = parseFloat(amount * interest / tenor).toFixed(2);
      var balance = parseFloat(amount).toFixed(2);
      var createdOn = new Date();
      var repaid = false;
      var data = {
        loanId: loanId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        tenor: tenor,
        amount: amount,
        paymentInstallment: paymentInstallment,
        status: status,
        balance: balance,
        interest: interest
      };
      var updatedData = {
        id: data.loanId,
        user: data.email,
        createdOn: createdOn,
        status: status,
        repaid: repaid,
        tenor: tenor,
        amount: amount,
        paymentInstallment: paymentInstallment,
        balance: balance,
        interest: interest
      };

      var loanExists = _loans["default"].find(function (loan) {
        return loan.user === email;
      });

      if (loanExists) {
        return res.status(409).json({
          status: 409,
          error: 'user already applied for a loan'
        });
      }

      _loans["default"].push(updatedData);

      return res.status(201).json({
        status: 201,
        data: data
      });
    }
  }, {
    key: "getAllLoans",
    value: function getAllLoans(req, res) {
      var _req$query = req.query,
          status = _req$query.status,
          repaid = _req$query.repaid;

      if (status && repaid) {
        var currentLoan = _loans["default"].filter(function (loan) {
          return loan.status === status && loan.repaid === JSON.parse(repaid);
        });

        return res.status(200).send({
          status: 200,
          data: currentLoan
        });
      }

      return res.status(200).send({
        status: 200,
        data: _loans["default"]
      });
    }
  }, {
    key: "getSpecificLoan",
    value: function getSpecificLoan(req, res) {
      var id = req.params.id;

      var specificLoan = _loans["default"].find(function (loan) {
        return loan.id === parseInt(id, 10);
      });

      if (!specificLoan) {
        return res.status(404).json({
          status: 404,
          error: 'loan application not found'
        });
      }

      return res.status(200).json({
        status: 200,
        data: specificLoan
      });
    }
  }, {
    key: "loanApproval",
    value: function loanApproval(req, res) {
      var id = req.params.id;
      var status = req.body.status;

      var userLoan = _loans["default"].find(function (loan) {
        return loan.id === parseInt(id, 10);
      });

      if (!userLoan) {
        return res.status(404).send({
          status: 404,
          error: 'user Loan does not exist'
        });
      }

      if (userLoan.status === 'approved') {
        return res.status(409).send({
          status: 409,
          error: 'Loan already approved'
        });
      }

      userLoan.status = status;
      var updatedData = {
        loanId: userLoan.id,
        loanAmount: userLoan.amount,
        tenor: userLoan.tenor,
        status: userLoan.status,
        monthlyInstallments: userLoan.paymentInstallment,
        interest: userLoan.interest
      };
      return res.status(200).send({
        status: 200,
        data: updatedData
      });
    }
  }]);

  return Loancontroller;
}();

var _default = Loancontroller;
exports["default"] = _default;